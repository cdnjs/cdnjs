/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Rafał Sebestjański
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/dema', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
             * Check whether given indicator is loaded, else throw error.
             * @private
             * @param {Highcharts.Indicator} indicator
             *        Indicator constructor function.
             * @param {string} requiredIndicator
             *        Required indicator type.
             * @param {string} type
             *        Type of indicator where function was called (parent).
             * @param {Highcharts.IndicatorConstructorFunction} callback
             *        Callback which is triggered if the given indicator is loaded.
             *        Takes indicator as an argument.
             * @param {string} errMessage
             *        Error message that will be logged in console.
             * @return {boolean}
             *         Returns false when there is no required indicator loaded.
             */
            isParentLoaded: function (indicator, requiredIndicator, type, callback, errMessage) {
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
    _registerModule(_modules, 'indicators/dema.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/indicator-required.js']], function (H, U, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = U.isArray;


        var EMAindicator = H.seriesTypes.ema,
            requiredIndicator = requiredIndicatorMixin,
            correctFloat = H.correctFloat;

        /**
         * The DEMA series Type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dema
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'dema',
            'ema',
            /**
             * Double exponential moving average (DEMA) indicator. This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/dema
             *         DEMA indicator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.dema
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
                        EMAindicator,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getEMA: function (
                    yVal,
                    prevEMA,
                    SMA,
                    index,
                    i,
                    xVal
                ) {

                    return EMAindicator.prototype.calculateEma(
                        xVal || [],
                        yVal,
                        i === undefined ? 1 : i,
                        this.chart.series[0].EMApercent,
                        prevEMA,
                        index === undefined ? -1 : index,
                        SMA
                    );
                },
                getValues: function (series, params) {
                    var period = params.period,
                        doubledPeriod = 2 * period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        index = -1,
                        accumulatePeriodPoints = 0,
                        SMA = 0,
                        DEMA = [],
                        xDataDema = [],
                        yDataDema = [],
                        EMA = 0,
                        // EMA(EMA)
                        EMAlevel2,
                        // EMA of previous point
                        prevEMA,
                        prevEMAlevel2,
                        // EMA values array
                        EMAvalues = [],
                        i,
                        DEMAPoint;

                    series.EMApercent = (2 / (period + 1));

                    // Check period, if bigger than EMA points length, skip
                    if (yValLen < 2 * period - 1) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index ? params.index : 0;
                    }

                    // Accumulate first N-points
                    accumulatePeriodPoints =
                        EMAindicator.prototype.accumulatePeriodPoints(
                            period,
                            index,
                            yVal
                        );

                    // first point
                    SMA = accumulatePeriodPoints / period;
                    accumulatePeriodPoints = 0;

                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen + 2; i++) {
                        if (i < yValLen + 1) {
                            EMA = this.getEMA(
                                yVal,
                                prevEMA,
                                SMA,
                                index,
                                i
                            )[1];
                            EMAvalues.push(EMA);
                        }
                        prevEMA = EMA;

                        // Summing first period points for EMA(EMA)
                        if (i < doubledPeriod) {
                            accumulatePeriodPoints += EMA;
                        } else {
                            // Calculate DEMA
                            // First DEMA point
                            if (i === doubledPeriod) {
                                SMA = accumulatePeriodPoints / period;
                            }
                            EMA = EMAvalues[i - period - 1];
                            EMAlevel2 = this.getEMA(
                                [EMA],
                                prevEMAlevel2,
                                SMA
                            )[1];
                            DEMAPoint = [
                                xVal[i - 2],
                                correctFloat(2 * EMA - EMAlevel2)
                            ];
                            DEMA.push(DEMAPoint);
                            xDataDema.push(DEMAPoint[0]);
                            yDataDema.push(DEMAPoint[1]);
                            prevEMAlevel2 = EMAlevel2;
                        }
                    }

                    return {
                        values: DEMA,
                        xData: xDataDema,
                        yData: yDataDema
                    };
                }
            }
        );

        /**
         * A `DEMA` series. If the [type](#series.ema.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.dema
         */

    });
    _registerModule(_modules, 'masters/indicators/dema.src.js', [], function () {


    });
}));