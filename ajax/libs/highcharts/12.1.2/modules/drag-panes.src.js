/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/drag-panes
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Drag-panes module
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Kacper Madej
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/drag-panes", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/drag-panes"] = factory(root["_Highcharts"]);
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
  "default": () => (/* binding */ drag_panes_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/DragPanes/AxisResizerDefaults.js
/* *
 *
 *  Plugin for resizing axes / panes in a chart.
 *
 *  (c) 2010-2024 Highsoft AS
 *
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
const AxisResizerDefaults = {
    /**
     * Minimal size of a resizable axis. Could be set as a percent
     * of plot area or pixel size.
     *
     * @sample {highstock} stock/yaxis/resize-min-max-length
     *         minLength and maxLength
     *
     * @type      {number|string}
     * @product   highstock
     * @requires  modules/drag-panes
     * @apioption yAxis.minLength
     */
    minLength: '10%',
    /**
     * Maximal size of a resizable axis. Could be set as a percent
     * of plot area or pixel size.
     *
     * @sample {highstock} stock/yaxis/resize-min-max-length
     *         minLength and maxLength
     *
     * @type      {number|string}
     * @product   highstock
     * @requires  modules/drag-panes
     * @apioption yAxis.maxLength
     */
    maxLength: '100%',
    /**
     * Options for axis resizing. It adds a thick line between panes which
     * the user can drag in order to resize the panes.
     *
     * @sample {highstock} stock/demo/candlestick-and-volume
     *         Axis resizing enabled
     *
     * @product      highstock
     * @requires     modules/drag-panes
     * @optionparent yAxis.resize
     */
    resize: {
        /**
         * Contains two arrays of axes that are controlled by control line
         * of the axis.
         *
         * @requires modules/drag-panes
         */
        controlledAxis: {
            /**
             * Array of axes that should move out of the way of resizing
             * being done for the current axis. If not set, the next axis
             * will be used.
             *
             * @sample {highstock} stock/yaxis/multiple-resizers
             *         Three panes with resizers
             * @sample {highstock} stock/yaxis/resize-multiple-axes
             *         One resizer controlling multiple axes
             *
             * @type     {Array<number|string>}
             * @default  []
             * @requires modules/drag-panes
             */
            next: [],
            /**
             * Array of axes that should move with the current axis
             * while resizing.
             *
             * @sample {highstock} stock/yaxis/multiple-resizers
             *         Three panes with resizers
             * @sample {highstock} stock/yaxis/resize-multiple-axes
             *         One resizer controlling multiple axes
             *
             * @type     {Array<number|string>}
             * @default  []
             * @requires modules/drag-panes
             */
            prev: []
        },
        /**
         * Enable or disable resize by drag for the axis.
         *
         * @sample {highstock} stock/demo/candlestick-and-volume
         *         Enabled resizer
         *
         * @requires modules/drag-panes
         */
        enabled: false,
        /**
         * Cursor style for the control line.
         *
         * In styled mode use class `highcharts-axis-resizer` instead.
         *
         * @requires modules/drag-panes
         */
        cursor: 'ns-resize',
        /**
         * Color of the control line.
         *
         * In styled mode use class `highcharts-axis-resizer` instead.
         *
         * @sample {highstock} stock/yaxis/styled-resizer
         *         Styled resizer
         *
         * @type     {Highcharts.ColorString}
         * @requires modules/drag-panes
         */
        lineColor: "#cccccc" /* Palette.neutralColor20 */,
        /**
         * Dash style of the control line.
         *
         * In styled mode use class `highcharts-axis-resizer` instead.
         *
         * @see For supported options check [dashStyle](#plotOptions.series.dashStyle)
         *
         * @sample {highstock} stock/yaxis/styled-resizer
         *         Styled resizer
         *
         * @requires modules/drag-panes
         */
        lineDashStyle: 'Solid',
        /**
         * Width of the control line.
         *
         * In styled mode use class `highcharts-axis-resizer` instead.
         *
         * @sample {highstock} stock/yaxis/styled-resizer
         *         Styled resizer
         *
         * @requires modules/drag-panes
         */
        lineWidth: 4,
        /**
         * Horizontal offset of the control line.
         *
         * @sample {highstock} stock/yaxis/styled-resizer
         *         Styled resizer
         *
         * @requires modules/drag-panes
         */
        x: 0,
        /**
         * Vertical offset of the control line.
         *
         * @sample {highstock} stock/yaxis/styled-resizer
         *         Styled resizer
         *
         * @requires modules/drag-panes
         */
        y: 0
    }
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DragPanes_AxisResizerDefaults = (AxisResizerDefaults);

;// ./code/es-modules/Extensions/DragPanes/AxisResizer.js
/* *
 *
 *  Plugin for resizing axes / panes in a chart.
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { addEvent, clamp, isNumber, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The AxisResizer class.
 *
 * @private
 * @class
 * @name Highcharts.AxisResizer
 *
 * @param {Highcharts.Axis} axis
 *        Main axis for the AxisResizer.
 */
class AxisResizer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(axis) {
        this.init(axis);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize the AxisResizer object.
     *
     * @function Highcharts.AxisResizer#init
     *
     * @param {Highcharts.Axis} axis
     *        Main axis for the AxisResizer.
     */
    init(axis, update) {
        this.axis = axis;
        this.options = axis.options.resize || {};
        this.render();
        if (!update) {
            // Add mouse events.
            this.addMouseEvents();
        }
    }
    /**
     * Render the AxisResizer
     *
     * @function Highcharts.AxisResizer#render
     */
    render() {
        const resizer = this, axis = resizer.axis, chart = axis.chart, options = resizer.options, x = options.x || 0, y = options.y, 
        // Normalize control line position according to the plot area
        pos = clamp(axis.top + axis.height + y, chart.plotTop, chart.plotTop + chart.plotHeight);
        let attr = {};
        if (!chart.styledMode) {
            attr = {
                cursor: options.cursor,
                stroke: options.lineColor,
                'stroke-width': options.lineWidth,
                dashstyle: options.lineDashStyle
            };
        }
        // Register current position for future reference.
        resizer.lastPos = pos - y;
        if (!resizer.controlLine) {
            resizer.controlLine = chart.renderer.path()
                .addClass('highcharts-axis-resizer');
        }
        // Add to axisGroup after axis update, because the group is recreated
        // Do .add() before path is calculated because strokeWidth() needs it.
        resizer.controlLine.add(axis.axisGroup);
        const lineWidth = chart.styledMode ?
            resizer.controlLine.strokeWidth() :
            options.lineWidth;
        attr.d = chart.renderer.crispLine([
            ['M', axis.left + x, pos],
            ['L', axis.left + axis.width + x, pos]
        ], lineWidth);
        resizer.controlLine.attr(attr);
    }
    /**
     * Set up the mouse and touch events for the control line.
     *
     * @function Highcharts.AxisResizer#addMouseEvents
     */
    addMouseEvents() {
        const resizer = this, ctrlLineElem = resizer.controlLine.element, container = resizer.axis.chart.container, eventsToUnbind = [];
        let mouseMoveHandler, mouseUpHandler, mouseDownHandler;
        // Create mouse events' handlers.
        // Make them as separate functions to enable wrapping them:
        resizer.mouseMoveHandler = mouseMoveHandler = (e) => (resizer.onMouseMove(e));
        resizer.mouseUpHandler = mouseUpHandler = (e) => (resizer.onMouseUp(e));
        resizer.mouseDownHandler = mouseDownHandler = () => (resizer.onMouseDown());
        eventsToUnbind.push(
        // Add mouse move and mouseup events. These are bind to doc/div,
        // because resizer.grabbed flag is stored in mousedown events.
        addEvent(container, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler), addEvent(ctrlLineElem, 'mousedown', mouseDownHandler), 
        // Touch events.
        addEvent(container, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler), addEvent(ctrlLineElem, 'touchstart', mouseDownHandler));
        resizer.eventsToUnbind = eventsToUnbind;
    }
    /**
     * Mouse move event based on x/y mouse position.
     *
     * @function Highcharts.AxisResizer#onMouseMove
     *
     * @param {Highcharts.PointerEventObject} e
     *        Mouse event.
     */
    onMouseMove(e) {
        /*
         * In iOS, a mousemove event with e.pageX === 0 is fired when holding
         * the finger down in the center of the scrollbar. This should
         * be ignored. Borrowed from Navigator.
         */
        if (!e.touches || e.touches[0].pageX !== 0) {
            const pointer = this.axis.chart.pointer;
            // Drag the control line
            if (this.grabbed && pointer) {
                this.hasDragged = true;
                this.updateAxes(pointer.normalize(e).chartY - (this.options.y || 0));
            }
        }
    }
    /**
     * Mouse up event based on x/y mouse position.
     *
     * @function Highcharts.AxisResizer#onMouseUp
     *
     * @param {Highcharts.PointerEventObject} e
     *        Mouse event.
     */
    onMouseUp(e) {
        const pointer = this.axis.chart.pointer;
        if (this.hasDragged && pointer) {
            this.updateAxes(pointer.normalize(e).chartY - (this.options.y || 0));
        }
        // Restore runPointActions.
        this.grabbed = this.hasDragged = this.axis.chart.activeResizer = void 0;
    }
    /**
     * Mousedown on a control line.
     * Will store necessary information for drag&drop.
     *
     * @function Highcharts.AxisResizer#onMouseDown
     */
    onMouseDown() {
        // Clear all hover effects.
        this.axis.chart.pointer?.reset(false, 0);
        // Disable runPointActions.
        this.grabbed = this.axis.chart.activeResizer = true;
    }
    /**
     * Update all connected axes after a change of control line position
     *
     * @function Highcharts.AxisResizer#updateAxes
     *
     * @param {number} chartY
     */
    updateAxes(chartY) {
        const resizer = this, chart = resizer.axis.chart, axes = resizer.options.controlledAxis, nextAxes = axes.next.length === 0 ?
            [chart.yAxis.indexOf(resizer.axis) + 1] : axes.next, 
        // Main axis is included in the prev array by default
        prevAxes = [resizer.axis].concat(axes.prev), 
        // Prev and next configs
        axesConfigs = [], plotTop = chart.plotTop, plotHeight = chart.plotHeight, plotBottom = plotTop + plotHeight, calculatePercent = (value) => (value * 100 / plotHeight + '%'), normalize = (val, min, max) => (Math.round(clamp(val, min, max)));
        // Normalize chartY to plot area limits
        chartY = clamp(chartY, plotTop, plotBottom);
        let stopDrag = false, yDelta = chartY - resizer.lastPos;
        // Update on changes of at least 1 pixel in the desired direction
        if (yDelta * yDelta < 1) {
            return;
        }
        let isFirst = true;
        // First gather info how axes should behave
        for (const axesGroup of [prevAxes, nextAxes]) {
            for (const axisInfo of axesGroup) {
                // Axes given as array index, axis object or axis id
                const axis = isNumber(axisInfo) ?
                    // If it's a number - it's an index
                    chart.yAxis[axisInfo] :
                    (
                    // If it's first elem. in first group
                    isFirst ?
                        // Then it's an Axis object
                        axisInfo :
                        // Else it should be an id
                        chart.get(axisInfo)), axisOptions = axis && axis.options, optionsToUpdate = {};
                let height, top;
                // Skip if axis is not found
                // or it is navigator's yAxis (#7732)
                if (!axisOptions || axisOptions.isInternal) {
                    isFirst = false;
                    continue;
                }
                top = axis.top;
                const minLength = Math.round(relativeLength(axisOptions.minLength || NaN, plotHeight)), maxLength = Math.round(relativeLength(axisOptions.maxLength || NaN, plotHeight));
                if (!isFirst && axesGroup === nextAxes) {
                    // Try to change height first. yDelta could had changed
                    yDelta = chartY - resizer.lastPos;
                    // Normalize height to option limits
                    height = normalize(axis.len - yDelta, minLength, maxLength);
                    // Adjust top, so the axis looks like shrinked from top
                    top = axis.top + yDelta;
                    // Check for plot area limits
                    if (top + height > plotBottom) {
                        const hDelta = plotBottom - height - top;
                        chartY += hDelta;
                        top += hDelta;
                    }
                    // Fit to plot - when overflowing on top
                    if (top < plotTop) {
                        top = plotTop;
                        if (top + height > plotBottom) {
                            height = plotHeight;
                        }
                    }
                    // If next axis meets min length, stop dragging:
                    if (height === minLength) {
                        stopDrag = true;
                    }
                    axesConfigs.push({
                        axis: axis,
                        options: {
                            top: calculatePercent(top - plotTop),
                            height: calculatePercent(height)
                        }
                    });
                }
                else {
                    // Normalize height to option limits
                    height = normalize(chartY - top, minLength, maxLength);
                    // If prev axis meets max length, stop dragging:
                    if (height === maxLength) {
                        stopDrag = true;
                    }
                    // Check axis size limits
                    chartY = top + height;
                    axesConfigs.push({
                        axis: axis,
                        options: {
                            height: calculatePercent(height)
                        }
                    });
                }
                isFirst = false;
                optionsToUpdate.height = height;
            }
        }
        // If we hit the min/maxLength with dragging, don't do anything:
        if (!stopDrag) {
            // Now update axes:
            for (const config of axesConfigs) {
                config.axis.update(config.options, false);
            }
            chart.redraw(false);
        }
    }
    /**
     * Destroy AxisResizer. Clear outside references, clear events,
     * destroy elements, nullify properties.
     *
     * @function Highcharts.AxisResizer#destroy
     */
    destroy() {
        const resizer = this, axis = resizer.axis;
        // Clear resizer in axis
        delete axis.resizer;
        // Clear control line events
        if (this.eventsToUnbind) {
            this.eventsToUnbind.forEach((unbind) => unbind());
        }
        // Destroy AxisResizer elements
        resizer.controlLine.destroy();
        // Nullify properties
        for (const key of Object.keys(resizer)) {
            resizer[key] = null;
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
// Default options for AxisResizer.
AxisResizer.resizerOptions = DragPanes_AxisResizerDefaults;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DragPanes_AxisResizer = (AxisResizer);

;// ./code/es-modules/Extensions/DragPanes/DragPanes.js
/* *
 *
 *  Plugin for resizing axes / panes in a chart.
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { defaultOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent: DragPanes_addEvent, merge, wrap } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(AxisClass, PointerClass) {
    if (!AxisClass.keepProps.includes('resizer')) {
        merge(true, defaultOptions.yAxis, DragPanes_AxisResizer.resizerOptions);
        // Keep resizer reference on axis update
        AxisClass.keepProps.push('resizer');
        DragPanes_addEvent(AxisClass, 'afterRender', onAxisAfterRender);
        DragPanes_addEvent(AxisClass, 'destroy', onAxisDestroy);
        wrap(PointerClass.prototype, 'runPointActions', wrapPointerRunPointActions);
        wrap(PointerClass.prototype, 'drag', wrapPointerDrag);
    }
}
/**
 * Add new AxisResizer, update or remove it
 * @private
 */
function onAxisAfterRender() {
    const axis = this, resizer = axis.resizer, resizerOptions = axis.options.resize;
    if (resizerOptions) {
        const enabled = resizerOptions.enabled !== false;
        if (resizer) {
            // Resizer present and enabled
            if (enabled) {
                // Update options
                resizer.init(axis, true);
                // Resizer present, but disabled
            }
            else {
                // Destroy the resizer
                resizer.destroy();
            }
        }
        else {
            // Resizer not present and enabled
            if (enabled) {
                // Add new resizer
                axis.resizer = new DragPanes_AxisResizer(axis);
            }
            // Resizer not present and disabled, so do nothing
        }
    }
}
/**
 * Clear resizer on axis remove.
 * @private
 */
function onAxisDestroy(e) {
    const axis = this;
    if (!e.keepEvents && axis.resizer) {
        axis.resizer.destroy();
    }
}
/**
 * Prevent default drag action detection while dragging a control line of
 * AxisResizer. (#7563)
 * @private
 */
function wrapPointerDrag(proceed) {
    const pointer = this;
    if (!pointer.chart.activeResizer) {
        proceed.apply(pointer, [].slice.call(arguments, 1));
    }
}
/**
 * Prevent any hover effects while dragging a control line of AxisResizer.
 * @private
 */
function wrapPointerRunPointActions(proceed) {
    const pointer = this;
    if (!pointer.chart.activeResizer) {
        proceed.apply(pointer, [].slice.call(arguments, 1));
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DragPanes = {
    compose
};
/* harmony default export */ const DragPanes_DragPanes = (DragPanes);

;// ./code/es-modules/masters/modules/drag-panes.src.js





const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.AxisResizer = DragPanes_AxisResizer;
DragPanes_DragPanes.compose(G.Axis, G.Pointer);
/* harmony default export */ const drag_panes_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});