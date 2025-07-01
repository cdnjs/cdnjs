/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/cmo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Lysy
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
;// ./code/es-modules/Stock/Indicators/CMO/CMOIndicator.js
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
 *  Class
 *
 * */
/**
 * The CMO series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.cmo
 *
 * @augments Highcharts.Series
 */
class CMOIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, CMO = [], xData = [], yData = [];
        let i, index = params.index, values;
        if (xVal.length < period) {
            return;
        }
        if (isNumber(yVal[0])) {
            values = yVal;
        }
        else {
            // In case of the situation, where the series type has data length
            // shorter then 4 (HLC, range), this ensures that we are not trying
            // to reach the index out of bounds
            index = Math.min(index, yVal[0].length - 1);
            values = yVal.map((value) => value[index]);
        }
        let firstAddedSum = 0, sumOfHigherValues = 0, sumOfLowerValues = 0, y;
        // Calculate first point, check if the first value
        // was added to sum of higher/lower values, and what was the value.
        for (let j = period; j > 0; j--) {
            if (values[j] > values[j - 1]) {
                sumOfHigherValues += values[j] - values[j - 1];
            }
            else if (values[j] < values[j - 1]) {
                sumOfLowerValues += values[j - 1] - values[j];
            }
        }
        // You might divide by 0 if all values are equal,
        // so return 0 in this case.
        y =
            sumOfHigherValues + sumOfLowerValues > 0 ?
                (100 * (sumOfHigherValues - sumOfLowerValues)) /
                    (sumOfHigherValues + sumOfLowerValues) :
                0;
        xData.push(xVal[period]);
        yData.push(y);
        CMO.push([xVal[period], y]);
        for (i = period + 1; i < yValLen; i++) {
            firstAddedSum = Math.abs(values[i - period - 1] - values[i - period]);
            if (values[i] > values[i - 1]) {
                sumOfHigherValues += values[i] - values[i - 1];
            }
            else if (values[i] < values[i - 1]) {
                sumOfLowerValues += values[i - 1] - values[i];
            }
            // Check, to which sum was the first value added to,
            // and subtract this value from given sum.
            if (values[i - period] > values[i - period - 1]) {
                sumOfHigherValues -= firstAddedSum;
            }
            else {
                sumOfLowerValues -= firstAddedSum;
            }
            // Same as above.
            y =
                sumOfHigherValues + sumOfLowerValues > 0 ?
                    (100 * (sumOfHigherValues - sumOfLowerValues)) /
                        (sumOfHigherValues + sumOfLowerValues) :
                    0;
            xData.push(xVal[i]);
            yData.push(y);
            CMO.push([xVal[i], y]);
        }
        return {
            values: CMO,
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
 * Chande Momentum Oscilator (CMO) technical indicator. This series
 * requires the `linkedTo` option to be set and should be loaded after
 * the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/cmo
 *         CMO indicator
 *
 * @extends      plotOptions.sma
 * @since 9.1.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/cmo
 * @optionparent plotOptions.cmo
 */
CMOIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        period: 20,
        index: 3
    }
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('cmo', CMOIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const CMO_CMOIndicator = ((/* unused pure expression or super */ null && (CMOIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `CMO` series. If the [type](#series.cmo.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.cmo
 * @since 9.1.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/cmo
 * @apioption series.cmo
 */
(''); // To include the above in the js output

;// ./code/es-modules/masters/indicators/cmo.src.js





/* harmony default export */ const cmo_src = ((external_highcharts_src_js_default_default()));

export { cmo_src as default };
