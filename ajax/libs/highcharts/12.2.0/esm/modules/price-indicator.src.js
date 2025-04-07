/**
 * @license Highstock JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/price-indicator
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__stock_src_js_3de69a45__ from "./stock.src.js";
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
;// external "./stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const external_stock_src_js_namespaceObject = x({  });
;// ./code/es-modules/Extensions/PriceIndication.js
/**
 * (c) 2009-2025 Sebastian Bochann
 *
 * Price indicator for Highcharts
 *
 * License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 */


const { composed } = (external_highcharts_src_js_default_default());

const { addEvent, merge, pushUnique } = (external_highcharts_src_js_default_default());
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
 * The color of the line of last visible price.
 * By default, color is not applied and the line is not visible.
 *
 * @type      {string}
 * @product   highstock
 * @apioption plotOptions.series.lastVisiblePrice.color
 *
 */
/**
 * Name of the dash style to use for the line of last visible price.
 *
 * @sample {highstock} highcharts/plotoptions/series-dashstyle-all/
 *         Possible values demonstrated
 *
 * @type      {Highcharts.DashStyleValue}
 * @product   highstock
 * @default   Solid
 * @apioption plotOptions.series.lastVisiblePrice.dashStyle
 *
 */
/**
 * Width of the last visible price line.
 *
 * @type      {number}
 * @product   highstock
 * @default   1
 * @apioption plotOptions.series.lastVisiblePrice.width
 *
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
/**
 * Name of the dash style to use for the line of last price.
 *
 * @sample {highstock} highcharts/plotoptions/series-dashstyle-all/
 *         Possible values demonstrated
 *
 * @type      {Highcharts.DashStyleValue}
 * @product   highstock
 * @default   Solid
 * @apioption plotOptions.series.lastPrice.dashStyle
 *
 */
/**
 * Width of the last price line.
 *
 * @type      {number}
 * @product   highstock
 * @default   1
 * @apioption plotOptions.series.lastPrice.width
 *
 */
''; // Keeps doclets above in JS file

;// ./code/es-modules/masters/modules/price-indicator.src.js





const G = (external_highcharts_src_js_default_default());
Extensions_PriceIndication.compose(G.Series);
/* harmony default export */ const price_indicator_src = ((external_highcharts_src_js_default_default()));

export { price_indicator_src as default };
