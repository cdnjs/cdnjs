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
/* *
 *
 *  Imports
 *
 * */
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { candlestick: CandlestickSeries } } = SeriesRegistry;
/* *
 *
 *  Class
 *
 * */
class HollowCandlestickPoint extends CandlestickSeries.prototype.pointClass {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
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
     * Update class name if needed.
     * @private
     * @function Highcharts.seriesTypes.hollowcandlestick#getClassName
     */
    getClassName() {
        let className = super.getClassName.apply(this);
        const point = this, index = point.index, currentPoint = point.series.hollowCandlestickData[index];
        if (!currentPoint.isBullish && currentPoint.trendDirection === 'up') {
            className += '-bearish-up';
        }
        return className;
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
/* *
 *
 *  Default Export
 *
 * */
export default HollowCandlestickPoint;
