/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { atr: ATRIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The NATR series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.natr
 *
 * @augments Highcharts.Series
 */
class NATRIndicator extends ATRIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const atrData = (super.getValues.apply(this, arguments)), atrLength = atrData.values.length, yVal = series.yData;
        let i = 0, period = params.period - 1;
        if (!atrData) {
            return;
        }
        for (; i < atrLength; i++) {
            atrData.yData[i] = (atrData.values[i][1] / yVal[period][3] * 100);
            atrData.values[i][1] = atrData.yData[i];
            period++;
        }
        return atrData;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Normalized average true range indicator (NATR). This series requires
 * `linkedTo` option to be set and should be loaded after the
 * `stock/indicators/indicators.js` and `stock/indicators/atr.js`.
 *
 * @sample {highstock} stock/indicators/natr
 *         NATR indicator
 *
 * @extends      plotOptions.atr
 * @since        7.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/natr
 * @optionparent plotOptions.natr
 */
NATRIndicator.defaultOptions = merge(ATRIndicator.defaultOptions, {
    tooltip: {
        valueSuffix: '%'
    }
});
SeriesRegistry.registerSeriesType('natr', NATRIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default NATRIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `NATR` series. If the [type](#series.natr.type) option is not specified, it
 * is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.natr
 * @since     7.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/atr
 * @requires  stock/indicators/natr
 * @apioption series.natr
 */
''; // to include the above in the js output'
