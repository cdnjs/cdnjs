/* *
 *
 *  (c) 2010-2025 Highsoft AS
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
    setData(data, redraw = true, animation, updatePoints) {
        let alteredData;
        if (typeof data !== 'undefined' && data.length > 0) {
            data = data.filter(isNumber),
                this.setMean(data);
            this.setStandardDeviation(data);
            alteredData = this.derivedData(this.mean || 0, this.standardDeviation || 0);
        }
        super.setData.call(this, alteredData, redraw, animation, updatePoints);
    }
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
        if (series.baseSeries?.getColumn('y').length) {
            series.setData(series.baseSeries?.getColumn('y'), false, void 0, false);
        }
    }
    setMean(data) {
        const series = this;
        series.mean = correctFloat(BellcurveSeries.mean(data || []));
    }
    setStandardDeviation(data) {
        const series = this;
        series.standardDeviation = correctFloat(BellcurveSeries.standardDeviation(data || [], series.mean));
    }
}
/* *
 *
 *  Static Properties
 *
 * */
BellcurveSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, BellcurveSeriesDefaults);
DerivedComposition.compose(BellcurveSeries);
SeriesRegistry.registerSeriesType('bellcurve', BellcurveSeries);
/* *
 *
 *  Default Export
 *
 * */
export default BellcurveSeries;
