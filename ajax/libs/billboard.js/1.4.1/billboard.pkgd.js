/*!
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
 * 
 * @version 1.4.1
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
})(window, function() {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.bb = undefined;

var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _Axis = __webpack_require__(4),
    _Axis2 = _interopRequireDefault(_Axis),
    _util = __webpack_require__(5),
    util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) return obj; var newObj = {}; if (obj != null) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]); return newObj.default = obj, newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace bb
 * @version 1.4.1
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
  *    bb.version;  // "1.0.0"
  * @memberOf bb
  */
	version: "1.4.1",
	/**
  * generate charts
  * @param {Options} options chart options
  * @memberOf bb
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
		var inst = new _Chart2.default(config);

		return inst.internal.charts = this.instance, this.instance.push(inst), inst;
	},

	/**
  * An array containing instance created
  * @property {Array} instance instance array
  * @example
  *  // generate charts
  *  var chart1 = bb.generate(...);
  *  var chart2 = bb.generate(...);
  *
  *  bb.instance;  // [ chart1, chart2, ... ]
  * @memberOf bb
  */
	instance: [],
	/**
  * Internal chart object
  * @private
  */
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

__webpack_require__(9), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42), __webpack_require__(43), __webpack_require__(44), __webpack_require__(45), __webpack_require__(46), __webpack_require__(47), __webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57), __webpack_require__(59), __webpack_require__(8), __webpack_require__(60), __webpack_require__(61);
exports.bb = bb;
exports.default = bb;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(2),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _ChartInternal = __webpack_require__(3),
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(2),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _d3TimeFormat = __webpack_require__(75),
    _d3Selection = __webpack_require__(63),
    _d3Array = __webpack_require__(65),
    _d3Transition = __webpack_require__(66),
    _Axis = __webpack_require__(4),
    _Axis2 = _interopRequireDefault(_Axis),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
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
		$$.datetimeId = "bb-" + +new Date(), $$.clipId = $$.datetimeId + "-clip", $$.clipIdForXAxis = $$.clipId + "-xaxis", $$.clipIdForYAxis = $$.clipId + "-yaxis", $$.clipIdForGrid = $$.clipId + "-grid", $$.clipIdForSubchart = $$.clipId + "-subchart", $$.clipPath = $$.getClipPath($$.clipId), $$.clipPathForXAxis = $$.getClipPath($$.clipIdForXAxis), $$.clipPathForYAxis = $$.getClipPath($$.clipIdForYAxis), $$.clipPathForGrid = $$.getClipPath($$.clipIdForGrid), $$.clipPathForSubchart = $$.getClipPath($$.clipIdForSubchart), $$.dragStart = null, $$.dragging = !1, $$.flowing = !1, $$.cancelClick = !1, $$.mouseover = !1, $$.transiting = !1, $$.color = $$.generateColor(), $$.levelColor = $$.generateLevelColor(), $$.point = $$.generatePoint(), $$.extraLineClasses = $$.generateExtraLineClass(), $$.dataTimeFormat = config.data_xLocaltime ? _d3TimeFormat.timeParse : _d3TimeFormat.utcParse, $$.axisTimeFormat = config.axis_x_localtime ? _d3TimeFormat.timeFormat : _d3TimeFormat.utcFormat, $$.defaultAxisTimeFormat = function (d) {
			var specifier = d.getMilliseconds() && ".%L" || d.getSeconds() && ".:%S" || d.getMinutes() && "%I:%M" || d.getHours() && "%I %p" || d.getDay() && d.getDate() !== 1 && "%-m/%-d" || d.getDate() !== 1 && "%b %d" || d.getMonth() && "%-m/%-d" || "%Y/%-m/%-d";

			return $$.axisTimeFormat(specifier)(d);
		}, $$.hiddenTargetIds = [], $$.hiddenLegendIds = [], $$.focusedTargetIds = [], $$.defocusedTargetIds = [], $$.xOrient = config.axis_rotated ? "left" : "bottom", $$.yOrient = config.axis_rotated ? config.axis_y_inner ? "top" : "bottom" : config.axis_y_inner ? "right" : "left", $$.y2Orient = config.axis_rotated ? config.axis_y2_inner ? "bottom" : "top" : config.axis_y2_inner ? "left" : "right", $$.subXOrient = config.axis_rotated ? "left" : "bottom", $$.isLegendRight = config.legend_position === "right", $$.isLegendInset = config.legend_position === "inset", $$.isLegendTop = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "top-right", $$.isLegendLeft = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "bottom-left", $$.legendStep = 0, $$.legendItemWidth = 0, $$.legendItemHeight = 0, $$.currentMaxTickWidths = {
			x: 0,
			y: 0,
			y2: 0
		}, $$.rotated_padding_left = 30, $$.rotated_padding_right = config.axis_rotated && !config.axis_x_show ? 0 : 30, $$.rotated_padding_top = 5, $$.withoutFadeIn = {}, $$.intervalForObserveInserted = undefined, $$.inputType = $$.convertInputType(), $$.axes.subx = (0, _d3Selection.selectAll)([]);
	}, ChartInternal.prototype.initWithData = function initWithData(data) {
		var $$ = this,
		    config = $$.config,
		    binding = !0;
		$$.axis = new _Axis2.default($$), $$.initBrush && $$.initBrush(), $$.initZoom && $$.initZoom();


		var bindto = {
			element: config.bindto,
			classname: "bb"
		};

		if ((0, _util.isObject)(config.bindto) && (bindto.element = config.bindto.element || "#chart", bindto.classname = config.bindto.classname || bindto.classname), $$.selectChart = (0, _util.isFunction)(bindto.element.node) ? config.bindto.element : (0, _d3Selection.select)(bindto.element ? bindto.element : []), $$.selectChart.empty() && ($$.selectChart = (0, _d3Selection.select)(document.createElement("div")).style("opacity", "0"), $$.observeInserted($$.selectChart), binding = !1), $$.selectChart.html("").classed(bindto.classname, !0), $$.data.xs = {}, $$.data.targets = $$.convertDataToTargets(data), config.data_filter && ($$.data.targets = $$.data.targets.filter(config.data_filter)), config.data_hide && $$.addHiddenTargetIds(config.data_hide === !0 ? $$.mapToIds($$.data.targets) : config.data_hide), config.legend_hide && $$.addHiddenLegendIds(config.legend_hide === !0 ? $$.mapToIds($$.data.targets) : config.legend_hide), $$.hasType("gauge") && (config.legend_show = !1), $$.updateSizes(), $$.updateScales(), $$.x.domain((0, _d3Array.extent)($$.getXDomain($$.data.targets))), $$.y.domain($$.getYDomain($$.data.targets, "y")), $$.y2.domain($$.getYDomain($$.data.targets, "y2")), $$.subX.domain($$.x.domain()), $$.subY.domain($$.y.domain()), $$.subY2.domain($$.y2.domain()), $$.orgXDomain = $$.x.domain(), $$.svg = $$.selectChart.append("svg").style("overflow", "hidden").style("display", "block"), config.interaction_enabled && $$.inputType) {
			var isTouch = $$.inputType === "touch";

			$$.svg.on(isTouch ? "touchstart" : "mouseenter", function () {
				return config.onover.call($$);
			}).on(isTouch ? "touchend" : "mouseleave", function () {
				return config.onout.call($$);
			});
		}

		config.svg_classname && $$.svg.attr("class", config.svg_classname), $$.defs = $$.svg.append("defs"), $$.clipChart = $$.appendClip($$.defs, $$.clipId), $$.clipXAxis = $$.appendClip($$.defs, $$.clipIdForXAxis), $$.clipYAxis = $$.appendClip($$.defs, $$.clipIdForYAxis), $$.clipGrid = $$.appendClip($$.defs, $$.clipIdForGrid), $$.clipSubchart = $$.appendClip($$.defs, $$.clipIdForSubchart), (0, _util.isFunction)(config.color_tiles) && $$.patterns && $$.patterns.forEach(function (p) {
			return $$.defs.append(function () {
				return p.node;
			});
		}), $$.updateSvgSize();


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
		if (config.clipPath && g.attr("clip-path", $$.clipPath), config.grid_lines_front && $$.initGridLines(), $$.initEventRect(), $$.initChartElements(), main.insert("rect", config.zoom_privileged ? null : "g." + _classes2.default.regions).attr("class", _classes2.default.zoomRect).attr("width", $$.width).attr("height", $$.height).style("opacity", "0").on("dblclick.zoom", null), config.axis_x_extent && $$.brush.scale($$.getDefaultExtent()), config.clipPath && $$.axis.init(), $$.updateTargets($$.data.targets), binding && ($$.updateDimension(), config.oninit.call($$), $$.redraw({
			withTransition: !1,
			withTransform: !0,
			withUpdateXDomain: !0,
			withUpdateOrgXDomain: !0,
			withTransitionForAxis: !1
		}), config.data_onmin || config.data_onmax))

			// data.onmin/max callback
			{
				var _minMax = $$.getMinMaxData();

				(0, _util.isFunction)(config.data_onmin) && config.data_onmin.call($$, _minMax.min), (0, _util.isFunction)(config.data_onmax) && config.data_onmax.call($$, _minMax.max);
			}

		// Bind resize event
		$$.bindResize(), $$.api.element = $$.selectChart.node();
	}, ChartInternal.prototype.initChartElements = function initChartElements() {
		var _this = this;

		["Pie", "Bar", "Line", "Arc", "Gauge", "Bubble", "Text"].forEach(function (v) {
			var method = "init" + v;

			_this[method] && _this[method]();
		});
	}, ChartInternal.prototype.smoothLines = function smoothLines(el, type) {
		type === "grid" && el.each(function () {
			var g = (0, _d3Selection.select)(this);

			g.attr({
				"x1": Math.ceil(g.attr("x1")),
				"x2": Math.ceil(g.attr("x2")),
				"y1": Math.ceil(g.attr("y1")),
				"y2": Math.ceil(g.attr("y2"))
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

					index >= 0 && (0, _d3Selection.select)(this).style("display", index % intervalForCulling ? "none" : "block");
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
		var cx = (config.axis_rotated ? $$.circleY : $$.circleX).bind($$),
		    cy = (config.axis_rotated ? $$.circleX : $$.circleY).bind($$);
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
		})), (duration || flow) && $$.isTabVisible() ? (0, _d3Transition.transition)().duration(duration).each(function () {
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

		return (0, _util.isValue)(d.value) ? this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity : "0";
	}, ChartInternal.prototype.opacityForText = function opacityForText() {
		return this.hasDataLabel() ? "1" : "0";
	}, ChartInternal.prototype.xx = function xx(d) {
		return this.config.zoom_enabled && this.zoomScale ? d ? this.zoomScale(d.x) : null : d ? this.x(d.x) : null;
	}, ChartInternal.prototype.xv = function xv(d) {
		var $$ = this,
		    value = d.value;


		return $$.isTimeSeries() ? value = $$.parseDate(d.value) : $$.isCategorized() && (0, _util.isString)(d.value) && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
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
		$$.svg.attr("width", $$.currentWidth).attr("height", $$.currentHeight), $$.svg.selectAll(["#" + $$.clipId, "#" + $$.clipIdForGrid]).select("rect").attr("width", $$.width).attr("height", $$.height), $$.svg.select("#" + $$.clipIdForXAxis).select("rect").attr("x", $$.getXAxisClipX.bind($$)).attr("y", $$.getXAxisClipY.bind($$)).attr("width", $$.getXAxisClipWidth.bind($$)).attr("height", $$.getXAxisClipHeight.bind($$)), $$.svg.select("#" + $$.clipIdForYAxis).select("rect").attr("x", $$.getYAxisClipX.bind($$)).attr("y", $$.getYAxisClipY.bind($$)).attr("width", $$.getYAxisClipWidth.bind($$)).attr("height", $$.getYAxisClipHeight.bind($$)), $$.svg.select("#" + $$.clipIdForSubchart).select("rect").attr("width", $$.width).attr("height", brushHeight), $$.svg.select("." + _classes2.default.zoomRect).attr("width", $$.width).attr("height", $$.height), $$.brush && $$.brush.scale($$.subX, brushHeight);
	}, ChartInternal.prototype.updateDimension = function updateDimension(withoutAxis) {
		var $$ = this;

		withoutAxis || ($$.config.axis_rotated ? ($$.axes.x.call($$.xAxis), $$.axes.subx.call($$.subXAxis)) : ($$.axes.y.call($$.yAxis), $$.axes.y2.call($$.y2Axis))), $$.updateSizes(), $$.updateScales(withoutAxis), $$.updateSvgSize(), $$.transformAll(!1);
	}, ChartInternal.prototype.observeInserted = function observeInserted(selection) {
		var $$ = this;

		if ((0, _util.isUndefined)(MutationObserver)) return void (console && console.error && console.error("MutationObserver not defined."));

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


		return date instanceof Date ? parsedDate = date : (0, _util.isString)(date) ? parsedDate = $$.dataTimeFormat($$.config.data_xFormat)(date) : (0, _util.isNumber)(date) && !isNaN(date) && (parsedDate = new Date(+date)), (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
	}, ChartInternal.prototype.isTabVisible = function isTabVisible() {
		var hidden = void 0;

		return (0, _util.isDefined)(document.hidden) ? hidden = "hidden" : (0, _util.isDefined)(document.mozHidden) ? hidden = "mozHidden" : (0, _util.isDefined)(document.msHidden) ? hidden = "msHidden" : (0, _util.isDefined)(document.webkitHidden) && (hidden = "webkitHidden"), !document[hidden];
	}, ChartInternal.prototype.convertInputType = function convertInputType() {
		var $$ = this,
		    config = $$.config,
		    isMobile = $$.isMobile(),
		    hasMouse = config.interaction_inputType_mouse && !isMobile && "onmouseover" in window,
		    hasTouch = !1;


		return config.interaction_inputType_touch && (hasTouch = "ontouchmove" in window || window.DocumentTouch && document instanceof window.DocumentTouch), hasMouse && "mouse" || hasTouch && "touch" || null;
	}, ChartInternal;
}(); /**
      * Copyright (c) 2017 NAVER Corp.
      * billboard.js project is licensed under the MIT license
      * @ignore
      */


exports.default = ChartInternal;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(2),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _d3Selection = __webpack_require__(63),
    _util = __webpack_require__(5),
    _bb = __webpack_require__(8),
    _bb2 = _interopRequireDefault(_bb),
    _classes = __webpack_require__(7),
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
		$$.axes.x = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisX).attr("clip-path", $$.clipPathForXAxis).attr("transform", $$.getTranslate("x")).style("visibility", config.axis_x_show ? "visible" : "hidden"), $$.axes.x.append("text").attr("class", _classes2.default.axisXLabel).attr("transform", config.axis_rotated ? "rotate(-90)" : "").style("text-anchor", this.textAnchorForXAxisLabel.bind(this)), $$.axes.y = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisY).attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis).attr("transform", $$.getTranslate("y")).style("visibility", config.axis_y_show ? "visible" : "hidden"), $$.axes.y.append("text").attr("class", _classes2.default.axisYLabel).attr("transform", config.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForYAxisLabel.bind(this)), $$.axes.y2 = main.append("g").attr("class", _classes2.default.axis + " " + _classes2.default.axisY2).attr("transform", $$.getTranslate("y2")).style("visibility", config.axis_y2_show ? "visible" : "hidden"), $$.axes.y2.append("text").attr("class", _classes2.default.axisY2Label).attr("transform", config.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
	}, Axis.prototype.getXAxis = function getXAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
		var $$ = this.owner,
		    config = $$.config,
		    isCategory = $$.isCategorized(),
		    axisParams = {
			isCategory: isCategory,
			withOuterTick: withOuterTick,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			withoutTransition: withoutTransition,
			orgXScale: $$.x
		},
		    axis = (0, _bb2.default)(axisParams).scale($$.zoomScale || scale).orient(orient),
		    newTickValues = tickValues;


		return $$.isTimeSeries() && tickValues && !(0, _util.isFunction)(tickValues) && (newTickValues = tickValues.map(function (v) {
			return $$.parseDate(v);
		})), axis.tickFormat(tickFormat).tickValues(newTickValues), isCategory && (axis.tickCentered(config.axis_x_tick_centered), (0, _util.isEmpty)(config.axis_x_tick_culling) && (config.axis_x_tick_culling = !1)), axis;
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
		    tickFormat = config.axis_x_tick_format,
		    isTimeSeries = $$.isTimeSeries(),
		    isCategorized = $$.isCategorized(),
		    format = void 0;


		return tickFormat ? (0, _util.isFunction)(tickFormat) ? format = tickFormat : isTimeSeries && (format = function (date) {
			return date ? $$.axisTimeFormat(tickFormat)(date) : "";
		}) : isTimeSeries ? format = $$.defaultAxisTimeFormat : format = isCategorized ? $$.categoryName : function (v) {
			return v < 0 ? v.toFixed(0) : v;
		}, (0, _util.isFunction)(format) ? function (v) {
			return format.apply($$, isCategorized ? [v, $$.categoryName(v)] : [v]);
		} : format;
	}, Axis.prototype.getTickValues = function getTickValues(tickValues, axis) {
		return tickValues || (axis ? axis.tickValues() : undefined);
	}, Axis.prototype.getXAxisTickValues = function getXAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis);
	}, Axis.prototype.getYAxisTickValues = function getYAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis);
	}, Axis.prototype.getY2AxisTickValues = function getY2AxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis);
	}, Axis.prototype.getLabelOptionByAxisId = function getLabelOptionByAxisId(axisId) {
		var $$ = this.owner;

		return $$.config["axis_" + axisId + "_label"];
	}, Axis.prototype.getLabelText = function getLabelText(axisId) {
		var option = this.getLabelOptionByAxisId(axisId),
		    text = void 0;


		return text = (0, _util.isString)(option) ? option : option ? option.text : null, text;
	}, Axis.prototype.setLabelText = function setLabelText(axisId, text) {
		var $$ = this.owner,
		    config = $$.config,
		    option = this.getLabelOptionByAxisId(axisId);
		(0, _util.isString)(option) ? config["axis_" + axisId + "_label"] = text : option && (option.text = text);
	}, Axis.prototype.getLabelPosition = function getLabelPosition(axisId, defaultPosition) {
		var option = this.getLabelOptionByAxisId(axisId),
		    position = (0, _util.isObjectType)(option) && option.position ? option.position : defaultPosition;


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
			/^y2?$/.test(id) ? (scale = $$[id].copy().domain($$.getYDomain(targetsToShow, id)), axis = this.getYAxis(scale, $$[id + "Orient"], config["axis_" + id + "_tick_format"], $$[id + "AxisTickValues"], !1, !0, !0)) : (scale = $$.x.copy().domain($$.getXDomain(targetsToShow)), axis = this.getXAxis(scale, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, !1, !0, !0), this.updateXAxisTickValues(targetsToShow, axis)), dummy = (0, _d3Selection.select)("body").append("div").classed("bb", !0), svg = dummy.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0px").style("left", "0px"), svg.append("g").call(axis).each(function () {
				(0, _d3Selection.select)(this).selectAll("text").each(function () {
					var boxWidth = this.getBoundingClientRect().width;

					maxWidth < boxWidth && (maxWidth = boxWidth);
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
		var p = (0, _util.isNumber)(padding) ? padding : padding[key];

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.getCssRules = exports.toArray = exports.capitalize = exports.merge = exports.getRectSegList = exports.removeEvent = exports.addEvent = exports.extend = exports.brushEmpty = exports.getBrushSelection = exports.diffDomain = exports.getPathBox = exports.sanitise = exports.hasValue = exports.getOption = exports.asHalfPixel = exports.isFunction = exports.ceil10 = exports.notEmpty = exports.isObjectType = exports.isObject = exports.isEmpty = exports.isArray = exports.isNumber = exports.isString = exports.isBoolean = exports.isUndefined = exports.isDefined = exports.isValue = undefined;

var _typeof2 = __webpack_require__(6),
    _typeof3 = _interopRequireDefault(_typeof2),
    _d3Selection = __webpack_require__(63),
    _d3Brush = __webpack_require__(74),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isValue = function (v) {
	return v || v === 0;
},
    isFunction = function (v) {
	return typeof v === "function";
},
    isString = function (v) {
	return typeof v === "string";
},
    isNumber = function (v) {
	return typeof v === "number";
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
	return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
	return d[1] - d[0];
},
    isObjectType = function (v) {
	return (typeof v === "undefined" ? "undefined" : (0, _typeof3.default)(v)) === "object";
},
    isEmpty = function (o) {
	return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && Object.keys(o).length === 0;
},
    isArray = function (arr) {
	return arr && arr.constructor === Array;
},
    isObject = function (obj) {
	return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
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
	return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
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
	    event = _d3Selection.event;

	// check from event


	return event && event.constructor.name === "BrushEvent" ? selection = event.selection : this.context && (selection = this.context.select("." + _classes2.default.brush).node()) && (selection = (0, _d3Brush.brushSelection)(selection)), selection;
},
    brushEmpty = function () {
	var selection = this.getBrushSelection();

	return !selection || selection[0] === selection[1];
};
/**
 * Check if is array
 * @param {Array} arr
 * @returns {Boolean}
 * @private
 */


/**
 * Check if is object
 * @param {Object} obj
 * @returns {Boolean}
 * @private
 */


/**
 * Replace tag sign to html entity
 * @param {String} str
 * @return {String}
 * @private
 */


// substitution of SVGPathSeg API polyfill


// return brush selection array
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


function extend() {
	var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    source = arguments[1];

	for (var p in source) target[p] = source[p];

	return target;
}

var SUPPORT_ADDEVENTLISTENER = "addEventListener" in document,
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

		isObjectType(eventListenerOptions) && (options = !!SUPPORT_PASSIVE && eventListenerOptions), element.addEventListener(type, handler, options);
	} else element.attachEvent ? element.attachEvent("on" + type, handler) : element["on" + type] = handler;
}

function removeEvent(element, type, handler) {
	element.removeEventListener ? element.removeEventListener(type, handler, !1) : element.detachEvent ? element.detachEvent("on" + type, handler) : element["on" + type] = null;
}

/**
 * Return first letter capitalized
 * @param {String} str
 * @private
 */
var capitalize = function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
},
    merge = function (target) {
	for (var _len = arguments.length, objectN = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) objectN[_key - 1] = arguments[_key];

	if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;

	var source = objectN.shift();

	return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
		var value = source[key];

		isObject(value) ? (!target[key] && (target[key] = {}), target[key] = merge(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
	}), extend.apply(undefined, [target].concat(objectN));
},
    toArray = function (v) {
	return [].slice.call(v);
},
    getCssRules = function (styleSheets) {
	var rules = [];

	return styleSheets.forEach(function (sheet) {
		try {
			sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
		} catch (e) {
			console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
		}
	}), rules;
};

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


/**
 * Copy array like object to array
 * @param {Object} v
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
exports.isValue = isValue;
exports.isDefined = isDefined;
exports.isUndefined = isUndefined;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.isObject = isObject;
exports.isObjectType = isObjectType;
exports.notEmpty = notEmpty;
exports.ceil10 = ceil10;
exports.isFunction = isFunction;
exports.asHalfPixel = asHalfPixel;
exports.getOption = getOption;
exports.hasValue = hasValue;
exports.sanitise = sanitise;
exports.getPathBox = getPathBox;
exports.diffDomain = diffDomain;
exports.getBrushSelection = getBrushSelection;
exports.brushEmpty = brushEmpty;
exports.extend = extend;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.getRectSegList = getRectSegList;
exports.merge = merge;
exports.capitalize = capitalize;
exports.toArray = toArray;
exports.getCssRules = getCssRules;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

exports.default = function (obj) {
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
exports.default = {
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
	legendItemPoint: "bb-legend-item-point",
	legendItemHidden: "bb-legend-item-hidden",
	legendItemFocused: "bb-legend-item-focused",
	dragarea: "bb-dragarea",
	EXPANDED: "_expanded_",
	SELECTED: "_selected_",
	INCLUDED: "_included_"
};
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.default = undefined;

var _typeof2 = __webpack_require__(6),
    _typeof3 = _interopRequireDefault(_typeof2),
    _d3Scale = __webpack_require__(64),
    _d3Selection = __webpack_require__(63),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Features:
// 1. category axis
// 2. ceil values of translate/x/y to int for half pixel anti-aliasing
// 3. multiline tick text

function _default() {

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

		if (scale.ticks) return scale.ticks.apply(scale, tickArguments ? (0, _util.toArray)(tickArguments) : []).map(function (v) {
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
		// to round float numbers from 'binary floating point'
		// https://en.wikipedia.org/wiki/Double-precision_floating-point_format
		// https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand
		var value = /\d+\.\d+0{5,}\d$/.test(v) ? +(v + "").replace(/0+\d$/, "") : v,
		    formatted = tickFormat ? tickFormat(value) : value;


		return (0, _util.isDefined)(formatted) ? formatted : "";
	}

	function transitionise(selection) {
		return params.withoutTransition ? selection.interrupt() : selection.transition(transition);
	}

	function axis(g) {
		g.each(function () {

			// this should be called only when category axis
			function splitTickText(d, maxWidthValue) {

				function split(splitted, text) {
					spaceIndex = undefined;

					for (var i = 1; i < text.length; i++)

					// if text width gets over tick width, split by space index or current index
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

			function tickSize(d) {
				var tickPosition = scale(d) + (tickCentered ? 0 : tickOffset);

				return range[0] < tickPosition && tickPosition < range[1] ? 6 : 0;
			}

			var g = (0, _d3Selection.select)(this);

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
			    sizeFor1Char = _getSizeFor1Char(g.select(".tick")),
			    counts = [],
			    tickLength = Math.max(6, 0) + 3,
			    isVertical = orient === "left" || orient === "right",
			    text = tick.select("text");tspan = text.selectAll("tspan").data(function (d, index) {
				var split = params.tickMultiline ? splitTickText(d, params.tickWidth) : (0, _util.isArray)(textFormatted(d)) ? textFormatted(d).concat() : [textFormatted(d)];

				return counts[index] = split.length, split.map(function (splitted) {
					return {
						index: index,
						splitted: splitted
					};
				});
			}), tspan.exit().remove(), tspan = tspan.enter().append("tspan").merge(tspan).text(function (d) {
				return d.splitted;
			});


			var rotate = params.tickTextRotate;

			if (orient === "bottom" ? (tickTransform = axisX, lineEnter.attr("y2", 6), textEnter.attr("y", 9), lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", tickSize), textUpdate.attr("x", 0).attr("y", function (r) {
				return r ? 11.5 - 2.5 * (r / 15) * (r > 0 ? 1 : -1) : 9;
			}(rotate)).style("text-anchor", function (r) {
				return r ? r > 0 ? "start" : "end" : "middle";
			}(rotate)).attr("transform", function (r) {
				return r ? "rotate(" + r + ")" : "";
			}(rotate)), tspan.attr("x", 0).attr("dy", tspanDy).attr("dx", function (r) {
				return r ? 8 * Math.sin(Math.PI * (r / 180)) : 0;
			}(rotate)), pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize)) : orient === "top" ? (tickTransform = axisX, lineEnter.attr("y2", -6), textEnter.attr("y", -9), lineUpdate.attr("x2", 0).attr("y2", -6), textUpdate.attr("x", 0).attr("y", -9), text.style("text-anchor", "middle"), tspan.attr("x", 0).attr("dy", "0em"), pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize)) : orient === "left" ? (tickTransform = axisY, lineEnter.attr("x2", -6), textEnter.attr("x", -9), lineUpdate.attr("x2", -6).attr("y1", tickY).attr("y2", tickY), textUpdate.attr("x", -9).attr("y", tickOffset), text.style("text-anchor", "end"), tspan.attr("x", -9).attr("dy", tspanDy), pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize)) : orient === "right" ? (tickTransform = axisY, lineEnter.attr("x2", 6), textEnter.attr("x", 9), lineUpdate.attr("x2", 6).attr("y2", 0), textUpdate.attr("x", 9).attr("y", 0), text.style("text-anchor", "start"), tspan.attr("x", 9).attr("dy", tspanDy), pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize)) : void 0, params.tickTitle && textUpdate.append && textUpdate.append("title").each(function (index) {
				(0, _d3Selection.select)(this).text(params.tickTitle[index]);
			}), scale1.bandwidth) {
				var x = scale1,
				    dx = x.bandwidth() / 2;
				scale0 = function (d) {
					return x(d) + dx;
				}, scale1 = scale0;
			} else scale0.bandwidth ? scale0 = scale1 : tickExit.call(tickTransform, scale1);

			tickEnter.call(tickTransform, scale0), tickUpdate.call(tickTransform, scale1);
		});
	}

	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    scale = (0, _d3Scale.scaleLinear)(),
	    orient = "bottom",
	    outerTickSize = params.withOuterTick ? 6 : 0,
	    tickValues = null,
	    tickFormat = void 0,
	    tickArguments = void 0,
	    tickOffset = 0,
	    tickCulling = !0,
	    tickCentered = void 0,
	    transition = void 0,
	    _getSizeFor1Char = function getSizeFor1Char(tick) {
		// default size for one character
		var size = {
			h: 11.5,
			w: 5.5
		};

		return tick.empty() || tick.select("text").text("0").call(function (el) {
			var box = el.node().getBBox(),
			    h = box.height,
			    w = box.width;
			h && w && (size.h = h, size.w = w), el.text("");
		}), _getSizeFor1Char = function getSizeFor1Char() {
			return size;
		}, size;
	};

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
	}, axis.tickInterval = function (size) {
		var interval = void 0;

		if (params.isCategory) interval = tickOffset * 2;else {
			var length = axis.g.select("path.domain").node().getTotalLength() - outerTickSize * 2;

			interval = length / (size || axis.g.selectAll("line").size());
		}

		return interval === Infinity ? 0 : interval;
	}, axis.ticks = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];

		return args.length ? (tickArguments = (0, _util.toArray)(args), axis) : tickArguments;
	}, axis.tickCulling = function (culling) {
		return arguments.length ? (tickCulling = culling, axis) : tickCulling;
	}, axis.tickValues = function (x) {
		if ((0, _util.isFunction)(x)) tickValues = function () {
				return x(scale.domain());
			};else {
			if (!arguments.length) return tickValues;

			tickValues = x;
		}

		return this;
	}, axis.setTransition = function (t) {
		return transition = t, this;
	}, axis;
} /**
   * Copyright (c) 2017 NAVER Corp.
   * billboard.js project is licensed under the MIT license
   * @ignore
   */
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Options = __webpack_require__(10),
    _Options2 = _interopRequireDefault(_Options),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getOptions: function getOptions() {
		var config = new _Options2.default();

		return (0, _util.merge)(config.value, this.additionalConfig);
	},


	additionalConfig: {},

	/**
  * Load configuration option
  * @param {Object} config User's generation config value
  * @private
  */
	loadConfig: function loadConfig(config) {
		var thisConfig = this.config,
		    target = void 0,
		    keys = void 0,
		    read = void 0,
		    find = function () {
			var key = keys.shift();

			return key && target && (0, _util.isObjectType)(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
		};
		Object.keys(thisConfig).forEach(function (key) {
			target = config, keys = key.split("_"), read = find(), (0, _util.isDefined)(read) && (thisConfig[key] = read);
		});
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;

var _classCallCheck2 = __webpack_require__(2),
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
                     * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.
                     * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).<br><br>
                     * If this option is not specified, the chart will be generated but not be set. Instead, we can access the element by chart.element and set it by ourselves.<br>
                     * - **NOTE:**
                     *  > When chart is not bound, it'll start observing if `chart.element` is bound by MutationObserver.<br>
                     *  > In this case, polyfill is required in IE9 and IE10 because they do not support MutationObserver.<br>
                     *  > On the other hand, if chart always will be bound, polyfill will not be required because MutationObserver will never be called.
                     * @name bindto
                     * @memberOf Options
                     * @property {String|HTMLElement|d3.selection} bindto=#chart Specify the element where chart will be drawn.
                     * @property {String|HTMLElement|d3.selection} bindto.element=#chart Specify the element where chart will be drawn.
                     * @property {String} [bindto.classname=bb] Specify the class name of bind element.<br>
                     *     **NOTE:** When class name isn't `bb`, then you also need to update the default CSS to be rendered correctly.
                     * @default #chart
                     * @example
                     * bindto: "#myContainer"
                     *
                     * // or HTMLElement
                     * bindto: document.getElementById("myContainer")
                     *
                     * // or D3 selection object
                     * bindto: d3.select("#myContainer")
                     *
                     * // or to change default classname
                     * bindto: {
                     *    element: "#chart",
                     *    classname: "bill-board"  // ex) <div id='chart' class='bill-board'>
                     * }
                     */
																				bindto: "#chart",

																				/**
                     * Set clip-path property of chart element
                     * - **NOTE:**
                     *  > When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
                     *  > Is to make chart element positioned over axis element.
                     * @name clipPath
                     * @memberOf Options
                     * @type {Boolean}
                     * @default true
                     * @example
                     * clipPath: false
                     */
																				clipPath: !0,

																				/**
                     * Set svg element's class name
                     * @name svg
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [zoom.enabled=false] Enable zooming.
                     * @property {Boolean} [zoom.rescale=false] Enable to rescale after zooming.<br>
                     *  If true set, y domain will be updated according to the zoomed region.
                     * @property {Array} [zoom.extent=[1, 10]] Change zoom extent.
                     * @property {Number} [zoom.x.min] Set x Axis minimum zoom range
                     * @property {Number} [zoom.x.max] Set x Axis maximum zoom range
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
                     *      x: {
                     *          min: -1,  // set min range
                     *          max: 10  // set max range
                     *      },
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @name data․x
                     * @memberOf Options
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
                     * @name data․xs
                     * @memberOf Options
                     * @type {Object}
                     * @default {}
                     * @example
                     * data: {
                              *   xs: {
                              *      data1: "x1",
                              *      data2: "x2"
                              *   }
                     * }
                     */
																				data_xs: {},

																				/**
                     * Set a format to parse string specifed as x.
                     * @name data․xFormat
                     * @memberOf Options
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
                     * @name data․xLocaltime
                     * @memberOf Options
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
                     * @name data․xSort
                     * @memberOf Options
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
                     * @name data․names
                     * @memberOf Options
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
                     * @name data․classes
                     * @memberOf Options
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
                     * @name data․groups
                     * @memberOf Options
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
                     * @name data․axes
                     * @memberOf Options
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
                     * - area
                     * - area-line-range
                     * - area-spline
                     * - area-spline-range
                     * - area-step
                     * - bar
                     * - bubble
                     * - donut
                     * - gauge
                     * - line
                     * - pie
                     * - scatter
                     * - spline
                     * - step
                     * @name data․type
                     * @memberOf Options
                     * @type {String}
                     * @default line
                     * @example
                     * data: {
                     *    type: "bar"
                     * }
                     */
																				data_type: undefined,

																				/**
                     * Set chart type for each data.<br>
                     * This setting overwrites data.type setting.
                     * @name data․types
                     * @memberOf Options
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
                     * @name data․labels
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [donut.labels=false] Show or hide labels on each data points
                     * @property {Function} [donut.labels.format={}] Set formatter function for data labels.<br>
                     * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:<br>
                     *  - `v` is the value of the data point where the label is shown.
                     *  - `id` is the id of the data where the label is shown.
                     *  - `i` is the index of the data point where the label is shown.
                     *  - `j` is the sub index of the data point where the label is shown.<br><br>
                     * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
                     * @property {Number} [data.labels.position.x=0] x coordinate position, relative the original.
                     * @property {NUmber} [data.labels.position.y=0] y coordinate position, relative the original.
                     * @memberOf Options
                     * @type {Object}
                     * @default {}
                     * @example
                     * data: {
                     *   labels: true,
                     *
                     *   // or set specific options
                     *   labels: {
                     *     format: function(v, id, i, j) { ... },
                     *
                     *     // it's possible to set for each data
                     *     format: {
                     *         data1: function(v, id, i, j) { ... },
                     *         ...
                     *     },
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
                     * @name data․order
                     * @memberOf Options
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
                     * @name data․regions
                     * @memberOf Options
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
                     * @name data․color
                     * @memberOf Options
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
                     * @name data․colors
                     * @memberOf Options
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
                     * @name data․hide
                     * @memberOf Options
                     * @type {Boolean|Array}
                     * @default false
                     * @example
                     * data: {
                     *   // all of data will be hidden
                     *   hide: true
                     *
                     *   // specified data will be hidden
                     *   hide: ["data1", ...]
                     * }
                     */
																				data_hide: !1,
																				data_filter: undefined,

																				/**
                     * Set data selection enabled.<br><br>
                     * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
                     * @name data․selection․enabled
                     * @memberOf Options
                     * @type {Boolean}
                     * @default false
                     * @example
                     * data: {
                     *    selection: {
                     *       enabled: true
                     *    }
                     * }
                     */
																				data_selection_enabled: !1,

																				/**
                     * Set grouped selection enabled.<br><br>
                     * If this option set true, multiple data points that have same x value will be selected by one selection.
                     * @name data․selection․grouped
                     * @memberOf Options
                     * @type {Boolean}
                     * @default false
                     * @example
                     * data: {
                     *    selection: {
                     *       grouped: true
                     *    }
                     * }
                     */
																				data_selection_grouped: !1,

																				/**
                     * Set a callback for each data point to determine if it's selectable or not.<br><br>
                     * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
                     * @name data․selection․isselectable
                     * @memberOf Options
                     * @type {Function}
                     * @default function() { return true; }
                     * @example
                     * data: {
                     *    selection: {
                     *       isselectable: function(d) { ... }
                     *    }
                     * }
                     */
																				data_selection_isselectable: function data_selection_isselectable() {
																														return !0;
																				},

																				/**
                     * Set multiple data points selection enabled.<br><br>
                     * If this option set true, multile data points can have the selected state at the same time. If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
                     * @name data․selection․multiple
                     * @memberOf Options
                     * @type {Boolean}
                     * @default true
                     * @example
                     * data: {
                     *    selection: {
                     *       multiple: false
                     *    }
                     * }
                     */
																				data_selection_multiple: !0,

																				/**
                     * Enable to select data points by dragging.<br><br>
                     * If this option set true, data points can be selected by dragging.
                     * **NOTE:** If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
                     * @name data․selection․draggable
                     * @memberOf Options
                     * @type {Boolean}
                     * @default false
                     * @example
                     * data: {
                     *    selection: {
                     *       draggable: true
                     *   }
                     * }
                     */
																				data_selection_draggable: !1,

																				/**
                     * Set a callback for click event on each data point.<br><br>
                     * This callback will be called when each data point clicked and will receive d and element as the arguments. d is the data clicked and element is the element clicked. In this callback, this will be the Chart object.
                     * @name data․onclick
                     * @memberOf Options
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
                     * @name data․onover
                     * @memberOf Options
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
                     * @name data․onout
                     * @memberOf Options
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
                     * @name data․onselected
                     * @memberOf Options
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
                     * @name data․onunselected
                     * @memberOf Options
                     * @type {Function}
                     * @default function() {}
                     * @example
                     * data: {
                     *     onunselected: function(d, element) {
                     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
                     *        // element - <circle>
                     *        ...
                     *    }
                     * }
                     */
																				data_onunselected: function data_onunselected() {},

																				/**
                     * Set a callback for minimum data
                     * @name data․onmin
                     * @memberOf Options
                     * @type {Function}
                     * @default undefined
                     * @example
                     *  onmin: function(data) {
                     *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
                        *    ...
                     *  }
                     */
																				data_onmin: undefined,

																				/**
                     * Set a callback for maximum data
                     * @name data․onmax
                     * @memberOf Options
                     * @type {Function}
                     * @default undefined
                     * @example
                     *  onmax: function(data) {
                     *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
                        *    ...
                     *  }
                     */
																				data_onmax: undefined,

																				/**
                     * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
                     * @name data․url
                     * @memberOf Options
                     * @type {String}
                     * @default undefined
                     * @example
                     * data: {
                     *     url: "/data/test.csv"
                     * }
                     */
																				data_url: undefined,
																				data_headers: undefined,

																				/**
                     * Parse a JSON object for data. See also data.keys.
                     * @name data․json
                     * @memberOf Options
                     * @type {Object}
                     * @default undefined
                     * @see data․keys
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
                     * @name data․rows
                     * @memberOf Options
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
                     *
                     * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
                     * // - an array of [high, mid, low] data following the order
                     * // - or an object with 'high', 'mid' and 'low' key value
                     * data: {
                     *   rows: [
                     *      ["data1", "data2"],
                     *      [
                     *        // or {high:150, mid: 140, low: 110}, 120
                     *        [150, 140, 110], 120
                     *      ],
                     *      [[155, 130, 115], 55],
                     *      [[160, 135, 120], 60]
                     *   ],
                     *   types: {
                     *       data1: "area-line-range",
                     *       data2: "line"
                     *   }
                     * }
                     */
																				data_rows: undefined,

																				/**
                     * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
                     * @name data․columns
                     * @memberOf Options
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
                     *
                     * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
                     * // - an array of [high, mid, low] data following the order
                     * // - or an object with 'high', 'mid' and 'low' key value
                     * data: {
                     *   columns: [
                     *      ["data1",
                     *          [150, 140, 110],  // or {high:150, mid: 140, low: 110}
                     *          [150, 140, 110],
                     *          [150, 140, 110]
                     *      ]
                     *   ],
                     *   type: "area-line-range"
                     * }
                     */
																				data_columns: undefined,

																				/**
                     * Used if loading JSON via data.url.
                     * @name data․mimeType
                     * @memberOf Options
                     * @type {String}
                     * @default undefined
                     * @example
                     * data: {
                     *     mimeType: "json"
                     * }
                     */
																				data_mimeType: undefined,

																				/**
                     * Choose which JSON object keys correspond to desired data.
                     * @name data․keys
                     * @memberOf Options
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
                     * @name data․empty․label․text
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
                     * @type {Object}
                     * @property {Array} [color.pattern] custom color pattern
                     * @property {Function} [color.tiles] if defined, allows use svg's patterns to fill data area. It should return an array of [SVGPatternElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement).
                     *  - **Note:** The pattern element's id will be defined as `bb-colorize-pattern-$COLOR-VALUE`.<br>
                     *    ex. When color pattern value is `['red', '#fff']` and defined 2 patterns,then ids for pattern elements are:<br>
                     *    - `bb-colorize-pattern-red`
                     *    - `bb-colorize-pattern-fff`
                     * @property {Object} [color.threshold] color threshold
                     * @property {String} [color.threshold.unit] unit
                     * @property {Array} [color.threshold.value] value
                     * @property {Array} [color.threshold.max=100] max value
                     * @example
                     *  color: {
                     *      pattern: ["#1f77b4", "#aec7e8", ...],
                     *
                     *      // Set colors' patterns
                     *      // it should return an array of SVGPatternElement
                     *      tiles: function() {
                     *         var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
                     *         var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                     *         var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                     *
                     *         pattern.setAttribute("patternUnits", "userSpaceOnUse");
                     *         pattern.setAttribute("width", "32");
                     *         pattern.setAttribute("height", "32");
                     *
                     *         g.style.fill = "#000";
                     *         g.style.opacity = "0.2";
                              *
                     *         circle1.setAttribute("cx", "3");
                     *         circle1.setAttribute("cy", "3");
                     *         circle1.setAttribute("r", "3");
                              *
                     *         g.appendChild(circle1);
                     *         pattern.appendChild(g);
                     *
                     *         return [pattern];
                     *      }
                     *  }
                     */
																				color_pattern: [],
																				color_tiles: undefined,
																				color_threshold: {},

																				/**
                     * Legend options
                     * @name legend
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [legend.show=true] Show or hide legend.
                     * @property {Boolean} [legend.hide=false] Hide legend
                     *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
                     * @property {String|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
                     * @property {String|Function} [legend.contents.template=undefined] Set item's template.<br>
                     *  - If set `string` value, within template the 'color' and 'title' can be replaced using template-like syntax string:
                     *    - {=COLOR}: data color value
                     *    - {=TITLE}: data title value
                     *  - If set `function` value, will pass following arguments to the given function:
                     *   - title {String}: data's id value
                     *   - color {String}: color string
                     *   - data {Array}: data array
                     * @property {String} [legend.position=bottom] Change the position of legend.<br>
                     *  Available values are: `bottom`, `right` and `inset` are supported.
                     * @property {Object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
                     *  This option accepts object that has the keys `anchor`, `x`, `y` and `step`.
                     *  - **anchor** decides the position of the legend:
                     *   - top-left
                     *   - top-right
                     *   - bottom-left
                     *   - bottom-right
                     *  - **x** and **y**:
                     *   - set the position of the legend based on the anchor.
                     *  - **step**:
                     *   - defines the max step the legend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
                     * @property {Boolean} [legend.equally=false] Set to all items have same width size.
                     * @property {Boolean} [legend.padding=0] Set padding value
                     * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
                     * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
                     * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
                     * @property {Number} [legend.item.tile.width=10] Set width of item tile element
                     * @property {Number} [legend.item.tile.height=10] Set height of item tile element
                     * @property {Boolean} [legend.usePoint=false] Whether to use custom points in legend.
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
                     *          template: function(id, color, data) {
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
                     *      },
                     *      usePoint: true
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
																				legend_usePoint: !1,

																				/**
                     * Switch x and y axis position.
                     * @name axis․rotated
                     * @memberOf Options
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
                     * @name axis․x․show
                     * @memberOf Options
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
                     * @name axis․x․type
                     * @memberOf Options
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
                     * @name axis․x․localtime
                     * @memberOf Options
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
                     * @name axis․x․categories
                     * @memberOf Options
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
                     * @name axis․x․tick․centered
                     * @memberOf Options
                     * @type {Boolean}
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
                     * @name axis․x․tick․format
                     * @memberOf Options
                     * @type {Function}
                     * @default undefined
                     * @example
                     * axis: {
                     *   x: {
                     *     tick: {
                     *        // for timeseries, a 'datetime' object is given as parameter
                     *       format: function(x) {
                     *           return x.getFullYear();
                     *       }
                     *
                     *       // for category, index(Number) and categoryName(String) are given as parameter
                     *       format: function(index, categoryName) {
                     *           return categoryName.substr(0, 10);
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
                     * @name axis․x․tick․culling
                     * @memberOf Options
                     * @type {Boolean}
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
                     * @name axis․x․tick․culling․max
                     * @memberOf Options
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
                     * @name axis․x․tick․count
                     * @memberOf Options
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
                     * @name axis․x․tick․fit
                     * @memberOf Options
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
                     * @name axis․x․tick․values
                     * @memberOf Options
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
                     * @name axis․x․tick․rotate
                     * @memberOf Options
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
                     * @name axis․x․tick․outer
                     * @memberOf Options
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
                     * @name axis․x․tick․multiline
                     * @memberOf Options
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
                     * @name axis․x․tick․width
                     * @memberOf Options
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
                     * Set to display system tooltip for tick text
                     * - **Note:** Only available for category axis type (`axis.x.type='category'`)
                     * @name axis․x․tick․tooltip
                     * @memberOf Options
                     * @type {Boolean}
                     * @default false
                     * @example
                     * axis: {
                     *   x: {
                     *     tick: {
                     *       tooltip: true
                     *     }
                     *   }
                     * }
                     */
																				axis_x_tick_tooltip: !1,

																				/**
                     * Set max value of x axis range.
                     * @name axis․x․max
                     * @memberOf Options
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
                     * @name axis․x․min
                     * @memberOf Options
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
                     * @name axis․x․padding
                     * @memberOf Options
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
                     * @name axis․x․height
                     * @memberOf Options
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
                     * @name axis․x․extent
                     * @memberOf Options
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
                     * @name axis․x․label
                     * @memberOf Options
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
                     * @name axis․y․show
                     * @memberOf Options
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
                     * @name axis․y․type
                     * @memberOf Options
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
                     * @name axis․y․max
                     * @memberOf Options
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
                     * @name axis․y․min
                     * @memberOf Options
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
                     * @name axis․y․inverted
                     * @memberOf Options
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
                     * @name axis․y․center
                     * @memberOf Options
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
                     * @name axis․y․inner
                     * @memberOf Options
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
                     * @name axis․y․label
                     * @memberOf Options
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
                     * @name axis․y․tick․format
                     * @memberOf Options
                     * @type {Function}
                     * @default undefined
                     * @example
                     * axis: {
                     *   y: {
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
                     * @name axis․y․tick․outer
                     * @memberOf Options
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
                     * @name axis․y․tick․values
                     * @memberOf Options
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
                     * @name axis․y․tick․count
                     * @memberOf Options
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
                     * @name axis․y․tick․time
                     * @memberOf Options
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
                     * @name axis․y․padding
                     * @memberOf Options
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
                     * @name axis․y․default
                     * @memberOf Options
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
                     * @name axis․y2․show
                     * @memberOf Options
                     * @type {Boolean}
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
                     * @name axis․y2․max
                     * @memberOf Options
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
                     * @name axis․y2․min
                     * @memberOf Options
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
                     * @name axis․y2․inverted
                     * @memberOf Options
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
                     * @name axis․y2․center
                     * @memberOf Options
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
                     * @name axis․y2․inner
                     * @memberOf Options
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
                     * @name axis․y2․label
                     * @memberOf Options
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
                     * @name axis․y2․tick․format
                     * @memberOf Options
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
                     * @name axis․y2․tick․outer
                     * @memberOf Options
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
                     * @name axis․y2․tick․values
                     * @memberOf Options
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
                     * @name axis․y2․tick․count
                     * @memberOf Options
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
                     * @name axis․y2․padding
                     * @memberOf Options
                     * @type {Object}
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
                     * @name axis․y2․default
                     * @memberOf Options
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
                     * @memberOf Options
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
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [point.show=true] Whether to show each point in line.
                     * @property {Number|Function} [point.r=2.5] The radius size of each point.<br>
                     *  - **Note:** Disabled for 'bubble' type
                     * @property {Boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
                     * @property {Boolean} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.<br>
                     *  - **Note:** For 'bubble' type, the default is `bubbleSize*1.15`
                     * @property {Number} [point.select.r=point.r*4] The radius size of each point on selected.
                     * @property {String} [point.type="circle"] The type of point to be drawn<br>
                     * - **Note:**
                     *  - If chart has 'bubble' type, only circle can be used.
                     *  - For IE, non circle point expansions are not supported due to lack of transform support.
                     * - **Available Values:**
                     *  - circle
                     *  - rectangle
                     * @property {Array} [point.pattern=[]] The type of point or svg shape as string, to be drawn for each line<br>
                     * - **Note:**
                     *  - This is an `experimental` feature and can have some unexpected behaviors.
                     *  - If chart has 'bubble' type, only circle can be used.
                     *  - For IE, non circle point expansions are not supported due to lack of transform support.
                     * - **Available Values:**
                     *  - circle
                     *  - rectangle
                     *  - svg shape tag interpreted as string<br>
                     *    (ex. `<polygon points='2.5 0 0 5 5 5'></polygon>`)
                     * @example
                     *  point: {
                     *      show: false,
                     *      r: 5,
                     *
                     *      // or customize the radius
                     *      r: function(d) {
                     *          ...
                     *          return r;
                     *      },
                     *
                     *      focus: {
                     *          expand: {
                     *              enabled: true,
                     *              r: 1
                     *          }
                     *      },
                     *      select: {
                     *          r: 3
                     *      },
                     *
                     *      // valid values are "circle" or "rectangle"
                     *      type: "rectangle",
                     *
                     *      // or indicate as pattern
                    	 *      pattern: [
                    	 *        "circle",
                    	 *        "rectangle",
                    	 *        "<polygon points='0 6 4 0 -4 0'></polygon>"
                    	 *     ],
                     *  }
                     */
																				point_show: !0,
																				point_r: 2.5,
																				point_sensitivity: 10,
																				point_focus_expand_enabled: !0,
																				point_focus_expand_r: undefined,
																				point_pattern: [],
																				point_select_r: undefined,
																				point_type: "circle",

																				/**
                     * Set line options
                     * @name line
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
                     *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
                     * @property {Array}   [line.classes=undefined] If set, used to set a css class on each line.
                     * @property {Boolean} [line.step.type=step] Change step type for step chart.<br>
                     * **Available values:**
                     * - step
                     * - step-before
                     * - step-after
                     * @example
                     *  line: {
                     *      connectNull: true,
                     *      classes: [
                     *          "line-class1",
                     *          "line-class2"
                     *      ],
                     *      step: {
                     *          type: "step-after"
                     *      }
                     *  }
                     */
																				line_connectNull: !1,
																				line_step_type: "step",
																				line_classes: undefined,

																				/**
                     * Set bar options
                     * @name bar
                     * @memberOf Options
                     * @type {Object}
                     * @property {Number} [bar.width] Change the width of bar chart.
                     * @property {Number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
                     * @property {Number} [bar.width.max] The maximum width value for ratio.
                     * @property {Boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
                     * @property {Boolean} [bar.padding=0] The padding pixel value between each bar.
                     * @example
                     *  bar: {
                     *      width: 10,
                     *      // or
                     *      width: {
                     *          ratio: 0.2,
                     *          max: 20
                     *      },
                     *      zerobased: false,
                     *      padding: 1
                     *  }
                     */
																				bar_width: undefined,
																				bar_width_ratio: .6,
																				bar_width_max: undefined,
																				bar_zerobased: !0,
																				bar_padding: 0,

																				/**
                     * Set bubble options
                     * @name bubble
                     * @memberOf Options
                     * @type {Object}
                     * @property {Number|Function} [bubble.maxR=35] Set the max bubble radius value
                     * @example
                     *  bubble: {
                     *      // ex) If 100 is the highest value among data bound, the representation bubble of 100 will have radius of 50.
                     *      // And the lesser will have radius relatively from tha max value.
                     *      maxR: 50,
                     *
                     *      // or set radius callback
                     *      maxR: function(d) {
                     *          // ex. of d param - {x: Fri Oct 06 2017 00:00:00 GMT+0900, value: 80, id: "data2", index: 5}
                     *          ...
                     *          return Math.sqrt(d.value * 2);
                     *      }
                     *  }
                     */
																				bubble_maxR: 35,

																				/**
                     * Set area options
                     * @name area
                     * @memberOf Options
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
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [pie.label.show=true] Show or hide label on each pie piece.
                     * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
                     * @property {Number} [pie.label.threshold=0.05] Set threshold to show/hide labels.
                     * @property {Number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
                     * @property {Boolean} [pie.expand=true] Enable or disable expanding pie pieces.
                     * @property {Number} [pie.innerRadius=0] Sets the inner radius of pie arc.
                     * @property {Number} [pie.padAngle=0] Set padding between data.
                     * @property {Number} [pie.padding=0] Sets the gap between pie arcs.
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
                     *              ...
                     *              return ratio;
                     *          },
                     *          // or set ratio number
                     *          ratio: 0.5
                     *      },
                     *      expand: false,
                     *      innerRadius: 0,
                     *      padAngle: 0.1,
                     *      padding: 0
                     *  }
                     */
																				pie_label_show: !0,
																				pie_label_format: undefined,
																				pie_label_threshold: .05,
																				pie_label_ratio: undefined,
																				pie_expand: {},
																				pie_expand_duration: 50,
																				pie_innerRadius: 0,
																				pie_padAngle: 0,
																				pie_padding: 0,

																				/**
                     * Set gauge options
                     * @name gauge
                     * @memberOf Options
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
                     * @memberOf Options
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
																				donut_label_threshold: .05,
																				donut_label_ratio: undefined,
																				donut_width: undefined,
																				donut_title: "",
																				donut_expand: {},
																				donut_expand_duration: 50,
																				donut_padAngle: 0,

																				/**
                     * Set spline options
                     * @name spline
                     * @memberOf Options
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
                     * @memberOf Options
                     * @type {Array}
                     * @default []
                     * @example
                     *  regions: [
                     *    {
                     *      axis: "x",
                     *      start: 1,
                     *      end: 4,
                     *      class: "region-1-4"
                     *    }
                     *  ]
                     */
																				regions: [],

																				/**
                     * Tooltip options
                     * @name tooltip
                     * @memberOf Options
                     * @type {Object}
                     * @property {Boolean} [tooltip.show=true] Show or hide tooltip.<br>
                     * @property {Boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
                     * @property {Boolean} [tooltip.linked=false] Set if tooltips on all visible charts with like x points are shown together when one is shown.<br>
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
                     * @property {Boolean} [tooltip.init.show=false] Show tooltip at the initialization.
                     * @property {Number} [tooltip.init.x=0] Set x Axis index to be shown at the initialization.
                     * @property {Object} [tooltip.init.position={top: "0px",left: "50px"}] Set the position of tooltip at the initialization.
                     * @property {Function} [tooltip.onshow] Set a callback that will be invoked before the tooltip is shown.
                     * @property {Function} [tooltip.onhide] Set a callback that will be invoked before the tooltip is hidden.
                     * @property {Function} [tooltip.onshown] Set a callback that will be invoked after the tooltip is shown
                     * @property {Function} [tooltip.onhidden] Set a callback that will be invoked after the tooltip is hidden.
                     * @property {String|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
                     *  **Available Values:**
                     *  - `desc`: In descending data value order
                     *  - `asc`: In ascending data value order
                     *  - `null`: It keeps the data display order<br>
                     *     **NOTE:** When `data.groups` is set, the order will follow as the stacked graph order.<br>
                     *      If want to order as data bound, set any value rather than asc, desc or null. (ex. empty string "")
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
                     *      },
                     *
                     *      // show at the initialization
                     *      init: {
                     *          show: true,
                     *          x: 2,
                     *          position: {
                     *              top: "150px",
                     *              left: "250px"
                     *          }
                     *      },
                     *
                     *      // fires prior tooltip is shown
                     *      onshow: function() { ...},
                     *      // fires prior tooltip is hidden
                     *      onhide: function() { ... },
                     *      // fires after tooltip is shown
                     *      onshown: function() { ... },
                     *      // fires after tooltip is hidden
                     *      onhidden: function() { ... },
                     *
                     *      // Link any tooltips when multiple charts are on the screen where same x coordinates are available
                     *      // Useful for timeseries correlation
                     *      linked: true
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
																				tooltip_linked: !1,
																				tooltip_onshow: function tooltip_onshow() {},
																				tooltip_onhide: function tooltip_onhide() {},
																				tooltip_onshown: function tooltip_onshown() {},
																				tooltip_onhidden: function tooltip_onhidden() {},
																				tooltip_order: null,

																				/**
                     * Set title options
                     * @name title
                     * @memberOf Options
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Scale = __webpack_require__(64),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getScale: function getScale(min, max, forTimeseries) {
		return (forTimeseries ? (0, _d3Scale.scaleTime)() : (0, _d3Scale.scaleLinear)()).range([min, max]);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Array = __webpack_require__(65),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// selection
(0, _util.extend)(_ChartInternal2.default.prototype, {
	getYDomainMinMax: function getYDomainMinMax(targets, type) {
		var $$ = this,
		    config = $$.config,
		    isMin = type === "min",
		    dataGroups = config.data_groups,
		    ids = $$.mapToIds(targets),
		    ys = $$.getValuesAsIdKeyed(targets),
		    f = isMin ? _d3Array.min : _d3Array.max;


		return dataGroups.length > 0 && function () {

			for (var hasValue = $$["has" + (isMin ? "Negative" : "Positive") + "ValueInTargets"](targets), baseId = void 0, idsInGroup = void 0, j = 0; idsInGroup = dataGroups[j]; j++) if (idsInGroup = idsInGroup.filter(function (v) {
				return ids.indexOf(v) >= 0;
			}), idsInGroup.length !== 0) {

					// Consider values
					if (baseId = idsInGroup[0], hasValue && ys[baseId]) {
						var setter = isMin ? function (v, i) {
							ys[baseId][i] = v < 0 ? v : 0;
						} : function (v, i) {
							ys[baseId][i] = v > 0 ? v : 0;
						};

						ys[baseId].forEach(setter);
					}

					// Compute min
					for (var id, _ret2, _loop = function (k, id) {
						return ys[id] ? void ys[id].forEach(function (v, i) {
							var val = +v,
							    meetCondition = isMin ? val > 0 : val < 0;
							$$.axis.getId(id) === $$.axis.getId(baseId) && ys[baseId] && !(hasValue && meetCondition) && (ys[baseId][i] += val);
						}) : "continue";
					}, k = 1; id = idsInGroup[k]; k++) _ret2 = _loop(k, id), _ret2 === "continue";
				}
		}(), f(Object.keys(ys).map(function (key) {
			return f(ys[key]);
		}));
	},
	getYDomainMin: function getYDomainMin(targets) {
		return this.getYDomainMinMax(targets, "min");
	},
	getYDomainMax: function getYDomainMax(targets) {
		return this.getYDomainMinMax(targets, "max");
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
		    paddingTop = domainLength * .1,
		    paddingBottom = domainLength * .1;


		if ((0, _util.isDefined)(center)) {
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
	getXDomainMinMax: function getXDomainMinMax(targets, type) {
		var $$ = this,
		    value = $$.config["axis_x_" + type],
		    f = type === "min" ? _d3Array.min : _d3Array.max;


		return (0, _util.isDefined)(value) ? $$.isTimeSeries() ? $$.parseDate(value) : value : f(targets, function (t) {
			return f(t.values, function (v) {
				return v.x;
			});
		});
	},
	getXDomainMin: function getXDomainMin(targets) {
		return this.getXDomainMinMax(targets, "min");
	},
	getXDomainMax: function getXDomainMax(targets) {
		return this.getXDomainMinMax(targets, "max");
	},
	getXDomainPadding: function getXDomainPadding(domain) {
		var $$ = this,
		    config = $$.config,
		    diff = domain[1] - domain[0],
		    xPadding = config.axis_x_padding,
		    maxDataCount = void 0,
		    padding = void 0,
		    paddingLeft = void 0,
		    paddingRight = void 0;


		return $$.isCategorized() ? padding = 0 : $$.hasType("bar") ? (maxDataCount = $$.getMaxDataCount(), padding = maxDataCount > 1 ? diff / (maxDataCount - 1) / 2 : .5) : padding = diff * .01, (0, _util.isObject)(xPadding) && (0, _util.notEmpty)(xPadding) ? (paddingLeft = (0, _util.isValue)(xPadding.left) ? xPadding.left : padding, paddingRight = (0, _util.isValue)(xPadding.right) ? xPadding.right : padding) : (0, _util.isNumber)(config.axis_x_padding) ? (paddingLeft = xPadding, paddingRight = xPadding) : (paddingLeft = padding, paddingRight = padding), {
			left: paddingLeft,
			right: paddingRight
		};
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

		return firstX - lastX !== 0 || $$.isCategorized() || ($$.isTimeSeries() ? (firstX = new Date(firstX.getTime() * .5), lastX = new Date(lastX.getTime() * 1.5)) : (firstX = firstX === 0 ? 1 : firstX * .5, lastX = lastX === 0 ? -1 : lastX * 1.5)), (firstX || firstX === 0) && (min = $$.isTimeSeries() ? new Date(firstX.getTime() - padding.left) : firstX - padding.left), (lastX || lastX === 0) && (max = $$.isTimeSeries() ? new Date(lastX.getTime() + padding.right) : lastX + padding.right), [min, max];
	},
	updateXDomain: function updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
		var $$ = this,
		    config = $$.config,
		    zoomEnabled = config.zoom_enabled;


		if (withUpdateOrgXDomain && ($$.x.domain(domain || (0, _d3Array.extent)($$.getXDomain(targets))), $$.orgXDomain = $$.x.domain(), zoomEnabled && $$.zoom.updateScaleExtent(), $$.subX.domain($$.x.domain()), $$.brush && $$.brush.scale($$.subX)), withUpdateXDomain) {
			var domainValue = domain || !$$.brush || $$.brushEmpty() ? $$.orgXDomain : $$.getBrushSelection().map(function (v) {
				return $$.subX.invert(v);
			});

			$$.x.domain(domainValue), zoomEnabled && $$.zoom.updateScaleExtent();
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Array = __webpack_require__(65),
    _d3Collection = __webpack_require__(70),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		return (0, _d3Collection.set)(Object.keys(xs).map(function (id) {
			return xs[id];
		})).size() > 1;
	},
	isMultipleX: function isMultipleX() {
		return (0, _util.notEmpty)(this.config.data_xs) || !this.config.data_xSort || this.hasType("bubble") || this.hasType("scatter");
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

		return (0, _util.isDefined)(x) ? x : null;
	},
	getNextX: function getNextX(i) {
		var x = this.xs[i + 1];

		return (0, _util.isDefined)(x) ? x : null;
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
			min = (0, _d3Array.min)([min, (0, _d3Array.min)(v, function (t) {
				return t.value;
			})]), max = (0, _d3Array.max)([max, (0, _d3Array.max)(v, function (t) {
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
		var $$ = this;

		if (!$$.cache.$minMaxData) {
			var data = $$.data.targets.map(function (t) {
				return t.values;
			}),
			    minMax = $$.getMinMaxValue(data),
			    min = [],
			    max = [];
			data.forEach(function (v) {
				var minData = $$.getFilteredDataByValue(v, minMax.min),
				    maxData = $$.getFilteredDataByValue(v, minMax.max);
				minData.length && (min = min.concat(minData)), maxData.length && (max = max.concat(maxData));
			}), $$.cache.$minMaxData = { min: min, max: max };
		}

		return $$.cache.$minMaxData;
	},


	/**
  * Get total data sum
  * @private
  * @return {Number}
  */
	getTotalDataSum: function getTotalDataSum() {
		var $$ = this;

		if (!$$.cache.$totalDataSum) {
			var total = 0;

			$$.data.targets.map(function (t) {
				return t.values;
			}).forEach(function (v) {
				total += (0, _d3Array.sum)(v, function (t) {
					return t.value;
				});
			}), $$.cache.$totalDataSum = total;
		}

		return $$.cache.$totalDataSum;
	},


	/**
  * Get filtered data by value
  * @param {Object} data
  * @param {Number} value
  * @return {Array} filtered array data
  * @private
  */
	getFilteredDataByValue: function getFilteredDataByValue(data, value) {
		return data.filter(function (t) {
			return t.value === value;
		});
	},


	/**
  * Return the max length of the data
  * @return {Number} max data length
  * @private
  */
	getMaxDataCount: function getMaxDataCount() {
		return (0, _d3Array.max)(this.data.targets, function (t) {
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
		var ids = this.mapToIds(targets);

		for (var val, i = 0; val = ids[i]; i++) if (val === id) return !0;

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
		    xs = (0, _d3Collection.set)((0, _d3Array.merge)(targets.map(function (t) {
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
		var $$ = this,
		    ys = {};


		return targets.forEach(function (t) {
			var data = [];

			t.values.forEach(function (v) {
				var value = v.value;

				(0, _util.isArray)(value) ? data.push.apply(data, value) : $$.isObject(value) && "high" in value ? data.push.apply(data, Object.values(value)) : data.push(value);
			}), ys[t.id] = data;
		}), ys;
	},
	checkValueInTargets: function checkValueInTargets(targets, checker) {
		var ids = Object.keys(targets),
		    values = void 0;


		for (var i = 0; i < ids.length; i++) {
			values = targets[ids[i]].values;


			for (var j = 0; j < values.length; j++) if (checker(values[j].value)) return !0;
		}

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

		return (0, _util.isString)(config.data_order) && config.data_order.toLowerCase() === type;
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
		return (0, _d3Array.merge)(targets.map(function (t) {
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
		var dataLabels = this.config.data_labels;

		return (0, _util.isBoolean)(dataLabels) && dataLabels || (0, _util.isObjectType)(dataLabels) && (0, _util.notEmpty)(dataLabels);
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
			var shape = $$.main.select("." + _classes2.default.bars + $$.getTargetSelectorSuffix(v.id) + " ." + _classes2.default.bar + "-" + v.index).node();

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
		var converted = (0, _util.isArray)(values) ? values.concat() : [values];

		if (!this.isCategorized()) return values;

		for (var i = values.length + 1; i > 0; i--) converted[i] = converted[i - 1];

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
	convertValuesToRange: function convertValuesToRange(values) {
		var converted = (0, _util.isArray)(values) ? values.concat() : [values],
		    ranges = [];


		return converted.forEach(function (range) {
			var x = range.x,
			    id = range.id;
			ranges.push({
				x: x,
				id: id,
				value: range.value[0]
			}), ranges.push({
				x: x,
				id: id,
				value: range.value[2]
			});
		}), ranges;
	},
	updateDataAttributes: function updateDataAttributes(name, attrs) {
		var $$ = this,
		    config = $$.config,
		    current = config["data_" + name];
		return (0, _util.isUndefined)(attrs) ? current : (Object.keys(attrs).forEach(function (id) {
			current[id] = attrs[id];
		}), $$.redraw({ withLegend: !0 }), current);
	},
	getAreaRangeData: function getAreaRangeData(d, type) {
		if ((0, _util.isArray)(d.value)) {
			var index = ["high", "mid", "low"].indexOf(type);

			return index === -1 ? 0 : d.value[index];
		}

		return d.value[type];
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Dsv = __webpack_require__(76),
    _d3Collection = __webpack_require__(70),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	convertUrlToData: function convertUrlToData(url) {
		var _this = this,
		    mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "csv",
		    headers = arguments[2],
		    keys = arguments[3],
		    done = arguments[4],
		    req = new XMLHttpRequest();

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
				req.setRequestHeader(header, headers[header]);
			}

		req.open("GET", url), req.onreadystatechange = function () {
			if (req.readyState === 4) if (req.status === 200) {
					var response = req.responseText;

					response && done.call(_this, _this["convert" + (0, _util.capitalize)(mimeType) + "ToData"](mimeType === "json" ? JSON.parse(response) : response, keys));
				} else throw new Error(url + ": Something went wrong loading!");
		}, req.send();
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
			rows: _d3Dsv.csvParseRows,
			parse: _d3Dsv.csvParse
		}, xsv);
	},
	convertTsvToData: function convertTsvToData(tsv) {
		return this._convertCsvTsvToData({
			rows: _d3Dsv.tsvParseRows,
			parse: _d3Dsv.tsvParse
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
		    newRows = [];


		for (var i = 1, len1 = rows.length; i < len1; i++) {
			var newRow = {};

			for (var j = 0, len2 = rows[i].length; j < len2; j++) {
				if ((0, _util.isUndefined)(rows[i][j])) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");

				newRow[keys[j]] = rows[i][j];
			}

			newRows.push(newRow);
		}

		return newRows;
	},
	convertColumnsToData: function convertColumnsToData(columns) {
		var newRows = [];

		for (var i = 0, len1 = columns.length; i < len1; i++) {
			var key = columns[i][0];

			for (var j = 1, len2 = columns[i].length; j < len2; j++) {

				if ((0, _util.isUndefined)(newRows[j - 1]) && (newRows[j - 1] = {}), (0, _util.isUndefined)(columns[i][j])) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");

				newRows[j - 1][key] = columns[i][j];
			}
		}

		return newRows;
	},
	convertDataToTargets: function convertDataToTargets(data, appendXs) {
		var _this3 = this,
		    $$ = this,
		    config = $$.config,
		    ids = (0, _d3Collection.keys)(data[0]).filter($$.isNotX, $$),
		    xs = (0, _d3Collection.keys)(data[0]).filter($$.isX, $$);

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
					    value = d[id] === null || isNaN(d[id]) ? (0, _util.isArray)(d[id]) || $$.isObject(d[id]) && d[id].high ? d[id] : null : +d[id],
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
			return $$.addCache(d.id_org, d);
		}), targets;
	}
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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
		}), $$.data.targets = $$.data.targets.concat(targets)), $$.updateTargets($$.data.targets), $$.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		}), args.done && args.done();
	},
	loadFromArgs: function loadFromArgs(args) {
		var $$ = this;

		// reset internally cached data
		$$.resetCache(), args.data ? $$.load($$.convertDataToTargets(args.data), args) : args.url ? $$.convertUrlToData(args.url, args.mimeType, args.headers, args.keys, function (data) {
			$$.load($$.convertDataToTargets(data), args);
		}) : args.json ? $$.load($$.convertDataToTargets($$.convertJsonToData(args.json, args.keys)), args) : args.rows ? $$.load($$.convertDataToTargets($$.convertRowsToData(args.rows)), args) : args.columns ? $$.load($$.convertDataToTargets($$.convertColumnsToData(args.columns)), args) : $$.load(null, args);
	},
	unload: function unload(rawTargetIds, customDoneCb) {
		var $$ = this,
		    done = customDoneCb,
		    targetIds = rawTargetIds;

		// reset internally cached data


		// If no target, call done and return
		return $$.resetCache(), done || (done = function () {}), targetIds = targetIds.filter(function (id) {
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Drag = __webpack_require__(73),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get mouse event
var _getMouseEvent = function getMouseEvent() {
	var getParams = function () {
		return {
			bubbles: !1, cancelable: !1, screenX: 0, screenY: 0, clientX: 0, clientY: 0
		};
	};

	try {
		new MouseEvent("t"), _getMouseEvent = function getMouseEvent() {
			return function (eventType) {
				var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getParams();
				return new MouseEvent(eventType, params);
			};
		};
	} catch (e) {
		_getMouseEvent = function getMouseEvent() {
			return function (eventType) {
				var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getParams(),
				    mouseEvent = document.createEvent("MouseEvent");

				// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

				return mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, // the event's mouse click count
				params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), mouseEvent;
			};
		};
	}

	return _getMouseEvent();
}; /**
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
				var touch = _d3Selection.event.changedTouches[0];

				return (0, _d3Selection.select)(document.elementFromPoint(touch.clientX, touch.clientY));
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

					preventEvent(_d3Selection.event), selectRect(this);
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
			(0, _d3Selection.select)(this).classed(_classes2.default.EXPANDED, !0), config.data_selection_enabled && eventRect.style("cursor", config.data_selection_grouped ? "pointer" : null), config.tooltip_grouped || ($$.hideXGridFocus(), $$.hideTooltip(), !config.data_selection_grouped && ($$.unexpandCircles(index), $$.unexpandBars(index)));
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

				var mouse = (0, _d3Selection.mouse)(context),
				    closest = $$.findClosestFromTargets(targetsToShow, mouse),
				    sameXData = void 0;


				if ($$.mouseover && (!closest || closest.id !== $$.mouseover.id) && (config.data_onout.call($$.api, $$.mouseover), $$.mouseover = undefined), !closest) return void $$.unselectRect();

				sameXData = $$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped ? [closest] : $$.filterByX(targetsToShow, closest.x);


				// show tooltip when cursor is close to some point
				var selectedData = sameXData.map(function (d) {
					return $$.addName(d);
				});

				$$.showTooltip(selectedData, context), config.point_focus_expand_enabled && $$.expandCircles(closest.index, closest.id, !0), $$.expandBars(closest.index, closest.id, !0), $$.showXGridFocus(selectedData), ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && ($$.svg.select("." + _classes2.default.eventRect).style("cursor", "pointer"), !$$.mouseover && (config.data_onover.call($$.api, closest), $$.mouseover = closest));
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
		}).call(config.data_selection_draggable && $$.drag ? (0, _d3Drag.drag)().origin(Object).on("drag", function () {
			$$.drag((0, _d3Selection.mouse)(this));
		}).on("dragstart", function () {
			$$.dragstart((0, _d3Selection.mouse)(this));
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
					$$.isStepType(d) && $$.config.line_step_type === "step-after" && (0, _d3Selection.mouse)(this)[0] < $$.x($$.getXValue(d.id, index)) && (index -= 1), index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, eventRect, index);
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
			var targetsToShow = $$.filterTargetsToShow($$.data.targets);

			// select if selection enabled
			if (!$$.hasArcType(targetsToShow)) {

					var mouse = (0, _d3Selection.mouse)(this),
					    closest = $$.findClosestFromTargets(targetsToShow, mouse);
					!closest || ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && $$.main.selectAll("." + _classes2.default.shapes + $$.getTargetSelectorSuffix(closest.id)).selectAll("." + _classes2.default.shape + "-" + closest.index).each(function () {
						(config.data_selection_grouped || $$.isWithinShape(this, closest)) && ($$.toggleShape(this, closest, closest.index), $$.config.data_onclick.call($$.api, closest, this));
					});
				}
		}).call(config.data_selection_draggable && $$.drag ? (0, _d3Drag.drag)().origin(Object).on("drag", function () {
			$$.drag((0, _d3Selection.mouse)(this));
		}).on("dragstart", function () {
			$$.dragstart((0, _d3Selection.mouse)(this));
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
  * Dispatch a mouse event.
  * @private
  * @param {String} type event type
  * @param {Number} index Index of eventRect
  * @param {Array} mouse x and y coordinate value
  */
	dispatchEvent: function dispatchEvent(type, index, mouse) {
		var $$ = this,
		    selector = "." + ($$.isMultipleX() ? _classes2.default.eventRect : _classes2.default.eventRect + "-" + index),
		    eventRect = $$.main.select(selector).node(),
		    box = eventRect.getBoundingClientRect(),
		    x = box.left + (mouse ? mouse[0] : 0),
		    y = box.top + (mouse ? mouse[1] : 0),
		    mouseEvent = _getMouseEvent();
		eventRect.dispatchEvent(mouseEvent(type, {
			screenX: x,
			screenY: y,
			clientX: x,
			clientY: y
		}));
	}
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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


	/**
  * Get the parent rect element's size
  * @param {String} key property/attribute name
  * @private
  */
	getParentRectValue: function getParentRectValue(key) {
		for (var offsetName = "offset" + (0, _util.capitalize)(key), parent = this.selectChart.node(), v = void 0; !v && parent && parent.tagName !== "BODY";) {
			try {
				v = parent.getBoundingClientRect()[key];
			} catch (e) {
				offsetName in parent && (v = parent[offsetName]);
			}

			parent = parent.parentNode;
		}

		if (key === "width") {
			// Sometimes element's width value is incorrect(ex. flex container)
			// In this case, use body's offsetWidth instead.
			var bodyWidth = document.body.offsetWidth;

			v > bodyWidth && (v = bodyWidth);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Shape = __webpack_require__(62),
    _d3Selection = __webpack_require__(63),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	getShapeIndices: function getShapeIndices(typeFilter) {
		var $$ = this,
		    config = $$.config,
		    indices = {},
		    i = 0;


		return $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)).forEach(function (d) {
			for (var j = 0; j < config.data_groups.length; j++) if (!(config.data_groups[j].indexOf(d.id) < 0)) for (var _k5 = 0; _k5 < config.data_groups[j].length; _k5++) if (config.data_groups[j][_k5] in indices) {
					indices[d.id] = indices[config.data_groups[j][_k5]];

					break;
				}

			(0, _util.isUndefined)(indices[d.id]) && (indices[d.id] = i++);
		}), indices.__max__ = i - 1, indices;
	},
	getShapeX: function getShapeX(offset, targetsNum, indices, isSub) {
		var $$ = this,
		    scale = isSub ? $$.subX : $$.zoomScale ? $$.zoomScale : $$.x,
		    barPadding = $$.config.bar_padding;


		return function (d) {
			var index = d.id in indices ? indices[d.id] : 0,
			    x = d.x || d.x === 0 ? scale(d.x) - offset * (targetsNum / 2 - index) : 0;

			// adjust x position for bar.padding option


			return offset && x && targetsNum > 1 && barPadding && (index && (x += barPadding * index), targetsNum > 2 ? x -= (targetsNum - 1) * barPadding / 2 : targetsNum === 2 && (x -= barPadding / 2)), x;
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

				t.id === d.id || indices[t.id] !== indices[d.id] || targetIds.indexOf(t.id) < targetIds.indexOf(d.id) && (((0, _util.isUndefined)(values[i]) || +values[i].x !== +d.x) && (i = -1, values.forEach(function (v, j) {
					var x1 = v.x.constructor === Date ? +v.x : v.x,
					    x2 = d.x.constructor === Date ? +d.x : d.x;
					x1 === x2 && (i = j);
				})), i in values && values[i].value * d.value >= 0 && (offset += scale(values[i].value) - y0));
			}), offset;
		};
	},
	isWithinShape: function isWithinShape(that, d) {
		var $$ = this,
		    shape = (0, _d3Selection.select)(that),
		    isWithin = void 0;


		return $$.isTargetToShow(d.id) ? $$.hasValidPointType(that.nodeName) ? isWithin = $$.isStepType(d) ? $$.isWithinStep(that, $$.getYScale(d.id)(d.value)) : $$.isWithinCircle(that, $$.pointSelectR(d) * 1.5) : that.nodeName === "path" && (isWithin = !shape.classed(_classes2.default.bar) || $$.isWithinBar(that)) : isWithin = !1, isWithin;
	},
	getInterpolate: function getInterpolate(d) {
		var $$ = this,
		    interpolation = $$.getInterpolateType(d);


		return {
			"basis": _d3Shape.curveBasis,
			"basis-closed": _d3Shape.curveBasisClosed,
			"basis-open": _d3Shape.curveBasisOpen,
			"bundle": _d3Shape.curveBundle,
			"cardinal": _d3Shape.curveCardinal,
			"cardinal-closed": _d3Shape.curveCardinalClosed,
			"cardinal-open": _d3Shape.curveCardinalOpen,
			"catmull-rom": _d3Shape.curveCatmullRom,
			"catmull-rom-closed": _d3Shape.curveCatmullRomClosed,
			"catmull-rom-open": _d3Shape.curveCatmullRomOpen,
			"monotone-x": _d3Shape.curveMonotoneX,
			"monotone-y": _d3Shape.curveMonotoneY,
			"natural": _d3Shape.curveNatural,
			"linear-closed": _d3Shape.curveLinearClosed,
			"linear": _d3Shape.curveLinear,
			"step": _d3Shape.curveStep,
			"step-after": _d3Shape.curveStepAfter,
			"step-before": _d3Shape.curveStepBefore
		}[interpolation];
	},
	getInterpolateType: function getInterpolateType(d) {
		var $$ = this,
		    interpolation = $$.isInterpolationType($$.config.spline_interpolation_type) ? $$.config.spline_interpolation_type : "cardinal";


		return $$.isSplineType(d) ? interpolation : $$.isStepType(d) ? $$.config.line_step_type : "linear";
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Shape = __webpack_require__(62),
    _d3Array = __webpack_require__(65),
    _d3Interpolate = __webpack_require__(67),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	initPie: function initPie() {
		var $$ = this,
		    config = $$.config,
		    padAngle = $$.hasType("pie") && config.pie_padding ? config.pie_padding * .01 : config[config.data_type + "_padAngle"] ? config[config.data_type + "_padAngle"] : 0;
		$$.pie = (0, _d3Shape.pie)().padAngle(padAngle).value(function (d) {
			return d.values.reduce(function (a, b) {
				return a + b.value;
			}, 0);
		}), config.data_order || $$.pie.sort(null);
	},
	updateRadius: function updateRadius() {
		var $$ = this,
		    config = $$.config,
		    w = config.gauge_width || config.donut_width;
		$$.radiusExpanded = Math.min($$.arcWidth, $$.arcHeight) / 2, $$.radius = $$.radiusExpanded * .95, $$.innerRadiusRatio = w ? ($$.radius - w) / $$.radius : .6;


		var innerRadius = config.pie_innerRadius ? config.pie_innerRadius : config.pie_padding ? config.pie_padding * ($$.innerRadiusRatio + .1) : 0;

		$$.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ? $$.radius * $$.innerRadiusRatio : innerRadius;
	},
	updateArc: function updateArc() {
		var $$ = this;

		$$.svgArc = $$.getSvgArc(), $$.svgArcExpanded = $$.getSvgArcExpanded(), $$.svgArcExpandedSub = $$.getSvgArcExpanded(.98);
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
		    arc = (0, _d3Shape.arc)().outerRadius($$.radius).innerRadius($$.innerRadius),
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
		    arc = (0, _d3Shape.arc)().outerRadius($$.radiusExpanded * (rate || 1)).innerRadius($$.innerRadius);


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

		return updated && !$$.hasType("gauge") && (c = this.svgArc.centroid(updated), x = isNaN(c[0]) ? 0 : c[0], y = isNaN(c[1]) ? 0 : c[1], h = Math.sqrt(x * x + y * y), ratio = $$.hasType("donut") && config.donut_label_ratio ? (0, _util.isFunction)(config.donut_label_ratio) ? config.donut_label_ratio(d, $$.radius, h) : config.donut_label_ratio : $$.hasType("pie") && config.pie_label_ratio ? (0, _util.isFunction)(config.pie_label_ratio) ? config.pie_label_ratio(d, $$.radius, h) : config.pie_label_ratio : $$.radius && (h ? (36 / $$.radius > .375 ? 1.175 - 36 / $$.radius : .8) * $$.radius / h : 0), translate = "translate(" + x * ratio + "," + y * ratio + ")"), translate;
	},
	getArcRatio: function getArcRatio(d) {
		var $$ = this,
		    config = $$.config,
		    val = null;


		if (d)
			// if has padAngle set, calculate rate based on value
			if ($$.pie.padAngle()()) {
				var total = $$.getTotalDataSum();

				$$.hiddenTargetIds.length && (total -= (0, _d3Array.sum)($$.api.data.values.call($$.api, $$.hiddenTargetIds))), val = d.value / total;
			} else val = (d.endAngle - d.startAngle) / (Math.PI * ($$.hasType("gauge") && !config.gauge_fullCircle ? 1 : 2));

		return val;
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
				$$.transiting || (window.clearInterval(interval), $$.legend.selectAll("." + _classes2.default.legendItemFocused).size() > 0 && $$.expandArc(targetIds));
			}, 10));

		var newTargetIds = $$.mapToTargetIds(targetIds);

		$$.svg.selectAll($$.selectorTargets(newTargetIds, "." + _classes2.default.chartArc)).each(function (d) {
			$$.shouldExpand(d.data.id) && (0, _d3Selection.select)(this).selectAll("path").transition().duration($$.expandDuration(d.data.id)).attr("d", $$.svgArcExpanded).transition().duration($$.expandDuration(d.data.id) * 2).attr("d", $$.svgArcExpandedSub);
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


			var interpolate = (0, _d3Interpolate.interpolate)(this._current, updated);

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
					var touch = _d3Selection.event.changedTouches[0],
					    eventArc = (0, _d3Selection.select)(document.elementFromPoint(touch.clientX, touch.clientY));


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
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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
		    w = (0, _util.isNumber)(config.bar_width) ? config.bar_width : barTargetsNum ? axis.tickInterval($$.getMaxDataCount()) * config.bar_width_ratio / barTargetsNum : 0;


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
			    indexY = +!indexX;

			// switch points if axis is rotated, not applicable for sub chart


			return "M " + points[0][indexX] + "," + points[0][indexY] + "\n\t\t\t\tL " + points[1][indexX] + "," + points[1][indexY] + "\n\t\t\t\tL " + points[2][indexX] + "," + points[2][indexY] + "\n\t\t\t\tL " + points[3][indexX] + "," + points[3][indexY] + " z";
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
		var mouse = (0, _d3Selection.mouse)(that),
		    list = (0, _util.getRectSegList)(that),
		    box = that.getBBox(),
		    seg0 = list[0],
		    seg1 = list[1],
		    x = Math.min(seg0.x, seg1.x),
		    y = Math.min(seg0.y, seg1.y),
		    w = box.width,
		    h = box.height;


		return x - 2 < mouse[0] && mouse[0] < x + w + 2 && y - 2 < mouse[1] && mouse[1] < y + h + 2;
	}
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Array = __webpack_require__(65),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initializer
  * @private
  */
	initBubble: function initBubble() {
		var $$ = this,
		    config = $$.config;
		$$.hasType("bubble") && (config.point_show = !0, config.point_type = "circle", config.point_sensitivity = 25);
	},


	/**
  * Get user agent's computed value for the total length of the path in user units
  * https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength
  * @return {Number}
  * @private
  */
	getBaseLength: function getBaseLength() {
		var $$ = this;

		return $$.cache.$baseLength || ($$.cache.$baseLength = (0, _d3Array.min)([$$.axes.x.select("path").node().getTotalLength(), $$.axes.y.select("path").node().getTotalLength()])), $$.cache.$baseLength;
	},


	/**
  * Get the radius value for bubble circle
  * @param {Object} d
  * @return {Number}
  * @private
 	 */
	getBubbleR: function getBubbleR(d) {
		var $$ = this,
		    maxR = $$.config.bubble_maxR;
		(0, _util.isFunction)(maxR) ? maxR = maxR(d) : !(0, _util.isNumber)(maxR) && (maxR = $$.getBaseLength() / ($$.getMaxDataCount() * 2) + 12);


		var max = (0, _d3Array.max)($$.getMinMaxData().max.map(function (d) {
			return d.value;
		})),
		    maxArea = maxR * maxR * Math.PI,
		    area = d.value * (maxArea / max);


		return Math.sqrt(area / Math.PI);
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Shape = __webpack_require__(62),
    _d3Selection = __webpack_require__(63),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

		$$.mainLine = $$.main.selectAll("." + _classes2.default.lines).selectAll("." + _classes2.default.line).data($$.lineData.bind($$)), $$.mainLine.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $$.mainLine = $$.mainLine.enter().append("path").attr("class", function (d) {
			var extraLineClass = $$.extraLineClasses(d) ? " " + $$.extraLineClasses(d) : "";

			return $$.classLine.bind($$)(d) + extraLineClass;
		}).style("stroke", $$.color).merge($$.mainLine).style("opacity", $$.initialOpacity.bind($$)).style("shape-rendering", function (d) {
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
			return config.data_groups.length > 0 ? getPoints(d, i)[0][1] : $$.isAreaRangeType(d) ? yScaleGetter.call($$, d.id)($$.getAreaRangeData(d, "mid")) : yScaleGetter.call($$, d.id)(d.value);
		},
		    line = (0, _d3Shape.line)();


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
		    xOffset = $$.isCategorized() ? .5 : 0,
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
			return $$.orgAreaOpacity = (0, _d3Selection.select)(this).style("opacity"), "0";
		}).merge($$.mainArea), $$.mainArea.style("opacity", $$.orgAreaOpacity);
	},
	redrawArea: function redrawArea(drawArea, withTransition) {
		var $$ = this;

		return [(withTransition ? this.mainArea.transition(Math.random().toString()) : this.mainArea).attr("d", drawArea).style("fill", this.color).style("opacity", function (d) {
			return $$.isAreaRangeType(d) ? $$.orgAreaOpacity / 1.75 : $$.orgAreaOpacity;
		})];
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
		};


		return function (d) {
			var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values,
			    x0 = 0,
			    y0 = 0,
			    path = void 0;


			if ($$.isAreaType(d)) {
				var isAreaRangeType = $$.isAreaRangeType(d),
				    area = (0, _d3Shape.area)();
				area = axisRotated ? isAreaRangeType ? area.x0(function (d) {
					return yScaleGetter.call($$, d.id)($$.getAreaRangeData(d, "high"));
				}).x1(function (d) {
					return yScaleGetter.call($$, d.id)($$.getAreaRangeData(d, "low"));
				}).y(xValue) : area.x0(value0).x1(value1).y(xValue) : isAreaRangeType ? area.x(xValue).y0(function (d) {
					return yScaleGetter.call($$, d.id)($$.getAreaRangeData(d, "high"));
				}).y1(function (d) {
					return yScaleGetter.call($$, d.id)($$.getAreaRangeData(d, "low"));
				}) : area.x(xValue).y0(config.area_above ? 0 : value0).y1(value1), lineConnectNull || (area = area.defined(function (d) {
					return d.value !== null;
				})), $$.isStepType(d) && (values = $$.convertValuesToStep(values)), path = area.curve($$.getInterpolate(d))(values);
			} else values[0] && (x0 = $$.x(values[0].x), y0 = $$.getYScale(d.id)(values[0].value)), path = axisRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;

			return path || "M 0 0";
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

		$$.config.point_show && ($$.mainCircle = $$.main.selectAll("." + _classes2.default.circles).selectAll("." + _classes2.default.circle).data($$.lineScatterBubbleData.bind($$)), $$.mainCircle.exit().remove(), $$.mainCircle = $$.mainCircle.enter().append($$.point("create", this, $$.classCircle.bind($$), $$.pointR.bind($$), $$.color)).merge($$.mainCircle).style("opacity", $$.initialOpacityForCircle.bind($$)));
	},
	redrawCircle: function redrawCircle(cx, cy, withTransition, flow) {
		var $$ = this,
		    selectedCircles = $$.main.selectAll("." + _classes2.default.selectedCircle);


		if (!$$.config.point_show) return [];

		var mainCircles = [];

		$$.mainCircle.each(function (d) {
			var fn = $$.point("update", $$, cx, cy, $$.opacityForCircle.bind($$), $$.color, withTransition, flow, selectedCircles).bind(this),
			    result = fn(d);
			mainCircles.push(result);
		});


		var posAttr = $$.isCirclePoint() ? "c" : "";

		return [mainCircles, selectedCircles.attr(posAttr + "x", cx).attr(posAttr + "y", cy)];
	},
	circleX: function circleX(d) {
		var $$ = this,
		    hasValue = (0, _util.isValue)(d.x);


		return $$.config.zoom_enabled && $$.zoomScale ? hasValue ? $$.zoomScale(d.x) : null : hasValue ? $$.x(d.x) : null;
	},
	updateCircleY: function updateCircleY() {
		var $$ = this,
		    lineIndices = void 0,
		    getPoints = void 0;
		$$.config.data_groups.length > 0 ? (lineIndices = $$.getShapeIndices($$.isLineType), getPoints = $$.generateGetLinePoints(lineIndices), $$.circleY = function (d, i) {
			return getPoints(d, i)[0][1];
		}) : $$.circleY = function (d) {
			return $$.isAreaRangeType(d) ? $$.getYScale(d.id)($$.getAreaRangeData(d, "mid")) : $$.getYScale(d.id)(d.value);
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
		reset && $$.unexpandCircles();


		var circles = $$.getCircles(i, id).classed(_classes2.default.EXPANDED, !0),
		    scale = r(circles) / $$.config.point_r;
		$$.isCirclePoint() ? circles.attr("r", r) : circles.each(function () {
			var point = (0, _d3Selection.select)(this),
			    box = this.getBBox(),
			    x1 = box.x + box.width * .5,
			    y1 = box.y + box.height * .5;

			this.tagName === "circle" ? point.attr("r", r) : point.style("transform", "translate(" + (1 - scale) * x1 + "px, " + (1 - scale) * y1 + "px) scale(" + scale + ")");
		});
	},
	unexpandCircles: function unexpandCircles(i) {
		var $$ = this,
		    r = $$.pointR.bind($$),
		    circles = $$.getCircles(i).filter(function () {
			return (0, _d3Selection.select)(this).classed(_classes2.default.EXPANDED);
		}).classed(_classes2.default.EXPANDED, !1),
		    scale = r(circles) / $$.config.point_r;
		circles.attr("r", r), $$.isCirclePoint() || circles.style("transform", "scale(" + scale + ")");
	},
	pointR: function (d) {
		var $$ = this,
		    config = $$.config,
		    pointR = config.point_r,
		    r = pointR;


		return $$.isStepType(d) ? r = 0 : $$.isBubbleType(d) ? r = $$.getBubbleR(d) : (0, _util.isFunction)(pointR) && (r = pointR(d)), r;
	},
	pointExpandedR: function pointExpandedR(d) {
		var $$ = this,
		    config = $$.config,
		    scale = $$.isBubbleType(d) ? 1.15 : 1.75;


		return config.point_focus_expand_enabled ? config.point_focus_expand_r || $$.pointR(d) * scale : $$.pointR(d);
	},
	pointSelectR: function pointSelectR(d) {
		var $$ = this,
		    selectR = $$.config.point_select_r;


		return (0, _util.isFunction)(selectR) ? selectR(d) : selectR || $$.pointR(d) * 4;
	},
	isWithinCircle: function isWithinCircle(node, r) {
		var mouse = (0, _d3Selection.mouse)(node),
		    element = (0, _d3Selection.select)(node),
		    prefix = this.isCirclePoint() ? "c" : "",
		    cx = +element.attr(prefix + "x"),
		    cy = +element.attr(prefix + "y");


		// if node don't have cx/y or x/y attribute value
		if (!(cx || cy) && node.nodeType === 1) {
			var domRect = node.getBBox ? node.getBBox() : node.getBoundingClientRect();

			cx = domRect.x, cy = domRect.y;
		}

		return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < r;
	},
	isWithinStep: function isWithinStep(that, y) {
		return Math.abs(y - (0, _d3Selection.mouse)(that)[1]) < 30;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	hasValidPointType: function hasValidPointType(type) {
		return (/^(circle|rect(angle)?|polygon|ellipse)$/i.test(type || this.config.point_type)
		);
	},
	hasValidPointDrawMethods: function hasValidPointDrawMethods(type) {
		var pointType = type || this.config.point_type;

		return (0, _util.isObjectType)(pointType) && (0, _util.isFunction)(pointType.create) && (0, _util.isFunction)(pointType.update);
	},
	insertPointInfoDefs: function insertPointInfoDefs(point, id) {
		var $$ = this,
		    parser = new DOMParser(),
		    doc = parser.parseFromString(point, "image/svg+xml"),
		    node = doc.firstChild,
		    clone = document.createElementNS(_d3Selection.namespaces.svg, node.nodeName.toLowerCase()),
		    attribs = node.attributes;


		for (var i = 0, l = attribs.length; i < l; i++) {
			var name = attribs[i].name;

			clone.setAttribute(name, node.getAttribute(name));
		}

		clone.id = id, clone.style.fill = "inherit", clone.style.stroke = "none", $$.defs.node().appendChild(clone);
	},
	pointFromDefs: function pointFromDefs(id) {
		return this.defs.select("#" + id);
	},
	generatePoint: function generatePoint() {
		var $$ = this,
		    config = $$.config,
		    ids = [],
		    pattern = (0, _util.notEmpty)(config.point_pattern) ? config.point_pattern : [config.point_type];


		return function (method, context) {
			for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];

			return function (d) {
				var id = d.id || d.data && d.data.id || d,
				    element = (0, _d3Selection.select)(this),
				    point = void 0;


				if (ids.indexOf(id) < 0 && ids.push(id), point = pattern[ids.indexOf(id) % pattern.length], $$.hasValidPointType(point)) point = $$[point];else if (!$$.hasValidPointDrawMethods(point)) {
					var pointId = $$.datetimeId + "-point-" + id,
					    pointFromDefs = $$.pointFromDefs(pointId);


					if (pointFromDefs.size() < 1 && $$.insertPointInfoDefs(point, pointId), method === "create") return $$.custom.create.bind(context).apply(undefined, [element, pointId].concat(args));
					if (method === "update") return $$.custom.update.bind(context).apply(undefined, [element].concat(args));
				}

				return point[method].bind(context).apply(undefined, [element].concat(args));
			};
		};
	},
	getTransitionName: function getTransitionName() {
		return Math.random().toString();
	},


	custom: {
		create: function create(element, id, cssClassFn, sizeFn, fillStyleFn) {
			return element.append("use").attr("xlink:href", "#" + id).attr("class", cssClassFn).style("fill", fillStyleFn).node();
		},
		update: function update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn, withTransition, flow, selectedCircles) {
			var $$ = this,
			    box = element.node().getBBox(),
			    xPosFn2 = function (d) {
				return xPosFn(d) - box.width * .5;
			},
			    yPosFn2 = function (d) {
				return yPosFn(d) - box.height * .5;
			},
			    mainCircles = element;


			if (withTransition) {
				var transitionName = $$.getTransitionName();

				flow && (mainCircles = element.attr("x", xPosFn2)), mainCircles = element.transition(transitionName).attr("x", xPosFn2).attr("y", yPosFn2).transition(transitionName), selectedCircles.transition($$.getTransitionName());
			} else mainCircles = element.attr("x", xPosFn2).attr("y", yPosFn2);

			return mainCircles.style("opacity", opacityStyleFn).style("fill", fillStyleFn);
		}
	},

	// 'circle' data point
	circle: {
		create: function create(element, cssClassFn, sizeFn, fillStyleFn) {
			return element.append("circle").attr("class", cssClassFn).attr("r", sizeFn).style("fill", fillStyleFn).node();
		},
		update: function update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn, withTransition, flow, selectedCircles) {
			var $$ = this,
			    mainCircles = element;

			// when '.load()' called, bubble size should be updated


			if ($$.hasType("bubble") && (mainCircles = mainCircles.attr("r", $$.pointR.bind($$))), withTransition) {
				var transitionName = $$.getTransitionName();

				flow && (mainCircles = mainCircles.attr("cx", xPosFn)), mainCircles = mainCircles.transition(transitionName).attr("cx", xPosFn).attr("cy", yPosFn).transition(transitionName), selectedCircles.transition($$.getTransitionName());
			} else mainCircles = mainCircles.attr("cx", xPosFn).attr("cy", yPosFn);

			return mainCircles.style("opacity", opacityStyleFn).style("fill", fillStyleFn);
		}
	},

	// 'rectangle' data point
	rectangle: {
		create: function create(element, cssClassFn, sizeFn, fillStyleFn) {
			var rectSizeFn = function (d) {
				return sizeFn(d) * 2;
			};

			return element.append("rect").attr("class", cssClassFn).attr("width", rectSizeFn).attr("height", rectSizeFn).style("fill", fillStyleFn).node();
		},
		update: function update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn, withTransition, flow, selectedCircles) {
			var $$ = this,
			    r = $$.config.point_r,
			    rectXPosFn = function (d) {
				return xPosFn(d) - r;
			},
			    rectYPosFn = function (d) {
				return yPosFn(d) - r;
			},
			    mainCircles = element;


			if (withTransition) {
				var transitionName = $$.getTransitionName();

				flow && (mainCircles = mainCircles.attr("x", rectXPosFn)), mainCircles = mainCircles.transition(transitionName).attr("x", rectXPosFn).attr("y", rectYPosFn).transition(transitionName), selectedCircles.transition($$.getTransitionName());
			} else mainCircles = mainCircles.attr("x", rectXPosFn).attr("y", rectYPosFn);

			return mainCircles.style("opacity", opacityStyleFn).style("fill", fillStyleFn);
		}
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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

		$$.main.select("." + _classes2.default.chart).append("g").attr("class", _classes2.default.chartTexts), $$.mainText = (0, _d3Selection.selectAll)([]);
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
		    barLineBubbleData = $$.barLineBubbleData.bind($$),
		    classText = $$.classText.bind($$);
		$$.mainText = $$.main.selectAll("." + _classes2.default.texts).selectAll("." + _classes2.default.text).data(barLineBubbleData), $$.mainText.exit().transition().duration(durationForExit).style("fill-opacity", "0").remove(), $$.mainText = $$.mainText.enter().append("text").attr("class", classText).attr("text-anchor", function (d) {
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
		var dummy = (0, _d3Selection.select)("body").append("div").classed("bb", !0),
		    svg = dummy.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0px").style("left", "0px"),
		    font = (0, _d3Selection.select)(element).style("font"),
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


		if (config.axis_rotated) yPos = (points[0][0] + points[2][0] + textElement.getBoundingClientRect().height * .6) / 2;else if (yPos = points[2][1], d.value < 0 || d.value === 0 && !$$.hasPositiveValue) yPos += textElement.getBoundingClientRect().height, $$.isBarType(d) && $$.isSafari() ? yPos -= 3 : !$$.isBarType(d) && $$.isChrome() && (yPos += 3);else {
				var diff = -6;

				$$.isBarType(d) ? diff = -3 : $$.isBubbleType(d) && (diff = 3), yPos += diff;
			}
		// show labels regardless of the domain if value is null
		if (d.value === null && !config.axis_rotated) {
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


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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

		return !this.config.data_types[id] || this.isTypeOf(id, ["line", "spline", "area", "area-spline", "area-spline-range", "area-line-range", "step", "area-step"]);
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
		return this.isTypeOf(d, ["spline", "area-spline", "area-spline-range"]);
	},
	isAreaType: function isAreaType(d) {
		return this.isTypeOf(d, ["area", "area-spline", "area-spline-range", "area-line-range", "area-step"]);
	},
	isAreaRangeType: function isAreaRangeType(d) {
		return this.isTypeOf(d, ["area-spline-range", "area-line-range"]);
	},
	isBarType: function isBarType(d) {
		return this.isTypeOf(d, "bar");
	},
	isBubbleType: function isBubbleType(d) {
		return this.isTypeOf(d, "bubble");
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


	// determine if is 'circle' data point
	isCirclePoint: function isCirclePoint() {
		var config = this.config,
		    pattern = config.point_pattern;


		return config.point_type === "circle" && (!pattern || (0, _util.isArray)(pattern) && pattern.length === 0);
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


	// determine if data is line, scatter or bubble type
	lineScatterBubbleData: function lineScatterBubbleData(d) {
		return this.isLineType(d) || this.isScatterType(d) || this.isBubbleType(d) ? d.values : [];
	},
	barLineBubbleData: function barLineBubbleData(d) {
		return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
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


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	initGrid: function initGrid() {
		var $$ = this,
		    config = $$.config;
		$$.grid = $$.main.append("g").attr("clip-path", $$.clipPathForGrid).attr("class", _classes2.default.grid), config.grid_x_show && $$.grid.append("g").attr("class", _classes2.default.xgrids), config.grid_y_show && $$.grid.append("g").attr("class", _classes2.default.ygrids), config.grid_focus_show && $$.grid.append("g").attr("class", _classes2.default.xgridFocus).append("line").attr("class", _classes2.default.xgridFocus), $$.xgrid = (0, _d3Selection.selectAll)([]), config.grid_lines_front || $$.initGridLines();
	},
	initGridLines: function initGridLines() {
		var $$ = this;

		$$.gridLines = $$.main.append("g").attr("clip-path", $$.clipPathForGrid).attr("class", _classes2.default.grid + " " + _classes2.default.gridLines), $$.gridLines.append("g").attr("class", _classes2.default.xgridLines), $$.gridLines.append("g").attr("class", _classes2.default.ygridLines), $$.xgridLines = (0, _d3Selection.selectAll)([]);
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
			var grid = (0, _d3Selection.select)(this);

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
		!config.tooltip_show || $$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType() || (focusEl.style("visibility", "visible").data([dataToShow[0]]).attr(config.axis_rotated ? "y1" : "x1", xx).attr(config.axis_rotated ? "y2" : "x2", xx), $$.smoothLines(focusEl, "grid"));

		// Hide when bubble/scatter plot exists
	},
	hideXGridFocus: function hideXGridFocus() {
		this.main.select("line." + _classes2.default.xgridFocus).style("visibility", "hidden");
	},
	updateXgridFocus: function updateXgridFocus() {
		var $$ = this,
		    isRotated = $$.config.axis_rotated;
		$$.main.select("line." + _classes2.default.xgridFocus).attr("x1", isRotated ? 0 : -10).attr("x2", isRotated ? $$.width : -10).attr("y1", isRotated ? -10 : 0).attr("y2", isRotated ? -10 : $$.height);
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
		    classLines = forX ? _classes2.default.xgridLines : _classes2.default.ygridLines,
		    classLine = forX ? _classes2.default.xgridLine : _classes2.default.ygridLine;
		$$.main.select("." + classLines).selectAll("." + classLine).filter(toRemove).transition().duration(config.transition_duration).style("opacity", "0").remove();


		var gridLines = "grid_" + (forX ? "x" : "y") + "_lines";

		config[gridLines] = config[gridLines].filter(function toShow(line) {
			return !toRemove(line);
		});
	}
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
		    config = $$.config;


		// Show tooltip if needed
		if ($$.tooltip = $$.selectChart.style("position", "relative").append("div").attr("class", _classes2.default.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none"), config.tooltip_init_show) {
			if ($$.isTimeSeries() && (0, _util.isString)(config.tooltip_init_x)) {
				var i = void 0,
				    len = void 0;


				for (config.tooltip_init_x = $$.parseDate(config.tooltip_init_x), i = 0, len = $$.data.targets[0].values.length; i < len && $$.data.targets[0].values[i].x - config.tooltip_init_x !== 0; i++);

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
		    hiValue = void 0,
		    loValue = void 0,
		    value = void 0,
		    name = void 0,
		    bgcolor = void 0,
		    getRowValue = function (row) {
			return $$.isAreaRangeType(row) ? $$.getAreaRangeData(row, "mid") : row.value;
		};


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
				var v1 = a ? getRowValue(a) : null,
				    v2 = b ? getRowValue(b) : null;


				return order === "asc" ? v1 - v2 : v2 - v1;
			});
		} else (0, _util.isFunction)(order) && d.sort(order);

		for (var row, i = 0, len = d.length; i < len; i++) if ((row = d[i]) && (getRowValue(row) || getRowValue(row) === 0)) {

				var isAreaRangeType = $$.isAreaRangeType(row);

				if (text || (title = (0, _util.sanitise)(titleFormat ? titleFormat(row.x) : row.x), text = title || title === 0 ? "<tr><th colspan=\"2\">" + title + "</th></tr>" : "", text = "<table class=\"" + $$.CLASS.tooltip + "\">" + text), isAreaRangeType && (hiValue = (0, _util.sanitise)(valueFormat($$.getAreaRangeData(row, "high"), row.ratio, row.id, row.index, d)), loValue = (0, _util.sanitise)(valueFormat($$.getAreaRangeData(row, "low"), row.ratio, row.id, row.index, d))), value = (0, _util.sanitise)(valueFormat(getRowValue(row), row.ratio, row.id, row.index, d)), value !== undefined) {
					// Skip elements when their name is set to null
					if (row.name === null) continue;

					name = (0, _util.sanitise)(nameFormat(row.name, row.ratio, row.id, row.index)), bgcolor = $$.levelColor ? $$.levelColor(row.value) : color(row.id), text += "<tr class=\"" + $$.CLASS.tooltipName + $$.getTargetSelectorSuffix(row.id) + "\"><td class=\"name\">", text += $$.patterns ? "<svg><rect style=\"fill:" + bgcolor + "\" width=\"10\" height=\"10\"></rect></svg>" : "<span style=\"background-color:" + bgcolor + "\"></span>", text += name + "</td><td class=\"value\">" + (isAreaRangeType ? "<b>Mid:</b> " + value + " <b>High:</b> " + hiValue + " <b>Low:</b> " + loValue : value) + "</td></tr>";
				}
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
		    mouse = (0, _d3Selection.mouse)(element),
		    svgLeft = void 0,
		    tooltipLeft = void 0,
		    tooltipRight = void 0,
		    tooltipTop = void 0,
		    chartRight = void 0;

		// Determine tooltip position


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

				var datum = $$.tooltip.datum(),
				    width = datum && datum.width || 0,
				    height = datum && datum.height || 0;


				if (!datum || datum.current !== JSON.stringify(selectedData)) {
					var html = config.tooltip_contents.call($$, selectedData, $$.axis.getXAxisTickFormat(), $$.getYFormat(forArc), $$.color);

					(0, _util.isFunction)(config.tooltip_onshow) && config.tooltip_onshow.call($$), $$.tooltip.html(html).style("display", "block").datum({
						current: JSON.stringify(selectedData),
						width: width = $$.tooltip.property("offsetWidth"),
						height: height = $$.tooltip.property("offsetHeight")
					}), (0, _util.isFunction)(config.tooltip_onshown) && config.tooltip_onshown.call($$), $$._handleLinkedCharts(!0, selectedData[0].x);
				}

				// Get tooltip dimensions
				var position = positionFunction.call(this, dataToShow, width, height, element);

				// Set tooltip position
				$$.tooltip.style("top", position.top + "px").style("left", position.left + "px");
			}
	},


	/**
  * Hide the tooltip
  * @private
  */
	hideTooltip: function hideTooltip() {
		var $$ = this,
		    config = $$.config;
		(0, _util.isFunction)(config.tooltip_onhide) && config.tooltip_onhide.call($$), this.tooltip.style("display", "none").datum(null), (0, _util.isFunction)(config.tooltip_onhidden) && config.tooltip_onhidden.call($$), $$._handleLinkedCharts(!1);
	},


	/**
  * Toggle display for linked chart instances
  * @param {Boolean} show true: show, false: hide
  * @param {Number} x x Axis coordinate
  * @private
  */
	_handleLinkedCharts: function _handleLinkedCharts(show, x) {
		var $$ = this;

		$$.config.tooltip_linked && $$.api.internal.charts.forEach(function (c) {
			var isInDom = document.body.contains(c.element);

			if (c !== $$.api && isInDom) {
				var isShowing = c.internal.tooltip.style("display") === "block";

				isShowing && !show ? c.tooltip.hide() : !isShowing && show && c.tooltip.show({ x: x });
			}
		});
	}
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
		    wrapper = (0, _d3Selection.select)(config.legend_contents_bindto),
		    template = config.legend_contents_template;


		if (!wrapper.empty()) {
			var targets = $$.data.targets,
			    ids = [],
			    html = "";
			$$.mapToIds(targets).forEach(function (v) {
				var content = (0, _util.isFunction)(template) ? template.call($$, v, $$.color(v), $$.api.data(v)[0].values) : template.replace(/{=COLOR}/g, $$.color(v)).replace(/{=TITLE}/g, v);

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
			left: $$.isLegendLeft ? $$.getCurrentPaddingLeft() + config.legend_inset_x + .5 : $$.currentWidth - legendWidth - $$.getCurrentPaddingRight() - config.legend_inset_x + .5
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

			return opacity.call($$, (0, _d3Selection.select)(this));
		});
	},


	/**
  * Revert the legend to its default state
  * @private
  */
	revertLegend: function revertLegend() {
		var $$ = this;

		$$.legend.selectAll("." + _classes2.default.legendItem).classed(_classes2.default.legendItemFocused, !1).transition().duration(100).style("opacity", function () {
			return $$.opacityForLegend((0, _d3Selection.select)(this));
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
			return $$.opacityForLegend((0, _d3Selection.select)(this));
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
			(0, _util.isFunction)(config.legend_item_onclick) ? config.legend_item_onclick.call($$, id) : _d3Selection.event.altKey ? ($$.api.hide(), $$.api.show(id)) : ($$.api.toggle(id), !isTouch && $$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert()), isTouch && $$.hideTooltip();
		}), isTouch || item.on("mouseout", function (id) {
			(0, _util.isFunction)(config.legend_item_onout) ? config.legend_item_onout.call($$, id) : ((0, _d3Selection.select)(this).classed(_classes2.default.legendItemFocused, !1), $$.api.revert());
		}).on("mouseover", function (id) {
			(0, _util.isFunction)(config.legend_item_onover) ? config.legend_item_onover.call($$, id) : ((0, _d3Selection.select)(this).classed(_classes2.default.legendItemFocused, !0), !$$.transiting && $$.isTargetToShow(id) && $$.api.focus(id));
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
		    isLegendRightOrInset = $$.isLegendRight || $$.isLegendInset,
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
			    itemWidth = box.width + tileWidth + (isLast && !isLegendRightOrInset ? 0 : 10) + config.legend_padding,
			    itemHeight = box.height + 4,
			    itemLength = isLegendRightOrInset ? itemHeight : itemWidth,
			    areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth(),
			    margin = void 0,
			    updateValues = function (id2, withoutStep) {
				withoutStep || (margin = (areaLength - totalLength - itemLength) / 2, margin < 10 && (margin = (areaLength - itemLength) / 2, totalLength = 0, step++)), steps[id2] = step, margins[step] = $$.isLegendInset ? 10 : margin, offsets[id2] = totalLength, totalLength += itemLength;
			};

			// MEMO: care about condifion of step, totalLength


			if (index === 0 && (totalLength = 0, step = 0, maxWidth = 0, maxHeight = 0), config.legend_show && !$$.isLegendToShow(id)) return widths[id] = 0, heights[id] = 0, steps[id] = 0, void (offsets[id] = 0);

			widths[id] = itemWidth, heights[id] = itemHeight, (!maxWidth || itemWidth >= maxWidth) && (maxWidth = itemWidth), (!maxHeight || itemHeight >= maxHeight) && (maxHeight = itemHeight);


			var maxLength = isLegendRightOrInset ? maxHeight : maxWidth;

			config.legend_equally ? (Object.keys(widths).forEach(function (id2) {
				return widths[id2] = maxWidth;
			}), Object.keys(heights).forEach(function (id2) {
				return heights[id2] = maxHeight;
			}), margin = (areaLength - maxLength * targetIdz.length) / 2, margin < 10 ? (totalLength = 0, step = 0, targetIdz.forEach(function (id2) {
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
		}).style("pointer-events", "none").attr("x", isLegendRightOrInset ? xForLegendText : -200).attr("y", isLegendRightOrInset ? -200 : yForLegendText), l.append("rect").attr("class", _classes2.default.legendItemEvent).style("fill-opacity", "0").attr("x", isLegendRightOrInset ? xForLegendRect : -200).attr("y", isLegendRightOrInset ? -200 : yForLegendRect);


		var usePoint = $$.config.legend_usePoint;

		if (usePoint) {
			var ids = [];

			l.append(function (d) {
				var pattern = (0, _util.notEmpty)(config.point_pattern) ? config.point_pattern : [config.point_type];

				ids.indexOf(d) === -1 && ids.push(d);


				var point = pattern[ids.indexOf(d) % pattern.length];

				return point === "rectangle" && (point = "rect"), document.createElementNS(_d3Selection.namespaces.svg, $$.hasValidPointType(point) ? point : "use");
			}).attr("class", _classes2.default.legendItemPoint).style("fill", function (d) {
				return $$.color(d);
			}).style("pointer-events", "none").attr("href", function (data, idx, selection) {
				var node = selection[idx],
				    nodeName = node.nodeName.toLowerCase();


				return nodeName === "use" ? "#" + $$.datetimeId + "-point-" + data : undefined;
			});
		} else l.append("line").attr("class", _classes2.default.legendItemTile).style("stroke", $$.color).style("pointer-events", "none").attr("x1", isLegendRightOrInset ? x1ForLegendTile : -200).attr("y1", isLegendRightOrInset ? -200 : yForLegendTile).attr("x2", isLegendRightOrInset ? x2ForLegendTile : -200).attr("y2", isLegendRightOrInset ? -200 : yForLegendTile).attr("stroke-width", config.legend_item_tile_height);

		// Set background for inset legend
		background = $$.legend.select("." + _classes2.default.legendBackground + " rect"), $$.isLegendInset && maxWidth > 0 && background.size() === 0 && (background = $$.legend.insert("g", "." + _classes2.default.legendItem).attr("class", _classes2.default.legendBackground).append("rect"));


		var texts = $$.legend.selectAll("text").data(targetIdz).text(function (id) {
			return (0, _util.isDefined)(config.data_names[id]) ? config.data_names[id] : id;
		}) // MEMO: needed for update
		.each(function (id, i) {
			updatePositions(this, id, i);
		});

		(withTransition ? texts.transition() : texts).attr("x", xForLegendText).attr("y", yForLegendText);


		var rects = $$.legend.selectAll("rect." + _classes2.default.legendItemEvent).data(targetIdz);

		if ((withTransition ? rects.transition() : rects).attr("width", function (id) {
			return widths[id];
		}).attr("height", function (id) {
			return heights[id];
		}).attr("x", xForLegendRect).attr("y", yForLegendRect), usePoint) {
			var tiles = $$.legend.selectAll("." + _classes2.default.legendItemPoint).data(targetIdz);

			(withTransition ? tiles.transition() : tiles).each(function () {
				var nodeName = this.nodeName.toLowerCase(),
				    pointR = $$.config.point_r,
				    x = "x",
				    y = "y",
				    xOffset = 2,
				    yOffset = 2.5,
				    radius = void 0,
				    width = void 0,
				    height = void 0;


				if (nodeName === "circle") {
					var size = pointR * .2;

					x = "cx", y = "cy", radius = pointR + size, xOffset = pointR * 2, yOffset = -size;
				} else if (nodeName === "rect") {
					var _size = pointR * 2.5;

					width = _size, height = _size, yOffset = 3;
				}

				(0, _d3Selection.select)(this).attr(x, function (d) {
					return x1ForLegendTile(d) + xOffset;
				}).attr(y, function (d) {
					return yForLegendTile(d) - yOffset;
				}).attr("r", radius).attr("width", width).attr("height", height);
			});
		} else {
			var _tiles = $$.legend.selectAll("line." + _classes2.default.legendItemTile).data(targetIdz);

			(withTransition ? _tiles.transition() : _tiles).style("stroke", $$.color).attr("x1", x1ForLegendTile).attr("y1", yForLegendTile).attr("x2", x2ForLegendTile).attr("y2", yForLegendTile);
		}

		background && (withTransition ? background.transition() : background).attr("height", $$.getLegendHeight() - 12).attr("width", maxWidth * (step + 1) + 10), $$.legend.selectAll("." + _classes2.default.legendItem).classed(_classes2.default.legendItemHidden, function (id) {
			return !$$.isTargetToShow(id);
		}), $$.updateLegendItemWidth(maxWidth), $$.updateLegendItemHeight(maxHeight), $$.updateLegendStep(step), $$.updateSizes(), $$.updateScales(!withTransition), $$.updateSvgSize(), $$.transformAll(withTransitionForTransform, transitions), $$.legendHasRendered = !0;
	}
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
			(0, _d3Selection.select)(this.parentNode).selectAll("rect:not([x])").remove();
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
					var shape = (0, _d3Selection.select)(this),
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
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Color = __webpack_require__(72),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			return (0, _d3Color.rgb)($$.color(d)).brighter(.75);
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


		return that.nodeName === "path" ? that.nodeName === "path" && (toggle = $$.togglePath) : $$.isStepType(d) ? toggle = function () {} : toggle = $$.togglePoint, toggle;
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
		    shape = (0, _d3Selection.select)(that),
		    isSelected = shape.classed(_classes2.default.SELECTED),
		    toggle = $$.getToggle(that, d).bind($$),
		    toggledShape = void 0;


		if (config.data_selection_enabled && config.data_selection_isselectable(d)) {
			if (!config.data_selection_multiple) {
				var selecter = "." + _classes2.default.shapes;

				config.data_selection_grouped && (selecter = "." + selecter + $$.getTargetSelectorSuffix(d.id)), $$.main.selectAll("" + selecter).selectAll("." + _classes2.default.shape).each(function (d, i) {
					var shape = (0, _d3Selection.select)(this);

					shape.classed(_classes2.default.SELECTED) && (toggledShape = shape, toggle(!1, shape.classed(_classes2.default.SELECTED, !1), d, i));
				});
			}

			toggledShape && toggledShape.node() === shape.node() || (shape.classed(_classes2.default.SELECTED, !isSelected), toggle(!isSelected, shape, d, i));
		}
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Brush = __webpack_require__(74),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_ChartInternal2.default.prototype, {
	/**
  * Initialize the brush.
  * @private
  */
	initBrush: function initBrush() {
		var $$ = this;

		// set the brush
		$$.brush = $$.config.axis_rotated ? (0, _d3Brush.brushY)() : (0, _d3Brush.brushX)();


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
			return $$.context ? $$.context.select("." + _classes2.default.brush) : (0, _d3Selection.select)([]);
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
			return $$.orgAreaOpacity = (0, _d3Selection.select)(this).style("opacity"), "0";
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
		if ($$.context.style("visibility", config.subchart_show ? "visible" : "hidden"), config.subchart_show && (_d3Selection.event && _d3Selection.event.type === "zoom" && $$.brush.update(), withSubchart))

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
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Array = __webpack_require__(65),
    _d3Selection = __webpack_require__(63),
    _d3Zoom = __webpack_require__(71),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
		$$.zoomScale = null, $$.zoom = (0, _d3Zoom.zoom)().duration(0).on("start", function () {
			startEvent = _d3Selection.event.sourceEvent, $$.zoom.altDomain = _d3Selection.event.sourceEvent.altKey ? $$.x.orgDomain() : null, config.zoom_onzoomstart.call($$.api, _d3Selection.event.sourceEvent);
		}).on("zoom", function () {
			$$.redrawForZoom.call($$);
		}).on("end", function () {
			var event = _d3Selection.event.sourceEvent;

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
		    min = (0, _d3Array.min)([$$.orgXDomain[0], config.zoom_x_min]),
		    max = (0, _d3Array.max)([$$.orgXDomain[1], config.zoom_x_max]);


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
			var zoomDomain = $$.zoomScale.domain(),
			    xDomain = $$.x.domain(),
			    delta = .015;
			// arbitrary value

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			(zoomDomain[0] <= xDomain[0] || zoomDomain[0] - delta <= xDomain[0]) && (xDomain[1] <= zoomDomain[1] || xDomain[1] <= zoomDomain[1] - delta) && ($$.xAxis.scale($$.x), $$.zoomScale = null);
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
				    event = _d3Selection.event,
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Scale = __webpack_require__(64),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set pattern's background color
 * (it adds a <rect> element to simulate bg-color)
 * @param {SVGPatternElement} pattern SVG pattern element
 * @param {String} color Color string
 * @param {String} id ID to be set
 * @return {{id: string, node: SVGPatternElement}}
 * @private
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var colorizePattern = function (pattern, color, id) {
	var node = (0, _d3Selection.select)(pattern.cloneNode(!0));

	return node.attr("id", id).insert("rect", ":first-child").attr("width", node.attr("width")).attr("height", node.attr("height")).style("fill", color), {
		id: id,
		node: node.node()
	};
},
    schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

// Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)
(0, _util.extend)(_ChartInternal2.default.prototype, {
	generateColor: function generateColor() {
		var $$ = this,
		    config = $$.config,
		    colors = config.data_colors,
		    callback = config.data_color,
		    ids = [],
		    pattern = (0, _util.notEmpty)(config.color_pattern) ? config.color_pattern : (0, _d3Scale.scaleOrdinal)(schemeCategory10).range(),
		    originalColorPattern = pattern;


		if ((0, _util.isFunction)(config.color_tiles)) {
			var tiles = config.color_tiles(),
			    colorizedPatterns = pattern.map(function (p, index) {
				var color = p.replace(/[#\(\)\s,]/g, ""),
				    id = $$.datetimeId + "-pattern-" + color + "-" + index;


				return colorizePattern(tiles[index % tiles.length], p, id);
			});

			// Add background color to patterns
			pattern = colorizedPatterns.map(function (p) {
				return "url(#" + p.id + ")";
			}), $$.patterns = colorizedPatterns;
		}

		return function (d) {
			var id = d.id || d.data && d.data.id || d,
			    isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !$$.config.data_types[id],
			    color = void 0;

			// if callback function is provided


			return colors[id] instanceof Function ? color = colors[id](d) : colors[id] ? color = colors[id] : (ids.indexOf(id) < 0 && ids.push(id), color = isLine ? originalColorPattern[ids.indexOf(id) % originalColorPattern.length] : pattern[ids.indexOf(id) % pattern.length], colors[id] = color), callback instanceof Function ? callback(color, d) : color;
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
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

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


		return format = (0, _util.isFunction)(dataLabels.format) ? dataLabels.format : (0, _util.isObjectType)(dataLabels.format) ? dataLabels.format[targetId] ? dataLabels.format[targetId] === !0 ? defaultFormat : dataLabels.format[targetId] : function () {
			return "";
		} : defaultFormat, format;
	}
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_ChartInternal2.default.prototype, {
	hasCaches: function hasCaches(ids) {
		for (var i = 0, len = ids.length; i < len; i++) if (!(ids[i] in this.cache)) return !1;

		return !0;
	},
	addCache: function addCache(id, target) {
		this.cache[id] = this.cloneTarget(target);
	},
	getCaches: function getCaches(ids) {
		var targets = [];

		for (var key, i = 0; key = ids[i]; i++) key in this.cache && targets.push(this.cloneTarget(this.cache[key]));

		return targets;
	},


	/**
  * reset cached data
  * @param {Boolean} all true: reset all data, false: reset only '$' prefixed key data
  * @private
 	 */
	resetCache: function resetCache(all) {
		var $$ = this;

		for (var x in $$.cache) (all || /^\$/.test(x)) && ($$.cache[x] = null);
	}
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
	generateExtraLineClass: function generateExtraLineClass() {
		var $$ = this,
		    classes = $$.config.line_classes || [],
		    ids = [];


		return function (d) {
			var id = d.id || d.data && d.data.id || d;

			return ids.indexOf(id) < 0 && ids.push(id), classes[ids.indexOf(id) % classes.length];
		};
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
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
  * @memberOf Chart
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
  * @memberOf Chart
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
			return (0, _d3Selection.select)(this).classed(_classes2.default.legendItemFocused);
		}).classed(_classes2.default.legendItemFocused, !1)), $$.focusedTargetIds = [], $$.defocusedTargetIds = [];
	}
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Show data series on chart
  * @method show
  * @instance
  * @memberOf Chart
  * @param {String|Array} [targetIdsValue=all] The target id value.
  * @param {Object} [options] The object can consist with following members:<br>
  *
  *    | Key | Type | default | Description |
  *    | --- | --- | --- | --- |
  *    | withLegend | Boolean | false | whether or not display legend |
  *
  * @example
  * // show 'data1'
  * chart.show("data1");
  *
  * // show 'data1' and 'data3'
  * chart.show(["data1", "data3"]);
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
  * Hide data series from chart
  * @method hide
  * @instance
  * @memberOf Chart
  * @param {String|Array} [targetIdsValue=all] The target id value.
  * @param {Object} [options] The object can consist with following members:<br>
  *
  *    | Key | Type | default | Description |
  *    | --- | --- | --- | --- |
  *    | withLegend | Boolean | false | whether or not display legend |
  *
  * @example
  * // hide 'data1'
  * chart.hide("data1");
  *
  * // hide 'data1' and 'data3'
  * chart.hide(["data1", "data3"]);
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
  * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
  * @method toggle
  * @instance
  * @memberOf Chart
  * @param {String|Array} [targetIdsValue=all] The target id value.
  * @param {Object} [options] The object can consist with following members:<br>
  *
  *    | Key | Type | default | Description |
  *    | --- | --- | --- | --- |
  *    | withLegend | Boolean | false | whether or not display legend |
  *
  * @example
  * // toggle 'data1'
  * chart.toggle("data1");
  *
  * // toggle 'data1' and 'data3'
  * chart.toggle(["data1", "data3"]);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Array = __webpack_require__(65),
    _d3Zoom = __webpack_require__(71),
    _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Zoom by giving x domain.
 * @method zoom
 * @instance
 * @memberOf Chart
 * @param {Array} domainValue If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @return {Array} domain value in array
 * @example
 *  // Zoom to specified domain
 *  chart.zoom([10, 20]);
 *
 *  // Get the current zoomed domain
 *  chart.zoom();
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var zoom = function (domainValue) {
	var $$ = this.internal,
	    isTimeSeries = $$.isTimeSeries(),
	    domain = domainValue,
	    resultDomain = void 0;


	if ($$.config.zoom_enabled && domain) {

		if (isTimeSeries && (domain = domain.map(function (x) {
			return $$.parseDate(x);
		})), $$.config.subchart_show) {
			var xScale = $$.zoomScale || $$.x;

			$$.brush.getSelection().call($$.brush.move, [xScale(domain[0]), xScale(domain[1])]), resultDomain = domain;
		} else {
			var orgDomain = $$.x.orgDomain(),
			    k = (orgDomain[1] - orgDomain[0]) / (domain[1] - domain[0]),
			    tx = isTimeSeries ? 0 - k * $$.x(domain[0].getTime()) : domain[0] - k * $$.x(domain[0]);
			$$.zoom.updateTransformScale(_d3Zoom.zoomIdentity.translate(tx, 0).scale(k)), resultDomain = $$.zoomScale.domain();
		}

		$$.redraw({
			withTransition: !0,
			withY: $$.config.zoom_rescale,
			withDimension: !1
		}), $$.config.zoom_onzoom.call(this, $$.x.orgDomain());
	} else resultDomain = ($$.zoomScale || $$.x).domain();

	return resultDomain;
};

(0, _util.extend)(zoom, {
	/**
  * Enable and disable zooming.
  * @method zoom․enable
  * @instance
  * @memberOf Chart
  * @param {Boolean} enabled If enabled is true, the feature of zooming will be enabled. If false is given, it will be disabled.<br>When set to false, the current zooming status will be reset.
  * @example
  *  // Enable zooming
  *  chart.zoom.enable(true);
  *
  *  // Disable zooming
  *  chart.zoom.enable(false);
  */
	enable: function enable() {
		var enabled = !!(arguments.length > 0 && arguments[0] !== undefined) && arguments[0],
		    $$ = this.internal;
		$$.config.zoom_enabled = enabled, $$.updateAndRedraw();
	},

	/**
  * Set or get x Axis maximum zoom range value
  * @method zoom․max
  * @instance
  * @memberOf Chart
  * @param {Number} [max] maximum value to set for zoom
  * @return {Number} zoom max value
  * @example
  *  // Set maximum range value
  *  chart.zoom.max(20);
  */
	max: function max(_max) {
		var $$ = this.internal,
		    config = $$.config;


		return (_max === 0 || _max) && (config.zoom_x_max = (0, _d3Array.max)([$$.orgXDomain[1], _max])), config.zoom_x_max;
	},

	/**
  * Set or get x Axis minimum zoom range value
  * @method zoom․min
  * @instance
  * @memberOf Chart
  * @param {Number} [min] minimum value tp set for zoom
  * @return {Number} zoom min value
  * @example
  *  // Set minimum range value
  *  chart.zoom.min(-1);
  */
	min: function min(_min) {
		var $$ = this.internal,
		    config = $$.config;


		return (_min === 0 || _min) && (config.zoom_x_min = (0, _d3Array.min)([$$.orgXDomain[0], _min])), config.zoom_x_min;
	},

	/**
  * Set zoom range
  * @method zoom․range
  * @instance
  * @memberOf Chart
  * @param {Object} [range]
  * @return {Object} zoom range value
  * {
  *   min: 0,
  *   max: 100
  * }
  * @example
  *  chart.zoom.range({
  *      min: 10,
  *      max: 100
  *  });
  */
	range: function range(_range) {
		var zoom = this.zoom;

		return (0, _util.isObject)(_range) && ((0, _util.isDefined)(_range.min) && zoom.min(_range.min), (0, _util.isDefined)(_range.max) && zoom.max(_range.max)), {
			min: zoom.min(),
			max: zoom.max()
		};
	}
}), (0, _util.extend)(_Chart2.default.prototype, {
	zoom: zoom,

	/**
  * Unzoom zoomed area
  * @method unzoom
  * @instance
  * @memberOf Chart
  * @example
  *  chart.unzoom();
  */
	unzoom: function unzoom() {
		var $$ = this.internal;

		$$.config.subchart_show ? $$.brush.getSelection().call($$.brush.move, null) : $$.zoom.updateTransformScale(_d3Zoom.zoomIdentity), $$.redraw({
			withTransition: !0,
			withY: $$.config.zoom_rescale
		});
	}
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
  * @param {Object} args The object can consist with following members:<br>
  *
  *    | Key | Description |
  *    | --- | --- |
  *    | - url<br>- json<br>- rows<br>- columns | The data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
  *    | classes | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
  *    | categories | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
  *    | axes | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
  *    | colors | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
  *    | - type<br>- types | The type of targets will be updated. type must be String and types must be Object. |
  *    | unload | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
  *    | done | The specified function will be called after data loaded.|
  *
  * @example
  *  // Load data1 and unload data2 and data3
  *  chart.load({
  *     columns: [
  *        ["data1", 100, 200, 150, ...],
  *        ...
  *    ],
  *    unload: ["data2", "data3"],
  *    url: "...",
  *    done: function() { ... }
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
		}), "cacheIds" in args && $$.hasCaches(args.cacheIds) ? void $$.load($$.getCaches(args.cacheIds), args.done) : void ("unload" in args && args.unload !== !1 ? $$.unload($$.mapToTargetIds((0, _util.isBoolean)(args.unload) && args.unload ? null : args.unload), function () {
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
  * @memberOf Chart
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
		args instanceof Array ? args = { ids: args } : (0, _util.isString)(args) && (args = { ids: [args] }), $$.unload($$.mapToTargetIds(args.ids), function () {
			$$.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0,
				withLegend: !0
			}), args.done && args.done();
		});
	}
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _d3Ease = __webpack_require__(69),
    _d3Transition = __webpack_require__(66),
    _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Flow data to the chart.<br><br>
  * By this API, you can append new data points to the chart.
  * @method flow
  * @instance
  * @memberOf Chart
  * @param {Object} args The object can consist with following members:<br>
  *
  *    | Key | Type | Description |
  *    | --- | --- | --- |
  *    | json | Object | Data as JSON format (@see [data․json](Options.html#.data%25E2%2580%25A4json)) |
  *    | rows | Array | Data in array as row format (@see [data․rows](Options.html#.data%25E2%2580%25A4json)) |
  *    | columns | Array | Data in array as column format (@see [data․columns](Options.html#.data%25E2%2580%25A4columns)) |
  *    | to | String | The lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points |
  *    | length | Number | The lower x edge will move by the number of this argument |
  *    | duration | Number | The duration of the transition will be specified value. If not given, transition.duration will be used as default |
  *    | done | Function | The specified function will be called when flow ends |
  *
  * - **NOTE:**
  *   If json, rows and columns given, the data will be loaded.<br>
  *   If data that has the same target id is given, the chart will be appended.<br>
  *   Otherwise, new target will be added. One of these is required when calling.<br>
  *   If json specified, keys is required as well as data.json.
  * @example
  * // 2 data points will be apprended to the tail and popped from the head.
  * // After that, 4 data points will be appended and no data points will be poppoed.
  * chart.flow({
  *  columns: [
  *    ["x", "2018-01-11", "2018-01-21"],
  *    ["data1", 500, 200],
  *    ["data2", 100, 300],
  *    ["data3", 200, 120]
  *  ],
  *  to: "2013-01-11",
  *  done: function () {
  *    chart.flow({
  *      columns: [
  *        ["x", "2018-02-11", "2018-02-12", "2018-02-13", "2018-02-14"],
  *        ["data1", 200, 300, 100, 250],
  *        ["data2", 100, 90, 40, 120],
  *        ["data3", 100, 100, 300, 500]
  *      ],
  *      length: 2,
     *      duration: 1500
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
			var found = !1;

			for (var i = 0; i < targets.length; i++) if (t.id === targets[i].id) {
				found = !0, t.values[t.values.length - 1] && (tail = t.values[t.values.length - 1].index + 1), length = targets[i].values.length;


				for (var _j = 0; _j < length; _j++) targets[i].values[_j].index = tail + _j, $$.isTimeSeries() || (targets[i].values[_j].x = tail + _j);

				t.values = t.values.concat(targets[i].values), targets.splice(i, 1);

				break;
			}

			found || notfoundIds.push(t.id);
		}), $$.data.targets.forEach(function (t) {
			for (var i = 0; i < notfoundIds.length; i++) if (t.id === notfoundIds[i]) {
				tail = t.values[t.values.length - 1].index + 1;


				for (var _j2 = 0; _j2 < length; _j2++) t.values.push({
					id: t.id,
					index: tail + _j2,
					x: $$.isTimeSeries() ? $$.getOtherTargetX(tail + _j2) : tail + _j2,
					value: null
				});
			}
		}), $$.data.targets.length && targets.forEach(function (t) {
			var missing = [];

			for (var i = $$.data.targets[0].values[0].index; i < tail; i++) missing.push({
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
  * @memberOf ChartInternal
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
			    xgrid = $$.xgrid || (0, _d3Selection.selectAll)([]),
			    xgridLines = $$.xgridLines || (0, _d3Selection.selectAll)([]),
			    mainRegion = $$.mainRegion || (0, _d3Selection.selectAll)([]),
			    mainText = $$.mainText || (0, _d3Selection.selectAll)([]),
			    mainBar = $$.mainBar || (0, _d3Selection.selectAll)([]),
			    mainLine = $$.mainLine || (0, _d3Selection.selectAll)([]),
			    mainArea = $$.mainArea || (0, _d3Selection.selectAll)([]),
			    mainCircle = $$.mainCircle || (0, _d3Selection.selectAll)([]);


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


			var gt = (0, _d3Transition.transition)().ease(_d3Ease.easeLinear).duration(durationForFlow);

			wait.add([$$.axes.x.transition(gt).call($$.xAxis.setTransition(gt)), mainBar.transition(gt).attr("transform", transform), mainLine.transition(gt).attr("transform", transform), mainArea.transition(gt).attr("transform", transform), mainCircle.transition(gt).attr("transform", transform), mainText.transition(gt).attr("transform", transform), mainRegion.filter($$.isRegionOnX).transition(gt).attr("transform", transform), xgrid.transition(gt).attr("transform", transform), xgridLines.transition(gt).attr("transform", transform)]), gt.call(wait, function () {
				var shapes = [],
				    texts = [],
				    eventRects = [];


				// remove flowed elements
				if (flowLength) {
					for (var index, i = 0; i < flowLength; i++) index = flowIndex + i, shapes.push("." + _classes2.default.shape + "-" + index), texts.push("." + _classes2.default.text + "-" + index), eventRects.push("." + _classes2.default.eventRect + "-" + index);

					$$.svg.selectAll("." + _classes2.default.shapes).selectAll(shapes).remove(), $$.svg.selectAll("." + _classes2.default.texts).selectAll(texts).remove(), $$.svg.selectAll("." + _classes2.default.eventRects).selectAll(eventRects).remove(), $$.svg.select("." + _classes2.default.xgrid).remove();
				}

				// draw again for removing flowed elements and reverting attr


				if (xgrid.size() && xgrid.attr("transform", null).attr($$.xgridAttr), xgridLines.attr("transform", null), xgridLines.select("line").attr("x1", config.axis_rotated ? 0 : xv).attr("x2", config.axis_rotated ? $$.width : xv), xgridLines.select("text").attr("x", config.axis_rotated ? $$.width : 0).attr("y", xv), mainBar.attr("transform", null).attr("d", drawBar), mainLine.attr("transform", null).attr("d", drawLine), mainArea.attr("transform", null).attr("d", drawArea), mainCircle.attr("transform", null), $$.isCirclePoint()) mainCircle.attr("cx", cx).attr("cy", cy);else {
					mainCircle.attr("x", function xFunc(d) {
						return cx(d) - config.point_r;
					}).attr("y", function yFunc(d) {
						return cy(d) - config.point_r;
					}).attr("cx", cx) // when pattern is used, it possibly contain 'circle' also.
					.attr("cy", cy);
				}

				mainText.attr("transform", null).attr("x", xForText).attr("y", yForText).style("fill-opacity", $$.opacityForText.bind($$)), mainRegion.attr("transform", null), mainRegion.select("rect").filter($$.isRegionOnX).attr("x", $$.regionX.bind($$)).attr("width", $$.regionWidth.bind($$)), config.interaction_enabled && $$.redrawEventRect(), done(), $$.flowing = !1;
			});
		};
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5),
    _classes = __webpack_require__(7),
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
  * @memberOf Chart
  * @param {String} [targetId] You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
  * @return {Array} dataPoint Array of the data points.<br>ex.) `[{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ...]`
  * @example
  *  // all selected data points will be returned.
  *  chart.selected();
  *  // --> ex.) [{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ... ]
  *
  *  // all selected data points of data1 will be returned.
  *  chart.selected("data1");
  */
	selected: function selected(targetId) {
		var $$ = this.internal,
		    dataPoint = [];


		return $$.main.selectAll("." + (_classes2.default.shapes + $$.getTargetSelectorSuffix(targetId))).selectAll("." + _classes2.default.shape).filter(function () {
			return (0, _d3Selection.select)(this).classed(_classes2.default.SELECTED);
		}).each(function (d) {
			return dataPoint.push(d);
		}), dataPoint;
	},


	/**
  * Set data points to be selected. (`[data.selection.enabled](Options.html#.data%25E2%2580%25A4selection%25E2%2580%25A4enabled) option should be set true to use this method)`
  * @method select
  * @instance
  * @memberOf Chart
  * @param {String|Array} [ids] id value to get selected.
  * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
  * @param {Boolean} [resetOther] Unselect already selected.
  * @example
  *  // select all data points
  *  chart.select();
  *
  *  // select all from 'data2'
  *  chart.select("data2");
  *
  *  // select all from 'data1' and 'data2'
  *  chart.select(["data1", "data2"]);
  *
  *  // select from 'data1', indices 2 and unselect others selected
  *  chart.select("data1", [2], true);
  *
  *  // select from 'data1', indices 0, 3 and 5
  *  chart.select("data1", [0, 3, 5]);
  */
	select: function select(ids, indices, resetOther) {
		var $$ = this.internal,
		    config = $$.config;
		config.data_selection_enabled && $$.main.selectAll("." + _classes2.default.shapes).selectAll("." + _classes2.default.shape).each(function (d, i) {
			var shape = (0, _d3Selection.select)(this),
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
  * @memberOf Chart
  * @param {String|Array} [ids] id value to be unselected.
  * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
  * @example
  *  // unselect all data points
  *  chart.unselect();
  *
  *  // unselect all from 'data1'
  *  chart.unselect("data1");
  *
  *  // unselect from 'data1', indices 2
  *  chart.unselect("data1", [2]);
  */
	unselect: function unselect(ids, indices) {
		var $$ = this.internal,
		    config = $$.config;
		config.data_selection_enabled && $$.main.selectAll("." + _classes2.default.shapes).selectAll("." + _classes2.default.shape).each(function (d, i) {
			var shape = (0, _d3Selection.select)(this),
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Change the type of the chart.
  * @method transform
  * @instance
  * @memberOf Chart
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update x grid lines.
 * @method xgrids
 * @instance
 * @memberOf Chart
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

(0, _util.extend)(xgrids, {
	/**
  * Add x grid lines.<br>
  * This API adds new x grid lines instead of replacing like xgrids.
  * @method xgrids․add
  * @instance
  * @memberOf Chart
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
	add: function add(grids) {
		return this.xgrids(this.internal.config.grid_x_lines.concat(grids || []));
	},

	/**
  * Remove x grid lines.<br>
  * This API removes x grid lines.
  * @method xgrids․remove
  * @instance
  * @memberOf Chart
  * @param {Object} params This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
  * @example
  * // x grid line on x = 2 will be removed
  * chart.xgrids.remove({value: 2});
  *
  * // x grid lines that have 'grid-A' will be removed
  * chart.xgrids.remove({
  *   class: "grid-A"
  * });
  *
  * // all of x grid lines will be removed
  * chart.xgrids.remove();
  */
	remove: function remove(params) {
		this.internal.removeGridLines(params, !0);
	}
});


/**
 * Update y grid lines.
 * @method ygrids
 * @instance
 * @memberOf Chart
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

(0, _util.extend)(ygrids, {
	/**
  * Add y grid lines.<br>
  * This API adds new y grid lines instead of replacing like ygrids.
  * @method ygrids․add
  * @instance
  * @memberOf Chart
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
	add: function add(grids) {
		return this.ygrids(this.internal.config.grid_y_lines.concat(grids || []));
	},

	/**
  * Remove y grid lines.<br>
  * This API removes x grid lines.
  * @method ygrids․remove
  * @instance
  * @memberOf Chart
  * @param {Object} params This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
  * @example
  * // y grid line on y = 200 will be removed
  * chart.ygrids.remove({value: 200});
  *
  * // y grid lines that have 'grid-A' will be removed
  * chart.ygrids.remove({
  *   class: "grid-A"
  * });
  *
  * // all of y grid lines will be removed
  * chart.ygrids.remove();
  */
	remove: function remove(params) {
		this.internal.removeGridLines(params, !1);
	}
}), (0, _util.extend)(_Chart2.default.prototype, {
	xgrids: xgrids,
	ygrids: ygrids
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _classes = __webpack_require__(7),
    _classes2 = _interopRequireDefault(_classes),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update regions.
 * @method regions
 * @instance
 * @memberOf Chart
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
}; /**
    * Copyright (c) 2017 NAVER Corp.
    * billboard.js project is licensed under the MIT license
    */
(0, _util.extend)(regions, {
	/**
  * Add new region.<br><br>
  * This API adds new region instead of replacing like regions.
  * @method regions․add
  * @instance
  * @memberOf Chart
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
	add: function add(regions) {
		var $$ = this.internal,
		    config = $$.config;
		return regions ? (config.regions = config.regions.concat(regions), $$.redrawWithoutRescale(), config.regions) : config.regions;
	},

	/**
  * Remove regions.<br><br>
  * This API removes regions.
  * @method regions․remove
  * @instance
  * @memberOf Chart
  * @param {Object} regions This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be removed.
  * @return {Array} regions
  * @example
  * // regions that have 'region-A' or 'region-B' will be removed.
  * chart.regions.remove({
  *   classes: [
  *     "region-A", "region-B"
  *   ]
  * });
  *
  * // all of regions will be removed.
  * chart.regions.remove();
  */
	remove: function remove(optionsValue) {
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
	}
}), (0, _util.extend)(_Chart2.default.prototype, { regions: regions });

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get data loaded in the chart.
 * @method data
 * @instance
 * @memberOf Chart
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

	return (0, _util.isUndefined)(targetIds) ? targets : targets.filter(function (t) {
		return targetIds.indexOf(t.id) >= 0;
	});
};

(0, _util.extend)(data, {
	/**
  * Get data shown in the chart.
  * @method data․shown
  * @instance
  * @memberOf Chart
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
	shown: function shown(targetIds) {
		return this.internal.filterTargetsToShow(this.data(targetIds));
	},

	/**
  * Get values of the data loaded in the chart.
  * @method data․values
  * @instance
  * @memberOf Chart
  * @param {String|Array} targetIds This API returns the values of specified target. If this argument is not given, null will be retruned
  * @example
  * // Get data1 values
  * chart.data.values("data1");
  */
	values: function (targetId) {
		var values = null;

		if (targetId) {
			var targets = this.data(targetId);

			targets && (0, _util.isArray)(targets) && (values = [], targets.forEach(function (v) {
				values = values.concat(v.values.map(function (d) {
					return d.value;
				}));
			}));
		}

		return values;
	},

	/**
  * Get and set names of the data loaded in the chart.
  * @method data․names
  * @instance
  * @memberOf Chart
  * @param {Object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as
  * @example
  * // Get current names
  * chart.data.names();
  *
  * // Update names
  * chart.data.names({
  *  data1: "New Name 1",
  *  data2: "New Name 2"
  *});
  */
	names: function names(_names) {

		return this.internal.clearLegendItemTextBoxCache(), this.internal.updateDataAttributes("names", _names);
	},

	/**
  * Get and set colors of the data loaded in the chart.
  * @method data․colors
  * @instance
  * @memberOf Chart
  * @param {Object} colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as
  * @example
  * // Get current colors
  * chart.data.colors();
  *
  * // Update colors
  * chart.data.colors({
  *  data1: "#FFFFFF",
  *  data2: "#000000"
  * });
  */
	colors: function colors(_colors) {
		return this.internal.updateDataAttributes("colors", _colors);
	},

	/**
  * Get and set axes of the data loaded in the chart.
  * @method data․axes
  * @instance
  * @memberOf Chart
  * @param {Object} axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as
  * @example
  * // Get current axes
  * chart.data.axes();
  *
  * // Update axes
  * chart.data.axes({
  *  data1: "y",
  *  data2: "y2"
  * });
  */
	axes: function axes(_axes) {
		return this.internal.updateDataAttributes("axes", _axes);
	}
}), (0, _util.extend)(_Chart2.default.prototype, { data: data });

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
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
  * @memberOf Chart
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
  * @param {String} id id to get the color
  * @example
  * chart.color("data1");
  */
	color: function color(id) {
		return this.internal.color(id); // more patterns
	}
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

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
  * @memberOf Chart
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
  * @memberOf Chart
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set the min/max value
 * @param {Chart} $$
 * @param {String} type
 * @param {Object} value
 * @return {undefined}
 * @private
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var setMinMax = function ($$, type, value) {
	var config = $$.config,
	    axisY = "axis_y_" + type,
	    axisY2 = "axis_y2_" + type;


	return (0, _util.isDefined)(value) && ((0, _util.isObjectType)(value) ? ((0, _util.isValue)(value.x) && (config["axis_x_" + type] = value.x), (0, _util.isValue)(value.y) && (config[axisY] = value.y), (0, _util.isValue)(value.y2) && (config[axisY2] = value.y2)) : (config[axisY] = value, config[axisY2] = value), $$.redraw({
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
    axis = (0, _util.extend)(function () {}, {
	/**
  * Get and set axis labels.
  * @method axis․labels
  * @instance
  * @memberOf Chart
  * @param {Object} labels specified axis' label to be updated.
  * @example
  * // Update axis' label
  * chart.axis.labels({
  *   x: "New X Axis Label",
  *   y: "New Y Axis Label"
  * });
  */
	labels: function labels(_labels) {
		var $$ = this.internal;

		arguments.length && (Object.keys(_labels).forEach(function (axisId) {
			$$.axis.setLabelText(axisId, _labels[axisId]);
		}), $$.axis.updateLabels());
	},

	/**
  * Get and set axis min value.
  * @method axis․min
  * @instance
  * @memberOf Chart
  * @param {Object} min If min is given, specified axis' min value will be updated.<br>
  *     If no argument is given, the min values set on generating option for each axis will be returned.
  *     If not set any min values on generation, it will return `undefined`.
  * @example
  * // Update axis' min
  * chart.axis.min({
  *   x: -10,
  *   y: 1000,
  *   y2: 100
  * });
  */
	min: function min(_min) {
		var $$ = this.internal;

		return arguments.length ? setMinMax($$, "min", _min) : getMinMax($$, "min");
	},

	/**
  * Get and set axis max value.
  * @method axis․max
  * @instance
  * @memberOf Chart
  * @param {Object} max If max is given, specified axis' max value will be updated.<br>
  *     If no argument is given, the max values set on generating option for each axis will be returned.
  *     If not set any max values on generation, it will return `undefined`.
  * @example
  * // Update axis' label
  * chart.axis.max({
  *    x: 100,
  *    y: 1000,
  *    y2: 10000
  * });
  */
	max: function max(_max) {
		var $$ = this.internal;

		return arguments.length ? setMinMax($$, "max", _max) : getMinMax($$, "max");
	},

	/**
  * Get and set axis min and max value.
  * @method axis․range
  * @instance
  * @memberOf Chart
  * @param {Object} range If range is given, specified axis' min and max value will be updated. If no argument is given, the current min and max values for each axis will be returned.
  * @example
  * // Update axis' label
  * chart.axis.range({
  *   min: {
  *     x: -10,
  *     y: -1000,
  *     y2: -10000
  *   },
  *   max: {
  *     x: 100,
  *     y: 1000,
  *     y2: 10000
  *   },
  * });
  */
	range: function range(_range) {
		var axis = this.axis;

		if (arguments.length) (0, _util.isDefined)(_range.max) && axis.max(_range.max), (0, _util.isDefined)(_range.min) && axis.min(_range.min);else return {
				max: axis.max(),
				min: axis.min()
			};

		return undefined;
	}
});

/**
 * Get the min/max value
 * @param {Chart} $$
 * @param {String} type
 * @return {{x, y, y2}}
 * @private
 */


/**
 * Define axis
 */
(0, _util.extend)(_Chart2.default.prototype, { axis: axis });

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define legend
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var legend = (0, _util.extend)(function () {}, {
	/**
  * Show legend for each target.
  * @method legend․show
  * @instance
  * @memberOf Chart
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
	show: function show(targetIds) {
		var $$ = this.internal;

		$$.showLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({ withLegend: !0 });
	},

	/**
  * Hide legend for each target.
  * @method legend․hide
  * @instance
  * @memberOf Chart
  * @param {String|Array} targetIds
  * - If targetIds is given, specified target's legend will be hidden.
  * - If only one target is the candidate, String can be passed.
  * - If no argument is given, all of target's legend will be hidden.
  * @example
  * // Hide legend for data1.
  * chart.legend.hide("data1");
  *
  * // Hide legend for data1 and data2.
  * chart.legend.hide(["data1", "data2"]);
  *
  * // Hide all legend.
  * chart.legend.hide();
  */
	hide: function hide(targetIds) {
		var $$ = this.internal;

		$$.hideLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({ withLegend: !0 });
	}
});

(0, _util.extend)(_Chart2.default.prototype, { legend: legend });

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _browser = __webpack_require__(58),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Resize the chart.
  * @method resize
  * @instance
  * @memberOf Chart
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
  * @memberOf Chart
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
  * @memberOf Chart
  * @example
  * chart.destroy();
  */
	destroy: function destroy() {
		var _this = this,
		    $$ = this.internal;

		return $$.charts.splice($$.charts.indexOf(this), 1), _browser.window.clearInterval($$.intervalForObserveInserted), $$.resizeTimeout !== undefined && _browser.window.clearTimeout($$.resizeTimeout), (0, _util.removeEvent)(_browser.window, "resize", $$.resizeFunction), $$.selectChart.classed("bb", !1).html(""), Object.keys(this).forEach(function (key) {
			key === "internal" && Object.keys($$).forEach(function (k) {
				$$[k] = null;
			}), _this[key] = null, delete _this[key];
		}), null;
	}
}); /**
     * Copyright (c) 2017 NAVER Corp.
     * billboard.js project is licensed under the MIT license
     */

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = !0;
exports.document = exports.window = undefined;

var _util = __webpack_require__(5),
    win = (0, _util.isDefined)(window) && window.Math === Math ? window : (0, _util.isDefined)(self) && (self.Math === Math ? self : Function("return this")()),
    doc = win.document;

/**
 * Window object
 * @module
 * @ignore
 */
/* eslint-disable no-new-func */


/* eslint-enable no-new-func */

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
exports.window = win;
exports.document = doc;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define tooltip
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var tooltip = (0, _util.extend)(function () {}, {
	/**
  * Show tooltip
  * @method tooltip․show
  * @instance
  * @memberOf Chart
  * @param {Object} args The object can consist with following members:<br>
  *
  *    | Key | Type | Description |
  *    | --- | --- | --- |
  *    | index | Number | Determine focus by index |
  *    | x | Number|Date | Determine focus by x Axis index |
  *    | data | Object | Determine focus data with following keys: `x` or `index`.<br>When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is set, the target is determined by mouse position and needs specify `x`, `id` and `value`. |
  *    | mouse | Array | Determine x and y coordinate value relative the targeted x Axis element.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
  *
  * @example
  *  // show the 2nd x Axis coordinate tooltip
  *  chart.tooltip.show({
  *    index: 1
  *  });
  *
  *  // show tooltip for the 3rd x Axis in x:50 and y:100 coordinate relative the x Axis element.
  *  chart.tooltip.show({
  *    data: {x: 2},
  *    mouse: [50, 100]
  *  });
  *
  *  // show tooltip for timeseries x axis
  *  chart.tooltip.show({
  *    x: new Date("2018-01-02 00:00")
  *  });
  */
	show: function show() {
		var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    $$ = this.internal,
		    index = void 0,
		    mouse = void 0;


		// determine mouse position on the chart
		args.mouse && (mouse = args.mouse), args.data ? $$.isMultipleX() ? (mouse = [$$.x(args.data.x), $$.getYScale(args.data.id)(args.data.value)], index = null) : index = (0, _util.isValue)(args.data.index) ? args.data.index : $$.getIndexByX(args.data.x) : (0, _util.isDefined)(args.x) ? index = $$.getIndexByX(args.x) : (0, _util.isDefined)(args.index) && (index = args.index), ["mouseover", "mousemove"].forEach(function (eventName) {
			$$.dispatchEvent(eventName, index, mouse);
		});
	},

	/**
  * Hide tooltip
  * @method tooltip․hide
  * @instance
  * @memberOf Chart
  */
	hide: function hide() {
		var $$ = this.internal;

		$$.hideTooltip(), $$.hideXGridFocus();
	}
});

(0, _util.extend)(_Chart2.default.prototype, { tooltip: tooltip });

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartInternal = __webpack_require__(3),
    _ChartInternal2 = _interopRequireDefault(_ChartInternal),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var ua = window.navigator.userAgent;

(0, _util.extend)(_ChartInternal2.default.prototype, {
	isSafari: function isSafari() {
		return ua.indexOf("Safari") > -1 && !this.isChrome();
	},
	isChrome: function isChrome() {
		return ua.indexOf("Chrome") > -1;
	},
	isMobile: function isMobile() {
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
		return ua.indexOf("Mobi") > -1;
	}
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d3Selection = __webpack_require__(63),
    _Chart = __webpack_require__(1),
    _Chart2 = _interopRequireDefault(_Chart),
    _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Encode to base64
 * @param {String} str
 * @return {String}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
var b64EncodeUnicode = function (str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p) {
		return String.fromCharCode("0x" + p);
	}));
},
    nodeToSvgDataUrl = function (node) {
	var bounds = node.getBoundingClientRect(),
	    clone = node.cloneNode(!0),
	    styleSheets = (0, _util.toArray)(document.styleSheets),
	    cssRules = (0, _util.getCssRules)(styleSheets),
	    cssText = cssRules.filter(function (r) {
		return r.cssText;
	}).map(function (r) {
		return r.cssText;
	});
	clone.setAttribute("xmlns", _d3Selection.namespaces.xhtml);


	var nodeXml = new XMLSerializer().serializeToString(clone),
	    dataStr = ("<svg xmlns=\"" + _d3Selection.namespaces.svg + "\" width=\"" + bounds.width + "\" height=\"" + bounds.height + "\">\n\t\t\t<foreignObject width=\"100%\" height=\"100%\">\n\t\t\t\t<style>" + cssText.join("\n") + "</style>\n\t\t\t\t" + nodeXml + "\n\t\t\t</foreignObject></svg>").replace(/#/g, "%23").replace("/\n/g", "%0A");

	// foreignObject not supported in IE11 and below
	// https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx


	return "data:image/svg+xml;base64," + b64EncodeUnicode(dataStr);
};

/**
 * Convert svg node to data url
 * @param {HTMLElement} node
 * @return {String}
 * @private
 */
/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
(0, _util.extend)(_Chart2.default.prototype, {
	/**
  * Export chart as an image.
  * - **NOTE:** IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
  *
  * @method export
  * @instance
  * @memberOf Chart
  * @param {String} [mimeType=image/png] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
  * @param {Function} [callback] The callback to be invoked when export is ready.
  * @return {String} dataURI
  * @example
  *  chart.export();
  *  // --> "data:image/svg+xml;base64,PHN..."
  *
  *  // Initialize the download automatically
  *  chart.export("image/png", dataUrl => {
  *     const link = document.createElement("a");
  *
  *     link.download = `${Date.now()}.png`;
  *     link.href = dataUrl;
  *     link.innerHTML = "Download chart as image";
  *
  *     document.body.appendChild(link);
  *  });
  */
	export: function _export() {
		var mimeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/png",
		    callback = arguments[1],
		    svgDataUrl = nodeToSvgDataUrl(this.element);


		if ((0, _util.isFunction)(callback)) {
			var img = new Image();

			img.crosssOrigin = "Anonymous", img.onload = function () {
				var canvas = document.createElement("canvas"),
				    ctx = canvas.getContext("2d");
				canvas.width = img.width, canvas.height = img.height, ctx.drawImage(img, 0, 0), canvas.toBlob(function (blob) {
					callback(window.URL.createObjectURL(blob));
				}, mimeType);
			}, img.src = svgDataUrl;
		}

		return svgDataUrl;
	}
});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-path/src/path.js
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

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
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
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
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
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
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ var src_path = (path);

// CONCATENATED MODULE: ./node_modules/d3-path/index.js


// CONCATENATED MODULE: ./node_modules/d3-shape/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function constant() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/math.js
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var math_epsilon = 1e-12;
var math_pi = Math.PI;
var halfPi = math_pi / 2;
var math_tau = 2 * math_pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? math_pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

// CONCATENATED MODULE: ./node_modules/d3-shape/src/arc.js




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
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
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
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
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

/* harmony default export */ var src_arc = (function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
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
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = src_path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > math_epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > math_tau - math_epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > math_epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
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
          rp = (ap > math_epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > math_epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > math_epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > math_epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > math_epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < math_pi) {
          var oc = da0 > math_epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > math_epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > math_epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > math_epsilon) || !(da0 > math_epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > math_epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
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
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - math_pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/linear.js
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

/* harmony default export */ var linear = (function(context) {
  return new Linear(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/point.js
function point_x(p) {
  return p[0];
}

function point_y(p) {
  return p[1];
}

// CONCATENATED MODULE: ./node_modules/d3-shape/src/line.js





/* harmony default export */ var src_line = (function() {
  var x = point_x,
      y = point_y,
      defined = constant(true),
      context = null,
      curve = linear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = src_path());

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
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/area.js






/* harmony default export */ var src_area = (function() {
  var x0 = point_x,
      x1 = null,
      y0 = constant(0),
      y1 = point_y,
      defined = constant(true),
      context = null,
      curve = linear,
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

    if (context == null) output = curve(buffer = src_path());

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
    return src_line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
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
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/descending.js
/* harmony default export */ var descending = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/identity.js
/* harmony default export */ var identity = (function(d) {
  return d;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/pie.js





/* harmony default export */ var src_pie = (function() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(math_tau),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(math_tau, Math.max(-math_tau, endAngle.apply(this, arguments) - a0)),
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
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/radial.js


var curveRadialLinear = curveRadial(linear);

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

// CONCATENATED MODULE: ./node_modules/d3-shape/src/lineRadial.js



function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

/* harmony default export */ var src_lineRadial = (function() {
  return lineRadial(src_line().curve(curveRadialLinear));
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/areaRadial.js




/* harmony default export */ var areaRadial = (function() {
  var a = src_area().curve(curveRadialLinear),
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
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/pointRadial.js
/* harmony default export */ var pointRadial = (function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

// CONCATENATED MODULE: ./node_modules/d3-shape/src/link/index.js






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link_link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = point_x,
      y = point_y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = src_path();
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
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), link) : y;
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

function link_curveRadial(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link_link(curveHorizontal);
}

function linkVertical() {
  return link_link(curveVertical);
}

function linkRadial() {
  var l = link_link(link_curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/circle.js


/* harmony default export */ var circle = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / math_pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, math_tau);
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/cross.js
/* harmony default export */ var cross = ({
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
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

/* harmony default export */ var diamond = ({
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/star.js


var ka = 0.89081309152928522810,
    kr = Math.sin(math_pi / 10) / Math.sin(7 * math_pi / 10),
    kx = Math.sin(math_tau / 10) * kr,
    ky = -Math.cos(math_tau / 10) * kr;

/* harmony default export */ var star = ({
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = math_tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/square.js
/* harmony default export */ var square = ({
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

/* harmony default export */ var triangle = ({
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol/wye.js
var wye_c = -0.5,
    wye_s = Math.sqrt(3) / 2,
    wye_k = 1 / Math.sqrt(12),
    wye_a = (wye_k / 2 + 1) * 3;

/* harmony default export */ var wye = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / wye_a),
        x0 = r / 2,
        y0 = r * wye_k,
        x1 = x0,
        y1 = r * wye_k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(wye_c * x0 - wye_s * y0, wye_s * x0 + wye_c * y0);
    context.lineTo(wye_c * x1 - wye_s * y1, wye_s * x1 + wye_c * y1);
    context.lineTo(wye_c * x2 - wye_s * y2, wye_s * x2 + wye_c * y2);
    context.lineTo(wye_c * x0 + wye_s * y0, wye_c * y0 - wye_s * x0);
    context.lineTo(wye_c * x1 + wye_s * y1, wye_c * y1 - wye_s * x1);
    context.lineTo(wye_c * x2 + wye_s * y2, wye_c * y2 - wye_s * x2);
    context.closePath();
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/symbol.js










var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

/* harmony default export */ var src_symbol = (function() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = src_path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/noop.js
/* harmony default export */ var noop = (function() {});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/basis.js
function point(that, x, y) {
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
      case 3: point(this, this._x1, this._y1); // proceed
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
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ var basis = (function(context) {
  return new Basis(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/basisClosed.js



function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
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
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ var basisClosed = (function(context) {
  return new BasisClosed(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/basisOpen.js


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
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ var basisOpen = (function(context) {
  return new BasisOpen(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/bundle.js


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

/* harmony default export */ var curve_bundle = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/cardinal.js
function cardinal_point(that, x, y) {
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
      case 3: cardinal_point(this, this._x1, this._y1); break;
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
      default: cardinal_point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var cardinal = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/cardinalClosed.js



function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
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
      default: cardinal_point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var cardinalClosed = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/cardinalOpen.js


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
      default: cardinal_point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var cardinalOpen = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/catmullRom.js



function catmullRom_point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > math_epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > math_epsilon) {
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
      default: catmullRom_point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var curve_catmullRom = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/catmullRomClosed.js




function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
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
      default: catmullRom_point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var catmullRomClosed = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/catmullRomOpen.js



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
      default: catmullRom_point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var catmullRomOpen = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/linearClosed.js


function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
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

/* harmony default export */ var linearClosed = (function(context) {
  return new LinearClosed(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/monotone.js
function sign(x) {
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
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function monotone_point(that, t0, t1) {
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
      case 3: monotone_point(this, this._t0, slope2(this, this._t0)); break;
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
      case 2: this._point = 3; monotone_point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: monotone_point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
}

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

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/natural.js
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

/* harmony default export */ var natural = (function(context) {
  return new Natural(context);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/step.js
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

/* harmony default export */ var step = (function(context) {
  return new Step(context, 0.5);
});

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/none.js
/* harmony default export */ var none = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/none.js
/* harmony default export */ var order_none = (function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/stack.js





function stackValue(d, key) {
  return d[key];
}

/* harmony default export */ var src_stack = (function() {
  var keys = constant([]),
      order = order_none,
      offset = none,
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
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? order_none : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/expand.js


/* harmony default export */ var expand = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/diverging.js
/* harmony default export */ var diverging = (function(series, order) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/silhouette.js


/* harmony default export */ var silhouette = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/wiggle.js


/* harmony default export */ var wiggle = (function(series, order) {
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
  none(series, order);
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/ascending.js


/* harmony default export */ var ascending = (function(series) {
  var sums = series.map(ascending_sum);
  return order_none(series).sort(function(a, b) { return sums[a] - sums[b]; });
});

function ascending_sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/descending.js


/* harmony default export */ var order_descending = (function(series) {
  return ascending(series).reverse();
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/insideOut.js



/* harmony default export */ var insideOut = (function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(ascending_sum),
      order = order_none(series).sort(function(a, b) { return sums[b] - sums[a]; }),
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
});

// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/reverse.js


/* harmony default export */ var reverse = (function(series) {
  return order_none(series).reverse();
});

// CONCATENATED MODULE: ./node_modules/d3-shape/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "arc", function() { return src_arc; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "area", function() { return src_area; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "line", function() { return src_line; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "pie", function() { return src_pie; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "areaRadial", function() { return areaRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "radialArea", function() { return areaRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "lineRadial", function() { return src_lineRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "radialLine", function() { return src_lineRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "pointRadial", function() { return pointRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "linkHorizontal", function() { return linkHorizontal; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "linkVertical", function() { return linkVertical; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "linkRadial", function() { return linkRadial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbol", function() { return src_symbol; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbols", function() { return symbols; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolCircle", function() { return circle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolCross", function() { return cross; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolDiamond", function() { return diamond; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolSquare", function() { return square; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolStar", function() { return star; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolTriangle", function() { return triangle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "symbolWye", function() { return wye; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveBasisClosed", function() { return basisClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveBasisOpen", function() { return basisOpen; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveBasis", function() { return basis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveBundle", function() { return curve_bundle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCardinalClosed", function() { return cardinalClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCardinalOpen", function() { return cardinalOpen; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCardinal", function() { return cardinal; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCatmullRomClosed", function() { return catmullRomClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCatmullRomOpen", function() { return catmullRomOpen; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveCatmullRom", function() { return curve_catmullRom; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveLinearClosed", function() { return linearClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveLinear", function() { return linear; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return monotoneX; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveMonotoneY", function() { return monotoneY; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveNatural", function() { return natural; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveStep", function() { return step; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveStepAfter", function() { return stepAfter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "curveStepBefore", function() { return stepBefore; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stack", function() { return src_stack; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOffsetExpand", function() { return expand; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOffsetDiverging", function() { return diverging; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOffsetNone", function() { return none; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOffsetSilhouette", function() { return silhouette; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOffsetWiggle", function() { return wiggle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOrderAscending", function() { return ascending; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOrderDescending", function() { return order_descending; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOrderInsideOut", function() { return insideOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOrderNone", function() { return order_none; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "stackOrderReverse", function() { return reverse; });




 // Note: radialArea is deprecated!
 // Note: radialLine is deprecated!









































/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ var namespaces = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/namespace.js


/* harmony default export */ var namespace = (function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/creator.js



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

/* harmony default export */ var creator = (function(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selector.js
function none() {}

/* harmony default export */ var src_selector = (function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/select.js



/* harmony default export */ var selection_select = (function(select) {
  if (typeof select !== "function") select = src_selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}

/* harmony default export */ var selectorAll = (function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/selectAll.js



/* harmony default export */ var selectAll = (function(select) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/matcher.js
var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var matcher_element = document.documentElement;
  if (!matcher_element.matches) {
    var vendorMatches = matcher_element.webkitMatchesSelector
        || matcher_element.msMatchesSelector
        || matcher_element.mozMatchesSelector
        || matcher_element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

/* harmony default export */ var src_matcher = (matcher);

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/filter.js



/* harmony default export */ var filter = (function(match) {
  if (typeof match !== "function") match = src_matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/sparse.js
/* harmony default export */ var sparse = (function(update) {
  return new Array(update.length);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/enter.js



/* harmony default export */ var selection_enter = (function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
});

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

// CONCATENATED MODULE: ./node_modules/d3-selection/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/data.js




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

/* harmony default export */ var selection_data = (function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant(value);

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
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/exit.js



/* harmony default export */ var selection_exit = (function() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/merge.js


/* harmony default export */ var selection_merge = (function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/order.js
/* harmony default export */ var order = (function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/sort.js


/* harmony default export */ var sort = (function(compare) {
  if (!compare) compare = ascending;

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
});

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/call.js
/* harmony default export */ var call = (function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/nodes.js
/* harmony default export */ var nodes = (function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/node.js
/* harmony default export */ var selection_node = (function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/size.js
/* harmony default export */ var size = (function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/empty.js
/* harmony default export */ var selection_empty = (function() {
  return !this.node();
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/each.js
/* harmony default export */ var each = (function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/attr.js


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

/* harmony default export */ var attr = (function(name, value) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/window.js
/* harmony default export */ var src_window = (function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/style.js


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

/* harmony default export */ var style = (function(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
});

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || src_window(node).getComputedStyle(node, null).getPropertyValue(name);
}

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/property.js
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

/* harmony default export */ var property = (function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/classed.js
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

/* harmony default export */ var classed = (function(name, value) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/text.js
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

/* harmony default export */ var selection_text = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/html.js
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

/* harmony default export */ var html = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ var selection_raise = (function() {
  return this.each(raise);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ var selection_lower = (function() {
  return this.each(lower);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/append.js


/* harmony default export */ var append = (function(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/insert.js



function constantNull() {
  return null;
}

/* harmony default export */ var insert = (function(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : src_selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ var selection_remove = (function() {
  return this.each(remove);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
}

function selection_cloneDeep() {
  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
}

/* harmony default export */ var clone = (function(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/datum.js
/* harmony default export */ var datum = (function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/on.js
var filterEvents = {};

var on_event = null;

if (typeof document !== "undefined") {
  var on_element = document.documentElement;
  if (!("onmouseenter" in on_element)) {
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
    var event0 = on_event; // Events can be reentrant (e.g., focus).
    on_event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      on_event = event0;
    }
  };
}

function parseTypenames(typenames) {
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

/* harmony default export */ var on = (function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

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
});

function customEvent(event1, listener, that, args) {
  var event0 = on_event;
  event1.sourceEvent = on_event;
  on_event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    on_event = event0;
  }
}

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/dispatch.js


function dispatchEvent(node, type, params) {
  var window = src_window(node),
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

/* harmony default export */ var dispatch = (function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/index.js































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection_selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection_selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  filter: filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  merge: selection_merge,
  order: order,
  sort: sort,
  call: call,
  nodes: nodes,
  node: selection_node,
  size: size,
  empty: selection_empty,
  each: each,
  attr: attr,
  style: style,
  property: property,
  classed: classed,
  text: selection_text,
  html: html,
  raise: selection_raise,
  lower: selection_lower,
  append: append,
  insert: insert,
  remove: selection_remove,
  clone: clone,
  datum: datum,
  on: on,
  dispatch: dispatch
};

/* harmony default export */ var src_selection = (selection_selection);

// CONCATENATED MODULE: ./node_modules/d3-selection/src/select.js


/* harmony default export */ var src_select = (function(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/create.js



/* harmony default export */ var src_create = (function(name) {
  return src_select(creator(name).call(document.documentElement));
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/local.js
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
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

// CONCATENATED MODULE: ./node_modules/d3-selection/src/sourceEvent.js


/* harmony default export */ var sourceEvent = (function() {
  var current = on_event, source;
  while (source = current.sourceEvent) current = source;
  return current;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/point.js
/* harmony default export */ var point = (function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/mouse.js



/* harmony default export */ var mouse = (function(node) {
  var event = sourceEvent();
  if (event.changedTouches) event = event.changedTouches[0];
  return point(node, event);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/selectAll.js


/* harmony default export */ var src_selectAll = (function(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/touch.js



/* harmony default export */ var src_touch = (function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point(node, touch);
    }
  }

  return null;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/src/touches.js



/* harmony default export */ var src_touches = (function(node, touches) {
  if (touches == null) touches = sourceEvent().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point(node, touches[i]);
  }

  return points;
});

// CONCATENATED MODULE: ./node_modules/d3-selection/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "create", function() { return src_create; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "creator", function() { return creator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "local", function() { return local; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "matcher", function() { return src_matcher; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "mouse", function() { return mouse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "namespace", function() { return namespace; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "namespaces", function() { return namespaces; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "clientPoint", function() { return point; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "select", function() { return src_select; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "selectAll", function() { return src_selectAll; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "selection", function() { return src_selection; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "selector", function() { return src_selector; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "selectorAll", function() { return selectorAll; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "style", function() { return styleValue; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "touch", function() { return src_touch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "touches", function() { return src_touches; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "window", function() { return src_window; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "event", function() { return on_event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "customEvent", function() { return customEvent; });




















/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-array/index.js + 31 modules
var d3_array = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/d3-collection/index.js + 6 modules
var d3_collection = __webpack_require__(70);

// CONCATENATED MODULE: ./node_modules/d3-scale/src/array.js
var array = Array.prototype;

var map = array.map;
var slice = array.slice;

// CONCATENATED MODULE: ./node_modules/d3-scale/src/ordinal.js



var implicit = {name: "implicit"};

function ordinal(range) {
  var index = Object(d3_collection["map"])(),
      domain = [],
      unknown = implicit;

  range = range == null ? [] : slice.call(range);

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
    domain = [], index = Object(d3_collection["map"])();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), scale) : range.slice();
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

// CONCATENATED MODULE: ./node_modules/d3-scale/src/band.js



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
    var values = Object(d3_array["range"])(n).map(function(i) { return start + step * i; });
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

function point() {
  return pointish(band().paddingInner(1));
}

// EXTERNAL MODULE: ./node_modules/d3-interpolate/index.js + 21 modules
var d3_interpolate = __webpack_require__(67);

// CONCATENATED MODULE: ./node_modules/d3-scale/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/number.js
/* harmony default export */ var number = (function(x) {
  return +x;
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/continuous.js






var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, deinterpolate, reinterpolate) {
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
    r[i] = reinterpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = Object(d3_array["bisect"])(domain, x, 1, j) - 1;
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
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range = unit,
      interpolate = d3_interpolate["interpolate"],
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
    return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map.call(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = slice.call(_), interpolate = d3_interpolate["interpolateRound"], rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  return rescale();
}

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatDecimal.js
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
/* harmony default export */ var formatDecimal = (function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/exponent.js


/* harmony default export */ var src_exponent = (function(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatGroup.js
/* harmony default export */ var formatGroup = (function(grouping, thousands) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatNumerals.js
/* harmony default export */ var formatNumerals = (function(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatDefault.js
/* harmony default export */ var formatDefault = (function(x, p) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatPrefixAuto.js


var prefixExponent;

/* harmony default export */ var formatPrefixAuto = (function(x, p) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatRounded.js


/* harmony default export */ var formatRounded = (function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatTypes.js




/* harmony default export */ var formatTypes = ({
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
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/formatSpecifier.js


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

// CONCATENATED MODULE: ./node_modules/d3-format/src/identity.js
/* harmony default export */ var identity = (function(x) {
  return x;
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/locale.js








var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ var src_locale = (function(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
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
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

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
        e = Math.max(-8, Math.min(8, Math.floor(src_exponent(value) / 3))) * 3,
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
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/defaultLocale.js


var defaultLocale_locale;
var defaultLocale_format;
var defaultLocale_formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  defaultLocale_locale = src_locale(definition);
  defaultLocale_format = defaultLocale_locale.format;
  defaultLocale_formatPrefix = defaultLocale_locale.formatPrefix;
  return defaultLocale_locale;
}

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionFixed.js


/* harmony default export */ var precisionFixed = (function(step) {
  return Math.max(0, -src_exponent(Math.abs(step)));
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionPrefix.js


/* harmony default export */ var precisionPrefix = (function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(src_exponent(value) / 3))) * 3 - src_exponent(Math.abs(step)));
});

// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionRound.js


/* harmony default export */ var precisionRound = (function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, src_exponent(max) - src_exponent(step)) + 1;
});

// CONCATENATED MODULE: ./node_modules/d3-format/index.js







// CONCATENATED MODULE: ./node_modules/d3-scale/src/tickFormat.js



/* harmony default export */ var src_tickFormat = (function(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = Object(d3_array["tickStep"])(start, stop, count == null ? 10 : count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return defaultLocale_formatPrefix(specifier, value);
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
  return defaultLocale_format(specifier);
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/linear.js





function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return Object(d3_array["ticks"])(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return src_tickFormat(domain(), count, specifier);
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

    step = Object(d3_array["tickIncrement"])(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = Object(d3_array["tickIncrement"])(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = Object(d3_array["tickIncrement"])(start, stop, count);
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

function linear() {
  var scale = continuous(deinterpolateLinear, d3_interpolate["interpolateNumber"]);

  scale.copy = function() {
    return copy(scale, linear());
  };

  return linearish(scale);
}

// CONCATENATED MODULE: ./node_modules/d3-scale/src/identity.js




function identity_identity() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map.call(_, number), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity_identity().domain(domain);
  };

  return linearish(scale);
}

// CONCATENATED MODULE: ./node_modules/d3-scale/src/nice.js
/* harmony default export */ var nice = (function(domain, interval) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/log.js






function log_deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : constant(b);
}

function log_reinterpolate(a, b) {
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

function log() {
  var scale = continuous(log_deinterpolate, log_reinterpolate).domain([1, 10]),
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
      z = Object(d3_array["ticks"])(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = defaultLocale_format(specifier);
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
    return copy(scale, log().base(base));
  };

  return scale;
}

// CONCATENATED MODULE: ./node_modules/d3-scale/src/pow.js




function raise(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow() {
  var exponent = 1,
      scale = continuous(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise(b, exponent) - (a = raise(a, exponent)))
        ? function(x) { return (raise(x, exponent) - a) / b; }
        : constant(b);
  }

  function reinterpolate(a, b) {
    b = raise(b, exponent) - (a = raise(a, exponent));
    return function(t) { return raise(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return copy(scale, pow().exponent(exponent));
  };

  return linearish(scale);
}

function sqrt() {
  return pow().exponent(0.5);
}

// CONCATENATED MODULE: ./node_modules/d3-scale/src/quantile.js



function quantile() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = Object(d3_array["quantile"])(domain, i / n);
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) return range[Object(d3_array["bisect"])(thresholds, x)];
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
    domain.sort(d3_array["ascending"]);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
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

// CONCATENATED MODULE: ./node_modules/d3-scale/src/quantize.js




function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1];

  function scale(x) {
    if (x <= x) return range[Object(d3_array["bisect"])(domain, x, 0, n)];
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
    return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range);
  };

  return linearish(scale);
}

// CONCATENATED MODULE: ./node_modules/d3-scale/src/threshold.js



function threshold() {
  var domain = [0.5],
      range = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) return range[Object(d3_array["bisect"])(domain, x, 0, n)];
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range);
  };

  return scale;
}

// EXTERNAL MODULE: ./node_modules/d3-time/index.js + 16 modules
var d3_time = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/d3-time-format/index.js + 4 modules
var d3_time_format = __webpack_require__(75);

// CONCATENATED MODULE: ./node_modules/d3-scale/src/time.js








var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function time_number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = continuous(deinterpolateLinear, d3_interpolate["interpolateNumber"]),
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
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = Object(d3_array["bisector"])(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = Object(d3_array["tickStep"])(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(Object(d3_array["tickStep"])(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map.call(_, time_number)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

/* harmony default export */ var time = (function() {
  return calendar(d3_time["timeYear"], d3_time["timeMonth"], d3_time["timeWeek"], d3_time["timeDay"], d3_time["timeHour"], d3_time["timeMinute"], d3_time["timeSecond"], d3_time["timeMillisecond"], d3_time_format["timeFormat"]).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/utcTime.js




/* harmony default export */ var utcTime = (function() {
  return calendar(d3_time["utcYear"], d3_time["utcMonth"], d3_time["utcWeek"], d3_time["utcDay"], d3_time["utcHour"], d3_time["utcMinute"], d3_time["utcSecond"], d3_time["utcMillisecond"], d3_time_format["utcFormat"]).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
});

// CONCATENATED MODULE: ./node_modules/d3-scale/src/sequential.js


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

// CONCATENATED MODULE: ./node_modules/d3-scale/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleBand", function() { return band; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scalePoint", function() { return point; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleIdentity", function() { return identity_identity; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleLinear", function() { return linear; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleLog", function() { return log; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleOrdinal", function() { return ordinal; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleImplicit", function() { return implicit; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scalePow", function() { return pow; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleSqrt", function() { return sqrt; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleQuantile", function() { return quantile; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleQuantize", function() { return quantize; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleThreshold", function() { return threshold; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleTime", function() { return time; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleUtc", function() { return utcTime; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scaleSequential", function() { return sequential; });

























/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-array/src/ascending.js
/* harmony default export */ var ascending = (function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/bisector.js


/* harmony default export */ var bisector = (function(compare) {
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
});

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

// CONCATENATED MODULE: ./node_modules/d3-array/src/bisect.js



var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ var bisect = (bisectRight);

// CONCATENATED MODULE: ./node_modules/d3-array/src/pairs.js
/* harmony default export */ var pairs = (function(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
});

function pair(a, b) {
  return [a, b];
}

// CONCATENATED MODULE: ./node_modules/d3-array/src/cross.js


/* harmony default export */ var cross = (function(values0, values1, reduce) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/descending.js
/* harmony default export */ var descending = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/number.js
/* harmony default export */ var number = (function(x) {
  return x === null ? NaN : +x;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/variance.js


/* harmony default export */ var variance = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/deviation.js


/* harmony default export */ var deviation = (function(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/extent.js
/* harmony default export */ var extent = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/array.js
var array_array = Array.prototype;

var slice = array_array.slice;
var map = array_array.map;

// CONCATENATED MODULE: ./node_modules/d3-array/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/identity.js
/* harmony default export */ var identity = (function(x) {
  return x;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/range.js
/* harmony default export */ var range = (function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ var ticks = (function(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
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
});

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

// CONCATENATED MODULE: ./node_modules/d3-array/src/threshold/sturges.js
/* harmony default export */ var sturges = (function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/histogram.js









/* harmony default export */ var src_histogram = (function() {
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
      tz = range(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
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
        bins[bisect(tz, x, 0, m)].push(data[i]);
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/quantile.js


/* harmony default export */ var quantile = (function(values, p, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/threshold/freedmanDiaconis.js





/* harmony default export */ var freedmanDiaconis = (function(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/threshold/scott.js


/* harmony default export */ var scott = (function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/max.js
/* harmony default export */ var src_max = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/mean.js


/* harmony default export */ var src_mean = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/median.js




/* harmony default export */ var median = (function(values, valueof) {
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

  return quantile(numbers.sort(ascending), 0.5);
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/merge.js
/* harmony default export */ var merge = (function(arrays) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/min.js
/* harmony default export */ var src_min = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/permute.js
/* harmony default export */ var permute = (function(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/scan.js


/* harmony default export */ var scan = (function(values, compare) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/shuffle.js
/* harmony default export */ var shuffle = (function(array, i0, i1) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/sum.js
/* harmony default export */ var src_sum = (function(values, valueof) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-array/src/transpose.js


/* harmony default export */ var src_transpose = (function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = src_min(matrix, transpose_length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
});

function transpose_length(d) {
  return d.length;
}

// CONCATENATED MODULE: ./node_modules/d3-array/src/zip.js


/* harmony default export */ var zip = (function() {
  return src_transpose(arguments);
});

// CONCATENATED MODULE: ./node_modules/d3-array/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "bisect", function() { return bisect; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "bisectRight", function() { return bisectRight; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "bisectLeft", function() { return bisectLeft; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ascending", function() { return ascending; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "bisector", function() { return bisector; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "descending", function() { return descending; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "deviation", function() { return deviation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "extent", function() { return extent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "histogram", function() { return src_histogram; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "thresholdFreedmanDiaconis", function() { return freedmanDiaconis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "thresholdScott", function() { return scott; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "thresholdSturges", function() { return sturges; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "max", function() { return src_max; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "mean", function() { return src_mean; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "median", function() { return median; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "min", function() { return src_min; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "pairs", function() { return pairs; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "permute", function() { return permute; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "quantile", function() { return quantile; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scan", function() { return scan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "sum", function() { return src_sum; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ticks", function() { return ticks; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tickIncrement", function() { return tickIncrement; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tickStep", function() { return tickStep; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "transpose", function() { return src_transpose; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "variance", function() { return variance; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });





























/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-selection/index.js + 49 modules
var d3_selection = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/d3-dispatch/index.js + 1 modules
var d3_dispatch = __webpack_require__(77);

// CONCATENATED MODULE: ./node_modules/d3-timer/src/timer.js
var timer_frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

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
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --timer_frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
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
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}

// CONCATENATED MODULE: ./node_modules/d3-timer/src/timeout.js


/* harmony default export */ var src_timeout = (function(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
});

// CONCATENATED MODULE: ./node_modules/d3-timer/src/interval.js


/* harmony default export */ var src_interval = (function(callback, delay, time) {
  var t = new Timer, total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? now() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
});

// CONCATENATED MODULE: ./node_modules/d3-timer/index.js






// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/schedule.js



var emptyOn = Object(d3_dispatch["dispatch"])("start", "end", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ var transition_schedule = (function(node, name, id, index, group, timing) {
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
});

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTING) throw new Error("too late; already started");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
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
      if (o.state === STARTED) return src_timeout(start);

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
    src_timeout(function() {
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

// CONCATENATED MODULE: ./node_modules/d3-transition/src/interrupt.js


/* harmony default export */ var interrupt = (function(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/interrupt.js


/* harmony default export */ var selection_interrupt = (function(name) {
  return this.each(function() {
    interrupt(this, name);
  });
});

// EXTERNAL MODULE: ./node_modules/d3-interpolate/index.js + 21 modules
var d3_interpolate = __webpack_require__(67);

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/tween.js


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

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

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

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

    schedule.tween = tween1;
  };
}

/* harmony default export */ var transition_tween = (function(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
});

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

// EXTERNAL MODULE: ./node_modules/d3-color/index.js + 5 modules
var d3_color = __webpack_require__(72);

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/interpolate.js



/* harmony default export */ var transition_interpolate = (function(a, b) {
  var c;
  return (typeof b === "number" ? d3_interpolate["interpolateNumber"]
      : b instanceof d3_color["color"] ? d3_interpolate["interpolateRgb"]
      : (c = Object(d3_color["color"])(b)) ? (b = c, d3_interpolate["interpolateRgb"])
      : d3_interpolate["interpolateString"])(a, b);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attr.js





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

function attrConstant(name, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

/* harmony default export */ var attr = (function(name, value) {
  var fullname = Object(d3_selection["namespace"])(name), i = fullname === "transform" ? d3_interpolate["interpolateTransformSvg"] : transition_interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value + ""));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attrTween.js


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

/* harmony default export */ var transition_attrTween = (function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = Object(d3_selection["namespace"])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/delay.js


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

/* harmony default export */ var transition_delay = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/duration.js


function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

/* harmony default export */ var duration = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/ease.js


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

/* harmony default export */ var ease = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/filter.js



/* harmony default export */ var filter = (function(match) {
  if (typeof match !== "function") match = Object(d3_selection["matcher"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/merge.js


/* harmony default export */ var transition_merge = (function(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/on.js


function on_start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = on_start(name) ? init : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ var on = (function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ var remove = (function() {
  return this.on("end.remove", removeFunction(this._id));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/select.js




/* harmony default export */ var transition_select = (function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = Object(d3_selection["selector"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        transition_schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/selectAll.js




/* harmony default export */ var selectAll = (function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = Object(d3_selection["selectorAll"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            transition_schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/selection.js


var Selection = d3_selection["selection"].prototype.constructor;

/* harmony default export */ var selection = (function() {
  return new Selection(this._groups, this._parents);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/style.js





function styleRemove(name, interpolate) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = Object(d3_selection["style"])(this, name),
        value1 = (this.style.removeProperty(name), Object(d3_selection["style"])(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = Object(d3_selection["style"])(this, name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = Object(d3_selection["style"])(this, name),
        value1 = value(this);
    if (value1 == null) value1 = (this.style.removeProperty(name), Object(d3_selection["style"])(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

/* harmony default export */ var style = (function(name, value, priority) {
  var i = (name += "") === "transform" ? d3_interpolate["interpolateTransformCss"] : transition_interpolate;
  return value == null ? this
          .styleTween(name, styleRemove(name, i))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, typeof value === "function"
          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
          : styleConstant(name, i, value + ""), priority);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/styleTween.js
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

/* harmony default export */ var transition_styleTween = (function(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/text.js


function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ var transition_text = (function(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/transition.js



/* harmony default export */ var transition_transition = (function() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        transition_schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/index.js



















var transition_id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function src_transition_transition(name) {
  return Object(d3_selection["selection"])().transition(name);
}

function newId() {
  return ++transition_id;
}

var selection_prototype = d3_selection["selection"].prototype;

Transition.prototype = src_transition_transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: selectAll,
  filter: filter,
  merge: transition_merge,
  selection: selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on,
  attr: attr,
  attrTween: transition_attrTween,
  style: style,
  styleTween: transition_styleTween,
  text: transition_text,
  remove: remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: duration,
  ease: ease
};

// EXTERNAL MODULE: ./node_modules/d3-ease/index.js + 10 modules
var d3_ease = __webpack_require__(69);

// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/transition.js





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: d3_ease["easeCubicInOut"]
};

function transition_inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}

/* harmony default export */ var selection_transition = (function(name) {
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
        transition_schedule(node, name, id, i, group, timing || transition_inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
});

// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/index.js




d3_selection["selection"].prototype.interrupt = selection_interrupt;
d3_selection["selection"].prototype.transition = selection_transition;

// CONCATENATED MODULE: ./node_modules/d3-transition/src/active.js



var root = [null];

/* harmony default export */ var src_active = (function(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
});

// CONCATENATED MODULE: ./node_modules/d3-transition/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "transition", function() { return src_transition_transition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "active", function() { return src_active; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interrupt", function() { return interrupt; });






/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-color/index.js + 5 modules
var d3_color = __webpack_require__(72);

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ var src_basis = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/basisClosed.js


/* harmony default export */ var basisClosed = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/color.js


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

function color_hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/rgb.js





/* harmony default export */ var src_rgb = ((function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = Object(d3_color["rgb"])(start)).r, (end = Object(d3_color["rgb"])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = Object(d3_color["rgb"])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/array.js


/* harmony default export */ var array = (function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = src_value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/date.js
/* harmony default export */ var date = (function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/number.js
/* harmony default export */ var number = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/object.js


/* harmony default export */ var object = (function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = src_value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/string.js


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

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

/* harmony default export */ var string = (function(a, b) {
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
      q.push({i: i, x: number(am, bm)});
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
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/value.js









/* harmony default export */ var src_value = (function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = Object(d3_color["color"])(b)) ? (b = c, src_rgb) : string)
      : b instanceof d3_color["color"] ? src_rgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/round.js
/* harmony default export */ var round = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ var decompose = (function(a, b, c, d, e, f) {
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
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/parse.js


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/index.js



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
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

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/zoom.js
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

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
/* harmony default export */ var zoom = (function(p0, p1) {
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
    }
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
    }
  }

  i.duration = S * 1000;

  return i;
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/hsl.js



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color["hsl"])(start)).h, (end = Object(d3_color["hsl"])(end)).h),
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

/* harmony default export */ var src_hsl = (hsl(color_hue));
var hslLong = hsl(nogamma);

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/lab.js



function lab(start, end) {
  var l = nogamma((start = Object(d3_color["lab"])(start)).l, (end = Object(d3_color["lab"])(end)).l),
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

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/hcl.js



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color["hcl"])(start)).h, (end = Object(d3_color["hcl"])(end)).h),
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

/* harmony default export */ var src_hcl = (hcl(color_hue));
var hclLong = hcl(nogamma);

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/cubehelix.js



function cubehelix_cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = Object(d3_color["cubehelix"])(start)).h, (end = Object(d3_color["cubehelix"])(end)).h),
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

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ var src_cubehelix = (cubehelix_cubehelix(color_hue));
var cubehelixLong = cubehelix_cubehelix(nogamma);

// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/quantize.js
/* harmony default export */ var quantize = (function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
});

// CONCATENATED MODULE: ./node_modules/d3-interpolate/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolate", function() { return src_value; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return array; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return src_basis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return basisClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return date; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return number; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return object; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return round; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateString", function() { return string; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return interpolateTransformCss; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return interpolateTransformSvg; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return zoom; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return src_rgb; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return rgbBasis; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return rgbBasisClosed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return src_hsl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return hslLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return lab; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return src_hcl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return hclLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return src_cubehelix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return cubehelixLong; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "quantize", function() { return quantize; });



















/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-time/src/interval.js
var t0 = new Date,
    t1 = new Date;

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
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
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
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
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

// CONCATENATED MODULE: ./node_modules/d3-time/src/millisecond.js


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

/* harmony default export */ var src_millisecond = (millisecond);
var milliseconds = millisecond.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

// CONCATENATED MODULE: ./node_modules/d3-time/src/second.js



var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond) * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});

/* harmony default export */ var src_second = (second);
var seconds = second.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/minute.js



var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute) * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});

/* harmony default export */ var src_minute = (minute);
var minutes = minute.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/hour.js



var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
  if (offset < 0) offset += durationHour;
  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});

/* harmony default export */ var src_hour = (hour);
var hours = hour.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/day.js



var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});

/* harmony default export */ var src_day = (day);
var days = day.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/week.js



function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
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

// CONCATENATED MODULE: ./node_modules/d3-time/src/month.js


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

/* harmony default export */ var src_month = (month);
var months = month.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/year.js


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

/* harmony default export */ var src_year = (year);
var years = year.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcMinute.js



var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});

/* harmony default export */ var src_utcMinute = (utcMinute);
var utcMinutes = utcMinute.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcHour.js



var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});

/* harmony default export */ var src_utcHour = (utcHour);
var utcHours = utcHour.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcDay.js



var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});

/* harmony default export */ var src_utcDay = (utcDay);
var utcDays = utcDay.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcWeek.js



function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
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

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcMonth.js


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

/* harmony default export */ var src_utcMonth = (utcMonth);
var utcMonths = utcMonth.range;

// CONCATENATED MODULE: ./node_modules/d3-time/src/utcYear.js


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

/* harmony default export */ var src_utcYear = (utcYear);
var utcYears = utcYear.range;

// CONCATENATED MODULE: ./node_modules/d3-time/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeInterval", function() { return newInterval; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMillisecond", function() { return src_millisecond; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMilliseconds", function() { return milliseconds; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMillisecond", function() { return src_millisecond; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMilliseconds", function() { return milliseconds; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSecond", function() { return src_second; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSeconds", function() { return seconds; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSecond", function() { return src_second; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSeconds", function() { return seconds; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMinute", function() { return src_minute; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMinutes", function() { return minutes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeHour", function() { return src_hour; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeHours", function() { return hours; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeDay", function() { return src_day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeDays", function() { return days; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeWeek", function() { return sunday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeWeeks", function() { return sundays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSunday", function() { return sunday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSundays", function() { return sundays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMonday", function() { return monday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMondays", function() { return mondays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeTuesday", function() { return tuesday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeTuesdays", function() { return tuesdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeWednesday", function() { return wednesday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeWednesdays", function() { return wednesdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeThursday", function() { return thursday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeThursdays", function() { return thursdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeFriday", function() { return friday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeFridays", function() { return fridays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSaturday", function() { return saturday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeSaturdays", function() { return saturdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMonth", function() { return src_month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeMonths", function() { return months; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeYear", function() { return src_year; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeYears", function() { return years; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMinute", function() { return src_utcMinute; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMinutes", function() { return utcMinutes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcHour", function() { return src_utcHour; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcHours", function() { return utcHours; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcDay", function() { return src_utcDay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcDays", function() { return utcDays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcWeek", function() { return utcSunday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcWeeks", function() { return utcSundays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSunday", function() { return utcSunday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSundays", function() { return utcSundays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMonday", function() { return utcMonday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMondays", function() { return utcMondays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcTuesday", function() { return utcTuesday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcTuesdays", function() { return utcTuesdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcWednesday", function() { return utcWednesday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcWednesdays", function() { return utcWednesdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcThursday", function() { return utcThursday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcThursdays", function() { return utcThursdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcFriday", function() { return utcFriday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcFridays", function() { return utcFridays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSaturday", function() { return utcSaturday; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcSaturdays", function() { return utcSaturdays; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMonth", function() { return src_utcMonth; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcMonths", function() { return utcMonths; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcYear", function() { return src_utcYear; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcYears", function() { return utcYears; });































/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-ease/src/linear.js
function linear(t) {
  return +t;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/quad.js
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/poly.js
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

// CONCATENATED MODULE: ./node_modules/d3-ease/src/sin.js
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/exp.js
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/circle.js
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}

// CONCATENATED MODULE: ./node_modules/d3-ease/src/back.js
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

// CONCATENATED MODULE: ./node_modules/d3-ease/src/elastic.js
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

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

// CONCATENATED MODULE: ./node_modules/d3-ease/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeLinear", function() { return linear; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeQuad", function() { return quadInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return quadIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return quadOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return quadInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCubic", function() { return cubicInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return cubicIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return cubicOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return cubicInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easePoly", function() { return polyInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return polyIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return polyOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return polyInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeSin", function() { return sinInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return sinIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return sinOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return sinInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeExp", function() { return expInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return expIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return expOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return expInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCircle", function() { return circleInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return circleIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return circleOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return circleInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBounce", function() { return bounceOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return bounceIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return bounceOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return bounceInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBack", function() { return backInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return backIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return backOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return backInOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeElastic", function() { return elasticOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return elasticIn; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return elasticOut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return elasticInOut; });





















/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-collection/src/map.js
var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
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

function map(object, f) {
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

/* harmony default export */ var src_map = (map);

// CONCATENATED MODULE: ./node_modules/d3-collection/src/nest.js


/* harmony default export */ var src_nest = (function() {
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
        valuesByKey = src_map(),
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
});

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return src_map();
}

function setMap(map, key, value) {
  map.set(key, value);
}

// CONCATENATED MODULE: ./node_modules/d3-collection/src/set.js


function Set() {}

var proto = src_map.prototype;

Set.prototype = set.prototype = {
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

function set(object, f) {
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

/* harmony default export */ var src_set = (set);

// CONCATENATED MODULE: ./node_modules/d3-collection/src/keys.js
/* harmony default export */ var src_keys = (function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
});

// CONCATENATED MODULE: ./node_modules/d3-collection/src/values.js
/* harmony default export */ var src_values = (function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
});

// CONCATENATED MODULE: ./node_modules/d3-collection/src/entries.js
/* harmony default export */ var src_entries = (function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
});

// CONCATENATED MODULE: ./node_modules/d3-collection/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "nest", function() { return src_nest; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "set", function() { return src_set; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "map", function() { return src_map; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "keys", function() { return src_keys; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "values", function() { return src_values; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "entries", function() { return src_entries; });








/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-dispatch/index.js + 1 modules
var d3_dispatch = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/d3-drag/index.js + 5 modules
var d3_drag = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/d3-interpolate/index.js + 21 modules
var d3_interpolate = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/d3-selection/index.js + 49 modules
var d3_selection = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/d3-transition/index.js + 29 modules
var d3_transition = __webpack_require__(66);

// CONCATENATED MODULE: ./node_modules/d3-zoom/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-zoom/src/event.js
function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}

// CONCATENATED MODULE: ./node_modules/d3-zoom/src/transform.js
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

var identity = new Transform(1, 0, 0);

transform_transform.prototype = Transform.prototype;

function transform_transform(node) {
  return node.__zoom || identity;
}

// CONCATENATED MODULE: ./node_modules/d3-zoom/src/noevent.js


function nopropagation() {
  d3_selection["event"].stopImmediatePropagation();
}

/* harmony default export */ var noevent = (function() {
  d3_selection["event"].preventDefault();
  d3_selection["event"].stopImmediatePropagation();
});

// CONCATENATED MODULE: ./node_modules/d3-zoom/src/zoom.js










// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !d3_selection["event"].button;
}

function defaultExtent() {
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
  return this.__zoom || identity;
}

function defaultWheelDelta() {
  return -d3_selection["event"].deltaY * (d3_selection["event"].deltaMode ? 120 : 1) / 500;
}

function defaultTouchable() {
  return "ontouchstart" in this;
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ var src_zoom = (function() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = d3_interpolate["interpolateZoom"],
      gestures = [],
      listeners = Object(d3_dispatch["dispatch"])("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    });
  };

  zoom.scaleTo = function(selection, k) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = centroid(e),
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    });
  };

  zoom.translateBy = function(selection, x, y) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    });
  };

  zoom.translateTo = function(selection, x, y) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p = centroid(e);
      return constrain(identity.translate(p[0], p[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    });
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, center) {
    transition
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
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
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
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
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
      Object(d3_selection["customEvent"])(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = Object(d3_selection["mouse"])(this);

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
      Object(d3_transition["interrupt"])(this);
      g.start();
    }

    noevent();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        v = Object(d3_selection["select"])(d3_selection["event"].view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = Object(d3_selection["mouse"])(this),
        x0 = d3_selection["event"].clientX,
        y0 = d3_selection["event"].clientY;

    Object(d3_drag["dragDisable"])(d3_selection["event"].view);
    nopropagation();
    g.mouse = [p, this.__zoom.invert(p)];
    Object(d3_transition["interrupt"])(this);
    g.start();

    function mousemoved() {
      noevent();
      if (!g.moved) {
        var dx = d3_selection["event"].clientX - x0, dy = d3_selection["event"].clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = Object(d3_selection["mouse"])(g.that), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      Object(d3_drag["dragEnable"])(d3_selection["event"].view, g.moved);
      noevent();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = Object(d3_selection["mouse"])(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (d3_selection["event"].shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

    noevent();
    if (duration > 0) Object(d3_selection["select"])(this).transition().duration(duration).call(schedule, t1, p0);
    else Object(d3_selection["select"])(this).call(zoom.transform, t1);
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        touches = d3_selection["event"].changedTouches,
        started,
        n = touches.length, i, t, p;

    nopropagation();
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection["touch"])(this, touches, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true;
      else if (!g.touch1) g.touch1 = p;
    }

    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
    if (touchstarting) {
      touchstarting = clearTimeout(touchstarting);
      if (!g.touch1) {
        g.end();
        p = Object(d3_selection["select"])(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
        return;
      }
    }

    if (started) {
      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      Object(d3_transition["interrupt"])(this);
      g.start();
    }
  }

  function touchmoved() {
    var g = gesture(this, arguments),
        touches = d3_selection["event"].changedTouches,
        n = touches.length, i, t, p, l;

    noevent();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection["touch"])(this, touches, t.identifier);
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
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended() {
    var g = gesture(this, arguments),
        touches = d3_selection["event"].changedTouches,
        n = touches.length, i, t;

    nopropagation();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else g.end();
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
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
});

// CONCATENATED MODULE: ./node_modules/d3-zoom/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "zoom", function() { return src_zoom; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "zoomTransform", function() { return transform_transform; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "zoomIdentity", function() { return identity; });




/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-color/src/define.js
/* harmony default export */ var define = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// CONCATENATED MODULE: ./node_modules/d3-color/src/color.js


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

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

// CONCATENATED MODULE: ./node_modules/d3-color/src/math.js
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// CONCATENATED MODULE: ./node_modules/d3-color/src/lab.js




var Kn = 18,
    Xn = 0.950470, // D65 standard referent
    Yn = 1,
    Zn = 1.088830,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

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

// CONCATENATED MODULE: ./node_modules/d3-color/src/cubehelix.js




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

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

// CONCATENATED MODULE: ./node_modules/d3-color/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "lab", function() { return lab; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "hcl", function() { return hcl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cubehelix", function() { return cubehelix; });





/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-dispatch/index.js + 1 modules
var d3_dispatch = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/d3-selection/index.js + 49 modules
var d3_selection = __webpack_require__(63);

// CONCATENATED MODULE: ./node_modules/d3-drag/src/noevent.js


function nopropagation() {
  d3_selection["event"].stopImmediatePropagation();
}

/* harmony default export */ var noevent = (function() {
  d3_selection["event"].preventDefault();
  d3_selection["event"].stopImmediatePropagation();
});

// CONCATENATED MODULE: ./node_modules/d3-drag/src/nodrag.js



/* harmony default export */ var nodrag = (function(view) {
  var root = view.document.documentElement,
      selection = Object(d3_selection["select"])(view).on("dragstart.drag", noevent, true);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
});

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = Object(d3_selection["select"])(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent, true);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

// CONCATENATED MODULE: ./node_modules/d3-drag/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-drag/src/event.js
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

// CONCATENATED MODULE: ./node_modules/d3-drag/src/drag.js







// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !d3_selection["event"].button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(d) {
  return d == null ? {x: d3_selection["event"].x, y: d3_selection["event"].y} : d;
}

function defaultTouchable() {
  return "ontouchstart" in this;
}

/* harmony default export */ var src_drag = (function() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable,
      gestures = {},
      listeners = Object(d3_dispatch["dispatch"])("start", "drag", "end"),
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
    var gesture = beforestart("mouse", container.apply(this, arguments), d3_selection["mouse"], this, arguments);
    if (!gesture) return;
    Object(d3_selection["select"])(d3_selection["event"].view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    nodrag(d3_selection["event"].view);
    nopropagation();
    mousemoving = false;
    mousedownx = d3_selection["event"].clientX;
    mousedowny = d3_selection["event"].clientY;
    gesture("start");
  }

  function mousemoved() {
    noevent();
    if (!mousemoving) {
      var dx = d3_selection["event"].clientX - mousedownx, dy = d3_selection["event"].clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag");
  }

  function mouseupped() {
    Object(d3_selection["select"])(d3_selection["event"].view).on("mousemove.drag mouseup.drag", null);
    yesdrag(d3_selection["event"].view, mousemoving);
    noevent();
    gestures.mouse("end");
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = d3_selection["event"].changedTouches,
        c = container.apply(this, arguments),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches[i].identifier, c, d3_selection["touch"], this, arguments)) {
        nopropagation();
        gesture("start");
      }
    }
  }

  function touchmoved() {
    var touches = d3_selection["event"].changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent();
        gesture("drag");
      }
    }
  }

  function touchended() {
    var touches = d3_selection["event"].changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation();
        gesture("end");
      }
    }
  }

  function beforestart(id, container, point, that, args) {
    var p = point(container, id), s, dx, dy,
        sublisteners = listeners.copy();

    if (!Object(d3_selection["customEvent"])(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((d3_selection["event"].subject = s = subject.apply(that, args)) == null) return false;
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
      Object(d3_selection["customEvent"])(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
});

// CONCATENATED MODULE: ./node_modules/d3-drag/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "drag", function() { return src_drag; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "dragDisable", function() { return nodrag; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "dragEnable", function() { return yesdrag; });




/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-dispatch/index.js + 1 modules
var d3_dispatch = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/d3-drag/index.js + 5 modules
var d3_drag = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/d3-interpolate/index.js + 21 modules
var d3_interpolate = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/d3-selection/index.js + 49 modules
var d3_selection = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/d3-transition/index.js + 29 modules
var d3_transition = __webpack_require__(66);

// CONCATENATED MODULE: ./node_modules/d3-brush/src/constant.js
/* harmony default export */ var constant = (function(x) {
  return function() {
    return x;
  };
});

// CONCATENATED MODULE: ./node_modules/d3-brush/src/event.js
/* harmony default export */ var src_event = (function(target, type, selection) {
  this.target = target;
  this.type = type;
  this.selection = selection;
});

// CONCATENATED MODULE: ./node_modules/d3-brush/src/noevent.js


function nopropagation() {
  d3_selection["event"].stopImmediatePropagation();
}

/* harmony default export */ var noevent = (function() {
  d3_selection["event"].preventDefault();
  d3_selection["event"].stopImmediatePropagation();
});

// CONCATENATED MODULE: ./node_modules/d3-brush/src/brush.js









var MODE_DRAG = {name: "drag"},
    MODE_SPACE = {name: "space"},
    MODE_HANDLE = {name: "handle"},
    MODE_CENTER = {name: "center"};

var X = {
  name: "x",
  handles: ["e", "w"].map(brush_type),
  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
};

var Y = {
  name: "y",
  handles: ["n", "s"].map(brush_type),
  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
};

var XY = {
  name: "xy",
  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(brush_type),
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

function brush_type(t) {
  return {type: t};
}

// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !d3_selection["event"].button;
}

function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}

// Like d3.local, but with the name “__brush” rather than auto-generated.
function local(node) {
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
  return brush_brush(X);
}

function brushY() {
  return brush_brush(Y);
}

/* harmony default export */ var src_brush = (function() {
  return brush_brush(XY);
});

function brush_brush(dim) {
  var extent = defaultExtent,
      filter = defaultFilter,
      listeners = Object(d3_dispatch["dispatch"])(brush, "start", "brush", "end"),
      handleSize = 6,
      touchending;

  function brush(group) {
    var overlay = group
        .property("__brush", initialize)
      .selectAll(".overlay")
      .data([brush_type("overlay")]);

    overlay.enter().append("rect")
        .attr("class", "overlay")
        .attr("pointer-events", "all")
        .attr("cursor", cursors.overlay)
      .merge(overlay)
        .each(function() {
          var extent = local(this).extent;
          Object(d3_selection["select"])(this)
              .attr("x", extent[0][0])
              .attr("y", extent[0][1])
              .attr("width", extent[1][0] - extent[0][0])
              .attr("height", extent[1][1] - extent[0][1]);
        });

    group.selectAll(".selection")
      .data([brush_type("selection")])
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
                i = Object(d3_interpolate["interpolate"])(selection0, selection1);

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

            Object(d3_transition["interrupt"])(that);
            state.selection = selection1 == null || empty(selection1) ? null : selection1;
            redraw.call(that);
            emit.start().brush().end();
          });
    }
  };

  function redraw() {
    var group = Object(d3_selection["select"])(this),
        selection = local(this).selection;

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
      Object(d3_selection["customEvent"])(new src_event(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function started() {
    if (d3_selection["event"].touches) { if (d3_selection["event"].changedTouches.length < d3_selection["event"].touches.length) return noevent(); }
    else if (touchending) return;
    if (!filter.apply(this, arguments)) return;

    var that = this,
        type = d3_selection["event"].target.__data__.type,
        mode = (d3_selection["event"].metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (d3_selection["event"].altKey ? MODE_CENTER : MODE_HANDLE),
        signX = dim === Y ? null : signsX[type],
        signY = dim === X ? null : signsY[type],
        state = local(that),
        extent = state.extent,
        selection = state.selection,
        W = extent[0][0], w0, w1,
        N = extent[0][1], n0, n1,
        E = extent[1][0], e0, e1,
        S = extent[1][1], s0, s1,
        dx,
        dy,
        moving,
        shifting = signX && signY && d3_selection["event"].shiftKey,
        lockX,
        lockY,
        point0 = Object(d3_selection["mouse"])(that),
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

    var group = Object(d3_selection["select"])(that)
        .attr("pointer-events", "none");

    var overlay = group.selectAll(".overlay")
        .attr("cursor", cursors[type]);

    if (d3_selection["event"].touches) {
      group
          .on("touchmove.brush", moved, true)
          .on("touchend.brush touchcancel.brush", ended, true);
    } else {
      var view = Object(d3_selection["select"])(d3_selection["event"].view)
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)
          .on("mousemove.brush", moved, true)
          .on("mouseup.brush", ended, true);

      Object(d3_drag["dragDisable"])(d3_selection["event"].view);
    }

    nopropagation();
    Object(d3_transition["interrupt"])(that);
    redraw.call(that);
    emit.start();

    function moved() {
      var point1 = Object(d3_selection["mouse"])(that);
      if (shifting && !lockX && !lockY) {
        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
        else lockX = true;
      }
      point = point1;
      moving = true;
      noevent();
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
      nopropagation();
      if (d3_selection["event"].touches) {
        if (d3_selection["event"].touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
      } else {
        Object(d3_drag["dragEnable"])(d3_selection["event"].view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
      if (empty(selection)) state.selection = null, redraw.call(that);
      emit.end();
    }

    function keydowned() {
      switch (d3_selection["event"].keyCode) {
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
      noevent();
    }

    function keyupped() {
      switch (d3_selection["event"].keyCode) {
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
            if (d3_selection["event"].altKey) {
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
      noevent();
    }
  }

  function initialize() {
    var state = this.__brush || {selection: null};
    state.extent = extent.apply(this, arguments);
    state.dim = dim;
    return state;
  }

  brush.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
  };

  brush.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush) : filter;
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

// CONCATENATED MODULE: ./node_modules/d3-brush/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "brush", function() { return src_brush; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "brushX", function() { return brushX; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "brushY", function() { return brushY; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "brushSelection", function() { return brushSelection; });



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-time/index.js + 16 modules
var d3_time = __webpack_require__(68);

// CONCATENATED MODULE: ./node_modules/d3-time-format/src/locale.js


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

function formatLocale(locale) {
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
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
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
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
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
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
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
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? d3_time["utcMonday"].ceil(week) : Object(d3_time["utcMonday"])(week);
          week = d3_time["utcDay"].offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day = week.getDay();
          week = day > 4 || day === 0 ? d3_time["timeMonday"].ceil(week) : Object(d3_time["timeMonday"])(week);
          week = d3_time["timeDay"].offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
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

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

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

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
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
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
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

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
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
  return pad(1 + d3_time["timeDay"].count(Object(d3_time["timeYear"])(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
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

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(d3_time["timeSunday"].count(Object(d3_time["timeYear"])(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? Object(d3_time["timeThursday"])(d) : d3_time["timeThursday"].ceil(d);
  return pad(d3_time["timeThursday"].count(Object(d3_time["timeYear"])(d), d) + (Object(d3_time["timeYear"])(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(d3_time["timeMonday"].count(Object(d3_time["timeYear"])(d), d), p, 2);
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
  return pad(1 + d3_time["utcDay"].count(Object(d3_time["utcYear"])(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
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

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(d3_time["utcSunday"].count(Object(d3_time["utcYear"])(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? Object(d3_time["utcThursday"])(d) : d3_time["utcThursday"].ceil(d);
  return pad(d3_time["utcThursday"].count(Object(d3_time["utcYear"])(d), d) + (Object(d3_time["utcYear"])(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(d3_time["utcMonday"].count(Object(d3_time["utcYear"])(d), d), p, 2);
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

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

// CONCATENATED MODULE: ./node_modules/d3-time-format/src/defaultLocale.js


var defaultLocale_locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  defaultLocale_locale = formatLocale(definition);
  timeFormat = defaultLocale_locale.format;
  timeParse = defaultLocale_locale.parse;
  utcFormat = defaultLocale_locale.utcFormat;
  utcParse = defaultLocale_locale.utcParse;
  return defaultLocale_locale;
}

// CONCATENATED MODULE: ./node_modules/d3-time-format/src/isoFormat.js


var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : utcFormat(isoSpecifier);

/* harmony default export */ var isoFormat = (formatIso);

// CONCATENATED MODULE: ./node_modules/d3-time-format/src/isoParse.js



function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : utcParse(isoSpecifier);

/* harmony default export */ var isoParse = (parseIso);

// CONCATENATED MODULE: ./node_modules/d3-time-format/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeFormatDefaultLocale", function() { return defaultLocale; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeFormat", function() { return timeFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeParse", function() { return timeParse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcFormat", function() { return utcFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utcParse", function() { return utcParse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeFormatLocale", function() { return formatLocale; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isoFormat", function() { return isoFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isoParse", function() { return isoParse; });






/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-dsv/src/dsv.js
var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

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

/* harmony default export */ var dsv = (function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
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
        : reFormat.test(text += "") ? "\"" + text.replace(/"/g, "\"\"") + "\""
        : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
});

// CONCATENATED MODULE: ./node_modules/d3-dsv/src/csv.js


var csv = dsv(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatRows = csv.formatRows;

// CONCATENATED MODULE: ./node_modules/d3-dsv/src/tsv.js


var tsv = dsv("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatRows = tsv.formatRows;

// CONCATENATED MODULE: ./node_modules/d3-dsv/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "dsvFormat", function() { return dsv; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "csvParse", function() { return csvParse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return csvParseRows; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "csvFormat", function() { return csvFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return csvFormatRows; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tsvParse", function() { return tsvParse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return tsvParseRows; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return tsvFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return tsvFormatRows; });





/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/d3-dispatch/src/dispatch.js
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

/* harmony default export */ var src_dispatch = (dispatch);

// CONCATENATED MODULE: ./node_modules/d3-dispatch/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "dispatch", function() { return src_dispatch; });



/***/ })
/******/ ]);
});