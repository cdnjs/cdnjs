/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  3D pie series
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { pie: { prototype: { pointClass: PiePoint } } } = SeriesRegistry.seriesTypes;
/* *
 *
 *  Class
 *
 * */
class Pie3DPoint extends PiePoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.series = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    haloPath() {
        return this.series?.chart.is3d() ?
            [] : super.haloPath.apply(this, arguments);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Pie3DPoint;
