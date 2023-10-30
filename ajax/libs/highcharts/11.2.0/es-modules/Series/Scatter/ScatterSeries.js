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
import ScatterSeriesDefaults from './ScatterSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries, line: LineSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { addEvent, extend, merge } = U;
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
class ScatterSeries extends LineSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
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
    applyJitter() {
        const series = this, jitter = this.options.jitter, len = this.points.length;
        /**
         * Return a repeatable, pseudo-random number based on an integer
         * seed.
         * @private
         */
        function unrandom(seed) {
            const rand = Math.sin(seed) * 10000;
            return rand - Math.floor(rand);
        }
        if (jitter) {
            this.points.forEach(function (point, i) {
                ['x', 'y'].forEach(function (dim, j) {
                    let axis, plotProp = 'plot' + dim.toUpperCase(), min, max, translatedJitter;
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
    }
    /**
     * @private
     */
    drawGraph() {
        if (this.options.lineWidth) {
            super.drawGraph();
        }
        else if (this.graph) {
            this.graph = this.graph.destroy();
        }
    }
}
ScatterSeries.defaultOptions = merge(LineSeries.defaultOptions, ScatterSeriesDefaults);
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
