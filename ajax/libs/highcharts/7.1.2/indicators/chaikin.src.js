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
        define('highcharts/indicators/chaikin', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/chaikin.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var EMA = H.seriesTypes.ema,
            AD = H.seriesTypes.ad,
            error = H.error,
            correctFloat = H.correctFloat,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The Chaikin series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.chaikin
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'chaikin',
            'ema',
            /**
             * Chaikin Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`
             * and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/chaikin
             *         Chaikin Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.chaikin
             */
            {
                /**
                 * Paramters used in calculation of Chaikin Oscillator
                 * series points.
                 *
                 * @excluding index, period
                 */
                params: {
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume',
                    /**
                     * Periods for Chaikin Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [3, 10]
                     */
                    periods: [3, 10]
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Chaikin Osc',
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
                        period = params.period,
                        ADL, // Accumulation Distribution Line data
                        CHA = [], // 0- date, 1- Chaikin Oscillator
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
                            'Error: "Chaikin requires two periods. Notice, first ' +
                            'period should be lower than the second one."'
                        );
                        return false;
                    }

                    ADL = AD.prototype.getValues.call(this, series, {
                        volumeSeriesID: params.volumeSeriesID,
                        period: period
                    });

                    // Check if adl is calculated properly, if not skip
                    if (!ADL) {
                        return false;
                    }

                    SPE = EMA.prototype.getValues.call(this, ADL, {
                        period: periods[0]
                    });

                    LPE = EMA.prototype.getValues.call(this, ADL, {
                        period: periods[1]
                    });

                    // Check if ema is calculated properly, if not skip
                    if (!SPE || !LPE) {
                        return false;
                    }

                    periodsOffset = periods[1] - periods[0];

                    for (i = 0; i < LPE.yData.length; i++) {
                        oscillator = correctFloat(
                            SPE.yData[i + periodsOffset] - LPE.yData[i]
                        );

                        CHA.push([LPE.xData[i], oscillator]);
                        xData.push(LPE.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: CHA,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Chaikin Oscillator` series. If the [type](#series.chaikin.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.chaikin
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, stacking, showInNavigator
         * @apioption series.chaikin
         */

    });
    _registerModule(_modules, 'masters/indicators/chaikin.src.js', [], function () {


    });
}));