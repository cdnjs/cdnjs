/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/roc
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
;// ./code/es-modules/Stock/Indicators/ROC/ROCIndicator.js
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

const { isArray, merge, extend } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 *
 */
function populateAverage(xVal, yVal, i, period, index) {
    /* Calculated as:

       (Closing Price [today] - Closing Price [n days ago]) /
        Closing Price [n days ago] * 100

       Return y as null when avoiding division by zero */
    let nDaysAgoY, rocY;
    if (index < 0) {
        // Y data given as an array of values
        nDaysAgoY = yVal[i - period];
        rocY = nDaysAgoY ?
            (yVal[i] - nDaysAgoY) / nDaysAgoY * 100 :
            null;
    }
    else {
        // Y data given as an array of arrays and the index should be used
        nDaysAgoY = yVal[i - period][index];
        rocY = nDaysAgoY ?
            (yVal[i][index] - nDaysAgoY) / nDaysAgoY * 100 :
            null;
    }
    return [xVal[i], rocY];
}
/* *
 *
 *  Class
 *
 * */
/**
 * The ROC series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.roc
 *
 * @augments Highcharts.Series
 */
class ROCIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, ROC = [], xData = [], yData = [];
        let i, index = -1, ROCPoint;
        // Period is used as a number of time periods ago, so we need more
        // (at least 1 more) data than the period value
        if (xVal.length <= period) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (isArray(yVal[0])) {
            index = params.index;
        }
        // I = period <-- skip first N-points
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen; i++) {
            ROCPoint = populateAverage(xVal, yVal, i, period, index);
            ROC.push(ROCPoint);
            xData.push(ROCPoint[0]);
            yData.push(ROCPoint[1]);
        }
        return {
            values: ROC,
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
 * Rate of change indicator (ROC). The indicator value for each point
 * is defined as:
 *
 * `(C - Cn) / Cn * 100`
 *
 * where: `C` is the close value of the point of the same x in the
 * linked series and `Cn` is the close value of the point `n` periods
 * ago. `n` is set through [period](#plotOptions.roc.params.period).
 *
 * This series requires `linkedTo` option to be set.
 *
 * @sample stock/indicators/roc
 *         Rate of change indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/roc
 * @optionparent plotOptions.roc
 */
ROCIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        index: 3,
        period: 9
    }
});
extend(ROCIndicator.prototype, {
    nameBase: 'Rate of Change'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('roc', ROCIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ROC_ROCIndicator = ((/* unused pure expression or super */ null && (ROCIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `ROC` series. If the [type](#series.wma.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * Rate of change indicator (ROC). The indicator value for each point
 * is defined as:
 *
 * `(C - Cn) / Cn * 100`
 *
 * where: `C` is the close value of the point of the same x in the
 * linked series and `Cn` is the close value of the point `n` periods
 * ago. `n` is set through [period](#series.roc.params.period).
 *
 * This series requires `linkedTo` option to be set.
 *
 * @extends   series,plotOptions.roc
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/roc
 * @apioption series.roc
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/roc.src.js





/* harmony default export */ const roc_src = ((external_highcharts_src_js_default_default()));

export { roc_src as default };
