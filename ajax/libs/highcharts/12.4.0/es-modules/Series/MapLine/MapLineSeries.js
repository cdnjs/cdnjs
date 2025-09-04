/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import MapLineSeriesDefaults from './MapLineSeriesDefaults.js';
import MapSeries from '../Map/MapSeries.js';
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
 * @name Highcharts.seriesTypes.mapline
 *
 * @augments Highcharts.Series
 */
class MapLineSeries extends MapSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get presentational attributes
     * @private
     * @function Highcharts.seriesTypes.mapline#pointAttribs
     */
    pointAttribs(point, state) {
        const attr = super.pointAttribs(point, state);
        // The difference from a map series is that the stroke takes the
        // point color
        attr.fill = this.options.fillColor;
        return attr;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
MapLineSeries.defaultOptions = merge(MapSeries.defaultOptions, MapLineSeriesDefaults);
extend(MapLineSeries.prototype, {
    type: 'mapline',
    colorProp: 'stroke',
    pointAttrToOptions: {
        'stroke': 'color',
        'stroke-width': 'lineWidth'
    }
});
SeriesRegistry.registerSeriesType('mapline', MapLineSeries);
/* *
 *
 *  Default Export
 *
 * */
export default MapLineSeries;
