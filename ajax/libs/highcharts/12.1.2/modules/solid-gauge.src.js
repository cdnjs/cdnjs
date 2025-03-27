/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/solid-gauge
 * @requires highcharts
 * @requires highcharts/highcharts-more
 *
 * Solid angular gauge module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Color"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/solid-gauge", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Color"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/solid-gauge"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Color"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Color"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__620__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 620:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__620__;

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
  "default": () => (/* binding */ solid_gauge_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
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
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Color"],"commonjs":["highcharts","Color"],"commonjs2":["highcharts","Color"],"root":["Highcharts","Color"]}
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_ = __webpack_require__(620);
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default = /*#__PURE__*/__webpack_require__.n(highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_);
;// ./code/es-modules/Core/Axis/Color/ColorAxisLike.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { parse: color } = (highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default());

const { merge: ColorAxisLike_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Namespace
 *
 * */
var ColorAxisLike;
(function (ColorAxisLike) {
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
    /**
     * Initialize defined data classes.
     * @private
     */
    function initDataClasses(userOptions) {
        const axis = this, chart = axis.chart, legendItem = axis.legendItem = axis.legendItem || {}, options = axis.options, userDataClasses = userOptions.dataClasses || [];
        let dataClass, dataClasses, colorCount = chart.options.chart.colorCount, colorCounter = 0, colors;
        axis.dataClasses = dataClasses = [];
        legendItem.labels = [];
        for (let i = 0, iEnd = userDataClasses.length; i < iEnd; ++i) {
            dataClass = userDataClasses[i];
            dataClass = ColorAxisLike_merge(dataClass);
            dataClasses.push(dataClass);
            if (!chart.styledMode && dataClass.color) {
                continue;
            }
            if (options.dataClassColor === 'category') {
                if (!chart.styledMode) {
                    colors = chart.options.colors || [];
                    colorCount = colors.length;
                    dataClass.color = colors[colorCounter];
                }
                dataClass.colorIndex = colorCounter;
                // Loop back to zero
                colorCounter++;
                if (colorCounter === colorCount) {
                    colorCounter = 0;
                }
            }
            else {
                dataClass.color = color(options.minColor).tweenTo(color(options.maxColor), iEnd < 2 ? 0.5 : i / (iEnd - 1) // #3219
                );
            }
        }
    }
    ColorAxisLike.initDataClasses = initDataClasses;
    /**
     * Create initial color stops.
     * @private
     */
    function initStops() {
        const axis = this, options = axis.options, stops = axis.stops = options.stops || [
            [0, options.minColor || ''],
            [1, options.maxColor || '']
        ];
        for (let i = 0, iEnd = stops.length; i < iEnd; ++i) {
            stops[i].color = color(stops[i][1]);
        }
    }
    ColorAxisLike.initStops = initStops;
    /**
     * Normalize logarithmic values.
     * @private
     */
    function normalizedValue(value) {
        const axis = this, max = axis.max || 0, min = axis.min || 0;
        if (axis.logarithmic) {
            value = axis.logarithmic.log2lin(value);
        }
        return 1 - ((max - value) /
            ((max - min) || 1));
    }
    ColorAxisLike.normalizedValue = normalizedValue;
    /**
     * Translate from a value to a color.
     * @private
     */
    function toColor(value, point) {
        const axis = this;
        const dataClasses = axis.dataClasses;
        const stops = axis.stops;
        let pos, from, to, color, dataClass, i;
        if (dataClasses) {
            i = dataClasses.length;
            while (i--) {
                dataClass = dataClasses[i];
                from = dataClass.from;
                to = dataClass.to;
                if ((typeof from === 'undefined' || value >= from) &&
                    (typeof to === 'undefined' || value <= to)) {
                    color = dataClass.color;
                    if (point) {
                        point.dataClass = i;
                        point.colorIndex = dataClass.colorIndex;
                    }
                    break;
                }
            }
        }
        else {
            pos = axis.normalizedValue(value);
            i = stops.length;
            while (i--) {
                if (pos > stops[i][0]) {
                    break;
                }
            }
            from = stops[i] || stops[i + 1];
            to = stops[i + 1] || from;
            // The position within the gradient
            pos = 1 - (to[0] - pos) / ((to[0] - from[0]) || 1);
            color = from.color.tweenTo(to.color, pos);
        }
        return color;
    }
    ColorAxisLike.toColor = toColor;
})(ColorAxisLike || (ColorAxisLike = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Color_ColorAxisLike = (ColorAxisLike);

;// ./code/es-modules/Core/Axis/SolidGaugeAxis.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { extend: SolidGaugeAxis_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function init(axis) {
    SolidGaugeAxis_extend(axis, Color_ColorAxisLike);
}
/* *
 *
 *  Default export
 *
 * */
const SolidGaugeAxis = {
    init
};
/* harmony default export */ const Axis_SolidGaugeAxis = (SolidGaugeAxis);

;// ./code/es-modules/Series/SolidGauge/SolidGaugeSeriesDefaults.js
/* *
 *
 *  Solid angular gauge module
 *
 *  (c) 2010-2024 Torstein Honsi
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
 * A solid gauge is a circular gauge where the value is indicated by a filled
 * arc, and the color of the arc may variate with the value.
 *
 * @sample highcharts/demo/gauge-solid/
 *         Solid gauges
 *
 * @extends      plotOptions.gauge
 * @excluding    dial, pivot, wrap
 * @product      highcharts
 * @requires     modules/solid-gauge
 * @optionparent plotOptions.solidgauge
 */
const SolidGaugeSeriesDefaults = {
    /**
     * The inner radius for points in a solid gauge. Can be given only in
     * percentage, either as a number or a string like `"50%"`.
     *
     * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
     *         Individual radius and innerRadius
     *
     * @type      {string}
     * @default   "60%"
     * @since     4.1.6
     * @product   highcharts
     * @apioption plotOptions.solidgauge.innerRadius
     */
    /**
     * Whether the strokes of the solid gauge should be `round` or `square`.
     *
     * @sample {highcharts} highcharts/demo/gauge-multiple-kpi/
     *         Rounded gauge
     *
     * @type       {string}
     * @default    round
     * @since      4.2.2
     * @product    highcharts
     * @validvalue ["square", "round"]
     * @apioption  plotOptions.solidgauge.linecap
     */
    /**
     * Allow the gauge to overshoot the end of the perimeter axis by this
     * many degrees. Say if the gauge axis goes from 0 to 60, a value of
     * 100, or 1000, will show 5 degrees beyond the end of the axis when this
     * option is set to 5.
     *
     * @type      {number}
     * @default   0
     * @since     3.0.10
     * @product   highcharts
     * @apioption plotOptions.solidgauge.overshoot
     */
    /**
     * The outer radius for points in a solid gauge. Can be given only in
     * percentage, either as a number or a string like `"100%"`.
     *
     * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
     *         Individual radius and innerRadius
     *
     * @type      {string}
     * @default   "100%"
     * @since     4.1.6
     * @product   highcharts
     * @apioption plotOptions.solidgauge.radius
     */
    /**
     * Whether to draw rounded edges on the gauge. This options adds the radius
     * of the rounding to the ends of the arc, so it extends past the actual
     * values. When `borderRadius` is set, it takes precedence over `rounded`. A
     * `borderRadius` of 50% behaves like `rounded`, except the shape is not
     * extended past its value.
     *
     * @sample {highcharts} highcharts/demo/gauge-multiple-kpi/
     *         Gauge showing multiple KPIs
     *
     * @type      {boolean}
     * @default   false
     * @since     5.0.8
     * @product   highcharts
     * @apioption plotOptions.solidgauge.rounded
     */
    /**
     * The threshold or base level for the gauge.
     *
     * @sample {highcharts} highcharts/plotoptions/solidgauge-threshold/
     *         Zero threshold with negative and positive values
     *
     * @type      {number|null}
     * @since     5.0.3
     * @product   highcharts
     * @apioption plotOptions.solidgauge.threshold
     */
    /**
     * Whether to give each point an individual color.
     */
    colorByPoint: true,
    dataLabels: {
        y: 0
    }
};
/**
 * A `solidgauge` series. If the [type](#series.solidgauge.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 *
 * @extends   series,plotOptions.solidgauge
 * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
 *            cropThreshold, dashStyle, dataParser, dataURL, dial,
 *            findNearestPointBy, getExtremesFromAll, marker, negativeColor,
 *            pointPlacement, pivot, shadow, softThreshold, stack, stacking,
 *            states, step, threshold, turboThreshold, wrap, zoneAxis, zones,
 *            dataSorting, boostBlending
 * @product   highcharts
 * @requires  modules/solid-gauge
 * @apioption series.solidgauge
 */
/**
 * An array of data points for the series. For the `solidgauge` series
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
 *    [turboThreshold](#series.solidgauge.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        y: 5,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        y: 7,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * The typical gauge only contains a single data value.
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|null|*>}
 * @extends   series.gauge.data
 * @product   highcharts
 * @apioption series.solidgauge.data
 */
/**
 * The inner radius of an individual point in a solid gauge. Can be given only
 * in percentage, either as a number or a string like `"50%"`.
 *
 * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
 *         Individual radius and innerRadius
 *
 * @type      {string}
 * @since     4.1.6
 * @product   highcharts
 * @apioption series.solidgauge.data.innerRadius
 */
/**
 * The outer radius of an individual point in a solid gauge. Can be
 * given only in percentage, either as a number or a string like `"100%"`.
 *
 * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
 *         Individual radius and innerRadius
 *
 * @type      {string}
 * @since     4.1.6
 * @product   highcharts
 * @apioption series.solidgauge.data.radius
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const SolidGauge_SolidGaugeSeriesDefaults = (SolidGaugeSeriesDefaults);

;// ./code/es-modules/Series/SolidGauge/SolidGaugeSeries.js
/* *
 *
 *  Solid angular gauge module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { gauge: GaugeSeries, pie: PieSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;



const { clamp, extend: SolidGaugeSeries_extend, isNumber, merge: SolidGaugeSeries_merge, pick, pInt } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * SolidGauge series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.solidgauge
 *
 * @augments Highcarts.Series
 */
class SolidGaugeSeries extends GaugeSeries {
    /* *
     *
     *  Functions
     *
     * */
    // Extend the translate function to extend the Y axis with the necessary
    // decoration (#5895).
    translate() {
        const axis = this.yAxis;
        Axis_SolidGaugeAxis.init(axis);
        // Prepare data classes
        if (!axis.dataClasses && axis.options.dataClasses) {
            axis.initDataClasses(axis.options);
        }
        axis.initStops();
        // Generate points and inherit data label position
        GaugeSeries.prototype.translate.call(this);
    }
    // Draw the points where each point is one needle.
    drawPoints() {
        const series = this, yAxis = series.yAxis, center = yAxis.center, options = series.options, renderer = series.chart.renderer, overshoot = options.overshoot, rounded = options.rounded && options.borderRadius === void 0, overshootVal = isNumber(overshoot) ?
            overshoot / 180 * Math.PI :
            0;
        let thresholdAngleRad;
        // Handle the threshold option
        if (isNumber(options.threshold)) {
            thresholdAngleRad = yAxis.startAngleRad + yAxis.translate(options.threshold, void 0, void 0, void 0, true);
        }
        this.thresholdAngleRad = pick(thresholdAngleRad, yAxis.startAngleRad);
        for (const point of series.points) {
            // #10630 null point should not be draw
            if (!point.isNull) { // Condition like in pie chart
                const radius = ((pInt(pick(point.options.radius, options.radius, 100 // %
                )) * center[2]) / 200), innerRadius = ((pInt(pick(point.options.innerRadius, options.innerRadius, 60 // %
                )) * center[2]) / 200), axisMinAngle = Math.min(yAxis.startAngleRad, yAxis.endAngleRad), axisMaxAngle = Math.max(yAxis.startAngleRad, yAxis.endAngleRad);
                let graphic = point.graphic, rotation = (yAxis.startAngleRad +
                    yAxis.translate(point.y, void 0, void 0, void 0, true)), shapeArgs, d, toColor = yAxis.toColor(point.y, point);
                if (toColor === 'none') { // #3708
                    toColor = point.color || series.color || 'none';
                }
                if (toColor !== 'none') {
                    point.color = toColor;
                }
                // Handle overshoot and clipping to axis max/min
                rotation = clamp(rotation, axisMinAngle - overshootVal, axisMaxAngle + overshootVal);
                // Handle the wrap option
                if (options.wrap === false) {
                    rotation = clamp(rotation, axisMinAngle, axisMaxAngle);
                }
                const angleOfRounding = rounded ?
                    ((radius - innerRadius) / 2) / radius :
                    0, start = Math.min(rotation, series.thresholdAngleRad) -
                    angleOfRounding;
                let end = Math.max(rotation, series.thresholdAngleRad) +
                    angleOfRounding;
                if (end - start > 2 * Math.PI) {
                    end = start + 2 * Math.PI;
                }
                let borderRadius = rounded ? '50%' : 0;
                if (options.borderRadius) {
                    borderRadius = Extensions_BorderRadius.optionsToObject(options.borderRadius).radius;
                }
                point.shapeArgs = shapeArgs = {
                    x: center[0],
                    y: center[1],
                    r: radius,
                    innerR: innerRadius,
                    start,
                    end,
                    borderRadius
                };
                point.startR = radius; // For PieSeries.animate
                if (graphic) {
                    d = shapeArgs.d;
                    graphic.animate(SolidGaugeSeries_extend({ fill: toColor }, shapeArgs));
                    if (d) {
                        shapeArgs.d = d; // Animate alters it
                    }
                }
                else {
                    point.graphic = graphic = renderer.arc(shapeArgs)
                        .attr({
                        fill: toColor,
                        'sweep-flag': 0
                    })
                        .add(series.group);
                }
                if (!series.chart.styledMode) {
                    if (options.linecap !== 'square') {
                        graphic.attr({
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round'
                        });
                    }
                    graphic.attr({
                        stroke: options.borderColor || 'none',
                        'stroke-width': options.borderWidth || 0
                    });
                }
                if (graphic) {
                    graphic.addClass(point.getClassName(), true);
                }
            }
        }
    }
    // Extend the pie slice animation by animating from start angle and up.
    animate(init) {
        if (!init) {
            this.startAngleRad = this.thresholdAngleRad;
            PieSeries.prototype.animate.call(this, init);
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
SolidGaugeSeries.defaultOptions = SolidGaugeSeries_merge(GaugeSeries.defaultOptions, SolidGauge_SolidGaugeSeriesDefaults);
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('solidgauge', SolidGaugeSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const SolidGauge_SolidGaugeSeries = ((/* unused pure expression or super */ null && (SolidGaugeSeries)));

;// ./code/es-modules/masters/modules/solid-gauge.src.js




/* harmony default export */ const solid_gauge_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});