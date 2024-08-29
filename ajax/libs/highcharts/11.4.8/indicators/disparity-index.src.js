/**
 * @license Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2024 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/disparity-index', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *  (c) 2010-2024 Rafal Sebestjanski
         *
         *  Disparity Index technical indicator for Highcharts Stock
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { correctFloat, defined, extend, isArray, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Disparity Index series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.disparityindex
         *
         * @augments Highcharts.Series
         */
        class DisparityIndexIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            init() {
                const args = arguments, ctx = this, // Disparity Index indicator
                params = args[1].params, // Options.params
                averageType = params && params.average ? params.average : void 0;
                ctx.averageIndicator = SeriesRegistry
                    .seriesTypes[averageType] || SMAIndicator;
                ctx.averageIndicator.prototype.init.apply(ctx, args);
            }
            calculateDisparityIndex(curPrice, periodAverage) {
                return correctFloat(curPrice - periodAverage) / periodAverage * 100;
            }
            getValues(series, params) {
                const index = params.index, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, disparityIndexPoint = [], xData = [], yData = [], 
                // "as any" because getValues doesn't exist on typeof Series
                averageIndicator = this.averageIndicator, isOHLC = isArray(yVal[0]), 
                // Get the average indicator's values
                values = averageIndicator.prototype.getValues(series, params), yValues = values.yData, start = xVal.indexOf(values.xData[0]);
                // Check period, if bigger than points length, skip
                if (!yValues || yValues.length === 0 ||
                    !defined(index) ||
                    yVal.length <= start) {
                    return;
                }
                // Get the Disparity Index indicator's values
                for (let i = start; i < yValLen; i++) {
                    const disparityIndexValue = this.calculateDisparityIndex(isOHLC ? yVal[i][index] : yVal[i], yValues[i - start]);
                    disparityIndexPoint.push([
                        xVal[i],
                        disparityIndexValue
                    ]);
                    xData.push(xVal[i]);
                    yData.push(disparityIndexValue);
                }
                return {
                    values: disparityIndexPoint,
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
         * Disparity Index.
         * This series requires the `linkedTo` option to be set and should
         * be loaded after the `stock/indicators/indicators.js` file.
         *
         * @sample stock/indicators/disparity-index
         *         Disparity Index indicator
         *
         * @extends      plotOptions.sma
         * @since 9.1.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
         *               pointInterval, pointIntervalUnit, pointPlacement,
         *               pointRange, pointStart, showInNavigator, stacking
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/disparity-index
         * @optionparent plotOptions.disparityindex
         */
        DisparityIndexIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            params: {
                /**
                 * The average used to calculate the Disparity Index indicator.
                 * By default it uses SMA, with EMA as an option. To use other
                 * averages, e.g. TEMA, the `stock/indicators/tema.js` file needs to
                 * be loaded.
                 *
                 * If value is different than `ema`, `dema`, `tema` or `wma`,
                 * then sma is used.
                 */
                average: 'sma',
                index: 3
            },
            marker: {
                enabled: false
            },
            dataGrouping: {
                approximation: 'averages'
            }
        });
        extend(DisparityIndexIndicator.prototype, {
            nameBase: 'Disparity Index',
            nameComponents: ['period', 'average']
        });
        SeriesRegistry.registerSeriesType('disparityindex', DisparityIndexIndicator);
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
         * The Disparity Index indicator series.
         * If the [type](#series.disparityindex.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.disparityindex
         * @since 9.1.0
         * @product   highstock
         * @excluding allAreas, colorAxis,  dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/disparity-index
         * @apioption series.disparityindex
         */
        ''; // To include the above in the js output

        return DisparityIndexIndicator;
    });
    _registerModule(_modules, 'masters/indicators/disparity-index.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
