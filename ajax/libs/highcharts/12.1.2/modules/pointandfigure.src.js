/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/pointandfigure
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Point and figure series type for Highcharts Stock
 *
 * (c) 2010-2024 Kamil Musialowski
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["RendererRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/pointandfigure", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["RendererRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/pointandfigure"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["RendererRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["RendererRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__608__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 608:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__608__;

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
  "default": () => (/* binding */ pointandfigure_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/PointAndFigure/PointAndFigurePoint.js
/* *
 *
 *  (c) 2010-2024 Kamil Musialowski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
*
*  Imports
*
* */

const { seriesTypes: { scatter: { prototype: { pointClass: ScatterPoint } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class PointAndFigurePoint extends ScatterPoint {
    /* *
     *
     *  Functions
     *
     * */
    resolveMarker() {
        const seriesOptions = this.series.options;
        this.marker = this.options.marker =
            this.upTrend ? seriesOptions.markerUp : seriesOptions.marker;
        this.color = this.options.marker.lineColor;
    }
    resolveColor() {
        super.resolveColor();
        this.resolveMarker();
    }
    /**
     * Extend the parent method by adding up or down to the class name.
     * @private
     * @function Highcharts.seriesTypes.pointandfigure#getClassName
     */
    getClassName() {
        return super.getClassName.call(this) +
            (this.upTrend ?
                ' highcharts-point-up' :
                ' highcharts-point-down');
    }
}
/* *
 *
 *  Export Default
 *
 * */
/* harmony default export */ const PointAndFigure_PointAndFigurePoint = (PointAndFigurePoint);

;// ./code/es-modules/Series/PointAndFigure/PointAndFigureSeriesDefaults.js
/* *
 *
 *  (c) 2010-2024 Kamil Musialowski
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
 * The Point and Figure series represents changes in stock price movements,
 * without focusing on the time and volume. Each data point is created when the
 * `boxSize` criteria is met. Opposite column of points gets created only when
 * the `reversalAmount` threshold is met.
 *
 * @sample stock/demo/pointandfigure/
 *         Point and Figure series
 *
 * @extends      plotOptions.scatter
 * @product      highstock
 * @excluding    boostBlending, boostThreshold, compare, compareBase,
 *               compareStart, cumulative, cumulativeStart, dataGrouping,
 *               dataGrouping, dragDrop
 * @requires     modules/pointandfigure
 * @optionparent plotOptions.pointandfigure
 */
const PointAndFigureSeriesDefaults = {
    boxSize: '1%',
    reversalAmount: 3,
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
            '<b> {series.name}</b><br/>' +
            'Close: {point.y:.2f}<br/>',
        headerFormat: ''
    },
    turboThreshold: 0,
    groupPadding: 0.2,
    pointPadding: 0.1,
    pointRange: null,
    dataGrouping: {
        enabled: false
    },
    markerUp: {
        symbol: 'cross',
        lineColor: '#00FF00',
        lineWidth: 2
    },
    marker: {
        symbol: 'circle',
        fillColor: 'transparent',
        lineColor: '#FF0000',
        lineWidth: 2
    },
    legendSymbol: 'lineMarker'
};
/* *
 *
 *  API Options
 *
 * */
/**
 * A `pointandfigure` series. If the [type](#series.pointandfigure.type)
 * option is not specified, it is inherited from [chart.type](
 * #chart.type).
 *
 * @type      {*}
 * @extends   series,plotOptions.pointandfigure
 * @product   highstock
 * @excluding boostBlending, boostThreshold, compare, compareBase,
 *            compareStart, cumulative, cumulativeStart, dataGrouping,
 *            dataGrouping, dragDrop
 * @requires  modules/pointandfigure
 * @apioption series.pointandfigure
 */
/**
 * An array of data points for the series. For the `pointandfigure` series
 * type, points can be given in the following way:
 *
 * 1. An array of arrays with 2 values. In this case, the values correspond
 *    to `x, y`. Y values are parsed under the hood to create
 *    point and figure format data points.
 *    ```js
 *    data: [
 *        [1665408600000, 140.42],
 *        [1665495000000, 138.98],
 *        [1665581400000, 138.34]
 *    ]
 *    ```
 * 2. An array of objects with named values `{x, y}`.
 *    ```js
 *    data: [
 *        {x: 1665408600000, y: 140.42},
 *        {x: 1665495000000, y: 138.98},
 *        {x: 1665581400000, y: 138.34}
 *    ]
 *    ```
 *
 * @type      {Array<Array<number,number>|*>}
 * @extends   series.scatter.data
 * @product   highstock
 * @apioption series.pointandfigure.data
 */
/**
 * Price increment that determines if a new point should be added to the column.
 *
 *
 * @type      {string|number}
 * @since 12.0.0
 * @product   highstock
 * @apioption plotOptions.pointandfigure.boxSize
 */
/**
 * Threshold that should be met to create a new column in opposite direction.
 *
 *
 * @type      {number}
 * @since 12.0.0
 * @product   highstock
 * @apioption plotOptions.pointandfigure.reversalAmount
 */
/**
 * Marker options for the up direction column, inherited from `series.marker`
 * options.
 *
 * @extends   plotOptions.series.marker
 * @product   highstock
 * @apioption plotOptions.pointandfigure.markerUp
 */
''; // Keeps doclets above detached
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PointAndFigure_PointAndFigureSeriesDefaults = (PointAndFigureSeriesDefaults);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","RendererRegistry"],"commonjs":["highcharts","RendererRegistry"],"commonjs2":["highcharts","RendererRegistry"],"root":["Highcharts","RendererRegistry"]}
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_ = __webpack_require__(608);
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_);
;// ./code/es-modules/Series/PointAndFigure/PointAndFigureSymbols.js
/* *
 *
 *  Imports
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var PointAndFigureSymbols;
(function (PointAndFigureSymbols) {
    /* *
     *
     *  Constants
     *
     * */
    const modifiedMembers = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SVGRendererClass) {
        if (modifiedMembers.indexOf(SVGRendererClass) === -1) {
            modifiedMembers.push(SVGRendererClass);
            const symbols = SVGRendererClass.prototype.symbols;
            symbols.cross = cross;
        }
        const RendererClass = highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default().getRendererType();
        // The symbol callbacks are generated on the SVGRenderer object in all
        // browsers.
        if (modifiedMembers.indexOf(RendererClass)) {
            modifiedMembers.push(RendererClass);
        }
    }
    PointAndFigureSymbols.compose = compose;
    /**
     *
     */
    function cross(x, y, w, h) {
        return [
            ['M', x, y],
            ['L', x + w, y + h],
            ['M', x + w, y],
            ['L', x, y + h],
            ['Z']
        ];
    }
})(PointAndFigureSymbols || (PointAndFigureSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PointAndFigure_PointAndFigureSymbols = (PointAndFigureSymbols);

;// ./code/es-modules/Series/PointAndFigure/PointAndFigureSeries.js
/* *
 *
 *  (c) 2010-2024 Kamil Musialowski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *  Imports
 *
 * */






const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
const { scatter: ScatterSeries, column: { prototype: columnProto } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;
const { extend, merge, pushUnique, isNumber, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Declarations
 *
 * */
/* *
 *
 *  Functions
 *
 * */
/* *
 *
 *  Class
 *
 * */
/**
 * The series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.pointandfigure
 *
 * @augments Highcharts.Series
 */
class PointAndFigureSeries extends ScatterSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
        * */
        super(...arguments);
        this.allowDG = false;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(SVGRendererClass) {
        if (pushUnique(composed, 'pointandfigure')) {
            PointAndFigure_PointAndFigureSymbols.compose(SVGRendererClass);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    init() {
        super.init.apply(this, arguments);
        this.pnfDataGroups = [];
    }
    getProcessedData() {
        if (!this.pnfDataGroups) {
            return {
                modified: this.dataTable.modified,
                cropped: false,
                cropStart: 0,
                closestPointRange: 1
            };
        }
        const series = this, modified = this.dataTable.modified, options = series.options, xData = series.getColumn('x', true), yData = series.getColumn('y', true), boxSize = options.boxSize, calculatedBoxSize = isNumber(boxSize) ?
            boxSize : relativeLength(boxSize, yData[0]), pnfDataGroups = series.pnfDataGroups, reversal = calculatedBoxSize * options.reversalAmount;
        series.calculatedBoxSize = calculatedBoxSize;
        let upTrend;
        /**
         * Get the Y value of last data point, from the last PNF group.
         * @private
         * @function Highcharts.seriesTypes.pointandfigure#getLastPoint
         */
        function getLastPoint(pnfDataGroups) {
            const y = pnfDataGroups[pnfDataGroups.length - 1].y;
            return y[y.length - 1];
        }
        /**
         * Push new data point to the last PNF group.
         * @private
         * @function Highcharts.seriesTypes.pointandfigure#pushNewPoint
         */
        function pushNewPoint(y, upTrend, lastPoint) {
            const currPointGroup = pnfDataGroups[pnfDataGroups.length - 1], flipFactor = upTrend ? 1 : -1, times = Math.floor(flipFactor * (y - lastPoint) / calculatedBoxSize);
            for (let i = 1; i <= times; i++) {
                const newPoint = lastPoint + flipFactor * (calculatedBoxSize * i);
                currPointGroup.y.push(newPoint);
            }
        }
        if (this.isDirtyData || pnfDataGroups.length === 0) {
            this.pnfDataGroups.length = 0;
            // Get first point and determine its symbol and trend
            for (let i = 0; i < yData.length; i++) {
                const x = xData[i], close = yData[i], firstPoint = yData[0];
                if (close - firstPoint >= calculatedBoxSize) {
                    upTrend = true;
                    pnfDataGroups.push({ x, y: [close], upTrend });
                    break;
                }
                if (firstPoint - close >= calculatedBoxSize) {
                    upTrend = false;
                    pnfDataGroups.push({ x, y: [close], upTrend });
                    break;
                }
            }
            yData.forEach((close, i) => {
                const x = xData[i], lastPoint = getLastPoint(pnfDataGroups);
                if (upTrend) {
                    // Add point going UP
                    if (close - lastPoint >= calculatedBoxSize) {
                        pushNewPoint(close, upTrend, lastPoint);
                    }
                    if (lastPoint - close >= reversal) { // Handle reversal
                        upTrend = false;
                        pnfDataGroups.push({ x, y: [], upTrend });
                        pushNewPoint(close, upTrend, lastPoint);
                    }
                }
                if (!upTrend) {
                    // Add point going DOWN
                    if (lastPoint - close >= calculatedBoxSize) {
                        pushNewPoint(close, upTrend, lastPoint);
                    }
                    if (close - lastPoint >= reversal) { // Handle reversal
                        upTrend = true;
                        pnfDataGroups.push({ x, y: [], upTrend });
                        pushNewPoint(close, upTrend, lastPoint);
                    }
                }
            });
        }
        // Process the pnfDataGroups to HC series format
        const finalData = [];
        const processedXData = [];
        const processedYData = [];
        pnfDataGroups.forEach((point) => {
            const x = point.x, upTrend = point.upTrend;
            point.y.forEach((y) => {
                processedXData.push(x);
                processedYData.push(y);
                finalData.push({
                    x,
                    y,
                    upTrend
                });
            });
        });
        modified.setColumn('x', processedXData);
        modified.setColumn('y', processedYData);
        series.pnfDataGroups = pnfDataGroups;
        series.processedData = finalData;
        return {
            modified,
            cropped: false,
            cropStart: 0,
            closestPointRange: 1
        };
    }
    markerAttribs(point) {
        const series = this, options = series.options, attribs = {}, pos = point.pos();
        attribs.width = series.markerWidth;
        attribs.height = series.markerHeight;
        if (pos && attribs.width && attribs.height) {
            attribs.x = pos[0] - Math.round(attribs.width) / 2;
            attribs.y = pos[1] - Math.round(attribs.height) / 2;
        }
        if (options.crisp && attribs.x) {
            // Math.floor for #1843:
            attribs.x = Math.floor(attribs.x);
        }
        return attribs;
    }
    translate() {
        const metrics = this.getColumnMetrics(), calculatedBoxSize = this.calculatedBoxSize;
        this.markerWidth = metrics.width + metrics.paddedWidth + metrics.offset;
        this.markerHeight =
            this.yAxis.toPixels(0) - this.yAxis.toPixels(calculatedBoxSize);
        super.translate();
    }
}
PointAndFigureSeries.defaultOptions = merge(ScatterSeries.defaultOptions, PointAndFigure_PointAndFigureSeriesDefaults);
extend(PointAndFigureSeries.prototype, {
    takeOrdinalPosition: true,
    pnfDataGroups: [],
    getColumnMetrics: columnProto.getColumnMetrics,
    pointClass: PointAndFigure_PointAndFigurePoint,
    sorted: true
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('pointandfigure', PointAndFigureSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PointAndFigure_PointAndFigureSeries = (PointAndFigureSeries);

;// ./code/es-modules/masters/modules/pointandfigure.src.js




const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
PointAndFigure_PointAndFigureSeries.compose(G.Renderer);
/* harmony default export */ const pointandfigure_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});