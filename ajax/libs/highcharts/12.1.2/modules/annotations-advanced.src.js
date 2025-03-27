/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/annotations
 * @requires highcharts
 *
 * Annotations module
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Templating"], root["_Highcharts"]["AST"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/annotations-advanced", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Templating"],amd1["AST"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/annotations-advanced"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Templating"], root["_Highcharts"]["AST"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Templating"], root["Highcharts"]["AST"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__984__, __WEBPACK_EXTERNAL_MODULE__660__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 660:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__660__;

/***/ }),

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 984:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__984__;

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
  "default": () => (/* binding */ annotations_advanced_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/Annotations/AnnotationChart.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { addEvent, erase, find, fireEvent, pick, wrap } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Add an annotation to the chart after render time.
 *
 * @sample highcharts/annotations/add-annotation/
 *         Add annotation
 *
 * @function Highcharts.Chart#addAnnotation
 *
 * @param  {Highcharts.AnnotationsOptions} options
 *         The annotation options for the new, detailed annotation.
 *
 * @param {boolean} [redraw]
 *
 * @return {Highcharts.Annotation}
 *         The newly generated annotation.
 */
function chartAddAnnotation(userOptions, redraw) {
    const annotation = this.initAnnotation(userOptions);
    this.options.annotations.push(annotation.options);
    if (pick(redraw, true)) {
        annotation.redraw();
        annotation.graphic.attr({
            opacity: 1
        });
    }
    return annotation;
}
/**
 * @private
 */
function chartCallback() {
    const chart = this;
    chart.plotBoxClip = this.renderer.clipRect(this.plotBox);
    chart.controlPointsGroup = chart.renderer
        .g('control-points')
        .attr({ zIndex: 99 })
        .clip(chart.plotBoxClip)
        .add();
    chart.options.annotations.forEach((annotationOptions, i) => {
        if (
        // Verify that it has not been previously added in a responsive rule
        !chart.annotations.some((annotation) => annotation.options === annotationOptions)) {
            const annotation = chart.initAnnotation(annotationOptions);
            chart.options.annotations[i] = annotation.options;
        }
    });
    chart.drawAnnotations();
    addEvent(chart, 'redraw', chart.drawAnnotations);
    addEvent(chart, 'destroy', function () {
        chart.plotBoxClip.destroy();
        chart.controlPointsGroup.destroy();
    });
    addEvent(chart, 'exportData', function (event) {
        const annotations = chart.annotations, csvColumnHeaderFormatter = ((this.options.exporting &&
            this.options.exporting.csv) ||
            {}).columnHeaderFormatter, 
        // If second row doesn't have xValues
        // then it is a title row thus multiple level header is in use.
        multiLevelHeaders = !event.dataRows[1].xValues, annotationHeader = (chart.options.lang &&
            chart.options.lang.exportData &&
            chart.options.lang.exportData.annotationHeader), columnHeaderFormatter = function (index) {
            let s;
            if (csvColumnHeaderFormatter) {
                s = csvColumnHeaderFormatter(index);
                if (s !== false) {
                    return s;
                }
            }
            s = annotationHeader + ' ' + index;
            if (multiLevelHeaders) {
                return {
                    columnTitle: s,
                    topLevelColumnTitle: s
                };
            }
            return s;
        }, startRowLength = event.dataRows[0].length, annotationSeparator = (chart.options.exporting &&
            chart.options.exporting.csv &&
            chart.options.exporting.csv.annotations &&
            chart.options.exporting.csv.annotations.itemDelimiter), joinAnnotations = (chart.options.exporting &&
            chart.options.exporting.csv &&
            chart.options.exporting.csv.annotations &&
            chart.options.exporting.csv.annotations.join);
        annotations.forEach((annotation) => {
            if (annotation.options.labelOptions &&
                annotation.options.labelOptions.includeInDataExport) {
                annotation.labels.forEach((label) => {
                    if (label.options.text) {
                        const annotationText = label.options.text;
                        label.points.forEach((points) => {
                            const annotationX = points.x, xAxisIndex = points.series.xAxis ?
                                points.series.xAxis.index :
                                -1;
                            let wasAdded = false;
                            // Annotation not connected to any xAxis -
                            // add new row.
                            if (xAxisIndex === -1) {
                                const n = event.dataRows[0].length, newRow = new Array(n);
                                for (let i = 0; i < n; ++i) {
                                    newRow[i] = '';
                                }
                                newRow.push(annotationText);
                                newRow.xValues = [];
                                newRow.xValues[xAxisIndex] = annotationX;
                                event.dataRows.push(newRow);
                                wasAdded = true;
                            }
                            // Annotation placed on a exported data point
                            // - add new column
                            if (!wasAdded) {
                                event.dataRows.forEach((row) => {
                                    if (!wasAdded &&
                                        row.xValues &&
                                        xAxisIndex !== void 0 &&
                                        annotationX === row.xValues[xAxisIndex]) {
                                        if (joinAnnotations &&
                                            row.length > startRowLength) {
                                            row[row.length - 1] += (annotationSeparator +
                                                annotationText);
                                        }
                                        else {
                                            row.push(annotationText);
                                        }
                                        wasAdded = true;
                                    }
                                });
                            }
                            // Annotation not placed on any exported data point,
                            // but connected to the xAxis - add new row
                            if (!wasAdded) {
                                const n = event.dataRows[0].length, newRow = new Array(n);
                                for (let i = 0; i < n; ++i) {
                                    newRow[i] = '';
                                }
                                newRow[0] = annotationX;
                                newRow.push(annotationText);
                                newRow.xValues = [];
                                if (xAxisIndex !== void 0) {
                                    newRow.xValues[xAxisIndex] = annotationX;
                                }
                                event.dataRows.push(newRow);
                            }
                        });
                    }
                });
            }
        });
        let maxRowLen = 0;
        event.dataRows.forEach((row) => {
            maxRowLen = Math.max(maxRowLen, row.length);
        });
        const newRows = maxRowLen - event.dataRows[0].length;
        for (let i = 0; i < newRows; i++) {
            const header = columnHeaderFormatter(i + 1);
            if (multiLevelHeaders) {
                event.dataRows[0].push(header.topLevelColumnTitle);
                event.dataRows[1].push(header.columnTitle);
            }
            else {
                event.dataRows[0].push(header);
            }
        }
    });
}
/**
 * @private
 */
function chartDrawAnnotations() {
    this.plotBoxClip.attr(this.plotBox);
    this.annotations.forEach((annotation) => {
        annotation.redraw();
        annotation.graphic.animate({
            opacity: 1
        }, annotation.animationConfig);
    });
}
/**
 * Remove an annotation from the chart.
 *
 * @function Highcharts.Chart#removeAnnotation
 *
 * @param {number|string|Highcharts.Annotation} idOrAnnotation
 *        The annotation's id or direct annotation object.
 */
function chartRemoveAnnotation(idOrAnnotation) {
    const annotations = this.annotations, annotation = (idOrAnnotation.coll === 'annotations') ?
        idOrAnnotation :
        find(annotations, function (annotation) {
            return annotation.options.id === idOrAnnotation;
        });
    if (annotation) {
        fireEvent(annotation, 'remove');
        erase(this.options.annotations, annotation.options);
        erase(annotations, annotation);
        annotation.destroy();
    }
}
/**
 * Create lookups initially
 * @private
 */
function onChartAfterInit() {
    const chart = this;
    chart.annotations = [];
    if (!this.options.annotations) {
        this.options.annotations = [];
    }
}
/**
 * @private
 */
function wrapPointerOnContainerMouseDown(proceed) {
    if (!this.chart.hasDraggedAnnotation) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }
}
/* *
 *
 *  Composition
 *
 * */
/**
 * @private
 */
var AnnotationChart;
(function (AnnotationChart) {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(AnnotationClass, ChartClass, PointerClass) {
        const chartProto = ChartClass.prototype;
        if (!chartProto.addAnnotation) {
            const pointerProto = PointerClass.prototype;
            addEvent(ChartClass, 'afterInit', onChartAfterInit);
            chartProto.addAnnotation = chartAddAnnotation;
            chartProto.callbacks.push(chartCallback);
            chartProto.collectionsWithInit.annotations = [chartAddAnnotation];
            chartProto.collectionsWithUpdate.push('annotations');
            chartProto.drawAnnotations = chartDrawAnnotations;
            chartProto.removeAnnotation = chartRemoveAnnotation;
            chartProto.initAnnotation = function chartInitAnnotation(userOptions) {
                const Constructor = (AnnotationClass.types[userOptions.type] ||
                    AnnotationClass), annotation = new Constructor(this, userOptions);
                this.annotations.push(annotation);
                return annotation;
            };
            wrap(pointerProto, 'onContainerMouseDown', wrapPointerOnContainerMouseDown);
        }
    }
    AnnotationChart.compose = compose;
})(AnnotationChart || (AnnotationChart = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_AnnotationChart = (AnnotationChart);

;// ./code/es-modules/Extensions/Annotations/AnnotationDefaults.js
/* *
 *
 *  Imports
 *
 * */

const { defined } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  API Options
 *
 * */
/**
 * A basic type of an annotation. It allows to add custom labels
 * or shapes. The items can be tied to points, axis coordinates
 * or chart pixel coordinates.
 *
 * @sample highcharts/annotations/basic/
 *         Basic annotations
 * @sample highcharts/demo/annotations/
 *         Advanced annotations
 * @sample highcharts/css/annotations
 *         Styled mode
 * @sample highcharts/annotations-advanced/controllable
 *         Controllable items
 * @sample {highstock} stock/annotations/fibonacci-retracements
 *         Custom annotation, Fibonacci retracement
 *
 * @type         {Array<*>}
 * @since        6.0.0
 * @requires     modules/annotations
 * @optionparent annotations
 */
const AnnotationDefaults = {
    /**
     * Sets an ID for an annotation. Can be user later when
     * removing an annotation in [Chart#removeAnnotation(id)](
     * /class-reference/Highcharts.Chart#removeAnnotation) method.
     *
     * @type      {number|string}
     * @apioption annotations.id
     */
    /**
     * Whether the annotation is visible.
     *
     * @sample highcharts/annotations/visible/
     *         Set annotation visibility
     */
    visible: true,
    /**
     * Enable or disable the initial animation when a series is
     * displayed for the `annotation`. The animation can also be set
     * as a configuration object. Please note that this option only
     * applies to the initial animation.
     * For other animations, see [chart.animation](#chart.animation)
     * and the animation parameter under the API methods.
     * The following properties are supported:
     *
     * - `defer`: The animation delay time in milliseconds.
     *
     * @sample {highcharts} highcharts/annotations/defer/
     *          Animation defer settings
     * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
     * @since 8.2.0
     */
    animation: {},
    /**
     * Whether to hide the part of the annotation
     * that is outside the plot area.
     *
     * @sample highcharts/annotations/label-crop-overflow/
     *         Crop line annotation
     * @type  {boolean}
     * @since 9.3.0
     */
    crop: true,
    /**
     * The animation delay time in milliseconds.
     * Set to `0` renders annotation immediately.
     * As `undefined` inherits defer time from the [series.animation.defer](#plotOptions.series.animation.defer).
     *
     * @type      {number}
     * @since 8.2.0
     * @apioption annotations.animation.defer
     */
    /**
     * Allow an annotation to be draggable by a user. Possible
     * values are `'x'`, `'xy'`, `'y'` and `''` (disabled).
     *
     * @sample highcharts/annotations/draggable/
     *         Annotations draggable: 'xy'
     *
     * @type {Highcharts.AnnotationDraggableValue}
     */
    draggable: 'xy',
    /**
     * Options for annotation's labels. Each label inherits options
     * from the labelOptions object. An option from the labelOptions
     * can be overwritten by config for a specific label.
     *
     * @requires modules/annotations
     */
    labelOptions: {
        /**
         * The alignment of the annotation's label. If right,
         * the right side of the label should be touching the point.
         *
         * @sample highcharts/annotations/label-position/
         *         Set labels position
         *
         * @type {Highcharts.AlignValue}
         */
        align: 'center',
        /**
         * Whether to allow the annotation's labels to overlap.
         * To make the labels less sensitive for overlapping,
         * the can be set to 0.
         *
         * @sample highcharts/annotations/tooltip-like/
         *         Hide overlapping labels
         */
        allowOverlap: false,
        /**
         * The background color or gradient for the annotation's
         * label.
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         *
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        /**
         * The border color for the annotation's label.
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         *
         * @type {Highcharts.ColorString}
         */
        borderColor: "#000000" /* Palette.neutralColor100 */,
        /**
         * The border radius in pixels for the annotation's label.
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         */
        borderRadius: 3,
        /**
         * The border width in pixels for the annotation's label
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         */
        borderWidth: 1,
        /**
         * A class name for styling by CSS.
         *
         * @sample highcharts/css/annotations
         *         Styled mode annotations
         *
         * @since 6.0.5
         */
        className: 'highcharts-no-tooltip',
        /**
         * Whether to hide the annotation's label
         * that is outside the plot area.
         *
         * @sample highcharts/annotations/label-crop-overflow/
         *         Crop or justify labels
         */
        crop: false,
        /**
         * The label's pixel distance from the point.
         *
         * @sample highcharts/annotations/label-position/
         *         Set labels position
         *
         * @type      {number}
         * @apioption annotations.labelOptions.distance
         */
        /**
         * A
         * [format](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
         * string for the data label.
         *
         * @see [plotOptions.series.dataLabels.format](plotOptions.series.dataLabels.format.html)
         *
         * @sample highcharts/annotations/label-text/
         *         Set labels text
         *
         * @type      {string}
         * @apioption annotations.labelOptions.format
         */
        /**
         * Alias for the format option.
         *
         * @see [format](annotations.labelOptions.format.html)
         *
         * @sample highcharts/annotations/label-text/
         *         Set labels text
         *
         * @type      {string}
         * @apioption annotations.labelOptions.text
         */
        /**
         * Callback JavaScript function to format the annotation's
         * label. Note that if a `format` or `text` are defined,
         * the format or text take precedence and the formatter is
         * ignored. `This` refers to a point object.
         *
         * @sample highcharts/annotations/label-text/
         *         Set labels text
         *
         * @type    {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
         * @default function () { return defined(this.y) ? this.y : 'Annotation label'; }
         */
        formatter: function () {
            return defined(this.y) ? '' + this.y : 'Annotation label';
        },
        /**
         * Whether the annotation is visible in the exported data
         * table.
         *
         * @sample highcharts/annotations/include-in-data-export/
         *         Do not include in the data export
         *
         * @since 8.2.0
         * @requires modules/export-data
         */
        includeInDataExport: true,
        /**
         * How to handle the annotation's label that flow outside
         * the plot area. The justify option aligns the label inside
         * the plot area.
         *
         * @sample highcharts/annotations/label-crop-overflow/
         *         Crop or justify labels
         *
         * @validvalue ["allow", "justify"]
         */
        overflow: 'justify',
        /**
         * When either the borderWidth or the backgroundColor is
         * set, this is the padding within the box.
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         */
        padding: 5,
        /**
         * The shadow of the box. The shadow can be an object
         * configuration containing `color`, `offsetX`, `offsetY`,
         * `opacity` and `width`.
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         *
         * @type {boolean|Highcharts.ShadowOptionsObject}
         */
        shadow: false,
        /**
         * The name of a symbol to use for the border around the
         * label. Symbols are predefined functions on the Renderer
         * object.
         *
         * @sample highcharts/annotations/shapes/
         *         Available shapes for labels
         */
        shape: 'callout',
        /**
         * Styles for the annotation's label.
         *
         * @see [plotOptions.series.dataLabels.style](plotOptions.series.dataLabels.style.html)
         *
         * @sample highcharts/annotations/label-presentation/
         *         Set labels graphic options
         *
         * @type {Highcharts.CSSObject}
         */
        style: {
            /** @ignore */
            fontSize: '0.7em',
            /** @ignore */
            fontWeight: 'normal',
            /** @ignore */
            color: 'contrast'
        },
        /**
         * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
         * to render the annotation's label.
         */
        useHTML: false,
        /**
         * The vertical alignment of the annotation's label.
         *
         * @sample highcharts/annotations/label-position/
         *         Set labels position
         *
         * @type {Highcharts.VerticalAlignValue}
         */
        verticalAlign: 'bottom',
        /**
         * The x position offset of the label relative to the point.
         * Note that if a `distance` is defined, the distance takes
         * precedence over `x` and `y` options.
         *
         * @sample highcharts/annotations/label-position/
         *         Set labels position
         */
        x: 0,
        /**
         * The y position offset of the label relative to the point.
         * Note that if a `distance` is defined, the distance takes
         * precedence over `x` and `y` options.
         *
         * @sample highcharts/annotations/label-position/
         *         Set labels position
         */
        y: -16
    },
    /**
     * An array of labels for the annotation. For options that apply
     * to multiple labels, they can be added to the
     * [labelOptions](annotations.labelOptions.html).
     *
     * @type      {Array<*>}
     * @extends   annotations.labelOptions
     * @apioption annotations.labels
     */
    /**
     * This option defines the point to which the label will be
     * connected. It can be either the point which exists in the
     * series - it is referenced by the point's id - or a new point
     * with defined x, y properties and optionally axes.
     *
     * @sample highcharts/annotations/mock-point/
     *         Attach annotation to a mock point
     * @sample highcharts/annotations/mock-points/
     *         Attach annotation to a mock point with different ways
     *
     * @declare   Highcharts.AnnotationMockPointOptionsObject
     * @type      {
     *               string|
     *               Highcharts.AnnotationMockPointOptionsObject|
     *               Highcharts.AnnotationMockPointFunction
     *            }
     * @requires  modules/annotations
     * @apioption annotations.labels.point
     */
    /**
     * An array of shapes for the annotation. For options that apply
     * to multiple shapes, then can be added to the
     * [shapeOptions](annotations.shapeOptions.html).
     *
     * @type      {Array<*>}
     * @extends   annotations.shapeOptions
     * @apioption annotations.shapes
     */
    /**
     * This option defines the point to which the shape will be
     * connected. It can be either the point which exists in the
     * series - it is referenced by the point's id - or a new point
     * with defined x, y properties and optionally axes.
     *
     * @sample highcharts/annotations/mock-points/
     *         Attach annotation to a mock point with different ways
     *
     * @declare   Highcharts.AnnotationMockPointOptionsObject
     * @type      {
     *               string|
     *               Highcharts.AnnotationMockPointOptionsObject|
     *               Highcharts.AnnotationMockPointFunction
     *            }
     * @extends   annotations.labels.point
     * @requires  modules/annotations
     * @apioption annotations.shapes.point
     */
    /**
     * An array of points for the shape
     * or a callback function that returns that shape point.
     *
     * This option is available
     * for shapes which can use multiple points such as path. A
     * point can be either a point object or a point's id.
     *
     * @see [annotations.shapes.point](annotations.shapes.point.html)
     *
     * @type      {Array<Highcharts.AnnotationShapePointOptions>}
     * @extends   annotations.labels.point
     * @apioption annotations.shapes.points
     */
    /**
     * The URL for an image to use as the annotation shape. Note,
     * type has to be set to `'image'`.
     *
     * @see [annotations.shapes.type](annotations.shapes.type)
     * @sample highcharts/annotations/shape-src/
     *         Define a marker image url for annotations
     *
     * @type      {string}
     * @apioption annotations.shapes.src
     */
    /**
     * Id of the marker which will be drawn at the final vertex of
     * the path. Custom markers can be defined in defs property.
     *
     * @see [defs.markers](defs.markers.html)
     *
     * @sample highcharts/annotations/custom-markers/
     *         Define a custom marker for annotations
     *
     * @type      {string}
     * @apioption annotations.shapes.markerEnd
     */
    /**
     * Id of the marker which will be drawn at the first vertex of
     * the path. Custom markers can be defined in defs property.
     *
     * @see [defs.markers](defs.markers.html)
     *
     * @sample {highcharts} highcharts/annotations/custom-markers/
     *         Define a custom marker for annotations
     *
     * @type      {string}
     * @apioption annotations.shapes.markerStart
     */
    /**
     * Options for annotation's shapes. Each shape inherits options
     * from the shapeOptions object. An option from the shapeOptions
     * can be overwritten by config for a specific shape.
     *
     * @requires  modules/annotations
     */
    shapeOptions: {
        /**
         *
         * The radius of the shape in y direction.
         * Used for the ellipse.
         *
         * @sample highcharts/annotations/ellipse/
         *         Ellipse annotation
         *
         * @type      {number}
         * @apioption annotations.shapeOptions.ry
         **/
        /**
         *
         * The xAxis index to which the points should be attached.
         * Used for the ellipse.
         *
         * @type      {number}
         * @apioption annotations.shapeOptions.xAxis
         **/
        /**
         * The yAxis index to which the points should be attached.
         * Used for the ellipse.
         *
         * @type      {number}
         * @apioption annotations.shapeOptions.yAxis
         **/
        /**
         * The width of the shape.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         *
         * @type      {number}
         * @apioption annotations.shapeOptions.width
         **/
        /**
         * The height of the shape.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         *
         * @type      {number}
         * @apioption annotations.shapeOptions.height
         */
        /**
         * The type of the shape.
         * Available options are circle, rect and ellipse.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         *
         * @sample highcharts/annotations/ellipse/
         *         Ellipse annotation
         *
         * @type      {string}
         * @default   rect
         * @apioption annotations.shapeOptions.type
         */
        /**
         * The URL for an image to use as the annotation shape.
         * Note, type has to be set to `'image'`.
         *
         * @see [annotations.shapeOptions.type](annotations.shapeOptions.type)
         * @sample highcharts/annotations/shape-src/
         *         Define a marker image url for annotations
         *
         * @type      {string}
         * @apioption annotations.shapeOptions.src
         */
        /**
         * Name of the dash style to use for the shape's stroke.
         *
         * @sample {highcharts} highcharts/plotoptions/series-dashstyle-all/
         *         Possible values demonstrated
         *
         * @type      {Highcharts.DashStyleValue}
         * @apioption annotations.shapeOptions.dashStyle
         */
        /**
         * The color of the shape's stroke.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         *
         * @type {Highcharts.ColorString}
         */
        stroke: 'rgba(0, 0, 0, 0.75)',
        /**
         * The pixel stroke width of the shape.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         */
        strokeWidth: 1,
        /**
         * The color of the shape's fill.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         *
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        fill: 'rgba(0, 0, 0, 0.75)',
        /**
         * The radius of the shape.
         *
         * @sample highcharts/annotations/shape/
         *         Basic shape annotation
         */
        r: 0,
        /**
         * Defines additional snapping area around an annotation
         * making this annotation to focus. Defined in pixels.
         */
        snap: 2
    },
    /**
     * Options for annotation's control points. Each control point
     * inherits options from controlPointOptions object.
     * Options from the controlPointOptions can be overwritten
     * by options in a specific control point.
     *
     * @declare  Highcharts.AnnotationControlPointOptionsObject
     * @requires modules/annotations
     */
    controlPointOptions: {
        /**
         * @type      {Highcharts.AnnotationControlPointPositionerFunction}
         * @apioption annotations.controlPointOptions.positioner
         */
        /**
         * @type {Highcharts.Dictionary<Function>}
         */
        events: {},
        /**
         * @type {Highcharts.SVGAttributes}
         */
        style: {
            cursor: 'pointer',
            fill: "#ffffff" /* Palette.backgroundColor */,
            stroke: "#000000" /* Palette.neutralColor100 */,
            'stroke-width': 2
        },
        height: 10,
        symbol: 'circle',
        visible: false,
        width: 10
    },
    /**
     * Event callback when annotation is added to the chart.
     *
     * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
     * @since     7.1.0
     * @apioption annotations.events.add
     */
    /**
     * Event callback when annotation is updated (e.g. drag and
     * dropped or resized by control points).
     *
     * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
     * @since     7.1.0
     * @apioption annotations.events.afterUpdate
     */
    /**
     * Fires when the annotation is clicked.
     *
     * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
     * @since     7.1.0
     * @apioption annotations.events.click
     */
    /**
     * Fires when the annotation is dragged.
     *
     * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
     * @apioption annotations.events.drag
     */
    /**
     * Event callback when annotation is removed from the chart.
     *
     * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
     * @since     7.1.0
     * @apioption annotations.events.remove
     */
    /**
     * Events available in annotations.
     *
     * @requires modules/annotations
     */
    events: {},
    /**
     * The Z index of the annotation.
     */
    zIndex: 6
}; // Type options are expected but not set
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_AnnotationDefaults = (AnnotationDefaults);

;// ./code/es-modules/Extensions/Annotations/EventEmitter.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { doc, isTouchDevice } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent: EventEmitter_addEvent, fireEvent: EventEmitter_fireEvent, objectEach, pick: EventEmitter_pick, removeEvent } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 */
class EventEmitter {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add emitter events.
     * @private
     */
    addEvents() {
        const emitter = this, addMouseDownEvent = function (element) {
            EventEmitter_addEvent(element, isTouchDevice ? 'touchstart' : 'mousedown', (e) => {
                emitter.onMouseDown(e);
            }, { passive: false });
        };
        addMouseDownEvent(this.graphic.element);
        (emitter.labels || []).forEach((label) => {
            if (label.options.useHTML && label.graphic.text) {
                // Mousedown event bound to HTML element (#13070).
                addMouseDownEvent(label.graphic.text.element);
            }
        });
        objectEach(emitter.options.events, (event, type) => {
            const eventHandler = function (e) {
                if (type !== 'click' || !emitter.cancelClick) {
                    event.call(emitter, emitter.chart.pointer?.normalize(e), emitter.target);
                }
            };
            if ((emitter.nonDOMEvents || []).indexOf(type) === -1) {
                EventEmitter_addEvent(emitter.graphic.element, type, eventHandler, { passive: false });
                if (emitter.graphic.div) {
                    EventEmitter_addEvent(emitter.graphic.div, type, eventHandler, { passive: false });
                }
            }
            else {
                EventEmitter_addEvent(emitter, type, eventHandler, { passive: false });
            }
        });
        if (emitter.options.draggable) {
            EventEmitter_addEvent(emitter, 'drag', emitter.onDrag);
            if (!emitter.graphic.renderer.styledMode) {
                const cssPointer = {
                    cursor: {
                        x: 'ew-resize',
                        y: 'ns-resize',
                        xy: 'move'
                    }[emitter.options.draggable]
                };
                emitter.graphic.css(cssPointer);
                (emitter.labels || []).forEach((label) => {
                    if (label.options.useHTML && label.graphic.text) {
                        label.graphic.text.css(cssPointer);
                    }
                });
            }
        }
        if (!emitter.isUpdating) {
            EventEmitter_fireEvent(emitter, 'add');
        }
    }
    /**
     * Destroy the event emitter.
     */
    destroy() {
        this.removeDocEvents();
        removeEvent(this);
        this.hcEvents = null;
    }
    /**
     * Map mouse move event to the radians.
     * @private
     */
    mouseMoveToRadians(e, cx, cy) {
        let prevDy = e.prevChartY - cy, prevDx = e.prevChartX - cx, dy = e.chartY - cy, dx = e.chartX - cx, temp;
        if (this.chart.inverted) {
            temp = prevDx;
            prevDx = prevDy;
            prevDy = temp;
            temp = dx;
            dx = dy;
            dy = temp;
        }
        return Math.atan2(dy, dx) - Math.atan2(prevDy, prevDx);
    }
    /**
     * Map mouse move to the scale factors.
     * @private
     */
    mouseMoveToScale(e, cx, cy) {
        const prevDx = e.prevChartX - cx, prevDy = e.prevChartY - cy, dx = e.chartX - cx, dy = e.chartY - cy;
        let sx = (dx || 1) / (prevDx || 1), sy = (dy || 1) / (prevDy || 1);
        if (this.chart.inverted) {
            const temp = sy;
            sy = sx;
            sx = temp;
        }
        return {
            x: sx,
            y: sy
        };
    }
    /**
     * Map mouse move event to the distance between two following events.
     * @private
     */
    mouseMoveToTranslation(e) {
        let dx = e.chartX - e.prevChartX, dy = e.chartY - e.prevChartY, temp;
        if (this.chart.inverted) {
            temp = dy;
            dy = dx;
            dx = temp;
        }
        return {
            x: dx,
            y: dy
        };
    }
    /**
     * Drag and drop event. All basic annotations should share this
     * capability as well as the extended ones.
     * @private
     */
    onDrag(e) {
        if (this.chart.isInsidePlot(e.chartX - this.chart.plotLeft, e.chartY - this.chart.plotTop, {
            visiblePlotOnly: true
        })) {
            const translation = this.mouseMoveToTranslation(e);
            if (this.options.draggable === 'x') {
                translation.y = 0;
            }
            if (this.options.draggable === 'y') {
                translation.x = 0;
            }
            const emitter = this;
            if (emitter.points.length) {
                emitter.translate(translation.x, translation.y);
            }
            else {
                emitter.shapes.forEach((shape) => shape.translate(translation.x, translation.y));
                emitter.labels.forEach((label) => label.translate(translation.x, translation.y));
            }
            this.redraw(false);
        }
    }
    /**
     * Mouse down handler.
     * @private
     */
    onMouseDown(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        // On right click, do nothing:
        if (e.button === 2) {
            return;
        }
        const emitter = this, pointer = emitter.chart.pointer, 
        // Using experimental property on event object to check if event was
        // created by touch on screen on hybrid device (#18122)
        firesTouchEvents = (e?.sourceCapabilities?.firesTouchEvents) || false;
        e = pointer?.normalize(e) || e;
        let prevChartX = e.chartX, prevChartY = e.chartY;
        emitter.cancelClick = false;
        emitter.chart.hasDraggedAnnotation = true;
        emitter.removeDrag = EventEmitter_addEvent(doc, isTouchDevice || firesTouchEvents ? 'touchmove' : 'mousemove', function (e) {
            emitter.hasDragged = true;
            e = pointer?.normalize(e) || e;
            e.prevChartX = prevChartX;
            e.prevChartY = prevChartY;
            EventEmitter_fireEvent(emitter, 'drag', e);
            prevChartX = e.chartX;
            prevChartY = e.chartY;
        }, isTouchDevice || firesTouchEvents ? { passive: false } : void 0);
        emitter.removeMouseUp = EventEmitter_addEvent(doc, isTouchDevice || firesTouchEvents ? 'touchend' : 'mouseup', function () {
            // Sometimes the target is the annotation and sometimes its the
            // controllable
            const annotation = EventEmitter_pick(emitter.target && emitter.target.annotation, emitter.target);
            if (annotation) {
                // Keep annotation selected after dragging control point
                annotation.cancelClick = emitter.hasDragged;
            }
            emitter.cancelClick = emitter.hasDragged;
            emitter.chart.hasDraggedAnnotation = false;
            if (emitter.hasDragged) {
                // ControlPoints vs Annotation:
                EventEmitter_fireEvent(EventEmitter_pick(annotation, // #15952
                emitter), 'afterUpdate');
            }
            emitter.hasDragged = false;
            emitter.onMouseUp();
        }, isTouchDevice || firesTouchEvents ? { passive: false } : void 0);
    }
    /**
     * Mouse up handler.
     */
    onMouseUp() {
        this.removeDocEvents();
    }
    /**
     * Remove emitter document events.
     * @private
     */
    removeDocEvents() {
        if (this.removeDrag) {
            this.removeDrag = this.removeDrag();
        }
        if (this.removeMouseUp) {
            this.removeMouseUp = this.removeMouseUp();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_EventEmitter = (EventEmitter);

;// ./code/es-modules/Extensions/Annotations/ControlPoint.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { merge, pick: ControlPoint_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * A control point class which is a connection between controllable
 * transform methods and a user actions.
 *
 * @requires modules/annotations
 *
 * @class
 * @name Highcharts.AnnotationControlPoint
 *
 * @hideconstructor
 *
 * @param {Highcharts.Chart} chart
 * A chart instance.
 *
 * @param {Highcharts.AnnotationControllable} target
 * A controllable instance which is a target for a control point.
 *
 * @param {Highcharts.AnnotationControlPointOptionsObject} options
 * An options object.
 *
 * @param {number} [index]
 * Point index.
 */
class ControlPoint extends Annotations_EventEmitter {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, target, options, index) {
        super();
        /**
         * List of events for `annotation.options.events` that should not be
         * added to `annotation.graphic` but to the `annotation`.
         * @private
         * @name Highcharts.AnnotationControlPoint#nonDOMEvents
         * @type {Array<string>}
         */
        this.nonDOMEvents = ['drag'];
        this.chart = chart;
        this.target = target;
        this.options = options;
        this.index = ControlPoint_pick(options.index, index);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Destroy the control point.
     * @private
     */
    destroy() {
        super.destroy();
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        this.chart = null;
        this.target = null;
        this.options = null;
    }
    /**
     * Redraw the control point.
     * @private
     * @param {boolean} [animation]
     */
    redraw(animation) {
        this.graphic[animation ? 'animate' : 'attr'](this.options.positioner.call(this, this.target));
    }
    /**
     * Render the control point.
     * @private
     */
    render() {
        const chart = this.chart, options = this.options;
        this.graphic = chart.renderer
            .symbol(options.symbol, 0, 0, options.width, options.height)
            .add(chart.controlPointsGroup)
            .css(options.style);
        this.setVisibility(options.visible);
        // `npm test -- --tests "highcharts/annotations-advanced/*"`
        this.addEvents();
    }
    /**
     * Set the visibility of the control point.
     *
     * @function Highcharts.AnnotationControlPoint#setVisibility
     *
     * @param {boolean} visible
     * Visibility of the control point.
     *
     */
    setVisibility(visible) {
        this.graphic[visible ? 'show' : 'hide']();
        this.options.visible = visible;
    }
    /**
     * Update the control point.
     *
     * @function Highcharts.AnnotationControlPoint#update
     *
     * @param {Partial<Highcharts.AnnotationControlPointOptionsObject>} userOptions
     * New options for the control point.
     */
    update(userOptions) {
        const chart = this.chart, target = this.target, index = this.index, options = merge(true, this.options, userOptions);
        this.destroy();
        this.constructor(chart, target, options, index);
        this.render(chart.controlPointsGroup);
        this.redraw();
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_ControlPoint = (ControlPoint);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Callback to modify annotation's positioner controls.
 *
 * @callback Highcharts.AnnotationControlPointPositionerFunction
 * @param {Highcharts.AnnotationControlPoint} this
 * @param {Highcharts.AnnotationControllable} target
 * @return {Highcharts.PositionObject}
 */
(''); // Keeps doclets above in JS file

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Extensions/Annotations/MockPoint.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { series: { prototype: seriesProto } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { defined: MockPoint_defined, fireEvent: MockPoint_fireEvent } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * A trimmed point object which imitates {@link Highchart.Point} class. It is
 * created when there is a need of pointing to some chart's position using axis
 * values or pixel values
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationMockPoint
 *
 * @hideconstructor
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.AnnotationControllable|null} target
 * The related controllable.
 *
 * @param {Highcharts.AnnotationMockPointOptionsObject|Function} options
 * The options object.
 */
class MockPoint {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Create a mock point from a real Highcharts point.
     *
     * @private
     * @static
     *
     * @param {Highcharts.Point} point
     *
     * @return {Highcharts.AnnotationMockPoint}
     * A mock point instance.
     */
    static fromPoint(point) {
        return new MockPoint(point.series.chart, null, {
            x: point.x,
            y: point.y,
            xAxis: point.series.xAxis,
            yAxis: point.series.yAxis
        });
    }
    /**
     * Get the pixel position from the point like object.
     *
     * @private
     * @static
     *
     * @param {Highcharts.AnnotationPointType} point
     *
     * @param {boolean} [paneCoordinates]
     *        Whether the pixel position should be relative
     *
     * @return {Highcharts.PositionObject} pixel position
     */
    static pointToPixels(point, paneCoordinates) {
        const series = point.series, chart = series.chart;
        let x = point.plotX || 0, y = point.plotY || 0, plotBox;
        if (chart.inverted) {
            if (point.mock) {
                x = point.plotY;
                y = point.plotX;
            }
            else {
                x = chart.plotWidth - (point.plotY || 0);
                y = chart.plotHeight - (point.plotX || 0);
            }
        }
        if (series && !paneCoordinates) {
            plotBox = series.getPlotBox();
            x += plotBox.translateX;
            y += plotBox.translateY;
        }
        return {
            x: x,
            y: y
        };
    }
    /**
     * Get fresh mock point options from the point like object.
     *
     * @private
     * @static
     *
     * @param {Highcharts.AnnotationPointType} point
     *
     * @return {Highcharts.AnnotationMockPointOptionsObject}
     * A mock point's options.
     */
    static pointToOptions(point) {
        return {
            x: point.x,
            y: point.y,
            xAxis: point.series.xAxis,
            yAxis: point.series.yAxis
        };
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, target, options) {
        /* *
         *
         * Functions
         *
         * */
        /**
         * A flag indicating that a point is not the real one.
         *
         * @type {boolean}
         * @default true
         */
        this.mock = true;
        // Circular reference for formats and formatters
        this.point = this;
        /**
         * A mock series instance imitating a real series from a real point.
         *
         * @name Annotation.AnnotationMockPoint#series
         * @type {Highcharts.AnnotationMockSeries}
         */
        this.series = {
            visible: true,
            chart: chart,
            getPlotBox: seriesProto.getPlotBox
        };
        /**
         * @name Annotation.AnnotationMockPoint#target
         * @type {Highcharts.AnnotationControllable|null}
         */
        this.target = target || null;
        /**
         * Options for the mock point.
         *
         * @name Annotation.AnnotationMockPoint#options
         * @type {Highcharts.AnnotationsMockPointOptionsObject}
         */
        this.options = options;
        /**
         * If an xAxis is set it represents the point's value in terms of the
         * xAxis.
         *
         * @name Annotation.AnnotationMockPoint#x
         * @type {number|undefined}
         */
        /**
         * If an yAxis is set it represents the point's value in terms of the
         * yAxis.
         *
         * @name Annotation.AnnotationMockPoint#y
         * @type {number|undefined}
         */
        /**
         * It represents the point's pixel x coordinate relative to its plot
         * box.
         *
         * @name Annotation.AnnotationMockPoint#plotX
         * @type {number|undefined}
         */
        /**
         * It represents the point's pixel y position relative to its plot box.
         *
         * @name Annotation.AnnotationMockPoint#plotY
         * @type {number|undefined}
         */
        /**
         * Whether the point is inside the plot box.
         *
         * @name Annotation.AnnotationMockPoint#isInside
         * @type {boolean|undefined}
         */
        this.applyOptions(this.getOptions());
    }
    /**
     * Apply options for the point.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     */
    applyOptions(options) {
        this.command = options.command;
        this.setAxis(options, 'x');
        this.setAxis(options, 'y');
        this.refresh();
    }
    /**
     * Get the point's options.
     * @private
     * @return {Highcharts.AnnotationMockPointOptionsObject}
     * The mock point's options.
     */
    getOptions() {
        return this.hasDynamicOptions() ?
            this.options(this.target) :
            this.options;
    }
    /**
     * Check if the point has dynamic options.
     * @private
     * @return {boolean}
     * A positive flag if the point has dynamic options.
     */
    hasDynamicOptions() {
        return typeof this.options === 'function';
    }
    /**
     * Check if the point is inside its pane.
     * @private
     * @return {boolean} A flag indicating whether the point is inside the pane.
     */
    isInsidePlot() {
        const plotX = this.plotX, plotY = this.plotY, xAxis = this.series.xAxis, yAxis = this.series.yAxis, e = {
            x: plotX,
            y: plotY,
            isInsidePlot: true,
            options: {}
        };
        if (xAxis) {
            e.isInsidePlot = MockPoint_defined(plotX) && plotX >= 0 && plotX <= xAxis.len;
        }
        if (yAxis) {
            e.isInsidePlot =
                e.isInsidePlot &&
                    MockPoint_defined(plotY) &&
                    plotY >= 0 && plotY <= yAxis.len;
        }
        MockPoint_fireEvent(this.series.chart, 'afterIsInsidePlot', e);
        return e.isInsidePlot;
    }
    /**
     * Refresh point values and coordinates based on its options.
     * @private
     */
    refresh() {
        const series = this.series, xAxis = series.xAxis, yAxis = series.yAxis, options = this.getOptions();
        if (xAxis) {
            this.x = options.x;
            this.plotX = xAxis.toPixels(options.x, true);
        }
        else {
            this.x = void 0;
            this.plotX = options.x;
        }
        if (yAxis) {
            this.y = options.y;
            this.plotY = yAxis.toPixels(options.y, true);
        }
        else {
            this.y = null;
            this.plotY = options.y;
        }
        this.isInside = this.isInsidePlot();
    }
    /**
     * Refresh point options based on its plot coordinates.
     * @private
     */
    refreshOptions() {
        const series = this.series, xAxis = series.xAxis, yAxis = series.yAxis;
        this.x = this.options.x = xAxis ?
            this.options.x = xAxis.toValue(this.plotX, true) :
            this.plotX;
        this.y = this.options.y = yAxis ?
            yAxis.toValue(this.plotY, true) :
            this.plotY;
    }
    /**
     * Rotate the point.
     * @private
     * @param {number} cx origin x rotation
     * @param {number} cy origin y rotation
     * @param {number} radians
     */
    rotate(cx, cy, radians) {
        if (!this.hasDynamicOptions()) {
            const cos = Math.cos(radians), sin = Math.sin(radians), x = this.plotX - cx, y = this.plotY - cy, tx = x * cos - y * sin, ty = x * sin + y * cos;
            this.plotX = tx + cx;
            this.plotY = ty + cy;
            this.refreshOptions();
        }
    }
    /**
     * Scale the point.
     *
     * @private
     *
     * @param {number} cx
     * Origin x transformation.
     *
     * @param {number} cy
     * Origin y transformation.
     *
     * @param {number} sx
     * Scale factor x.
     *
     * @param {number} sy
     * Scale factor y.
     */
    scale(cx, cy, sx, sy) {
        if (!this.hasDynamicOptions()) {
            const x = this.plotX * sx, y = this.plotY * sy, tx = (1 - sx) * cx, ty = (1 - sy) * cy;
            this.plotX = tx + x;
            this.plotY = ty + y;
            this.refreshOptions();
        }
    }
    /**
     * Set x or y axis.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     * @param {string} xOrY
     * 'x' or 'y' string literal
     */
    setAxis(options, xOrY) {
        const axisName = (xOrY + 'Axis'), axisOptions = options[axisName], chart = this.series.chart;
        this.series[axisName] =
            typeof axisOptions === 'object' ?
                axisOptions :
                MockPoint_defined(axisOptions) ?
                    (chart[axisName][axisOptions] ||
                        // @todo v--- (axisName)[axisOptions] ?
                        chart.get(axisOptions)) :
                    null;
    }
    /**
     * Transform the mock point to an anchor (relative position on the chart).
     * @private
     * @return {Array<number>}
     * A quadruple of numbers which denotes x, y, width and height of the box
     **/
    toAnchor() {
        const anchor = [this.plotX, this.plotY, 0, 0];
        if (this.series.chart.inverted) {
            anchor[0] = this.plotY;
            anchor[1] = this.plotX;
        }
        return anchor;
    }
    /**
     * Translate the point.
     *
     * @private
     *
     * @param {number|undefined} cx
     * Origin x transformation.
     *
     * @param {number|undefined} cy
     * Origin y transformation.
     *
     * @param {number} dx
     * Translation for x coordinate.
     *
     * @param {number} dy
     * Translation for y coordinate.
     **/
    translate(_cx, _cy, dx, dy) {
        if (!this.hasDynamicOptions()) {
            this.plotX += dx;
            this.plotY += dy;
            this.refreshOptions();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_MockPoint = (MockPoint);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @private
 * @interface Highcharts.AnnotationMockLabelOptionsObject
 */ /**
* Point instance of the point.
* @name Highcharts.AnnotationMockLabelOptionsObject#point
* @type {Highcharts.AnnotationMockPoint}
*/ /**
* X value translated to x axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#x
* @type {number|null}
*/ /**
* Y value translated to y axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#y
* @type {number|null}
*/
/**
 * Object of shape point.
 *
 * @interface Highcharts.AnnotationMockPointOptionsObject
 */ /**
* The x position of the point. Units can be either in axis
* or chart pixel coordinates.
*
* @type      {number}
* @name      Highcharts.AnnotationMockPointOptionsObject.x
*/ /**
* The y position of the point. Units can be either in axis
* or chart pixel coordinates.
*
* @type      {number}
* @name      Highcharts.AnnotationMockPointOptionsObject.y
*/ /**
* This number defines which xAxis the point is connected to.
* It refers to either the axis id or the index of the axis in
* the xAxis array. If the option is not configured or the axis
* is not found the point's x coordinate refers to the chart
* pixels.
*
* @type      {number|string|null}
* @name      Highcharts.AnnotationMockPointOptionsObject.xAxis
*/ /**
* This number defines which yAxis the point is connected to.
* It refers to either the axis id or the index of the axis in
* the yAxis array. If the option is not configured or the axis
* is not found the point's y coordinate refers to the chart
* pixels.
*
* @type      {number|string|null}
* @name      Highcharts.AnnotationMockPointOptionsObject.yAxis
*/
/**
 * Callback function that returns the annotation shape point.
 *
 * @callback Highcharts.AnnotationMockPointFunction
 *
 * @param  {Highcharts.Annotation} annotation
 *         An annotation instance.
 *
 * @return {Highcharts.AnnotationMockPointOptionsObject}
 *         Annotations shape point.
 */
/**
 * A mock series instance imitating a real series from a real point.
 * @private
 * @interface Highcharts.AnnotationMockSeries
 */ /**
* Whether a series is visible.
* @name Highcharts.AnnotationMockSeries#visible
* @type {boolean}
*/ /**
* A chart instance.
* @name Highcharts.AnnotationMockSeries#chart
* @type {Highcharts.Chart}
*/ /**
* @name Highcharts.AnnotationMockSeries#getPlotBox
* @type {Function}
*/
/**
 * Indicates if this is a mock point for an annotation.
 * @name Highcharts.Point#mock
 * @type {boolean|undefined}
 */
(''); // Keeps doclets above in JS file

;// ./code/es-modules/Extensions/Annotations/ControlTarget.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




/* *
 *
 *  Composition Namespace
 *
 * */
var ControlTarget;
(function (ControlTarget) {
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
     * Add control points.
     * @private
     */
    function addControlPoints() {
        const controlPoints = this.controlPoints, controlPointsOptions = this.options.controlPoints || [];
        controlPointsOptions.forEach((controlPointOptions, i) => {
            const options = highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().merge(this.options.controlPointOptions, controlPointOptions);
            if (!options.index) {
                options.index = i;
            }
            controlPointsOptions[i] = options;
            controlPoints.push(new Annotations_ControlPoint(this.chart, this, options));
        });
    }
    /**
     * Returns object which denotes anchor position - relative and absolute.
     * @private
     * @param {Highcharts.AnnotationPointType} point
     * An annotation point.
     *
     * @return {Highcharts.AnnotationAnchorObject}
     * An annotation anchor.
     */
    function anchor(point) {
        const plotBox = point.series.getPlotBox(), chart = point.series.chart, box = point.mock ?
            point.toAnchor() :
            chart.tooltip &&
                chart.tooltip.getAnchor.call({
                    chart: point.series.chart
                }, point) ||
                [0, 0, 0, 0], anchor = {
            x: box[0] + (this.options.x || 0),
            y: box[1] + (this.options.y || 0),
            height: box[2] || 0,
            width: box[3] || 0
        };
        return {
            relativePosition: anchor,
            absolutePosition: highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().merge(anchor, {
                x: anchor.x + (point.mock ? plotBox.translateX : chart.plotLeft),
                y: anchor.y + (point.mock ? plotBox.translateY : chart.plotTop)
            })
        };
    }
    /**
     * Adds shared functions to be used with targets of ControlPoint.
     * @private
     */
    function compose(ControlTargetClass) {
        const controlProto = ControlTargetClass.prototype;
        if (!controlProto.addControlPoints) {
            highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().merge(true, controlProto, {
                addControlPoints,
                anchor,
                destroyControlTarget,
                getPointsOptions,
                linkPoints,
                point,
                redrawControlPoints,
                renderControlPoints,
                transform,
                transformPoint,
                translate,
                translatePoint
            });
        }
    }
    ControlTarget.compose = compose;
    /**
     * Destroy control points.
     * @private
     */
    function destroyControlTarget() {
        this.controlPoints.forEach((controlPoint) => controlPoint.destroy());
        this.chart = null;
        this.controlPoints = null;
        this.points = null;
        this.options = null;
        if (this.annotation) {
            this.annotation = null;
        }
    }
    /**
     * Get the points options.
     * @private
     * @return {Array<Highcharts.PointOptionsObject>}
     * An array of points' options.
     */
    function getPointsOptions() {
        const options = this.options;
        return (options.points ||
            (options.point && highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().splat(options.point)));
    }
    /**
     * Find point-like objects based on points options.
     * @private
     * @return {Array<Annotation.PointLike>}
     *         An array of point-like objects.
     */
    function linkPoints() {
        const pointsOptions = this.getPointsOptions(), points = this.points, len = (pointsOptions && pointsOptions.length) || 0;
        let i, point;
        for (i = 0; i < len; i++) {
            point = this.point(pointsOptions[i], points[i]);
            if (!point) {
                points.length = 0;
                return;
            }
            if (point.mock) {
                point.refresh();
            }
            points[i] = point;
        }
        return points;
    }
    /**
     * Map point's options to a point-like object.
     * @private
     * @param {string|Function|Highcharts.AnnotationMockPointOptionsObject|Highcharts.AnnotationPointType} pointOptions
     *        Point's options.
     * @param {Highcharts.AnnotationPointType} point
     *        A point-like instance.
     * @return {Highcharts.AnnotationPointType|null}
     *         If the point is found/set returns this point, otherwise null
     */
    function point(pointOptions, point) {
        if (pointOptions && pointOptions.series) {
            return pointOptions;
        }
        if (!point || point.series === null) {
            if (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().isObject(pointOptions)) {
                point = new Annotations_MockPoint(this.chart, this, pointOptions);
            }
            else if (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().isString(pointOptions)) {
                point = this.chart.get(pointOptions) || null;
            }
            else if (typeof pointOptions === 'function') {
                const pointConfig = pointOptions.call(point, this);
                point = pointConfig.series ?
                    pointConfig :
                    new Annotations_MockPoint(this.chart, this, pointOptions);
            }
        }
        return point;
    }
    /**
     * Redraw control points.
     * @private
     */
    function redrawControlPoints(animation) {
        this.controlPoints.forEach((controlPoint) => controlPoint.redraw(animation));
    }
    /**
     * Render control points.
     * @private
     */
    function renderControlPoints() {
        this.controlPoints.forEach((controlPoint) => controlPoint.render());
    }
    /**
     * Transform control points with a specific transformation.
     * @private
     * @param {string} transformation
     *        A transformation name
     * @param {number|null} cx
     *        Origin x transformation
     * @param {number|null} cy
     *        Origin y transformation
     * @param {number} p1
     *        Param for the transformation
     * @param {number} [p2]
     *        Param for the transformation
     */
    function transform(transformation, cx, cy, p1, p2) {
        if (this.chart.inverted) {
            const temp = cx;
            cx = cy;
            cy = temp;
        }
        this.points.forEach((_point, i) => (this.transformPoint(transformation, cx, cy, p1, p2, i)), this);
    }
    /**
     * Transform a point with a specific transformation
     * If a transformed point is a real point it is replaced with
     * the mock point.
     * @private
     * @param {string} transformation
     *        A transformation name
     * @param {number|null} cx
     *        Origin x transformation
     * @param {number|null} cy
     *        Origin y transformation
     * @param {number} p1
     *        Param for the transformation
     * @param {number|undefined} p2
     *        Param for the transformation
     * @param {number} i
     *        Index of the point
     */
    function transformPoint(transformation, cx, cy, p1, p2, i) {
        let point = this.points[i];
        if (!point.mock) {
            point = this.points[i] = Annotations_MockPoint.fromPoint(point);
        }
        point[transformation](cx, cy, p1, p2);
    }
    /**
     * Translate control points.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     **/
    function translate(dx, dy) {
        this.transform('translate', null, null, dx, dy);
    }
    /**
     * Translate a specific control point.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     * @param {number} i
     *        Index of the point
     **/
    function translatePoint(dx, dy, i) {
        this.transformPoint('translate', null, null, dx, dy, i);
    }
})(ControlTarget || (ControlTarget = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_ControlTarget = (ControlTarget);

;// ./code/es-modules/Extensions/Annotations/Controllables/Controllable.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { merge: Controllable_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * It provides methods for handling points, control points
 * and points transformations.
 * @private
 */
class Controllable {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(annotation, options, index, itemType) {
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.collection = (itemType === 'label' ? 'labels' : 'shapes');
        this.controlPoints = [];
        this.options = options;
        this.points = [];
        this.index = index;
        this.itemType = itemType;
        this.init(annotation, options, index);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Redirect attr usage on the controllable graphic element.
     * @private
     */
    attr(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ..._args) {
        this.graphic.attr.apply(this.graphic, arguments);
    }
    /**
     * Utility function for mapping item's options
     * to element's attribute
     * @private
     * @param {Highcharts.AnnotationsLabelsOptions|Highcharts.AnnotationsShapesOptions} options
     * @return {Highcharts.SVGAttributes}
     *         Mapped options.
     */
    attrsFromOptions(options) {
        const map = this.constructor.attrsMap, attrs = {}, styledMode = this.chart.styledMode;
        let key, mappedKey;
        for (key in options) { // eslint-disable-line guard-for-in
            mappedKey = map[key];
            if (typeof map[key] !== 'undefined' &&
                (!styledMode ||
                    ['fill', 'stroke', 'stroke-width']
                        .indexOf(mappedKey) === -1)) {
                attrs[mappedKey] = options[key];
            }
        }
        return attrs;
    }
    /**
     * Destroy a controllable.
     * @private
     */
    destroy() {
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        if (this.tracker) {
            this.tracker = this.tracker.destroy();
        }
        this.destroyControlTarget();
    }
    /**
     * Init the controllable
     * @private
     */
    init(annotation, options, index) {
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.options = options;
        this.points = [];
        this.controlPoints = [];
        this.index = index;
        this.linkPoints();
        this.addControlPoints();
    }
    /**
     * Redraw a controllable.
     * @private
     */
    redraw(animation) {
        this.redrawControlPoints(animation);
    }
    /**
     * Render a controllable.
     * @private
     */
    render(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parentGroup) {
        if (this.options.className && this.graphic) {
            this.graphic.addClass(this.options.className);
        }
        this.renderControlPoints();
    }
    /**
     * Rotate a controllable.
     * @private
     * @param {number} cx
     *        Origin x rotation
     * @param {number} cy
     *        Origin y rotation
     * @param {number} radians
     **/
    rotate(cx, cy, radians) {
        this.transform('rotate', cx, cy, radians);
    }
    /**
     * Scale a controllable.
     * @private
     * @param {number} cx
     *        Origin x rotation
     * @param {number} cy
     *        Origin y rotation
     * @param {number} sx
     *        Scale factor x
     * @param {number} sy
     *        Scale factor y
     */
    scale(cx, cy, sx, sy) {
        this.transform('scale', cx, cy, sx, sy);
    }
    /**
     * Set control points' visibility.
     * @private
     */
    setControlPointsVisibility(visible) {
        this.controlPoints.forEach((controlPoint) => {
            controlPoint.setVisibility(visible);
        });
    }
    /**
     * Check if a controllable should be rendered/redrawn.
     * @private
     * @return {boolean}
     *         Whether a controllable should be drawn.
     */
    shouldBeDrawn() {
        return !!this.points.length;
    }
    /**
     * Translate shape within controllable item.
     * Replaces `controllable.translate` method.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     * @param {boolean|undefined} translateSecondPoint
     *        If the shape has two points attached to it, this option allows you
     *        to translate also the second point.
     */
    translateShape(dx, dy, translateSecondPoint) {
        const chart = this.annotation.chart, 
        // Annotation.options
        shapeOptions = this.annotation.userOptions, 
        // Chart.options.annotations
        annotationIndex = chart.annotations.indexOf(this.annotation), chartOptions = chart.options.annotations[annotationIndex];
        this.translatePoint(dx, dy, 0);
        if (translateSecondPoint) {
            this.translatePoint(dx, dy, 1);
        }
        // Options stored in:
        // - chart (for exporting)
        // - current config (for redraws)
        chartOptions[this.collection][this.index]
            .point = this.options.point;
        shapeOptions[this.collection][this.index]
            .point = this.options.point;
    }
    /**
     * Update a controllable.
     * @private
     */
    update(newOptions) {
        const annotation = this.annotation, options = Controllable_merge(true, this.options, newOptions), parentGroup = this.graphic.parentGroup, Constructor = this.constructor;
        this.destroy();
        const newControllable = new Constructor(annotation, options, this.index, this.itemType);
        Controllable_merge(true, this, newControllable);
        this.render(parentGroup);
        this.redraw();
    }
}
Annotations_ControlTarget.compose(Controllable);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_Controllable = (Controllable);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * An object which denotes a controllable's anchor positions - relative and
 * absolute.
 *
 * @private
 * @interface Highcharts.AnnotationAnchorObject
 */ /**
* Relative to the plot area position
* @name Highcharts.AnnotationAnchorObject#relativePosition
* @type {Highcharts.BBoxObject}
*/ /**
* Absolute position
* @name Highcharts.AnnotationAnchorObject#absolutePosition
* @type {Highcharts.BBoxObject}
*/
/**
 * @interface Highcharts.AnnotationControllable
 */ /**
* @name Highcharts.AnnotationControllable#annotation
* @type {Highcharts.Annotation}
*/ /**
* @name Highcharts.AnnotationControllable#chart
* @type {Highcharts.Chart}
*/ /**
* @name Highcharts.AnnotationControllable#collection
* @type {string}
*/ /**
* @private
* @name Highcharts.AnnotationControllable#controlPoints
* @type {Array<Highcharts.AnnotationControlPoint>}
*/ /**
* @name Highcharts.AnnotationControllable#points
* @type {Array<Highcharts.Point>}
*/
(''); // Keeps doclets above in JS file

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableDefaults.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/**
 * Options for configuring markers for annotations.
 *
 * An example of the arrow marker:
 * <pre>
 * {
 *   arrow: {
 *     id: 'arrow',
 *     tagName: 'marker',
 *     refY: 5,
 *     refX: 5,
 *     markerWidth: 10,
 *     markerHeight: 10,
 *     children: [{
 *       tagName: 'path',
 *       attrs: {
 *         d: 'M 0 0 L 10 5 L 0 10 Z',
 *         'stroke-width': 0
 *       }
 *     }]
 *   }
 * }
 * </pre>
 *
 * @sample highcharts/annotations/custom-markers/
 *         Define a custom marker for annotations
 *
 * @sample highcharts/css/annotations-markers/
 *         Define markers in a styled mode
 *
 * @type         {Highcharts.Dictionary<Highcharts.ASTNode>}
 * @since        6.0.0
 * @optionparent defs
 */
const defaultMarkers = {
    /**
     * @type {Highcharts.ASTNode}
     */
    arrow: {
        tagName: 'marker',
        attributes: {
            id: 'arrow',
            refY: 5,
            refX: 9,
            markerWidth: 10,
            markerHeight: 10
        },
        /**
         * @type {Array<Highcharts.DefsOptions>}
         */
        children: [{
                tagName: 'path',
                attributes: {
                    d: 'M 0 0 L 10 5 L 0 10 Z', // Triangle (used as an arrow)
                    'stroke-width': 0
                }
            }]
    },
    /**
     * @type {Highcharts.ASTNode}
     */
    'reverse-arrow': {
        tagName: 'marker',
        attributes: {
            id: 'reverse-arrow',
            refY: 5,
            refX: 1,
            markerWidth: 10,
            markerHeight: 10
        },
        children: [{
                tagName: 'path',
                attributes: {
                    // Reverse triangle (used as an arrow)
                    d: 'M 0 5 L 10 0 L 10 10 Z',
                    'stroke-width': 0
                }
            }]
    }
};
/* *
 *
 *  Default Export
 *
 * */
const ControllableDefaults = {
    defaultMarkers
};
/* harmony default export */ const Controllables_ControllableDefaults = (ControllableDefaults);

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllablePath.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { defaultMarkers: ControllablePath_defaultMarkers } = Controllables_ControllableDefaults;


const { addEvent: ControllablePath_addEvent, defined: ControllablePath_defined, extend, merge: ControllablePath_merge, uniqueKey } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const markerEndSetter = createMarkerSetter('marker-end');
const markerStartSetter = createMarkerSetter('marker-start');
// See TRACKER_FILL in highcharts.src.js
const TRACKER_FILL = 'rgba(192,192,192,' + ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).svg ? 0.0001 : 0.002) + ')';
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function createMarkerSetter(markerType) {
    return function (value) {
        this.attr(markerType, 'url(#' + value + ')');
    };
}
/**
 * @private
 */
function onChartAfterGetContainer() {
    this.options.defs = ControllablePath_merge(ControllablePath_defaultMarkers, this.options.defs || {});
    ///  objectEach(this.options.defs, function (def): void {
    //     const attributes = def.attributes;
    //     if (
    //         def.tagName === 'marker' &&
    //         attributes &&
    //         attributes.id &&
    //         attributes.display !== 'none'
    //     ) {
    //         this.renderer.addMarker(attributes.id, def);
    //     }
    // }, this);
}
/**
 * @private
 */
function svgRendererAddMarker(id, markerOptions) {
    const options = { attributes: { id } };
    const attrs = {
        stroke: markerOptions.color || 'none',
        fill: markerOptions.color || 'rgba(0, 0, 0, 0.75)'
    };
    options.children = (markerOptions.children &&
        markerOptions.children.map(function (child) {
            return ControllablePath_merge(attrs, child);
        }));
    const ast = ControllablePath_merge(true, {
        attributes: {
            markerWidth: 20,
            markerHeight: 20,
            refX: 0,
            refY: 0,
            orient: 'auto'
        }
    }, markerOptions, options);
    const marker = this.definition(ast);
    marker.id = id;
    return marker;
}
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable path class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllablePath
 *
 * @param {Highcharts.Annotation}
 * Related annotation.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A path's options object.
 *
 * @param {number} index
 * Index of the path.
 */
class ControllablePath extends Controllables_Controllable {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(ChartClass, SVGRendererClass) {
        const svgRendererProto = SVGRendererClass.prototype;
        if (!svgRendererProto.addMarker) {
            ControllablePath_addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
            svgRendererProto.addMarker = svgRendererAddMarker;
        }
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'path';
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Map the controllable path to 'd' path attribute.
     *
     * @return {Highcharts.SVGPathArray|null}
     * A path's d attribute.
     */
    toD() {
        const dOption = this.options.d;
        if (dOption) {
            return typeof dOption === 'function' ?
                dOption.call(this) :
                dOption;
        }
        const points = this.points, len = points.length, d = [];
        let showPath = len, point = points[0], position = showPath && this.anchor(point).absolutePosition, pointIndex = 0, command;
        if (position) {
            d.push(['M', position.x, position.y]);
            while (++pointIndex < len && showPath) {
                point = points[pointIndex];
                command = point.command || 'L';
                position = this.anchor(point).absolutePosition;
                if (command === 'M') {
                    d.push([command, position.x, position.y]);
                }
                else if (command === 'L') {
                    d.push([command, position.x, position.y]);
                }
                else if (command === 'Z') {
                    d.push([command]);
                }
                showPath = point.series.visible;
            }
        }
        return (showPath && this.graphic ?
            this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) :
            null);
    }
    shouldBeDrawn() {
        return super.shouldBeDrawn() || !!this.options.d;
    }
    render(parent) {
        const options = this.options, attrs = this.attrsFromOptions(options);
        this.graphic = this.annotation.chart.renderer
            .path([['M', 0, 0]])
            .attr(attrs)
            .add(parent);
        this.tracker = this.annotation.chart.renderer
            .path([['M', 0, 0]])
            .addClass('highcharts-tracker-line')
            .attr({
            zIndex: 2
        })
            .add(parent);
        if (!this.annotation.chart.styledMode) {
            this.tracker.attr({
                'stroke-linejoin': 'round', // #1225
                stroke: TRACKER_FILL,
                fill: TRACKER_FILL,
                'stroke-width': this.graphic.strokeWidth() +
                    options.snap * 2
            });
        }
        super.render();
        extend(this.graphic, { markerStartSetter, markerEndSetter });
        this.setMarkers(this);
    }
    redraw(animation) {
        if (this.graphic) {
            const d = this.toD(), action = animation ? 'animate' : 'attr';
            if (d) {
                this.graphic[action]({ d: d });
                this.tracker[action]({ d: d });
            }
            else {
                this.graphic.attr({ d: 'M 0 ' + -9e9 });
                this.tracker.attr({ d: 'M 0 ' + -9e9 });
            }
            this.graphic.placed = this.tracker.placed = !!d;
        }
        super.redraw(animation);
    }
    /**
     * Set markers.
     * @private
     * @param {Highcharts.AnnotationControllablePath} item
     */
    setMarkers(item) {
        const itemOptions = item.options, chart = item.chart, defs = chart.options.defs, fill = itemOptions.fill, color = ControllablePath_defined(fill) && fill !== 'none' ?
            fill :
            itemOptions.stroke;
        const setMarker = function (markerType) {
            const markerId = itemOptions[markerType];
            let def, predefinedMarker, key, marker;
            if (markerId) {
                for (key in defs) { // eslint-disable-line guard-for-in
                    def = defs[key];
                    if ((markerId === (def.attributes && def.attributes.id) ||
                        // Legacy, for
                        // unit-tests/annotations/annotations-shapes
                        markerId === def.id) &&
                        def.tagName === 'marker') {
                        predefinedMarker = def;
                        break;
                    }
                }
                if (predefinedMarker) {
                    marker = item[markerType] = chart.renderer
                        .addMarker((itemOptions.id || uniqueKey()) + '-' + markerId, ControllablePath_merge(predefinedMarker, { color: color }));
                    item.attr(markerType, marker.getAttribute('id'));
                }
            }
        };
        ['markerStart', 'markerEnd']
            .forEach(setMarker);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @name Highcharts.AnnotationControllablePath.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllablePath.attrsMap = {
    dashStyle: 'dashstyle',
    strokeWidth: 'stroke-width',
    stroke: 'stroke',
    fill: 'fill',
    zIndex: 'zIndex'
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllablePath = (ControllablePath);

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableRect.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: ControllableRect_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable rect class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableRect
 *
 * @param {Highcharts.Annotation} annotation
 * An annotation instance.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A rect's options.
 *
 * @param {number} index
 * Index of the rectangle
 */
class ControllableRect extends Controllables_Controllable {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'rect';
        this.translate = super.translateShape;
    }
    /* *
     *
     *  Functions
     *
     * */
    render(parent) {
        const attrs = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer
            .rect(0, -9e9, 0, 0)
            .attr(attrs)
            .add(parent);
        super.render();
    }
    redraw(animation) {
        if (this.graphic) {
            const position = this.anchor(this.points[0]).absolutePosition;
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y,
                    width: this.options.width,
                    height: this.options.height
                });
            }
            else {
                this.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = Boolean(position);
        }
        super.redraw(animation);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @type {Annotation.ControllableRect.AttrsMap}
 */
ControllableRect.attrsMap = ControllableRect_merge(Controllables_ControllablePath.attrsMap, {
    width: 'width',
    height: 'height'
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllableRect = (ControllableRect);

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableCircle.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: ControllableCircle_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable circle class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableCircle
 *
 * @param {Highcharts.Annotation} annotation an annotation instance
 * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
 * @param {number} index of the circle
 */
class ControllableCircle extends Controllables_Controllable {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'circle';
        this.translate = super.translateShape;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    redraw(animation) {
        if (this.graphic) {
            const position = this.anchor(this.points[0]).absolutePosition;
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y,
                    r: this.options.r
                });
            }
            else {
                this.graphic.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = !!position;
        }
        super.redraw.call(this, animation);
    }
    /**
     * @private
     */
    render(parent) {
        const attrs = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer
            .circle(0, -9e9, 0)
            .attr(attrs)
            .add(parent);
        super.render();
    }
    /**
     * Set the radius.
     * @private
     * @param {number} r
     *        A radius to be set
     */
    setRadius(r) {
        this.options.r = r;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element
 * attributes.
 *
 * @name Highcharts.AnnotationControllableCircle.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllableCircle.attrsMap = ControllableCircle_merge(Controllables_ControllablePath.attrsMap, { r: 'r' });
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllableCircle = (ControllableCircle);

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableEllipse.js
/* *
 *
 * Author: Pawel Lysy
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: ControllableEllipse_merge, defined: ControllableEllipse_defined } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable ellipse class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableEllipse
 *
 * @param {Highcharts.Annotation} annotation an annotation instance
 * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
 * @param {number} index of the Ellipse
 */
class ControllableEllipse extends Controllables_Controllable {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'ellipse';
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    init(annotation, options, index) {
        if (ControllableEllipse_defined(options.yAxis)) {
            options.points.forEach((point) => {
                point.yAxis = options.yAxis;
            });
        }
        if (ControllableEllipse_defined(options.xAxis)) {
            options.points.forEach((point) => {
                point.xAxis = options.xAxis;
            });
        }
        super.init(annotation, options, index);
    }
    /**
     * Render the element
     * @private
     * @param parent
     *        Parent SVG element.
     */
    render(parent) {
        this.graphic = this.annotation.chart.renderer.createElement('ellipse')
            .attr(this.attrsFromOptions(this.options))
            .add(parent);
        super.render();
    }
    /**
     * Translate the points. Mostly used to handle dragging of the ellipse.
     * @private
     */
    translate(dx, dy) {
        super.translateShape(dx, dy, true);
    }
    /**
     * Get the distance from the line to the point.
     * @private
     * @param point1
     *        First point which is on the line
     * @param point2
     *        Second point
     * @param x0
     *        Point's x value from which you want to calculate the distance from
     * @param y0
     *        Point's y value from which you want to calculate the distance from
     */
    getDistanceFromLine(point1, point2, x0, y0) {
        return Math.abs((point2.y - point1.y) * x0 - (point2.x - point1.x) * y0 +
            point2.x * point1.y - point2.y * point1.x) / Math.sqrt((point2.y - point1.y) * (point2.y - point1.y) +
            (point2.x - point1.x) * (point2.x - point1.x));
    }
    /**
     * The function calculates the svg attributes of the ellipse, and returns
     * all parameters necessary to draw the ellipse.
     * @private
     * @param position
     *        Absolute position of the first point in points array
     * @param position2
     *        Absolute position of the second point in points array
     */
    getAttrs(position, position2) {
        const x1 = position.x, y1 = position.y, x2 = position2.x, y2 = position2.y, cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, rx = Math.sqrt((x1 - x2) * (x1 - x2) / 4 + (y1 - y2) * (y1 - y2) / 4), tan = (y2 - y1) / (x2 - x1);
        let angle = Math.atan(tan) * 180 / Math.PI;
        if (cx < x1) {
            angle += 180;
        }
        const ry = this.getRY();
        return { cx, cy, rx, ry, angle };
    }
    /**
     * Get the value of minor radius of the ellipse.
     * @private
     */
    getRY() {
        const yAxis = this.getYAxis();
        return ControllableEllipse_defined(yAxis) ?
            Math.abs(yAxis.toPixels(this.options.ry) - yAxis.toPixels(0)) :
            this.options.ry;
    }
    /**
     * Get the yAxis object to which the ellipse is pinned.
     * @private
     */
    getYAxis() {
        const yAxisIndex = this.options.yAxis;
        return this.chart.yAxis[yAxisIndex];
    }
    /**
     * Get the absolute coordinates of the MockPoint
     * @private
     * @param point
     *        MockPoint that is added through options
     */
    getAbsolutePosition(point) {
        return this.anchor(point).absolutePosition;
    }
    /**
     * Redraw the element
     * @private
     * @param animation
     *        Display an animation
     */
    redraw(animation) {
        if (this.graphic) {
            const position = this.getAbsolutePosition(this.points[0]), position2 = this.getAbsolutePosition(this.points[1]), attrs = this.getAttrs(position, position2);
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    cx: attrs.cx,
                    cy: attrs.cy,
                    rx: attrs.rx,
                    ry: attrs.ry,
                    rotation: attrs.angle,
                    rotationOriginX: attrs.cx,
                    rotationOriginY: attrs.cy
                });
            }
            else {
                this.graphic.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = Boolean(position);
        }
        super.redraw(animation);
    }
    /**
     * Set the radius Y.
     * @private
     * @param {number} ry
     *        A radius in y direction to be set
     */
    setYRadius(ry) {
        const shapes = this.annotation.userOptions.shapes;
        this.options.ry = ry;
        if (shapes && shapes[0]) {
            shapes[0].ry = ry;
            shapes[0].ry = ry;
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element
 * attributes.
 *
 * @name Highcharts.AnnotationControllableEllipse.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllableEllipse.attrsMap = ControllableEllipse_merge(Controllables_ControllablePath.attrsMap, {
    ry: 'ry'
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllableEllipse = (ControllableEllipse);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Templating"],"commonjs":["highcharts","Templating"],"commonjs2":["highcharts","Templating"],"root":["Highcharts","Templating"]}
var highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_ = __webpack_require__(984);
var highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_default = /*#__PURE__*/__webpack_require__.n(highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_);
;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableLabel.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { format } = (highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_default());


const { extend: ControllableLabel_extend, getAlignFactor, isNumber, pick: ControllableLabel_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * General symbol definition for labels with connector
 * @private
 */
function symbolConnector(x, y, w, h, options) {
    const anchorX = options && options.anchorX, anchorY = options && options.anchorY;
    let path, yOffset, lateral = w / 2;
    if (isNumber(anchorX) && isNumber(anchorY)) {
        path = [['M', anchorX, anchorY]];
        // Prefer 45 deg connectors
        yOffset = y - anchorY;
        if (yOffset < 0) {
            yOffset = -h - yOffset;
        }
        if (yOffset < w) {
            lateral = anchorX < x + (w / 2) ? yOffset : w - yOffset;
        }
        // Anchor below label
        if (anchorY > y + h) {
            path.push(['L', x + lateral, y + h]);
            // Anchor above label
        }
        else if (anchorY < y) {
            path.push(['L', x + lateral, y]);
            // Anchor left of label
        }
        else if (anchorX < x) {
            path.push(['L', x, y + h / 2]);
            // Anchor right of label
        }
        else if (anchorX > x + w) {
            path.push(['L', x + w, y + h / 2]);
        }
    }
    return path || [];
}
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable label class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableLabel
 *
 * @param {Highcharts.Annotation} annotation
 * An annotation instance.
 * @param {Highcharts.AnnotationsLabelOptions} options
 * A label's options.
 * @param {number} index
 * Index of the label.
 */
class ControllableLabel extends Controllables_Controllable {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Returns new aligned position based alignment options and box to align to.
     * It is almost a one-to-one copy from SVGElement.prototype.align
     * except it does not use and mutate an element
     *
     * @param {Highcharts.AnnotationAlignObject} alignOptions
     *
     * @param {Highcharts.BBoxObject} box
     *
     * @return {Highcharts.PositionObject}
     * Aligned position.
     */
    static alignedPosition(alignOptions, box) {
        return {
            x: Math.round((box.x || 0) + (alignOptions.x || 0) +
                (box.width - (alignOptions.width || 0)) *
                    getAlignFactor(alignOptions.align)),
            y: Math.round((box.y || 0) + (alignOptions.y || 0) +
                (box.height - (alignOptions.height || 0)) *
                    getAlignFactor(alignOptions.verticalAlign))
        };
    }
    static compose(SVGRendererClass) {
        const symbols = SVGRendererClass.prototype.symbols;
        symbols.connector = symbolConnector;
    }
    /**
     * Returns new alignment options for a label if the label is outside the
     * plot area. It is almost a one-to-one copy from
     * Series.prototype.justifyDataLabel except it does not mutate the label and
     * it works with absolute instead of relative position.
     */
    static justifiedOptions(chart, label, alignOptions, alignAttr) {
        const align = alignOptions.align, verticalAlign = alignOptions.verticalAlign, padding = label.box ? 0 : (label.padding || 0), bBox = label.getBBox(), 
        //
        options = {
            align: align,
            verticalAlign: verticalAlign,
            x: alignOptions.x,
            y: alignOptions.y,
            width: label.width,
            height: label.height
        }, 
        //
        x = (alignAttr.x || 0) - chart.plotLeft, y = (alignAttr.y || 0) - chart.plotTop;
        let off;
        // Off left
        off = x + padding;
        if (off < 0) {
            if (align === 'right') {
                options.align = 'left';
            }
            else {
                options.x = (options.x || 0) - off;
            }
        }
        // Off right
        off = x + bBox.width - padding;
        if (off > chart.plotWidth) {
            if (align === 'left') {
                options.align = 'right';
            }
            else {
                options.x = (options.x || 0) + chart.plotWidth - off;
            }
        }
        // Off top
        off = y + padding;
        if (off < 0) {
            if (verticalAlign === 'bottom') {
                options.verticalAlign = 'top';
            }
            else {
                options.y = (options.y || 0) - off;
            }
        }
        // Off bottom
        off = y + bBox.height - padding;
        if (off > chart.plotHeight) {
            if (verticalAlign === 'top') {
                options.verticalAlign = 'bottom';
            }
            else {
                options.y = (options.y || 0) + chart.plotHeight - off;
            }
        }
        return options;
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'label');
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Translate the point of the label by deltaX and deltaY translations.
     * The point is the label's anchor.
     *
     * @param {number} dx translation for x coordinate
     * @param {number} dy translation for y coordinate
     */
    translatePoint(dx, dy) {
        super.translatePoint(dx, dy, 0);
    }
    /**
     * Translate x and y position relative to the label's anchor.
     *
     * @param {number} dx translation for x coordinate
     * @param {number} dy translation for y coordinate
     */
    translate(dx, dy) {
        const chart = this.annotation.chart, 
        // Annotation.options
        labelOptions = this.annotation.userOptions, 
        // Chart.options.annotations
        annotationIndex = chart.annotations.indexOf(this.annotation), chartAnnotations = chart.options.annotations, chartOptions = chartAnnotations[annotationIndex];
        if (chart.inverted) {
            const temp = dx;
            dx = dy;
            dy = temp;
        }
        // Local options:
        this.options.x += dx;
        this.options.y += dy;
        // Options stored in chart:
        chartOptions[this.collection][this.index].x = this.options.x;
        chartOptions[this.collection][this.index].y = this.options.y;
        labelOptions[this.collection][this.index].x = this.options.x;
        labelOptions[this.collection][this.index].y = this.options.y;
    }
    render(parent) {
        const options = this.options, attrs = this.attrsFromOptions(options), style = options.style;
        this.graphic = this.annotation.chart.renderer
            .label('', 0, -9999, // #10055
        options.shape, null, null, options.useHTML, null, 'annotation-label')
            .attr(attrs)
            .add(parent);
        if (!this.annotation.chart.styledMode) {
            if (style.color === 'contrast') {
                style.color = this.annotation.chart.renderer.getContrast(ControllableLabel.shapesWithoutBackground.indexOf(options.shape) > -1 ? '#FFFFFF' : options.backgroundColor);
            }
            this.graphic
                .css(options.style)
                .shadow(options.shadow);
        }
        this.graphic.labelrank = options.labelrank;
        super.render();
    }
    redraw(animation) {
        const options = this.options, text = this.text || options.format || options.text, label = this.graphic, point = this.points[0];
        if (!label) {
            this.redraw(animation);
            return;
        }
        label.attr({
            text: text ?
                format(String(text), point, this.annotation.chart) :
                options.formatter.call(point, this)
        });
        const anchor = this.anchor(point);
        const attrs = this.position(anchor);
        if (attrs) {
            label.alignAttr = attrs;
            attrs.anchorX = anchor.absolutePosition.x;
            attrs.anchorY = anchor.absolutePosition.y;
            label[animation ? 'animate' : 'attr'](attrs);
        }
        else {
            label.attr({
                x: 0,
                y: -9999 // #10055
            });
        }
        label.placed = !!attrs;
        super.redraw(animation);
    }
    /**
     * All basic shapes don't support alignTo() method except label.
     * For a controllable label, we need to subtract translation from
     * options.
     */
    anchor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _point) {
        const anchor = super.anchor.apply(this, arguments), x = this.options.x || 0, y = this.options.y || 0;
        anchor.absolutePosition.x -= x;
        anchor.absolutePosition.y -= y;
        anchor.relativePosition.x -= x;
        anchor.relativePosition.y -= y;
        return anchor;
    }
    /**
     * Returns the label position relative to its anchor.
     */
    position(anchor) {
        const item = this.graphic, chart = this.annotation.chart, tooltip = chart.tooltip, point = this.points[0], itemOptions = this.options, anchorAbsolutePosition = anchor.absolutePosition, anchorRelativePosition = anchor.relativePosition;
        let itemPosition, alignTo, itemPosRelativeX, itemPosRelativeY, showItem = point.series.visible &&
            Annotations_MockPoint.prototype.isInsidePlot.call(point);
        if (item && showItem) {
            const { width = 0, height = 0 } = item;
            if (itemOptions.distance && tooltip) {
                itemPosition = tooltip.getPosition.call({
                    chart,
                    distance: ControllableLabel_pick(itemOptions.distance, 16),
                    getPlayingField: tooltip.getPlayingField,
                    pointer: tooltip.pointer
                }, width, height, {
                    plotX: anchorRelativePosition.x,
                    plotY: anchorRelativePosition.y,
                    negative: point.negative,
                    ttBelow: point.ttBelow,
                    h: (anchorRelativePosition.height ||
                        anchorRelativePosition.width)
                });
            }
            else if (itemOptions.positioner) {
                itemPosition = itemOptions.positioner.call(this);
            }
            else {
                alignTo = {
                    x: anchorAbsolutePosition.x,
                    y: anchorAbsolutePosition.y,
                    width: 0,
                    height: 0
                };
                itemPosition = ControllableLabel.alignedPosition(ControllableLabel_extend(itemOptions, {
                    width,
                    height
                }), alignTo);
                if (this.options.overflow === 'justify') {
                    itemPosition = ControllableLabel.alignedPosition(ControllableLabel.justifiedOptions(chart, item, itemOptions, itemPosition), alignTo);
                }
            }
            if (itemOptions.crop) {
                itemPosRelativeX = itemPosition.x - chart.plotLeft;
                itemPosRelativeY = itemPosition.y - chart.plotTop;
                showItem =
                    chart.isInsidePlot(itemPosRelativeX, itemPosRelativeY) &&
                        chart.isInsidePlot(itemPosRelativeX + width, itemPosRelativeY + height);
            }
        }
        return showItem ? itemPosition : null;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @type {Highcharts.Dictionary<string>}
 */
ControllableLabel.attrsMap = {
    backgroundColor: 'fill',
    borderColor: 'stroke',
    borderWidth: 'stroke-width',
    zIndex: 'zIndex',
    borderRadius: 'r',
    padding: 'padding'
};
/**
 * Shapes which do not have background - the object is used for proper
 * setting of the contrast color.
 *
 * @type {Array<string>}
 */
ControllableLabel.shapesWithoutBackground = ['connector'];
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllableLabel = (ControllableLabel);

;// ./code/es-modules/Extensions/Annotations/Controllables/ControllableImage.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



/* *
 *
 *  Class
 *
 * */
/**
 * A controllable image class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableImage
 *
 * @param {Highcharts.Annotation} annotation
 * An annotation instance.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A controllable's options.
 *
 * @param {number} index
 * Index of the image.
 */
class ControllableImage extends Controllables_Controllable {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'image';
        this.translate = super.translateShape;
    }
    render(parent) {
        const attrs = this.attrsFromOptions(this.options), options = this.options;
        this.graphic = this.annotation.chart.renderer
            .image(options.src, 0, -9e9, options.width, options.height)
            .attr(attrs)
            .add(parent);
        this.graphic.width = options.width;
        this.graphic.height = options.height;
        super.render();
    }
    redraw(animation) {
        if (this.graphic) {
            const anchor = this.anchor(this.points[0]), position = Controllables_ControllableLabel.prototype.position.call(this, anchor);
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y
                });
            }
            else {
                this.graphic.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = Boolean(position);
        }
        super.redraw(animation);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @name Highcharts.AnnotationControllableImage.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllableImage.attrsMap = {
    width: 'width',
    height: 'height',
    zIndex: 'zIndex'
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Controllables_ControllableImage = (ControllableImage);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","AST"],"commonjs":["highcharts","AST"],"commonjs2":["highcharts","AST"],"root":["Highcharts","AST"]}
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_ = __webpack_require__(660);
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default = /*#__PURE__*/__webpack_require__.n(highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_);
;// ./code/es-modules/Shared/BaseForm.js
/* *
 *
 *  (c) 2009-2024 Highsoft AS
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


const { addEvent: BaseForm_addEvent, createElement } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentDiv, iconsURL) {
        this.iconsURL = iconsURL;
        this.container = this.createPopupContainer(parentDiv);
        this.closeButton = this.addCloseButton();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create popup div container.
     *
     * @param {HTMLElement} parentDiv
     * Parent div to attach popup.
     *
     * @param  {string} className
     * Class name of the popup.
     *
     * @return {HTMLElement}
     * Popup div.
     */
    createPopupContainer(parentDiv, className = 'highcharts-popup highcharts-no-tooltip') {
        return createElement('div', { className }, void 0, parentDiv);
    }
    /**
     * Create HTML element and attach click event to close popup.
     *
     * @param {string} className
     * Class name of the close button.
     *
     * @return {HTMLElement}
     * Close button.
     */
    addCloseButton(className = 'highcharts-popup-close') {
        const popup = this, iconsURL = this.iconsURL;
        // Create close popup button.
        const closeButton = createElement('button', { className }, void 0, this.container);
        closeButton.style['background-image'] = 'url(' +
            (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                iconsURL : iconsURL + 'close.svg') + ')';
        ['click', 'touchstart'].forEach((eventName) => {
            BaseForm_addEvent(closeButton, eventName, popup.closeButtonEvents.bind(popup));
        });
        // Close popup when press ESC
        BaseForm_addEvent(document, 'keydown', function (event) {
            if (event.code === 'Escape') {
                popup.closeButtonEvents();
            }
        });
        return closeButton;
    }
    /**
     * Close button events.
     * @return {void}
     */
    closeButtonEvents() {
        this.closePopup();
    }
    /**
     * Reset content of the current popup and show.
     *
     * @param {string} toolbarClass
     * Class name of the toolbar which styles should be reset.
     */
    showPopup(toolbarClass = 'highcharts-annotation-toolbar') {
        const popupDiv = this.container, popupCloseButton = this.closeButton;
        this.type = void 0;
        // Reset content.
        popupDiv.innerHTML = (highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default()).emptyHTML;
        // Reset toolbar styles if exists.
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);
            // Reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }
        // Add close button.
        popupDiv.appendChild(popupCloseButton);
        popupDiv.style.display = 'block';
        popupDiv.style.height = '';
    }
    /**
     * Hide popup.
     */
    closePopup() {
        this.container.style.display = 'none';
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Shared_BaseForm = (BaseForm);

;// ./code/es-modules/Extensions/Annotations/Popup/PopupAnnotations.js
/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { doc: PopupAnnotations_doc, isFirefox } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { createElement: PopupAnnotations_createElement, isArray, isObject, objectEach: PopupAnnotations_objectEach, pick: PopupAnnotations_pick, stableSort } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Create annotation simple form.
 * It contains fields with param names.
 * @private
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {Object} options
 * Options
 * @param {Function} callback
 * On click callback
 * @param {boolean} [isInit]
 * If it is a form declared for init annotation
 */
function addForm(chart, options, callback, isInit) {
    if (!chart) {
        return;
    }
    const popupDiv = this.container, lang = this.lang;
    // Create title of annotations
    let lhsCol = PopupAnnotations_createElement('h2', {
        className: 'highcharts-popup-main-title'
    }, void 0, popupDiv);
    lhsCol.appendChild(PopupAnnotations_doc.createTextNode(lang[options.langKey] || options.langKey || ''));
    // Left column
    lhsCol = PopupAnnotations_createElement('div', {
        className: ('highcharts-popup-lhs-col highcharts-popup-lhs-full')
    }, void 0, popupDiv);
    const bottomRow = PopupAnnotations_createElement('div', {
        className: 'highcharts-popup-bottom-row'
    }, void 0, popupDiv);
    addFormFields.call(this, lhsCol, chart, '', options, [], true);
    this.addButton(bottomRow, isInit ?
        (lang.addButton || 'Add') :
        (lang.saveButton || 'Save'), isInit ? 'add' : 'save', popupDiv, callback);
}
/**
 * Create annotation simple form. It contains two buttons
 * (edit / remove) and text label.
 * @private
 * @param {Highcharts.Chart} - chart
 * @param {Highcharts.AnnotationsOptions} - options
 * @param {Function} - on click callback
 */
function addToolbar(chart, options, callback) {
    const lang = this.lang, popupDiv = this.container, showForm = this.showForm, toolbarClass = 'highcharts-annotation-toolbar';
    // Set small size
    if (popupDiv.className.indexOf(toolbarClass) === -1) {
        popupDiv.className += ' ' + toolbarClass + ' highcharts-no-mousewheel';
    }
    // Set position
    if (chart) {
        popupDiv.style.top = chart.plotTop + 10 + 'px';
    }
    // Create label
    const label = PopupAnnotations_createElement('p', {
        className: 'highcharts-annotation-label'
    }, void 0, popupDiv);
    label.setAttribute('aria-label', 'Annotation type');
    label.appendChild(PopupAnnotations_doc.createTextNode(PopupAnnotations_pick(
    // Advanced annotations:
    lang[options.langKey] || options.langKey, 
    // Basic shapes:
    options.shapes && options.shapes[0].type, '')));
    // Add buttons
    let button = this.addButton(popupDiv, lang.editButton || 'Edit', 'edit', popupDiv, () => {
        showForm.call(this, 'annotation-edit', chart, options, callback);
    });
    button.className += ' highcharts-annotation-edit-button';
    button.style['background-image'] = 'url(' +
        this.iconsURL + 'edit.svg)';
    button = this.addButton(popupDiv, lang.removeButton || 'Remove', 'remove', popupDiv, callback);
    button.className += ' highcharts-annotation-remove-button';
    button.style['background-image'] = 'url(' +
        this.iconsURL + 'destroy.svg)';
}
/**
 * Create annotation's form fields.
 * @private
 * @param {Highcharts.HTMLDOMElement} parentDiv
 * Div where inputs are placed
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {string} parentNode
 * Name of parent to create chain of names
 * @param {Highcharts.AnnotationsOptions} options
 * Options
 * @param {Array<unknown>} storage
 * Array where all items are stored
 * @param {boolean} [isRoot]
 * Recursive flag for root
 */
function addFormFields(parentDiv, chart, parentNode, options, storage, isRoot) {
    if (!chart) {
        return;
    }
    const addInput = this.addInput, lang = this.lang;
    let parentFullName, titleName;
    PopupAnnotations_objectEach(options, (value, option) => {
        // Create name like params.styles.fontSize
        parentFullName = parentNode !== '' ? parentNode + '.' + option : option;
        if (isObject(value)) {
            if (
            // Value is object of options
            !isArray(value) ||
                // Array of objects with params. i.e labels in Fibonacci
                (isArray(value) && isObject(value[0]))) {
                titleName = lang[option] || option;
                if (!titleName.match(/\d/g)) {
                    storage.push([
                        true,
                        titleName,
                        parentDiv
                    ]);
                }
                addFormFields.call(this, parentDiv, chart, parentFullName, value, storage, false);
            }
            else {
                storage.push([
                    this,
                    parentFullName,
                    'annotation',
                    parentDiv,
                    value
                ]);
            }
        }
    });
    if (isRoot) {
        stableSort(storage, (a) => (a[1].match(/format/g) ? -1 : 1));
        if (isFirefox) {
            storage.reverse(); // (#14691)
        }
        storage.forEach((genInput) => {
            if (genInput[0] === true) {
                PopupAnnotations_createElement('span', {
                    className: 'highcharts-annotation-title'
                }, void 0, genInput[2]).appendChild(PopupAnnotations_doc.createTextNode(genInput[1]));
            }
            else {
                genInput[4] = {
                    value: genInput[4][0],
                    type: genInput[4][1]
                };
                addInput.apply(genInput[0], genInput.splice(1));
            }
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PopupAnnotations = {
    addForm,
    addToolbar
};
/* harmony default export */ const Popup_PopupAnnotations = (PopupAnnotations);

;// ./code/es-modules/Extensions/Annotations/Popup/PopupIndicators.js
/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { doc: PopupIndicators_doc } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { seriesTypes } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { addEvent: PopupIndicators_addEvent, createElement: PopupIndicators_createElement, defined: PopupIndicators_defined, isArray: PopupIndicators_isArray, isObject: PopupIndicators_isObject, objectEach: PopupIndicators_objectEach, stableSort: PopupIndicators_stableSort } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Enums
 *
 * */
/**
 * Enum for properties which should have dropdown list.
 * @private
 */
var DropdownProperties;
(function (DropdownProperties) {
    DropdownProperties[DropdownProperties["params.algorithm"] = 0] = "params.algorithm";
    DropdownProperties[DropdownProperties["params.average"] = 1] = "params.average";
})(DropdownProperties || (DropdownProperties = {}));
/**
 * List of available algorithms for the specific indicator.
 * @private
 */
const dropdownParameters = {
    'algorithm-pivotpoints': ['standard', 'fibonacci', 'camarilla'],
    'average-disparityindex': ['sma', 'ema', 'dema', 'tema', 'wma']
};
/* *
 *
 *  Functions
 *
 * */
/**
 * Create two columns (divs) in HTML.
 * @private
 * @param {Highcharts.HTMLDOMElement} container
 * Container of columns
 * @return {Highcharts.Dictionary<Highcharts.HTMLDOMElement>}
 * Reference to two HTML columns (lhsCol, rhsCol)
 */
function addColsContainer(container) {
    // Left column
    const lhsCol = PopupIndicators_createElement('div', {
        className: 'highcharts-popup-lhs-col'
    }, void 0, container);
    // Right column
    const rhsCol = PopupIndicators_createElement('div', {
        className: 'highcharts-popup-rhs-col'
    }, void 0, container);
    // Wrapper content
    PopupIndicators_createElement('div', {
        className: 'highcharts-popup-rhs-col-wrapper'
    }, void 0, rhsCol);
    return {
        lhsCol: lhsCol,
        rhsCol: rhsCol
    };
}
/**
 * Create indicator's form. It contains two tabs (ADD and EDIT) with
 * content.
 * @private
 */
function PopupIndicators_addForm(chart, _options, callback) {
    const lang = this.lang;
    let buttonParentDiv;
    if (!chart) {
        return;
    }
    // Add tabs
    this.tabs.init.call(this, chart);
    // Get all tabs content divs
    const tabsContainers = this.container
        .querySelectorAll('.highcharts-tab-item-content');
    // ADD tab
    addColsContainer(tabsContainers[0]);
    addSearchBox.call(this, chart, tabsContainers[0]);
    addIndicatorList.call(this, chart, tabsContainers[0], 'add');
    buttonParentDiv = tabsContainers[0]
        .querySelectorAll('.highcharts-popup-rhs-col')[0];
    this.addButton(buttonParentDiv, lang.addButton || 'add', 'add', buttonParentDiv, callback);
    // EDIT tab
    addColsContainer(tabsContainers[1]);
    addIndicatorList.call(this, chart, tabsContainers[1], 'edit');
    buttonParentDiv = tabsContainers[1]
        .querySelectorAll('.highcharts-popup-rhs-col')[0];
    this.addButton(buttonParentDiv, lang.saveButton || 'save', 'edit', buttonParentDiv, callback);
    this.addButton(buttonParentDiv, lang.removeButton || 'remove', 'remove', buttonParentDiv, callback);
}
/**
 * Create typical inputs for chosen indicator. Fields are extracted from
 * defaultOptions (ADD mode) or current indicator (ADD mode). Two extra
 * fields are added:
 * - hidden input - contains indicator type (required for callback)
 * - select - list of series which can be linked with indicator
 * @private
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {Highcharts.Series} series
 * Indicator
 * @param {string} seriesType
 * Indicator type like: sma, ema, etc.
 * @param {Highcharts.HTMLDOMElement} rhsColWrapper
 * Element where created HTML list is added
 */
function PopupIndicators_addFormFields(chart, series, seriesType, rhsColWrapper) {
    const fields = series.params || series.options.params;
    // Reset current content
    rhsColWrapper.innerHTML = (highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default()).emptyHTML;
    // Create title (indicator name in the right column)
    PopupIndicators_createElement('h3', {
        className: 'highcharts-indicator-title'
    }, void 0, rhsColWrapper).appendChild(PopupIndicators_doc.createTextNode(getNameType(series, seriesType).indicatorFullName));
    // Input type
    PopupIndicators_createElement('input', {
        type: 'hidden',
        name: 'highcharts-type-' + seriesType,
        value: seriesType
    }, void 0, rhsColWrapper);
    // List all series with id
    listAllSeries.call(this, seriesType, 'series', chart, rhsColWrapper, series, series.linkedParent && series.linkedParent.options.id);
    if (fields.volumeSeriesID) {
        listAllSeries.call(this, seriesType, 'volume', chart, rhsColWrapper, series, series.linkedParent && fields.volumeSeriesID);
    }
    // Add param fields
    addParamInputs.call(this, chart, 'params', fields, seriesType, rhsColWrapper);
}
/**
 * Create HTML list of all indicators (ADD mode) or added indicators
 * (EDIT mode).
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {HTMLDOMElement} [parentDiv]
 *        HTML parent element.
 *
 * @param {string} listType
 *        Type of list depending on the selected bookmark.
 *        Might be 'add' or 'edit'.
 *
 * @param {string|undefined} filter
 *        Applied filter string from the input.
 *        For the first iteration, it's an empty string.
 */
function addIndicatorList(chart, parentDiv, listType, filter) {
    /**
     *
     */
    function selectIndicator(series, indicatorType) {
        const button = rhsColWrapper.parentNode
            .children[1];
        PopupIndicators_addFormFields.call(popup, chart, series, indicatorType, rhsColWrapper);
        if (button) {
            button.style.display = 'block';
        }
        // Add hidden input with series.id
        if (isEdit && series.options) {
            PopupIndicators_createElement('input', {
                type: 'hidden',
                name: 'highcharts-id-' + indicatorType,
                value: series.options.id
            }, void 0, rhsColWrapper).setAttribute('highcharts-data-series-id', series.options.id);
        }
    }
    const popup = this, lang = popup.lang, lhsCol = parentDiv.querySelectorAll('.highcharts-popup-lhs-col')[0], rhsCol = parentDiv.querySelectorAll('.highcharts-popup-rhs-col')[0], isEdit = listType === 'edit', series = (isEdit ?
        chart.series : // EDIT mode
        chart.options.plotOptions || {} // ADD mode
    );
    if (!chart && series) {
        return;
    }
    let item, filteredSeriesArray = [];
    // Filter and sort the series.
    if (!isEdit && !PopupIndicators_isArray(series)) {
        // Apply filters only for the 'add' indicator list.
        filteredSeriesArray = filterSeries.call(this, series, filter);
    }
    else if (PopupIndicators_isArray(series)) {
        filteredSeriesArray = filterSeriesArray.call(this, series);
    }
    // Sort indicators alphabetically.
    PopupIndicators_stableSort(filteredSeriesArray, (a, b) => {
        const seriesAName = a.indicatorFullName.toLowerCase(), seriesBName = b.indicatorFullName.toLowerCase();
        return (seriesAName < seriesBName) ?
            -1 : (seriesAName > seriesBName) ? 1 : 0;
    });
    // If the list exists remove it from the DOM
    // in order to create a new one with different filters.
    if (lhsCol.children[1]) {
        lhsCol.children[1].remove();
    }
    // Create wrapper for list.
    const indicatorList = PopupIndicators_createElement('ul', {
        className: 'highcharts-indicator-list'
    }, void 0, lhsCol);
    const rhsColWrapper = rhsCol.querySelectorAll('.highcharts-popup-rhs-col-wrapper')[0];
    filteredSeriesArray.forEach((seriesSet) => {
        const { indicatorFullName, indicatorType, series } = seriesSet;
        item = PopupIndicators_createElement('li', {
            className: 'highcharts-indicator-list'
        }, void 0, indicatorList);
        const btn = PopupIndicators_createElement('button', {
            className: 'highcharts-indicator-list-item',
            textContent: indicatorFullName
        }, void 0, item);
        ['click', 'touchstart'].forEach((eventName) => {
            PopupIndicators_addEvent(btn, eventName, function () {
                selectIndicator(series, indicatorType);
            });
        });
    });
    // Select first item from the list
    if (filteredSeriesArray.length > 0) {
        const { series, indicatorType } = filteredSeriesArray[0];
        selectIndicator(series, indicatorType);
    }
    else if (!isEdit) {
        highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(rhsColWrapper.parentNode.children[0], lang.noFilterMatch || '');
        rhsColWrapper.parentNode.children[1]
            .style.display = 'none';
    }
}
/**
 * Recurrent function which lists all fields, from params object and
 * create them as inputs. Each input has unique `data-name` attribute,
 * which keeps chain of fields i.e params.styles.fontSize.
 * @private
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {string} parentNode
 * Name of parent to create chain of names
 * @param {Highcharts.PopupFieldsDictionary<string>} fields
 * Params which are based for input create
 * @param {string} type
 * Indicator type like: sma, ema, etc.
 * @param {Highcharts.HTMLDOMElement} parentDiv
 * Element where created HTML list is added
 */
function addParamInputs(chart, parentNode, fields, type, parentDiv) {
    if (!chart) {
        return;
    }
    const addInput = this.addInput;
    PopupIndicators_objectEach(fields, (value, fieldName) => {
        // Create name like params.styles.fontSize
        const parentFullName = parentNode + '.' + fieldName;
        if (PopupIndicators_defined(value) && // Skip if field is unnecessary, #15362
            parentFullName) {
            if (PopupIndicators_isObject(value)) {
                // (15733) 'Periods' has an arrayed value. Label must be
                // created here.
                addInput.call(this, parentFullName, type, parentDiv, {});
                addParamInputs.call(this, chart, parentFullName, value, type, parentDiv);
            }
            // If the option is listed in dropdown enum,
            // add the selection box for it.
            if (parentFullName in DropdownProperties) {
                // Add selection boxes.
                const selectBox = addSelection.call(this, type, parentFullName, parentDiv);
                // Add possible dropdown options.
                addSelectionOptions.call(this, chart, parentNode, selectBox, type, fieldName, value);
            }
            else if (
            // Skip volume field which is created by addFormFields.
            parentFullName !== 'params.volumeSeriesID' &&
                !PopupIndicators_isArray(value) // Skip params declared in array.
            ) {
                addInput.call(this, parentFullName, type, parentDiv, {
                    value: value,
                    type: 'number'
                } // All inputs are text type
                );
            }
        }
    });
}
/**
 * Add searchbox HTML element and its' label.
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {HTMLDOMElement} parentDiv
 *        HTML parent element.
 */
function addSearchBox(chart, parentDiv) {
    const popup = this, lhsCol = parentDiv.querySelectorAll('.highcharts-popup-lhs-col')[0], options = 'searchIndicators', inputAttributes = {
        value: '',
        type: 'text',
        htmlFor: 'search-indicators',
        labelClassName: 'highcharts-input-search-indicators-label'
    }, clearFilterText = this.lang.clearFilter, inputWrapper = PopupIndicators_createElement('div', {
        className: 'highcharts-input-wrapper'
    }, void 0, lhsCol);
    const handleInputChange = function (inputText) {
        // Apply some filters.
        addIndicatorList.call(popup, chart, popup.container, 'add', inputText);
    };
    // Add input field with the label and button.
    const input = this.addInput(options, 'input', inputWrapper, inputAttributes), button = PopupIndicators_createElement('a', {
        textContent: clearFilterText
    }, void 0, inputWrapper);
    input.classList.add('highcharts-input-search-indicators');
    button.classList.add('clear-filter-button');
    // Add input change events.
    PopupIndicators_addEvent(input, 'input', function () {
        handleInputChange(this.value);
        // Show clear filter button.
        if (this.value.length) {
            button.style.display = 'inline-block';
        }
        else {
            button.style.display = 'none';
        }
    });
    // Add clear filter click event.
    ['click', 'touchstart'].forEach((eventName) => {
        PopupIndicators_addEvent(button, eventName, function () {
            // Clear the input.
            input.value = '';
            handleInputChange('');
            // Hide clear filter button- no longer necessary.
            button.style.display = 'none';
        });
    });
}
/**
 * Add selection HTML element and its' label.
 *
 * @private
 *
 * @param {string} indicatorType
 * Type of the indicator i.e. sma, ema...
 *
 * @param {string} [optionName]
 * Name of the option into which selection is being added.
 *
 * @param {HTMLDOMElement} [parentDiv]
 * HTML parent element.
 */
function addSelection(indicatorType, optionName, parentDiv) {
    const optionParamList = optionName.split('.'), labelText = optionParamList[optionParamList.length - 1], selectName = 'highcharts-' + optionName + '-type-' + indicatorType, lang = this.lang;
    // Add a label for the selection box.
    PopupIndicators_createElement('label', {
        htmlFor: selectName
    }, null, parentDiv).appendChild(PopupIndicators_doc.createTextNode(lang[labelText] || optionName));
    // Create a selection box.
    const selectBox = PopupIndicators_createElement('select', {
        name: selectName,
        className: 'highcharts-popup-field',
        id: 'highcharts-select-' + optionName
    }, null, parentDiv);
    selectBox.setAttribute('id', 'highcharts-select-' + optionName);
    return selectBox;
}
/**
 * Get and add selection options.
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {HTMLSelectElement} [selectBox]
 *        HTML select box element to which the options are being added.
 *
 * @param {string|undefined} indicatorType
 *        Type of the indicator i.e. sma, ema...
 *
 * @param {string|undefined} parameterName
 *        Name of the parameter which should be applied.
 *
 * @param {string|undefined} selectedOption
 *        Default value in dropdown.
 */
function addSelectionOptions(chart, optionName, selectBox, indicatorType, parameterName, selectedOption, currentSeries) {
    // Get and apply selection options for the possible series.
    if (optionName === 'series' || optionName === 'volume') {
        // List all series which have id - mandatory for indicator.
        chart.series.forEach((series) => {
            const seriesOptions = series.options, seriesName = seriesOptions.name ||
                seriesOptions.params ?
                series.name :
                seriesOptions.id || '';
            if (seriesOptions.id !== 'highcharts-navigator-series' &&
                seriesOptions.id !== (currentSeries &&
                    currentSeries.options &&
                    currentSeries.options.id)) {
                if (!PopupIndicators_defined(selectedOption) &&
                    optionName === 'volume' &&
                    series.type === 'column') {
                    selectedOption = seriesOptions.id;
                }
                PopupIndicators_createElement('option', {
                    value: seriesOptions.id
                }, void 0, selectBox).appendChild(PopupIndicators_doc.createTextNode(seriesName));
            }
        });
    }
    else if (indicatorType && parameterName) {
        // Get and apply options for the possible parameters.
        const dropdownKey = parameterName + '-' + indicatorType, parameterOption = dropdownParameters[dropdownKey];
        parameterOption.forEach((element) => {
            PopupIndicators_createElement('option', {
                value: element
            }, void 0, selectBox).appendChild(PopupIndicators_doc.createTextNode(element));
        });
    }
    // Add the default dropdown value if defined.
    if (PopupIndicators_defined(selectedOption)) {
        selectBox.value = selectedOption;
    }
}
/**
 * Filter object of series which are not indicators.
 * If the filter string exists, check against it.
 *
 * @private
 *
 * @param {Highcharts.FilteredSeries} series
 *        All series are available in the plotOptions.
 *
 * @param {string|undefined} filter
 *        Applied filter string from the input.
 *        For the first iteration, it's an empty string.
 *
 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
 *         Returns array of filtered series based on filter string.
 */
function filterSeries(series, filter) {
    const popup = this, lang = popup.chart && popup.chart.options.lang, indicatorAliases = lang &&
        lang.navigation &&
        lang.navigation.popup &&
        lang.navigation.popup.indicatorAliases, filteredSeriesArray = [];
    let filteredSeries;
    PopupIndicators_objectEach(series, (series, value) => {
        const seriesOptions = series && series.options;
        // Allow only indicators.
        if (series.params || seriesOptions &&
            seriesOptions.params) {
            const { indicatorFullName, indicatorType } = getNameType(series, value);
            if (filter) {
                // Replace invalid characters.
                const validFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(validFilter, 'i'), alias = indicatorAliases &&
                    indicatorAliases[indicatorType] &&
                    indicatorAliases[indicatorType].join(' ') || '';
                if (indicatorFullName.match(regex) ||
                    alias.match(regex)) {
                    filteredSeries = {
                        indicatorFullName,
                        indicatorType,
                        series: series
                    };
                    filteredSeriesArray.push(filteredSeries);
                }
            }
            else {
                filteredSeries = {
                    indicatorFullName,
                    indicatorType,
                    series: series
                };
                filteredSeriesArray.push(filteredSeries);
            }
        }
    });
    return filteredSeriesArray;
}
/**
 * Filter an array of series and map its names and types.
 *
 * @private
 *
 * @param {Highcharts.FilteredSeries} series
 *        All series that are available in the plotOptions.
 *
 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
 *         Returns array of filtered series based on filter string.
 */
function filterSeriesArray(series) {
    const filteredSeriesArray = [];
    // Allow only indicators.
    series.forEach((series) => {
        if (series.is('sma')) {
            filteredSeriesArray.push({
                indicatorFullName: series.name,
                indicatorType: series.type,
                series: series
            });
        }
    });
    return filteredSeriesArray;
}
/**
 * Get amount of indicators added to chart.
 * @private
 * @return {number} - Amount of indicators
 */
function getAmount() {
    let counter = 0;
    this.series.forEach((serie) => {
        if (serie.params ||
            serie.options.params) {
            counter++;
        }
    });
    return counter;
}
/**
 * Extract full name and type of requested indicator.
 *
 * @private
 *
 * @param {Highcharts.Series} series
 * Series which name is needed(EDITmode - defaultOptions.series,
 * ADDmode - indicator series).
 *
 * @param {string} [indicatorType]
 * Type of the indicator i.e. sma, ema...
 *
 * @return {Highcharts.Dictionary<string>}
 * Full name and series type.
 */
function getNameType(series, indicatorType) {
    const options = series.options;
    // Add mode
    let seriesName = (seriesTypes[indicatorType] &&
        seriesTypes[indicatorType].prototype.nameBase) ||
        indicatorType.toUpperCase(), seriesType = indicatorType;
    // Edit
    if (options && options.type) {
        seriesType = series.options.type;
        seriesName = series.name;
    }
    return {
        indicatorFullName: seriesName,
        indicatorType: seriesType
    };
}
/**
 * Create the selection box for the series,
 * add options and apply the default one.
 *
 * @private
 *
 * @param {string} indicatorType
 *        Type of the indicator i.e. sma, ema...
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {HTMLDOMElement} [parentDiv]
 *        HTML parent element.
 *
 * @param {string|undefined} selectedOption
 *        Default value in dropdown.
 */
function listAllSeries(indicatorType, optionName, chart, parentDiv, currentSeries, selectedOption) {
    const popup = this;
    // Won't work without the chart.
    if (!chart) {
        return;
    }
    // Add selection boxes.
    const selectBox = addSelection.call(popup, indicatorType, optionName, parentDiv);
    // Add possible dropdown options.
    addSelectionOptions.call(popup, chart, optionName, selectBox, void 0, void 0, void 0, currentSeries);
    // Add the default dropdown value if defined.
    if (PopupIndicators_defined(selectedOption)) {
        selectBox.value = selectedOption;
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PopupIndicators = {
    addForm: PopupIndicators_addForm,
    getAmount
};
/* harmony default export */ const Popup_PopupIndicators = (PopupIndicators);

;// ./code/es-modules/Extensions/Annotations/Popup/PopupTabs.js
/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { doc: PopupTabs_doc } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent: PopupTabs_addEvent, createElement: PopupTabs_createElement } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Create tab content
 * @private
 * @return {HTMLDOMElement} - created HTML tab-content element
 */
function addContentItem() {
    const popupDiv = this.container;
    return PopupTabs_createElement('div', {
        // #12100
        className: 'highcharts-tab-item-content highcharts-no-mousewheel'
    }, void 0, popupDiv);
}
/**
 * Create tab menu item
 * @private
 * @param {string} tabName
 * `add` or `edit`
 * @param {number} [disableTab]
 * Disable tab when 0
 * @return {Highcharts.HTMLDOMElement}
 * Created HTML tab-menu element
 */
function addMenuItem(tabName, disableTab) {
    const popupDiv = this.container, lang = this.lang;
    let className = 'highcharts-tab-item';
    if (disableTab === 0) {
        className += ' highcharts-tab-disabled';
    }
    // Tab 1
    const menuItem = PopupTabs_createElement('button', {
        className
    }, void 0, popupDiv);
    menuItem.appendChild(PopupTabs_doc.createTextNode(lang[tabName + 'Button'] || tabName));
    menuItem.setAttribute('highcharts-data-tab-type', tabName);
    return menuItem;
}
/**
 * Set all tabs as invisible.
 * @private
 */
function deselectAll() {
    const popupDiv = this.container, tabs = popupDiv
        .querySelectorAll('.highcharts-tab-item'), tabsContent = popupDiv
        .querySelectorAll('.highcharts-tab-item-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('highcharts-tab-item-active');
        tabsContent[i].classList.remove('highcharts-tab-item-show');
    }
}
/**
 * Init tabs. Create tab menu items, tabs containers
 * @private
 * @param {Highcharts.Chart} chart
 * Reference to current chart
 */
function init(chart) {
    if (!chart) {
        return;
    }
    const indicatorsCount = this.indicators.getAmount.call(chart);
    // Create menu items
    const firstTab = addMenuItem.call(this, 'add'); // Run by default
    addMenuItem.call(this, 'edit', indicatorsCount);
    // Create tabs containers
    addContentItem.call(this);
    addContentItem.call(this);
    switchTabs.call(this, indicatorsCount);
    // Activate first tab
    selectTab.call(this, firstTab, 0);
}
/**
 * Set tab as visible
 * @private
 * @param {globals.Element} - current tab
 * @param {number} - Index of tab in menu
 */
function selectTab(tab, index) {
    const allTabs = this.container
        .querySelectorAll('.highcharts-tab-item-content');
    tab.className += ' highcharts-tab-item-active';
    allTabs[index].className += ' highcharts-tab-item-show';
}
/**
 * Add click event to each tab
 * @private
 * @param {number} disableTab
 * Disable tab when 0
 */
function switchTabs(disableTab) {
    const popup = this, popupDiv = this.container, tabs = popupDiv.querySelectorAll('.highcharts-tab-item');
    tabs.forEach((tab, i) => {
        if (disableTab === 0 &&
            tab.getAttribute('highcharts-data-tab-type') === 'edit') {
            return;
        }
        ['click', 'touchstart'].forEach((eventName) => {
            PopupTabs_addEvent(tab, eventName, function () {
                // Reset class on other elements
                deselectAll.call(popup);
                selectTab.call(popup, this, i);
            });
        });
    });
}
/* *
 *
 *  Default Export
 *
 * */
const PopupTabs = {
    init
};
/* harmony default export */ const Popup_PopupTabs = (PopupTabs);

;// ./code/es-modules/Extensions/Annotations/Popup/Popup.js
/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { doc: Popup_doc } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { getOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());




const { addEvent: Popup_addEvent, createElement: Popup_createElement, extend: Popup_extend, fireEvent: Popup_fireEvent, pick: Popup_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Get values from all inputs and selections then create JSON.
 *
 * @private
 *
 * @param {Highcharts.HTMLDOMElement} parentDiv
 * The container where inputs and selections are created.
 *
 * @param {string} type
 * Type of the popup bookmark (add|edit|remove).
 */
function getFields(parentDiv, type) {
    const inputList = Array.prototype.slice.call(parentDiv.querySelectorAll('input')), selectList = Array.prototype.slice.call(parentDiv.querySelectorAll('select')), optionSeries = '#highcharts-select-series > option:checked', optionVolume = '#highcharts-select-volume > option:checked', linkedTo = parentDiv.querySelectorAll(optionSeries)[0], volumeTo = parentDiv.querySelectorAll(optionVolume)[0];
    const fieldsOutput = {
        actionType: type,
        linkedTo: linkedTo && linkedTo.getAttribute('value') || '',
        fields: {}
    };
    inputList.forEach((input) => {
        const param = input.getAttribute('highcharts-data-name'), seriesId = input.getAttribute('highcharts-data-series-id');
        // Params
        if (seriesId) {
            fieldsOutput.seriesId = input.value;
        }
        else if (param) {
            fieldsOutput.fields[param] = input.value;
        }
        else {
            // Type like sma / ema
            fieldsOutput.type = input.value;
        }
    });
    selectList.forEach((select) => {
        const id = select.id;
        // Get inputs only for the parameters, not for series and volume.
        if (id !== 'highcharts-select-series' &&
            id !== 'highcharts-select-volume') {
            const parameter = id.split('highcharts-select-')[1];
            fieldsOutput.fields[parameter] = select.value;
        }
    });
    if (volumeTo) {
        fieldsOutput.fields['params.volumeSeriesID'] = volumeTo
            .getAttribute('value') || '';
    }
    return fieldsOutput;
}
/* *
 *
 *  Class
 *
 * */
class Popup extends Shared_BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentDiv, iconsURL, chart) {
        super(parentDiv, iconsURL);
        this.chart = chart;
        this.lang = (getOptions().lang.navigation || {}).popup || {};
        Popup_addEvent(this.container, 'mousedown', () => {
            const activeAnnotation = chart &&
                chart.navigationBindings &&
                chart.navigationBindings.activeAnnotation;
            if (activeAnnotation) {
                activeAnnotation.cancelClick = true;
                const unbind = Popup_addEvent(Popup_doc, 'click', () => {
                    setTimeout(() => {
                        activeAnnotation.cancelClick = false;
                    }, 0);
                    unbind();
                });
            }
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create input with label.
     *
     * @private
     *
     * @param {string} option
     *        Chain of fields i.e params.styles.fontSize separated by the dot.
     *
     * @param {string} indicatorType
     *        Type of the indicator i.e. sma, ema...
     *
     * @param {HTMLDOMElement} parentDiv
     *        HTML parent element.
     *
     * @param {Highcharts.InputAttributes} inputAttributes
     *        Attributes of the input.
     *
     * @return {HTMLInputElement}
     *         Return created input element.
     */
    addInput(option, indicatorType, parentDiv, inputAttributes) {
        const optionParamList = option.split('.'), optionName = optionParamList[optionParamList.length - 1], lang = this.lang, inputName = 'highcharts-' + indicatorType + '-' + Popup_pick(inputAttributes.htmlFor, optionName);
        if (!optionName.match(/^\d+$/)) {
            // Add label
            Popup_createElement('label', {
                htmlFor: inputName,
                className: inputAttributes.labelClassName
            }, void 0, parentDiv).appendChild(Popup_doc.createTextNode(lang[optionName] || optionName));
        }
        // Add input
        const input = Popup_createElement('input', {
            name: inputName,
            value: inputAttributes.value,
            type: inputAttributes.type,
            className: 'highcharts-popup-field'
        }, void 0, parentDiv);
        input.setAttribute('highcharts-data-name', option);
        return input;
    }
    closeButtonEvents() {
        if (this.chart) {
            const navigationBindings = this.chart.navigationBindings;
            Popup_fireEvent(navigationBindings, 'closePopup');
            if (navigationBindings &&
                navigationBindings.selectedButtonElement) {
                Popup_fireEvent(navigationBindings, 'deselectButton', { button: navigationBindings.selectedButtonElement });
            }
        }
        else {
            super.closeButtonEvents();
        }
    }
    /**
     * Create button.
     * @private
     * @param {Highcharts.HTMLDOMElement} parentDiv
     * Container where elements should be added
     * @param {string} label
     * Text placed as button label
     * @param {string} type
     * add | edit | remove
     * @param {Function} callback
     * On click callback
     * @param {Highcharts.HTMLDOMElement} fieldsDiv
     * Container where inputs are generated
     * @return {Highcharts.HTMLDOMElement}
     * HTML button
     */
    addButton(parentDiv, label, type, fieldsDiv, callback) {
        const button = Popup_createElement('button', void 0, void 0, parentDiv);
        button.appendChild(Popup_doc.createTextNode(label));
        if (callback) {
            ['click', 'touchstart'].forEach((eventName) => {
                Popup_addEvent(button, eventName, () => {
                    this.closePopup();
                    return callback(getFields(fieldsDiv, type));
                });
            });
        }
        return button;
    }
    /**
     * Create content and show popup.
     * @private
     * @param {string} - type of popup i.e indicators
     * @param {Highcharts.Chart} - chart
     * @param {Highcharts.AnnotationsOptions} - options
     * @param {Function} - on click callback
     */
    showForm(type, chart, options, callback) {
        if (!chart) {
            return;
        }
        // Show blank popup
        this.showPopup();
        // Indicator form
        if (type === 'indicators') {
            this.indicators.addForm.call(this, chart, options, callback);
        }
        // Annotation small toolbar
        if (type === 'annotation-toolbar') {
            this.annotations.addToolbar.call(this, chart, options, callback);
        }
        // Annotation edit form
        if (type === 'annotation-edit') {
            this.annotations.addForm.call(this, chart, options, callback);
        }
        // Flags form - add / edit
        if (type === 'flag') {
            this.annotations.addForm.call(this, chart, options, callback, true);
        }
        this.type = type;
        // Explicit height is needed to make inner elements scrollable
        this.container.style.height = this.container.offsetHeight + 'px';
    }
}
Popup_extend(Popup.prototype, {
    annotations: Popup_PopupAnnotations,
    indicators: Popup_PopupIndicators,
    tabs: Popup_PopupTabs
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Popup_Popup = (Popup);

;// ./code/es-modules/Extensions/Annotations/Popup/PopupComposition.js
/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { addEvent: PopupComposition_addEvent, pushUnique, wrap: PopupComposition_wrap } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(NagivationBindingsClass, PointerClass) {
    if (pushUnique(composed, 'Popup')) {
        PopupComposition_addEvent(NagivationBindingsClass, 'closePopup', onNavigationBindingsClosePopup);
        PopupComposition_addEvent(NagivationBindingsClass, 'showPopup', onNavigationBindingsShowPopup);
        PopupComposition_wrap(PointerClass.prototype, 'onContainerMouseDown', wrapPointerOnContainerMouserDown);
    }
}
/**
 * @private
 */
function onNavigationBindingsClosePopup() {
    if (this.popup) {
        this.popup.closePopup();
    }
}
/**
 * @private
 */
function onNavigationBindingsShowPopup(config) {
    if (!this.popup) {
        // Add popup to main container
        this.popup = new Popup_Popup(this.chart.container, (this.chart.options.navigation.iconsURL ||
            (this.chart.options.stockTools &&
                this.chart.options.stockTools.gui.iconsURL) ||
            'https://code.highcharts.com/12.1.2/gfx/stock-icons/'), this.chart);
    }
    this.popup.showForm(config.formType, this.chart, config.options, config.onSubmit);
}
/**
 * `onContainerMouseDown` blocks internal popup events, due to e.preventDefault.
 * Related issue #4606
 * @private
 */
function wrapPointerOnContainerMouserDown(proceed, e) {
    // Elements is not in popup
    if (!this.inClass(e.target, 'highcharts-popup')) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PopupComposition = {
    compose
};
/* harmony default export */ const Popup_PopupComposition = (PopupComposition);

;// ./code/es-modules/Extensions/Annotations/Annotation.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { getDeferredAnimation } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());














const { destroyObjectProperties, erase: Annotation_erase, fireEvent: Annotation_fireEvent, merge: Annotation_merge, pick: Annotation_pick, splat } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Hide or show annotation attached to points.
 * @private
 */
function adjustVisibility(item) {
    const label = item.graphic, hasVisiblePoints = item.points.some((point) => (point.series.visible !== false &&
        point.visible !== false));
    if (label) {
        if (!hasVisiblePoints) {
            label.hide();
        }
        else if (label.visibility === 'hidden') {
            label.show();
        }
    }
}
/**
 * @private
 */
function getLabelsAndShapesOptions(baseOptions, newOptions) {
    const mergedOptions = {};
    ['labels', 'shapes'].forEach((name) => {
        const someBaseOptions = baseOptions[name], newOptionsValue = newOptions[name];
        if (someBaseOptions) {
            if (newOptionsValue) {
                mergedOptions[name] = splat(newOptionsValue).map((basicOptions, i) => Annotation_merge(someBaseOptions[i], basicOptions));
            }
            else {
                mergedOptions[name] = baseOptions[name];
            }
        }
    });
    return mergedOptions;
}
/* *
 *
 *  Class
 *
 * */
/**
 * An annotation class which serves as a container for items like labels or
 * shapes. Created items are positioned on the chart either by linking them to
 * existing points or created mock points
 *
 * @requires modules/annotations
 *
 * @class
 * @name Highcharts.Annotation
 *
 * @param {Highcharts.Chart} chart
 *        A chart instance
 * @param {Highcharts.AnnotationsOptions} userOptions
 *        The annotation options
 */
class Annotation extends Annotations_EventEmitter {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static compose(ChartClass, NavigationBindingsClass, PointerClass, SVGRendererClass) {
        Annotations_AnnotationChart.compose(Annotation, ChartClass, PointerClass);
        Controllables_ControllableLabel.compose(SVGRendererClass);
        Controllables_ControllablePath.compose(ChartClass, SVGRendererClass);
        NavigationBindingsClass.compose(Annotation, ChartClass);
        Popup_PopupComposition.compose(NavigationBindingsClass, PointerClass);
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(chart, userOptions) {
        super();
        this.coll = 'annotations';
        /**
         * The chart that the annotation belongs to.
         *
         * @name Highcharts.Annotation#chart
         * @type {Highcharts.Chart}
         */
        this.chart = chart;
        /**
         * The array of points which defines the annotation.
         * @private
         * @name Highcharts.Annotation#points
         * @type {Array<Highcharts.Point>}
         */
        this.points = [];
        /**
         * The array of control points.
         * @private
         * @name Highcharts.Annotation#controlPoints
         * @type {Array<Annotation.ControlPoint>}
         */
        this.controlPoints = [];
        this.coll = 'annotations';
        this.index = -1;
        /**
         * The array of labels which belong to the annotation.
         * @private
         * @name Highcharts.Annotation#labels
         * @type {Array<Highcharts.AnnotationLabelType>}
         */
        this.labels = [];
        /**
         * The array of shapes which belong to the annotation.
         * @private
         * @name Highcharts.Annotation#shapes
         * @type {Array<Highcharts.AnnotationShapeType>}
         */
        this.shapes = [];
        /**
         * The options for the annotations.
         *
         * @name Highcharts.Annotation#options
         * @type {Highcharts.AnnotationsOptions}
         */
        this.options = Annotation_merge(this.defaultOptions, userOptions);
        /**
         * The user options for the annotations.
         *
         * @name Highcharts.Annotation#userOptions
         * @type {Highcharts.AnnotationsOptions}
         */
        this.userOptions = userOptions;
        // Handle labels and shapes - those are arrays
        // Merging does not work with arrays (stores reference)
        const labelsAndShapes = getLabelsAndShapesOptions(this.options, userOptions);
        this.options.labels = labelsAndShapes.labels;
        this.options.shapes = labelsAndShapes.shapes;
        /**
         * The callback that reports to the overlapping-labels module which
         * labels it should account for.
         * @private
         * @name Highcharts.Annotation#labelCollector
         * @type {Function}
         */
        /**
         * The group svg element.
         *
         * @name Highcharts.Annotation#group
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's shapes.
         *
         * @name Highcharts.Annotation#shapesGroup
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's labels.
         *
         * @name Highcharts.Annotation#labelsGroup
         * @type {Highcharts.SVGElement}
         */
        this.init(chart, this.options);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    addClipPaths() {
        this.setClipAxes();
        if (this.clipXAxis &&
            this.clipYAxis &&
            this.options.crop // #15399
        ) {
            this.clipRect = this.chart.renderer.clipRect(this.getClipBox());
        }
    }
    /**
     * @private
     */
    addLabels() {
        const labelsOptions = (this.options.labels || []);
        labelsOptions.forEach((labelOptions, i) => {
            const label = this.initLabel(labelOptions, i);
            Annotation_merge(true, labelsOptions[i], label.options);
        });
    }
    /**
     * @private
     */
    addShapes() {
        const shapes = this.options.shapes || [];
        shapes.forEach((shapeOptions, i) => {
            const shape = this.initShape(shapeOptions, i);
            Annotation_merge(true, shapes[i], shape.options);
        });
    }
    /**
     * Destroy the annotation. This function does not touch the chart
     * that the annotation belongs to (all annotations are kept in
     * the chart.annotations array) - it is recommended to use
     * {@link Highcharts.Chart#removeAnnotation} instead.
     * @private
     */
    destroy() {
        const chart = this.chart, destroyItem = function (item) {
            item.destroy();
        };
        this.labels.forEach(destroyItem);
        this.shapes.forEach(destroyItem);
        this.clipXAxis = null;
        this.clipYAxis = null;
        Annotation_erase(chart.labelCollectors, this.labelCollector);
        super.destroy();
        this.destroyControlTarget();
        destroyObjectProperties(this, chart);
    }
    /**
     * Destroy a single item.
     * @private
     */
    destroyItem(item) {
        // Erase from shapes or labels array
        Annotation_erase(this[item.itemType + 's'], item);
        item.destroy();
    }
    /**
     * @private
     */
    getClipBox() {
        if (this.clipXAxis && this.clipYAxis) {
            return {
                x: this.clipXAxis.left,
                y: this.clipYAxis.top,
                width: this.clipXAxis.width,
                height: this.clipYAxis.height
            };
        }
    }
    /**
     * Initialize the annotation properties.
     * @private
     */
    initProperties(chart, userOptions) {
        this.setOptions(userOptions);
        const labelsAndShapes = getLabelsAndShapesOptions(this.options, userOptions);
        this.options.labels = labelsAndShapes.labels;
        this.options.shapes = labelsAndShapes.shapes;
        this.chart = chart;
        this.points = [];
        this.controlPoints = [];
        this.coll = 'annotations';
        this.userOptions = userOptions;
        this.labels = [];
        this.shapes = [];
    }
    /**
     * Initialize the annotation.
     * @private
     */
    init(_annotationOrChart, _userOptions, index = this.index) {
        const chart = this.chart, animOptions = this.options.animation;
        this.index = index;
        this.linkPoints();
        this.addControlPoints();
        this.addShapes();
        this.addLabels();
        this.setLabelCollector();
        this.animationConfig = getDeferredAnimation(chart, animOptions);
    }
    /**
     * Initialisation of a single label
     * @private
     */
    initLabel(labelOptions, index) {
        const options = Annotation_merge(this.options.labelOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, labelOptions), label = new Controllables_ControllableLabel(this, options, index);
        label.itemType = 'label';
        this.labels.push(label);
        return label;
    }
    /**
     * Initialisation of a single shape
     * @private
     * @param {Object} shapeOptions
     * a config object for a single shape
     * @param {number} index
     * annotation may have many shapes, this is the shape's index saved in
     * shapes.index.
     */
    initShape(shapeOptions, index) {
        const options = Annotation_merge(this.options.shapeOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, shapeOptions), shape = new (Annotation.shapesMap[options.type])(this, options, index);
        shape.itemType = 'shape';
        this.shapes.push(shape);
        return shape;
    }
    /**
     * @private
     */
    redraw(animation) {
        this.linkPoints();
        if (!this.graphic) {
            this.render();
        }
        if (this.clipRect) {
            this.clipRect.animate(this.getClipBox());
        }
        this.redrawItems(this.shapes, animation);
        this.redrawItems(this.labels, animation);
        this.redrawControlPoints(animation);
    }
    /**
     * Redraw a single item.
     * @private
     */
    redrawItem(item, animation) {
        item.linkPoints();
        if (!item.shouldBeDrawn()) {
            this.destroyItem(item);
        }
        else {
            if (!item.graphic) {
                this.renderItem(item);
            }
            item.redraw(Annotation_pick(animation, true) && item.graphic.placed);
            if (item.points.length) {
                adjustVisibility(item);
            }
        }
    }
    /**
     * @private
     */
    redrawItems(items, animation) {
        let i = items.length;
        // Needs a backward loop. Labels/shapes array might be modified due to
        // destruction of the item
        while (i--) {
            this.redrawItem(items[i], animation);
        }
    }
    /**
     * See {@link Highcharts.Chart#removeAnnotation}.
     * @private
     */
    remove() {
        // Let chart.update() remove annotations on demand
        return this.chart.removeAnnotation(this);
    }
    /**
     * @private
     */
    render() {
        const renderer = this.chart.renderer;
        this.graphic = renderer
            .g('annotation')
            .attr({
            opacity: 0,
            zIndex: this.options.zIndex,
            visibility: this.options.visible ?
                'inherit' :
                'hidden'
        })
            .add();
        this.shapesGroup = renderer
            .g('annotation-shapes')
            .add(this.graphic);
        if (this.options.crop) { // #15399
            this.shapesGroup.clip(this.chart.plotBoxClip);
        }
        this.labelsGroup = renderer
            .g('annotation-labels')
            .attr({
            // `hideOverlappingLabels` requires translation
            translateX: 0,
            translateY: 0
        })
            .add(this.graphic);
        this.addClipPaths();
        if (this.clipRect) {
            this.graphic.clip(this.clipRect);
        }
        // Render shapes and labels before adding events (#13070).
        this.renderItems(this.shapes);
        this.renderItems(this.labels);
        this.addEvents();
        this.renderControlPoints();
    }
    /**
     * @private
     */
    renderItem(item) {
        item.render(item.itemType === 'label' ?
            this.labelsGroup :
            this.shapesGroup);
    }
    /**
     * @private
     */
    renderItems(items) {
        let i = items.length;
        while (i--) {
            this.renderItem(items[i]);
        }
    }
    /**
     * @private
     */
    setClipAxes() {
        const xAxes = this.chart.xAxis, yAxes = this.chart.yAxis, linkedAxes = (this.options.labels || [])
            .concat(this.options.shapes || [])
            .reduce((axes, labelOrShape) => {
            const point = labelOrShape &&
                (labelOrShape.point ||
                    (labelOrShape.points && labelOrShape.points[0]));
            return [
                xAxes[point && point.xAxis] || axes[0],
                yAxes[point && point.yAxis] || axes[1]
            ];
        }, []);
        this.clipXAxis = linkedAxes[0];
        this.clipYAxis = linkedAxes[1];
    }
    /**
     * @private
     */
    setControlPointsVisibility(visible) {
        const setItemControlPointsVisibility = function (item) {
            item.setControlPointsVisibility(visible);
        };
        this.controlPoints.forEach((controlPoint) => {
            controlPoint.setVisibility(visible);
        });
        this.shapes.forEach(setItemControlPointsVisibility);
        this.labels.forEach(setItemControlPointsVisibility);
    }
    /**
     * @private
     */
    setLabelCollector() {
        const annotation = this;
        annotation.labelCollector = function () {
            return annotation.labels.reduce(function (labels, label) {
                if (!label.options.allowOverlap) {
                    labels.push(label.graphic);
                }
                return labels;
            }, []);
        };
        annotation.chart.labelCollectors.push(annotation.labelCollector);
    }
    /**
     * Set an annotation options.
     * @private
     * @param {Highcharts.AnnotationsOptions} userOptions
     *        User options for an annotation
     */
    setOptions(userOptions) {
        this.options = Annotation_merge(this.defaultOptions, userOptions);
    }
    /**
     * Set the annotation's visibility.
     * @private
     * @param {boolean} [visible]
     * Whether to show or hide an annotation. If the param is omitted, the
     * annotation's visibility is toggled.
     */
    setVisibility(visible) {
        const options = this.options, navigation = this.chart.navigationBindings, visibility = Annotation_pick(visible, !options.visible);
        this.graphic.attr('visibility', visibility ? 'inherit' : 'hidden');
        if (!visibility) {
            const setItemControlPointsVisibility = function (item) {
                item.setControlPointsVisibility(visibility);
            };
            this.shapes.forEach(setItemControlPointsVisibility);
            this.labels.forEach(setItemControlPointsVisibility);
            if (navigation.activeAnnotation === this &&
                navigation.popup &&
                navigation.popup.type === 'annotation-toolbar') {
                Annotation_fireEvent(navigation, 'closePopup');
            }
        }
        options.visible = visibility;
    }
    /**
     * Updates an annotation.
     *
     * @function Highcharts.Annotation#update
     *
     * @param {Partial<Highcharts.AnnotationsOptions>} userOptions
     *        New user options for the annotation.
     *
     */
    update(userOptions, redraw) {
        const chart = this.chart, labelsAndShapes = getLabelsAndShapesOptions(this.userOptions, userOptions), userOptionsIndex = chart.annotations.indexOf(this), options = Annotation_merge(true, this.userOptions, userOptions);
        options.labels = labelsAndShapes.labels;
        options.shapes = labelsAndShapes.shapes;
        this.destroy();
        this.initProperties(chart, options);
        this.init(chart, options);
        // Update options in chart options, used in exporting (#9767, #21507):
        chart.options.annotations[userOptionsIndex] = this.options;
        this.isUpdating = true;
        if (Annotation_pick(redraw, true)) {
            chart.drawAnnotations();
        }
        Annotation_fireEvent(this, 'afterUpdate');
        this.isUpdating = false;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * @private
 */
Annotation.ControlPoint = Annotations_ControlPoint;
/**
 * @private
 */
Annotation.MockPoint = Annotations_MockPoint;
/**
 * An object uses for mapping between a shape type and a constructor.
 * To add a new shape type extend this object with type name as a key
 * and a constructor as its value.
 *
 * @private
 */
Annotation.shapesMap = {
    'rect': Controllables_ControllableRect,
    'circle': Controllables_ControllableCircle,
    'ellipse': Controllables_ControllableEllipse,
    'path': Controllables_ControllablePath,
    'image': Controllables_ControllableImage
};
/**
 * @private
 */
Annotation.types = {};
Annotation.prototype.defaultOptions = Annotations_AnnotationDefaults;
/**
 * List of events for `annotation.options.events` that should not be
 * added to `annotation.graphic` but to the `annotation`.
 *
 * @private
 * @type {Array<string>}
 */
Annotation.prototype.nonDOMEvents = ['add', 'afterUpdate', 'drag', 'remove'];
Annotations_ControlTarget.compose(Annotation);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_Annotation = (Annotation);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Possible directions for draggable annotations. An empty string (`''`)
 * makes the annotation undraggable.
 *
 * @typedef {''|'x'|'xy'|'y'} Highcharts.AnnotationDraggableValue
 * @requires modules/annotations
 */
/**
 * @private
 * @typedef {
 *          Highcharts.AnnotationControllableCircle|
 *          Highcharts.AnnotationControllableImage|
 *          Highcharts.AnnotationControllablePath|
 *          Highcharts.AnnotationControllableRect
 *     } Highcharts.AnnotationShapeType
 * @requires modules/annotations
 */
/**
 * @private
 * @typedef {
 *          Highcharts.AnnotationControllableLabel
 *     } Highcharts.AnnotationLabelType
 * @requires modules/annotations
 */
/**
 * A point-like object, a mock point or a point used in series.
 * @private
 * @typedef {
 *          Highcharts.AnnotationMockPoint|
 *          Highcharts.Point
 *     } Highcharts.AnnotationPointType
 * @requires modules/annotations
 */
/**
 * Shape point as string, object or function.
 *
 * @typedef {
 *          string|
 *          Highcharts.AnnotationMockPointOptionsObject|
 *          Highcharts.AnnotationMockPointFunction
 *     } Highcharts.AnnotationShapePointOptions
 */
(''); // Keeps doclets above in JS file

;// ./code/es-modules/Core/Chart/ChartNavigationComposition.js
/**
 *
 *  (c) 2010-2024 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var ChartNavigationComposition;
(function (ChartNavigationComposition) {
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
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(chart) {
        if (!chart.navigation) {
            chart.navigation = new Additions(chart);
        }
        return chart;
    }
    ChartNavigationComposition.compose = compose;
    /* *
     *
     *  Class
     *
     * */
    /**
     * Initializes `chart.navigation` object which delegates `update()` methods
     * to all other common classes (used in exporting and navigationBindings).
     * @private
     */
    class Additions {
        /* *
         *
         *  Constructor
         *
         * */
        constructor(chart) {
            this.updates = [];
            this.chart = chart;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Registers an `update()` method in the `chart.navigation` object.
         *
         * @private
         * @param {UpdateFunction} updateFn
         * The `update()` method that will be called in `chart.update()`.
         */
        addUpdate(updateFn) {
            this.chart.navigation.updates.push(updateFn);
        }
        /**
         * @private
         */
        update(options, redraw) {
            this.updates.forEach((updateFn) => {
                updateFn.call(this.chart, options, redraw);
            });
        }
    }
    ChartNavigationComposition.Additions = Additions;
})(ChartNavigationComposition || (ChartNavigationComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Chart_ChartNavigationComposition = (ChartNavigationComposition);

;// ./code/es-modules/Extensions/Annotations/NavigationBindingsUtilities.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { defined: NavigationBindingsUtilities_defined, isNumber: NavigationBindingsUtilities_isNumber, pick: NavigationBindingsUtilities_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
        minPointOffset = NavigationBindingsUtilities_pick(coord.axis.minPointOffset, 0);
        return NavigationBindingsUtilities_isNumber(axisMin) && NavigationBindingsUtilities_isNumber(axisMax) &&
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
    if (NavigationBindingsUtilities_defined(predefinedType)) {
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

;// ./code/es-modules/Extensions/Annotations/NavigationBindingsDefaults.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { getAssignedAxis: NavigationBindingsDefaults_getAssignedAxis } = NavigationBindingsUtilities;

const { isNumber: NavigationBindingsDefaults_isNumber, merge: NavigationBindingsDefaults_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * @optionparent lang
 */
const lang = {
    /**
     * Configure the Popup strings in the chart. Requires the
     * `annotations.js` or `annotations-advanced.src.js` module to be
     * loaded.
     * @since   7.0.0
     * @product highcharts highstock
     */
    navigation: {
        /**
         * Translations for all field names used in popup.
         *
         * @product highcharts highstock
         */
        popup: {
            simpleShapes: 'Simple shapes',
            lines: 'Lines',
            circle: 'Circle',
            ellipse: 'Ellipse',
            rectangle: 'Rectangle',
            label: 'Label',
            shapeOptions: 'Shape options',
            typeOptions: 'Details',
            fill: 'Fill',
            format: 'Text',
            strokeWidth: 'Line width',
            stroke: 'Line color',
            title: 'Title',
            name: 'Name',
            labelOptions: 'Label options',
            labels: 'Labels',
            backgroundColor: 'Background color',
            backgroundColors: 'Background colors',
            borderColor: 'Border color',
            borderRadius: 'Border radius',
            borderWidth: 'Border width',
            style: 'Style',
            padding: 'Padding',
            fontSize: 'Font size',
            color: 'Color',
            height: 'Height',
            shapes: 'Shape options'
        }
    }
};
/**
 * @optionparent navigation
 * @product      highcharts highstock
 */
const navigation = {
    /**
     * A CSS class name where all bindings will be attached to. Multiple
     * charts on the same page should have separate class names to prevent
     * duplicating events.
     *
     * Default value of versions < 7.0.4 `highcharts-bindings-wrapper`
     *
     * @since     7.0.0
     * @type      {string}
     */
    bindingsClassName: 'highcharts-bindings-container',
    /**
     * Bindings definitions for custom HTML buttons. Each binding implements
     * simple event-driven interface:
     *
     * - `className`: classname used to bind event to
     *
     * - `init`: initial event, fired on button click
     *
     * - `start`: fired on first click on a chart
     *
     * - `steps`: array of sequential events fired one after another on each
     *   of users clicks
     *
     * - `end`: last event to be called after last step event
     *
     * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>|*}
     *
     * @sample {highstock} stock/stocktools/stocktools-thresholds
     *               Custom bindings
     * @sample {highcharts} highcharts/annotations/bindings/
     *               Simple binding
     * @sample {highcharts} highcharts/annotations/bindings-custom-annotation/
     *               Custom annotation binding
     *
     * @since        7.0.0
     * @requires     modules/annotations
     * @product      highcharts highstock
     */
    bindings: {
        /**
         * A circle annotation bindings. Includes `start` and one event in
         * `steps` array.
         *
         * @type    {Highcharts.NavigationBindingsOptionsObject}
         * @default {"className": "highcharts-circle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
         */
        circleAnnotation: {
            /** @ignore-option */
            className: 'highcharts-circle-annotation',
            /** @ignore-option */
            start: function (e) {
                const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && NavigationBindingsDefaults_getAssignedAxis(coords.xAxis), coordsY = coords && NavigationBindingsDefaults_getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                // Exit if clicked out of axes area
                if (!coordsX || !coordsY) {
                    return;
                }
                return this.chart.addAnnotation(NavigationBindingsDefaults_merge({
                    langKey: 'circle',
                    type: 'basicAnnotation',
                    shapes: [{
                            type: 'circle',
                            point: {
                                x: coordsX.value,
                                y: coordsY.value,
                                xAxis: coordsX.axis.index,
                                yAxis: coordsY.axis.index
                            },
                            r: 5
                        }]
                }, navigation.annotationsOptions, navigation.bindings.circleAnnotation
                    .annotationsOptions));
            },
            /** @ignore-option */
            steps: [
                function (e, annotation) {
                    const shapes = annotation.options.shapes, mockPointOpts = ((shapes && shapes[0] && shapes[0].point) ||
                        {});
                    let distance;
                    if (NavigationBindingsDefaults_isNumber(mockPointOpts.xAxis) &&
                        NavigationBindingsDefaults_isNumber(mockPointOpts.yAxis)) {
                        const inverted = this.chart.inverted, x = this.chart.xAxis[mockPointOpts.xAxis]
                            .toPixels(mockPointOpts.x), y = this.chart.yAxis[mockPointOpts.yAxis]
                            .toPixels(mockPointOpts.y);
                        distance = Math.max(Math.sqrt(Math.pow(inverted ? y - e.chartX : x - e.chartX, 2) +
                            Math.pow(inverted ? x - e.chartY : y - e.chartY, 2)), 5);
                    }
                    annotation.update({
                        shapes: [{
                                r: distance
                            }]
                    });
                }
            ]
        },
        /**
         * A ellipse annotation bindings. Includes `start` and two events in
         * `steps` array. First updates the second point, responsible for a
         * rx width, and second updates the ry width.
         *
         * @type    {Highcharts.NavigationBindingsOptionsObject}
         * @default {"className": "highcharts-ellipse-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
         */
        ellipseAnnotation: {
            className: 'highcharts-ellipse-annotation',
            start: function (e) {
                const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && NavigationBindingsDefaults_getAssignedAxis(coords.xAxis), coordsY = coords && NavigationBindingsDefaults_getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                if (!coordsX || !coordsY) {
                    return;
                }
                return this.chart.addAnnotation(NavigationBindingsDefaults_merge({
                    langKey: 'ellipse',
                    type: 'basicAnnotation',
                    shapes: [
                        {
                            type: 'ellipse',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }],
                            ry: 1
                        }
                    ]
                }, navigation.annotationsOptions, navigation.bindings.ellipseAnnotation
                    .annotationOptions));
            },
            steps: [
                function (e, annotation) {
                    const target = annotation.shapes[0], position = target.getAbsolutePosition(target.points[1]);
                    target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                    target.redraw(false);
                },
                function (e, annotation) {
                    const target = annotation.shapes[0], position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), newR = target.getDistanceFromLine(position, position2, e.chartX, e.chartY), yAxis = target.getYAxis(), newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                    target.setYRadius(newRY);
                    target.redraw(false);
                }
            ]
        },
        /**
         * A rectangle annotation bindings. Includes `start` and one event
         * in `steps` array.
         *
         * @type    {Highcharts.NavigationBindingsOptionsObject}
         * @default {"className": "highcharts-rectangle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
         */
        rectangleAnnotation: {
            /** @ignore-option */
            className: 'highcharts-rectangle-annotation',
            /** @ignore-option */
            start: function (e) {
                const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && NavigationBindingsDefaults_getAssignedAxis(coords.xAxis), coordsY = coords && NavigationBindingsDefaults_getAssignedAxis(coords.yAxis);
                // Exit if clicked out of axes area
                if (!coordsX || !coordsY) {
                    return;
                }
                const x = coordsX.value, y = coordsY.value, xAxis = coordsX.axis.index, yAxis = coordsY.axis.index, navigation = this.chart.options.navigation;
                return this.chart.addAnnotation(NavigationBindingsDefaults_merge({
                    langKey: 'rectangle',
                    type: 'basicAnnotation',
                    shapes: [{
                            type: 'path',
                            points: [
                                { xAxis, yAxis, x, y },
                                { xAxis, yAxis, x, y },
                                { xAxis, yAxis, x, y },
                                { xAxis, yAxis, x, y },
                                { command: 'Z' }
                            ]
                        }]
                }, navigation
                    .annotationsOptions, navigation
                    .bindings
                    .rectangleAnnotation
                    .annotationsOptions));
            },
            /** @ignore-option */
            steps: [
                function (e, annotation) {
                    const shapes = annotation.options.shapes, points = ((shapes && shapes[0] && shapes[0].points) ||
                        []), coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && NavigationBindingsDefaults_getAssignedAxis(coords.xAxis), coordsY = coords && NavigationBindingsDefaults_getAssignedAxis(coords.yAxis);
                    if (coordsX && coordsY) {
                        const x = coordsX.value, y = coordsY.value;
                        // Top right point
                        points[1].x = x;
                        // Bottom right point (cursor position)
                        points[2].x = x;
                        points[2].y = y;
                        // Bottom left
                        points[3].y = y;
                        annotation.update({
                            shapes: [{
                                    points: points
                                }]
                        });
                    }
                }
            ]
        },
        /**
         * A label annotation bindings. Includes `start` event only.
         *
         * @type    {Highcharts.NavigationBindingsOptionsObject}
         * @default {"className": "highcharts-label-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
         */
        labelAnnotation: {
            /** @ignore-option */
            className: 'highcharts-label-annotation',
            /** @ignore-option */
            start: function (e) {
                const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && NavigationBindingsDefaults_getAssignedAxis(coords.xAxis), coordsY = coords && NavigationBindingsDefaults_getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                // Exit if clicked out of axes area
                if (!coordsX || !coordsY) {
                    return;
                }
                return this.chart.addAnnotation(NavigationBindingsDefaults_merge({
                    langKey: 'label',
                    type: 'basicAnnotation',
                    labelOptions: {
                        format: '{y:.2f}',
                        overflow: 'none',
                        crop: true
                    },
                    labels: [{
                            point: {
                                xAxis: coordsX.axis.index,
                                yAxis: coordsY.axis.index,
                                x: coordsX.value,
                                y: coordsY.value
                            }
                        }]
                }, navigation
                    .annotationsOptions, navigation
                    .bindings
                    .labelAnnotation
                    .annotationsOptions));
            }
        }
    },
    /**
     * Path where Highcharts will look for icons. Change this to use icons
     * from a different server.
     *
     * @type      {string}
     * @default   https://code.highcharts.com/12.1.2/gfx/stock-icons/
     * @since     7.1.3
     * @apioption navigation.iconsURL
     */
    /**
     * A `showPopup` event. Fired when selecting for example an annotation.
     *
     * @type      {Function}
     * @apioption navigation.events.showPopup
     */
    /**
     * A `closePopup` event. Fired when Popup should be hidden, for example
     * when clicking on an annotation again.
     *
     * @type      {Function}
     * @apioption navigation.events.closePopup
     */
    /**
     * Event fired on a button click.
     *
     * @type      {Function}
     * @sample    highcharts/annotations/gui/
     *            Change icon in a dropddown on event
     * @sample    highcharts/annotations/gui-buttons/
     *            Change button class on event
     * @apioption navigation.events.selectButton
     */
    /**
     * Event fired when button state should change, for example after
     * adding an annotation.
     *
     * @type      {Function}
     * @sample    highcharts/annotations/gui/
     *            Change icon in a dropddown on event
     * @sample    highcharts/annotations/gui-buttons/
     *            Change button class on event
     * @apioption navigation.events.deselectButton
     */
    /**
     * Events to communicate between Stock Tools and custom GUI.
     *
     * @since        7.0.0
     * @product      highcharts highstock
     * @optionparent navigation.events
     */
    events: {},
    /**
     * Additional options to be merged into all annotations.
     *
     * @sample stock/stocktools/navigation-annotation-options
     *         Set red color of all line annotations
     *
     * @type      {Highcharts.AnnotationsOptions}
     * @extends   annotations
     * @exclude   crookedLine, elliottWave, fibonacci, infinityLine,
     *            measure, pitchfork, tunnel, verticalLine, basicAnnotation
     * @requires     modules/annotations
     * @apioption navigation.annotationsOptions
     */
    annotationsOptions: {
        animation: {
            defer: 0
        }
    }
};
/* *
 *
 *  Default Export
 *
 * */
const NavigationBindingDefaults = {
    lang,
    navigation
};
/* harmony default export */ const NavigationBindingsDefaults = (NavigationBindingDefaults);

;// ./code/es-modules/Extensions/Annotations/NavigationBindings.js
/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { setOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { format: NavigationBindings_format } = (highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_default());

const { composed: NavigationBindings_composed, doc: NavigationBindings_doc, win } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { getAssignedAxis: NavigationBindings_getAssignedAxis, getFieldType: NavigationBindings_getFieldType } = NavigationBindingsUtilities;

const { addEvent: NavigationBindings_addEvent, attr, defined: NavigationBindings_defined, fireEvent: NavigationBindings_fireEvent, isArray: NavigationBindings_isArray, isFunction, isNumber: NavigationBindings_isNumber, isObject: NavigationBindings_isObject, merge: NavigationBindings_merge, objectEach: NavigationBindings_objectEach, pick: NavigationBindings_pick, pushUnique: NavigationBindings_pushUnique } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * IE 9-11 polyfill for Element.closest():
 * @private
 */
function closestPolyfill(el, s) {
    const ElementProto = win.Element.prototype, elementMatches = ElementProto.matches ||
        ElementProto.msMatchesSelector ||
        ElementProto.webkitMatchesSelector;
    let ret = null;
    if (ElementProto.closest) {
        ret = ElementProto.closest.call(el, s);
    }
    else {
        do {
            if (elementMatches.call(el, s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
    }
    return ret;
}
/**
 * @private
 */
function onAnnotationRemove() {
    if (this.chart.navigationBindings) {
        this.chart.navigationBindings.deselectAnnotation();
    }
}
/**
 * @private
 */
function onChartDestroy() {
    if (this.navigationBindings) {
        this.navigationBindings.destroy();
    }
}
/**
 * @private
 */
function onChartLoad() {
    const options = this.options;
    if (options && options.navigation && options.navigation.bindings) {
        this.navigationBindings = new NavigationBindings(this, options.navigation);
        this.navigationBindings.initEvents();
        this.navigationBindings.initUpdate();
    }
}
/**
 * @private
 */
function onChartRender() {
    const navigationBindings = this.navigationBindings, disabledClassName = 'highcharts-disabled-btn';
    if (this && navigationBindings) {
        // Check if the buttons should be enabled/disabled based on
        // visible series.
        let buttonsEnabled = false;
        this.series.forEach((series) => {
            if (!series.options.isInternal && series.visible) {
                buttonsEnabled = true;
            }
        });
        if (this.navigationBindings &&
            this.navigationBindings.container &&
            this.navigationBindings.container[0]) {
            const container = this.navigationBindings.container[0];
            NavigationBindings_objectEach(navigationBindings.boundClassNames, (value, key) => {
                // Get the HTML element corresponding to the className taken
                // from StockToolsBindings.
                const buttonNode = container.querySelectorAll('.' + key);
                if (buttonNode) {
                    for (let i = 0; i < buttonNode.length; i++) {
                        const button = buttonNode[i], cls = button.className;
                        if (value.noDataState === 'normal') {
                            // If button has noDataState: 'normal', and has
                            // disabledClassName, remove this className.
                            if (cls.indexOf(disabledClassName) !== -1) {
                                button.classList.remove(disabledClassName);
                            }
                        }
                        else if (!buttonsEnabled) {
                            if (cls.indexOf(disabledClassName) === -1) {
                                button.className += ' ' + disabledClassName;
                            }
                        }
                        else {
                            // Enable all buttons by deleting the className.
                            if (cls.indexOf(disabledClassName) !== -1) {
                                button.classList.remove(disabledClassName);
                            }
                        }
                    }
                }
            });
        }
    }
}
/**
 * @private
 */
function NavigationBindings_onNavigationBindingsClosePopup() {
    this.deselectAnnotation();
}
/**
 * @private
 */
function onNavigationBindingsDeselectButton() {
    this.selectedButtonElement = null;
}
/**
 * Show edit-annotation form:
 * @private
 */
function selectableAnnotation(annotationType) {
    const originalClick = annotationType.prototype.defaultOptions.events &&
        annotationType.prototype.defaultOptions.events.click;
    /**
     * Select and show popup
     * @private
     */
    function selectAndShowPopup(eventArguments) {
        const annotation = this, navigation = annotation.chart.navigationBindings, prevAnnotation = navigation.activeAnnotation;
        if (originalClick) {
            originalClick.call(annotation, eventArguments);
        }
        if (prevAnnotation !== annotation) {
            // Select current:
            navigation.deselectAnnotation();
            navigation.activeAnnotation = annotation;
            annotation.setControlPointsVisibility(true);
            NavigationBindings_fireEvent(navigation, 'showPopup', {
                annotation: annotation,
                formType: 'annotation-toolbar',
                options: navigation.annotationToFields(annotation),
                onSubmit: function (data) {
                    if (data.actionType === 'remove') {
                        navigation.activeAnnotation = false;
                        navigation.chart.removeAnnotation(annotation);
                    }
                    else {
                        const config = {};
                        navigation.fieldsToOptions(data.fields, config);
                        navigation.deselectAnnotation();
                        const typeOptions = config.typeOptions;
                        if (annotation.options.type === 'measure') {
                            // Manually disable crooshars according to
                            // stroke width of the shape:
                            typeOptions.crosshairY.enabled = (typeOptions.crosshairY
                                .strokeWidth !== 0);
                            typeOptions.crosshairX.enabled = (typeOptions.crosshairX
                                .strokeWidth !== 0);
                        }
                        annotation.update(config);
                    }
                }
            });
        }
        else {
            // Deselect current:
            NavigationBindings_fireEvent(navigation, 'closePopup');
        }
        // Let bubble event to chart.click:
        eventArguments.activeAnnotation = true;
    }
    // #18276, show popup on touchend, but not on touchmove
    let touchStartX, touchStartY;
    /**
     *
     */
    function saveCoords(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
    /**
     *
     */
    function checkForTouchmove(e) {
        const hasMoved = touchStartX ? Math.sqrt(Math.pow(touchStartX - e.changedTouches[0].clientX, 2) +
            Math.pow(touchStartY - e.changedTouches[0].clientY, 2)) >= 4 : false;
        if (!hasMoved) {
            selectAndShowPopup.call(this, e);
        }
    }
    NavigationBindings_merge(true, annotationType.prototype.defaultOptions.events, {
        click: selectAndShowPopup,
        touchstart: saveCoords,
        touchend: checkForTouchmove
    });
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 */
class NavigationBindings {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AnnotationClass, ChartClass) {
        if (NavigationBindings_pushUnique(NavigationBindings_composed, 'NavigationBindings')) {
            NavigationBindings_addEvent(AnnotationClass, 'remove', onAnnotationRemove);
            // Basic shapes:
            selectableAnnotation(AnnotationClass);
            // Advanced annotations:
            NavigationBindings_objectEach(AnnotationClass.types, (annotationType) => {
                selectableAnnotation(annotationType);
            });
            NavigationBindings_addEvent(ChartClass, 'destroy', onChartDestroy);
            NavigationBindings_addEvent(ChartClass, 'load', onChartLoad);
            NavigationBindings_addEvent(ChartClass, 'render', onChartRender);
            NavigationBindings_addEvent(NavigationBindings, 'closePopup', NavigationBindings_onNavigationBindingsClosePopup);
            NavigationBindings_addEvent(NavigationBindings, 'deselectButton', onNavigationBindingsDeselectButton);
            setOptions(NavigationBindingsDefaults);
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, options) {
        this.boundClassNames = void 0;
        this.chart = chart;
        this.options = options;
        this.eventsToUnbind = [];
        this.container =
            this.chart.container.getElementsByClassName(this.options.bindingsClassName || '');
        if (!this.container.length) {
            this.container = NavigationBindings_doc.getElementsByClassName(this.options.bindingsClassName || '');
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    getCoords(e) {
        const coords = this.chart.pointer?.getCoordinates(e);
        return [
            coords && NavigationBindings_getAssignedAxis(coords.xAxis),
            coords && NavigationBindings_getAssignedAxis(coords.yAxis)
        ];
    }
    /**
     * Init all events connected to NavigationBindings.
     *
     * @private
     * @function Highcharts.NavigationBindings#initEvents
     */
    initEvents() {
        const navigation = this, chart = navigation.chart, bindingsContainer = navigation.container, options = navigation.options;
        // Shorthand object for getting events for buttons:
        navigation.boundClassNames = {};
        NavigationBindings_objectEach((options.bindings || {}), (value) => {
            navigation.boundClassNames[value.className] = value;
        });
        // Handle multiple containers with the same class names:
        [].forEach.call(bindingsContainer, (subContainer) => {
            navigation.eventsToUnbind.push(NavigationBindings_addEvent(subContainer, 'click', (event) => {
                const bindings = navigation.getButtonEvents(subContainer, event);
                if (bindings &&
                    (!bindings.button.classList
                        .contains('highcharts-disabled-btn'))) {
                    navigation.bindingsButtonClick(bindings.button, bindings.events, event);
                }
            }));
        });
        NavigationBindings_objectEach((options.events || {}), (callback, eventName) => {
            if (isFunction(callback)) {
                navigation.eventsToUnbind.push(NavigationBindings_addEvent(navigation, eventName, callback, { passive: false }));
            }
        });
        navigation.eventsToUnbind.push(NavigationBindings_addEvent(chart.container, 'click', function (e) {
            if (!chart.cancelClick &&
                chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop, {
                    visiblePlotOnly: true
                })) {
                navigation.bindingsChartClick(this, e);
            }
        }));
        navigation.eventsToUnbind.push(NavigationBindings_addEvent(chart.container, (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isTouchDevice ? 'touchmove' : 'mousemove', function (e) {
            navigation.bindingsContainerMouseMove(this, e);
        }, (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isTouchDevice ? { passive: false } : void 0));
    }
    /**
     * Common chart.update() delegation, shared between bindings and exporting.
     *
     * @private
     * @function Highcharts.NavigationBindings#initUpdate
     */
    initUpdate() {
        const navigation = this;
        Chart_ChartNavigationComposition
            .compose(this.chart).navigation
            .addUpdate((options) => {
            navigation.update(options);
        });
    }
    /**
     * Hook for click on a button, method selects/unselects buttons,
     * then calls `bindings.init` callback.
     *
     * @private
     * @function Highcharts.NavigationBindings#bindingsButtonClick
     *
     * @param {Highcharts.HTMLDOMElement} [button]
     *        Clicked button
     *
     * @param {Object} events
     *        Events passed down from bindings (`init`, `start`, `step`, `end`)
     *
     * @param {Highcharts.PointerEventObject} clickEvent
     *        Browser's click event
     */
    bindingsButtonClick(button, events, clickEvent) {
        const navigation = this, chart = navigation.chart, svgContainer = chart.renderer.boxWrapper;
        let shouldEventBeFired = true;
        if (navigation.selectedButtonElement) {
            if (navigation.selectedButtonElement.classList === button.classList) {
                shouldEventBeFired = false;
            }
            NavigationBindings_fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
            if (navigation.nextEvent) {
                // Remove in-progress annotations adders:
                if (navigation.currentUserDetails &&
                    navigation.currentUserDetails.coll === 'annotations') {
                    chart.removeAnnotation(navigation.currentUserDetails);
                }
                navigation.mouseMoveEvent = navigation.nextEvent = false;
            }
        }
        if (shouldEventBeFired) {
            navigation.selectedButton = events;
            navigation.selectedButtonElement = button;
            NavigationBindings_fireEvent(navigation, 'selectButton', { button: button });
            // Call "init" event, for example to open modal window
            if (events.init) {
                events.init.call(navigation, button, clickEvent);
            }
            if (events.start || events.steps) {
                chart.renderer.boxWrapper.addClass('highcharts-draw-mode');
            }
        }
        else {
            chart.stockTools && button.classList.remove('highcharts-active');
            svgContainer.removeClass('highcharts-draw-mode');
            navigation.nextEvent = false;
            navigation.mouseMoveEvent = false;
            navigation.selectedButton = null;
        }
    }
    /**
     * Hook for click on a chart, first click on a chart calls `start` event,
     * then on all subsequent clicks iterate over `steps` array.
     * When finished, calls `end` event.
     *
     * @private
     * @function Highcharts.NavigationBindings#bindingsChartClick
     *
     * @param {Highcharts.Chart} chart
     *        Chart that click was performed on.
     *
     * @param {Highcharts.PointerEventObject} clickEvent
     *        Browser's click event.
     */
    bindingsChartClick(chart, clickEvent) {
        chart = this.chart;
        const navigation = this, activeAnnotation = navigation.activeAnnotation, selectedButton = navigation.selectedButton, svgContainer = chart.renderer.boxWrapper;
        if (activeAnnotation) {
            // Click outside popups, should close them and deselect the
            // annotation
            if (!activeAnnotation.cancelClick && // #15729
                !clickEvent.activeAnnotation &&
                // Element could be removed in the child action, e.g. button
                clickEvent.target.parentNode &&
                // TO DO: Polyfill for IE11?
                !closestPolyfill(clickEvent.target, '.highcharts-popup')) {
                NavigationBindings_fireEvent(navigation, 'closePopup');
            }
            else if (activeAnnotation.cancelClick) {
                // Reset cancelClick after the other event handlers have run
                setTimeout(() => {
                    activeAnnotation.cancelClick = false;
                }, 0);
            }
        }
        if (!selectedButton || !selectedButton.start) {
            return;
        }
        if (!navigation.nextEvent) {
            // Call init method:
            navigation.currentUserDetails = selectedButton.start.call(navigation, clickEvent);
            // If steps exists (e.g. Annotations), bind them:
            if (navigation.currentUserDetails && selectedButton.steps) {
                navigation.stepIndex = 0;
                navigation.steps = true;
                navigation.mouseMoveEvent = navigation.nextEvent =
                    selectedButton.steps[navigation.stepIndex];
            }
            else {
                NavigationBindings_fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                svgContainer.removeClass('highcharts-draw-mode');
                navigation.steps = false;
                navigation.selectedButton = null;
                // First click is also the last one:
                if (selectedButton.end) {
                    selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                }
            }
        }
        else {
            navigation.nextEvent(clickEvent, navigation.currentUserDetails);
            if (navigation.steps) {
                navigation.stepIndex++;
                if (selectedButton.steps[navigation.stepIndex]) {
                    // If we have more steps, bind them one by one:
                    navigation.mouseMoveEvent = navigation.nextEvent = selectedButton.steps[navigation.stepIndex];
                }
                else {
                    NavigationBindings_fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                    svgContainer.removeClass('highcharts-draw-mode');
                    // That was the last step, call end():
                    if (selectedButton.end) {
                        selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                    }
                    navigation.nextEvent = false;
                    navigation.mouseMoveEvent = false;
                    navigation.selectedButton = null;
                }
            }
        }
    }
    /**
     * Hook for mouse move on a chart's container. It calls current step.
     *
     * @private
     * @function Highcharts.NavigationBindings#bindingsContainerMouseMove
     *
     * @param {Highcharts.HTMLDOMElement} container
     *        Chart's container.
     *
     * @param {global.Event} moveEvent
     *        Browser's move event.
     */
    bindingsContainerMouseMove(_container, moveEvent) {
        if (this.mouseMoveEvent) {
            this.mouseMoveEvent(moveEvent, this.currentUserDetails);
        }
    }
    /**
     * Translate fields (e.g. `params.period` or `marker.styles.color`) to
     * Highcharts options object (e.g. `{ params: { period } }`).
     *
     * @private
     * @function Highcharts.NavigationBindings#fieldsToOptions<T>
     *
     * @param {Highcharts.Dictionary<string>} fields
     *        Fields from popup form.
     *
     * @param {T} config
     *        Default config to be modified.
     *
     * @return {T}
     *         Modified config
     */
    fieldsToOptions(fields, config) {
        NavigationBindings_objectEach(fields, (value, field) => {
            const parsedValue = parseFloat(value), path = field.split('.'), pathLength = path.length - 1;
            // If it's a number (not "format" options), parse it:
            if (NavigationBindings_isNumber(parsedValue) &&
                !value.match(/px|em/g) &&
                !field.match(/format/g)) {
                value = parsedValue;
            }
            // Remove values like 0
            if (value !== 'undefined') {
                let parent = config;
                path.forEach((name, index) => {
                    if (name !== '__proto__' && name !== 'constructor') {
                        const nextName = NavigationBindings_pick(path[index + 1], '');
                        if (pathLength === index) {
                            // Last index, put value:
                            parent[name] = value;
                        }
                        else if (!parent[name]) {
                            // Create middle property:
                            parent[name] = nextName.match(/\d/g) ?
                                [] :
                                {};
                            parent = parent[name];
                        }
                        else {
                            // Jump into next property
                            parent = parent[name];
                        }
                    }
                });
            }
        });
        return config;
    }
    /**
     * Shorthand method to deselect an annotation.
     *
     * @function Highcharts.NavigationBindings#deselectAnnotation
     */
    deselectAnnotation() {
        if (this.activeAnnotation) {
            this.activeAnnotation.setControlPointsVisibility(false);
            this.activeAnnotation = false;
        }
    }
    /**
     * Generates API config for popup in the same format as options for
     * Annotation object.
     *
     * @function Highcharts.NavigationBindings#annotationToFields
     *
     * @param {Highcharts.Annotation} annotation
     *        Annotations object
     *
     * @return {Highcharts.Dictionary<string>}
     *         Annotation options to be displayed in popup box
     */
    annotationToFields(annotation) {
        const options = annotation.options, editables = NavigationBindings.annotationsEditable, nestedEditables = editables.nestedOptions, type = NavigationBindings_pick(options.type, options.shapes && options.shapes[0] &&
            options.shapes[0].type, options.labels && options.labels[0] &&
            options.labels[0].type, 'label'), nonEditables = NavigationBindings.annotationsNonEditable[options.langKey] || [], visualOptions = {
            langKey: options.langKey,
            type: type
        };
        /**
         * Nested options traversing. Method goes down to the options and copies
         * allowed options (with values) to new object, which is last parameter:
         * "parent".
         *
         * @private
         *
         * @param {*} option
         *        Atomic type or object/array
         *
         * @param {string} key
         *        Option name, for example "visible" or "x", "y"
         *
         * @param {Object} parentEditables
         *        Editables from NavigationBindings.annotationsEditable
         *
         * @param {Object} parent
         *        Where new options will be assigned
         */
        function traverse(option, key, parentEditables, parent, parentKey) {
            let nextParent;
            if (parentEditables &&
                NavigationBindings_defined(option) &&
                nonEditables.indexOf(key) === -1 &&
                ((parentEditables.indexOf &&
                    parentEditables.indexOf(key)) >= 0 ||
                    parentEditables[key] || // Nested array
                    parentEditables === true // Simple array
                )) {
                // Roots:
                if (NavigationBindings_isArray(option)) {
                    parent[key] = [];
                    option.forEach((arrayOption, i) => {
                        if (!NavigationBindings_isObject(arrayOption)) {
                            // Simple arrays, e.g. [String, Number, Boolean]
                            traverse(arrayOption, 0, nestedEditables[key], parent[key], key);
                        }
                        else {
                            // Advanced arrays, e.g. [Object, Object]
                            parent[key][i] = {};
                            NavigationBindings_objectEach(arrayOption, (nestedOption, nestedKey) => {
                                traverse(nestedOption, nestedKey, nestedEditables[key], parent[key][i], key);
                            });
                        }
                    });
                }
                else if (NavigationBindings_isObject(option)) {
                    nextParent = {};
                    if (NavigationBindings_isArray(parent)) {
                        parent.push(nextParent);
                        nextParent[key] = {};
                        nextParent = nextParent[key];
                    }
                    else {
                        parent[key] = nextParent;
                    }
                    NavigationBindings_objectEach(option, (nestedOption, nestedKey) => {
                        traverse(nestedOption, nestedKey, key === 0 ?
                            parentEditables :
                            nestedEditables[key], nextParent, key);
                    });
                }
                else {
                    // Leaf:
                    if (key === 'format') {
                        parent[key] = [
                            NavigationBindings_format(option, annotation.labels[0].points[0]).toString(),
                            'text'
                        ];
                    }
                    else if (NavigationBindings_isArray(parent)) {
                        parent.push([option, NavigationBindings_getFieldType(parentKey, option)]);
                    }
                    else {
                        parent[key] = [option, NavigationBindings_getFieldType(key, option)];
                    }
                }
            }
        }
        NavigationBindings_objectEach(options, (option, key) => {
            if (key === 'typeOptions') {
                visualOptions[key] = {};
                NavigationBindings_objectEach(options[key], (typeOption, typeKey) => {
                    traverse(typeOption, typeKey, nestedEditables, visualOptions[key], typeKey);
                });
            }
            else {
                traverse(option, key, editables[type], visualOptions, key);
            }
        });
        return visualOptions;
    }
    /**
     * Get all class names for all parents in the element. Iterates until finds
     * main container.
     *
     * @private
     * @function Highcharts.NavigationBindings#getClickedClassNames
     *
     * @param {Highcharts.HTMLDOMElement} container
     * Container that event is bound to.
     *
     * @param {global.Event} event
     * Browser's event.
     *
     * @return {Array<Array<string, Highcharts.HTMLDOMElement>>}
     * Array of class names with corresponding elements
     */
    getClickedClassNames(container, event) {
        let element = event.target, classNames = [], elemClassName;
        while (element && element.tagName) {
            elemClassName = attr(element, 'class');
            if (elemClassName) {
                classNames = classNames.concat(elemClassName
                    .split(' ')
                    // eslint-disable-next-line no-loop-func
                    .map((name) => ([name, element])));
            }
            element = element.parentNode;
            if (element === container) {
                return classNames;
            }
        }
        return classNames;
    }
    /**
     * Get events bound to a button. It's a custom event delegation to find all
     * events connected to the element.
     *
     * @private
     * @function Highcharts.NavigationBindings#getButtonEvents
     *
     * @param {Highcharts.HTMLDOMElement} container
     *        Container that event is bound to.
     *
     * @param {global.Event} event
     *        Browser's event.
     *
     * @return {Object}
     *         Object with events (init, start, steps, and end)
     */
    getButtonEvents(container, event) {
        const navigation = this, classNames = this.getClickedClassNames(container, event);
        let bindings;
        classNames.forEach((className) => {
            if (navigation.boundClassNames[className[0]] && !bindings) {
                bindings = {
                    events: navigation.boundClassNames[className[0]],
                    button: className[1]
                };
            }
        });
        return bindings;
    }
    /**
     * Bindings are just events, so the whole update process is simply
     * removing old events and adding new ones.
     *
     * @private
     * @function Highcharts.NavigationBindings#update
     */
    update(options) {
        this.options = NavigationBindings_merge(true, this.options, options);
        this.removeEvents();
        this.initEvents();
    }
    /**
     * Remove all events created in the navigation.
     *
     * @private
     * @function Highcharts.NavigationBindings#removeEvents
     */
    removeEvents() {
        this.eventsToUnbind.forEach((unbinder) => unbinder());
    }
    /**
     * @private
     * @function Highcharts.NavigationBindings#destroy
     */
    destroy() {
        this.removeEvents();
    }
}
/* *
 *
 *  Static Properties
 *
 * */
// Define which options from annotations should show up in edit box:
NavigationBindings.annotationsEditable = {
    // `typeOptions` are always available
    // Nested and shared options:
    nestedOptions: {
        labelOptions: ['style', 'format', 'backgroundColor'],
        labels: ['style'],
        label: ['style'],
        style: ['fontSize', 'color'],
        background: ['fill', 'strokeWidth', 'stroke'],
        innerBackground: ['fill', 'strokeWidth', 'stroke'],
        outerBackground: ['fill', 'strokeWidth', 'stroke'],
        shapeOptions: ['fill', 'strokeWidth', 'stroke'],
        shapes: ['fill', 'strokeWidth', 'stroke'],
        line: ['strokeWidth', 'stroke'],
        backgroundColors: [true],
        connector: ['fill', 'strokeWidth', 'stroke'],
        crosshairX: ['strokeWidth', 'stroke'],
        crosshairY: ['strokeWidth', 'stroke']
    },
    // Simple shapes:
    circle: ['shapes'],
    ellipse: ['shapes'],
    verticalLine: [],
    label: ['labelOptions'],
    // Measure
    measure: ['background', 'crosshairY', 'crosshairX'],
    // Others:
    fibonacci: [],
    tunnel: ['background', 'line', 'height'],
    pitchfork: ['innerBackground', 'outerBackground'],
    rect: ['shapes'],
    // Crooked lines, elliots, arrows etc:
    crookedLine: [],
    basicAnnotation: ['shapes', 'labelOptions']
};
// Define non editable fields per annotation, for example Rectangle inherits
// options from Measure, but crosshairs are not available
NavigationBindings.annotationsNonEditable = {
    rectangle: ['crosshairX', 'crosshairY', 'labelOptions'],
    ellipse: ['labelOptions'],
    circle: ['labelOptions']
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Annotations_NavigationBindings = (NavigationBindings);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * A config object for navigation bindings in annotations.
 *
 * @interface Highcharts.NavigationBindingsOptionsObject
 */ /**
* ClassName of the element for a binding.
* @name Highcharts.NavigationBindingsOptionsObject#className
* @type {string|undefined}
*/ /**
* Last event to be fired after last step event.
* @name Highcharts.NavigationBindingsOptionsObject#end
* @type {Function|undefined}
*/ /**
* Initial event, fired on a button click.
* @name Highcharts.NavigationBindingsOptionsObject#init
* @type {Function|undefined}
*/ /**
* Event fired on first click on a chart.
* @name Highcharts.NavigationBindingsOptionsObject#start
* @type {Function|undefined}
*/ /**
* Last event to be fired after last step event. Array of step events to be
* called sequentially after each user click.
* @name Highcharts.NavigationBindingsOptionsObject#steps
* @type {Array<Function>|undefined}
*/
(''); // Keeps doclets above in JS file

;// ./code/es-modules/masters/modules/annotations.src.js





const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.Annotation = G.Annotation || Annotations_Annotation;
G.NavigationBindings = G.NavigationBindings || Annotations_NavigationBindings;
G.Annotation.compose(G.Chart, G.NavigationBindings, G.Pointer, G.SVGRenderer);
/* harmony default export */ const annotations_src = ((/* unused pure expression or super */ null && (Highcharts)));

;// ./code/es-modules/Extensions/Annotations/Types/BasicAnnotation.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: BasicAnnotation_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class BasicAnnotation extends Annotations_Annotation {
    /* *
     *
     *  Functions
     *
     * */
    addControlPoints() {
        const options = this.options, controlPoints = BasicAnnotation.basicControlPoints, annotationType = this.basicType, optionsGroup = (options.labels ||
            options.shapes ||
            []);
        optionsGroup.forEach((group) => {
            group.controlPoints = controlPoints[annotationType];
        });
    }
    init() {
        const options = this.options;
        if (options.shapes) {
            delete options.labelOptions;
            const type = options.shapes[0].type;
            options.shapes[0].className =
                (options.shapes[0].className || '') + ' highcharts-basic-shape';
            // The rectangle is rendered as a path, whereas other basic shapes
            // are rendered as their respective SVG shapes.
            if (type && type !== 'path') {
                this.basicType = type;
            }
            else {
                this.basicType = 'rectangle';
            }
        }
        else {
            delete options.shapes;
            this.basicType = 'label';
        }
        super.init.apply(this, arguments);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
BasicAnnotation.basicControlPoints = {
    label: [{
            symbol: 'triangle-down',
            positioner: function (target) {
                if (!target.graphic.placed) {
                    return {
                        x: 0,
                        y: -9e7
                    };
                }
                const xy = Annotations_MockPoint
                    .pointToPixels(target.points[0]);
                return {
                    x: xy.x - (this.graphic.width || 0) / 2,
                    y: xy.y - (this.graphic.height || 0) / 2
                };
            },
            // TRANSLATE POINT/ANCHOR
            events: {
                drag: function (e, target) {
                    const xy = this.mouseMoveToTranslation(e);
                    target.translatePoint(xy.x, xy.y);
                    target.annotation.userOptions.labels[0].point =
                        target.options.point;
                    target.redraw(false);
                }
            }
        }, {
            symbol: 'square',
            positioner: function (target) {
                if (!target.graphic.placed) {
                    return {
                        x: 0,
                        y: -9e7
                    };
                }
                return {
                    x: target.graphic.alignAttr.x -
                        (this.graphic.width || 0) / 2,
                    y: target.graphic.alignAttr.y -
                        (this.graphic.height || 0) / 2
                };
            },
            // TRANSLATE POSITION WITHOUT CHANGING THE
            // ANCHOR
            events: {
                drag: function (e, target) {
                    const xy = this.mouseMoveToTranslation(e);
                    target.translate(xy.x, xy.y);
                    target.annotation.userOptions.labels[0].point =
                        target.options.point;
                    target.redraw(false);
                }
            }
        }],
    rectangle: [{
            positioner: function (annotation) {
                const xy = Annotations_MockPoint
                    .pointToPixels(annotation.points[2]);
                return {
                    x: xy.x - 4,
                    y: xy.y - 4
                };
            },
            events: {
                drag: function (e, target) {
                    const annotation = target.annotation, coords = this.chart.pointer?.getCoordinates(e), points = target.options.points, shapes = annotation.userOptions.shapes, xAxisIndex = annotation.clipXAxis?.index || 0, yAxisIndex = annotation.clipYAxis?.index || 0;
                    if (coords) {
                        const x = coords.xAxis[xAxisIndex].value, y = coords.yAxis[yAxisIndex].value;
                        // Top right point
                        points[1].x = x;
                        // Bottom right point (cursor position)
                        points[2].x = x;
                        points[2].y = y;
                        // Bottom left
                        points[3].y = y;
                        if (shapes && shapes[0]) {
                            shapes[0].points = target.options.points;
                        }
                    }
                    annotation.redraw(false);
                }
            }
        }],
    circle: [{
            positioner: function (target) {
                const xy = Annotations_MockPoint.pointToPixels(target.points[0]), r = target.options.r;
                return {
                    x: xy.x + r * Math.cos(Math.PI / 4) -
                        (this.graphic.width || 0) / 2,
                    y: xy.y + r * Math.sin(Math.PI / 4) -
                        (this.graphic.height || 0) / 2
                };
            },
            events: {
                // TRANSFORM RADIUS ACCORDING TO Y
                // TRANSLATION
                drag: function (e, target) {
                    const annotation = target.annotation, position = this.mouseMoveToTranslation(e), shapes = annotation.userOptions.shapes;
                    target.setRadius(Math.max(target.options.r +
                        position.y /
                            Math.sin(Math.PI / 4), 5));
                    if (shapes && shapes[0]) {
                        shapes[0].r = target.options.r;
                        shapes[0].point = target.options.point;
                    }
                    target.redraw(false);
                }
            }
        }],
    ellipse: [{
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[0]);
                return {
                    x: position.x - (this.graphic.width || 0) / 2,
                    y: position.y - (this.graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[0]);
                    target.translatePoint(e.chartX - position.x, e.chartY - position.y, 0);
                    target.redraw(false);
                }
            }
        }, {
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[1]);
                return {
                    x: position.x - (this.graphic.width || 0) / 2,
                    y: position.y - (this.graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[1]);
                    target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                    target.redraw(false);
                }
            }
        }, {
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), attrs = target.getAttrs(position, position2);
                return {
                    x: attrs.cx - (this.graphic.width || 0) / 2 +
                        attrs.ry * Math.sin((attrs.angle * Math.PI) / 180),
                    y: attrs.cy - (this.graphic.height || 0) / 2 -
                        attrs.ry * Math.cos((attrs.angle * Math.PI) / 180)
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), newR = target.getDistanceFromLine(position, position2, e.chartX, e.chartY), yAxis = target.getYAxis(), newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                    target.setYRadius(newRY);
                    target.redraw(false);
                }
            }
        }]
};
BasicAnnotation.prototype.defaultOptions = BasicAnnotation_merge(Annotations_Annotation.prototype.defaultOptions, {});
Annotations_Annotation.types.basicAnnotation = BasicAnnotation;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_BasicAnnotation = ((/* unused pure expression or super */ null && (BasicAnnotation)));

;// ./code/es-modules/Extensions/Annotations/Types/CrookedLine.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: CrookedLine_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class CrookedLine extends Annotations_Annotation {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Overrides default setter to get axes from typeOptions.
     * @private
     */
    setClipAxes() {
        this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
        this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis];
    }
    getPointsOptions() {
        const typeOptions = this.options.typeOptions;
        return (typeOptions.points || []).map((pointOptions) => {
            pointOptions.xAxis = typeOptions.xAxis;
            pointOptions.yAxis = typeOptions.yAxis;
            return pointOptions;
        });
    }
    getControlPointsOptions() {
        return this.getPointsOptions();
    }
    addControlPoints() {
        this.getControlPointsOptions().forEach(function (pointOptions, i) {
            const controlPoint = new Annotations_ControlPoint(this.chart, this, CrookedLine_merge(this.options.controlPointOptions, pointOptions.controlPoint), i);
            this.controlPoints.push(controlPoint);
            pointOptions.controlPoint = controlPoint.options;
        }, this);
    }
    addShapes() {
        const typeOptions = this.options.typeOptions, shape = this.initShape(CrookedLine_merge(typeOptions.line, {
            type: 'path',
            className: 'highcharts-crooked-lines',
            points: this.points.map((_point, i) => (function (target) {
                return target.annotation.points[i];
            }))
        }), 0);
        typeOptions.line = shape.options;
    }
}
CrookedLine.prototype.defaultOptions = CrookedLine_merge(Annotations_Annotation.prototype.defaultOptions, 
/**
 * A crooked line annotation.
 *
 * @sample highcharts/annotations-advanced/crooked-line/
 *         Crooked line
 *
 * @product      highstock
 * @optionparent annotations.crookedLine
 */
{
    /**
     * @extends   annotations.labelOptions
     * @apioption annotations.crookedLine.labelOptions
     */
    /**
     * @extends   annotations.shapeOptions
     * @apioption annotations.crookedLine.shapeOptions
     */
    /**
     * Additional options for an annotation with the type.
     */
    typeOptions: {
        /**
         * This number defines which xAxis the point is connected to.
         * It refers to either the axis id or the index of the axis
         * in the xAxis array.
         */
        xAxis: 0,
        /**
         * This number defines which yAxis the point is connected to.
         * It refers to either the axis id or the index of the axis
         * in the xAxis array.
         */
        yAxis: 0,
        /**
         * @type      {Array<*>}
         * @apioption annotations.crookedLine.typeOptions.points
         */
        /**
         * The x position of the point.
         *
         * @type      {number}
         * @apioption annotations.crookedLine.typeOptions.points.x
         */
        /**
         * The y position of the point.
         *
         * @type      {number}
         * @apioption annotations.crookedLine.typeOptions.points.y
         */
        /**
         * @type      {number}
         * @excluding positioner, events
         * @apioption annotations.crookedLine.typeOptions.points.controlPoint
         */
        /**
         * Line options.
         *
         * @excluding height, point, points, r, type, width
         */
        line: {
            fill: 'none'
        }
    },
    /**
     * @excluding positioner, events
     */
    controlPointOptions: {
        positioner: function (target) {
            const graphic = this.graphic, xy = Annotations_MockPoint.pointToPixels(target.points[this.index]);
            return {
                x: xy.x - (graphic.width || 0) / 2,
                y: xy.y - (graphic.height || 0) / 2
            };
        },
        events: {
            drag: function (e, target) {
                if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                    visiblePlotOnly: true
                })) {
                    const translation = this.mouseMoveToTranslation(e), typeOptions = target.options.typeOptions;
                    target.translatePoint(translation.x, translation.y, this.index);
                    // Update options:
                    typeOptions.points[this.index].x =
                        target.points[this.index].x;
                    typeOptions.points[this.index].y =
                        target.points[this.index].y;
                    target.redraw(false);
                }
            }
        }
    }
});
Annotations_Annotation.types.crookedLine = CrookedLine;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_CrookedLine = (CrookedLine);

;// ./code/es-modules/Extensions/Annotations/Types/ElliottWave.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: ElliottWave_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class ElliottWave extends Types_CrookedLine {
    /* *
     *
     * Functions
     *
     * */
    addLabels() {
        this.getPointsOptions().forEach((point, i) => {
            const typeOptions = this.options.typeOptions, label = this.initLabel(ElliottWave_merge(point.label, {
                text: typeOptions.labels[i],
                point: function (target) {
                    return target.annotation.points[i];
                }
            }), false);
            point.label = label.options;
        });
    }
}
ElliottWave.prototype.defaultOptions = ElliottWave_merge(Types_CrookedLine.prototype.defaultOptions, 
/**
 * An elliott wave annotation.
 *
 * @sample highcharts/annotations-advanced/elliott-wave/
 *         Elliott wave
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @optionparent annotations.elliottWave
 */
{
    typeOptions: {
        /**
         * @extends   annotations.crookedLine.labelOptions
         * @apioption annotations.elliottWave.typeOptions.points.label
         */
        /**
         * @ignore-option
         */
        labels: ['(0)', '(A)', '(B)', '(C)', '(D)', '(E)'],
        line: {
            strokeWidth: 1
        }
    },
    labelOptions: {
        align: 'center',
        allowOverlap: true,
        crop: true,
        overflow: 'none',
        type: 'rect',
        backgroundColor: 'none',
        borderWidth: 0,
        y: -5
    }
});
Annotations_Annotation.types.elliottWave = ElliottWave;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_ElliottWave = ((/* unused pure expression or super */ null && (ElliottWave)));

;// ./code/es-modules/Extensions/Annotations/Types/Tunnel.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */






const { merge: Tunnel_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function getSecondCoordinate(p1, p2, x) {
    return (p2.y - p1.y) / (p2.x - p1.x) * (x - p1.x) + p1.y;
}
/* *
 *
 *  Class
 *
 * */
class Tunnel extends Types_CrookedLine {
    /* *
     *
     * Functions
     *
     * */
    getPointsOptions() {
        const pointsOptions = Types_CrookedLine.prototype.getPointsOptions.call(this), yAxisIndex = this.options.typeOptions.yAxis || 0, yAxis = this.chart.yAxis[yAxisIndex];
        pointsOptions[2] = this.heightPointOptions(pointsOptions[1]);
        pointsOptions[3] = this.heightPointOptions(pointsOptions[0]);
        // In case of log axis, translate the bottom left point again, #16769
        if (yAxis && yAxis.logarithmic) {
            // Get the height in pixels
            const h = yAxis.toPixels(pointsOptions[2].y) -
                yAxis.toPixels(pointsOptions[1].y), 
            // Get the pixel position of the last point
            y3 = yAxis.toPixels(pointsOptions[0].y) + h;
            // Set the new value
            pointsOptions[3].y = yAxis.toValue(y3);
        }
        return pointsOptions;
    }
    getControlPointsOptions() {
        return this.getPointsOptions().slice(0, 2);
    }
    heightPointOptions(pointOptions) {
        const heightPointOptions = Tunnel_merge(pointOptions), typeOptions = this.options.typeOptions;
        heightPointOptions.y += typeOptions.height;
        return heightPointOptions;
    }
    addControlPoints() {
        Types_CrookedLine.prototype.addControlPoints.call(this);
        const options = this.options, typeOptions = options.typeOptions, controlPoint = new Annotations_ControlPoint(this.chart, this, Tunnel_merge(options.controlPointOptions, typeOptions.heightControlPoint), 2);
        this.controlPoints.push(controlPoint);
        typeOptions.heightControlPoint = controlPoint.options;
    }
    addShapes() {
        this.addLine();
        this.addBackground();
    }
    addLine() {
        const line = this.initShape(Tunnel_merge(this.options.typeOptions.line, {
            type: 'path',
            points: [
                this.points[0],
                this.points[1],
                function (target) {
                    const pointOptions = Annotations_MockPoint.pointToOptions(target.annotation.points[2]);
                    pointOptions.command = 'M';
                    return pointOptions;
                },
                this.points[3]
            ],
            className: 'highcharts-tunnel-lines'
        }), 0);
        this.options.typeOptions.line = line.options;
    }
    addBackground() {
        const background = this.initShape(Tunnel_merge(this.options.typeOptions.background, {
            type: 'path',
            points: this.points.slice(),
            className: 'highcharts-tunnel-background'
        }), 1);
        this.options.typeOptions.background = background.options;
    }
    /**
     * Translate start or end ("left" or "right") side of the tunnel.
     * @private
     * @param {number} dx
     * the amount of x translation
     * @param {number} dy
     * the amount of y translation
     * @param {boolean} [end]
     * whether to translate start or end side
     */
    translateSide(dx, dy, end) {
        const topIndex = Number(end), bottomIndex = topIndex === 0 ? 3 : 2;
        this.translatePoint(dx, dy, topIndex);
        this.translatePoint(dx, dy, bottomIndex);
    }
    /**
     * Translate height of the tunnel.
     * @private
     * @param {number} dh
     * the amount of height translation
     */
    translateHeight(dh) {
        this.translatePoint(0, dh, 2);
        this.translatePoint(0, dh, 3);
        this.options.typeOptions.height = this.points[3].y -
            this.points[0].y;
        this.userOptions.typeOptions.height = this.options.typeOptions.height;
    }
}
Tunnel.prototype.defaultOptions = Tunnel_merge(Types_CrookedLine.prototype.defaultOptions, 
/**
 * A tunnel annotation.
 *
 * @extends annotations.crookedLine
 * @sample highcharts/annotations-advanced/tunnel/
 *         Tunnel
 * @product highstock
 * @optionparent annotations.tunnel
 */
{
    typeOptions: {
        /**
         * Background options.
         *
         * @type {Object}
         * @excluding height, point, points, r, type, width, markerEnd,
         *            markerStart
         */
        background: {
            fill: 'rgba(130, 170, 255, 0.4)',
            strokeWidth: 0
        },
        line: {
            strokeWidth: 1
        },
        /**
         * The height of the annotation in terms of yAxis.
         */
        height: -2,
        /**
         * Options for the control point which controls
         * the annotation's height.
         *
         * @extends annotations.crookedLine.controlPointOptions
         * @excluding positioner, events
         */
        heightControlPoint: {
            positioner: function (target) {
                const startXY = Annotations_MockPoint.pointToPixels(target.points[2]), endXY = Annotations_MockPoint.pointToPixels(target.points[3]), x = (startXY.x + endXY.x) / 2;
                return {
                    x: x - (this.graphic.width || 0) / 2,
                    y: getSecondCoordinate(startXY, endXY, x) -
                        (this.graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                        visiblePlotOnly: true
                    })) {
                        target.translateHeight(this.mouseMoveToTranslation(e).y);
                        target.redraw(false);
                    }
                }
            }
        }
    },
    /**
     * @extends annotations.crookedLine.controlPointOptions
     * @excluding positioner, events
     */
    controlPointOptions: {
        events: {
            drag: function (e, target) {
                if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                    visiblePlotOnly: true
                })) {
                    const translation = this.mouseMoveToTranslation(e);
                    target.translateSide(translation.x, translation.y, !!this.index);
                    target.redraw(false);
                }
            }
        }
    }
});
Annotations_Annotation.types.tunnel = Tunnel;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_Tunnel = (Tunnel);

;// ./code/es-modules/Extensions/Annotations/Types/InfinityLine.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: InfinityLine_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class InfinityLine extends Types_CrookedLine {
    /* *
     *
     *  Static Functions
     *
     * */
    static edgePoint(startIndex, endIndex) {
        return function (target) {
            const annotation = target.annotation, type = annotation.options.typeOptions.type;
            let points = annotation.points;
            if (type === 'horizontalLine' || type === 'verticalLine') {
                // Horizontal and vertical lines have only one point,
                // make a copy of it:
                points = [
                    points[0],
                    new Annotations_MockPoint(annotation.chart, points[0].target, {
                        // Add 0 or 1 to x or y depending on type
                        x: points[0].x + +(type === 'horizontalLine'),
                        y: points[0].y + +(type === 'verticalLine'),
                        xAxis: points[0].options.xAxis,
                        yAxis: points[0].options.yAxis
                    })
                ];
            }
            return InfinityLine.findEdgePoint(points[startIndex], points[endIndex]);
        };
    }
    static findEdgeCoordinate(firstPoint, secondPoint, xOrY, edgePointFirstCoordinate) {
        const xOrYOpposite = xOrY === 'x' ? 'y' : 'x';
        // Solves equation for x or y
        // y - y1 = (y2 - y1) / (x2 - x1) * (x - x1)
        return ((secondPoint[xOrY] - firstPoint[xOrY]) *
            (edgePointFirstCoordinate - firstPoint[xOrYOpposite]) /
            (secondPoint[xOrYOpposite] - firstPoint[xOrYOpposite]) +
            firstPoint[xOrY]);
    }
    static findEdgePoint(firstPoint, secondPoint) {
        const chart = firstPoint.series.chart, xAxis = firstPoint.series.xAxis, yAxis = secondPoint.series.yAxis, firstPointPixels = Annotations_MockPoint.pointToPixels(firstPoint), secondPointPixels = Annotations_MockPoint.pointToPixels(secondPoint), deltaX = secondPointPixels.x - firstPointPixels.x, deltaY = secondPointPixels.y - firstPointPixels.y, xAxisMin = xAxis.left, xAxisMax = xAxisMin + xAxis.width, yAxisMin = yAxis.top, yAxisMax = yAxisMin + yAxis.height, xLimit = deltaX < 0 ? xAxisMin : xAxisMax, yLimit = deltaY < 0 ? yAxisMin : yAxisMax, edgePoint = {
            x: deltaX === 0 ? firstPointPixels.x : xLimit,
            y: deltaY === 0 ? firstPointPixels.y : yLimit
        };
        let edgePointX, edgePointY, swap;
        if (deltaX !== 0 && deltaY !== 0) {
            edgePointY = InfinityLine.findEdgeCoordinate(firstPointPixels, secondPointPixels, 'y', xLimit);
            edgePointX = InfinityLine.findEdgeCoordinate(firstPointPixels, secondPointPixels, 'x', yLimit);
            if (edgePointY >= yAxisMin && edgePointY <= yAxisMax) {
                edgePoint.x = xLimit;
                edgePoint.y = edgePointY;
            }
            else {
                edgePoint.x = edgePointX;
                edgePoint.y = yLimit;
            }
        }
        edgePoint.x -= chart.plotLeft;
        edgePoint.y -= chart.plotTop;
        if (firstPoint.series.chart.inverted) {
            swap = edgePoint.x;
            edgePoint.x = edgePoint.y;
            edgePoint.y = swap;
        }
        return edgePoint;
    }
    /* *
     *
     *  Functions
     *
     * */
    addShapes() {
        const typeOptions = this.options.typeOptions, points = [
            this.points[0],
            InfinityLine.endEdgePoint
        ];
        // Be case-insensitive (#15155) e.g.:
        // - line
        // - horizontalLine
        // - verticalLine
        if (typeOptions.type.match(/line/gi)) {
            points[0] = InfinityLine.startEdgePoint;
        }
        const line = this.initShape(InfinityLine_merge(typeOptions.line, {
            type: 'path',
            points: points,
            className: 'highcharts-infinity-lines'
        }), 0);
        typeOptions.line = line.options;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
InfinityLine.endEdgePoint = InfinityLine.edgePoint(0, 1);
InfinityLine.startEdgePoint = InfinityLine.edgePoint(1, 0);
InfinityLine.prototype.defaultOptions = InfinityLine_merge(Types_CrookedLine.prototype.defaultOptions, {});
Annotations_Annotation.types.infinityLine = InfinityLine;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_InfinityLine = (InfinityLine);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * An infinity line annotation.
 *
 * @sample highcharts/annotations-advanced/infinity-line/
 *         Infinity Line
 *
 * @extends   annotations.crookedLine
 * @product   highstock
 * @apioption annotations.infinityLine
 */
(''); // Keeps doclets above in transpiled file

;// ./code/es-modules/Extensions/Annotations/Types/TimeCycles.js
/* *
 *
 *  Authors: Rafal Sebestjanski and Pawel Lysy
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: TimeCycles_merge, isNumber: TimeCycles_isNumber, defined: TimeCycles_defined } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Function to create start of the path.
 * @param {number} x x position of the TimeCycles
 * @param {number} y y position of the TimeCycles
 * @return {string} path
 */
function getStartingPath(x, y) {
    return ['M', x, y];
}
/**
 * Function which generates the path of the halfcircle.
 *
 * @param {number} pixelInterval diameter of the circle in pixels
 * @param {number} numberOfCircles number of cricles
 * @param {number} startX x position of the first circle
 * @param {number} y y position of the bottom of the timeCycles
 * @return {string} path
 *
 */
function getCirclePath(pixelInterval, numberOfCircles, startX, y) {
    const path = [];
    for (let i = 1; i <= numberOfCircles; i++) {
        path.push([
            'A',
            pixelInterval / 2,
            pixelInterval / 2,
            0,
            1,
            1,
            startX + i * pixelInterval,
            y
        ]);
    }
    return path;
}
/* *
 *
 *  Class
 *
 * */
class TimeCycles extends Types_CrookedLine {
    /* *
     *
     *  Functions
     *
     * */
    init(annotation, userOptions, index) {
        if (TimeCycles_defined(userOptions.yAxis)) {
            userOptions.points.forEach((point) => {
                point.yAxis = userOptions.yAxis;
            });
        }
        if (TimeCycles_defined(userOptions.xAxis)) {
            userOptions.points.forEach((point) => {
                point.xAxis = userOptions.xAxis;
            });
        }
        super.init(annotation, userOptions, index);
    }
    setPath() {
        this.shapes[0].options.d = this.getPath();
    }
    getPath() {
        return [getStartingPath(this.startX, this.y)].concat(getCirclePath(this.pixelInterval, this.numberOfCircles, this.startX, this.y));
    }
    addShapes() {
        const typeOptions = this.options.typeOptions;
        this.setPathProperties();
        const shape = this.initShape(TimeCycles_merge(typeOptions.line, {
            type: 'path',
            d: this.getPath(),
            points: this.options.points,
            className: 'highcharts-timecycles-lines'
        }), 0);
        typeOptions.line = shape.options;
    }
    addControlPoints() {
        const options = this.options, typeOptions = options.typeOptions;
        options.controlPointOptions.style.cursor = this.chart.inverted ?
            'ns-resize' :
            'ew-resize';
        typeOptions.controlPointOptions.forEach((option) => {
            const controlPointsOptions = TimeCycles_merge(options.controlPointOptions, option);
            const controlPoint = new Annotations_ControlPoint(this.chart, this, controlPointsOptions, 0);
            this.controlPoints.push(controlPoint);
        });
    }
    setPathProperties() {
        const options = this.options.typeOptions, points = options.points;
        if (!points) {
            return;
        }
        const point1 = points[0], point2 = points[1], xAxisNumber = options.xAxis || 0, yAxisNumber = options.yAxis || 0, xAxis = this.chart.xAxis[xAxisNumber], yAxis = this.chart.yAxis[yAxisNumber], xValue1 = point1.x, yValue = point1.y, xValue2 = point2.x;
        if (!xValue1 || !xValue2) {
            return;
        }
        const y = TimeCycles_isNumber(yValue) ?
            yAxis.toPixels(yValue) :
            yAxis.top + yAxis.height, x = TimeCycles_isNumber(xValue1) ? xAxis.toPixels(xValue1) : xAxis.left, x2 = TimeCycles_isNumber(xValue2) ? xAxis.toPixels(xValue2) : xAxis.left + 30, xAxisLength = xAxis.len, pixelInterval = Math.round(Math.max(Math.abs(x2 - x), 2)), 
        // There can be 2 not full circles on the chart, so add 2.
        numberOfCircles = Math.floor(xAxisLength / pixelInterval) + 2, 
        // Calculate where the annotation should start drawing relative to
        // first point.
        pixelShift = (Math.floor((x - xAxis.left) / pixelInterval) + 1) * pixelInterval;
        this.startX = x - pixelShift;
        this.y = y;
        this.pixelInterval = pixelInterval;
        this.numberOfCircles = numberOfCircles;
    }
    redraw(animation) {
        this.setPathProperties();
        this.setPath();
        super.redraw(animation);
    }
}
TimeCycles.prototype.defaultOptions = TimeCycles_merge(Types_CrookedLine.prototype.defaultOptions, 
/**
 * The TimeCycles Annotation
 *
 * @sample highcharts/annotations-advanced/time-cycles/
 *         Time Cycles annotation
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @exclude      labelOptions
 * @optionparent annotations.timeCycles
 */
{
    typeOptions: {
        /**
         * @exclude   y
         * @product   highstock
         * @apioption annotations.timeCycles.typeOptions.points
         */
        controlPointOptions: [{
                positioner: function (target) {
                    const point = target.points[0], position = target.anchor(point).absolutePosition;
                    return {
                        x: position.x - (this.graphic.width || 0) / 2,
                        y: target.y - (this.graphic.height || 0)
                    };
                },
                events: {
                    drag: function (e, target) {
                        const position = target.anchor(target.points[0]).absolutePosition;
                        target.translatePoint(e.chartX - position.x, 0, 0);
                        target.redraw(false);
                    }
                }
            }, {
                positioner: function (target) {
                    const point = target.points[1], position = target.anchor(point).absolutePosition;
                    return {
                        x: position.x - (this.graphic.width || 0) / 2,
                        y: target.y - (this.graphic.height || 0)
                    };
                },
                events: {
                    drag: function (e, target) {
                        const position = target.anchor(target.points[1]).absolutePosition;
                        target.translatePoint(e.chartX - position.x, 0, 1);
                        target.redraw(false);
                    }
                }
            }]
    }
});
Annotations_Annotation.types.timeCycles = TimeCycles;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_TimeCycles = ((/* unused pure expression or super */ null && (TimeCycles)));

;// ./code/es-modules/Extensions/Annotations/Types/Fibonacci.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: Fibonacci_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function createPathDGenerator(retracementIndex, isBackground) {
    return function () {
        const annotation = this.annotation;
        if (!annotation.startRetracements || !annotation.endRetracements) {
            return [];
        }
        const leftTop = this.anchor(annotation.startRetracements[retracementIndex]).absolutePosition, rightTop = this.anchor(annotation.endRetracements[retracementIndex]).absolutePosition, d = [
            ['M', Math.round(leftTop.x), Math.round(leftTop.y)],
            ['L', Math.round(rightTop.x), Math.round(rightTop.y)]
        ];
        if (isBackground) {
            const rightBottom = this.anchor(annotation.endRetracements[retracementIndex - 1]).absolutePosition;
            const leftBottom = this.anchor(annotation.startRetracements[retracementIndex - 1]).absolutePosition;
            d.push(['L', Math.round(rightBottom.x), Math.round(rightBottom.y)], ['L', Math.round(leftBottom.x), Math.round(leftBottom.y)]);
        }
        return d;
    };
}
/* *
 *
 *  Class
 *
 * */
class Fibonacci extends Types_Tunnel {
    /* *
     *
     *  Functions
     *
     * */
    linkPoints() {
        super.linkPoints();
        this.linkRetracementsPoints();
        return;
    }
    linkRetracementsPoints() {
        const points = this.points, startDiff = points[0].y - points[3].y, endDiff = points[1].y - points[2].y, startX = points[0].x, endX = points[1].x;
        Fibonacci.levels.forEach((level, i) => {
            const startRetracement = points[0].y - startDiff * level, endRetracement = points[1].y - endDiff * level, index = this.options.typeOptions.reversed ?
                (Fibonacci.levels.length - i - 1) : i;
            this.startRetracements = this.startRetracements || [];
            this.endRetracements = this.endRetracements || [];
            this.linkRetracementPoint(index, startX, startRetracement, this.startRetracements);
            this.linkRetracementPoint(index, endX, endRetracement, this.endRetracements);
        });
    }
    linkRetracementPoint(pointIndex, x, y, retracements) {
        const point = retracements[pointIndex], typeOptions = this.options.typeOptions;
        if (!point) {
            retracements[pointIndex] = new Annotations_MockPoint(this.chart, this, {
                x: x,
                y: y,
                xAxis: typeOptions.xAxis,
                yAxis: typeOptions.yAxis
            });
        }
        else {
            point.options.x = x;
            point.options.y = y;
            point.refresh();
        }
    }
    addShapes() {
        Fibonacci.levels.forEach(function (_level, i) {
            const { backgroundColors, lineColor, lineColors } = this.options.typeOptions;
            this.initShape({
                type: 'path',
                d: createPathDGenerator(i),
                stroke: lineColors[i] || lineColor,
                className: 'highcharts-fibonacci-line'
            }, i);
            if (i > 0) {
                this.initShape({
                    type: 'path',
                    fill: backgroundColors[i - 1],
                    strokeWidth: 0,
                    d: createPathDGenerator(i, true),
                    className: 'highcharts-fibonacci-background-' + (i - 1)
                });
            }
        }, this);
    }
    addLabels() {
        Fibonacci.levels.forEach(function (level, i) {
            const options = this.options.typeOptions, label = this.initLabel(Fibonacci_merge(options.labels[i], {
                point: function (target) {
                    const point = Annotations_MockPoint.pointToOptions(target.annotation.startRetracements[i]);
                    return point;
                },
                text: level.toString()
            }));
            options.labels[i] = label.options;
        }, this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Fibonacci.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
Fibonacci.prototype.defaultOptions = Fibonacci_merge(Types_Tunnel.prototype.defaultOptions, 
/**
 * A fibonacci annotation.
 *
 * @sample highcharts/annotations-advanced/fibonacci/
 *         Fibonacci
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @optionparent annotations.fibonacci
 */
{
    typeOptions: {
        /**
         * Whether the annotation levels should be reversed. By default they
         * start from 0 and go to 1.
         *
         * @sample highcharts/annotations-advanced/fibonacci-reversed/
         *         Fibonacci annotation reversed
         *
         * @type {boolean}
         * @apioption annotations.fibonacci.typeOptions.reversed
         */
        reversed: false,
        /**
         * The height of the fibonacci in terms of yAxis.
         */
        height: 2,
        /**
         * An array of background colors:
         * Default to:
         * ```
         * [
         * 'rgba(130, 170, 255, 0.4)',
         * 'rgba(139, 191, 216, 0.4)',
         * 'rgba(150, 216, 192, 0.4)',
         * 'rgba(156, 229, 161, 0.4)',
         * 'rgba(162, 241, 130, 0.4)',
         * 'rgba(169, 255, 101, 0.4)'
         * ]
         * ```
         */
        backgroundColors: [
            'rgba(130, 170, 255, 0.4)',
            'rgba(139, 191, 216, 0.4)',
            'rgba(150, 216, 192, 0.4)',
            'rgba(156, 229, 161, 0.4)',
            'rgba(162, 241, 130, 0.4)',
            'rgba(169, 255, 101, 0.4)'
        ],
        /**
         * The color of line.
         */
        lineColor: "#999999" /* Palette.neutralColor40 */,
        /**
         * An array of colors for the lines.
         */
        lineColors: [],
        /**
         * An array with options for the labels.
         *
         * @type      {Array<*>}
         * @extends   annotations.crookedLine.labelOptions
         * @apioption annotations.fibonacci.typeOptions.labels
         */
        labels: []
    },
    labelOptions: {
        allowOverlap: true,
        align: 'right',
        backgroundColor: 'none',
        borderWidth: 0,
        crop: false,
        overflow: 'none',
        shape: 'rect',
        style: {
            color: 'grey'
        },
        verticalAlign: 'middle',
        y: 0
    }
});
Annotations_Annotation.types.fibonacci = Fibonacci;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_Fibonacci = ((/* unused pure expression or super */ null && (Fibonacci)));

;// ./code/es-modules/Extensions/Annotations/Types/FibonacciTimeZones.js
/* *
 *
 *  Author: Rafal Sebestjanski
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */







const { merge: FibonacciTimeZones_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
Method taken (and slightly changed) from the InfinityLine annotation.

It uses x coordinate to create two mock points on the same x. Then,
it uses some logic from InfinityLine to find equation of the line passing
through our two points and, using that equation, it finds and returns
the coordinates of where the line intersects the plot area edges.

This is being done for each fibonacci time zone line.


        this point here is found
            |
            v
    |---------*--------------------------------------------------------|
    |                                                                  |
    |                                                                  |
    |                                                                  |
    |                                                                  |
    |         *   copy of the primary point                            |
    |                                                                  |
    |         *   primary point (e.g. the one given in options)        |
    |                                                                  |
    |---------*--------------------------------------------------------|
        and this point here is found (intersection with the plot area edge)

* @private
*/
function edgePoint(startIndex, endIndex, fibonacciIndex) {
    return function (target) {
        const chart = target.annotation.chart, plotLeftOrTop = chart.inverted ? chart.plotTop : chart.plotLeft;
        let points = target.annotation.points;
        const xAxis = points[0].series.xAxis, 
        // Distance between the two first lines in pixels
        deltaX = points.length > 1 ?
            points[1].plotX - points[0].plotX : 0, 
        // `firstLine.x + fibb * offset`
        x = xAxis.toValue(points[0].plotX + plotLeftOrTop + fibonacciIndex * deltaX);
        // We need 2 mock points with the same x coordinate, different y
        points = [
            new Annotations_MockPoint(chart, points[0].target, {
                x: x,
                y: 0,
                xAxis: points[0].options.xAxis,
                yAxis: points[0].options.yAxis
            }),
            new Annotations_MockPoint(chart, points[0].target, {
                x: x,
                y: 1,
                xAxis: points[0].options.xAxis,
                yAxis: points[0].options.yAxis
            })
        ];
        return Types_InfinityLine.findEdgePoint(points[startIndex], points[endIndex]);
    };
}
/* *
 *
 *  Class
 *
 * */
class FibonacciTimeZones extends Types_CrookedLine {
    /* *
     *
     *  Functions
     *
     * */
    addShapes() {
        const numberOfLines = 11;
        let fibb = 1, nextFibb = 1;
        for (let i = 0; i < numberOfLines; i++) {
            // The fibb variable equals to 1 twice - correct it in the first
            // iteration so the lines don't overlap
            const correctedFibb = !i ? 0 : fibb, points = [
                edgePoint(1, 0, correctedFibb),
                edgePoint(0, 1, correctedFibb)
            ];
            // Calculate fibonacci
            nextFibb = fibb + nextFibb;
            fibb = nextFibb - fibb;
            // Save the second line for the control point
            if (i === 1) {
                this.secondLineEdgePoints = [points[0], points[1]];
            }
            this.initShape(FibonacciTimeZones_merge(this.options.typeOptions.line, {
                type: 'path',
                points: points,
                className: 'highcharts-fibonacci-timezones-lines'
            }), i // Shape's index. Can be found in annotation.shapes[i].index
            );
        }
    }
    addControlPoints() {
        const options = this.options, typeOptions = options.typeOptions, controlPoint = new Annotations_ControlPoint(this.chart, this, FibonacciTimeZones_merge(options.controlPointOptions, typeOptions.controlPointOptions), 0);
        this.controlPoints.push(controlPoint);
        typeOptions.controlPointOptions = controlPoint.options;
    }
}
FibonacciTimeZones.prototype.defaultOptions = FibonacciTimeZones_merge(Types_CrookedLine.prototype.defaultOptions, 
/**
 * The Fibonacci Time Zones annotation.
 *
 * @sample highcharts/annotations-advanced/fibonacci-time-zones/
 *         Fibonacci Time Zones
 *
 * @extends      annotations.crookedLine
 * @since        9.3.0
 * @product      highstock
 * @optionparent annotations.fibonacciTimeZones
 */
{
    typeOptions: {
        /**
         * @exclude   y
         * @since     9.3.0
         * @product   highstock
         * @apioption annotations.fibonacciTimeZones.typeOptions.points
         */
        // Options for showing in popup edit
        line: {
            /**
             * The color of the lines.
             *
             * @type      {string}
             * @since     9.3.0
             * @default   'rgba(0, 0, 0, 0.75)'
             * @apioption annotations.fibonacciTimeZones.typeOptions.line.stroke
             */
            stroke: 'rgba(0, 0, 0, 0.75)',
            /**
             * The width of the lines.
             *
             * @type      {number}
             * @since     9.3.0
             * @default   1
             * @apioption annotations.fibonacciTimeZones.typeOptions.line.strokeWidth
             */
            strokeWidth: 1,
            // Don't inherit fill (don't display in popup edit)
            fill: void 0
        },
        controlPointOptions: {
            positioner: function () {
                // The control point is in the middle of the second line
                const target = this.target, graphic = this.graphic, edgePoints = target.secondLineEdgePoints, args = { annotation: target }, firstEdgePointY = edgePoints[0](args).y, secondEdgePointY = edgePoints[1](args).y, plotLeft = this.chart.plotLeft, plotTop = this.chart.plotTop;
                let x = edgePoints[0](args).x, y = (firstEdgePointY + secondEdgePointY) / 2;
                if (this.chart.inverted) {
                    [x, y] = [y, x];
                }
                return {
                    x: plotLeft + x - (graphic.width || 0) / 2,
                    y: plotTop + y - (graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    const isInsidePlot = target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                        visiblePlotOnly: true
                    });
                    if (isInsidePlot) {
                        const translation = this.mouseMoveToTranslation(e);
                        target.translatePoint(translation.x, 0, 1);
                        target.redraw(false);
                    }
                }
            }
        }
    }
});
Annotations_Annotation.types.fibonacciTimeZones = FibonacciTimeZones;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_FibonacciTimeZones = ((/* unused pure expression or super */ null && (FibonacciTimeZones)));

;// ./code/es-modules/Extensions/Annotations/Types/Pitchfork.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { merge: Pitchfork_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class Pitchfork extends Types_InfinityLine {
    /* *
     *
     *  Static Functions
     *
     * */
    static outerLineEdgePoint(firstPointIndex) {
        return function (target) {
            const annotation = target.annotation, points = annotation.points;
            return Pitchfork.findEdgePoint(points[firstPointIndex], points[0], new Annotations_MockPoint(annotation.chart, target, annotation.midPointOptions()));
        };
    }
    static findEdgePoint(point, firstAnglePoint, secondAnglePoint) {
        const angle = Math.atan2((secondAnglePoint.plotY -
            firstAnglePoint.plotY), secondAnglePoint.plotX - firstAnglePoint.plotX), distance = 1e7;
        return {
            x: point.plotX + distance * Math.cos(angle),
            y: point.plotY + distance * Math.sin(angle)
        };
    }
    static middleLineEdgePoint(target) {
        const annotation = target.annotation, points = annotation.points;
        return Types_InfinityLine.findEdgePoint(points[0], new Annotations_MockPoint(annotation.chart, target, annotation.midPointOptions()));
    }
    /* *
     *
     *  Functions
     *
     * */
    midPointOptions() {
        const points = this.points;
        return {
            x: (points[1].x + points[2].x) / 2,
            y: (points[1].y + points[2].y) / 2,
            xAxis: points[0].series.xAxis,
            yAxis: points[0].series.yAxis
        };
    }
    addShapes() {
        this.addLines();
        this.addBackgrounds();
    }
    addLines() {
        const className = 'highcharts-pitchfork-lines';
        this.initShape({
            type: 'path',
            points: [
                this.points[0],
                Pitchfork.middleLineEdgePoint
            ],
            className
        }, 0);
        this.initShape({
            type: 'path',
            points: [
                this.points[1],
                Pitchfork.topLineEdgePoint
            ],
            className
        }, 1);
        this.initShape({
            type: 'path',
            points: [
                this.points[2],
                Pitchfork.bottomLineEdgePoint
            ],
            className
        }, 2);
    }
    addBackgrounds() {
        const shapes = this.shapes, typeOptions = this.options.typeOptions;
        const innerBackground = this.initShape(Pitchfork_merge(typeOptions.innerBackground, {
            type: 'path',
            points: [
                function (target) {
                    const annotation = target.annotation, points = annotation.points, midPointOptions = annotation.midPointOptions();
                    return {
                        x: (points[1].x + midPointOptions.x) / 2,
                        y: (points[1].y + midPointOptions.y) / 2,
                        xAxis: midPointOptions.xAxis,
                        yAxis: midPointOptions.yAxis
                    };
                },
                shapes[1].points[1],
                shapes[2].points[1],
                function (target) {
                    const annotation = target.annotation, points = annotation.points, midPointOptions = annotation.midPointOptions();
                    return {
                        x: (midPointOptions.x + points[2].x) / 2,
                        y: (midPointOptions.y + points[2].y) / 2,
                        xAxis: midPointOptions.xAxis,
                        yAxis: midPointOptions.yAxis
                    };
                }
            ],
            className: 'highcharts-pitchfork-inner-background'
        }), 3);
        const outerBackground = this.initShape(Pitchfork_merge(typeOptions.outerBackground, {
            type: 'path',
            points: [
                this.points[1],
                shapes[1].points[1],
                shapes[2].points[1],
                this.points[2]
            ],
            className: 'highcharts-pitchfork-outer-background'
        }), 4);
        typeOptions.innerBackground = innerBackground.options;
        typeOptions.outerBackground = outerBackground.options;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Pitchfork.topLineEdgePoint = Pitchfork.outerLineEdgePoint(1);
Pitchfork.bottomLineEdgePoint = Pitchfork.outerLineEdgePoint(0);
Pitchfork.prototype.defaultOptions = Pitchfork_merge(Types_InfinityLine.prototype.defaultOptions, 
/**
 * A pitchfork annotation.
 *
 * @sample highcharts/annotations-advanced/pitchfork/
 *         Pitchfork
 *
 * @extends      annotations.infinityLine
 * @product      highstock
 * @optionparent annotations.pitchfork
 */
{
    typeOptions: {
        /**
         * Inner background options.
         *
         * @extends   annotations.crookedLine.shapeOptions
         * @excluding height, r, type, width
         */
        innerBackground: {
            fill: 'rgba(130, 170, 255, 0.4)',
            strokeWidth: 0
        },
        /**
         * Outer background options.
         *
         * @extends   annotations.crookedLine.shapeOptions
         * @excluding height, r, type, width
         */
        outerBackground: {
            fill: 'rgba(156, 229, 161, 0.4)',
            strokeWidth: 0
        }
    }
});
Annotations_Annotation.types.pitchfork = Pitchfork;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_Pitchfork = ((/* unused pure expression or super */ null && (Pitchfork)));

;// ./code/es-modules/Extensions/Annotations/Types/VerticalLine.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { merge: VerticalLine_merge, pick: VerticalLine_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class VerticalLine extends Annotations_Annotation {
    /* *
     *
     *  Static Functions
     *
     * */
    static connectorFirstPoint(target) {
        const annotation = target.annotation, chart = annotation.chart, inverted = chart.inverted, point = annotation.points[0], left = VerticalLine_pick(point.series.yAxis && point.series.yAxis.left, 0), top = VerticalLine_pick(point.series.yAxis && point.series.yAxis.top, 0), offset = annotation.options.typeOptions.label.offset, y = Annotations_MockPoint.pointToPixels(point, true)[inverted ? 'x' : 'y'];
        return {
            x: point.x,
            xAxis: point.series.xAxis,
            y: y + offset +
                (inverted ? (left - chart.plotLeft) : (top - chart.plotTop))
        };
    }
    static connectorSecondPoint(target) {
        const annotation = target.annotation, chart = annotation.chart, inverted = chart.inverted, typeOptions = annotation.options.typeOptions, point = annotation.points[0], left = VerticalLine_pick(point.series.yAxis && point.series.yAxis.left, 0), top = VerticalLine_pick(point.series.yAxis && point.series.yAxis.top, 0), y = Annotations_MockPoint.pointToPixels(point, true)[inverted ? 'x' : 'y'];
        let yOffset = typeOptions.yOffset;
        if (typeOptions.label.offset < 0) {
            yOffset *= -1;
        }
        return {
            x: point.x,
            xAxis: point.series.xAxis,
            y: y + yOffset +
                (inverted ? (left - chart.plotLeft) : (top - chart.plotTop))
        };
    }
    /* *
     *
     *  Functions
     *
     * */
    getPointsOptions() {
        return [this.options.typeOptions.point];
    }
    addShapes() {
        const typeOptions = this.options.typeOptions, connector = this.initShape(VerticalLine_merge(typeOptions.connector, {
            type: 'path',
            points: [
                VerticalLine.connectorFirstPoint,
                VerticalLine.connectorSecondPoint
            ],
            className: 'highcharts-vertical-line'
        }), 0);
        typeOptions.connector = connector.options;
        this.userOptions.typeOptions.point = typeOptions.point;
    }
    addLabels() {
        const typeOptions = this.options.typeOptions, labelOptions = typeOptions.label;
        let x = 0, y = labelOptions.offset, verticalAlign = labelOptions.offset < 0 ? 'bottom' : 'top', align = 'center';
        if (this.chart.inverted) {
            x = labelOptions.offset;
            y = 0;
            verticalAlign = 'middle';
            align = labelOptions.offset < 0 ? 'right' : 'left';
        }
        const label = this.initLabel(VerticalLine_merge(labelOptions, {
            verticalAlign: verticalAlign,
            align: align,
            x: x,
            y: y
        }));
        typeOptions.label = label.options;
    }
}
VerticalLine.prototype.defaultOptions = VerticalLine_merge(Annotations_Annotation.prototype.defaultOptions, 
/**
 * A vertical line annotation.
 *
 * @sample highcharts/annotations-advanced/vertical-line/
 *         Vertical line
 *
 * @extends      annotations.crookedLine
 * @excluding    labels, shapes, controlPointOptions
 * @product      highstock
 * @optionparent annotations.verticalLine
 */
{
    typeOptions: {
        /**
         * @ignore
         */
        yOffset: 10,
        /**
         * Label options.
         *
         * @extends annotations.crookedLine.labelOptions
         */
        label: {
            offset: -40,
            point: function (target) {
                return target.annotation.points[0];
            },
            allowOverlap: true,
            backgroundColor: 'none',
            borderWidth: 0,
            crop: true,
            overflow: 'none',
            shape: 'rect',
            text: '{y:.2f}'
        },
        /**
         * Connector options.
         *
         * @extends   annotations.crookedLine.shapeOptions
         * @excluding height, r, type, width
         */
        connector: {
            strokeWidth: 1,
            markerEnd: 'arrow'
        }
    }
});
Annotations_Annotation.types.verticalLine = VerticalLine;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_VerticalLine = ((/* unused pure expression or super */ null && (VerticalLine)));

;// ./code/es-modules/Extensions/Annotations/Types/Measure.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { defined: Measure_defined, extend: Measure_extend, isNumber: Measure_isNumber, merge: Measure_merge, pick: Measure_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function average() {
    let average = '';
    if (this.max !== '' && this.min !== '') {
        average = (this.max + this.min) / 2;
    }
    return average;
}
/**
 * @private
 */
function bins() {
    const series = this.chart.series, ext = getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
    let bins = 0, isCalculated = false; // To avoid Infinity in formatter
    series.forEach((serie) => {
        if (serie.visible &&
            serie.options.id !== 'highcharts-navigator-series') {
            serie.points.forEach((point) => {
                if (!point.isNull &&
                    point.x > ext.xAxisMin &&
                    point.x <= ext.xAxisMax &&
                    point.y > ext.yAxisMin &&
                    point.y <= ext.yAxisMax) {
                    bins++;
                    isCalculated = true;
                }
            });
        }
    });
    if (!isCalculated) {
        bins = '';
    }
    return bins;
}
/**
 * Default formatter of label's content
 * @private
 */
function defaultFormatter() {
    return 'Min: ' + this.min +
        '<br>Max: ' + this.max +
        '<br>Average: ' + this.average +
        '<br>Bins: ' + this.bins;
}
/**
 * Set values for xAxisMin, xAxisMax, yAxisMin, yAxisMax, also
 * when chart is inverted
 * @private
 */
function getExtremes(xAxisMin, xAxisMax, yAxisMin, yAxisMax) {
    return {
        xAxisMin: Math.min(xAxisMax, xAxisMin),
        xAxisMax: Math.max(xAxisMax, xAxisMin),
        yAxisMin: Math.min(yAxisMax, yAxisMin),
        yAxisMax: Math.max(yAxisMax, yAxisMin)
    };
}
/**
 * Set current xAxisMin, xAxisMax, yAxisMin, yAxisMax.
 * Calculations of measure values (min, max, average, bins).
 * @private
 * @param {Highcharts.Axis} axis
 *        X or y axis reference
 * @param {number} value
 *        Point's value (x or y)
 * @param {number} offset
 *        Amount of pixels
 */
function getPointPos(axis, value, offset) {
    return axis.toValue(axis.toPixels(value) + offset);
}
/**
 * Set starting points
 * @private
 */
function Measure_init() {
    const options = this.options.typeOptions, chart = this.chart, inverted = chart.inverted, xAxis = chart.xAxis[options.xAxis], yAxis = chart.yAxis[options.yAxis], bck = options.background, width = inverted ? bck.height : bck.width, height = inverted ? bck.width : bck.height, selectType = options.selectType, top = inverted ? xAxis.left : yAxis.top, // #13664
    left = inverted ? yAxis.top : xAxis.left; // #13664
    this.startXMin = options.point.x;
    this.startYMin = options.point.y;
    if (Measure_isNumber(width)) {
        this.startXMax = this.startXMin + width;
    }
    else {
        this.startXMax = getPointPos(xAxis, this.startXMin, parseFloat(width));
    }
    if (Measure_isNumber(height)) {
        this.startYMax = this.startYMin - height;
    }
    else {
        this.startYMax = getPointPos(yAxis, this.startYMin, parseFloat(height));
    }
    // X / y selection type
    if (selectType === 'x') {
        this.startYMin = yAxis.toValue(top);
        this.startYMax = yAxis.toValue(top + yAxis.len);
    }
    else if (selectType === 'y') {
        this.startXMin = xAxis.toValue(left);
        this.startXMax = xAxis.toValue(left + xAxis.len);
    }
}
/**
 * @private
 */
function max() {
    const series = this.chart.series, ext = getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
    let max = -Infinity, isCalculated = false; // To avoid Infinity in formatter
    series.forEach((serie) => {
        if (serie.visible &&
            serie.options.id !== 'highcharts-navigator-series') {
            serie.points.forEach((point) => {
                if (!point.isNull &&
                    point.y > max &&
                    point.x > ext.xAxisMin &&
                    point.x <= ext.xAxisMax &&
                    point.y > ext.yAxisMin &&
                    point.y <= ext.yAxisMax) {
                    max = point.y;
                    isCalculated = true;
                }
            });
        }
    });
    if (!isCalculated) {
        max = '';
    }
    return max;
}
/**
 * Definitions of calculations (min, max, average, bins)
 * @private
 */
function min() {
    const series = this.chart.series, ext = getExtremes(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
    let min = Infinity, isCalculated = false; // To avoid Infinity in formatter
    series.forEach((serie) => {
        if (serie.visible &&
            serie.options.id !== 'highcharts-navigator-series') {
            serie.points.forEach((point) => {
                if (!point.isNull &&
                    point.y < min &&
                    point.x > ext.xAxisMin &&
                    point.x <= ext.xAxisMax &&
                    point.y > ext.yAxisMin &&
                    point.y <= ext.yAxisMax) {
                    min = point.y;
                    isCalculated = true;
                }
            });
        }
    });
    if (!isCalculated) {
        min = '';
    }
    return min;
}
/**
 * Set current xAxisMin, xAxisMax, yAxisMin, yAxisMax.
 * Calculations of measure values (min, max, average, bins).
 * @private
 * @param {boolean} [resize]
 *        Flag if shape is resized.
 */
function recalculate(resize) {
    const options = this.options.typeOptions, xAxis = this.chart.xAxis[options.xAxis], yAxis = this.chart.yAxis[options.yAxis], offsetX = this.offsetX, offsetY = this.offsetY;
    this.xAxisMin = getPointPos(xAxis, this.startXMin, offsetX);
    this.xAxisMax = getPointPos(xAxis, this.startXMax, offsetX);
    this.yAxisMin = getPointPos(yAxis, this.startYMin, offsetY);
    this.yAxisMax = getPointPos(yAxis, this.startYMax, offsetY);
    this.min = min.call(this);
    this.max = max.call(this);
    this.average = average.call(this);
    this.bins = bins.call(this);
    if (resize) {
        this.resize(0, 0);
    }
}
/**
 * Update position of start points
 * (startXMin, startXMax, startYMin, startYMax)
 * @private
 * @param {boolean} redraw
 *        Flag if shape is redraw
 * @param {boolean} resize
 *        Flag if shape is resized
 * @param {number} cpIndex
 *        Index of controlPoint
 */
function updateStartPoints(redraw, resize, cpIndex, dx, dy) {
    const options = this.options.typeOptions, selectType = options.selectType, xAxis = this.chart.xAxis[options.xAxis], yAxis = this.chart.yAxis[options.yAxis], startXMin = this.startXMin, startXMax = this.startXMax, startYMin = this.startYMin, startYMax = this.startYMax, offsetX = this.offsetX, offsetY = this.offsetY;
    if (resize) {
        if (selectType === 'x') {
            if (cpIndex === 0) {
                this.startXMin = getPointPos(xAxis, startXMin, dx);
            }
            else {
                this.startXMax = getPointPos(xAxis, startXMax, dx);
            }
        }
        else if (selectType === 'y') {
            if (cpIndex === 0) {
                this.startYMin = getPointPos(yAxis, startYMin, dy);
            }
            else {
                this.startYMax = getPointPos(yAxis, startYMax, dy);
            }
        }
        else {
            this.startXMax = getPointPos(xAxis, startXMax, dx);
            this.startYMax = getPointPos(yAxis, startYMax, dy);
        }
    }
    if (redraw) {
        this.startXMin = getPointPos(xAxis, startXMin, offsetX);
        this.startXMax = getPointPos(xAxis, startXMax, offsetX);
        this.startYMin = getPointPos(yAxis, startYMin, offsetY);
        this.startYMax = getPointPos(yAxis, startYMax, offsetY);
        this.offsetX = 0;
        this.offsetY = 0;
    }
    this.options.typeOptions.point = {
        x: this.startXMin,
        y: this.startYMin
    };
    // We need to update userOptions as well as they are used in
    // the Annotation.update() method to initialize the annotation, #19121.
    this.userOptions.typeOptions.point = {
        x: this.startXMin,
        y: this.startYMin
    };
}
/* *
 *
 *  Class
 *
 * */
class Measure extends Annotations_Annotation {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Init annotation object.
     * @private
     */
    init(annotationOrChart, userOptions, index) {
        super.init(annotationOrChart, userOptions, index);
        this.offsetX = 0;
        this.offsetY = 0;
        this.resizeX = 0;
        this.resizeY = 0;
        Measure_init.call(this);
        this.addValues();
        this.addShapes();
    }
    /**
     * Overrides default setter to get axes from typeOptions.
     * @private
     */
    setClipAxes() {
        this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
        this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis];
    }
    /**
     * Get measure points configuration objects.
     * @private
     */
    pointsOptions() {
        return this.options.points;
    }
    /**
     * Get points configuration objects for shapes.
     * @private
     */
    shapePointsOptions() {
        const options = this.options.typeOptions, xAxis = options.xAxis, yAxis = options.yAxis;
        return [
            {
                x: this.xAxisMin,
                y: this.yAxisMin,
                xAxis: xAxis,
                yAxis: yAxis
            },
            {
                x: this.xAxisMax,
                y: this.yAxisMin,
                xAxis: xAxis,
                yAxis: yAxis
            },
            {
                x: this.xAxisMax,
                y: this.yAxisMax,
                xAxis: xAxis,
                yAxis: yAxis
            },
            {
                x: this.xAxisMin,
                y: this.yAxisMax,
                xAxis: xAxis,
                yAxis: yAxis
            },
            {
                command: 'Z'
            }
        ];
    }
    addControlPoints() {
        const inverted = this.chart.inverted, options = this.options.controlPointOptions, selectType = this.options.typeOptions.selectType;
        if (!Measure_defined(this.userOptions.controlPointOptions &&
            this.userOptions.controlPointOptions.style.cursor)) {
            if (selectType === 'x') {
                options.style.cursor = inverted ? 'ns-resize' : 'ew-resize';
            }
            else if (selectType === 'y') {
                options.style.cursor = inverted ? 'ew-resize' : 'ns-resize';
            }
        }
        let controlPoint = new Annotations_ControlPoint(this.chart, this, this.options.controlPointOptions, 0);
        this.controlPoints.push(controlPoint);
        // Add extra controlPoint for horizontal and vertical range
        if (selectType !== 'xy') {
            controlPoint = new Annotations_ControlPoint(this.chart, this, this.options.controlPointOptions, 1);
            this.controlPoints.push(controlPoint);
        }
    }
    /**
     * Add label with calculated values (min, max, average, bins).
     * @private
     * @param {boolean} [resize]
     * The flag for resize shape
     */
    addValues(resize) {
        const typeOptions = this.options.typeOptions, formatter = typeOptions.label.formatter;
        // Set xAxisMin, xAxisMax, yAxisMin, yAxisMax
        recalculate.call(this, resize);
        if (!typeOptions.label.enabled) {
            return;
        }
        if (this.labels.length > 0) {
            this.labels[0].text = ((formatter && formatter.call(this)) ||
                defaultFormatter.call(this));
        }
        else {
            this.initLabel(Measure_extend({
                shape: 'rect',
                backgroundColor: 'none',
                color: 'black',
                borderWidth: 0,
                dashStyle: 'Dash',
                overflow: 'allow',
                align: 'left',
                y: 0,
                x: 0,
                verticalAlign: 'top',
                crop: true,
                xAxis: 0,
                yAxis: 0,
                point: function (target) {
                    const annotation = target.annotation, options = target.options;
                    return {
                        x: annotation.xAxisMin,
                        y: annotation.yAxisMin,
                        xAxis: Measure_pick(typeOptions.xAxis, options.xAxis),
                        yAxis: Measure_pick(typeOptions.yAxis, options.yAxis)
                    };
                },
                text: ((formatter && formatter.call(this)) ||
                    defaultFormatter.call(this))
            }, typeOptions.label), void 0);
        }
    }
    /**
     * Crosshair, background (rect).
     * @private
     */
    addShapes() {
        this.addCrosshairs();
        this.addBackground();
    }
    /**
     * Add background shape.
     * @private
     */
    addBackground() {
        const shapePoints = this.shapePointsOptions();
        if (typeof shapePoints[0].x === 'undefined') {
            return;
        }
        this.initShape(Measure_extend({
            type: 'path',
            points: shapePoints,
            className: 'highcharts-measure-background'
        }, this.options.typeOptions.background), 2);
    }
    /**
     * Add internal crosshair shapes (on top and bottom).
     * @private
     */
    addCrosshairs() {
        const chart = this.chart, options = this.options.typeOptions, point = this.options.typeOptions.point, xAxis = chart.xAxis[options.xAxis], yAxis = chart.yAxis[options.yAxis], inverted = chart.inverted, defaultOptions = {
            point: point,
            type: 'path'
        };
        let xAxisMin = xAxis.toPixels(this.xAxisMin), xAxisMax = xAxis.toPixels(this.xAxisMax), yAxisMin = yAxis.toPixels(this.yAxisMin), yAxisMax = yAxis.toPixels(this.yAxisMax), pathH = [], pathV = [], crosshairOptionsX, crosshairOptionsY, temp;
        if (inverted) {
            temp = xAxisMin;
            xAxisMin = yAxisMin;
            yAxisMin = temp;
            temp = xAxisMax;
            xAxisMax = yAxisMax;
            yAxisMax = temp;
        }
        // Horizontal line
        if (options.crosshairX.enabled) {
            pathH = [[
                    'M',
                    xAxisMin,
                    yAxisMin + ((yAxisMax - yAxisMin) / 2)
                ], [
                    'L',
                    xAxisMax,
                    yAxisMin + ((yAxisMax - yAxisMin) / 2)
                ]];
        }
        // Vertical line
        if (options.crosshairY.enabled) {
            pathV = [[
                    'M',
                    xAxisMin + ((xAxisMax - xAxisMin) / 2),
                    yAxisMin
                ], [
                    'L',
                    xAxisMin + ((xAxisMax - xAxisMin) / 2),
                    yAxisMax
                ]];
        }
        // Update existed crosshair
        if (this.shapes.length > 0) {
            this.shapes[0].options.d = pathH;
            this.shapes[1].options.d = pathV;
        }
        else {
            // Add new crosshairs
            crosshairOptionsX = Measure_merge(defaultOptions, { className: 'highcharts-measure-crosshair-x' }, options.crosshairX);
            crosshairOptionsY = Measure_merge(defaultOptions, { className: 'highcharts-measure-crosshair-y' }, options.crosshairY);
            this.initShape(Measure_extend({ d: pathH }, crosshairOptionsX), 0);
            this.initShape(Measure_extend({ d: pathV }, crosshairOptionsY), 1);
        }
    }
    onDrag(e) {
        const translation = this.mouseMoveToTranslation(e), selectType = this.options.typeOptions.selectType, x = selectType === 'y' ? 0 : translation.x, y = selectType === 'x' ? 0 : translation.y;
        this.translate(x, y);
        this.offsetX += x;
        this.offsetY += y;
        // Animation, resize, setStartPoints
        this.redraw(false, false, true);
    }
    /**
     * Translate start or end ("left" or "right") side of the measure.
     * Update start points (startXMin, startXMax, startYMin, startYMax)
     * @private
     * @param {number} dx
     * the amount of x translation
     * @param {number} dy
     * the amount of y translation
     * @param {number} cpIndex
     * index of control point
     * @param {Highcharts.AnnotationDraggableValue} selectType
     * x / y / xy
     */
    resize(dx, dy, cpIndex, selectType) {
        // Background shape
        const bckShape = this.shapes[2];
        if (selectType === 'x') {
            if (cpIndex === 0) {
                bckShape.translatePoint(dx, 0, 0);
                bckShape.translatePoint(dx, dy, 3);
            }
            else {
                bckShape.translatePoint(dx, 0, 1);
                bckShape.translatePoint(dx, dy, 2);
            }
        }
        else if (selectType === 'y') {
            if (cpIndex === 0) {
                bckShape.translatePoint(0, dy, 0);
                bckShape.translatePoint(0, dy, 1);
            }
            else {
                bckShape.translatePoint(0, dy, 2);
                bckShape.translatePoint(0, dy, 3);
            }
        }
        else {
            bckShape.translatePoint(dx, 0, 1);
            bckShape.translatePoint(dx, dy, 2);
            bckShape.translatePoint(0, dy, 3);
        }
        updateStartPoints.call(this, false, true, cpIndex, dx, dy);
        this.options.typeOptions.background.height = Math.abs(this.startYMax - this.startYMin);
        this.options.typeOptions.background.width = Math.abs(this.startXMax - this.startXMin);
    }
    /**
     * Redraw event which render elements and update start points if needed.
     * @private
     * @param {boolean} animation
     * @param {boolean} [resize]
     * flag if resized
     * @param {boolean} [setStartPoints]
     * update position of start points
     */
    redraw(animation, resize, setStartPoints) {
        this.linkPoints();
        if (!this.graphic) {
            this.render();
        }
        if (setStartPoints) {
            updateStartPoints.call(this, true, false);
        }
        // #11174 - clipBox was not recalculate during resize / redraw
        if (this.clipRect) {
            this.clipRect.animate(this.getClipBox());
        }
        this.addValues(resize);
        this.addCrosshairs();
        this.redrawItems(this.shapes, animation);
        this.redrawItems(this.labels, animation);
        const backgroundOptions = this.options.typeOptions.background;
        if (backgroundOptions?.strokeWidth &&
            this.shapes[2]?.graphic) {
            const offset = (backgroundOptions.strokeWidth) / 2;
            const background = this.shapes[2];
            const path = background.graphic.pathArray;
            const p1 = path[0];
            const p2 = path[1];
            const p3 = path[2];
            const p4 = path[3];
            p1[1] = (p1[1] || 0) + offset;
            p2[1] = (p2[1] || 0) - offset;
            p3[1] = (p3[1] || 0) - offset;
            p4[1] = (p4[1] || 0) + offset;
            p1[2] = (p1[2] || 0) + offset;
            p2[2] = (p2[2] || 0) + offset;
            p3[2] = (p3[2] || 0) - offset;
            p4[2] = (p4[2] || 0) - offset;
            background.graphic.attr({
                d: path
            });
        }
        // Redraw control point to run positioner
        this.controlPoints.forEach((controlPoint) => controlPoint.redraw());
    }
    translate(dx, dy) {
        this.shapes.forEach((item) => item.translate(dx, dy));
    }
}
Measure.prototype.defaultOptions = Measure_merge(Annotations_Annotation.prototype.defaultOptions, 
/**
 * A measure annotation.
 *
 * @extends annotations.crookedLine
 * @excluding labels, labelOptions, shapes, shapeOptions
 * @sample highcharts/annotations-advanced/measure/
 *         Measure
 * @product highstock
 * @optionparent annotations.measure
 */
{
    typeOptions: {
        /**
         * Decides in what dimensions the user can resize by dragging the
         * mouse. Can be one of x, y or xy.
         */
        selectType: 'xy',
        /**
         * This number defines which xAxis the point is connected to.
         * It refers to either the axis id or the index of the axis
         * in the xAxis array.
         */
        xAxis: 0,
        /**
         * This number defines which yAxis the point is connected to.
         * It refers to either the axis id or the index of the axis
         * in the yAxis array.
         */
        yAxis: 0,
        background: {
            /**
             * The color of the rectangle.
             */
            fill: 'rgba(130, 170, 255, 0.4)',
            /**
             * The width of border.
             */
            strokeWidth: 0,
            /**
             * The color of border.
             */
            stroke: void 0
        },
        /**
         * Configure a crosshair that is horizontally placed in middle of
         * rectangle.
         *
         */
        crosshairX: {
            /**
             * Enable or disable the horizontal crosshair.
             *
             */
            enabled: true,
            /**
             * The Z index of the crosshair in annotation.
             */
            zIndex: 6,
            /**
             * The dash or dot style of the crosshair's line. For possible
             * values, see
             * [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
             *
             * @type    {Highcharts.DashStyleValue}
             * @default Dash
             */
            dashStyle: 'Dash',
            /**
             * The marker-end defines the arrowhead that will be drawn
             * at the final vertex of the given crosshair's path.
             *
             * @type       {string}
             * @default    arrow
             */
            markerEnd: 'arrow'
        },
        /**
         * Configure a crosshair that is vertically placed in middle of
         * rectangle.
         */
        crosshairY: {
            /**
             * Enable or disable the vertical crosshair.
             *
             */
            enabled: true,
            /**
             * The Z index of the crosshair in annotation.
             */
            zIndex: 6,
            /**
             * The dash or dot style of the crosshair's line. For possible
             * values, see
             * [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Dash
             * @apioption annotations.measure.typeOptions.crosshairY.dashStyle
             *
             */
            dashStyle: 'Dash',
            /**
             * The marker-end defines the arrowhead that will be drawn
             * at the final vertex of the given crosshair's path.
             *
             * @type       {string}
             * @default    arrow
             * @validvalue ["none", "arrow"]
             *
             */
            markerEnd: 'arrow'
        },
        label: {
            /**
             * Enable or disable the label text (min, max, average,
             * bins values).
             *
             * Defaults to true.
             */
            enabled: true,
            /**
             * CSS styles for the measure label.
             *
             * @type    {Highcharts.CSSObject}
             * @default {"color": "#666666", "fontSize": "11px"}
             */
            style: {
                fontSize: '0.7em',
                color: "#666666" /* Palette.neutralColor60 */
            },
            /**
             * Formatter function for the label text.
             *
             * Available data are:
             *
             * <table>
             *
             * <tbody>
             *
             * <tr>
             *
             * <td>`this.min`</td>
             *
             * <td>The minimum value of the points in the selected
             * range.</td>
             *
             * </tr>
             *
             * <tr>
             *
             * <td>`this.max`</td>
             *
             * <td>The maximum value of the points in the selected
             * range.</td>
             *
             * </tr>
             *
             * <tr>
             *
             * <td>`this.average`</td>
             *
             * <td>The average value of the points in the selected
             * range.</td>
             *
             * </tr>
             *
             * <tr>
             *
             * <td>`this.bins`</td>
             *
             * <td>The amount of the points in the selected range.</td>
             *
             * </tr>
             *
             * </table>
             *
             * @type {Function}
             *
             */
            formatter: void 0
        }
    },
    controlPointOptions: {
        positioner: function (target) {
            const cpIndex = this.index, chart = target.chart, options = target.options, typeOptions = options.typeOptions, selectType = typeOptions.selectType, controlPointOptions = options.controlPointOptions, inverted = chart.inverted, xAxis = chart.xAxis[typeOptions.xAxis], yAxis = chart.yAxis[typeOptions.yAxis], ext = getExtremes(target.xAxisMin, target.xAxisMax, target.yAxisMin, target.yAxisMax);
            let targetX = target.xAxisMax, targetY = target.yAxisMax, x, y;
            if (selectType === 'x') {
                targetY = (ext.yAxisMax + ext.yAxisMin) / 2;
                // First control point
                if (cpIndex === 0) {
                    targetX = target.xAxisMin;
                }
            }
            if (selectType === 'y') {
                targetX = ext.xAxisMin +
                    ((ext.xAxisMax - ext.xAxisMin) / 2);
                // First control point
                if (cpIndex === 0) {
                    targetY = target.yAxisMin;
                }
            }
            if (inverted) {
                x = yAxis.toPixels(targetY);
                y = xAxis.toPixels(targetX);
            }
            else {
                x = xAxis.toPixels(targetX);
                y = yAxis.toPixels(targetY);
            }
            return {
                x: x - (controlPointOptions.width / 2),
                y: y - (controlPointOptions.height / 2)
            };
        },
        events: {
            drag: function (e, target) {
                const translation = this.mouseMoveToTranslation(e), selectType = target.options.typeOptions.selectType, index = this.index, x = selectType === 'y' ? 0 : translation.x, y = selectType === 'x' ? 0 : translation.y;
                target.resize(x, y, index, selectType);
                target.resizeX += x;
                target.resizeY += y;
                target.redraw(false, true);
            }
        }
    }
});
Annotations_Annotation.types.measure = Measure;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Types_Measure = ((/* unused pure expression or super */ null && (Measure)));

;// ./code/es-modules/masters/modules/annotations-advanced.src.js
/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/annotations-advanced
 * @requires highcharts
 *
 * Annotations module
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */














/* harmony default export */ const annotations_advanced_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});