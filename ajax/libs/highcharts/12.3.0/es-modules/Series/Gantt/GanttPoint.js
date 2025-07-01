/* *
 *
 *  (c) 2016-2025 Highsoft AS
 *
 *  Author: Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { xrange: { prototype: { pointClass: XRangePoint } } } = SeriesRegistry.seriesTypes;
/* *
 *
 *  Class
 *
 * */
class GanttPoint extends XRangePoint {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static setGanttPointAliases(options, chart) {
        options.x = options.start = chart.time.parse(options.start ?? options.x);
        options.x2 = options.end = chart.time.parse(options.end ?? options.x2);
        options.partialFill = options.completed =
            options.completed ?? options.partialFill;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Applies the options containing the x and y data and possible some
     * extra properties. This is called on point init or from point.update.
     *
     * @private
     * @function Highcharts.Point#applyOptions
     *
     * @param {Object} options
     *        The point options
     *
     * @param {number} x
     *        The x value
     *
     * @return {Highcharts.Point}
     *         The Point instance
     */
    applyOptions(options, x) {
        const ganttPoint = super.applyOptions(options, x);
        GanttPoint.setGanttPointAliases(ganttPoint, ganttPoint.series.chart);
        this.isNull = !this.isValid?.();
        return ganttPoint;
    }
    isValid() {
        return ((typeof this.start === 'number' ||
            typeof this.x === 'number') &&
            (typeof this.end === 'number' ||
                typeof this.x2 === 'number' ||
                this.milestone));
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default GanttPoint;
