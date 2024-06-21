/**
 * @license Highstock JS v11.4.3 (2024-05-22)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
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
                this.updateAllPoints = true;
            }
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const orgXVal = series.xData, yVal = series.yData, xVal = [], LR = [], xData = [], yData = [], index = params.index;
                let numerator = 0, denominator = 0, xValSum = 0, yValSum = 0, counter = 0;
                // Create an array of consecutive xValues, (don't remove duplicates)
                for (let i = 0; i < orgXVal.length; i++) {
                    if (i === 0 || orgXVal[i] !== orgXVal[i - 1]) {
                        counter++;
                    }
                    xVal.push(counter);
                }
                for (let i = 0; i < xVal.length; i++) {
                    xValSum += xVal[i];
                    yValSum += isArray(yVal[i]) ? yVal[i][index] : yVal[i];
                }
                const meanX = xValSum / xVal.length, meanY = yValSum / yVal.length;
                for (let i = 0; i < xVal.length; i++) {
                    const y = isArray(yVal[i]) ? yVal[i][index] : yVal[i];
                    numerator += (xVal[i] - meanX) * (y - meanY);
                    denominator += Math.pow(xVal[i] - meanX, 2);
                }
                // Calculate linear regression:
                for (let i = 0; i < xVal.length; i++) {
                    // Check if the xVal is already used
                    if (orgXVal[i] === xData[xData.length - 1]) {
                        continue;
                    }
                    const x = orgXVal[i], y = meanY + (numerator / denominator) * (xVal[i] - meanX);
                    LR.push([x, y]);
                    xData.push(x);
                    yData.push(y);
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
            nameComponents: void 0
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
        ''; // To include the above in the js output

        return TrendLineIndicator;
    });
    _registerModule(_modules, 'masters/indicators/trendline.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));