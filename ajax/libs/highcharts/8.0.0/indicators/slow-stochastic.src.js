/**
 * @license Highstock JS v8.0.0 (2019-12-10)
 *
 * Slow Stochastic series type for Highstock
 *
 * (c) 2010-2019 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
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
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'mixins/indicator-required.js', [_modules['parts/Globals.js']], function (H) {
        /**
         *
         *  (c) 2010-2019 Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var error = H.error;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var requiredIndicatorMixin = {
                /**
                 * Check whether given indicator is loaded,
            else throw error.
                 * @private
                 * @param {Highcharts.Indicator} indicator
                 *        Indicator constructor function.
                 * @param {string} requiredIndicator
                 *        Required indicator type.
                 * @param {string} type
                 *        Type of indicator where function was called (parent).
                 * @param {Highcharts.IndicatorCallbackFunction} callback
                 *        Callback which is triggered if the given indicator is loaded.
                 *        Takes indicator as an argument.
                 * @param {string} errMessage
                 *        Error message that will be logged in console.
                 * @return {boolean}
                 *         Returns false when there is no required indicator loaded.
                 */
                isParentLoaded: function (indicator,
            requiredIndicator,
            type,
            callback,
            errMessage) {
                    if (indicator) {
                        return callback ? callback(indicator) : true;
                }
                error(errMessage || this.generateMessage(type, requiredIndicator));
                return false;
            },
            /**
             * @private
             * @param {string} indicatorType
             *        Indicator type
             * @param {string} required
             *        Required indicator
             * @return {string}
             *         Error message
             */
            generateMessage: function (indicatorType, required) {
                return 'Error: "' + indicatorType +
                    '" indicator type requires "' + required +
                    '" indicator loaded before. Please read docs: ' +
                    'https://api.highcharts.com/highstock/plotOptions.' +
                    indicatorType;
            }
        };

        return requiredIndicatorMixin;
    });
    _registerModule(_modules, 'indicators/slow-stochastic.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicator) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesTypes = H.seriesTypes;
        /**
         * The Slow Stochastic series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.slowstochastic
         *
         * @augments Highcharts.Series
         */
        H.seriesType('slowstochastic', 'stochastic', 
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
        {
            params: {
                /**
                 * Periods for Slow Stochastic oscillator: [%K, %D, SMA(%D)].
                 *
                 * @type    {Array<number,number,number>}
                 * @default [14, 3, 3]
                 */
                periods: [14, 3, 3]
            }
        }, 
        /**
         * @lends Highcharts.Series#
         */
        {
            nameBase: 'Slow Stochastic',
            init: function () {
                var args = arguments,
                    ctx = this;
                requiredIndicator.isParentLoaded(H.seriesTypes.stochastic, 'stochastic', ctx.type, function (indicator) {
                    indicator.prototype.init.apply(ctx, args);
                    return;
                });
            },
            getValues: function (series, params) {
                var periods = params.periods,
                    fastValues = seriesTypes.stochastic.prototype.getValues.call(this,
                    series,
                    params),
                    slowValues = {
                        values: [],
                        xData: [],
                        yData: []
                    };
                var i = 0;
                if (!fastValues) {
                    return;
                }
                slowValues.xData = fastValues.xData.slice(periods[1] - 1);
                var fastYData = fastValues.yData.slice(periods[1] - 1);
                // Get SMA(%D)
                var smoothedValues = seriesTypes.sma.prototype.getValues.call(this, {
                        xData: slowValues.xData,
                        yData: fastYData
                    }, {
                        index: 1,
                        period: periods[2]
                    });
                if (!smoothedValues) {
                    return;
                }
                var xDataLen = slowValues.xData.length;
                // Format data
                for (; i < xDataLen; i++) {
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
        });
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
        ''; // to include the above in the js output

    });
    _registerModule(_modules, 'masters/indicators/slow-stochastic.src.js', [], function () {


    });
}));