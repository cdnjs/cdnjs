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
const { correctFloat, extend, merge, error } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The PPO series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ppo
 *
 * @augments Highcharts.Series
 */
class PPOIndicator extends EMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const periods = params.periods, index = params.index, 
        // 0- date, 1- Percentage Price Oscillator
        PPO = [], xData = [], yData = [];
        let oscillator, i;
        // Check if periods are correct
        if (periods.length !== 2 || periods[1] <= periods[0]) {
            error('Error: "PPO requires two periods. Notice, first period ' +
                'should be lower than the second one."');
            return;
        }
        // Shorter Period EMA
        const SPE = super.getValues.call(this, series, {
            index: index,
            period: periods[0]
        });
        // Longer Period EMA
        const LPE = super.getValues.call(this, series, {
            index: index,
            period: periods[1]
        });
        // Check if ema is calculated properly, if not skip
        if (!SPE || !LPE) {
            return;
        }
        const periodsOffset = periods[1] - periods[0];
        for (i = 0; i < LPE.yData.length; i++) {
            oscillator = correctFloat((SPE.yData[i + periodsOffset] -
                LPE.yData[i]) /
                LPE.yData[i] *
                100);
            PPO.push([LPE.xData[i], oscillator]);
            xData.push(LPE.xData[i]);
            yData.push(oscillator);
        }
        return {
            values: PPO,
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
 * Percentage Price Oscillator. This series requires the
 * `linkedTo` option to be set and should be loaded after the
 * `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/ppo
 *         Percentage Price Oscillator
 *
 * @extends      plotOptions.ema
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/ppo
 * @optionparent plotOptions.ppo
 */
PPOIndicator.defaultOptions = merge(EMAIndicator.defaultOptions, {
    /**
     * Parameters used in calculation of Percentage Price Oscillator series
     * points.
     *
     * @excluding period
     */
    params: {
        period: void 0,
        /**
         * Periods for Percentage Price Oscillator calculations.
         *
         * @type    {Array<number>}
         * @default [12, 26]
         */
        periods: [12, 26]
    }
});
extend(PPOIndicator.prototype, {
    nameBase: 'PPO',
    nameComponents: ['periods']
});
SeriesRegistry.registerSeriesType('ppo', PPOIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default PPOIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Percentage Price Oscillator` series. If the [type](#series.ppo.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.ppo
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
 *            navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/ppo
 * @apioption series.ppo
 */
''; // To include the above in the js output
