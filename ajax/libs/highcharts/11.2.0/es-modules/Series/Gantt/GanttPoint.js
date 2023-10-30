/* *
 *
 *  (c) 2016-2021 Highsoft AS
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
const { seriesTypes: { xrange: { prototype: { pointClass: XRangePoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { pick } = U;
/* *
 *
 *  Class
 *
 * */
class GanttPoint extends XRangePoint {
    constructor() {
        /* *
         *
         *  Static Functions
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* eslint-disable valid-jsdoc */
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
    /* eslint-disable valid-jsdoc */
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
        let point = this, ganttPoint;
        ganttPoint = super.applyOptions.call(point, options, x);
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
