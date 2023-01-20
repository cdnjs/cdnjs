/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/apo', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/APO/APOIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        var EMAIndicator = SeriesRegistry.seriesTypes.ema;
        var extend = U.extend,
            merge = U.merge,
            error = U.error;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The APO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.apo
         *
         * @augments Highcharts.Series
         */
        var APOIndicator = /** @class */ (function (_super) {
                __extends(APOIndicator, _super);
            function APOIndicator() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            APOIndicator.prototype.getValues = function (series, params) {
                var periods = params.periods,
                    index = params.index, 
                    // 0- date, 1- Absolute price oscillator
                    APO = [],
                    xData = [],
                    yData = [],
                    periodsOffset, 
                    // Shorter Period EMA
                    SPE, 
                    // Longer Period EMA
                    LPE,
                    oscillator,
                    i;
                // Check if periods are correct
                if (periods.length !== 2 || periods[1] <= periods[0]) {
                    error('Error: "APO requires two periods. Notice, first period ' +
                        'should be lower than the second one."');
                    return;
                }
                SPE = EMAIndicator.prototype.getValues.call(this, series, {
                    index: index,
                    period: periods[0]
                });
                LPE = EMAIndicator.prototype.getValues.call(this, series, {
                    index: index,
                    period: periods[1]
                });
                // Check if ema is calculated properly, if not skip
                if (!SPE || !LPE) {
                    return;
                }
                periodsOffset = periods[1] - periods[0];
                for (i = 0; i < LPE.yData.length; i++) {
                    oscillator = (SPE.yData[i + periodsOffset] -
                        LPE.yData[i]);
                    APO.push([LPE.xData[i], oscillator]);
                    xData.push(LPE.xData[i]);
                    yData.push(oscillator);
                }
                return {
                    values: APO,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Absolute Price Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/apo
             *         Absolute Price Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/apo
             * @optionparent plotOptions.apo
             */
            APOIndicator.defaultOptions = merge(EMAIndicator.defaultOptions, {
                /**
                 * Paramters used in calculation of Absolute Price Oscillator
                 * series points.
                 *
                 * @excluding period
                 */
                params: {
                    period: void 0,
                    /**
                     * Periods for Absolute Price Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [10, 20]
                     * @since   7.0.0
                     */
                    periods: [10, 20]
                }
            });
            return APOIndicator;
        }(EMAIndicator));
        extend(APOIndicator.prototype, {
            nameBase: 'APO',
            nameComponents: ['periods']
        });
        SeriesRegistry.registerSeriesType('apo', APOIndicator);
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
         * An `Absolute Price Oscillator` series. If the [type](#series.apo.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.apo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/apo
         * @apioption series.apo
         */
        ''; // to include the above in the js output

        return APOIndicator;
    });
    _registerModule(_modules, 'masters/indicators/apo.src.js', [], function () {


    });
}));