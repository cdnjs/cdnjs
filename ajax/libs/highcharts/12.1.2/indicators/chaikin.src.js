/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/chaikin
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/indicators/chaikin", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/indicators/chaikin"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ chaikin_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Stock/Indicators/AD/ADIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 * */


const { sma: SMAIndicator } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { error, extend, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The AD series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ad
 *
 * @augments Highcharts.Series
 */
class ADIndicator extends SMAIndicator {
    /* *
     *
     *  Static Functions
     *
     * */
    static populateAverage(xVal, yVal, yValVolume, i, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _period) {
        const high = yVal[i][1], low = yVal[i][2], close = yVal[i][3], volume = yValVolume[i], adY = close === high && close === low || high === low ?
            0 :
            ((2 * close - low - high) / (high - low)) * volume, adX = xVal[i];
        return [adX, adY];
    }
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, volumeSeriesID = params.volumeSeriesID, volumeSeries = series.chart.get(volumeSeriesID), yValVolume = volumeSeries?.getColumn('y'), yValLen = yVal ? yVal.length : 0, AD = [], xData = [], yData = [];
        let len, i, ADPoint;
        if (xVal.length <= period &&
            yValLen &&
            yVal[0].length !== 4) {
            return;
        }
        if (!volumeSeries) {
            error('Series ' +
                volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, series.chart);
            return;
        }
        // When i = period <-- skip first N-points
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen; i++) {
            len = AD.length;
            ADPoint = ADIndicator.populateAverage(xVal, yVal, yValVolume, i, period);
            if (len > 0) {
                ADPoint[1] += AD[len - 1][1];
            }
            AD.push(ADPoint);
            xData.push(ADPoint[0]);
            yData.push(ADPoint[1]);
        }
        return {
            values: AD,
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
 * Accumulation Distribution (AD). This series requires `linkedTo` option to
 * be set.
 *
 * @sample stock/indicators/accumulation-distribution
 *         Accumulation/Distribution indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/accumulation-distribution
 * @optionparent plotOptions.ad
 */
ADIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0, // Unused index, do not inherit (#15362)
        /**
         * The id of volume series which is mandatory.
         * For example using OHLC data, volumeSeriesID='volume' means
         * the indicator will be calculated using OHLC and volume values.
         *
         * @since 6.0.0
         */
        volumeSeriesID: 'volume'
    }
});
extend(ADIndicator.prototype, {
    nameComponents: false,
    nameBase: 'Accumulation/Distribution'
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('ad', ADIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AD_ADIndicator = (ADIndicator);
/* *
 *
 *  API Options
 *
 * */
/**
 * A `AD` series. If the [type](#series.ad.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.ad
 * @since     6.0.0
 * @excluding dataParser, dataURL
 * @product   highstock
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/accumulation-distribution
 * @apioption series.ad
 */
''; // Add doclet above to transpiled file

;// ./code/es-modules/Stock/Indicators/Chaikin/ChaikinIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

 // For historic reasons, AD is built into Chaikin

const { ema: EMAIndicator } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { correctFloat, extend: ChaikinIndicator_extend, merge: ChaikinIndicator_merge, error: ChaikinIndicator_error } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Chaikin series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.chaikin
 *
 * @augments Highcharts.Series
 */
class ChaikinIndicator extends EMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const periods = params.periods, period = params.period, 
        // 0- date, 1- Chaikin Oscillator
        CHA = [], xData = [], yData = [];
        let oscillator, i;
        // Check if periods are correct
        if (periods.length !== 2 || periods[1] <= periods[0]) {
            ChaikinIndicator_error('Error: "Chaikin requires two periods. Notice, first ' +
                'period should be lower than the second one."');
            return;
        }
        // Accumulation Distribution Line data
        const ADL = AD_ADIndicator.prototype.getValues.call(this, series, {
            volumeSeriesID: params.volumeSeriesID,
            period: period
        });
        // Check if adl is calculated properly, if not skip
        if (!ADL) {
            return;
        }
        // Shorter Period EMA
        const SPE = super.getValues.call(this, ADL, {
            period: periods[0]
        });
        // Longer Period EMA
        const LPE = super.getValues.call(this, ADL, {
            period: periods[1]
        });
        // Check if ema is calculated properly, if not skip
        if (!SPE || !LPE) {
            return;
        }
        const periodsOffset = periods[1] - periods[0];
        for (i = 0; i < LPE.yData.length; i++) {
            oscillator = correctFloat(SPE.yData[i + periodsOffset] -
                LPE.yData[i]);
            CHA.push([LPE.xData[i], oscillator]);
            xData.push(LPE.xData[i]);
            yData.push(oscillator);
        }
        return {
            values: CHA,
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
 * Chaikin Oscillator. This series requires the `linkedTo` option to
 * be set and should be loaded after the `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/chaikin
 *         Chaikin Oscillator
 *
 * @extends      plotOptions.ema
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/chaikin
 * @optionparent plotOptions.chaikin
 */
ChaikinIndicator.defaultOptions = ChaikinIndicator_merge(EMAIndicator.defaultOptions, {
    /**
     * Parameters used in calculation of Chaikin Oscillator
     * series points.
     *
     * @excluding index
     */
    params: {
        index: void 0, // Unused index, do not inherit (#15362)
        /**
         * The id of volume series which is mandatory.
         * For example using OHLC data, volumeSeriesID='volume' means
         * the indicator will be calculated using OHLC and volume values.
         */
        volumeSeriesID: 'volume',
        /**
         * Parameter used indirectly for calculating the `AD` indicator.
         * Decides about the number of data points that are taken
         * into account for the indicator calculations.
         */
        period: 9,
        /**
         * Periods for Chaikin Oscillator calculations.
         *
         * @type    {Array<number>}
         * @default [3, 10]
         */
        periods: [3, 10]
    }
});
ChaikinIndicator_extend(ChaikinIndicator.prototype, {
    nameBase: 'Chaikin Osc',
    nameComponents: ['periods']
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('chaikin', ChaikinIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Chaikin_ChaikinIndicator = ((/* unused pure expression or super */ null && (ChaikinIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Chaikin Oscillator` series. If the [type](#series.chaikin.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.chaikin
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
 *            navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, stacking, showInNavigator
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/chaikin
 * @apioption series.chaikin
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/chaikin.src.js




/* harmony default export */ const chaikin_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});