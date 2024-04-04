/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Rafał Sebestjański
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
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
        const { ema: EMAIndicator } = SeriesRegistry.seriesTypes;
        const { correctFloat, isArray, merge } = U;
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
        class DEMAIndicator extends EMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getEMA(yVal, prevEMA, SMA, index, i, xVal) {
                return super.calculateEma(xVal || [], yVal, typeof i === 'undefined' ? 1 : i, this.EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
            }
            getValues(series, params) {
                const period = params.period, EMAvalues = [], doubledPeriod = 2 * period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, DEMA = [], xDataDema = [], yDataDema = [];
                let accumulatePeriodPoints = 0, EMA = 0, 
                // EMA(EMA)
                EMAlevel2, 
                // EMA of previous point
                prevEMA, prevEMAlevel2, 
                // EMA values array
                i, index = -1, DEMAPoint, SMA = 0;
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
                    super.accumulatePeriodPoints(period, index, yVal);
                // First point
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
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        ''; // Adds doclet above to the transpiled file

        return DEMAIndicator;
    });
    _registerModule(_modules, 'masters/indicators/dema.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));