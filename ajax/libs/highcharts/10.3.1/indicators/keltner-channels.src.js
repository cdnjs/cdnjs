/**
 * @license Highstock JS v10.3.1 (2022-10-31)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Daniel Studencki
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/keltner-channels', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/MultipleLinesComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2021 Wojciech Chmiel
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var smaProto = SeriesRegistry.seriesTypes.sma.prototype;
        var defined = U.defined,
            error = U.error,
            merge = U.merge;
        /* *
         *
         *  Composition
         *
         * */
        var MultipleLinesComposition;
        (function (MultipleLinesComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
            *
            *  Constants
            *
            * */
            var composedClasses = [];
            /**
             * Additional lines DOCS names. Elements of linesApiNames array should
             * be consistent with DOCS line names defined in your implementation.
             * Notice that linesApiNames should have decreased amount of elements
             * relative to pointArrayMap (without pointValKey).
             *
             * @private
             * @type {Array<string>}
             */
            var linesApiNames = ['bottomLine'];
            /**
             * Lines ids. Required to plot appropriate amount of lines.
             * Notice that pointArrayMap should have more elements than
             * linesApiNames, because it contains main line and additional lines ids.
             * Also it should be consistent with amount of lines calculated in
             * getValues method from your implementation.
             *
             * @private
             * @type {Array<string>}
             */
            var pointArrayMap = ['top', 'bottom'];
            /**
             * Names of the lines, bewteen which the area should be plotted.
             * If the drawing of the area should
             * be disabled for some indicators, leave this option as an empty array.
             * Names should be the same as the names in the pointArrayMap.
             *
             * @private
             * @type {Array<string>}
             */
            var areaLinesNames = ['top'];
            /**
             * Main line id.
             *
             * @private
             * @type {string}
             */
            var pointValKey = 'top';
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Composition useful for all indicators that have more than one line.
             * Compose it with your implementation where you will provide the
             * `getValues` method appropriate to your indicator and `pointArrayMap`,
             * `pointValKey`, `linesApiNames` properties. Notice that `pointArrayMap`
             * should be consistent with the amount of lines calculated in the
             * `getValues` method.
             *
             * @private
             */
            function compose(IndicatorClass) {
                if (composedClasses.indexOf(IndicatorClass) === -1) {
                    composedClasses.push(IndicatorClass);
                    var proto = IndicatorClass.prototype;
                    proto.linesApiNames = (proto.linesApiNames ||
                        linesApiNames.slice());
                    proto.pointArrayMap = (proto.pointArrayMap ||
                        pointArrayMap.slice());
                    proto.pointValKey = (proto.pointValKey ||
                        pointValKey);
                    proto.areaLinesNames = (proto.areaLinesNames ||
                        areaLinesNames.slice());
                    proto.drawGraph = indicatorDrawGraph;
                    proto.getGraphPath = indicatorGetGraphPath;
                    proto.toYData = indicatorToYData;
                    proto.translate = indicatorTranslate;
                }
                return IndicatorClass;
            }
            MultipleLinesComposition.compose = compose;
            /**
             * Generate the API name of the line
             *
             * @private
             * @param propertyName name of the line
             */
            function getLineName(propertyName) {
                return ('plot' +
                    propertyName.charAt(0).toUpperCase() +
                    propertyName.slice(1));
            }
            /**
             * Create translatedLines Collection based on pointArrayMap.
             *
             * @private
             * @param {string} [excludedValue]
             *        Main line id
             * @return {Array<string>}
             *         Returns translated lines names without excluded value.
             */
            function getTranslatedLinesNames(indicator, excludedValue) {
                var translatedLines = [];
                (indicator.pointArrayMap || []).forEach(function (propertyName) {
                    if (propertyName !== excludedValue) {
                        translatedLines.push(getLineName(propertyName));
                    }
                });
                return translatedLines;
            }
            /**
             * Draw main and additional lines.
             *
             * @private
             */
            function indicatorDrawGraph() {
                var indicator = this,
                    pointValKey = indicator.pointValKey,
                    linesApiNames = indicator.linesApiNames,
                    areaLinesNames = indicator.areaLinesNames,
                    mainLinePoints = indicator.points,
                    mainLineOptions = indicator.options,
                    mainLinePath = indicator.graph,
                    gappedExtend = {
                        options: {
                            gapSize: mainLineOptions.gapSize
                        }
                    }, 
                    // additional lines point place holders:
                    secondaryLines = [],
                    secondaryLinesNames = getTranslatedLinesNames(indicator,
                    pointValKey);
                var pointsLength = mainLinePoints.length,
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
                // Modify options and generate area fill:
                if (indicator.userOptions.fillColor && areaLinesNames.length) {
                    var index = secondaryLinesNames.indexOf(getLineName(areaLinesNames[0])),
                        secondLinePoints = secondaryLines[index],
                        firstLinePoints = areaLinesNames.length === 1 ?
                            mainLinePoints :
                            secondaryLines[secondaryLinesNames.indexOf(getLineName(areaLinesNames[1]))],
                        originalColor = indicator.color;
                    indicator.points = firstLinePoints;
                    indicator.nextPoints = secondLinePoints;
                    indicator.color = indicator.userOptions.fillColor;
                    indicator.options = merge(mainLinePoints, gappedExtend);
                    indicator.graph = indicator.area;
                    indicator.fillGraph = true;
                    smaProto.drawGraph.call(indicator);
                    indicator.area = indicator.graph;
                    // Clean temporary properties:
                    delete indicator.nextPoints;
                    delete indicator.fillGraph;
                    indicator.color = originalColor;
                }
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
                                ' are consistent with your DOCS line names."');
                        }
                        indicator.graph = indicator['graph' + lineName];
                        smaProto.drawGraph.call(indicator);
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
                smaProto.drawGraph.call(indicator);
            }
            /**
             * Create the path based on points provided as argument.
             * If indicator.nextPoints option is defined, create the areaFill.
             *
             * @private
             * @param points Points on which the path should be created
             */
            function indicatorGetGraphPath(points) {
                var areaPath,
                    path = [],
                    higherAreaPath = [];
                points = points || this.points;
                // Render Span
                if (this.fillGraph && this.nextPoints) {
                    areaPath = smaProto.getGraphPath.call(this, this.nextPoints);
                    if (areaPath && areaPath.length) {
                        areaPath[0][0] = 'L';
                        path = smaProto.getGraphPath.call(this, points);
                        higherAreaPath = areaPath.slice(0, path.length);
                        // Reverse points, so that the areaFill will start from the end:
                        for (var i = higherAreaPath.length - 1; i >= 0; i--) {
                            path.push(higherAreaPath[i]);
                        }
                    }
                }
                else {
                    path = smaProto.getGraphPath.apply(this, arguments);
                }
                return path;
            }
            /**
             * @private
             * @param {Highcharts.Point} point
             *        Indicator point
             * @return {Array<number>}
             *         Returns point Y value for all lines
             */
            function indicatorToYData(point) {
                var pointColl = [];
                (this.pointArrayMap || []).forEach(function (propertyName) {
                    pointColl.push(point[propertyName]);
                });
                return pointColl;
            }
            /**
             * Add lines plot pixel values.
             *
             * @private
             */
            function indicatorTranslate() {
                var _this = this;
                var pointArrayMap = this.pointArrayMap;
                var LinesNames = [],
                    value;
                LinesNames = getTranslatedLinesNames(this);
                smaProto.translate.apply(this, arguments);
                this.points.forEach(function (point) {
                    pointArrayMap.forEach(function (propertyName, i) {
                        value = point[propertyName];
                        // If the modifier, like for example compare exists,
                        // modified the original value by that method, #15867.
                        if (_this.dataModify) {
                            value = _this.dataModify.modifyValue(value);
                        }
                        if (value !== null) {
                            point[LinesNames[i]] = _this.yAxis.toPixels(value, true);
                        }
                    });
                });
            }
        })(MultipleLinesComposition || (MultipleLinesComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return MultipleLinesComposition;
    });
    _registerModule(_modules, 'Stock/Indicators/KeltnerChannels/KeltnerChannelsIndicator.js', [_modules['Stock/Indicators/MultipleLinesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MultipleLinesComposition, SeriesRegistry, U) {
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
        var correctFloat = U.correctFloat,
            extend = U.extend,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Keltner Channels series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.keltnerchannels
         *
         * @augments Highcharts.Series
         */
        var KeltnerChannelsIndicator = /** @class */ (function (_super) {
                __extends(KeltnerChannelsIndicator, _super);
            function KeltnerChannelsIndicator() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
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
            KeltnerChannelsIndicator.prototype.init = function () {
                SeriesRegistry.seriesTypes.sma.prototype.init.apply(this, arguments);
                // Set default color for lines:
                this.options = merge({
                    topLine: {
                        styles: {
                            lineColor: this.color
                        }
                    },
                    bottomLine: {
                        styles: {
                            lineColor: this.color
                        }
                    }
                }, this.options);
            };
            KeltnerChannelsIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    periodATR = params.periodATR,
                    multiplierATR = params.multiplierATR,
                    index = params.index,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0, 
                    // Keltner Channels array structure:
                    // 0-date, 1-top line, 2-middle line, 3-bottom line
                    KC = [], 
                    // middle line, top line and bottom lineI
                    ML,
                    TL,
                    BL,
                    date,
                    seriesEMA = SeriesRegistry.seriesTypes.ema.prototype.getValues(series, {
                        period: period,
                        index: index
                    }),
                    seriesATR = SeriesRegistry.seriesTypes.atr.prototype.getValues(series, {
                        period: periodATR
                    }),
                    pointEMA,
                    pointATR,
                    xData = [],
                    yData = [],
                    i;
                if (yValLen < period) {
                    return;
                }
                for (i = period; i <= yValLen; i++) {
                    pointEMA = seriesEMA.values[i - period];
                    pointATR = seriesATR.values[i - periodATR];
                    date = pointEMA[0];
                    TL = correctFloat(pointEMA[1] + (multiplierATR * pointATR[1]));
                    BL = correctFloat(pointEMA[1] - (multiplierATR * pointATR[1]));
                    ML = pointEMA[1];
                    KC.push([date, TL, ML, BL]);
                    xData.push(date);
                    yData.push([TL, ML, BL]);
                }
                return {
                    values: KC,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Keltner Channels. This series requires the `linkedTo` option to be set
             * and should be loaded after the `stock/indicators/indicators.js`,
             * `stock/indicators/atr.js`, and `stock/ema/.js`.
             *
             * @sample {highstock} stock/indicators/keltner-channels
             *         Keltner Channels
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart,showInNavigator,
             *               stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/keltner-channels
             * @optionparent plotOptions.keltnerchannels
             */
            KeltnerChannelsIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * Option for fill color between lines in Keltner Channels Indicator.
                 *
                 * @sample {highstock} stock/indicators/indicator-area-fill
                 *      Background fill between lines.
                 *
                 * @type {Highcharts.Color}
                 * @since 9.3.2
                 * @apioption plotOptions.keltnerchannels.fillColor
                 *
                 */
                params: {
                    /**
                     * The point index which indicator calculations will base. For
                     * example using OHLC data, index=2 means the indicator will be
                     * calculated using Low values.
                     */
                    index: 0,
                    period: 20,
                    /**
                     * The ATR period.
                     */
                    periodATR: 10,
                    /**
                     * The ATR multiplier.
                     */
                    multiplierATR: 2
                },
                /**
                 * Bottom line options.
                 *
                 */
                bottomLine: {
                    /**
                     * Styles for a bottom line.
                     *
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * `plotOptions.keltnerchannels.color`
                         */
                        lineColor: void 0
                    }
                },
                /**
                 * Top line options.
                 *
                 * @extends plotOptions.keltnerchannels.bottomLine
                 */
                topLine: {
                    styles: {
                        lineWidth: 1,
                        lineColor: void 0
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Upper Channel: {point.top}<br/>EMA({series.options.params.period}): {point.middle}<br/>Lower Channel: {point.bottom}<br/>'
                },
                marker: {
                    enabled: false
                },
                dataGrouping: {
                    approximation: 'averages'
                },
                lineWidth: 1
            });
            return KeltnerChannelsIndicator;
        }(SMAIndicator));
        extend(KeltnerChannelsIndicator.prototype, {
            nameBase: 'Keltner Channels',
            areaLinesNames: ['top', 'bottom'],
            nameComponents: ['period', 'periodATR', 'multiplierATR'],
            linesApiNames: ['topLine', 'bottomLine'],
            pointArrayMap: ['top', 'middle', 'bottom'],
            pointValKey: 'middle'
        });
        MultipleLinesComposition.compose(KeltnerChannelsIndicator);
        SeriesRegistry.registerSeriesType('keltnerchannels', KeltnerChannelsIndicator);
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
         * A Keltner Channels indicator. If the [type](#series.keltnerchannels.type)
         * option is not specified, it is inherited from[chart.type](#chart.type).
         *
         * @extends      series,plotOptions.keltnerchannels
         * @since        7.0.0
         * @product      highstock
         * @excluding    allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *               joinBy, keys, navigatorOptions, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointRange, pointStart,
         *               stacking, showInNavigator
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/keltner-channels
         * @apioption    series.keltnerchannels
         */
        ''; // to include the above in the js output

        return KeltnerChannelsIndicator;
    });
    _registerModule(_modules, 'masters/indicators/keltner-channels.src.js', [], function () {


    });
}));