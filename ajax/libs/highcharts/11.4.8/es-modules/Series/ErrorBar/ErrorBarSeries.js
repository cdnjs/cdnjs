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
import BoxPlotSeries from '../BoxPlot/BoxPlotSeries.js';
import ColumnSeries from '../Column/ColumnSeries.js';
import ErrorBarSeriesDefaults from './ErrorBarSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { arearange: AreaRangeSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { addEvent, merge, extend } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Errorbar series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.errorbar
 *
 * @augments Highcharts.Series
 */
class ErrorBarSeries extends BoxPlotSeries {
    /* *
     *
     *  Functions
     *
     * */
    getColumnMetrics() {
        const series = this;
        // Get the width and X offset, either on top of the linked series
        // column or standalone
        return ((series.linkedParent && series.linkedParent.columnMetrics) ||
            ColumnSeries.prototype.getColumnMetrics.call(series));
    }
    drawDataLabels() {
        const series = this, valKey = series.pointValKey;
        if (AreaRangeSeries) {
            AreaRangeSeries.prototype.drawDataLabels.call(series);
            // Arearange drawDataLabels does not reset point.y to high,
            // but to low after drawing (#4133)
            for (const point of series.points) {
                point.y = point[valKey];
            }
        }
    }
    toYData(point) {
        // Return a plain array for speedy calculation
        return [point.low, point.high];
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ErrorBarSeries.defaultOptions = merge(BoxPlotSeries.defaultOptions, ErrorBarSeriesDefaults);
addEvent(ErrorBarSeries, 'afterTranslate', function () {
    for (const point of this.points) {
        point.plotLow = point.plotY;
    }
}, { order: 0 });
extend(ErrorBarSeries.prototype, {
    pointArrayMap: ['low', 'high'], // Array point configs are mapped to this
    pointValKey: 'high', // Defines the top of the tracker
    doQuartiles: false
});
SeriesRegistry.registerSeriesType('errorbar', ErrorBarSeries);
/* *
 *
 *  Default Export
 *
 * */
export default ErrorBarSeries;
