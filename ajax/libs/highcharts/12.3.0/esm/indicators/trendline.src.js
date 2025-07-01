/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/trendline
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
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
;// ./code/es-modules/Stock/Indicators/TrendLine/TrendLineIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend, merge, isArray } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Trend line series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.trendline
 *
 * @augments Highcharts.Series
 */
class TrendLineIndicator extends SMAIndicator {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.updateAllPoints = true;
    }
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const orgXVal = series.xData, yVal = series.yData, xVal = [], LR = [], xData = [], yData = [], index = params.index;
        let numerator = 0, denominator = 0, xValSum = 0, yValSum = 0, counter = 0;
        // Create an array of consecutive xValues, (don't remove duplicates)
        for (let i = 0; i < orgXVal.length; i++) {
            if (i === 0 || orgXVal[i] !== orgXVal[i - 1]) {
                counter++;
            }
            xVal.push(counter);
        }
        for (let i = 0; i < xVal.length; i++) {
            xValSum += xVal[i];
            yValSum += isArray(yVal[i]) ? yVal[i][index] : yVal[i];
        }
        const meanX = xValSum / xVal.length, meanY = yValSum / yVal.length;
        for (let i = 0; i < xVal.length; i++) {
            const y = isArray(yVal[i]) ? yVal[i][index] : yVal[i];
            numerator += (xVal[i] - meanX) * (y - meanY);
            denominator += Math.pow(xVal[i] - meanX, 2);
        }
        // Calculate linear regression:
        for (let i = 0; i < xVal.length; i++) {
            // Check if the xVal is already used
            if (orgXVal[i] === xData[xData.length - 1]) {
                continue;
            }
            const x = orgXVal[i], y = meanY + (numerator / denominator) * (xVal[i] - meanX);
            LR.push([x, y]);
            xData.push(x);
            yData.push(y);
        }
        return {
            xData: xData,
            yData: yData,
            values: LR
        };
    }
}
/**
 * Trendline (linear regression) fits a straight line to the selected data
 * using a method called the Sum Of Least Squares. This series requires the
 * `linkedTo` option to be set.
 *
 * @sample stock/indicators/trendline
 *         Trendline indicator
 *
 * @extends      plotOptions.sma
 * @since        7.1.3
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/trendline
 * @optionparent plotOptions.trendline
 */
TrendLineIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding period
     */
    params: {
        period: void 0, // Unchangeable period, do not inherit (#15362)
        /**
         * The point index which indicator calculations will base. For
         * example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         *
         * @default 3
         */
        index: 3
    }
});
extend(TrendLineIndicator.prototype, {
    nameBase: 'Trendline',
    nameComponents: void 0
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('trendline', TrendLineIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const TrendLine_TrendLineIndicator = ((/* unused pure expression or super */ null && (TrendLineIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `TrendLine` series. If the [type](#series.trendline.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.trendline
 * @since     7.1.3
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/trendline
 * @apioption series.trendline
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/trendline.src.js





/* harmony default export */ const trendline_src = ((external_highcharts_src_js_default_default()));

export { trendline_src as default };
