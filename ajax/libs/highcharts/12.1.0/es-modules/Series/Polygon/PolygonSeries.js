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
import H from '../../Core/Globals.js';
const { noop } = H;
import PolygonSeriesDefaults from './PolygonSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { area: AreaSeries, line: LineSeries, scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { extend, merge } = U;
/* *
 *
 *  Class
 *
 * */
class PolygonSeries extends ScatterSeries {
    /* *
     *
     *  Functions
     *
     * */
    getGraphPath() {
        const graphPath = LineSeries.prototype.getGraphPath.call(this);
        let i = graphPath.length + 1;
        // Close all segments
        while (i--) {
            if ((i === graphPath.length || graphPath[i][0] === 'M') && i > 0) {
                graphPath.splice(i, 0, ['Z']);
            }
        }
        this.areaPath = graphPath;
        return graphPath;
    }
    drawGraph() {
        // Hack into the fill logic in area.drawGraph
        this.options.fillColor = this.color;
        AreaSeries.prototype.drawGraph.call(this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
PolygonSeries.defaultOptions = merge(ScatterSeries.defaultOptions, PolygonSeriesDefaults);
extend(PolygonSeries.prototype, {
    type: 'polygon',
    drawTracker: LineSeries.prototype.drawTracker,
    setStackedPoints: noop // No stacking points on polygons (#5310)
});
SeriesRegistry.registerSeriesType('polygon', PolygonSeries);
/* *
 *
 *  Default Export
 *
 * */
export default PolygonSeries;
