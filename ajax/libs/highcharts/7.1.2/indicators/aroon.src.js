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
        define('highcharts/indicators/aroon', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'mixins/multipe-lines.js', [_modules['parts/Globals.js']], function (H) {
        /**
         *
         *  (c) 2010-2019 Wojciech Chmiel
         *
         *  License: www.highcharts.com/license
         *
         * */



        var each = H.each,
            merge = H.merge,
            error = H.error,
            defined = H.defined,
            SMA = H.seriesTypes.sma;

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
             *
             * @param {string} excludedValue
             *        pointValKey - main line id
             *
             * @return {Array<string>}
             *         Returns translated lines names without excluded value.
             */
            getTranslatedLinesNames: function (excludedValue) {
                var translatedLines = [];

                each(this.pointArrayMap, function (propertyName) {
                    if (propertyName !== excludedValue) {
                        translatedLines.push(
                            'plot' +
                            propertyName.charAt(0).toUpperCase() +
                            propertyName.slice(1)
                        );
                    }
                });

                return translatedLines;
            },
            /**
             * @private
             * @function multipleLinesMixin.toYData
             *
             * @param {string} point
             *
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
             */
            translate: function () {
                var indicator = this,
                    pointArrayMap = indicator.pointArrayMap,
                    LinesNames = [],
                    value;

                LinesNames = indicator.getTranslatedLinesNames();

                SMA.prototype.translate.apply(indicator, arguments);

                each(indicator.points, function (point) {
                    each(pointArrayMap, function (propertyName, i) {
                        value = point[propertyName];

                        if (value !== null) {
                            point[LinesNames[i]] = indicator.yAxis.toPixels(
                                value,
                                true
                            );
                        }
                    });
                });
            },
            /**
             * Draw main and additional lines.
             *
             * @private
             * @function multipleLinesMixin.drawGraph
             */
            drawGraph: function () {
                var indicator = this,
                    pointValKey = indicator.pointValKey,
                    linesApiNames = indicator.linesApiNames,
                    mainLinePoints = indicator.points,
                    pointsLength = mainLinePoints.length,
                    mainLineOptions = indicator.options,
                    mainLinePath = indicator.graph,
                    gappedExtend = {
                        options: {
                            gapSize: mainLineOptions.gapSize
                        }
                    },
                    secondaryLines = [], // additional lines point place holders
                    secondaryLinesNames = indicator.getTranslatedLinesNames(
                        pointValKey
                    ),
                    point;


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
                            indicator.options = merge(
                                mainLineOptions[lineName].styles,
                                gappedExtend
                            );
                        } else {
                            error(
                                'Error: "There is no ' + lineName +
                                ' in DOCS options declared. Check if linesApiNames' +
                                ' are consistent with your DOCS line names."' +
                                ' at mixin/multiple-line.js:34'
                            );
                        }

                        indicator.graph = indicator['graph' + lineName];
                        SMA.prototype.drawGraph.call(indicator);

                        // Now save lines:
                        indicator['graph' + lineName] = indicator.graph;
                    } else {
                        error(
                            'Error: "' + lineName + ' doesn\'t have equivalent ' +
                            'in pointArrayMap. To many elements in linesApiNames ' +
                            'relative to pointArrayMap."'
                        );
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
    _registerModule(_modules, 'indicators/aroon.src.js', [_modules['parts/Globals.js'], _modules['mixins/multipe-lines.js']], function (H, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        // Utils

        // Index of element with extreme value from array (min or max)
        function getExtremeIndexInArray(arr, extreme) {
            var extremeValue = arr[0],
                valueIndex = 0,
                i;

            for (i = 1; i < arr.length; i++) {
                if (
                    extreme === 'max' && arr[i] >= extremeValue ||
                    extreme === 'min' && arr[i] <= extremeValue
                ) {
                    extremeValue = arr[i];
                    valueIndex = i;
                }
            }

            return valueIndex;
        }

        /**
         * The Aroon series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.aroon
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'aroon',
            'sma',
            /**
             * Aroon. This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/aroon
             *         Aroon
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.aroon
             */
            {
                /**
                 * Paramters used in calculation of aroon series points.
                 *
                 * @excluding periods, index
                 */
                params: {
                    /**
                     * Period for Aroon indicator
                     */
                    period: 25
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Aroon Up: {point.y}<br/>Aroon Down: {point.aroonDown}<br/>'
                },
                /**
                 * aroonDown line options.
                 */
                aroonDown: {
                    /**
                     * Styles for an aroonDown line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * [plotOptions.aroon.color](#plotOptions.aroon.color).
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
                nameBase: 'Aroon',
                pointArrayMap: ['y', 'aroonDown'],
                pointValKey: 'y',
                linesApiNames: ['aroonDown'],
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        AR = [], // 0- date, 1- Aroon Up, 2- Aroon Down
                        xData = [],
                        yData = [],
                        slicedY,
                        low = 2,
                        high = 1,
                        aroonUp,
                        aroonDown,
                        xLow,
                        xHigh,
                        i;

                    // For a N-period, we start from N-1 point, to calculate Nth point
                    // That is why we later need to comprehend slice() elements list
                    // with (+1)
                    for (i = period - 1; i < yValLen; i++) {
                        slicedY = yVal.slice(i - period + 1, i + 2);

                        xLow = getExtremeIndexInArray(slicedY.map(function (elem) {
                            return H.pick(elem[low], elem);
                        }), 'min');

                        xHigh = getExtremeIndexInArray(slicedY.map(function (elem) {
                            return H.pick(elem[high], elem);
                        }), 'max');

                        aroonUp = (xHigh / period) * 100;
                        aroonDown = (xLow / period) * 100;

                        if (xVal[i + 1]) {
                            AR.push([xVal[i + 1], aroonUp, aroonDown]);
                            xData.push(xVal[i + 1]);
                            yData.push([aroonUp, aroonDown]);
                        }
                    }

                    return {
                        values: AR,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * A Aroon indicator. If the [type](#series.aroon.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.aroon
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.aroon
         */

    });
    _registerModule(_modules, 'masters/indicators/aroon.src.js', [], function () {


    });
}));