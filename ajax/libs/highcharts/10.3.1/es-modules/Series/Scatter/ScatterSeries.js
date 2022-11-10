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
import ScatterSeriesDefaults from './ScatterSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var _a = SeriesRegistry.seriesTypes, ColumnSeries = _a.column, LineSeries = _a.line;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, extend = U.extend, merge = U.merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Scatter series type.
 *
 * @private
 */
var ScatterSeries = /** @class */ (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
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
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Optionally add the jitter effect.
     * @private
     */
    ScatterSeries.prototype.applyJitter = function () {
        var series = this, jitter = this.options.jitter, len = this.points.length;
        /**
         * Return a repeatable, pseudo-random number based on an integer
         * seed.
         * @private
         */
        function unrandom(seed) {
            var rand = Math.sin(seed) * 10000;
            return rand - Math.floor(rand);
        }
        if (jitter) {
            this.points.forEach(function (point, i) {
                ['x', 'y'].forEach(function (dim, j) {
                    var axis, plotProp = 'plot' + dim.toUpperCase(), min, max, translatedJitter;
                    if (jitter[dim] && !point.isNull) {
                        axis = series[dim + 'Axis'];
                        translatedJitter =
                            jitter[dim] * axis.transA;
                        if (axis && !axis.isLog) {
                            // Identify the outer bounds of the jitter range
                            min = Math.max(0, point[plotProp] - translatedJitter);
                            max = Math.min(axis.len, point[plotProp] + translatedJitter);
                            // Find a random position within this range
                            point[plotProp] = min +
                                (max - min) * unrandom(i + j * len);
                            // Update clientX for the tooltip k-d-tree
                            if (dim === 'x') {
                                point.clientX = point.plotX;
                            }
                        }
                    }
                });
            });
        }
    };
    /**
     * @private
     */
    ScatterSeries.prototype.drawGraph = function () {
        if (this.options.lineWidth) {
            _super.prototype.drawGraph.call(this);
        }
        else if (this.graph) {
            this.graph = this.graph.destroy();
        }
    };
    ScatterSeries.defaultOptions = merge(LineSeries.defaultOptions, ScatterSeriesDefaults);
    return ScatterSeries;
}(LineSeries));
extend(ScatterSeries.prototype, {
    drawTracker: ColumnSeries.prototype.drawTracker,
    sorted: false,
    requireSorting: false,
    noSharedTooltip: true,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    takeOrdinalPosition: false // #2342
});
/* *
 *
 *  Events
 *
 * */
/* eslint-disable no-invalid-this */
addEvent(ScatterSeries, 'afterTranslate', function () {
    this.applyJitter();
});
SeriesRegistry.registerSeriesType('scatter', ScatterSeries);
/* *
 *
 *  Default Export
 *
 * */
export default ScatterSeries;
