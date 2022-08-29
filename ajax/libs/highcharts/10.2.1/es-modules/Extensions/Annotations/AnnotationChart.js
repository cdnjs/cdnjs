/* *
 *
 *  (c) 2009-2021 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, erase = U.erase, find = U.find, fireEvent = U.fireEvent, pick = U.pick, wrap = U.wrap;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
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
    var annotation = this.initAnnotation(userOptions);
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
    var chart = this;
    chart.plotBoxClip = this.renderer.clipRect(this.plotBox);
    chart.controlPointsGroup = chart.renderer
        .g('control-points')
        .attr({ zIndex: 99 })
        .clip(chart.plotBoxClip)
        .add();
    chart.options.annotations.forEach(function (annotationOptions, i) {
        if (
        // Verify that it has not been previously added in a responsive rule
        !chart.annotations.some(function (annotation) {
            return annotation.options === annotationOptions;
        })) {
            var annotation = chart.initAnnotation(annotationOptions);
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
        var annotations = chart.annotations, csvColumnHeaderFormatter = ((this.options.exporting &&
            this.options.exporting.csv) ||
            {}).columnHeaderFormatter, 
        // If second row doesn't have xValues
        // then it is a title row thus multiple level header is in use.
        multiLevelHeaders = !event.dataRows[1].xValues, annotationHeader = (chart.options.lang &&
            chart.options.lang.exportData &&
            chart.options.lang.exportData.annotationHeader), columnHeaderFormatter = function (index) {
            var s;
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
        annotations.forEach(function (annotation) {
            if (annotation.options.labelOptions &&
                annotation.options.labelOptions.includeInDataExport) {
                annotation.labels.forEach(function (label) {
                    if (label.options.text) {
                        var annotationText_1 = label.options.text;
                        label.points.forEach(function (points) {
                            var annotationX = points.x, xAxisIndex = points.series.xAxis ?
                                points.series.xAxis.options.index :
                                -1;
                            var wasAdded = false;
                            // Annotation not connected to any xAxis -
                            // add new row.
                            if (xAxisIndex === -1) {
                                var n = event.dataRows[0].length, newRow = new Array(n);
                                for (var i = 0; i < n; ++i) {
                                    newRow[i] = '';
                                }
                                newRow.push(annotationText_1);
                                newRow.xValues = [];
                                newRow.xValues[xAxisIndex] = annotationX;
                                event.dataRows.push(newRow);
                                wasAdded = true;
                            }
                            // Annotation placed on a exported data point
                            // - add new column
                            if (!wasAdded) {
                                event.dataRows.forEach(function (row) {
                                    if (!wasAdded &&
                                        row.xValues &&
                                        xAxisIndex !== void 0 &&
                                        annotationX === row.xValues[xAxisIndex]) {
                                        if (joinAnnotations &&
                                            row.length > startRowLength) {
                                            row[row.length - 1] += (annotationSeparator +
                                                annotationText_1);
                                        }
                                        else {
                                            row.push(annotationText_1);
                                        }
                                        wasAdded = true;
                                    }
                                });
                            }
                            // Annotation not placed on any exported data point,
                            // but connected to the xAxis - add new row
                            if (!wasAdded) {
                                var n = event.dataRows[0].length, newRow = new Array(n);
                                for (var i = 0; i < n; ++i) {
                                    newRow[i] = '';
                                }
                                newRow[0] = annotationX;
                                newRow.push(annotationText_1);
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
        var maxRowLen = 0;
        event.dataRows.forEach(function (row) {
            maxRowLen = Math.max(maxRowLen, row.length);
        });
        var newRows = maxRowLen - event.dataRows[0].length;
        for (var i = 0; i < newRows; i++) {
            var header = columnHeaderFormatter(i + 1);
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
    this.annotations.forEach(function (annotation) {
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
    var annotations = this.annotations, annotation = (idOrAnnotation.coll === 'annotations') ?
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
    var chart = this;
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
        if (composedClasses.indexOf(ChartClass) === -1) {
            composedClasses.push(ChartClass);
            addEvent(ChartClass, 'afterInit', onChartAfterInit);
            var chartProto = ChartClass.prototype;
            chartProto.addAnnotation = chartAddAnnotation;
            chartProto.callbacks.push(chartCallback);
            chartProto.collectionsWithInit.annotations = [chartAddAnnotation];
            chartProto.collectionsWithUpdate.push('annotations');
            chartProto.drawAnnotations = chartDrawAnnotations;
            chartProto.removeAnnotation = chartRemoveAnnotation;
            chartProto.initAnnotation = function chartInitAnnotation(userOptions) {
                var Constructor = (AnnotationClass.types[userOptions.type] ||
                    AnnotationClass), annotation = new Constructor(this, userOptions);
                this.annotations.push(annotation);
                return annotation;
            };
        }
        if (composedClasses.indexOf(PointerClass) === -1) {
            composedClasses.push(PointerClass);
            var pointerProto = PointerClass.prototype;
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
export default AnnotationChart;
