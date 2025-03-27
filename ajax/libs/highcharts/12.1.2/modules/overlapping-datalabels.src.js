/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/overlapping-datalabels
 * @requires highcharts
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/overlapping-datalabels", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/overlapping-datalabels"] = factory(root["_Highcharts"]);
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
  "default": () => (/* binding */ overlapping_datalabels_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Core/Geometry/GeometryUtilities.js
/* *
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Namespace
 *
 * */
var GeometryUtilities;
(function (GeometryUtilities) {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculates the center between a list of points.
     *
     * @private
     *
     * @param {Array<Highcharts.PositionObject>} points
     * A list of points to calculate the center of.
     *
     * @return {Highcharts.PositionObject}
     * Calculated center
     */
    function getCenterOfPoints(points) {
        const sum = points.reduce((sum, point) => {
            sum.x += point.x;
            sum.y += point.y;
            return sum;
        }, { x: 0, y: 0 });
        return {
            x: sum.x / points.length,
            y: sum.y / points.length
        };
    }
    GeometryUtilities.getCenterOfPoints = getCenterOfPoints;
    /**
     * Calculates the distance between two points based on their x and y
     * coordinates.
     *
     * @private
     *
     * @param {Highcharts.PositionObject} p1
     * The x and y coordinates of the first point.
     *
     * @param {Highcharts.PositionObject} p2
     * The x and y coordinates of the second point.
     *
     * @return {number}
     * Returns the distance between the points.
     */
    function getDistanceBetweenPoints(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    GeometryUtilities.getDistanceBetweenPoints = getDistanceBetweenPoints;
    /**
     * Calculates the angle between two points.
     * @todo add unit tests.
     * @private
     * @param {Highcharts.PositionObject} p1 The first point.
     * @param {Highcharts.PositionObject} p2 The second point.
     * @return {number} Returns the angle in radians.
     */
    function getAngleBetweenPoints(p1, p2) {
        return Math.atan2(p2.x - p1.x, p2.y - p1.y);
    }
    GeometryUtilities.getAngleBetweenPoints = getAngleBetweenPoints;
    /**
     * Test for point in polygon. Polygon defined as array of [x,y] points.
     * @private
     * @param {PositionObject} point The point potentially within a polygon.
     * @param {Array<Array<number>>} polygon The polygon potentially containing the point.
     */
    function pointInPolygon({ x, y }, polygon) {
        const len = polygon.length;
        let i, j, inside = false;
        for (i = 0, j = len - 1; i < len; j = i++) {
            const [x1, y1] = polygon[i], [x2, y2] = polygon[j];
            if (y1 > y !== y2 > y &&
                (x < (x2 - x1) *
                    (y - y1) /
                    (y2 - y1) +
                    x1)) {
                inside = !inside;
            }
        }
        return inside;
    }
    GeometryUtilities.pointInPolygon = pointInPolygon;
})(GeometryUtilities || (GeometryUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Geometry_GeometryUtilities = (GeometryUtilities);

;// ./code/es-modules/Extensions/OverlappingDataLabels.js
/* *
 *
 *  Highcharts module to hide overlapping data labels.
 *  This module is included in Highcharts.
 *
 *  (c) 2009-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { pointInPolygon } = Geometry_GeometryUtilities;

const { addEvent, fireEvent, objectEach, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Hide overlapping labels. Labels are moved and faded in and out on zoom to
 * provide a smooth visual impression.
 *
 * @requires modules/overlapping-datalabels
 *
 * @private
 * @function Highcharts.Chart#hideOverlappingLabels
 * @param {Array<Highcharts.SVGElement>} labels
 *        Rendered data labels
 */
function chartHideOverlappingLabels(labels) {
    const chart = this, len = labels.length, isIntersectRect = (box1, box2) => !(box2.x >= box1.x + box1.width ||
        box2.x + box2.width <= box1.x ||
        box2.y >= box1.y + box1.height ||
        box2.y + box2.height <= box1.y), isPolygonOverlap = (box1Poly, box2Poly) => {
        for (const p of box1Poly) {
            if (pointInPolygon({ x: p[0], y: p[1] }, box2Poly)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get the box with its position inside the chart, as opposed to getBBox
     * that only reports the position relative to the parent.
     */
    function getAbsoluteBox(label) {
        if (label && (!label.alignAttr || label.placed)) {
            const padding = label.box ? 0 : (label.padding || 0), pos = label.alignAttr || {
                x: label.attr('x'),
                y: label.attr('y')
            }, bBox = label.getBBox();
            label.width = bBox.width;
            label.height = bBox.height;
            return {
                x: pos.x + (label.parentGroup?.translateX || 0) + padding,
                y: pos.y + (label.parentGroup?.translateY || 0) + padding,
                width: (label.width || 0) - 2 * padding,
                height: (label.height || 0) - 2 * padding,
                polygon: bBox?.polygon
            };
        }
    }
    let label, label1, label2, box1, box2, isLabelAffected = false;
    for (let i = 0; i < len; i++) {
        label = labels[i];
        if (label) {
            // Mark with initial opacity
            label.oldOpacity = label.opacity;
            label.newOpacity = 1;
            label.absoluteBox = getAbsoluteBox(label);
        }
    }
    // Prevent a situation in a gradually rising slope, that each label will
    // hide the previous one because the previous one always has lower rank.
    labels.sort((a, b) => (b.labelrank || 0) - (a.labelrank || 0));
    // Detect overlapping labels
    for (let i = 0; i < len; ++i) {
        label1 = labels[i];
        box1 = label1 && label1.absoluteBox;
        const box1Poly = box1?.polygon;
        for (let j = i + 1; j < len; ++j) {
            label2 = labels[j];
            box2 = label2 && label2.absoluteBox;
            let toHide = false;
            if (box1 &&
                box2 &&
                label1 !== label2 && // #6465, polar chart with connectEnds
                label1.newOpacity !== 0 &&
                label2.newOpacity !== 0 &&
                // #15863 dataLabels are no longer hidden by translation
                label1.visibility !== 'hidden' &&
                label2.visibility !== 'hidden') {
                const box2Poly = box2.polygon;
                // If labels have polygons, only evaluate
                // based on polygons
                if (box1Poly &&
                    box2Poly &&
                    box1Poly !== box2Poly) {
                    if (isPolygonOverlap(box1Poly, box2Poly)) {
                        toHide = true;
                    }
                    // If there are no polygons, evaluate rectangles coliding
                }
                else if (isIntersectRect(box1, box2)) {
                    toHide = true;
                }
                if (toHide) {
                    const overlappingLabel = (label1.labelrank < label2.labelrank ?
                        label1 :
                        label2), labelText = overlappingLabel.text;
                    overlappingLabel.newOpacity = 0;
                    if (labelText?.element.querySelector('textPath')) {
                        labelText.hide();
                    }
                }
            }
        }
    }
    // Hide or show
    for (const label of labels) {
        if (hideOrShow(label, chart)) {
            isLabelAffected = true;
        }
    }
    if (isLabelAffected) {
        fireEvent(chart, 'afterHideAllOverlappingLabels');
    }
}
/** @private */
function compose(ChartClass) {
    const chartProto = ChartClass.prototype;
    if (!chartProto.hideOverlappingLabels) {
        chartProto.hideOverlappingLabels = chartHideOverlappingLabels;
        addEvent(ChartClass, 'render', onChartRender);
    }
}
/**
 * Hide or show labels based on opacity.
 *
 * @private
 * @function hideOrShow
 * @param {Highcharts.SVGElement} label
 * The label.
 * @param {Highcharts.Chart} chart
 * The chart that contains the label.
 * @return {boolean}
 * Whether label is affected
 */
function hideOrShow(label, chart) {
    let complete, newOpacity, isLabelAffected = false;
    if (label) {
        newOpacity = label.newOpacity;
        if (label.oldOpacity !== newOpacity) {
            // Toggle data labels
            if (label.hasClass('highcharts-data-label')) {
                // Make sure the label is completely hidden to avoid catching
                // clicks (#4362)
                label[newOpacity ? 'removeClass' : 'addClass']('highcharts-data-label-hidden');
                complete = function () {
                    if (!chart.styledMode) {
                        label.css({
                            pointerEvents: newOpacity ? 'auto' : 'none'
                        });
                    }
                };
                isLabelAffected = true;
                // Animate or set the opacity
                label[label.isOld ? 'animate' : 'attr']({ opacity: newOpacity }, void 0, complete);
                fireEvent(chart, 'afterHideOverlappingLabel');
                // Toggle other labels, tick labels
            }
            else {
                label.attr({
                    opacity: newOpacity
                });
            }
        }
        label.isOld = true;
    }
    return isLabelAffected;
}
/**
 * Collect potential overlapping data labels. Stack labels probably don't need
 * to be considered because they are usually accompanied by data labels that lie
 * inside the columns.
 * @private
 */
function onChartRender() {
    const chart = this;
    let labels = [];
    // Consider external label collectors
    for (const collector of (chart.labelCollectors || [])) {
        labels = labels.concat(collector());
    }
    for (const yAxis of (chart.yAxis || [])) {
        if (yAxis.stacking &&
            yAxis.options.stackLabels &&
            !yAxis.options.stackLabels.allowOverlap) {
            objectEach(yAxis.stacking.stacks, (stack) => {
                objectEach(stack, (stackItem) => {
                    if (stackItem.label) {
                        labels.push(stackItem.label);
                    }
                });
            });
        }
    }
    for (const series of (chart.series || [])) {
        if (series.visible && series.hasDataLabels?.()) { // #3866
            const push = (points) => {
                for (const point of points) {
                    if (point.visible) {
                        (point.dataLabels || []).forEach((label) => {
                            const options = label.options || {};
                            label.labelrank = pick(options.labelrank, point.labelrank, point.shapeArgs?.height); // #4118
                            // Allow overlap if the option is explicitly true
                            if (
                            // #13449
                            options.allowOverlap ??
                                // Pie labels outside have a separate placement
                                // logic, skip the overlap logic
                                Number(options.distance) > 0) {
                                label.oldOpacity = label.opacity;
                                label.newOpacity = 1;
                                hideOrShow(label, chart);
                                // Do not allow overlap
                            }
                            else {
                                labels.push(label);
                            }
                        });
                    }
                }
            };
            push(series.nodes || []);
            push(series.points);
        }
    }
    this.hideOverlappingLabels(labels);
}
/* *
 *
 *  Default Export
 *
 * */
const OverlappingDataLabels = {
    compose
};
/* harmony default export */ const Extensions_OverlappingDataLabels = (OverlappingDataLabels);

;// ./code/es-modules/masters/modules/overlapping-datalabels.src.js




const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.OverlappingDataLabels = G.OverlappingDataLabels || Extensions_OverlappingDataLabels;
G.OverlappingDataLabels.compose(G.Chart);
/* harmony default export */ const overlapping_datalabels_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});