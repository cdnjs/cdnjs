/**
 * @license Highstock JS v12.2.0 (2025-04-07)
 * @module highcharts/indicators/mfi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Money Flow Index indicator for Highcharts Stock
 *
 * (c) 2010-2025 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/indicators/mfi", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/indicators/mfi"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
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
  "default": () => (/* binding */ mfi_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Stock/Indicators/MFI/MFIIndicator.js
/* *
 *
 *  Money Flow Index indicator for Highcharts Stock
 *
 *  (c) 2010-2025 Grzegorz Blachliński
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { extend, merge, error, isArray } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 *
 */
function sumArray(array) {
    return array.reduce(function (prev, cur) {
        return prev + cur;
    });
}
/**
 *
 */
function toFixed(a, n) {
    return parseFloat(a.toFixed(n));
}
/**
 *
 */
function calculateTypicalPrice(point) {
    return (point[1] + point[2] + point[3]) / 3;
}
/**
 *
 */
function calculateRawMoneyFlow(typicalPrice, volume) {
    return typicalPrice * volume;
}
/* *
 *
 *  Class
 *
 * */
/**
 * The MFI series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.mfi
 *
 * @augments Highcharts.Series
 */
class MFIIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, decimals = params.decimals, volumeSeries = series.chart.get(params.volumeSeriesID), yValVolume = volumeSeries?.getColumn('y') || [], MFI = [], xData = [], yData = [], positiveMoneyFlow = [], negativeMoneyFlow = [];
        let newTypicalPrice, oldTypicalPrice, rawMoneyFlow, negativeMoneyFlowSum, positiveMoneyFlowSum, moneyFlowRatio, MFIPoint, i, isUp = false, 
        // MFI starts calculations from the second point
        // Cause we need to calculate change between two points
        range = 1;
        if (!volumeSeries) {
            error('Series ' +
                params.volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, series.chart);
            return;
        }
        // MFI requires high low and close values
        if ((xVal.length <= period) || !isArray(yVal[0]) ||
            yVal[0].length !== 4 ||
            !yValVolume) {
            return;
        }
        // Calculate first typical price
        newTypicalPrice = calculateTypicalPrice(yVal[range]);
        // Accumulate first N-points
        while (range < period + 1) {
            // Calculate if up or down
            oldTypicalPrice = newTypicalPrice;
            newTypicalPrice = calculateTypicalPrice(yVal[range]);
            isUp = newTypicalPrice >= oldTypicalPrice;
            // Calculate raw money flow
            rawMoneyFlow = calculateRawMoneyFlow(newTypicalPrice, yValVolume[range]);
            // Add to array
            positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
            negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
            range++;
        }
        for (i = range - 1; i < yValLen; i++) {
            if (i > range - 1) {
                // Remove first point from array
                positiveMoneyFlow.shift();
                negativeMoneyFlow.shift();
                // Calculate if up or down
                oldTypicalPrice = newTypicalPrice;
                newTypicalPrice = calculateTypicalPrice(yVal[i]);
                isUp = newTypicalPrice > oldTypicalPrice;
                // Calculate raw money flow
                rawMoneyFlow = calculateRawMoneyFlow(newTypicalPrice, yValVolume[i]);
                // Add to array
                positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
                negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
            }
            // Calculate sum of negative and positive money flow:
            negativeMoneyFlowSum = sumArray(negativeMoneyFlow);
            positiveMoneyFlowSum = sumArray(positiveMoneyFlow);
            moneyFlowRatio = positiveMoneyFlowSum / negativeMoneyFlowSum;
            MFIPoint = toFixed(100 - (100 / (1 + moneyFlowRatio)), decimals);
            MFI.push([xVal[i], MFIPoint]);
            xData.push(xVal[i]);
            yData.push(MFIPoint);
        }
        return {
            values: MFI,
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
 * Money Flow Index. This series requires `linkedTo` option to be set and
 * should be loaded after the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/mfi
 *         Money Flow Index Indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/mfi
 * @optionparent plotOptions.mfi
 */
MFIIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0, // Unchangeable index, do not inherit (#15362)
        /**
         * The id of volume series which is mandatory.
         * For example using OHLC data, volumeSeriesID='volume' means
         * the indicator will be calculated using OHLC and volume values.
         */
        volumeSeriesID: 'volume',
        /**
         * Number of maximum decimals that are used in MFI calculations.
         */
        decimals: 4
    }
});
extend(MFIIndicator.prototype, {
    nameBase: 'Money Flow Index'
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('mfi', MFIIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const MFI_MFIIndicator = ((/* unused pure expression or super */ null && (MFIIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `MFI` series. If the [type](#series.mfi.type) option is not specified, it
 * is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.mfi
 * @since     6.0.0
 * @excluding dataParser, dataURL
 * @product   highstock
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/mfi
 * @apioption series.mfi
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/mfi.src.js




/* harmony default export */ const mfi_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});