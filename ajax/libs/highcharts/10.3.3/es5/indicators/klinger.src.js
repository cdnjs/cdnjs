/**
 * @license Highcharts Stock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/klinger', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
        var defined = U.defined, error = U.error, merge = U.merge;
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
                var indicator = this, pointValKey = indicator.pointValKey, linesApiNames = indicator.linesApiNames, areaLinesNames = indicator.areaLinesNames, mainLinePoints = indicator.points, mainLineOptions = indicator.options, mainLinePath = indicator.graph, gappedExtend = {
                    options: {
                        gapSize: mainLineOptions.gapSize
                    }
                }, 
                // additional lines point place holders:
                secondaryLines = [], secondaryLinesNames = getTranslatedLinesNames(indicator, pointValKey);
                var pointsLength = mainLinePoints.length, point;
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
                    var index = secondaryLinesNames.indexOf(getLineName(areaLinesNames[0])), secondLinePoints = secondaryLines[index], firstLinePoints = areaLinesNames.length === 1 ?
                        mainLinePoints :
                        secondaryLines[secondaryLinesNames.indexOf(getLineName(areaLinesNames[1]))], originalColor = indicator.color;
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
                var areaPath, path = [], higherAreaPath = [];
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
                var LinesNames = [], value;
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
    _registerModule(_modules, 'Stock/Indicators/Klinger/KlingerIndicator.js', [_modules['Stock/Indicators/MultipleLinesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MultipleLinesComposition, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var _a = SeriesRegistry.seriesTypes, EMAIndicator = _a.ema, SMAIndicator = _a.sma;
        var correctFloat = U.correctFloat, error = U.error, extend = U.extend, isArray = U.isArray, merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Klinger oscillator series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.klinger
         *
         * @augments Highcharts.Series
         */
        var KlingerIndicator = /** @class */ (function (_super) {
            __extends(KlingerIndicator, _super);
            function KlingerIndicator() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.points = void 0;
                _this.options = void 0;
                _this.volumeSeries = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            KlingerIndicator.prototype.calculateTrend = function (yVal, i) {
                var isUpward = yVal[i][1] + yVal[i][2] + yVal[i][3] >
                    yVal[i - 1][1] + yVal[i - 1][2] + yVal[i - 1][3];
                return isUpward ? 1 : -1;
            };
            // Checks if the series and volumeSeries are accessible, number of
            // points.x is longer than period, is series has OHLC data
            KlingerIndicator.prototype.isValidData = function (firstYVal) {
                var chart = this.chart, options = this.options, series = this.linkedParent, isSeriesOHLC = isArray(firstYVal) &&
                    firstYVal.length === 4, volumeSeries = this.volumeSeries ||
                    (this.volumeSeries =
                        chart.get(options.params.volumeSeriesID));
                if (!volumeSeries) {
                    error('Series ' +
                        options.params.volumeSeriesID +
                        ' not found! Check `volumeSeriesID`.', true, series.chart);
                }
                var isLengthValid = [series, volumeSeries].every(function (series) {
                    return series && series.xData && series.xData.length >=
                        options.params.slowAvgPeriod;
                });
                return !!(isLengthValid && isSeriesOHLC);
            };
            KlingerIndicator.prototype.getCM = function (previousCM, DM, trend, previousTrend, prevoiusDM) {
                return correctFloat(DM + (trend === previousTrend ? previousCM : prevoiusDM));
            };
            KlingerIndicator.prototype.getDM = function (high, low) {
                return correctFloat(high - low);
            };
            KlingerIndicator.prototype.getVolumeForce = function (yVal) {
                var volumeForce = [];
                var CM = 0, // cumulative measurement
                DM, // daily measurement
                force, i = 1, // start from second point
                previousCM = 0, previousDM = yVal[0][1] - yVal[0][2], // initial DM
                previousTrend = 0, trend;
                for (i; i < yVal.length; i++) {
                    trend = this.calculateTrend(yVal, i);
                    DM = this.getDM(yVal[i][1], yVal[i][2]);
                    // For the first iteration when the previousTrend doesn't exist,
                    // previousCM doesn't exist either, but it doesn't matter becouse
                    // it's filltered out in the getCM method in else statement,
                    // (in this iteration, previousCM can be raplaced with the DM).
                    CM = this.getCM(previousCM, DM, trend, previousTrend, previousDM);
                    force = this.volumeSeries.yData[i] *
                        trend * Math.abs(2 * ((DM / CM) - 1)) * 100;
                    volumeForce.push([force]);
                    // Before next iteration, assign the current as the previous.
                    previousTrend = trend;
                    previousCM = CM;
                    previousDM = DM;
                }
                return volumeForce;
            };
            KlingerIndicator.prototype.getEMA = function (yVal, prevEMA, SMA, EMApercent, index, i, xVal) {
                return EMAIndicator.prototype.calculateEma(xVal || [], yVal, typeof i === 'undefined' ? 1 : i, EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
            };
            KlingerIndicator.prototype.getSMA = function (period, index, values) {
                return EMAIndicator.prototype
                    .accumulatePeriodPoints(period, index, values) / period;
            };
            KlingerIndicator.prototype.getValues = function (series, params) {
                var Klinger = [], xVal = series.xData, yVal = series.yData, xData = [], yData = [], calcSingal = [];
                var KO, i = 0, fastEMA = 0, slowEMA, 
                // signalEMA: number|undefined = void 0,
                previousFastEMA = void 0, previousSlowEMA = void 0, signal = null;
                // If the necessary conditions are not fulfilled, don't proceed.
                if (!this.isValidData(yVal[0])) {
                    return;
                }
                // Calculate the Volume Force array.
                var volumeForce = this.getVolumeForce(yVal);
                // Calculate SMA for the first points.
                var SMAFast = this.getSMA(params.fastAvgPeriod, 0, volumeForce), SMASlow = this.getSMA(params.slowAvgPeriod, 0, volumeForce);
                // Calculate EMApercent for the first points.
                var fastEMApercent = 2 / (params.fastAvgPeriod + 1), slowEMApercent = 2 / (params.slowAvgPeriod + 1);
                // Calculate KO
                for (i; i < yVal.length; i++) {
                    // Get EMA for fast period.
                    if (i >= params.fastAvgPeriod) {
                        fastEMA = this.getEMA(volumeForce, previousFastEMA, SMAFast, fastEMApercent, 0, i, xVal)[1];
                        previousFastEMA = fastEMA;
                    }
                    // Get EMA for slow period.
                    if (i >= params.slowAvgPeriod) {
                        slowEMA = this.getEMA(volumeForce, previousSlowEMA, SMASlow, slowEMApercent, 0, i, xVal)[1];
                        previousSlowEMA = slowEMA;
                        KO = correctFloat(fastEMA - slowEMA);
                        calcSingal.push(KO);
                        // Calculate signal SMA
                        if (calcSingal.length >= params.signalPeriod) {
                            signal = calcSingal.slice(-params.signalPeriod)
                                .reduce(function (prev, curr) {
                                return prev + curr;
                            }) / params.signalPeriod;
                        }
                        Klinger.push([xVal[i], KO, signal]);
                        xData.push(xVal[i]);
                        yData.push([KO, signal]);
                    }
                }
                return {
                    values: Klinger,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Klinger oscillator. This series requires the `linkedTo` option to be set
             * and should be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/klinger
             *         Klinger oscillator
             *
             * @extends      plotOptions.sma
             * @since 9.1.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/klinger
             * @optionparent plotOptions.klinger
             */
            KlingerIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * Paramters used in calculation of Klinger Oscillator.
                 *
                 * @excluding index, period
                 */
                params: {
                    /**
                     * The fast period for indicator calculations.
                     */
                    fastAvgPeriod: 34,
                    /**
                     * The slow period for indicator calculations.
                     */
                    slowAvgPeriod: 55,
                    /**
                     * The base period for signal calculations.
                     */
                    signalPeriod: 13,
                    /**
                     * The id of another series to use its data as volume data for the
                     * indiator calculation.
                     */
                    volumeSeriesID: 'volume'
                },
                signalLine: {
                    /**
                     * Styles for a signal line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * [plotOptions.klinger.color
                         * ](#plotOptions.klinger.color).
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: '#ff0000'
                    }
                },
                dataGrouping: {
                    approximation: 'averages'
                },
                tooltip: {
                    pointFormat: '<span style="color: {point.color}">\u25CF</span>' +
                        '<b> {series.name}</b><br/>' +
                        '<span style="color: {point.color}">Klinger</span>: ' +
                        '{point.y}<br/>' +
                        '<span style="color: ' +
                        '{point.series.options.signalLine.styles.lineColor}">' +
                        'Signal</span>' +
                        ': {point.signal}<br/>'
                }
            });
            return KlingerIndicator;
        }(SMAIndicator));
        extend(KlingerIndicator.prototype, {
            areaLinesNames: [],
            linesApiNames: ['signalLine'],
            nameBase: 'Klinger',
            nameComponents: ['fastAvgPeriod', 'slowAvgPeriod'],
            pointArrayMap: ['y', 'signal'],
            parallelArrays: ['x', 'y', 'signal'],
            pointValKey: 'y'
        });
        MultipleLinesComposition.compose(KlingerIndicator);
        SeriesRegistry.registerSeriesType('klinger', KlingerIndicator);
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
         * A Klinger oscillator. If the [type](#series.klinger.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.klinger
         * @since 9.1.0
         * @product   highstock
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/klinger
         * @apioption series.klinger
         */
        ''; // to include the above in the js output

        return KlingerIndicator;
    });
    _registerModule(_modules, 'masters/indicators/klinger.src.js', [], function () {


    });
}));