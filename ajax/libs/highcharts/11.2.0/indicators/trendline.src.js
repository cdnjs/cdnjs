/**
 * @license Highstock JS v11.2.0 (2023-10-30)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/trendline', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/TrendLine/TrendLineIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge, isArray } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Trend line series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.trendline
         *
         * @augments Highcharts.Series
         */
        class TrendLineIndicator extends SMAIndicator {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                /* *
                 *
                 *   Properties
                 *
                 * */
                this.data = void 0;
                this.options = void 0;
                this.points = void 0;
                this.updateAllPoints = true;
            }
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const xVal = series.xData, yVal = series.yData, LR = [], xData = [], yData = [], xValLength = xVal.length, index = params.index;
                let sumX = (xValLength - 1) * xValLength / 2, sumY = 0, sumXY = 0, sumX2 = ((xValLength - 1) * (xValLength) * (2 * xValLength - 1)) / 6, alpha, i, y;
                // Get sums:
                for (i = 0; i < xValLength; i++) {
                    y = isArray(yVal[i]) ? yVal[i][index] : yVal[i];
                    sumY += y;
                    sumXY += i * y;
                }
                // Get slope and offset:
                alpha = (xValLength * sumXY - sumX * sumY) /
                    (xValLength * sumX2 - sumX * sumX);
                if (isNaN(alpha)) {
                    alpha = 0;
                }
                const beta = (sumY - alpha * sumX) / xValLength;
                // Calculate linear regression:
                for (i = 0; i < xValLength; i++) {
                    y = alpha * i + beta;
                    // Prepare arrays required for getValues() method
                    LR[i] = [xVal[i], y];
                    xData[i] = xVal[i];
                    yData[i] = y;
                }
                return {
                    xData: xData,
                    yData: yData,
                    values: LR
                };
            }
        }
        /**
         * Trendline (linear regression) fits a straight line to the selected data
         * using a method called the Sum Of Least Squares. This series requires the
         * `linkedTo` option to be set.
         *
         * @sample stock/indicators/trendline
         *         Trendline indicator
         *
         * @extends      plotOptions.sma
         * @since        7.1.3
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/trendline
         * @optionparent plotOptions.trendline
         */
        TrendLineIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * @excluding period
             */
            params: {
                period: void 0,
                /**
                 * The point index which indicator calculations will base. For
                 * example using OHLC data, index=2 means the indicator will be
                 * calculated using Low values.
                 *
                 * @default 3
                 */
                index: 3
            }
        });
        extend(TrendLineIndicator.prototype, {
            nameBase: 'Trendline',
            nameComponents: false
        });
        SeriesRegistry.registerSeriesType('trendline', TrendLineIndicator);
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
         * A `TrendLine` series. If the [type](#series.trendline.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.trendline
         * @since     7.1.3
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/trendline
         * @apioption series.trendline
         */
        ''; // to include the above in the js output

        return TrendLineIndicator;
    });
    _registerModule(_modules, 'masters/indicators/trendline.src.js', [], function () {


    });
}));