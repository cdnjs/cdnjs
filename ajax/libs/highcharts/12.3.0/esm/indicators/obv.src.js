/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/obv
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Karol Kolodziej
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
;// ./code/es-modules/Stock/Indicators/OBV/OBVIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { isNumber, error, extend, merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The OBV series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.obv
 *
 * @augments Highcharts.Series
 */
class OBVIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const volumeSeries = series.chart.get(params.volumeSeriesID), xVal = series.xData, yVal = series.yData, OBV = [], xData = [], yData = [], hasOHLC = !isNumber(yVal[0]);
        let OBVPoint = [], i = 1, previousOBV = 0, curentOBV = 0, previousClose = 0, curentClose = 0, volume;
        // Checks if volume series exists.
        if (volumeSeries) {
            volume = volumeSeries.getColumn('y');
            // Add first point and get close value.
            OBVPoint = [xVal[0], previousOBV];
            previousClose = hasOHLC ?
                yVal[0][3] : yVal[0];
            OBV.push(OBVPoint);
            xData.push(xVal[0]);
            yData.push(OBVPoint[1]);
            for (i; i < yVal.length; i++) {
                curentClose = hasOHLC ?
                    yVal[i][3] : yVal[i];
                if (curentClose > previousClose) { // Up
                    curentOBV = previousOBV + volume[i];
                }
                else if (curentClose === previousClose) { // Constant
                    curentOBV = previousOBV;
                }
                else { // Down
                    curentOBV = previousOBV - volume[i];
                }
                // Add point.
                OBVPoint = [xVal[i], curentOBV];
                // Assign current as previous for next iteration.
                previousOBV = curentOBV;
                previousClose = curentClose;
                OBV.push(OBVPoint);
                xData.push(xVal[i]);
                yData.push(OBVPoint[1]);
            }
        }
        else {
            error('Series ' +
                params.volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, series.chart);
            return;
        }
        return {
            values: OBV,
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
 * On-Balance Volume (OBV) technical indicator. This series
 * requires the `linkedTo` option to be set and should be loaded after
 * the `stock/indicators/indicators.js` file. Through the `volumeSeriesID`
 * there also should be linked the volume series.
 *
 * @sample stock/indicators/obv
 *         OBV indicator
 *
 * @extends      plotOptions.sma
 * @since 9.1.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/obv
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @optionparent plotOptions.obv
 */
OBVIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    marker: {
        enabled: false
    },
    /**
     * @excluding index, period
     */
    params: {
        // Index and period are unchangeable, do not inherit (#15362)
        index: void 0,
        period: void 0,
        /**
         * The id of another series to use its data as volume data for the
         * indicator calculation.
         */
        volumeSeriesID: 'volume'
    },
    tooltip: {
        valueDecimals: 0
    }
});
extend(OBVIndicator.prototype, {
    nameComponents: void 0
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('obv', OBVIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const OBV_OBVIndicator = ((/* unused pure expression or super */ null && (OBVIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `OBV` series. If the [type](#series.obv.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.obv
 * @since 9.1.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/obv
 * @apioption series.obv
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/obv.src.js





/* harmony default export */ const obv_src = ((external_highcharts_src_js_default_default()));

export { obv_src as default };
