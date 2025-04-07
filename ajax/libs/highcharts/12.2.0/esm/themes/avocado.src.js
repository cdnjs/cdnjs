/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/themes/avocado
 * @requires highcharts
 *
 * (c) 2009-2025 Highsoft AS
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
;// ./code/es-modules/Extensions/Themes/Avocado.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Øystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  Accessible high-contrast theme for Highcharts. Considers colorblindness and
 *  monochrome rendering.
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { setOptions } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Theme
 *
 * */
var AvocadoTheme;
(function (AvocadoTheme) {
    /* *
     *
     *  Constants
     *
     * */
    AvocadoTheme.options = {
        colors: ['#F3E796', '#95C471', '#35729E', '#251735'],
        colorAxis: {
            maxColor: '#05426E',
            minColor: '#F3E796'
        },
        plotOptions: {
            map: {
                nullColor: '#FCFEFE'
            }
        },
        navigator: {
            maskFill: 'rgba(170, 205, 170, 0.5)',
            series: {
                color: '#95C471',
                lineColor: '#35729E'
            }
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Apply the theme.
     */
    function apply() {
        setOptions(AvocadoTheme.options);
    }
    AvocadoTheme.apply = apply;
})(AvocadoTheme || (AvocadoTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Avocado = (AvocadoTheme);

;// ./code/es-modules/masters/themes/avocado.src.js




(external_highcharts_src_js_default_default()).theme = Avocado.options;
Avocado.apply();
/* harmony default export */ const avocado_src = ((external_highcharts_src_js_default_default()));

export { avocado_src as default };
