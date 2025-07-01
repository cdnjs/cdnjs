/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/zigzag
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
;// ./code/es-modules/Stock/Indicators/Zigzag/ZigzagIndicator.js
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

const { merge, extend } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Zig Zag series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.zigzag
 *
 * @augments Highcharts.Series
 */
class ZigzagIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const lowIndex = params.lowIndex, highIndex = params.highIndex, deviation = params.deviation / 100, deviations = {
            'low': 1 + deviation,
            'high': 1 - deviation
        }, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, zigzag = [], xData = [], yData = [];
        let i, j, zigzagPoint, directionUp, exitLoop = false, yIndex = false;
        // Exit if not enough points or no low or high values
        if (!xVal || xVal.length <= 1 ||
            (yValLen &&
                (typeof yVal[0][lowIndex] === 'undefined' ||
                    typeof yVal[0][highIndex] === 'undefined'))) {
            return;
        }
        // Set first zigzag point candidate
        const firstZigzagLow = yVal[0][lowIndex], firstZigzagHigh = yVal[0][highIndex];
        // Search for a second zigzag point candidate,
        // this will also set first zigzag point
        for (i = 1; i < yValLen; i++) {
            // Required change to go down
            if (yVal[i][lowIndex] <= firstZigzagHigh * deviations.high) {
                zigzag.push([xVal[0], firstZigzagHigh]);
                // Second zigzag point candidate
                zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                // Next line will be going up
                directionUp = true;
                exitLoop = true;
                // Required change to go up
            }
            else if (yVal[i][highIndex] >= firstZigzagLow * deviations.low) {
                zigzag.push([xVal[0], firstZigzagLow]);
                // Second zigzag point candidate
                zigzagPoint = [xVal[i], yVal[i][highIndex]];
                // Next line will be going down
                directionUp = false;
                exitLoop = true;
            }
            if (exitLoop) {
                xData.push(zigzag[0][0]);
                yData.push(zigzag[0][1]);
                j = i++;
                i = yValLen;
            }
        }
        // Search for next zigzags
        for (i = j; i < yValLen; i++) {
            if (directionUp) { // Next line up
                // lower when going down -> change zigzag candidate
                if (yVal[i][lowIndex] <= zigzagPoint[1]) {
                    zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                }
                // Required change to go down -> new zigzagpoint and
                // direction change
                if (yVal[i][highIndex] >=
                    zigzagPoint[1] * deviations.low) {
                    yIndex = highIndex;
                }
            }
            else { // Next line down
                // higher when going up -> change zigzag candidate
                if (yVal[i][highIndex] >= zigzagPoint[1]) {
                    zigzagPoint = [xVal[i], yVal[i][highIndex]];
                }
                // Required change to go down -> new zigzagpoint and
                // direction change
                if (yVal[i][lowIndex] <=
                    zigzagPoint[1] * deviations.high) {
                    yIndex = lowIndex;
                }
            }
            if (yIndex !== false) { // New zigzag point and direction change
                zigzag.push(zigzagPoint);
                xData.push(zigzagPoint[0]);
                yData.push(zigzagPoint[1]);
                zigzagPoint = [xVal[i], yVal[i][yIndex]];
                directionUp = !directionUp;
                yIndex = false;
            }
        }
        const zigzagLen = zigzag.length;
        // No zigzag for last point
        if (zigzagLen !== 0 &&
            zigzag[zigzagLen - 1][0] < xVal[yValLen - 1]) {
            // Set last point from zigzag candidate
            zigzag.push(zigzagPoint);
            xData.push(zigzagPoint[0]);
            yData.push(zigzagPoint[1]);
        }
        return {
            values: zigzag,
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
 * Zig Zag indicator.
 *
 * This series requires `linkedTo` option to be set.
 *
 * @sample stock/indicators/zigzag
 *         Zig Zag indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/zigzag
 * @optionparent plotOptions.zigzag
 */
ZigzagIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index, period
     */
    params: {
        // Index and period are unchangeable, do not inherit (#15362)
        index: void 0,
        period: void 0,
        /**
         * The point index which indicator calculations will base - low
         * value.
         *
         * For example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         */
        lowIndex: 2,
        /**
         * The point index which indicator calculations will base - high
         * value.
         *
         * For example using OHLC data, index=1 means the indicator will be
         * calculated using High values.
         */
        highIndex: 1,
        /**
         * The threshold for the value change.
         *
         * For example deviation=1 means the indicator will ignore all price
         * movements less than 1%.
         */
        deviation: 1
    }
});
extend(ZigzagIndicator.prototype, {
    nameComponents: ['deviation'],
    nameSuffixes: ['%'],
    nameBase: 'Zig Zag'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('zigzag', ZigzagIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Zigzag_ZigzagIndicator = ((/* unused pure expression or super */ null && (ZigzagIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Zig Zag` series. If the [type](#series.zigzag.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.zigzag
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/zigzag
 * @apioption series.zigzag
 */
''; // Adds doclets above to transpiled file

;// ./code/es-modules/masters/indicators/zigzag.src.js





/* harmony default export */ const zigzag_src = ((external_highcharts_src_js_default_default()));

export { zigzag_src as default };
