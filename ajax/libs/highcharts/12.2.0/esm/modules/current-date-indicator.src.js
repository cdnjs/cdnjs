/**
 * @license Highcharts Gantt JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/current-date-indicator
 * @requires highcharts
 *
 * CurrentDateIndicator
 *
 * (c) 2010-2025 Lars A. V. Cabrera
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
;// ./code/es-modules/Extensions/CurrentDateIndication.js
/* *
 *
 *  (c) 2016-2025 Highsoft AS
 *
 *  Author: Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { composed } = (external_highcharts_src_js_default_default());

const { addEvent, merge, pushUnique, wrap } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * Show an indicator on the axis for the current date and time. Can be a
 * boolean or a configuration object similar to
 * [xAxis.plotLines](#xAxis.plotLines).
 *
 * @sample gantt/current-date-indicator/demo
 *         Current date indicator enabled
 * @sample gantt/current-date-indicator/object-config
 *         Current date indicator with custom options
 *
 * @declare   Highcharts.CurrentDateIndicatorOptions
 * @type      {boolean|CurrentDateIndicatorOptions}
 * @default   true
 * @extends   xAxis.plotLines
 * @excluding value
 * @product   gantt
 * @apioption xAxis.currentDateIndicator
 */
const defaultOptions = {
    color: "#ccd3ff" /* Palette.highlightColor20 */,
    width: 2,
    /**
     * @declare Highcharts.AxisCurrentDateIndicatorLabelOptions
     */
    label: {
        /**
         * Format of the label. This options is passed as the first argument to
         * [dateFormat](/class-reference/Highcharts.Time#dateFormat) function.
         *
         * @type      {string|Intl.DateTimeFormatOptions}
         * @product   gantt
         * @apioption xAxis.currentDateIndicator.label.format
         */
        format: '%[abdYHM]',
        formatter: function (value, format) {
            return this.axis.chart.time.dateFormat(format || '', value, true);
        },
        rotation: 0,
        /**
         * @type {Highcharts.CSSObject}
         */
        style: {
            /** @internal */
            fontSize: '0.7em'
        }
    }
};
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(AxisClass, PlotLineOrBandClass) {
    if (pushUnique(composed, 'CurrentDateIndication')) {
        addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
        addEvent(PlotLineOrBandClass, 'render', onPlotLineOrBandRender);
        wrap(PlotLineOrBandClass.prototype, 'getLabelText', wrapPlotLineOrBandGetLabelText);
    }
}
/**
 * @private
 */
function onAxisAfterSetOptions() {
    const options = this.options, cdiOptions = options.currentDateIndicator;
    if (cdiOptions) {
        const plotLineOptions = typeof cdiOptions === 'object' ?
            merge(defaultOptions, cdiOptions) :
            merge(defaultOptions);
        plotLineOptions.value = Date.now();
        plotLineOptions.className = 'highcharts-current-date-indicator';
        if (!options.plotLines) {
            options.plotLines = [];
        }
        options.plotLines.push(plotLineOptions);
    }
}
/**
 * @private
 */
function onPlotLineOrBandRender() {
    // If the label already exists, update its text
    if (this.label) {
        this.label.attr({
            text: this.getLabelText(this.options.label)
        });
    }
}
/**
 * @private
 */
function wrapPlotLineOrBandGetLabelText(defaultMethod, defaultLabelOptions) {
    const options = this.options;
    if (options &&
        options.className &&
        options.className.indexOf('highcharts-current-date-indicator') !== -1 &&
        options.label &&
        typeof options.label.formatter === 'function') {
        options.value = Date.now();
        return options.label.formatter
            .call(this, options.value, options.label.format);
    }
    return defaultMethod.call(this, defaultLabelOptions);
}
/* *
 *
 *  Default Export
 *
 * */
const CurrentDateIndication = {
    compose
};
/* harmony default export */ const Extensions_CurrentDateIndication = (CurrentDateIndication);

;// ./code/es-modules/masters/modules/current-date-indicator.src.js




const G = (external_highcharts_src_js_default_default());
Extensions_CurrentDateIndication.compose(G.Axis, G.PlotLineOrBand);
/* harmony default export */ const current_date_indicator_src = ((external_highcharts_src_js_default_default()));

export { current_date_indicator_src as default };
