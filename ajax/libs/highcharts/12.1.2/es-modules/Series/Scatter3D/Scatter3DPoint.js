/* *
 *
 *  (c) 2010-2024 Torstein Honsi
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
