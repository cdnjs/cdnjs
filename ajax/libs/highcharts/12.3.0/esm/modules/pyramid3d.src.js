/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/pyramid3d
 * @requires highcharts
 * @requires highcharts/highcharts-3d
 * @requires highcharts/modules/cylinder
 * @requires highcharts/modules/funnel3d
 *
 * Highcharts 3D funnel module
 *
 * (c) 2010-2025 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_3d_src_js_d1e794f4__ from "../highcharts-3d.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__cylinder_src_js_a4a5ba4f__ from "./cylinder.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__funnel3d_src_js_945ef2a3__ from "./funnel3d.src.js";
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
;// external "../highcharts-3d.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const external_highcharts_3d_src_js_namespaceObject = x({  });
;// external "./cylinder.src.js"
var external_cylinder_src_js_x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var external_cylinder_src_js_y = (x) => (() => (x))
    const external_cylinder_src_js_namespaceObject = external_cylinder_src_js_x({  });
;// external "./funnel3d.src.js"
var external_funnel3d_src_js_x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var external_funnel3d_src_js_y = (x) => (() => (x))
    const external_funnel3d_src_js_namespaceObject = external_funnel3d_src_js_x({  });
;// ./code/es-modules/Series/Pyramid3D/Pyramid3DSeriesDefaults.js
/* *
 *
 *  Highcharts pyramid3d series module
 *
 *  (c) 2010-2025 Highsoft AS
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * A pyramid3d is a 3d version of pyramid series type. Pyramid charts are
 * a type of chart often used to visualize stages in a sales project,
 * where the top are the initial stages with the most clients.
 *
 * @sample highcharts/demo/pyramid3d/
 *         Pyramid3d
 *
 * @extends      plotOptions.funnel3d
 * @excluding    dataSorting, legendSymbolColor, neckHeight, neckWidth,
 * @product      highcharts
 * @since        7.1.0
 * @requires     highcharts-3d
 * @requires     modules/cylinder
 * @requires     modules/funnel3d
 * @requires     modules/pyramid3d
 * @optionparent plotOptions.pyramid3d
 */
const Pyramid3DSeriesDefaults = {
    /**
     * A reversed pyramid3d is funnel3d, but the latter supports neck
     * related options: neckHeight and neckWidth
     *
     * @product highcharts
     */
    reversed: true,
    neckHeight: 0,
    neckWidth: 0,
    dataLabels: {
        /**
         * @default top
         */
        verticalAlign: 'top'
    }
};
/**
 * A `pyramid3d` series. If the [type](#series.pyramid3d.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @since     7.1.0
 * @extends   series,plotOptions.pyramid3d
 * @excluding allAreas,boostThreshold,colorAxis,compare,compareBase,dataSorting
 * @product   highcharts
 * @sample    {highcharts} highcharts/demo/pyramid3d/ Pyramid3d
 * @requires  modules/pyramid3d
 * @apioption series.pyramid3d
 */
/**
 * An array of data points for the series. For the `pyramid3d` series
 * type, points can be given in the following ways:
 *
 * 1.  An array of numerical values. In this case, the numerical values
 * will be interpreted as `y` options. The `x` values will be automatically
 * calculated, either starting at 0 and incremented by 1, or from `pointStart`
 * and `pointInterval` given in the series options. If the axis has
 * categories, these will be used. Example:
 *
 *  ```js
 *  data: [0, 5, 3, 5]
 *  ```
 *
 * 2.  An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series'
 * [turboThreshold](#series.pyramid3d.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         y: 2,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         y: 4,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<number>|*>}
 * @extends   series.funnel3d.data
 * @product   highcharts
 * @apioption series.pyramid3d.data
 */
''; // Detachs doclets above
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Pyramid3D_Pyramid3DSeriesDefaults = (Pyramid3DSeriesDefaults);

;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// ./code/es-modules/Series/Pyramid3D/Pyramid3DSeries.js
/* *
 *
 *  Highcharts pyramid3d series module
 *
 *  (c) 2010-2025 Highsoft AS
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { funnel3d: Funnel3DSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The pyramid3d series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.pyramid3d
 * @augments seriesTypes.funnel3d
 * @requires highcharts-3d
 * @requires modules/cylinder
 * @requires modules/funnel3d
 * @requires modules/pyramid3d
 */
class Pyramid3DSeries extends Funnel3DSeries {
}
/* *
 *
 *  Static Properties
 *
 * */
Pyramid3DSeries.defaultOptions = merge(Funnel3DSeries.defaultOptions, Pyramid3D_Pyramid3DSeriesDefaults);
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('pyramid3d', Pyramid3DSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Pyramid3D_Pyramid3DSeries = ((/* unused pure expression or super */ null && (Pyramid3DSeries)));

;// ./code/es-modules/masters/modules/pyramid3d.src.js







/* harmony default export */ const pyramid3d_src = ((external_highcharts_src_js_default_default()));

export { pyramid3d_src as default };
