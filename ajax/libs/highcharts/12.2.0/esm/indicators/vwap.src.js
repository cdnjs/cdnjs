/**
 * @license Highstock JS v12.2.0 (2025-04-07)
 * @module highcharts/indicators/vwap
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Dalek
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
;// ./code/es-modules/Stock/Indicators/VWAP/VWAPIndicator.js
/* *
 *
 *  (c) 2010-2025 Paweł Dalek
 *
 *  Volume Weighted Average Price (VWAP) indicator for Highcharts Stock
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { error, isArray, merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Volume Weighted Average Price (VWAP) series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.vwap
 *
 * @augments Highcharts.Series
 */
class VWAPIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const indicator = this, chart = series.chart, xValues = series.xData, yValues = series.yData, period = params.period;
        let isOHLC = true, volumeSeries;
        // Checks if volume series exists
        if (!(volumeSeries = (chart.get(params.volumeSeriesID)))) {
            error('Series ' +
                params.volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, chart);
            return;
        }
        // Checks if series data fits the OHLC format
        if (!(isArray(yValues[0]))) {
            isOHLC = false;
        }
        return indicator.calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period);
    }
    /**
     * Main algorithm used to calculate Volume Weighted Average Price (VWAP)
     * values
     *
     * @private
     *
     * @param {boolean} isOHLC
     * Says if data has OHLC format
     *
     * @param {Array<number>} xValues
     * Array of timestamps
     *
     * @param {Array<number|Array<number,number,number,number>>} yValues
     * Array of yValues, can be an array of a four arrays (OHLC) or array of
     * values (line)
     *
     * @param {Array<*>} volumeSeries
     * Volume series
     *
     * @param {number} period
     * Number of points to be calculated
     *
     * @return {Object}
     * Object contains computed VWAP
     **/
    calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period) {
        const volumeValues = volumeSeries.getColumn('y'), volumeLength = volumeValues.length, pointsLength = xValues.length, cumulativePrice = [], cumulativeVolume = [], xData = [], yData = [], VWAP = [];
        let commonLength, typicalPrice, cPrice, cVolume, i, j;
        if (pointsLength <= volumeLength) {
            commonLength = pointsLength;
        }
        else {
            commonLength = volumeLength;
        }
        for (i = 0, j = 0; i < commonLength; i++) {
            // Depending on whether series is OHLC or line type, price is
            // average of the high, low and close or a simple value
            typicalPrice = isOHLC ?
                ((yValues[i][1] + yValues[i][2] +
                    yValues[i][3]) / 3) :
                yValues[i];
            typicalPrice *= volumeValues[i];
            cPrice = j ?
                (cumulativePrice[i - 1] + typicalPrice) :
                typicalPrice;
            cVolume = j ?
                (cumulativeVolume[i - 1] + volumeValues[i]) :
                volumeValues[i];
            cumulativePrice.push(cPrice);
            cumulativeVolume.push(cVolume);
            VWAP.push([xValues[i], (cPrice / cVolume)]);
            xData.push(VWAP[i][0]);
            yData.push(VWAP[i][1]);
            j++;
            if (j === period) {
                j = 0;
            }
        }
        return {
            values: VWAP,
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
 * Volume Weighted Average Price indicator.
 *
 * This series requires `linkedTo` option to be set.
 *
 * @sample stock/indicators/vwap
 *         Volume Weighted Average Price indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/vwap
 * @optionparent plotOptions.vwap
 */
VWAPIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0, // Unchangeable index, do not inherit (#15362)
        period: 30,
        /**
         * The id of volume series which is mandatory. For example using
         * OHLC data, volumeSeriesID='volume' means the indicator will be
         * calculated using OHLC and volume values.
         */
        volumeSeriesID: 'volume'
    }
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('vwap', VWAPIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const VWAP_VWAPIndicator = ((/* unused pure expression or super */ null && (VWAPIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Volume Weighted Average Price (VWAP)` series. If the
 * [type](#series.vwap.type) option is not specified, it is inherited from
 * [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.vwap
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/vwap
 * @apioption series.vwap
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/vwap.src.js





/* harmony default export */ const vwap_src = ((external_highcharts_src_js_default_default()));

export { vwap_src as default };
