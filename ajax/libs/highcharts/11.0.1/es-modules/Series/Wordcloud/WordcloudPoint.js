/* *
 *
 *  Experimental Highcharts module which enables visualization of a word cloud.
 *
 *  (c) 2016-2021 Highsoft AS
 *  Authors: Jon Arild Nygard
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { column: { prototype: { pointClass: ColumnPoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend } = U;
class WordcloudPoint extends ColumnPoint {
    constructor() {
        /* *
         *
         * Properties
         *
         * */
        super(...arguments);
        this.dimensions = void 0;
        this.options = void 0;
        this.polygon = void 0;
        this.rect = void 0;
        this.series = void 0;
    }
    /* *
     *
     * Functions
     *
     * */
    isValid() {
        return true;
    }
}
extend(WordcloudPoint.prototype, {
    weight: 1
});
/* *
 *
 *  Default Export
 *
 * */
export default WordcloudPoint;
