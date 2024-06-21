/**
 * @license Highstock JS v11.4.3 (2024-05-22)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/dpo', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/DPO/DPOIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge, correctFloat, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        // Utils:
        /**
         * @private
         */
        function accumulatePoints(sum, yVal, i, index, subtract) {
            const price = pick(yVal[i][index], yVal[i]);
            if (subtract) {
                return correctFloat(sum - price);
            }
            return correctFloat(sum + price);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The DPO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dpo
         *
         * @augments Highcharts.Series
         */
        class DPOIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, index = params.index, offset = Math.floor(period / 2 + 1), range = period + offset, xVal = series.xData || [], yVal = series.yData || [], yValLen = yVal.length, 
                // 0- date, 1- Detrended Price Oscillator
                DPO = [], xData = [], yData = [];
                let oscillator, periodIndex, rangeIndex, price, i, j, sum = 0;
                if (xVal.length <= range) {
                    return;
                }
                // Accumulate first N-points for SMA
                for (i = 0; i < period - 1; i++) {
                    sum = accumulatePoints(sum, yVal, i, index);
                }
                // Detrended Price Oscillator formula:
                // DPO = Price - Simple moving average [from (n / 2 + 1) days ago]
                for (j = 0; j <= yValLen - range; j++) {
                    periodIndex = j + period - 1;
                    rangeIndex = j + range - 1;
                    // Adding the last period point
                    sum = accumulatePoints(sum, yVal, periodIndex, index);
                    price = pick(yVal[rangeIndex][index], yVal[rangeIndex]);
                    oscillator = price - sum / period;
                    // Subtracting the first period point
                    sum = accumulatePoints(sum, yVal, j, index, true);
                    DPO.push([xVal[rangeIndex], oscillator]);
                    xData.push(xVal[rangeIndex]);
                    yData.push(oscillator);
                }
                return {
                    values: DPO,
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
         * Detrended Price Oscillator. This series requires the `linkedTo` option to
         * be set and should be loaded after the `stock/indicators/indicators.js`.
         *
         * @sample {highstock} stock/indicators/dpo
         *         Detrended Price Oscillator
         *
         * @extends      plotOptions.sma
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
         *               navigatorOptions, pointInterval, pointIntervalUnit,
         *               pointPlacement, pointRange, pointStart, showInNavigator,
         *               stacking
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/dpo
         * @optionparent plotOptions.dpo
         */
        DPOIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * Parameters used in calculation of Detrended Price Oscillator series
             * points.
             */
            params: {
                index: 0,
                /**
                 * Period for Detrended Price Oscillator
                 */
                period: 21
            }
        });
        extend(DPOIndicator.prototype, {
            nameBase: 'DPO'
        });
        SeriesRegistry.registerSeriesType('dpo', DPOIndicator);
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
         * A Detrended Price Oscillator. If the [type](#series.dpo.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dpo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/dpo
         * @apioption series.dpo
         */
        ''; // To include the above in the js output'

        return DPOIndicator;
    });
    _registerModule(_modules, 'masters/indicators/dpo.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));