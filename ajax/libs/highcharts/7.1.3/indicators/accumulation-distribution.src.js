/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/accumulation-distribution', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/accumulation-distribution.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var seriesType = H.seriesType;

        // Utils:
        function populateAverage(xVal, yVal, yValVolume, i) {
            var high = yVal[i][1],
                low = yVal[i][2],
                close = yVal[i][3],
                volume = yValVolume[i],
                adY = close === high && close === low || high === low ?
                    0 :
                    ((2 * close - low - high) / (high - low)) * volume,
                adX = xVal[i];

            return [adX, adY];
        }

        /**
         * The AD series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ad
         *
         * @augments Highcharts.Series
         */
        seriesType('ad', 'sma',
            /**
             * Accumulation Distribution (AD). This series requires `linkedTo` option to
             * be set.
             *
             * @sample stock/indicators/accumulation-distribution
             *         Accumulation/Distribution indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.ad
             */
            {
                params: {
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     *
                     * @since 6.0.0
                     */
                    volumeSeriesID: 'volume'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameComponents: false,
                nameBase: 'Accumulation/Distribution',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        volumeSeriesID = params.volumeSeriesID,
                        volumeSeries = series.chart.get(volumeSeriesID),
                        yValVolume = volumeSeries && volumeSeries.yData,
                        yValLen = yVal ? yVal.length : 0,
                        AD = [],
                        xData = [],
                        yData = [],
                        len, i, ADPoint;

                    if (xVal.length <= period && yValLen && yVal[0].length !== 4) {
                        return false;
                    }

                    if (!volumeSeries) {
                        return H.error(
                            'Series ' +
                            volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            series.chart
                        );
                    }

                    // i = period <-- skip first N-points
                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen; i++) {

                        len = AD.length;
                        ADPoint = populateAverage(xVal, yVal, yValVolume, i, period);

                        if (len > 0) {
                            ADPoint[1] += AD[len - 1][1];
                        }

                        AD.push(ADPoint);

                        xData.push(ADPoint[0]);
                        yData.push(ADPoint[1]);
                    }

                    return {
                        values: AD,
                        xData: xData,
                        yData: yData
                    };
                }
            });

        /**
         * A `AD` series. If the [type](#series.ad.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ad
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.ad
         */

    });
    _registerModule(_modules, 'masters/indicators/accumulation-distribution.src.js', [], function () {


    });
}));