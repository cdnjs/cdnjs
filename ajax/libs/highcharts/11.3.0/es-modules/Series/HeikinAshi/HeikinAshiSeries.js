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
const { composed } = H;
import HeikinAshiPoint from './HeikinAshiPoint.js';
import HeikinAshiSeriesDefaults from './HeikinAshiSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { candlestick: CandlestickSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { addEvent, merge, pushUnique } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * After processing and grouping the data, calculate how the heikeinashi data
 * set should look like.
 * @private
 */
function onAxisPostProcessData() {
    const series = this.series;
    series.forEach((series) => {
        if (series.is('heikinashi')) {
            const heikinashiSeries = series;
            heikinashiSeries.heikiashiData.length = 0;
            heikinashiSeries.getHeikinashiData();
        }
    });
}
/**
 * Assign heikinashi data into the points.
 * @private
 * @todo move to HeikinAshiPoint class
 */
function onHeikinAshiSeriesAfterTranslate() {
    const series = this, points = series.points, heikiashiData = series.heikiashiData, cropStart = series.cropStart || 0;
    // Reset the proccesed data.
    series.processedYData.length = 0;
    // Modify points.
    for (let i = 0; i < points.length; i++) {
        const point = points[i], heikiashiDataPoint = heikiashiData[i + cropStart];
        point.open = heikiashiDataPoint[0];
        point.high = heikiashiDataPoint[1];
        point.low = heikiashiDataPoint[2];
        point.close = heikiashiDataPoint[3];
        series.processedYData.push([point.open, point.high, point.low, point.close]);
    }
}
/**
 * Force to recalculate the heikinashi data set after updating data.
 * @private
 */
function onHeikinAshiSeriesUpdatedData() {
    if (this.heikiashiData.length) {
        this.heikiashiData.length = 0;
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The Heikin Ashi series.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.heikinashi
 *
 * @augments Highcharts.Series
 */
class HeikinAshiSeries extends CandlestickSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.heikiashiData = [];
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(SeriesClass, AxisClass, ..._args) {
        CandlestickSeries.compose(SeriesClass);
        if (pushUnique(composed, this.compose)) {
            addEvent(AxisClass, 'postProcessData', onAxisPostProcessData);
            addEvent(HeikinAshiSeries, 'afterTranslate', onHeikinAshiSeriesAfterTranslate);
            addEvent(HeikinAshiSeries, 'updatedData', onHeikinAshiSeriesUpdatedData);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculate data set for the heikinashi series before creating the points.
     * @private
     */
    getHeikinashiData() {
        const series = this, processedYData = series.allGroupedData || series.yData, heikiashiData = series.heikiashiData;
        if (!heikiashiData.length && processedYData && processedYData.length) {
            // Cast to `any` in order to avoid checks before calculation.
            // Adding null doesn't change anything.
            const firstPoint = processedYData[0];
            // Modify the first point.
            this.modifyFirstPointValue(firstPoint);
            // Modify other points.
            for (let i = 1; i < processedYData.length; i++) {
                const dataPoint = processedYData[i], previousDataPoint = heikiashiData[i - 1];
                this.modifyDataPoint(dataPoint, previousDataPoint);
            }
        }
        series.heikiashiData = heikiashiData;
    }
    /**
     * @private
     */
    init() {
        super.init.apply(this, arguments);
        this.heikiashiData = [];
    }
    /**
     * Calculate and modify the first data point value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     */
    modifyFirstPointValue(dataPoint) {
        const open = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, close = (dataPoint[0] + dataPoint[3]) / 2;
        this.heikiashiData.push([open, dataPoint[1], dataPoint[2], close]);
    }
    /**
     * Calculate and modify the data point's value.
     * @private
     * @param {Array<(number)>} dataPoint
     *        Current data point.
     * @param {Array<(number)>} previousDataPoint
     *        Previous data point.
     */
    modifyDataPoint(dataPoint, previousDataPoint) {
        const newOpen = (previousDataPoint[0] + previousDataPoint[3]) / 2, newClose = (dataPoint[0] +
            dataPoint[1] +
            dataPoint[2] +
            dataPoint[3]) / 4, newHigh = Math.max(dataPoint[1], newClose, newOpen), newLow = Math.min(dataPoint[2], newClose, newOpen);
        // Add new points to the array in order to properly calculate extremes.
        this.heikiashiData.push([newOpen, newHigh, newLow, newClose]);
    }
}
HeikinAshiSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, HeikinAshiSeriesDefaults);
/* *
 *
 *  Class Prototype
 *
 * */
HeikinAshiSeries.prototype.pointClass = HeikinAshiPoint;
SeriesRegistry.registerSeriesType('heikinashi', HeikinAshiSeries);
/* *
 *
 *  Default Export
 *
 * */
export default HeikinAshiSeries;
