/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/lollipop
 * @requires highcharts
 *
 * (c) 2009-2024 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Series"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/lollipop", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Series"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/lollipop"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Series"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Series"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__820__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 820:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__820__;

/***/ }),

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
  "default": () => (/* binding */ lollipop_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Lollipop/LollipopPoint.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { series: { prototype: { pointClass: Point } }, seriesTypes: { scatter: { prototype: { pointClass: ScatterPoint } }, dumbbell: { prototype: { pointClass: DumbbellPoint } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class LollipopPoint extends Point {
}
extend(LollipopPoint.prototype, {
    destroy: DumbbellPoint.prototype.destroy,
    pointSetState: ScatterPoint.prototype.setState,
    setState: DumbbellPoint.prototype.setState
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Lollipop_LollipopPoint = (LollipopPoint);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Series"],"commonjs":["highcharts","Series"],"commonjs2":["highcharts","Series"],"root":["Highcharts","Series"]}
var highcharts_Series_commonjs_highcharts_Series_commonjs2_highcharts_Series_root_Highcharts_Series_ = __webpack_require__(820);
var highcharts_Series_commonjs_highcharts_Series_commonjs2_highcharts_Series_root_Highcharts_Series_default = /*#__PURE__*/__webpack_require__.n(highcharts_Series_commonjs_highcharts_Series_commonjs2_highcharts_Series_root_Highcharts_Series_);
;// ./code/es-modules/Series/Lollipop/LollipopSeries.js
/* *
 *
 *  (c) 2010-2024 Sebastian Bochan, Rafal Sebestjanski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { seriesTypes: { column: { prototype: colProto }, dumbbell: { prototype: dumbbellProto }, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
scatter: ScatterSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { extend: LollipopSeries_extend, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * Lollipop series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.lollipop
 *
 * @augments Highcharts.Series
 *
 */
class LollipopSeries extends (highcharts_Series_commonjs_highcharts_Series_commonjs2_highcharts_Series_root_Highcharts_Series_default()) {
    /**
     * Extend the series' drawPoints method by applying a connector
     * and coloring markers.
     * @private
     *
     * @function Highcharts.Series#drawPoints
     */
    drawPoints() {
        const series = this, pointLength = series.points.length;
        let i = 0, point;
        super.drawPoints.apply(series, arguments);
        // Draw connectors
        while (i < pointLength) {
            point = series.points[i];
            series.drawConnector(point);
            i++;
        }
    }
    /**
     * Extend the series' translate method to use grouping option.
     * @private
     *
     * @function Highcharts.Series#translate
     *
     */
    translate() {
        const series = this;
        colProto.translate.apply(series, arguments);
        // Correct x position
        for (const point of series.points) {
            const { pointWidth, shapeArgs } = point;
            if (shapeArgs?.x) {
                shapeArgs.x += pointWidth / 2;
                point.plotX = shapeArgs.x || 0;
            }
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * The lollipop series is a carteseian series with a line anchored from
 * the x axis and a dot at the end to mark the value.
 * Requires `highcharts-more.js`, `modules/dumbbell.js` and
 * `modules/lollipop.js`.
 *
 * @sample {highcharts} highcharts/demo/lollipop/
 *         Lollipop chart
 * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
 *         Styled mode
 *
 * @extends      plotOptions.dumbbell
 * @product      highcharts highstock
 * @excluding    fillColor, fillOpacity, lineWidth, stack, stacking,
 *               lowColor, stickyTracking, trackByArea
 * @since        8.0.0
 * @optionparent plotOptions.lollipop
 */
LollipopSeries.defaultOptions = merge((highcharts_Series_commonjs_highcharts_Series_commonjs2_highcharts_Series_root_Highcharts_Series_default()).defaultOptions, {
    /** @ignore-option */
    threshold: 0,
    /** @ignore-option */
    connectorWidth: 1,
    /** @ignore-option */
    groupPadding: 0.2,
    /**
     * Whether to group non-stacked lollipop points or to let them
     * render independent of each other. Non-grouped lollipop points
     * will be laid out individually and overlap each other.
     *
     * @sample highcharts/series-lollipop/enabled-grouping/
     *         Multiple lollipop series with grouping
     * @sample highcharts/series-lollipop/disabled-grouping/
     *         Multiple lollipop series with disabled grouping
     *
     * @type      {boolean}
     * @default   true
     * @since     8.0.0
     * @product   highcharts highstock
     * @apioption plotOptions.lollipop.grouping
     */
    /** @ignore-option */
    pointPadding: 0.1,
    /** @ignore-option */
    states: {
        hover: {
            /** @ignore-option */
            lineWidthPlus: 0,
            /** @ignore-option */
            connectorWidthPlus: 1,
            /** @ignore-option */
            halo: false
        }
    },
    /** @ignore-option */
    lineWidth: 0,
    dataLabels: {
        align: void 0,
        verticalAlign: void 0
    },
    pointRange: 1
});
LollipopSeries_extend(LollipopSeries.prototype, {
    alignDataLabel: colProto.alignDataLabel,
    crispCol: colProto.crispCol,
    drawConnector: dumbbellProto.drawConnector,
    drawDataLabels: colProto.drawDataLabels,
    getColumnMetrics: colProto.getColumnMetrics,
    getConnectorAttribs: dumbbellProto.getConnectorAttribs,
    pointClass: Lollipop_LollipopPoint
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('lollipop', LollipopSeries);
/* *
 *
 *  Default export
 *
 * */
/* harmony default export */ const Lollipop_LollipopSeries = ((/* unused pure expression or super */ null && (LollipopSeries)));
/**
 * The `lollipop` series. If the [type](#series.lollipop.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.lollipop
 * @excluding boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @requires  modules/dumbbell
 * @requires  modules/lollipop
 * @apioption series.lollipop
 */
/**
 * An array of data points for the series. For the `lollipop` series type,
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
 *    data: [
 *        [0, 6],
 *        [1, 2],
 *        [2, 6]
 *    ]
 *    ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.lollipop.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 9,
 *        name: "Point2",
 *        color: "#00FF00",
 *        connectorWidth: 3,
 *        connectorColor: "#FF00FF"
 *    }, {
 *        x: 1,
 *        y: 6,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
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
 * @extends   series.dumbbell.data
 * @excluding high, low, lowColor
 * @product   highcharts highstock
 * @apioption series.lollipop.data
 */
/**
 * The y value of the point.
 *
 * @type      {number|null}
 * @product   highcharts highstock
 * @apioption series.line.data.y
 */
(''); // Adds doclets above to transpiled file

;// ./code/es-modules/masters/modules/lollipop.src.js




/* harmony default export */ const lollipop_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});