/**
 * @license Highstock JS v9.2.2 (2021-08-24)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Daniel Studencki
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
    _registerModule(_modules, 'Mixins/MultipleLines.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /**
         *
         *  (c) 2010-2021 Wojciech Chmiel
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined,
            error = U.error,
            merge = U.merge;
        var SMA = H.seriesTypes.sma;
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
                (this.pointArrayMap || []).forEach(function (propertyName) {
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
                (this.pointArrayMap || []).forEach(function (propertyName) {
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
                var indicator = this,
                    pointArrayMap = indicator.pointArrayMap,
                    LinesNames = [],
                    value;
                var modfidyValue = indicator.modifyValue;
                LinesNames = indicator.getTranslatedLinesNames();
                SMA.prototype.translate.apply(indicator, arguments);
                indicator.points.forEach(function (point) {
                    pointArrayMap.forEach(function (propertyName, i) {
                        value = point[propertyName];
                        // If the modifier, like for example compare exists,
                        // modified the original value by that method, #15867.
                        if (modfidyValue) {
                            value = modfidyValue.call(indicator, value);
                        }
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
                    // additional lines point place holders:
                    secondaryLines = [],
                    secondaryLinesNames = indicator.getTranslatedLinesNames(pointValKey),
                    point;
                // Generate points for additional lines:
                secondaryLinesNames.forEach(function (plotLine, index) {
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
                linesApiNames.forEach(function (lineName, i) {
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
    _registerModule(_modules, 'Mixins/ReduceArray.js', [], function () {
        /**
         *
         *  (c) 2010-2021 Pawel Fus & Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var reduceArrayMixin = {
                /**
                 * Get min value of array filled by OHLC data.
                 * @private
                 * @param {Array<*>} arr Array of OHLC points (arrays).
                 * @param {string} index Index of "low" value in point array.
                 * @return {number} Returns min value.
                 */
                minInArray: function (arr,
            index) {
                    return arr.reduce(function (min,
            target) {
                        return Math.min(min,
            target[index]);
                }, Number.MAX_VALUE);
            },
            /**
             * Get max value of array filled by OHLC data.
             * @private
             * @param {Array<*>} arr Array of OHLC points (arrays).
             * @param {string} index Index of "high" value in point array.
             * @return {number} Returns max value.
             */
            maxInArray: function (arr, index) {
                return arr.reduce(function (max, target) {
                    return Math.max(max, target[index]);
                }, -Number.MAX_VALUE);
            },
            /**
             * Get extremes of array filled by OHLC data.
             * @private
             * @param {Array<*>} arr Array of OHLC points (arrays).
             * @param {string} minIndex Index of "low" value in point array.
             * @param {string} maxIndex Index of "high" value in point array.
             * @return {Array<number,number>} Returns array with min and max value.
             */
            getArrayExtremes: function (arr, minIndex, maxIndex) {
                return arr.reduce(function (prev, target) {
                    return [
                        Math.min(prev[0], target[minIndex]),
                        Math.max(prev[1], target[maxIndex])
                    ];
                }, [Number.MAX_VALUE, -Number.MAX_VALUE]);
            }
        };

        return reduceArrayMixin;
    });
    _registerModule(_modules, 'Stock/Indicators/PC/PCIndicator.js', [_modules['Core/Color/Palette.js'], _modules['Mixins/MultipleLines.js'], _modules['Mixins/ReduceArray.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (palette, MultipleLinesMixin, ReduceArrayMixin, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var SMAIndicator = SeriesRegistry.seriesTypes.sma;
        var merge = U.merge,
            extend = U.extend;
        var getArrayExtremes = ReduceArrayMixin.getArrayExtremes;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Price Channel series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pc
         *
         * @augments Highcharts.Series
         */
        var PCIndicator = /** @class */ (function (_super) {
                __extends(PCIndicator, _super);
            function PCIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                *
                *  Properties
                *
                * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
            *
            *  Functions
            *
            * */
            PCIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0, 
                    // 0- date, 1-top line, 2-middle line, 3-bottom line
                    PC = [], 
                    // middle line, top line and bottom line
                    ML,
                    TL,
                    BL,
                    date,
                    low = 2,
                    high = 1,
                    xData = [],
                    yData = [],
                    slicedY,
                    extremes,
                    i;
                if (yValLen < period) {
                    return;
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
            };
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
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/price-channel
             * @optionparent plotOptions.pc
             */
            PCIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * @excluding index
                 */
                params: {
                    index: void 0,
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
                        lineColor: palette.colors[2],
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
                        lineColor: palette.colors[8],
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1
                    }
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            });
            return PCIndicator;
        }(SMAIndicator));
        extend(PCIndicator.prototype, {
            getTranslatedLinesNames: MultipleLinesMixin.getTranslatedLinesNames,
            drawGraph: MultipleLinesMixin.drawGraph,
            toYData: MultipleLinesMixin.toYData,
            pointArrayMap: ['top', 'middle', 'bottom'],
            pointValKey: 'middle',
            nameBase: 'Price Channel',
            nameComponents: ['period'],
            linesApiNames: ['topLine', 'bottomLine'],
            translate: MultipleLinesMixin.translate
        });
        SeriesRegistry.registerSeriesType('pc', PCIndicator);
        /* *
         *
         *  Default Export
         *
         * */
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
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/price-channel
         * @apioption    series.pc
         */
        ''; // to include the above in the js output

        return PCIndicator;
    });
    _registerModule(_modules, 'masters/indicators/price-channel.src.js', [], function () {


    });
}));