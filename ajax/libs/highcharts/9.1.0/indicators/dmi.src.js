/**
 * @license Highstock JS v9.1.0 (2021-05-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/dmi', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                LinesNames = indicator.getTranslatedLinesNames();
                SMA.prototype.translate.apply(indicator, arguments);
                indicator.points.forEach(function (point) {
                    pointArrayMap.forEach(function (propertyName, i) {
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
    _registerModule(_modules, 'Stock/Indicators/DMI/DMIIndicator.js', [_modules['Mixins/MultipleLines.js'], _modules['Core/Color/Palette.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MultipleLinesMixin, palette, SeriesRegistry, U) {
        /* *
         *  (c) 2010-2021 Rafal Sebestjanski
         *
         *  Directional Movement Index (DMI) indicator for Highcharts Stock
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
            isArray = U.isArray,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Directional Movement Index (DMI) series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dmi
         *
         * @augments Highcharts.Series
         */
        var DMIIndicator = /** @class */ (function (_super) {
                __extends(DMIIndicator, _super);
            function DMIIndicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* *
             *
             *  Functions
             *
             * */
            DMIIndicator.prototype.calculateDM = function (yVal, i, isPositiveDM) {
                var currentHigh = yVal[i][1],
                    currentLow = yVal[i][2],
                    previousHigh = yVal[i - 1][1],
                    previousLow = yVal[i - 1][2];
                var DM;
                if (currentHigh - previousHigh > previousLow - currentLow) {
                    // for +DM
                    DM = isPositiveDM ? Math.max(currentHigh - previousHigh, 0) : 0;
                }
                else {
                    // for -DM
                    DM = !isPositiveDM ? Math.max(previousLow - currentLow, 0) : 0;
                }
                return correctFloat(DM);
            };
            DMIIndicator.prototype.calculateDI = function (smoothedDM, tr) {
                return smoothedDM / tr * 100;
            };
            DMIIndicator.prototype.calculateDX = function (plusDI, minusDI) {
                return correctFloat(Math.abs(plusDI - minusDI) / Math.abs(plusDI + minusDI) * 100);
            };
            DMIIndicator.prototype.smoothValues = function (accumulatedValues, currentValue, period) {
                return correctFloat(accumulatedValues - accumulatedValues / period + currentValue);
            };
            DMIIndicator.prototype.getTR = function (currentPoint, prevPoint) {
                return correctFloat(Math.max(
                // currentHigh - currentLow
                currentPoint[1] - currentPoint[2], 
                // currentHigh - previousClose
                !prevPoint ? 0 : Math.abs(currentPoint[1] - prevPoint[3]), 
                // currentLow - previousClose
                !prevPoint ? 0 : Math.abs(currentPoint[2] - prevPoint[3])));
            };
            DMIIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    DMI = [],
                    xData = [],
                    yData = [];
                if (
                // Check period, if bigger than points length, skip
                (xVal.length <= period) ||
                    // Only ohlc data is valid
                    !isArray(yVal[0]) ||
                    yVal[0].length !== 4) {
                    return;
                }
                var prevSmoothedPlusDM = 0,
                    prevSmoothedMinusDM = 0,
                    prevSmoothedTR = 0,
                    i;
                for (i = 1; i < yValLen; i++) {
                    var smoothedPlusDM = void 0,
                        smoothedMinusDM = void 0,
                        smoothedTR = void 0,
                        plusDM = void 0, // +DM
                        minusDM = void 0, // -DM
                        TR = void 0,
                        plusDI = void 0, // +DI
                        minusDI = void 0, // -DI
                        DX = void 0;
                    if (i <= period) {
                        plusDM = this.calculateDM(yVal, i, true);
                        minusDM = this.calculateDM(yVal, i);
                        TR = this.getTR(yVal[i], yVal[i - 1]);
                        // Accumulate first period values to smooth them later
                        prevSmoothedPlusDM += plusDM;
                        prevSmoothedMinusDM += minusDM;
                        prevSmoothedTR += TR;
                        // Get all values for the first point
                        if (i === period) {
                            plusDI = this.calculateDI(prevSmoothedPlusDM, prevSmoothedTR);
                            minusDI = this.calculateDI(prevSmoothedMinusDM, prevSmoothedTR);
                            DX = this.calculateDX(prevSmoothedPlusDM, prevSmoothedMinusDM);
                            DMI.push([xVal[i], DX, plusDI, minusDI]);
                            xData.push(xVal[i]);
                            yData.push([DX, plusDI, minusDI]);
                        }
                    }
                    else {
                        // Calculate current values
                        plusDM = this.calculateDM(yVal, i, true);
                        minusDM = this.calculateDM(yVal, i);
                        TR = this.getTR(yVal[i], yVal[i - 1]);
                        // Smooth +DM, -DM and TR
                        smoothedPlusDM = this.smoothValues(prevSmoothedPlusDM, plusDM, period);
                        smoothedMinusDM = this.smoothValues(prevSmoothedMinusDM, minusDM, period);
                        smoothedTR = this.smoothValues(prevSmoothedTR, TR, period);
                        // Save current smoothed values for the next step
                        prevSmoothedPlusDM = smoothedPlusDM;
                        prevSmoothedMinusDM = smoothedMinusDM;
                        prevSmoothedTR = smoothedTR;
                        // Get all next points (except the first one calculated above)
                        plusDI = this.calculateDI(prevSmoothedPlusDM, prevSmoothedTR);
                        minusDI = this.calculateDI(prevSmoothedMinusDM, prevSmoothedTR);
                        DX = this.calculateDX(prevSmoothedPlusDM, prevSmoothedMinusDM);
                        DMI.push([xVal[i], DX, plusDI, minusDI]);
                        xData.push(xVal[i]);
                        yData.push([DX, plusDI, minusDI]);
                    }
                }
                return {
                    values: DMI,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Directional Movement Index (DMI).
             * This series requires the `linkedTo` option to be set and should
             * be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/dmi
             *         DMI indicator
             *
             * @extends      plotOptions.sma
             * @since 9.1.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/dmi
             * @optionparent plotOptions.dmi
             */
            DMIIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * @excluding index
                 */
                params: {
                    index: void 0 // unused index, do not inherit (#15362)
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<span style="color: {point.color}">\u25CF</span><b> {series.name}</b><br/>' +
                        '<span style="color: {point.color}">DX</span>: {point.y}<br/>' +
                        '<span style="color: {point.series.options.plusDILine.styles.lineColor}">+DI</span>' +
                        ': {point.plusDI}<br/>' +
                        '<span style="color: {point.series.options.minusDILine.styles.lineColor}">-DI</span>' +
                        ': {point.minusDI}<br/>'
                },
                /**
                 * +DI line options.
                 */
                plusDILine: {
                    /**
                     * Styles for the +DI line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line.
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: palette.positiveColor // green-ish
                    }
                },
                /**
                 * -DI line options.
                 */
                minusDILine: {
                    /**
                     * Styles for the -DI line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line.
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: palette.negativeColor // red-ish
                    }
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            });
            return DMIIndicator;
        }(SMAIndicator));
        extend(DMIIndicator.prototype, {
            nameBase: 'DMI',
            pointArrayMap: ['y', 'plusDI', 'minusDI'],
            parallelArrays: ['x', 'y', 'plusDI', 'minusDI'],
            pointValKey: 'y',
            linesApiNames: ['plusDILine', 'minusDILine'],
            drawGraph: MultipleLinesMixin.drawGraph,
            getTranslatedLinesNames: MultipleLinesMixin.getTranslatedLinesNames,
            translate: MultipleLinesMixin.translate,
            toYData: MultipleLinesMixin.toYData
        });
        SeriesRegistry.registerSeriesType('dmi', DMIIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * The Directional Movement Index (DMI) indicator series.
         * If the [type](#series.dmi.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dmi
         * @since 9.1.0
         * @product   highstock
         * @excluding allAreas, colorAxis,  dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/dmi
         * @apioption series.dmi
         */
        ''; // to include the above in the js output

        return DMIIndicator;
    });
    _registerModule(_modules, 'masters/indicators/dmi.src.js', [], function () {


    });
}));