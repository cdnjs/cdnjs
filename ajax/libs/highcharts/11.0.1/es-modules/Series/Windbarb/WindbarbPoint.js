/* *
 *
 *  Wind barb series module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
import U from '../../Core/Utilities.js';
const { isNumber } = U;
import ColumnSeries from '../Column/ColumnSeries.js';
/* *
 *
 * Class
 *
 * */
class WindbarbPoint extends ColumnSeries.prototype.pointClass {
    constructor() {
        super(...arguments);
        /* *
         *
         * Properties
         *
         * */
        this.beaufort = void 0;
        this.beaufortLevel = void 0;
        this.direction = void 0;
        this.options = void 0;
        this.series = void 0;
    }
    /* *
     *
     * Functions
     *
     * */
    isValid() {
        return isNumber(this.value) && this.value >= 0;
    }
}
/* *
 *
 * Default export
 *
 * */
export default WindbarbPoint;
