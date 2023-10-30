/**
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import MultipleLinesComposition from '../MultipleLinesComposition.js';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
const { extend, isArray, merge } = U;
/* *
 *
 *  Functions
 *
 * */
// Utils:
/**
 * @private
 */
function getStandardDeviation(arr, index, isOHLC, mean) {
    const arrLen = arr.length;
    let i = 0, std = 0, value, variance = 0;
    for (; i < arrLen; i++) {
        value = (isOHLC ? arr[i][index] : arr[i]) - mean;
        variance += value * value;
    }
    variance = variance / (arrLen - 1);
    std = Math.sqrt(variance);
    return std;
}
/* *
 *
 *  Class
 *
 * */
/**
 * Bollinger Bands series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.bb
 *
 * @augments Highcharts.Series
 */
class BBIndicator extends SMAIndicator {
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
     *  Functions
     *
     * */
    init() {
        SeriesRegistry.seriesTypes.sma.prototype.init.apply(this, arguments);
        // Set default color for lines:
        this.options = merge({
            topLine: {
                styles: {
                    lineColor: this.color
                }
            },
            bottomLine: {
                styles: {
                    lineColor: this.color
                }
            }
        }, this.options);
    }
    getValues(series, params) {
        const period = params.period, standardDeviation = params.standardDeviation, xData = [], yData = [], xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, 
        // 0- date, 1-middle line, 2-top line, 3-bottom line
        BB = [];
        // middle line, top line and bottom line
        let ML, TL, BL, date, slicedX, slicedY, stdDev, point, i;
        if (xVal.length < period) {
            return;
        }
        const isOHLC = isArray(yVal[0]);
        for (i = period; i <= yValLen; i++) {
            slicedX = xVal.slice(i - period, i);
            slicedY = yVal.slice(i - period, i);
            point = SeriesRegistry.seriesTypes.sma.prototype.getValues.call(this, {
                xData: slicedX,
                yData: slicedY
            }, params);
            date = point.xData[0];
            ML = point.yData[0];
            stdDev = getStandardDeviation(slicedY, params.index, isOHLC, ML);
            TL = ML + standardDeviation * stdDev;
            BL = ML - standardDeviation * stdDev;
            BB.push([date, TL, ML, BL]);
            xData.push(date);
            yData.push([TL, ML, BL]);
        }
        return {
            values: BB,
            xData: xData,
            yData: yData
        };
    }
}
/**
 * Bollinger bands (BB). This series requires the `linkedTo` option to be
 * set and should be loaded after the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/bollinger-bands
 *         Bollinger bands
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/bollinger-bands
 * @optionparent plotOptions.bb
 */
BBIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * Option for fill color between lines in Bollinger Bands Indicator.
     *
     * @sample {highstock} stock/indicators/indicator-area-fill
     *      Background fill between lines.
     *
     * @type      {Highcharts.ColorType}
     * @since     9.3.2
     * @apioption plotOptions.bb.fillColor
     */
    /**
     * Parameters used in calculation of the regression points.
     */
    params: {
        period: 20,
        /**
         * Standard deviation for top and bottom bands.
         */
        standardDeviation: 2,
        index: 3
    },
    /**
     * Bottom line options.
     */
    bottomLine: {
        /**
         * Styles for the bottom line.
         */
        styles: {
            /**
             * Pixel width of the line.
             */
            lineWidth: 1,
            /**
             * Color of the line. If not set, it's inherited from
             * [plotOptions.bb.color](#plotOptions.bb.color).
             *
             * @type  {Highcharts.ColorString}
             */
            lineColor: void 0
        }
    },
    /**
     * Top line options.
     *
     * @extends plotOptions.bb.bottomLine
     */
    topLine: {
        /**
         * Styles for the top line.
         */
        styles: {
            /**
             * Pixel width of the line.
             */
            lineWidth: 1,
            /**
             * Color of the line. If not set, it's inherited from
             * [plotOptions.bb.color](#plotOptions.bb.color).
             *
             * @type {Highcharts.ColorString}
             */
            lineColor: void 0
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'
    },
    marker: {
        enabled: false
    },
    dataGrouping: {
        approximation: 'averages'
    }
});
extend(BBIndicator.prototype, {
    areaLinesNames: ['top', 'bottom'],
    linesApiNames: ['topLine', 'bottomLine'],
    nameComponents: ['period', 'standardDeviation'],
    pointArrayMap: ['top', 'middle', 'bottom'],
    pointValKey: 'middle'
});
MultipleLinesComposition.compose(BBIndicator);
SeriesRegistry.registerSeriesType('bb', BBIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default BBIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A bollinger bands indicator. If the [type](#series.bb.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.bb
 * @since     6.0.0
 * @excluding dataParser, dataURL
 * @product   highstock
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/bollinger-bands
 * @apioption series.bb
 */
''; // to include the above in the js output
