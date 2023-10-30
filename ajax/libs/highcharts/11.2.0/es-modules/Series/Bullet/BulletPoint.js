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
import ColumnSeries from '../Column/ColumnSeries.js';
/* *
 *
 *  Class
 *
 * */
class BulletPoint extends ColumnSeries.prototype.pointClass {
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
    /**
     * Destroys target graphic.
     * @private
     */
    destroy() {
        const series = this;
        if (series.targetGraphic) {
            series.targetGraphic = series.targetGraphic.destroy();
        }
        super.destroy.apply(series, arguments);
        return;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default BulletPoint;
