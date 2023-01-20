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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ScatterPoint = SeriesRegistry.seriesTypes.scatter.prototype.pointClass;
import U from '../../Core/Utilities.js';
var clamp = U.clamp, defined = U.defined, extend = U.extend, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
var HeatmapPoint = /** @class */ (function (_super) {
    __extends(HeatmapPoint, _super);
    function HeatmapPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = void 0;
        _this.series = void 0;
        _this.value = void 0;
        _this.x = void 0;
        _this.y = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    HeatmapPoint.prototype.applyOptions = function (options, x) {
        // #17970, if point is null remove its color, because it may be updated
        if (this.isNull || this.value === null) {
            delete this.color;
        }
        _super.prototype.applyOptions.call(this, options, x);
        this.formatPrefix = this.isNull || this.value === null ?
            'null' : 'point';
        return this;
    };
    HeatmapPoint.prototype.getCellAttributes = function () {
        var point = this, series = point.series, seriesOptions = series.options, xPad = (seriesOptions.colsize || 1) / 2, yPad = (seriesOptions.rowsize || 1) / 2, xAxis = series.xAxis, yAxis = series.yAxis, markerOptions = point.options.marker || series.options.marker, pointPlacement = series.pointPlacementToXValue(), // #7860
        pointPadding = pick(point.pointPadding, seriesOptions.pointPadding, 0), cellAttr = {
            x1: clamp(Math.round(xAxis.len -
                xAxis.translate(point.x - xPad, false, true, false, true, -pointPlacement)), -xAxis.len, 2 * xAxis.len),
            x2: clamp(Math.round(xAxis.len -
                xAxis.translate(point.x + xPad, false, true, false, true, -pointPlacement)), -xAxis.len, 2 * xAxis.len),
            y1: clamp(Math.round(yAxis.translate(point.y - yPad, false, true, false, true)), -yAxis.len, 2 * yAxis.len),
            y2: clamp(Math.round(yAxis.translate(point.y + yPad, false, true, false, true)), -yAxis.len, 2 * yAxis.len)
        };
        var dimensions = [['width', 'x'], ['height', 'y']];
        // Handle marker's fixed width, and height values including border
        // and pointPadding while calculating cell attributes.
        dimensions.forEach(function (dimension) {
            var prop = dimension[0], direction = dimension[1];
            var start = direction + '1', end = direction + '2';
            var side = Math.abs(cellAttr[start] - cellAttr[end]), borderWidth = markerOptions &&
                markerOptions.lineWidth || 0, plotPos = Math.abs(cellAttr[start] + cellAttr[end]) / 2, widthOrHeight = markerOptions && markerOptions[prop];
            if (defined(widthOrHeight) && widthOrHeight < side) {
                var halfCellSize = widthOrHeight / 2 + borderWidth / 2;
                cellAttr[start] = plotPos - halfCellSize;
                cellAttr[end] = plotPos + halfCellSize;
            }
            // Handle pointPadding
            if (pointPadding) {
                if (direction === 'y') {
                    start = end;
                    end = direction + '1';
                }
                cellAttr[start] += pointPadding;
                cellAttr[end] -= pointPadding;
            }
        });
        return cellAttr;
    };
    /**
     * @private
     */
    HeatmapPoint.prototype.haloPath = function (size) {
        if (!size) {
            return [];
        }
        var _a = this.shapeArgs || {}, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e;
        return [
            ['M', x - size, y - size],
            ['L', x - size, y + height + size],
            ['L', x + width + size, y + height + size],
            ['L', x + width + size, y - size],
            ['Z']
        ];
    };
    /**
     * Color points have a value option that determines whether or not it is
     * a null point
     * @private
     */
    HeatmapPoint.prototype.isValid = function () {
        // undefined is allowed
        return (this.value !== Infinity &&
            this.value !== -Infinity);
    };
    return HeatmapPoint;
}(ScatterPoint));
extend(HeatmapPoint.prototype, {
    dataLabelOnNull: true,
    moveToTopOnHover: true,
    ttBelow: false
});
/* *
 *
 *  Default Export
 *
 * */
export default HeatmapPoint;
