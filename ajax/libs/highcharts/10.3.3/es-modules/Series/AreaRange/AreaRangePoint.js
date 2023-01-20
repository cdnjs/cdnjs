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
var _a = SeriesRegistry.seriesTypes.area.prototype, AreaPoint = _a.pointClass, areaProto = _a.pointClass.prototype;
import U from '../../Core/Utilities.js';
var defined = U.defined, isNumber = U.isNumber;
/* *
 *
 *  Class
 *
 * */
var AreaRangePoint = /** @class */ (function (_super) {
    __extends(AreaRangePoint, _super);
    function AreaRangePoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Range series only. The high or maximum value for each data point.
         * @name Highcharts.Point#high
         * @type {number|undefined}
         */
        _this.high = void 0;
        /**
         * Range series only. The low or minimum value for each data point.
         * @name Highcharts.Point#low
         * @type {number|undefined}
         */
        _this.low = void 0;
        _this.options = void 0;
        _this.plotX = void 0;
        _this.series = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    AreaRangePoint.prototype.setState = function () {
        var prevState = this.state, series = this.series, isPolar = series.chart.polar;
        if (!defined(this.plotHigh)) {
            // Boost doesn't calculate plotHigh
            this.plotHigh = series.yAxis.toPixels(this.high, true);
        }
        if (!defined(this.plotLow)) {
            // Boost doesn't calculate plotLow
            this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
        }
        if (series.stateMarkerGraphic) {
            series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
            series.stateMarkerGraphic = series.upperStateMarkerGraphic;
        }
        // Change state also for the top marker
        this.graphic = this.graphics && this.graphics[1];
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        // Top state:
        areaProto.setState.apply(this, arguments);
        this.state = prevState;
        // Now restore defaults
        this.plotY = this.plotLow;
        this.graphic = this.graphics && this.graphics[0];
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (series.stateMarkerGraphic) {
            series.upperStateMarkerGraphic = series.stateMarkerGraphic;
            series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
            // Lower marker is stored at stateMarkerGraphic
            // to avoid reference duplication (#7021)
            series.lowerStateMarkerGraphic = void 0;
        }
        areaProto.setState.apply(this, arguments);
    };
    AreaRangePoint.prototype.haloPath = function () {
        var isPolar = this.series.chart.polar;
        var path = [];
        // Bottom halo
        this.plotY = this.plotLow;
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (this.isInside) {
            path = areaProto.haloPath.apply(this, arguments);
        }
        // Top halo
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        if (this.isTopInside) {
            path = path.concat(areaProto.haloPath.apply(this, arguments));
        }
        return path;
    };
    AreaRangePoint.prototype.isValid = function () {
        return isNumber(this.low) && isNumber(this.high);
    };
    return AreaRangePoint;
}(AreaPoint));
/* *
 *
 *  Default Export
 *
 * */
export default AreaRangePoint;
