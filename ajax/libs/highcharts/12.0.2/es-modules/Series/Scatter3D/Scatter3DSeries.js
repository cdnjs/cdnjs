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
import Math3D from '../../Core/Math3D.js';
const { pointCameraDistance } = Math3D;
import Scatter3DPoint from './Scatter3DPoint.js';
import Scatter3DSeriesDefaults from './Scatter3DSeriesDefaults.js';
import ScatterSeries from '../Scatter/ScatterSeries.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import U from '../../Core/Utilities.js';
const { extend, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.scatter3d
 *
 * @augments Highcharts.Series
 */
class Scatter3DSeries extends ScatterSeries {
    /* *
     *
     *  Functions
     *
     * */
    pointAttribs(point) {
        const attribs = super.pointAttribs.apply(this, arguments);
        if (this.chart.is3d() && point) {
            attribs.zIndex =
                pointCameraDistance(point, this.chart);
        }
        return attribs;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Scatter3DSeries.defaultOptions = merge(ScatterSeries.defaultOptions, Scatter3DSeriesDefaults);
extend(Scatter3DSeries.prototype, {
    axisTypes: ['xAxis', 'yAxis', 'zAxis'],
    // Require direct touch rather than using the k-d-tree, because the
    // k-d-tree currently doesn't take the xyz coordinate system into
    // account (#4552)
    directTouch: true,
    parallelArrays: ['x', 'y', 'z'],
    pointArrayMap: ['x', 'y', 'z'],
    pointClass: Scatter3DPoint
});
SeriesRegistry.registerSeriesType('scatter3d', Scatter3DSeries);
/* *
 *
 *  Default Export
 *
 * */
export default Scatter3DSeries;
