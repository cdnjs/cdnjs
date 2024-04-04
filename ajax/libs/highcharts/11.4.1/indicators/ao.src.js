/**
 * @license Highstock JS v11.4.1 (2024-04-04)
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
        define('highcharts/indicators/ao', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/AO/AOIndicator.js', [_modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (H, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { column: { prototype: columnProto }, sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge, correctFloat, isArray } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The AO series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ao
         *
         * @augments Highcharts.Series
         */
        class AOIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            drawGraph() {
                const indicator = this, options = indicator.options, points = indicator.points, userColor = indicator.userOptions.color, positiveColor = options.greaterBarColor, negativeColor = options.lowerBarColor, firstPoint = points[0];
                let i;
                if (!userColor && firstPoint) {
                    firstPoint.color = positiveColor;
                    for (i = 1; i < points.length; i++) {
                        if (points[i].y > points[i - 1].y) {
                            points[i].color = positiveColor;
                        }
                        else if (points[i].y < points[i - 1].y) {
                            points[i].color = negativeColor;
                        }
                        else {
                            points[i].color = points[i - 1].color;
                        }
                    }
                }
            }
            getValues(series) {
                const shortPeriod = 5, longPeriod = 34, xVal = series.xData || [], yVal = series.yData || [], yValLen = yVal.length, AO = [], // 0- date, 1- Awesome Oscillator
                xData = [], yData = [], high = 1, low = 2;
                let shortSMA, // Shorter Period SMA
                longSMA, // Longer Period SMA
                awesome, shortLastIndex, longLastIndex, price, i, j, longSum = 0, shortSum = 0;
                if (xVal.length <= longPeriod ||
                    !isArray(yVal[0]) ||
                    yVal[0].length !== 4) {
                    return;
                }
                for (i = 0; i < longPeriod - 1; i++) {
                    price = (yVal[i][high] + yVal[i][low]) / 2;
                    if (i >= longPeriod - shortPeriod) {
                        shortSum = correctFloat(shortSum + price);
                    }
                    longSum = correctFloat(longSum + price);
                }
                for (j = longPeriod - 1; j < yValLen; j++) {
                    price = (yVal[j][high] + yVal[j][low]) / 2;
                    shortSum = correctFloat(shortSum + price);
                    longSum = correctFloat(longSum + price);
                    shortSMA = shortSum / shortPeriod;
                    longSMA = longSum / longPeriod;
                    awesome = correctFloat(shortSMA - longSMA);
                    AO.push([xVal[j], awesome]);
                    xData.push(xVal[j]);
                    yData.push(awesome);
                    shortLastIndex = j + 1 - shortPeriod;
                    longLastIndex = j + 1 - longPeriod;
                    shortSum = correctFloat(shortSum -
                        (yVal[shortLastIndex][high] +
                            yVal[shortLastIndex][low]) / 2);
                    longSum = correctFloat(longSum -
                        (yVal[longLastIndex][high] +
                            yVal[longLastIndex][low]) / 2);
                }
                return {
                    values: AO,
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
         * Awesome Oscillator. This series requires the `linkedTo` option to
         * be set and should be loaded after the `stock/indicators/indicators.js`
         *
         * @sample {highstock} stock/indicators/ao
         *         Awesome
         *
         * @extends      plotOptions.sma
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
         *               params, pointInterval, pointIntervalUnit, pointPlacement,
         *               pointRange, pointStart, showInNavigator, stacking
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/ao
         * @optionparent plotOptions.ao
         */
        AOIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            params: {
                // Index and period are unchangeable, do not inherit (#15362)
                index: void 0,
                period: void 0
            },
            /**
             * Color of the Awesome oscillator series bar that is greater than the
             * previous one. Note that if a `color` is defined, the `color`
             * takes precedence and the `greaterBarColor` is ignored.
             *
             * @sample {highstock} stock/indicators/ao/
             *         greaterBarColor
             *
             * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since 7.0.0
             */
            greaterBarColor: "#06b535" /* Palette.positiveColor */,
            /**
             * Color of the Awesome oscillator series bar that is lower than the
             * previous one. Note that if a `color` is defined, the `color`
             * takes precedence and the `lowerBarColor` is ignored.
             *
             * @sample {highstock} stock/indicators/ao/
             *         lowerBarColor
             *
             * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since 7.0.0
             */
            lowerBarColor: "#f21313" /* Palette.negativeColor */,
            threshold: 0,
            groupPadding: 0.2,
            pointPadding: 0.2,
            crisp: false,
            states: {
                hover: {
                    halo: {
                        size: 0
                    }
                }
            }
        });
        extend(AOIndicator.prototype, {
            nameBase: 'AO',
            nameComponents: void 0,
            // Columns support:
            markerAttribs: noop,
            getColumnMetrics: columnProto.getColumnMetrics,
            crispCol: columnProto.crispCol,
            translate: columnProto.translate,
            drawPoints: columnProto.drawPoints
        });
        SeriesRegistry.registerSeriesType('ao', AOIndicator);
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
         * An `AO` series. If the [type](#series.ao.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ao
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/ao
         * @apioption series.ao
         */
        ''; // For including the above in the doclets

        return AOIndicator;
    });
    _registerModule(_modules, 'masters/indicators/ao.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));