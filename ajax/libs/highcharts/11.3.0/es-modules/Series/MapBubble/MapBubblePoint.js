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
/* *
 *
 *  Imports
 *
 * */
import BubblePoint from '../Bubble/BubblePoint.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { map: { prototype: { pointClass: { prototype: mapPointProto } } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class MapBubblePoint extends BubblePoint {
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return typeof this.z === 'number';
    }
}
extend(MapBubblePoint.prototype, {
    applyOptions: mapPointProto.applyOptions,
    getProjectedBounds: mapPointProto.getProjectedBounds
});
/* *
 *
 *  Default Export
 *
 * */
export default MapBubblePoint;
