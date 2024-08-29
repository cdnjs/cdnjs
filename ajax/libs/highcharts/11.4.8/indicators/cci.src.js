/**
 * @license Highstock JS v11.4.8 (2024-08-29)
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
        define('highcharts/indicators/cci', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/CCI/CCIIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { isArray, merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        // Utils:
        /**
         * @private
         */
        function sumArray(array) {
            return array.reduce(function (prev, cur) {
                return prev + cur;
            }, 0);
        }
        /**
         * @private
         */
        function meanDeviation(arr, sma) {
            const len = arr.length;
            let sum = 0, i;
            for (i = 0; i < len; i++) {
                sum += Math.abs(sma - (arr[i]));
            }
            return sum;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The CCI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.cci
         *
         * @augments Highcharts.Series
         */
        class CCIIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, TP = [], CCI = [], xData = [], yData = [];
                let CCIPoint, p, periodTP = [], len, range = 1, smaTP, TPtemp, meanDev, i;
                // CCI requires close value
                if (xVal.length <= period ||
                    !isArray(yVal[0]) ||
                    yVal[0].length !== 4) {
                    return;
                }
                // Accumulate first N-points
                while (range < period) {
                    p = yVal[range - 1];
                    TP.push((p[1] + p[2] + p[3]) / 3);
                    range++;
                }
                for (i = period; i <= yValLen; i++) {
                    p = yVal[i - 1];
                    TPtemp = (p[1] + p[2] + p[3]) / 3;
                    len = TP.push(TPtemp);
                    periodTP = TP.slice(len - period);
                    smaTP = sumArray(periodTP) / period;
                    meanDev = meanDeviation(periodTP, smaTP) / period;
                    CCIPoint = ((TPtemp - smaTP) / (0.015 * meanDev));
                    CCI.push([xVal[i - 1], CCIPoint]);
                    xData.push(xVal[i - 1]);
                    yData.push(CCIPoint);
                }
                return {
                    values: CCI,
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
         * Commodity Channel Index (CCI). This series requires `linkedTo` option to
         * be set.
         *
         * @sample stock/indicators/cci
         *         CCI indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/cci
         * @optionparent plotOptions.cci
         */
        CCIIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * @excluding index
             */
            params: {
                index: void 0 // Unused index, do not inherit (#15362)
            }
        });
        SeriesRegistry.registerSeriesType('cci', CCIIndicator);
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
         * A `CCI` series. If the [type](#series.cci.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.cci
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/cci
         * @apioption series.cci
         */
        ''; // To include the above in the js output

        return CCIIndicator;
    });
    _registerModule(_modules, 'masters/indicators/cci.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
