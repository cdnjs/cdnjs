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
import BellcurveSeriesDefaults from './BellcurveSeriesDefaults.js';
import DerivedComposition from '../DerivedComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { areaspline: AreaSplineSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { correctFloat, isNumber, merge } = U;
/* *
 *
 *  Class
 *
 * */
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
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /** @private */
    static mean(data) {
        const length = data.length, sum = data.reduce(function (sum, value) {
            return (sum += value);
        }, 0);
        return length > 0 && sum / length;
    }
    /** @private */
    static standardDeviation(data, average) {
        const len = data.length;
        average = isNumber(average) ?
            average : BellcurveSeries.mean(data);
        const sum = data.reduce((sum, value) => {
            const diff = value - average;
            return (sum += diff * diff);
        }, 0);
        return len > 1 && Math.sqrt(sum / (len - 1));
    }
    /** @private */
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
    derivedData(mean, standardDeviation) {
        const options = this.options, intervals = options.intervals, pointsInInterval = options.pointsInInterval, stop = intervals * pointsInInterval * 2 + 1, increment = standardDeviation / pointsInInterval, data = [];
        let x = mean - intervals * standardDeviation;
        for (let i = 0; i < stop; i++) {
            data.push([x, BellcurveSeries.normalDensity(x, mean, standardDeviation)]);
            x += increment;
        }
        return data;
    }
    setDerivedData() {
        const series = this;
        if (series.baseSeries?.yData?.length || 0 > 1) {
            series.setMean();
            series.setStandardDeviation();
            series.setData(series.derivedData(series.mean || 0, series.standardDeviation || 0), false);
        }
        return (void 0);
    }
    setMean() {
        const series = this;
        series.mean = correctFloat(BellcurveSeries.mean(series.baseSeries.yData));
    }
    setStandardDeviation() {
        const series = this;
        series.standardDeviation = correctFloat(BellcurveSeries.standardDeviation(series.baseSeries.yData, series.mean));
    }
}
BellcurveSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, BellcurveSeriesDefaults);
DerivedComposition.compose(BellcurveSeries);
SeriesRegistry.registerSeriesType('bellcurve', BellcurveSeries);
/* *
 *
 *  Default Export
 *
 * */
export default BellcurveSeries;
