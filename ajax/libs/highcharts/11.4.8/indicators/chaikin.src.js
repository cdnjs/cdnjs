/**
 * @license Highstock JS v11.4.8 (2024-08-29)
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
        define('highcharts/indicators/chaikin', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/AD/ADIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { error, extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The AD series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ad
         *
         * @augments Highcharts.Series
         */
        class ADIndicator extends SMAIndicator {
            /* *
             *
             *  Static Functions
             *
             * */
            static populateAverage(xVal, yVal, yValVolume, i, 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _period) {
                const high = yVal[i][1], low = yVal[i][2], close = yVal[i][3], volume = yValVolume[i], adY = close === high && close === low || high === low ?
                    0 :
                    ((2 * close - low - high) / (high - low)) * volume, adX = xVal[i];
                return [adX, adY];
            }
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, volumeSeriesID = params.volumeSeriesID, volumeSeries = series.chart.get(volumeSeriesID), yValVolume = volumeSeries && volumeSeries.yData, yValLen = yVal ? yVal.length : 0, AD = [], xData = [], yData = [];
                let len, i, ADPoint;
                if (xVal.length <= period &&
                    yValLen &&
                    yVal[0].length !== 4) {
                    return;
                }
                if (!volumeSeries) {
                    error('Series ' +
                        volumeSeriesID +
                        ' not found! Check `volumeSeriesID`.', true, series.chart);
                    return;
                }
                // When i = period <-- skip first N-points
                // Calculate value one-by-one for each period in visible data
                for (i = period; i < yValLen; i++) {
                    len = AD.length;
                    ADPoint = ADIndicator.populateAverage(xVal, yVal, yValVolume, i, period);
                    if (len > 0) {
                        ADPoint[1] += AD[len - 1][1];
                    }
                    AD.push(ADPoint);
                    xData.push(ADPoint[0]);
                    yData.push(ADPoint[1]);
                }
                return {
                    values: AD,
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
         * Accumulation Distribution (AD). This series requires `linkedTo` option to
         * be set.
         *
         * @sample stock/indicators/accumulation-distribution
         *         Accumulation/Distribution indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/accumulation-distribution
         * @optionparent plotOptions.ad
         */
        ADIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * @excluding index
             */
            params: {
                index: void 0, // Unused index, do not inherit (#15362)
                /**
                 * The id of volume series which is mandatory.
                 * For example using OHLC data, volumeSeriesID='volume' means
                 * the indicator will be calculated using OHLC and volume values.
                 *
                 * @since 6.0.0
                 */
                volumeSeriesID: 'volume'
            }
        });
        extend(ADIndicator.prototype, {
            nameComponents: false,
            nameBase: 'Accumulation/Distribution'
        });
        SeriesRegistry.registerSeriesType('ad', ADIndicator);
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
         * A `AD` series. If the [type](#series.ad.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ad
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/accumulation-distribution
         * @apioption series.ad
         */
        ''; // Add doclet above to transpiled file

        return ADIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/Chaikin/ChaikinIndicator.js', [_modules['Stock/Indicators/AD/ADIndicator.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (AD, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { ema: EMAIndicator } = SeriesRegistry.seriesTypes;
        const { correctFloat, extend, merge, error } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Chaikin series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.chaikin
         *
         * @augments Highcharts.Series
         */
        class ChaikinIndicator extends EMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const periods = params.periods, period = params.period, 
                // 0- date, 1- Chaikin Oscillator
                CHA = [], xData = [], yData = [];
                let oscillator, i;
                // Check if periods are correct
                if (periods.length !== 2 || periods[1] <= periods[0]) {
                    error('Error: "Chaikin requires two periods. Notice, first ' +
                        'period should be lower than the second one."');
                    return;
                }
                // Accumulation Distribution Line data
                const ADL = AD.prototype.getValues.call(this, series, {
                    volumeSeriesID: params.volumeSeriesID,
                    period: period
                });
                // Check if adl is calculated properly, if not skip
                if (!ADL) {
                    return;
                }
                // Shorter Period EMA
                const SPE = super.getValues.call(this, ADL, {
                    period: periods[0]
                });
                // Longer Period EMA
                const LPE = super.getValues.call(this, ADL, {
                    period: periods[1]
                });
                // Check if ema is calculated properly, if not skip
                if (!SPE || !LPE) {
                    return;
                }
                const periodsOffset = periods[1] - periods[0];
                for (i = 0; i < LPE.yData.length; i++) {
                    oscillator = correctFloat(SPE.yData[i + periodsOffset] -
                        LPE.yData[i]);
                    CHA.push([LPE.xData[i], oscillator]);
                    xData.push(LPE.xData[i]);
                    yData.push(oscillator);
                }
                return {
                    values: CHA,
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
         * Chaikin Oscillator. This series requires the `linkedTo` option to
         * be set and should be loaded after the `stock/indicators/indicators.js`.
         *
         * @sample {highstock} stock/indicators/chaikin
         *         Chaikin Oscillator
         *
         * @extends      plotOptions.ema
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
         *               pointInterval, pointIntervalUnit, pointPlacement,
         *               pointRange, pointStart, showInNavigator, stacking
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/chaikin
         * @optionparent plotOptions.chaikin
         */
        ChaikinIndicator.defaultOptions = merge(EMAIndicator.defaultOptions, {
            /**
             * Parameters used in calculation of Chaikin Oscillator
             * series points.
             *
             * @excluding index
             */
            params: {
                index: void 0, // Unused index, do not inherit (#15362)
                /**
                 * The id of volume series which is mandatory.
                 * For example using OHLC data, volumeSeriesID='volume' means
                 * the indicator will be calculated using OHLC and volume values.
                 */
                volumeSeriesID: 'volume',
                /**
                 * Parameter used indirectly for calculating the `AD` indicator.
                 * Decides about the number of data points that are taken
                 * into account for the indicator calculations.
                 */
                period: 9,
                /**
                 * Periods for Chaikin Oscillator calculations.
                 *
                 * @type    {Array<number>}
                 * @default [3, 10]
                 */
                periods: [3, 10]
            }
        });
        extend(ChaikinIndicator.prototype, {
            nameBase: 'Chaikin Osc',
            nameComponents: ['periods']
        });
        SeriesRegistry.registerSeriesType('chaikin', ChaikinIndicator);
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
         * A `Chaikin Oscillator` series. If the [type](#series.chaikin.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.chaikin
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, stacking, showInNavigator
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/chaikin
         * @apioption series.chaikin
         */
        ''; // To include the above in the js output

        return ChaikinIndicator;
    });
    _registerModule(_modules, 'masters/indicators/chaikin.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
