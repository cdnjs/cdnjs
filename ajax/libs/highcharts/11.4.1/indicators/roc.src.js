/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/roc', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/ROC/ROCIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { isArray, merge, extend } = U;
        /* *
         *
         *  Functions
         *
         * */
        // Utils:
        /**
         *
         */
        function populateAverage(xVal, yVal, i, period, index) {
            /* Calculated as:

               (Closing Price [today] - Closing Price [n days ago]) /
                Closing Price [n days ago] * 100

               Return y as null when avoiding division by zero */
            let nDaysAgoY, rocY;
            if (index < 0) {
                // Y data given as an array of values
                nDaysAgoY = yVal[i - period];
                rocY = nDaysAgoY ?
                    (yVal[i] - nDaysAgoY) / nDaysAgoY * 100 :
                    null;
            }
            else {
                // Y data given as an array of arrays and the index should be used
                nDaysAgoY = yVal[i - period][index];
                rocY = nDaysAgoY ?
                    (yVal[i][index] - nDaysAgoY) / nDaysAgoY * 100 :
                    null;
            }
            return [xVal[i], rocY];
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The ROC series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.roc
         *
         * @augments Highcharts.Series
         */
        class ROCIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, ROC = [], xData = [], yData = [];
                let i, index = -1, ROCPoint;
                // Period is used as a number of time periods ago, so we need more
                // (at least 1 more) data than the period value
                if (xVal.length <= period) {
                    return;
                }
                // Switch index for OHLC / Candlestick / Arearange
                if (isArray(yVal[0])) {
                    index = params.index;
                }
                // I = period <-- skip first N-points
                // Calculate value one-by-one for each period in visible data
                for (i = period; i < yValLen; i++) {
                    ROCPoint = populateAverage(xVal, yVal, i, period, index);
                    ROC.push(ROCPoint);
                    xData.push(ROCPoint[0]);
                    yData.push(ROCPoint[1]);
                }
                return {
                    values: ROC,
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
         * Rate of change indicator (ROC). The indicator value for each point
         * is defined as:
         *
         * `(C - Cn) / Cn * 100`
         *
         * where: `C` is the close value of the point of the same x in the
         * linked series and `Cn` is the close value of the point `n` periods
         * ago. `n` is set through [period](#plotOptions.roc.params.period).
         *
         * This series requires `linkedTo` option to be set.
         *
         * @sample stock/indicators/roc
         *         Rate of change indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/roc
         * @optionparent plotOptions.roc
         */
        ROCIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            params: {
                index: 3,
                period: 9
            }
        });
        extend(ROCIndicator.prototype, {
            nameBase: 'Rate of Change'
        });
        SeriesRegistry.registerSeriesType('roc', ROCIndicator);
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
         * A `ROC` series. If the [type](#series.wma.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * Rate of change indicator (ROC). The indicator value for each point
         * is defined as:
         *
         * `(C - Cn) / Cn * 100`
         *
         * where: `C` is the close value of the point of the same x in the
         * linked series and `Cn` is the close value of the point `n` periods
         * ago. `n` is set through [period](#series.roc.params.period).
         *
         * This series requires `linkedTo` option to be set.
         *
         * @extends   series,plotOptions.roc
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/roc
         * @apioption series.roc
         */
        ''; // To include the above in the js output

        return ROCIndicator;
    });
    _registerModule(_modules, 'masters/indicators/roc.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));