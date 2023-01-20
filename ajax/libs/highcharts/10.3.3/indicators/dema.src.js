/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Rafał Sebestjański
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Stock/Indicators/DEMA/DEMAIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        var correctFloat = U.correctFloat,
            isArray = U.isArray,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The DEMA series Type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dema
         *
         * @augments Highcharts.Series
         */
        var DEMAIndicator = /** @class */ (function (_super) {
                __extends(DEMAIndicator, _super);
            function DEMAIndicator() {
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
                _this.EMApercent = void 0;
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
            DEMAIndicator.prototype.getEMA = function (yVal, prevEMA, SMA, index, i, xVal) {
                return _super.prototype.calculateEma.call(this, xVal || [], yVal, typeof i === 'undefined' ? 1 : i, this.EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
            };
            DEMAIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    EMAvalues = [],
                    doubledPeriod = 2 * period,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    DEMA = [],
                    xDataDema = [],
                    yDataDema = [];
                var accumulatePeriodPoints = 0,
                    EMA = 0, 
                    // EMA(EMA)
                    EMAlevel2, 
                    // EMA of previous point
                    prevEMA,
                    prevEMAlevel2, 
                    // EMA values array
                    i,
                    index = -1,
                    DEMAPoint,
                    SMA = 0;
                this.EMApercent = (2 / (period + 1));
                // Check period, if bigger than EMA points length, skip
                if (yValLen < 2 * period - 1) {
                    return;
                }
                // Switch index for OHLC / Candlestick / Arearange
                if (isArray(yVal[0])) {
                    index = params.index ? params.index : 0;
                }
                // Accumulate first N-points
                accumulatePeriodPoints =
                    _super.prototype.accumulatePeriodPoints.call(this, period, index, yVal);
                // first point
                SMA = accumulatePeriodPoints / period;
                accumulatePeriodPoints = 0;
                // Calculate value one-by-one for each period in visible data
                for (i = period; i < yValLen + 2; i++) {
                    if (i < yValLen + 1) {
                        EMA = this.getEMA(yVal, prevEMA, SMA, index, i)[1];
                        EMAvalues.push(EMA);
                    }
                    prevEMA = EMA;
                    // Summing first period points for EMA(EMA)
                    if (i < doubledPeriod) {
                        accumulatePeriodPoints += EMA;
                    }
                    else {
                        // Calculate DEMA
                        // First DEMA point
                        if (i === doubledPeriod) {
                            SMA = accumulatePeriodPoints / period;
                        }
                        EMA = EMAvalues[i - period - 1];
                        EMAlevel2 = this.getEMA([EMA], prevEMAlevel2, SMA)[1];
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
            };
            /**
             * Double exponential moving average (DEMA) indicator. This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js`.
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
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/dema
             * @optionparent plotOptions.dema
             */
            DEMAIndicator.defaultOptions = merge(EMAIndicator.defaultOptions);
            return DEMAIndicator;
        }(EMAIndicator));
        SeriesRegistry.registerSeriesType('dema', DEMAIndicator);
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
         * A `DEMA` series. If the [type](#series.dema.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/dema
         * @apioption series.dema
         */
        ''; // adds doclet above to the transpiled file

        return DEMAIndicator;
    });
    _registerModule(_modules, 'masters/indicators/dema.src.js', [], function () {


    });
}));