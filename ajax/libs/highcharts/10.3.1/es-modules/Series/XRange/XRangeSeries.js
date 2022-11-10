/* *
 *
 *  X-range series module
 *
 *  (c) 2010-2021 Torstein Honsi, Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import H from '../../Core/Globals.js';
var noop = H.noop;
import Color from '../../Core/Color/Color.js';
var color = Color.parse;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var seriesProto = SeriesRegistry.series.prototype, ColumnSeries = SeriesRegistry.seriesTypes.column;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, clamp = U.clamp, defined = U.defined, extend = U.extend, find = U.find, isNumber = U.isNumber, isObject = U.isObject, merge = U.merge, pick = U.pick;
import XRangeSeriesDefaults from './XRangeSeriesDefaults.js';
import XRangePoint from './XRangePoint.js';
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
 * Max x2 should be considered in xAxis extremes
 * @private
 */
function onAxisAfterGetSeriesExtremes() {
    var dataMax, modMax;
    if (this.isXAxis) {
        dataMax = pick(this.dataMax, -Number.MAX_VALUE);
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.x2Data) {
                for (var _b = 0, _c = series.x2Data; _b < _c.length; _b++) {
                    var val = _c[_b];
                    if (val && val > dataMax) {
                        dataMax = val;
                        modMax = true;
                    }
                }
            }
        }
        if (modMax) {
            this.dataMax = dataMax;
        }
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.xrange
 *
 * @augments Highcharts.Series
 */
var XRangeSeries = /** @class */ (function (_super) {
    __extends(XRangeSeries, _super);
    function XRangeSeries() {
        /* *
         *
         *  Static Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.data = void 0;
        _this.options = void 0;
        _this.points = void 0;
        return _this;
        /*
        // Override to remove stroke from points. For partial fill.
        pointAttribs: function () {
            let series = this,
                retVal = columnType.prototype.pointAttribs
                    .apply(series, arguments);
    
            //retVal['stroke-width'] = 0;
            return retVal;
        }
        //*/
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Static Functions
     *
     * */
    XRangeSeries.compose = function (AxisClass) {
        if (composedClasses.indexOf(AxisClass) === -1) {
            composedClasses.push(AxisClass);
            addEvent(AxisClass, 'afterGetSeriesExtremes', onAxisAfterGetSeriesExtremes);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    XRangeSeries.prototype.init = function () {
        _super.prototype.init.apply(this, arguments);
        this.options.stacking = void 0; // #13161
    };
    /**
     * Borrow the column series metrics, but with swapped axes. This gives
     * free access to features like groupPadding, grouping, pointWidth etc.
     * @private
     */
    XRangeSeries.prototype.getColumnMetrics = function () {
        var _this = this;
        var swapAxes = function () {
            for (var _i = 0, _a = _this.chart.series; _i < _a.length; _i++) {
                var series = _a[_i];
                var xAxis = series.xAxis;
                series.xAxis = series.yAxis;
                series.yAxis = xAxis;
            }
        };
        swapAxes();
        var metrics = _super.prototype.getColumnMetrics.call(this);
        swapAxes();
        return metrics;
    };
    /**
     * Override cropData to show a point where x or x2 is outside visible range,
     * but one of them is inside.
     * @private
     */
    XRangeSeries.prototype.cropData = function (xData, yData, min, max) {
        // Replace xData with x2Data to find the appropriate cropStart
        var crop = seriesProto.cropData.call(this, this.x2Data, yData, min, max);
        // Re-insert the cropped xData
        crop.xData = xData.slice(crop.start, crop.end);
        return crop;
    };
    /**
     * Finds the index of an existing point that matches the given point
     * options.
     *
     * @private
     *
     * @param {Highcharts.XRangePointOptions} options
     *        The options of the point.
     *
     * @return {number|undefined}
     *         Returns index of a matching point, or undefined if no match is
     *         found.
     */
    XRangeSeries.prototype.findPointIndex = function (options) {
        var _a = this, cropStart = _a.cropStart, points = _a.points;
        var id = options.id;
        var pointIndex;
        if (id) {
            var point = find(points, function (point) { return point.id === id; });
            pointIndex = point ? point.index : void 0;
        }
        if (typeof pointIndex === 'undefined') {
            var point = find(points, function (point) { return (point.x === options.x &&
                point.x2 === options.x2 &&
                !point.touched); });
            pointIndex = point ? point.index : void 0;
        }
        // Reduce pointIndex if data is cropped
        if (this.cropped &&
            isNumber(pointIndex) &&
            isNumber(cropStart) &&
            pointIndex >= cropStart) {
            pointIndex -= cropStart;
        }
        return pointIndex;
    };
    /**
     * @private
     */
    XRangeSeries.prototype.translatePoint = function (point) {
        var xAxis = this.xAxis, yAxis = this.yAxis, metrics = this.columnMetrics, options = this.options, minPointLength = options.minPointLength || 0, oldColWidth = (point.shapeArgs && point.shapeArgs.width || 0) / 2, seriesXOffset = this.pointXOffset = metrics.offset, posX = pick(point.x2, point.x + (point.len || 0));
        var plotX = point.plotX, plotX2 = xAxis.translate(posX, 0, 0, 0, 1);
        var length = Math.abs(plotX2 - plotX), inverted = this.chart.inverted, borderWidth = pick(options.borderWidth, 1), crisper = borderWidth % 2 / 2;
        var widthDifference, partialFill, yOffset = metrics.offset, pointHeight = Math.round(metrics.width), dlLeft, dlRight, dlWidth, clipRectWidth;
        if (minPointLength) {
            widthDifference = minPointLength - length;
            if (widthDifference < 0) {
                widthDifference = 0;
            }
            plotX -= widthDifference / 2;
            plotX2 += widthDifference / 2;
        }
        plotX = Math.max(plotX, -10);
        plotX2 = clamp(plotX2, -10, xAxis.len + 10);
        // Handle individual pointWidth
        if (defined(point.options.pointWidth)) {
            yOffset -= ((Math.ceil(point.options.pointWidth) - pointHeight) / 2);
            pointHeight = Math.ceil(point.options.pointWidth);
        }
        // Apply pointPlacement to the Y axis
        if (options.pointPlacement &&
            isNumber(point.plotY) &&
            yAxis.categories) {
            point.plotY = yAxis.translate(point.y, 0, 1, 0, 1, options.pointPlacement);
        }
        var x = Math.floor(Math.min(plotX, plotX2)) + crisper;
        var x2 = Math.floor(Math.max(plotX, plotX2)) + crisper;
        var shapeArgs = {
            x: x,
            y: Math.floor(point.plotY + yOffset) + crisper,
            width: x2 - x,
            height: pointHeight,
            r: this.options.borderRadius
        };
        point.shapeArgs = shapeArgs;
        // Move tooltip to default position
        if (!inverted) {
            point.tooltipPos[0] -= oldColWidth +
                seriesXOffset -
                shapeArgs.width / 2;
        }
        else {
            point.tooltipPos[1] += seriesXOffset +
                oldColWidth;
        }
        // Align data labels inside the shape and inside the plot area
        dlLeft = shapeArgs.x;
        dlRight = dlLeft + shapeArgs.width;
        if (dlLeft < 0 || dlRight > xAxis.len) {
            dlLeft = clamp(dlLeft, 0, xAxis.len);
            dlRight = clamp(dlRight, 0, xAxis.len);
            dlWidth = dlRight - dlLeft;
            point.dlBox = merge(shapeArgs, {
                x: dlLeft,
                width: dlRight - dlLeft,
                centerX: dlWidth ? dlWidth / 2 : null
            });
        }
        else {
            point.dlBox = null;
        }
        // Tooltip position
        var tooltipPos = point.tooltipPos;
        var xIndex = !inverted ? 0 : 1;
        var yIndex = !inverted ? 1 : 0;
        var tooltipYOffset = (this.columnMetrics ?
            this.columnMetrics.offset :
            -metrics.width / 2);
        // Centering tooltip position (#14147)
        if (!inverted) {
            tooltipPos[xIndex] += (xAxis.reversed ? -1 : 0) * shapeArgs.width;
        }
        else {
            tooltipPos[xIndex] += shapeArgs.width / 2;
        }
        tooltipPos[yIndex] = clamp(tooltipPos[yIndex] + ((inverted ? -1 : 1) * tooltipYOffset), 0, yAxis.len - 1);
        // Add a partShapeArgs to the point, based on the shapeArgs property
        partialFill = point.partialFill;
        if (partialFill) {
            // Get the partial fill amount
            if (isObject(partialFill)) {
                partialFill = partialFill.amount;
            }
            // If it was not a number, assume 0
            if (!isNumber(partialFill)) {
                partialFill = 0;
            }
            point.partShapeArgs = merge(shapeArgs, {
                r: this.options.borderRadius
            });
            clipRectWidth = Math.max(Math.round(length * partialFill + point.plotX -
                plotX), 0);
            point.clipRectArgs = {
                x: xAxis.reversed ? // #10717
                    shapeArgs.x + length - clipRectWidth :
                    shapeArgs.x,
                y: shapeArgs.y,
                width: clipRectWidth,
                height: shapeArgs.height
            };
        }
    };
    /**
     * @private
     */
    XRangeSeries.prototype.translate = function () {
        _super.prototype.translate.apply(this, arguments);
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            this.translatePoint(point);
        }
    };
    /**
     * Draws a single point in the series. Needed for partial fill.
     *
     * This override turns point.graphic into a group containing the
     * original graphic and an overlay displaying the partial fill.
     *
     * @private
     *
     * @param {Highcharts.Point} point
     *        An instance of Point in the series.
     *
     * @param {"animate"|"attr"} verb
     *        'animate' (animates changes) or 'attr' (sets options)
     */
    XRangeSeries.prototype.drawPoint = function (point, verb) {
        var seriesOpts = this.options, renderer = this.chart.renderer, type = point.shapeType, shapeArgs = point.shapeArgs, partShapeArgs = point.partShapeArgs, clipRectArgs = point.clipRectArgs, cutOff = seriesOpts.stacking && !seriesOpts.borderRadius, pointState = point.state, stateOpts = (seriesOpts.states[pointState || 'normal'] ||
            {}), pointStateVerb = typeof pointState === 'undefined' ?
            'attr' : verb, pointAttr = this.pointAttribs(point, pointState), animation = pick(this.chart.options.chart.animation, stateOpts.animation);
        var graphic = point.graphic, pfOptions = point.partialFill;
        if (!point.isNull && point.visible !== false) {
            // Original graphic
            if (graphic) { // update
                graphic.rect[verb](shapeArgs);
            }
            else {
                point.graphic = graphic = renderer.g('point')
                    .addClass(point.getClassName())
                    .add(point.group || this.group);
                graphic.rect = renderer[type](merge(shapeArgs))
                    .addClass(point.getClassName())
                    .addClass('highcharts-partfill-original')
                    .add(graphic);
            }
            // Partial fill graphic
            if (partShapeArgs) {
                if (graphic.partRect) {
                    graphic.partRect[verb](merge(partShapeArgs));
                    graphic.partialClipRect[verb](merge(clipRectArgs));
                }
                else {
                    graphic.partialClipRect = renderer.clipRect(clipRectArgs.x, clipRectArgs.y, clipRectArgs.width, clipRectArgs.height);
                    graphic.partRect =
                        renderer[type](partShapeArgs)
                            .addClass('highcharts-partfill-overlay')
                            .add(graphic)
                            .clip(graphic.partialClipRect);
                }
            }
            // Presentational
            if (!this.chart.styledMode) {
                graphic
                    .rect[verb](pointAttr, animation)
                    .shadow(seriesOpts.shadow, null, cutOff);
                if (partShapeArgs) {
                    // Ensure pfOptions is an object
                    if (!isObject(pfOptions)) {
                        pfOptions = {};
                    }
                    if (isObject(seriesOpts.partialFill)) {
                        pfOptions = merge(seriesOpts.partialFill, pfOptions);
                    }
                    var fill = (pfOptions.fill ||
                        color(pointAttr.fill).brighten(-0.3).get() ||
                        color(point.color || this.color)
                            .brighten(-0.3).get());
                    pointAttr.fill = fill;
                    graphic
                        .partRect[pointStateVerb](pointAttr, animation)
                        .shadow(seriesOpts.shadow, null, cutOff);
                }
            }
        }
        else if (graphic) {
            point.graphic = graphic.destroy(); // #1269
        }
    };
    /**
     * @private
     */
    XRangeSeries.prototype.drawPoints = function () {
        var verb = this.getAnimationVerb();
        // Draw the columns
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            this.drawPoint(point, verb);
        }
    };
    /**
     * Returns "animate", or "attr" if the number of points is above the
     * animation limit.
     *
     * @private
     */
    XRangeSeries.prototype.getAnimationVerb = function () {
        return (this.chart.pointCount < (this.options.animationLimit || 250) ?
            'animate' :
            'attr');
    };
    /**
     * @private
     */
    XRangeSeries.prototype.isPointInside = function (point) {
        var shapeArgs = point.shapeArgs, plotX = point.plotX, plotY = point.plotY;
        if (!shapeArgs) {
            return _super.prototype.isPointInside.apply(this, arguments);
        }
        var isInside = typeof plotX !== 'undefined' &&
            typeof plotY !== 'undefined' &&
            plotY >= 0 &&
            plotY <= this.yAxis.len &&
            (shapeArgs.x || 0) + (shapeArgs.width || 0) >= 0 &&
            plotX <= this.xAxis.len;
        return isInside;
    };
    XRangeSeries.defaultOptions = merge(ColumnSeries.defaultOptions, XRangeSeriesDefaults);
    return XRangeSeries;
}(ColumnSeries));
extend(XRangeSeries.prototype, {
    pointClass: XRangePoint,
    cropShoulder: 1,
    getExtremesFromAll: true,
    parallelArrays: ['x', 'x2', 'y'],
    requireSorting: false,
    type: 'xrange',
    animate: seriesProto.animate,
    autoIncrement: noop,
    buildKDTree: noop
});
SeriesRegistry.registerSeriesType('xrange', XRangeSeries);
/* *
 *
 * Default Export
 *
 * */
export default XRangeSeries;
