/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/item-series
 * @requires highcharts
 *
 * Item series type for Highcharts
 *
 * (c) 2019 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/item-series", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/item-series"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ item_series_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Item/ItemPoint.js
/* *
 *
 *  (c) 2019-2025 Torstein Honsi
 *
 *  Item series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { series: { prototype: { pointClass: Point } }, seriesTypes: { pie: { prototype: { pointClass: PiePoint } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class ItemPoint extends PiePoint {
}
extend(ItemPoint.prototype, {
    haloPath: Point.prototype.haloPath
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Item_ItemPoint = (ItemPoint);

;// ./code/es-modules/Core/Series/SeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * General options for all series types.
 *
 * @optionparent plotOptions.series
 */
const seriesDefaults = {
    // Base series options
    /**
     * The SVG value used for the `stroke-linecap` and `stroke-linejoin`
     * of a line graph. Round means that lines are rounded in the ends and
     * bends.
     *
     * @type       {Highcharts.SeriesLinecapValue}
     * @default    round
     * @since      3.0.7
     * @apioption  plotOptions.line.linecap
     */
    /**
     * Pixel width of the graph line.
     *
     * @see In styled mode, the line stroke-width can be set with the
     *      `.highcharts-graph` class name.
     *
     * @sample {highcharts} highcharts/plotoptions/series-linewidth-general/
     *         On all series
     * @sample {highcharts} highcharts/plotoptions/series-linewidth-specific/
     *         On one single series
     *
     * @product highcharts highstock
     */
    lineWidth: 2,
    /**
     * For some series, there is a limit that shuts down animation
     * by default when the total number of points in the chart is too high.
     * For example, for a column chart and its derivatives, animation does
     * not run if there is more than 250 points totally. To disable this
     * cap, set `animationLimit` to `Infinity`. This option works if animation
     * is fired on individual points, not on a group of points like e.g. during
     * the initial animation.
     *
     * @sample {highcharts} highcharts/plotoptions/series-animationlimit/
     *         Animation limit on updating individual points
     *
     * @type      {number}
     * @apioption plotOptions.series.animationLimit
     */
    /**
     * Allow this series' points to be selected by clicking on the graphic
     * (columns, point markers, pie slices, map areas etc).
     *
     * The selected points can be handled by point select and unselect
     * events, or collectively by the [getSelectedPoints
     * ](/class-reference/Highcharts.Chart#getSelectedPoints) function.
     *
     * And alternative way of selecting points is through dragging.
     *
     * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-line/
     *         Line
     * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-column/
     *         Column
     * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-pie/
     *         Pie
     * @sample {highcharts} highcharts/chart/events-selection-points/
     *         Select a range of points through a drag selection
     * @sample {highmaps} maps/plotoptions/series-allowpointselect/
     *         Map area
     * @sample {highmaps} maps/plotoptions/mapbubble-allowpointselect/
     *         Map bubble
     *
     * @since 1.2.0
     *
     * @private
     */
    allowPointSelect: false,
    /**
     * When true, each point or column edge is rounded to its nearest pixel
     * in order to render sharp on screen. In some cases, when there are a
     * lot of densely packed columns, this leads to visible difference
     * in column widths or distance between columns. In these cases,
     * setting `crisp` to `false` may look better, even though each column
     * is rendered blurry.
     *
     * @sample {highcharts} highcharts/plotoptions/column-crisp-false/
     *         Crisp is false
     *
     * @since   5.0.10
     * @product highcharts highstock gantt
     *
     * @private
     */
    crisp: true,
    /**
     * If true, a checkbox is displayed next to the legend item to allow
     * selecting the series. The state of the checkbox is determined by
     * the `selected` option.
     *
     * @productdesc {highmaps}
     * Note that if a `colorAxis` is defined, the color axis is represented
     * in the legend, not the series.
     *
     * @sample {highcharts} highcharts/plotoptions/series-showcheckbox-true/
     *         Show select box
     *
     * @since 1.2.0
     *
     * @private
     */
    showCheckbox: false,
    /**
     * Enable or disable the initial animation when a series is displayed.
     * The animation can also be set as a configuration object. Please
     * note that this option only applies to the initial animation of the
     * series itself. For other animations, see [chart.animation](
     * #chart.animation) and the animation parameter under the API methods.
     * The following properties are supported:
     *
     * - `defer`: The animation delay time in milliseconds.
     *
     * - `duration`: The duration of the animation in milliseconds. (Defaults to
     *   `1000`)
     *
     * - `easing`: Can be a string reference to an easing function set on
     *   the `Math` object or a function. See the _Custom easing function_
     *   demo below. (Defaults to `easeInOutSine`)
     *
     * Due to poor performance, animation is disabled in old IE browsers
     * for several chart types.
     *
     * @sample {highcharts} highcharts/plotoptions/series-animation-disabled/
     *         Animation disabled
     * @sample {highcharts} highcharts/plotoptions/series-animation-slower/
     *         Slower animation
     * @sample {highcharts} highcharts/plotoptions/series-animation-easing/
     *         Custom easing function
     * @sample {highstock} stock/plotoptions/animation-slower/
     *         Slower animation
     * @sample {highstock} stock/plotoptions/animation-easing/
     *         Custom easing function
     * @sample {highmaps} maps/plotoptions/series-animation-true/
     *         Animation enabled on map series
     * @sample {highmaps} maps/plotoptions/mapbubble-animation-false/
     *         Disabled on mapbubble series
     *
     * @type    {boolean|Highcharts.AnimationOptionsObject}
     * @default {highcharts} true
     * @default {highstock} true
     * @default {highmaps} false
     *
     * @private
     */
    animation: {
        /** @ignore-option */
        duration: 1000
    },
    /**
     * An additional class name to apply to the series' graphical elements.
     * This option does not replace default class names of the graphical
     * element. Changes to the series' color will also be reflected in a
     * chart's legend and tooltip.
     *
     * @sample {highcharts} highcharts/css/point-series-classname
     *         Series and point class name
     *
     * @type      {string}
     * @since     5.0.0
     * @apioption plotOptions.series.className
     */
    /**
     * Disable this option to allow series rendering in the whole plotting
     * area.
     *
     * **Note:** Clipping should be always enabled when
     * [chart.zoomType](#chart.zoomType) is set
     *
     * @sample {highcharts} highcharts/plotoptions/series-clip/
     *         Disabled clipping
     *
     * @default   true
     * @type      {boolean}
     * @since     3.0.0
     * @apioption plotOptions.series.clip
     */
    /**
     * The main color of the series. In line type series it applies to the
     * line and the point markers unless otherwise specified. In bar type
     * series it applies to the bars unless a color is specified per point.
     * The default value is pulled from the `options.colors` array.
     *
     * In styled mode, the color can be defined by the
     * [colorIndex](#plotOptions.series.colorIndex) option. Also, the series
     * color can be set with the `.highcharts-series`,
     * `.highcharts-color-{n}`, `.highcharts-{type}-series` or
     * `.highcharts-series-{n}` class, or individual classes given by the
     * `className` option.
     *
     * @productdesc {highmaps}
     * In maps, the series color is rarely used, as most choropleth maps use
     * the color to denote the value of each point. The series color can
     * however be used in a map with multiple series holding categorized
     * data.
     *
     * @sample {highcharts} highcharts/plotoptions/series-color-general/
     *         General plot option
     * @sample {highcharts} highcharts/plotoptions/series-color-specific/
     *         One specific series
     * @sample {highcharts} highcharts/plotoptions/series-color-area/
     *         Area color
     * @sample {highcharts} highcharts/series/infographic/
     *         Pattern fill
     * @sample {highmaps} maps/demo/category-map/
     *         Category map by multiple series
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @apioption plotOptions.series.color
     */
    /**
     * Styled mode only. A specific color index to use for the series, so its
     * graphic representations are given the class name `highcharts-color-{n}`.
     *
     * Since v11, CSS variables on the form `--highcharts-color-{n}` make
     * changing the color scheme very convenient.
     *
     * @sample    {highcharts} highcharts/css/colorindex/ Series and point color
     *            index
     *
     * @type      {number}
     * @since     5.0.0
     * @apioption plotOptions.series.colorIndex
     */
    /**
     * Whether to connect a graph line across null points, or render a gap
     * between the two points on either side of the null.
     *
     * In stacked area chart, if `connectNulls` is set to true,
     * null points are interpreted as 0.
     *
     * @sample {highcharts} highcharts/plotoptions/series-connectnulls-false/
     *         False by default
     * @sample {highcharts} highcharts/plotoptions/series-connectnulls-true/
     *         True
     *
     * @type      {boolean}
     * @default   false
     * @product   highcharts highstock
     * @apioption plotOptions.series.connectNulls
     */
    /**
     * You can set the cursor to "pointer" if you have click events attached
     * to the series, to signal to the user that the points and lines can
     * be clicked.
     *
     * In styled mode, the series cursor can be set with the same classes
     * as listed under [series.color](#plotOptions.series.color).
     *
     * @sample {highcharts} highcharts/plotoptions/series-cursor-line/
     *         On line graph
     * @sample {highcharts} highcharts/plotoptions/series-cursor-column/
     *         On columns
     * @sample {highcharts} highcharts/plotoptions/series-cursor-scatter/
     *         On scatter markers
     * @sample {highstock} stock/plotoptions/cursor/
     *         Pointer on a line graph
     * @sample {highmaps} maps/plotoptions/series-allowpointselect/
     *         Map area
     * @sample {highmaps} maps/plotoptions/mapbubble-allowpointselect/
     *         Map bubble
     *
     * @type      {string|Highcharts.CursorValue}
     * @apioption plotOptions.series.cursor
     */
    /**
     * A reserved subspace to store options and values for customized
     * functionality. Here you can add additional data for your own event
     * callbacks and formatter callbacks.
     *
     * @sample {highcharts} highcharts/point/custom/
     *         Point and series with custom data
     *
     * @type      {Highcharts.Dictionary<*>}
     * @apioption plotOptions.series.custom
     */
    /**
     * Name of the dash style to use for the graph, or for some series types
     * the outline of each shape.
     *
     * In styled mode, the
     * [stroke dash-array](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/css/series-dashstyle/)
     * can be set with the same classes as listed under
     * [series.color](#plotOptions.series.color).
     *
     * @sample {highcharts} highcharts/plotoptions/series-dashstyle-all/
     *         Possible values demonstrated
     * @sample {highcharts} highcharts/plotoptions/series-dashstyle/
     *         Chart suitable for printing in black and white
     * @sample {highstock} highcharts/plotoptions/series-dashstyle-all/
     *         Possible values demonstrated
     * @sample {highmaps} highcharts/plotoptions/series-dashstyle-all/
     *         Possible values demonstrated
     * @sample {highmaps} maps/plotoptions/series-dashstyle/
     *         Dotted borders on a map
     *
     * @type      {Highcharts.DashStyleValue}
     * @default   Solid
     * @since     2.1
     * @apioption plotOptions.series.dashStyle
     */
    /**
     * A description of the series to add to the screen reader information
     * about the series.
     *
     * @type      {string}
     * @since     5.0.0
     * @requires  modules/accessibility
     * @apioption plotOptions.series.description
     */
    /**
     * Options for the series data sorting.
     *
     * @type      {Highcharts.DataSortingOptionsObject}
     * @since     8.0.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.dataSorting
     */
    /**
     * Enable or disable data sorting for the series. Use [xAxis.reversed](
     * #xAxis.reversed) to change the sorting order.
     *
     * @sample {highcharts} highcharts/datasorting/animation/
     *         Data sorting in scatter-3d
     * @sample {highcharts} highcharts/datasorting/labels-animation/
     *         Axis labels animation
     * @sample {highcharts} highcharts/datasorting/dependent-sorting/
     *         Dependent series sorting
     * @sample {highcharts} highcharts/datasorting/independent-sorting/
     *         Independent series sorting
     *
     * @type      {boolean}
     * @since     8.0.0
     * @apioption plotOptions.series.dataSorting.enabled
     */
    /**
     * Whether to allow matching points by name in an update. If this option
     * is disabled, points will be matched by order.
     *
     * @sample {highcharts} highcharts/datasorting/match-by-name/
     *         Enabled match by name
     *
     * @type      {boolean}
     * @since     8.0.0
     * @apioption plotOptions.series.dataSorting.matchByName
     */
    /**
     * Determines what data value should be used to sort by.
     *
     * @sample {highcharts} highcharts/datasorting/sort-key/
     *         Sort key as `z` value
     *
     * @type      {string}
     * @since     8.0.0
     * @default   y
     * @apioption plotOptions.series.dataSorting.sortKey
     */
    /**
     * Enable or disable the mouse tracking for a specific series. This
     * includes point tooltips and click events on graphs and points. For
     * large datasets it improves performance.
     *
     * @sample {highcharts} highcharts/plotoptions/series-enablemousetracking-false/
     *         No mouse tracking
     * @sample {highmaps} maps/plotoptions/series-enablemousetracking-false/
     *         No mouse tracking
     *
     * @type      {boolean}
     * @default   true
     * @apioption plotOptions.series.enableMouseTracking
     */
    enableMouseTracking: true,
    /**
     * Whether to use the Y extremes of the total chart width or only the
     * zoomed area when zooming in on parts of the X axis. By default, the
     * Y axis adjusts to the min and max of the visible data. Cartesian
     * series only.
     *
     * @type      {boolean}
     * @default   false
     * @since     4.1.6
     * @product   highcharts highstock gantt
     * @apioption plotOptions.series.getExtremesFromAll
     */
    /**
     * Highlight only the hovered point and fade the remaining points.
     *
     * Scatter-type series require enabling the 'inactive' marker state and
     * adjusting opacity. Note that this approach could affect performance
     * with large datasets.
     *
     * @sample {highcharts} highcharts/plotoptions/series-inactiveotherpoints-enabled/
     *         Chart with inactiveOtherPoints option enabled.
     *
     * @type      {boolean}
     * @default   false
     * @apioption plotOptions.series.inactiveOtherPoints
     */
    /**
     * An array specifying which option maps to which key in the data point
     * array. This makes it convenient to work with unstructured data arrays
     * from different sources.
     *
     * @see [series.data](#series.line.data)
     *
     * @sample {highcharts|highstock} highcharts/series/data-keys/
     *         An extended data array with keys
     * @sample {highcharts|highstock} highcharts/series/data-nested-keys/
     *         Nested keys used to access object properties
     *
     * @type      {Array<string>}
     * @since     4.1.6
     * @apioption plotOptions.series.keys
     */
    /**
     * The line cap used for line ends and line joins on the graph.
     *
     * @sample highcharts/series-line/linecap/
     *         Line cap comparison
     *
     * @type       {Highcharts.SeriesLinecapValue}
     * @default    round
     * @product    highcharts highstock
     * @apioption  plotOptions.series.linecap
     */
    /**
     * The [id](#series.id) of another series to link to. Additionally,
     * the value can be ":previous" to link to the previous series. When
     * two series are linked, only the first one appears in the legend.
     * Toggling the visibility of this also toggles the linked series.
     *
     * If master series uses data sorting and linked series does not have
     * its own sorting definition, the linked series will be sorted in the
     * same order as the master one.
     *
     * @sample {highcharts|highstock} highcharts/demo/arearange-line/
     *         Linked series
     *
     * @type      {string}
     * @since     3.0
     * @product   highcharts highstock gantt
     * @apioption plotOptions.series.linkedTo
     */
    /**
     * Options for the corresponding navigator series if `showInNavigator`
     * is `true` for this series. Available options are the same as any
     * series, documented at [plotOptions](#plotOptions.series) and
     * [series](#series).
     *
     * These options are merged with options in [navigator.series](
     * #navigator.series), and will take precedence if the same option is
     * defined both places.
     *
     * @see [navigator.series](#navigator.series)
     *
     * @type      {Highcharts.PlotSeriesOptions}
     * @since     5.0.0
     * @product   highstock
     * @apioption plotOptions.series.navigatorOptions
     */
    /**
     * The color for the parts of the graph or points that are below the
     * [threshold](#plotOptions.series.threshold). Note that `zones` takes
     * precedence over the negative color. Using `negativeColor` is
     * equivalent to applying a zone with value of 0.
     *
     * @see In styled mode, a negative color is applied by setting this option
     *      to `true` combined with the `.highcharts-negative` class name.
     *
     * @sample {highcharts} highcharts/plotoptions/series-negative-color/
     *         Spline, area and column
     * @sample {highcharts} highcharts/plotoptions/arearange-negativecolor/
     *         Arearange
     * @sample {highcharts} highcharts/css/series-negative-color/
     *         Styled mode
     * @sample {highstock} highcharts/plotoptions/series-negative-color/
     *         Spline, area and column
     * @sample {highstock} highcharts/plotoptions/arearange-negativecolor/
     *         Arearange
     * @sample {highmaps} highcharts/plotoptions/series-negative-color/
     *         Spline, area and column
     * @sample {highmaps} highcharts/plotoptions/arearange-negativecolor/
     *         Arearange
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     3.0
     * @apioption plotOptions.series.negativeColor
     */
    /**
     * Whether or not data-points with the value of `null` should be interactive.
     * When this is set to `true`, tooltips may highlight these points, and this
     * option also enables keyboard navigation for such points. Format options
     * for such points include [`nullFormat`](#tooltip.nullFormat) and [`nullFormater`](#tooltip.nullFormatter).
     * Works for these series: `line`, `spline`, `area`, `area-spline`,
     * `column`, `bar`, and* `timeline`.
     *
     * @sample {highcharts} highcharts/series/null-interaction/
     *         Chart with interactive `null` points
     *
     * @sample {highcharts} highcharts/series-timeline/null-interaction/
     *         Timeline series with `null` points
     *
     * @type      {boolean|undefined}
     * @product   highcharts highstock
     * @apioption plotOptions.series.nullInteraction
     */
    /**
     * Same as
     * [accessibility.point.descriptionFormat](#accessibility.point.descriptionFormat),
     * but for an individual series. Overrides the chart wide configuration.
     *
     * @type      {Function}
     * @since 11.1.0
     * @apioption plotOptions.series.pointDescriptionFormat
     */
    /**
     * Same as
     * [accessibility.series.descriptionFormatter](#accessibility.series.descriptionFormatter),
     * but for an individual series. Overrides the chart wide configuration.
     *
     * @type      {Function}
     * @since     5.0.12
     * @apioption plotOptions.series.pointDescriptionFormatter
     */
    /**
     * If no x values are given for the points in a series, `pointInterval`
     * defines the interval of the x values. For example, if a series
     * contains one value every decade starting from year 0, set
     * `pointInterval` to `10`. In true `datetime` axes, the `pointInterval`
     * is set in milliseconds.
     *
     * It can be also be combined with `pointIntervalUnit` to draw irregular
     * time intervals.
     *
     * If combined with `relativeXValue`, an x value can be set on each
     * point, and the `pointInterval` is added x times to the `pointStart`
     * setting.
     *
     * Please note that this options applies to the _series data_, not the
     * interval of the axis ticks, which is independent.
     *
     * @sample {highcharts} highcharts/plotoptions/series-pointstart-datetime/
     *         Datetime X axis
     * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
     *         Relative x value
     * @sample {highstock} stock/plotoptions/pointinterval-pointstart/
     *         Using pointStart and pointInterval
     * @sample {highstock} stock/plotoptions/relativexvalue/
     *         Relative x value
     *
     * @type      {number}
     * @default   1
     * @product   highcharts highstock gantt
     * @apioption plotOptions.series.pointInterval
     */
    /**
     * On datetime series, this allows for setting the
     * [pointInterval](#plotOptions.series.pointInterval) to irregular time
     * units, `day`, `month` and `year`. A day is usually the same as 24
     * hours, but `pointIntervalUnit` also takes the DST crossover into
     * consideration when dealing with local time. Combine this option with
     * `pointInterval` to draw weeks, quarters, 6 months, 10 years etc.
     *
     * Please note that this options applies to the _series data_, not the
     * interval of the axis ticks, which is independent.
     *
     * @sample {highcharts} highcharts/plotoptions/series-pointintervalunit/
     *         One point a month
     * @sample {highstock} highcharts/plotoptions/series-pointintervalunit/
     *         One point a month
     *
     * @type       {string}
     * @since      4.1.0
     * @product    highcharts highstock gantt
     * @validvalue ["day", "month", "year"]
     * @apioption  plotOptions.series.pointIntervalUnit
     */
    /**
     * Possible values: `"on"`, `"between"`, `number`.
     *
     * In a column chart, when pointPlacement is `"on"`, the point will not
     * create any padding of the X axis. In a polar column chart this means
     * that the first column points directly north. If the pointPlacement is
     * `"between"`, the columns will be laid out between ticks. This is
     * useful for example for visualising an amount between two points in
     * time or in a certain sector of a polar chart.
     *
     * Since Highcharts 3.0.2, the point placement can also be numeric,
     * where 0 is on the axis value, -0.5 is between this value and the
     * previous, and 0.5 is between this value and the next. Unlike the
     * textual options, numeric point placement options won't affect axis
     * padding.
     *
     * Note that pointPlacement needs a [pointRange](
     * #plotOptions.series.pointRange) to work. For column series this is
     * computed, but for line-type series it needs to be set.
     *
     * For the `xrange` series type and gantt charts, if the Y axis is a
     * category axis, the `pointPlacement` applies to the Y axis rather than
     * the (typically datetime) X axis.
     *
     * Defaults to `undefined` in cartesian charts, `"between"` in polar
     * charts.
     *
     * @see [xAxis.tickmarkPlacement](#xAxis.tickmarkPlacement)
     *
     * @sample {highcharts|highstock} highcharts/plotoptions/series-pointplacement-between/
     *         Between in a column chart
     * @sample {highcharts|highstock} highcharts/plotoptions/series-pointplacement-numeric/
     *         Numeric placement for custom layout
     * @sample {highcharts|highstock} maps/plotoptions/heatmap-pointplacement/
     *         Placement in heatmap
     *
     * @type      {string|number}
     * @since     2.3.0
     * @product   highcharts highstock gantt
     * @apioption plotOptions.series.pointPlacement
     */
    /**
     * If no x values are given for the points in a series, `pointStart`
     * defines on what value to start. For example, if a series contains one
     * yearly value starting from 1945, set `pointStart` to 1945.
     *
     * The `pointStart` setting can be a number, or a datetime string that is
     * parsed according to the `time.timezone` setting.
     *
     * If combined with `relativeXValue`, an x value can be set on each
     * point. The x value from the point options is multiplied by
     * `pointInterval` and added to `pointStart` to produce a modified x
     * value.
     *
     * @sample {highcharts} highcharts/plotoptions/series-pointstart-linear/
     *         Linear
     * @sample {highcharts} highcharts/plotoptions/series-pointstart-datetime/
     *         Datetime
     * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
     *         Relative x value
     * @sample {highstock} stock/plotoptions/pointinterval-pointstart/
     *         Using pointStart and pointInterval
     * @sample {highstock} stock/plotoptions/relativexvalue/
     *         Relative x value
     *
     * @type      {number|string}
     * @default   0
     * @product   highcharts highstock gantt
     * @apioption plotOptions.series.pointStart
     */
    /**
     * When true, X values in the data set are relative to the current
     * `pointStart`, `pointInterval` and `pointIntervalUnit` settings. This
     * allows compression of the data for datasets with irregular X values.
     *
     * The real X values are computed on the formula `f(x) = ax + b`, where
     * `a` is the `pointInterval` (optionally with a time unit given by
     * `pointIntervalUnit`), and `b` is the `pointStart`.
     *
     * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
     *         Relative X value
     * @sample {highstock} stock/plotoptions/relativexvalue/
     *         Relative X value
     *
     * @type      {boolean}
     * @default   false
     * @product   highcharts highstock
     * @apioption plotOptions.series.relativeXValue
     */
    /**
     * Whether to select the series initially. If `showCheckbox` is true,
     * the checkbox next to the series name in the legend will be checked
     * for a selected series.
     *
     * @sample {highcharts} highcharts/plotoptions/series-selected/
     *         One out of two series selected
     *
     * @type      {boolean}
     * @default   false
     * @since     1.2.0
     * @apioption plotOptions.series.selected
     */
    /**
     * Whether to apply a drop shadow to the graph line. Since 2.3 the
     * shadow can be an object configuration containing `color`, `offsetX`,
     * `offsetY`, `opacity` and `width`.
     *
     * Note that in some cases, like stacked columns or other dense layouts, the
     * series may cast shadows on each other. In that case, the
     * `chart.seriesGroupShadow` allows applying a common drop shadow to the
     * whole series group.
     *
     * @sample {highcharts} highcharts/plotoptions/series-shadow/
     *         Shadow enabled
     *
     * @type      {boolean|Highcharts.ShadowOptionsObject}
     * @default   false
     * @apioption plotOptions.series.shadow
     */
    /**
     * Whether to display this particular series or series type in the
     * legend. Standalone series are shown in legend by default, and linked
     * series are not. Since v7.2.0 it is possible to show series that use
     * colorAxis by setting this option to `true`.
     *
     * @sample {highcharts} highcharts/plotoptions/series-showinlegend/
     *         One series in the legend, one hidden
     *
     * @type      {boolean}
     * @apioption plotOptions.series.showInLegend
     */
    /**
     * Whether or not to show the series in the navigator. Takes precedence
     * over [navigator.baseSeries](#navigator.baseSeries) if defined.
     *
     * @type      {boolean}
     * @since     5.0.0
     * @product   highstock
     * @apioption plotOptions.series.showInNavigator
     */
    /**
     * If set to `true`, the accessibility module will skip past the points
     * in this series for keyboard navigation.
     *
     * @type      {boolean}
     * @since     5.0.12
     * @apioption plotOptions.series.skipKeyboardNavigation
     */
    /**
     * Whether to stack the values of each series on top of each other.
     * Possible values are `undefined` to disable, `"normal"` to stack by
     * value or `"percent"`.
     *
     * When stacking is enabled, data must be sorted
     * in ascending X order.
     *
     * Some stacking options are related to specific series types. In the
     * streamgraph series type, the stacking option is set to `"stream"`.
     * The second one is `"overlap"`, which only applies to waterfall
     * series.
     *
     * @see [yAxis.reversedStacks](#yAxis.reversedStacks)
     *
     * @sample {highcharts} highcharts/plotoptions/series-stacking-line/
     *         Line
     * @sample {highcharts} highcharts/plotoptions/series-stacking-column/
     *         Column
     * @sample {highcharts} highcharts/plotoptions/series-stacking-bar/
     *         Bar
     * @sample {highcharts} highcharts/plotoptions/series-stacking-area/
     *         Area
     * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-line/
     *         Line
     * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-column/
     *         Column
     * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-bar/
     *         Bar
     * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-area/
     *         Area
     * @sample {highcharts} highcharts/plotoptions/series-waterfall-with-normal-stacking
     *         Waterfall with normal stacking
     * @sample {highcharts} highcharts/plotoptions/series-waterfall-with-overlap-stacking
     *         Waterfall with overlap stacking
     * @sample {highstock} stock/plotoptions/stacking/
     *         Area
     *
     * @type       {string}
     * @product    highcharts highstock
     * @validvalue ["normal", "overlap", "percent", "stream"]
     * @apioption  plotOptions.series.stacking
     */
    /**
     * Whether to apply steps to the line. Possible values are `left`,
     * `center` and `right`.
     *
     * @sample {highcharts} highcharts/plotoptions/line-step/
     *         Different step line options
     * @sample {highcharts} highcharts/plotoptions/area-step/
     *         Stepped, stacked area
     * @sample {highstock} stock/plotoptions/line-step/
     *         Step line
     *
     * @type       {string}
     * @since      1.2.5
     * @product    highcharts highstock
     * @validvalue ["left", "center", "right"]
     * @apioption  plotOptions.series.step
     */
    /**
     * The threshold, also called zero level or base level. For line type
     * series this is only used in conjunction with
     * [negativeColor](#plotOptions.series.negativeColor).
     *
     * @see [softThreshold](#plotOptions.series.softThreshold).
     *
     * @type      {number|null}
     * @default   0
     * @since     3.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.threshold
     */
    /**
     * Set the initial visibility of the series.
     *
     * @sample {highcharts} highcharts/plotoptions/series-visible/
     *         Two series, one hidden and one visible
     * @sample {highstock} stock/plotoptions/series-visibility/
     *         Hidden series
     *
     * @type      {boolean}
     * @default   true
     * @apioption plotOptions.series.visible
     */
    /**
     * Defines the Axis on which the zones are applied.
     *
     * @see [zones](#plotOptions.series.zones)
     *
     * @sample {highcharts} highcharts/series/color-zones-zoneaxis-x/
     *         Zones on the X-Axis
     * @sample {highstock} highcharts/series/color-zones-zoneaxis-x/
     *         Zones on the X-Axis
     *
     * @type      {string}
     * @default   y
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zoneAxis
     */
    /**
     * General event handlers for the series items. These event hooks can
     * also be attached to the series at run time using the
     * `Highcharts.addEvent` function.
     *
     * @declare Highcharts.SeriesEventsOptionsObject
     *
     * @private
     */
    events: {},
    /**
     * Fires after the series has finished its initial animation, or in case
     * animation is disabled, immediately as the series is displayed.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-afteranimate/
     *         Show label after animate
     * @sample {highstock} highcharts/plotoptions/series-events-afteranimate/
     *         Show label after animate
     *
     * @type      {Highcharts.SeriesAfterAnimateCallbackFunction}
     * @since     4.0
     * @product   highcharts highstock gantt
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.afterAnimate
     */
    /**
     * Fires when the checkbox next to the series' name in the legend is
     * clicked. One parameter, `event`, is passed to the function. The state
     * of the checkbox is found by `event.checked`. The checked item is
     * found by `event.item`. Return `false` to prevent the default action
     * which is to toggle the select state of the series.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-checkboxclick/
     *         Alert checkbox status
     *
     * @type      {Highcharts.SeriesCheckboxClickCallbackFunction}
     * @since     1.2.0
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.checkboxClick
     */
    /**
     * Fires when the series is clicked. One parameter, `event`, is passed
     * to the function, containing common event information. Additionally,
     * `event.point` holds a pointer to the nearest point on the graph.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-click/
     *         Alert click info
     * @sample {highstock} stock/plotoptions/series-events-click/
     *         Alert click info
     * @sample {highmaps} maps/plotoptions/series-events-click/
     *         Display click info in subtitle
     *
     * @type      {Highcharts.SeriesClickCallbackFunction}
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.click
     */
    /**
     * Fires when the series is hidden after chart generation time, either
     * by clicking the legend item or by calling `.hide()`.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-hide/
     *         Alert when the series is hidden by clicking the legend item
     *
     * @type      {Highcharts.SeriesHideCallbackFunction}
     * @since     1.2.0
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.hide
     */
    /**
     * Fires when the legend item belonging to the series is clicked. One
     * parameter, `event`, is passed to the function. The default action
     * is to toggle the visibility of the series. This can be prevented
     * by returning `false` or calling `event.preventDefault()`.
     *
     * **Note:** This option is deprecated in favor of
     * [legend.events.itemClick](#legend.events.itemClick).
     *
     * @type       {Highcharts.SeriesLegendItemClickCallbackFunction}
     * @deprecated 11.4.4
     * @context    Highcharts.Series
     * @apioption  plotOptions.series.events.legendItemClick
     */
    /**
     * Fires when the mouse leaves the graph. One parameter, `event`, is
     * passed to the function, containing common event information. If the
     * [stickyTracking](#plotOptions.series) option is true, `mouseOut`
     * doesn't happen before the mouse enters another graph or leaves the
     * plot area.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-sticky/
     *         With sticky tracking by default
     * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-no-sticky/
     *         Without sticky tracking
     *
     * @type      {Highcharts.SeriesMouseOutCallbackFunction}
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.mouseOut
     */
    /**
     * Fires when the mouse enters the graph. One parameter, `event`, is
     * passed to the function, containing common event information.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-sticky/
     *         With sticky tracking by default
     * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-no-sticky/
     *         Without sticky tracking
     *
     * @type      {Highcharts.SeriesMouseOverCallbackFunction}
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.mouseOver
     */
    /**
     * Fires when the series is shown after chart generation time, either
     * by clicking the legend item or by calling `.show()`.
     *
     * @sample {highcharts} highcharts/plotoptions/series-events-show/
     *         Alert when the series is shown by clicking the legend item.
     *
     * @type      {Highcharts.SeriesShowCallbackFunction}
     * @since     1.2.0
     * @context   Highcharts.Series
     * @apioption plotOptions.series.events.show
     */
    /**
     * Options for the point markers of line and scatter-like series. Properties
     * like `fillColor`, `lineColor` and `lineWidth` define the visual
     * appearance of the markers. The `symbol` option defines the shape. Other
     * series types, like column series, don't have markers, but have visual
     * options on the series level instead.
     *
     * In styled mode, the markers can be styled with the `.highcharts-point`,
     * `.highcharts-point-hover` and `.highcharts-point-select` class names.
     *
     * @declare Highcharts.PointMarkerOptionsObject
     *
     * @sample {highmaps} maps/demo/mappoint-mapmarker
     *         Using the mapmarker symbol for points
     *
     * @private
     */
    marker: {
        /**
         * Enable or disable the point marker. If `undefined`, the markers
         * are hidden when the data is dense, and shown for more widespread
         * data points.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-enabled/
         *         Disabled markers
         * @sample {highcharts} highcharts/plotoptions/series-marker-enabled-false/
         *         Disabled in normal state but enabled on hover
         * @sample {highstock} stock/plotoptions/series-marker/
         *         Enabled markers
         *
         * @type      {boolean}
         * @default   {highcharts} undefined
         * @default   {highstock} false
         * @apioption plotOptions.series.marker.enabled
         */
        /**
         * The threshold for how dense the point markers should be before
         * they are hidden, given that `enabled` is not defined. The number
         * indicates the horizontal distance between the two closest points
         * in the series, as multiples of the `marker.radius`. In other
         * words, the default value of 2 means points are hidden if
         * overlapping horizontally.
         *
         * @sample highcharts/plotoptions/series-marker-enabledthreshold
         *         A higher threshold
         *
         * @since 6.0.5
         */
        enabledThreshold: 2,
        /**
         * The fill color of the point marker. When `undefined`, the series'
         * or point's color is used.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
         *         White fill
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @apioption plotOptions.series.marker.fillColor
         */
        /**
         * Image markers only. Set the image width explicitly. When using
         * this option, a `width` must also be set.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-width-height/
         *         Fixed width and height
         * @sample {highstock} highcharts/plotoptions/series-marker-width-height/
         *         Fixed width and height
         *
         * @type      {number}
         * @since     4.0.4
         * @apioption plotOptions.series.marker.height
         */
        /**
         * The color of the point marker's outline. When `undefined`, the
         * series' or point's color is used.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
         *         Inherit from series color (undefined)
         *
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        lineColor: "#ffffff" /* Palette.backgroundColor */,
        /**
         * The width of the point marker's outline.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
         *         2px blue marker
         */
        lineWidth: 0,
        /**
         * The radius of the point marker.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-radius/
         *         Bigger markers
         *
         * @default {highstock} 2
         * @default {highcharts} 4
         *
         */
        radius: 4,
        /**
         * A predefined shape or symbol for the marker. When undefined, the
         * symbol is pulled from options.symbols. Other possible values are
         * `'circle'`, `'square'`,`'diamond'`, `'triangle'` and
         * `'triangle-down'`.
         *
         * Additionally, the URL to a graphic can be given on this form:
         * `'url(graphic.png)'`. Note that for the image to be applied to
         * exported charts, its URL needs to be accessible by the export
         * server.
         *
         * Custom callbacks for symbol path generation can also be added to
         * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
         * used by its method name, as shown in the demo.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-symbol/
         *         Predefined, graphic and custom markers
         * @sample {highstock} highcharts/plotoptions/series-marker-symbol/
         *         Predefined, graphic and custom markers
         * @sample {highmaps} maps/demo/mappoint-mapmarker
         *         Using the mapmarker symbol for points
         *
         * @type      {string}
         * @apioption plotOptions.series.marker.symbol
         */
        /**
         * Image markers only. Set the image width explicitly. When using
         * this option, a `height` must also be set.
         *
         * @sample {highcharts} highcharts/plotoptions/series-marker-width-height/
         *         Fixed width and height
         * @sample {highstock} highcharts/plotoptions/series-marker-width-height/
         *         Fixed width and height
         *
         * @type      {number}
         * @since     4.0.4
         * @apioption plotOptions.series.marker.width
         */
        /**
         * States for a single point marker.
         *
         * @declare Highcharts.PointStatesOptionsObject
         */
        states: {
            /**
             * The normal state of a single point marker. Currently only
             * used for setting animation when returning to normal state
             * from hover.
             *
             * @declare Highcharts.PointStatesNormalOptionsObject
             */
            normal: {
                /**
                 * Animation when returning to normal state after hovering.
                 *
                 * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                 */
                animation: true
            },
            /**
             * The hover state for a single point marker.
             *
             * @declare Highcharts.PointStatesHoverOptionsObject
             */
            hover: {
                /**
                 * Animation when hovering over the marker.
                 *
                 * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                 */
                animation: {
                    /** @internal */
                    duration: 150
                },
                /**
                 * Enable or disable the point marker.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-enabled/
                 *         Disabled hover state
                 */
                enabled: true,
                /**
                 * The fill color of the marker in hover state. When
                 * `undefined`, the series' or point's fillColor for normal
                 * state is used.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.series.marker.states.hover.fillColor
                 */
                /**
                 * The color of the point marker's outline. When
                 * `undefined`, the series' or point's lineColor for normal
                 * state is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-linecolor/
                 *         White fill color, black line color
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.series.marker.states.hover.lineColor
                 */
                /**
                 * The width of the point marker's outline. When
                 * `undefined`, the series' or point's lineWidth for normal
                 * state is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-linewidth/
                 *         3px line width
                 *
                 * @type      {number}
                 * @apioption plotOptions.series.marker.states.hover.lineWidth
                 */
                /**
                 * The radius of the point marker. In hover state, it
                 * defaults to the normal state's radius + 2 as per the
                 * [radiusPlus](#plotOptions.series.marker.states.hover.radiusPlus)
                 * option.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-radius/
                 *         10px radius
                 *
                 * @type      {number}
                 * @apioption plotOptions.series.marker.states.hover.radius
                 */
                /**
                 * The number of pixels to increase the radius of the
                 * hovered point.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
                 *         5 pixels greater radius on hover
                 * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
                 *         5 pixels greater radius on hover
                 *
                 * @since 4.0.3
                 */
                radiusPlus: 2,
                /**
                 * The additional line width for a hovered point.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
                 *         2 pixels wider on hover
                 * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
                 *         2 pixels wider on hover
                 *
                 * @since 4.0.3
                 */
                lineWidthPlus: 1
            },
            /**
             * The appearance of the point marker when selected. In order to
             * allow a point to be selected, set the
             * `series.allowPointSelect` option to true.
             *
             * @declare Highcharts.PointStatesSelectOptionsObject
             */
            select: {
                /**
                 * Enable or disable visible feedback for selection.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-enabled/
                 *         Disabled select state
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption plotOptions.series.marker.states.select.enabled
                 */
                /**
                 * The radius of the point marker. In hover state, it
                 * defaults to the normal state's radius + 2.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-radius/
                 *         10px radius for selected points
                 *
                 * @type      {number}
                 * @apioption plotOptions.series.marker.states.select.radius
                 */
                /**
                 * The fill color of the point marker.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-fillcolor/
                 *         Solid red discs for selected points
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                fillColor: "#cccccc" /* Palette.neutralColor20 */,
                /**
                 * The color of the point marker's outline. When
                 * `undefined`, the series' or point's color is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-linecolor/
                 *         Red line color for selected points
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                lineColor: "#000000" /* Palette.neutralColor100 */,
                /**
                 * The width of the point marker's outline.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-linewidth/
                 *         3px line width for selected points
                 */
                lineWidth: 2
            }
        }
    },
    /**
     * Properties for each single point.
     *
     * @declare Highcharts.PlotSeriesPointOptions
     *
     * @private
     */
    point: {
        /**
         * Fires when a point is clicked. One parameter, `event`, is passed
         * to the function, containing common event information.
         *
         * If the `series.allowPointSelect` option is true, the default
         * action for the point's click event is to toggle the point's
         * select state. Returning `false` cancels this action.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-click/
         *         Click marker to alert values
         * @sample {highcharts} highcharts/plotoptions/series-point-events-click-column/
         *         Click column
         * @sample {highcharts} highcharts/plotoptions/series-point-events-click-url/
         *         Go to URL
         * @sample {highmaps} maps/plotoptions/series-point-events-click/
         *         Click marker to display values
         * @sample {highmaps} maps/plotoptions/series-point-events-click-url/
         *         Go to URL
         *
         * @type      {Highcharts.PointClickCallbackFunction}
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.click
         */
        /**
         * Fires when the mouse leaves the area close to the point. One
         * parameter, `event`, is passed to the function, containing common
         * event information.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
         *         Show values in the chart's corner on mouse over
         *
         * @type      {Highcharts.PointMouseOutCallbackFunction}
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.mouseOut
         */
        /**
         * Fires when the mouse enters the area close to the point. One
         * parameter, `event`, is passed to the function, containing common
         * event information.
         *
         * Returning `false` cancels the default behavior, which is to show a
         * tooltip for the point.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
         *         Show values in the chart's corner on mouse over
         *
         * @type      {Highcharts.PointMouseOverCallbackFunction}
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.mouseOver
         */
        /**
         * Fires when the point is removed using the `.remove()` method. One
         * parameter, `event`, is passed to the function. Returning `false`
         * cancels the operation.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-remove/
         *         Remove point and confirm
         *
         * @type      {Highcharts.PointRemoveCallbackFunction}
         * @since     1.2.0
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.remove
         */
        /**
         * Fires when the point is selected either programmatically or
         * following a click on the point. One parameter, `event`, is passed
         * to the function. Returning `false` cancels the operation.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-select/
         *         Report the last selected point
         * @sample {highmaps} maps/plotoptions/series-allowpointselect/
         *         Report select and unselect
         *
         * @type      {Highcharts.PointSelectCallbackFunction}
         * @since     1.2.0
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.select
         */
        /**
         * Fires when the point is unselected either programmatically or
         * following a click on the point. One parameter, `event`, is passed
         * to the function.
         *  Returning `false` cancels the operation.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-unselect/
         *         Report the last unselected point
         * @sample {highmaps} maps/plotoptions/series-allowpointselect/
         *         Report select and unselect
         *
         * @type      {Highcharts.PointUnselectCallbackFunction}
         * @since     1.2.0
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.unselect
         */
        /**
         * Fires when the point is updated programmatically through the
         * `.update()` method. One parameter, `event`, is passed to the
         * function. The new point options can be accessed through
         * `event.options`. Returning `false` cancels the operation.
         *
         * @sample {highcharts} highcharts/plotoptions/series-point-events-update/
         *         Confirm point updating
         *
         * @type      {Highcharts.PointUpdateCallbackFunction}
         * @since     1.2.0
         * @context   Highcharts.Point
         * @apioption plotOptions.series.point.events.update
         */
        /**
         * Events for each single point.
         *
         * @declare Highcharts.PointEventsOptionsObject
         */
        events: {}
    },
    /**
     * Options for the series data labels, appearing next to each data
     * point.
     *
     * Since v6.2.0, multiple data labels can be applied to each single
     * point by defining them as an array of configs.
     *
     * In styled mode, the data labels can be styled with the
     * `.highcharts-data-label-box` and `.highcharts-data-label` class names
     * ([see example](https://www.highcharts.com/samples/highcharts/css/series-datalabels)).
     *
     * @sample {highcharts} highcharts/plotoptions/series-datalabels-enabled
     *         Data labels enabled
     * @sample {highcharts} highcharts/plotoptions/series-datalabels-multiple
     *         Multiple data labels on a bar series
     * @sample {highcharts} highcharts/css/series-datalabels
     *         Styled mode example
     * @sample {highmaps} maps/demo/color-axis
     *         Choropleth map with data labels
     * @sample {highmaps} maps/demo/mappoint-datalabels-mapmarker
     *         Using data labels as map markers
     *
     * @type    {*|Array<*>}
     * @product highcharts highstock highmaps gantt
     *
     * @private
     */
    dataLabels: {
        /**
         * Enable or disable the initial animation when a series is displayed
         * for the `dataLabels`. The animation can also be set as a
         * configuration object. Please note that this option only applies to
         * the initial animation.
         *
         * For other animations, see [chart.animation](#chart.animation) and the
         * animation parameter under the API methods. The following properties
         * are supported:
         *
         * - `defer`: The animation delay time in milliseconds.
         *
         * @sample {highcharts} highcharts/plotoptions/animation-defer/
         *          Animation defer settings
         *
         * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
         * @since     8.2.0
         * @apioption plotOptions.series.dataLabels.animation
         */
        animation: {},
        /**
         * The animation delay time in milliseconds. Set to `0` to render the
         * data labels immediately. As `undefined` inherits defer time from the
         * [series.animation.defer](#plotOptions.series.animation.defer).
         *
         * @type      {number}
         * @since     8.2.0
         * @apioption plotOptions.series.dataLabels.animation.defer
         */
        /**
         * The alignment of the data label compared to the point. If `right`,
         * the right side of the label should be touching the point. For points
         * with an extent, like columns, the alignments also dictates how to
         * align it inside the box, as given with the
         * [inside](#plotOptions.column.dataLabels.inside) option. Can be one of
         * `left`, `center` or `right`.
         *
         * @sample {highcharts}
         *         highcharts/plotoptions/series-datalabels-align-left/ Left
         *         aligned
         * @sample {highcharts}
         *         highcharts/plotoptions/bar-datalabels-align-inside-bar/ Data
         *         labels inside the bar
         *
         * @type {Highcharts.AlignValue|null}
         */
        align: 'center',
        /**
         * Alignment method for data labels. If set to `plotEdges`, the labels
         * are aligned within the plot area in the direction of the y-axis. So
         * in a regular column chart, the labels are aligned vertically
         * according to the `verticalAlign` setting. In a bar chart, which is
         * inverted, the labels are aligned horizontally according to the
         * `align` setting. Applies to cartesian series only.
         *
         * @sample {highcharts} highcharts/series-bar/datalabels-alignto/
         *         Align to plot edges
         *
         * @type      {string}
         * @since 11.4.2
         * @apioption plotOptions.series.dataLabels.alignTo
         */
        /**
         * Whether to allow data labels to overlap. To make the labels less
         * sensitive for overlapping, the
         * [dataLabels.padding](#plotOptions.series.dataLabels.padding)
         * can be set to 0.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-allowoverlap-false/
         *         Don't allow overlap
         *
         * @type      {boolean}
         * @default   false
         * @since     4.1.0
         * @apioption plotOptions.series.dataLabels.allowOverlap
         */
        /**
         * The background color or gradient for the data label. Setting it to
         * `auto` will use the point's color.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         * @sample {highmaps} maps/plotoptions/series-datalabels-box/
         *         Data labels box options
         * @sample {highmaps} maps/demo/mappoint-datalabels-mapmarker
         *         Data labels as map markers
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since     2.2.1
         * @apioption plotOptions.series.dataLabels.backgroundColor
         */
        /**
         * The border color for the data label. Setting it to `auto` will use
         * the point's color. Defaults to `undefined`.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since     2.2.1
         * @apioption plotOptions.series.dataLabels.borderColor
         */
        /**
         * The border radius in pixels for the data label.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         * @sample {highmaps} maps/plotoptions/series-datalabels-box/
         *         Data labels box options
         *
         * @type      {number}
         * @default   0
         * @since     2.2.1
         * @apioption plotOptions.series.dataLabels.borderRadius
         */
        /**
         * The border width in pixels for the data label.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         *
         * @type      {number}
         * @default   0
         * @since     2.2.1
         * @apioption plotOptions.series.dataLabels.borderWidth
         */
        borderWidth: 0,
        /**
         * A class name for the data label. Particularly in styled mode,
         * this can be used to give each series' or point's data label
         * unique styling. In addition to this option, a default color class
         * name is added so that we can give the labels a contrast text
         * shadow.
         *
         * @sample {highcharts} highcharts/css/data-label-contrast/
         *         Contrast text shadow
         * @sample {highcharts} highcharts/css/series-datalabels/
         *         Styling by CSS
         *
         * @type      {string}
         * @since     5.0.0
         * @apioption plotOptions.series.dataLabels.className
         */
        /**
         * This options is deprecated.
         * Use [style.color](#plotOptions.series.dataLabels.style) instead.
         *
         * The text color for the data labels. Defaults to `undefined`. For
         * certain series types, like column or map, the data labels can be
         * drawn inside the points. In this case the data label will be
         * drawn with maximum contrast by default. Additionally, it will be
         * given a `text-outline` style with the opposite color, to further
         * increase the contrast. This can be overridden by setting the
         * `text-outline` style to `none` in the `dataLabels.style` option.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-color/
         *         Red data labels
         * @sample {highmaps} maps/demo/color-axis/
         *         White data labels
         *
         * @see [style.color](#plotOptions.series.dataLabels.style)
         *
         * @type       {Highcharts.ColorType}
         * @deprecated 10.3
         * @apioption  plotOptions.series.dataLabels.color
         */
        /**
         * Whether to hide data labels that are outside the plot area. By
         * default, the data label is moved inside the plot area according
         * to the
         * [overflow](#plotOptions.series.dataLabels.overflow)
         * option.
         *
         * @type      {boolean}
         * @default   true
         * @since     2.3.3
         * @apioption plotOptions.series.dataLabels.crop
         */
        /**
         * Whether to defer displaying the data labels until the initial
         * series animation has finished. Setting to `false` renders the
         * data label immediately. If set to `true` inherits the defer
         * time set in [plotOptions.series.animation](#plotOptions.series.animation).
         *
         * @since     4.0.0
         * @type      {boolean}
         * @product   highcharts highstock gantt
         */
        defer: true,
        /**
         * Enable or disable the data labels.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-enabled/
         *         Data labels enabled
         * @sample {highmaps} maps/demo/color-axis/
         *         Data labels enabled
         *
         * @type      {boolean}
         * @default   false
         * @apioption plotOptions.series.dataLabels.enabled
         */
        /**
         * A declarative filter to control of which data labels to display.
         * The declarative filter is designed for use when callback
         * functions are not available, like when the chart options require
         * a pure JSON structure or for use with graphical editors. For
         * programmatic control, use the `formatter` instead, and return
         * `undefined` to disable a single data label.
         *
         * @example
         * filter: {
         *     property: 'percentage',
         *     operator: '>',
         *     value: 4
         * }
         *
         * @sample {highcharts} highcharts/demo/pie-monochrome
         *         Data labels filtered by percentage
         *
         * @declare   Highcharts.DataLabelsFilterOptionsObject
         * @since     6.0.3
         * @apioption plotOptions.series.dataLabels.filter
         */
        /**
         * The operator to compare by. Can be one of `>`, `<`, `>=`, `<=`,
         * `==`, `===`, `!=` and `!==`.
         *
         * @type       {string}
         * @validvalue [">", "<", ">=", "<=", "==", "===", "!=", "!=="]
         * @apioption  plotOptions.series.dataLabels.filter.operator
         */
        /**
         * The point property to filter by. Point options are passed
         * directly to properties, additionally there are `y` value,
         * `percentage` and others listed under {@link Highcharts.Point}
         * members.
         *
         * @type      {string}
         * @apioption plotOptions.series.dataLabels.filter.property
         */
        /**
         * The value to compare against.
         *
         * @type      {number}
         * @apioption plotOptions.series.dataLabels.filter.value
         */
        /**
         * A
         * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
         * for the data label. Available variables are the same as for
         * `formatter`.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-format/
         *         Add a unit
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-format-subexpression/
         *         Complex logic in the format string
         * @sample {highmaps} maps/plotoptions/series-datalabels-format/
         *         Formatted value in the data label
         *
         * @type      {string}
         * @default   y
         * @default   point.value
         * @since     3.0
         * @apioption plotOptions.series.dataLabels.format
         */
        // eslint-disable-next-line valid-jsdoc
        /**
         * Callback JavaScript function to format the data label. Note that if a
         * `format` is defined, the format takes precedence and the formatter is
         * ignored.
         *
         * @sample {highmaps} maps/plotoptions/series-datalabels-format/
         *         Formatted value
         *
         * @type {Highcharts.DataLabelsFormatterCallbackFunction}
         */
        formatter: function () {
            const { numberFormatter } = this.series.chart;
            return typeof this.y !== 'number' ?
                '' : numberFormatter(this.y, -1);
        },
        /**
         * For points with an extent, like columns or map areas, whether to
         * align the data label inside the box or to the actual value point.
         * Defaults to `false` in most cases, `true` in stacked columns.
         *
         * @type      {boolean}
         * @since     3.0
         * @apioption plotOptions.series.dataLabels.inside
         */
        /**
         * Format for points with the value of null. Works analogously to
         * [format](#plotOptions.series.dataLabels.format). `nullFormat` can
         * be applied only to series which support displaying null points.
         * `heatmap` and `tilemap` supports `nullFormat` by default while the
         * following series requires [#series.nullInteraction] set to `true`:
         * `line`, `spline`, `area`, `area-spline`, `column`, `bar`, and
         * `timeline`. Does not work with series that don't display null
         * points, like `pie`.
         *
         * @sample {highcharts} highcharts/series/null-interaction/
         *         Line chart with null interaction
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-nullformat/
         *         Heatmap with null interaction
         *
         * @type      {boolean|string}
         * @since     7.1.0
         * @apioption plotOptions.series.dataLabels.nullFormat
         */
        /**
         * Callback JavaScript function that defines formatting for points
         * with the value of null. Works analogously to [formatter](#plotOptions.series.dataLabels.formatter).
         * `nullFormatter` can be applied only to series which support
         * displaying null points. `heatmap` and `tilemap` supports
         * `nullFormatter` by default while the following series requires [#series.nullInteraction]
         * set to `true`: `line`, `spline`, `area`, `area-spline`, `column`,
         * `bar`, and `timeline`. Does not work with series that don't display
         * null points, like `pie`.

         * @sample {highcharts} highcharts/plotoptions/series-datalabels-nullformat/
         *         Format data label for null points in heat map
         *
         * @type      {Highcharts.DataLabelsFormatterCallbackFunction}
         * @since     7.1.0
         * @apioption plotOptions.series.dataLabels.nullFormatter
         */
        /**
         * How to handle data labels that flow outside the plot area. The
         * default is `"justify"`, which aligns them inside the plot area.
         * For columns and bars, this means it will be moved inside the bar.
         * To display data labels outside the plot area, set `crop` to
         * `false` and `overflow` to `"allow"`.
         *
         * @type       {Highcharts.DataLabelsOverflowValue}
         * @default    justify
         * @since      3.0.6
         * @apioption  plotOptions.series.dataLabels.overflow
         */
        /**
         * When either the `borderWidth` or the `backgroundColor` is set,
         * this is the padding within the box.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         * @sample {highmaps} maps/plotoptions/series-datalabels-box/
         *         Data labels box options
         *
         * @since 2.2.1
         */
        padding: 5,
        /**
         * Aligns data labels relative to points. If `center` alignment is
         * not possible, it defaults to `right`.
         *
         * @type      {Highcharts.AlignValue}
         * @default   center
         * @apioption plotOptions.series.dataLabels.position
         */
        /**
         * Text rotation in degrees. Note that due to a more complex
         * structure, backgrounds, borders and padding will be lost on a
         * rotated data label.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
         *         Vertical labels
         *
         * @type      {number}
         * @default   0
         * @apioption plotOptions.series.dataLabels.rotation
         */
        /**
         * The shadow of the box. Works best with `borderWidth` or
         * `backgroundColor`. Since 2.3 the shadow can be an object
         * configuration containing `color`, `offsetX`, `offsetY`, `opacity`
         * and `width`.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
         *         Data labels box options
         *
         * @type      {boolean|Highcharts.ShadowOptionsObject}
         * @default   false
         * @since     2.2.1
         * @apioption plotOptions.series.dataLabels.shadow
         */
        /**
         * The name of a symbol to use for the border around the label.
         * Symbols are predefined functions on the Renderer object.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-shape/
         *         A callout for annotations
         *
         * @type      {string}
         * @default   square
         * @since     4.1.2
         * @apioption plotOptions.series.dataLabels.shape
         */
        /**
         * Styles for the label. The default `color` setting is
         * `"contrast"`, which is a pseudo color that Highcharts picks up
         * and applies the maximum contrast to the underlying point item,
         * for example the bar in a bar chart.
         *
         * The `textOutline` is a pseudo property that applies an outline of
         * the given width with the given color, which by default is the
         * maximum contrast to the text. So a bright text color will result
         * in a black text outline for maximum readability on a mixed
         * background. In some cases, especially with grayscale text, the
         * text outline doesn't work well, in which cases it can be disabled
         * by setting it to `"none"`. When `useHTML` is true, the
         * `textOutline` will not be picked up. In this, case, the same
         * effect can be acheived through the `text-shadow` CSS property.
         *
         * For some series types, where each point has an extent, like for
         * example tree maps, the data label may overflow the point. There
         * are two strategies for handling overflow. By default, the text
         * will wrap to multiple lines. The other strategy is to set
         * `style.textOverflow` to `ellipsis`, which will keep the text on
         * one line plus it will break inside long words.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-style/
         *         Bold labels
         * @sample {highcharts} highcharts/plotoptions/pie-datalabels-overflow/
         *         Long labels truncated with an ellipsis in a pie
         * @sample {highcharts} highcharts/plotoptions/pie-datalabels-overflow-wrap/
         *         Long labels are wrapped in a pie
         * @sample {highmaps} maps/demo/color-axis/
         *         Bold labels
         *
         * @type      {Highcharts.CSSObject}
         * @since     4.1.0
         * @apioption plotOptions.series.dataLabels.style
         */
        style: {
            /** @internal */
            fontSize: '0.7em',
            /** @internal */
            fontWeight: 'bold',
            /** @internal */
            color: 'contrast',
            /** @internal */
            textOutline: '1px contrast'
        },
        /**
         * Options for a label text which should follow marker's shape.
         * Border and background are disabled for a label that follows a
         * path.
         *
         * **Note:** Only SVG-based renderer supports this option. Setting
         * `useHTML` to true will disable this option.
         *
         * @declare   Highcharts.DataLabelsTextPathOptionsObject
         * @since     7.1.0
         * @apioption plotOptions.series.dataLabels.textPath
         */
        /**
         * Presentation attributes for the text path.
         *
         * @type      {Highcharts.SVGAttributes}
         * @since     7.1.0
         * @apioption plotOptions.series.dataLabels.textPath.attributes
         */
        /**
         * Enable or disable `textPath` option for link's or marker's data
         * labels.
         *
         * @type      {boolean}
         * @since     7.1.0
         * @apioption plotOptions.series.dataLabels.textPath.enabled
         */
        /**
         * Whether to
         * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
         * to render the labels.
         *
         * @type      {boolean}
         * @default   false
         * @apioption plotOptions.series.dataLabels.useHTML
         */
        /**
         * The vertical alignment of a data label. Can be one of `top`,
         * `middle` or `bottom`. The default value depends on the data, for
         * instance in a column chart, the label is above positive values
         * and below negative values.
         *
         * @type  {Highcharts.VerticalAlignValue|null}
         * @since 2.3.3
         */
        verticalAlign: 'bottom',
        /**
         * The x position offset of the label relative to the point in
         * pixels.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
         *         Vertical and positioned
         * @sample {highcharts} highcharts/plotoptions/bar-datalabels-align-inside-bar/
         *         Data labels inside the bar
         */
        x: 0,
        /**
         * The z index of the data labels. Use a `zIndex` of 6 to display it above
         * the series, or use a `zIndex` of 2 to display it behind the series.
         *
         * @type      {number}
         * @default   6
         * @since     2.3.5
         * @apioption plotOptions.series.dataLabels.zIndex
         */
        /**
         * The y position offset of the label relative to the point in
         * pixels.
         *
         * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
         *         Vertical and positioned
         */
        y: 0
    },
    /**
     * When the series contains less points than the crop threshold, all
     * points are drawn, even if the points fall outside the visible plot
     * area at the current zoom. The advantage of drawing all points
     * (including markers and columns), is that animation is performed on
     * updates. On the other hand, when the series contains more points than
     * the crop threshold, the series data is cropped to only contain points
     * that fall within the plot area. The advantage of cropping away
     * invisible points is to increase performance on large series.
     *
     * @since   2.2
     * @product highcharts highstock
     *
     * @private
     */
    cropThreshold: 300,
    /**
     * Opacity of a series parts: line, fill (e.g. area) and dataLabels.
     *
     * @see [states.inactive.opacity](#plotOptions.series.states.inactive.opacity)
     *
     * @since 7.1.0
     *
     * @private
     */
    opacity: 1,
    /**
     * The width of each point on the x axis. For example in a column chart
     * with one value each day, the pointRange would be 1 day (= 24 * 3600
     * * 1000 milliseconds). This is normally computed automatically, but
     * this option can be used to override the automatic value.
     *
     * @product highstock
     *
     * @private
     */
    pointRange: 0,
    /**
     * When this is true, the series will not cause the Y axis to cross
     * the zero plane (or [threshold](#plotOptions.series.threshold) option)
     * unless the data actually crosses the plane.
     *
     * For example, if `softThreshold` is `false`, a series of 0, 1, 2,
     * 3 will make the Y axis show negative values according to the
     * `minPadding` option. If `softThreshold` is `true`, the Y axis starts
     * at 0.
     *
     * @since   4.1.9
     * @product highcharts highstock
     *
     * @private
     */
    softThreshold: true,
    /**
     * @declare Highcharts.SeriesStatesOptionsObject
     *
     * @private
     */
    states: {
        /**
         * The normal state of a series, or for point items in column, pie
         * and similar series. Currently only used for setting animation
         * when returning to normal state from hover.
         *
         * @declare Highcharts.SeriesStatesNormalOptionsObject
         */
        normal: {
            /**
             * Animation when returning to normal state after hovering.
             *
                 * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
             */
            animation: true
        },
        /**
         * Options for the hovered series. These settings override the
         * normal state options when a series is moused over or touched.
         *
         * @declare Highcharts.SeriesStatesHoverOptionsObject
         */
        hover: {
            /**
             * Enable separate styles for the hovered series to visualize
             * that the user hovers either the series itself or the legend.
             *
             * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled/
             *         Line
             * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled-column/
             *         Column
             * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled-pie/
             *         Pie
             *
             * @type      {boolean}
             * @default   true
             * @since     1.2
             * @apioption plotOptions.series.states.hover.enabled
             */
            /**
             * Animation setting for hovering the graph in line-type series.
             *
             * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
             * @since   5.0.8
             * @product highcharts highstock
             */
            animation: {
                /**
                 * The duration of the hover animation in milliseconds. By
                 * default the hover state animates quickly in, and slowly
                 * back to normal.
                 *
                 * @internal
                 */
                duration: 150
            },
            /**
             * Pixel width of the graph line. By default this property is
             * undefined, and the `lineWidthPlus` property dictates how much
             * to increase the linewidth from normal state.
             *
             * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidth/
             *         5px line on hover
             *
             * @type      {number}
             * @product   highcharts highstock
             * @apioption plotOptions.series.states.hover.lineWidth
             */
            /**
             * The additional line width for the graph of a hovered series.
             *
             * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
             *         5 pixels wider
             * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
             *         5 pixels wider
             *
             * @since   4.0.3
             * @product highcharts highstock
             */
            lineWidthPlus: 1,
            /**
             * In Highcharts 1.0, the appearance of all markers belonging
             * to the hovered series. For settings on the hover state of the
             * individual point, see
             * [marker.states.hover](#plotOptions.series.marker.states.hover).
             *
             * @deprecated
             *
             * @extends   plotOptions.series.marker
             * @excluding states, symbol
             * @product   highcharts highstock
             */
            marker: {
            // `lineWidth: base + 1`,
            // `radius: base + 1`
            },
            /**
             * Options for the halo appearing around the hovered point in
             * line-type series as well as outside the hovered slice in pie
             * charts. By default the halo is filled by the current point or
             * series color with an opacity of 0.25\. The halo can be
             * disabled by setting the `halo` option to `null`.
             *
             * In styled mode, the halo is styled with the
             * `.highcharts-halo` class, with colors inherited from
             * `.highcharts-color-{n}`.
             *
             * @sample {highcharts} highcharts/plotoptions/halo/
             *         Halo options
             * @sample {highstock} highcharts/plotoptions/halo/
             *         Halo options
             *
             * @declare Highcharts.SeriesStatesHoverHaloOptionsObject
             * @type    {null|*}
             * @since   4.0
             * @product highcharts highstock
             */
            halo: {
                /**
                 * A collection of SVG attributes to override the appearance
                 * of the halo, for example `fill`, `stroke` and
                 * `stroke-width`.
                 *
                 * @type      {Highcharts.SVGAttributes}
                 * @since     4.0
                 * @product   highcharts highstock
                 * @apioption plotOptions.series.states.hover.halo.attributes
                 */
                /**
                 * The pixel size of the halo. For point markers this is the
                 * radius of the halo. For pie slices it is the width of the
                 * halo outside the slice. For bubbles it defaults to 5 and
                 * is the width of the halo outside the bubble.
                 *
                 * @since   4.0
                 * @product highcharts highstock
                 */
                size: 10,
                /**
                 * Opacity for the halo unless a specific fill is overridden
                 * using the `attributes` setting. Note that Highcharts is
                 * only able to apply opacity to colors of hex or rgb(a)
                 * formats.
                 *
                 * @since   4.0
                 * @product highcharts highstock
                 */
                opacity: 0.25
            }
        },
        /**
         * Specific options for point in selected states, after being
         * selected by
         * [allowPointSelect](#plotOptions.series.allowPointSelect)
         * or programmatically.
         *
         * @sample maps/plotoptions/series-allowpointselect/
         *         Allow point select demo
         *
         * @declare   Highcharts.SeriesStatesSelectOptionsObject
         * @extends   plotOptions.series.states.hover
         * @excluding brightness
         */
        select: {
            animation: {
                /** @internal */
                duration: 0
            }
        },
        /**
         * The opposite state of a hover for series.
         *
         * @sample highcharts/plotoptions/series-states-inactive-disabled
         *         Disabled inactive state
         *
         * @declare Highcharts.SeriesStatesInactiveOptionsObject
         */
        inactive: {
            /**
             * Enable or disable the inactive state for a series
             *
             * @sample highcharts/plotoptions/series-states-inactive-disabled
             *         Disabled inactive state
             *
             * @type {boolean}
             * @default true
             * @apioption plotOptions.series.states.inactive.enabled
             */
            /**
             * The animation for entering the inactive state.
             *
             * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
             */
            animation: {
                /** @internal */
                duration: 150
            },
            /**
             * Opacity of series elements (dataLabels, line, area).
             *
             * @type {number}
             */
            opacity: 0.2
        }
    },
    /**
     * Sticky tracking of mouse events. When true, the `mouseOut` event on a
     * series isn't triggered until the mouse moves over another series, or
     * out of the plot area. When false, the `mouseOut` event on a series is
     * triggered when the mouse leaves the area around the series' graph or
     * markers. This also implies the tooltip when not shared. When
     * `stickyTracking` is false and `tooltip.shared` is false, the tooltip
     * will be hidden when moving the mouse between series. Defaults to true
     * for line and area type series, but to false for columns, pies etc.
     *
     * **Note:** The boost module will force this option because of
     * technical limitations.
     *
     * @sample {highcharts} highcharts/plotoptions/series-stickytracking-true/
     *         True by default
     * @sample {highcharts} highcharts/plotoptions/series-stickytracking-false/
     *         False
     *
     * @default {highcharts} true
     * @default {highstock} true
     * @default {highmaps} false
     * @since   2.0
     *
     * @private
     */
    stickyTracking: true,
    /**
     * A configuration object for the tooltip rendering of each single
     * series. Properties are inherited from [tooltip](#tooltip), but only
     * the following properties can be defined on a series level.
     *
     * @declare   Highcharts.SeriesTooltipOptionsObject
     * @since     2.3
     * @extends   tooltip
     * @excluding animation, backgroundColor, borderColor, borderRadius,
     *            borderWidth, className, crosshairs, enabled, fixed, formatter,
     *            headerShape, hideDelay, outside, padding, positioner,
     *            shadow, shape, shared, snap, split, stickOnContact,
     *            style, useHTML
     * @apioption plotOptions.series.tooltip
     */
    /**
     * When a series contains a `data` array that is longer than this, the
     * Series class looks for data configurations of plain numbers or arrays of
     * numbers. The first and last valid points are checked. If found, the rest
     * of the data is assumed to be the same. This saves expensive data checking
     * and indexing in long series, and makes data-heavy charts render faster.
     *
     * Set it to `0` disable.
     *
     * Note:
     * - In boost mode turbo threshold is forced. Only array of numbers or two
     *   dimensional arrays are allowed.
     * - In version 11.4.3 and earlier, if object configurations were passed
     *   beyond the turbo threshold, a warning was logged in the console and the
     *   data series didn't render.
     *
     * @since   2.2
     * @product highcharts highstock gantt
     *
     * @private
     */
    turboThreshold: 1000,
    /**
     * An array defining zones within a series. Zones can be applied to the
     * X axis, Y axis or Z axis for bubbles, according to the `zoneAxis`
     * option. The zone definitions have to be in ascending order regarding
     * to the value.
     *
     * In styled mode, the color zones are styled with the
     * `.highcharts-zone-{n}` class, or custom classed from the `className`
     * option
     * ([view live demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/css/color-zones/)).
     *
     * @see [zoneAxis](#plotOptions.series.zoneAxis)
     *
     * @sample {highcharts} highcharts/series/color-zones-simple/
     *         Color zones
     * @sample {highstock} highcharts/series/color-zones-simple/
     *         Color zones
     *
     * @declare   Highcharts.SeriesZonesOptionsObject
     * @type      {Array<*>}
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zones
     */
    /**
     * Styled mode only. A custom class name for the zone.
     *
     * @sample highcharts/css/color-zones/
     *         Zones styled by class name
     *
     * @type      {string}
     * @since     5.0.0
     * @apioption plotOptions.series.zones.className
     */
    /**
     * Defines the color of the series.
     *
     * @see [series color](#plotOptions.series.color)
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zones.color
     */
    /**
     * A name for the dash style to use for the graph.
     *
     * @see [plotOptions.series.dashStyle](#plotOptions.series.dashStyle)
     *
     * @sample {highcharts|highstock} highcharts/series/color-zones-dashstyle-dot/
     *         Dashed line indicates prognosis
     *
     * @type      {Highcharts.DashStyleValue}
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zones.dashStyle
     */
    /**
     * Defines the fill color for the series (in area type series)
     *
     * @see [fillColor](#plotOptions.area.fillColor)
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zones.fillColor
     */
    /**
     * The value up to where the zone extends, if undefined the zones
     * stretches to the last value in the series.
     *
     * @type      {number}
     * @since     4.1.0
     * @product   highcharts highstock
     * @apioption plotOptions.series.zones.value
     */
    /**
     * When using dual or multiple color axes, this number defines which
     * colorAxis the particular series is connected to. It refers to
     * either the
     * {@link #colorAxis.id|axis id}
     * or the index of the axis in the colorAxis array, with 0 being the
     * first. Set this option to false to prevent a series from connecting
     * to the default color axis.
     *
     * Since v7.2.0 the option can also be an axis id or an axis index
     * instead of a boolean flag.
     *
     * @sample highcharts/coloraxis/coloraxis-with-pie/
     *         Color axis with pie series
     * @sample highcharts/coloraxis/multiple-coloraxis/
     *         Multiple color axis
     *
     * @type      {number|string|boolean}
     * @default   0
     * @product   highcharts highstock highmaps
     * @apioption plotOptions.series.colorAxis
     */
    /**
     * Determines what data value should be used to calculate point color
     * if `colorAxis` is used. Requires to set `min` and `max` if some
     * custom point property is used or if approximation for data grouping
     * is set to `'sum'`.
     *
     * @sample highcharts/coloraxis/custom-color-key/
     *         Custom color key
     * @sample highcharts/coloraxis/color-key-with-stops/
     *         Custom colorKey with color axis stops
     * @sample highcharts/coloraxis/changed-default-color-key/
     *         Changed default color key
     *
     * @type      {string}
     * @default   y
     * @since     7.2.0
     * @product   highcharts highstock highmaps
     * @apioption plotOptions.series.colorKey
     */
    /**
     * What type of legend symbol to render for this series. Can be one of
     * `areaMarker`, `lineMarker` or `rectangle`.
     *
     * @validvalue ["areaMarker", "lineMarker", "rectangle"]
     *
     * @sample {highcharts} highcharts/series/legend-symbol/
     *         Change the legend symbol
     *
     * @type      {string}
     * @default   rectangle
     * @since     11.0.1
     * @apioption plotOptions.series.legendSymbol
     */
    /**
     * Defines the color of the legend symbol for this series. Defaults to
     * undefined, in which case the series color is used. Does not work with
     * styled mode.
     *
     * @sample {highcharts|highstock} highcharts/series/legend-symbol-color/
     *         Change the legend symbol color
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @default   undefined
     * @since 12.0.0
     * @product   highcharts highstock highmaps
     * @apioption plotOptions.series.legendSymbolColor
     */
    /**
     * Determines whether the series should look for the nearest point
     * in both dimensions or just the x-dimension when hovering the series.
     * Defaults to `'xy'` for scatter series and `'x'` for most other
     * series. If the data has duplicate x-values, it is recommended to
     * set this to `'xy'` to allow hovering over all points.
     *
     * Applies only to series types using nearest neighbor search (not
     * direct hover) for tooltip.
     *
     * @sample {highcharts} highcharts/series/findnearestpointby/
     *         Different hover behaviors
     * @sample {highstock} highcharts/series/findnearestpointby/
     *         Different hover behaviors
     * @sample {highmaps} highcharts/series/findnearestpointby/
     *         Different hover behaviors
     *
     * @since      5.0.10
     * @validvalue ["x", "xy"]
     *
     * @private
     */
    findNearestPointBy: 'x'
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const SeriesDefaults = (seriesDefaults);

;// ./code/es-modules/Series/Item/ItemSeriesDefaults.js
/* *
 *
 *  (c) 2019-2025 Torstein Honsi
 *
 *  Item series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  API Options
 *
 * */
/**
 * An item chart is an infographic chart where a number of items are laid
 * out in either a rectangular or circular pattern. It can be used to
 * visualize counts within a group, or for the circular pattern, typically
 * a parliament.
 *
 * The circular layout has much in common with a pie chart. Many of the item
 * series options, like `center`, `size` and data label positioning, are
 * inherited from the pie series and don't apply for rectangular layouts.
 *
 * @sample       highcharts/demo/parliament-chart
 *               Parliament chart (circular item chart)
 * @sample       highcharts/series-item/rectangular
 *               Rectangular item chart
 * @sample       highcharts/series-item/symbols
 *               Infographic with symbols
 *
 * @extends      plotOptions.pie
 * @since        7.1.0
 * @product      highcharts
 * @excluding    borderColor, borderWidth, depth, linecap, shadow,
 *               slicedOffset
 * @requires     modules/item-series
 * @optionparent plotOptions.item
 */
const ItemSeriesDefaults = {
    /**
     * In circular view, the end angle of the item layout, in degrees where
     * 0 is up.
     *
     * @sample highcharts/demo/parliament-chart
     *         Parliament chart
     * @type {undefined|number}
     */
    endAngle: void 0,
    /**
     * In circular view, the size of the inner diameter of the circle. Can
     * be a percentage or pixel value. Percentages are relative to the outer
     * perimeter. Pixel values are given as integers.
     *
     * If the `rows` option is set, it overrides the `innerSize` setting.
     *
     * @sample highcharts/demo/parliament-chart
     *         Parliament chart
     * @type {string|number}
     */
    innerSize: '40%',
    /**
     * The padding between the items, given in relative size where the size
     * of the item is 1.
     * @type {number}
     */
    itemPadding: 0.1,
    /**
     * The layout of the items in rectangular view. Can be either
     * `horizontal` or `vertical`.
     * @sample highcharts/series-item/symbols
     *         Horizontal layout
     * @type {string}
     */
    layout: 'vertical',
    /**
     * @extends plotOptions.series.marker
     */
    marker: merge(SeriesDefaults.marker, {
        radius: null
    }),
    /**
     * The number of rows to display in the rectangular or circular view. If
     * the `innerSize` is set, it will be overridden by the `rows` setting.
     *
     * @sample highcharts/series-item/rows-columns
     *         Fixed row count
     * @type {number}
     */
    rows: void 0,
    crisp: false,
    showInLegend: true,
    /**
     * In circular view, the start angle of the item layout, in degrees
     * where 0 is up.
     *
     * @sample highcharts/demo/parliament-chart
     *         Parliament chart
     * @type {undefined|number}
     */
    startAngle: void 0
};
/**
 * An `item` series. If the [type](#series.item.type) option is not specified,
 * it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.item
 * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
 *            boostThreshold, boostBlending
 * @product   highcharts
 * @requires  modules/item-series
 * @apioption series.item
 */
/**
 * An array of data points for the series. For the `item` series type,
 * points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.item.turboThreshold),
 *    this option is not available.
 *    ```js
 *    data: [{
 *        y: 1,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        y: 7,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<string,(number|null)>|null|*>}
 * @extends   series.pie.data
 * @exclude   sliced
 * @product   highcharts
 * @apioption series.item.data
 */
/**
 * The sequential index of the data point in the legend.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.pie.data.legendIndex
 */
/**
 * @excluding legendItemClick
 * @apioption series.item.events
 */
''; // Keeps the doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Item_ItemSeriesDefaults = (ItemSeriesDefaults);

;// ./code/es-modules/Series/Item/ItemSeries.js
/* *
 *
 *  (c) 2019-2025 Torstein Honsi
 *
 *  Item series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { pie: PieSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { defined, extend: ItemSeries_extend, fireEvent, isNumber, merge: ItemSeries_merge, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
// Inherits pie as the most tested non-cartesian series with individual point
// legend, tooltips etc. Only downside is we need to re-enable marker options.
/**
 * The item series type.
 *
 * @requires modules/item-series
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.item
 *
 * @augments Highcharts.seriesTypes.pie
 */
class ItemSeries extends PieSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Fade in the whole chart.
     * @private
     */
    animate(init) {
        const group = this.group;
        if (group) {
            if (init) {
                group.attr({
                    opacity: 0
                });
            }
            else {
                group.animate({
                    opacity: 1
                }, this.options.animation);
            }
        }
    }
    drawDataLabels() {
        if (this.center && this.slots) {
            super.drawDataLabels();
            // Or it's just a dot chart with no natural place to put the data labels
        }
        else {
            for (const point of this.points) {
                point.destroyElements({ dataLabel: 1 });
            }
        }
    }
    drawPoints() {
        const series = this, options = this.options, renderer = series.chart.renderer, seriesMarkerOptions = options.marker, borderWidth = this.borderWidth, crisp = borderWidth % 2 ? 0.5 : 1, rows = this.getRows(), cols = Math.ceil(this.total / rows), cellWidth = this.chart.plotWidth / cols, cellHeight = this.chart.plotHeight / rows, itemSize = this.itemSize || Math.min(cellWidth, cellHeight);
        let i = 0;
        /* @todo: remove if not needed
        this.slots.forEach(slot => {
            this.chart.renderer.circle(slot.x, slot.y, 6)
                .attr({
                    fill: 'silver'
                })
                .add(this.group);
        });
        //*/
        for (const point of series.points) {
            const pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                seriesMarkerOptions.symbol), r = pick(pointMarkerOptions.radius, seriesMarkerOptions.radius), size = defined(r) ? 2 * r : itemSize, padding = size * options.itemPadding;
            let attr, graphics, pointAttr, x, y, width, height;
            point.graphics = graphics = point.graphics || [];
            if (!series.chart.styledMode) {
                pointAttr = series.pointAttribs(point, point.selected && 'select');
            }
            if (!point.isNull && point.visible) {
                if (!point.graphic) {
                    point.graphic = renderer.g('point')
                        .add(series.group);
                }
                for (let val = 0; val < (point.y || 0); ++val) {
                    // Semi-circle
                    if (series.center && series.slots) {
                        // Fill up the slots from left to right
                        const slot = series.slots.shift();
                        x = slot.x - itemSize / 2;
                        y = slot.y - itemSize / 2;
                    }
                    else if (options.layout === 'horizontal') {
                        x = cellWidth * (i % cols);
                        y = cellHeight * Math.floor(i / cols);
                    }
                    else {
                        x = cellWidth * Math.floor(i / rows);
                        y = cellHeight * (i % rows);
                    }
                    x += padding;
                    y += padding;
                    width = Math.round(size - 2 * padding);
                    height = width;
                    if (series.options.crisp) {
                        x = Math.round(x) - crisp;
                        y = Math.round(y) + crisp;
                    }
                    attr = {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    };
                    if (typeof r !== 'undefined') {
                        attr.r = r;
                    }
                    // Circles attributes update (#17257)
                    if (pointAttr) {
                        ItemSeries_extend(attr, pointAttr);
                    }
                    let graphic = graphics[val];
                    if (graphic) {
                        graphic.animate(attr);
                    }
                    else {
                        graphic = renderer
                            .symbol(symbol, void 0, void 0, void 0, void 0, {
                            backgroundSize: 'within'
                        })
                            .attr(attr)
                            .add(point.graphic);
                    }
                    graphic.isActive = true;
                    graphics[val] = graphic;
                    ++i;
                }
            }
            for (let j = 0; j < graphics.length; j++) {
                const graphic = graphics[j];
                if (!graphic) {
                    return;
                }
                if (!graphic.isActive) {
                    graphic.destroy();
                    graphics.splice(j, 1);
                    j--; // Need to subtract 1 after splice, #19053
                }
                else {
                    graphic.isActive = false;
                }
            }
        }
    }
    getRows() {
        const chart = this.chart, total = this.total || 0;
        let rows = this.options.rows, cols, ratio;
        // Get the row count that gives the most square cells
        if (!rows) {
            ratio = chart.plotWidth / chart.plotHeight;
            rows = Math.sqrt(total);
            if (ratio > 1) {
                rows = Math.ceil(rows);
                while (rows > 0) {
                    cols = total / rows;
                    if (cols / rows > ratio) {
                        break;
                    }
                    rows--;
                }
            }
            else {
                rows = Math.floor(rows);
                while (rows < total) {
                    cols = total / rows;
                    if (cols / rows < ratio) {
                        break;
                    }
                    rows++;
                }
            }
        }
        return rows;
    }
    /**
     * Get the semi-circular slots.
     * @private
     */
    getSlots() {
        const series = this, center = series.center, diameter = center[2], slots = series.slots = series.slots || [], fullAngle = (series.endAngleRad - series.startAngleRad), rowsOption = series.options.rows, isCircle = fullAngle % (2 * Math.PI) === 0, total = series.total || 0;
        let innerSize = center[3], x, y, rowRadius, rowLength, colCount, increment, angle, col, itemSize = 0, rowCount, itemCount = Number.MAX_VALUE, finalItemCount, rows, testRows, 
        // How many rows (arcs) should be used
        rowFraction = (diameter - innerSize) / diameter;
        // Increase the itemSize until we find the best fit
        while (itemCount > total + (rows && isCircle ? rows.length : 0)) {
            finalItemCount = itemCount;
            // Reset
            slots.length = 0;
            itemCount = 0;
            // Now rows is the last successful run
            rows = testRows;
            testRows = [];
            itemSize++;
            // Total number of rows (arcs) from the center to the
            // perimeter
            rowCount = diameter / itemSize / 2;
            if (rowsOption) {
                innerSize = ((rowCount - rowsOption) / rowCount) * diameter;
                if (innerSize >= 0) {
                    rowCount = rowsOption;
                    // If innerSize is negative, we are trying to set too
                    // many rows in the rows option, so fall back to
                    // treating it as innerSize 0
                }
                else {
                    innerSize = 0;
                    rowFraction = 1;
                }
            }
            else {
                rowCount = Math.floor(rowCount * rowFraction);
            }
            for (let row = rowCount; row > 0; row--) {
                rowRadius = (innerSize + (row / rowCount) *
                    (diameter - innerSize - itemSize)) / 2;
                rowLength = fullAngle * rowRadius;
                colCount = Math.ceil(rowLength / itemSize);
                testRows.push({
                    rowRadius: rowRadius,
                    rowLength: rowLength,
                    colCount: colCount
                });
                itemCount += colCount + 1;
            }
        }
        if (!rows) {
            return;
        }
        // We now have more slots than we have total items. Loop over
        // the rows and remove the last slot until the count is correct.
        // For each iteration we sort the last slot by the angle, and
        // remove those with the highest angles.
        let overshoot = finalItemCount - series.total -
            (isCircle ? rows.length : 0);
        /**
         * @private
         * @param {Highcharts.ItemRowContainerObject} item
         * Wrapped object with angle and row
         */
        const cutOffRow = (item) => {
            if (overshoot > 0) {
                item.row.colCount--;
                overshoot--;
            }
        };
        while (overshoot > 0) {
            rows
                // Return a simplified representation of the angle of
                // the last slot within each row.
                .map((row) => ({
                angle: row.colCount / row.rowLength,
                row: row
            }))
                // Sort by the angles...
                .sort((a, b) => (b.angle - a.angle))
                // ...so that we can ignore the items with the lowest
                // angles...
                .slice(0, Math.min(overshoot, Math.ceil(rows.length / 2)))
                // ...and remove the ones with the highest angles
                .forEach(cutOffRow);
        }
        for (const row of rows) {
            const rowRadius = row.rowRadius, colCount = row.colCount;
            increment = colCount ? fullAngle / colCount : 0;
            for (col = 0; col <= colCount; col += 1) {
                angle = series.startAngleRad + col * increment;
                x = center[0] + Math.cos(angle) * rowRadius;
                y = center[1] + Math.sin(angle) * rowRadius;
                slots.push({ x: x, y: y, angle: angle });
            }
        }
        // Sort by angle
        slots.sort((a, b) => (a.angle - b.angle));
        series.itemSize = itemSize;
        return slots;
    }
    translate(positions) {
        // Initialize chart without setting data, #13379.
        if (this.total === 0 && // Check if that is a (semi-)circle
            isNumber(this.options.startAngle) &&
            isNumber(this.options.endAngle)) {
            this.center = this.getCenter();
        }
        if (!this.slots) {
            this.slots = [];
        }
        if (isNumber(this.options.startAngle) &&
            isNumber(this.options.endAngle)) {
            super.translate(positions);
            this.slots = this.getSlots();
        }
        else {
            this.generatePoints();
            fireEvent(this, 'afterTranslate');
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ItemSeries.defaultOptions = ItemSeries_merge(PieSeries.defaultOptions, Item_ItemSeriesDefaults);
ItemSeries_extend(ItemSeries.prototype, {
    markerAttribs: void 0,
    pointClass: Item_ItemPoint
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('item', ItemSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Item_ItemSeries = ((/* unused pure expression or super */ null && (ItemSeries)));

;// ./code/es-modules/masters/modules/item-series.src.js




/* harmony default export */ const item_series_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});