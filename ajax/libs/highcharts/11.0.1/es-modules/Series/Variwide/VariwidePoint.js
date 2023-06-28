/* *
 *
 *  Highcharts variwide module
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
class VariwidePoint extends ColumnPoint {
    constructor() {
        /* *
         *
         *  Properites
         *
         * */
        super(...arguments);
        this.crosshairWidth = void 0;
        this.options = void 0;
        this.series = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return isNumber(this.y) && isNumber(this.z);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default VariwidePoint;
