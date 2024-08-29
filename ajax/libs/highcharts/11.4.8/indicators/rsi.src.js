/**
 * @license Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Fus
 *
 * License: www.highcharts.com/license
 */
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
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
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
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { isNumber, merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        // Utils:
        /**
         *
         */
        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The RSI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.rsi
         *
         * @augments Highcharts.Series
         */
        class RSIIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, decimals = params.decimals, 
                // RSI starts calculations from the second point
                // Cause we need to calculate change between two points
                RSI = [], xData = [], yData = [];
                let gain = 0, loss = 0, index = params.index, range = 1, RSIPoint, change, avgGain, avgLoss, i, values;
                if ((xVal.length < period)) {
                    return;
                }
                if (isNumber(yVal[0])) {
                    values = yVal;
                }
                else {
                    // In case of the situation, where the series type has data length
                    // longer then 4 (HLC, range), this ensures that we are not trying
                    // to reach the index out of bounds
                    index = Math.min(index, yVal[0].length - 1);
                    values = yVal
                        .map((value) => value[index]);
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
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        SeriesRegistry.registerSeriesType('rsi', RSIIndicator);
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
        ''; // To include the above in the js output

        return RSIIndicator;
    });
    _registerModule(_modules, 'masters/indicators/rsi.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
