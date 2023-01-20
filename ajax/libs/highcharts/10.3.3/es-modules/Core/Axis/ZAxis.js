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
import Axis from './Axis.js';
import U from '../Utilities.js';
var addEvent = U.addEvent, merge = U.merge, pick = U.pick, splat = U.splat;
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
 * @private
 */
function chartAddZAxis(options) {
    return new ZAxis(this, options);
}
/**
 * Get the Z axis in addition to the default X and Y.
 * @private
 */
function onChartAfterGetAxes() {
    var _this = this;
    var zAxisOptions = this.options.zAxis = splat(this.options.zAxis || {});
    if (!this.is3d()) {
        return;
    }
    this.zAxis = [];
    zAxisOptions.forEach(function (axisOptions, i) {
        axisOptions.index = i;
        // Z-Axis is shown horizontally, so it's kind of a X-Axis
        axisOptions.isX = true;
        _this.addZAxis(axisOptions).setScale();
    });
}
/* *
 *
 *  Class
 *
 * */
/**
 * 3D axis for z coordinates.
 */
var ZAxis = /** @class */ (function (_super) {
    __extends(ZAxis, _super);
    /* *
     *
     *  Constructor
     *
     * */
    function ZAxis(chart, userOptions) {
        var _this = _super.call(this, chart, userOptions) || this;
        _this.isZAxis = true;
        return _this;
    }
    /* *
     *
     *  Static Properties
     *
     * */
    ZAxis.compose = function (ChartClass) {
        if (composedClasses.indexOf(ChartClass) === -1) {
            composedClasses.push(ChartClass);
            addEvent(ChartClass, 'afterGetAxes', onChartAfterGetAxes);
            var chartProto = ChartClass.prototype;
            chartProto.addZAxis = chartAddZAxis;
            chartProto.collectionsWithInit.zAxis = [chartProto.addZAxis];
            chartProto.collectionsWithUpdate.push('zAxis');
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    ZAxis.prototype.getSeriesExtremes = function () {
        var _this = this;
        var chart = this.chart;
        this.hasVisibleSeries = false;
        // Reset properties in case we're redrawing (#3353)
        this.dataMin = this.dataMax = this.ignoreMinPadding = (this.ignoreMaxPadding = void 0);
        if (this.stacking) {
            this.stacking.buildStacks();
        }
        // loop through this axis' series
        this.series.forEach(function (series) {
            if (series.visible ||
                !chart.options.chart.ignoreHiddenSeries) {
                var threshold = series.options.threshold;
                _this.hasVisibleSeries = true;
                // Validate threshold in logarithmic axes
                if (_this.positiveValuesOnly && threshold <= 0) {
                    threshold = void 0;
                }
                var zData = series.zData;
                if (zData.length) {
                    _this.dataMin = Math.min(pick(_this.dataMin, zData[0]), Math.min.apply(null, zData));
                    _this.dataMax = Math.max(pick(_this.dataMax, zData[0]), Math.max.apply(null, zData));
                }
            }
        });
    };
    /**
     * @private
     */
    ZAxis.prototype.setAxisSize = function () {
        var chart = this.chart;
        _super.prototype.setAxisSize.call(this);
        this.width = this.len = (chart.options.chart.options3d &&
            chart.options.chart.options3d.depth) || 0;
        this.right = chart.chartWidth - this.width - this.left;
    };
    /**
     * @private
     */
    ZAxis.prototype.setOptions = function (userOptions) {
        userOptions = merge({
            offset: 0,
            lineWidth: 0
        }, userOptions);
        // #14793, this used to be set on the prototype
        this.isZAxis = true;
        _super.prototype.setOptions.call(this, userOptions);
        this.coll = 'zAxis';
    };
    return ZAxis;
}(Axis));
/* *
 *
 *  Default Export
 *
 * */
export default ZAxis;
