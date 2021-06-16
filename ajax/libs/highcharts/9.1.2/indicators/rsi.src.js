/**
 * @license Highstock JS v9.1.2 (2021-06-16)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Paweł Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/rsi', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/RSI/RSIIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        var SMAIndicator = SeriesRegistry.seriesTypes.sma;
        var isNumber = U.isNumber,
            merge = U.merge;
        /* eslint-disable require-jsdoc */
        // Utils:
        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }
        /* eslint-enable require-jsdoc */
        /**
         * The RSI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.rsi
         *
         * @augments Highcharts.Series
         */
        var RSIIndicator = /** @class */ (function (_super) {
                __extends(RSIIndicator, _super);
            function RSIIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.points = void 0;
                _this.options = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            RSIIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    decimals = params.decimals, 
                    // RSI starts calculations from the second point
                    // Cause we need to calculate change between two points
                    range = 1,
                    RSI = [],
                    xData = [],
                    yData = [],
                    index = params.index,
                    gain = 0,
                    loss = 0,
                    RSIPoint,
                    change,
                    avgGain,
                    avgLoss,
                    i,
                    values;
                if ((xVal.length < period)) {
                    return;
                }
                if (isNumber(yVal[0])) {
                    values = yVal;
                }
                else {
                    // in case of the situation, where the series type has data length
                    // longer then 4 (HLC, range), this ensures that we are not trying
                    // to reach the index out of bounds
                    index = Math.min(index, yVal[0].length - 1);
                    values = yVal.map(function (value) { return value[index]; });
                }
                // Calculate changes for first N points
                while (range < period) {
                    change = toFixed(values[range] - values[range - 1], decimals);
                    if (change > 0) {
                        gain += change;
                    }
                    else {
                        loss += Math.abs(change);
                    }
                    range++;
                }
                // Average for first n-1 points:
                avgGain = toFixed(gain / (period - 1), decimals);
                avgLoss = toFixed(loss / (period - 1), decimals);
                for (i = range; i < yValLen; i++) {
                    change = toFixed(values[i] - values[i - 1], decimals);
                    if (change > 0) {
                        gain = change;
                        loss = 0;
                    }
                    else {
                        gain = 0;
                        loss = Math.abs(change);
                    }
                    // Calculate smoothed averages, RS, RSI values:
                    avgGain = toFixed((avgGain * (period - 1) + gain) / period, decimals);
                    avgLoss = toFixed((avgLoss * (period - 1) + loss) / period, decimals);
                    // If average-loss is equal zero, then by definition RSI is set
                    // to 100:
                    if (avgLoss === 0) {
                        RSIPoint = 100;
                        // If average-gain is equal zero, then by definition RSI is set
                        // to 0:
                    }
                    else if (avgGain === 0) {
                        RSIPoint = 0;
                    }
                    else {
                        RSIPoint = toFixed(100 - (100 / (1 + (avgGain / avgLoss))), decimals);
                    }
                    RSI.push([xVal[i], RSIPoint]);
                    xData.push(xVal[i]);
                    yData.push(RSIPoint);
                }
                return {
                    values: RSI,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Relative strength index (RSI) technical indicator. This series
             * requires the `linkedTo` option to be set and should be loaded after
             * the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/rsi
             *         RSI indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/rsi
             * @optionparent plotOptions.rsi
             */
            RSIIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                params: {
                    decimals: 4,
                    index: 3
                }
            });
            return RSIIndicator;
        }(SMAIndicator));
        SeriesRegistry.registerSeriesType('rsi', RSIIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A `RSI` series. If the [type](#series.rsi.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.rsi
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/rsi
         * @apioption series.rsi
         */
        ''; // to include the above in the js output

        return RSIIndicator;
    });
    _registerModule(_modules, 'masters/indicators/rsi.src.js', [], function () {


    });
}));