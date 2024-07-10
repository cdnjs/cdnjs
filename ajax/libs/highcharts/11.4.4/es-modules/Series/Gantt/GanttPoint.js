/* *
 *
 *  (c) 2016-2024 Highsoft AS
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
import U from '../../Core/Utilities.js';
const { pick } = U;
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
    static setGanttPointAliases(options) {
        /**
         * Add a value to options if the value exists.
         * @private
         */
        function addIfExists(prop, val) {
            if (typeof val !== 'undefined') {
                options[prop] = val;
            }
        }
        addIfExists('x', pick(options.start, options.x));
        addIfExists('x2', pick(options.end, options.x2));
        addIfExists('partialFill', pick(options.completed, options.partialFill));
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
        GanttPoint.setGanttPointAliases(ganttPoint);
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
