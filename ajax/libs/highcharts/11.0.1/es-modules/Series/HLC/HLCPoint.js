/* *
 *
 *  (c) 2010-2021 Pawel Lysy
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
/* *
 *
 *  Class
 *
 * */
class HLCPoint extends ColumnPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.close = void 0;
        this.high = void 0;
        this.low = void 0;
        this.options = void 0;
        this.plotClose = void 0;
        this.series = void 0;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default HLCPoint;
