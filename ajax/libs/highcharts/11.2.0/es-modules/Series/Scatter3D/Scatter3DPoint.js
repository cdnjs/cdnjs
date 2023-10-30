/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Scatter 3D series.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ScatterSeries from '../Scatter/ScatterSeries.js';
const { pointClass: ScatterPoint } = ScatterSeries.prototype;
import U from '../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Class
 *
 * */
class Scatter3DPoint extends ScatterPoint {
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
    applyOptions() {
        super.applyOptions.apply(this, arguments);
        if (!defined(this.z)) {
            this.z = 0;
        }
        return this;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Scatter3DPoint;
