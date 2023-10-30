/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
import ColumnSeries from '../Column/ColumnSeries.js';
import Point from '../../Core/Series/Point.js';
import U from '../../Core/Utilities.js';
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class WaterfallPoint extends ColumnSeries.prototype.pointClass {
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
    getClassName() {
        let className = Point.prototype.getClassName.call(this);
        if (this.isSum) {
            className += ' highcharts-sum';
        }
        else if (this.isIntermediateSum) {
            className += ' highcharts-intermediate-sum';
        }
        return className;
    }
    // Pass the null test in ColumnSeries.translate.
    isValid() {
        return (isNumber(this.y) ||
            this.isSum ||
            Boolean(this.isIntermediateSum));
    }
}
/* *
 *
 *  Export
 *
 * */
export default WaterfallPoint;
