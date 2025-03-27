/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/ao
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
		define("highcharts/indicators/ao", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/indicators/ao"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
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
  "default": () => (/* binding */ ao_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Stock/Indicators/AO/AOIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { column: { prototype: columnProto }, sma: SMAIndicator } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { extend, merge, correctFloat, isArray } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The AO series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ao
 *
 * @augments Highcharts.Series
 */
class AOIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    drawGraph() {
        const indicator = this, options = indicator.options, points = indicator.points, userColor = indicator.userOptions.color, positiveColor = options.greaterBarColor, negativeColor = options.lowerBarColor, firstPoint = points[0];
        let i;
        if (!userColor && firstPoint) {
            firstPoint.color = positiveColor;
            for (i = 1; i < points.length; i++) {
                if (points[i].y > points[i - 1].y) {
                    points[i].color = positiveColor;
                }
                else if (points[i].y < points[i - 1].y) {
                    points[i].color = negativeColor;
                }
                else {
                    points[i].color = points[i - 1].color;
                }
            }
        }
    }
    getValues(series) {
        const shortPeriod = 5, longPeriod = 34, xVal = series.xData || [], yVal = series.yData || [], yValLen = yVal.length, AO = [], // 0- date, 1- Awesome Oscillator
        xData = [], yData = [], high = 1, low = 2;
        let shortSMA, // Shorter Period SMA
        longSMA, // Longer Period SMA
        awesome, shortLastIndex, longLastIndex, price, i, j, longSum = 0, shortSum = 0;
        if (xVal.length <= longPeriod ||
            !isArray(yVal[0]) ||
            yVal[0].length !== 4) {
            return;
        }
        for (i = 0; i < longPeriod - 1; i++) {
            price = (yVal[i][high] + yVal[i][low]) / 2;
            if (i >= longPeriod - shortPeriod) {
                shortSum = correctFloat(shortSum + price);
            }
            longSum = correctFloat(longSum + price);
        }
        for (j = longPeriod - 1; j < yValLen; j++) {
            price = (yVal[j][high] + yVal[j][low]) / 2;
            shortSum = correctFloat(shortSum + price);
            longSum = correctFloat(longSum + price);
            shortSMA = shortSum / shortPeriod;
            longSMA = longSum / longPeriod;
            awesome = correctFloat(shortSMA - longSMA);
            AO.push([xVal[j], awesome]);
            xData.push(xVal[j]);
            yData.push(awesome);
            shortLastIndex = j + 1 - shortPeriod;
            longLastIndex = j + 1 - longPeriod;
            shortSum = correctFloat(shortSum -
                (yVal[shortLastIndex][high] +
                    yVal[shortLastIndex][low]) / 2);
            longSum = correctFloat(longSum -
                (yVal[longLastIndex][high] +
                    yVal[longLastIndex][low]) / 2);
        }
        return {
            values: AO,
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
 * Awesome Oscillator. This series requires the `linkedTo` option to
 * be set and should be loaded after the `stock/indicators/indicators.js`
 *
 * @sample {highstock} stock/indicators/ao
 *         Awesome
 *
 * @extends      plotOptions.sma
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               params, pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/ao
 * @optionparent plotOptions.ao
 */
AOIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        // Index and period are unchangeable, do not inherit (#15362)
        index: void 0,
        period: void 0
    },
    /**
     * Color of the Awesome oscillator series bar that is greater than the
     * previous one. Note that if a `color` is defined, the `color`
     * takes precedence and the `greaterBarColor` is ignored.
     *
     * @sample {highstock} stock/indicators/ao/
     *         greaterBarColor
     *
     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since 7.0.0
     */
    greaterBarColor: "#06b535" /* Palette.positiveColor */,
    /**
     * Color of the Awesome oscillator series bar that is lower than the
     * previous one. Note that if a `color` is defined, the `color`
     * takes precedence and the `lowerBarColor` is ignored.
     *
     * @sample {highstock} stock/indicators/ao/
     *         lowerBarColor
     *
     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since 7.0.0
     */
    lowerBarColor: "#f21313" /* Palette.negativeColor */,
    threshold: 0,
    groupPadding: 0.2,
    pointPadding: 0.2,
    crisp: false,
    states: {
        hover: {
            halo: {
                size: 0
            }
        }
    }
});
extend(AOIndicator.prototype, {
    nameBase: 'AO',
    nameComponents: void 0,
    // Columns support:
    markerAttribs: noop,
    getColumnMetrics: columnProto.getColumnMetrics,
    crispCol: columnProto.crispCol,
    translate: columnProto.translate,
    drawPoints: columnProto.drawPoints
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('ao', AOIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AO_AOIndicator = ((/* unused pure expression or super */ null && (AOIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * An `AO` series. If the [type](#series.ao.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.ao
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
 *            navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/ao
 * @apioption series.ao
 */
''; // For including the above in the doclets

;// ./code/es-modules/masters/indicators/ao.src.js




/* harmony default export */ const ao_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});