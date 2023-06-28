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
const { seriesTypes: { pie: { prototype: { pointClass: PiePoint } } } } = SeriesRegistry;
/* *
 *
 *  Constants
 *
 * */
const superHaloPath = PiePoint.prototype.haloPath;
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
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    haloPath() {
        var _a;
        return ((_a = this.series) === null || _a === void 0 ? void 0 : _a.chart.is3d()) ?
            [] : superHaloPath.apply(this, arguments);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Pie3DPoint;
