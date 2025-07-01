/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/themes/high-contrast-light
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
;// ./code/es-modules/Extensions/Themes/HighContrastLight.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Øystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  Accessible high-contrast theme for Highcharts. Specifically tailored
 *  towards 3:1 contrast against white/off-white backgrounds. Neighboring
 *  colors are tested for color blindness.
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
var HighContrastLightTheme;
(function (HighContrastLightTheme) {
    /* *
     *
     *  Constants
     *
     * */
    HighContrastLightTheme.options = {
        colors: [
            '#265FB5',
            '#222',
            '#698F01',
            '#F4693E',
            '#4C0684',
            '#0FA388',
            '#B7104A',
            '#AF9023',
            '#1A704C',
            '#B02FDD'
        ],
        credits: {
            style: {
                color: '#767676'
            }
        },
        navigator: {
            series: {
                color: '#5f98cf',
                lineColor: '#5f98cf'
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
        setOptions(HighContrastLightTheme.options);
    }
    HighContrastLightTheme.apply = apply;
})(HighContrastLightTheme || (HighContrastLightTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HighContrastLight = (HighContrastLightTheme);

;// ./code/es-modules/masters/themes/high-contrast-light.src.js




(external_highcharts_src_js_default_default()).theme = HighContrastLight.options;
HighContrastLight.apply();
/* harmony default export */ const high_contrast_light_src = ((external_highcharts_src_js_default_default()));

export { high_contrast_light_src as default };
