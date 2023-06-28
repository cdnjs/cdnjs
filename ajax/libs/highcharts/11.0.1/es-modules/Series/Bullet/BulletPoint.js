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
/* *
 *
 *  Class
 *
 * */
class BulletPoint extends ColumnSeries.prototype.pointClass {
    constructor() {
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Destroys target graphic.
     * @private
     */
    destroy() {
        if (this.targetGraphic) {
            this.targetGraphic = this.targetGraphic.destroy();
        }
        super.destroy.apply(this, arguments);
        return;
    }
}
/* *
 *
 *  Export Default
 *
 * */
export default BulletPoint;
