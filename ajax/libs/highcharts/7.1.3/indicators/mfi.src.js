/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Money Flow Index indicator for Highstock
 *
 * (c) 2010-2019 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/mfi', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/mfi.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  Money Flow Index indicator for Highstock
         *
         *  (c) 2010-2019 Grzegorz Blachliński
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = U.isArray;

        // Utils:
        function sumArray(array) {

            return array.reduce(function (prev, cur) {
                return prev + cur;
            });
        }

        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }

        function calculateTypicalPrice(point) {
            return (point[1] + point[2] + point[3]) / 3;
        }

        function calculateRawMoneyFlow(typicalPrice, volume) {
            return typicalPrice * volume;
        }

        /**
         * The MFI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.mfi
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'mfi',
            'sma',
            /**
             * Money Flow Index. This series requires `linkedTo` option to be set and
             * should be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/mfi
             *         Money Flow Index Indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.mfi
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 14,
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume',
                    /**
                     * Number of maximum decimals that are used in MFI calculations.
                     */
                    decimals: 4

                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Money Flow Index',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        decimals = params.decimals,
                        // MFI starts calculations from the second point
                        // Cause we need to calculate change between two points
                        range = 1,
                        volumeSeries = series.chart.get(params.volumeSeriesID),
                        yValVolume = volumeSeries && volumeSeries.yData,
                        MFI = [],
                        isUp = false,
                        xData = [],
                        yData = [],
                        positiveMoneyFlow = [],
                        negativeMoneyFlow = [],
                        newTypicalPrice,
                        oldTypicalPrice,
                        rawMoneyFlow,
                        negativeMoneyFlowSum,
                        positiveMoneyFlowSum,
                        moneyFlowRatio,
                        MFIPoint, i;

                    if (!volumeSeries) {
                        return H.error(
                            'Series ' +
                            params.volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            series.chart
                        );
                    }

                    // MFI requires high low and close values
                    if (
                        (xVal.length <= period) || !isArray(yVal[0]) ||
                        yVal[0].length !== 4 ||
                        !yValVolume
                    ) {
                        return false;
                    }
                    // Calculate first typical price
                    newTypicalPrice = calculateTypicalPrice(yVal[range]);
                    // Accumulate first N-points
                    while (range < period + 1) {
                        // Calculate if up or down
                        oldTypicalPrice = newTypicalPrice;
                        newTypicalPrice = calculateTypicalPrice(yVal[range]);
                        isUp = newTypicalPrice >= oldTypicalPrice;
                        // Calculate raw money flow
                        rawMoneyFlow = calculateRawMoneyFlow(
                            newTypicalPrice,
                            yValVolume[range]
                        );
                        // Add to array
                        positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
                        negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
                        range++;
                    }
                    for (i = range - 1; i < yValLen; i++) {
                        if (i > range - 1) {
                            // Remove first point from array
                            positiveMoneyFlow.shift();
                            negativeMoneyFlow.shift();
                            // Calculate if up or down
                            oldTypicalPrice = newTypicalPrice;
                            newTypicalPrice = calculateTypicalPrice(yVal[i]);
                            isUp = newTypicalPrice > oldTypicalPrice;
                            // Calculate raw money flow
                            rawMoneyFlow = calculateRawMoneyFlow(
                                newTypicalPrice,
                                yValVolume[i]
                            );
                            // Add to array
                            positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
                            negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
                        }

                        // Calculate sum of negative and positive money flow:
                        negativeMoneyFlowSum = sumArray(negativeMoneyFlow);
                        positiveMoneyFlowSum = sumArray(positiveMoneyFlow);

                        moneyFlowRatio = positiveMoneyFlowSum / negativeMoneyFlowSum;
                        MFIPoint = toFixed(
                            100 - (100 / (1 + moneyFlowRatio)),
                            decimals
                        );
                        MFI.push([xVal[i], MFIPoint]);
                        xData.push(xVal[i]);
                        yData.push(MFIPoint);
                    }

                    return {
                        values: MFI,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `MFI` series. If the [type](#series.mfi.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.mfi
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.mfi
         */

    });
    _registerModule(_modules, 'masters/indicators/mfi.src.js', [], function () {


    });
}));