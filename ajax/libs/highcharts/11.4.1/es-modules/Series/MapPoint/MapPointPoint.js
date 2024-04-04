/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class MapPointPoint extends ScatterSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return Boolean(this.options.geometry ||
            (isNumber(this.x) && isNumber(this.y)) ||
            (isNumber(this.options.lon) && isNumber(this.options.lat)));
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default MapPointPoint;
