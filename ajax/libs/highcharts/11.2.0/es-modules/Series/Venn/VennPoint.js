/* *
 *
 *  Experimental Highcharts module which enables visualization of a Venn
 *  diagram.
 *
 *  (c) 2016-2021 Highsoft AS
 *  Authors: Jon Arild Nygard
 *
 *  Layout algorithm by Ben Frederickson:
 *  https://www.benfrederickson.com/better-venn-diagrams/
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { scatter: { prototype: { pointClass: ScatterPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class VennPoint extends ScatterPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return isNumber(this.value);
    }
    shouldDraw() {
        // Only draw points with single sets.
        return !!this.shapeArgs;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default VennPoint;
