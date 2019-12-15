/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Paweł Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/stochastic', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'mixins/reduce-array.js', [_modules['parts/Globals.js']], function (H) {
        /**
         *
         *  (c) 2010-2019 Pawel Fus & Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var reduce = H.reduce;
        var reduceArrayMixin = {
            /**
             * Get min value of array filled by OHLC data.
             * @privagte
             * @param {Array<Highcharts.OHLCPoint>} arr Array of OHLC points (arrays).
             * @param {string} index Index of "low" value in point array.
             * @return {number} Returns min value.
             */
            minInArray: function (arr, index) {
                return reduce(arr, function (min, target) {
                    return Math.min(min, target[index]);
                }, Number.MAX_VALUE);
            },
            /**
             * Get max value of array filled by OHLC data.
             * @private
             * @param {Array<Highcharts.OHLCPoint>} arr Array of OHLC points (arrays).
             * @param {string} index Index of "high" value in point array.
             * @return {number} Returns max value.
             */
            maxInArray: function (arr, index) {
                return reduce(arr, function (max, target) {
                    return Math.max(max, target[index]);
                }, -Number.MAX_VALUE);
            },
            /**
             * Get extremes of array filled by OHLC data.
             * @private
             * @param {Array<Highcharts.OHLCPoint>} arr Array of OHLC points (arrays).
             * @param {string} minIndex Index of "low" value in point array.
             * @param {string} maxIndex Index of "high" value in point array.
             * @return {Array<number,number>} Returns array with min and max value.
             */
            getArrayExtremes: function (arr, minIndex, maxIndex) {
                return reduce(arr, function (prev, target) {
                    return [
                        Math.min(prev[0], target[minIndex]),
                        Math.max(prev[1], target[maxIndex])
                    ];
                }, [Number.MAX_VALUE, -Number.MAX_VALUE]);
            }
        };

        return reduceArrayMixin;
    });
    _registerModule(_modules, 'mixins/multipe-lines.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /**
         *
         *  (c) 2010-2019 Wojciech Chmiel
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined;
        var each = H.each, merge = H.merge, error = H.error, SMA = H.seriesTypes.sma;
        /**
         * Mixin useful for all indicators that have more than one line.
         * Merge it with your implementation where you will provide
         * getValues method appropriate to your indicator and pointArrayMap,
         * pointValKey, linesApiNames properites. Notice that pointArrayMap
         * should be consistent with amount of lines calculated in getValues method.
         *
         * @private
         * @mixin multipleLinesMixin
         */
        var multipleLinesMixin = {
            /* eslint-disable valid-jsdoc */
            /**
             * Lines ids. Required to plot appropriate amount of lines.
             * Notice that pointArrayMap should have more elements than
             * linesApiNames, because it contains main line and additional lines ids.
             * Also it should be consistent with amount of lines calculated in
             * getValues method from your implementation.
             *
             * @private
             * @name multipleLinesMixin.pointArrayMap
             * @type {Array<string>}
             */
            pointArrayMap: ['top', 'bottom'],
            /**
             * Main line id.
             *
             * @private
             * @name multipleLinesMixin.pointValKey
             * @type {string}
             */
            pointValKey: 'top',
            /**
             * Additional lines DOCS names. Elements of linesApiNames array should
             * be consistent with DOCS line names defined in your implementation.
             * Notice that linesApiNames should have decreased amount of elements
             * relative to pointArrayMap (without pointValKey).
             *
             * @private
             * @name multipleLinesMixin.linesApiNames
             * @type {Array<string>}
             */
            linesApiNames: ['bottomLine'],
            /**
             * Create translatedLines Collection based on pointArrayMap.
             *
             * @private
             * @function multipleLinesMixin.getTranslatedLinesNames
             * @param {string} [excludedValue]
             *        Main line id
             * @return {Array<string>}
             *         Returns translated lines names without excluded value.
             */
            getTranslatedLinesNames: function (excludedValue) {
                var translatedLines = [];
                each(this.pointArrayMap, function (propertyName) {
                    if (propertyName !== excludedValue) {
                        translatedLines.push('plot' +
                            propertyName.charAt(0).toUpperCase() +
                            propertyName.slice(1));
                    }
                });
                return translatedLines;
            },
            /**
             * @private
             * @function multipleLinesMixin.toYData
             * @param {Highcharts.Point} point
             *        Indicator point
             * @return {Array<number>}
             *         Returns point Y value for all lines
             */
            toYData: function (point) {
                var pointColl = [];
                each(this.pointArrayMap, function (propertyName) {
                    pointColl.push(point[propertyName]);
                });
                return pointColl;
            },
            /**
             * Add lines plot pixel values.
             *
             * @private
             * @function multipleLinesMixin.translate
             * @return {void}
             */
            translate: function () {
                var indicator = this, pointArrayMap = indicator.pointArrayMap, LinesNames = [], value;
                LinesNames = indicator.getTranslatedLinesNames();
                SMA.prototype.translate.apply(indicator, arguments);
                each(indicator.points, function (point) {
                    each(pointArrayMap, function (propertyName, i) {
                        value = point[propertyName];
                        if (value !== null) {
                            point[LinesNames[i]] = indicator.yAxis.toPixels(value, true);
                        }
                    });
                });
            },
            /**
             * Draw main and additional lines.
             *
             * @private
             * @function multipleLinesMixin.drawGraph
             * @return {void}
             */
            drawGraph: function () {
                var indicator = this, pointValKey = indicator.pointValKey, linesApiNames = indicator.linesApiNames, mainLinePoints = indicator.points, pointsLength = mainLinePoints.length, mainLineOptions = indicator.options, mainLinePath = indicator.graph, gappedExtend = {
                    options: {
                        gapSize: mainLineOptions.gapSize
                    }
                }, 
                // additional lines point place holders:
                secondaryLines = [], secondaryLinesNames = indicator.getTranslatedLinesNames(pointValKey), point;
                // Generate points for additional lines:
                each(secondaryLinesNames, function (plotLine, index) {
                    // create additional lines point place holders
                    secondaryLines[index] = [];
                    while (pointsLength--) {
                        point = mainLinePoints[pointsLength];
                        secondaryLines[index].push({
                            x: point.x,
                            plotX: point.plotX,
                            plotY: point[plotLine],
                            isNull: !defined(point[plotLine])
                        });
                    }
                    pointsLength = mainLinePoints.length;
                });
                // Modify options and generate additional lines:
                each(linesApiNames, function (lineName, i) {
                    if (secondaryLines[i]) {
                        indicator.points = secondaryLines[i];
                        if (mainLineOptions[lineName]) {
                            indicator.options = merge(mainLineOptions[lineName].styles, gappedExtend);
                        }
                        else {
                            error('Error: "There is no ' + lineName +
                                ' in DOCS options declared. Check if linesApiNames' +
                                ' are consistent with your DOCS line names."' +
                                ' at mixin/multiple-line.js:34');
                        }
                        indicator.graph = indicator['graph' + lineName];
                        SMA.prototype.drawGraph.call(indicator);
                        // Now save lines:
                        indicator['graph' + lineName] = indicator.graph;
                    }
                    else {
                        error('Error: "' + lineName + ' doesn\'t have equivalent ' +
                            'in pointArrayMap. To many elements in linesApiNames ' +
                            'relative to pointArrayMap."');
                    }
                });
                // Restore options and draw a main line:
                indicator.points = mainLinePoints;
                indicator.options = mainLineOptions;
                indicator.graph = mainLinePath;
                SMA.prototype.drawGraph.call(indicator);
            }
        };

        return multipleLinesMixin;
    });
    _registerModule(_modules, 'indicators/stochastic.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/reduce-array.js'], _modules['mixins/multipe-lines.js']], function (H, U, reduceArrayMixin, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = U.isArray;


        var merge = H.merge,
            SMA = H.seriesTypes.sma,
            getArrayExtremes = reduceArrayMixin.getArrayExtremes;

        /**
         * The Stochastic series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.stochastic
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'stochastic',
            'sma',
            /**
             * Stochastic oscillator. This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/stochastic
             *         Stochastic oscillator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.stochastic
             */
            {
                /**
                 * @excluding index, period
                 */
                params: {
                    /**
                     * Periods for Stochastic oscillator: [%K, %D].
                     *
                     * @type    {Array<number,number>}
                     * @default [14, 3]
                     */
                    periods: [14, 3]
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>%K: {point.y}<br/>%D: {point.smoothed}<br/>'
                },
                /**
                 * Smoothed line options.
                 */
                smoothedLine: {
                    /**
                     * Styles for a smoothed line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * [plotOptions.stochastic.color
                         * ](#plotOptions.stochastic.color).
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            H.merge(multipleLinesMixin, {
                nameComponents: ['periods'],
                nameBase: 'Stochastic',
                pointArrayMap: ['y', 'smoothed'],
                parallelArrays: ['x', 'y', 'smoothed'],
                pointValKey: 'y',
                linesApiNames: ['smoothedLine'],
                init: function () {
                    SMA.prototype.init.apply(this, arguments);

                    // Set default color for lines:
                    this.options = merge({
                        smoothedLine: {
                            styles: {
                                lineColor: this.color
                            }
                        }
                    }, this.options);
                },
                getValues: function (series, params) {
                    var periodK = params.periods[0],
                        periodD = params.periods[1],
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        SO = [], // 0- date, 1-%K, 2-%D
                        xData = [],
                        yData = [],
                        slicedY,
                        close = 3,
                        low = 2,
                        high = 1,
                        CL, HL, LL, K,
                        D = null,
                        points,
                        extremes,
                        i;


                    // Stochastic requires close value
                    if (
                        yValLen < periodK ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    // For a N-period, we start from N-1 point, to calculate Nth point
                    // That is why we later need to comprehend slice() elements list
                    // with (+1)
                    for (i = periodK - 1; i < yValLen; i++) {
                        slicedY = yVal.slice(i - periodK + 1, i + 1);

                        // Calculate %K
                        extremes = getArrayExtremes(slicedY, low, high);
                        LL = extremes[0]; // Lowest low in %K periods
                        CL = yVal[i][close] - LL;
                        HL = extremes[1] - LL;
                        K = CL / HL * 100;

                        xData.push(xVal[i]);
                        yData.push([K, null]);

                        // Calculate smoothed %D, which is SMA of %K
                        if (i >= (periodK - 1) + (periodD - 1)) {
                            points = SMA.prototype.getValues.call(this, {
                                xData: xData.slice(-periodD),
                                yData: yData.slice(-periodD)
                            }, {
                                period: periodD
                            });
                            D = points.yData[0];
                        }

                        SO.push([xVal[i], K, D]);
                        yData[yData.length - 1][1] = D;
                    }

                    return {
                        values: SO,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * A Stochastic indicator. If the [type](#series.stochastic.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.stochastic
         * @since     6.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis,  dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.stochastic
         */

    });
    _registerModule(_modules, 'masters/indicators/stochastic.src.js', [], function () {


    });
}));