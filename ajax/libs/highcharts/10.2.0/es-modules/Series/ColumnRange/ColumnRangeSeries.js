/* *
 *
 *  (c) 2010-2021 Torstein Honsi
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
import ColumnRangePoint from './ColumnRangePoint.js';
import H from '../../Core/Globals.js';
var noop = H.noop;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var _a = SeriesRegistry.seriesTypes, AreaRangeSeries = _a.arearange, ColumnSeries = _a.column, columnProto = _a.column.prototype;
import U from '../../Core/Utilities.js';
var clamp = U.clamp, extend = U.extend, merge = U.merge, pick = U.pick;
/* *
 *
 *  Constants
 *
 * */
/**
 * The column range is a cartesian series type with higher and lower
 * Y values along an X axis. To display horizontal bars, set
 * [chart.inverted](#chart.inverted) to `true`.
 *
 * @sample {highcharts|highstock} highcharts/demo/columnrange/
 *         Inverted column range
 *
 * @extends      plotOptions.column
 * @since        2.3.0
 * @excluding    negativeColor, stacking, softThreshold, threshold
 * @product      highcharts highstock
 * @requires     highcharts-more
 * @optionparent plotOptions.columnrange
 */
var columnRangeOptions = {
    /**
     * Extended data labels for range series types. Range series data labels
     * have no `x` and `y` options. Instead, they have `xLow`, `xHigh`,
     * `yLow` and `yHigh` options to allow the higher and lower data label
     * sets individually.
     *
     * @declare   Highcharts.SeriesAreaRangeDataLabelsOptionsObject
     * @extends   plotOptions.arearange.dataLabels
     * @since     2.3.0
     * @product   highcharts highstock
     * @apioption plotOptions.columnrange.dataLabels
     */
    pointRange: null,
    /** @ignore-option */
    marker: null,
    states: {
        hover: {
            /** @ignore-option */
            halo: false
        }
    }
};
/* *
 *
 *  Class
 *
 * */
/**
 * The ColumnRangeSeries class
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.columnrange
 *
 * @augments Highcharts.Series
 */
var ColumnRangeSeries = /** @class */ (function (_super) {
    __extends(ColumnRangeSeries, _super);
    function ColumnRangeSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* *
     *
     *  Functions
     *
     * */
    ColumnRangeSeries.prototype.setOptions = function () {
        // #14359 Prevent side-effect from stacking.
        merge(true, arguments[0], { stacking: void 0 });
        return AreaRangeSeries.prototype.setOptions.apply(this, arguments);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * Translate data points from raw values x and y to plotX and plotY
     * @private
     */
    ColumnRangeSeries.prototype.translate = function () {
        var _this = this;
        var yAxis = this.yAxis, xAxis = this.xAxis, startAngleRad = xAxis.startAngleRad, chart = this.chart, isRadial = this.xAxis.isRadial, safeDistance = Math.max(chart.chartWidth, chart.chartHeight) + 999;
        var height, heightDifference, start, plotHigh, y;
        // eslint-disable-next-line valid-jsdoc
        /**
         * Don't draw too far outside plot area (#6835)
         * @private
         */
        function safeBounds(pixelPos) {
            return clamp(pixelPos, -safeDistance, safeDistance);
        }
        columnProto.translate.apply(this);
        // Set plotLow and plotHigh
        this.points.forEach(function (point) {
            var shapeArgs = point.shapeArgs || {}, minPointLength = _this.options.minPointLength;
            point.plotHigh = plotHigh = safeBounds(yAxis.translate(point.high, 0, 1, 0, 1));
            point.plotLow = safeBounds(point.plotY);
            // adjust shape
            y = plotHigh;
            height = pick(point.rectPlotY, point.plotY) - plotHigh;
            // Adjust for minPointLength
            if (Math.abs(height) < minPointLength) {
                heightDifference = (minPointLength - height);
                height += heightDifference;
                y -= heightDifference / 2;
                // Adjust for negative ranges or reversed Y axis (#1457)
            }
            else if (height < 0) {
                height *= -1;
                y -= height;
            }
            if (isRadial && _this.polar) {
                start = point.barX + startAngleRad;
                point.shapeType = 'arc';
                point.shapeArgs = _this.polar.arc(y + height, y, start, start + point.pointWidth);
            }
            else {
                shapeArgs.height = height;
                shapeArgs.y = y;
                var _a = shapeArgs.x, x = _a === void 0 ? 0 : _a, _b = shapeArgs.width, width = _b === void 0 ? 0 : _b;
                point.tooltipPos = chart.inverted ?
                    [
                        yAxis.len + yAxis.pos - chart.plotLeft - y - height / 2,
                        xAxis.len + xAxis.pos - chart.plotTop - x - width / 2,
                        height
                    ] : [
                    xAxis.left - chart.plotLeft + x + width / 2,
                    yAxis.pos - chart.plotTop + y + height / 2,
                    height
                ]; // don't inherit from column tooltip position - #3372
            }
        });
    };
    // Overrides from modules that may be loaded after this module
    // @todo move to compositions
    // public crispCol(): BBoxObject {
    //     return columnProto.crispCol.apply(this, arguments as any);
    // }
    // public drawPoints(): void {
    //     return columnProto.drawPoints.apply(this, arguments as any);
    // }
    // public drawTracker(): void {
    //     return columnProto.drawTracker.apply(this, arguments as any);
    // }
    // public getColumnMetrics(): ColumnMetricsObject {
    //     return columnProto.getColumnMetrics.apply(this, arguments as any);
    // }
    ColumnRangeSeries.prototype.pointAttribs = function () {
        return columnProto.pointAttribs.apply(this, arguments);
    };
    // public adjustForMissingColumns(): number {
    //     return columnProto.adjustForMissingColumns.apply(this, arguments);
    // }
    // public animate(): void {
    //     return columnProto.animate.apply(this, arguments as any);
    // }
    ColumnRangeSeries.prototype.translate3dPoints = function () {
        return columnProto.translate3dPoints.apply(this, arguments);
    };
    ColumnRangeSeries.prototype.translate3dShapes = function () {
        return columnProto.translate3dShapes.apply(this, arguments);
    };
    /* *
     *
     *  Static Properties
     *
     * */
    ColumnRangeSeries.defaultOptions = merge(ColumnSeries.defaultOptions, AreaRangeSeries.defaultOptions, columnRangeOptions);
    return ColumnRangeSeries;
}(AreaRangeSeries));
extend(ColumnRangeSeries.prototype, {
    directTouch: true,
    pointClass: ColumnRangePoint,
    trackerGroups: ['group', 'dataLabelsGroup'],
    adjustForMissingColumns: columnProto.adjustForMissingColumns,
    animate: columnProto.animate,
    crispCol: columnProto.crispCol,
    drawGraph: noop,
    drawPoints: columnProto.drawPoints,
    getSymbol: noop,
    drawTracker: columnProto.drawTracker,
    getColumnMetrics: columnProto.getColumnMetrics
    // pointAttribs: columnProto.pointAttribs,
    // polarArc: columnProto.polarArc
    // translate3dPoints: columnProto.translate3dPoints,
    // translate3dShapes: columnProto.translate3dShapes
});
SeriesRegistry.registerSeriesType('columnrange', ColumnRangeSeries);
/* *
 *
 *  Default Export
 *
 * */
export default ColumnRangeSeries;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `columnrange` series. If the [type](#series.columnrange.type)
 * option is not specified, it is inherited from
 * [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.columnrange
 * @excluding dataParser, dataURL, stack, stacking
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.columnrange
 */
/**
 * An array of data points for the series. For the `columnrange` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,low,high`. If the first value is a string, it is applied as the name
 *    of the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 4, 2],
 *        [1, 2, 1],
 *        [2, 9, 10]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.columnrange.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 0,
 *        high: 4,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        low: 5,
 *        high: 3,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.arearange.data
 * @excluding marker
 * @product   highcharts highstock
 * @apioption series.columnrange.data
 */
/**
 * @extends   series.columnrange.dataLabels
 * @product   highcharts highstock
 * @apioption series.columnrange.data.dataLabels
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnrange.states.hover
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnrange.states.select
 */
''; // adds doclets above into transpiled
