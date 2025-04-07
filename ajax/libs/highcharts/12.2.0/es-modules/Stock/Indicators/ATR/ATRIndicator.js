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
const { isArray, merge } = U;
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 * @private
 */
function accumulateAverage(points, xVal, yVal, i) {
    const xValue = xVal[i], yValue = yVal[i];
    points.push([xValue, yValue]);
}
/**
 * @private
 */
function getTR(currentPoint, prevPoint) {
    const pointY = currentPoint, prevY = prevPoint, HL = pointY[1] - pointY[2], HCp = typeof prevY === 'undefined' ? 0 : Math.abs(pointY[1] - prevY[3]), LCp = typeof prevY === 'undefined' ? 0 : Math.abs(pointY[2] - prevY[3]), TR = Math.max(HL, HCp, LCp);
    return TR;
}
/**
 * @private
 */
function populateAverage(points, xVal, yVal, i, period, prevATR) {
    const x = xVal[i - 1], TR = getTR(yVal[i - 1], yVal[i - 2]), y = (((prevATR * (period - 1)) + TR) / period);
    return [x, y];
}
/* *
 *
 *  Class
 *
 * */
/**
 * The ATR series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.atr
 *
 * @augments Highcharts.Series
 */
class ATRIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, xValue = xVal[0], yValue = yVal[0], points = [[xValue, yValue]], ATR = [], xData = [], yData = [];
        let point, i, prevATR = 0, range = 1, TR = 0;
        if ((xVal.length <= period) ||
            !isArray(yVal[0]) ||
            yVal[0].length !== 4) {
            return;
        }
        for (i = 1; i <= yValLen; i++) {
            accumulateAverage(points, xVal, yVal, i);
            if (period < range) {
                point = populateAverage(points, xVal, yVal, i, period, prevATR);
                prevATR = point[1];
                ATR.push(point);
                xData.push(point[0]);
                yData.push(point[1]);
            }
            else if (period === range) {
                prevATR = TR / (i - 1);
                ATR.push([xVal[i - 1], prevATR]);
                xData.push(xVal[i - 1]);
                yData.push(prevATR);
                range++;
            }
            else {
                TR += getTR(yVal[i - 1], yVal[i - 2]);
                range++;
            }
        }
        return {
            values: ATR,
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
 * Average true range indicator (ATR). This series requires `linkedTo`
 * option to be set.
 *
 * @sample stock/indicators/atr
 *         ATR indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/atr
 * @optionparent plotOptions.atr
 */
ATRIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0 // Unused index, do not inherit (#15362)
    }
});
SeriesRegistry.registerSeriesType('atr', ATRIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default ATRIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `ATR` series. If the [type](#series.atr.type) option is not specified, it
 * is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.atr
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/atr
 * @apioption series.atr
 */
''; // To include the above in the js output
