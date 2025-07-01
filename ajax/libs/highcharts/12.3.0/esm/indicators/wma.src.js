/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/wma
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__modules_stock_src_js_b3d80146__ from "../modules/stock.src.js";
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
;// external "../modules/stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const stock_src_js_namespaceObject = x({  });
;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// ./code/es-modules/Stock/Indicators/WMA/WMAIndicator.js
/* *
 *
 *  (c) 2010-2025 Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { isArray, merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 * @private
 */
function accumulateAverage(points, xVal, yVal, i, index) {
    const xValue = xVal[i], yValue = index < 0 ? yVal[i] : yVal[i][index];
    points.push([xValue, yValue]);
}
/**
 * @private
 */
function weightedSumArray(array, pLen) {
    // The denominator is the sum of the number of days as a triangular number.
    // If there are 5 days, the triangular numbers are 5, 4, 3, 2, and 1.
    // The sum is 5 + 4 + 3 + 2 + 1 = 15.
    const denominator = (pLen + 1) / 2 * pLen;
    // Reduce VS loop => reduce
    return array.reduce(function (prev, cur, i) {
        return [null, prev[1] + cur[1] * (i + 1)];
    })[1] / denominator;
}
/**
 * @private
 */
function populateAverage(points, xVal, yVal, i) {
    const pLen = points.length, wmaY = weightedSumArray(points, pLen), wmaX = xVal[i - 1];
    points.shift(); // Remove point until range < period
    return [wmaX, wmaY];
}
/* *
 *
 *  Class
 *
 * */
/**
 * The SMA series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.wma
 *
 * @augments Highcharts.Series
 */
class WMAIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, xValue = xVal[0], wma = [], xData = [], yData = [];
        let range = 1, index = -1, i, wmaPoint, yValue = yVal[0];
        if (xVal.length < period) {
            return;
        }
        // Switch index for OHLC / Candlestick
        if (isArray(yVal[0])) {
            index = params.index;
            yValue = yVal[0][index];
        }
        // Starting point
        const points = [[xValue, yValue]];
        // Accumulate first N-points
        while (range !== period) {
            accumulateAverage(points, xVal, yVal, range, index);
            range++;
        }
        // Calculate value one-by-one for each period in visible data
        for (i = range; i < yValLen; i++) {
            wmaPoint = populateAverage(points, xVal, yVal, i);
            wma.push(wmaPoint);
            xData.push(wmaPoint[0]);
            yData.push(wmaPoint[1]);
            accumulateAverage(points, xVal, yVal, i, index);
        }
        wmaPoint = populateAverage(points, xVal, yVal, i);
        wma.push(wmaPoint);
        xData.push(wmaPoint[0]);
        yData.push(wmaPoint[1]);
        return {
            values: wma,
            xData: xData,
            yData: yData
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Weighted moving average indicator (WMA). This series requires `linkedTo`
 * option to be set.
 *
 * @sample stock/indicators/wma
 *         Weighted moving average indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/wma
 * @optionparent plotOptions.wma
 */
WMAIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        index: 3,
        period: 9
    }
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('wma', WMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const WMA_WMAIndicator = ((/* unused pure expression or super */ null && (WMAIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `WMA` series. If the [type](#series.wma.type) option is not specified, it
 * is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.wma
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/wma
 * @apioption series.wma
 */
''; // Adds doclet above to the transpiled file

;// ./code/es-modules/masters/indicators/wma.src.js





/* harmony default export */ const wma_src = ((external_highcharts_src_js_default_default()));

export { wma_src as default };
