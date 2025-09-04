/* *
 *
 *  (c) 2010-2025 Torstein Honsi
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
                    if (jitter[dim] && !point.isNull) {
                        const plotProp = `plot${dim.toUpperCase()}`, axis = series[`${dim}Axis`], translatedJitter = jitter[dim] *
                            axis.transA;
                        if (axis && !axis.logarithmic) {
                            // Identify the outer bounds of the jitter range
                            const min = Math.max(0, (point[plotProp] || 0) - translatedJitter), max = Math.min(axis.len, (point[plotProp] || 0) + translatedJitter);
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
/* *
 *
 *  Static Properties
 *
 * */
ScatterSeries.defaultOptions = merge(LineSeries.defaultOptions, ScatterSeriesDefaults);
extend(ScatterSeries.prototype, {
    drawTracker: ColumnSeries.prototype.drawTracker,
    sorted: false,
    requireSorting: false,
    noSharedTooltip: true,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup']
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
