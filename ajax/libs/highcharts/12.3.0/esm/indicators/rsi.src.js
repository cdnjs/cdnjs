/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/rsi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Fus
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
;// ./code/es-modules/Stock/Indicators/RSI/RSIIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { isNumber, merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 *
 */
function toFixed(a, n) {
    return parseFloat(a.toFixed(n));
}
/* *
 *
 *  Class
 *
 * */
/**
 * The RSI series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.rsi
 *
 * @augments Highcharts.Series
 */
class RSIIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, decimals = params.decimals, 
        // RSI starts calculations from the second point
        // Cause we need to calculate change between two points
        RSI = [], xData = [], yData = [];
        let gain = 0, loss = 0, index = params.index, range = 1, RSIPoint, change, avgGain, avgLoss, i, values;
        if ((xVal.length < period)) {
            return;
        }
        if (isNumber(yVal[0])) {
            values = yVal;
        }
        else {
            // In case of the situation, where the series type has data length
            // longer then 4 (HLC, range), this ensures that we are not trying
            // to reach the index out of bounds
            index = Math.min(index, yVal[0].length - 1);
            values = yVal
                .map((value) => value[index]);
        }
        // Calculate changes for first N points
        while (range < period) {
            change = toFixed(values[range] - values[range - 1], decimals);
            if (change > 0) {
                gain += change;
            }
            else {
                loss += Math.abs(change);
            }
            range++;
        }
        // Average for first n-1 points:
        avgGain = toFixed(gain / (period - 1), decimals);
        avgLoss = toFixed(loss / (period - 1), decimals);
        for (i = range; i < yValLen; i++) {
            change = toFixed(values[i] - values[i - 1], decimals);
            if (change > 0) {
                gain = change;
                loss = 0;
            }
            else {
                gain = 0;
                loss = Math.abs(change);
            }
            // Calculate smoothed averages, RS, RSI values:
            avgGain = toFixed((avgGain * (period - 1) + gain) / period, decimals);
            avgLoss = toFixed((avgLoss * (period - 1) + loss) / period, decimals);
            // If average-loss is equal zero, then by definition RSI is set
            // to 100:
            if (avgLoss === 0) {
                RSIPoint = 100;
                // If average-gain is equal zero, then by definition RSI is set
                // to 0:
            }
            else if (avgGain === 0) {
                RSIPoint = 0;
            }
            else {
                RSIPoint = toFixed(100 - (100 / (1 + (avgGain / avgLoss))), decimals);
            }
            RSI.push([xVal[i], RSIPoint]);
            xData.push(xVal[i]);
            yData.push(RSIPoint);
        }
        return {
            values: RSI,
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
 * Relative strength index (RSI) technical indicator. This series
 * requires the `linkedTo` option to be set and should be loaded after
 * the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/rsi
 *         RSI indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/rsi
 * @optionparent plotOptions.rsi
 */
RSIIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        decimals: 4,
        index: 3
    }
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('rsi', RSIIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const RSI_RSIIndicator = ((/* unused pure expression or super */ null && (RSIIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `RSI` series. If the [type](#series.rsi.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.rsi
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/rsi
 * @apioption series.rsi
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/rsi.src.js





/* harmony default export */ const rsi_src = ((external_highcharts_src_js_default_default()));

export { rsi_src as default };
