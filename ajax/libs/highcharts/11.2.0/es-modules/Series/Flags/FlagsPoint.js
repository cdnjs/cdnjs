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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class FlagsPoint extends ColumnPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
        this.ttBelow = false;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    isValid() {
        // #9233 - Prevent from treating flags as null points (even if
        // they have no y values defined).
        return isNumber(this.y) || typeof this.y === 'undefined';
    }
    /**
     * @private
     */
    hasNewShapeType() {
        const shape = this.options.shape || this.series.options.shape;
        return this.graphic && shape && shape !== this.graphic.symbolKey;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default FlagsPoint;
