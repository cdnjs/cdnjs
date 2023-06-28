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
const { extend, merge, isArray } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The Trend line series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.trendline
 *
 * @augments Highcharts.Series
 */
class TrendLineIndicator extends SMAIndicator {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *   Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
        this.updateAllPoints = true;
    }
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const xVal = series.xData, yVal = series.yData, LR = [], xData = [], yData = [], xValLength = xVal.length, index = params.index;
        let sumX = (xValLength - 1) * xValLength / 2, sumY = 0, sumXY = 0, sumX2 = ((xValLength - 1) * (xValLength) * (2 * xValLength - 1)) / 6, alpha, i, y;
        // Get sums:
        for (i = 0; i < xValLength; i++) {
            y = isArray(yVal[i]) ? yVal[i][index] : yVal[i];
            sumY += y;
            sumXY += i * y;
        }
        // Get slope and offset:
        alpha = (xValLength * sumXY - sumX * sumY) /
            (xValLength * sumX2 - sumX * sumX);
        if (isNaN(alpha)) {
            alpha = 0;
        }
        const beta = (sumY - alpha * sumX) / xValLength;
        // Calculate linear regression:
        for (i = 0; i < xValLength; i++) {
            y = alpha * i + beta;
            // Prepare arrays required for getValues() method
            LR[i] = [xVal[i], y];
            xData[i] = xVal[i];
            yData[i] = y;
        }
        return {
            xData: xData,
            yData: yData,
            values: LR
        };
    }
}
/**
 * Trendline (linear regression) fits a straight line to the selected data
 * using a method called the Sum Of Least Squares. This series requires the
 * `linkedTo` option to be set.
 *
 * @sample stock/indicators/trendline
 *         Trendline indicator
 *
 * @extends      plotOptions.sma
 * @since        7.1.3
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/trendline
 * @optionparent plotOptions.trendline
 */
TrendLineIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding period
     */
    params: {
        period: void 0,
        /**
         * The point index which indicator calculations will base. For
         * example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         *
         * @default 3
         */
        index: 3
    }
});
extend(TrendLineIndicator.prototype, {
    nameBase: 'Trendline',
    nameComponents: false
});
SeriesRegistry.registerSeriesType('trendline', TrendLineIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default TrendLineIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `TrendLine` series. If the [type](#series.trendline.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.trendline
 * @since     7.1.3
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/trendline
 * @apioption series.trendline
 */
''; // to include the above in the js output
