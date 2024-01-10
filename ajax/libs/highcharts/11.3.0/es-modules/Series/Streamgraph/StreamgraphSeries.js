/* *
 *
 *  Streamgraph module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { areaspline: AreaSplineSeries } = SeriesRegistry.seriesTypes;
import StreamgraphSeriesDefaults from './StreamgraphSeriesDefaults.js';
import U from '../../Core/Utilities.js';
const { merge, extend } = U;
/**
 * Streamgraph series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.streamgraph
 *
 * @augments Highcharts.Series
 */
class StreamgraphSeries extends AreaSplineSeries {
    /* *
     *
     *  Functions
     *
     * */
    // Modifier function for stream stacks. It simply moves the point up or
    // down in order to center the full stack vertically.
    streamStacker(pointExtremes, stack, i) {
        // Y bottom value
        pointExtremes[0] -= stack.total / 2;
        // Y value
        pointExtremes[1] -= stack.total / 2;
        // Record the Y data for use when getting axis extremes
        this.stackedYData[i] = pointExtremes;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
StreamgraphSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, StreamgraphSeriesDefaults);
extend(StreamgraphSeries.prototype, {
    negStacks: false
});
SeriesRegistry.registerSeriesType('streamgraph', StreamgraphSeries);
/* *
 *
 *  Default Export
 *
 * */
export default StreamgraphSeries;
