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
import BoxPlotSeries from '../BoxPlot/BoxPlotSeries.js';
import ColumnSeries from '../Column/ColumnSeries.js';
import ErrorBarSeriesDefaults from './ErrorBarSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var AreaRangeSeries = SeriesRegistry.seriesTypes.arearange;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, merge = U.merge, extend = U.extend;
/* *
 *
 *  Class
 *
 * */
/**
 * Errorbar series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.errorbar
 *
 * @augments Highcharts.Series
 *
 */
var ErrorBarSeries = /** @class */ (function (_super) {
    __extends(ErrorBarSeries, _super);
    function ErrorBarSeries() {
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
    }
    /* *
     *
     *  Functions
     *
     * */
    ErrorBarSeries.prototype.getColumnMetrics = function () {
        // Get the width and X offset, either on top of the linked series
        // column or standalone
        return ((this.linkedParent && this.linkedParent.columnMetrics) ||
            ColumnSeries.prototype.getColumnMetrics.call(this));
    };
    ErrorBarSeries.prototype.drawDataLabels = function () {
        var valKey = this.pointValKey;
        if (AreaRangeSeries) {
            AreaRangeSeries.prototype.drawDataLabels.call(this);
            // Arearange drawDataLabels does not reset point.y to high,
            // but to low after drawing (#4133)
            this.data.forEach(function (point) {
                point.y = point[valKey];
            });
        }
    };
    ErrorBarSeries.prototype.toYData = function (point) {
        // return a plain array for speedy calculation
        return [point.low, point.high];
    };
    ErrorBarSeries.defaultOptions = merge(BoxPlotSeries.defaultOptions, ErrorBarSeriesDefaults);
    return ErrorBarSeries;
}(BoxPlotSeries));
addEvent(ErrorBarSeries, 'afterTranslate', function () {
    this.points.forEach(function (point) {
        point.plotLow = point.plotY;
    });
}, { order: 0 });
extend(ErrorBarSeries.prototype, {
    // pointClass: ErrorBarPoint, // just a declaration
    pointArrayMap: ['low', 'high'],
    pointValKey: 'high',
    doQuartiles: false
});
SeriesRegistry.registerSeriesType('errorbar', ErrorBarSeries);
/* *
 *
 *  Default Export
 *
 * */
export default ErrorBarSeries;
