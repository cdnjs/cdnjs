/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/disparity-index
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2025 Rafal Sebestjanski
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
;// ./code/es-modules/Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js
/* *
 *  (c) 2010-2025 Rafal Sebestjanski
 *
 *  Disparity Index technical indicator for Highcharts Stock
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { correctFloat, defined, extend, isArray, merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Disparity Index series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.disparityindex
 *
 * @augments Highcharts.Series
 */
class DisparityIndexIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    init() {
        const args = arguments, ctx = this, // Disparity Index indicator
        params = args[1].params, // Options.params
        averageType = params && params.average ? params.average : void 0;
        ctx.averageIndicator = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes[averageType] || SMAIndicator;
        ctx.averageIndicator.prototype.init.apply(ctx, args);
    }
    calculateDisparityIndex(curPrice, periodAverage) {
        return correctFloat(curPrice - periodAverage) / periodAverage * 100;
    }
    getValues(series, params) {
        const index = params.index, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, disparityIndexPoint = [], xData = [], yData = [], 
        // "as any" because getValues doesn't exist on typeof Series
        averageIndicator = this.averageIndicator, isOHLC = isArray(yVal[0]), 
        // Get the average indicator's values
        values = averageIndicator.prototype.getValues(series, params), yValues = values.yData, start = xVal.indexOf(values.xData[0]);
        // Check period, if bigger than points length, skip
        if (!yValues || yValues.length === 0 ||
            !defined(index) ||
            yVal.length <= start) {
            return;
        }
        // Get the Disparity Index indicator's values
        for (let i = start; i < yValLen; i++) {
            const disparityIndexValue = this.calculateDisparityIndex(isOHLC ? yVal[i][index] : yVal[i], yValues[i - start]);
            disparityIndexPoint.push([
                xVal[i],
                disparityIndexValue
            ]);
            xData.push(xVal[i]);
            yData.push(disparityIndexValue);
        }
        return {
            values: disparityIndexPoint,
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
 * Disparity Index.
 * This series requires the `linkedTo` option to be set and should
 * be loaded after the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/disparity-index
 *         Disparity Index indicator
 *
 * @extends      plotOptions.sma
 * @since 9.1.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/disparity-index
 * @optionparent plotOptions.disparityindex
 */
DisparityIndexIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        /**
         * The average used to calculate the Disparity Index indicator.
         * By default it uses SMA, with EMA as an option. To use other
         * averages, e.g. TEMA, the `stock/indicators/tema.js` file needs to
         * be loaded.
         *
         * If value is different than `ema`, `dema`, `tema` or `wma`,
         * then sma is used.
         */
        average: 'sma',
        index: 3
    },
    marker: {
        enabled: false
    },
    dataGrouping: {
        approximation: 'averages'
    }
});
extend(DisparityIndexIndicator.prototype, {
    nameBase: 'Disparity Index',
    nameComponents: ['period', 'average']
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('disparityindex', DisparityIndexIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DisparityIndex_DisparityIndexIndicator = ((/* unused pure expression or super */ null && (DisparityIndexIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * The Disparity Index indicator series.
 * If the [type](#series.disparityindex.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.disparityindex
 * @since 9.1.0
 * @product   highstock
 * @excluding allAreas, colorAxis,  dataParser, dataURL, joinBy, keys,
 *            navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/disparity-index
 * @apioption series.disparityindex
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/disparity-index.src.js





/* harmony default export */ const disparity_index_src = ((external_highcharts_src_js_default_default()));

export { disparity_index_src as default };
