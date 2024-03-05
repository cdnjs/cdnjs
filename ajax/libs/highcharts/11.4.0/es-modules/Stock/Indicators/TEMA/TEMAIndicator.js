/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { ema: EMAIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
const { correctFloat, isArray, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The TEMA series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.tema
 *
 * @augments Highcharts.Series
 */
class TEMAIndicator extends EMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getEMA(yVal, prevEMA, SMA, index, i, xVal) {
        return super.calculateEma(xVal || [], yVal, typeof i === 'undefined' ? 1 : i, this.EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
    }
    getTemaPoint(xVal, tripledPeriod, EMAlevels, i) {
        const TEMAPoint = [
            xVal[i - 3],
            correctFloat(3 * EMAlevels.level1 -
                3 * EMAlevels.level2 + EMAlevels.level3)
        ];
        return TEMAPoint;
    }
    getValues(series, params) {
        const period = params.period, doubledPeriod = 2 * period, tripledPeriod = 3 * period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, tema = [], xDataTema = [], yDataTema = [], 
        // EMA values array
        emaValues = [], emaLevel2Values = [], 
        // This object contains all EMA EMAlevels calculated like below
        // EMA = level1
        // EMA(EMA) = level2,
        // EMA(EMA(EMA)) = level3,
        emaLevels = {};
        let index = -1, accumulatePeriodPoints = 0, sma = 0, 
        // EMA of previous point
        prevEMA, prevEMAlevel2, i, temaPoint;
        this.EMApercent = (2 / (period + 1));
        // Check period, if bigger than EMA points length, skip
        if (yValLen < 3 * period - 2) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (isArray(yVal[0])) {
            index = params.index ? params.index : 0;
        }
        // Accumulate first N-points
        accumulatePeriodPoints = super.accumulatePeriodPoints(period, index, yVal);
        // first point
        sma = accumulatePeriodPoints / period;
        accumulatePeriodPoints = 0;
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen + 3; i++) {
            if (i < yValLen + 1) {
                emaLevels.level1 = this.getEMA(yVal, prevEMA, sma, index, i)[1];
                emaValues.push(emaLevels.level1);
            }
            prevEMA = emaLevels.level1;
            // Summing first period points for ema(ema)
            if (i < doubledPeriod) {
                accumulatePeriodPoints += emaLevels.level1;
            }
            else {
                // Calculate dema
                // First dema point
                if (i === doubledPeriod) {
                    sma = accumulatePeriodPoints / period;
                    accumulatePeriodPoints = 0;
                }
                emaLevels.level1 = emaValues[i - period - 1];
                emaLevels.level2 = this.getEMA([emaLevels.level1], prevEMAlevel2, sma)[1];
                emaLevel2Values.push(emaLevels.level2);
                prevEMAlevel2 = emaLevels.level2;
                // Summing first period points for ema(ema(ema))
                if (i < tripledPeriod) {
                    accumulatePeriodPoints += emaLevels.level2;
                }
                else {
                    // Calculate tema
                    // First tema point
                    if (i === tripledPeriod) {
                        sma = accumulatePeriodPoints / period;
                    }
                    if (i === yValLen + 1) {
                        // Calculate the last ema and emaEMA points
                        emaLevels.level1 = emaValues[i - period - 1];
                        emaLevels.level2 = this.getEMA([emaLevels.level1], prevEMAlevel2, sma)[1];
                        emaLevel2Values.push(emaLevels.level2);
                    }
                    emaLevels.level1 = emaValues[i - period - 2];
                    emaLevels.level2 = emaLevel2Values[i - 2 * period - 1];
                    emaLevels.level3 = this.getEMA([emaLevels.level2], emaLevels.prevLevel3, sma)[1];
                    temaPoint = this.getTemaPoint(xVal, tripledPeriod, emaLevels, i);
                    // Make sure that point exists (for TRIX oscillator)
                    if (temaPoint) {
                        tema.push(temaPoint);
                        xDataTema.push(temaPoint[0]);
                        yDataTema.push(temaPoint[1]);
                    }
                    emaLevels.prevLevel3 = emaLevels.level3;
                }
            }
        }
        return {
            values: tema,
            xData: xDataTema,
            yData: yDataTema
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Triple exponential moving average (TEMA) indicator. This series requires
 * `linkedTo` option to be set and should be loaded after the
 * `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/tema
 *         TEMA indicator
 *
 * @extends      plotOptions.ema
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
 *               navigatorOptions, pointInterval, pointIntervalUnit,
 *               pointPlacement, pointRange, pointStart, showInNavigator,
 *               stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/tema
 * @optionparent plotOptions.tema
 */
TEMAIndicator.defaultOptions = merge(EMAIndicator.defaultOptions);
SeriesRegistry.registerSeriesType('tema', TEMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default TEMAIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `TEMA` series. If the [type](#series.tema.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.tema
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
 *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/tema
 * @apioption series.tema
 */
''; // to include the above in the js output
