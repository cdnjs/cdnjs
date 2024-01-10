/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
const { correctFloat, isArray, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The EMA series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ema
 *
 * @augments Highcharts.Series
 */
class EMAIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    accumulatePeriodPoints(period, index, yVal) {
        let sum = 0, i = 0, y = 0;
        while (i < period) {
            y = index < 0 ? yVal[i] : yVal[i][index];
            sum = sum + y;
            i++;
        }
        return sum;
    }
    calculateEma(xVal, yVal, i, EMApercent, calEMA, index, SMA) {
        const x = xVal[i - 1], yValue = index < 0 ?
            yVal[i - 1] :
            yVal[i - 1][index], y = typeof calEMA === 'undefined' ?
            SMA : correctFloat((yValue * EMApercent) +
            (calEMA * (1 - EMApercent)));
        return [x, y];
    }
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, EMApercent = 2 / (period + 1), EMA = [], xData = [], yData = [];
        let calEMA, EMAPoint, i, index = -1, sum = 0, SMA = 0;
        // Check period, if bigger than points length, skip
        if (yValLen < period) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (isArray(yVal[0])) {
            index = params.index ? params.index : 0;
        }
        // Accumulate first N-points
        sum = this.accumulatePeriodPoints(period, index, yVal);
        // first point
        SMA = sum / period;
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen + 1; i++) {
            EMAPoint = this.calculateEma(xVal, yVal, i, EMApercent, calEMA, index, SMA);
            EMA.push(EMAPoint);
            xData.push(EMAPoint[0]);
            yData.push(EMAPoint[1]);
            calEMA = EMAPoint[1];
        }
        return {
            values: EMA,
            xData: xData,
            yData: yData
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Exponential moving average indicator (EMA). This series requires the
 * `linkedTo` option to be set.
 *
 * @sample stock/indicators/ema
 * Exponential moving average indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @optionparent plotOptions.ema
 */
EMAIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    params: {
        /**
         * The point index which indicator calculations will base. For
         * example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         *
         * By default index value used to be set to 0. Since
         * Highcharts Stock 7 by default index is set to 3
         * which means that the ema indicator will be
         * calculated using Close values.
         */
        index: 3,
        period: 9 // @merge 14 in v6.2
    }
});
SeriesRegistry.registerSeriesType('ema', EMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default EMAIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `EMA` series. If the [type](#series.ema.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.ema
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @apioption series.ema
 */
''; // adds doclet above to the transpiled file
