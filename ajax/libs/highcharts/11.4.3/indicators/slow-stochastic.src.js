/**
 * @license Highstock JS v11.4.3 (2024-05-22)
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/indicators', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator, stochastic: StochasticIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Slow Stochastic series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.slowstochastic
         *
         * @augments Highcharts.Series
         */
        class SlowStochasticIndicator extends StochasticIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const periods = params.periods, fastValues = super.getValues.call(this, series, params), slowValues = {
                    values: [],
                    xData: [],
                    yData: []
                };
                if (!fastValues) {
                    return;
                }
                slowValues.xData = fastValues.xData.slice(periods[1] - 1);
                const fastYData = fastValues.yData.slice(periods[1] - 1);
                // Get SMA(%D)
                const smoothedValues = SMAIndicator.prototype.getValues.call(this, {
                    xData: slowValues.xData,
                    yData: fastYData
                }, {
                    index: 1,
                    period: periods[2]
                });
                if (!smoothedValues) {
                    return;
                }
                // Format data
                for (let i = 0, xDataLen = slowValues.xData.length; i < xDataLen; i++) {
                    slowValues.yData[i] = [
                        fastYData[i][1],
                        smoothedValues.yData[i - periods[2] + 1] || null
                    ];
                    slowValues.values[i] = [
                        slowValues.xData[i],
                        fastYData[i][1],
                        smoothedValues.yData[i - periods[2] + 1] || null
                    ];
                }
                return slowValues;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Slow Stochastic oscillator. This series requires the `linkedTo` option
         * to be set and should be loaded after `stock/indicators/indicators.js`
         * and `stock/indicators/stochastic.js` files.
         *
         * @sample stock/indicators/slow-stochastic
         *         Slow Stochastic oscillator
         *
         * @extends      plotOptions.stochastic
         * @since        8.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/stochastic
         * @requires     stock/indicators/slowstochastic
         * @optionparent plotOptions.slowstochastic
         */
        SlowStochasticIndicator.defaultOptions = merge(StochasticIndicator.defaultOptions, {
            params: {
                /**
                 * Periods for Slow Stochastic oscillator: [%K, %D, SMA(%D)].
                 *
                 * @type    {Array<number,number,number>}
                 * @default [14, 3, 3]
                 */
                periods: [14, 3, 3]
            }
        });
        extend(SlowStochasticIndicator.prototype, {
            nameBase: 'Slow Stochastic'
        });
        SeriesRegistry.registerSeriesType('slowstochastic', SlowStochasticIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A Slow Stochastic indicator. If the [type](#series.slowstochastic.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.slowstochastic
         * @since     8.0.0
         * @product   highstock
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/stochastic
         * @requires  stock/indicators/slowstochastic
         * @apioption series.slowstochastic
         */
        ''; // To include the above in the js output

        return SlowStochasticIndicator;
    });
    _registerModule(_modules, 'masters/indicators/slow-stochastic.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));