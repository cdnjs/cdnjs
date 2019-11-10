/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/wma', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'indicators/wma.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = U.isArray;

        var seriesType = H.seriesType;

        // Utils:
        function accumulateAverage(points, xVal, yVal, i, index) {
            var xValue = xVal[i],
                yValue = index < 0 ? yVal[i] : yVal[i][index];

            points.push([xValue, yValue]);
        }

        function weightedSumArray(array, pLen) {
            // The denominator is the sum of the number of days as a triangular number.
            // If there are 5 days, the triangular numbers are 5, 4, 3, 2, and 1.
            // The sum is 5 + 4 + 3 + 2 + 1 = 15.
            var denominator = (pLen + 1) / 2 * pLen;

            // reduce VS loop => reduce
            return array.reduce(function (prev, cur, i) {
                return [null, prev[1] + cur[1] * (i + 1)];
            })[1] / denominator;
        }

        function populateAverage(points, xVal, yVal, i) {
            var pLen = points.length,
                wmaY = weightedSumArray(points, pLen),
                wmaX = xVal[i - 1];

            points.shift(); // remove point until range < period

            return [wmaX, wmaY];
        }

        /**
         * The SMA series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.wma
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'wma',
            'sma',
            /**
             * Weighted moving average indicator (WMA). This series requires `linkedTo`
             * option to be set.
             *
             * @sample stock/indicators/wma
             *         Weighted moving average indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.wma
             */
            {
                params: {
                    index: 3,
                    period: 9
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        range = 1,
                        xValue = xVal[0],
                        yValue = yVal[0],
                        WMA = [],
                        xData = [],
                        yData = [],
                        index = -1,
                        i, points, WMAPoint;

                    if (xVal.length < period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick
                    if (isArray(yVal[0])) {
                        index = params.index;
                        yValue = yVal[0][index];
                    }
                    // Starting point
                    points = [[xValue, yValue]];

                    // Accumulate first N-points
                    while (range !== period) {
                        accumulateAverage(points, xVal, yVal, range, index);
                        range++;
                    }

                    // Calculate value one-by-one for each period in visible data
                    for (i = range; i < yValLen; i++) {
                        WMAPoint = populateAverage(points, xVal, yVal, i);
                        WMA.push(WMAPoint);
                        xData.push(WMAPoint[0]);
                        yData.push(WMAPoint[1]);

                        accumulateAverage(points, xVal, yVal, i, index);
                    }

                    WMAPoint = populateAverage(points, xVal, yVal, i);
                    WMA.push(WMAPoint);
                    xData.push(WMAPoint[0]);
                    yData.push(WMAPoint[1]);

                    return {
                        values: WMA,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `WMA` series. If the [type](#series.wma.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.wma
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.wma
         */

    });
    _registerModule(_modules, 'masters/indicators/wma.src.js', [], function () {


    });
}));