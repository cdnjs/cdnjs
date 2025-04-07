/**
 * @license Highstock JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/hollowcandlestick
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Hollow Candlestick series type for Highcharts Stock
 *
 * (c) 2010-2025 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Axis"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/hollowcandlestick", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Axis"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/hollowcandlestick"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Axis"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Axis"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__532__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 532:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__532__;

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
  "default": () => (/* binding */ hollowcandlestick_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/HollowCandlestick/HollowCandlestickPoint.js
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
 *  Imports
 *
 * */

const { seriesTypes: { candlestick: CandlestickSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
class HollowCandlestickPoint extends CandlestickSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Update class name if needed.
     * @private
     * @function Highcharts.seriesTypes.hollowcandlestick#getClassName
     */
    getClassName() {
        let className = super.getClassName.apply(this);
        const point = this, index = point.index, currentPoint = point.series.hollowCandlestickData[index];
        if (!currentPoint.isBullish && currentPoint.trendDirection === 'up') {
            className += '-bearish-up';
        }
        return className;
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HollowCandlestick_HollowCandlestickPoint = (HollowCandlestickPoint);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Axis"],"commonjs":["highcharts","Axis"],"commonjs2":["highcharts","Axis"],"root":["Highcharts","Axis"]}
var highcharts_Axis_commonjs_highcharts_Axis_commonjs2_highcharts_Axis_root_Highcharts_Axis_ = __webpack_require__(532);
var highcharts_Axis_commonjs_highcharts_Axis_commonjs2_highcharts_Axis_root_Highcharts_Axis_default = /*#__PURE__*/__webpack_require__.n(highcharts_Axis_commonjs_highcharts_Axis_commonjs2_highcharts_Axis_root_Highcharts_Axis_);
;// ./code/es-modules/Series/HollowCandlestick/HollowCandlestickSeries.js
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
 *  Imports
 *
 * */




const { seriesTypes: { candlestick: HollowCandlestickSeries_CandlestickSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());
const { addEvent, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Code
 *
 * */
/**
 * The hollowcandlestick series.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.hollowcandlestick
 *
 * @augments Highcharts.seriesTypes.candlestick
 */
class HollowCandlestickSeries extends HollowCandlestickSeries_CandlestickSeries {
    constructor() {
        /* *
         *
         * Static properties
         *
         * */
        super(...arguments);
        this.hollowCandlestickData = [];
        /* eslint-disable valid-jsdoc */
    }
    /* *
     *
     * Functions
     *
     * */
    /**
     * Iterate through all points and get their type.
     * @private
     *
     * @function Highcharts.seriesTypes.hollowcandlestick#getPriceMovement
     *
     *
     */
    getPriceMovement() {
        const series = this, table = series.allGroupedTable || series.dataTable, dataLength = table.rowCount, hollowCandlestickData = this.hollowCandlestickData;
        hollowCandlestickData.length = 0;
        let previousDataArr;
        for (let i = 0; i < dataLength; i++) {
            const dataArr = table.getRow(i, this.pointArrayMap);
            hollowCandlestickData.push(series.isBullish(dataArr, 
            // Determine the first point is bullish based on
            // its open and close values.(#21683)
            i ? previousDataArr : dataArr));
            previousDataArr = dataArr;
        }
    }
    /**
     * Return line color based on candle type.
     * @private
     *
     * @function Highcharts.seriesTypes.hollowcandlestick#getLineColor
     *
     * @param {string} trendDirection
     * Type of candle direction (bearish/bullish)(down/up).
     *
     * @return {ColorType}
     * Line color
     */
    getLineColor(trendDirection) {
        const series = this;
        // Return line color based on trend direction
        return trendDirection === 'up' ?
            series.options.upColor || "#06b535" /* Palette.positiveColor */ :
            series.options.color || "#f21313" /* Palette.negativeColor */;
    }
    /**
     * Return fill color based on candle type.
     * @private
     *
     * @function Highcharts.seriesTypes.hollowcandlestick#getPointFill
     *
     * @param {HollowcandleInfo} hollowcandleInfo
     *        Information about the current candle.
     *
     * @return {ColorType}
     * Point fill color
     */
    getPointFill(hollowcandleInfo) {
        const series = this;
        // Return fill color only for bearish candles.
        if (hollowcandleInfo.isBullish) {
            return 'transparent';
        }
        return hollowcandleInfo.trendDirection === 'up' ?
            series.options.upColor || "#06b535" /* Palette.positiveColor */ :
            series.options.color || "#f21313" /* Palette.negativeColor */;
    }
    /**
     * @private
     * @function Highcharts.seriesTypes.hollowcandlestick#init
     */
    init() {
        super.init.apply(this, arguments);
        this.hollowCandlestickData = [];
    }
    /**
     * Check if the candle is bearish or bullish. For bullish one, return true.
     * For bearish, return string depending on the previous point.
     *
     * @function Highcharts.seriesTypes.hollowcandlestick#isBullish
     *
     * @param {Array<(number)>} dataPoint
     * Current point which we calculate.
     *
     * @param {Array<(number)>} previousDataPoint
     * Previous point.
     */
    isBullish(dataPoint, previousDataPoint) {
        return {
            // Compare points' open and close value.
            isBullish: (dataPoint[0] || 0) <= (dataPoint[3] || 0),
            // For bearish candles.
            trendDirection: (dataPoint[3] || 0) < (previousDataPoint?.[3] || 0) ?
                'down' : 'up'
        };
    }
    /**
     * Add color and fill attribute for each point.
     *
     * @private
     *
     * @function Highcharts.seriesTypes.hollowcandlestick#pointAttribs
     *
     * @param {HollowCandlestickPoint} point
     * Point to which we are adding attributes.
     *
     * @param {StatesOptionsKey} state
     * Current point state.
     */
    pointAttribs(point, state) {
        const attribs = super.pointAttribs.call(this, point, state);
        let stateOptions;
        const index = point.index, hollowcandleInfo = this.hollowCandlestickData[index];
        attribs.fill = this.getPointFill(hollowcandleInfo) || attribs.fill;
        attribs.stroke = this.getLineColor(hollowcandleInfo.trendDirection) ||
            attribs.stroke;
        // Select or hover states
        if (state) {
            stateOptions = this.options.states[state];
            attribs.fill = stateOptions.color || attribs.fill;
            attribs.stroke = stateOptions.lineColor || attribs.stroke;
            attribs['stroke-width'] =
                stateOptions.lineWidth || attribs['stroke-width'];
        }
        return attribs;
    }
}
/**
 * A hollow candlestick chart is a style of financial chart used to
 * describe price movements over time.
 *
 * @sample stock/demo/hollow-candlestick/
 *         Hollow Candlestick chart
 *
 * @extends      plotOptions.candlestick
 * @product      highstock
 * @requires     modules/hollowcandlestick
 * @optionparent plotOptions.hollowcandlestick
 */
HollowCandlestickSeries.defaultOptions = merge(HollowCandlestickSeries_CandlestickSeries.defaultOptions, {
    /**
     * The fill color of the candlestick when the current
     * close is lower than the previous one.
     *
     * @sample stock/plotoptions/hollow-candlestick-color/
     *     Custom colors
     * @sample {highstock} highcharts/css/hollow-candlestick/
     *         Colors in styled mode
     *
     * @type    {ColorType}
     * @product highstock
     */
    color: "#f21313" /* Palette.negativeColor */,
    dataGrouping: {
        groupAll: true,
        groupPixelWidth: 10
    },
    /**
     * The color of the line/border of the hollow candlestick when
     * the current close is lower than the previous one.
     *
     * @sample stock/plotoptions/hollow-candlestick-color/
     *     Custom colors
     * @sample {highstock} highcharts/css/hollow-candlestick/
     *         Colors in styled mode
     *
     * @type    {ColorType}
     * @product highstock
     */
    lineColor: "#f21313" /* Palette.negativeColor */,
    /**
     * The fill color of the candlestick when the current
     * close is higher than the previous one.
     *
     * @sample stock/plotoptions/hollow-candlestick-color/
     *     Custom colors
     * @sample {highstock} highcharts/css/hollow-candlestick/
     *         Colors in styled mode
     *
     * @type    {ColorType}
     * @product highstock
     */
    upColor: "#06b535" /* Palette.positiveColor */,
    /**
     * The color of the line/border of the hollow candlestick when
     * the current close is higher than the previous one.
     *
     * @sample stock/plotoptions/hollow-candlestick-color/
     *     Custom colors
     * @sample {highstock} highcharts/css/hollow-candlestick/
     *         Colors in styled mode
     *
     * @type    {ColorType}
     * @product highstock
     */
    upLineColor: "#06b535" /* Palette.positiveColor */
});
// Force to recalculate the hollowcandlestick data set after updating data.
addEvent(HollowCandlestickSeries, 'updatedData', function () {
    if (this.hollowCandlestickData.length) {
        this.hollowCandlestickData.length = 0;
    }
});
// After processing and grouping the data,
// check if the candle is bearish or bullish.
// Required for further calculation.
addEvent((highcharts_Axis_commonjs_highcharts_Axis_commonjs2_highcharts_Axis_root_Highcharts_Axis_default()), 'postProcessData', function () {
    const axis = this, series = axis.series;
    series.forEach(function (series) {
        if (series.is('hollowcandlestick')) {
            const hollowcandlestickSeries = series;
            hollowcandlestickSeries.getPriceMovement();
        }
    });
});
/* *
 *
 *  Class Prototype
 *
 * */
HollowCandlestickSeries.prototype.pointClass = HollowCandlestick_HollowCandlestickPoint;
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('hollowcandlestick', HollowCandlestickSeries);
/* *
 *
 * Default Export
 *
 * */
/* harmony default export */ const HollowCandlestick_HollowCandlestickSeries = ((/* unused pure expression or super */ null && (HollowCandlestickSeries)));
/* *
 *
 * API Options
 *
 * */
/**
 * A `hollowcandlestick` series. If the [type](#series.candlestick.type)
 * option is not specified, it is inherited from [chart.type](
 * #chart.type).
 *
 * @type      {*}
 * @extends   series,plotOptions.hollowcandlestick
 * @excluding dataParser, dataURL, marker
 * @product   highstock
 * @apioption series.hollowcandlestick
 */
/**
 * An array of data points for the series. For the `hollowcandlestick` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 5 or 4 values. In this case, the values correspond
 *    to `x,open,high,low,close`. If the first value is a string, it is applied
 *    as the name of the point, and the `x` value is inferred. The `x` value can
 *    also be omitted, in which case the inner arrays should be of length 4.
 *    Then the `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 7, 2, 0, 4],
 *        [1, 1, 4, 2, 8],
 *        [2, 3, 3, 9, 3]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.hollowcandlestick.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        open: 9,
 *        high: 2,
 *        low: 4,
 *        close: 6,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        open: 1,
 *        high: 4,
 *        low: 7,
 *        close: 7,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @type      {Array<Array<(number|string),number,number,number>|Array<(number|string),number,number,number,number>|*>}
 * @extends   series.candlestick.data
 * @excluding y
 * @product   highstock
 * @apioption series.hollowcandlestick.data
 */
''; // Adds doclets above to transpiled

;// ./code/es-modules/masters/modules/hollowcandlestick.src.js




/* harmony default export */ const hollowcandlestick_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});