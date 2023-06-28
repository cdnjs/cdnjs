/* *
 *
 *  (c) 2010-2021 Highsoft AS
 *
 *  Author: Sebastian Domas
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import DerivedComposition from '../DerivedComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { areaspline: AreaSplineSeries } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { correctFloat, extend, isNumber, merge } = U;
/**
 * Bell curve class
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.bellcurve
 *
 * @augments Highcharts.Series
 */
class BellcurveSeries extends AreaSplineSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* eslint-enable valid-jsdoc */
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    static mean(data) {
        const length = data.length, sum = data.reduce(function (sum, value) {
            return (sum += value);
        }, 0);
        return length > 0 && sum / length;
    }
    /**
     * @private
     */
    static standardDeviation(data, average) {
        let len = data.length, sum;
        average = isNumber(average) ?
            average : BellcurveSeries.mean(data);
        sum = data.reduce(function (sum, value) {
            const diff = value - average;
            return (sum += diff * diff);
        }, 0);
        return len > 1 && Math.sqrt(sum / (len - 1));
    }
    /**
     * @private
     */
    static normalDensity(x, mean, standardDeviation) {
        const translation = x - mean;
        return Math.exp(-(translation * translation) /
            (2 * standardDeviation * standardDeviation)) / (standardDeviation * Math.sqrt(2 * Math.PI));
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    derivedData(mean, standardDeviation) {
        let intervals = this.options.intervals, pointsInInterval = this.options.pointsInInterval, x = mean - intervals * standardDeviation, stop = intervals * pointsInInterval * 2 + 1, increment = standardDeviation / pointsInInterval, data = [], i;
        for (i = 0; i < stop; i++) {
            data.push([x, BellcurveSeries.normalDensity(x, mean, standardDeviation)]);
            x += increment;
        }
        return data;
    }
    setDerivedData() {
        if (this.baseSeries.yData.length > 1) {
            this.setMean();
            this.setStandardDeviation();
            this.setData(this.derivedData(this.mean, this.standardDeviation), false);
        }
        return (void 0);
    }
    setMean() {
        this.mean = correctFloat(BellcurveSeries.mean(this.baseSeries.yData));
    }
    setStandardDeviation() {
        this.standardDeviation = correctFloat(BellcurveSeries.standardDeviation(this.baseSeries.yData, this.mean));
    }
}
/**
 * A bell curve is an areaspline series which represents the probability
 * density function of the normal distribution. It calculates mean and
 * standard deviation of the base series data and plots the curve according
 * to the calculated parameters.
 *
 * @sample {highcharts} highcharts/demo/bellcurve/
 *         Bell curve
 *
 * @extends      plotOptions.areaspline
 * @since        6.0.0
 * @product      highcharts
 * @excluding    boostThreshold, connectNulls, dragDrop, stacking,
 *               pointInterval, pointIntervalUnit
 * @requires     modules/bellcurve
 * @optionparent plotOptions.bellcurve
 */
BellcurveSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, {
    /**
     * @see [fillColor](#plotOptions.bellcurve.fillColor)
     * @see [fillOpacity](#plotOptions.bellcurve.fillOpacity)
     *
     * @apioption plotOptions.bellcurve.color
     */
    /**
     * @see [color](#plotOptions.bellcurve.color)
     * @see [fillOpacity](#plotOptions.bellcurve.fillOpacity)
     *
     * @apioption plotOptions.bellcurve.fillColor
     */
    /**
     * @see [color](#plotOptions.bellcurve.color)
     * @see [fillColor](#plotOptions.bellcurve.fillColor)
     *
     * @default   {highcharts} 0.75
     * @default   {highstock} 0.75
     * @apioption plotOptions.bellcurve.fillOpacity
     */
    /**
     * This option allows to define the length of the bell curve. A unit of
     * the length of the bell curve is standard deviation.
     *
     * @sample highcharts/plotoptions/bellcurve-intervals-pointsininterval
     *         Intervals and points in interval
     */
    intervals: 3,
    /**
     * Defines how many points should be plotted within 1 interval. See
     * `plotOptions.bellcurve.intervals`.
     *
     * @sample highcharts/plotoptions/bellcurve-intervals-pointsininterval
     *         Intervals and points in interval
     */
    pointsInInterval: 3,
    marker: {
        enabled: false
    }
});
DerivedComposition.compose(BellcurveSeries);
SeriesRegistry.registerSeriesType('bellcurve', BellcurveSeries);
/* *
 *
 *  Default Export
 *
 * */
export default BellcurveSeries;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `bellcurve` series. If the [type](#series.bellcurve.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * For options that apply to multiple series, it is recommended to add
 * them to the [plotOptions.series](#plotOptions.series) options structure.
 * To apply to all series of this specific type, apply it to
 * [plotOptions.bellcurve](#plotOptions.bellcurve).
 *
 * @extends   series,plotOptions.bellcurve
 * @since     6.0.0
 * @product   highcharts
 * @excluding dataParser, dataURL, data, boostThreshold, boostBlending
 * @requires  modules/bellcurve
 * @apioption series.bellcurve
 */
/**
 * An integer identifying the index to use for the base series, or a string
 * representing the id of the series.
 *
 * @type      {number|string}
 * @apioption series.bellcurve.baseSeries
 */
/**
 * @see [fillColor](#series.bellcurve.fillColor)
 * @see [fillOpacity](#series.bellcurve.fillOpacity)
 *
 * @apioption series.bellcurve.color
 */
/**
 * @see [color](#series.bellcurve.color)
 * @see [fillOpacity](#series.bellcurve.fillOpacity)
 *
 * @apioption series.bellcurve.fillColor
 */
/**
 * @see [color](#series.bellcurve.color)
 * @see [fillColor](#series.bellcurve.fillColor)
 *
 * @default   {highcharts} 0.75
 * @default   {highstock} 0.75
 * @apioption series.bellcurve.fillOpacity
 */
''; // adds doclets above to transpiled file
