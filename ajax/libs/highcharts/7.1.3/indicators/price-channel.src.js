/**
 * @license Highstock JS v7.1.3 (2019-08-14)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Daniel Studencki
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/price-channel', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/price-channel.src.js', [_modules['parts/Globals.js'], _modules['mixins/reduce-array.js'], _modules['mixins/multipe-lines.js']], function (H, reduceArrayMixin, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var getArrayExtremes = reduceArrayMixin.getArrayExtremes,
            merge = H.merge;

        /**
         * The Price Channel series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pc
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'pc',
            'sma',
            /**
             * Price channel (PC). This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/price-channel
             *         Price Channel
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.pc
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 20
                },
                lineWidth: 1,
                topLine: {
                    styles: {
                        /**
                         * Color of the top line. If not set, it's inherited from
                         * [plotOptions.pc.color](#plotOptions.pc.color).
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: '#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1'.split(' ')[2],
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1
                    }
                },
                bottomLine: {
                    styles: {
                        /**
                         * Color of the bottom line. If not set, it's inherited from
                         * [plotOptions.pc.color](#plotOptions.pc.color).
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: '#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1'.split(' ')[8],
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1
                    }
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            merge(multipleLinesMixin, {
                pointArrayMap: ['top', 'middle', 'bottom'],
                pointValKey: 'middle',
                nameBase: 'Price Channel',
                nameComponents: ['period'],
                linesApiNames: ['topLine', 'bottomLine'],
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        PC = [], // 0- date, 1-top line, 2-middle line, 3-bottom line
                        ML, TL, BL, // middle line, top line and bottom line
                        date,
                        low = 2,
                        high = 1,
                        xData = [],
                        yData = [],
                        slicedY,
                        extremes,
                        i;

                    if (yValLen < period) {
                        return false;
                    }

                    for (i = period; i <= yValLen; i++) {
                        date = xVal[i - 1];
                        slicedY = yVal.slice(i - period, i);
                        extremes = getArrayExtremes(slicedY, low, high);
                        TL = extremes[1];
                        BL = extremes[0];
                        ML = (TL + BL) / 2;
                        PC.push([date, TL, ML, BL]);
                        xData.push(date);
                        yData.push([TL, ML, BL]);
                    }

                    return {
                        values: PC,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * A Price channel indicator. If the [type](#series.pc.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends      series,plotOptions.pc
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *               joinBy, keys, navigatorOptions, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointRange, pointStart,
         *               showInNavigator, stacking
         * @optionparent series.pc
         */

    });
    _registerModule(_modules, 'masters/indicators/price-channel.src.js', [], function () {


    });
}));