/* *
 *
 *  (c) 2010-2025 Paweł Dalek
 *
 *  Volume Weighted Average Price (VWAP) indicator for Highcharts Stock
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
const { error, isArray, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The Volume Weighted Average Price (VWAP) series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.vwap
 *
 * @augments Highcharts.Series
 */
class VWAPIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const indicator = this, chart = series.chart, xValues = series.xData, yValues = series.yData, period = params.period;
        let isOHLC = true, volumeSeries;
        // Checks if volume series exists
        if (!(volumeSeries = (chart.get(params.volumeSeriesID)))) {
            error('Series ' +
                params.volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, chart);
            return;
        }
        // Checks if series data fits the OHLC format
        if (!(isArray(yValues[0]))) {
            isOHLC = false;
        }
        return indicator.calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period);
    }
    /**
     * Main algorithm used to calculate Volume Weighted Average Price (VWAP)
     * values
     *
     * @private
     *
     * @param {boolean} isOHLC
     * Says if data has OHLC format
     *
     * @param {Array<number>} xValues
     * Array of timestamps
     *
     * @param {Array<number|Array<number,number,number,number>>} yValues
     * Array of yValues, can be an array of a four arrays (OHLC) or array of
     * values (line)
     *
     * @param {Array<*>} volumeSeries
     * Volume series
     *
     * @param {number} period
     * Number of points to be calculated
     *
     * @return {Object}
     * Object contains computed VWAP
     **/
    calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period) {
        const volumeValues = volumeSeries.getColumn('y'), volumeLength = volumeValues.length, pointsLength = xValues.length, cumulativePrice = [], cumulativeVolume = [], xData = [], yData = [], VWAP = [];
        let commonLength, typicalPrice, cPrice, cVolume, i, j;
        if (pointsLength <= volumeLength) {
            commonLength = pointsLength;
        }
        else {
            commonLength = volumeLength;
        }
        for (i = 0, j = 0; i < commonLength; i++) {
            // Depending on whether series is OHLC or line type, price is
            // average of the high, low and close or a simple value
            typicalPrice = isOHLC ?
                ((yValues[i][1] + yValues[i][2] +
                    yValues[i][3]) / 3) :
                yValues[i];
            typicalPrice *= volumeValues[i];
            cPrice = j ?
                (cumulativePrice[i - 1] + typicalPrice) :
                typicalPrice;
            cVolume = j ?
                (cumulativeVolume[i - 1] + volumeValues[i]) :
                volumeValues[i];
            cumulativePrice.push(cPrice);
            cumulativeVolume.push(cVolume);
            VWAP.push([xValues[i], (cPrice / cVolume)]);
            xData.push(VWAP[i][0]);
            yData.push(VWAP[i][1]);
            j++;
            if (j === period) {
                j = 0;
            }
        }
        return {
            values: VWAP,
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
 * Volume Weighted Average Price indicator.
 *
 * This series requires `linkedTo` option to be set.
 *
 * @sample stock/indicators/vwap
 *         Volume Weighted Average Price indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/vwap
 * @optionparent plotOptions.vwap
 */
VWAPIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0, // Unchangeable index, do not inherit (#15362)
        period: 30,
        /**
         * The id of volume series which is mandatory. For example using
         * OHLC data, volumeSeriesID='volume' means the indicator will be
         * calculated using OHLC and volume values.
         */
        volumeSeriesID: 'volume'
    }
});
SeriesRegistry.registerSeriesType('vwap', VWAPIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default VWAPIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Volume Weighted Average Price (VWAP)` series. If the
 * [type](#series.vwap.type) option is not specified, it is inherited from
 * [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.vwap
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/vwap
 * @apioption series.vwap
 */
''; // To include the above in the js output
