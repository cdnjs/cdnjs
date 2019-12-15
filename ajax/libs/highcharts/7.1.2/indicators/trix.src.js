/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/trix', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/trix.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicator) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var correctFloat = H.correctFloat,
            TEMA = H.seriesTypes.tema;

        /**
         * The TRIX series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.trix
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'trix',
            'tema',
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set.
             *
             * Requires https://code.highcharts.com/stock/indicators/ema.js
             * and https://code.highcharts.com/stock/indicators/tema.js.
             *
             * @sample {highstock} stock/indicators/trix
             *         TRIX indicator
             *
             * @extends      plotOptions.tema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.trix
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        TEMA,
                        'tema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getPoint: function (
                    xVal,
                    tripledPeriod,
                    EMAlevels,
                    i
                ) {
                    if (i > tripledPeriod) {
                        var TRIXPoint = [
                            xVal[i - 3],
                            EMAlevels.prevLevel3 !== 0 ?
                                correctFloat(EMAlevels.level3 - EMAlevels.prevLevel3) /
                              EMAlevels.prevLevel3 * 100 : null
                        ];
                    }

                    return TRIXPoint;
                }
            }
        );

        /**
         * A `TRIX` series. If the [type](#series.tema.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.tema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.trix
         */

    });
    _registerModule(_modules, 'masters/indicators/trix.src.js', [], function () {


    });
}));