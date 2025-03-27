/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/tema
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/indicators/tema", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/indicators/tema"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
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
  "default": () => (/* binding */ tema_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Stock/Indicators/TEMA/TEMAIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { ema: EMAIndicator } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { correctFloat, isArray, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The TEMA series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.tema
 *
 * @augments Highcharts.Series
 */
class TEMAIndicator extends EMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getEMA(yVal, prevEMA, SMA, index, i, xVal) {
        return super.calculateEma(xVal || [], yVal, typeof i === 'undefined' ? 1 : i, this.EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
    }
    getTemaPoint(xVal, tripledPeriod, EMAlevels, i) {
        const TEMAPoint = [
            xVal[i - 3],
            correctFloat(3 * EMAlevels.level1 -
                3 * EMAlevels.level2 + EMAlevels.level3)
        ];
        return TEMAPoint;
    }
    getValues(series, params) {
        const period = params.period, doubledPeriod = 2 * period, tripledPeriod = 3 * period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, tema = [], xDataTema = [], yDataTema = [], 
        // EMA values array
        emaValues = [], emaLevel2Values = [], 
        // This object contains all EMA EMAlevels calculated like below
        // EMA = level1
        // EMA(EMA) = level2,
        // EMA(EMA(EMA)) = level3,
        emaLevels = {};
        let index = -1, accumulatePeriodPoints = 0, sma = 0, 
        // EMA of previous point
        prevEMA, prevEMAlevel2, i, temaPoint;
        this.EMApercent = (2 / (period + 1));
        // Check period, if bigger than EMA points length, skip
        if (yValLen < 3 * period - 2) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (isArray(yVal[0])) {
            index = params.index ? params.index : 0;
        }
        // Accumulate first N-points
        accumulatePeriodPoints = super.accumulatePeriodPoints(period, index, yVal);
        // First point
        sma = accumulatePeriodPoints / period;
        accumulatePeriodPoints = 0;
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen + 3; i++) {
            if (i < yValLen + 1) {
                emaLevels.level1 = this.getEMA(yVal, prevEMA, sma, index, i)[1];
                emaValues.push(emaLevels.level1);
            }
            prevEMA = emaLevels.level1;
            // Summing first period points for ema(ema)
            if (i < doubledPeriod) {
                accumulatePeriodPoints += emaLevels.level1;
            }
            else {
                // Calculate dema
                // First dema point
                if (i === doubledPeriod) {
                    sma = accumulatePeriodPoints / period;
                    accumulatePeriodPoints = 0;
                }
                emaLevels.level1 = emaValues[i - period - 1];
                emaLevels.level2 = this.getEMA([emaLevels.level1], prevEMAlevel2, sma)[1];
                emaLevel2Values.push(emaLevels.level2);
                prevEMAlevel2 = emaLevels.level2;
                // Summing first period points for ema(ema(ema))
                if (i < tripledPeriod) {
                    accumulatePeriodPoints += emaLevels.level2;
                }
                else {
                    // Calculate tema
                    // First tema point
                    if (i === tripledPeriod) {
                        sma = accumulatePeriodPoints / period;
                    }
                    if (i === yValLen + 1) {
                        // Calculate the last ema and emaEMA points
                        emaLevels.level1 = emaValues[i - period - 1];
                        emaLevels.level2 = this.getEMA([emaLevels.level1], prevEMAlevel2, sma)[1];
                        emaLevel2Values.push(emaLevels.level2);
                    }
                    emaLevels.level1 = emaValues[i - period - 2];
                    emaLevels.level2 = emaLevel2Values[i - 2 * period - 1];
                    emaLevels.level3 = this.getEMA([emaLevels.level2], emaLevels.prevLevel3, sma)[1];
                    temaPoint = this.getTemaPoint(xVal, tripledPeriod, emaLevels, i);
                    // Make sure that point exists (for TRIX oscillator)
                    if (temaPoint) {
                        tema.push(temaPoint);
                        xDataTema.push(temaPoint[0]);
                        yDataTema.push(temaPoint[1]);
                    }
                    emaLevels.prevLevel3 = emaLevels.level3;
                }
            }
        }
        return {
            values: tema,
            xData: xDataTema,
            yData: yDataTema
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Triple exponential moving average (TEMA) indicator. This series requires
 * `linkedTo` option to be set and should be loaded after the
 * `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/tema
 *         TEMA indicator
 *
 * @extends      plotOptions.ema
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
 *               navigatorOptions, pointInterval, pointIntervalUnit,
 *               pointPlacement, pointRange, pointStart, showInNavigator,
 *               stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/tema
 * @optionparent plotOptions.tema
 */
TEMAIndicator.defaultOptions = merge(EMAIndicator.defaultOptions);
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('tema', TEMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const TEMA_TEMAIndicator = ((/* unused pure expression or super */ null && (TEMAIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `TEMA` series. If the [type](#series.tema.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.tema
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
 *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/tema
 * @apioption series.tema
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/tema.src.js




/* harmony default export */ const tema_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});