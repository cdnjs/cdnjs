/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/mouse-wheel-zoom
 * @requires highcharts
 *
 * Mousewheel zoom module
 *
 * (c) 2023 Askel Eirik Johansson
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/mouse-wheel-zoom", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/mouse-wheel-zoom"] = factory(root["_Highcharts"]);
	else
		root["Highcharts"] = factory(root["Highcharts"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  "default": () => (/* binding */ mouse_wheel_zoom_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/Annotations/NavigationBindingsUtilities.js
/* *
 *
 *  (c) 2009-2025 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { defined, isNumber, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * Define types for editable fields per annotation. There is no need to define
 * numbers, because they won't change their type to string.
 * @private
 */
const annotationsFieldsTypes = {
    backgroundColor: 'string',
    borderColor: 'string',
    borderRadius: 'string',
    color: 'string',
    fill: 'string',
    fontSize: 'string',
    labels: 'string',
    name: 'string',
    stroke: 'string',
    title: 'string'
};
/* *
 *
 *  Functions
 *
 * */
/**
 * Returns the first xAxis or yAxis that was clicked with its value.
 *
 * @private
 *
 * @param {Array<Highcharts.PointerAxisCoordinateObject>} coords
 *        All the chart's x or y axes with a current pointer's axis value.
 *
 * @return {Highcharts.PointerAxisCoordinateObject}
 *         Object with a first found axis and its value that pointer
 *         is currently pointing.
 */
function getAssignedAxis(coords) {
    return coords.filter((coord) => {
        const extremes = coord.axis.getExtremes(), axisMin = extremes.min, axisMax = extremes.max, 
        // Correct axis edges when axis has series
        // with pointRange (like column)
        minPointOffset = pick(coord.axis.minPointOffset, 0);
        return isNumber(axisMin) && isNumber(axisMax) &&
            coord.value >= (axisMin - minPointOffset) &&
            coord.value <= (axisMax + minPointOffset) &&
            // Don't count navigator axis
            !coord.axis.options.isInternal;
    })[0]; // If the axes overlap, return the first axis that was found.
}
/**
 * Get field type according to value
 *
 * @private
 *
 * @param {'boolean'|'number'|'string'} value
 * Atomic type (one of: string, number, boolean)
 *
 * @return {'checkbox'|'number'|'text'}
 * Field type (one of: text, number, checkbox)
 */
function getFieldType(key, value) {
    const predefinedType = annotationsFieldsTypes[key];
    let fieldType = typeof value;
    if (defined(predefinedType)) {
        fieldType = predefinedType;
    }
    return {
        'string': 'text',
        'number': 'number',
        'boolean': 'checkbox'
    }[fieldType];
}
/* *
 *
 *  Default Export
 *
 * */
const NavigationBindingUtilities = {
    annotationsFieldsTypes,
    getAssignedAxis,
    getFieldType
};
/* harmony default export */ const NavigationBindingsUtilities = (NavigationBindingUtilities);

;// ./code/es-modules/Extensions/MouseWheelZoom/MouseWheelZoom.js
/* *
 *
 *  (c) 2023 Torstein Honsi, Askel Eirik Johansson
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { addEvent, isObject, pick: MouseWheelZoom_pick, defined: MouseWheelZoom_defined, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { getAssignedAxis: MouseWheelZoom_getAssignedAxis } = NavigationBindingsUtilities;
/* *
 *
 *  Constants
 *
 * */
const composedClasses = [], defaultOptions = {
    enabled: true,
    sensitivity: 1.1
};
let wheelTimer;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
const optionsToObject = (options) => {
    if (!isObject(options)) {
        options = {
            enabled: options ?? true
        };
    }
    return merge(defaultOptions, options);
};
/**
 * @private
 */
const zoomBy = function (chart, howMuch, xAxis, yAxis, mouseX, mouseY, options) {
    const type = MouseWheelZoom_pick(options.type, chart.zooming.type, '');
    let axes = [];
    if (type === 'x') {
        axes = xAxis;
    }
    else if (type === 'y') {
        axes = yAxis;
    }
    else if (type === 'xy') {
        axes = chart.axes;
    }
    const hasZoomed = chart.transform({
        axes,
        // Create imaginary reference and target rectangles around the mouse
        // point that scales up or down with `howMuch`;
        to: {
            x: mouseX - 5,
            y: mouseY - 5,
            // Must use 10 to get passed the limit for too small reference.
            // Below this, the transform will default to a pan.
            width: 10,
            height: 10
        },
        from: {
            x: mouseX - 5 * howMuch,
            y: mouseY - 5 * howMuch,
            width: 10 * howMuch,
            height: 10 * howMuch
        },
        trigger: 'mousewheel'
    });
    if (hasZoomed) {
        if (MouseWheelZoom_defined(wheelTimer)) {
            clearTimeout(wheelTimer);
        }
        // Some time after the last mousewheel event, run drop. In case any of
        // the affected axes had `startOnTick` or `endOnTick`, they will be
        // re-adjusted now.
        wheelTimer = setTimeout(() => {
            chart.pointer?.drop();
        }, 400);
    }
    return hasZoomed;
};
/**
 * @private
 */
function onAfterGetContainer() {
    const wheelZoomOptions = optionsToObject(this.zooming.mouseWheel);
    if (wheelZoomOptions.enabled) {
        addEvent(this.container, 'wheel', (e) => {
            e = this.pointer?.normalize(e) || e;
            const { pointer } = this, allowZoom = pointer && !pointer.inClass(e.target, 'highcharts-no-mousewheel');
            // Firefox uses e.detail, WebKit and IE uses deltaX, deltaY, deltaZ.
            if (this.isInsidePlot(e.chartX - this.plotLeft, e.chartY - this.plotTop) && allowZoom) {
                const wheelSensitivity = wheelZoomOptions.sensitivity || 1.1, delta = e.detail || ((e.deltaY || 0) / 120), xAxisCoords = MouseWheelZoom_getAssignedAxis(pointer.getCoordinates(e).xAxis), yAxisCoords = MouseWheelZoom_getAssignedAxis(pointer.getCoordinates(e).yAxis);
                const hasZoomed = zoomBy(this, Math.pow(wheelSensitivity, delta), xAxisCoords ? [xAxisCoords.axis] : this.xAxis, yAxisCoords ? [yAxisCoords.axis] : this.yAxis, e.chartX, e.chartY, wheelZoomOptions);
                // Prevent page scroll
                if (hasZoomed) {
                    e.preventDefault?.();
                }
            }
        });
    }
}
/**
 * @private
 */
function compose(ChartClass) {
    if (composedClasses.indexOf(ChartClass) === -1) {
        composedClasses.push(ChartClass);
        addEvent(ChartClass, 'afterGetContainer', onAfterGetContainer);
    }
}
/* *
 *
 *  Default Export
 *
 * */
const MouseWheelZoomComposition = {
    compose
};
/* harmony default export */ const MouseWheelZoom = (MouseWheelZoomComposition);
/* *
 *
 *  API Options
 *
 * */
/**
 * The mouse wheel zoom is a feature included in Highcharts Stock, but is also
 * available for Highcharts Core as a module. Zooming with the mouse wheel is
 * enabled by default in Highcharts Stock. In Highcharts Core it is enabled if
 * [chart.zooming.type](chart.zooming.type) is set. It can be disabled by
 * setting this option to `false`.
 *
 * @type      {boolean|object}
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @sample    {highcharts} highcharts/mouse-wheel-zoom/enabled
 *            Enable or disable
 * @sample    {highstock} stock/mouse-wheel-zoom/enabled
 *            Enable or disable
 * @apioption chart.zooming.mouseWheel
 */
/**
 * Zooming with the mouse wheel can be disabled by setting this option to
 * `false`.
 *
 * @type      {boolean}
 * @default   true
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @apioption chart.zooming.mouseWheel.enabled
 */
/**
 * Adjust the sensitivity of the zoom. Sensitivity of mouse wheel or trackpad
 * scrolling. `1` is no sensitivity, while with `2`, one mouse wheel delta will
 * zoom in `50%`.
 *
 * @type      {number}
 * @default   1.1
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @sample    {highcharts} highcharts/mouse-wheel-zoom/sensitivity
 *            Change mouse wheel zoom sensitivity
 * @sample    {highstock} stock/mouse-wheel-zoom/sensitivity
 *            Change mouse wheel zoom sensitivity
 * @apioption chart.zooming.mouseWheel.sensitivity
 */
/**
 * Decides in what dimensions the user can zoom scrolling the wheel. Can be one
 * of `x`, `y` or `xy`. In Highcharts Core, if not specified here, it will
 * inherit the type from [chart.zooming.type](chart.zooming.type). In Highcharts
 * Stock, it defaults to `x`.
 *
 * Note that particularly with mouse wheel in the y direction, the zoom is
 * affected by the default [yAxis.startOnTick](#yAxis.startOnTick) and
 * [endOnTick]((#yAxis.endOnTick)) settings. In order to respect these settings,
 * the zoom level will adjust after the user has stopped zooming. To prevent
 * this, consider setting `startOnTick` and `endOnTick` to `false`.
 *
 * @type      {string}
 * @default   {highcharts} undefined
 * @default   {highstock} x
 * @validvalue ["x", "y", "xy"]
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @apioption chart.zooming.mouseWheel.type
 */
(''); // Keeps doclets above in JS file

;// ./code/es-modules/masters/modules/mouse-wheel-zoom.src.js




const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.MouseWheelZoom = G.MouseWheelZoom || MouseWheelZoom;
G.MouseWheelZoom.compose(G.Chart);
/* harmony default export */ const mouse_wheel_zoom_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});