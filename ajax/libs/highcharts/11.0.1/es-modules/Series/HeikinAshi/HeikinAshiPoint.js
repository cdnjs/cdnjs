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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { candlestick: { prototype: { pointClass: CandlestickPoint } }, hlc: { prototype: { pointClass: HLCPoint } } } = SeriesRegistry.seriesTypes;
/* *
 *
 *  Class
 *
 * */
class HeikinAshiPoint extends CandlestickPoint {
    constructor() {
        super(...arguments);
        // clone inheritence
        this.resolveColor = HLCPoint.prototype.resolveColor;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default HeikinAshiPoint;
