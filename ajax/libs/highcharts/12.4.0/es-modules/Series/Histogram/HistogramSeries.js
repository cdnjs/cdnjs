/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *  Author: Sebastian Domas
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import DerivedComposition from '../DerivedComposition.js';
import HistogramSeriesDefaults from './HistogramSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { arrayMax, arrayMin, correctFloat, isNumber, merge } = U;
/* ************************************************************************** *
 *  HISTOGRAM
 * ************************************************************************** */
/**
 * A dictionary with formulas for calculating number of bins based on data
 **/
const binsNumberFormulas = {
    'square-root': function (data) {
        return Math.ceil(Math.sqrt(data.length));
    },
    'sturges': function (data) {
        return Math.ceil(Math.log(data.length) * Math.LOG2E);
    },
    'rice': function (data) {
        return Math.ceil(2 * Math.pow(data.length, 1 / 3));
    }
};
/**
 * Returns a function for mapping number to the closed (right opened) bins
 * @private
 * @param {Array<number>} bins
 * Width of the bins
 */
function fitToBinLeftClosed(bins) {
    return function (y) {
        let i = 1;
        while (bins[i] <= y) {
            i++;
        }
        return bins[--i];
    };
}
/* *
 *
 *  Class
 *
 * */
/**
 * Histogram class
 * @private
 * @class
 * @name Highcharts.seriesTypes.histogram
 * @augments Highcharts.Series
 */
class HistogramSeries extends ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    binsNumber(data) {
        const binsNumberOption = this.options.binsNumber;
        const binsNumber = binsNumberFormulas[binsNumberOption] ||
            // #7457
            (typeof binsNumberOption === 'function' && binsNumberOption);
        return Math.ceil((binsNumber && binsNumber(data)) ||
            (isNumber(binsNumberOption) ?
                binsNumberOption :
                binsNumberFormulas['square-root'](data)));
    }
    setData(data, redraw = true, animation, updatePoints) {
        let alteredData;
        if (typeof data !== 'undefined' && data.length > 0) {
            alteredData = this.derivedData(data.filter(isNumber), this.binsNumber(data), this.options.binWidth);
        }
        super.setData.call(this, alteredData, redraw, animation, updatePoints);
    }
    derivedData(baseData, binsNumber, binWidth) {
        const series = this, max = correctFloat(arrayMax(baseData)), 
        // Float correction needed, because first frequency value is not
        // corrected when generating frequencies (within for loop).
        min = correctFloat(arrayMin(baseData)), frequencies = [], bins = {}, data = [];
        let x;
        binWidth = series.binWidth = (correctFloat(isNumber(binWidth) ?
            (binWidth || 1) :
            (max - min) / binsNumber));
        // #12077 negative pointRange causes wrong calculations,
        // browser hanging.
        series.options.pointRange = Math.max(binWidth, 0);
        // If binWidth is 0 then max and min are equaled,
        // increment the x with some positive value to quit the loop
        for (x = min; 
        // This condition is needed because of the margin of error while
        // operating on decimal numbers. Without that, additional bin
        // was sometimes noticeable on the graph, because of too small
        // precision of float correction.
        x < max &&
            (series.userOptions.binWidth ||
                correctFloat(max - x) >= binWidth ||
                // #13069 - Every add and subtract operation should
                // be corrected, due to general problems with
                // operations on float numbers in JS.
                correctFloat(correctFloat(min + (frequencies.length * binWidth)) -
                    x) <= 0); x = correctFloat(x + binWidth)) {
            frequencies.push(x);
            bins[x] = 0;
        }
        if (bins[min] !== 0) {
            frequencies.push(min);
            bins[min] = 0;
        }
        const fitToBin = fitToBinLeftClosed(frequencies.map((elem) => parseFloat(elem)));
        for (const y of baseData) {
            bins[correctFloat(fitToBin(y))]++;
        }
        for (const key of Object.keys(bins)) {
            data.push({
                x: Number(key),
                y: bins[key],
                x2: correctFloat(Number(key) + binWidth)
            });
        }
        data.sort((a, b) => (a.x - b.x));
        data[data.length - 1].x2 = max;
        return data;
    }
    setDerivedData() {
        const yData = this.baseSeries?.getColumn('y');
        if (!yData?.length) {
            this.setData([]);
            return;
        }
        this.setData(yData, false, void 0, false);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
HistogramSeries.defaultOptions = merge(ColumnSeries.defaultOptions, HistogramSeriesDefaults);
DerivedComposition.compose(HistogramSeries);
SeriesRegistry.registerSeriesType('histogram', HistogramSeries);
/* *
 *
 *  Default Export
 *
 * */
export default HistogramSeries;
