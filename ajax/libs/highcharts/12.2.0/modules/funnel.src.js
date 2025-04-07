/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/funnel
 * @requires highcharts
 *
 * Highcharts funnel module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/funnel", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/funnel"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
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
  "default": () => (/* binding */ funnel_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Series/Funnel/FunnelSeriesDefaults.js
/* *
 *
 *  Highcharts funnel module
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
 * Funnel charts are a type of chart often used to visualize stages in a
 * sales project, where the top are the initial stages with the most
 * clients. It requires that the modules/funnel.js file is loaded.
 *
 * @sample highcharts/demo/funnel/
 *         Funnel demo
 *
 * @extends      plotOptions.pie
 * @excluding    innerSize,size,dataSorting
 * @product      highcharts
 * @requires     modules/funnel
 * @optionparent plotOptions.funnel
 */
const FunnelSeriesDefaults = {
    /**
     * Initial animation is by default disabled for the funnel chart.
     */
    animation: false,
    /**
     * The corner radius of the border surrounding all points or series. A
     * number signifies pixels. A percentage string, like for example `50%`,
     * signifies a size relative to the series width.
     *
     * @sample highcharts/plotoptions/funnel-border-radius
     *         Funnel and pyramid with rounded border
     */
    borderRadius: 0,
    /**
     * The center of the series. By default, it is centered in the middle
     * of the plot area, so it fills the plot area height.
     *
     * @type    {Array<number|string>}
     * @default ["50%", "50%"]
     * @since   3.0
     */
    center: ['50%', '50%'],
    /**
     * The width of the funnel compared to the width of the plot area,
     * or the pixel width if it is a number.
     *
     * @type  {number|string}
     * @since 3.0
     */
    width: '90%',
    /**
     * The width of the neck, the lower part of the funnel. A number defines
     * pixel width, a percentage string defines a percentage of the plot
     * area width.
     *
     * @sample {highcharts} highcharts/demo/funnel/
     *         Funnel demo
     *
     * @type  {number|string}
     * @since 3.0
     */
    neckWidth: '30%',
    /**
     * The height of the funnel or pyramid. If it is a number it defines
     * the pixel height, if it is a percentage string it is the percentage
     * of the plot area height.
     *
     * @sample {highcharts} highcharts/demo/funnel/
     *         Funnel demo
     *
     * @type  {number|string}
     * @since 3.0
     */
    height: '100%',
    /**
     * The height of the neck, the lower part of the funnel. A number
     * defines pixel width, a percentage string defines a percentage of the
     * plot area height.
     *
     * @type {number|string}
     */
    neckHeight: '25%',
    /**
     * A reversed funnel has the widest area down. A reversed funnel with
     * no neck width and neck height is a pyramid.
     *
     * @since 3.0.10
     */
    reversed: false,
    /**
     * To avoid adapting the data label size in Pie.drawDataLabels.
     * @ignore-option
     */
    size: true,
    dataLabels: {
        connectorWidth: 1,
        verticalAlign: 'middle'
    },
    /**
     * Options for the series states.
     */
    states: {
        /**
         * @excluding halo, marker, lineWidth, lineWidthPlus
         * @apioption plotOptions.funnel.states.hover
         */
        /**
         * Options for a selected funnel item.
         *
         * @excluding halo, marker, lineWidth, lineWidthPlus
         */
        select: {
            /**
             * A specific color for the selected point.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            color: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * A specific border color for the selected point.
             *
             * @type {Highcharts.ColorString}
             */
            borderColor: "#000000" /* Palette.neutralColor100 */
        }
    }
};
/**
 * A `funnel` series. If the [type](#series.funnel.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.funnel
 * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
 *            boostBlending, boostThreshold
 * @product   highcharts
 * @requires  modules/funnel
 * @apioption series.funnel
 */
/**
 * An array of data points for the series. For the `funnel` series type,
 * points can be given in the following ways:
 *
 * 1.  An array of numerical values. In this case, the numerical values
 * will be interpreted as `y` options. Example:
 *
 *  ```js
 *  data: [0, 5, 3, 5]
 *  ```
 *
 * 2.  An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series' [turboThreshold](#series.funnel.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         y: 3,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         y: 1,
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
 * @type      {Array<number|null|*>}
 * @extends   series.pie.data
 * @excluding sliced
 * @product   highcharts
 * @apioption series.funnel.data
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel_FunnelSeriesDefaults = (FunnelSeriesDefaults);

;// ./code/es-modules/Extensions/BorderRadius.js
/* *
 *
 *  Highcharts Border Radius module
 *
 *  Author: Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { defaultOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent, extend, isObject, merge, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const defaultBorderRadiusOptions = {
    radius: 0,
    scope: 'stack',
    where: void 0
};
/* *
 *
 *  Variables
 *
 * */
let oldArc = noop;
let oldRoundedRect = noop;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function applyBorderRadius(path, i, r) {
    const a = path[i];
    let b = path[i + 1];
    if (b[0] === 'Z') {
        b = path[0];
    }
    let line, arc, fromLineToArc;
    // From straight line to arc
    if ((a[0] === 'M' || a[0] === 'L') && b[0] === 'A') {
        line = a;
        arc = b;
        fromLineToArc = true;
        // From arc to straight line
    }
    else if (a[0] === 'A' && (b[0] === 'M' || b[0] === 'L')) {
        line = b;
        arc = a;
    }
    if (line && arc && arc.params) {
        const bigR = arc[1], 
        // In our use cases, outer pie slice arcs are clockwise and inner
        // arcs (donut/sunburst etc) are anti-clockwise
        clockwise = arc[5], params = arc.params, { start, end, cx, cy } = params;
        // Some geometric constants
        const relativeR = clockwise ? (bigR - r) : (bigR + r), 
        // The angle, on the big arc, that the border radius arc takes up
        angleOfBorderRadius = relativeR ? Math.asin(r / relativeR) : 0, angleOffset = clockwise ?
            angleOfBorderRadius :
            -angleOfBorderRadius, 
        // The distance along the radius of the big arc to the starting
        // point of the small border radius arc
        distanceBigCenterToStartArc = (Math.cos(angleOfBorderRadius) *
            relativeR);
        // From line to arc
        if (fromLineToArc) {
            // Update the cache
            params.start = start + angleOffset;
            // First move to the start position at the radial line. We want to
            // start one borderRadius closer to the center.
            line[1] = cx + distanceBigCenterToStartArc * Math.cos(start);
            line[2] = cy + distanceBigCenterToStartArc * Math.sin(start);
            // Now draw an arc towards the point where the small circle touches
            // the great circle.
            path.splice(i + 1, 0, [
                'A',
                r,
                r,
                0, // Slanting,
                0, // Long arc
                1, // Clockwise
                cx + bigR * Math.cos(params.start),
                cy + bigR * Math.sin(params.start)
            ]);
            // From arc to line
        }
        else {
            // Update the cache
            params.end = end - angleOffset;
            // End the big arc a bit earlier
            arc[6] = cx + bigR * Math.cos(params.end);
            arc[7] = cy + bigR * Math.sin(params.end);
            // Draw a small arc towards a point on the end angle, but one
            // borderRadius closer to the center relative to the perimeter.
            path.splice(i + 1, 0, [
                'A',
                r,
                r,
                0,
                0,
                1,
                cx + distanceBigCenterToStartArc * Math.cos(end),
                cy + distanceBigCenterToStartArc * Math.sin(end)
            ]);
        }
        // Long or short arc must be reconsidered because we have modified the
        // start and end points
        arc[4] = Math.abs(params.end - params.start) < Math.PI ? 0 : 1;
    }
}
/**
 * Extend arc with borderRadius.
 * @private
 */
function arc(x, y, w, h, options = {}) {
    const path = oldArc(x, y, w, h, options), { innerR = 0, r = w, start = 0, end = 0 } = options;
    if (options.open || !options.borderRadius) {
        return path;
    }
    const alpha = end - start, sinHalfAlpha = Math.sin(alpha / 2), borderRadius = Math.max(Math.min(relativeLength(options.borderRadius || 0, r - innerR), 
    // Cap to half the sector radius
    (r - innerR) / 2, 
    // For smaller pie slices, cap to the largest small circle that
    // can be fitted within the sector
    (r * sinHalfAlpha) / (1 + sinHalfAlpha)), 0), 
    // For the inner radius, we need an extra cap because the inner arc
    // is shorter than the outer arc
    innerBorderRadius = Math.min(borderRadius, 2 * (alpha / Math.PI) * innerR);
    // Apply turn-by-turn border radius. Start at the end since we're
    // splicing in arc segments.
    let i = path.length - 1;
    while (i--) {
        applyBorderRadius(path, i, i > 1 ? innerBorderRadius : borderRadius);
    }
    return path;
}
/** @private */
function seriesOnAfterColumnTranslate() {
    if (this.options.borderRadius &&
        !(this.chart.is3d && this.chart.is3d())) {
        const { options, yAxis } = this, percent = options.stacking === 'percent', seriesDefault = defaultOptions.plotOptions?.[this.type]
            ?.borderRadius, borderRadius = optionsToObject(options.borderRadius, isObject(seriesDefault) ? seriesDefault : {}), reversed = yAxis.options.reversed;
        for (const point of this.points) {
            const { shapeArgs } = point;
            if (point.shapeType === 'roundedRect' && shapeArgs) {
                const { width = 0, height = 0, y = 0 } = shapeArgs;
                let brBoxY = y, brBoxHeight = height;
                // It would be nice to refactor StackItem.getStackBox/
                // setOffset so that we could get a reliable box out of
                // it. Currently it is close if we remove the label
                // offset, but we still need to run crispCol and also
                // flip it if inverted, so atm it is simpler to do it
                // like the below.
                if (borderRadius.scope === 'stack' &&
                    point.stackTotal) {
                    const stackEnd = yAxis.translate(percent ? 100 : point.stackTotal, false, true, false, true), stackThreshold = yAxis.translate(options.threshold || 0, false, true, false, true), box = this.crispCol(0, Math.min(stackEnd, stackThreshold), 0, Math.abs(stackEnd - stackThreshold));
                    brBoxY = box.y;
                    brBoxHeight = box.height;
                }
                const flip = (point.negative ? -1 : 1) *
                    (reversed ? -1 : 1) === -1;
                // Handle the where option
                let where = borderRadius.where;
                // Waterfall, hanging columns should have rounding on
                // all sides
                if (!where &&
                    this.is('waterfall') &&
                    Math.abs((point.yBottom || 0) -
                        (this.translatedThreshold || 0)) > this.borderWidth) {
                    where = 'all';
                }
                if (!where) {
                    where = 'end';
                }
                // Get the radius
                const r = Math.min(relativeLength(borderRadius.radius, width), width / 2, 
                // Cap to the height, but not if where is `end`
                where === 'all' ? height / 2 : Infinity) || 0;
                // If the `where` option is 'end', cut off the
                // rectangles by making the border-radius box one r
                // greater, so that the imaginary radius falls outside
                // the rectangle.
                if (where === 'end') {
                    if (flip) {
                        brBoxY -= r;
                        brBoxHeight += r;
                    }
                    else {
                        brBoxHeight += r;
                    }
                }
                extend(shapeArgs, { brBoxHeight, brBoxY, r });
            }
        }
    }
}
/** @private */
function compose(SeriesClass, SVGElementClass, SVGRendererClass) {
    const PieSeriesClass = SeriesClass.types.pie;
    if (!SVGElementClass.symbolCustomAttribs.includes('borderRadius')) {
        const symbols = SVGRendererClass.prototype.symbols;
        addEvent(SeriesClass, 'afterColumnTranslate', seriesOnAfterColumnTranslate, {
            // After columnrange and polar column modifications
            order: 9
        });
        addEvent(PieSeriesClass, 'afterTranslate', pieSeriesOnAfterTranslate);
        SVGElementClass.symbolCustomAttribs.push('borderRadius', 'brBoxHeight', 'brBoxY');
        oldArc = symbols.arc;
        oldRoundedRect = symbols.roundedRect;
        symbols.arc = arc;
        symbols.roundedRect = roundedRect;
    }
}
/** @private */
function optionsToObject(options, seriesBROptions) {
    if (!isObject(options)) {
        options = { radius: options || 0 };
    }
    return merge(defaultBorderRadiusOptions, seriesBROptions, options);
}
/** @private */
function pieSeriesOnAfterTranslate() {
    const borderRadius = optionsToObject(this.options.borderRadius);
    for (const point of this.points) {
        const shapeArgs = point.shapeArgs;
        if (shapeArgs) {
            shapeArgs.borderRadius = relativeLength(borderRadius.radius, (shapeArgs.r || 0) - ((shapeArgs.innerR) || 0));
        }
    }
}
/**
 * Extend roundedRect with individual cutting through rOffset.
 * @private
 */
function roundedRect(x, y, width, height, options = {}) {
    const path = oldRoundedRect(x, y, width, height, options), { r = 0, brBoxHeight = height, brBoxY = y } = options, brOffsetTop = y - brBoxY, brOffsetBtm = (brBoxY + brBoxHeight) - (y + height), 
    // When the distance to the border-radius box is greater than the r
    // itself, it means no border radius. The -0.1 accounts for float
    // rounding errors.
    rTop = (brOffsetTop - r) > -0.1 ? 0 : r, rBtm = (brOffsetBtm - r) > -0.1 ? 0 : r, cutTop = Math.max(rTop && brOffsetTop, 0), cutBtm = Math.max(rBtm && brOffsetBtm, 0);
    /*

    The naming of control points:

      / a -------- b \
     /                \
    h                  c
    |                  |
    |                  |
    |                  |
    g                  d
     \                /
      \ f -------- e /

    */
    const a = [x + rTop, y], b = [x + width - rTop, y], c = [x + width, y + rTop], d = [
        x + width, y + height - rBtm
    ], e = [
        x + width - rBtm,
        y + height
    ], f = [x + rBtm, y + height], g = [x, y + height - rBtm], h = [x, y + rTop];
    const applyPythagoras = (r, altitude) => Math.sqrt(Math.pow(r, 2) - Math.pow(altitude, 2));
    // Inside stacks, cut off part of the top
    if (cutTop) {
        const base = applyPythagoras(rTop, rTop - cutTop);
        a[0] -= base;
        b[0] += base;
        c[1] = h[1] = y + rTop - cutTop;
    }
    // Column is lower than the radius. Cut off bottom inside the top
    // radius.
    if (height < rTop - cutTop) {
        const base = applyPythagoras(rTop, rTop - cutTop - height);
        c[0] = d[0] = x + width - rTop + base;
        e[0] = Math.min(c[0], e[0]);
        f[0] = Math.max(d[0], f[0]);
        g[0] = h[0] = x + rTop - base;
        c[1] = h[1] = y + height;
    }
    // Inside stacks, cut off part of the bottom
    if (cutBtm) {
        const base = applyPythagoras(rBtm, rBtm - cutBtm);
        e[0] += base;
        f[0] -= base;
        d[1] = g[1] = y + height - rBtm + cutBtm;
    }
    // Cut off top inside the bottom radius
    if (height < rBtm - cutBtm) {
        const base = applyPythagoras(rBtm, rBtm - cutBtm - height);
        c[0] = d[0] = x + width - rBtm + base;
        b[0] = Math.min(c[0], b[0]);
        a[0] = Math.max(d[0], a[0]);
        g[0] = h[0] = x + rBtm - base;
        d[1] = g[1] = y;
    }
    // Preserve the box for data labels
    path.length = 0;
    path.push(['M', ...a], 
    // Top side
    ['L', ...b], 
    // Top right corner
    ['A', rTop, rTop, 0, 0, 1, ...c], 
    // Right side
    ['L', ...d], 
    // Bottom right corner
    ['A', rBtm, rBtm, 0, 0, 1, ...e], 
    // Bottom side
    ['L', ...f], 
    // Bottom left corner
    ['A', rBtm, rBtm, 0, 0, 1, ...g], 
    // Left side
    ['L', ...h], 
    // Top left corner
    ['A', rTop, rTop, 0, 0, 1, ...a], ['Z']);
    return path;
}
/* *
 *
 *  Default Export
 *
 * */
const BorderRadius = {
    compose,
    optionsToObject
};
/* harmony default export */ const Extensions_BorderRadius = (BorderRadius);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Detailed options for border radius.
 *
 * @sample  {highcharts} highcharts/plotoptions/column-borderradius/
 *          Rounded columns
 * @sample  highcharts/plotoptions/series-border-radius
 *          Column and pie with rounded border
 *
 * @interface Highcharts.BorderRadiusOptionsObject
 */ /**
* The border radius. A number signifies pixels. A percentage string, like for
* example `50%`, signifies a relative size. For columns this is relative to the
* column width, for pies it is relative to the radius and the inner radius.
*
* @name Highcharts.BorderRadiusOptionsObject#radius
* @type {string|number}
*/ /**
* The scope of the rounding for column charts. In a stacked column chart, the
* value `point` means each single point will get rounded corners. The value
* `stack` means the rounding will apply to the full stack, so that only points
* close to the top or bottom will receive rounding.
*
* @name Highcharts.BorderRadiusOptionsObject#scope
* @validvalue ["point", "stack"]
* @type {string}
*/ /**
* For column charts, where in the point or stack to apply rounding. The `end`
* value means only those corners at the point value will be rounded, leaving
* the corners at the base or threshold unrounded. This is the most intuitive
* behaviour. The `all` value means also the base will be rounded.
*
* @name Highcharts.BorderRadiusOptionsObject#where
* @validvalue ["all", "end"]
* @type {string}
* @default end
*/
(''); // Keeps doclets above in JS file

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Funnel/FunnelSeries.js
/* *
 *
 *  Highcharts funnel module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { composed, noop: FunnelSeries_noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { column: ColumnSeries, pie: PieSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { addEvent: FunnelSeries_addEvent, correctFloat, extend: FunnelSeries_extend, fireEvent, isArray, merge: FunnelSeries_merge, pick, pushUnique, relativeLength: FunnelSeries_relativeLength, splat } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const baseAlignDataLabel = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).series.prototype.alignDataLabel;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get positions - either an integer or a percentage string must be
 * given.
 * @private
 * @param {number|string|undefined} length
 *        Length
 * @param {number} relativeTo
 *        Relative factor
 * @return {number}
 *         Relative position
 */
function getLength(length, relativeTo) {
    return (/%$/).test(length) ?
        relativeTo * parseInt(length, 10) / 100 :
        parseInt(length, 10);
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.funnel
 *
 * @augments Highcharts.Series
 */
class FunnelSeries extends PieSeries {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    alignDataLabel(point, dataLabel, options, alignTo, isNew) {
        const series = point.series, reversed = series.options.reversed, dlBox = point.dlBox || point.shapeArgs, { align, padding = 0, verticalAlign } = options, inside = ((series.options || {}).dataLabels || {}).inside, centerY = series.center[1], plotY = point.plotY || 0, pointPlotY = (reversed ?
            2 * centerY - plotY :
            plotY), 
        // #16176: Only SVGLabel has height set
        dataLabelHeight = dataLabel.height ?? dataLabel.getBBox().height, widthAtLabel = series.getWidthAt(pointPlotY - dlBox.height / 2 +
            dataLabelHeight), offset = verticalAlign === 'middle' ?
            (dlBox.topWidth - dlBox.bottomWidth) / 4 :
            (widthAtLabel - dlBox.bottomWidth) / 2;
        let y = dlBox.y, x = dlBox.x;
        if (verticalAlign === 'middle') {
            y = dlBox.y - dlBox.height / 2 + dataLabelHeight / 2;
        }
        else if (verticalAlign === 'top') {
            y = dlBox.y - dlBox.height + dataLabelHeight + padding;
        }
        if (verticalAlign === 'top' && !reversed ||
            verticalAlign === 'bottom' && reversed ||
            verticalAlign === 'middle') {
            if (align === 'right') {
                x = dlBox.x - padding + offset;
            }
            else if (align === 'left') {
                x = dlBox.x + padding - offset;
            }
        }
        alignTo = {
            x: x,
            y: reversed ? y - dlBox.height : y,
            width: dlBox.bottomWidth,
            height: dlBox.height
        };
        options.verticalAlign = 'bottom';
        if (inside) {
            // If the distance were positive (as default), the overlapping
            // labels logic would skip these labels and they would be allowed
            // to overlap.
            options.distance = void 0;
        }
        // Call the parent method
        if (inside && point.visible) {
            baseAlignDataLabel.call(series, point, dataLabel, options, alignTo, isNew);
        }
        if (inside) {
            if (!point.visible && point.dataLabel) {
                // Avoid animation from top
                point.dataLabel.placed = false;
            }
            // If label is inside and we have contrast, set it:
            if (point.contrastColor) {
                dataLabel.css({
                    color: point.contrastColor
                });
            }
        }
    }
    /**
     * Extend the data label method.
     * @private
     */
    drawDataLabels() {
        (splat(this.options.dataLabels || {})[0].inside ?
            ColumnSeries :
            PieSeries).prototype.drawDataLabels.call(this);
    }
    /** @private */
    getDataLabelPosition(point, distance) {
        const y = point.plotY || 0, sign = point.half ? 1 : -1, x = this.getX(y, !!point.half, point);
        return {
            distance,
            // Initial position of the data label - it's utilized for finding
            // the final position for the label
            natural: {
                x: 0,
                y
            },
            computed: {
            // Used for generating connector path - initialized later in
            // drawDataLabels function x: undefined, y: undefined
            },
            // Left - funnel on the left side of the data label
            // Right - funnel on the right side of the data label
            alignment: point.half ? 'right' : 'left',
            connectorPosition: {
                breakAt: {
                    x: x + (distance - 5) * sign,
                    y
                },
                touchingSliceAt: {
                    x: x + distance * sign,
                    y
                }
            }
        };
    }
    /**
     * Overrides the pie translate method.
     * @private
     */
    translate() {
        const series = this, chart = series.chart, options = series.options, reversed = options.reversed, ignoreHiddenPoint = options.ignoreHiddenPoint, borderRadiusObject = Extensions_BorderRadius.optionsToObject(options.borderRadius), plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, center = options.center, centerX = getLength(center[0], plotWidth), centerY = getLength(center[1], plotHeight), width = getLength(options.width, plotWidth), height = getLength(options.height, plotHeight), neckWidth = getLength(options.neckWidth, plotWidth), neckHeight = getLength(options.neckHeight, plotHeight), neckY = (centerY - height / 2) + height - neckHeight, points = series.points, borderRadius = FunnelSeries_relativeLength(borderRadiusObject.radius, width), radiusScope = borderRadiusObject.scope, half = (options.dataLabels.position === 'left' ?
            1 :
            0), roundingFactors = (angle) => {
            const tan = Math.tan(angle / 2), cosA = Math.cos(alpha), sinA = Math.sin(alpha);
            let r = borderRadius, t = r / tan, k = Math.tan((Math.PI - angle) / 3.2104);
            if (t > maxT) {
                t = maxT;
                r = t * tan;
            }
            k *= r;
            return {
                dx: [t * cosA, (t - k) * cosA, t - k, t],
                dy: [t * sinA, (t - k) * sinA, t - k, t]
                    .map((i) => (reversed ? -i : i))
            };
        };
        let sum = 0, cumulative = 0, // Start at top
        tempWidth, path, fraction, alpha, // The angle between top and left point's edges
        maxT, x1, y1, x2, x3, y3, x4, y5;
        series.getWidthAt = function (y) {
            const top = (centerY - height / 2);
            return (y > neckY || height === neckHeight) ?
                neckWidth :
                neckWidth + (width - neckWidth) *
                    (1 - (y - top) / (height - neckHeight));
        };
        series.getX = function (y, half, point) {
            return centerX + (half ? -1 : 1) *
                ((series.getWidthAt(reversed ? 2 * centerY - y : y) / 2) +
                    (point.dataLabel?.dataLabelPosition?.distance ??
                        FunnelSeries_relativeLength(this.options.dataLabels?.distance || 0, width)));
        };
        // Expose
        series.center = [centerX, centerY, height];
        series.centerX = centerX;
        /*
        Individual point coordinate naming:

        x1,y1 _________________ x2,y1
        \                         /
         \                       /
          \                     /
           \                   /
            \                 /
           x3,y3 _________ x4,y3

        Additional for the base of the neck:

             |               |
             |               |
             |               |
           x3,y5 _________ x4,y5

        */
        // get the total sum
        for (const point of points) {
            if (point.y && point.isValid() &&
                (!ignoreHiddenPoint || point.visible !== false)) {
                sum += point.y;
            }
        }
        for (const point of points) {
            // Set start and end positions
            y5 = null;
            fraction = sum ? point.y / sum : 0;
            y1 = centerY - height / 2 + cumulative * height;
            y3 = y1 + fraction * height;
            tempWidth = series.getWidthAt(y1);
            x1 = centerX - tempWidth / 2;
            x2 = x1 + tempWidth;
            tempWidth = series.getWidthAt(y3);
            x3 = centerX - tempWidth / 2;
            x4 = x3 + tempWidth;
            // The entire point is within the neck
            if (correctFloat(y1) >= neckY) {
                x1 = x3 = centerX - neckWidth / 2;
                x2 = x4 = centerX + neckWidth / 2;
                // The base of the neck
            }
            else if (y3 > neckY) {
                y5 = y3;
                tempWidth = series.getWidthAt(neckY);
                x3 = centerX - tempWidth / 2;
                x4 = x3 + tempWidth;
                y3 = neckY;
            }
            if (reversed) {
                y1 = 2 * centerY - y1;
                y3 = 2 * centerY - y3;
                if (y5 !== null) {
                    y5 = 2 * centerY - y5;
                }
            }
            if (borderRadius && (radiusScope === 'point' ||
                point.index === 0 ||
                point.index === points.length - 1 ||
                y5 !== null)) {
                // Creating the path of funnel points with rounded corners
                // (#18839)
                const h = Math.abs(y3 - y1), xSide = x2 - x4, lBase = x4 - x3, lSide = Math.sqrt(xSide * xSide + h * h);
                // If xSide equals zero, return Infinity to avoid dividing
                // by zero (#20319)
                alpha = Math.atan(xSide !== 0 ? h / xSide : Infinity);
                maxT = lSide / 2;
                if (y5 !== null) {
                    maxT = Math.min(maxT, Math.abs(y5 - y3) / 2);
                }
                if (lBase >= 1) {
                    maxT = Math.min(maxT, lBase / 2);
                }
                // Creating a point base
                let f = roundingFactors(alpha);
                if (radiusScope === 'stack' && point.index !== 0) {
                    path = [
                        ['M', x1, y1],
                        ['L', x2, y1]
                    ];
                }
                else {
                    path = [
                        ['M', x1 + f.dx[0], y1 + f.dy[0]],
                        [
                            'C',
                            x1 + f.dx[1], y1 + f.dy[1],
                            x1 + f.dx[2], y1,
                            x1 + f.dx[3], y1
                        ],
                        ['L', x2 - f.dx[3], y1],
                        [
                            'C',
                            x2 - f.dx[2], y1,
                            x2 - f.dx[1], y1 + f.dy[1],
                            x2 - f.dx[0], y1 + f.dy[0]
                        ]
                    ];
                }
                if (y5 !== null) {
                    // Closure of point with extension
                    const fr = roundingFactors(Math.PI / 2);
                    f = roundingFactors(Math.PI / 2 + alpha);
                    path.push(['L', x4 + f.dx[0], y3 - f.dy[0]], [
                        'C',
                        x4 + f.dx[1], y3 - f.dy[1],
                        x4, y3 + f.dy[2],
                        x4, y3 + f.dy[3]
                    ]);
                    if (radiusScope === 'stack' &&
                        point.index !== points.length - 1) {
                        path.push(['L', x4, y5], ['L', x3, y5]);
                    }
                    else {
                        path.push(['L', x4, y5 - fr.dy[3]], [
                            'C',
                            x4, y5 - fr.dy[2],
                            x4 - fr.dx[2], y5,
                            x4 - fr.dx[3], y5
                        ], ['L', x3 + fr.dx[3], y5], [
                            'C',
                            x3 + fr.dx[2], y5,
                            x3, y5 - fr.dy[2],
                            x3, y5 - fr.dy[3]
                        ]);
                    }
                    path.push(['L', x3, y3 + f.dy[3]], [
                        'C',
                        x3, y3 + f.dy[2],
                        x3 - f.dx[1], y3 - f.dy[1],
                        x3 - f.dx[0], y3 - f.dy[0]
                    ]);
                }
                else if (lBase >= 1) {
                    // Closure of point without extension
                    f = roundingFactors(Math.PI - alpha);
                    if (radiusScope === 'stack' && point.index === 0) {
                        path.push(['L', x4, y3], ['L', x3, y3]);
                    }
                    else {
                        path.push(['L', x4 + f.dx[0], y3 - f.dy[0]], [
                            'C',
                            x4 + f.dx[1], y3 - f.dy[1],
                            x4 - f.dx[2], y3,
                            x4 - f.dx[3], y3
                        ], ['L', x3 + f.dx[3], y3], [
                            'C',
                            x3 + f.dx[2], y3,
                            x3 - f.dx[1], y3 - f.dy[1],
                            x3 - f.dx[0], y3 - f.dy[0]
                        ]);
                    }
                }
                else {
                    // Creating a rounded tip of the "pyramid"
                    f = roundingFactors(Math.PI - alpha * 2);
                    path.push(['L', x3 + f.dx[0], y3 - f.dy[0]], [
                        'C',
                        x3 + f.dx[1], y3 - f.dy[1],
                        x3 - f.dx[1], y3 - f.dy[1],
                        x3 - f.dx[0], y3 - f.dy[0]
                    ]);
                }
            }
            else {
                // Creating the path of funnel points without rounded corners
                path = [
                    ['M', x1, y1],
                    ['L', x2, y1],
                    ['L', x4, y3]
                ];
                if (y5 !== null) {
                    path.push(['L', x4, y5], ['L', x3, y5]);
                }
                path.push(['L', x3, y3]);
            }
            path.push(['Z']);
            // Prepare for using shared dr
            point.shapeType = 'path';
            point.shapeArgs = { d: path };
            // For tooltips and data labels
            point.percentage = fraction * 100;
            point.plotX = centerX;
            point.plotY = (y1 + (y5 || y3)) / 2;
            // Placement of tooltips and data labels
            point.tooltipPos = [
                centerX,
                point.plotY
            ];
            point.dlBox = {
                x: x3,
                y: y1,
                topWidth: x2 - x1,
                bottomWidth: x4 - x3,
                height: Math.abs(pick(y5, y3) - y1),
                width: NaN
            };
            // Slice is a noop on funnel points
            point.slice = FunnelSeries_noop;
            // Mimicking pie data label placement logic
            point.half = half;
            if (point.isValid() &&
                (!ignoreHiddenPoint || point.visible !== false)) {
                cumulative += fraction;
            }
        }
        fireEvent(series, 'afterTranslate');
    }
    /**
     * Funnel items don't have angles (#2289).
     * @private
     */
    sortByAngle(points) {
        points.sort((a, b) => (a.plotY - b.plotY));
    }
}
/* *
 *
 *  Static Properties
 *
 * */
FunnelSeries.defaultOptions = FunnelSeries_merge(PieSeries.defaultOptions, Funnel_FunnelSeriesDefaults);
FunnelSeries_extend(FunnelSeries.prototype, {
    animate: FunnelSeries_noop
});
/* *
 *
 *  Class Namespace
 *
 * */
(function (FunnelSeries) {
    /* *
     *
     *  Functions
     *
     * */
    /** @private */
    function compose(ChartClass) {
        if (pushUnique(composed, 'FunnelSeries')) {
            FunnelSeries_addEvent(ChartClass, 'afterHideAllOverlappingLabels', onChartAfterHideAllOverlappingLabels);
        }
    }
    FunnelSeries.compose = compose;
    /** @private */
    function onChartAfterHideAllOverlappingLabels() {
        for (const series of this.series) {
            let dataLabelsOptions = series.options && series.options.dataLabels;
            if (isArray(dataLabelsOptions)) {
                dataLabelsOptions = dataLabelsOptions[0];
            }
            if (series.is('pie') &&
                series.placeDataLabels &&
                dataLabelsOptions &&
                !dataLabelsOptions.inside) {
                series.placeDataLabels();
            }
        }
    }
})(FunnelSeries || (FunnelSeries = {}));
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('funnel', FunnelSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel_FunnelSeries = (FunnelSeries);

;// ./code/es-modules/Series/Pyramid/PyramidSeriesDefaults.js
/* *
 *
 *  Highcharts funnel module
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
const PyramidSeriesDefaults = {
    /**
     * The pyramid neck height is zero by default, as opposed to the funnel,
     * which shares the same layout logic.
     *
     * @since 3.0.10
     */
    neckHeight: '0%',
    /**
     * The pyramid neck width is zero by default, as opposed to the funnel,
     * which shares the same layout logic.
     *
     * @since 3.0.10
     */
    neckWidth: '0%',
    /**
     * The pyramid is reversed by default, as opposed to the funnel, which
     * shares the layout engine, and is not reversed.
     *
     * @since 3.0.10
     */
    reversed: true
};
/**
 * A `pyramid` series. If the [type](#series.pyramid.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.pyramid
 * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
 *            boostThreshold, boostBlending
 * @product   highcharts
 * @requires  modules/funnel
 * @apioption series.pyramid
 */
/**
 * An array of data points for the series. For the `pyramid` series
 * type, points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.pyramid.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        y: 9,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        y: 6,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|null|*>}
 * @extends   series.pie.data
 * @excluding sliced
 * @product   highcharts
 * @apioption series.pyramid.data
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Pyramid_PyramidSeriesDefaults = (PyramidSeriesDefaults);

;// ./code/es-modules/Series/Pyramid/PyramidSeries.js
/* *
 *
 *  Highcharts funnel module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: PyramidSeries_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * Pyramid series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.pyramid
 *
 * @augments Highcharts.Series
 */
class PyramidSeries extends Funnel_FunnelSeries {
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A pyramid series is a special type of funnel, without neck and reversed
 * by default.
 *
 * @sample highcharts/demo/pyramid/
 *         Pyramid chart
 *
 * @extends      plotOptions.funnel
 * @product      highcharts
 * @requires     modules/funnel
 * @optionparent plotOptions.pyramid
 */
PyramidSeries.defaultOptions = PyramidSeries_merge(Funnel_FunnelSeries.defaultOptions, Pyramid_PyramidSeriesDefaults);
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('pyramid', PyramidSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Pyramid_PyramidSeries = ((/* unused pure expression or super */ null && (PyramidSeries)));

;// ./code/es-modules/masters/modules/funnel.src.js





const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
Funnel_FunnelSeries.compose(G.Chart);
/* harmony default export */ const funnel_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});