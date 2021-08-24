/**
 * @license Highstock JS v9.2.2 (2021-08-24)
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2021 Pawel Fus
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
    _registerModule(_modules, 'Mixins/IndicatorRequired.js', [_modules['Core/Utilities.js']], function (U) {
        /**
         *
         *  (c) 2010-2021 Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var error = U.error;
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
    _registerModule(_modules, 'Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js', [_modules['Mixins/IndicatorRequired.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (RequiredIndicatorMixin, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var StochasticIndicator = SeriesRegistry.seriesTypes.stochastic;
        var seriesTypes = SeriesRegistry.seriesTypes;
        var extend = U.extend,
            merge = U.merge;
        /**
         * The Slow Stochastic series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.slowstochastic
         *
         * @augments Highcharts.Series
         */
        var SlowStochasticIndicator = /** @class */ (function (_super) {
                __extends(SlowStochasticIndicator, _super);
            function SlowStochasticIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            SlowStochasticIndicator.prototype.init = function () {
                var args = arguments,
                    ctx = this;
                RequiredIndicatorMixin.isParentLoaded(seriesTypes.stochastic, 'stochastic', ctx.type, function (indicator) {
                    indicator.prototype.init.apply(ctx, args);
                    return;
                });
            };
            SlowStochasticIndicator.prototype.getValues = function (series, params) {
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
            };
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
            return SlowStochasticIndicator;
        }(StochasticIndicator));
        extend(SlowStochasticIndicator.prototype, {
            nameBase: 'Slow Stochastic'
        });
        SeriesRegistry.registerSeriesType('slowstochastic', SlowStochasticIndicator);
        /* *
         *
         *  Default Export
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
        ''; // to include the above in the js output

        return SlowStochasticIndicator;
    });
    _registerModule(_modules, 'masters/indicators/slow-stochastic.src.js', [], function () {


    });
}));