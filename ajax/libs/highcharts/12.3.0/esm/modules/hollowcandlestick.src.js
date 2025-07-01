/**
 * @license Highstock JS v12.3.0 (2025-06-21)
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
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__stock_src_js_3de69a45__ from "./stock.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// external "./stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const external_stock_src_js_namespaceObject = x({  });
;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
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

const { seriesTypes: { candlestick: CandlestickSeries } } = (external_highcharts_src_js_default_SeriesRegistry_default());
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

;// external ["../highcharts.src.js","default","Axis"]
const external_highcharts_src_js_default_Axis_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].Axis;
var external_highcharts_src_js_default_Axis_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Axis_namespaceObject);
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




const { seriesTypes: { candlestick: HollowCandlestickSeries_CandlestickSeries } } = (external_highcharts_src_js_default_SeriesRegistry_default());
const { addEvent, merge } = (external_highcharts_src_js_default_default());
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
addEvent((external_highcharts_src_js_default_Axis_default()), 'postProcessData', function () {
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
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('hollowcandlestick', HollowCandlestickSeries);
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





/* harmony default export */ const hollowcandlestick_src = ((external_highcharts_src_js_default_default()));

export { hollowcandlestick_src as default };
