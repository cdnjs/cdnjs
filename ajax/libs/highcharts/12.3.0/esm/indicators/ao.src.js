/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/ao
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
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
;// ./code/es-modules/Stock/Indicators/AO/AOIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { noop } = (external_highcharts_src_js_default_default());

const { column: { prototype: columnProto }, sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend, merge, correctFloat, isArray } = (external_highcharts_src_js_default_default());
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
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('ao', AOIndicator);
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





/* harmony default export */ const ao_src = ((external_highcharts_src_js_default_default()));

export { ao_src as default };
