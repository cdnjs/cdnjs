/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/dumbbell
 * @requires highcharts
 *
 * (c) 2009-2025 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["SVGRenderer"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/dumbbell", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["SVGRenderer"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/dumbbell"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["SVGRenderer"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["SVGRenderer"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__540__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 540:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__540__;

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
  "default": () => (/* binding */ dumbbell_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/AreaRange/AreaRangePoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { area: { prototype: { pointClass: AreaPoint, pointClass: { prototype: areaProto } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { defined, isNumber } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class AreaRangePoint extends AreaPoint {
    /**
     * Range series only. The high or maximum value for each data point.
     * @name Highcharts.Point#high
     * @type {number|undefined}
     */
    /**
     * Range series only. The low or minimum value for each data point.
     * @name Highcharts.Point#low
     * @type {number|undefined}
     */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    setState() {
        const prevState = this.state, series = this.series, isPolar = series.chart.polar;
        if (!defined(this.plotHigh)) {
            // Boost doesn't calculate plotHigh
            this.plotHigh = series.yAxis.toPixels(this.high, true);
        }
        if (!defined(this.plotLow)) {
            // Boost doesn't calculate plotLow
            this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
        }
        series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.upperStateMarkerGraphic;
        // Change state also for the top marker
        this.graphic = this.graphics && this.graphics[1];
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        // Top state:
        areaProto.setState.apply(this, arguments);
        this.state = prevState;
        // Now restore defaults
        this.plotY = this.plotLow;
        this.graphic = this.graphics && this.graphics[0];
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        series.upperStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
        // Lower marker is stored at stateMarkerGraphic
        // to avoid reference duplication (#7021)
        series.lowerStateMarkerGraphic = void 0;
        const originalSettings = series.modifyMarkerSettings();
        // Bottom state
        areaProto.setState.apply(this, arguments);
        // Restore previous state
        series.restoreMarkerSettings(originalSettings);
    }
    haloPath() {
        const isPolar = this.series.chart.polar;
        let path = [];
        // Bottom halo
        this.plotY = this.plotLow;
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (this.isInside) {
            path = areaProto.haloPath.apply(this, arguments);
        }
        // Top halo
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        if (this.isTopInside) {
            path = path.concat(areaProto.haloPath.apply(this, arguments));
        }
        return path;
    }
    isValid() {
        return isNumber(this.low) && isNumber(this.high);
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AreaRange_AreaRangePoint = (AreaRangePoint);

;// ./code/es-modules/Series/Dumbbell/DumbbellPoint.js
/* *
 *
 *  (c) 2010-2025 Sebastian Bochan, Rafal Sebestjanski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { extend, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class DumbbellPoint extends AreaRange_AreaRangePoint {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Set the point's state extended by have influence on the connector
     * (between low and high value).
     *
     * @private
     */
    setState() {
        const point = this, series = point.series, chart = series.chart, seriesLowColor = series.options.lowColor, seriesMarker = series.options.marker, seriesLowMarker = series.options.lowMarker, pointOptions = point.options, pointLowColor = pointOptions.lowColor, zoneColor = point.zone && point.zone.color, lowerGraphicColor = pick(pointLowColor, seriesLowMarker?.fillColor, seriesLowColor, pointOptions.color, zoneColor, point.color, series.color);
        let verb = 'attr', upperGraphicColor, origProps;
        this.pointSetState.apply(point, arguments);
        if (!point.state) {
            verb = 'animate';
            const [lowerGraphic, upperGraphic] = point.graphics || [];
            if (lowerGraphic && !chart.styledMode) {
                lowerGraphic.attr({
                    fill: lowerGraphicColor
                });
                if (upperGraphic) {
                    origProps = {
                        y: point.y,
                        zone: point.zone
                    };
                    point.y = point.high;
                    point.zone = point.zone ? point.getZone() : void 0;
                    upperGraphicColor = pick(point.marker ? point.marker.fillColor : void 0, seriesMarker ? seriesMarker.fillColor : void 0, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
                    upperGraphic.attr({
                        fill: upperGraphicColor
                    });
                    extend(point, origProps);
                }
            }
        }
        point.connector?.[verb](series.getConnectorAttribs(point));
    }
    destroy() {
        const point = this;
        // #15560
        if (!point.graphic) {
            point.graphic = point.connector;
            point.connector = void 0;
        }
        return super.destroy();
    }
}
extend(DumbbellPoint.prototype, {
    pointSetState: AreaRange_AreaRangePoint.prototype.setState
});
/* *
 *
 *  Default export
 *
 * */
/* harmony default export */ const Dumbbell_DumbbellPoint = (DumbbellPoint);

;// ./code/es-modules/Series/Dumbbell/DumbbellSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Sebastian Bochan, Rafal Sebestjanski
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
 * The dumbbell series is a cartesian series with higher and lower values
 * for each point along an X axis, connected with a line between the
 * values.
 *
 * Requires `highcharts-more.js` and `modules/dumbbell.js`.
 *
 * @sample {highcharts} highcharts/demo/dumbbell/
 *         Dumbbell chart
 * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
 *         Styled mode
 *
 * @extends      plotOptions.arearange
 * @product      highcharts highstock
 * @excluding    boostThreshold, boostBlendingfillColor, fillOpacity,
 *               legendSymbolColor, lineWidth, stack, stacking, stickyTracking,
 *               trackByArea
 * @since 8.0.0
 * @optionparent plotOptions.dumbbell
 */
const DumbbellSeriesDefaults = {
    /** @ignore-option */
    trackByArea: false,
    /** @ignore-option */
    fillColor: 'none',
    /** @ignore-option */
    lineWidth: 0,
    pointRange: 1,
    /**
     * Pixel width of the line that connects the dumbbell point's
     * values.
     *
     * @since 8.0.0
     * @product   highcharts highstock
     */
    connectorWidth: 1,
    /** @ignore-option */
    stickyTracking: false,
    groupPadding: 0.2,
    crisp: false,
    pointPadding: 0.1,
    legendSymbol: 'rectangle',
    /**
     * Color of the start markers in a dumbbell graph. This option takes
     * priority over the series color. To avoid this, set `lowColor` to
     * `undefined`.
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since 8.0.0
     * @product   highcharts highstock
     */
    lowColor: "#333333" /* Palette.neutralColor80 */,
    /**
     * Color of the line that connects the dumbbell point's values.
     * By default it is the series' color.
     *
     * @type      {string}
     * @product   highcharts highstock
     * @since 8.0.0
     * @apioption plotOptions.dumbbell.connectorColor
     */
    /**
     *
     * @apioption plotOptions.series.lowMarker
     */
    states: {
        hover: {
            /** @ignore-option */
            lineWidthPlus: 0,
            /**
             * The additional connector line width for a hovered point.
             *
             * @since 8.0.0
             * @product   highcharts highstock
             */
            connectorWidthPlus: 1,
            /** @ignore-option */
            halo: false
        }
    }
};
/**
 * The `dumbbell` series. If the [type](#series.dumbbell.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.dumbbell
 * @excluding boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @requires  modules/dumbbell
 * @apioption series.dumbbell
 */
/**
 * An array of data points for the series. For the `dumbbell` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,low,high`. If the first value is a string, it is applied as the name
 *    of the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 4, 2],
 *        [1, 2, 1],
 *        [2, 9, 10]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.dumbbell.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 0,
 *        high: 4,
 *        name: "Point2",
 *        color: "#00FF00",
 *        lowColor: "#00FFFF",
 *        connectorWidth: 3,
 *        connectorColor: "#FF00FF"
 *    }, {
 *        x: 1,
 *        low: 5,
 *        high: 3,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.arearange.data
 * @product   highcharts highstock
 * @apioption series.dumbbell.data
 */
/**
 * Color of the start markers in a dumbbell graph. This option takes
 * priority over the series color. To avoid this, set `lowColor` to
 * `undefined`.
 *
 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
 * @since     8.0.0
 * @product   highcharts highstock
 * @apioption  series.dumbbell.lowColor
 */
/**
 * Options for the lower markers of the dumbbell-like series. When `lowMarker`
 * is not defined, options inherit form the marker.
 *
 * @see [marker](#series.arearange.marker)
 *
 * @declare   Highcharts.PointMarkerOptionsObject
 * @extends   plotOptions.series.marker
 * @default   undefined
 * @product   highcharts highstock
 * @apioption plotOptions.dumbbell.lowMarker
 */
/**
 *
 * @sample {highcharts} highcharts/demo/dumbbell-markers
 *         Dumbbell chart with lowMarker option
 *
 * @declare   Highcharts.PointMarkerOptionsObject
 * @extends   plotOptions.series.marker.symbol
 * @product   highcharts highstock
 * @apioption plotOptions.dumbbell.lowMarker.symbol
 */
/**
 * Color of the line that connects the dumbbell point's values.
 * By default it is the series' color.
 *
 * @type        {string}
 * @since       8.0.0
 * @product     highcharts highstock
 * @apioption   series.dumbbell.data.connectorColor
 */
/**
 * Pixel width of the line that connects the dumbbell point's values.
 *
 * @type        {number}
 * @since       8.0.0
 * @default     1
 * @product     highcharts highstock
 * @apioption   series.dumbbell.data.connectorWidth
 */
/**
 * Color of the start markers in a dumbbell graph. This option takes
 * priority over the series color. To avoid this, set `lowColor` to
 * `undefined`.
 *
 * @type        {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
 * @since       8.0.0
 * @default     ${palette.neutralColor80}
 * @product     highcharts highstock
 * @apioption   series.dumbbell.data.lowColor
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Dumbbell_DumbbellSeriesDefaults = (DumbbellSeriesDefaults);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SVGRenderer"],"commonjs":["highcharts","SVGRenderer"],"commonjs2":["highcharts","SVGRenderer"],"root":["Highcharts","SVGRenderer"]}
var highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_ = __webpack_require__(540);
var highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_default = /*#__PURE__*/__webpack_require__.n(highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_);
;// ./code/es-modules/Series/Dumbbell/DumbbellSeries.js
/* *
 *
 *  (c) 2010-2025 Sebastian Bochan, Rafal Sebestjanski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { arearange: AreaRangeSeries, column: ColumnSeries, columnrange: ColumnRangeSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;


const { extend: DumbbellSeries_extend, merge, pick: DumbbellSeries_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The dumbbell series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.dumbbell
 *
 * @augments Highcharts.Series
 */
class DumbbellSeries extends AreaRangeSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get connector line path and styles that connects dumbbell point's low and
     * high values.
     * @private
     *
     * @param {Highcharts.Point} point The point to inspect.
     *
     * @return {Highcharts.SVGAttributes} attribs The path and styles.
     */
    getConnectorAttribs(point) {
        const series = this, chart = series.chart, pointOptions = point.options, seriesOptions = series.options, xAxis = series.xAxis, yAxis = series.yAxis, connectorWidthPlus = DumbbellSeries_pick(seriesOptions.states &&
            seriesOptions.states.hover &&
            seriesOptions.states.hover.connectorWidthPlus, 1), dashStyle = DumbbellSeries_pick(pointOptions.dashStyle, seriesOptions.dashStyle), pxThreshold = yAxis.toPixels(seriesOptions.threshold || 0, true), pointHeight = chart.inverted ?
            yAxis.len - pxThreshold : pxThreshold;
        let connectorWidth = DumbbellSeries_pick(pointOptions.connectorWidth, seriesOptions.connectorWidth), connectorColor = DumbbellSeries_pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color), pointTop = DumbbellSeries_pick(point.plotLow, point.plotY), pointBottom = DumbbellSeries_pick(point.plotHigh, pointHeight), origProps;
        if (typeof pointTop !== 'number') {
            return {};
        }
        if (point.state) {
            connectorWidth = connectorWidth + connectorWidthPlus;
        }
        if (pointTop < 0) {
            pointTop = 0;
        }
        else if (pointTop >= yAxis.len) {
            pointTop = yAxis.len;
        }
        if (pointBottom < 0) {
            pointBottom = 0;
        }
        else if (pointBottom >= yAxis.len) {
            pointBottom = yAxis.len;
        }
        if (point.plotX < 0 || point.plotX > xAxis.len) {
            connectorWidth = 0;
        }
        // Connector should reflect upper marker's zone color
        if (point.graphics && point.graphics[1]) {
            origProps = {
                y: point.y,
                zone: point.zone
            };
            point.y = point.high;
            point.zone = point.zone ? point.getZone() : void 0;
            connectorColor = DumbbellSeries_pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
            DumbbellSeries_extend(point, origProps);
        }
        const attribs = {
            d: highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_default().prototype.crispLine([[
                    'M',
                    point.plotX,
                    pointTop
                ], [
                    'L',
                    point.plotX,
                    pointBottom
                ]], connectorWidth)
        };
        if (!chart.styledMode) {
            attribs.stroke = connectorColor;
            attribs['stroke-width'] = connectorWidth;
            if (dashStyle) {
                attribs.dashstyle = dashStyle;
            }
        }
        return attribs;
    }
    /**
     * Draw connector line that connects dumbbell point's low and high values.
     * @private
     * @param {Highcharts.Point} point
     *        The point to inspect.
     */
    drawConnector(point) {
        const series = this, animationLimit = DumbbellSeries_pick(series.options.animationLimit, 250), verb = point.connector && series.chart.pointCount < animationLimit ?
            'animate' : 'attr';
        if (!point.connector) {
            point.connector = series.chart.renderer.path()
                .addClass('highcharts-lollipop-stem')
                .attr({
                zIndex: -1
            })
                .add(series.group);
        }
        point.connector[verb](this.getConnectorAttribs(point));
    }
    /**
     * Return the width and x offset of the dumbbell adjusted for grouping,
     * groupPadding, pointPadding, pointWidth etc.
     * @private
     */
    getColumnMetrics() {
        const metrics = ColumnSeries.prototype
            .getColumnMetrics.apply(this, arguments);
        metrics.offset += metrics.width / 2;
        return metrics;
    }
    /**
     * Translate each point to the plot area coordinate system and find
     * shape positions
     * @private
     */
    translate() {
        const series = this, inverted = series.chart.inverted;
        // Calculate shapeargs
        this.setShapeArgs.apply(series);
        // Calculate point low / high values
        this.translatePoint.apply(series, arguments);
        // Correct x position
        for (const point of series.points) {
            const { pointWidth, shapeArgs = {}, tooltipPos } = point;
            point.plotX = shapeArgs.x || 0;
            shapeArgs.x = point.plotX - pointWidth / 2;
            if (tooltipPos) {
                if (inverted) {
                    tooltipPos[1] = series.xAxis.len - point.plotX;
                }
                else {
                    tooltipPos[0] = point.plotX;
                }
            }
        }
        series.columnMetrics.offset -= series.columnMetrics.width / 2;
    }
    /**
     * Extend the arearange series' drawPoints method by applying a connector
     * and coloring markers.
     * @private
     */
    drawPoints() {
        const series = this, chart = series.chart, pointLength = series.points.length, seriesLowColor = series.lowColor = series.options.lowColor, seriesLowMarker = series.options.lowMarker;
        let i = 0, lowerGraphicColor, point, zoneColor;
        this.seriesDrawPoints.apply(series, arguments);
        // Draw connectors and color upper markers
        while (i < pointLength) {
            point = series.points[i];
            const [lowerGraphic, upperGraphic] = point.graphics || [];
            series.drawConnector(point);
            if (upperGraphic) {
                upperGraphic.element.point = point;
                upperGraphic.addClass('highcharts-lollipop-high');
            }
            if (point.connector) {
                point.connector.element.point = point;
            }
            if (lowerGraphic) {
                zoneColor = point.zone && point.zone.color;
                lowerGraphicColor = DumbbellSeries_pick(point.options.lowColor, seriesLowMarker?.fillColor, seriesLowColor, point.options.color, zoneColor, point.color, series.color);
                if (!chart.styledMode) {
                    lowerGraphic.attr({
                        fill: lowerGraphicColor
                    });
                }
                lowerGraphic.addClass('highcharts-lollipop-low');
            }
            i++;
        }
    }
    /**
     * Get presentational attributes.
     *
     * @private
     * @function Highcharts.seriesTypes.column#pointAttribs
     *
     * @param {Highcharts.Point} point
     *        The point to inspect.
     *
     * @param {string} state
     *        Current state of point (normal, hover, select).
     *
     * @return {Highcharts.SVGAttributes}
     *         Presentational attributes.
     */
    pointAttribs(point, state) {
        const pointAttribs = super.pointAttribs.apply(this, arguments);
        if (state === 'hover') {
            delete pointAttribs.fill;
        }
        return pointAttribs;
    }
    /**
     * Set the shape arguments for dummbells.
     * @private
     */
    setShapeArgs() {
        ColumnSeries.prototype.translate.apply(this);
        ColumnRangeSeries.prototype.afterColumnTranslate.apply(this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
DumbbellSeries.defaultOptions = merge(AreaRangeSeries.defaultOptions, Dumbbell_DumbbellSeriesDefaults);
DumbbellSeries_extend(DumbbellSeries.prototype, {
    crispCol: ColumnSeries.prototype.crispCol,
    drawGraph: noop,
    drawTracker: ColumnSeries.prototype.drawTracker,
    pointClass: Dumbbell_DumbbellPoint,
    seriesDrawPoints: AreaRangeSeries.prototype.drawPoints,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    translatePoint: AreaRangeSeries.prototype.translate
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('dumbbell', DumbbellSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Dumbbell_DumbbellSeries = ((/* unused pure expression or super */ null && (DumbbellSeries)));

;// ./code/es-modules/masters/modules/dumbbell.src.js




/* harmony default export */ const dumbbell_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});