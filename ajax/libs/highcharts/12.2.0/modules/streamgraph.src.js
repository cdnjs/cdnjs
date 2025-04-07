/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/streamgraph
 * @requires highcharts
 *
 * Streamgraph module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/streamgraph", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/streamgraph"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
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
  "default": () => (/* binding */ streamgraph_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Streamgraph/StreamgraphSeriesDefaults.js
/* *
 *
 *  Streamgraph module
 *
 *  (c) 2010-2025 Torstein Honsi
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
 * A streamgraph is a type of stacked area graph which is displaced around a
 * central axis, resulting in a flowing, organic shape.
 *
 * @sample {highcharts|highstock} highcharts/demo/streamgraph/
 *         Streamgraph
 *
 * @extends      plotOptions.areaspline
 * @since        6.0.0
 * @product      highcharts highstock
 * @requires     modules/streamgraph
 * @optionparent plotOptions.streamgraph
 */
const StreamgraphSeriesDefaults = {
    /**
     * @see [fillColor](#plotOptions.streamgraph.fillColor)
     * @see [fillOpacity](#plotOptions.streamgraph.fillOpacity)
     *
     * @apioption plotOptions.streamgraph.color
     */
    /**
     * @see [color](#plotOptions.streamgraph.color)
     * @see [fillOpacity](#plotOptions.streamgraph.fillOpacity)
     *
     * @apioption plotOptions.streamgraph.fillColor
     */
    /**
     * @see [color](#plotOptions.streamgraph.color)
     * @see [fillColor](#plotOptions.streamgraph.fillColor)
     *
     * @apioption plotOptions.streamgraph.fillOpacity
     */
    fillOpacity: 1,
    lineWidth: 0,
    marker: {
        enabled: false
    },
    stacking: 'stream'
};
/**
 * A `streamgraph` series. If the [type](#series.streamgraph.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.streamgraph
 * @excluding dataParser, dataURL, step, boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  modules/streamgraph
 * @apioption series.streamgraph
 */
/**
 * @see [fillColor](#series.streamgraph.fillColor)
 * @see [fillOpacity](#series.streamgraph.fillOpacity)
 *
 * @apioption series.streamgraph.color
 */
/**
 * An array of data points for the series. For the `streamgraph` series type,
 * points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond to
 *    `x,y`. If the first value is a string, it is applied as the name of the
 *    point, and the `x` value is inferred.
 *    ```js
 *        data: [
 *            [0, 9],
 *            [1, 7],
 *            [2, 6]
 *        ]
 *    ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.area.turboThreshold),
 *    this option is not available.
 *    ```js
 *        data: [{
 *            x: 1,
 *            y: 9,
 *            name: "Point2",
 *            color: "#00FF00"
 *        }, {
 *            x: 1,
 *            y: 6,
 *            name: "Point1",
 *            color: "#FF00FF"
 *        }]
 *    ```
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
 * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
 * @extends   series.line.data
 * @product   highcharts highstock
 * @apioption series.streamgraph.data
 */
/**
 * @see [color](#series.streamgraph.color)
 * @see [fillOpacity](#series.streamgraph.fillOpacity)
 *
 * @apioption series.streamgraph.fillColor
 */
/**
 * @see [color](#series.streamgraph.color)
 * @see [fillColor](#series.streamgraph.fillColor)
 *
 * @type      {number}
 * @default   1
 * @apioption series.streamgraph.fillOpacity
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Streamgraph_StreamgraphSeriesDefaults = (StreamgraphSeriesDefaults);

;// ./code/es-modules/Series/Streamgraph/StreamgraphSeries.js
/* *
 *
 *  Streamgraph module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { areaspline: AreaSplineSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;


const { addEvent, merge, extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/**
 * Streamgraph series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.streamgraph
 *
 * @augments Highcharts.Series
 */
class StreamgraphSeries extends AreaSplineSeries {
    /* *
     *
     *  Functions
     *
     * */
    // Modifier function for stream stacks. It simply moves the point up or
    // down in order to center the full stack vertically.
    streamStacker(pointExtremes, stack, i) {
        // Y bottom value
        pointExtremes[0] -= stack.total / 2;
        // Y value
        pointExtremes[1] -= stack.total / 2;
        // Record the Y data for use when getting axis extremes. Register only
        // the max. This is picked up in the `afterGetExtremes` event, and the
        // dataMin property is reflected.
        if (this.stackedYData) {
            this.stackedYData[i] = Math.max.apply(0, pointExtremes);
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
StreamgraphSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, Streamgraph_StreamgraphSeriesDefaults);
// Reflect the dataMin property, as only dataMax is registered above
addEvent(StreamgraphSeries, 'afterGetExtremes', (e) => {
    e.dataExtremes.dataMin = -e.dataExtremes.dataMax;
});
extend(StreamgraphSeries.prototype, {
    negStacks: false
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('streamgraph', StreamgraphSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Streamgraph_StreamgraphSeries = ((/* unused pure expression or super */ null && (StreamgraphSeries)));

;// ./code/es-modules/masters/modules/streamgraph.src.js




/* harmony default export */ const streamgraph_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});