/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Stock/Indicators/Aroon/AroonIndicator.js', [_modules['Stock/Indicators/MultipleLinesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MultipleLinesComposition, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        // Utils
        // Index of element with extreme value from array (min or max)
        /**
         * @private
         */
        function getExtremeIndexInArray(arr, extreme) {
            let extremeValue = arr[0], valueIndex = 0, i;
            for (i = 1; i < arr.length; i++) {
                if (extreme === 'max' && arr[i] >= extremeValue ||
                    extreme === 'min' && arr[i] <= extremeValue) {
                    extremeValue = arr[i];
                    valueIndex = i;
                }
            }
            return valueIndex;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Aroon series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.aroon
         *
         * @augments Highcharts.Series
         */
        class AroonIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, 
                // 0- date, 1- Aroon Up, 2- Aroon Down
                AR = [], xData = [], yData = [], low = 2, high = 1;
                let aroonUp, aroonDown, xLow, xHigh, i, slicedY;
                // For a N-period, we start from N-1 point, to calculate Nth point
                // That is why we later need to comprehend slice() elements list
                // with (+1)
                for (i = period - 1; i < yValLen; i++) {
                    slicedY = yVal.slice(i - period + 1, i + 2);
                    xLow = getExtremeIndexInArray(slicedY.map(function (elem) {
                        return pick(elem[low], elem);
                    }), 'min');
                    xHigh = getExtremeIndexInArray(slicedY.map(function (elem) {
                        return pick(elem[high], elem);
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
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/aroon
         * @optionparent plotOptions.aroon
         */
        AroonIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * Parameters used in calculation of aroon series points.
             *
             * @excluding index
             */
            params: {
                index: void 0,
                period: 25
            },
            marker: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Aroon Up: {point.y}<br/>Aroon Down: {point.aroonDown}<br/>'
            },
            /**
             * AroonDown line options.
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
                    lineColor: void 0
                }
            },
            dataGrouping: {
                approximation: 'averages'
            }
        });
        extend(AroonIndicator.prototype, {
            areaLinesNames: [],
            linesApiNames: ['aroonDown'],
            nameBase: 'Aroon',
            pointArrayMap: ['y', 'aroonDown'],
            pointValKey: 'y'
        });
        MultipleLinesComposition.compose(AroonIndicator);
        SeriesRegistry.registerSeriesType('aroon', AroonIndicator);
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
         * A Aroon indicator. If the [type](#series.aroon.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.aroon
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/aroon
         * @apioption series.aroon
         */
        ''; // To avoid removal of the above jsdoc

        return AroonIndicator;
    });
    _registerModule(_modules, 'masters/indicators/aroon.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));