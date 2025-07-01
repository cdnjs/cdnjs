/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Authors: Magdalena Gut, Piotr Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { map: { prototype: { pointClass: MapPoint } } } = SeriesRegistry.seriesTypes;
const { isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class GeoHeatmapPoint extends MapPoint {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    applyOptions(options, x) {
        const point = super.applyOptions.call(this, options, x), { lat, lon } = point.options;
        if (isNumber(lon) && isNumber(lat)) {
            const { colsize = 1, rowsize = 1 } = this.series.options, x1 = lon - colsize / 2, y1 = lat - rowsize / 2;
            point.geometry = point.options.geometry = {
                type: 'Polygon',
                // A rectangle centered in lon/lat
                coordinates: [
                    [
                        [x1, y1],
                        [x1 + colsize, y1],
                        [x1 + colsize, y1 + rowsize],
                        [x1, y1 + rowsize],
                        [x1, y1]
                    ]
                ]
            };
        }
        return point;
        /* eslint-enable valid-jsdoc */
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default GeoHeatmapPoint;
