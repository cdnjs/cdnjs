/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/natr', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/natr.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var ATR = H.seriesTypes.atr;

        /**
         * The NATR series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.natr
         *
         * @augments Highcharts.Series
         */
        H.seriesType('natr', 'sma',
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
             * @optionparent plotOptions.natr
             */
            {
                tooltip: {
                    valueSuffix: '%'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                requiredIndicators: ['atr'],
                getValues: function (series, params) {
                    var atrData = ATR.prototype.getValues.apply(this, arguments),
                        atrLength = atrData.values.length,
                        period = params.period - 1,
                        yVal = series.yData,
                        i = 0;

                    for (; i < atrLength; i++) {
                        atrData.yData[i] = atrData.values[i][1] / yVal[period][3] * 100;
                        atrData.values[i][1] = atrData.yData[i];
                        period++;
                    }

                    return atrData;
                }

            });

        /**
         * A `NATR` series. If the [type](#series.natr.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.natr
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.natr
         */

    });
    _registerModule(_modules, 'masters/indicators/natr.src.js', [], function () {


    });
}));