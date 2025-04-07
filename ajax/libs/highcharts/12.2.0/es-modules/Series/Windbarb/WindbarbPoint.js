/* *
 *
 *  Wind barb series module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
import ColumnSeries from '../Column/ColumnSeries.js';
import U from '../../Core/Utilities.js';
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class WindbarbPoint extends ColumnSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return isNumber(this.value) && this.value >= 0;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default WindbarbPoint;
