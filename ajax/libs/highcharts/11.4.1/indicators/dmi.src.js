/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Stock/Indicators/MultipleLinesComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2024 Wojciech Chmiel
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: { prototype: smaProto } } = SeriesRegistry.seriesTypes;
        const { defined, error, merge } = U;
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
            /**
             * Additional lines DOCS names. Elements of linesApiNames array should
             * be consistent with DOCS line names defined in your implementation.
             * Notice that linesApiNames should have decreased amount of elements
             * relative to pointArrayMap (without pointValKey).
             *
             * @private
             * @type {Array<string>}
             */
            const linesApiNames = ['bottomLine'];
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
            const pointArrayMap = ['top', 'bottom'];
            /**
             * Names of the lines, between which the area should be plotted.
             * If the drawing of the area should
             * be disabled for some indicators, leave this option as an empty array.
             * Names should be the same as the names in the pointArrayMap.
             *
             * @private
             * @type {Array<string>}
             */
            const areaLinesNames = ['top'];
            /**
             * Main line id.
             *
             * @private
             * @type {string}
             */
            const pointValKey = 'top';
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
                const proto = IndicatorClass.prototype;
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
                const translatedLines = [];
                (indicator.pointArrayMap || []).forEach((propertyName) => {
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
                const indicator = this, pointValKey = indicator.pointValKey, linesApiNames = indicator.linesApiNames, areaLinesNames = indicator.areaLinesNames, mainLinePoints = indicator.points, mainLineOptions = indicator.options, mainLinePath = indicator.graph, gappedExtend = {
                    options: {
                        gapSize: mainLineOptions.gapSize
                    }
                }, 
                // Additional lines point place holders:
                secondaryLines = [], secondaryLinesNames = getTranslatedLinesNames(indicator, pointValKey);
                let pointsLength = mainLinePoints.length, point;
                // Generate points for additional lines:
                secondaryLinesNames.forEach((plotLine, index) => {
                    // Create additional lines point place holders
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
                    const index = secondaryLinesNames.indexOf(getLineName(areaLinesNames[0])), secondLinePoints = secondaryLines[index], firstLinePoints = areaLinesNames.length === 1 ?
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
                linesApiNames.forEach((lineName, i) => {
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
                let areaPath, path = [], higherAreaPath = [];
                points = points || this.points;
                // Render Span
                if (this.fillGraph && this.nextPoints) {
                    areaPath = smaProto.getGraphPath.call(this, this.nextPoints);
                    if (areaPath && areaPath.length) {
                        areaPath[0][0] = 'L';
                        path = smaProto.getGraphPath.call(this, points);
                        higherAreaPath = areaPath.slice(0, path.length);
                        // Reverse points, so that the areaFill will start from the end:
                        for (let i = higherAreaPath.length - 1; i >= 0; i--) {
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
                const pointColl = [];
                (this.pointArrayMap || []).forEach((propertyName) => {
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
                const pointArrayMap = this.pointArrayMap;
                let LinesNames = [], value;
                LinesNames = getTranslatedLinesNames(this);
                smaProto.translate.apply(this, arguments);
                this.points.forEach((point) => {
                    pointArrayMap.forEach((propertyName, i) => {
                        value = point[propertyName];
                        // If the modifier, like for example compare exists,
                        // modified the original value by that method, #15867.
                        if (this.dataModify) {
                            value = this.dataModify.modifyValue(value);
                        }
                        if (value !== null) {
                            point[LinesNames[i]] = this.yAxis.toPixels(value, true);
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
    _registerModule(_modules, 'Stock/Indicators/DMI/DMIIndicator.js', [_modules['Stock/Indicators/MultipleLinesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MultipleLinesComposition, SeriesRegistry, U) {
        /* *
         *  (c) 2010-2024 Rafal Sebestjanski
         *
         *  Directional Movement Index (DMI) indicator for Highcharts Stock
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { correctFloat, extend, isArray, merge } = U;
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
        class DMIIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            calculateDM(yVal, i, isPositiveDM) {
                const currentHigh = yVal[i][1], currentLow = yVal[i][2], previousHigh = yVal[i - 1][1], previousLow = yVal[i - 1][2];
                let DM;
                if (currentHigh - previousHigh > previousLow - currentLow) {
                    // For +DM
                    DM = isPositiveDM ? Math.max(currentHigh - previousHigh, 0) : 0;
                }
                else {
                    // For -DM
                    DM = !isPositiveDM ? Math.max(previousLow - currentLow, 0) : 0;
                }
                return correctFloat(DM);
            }
            calculateDI(smoothedDM, tr) {
                return smoothedDM / tr * 100;
            }
            calculateDX(plusDI, minusDI) {
                return correctFloat(Math.abs(plusDI - minusDI) / Math.abs(plusDI + minusDI) * 100);
            }
            smoothValues(accumulatedValues, currentValue, period) {
                return correctFloat(accumulatedValues - accumulatedValues / period + currentValue);
            }
            getTR(currentPoint, prevPoint) {
                return correctFloat(Math.max(
                // `currentHigh - currentLow`
                currentPoint[1] - currentPoint[2], 
                // `currentHigh - previousClose`
                !prevPoint ? 0 : Math.abs(currentPoint[1] - prevPoint[3]), 
                // `currentLow - previousClose`
                !prevPoint ? 0 : Math.abs(currentPoint[2] - prevPoint[3])));
            }
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, DMI = [], xData = [], yData = [];
                if (
                // Check period, if bigger than points length, skip
                (xVal.length <= period) ||
                    // Only ohlc data is valid
                    !isArray(yVal[0]) ||
                    yVal[0].length !== 4) {
                    return;
                }
                let prevSmoothedPlusDM = 0, prevSmoothedMinusDM = 0, prevSmoothedTR = 0, i;
                for (i = 1; i < yValLen; i++) {
                    let smoothedPlusDM, smoothedMinusDM, smoothedTR, plusDM, // +DM
                    minusDM, // -DM
                    TR, plusDI, // +DI
                    minusDI, // -DI
                    DX;
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
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
                index: void 0 // Unused index, do not inherit (#15362)
            },
            marker: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<span style="color: {point.color}">' +
                    '\u25CF</span><b> {series.name}</b><br/>' +
                    '<span style="color: {point.color}">DX</span>: {point.y}<br/>' +
                    '<span style="color: ' +
                    '{point.series.options.plusDILine.styles.lineColor}">' +
                    '+DI</span>: {point.plusDI}<br/>' +
                    '<span style="color: ' +
                    '{point.series.options.minusDILine.styles.lineColor}">' +
                    '-DI</span>: {point.minusDI}<br/>'
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
                    lineColor: "#06b535" /* Palette.positiveColor */ // Green-ish
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
                    lineColor: "#f21313" /* Palette.negativeColor */ // Red-ish
                }
            },
            dataGrouping: {
                approximation: 'averages'
            }
        });
        extend(DMIIndicator.prototype, {
            areaLinesNames: [],
            nameBase: 'DMI',
            linesApiNames: ['plusDILine', 'minusDILine'],
            pointArrayMap: ['y', 'plusDI', 'minusDI'],
            parallelArrays: ['x', 'y', 'plusDI', 'minusDI'],
            pointValKey: 'y'
        });
        MultipleLinesComposition.compose(DMIIndicator);
        SeriesRegistry.registerSeriesType('dmi', DMIIndicator);
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
        ''; // To include the above in the js output

        return DMIIndicator;
    });
    _registerModule(_modules, 'masters/indicators/dmi.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));