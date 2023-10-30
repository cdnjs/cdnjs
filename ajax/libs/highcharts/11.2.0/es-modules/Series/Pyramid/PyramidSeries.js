/* *
 *
 *  Highcharts funnel module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import FunnelSeries from '../Funnel/FunnelSeries.js';
import PyramidSeriesDefaults from './PyramidSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Pyramid series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.pyramid
 *
 * @augments Highcharts.Series
 */
class PyramidSeries extends FunnelSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
    }
}
/**
 * A pyramid series is a special type of funnel, without neck and reversed
 * by default.
 *
 * @sample highcharts/demo/pyramid/
 *         Pyramid chart
 *
 * @extends      plotOptions.funnel
 * @product      highcharts
 * @requires     modules/funnel
 * @optionparent plotOptions.pyramid
 */
PyramidSeries.defaultOptions = merge(FunnelSeries.defaultOptions, PyramidSeriesDefaults);
SeriesRegistry.registerSeriesType('pyramid', PyramidSeries);
/* *
 *
 *  Default Export
 *
 * */
export default PyramidSeries;
