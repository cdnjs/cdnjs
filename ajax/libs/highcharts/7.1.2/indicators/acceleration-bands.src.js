/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
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
        define('highcharts/indicators/acceleration-bands', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'indicators/acceleration-bands.src.js', [_modules['parts/Globals.js'], _modules['mixins/multipe-lines.js']], function (H, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var SMA = H.seriesTypes.sma,
            merge = H.merge,
            correctFloat = H.correctFloat;

        function getBaseForBand(low, high, factor) {
            return ((
                (correctFloat(high - low)) /
                ((correctFloat(high + low)) / 2)
            ) * 1000) * factor;
        }

        function getPointUB(high, base) {
            return high * (correctFloat(1 + 2 * base));
        }

        function getPointLB(low, base) {
            return low * (correctFloat(1 - 2 * base));
        }

        /**
         * The ABands series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.abands
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'abands',
            'sma',
            /**
             * Acceleration bands (ABANDS). This series requires the `linkedTo` option
             * to be set and should be loaded after the
             * `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/acceleration-bands
             *         Acceleration Bands
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking,
             * @optionparent plotOptions.abands
             */
            {
                params: {
                    period: 20,
                    /**
                     * The algorithms factor value used to calculate bands.
                     *
                     * @product highstock
                     */
                    factor: 0.001,
                    index: 3
                },
                lineWidth: 1,
                topLine: {
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1
                    }
                },
                bottomLine: {
                    styles: {
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
                nameBase: 'Acceleration Bands',
                nameComponents: ['period', 'factor'],
                linesApiNames: ['topLine', 'bottomLine'],
                getValues: function (series, params) {
                    var period = params.period,
                        factor = params.factor,
                        index = params.index,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        UB = [], // Upperbands
                        LB = [], // Lowerbands
                        // ABANDS array structure:
                        // 0-date, 1-top line, 2-middle line, 3-bottom line
                        ABANDS = [],
                        ML, TL, BL, // middle line, top line and bottom line
                        date,
                        bandBase,
                        pointSMA,
                        ubSMA,
                        lbSMA,
                        low = 2,
                        high = 1,
                        xData = [],
                        yData = [],
                        slicedX,
                        slicedY,
                        i;

                    if (yValLen < period) {
                        return false;
                    }

                    for (i = 0; i <= yValLen; i++) {
                        // Get UB and LB values of every point. This condition
                        // is necessary, because there is a need to calculate current
                        // UB nad LB values simultaneously with given period SMA
                        // in one for loop.
                        if (i < yValLen) {
                            bandBase = getBaseForBand(
                                yVal[i][low],
                                yVal[i][high],
                                factor
                            );
                            UB.push(getPointUB(yVal[i][high], bandBase));
                            LB.push(getPointLB(yVal[i][low], bandBase));
                        }
                        if (i >= period) {
                            slicedX = xVal.slice(i - period, i);
                            slicedY = yVal.slice(i - period, i);
                            ubSMA = SMA.prototype.getValues.call(this, {
                                xData: slicedX,
                                yData: UB.slice(i - period, i)
                            }, {
                                period: period
                            });
                            lbSMA = SMA.prototype.getValues.call(this, {
                                xData: slicedX,
                                yData: LB.slice(i - period, i)
                            }, {
                                period: period
                            });
                            pointSMA = SMA.prototype.getValues.call(this, {
                                xData: slicedX,
                                yData: slicedY
                            }, {
                                period: period,
                                index: index
                            });
                            date = pointSMA.xData[0];
                            TL = ubSMA.yData[0];
                            BL = lbSMA.yData[0];
                            ML = pointSMA.yData[0];
                            ABANDS.push([date, TL, ML, BL]);
                            xData.push(date);
                            yData.push([TL, ML, BL]);
                        }
                    }

                    return {
                        values: ABANDS,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * An Acceleration bands indicator. If the [type](#series.pc.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends      series,plotOptions.abands
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *               joinBy, keys, navigatorOptions, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointRange, pointStart,
         *               stacking, showInNavigator,
         * @optionparent series.abands
         */

    });
    _registerModule(_modules, 'masters/indicators/acceleration-bands.src.js', [], function () {


    });
}));