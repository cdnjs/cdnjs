/*!
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
 * 
 * @version 1.1.0
 * 
 * All-in-one packaged file for ease use of 'billboard.js' with below dependency.
 * - d3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.isObject = exports.isArray = exports.merge = exports.getRectSegList = exports.removeEvent = exports.addEvent = exports.extend = exports.brushEmpty = exports.getBrushSelection = exports.isEmpty = exports.diffDomain = exports.getPathBox = exports.sanitise = exports.hasValue = exports.isString = exports.getOption = exports.asHalfPixel = exports.isFunction = exports.ceil10 = exports.notEmpty = exports.isBoolean = exports.isUndefined = exports.isDefined = exports.isValue = undefined;

var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _d = __webpack_require__(2),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var isValue = function (v) {
	return v || v === 0;
},
    isFunction = function (v) {
	return typeof v === "function";
},
    isString = function (v) {
	return typeof v === "string";
},
    isUndefined = function (v) {
	return typeof v === "undefined";
},
    isDefined = function (v) {
	return typeof v !== "undefined";
},
    isBoolean = function (v) {
	return typeof v === "boolean";
},
    ceil10 = function (v) {
	return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
	return Math.ceil(n) + 0.5;
},
    diffDomain = function (d) {
	return d[1] - d[0];
},
    isEmpty = function (o) {
	return typeof o === "undefined" || o === null || isString(o) && o.length === 0 || (typeof o === "undefined" ? "undefined" : (0, _typeof3.default)(o)) === "object" && Object.keys(o).length === 0;
},
    notEmpty = function (o) {
	return !isEmpty(o);
},
    getOption = function (options, key, defaultValue) {
	return isDefined(options[key]) ? options[key] : defaultValue;
},
    hasValue = function (dict, value) {
	var found = !1;

	return Object.keys(dict).forEach(function (key) {
		return dict[key] === value && (found = !0);
	}), found;
},
    sanitise = function (str) {
	return typeof str === "string" ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
},
    getRectSegList = function (path) {
	/*
  * seg1 ---------- seg2
  *   |               |
  *   |               |
  *   |               |
  * seg0 ---------- seg3
  * */
	var bbox = path.getBBox(),
	    list = [];

	// seg0


	return list.push({
		x: bbox.x,
		y: bbox.y + bbox.height
	}), list.push({
		x: bbox.x,
		y: bbox.y
	}), list.push({
		x: bbox.x + bbox.width,
		y: bbox.y
	}), list.push({
		x: bbox.x + bbox.width,
		y: bbox.y + bbox.height
	}), list;
},
    getPathBox = function (path) {
	var box = path.getBoundingClientRect(),
	    items = getRectSegList(path),
	    minX = items[0].x,
	    minY = Math.min(items[0].y, items[1].y);


	return {
		x: minX,
		y: minY,
		width: box.width,
		height: box.height
	};
},
    getBrushSelection = function () {
	var selection = null,
	    event = _d.event;

	// check from event


	return event && event.constructor.name === "BrushEvent" ? selection = event.selection : this.context && (selection = this.context.select("." + _classes2.default.brush).node()) && (selection = (0, _d.brushSelection)(selection)), selection;
},
    brushEmpty = function () {
	var selection = this.getBrushSelection();

	return !selection || selection[0] === selection[1];
};

// substitution of SVGPathSeg API polyfill


// return brush selection array


function extend() {
	var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    source = arguments[1],
	    p = void 0;


	for (p in source) target[p] = source[p];
	return target;
}

var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document),
    SUPPORT_PASSIVE = function () {
	var supportsPassiveOption = !1;

	try {
		SUPPORT_ADDEVENTLISTENER && Object.defineProperty && document.addEventListener("test", null, Object.defineProperty({}, "passive", {
			get: function get() {
				supportsPassiveOption = !0;
			}
		}));
	} catch (e) {}
	return supportsPassiveOption;
}();


function addEvent(element, type, handler, eventListenerOptions) {
	if (SUPPORT_ADDEVENTLISTENER) {
		var options = eventListenerOptions || !1;

		(typeof eventListenerOptions === "undefined" ? "undefined" : (0, _typeof3.default)(eventListenerOptions)) === "object" && (options = !!SUPPORT_PASSIVE && eventListenerOptions), element.addEventListener(type, handler, options);
	} else element.attachEvent ? element.attachEvent("on" + type, handler) : element["on" + type] = handler;
}

function removeEvent(element, type, handler) {
	element.removeEventListener ? element.removeEventListener(type, handler, !1) : element.detachEvent ? element.detachEvent("on" + type, handler) : element["on" + type] = null;
}

/**
 * Check if is array
 * @param arr *
 * @returns {Boolean}
 * @private
 */
var isArray = function (arr) {
	return arr && arr.constructor === Array;
},
    isObject = function (obj) {
	return obj && !obj.nodeType && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object" && !isArray(obj);
},
    merge = function (target) {
	for (var _len = arguments.length, objectN = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) objectN[_key - 1] = arguments[_key];

	if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;

	var source = objectN.shift();

	return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
		var value = source[key];

		isObject(value) ? (!target[key] && (target[key] = {}), target[key] = merge(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
	}), extend.apply(undefined, [target].concat(objectN));
};

/**
 * Check if is object
 * @param {Object} obj
 * @returns {Boolean}
 * @private
 */


/**
 * Merge object returning new object
 * @param {Object} target
 * @param {Object} objectN
 * @returns {Object} merged target object
 * @private
 * @example
 *  var target = { a: 1 };
 *  utils.extend(target, { b: 2, c: 3 });
 *  target;  // { a: 1, b: 2, c: 3 };
 */
exports.isValue = isValue;
exports.isDefined = isDefined;
exports.isUndefined = isUndefined;
exports.isBoolean = isBoolean;
exports.notEmpty = notEmpty;
exports.ceil10 = ceil10;
exports.isFunction = isFunction;
exports.asHalfPixel = asHalfPixel;
exports.getOption = getOption;
exports.isString = isString;
exports.hasValue = hasValue;
exports.sanitise = sanitise;
exports.getPathBox = getPathBox;
exports.diffDomain = diffDomain;
exports.isEmpty = isEmpty;
exports.getBrushSelection = getBrushSelection;
exports.brushEmpty = brushEmpty;
exports.extend = extend;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.getRectSegList = getRectSegList;
exports.merge = merge;
exports.isArray = isArray;
exports.isObject = isObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(6),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _d = __webpack_require__(2),
    _Axis = __webpack_require__(7),
    _Axis2 = _interopRequireDefault(_Axis),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
*/
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var ChartInternal = function () {
	function ChartInternal(api) {
		(0, _classCallCheck3.default)(this, ChartInternal);

		var $$ = this;

		$$.api = api, $$.config = $$.getOptions(), $$.data = {}, $$.cache = {}, $$.axes = {};
	}

	return ChartInternal.prototype.beforeInit = function beforeInit() {
		var $$ = this,
		    config = $$.config;
		(0, _util.isFunction)(config.onbeforeinit) && config.onbeforeinit.call($$);
	}, ChartInternal.prototype.afterInit = function afterInit() {
		var $$ = this,
		    config = $$.config;
		(0, _util.isFunction)(config.onafterinit) && config.onafterinit.call($$);
	}, ChartInternal.prototype.init = function init() {
		var $$ = this,
		    config = $$.config;


		if ($$.initParams(), config.data_url) $$.convertUrlToData(config.data_url, config.data_mimeType, config.data_headers, config.data_keys, $$.initWithData);else if (config.data_json) $$.initWithData($$.convertJsonToData(config.data_json, config.data_keys));else if (config.data_rows) $$.initWithData($$.convertRowsToData(config.data_rows));else if (config.data_columns) $$.initWithData($$.convertColumnsToData(config.data_columns));else throw Error("url or json or rows or columns is required.");
	}, ChartInternal.prototype.initParams = function initParams() {
		var $$ = this,
		    config = $$.config;
		$$.clipId = "bb-" + +new Date() + "-clip", $$.clipIdForXAxis = $$.clipId + "-xaxis", $$.clipIdForYAxis = $$.clipId + "-yaxis", $$.clipIdForGrid = $$.clipId + "-grid", $$.clipIdForSubchart = $$.clipId + "-subchart", $$.clipPath = $$.getClipPath($$.clipId), $$.clipPathForXAxis = $$.getClipPath($$.clipIdForXAxis), $$.clipPathForYAxis = $$.getClipPath($$.clipIdForYAxis), $$.clipPathForGrid = $$.getClipPath($$.clipIdForGrid), $$.clipPathForSubchart = $$.getClipPath($$.clipIdForSubchart), $$.dragStart = null, $$.dragging = !1, $$.flowing = !1, $$.cancelClick = !1, $$.mouseover = !1, $$.transiting = !1, $$.color = $$.generateColor(), $$.levelColor = $$.generateLevelColor(), $$.dataTimeFormat = config.data_xLocaltime ? _d.timeParse : _d.utcParse, $$.axisTimeFormat = config.axis_x_localtime ? _d.timeFormat : _d.utcFormat, $$.defaultAxisTimeFormat = function (d) {
			var specifier = d.getMilliseconds() && ".%L" || d.getSeconds() && ".:%S" || d.getMinutes() && "%I:%M" || d.getHours() && "%I %p" || d.getDay() && d.getDate() !== 1 && "%-m/%-d" || d.getDate() !== 1 && "%b %d" || d.getMonth() && "%-m/%-d" || "%Y/%-m/%-d";

			return $$.axisTimeFormat(specifier)(d);
		}, $$.hiddenTargetIds = [], $$.hiddenLegendIds = [], $$.focusedTargetIds = [], $$.defocusedTargetIds = [], $$.xOrient = config.axis_rotated ? "left" : "bottom", $$.yOrient = config.axis_rotated ? config.axis_y_inner ? "top" : "bottom" : config.axis_y_inner ? "right" : "left", $$.y2Orient = config.axis_rotated ? config.axis_y2_inner ? "bottom" : "top" : config.axis_y2_inner ? "left" : "right", $$.subXOrient = config.axis_rotated ? "left" : "bottom", $$.isLegendRight = config.legend_position === "right", $$.isLegendInset = config.legend_position === "inset", $$.isLegendTop = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "top-right", $$.isLegendLeft = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "bottom-left", $$.legendStep = 0, $$.legendItemWidth = 0, $$.legendItemHeight = 0, $$.currentMaxTickWidths = {
			x: 0,
			y: 0,
			y2: 0
		}, $$.rotated_padding_left = 30, $$.rotated_padding_right = config.axis_rotated && !config.axis_x_show ? 0 : 30, $$.rotated_padding_top = 5, $$.withoutFadeIn = {}, $$.intervalForObserveInserted = undefined, $$.inputType = $$.convertInputType(), $$.axes.subx = (0, _d.selectAll)([]);
	}, ChartInternal.prototype.initWithData = function initWithData(data) {
		var $$ = this,
		    config = $$.config,
		    binding = !0;


		if ($$.axis = new _Axis2.default($$), $$.initPie && $$.initPie(), $$.initBrush && $$.initBrush(), $$.initZoom && $$.initZoom(), $$.selectChart = config.bindto ? typeof config.bindto.node === "function" ? config.bindto : (0, _d.select)(config.bindto) : (0, _d.selectAll)([]), $$.selectChart.empty() && ($$.selectChart = (0, _d.select)(document.createElement("div")).style("opacity", "0"), $$.observeInserted($$.selectChart), binding = !1), $$.selectChart.html("").classed("bb", !0), $$.data.xs = {}, $$.data.targets = $$.convertDataToTargets(data), config.data_filter && ($$.data.targets = $$.data.targets.filter(config.data_filter)), config.data_hide && $$.addHiddenTargetIds(config.data_hide === !0 ? $$.mapToIds($$.data.targets) : config.data_hide), config.legend_hide && $$.addHiddenLegendIds(config.legend_hide === !0 ? $$.mapToIds($$.data.targets) : config.legend_hide), $$.hasType("gauge") && (config.legend_show = !1), $$.updateSizes(), $$.updateScales(), $$.x.domain((0, _d.extent)($$.getXDomain($$.data.targets))), $$.y.domain($$.getYDomain($$.data.targets, "y")), $$.y2.domain($$.getYDomain($$.data.targets, "y2")), $$.subX.domain($$.x.domain()), $$.subY.domain($$.y.domain()), $$.subY2.domain($$.y2.domain()), $$.orgXDomain = $$.x.domain(), $$.svg = $$.selectChart.append("svg").style("overflow", "hidden"), config.interaction_enabled && $$.inputType) {
			var isTouch = $$.inputType === "touch";

			$$.svg.on(isTouch ? "touchstart" : "mouseenter", function () {
				return config.onover.call($$);
			}).on(isTouch ? "touchend" : "mouseleave", function () {
				return config.onout.call($$);
			});
		}

		$$.config.svg_classname && $$.svg.attr("class", $$.config.svg_classname);


		// Define defs
		var defs = $$.svg.append("defs");

		$$.clipChart = $$.appendClip(defs, $$.clipId), $$.clipXAxis = $$.appendClip(defs, $$.clipIdForXAxis), $$.clipYAxis = $$.appendClip(defs, $$.clipIdForYAxis), $$.clipGrid = $$.appendClip(defs, $$.clipIdForGrid), $$.clipSubchart = $$.appendClip(defs, $$.clipIdForSubchart), $$.updateSvgSize();


		// Set initialized scales to brush and zoom
		// if ($$.brush) { $$.brush.scale($$.subX); }
		// if (config.zoom_enabled) { $$.zoom.scale($$.x); }

		// Define regions
		var main = $$.svg.append("g").attr("transform", $$.getTranslate("main"));

		$$.main = main, config.subchart_show && $$.initSubchart && $$.initSubchart(), $$.initTooltip && $$.initTooltip(), $$.initLegend && $$.initLegend(), $$.initTitle && $$.initTitle(), main.append("text").attr("class", _classes2.default.text + " " + _classes2.default.empty).attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
		.attr("dominant-baseline", "middle"), $$.initRegion(), $$.initGrid(), config.clipPath || $$.axis.init();


		// Define g for chart area
		var g = main.append("g").attr("class", _classes2.default.chart);

		// Draw with targets
		if (config.clipPath && g.attr("clip-path", $$.clipPath), config.grid_lines_front && $$.initGridLines(), $$.initEventRect(), $$.initChartElements(), main.insert("rect", config.zoom_privileged ? null : "g." + _classes2.default.regions).attr("class", _classes2.default.zoomRect).attr("width", $$.width).attr("height", $$.height).style("opacity", "0").on("dblclick.zoom", null), config.axis_x_extent && $$.brush.scale($$.getDefaultExtent()), config.clipPath && $$.axis.init(), $$.updateTargets($$.data.targets), binding && ($$.updateDimension(), $$.config.oninit.call($$), $$.redraw({
			withTransition: !1,
			withTransform: !0,
			withUpdateXDomain: !0,
			withUpdateOrgXDomain: !0,
			withTransitionForAxis: !1
		}), $$.config.data_onmin || $$.config.data_onmax))

			// data.onmin/max callback
			{
				var _minMax = $$.getMinMaxData();

				(0, _util.isFunction)($$.config.data_onmin) && $$.config.data_onmin.call($$, _minMax.min), (0, _util.isFunction)($$.config.data_onmax) && $$.config.data_onmax.call($$, _minMax.max);
			}

		// Bind resize event
		$$.bindResize(), $$.api.element = $$.selectChart.node();
	}, ChartInternal.prototype.initChartElements = function initChartElements() {
		this.initBar && this.initBar(), this.initLine && this.initLine(), this.initArc && this.initArc(), this.initGauge && this.initGauge(), this.initText && this.initText();
	}, ChartInternal.prototype.smoothLines = function smoothLines(el, type) {
		type === "grid" && el.each(function () {
			var g = (0, _d.select)(this),
			    x1 = g.attr("x1"),
			    x2 = g.attr("x2"),
			    y1 = g.attr("y1"),
			    y2 = g.attr("y2");
			g.attr({
				"x1": Math.ceil(x1),
				"x2": Math.ceil(x2),
				"y1": Math.ceil(y1),
				"y2": Math.ceil(y2)
			});
		});
	}, ChartInternal.prototype.updateSizes = function updateSizes() {
		var $$ = this,
		    config = $$.config,
		    legendHeight = $$.legend ? $$.getLegendHeight() : 0,
		    legendWidth = $$.legend ? $$.getLegendWidth() : 0,
		    legendHeightForBottom = $$.isLegendRight || $$.isLegendInset ? 0 : legendHeight,
		    hasArc = $$.hasArcType(),
		    xAxisHeight = config.axis_rotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x"),
		    subchartHeight = config.subchart_show && !hasArc ? config.subchart_size_height + xAxisHeight : 0;
		$$.currentWidth = $$.getCurrentWidth(), $$.currentHeight = $$.getCurrentHeight(), $$.margin = config.axis_rotated ? {
			top: $$.getHorizontalAxisHeight("y2") + $$.getCurrentPaddingTop(),
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())
		} : {
			top: 4 + $$.getCurrentPaddingTop(), // for top tick text
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: hasArc ? 0 : $$.getCurrentPaddingLeft()
		}, $$.margin2 = config.axis_rotated ? {
			top: $$.margin.top,
			right: NaN,
			bottom: 20 + legendHeightForBottom,
			left: $$.rotated_padding_left
		} : {
			top: $$.currentHeight - subchartHeight - legendHeightForBottom,
			right: NaN,
			bottom: xAxisHeight + legendHeightForBottom,
			left: $$.margin.left
		}, $$.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		}, $$.updateSizeForLegend && $$.updateSizeForLegend(legendHeight, legendWidth), $$.width = $$.currentWidth - $$.margin.left - $$.margin.right, $$.height = $$.currentHeight - $$.margin.top - $$.margin.bottom, $$.width < 0 && ($$.width = 0), $$.height < 0 && ($$.height = 0), $$.width2 = config.axis_rotated ? $$.margin.left - $$.rotated_padding_left - $$.rotated_padding_right : $$.width, $$.height2 = config.axis_rotated ? $$.height : $$.currentHeight - $$.margin2.top - $$.margin2.bottom, $$.width2 < 0 && ($$.width2 = 0), $$.height2 < 0 && ($$.height2 = 0), $$.arcWidth = $$.width - ($$.isLegendRight ? legendWidth + 10 : 0), $$.arcHeight = $$.height - ($$.isLegendRight ? 0 : 10), $$.hasType("gauge") && !config.gauge_fullCircle && ($$.arcHeight += $$.height - $$.getGaugeLabelHeight()), $$.updateRadius && $$.updateRadius(), $$.isLegendRight && hasArc && ($$.margin3.left = $$.arcWidth / 2 + $$.radiusExpanded * 1.1);
	}, ChartInternal.prototype.updateTargets = function updateTargets(targets) {
		var $$ = this;

		// -- Main --

		// -- Text -- //
		$$.updateTargetsForText(targets), $$.updateTargetsForBar(targets), $$.updateTargetsForLine(targets), $$.hasArcType() && $$.updateTargetsForArc && $$.updateTargetsForArc(targets), $$.updateTargetsForSubchart && $$.updateTargetsForSubchart(targets), $$.showTargets();
	}, ChartInternal.prototype.showTargets = function showTargets() {
		var $$ = this;

		$$.svg.selectAll("." + _classes2.default.target).filter(function (d) {
			return $$.isTargetToShow(d.id);
		}).transition().duration($$.config.transition_duration).style("opacity", "1");
	}, ChartInternal.prototype.redraw = function redraw() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    transitionsValue = arguments[1],
		    $$ = this,
		    main = $$.main,
		    config = $$.config,
		    areaIndices = $$.getShapeIndices($$.isAreaType),
		    barIndices = $$.getShapeIndices($$.isBarType),
		    lineIndices = $$.getShapeIndices($$.isLineType),
		    waitForDraw = void 0,
		    flow = void 0,
		    hideAxis = $$.hasArcType(),
		    targetsToShow = $$.filterTargetsToShow($$.data.targets),
		    xv = $$.xv.bind($$),
		    tickValues = void 0,
		    intervalForCulling = void 0,
		    xDomainForZoom = void 0,
		    withY = (0, _util.getOption)(options, "withY", !0),
		    withSubchart = (0, _util.getOption)(options, "withSubchart", !0),
		    withTransition = (0, _util.getOption)(options, "withTransition", !0),
		    withTransform = (0, _util.getOption)(options, "withTransform", !1),
		    withUpdateXDomain = (0, _util.getOption)(options, "withUpdateXDomain", !1),
		    withUpdateOrgXDomain = (0, _util.getOption)(options, "withUpdateOrgXDomain", !1),
		    withTrimXDomain = (0, _util.getOption)(options, "withTrimXDomain", !0),
		    withUpdateXAxis = (0, _util.getOption)(options, "withUpdateXAxis", withUpdateXDomain),
		    withLegend = (0, _util.getOption)(options, "withLegend", !1),
		    withEventRect = (0, _util.getOption)(options, "withEventRect", !0),
		    withDimension = (0, _util.getOption)(options, "withDimension", !0),
		    withTransitionForExit = (0, _util.getOption)(options, "withTransitionForExit", withTransition),
		    withTransitionForAxis = (0, _util.getOption)(options, "withTransitionForAxis", withTransition),
		    duration = withTransition ? config.transition_duration : 0,
		    durationForExit = withTransitionForExit ? duration : 0,
		    durationForAxis = withTransitionForAxis ? duration : 0,
		    transitions = transitionsValue || $$.axis.generateTransitions(durationForAxis);


		// show/hide if manual culling needed
		if ($$.inputType === "touch" && $$.hideTooltip(), withLegend && config.legend_show && !config.legend_contents_bindto ? $$.updateLegend($$.mapToIds($$.data.targets), options, transitions) : withDimension && $$.updateDimension(!0), $$.isCategorized() && targetsToShow.length === 0 && $$.x.domain([0, $$.axes.x.selectAll(".tick").size()]), targetsToShow.length ? ($$.updateXDomain(targetsToShow, withUpdateXDomain, withUpdateOrgXDomain, withTrimXDomain), !config.axis_x_tick_values && (tickValues = $$.axis.updateXAxisTickValues(targetsToShow))) : ($$.xAxis.tickValues([]), $$.subXAxis.tickValues([])), config.zoom_rescale && !options.flow && (xDomainForZoom = $$.x.orgDomain()), $$.y.domain($$.getYDomain(targetsToShow, "y", xDomainForZoom)), $$.y2.domain($$.getYDomain(targetsToShow, "y2", xDomainForZoom)), !config.axis_y_tick_values && config.axis_y_tick_count && $$.yAxis.tickValues($$.axis.generateTickValues($$.y.domain(), config.axis_y_tick_count, $$.isTimeSeriesY())), !config.axis_y2_tick_values && config.axis_y2_tick_count && $$.y2Axis.tickValues($$.axis.generateTickValues($$.y2.domain(), config.axis_y2_tick_count)), $$.axis.redraw(transitions, hideAxis), $$.axis.updateLabels(withTransition), (withUpdateXDomain || withUpdateXAxis) && targetsToShow.length) if (config.axis_x_tick_culling && tickValues) {
				for (var _i = 1; _i < tickValues.length; _i++) if (tickValues.length / _i < config.axis_x_tick_culling_max) {
					intervalForCulling = _i;

					break;
				}

				$$.svg.selectAll("." + _classes2.default.axisX + " .tick text").each(function (e) {
					var index = tickValues.indexOf(e);

					index >= 0 && (0, _d.select)(this).style("display", index % intervalForCulling ? "none" : "block");
				});
			} else $$.svg.selectAll("." + _classes2.default.axisX + " .tick text").style("display", "block");

		// setup drawer - MEMO: these must be called after axis updated
		var drawArea = $$.generateDrawArea ? $$.generateDrawArea(areaIndices, !1) : undefined,
		    drawBar = $$.generateDrawBar ? $$.generateDrawBar(barIndices) : undefined,
		    drawLine = $$.generateDrawLine ? $$.generateDrawLine(lineIndices, !1) : undefined,
		    xForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, !0),
		    yForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, !1);

		withY && ($$.subY.domain($$.getYDomain(targetsToShow, "y")), $$.subY2.domain($$.getYDomain(targetsToShow, "y2"))), $$.updateXgridFocus(), main.select("text." + _classes2.default.text + "." + _classes2.default.empty).attr("x", $$.width / 2).attr("y", $$.height / 2).text(config.data_empty_label_text).transition().style("opacity", targetsToShow.length ? 0 : 1), $$.updateGrid(duration), $$.updateRegion(duration), $$.updateBar(durationForExit), $$.updateLine(durationForExit), $$.updateArea(durationForExit), $$.updateCircle(), $$.hasDataLabel() && $$.updateText(durationForExit), $$.redrawTitle && $$.redrawTitle(), $$.redrawArc && $$.redrawArc(duration, durationForExit, withTransform), config.subchart_show && $$.redrawSubchart && $$.redrawSubchart(withSubchart, transitions, duration, durationForExit, areaIndices, barIndices, lineIndices), main.selectAll("." + _classes2.default.selectedCircles).filter($$.isBarType.bind($$)).selectAll("circle").remove(), config.interaction_enabled && !options.flow && withEventRect && ($$.redrawEventRect(), $$.updateZoom && $$.updateZoom()), $$.updateCircleY();


		// generate circle x/y functions depending on updated params
		var cx = ($$.config.axis_rotated ? $$.circleY : $$.circleX).bind($$),
		    cy = ($$.config.axis_rotated ? $$.circleX : $$.circleY).bind($$);
		options.flow && (flow = $$.generateFlow({
			targets: targetsToShow,
			flow: options.flow,
			duration: options.flow.duration,
			drawBar: drawBar,
			drawLine: drawLine,
			drawArea: drawArea,
			cx: cx,
			cy: cy,
			xv: xv,
			xForText: xForText,
			yForText: yForText
		})), (duration || flow) && $$.isTabVisible() ? (0, _d.transition)().duration(duration).each(function () {
			waitForDraw = $$.generateWait(), [$$.redrawBar(drawBar, !0), $$.redrawLine(drawLine, !0), $$.redrawArea(drawArea, !0), $$.redrawCircle(cx, cy, !0, flow), $$.redrawText(xForText, yForText, options.flow, !0), $$.redrawRegion(!0), $$.redrawGrid(!0)].reduce(function (acc, t1) {
				return t1.forEach(function (t2) {
					acc.push(t2);
				}), acc;
			}, []).forEach(function (t) {
				waitForDraw.add(t);
			});
		}).call(waitForDraw, function () {
			flow && flow(), config.onrendered && config.onrendered.call($$);
		}) : ($$.redrawBar(drawBar), $$.redrawLine(drawLine), $$.redrawArea(drawArea), $$.redrawCircle(cx, cy), $$.redrawText(xForText, yForText, options.flow), $$.redrawRegion(), $$.redrawGrid(), config.onrendered && config.onrendered.call($$)), $$.mapToIds($$.data.targets).forEach(function (id) {
			$$.withoutFadeIn[id] = !0;
		});
	}, ChartInternal.prototype.updateAndRedraw = function updateAndRedraw() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    $$ = this,
		    config = $$.config,
		    transitions = void 0;
		options.withTransition = (0, _util.getOption)(options, "withTransition", !0), options.withTransform = (0, _util.getOption)(options, "withTransform", !1), options.withLegend = (0, _util.getOption)(options, "withLegend", !1), options.withUpdateXDomain = !0, options.withUpdateOrgXDomain = !0, options.withTransitionForExit = !1, options.withTransitionForTransform = (0, _util.getOption)(options, "withTransitionForTransform", options.withTransition), $$.updateSizes(), options.withLegend && config.legend_show || (transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0), $$.updateScales(), $$.updateSvgSize(), $$.transformAll(options.withTransitionForTransform, transitions)), $$.redraw(options, transitions);
	}, ChartInternal.prototype.redrawWithoutRescale = function redrawWithoutRescale() {
		this.redraw({
			withY: !1,
			withSubchart: !1,
			withEventRect: !1,
			withTransitionForAxis: !1
		});
	}, ChartInternal.prototype.isTimeSeries = function isTimeSeries() {
		return this.config.axis_x_type === "timeseries";
	}, ChartInternal.prototype.isCategorized = function isCategorized() {
		return this.config.axis_x_type.indexOf("category") >= 0;
	}, ChartInternal.prototype.isCustomX = function isCustomX() {
		var $$ = this,
		    config = $$.config;


		return !$$.isTimeSeries() && (config.data_x || (0, _util.notEmpty)(config.data_xs));
	}, ChartInternal.prototype.isTimeSeriesY = function isTimeSeriesY() {
		return this.config.axis_y_type === "timeseries";
	}, ChartInternal.prototype.getTranslate = function getTranslate(target) {
		var $$ = this,
		    config = $$.config,
		    x = void 0,
		    y = void 0;


		return target === "main" ? (x = (0, _util.asHalfPixel)($$.margin.left), y = (0, _util.asHalfPixel)($$.margin.top)) : target === "context" ? (x = (0, _util.asHalfPixel)($$.margin2.left), y = (0, _util.asHalfPixel)($$.margin2.top)) : target === "legend" ? (x = $$.margin3.left, y = $$.margin3.top) : target === "x" ? (x = 0, y = config.axis_rotated ? 0 : $$.height) : target === "y" ? (x = 0, y = config.axis_rotated ? $$.height : 0) : target === "y2" ? (x = config.axis_rotated ? 0 : $$.width, y = config.axis_rotated ? 1 : 0) : target === "subx" ? (x = 0, y = config.axis_rotated ? 0 : $$.height2) : target === "arc" && (x = $$.arcWidth / 2, y = $$.arcHeight / 2), "translate(" + x + ", " + y + ")";
	}, ChartInternal.prototype.initialOpacity = function initialOpacity(d) {
		return d.value !== null && this.withoutFadeIn[d.id] ? "1" : "0";
	}, ChartInternal.prototype.initialOpacityForCircle = function initialOpacityForCircle(d) {
		return d.value !== null && this.withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
	}, ChartInternal.prototype.opacityForCircle = function opacityForCircle(d) {
		var opacity = this.config.point_show ? "1" : "0";

		return (0, _util.isValue)(d.value) ? this.isScatterType(d) ? "0.5" : opacity : "0";
	}, ChartInternal.prototype.opacityForText = function opacityForText() {
		return this.hasDataLabel() ? "1" : "0";
	}, ChartInternal.prototype.xx = function xx(d) {
		return this.config.zoom_enabled && this.zoomScale ? d ? this.zoomScale(d.x) : null : d ? this.x(d.x) : null;
	}, ChartInternal.prototype.xv = function xv(d) {
		var $$ = this,
		    value = d.value;


		return $$.isTimeSeries() ? value = $$.parseDate(d.value) : $$.isCategorized() && typeof d.value === "string" && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
	}, ChartInternal.prototype.yv = function yv(d) {
		var $$ = this,
		    yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y;


		return Math.ceil(yScale(d.value));
	}, ChartInternal.prototype.subxx = function subxx(d) {
		return d ? this.subX(d.x) : null;
	}, ChartInternal.prototype.transformMain = function transformMain(withTransition, transitions) {
		var $$ = this,
		    xAxis = void 0,
		    yAxis = void 0,
		    y2Axis = void 0;
		transitions && transitions.axisX ? xAxis = transitions.axisX : (xAxis = $$.main.select("." + _classes2.default.axisX), withTransition && (xAxis = xAxis.transition())), transitions && transitions.axisY ? yAxis = transitions.axisY : (yAxis = $$.main.select("." + _classes2.default.axisY), withTransition && (yAxis = yAxis.transition())), transitions && transitions.axisY2 ? y2Axis = transitions.axisY2 : (y2Axis = $$.main.select("." + _classes2.default.axisY2), withTransition && (y2Axis = y2Axis.transition())), (withTransition ? $$.main.transition() : $$.main).attr("transform", $$.getTranslate("main")), xAxis.attr("transform", $$.getTranslate("x")), yAxis.attr("transform", $$.getTranslate("y")), y2Axis.attr("transform", $$.getTranslate("y2")), $$.main.select("." + _classes2.default.chartArcs).attr("transform", $$.getTranslate("arc"));
	}, ChartInternal.prototype.transformAll = function transformAll(withTransition, transitions) {
		var $$ = this;

		$$.transformMain(withTransition, transitions), $$.config.subchart_show && $$.transformContext(withTransition, transitions), $$.legend && $$.transformLegend(withTransition);
	}, ChartInternal.prototype.updateSvgSize = function updateSvgSize() {
		var $$ = this,
		    brush = $$.svg.select("." + _classes2.default.brush + " .overlay"),
		    brushHeight = brush.size() ? brush.attr("height") : 0;
		$$.svg.attr("width", $$.currentWidth).attr("height", $$.currentHeight), $$.svg.selectAll(["#" + $$.clipId, "#" + $$.clipIdForGrid]).select("rect").attr("width", $$.width).attr("height", $$.height), $$.svg.select("#" + $$.clipIdForXAxis).select("rect").attr("x", $$.getXAxisClipX.bind($$)).attr("y", $$.getXAxisClipY.bind($$)).attr("width", $$.getXAxisClipWidth.bind($$)).attr("height", $$.getXAxisClipHeight.bind($$)), $$.svg.select("#" + $$.clipIdForYAxis).select("rect").attr("x", $$.getYAxisClipX.bind($$)).attr("y", $$.getYAxisClipY.bind($$)).attr("width", $$.getYAxisClipWidth.bind($$)).attr("height", $$.getYAxisClipHeight.bind($$)), $$.svg.select("#" + $$.clipIdForSubchart).select("rect").attr("width", $$.width).attr("height", brushHeight), $$.svg.select("." + _classes2.default.zoomRect).attr("width", $$.width).attr("height", $$.height), $$.selectChart.style("max-height", $$.currentHeight + "px"), $$.brush && $$.brush.scale($$.subX, brushHeight);
	}, ChartInternal.prototype.updateDimension = function updateDimension(withoutAxis) {
		var $$ = this;

		withoutAxis || ($$.config.axis_rotated ? ($$.axes.x.call($$.xAxis), $$.axes.subx.call($$.subXAxis)) : ($$.axes.y.call($$.yAxis), $$.axes.y2.call($$.y2Axis))), $$.updateSizes(), $$.updateScales(withoutAxis), $$.updateSvgSize(), $$.transformAll(!1);
	}, ChartInternal.prototype.observeInserted = function observeInserted(selection) {
		var $$ = this;

		if (typeof MutationObserver === "undefined") return void (console && console.error && console.error("MutationObserver not defined."));

		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				mutation.type === "childList" && mutation.previousSibling && (observer.disconnect(), $$.intervalForObserveInserted = window.setInterval(function () {
					selection.node().parentNode && (window.clearInterval($$.intervalForObserveInserted), $$.updateDimension(), $$.brush && $$.brush.update(), $$.config.oninit.call($$), $$.redraw({
						withTransform: !0,
						withUpdateXDomain: !0,
						withUpdateOrgXDomain: !0,
						withTransition: !1,
						withTransitionForTransform: !1,
						withLegend: !0
					}), selection.transition().style("opacity", "1"));
				}, 10));
			});
		});

		observer.observe(selection.node(), {
			attributes: !0,
			childList: !0,
			characterData: !0
		});
	}, ChartInternal.prototype.bindResize = function bindResize() {
		var $$ = this,
		    config = $$.config;
		$$.resizeFunction = $$.generateResize(), $$.resizeFunction.add(function () {
			config.onresize.call($$);
		}), config.resize_auto && $$.resizeFunction.add(function () {
			$$.resizeTimeout !== undefined && window.clearTimeout($$.resizeTimeout), $$.resizeTimeout = window.setTimeout(function () {
				delete $$.resizeTimeout, $$.api.flush();
			}, 100);
		}), $$.resizeFunction.add(function () {
			config.onresized.call($$);
		}), (0, _util.addEvent)(window, "resize", $$.resizeFunction);
	}, ChartInternal.prototype.generateResize = function generateResize() {

		function callResizeFunctions() {
			resizeFunctions.forEach(function (f) {
				return f();
			});
		}

		var resizeFunctions = [];

		return callResizeFunctions.add = function (f) {
			resizeFunctions.push(f);
		}, callResizeFunctions.remove = function (f) {
			for (var i = 0; i < resizeFunctions.length; i++) if (resizeFunctions[i] === f) {
				resizeFunctions.splice(i, 1);

				break;
			}
		}, callResizeFunctions;
	}, ChartInternal.prototype.endall = function endall(transition, callback) {
		var n = 0;

		transition.each(function () {
			return ++n;
		}).on("end", function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];

			--n || callback.apply.apply(callback, [this].concat(args));
		});
	}, ChartInternal.prototype.generateWait = function generateWait() {
		var transitionsToWait = [],
		    f = function (transition, callback) {

			function loop() {
				var done = 0;

				transitionsToWait.forEach(function (t) {
					if (t.empty()) return void (done += 1);

					try {
						t.transition();
					} catch (e) {
						done += 1;
					}
				}), done === transitionsToWait.length ? (clearTimeout(timer), callback && callback()) : timer = setTimeout(loop, 20);
			}

			var timer = void 0;loop();
		};


		return f.add = function (transition) {
			Array.isArray(transition) ? transitionsToWait = [].concat(transitionsToWait, transition) : transitionsToWait.push(transition);
		}, f;
	}, ChartInternal.prototype.parseDate = function parseDate(date) {
		var $$ = this,
		    parsedDate = void 0;


		return date instanceof Date ? parsedDate = date : typeof date === "string" ? parsedDate = $$.dataTimeFormat($$.config.data_xFormat)(date) : typeof date === "number" && !isNaN(date) && (parsedDate = new Date(+date)), (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
	}, ChartInternal.prototype.isTabVisible = function isTabVisible() {
		var hidden = void 0;

		return typeof document.hidden === "undefined" ? typeof document.mozHidden === "undefined" ? typeof document.msHidden === "undefined" ? typeof document.webkitHidden !== "undefined" && (hidden = "webkitHidden") : hidden = "msHidden" : hidden = "mozHidden" : hidden = "hidden", !document[hidden];
	}, ChartInternal.prototype.convertInputType = function convertInputType() {
		var $$ = this,
		    config = $$.config,
		    hasMouse = !!config.interaction_inputType_mouse && "onmouseover" in window,
		    hasTouch = !1;


		return config.interaction_inputType_touch && (hasTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), hasTouch && "touch" || hasMouse && "mouse" || null;
	}, ChartInternal;
}();

exports.default = ChartInternal;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// https://d3js.org Version 4.10.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var version = "4.10.0";

var ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};

var bisector = function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;

var pairs = function(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
};

function pair(a, b) {
  return [a, b];
}

var cross = function(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
};

var descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var number = function(x) {
  return x === null ? NaN : +x;
};

var variance = function(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
};

var deviation = function(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
};

var extent = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
};

var array = Array.prototype;

var slice = array.slice;
var map = array.map;

var constant = function(x) {
  return function() {
    return x;
  };
};

var identity = function(x) {
  return x;
};

var sequence = function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);

var ticks = function(start, stop, count) {
  var reverse = stop < start,
      i = -1,
      n,
      ticks,
      step;

  if (reverse) n = start, start = stop, stop = n;

  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
};

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

var sturges = function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
};

var histogram = function() {
  var value = identity,
      domain = extent,
      threshold = sturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = sequence(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisectRight(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
};

var threshold = function(values, p, valueof) {
  if (valueof == null) valueof = number;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
};

var freedmanDiaconis = function(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (threshold(values, 0.75) - threshold(values, 0.25)) * Math.pow(values.length, -1 / 3)));
};

var scott = function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
};

var max = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
};

var mean = function(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
};

var median = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return threshold(numbers.sort(ascending), 0.5);
};

var merge = function(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
};

var min = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
};

var permute = function(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};

var scan = function(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
};

var shuffle = function(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
};

var sum = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
};

var transpose = function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
};

function length(d) {
  return d.length;
}

var zip = function() {
  return transpose(arguments);
};

var slice$1 = Array.prototype.slice;

var identity$1 = function(x) {
  return x;
};

var top = 1;
var right = 2;
var bottom = 3;
var left = 4;
var epsilon = 1e-6;

function translateX(x) {
  return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y) {
  return "translate(0," + (y + 0.5) + ")";
}

function number$1(scale) {
  return function(d) {
    return +scale(d);
  };
}

function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return +scale(d) + offset;
  };
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$1) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + 0.5,
        range1 = +range[range.length - 1] + 0.5,
        position = (scale.bandwidth ? center : number$1)(scale.copy()),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "#000"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "#000")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "#000")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient == right
            ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
            : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d)); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = slice$1.call(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : slice$1.call(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : slice$1.call(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}

var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

var namespace = function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
};

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

var creator = function(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
};

var nextId = 0;

function local$1() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local$1.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

var matcher$1 = matcher;

var filterEvents = {};

exports.event = null;

if (typeof document !== "undefined") {
  var element$1 = document.documentElement;
  if (!("onmouseenter" in element$1)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = exports.event; // Events can be reentrant (e.g., focus).
    exports.event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event0;
    }
  };
}

function parseTypenames$1(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

var selection_on = function(typename, value, capture) {
  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
};

function customEvent(event1, listener, that, args) {
  var event0 = exports.event;
  event1.sourceEvent = exports.event;
  exports.event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event0;
  }
}

var sourceEvent = function() {
  var current = exports.event, source;
  while (source = current.sourceEvent) current = source;
  return current;
};

var point = function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};

var mouse = function(node) {
  var event = sourceEvent();
  if (event.changedTouches) event = event.changedTouches[0];
  return point(node, event);
};

function none() {}

var selector = function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
};

var selection_select = function(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

function empty$1() {
  return [];
}

var selectorAll = function(selector) {
  return selector == null ? empty$1 : function() {
    return this.querySelectorAll(selector);
  };
};

var selection_selectAll = function(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
};

var selection_filter = function(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

var sparse = function(update) {
  return new Array(update.length);
};

var selection_enter = function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
};

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

var constant$1 = function(x) {
  return function() {
    return x;
  };
};

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

var selection_data = function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$1(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};

var selection_exit = function() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
};

var selection_merge = function(selection$$1) {

  for (var groups0 = this._groups, groups1 = selection$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
};

var selection_order = function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
};

var selection_sort = function(compare) {
  if (!compare) compare = ascending$1;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
};

function ascending$1(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

var selection_call = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};

var selection_nodes = function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
};

var selection_node = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
};

var selection_size = function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
};

var selection_empty = function() {
  return !this.node();
};

var selection_each = function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
};

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

var selection_attr = function(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
};

var defaultView = function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
};

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

var selection_style = function(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
};

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

var selection_property = function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
};

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

var selection_classed = function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
};

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

var selection_text = function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
};

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

var selection_html = function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
};

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

var selection_raise = function() {
  return this.each(raise);
};

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

var selection_lower = function() {
  return this.each(lower);
};

var selection_append = function(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
};

function constantNull() {
  return null;
}

var selection_insert = function(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

var selection_remove = function() {
  return this.each(remove);
};

var selection_datum = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
};

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

var selection_dispatch = function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
};

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  merge: selection_merge,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

var select = function(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
};

var selectAll = function(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
};

var touch = function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point(node, touch);
    }
  }

  return null;
};

var touches = function(node, touches) {
  if (touches == null) touches = sourceEvent().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point(node, touches[i]);
  }

  return points;
};

function nopropagation() {
  exports.event.stopImmediatePropagation();
}

var noevent = function() {
  exports.event.preventDefault();
  exports.event.stopImmediatePropagation();
};

var dragDisable = function(view) {
  var root = view.document.documentElement,
      selection$$1 = select(view).on("dragstart.drag", noevent, true);
  if ("onselectstart" in root) {
    selection$$1.on("selectstart.drag", noevent, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
};

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection$$1 = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection$$1.on("click.drag", noevent, true);
    setTimeout(function() { selection$$1.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection$$1.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var constant$2 = function(x) {
  return function() {
    return x;
  };
};

function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
  this.target = target;
  this.type = type;
  this.subject = subject;
  this.identifier = id;
  this.active = active;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch;
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter$1() {
  return !exports.event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(d) {
  return d == null ? {x: exports.event.x, y: exports.event.y} : d;
}

function touchable() {
  return "ontouchstart" in this;
}

var drag = function() {
  var filter = defaultFilter$1,
      container = defaultContainer,
      subject = defaultSubject,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
    if (!gesture) return;
    select(exports.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    dragDisable(exports.event.view);
    nopropagation();
    mousemoving = false;
    mousedownx = exports.event.clientX;
    mousedowny = exports.event.clientY;
    gesture("start");
  }

  function mousemoved() {
    noevent();
    if (!mousemoving) {
      var dx = exports.event.clientX - mousedownx, dy = exports.event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag");
  }

  function mouseupped() {
    select(exports.event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(exports.event.view, mousemoving);
    noevent();
    gestures.mouse("end");
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches$$1 = exports.event.changedTouches,
        c = container.apply(this, arguments),
        n = touches$$1.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches$$1[i].identifier, c, touch, this, arguments)) {
        nopropagation();
        gesture("start");
      }
    }
  }

  function touchmoved() {
    var touches$$1 = exports.event.changedTouches,
        n = touches$$1.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches$$1[i].identifier]) {
        noevent();
        gesture("drag");
      }
    }
  }

  function touchended() {
    var touches$$1 = exports.event.changedTouches,
        n = touches$$1.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches$$1[i].identifier]) {
        nopropagation();
        gesture("end");
      }
    }
  }

  function beforestart(id, container, point, that, args) {
    var p = point(container, id), s, dx, dy,
        sublisteners = listeners.copy();

    if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((exports.event.subject = s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;

    return function gesture(type) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[id] = gesture, n = active++; break;
        case "end": delete gestures[id], --active; // nobreak
        case "drag": p = point(container, id), n = active; break;
      }
      customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
};

var define = function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex3 = /^#([0-9a-f]{3})$/;
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

var Kn = 18;
var Xn = 0.950470;
var Yn = 1;
var Zn = 1.088830;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var b = rgb2xyz(o.r),
      a = rgb2xyz(o.g),
      l = rgb2xyz(o.b),
      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));

var A = -0.14861;
var B = +1.78277;
var C = -0.29227;
var D = -0.90649;
var E = +1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

var basis$1 = function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

var basisClosed = function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

var constant$3 = function(x) {
  return function() {
    return x;
  };
};

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$3(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color$$1 = gamma(y);

  function rgb$$1(start, end) {
    var r = color$$1((start = rgb(start)).r, (end = rgb(end)).r),
        g = color$$1(start.g, end.g),
        b = color$$1(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$$1.gamma = rgbGamma;

  return rgb$$1;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color$$1;
    for (i = 0; i < n; ++i) {
      color$$1 = rgb(colors[i]);
      r[i] = color$$1.r || 0;
      g[i] = color$$1.g || 0;
      b[i] = color$$1.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color$$1.opacity = 1;
    return function(t) {
      color$$1.r = r(t);
      color$$1.g = g(t);
      color$$1.b = b(t);
      return color$$1 + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);
var rgbBasisClosed = rgbSpline(basisClosed);

var array$1 = function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(nb),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolateValue(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
};

var date = function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
};

var reinterpolate = function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
};

var object = function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolateValue(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

var interpolateString = function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: reinterpolate(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
};

var interpolateValue = function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$3(b)
      : (t === "number" ? reinterpolate
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array$1
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : reinterpolate)(a, b);
};

var interpolateRound = function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
};

var degrees = 180 / Math.PI;

var identity$2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

var decompose = function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
};

var cssNode;
var cssRoot;
var cssView;
var svgNode;

function parseCss(value) {
  if (value === "none") return identity$2;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity$2;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: reinterpolate(xa, xb)}, {i: i - 2, x: reinterpolate(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: reinterpolate(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: reinterpolate(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: reinterpolate(xa, xb)}, {i: i - 2, x: reinterpolate(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var rho = Math.SQRT2;
var rho2 = 2;
var rho4 = 4;
var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
var interpolateZoom = function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    };
  }

  i.duration = S * 1000;

  return i;
};

function hsl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = hsl(start)).h, (end = hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hsl$2 = hsl$1(hue);
var hslLong = hsl$1(nogamma);

function lab$1(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

function hcl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = hcl(start)).h, (end = hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hcl$2 = hcl$1(hue);
var hclLong = hcl$1(nogamma);

function cubehelix$1(hue$$1) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix$$1(start, end) {
      var h = hue$$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix$$1.gamma = cubehelixGamma;

    return cubehelix$$1;
  })(1);
}

var cubehelix$2 = cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);

var quantize = function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
};

var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1000;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, delay);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

var timeout$1 = function(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
};

var interval$1 = function(callback, delay, time) {
  var t = new Timer, total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? now() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
};

var emptyOn = dispatch("start", "end", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

var schedule = function(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
};

function init(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
  return schedule;
}

function set$1(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
  return schedule;
}

function get$1(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout$1(start);

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout$1(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(null, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

var interrupt = function(node, name) {
  var schedules = node.__transition,
      schedule$$1,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule$$1 = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule$$1.state > STARTING && schedule$$1.state < ENDING;
    schedule$$1.state = ENDED;
    schedule$$1.timer.stop();
    if (active) schedule$$1.on.call("interrupt", node, node.__data__, schedule$$1.index, schedule$$1.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
};

var selection_interrupt = function(name) {
  return this.each(function() {
    interrupt(this, name);
  });
};

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule$$1 = set$1(this, id),
        tween = schedule$$1.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule$$1.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule$$1 = set$1(this, id),
        tween = schedule$$1.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule$$1.tween = tween1;
  };
}

var transition_tween = function(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get$1(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
};

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule$$1 = set$1(this, id);
    (schedule$$1.value || (schedule$$1.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get$1(node, id).value[name];
  };
}

var interpolate = function(a, b) {
  var c;
  return (typeof b === "number" ? reinterpolate
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
};

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrConstantNS$1(fullname, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrFunction$1(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS$1(fullname, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

var transition_attr = function(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value + ""));
};

function attrTweenNS(fullname, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttribute(name, i(t));
    };
  }
  tween._value = value;
  return tween;
}

var transition_attrTween = function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
};

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

var transition_delay = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get$1(this.node(), id).delay;
};

function durationFunction(id, value) {
  return function() {
    set$1(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set$1(this, id).duration = value;
  };
}

var transition_duration = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get$1(this.node(), id).duration;
};

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set$1(this, id).ease = value;
  };
}

var transition_ease = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get$1(this.node(), id).ease;
};

var transition_filter = function(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
};

var transition_merge = function(transition$$1) {
  if (transition$$1._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
};

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set$1;
  return function() {
    var schedule$$1 = sit(this, id),
        on = schedule$$1.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule$$1.on = on1;
  };
}

var transition_on = function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get$1(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
};

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

var transition_remove = function() {
  return this.on("end.remove", removeFunction(this._id));
};

var transition_select = function(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") select$$1 = selector(select$$1);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select$$1.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
};

var transition_selectAll = function(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") select$$1 = selectorAll(select$$1);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select$$1.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
};

var Selection$1 = selection.prototype.constructor;

var transition_selection = function() {
  return new Selection$1(this._groups, this._parents);
};

function styleRemove$1(name, interpolate$$1) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name),
        value1 = (this.style.removeProperty(name), styleValue(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function styleFunction$1(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name),
        value1 = value(this);
    if (value1 == null) value1 = (this.style.removeProperty(name), styleValue(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

var transition_style = function(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
          .styleTween(name, styleRemove$1(name, i))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, typeof value === "function"
          ? styleFunction$1(name, i, tweenValue(this, "style." + name, value))
          : styleConstant$1(name, i, value + ""), priority);
};

function styleTween(name, value, priority) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.style.setProperty(name, i(t), priority);
    };
  }
  tween._value = value;
  return tween;
}

var transition_styleTween = function(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
};

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

var transition_text = function(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction$1(tweenValue(this, "text", value))
      : textConstant$1(value == null ? "" : value + ""));
};

var transition_transition = function() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get$1(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
};

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease
};

function linear$1(t) {
  return +t;
}

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);

var pi = Math.PI;
var halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}

function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

var b1 = 4 / 11;
var b2 = 6 / 11;
var b3 = 8 / 11;
var b4 = 3 / 4;
var b5 = 9 / 11;
var b6 = 10 / 11;
var b7 = 15 / 16;
var b8 = 21 / 22;
var b9 = 63 / 64;
var b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}

var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);

var tau = 2 * Math.PI;
var amplitude = 1;
var period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}

var selection_transition = function(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
};

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var root$1 = [null];

var active = function(node, name) {
  var schedules = node.__transition,
      schedule$$1,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule$$1 = schedules[i]).state > SCHEDULED && schedule$$1.name === name) {
        return new Transition([[node]], root$1, name, +i);
      }
    }
  }

  return null;
};

var constant$4 = function(x) {
  return function() {
    return x;
  };
};

var BrushEvent = function(target, type, selection) {
  this.target = target;
  this.type = type;
  this.selection = selection;
};

function nopropagation$1() {
  exports.event.stopImmediatePropagation();
}

var noevent$1 = function() {
  exports.event.preventDefault();
  exports.event.stopImmediatePropagation();
};

var MODE_DRAG = {name: "drag"};
var MODE_SPACE = {name: "space"};
var MODE_HANDLE = {name: "handle"};
var MODE_CENTER = {name: "center"};

var X = {
  name: "x",
  handles: ["e", "w"].map(type),
  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
};

var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
};

var XY = {
  name: "xy",
  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
  input: function(xy) { return xy; },
  output: function(xy) { return xy; }
};

var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};

var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};

var signsX = {
  overlay: +1,
  selection: +1,
  n: null,
  e: +1,
  s: null,
  w: -1,
  nw: -1,
  ne: +1,
  se: +1,
  sw: -1
};

var signsY = {
  overlay: +1,
  selection: +1,
  n: -1,
  e: null,
  s: +1,
  w: null,
  nw: -1,
  ne: -1,
  se: +1,
  sw: +1
};

function type(t) {
  return {type: t};
}

// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !exports.event.button;
}

function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}

// Like d3.local, but with the name “__brush” rather than auto-generated.
function local$$1(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}

function empty(extent) {
  return extent[0][0] === extent[1][0]
      || extent[0][1] === extent[1][1];
}

function brushSelection(node) {
  var state = node.__brush;
  return state ? state.dim.output(state.selection) : null;
}

function brushX() {
  return brush$1(X);
}

function brushY() {
  return brush$1(Y);
}

var brush = function() {
  return brush$1(XY);
};

function brush$1(dim) {
  var extent = defaultExtent,
      filter = defaultFilter,
      listeners = dispatch(brush, "start", "brush", "end"),
      handleSize = 6,
      touchending;

  function brush(group) {
    var overlay = group
        .property("__brush", initialize)
      .selectAll(".overlay")
      .data([type("overlay")]);

    overlay.enter().append("rect")
        .attr("class", "overlay")
        .attr("pointer-events", "all")
        .attr("cursor", cursors.overlay)
      .merge(overlay)
        .each(function() {
          var extent = local$$1(this).extent;
          select(this)
              .attr("x", extent[0][0])
              .attr("y", extent[0][1])
              .attr("width", extent[1][0] - extent[0][0])
              .attr("height", extent[1][1] - extent[0][1]);
        });

    group.selectAll(".selection")
      .data([type("selection")])
      .enter().append("rect")
        .attr("class", "selection")
        .attr("cursor", cursors.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");

    var handle = group.selectAll(".handle")
      .data(dim.handles, function(d) { return d.type; });

    handle.exit().remove();

    handle.enter().append("rect")
        .attr("class", function(d) { return "handle handle--" + d.type; })
        .attr("cursor", function(d) { return cursors[d.type]; });

    group
        .each(redraw)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        .on("mousedown.brush touchstart.brush", started);
  }

  brush.move = function(group, selection) {
    if (group.selection) {
      group
          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
          .tween("brush", function() {
            var that = this,
                state = that.__brush,
                emit = emitter(that, arguments),
                selection0 = state.selection,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
                i = interpolateValue(selection0, selection1);

            function tween(t) {
              state.selection = t === 1 && empty(selection1) ? null : i(t);
              redraw.call(that);
              emit.brush();
            }

            return selection0 && selection1 ? tween : tween(1);
          });
    } else {
      group
          .each(function() {
            var that = this,
                args = arguments,
                state = that.__brush,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
                emit = emitter(that, args).beforestart();

            interrupt(that);
            state.selection = selection1 == null || empty(selection1) ? null : selection1;
            redraw.call(that);
            emit.start().brush().end();
          });
    }
  };

  function redraw() {
    var group = select(this),
        selection = local$$1(this).selection;

    if (selection) {
      group.selectAll(".selection")
          .style("display", null)
          .attr("x", selection[0][0])
          .attr("y", selection[0][1])
          .attr("width", selection[1][0] - selection[0][0])
          .attr("height", selection[1][1] - selection[0][1]);

      group.selectAll(".handle")
          .style("display", null)
          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
          .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
    }

    else {
      group.selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
    }
  }

  function emitter(that, args) {
    return that.__brush.emitter || new Emitter(that, args);
  }

  function Emitter(that, args) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
  }

  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function() {
      if (this.starting) this.starting = false, this.emit("start");
      return this;
    },
    brush: function() {
      this.emit("brush");
      return this;
    },
    end: function() {
      if (--this.active === 0) delete this.state.emitter, this.emit("end");
      return this;
    },
    emit: function(type) {
      customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function started() {
    if (exports.event.touches) { if (exports.event.changedTouches.length < exports.event.touches.length) return noevent$1(); }
    else if (touchending) return;
    if (!filter.apply(this, arguments)) return;

    var that = this,
        type = exports.event.target.__data__.type,
        mode = (exports.event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (exports.event.altKey ? MODE_CENTER : MODE_HANDLE),
        signX = dim === Y ? null : signsX[type],
        signY = dim === X ? null : signsY[type],
        state = local$$1(that),
        extent = state.extent,
        selection = state.selection,
        W = extent[0][0], w0, w1,
        N = extent[0][1], n0, n1,
        E = extent[1][0], e0, e1,
        S = extent[1][1], s0, s1,
        dx,
        dy,
        moving,
        shifting = signX && signY && exports.event.shiftKey,
        lockX,
        lockY,
        point0 = mouse(that),
        point = point0,
        emit = emitter(that, arguments).beforestart();

    if (type === "overlay") {
      state.selection = selection = [
        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
      ];
    } else {
      w0 = selection[0][0];
      n0 = selection[0][1];
      e0 = selection[1][0];
      s0 = selection[1][1];
    }

    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;

    var group = select(that)
        .attr("pointer-events", "none");

    var overlay = group.selectAll(".overlay")
        .attr("cursor", cursors[type]);

    if (exports.event.touches) {
      group
          .on("touchmove.brush", moved, true)
          .on("touchend.brush touchcancel.brush", ended, true);
    } else {
      var view = select(exports.event.view)
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)
          .on("mousemove.brush", moved, true)
          .on("mouseup.brush", ended, true);

      dragDisable(exports.event.view);
    }

    nopropagation$1();
    interrupt(that);
    redraw.call(that);
    emit.start();

    function moved() {
      var point1 = mouse(that);
      if (shifting && !lockX && !lockY) {
        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
        else lockX = true;
      }
      point = point1;
      moving = true;
      noevent$1();
      move();
    }

    function move() {
      var t;

      dx = point[0] - point0[0];
      dy = point[1] - point0[1];

      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
          else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
          break;
        }
      }

      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
      }

      if (s1 < n1) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n1, n1 = s1, s1 = t;
        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
      }

      if (state.selection) selection = state.selection; // May be set by brush.move!
      if (lockX) w1 = selection[0][0], e1 = selection[1][0];
      if (lockY) n1 = selection[0][1], s1 = selection[1][1];

      if (selection[0][0] !== w1
          || selection[0][1] !== n1
          || selection[1][0] !== e1
          || selection[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush();
      }
    }

    function ended() {
      nopropagation$1();
      if (exports.event.touches) {
        if (exports.event.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
      } else {
        yesdrag(exports.event.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
      if (empty(selection)) state.selection = null, redraw.call(that);
      emit.end();
    }

    function keydowned() {
      switch (exports.event.keyCode) {
        case 16: { // SHIFT
          shifting = signX && signY;
          break;
        }
        case 18: { // ALT
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
            mode = MODE_CENTER;
            move();
          }
          break;
        }
        case 32: { // SPACE; takes priority over ALT
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$1();
    }

    function keyupped() {
      switch (exports.event.keyCode) {
        case 16: { // SHIFT
          if (shifting) {
            lockX = lockY = shifting = false;
            move();
          }
          break;
        }
        case 18: { // ALT
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
            mode = MODE_HANDLE;
            move();
          }
          break;
        }
        case 32: { // SPACE
          if (mode === MODE_SPACE) {
            if (exports.event.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type]);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$1();
    }
  }

  function initialize() {
    var state = this.__brush || {selection: null};
    state.extent = extent.apply(this, arguments);
    state.dim = dim;
    return state;
  }

  brush.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$4([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
  };

  brush.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$4(!!_), brush) : filter;
  };

  brush.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush) : handleSize;
  };

  brush.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush : value;
  };

  return brush;
}

var cos = Math.cos;
var sin = Math.sin;
var pi$1 = Math.PI;
var halfPi$1 = pi$1 / 2;
var tau$1 = pi$1 * 2;
var max$1 = Math.max;

function compareValue(compare) {
  return function(a, b) {
    return compare(
      a.source.value + a.target.value,
      b.source.value + b.target.value
    );
  };
}

var chord = function() {
  var padAngle = 0,
      sortGroups = null,
      sortSubgroups = null,
      sortChords = null;

  function chord(matrix) {
    var n = matrix.length,
        groupSums = [],
        groupIndex = sequence(n),
        subgroupIndex = [],
        chords = [],
        groups = chords.groups = new Array(n),
        subgroups = new Array(n * n),
        k,
        x,
        x0,
        dx,
        i,
        j;

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(sequence(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });

    // Sort subgroups…
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups(matrix[i][a], matrix[i][b]);
      });
    });

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified?
    // TODO Allow padding to be specified as percentage?
    k = max$1(0, tau$1 - padAngle * n) / k;
    dx = k ? padAngle : tau$1 / n;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[dj * n + di] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: groupSums[di]
      };
      x += dx;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[j * n + i],
            target = subgroups[i * n + j];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    return sortChords ? chords.sort(sortChords) : chords;
  }

  chord.padAngle = function(_) {
    return arguments.length ? (padAngle = max$1(0, _), chord) : padAngle;
  };

  chord.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, chord) : sortGroups;
  };

  chord.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
  };

  chord.sortChords = function(_) {
    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
  };

  return chord;
};

var slice$2 = Array.prototype.slice;

var constant$5 = function(x) {
  return function() {
    return x;
  };
};

var pi$2 = Math.PI;
var tau$2 = 2 * pi$2;
var epsilon$1 = 1e-6;
var tauEpsilon = tau$2 - epsilon$1;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau$2 + tau$2;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$2)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function defaultSource(d) {
  return d.source;
}

function defaultTarget(d) {
  return d.target;
}

function defaultRadius(d) {
  return d.radius;
}

function defaultStartAngle(d) {
  return d.startAngle;
}

function defaultEndAngle(d) {
  return d.endAngle;
}

var ribbon = function() {
  var source = defaultSource,
      target = defaultTarget,
      radius = defaultRadius,
      startAngle = defaultStartAngle,
      endAngle = defaultEndAngle,
      context = null;

  function ribbon() {
    var buffer,
        argv = slice$2.call(arguments),
        s = source.apply(this, argv),
        t = target.apply(this, argv),
        sr = +radius.apply(this, (argv[0] = s, argv)),
        sa0 = startAngle.apply(this, argv) - halfPi$1,
        sa1 = endAngle.apply(this, argv) - halfPi$1,
        sx0 = sr * cos(sa0),
        sy0 = sr * sin(sa0),
        tr = +radius.apply(this, (argv[0] = t, argv)),
        ta0 = startAngle.apply(this, argv) - halfPi$1,
        ta1 = endAngle.apply(this, argv) - halfPi$1;

    if (!context) context = buffer = path();

    context.moveTo(sx0, sy0);
    context.arc(0, 0, sr, sa0, sa1);
    if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
      context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
      context.arc(0, 0, tr, ta0, ta1);
    }
    context.quadraticCurveTo(0, 0, sx0, sy0);
    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  ribbon.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$5(+_), ribbon) : radius;
  };

  ribbon.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : startAngle;
  };

  ribbon.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : endAngle;
  };

  ribbon.source = function(_) {
    return arguments.length ? (source = _, ribbon) : source;
  };

  ribbon.target = function(_) {
    return arguments.length ? (target = _, ribbon) : target;
  };

  ribbon.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
  };

  return ribbon;
};

var prefix = "$";

function Map() {}

Map.prototype = map$1.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map$1(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

var nest = function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map$1(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
};

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map$1();
}

function setMap(map, key, value) {
  map.set(key, value);
}

function Set() {}

var proto = map$1.prototype;

Set.prototype = set$2.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set$2(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

var keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};

var values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};

var entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

var dsv = function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns;
    return rows;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
        EOF = {}, // sentinel value for end-of-file
        rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // the current line number
        t, // the current token
        eol; // is the current token followed by EOL?

    function token() {
      if (I >= N) return EOF; // special case: end of file
      if (eol) return eol = false, EOL; // special case: end of line

      // special case: quotes
      var j = I, c;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < N) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) ++I;
        } else if (c === 10) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }

      // common case: find next delimiter or newline
      while (I < N) {
        var k = 1;
        c = text.charCodeAt(I++);
        if (c === 10) eol = true; // \n
        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
        else if (c !== delimiterCode) continue;
        return text.slice(j, I - k);
      }

      // special case: last token before EOF
      return text.slice(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && (a = f(a, n++)) == null) continue;
      rows.push(a);
    }

    return rows;
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return text == null ? ""
        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
        : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};

var csv = dsv(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatRows = csv.formatRows;

var tsv = dsv("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatRows = tsv.formatRows;

var center$1 = function(x, y) {
  var nodes;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  return force;
};

var constant$6 = function(x) {
  return function() {
    return x;
  };
};

var jiggle = function() {
  return (Math.random() - 0.5) * 1e-6;
};

var tree_add = function(d) {
  var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
};

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, inherit the existing extent.
  if (x1 < x0) x0 = this._x0, x1 = this._x1;
  if (y1 < y0) y0 = this._y0, y1 = this._y1;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

var tree_cover = function(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else if (x0 > x || x > x1 || y0 > y || y > y1) {
    var z = x1 - x0,
        node = this._root,
        parent,
        i;

    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1);
        break;
      }
      case 1: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1);
        break;
      }
      case 2: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y);
        break;
      }
      case 3: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y);
        break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  // If the quadtree covers the point already, just return.
  else return this;

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
};

var tree_data = function() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
};

var tree_extent = function(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
};

var Quad = function(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
};

var tree_find = function(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
};

var tree_remove = function(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
};

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

var tree_root = function() {
  return this._root;
};

var tree_size = function() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
};

var tree_visit = function(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
};

var tree_visitAfter = function(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
};

function defaultX(d) {
  return d[0];
}

var tree_x = function(_) {
  return arguments.length ? (this._x = _, this) : this._x;
};

function defaultY(d) {
  return d[1];
}

var tree_y = function(_) {
  return arguments.length ? (this._y = _, this) : this._y;
};

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

var collide = function(radius) {
  var nodes,
      radii,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant$6(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(), l += x * x;
            if (y === 0) y = jiggle(), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : radius;
  };

  return force;
};

function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("missing: " + nodeId);
  return node;
}

var link = function(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant$6(30),
      distances,
      nodes,
      count,
      bias,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle();
        y = target.y + target.vy - source.y - source.vy || jiggle();
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = map$1(nodes, id),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant$6(+_), initializeDistance(), force) : distance;
  };

  return force;
};

function x$1(d) {
  return d.x;
}

function y$1(d) {
  return d.y;
}

var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));

var simulation = function(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = map$1(),
      stepper = timer(step),
      event = dispatch("tick", "end");

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick() {
    var i, n = nodes.length, node;

    alpha += (alphaTarget - alpha) * alphaDecay;

    forces.each(function(force) {
      force(alpha);
    });

    for (i = 0; i < n; ++i) {
      node = nodes[i];
      if (node.fx == null) node.x += node.vx *= velocityDecay;
      else node.x = node.fx, node.vx = 0;
      if (node.fy == null) node.y += node.vy *= velocityDecay;
      else node.y = node.fy, node.vy = 0;
    }
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
};

var manyBody = function() {
  var nodes,
      node,
      alpha,
      strength = constant$6(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x$1, y$1).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = q.value)) {
          strength += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / strength;
      quad.y = y / strength;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(), l += x * x;
        if (y === 0) y = jiggle(), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = jiggle(), l += x * x;
      if (y === 0) y = jiggle(), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
};

var x$2 = function(x) {
  var strength = constant$6(0.1),
      nodes,
      strengths,
      xz;

  if (typeof x !== "function") x = constant$6(x == null ? 0 : +x);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
  };

  force.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : x;
  };

  return force;
};

var y$2 = function(y) {
  var strength = constant$6(0.1),
      nodes,
      strengths,
      yz;

  if (typeof y !== "function") y = constant$6(y == null ? 0 : +y);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
  };

  force.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : y;
  };

  return force;
};

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
var formatDecimal = function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
};

var exponent$1 = function(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
};

var formatGroup = function(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
};

var formatNumerals = function(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
};

var formatDefault = function(x, p) {
  x = x.toPrecision(p);

  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (x[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      case "e": break out;
      default: if (i0 > 0) i0 = 0; break;
    }
  }

  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
};

var prefixExponent;

var formatPrefixAuto = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
};

var formatRounded = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

var formatTypes = {
  "": formatDefault,
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

// [[fill]align][sign][symbol][0][width][,][.precision][type]
var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

  var match,
      fill = match[1] || " ",
      align = match[2] || ">",
      sign = match[3] || "-",
      symbol = match[4] || "",
      zero = !!match[5],
      width = match[6] && +match[6],
      comma = !!match[7],
      precision = match[8] && +match[8].slice(1),
      type = match[9] || "";

  // The "n" type is an alias for ",g".
  if (type === "n") comma = true, type = "g";

  // Map invalid types to the default format.
  else if (!formatTypes[type]) type = "";

  // If zero fill is specified, padding goes after sign and before digits.
  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

  this.fill = fill;
  this.align = align;
  this.sign = sign;
  this.symbol = symbol;
  this.zero = zero;
  this.width = width;
  this.comma = comma;
  this.precision = precision;
  this.type = type;
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + this.type;
};

var identity$3 = function(x) {
  return x;
};

var prefixes = ["y","z","a","f","p","n","\xB5","m","","k","M","G","T","P","E","Z","Y"];

var formatLocale = function(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$3,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$3,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        type = specifier.type;

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = !type || /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? (type ? 6 : 12)
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};

var locale$1;



defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale$1 = formatLocale(definition);
  exports.format = locale$1.format;
  exports.formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

var precisionFixed = function(step) {
  return Math.max(0, -exponent$1(Math.abs(step)));
};

var precisionPrefix = function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
};

var precisionRound = function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent$1(max) - exponent$1(step)) + 1;
};

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

var adder = function() {
  return new Adder;
};

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add$1(temp, y, this.t);
    add$1(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add$1(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon$2 = 1e-6;
var epsilon2$1 = 1e-12;
var pi$3 = Math.PI;
var halfPi$2 = pi$3 / 2;
var quarterPi = pi$3 / 4;
var tau$3 = pi$3 * 2;

var degrees$1 = 180 / pi$3;
var radians = pi$3 / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos$1 = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;

var log = Math.log;
var pow = Math.pow;
var sin$1 = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$3 : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi$2 : x < -1 ? -halfPi$2 : Math.asin(x);
}

function haversin(x) {
  return (x = sin$1(x / 2)) * x;
}

function noop$1() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

var geoStream = function(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
};

var areaRingSum = adder();

var areaSum = adder();
var lambda00;
var phi00;
var lambda0;
var cosPhi0;
var sinPhi0;

var areaStream = {
  point: noop$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? tau$3 + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop$1;
  },
  sphere: function() {
    areaSum.add(tau$3);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= radians, phi *= radians;
  lambda0 = lambda, cosPhi0 = cos$1(phi = phi / 2 + quarterPi), sinPhi0 = sin$1(phi);
}

function areaPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  phi = phi / 2 + quarterPi; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = cos$1(phi),
      sinPhi = sin$1(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * cos$1(adLambda),
      v = k * sdLambda * sin$1(adLambda);
  areaRingSum.add(atan2(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

var area = function(object) {
  areaSum.reset();
  geoStream(object, areaStream);
  return areaSum * 2;
};

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos$1(phi);
  return [cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var lambda0$1;
var phi0;
var lambda1;
var phi1;
var lambda2;
var lambda00$1;
var phi00$1;
var p0;
var deltaSum = adder();
var ranges;
var range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    areaStream.polygonStart();
  },
  polygonEnd: function() {
    areaStream.polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > epsilon$2) phi1 = 90;
    else if (deltaSum < -epsilon$2) phi0 = -90;
    range[0] = lambda0$1, range[1] = lambda1;
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = cartesian([lambda * radians, phi * radians]);
  if (p0) {
    var normal = cartesianCross(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection);
    inflection = spherical(inflection);
    var delta = lambda - lambda2,
        sign$$1 = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * degrees$1 * sign$$1,
        phii,
        antimeridian = abs(delta) > 180;
    if (antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
      phii = inflection[1] * degrees$1;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
      phii = -inflection[1] * degrees$1;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
      }
    } else {
      if (lambda1 >= lambda0$1) {
        if (lambda < lambda0$1) lambda0$1 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0$1, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00$1 = lambda, phi00$1 = phi;
  }
  areaStream.point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  areaStream.lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00$1, phi00$1);
  areaStream.lineEnd();
  if (abs(deltaSum) > epsilon$2) lambda0$1 = -(lambda1 = 180);
  range[0] = lambda0$1, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

var bounds = function(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
  ranges = [];
  geoStream(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0$1 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0$1, phi0], [lambda1, phi1]];
};

var W0;
var W1;
var X0;
var Y0;
var Z0;
var X1;
var Y1;
var Z1;
var X2;
var Y2;
var Z2;
var lambda00$2;
var phi00$2;
var x0;
var y0;
var z0; // previous point

var centroidStream = {
  sphere: noop$1,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi);
  centroidPointCartesian(cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi);
  x0 = cosPhi * cos$1(lambda);
  y0 = cosPhi * sin$1(lambda);
  z0 = sin$1(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi),
      x = cosPhi * cos$1(lambda),
      y = cosPhi * sin$1(lambda),
      z = sin$1(phi),
      w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00$2, phi00$2);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00$2 = lambda, phi00$2 = phi;
  lambda *= radians, phi *= radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = cos$1(phi);
  x0 = cosPhi * cos$1(lambda);
  y0 = cosPhi * sin$1(lambda);
  z0 = sin$1(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi),
      x = cosPhi * cos$1(lambda),
      y = cosPhi * sin$1(lambda),
      z = sin$1(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = sqrt(cx * cx + cy * cy + cz * cz),
      w = asin(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

var centroid = function(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 =
  X2 = Y2 = Z2 = 0;
  geoStream(object, centroidStream);

  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < epsilon2$1) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < epsilon$2) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < epsilon2$1) return [NaN, NaN];
  }

  return [atan2(y, x) * degrees$1, asin(z / sqrt(m)) * degrees$1];
};

var constant$7 = function(x) {
  return function() {
    return x;
  };
};

var compose = function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
};

function rotationIdentity(lambda, phi) {
  return [lambda > pi$3 ? lambda - tau$3 : lambda < -pi$3 ? lambda + tau$3 : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau$3) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi$3 ? lambda - tau$3 : lambda < -pi$3 ? lambda + tau$3 : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos$1(deltaPhi),
      sinDeltaPhi = sin$1(deltaPhi),
      cosDeltaGamma = cos$1(deltaGamma),
      sinDeltaGamma = sin$1(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos$1(phi),
        x = cos$1(lambda) * cosPhi,
        y = sin$1(lambda) * cosPhi,
        z = sin$1(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos$1(phi),
        x = cos$1(lambda) * cosPhi,
        y = sin$1(lambda) * cosPhi,
        z = sin$1(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

var rotation = function(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  };

  return forward;
};

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos$1(radius),
      sinRadius = sin$1(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau$3;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$3;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos$1(t), -sinRadius * sin$1(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau$3 - epsilon$2) % tau$3;
}

var circle = function() {
  var center = constant$7([0, 0]),
      radius = constant$7(90),
      precision = constant$7(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= degrees$1, x[1] *= degrees$1;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * radians,
        p = precision.apply(this, arguments) * radians;
    ring = [];
    rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : constant$7([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$7(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : constant$7(+_), circle) : precision;
  };

  return circle;
};

var clipBuffer = function() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$1,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
};

var clipLine = function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
};

var pointEqual = function(a, b) {
  return abs(a[0] - b[0]) < epsilon$2 && abs(a[1] - b[1]) < epsilon$2;
};

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
var clipPolygon = function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link$1(subject);
  link$1(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
};

function link$1(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var clipMax = 1e9;
var clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipExtent(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon$2 ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon$2 ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon$2 ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var extent$1 = function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipExtent(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
};

var sum$1 = adder();

var polygonContains = function(polygon, point) {
  var lambda = point[0],
      phi = point[1],
      normal = [sin$1(lambda), -cos$1(lambda), 0],
      angle = 0,
      winding = 0;

  sum$1.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin$1(phi0),
        cosPhi0 = cos$1(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = point1[0],
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin$1(phi1),
          cosPhi1 = cos$1(phi1),
          delta = lambda1 - lambda0,
          sign$$1 = delta >= 0 ? 1 : -1,
          absDelta = sign$$1 * delta,
          antimeridian = absDelta > pi$3,
          k = sinPhi0 * sinPhi1;

      sum$1.add(atan2(k * sign$$1 * sin$1(absDelta), cosPhi0 * cosPhi1 + k * cos$1(absDelta)));
      angle += antimeridian ? delta + sign$$1 * tau$3 : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon$2 || angle < epsilon$2 && sum$1 < -epsilon$2) ^ (winding & 1);
};

var lengthSum = adder();
var lambda0$2;
var sinPhi0$1;
var cosPhi0$1;

var lengthStream = {
  sphere: noop$1,
  point: noop$1,
  lineStart: lengthLineStart,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = noop$1;
}

function lengthPointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  lambda0$2 = lambda, sinPhi0$1 = sin$1(phi), cosPhi0$1 = cos$1(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var sinPhi = sin$1(phi),
      cosPhi = cos$1(phi),
      delta = abs(lambda - lambda0$2),
      cosDelta = cos$1(delta),
      sinDelta = sin$1(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
      z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
  lengthSum.add(atan2(sqrt(x * x + y * y), z));
  lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
}

var length$1 = function(object) {
  lengthSum.reset();
  geoStream(object, lengthStream);
  return +lengthSum;
};

var coordinates = [null, null];
var object$1 = {type: "LineString", coordinates: coordinates};

var distance = function(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return length$1(object$1);
};

var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return distance(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ab = distance(coordinates[0], coordinates[1]),
      ao = distance(coordinates[0], point),
      ob = distance(point, coordinates[1]);
  return ao + ob <= ab + epsilon$2;
}

function containsPolygon(coordinates, point) {
  return !!polygonContains(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * radians, point[1] * radians];
}

var contains = function(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
};

function graticuleX(y0, y1, dy) {
  var y = sequence(y0, y1 - epsilon$2, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = sequence(x0, x1 - epsilon$2, dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return sequence(ceil(X0 / DX) * DX, X1, DX).map(X)
        .concat(sequence(ceil(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(sequence(ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return abs(x % DX) > epsilon$2; }).map(x))
        .concat(sequence(ceil(y0 / dy) * dy, y1, dy).filter(function(y) { return abs(y % DY) > epsilon$2; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + epsilon$2], [180, 90 - epsilon$2]])
      .extentMinor([[-180, -80 - epsilon$2], [180, 80 + epsilon$2]]);
}

function graticule10() {
  return graticule()();
}

var interpolate$1 = function(a, b) {
  var x0 = a[0] * radians,
      y0 = a[1] * radians,
      x1 = b[0] * radians,
      y1 = b[1] * radians,
      cy0 = cos$1(y0),
      sy0 = sin$1(y0),
      cy1 = cos$1(y1),
      sy1 = sin$1(y1),
      kx0 = cy0 * cos$1(x0),
      ky0 = cy0 * sin$1(x0),
      kx1 = cy1 * cos$1(x1),
      ky1 = cy1 * sin$1(x1),
      d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))),
      k = sin$1(d);

  var interpolate = d ? function(t) {
    var B = sin$1(t *= d) / k,
        A = sin$1(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      atan2(y, x) * degrees$1,
      atan2(z, sqrt(x * x + y * y)) * degrees$1
    ];
  } : function() {
    return [x0 * degrees$1, y0 * degrees$1];
  };

  interpolate.distance = d;

  return interpolate;
};

var identity$4 = function(x) {
  return x;
};

var areaSum$1 = adder();
var areaRingSum$1 = adder();
var x00;
var y00;
var x0$1;
var y0$1;

var areaStream$1 = {
  point: noop$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: function() {
    areaStream$1.lineStart = areaRingStart$1;
    areaStream$1.lineEnd = areaRingEnd$1;
  },
  polygonEnd: function() {
    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop$1;
    areaSum$1.add(abs(areaRingSum$1));
    areaRingSum$1.reset();
  },
  result: function() {
    var area = areaSum$1 / 2;
    areaSum$1.reset();
    return area;
  }
};

function areaRingStart$1() {
  areaStream$1.point = areaPointFirst$1;
}

function areaPointFirst$1(x, y) {
  areaStream$1.point = areaPoint$1;
  x00 = x0$1 = x, y00 = y0$1 = y;
}

function areaPoint$1(x, y) {
  areaRingSum$1.add(y0$1 * x - x0$1 * y);
  x0$1 = x, y0$1 = y;
}

function areaRingEnd$1() {
  areaPoint$1(x00, y00);
}

var x0$2 = Infinity;
var y0$2 = x0$2;
var x1 = -x0$2;
var y1 = x1;

var boundsStream$1 = {
  point: boundsPoint$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};

function boundsPoint$1(x, y) {
  if (x < x0$2) x0$2 = x;
  if (x > x1) x1 = x;
  if (y < y0$2) y0$2 = y;
  if (y > y1) y1 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0$1 = 0;
var Y0$1 = 0;
var Z0$1 = 0;
var X1$1 = 0;
var Y1$1 = 0;
var Z1$1 = 0;
var X2$1 = 0;
var Y2$1 = 0;
var Z2$1 = 0;
var x00$1;
var y00$1;
var x0$3;
var y0$3;

var centroidStream$1 = {
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.point = centroidPoint$1;
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  },
  result: function() {
    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
        : [NaN, NaN];
    X0$1 = Y0$1 = Z0$1 =
    X1$1 = Y1$1 = Z1$1 =
    X2$1 = Y2$1 = Z2$1 = 0;
    return centroid;
  }
};

function centroidPoint$1(x, y) {
  X0$1 += x;
  Y0$1 += y;
  ++Z0$1;
}

function centroidLineStart$1() {
  centroidStream$1.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream$1.point = centroidPointLine;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}

function centroidRingStart$1() {
  centroidStream$1.point = centroidPointFirstRing;
}

function centroidRingEnd$1() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream$1.point = centroidPointRing;
  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$3,
      dy = y - y0$3,
      z = sqrt(dx * dx + dy * dy);

  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;

  z = y0$3 * x - x0$3 * y;
  X2$1 += z * (x0$3 + x);
  Y2$1 += z * (y0$3 + y);
  Z2$1 += z * 3;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau$3);
        break;
      }
    }
  },
  result: noop$1
};

var lengthSum$1 = adder();
var lengthRing;
var x00$2;
var y00$2;
var x0$4;
var y0$4;

var lengthStream$1 = {
  point: noop$1,
  lineStart: function() {
    lengthStream$1.point = lengthPointFirst$1;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint$1(x00$2, y00$2);
    lengthStream$1.point = noop$1;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum$1;
    lengthSum$1.reset();
    return length;
  }
};

function lengthPointFirst$1(x, y) {
  lengthStream$1.point = lengthPoint$1;
  x00$2 = x0$4 = x, y00$2 = y0$4 = y;
}

function lengthPoint$1(x, y) {
  x0$4 -= x, y0$4 -= y;
  lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
  x0$4 = x, y0$4 = y;
}

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle$1(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle$1(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle$1(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

var index$1 = function(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream$1));
    return areaStream$1.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream$1));
    return lengthStream$1.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream$1));
    return boundsStream$1.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream$1));
    return centroidStream$1.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$4) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
};

var clip = function(pointVisible, clipLine, interpolate, start) {
  return function(rotate, sink) {
    var line = clipLine(sink),
        rotatedStart = rotate.invert(start[0], start[1]),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, rotatedStart);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      var point = rotate(lambda, phi);
      if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      var point = rotate(lambda, phi);
      line.point(point[0], point[1]);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      var point = rotate(lambda, phi);
      ringSink.point(point[0], point[1]);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
};

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi$2 - epsilon$2 : halfPi$2 - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi$2 - epsilon$2 : halfPi$2 - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi$3, -halfPi$2]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi$3 : -pi$3,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi$3) < epsilon$2) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$2 : -halfPi$2);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi$3) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon$2) lambda0 -= sign0 * epsilon$2; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon$2) lambda1 -= sign1 * epsilon$2;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin$1(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon$2
      ? atan((sin$1(phi0) * (cosPhi1 = cos$1(phi1)) * sin$1(lambda1)
          - sin$1(phi1) * (cosPhi0 = cos$1(phi0)) * sin$1(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi$2;
    stream.point(-pi$3, phi);
    stream.point(0, phi);
    stream.point(pi$3, phi);
    stream.point(pi$3, 0);
    stream.point(pi$3, -phi);
    stream.point(0, -phi);
    stream.point(-pi$3, -phi);
    stream.point(-pi$3, 0);
    stream.point(-pi$3, phi);
  } else if (abs(from[0] - to[0]) > epsilon$2) {
    var lambda = from[0] < to[0] ? pi$3 : -pi$3;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

var clipCircle = function(radius, delta) {
  var cr = cos$1(radius),
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon$2; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos$1(lambda) * cos$1(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi$3 : -pi$3), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) {
            point1[0] += epsilon$2;
            point1[1] += epsilon$2;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi$3) < epsilon$2,
        meridian = polar || delta < epsilon$2;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon$2 ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi$3 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi$3 - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$3, radius - pi$3]);
};

var transform = function(methods) {
  return {
    stream: transformer(methods)
  };
};

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fitExtent(projection, extent, object) {
  var w = extent[1][0] - extent[0][0],
      h = extent[1][1] - extent[0][1],
      clip = projection.clipExtent && projection.clipExtent();

  projection
      .scale(150)
      .translate([0, 0]);

  if (clip != null) projection.clipExtent(null);

  geoStream(object, projection.stream(boundsStream$1));

  var b = boundsStream$1.result(),
      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

  if (clip != null) projection.clipExtent(clip);

  return projection
      .scale(k * 150)
      .translate([x, y]);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

var maxDepth = 16;
var cosMinDistance = cos$1(30 * radians); // cos(minimum angular distance)

var resample = function(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
};

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon$2 || abs(lambda0 - lambda1) < epsilon$2 ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      dx, dy, lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
      theta = null, preclip = clipAntimeridian, // clip angle
      x0 = null, y0, x1, y1, postclip = identity$4, // clip extent
      delta2 = 0.5, projectResample = resample(projectTransform, delta2), // precision
      cache,
      cacheStream;

  function projection(point) {
    point = projectRotate(point[0] * radians, point[1] * radians);
    return [point[0] * k + dx, dy - point[1] * k];
  }

  function invert(point) {
    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
    return point && [point[0] * degrees$1, point[1] * degrees$1];
  }

  function projectTransform(x, y) {
    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees$1, phi * degrees$1];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  function recenter() {
    projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
    var center = project(lambda, phi);
    dx = x - center[0] * k;
    dy = y + center[1] * k;
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = pi$3 / 3,
      m = projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees$1, phi1 * degrees$1];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos$1(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin$1(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin$1(y0), n = (sy0 + sin$1(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (abs(n) < epsilon$2) return cylindricalEqualAreaRaw(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin$1(y)) / n;
    return [r * sin$1(x *= n), r0 - r * cos$1(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y;
    return [atan2(x, abs(r0y)) / n * sign(r0y), asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

var conicEqualArea = function() {
  return conicProjection(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
};

var albers = function() {
  return conicEqualArea()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
};

// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
var albersUsa = function() {
  var cache,
      cacheStream,
      lower48 = albers(), lower48Point,
      alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + epsilon$2, y + 0.120 * k + epsilon$2], [x - 0.214 * k - epsilon$2, y + 0.234 * k - epsilon$2]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + epsilon$2, y + 0.166 * k + epsilon$2], [x - 0.115 * k - epsilon$2, y + 0.234 * k - epsilon$2]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return fitExtent(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return fitSize(albersUsa, size, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
};

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos$1(x),
        cy = cos$1(y),
        k = scale(cx * cy);
    return [
      k * cy * sin$1(x),
      k * sin$1(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin$1(c),
        cc = cos$1(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

var azimuthalEqualArea = function() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
};

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin$1(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

var azimuthalEquidistant = function() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
};

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi$2 + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi$2];
};

var mercator = function() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau$3);
};

function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi$3 * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

function tany(y) {
  return tan((halfPi$2 + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = cos$1(y0),
      n = y0 === y1 ? sin$1(y0) : log(cy0 / cos$1(y1)) / log(tany(y1) / tany(y0)),
      f = cy0 * pow(tany(y0), n) / n;

  if (!n) return mercatorRaw;

  function project(x, y) {
    if (f > 0) { if (y < -halfPi$2 + epsilon$2) y = -halfPi$2 + epsilon$2; }
    else { if (y > halfPi$2 - epsilon$2) y = halfPi$2 - epsilon$2; }
    var r = f / pow(tany(y), n);
    return [r * sin$1(n * x), f - r * cos$1(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy);
    return [atan2(x, abs(fy)) / n * sign(fy), 2 * atan(pow(f / r, 1 / n)) - halfPi$2];
  };

  return project;
}

var conicConformal = function() {
  return conicProjection(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
};

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

var equirectangular = function() {
  return projection(equirectangularRaw)
      .scale(152.63);
};

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos$1(y0),
      n = y0 === y1 ? sin$1(y0) : (cy0 - cos$1(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs(n) < epsilon$2) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin$1(nx), g - gy * cos$1(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y;
    return [atan2(x, abs(gy)) / n * sign(gy), g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}

var conicEquidistant = function() {
  return conicProjection(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
};

function gnomonicRaw(x, y) {
  var cy = cos$1(y), k = cos$1(x) * cy;
  return [cy * sin$1(x) / k, sin$1(y) / k];
}

gnomonicRaw.invert = azimuthalInvert(atan);

var gnomonic = function() {
  return projection(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
};

function scaleTranslate(kx, ky, tx, ty) {
  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? identity$4 : transformer({
    point: function(x, y) {
      this.stream.point(x * kx + tx, y * ky + ty);
    }
  });
}

var identity$5 = function() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, transform$$1 = identity$4, // scale, translate and reflect
      x0 = null, y0, x1, y1, clip = identity$4, // clip extent
      cache,
      cacheStream,
      projection;

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return projection = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = transform$$1(clip(cacheStream = stream));
    },
    clipExtent: function(_) {
      return arguments.length ? (clip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
    },
    scale: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
    },
    translate: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
    },
    reflectX: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
    },
    reflectY: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
    },
    fitExtent: function(extent, object) {
      return fitExtent(projection, extent, object);
    },
    fitSize: function(size, object) {
      return fitSize(projection, size, object);
    }
  };
};

function orthographicRaw(x, y) {
  return [cos$1(y) * sin$1(x), sin$1(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

var orthographic = function() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon$2);
};

function stereographicRaw(x, y) {
  var cy = cos$1(y), k = 1 + cos$1(x) * cy;
  return [cy * sin$1(x) / k, sin$1(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

var stereographic = function() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
};

function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi$2 + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi$2];
};

var transverseMercator = function() {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
};

function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}

var cluster = function() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x0) / (x1 - x0) * dx;
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }

  cluster.separation = function(x) {
    return arguments.length ? (separation = x, cluster) : separation;
  };

  cluster.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
  };

  cluster.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
  };

  return cluster;
};

function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

var node_count = function() {
  return this.eachAfter(count);
};

var node_each = function(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
};

var node_eachBefore = function(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
};

var node_eachAfter = function(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
};

var node_sum = function(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
};

var node_sort = function(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
};

var node_path = function(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
};

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

var node_ancestors = function() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
};

var node_descendants = function() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
};

var node_leaves = function() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
};

var node_links = function() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
};

function hierarchy(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;

  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function defaultChildren(d) {
  return d.children;
}

function copyData(node) {
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};

var slice$3 = Array.prototype.slice;

function shuffle$1(array) {
  var m = array.length,
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var enclose = function(circles) {
  var i = 0, n = (circles = shuffle$1(slice$3.call(circles))).length, B = [], p, e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
};

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}

function place(a, b, c) {
  var ax = a.x,
      ay = a.y,
      da = b.r + c.r,
      db = a.r + c.r,
      dx = b.x - ax,
      dy = b.y - ay,
      dc = dx * dx + dy * dy;
  if (dc) {
    var x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc),
        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
    c.x = ax + x * dx + y * dy;
    c.y = ay + x * dy - y * dx;
  } else {
    c.x = ax + db;
    c.y = ay;
  }
}

function intersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return dr * dr - 1e-6 > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node$1(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;

  // Place the second circle.
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, c = circles[2]);

  // Initialize the front-chain using the first three circles a, b and c.
  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node$1(c);

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    c.previous = a, c.next = b, a.next = b.previous = b = c;

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

var siblings = function(circles) {
  packEnclose(circles);
  return circles;
};

function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== "function") throw new Error;
  return f;
}

function constantZero() {
  return 0;
}

var constant$8 = function(x) {
  return function() {
    return x;
  };
};

function defaultRadius$1(d) {
  return Math.sqrt(d.value);
}

var index$2 = function() {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = constantZero;

  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    if (radius) {
      root.eachBefore(radiusLeaf(radius))
          .eachAfter(packChildren(padding, 0.5))
          .eachBefore(translateChild(1));
    } else {
      root.eachBefore(radiusLeaf(defaultRadius$1))
          .eachAfter(packChildren(constantZero, 1))
          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function(x) {
    return arguments.length ? (radius = optional(x), pack) : radius;
  };

  pack.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function(x) {
    return arguments.length ? (padding = typeof x === "function" ? x : constant$8(+x), pack) : padding;
  };

  return pack;
};

function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

var roundNode = function(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
};

var treemapDice = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
};

var partition = function() {
  var dx = 1,
      dy = 1,
      padding = 0,
      round = false;

  function partition(root) {
    var n = root.height + 1;
    root.x0 =
    root.y0 = padding;
    root.x1 = dx;
    root.y1 = dy / n;
    root.eachBefore(positionNode(dy, n));
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(dy, n) {
    return function(node) {
      if (node.children) {
        treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
      }
      var x0 = node.x0,
          y0 = node.y0,
          x1 = node.x1 - padding,
          y1 = node.y1 - padding;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
    };
  }

  partition.round = function(x) {
    return arguments.length ? (round = !!x, partition) : round;
  };

  partition.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
  };

  partition.padding = function(x) {
    return arguments.length ? (padding = +x, partition) : padding;
  };

  return partition;
};

var keyPrefix$1 = "$";
var preroot = {depth: -1};
var ambiguous = {};

function defaultId(d) {
  return d.id;
}

function defaultParentId(d) {
  return d.parentId;
}

var stratify = function() {
  var id = defaultId,
      parentId = defaultParentId;

  function stratify(data) {
    var d,
        i,
        n = data.length,
        root,
        parent,
        node,
        nodes = new Array(n),
        nodeId,
        nodeKey,
        nodeByKey = {};

    for (i = 0; i < n; ++i) {
      d = data[i], node = nodes[i] = new Node(d);
      if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
        nodeKey = keyPrefix$1 + (node.id = nodeId);
        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
      }
    }

    for (i = 0; i < n; ++i) {
      node = nodes[i], nodeId = parentId(data[i], i, data);
      if (nodeId == null || !(nodeId += "")) {
        if (root) throw new Error("multiple roots");
        root = node;
      } else {
        parent = nodeByKey[keyPrefix$1 + nodeId];
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      }
    }

    if (!root) throw new Error("no root");
    root.parent = preroot;
    root.eachBefore(function(node) { node.depth = node.parent.depth + 1; --n; }).eachBefore(computeHeight);
    root.parent = null;
    if (n > 0) throw new Error("cycle");

    return root;
  }

  stratify.id = function(x) {
    return arguments.length ? (id = required(x), stratify) : id;
  };

  stratify.parentId = function(x) {
    return arguments.length ? (parentId = required(x), stratify) : parentId;
  };

  return stratify;
};

function defaultSeparation$1(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(Node.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
      node,
      nodes = [tree],
      child,
      children,
      i,
      n;

  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
var tree = function() {
  var separation = defaultSeparation$1,
      dx = 1,
      dy = 1,
      nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
          right = root,
          bottom = root;
      root.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
          tx = s - left.x,
          kx = dx / (right.x + s + tx),
          ky = dy / (bottom.depth || 1);
      root.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function(x) {
    return arguments.length ? (separation = x, tree) : separation;
  };

  tree.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
  };

  tree.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
  };

  return tree;
};

var treemapSlice = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (y1 - y0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.x0 = x0, node.x1 = x1;
    node.y0 = y0, node.y1 = y0 += node.value * k;
  }
};

var phi = (1 + Math.sqrt(5)) / 2;

function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [],
      nodes = parent.children,
      row,
      nodeValue,
      i0 = 0,
      i1 = 0,
      n = nodes.length,
      dx, dy,
      value = parent.value,
      sumValue,
      minValue,
      maxValue,
      newRatio,
      minRatio,
      alpha,
      beta;

  while (i0 < n) {
    dx = x1 - x0, dy = y1 - y0;

    // Find the next non-empty node.
    do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);

    // Keep adding nodes while the aspect ratio maintains or improves.
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) { sumValue -= nodeValue; break; }
      minRatio = newRatio;
    }

    // Position and record the row orientation.
    rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
    if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
    else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
    value -= sumValue, i0 = i1;
  }

  return rows;
}

var squarify = (function custom(ratio) {

  function squarify(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }

  squarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return squarify;
})(phi);

var index$3 = function() {
  var tile = squarify,
      round = false,
      dx = 1,
      dy = 1,
      paddingStack = [0],
      paddingInner = constantZero,
      paddingTop = constantZero,
      paddingRight = constantZero,
      paddingBottom = constantZero,
      paddingLeft = constantZero;

  function treemap(root) {
    root.x0 =
    root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(node) {
    var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }

  treemap.round = function(x) {
    return arguments.length ? (round = !!x, treemap) : round;
  };

  treemap.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
  };

  treemap.tile = function(x) {
    return arguments.length ? (tile = required(x), treemap) : tile;
  };

  treemap.padding = function(x) {
    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
  };

  treemap.paddingInner = function(x) {
    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$8(+x), treemap) : paddingInner;
  };

  treemap.paddingOuter = function(x) {
    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
  };

  treemap.paddingTop = function(x) {
    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$8(+x), treemap) : paddingTop;
  };

  treemap.paddingRight = function(x) {
    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$8(+x), treemap) : paddingRight;
  };

  treemap.paddingBottom = function(x) {
    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$8(+x), treemap) : paddingBottom;
  };

  treemap.paddingLeft = function(x) {
    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$8(+x), treemap) : paddingLeft;
  };

  return treemap;
};

var binary = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      i, n = nodes.length,
      sum, sums = new Array(n + 1);

  for (sums[0] = sum = i = 0; i < n; ++i) {
    sums[i + 1] = sum += nodes[i].value;
  }

  partition(0, n, parent.value, x0, y0, x1, y1);

  function partition(i, j, value, x0, y0, x1, y1) {
    if (i >= j - 1) {
      var node = nodes[i];
      node.x0 = x0, node.y0 = y0;
      node.x1 = x1, node.y1 = y1;
      return;
    }

    var valueOffset = sums[i],
        valueTarget = (value / 2) + valueOffset,
        k = i + 1,
        hi = j - 1;

    while (k < hi) {
      var mid = k + hi >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }

    if ((valueTarget - sums[k - 1]) < (sums[k] - valueTarget) && i + 1 < k) --k;

    var valueLeft = sums[k] - valueOffset,
        valueRight = value - valueLeft;

    if ((x1 - x0) > (y1 - y0)) {
      var xk = (x0 * valueRight + x1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, xk, y1);
      partition(k, j, valueRight, xk, y0, x1, y1);
    } else {
      var yk = (y0 * valueRight + y1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, x1, yk);
      partition(k, j, valueRight, x0, yk, x1, y1);
    }
  }
};

var sliceDice = function(parent, x0, y0, x1, y1) {
  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
};

var resquarify = (function custom(ratio) {

  function resquarify(parent, x0, y0, x1, y1) {
    if ((rows = parent._squarify) && (rows.ratio === ratio)) {
      var rows,
          row,
          nodes,
          i,
          j = -1,
          n,
          m = rows.length,
          value = parent.value;

      while (++j < m) {
        row = rows[j], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) treemapDice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
        else treemapSlice(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
      rows.ratio = ratio;
    }
  }

  resquarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return resquarify;
})(phi);

var area$1 = function(polygon) {
  var i = -1,
      n = polygon.length,
      a,
      b = polygon[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }

  return area / 2;
};

var centroid$1 = function(polygon) {
  var i = -1,
      n = polygon.length,
      x = 0,
      y = 0,
      a,
      b = polygon[n - 1],
      c,
      k = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }

  return k *= 3, [x / k, y / k];
};

// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
var cross$1 = function(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
};

function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  var n = points.length,
      indexes = [0, 1],
      size = 2;

  for (var i = 2; i < n; ++i) {
    while (size > 1 && cross$1(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

var hull = function(points) {
  if ((n = points.length) < 3) return null;

  var i,
      n,
      sortedPoints = new Array(n),
      flippedPoints = new Array(n);

  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];

  var upperIndexes = computeUpperHullIndexes(sortedPoints),
      lowerIndexes = computeUpperHullIndexes(flippedPoints);

  // Construct the hull polygon, removing possible duplicate endpoints.
  var skipLeft = lowerIndexes[0] === upperIndexes[0],
      skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
      hull = [];

  // Add upper hull in right-to-l order.
  // Then add lower hull in left-to-right order.
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);

  return hull;
};

var contains$1 = function(polygon, point) {
  var n = polygon.length,
      p = polygon[n - 1],
      x = point[0], y = point[1],
      x0 = p[0], y0 = p[1],
      x1, y1,
      inside = false;

  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
    x0 = x1, y0 = y1;
  }

  return inside;
};

var length$2 = function(polygon) {
  var i = -1,
      n = polygon.length,
      b = polygon[n - 1],
      xa,
      ya,
      xb = b[0],
      yb = b[1],
      perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
};

var slice$4 = [].slice;

var noabort = {};

function Queue(size) {
  this._size = size;
  this._call =
  this._error = null;
  this._tasks = [];
  this._data = [];
  this._waiting =
  this._active =
  this._ended =
  this._start = 0; // inside a synchronous task callback?
}

Queue.prototype = queue.prototype = {
  constructor: Queue,
  defer: function(callback) {
    if (typeof callback !== "function") throw new Error("invalid callback");
    if (this._call) throw new Error("defer after await");
    if (this._error != null) return this;
    var t = slice$4.call(arguments, 1);
    t.push(callback);
    ++this._waiting, this._tasks.push(t);
    poke$1(this);
    return this;
  },
  abort: function() {
    if (this._error == null) abort(this, new Error("abort"));
    return this;
  },
  await: function(callback) {
    if (typeof callback !== "function") throw new Error("invalid callback");
    if (this._call) throw new Error("multiple await");
    this._call = function(error, results) { callback.apply(null, [error].concat(results)); };
    maybeNotify(this);
    return this;
  },
  awaitAll: function(callback) {
    if (typeof callback !== "function") throw new Error("invalid callback");
    if (this._call) throw new Error("multiple await");
    this._call = callback;
    maybeNotify(this);
    return this;
  }
};

function poke$1(q) {
  if (!q._start) {
    try { start$1(q); } // let the current task complete
    catch (e) {
      if (q._tasks[q._ended + q._active - 1]) abort(q, e); // task errored synchronously
      else if (!q._data) throw e; // await callback errored synchronously
    }
  }
}

function start$1(q) {
  while (q._start = q._waiting && q._active < q._size) {
    var i = q._ended + q._active,
        t = q._tasks[i],
        j = t.length - 1,
        c = t[j];
    t[j] = end(q, i);
    --q._waiting, ++q._active;
    t = c.apply(null, t);
    if (!q._tasks[i]) continue; // task finished synchronously
    q._tasks[i] = t || noabort;
  }
}

function end(q, i) {
  return function(e, r) {
    if (!q._tasks[i]) return; // ignore multiple callbacks
    --q._active, ++q._ended;
    q._tasks[i] = null;
    if (q._error != null) return; // ignore secondary errors
    if (e != null) {
      abort(q, e);
    } else {
      q._data[i] = r;
      if (q._waiting) poke$1(q);
      else maybeNotify(q);
    }
  };
}

function abort(q, e) {
  var i = q._tasks.length, t;
  q._error = e; // ignore active callbacks
  q._data = undefined; // allow gc
  q._waiting = NaN; // prevent starting

  while (--i >= 0) {
    if (t = q._tasks[i]) {
      q._tasks[i] = null;
      if (t.abort) {
        try { t.abort(); }
        catch (e) { /* ignore */ }
      }
    }
  }

  q._active = NaN; // allow notification
  maybeNotify(q);
}

function maybeNotify(q) {
  if (!q._active && q._call) {
    var d = q._data;
    q._data = undefined; // allow gc
    q._call(q._error, d);
  }
}

function queue(concurrency) {
  if (concurrency == null) concurrency = Infinity;
  else if (!((concurrency = +concurrency) >= 1)) throw new Error("invalid concurrency");
  return new Queue(concurrency);
}

var defaultSource$1 = function() {
  return Math.random();
};

var uniform = (function sourceRandomUniform(source) {
  function randomUniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;
    else max -= min;
    return function() {
      return source() * max + min;
    };
  }

  randomUniform.source = sourceRandomUniform;

  return randomUniform;
})(defaultSource$1);

var normal = (function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = source() * 2 - 1;
        y = source() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
})(defaultSource$1);

var logNormal = (function sourceRandomLogNormal(source) {
  function randomLogNormal() {
    var randomNormal = normal.source(source).apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  randomLogNormal.source = sourceRandomLogNormal;

  return randomLogNormal;
})(defaultSource$1);

var irwinHall = (function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += source();
      return sum;
    };
  }

  randomIrwinHall.source = sourceRandomIrwinHall;

  return randomIrwinHall;
})(defaultSource$1);

var bates = (function sourceRandomBates(source) {
  function randomBates(n) {
    var randomIrwinHall = irwinHall.source(source)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  randomBates.source = sourceRandomBates;

  return randomBates;
})(defaultSource$1);

var exponential$1 = (function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function() {
      return -Math.log(1 - source()) / lambda;
    };
  }

  randomExponential.source = sourceRandomExponential;

  return randomExponential;
})(defaultSource$1);

var request = function(url, callback) {
  var request,
      event = dispatch("beforesend", "progress", "load", "error"),
      mimeType,
      headers = map$1(),
      xhr = new XMLHttpRequest,
      user = null,
      password = null,
      response,
      responseType,
      timeout = 0;

  // If IE does not support CORS, use XDomainRequest.
  if (typeof XDomainRequest !== "undefined"
      && !("withCredentials" in xhr)
      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

  "onload" in xhr
      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

  function respond(o) {
    var status = xhr.status, result;
    if (!status && hasResponse(xhr)
        || status >= 200 && status < 300
        || status === 304) {
      if (response) {
        try {
          result = response.call(request, xhr);
        } catch (e) {
          event.call("error", request, e);
          return;
        }
      } else {
        result = xhr;
      }
      event.call("load", request, result);
    } else {
      event.call("error", request, o);
    }
  }

  xhr.onprogress = function(e) {
    event.call("progress", request, e);
  };

  request = {
    header: function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers.get(name);
      if (value == null) headers.remove(name);
      else headers.set(name, value + "");
      return request;
    },

    // If mimeType is non-null and no Accept header is set, a default is used.
    mimeType: function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return request;
    },

    // Specifies what type the response value should take;
    // for instance, arraybuffer, blob, document, or text.
    responseType: function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return request;
    },

    timeout: function(value) {
      if (!arguments.length) return timeout;
      timeout = +value;
      return request;
    },

    user: function(value) {
      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
    },

    password: function(value) {
      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
    },

    // Specify how to convert the response content to a specific type;
    // changes the callback value on "load" events.
    response: function(value) {
      response = value;
      return request;
    },

    // Alias for send("GET", …).
    get: function(data, callback) {
      return request.send("GET", data, callback);
    },

    // Alias for send("POST", …).
    post: function(data, callback) {
      return request.send("POST", data, callback);
    },

    // If callback is non-null, it will be used for error and load events.
    send: function(method, data, callback) {
      xhr.open(method, url, true, user, password);
      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
      if (responseType != null) xhr.responseType = responseType;
      if (timeout > 0) xhr.timeout = timeout;
      if (callback == null && typeof data === "function") callback = data, data = null;
      if (callback != null && callback.length === 1) callback = fixCallback(callback);
      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
      event.call("beforesend", request, xhr);
      xhr.send(data == null ? null : data);
      return request;
    },

    abort: function() {
      xhr.abort();
      return request;
    },

    on: function() {
      var value = event.on.apply(event, arguments);
      return value === event ? request : value;
    }
  };

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return request.get(callback);
  }

  return request;
};

function fixCallback(callback) {
  return function(error, xhr) {
    callback(error == null ? xhr : null);
  };
}

function hasResponse(xhr) {
  var type = xhr.responseType;
  return type && type !== "text"
      ? xhr.response // null on error
      : xhr.responseText; // "" on error
}

var type$1 = function(defaultMimeType, response) {
  return function(url, callback) {
    var r = request(url).mimeType(defaultMimeType).response(response);
    if (callback != null) {
      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
      return r.get(callback);
    }
    return r;
  };
};

var html = type$1("text/html", function(xhr) {
  return document.createRange().createContextualFragment(xhr.responseText);
});

var json = type$1("application/json", function(xhr) {
  return JSON.parse(xhr.responseText);
});

var text = type$1("text/plain", function(xhr) {
  return xhr.responseText;
});

var xml = type$1("application/xml", function(xhr) {
  var xml = xhr.responseXML;
  if (!xml) throw new Error("parse error");
  return xml;
});

var dsv$1 = function(defaultMimeType, parse) {
  return function(url, row, callback) {
    if (arguments.length < 3) callback = row, row = null;
    var r = request(url).mimeType(defaultMimeType);
    r.row = function(_) { return arguments.length ? r.response(responseOf(parse, row = _)) : row; };
    r.row(row);
    return callback ? r.get(callback) : r;
  };
};

function responseOf(parse, row) {
  return function(request$$1) {
    return parse(request$$1.responseText, row);
  };
}

var csv$1 = dsv$1("text/csv", csvParse);

var tsv$1 = dsv$1("text/tab-separated-values", tsvParse);

var array$2 = Array.prototype;

var map$3 = array$2.map;
var slice$5 = array$2.slice;

var implicit = {name: "implicit"};

function ordinal(range) {
  var index = map$1(),
      domain = [],
      unknown = implicit;

  range = range == null ? [] : slice$5.call(range);

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = map$1();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = sequence(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band()
        .domain(domain())
        .range(range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return rescale();
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point$1() {
  return pointish(band().paddingInner(1));
}

var constant$9 = function(x) {
  return function() {
    return x;
  };
};

var number$2 = function(x) {
  return +x;
};

var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant$9(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate$$1) {
  return function(a, b) {
    var r = reinterpolate$$1(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range, deinterpolate, reinterpolate$$1) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate$$1(r1, r0);
  else d0 = deinterpolate(d0, d1), r0 = reinterpolate$$1(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, deinterpolate, reinterpolate$$1) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate$$1(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate$$1) {
  var domain = unit,
      range = unit,
      interpolate = interpolateValue,
      clamp = false,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate$$1) : reinterpolate$$1)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map$3.call(_, number$2), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = slice$5.call(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  return rescale();
}

var tickFormat = function(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = tickStep(start, stop, count == null ? 10 : count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return exports.formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return exports.format(specifier);
};

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return tickFormat(domain(), count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear$2() {
  var scale = continuous(deinterpolateLinear, reinterpolate);

  scale.copy = function() {
    return copy(scale, linear$2());
  };

  return linearish(scale);
}

function identity$6() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map$3.call(_, number$2), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity$6().domain(domain);
  };

  return linearish(scale);
}

var nice = function(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
};

function deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : constant$9(b);
}

function reinterpolate$1(a, b) {
  return a < 0
      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log$1() {
  var scale = continuous(deinterpolate, reinterpolate$1).domain([1, 10]),
      domain = scale.domain,
      base = 10,
      logs = logp(10),
      pows = powp(10);

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = exports.format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  scale.copy = function() {
    return copy(scale, log$1().base(base));
  };

  return scale;
}

function raise$1(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow$1() {
  var exponent = 1,
      scale = continuous(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise$1(b, exponent) - (a = raise$1(a, exponent)))
        ? function(x) { return (raise$1(x, exponent) - a) / b; }
        : constant$9(b);
  }

  function reinterpolate(a, b) {
    b = raise$1(b, exponent) - (a = raise$1(a, exponent));
    return function(t) { return raise$1(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return copy(scale, pow$1().exponent(exponent));
  };

  return linearish(scale);
}

function sqrt$1() {
  return pow$1().exponent(0.5);
}

function quantile() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = threshold(domain, i / n);
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) return range[bisectRight(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range);
  };

  return scale;
}

function quantize$1() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1];

  function scale(x) {
    if (x <= x) return range[bisectRight(domain, x, 0, n)];
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = slice$5.call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize$1()
        .domain([x0, x1])
        .range(range);
  };

  return linearish(scale);
}

function threshold$1() {
  var domain = [0.5],
      range = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) return range[bisectRight(domain, x, 0, n)];
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold$1()
        .domain(domain)
        .range(range);
  };

  return scale;
}

var t0$1 = new Date;
var t1$1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0$1.setTime(+start), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};

var milliseconds = millisecond.range;

var durationSecond$1 = 1e3;
var durationMinute$1 = 6e4;
var durationHour$1 = 36e5;
var durationDay$1 = 864e5;
var durationWeek$1 = 6048e5;

var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond$1) * durationSecond$1);
}, function(date, step) {
  date.setTime(+date + step * durationSecond$1);
}, function(start, end) {
  return (end - start) / durationSecond$1;
}, function(date) {
  return date.getUTCSeconds();
});

var seconds = second.range;

var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute$1) * durationMinute$1);
}, function(date, step) {
  date.setTime(+date + step * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date) {
  return date.getMinutes();
});

var minutes = minute.range;

var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute$1 % durationHour$1;
  if (offset < 0) offset += durationHour$1;
  date.setTime(Math.floor((+date - offset) / durationHour$1) * durationHour$1 + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date) {
  return date.getHours();
});

var hours = hour.range;

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationDay$1;
}, function(date) {
  return date.getDate() - 1;
});

var days = day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationWeek$1;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});

var months = month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

var years = year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date) {
  return date.getUTCMinutes();
});

var utcMinutes = utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date) {
  return date.getUTCHours();
});

var utcHours = utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay$1;
}, function(date) {
  return date.getUTCDate() - 1;
});

var utcDays = utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek$1;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});

var utcMonths = utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

var utcYears = utcYear.range;

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "S": formatSeconds,
    "U": formatWeekNumberSunday,
    "w": formatWeekdayNumber,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "S": formatUTCSeconds,
    "U": formatUTCWeekNumberSunday,
    "w": formatUTCWeekdayNumber,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "S": parseSeconds,
    "U": parseWeekNumberSunday,
    "w": parseWeekdayNumber,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0);
      if (i != string.length) return null;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
        var day$$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"};
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d), d), p, 2);
}

function formatWeekdayNumber(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d), d), p, 2);
}

function formatUTCWeekdayNumber(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

var locale$2;





defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$2 = formatLocale$1(definition);
  exports.timeFormat = locale$2.format;
  exports.timeParse = locale$2.parse;
  exports.utcFormat = locale$2.utcFormat;
  exports.utcParse = locale$2.utcParse;
  return locale$2;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : exports.utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : exports.utcParse(isoSpecifier);

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

function date$1(t) {
  return new Date(t);
}

function number$3(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format) {
  var scale = continuous(deinterpolateLinear, reinterpolate),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second$$1,  1,      durationSecond],
    [second$$1,  5,  5 * durationSecond],
    [second$$1, 15, 15 * durationSecond],
    [second$$1, 30, 30 * durationSecond],
    [minute$$1,  1,      durationMinute],
    [minute$$1,  5,  5 * durationMinute],
    [minute$$1, 15, 15 * durationMinute],
    [minute$$1, 30, 30 * durationMinute],
    [  hour$$1,  1,      durationHour  ],
    [  hour$$1,  3,  3 * durationHour  ],
    [  hour$$1,  6,  6 * durationHour  ],
    [  hour$$1, 12, 12 * durationHour  ],
    [   day$$1,  1,      durationDay   ],
    [   day$$1,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month$$1,  1,      durationMonth ],
    [ month$$1,  3,  3 * durationMonth ],
    [  year$$1,  1,      durationYear  ]
  ];

  function tickFormat(date$$1) {
    return (second$$1(date$$1) < date$$1 ? formatMillisecond
        : minute$$1(date$$1) < date$$1 ? formatSecond
        : hour$$1(date$$1) < date$$1 ? formatMinute
        : day$$1(date$$1) < date$$1 ? formatHour
        : month$$1(date$$1) < date$$1 ? (week(date$$1) < date$$1 ? formatDay : formatWeek)
        : year$$1(date$$1) < date$$1 ? formatMonth
        : formatYear)(date$$1);
  }

  function tickInterval(interval$$1, start, stop, step) {
    if (interval$$1 == null) interval$$1 = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval$$1 === "number") {
      var target = Math.abs(stop - start) / interval$$1,
          i = bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = tickStep(start / durationYear, stop / durationYear, interval$$1);
        interval$$1 = year$$1;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval$$1 = i[0];
      } else {
        step = tickStep(start, stop, interval$$1);
        interval$$1 = millisecond$$1;
      }
    }

    return step == null ? interval$$1 : interval$$1.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map$3.call(_, number$3)) : domain().map(date$1);
  };

  scale.ticks = function(interval$$1, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval$$1, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval$$1, step) {
    var d = domain();
    return (interval$$1 = tickInterval(interval$$1, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval$$1))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format));
  };

  return scale;
}

var time = function() {
  return calendar(year, month, sunday, day, hour, minute, second, millisecond, exports.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
};

var utcTime = function() {
  return calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, exports.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
};

var colors = function(s) {
  return s.match(/.{6}/g).map(function(x) {
    return "#" + x;
  });
};

var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

var cubehelix$3 = cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));

var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var rainbow = cubehelix();

var rainbow$1 = function(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  rainbow.h = 360 * t - 100;
  rainbow.s = 1.5 - 1.5 * ts;
  rainbow.l = 0.8 - 0.9 * ts;
  return rainbow + "";
};

function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

function sequential(interpolator) {
  var x0 = 0,
      x1 = 1,
      clamp = false;

  function scale(x) {
    var t = (x - x0) / (x1 - x0);
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
  };

  return linearish(scale);
}

var constant$10 = function(x) {
  return function constant() {
    return x;
  };
};

var abs$1 = Math.abs;
var atan2$1 = Math.atan2;
var cos$2 = Math.cos;
var max$2 = Math.max;
var min$1 = Math.min;
var sin$2 = Math.sin;
var sqrt$2 = Math.sqrt;

var epsilon$3 = 1e-12;
var pi$4 = Math.PI;
var halfPi$3 = pi$4 / 2;
var tau$4 = 2 * pi$4;

function acos$1(x) {
  return x > 1 ? 0 : x < -1 ? pi$4 : Math.acos(x);
}

function asin$1(x) {
  return x >= 1 ? halfPi$3 : x <= -1 ? -halfPi$3 : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt$2(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt$2(max$2(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

var arc = function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant$10(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi$3,
        a1 = endAngle.apply(this, arguments) - halfPi$3,
        da = abs$1(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon$3)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau$4 - epsilon$3) {
      context.moveTo(r1 * cos$2(a0), r1 * sin$2(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$3) {
        context.moveTo(r0 * cos$2(a1), r0 * sin$2(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$3) && (padRadius ? +padRadius.apply(this, arguments) : sqrt$2(r0 * r0 + r1 * r1)),
          rc = min$1(abs$1(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$3) {
        var p0 = asin$1(rp / r0 * sin$2(ap)),
            p1 = asin$1(rp / r1 * sin$2(ap));
        if ((da0 -= p0 * 2) > epsilon$3) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon$3) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos$2(a01),
          y01 = r1 * sin$2(a01),
          x10 = r0 * cos$2(a10),
          y10 = r0 * sin$2(a10);

      // Apply rounded corners?
      if (rc > epsilon$3) {
        var x11 = r1 * cos$2(a11),
            y11 = r1 * sin$2(a11),
            x00 = r0 * cos$2(a00),
            y00 = r0 * sin$2(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi$4) {
          var oc = da0 > epsilon$3 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin$2(acos$1((ax * bx + ay * by) / (sqrt$2(ax * ax + ay * ay) * sqrt$2(bx * bx + by * by))) / 2),
              lc = sqrt$2(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min$1(rc, (r0 - lc) / (kc - 1));
          rc1 = min$1(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$3)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$3) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$3) || !(da0 > epsilon$3)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$3) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$4 / 2;
    return [cos$2(a) * r, sin$2(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
};

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

var curveLinear = function(context) {
  return new Linear(context);
};

function x$3(p) {
  return p[0];
}

function y$3(p) {
  return p[1];
}

var line = function() {
  var x = x$3,
      y = y$3,
      defined = constant$10(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$10(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$10(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$10(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
};

var area$2 = function() {
  var x0 = x$3,
      x1 = null,
      y0 = constant$10(0),
      y1 = y$3,
      defined = constant$10(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$10(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$10(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$10(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$10(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$10(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
};

var descending$1 = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var identity$7 = function(d) {
  return d;
};

var pie = function() {
  var value = identity$7,
      sortValues = descending$1,
      sort = null,
      startAngle = constant$10(0),
      endAngle = constant$10(tau$4),
      padAngle = constant$10(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$4, Math.max(-tau$4, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$10(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : padAngle;
  };

  return pie;
};

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

var lineRadial$1 = function() {
  return lineRadial(line().curve(curveRadialLinear));
};

var areaRadial = function() {
  var a = area$2().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
};

var pointRadial = function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
};

var slice$6 = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link$2(curve) {
  var source = linkSource,
      target = linkTarget,
      x = x$3,
      y = y$3,
      context = null;

  function link() {
    var buffer, argv = slice$6.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = path();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$10(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$10(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link$2(curveHorizontal);
}

function linkVertical() {
  return link$2(curveVertical);
}

function linkRadial() {
  var l = link$2(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle$2 = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi$4);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$4);
  }
};

var cross$2 = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810;
var kr = Math.sin(pi$4 / 10) / Math.sin(7 * pi$4 / 10);
var kx = Math.sin(tau$4 / 10) * kr;
var ky = -Math.cos(tau$4 / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau$4 * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5;
var s = Math.sqrt(3) / 2;
var k = 1 / Math.sqrt(12);
var a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle$2,
  cross$2,
  diamond,
  square,
  star,
  triangle,
  wye
];

var symbol = function() {
  var type = constant$10(circle$2),
      size = constant$10(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$10(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$10(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};

var noop$2 = function() {};

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$2(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basis$2 = function(context) {
  return new Basis(context);
};

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisClosed$1 = function(context) {
  return new BasisClosed(context);
};

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisOpen = function(context) {
  return new BasisOpen(context);
};

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$3(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function point$4(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$3) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$3) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

var linearClosed = function(context) {
  return new LinearClosed(context);
};

function sign$1(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign$1(s0) + sign$1(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$5(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$5(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$5(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$5(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

var natural = function(context) {
  return new Natural(context);
};

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

var step = function(context) {
  return new Step(context, 0.5);
};

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

var none$1 = function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
};

var none$2 = function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
};

function stackValue(d, key) {
  return d[key];
}

var stack = function() {
  var keys = constant$10([]),
      order = none$2,
      offset = none$1,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$10(slice$6.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$10(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$2 : typeof _ === "function" ? _ : constant$10(slice$6.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none$1 : _, stack) : offset;
  };

  return stack;
};

var expand = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none$1(series, order);
};

var diverging = function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
};

var silhouette = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none$1(series, order);
};

var wiggle = function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none$1(series, order);
};

var ascending$2 = function(series) {
  var sums = series.map(sum$2);
  return none$2(series).sort(function(a, b) { return sums[a] - sums[b]; });
};

function sum$2(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

var descending$2 = function(series) {
  return ascending$2(series).reverse();
};

var insideOut = function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum$2),
      order = none$2(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
};

var reverse = function(series) {
  return none$2(series).reverse();
};

var constant$11 = function(x) {
  return function() {
    return x;
  };
};

function x$4(d) {
  return d[0];
}

function y$4(d) {
  return d[1];
}

function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,

  insert: function(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;

    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;

    if (!left) next = right;
    else if (!right) next = left;
    else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}

function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = edges.push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  cells[left.index].halfedges.push(index);
  cells[right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

// Liang–Barsky line clipping.
function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;

  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y0];
      else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];
      else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];
        else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];
        else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];
        else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];
        else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = edges.length,
      edge;

  while (i--) {
    if (!connectEdge(edge = edges[i], x0, y0, x1, y1)
        || !clipEdge(edge, x0, y0, x1, y1)
        || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$4
            || Math.abs(edge[0][1] - edge[1][1]) > epsilon$4)) {
      delete edges[i];
    }
  }
}

function createCell(site) {
  return cells[site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      index.sort(function(i, j) { return array[j] - array[i]; });
      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array[j];
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = cells.length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;

      // Remove any dangling clipped edges.
      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }

      // Insert any border edges as necessary.
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > epsilon$4 || Math.abs(endY - startY) > epsilon$4) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end,
              Math.abs(endX - x0) < epsilon$4 && y1 - endY > epsilon$4 ? [x0, Math.abs(startX - x0) < epsilon$4 ? startY : y1]
              : Math.abs(endY - y1) < epsilon$4 && x1 - endX > epsilon$4 ? [Math.abs(startY - y1) < epsilon$4 ? startX : x1, y1]
              : Math.abs(endX - x1) < epsilon$4 && endY - y0 > epsilon$4 ? [x1, Math.abs(startX - x1) < epsilon$4 ? startY : y0]
              : Math.abs(endY - y0) < epsilon$4 && endX - x0 > epsilon$4 ? [Math.abs(startY - y0) < epsilon$4 ? startX : x0, y0]
              : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  }

  // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!
  if (cover) {
    var dx, dy, d2, dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
      cover.halfedges.push(
        edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1,
        edges.push(createBorderEdge(site, v01, v11)) - 1,
        edges.push(createBorderEdge(site, v11, v10)) - 1,
        edges.push(createBorderEdge(site, v10, v00)) - 1
      );
    }
  }

  // Lastly delete any cells with no edges; these were entirely clipped.
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}

var circlePool = [];

var firstCircle;

function Circle() {
  RedBlackNode(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon2$2) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;

  var circle = circlePool.pop() || new Circle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;

  var before = null,
      node = circles._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  circles.insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    circles.remove(circle);
    circlePool.push(circle);
    RedBlackNode(circle);
    arc.circle = null;
  }
}

var beachPool = [];

function Beach() {
  RedBlackNode(this);
  this.edge =
  this.site =
  this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach;
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  detachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle.x) < epsilon$4
      && Math.abs(y - lArc.circle.cy) < epsilon$4) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  detachCircle(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle.x) < epsilon$4
      && Math.abs(y - rArc.circle.cy) < epsilon$4) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  detachCircle(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);

  attachCircle(lArc);
  attachCircle(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = beaches._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > epsilon$4) node = node.L; else {
      dxr = x - rightBreakPoint(node, directrix);
      if (dxr > epsilon$4) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -epsilon$4) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon$4) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  detachCircle(lArc);
  detachCircle(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

var epsilon$4 = 1e-6;
var epsilon2$2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1]
      || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;

  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree;
  circles = new RedBlackTree;

  while (true) {
    circle = firstCircle;
    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
      if (site[0] !== x || site[1] !== y) {
        addBeach(site);
        x = site[0], y = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      removeBeach(circle.arc);
    } else {
      break;
    }
  }

  sortCellHalfedges();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    clipEdges(x0, y0, x1, y1);
    clipCells(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;

  beaches =
  circles =
  edges =
  cells = null;
}

Diagram.prototype = {
  constructor: Diagram,

  polygons: function() {
    var edges = this.edges;

    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) { return cellHalfedgeStart(cell, edges[i]); });
      polygon.data = cell.site.data;
      return polygon;
    });
  },

  triangles: function() {
    var triangles = [],
        edges = this.edges;

    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });

    return triangles;
  },

  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },

  find: function(x, y, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;

    // Use the previously-found cell, or start with an arbitrary one.
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x - cell.site[0], dy = y - cell.site[1], d2 = dx * dx + dy * dy;

    // Traverse the half-edges to find a closer cell, if any.
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0], vy = y - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;

    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};

var voronoi = function() {
  var x = x$4,
      y = y$4,
      extent = null;

  function voronoi(data) {
    return new Diagram(data.map(function(d, i) {
      var s = [Math.round(x(d, i, data) / epsilon$4) * epsilon$4, Math.round(y(d, i, data) / epsilon$4) * epsilon$4];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function(data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$11(+_), voronoi) : x;
  };

  voronoi.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$11(+_), voronoi) : y;
  };

  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
};

var constant$12 = function(x) {
  return function() {
    return x;
  };
};

function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$8 = new Transform(1, 0, 0);

transform$1.prototype = Transform.prototype;

function transform$1(node) {
  return node.__zoom || identity$8;
}

function nopropagation$2() {
  exports.event.stopImmediatePropagation();
}

var noevent$2 = function() {
  exports.event.preventDefault();
  exports.event.stopImmediatePropagation();
};

// Ignore right-click, since that should open the context menu.
function defaultFilter$2() {
  return !exports.event.button;
}

function defaultExtent$1() {
  var e = this, w, h;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    w = e.width.baseVal.value;
    h = e.height.baseVal.value;
  } else {
    w = e.clientWidth;
    h = e.clientHeight;
  }
  return [[0, 0], [w, h]];
}

function defaultTransform() {
  return this.__zoom || identity$8;
}

function defaultWheelDelta() {
  return -exports.event.deltaY * (exports.event.deltaMode ? 120 : 1) / 500;
}

function touchable$1() {
  return "ontouchstart" in this;
}

var zoom = function() {
  var filter = defaultFilter$2,
      extent = defaultExtent$1,
      wheelDelta = defaultWheelDelta,
      k0 = 0,
      k1 = Infinity,
      x0 = -k1,
      x1 = k1,
      y0 = x0,
      y1 = x1,
      duration = 250,
      interpolate = interpolateZoom,
      gestures = [],
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0;

  function zoom(selection$$1) {
    selection$$1
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable$1)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform$$1) {
    var selection$$1 = collection.selection ? collection.selection() : collection;
    selection$$1.property("__zoom", defaultTransform);
    if (collection !== selection$$1) {
      schedule(collection, transform$$1);
    } else {
      selection$$1.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform$$1 === "function" ? transform$$1.apply(this, arguments) : transform$$1)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection$$1, k) {
    zoom.scaleTo(selection$$1, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    });
  };

  zoom.scaleTo = function(selection$$1, k) {
    zoom.transform(selection$$1, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = centroid(e),
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e);
    });
  };

  zoom.translateBy = function(selection$$1, x, y) {
    zoom.transform(selection$$1, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments));
    });
  };

  zoom.translateTo = function(selection$$1, x, y) {
    zoom.transform(selection$$1, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p = centroid(e);
      return constrain(identity$8.translate(p[0], p[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e);
    });
  };

  function scale(transform$$1, k) {
    k = Math.max(k0, Math.min(k1, k));
    return k === transform$$1.k ? transform$$1 : new Transform(k, transform$$1.x, transform$$1.y);
  }

  function translate(transform$$1, p0, p1) {
    var x = p0[0] - p1[0] * transform$$1.k, y = p0[1] - p1[1] * transform$$1.k;
    return x === transform$$1.x && y === transform$$1.y ? transform$$1 : new Transform(transform$$1.k, x, y);
  }

  function constrain(transform$$1, extent) {
    var dx0 = transform$$1.invertX(extent[0][0]) - x0,
        dx1 = transform$$1.invertX(extent[1][0]) - x1,
        dy0 = transform$$1.invertY(extent[0][1]) - y0,
        dy1 = transform$$1.invertY(extent[1][1]) - y1;
    return transform$$1.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition$$1, transform$$1, center) {
    transition$$1
        .on("start.zoom", function() { gesture(this, arguments).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args),
              e = extent.apply(that, args),
              p = center || centroid(e),
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform$$1 === "function" ? transform$$1.apply(that, args) : transform$$1,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args) {
    for (var i = 0, n = gestures.length, g; i < n; ++i) {
      if ((g = gestures[i]).that === that) {
        return g;
      }
    }
    return new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.index = -1;
    this.active = 0;
    this.extent = extent.apply(that, args);
  }

  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.index = gestures.push(this) - 1;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform$$1) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform$$1.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform$$1.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform$$1.invert(this.touch1[0]);
      this.that.__zoom = transform$$1;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        gestures.splice(this.index, 1);
        this.index = -1;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(k0, Math.min(k1, t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = mouse(this);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent$2();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        v = select(exports.event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = mouse(this),
        x0 = exports.event.clientX,
        y0 = exports.event.clientY;

    dragDisable(exports.event.view);
    nopropagation$2();
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved() {
      noevent$2();
      if (!g.moved) {
        var dx = exports.event.clientX - x0, dy = exports.event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(exports.event.view, g.moved);
      noevent$2();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = mouse(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (exports.event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments));

    noevent$2();
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0);
    else select(this).call(zoom.transform, t1);
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        touches$$1 = exports.event.changedTouches,
        started,
        n = touches$$1.length, i, t, p;

    nopropagation$2();
    for (i = 0; i < n; ++i) {
      t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true;
      else if (!g.touch1) g.touch1 = p;
    }

    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
    if (touchstarting) {
      touchstarting = clearTimeout(touchstarting);
      if (!g.touch1) {
        g.end();
        p = select(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
        return;
      }
    }

    if (started) {
      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved() {
    var g = gesture(this, arguments),
        touches$$1 = exports.event.changedTouches,
        n = touches$$1.length, i, t, p, l;

    noevent$2();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    for (i = 0; i < n; ++i) {
      t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent));
  }

  function touchended() {
    var g = gesture(this, arguments),
        touches$$1 = exports.event.changedTouches,
        n = touches$$1.length, i, t;

    nopropagation$2();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches$$1[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else g.end();
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$12(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$12(!!_), zoom) : filter;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$12([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (k0 = +_[0], k1 = +_[1], zoom) : [k0, k1];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], zoom) : [[x0, y0], [x1, y1]];
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  return zoom;
};

exports.version = version;
exports.bisect = bisectRight;
exports.bisectRight = bisectRight;
exports.bisectLeft = bisectLeft;
exports.ascending = ascending;
exports.bisector = bisector;
exports.cross = cross;
exports.descending = descending;
exports.deviation = deviation;
exports.extent = extent;
exports.histogram = histogram;
exports.thresholdFreedmanDiaconis = freedmanDiaconis;
exports.thresholdScott = scott;
exports.thresholdSturges = sturges;
exports.max = max;
exports.mean = mean;
exports.median = median;
exports.merge = merge;
exports.min = min;
exports.pairs = pairs;
exports.permute = permute;
exports.quantile = threshold;
exports.range = sequence;
exports.scan = scan;
exports.shuffle = shuffle;
exports.sum = sum;
exports.ticks = ticks;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
exports.transpose = transpose;
exports.variance = variance;
exports.zip = zip;
exports.axisTop = axisTop;
exports.axisRight = axisRight;
exports.axisBottom = axisBottom;
exports.axisLeft = axisLeft;
exports.brush = brush;
exports.brushX = brushX;
exports.brushY = brushY;
exports.brushSelection = brushSelection;
exports.chord = chord;
exports.ribbon = ribbon;
exports.nest = nest;
exports.set = set$2;
exports.map = map$1;
exports.keys = keys;
exports.values = values;
exports.entries = entries;
exports.color = color;
exports.rgb = rgb;
exports.hsl = hsl;
exports.lab = lab;
exports.hcl = hcl;
exports.cubehelix = cubehelix;
exports.dispatch = dispatch;
exports.drag = drag;
exports.dragDisable = dragDisable;
exports.dragEnable = yesdrag;
exports.dsvFormat = dsv;
exports.csvParse = csvParse;
exports.csvParseRows = csvParseRows;
exports.csvFormat = csvFormat;
exports.csvFormatRows = csvFormatRows;
exports.tsvParse = tsvParse;
exports.tsvParseRows = tsvParseRows;
exports.tsvFormat = tsvFormat;
exports.tsvFormatRows = tsvFormatRows;
exports.easeLinear = linear$1;
exports.easeQuad = quadInOut;
exports.easeQuadIn = quadIn;
exports.easeQuadOut = quadOut;
exports.easeQuadInOut = quadInOut;
exports.easeCubic = cubicInOut;
exports.easeCubicIn = cubicIn;
exports.easeCubicOut = cubicOut;
exports.easeCubicInOut = cubicInOut;
exports.easePoly = polyInOut;
exports.easePolyIn = polyIn;
exports.easePolyOut = polyOut;
exports.easePolyInOut = polyInOut;
exports.easeSin = sinInOut;
exports.easeSinIn = sinIn;
exports.easeSinOut = sinOut;
exports.easeSinInOut = sinInOut;
exports.easeExp = expInOut;
exports.easeExpIn = expIn;
exports.easeExpOut = expOut;
exports.easeExpInOut = expInOut;
exports.easeCircle = circleInOut;
exports.easeCircleIn = circleIn;
exports.easeCircleOut = circleOut;
exports.easeCircleInOut = circleInOut;
exports.easeBounce = bounceOut;
exports.easeBounceIn = bounceIn;
exports.easeBounceOut = bounceOut;
exports.easeBounceInOut = bounceInOut;
exports.easeBack = backInOut;
exports.easeBackIn = backIn;
exports.easeBackOut = backOut;
exports.easeBackInOut = backInOut;
exports.easeElastic = elasticOut;
exports.easeElasticIn = elasticIn;
exports.easeElasticOut = elasticOut;
exports.easeElasticInOut = elasticInOut;
exports.forceCenter = center$1;
exports.forceCollide = collide;
exports.forceLink = link;
exports.forceManyBody = manyBody;
exports.forceSimulation = simulation;
exports.forceX = x$2;
exports.forceY = y$2;
exports.formatDefaultLocale = defaultLocale;
exports.formatLocale = formatLocale;
exports.formatSpecifier = formatSpecifier;
exports.precisionFixed = precisionFixed;
exports.precisionPrefix = precisionPrefix;
exports.precisionRound = precisionRound;
exports.geoArea = area;
exports.geoBounds = bounds;
exports.geoCentroid = centroid;
exports.geoCircle = circle;
exports.geoClipExtent = extent$1;
exports.geoContains = contains;
exports.geoDistance = distance;
exports.geoGraticule = graticule;
exports.geoGraticule10 = graticule10;
exports.geoInterpolate = interpolate$1;
exports.geoLength = length$1;
exports.geoPath = index$1;
exports.geoAlbers = albers;
exports.geoAlbersUsa = albersUsa;
exports.geoAzimuthalEqualArea = azimuthalEqualArea;
exports.geoAzimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
exports.geoAzimuthalEquidistant = azimuthalEquidistant;
exports.geoAzimuthalEquidistantRaw = azimuthalEquidistantRaw;
exports.geoConicConformal = conicConformal;
exports.geoConicConformalRaw = conicConformalRaw;
exports.geoConicEqualArea = conicEqualArea;
exports.geoConicEqualAreaRaw = conicEqualAreaRaw;
exports.geoConicEquidistant = conicEquidistant;
exports.geoConicEquidistantRaw = conicEquidistantRaw;
exports.geoEquirectangular = equirectangular;
exports.geoEquirectangularRaw = equirectangularRaw;
exports.geoGnomonic = gnomonic;
exports.geoGnomonicRaw = gnomonicRaw;
exports.geoIdentity = identity$5;
exports.geoProjection = projection;
exports.geoProjectionMutator = projectionMutator;
exports.geoMercator = mercator;
exports.geoMercatorRaw = mercatorRaw;
exports.geoOrthographic = orthographic;
exports.geoOrthographicRaw = orthographicRaw;
exports.geoStereographic = stereographic;
exports.geoStereographicRaw = stereographicRaw;
exports.geoTransverseMercator = transverseMercator;
exports.geoTransverseMercatorRaw = transverseMercatorRaw;
exports.geoRotation = rotation;
exports.geoStream = geoStream;
exports.geoTransform = transform;
exports.cluster = cluster;
exports.hierarchy = hierarchy;
exports.pack = index$2;
exports.packSiblings = siblings;
exports.packEnclose = enclose;
exports.partition = partition;
exports.stratify = stratify;
exports.tree = tree;
exports.treemap = index$3;
exports.treemapBinary = binary;
exports.treemapDice = treemapDice;
exports.treemapSlice = treemapSlice;
exports.treemapSliceDice = sliceDice;
exports.treemapSquarify = squarify;
exports.treemapResquarify = resquarify;
exports.interpolate = interpolateValue;
exports.interpolateArray = array$1;
exports.interpolateBasis = basis$1;
exports.interpolateBasisClosed = basisClosed;
exports.interpolateDate = date;
exports.interpolateNumber = reinterpolate;
exports.interpolateObject = object;
exports.interpolateRound = interpolateRound;
exports.interpolateString = interpolateString;
exports.interpolateTransformCss = interpolateTransformCss;
exports.interpolateTransformSvg = interpolateTransformSvg;
exports.interpolateZoom = interpolateZoom;
exports.interpolateRgb = interpolateRgb;
exports.interpolateRgbBasis = rgbBasis;
exports.interpolateRgbBasisClosed = rgbBasisClosed;
exports.interpolateHsl = hsl$2;
exports.interpolateHslLong = hslLong;
exports.interpolateLab = lab$1;
exports.interpolateHcl = hcl$2;
exports.interpolateHclLong = hclLong;
exports.interpolateCubehelix = cubehelix$2;
exports.interpolateCubehelixLong = cubehelixLong;
exports.quantize = quantize;
exports.path = path;
exports.polygonArea = area$1;
exports.polygonCentroid = centroid$1;
exports.polygonHull = hull;
exports.polygonContains = contains$1;
exports.polygonLength = length$2;
exports.quadtree = quadtree;
exports.queue = queue;
exports.randomUniform = uniform;
exports.randomNormal = normal;
exports.randomLogNormal = logNormal;
exports.randomBates = bates;
exports.randomIrwinHall = irwinHall;
exports.randomExponential = exponential$1;
exports.request = request;
exports.html = html;
exports.json = json;
exports.text = text;
exports.xml = xml;
exports.csv = csv$1;
exports.tsv = tsv$1;
exports.scaleBand = band;
exports.scalePoint = point$1;
exports.scaleIdentity = identity$6;
exports.scaleLinear = linear$2;
exports.scaleLog = log$1;
exports.scaleOrdinal = ordinal;
exports.scaleImplicit = implicit;
exports.scalePow = pow$1;
exports.scaleSqrt = sqrt$1;
exports.scaleQuantile = quantile;
exports.scaleQuantize = quantize$1;
exports.scaleThreshold = threshold$1;
exports.scaleTime = time;
exports.scaleUtc = utcTime;
exports.schemeCategory10 = category10;
exports.schemeCategory20b = category20b;
exports.schemeCategory20c = category20c;
exports.schemeCategory20 = category20;
exports.interpolateCubehelixDefault = cubehelix$3;
exports.interpolateRainbow = rainbow$1;
exports.interpolateWarm = warm;
exports.interpolateCool = cool;
exports.interpolateViridis = viridis;
exports.interpolateMagma = magma;
exports.interpolateInferno = inferno;
exports.interpolatePlasma = plasma;
exports.scaleSequential = sequential;
exports.creator = creator;
exports.local = local$1;
exports.matcher = matcher$1;
exports.mouse = mouse;
exports.namespace = namespace;
exports.namespaces = namespaces;
exports.select = select;
exports.selectAll = selectAll;
exports.selection = selection;
exports.selector = selector;
exports.selectorAll = selectorAll;
exports.style = styleValue;
exports.touch = touch;
exports.touches = touches;
exports.window = defaultView;
exports.customEvent = customEvent;
exports.arc = arc;
exports.area = area$2;
exports.line = line;
exports.pie = pie;
exports.areaRadial = areaRadial;
exports.radialArea = areaRadial;
exports.lineRadial = lineRadial$1;
exports.radialLine = lineRadial$1;
exports.pointRadial = pointRadial;
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle$2;
exports.symbolCross = cross$2;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed$1;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis$2;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetDiverging = diverging;
exports.stackOffsetNone = none$1;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAscending = ascending$2;
exports.stackOrderDescending = descending$2;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$2;
exports.stackOrderReverse = reverse;
exports.timeInterval = newInterval;
exports.timeMillisecond = millisecond;
exports.timeMilliseconds = milliseconds;
exports.utcMillisecond = millisecond;
exports.utcMilliseconds = milliseconds;
exports.timeSecond = second;
exports.timeSeconds = seconds;
exports.utcSecond = second;
exports.utcSeconds = seconds;
exports.timeMinute = minute;
exports.timeMinutes = minutes;
exports.timeHour = hour;
exports.timeHours = hours;
exports.timeDay = day;
exports.timeDays = days;
exports.timeWeek = sunday;
exports.timeWeeks = sundays;
exports.timeSunday = sunday;
exports.timeSundays = sundays;
exports.timeMonday = monday;
exports.timeMondays = mondays;
exports.timeTuesday = tuesday;
exports.timeTuesdays = tuesdays;
exports.timeWednesday = wednesday;
exports.timeWednesdays = wednesdays;
exports.timeThursday = thursday;
exports.timeThursdays = thursdays;
exports.timeFriday = friday;
exports.timeFridays = fridays;
exports.timeSaturday = saturday;
exports.timeSaturdays = saturdays;
exports.timeMonth = month;
exports.timeMonths = months;
exports.timeYear = year;
exports.timeYears = years;
exports.utcMinute = utcMinute;
exports.utcMinutes = utcMinutes;
exports.utcHour = utcHour;
exports.utcHours = utcHours;
exports.utcDay = utcDay;
exports.utcDays = utcDays;
exports.utcWeek = utcSunday;
exports.utcWeeks = utcSundays;
exports.utcSunday = utcSunday;
exports.utcSundays = utcSundays;
exports.utcMonday = utcMonday;
exports.utcMondays = utcMondays;
exports.utcTuesday = utcTuesday;
exports.utcTuesdays = utcTuesdays;
exports.utcWednesday = utcWednesday;
exports.utcWednesdays = utcWednesdays;
exports.utcThursday = utcThursday;
exports.utcThursdays = utcThursdays;
exports.utcFriday = utcFriday;
exports.utcFridays = utcFridays;
exports.utcSaturday = utcSaturday;
exports.utcSaturdays = utcSaturdays;
exports.utcMonth = utcMonth;
exports.utcMonths = utcMonths;
exports.utcYear = utcYear;
exports.utcYears = utcYears;
exports.timeFormatDefaultLocale = defaultLocale$1;
exports.timeFormatLocale = formatLocale$1;
exports.isoFormat = formatIso;
exports.isoParse = parseIso;
exports.now = now;
exports.timer = timer;
exports.timerFlush = timerFlush;
exports.timeout = timeout$1;
exports.interval = interval$1;
exports.transition = transition;
exports.active = active;
exports.interrupt = interrupt;
exports.voronoi = voronoi;
exports.zoom = zoom;
exports.zoomTransform = transform$1;
exports.zoomIdentity = identity$8;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var CLASS = {
	target: "bb-target",
	chart: "bb-chart",
	chartLine: "bb-chart-line",
	chartLines: "bb-chart-lines",
	chartBar: "bb-chart-bar",
	chartBars: "bb-chart-bars",
	chartText: "bb-chart-text",
	chartTexts: "bb-chart-texts",
	chartArc: "bb-chart-arc",
	chartArcs: "bb-chart-arcs",
	chartArcsTitle: "bb-chart-arcs-title",
	chartArcsBackground: "bb-chart-arcs-background",
	chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
	chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
	chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
	selectedCircle: "bb-selected-circle",
	selectedCircles: "bb-selected-circles",
	eventRect: "bb-event-rect",
	eventRects: "bb-event-rects",
	eventRectsSingle: "bb-event-rects-single",
	eventRectsMultiple: "bb-event-rects-multiple",
	zoomRect: "bb-zoom-rect",
	brush: "bb-brush",
	focused: "bb-focused",
	defocused: "bb-defocused",
	region: "bb-region",
	regions: "bb-regions",
	title: "bb-title",
	tooltipContainer: "bb-tooltip-container",
	tooltip: "bb-tooltip",
	tooltipName: "bb-tooltip-name",
	shape: "bb-shape",
	shapes: "bb-shapes",
	line: "bb-line",
	lines: "bb-lines",
	bar: "bb-bar",
	bars: "bb-bars",
	circle: "bb-circle",
	circles: "bb-circles",
	arc: "bb-arc",
	arcs: "bb-arcs",
	area: "bb-area",
	areas: "bb-areas",
	empty: "bb-empty",
	text: "bb-text",
	texts: "bb-texts",
	gaugeValue: "bb-gauge-value",
	grid: "bb-grid",
	gridLines: "bb-grid-lines",
	xgrid: "bb-xgrid",
	xgrids: "bb-xgrids",
	xgridLine: "bb-xgrid-line",
	xgridLines: "bb-xgrid-lines",
	xgridFocus: "bb-xgrid-focus",
	ygrid: "bb-ygrid",
	ygrids: "bb-ygrids",
	ygridLine: "bb-ygrid-line",
	ygridLines: "bb-ygrid-lines",
	axis: "bb-axis",
	axisX: "bb-axis-x",
	axisXLabel: "bb-axis-x-label",
	axisY: "bb-axis-y",
	axisYLabel: "bb-axis-y-label",
	axisY2: "bb-axis-y2",
	axisY2Label: "bb-axis-y2-label",
	legendBackground: "bb-legend-background",
	legendItem: "bb-legend-item",
	legendItemEvent: "bb-legend-item-event",
	legendItemTile: "bb-legend-item-tile",
	legendItemHidden: "bb-legend-item-hidden",
	legendItemFocused: "bb-legend-item-focused",
	dragarea: "bb-dragarea",
	EXPANDED: "_expanded_",
	SELECTED: "_selected_",
	INCLUDED: "_included_"
};

exports.default = CLASS;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(6),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main chart class.
 * - Note: Instantiated via `bb.generate()`.
 * @class Chart
 * @example
 * var chart = bb.generate({
 *  data: {
 *    columns: [
 *	    ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
 * 	    ["count1", 11, 8, 7, 6, 5 ],
 *	    ["count2", 9, 3, 6, 2, 8 ]
 *   ]}
 * }
 * @see {@link bb.generate} for the initialization.
*/
var Chart = function Chart(config) {
  (0, _classCallCheck3.default)(this, Chart);

  var $$ = new _ChartInternal2.default(this);

  this.internal = $$, $$.loadConfig(config), $$.beforeInit(config), $$.init(), $$.afterInit(config), function bindThis(fn, target, argThis) {
    Object.keys(fn).forEach(function (key) {
      target[key] = fn[key].bind(argThis), Object.keys(fn[key]).length && bindThis(fn[key], target[key], argThis);
    });
  }(Chart.prototype, this, this);
}; /**
    * Copyright (c) 2017 NAVER Corp.
    * billboard.js project is licensed under the MIT license
    * @license MIT
    * @ignore
    */


exports.default = Chart;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

exports.default = function (obj) {
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _classCallCheck2 = __webpack_require__(6),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _d = __webpack_require__(2),
    _util = __webpack_require__(0),
    _bb = __webpack_require__(8),
    _bb2 = _interopRequireDefault(_bb),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var Axis = function () {
	function Axis(owner) {
		(0, _classCallCheck3.default)(this, Axis), this.owner = owner;
	}

	return Axis.prototype.init = function init() {
		var $$ = this.owner,
		    config = $$.config,
		    main = $$.main;
		$$.axes.x = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisX).attr("clip-path", $$.clipPathForXAxis).attr("transform", $$.getTranslate("x")).style("visibility", config.axis_x_show ? "visible" : "hidden"), $$.axes.x.append("text").attr("class", _classes2.default.axisXLabel).attr("transform", config.axis_rotated ? "rotate(-90)" : "").style("text-anchor", this.textAnchorForXAxisLabel.bind(this)), $$.axes.y = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisY).attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis).attr("transform", $$.getTranslate("y")).style("visibility", config.axis_y_show ? "visible" : "hidden"), $$.axes.y.append("text").attr("class", _classes2.default.axisYLabel).attr("transform", config.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForYAxisLabel.bind(this)), $$.axes.y2 = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisY2)
		// clip-path?
		.attr("transform", $$.getTranslate("y2")).style("visibility", config.axis_y2_show ? "visible" : "hidden"), $$.axes.y2.append("text").attr("class", _classes2.default.axisY2Label).attr("transform", config.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
	}, Axis.prototype.getXAxis = function getXAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
		var $$ = this.owner,
		    config = $$.config,
		    axisParams = {
			isCategory: $$.isCategorized(),
			withOuterTick: withOuterTick,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
			withoutTransition: withoutTransition,
			orgXScale: $$.x
		},
		    axis = (0, _bb2.default)(axisParams).scale($$.zoomScale || scale).orient(orient),
		    newTickValues = tickValues;


		return $$.isTimeSeries() && tickValues && typeof tickValues !== "function" && (newTickValues = tickValues.map(function (v) {
			return $$.parseDate(v);
		})), axis.tickFormat(tickFormat).tickValues(newTickValues), $$.isCategorized() && (axis.tickCentered(config.axis_x_tick_centered), (0, _util.isEmpty)(config.axis_x_tick_culling) && (config.axis_x_tick_culling = !1)), axis;
	}, Axis.prototype.updateXAxisTickValues = function updateXAxisTickValues(targets, axis) {
		var $$ = this.owner,
		    config = $$.config,
		    tickValues = void 0;

		return (config.axis_x_tick_fit || config.axis_x_tick_count) && (tickValues = this.generateTickValues($$.mapTargetsToUniqueXs(targets), config.axis_x_tick_count, $$.isTimeSeries())), axis ? axis.tickValues(tickValues) : ($$.xAxis.tickValues(tickValues), $$.subXAxis.tickValues(tickValues)), tickValues;
	}, Axis.prototype.getYAxis = function getYAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
		var $$ = this.owner,
		    config = $$.config,
		    axisParams = {
			withOuterTick: withOuterTick,
			withoutTransition: withoutTransition,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_y_tick_rotate
		},
		    axis = (0, _bb2.default)(axisParams).scale(scale).orient(orient).tickFormat(tickFormat);

		return $$.isTimeSeriesY() ? axis.ticks(config.axis_y_tick_time_value) : axis.tickValues(tickValues), axis;
	}, Axis.prototype.getId = function getId(id) {
		var config = this.owner.config;

		return id in config.data_axes ? config.data_axes[id] : "y";
	}, Axis.prototype.getXAxisTickFormat = function getXAxisTickFormat() {
		var $$ = this.owner,
		    config = $$.config,
		    format = void 0;


		return format = $$.isTimeSeries() ? $$.defaultAxisTimeFormat : $$.isCategorized() ? $$.categoryName : function (v) {
			return v < 0 ? v.toFixed(0) : v;
		}, config.axis_x_tick_format && ((0, _util.isFunction)(config.axis_x_tick_format) ? format = config.axis_x_tick_format : $$.isTimeSeries() && (format = function (date) {
			return date ? $$.axisTimeFormat(config.axis_x_tick_format)(date) : "";
		})), (0, _util.isFunction)(format) ? function (v) {
			return format.call($$, v);
		} : format;
	}, Axis.prototype.getTickValues = function getTickValues(tickValues, axis) {
		var values = void 0;

		return values = tickValues ? tickValues : axis ? axis.tickValues() : undefined, values;
	}, Axis.prototype.getXAxisTickValues = function getXAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis);
	}, Axis.prototype.getYAxisTickValues = function getYAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis);
	}, Axis.prototype.getY2AxisTickValues = function getY2AxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis);
	}, Axis.prototype.getLabelOptionByAxisId = function getLabelOptionByAxisId(axisId) {
		var $$ = this.owner,
		    config = $$.config,
		    option = void 0;

		return axisId === "y" ? option = config.axis_y_label : axisId === "y2" ? option = config.axis_y2_label : axisId === "x" && (option = config.axis_x_label), option;
	}, Axis.prototype.getLabelText = function getLabelText(axisId) {
		var option = this.getLabelOptionByAxisId(axisId),
		    text = void 0;

		return text = (0, _util.isString)(option) ? option : option ? option.text : null, text;
	}, Axis.prototype.setLabelText = function setLabelText(axisId, text) {
		var $$ = this.owner,
		    config = $$.config,
		    option = this.getLabelOptionByAxisId(axisId);
		(0, _util.isString)(option) ? axisId === "y" ? config.axis_y_label = text : axisId === "y2" ? config.axis_y2_label = text : axisId === "x" && (config.axis_x_label = text) : option && (option.text = text);
	}, Axis.prototype.getLabelPosition = function getLabelPosition(axisId, defaultPosition) {
		var option = this.getLabelOptionByAxisId(axisId),
		    position = (typeof option === "undefined" ? "undefined" : (0, _typeof3.default)(option)) === "object" && option.position ? option.position : defaultPosition;


		return {
			isInner: !!~position.indexOf("inner"),
			isOuter: !!~position.indexOf("outer"),
			isLeft: !!~position.indexOf("left"),
			isCenter: !!~position.indexOf("center"),
			isRight: !!~position.indexOf("right"),
			isTop: !!~position.indexOf("top"),
			isMiddle: !!~position.indexOf("middle"),
			isBottom: !!~position.indexOf("bottom")
		};
	}, Axis.prototype.getXAxisLabelPosition = function getXAxisLabelPosition() {
		return this.getLabelPosition("x", this.owner.config.axis_rotated ? "inner-top" : "inner-right");
	}, Axis.prototype.getYAxisLabelPosition = function getYAxisLabelPosition() {
		return this.getLabelPosition("y", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
	}, Axis.prototype.getY2AxisLabelPosition = function getY2AxisLabelPosition() {
		return this.getLabelPosition("y2", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
	}, Axis.prototype.getLabelPositionById = function getLabelPositionById(id) {
		var label = void 0;

		return label = id === "y2" ? this.getY2AxisLabelPosition() : id === "y" ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition(), label;
	}, Axis.prototype.textForXAxisLabel = function textForXAxisLabel() {
		return this.getLabelText("x");
	}, Axis.prototype.textForYAxisLabel = function textForYAxisLabel() {
		return this.getLabelText("y");
	}, Axis.prototype.textForY2AxisLabel = function textForY2AxisLabel() {
		return this.getLabelText("y2");
	}, Axis.prototype.xForAxisLabel = function xForAxisLabel(forHorizontal, position) {
		var $$ = this.owner,
		    x = void 0;

		return x = forHorizontal ? position.isLeft ? 0 : position.isCenter ? $$.width / 2 : $$.width : position.isBottom ? -$$.height : position.isMiddle ? -$$.height / 2 : 0, x;
	}, Axis.prototype.dxForAxisLabel = function dxForAxisLabel(forHorizontal, position) {
		var dx = void 0;

		return dx = forHorizontal ? position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0" : position.isTop ? "-0.5em" : position.isBottom ? "0.5em" : "0", dx;
	}, Axis.prototype.textAnchorForAxisLabel = function textAnchorForAxisLabel(forHorizontal, position) {
		var anchor = void 0;

		return anchor = forHorizontal ? position.isLeft ? "start" : position.isCenter ? "middle" : "end" : position.isBottom ? "start" : position.isMiddle ? "middle" : "end", anchor;
	}, Axis.prototype.xForXAxisLabel = function xForXAxisLabel() {
		return this.xForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
	}, Axis.prototype.xForYAxisLabel = function xForYAxisLabel() {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
	}, Axis.prototype.xForY2AxisLabel = function xForY2AxisLabel() {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
	}, Axis.prototype.dxForXAxisLabel = function dxForXAxisLabel() {
		return this.dxForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
	}, Axis.prototype.dxForYAxisLabel = function dxForYAxisLabel() {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
	}, Axis.prototype.dxForY2AxisLabel = function dxForY2AxisLabel() {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
	}, Axis.prototype.dyForXAxisLabel = function dyForXAxisLabel() {
		var $$ = this.owner,
		    config = $$.config,
		    position = this.getXAxisLabelPosition();
		return config.axis_rotated ? position.isInner ? "1.2em" : -25 - this.getMaxTickWidth("x") : position.isInner ? "-0.5em" : config.axis_x_height ? config.axis_x_height - 10 : "3em";
	}, Axis.prototype.dyForYAxisLabel = function dyForYAxisLabel() {
		var $$ = this.owner,
		    position = this.getYAxisLabelPosition();
		return $$.config.axis_rotated ? position.isInner ? "-0.5em" : "3em" : position.isInner ? "1.2em" : -10 - ($$.config.axis_y_inner ? 0 : this.getMaxTickWidth("y") + 10);
	}, Axis.prototype.dyForY2AxisLabel = function dyForY2AxisLabel() {
		var $$ = this.owner,
		    position = this.getY2AxisLabelPosition();
		return $$.config.axis_rotated ? position.isInner ? "1.2em" : "-2.2em" : position.isInner ? "-0.5em" : 15 + ($$.config.axis_y2_inner ? 0 : this.getMaxTickWidth("y2") + 15);
	}, Axis.prototype.textAnchorForXAxisLabel = function textAnchorForXAxisLabel() {
		var $$ = this.owner;

		return this.textAnchorForAxisLabel(!$$.config.axis_rotated, this.getXAxisLabelPosition());
	}, Axis.prototype.textAnchorForYAxisLabel = function textAnchorForYAxisLabel() {
		var $$ = this.owner;

		return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getYAxisLabelPosition());
	}, Axis.prototype.textAnchorForY2AxisLabel = function textAnchorForY2AxisLabel() {
		var $$ = this.owner;

		return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getY2AxisLabelPosition());
	}, Axis.prototype.getMaxTickWidth = function getMaxTickWidth(id, withoutRecompute) {
		var $$ = this.owner,
		    config = $$.config,
		    maxWidth = 0,
		    dummy = void 0,
		    svg = void 0;


		if (withoutRecompute && $$.currentMaxTickWidths[id]) return $$.currentMaxTickWidths[id];

		if ($$.svg) {
			var targetsToShow = $$.filterTargetsToShow($$.data.targets),
			    scale = void 0,
			    axis = void 0;
			id === "y" ? (scale = $$.y.copy().domain($$.getYDomain(targetsToShow, "y")), axis = this.getYAxis(scale, $$.yOrient, config.axis_y_tick_format, $$.yAxisTickValues, !1, !0, !0)) : id === "y2" ? (scale = $$.y2.copy().domain($$.getYDomain(targetsToShow, "y2")), axis = this.getYAxis(scale, $$.y2Orient, config.axis_y2_tick_format, $$.y2AxisTickValues, !1, !0, !0)) : (scale = $$.x.copy().domain($$.getXDomain(targetsToShow)), axis = this.getXAxis(scale, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, !1, !0, !0), this.updateXAxisTickValues(targetsToShow, axis)), dummy = (0, _d.select)("body").append("div").classed("bb", !0), svg = dummy.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0px").style("left", "0px"), svg.append("g").call(axis).each(function () {
				(0, _d.select)(this).selectAll("text").each(function () {
					var box = this.getBoundingClientRect();

					maxWidth < box.width && (maxWidth = box.width);
				}), dummy.remove();
			});
		}

		return $$.currentMaxTickWidths[id] = maxWidth <= 0 ? $$.currentMaxTickWidths[id] : maxWidth, $$.currentMaxTickWidths[id];
	}, Axis.prototype.updateLabels = function updateLabels(withTransition) {
		var $$ = this.owner,
		    axisXLabel = $$.main.select("." + _classes2.default.axisX + " ." + _classes2.default.axisXLabel),
		    axisYLabel = $$.main.select("." + _classes2.default.axisY + " ." + _classes2.default.axisYLabel),
		    axisY2Label = $$.main.select("." + _classes2.default.axisY2 + "  ." + _classes2.default.axisY2Label);
		(withTransition ? axisXLabel.transition() : axisXLabel).attr("x", this.xForXAxisLabel.bind(this)).attr("dx", this.dxForXAxisLabel.bind(this)).attr("dy", this.dyForXAxisLabel.bind(this)).text(this.textForXAxisLabel.bind(this)), (withTransition ? axisYLabel.transition() : axisYLabel).attr("x", this.xForYAxisLabel.bind(this)).attr("dx", this.dxForYAxisLabel.bind(this)).attr("dy", this.dyForYAxisLabel.bind(this)).text(this.textForYAxisLabel.bind(this)), (withTransition ? axisY2Label.transition() : axisY2Label).attr("x", this.xForY2AxisLabel.bind(this)).attr("dx", this.dxForY2AxisLabel.bind(this)).attr("dy", this.dyForY2AxisLabel.bind(this)).text(this.textForY2AxisLabel.bind(this));
	}, Axis.prototype.getPadding = function getPadding(padding, key, defaultValue, domainLength) {
		var p = typeof padding === "number" ? padding : padding[key];

		// assume padding is pixels if unit is not specified
		return (0, _util.isValue)(p) ? padding.unit === "ratio" ? padding[key] * domainLength : this.convertPixelsToAxisPadding(p, domainLength) : defaultValue;
	}, Axis.prototype.convertPixelsToAxisPadding = function convertPixelsToAxisPadding(pixels, domainLength) {
		var $$ = this.owner,
		    length = $$.config.axis_rotated ? $$.width : $$.height;


		return domainLength * (pixels / length);
	}, Axis.prototype.generateTickValues = function generateTickValues(values, tickCount, forTimeSeries) {
		var tickValues = values,
		    start = void 0,
		    end = void 0,
		    count = void 0,
		    interval = void 0,
		    i = void 0,
		    tickValue = void 0;


		if (tickCount) {
			var targetCount = (0, _util.isFunction)(tickCount) ? tickCount() : tickCount;

			// compute ticks according to tickCount
			if (targetCount === 1) tickValues = [values[0]];else if (targetCount === 2) tickValues = [values[0], values[values.length - 1]];else if (targetCount > 2) {

				for (count = targetCount - 2, start = values[0], end = values[values.length - 1], interval = (end - start) / (count + 1), tickValues = [start], i = 0; i < count; i++) tickValue = +start + interval * (i + 1), tickValues.push(forTimeSeries ? new Date(tickValue) : tickValue);
				tickValues.push(end);
			}
		}

		return forTimeSeries || (tickValues = tickValues.sort(function (a, b) {
			return a - b;
		})), tickValues;
	}, Axis.prototype.generateTransitions = function generateTransitions(duration) {
		var $$ = this.owner,
		    axes = $$.axes;


		return {
			axisX: duration ? axes.x.transition().duration(duration) : axes.x,
			axisY: duration ? axes.y.transition().duration(duration) : axes.y,
			axisY2: duration ? axes.y2.transition().duration(duration) : axes.y2,
			axisSubX: duration ? axes.subx.transition().duration(duration) : axes.subx
		};
	}, Axis.prototype.redraw = function redraw(transitions, isHidden) {
		var $$ = this.owner,
		    opacity = isHidden ? "0" : "1";
		$$.axes.x.style("opacity", opacity), $$.axes.y.style("opacity", opacity), $$.axes.y2.style("opacity", opacity), $$.axes.subx.style("opacity", opacity), transitions.axisX.call($$.xAxis), transitions.axisY.call($$.yAxis), transitions.axisY2.call($$.y2Axis), transitions.axisSubX.call($$.subXAxis);
	}, Axis;
}();

exports.default = Axis;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function () {

	function axisX(selection, x) {
		selection.attr("transform", function (d) {
			return "translate(" + Math.ceil(x(d) + tickOffset) + ", 0)";
		});
	}

	function axisY(selection, y) {
		selection.attr("transform", function (d) {
			return "translate(0," + Math.ceil(y(d)) + ")";
		});
	}

	function scaleExtent(domain) {
		var start = domain[0],
		    stop = domain[domain.length - 1];


		return start < stop ? [start, stop] : [stop, start];
	}

	function generateTicks(scale) {
		var ticks = [];

		if (scale.ticks) return scale.ticks.apply(scale, tickArguments ? Array.prototype.slice.call(tickArguments) : []).map(function (v) {
				return (
					// round the tick value if is number
					/(string|number)/.test(typeof v === "undefined" ? "undefined" : (0, _typeof3.default)(v)) && !isNaN(v) ? Math.round(v * 10) / 10 : v
				);
			});

		for (var domain = scale.domain(), i = Math.ceil(domain[0]); i < domain[1]; i++) ticks.push(i);

		return ticks.length > 0 && ticks[0] > 0 && ticks.unshift(ticks[0] - (ticks[1] - ticks[0])), ticks;
	}

	function copyScale() {
		var newScale = scale.copy();

		if (params.isCategory || !newScale.domain().length) {
			var domain = scale.domain();

			newScale.domain([domain[0], domain[1] - 1]);
		}

		return newScale;
	}

	function textFormatted(v) {
		var formatted = tickFormat ? tickFormat(v) : v;

		return typeof formatted === "undefined" ? "" : formatted;
	}

	function getSizeFor1Char(tick) {
		if (tickTextCharSize) return tickTextCharSize;
		var size = {
			h: 11.5,
			w: 5.5
		};

		return tick.select("text").text(textFormatted).each(function (d) {
			var box = this.getBoundingClientRect(),
			    text = textFormatted(d),
			    h = box.height,
			    w = text ? box.width / text.length : undefined;
			h && w && (size.h = h, size.w = w);
		}).text(""), tickTextCharSize = size, size;
	}

	function transitionise(selection) {
		return params.withoutTransition ? selection : selection.transition(transition);
	}

	function axis(g) {
		g.each(function () {

			// this should be called only when category axis
			function splitTickText(d, maxWidthValue) {

				function split(splitted, text) {
					spaceIndex = undefined;

					for (var i = 1; i < text.length; i++)

					// if text width gets over tick width, split by space index or crrent index
					if (text.charAt(i) === " " && (spaceIndex = i), subtext = text.substr(0, i + 1), textWidth = sizeFor1Char.w * subtext.length, maxWidth < textWidth) return split(splitted.concat(text.substr(0, spaceIndex || i)), text.slice(spaceIndex ? spaceIndex + 1 : i));

					return splitted.concat(text);
				}

				var tickText = textFormatted(d),
				    maxWidth = maxWidthValue,
				    subtext = void 0,
				    spaceIndex = void 0,
				    textWidth = void 0;
				return Object.prototype.toString.call(tickText) === "[object Array]" ? tickText : ((!maxWidth || maxWidth <= 0) && (maxWidth = isVertical ? 95 : params.isCategory ? Math.ceil(scale1(ticks[1]) - scale1(ticks[0])) - 12 : 110), split([], tickText + ""));
			}

			function tspanDy(d, i) {
				var dy = sizeFor1Char.h;

				return i === 0 && (dy = orient === "left" || orient === "right" ? -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3) : ".71em"), dy;
			}

			var g = (0, _d.select)(this);

			axis.g = g;


			var scale0 = this.__chart__ || scale,
			    scale1 = copyScale();
			this.__chart__ = scale1;


			// count of tick data in array
			var ticks = tickValues || generateTicks(scale1),
			    tick = g.selectAll(".tick").data(ticks, scale1),
			    tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", "1"),
			    tickExit = tick.exit().remove();

			// update selection


			// enter selection


			// MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
			tick = tickEnter.merge(tick);


			var tickUpdate = transitionise(tick).style("opacity", "1"),
			    tickTransform = void 0,
			    tickX = void 0,
			    tickY = void 0,
			    range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent((params.orgXScale || scale).range()),
			    path = g.selectAll(".domain").data([0]),
			    pathUpdate = path.enter().append("path").attr("class", "domain").merge(transitionise(path));

			// update selection - data join


			// enter + update selection
			tickEnter.append("line"), tickEnter.append("text");


			var lineEnter = tickEnter.select("line"),
			    lineUpdate = tickUpdate.select("line"),
			    textEnter = tickEnter.select("text"),
			    textUpdate = tickUpdate.select("text");
			params.isCategory ? (tickOffset = Math.ceil((scale1(1) - scale1(0)) / 2), tickX = tickCentered ? 0 : tickOffset, tickY = tickCentered ? tickOffset : 0) : (tickX = 0, tickOffset = tickX);


			var tspan = void 0,
			    sizeFor1Char = getSizeFor1Char(g.select(".tick")),
			    counts = [],
			    tickLength = Math.max(innerTickSize, 0) + tickPadding,
			    isVertical = orient === "left" || orient === "right",
			    text = tick.select("text");tspan = text.selectAll("tspan").data(function (d, i) {
				var splitted = void 0;

				return splitted = params.tickMultiline ? splitTickText(d, params.tickWidth) : (0, _util.isArray)(textFormatted(d)) ? textFormatted(d).concat() : [textFormatted(d)], counts[i] = splitted.length, splitted.map(function (s) {
					return {
						index: i,
						splitted: s
					};
				});
			}), tspan.exit().remove(), tspan = tspan.enter().append("tspan").merge(tspan).text(function (d) {
				return d.splitted;
			});


			var rotate = params.tickTextRotate;

			if (orient === "bottom" ? (tickTransform = axisX, lineEnter.attr("y2", innerTickSize), textEnter.attr("y", tickLength), lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", function (d) {
				var tickPosition = scale(d) + (tickCentered ? 0 : tickOffset);

				return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
			}), textUpdate.attr("x", 0).attr("y", function (r) {
				return r ? 11.5 - 2.5 * (r / 15) * (r > 0 ? 1 : -1) : tickLength;
			}(rotate)).style("text-anchor", function (r) {
				return r ? r > 0 ? "start" : "end" : "middle";
			}(rotate)).attr("transform", function (r) {
				return r ? "rotate(" + r + ")" : "";
			}(rotate)), tspan.attr("x", 0).attr("dy", tspanDy).attr("dx", function (r) {
				return r ? 8 * Math.sin(Math.PI * (r / 180)) : 0;
			}(rotate)), pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize)) : orient === "top" ? (tickTransform = axisX, lineEnter.attr("y2", -innerTickSize), textEnter.attr("y", -tickLength), lineUpdate.attr("x2", 0).attr("y2", -innerTickSize), textUpdate.attr("x", 0).attr("y", -tickLength), text.style("text-anchor", "middle"), tspan.attr("x", 0).attr("dy", "0em"), pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize)) : orient === "left" ? (tickTransform = axisY, lineEnter.attr("x2", -innerTickSize), textEnter.attr("x", -tickLength), lineUpdate.attr("x2", -innerTickSize).attr("y1", tickY).attr("y2", tickY), textUpdate.attr("x", -tickLength).attr("y", tickOffset), text.style("text-anchor", "end"), tspan.attr("x", -tickLength).attr("dy", tspanDy), pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize)) : orient === "right" ? (tickTransform = axisY, lineEnter.attr("x2", innerTickSize), textEnter.attr("x", tickLength), lineUpdate.attr("x2", innerTickSize).attr("y2", 0), textUpdate.attr("x", tickLength).attr("y", 0), text.style("text-anchor", "start"), tspan.attr("x", tickLength).attr("dy", tspanDy), pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize)) : void 0, scale1.bandwidth) {
				var x = scale1,
				    dx = x.bandwidth() / 2;
				scale0 = function scale0(d) {
					return x(d) + dx;
				}, scale1 = scale0;
			} else scale0.bandwidth ? scale0 = scale1 : tickExit.call(tickTransform, scale1);

			tickEnter.call(tickTransform, scale0), tickUpdate.call(tickTransform, scale1);
		});
	}

	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    scale = (0, _d.scaleLinear)(),
	    orient = "bottom",
	    innerTickSize = 6,
	    outerTickSize = params.withOuterTick ? 6 : 0,
	    tickPadding = 3,
	    tickValues = null,
	    tickFormat = void 0,
	    tickArguments = void 0,
	    tickOffset = 0,
	    tickCulling = !0,
	    tickCentered = void 0,
	    transition = void 0;


	return axis.scale = function (x) {
		return arguments.length ? (scale = x, axis) : scale;
	}, axis.orient = function (x) {
		return arguments.length ? (orient = x in {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		} ? x + "" : "bottom", axis) : orient;
	}, axis.tickFormat = function (format) {
		return arguments.length ? (tickFormat = format, axis) : tickFormat;
	}, axis.tickCentered = function (isCentered) {
		return arguments.length ? (tickCentered = isCentered, axis) : tickCentered;
	}, axis.tickOffset = function () {
		return tickOffset;
	}, axis.tickInterval = function () {
		var interval = void 0;

		if (params.isCategory) interval = tickOffset * 2;else {
			var length = axis.g.select("path.domain").node().getTotalLength() - outerTickSize * 2;

			interval = length / axis.g.selectAll("line").size();
		}

		return interval === Infinity ? 0 : interval;
	}, axis.ticks = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];

		return args.length ? (tickArguments = Array.prototype.slice.call(args), axis) : tickArguments;
	}, axis.tickCulling = function (culling) {
		return arguments.length ? (tickCulling = culling, axis) : tickCulling;
	}, axis.tickValues = function (x) {
		if (typeof x === "function") tickValues = function tickValues() {
				return x(scale.domain());
			};else {
			if (!arguments.length) return tickValues;

			tickValues = x;
		}

		return this;
	}, axis.setTransition = function (t) {
		return transition = t, this;
	}, axis;
};

var _d = __webpack_require__(2),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Features:
// 1. category axis
// 2. ceil values of translate/x/y to int for half pixel antialiasing
// 3. multiline tick text
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var tickTextCharSize = void 0;

module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.d3 = exports.bb = undefined;

var _d = __webpack_require__(2),
    d3 = _interopRequireWildcard(_d),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _Axis = __webpack_require__(7),
    _Axis2 = _interopRequireDefault(_Axis),
    _util = __webpack_require__(0),
    util = _interopRequireWildcard(_util);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) return obj; var newObj = {}; if (obj != null) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]); return newObj.default = obj, newObj; }

/**
 * @namespace bb
 * @version 1.1.0
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var bb = {
	/**
  * Version information
  * @property {String} version version
  * @example
  * 	bb.version;  // "1.0.0"
  * @memberof bb
  */
	version: "1.1.0",
	/**
  * generate charts
  * @param {Options} options chart options
  * @memberof bb
  * @return {Chart}
  * @see {@link Options} for different generation options
  * @see {@link Chart} for different methods API
  * @example
  *  <!-- chart holder -->
  * <div id="LineChart"></div>
  * @example
  *   // generate chart with options
  *  var chart = bb.generate({
  *      "bindto": "#LineChart"
  *      "data": {
  *          "columns": [
  *              ["data1", 30, 200, 100, 400, 150, 250],
  *              ["data2", 50, 20, 10, 40, 15, 25]
  *           ]
  *      }
  *  });
  *
  *  // call some API
  *  // ex) get the data of 'data1'
  *  chart.data("data1");
  */
	generate: function generate(config) {
		return new _Chart2.default(config);
	},

	chart: {
		fn: _Chart2.default.prototype,
		internal: {
			fn: _ChartInternal2.default.prototype,
			axis: {
				fn: _Axis2.default.prototype
			}
		}
	}
};

for (var p in util) /^__/.test(p) || (_ChartInternal2.default.prototype[p] = util[p]);

__webpack_require__(12), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42), __webpack_require__(43), __webpack_require__(44), __webpack_require__(45), __webpack_require__(46), __webpack_require__(47), __webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57), __webpack_require__(58), __webpack_require__(60), __webpack_require__(8), __webpack_require__(61);
exports.bb = bb;
exports.d3 = d3;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(undefined);
// imports


// module
exports.push([module.i, "/*-- Chart --*/\n.bb svg {\n  font: 10px sans-serif;\n  -webkit-tap-highlight-color: transparent; }\n\n.bb path, .bb line {\n  fill: none;\n  stroke: #000; }\n\n.bb text {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none; }\n\n.bb-legend-item-tile,\n.bb-xgrid-focus,\n.bb-ygrid,\n.bb-event-rect,\n.bb-bars path {\n  shape-rendering: crispEdges; }\n\n.bb-chart-arc path {\n  stroke: #fff; }\n\n.bb-chart-arc text {\n  fill: #fff;\n  font-size: 13px; }\n\n/*-- Axis --*/\n/*-- Grid --*/\n.bb-grid line {\n  stroke: #aaa; }\n\n.bb-grid text {\n  fill: #aaa; }\n\n.bb-xgrid, .bb-ygrid {\n  stroke-dasharray: 3 3; }\n\n/*-- Text on Chart --*/\n.bb-text.bb-empty {\n  fill: #808080;\n  font-size: 2em; }\n\n/*-- Line --*/\n.bb-line {\n  stroke-width: 1px; }\n\n/*-- Point --*/\n.bb-circle._expanded_ {\n  stroke-width: 1px;\n  stroke: white; }\n\n.bb-selected-circle {\n  fill: white;\n  stroke-width: 2px; }\n\n/*-- Bar --*/\n.bb-bar {\n  stroke-width: 0; }\n  .bb-bar._expanded_ {\n    fill-opacity: 0.75; }\n\n/*-- Focus --*/\n.bb-target.bb-focused {\n  opacity: 1; }\n\n.bb-target.bb-focused path.bb-line, .bb-target.bb-focused path.bb-step {\n  stroke-width: 2px; }\n\n.bb-target.bb-defocused {\n  opacity: 0.3 !important; }\n\n/*-- Region --*/\n.bb-region {\n  fill: steelblue;\n  fill-opacity: .1; }\n\n/*-- Brush --*/\n.bb-brush .extent {\n  fill-opacity: .1; }\n\n/*-- Select - Drag --*/\n/*-- Legend --*/\n.bb-legend-item {\n  font-size: 12px; }\n\n.bb-legend-item-hidden {\n  opacity: 0.15; }\n\n.bb-legend-background {\n  opacity: 0.75;\n  fill: white;\n  stroke: lightgray;\n  stroke-width: 1; }\n\n/*-- Title --*/\n.bb-title {\n  font: 14px sans-serif; }\n\n/*-- Tooltip --*/\n.bb-tooltip-container {\n  z-index: 10; }\n\n.bb-tooltip {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background-color: #fff;\n  empty-cells: show;\n  opacity: 0.9;\n  -webkit-box-shadow: 7px 7px 12px -9px #777777;\n  -moz-box-shadow: 7px 7px 12px -9px #777777;\n  box-shadow: 7px 7px 12px -9px #777777; }\n  .bb-tooltip tr {\n    border: 1px solid #CCC; }\n  .bb-tooltip th {\n    background-color: #aaa;\n    font-size: 14px;\n    padding: 2px 5px;\n    text-align: left;\n    color: #FFF; }\n  .bb-tooltip td {\n    font-size: 13px;\n    padding: 3px 6px;\n    background-color: #fff;\n    border-left: 1px dotted #999; }\n    .bb-tooltip td > span {\n      display: inline-block;\n      width: 10px;\n      height: 10px;\n      margin-right: 6px; }\n    .bb-tooltip td.value {\n      text-align: right; }\n\n/*-- Area --*/\n.bb-area {\n  stroke-width: 0;\n  opacity: 0.2; }\n\n/*-- Arc --*/\n.bb-chart-arcs-title {\n  dominant-baseline: middle;\n  font-size: 1.3em; }\n\n.bb-chart-arcs .bb-chart-arcs-background {\n  fill: #e0e0e0;\n  stroke: none; }\n\n.bb-chart-arcs .bb-chart-arcs-gauge-unit {\n  fill: #000;\n  font-size: 16px; }\n\n.bb-chart-arcs .bb-chart-arcs-gauge-max {\n  fill: #777; }\n\n.bb-chart-arcs .bb-chart-arcs-gauge-min {\n  fill: #777; }\n\n.bb-chart-arc .bb-gauge-value {\n  fill: #000; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _Options = __webpack_require__(13),
    _Options2 = _interopRequireDefault(_Options),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getOptions: function getOptions() {
		var config = new _Options2.default();

		return (0, _util.merge)(config.value, this.additionalConfig);
	},


	additionalConfig: {},

	loadConfig: function loadConfig(config) {

		function find() {
			var key = keys.shift();

			return key && target && (typeof target === "undefined" ? "undefined" : (0, _typeof3.default)(target)) === "object" && key in target ? (target = target[key], find()) : key ? undefined : target;
		}

		var thisConfig = this.config,
		    target = void 0,
		    keys = void 0,
		    read = void 0;
		Object.keys(thisConfig).forEach(function (key) {
			target = config, keys = key.split("_"), read = find(), (0, _util.isDefined)(read) && (thisConfig[key] = read);
		});
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(6),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
var Options = function Options() {
			(0, _classCallCheck3.default)(this, Options), this.value = {
						/**
       * bindto The CSS selector or the element which the chart will be set to. D3 selection object can be specified. If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).<br><br>
       * If this option is not specified, the chart will be generated but not be set. Instead, we can access the element by chart.element and set it by ourselves.<br>
       * - **NOTE:**
       *  > When chart is not binded, bb starts observing if chart.element is binded by MutationObserver.
       *  > In this case, polyfill is required in IE9 and IE10 becuase they do not support MutationObserver.
       *  > On the other hand, if chart always will be binded, polyfill will not be required because MutationObserver will never be called.
       * @name bindto
       * @memberof Options
       * @type {String}
       * @default #chart
       * @example
       * bindto: "#myContainer"
       *
       * // or element
       * bindto: document.getElementById("myContainer")
       *
       * // or D3 selection object
       * bindto: d3.select("#myContainer")
       */
						bindto: "#chart",

						/**
       * Set clip-path property of chart element
       * - **NOTE:**
       *  > When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
       *  > Is to make chart element positioned over axis element.
       * @name clipPath
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * clipPath: false
       */
						clipPath: !0,

						/**
       * Set svg element's class name
       * @name svg
       * @memberof Options
       * @type {Object}
       * @property {String} [svg.classname] class name for svg element
       * @example
       * svg: {
                *   classname: "test_class"
       * }
       */
						svg_classname: undefined,

						/**
       * The desired size of the chart element.
       * If value is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
       * @name size
       * @memberof Options
       * @type {Object}
       * @property {Number} [size.width] width of the chart element
       * @property {Number} [size.height] height of the chart element
       * @example
       * size: {
                *   width: 640,
                *   height: 480
       * }
       */
						size_width: undefined,
						size_height: undefined,

						/**
       * The padding of the chart element.
       * @name padding
       * @memberof Options
       * @type {Object}
       * @property {Number} [padding.top] padding on the top of chart
       * @property {Number} [padding.right] padding on the right of chart
       * @property {Number} [padding.bottom] padding on the bottom of chart
       * @property {Number} [padding.left] padding on the left of chart
       * @example
       * padding: {
                *   top: 20,
                *   right: 20,
                *   bottom: 20,
                *   left: 20
       * }
       */
						padding_left: undefined,
						padding_right: undefined,
						padding_top: undefined,
						padding_bottom: undefined,

						/**
       * Set chart resize options
       * @name resize
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
       * @example
       *  resize: {
       *      auto: false
       *  }
       */
						resize_auto: !0,

						/**
       * Set zoom options
       * @name zoom
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [zoom.enabled=false] Enable zooming.
       * @property {Boolean} [zoom.rescale=false] Enable to rescale after zooming.<br>
       *  If true set, y domain will be updated according to the zoomed region.
       * @property {Array} [zoom.extent=[1, 10]] Change zoom extent.
       * @property {Function} [zoom.onzoom=function(){}] Set callback that is called when the chart is zooming.<br>
       *  Specified function receives the zoomed domain.
       * @property {Function} [zoom.onzoomstart=function(){}] Set callback that is called when zooming starts.<br>
       *  Specified function receives the zoom event.
       * @property {Function} [zoom.onzoomend=function(){}] Set callback that is called when zooming ends.<br>
       *  Specified function receives the zoomed domain.
       * @example
       *  zoom: {
       *      enabled: true,
       *      rescale: true,
       *      extent: [1, 100]  // enable more zooming
       *      onzoom: function(domain) { ... },
       *      onzoomstart: function(event) { ... },
       *      onzoomend: function(domain) { ... }
       *  }
       */
						zoom_enabled: !1,
						zoom_extent: undefined,
						zoom_privileged: !1,
						zoom_rescale: !1,
						zoom_onzoom: function zoom_onzoom() {},
						zoom_onzoomstart: function zoom_onzoomstart() {},
						zoom_onzoomend: function zoom_onzoomend() {},
						zoom_x_min: undefined,
						zoom_x_max: undefined,

						/**
       * Interaction options
       * @name interaction
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [interaction.enabled=true] Indicate if the chart should have interactions.<br>
       *     If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
       * @property {Boolean} [interaction.brighten=true]
       * @property {Boolean} [interaction.inputType.mouse=true] enable or disable mouse interaction
       * @property {Boolean} [interaction.inputType.touch=true] enable or disable  touch interaction
       * @property {Boolean|Number} [interaction.inputType.touch.preventDefault=false] enable or disable to call event.preventDefault on touchstart & touchmove event. It's usually used to prevent document scrolling.
       * @example
       * interaction: {
                *    enabled: false,
                *    inputType: {
                *        mouse: true,
                *        touch: false
                *
                *        // or declare preventDefault explicitly.
                *        // In this case touch inputType is enabled by default
                *        touch: {
                *            preventDefault: true
                *
                *            // or threshold pixel value (pixel moved from touchstart to touchmove)
                *            preventDefault: 5
                *        }
                *    }
       * }
       */
						interaction_enabled: !0,
						interaction_brighten: !0,
						interaction_inputType_mouse: !0,
						interaction_inputType_touch: {},

						/**
       * Set a callback to execute when mouse/touch enters the chart.
       * @name onover
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onover: function() {
       *   ...
       * }
       */
						onover: function onover() {},

						/**
       * Set a callback to execute when mouse/touch leaves the chart.
       * @name onout
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onout: function() {
       *   ...
       * }
       */
						onout: function onout() {},

						/**
       * Set a callback to execute when user resizes the screen.
       * @name onresize
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onresize: function() {
       *   ...
       * }
       */
						onresize: function onresize() {},

						/**
       * SSet a callback to execute when screen resize finished.
       * @name onresized
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onresized: function() {
       *   ...
       * }
       */
						onresized: function onresized() {},

						/**
       * Set a callback to execute before the chart is initialized
       * @name onbeforeinit
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onbeforeinit: function() {
       *   ...
       * }
       */
						onbeforeinit: undefined,

						/**
       * Set a callback to execute when the chart is initialized.
       * @name oninit
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * oninit: function() {
       *   ...
       * }
       */
						oninit: function oninit() {},

						/**
       * Set a callback to execute after the chart is initialized
       * @name onafterinit
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onafterinit: function() {
       *   ...
       * }
       */
						onafterinit: undefined,

						/**
       * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
       * @name onrendered
       * @memberof Options
       * @type {Function}
       * @default function(){}
       * @example
       * onrendered: function() {
       *   ...
       * }
       */
						onrendered: function onrendered() {},

						/**
       * Set duration of transition (in milliseconds) for chart animation.<br><br>
       * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
       * @name transition
       * @memberof Options
       * @type {Object}
       * @property {Number} [transition.duration=350] duration in milliseconds
       * @example
       * transition: {
       *    duration: 500
       * }
       */
						transition_duration: 350,

						/**
       * Specify the key of x values in the data.<br><br>
       * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data on the key will be used for category names.
       * @name data:x
       * @memberof Options
       * @type {String}
       * @default undefined
       * @example
       * data: {
                *   x: "date"
       * }
       */
						data_x: undefined,

						/**
       * Specify the keys of the x values for each data.<br><br>
       * This option can be used if we want to show the data that has different x values.
       * @name data:xs
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
                *   xs: {
                *    data1: "x1",
                *    data2: "x2"
                *   }
       * }
       */
						data_xs: {},

						/**
       * Set a format to parse string specifed as x.
       * @name data:xFormat
       * @memberof Options
       * @type {String}
       * @default %Y-%m-%d
       * @example
       * data: {
                *   xFormat: "%Y-%m-%d %H:%M:%S"
       * }
       * @see [D3's time specifier](https://npm.runkit.com/d3-time-format)
       */
						data_xFormat: "%Y-%m-%d",

						/**
       * Set localtime format to parse x axis.
       * @name data:xLocaltime
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * data: {
                *   xLocaltime: false
       * }
       */
						data_xLocaltime: !0,

						/**
       * Sort on x axis.
       * @name data:xSort
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * data: {
                *   xSort: false
       * }
       */
						data_xSort: !0,
						data_idConverter: function data_idConverter(id) {
									return id;
						},

						/**
       * Set custom data name.
       * @name data:names
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
                *   names: {
                *     data1: "Data Name 1",
                *     data2: "Data Name 2"
                *   }
       * }
       */
						data_names: {},

						/**
       * Set custom data class.<br><br>
       * If this option is specified, the element g for the data has an additional class that has the prefix 'bb-target-' (eg. bb-target-additional-data1-class).
       * @name data:classes
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
                *   classes: {
                *     data1: "additional-data1-class",
                *     data2: "additional-data2-class"
                *   }
       * }
       */
						data_classes: {},

						/**
       * Set groups for the data for stacking.
       * @name data:groups
       * @memberof Options
       * @type {Array}
       * @default []
       * @example
       * data: {
                *   groups: [
                *     ["data1", "data2"],
                *     ["data3"]
                *   ]
       * }
       */
						data_groups: [],

						/**
       * Set y axis the data related to. y and y2 can be used.
       * @name data:axes
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
       *   axes: {
       *     data1: "y",
       *     data2: "y2"
       *   }
       * }
       */
						data_axes: {},

						/**
       * Set chart type at once.<br><br>
       * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.<br><br>
       * **Available Values:**
       * - line
       * - spline
       * - step
       * - area
       * - area-spline
       * - area-step
       * - bar
       * - scatter
       * - pie
       * - donut
       * - gauge
       * @name data:type
       * @memberof Options
       * @type {String}
       * @default line
       * @example
       * data: {
       *  type: "bar"
       * }
       */
						data_type: undefined,

						/**
       * Set chart type for each data.<br>
       * This setting overwrites data.type setting.
       * @name data:types
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
       *   types: {
       *     data1: "bar",
       *     data2: "spline"
       *   }
       * }
       */
						data_types: {},

						/**
       * Set labels options
       * @name data:labels
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [donut.labels=false] Show or hide labels on each data points
       * @property {Function} [donut.labels.format={}] Set formatter function for data labels.<br>
       * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:<br>
       *  - `v` is the value of the data point where the label is shown.
       *  - `id` is the id of the data where the label is shown.
       *  - `i` is the index of the data point where the label is shown.
       *  - `j` is the sub index of the data point where the label is shown.<br><br>
       * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
       * @property {Number} [donut.labels.position.x=0] x coordinate position, relative the original.
       * @property {NUmber} [donut.labels.position.y=0] y coordinate position, relative the original.
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
       *   labels: true,
       *
       *   // or set specific options
       *   labels: {
       *     format: function(v, id, i, j) { ... },
       *     // it's possible to set for each data
       *     //format: {
       *     //    data1: function(v, id, i, j) { ... },
       *     //    ...
       *     //},
       *     position: {
       *        x: -10,
       *        y: 10
       *     }
       *   }
       * }
       */
						data_labels: {},
						data_labels_position: {},

						/**
       *  This option changes the order of stacking data and pieces of pie/donut.
       *  - If `null` specified, it will be the order the data loaded.
       *  - If function specified, it will be used as [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)<br><br>
       *
       *  **Available Values:**
       *  - `desc`: In descending order
       *  - `asc`: In ascending order
       *  - `null`: It keeps the data load order
       *  - `function(data1, data2) { ... }`: Array.sort compareFunction
       * @name data:order
       * @memberof Options
       * @type {String|Function|null}
       * @default desc
       * @example
       * data: {
       *   // in descending order (default)
       *   order: "desc"
       *
       *   // in ascending order
       *   order: "asc"
       *
       *   // keeps data input order
       *   order: null
       *
       *   // specifying sort function
       *   order: function(a, b) {
       *       // param data passed format
       *       {
       *          id: "data1", id_org: "data1", values: [
       *              {x: 5, value: 250, id: "data1", index: 5, name: "data1"},
       *              ...
       *          ]
       *       }
       *   }
       * }
       */
						data_order: "desc",

						/**
       * Define regions for each data.<br><br>
       * The values must be an array for each data and it should include an object that has start, end, style. If start is not set, the start will be the first data point. If end is not set, the end will be the last data point.<br>
       * Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
       * @name data:regions
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
       *   regions: {
       *     data1: [{
       *         "start": 1,
       *         "end": 2,
       *         "style": "dashed"
       *     }, {
       *         "start":3
       *     }],
       *     ...
       *   }
       * }
       */
						data_regions: {},

						/**
       * Set color converter function.<br><br>
       * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc. And it must return a string that represents color (e.g. '#00ff00').
       * @name data:color
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       * data: {
       *   color: function(color, d) { ... }
       * }
       */
						data_color: undefined,

						/**
       * Set color for each data.
       * @name data:colors
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * data: {
       *   colors: {
       *     data1: "#ff0000",
       *     ...
       *   }
       * }
       */
						data_colors: {},

						/**
       * Hide each data when the chart appears.<br><br>
       * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
       * @name data:hide
       * @memberof Options
       * @type {Boolean|Array}
       * @default false
       * @example
       * data: {
       *   // all of data will be hidden
       *   hide: true
       *   // specified data will be hidden
       *   hide: ["data1", ...]
       * }
       */
						data_hide: !1,
						data_filter: undefined,

						/**
       * Set data selection enabled.<br><br>
       * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
       * @name data:selection:enabled
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * data: {
       *     selection: {
       *       enabled: true
       *   }
       * }
       */
						data_selection_enabled: !1,

						/**
       * Set grouped selection enabled.<br><br>
       * If this option set true, multiple data points that have same x value will be selected by one selection.
       * @name data:selection:grouped
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * data: {
       *     selection: {
       *       grouped: true
       *   }
       * }
       */
						data_selection_grouped: !1,

						/**
       * Set a callback for each data point to determine if it's selectable or not.<br><br>
       * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
       * @name data:selection:isselectable
       * @memberof Options
       * @type {Function}
       * @default function() { return true; }
       * @example
       * data: {
       *     selection: {
       *       isselectable: function(d) { ... }
       *   }
       * }
       */
						data_selection_isselectable: function data_selection_isselectable() {
									return !0;
						},

						/**
       * Set multiple data points selection enabled.<br><br>
       * If this option set true, multile data points can have the selected state at the same time. If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
       * @name data:selection:multiple
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * data: {
       *     selection: {
       *       multiple: false
       *   }
       * }
       */
						data_selection_multiple: !0,

						/**
       * Enable to select data points by dragging.<br><br>
       * If this option set true, data points can be selected by dragging.
       * **NOTE:** If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
       * @name data:selection:draggable
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * data: {
       *     selection: {
       *       draggable: true
       *   }
       * }
       */
						data_selection_draggable: !1,

						/**
       * Set a callback for click event on each data point.<br><br>
       * This callback will be called when each data point clicked and will receive d and element as the arguments. d is the data clicked and element is the element clicked. In this callback, this will be the Chart object.
       * @name data:onclick
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onclick: function(d, element) { ... }
       * }
       */
						data_onclick: function data_onclick() {},

						/**
       * Set a callback for mouse/touch over event on each data point.<br><br>
       * This callback will be called when mouse cursor or via touch moves onto each data point and will receive d as the argument. d is the data where mouse cursor moves onto. In this callback, this will be the Chart object.
       * @name data:onover
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onover: function(d) { ... }
       * }
       */
						data_onover: function data_onover() {},

						/**
       * Set a callback for mouse/touch out event on each data point.<br><br>
       * This callback will be called when mouse cursor or via touch moves out each data point and will receive d as the argument. d is the data where mouse cursor moves out. In this callback, this will be the Chart object.
       * @name data:onout
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onout: function(d) { ... }
       * }
       */
						data_onout: function data_onout() {},

						/**
       * Set a callback for on data selection.
       * @name data:onselected
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onselected: function(d, element) {
       *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
       *        // element - <circle>
        *        ...
        *    }
       * }
       */
						data_onselected: function data_onselected() {},

						/**
       * Set a callback for on data un-selection.
       * @name data:onunselected
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       *     onunselected: function(d, element) {
       *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
       *        // element - <circle>
        *        ...
        *    }
       */
						data_onunselected: function data_onunselected() {},

						/**
       * Set a callback for minimum data
       * @name data:onmin
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       *     onmin: function(data) {
       *        // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
          *        ...
       *    }
       */
						data_onmin: undefined,

						/**
       * Set a callback for maximum data
       * @name data:onmax
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       *     onmax: function(data) {
       *        // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
          *        ...
       *    }
       */
						data_onmax: undefined,

						/**
       * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
       * @name data:url
       * @memberof Options
       * @type {String}
       * @default undefined
       * @example
       * data: {
       *     url: "/data/c3_test.csv"
       * }
       */
						data_url: undefined,
						data_headers: undefined,

						/**
       * Parse a JSON object for data. See also data.keys.
       * @name data:json
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @see data:keys
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
       *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
       *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
       *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
       *     ],
       *     keys: {
       *       // x: "name", // it's possible to specify 'x' when category axis
       *       value: ["upload", "download"]
       *     }
       * }
       */
						data_json: undefined,

						/**
       * Load data from a multidimensional array, with the first element containing the data names, the following containing related data in that order.
       * @name data:rows
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @example
       * data: {
       *   rows: [
       *     ["A", "B", "C"],
       *     [90, 120, 300],
       *     [40, 160, 240],
       *     [50, 200, 290],
       *     [120, 160, 230],
       *     [80, 130, 300],
       *     [90, 220, 320]
       *   ]
       * }
       */
						data_rows: undefined,

						/**
       * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
       * @name data:columns
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @example
       * data: {
       *   columns: [
       *      ["data1", 30, 20, 50, 40, 60, 50],
       *      ["data2", 200, 130, 90, 240, 130, 220],
       *      ["data3", 300, 200, 160, 400, 250, 250]
       *   ]
       * }
       */
						data_columns: undefined,

						/**
       * Used if loading JSON via data.url.
       * @name data:mimeType
       * @memberof Options
       * @type {String}
       * @default undefined
       * @example
       * data: {
       *    {
       *       mimeType: "json"
       *    }
       * }
       */
						data_mimeType: undefined,

						/**
       * Choose which JSON object keys correspond to desired data.
       * @name data:keys
       * @memberof Options
       * @type {String}
       * @default undefined
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
       *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
       *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
       *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
       *     ],
       *     keys: {
       *       // x: "name", // it's possible to specify 'x' when category axis
       *       value: ["upload", "download"]
       *     }
       * }
       */
						data_keys: undefined,

						/**
       * Set text displayed when empty data.
       * @name data:empty:label:text
       * @memberof Options
       * @type {String}
       * @default ""
       * @example
       * data: {
       *   empty: {
       *     label: {
       *       text: "No Data"
       *     }
       *   }
       * }
       */
						data_empty_label_text: "",

						/**
       * Set subchart options
       * @name subchart
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
       * @property {Boolean} [subchart.size.height] Change the height of the subchart.
       * @property {Boolean} [subchart.onbrush] Set callback for brush event.<br>
       *  Specified function receives the current zoomed x domain.
       * @example
       *  subchart: {
       *      show: true,
       *      size: {
       *          height: 20
       *      },
       *      onbrush: function(domain) { ... }
       *  }
       */
						subchart_show: !1,
						subchart_size_height: 60,
						subchart_axis_x_show: !0,
						subchart_onbrush: function subchart_onbrush() {},

						/**
       * Set color of the data values
       * @name color
       * @memberof Options
       * @type {Object}
       * @property {Array} [color.pattern] custom color pattern
       * @property {Object} [color.threshold] color threshold
       * @property {String} [color.threshold.unit] unit
       * @property {Array} [color.threshold.value] value
       * @property {Array} [color.threshold.max=100] max value
       * @example
       *  color: {
       *      pattern: ["#1f77b4", "#aec7e8", ...]
       *  }
       */
						color_pattern: [],
						color_threshold: {},

						/**
       * Legend options
       * @name legend
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [legend.show=true] Show or hide legend.
       * @property {Boolean} [legend.hide=false] Hide legend
       *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
       * @property {String|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
       * @property {String|Function} [legend.contents.template=undefined] Set item's template.<br>
       *      If set string value, within template the 'color' and 'title' can be replaced using template-like syntax string:
       *      - {=COLOR}: data color value
       *      - {=TITLE}: data title value
       * @property {String} [legend.position=bottom] Change the position of legend.<br>
       *  Available values are: `bottom`, `right` and `inset` are supported.
       * @property {Object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
       *      This option accepts object that has the keys anchor, x, y and step.
       *      anchor decides the position of the legend. These anchors are available:
       *      - top-left
       *      - top-right
       *      - bottom-left
       *      - bottom-right
       *  x and y set the position of the legend based on the anchor.<br>
       *  step defines the max step the lagend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
       * @property {Boolean} [legend.equally=false] Set to all items have same width size.
       * @property {Boolean} [legend.padding=0] Set padding value
       * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
       * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
       * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
       * @property {Number} [legend.item.tile.width=10] Set width of item tile element
       * @property {Number} [legend.item.tile.height=10] Set height of item tile element
       * @example
       *  legend: {
       *      show: true,
       *      hide: true,
       *      //or hide: "data1"
                *      //or hide: ["data1", "data2"]
       *      contents: {
       *          bindto: "#legend",   // <ul id='legend'></ul>
       *
       *          // will be as: <li style='background-color:#1f77b4'>data1</li>
       *          template: "<li style='background-color:{=COLOR}'>{=TITLE}</li>"
       *
       *          // or using function
       *          template: function(title, color) {
       *               // if you want omit some legend, return falsy value
       *               if (title !== "data1") {
       *                    return "<li style='background-color:"+ color +">"+ title +"</li>";
       *               }
       *          }
       *      },
                *      position: "bottom",  // bottom, right, inset
       *      inset: {
       *          anchor: "top-right"  // top-left, top-right, bottom-left, bottom-right
       *          x: 20,
       *          y: 10,
       *          step: 2
       *      },
                *      equally: false,
                *      padding: 10,
                *      item: {
       *          onclick: function(id) { ... },
       *          onover: function(id) { ... },
       *          onout: function(id) { ... },
       *
       *          // set tile's size
       *          tile: {
       *              width: 20,
       *              height: 15
       *          }
       *      }
       *  }
       */
						legend_show: !0,
						legend_hide: !1,
						legend_contents_bindto: undefined,
						legend_contents_template: undefined,
						legend_position: "bottom",
						legend_inset_anchor: "top-left",
						legend_inset_x: 10,
						legend_inset_y: 0,
						legend_inset_step: undefined,
						legend_item_onclick: undefined,
						legend_item_onover: undefined,
						legend_item_onout: undefined,
						legend_equally: !1,
						legend_padding: 0,
						legend_item_tile_width: 10,
						legend_item_tile_height: 10,

						/**
       * Switch x and y axis position.
       * @name axis:rotated
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * axis: {
       *   rotated: true
       * }
       */
						axis_rotated: !1,

						/**
       * Show or hide x axis.
       * @name axis:x:show
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   x: {
       *     show: false
       *   }
       * }
       */
						axis_x_show: !0,

						/**
       * Set type of x axis.<br><br>
       * **Available Values:**
       * - timeseries
       * - category
       * - indexed
       * @name axis:x:type
       * @memberof Options
       * @type {String}
       * @default indexed
       * @example
       * axis: {
       *   x: {
       *     type: "timeseries"
       *   }
       * }
       */
						axis_x_type: "indexed",

						/**
       * Set how to treat the timezone of x values.<br>
       * If true, treat x value as localtime. If false, convert to UTC internally.
       * @name axis:x:localtime
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   x: {
       *     localtime: false
       *   }
       * }
       */
						axis_x_localtime: !0,

						/**
       * Set category names on category axis.
       * This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
       * @name axis:x:categories
       * @memberof Options
       * @type {Array}
       * @default []
       * @example
       * axis: {
       *   x: {
       *     categories: ["Category 1", "Category 2", ...]
       *   }
       * }
       */
						axis_x_categories: [],

						/**
       * Centerise ticks on category axis.
       * @name axis:x:tick:centered
       * @memberof Options
       * @type {Array}
       * @default false
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       centered: true
       *     }
       *   }
       * }
       */
						axis_x_tick_centered: !1,

						/**
       * A function to format tick value. Format string is also available for timeseries data.
       * @name axis:x:tick:format
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       format: function(x) {
       *           return x.getFullYear();
       *       }
       *     }
       *   }
       * }
       */
						axis_x_tick_format: undefined,

						/**
       * Setting for culling ticks.<br><br>
       * If true is set, the ticks will be culled, then only limitted tick text will be shown. This option does not hide the tick lines. If false is set, all of ticks will be shown.<br><br>
       * We can change the number of ticks to be shown by axis.x.tick.culling.max.
       * @name axis:x:tick:culling
       * @memberof Options
       * @type {Function}
       * @default
       * - true for indexed axis and timeseries axis
       * - false for category axis
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       culling: false
       *     }
       *   }
       * }
       */
						axis_x_tick_culling: {},

						/**
       * The number of tick texts will be adjusted to less than this value.
       * @name axis:x:tick:culling:max
       * @memberof Options
       * @type {Number}
       * @default 10
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       culling: {
       *           max: 5
       *       }
       *     }
       *   }
       * }
       */
						axis_x_tick_culling_max: 10,

						/**
       * The number of x axis ticks to show.<br><br>
       * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will have rough second value).
       * @name axis:x:tick:count
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       count: 5
       *     }
       *   }
       * }
       */
						axis_x_tick_count: undefined,

						/**
       * Fit x axis ticks.<br><br>
       * If true set, the ticks will be positioned nicely. If false set, the ticks will be positioned according to x value of the data points.
       * @name axis:x:tick:fit
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       fit: false
       *     }
       *   }
       * }
       */
						axis_x_tick_fit: !0,

						/**
       * Set the x values of ticks manually.<br><br>
       * If this option is provided, the position of the ticks will be determined based on those values. This option works with timeseries data and the x values will be parsed accoding to the type of the value and data.xFormat option.
       * @name axis:x:tick:values
       * @memberof Options
       * @type {Array}
       * @default null
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       values: [1, 2, 4, 8, 16, 32, ...]
       *     }
       *   }
       * }
       */
						axis_x_tick_values: null,

						/**
       * Rotate x axis tick text.<br>
       * If you set negative value, it will rotate to opposite direction.
       * @name axis:x:tick:rotate
       * @memberof Options
       * @type {Number}
       * @default 0
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       rotate: 60
       *     }
       *   }
       * }
       */
						axis_x_tick_rotate: 0,

						/**
       * Show x axis outer tick.
       * @name axis:x:tick:outer
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       outer: false
       *     }
       *   }
       * }
       */
						axis_x_tick_outer: !0,

						/**
       * Set tick text to be multiline
       * @name axis:x:tick:multiline
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       multiline: false
       *     }
       *   }
       * }
       */
						axis_x_tick_multiline: !0,

						/**
       * Set tick width
       * @name axis:x:tick:width
       * @memberof Options
       * @type {Number}
       * @default null
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       width: 50
       *     }
       *   }
       * }
       */
						axis_x_tick_width: null,

						/**
       * Set max value of x axis range.
       * @name axis:x:max
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     max: 100
       *   }
       * }
       */
						axis_x_max: undefined,

						/**
       * Set min value of x axis range.
       * @name axis:x:min
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     min: -100
       *   }
       * }
       */
						axis_x_min: undefined,

						/**
       * Set padding for x axis.<br><br>
       * If this option is set, the range of x axis will increase/decrease according to the values.
       * If no padding is needed in the rage of x axis, 0 should be set.
       * - **NOTE:**
       *   The padding values aren't based on pixels. It differs according axis types<br>
       *   - **category:** The unit of tick value
       *     ex. the given value `1`, is same as the width of 1 tick width
       *   - **timeseries:** Numeric time value
       *     ex. the given value `1000*60*60*24`, which is numeric time equivalent of a day, is same as the width of 1 tick width
       * @name axis:x:padding
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * axis: {
       *   x: {
       *     padding: {
       *       // when axis type is 'category'
       *       left: 1,  // set left padding width of equivalent value of a tick's width
       *       right: 0.5  // set right padding width as half of equivalent value of tick's width
       *
       *       // when axis type is 'timeseries'
       *       left: 1000*60*60*24,  // set left padding width of equivalent value of a day tick's width
       *       right: 1000*60*60*12   // set right padding width as half of equivalent value of a day tick's width
       *     }
       *   }
       * }
       */
						axis_x_padding: {},

						/**
       * Set height of x axis.<br><br>
       * The height of x axis can be set manually by this option. If you need more space for x axis, please use this option for that. The unit is pixel.
       * @name axis:x:height
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     height: 20
       *   }
       * }
       */
						axis_x_height: undefined,

						/**
       * Set default extent for subchart and zoom. This can be an array or function that returns an array.
       * @name axis:x:extent
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     // [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner
       *     // https://github.com/d3/d3-brush/blob/master/src/brush.js#L521
       *     extent: [
       *         [0, 0], [200, 60]
       *     ]
       *   }
       * }
       */
						axis_x_extent: undefined,

						/**
       * Set label on x axis.<br><br>
       *  You can set x axis label and change its position by this option. string and object can be passed and we can change the poisiton by passing object that has position key. Available position differs according to the axis direction (vertical or horizontal). If string set, the position will be the default.
       *  - **If it's horizontal axis:**
       *    - inner-right [default]
       *    - inner-center
       *    - inner-left
       *    - outer-right
       *    - outer-center
       *    - outer-left
       *  - **If it's vertical axis:**
       *    - inner-top [default]
       *    - inner-middle
       *    - inner-bottom
       *    - outer-top
       *    - outer-middle
       *    - outer-bottom
       * @name axis:x:label
       * @memberof Options
       * @type {String|Object}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     label: "Your X Axis"
       *   }
       * }
       *
       * axis: {
       *   x: {
       *     label: {
       *        text: "Your X Axis",
       *        position: "outer-center"
       *     }
       *   }
       * }
       */
						axis_x_label: {},

						/**
       * Show or hide y axis.
       * @name axis:y:show
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   y: {
       *     show: false
       *   }
       * }
       */
						axis_y_show: !0,

						/**
       * Set type of y axis.<br><br>
       * **Available Values:**
       *   - timeseries
       *   - category
       *   - indexed
       * @name axis:y:type
       * @memberof Options
       * @type {String}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     type: "timeseries"
       *   }
       * }
       */
						axis_y_type: undefined,

						/**
       * Set max value of y axis.
       * - **NOTE:** Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
       * @name axis:y:max
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     max: 1000
       *   }
       * }
       */
						axis_y_max: undefined,

						/**
       * Set min value of y axis.
       * - **NOTE:**
       *   Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
       * @name axis:y:min
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     min: 1000
       *   }
       * }
       */
						axis_y_min: undefined,

						/**
       * Change the direction of y axis.<br><br>
       * If true set, the direction will be from the top to the bottom.
       * @name axis:y:inverted
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * axis: {
       *   y: {
       *     inverted: true
       *   }
       * }
       */
						axis_y_inverted: !1,

						/**
       * Set center value of y axis.
       * @name axis:y:center
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     center: 0
       *   }
       * }
       */
						axis_y_center: undefined,

						/**
       * Show y axis inside of the chart.
       * @name axis:y:inner
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * axis: {
       *   y: {
       *     inner: true
       *   }
       * }
       */
						axis_y_inner: !1,

						/**
       * Set label on y axis.<br><br>
       * You can set y axis label and change its position by this option. This option works in the same way as axis.x.label.
       * @name axis:y:label
       * @memberof Options
       * @type {String|Object}
       * @default {}
       * @example
       * axis: {
       *   y: {
       *     label: "Your Y Axis"
       *   }
       * }
       *
       * axis: {
       *   y: {
       *     label: {
       *        text: "Your Y Axis",
       *        position: "outer-middle"
       *     }
       *   }
       * }
       */
						axis_y_label: {},

						/**
       * Set formatter for y axis tick text.<br><br>
       * This option accepts d3.format object as well as a function you define.
       * @name axis:y:format
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       * axis: {
       *   x: {
       *     tick: {
       *       format: function(x) {
       *           return x.getFullYear();
       *       }
       *     }
       *   }
       * }
       */
						axis_y_tick_format: undefined,

						/**
       * Show y axis outer tick.
       * @name axis:y:tick:outer
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   y: {
       *     tick: {
       *       outer: false
       *     }
       *   }
       * }
       */
						axis_y_tick_outer: !0,

						/**
       * Set y axis tick values manually.
       * @name axis:y:tick:values
       * @memberof Options
       * @type {Array}
       * @default null
       * @example
       * axis: {
       *   y: {
       *     tick: {
       *       values: [100, 1000, 10000]
       *     }
       *   }
       * }
       */
						axis_y_tick_values: null,
						axis_y_tick_rotate: 0,

						/**
       * Set the number of y axis ticks.<br><br>
       * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
       * @name axis:y:tick:count
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     tick: {
       *       count: 5
       *     }
       *   }
       * }
       */
						axis_y_tick_count: undefined,

						/**
       * Set the number of y axis ticks.<br><br>
       * **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
       * @name axis:y:tick:time
       * @memberof Options
       * @private
       * @type {Object}
       * @property {Function} [time.value] D3's time interval function (https://github.com/d3/d3-time#intervals)
       * @example
       * axis: {
       *   y: {
       *     tick: {
       *       time: {
       *          // ticks at 15-minute intervals
       *          // https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
       *          value: d3.timeMinute.every(15)
       *       }
       *     }
       *   }
       * }
       */
						// @TODO: not fully implemented yet
						axis_y_tick_time_value: undefined,

						/**
       * Set padding for y axis.<br><br>
       * You can set padding for y axis to create more space on the edge of the axis.
       * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
       *
       * **NOTE:** For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
       * @name axis:y:padding
       * @memberof Options
       * @type {Object}
       * @default {}
       * @example
       * axis: {
       *   y: {
       *     padding: {
       *       top: 0,
       *       bottom: 0
       *     }
       *   }
       * }
       */
						axis_y_padding: {},

						/**
       * Set default range of y axis.<br><br>
       * This option set the default value for y axis when there is no data on init.
       * @name axis:y:default
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @example
       * axis: {
       *   y: {
       *     default: [0, 1000]
       *   }
       * }
       */
						axis_y_default: undefined,

						/**
       * Show or hide y2 axis.
       * @name axis:y2:show
       * @memberof Options
       * @type {Array}
       * @default false
       * @example
       * axis: {
       *   y2: {
       *     show: true
       *   }
       * }
       */
						axis_y2_show: !1,

						/**
       * Set max value of y2 axis.
       * @name axis:y2:max
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     max: 1000
       *   }
       * }
       */
						axis_y2_max: undefined,

						/**
       * Set min value of y2 axis.
       * @name axis:y2:min
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     min: -1000
       *   }
       * }
       */
						axis_y2_min: undefined,

						/**
       * Change the direction of y2 axis.<br><br>
       * If true set, the direction will be from the top to the bottom.
       * @name axis:y2:inverted
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * axis: {
       *   y2: {
       *     inverted: true
       *   }
       * }
       */
						axis_y2_inverted: !1,

						/**
       * Set center value of y2 axis.
       * @name axis:y2:center
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     center: 0
       *   }
       * }
       */
						axis_y2_center: undefined,

						/**
       * Show y2 axis inside of the chart.
       * @name axis:y2:inner
       * @memberof Options
       * @type {Boolean}
       * @default false
       * @example
       * axis: {
       *   y2: {
       *     inner: true
       *   }
       * }
       */
						axis_y2_inner: !1,

						/**
       * Set label on y2 axis.<br><br>
       * You can set y2 axis label and change its position by this option. This option works in the same way as axis.x.label.
       * @name axis:y2:label
       * @memberof Options
       * @type {String|Object}
       * @default {}
       * @example
       * axis: {
       *   y2: {
       *     label: "Your Y2 Axis"
       *   }
       * }
       *
       * axis: {
       *   y2: {
       *     label: {
       *        text: "Your Y2 Axis",
       *        position: "outer-middle"
       *     }
       *   }
       * }
       */
						axis_y2_label: {},

						/**
       * Set formatter for y2 axis tick text.<br><br>
       * This option works in the same way as axis.y.format.
       * @name axis:y2:tick:format
       * @memberof Options
       * @type {Function}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     tick: {
       *       format: d3.format("$,")
       *       //or format: function(d) { return "$" + d; }
       *     }
       *   }
       * }
       */
						axis_y2_tick_format: undefined,

						/**
       * Show or hide y2 axis outer tick.
       * @name axis:y2:tick:outer
       * @memberof Options
       * @type {Boolean}
       * @default true
       * @example
       * axis: {
       *   y2: {
       *     tick: {
       *       outer: false
       *     }
       *   }
       * }
       */
						axis_y2_tick_outer: !0,

						/**
       * Set y2 axis tick values manually.
       * @name axis:y2:tick:values
       * @memberof Options
       * @type {Array}
       * @default null
       * @example
       * axis: {
       *   y2: {
       *     tick: {
       *       values: [100, 1000, 10000]
       *     }
       *   }
       * }
       */
						axis_y2_tick_values: null,

						/**
       * Set the number of y2 axis ticks.
       * - **NOTE:** This works in the same way as axis.y.tick.count.
       * @name axis:y2:tick:count
       * @memberof Options
       * @type {Number}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     tick: {
       *       count: 5
       *     }
       *   }
       * }
       */
						axis_y2_tick_count: undefined,

						/**
       * Set the number of y2 axis ticks.
       * - **NOTE:** This works in the same way as axis.y.tick.count.
       * @name axis:y2:padding
       * @memberof Options
       * @type {Number}
       * @default {}
       * @example
       * axis: {
       *   y2: {
       *     padding: {
       *       top: 100,
       *       bottom: 100
       *     }
       *   }
       * }
       */
						axis_y2_padding: {},

						/**
       * Set default range of y2 axis.<br><br>
       * This option set the default value for y2 axis when there is no data on init.
       * @name axis:y2:default
       * @memberof Options
       * @type {Array}
       * @default undefined
       * @example
       * axis: {
       *   y2: {
       *     default: [0, 1000]
       *   }
       * }
       */
						axis_y2_default: undefined,

						/**
       * Set related options
       * @name grid
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [x.show=false] Show grids along x axis.
       * @property {Boolean} [x.lines=[]] Show additional grid lines along x axis.<br>
       *  This option accepts array including object that has value, text, position and class. text, position and class are optional. For position, start, middle and end (default) are available.
       *  If x axis is category axis, value can be category name. If x axis is timeseries axis, value can be date string, Date object and unixtime integer.
       * @property {Boolean} [y.show=false] Show grids along x axis.
       * @property {Boolean} [y.lines=[]] Show additional grid lines along y axis.<br>
       *  This option accepts array including object that has value, text, position and class.
       * @property {Boolean} [y.ticks=10]
       * @property {Boolean} [focus.show=true] Show grids when focus.
       * @property {Boolean} [lines.front=true]
       * @default undefined
       * @example
       * grid: {
       *   x: {
       *     show: true,
       *     lines: [
       *       {value: 2, text: "Label on 2"},
       *       {value: 5, text: "Label on 5", class: "label-5"}
       *       {value: 6, text: "Label on 6", position: "start"}
       *     ]
       *   },
       *   y: {
       *     show: true,
       *     lines: [
       *       {value: 100, text: "Label on 100"},
       *       {value: 200, text: "Label on 200", class: "label-200"}
       *       {value: 300, text: "Label on 300", position: 'middle'}
       *     ],
       *     ticks: 5
       *   },
       *   focus: {
       *      show: false
       *   },
       *   lines: {
       *      front: false
       *   }
       * }
       */
						grid_x_show: !1,
						grid_x_type: "tick",
						grid_x_lines: [],
						grid_y_show: !1,
						grid_y_lines: [],
						grid_y_ticks: 10,
						grid_focus_show: !0,
						grid_lines_front: !0,

						/**
       * Set point options
       * @name point
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [point.show=true] Whether to show each point in line.
       * @property {Number} [point.r=2.5] The radius size of each point.
       * @property {Boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
       * @property {Boolean} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
       * @property {Number} [point.select.r=point.r*4] The radius size of each point on selected.
       * @example
       *  point: {
       *      show: false,
       *      r: 5,
       *      focus: {
       *          expand: {
       *              enabled: true,
       *              r: 1
       *          }
       *      },
       *      select: {
       *          r: 3
       *      }
       *  }
       */
						point_show: !0,
						point_r: 2.5,
						point_sensitivity: 10,
						point_focus_expand_enabled: !0,
						point_focus_expand_r: undefined,
						point_select_r: undefined,

						/**
       * Set line options
       * @name line
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
       *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
       * @property {Boolean} [line.step.type=step] Change step type for step chart.<br>
       * **Available values:**
       * - step
       * - step-before
       * - step-after
       * @example
       *  line: {
       *      connectNull: true,
       *      step: {
       *          type: "step-after"
       *      }
       *  }
       */
						line_connectNull: !1,
						line_step_type: "step",

						/**
       * Set bar options
       * @name bar
       * @memberof Options
       * @type {Object}
       * @property {Number} [bar.width] Change the width of bar chart.
       * @property {Number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
       * @property {Number} [bar.width.max]
       * @property {Boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
       * @example
       *  bar: {
       *      width: 10,
       *      // or
       *      width: {
       *          ratio: 0.2,
       *          max: 200
       *      },
       *      zerobased: false
       *  }
       */
						bar_width: undefined,
						bar_width_ratio: 0.6,
						bar_width_max: undefined,
						bar_zerobased: !0,

						/**
       * Set area options
       * @name area
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
       * @property {Boolean} [area.above=false]
       * @example
       *  area: {
       *      zerobased: false,
       *      above: true
       *  }
       */
						area_zerobased: !0,
						area_above: !1,

						/**
       * Set pie options
       * @name pie
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [pie.label.show=true] Show or hide label on each pie piece.
       * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
       * @property {Number} [pie.label.threshold=0.05] Set threshold to show/hide labels.
       * @property {Number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
       * @property {Boolean} [pie.expand=true] Enable or disable expanding pie pieces.
       * @property {Number} [pie.padAngle=0] Set padding between data.
       * @example
       *  pie: {
       *      label: {
       *          show: false,
       *          format: function(value, ratio, id) {
       *              return d3.format("$")(value);
       *          },
       *          threshold: 0.1,
       *
       *          // set ratio callback. Should return ratio value
       *          ratio: function(d, radius, h) {
       *          	...
       *          	return ratio;
       *          },
       *          // or set ratio number
       *          ratio: 0.5
       *      },
       *      expand: false,
       *      padAngle: 0.1
       *  }
       */
						pie_label_show: !0,
						pie_label_format: undefined,
						pie_label_threshold: 0.05,
						pie_label_ratio: undefined,
						pie_expand: {},
						pie_expand_duration: 50,
						pie_padAngle: 0,

						/**
       * Set gauge options
       * @name gauge
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
       * @property {Boolean} [gauge.label.show=true] Show or hide label on gauge.
       * @property {Function} [gauge.label.format] Set formatter for the label on gauge.
       * @property {Function} [gauge.label.extents] Set customized min/max label text.
       * @property {Boolean} [gauge.expand=true] Enable or disable expanding gauge.
       * @property {Number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
       * @property {Number} [gauge.min=0] Set min value of the gauge.
       * @property {Number} [gauge.max=100] Set max value of the gauge.
       * @property {Number} [gauge.startingAngle=-1 * Math.PI / 2]
       * @property {String} [gauge.units] Set units of the gauge.
       * @property {Number} [gauge.width] Set width of gauge chart.
       * @example
       *  gauge: {
       *      fullCircle: false,
       *      label: {
       *          show: false,
       *          format: function(value, ratio) {
       *              return value;
       *          },
       *          extents: function(value, isMax) {
      	 *              return (isMax ? "Max:" : "Min:") + value;
       *          }
       *      },
       *      expand: false,
       *
       *      // or set duration
       *      expand: {
       *          duration: 20
       *      },
       *      min: -100,
       *      max: 200,
       *      units: "%",
       *      width: 10
       *  }
       */
						gauge_fullCircle: !1,
						gauge_label_show: !0,
						gauge_label_format: undefined,
						gauge_min: 0,
						gauge_max: 100,
						gauge_startingAngle: -1 * Math.PI / 2,
						gauge_label_extents: undefined,
						gauge_units: undefined,
						gauge_width: undefined,
						gauge_expand: {},
						gauge_expand_duration: 50,

						/**
       * Set donut options
       * @name donut
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [donut.label.show=true] Show or hide label on each donut piece.
       * @property {Function} [donut.label.format] Set formatter for the label on each donut piece.
       * @property {Number} [donut.label.threshold=0.05] Set threshold to show/hide labels.
       * @property {Number|Function} [donut.label.ratio=undefined] Set ratio of labels position.
       * @property {Boolean} [donut.expand=true] Enable or disable expanding donut pieces.
       * @property {Number} [donut.width] Set width of donut chart.
       * @property {String} [donut.title=""] Set title of donut chart. Use `\n` character to enter line break.
       * @property {Number} [donut.padAngle=0] Set padding between data.
       * @example
       *  donut: {
       *      label: {
       *          show: false,
       *          format: function(value, ratio, id) {
       *              return d3.format("$")(value);
       *          },
       *          threshold: 0.1,
       *
       *          // set ratio callback. Should return ratio value
       *          ratio: function(d, radius, h) {
       *          	...
       *          	return ratio;
       *          },
       *          // or set ratio number
       *          ratio: 0.5
       *      },
       *      expand: false,
       *      width: 10,
       *      padAngle: 0.2,
       *      title: "Donut Title"
       *
       *      // title with line break
       *      title: "Title1\nTitle2"
       *  }
       */
						donut_label_show: !0,
						donut_label_format: undefined,
						donut_label_threshold: 0.05,
						donut_label_ratio: undefined,
						donut_width: undefined,
						donut_title: "",
						donut_expand: {},
						donut_expand_duration: 50,
						donut_padAngle: 0,

						/**
       * Set spline options
       * @name spline
       * @memberof Options
       * @type {Object}
       * @property {String} [spline.interpolation.type=cardinal]
       * @example
       *  spline: {
       *      interpolation: {
       *          type: "cardinal"
       *      }
       *  }
       */
						spline_interpolation_type: "cardinal",

						/**
       * Show rectangles inside the chart.<br><br>
       * This option accepts array including object that has axis, start, end and class. The keys start, end and class are optional.
       * axis must be x, y or y2. start and end should be the value where regions start and end. If not specified, the edge values will be used. If timeseries x axis, date string, Date object and unixtime integer can be used. If class is set, the region element will have it as class.
       * @name regions
       * @memberof Options
       * @type {Array}
       * @default []
       * @example
       *  regions: [
       *    {
       *	    axis: "x",
       *	    start: 1,
       *	    end: 4,
       *	    class: "region-1-4"
       *    }
       *  ]
       */
						regions: [],

						/**
       * Tooltip options
       * @name tooltip
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [tooltip.show=true] Show or hide tooltip.<br>
       * @property {Boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
       * @property {Function} [tooltip.format.title] Set format for the title of tooltip.<br>
       *  Specified function receives x of the data point to show.
       * @property {Function} [tooltip.format.name] Set format for the name of each data in tooltip.<br>
       *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
       * @property {Function} [tooltip.format.value] Set format for the value of each data in tooltip.<br>
       *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
       *  If undefined returned, the row of that value will be skipped.
       * @property {Function} [tooltip.position] Set custom position for the tooltip.<br>
       *  This option can be used to modify the tooltip position by returning object that has top and left.
       * @property {Function} [tooltip.contents] Set custom HTML for the tooltip.<br>
       *  Specified function receives data, defaultTitleFormat, defaultValueFormat and color of the data point to show. If tooltip.grouped is true, data includes multiple data points.
       * @property {String|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
       *  **Available Values:**
       *  - `desc`: In descending data value order
       *  - `asc`: In ascending data value order
       *  - `null`: It keeps the data display order
       *  - `function(data1, data2) { ... }`: [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
       * @example
       *  tooltip: {
       *      show: true,
       *      grouped: false,
       *      format: {
       *          title: function(x) { return "Data " + x; },
       *          name: function(name, ratio, id, index) { return name; },
       *          value: function(value, ratio, id, index) { return ratio; }
       *      },
       *      position: function(data, width, height, element) {
       *          return {top: 0, left: 0}
      		 *      },
      		 *      contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
      		 *          return ... // formatted html as you want
       		 *      },
       		 *
       		 *      // sort tooltip data value display in ascending order
       		 *      order: "asc",
       		 *
       *      // specifying sort function
       *      order: function(a, b) {
       *         // param data passed format
       *         {x: 5, value: 250, id: "data1", index: 5, name: "data1"}
       *           ...
       *      }
       *  }
       */
						tooltip_show: !0,
						tooltip_grouped: !0,
						tooltip_format_title: undefined,
						tooltip_format_name: undefined,
						tooltip_format_value: undefined,
						tooltip_position: undefined,
						tooltip_contents: function tooltip_contents(d, defaultTitleFormat, defaultValueFormat, color) {
									return this.getTooltipContent ? this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) : "";
						},
						tooltip_init_show: !1,
						tooltip_init_x: 0,
						tooltip_init_position: {
									top: "0px",
									left: "50px"
						},
						tooltip_onshow: function tooltip_onshow() {},
						tooltip_onhide: function tooltip_onhide() {},
						tooltip_order: null,

						/**
       * Set title options
       * @name title
       * @memberof Options
       * @type {Object}
       * @property {String} [title.text]
       * @property {Number} [title.padding.top=0]
       * @property {Number} [title.padding.right=0]
       * @property {Number} [title.padding.bottom=0]
       * @property {Number} [title.padding.left=0]
       * @property {String} [title.position=top-center]
       * @example
       *  title: {
       *      text: "Title Text",
       *      padding: {
       *          top: 10,
       *          right: 10,
       *          bottom: 10,
       *          left: 10
       *      },
       *      position: "top-center"
       *  }
       */
						title_text: undefined,
						title_padding: {
									top: 0,
									right: 0,
									bottom: 0,
									left: 0
						},
						title_position: "top-center"
			};
};

exports.default = Options;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getScale: function getScale(min, max, forTimeseries) {
		return (forTimeseries ? (0, _d.scaleTime)() : (0, _d.scaleLinear)()).range([min, max]);
	},
	getX: function getX(min, max, domain, offsetValue) {
		var $$ = this,
		    scale = $$.getScale(min, max, $$.isTimeSeries()),
		    _scale = domain ? scale.domain(domain) : scale,
		    key = void 0,
		    offset = void 0;

		// Define customized scale if categorized axis


		// define functions
		for (key in $$.isCategorized() ? (offset = offsetValue || function () {
			return 0;
		}, scale = function (d, raw) {
			var v = _scale(d) + offset(d);

			return raw ? v : Math.ceil(v);
		}) : scale = function (d, raw) {
			var v = _scale(d);

			return raw ? v : Math.ceil(v);
		}, _scale) scale[key] = _scale[key];

		return scale.orgDomain = function () {
			return _scale.domain();
		}, $$.isCategorized() && (scale.domain = function (domainValue) {
			var domain = domainValue;

			return arguments.length ? (_scale.domain(domain), scale) : (domain = this.orgDomain(), [domain[0], domain[1] + 1]);
		}), scale;
	},
	getY: function getY(min, max, domain) {
		var scale = this.getScale(min, max, this.isTimeSeriesY());

		return domain && scale.domain(domain), scale;
	},
	getYScale: function getYScale(id) {
		return this.axis.getId(id) === "y2" ? this.y2 : this.y;
	},
	getSubYScale: function getSubYScale(id) {
		return this.axis.getId(id) === "y2" ? this.subY2 : this.subY;
	},


	/**
  * Update scale
  * @private
  * @param {Boolean} withoutTransitionAtInit - param is given at the init rendering
  */
	updateScales: function updateScales(withoutTransitionAtInit) {
		var $$ = this,
		    config = $$.config,
		    forInit = !$$.x;


		// update edges
		$$.xMin = config.axis_rotated ? 1 : 0, $$.xMax = config.axis_rotated ? $$.height : $$.width, $$.yMin = config.axis_rotated ? 0 : $$.height, $$.yMax = config.axis_rotated ? $$.width : 1, $$.subXMin = $$.xMin, $$.subXMax = $$.xMax, $$.subYMin = config.axis_rotated ? 0 : $$.height2, $$.subYMax = config.axis_rotated ? $$.width2 : 1, $$.x = $$.getX($$.xMin, $$.xMax, forInit ? undefined : $$.x.orgDomain(), function () {
			return $$.xAxis.tickOffset();
		}), $$.y = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y_default : $$.y.domain()), $$.y2 = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y2_default : $$.y2.domain()), $$.subX = $$.getX($$.xMin, $$.xMax, $$.orgXDomain, function (d) {
			return d % 1 ? 0 : $$.subXAxis.tickOffset();
		}), $$.subY = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y_default : $$.subY.domain()), $$.subY2 = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y2_default : $$.subY2.domain()), $$.xAxisTickFormat = $$.axis.getXAxisTickFormat(), $$.xAxisTickValues = $$.axis.getXAxisTickValues(), $$.yAxisTickValues = $$.axis.getYAxisTickValues(), $$.y2AxisTickValues = $$.axis.getY2AxisTickValues(), $$.xAxis = $$.axis.getXAxis($$.x, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, config.axis_x_tick_outer, withoutTransitionAtInit), $$.subXAxis = $$.axis.getXAxis($$.subX, $$.subXOrient, $$.xAxisTickFormat, $$.xAxisTickValues, config.axis_x_tick_outer), $$.yAxis = $$.axis.getYAxis($$.y, $$.yOrient, config.axis_y_tick_format, $$.yAxisTickValues, config.axis_y_tick_outer), $$.y2Axis = $$.axis.getYAxis($$.y2, $$.y2Orient, config.axis_y2_tick_format, $$.y2AxisTickValues, config.axis_y2_tick_outer), $$.updateArc && $$.updateArc();
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// selection
(0, _util.extend)(_ChartInternal2.default.prototype, {
	getYDomainMin: function getYDomainMin(targets) {
		var $$ = this,
		    config = $$.config,
		    ids = $$.mapToIds(targets),
		    ys = $$.getValuesAsIdKeyed(targets),
		    j = void 0,
		    k = void 0,
		    baseId = void 0,
		    idsInGroup = void 0,
		    id = void 0,
		    hasNegativeValue = void 0;


		if (config.data_groups.length > 0) for (hasNegativeValue = $$.hasNegativeValueInTargets(targets), j = 0; j < config.data_groups.length; j++) if (idsInGroup = config.data_groups[j].filter(function (v) {
				return ids.indexOf(v) >= 0;
			}), idsInGroup.length !== 0)

				// Compute min
				for (baseId = idsInGroup[0], hasNegativeValue && ys[baseId] && ys[baseId].forEach(function (v, i) {
					ys[baseId][i] = v < 0 ? v : 0;
				}), k = 1; k < idsInGroup.length; k++) (id = idsInGroup[k], !!ys[id]) && ys[id].forEach(function (v, i) {
					$$.axis.getId(id) === $$.axis.getId(baseId) && ys[baseId] && !(hasNegativeValue && +v > 0) && (ys[baseId][i] += +v);
				});
		return (0, _d.min)(Object.keys(ys).map(function (key) {
			return (0, _d.min)(ys[key]);
		}));
	},
	getYDomainMax: function getYDomainMax(targets) {
		var $$ = this,
		    config = $$.config,
		    ids = $$.mapToIds(targets),
		    ys = $$.getValuesAsIdKeyed(targets),
		    j = void 0,
		    k = void 0,
		    baseId = void 0,
		    idsInGroup = void 0,
		    id = void 0,
		    hasPositiveValue = void 0;


		if (config.data_groups.length > 0) for (hasPositiveValue = $$.hasPositiveValueInTargets(targets), j = 0; j < config.data_groups.length; j++) if (idsInGroup = config.data_groups[j].filter(function (v) {
				return ids.indexOf(v) >= 0;
			}), idsInGroup.length !== 0)
				// Compute max
				for (baseId = idsInGroup[0], hasPositiveValue && ys[baseId] && ys[baseId].forEach(function (v, i) {
					ys[baseId][i] = v > 0 ? v : 0;
				}), k = 1; k < idsInGroup.length; k++) (id = idsInGroup[k], !!ys[id]) && ys[id].forEach(function (v, i) {
					$$.axis.getId(id) === $$.axis.getId(baseId) && ys[baseId] && !(hasPositiveValue && +v < 0) && (ys[baseId][i] += +v);
				});
		return (0, _d.max)(Object.keys(ys).map(function (key) {
			return (0, _d.max)(ys[key]);
		}));
	},
	getYDomain: function getYDomain(targets, axisId, xDomain) {
		var $$ = this,
		    config = $$.config,
		    targetsByAxisId = targets.filter(function (t) {
			return $$.axis.getId(t.id) === axisId;
		}),
		    yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId,
		    yMin = axisId === "y2" ? config.axis_y2_min : config.axis_y_min,
		    yMax = axisId === "y2" ? config.axis_y2_max : config.axis_y_max,
		    yDomainMin = $$.getYDomainMin(yTargets),
		    yDomainMax = $$.getYDomainMax(yTargets),
		    center = axisId === "y2" ? config.axis_y2_center : config.axis_y_center,
		    isZeroBased = $$.hasType("bar", yTargets) && config.bar_zerobased || $$.hasType("area", yTargets) && config.area_zerobased,
		    isInverted = axisId === "y2" ? config.axis_y2_inverted : config.axis_y_inverted,
		    showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated,
		    showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated,
		    lengths = void 0;

		// MEMO: avoid inverting domain unexpectedly


		if (yDomainMin = (0, _util.isValue)(yMin) ? yMin : (0, _util.isValue)(yMax) ? yDomainMin < yMax ? yDomainMin : yMax - 10 : yDomainMin, yDomainMax = (0, _util.isValue)(yMax) ? yMax : (0, _util.isValue)(yMin) ? yMin < yDomainMax ? yDomainMax : yMin + 10 : yDomainMax, yTargets.length === 0) // use current domain if target of axisId is none
			return axisId === "y2" ? $$.y2.domain() : $$.y.domain();

		isNaN(yDomainMin) && (yDomainMin = 0), isNaN(yDomainMax) && (yDomainMax = yDomainMin), yDomainMin === yDomainMax && (yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0);


		var isAllPositive = yDomainMin >= 0 && yDomainMax >= 0,
		    isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;
		((0, _util.isValue)(yMin) && isAllPositive || (0, _util.isValue)(yMax) && isAllNegative) && (isZeroBased = !1), isZeroBased && (isAllPositive && (yDomainMin = 0), isAllNegative && (yDomainMax = 0));


		var domainLength = Math.abs(yDomainMax - yDomainMin),
		    paddingTop = domainLength * 0.1,
		    paddingBottom = domainLength * 0.1;


		if (typeof center !== "undefined") {
			var yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));

			yDomainMax = center + yDomainAbs, yDomainMin = center - yDomainAbs;
		}

		// add padding for data label
		if (showHorizontalDataLabel) {
			lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "width");

			var diff = (0, _util.diffDomain)($$.y.range()),
			    ratio = [lengths[0] / diff, lengths[1] / diff];
			paddingTop += domainLength * (ratio[1] / (1 - ratio[0] - ratio[1])), paddingBottom += domainLength * (ratio[0] / (1 - ratio[0] - ratio[1]));
		} else showVerticalDataLabel && (lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "height"), paddingTop += $$.axis.convertPixelsToAxisPadding(lengths[1], domainLength), paddingBottom += $$.axis.convertPixelsToAxisPadding(lengths[0], domainLength));

		axisId === "y" && (0, _util.notEmpty)(config.axis_y_padding) && (paddingTop = $$.axis.getPadding(config.axis_y_padding, "top", paddingTop, domainLength), paddingBottom = $$.axis.getPadding(config.axis_y_padding, "bottom", paddingBottom, domainLength)), axisId === "y2" && (0, _util.notEmpty)(config.axis_y2_padding) && (paddingTop = $$.axis.getPadding(config.axis_y2_padding, "top", paddingTop, domainLength), paddingBottom = $$.axis.getPadding(config.axis_y2_padding, "bottom", paddingBottom, domainLength)), isZeroBased && (isAllPositive && (paddingBottom = yDomainMin), isAllNegative && (paddingTop = -yDomainMax));


		var domain = [yDomainMin - paddingBottom, yDomainMax + paddingTop];

		return isInverted ? domain.reverse() : domain;
	},
	getXDomainMin: function getXDomainMin(targets) {
		var $$ = this,
		    config = $$.config;


		return (0, _util.isDefined)(config.axis_x_min) ? $$.isTimeSeries() ? this.parseDate(config.axis_x_min) : config.axis_x_min : (0, _d.min)(targets, function (t) {
			return (0, _d.min)(t.values, function (v) {
				return v.x;
			});
		});
	},
	getXDomainMax: function getXDomainMax(targets) {
		var $$ = this,
		    config = $$.config;


		return (0, _util.isDefined)(config.axis_x_max) ? $$.isTimeSeries() ? this.parseDate(config.axis_x_max) : config.axis_x_max : (0, _d.max)(targets, function (t) {
			return (0, _d.max)(t.values, function (v) {
				return v.x;
			});
		});
	},
	getXDomainPadding: function getXDomainPadding(domain) {
		var $$ = this,
		    config = $$.config,
		    diff = domain[1] - domain[0],
		    maxDataCount = void 0,
		    padding = void 0,
		    paddingLeft = void 0,
		    paddingRight = void 0;

		return $$.isCategorized() ? padding = 0 : $$.hasType("bar") ? (maxDataCount = $$.getMaxDataCount(), padding = maxDataCount > 1 ? diff / (maxDataCount - 1) / 2 : 0.5) : padding = diff * 0.01, (0, _typeof3.default)(config.axis_x_padding) === "object" && (0, _util.notEmpty)(config.axis_x_padding) ? (paddingLeft = (0, _util.isValue)(config.axis_x_padding.left) ? config.axis_x_padding.left : padding, paddingRight = (0, _util.isValue)(config.axis_x_padding.right) ? config.axis_x_padding.right : padding) : typeof config.axis_x_padding === "number" ? (paddingLeft = config.axis_x_padding, paddingRight = config.axis_x_padding) : (paddingLeft = padding, paddingRight = padding), { left: paddingLeft, right: paddingRight };
	},
	getXDomain: function getXDomain(targets) {
		var $$ = this,
		    xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)],
		    firstX = xDomain[0],
		    lastX = xDomain[1],
		    padding = $$.getXDomainPadding(xDomain),
		    min = 0,
		    max = 0;
		// show center of x domain if min and max are the same

		return firstX - lastX !== 0 || $$.isCategorized() || ($$.isTimeSeries() ? (firstX = new Date(firstX.getTime() * 0.5), lastX = new Date(lastX.getTime() * 1.5)) : (firstX = firstX === 0 ? 1 : firstX * 0.5, lastX = lastX === 0 ? -1 : lastX * 1.5)), (firstX || firstX === 0) && (min = $$.isTimeSeries() ? new Date(firstX.getTime() - padding.left) : firstX - padding.left), (lastX || lastX === 0) && (max = $$.isTimeSeries() ? new Date(lastX.getTime() + padding.right) : lastX + padding.right), [min, max];
	},
	updateXDomain: function updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
		var $$ = this,
		    config = $$.config;


		if (withUpdateOrgXDomain && ($$.x.domain(domain || (0, _d.extent)($$.getXDomain(targets))), $$.orgXDomain = $$.x.domain(), config.zoom_enabled && $$.zoom.updateScaleExtent(), $$.subX.domain($$.x.domain()), $$.brush && $$.brush.scale($$.subX)), withUpdateXDomain) {
			var domainValue = domain || !$$.brush || $$.brushEmpty() ? $$.orgXDomain : $$.getBrushSelection().map(function (v) {
				return $$.subX.invert(v);
			});

			$$.x.domain(domainValue), config.zoom_enabled && $$.zoom.updateScaleExtent();
		}

		// Trim domain when too big by zoom mousemove event


		return withTrim && $$.x.domain($$.trimXDomain($$.x.orgDomain())), $$.x.domain();
	},
	trimXDomain: function trimXDomain(domain) {
		var zoomDomain = this.getZoomDomain(),
		    min = zoomDomain[0],
		    max = zoomDomain[1];


		return domain[0] <= min && (domain[1] = +domain[1] + (min - domain[0]), domain[0] = min), max <= domain[1] && (domain[0] = +domain[0] - (domain[1] - max), domain[1] = max), domain;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _d = __webpack_require__(2),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	isX: function isX(key) {
		var $$ = this,
		    config = $$.config,
		    dataKey = config.data_x && key === config.data_x,
		    existValue = (0, _util.notEmpty)(config.data_xs) && (0, _util.hasValue)(config.data_xs, key);


		return dataKey || existValue;
	},
	isNotX: function isNotX(key) {
		return !this.isX(key);
	},
	getXKey: function getXKey(id) {
		var $$ = this,
		    config = $$.config;


		return config.data_x ? config.data_x : (0, _util.notEmpty)(config.data_xs) ? config.data_xs[id] : null;
	},
	getXValuesOfXKey: function getXValuesOfXKey(key, targets) {
		var $$ = this,
		    ids = targets && (0, _util.notEmpty)(targets) ? $$.mapToIds(targets) : [],
		    xValues = void 0;

		return ids.forEach(function (id) {
			$$.getXKey(id) === key && (xValues = $$.data.xs[id]);
		}), xValues;
	},
	getIndexByX: function getIndexByX(x) {
		var $$ = this,
		    data = $$.filterByX($$.data.targets, x);


		return data.length ? data[0].index : null;
	},
	getXValue: function getXValue(id, i) {
		var $$ = this;

		return id in $$.data.xs && $$.data.xs[id] && (0, _util.isValue)($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
	},
	getOtherTargetXs: function getOtherTargetXs() {
		var $$ = this,
		    idsForX = Object.keys($$.data.xs);


		return idsForX.length ? $$.data.xs[idsForX[0]] : null;
	},
	getOtherTargetX: function getOtherTargetX(index) {
		var xs = this.getOtherTargetXs();

		return xs && index < xs.length ? xs[index] : null;
	},
	addXs: function addXs(xs) {
		var $$ = this;

		Object.keys(xs).forEach(function (id) {
			$$.config.data_xs[id] = xs[id];
		});
	},
	hasMultipleX: function hasMultipleX(xs) {
		// https://github.com/d3/d3-collection
		return (0, _d.set)(Object.keys(xs).map(function (id) {
			return xs[id];
		})).size() > 1;
	},
	isMultipleX: function isMultipleX() {
		return (0, _util.notEmpty)(this.config.data_xs) || !this.config.data_xSort || this.hasType("scatter");
	},
	addName: function addName(data) {
		var $$ = this,
		    name = void 0;

		return data && (name = $$.config.data_names[data.id], data.name = name === undefined ? data.id : name), data;
	},
	getValueOnIndex: function getValueOnIndex(values, index) {
		var valueOnIndex = values.filter(function (v) {
			return v.index === index;
		});

		return valueOnIndex.length ? valueOnIndex[0] : null;
	},
	updateTargetX: function updateTargetX(targets, x) {
		var $$ = this;

		targets.forEach(function (t) {
			t.values.forEach(function (v, i) {
				v.x = $$.generateTargetX(x[i], t.id, i);
			}), $$.data.xs[t.id] = x;
		});
	},
	updateTargetXs: function updateTargetXs(targets, xs) {
		var $$ = this;

		targets.forEach(function (t) {
			xs[t.id] && $$.updateTargetX([t], xs[t.id]);
		});
	},
	generateTargetX: function generateTargetX(rawX, id, index) {
		var $$ = this,
		    x = void 0;

		return x = $$.isTimeSeries() ? rawX ? $$.parseDate(rawX) : $$.parseDate($$.getXValue(id, index)) : $$.isCustomX() && !$$.isCategorized() ? (0, _util.isValue)(rawX) ? +rawX : $$.getXValue(id, index) : index, x;
	},
	cloneTarget: function cloneTarget(target) {
		return {
			id: target.id,
			id_org: target.id_org,
			values: target.values.map(function (d) {
				return { x: d.x, value: d.value, id: d.id };
			})
		};
	},
	updateXs: function updateXs() {
		var $$ = this;

		$$.data.targets.length && ($$.xs = [], $$.data.targets[0].values.forEach(function (v) {
			$$.xs[v.index] = v.x;
		}));
	},
	getPrevX: function getPrevX(i) {
		var x = this.xs[i - 1];

		return typeof x === "undefined" ? null : x;
	},
	getNextX: function getNextX(i) {
		var x = this.xs[i + 1];

		return typeof x === "undefined" ? null : x;
	},


	/**
  * Get min/max value from the data
  * @private
  * @param {Array} data array data to be evaluated
  * @return {{min: {Number}, max: {Number}}}
  */
	getMinMaxValue: function getMinMaxValue(data) {
		var min = void 0,
		    max = void 0;


		return (data || this.data.targets.map(function (t) {
			return t.values;
		})).forEach(function (v) {
			min = (0, _d.min)([min, (0, _d.min)(v, function (t) {
				return t.value;
			})]), max = (0, _d.max)([max, (0, _d.max)(v, function (t) {
				return t.value;
			})]);
		}), { min: min, max: max };
	},


	/**
  * Get the min/max data
  * @private
  * @return {{min: Array, max: Array}}
  */
	getMinMaxData: function getMinMaxData() {
		var _this = this,
		    data = this.data.targets.map(function (t) {
			return t.values;
		}),
		    minMax = this.getMinMaxValue(data),
		    min = [],
		    max = [];

		return data.forEach(function (v) {
			var minData = _this.getFilteredDataByValue(v, minMax.min),
			    maxData = _this.getFilteredDataByValue(v, minMax.max);
			minData.length && (min = min.concat(minData)), maxData.length && (max = max.concat(maxData));
		}), { min: min, max: max };
	},


	/**
  * Get filtered data by value
  * @private
  * @param {Object} data
  * @param {Number} value
  * @return {Array} filtered array data
  */
	getFilteredDataByValue: function getFilteredDataByValue(data, value) {
		return data.filter(function (t) {
			return t.value === value;
		});
	},
	getMaxDataCount: function getMaxDataCount() {
		return (0, _d.max)(this.data.targets, function (t) {
			return t.values.length;
		});
	},
	getMaxDataCountTarget: function getMaxDataCountTarget(targets) {
		var length = targets.length,
		    max = 0,
		    maxTarget = void 0;

		return length > 1 ? targets.forEach(function (t) {
			t.values.length > max && (maxTarget = t, max = t.values.length);
		}) : maxTarget = length ? targets[0] : null, maxTarget;
	},
	mapToIds: function mapToIds(targets) {
		return targets.map(function (d) {
			return d.id;
		});
	},
	mapToTargetIds: function mapToTargetIds(ids) {
		var $$ = this;

		return ids ? (0, _util.isArray)(ids) ? ids.concat() : [ids] : $$.mapToIds($$.data.targets);
	},
	hasTarget: function hasTarget(targets, id) {
		var ids = this.mapToIds(targets),
		    i = void 0;


		for (i = 0; i < ids.length; i++) if (ids[i] === id) return !0;
		return !1;
	},
	isTargetToShow: function isTargetToShow(targetId) {
		return this.hiddenTargetIds.indexOf(targetId) < 0;
	},
	isLegendToShow: function isLegendToShow(targetId) {
		return this.hiddenLegendIds.indexOf(targetId) < 0;
	},
	filterTargetsToShow: function filterTargetsToShow(targets) {
		var $$ = this;

		return targets.filter(function (t) {
			return $$.isTargetToShow(t.id);
		});
	},
	mapTargetsToUniqueXs: function mapTargetsToUniqueXs(targets) {
		var $$ = this,
		    xs = (0, _d.set)((0, _d.merge)(targets.map(function (t) {
			return t.values.map(function (v) {
				return +v.x;
			});
		}))).values();

		return xs = $$.isTimeSeries() ? xs.map(function (x) {
			return new Date(+x);
		}) : xs.map(function (x) {
			return +x;
		}), xs.sort(function (a, b) {
			return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
		});
	},
	addHiddenTargetIds: function addHiddenTargetIds(targetIds) {
		this.hiddenTargetIds = this.hiddenTargetIds.concat(targetIds);
	},
	removeHiddenTargetIds: function removeHiddenTargetIds(targetIds) {
		this.hiddenTargetIds = this.hiddenTargetIds.filter(function (id) {
			return targetIds.indexOf(id) < 0;
		});
	},
	addHiddenLegendIds: function addHiddenLegendIds(targetIds) {
		this.hiddenLegendIds = this.hiddenLegendIds.concat(targetIds);
	},
	removeHiddenLegendIds: function removeHiddenLegendIds(targetIds) {
		this.hiddenLegendIds = this.hiddenLegendIds.filter(function (id) {
			return targetIds.indexOf(id) < 0;
		});
	},
	getValuesAsIdKeyed: function getValuesAsIdKeyed(targets) {
		var ys = {};

		return targets.forEach(function (t) {
			ys[t.id] = [], t.values.forEach(function (v) {
				ys[t.id].push(v.value);
			});
		}), ys;
	},
	checkValueInTargets: function checkValueInTargets(targets, checker) {
		var ids = Object.keys(targets),
		    i = void 0,
		    j = void 0,
		    values = void 0;


		for (i = 0; i < ids.length; i++) for (values = targets[ids[i]].values, j = 0; j < values.length; j++) if (checker(values[j].value)) return !0;
		return !1;
	},
	hasNegativeValueInTargets: function hasNegativeValueInTargets(targets) {
		return this.checkValueInTargets(targets, function (v) {
			return v < 0;
		});
	},
	hasPositiveValueInTargets: function hasPositiveValueInTargets(targets) {
		return this.checkValueInTargets(targets, function (v) {
			return v > 0;
		});
	},
	_checkOrder: function _checkOrder(type) {
		var config = this.config;

		return typeof config.data_order === "string" && config.data_order.toLowerCase() === type;
	},
	isOrderDesc: function isOrderDesc() {
		return this._checkOrder("desc");
	},
	isOrderAsc: function isOrderAsc() {
		return this._checkOrder("asc");
	},
	orderTargets: function orderTargets(targets) {
		var $$ = this,
		    config = $$.config,
		    orderAsc = $$.isOrderAsc(),
		    orderDesc = $$.isOrderDesc();
		// TODO: accept name array for order

		return orderAsc || orderDesc ? targets.sort(function (t1, t2) {
			var reducer = function (p, c) {
				return p + Math.abs(c.value);
			},
			    t1Sum = t1.values.reduce(reducer, 0),
			    t2Sum = t2.values.reduce(reducer, 0);


			return orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;
		}) : (0, _util.isFunction)(config.data_order) && targets.sort(config.data_order), targets;
	},
	filterByX: function filterByX(targets, x) {
		return (0, _d.merge)(targets.map(function (t) {
			return t.values;
		})).filter(function (v) {
			return v.x - x === 0;
		});
	},
	filterRemoveNull: function filterRemoveNull(data) {
		return data.filter(function (d) {
			return (0, _util.isValue)(d.value);
		});
	},
	filterByXDomain: function filterByXDomain(targets, xDomain) {
		return targets.map(function (t) {
			return {
				id: t.id,
				id_org: t.id_org,
				values: t.values.filter(function (v) {
					return xDomain[0] <= v.x && v.x <= xDomain[1];
				})
			};
		});
	},
	hasDataLabel: function hasDataLabel() {
		var dataLabels = this.config.data_labels,
		    type = typeof dataLabels === "undefined" ? "undefined" : (0, _typeof3.default)(dataLabels);


		return type === "boolean" && dataLabels || type === "object" && (0, _util.notEmpty)(dataLabels);
	},
	getDataLabelLength: function getDataLabelLength(min, max, key) {
		var $$ = this,
		    lengths = [0, 0];


		return $$.selectChart.select("svg").selectAll(".dummy").data([min, max]).enter().append("text").text(function (d) {
			return $$.dataLabelFormat(d.id)(d);
		}).each(function (d, i) {
			lengths[i] = this.getBoundingClientRect()[key] * 1.3;
		}).remove(), lengths;
	},
	isNoneArc: function isNoneArc(d) {
		return this.hasTarget(this.data.targets, d.id);
	},
	isArc: function isArc(d) {
		return "data" in d && this.hasTarget(this.data.targets, d.data.id);
	},
	findSameXOfValues: function findSameXOfValues(values, index) {
		var targetX = values[index].x,
		    sames = [],
		    i = void 0;


		for (i = index - 1; i >= 0 && !(targetX !== values[i].x); i--) sames.push(values[i]);
		for (i = index; i < values.length && !(targetX !== values[i].x); i++) sames.push(values[i]);
		return sames;
	},
	findClosestFromTargets: function findClosestFromTargets(targets, pos) {
		var $$ = this,
		    candidates = targets.map(function (target) {
			return $$.findClosest(target.values, pos);
		});
		// map to array of closest points of each target

		// decide closest point and return
		return $$.findClosest(candidates, pos);
	},
	findClosest: function findClosest(values, pos) {
		var $$ = this,
		    minDist = $$.config.point_sensitivity,
		    closest = void 0;

		// find mouseovering bar


		return values.filter(function (v) {
			return v && $$.isBarType(v.id);
		}).forEach(function (v) {
			var shape = $$.main.select().node("." + _classes2.default.bars + $$.getTargetSelectorSuffix(v.id) + "." + _classes2.default.bar + "-" + v.index);

			!closest && $$.isWithinBar(shape) && (closest = v);
		}), values.filter(function (v) {
			return v && !$$.isBarType(v.id);
		}).forEach(function (v) {
			var d = $$.dist(v, pos);

			d < minDist && (minDist = d, closest = v);
		}), closest;
	},
	dist: function dist(data, pos) {
		var $$ = this,
		    config = $$.config,
		    xIndex = config.axis_rotated ? 1 : 0,
		    yIndex = config.axis_rotated ? 0 : 1,
		    y = $$.circleY(data, data.index),
		    x = $$.x(data.x);


		return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
	},
	convertValuesToStep: function convertValuesToStep(values) {
		var converted = (0, _util.isArray)(values) ? values.concat() : [values],
		    i = void 0;


		if (!this.isCategorized()) return values;

		for (i = values.length + 1; i > 0; i--) converted[i] = converted[i - 1];

		return converted[0] = {
			x: converted[0].x - 1,
			value: converted[0].value,
			id: converted[0].id
		}, converted[values.length + 1] = {
			x: converted[values.length].x + 1,
			value: converted[values.length].value,
			id: converted[values.length].id
		}, converted;
	},
	updateDataAttributes: function updateDataAttributes(name, attrs) {
		var $$ = this,
		    config = $$.config,
		    current = config["data_" + name];
		return typeof attrs === "undefined" ? current : (Object.keys(attrs).forEach(function (id) {
			current[id] = attrs[id];
		}), $$.redraw({ withLegend: !0 }), current);
	}
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	convertUrlToData: function convertUrlToData(url) {
		var _this = this,
		    mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "csv",
		    headers = arguments[2],
		    keys = arguments[3],
		    done = arguments[4],
		    type = mimeType,
		    req = (0, _d.request)(url);

		if (headers) for (var _iterator = Object.keys(headers), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					if (_i = _iterator.next(), _i.done) break;
					_ref = _i.value;
				}

				var header = _ref;
				req.header(header, headers[header]);
			}

		req.get(function (error, data) {
			var d = void 0;

			if (!data) throw new Error(error.responseURL + " " + error.status + " (" + error.statusText + ")");

			var response = data.response || data.responseText;

			d = type === "json" ? _this.convertJsonToData(JSON.parse(response), keys) : type === "tsv" ? _this.convertTsvToData(response) : _this.convertCsvToData(response), done.call(_this, d);
		});
	},
	_convertCsvTsvToData: function _convertCsvTsvToData(parser, xsv) {
		var rows = parser.rows(xsv),
		    d = void 0;


		return rows.length === 1 ? (d = [{}], rows[0].forEach(function (id) {
			d[0][id] = null;
		})) : d = parser.parse(xsv), d;
	},
	convertCsvToData: function convertCsvToData(xsv) {
		return this._convertCsvTsvToData({
			rows: _d.csvParseRows,
			parse: _d.csvParse
		}, xsv);
	},
	convertTsvToData: function convertTsvToData(tsv) {
		return this._convertCsvTsvToData({
			rows: _d.tsvParseRows,
			parse: _d.tsvParse
		}, tsv);
	},
	convertJsonToData: function convertJsonToData(json, keys) {
		var _this2 = this,
		    newRows = [],
		    targetKeys = void 0,
		    data = void 0;

		return keys ? (keys.x ? (targetKeys = keys.value.concat(keys.x), this.config.data_x = keys.x) : targetKeys = keys.value, newRows.push(targetKeys), json.forEach(function (o) {

			for (var newRow = [], v = void 0, _iterator2 = targetKeys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					if (_i2 = _iterator2.next(), _i2.done) break;
					_ref2 = _i2.value;
				}

				var key = _ref2;
				v = _this2.findValueInJson(o, key), (0, _util.isUndefined)(v) && (v = null), newRow.push(v);
			}
			newRows.push(newRow);
		}), data = this.convertRowsToData(newRows)) : (Object.keys(json).forEach(function (key) {
			var tmp = json[key].concat();

			tmp.unshift(key), newRows.push(tmp);
		}), data = this.convertColumnsToData(newRows)), data;
	},
	findValueInJson: function findValueInJson(object, path) {
		if (object[path] !== undefined) return object[path];

		var convertedPath = path.replace(/\[(\w+)\]/g, ".$1"),
		    pathArray = convertedPath.replace(/^\./, "").split("."),
		    target = object; // convert indexes to properties (replace [] with .)
		// strip a leading dot


		for (var _iterator3 = pathArray, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
			var _ref3;

			if (_isArray3) {
				if (_i3 >= _iterator3.length) break;
				_ref3 = _iterator3[_i3++];
			} else {
				if (_i3 = _iterator3.next(), _i3.done) break;
				_ref3 = _i3.value;
			}

			var k = _ref3;

			if (k in target) target = target[k];else {
				target = undefined;

				break;
			}
		}
		return target;
	},
	convertRowsToData: function convertRowsToData(rows) {
		var keys = rows[0],
		    newRows = [],
		    newRow = {},
		    i = void 0,
		    j = void 0;


		for (i = 1; i < rows.length; i++) {
			for (newRow = {}, j = 0; j < rows[i].length; j++) {
				if ((0, _util.isUndefined)(rows[i][j])) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
				newRow[keys[j]] = rows[i][j];
			}
			newRows.push(newRow);
		}

		return newRows;
	},
	convertColumnsToData: function convertColumnsToData(columns) {
		var newRows = [],
		    i = void 0,
		    j = void 0,
		    key = void 0;


		for (i = 0; i < columns.length; i++) for (key = columns[i][0], j = 1; j < columns[i].length; j++) {
			if ((0, _util.isUndefined)(newRows[j - 1]) && (newRows[j - 1] = {}), (0, _util.isUndefined)(columns[i][j])) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
			newRows[j - 1][key] = columns[i][j];
		}
		return newRows;
	},
	convertDataToTargets: function convertDataToTargets(data, appendXs) {
		var _this3 = this,
		    $$ = this,
		    config = $$.config,
		    ids = (0, _d.keys)(data[0]).filter($$.isNotX, $$),
		    xs = (0, _d.keys)(data[0]).filter($$.isX, $$);

		ids.forEach(function (id) {
			var xKey = _this3.getXKey(id);

			_this3.isCustomX() || _this3.isTimeSeries() ? xs.indexOf(xKey) >= 0 ? _this3.data.xs[id] = (appendXs && $$.data.xs[id] ? $$.data.xs[id] : []).concat(data.map(function (d) {
				return d[xKey];
			}).filter(_util.isValue).map(function (rawX, i) {
				return $$.generateTargetX(rawX, id, i);
			})) : config.data_x ? _this3.data.xs[id] = _this3.getOtherTargetXs() : (0, _util.notEmpty)(config.data_xs) && ($$.data.xs[id] = $$.getXValuesOfXKey(xKey, $$.data.targets)) : $$.data.xs[id] = data.map(function (d, i) {
				return i;
			});
		}), ids.forEach(function (id) {
			if (!$$.data.xs[id]) throw new Error("x is not defined for id = \"" + id + "\".");
		});


		// convert to target
		var targets = ids.map(function (id, index) {
			var convertedId = config.data_idConverter(id);

			return {
				id: convertedId,
				id_org: id,
				values: data.map(function (d, i) {
					var xKey = $$.getXKey(id),
					    rawX = d[xKey],
					    value = d[id] === null || isNaN(d[id]) ? null : +d[id],
					    x = void 0;

					// use x as categories if custom x and categorized

					return $$.isCustomX() && $$.isCategorized() && index === 0 && !(0, _util.isUndefined)(rawX) ? (index === 0 && i === 0 && (config.axis_x_categories = []), x = config.axis_x_categories.indexOf(rawX), x === -1 && (x = config.axis_x_categories.length, config.axis_x_categories.push(rawX))) : x = $$.generateTargetX(rawX, id, i), ((0, _util.isUndefined)(d[id]) || $$.data.xs[id].length <= i) && (x = undefined), { x: x, value: value, id: convertedId };
				}).filter(function (v) {
					return (0, _util.isDefined)(v.x);
				})
			};
		});

		// finish targets


		return targets.forEach(function (t) {
			var i = void 0;

			// sort values by its x
			config.data_xSort && (t.values = t.values.sort(function (v1, v2) {
				var x1 = v1.x || v1.x === 0 ? v1.x : Infinity,
				    x2 = v2.x || v2.x === 0 ? v2.x : Infinity;


				return x1 - x2;
			})), i = 0, t.values.forEach(function (v) {
				v.index = i++;
			}), $$.data.xs[t.id].sort(function (v1, v2) {
				return v1 - v2;
			});
		}), $$.hasNegativeValue = $$.hasNegativeValueInTargets(targets), $$.hasPositiveValue = $$.hasPositiveValueInTargets(targets), config.data_type && $$.setTargetType($$.mapToIds(targets).filter(function (id) {
			return !(id in config.data_types);
		}), config.data_type), targets.forEach(function (d) {
			$$.addCache(d.id_org, d);
		}), targets;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	load: function load(rawTargets, args) {
		var $$ = this,
		    targets = rawTargets;
		targets && (args.filter && (targets = targets.filter(args.filter)), (args.type || args.types) && targets.forEach(function (t) {
			var type = args.types && args.types[t.id] ? args.types[t.id] : args.type;

			$$.setTargetType(t.id, type);
		}), $$.data.targets.forEach(function (d) {
			for (var i = 0; i < targets.length; i++) if (d.id === targets[i].id) {
				d.values = targets[i].values, targets.splice(i, 1);

				break;
			}
		}), $$.data.targets = $$.data.targets.concat(targets)), $$.updateTargets($$.data.targets), $$.redraw({ withUpdateOrgXDomain: !0, withUpdateXDomain: !0, withLegend: !0 }), args.done && args.done();
	},
	loadFromArgs: function loadFromArgs(args) {
		var $$ = this;

		args.data ? $$.load($$.convertDataToTargets(args.data), args) : args.url ? $$.convertUrlToData(args.url, args.mimeType, args.headers, args.keys, function (data) {
			$$.load($$.convertDataToTargets(data), args);
		}) : args.json ? $$.load($$.convertDataToTargets($$.convertJsonToData(args.json, args.keys)), args) : args.rows ? $$.load($$.convertDataToTargets($$.convertRowsToData(args.rows)), args) : args.columns ? $$.load($$.convertDataToTargets($$.convertColumnsToData(args.columns)), args) : $$.load(null, args);
	},
	unload: function unload(rawTargetIds, customDoneCb) {
		var $$ = this,
		    done = customDoneCb,
		    targetIds = rawTargetIds;


		// If no target, call done and return
		return done || (done = function () {}), targetIds = targetIds.filter(function (id) {
			return $$.hasTarget($$.data.targets, id);
		}), targetIds && targetIds.length !== 0 ? void ($$.svg.selectAll(targetIds.map(function (id) {
			return $$.selectorTarget(id);
		})).transition().style("opacity", "0").remove().call($$.endall, done), targetIds.forEach(function (id) {
			$$.withoutFadeIn[id] = !1, $$.legend && $$.legend.selectAll("." + _classes2.default.legendItem + $$.getTargetSelectorSuffix(id)).remove(), $$.data.targets = $$.data.targets.filter(function (t) {
				return t.id !== id;
			});
		})) : void done();
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Category Name
  * @private
  * @param {Number} index
  * @returns {String} gategory Name
  */
	categoryName: function categoryName(i) {
		var config = this.config;

		return i < config.axis_x_categories.length ? config.axis_x_categories[i] : i;
	}
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initialize the area that detects the event.
  * Add a container for the zone that detects the event.
  * @private
  */
	initEventRect: function initEventRect() {
		var $$ = this;

		$$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.eventRects).style("fill-opacity", "0");
	},


	/**
  * Redraws the area that detects the event.
  * @private
  */
	redrawEventRect: function redrawEventRect() {
		var $$ = this,
		    config = $$.config,
		    isMultipleX = $$.isMultipleX(),
		    eventRects = $$.main.select("." + _classes2.default.eventRects).style("cursor", config.zoom_enabled ? config.axis_rotated ? "ns-resize" : "ew-resize" : null).classed(_classes2.default.eventRectsMultiple, isMultipleX).classed(_classes2.default.eventRectsSingle, !isMultipleX),
		    eventRectUpdate = void 0,
		    maxDataCountTarget = void 0;

		// rects for mouseover


		// clear old rects


		if (eventRects.selectAll("." + _classes2.default.eventRect).remove(), $$.eventRect = eventRects.selectAll("." + _classes2.default.eventRect), isMultipleX ? (eventRectUpdate = $$.eventRect.data([0]), eventRectUpdate = $$.generateEventRectsForMultipleXs(eventRectUpdate.enter()).merge(eventRectUpdate), $$.updateEventRect(eventRectUpdate)) : (maxDataCountTarget = $$.getMaxDataCountTarget($$.data.targets), eventRects.datum(maxDataCountTarget ? maxDataCountTarget.values : []), $$.eventRect = eventRects.selectAll("." + _classes2.default.eventRect), eventRectUpdate = $$.eventRect.data(function (d) {
			return d;
		}), eventRectUpdate.exit().remove(), eventRectUpdate = $$.generateEventRectsForSingleX(eventRectUpdate.enter()).merge(eventRectUpdate), $$.updateEventRect(eventRectUpdate)), $$.inputType === "touch" && !$$.hasArcType()) {
			var getEventRect = function () {
				var touch = _d.event.changedTouches[0];

				return (0, _d.select)(document.elementFromPoint(touch.clientX, touch.clientY));
			},
			    getIndex = function (eventRect) {
				var index = eventRect && eventRect.attr("class") && eventRect.attr("class").replace(new RegExp("(" + _classes2.default.eventRect + "-?|s)", "g"), "") * 1;

				return (isNaN(index) || index === null) && (index = -1), index;
			},
			    selectRect = function (context) {
				if (isMultipleX) $$.selectRectForMultipleXs(context);else {
					var eventRect = getEventRect(),
					    index = getIndex(eventRect);
					index === -1 ? $$.unselectRect() : $$.selectRectForSingle(context, eventRect, index);
				}
			},
			    preventDefault = config.interaction_inputType_touch.preventDefault,
			    isPrevented = (0, _util.isBoolean)(preventDefault) && preventDefault || !1,
			    preventThreshold = !isNaN(preventDefault) && preventDefault || null,
			    startPx = void 0,
			    preventEvent = function (event) {
				var eventType = event.type,
				    touch = event.changedTouches[0],
				    currentXY = touch["client" + (config.axis_rotated ? "Y" : "X")];
				eventType === "touchstart" ? isPrevented ? event.preventDefault() : preventThreshold !== null && (startPx = currentXY) : eventType === "touchmove" && (isPrevented || startPx === !0 || preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold) && (startPx = !0, event.preventDefault());
			};

			// call event.prenvetDefault()
			// according 'interaction.inputType.touch.preventDefault' option
			$$.svg.on("touchstart touchmove", function () {
				var eventRect = getEventRect();

				if (!eventRect.empty() && eventRect.classed(_classes2.default.eventRect)) {
					if ($$.dragging || $$.flowing || $$.hasArcType()) return;

					preventEvent(_d.event), selectRect(this);
				} else $$.unselectRect();
			}).on("touchend", function () {
				var eventRect = getEventRect();

				if (!eventRect.empty() && eventRect.classed(_classes2.default.eventRect)) {
					if ($$.hasArcType() || !$$.toggleShape || $$.cancelClick) return void ($$.cancelClick && ($$.cancelClick = !1));

					// Call event handler
					var index = getIndex(eventRect);

					isMultipleX || index === -1 || $$.main.selectAll("." + _classes2.default.shape + "-" + index).each(function (d2) {
						return config.data_onout.call($$.api, d2);
					});
				}
			});
		}
	},


	/**
  * Updates the location and size of the eventRect.
  * @private
  * @param {Object} d3.select(CLASS.eventRects) object.
  */
	updateEventRect: function updateEventRect(eventRectUpdate) {
		var $$ = this,
		    config = $$.config,
		    xScale = $$.zoomScale || $$.x,
		    eventRectData = eventRectUpdate || $$.eventRect.data(),
		    x = void 0,
		    y = void 0,
		    w = void 0,
		    h = void 0; // set update selection if null


		if ($$.isMultipleX()) x = 0, y = 0, w = $$.width, h = $$.height;else {
			var rectW = void 0,
			    rectX = void 0;
			($$.isCustomX() || $$.isTimeSeries()) && !$$.isCategorized() ? ($$.updateXs(), rectW = function (d) {
				var prevX = $$.getPrevX(d.index),
				    nextX = $$.getNextX(d.index);


				// if there this is a single data point make the eventRect full width (or height)
				return prevX === null && nextX === null ? config.axis_rotated ? $$.height : $$.width : (prevX === null && (prevX = xScale.domain()[0]), nextX === null && (nextX = xScale.domain()[1]), Math.max(0, (xScale(nextX) - xScale(prevX)) / 2));
			}, rectX = function (d) {
				var nextX = $$.getNextX(d.index),
				    thisX = $$.data.xs[d.id][d.index],
				    prevX = $$.getPrevX(d.index);


				// if there this is a single data point position the eventRect at 0
				return prevX === null && nextX === null ? 0 : (prevX === null && (prevX = xScale.domain()[0]), (xScale(thisX) + xScale(prevX)) / 2);
			}) : (rectW = $$.getEventRectWidth(), rectX = function (d) {
				return xScale(d.x) - rectW / 2;
			}), x = config.axis_rotated ? 0 : rectX, y = config.axis_rotated ? rectX : 0, w = config.axis_rotated ? $$.width : rectW, h = config.axis_rotated ? rectW : $$.height;
		}

		eventRectData.attr("class", $$.classEvent.bind($$)).attr("x", x).attr("y", y).attr("width", w).attr("height", h);
	},
	selectRectForSingle: function selectRectForSingle(context, eventRect, index) {
		var $$ = this,
		    config = $$.config,
		    selectedData = $$.filterTargetsToShow($$.data.targets).map(function (t) {
			return $$.addName($$.getValueOnIndex(t.values, index));
		});
		// Show tooltip
		config.tooltip_grouped && ($$.showTooltip(selectedData, context), $$.showXGridFocus(selectedData), !config.data_selection_enabled || config.data_selection_grouped) || $$.main.selectAll("." + _classes2.default.shape + "-" + index).each(function () {
			(0, _d.select)(this).classed(_classes2.default.EXPANDED, !0), config.data_selection_enabled && eventRect.style("cursor", config.data_selection_grouped ? "pointer" : null), config.tooltip_grouped || ($$.hideXGridFocus(), $$.hideTooltip(), !config.data_selection_grouped && ($$.unexpandCircles(index), $$.unexpandBars(index)));
		}).filter(function (d) {
			return $$.isWithinShape(this, d);
		}).each(function (d) {
			config.data_selection_enabled && (config.data_selection_grouped || config.data_selection_isselectable(d)) && eventRect.style("cursor", "pointer"), config.tooltip_grouped || ($$.showTooltip([d], this), $$.showXGridFocus([d]), config.point_focus_expand_enabled && $$.expandCircles(index, d.id, !0), $$.expandBars(index, d.id, !0));
		});
	},
	selectRectForMultipleXs: function selectRectForMultipleXs(context) {
		var $$ = this,
		    config = $$.config,
		    targetsToShow = $$.filterTargetsToShow($$.data.targets);


		// do nothing when dragging
		if (!($$.dragging || $$.hasArcType(targetsToShow))) {

				var mouse = (0, _d.mouse)($$.main.select("." + _classes2.default.eventRects + " ." + _classes2.default.eventRect).node()),
				    closest = $$.findClosestFromTargets(targetsToShow, mouse),
				    sameXData = void 0;


				if ($$.mouseover && (!closest || closest.id !== $$.mouseover.id) && (config.data_onout.call($$.api, $$.mouseover), $$.mouseover = undefined), !closest) return void $$.unselectRect();

				sameXData = $$.isScatterType(closest) || !config.tooltip_grouped ? [closest] : $$.filterByX(targetsToShow, closest.x);


				// show tooltip when cursor is close to some point
				var selectedData = sameXData.map(function (d) {
					return $$.addName(d);
				});

				$$.showTooltip(selectedData, context), config.point_focus_expand_enabled && $$.expandCircles(closest.index, closest.id, !0), $$.expandBars(closest.index, closest.id, !0), $$.showXGridFocus(selectedData), ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && ($$.svg.select("" + _classes2.default.eventRect).style("cursor", "pointer"), !$$.mouseover && (config.data_onover.call($$.api, closest), $$.mouseover = closest));
			}
	},


	/**
  * Unselect EventRect.
  * @private
  */
	unselectRect: function unselectRect() {
		var $$ = this;

		$$.svg.select("." + _classes2.default.eventRect).style("cursor", null), $$.hideXGridFocus(), $$.hideTooltip(), $$.unexpandCircles(), $$.unexpandBars();
	},


	/**
  * Create eventRect for each data on the x-axis.
  * Register touch and drag events.
  * @private
  * @param {Object} d3.select(CLASS.eventRects) object.
  * @returns {Object} d3.select(CLASS.eventRects) object.
  */
	generateEventRectsForSingleX: function generateEventRectsForSingleX(eventRectEnter) {
		var $$ = this,
		    config = $$.config,
		    rect = eventRectEnter.append("rect").attr("class", $$.classEvent.bind($$)).style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null).on("click", function (d) {
			if ($$.hasArcType() || !$$.toggleShape || $$.cancelClick) return void ($$.cancelClick && ($$.cancelClick = !1));

			var index = d.index;

			$$.main.selectAll("." + _classes2.default.shape + "-" + index).each(function (d2) {
				(config.data_selection_grouped || $$.isWithinShape(this, d2)) && ($$.toggleShape(this, d2, index), $$.config.data_onclick.call($$.api, d2, this));
			});
		}).call(config.data_selection_draggable && $$.drag ? (0, _d.drag)().origin(Object).on("drag", function () {
			$$.drag((0, _d.mouse)(this));
		}).on("dragstart", function () {
			$$.dragstart((0, _d.mouse)(this));
		}).on("dragend", function () {
			$$.dragend();
		}) : function () {});


		return $$.inputType === "mouse" && rect.on("mouseover", function (d) {
			// do nothing while dragging/flowing
			if (!($$.dragging || $$.flowing || $$.hasArcType())) {

					var index = d.index;

					// Expand shapes for selection
					config.point_focus_expand_enabled && $$.expandCircles(index, null, !0), $$.expandBars(index, null, !0), index !== -1 && $$.main.selectAll("." + _classes2.default.shape + "-" + index).each(function (d2) {
						return config.data_onover.call($$.api, d2);
					});
				}
		}).on("mousemove", function (d) {
			// do nothing while dragging/flowing
			if (!($$.dragging || $$.flowing || $$.hasArcType())) {

					var index = d.index,
					    eventRect = $$.svg.select("." + _classes2.default.eventRect + "-" + index);
					$$.isStepType(d) && $$.config.line_step_type === "step-after" && (0, _d.mouse)(this)[0] < $$.x($$.getXValue(d.id, index)) && (index -= 1), index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, eventRect, index);
				}
		}).on("mouseout", function (d) {
			// chart is destroyed
			if ($$.config && !$$.hasArcType()) {

					var index = d.index;

					$$.unselectRect(), $$.main.selectAll("." + _classes2.default.shape + "-" + index).each(function (d2) {
						return config.data_onout.call($$.api, d2);
					});
				}
		}), rect;
	},


	/**
  * Create an eventRect,
  * Register touch and drag events.
  * @private
  * @param {Object} d3.select(CLASS.eventRects) object.
  * @returns {Object} d3.select(CLASS.eventRects) object.
  */
	generateEventRectsForMultipleXs: function generateEventRectsForMultipleXs(eventRectEnter) {
		var $$ = this,
		    config = $$.config,
		    rect = eventRectEnter.append("rect").attr("x", 0).attr("y", 0).attr("width", $$.width).attr("height", $$.height).attr("class", _classes2.default.eventRect).on("click", function () {
			var _this = this,
			    targetsToShow = $$.filterTargetsToShow($$.data.targets);

			// select if selection enabled
			if (!$$.hasArcType(targetsToShow)) {

					var mouse = (0, _d.mouse)(this),
					    closest = $$.findClosestFromTargets(targetsToShow, mouse);
					!closest || ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && $$.main.selectAll("." + _classes2.default.shapes + $$.getTargetSelectorSuffix(closest.id)).selectAll("." + _classes2.default.shape + "-" + closest.index).each(function () {
						(config.data_selection_grouped || $$.isWithinShape(_this, closest)) && ($$.toggleShape(_this, closest, closest.index), $$.config.data_onclick.call($$.api, closest, _this));
					});
				}
		}).call(config.data_selection_draggable && $$.drag ? (0, _d.drag)().origin(Object).on("drag", function () {
			$$.drag((0, _d.mouse)(this));
		}).on("dragstart", function () {
			$$.dragstart((0, _d.mouse)(this));
		}).on("dragend", function () {
			$$.dragend();
		}) : function () {});


		return $$.inputType === "mouse" && rect.on("mouseover", function () {
			$$.selectRectForMultipleXs(this);
		}).on("mouseout", function () {
			!$$.config || $$.hasArcType() || $$.unselectRect();
		}).on("mousemove", function () {
			$$.selectRectForMultipleXs(this);
		}), rect;
	},


	/**
  * Dispatch an event.
  * @private
  * @param {String} type event type
  * @param {Number} index Index of eventRect
  * @param {Object} mouse Object
  */
	dispatchEvent: function dispatchEvent(type, index, mouse) {
		var $$ = this,
		    selector = $$.isMultipleX() ? "." + _classes2.default.eventRect : _classes2.default.eventRect + "-" + index,
		    eventRect = $$.main.select(selector).node(),
		    box = eventRect.getBoundingClientRect(),
		    x = box.left + (mouse ? mouse[0] : 0),
		    y = box.top + (mouse ? mouse[1] : 0),
		    event = document.createEvent("MouseEvents").initMouseEvent(type, !0, !0, window, 0, x, y, x, y, !1, !1, !1, !1, 0, null);
		eventRect.dispatchEvent(event);
	}
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getCurrentWidth: function getCurrentWidth() {
		var $$ = this,
		    config = $$.config;


		return config.size_width ? config.size_width : $$.getParentWidth();
	},
	getCurrentHeight: function getCurrentHeight() {
		var $$ = this,
		    config = $$.config,
		    h = config.size_height ? config.size_height : $$.getParentHeight();


		return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
	},
	getCurrentPaddingTop: function getCurrentPaddingTop() {
		var $$ = this,
		    config = $$.config,
		    padding = (0, _util.isValue)(config.padding_top) ? config.padding_top : 0;


		return $$.title && $$.title.node() && (padding += $$.getTitlePadding()), padding;
	},
	getCurrentPaddingBottom: function getCurrentPaddingBottom() {
		var config = this.config;

		return (0, _util.isValue)(config.padding_bottom) ? config.padding_bottom : 0;
	},
	getCurrentPaddingLeft: function getCurrentPaddingLeft(withoutRecompute) {
		var $$ = this,
		    config = $$.config,
		    paddingLeft = void 0;


		return paddingLeft = (0, _util.isValue)(config.padding_left) ? config.padding_left : config.axis_rotated ? config.axis_x_show ? Math.max((0, _util.ceil10)($$.getAxisWidthByAxisId("x", withoutRecompute)), 40) : 1 : !config.axis_y_show || config.axis_y_inner ? $$.axis.getYAxisLabelPosition().isOuter ? 30 : 1 : (0, _util.ceil10)($$.getAxisWidthByAxisId("y", withoutRecompute)), paddingLeft;
	},
	getCurrentPaddingRight: function getCurrentPaddingRight() {
		var $$ = this,
		    config = $$.config,
		    legendWidthOnRight = $$.isLegendRight ? $$.getLegendWidth() + 20 : 0,
		    paddingRight = void 0;


		return paddingRight = (0, _util.isValue)(config.padding_right) ? config.padding_right + 1 : config.axis_rotated ? 10 + legendWidthOnRight : !config.axis_y2_show || config.axis_y2_inner ? 2 + legendWidthOnRight + ($$.axis.getY2AxisLabelPosition().isOuter ? 20 : 0) : (0, _util.ceil10)($$.getAxisWidthByAxisId("y2")) + legendWidthOnRight, paddingRight;
	},
	getParentRectValue: function getParentRectValue(key) {
		for (var parent = this.selectChart.node(), v = void 0; parent && parent.tagName !== "BODY";) {
			try {
				v = parent.getBoundingClientRect()[key];
			} catch (e) {
				key === "width" && (v = parent.offsetWidth);
			}

			if (v) break;

			parent = parent.parentNode;
		}

		return v;
	},
	getParentWidth: function getParentWidth() {
		return this.getParentRectValue("width");
	},
	getParentHeight: function getParentHeight() {
		var h = this.selectChart.style("height");

		return h.indexOf("px") > 0 ? +h.replace("px", "") : 0;
	},
	getSvgLeft: function getSvgLeft(withoutRecompute) {
		var $$ = this,
		    config = $$.config,
		    hasLeftAxisRect = config.axis_rotated || !config.axis_rotated && !config.axis_y_inner,
		    leftAxisClass = config.axis_rotated ? _classes2.default.axisX : _classes2.default.axisY,
		    leftAxis = $$.main.select("." + leftAxisClass).node(),
		    svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : { right: 0 },
		    chartRect = $$.selectChart.node().getBoundingClientRect(),
		    hasArc = $$.hasArcType(),
		    svgLeft = svgRect.right - chartRect.left - (hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));


		return svgLeft > 0 ? svgLeft : 0;
	},
	getAxisWidthByAxisId: function getAxisWidthByAxisId(id, withoutRecompute) {
		var $$ = this,
		    position = $$.axis.getLabelPositionById(id);


		return $$.axis.getMaxTickWidth(id, withoutRecompute) + (position.isInner ? 20 : 40);
	},
	getHorizontalAxisHeight: function getHorizontalAxisHeight(axisId) {
		var $$ = this,
		    config = $$.config,
		    h = 30;


		// Calculate x axis height when tick rotated
		return axisId !== "x" || config.axis_x_show ? axisId === "x" && config.axis_x_height ? config.axis_x_height : axisId !== "y" || config.axis_y_show ? axisId !== "y2" || config.axis_y2_show ? (axisId === "x" && !config.axis_rotated && config.axis_x_tick_rotate && (h = 30 + $$.axis.getMaxTickWidth(axisId) * Math.cos(Math.PI * (90 - config.axis_x_tick_rotate) / 180)), axisId === "y" && config.axis_rotated && config.axis_y_tick_rotate && (h = 30 + $$.axis.getMaxTickWidth(axisId) * Math.cos(Math.PI * (90 - config.axis_y_tick_rotate) / 180)), h + ($$.axis.getLabelPositionById(axisId).isInner ? 0 : 10) + (axisId === "y2" ? -10 : 0)) : $$.rotated_padding_top : !config.legend_show || $$.isLegendRight || $$.isLegendInset ? 1 : 10 : 8;
	},
	getEventRectWidth: function getEventRectWidth() {
		return Math.max(0, this.xAxis.tickInterval());
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	getShapeIndices: function getShapeIndices(typeFilter) {
		var $$ = this,
		    config = $$.config,
		    indices = {},
		    i = 0,
		    j = void 0,
		    k = void 0;

		return $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)).forEach(function (d) {
			for (j = 0; j < config.data_groups.length; j++) if (!(config.data_groups[j].indexOf(d.id) < 0)) for (k = 0; k < config.data_groups[j].length; k++) if (config.data_groups[j][k] in indices) {
					indices[d.id] = indices[config.data_groups[j][k]];

					break;
				}
			(0, _util.isUndefined)(indices[d.id]) && (indices[d.id] = i++);
		}), indices.__max__ = i - 1, indices;
	},
	getShapeX: function getShapeX(offset, targetsNum, indices, isSub) {
		var $$ = this,
		    scale = isSub ? $$.subX : $$.zoomScale ? $$.zoomScale : $$.x;


		return function (d) {
			var index = d.id in indices ? indices[d.id] : 0;

			return d.x || d.x === 0 ? scale(d.x) - offset * (targetsNum / 2 - index) : 0;
		};
	},
	getShapeY: function getShapeY(isSub) {
		var $$ = this;

		return function (d) {
			var scale = isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id);

			return scale(d.value);
		};
	},
	getShapeOffset: function getShapeOffset(typeFilter, indices, isSub) {
		var $$ = this,
		    targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))),
		    targetIds = targets.map(function (t) {
			return t.id;
		});


		return function (d, idx) {
			var scale = isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id),
			    y0 = scale(0),
			    offset = y0,
			    i = idx;


			return targets.forEach(function (t) {
				var values = $$.isStepType(d) ? $$.convertValuesToStep(t.values) : t.values;

				t.id === d.id || indices[t.id] !== indices[d.id] || targetIds.indexOf(t.id) < targetIds.indexOf(d.id) && ((typeof values[i] === "undefined" || +values[i].x !== +d.x) && (i = -1, values.forEach(function (v, j) {
					var x1 = v.x.constructor === Date ? +v.x : v.x,
					    x2 = d.x.constructor === Date ? +d.x : d.x;
					x1 === x2 && (i = j);
				})), i in values && values[i].value * d.value >= 0 && (offset += scale(values[i].value) - y0));
			}), offset;
		};
	},
	isWithinShape: function isWithinShape(that, d) {
		var $$ = this,
		    shape = (0, _d.select)(that),
		    isWithin = void 0;


		return $$.isTargetToShow(d.id) ? that.nodeName === "circle" ? isWithin = $$.isStepType(d) ? $$.isWithinStep(that, $$.getYScale(d.id)(d.value)) : $$.isWithinCircle(that, $$.pointSelectR(d) * 1.5) : that.nodeName === "path" && (isWithin = !shape.classed(_classes2.default.bar) || $$.isWithinBar(that)) : isWithin = !1, isWithin;
	},
	getInterpolate: function getInterpolate(d) {
		var $$ = this,
		    interpolation = $$.getInterpolateType(d);


		return {
			"basis": _d.curveBasis,
			"basis-closed": _d.curveBasisClosed,
			"basis-open": _d.curveBasisOpen,
			"bundle": _d.curveBundle,
			"cardinal": _d.curveCardinal,
			"cardinal-closed": _d.curveCardinalClosed,
			"cardinal-open": _d.curveCardinalOpen,
			"catmull-rom": _d.curveCatmullRom,
			"catmull-rom-closed": _d.curveCatmullRomClosed,
			"catmull-rom-open": _d.curveCatmullRomOpen,
			"monotone-x": _d.curveMonotoneX,
			"monotone-y": _d.curveMonotoneY,
			"natural": _d.curveNatural,
			"linear-closed": _d.curveLinearClosed,
			"linear": _d.curveLinear,
			"step": _d.curveStep,
			"step-after": _d.curveStepAfter,
			"step-before": _d.curveStepBefore
		}[interpolation];
	},
	getInterpolateType: function getInterpolateType(d) {
		var $$ = this,
		    interpolation = $$.isInterpolationType($$.config.spline_interpolation_type) ? $$.config.spline_interpolation_type : "cardinal";


		return $$.isSplineType(d) ? interpolation : $$.isStepType(d) ? $$.config.line_step_type : "linear";
	}
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initLine: function initLine() {
		var $$ = this;

		$$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartLines);
	},
	updateTargetsForLine: function updateTargetsForLine(targets) {
		var $$ = this,
		    config = $$.config,
		    classChartLine = $$.classChartLine.bind($$),
		    classLines = $$.classLines.bind($$),
		    classAreas = $$.classAreas.bind($$),
		    classCircles = $$.classCircles.bind($$),
		    classFocus = $$.classFocus.bind($$),
		    mainLineUpdate = $$.main.select("." + _classes2.default.chartLines).selectAll("." + _classes2.default.chartLine).data(targets).attr("class", function (d) {
			return classChartLine(d) + classFocus(d);
		}),
		    mainLineEnter = mainLineUpdate.enter().append("g").attr("class", classChartLine).style("opacity", "0").style("pointer-events", "none");


		// Lines for each data
		mainLineEnter.append("g").attr("class", classLines), mainLineEnter.append("g").attr("class", classAreas), config.point_show && (config.data_selection_enabled && mainLineEnter.append("g").attr("class", function (d) {
			return $$.generateClass(_classes2.default.selectedCircles, d.id);
		}), mainLineEnter.append("g").attr("class", classCircles).style("cursor", function (d) {
			return config.data_selection_isselectable(d) ? "pointer" : null;
		})), targets.forEach(function (t) {
			$$.main.selectAll("." + _classes2.default.selectedCircles + $$.getTargetSelectorSuffix(t.id)).selectAll("" + _classes2.default.selectedCircle).each(function (d) {
				d.value = t.values[d.index].value;
			});
		});
	},
	updateLine: function updateLine(durationForExit) {
		var $$ = this;

		$$.mainLine = $$.main.selectAll("." + _classes2.default.lines).selectAll("." + _classes2.default.line).data($$.lineData.bind($$)), $$.mainLine.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.mainLine = $$.mainLine.enter().append("path").attr("class", $$.classLine.bind($$)).style("stroke", $$.color).merge($$.mainLine).style("opacity", $$.initialOpacity.bind($$)).style("shape-rendering", function (d) {
			return $$.isStepType(d) ? "crispEdges" : "";
		}).attr("transform", null);
	},
	redrawLine: function redrawLine(drawLine, withTransition) {
		return [(withTransition ? this.mainLine.transition(Math.random().toString()) : this.mainLine).attr("d", drawLine).style("stroke", this.color).style("opacity", "1")];
	},
	generateDrawLine: function generateDrawLine(lineIndices, isSub) {
		var $$ = this,
		    config = $$.config,
		    lineConnectNull = config.line_connectNull,
		    axisRotated = config.axis_rotated,
		    getPoints = $$.generateGetLinePoints(lineIndices, isSub),
		    yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale,
		    xValue = function (d) {
			return (isSub ? $$.subxx : $$.xx).call($$, d);
		},
		    yValue = function (d, i) {
			return config.data_groups.length > 0 ? getPoints(d, i)[0][1] : yScaleGetter.call($$, d.id)(d.value);
		},
		    line = (0, _d.line)();


		return line = axisRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue), lineConnectNull || (line = line.defined(function (d) {
			return d.value !== null;
		})), function (d) {
			var x = isSub ? $$.x : $$.subX,
			    y = yScaleGetter.call($$, d.id),
			    values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values,
			    x0 = 0,
			    y0 = 0,
			    path = void 0;


			return $$.isLineType(d) ? config.data_regions[d.id] ? path = $$.lineWithRegions(values, x, y, config.data_regions[d.id]) : ($$.isStepType(d) && (values = $$.convertValuesToStep(values)), path = line.curve($$.getInterpolate(d))(values)) : (values[0] && (x0 = x(values[0].x), y0 = y(values[0].value)), path = axisRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0), path || "M 0 0";
		};
	},
	generateGetLinePoints: function generateGetLinePoints(lineIndices, isSubValue) {
		// partial duplication of generateGetBarPoints
		var $$ = this,
		    config = $$.config,
		    lineTargetsNum = lineIndices.__max__ + 1,
		    isSub = !!isSubValue,
		    x = $$.getShapeX(0, lineTargetsNum, lineIndices, isSub),
		    y = $$.getShapeY(isSub),
		    lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub),
		    yScale = isSub ? $$.getSubYScale : $$.getYScale;


		return function (d, i) {
			var y0 = yScale.call($$, d.id)(0),
			    offset = lineOffset(d, i) || y0,
			    posX = x(d),
			    posY = y(d); // offset is for stacked area chart


			// fix posY not to overflow opposite quadrant
			config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0);


			// 1 point that marks the line position
			var point = [posX, posY - (y0 - offset)];

			return [point, point, // from here and below, needed for compatibility
			point, point];
		};
	},
	lineWithRegions: function lineWithRegions(d, x, y, _regions) {

		function isWithinRegions(withinX, withinRegions) {
			var idx = void 0;

			for (idx = 0; idx < withinRegions.length; idx++) if (withinRegions[idx].start < withinX && withinX <= withinRegions[idx].end) return !0;
			return !1;
		}

		// Check start/end of regions


		// Define svg generator function for region
		function generateM(points) {
			return "M" + points[0][0] + " " + points[0][1] + " " + points[1][0] + " " + points[1][1];
		}

		var $$ = this,
		    config = $$.config,
		    xOffset = $$.isCategorized() ? 0.5 : 0,
		    regions = [],
		    i = void 0,
		    j = void 0,
		    s = "M",
		    sWithRegion = void 0,
		    xp = void 0,
		    yp = void 0,
		    dx = void 0,
		    dy = void 0,
		    dd = void 0,
		    diff = void 0,
		    diffx2 = void 0;
		if ((0, _util.isDefined)(_regions)) for (i = 0; i < _regions.length; i++) regions[i] = {}, regions[i].start = (0, _util.isUndefined)(_regions[i].start) ? d[0].x : $$.isTimeSeries() ? $$.parseDate(_regions[i].start) : _regions[i].start, regions[i].end = (0, _util.isUndefined)(_regions[i].end) ? d[d.length - 1].x : $$.isTimeSeries() ? $$.parseDate(_regions[i].end) : _regions[i].end;

		// Set scales
		var xValue = config.axis_rotated ? function (dt) {
			return y(dt.value);
		} : function (dt) {
			return x(dt.x);
		},
		    yValue = config.axis_rotated ? function (dt) {
			return x(dt.x);
		} : function (dt) {
			return y(dt.value);
		};

		// Generate
		for (sWithRegion = $$.isTimeSeries() ? function (d0, d1, k, timeseriesDiff) {
			var x0 = d0.x.getTime(),
			    xDiff = d1.x - d0.x,
			    xv0 = new Date(x0 + xDiff * k),
			    xv1 = new Date(x0 + xDiff * (k + timeseriesDiff)),
			    points = void 0;

			return points = config.axis_rotated ? [[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] : [[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]], generateM(points);
		} : function (d0, d1, k, otherDiff) {
			var points = void 0;

			return points = config.axis_rotated ? [[y(yp(k), !0), x(xp(k))], [y(yp(k + otherDiff), !0), x(xp(k + otherDiff))]] : [[x(xp(k), !0), y(yp(k))], [x(xp(k + otherDiff), !0), y(yp(k + otherDiff))]], generateM(points);
		}, i = 0; i < d.length; i++)
		// Draw as normal
		if ((0, _util.isUndefined)(regions) || !isWithinRegions(d[i].x, regions)) s += " " + xValue(d[i]) + " " + yValue(d[i]);else for (xp = $$.getScale(d[i - 1].x + xOffset, d[i].x + xOffset, $$.isTimeSeries()), yp = $$.getScale(d[i - 1].value, d[i].value), dx = x(d[i].x) - x(d[i - 1].x), dy = y(d[i].value) - y(d[i - 1].value), dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)), diff = 2 / dd, diffx2 = diff * 2, j = diff; j <= 1; j += diffx2) s += sWithRegion(d[i - 1], d[i], j, diff);

		return s;
	},
	updateArea: function updateArea(durationForExit) {
		var $$ = this;

		$$.mainArea = $$.main.selectAll("." + _classes2.default.areas).selectAll("." + _classes2.default.area).data($$.lineData.bind($$)), $$.mainArea.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.mainArea = $$.mainArea.enter().append("path").attr("class", $$.classArea.bind($$)).style("fill", $$.color).style("opacity", function () {
			return $$.orgAreaOpacity = (0, _d.select)(this).style("opacity"), "0";
		}).merge($$.mainArea), $$.mainArea.style("opacity", $$.orgAreaOpacity);
	},
	redrawArea: function redrawArea(drawArea, withTransition) {
		return [(withTransition ? this.mainArea.transition(Math.random().toString()) : this.mainArea).attr("d", drawArea).style("fill", this.color).style("opacity", this.orgAreaOpacity)];
	},
	generateDrawArea: function generateDrawArea(areaIndices, isSub) {
		var $$ = this,
		    config = $$.config,
		    lineConnectNull = config.line_connectNull,
		    axisRotated = config.axis_rotated,
		    getPoints = $$.generateGetAreaPoints(areaIndices, isSub),
		    yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale,
		    xValue = function (d) {
			return (isSub ? $$.subxx : $$.xx).call($$, d);
		},
		    value0 = function (d, i) {
			return config.data_groups.length > 0 ? getPoints(d, i)[0][1] : yScaleGetter.call($$, d.id)($$.getAreaBaseValue(d.id));
		},
		    value1 = function (d, i) {
			return config.data_groups.length > 0 ? getPoints(d, i)[1][1] : yScaleGetter.call($$, d.id)(d.value);
		},
		    area = (0, _d.area)();


		return area = axisRotated ? area.x0(value0).x1(value1).y(xValue) : area.x(xValue).y0(config.area_above ? 0 : value0).y1(value1), lineConnectNull || (area = area.defined(function (d) {
			return d.value !== null;
		})), function (d) {
			var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values,
			    x0 = 0,
			    y0 = 0,
			    path = void 0;


			return $$.isAreaType(d) ? ($$.isStepType(d) && (values = $$.convertValuesToStep(values)), path = area.curve($$.getInterpolate(d))(values)) : (values[0] && (x0 = $$.x(values[0].x), y0 = $$.getYScale(d.id)(values[0].value)), path = axisRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0), path || "M 0 0";
		};
	},
	getAreaBaseValue: function getAreaBaseValue() {
		return 0;
	},
	generateGetAreaPoints: function generateGetAreaPoints(areaIndices, isSub) {
		// partial duplication of generateGetBarPoints
		var $$ = this,
		    config = $$.config,
		    areaTargetsNum = areaIndices.__max__ + 1,
		    x = $$.getShapeX(0, areaTargetsNum, areaIndices, !!isSub),
		    y = $$.getShapeY(!!isSub),
		    areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, !!isSub),
		    yScale = isSub ? $$.getSubYScale : $$.getYScale;


		return function (d, i) {
			var y0 = yScale.call($$, d.id)(0),
			    offset = areaOffset(d, i) || y0,
			    posX = x(d),
			    posY = y(d); // offset is for stacked area chart


			// fix posY not to overflow opposite quadrant


			// 1 point that marks the area position
			return config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0), [[posX, offset], [posX, posY - (y0 - offset)], [posX, posY - (y0 - offset)], // needed for compatibility
			[posX, offset] // needed for compatibility
			];
		};
	},
	updateCircle: function updateCircle() {
		var $$ = this;

		$$.config.point_show && ($$.mainCircle = $$.main.selectAll("." + _classes2.default.circles).selectAll("." + _classes2.default.circle).data($$.lineOrScatterData.bind($$)), $$.mainCircle.exit().remove(), $$.mainCircle = $$.mainCircle.enter().append("circle").attr("class", $$.classCircle.bind($$)).attr("r", $$.pointR.bind($$)).style("fill", $$.color).merge($$.mainCircle).style("opacity", $$.initialOpacityForCircle.bind($$)));
	},
	redrawCircle: function redrawCircle(cx, cy, withTransition, flow) {
		var selectedCircles = this.main.selectAll("." + _classes2.default.selectedCircle),
		    mainCircles = void 0;


		if (!this.config.point_show) return undefined;

		if (withTransition) {
			var transitionName = Math.random().toString();

			mainCircles = flow ? this.mainCircle.attr("cx", cx).transition(transitionName).attr("cx", cx).attr("cy", cy).transition(transitionName).style("opacity", this.opacityForCircle.bind(this)).style("fill", this.color) : this.mainCircle.transition(transitionName).attr("cx", cx).attr("cy", cy).transition(transitionName).style("opacity", this.opacityForCircle.bind(this)).style("fill", this.color), selectedCircles = selectedCircles.transition(Math.random().toString());
		} else mainCircles = this.mainCircle.attr("cx", cx).attr("cy", cy).style("opacity", this.opacityForCircle.bind(this)).style("fill", this.color);

		return [mainCircles, selectedCircles.attr("cx", cx).attr("cy", cy)];
	},
	circleX: function circleX(d) {
		return this.config.zoom_enabled && this.zoomScale ? d.x || d.x === 0 ? this.zoomScale(d.x) : null : d.x || d.x === 0 ? this.x(d.x) : null;
	},
	updateCircleY: function updateCircleY() {
		var $$ = this,
		    lineIndices = void 0,
		    getPoints = void 0;
		$$.config.data_groups.length > 0 ? (lineIndices = $$.getShapeIndices($$.isLineType), getPoints = $$.generateGetLinePoints(lineIndices), $$.circleY = function (d, i) {
			return getPoints(d, i)[0][1];
		}) : $$.circleY = function (d) {
			return $$.getYScale(d.id)(d.value);
		};
	},
	getCircles: function getCircles(i, id) {
		var $$ = this,
		    suffix = (0, _util.isValue)(i) ? "-" + i : "";


		return (id ? $$.main.selectAll("." + _classes2.default.circles + $$.getTargetSelectorSuffix(id)) : $$.main).selectAll("." + _classes2.default.circle + suffix);
	},
	expandCircles: function expandCircles(i, id, reset) {
		var $$ = this,
		    r = $$.pointExpandedR.bind($$);
		reset && $$.unexpandCircles(), $$.getCircles(i, id).classed(_classes2.default.EXPANDED, !0).attr("r", r);
	},
	unexpandCircles: function unexpandCircles(i) {
		var $$ = this,
		    r = $$.pointR.bind($$);
		$$.getCircles(i).filter(function () {
			return (0, _d.select)(this).classed(_classes2.default.EXPANDED);
		}).classed(_classes2.default.EXPANDED, !1).attr("r", r);
	},
	pointR: function pointR(d) {
		var $$ = this,
		    config = $$.config;


		return $$.isStepType(d) ? 0 : (0, _util.isFunction)(config.point_r) ? config.point_r(d) : config.point_r;
	},
	pointExpandedR: function pointExpandedR(d) {
		var $$ = this,
		    config = $$.config;


		return config.point_focus_expand_enabled ? config.point_focus_expand_r ? config.point_focus_expand_r : $$.pointR(d) * 1.75 : $$.pointR(d);
	},
	pointSelectR: function pointSelectR(d) {
		var $$ = this,
		    config = $$.config;


		return (0, _util.isFunction)(config.point_select_r) ? config.point_select_r(d) : config.point_select_r ? config.point_select_r : $$.pointR(d) * 4;
	},
	isWithinCircle: function isWithinCircle(that, r) {
		var mouse = (0, _d.mouse)(that),
		    d3This = (0, _d.select)(that),
		    cx = +d3This.attr("cx"),
		    cy = +d3This.attr("cy");


		return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < r;
	},
	isWithinStep: function isWithinStep(that, y) {
		return Math.abs(y - (0, _d.mouse)(that)[1]) < 30;
	}
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initBar: function initBar() {
		var $$ = this;

		$$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartBars);
	},
	updateTargetsForBar: function updateTargetsForBar(targets) {
		var $$ = this,
		    config = $$.config,
		    classChartBar = $$.classChartBar.bind($$),
		    classBars = $$.classBars.bind($$),
		    classFocus = $$.classFocus.bind($$),
		    mainBarUpdate = $$.main.select("." + _classes2.default.chartBars).selectAll("." + _classes2.default.chartBar).data(targets).attr("class", function (d) {
			return classChartBar(d) + classFocus(d);
		}),
		    mainBarEnter = mainBarUpdate.enter().append("g").attr("class", classChartBar).style("opacity", "0").style("pointer-events", "none");


		// Bars for each data
		mainBarEnter.append("g").attr("class", classBars).style("cursor", function (d) {
			return config.data_selection_isselectable(d) ? "pointer" : null;
		});
	},
	updateBar: function updateBar(durationForExit) {
		var $$ = this,
		    barData = $$.barData.bind($$),
		    classBar = $$.classBar.bind($$),
		    initialOpacity = $$.initialOpacity.bind($$),
		    color = function (d) {
			return $$.color(d.id);
		};
		$$.mainBar = $$.main.selectAll("." + _classes2.default.bars).selectAll("." + _classes2.default.bar).data(barData), $$.mainBar.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.mainBar = $$.mainBar.enter().append("path").attr("class", classBar).style("stroke", color).style("fill", color).merge($$.mainBar).style("opacity", initialOpacity);
	},
	redrawBar: function redrawBar(drawBar, withTransition) {
		return [(withTransition ? this.mainBar.transition(Math.random().toString()) : this.mainBar).attr("d", drawBar).style("fill", this.color).style("opacity", "1")];
	},
	getBarW: function getBarW(axis, barTargetsNum) {
		var $$ = this,
		    config = $$.config,
		    w = typeof config.bar_width === "number" ? config.bar_width : barTargetsNum ? axis.tickInterval() * config.bar_width_ratio / barTargetsNum : 0;


		return config.bar_width_max && w > config.bar_width_max ? config.bar_width_max : w;
	},
	getBars: function getBars(i, id) {
		var $$ = this,
		    suffix = (0, _util.isValue)(i) ? "-" + i : "";


		return (id ? $$.main.selectAll("." + _classes2.default.bars + $$.getTargetSelectorSuffix(id)) : $$.main).selectAll("." + _classes2.default.bar + suffix);
	},
	expandBars: function expandBars(i, id, reset) {
		var $$ = this;

		reset && $$.unexpandBars(), $$.getBars(i, id).classed(_classes2.default.EXPANDED, !0);
	},
	unexpandBars: function unexpandBars(i) {
		var $$ = this;

		$$.getBars(i).classed(_classes2.default.EXPANDED, !1);
	},
	generateDrawBar: function generateDrawBar(barIndices, isSub) {
		var $$ = this,
		    config = $$.config,
		    getPoints = $$.generateGetBarPoints(barIndices, isSub);


		return function (d, i) {
			// 4 points that make a bar
			var points = getPoints(d, i),
			    indexX = config.axis_rotated ? 1 : 0,
			    indexY = config.axis_rotated ? 0 : 1,
			    path = "M " + points[0][indexX] + "," + points[0][indexY] + "\n\t\t\tL " + points[1][indexX] + "," + points[1][indexY] + "\n\t\t\tL " + points[2][indexX] + "," + points[2][indexY] + "\n\t\t\tL " + points[3][indexX] + "," + points[3][indexY] + " z";

			// switch points if axis is rotated, not applicable for sub chart


			return path;
		};
	},
	generateGetBarPoints: function generateGetBarPoints(barIndices, isSub) {
		var $$ = this,
		    axis = isSub ? $$.subXAxis : $$.xAxis,
		    barTargetsNum = barIndices.__max__ + 1,
		    barW = $$.getBarW(axis, barTargetsNum),
		    barX = $$.getShapeX(barW, barTargetsNum, barIndices, !!isSub),
		    barY = $$.getShapeY(!!isSub),
		    barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub),
		    yScale = isSub ? $$.getSubYScale : $$.getYScale;


		return function (d, i) {
			var y0 = yScale.call($$, d.id)(0),
			    offset = barOffset(d, i) || y0,
			    posX = barX(d),
			    posY = barY(d); // offset is for stacked bar chart


			// fix posY not to overflow opposite quadrant

			// 4 points that make a bar
			return $$.config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0), [[posX, offset], [posX, posY - (y0 - offset)], [posX + barW, posY - (y0 - offset)], [posX + barW, offset]];
		};
	},
	isWithinBar: function isWithinBar(that) {
		var mouse = (0, _d.mouse)(that),
		    list = (0, _util.getRectSegList)(that),
		    box = that.getBBox(),
		    seg0 = list[0],
		    seg1 = list[1],
		    x = Math.min(seg0.x, seg1.x),
		    y = Math.min(seg0.y, seg1.y),
		    w = box.width,
		    h = box.height,
		    offset = 2,
		    isIn = x - offset < mouse[0] && mouse[0] < x + w + offset && y - offset < mouse[1] && mouse[1] < y + h + offset;


		return isIn;
	}
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initializes the text
  * @private
  */
	initText: function initText() {
		var $$ = this;

		$$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartTexts), $$.mainText = (0, _d.selectAll)([]);
	},


	/**
  * Update chartText
  * @private
  * @param {Object} $$.data.targets
  */
	updateTargetsForText: function updateTargetsForText(targets) {
		var $$ = this,
		    classChartText = $$.classChartText.bind($$),
		    classTexts = $$.classTexts.bind($$),
		    classFocus = $$.classFocus.bind($$),
		    mainTextUpdate = $$.main.select("." + _classes2.default.chartTexts).selectAll("." + _classes2.default.chartText).data(targets).attr("class", function (d) {
			return classChartText(d) + classFocus(d);
		}),
		    mainTextEnter = mainTextUpdate.enter().append("g").attr("class", classChartText).style("opacity", "0").style("pointer-events", "none");
		mainTextEnter.append("g").attr("class", classTexts);
	},


	/**
  * Update text
  * @private
  * @param {Number} Fade-out transition duration
  */
	updateText: function updateText(durationForExit) {
		var $$ = this,
		    config = $$.config,
		    barOrLineData = $$.barOrLineData.bind($$),
		    classText = $$.classText.bind($$);
		$$.mainText = $$.main.selectAll("." + _classes2.default.texts).selectAll("." + _classes2.default.text).data(barOrLineData), $$.mainText.exit().transition().duration(durationForExit).style("fill-opacity", "0").remove(), $$.mainText = $$.mainText.enter().append("text").attr("class", classText).attr("text-anchor", function (d) {
			return config.axis_rotated ? d.value < 0 ? "end" : "start" : "middle";
		}).style("stroke", "none").style("fill", function (d) {
			return $$.color(d);
		}).style("fill-opacity", "0").merge($$.mainText).text(function (d, i, j) {
			return $$.dataLabelFormat(d.id)(d.value, d.id, i, j);
		});
	},


	/**
  * Redraw chartText
  * @private
  * @param {Number} x Attribute
  * @param {Number} y Attribute
  * @param {Object} options.flow
  * @param {Boolean} indicates transition is enabled
  * @returns {Object} $$.mainText
  */
	redrawText: function redrawText(xForText, yForText, forFlow, withTransition) {
		return [(withTransition ? this.mainText.transition() : this.mainText).attr("x", xForText).attr("y", yForText).style("fill", this.color).style("fill-opacity", forFlow ? 0 : this.opacityForText.bind(this))];
	},


	/**
  * Gets the getBoundingClientRect value of the element
  * @private
  * @param {String} text
  * @param {String} class
  * @param {HTMLElement} element
  * @returns {Object} value of element.getBoundingClientRect()
  */
	getTextRect: function getTextRect(text, cls, element) {
		var dummy = (0, _d.select)("body").append("div").classed("bb", !0),
		    svg = dummy.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0px").style("left", "0px"),
		    font = (0, _d.select)(element).style("font"),
		    rect = void 0;

		return svg.selectAll(".dummy").data([text]).enter().append("text").classed(cls ? cls : "", !0).style("font", font).text(text).each(function () {
			rect = this.getBoundingClientRect();
		}), dummy.remove(), rect;
	},


	/**
  * Gets the x or y coordinate of the text
  * @private
  * @param {Object} area Indices
  * @param {Object} bar Indices
  * @param {Object} line Indices
  * @param {Boolean} whether or not to x
  * @returns {Number} coordinates
  */
	generateXYForText: function generateXYForText(areaIndices, barIndices, lineIndices, forX) {
		var $$ = this,
		    getAreaPoints = $$.generateGetAreaPoints(areaIndices, !1),
		    getBarPoints = $$.generateGetBarPoints(barIndices, !1),
		    getLinePoints = $$.generateGetLinePoints(lineIndices, !1),
		    getter = forX ? $$.getXForText : $$.getYForText;


		return function (d, i) {
			var getPoints = $$.isAreaType(d) && getAreaPoints || $$.isBarType(d) && getBarPoints || getLinePoints;

			return getter.call($$, getPoints(d, i), d, this);
		};
	},


	/**
  * Gets the x coordinate of the text
  * @private
  * @param {Object} points
  * @param {Object} data
  * @param {HTMLElement} element
  * @returns {Number} x coordinate
  */
	getXForText: function getXForText(points, d, textElement) {
		var $$ = this,
		    config = $$.config,
		    xPos = void 0,
		    padding = void 0;


		return config.axis_rotated ? (padding = $$.isBarType(d) ? 4 : 6, xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1)) : xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : points[0][0], d.value === null && (xPos > $$.width ? xPos = $$.width - textElement.getBoundingClientRect().width : xPos < 0 && (xPos = 4)), xPos + (config.data_labels_position.x || 0);
	},


	/**
  * Gets the y coordinate of the text
  * @private
  * @param {Object} points
  * @param {Object} data
  * @param {HTMLElement} element
  * @returns {Number} y coordinate
  */
	getYForText: function getYForText(points, d, textElement) {
		var $$ = this,
		    config = $$.config,
		    yPos = void 0;

		// show labels regardless of the domain if value is null
		if (config.axis_rotated ? yPos = (points[0][0] + points[2][0] + textElement.getBoundingClientRect().height * 0.6) / 2 : (yPos = points[2][1], d.value < 0 || d.value === 0 && !$$.hasPositiveValue ? (yPos += textElement.getBoundingClientRect().height, $$.isBarType(d) && $$.isSafari() ? yPos -= 3 : !$$.isBarType(d) && $$.isChrome() && (yPos += 3)) : yPos += $$.isBarType(d) ? -3 : -6), d.value === null && !config.axis_rotated) {
			var boxHeight = textElement.getBoundingClientRect().height;

			yPos < boxHeight ? yPos = boxHeight : yPos > this.height && (yPos = this.height - 4);
		}

		return yPos + (config.data_labels_position.y || 0);
	}
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	setTargetType: function setTargetType(targetIds, type) {
		var $$ = this,
		    config = $$.config;
		$$.mapToTargetIds(targetIds).forEach(function (id) {
			$$.withoutFadeIn[id] = type === config.data_types[id], config.data_types[id] = type;
		}), targetIds || (config.data_type = type);
	},
	hasType: function hasType(type, targetsValue) {
		var $$ = this,
		    types = $$.config.data_types,
		    targets = targetsValue || $$.data.targets,
		    has = !1;


		return targets && targets.length ? targets.forEach(function (target) {
			var t = types[target.id];

			(t && t.indexOf(type) >= 0 || !t && type === "line") && (has = !0);
		}) : Object.keys(types).length ? Object.keys(types).forEach(function (id) {
			types[id] === type && (has = !0);
		}) : has = $$.config.data_type === type, has;
	},
	hasArcType: function hasArcType(targets) {
		return this.hasType("pie", targets) || this.hasType("donut", targets) || this.hasType("gauge", targets);
	},
	isLineType: function isLineType(d) {
		var id = (0, _util.isString)(d) ? d : d.id;

		return !this.config.data_types[id] || this.isTypeOf(id, ["line", "spline", "area", "area-spline", "step", "area-step"]);
	},
	isTypeOf: function isTypeOf(d, type) {
		var id = (0, _util.isString)(d) ? d : d.id,
		    dataType = this.config.data_types[id];


		return (0, _util.isArray)(type) ? type.indexOf(dataType) >= 0 : dataType === type;
	},
	isStepType: function isStepType(d) {
		return this.isTypeOf(d, ["step", "area-step"]);
	},
	isSplineType: function isSplineType(d) {
		return this.isTypeOf(d, ["spline", "area-spline"]);
	},
	isAreaType: function isAreaType(d) {
		return this.isTypeOf(d, ["area", "area-spline", "area-step"]);
	},
	isBarType: function isBarType(d) {
		return this.isTypeOf(d, "bar");
	},
	isScatterType: function isScatterType(d) {
		return this.isTypeOf(d, "scatter");
	},
	isPieType: function isPieType(d) {
		return this.isTypeOf(d, "pie");
	},
	isGaugeType: function isGaugeType(d) {
		return this.isTypeOf(d, "gauge");
	},
	isDonutType: function isDonutType(d) {
		return this.isTypeOf(d, "donut");
	},
	isArcType: function isArcType(d) {
		return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d);
	},
	lineData: function lineData(d) {
		return this.isLineType(d) ? [d] : [];
	},
	arcData: function arcData(d) {
		return this.isArcType(d.data) ? [d] : [];
	},
	barData: function barData(d) {
		return this.isBarType(d) ? d.values : [];
	},
	lineOrScatterData: function lineOrScatterData(d) {
		return this.isLineType(d) || this.isScatterType(d) ? d.values : [];
	},
	barOrLineData: function barOrLineData(d) {
		return this.isBarType(d) || this.isLineType(d) ? d.values : [];
	},


	// https://github.com/d3/d3-shape#curves
	isInterpolationType: function isInterpolationType(type) {
		return ["basis", "basis-closed", "basis-open", "bundle", "cardinal", "cardinal-closed", "cardinal-open", "catmull-rom", "catmull-rom-closed", "catmull-rom-open", "linear", "linear-closed", "monotone-x", "monotone-y", "natural"].indexOf(type) >= 0;
	}
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initGrid: function initGrid() {
		var $$ = this,
		    config = $$.config;
		$$.grid = $$.main.append("g").attr("clip-path", $$.clipPathForGrid).attr("class", _classes2.default.grid), config.grid_x_show && $$.grid.append("g").attr("class", _classes2.default.xgrids), config.grid_y_show && $$.grid.append("g").attr("class", _classes2.default.ygrids), config.grid_focus_show && $$.grid.append("g").attr("class", _classes2.default.xgridFocus).append("line").attr("class", _classes2.default.xgridFocus), $$.xgrid = (0, _d.selectAll)([]), config.grid_lines_front || $$.initGridLines();
	},
	initGridLines: function initGridLines() {
		var $$ = this;

		$$.gridLines = $$.main.append("g").attr("clip-path", $$.clipPathForGrid).attr("class", _classes2.default.grid + " " + _classes2.default.gridLines), $$.gridLines.append("g").attr("class", _classes2.default.xgridLines), $$.gridLines.append("g").attr("class", _classes2.default.ygridLines), $$.xgridLines = (0, _d.selectAll)([]);
	},
	updateXGrid: function updateXGrid(withoutUpdate) {
		var $$ = this,
		    config = $$.config,
		    xgridData = $$.generateGridData(config.grid_x_type, $$.x),
		    tickOffset = $$.isCategorized() ? $$.xAxis.tickOffset() : 0;
		$$.xgridAttr = config.axis_rotated ? {
			"x1": 0,
			"x2": $$.width,
			"y1": function y1(d) {
				return $$.x(d) - tickOffset;
			},
			"y2": function y2(d) {
				return $$.x(d) - tickOffset;
			}
		} : {
			"x1": function x1(d) {
				return $$.x(d) + tickOffset;
			},
			"x2": function x2(d) {
				return $$.x(d) + tickOffset;
			},
			"y1": 0,
			"y2": $$.height
		}, $$.xgrid = $$.main.select("." + _classes2.default.xgrids).selectAll("." + _classes2.default.xgrid).data(xgridData), $$.xgrid.exit().remove(), $$.xgrid = $$.xgrid.enter().append("line").attr("class", _classes2.default.xgrid).merge($$.xgrid), withoutUpdate || $$.xgrid.each(function () {
			var grid = (0, _d.select)(this);

			Object.keys($$.xgridAttr).forEach(function (id) {
				grid.attr(id, $$.xgridAttr[id]).style("opacity", function () {
					return grid.attr(config.axis_rotated ? "y1" : "x1") === (config.axis_rotated ? $$.height : 0) ? "0" : "1";
				});
			});
		});
	},
	updateYGrid: function updateYGrid() {
		var $$ = this,
		    config = $$.config,
		    gridValues = $$.yAxis.tickValues() || $$.y.ticks(config.grid_y_ticks);
		$$.ygrid = $$.main.select("." + _classes2.default.ygrids).selectAll("." + _classes2.default.ygrid).data(gridValues), $$.ygrid.exit().remove(), $$.ygrid = $$.ygrid.enter().append("line").attr("class", _classes2.default.ygrid).merge($$.ygrid), $$.ygrid.attr("x1", config.axis_rotated ? $$.y : 0).attr("x2", config.axis_rotated ? $$.y : $$.width).attr("y1", config.axis_rotated ? 0 : $$.y).attr("y2", config.axis_rotated ? $$.height : $$.y), $$.smoothLines($$.ygrid, "grid");
	},
	gridTextAnchor: function gridTextAnchor(d) {
		return d.position ? d.position : "end";
	},
	gridTextDx: function gridTextDx(d) {
		return d.position === "start" ? 4 : d.position === "middle" ? 0 : -4;
	},
	xGridTextX: function xGridTextX(d) {
		return d.position === "start" ? -this.height : d.position === "middle" ? -this.height / 2 : 0;
	},
	yGridTextX: function yGridTextX(d) {
		return d.position === "start" ? 0 : d.position === "middle" ? this.width / 2 : this.width;
	},
	updateGrid: function updateGrid(duration) {
		var $$ = this,
		    main = $$.main,
		    config = $$.config;


		// hide if arc type
		$$.grid.style("visibility", $$.hasArcType() ? "hidden" : "visible"), main.select("line." + _classes2.default.xgridFocus).style("visibility", "hidden"), config.grid_x_show && $$.updateXGrid(), $$.xgridLines = main.select("." + _classes2.default.xgridLines).selectAll("." + _classes2.default.xgridLine).data(config.grid_x_lines), $$.xgridLines.exit().transition().duration(duration).style("opacity", "0").remove();


		// enter
		var xgridLine = $$.xgridLines.enter().append("g").attr("class", function (d) {
			return _classes2.default.xgridLine + (d.class ? " " + d.class : "");
		});

		xgridLine.append("line").style("opacity", "0"), xgridLine.append("text").attr("text-anchor", $$.gridTextAnchor).attr("transform", config.axis_rotated ? "" : "rotate(-90)").attr("dx", $$.gridTextDx).attr("dy", -5).style("opacity", "0"), $$.xgridLines = xgridLine.merge($$.xgridLines), config.grid_y_show && $$.updateYGrid(), $$.ygridLines = main.select("." + _classes2.default.ygridLines).selectAll("." + _classes2.default.ygridLine).data(config.grid_y_lines), $$.ygridLines.exit().transition().duration(duration).style("opacity", "0").remove();


		// enter
		var ygridLine = $$.ygridLines.enter().append("g").attr("class", function (d) {
			return _classes2.default.ygridLine + (d.class ? " " + d.class : "");
		});

		ygridLine.append("line").style("opacity", "0"), ygridLine.append("text").attr("text-anchor", $$.gridTextAnchor).attr("transform", config.axis_rotated ? "rotate(-90)" : "").attr("dx", $$.gridTextDx).attr("dy", -5).style("opacity", "0"), $$.ygridLines = ygridLine.merge($$.ygridLines);


		// update
		var yv = $$.yv.bind($$);

		$$.ygridLines.select("line").transition().duration(duration).attr("x1", config.axis_rotated ? yv : 0).attr("x2", config.axis_rotated ? yv : $$.width).attr("y1", config.axis_rotated ? 0 : yv).attr("y2", config.axis_rotated ? $$.height : yv).transition().style("opacity", "1"), $$.ygridLines.select("text").transition().duration(duration).attr("x", config.axis_rotated ? $$.xGridTextX.bind($$) : $$.yGridTextX.bind($$)).attr("y", yv).text(function (d) {
			return d.text;
		}).transition().style("opacity", "1");
	},
	redrawGrid: function redrawGrid(withTransition) {
		var $$ = this,
		    rotated = $$.config.axis_rotated,
		    xv = $$.xv.bind($$),
		    lines = $$.xgridLines.select("line"),
		    texts = $$.xgridLines.select("text");


		return lines = (withTransition ? lines.transition() : lines).attr("x1", rotated ? 0 : xv).attr("x2", rotated ? $$.width : xv).attr("y1", rotated ? xv : 0).attr("y2", rotated ? xv : $$.height), texts = (withTransition ? texts.transition() : texts).attr("x", rotated ? $$.yGridTextX.bind($$) : $$.xGridTextX.bind($$)).attr("y", xv).text(function (d) {
			return d.text;
		}), [(withTransition ? lines.transition() : lines).style("opacity", "1"), (withTransition ? texts.transition() : texts).style("opacity", "1")];
	},
	showXGridFocus: function showXGridFocus(selectedData) {
		var $$ = this,
		    config = $$.config,
		    dataToShow = selectedData.filter(function (d) {
			return d && (0, _util.isValue)(d.value);
		}),
		    focusEl = $$.main.selectAll("line." + _classes2.default.xgridFocus),
		    xx = $$.xx.bind($$);
		!config.tooltip_show || $$.hasType("scatter") || $$.hasArcType() || (focusEl.style("visibility", "visible").data([dataToShow[0]]).attr(config.axis_rotated ? "y1" : "x1", xx).attr(config.axis_rotated ? "y2" : "x2", xx), $$.smoothLines(focusEl, "grid"));

		// Hide when scatter plot exists
	},
	hideXGridFocus: function hideXGridFocus() {
		this.main.select("line." + _classes2.default.xgridFocus).style("visibility", "hidden");
	},
	updateXgridFocus: function updateXgridFocus() {
		var $$ = this,
		    config = $$.config;
		$$.main.select("line." + _classes2.default.xgridFocus).attr("x1", config.axis_rotated ? 0 : -10).attr("x2", config.axis_rotated ? $$.width : -10).attr("y1", config.axis_rotated ? -10 : 0).attr("y2", config.axis_rotated ? -10 : $$.height);
	},
	generateGridData: function generateGridData(type, scale) {
		var $$ = this,
		    tickNum = $$.main.select("." + _classes2.default.axisX).selectAll(".tick").size(),
		    gridData = [];


		if (type === "year") {
			var xDomain = $$.getXDomain(),
			    firstYear = xDomain[0].getFullYear(),
			    lastYear = xDomain[1].getFullYear();


			for (var i = firstYear; i <= lastYear; i++) gridData.push(new Date(i + "-01-01 00:00:00"));
		} else gridData = scale.ticks(10), gridData.length > tickNum && (gridData = gridData.filter(function (d) {
				return (d + "").indexOf(".") < 0;
			}));
		return gridData;
	},
	getGridFilterToRemove: function getGridFilterToRemove(params) {
		return params ? function (line) {
			var found = !1;

			return ((0, _util.isArray)(params) ? params.concat() : [params]).forEach(function (param) {
				("value" in param && line.value === param.value || "class" in param && line.class === param.class) && (found = !0);
			}), found;
		} : function () {
			return !0;
		};
	},
	removeGridLines: function removeGridLines(params, forX) {
		var $$ = this,
		    config = $$.config,
		    toRemove = $$.getGridFilterToRemove(params),
		    toShow = function (line) {
			return !toRemove(line);
		},
		    classLines = forX ? _classes2.default.xgridLines : _classes2.default.ygridLines,
		    classLine = forX ? _classes2.default.xgridLine : _classes2.default.ygridLine;
		$$.main.select("." + classLines).selectAll("." + classLine).filter(toRemove).transition().duration(config.transition_duration).style("opacity", "0").remove(), forX ? config.grid_x_lines = config.grid_x_lines.filter(toShow) : config.grid_y_lines = config.grid_y_lines.filter(toShow);
	}
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initializes the tooltip
  * @private
  */
	initTooltip: function initTooltip() {
		var $$ = this,
		    config = $$.config,
		    i = void 0;


		// Show tooltip if needed
		if ($$.tooltip = $$.selectChart.style("position", "relative").append("div").attr("class", _classes2.default.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none"), config.tooltip_init_show) {
			if ($$.isTimeSeries() && (0, _util.isString)(config.tooltip_init_x)) {

				for (config.tooltip_init_x = $$.parseDate(config.tooltip_init_x), i = 0; i < $$.data.targets[0].values.length && $$.data.targets[0].values[i].x - config.tooltip_init_x !== 0; i++);

				config.tooltip_init_x = i;
			}

			$$.tooltip.html(config.tooltip_contents.call($$, $$.data.targets.map(function (d) {
				return $$.addName(d.values[config.tooltip_init_x]);
			}), $$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType()), $$.color)), $$.tooltip.style("top", config.tooltip_init_position.top).style("left", config.tooltip_init_position.left).style("display", "block");
		}
	},


	/**
  * Returns the tooltip content(HTML string)
  * @private
  * @param {Object} data
  * @param {Function} default title format
  * @param {Function} default format for each data value in the tooltip.
  * @param {Object} $$.color(generateColor())
  * @returns {string} html
  */
	getTooltipContent: function getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
		var $$ = this,
		    config = $$.config,
		    titleFormat = config.tooltip_format_title || defaultTitleFormat,
		    nameFormat = config.tooltip_format_name || function (name) {
			return name;
		},
		    valueFormat = config.tooltip_format_value || defaultValueFormat,
		    order = config.tooltip_order,
		    text = void 0,
		    title = void 0,
		    value = void 0,
		    name = void 0,
		    bgcolor = void 0;


		if (order === null && config.data_groups.length) {
			// for stacked data, order should aligned with the visually displayed data
			var ids = $$.orderTargets($$.data.targets).map(function (i2) {
				return i2.id;
			}).reverse();

			d.sort(function (a, b) {
				var v1 = a ? a.value : null,
				    v2 = b ? b.value : null;


				return v1 > 0 && v2 > 0 && (v1 = a.id ? ids.indexOf(a.id) : null, v2 = b.id ? ids.indexOf(b.id) : null), v1 - v2;
			});
		} else if (/^(asc|desc)$/.test(order)) {
			d.sort(function (a, b) {
				var v1 = a ? a.value : null,
				    v2 = b ? b.value : null;


				return order === "asc" ? v1 - v2 : v2 - v1;
			});
		} else (0, _util.isFunction)(order) && d.sort(order);

		for (var row, i = 0, len = d.length; i < len; i++) if ((row = d[i]) && (row.value || row.value === 0) && (text || (title = (0, _util.sanitise)(titleFormat ? titleFormat(row.x) : row.x), text = title || title === 0 ? "<tr><th colspan=\"2\">" + title + "</th></tr>" : "", text = "<table class=\"" + $$.CLASS.tooltip + "\">" + text), value = (0, _util.sanitise)(valueFormat(row.value, row.ratio, row.id, row.index, d)), value !== undefined)) {
				// Skip elements when their name is set to null
				if (row.name === null) continue;

				name = (0, _util.sanitise)(nameFormat(row.name, row.ratio, row.id, row.index)), bgcolor = $$.levelColor ? $$.levelColor(row.value) : color(row.id), text += "<tr class=\"" + $$.CLASS.tooltipName + $$.getTargetSelectorSuffix(row.id) + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + bgcolor + "\"></span>" + name + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + value + "</td>\n\t\t\t\t\t\t</tr>";
			}

		return text + "</table>";
	},


	/**
  * Returns the position of the tooltip
  * @private
  * @param {Object} data
  * @param {String} width
  * @param {String} hHeight
  * @param {HTMLElement} element
  * @returns {Object} top, left value
  */
	tooltipPosition: function tooltipPosition(dataToShow, tWidth, tHeight, element) {
		var $$ = this,
		    config = $$.config,
		    forArc = $$.hasArcType(),
		    isTouch = $$.inputType === "touch",
		    mouse = (0, _d.mouse)(element),
		    svgLeft = void 0,
		    tooltipLeft = void 0,
		    tooltipRight = void 0,
		    tooltipTop = void 0,
		    chartRight = void 0;

		// Determin tooltip position


		return forArc ? (tooltipLeft = isTouch ? mouse[0] : ($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2 + mouse[0], tooltipTop = isTouch ? mouse[1] + 20 : $$.height / 2 + mouse[1] + 20) : (svgLeft = $$.getSvgLeft(!0), config.axis_rotated ? (tooltipLeft = svgLeft + mouse[0] + 100, tooltipRight = tooltipLeft + tWidth, chartRight = $$.currentWidth - $$.getCurrentPaddingRight(), tooltipTop = $$.x(dataToShow[0].x) + 20) : (tooltipLeft = svgLeft + $$.getCurrentPaddingLeft(!0) + $$.x(dataToShow[0].x) + 20, tooltipRight = tooltipLeft + tWidth, chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight(), tooltipTop = mouse[1] + 15), tooltipRight > chartRight && (tooltipLeft -= tooltipRight - chartRight + 20), tooltipTop + tHeight > $$.currentHeight && (tooltipTop -= tHeight + 30)), tooltipTop < 0 && (tooltipTop = 0), {
			top: tooltipTop,
			left: tooltipLeft
		};
	},


	/**
  * Show the tooltip
  * @private
  * @param {Object} data
  * @param {HTMLElement} element
  */
	showTooltip: function showTooltip(selectedData, element) {
		var $$ = this,
		    config = $$.config,
		    forArc = $$.hasArcType(),
		    dataToShow = selectedData.filter(function (d) {
			return d && (0, _util.isValue)(d.value);
		}),
		    positionFunction = config.tooltip_position || $$.tooltipPosition;


		if (dataToShow.length !== 0 && config.tooltip_show) {
				$$.tooltip.html(config.tooltip_contents.call($$, selectedData, $$.axis.getXAxisTickFormat(), $$.getYFormat(forArc), $$.color)).style("display", "block");


				// Get tooltip dimensions
				var tWidth = $$.tooltip.property("offsetWidth"),
				    tHeight = $$.tooltip.property("offsetHeight"),
				    position = positionFunction.call(this, dataToShow, tWidth, tHeight, element);
				$$.tooltip.style("top", position.top + "px").style("left", position.left + "px");
			}

		// Set tooltip
	},


	/**
  * Hide the tooltip
  * @private
  */
	hideTooltip: function hideTooltip() {
		this.tooltip.style("display", "none");
	}
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initialize the legend.
  * @private
  */
	initLegend: function initLegend() {
		var $$ = this,
		    config = $$.config;
		$$.legendItemTextBox = {}, $$.legendHasRendered = !1, $$.legend = $$.svg.append("g"), config.legend_show ? config.legend_contents_bindto && config.legend_contents_template ? $$.updateLegendTemplate() : ($$.legend.attr("transform", $$.getTranslate("legend")), $$.updateLegendWithDefaults()) : ($$.legend.style("visibility", "hidden"), $$.hiddenLegendIds = $$.mapToIds($$.data.targets));
	},


	/**
  * Update legend using template option
  * @private
  */
	updateLegendTemplate: function updateLegendTemplate() {
		var $$ = this,
		    config = $$.config,
		    wrapper = (0, _d.select)(config.legend_contents_bindto),
		    template = config.legend_contents_template;


		if (!wrapper.empty()) {
			var targets = $$.mapToIds($$.data.targets),
			    ids = [],
			    html = "";
			targets.forEach(function (v) {
				var content = (0, _util.isFunction)(template) ? template.call($$, v, $$.color(v)) : template.replace(/{=COLOR}/g, $$.color(v)).replace(/{=TITLE}/g, v);

				content && (ids.push(v), html += content);
			});


			var legendItem = wrapper.html(html).selectAll(function () {
				return this.childNodes;
			}).data(ids);

			$$.setLegendItem(legendItem);
		}
	},


	/**
  * Update the legend to its default value.
  * @private
  */
	updateLegendWithDefaults: function updateLegendWithDefaults() {
		var $$ = this;

		$$.updateLegend($$.mapToIds($$.data.targets), {
			withTransform: !1,
			withTransitionForTransform: !1,
			withTransition: !1
		});
	},


	/**
  * Update the size of the legend.
  * @private
  * @param {Number} height
  * @param {Number} width
  */
	updateSizeForLegend: function updateSizeForLegend(legendHeight, legendWidth) {
		var $$ = this,
		    config = $$.config,
		    insetLegendPosition = {
			top: $$.isLegendTop ? $$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 : $$.currentHeight - legendHeight - $$.getCurrentPaddingBottom() - config.legend_inset_y,
			left: $$.isLegendLeft ? $$.getCurrentPaddingLeft() + config.legend_inset_x + 0.5 : $$.currentWidth - legendWidth - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5
		};
		$$.margin3 = {
			top: $$.isLegendRight ? 0 : $$.isLegendInset ? insetLegendPosition.top : $$.currentHeight - legendHeight,
			right: NaN,
			bottom: 0,
			left: $$.isLegendRight ? $$.currentWidth - legendWidth : $$.isLegendInset ? insetLegendPosition.left : 0
		};
	},


	/**
  * Transform Legend
  * @private
  * @param {Boolean} whether or not to transition.
  */
	transformLegend: function transformLegend(withTransition) {
		var $$ = this;

		(withTransition ? $$.legend.transition() : $$.legend).attr("transform", $$.getTranslate("legend"));
	},


	/**
  * Update the legend step
  * @private
  * @param {Number} step
  */
	updateLegendStep: function updateLegendStep(step) {
		this.legendStep = step;
	},


	/**
  * Update legend item width
  * @private
  * @param {Number} width
  */
	updateLegendItemWidth: function updateLegendItemWidth(w) {
		this.legendItemWidth = w;
	},


	/**
  * Update legend item height
  * @private
  * @param {Number} height
  */
	updateLegendItemHeight: function updateLegendItemHeight(h) {
		this.legendItemHeight = h;
	},


	/**
  * Get the width of the legend
  * @private
  * @param {Number} width
  */
	getLegendWidth: function getLegendWidth() {
		var $$ = this;

		return $$.config.legend_show ? $$.isLegendRight || $$.isLegendInset ? $$.legendItemWidth * ($$.legendStep + 1) : $$.currentWidth : 0;
	},


	/**
  * Get the height of the legend
  * @private
  * @param {Number} height
  */
	getLegendHeight: function getLegendHeight() {
		var $$ = this,
		    h = 0;

		return $$.config.legend_show && ($$.isLegendRight ? h = $$.currentHeight : h = Math.max(20, $$.legendItemHeight) * ($$.legendStep + 1)), h;
	},


	/**
  * Get the opacity of the legend
  * @private
  * @param {Object} d3.Select
  * @returns {Number} opacity
  */
	opacityForLegend: function opacityForLegend(legendItem) {
		return legendItem.classed(_classes2.default.legendItemHidden) ? null : "1";
	},


	/**
  * Get the opacity of the legend that is unfocused
  * @private
  * @param {Object} legendItem, d3.Select
  * @returns {Number} opacity
  */
	opacityForUnfocusedLegend: function opacityForUnfocusedLegend(legendItem) {
		return legendItem.classed(_classes2.default.legendItemHidden) ? null : "0.3";
	},


	/**
  * Toggles the focus of the legend
  * @private
  * @param {Array} ID's of target
  * @param {Boolean} whether or not to focus.
  */
	toggleFocusLegend: function toggleFocusLegend(targetIds, focus) {
		var $$ = this,
		    targetIdz = $$.mapToTargetIds(targetIds);
		$$.legend.selectAll("." + _classes2.default.legendItem).filter(function (id) {
			return targetIdz.indexOf(id) >= 0;
		}).classed(_classes2.default.legendItemFocused, focus).transition().duration(100).style("opacity", function () {
			var opacity = focus ? $$.opacityForLegend : $$.opacityForUnfocusedLegend;

			return opacity.call($$, (0, _d.select)(this));
		});
	},


	/**
  * Revert the legend to its default state
  * @private
  */
	revertLegend: function revertLegend() {
		var $$ = this;

		$$.legend.selectAll("." + _classes2.default.legendItem).classed(_classes2.default.legendItemFocused, !1).transition().duration(100).style("opacity", function () {
			return $$.opacityForLegend((0, _d.select)(this));
		});
	},


	/**
  * Shows the legend
  * @private
  * @param {Array} ID's of target
  */
	showLegend: function showLegend(targetIds) {
		var $$ = this,
		    config = $$.config;
		config.legend_show || (config.legend_show = !0, $$.legend.style("visibility", "visible"), !$$.legendHasRendered && $$.updateLegendWithDefaults()), $$.removeHiddenLegendIds(targetIds), $$.legend.selectAll($$.selectorLegends(targetIds)).style("visibility", "visible").transition().style("opacity", function () {
			return $$.opacityForLegend((0, _d.select)(this));
		});
	},


	/**
  * Hide the legend
  * @private
  * @param {Array} ID's of target
  */
	hideLegend: function hideLegend(targetIds) {
		var $$ = this,
		    config = $$.config;
		config.legend_show && (0, _util.isEmpty)(targetIds) && (config.legend_show = !1, $$.legend.style("visibility", "hidden")), $$.addHiddenLegendIds(targetIds), $$.legend.selectAll($$.selectorLegends(targetIds)).style("opacity", "0").style("visibility", "hidden");
	},


	/**
  * Clear the LegendItemTextBox cache.
  * @private
  */
	clearLegendItemTextBoxCache: function clearLegendItemTextBoxCache() {
		this.legendItemTextBox = {};
	},


	/**
  * Set legend item style & bind events
  * @private
  * @param {d3.selection} item
  */
	setLegendItem: function setLegendItem(item) {
		var $$ = this,
		    config = $$.config,
		    isTouch = $$.inputType === "touch";
		item.attr("class", function (id) {
			return $$.generateClass(_classes2.default.legendItem, id);
		}).style("visibility", function (id) {
			return $$.isLegendToShow(id) ? "visible" : "hidden";
		}).style("cursor", "pointer").on("click", function (id) {
			(0, _util.isFunction)(config.legend_item_onclick) ? config.legend_item_onclick.call($$, id) : _d.event.altKey ? ($$.api.hide(), $$.api.show(id)) : ($$.api.toggle(id), !isTouch && $$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert()), isTouch && $$.hideTooltip();
		}), isTouch || item.on("mouseout", function (id) {
			(0, _util.isFunction)(config.legend_item_onout) ? config.legend_item_onout.call($$, id) : ((0, _d.select)(this).classed(_classes2.default.legendItemFocused, !1), $$.api.revert());
		}).on("mouseover", function (id) {
			(0, _util.isFunction)(config.legend_item_onover) ? config.legend_item_onover.call($$, id) : ((0, _d.select)(this).classed(_classes2.default.legendItemFocused, !0), !$$.transiting && $$.isTargetToShow(id) && $$.api.focus(id));
		});
	},


	/**
  * Update the legend
  * @private
  * @param {Array} ID's of target
  * @param {Object} withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
  * @param {Object} the return value of the generateTransitions
  */
	updateLegend: function updateLegend(targetIds, options, transitions) {
		var $$ = this,
		    config = $$.config,
		    posMin = 10,
		    tileWidth = config.legend_item_tile_width + 5,
		    maxWidth = 0,
		    maxHeight = 0,
		    xForLegend = void 0,
		    yForLegend = void 0,
		    totalLength = 0,
		    offsets = {},
		    widths = {},
		    heights = {},
		    margins = [0],
		    steps = {},
		    step = 0,
		    background = void 0,
		    targetIdz = targetIds.filter(function (id) {
			return !(0, _util.isDefined)(config.data_names[id]) || config.data_names[id] !== null;
		}),
		    optionz = options || {},
		    withTransition = (0, _util.getOption)(optionz, "withTransition", !0),
		    withTransitionForTransform = (0, _util.getOption)(optionz, "withTransitionForTransform", !0),
		    getTextBox = function (textElement, id) {
			return $$.legendItemTextBox[id] || ($$.legendItemTextBox[id] = $$.getTextRect(textElement.textContent, _classes2.default.legendItem, textElement)), $$.legendItemTextBox[id];
		},
		    updatePositions = function (textElement, id, index) {
			var isLast = index === targetIdz.length - 1,
			    box = getTextBox(textElement, id),
			    itemWidth = box.width + tileWidth + (isLast && !($$.isLegendRight || $$.isLegendInset) ? 0 : 10) + config.legend_padding,
			    itemHeight = box.height + 4,
			    itemLength = $$.isLegendRight || $$.isLegendInset ? itemHeight : itemWidth,
			    areaLength = $$.isLegendRight || $$.isLegendInset ? $$.getLegendHeight() : $$.getLegendWidth(),
			    margin = void 0,
			    updateValues = function (id2, withoutStep) {
				withoutStep || (margin = (areaLength - totalLength - itemLength) / 2, margin < posMin && (margin = (areaLength - itemLength) / 2, totalLength = 0, step++)), steps[id2] = step, margins[step] = $$.isLegendInset ? 10 : margin, offsets[id2] = totalLength, totalLength += itemLength;
			};

			// MEMO: care about condifion of step, totalLength


			if (index === 0 && (totalLength = 0, step = 0, maxWidth = 0, maxHeight = 0), config.legend_show && !$$.isLegendToShow(id)) return widths[id] = 0, heights[id] = 0, steps[id] = 0, void (offsets[id] = 0);

			widths[id] = itemWidth, heights[id] = itemHeight, (!maxWidth || itemWidth >= maxWidth) && (maxWidth = itemWidth), (!maxHeight || itemHeight >= maxHeight) && (maxHeight = itemHeight);


			var maxLength = $$.isLegendRight || $$.isLegendInset ? maxHeight : maxWidth;

			config.legend_equally ? (Object.keys(widths).forEach(function (id2) {
				return widths[id2] = maxWidth;
			}), Object.keys(heights).forEach(function (id2) {
				return heights[id2] = maxHeight;
			}), margin = (areaLength - maxLength * targetIdz.length) / 2, margin < posMin ? (totalLength = 0, step = 0, targetIdz.forEach(function (id2) {
				return updateValues(id2);
			})) : updateValues(id, !0)) : updateValues(id);
		};
		// Skip elements when their name is set to null
		$$.isLegendInset && (step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length, $$.updateLegendStep(step)), $$.isLegendRight ? (xForLegend = function (id) {
			return maxWidth * steps[id];
		}, yForLegend = function (id) {
			return margins[steps[id]] + offsets[id];
		}) : $$.isLegendInset ? (xForLegend = function (id) {
			return maxWidth * steps[id] + 10;
		}, yForLegend = function (id) {
			return margins[steps[id]] + offsets[id];
		}) : (xForLegend = function (id) {
			return margins[steps[id]] + offsets[id];
		}, yForLegend = function (id) {
			return maxHeight * steps[id];
		});


		var xForLegendText = function (id, i) {
			return xForLegend(id, i) + 4 + config.legend_item_tile_width;
		},
		    yForLegendText = function (id, i) {
			return yForLegend(id, i) + 9;
		},
		    xForLegendRect = function (id, i) {
			return xForLegend(id, i);
		},
		    yForLegendRect = function (id, i) {
			return yForLegend(id, i) - 5;
		},
		    x1ForLegendTile = function (id, i) {
			return xForLegend(id, i) - 2;
		},
		    x2ForLegendTile = function (id, i) {
			return xForLegend(id, i) - 2 + config.legend_item_tile_width;
		},
		    yForLegendTile = function (id, i) {
			return yForLegend(id, i) + 4;
		},
		    l = $$.legend.selectAll("." + _classes2.default.legendItem).data(targetIdz).enter().append("g");

		// Define g for legend area
		$$.setLegendItem(l), l.append("text").text(function (id) {
			return (0, _util.isDefined)(config.data_names[id]) ? config.data_names[id] : id;
		}).each(function (id, i) {
			updatePositions(this, id, i);
		}).style("pointer-events", "none").attr("x", $$.isLegendRight || $$.isLegendInset ? xForLegendText : -200).attr("y", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendText), l.append("rect").attr("class", _classes2.default.legendItemEvent).style("fill-opacity", "0").attr("x", $$.isLegendRight || $$.isLegendInset ? xForLegendRect : -200).attr("y", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendRect), l.append("line").attr("class", _classes2.default.legendItemTile).style("stroke", $$.color).style("pointer-events", "none").attr("x1", $$.isLegendRight || $$.isLegendInset ? x1ForLegendTile : -200).attr("y1", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendTile).attr("x2", $$.isLegendRight || $$.isLegendInset ? x2ForLegendTile : -200).attr("y2", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendTile).attr("stroke-width", config.legend_item_tile_height), background = $$.legend.select("." + _classes2.default.legendBackground + " rect"), $$.isLegendInset && maxWidth > 0 && background.size() === 0 && (background = $$.legend.insert("g", "." + _classes2.default.legendItem).attr("class", _classes2.default.legendBackground).append("rect"));


		var texts = $$.legend.selectAll("text").data(targetIdz).text(function (id) {
			return (0, _util.isDefined)(config.data_names[id]) ? config.data_names[id] : id;
		}) // MEMO: needed for update
		.each(function (id, i) {
			updatePositions(this, id, i);
		});

		(withTransition ? texts.transition() : texts).attr("x", xForLegendText).attr("y", yForLegendText);


		var rects = $$.legend.selectAll("rect." + _classes2.default.legendItemEvent).data(targetIdz);

		(withTransition ? rects.transition() : rects).attr("width", function (id) {
			return widths[id];
		}).attr("height", function (id) {
			return heights[id];
		}).attr("x", xForLegendRect).attr("y", yForLegendRect);


		var tiles = $$.legend.selectAll("line." + _classes2.default.legendItemTile).data(targetIdz);

		(withTransition ? tiles.transition() : tiles).style("stroke", $$.color).attr("x1", x1ForLegendTile).attr("y1", yForLegendTile).attr("x2", x2ForLegendTile).attr("y2", yForLegendTile), background && (withTransition ? background.transition() : background).attr("height", $$.getLegendHeight() - 12).attr("width", maxWidth * (step + 1) + 10), $$.legend.selectAll("." + _classes2.default.legendItem).classed(_classes2.default.legendItemHidden, function (id) {
			return !$$.isTargetToShow(id);
		}), $$.updateLegendItemWidth(maxWidth), $$.updateLegendItemHeight(maxHeight), $$.updateLegendStep(step), $$.updateSizes(), $$.updateScales(!withTransition), $$.updateSvgSize(), $$.transformAll(withTransitionForTransform, transitions), $$.legendHasRendered = !0;
	}
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initializes the title
  * @private
  */
	initTitle: function initTitle() {
		var $$ = this;

		$$.title = $$.svg.append("text").text($$.config.title_text).attr("class", $$.CLASS.title);
	},


	/**
  * Redraw title
  * @private
  */
	redrawTitle: function redrawTitle() {
		var $$ = this;

		$$.title.attr("x", $$.xForTitle.bind($$)).attr("y", $$.yForTitle.bind($$));
	},


	/**
  * Returns the x attribute value of the title
  * @private
  * @returns {Number} x attribute value
  */
	xForTitle: function xForTitle() {
		var $$ = this,
		    config = $$.config,
		    position = config.title_position || "left",
		    x = void 0;


		return x = position.indexOf("right") >= 0 ? $$.currentWidth - $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node()).width - config.title_padding.right : position.indexOf("center") >= 0 ? ($$.currentWidth - $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node()).width) / 2 : config.title_padding.left, x;
	},


	/**
  * Returns the y attribute value of the title
  * @private
  * @returns {Number} y attribute value
  */
	yForTitle: function yForTitle() {
		var $$ = this;

		return $$.config.title_padding.top + $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node()).height;
	},


	/**
  * Get title padding
  * @private
  * @returns {Number} padding value
  */
	getTitlePadding: function getTitlePadding() {
		var $$ = this;

		return $$.yForTitle() + $$.config.title_padding.bottom;
	}
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	getClipPath: function getClipPath(id) {
		var isIE9 = window.navigator.appVersion.toLowerCase().indexOf("msie 9.") >= 0;

		return "url(" + (isIE9 ? "" : document.URL.split("#")[0]) + "#" + id + ")";
	},
	appendClip: function appendClip(parent, id) {
		return parent.append("clipPath").attr("id", id).append("rect");
	},
	getAxisClipX: function getAxisClipX(forHorizontal) {
		// axis line width + padding for left
		var left = Math.max(30, this.margin.left);

		return forHorizontal ? -(1 + left) : -(left - 1);
	},
	getAxisClipY: function getAxisClipY(forHorizontal) {
		return forHorizontal ? -20 : -this.margin.top;
	},
	getXAxisClipX: function getXAxisClipX() {
		var $$ = this;

		return $$.getAxisClipX(!$$.config.axis_rotated);
	},
	getXAxisClipY: function getXAxisClipY() {
		var $$ = this;

		return $$.getAxisClipY(!$$.config.axis_rotated);
	},
	getYAxisClipX: function getYAxisClipX() {
		var $$ = this;

		return $$.config.axis_y_inner ? -1 : $$.getAxisClipX($$.config.axis_rotated);
	},
	getYAxisClipY: function getYAxisClipY() {
		var $$ = this;

		return $$.getAxisClipY($$.config.axis_rotated);
	},
	getAxisClipWidth: function getAxisClipWidth(forHorizontal) {
		var $$ = this,
		    left = Math.max(30, $$.margin.left),
		    right = Math.max(30, $$.margin.right);


		// width + axis line width + padding for left/right
		return forHorizontal ? $$.width + 2 + left + right : $$.margin.left + 20;
	},
	getAxisClipHeight: function getAxisClipHeight(forHorizontal) {
		// less than 20 is not enough to show the axis label 'outer' without legend
		return (forHorizontal ? this.margin.bottom : this.margin.top + this.height) + 20;
	},
	getXAxisClipWidth: function getXAxisClipWidth() {
		var $$ = this;

		return $$.getAxisClipWidth(!$$.config.axis_rotated);
	},
	getXAxisClipHeight: function getXAxisClipHeight() {
		var $$ = this;

		return $$.getAxisClipHeight(!$$.config.axis_rotated);
	},
	getYAxisClipWidth: function getYAxisClipWidth() {
		var $$ = this;

		return $$.getAxisClipWidth($$.config.axis_rotated) + ($$.config.axis_y_inner ? 20 : 0);
	},
	getYAxisClipHeight: function getYAxisClipHeight() {
		var $$ = this;

		return $$.getAxisClipHeight($$.config.axis_rotated);
	}
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initPie: function initPie() {
		var $$ = this,
		    config = $$.config;
		$$.pie = (0, _d.pie)().padAngle(config[config.data_type + "_padAngle"] || 0).value(function (d) {
			return d.values.reduce(function (a, b) {
				return a + b.value;
			}, 0);
		}), config.data_order || $$.pie.sort(null);
	},
	updateRadius: function updateRadius() {
		var $$ = this,
		    config = $$.config,
		    w = config.gauge_width || config.donut_width;
		$$.radiusExpanded = Math.min($$.arcWidth, $$.arcHeight) / 2, $$.radius = $$.radiusExpanded * 0.95, $$.innerRadiusRatio = w ? ($$.radius - w) / $$.radius : 0.6, $$.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ? $$.radius * $$.innerRadiusRatio : 0;
	},
	updateArc: function updateArc() {
		var $$ = this;

		$$.svgArc = $$.getSvgArc(), $$.svgArcExpanded = $$.getSvgArcExpanded(), $$.svgArcExpandedSub = $$.getSvgArcExpanded(0.98);
	},
	updateAngle: function updateAngle(dValue) {
		var $$ = this,
		    config = $$.config,
		    d = dValue,
		    found = !1,
		    index = 0,
		    gMin = void 0,
		    gMax = void 0,
		    gTic = void 0,
		    gValue = void 0;
		return config ? ($$.pie($$.filterTargetsToShow($$.data.targets)).forEach(function (t) {
			found || t.data.id !== d.data.id || (found = !0, d = t, d.index = index), index++;
		}), isNaN(d.startAngle) && (d.startAngle = 0), isNaN(d.endAngle) && (d.endAngle = d.startAngle), $$.isGaugeType(d.data) && (gMin = config.gauge_min, gMax = config.gauge_max, gTic = Math.PI * (config.gauge_fullCircle ? 2 : 1) / (gMax - gMin), gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : gMax - gMin, d.startAngle = config.gauge_startingAngle, d.endAngle = d.startAngle + gTic * gValue), found ? d : null) : null;
	},
	getSvgArc: function getSvgArc() {
		var $$ = this,
		    arc = (0, _d.arc)().outerRadius($$.radius).innerRadius($$.innerRadius),
		    newArc = function (d, withoutUpdate) {
			if (withoutUpdate) return arc(d); // for interpolate

			var updated = $$.updateAngle(d);

			return updated ? arc(updated) : "M 0 0";
		};

		// TODO: extends all function


		return newArc.centroid = arc.centroid, newArc;
	},
	getSvgArcExpanded: function getSvgArcExpanded(rate) {
		var $$ = this,
		    arc = (0, _d.arc)().outerRadius($$.radiusExpanded * (rate || 1)).innerRadius($$.innerRadius);


		return function (d) {
			var updated = $$.updateAngle(d);

			return updated ? arc(updated) : "M 0 0";
		};
	},
	getArc: function getArc(d, withoutUpdate, force) {
		return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
	},
	transformForArcLabel: function transformForArcLabel(d) {
		var $$ = this,
		    config = $$.config,
		    updated = $$.updateAngle(d),
		    c = void 0,
		    x = void 0,
		    y = void 0,
		    h = void 0,
		    ratio = void 0,
		    translate = "";

		return updated && !$$.hasType("gauge") && (c = this.svgArc.centroid(updated), x = isNaN(c[0]) ? 0 : c[0], y = isNaN(c[1]) ? 0 : c[1], h = Math.sqrt(x * x + y * y), ratio = $$.hasType("donut") && config.donut_label_ratio ? (0, _util.isFunction)(config.donut_label_ratio) ? config.donut_label_ratio(d, $$.radius, h) : config.donut_label_ratio : $$.hasType("pie") && config.pie_label_ratio ? (0, _util.isFunction)(config.pie_label_ratio) ? config.pie_label_ratio(d, $$.radius, h) : config.pie_label_ratio : $$.radius && (h ? (36 / $$.radius > 0.375 ? 1.175 - 36 / $$.radius : 0.8) * $$.radius / h : 0), translate = "translate(" + x * ratio + "," + y * ratio + ")"), translate;
	},
	getArcRatio: function getArcRatio(d) {
		var $$ = this,
		    config = $$.config,
		    whole = Math.PI * ($$.hasType("gauge") && !config.gauge_fullCircle ? 1 : 2);


		return d ? (d.endAngle - d.startAngle) / whole : null;
	},
	convertToArcData: function convertToArcData(d) {
		return this.addName({
			id: d.data.id,
			value: d.value,
			ratio: this.getArcRatio(d),
			index: d.index
		});
	},
	textForArcLabel: function textForArcLabel(d) {
		var $$ = this;

		if (!$$.shouldShowArcLabel()) return "";

		var updated = $$.updateAngle(d),
		    value = updated ? updated.value : null,
		    ratio = $$.getArcRatio(updated),
		    id = d.data.id;


		if (!$$.hasType("gauge") && !$$.meetsArcLabelThreshold(ratio)) return "";

		var format = $$.getArcLabelFormat();

		return format ? format(value, ratio, id) : $$.defaultArcValueFormat(value, ratio);
	},
	textForGaugeMinMax: function textForGaugeMinMax(value, isMax) {
		var format = this.getGaugeLabelExtents();

		return format ? format(value, isMax) : value;
	},
	expandArc: function expandArc(targetIds) {
		var $$ = this,
		    interval = void 0;


		// MEMO: avoid to cancel transition
		if ($$.transiting) return void (interval = window.setInterval(function () {
				$$.transiting || (window.clearInterval(interval), $$.legend.selectAll(".bb-legend-item-focused").size() > 0 && $$.expandArc(targetIds));
			}, 10));

		var newTargetIds = $$.mapToTargetIds(targetIds);

		$$.svg.selectAll($$.selectorTargets(newTargetIds, "." + _classes2.default.chartArc)).each(function (d) {
			$$.shouldExpand(d.data.id) && (0, _d.select)(this).selectAll("path").transition().duration($$.expandDuration(d.data.id)).attr("d", $$.svgArcExpanded).transition().duration($$.expandDuration(d.data.id) * 2).attr("d", $$.svgArcExpandedSub);
		});
	},
	unexpandArc: function unexpandArc(targetIds) {
		var $$ = this;

		if (!$$.transiting) {

				var newTargetIds = $$.mapToTargetIds(targetIds);

				$$.svg.selectAll($$.selectorTargets(newTargetIds, "." + _classes2.default.chartArc)).selectAll("path").transition().duration(function (d) {
					return $$.expandDuration(d.data.id);
				}).attr("d", $$.svgArc), $$.svg.selectAll("" + _classes2.default.arc).style("opacity", "1");
			}
	},
	expandDuration: function expandDuration(id) {
		var $$ = this,
		    config = $$.config;
		return $$.isDonutType(id) ? config.donut_expand_duration : $$.isGaugeType(id) ? config.gauge_expand_duration : $$.isPieType(id) ? config.pie_expand_duration : 50;
	},
	shouldExpand: function shouldExpand(id) {
		var $$ = this,
		    config = $$.config;


		return $$.isDonutType(id) && config.donut_expand || $$.isGaugeType(id) && config.gauge_expand || $$.isPieType(id) && config.pie_expand;
	},
	shouldShowArcLabel: function shouldShowArcLabel() {
		var $$ = this,
		    config = $$.config,
		    shouldShow = !0;


		// when gauge, always true
		return $$.hasType("donut") ? shouldShow = config.donut_label_show : $$.hasType("pie") && (shouldShow = config.pie_label_show), shouldShow;
	},
	meetsArcLabelThreshold: function meetsArcLabelThreshold(ratio) {
		var $$ = this,
		    config = $$.config,
		    threshold = $$.hasType("donut") ? config.donut_label_threshold : config.pie_label_threshold;


		return ratio >= threshold;
	},
	getArcLabelFormat: function getArcLabelFormat() {
		var $$ = this,
		    config = $$.config,
		    format = config.pie_label_format;


		return $$.hasType("gauge") ? format = config.gauge_label_format : $$.hasType("donut") && (format = config.donut_label_format), format;
	},
	getGaugeLabelExtents: function getGaugeLabelExtents() {
		var config = this.config;

		return config.gauge_label_extents;
	},
	getArcTitle: function getArcTitle() {
		var $$ = this;

		return $$.hasType("donut") ? $$.config.donut_title : "";
	},
	updateTargetsForArc: function updateTargetsForArc(targets) {
		var $$ = this,
		    main = $$.main,
		    classChartArc = $$.classChartArc.bind($$),
		    classArcs = $$.classArcs.bind($$),
		    classFocus = $$.classFocus.bind($$),
		    mainPieUpdate = main.select("." + _classes2.default.chartArcs).selectAll("." + _classes2.default.chartArc).data($$.pie(targets)).attr("class", function (d) {
			return classChartArc(d) + classFocus(d.data);
		}),
		    mainPieEnter = mainPieUpdate.enter().append("g").attr("class", classChartArc);
		mainPieEnter.append("g").attr("class", classArcs).merge(mainPieUpdate), mainPieEnter.append("text").attr("dy", $$.hasType("gauge") ? "-.1em" : ".35em").style("opacity", "0").style("text-anchor", "middle").style("pointer-events", "none");
	},
	initArc: function initArc() {
		var $$ = this;

		$$.arcs = $$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartArcs).attr("transform", $$.getTranslate("arc")), $$.setArcTitle();
	},


	/**
  * Set arc title text
  * @private
  */
	setArcTitle: function setArcTitle() {
		var $$ = this,
		    title = $$.getArcTitle();


		if (title) {
			var multiline = title.split("\n"),
			    text = $$.arcs.append("text").attr("class", _classes2.default.chartArcsTitle).style("text-anchor", "middle");


			// if is multiline text
			if (multiline.length > 1) {
				var fontSize = +text.style("font-size").replace("px", ""),
				    height = Math.floor(text.text(".").node().getBBox().height, text.text(""));
				multiline.forEach(function (v, i) {
					return text.insert("tspan").text(v).attr("x", 0).attr("dy", i ? height : 0);
				}), text.attr("y", "-" + (fontSize * (multiline.length - 2) || fontSize / 2));
			} else text.text(title);
		}
	},
	redrawArc: function redrawArc(duration, durationForExit, withTransform) {

		function selectArc(_this, arcData, id) {
			$$.expandArc(id), $$.api.focus(id), $$.toggleFocusLegend(id, !0), $$.showTooltip([arcData], _this);
		}

		function unselectArc(arcData) {
			var id = arcData && arcData.id || undefined;

			$$.unexpandArc(id), $$.api.revert(), $$.revertLegend(), $$.hideTooltip();
		}

		var $$ = this,
		    config = $$.config,
		    main = $$.main,
		    isTouch = $$.inputType === "touch",
		    isMouse = $$.inputType === "mouse",
		    mainArc = main.selectAll("." + _classes2.default.arcs).selectAll("." + _classes2.default.arc).data($$.arcData.bind($$));


		if (mainArc.exit().transition().duration(durationForExit).style("opacity", "0").remove(), mainArc = mainArc.enter().append("path").attr("class", $$.classArc.bind($$)).style("fill", function (d) {
			return $$.color(d.data);
		}).style("cursor", function (d) {
			return config.interaction_enabled && (config.data_selection_isselectable(d) ? "pointer" : null);
		}).style("opacity", "0").each(function (d) {
			$$.isGaugeType(d.data) && (d.startAngle = config.gauge_startingAngle, d.endAngle = config.gauge_startingAngle), this._current = d;
		}).merge(mainArc), mainArc.attr("transform", function (d) {
			return !$$.isGaugeType(d.data) && withTransform ? "scale(0)" : "";
		}).style("opacity", function (d) {
			return d === this._current ? "0" : "1";
		}).each(function () {
			$$.transiting = !0;
		}).transition().duration(duration).attrTween("d", function (d) {
			var updated = $$.updateAngle(d);

			if (!updated) return function () {
					return "M 0 0";
				};

			isNaN(this._current.startAngle) && (this._current.startAngle = 0), isNaN(this._current.endAngle) && (this._current.endAngle = this._current.startAngle);


			var interpolate = (0, _d.interpolate)(this._current, updated);

			return this._current = interpolate(0), function (t) {
				var interpolated = interpolate(t);

				// data.id will be updated by interporator
				return interpolated.data = d.data, $$.getArc(interpolated, !0);
			};
		}).attr("transform", withTransform ? "scale(1)" : "").style("fill", function (d) {
			return $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data.id);
		})
		// Where gauge reading color would receive customization.
		.style("opacity", "1").call($$.endall, function () {
			$$.transiting = !1;
		}), config.interaction_enabled && (mainArc.on("click", function (d, i) {
			var updated = $$.updateAngle(d),
			    arcData = void 0;
			updated && (arcData = $$.convertToArcData(updated), $$.toggleShape && $$.toggleShape(this, arcData, i), $$.config.data_onclick.call($$.api, arcData, this));
		}), isMouse && mainArc.on("mouseover", function (d) {
			if (!$$.transiting) // skip while transiting
				{

					var updated = $$.updateAngle(d),
					    arcData = updated ? $$.convertToArcData(updated) : null,
					    id = arcData && arcData.id || undefined;
					selectArc(this, arcData, id), $$.config.data_onover(arcData, this);
				}
		}).on("mouseout", function (d) {
			if (!$$.transiting) // skip while transiting
				{
					var updated = $$.updateAngle(d),
					    arcData = updated ? $$.convertToArcData(updated) : null;
					unselectArc(), $$.config.data_onout(arcData, this);
				}
		}).on("mousemove", function (d) {
			var updated = $$.updateAngle(d),
			    arcData = updated ? $$.convertToArcData(updated) : null;
			$$.showTooltip([arcData], this);
		}), isTouch && $$.hasArcType())) {
				var _getEventArc = function () {
					var touch = _d.event.changedTouches[0],
					    eventArc = (0, _d.select)(document.elementFromPoint(touch.clientX, touch.clientY));


					return eventArc;
				};

				$$.svg.on("touchstart", function () {
					if (!$$.transiting) // skip while transiting
						{

							var eventArc = _getEventArc(),
							    datum = eventArc.datum(),
							    updated = datum && datum.data && datum.data.id ? $$.updateAngle(datum) : null,
							    arcData = updated ? $$.convertToArcData(updated) : null,
							    id = arcData && arcData.id || undefined;
							id === undefined ? unselectArc() : selectArc(this, arcData, id), $$.config.data_onover(arcData, this);
						}
				}).on("touchend", function () {
					if (!$$.transiting) // skip while transiting
						{

							var eventArc = _getEventArc(),
							    datum = eventArc.datum(),
							    updated = datum && datum.data && datum.data.id ? $$.updateAngle(datum) : null,
							    arcData = updated ? $$.convertToArcData(updated) : null,
							    id = arcData && arcData.id || undefined;
							id === undefined ? unselectArc() : selectArc(this, arcData, id), $$.config.data_onout(arcData, this);
						}
				}).on("touchmove", function () {
					var eventArc = _getEventArc(),
					    datum = eventArc.datum(),
					    updated = datum && datum.data && datum.data.id ? $$.updateAngle(datum) : null,
					    arcData = updated ? $$.convertToArcData(updated) : null,
					    id = arcData && arcData.id || undefined;
					id === undefined ? unselectArc() : selectArc(this, arcData, id);
				});
			}

		var gaugeTextValue = main.selectAll("." + _classes2.default.chartArc).select("text").style("opacity", "0").attr("class", function (d) {
			return $$.isGaugeType(d.data) ? _classes2.default.gaugeValue : "";
		});

		if (config.gauge_fullCircle && gaugeTextValue.attr("dy", "" + Math.round($$.radius / 14)), gaugeTextValue.text($$.textForArcLabel.bind($$)).attr("transform", $$.transformForArcLabel.bind($$)).style("font-size", function (d) {
			return $$.isGaugeType(d.data) ? Math.round($$.radius / 5) + "px" : "";
		}).transition().duration(duration).style("opacity", function (d) {
			return $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? "1" : "0";
		}), main.select("." + _classes2.default.chartArcsTitle).style("opacity", $$.hasType("donut") || $$.hasType("gauge") ? "1" : "0"), $$.hasType("gauge")) {
			var endAngle = (config.gauge_fullCircle ? -4 : -1) * config.gauge_startingAngle;

			$$.arcs.select("." + _classes2.default.chartArcsBackground).attr("d", function () {
				var d = {
					data: [{ value: config.gauge_max }],
					startAngle: config.gauge_startingAngle,
					endAngle: endAngle
				};

				return $$.getArc(d, !0, !0);
			}), $$.arcs.select("." + _classes2.default.chartArcsGaugeUnit).attr("dy", ".75em").text(config.gauge_label_show ? config.gauge_units : ""), config.gauge_label_show && ($$.arcs.select("." + _classes2.default.chartArcsGaugeMin).attr("dx", -1 * ($$.innerRadius + ($$.radius - $$.innerRadius) / (config.gauge_fullCircle ? 1 : 2)) + "px").attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_min, !1)), !config.gauge_fullCircle && $$.arcs.select("." + _classes2.default.chartArcsGaugeMax).attr("dx", $$.innerRadius + ($$.radius - $$.innerRadius) / 2 + "px").attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_max, !0)));
		}
	},
	initGauge: function initGauge() {
		var $$ = this,
		    config = $$.config,
		    arcs = $$.arcs;
		$$.hasType("gauge") && (arcs.append("path").attr("class", _classes2.default.chartArcsBackground), arcs.append("text").attr("class", _classes2.default.chartArcsGaugeUnit).style("text-anchor", "middle").style("pointer-events", "none"), config.gauge_label_show && (arcs.append("text").attr("class", _classes2.default.chartArcsGaugeMin).style("text-anchor", "middle").style("pointer-events", "none"), !config.gauge_fullCircle && arcs.append("text").attr("class", _classes2.default.chartArcsGaugeMax).style("text-anchor", "middle").style("pointer-events", "none")));
	},
	getGaugeLabelHeight: function getGaugeLabelHeight() {
		return this.config.gauge_label_show ? 20 : 0;
	}
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initRegion: function initRegion() {
		var $$ = this;

		$$.region = $$.main.append("g").attr("clip-path", $$.clipPath).attr("class", _classes2.default.regions);
	},
	updateRegion: function updateRegion(duration) {
		var $$ = this,
		    config = $$.config;


		// hide if arc type
		$$.region.style("visibility", $$.hasArcType() ? "hidden" : "visible"), $$.mainRegion = $$.main.select("." + _classes2.default.regions).selectAll("." + _classes2.default.region).data(config.regions), $$.mainRegion.exit().transition().duration(duration).style("opacity", "0").remove(), $$.mainRegion = $$.mainRegion.enter().append("g").merge($$.mainRegion).attr("class", $$.classRegion.bind($$)), $$.mainRegion.append("rect").style("fill-opacity", "0");
	},
	redrawRegion: function redrawRegion(withTransition) {
		var $$ = this,
		    x = $$.regionX.bind($$),
		    y = $$.regionY.bind($$),
		    w = $$.regionWidth.bind($$),
		    h = $$.regionHeight.bind($$),
		    regions = $$.mainRegion.select("rect");


		return regions = (withTransition ? regions.transition() : regions).attr("x", x).attr("y", y).attr("width", w).attr("height", h), [(withTransition ? regions.transition() : regions).style("fill-opacity", function (d) {
			return (0, _util.isValue)(d.opacity) ? d.opacity : "0.1";
		}).on("end", function () {
			(0, _d.select)(this.parentNode).selectAll("rect:not([x])").remove();
		})];
	},
	regionX: function regionX(d) {
		var $$ = this,
		    config = $$.config,
		    yScale = d.axis === "y" ? $$.y : $$.y2,
		    xPos = void 0;


		return xPos = d.axis === "y" || d.axis === "y2" ? config.axis_rotated ? "start" in d ? yScale(d.start) : 0 : 0 : config.axis_rotated ? 0 : "start" in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0, xPos;
	},
	regionY: function regionY(d) {
		var $$ = this,
		    config = $$.config,
		    yScale = d.axis === "y" ? $$.y : $$.y2,
		    yPos = void 0;


		return yPos = d.axis === "y" || d.axis === "y2" ? config.axis_rotated ? 0 : "end" in d ? yScale(d.end) : 0 : config.axis_rotated ? "start" in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0 : 0, yPos;
	},
	regionWidth: function regionWidth(d) {
		var $$ = this,
		    config = $$.config,
		    yScale = d.axis === "y" ? $$.y : $$.y2,
		    start = $$.regionX(d),
		    end = void 0;


		return end = d.axis === "y" || d.axis === "y2" ? config.axis_rotated ? "end" in d ? yScale(d.end) : $$.width : $$.width : config.axis_rotated ? $$.width : "end" in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.width, end < start ? 0 : end - start;
	},
	regionHeight: function regionHeight(d) {
		var $$ = this,
		    config = $$.config,
		    start = this.regionY(d),
		    end = void 0,
		    yScale = d.axis === "y" ? $$.y : $$.y2;


		return end = d.axis === "y" || d.axis === "y2" ? config.axis_rotated ? $$.height : "start" in d ? yScale(d.start) : $$.height : config.axis_rotated ? "end" in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.height : $$.height, end < start ? 0 : end - start;
	},
	isRegionOnX: function isRegionOnX(d) {
		return !d.axis || d.axis === "x";
	}
}); // selection

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Called when dragging.
  * Data points can be selected.
  * @private
  * @param {Object} mouse Object
  */
	drag: function drag(mouse) {
		var $$ = this,
		    config = $$.config,
		    main = $$.main;
		// do nothing if not selectable
		// skip when single selection because drag is used for multiple selection

		if (!$$.hasArcType() && config.data_selection_enabled && (!config.zoom_enabled || $$.zoom.altDomain) && config.data_selection_multiple) // skip if zoomable because of conflict drag dehavior
			{
				var sx = $$.dragStart[0],
				    sy = $$.dragStart[1],
				    mx = mouse[0],
				    my = mouse[1],
				    minX = Math.min(sx, mx),
				    maxX = Math.max(sx, mx),
				    minY = config.data_selection_grouped ? $$.margin.top : Math.min(sy, my),
				    maxY = config.data_selection_grouped ? $$.height : Math.max(sy, my);
				main.select("." + _classes2.default.dragarea).attr("x", minX).attr("y", minY).attr("width", maxX - minX).attr("height", maxY - minY), main.selectAll("." + _classes2.default.shapes).selectAll("." + _classes2.default.shape).filter(function (d) {
					return config.data_selection_isselectable(d);
				}).each(function (d, i) {
					var shape = (0, _d.select)(this),
					    isSelected = shape.classed(_classes2.default.SELECTED),
					    isIncluded = shape.classed(_classes2.default.INCLUDED),
					    _x = void 0,
					    _y = void 0,
					    _w = void 0,
					    _h = void 0,
					    toggle = void 0,
					    isWithin = !1,
					    box = void 0;


					if (shape.classed(_classes2.default.circle)) _x = shape.attr("cx") * 1, _y = shape.attr("cy") * 1, toggle = $$.togglePoint, isWithin = minX < _x && _x < maxX && minY < _y && _y < maxY;else if (shape.classed(_classes2.default.bar)) box = (0, _util.getPathBox)(this), _x = box.x, _y = box.y, _w = box.width, _h = box.height, toggle = $$.togglePath, isWithin = !(maxX < _x || _x + _w < minX) && !(maxY < _y || _y + _h < minY);else
						// line/area selection not supported yet
						return;
					isWithin ^ isIncluded && (shape.classed(_classes2.default.INCLUDED, !isIncluded), shape.classed(_classes2.default.SELECTED, !isSelected), toggle.call($$, !isSelected, shape, d, i));
				});
			}
	},


	/**
  * Called when the drag starts.
  * Adds and Shows the drag area.
  * @private
  * @param {Object} mouse Object
  */
	dragstart: function dragstart(mouse) {
		var $$ = this,
		    config = $$.config;
		// do nothing if not selectable
		$$.hasArcType() || !config.data_selection_enabled || ($$.dragStart = mouse, $$.main.select("." + _classes2.default.chart).append("rect").attr("class", _classes2.default.dragarea).style("opacity", "0.1"), $$.dragging = !0);
	},


	/**
  * Called when the drag finishes.
  * Removes the drag area.
  * @private
  */
	dragend: function dragend() {
		var $$ = this,
		    config = $$.config;
		// do nothing if not selectable
		$$.hasArcType() || !config.data_selection_enabled || ($$.main.select("." + _classes2.default.dragarea).transition().duration(100).style("opacity", "0").remove(), $$.main.selectAll("." + _classes2.default.shape).classed(_classes2.default.INCLUDED, !1), $$.dragging = !1);
	}
}); // interpolate

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Select a point
  * @private
  * @param {Object} target point
  * @param {Object} data
  * @param {Number} index
  */
	selectPoint: function selectPoint(target, d, i) {
		var $$ = this,
		    config = $$.config,
		    cx = (config.axis_rotated ? $$.circleY : $$.circleX).bind($$),
		    cy = (config.axis_rotated ? $$.circleX : $$.circleY).bind($$),
		    r = $$.pointSelectR.bind($$);
		config.data_onselected.call($$.api, d, target.node()), $$.main.select("." + _classes2.default.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll("." + _classes2.default.selectedCircle + "-" + i).data([d]).enter().append("circle").attr("class", function () {
			return $$.generateClass(_classes2.default.selectedCircle, i);
		}).attr("cx", cx).attr("cy", cy).attr("stroke", function () {
			return $$.color(d);
		}).attr("r", function (d2) {
			return $$.pointSelectR(d2) * 1.4;
		}).transition().duration(100).attr("r", r);
	},


	/**
  * Unelect a point
  * @private
  * @param {Object} target point
  * @param {Object} data
  * @param {Number} index
  */
	unselectPoint: function unselectPoint(target, d, i) {
		var $$ = this;

		$$.config.data_onunselected.call($$.api, d, target.node()), $$.main.select("." + _classes2.default.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll("." + _classes2.default.selectedCircle + "-" + i).transition().duration(100).attr("r", 0).remove();
	},


	/**
  * Toggles the selection of points
  * @private
  * @param {Boolean} whether or not to select.
  * @param {Object} target point
  * @param {Object} data
  * @param {Number} index
  */
	togglePoint: function togglePoint(selected, target, d, i) {
		selected ? this.selectPoint(target, d, i) : this.unselectPoint(target, d, i);
	},


	/**
  * Select a path
  * @private
  * @param {Object} target path
  * @param {Object} data
  */
	selectPath: function selectPath(target, d) {
		var $$ = this;

		$$.config.data_onselected.call($$, d, target.node()), $$.config.interaction_brighten && target.transition().duration(100).style("fill", function () {
			return (0, _d.rgb)($$.color(d)).brighter(0.75);
		});
	},


	/**
  * Unelect a path
  * @private
  * @param {Object} target path
  * @param {Object} data
  */
	unselectPath: function unselectPath(target, d) {
		var $$ = this;

		$$.config.data_onunselected.call($$, d, target.node()), $$.config.interaction_brighten && target.transition().duration(100).style("fill", function () {
			return $$.color(d);
		});
	},


	/**
  * Toggles the selection of lines
  * @private
  * @param {Boolean} whether or not to select.
  * @param {Object} target shape
  * @param {Object} data
  * @param {Number} index
  */
	togglePath: function togglePath(selected, target, d, i) {
		selected ? this.selectPath(target, d, i) : this.unselectPath(target, d, i);
	},


	/**
  * Returns the toggle method of the target
  * @private
  * @param {Object} target shape
  * @param {Object} data
  * @returns {Function} toggle method
  */
	getToggle: function getToggle(that, d) {
		var $$ = this,
		    toggle = void 0;


		return that.nodeName === "circle" ? $$.isStepType(d) ? toggle = function () {} : toggle = $$.togglePoint : that.nodeName === "path" && (toggle = $$.togglePath), toggle;
	},


	/**
  * Toggles the selection of shapes
  * @private
  * @param {Object} target shape
  * @param {Object} data
  * @param {Number} index
  */
	toggleShape: function toggleShape(that, d, i) {
		var $$ = this,
		    config = $$.config,
		    shape = (0, _d.select)(that),
		    isSelected = shape.classed(_classes2.default.SELECTED),
		    toggle = $$.getToggle(that, d).bind($$),
		    toggledShape = void 0;


		if (config.data_selection_enabled && config.data_selection_isselectable(d)) {
			if (!config.data_selection_multiple) {
				var selecter = "." + _classes2.default.shapes;

				config.data_selection_grouped && (selecter = "." + selecter + $$.getTargetSelectorSuffix(d.id)), $$.main.selectAll("" + selecter).selectAll("circle." + _classes2.default.shape).each(function (d, i) {
					var shape = (0, _d.select)(this);

					shape.classed(_classes2.default.SELECTED) && (toggledShape = shape, toggle(!1, shape.classed(_classes2.default.SELECTED, !1), d, i));
				});
			}

			toggledShape && toggledShape.node() === shape.node() || (shape.classed(_classes2.default.SELECTED, !isSelected), toggle(!isSelected, shape, d, i));
		}
	}
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initialize the brush.
  * @private
  */
	initBrush: function initBrush() {
		var $$ = this;

		// set the brush
		$$.brush = $$.config.axis_rotated ? (0, _d.brushY)() : (0, _d.brushX)();


		// set "brush" event
		var brushHandler = function () {
			$$.redrawForBrush();
		};

		$$.brush.on("start", function () {
			$$.inputType === "touch" && $$.hideTooltip(), brushHandler();
		}).on("brush", brushHandler), $$.brush.update = function () {
			var extent = this.extent()();

			return extent[1].filter(function (v) {
				return isNaN(v);
			}).length === 0 && $$.context && $$.context.select("." + _classes2.default.brush).call(this), this;
		}, $$.brush.scale = function (scale, height) {
			var overlay = $$.svg.select(".bb-brush .overlay"),
			    extent = [[0, 0]];
			scale.range ? extent.push([scale.range()[1], (height || !overlay.empty()) && ~~overlay.attr("height") || 60]) : scale.constructor === Array && extent.push(scale), $$.config.axis_rotated && extent.reverse(), this.extent($$.config.axis_x_extent || extent), this.update();
		}, $$.brush.getSelection = function () {
			return $$.context ? $$.context.select("." + _classes2.default.brush) : (0, _d.select)([]);
		};
	},


	/**
  * Initialize the subchart.
  * @private
  */
	initSubchart: function initSubchart() {
		var $$ = this,
		    config = $$.config,
		    visibility = config.subchart_show ? "visible" : "hidden";
		$$.context = $$.svg.append("g").attr("transform", $$.getTranslate("context"));


		var context = $$.context;

		context.style("visibility", visibility), context.append("g").attr("clip-path", $$.clipPathForSubchart).attr("class", _classes2.default.chart), context.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartBars), context.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartLines), context.append("g").attr("clip-path", $$.clipPath).attr("class", _classes2.default.brush).call($$.brush), $$.axes.subx = context.append("g").attr("class", _classes2.default.axisX).attr("transform", $$.getTranslate("subx")).attr("clip-path", config.axis_rotated ? "" : $$.clipPathForXAxis).style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
	},


	/**
  * Update sub chart
  * @private
  * @param {Object} $$.data.targets
  */
	updateTargetsForSubchart: function updateTargetsForSubchart(targets) {
		var $$ = this,
		    context = $$.context,
		    config = $$.config,
		    classChartBar = $$.classChartBar.bind($$),
		    classBars = $$.classBars.bind($$),
		    classChartLine = $$.classChartLine.bind($$),
		    classLines = $$.classLines.bind($$),
		    classAreas = $$.classAreas.bind($$);


		if (config.subchart_show) {
			// -- Bar --//
			var contextBarUpdate = context.select("." + _classes2.default.chartBars).selectAll("." + _classes2.default.chartBar).data(targets).attr("class", classChartBar),
			    contextBarEnter = contextBarUpdate.enter().append("g").style("opacity", "0").attr("class", classChartBar).merge(contextBarUpdate);


			// Bars for each data
			contextBarEnter.append("g").attr("class", classBars);


			// -- Line --//
			var contextLineUpdate = context.select("." + _classes2.default.chartLines).selectAll("." + _classes2.default.chartLine).data(targets).attr("class", classChartLine),
			    contextLineEnter = contextLineUpdate.enter().append("g").style("opacity", "0").attr("class", classChartLine).merge(contextLineUpdate);


			// Lines for each data
			contextLineEnter.append("g").attr("class", classLines), contextLineEnter.append("g").attr("class", classAreas), context.selectAll("." + _classes2.default.brush + " rect").attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? $$.width2 : $$.height2);
		}
	},


	/**
  * Update the bar of the sub chart
  * @private
  * @param {Object} durationForExit
  */
	updateBarForSubchart: function updateBarForSubchart(durationForExit) {
		var $$ = this;

		$$.contextBar = $$.context.selectAll("." + _classes2.default.bars).selectAll("." + _classes2.default.bar).data($$.barData.bind($$)), $$.contextBar.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.contextBar = $$.contextBar.enter().append("path").attr("class", $$.classBar.bind($$)).style("stroke", "none").style("fill", $$.color).merge($$.contextBar).style("opacity", $$.initialOpacity.bind($$));
	},


	/**
  * Redraw the bar of the subchart
  * @private
  * @param {String} path in subchart bar
  * @param {Boolean} whether or not to transition.
  * @param {Number} transition duration
  */
	redrawBarForSubchart: function redrawBarForSubchart(drawBarOnSub, withTransition, duration) {
		var contextBar = void 0;

		contextBar = withTransition ? this.contextBar.transition(Math.random().toString()).duration(duration) : this.contextBar, contextBar.attr("d", drawBarOnSub).style("opacity", "1");
	},


	/**
  * Update the line of the sub chart
  * @private
  * @param {Number} Fade-out transition duration
  */
	updateLineForSubchart: function updateLineForSubchart(durationForExit) {
		var $$ = this;

		$$.contextLine = $$.context.selectAll("." + _classes2.default.lines).selectAll("." + _classes2.default.line).data($$.lineData.bind($$)), $$.contextLine.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.contextLine = $$.contextLine.enter().append("path").attr("class", $$.classLine.bind($$)).style("stroke", $$.color).merge($$.contextLine).style("opacity", $$.initialOpacity.bind($$));
	},


	/**
  * Redraw the line of the subchart
  * @private
  * @param {String} path in subchart line
  * @param {Boolean} whether or not to transition
  * @param {Number} transition duration
  */
	redrawLineForSubchart: function redrawLineForSubchart(drawLineOnSub, withTransition, duration) {
		var contextLine = void 0;

		contextLine = withTransition ? this.contextLine.transition(Math.random().toString()).duration(duration) : this.contextLine, contextLine.attr("d", drawLineOnSub).style("opacity", "1");
	},


	/**
  * Update the area of the sub chart
  * @private
  * @param {Number} Fade-out transition duration
  */
	updateAreaForSubchart: function updateAreaForSubchart(durationForExit) {
		var $$ = this;

		$$.contextArea = $$.context.selectAll("." + _classes2.default.areas).selectAll("." + _classes2.default.area).data($$.lineData.bind($$)), $$.contextArea.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.contextArea = $$.contextArea.enter().append("path").attr("class", $$.classArea.bind($$)).style("fill", $$.color).style("opacity", function () {
			return $$.orgAreaOpacity = (0, _d.select)(this).style("opacity"), "0";
		}).merge($$.contextArea).style("opacity", "0");
	},

	/**
  * Redraw the area of the subchart
  * @private
  * @param {String} path in subchart line
  * @param {Boolean} whether or not to transition
  * @param {Number} transition duration
  */
	redrawAreaForSubchart: function redrawAreaForSubchart(drawAreaOnSub, withTransition, duration) {
		var contextArea = void 0;

		contextArea = withTransition ? this.contextArea.transition(Math.random().toString()).duration(duration) : this.contextArea, contextArea.attr("d", drawAreaOnSub).style("fill", this.color).style("opacity", this.orgAreaOpacity);
	},


	/**
  * Redraw subchart.
  * @private
  * @param {Boolean} whether or not to show subchart
  * @param Do not use.
  * @param {Number} transition duration
  * @param Do not use.
  * @param {Object} area Indices
  * @param {Object} bar Indices
  * @param {Object} line Indices
  */
	redrawSubchart: function redrawSubchart(withSubchart, transitions, duration, durationForExit, areaIndices, barIndices, lineIndices) {
		var $$ = this,
		    config = $$.config;


		// subchart
		if ($$.context.style("visibility", config.subchart_show ? "visible" : "hidden"), config.subchart_show && (_d.event && _d.event.type === "zoom" && $$.brush.update(), withSubchart))

			// update subchart elements if needed
			{
				$$.brushEmpty() || $$.brush.update();


				// setup drawer - MEMO: this must be called after axis updated
				var _drawAreaOnSub = $$.generateDrawArea(areaIndices, !0),
				    _drawBarOnSub = $$.generateDrawBar(barIndices, !0),
				    _drawLineOnSub = $$.generateDrawLine(lineIndices, !0);
				$$.updateBarForSubchart(duration), $$.updateLineForSubchart(duration), $$.updateAreaForSubchart(duration), $$.redrawBarForSubchart(_drawBarOnSub, duration, duration), $$.redrawLineForSubchart(_drawLineOnSub, duration, duration), $$.redrawAreaForSubchart(_drawAreaOnSub, duration, duration);
			}
	},

	/**
  * Redraw the brush.
  * @private
  */
	redrawForBrush: function redrawForBrush() {
		var $$ = this,
		    x = $$.x;
		$$.redraw({
			withTransition: !1,
			withY: $$.config.zoom_rescale,
			withSubchart: !1,
			withUpdateXDomain: !0,
			withDimension: !1
		}), $$.config.subchart_onbrush.call($$.api, x.orgDomain());
	},


	/**
  * Transform context
  * @private
  * @param {Boolean} indicates transition is enabled
  * @param {Object} The return value of the generateTransitions method of Axis.
  */
	transformContext: function transformContext(withTransition, transitions) {
		var $$ = this,
		    subXAxis = void 0;
		transitions && transitions.axisSubX ? subXAxis = transitions.axisSubX : (subXAxis = $$.context.select("." + _classes2.default.axisX), withTransition && (subXAxis = subXAxis.transition())), $$.context.attr("transform", $$.getTranslate("context")), subXAxis.attr("transform", $$.getTranslate("subx"));
	},


	/**
  * Get default extent
  * @private
  * @returns {Array} default extent
  */
	getDefaultExtent: function getDefaultExtent() {
		var $$ = this,
		    config = $$.config,
		    extent = (0, _util.isFunction)(config.axis_x_extent) ? config.axis_x_extent($$.getXDomain($$.data.targets)) : config.axis_x_extent;


		return $$.isTimeSeries() && (extent = [$$.parseDate(extent[0]), $$.parseDate(extent[1])]), extent;
	}
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initialize zoom.
  * @private
  */
	initZoom: function initZoom() {
		var $$ = this,
		    config = $$.config,
		    startEvent = void 0;
		$$.zoomScale = null, $$.zoom = (0, _d.zoom)().duration(0).on("start", function () {
			startEvent = _d.event.sourceEvent, $$.zoom.altDomain = _d.event.sourceEvent.altKey ? $$.x.orgDomain() : null, config.zoom_onzoomstart.call($$.api, _d.event.sourceEvent);
		}).on("zoom", function () {
			$$.redrawForZoom.call($$);
		}).on("end", function () {
			var event = _d.event.sourceEvent;

			// if click, do nothing. otherwise, click interaction will be canceled.
			event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY || ($$.redrawEventRect(), $$.updateZoom(), (0, _util.isFunction)(config.zoom_onzoomend) && config.zoom_onzoomend.call($$.api, $$.x.orgDomain()));
		}), $$.zoom.orgScaleExtent = function () {
			var extent = config.zoom_extent ? config.zoom_extent : [1, 10];

			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		}, $$.zoom.updateScaleExtent = function () {
			var ratio = (0, _util.diffDomain)($$.x.orgDomain()) / (0, _util.diffDomain)($$.getZoomDomain()),
			    extent = this.orgScaleExtent();


			return this.scaleExtent([extent[0] * ratio, extent[1] * ratio]), this;
		}, $$.zoom.updateTransformScale = function (transform) {
			var newScale = transform.rescaleX($$.x);

			newScale.domain($$.trimXDomain(newScale.domain())), $$.zoomScale = newScale, $$.xAxis.scale($$.zoomScale), $$.main.select("." + _classes2.default.eventRects).node().__zoom = transform;
		};
	},


	/**
  * Get zoom domain
  * @private
  * @returns {Array} zoom domain
  */
	getZoomDomain: function getZoomDomain() {
		var $$ = this,
		    config = $$.config,
		    min = (0, _d.min)([$$.orgXDomain[0], config.zoom_x_min]),
		    max = (0, _d.max)([$$.orgXDomain[1], config.zoom_x_max]);


		return [min, max];
	},


	/**
  * Update zoom
  * @private
  */
	updateZoom: function updateZoom() {
		var $$ = this,
		    z = $$.config.zoom_enabled ? $$.zoom : function () {};


		// bind zoom module
		// $$.main.select(`.${CLASS.zoomRect}`)
		// 	.call(z)
		// 	.on("dblclick.zoom", null);

		if ($$.zoomScale) {
			var range1 = $$.zoomScale.domain()[0],
			    range2 = $$.x.domain()[0];


			// reset scale when zoom is out as initial
			(range1 <= range2 || range1 - 0.015 <= range2) && ($$.zoomScale = null, $$.xAxis.scale($$.x));
		}

		$$.main.select("." + _classes2.default.eventRects).call(z).on("dblclick.zoom", null);
	},


	/**
  * Redraw the zoom.
  * @private
  */
	redrawForZoom: function redrawForZoom() {
		var $$ = this,
		    config = $$.config;


		if (config.zoom_enabled) {

				var zoom = $$.zoom,
				    x = $$.x,
				    event = _d.event,
				    transform = event.transform;
				return $$.zoom.updateTransformScale(transform), $$.filterTargetsToShow($$.data.targets).length === 0 ? void 0 : event.sourceEvent.type === "mousemove" && zoom.altDomain ? (x.domain(zoom.altDomain), void transform.scale($$.zoomScale).updateScaleExtent()) : void ($$.isCategorized() && x.orgDomain()[0] === $$.orgXDomain[0] && x.domain([$$.orgXDomain[0] - 1e-10, x.orgDomain()[1]]), $$.redraw({
					withTransition: !1,
					withY: config.zoom_rescale,
					withSubchart: !1,
					withEventRect: !1,
					withDimension: !1
				}), event.sourceEvent.type === "mousemove" && ($$.cancelClick = !0), (0, _util.isFunction)(config.zoom_onzoom) && config.zoom_onzoom.call($$.api, x.orgDomain()));
			}
	}
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	generateColor: function generateColor() {
		var $$ = this,
		    config = $$.config,
		    colors = config.data_colors,
		    callback = config.data_color,
		    ids = [],
		    pattern = (0, _util.notEmpty)(config.color_pattern) ? config.color_pattern : (0, _d.scaleOrdinal)(_d.schemeCategory10).range();


		return function (d) {
			var id = d.id || d.data && d.data.id || d,
			    color = void 0;

			// if callback function is provided


			return colors[id] instanceof Function ? color = colors[id](d) : colors[id] ? color = colors[id] : (ids.indexOf(id) < 0 && ids.push(id), color = pattern[ids.indexOf(id) % pattern.length], colors[id] = color), callback instanceof Function ? callback(color, d) : color;
		};
	},
	generateLevelColor: function generateLevelColor() {
		var $$ = this,
		    config = $$.config,
		    colors = config.color_pattern,
		    threshold = config.color_threshold,
		    asValue = threshold.unit === "value",
		    max = threshold.max || 100,
		    values = threshold.values && threshold.values.length ? threshold.values : [];


		return (0, _util.notEmpty)(threshold) ? function (value) {
			var color = colors[colors.length - 1];

			for (var v, i = 0; i < values.length; i++) if (v = asValue ? value : value * 100 / max, v < values[i]) {
				color = colors[i];

				break;
			}

			return color;
		} : null;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var getFormat = function ($$, typeValue, v) {
	var config = $$.config,
	    type = "axis_" + typeValue + "_tick_format",
	    format = config[type] ? config[type] : $$.defaultValueFormat;


	return format(v);
};

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getYFormat: function getYFormat(forArc) {
		var $$ = this,
		    formatForY = $$.yFormat,
		    formatForY2 = $$.y2Format;


		return forArc && !$$.hasType("gauge") && (formatForY = $$.defaultArcValueFormat, formatForY2 = $$.defaultArcValueFormat), function (v, ratio, id) {
			var format = $$.axis.getId(id) === "y2" ? formatForY2 : formatForY;

			return format.call($$, v, ratio);
		};
	},
	yFormat: function yFormat(v) {
		return getFormat(this, "y", v);
	},
	y2Format: function y2Format(v) {
		return getFormat(this, "y2", v);
	},
	defaultValueFormat: function defaultValueFormat(v) {
		return (0, _util.isValue)(v) ? +v : "";
	},
	defaultArcValueFormat: function defaultArcValueFormat(v, ratio) {
		return (ratio * 100).toFixed(1) + "%";
	},
	dataLabelFormat: function dataLabelFormat(targetId) {
		var $$ = this,
		    dataLabels = $$.config.data_labels,
		    defaultFormat = function (v) {
			return (0, _util.isValue)(v) ? +v : "";
		},
		    format = void 0;

		// find format according to axis id


		return format = typeof dataLabels.format === "function" ? dataLabels.format : (0, _typeof3.default)(dataLabels.format) === "object" ? dataLabels.format[targetId] ? dataLabels.format[targetId] === !0 ? defaultFormat : dataLabels.format[targetId] : function () {
			return "";
		} : defaultFormat, format;
	}
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	hasCaches: function hasCaches(ids) {
		for (var i = 0; i < ids.length; i++) if (!(ids[i] in this.cache)) return !1;

		return !0;
	},
	addCache: function addCache(id, target) {
		this.cache[id] = this.cloneTarget(target);
	},
	getCaches: function getCaches(ids) {
		var targets = [];

		for (var i = 0; i < ids.length; i++) ids[i] in this.cache && targets.push(this.cloneTarget(this.cache[ids[i]]));
		return targets;
	}
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	CLASS: _classes2.default,

	generateClass: function generateClass(prefix, targetId) {
		return " " + prefix + " " + (prefix + this.getTargetSelectorSuffix(targetId));
	},
	classText: function classText(d) {
		return this.generateClass(_classes2.default.text, d.index);
	},
	classTexts: function classTexts(d) {
		return this.generateClass(_classes2.default.texts, d.id);
	},
	classShape: function classShape(d) {
		return this.generateClass(_classes2.default.shape, d.index);
	},
	classShapes: function classShapes(d) {
		return this.generateClass(_classes2.default.shapes, d.id);
	},
	classLine: function classLine(d) {
		return this.classShape(d) + this.generateClass(_classes2.default.line, d.id);
	},
	classLines: function classLines(d) {
		return this.classShapes(d) + this.generateClass(_classes2.default.lines, d.id);
	},
	classCircle: function classCircle(d) {
		return this.classShape(d) + this.generateClass(_classes2.default.circle, d.index);
	},
	classCircles: function classCircles(d) {
		return this.classShapes(d) + this.generateClass(_classes2.default.circles, d.id);
	},
	classBar: function classBar(d) {
		return this.classShape(d) + this.generateClass(_classes2.default.bar, d.index);
	},
	classBars: function classBars(d) {
		return this.classShapes(d) + this.generateClass(_classes2.default.bars, d.id);
	},
	classArc: function classArc(d) {
		return this.classShape(d.data) + this.generateClass(_classes2.default.arc, d.data.id);
	},
	classArcs: function classArcs(d) {
		return this.classShapes(d.data) + this.generateClass(_classes2.default.arcs, d.data.id);
	},
	classArea: function classArea(d) {
		return this.classShape(d) + this.generateClass(_classes2.default.area, d.id);
	},
	classAreas: function classAreas(d) {
		return this.classShapes(d) + this.generateClass(_classes2.default.areas, d.id);
	},
	classRegion: function classRegion(d, i) {
		return this.generateClass(_classes2.default.region, i) + " " + ("class" in d ? d.class : "");
	},
	classEvent: function classEvent(d) {
		return this.generateClass(_classes2.default.eventRect, d.index);
	},
	classTarget: function classTarget(id) {
		var additionalClassSuffix = this.config.data_classes[id],
		    additionalClass = "";


		return additionalClassSuffix && (additionalClass = " " + _classes2.default.target + "-" + additionalClassSuffix), this.generateClass(_classes2.default.target, id) + additionalClass;
	},
	classFocus: function classFocus(d) {
		return this.classFocused(d) + this.classDefocused(d);
	},
	classFocused: function classFocused(d) {
		return " " + (this.focusedTargetIds.indexOf(d.id) >= 0 ? _classes2.default.focused : "");
	},
	classDefocused: function classDefocused(d) {
		return " " + (this.defocusedTargetIds.indexOf(d.id) >= 0 ? _classes2.default.defocused : "");
	},
	classChartText: function classChartText(d) {
		return _classes2.default.chartText + this.classTarget(d.id);
	},
	classChartLine: function classChartLine(d) {
		return _classes2.default.chartLine + this.classTarget(d.id);
	},
	classChartBar: function classChartBar(d) {
		return _classes2.default.chartBar + this.classTarget(d.id);
	},
	classChartArc: function classChartArc(d) {
		return _classes2.default.chartArc + this.classTarget(d.data.id);
	},
	getTargetSelectorSuffix: function getTargetSelectorSuffix(targetId) {
		return targetId || targetId === 0 ? ("-" + targetId).replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : "";
	},
	selectorTarget: function selectorTarget(id, prefix) {
		return (prefix || "") + "." + (_classes2.default.target + this.getTargetSelectorSuffix(id));
	},
	selectorTargets: function selectorTargets(idsValue, prefix) {
		var $$ = this,
		    ids = idsValue || [];


		return ids.length ? ids.map(function (id) {
			return $$.selectorTarget(id, prefix);
		}) : null;
	},
	selectorLegend: function selectorLegend(id) {
		return "." + (_classes2.default.legendItem + this.getTargetSelectorSuffix(id));
	},
	selectorLegends: function selectorLegends(ids) {
		var $$ = this;

		return ids && ids.length ? ids.map(function (id) {
			return $$.selectorLegend(id);
		}) : null;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
		/**
   * This API highlights specified targets and fade out the others.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
   * @method focus
   * @instance
   * @memberof Chart
   * @param {String|Array} targetIdsValue Target ids to be highlighted.
   * @example
   *  // data1 will be highlighted and the others will be faded out
   *  chart.focus("data1");
   *
   * // data1 and data2 will be highlighted and the others will be faded out
   * chart.focus(["data1", "data2"]);
   *
   * // all targets will be highlighted
   * chart.focus();
   */
		focus: function focus(targetIdsValue) {
				var $$ = this.internal,
				    targetIds = $$.mapToTargetIds(targetIdsValue),
				    candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
				this.revert(), this.defocus(), candidates.classed(_classes2.default.focused, !0).classed(_classes2.default.defocused, !1), $$.hasArcType() && $$.expandArc(targetIds), $$.toggleFocusLegend(targetIds, !0), $$.focusedTargetIds = targetIds, $$.defocusedTargetIds = $$.defocusedTargetIds.filter(function (id) {
						return targetIds.indexOf(id) < 0;
				});
		},


		/**
   * This API fades out specified targets and reverts the others.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
   * @method defocus
   * @instance
   * @memberof Chart
   * @param {String|Array} Target ids to be faded out.
   * @example
   * // data1 will be faded out and the others will be reverted.
   * chart.defocus("data1");
   *
   * // data1 and data2 will be faded out and the others will be reverted.
   * chart.defocus(["data1", "data2"]);
   *
   * // all targets will be faded out.
   * chart.defocus();
   */
		defocus: function defocus(targetIdsValue) {
				var $$ = this.internal,
				    targetIds = $$.mapToTargetIds(targetIdsValue),
				    candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
				candidates.classed(_classes2.default.focused, !1).classed(_classes2.default.defocused, !0), $$.hasArcType() && $$.unexpandArc(targetIds), $$.toggleFocusLegend(targetIds, !1), $$.focusedTargetIds = $$.focusedTargetIds.filter(function (id) {
						return targetIds.indexOf(id) < 0;
				}), $$.defocusedTargetIds = targetIds;
		},


		/**
   * This API reverts specified targets.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
   * @method revert
   * @instance
   * @memberof Chart
   * @param {String|Array} Target ids to be reverted
   * @example
   * // data1 will be reverted.
   * chart.revert("data1");
   *
   * // data1 and data2 will be reverted.
   * chart.revert(["data1", "data2"]);
   *
   * // all targets will be reverted.
   * chart.revert();
   */
		revert: function revert(targetIdsValue) {
				var $$ = this.internal,
				    targetIds = $$.mapToTargetIds(targetIdsValue),
				    candidates = $$.svg.selectAll($$.selectorTargets(targetIds));
				// should be for all targets

				candidates.classed(_classes2.default.focused, !1).classed(_classes2.default.defocused, !1), $$.hasArcType() && $$.unexpandArc(targetIds), $$.config.legend_show && ($$.showLegend(targetIds.filter($$.isLegendToShow.bind($$))), $$.legend.selectAll($$.selectorLegends(targetIds)).filter(function () {
						return (0, _d.select)(this).classed(_classes2.default.legendItemFocused);
				}).classed(_classes2.default.legendItemFocused, !1)), $$.focusedTargetIds = [], $$.defocusedTargetIds = [];
		}
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Show data points
  * @method show
  * @instance
  * @memberof Chart
  * @param {String|Array} targetIdsValue
  * @param {Object} options
  */
	show: function show(targetIdsValue) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    $$ = this.internal,
		    targetIds = $$.mapToTargetIds(targetIdsValue);
		$$.removeHiddenTargetIds(targetIds);

		var targets = $$.svg.selectAll($$.selectorTargets(targetIds));

		targets.transition().style("opacity", "1", "important").call($$.endall, function () {
			targets.style("opacity", null).style("opacity", "1");
		}), options.withLegend && $$.showLegend(targetIds), $$.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		});
	},


	/**
  * Hide data points
  * @method hide
  * @instance
  * @memberof Chart
  * @param {String|Array} targetIdsValue
  * @param {Object} options
  */
	hide: function hide(targetIdsValue) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    $$ = this.internal,
		    targetIds = $$.mapToTargetIds(targetIdsValue);
		$$.addHiddenTargetIds(targetIds);

		var targets = $$.svg.selectAll($$.selectorTargets(targetIds));

		targets.transition().style("opacity", "0", "important").call($$.endall, function () {
			targets.style("opacity", null).style("opacity", "0");
		}), options.withLegend && $$.hideLegend(targetIds), $$.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		});
	},


	/**
  * Toggle data points
  * @method toggle
  * @instance
  * @memberof Chart
  * @param {Array} targetIds
  * @param {Object} options
  */
	toggle: function toggle(targetIds) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    that = this,
		    $$ = this.internal;
		$$.mapToTargetIds(targetIds).forEach(function (targetId) {
			$$.isTargetToShow(targetId) ? that.hide(targetId, options) : that.show(targetId, options);
		});
	}
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Zoom by giving x domain.
 * @method zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @example
 *  // Zoom to specified domain
 *  chart.zoom([10, 20]);
 *
 *  // Get the current zoomed domain
 *  chart.zoom();
 */
var zoom = function (domainValue) {
	var $$ = this.internal,
	    domain = domainValue,
	    resultDomain = void 0;


	if (domain) {

		if ($$.isTimeSeries() && (domain = domain.map(function (x) {
			return $$.parseDate(x);
		})), $$.config.subchart_show) {
			var xScale = $$.zoomScale || $$.x;

			$$.brush.getSelection().call($$.brush.move, [xScale(domain[0]), xScale(domain[1])]), resultDomain = domain;
		} else {
			var orgDomain = $$.x.orgDomain(),
			    k = (orgDomain[1] - orgDomain[0]) / (domain[1] - domain[0]),
			    tx = $$.isTimeSeries() ? 0 - k * $$.x(domain[0].getTime()) : domain[0] - k * $$.x(domain[0]);
			$$.zoom.updateTransformScale(_d.zoomIdentity.translate(tx, 0).scale(k)), resultDomain = $$.zoomScale.domain();
		}

		$$.redraw({
			withTransition: !0,
			withY: $$.config.zoom_rescale,
			withDimension: !1
		}), $$.config.zoom_onzoom.call(this, $$.x.orgDomain());
	} else resultDomain = ($$.zoomScale || $$.x).domain();
	return resultDomain;
};

/**
 * Enable and disable zooming.
 * @method zoom:enable
 * @instance
 * @memberof Chart
 * @param {Boolean} enabled If enabled is true, the feature of zooming will be enabled. If false is given, it will be disabled.
 * @example
 *  // Enable zooming
 *  chart.zoom.enable(true);
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
zoom.enable = function (enabled) {
	var $$ = this.internal;

	$$.config.zoom_enabled = enabled, $$.updateAndRedraw();
}, zoom.max = function (max) {
	var $$ = this.internal,
	    config = $$.config;


	if (max === 0 || max) config.zoom_x_max = (0, _d.max)([$$.orgXDomain[1], max]);else return config.zoom_x_max;

	return undefined;
}, zoom.min = function (min) {
	var $$ = this.internal,
	    config = $$.config;


	if (min === 0 || min) config.zoom_x_min = (0, _d.min)([$$.orgXDomain[0], min]);else return config.zoom_x_min;

	return undefined;
}, zoom.range = function (range) {
	if (arguments.length) (0, _util.isDefined)(range.max) && this.domain.max(range.max), (0, _util.isDefined)(range.min) && this.domain.min(range.min);else return {
			max: this.domain.max(),
			min: this.domain.min()
		};

	return undefined;
}, (0, _util.extend)(_Chart2.default.prototype, {
	zoom: zoom,
	/**
  * Unzoom zoomed area
  * @method unzoom
  * @instance
  * @memberof Chart
  * @example
  *  chart.unzoom();
  */
	unzoom: function unzoom() {
		var $$ = this.internal;

		$$.config.subchart_show ? $$.brush.getSelection().call($$.brush.move, null) : $$.zoom.updateTransformScale(_d.zoomIdentity), $$.redraw({
			withTransition: !0,
			withY: $$.config.zoom_rescale
		});
	}
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Load data to the chart.<br><br>
  * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
  * - <b>Note:</b>
  * unload should be used if some data needs to be unloaded simultaneously. If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
  * done will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering
  * @method load
  * @instance
  * @memberof Chart
  * @param {Object} args
  * - If url, json, rows and columns given, the data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added.
  * - If classes given, the classes specifed by data.classes will be updated. classes must be Object that has target id as keys.
  * - If categories given, the categories specifed by axis.x.categories or data.x will be updated. categories must be Array.
  * - If axes given, the axes specifed by data.axes will be updated. axes must be Object that has target id as keys.
  * - If colors given, the colors specifed by data.colors will be updated. colors must be Object that has target id as keys.
  * - If type or types given, the type of targets will be updated. type must be String and types must be Object.
  * - If unload given, data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded.
  * - If done given, the specified function will be called after data loded.
  * @example
  *  // Load data1 and unload data2 and data3
  *  chart.load({
  *     columns: [
  *        ["data1", 100, 200, 150, ...],
  *        ...
  *    ],
  *    unload: ["data2", "data3"]
  *  });
  */
	load: function load(args) {
		var $$ = this.internal,
		    config = $$.config;

		// update xs if specified


		// use cache if exists
		return args.xs && $$.addXs(args.xs), "names" in args && this.data.names(args.names), "classes" in args && Object.keys(args.classes).forEach(function (id) {
			config.data_classes[id] = args.classes[id];
		}), "categories" in args && $$.isCategorized() && (config.axis_x_categories = args.categories), "axes" in args && Object.keys(args.axes).forEach(function (id) {
			config.data_axes[id] = args.axes[id];
		}), "colors" in args && Object.keys(args.colors).forEach(function (id) {
			config.data_colors[id] = args.colors[id];
		}), "cacheIds" in args && $$.hasCaches(args.cacheIds) ? void $$.load($$.getCaches(args.cacheIds), args.done) : void ("unload" in args ? $$.unload($$.mapToTargetIds(typeof args.unload === "boolean" && args.unload ? null : args.unload), function () {
			return $$.loadFromArgs(args);
		}) : $$.loadFromArgs(args));

		// unload if needed
	},


	/**
  * Unload data to the chart.<br><br>
  * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
  * - <b>Note:</b>
  * If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.<br>
  * `done` will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
  * @method unload
  * @instance
  * @memberof Chart
  * @param {Object} args
  * - If ids given, the data that has specified target id will be unloaded. ids should be String or Array. If ids is not specified, all data will be unloaded.
  * - If done given, the specified function will be called after data loded.
  * @example
  *  // Unload data2 and data3
  *  chart.unload({
  *    ids: ["data2", "data3"]
  *  });
  */
	unload: function unload(argsValue) {
		var $$ = this.internal,
		    args = argsValue || {};
		args instanceof Array ? args = { ids: args } : typeof args === "string" && (args = { ids: [args] }), $$.unload($$.mapToTargetIds(args.ids), function () {
			$$.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0,
				withLegend: !0
			}), args.done && args.done();
		});
	}
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Flow data to the chart.<br><br>
  * By this API, you can append new data points to the chart.
  * @method flow
  * @instance
  * @memberof Chart
  * @param {Object} args
  * - If json, rows and columns given, the data will be loaded. If data that has the same target id is given, the chart will be appended. Otherwise, new target will be added. One of these is required when calling. If json specified, keys is required as well as data.json
  * - If to is given, the lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points.
  * - If length is given, the lower x edge will move by the number of this argument.
  * - If duration is given, the duration of the transition will be specified value. If not given, transition.duration will be used as default.
  * - If done is given, the specified function will be called when flow ends.
  * @example
  * // 2 data points will be apprended to the tail and popped from the head.
  * // After that, 4 data points will be appended and no data points will be poppoed.
  * chart.flow({
  *  columns: [
  *    ["x", "2013-01-11", "2013-01-21"],
  *    ["data1", 500, 200],
  *    ["data2", 100, 300],
  *    ["data3", 200, 120]
  *  ],
  *  done: function () {
  *    chart.flow({
  *      columns: [
  *        ["x", "2013-02-11", "2013-02-12", "2013-02-13", "2013-02-14"],
  *        ["data1", 200, 300, 100, 250],
  *        ["data2", 100, 90, 40, 120],
  *        ["data3", 100, 100, 300, 500]
  *      ],
  *      length: 0
  *    });
  *  }
  * });
  */
	flow: function flow(args) {
		var $$ = this.internal,
		    notfoundIds = [],
		    orgDataCount = $$.getMaxDataCount(),
		    data = void 0,
		    domain = void 0,
		    length = 0,
		    tail = 0,
		    diff = void 0,
		    to = void 0;


		if (args.json) data = $$.convertJsonToData(args.json, args.keys);else if (args.rows) data = $$.convertRowsToData(args.rows);else if (args.columns) data = $$.convertColumnsToData(args.columns);else return;

		var targets = $$.convertDataToTargets(data, !0);

		// Update/Add data
		$$.data.targets.forEach(function (t) {
			var found = !1,
			    i = void 0,
			    j = void 0;


			for (i = 0; i < targets.length; i++) if (t.id === targets[i].id) {

				for (found = !0, t.values[t.values.length - 1] && (tail = t.values[t.values.length - 1].index + 1), length = targets[i].values.length, j = 0; j < length; j++) targets[i].values[j].index = tail + j, $$.isTimeSeries() || (targets[i].values[j].x = tail + j);
				t.values = t.values.concat(targets[i].values), targets.splice(i, 1);

				break;
			}

			found || notfoundIds.push(t.id);
		}), $$.data.targets.forEach(function (t) {
			var i = void 0,
			    j = void 0;


			for (i = 0; i < notfoundIds.length; i++) if (t.id === notfoundIds[i]) for (tail = t.values[t.values.length - 1].index + 1, j = 0; j < length; j++) t.values.push({
					id: t.id,
					index: tail + j,
					x: $$.isTimeSeries() ? $$.getOtherTargetX(tail + j) : tail + j,
					value: null
				});
		}), $$.data.targets.length && targets.forEach(function (t) {
			var i = void 0,
			    missing = [];


			for (i = $$.data.targets[0].values[0].index; i < tail; i++) missing.push({
				id: t.id,
				index: i,
				x: $$.isTimeSeries() ? $$.getOtherTargetX(i) : i,
				value: null
			});

			t.values.forEach(function (v) {
				v.index += tail, $$.isTimeSeries() || (v.x += tail);
			}), t.values = missing.concat(t.values);
		}), $$.data.targets = $$.data.targets.concat(targets);
		// add remained

		// check data count because behavior needs to change when it"s only one
		// const dataCount = $$.getMaxDataCount();
		var baseTarget = $$.data.targets[0],
		    baseValue = baseTarget.values[0];


		// Update length to flow if needed
		(0, _util.isDefined)(args.to) ? (length = 0, to = $$.isTimeSeries() ? $$.parseDate(args.to) : args.to, baseTarget.values.forEach(function (v) {
			v.x < to && length++;
		})) : (0, _util.isDefined)(args.length) && (length = args.length), orgDataCount ? orgDataCount === 1 && $$.isTimeSeries() && (diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2, domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)], $$.updateXDomain(null, !0, !0, !1, domain)) : (diff = $$.isTimeSeries() ? baseTarget.values.length > 1 ? baseTarget.values[baseTarget.values.length - 1].x - baseValue.x : baseValue.x - $$.getXDomain($$.data.targets)[0] : 1, domain = [baseValue.x - diff, baseValue.x], $$.updateXDomain(null, !0, !0, !1, domain)), $$.updateTargets($$.data.targets), $$.redraw({
			flow: {
				index: baseValue.index,
				length: length,
				duration: (0, _util.isValue)(args.duration) ? args.duration : $$.config.transition_duration,
				done: args.done,
				orgDataCount: orgDataCount
			},
			withLegend: !0,
			withTransition: orgDataCount > 1,
			withTrimXDomain: !1,
			withUpdateXAxis: !0
		});
	}
}), (0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Generate flow
  * @memberof ChartInternal
  * @private
  * @param {Object} args
  * @return {Function}
  */
	generateFlow: function generateFlow(args) {
		var $$ = this,
		    config = $$.config;


		return function () {
			var targets = args.targets,
			    flow = args.flow,
			    drawBar = args.drawBar,
			    drawLine = args.drawLine,
			    drawArea = args.drawArea,
			    cx = args.cx,
			    cy = args.cy,
			    xv = args.xv,
			    xForText = args.xForText,
			    yForText = args.yForText,
			    duration = args.duration,
			    translateX = void 0,
			    scaleX = 1,
			    flowIndex = flow.index,
			    flowLength = flow.length,
			    flowStart = $$.getValueOnIndex($$.data.targets[0].values, flowIndex),
			    flowEnd = $$.getValueOnIndex($$.data.targets[0].values, flowIndex + flowLength),
			    orgDomain = $$.x.domain(),
			    durationForFlow = flow.duration || duration,
			    done = flow.done || function () {},
			    wait = $$.generateWait(),
			    xgrid = $$.xgrid || (0, _d.selectAll)([]),
			    xgridLines = $$.xgridLines || (0, _d.selectAll)([]),
			    mainRegion = $$.mainRegion || (0, _d.selectAll)([]),
			    mainText = $$.mainText || (0, _d.selectAll)([]),
			    mainBar = $$.mainBar || (0, _d.selectAll)([]),
			    mainLine = $$.mainLine || (0, _d.selectAll)([]),
			    mainArea = $$.mainArea || (0, _d.selectAll)([]),
			    mainCircle = $$.mainCircle || (0, _d.selectAll)([]);


			// set flag
			$$.flowing = !0, $$.data.targets.forEach(function (d) {
				d.values.splice(0, flowLength);
			});


			// update x domain to generate axis elements for flow
			var domain = $$.updateXDomain(targets, !0, !0);

			// update elements related to x scale
			$$.updateXGrid && $$.updateXGrid(!0), flow.orgDataCount ? flow.orgDataCount === 1 || (flowStart && flowStart.x) === (flowEnd && flowEnd.x) ? translateX = $$.x(orgDomain[0]) - $$.x(domain[0]) : $$.isTimeSeries() ? translateX = $$.x(orgDomain[0]) - $$.x(domain[0]) : translateX = $$.x(flowStart.x) - $$.x(flowEnd.x) : $$.data.targets[0].values.length === 1 ? $$.isTimeSeries() ? (flowStart = $$.getValueOnIndex($$.data.targets[0].values, 0), flowEnd = $$.getValueOnIndex($$.data.targets[0].values, $$.data.targets[0].values.length - 1), translateX = $$.x(flowStart.x) - $$.x(flowEnd.x)) : translateX = (0, _util.diffDomain)(domain) / 2 : translateX = $$.x(orgDomain[0]) - $$.x(domain[0]), scaleX = (0, _util.diffDomain)(orgDomain) / (0, _util.diffDomain)(domain);

			var transform = "translate(" + translateX + ",0) scale(" + scaleX + ",1)";

			$$.hideXGridFocus();


			var gt = (0, _d.transition)().ease(_d.easeLinear).duration(durationForFlow);

			wait.add([$$.axes.x.transition(gt).call($$.xAxis.setTransition(gt)), mainBar.transition(gt).attr("transform", transform), mainLine.transition(gt).attr("transform", transform), mainArea.transition(gt).attr("transform", transform), mainCircle.transition(gt).attr("transform", transform), mainText.transition(gt).attr("transform", transform), mainRegion.filter($$.isRegionOnX).transition(gt).attr("transform", transform), xgrid.transition(gt).attr("transform", transform), xgridLines.transition(gt).attr("transform", transform)]), gt.call(wait, function () {
				var i = void 0,
				    shapes = [],
				    texts = [],
				    eventRects = [];


				// remove flowed elements
				if (flowLength) {
					for (i = 0; i < flowLength; i++) shapes.push("." + _classes2.default.shape + "-" + (flowIndex + i)), texts.push("." + _classes2.default.text + "-" + (flowIndex + i)), eventRects.push("." + _classes2.default.eventRect + "-" + (flowIndex + i));

					$$.svg.selectAll("." + _classes2.default.shapes).selectAll(shapes).remove(), $$.svg.selectAll("." + _classes2.default.texts).selectAll(texts).remove(), $$.svg.selectAll("." + _classes2.default.eventRects).selectAll(eventRects).remove(), $$.svg.select("." + _classes2.default.xgrid).remove();
				}

				// draw again for removing flowed elements and reverting attr
				xgrid.size() && xgrid.attr("transform", null).attr($$.xgridAttr), xgridLines.attr("transform", null), xgridLines.select("line").attr("x1", config.axis_rotated ? 0 : xv).attr("x2", config.axis_rotated ? $$.width : xv), xgridLines.select("text").attr("x", config.axis_rotated ? $$.width : 0).attr("y", xv), mainBar.attr("transform", null).attr("d", drawBar), mainLine.attr("transform", null).attr("d", drawLine), mainArea.attr("transform", null).attr("d", drawArea), mainCircle.attr("transform", null).attr("cx", cx).attr("cy", cy), mainText.attr("transform", null).attr("x", xForText).attr("y", yForText).style("fill-opacity", $$.opacityForText.bind($$)), mainRegion.attr("transform", null), mainRegion.select("rect").filter($$.isRegionOnX).attr("x", $$.regionX.bind($$)).attr("width", $$.regionWidth.bind($$)), config.interaction_enabled && $$.redrawEventRect(), done(), $$.flowing = !1;
			});
		};
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(2),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Get selected data points.<br><br>
  * By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
  * @method selected
  * @instance
  * @memberof Chart
  * @param {String} targetId You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
  * @return {Array} dataPoint
  * @example
  *  // all selected data points will be returned.
  *  chart.selected();
  *
  *  // all selected data points of data1 will be returned.
  *  chart.selected("data1");
  */
	selected: function selected(targetId) {
		var $$ = this.internal,
		    dataPoint = [];


		return $$.main.selectAll("." + (_classes2.default.shapes + $$.getTargetSelectorSuffix(targetId))).selectAll("." + _classes2.default.shape).filter(function () {
			return (0, _d.select)(this).classed(_classes2.default.SELECTED);
		}).each(function (d) {
			return dataPoint.push(d);
		}), dataPoint;
	},


	/**
  * Set data points to be selected.
  * @method select
  * @instance
  * @memberof Chart
  * @param {String} ids
  * @param {Number} indices
  * @param {Boolean} resetOther
  * @example
  *  // select from 'data1', indices 2 and unselect others selected
  *  chart.select("data1", 2, true);
  */
	select: function select(ids, indices, resetOther) {
		var $$ = this.internal,
		    config = $$.config;
		config.data_selection_enabled && $$.main.selectAll("." + _classes2.default.shapes).selectAll("." + _classes2.default.shape).each(function (d, i) {
			var shape = (0, _d.select)(this),
			    id = d.data ? d.data.id : d.id,
			    toggle = $$.getToggle(this, d).bind($$),
			    isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
			    isTargetIndex = !indices || indices.indexOf(i) >= 0,
			    isSelected = shape.classed(_classes2.default.SELECTED);


			// line/area selection not supported yet
			shape.classed(_classes2.default.line) || shape.classed(_classes2.default.area) || (isTargetId && isTargetIndex ? config.data_selection_isselectable(d) && !isSelected && toggle(!0, shape.classed(_classes2.default.SELECTED, !0), d, i) : (0, _util.isDefined)(resetOther) && resetOther && isSelected && toggle(!1, shape.classed(_classes2.default.SELECTED, !1), d, i));
		});
	},


	/**
  * Set data points to be un-selected.
  * @method unselect
  * @instance
  * @memberof Chart
  * @param {String} ids
  * @param {Number} indices
  * @example
  *  // unselect from 'data1', indices 2
  *  chart.unselect("data1", 2);
  */
	unselect: function unselect(ids, indices) {
		var $$ = this.internal,
		    config = $$.config;
		config.data_selection_enabled && $$.main.selectAll("." + _classes2.default.shapes).selectAll("." + _classes2.default.shape).each(function (d, i) {
			var shape = (0, _d.select)(this),
			    id = d.data ? d.data.id : d.id,
			    toggle = $$.getToggle(this, d).bind($$),
			    isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
			    isTargetIndex = !indices || indices.indexOf(i) >= 0,
			    isSelected = shape.classed(_classes2.default.SELECTED);


			// line/area selection not supported yet
			shape.classed(_classes2.default.line) || shape.classed(_classes2.default.area) || isTargetId && isTargetIndex && config.data_selection_isselectable(d) && isSelected && toggle(!1, shape.classed(_classes2.default.SELECTED, !1), d, i);
		});
	}
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Change the type of the chart.
  * @method transform
  * @instance
  * @memberof Chart
  * @param {String} type Specify the type to be transformed. The types listed in data.type can be used.
  * @param {String|Array} targetIds Specify targets to be transformed. If not given, all targets will be the candidate.
  * @example
  *  // all targets will be bar chart.
  *  chart.transform("bar");
  *
  *  // only data1 will be bar chart.
  *  chart.transform("bar", "data1");
  *
  *  // only data1 and data2 will be bar chart.
  *  chart.transform("bar", ["data1", "data2"]);
  */
	transform: function transform(type, targetIds) {
		var $$ = this.internal,
		    options = ["pie", "donut"].indexOf(type) >= 0 ? { withTransform: !0 } : null;
		$$.transformTo(targetIds, type, options);
	}
}), (0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Change the type of the chart.
  * @private
  * @param {String|Array} targetIds
  * @param {String} type
  * @param {Object} optionsForRedraw
  */
	transformTo: function transformTo(targetIds, type, optionsForRedraw) {
		var $$ = this,
		    withTransitionForAxis = !$$.hasArcType(),
		    options = optionsForRedraw || { withTransitionForAxis: withTransitionForAxis };
		options.withTransitionForTransform = !1, $$.transiting = !1, $$.setTargetType(targetIds, type), $$.updateTargets($$.data.targets), $$.updateAndRedraw(options);
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Update groups for the targets.
  * @method groups
  * @instance
  * @memberof Chart
  * @param {Array} groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
  * @example
  *  // data1 and data2 will be a new group.
  *  chart.groups([
  *     ["data1", "data2"]
  *  ]);
  */
	groups: function groups(_groups) {
		var $$ = this.internal,
		    config = $$.config;
		return (0, _util.isUndefined)(_groups) ? config.data_groups : (config.data_groups = _groups, $$.redraw(), config.data_groups);
	}
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update x grid lines.
 * @method xgrids
 * @instance
 * @memberof Chart
 * @param {Array} grids X grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines.
 * @example
 *  // Show 2 x grid lines
 * chart.xgrids([
 *    {value: 1, text: "Label 1"},
 *    {value: 4, text: "Label 4"}
 * ]);
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var xgrids = function (grids) {
  var $$ = this.internal,
      config = $$.config;
  return grids ? (config.grid_x_lines = grids, $$.redrawWithoutRescale(), config.grid_x_lines) : config.grid_x_lines;
};

/**
 * Add x grid lines.<br>
 * This API adds new x grid lines instead of replacing like xgrids.
 * @method xgrids:add
 * @instance
 * @memberof Chart
 * @param {Array|Object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
 * @example
 *  // Add a new x grid line
 * chart.xgrids.add(
 *   {value: 4, text: "Label 4"}
 * );
 *
 * // Add new x grid lines
 * chart.xgrids.add([
 *   {value: 2, text: "Label 2"},
 *   {value: 4, text: "Label 4"}
 * ]);
 */
xgrids.add = function (grids) {
  return this.xgrids(this.internal.config.grid_x_lines.concat(grids || []));
}, xgrids.remove = function (params) {
  this.internal.removeGridLines(params, !0);
};


/**
 * Update y grid lines.
 * @method ygrids
 * @instance
 * @memberof Chart
 * @param {Array} grids Y grid lines will be replaced with this argument. The format of this argument is the same as grid.y.lines.
 * @example
 *  // Show 2 y grid lines
 * chart.ygrids([
 *    {value: 100, text: "Label 1"},
 *    {value: 400, text: "Label 4"}
 * ]);
 */
var ygrids = function (grids) {
  var $$ = this.internal,
      config = $$.config;
  return grids ? (config.grid_y_lines = grids, $$.redrawWithoutRescale(), config.grid_y_lines) : config.grid_y_lines;
};

/**
 * Add y grid lines.<br>
 * This API adds new y grid lines instead of replacing like ygrids.
 * @method ygrids:add
 * @instance
 * @memberof Chart
 * @param {Array|Object} grids New y grid lines will be added. The format of this argument is the same as grid.y.lines and it's possible to give an Object if only one line will be added.
 * @example
 *  // Add a new x grid line
 * chart.ygrids.add(
 *   {value: 400, text: "Label 4"}
 * );
 *
 * // Add new x grid lines
 * chart.ygrids.add([
 *   {value: 200, text: "Label 2"},
 *   {value: 400, text: "Label 4"}
 * ]);
 */
ygrids.add = function (grids) {
  return this.ygrids(this.internal.config.grid_y_lines.concat(grids || []));
}, ygrids.remove = function (params) {
  this.internal.removeGridLines(params, !1);
}, (0, _util.extend)(_Chart2.default.prototype, {
  xgrids: xgrids,
  ygrids: ygrids
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _classes = __webpack_require__(3),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update regions.
 * @method regions
 * @instance
 * @memberof Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @return {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {axis: "y", end: 50, class: "regionY"}
 * ]);
 */
var regions = function (_regions) {
  var $$ = this.internal,
      config = $$.config;
  return _regions ? (config.regions = _regions, $$.redrawWithoutRescale(), config.regions) : config.regions;
};

/**
 * Add new region.<br><br>
 * This API adds new region instead of replacing like regions.
 * @method regions:add
 * @instance
 * @memberof Chart
 * @param {Array|Object} regions New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
 * @return {Array} regions
 * @example
 * // Add a new region
 * chart.regions.add(
 *    {axis: "x", start: 5, class: "regionX"}
 * );
 *
 * // Add new regions
 * chart.regions.add([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {axis: "y", end: 50, class: "regionY"}
 *]);
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
regions.add = function (regions) {
  var $$ = this.internal,
      config = $$.config;
  return regions ? (config.regions = config.regions.concat(regions), $$.redrawWithoutRescale(), config.regions) : config.regions;
}, regions.remove = function (optionsValue) {
  var $$ = this.internal,
      config = $$.config,
      options = optionsValue || {},
      duration = $$.getOption(options, "duration", config.transition_duration),
      classes = $$.getOption(options, "classes", [_classes2.default.region]),
      regions = $$.main.select("." + _classes2.default.regions).selectAll(classes.map(function (c) {
    return "." + c;
  }));


  return (duration ? regions.transition().duration(duration) : regions).style("opacity", "0").remove(), config.regions = config.regions.filter(function (region) {
    var found = !1;

    return !region.class || (region.class.split(" ").forEach(function (c) {
      classes.indexOf(c) >= 0 && (found = !0);
    }), !found);
  }), config.regions;
}, (0, _util.extend)(_Chart2.default.prototype, { regions: regions });

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get data loaded in the chart.
 * @method data
 * @instance
 * @memberof Chart
 * @param {String|Array} targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
 * @example
 * // Get only data1 data
 * chart.data("data1");
 *
 * // Get data1 and data2 data
 * chart.data(["data1", "data2"]);
 *
 * // Get all data
 * chart.data();
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var data = function (targetIds) {
  var targets = this.internal.data.targets;

  return typeof targetIds === "undefined" ? targets : targets.filter(function (t) {
    return targetIds.indexOf(t.id) >= 0;
  });
};

/**
 * Get data shown in the chart.
 * @method data:shown
 * @instance
 * @memberof Chart
 * @param {String|Array} targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
 * @example
 * // Get shown data by filtering to include only data1 data
 * chart.data.shown("data1");
 *
 * // Get shown data by filtering to include data1 and data2 data
 * chart.data.shown(["data1", "data2"]);
 *
 * // Get all shown data
 * chart.data.shown();
 */
data.shown = function (targetIds) {
  return this.internal.filterTargetsToShow(this.data(targetIds));
}, data.values = function (targetId) {
  var values = null;

  if (targetId) {
    var targets = this.data(targetId);

    targets && targets[0] && (values = targets[0].values.map(function (d) {
      return d.value;
    }));
  }

  return values;
}, data.names = function (names) {

  return this.internal.clearLegendItemTextBoxCache(), this.internal.updateDataAttributes("names", names);
}, data.colors = function (colors) {
  return this.internal.updateDataAttributes("colors", colors);
}, data.axes = function (axes) {
  return this.internal.updateDataAttributes("axes", axes);
}, (0, _util.extend)(_Chart2.default.prototype, { data: data });

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Set specified category name on category axis.
  * @method category
  * @instance
  * @memberof Chart
  * @param {Number} i index of category to be changed
  * @param {String} category category value to be changed
  * @example
  * chart.category(2, "Category 3");
  */
	category: function category(i, _category) {
		var $$ = this.internal,
		    config = $$.config;


		return arguments.length > 1 && (config.axis_x_categories[i] = _category, $$.redraw()), config.axis_x_categories[i];
	},


	/**
  * Set category names on category axis.
  * @method categories
  * @instance
  * @memberof Chart
  * @param {Array} categories This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
  * @example
  * chart.categories([
  *      "Category 1", "Category 2", ...
  * ]);
  */
	categories: function categories(_categories) {
		var $$ = this.internal,
		    config = $$.config;
		return arguments.length ? (config.axis_x_categories = _categories, $$.redraw(), config.axis_x_categories) : config.axis_x_categories;
	}
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Get the color
  * @method color
  * @instance
  * @memberof Chart
  * @param {String} id id to get the color
  * @example
  * chart.color("data1");
  */
	color: function color(id) {
		var $$ = this.internal;

		return $$.color(id); // more patterns
	}
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Get and set x values for the chart.
  * @method x
  * @instance
  * @memberof Chart
  * @param {Array} x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
  * @return {Object} xs
  * @example
  *  // Get current x values
  *  chart.x();
  *
  *  // Update x values for all targets
  *  chart.x([100, 200, 300, 400, ...]);
  */
	x: function x(_x) {
		var $$ = this.internal;

		return arguments.length && ($$.updateTargetX($$.data.targets, _x), $$.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0
		})), $$.data.xs;
	},


	/**
  * Get and set x values for the chart.
  * @method xs
  * @instance
  * @memberof Chart
  * @param {Array} xs If xs is given, specified target's x values will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
  * @return {Object} xs
  * @example
  *  // Get current x values
  *  chart.xs();
  *
  *  // Update x values for all targets
  *  chart.xs({
  *    data1: [10, 20, 30, 40, ...],
  *    data2: [100, 200, 300, 400, ...]
  *  });
  */
	xs: function xs(_xs) {
		var $$ = this.internal;

		return arguments.length && ($$.updateTargetXs($$.data.targets, _xs), $$.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0
		})), $$.data.xs;
	}
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(5),
    _typeof3 = _interopRequireDefault(_typeof2),
    _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set the min/max value
 * @param $$
 * @param type
 * @param value
 * @return {undefined}
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var setMinMax = function ($$, type, value) {
  var config = $$.config,
      axisY = "axis_y_" + type,
      axisY2 = "axis_y2_" + type;


  return typeof value !== "undefined" && ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === "object" ? ((0, _util.isValue)(value.x) && (config["axis_x_" + type] = value.x), (0, _util.isValue)(value.y) && (config[axisY] = value.y), (0, _util.isValue)(value.y2) && (config[axisY2] = value.y2)) : (config[axisY] = value, config[axisY2] = value), $$.redraw({
    withUpdateOrgXDomain: !0,
    withUpdateXDomain: !0
  })), undefined;
},
    getMinMax = function ($$, type) {
  var config = $$.config;


  return {
    x: config["axis_x_" + type],
    y: config["axis_y_" + type],
    y2: config["axis_y2_" + type]
  };
},
    axis = function () {};

/**
 * Get the min/max value
 * @param $$
 * @param type
 * @return {{x, y, y2}}
 */


/**
 * Define axis
 */


/**
 * Get and set axis labels.
 * @method axis:labels
 * @instance
 * @memberof Chart
 * @param {Object} labels specified axis' label to be updated.
 * @example
 * // Update axis' label
 * chart.axis.labels({
 *   x: "New X Axis Label",
 *   y: "New Y Axis Label"
 * });
 */
axis.labels = function (labels) {
  var $$ = this.internal;

  arguments.length && (Object.keys(labels).forEach(function (axisId) {
    $$.axis.setLabelText(axisId, labels[axisId]);
  }), $$.axis.updateLabels());
}, axis.min = function (min) {
  return arguments.length ? setMinMax(this.internal, "min", min) : getMinMax(this.internal, "min");
}, axis.max = function (max) {
  return arguments.length ? setMinMax(this.internal, "max", max) : getMinMax(this.internal, "max");
}, axis.range = function (range) {
  if (arguments.length) (0, _util.isDefined)(range.max) && this.axis.max(range.max), (0, _util.isDefined)(range.min) && this.axis.min(range.min);else return {
      max: this.axis.max(),
      min: this.axis.min()
    };

  return undefined;
}, (0, _util.extend)(_Chart2.default.prototype, { axis: axis });

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define legend
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var legend = function () {};

/**
 * Show legend for each target.
 * @method legend:show
 * @instance
 * @memberof Chart
 * @param {String|Array} targetIds
 * - If targetIds is given, specified target's legend will be shown.
 * - If only one target is the candidate, String can be passed.
 * - If no argument is given, all of target's legend will be shown.
 * @example
 * // Show legend for data1.
 * chart.legend.show("data1");
 *
 * // Show legend for data1 and data2.
 * chart.legend.show(["data1", "data2"]);
 *
 * // Show all legend.
 * chart.legend.show();
 */
legend.show = function (targetIds) {
  var $$ = this.internal;

  $$.showLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({ withLegend: !0 });
}, legend.hide = function (targetIds) {
  var $$ = this.internal;

  $$.hideLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({ withLegend: !0 });
}, (0, _util.extend)(_Chart2.default.prototype, { legend: legend });

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _browser = __webpack_require__(59),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Resize the chart.
  * @method resize
  * @instance
  * @memberof Chart
  * @param {Object} size This argument should include width and height in pixels.
  * @example
  * // Resize to 640x480
  * chart.resize({
  *    width: 640,
  *    height: 480
  * });
  */
	resize: function resize(size) {
		var config = this.internal.config;

		config.size_width = size ? size.width : null, config.size_height = size ? size.height : null, this.flush();
	},


	/**
  * Force to redraw.
  * @method flush
  * @instance
  * @memberof Chart
  * @example
  * chart.flush();
  */
	flush: function flush() {
		this.internal.updateAndRedraw({
			withLegend: !0,
			withTransition: !1,
			withTransitionForTransform: !1
		});
	},


	/**
  * Reset the chart object and remove element and events completely.
  * @method destroy
  * @instance
  * @memberof Chart
  * @example
  * chart.destroy();
  */
	destroy: function destroy() {
		var $$ = this.internal;

		return _browser.window.clearInterval($$.intervalForObserveInserted), $$.resizeTimeout !== undefined && _browser.window.clearTimeout($$.resizeTimeout), (0, _util.removeEvent)(_browser.window, "resize", $$.resizeFunction), $$.selectChart.classed("bb", !1).html(""), Object.keys($$).forEach(function (key) {
			$$[key] = null;
		}), null;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = win;
var document = exports.document = win.document;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(4),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define tooltip
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var tooltip = function () {};

/**
 * Show tooltip
 * @method tooltip:show
 * @instance
 * @memberof Chart
 * @param {Array} args
 */
tooltip.show = function (args) {
	var $$ = this.internal,
	    index = void 0,
	    mouse = void 0;


	// determine mouse position on the chart
	args.mouse && (mouse = args.mouse), args.data ? $$.isMultipleX() ? (mouse = [$$.x(args.data.x), $$.getYScale(args.data.id)(args.data.value)], index = null) : index = (0, _util.isValue)(args.data.index) ? args.data.index : $$.getIndexByX(args.data.x) : typeof args.x === "undefined" ? typeof args.index !== "undefined" && (index = args.index) : index = $$.getIndexByX(args.x), $$.dispatchEvent("mouseover", index, mouse), $$.dispatchEvent("mousemove", index, mouse), $$.config.tooltip_onshow.call($$, args.data);
}, tooltip.hide = function () {
	this.internal.dispatchEvent("mouseout", 0), this.internal.config.tooltip_onhide.call(this);
}, (0, _util.extend)(_Chart2.default.prototype, { tooltip: tooltip });

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(1),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	isSafari: function isSafari() {
		var ua = window.navigator.userAgent;

		return ua.indexOf("Safari") >= 0 && ua.indexOf("Chrome") < 0;
	},
	isChrome: function isChrome() {
		return window.navigator.userAgent.indexOf("Chrome") >= 0;
	}
});

/***/ })
/******/ ]);
});