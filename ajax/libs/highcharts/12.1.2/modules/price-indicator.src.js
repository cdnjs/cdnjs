/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/price-indicator
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/price-indicator", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/price-indicator"] = factory(root["_Highcharts"]);
	else
		root["Highcharts"] = factory(root["Highcharts"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  "default": () => (/* binding */ price_indicator_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/PriceIndication.js
/**
 * (c) 2009-2024 Sebastian Bochann
 *
 * Price indicator for Highcharts
 *
 * License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 */


const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent, merge, pushUnique } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Composition
 *
 * */
/** @private */
function compose(SeriesClass) {
    if (pushUnique(composed, 'PriceIndication')) {
        addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
    }
}
/** @private */
function onSeriesAfterRender() {
    const series = this, seriesOptions = series.options, lastVisiblePrice = seriesOptions.lastVisiblePrice, lastPrice = seriesOptions.lastPrice;
    if ((lastVisiblePrice || lastPrice) &&
        seriesOptions.id !== 'highcharts-navigator-series') {
        const xAxis = series.xAxis, yAxis = series.yAxis, origOptions = yAxis.crosshair, origGraphic = yAxis.cross, origLabel = yAxis.crossLabel, points = series.points, pLength = points.length, dataLength = series.dataTable.rowCount, x = series.getColumn('x')[dataLength - 1], y = series.getColumn('y')[dataLength - 1] ??
            series.getColumn('close')[dataLength - 1];
        let yValue;
        if (lastPrice && lastPrice.enabled) {
            yAxis.crosshair = yAxis.options.crosshair = seriesOptions.lastPrice;
            if (!series.chart.styledMode &&
                yAxis.crosshair &&
                yAxis.options.crosshair &&
                seriesOptions.lastPrice) {
                // Set the default color from the series, #14888.
                yAxis.crosshair.color = yAxis.options.crosshair.color =
                    seriesOptions.lastPrice.color || series.color;
            }
            yAxis.cross = series.lastPrice;
            yValue = y;
            if (series.lastPriceLabel) {
                series.lastPriceLabel.destroy();
            }
            delete yAxis.crossLabel;
            yAxis.drawCrosshair(null, ({
                x: x,
                y: yValue,
                plotX: xAxis.toPixels(x, true),
                plotY: yAxis.toPixels(yValue, true)
            }));
            // Save price
            if (series.yAxis.cross) {
                series.lastPrice = series.yAxis.cross;
                series.lastPrice.addClass('highcharts-color-' + series.colorIndex); // #15222
                series.lastPrice.y = yValue;
            }
            series.lastPriceLabel = yAxis.crossLabel;
        }
        if (lastVisiblePrice && lastVisiblePrice.enabled && pLength > 0) {
            yAxis.crosshair = yAxis.options.crosshair = merge({
                color: 'transparent' // Line invisible by default
            }, seriesOptions.lastVisiblePrice);
            yAxis.cross = series.lastVisiblePrice;
            const lastPoint = points[pLength - 1].isInside ?
                points[pLength - 1] : points[pLength - 2];
            if (series.lastVisiblePriceLabel) {
                series.lastVisiblePriceLabel.destroy();
            }
            // Set to undefined to avoid collision with
            // the yAxis crosshair #11480
            // Delete the crossLabel each time the code is invoked, #13876.
            delete yAxis.crossLabel;
            // Save price
            yAxis.drawCrosshair(null, lastPoint);
            if (yAxis.cross) {
                series.lastVisiblePrice = yAxis.cross;
                if (lastPoint && typeof lastPoint.y === 'number') {
                    series.lastVisiblePrice.y = lastPoint.y;
                }
            }
            series.lastVisiblePriceLabel = yAxis.crossLabel;
        }
        // Restore crosshair:
        yAxis.crosshair = yAxis.options.crosshair = origOptions;
        yAxis.cross = origGraphic;
        yAxis.crossLabel = origLabel;
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PriceIndication = {
    compose
};
/* harmony default export */ const Extensions_PriceIndication = (PriceIndication);
/* *
 *
 *  API Options
 *
 * */
/**
 * The line marks the last price from visible range of points.
 *
 * @sample {highstock} stock/indicators/last-visible-price
 *         Last visible price
 *
 * @declare   Highcharts.SeriesLastVisiblePriceOptionsObject
 * @product   highstock
 * @requires  modules/price-indicator
 * @apioption plotOptions.series.lastVisiblePrice
 */
/**
 * Enable or disable the indicator.
 *
 * @type      {boolean}
 * @product   highstock
 * @default   false
 * @apioption plotOptions.series.lastVisiblePrice.enabled
 */
/**
 * @declare   Highcharts.SeriesLastVisiblePriceLabelOptionsObject
 * @extends   yAxis.crosshair.label
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label.align
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label.backgroundColor
 */
/**
 * The border color for the `lastVisiblePrice` label.
 *
 * @type      {Highcharts.ColorType}
 * @since     7.0.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.borderColor
 */
/**
 * The border corner radius of the `lastVisiblePrice` label.
 *
 * @type      {number}
 * @default   3
 * @since     7.0.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.borderRadius
*/
/**
 * Flag to enable `lastVisiblePrice` label.
 *
 *
 * @type      {boolean}
 * @default   false
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.enabled
 */
/**
 * A format string for the `lastVisiblePrice` label. Defaults to `{value}` for
 * numeric axes and `{value:%b %d, %Y}` for datetime axes.
 *
 * @type      {string}
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.format
*/
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label.formatter
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label.padding
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastVisiblePrice.label.shape
 */
/**
 * Text styles for the `lastVisiblePrice` label.
 *
 * @type      {Highcharts.CSSObject}
 * @default   {"color": "white", "fontWeight": "normal", "fontSize": "11px", "textAlign": "center"}
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.style
 */
/**
 * The border width for the `lastVisiblePrice` label.
 *
 * @type      {number}
 * @default   0
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.borderWidth
*/
/**
 * Padding inside the `lastVisiblePrice` label.
 *
 * @type      {number}
 * @default   8
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.label.padding
 */
/**
 * The line marks the last price from all points.
 *
 * @sample {highstock} stock/indicators/last-price
 *         Last price
 *
 * @declare   Highcharts.SeriesLastPriceOptionsObject
 * @product   highstock
 * @requires  modules/price-indicator
 * @apioption plotOptions.series.lastPrice
 */
/**
 * Enable or disable the indicator.
 *
 * @type      {boolean}
 * @product   highstock
 * @default   false
 * @apioption plotOptions.series.lastPrice.enabled
 */
/**
 * @declare   Highcharts.SeriesLastPriceLabelOptionsObject
 * @extends   yAxis.crosshair.label
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.align
 * */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.backgroundColor
 * */
/**
 * The border color of `lastPrice` label.
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.borderColor
 * */
/**
 * The border radius of `lastPrice` label.
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.borderRadius
 * */
/**
 * The border width of `lastPrice` label.
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.borderWidth
 * */
/**
 * Flag to enable `lastPrice` label.
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.enabled
 * */
/**
 * A format string for the `lastPrice` label. Defaults to `{value}` for
 * numeric axes and `{value:%b %d, %Y}` for datetime axes.
 *
 * @type      {string}
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastPrice.label.format
*/
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.formatter
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.padding
 */
/**
 * @since     7.0.0
 * @apioption plotOptions.series.lastPrice.label.shape
 */
/**
 * Text styles for the `lastPrice` label.
 *
 * @type      {Highcharts.CSSObject}
 * @default   {"color": "white", "fontWeight": "normal", "fontSize": "11px", "textAlign": "center"}
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastPrice.label.style
 */
/**
 * The border width for the `lastPrice` label.
 *
 * @type      {number}
 * @default   0
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastPrice.label.borderWidth
*/
/**
 * Padding inside the `lastPrice` label.
 *
 * @type      {number}
 * @default   8
 * @since     7.0
 * @product   highstock
 * @apioption plotOptions.series.lastPrice.label.padding
 */
/**
 * The color of the line of last price.
 * By default, the line has the same color as the series.
 *
 * @type      {string}
 * @product   highstock
 * @apioption plotOptions.series.lastPrice.color
 *
 */
''; // Keeps doclets above in JS file

;// ./code/es-modules/masters/modules/price-indicator.src.js




const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
Extensions_PriceIndication.compose(G.Series);
/* harmony default export */ const price_indicator_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});