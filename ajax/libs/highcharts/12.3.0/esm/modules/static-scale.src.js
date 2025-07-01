/**
 * @license Highcharts Gantt JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/static-scale
 * @requires highcharts
 *
 * StaticScale
 *
 * (c) 2016-2025 Torstein Honsi, Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
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
;// ./code/es-modules/Extensions/StaticScale.js
/* *
 *
 *  (c) 2016-2025 Torstein Honsi, Lars Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { addEvent, defined, isNumber, pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Composition
 *
 * */
/** @private */
function compose(AxisClass, ChartClass) {
    const chartProto = ChartClass.prototype;
    if (!chartProto.adjustHeight) {
        addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
        chartProto.adjustHeight = chartAdjustHeight;
        addEvent(ChartClass, 'render', chartProto.adjustHeight);
    }
}
/** @private */
function onAxisAfterSetOptions() {
    const chartOptions = this.chart.options.chart;
    if (!this.horiz &&
        isNumber(this.options.staticScale) &&
        (!chartOptions.height ||
            (chartOptions.scrollablePlotArea &&
                chartOptions.scrollablePlotArea.minHeight))) {
        this.staticScale = this.options.staticScale;
    }
}
/** @private */
function chartAdjustHeight() {
    const chart = this;
    if (chart.redrawTrigger !== 'adjustHeight') {
        for (const axis of (chart.axes || [])) {
            const chart = axis.chart, animate = !!chart.initiatedScale &&
                chart.options.animation, staticScale = axis.options.staticScale;
            if (axis.staticScale && defined(axis.min)) {
                let height = pick(axis.brokenAxis && axis.brokenAxis.unitLength, axis.max + axis.tickInterval - axis.min) * staticScale;
                // Minimum height is 1 x staticScale.
                height = Math.max(height, staticScale);
                const diff = height - chart.plotHeight;
                if (!chart.scrollablePixelsY && Math.abs(diff) >= 1) {
                    chart.plotHeight = height;
                    chart.redrawTrigger = 'adjustHeight';
                    chart.setSize(void 0, chart.chartHeight + diff, animate);
                }
                // Make sure clip rects have the right height before initial
                // animation.
                axis.series.forEach(function (series) {
                    const clipRect = series.sharedClipKey &&
                        chart.sharedClips[series.sharedClipKey];
                    if (clipRect) {
                        clipRect.attr(chart.inverted ? {
                            width: chart.plotHeight
                        } : {
                            height: chart.plotHeight
                        });
                    }
                });
            }
        }
        this.initiatedScale = true;
    }
    this.redrawTrigger = null;
}
/* *
 *
 *  Default Export
 *
 * */
const StaticScale = {
    compose
};
/* harmony default export */ const Extensions_StaticScale = (StaticScale);
/* *
 *
 *  API Options
 *
 * */
/**
 * For vertical axes only. Setting the static scale ensures that each tick unit
 * is translated into a fixed pixel height. For example, setting the static
 * scale to 24 results in each Y axis category taking up 24 pixels, and the
 * height of the chart adjusts. Adding or removing items will make the chart
 * resize.
 *
 * @sample gantt/xrange-series/demo/
 *         X-range series with static scale
 *
 * @type      {number}
 * @default   50
 * @since     6.2.0
 * @product   gantt
 * @apioption yAxis.staticScale
 */
''; // Keeps doclets above in JS file

;// ./code/es-modules/masters/modules/static-scale.src.js




const G = (external_highcharts_src_js_default_default());
Extensions_StaticScale.compose(G.Axis, G.Chart);
/* harmony default export */ const static_scale_src = ((external_highcharts_src_js_default_default()));

export { static_scale_src as default };
