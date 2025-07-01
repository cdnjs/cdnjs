/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/dpo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
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
;// ./code/es-modules/Stock/Indicators/DPO/DPOIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend, merge, correctFloat, pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 * @private
 */
function accumulatePoints(sum, yVal, i, index, subtract) {
    const price = pick(yVal[i][index], yVal[i]);
    if (subtract) {
        return correctFloat(sum - price);
    }
    return correctFloat(sum + price);
}
/* *
 *
 *  Class
 *
 * */
/**
 * The DPO series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.dpo
 *
 * @augments Highcharts.Series
 */
class DPOIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, index = params.index, offset = Math.floor(period / 2 + 1), range = period + offset, xVal = series.xData || [], yVal = series.yData || [], yValLen = yVal.length, 
        // 0- date, 1- Detrended Price Oscillator
        DPO = [], xData = [], yData = [];
        let oscillator, periodIndex, rangeIndex, price, i, j, sum = 0;
        if (xVal.length <= range) {
            return;
        }
        // Accumulate first N-points for SMA
        for (i = 0; i < period - 1; i++) {
            sum = accumulatePoints(sum, yVal, i, index);
        }
        // Detrended Price Oscillator formula:
        // DPO = Price - Simple moving average [from (n / 2 + 1) days ago]
        for (j = 0; j <= yValLen - range; j++) {
            periodIndex = j + period - 1;
            rangeIndex = j + range - 1;
            // Adding the last period point
            sum = accumulatePoints(sum, yVal, periodIndex, index);
            price = pick(yVal[rangeIndex][index], yVal[rangeIndex]);
            oscillator = price - sum / period;
            // Subtracting the first period point
            sum = accumulatePoints(sum, yVal, j, index, true);
            DPO.push([xVal[rangeIndex], oscillator]);
            xData.push(xVal[rangeIndex]);
            yData.push(oscillator);
        }
        return {
            values: DPO,
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
 * Detrended Price Oscillator. This series requires the `linkedTo` option to
 * be set and should be loaded after the `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/dpo
 *         Detrended Price Oscillator
 *
 * @extends      plotOptions.sma
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
 *               navigatorOptions, pointInterval, pointIntervalUnit,
 *               pointPlacement, pointRange, pointStart, showInNavigator,
 *               stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/dpo
 * @optionparent plotOptions.dpo
 */
DPOIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * Parameters used in calculation of Detrended Price Oscillator series
     * points.
     */
    params: {
        index: 0,
        /**
         * Period for Detrended Price Oscillator
         */
        period: 21
    }
});
extend(DPOIndicator.prototype, {
    nameBase: 'DPO'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('dpo', DPOIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DPO_DPOIndicator = ((/* unused pure expression or super */ null && (DPOIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A Detrended Price Oscillator. If the [type](#series.dpo.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.dpo
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
 *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/dpo
 * @apioption series.dpo
 */
''; // To include the above in the js output'

;// ./code/es-modules/masters/indicators/dpo.src.js





/* harmony default export */ const dpo_src = ((external_highcharts_src_js_default_default()));

export { dpo_src as default };
