/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/heikinashi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * HeikinAshi series type for Highcharts Stock
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
;// ./code/es-modules/Series/HeikinAshi/HeikinAshiPoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { candlestick: { prototype: { pointClass: CandlestickPoint } }, hlc: { prototype: { 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
pointClass: HLCPoint } } } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;
/* *
 *
 *  Class
 *
 * */
class HeikinAshiPoint extends CandlestickPoint {
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HeikinAshi_HeikinAshiPoint = (HeikinAshiPoint);

;// ./code/es-modules/Series/HeikinAshi/HeikinAshiSeriesDefaults.js
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
 * An HeikinAshi series is a style of financial chart used to describe price
 * movements over time. It displays open, high, low and close values per
 * data point.
 *
 * @sample stock/demo/heikinashi/
 *         Heikin Ashi series
 *
 * @extends      plotOptions.candlestick
 * @product      highstock
 * @requires     modules/heikinashi
 * @optionparent plotOptions.heikinashi
 */
const HeikinAshiDefaults = {
    dataGrouping: {
        groupAll: true
    }
};
/**
 * A `heikinashi` series. If the [type](#series.heikinashi.type)
 * option is not specified, it is inherited from [chart.type](
 * #chart.type).
 *
 * @type      {*}
 * @extends   series,plotOptions.heikinashi
 * @excluding dataParser, dataURL, marker
 * @product   highstock
 * @requires  modules/heikinashi
 * @apioption series.heikinashi
 */
/**
 * An array of data points for the series. For the `heikinashi` series
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
 *    [turboThreshold](#series.heikinashi.turboThreshold), this option is not
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
 * @apioption series.heikinashi.data
 */
''; // Adds doclets above to transpiled
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HeikinAshiSeriesDefaults = (HeikinAshiDefaults);

;// ./code/es-modules/Series/HeikinAshi/HeikinAshiSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { composed } = (external_highcharts_src_js_default_default());



const { candlestick: CandlestickSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { addEvent, merge, pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * After processing and grouping the data, calculate how the heikeinashi data
 * set should look like.
 * @private
 */
function onAxisPostProcessData() {
    const series = this.series;
    series.forEach((series) => {
        if (series.is('heikinashi')) {
            const heikinashiSeries = series;
            heikinashiSeries.heikiashiData.length = 0;
            heikinashiSeries.getHeikinashiData();
        }
    });
}
/**
 * Assign heikinashi data into the points.
 * @private
 * @todo move to HeikinAshiPoint class
 */
function onHeikinAshiSeriesAfterTranslate() {
    const series = this, points = series.points, heikiashiData = series.heikiashiData, cropStart = series.cropStart || 0;
    // Modify points.
    for (let i = 0; i < points.length; i++) {
        const point = points[i], heikiashiDataPoint = heikiashiData[i + cropStart];
        point.open = heikiashiDataPoint[0];
        point.high = heikiashiDataPoint[1];
        point.low = heikiashiDataPoint[2];
        point.close = heikiashiDataPoint[3];
    }
}
/**
 * Force to recalculate the heikinashi data set after updating data.
 * @private
 */
function onHeikinAshiSeriesUpdatedData() {
    if (this.heikiashiData.length) {
        this.heikiashiData.length = 0;
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The Heikin Ashi series.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.heikinashi
 *
 * @augments Highcharts.Series
 */
class HeikinAshiSeries extends CandlestickSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.heikiashiData = [];
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(SeriesClass, AxisClass) {
        CandlestickSeries.compose(SeriesClass);
        if (pushUnique(composed, 'HeikinAshi')) {
            addEvent(AxisClass, 'postProcessData', onAxisPostProcessData);
            addEvent(HeikinAshiSeries, 'afterTranslate', onHeikinAshiSeriesAfterTranslate);
            addEvent(HeikinAshiSeries, 'updatedData', onHeikinAshiSeriesUpdatedData);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculate data set for the heikinashi series before creating the points.
     * @private
     */
    getHeikinashiData() {
        const series = this, table = series.allGroupedTable || series.dataTable, dataLength = table.rowCount, heikiashiData = series.heikiashiData;
        if (!heikiashiData.length && dataLength) {
            // Modify the first point.
            this.modifyFirstPointValue(table.getRow(0, this.pointArrayMap));
            // Modify other points.
            for (let i = 1; i < dataLength; i++) {
                this.modifyDataPoint(table.getRow(i, this.pointArrayMap), heikiashiData[i - 1]);
            }
        }
        series.heikiashiData = heikiashiData;
    }
    /**
     * @private
     */
    init() {
        super.init.apply(this, arguments);
        this.heikiashiData = [];
    }
    /**
     * Calculate and modify the first data point value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     */
    modifyFirstPointValue(dataPoint) {
        const open = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, close = (dataPoint[0] + dataPoint[3]) / 2;
        this.heikiashiData.push([open, dataPoint[1], dataPoint[2], close]);
    }
    /**
     * Calculate and modify the data point's value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     * @param {Array<(number)>} previousDataPoint
     *        Previous data point.
     */
    modifyDataPoint(dataPoint, previousDataPoint) {
        const newOpen = (previousDataPoint[0] + previousDataPoint[3]) / 2, newClose = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, newHigh = Math.max(dataPoint[1], newClose, newOpen), newLow = Math.min(dataPoint[2], newClose, newOpen);
        // Add new points to the array in order to properly calculate extremes.
        this.heikiashiData.push([newOpen, newHigh, newLow, newClose]);
    }
}
HeikinAshiSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, HeikinAshiSeriesDefaults);
/* *
 *
 *  Class Prototype
 *
 * */
HeikinAshiSeries.prototype.pointClass = HeikinAshi_HeikinAshiPoint;
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('heikinashi', HeikinAshiSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HeikinAshi_HeikinAshiSeries = (HeikinAshiSeries);

;// ./code/es-modules/masters/modules/heikinashi.src.js





const G = (external_highcharts_src_js_default_default());
HeikinAshi_HeikinAshiSeries.compose(G.Series, G.Axis);
/* harmony default export */ const heikinashi_src = ((external_highcharts_src_js_default_default()));

export { heikinashi_src as default };
