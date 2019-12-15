/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
'use strict';
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
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'indicators/ao.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var correctFloat = H.correctFloat,
            isArray = H.isArray,
            noop = H.noop;

        /**
         * The AO series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ao
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'ao',
            'sma',
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
             * @optionparent plotOptions.ao
             */
            {
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
                greaterBarColor: '#06B535',
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
                lowerBarColor: '#F21313',
                threshold: 0,
                groupPadding: 0.2,
                pointPadding: 0.2,
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'AO',
                nameComponents: false,

                // Columns support:
                markerAttribs: noop,
                getColumnMetrics: H.seriesTypes.column.prototype.getColumnMetrics,
                crispCol: H.seriesTypes.column.prototype.crispCol,
                translate: H.seriesTypes.column.prototype.translate,
                drawPoints: H.seriesTypes.column.prototype.drawPoints,

                drawGraph: function () {
                    var indicator = this,
                        options = indicator.options,
                        points = indicator.points,
                        userColor = indicator.userOptions.color,
                        positiveColor = options.greaterBarColor,
                        negativeColor = options.lowerBarColor,
                        firstPoint = points[0],
                        i;

                    if (!userColor && firstPoint) {
                        firstPoint.color = positiveColor;

                        for (i = 1; i < points.length; i++) {
                            if (points[i].y > points[i - 1].y) {
                                points[i].color = positiveColor;
                            } else if (points[i].y < points[i - 1].y) {
                                points[i].color = negativeColor;
                            } else {
                                points[i].color = points[i - 1].color;
                            }
                        }
                    }
                },

                getValues: function (series) {
                    var shortPeriod = 5,
                        longPeriod = 34,
                        xVal = series.xData || [],
                        yVal = series.yData || [],
                        yValLen = yVal.length,
                        AO = [], // 0- date, 1- Awesome Oscillator
                        xData = [],
                        yData = [],
                        high = 1,
                        low = 2,
                        shortSum = 0,
                        longSum = 0,
                        shortSMA, // Shorter Period SMA
                        longSMA, // Longer Period SMA
                        awesome,
                        shortLastIndex,
                        longLastIndex,
                        price,
                        i,
                        j;

                    if (
                        xVal.length <= longPeriod ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
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

                        shortSum = correctFloat(
                            shortSum -
                            (yVal[shortLastIndex][high] + yVal[shortLastIndex][low]) / 2
                        );
                        longSum = correctFloat(
                            longSum -
                            (yVal[longLastIndex][high] + yVal[longLastIndex][low]) / 2
                        );
                    }


                    return {
                        values: AO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

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
         * @apioption series.ao
         */

    });
    _registerModule(_modules, 'masters/indicators/ao.src.js', [], function () {


    });
}));