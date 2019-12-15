/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/ppo', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
         * (c) 2010-2019 Daniel Studencki
         *
         * License: www.highcharts.com/license
         */


        var error = H.error;

        var requiredIndicatorMixin = {
            /**
             * Check whether given indicator is loaded, else throw error.
             * @param {function} indicator Indicator constructor function.
             * @param {string} requiredIndicator required indicator type.
             * @param {string} type Type of indicator where function was called (parent).
             * @param {function} callback Callback which is triggered if the given
             *                            indicator is loaded. Takes indicator as
             *                            an argument.
             * @param {string} errMessage Error message that will be logged in console.
             * @returns {boolean} Returns false when there is no required indicator loaded.
             */
            isParentLoaded: function (
                indicator,
                requiredIndicator,
                type,
                callback,
                errMessage
            ) {
                if (indicator) {
                    return callback ? callback(indicator) : true;
                }
                error(
                    errMessage || this.generateMessage(type, requiredIndicator)
                );
                return false;
            },
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
    _registerModule(_modules, 'indicators/ppo.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var EMA = H.seriesTypes.ema,
            error = H.error,
            correctFloat = H.correctFloat,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The PPO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ppo
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'ppo',
            'ema',
            /**
             * Percentage Price Oscillator. This series requires the
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/ppo
             *         Percentage Price Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.ppo
             */
            {
                /**
                 * Paramters used in calculation of Percentage Price Oscillator series
                 * points.
                 *
                 * @excluding period
                 */
                params: {
                    /**
                     * Periods for Percentage Price Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [12, 26]
                     */
                    periods: [12, 26]
                }
            },
            /**
             * @lends Highcharts.Series.prototype
             */
            {
                nameBase: 'PPO',
                nameComponents: ['periods'],
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMA,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getValues: function (series, params) {
                    var periods = params.periods,
                        index = params.index,
                        PPO = [], // 0- date, 1- Percentage Price Oscillator
                        xData = [],
                        yData = [],
                        periodsOffset,
                        SPE, // Shorter Period EMA
                        LPE, // Longer Period EMA
                        oscillator,
                        i;

                    // Check if periods are correct
                    if (periods.length !== 2 || periods[1] <= periods[0]) {
                        error(
                            'Error: "PPO requires two periods. Notice, first period ' +
                            'should be lower than the second one."'
                        );
                        return false;
                    }

                    SPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[0]
                    });

                    LPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[1]
                    });

                    // Check if ema is calculated properly, if not skip
                    if (!SPE || !LPE) {
                        return false;
                    }

                    periodsOffset = periods[1] - periods[0];

                    for (i = 0; i < LPE.yData.length; i++) {
                        oscillator = correctFloat(
                            (SPE.yData[i + periodsOffset] - LPE.yData[i]) /
                            LPE.yData[i] *
                            100
                        );

                        PPO.push([LPE.xData[i], oscillator]);
                        xData.push(LPE.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: PPO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Percentage Price Oscillator` series. If the [type](#series.ppo.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ppo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.ppo
         */

    });
    _registerModule(_modules, 'masters/indicators/ppo.src.js', [], function () {


    });
}));