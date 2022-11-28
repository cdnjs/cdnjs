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
import HeikinAshiPoint from './HeikinAshiPoint.js';
import HeikinAshiSeriesDefaults from './HeikinAshiSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var CandlestickSeries = SeriesRegistry.seriesTypes.candlestick;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, merge = U.merge;
/* *
 *
 *  Constants
 *
 * */
var composedMembers = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * After processing and grouping the data, calculate how the heikeinashi data
 * set should look like.
 * @private
 */
function onAxisPostProcessData() {
    var series = this.series;
    series.forEach(function (series) {
        if (series.is('heikinashi')) {
            var heikinashiSeries = series;
            heikinashiSeries.heikiashiData.length = 0;
            heikinashiSeries.getHeikinashiData();
        }
    });
}
/**
 * Assign heikinashi data into the points.
 * @private
 * @todo move to HeikinAshiPoint class
 */
function onHeikinAshiSeriesAfterTranslate() {
    var series = this, points = series.points, heikiashiData = series.heikiashiData, cropStart = series.cropStart || 0;
    // Reset the proccesed data.
    series.processedYData.length = 0;
    // Modify points.
    for (var i = 0; i < points.length; i++) {
        var point = points[i], heikiashiDataPoint = heikiashiData[i + cropStart];
        point.open = heikiashiDataPoint[0];
        point.high = heikiashiDataPoint[1];
        point.low = heikiashiDataPoint[2];
        point.close = heikiashiDataPoint[3];
        series.processedYData.push([point.open, point.high, point.low, point.close]);
    }
}
/**
 * Force to recalculate the heikinashi data set after updating data.
 * @private
 */
function onHeikinAshiSeriesUpdatedData() {
    if (this.heikiashiData.length) {
        this.heikiashiData.length = 0;
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The Heikin Ashi series.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.heikinashi
 *
 * @augments Highcharts.Series
 */
var HeikinAshiSeries = /** @class */ (function (_super) {
    __extends(HeikinAshiSeries, _super);
    function HeikinAshiSeries() {
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
        _this.heikiashiData = [];
        _this.options = void 0;
        _this.points = void 0;
        _this.yData = void 0;
        _this.processedYData = void 0;
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    HeikinAshiSeries.compose = function (SeriesClass, AxisClass) {
        var _args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            _args[_i - 2] = arguments[_i];
        }
        CandlestickSeries.compose(SeriesClass);
        if (composedMembers.indexOf(AxisClass) === -1) {
            composedMembers.push(AxisClass);
            addEvent(AxisClass, 'postProcessData', onAxisPostProcessData);
        }
        if (composedMembers.indexOf(HeikinAshiSeries) === -1) {
            composedMembers.push(HeikinAshiSeries);
            addEvent(HeikinAshiSeries, 'afterTranslate', onHeikinAshiSeriesAfterTranslate);
            addEvent(HeikinAshiSeries, 'updatedData', onHeikinAshiSeriesUpdatedData);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculate data set for the heikinashi series before creating the points.
     * @private
     */
    HeikinAshiSeries.prototype.getHeikinashiData = function () {
        var series = this, processedYData = series.allGroupedData || series.yData, heikiashiData = series.heikiashiData;
        if (!heikiashiData.length && processedYData && processedYData.length) {
            // Cast to `any` in order to avoid checks before calculation.
            // Adding null doesn't change anything.
            var firstPoint = processedYData[0];
            // Modify the first point.
            this.modifyFirstPointValue(firstPoint);
            // Modify other points.
            for (var i = 1; i < processedYData.length; i++) {
                var dataPoint = processedYData[i], previousDataPoint = heikiashiData[i - 1];
                this.modifyDataPoint(dataPoint, previousDataPoint);
            }
        }
        series.heikiashiData = heikiashiData;
    };
    /**
     * @private
     */
    HeikinAshiSeries.prototype.init = function () {
        _super.prototype.init.apply(this, arguments);
        this.heikiashiData = [];
    };
    /**
     * Calculate and modify the first data point value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     */
    HeikinAshiSeries.prototype.modifyFirstPointValue = function (dataPoint) {
        var open = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, close = (dataPoint[0] + dataPoint[3]) / 2;
        this.heikiashiData.push([open, dataPoint[1], dataPoint[2], close]);
    };
    /**
     * Calculate and modify the data point's value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     * @param {Array<(number)>} previousDataPoint
     *        Previous data point.
     */
    HeikinAshiSeries.prototype.modifyDataPoint = function (dataPoint, previousDataPoint) {
        var newOpen = (previousDataPoint[0] + previousDataPoint[3]) / 2, newClose = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, newHigh = Math.max(dataPoint[1], newClose, newOpen), newLow = Math.min(dataPoint[2], newClose, newOpen);
        // Add new points to the array in order to properly calculate extremes.
        this.heikiashiData.push([newOpen, newHigh, newLow, newClose]);
    };
    HeikinAshiSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, HeikinAshiSeriesDefaults);
    return HeikinAshiSeries;
}(CandlestickSeries));
/* *
 *
 *  Class Prototype
 *
 * */
HeikinAshiSeries.prototype.pointClass = HeikinAshiPoint;
SeriesRegistry.registerSeriesType('heikinashi', HeikinAshiSeries);
/* *
 *
 *  Default Export
 *
 * */
export default HeikinAshiSeries;
