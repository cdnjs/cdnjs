/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * All technical indicators for Highstock
 *
 * (c) 2010-2019 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/indicators-all', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'mixins/indicator-required.js', [_modules['parts/Globals.js']], function (H) {
        /**
         * (c) 2010-2019 Daniel Studencki
         *
         * License: www.highcharts.com/license
         */


        var error = H.error;

        var requiredIndicatorMixin = {
            /**
             * Check whether given indicator is loaded, else throw error.
             * @param {function} indicator Indicator constructor function.
             * @param {string} requiredIndicator required indicator type.
             * @param {string} type Type of indicator where function was called (parent).
             * @param {function} callback Callback which is triggered if the given
             *                            indicator is loaded. Takes indicator as
             *                            an argument.
             * @param {string} errMessage Error message that will be logged in console.
             * @returns {boolean} Returns false when there is no required indicator loaded.
             */
            isParentLoaded: function (
                indicator,
                requiredIndicator,
                type,
                callback,
                errMessage
            ) {
                if (indicator) {
                    return callback ? callback(indicator) : true;
                }
                error(
                    errMessage || this.generateMessage(type, requiredIndicator)
                );
                return false;
            },
            generateMessage: function (indicatorType, required) {
                return 'Error: "' + indicatorType +
                    '" indicator type requires "' + required +
                    '" indicator loaded before. Please read docs: ' +
                    'https://api.highcharts.com/highstock/plotOptions.' +
                    indicatorType;
            }
        };


        return requiredIndicatorMixin;
    });
    _registerModule(_modules, 'indicators/indicators.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var pick = H.pick,
            error = H.error,
            Series = H.Series,
            isArray = H.isArray,
            addEvent = H.addEvent,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes,
            ohlcProto = H.seriesTypes.ohlc.prototype,
            generateMessage = requiredIndicatorMixin.generateMessage;

        /**
         * The parameter allows setting line series type and use OHLC indicators. Data
         * in OHLC format is required.
         *
         * @sample {highstock} stock/indicators/use-ohlc-data
         *         Plot line on Y axis
         *
         * @type      {boolean}
         * @product   highstock
         * @apioption plotOptions.line.useOhlcData
         */

        addEvent(H.Series, 'init', function (eventOptions) {
            var series = this,
                options = eventOptions.options;

            if (
                options.useOhlcData &&
                options.id !== 'highcharts-navigator-series'
            ) {
                H.extend(series, {
                    pointValKey: ohlcProto.pointValKey,
                    keys: ohlcProto.keys,
                    pointArrayMap: ohlcProto.pointArrayMap,
                    toYData: ohlcProto.toYData
                });
            }
        });

        addEvent(Series, 'afterSetOptions', function (e) {
            var options = e.options,
                dataGrouping = options.dataGrouping;

            if (
                dataGrouping &&
                options.useOhlcData &&
                options.id !== 'highcharts-navigator-series'
            ) {
                dataGrouping.approximation = 'ohlc';
            }
        });

        /**
         * The SMA series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.sma
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'sma',
            'line',
            /**
             * Simple moving average indicator (SMA). This series requires `linkedTo`
             * option to be set.
             *
             * @sample stock/indicators/sma
             *         Simple moving average indicator
             *
             * @extends      plotOptions.line
             * @since        6.0.0
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking,
             *               useOhlcData
             * @product      highstock
             * @optionparent plotOptions.sma
             */
            {
                /**
                 * The name of the series as shown in the legend, tooltip etc. If not
                 * set, it will be based on a technical indicator type and default
                 * params.
                 *
                 * @type {string}
                 */
                name: undefined,
                tooltip: {
                    /**
                     * Number of decimals in indicator series.
                     */
                    valueDecimals: 4
                },
                /**
                 * The main series ID that indicator will be based on. Required for this
                 * indicator.
                 *
                 * @type {string}
                 */
                linkedTo: undefined,
                /**
                 * Whether to compare indicator to the main series values
                 * or indicator values.
                 *
                 * @sample {highstock} stock/plotoptions/series-comparetomain/
                 *         Difference between comparing SMA values to the main series
                 *         and its own values.
                 *
                 * @type {boolean}
                 */
                compareToMain: false,
                /**
                 * Paramters used in calculation of regression series' points.
                 */
                params: {
                    /**
                     * The point index which indicator calculations will base. For
                     * example using OHLC data, index=2 means the indicator will be
                     * calculated using Low values.
                     */
                    index: 0,
                    /**
                     * The base period for indicator calculations. This is the number of
                     * data points which are taken into account for the indicator
                     * calculations.
                     */
                    period: 14
                }
            },
            /**
             * @lends Highcharts.Series.prototype
             */
            {
                processData: function () {
                    var series = this,
                        compareToMain = series.options.compareToMain,
                        linkedParent = series.linkedParent;

                    Series.prototype.processData.apply(series, arguments);

                    if (linkedParent && linkedParent.compareValue && compareToMain) {
                        series.compareValue = linkedParent.compareValue;
                    }
                },
                bindTo: {
                    series: true,
                    eventName: 'updatedData'
                },
                hasDerivedData: true,
                useCommonDataGrouping: true,
                nameComponents: ['period'],
                nameSuffixes: [], // e.g. Zig Zag uses extra '%'' in the legend name
                calculateOn: 'init',
                // Defines on which other indicators is this indicator based on.
                requiredIndicators: [],
                requireIndicators: function () {
                    var obj = {
                        allLoaded: true
                    };

                    // Check whether all required indicators are loaded, else return
                    // the object with missing indicator's name.
                    this.requiredIndicators.forEach(function (indicator) {
                        if (seriesTypes[indicator]) {
                            seriesTypes[indicator].prototype.requireIndicators();
                        } else {
                            obj.allLoaded = false;
                            obj.needed = indicator;
                        }
                    });
                    return obj;
                },
                init: function (chart, options) {
                    var indicator = this,
                        requiredIndicators = indicator.requireIndicators();

                    // Check whether all required indicators are loaded.
                    if (!requiredIndicators.allLoaded) {
                        return error(
                            generateMessage(indicator.type, requiredIndicators.needed)
                        );
                    }

                    Series.prototype.init.call(
                        indicator,
                        chart,
                        options
                    );

                    // Make sure we find series which is a base for an indicator
                    chart.linkSeries();

                    indicator.dataEventsToUnbind = [];

                    function recalculateValues() {
                        var oldData = indicator.points || [],
                            oldDataLength = (indicator.xData || []).length,
                            processedData = indicator.getValues(
                                indicator.linkedParent,
                                indicator.options.params
                            ) || {
                                values: [],
                                xData: [],
                                yData: []
                            },
                            croppedDataValues = [],
                            overwriteData = true,
                            oldFirstPointIndex,
                            oldLastPointIndex,
                            croppedData,
                            min,
                            max,
                            i;

                        // We need to update points to reflect changes in all,
                        // x and y's, values. However, do it only for non-grouped
                        // data - grouping does it for us (#8572)
                        if (
                            oldDataLength &&
                            !indicator.hasGroupedData &&
                            indicator.visible &&
                            indicator.points
                        ) {
                            // When data is cropped update only avaliable points (#9493)
                            if (indicator.cropped) {
                                if (indicator.xAxis) {
                                    min = indicator.xAxis.min;
                                    max = indicator.xAxis.max;
                                }

                                croppedData = indicator.cropData(
                                    processedData.xData,
                                    processedData.yData,
                                    min,
                                    max
                                );

                                for (i = 0; i < croppedData.xData.length; i++) {
                                    // (#10774)
                                    croppedDataValues.push([
                                        croppedData.xData[i]
                                    ].concat(
                                        H.splat(croppedData.yData[i])
                                    ));
                                }

                                oldFirstPointIndex = processedData.xData.indexOf(
                                    indicator.xData[0]
                                );
                                oldLastPointIndex = processedData.xData.indexOf(
                                    indicator.xData[indicator.xData.length - 1]
                                );

                                // Check if indicator points should be shifted (#8572)
                                if (
                                    oldFirstPointIndex === -1 &&
                                    oldLastPointIndex === processedData.xData.length - 2
                                ) {
                                    if (croppedDataValues[0][0] === oldData[0].x) {
                                        croppedDataValues.shift();
                                    }
                                }

                                indicator.updateData(croppedDataValues);

                            // Omit addPoint() and removePoint() cases
                            } else if (
                                processedData.xData.length !== oldDataLength - 1 &&
                                processedData.xData.length !== oldDataLength + 1
                            ) {
                                overwriteData = false;
                                indicator.updateData(processedData.values);
                            }
                        }

                        if (overwriteData) {
                            indicator.xData = processedData.xData;
                            indicator.yData = processedData.yData;
                            indicator.options.data = processedData.values;
                        }

                        // Removal of processedXData property is required because on
                        // first translate processedXData array is empty
                        if (indicator.bindTo.series === false) {
                            delete indicator.processedXData;

                            indicator.isDirty = true;
                            indicator.redraw();
                        }
                        indicator.isDirtyData = false;
                    }

                    if (!indicator.linkedParent) {
                        return error(
                            'Series ' +
                            indicator.options.linkedTo +
                            ' not found! Check `linkedTo`.',
                            false,
                            chart
                        );
                    }

                    indicator.dataEventsToUnbind.push(
                        addEvent(
                            indicator.bindTo.series ?
                                indicator.linkedParent : indicator.linkedParent.xAxis,
                            indicator.bindTo.eventName,
                            recalculateValues
                        )
                    );

                    if (indicator.calculateOn === 'init') {
                        recalculateValues();
                    } else {
                        var unbinder = addEvent(
                            indicator.chart,
                            indicator.calculateOn,
                            function () {
                                recalculateValues();
                                // Call this just once, on init
                                unbinder();
                            }
                        );
                    }

                    return indicator;
                },
                getName: function () {
                    var name = this.name,
                        params = [];

                    if (!name) {

                        (this.nameComponents || []).forEach(
                            function (component, index) {
                                params.push(
                                    this.options.params[component] +
                                    pick(this.nameSuffixes[index], '')
                                );
                            },
                            this
                        );

                        name = (this.nameBase || this.type.toUpperCase()) +
                            (this.nameComponents ? ' (' + params.join(', ') + ')' : '');
                    }

                    return name;
                },
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal.length,
                        range = 0,
                        sum = 0,
                        SMA = [],
                        xData = [],
                        yData = [],
                        index = -1,
                        i,
                        SMAPoint;

                    if (xVal.length < period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index ? params.index : 0;
                    }

                    // Accumulate first N-points
                    while (range < period - 1) {
                        sum += index < 0 ? yVal[range] : yVal[range][index];
                        range++;
                    }

                    // Calculate value one-by-one for each period in visible data
                    for (i = range; i < yValLen; i++) {
                        sum += index < 0 ? yVal[i] : yVal[i][index];

                        SMAPoint = [xVal[i], sum / period];
                        SMA.push(SMAPoint);
                        xData.push(SMAPoint[0]);
                        yData.push(SMAPoint[1]);

                        sum -= index < 0 ? yVal[i - range] : yVal[i - range][index];
                    }

                    return {
                        values: SMA,
                        xData: xData,
                        yData: yData
                    };
                },
                destroy: function () {
                    this.dataEventsToUnbind.forEach(function (unbinder) {
                        unbinder();
                    });
                    Series.prototype.destroy.call(this);
                }
            }
        );

        /**
         * A `SMA` series. If the [type](#series.sma.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.sma
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL, useOhlcData
         * @apioption series.sma
         */

    });
    _registerModule(_modules, 'indicators/accumulation-distribution.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var seriesType = H.seriesType;

        // Utils:
        function populateAverage(xVal, yVal, yValVolume, i) {
            var high = yVal[i][1],
                low = yVal[i][2],
                close = yVal[i][3],
                volume = yValVolume[i],
                adY = close === high && close === low || high === low ?
                    0 :
                    ((2 * close - low - high) / (high - low)) * volume,
                adX = xVal[i];

            return [adX, adY];
        }

        /**
         * The AD series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ad
         *
         * @augments Highcharts.Series
         */
        seriesType('ad', 'sma',
            /**
             * Accumulation Distribution (AD). This series requires `linkedTo` option to
             * be set.
             *
             * @sample stock/indicators/accumulation-distribution
             *         Accumulation/Distribution indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.ad
             */
            {
                params: {
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     *
                     * @since 6.0.0
                     */
                    volumeSeriesID: 'volume'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameComponents: false,
                nameBase: 'Accumulation/Distribution',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        volumeSeriesID = params.volumeSeriesID,
                        volumeSeries = series.chart.get(volumeSeriesID),
                        yValVolume = volumeSeries && volumeSeries.yData,
                        yValLen = yVal ? yVal.length : 0,
                        AD = [],
                        xData = [],
                        yData = [],
                        len, i, ADPoint;

                    if (xVal.length <= period && yValLen && yVal[0].length !== 4) {
                        return false;
                    }

                    if (!volumeSeries) {
                        return H.error(
                            'Series ' +
                            volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            series.chart
                        );
                    }

                    // i = period <-- skip first N-points
                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen; i++) {

                        len = AD.length;
                        ADPoint = populateAverage(xVal, yVal, yValVolume, i, period);

                        if (len > 0) {
                            ADPoint[1] += AD[len - 1][1];
                        }

                        AD.push(ADPoint);

                        xData.push(ADPoint[0]);
                        yData.push(ADPoint[1]);
                    }

                    return {
                        values: AD,
                        xData: xData,
                        yData: yData
                    };
                }
            });

        /**
         * A `AD` series. If the [type](#series.ad.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ad
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.ad
         */

    });
    _registerModule(_modules, 'indicators/ao.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var correctFloat = H.correctFloat,
            isArray = H.isArray,
            noop = H.noop;

        /**
         * The AO series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ao
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'ao',
            'sma',
            /**
             * Awesome Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`
             *
             * @sample {highstock} stock/indicators/ao
             *         Awesome
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               params, pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.ao
             */
            {
                /**
                 * Color of the Awesome oscillator series bar that is greater than the
                 * previous one. Note that if a `color` is defined, the `color`
                 * takes precedence and the `greaterBarColor` is ignored.
                 *
                 * @sample {highstock} stock/indicators/ao/
                 *         greaterBarColor
                 *
                 * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since 7.0.0
                 */
                greaterBarColor: '#06B535',
                /**
                 * Color of the Awesome oscillator series bar that is lower than the
                 * previous one. Note that if a `color` is defined, the `color`
                 * takes precedence and the `lowerBarColor` is ignored.
                 *
                 * @sample {highstock} stock/indicators/ao/
                 *         lowerBarColor
                 *
                 * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since 7.0.0
                 */
                lowerBarColor: '#F21313',
                threshold: 0,
                groupPadding: 0.2,
                pointPadding: 0.2,
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'AO',
                nameComponents: false,

                // Columns support:
                markerAttribs: noop,
                getColumnMetrics: H.seriesTypes.column.prototype.getColumnMetrics,
                crispCol: H.seriesTypes.column.prototype.crispCol,
                translate: H.seriesTypes.column.prototype.translate,
                drawPoints: H.seriesTypes.column.prototype.drawPoints,

                drawGraph: function () {
                    var indicator = this,
                        options = indicator.options,
                        points = indicator.points,
                        userColor = indicator.userOptions.color,
                        positiveColor = options.greaterBarColor,
                        negativeColor = options.lowerBarColor,
                        firstPoint = points[0],
                        i;

                    if (!userColor && firstPoint) {
                        firstPoint.color = positiveColor;

                        for (i = 1; i < points.length; i++) {
                            if (points[i].y > points[i - 1].y) {
                                points[i].color = positiveColor;
                            } else if (points[i].y < points[i - 1].y) {
                                points[i].color = negativeColor;
                            } else {
                                points[i].color = points[i - 1].color;
                            }
                        }
                    }
                },

                getValues: function (series) {
                    var shortPeriod = 5,
                        longPeriod = 34,
                        xVal = series.xData || [],
                        yVal = series.yData || [],
                        yValLen = yVal.length,
                        AO = [], // 0- date, 1- Awesome Oscillator
                        xData = [],
                        yData = [],
                        high = 1,
                        low = 2,
                        shortSum = 0,
                        longSum = 0,
                        shortSMA, // Shorter Period SMA
                        longSMA, // Longer Period SMA
                        awesome,
                        shortLastIndex,
                        longLastIndex,
                        price,
                        i,
                        j;

                    if (
                        xVal.length <= longPeriod ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    for (i = 0; i < longPeriod - 1; i++) {
                        price = (yVal[i][high] + yVal[i][low]) / 2;

                        if (i >= longPeriod - shortPeriod) {
                            shortSum = correctFloat(shortSum + price);
                        }

                        longSum = correctFloat(longSum + price);
                    }

                    for (j = longPeriod - 1; j < yValLen; j++) {
                        price = (yVal[j][high] + yVal[j][low]) / 2;
                        shortSum = correctFloat(shortSum + price);
                        longSum = correctFloat(longSum + price);

                        shortSMA = shortSum / shortPeriod;
                        longSMA = longSum / longPeriod;

                        awesome = correctFloat(shortSMA - longSMA);

                        AO.push([xVal[j], awesome]);
                        xData.push(xVal[j]);
                        yData.push(awesome);

                        shortLastIndex = j + 1 - shortPeriod;
                        longLastIndex = j + 1 - longPeriod;

                        shortSum = correctFloat(
                            shortSum -
                            (yVal[shortLastIndex][high] + yVal[shortLastIndex][low]) / 2
                        );
                        longSum = correctFloat(
                            longSum -
                            (yVal[longLastIndex][high] + yVal[longLastIndex][low]) / 2
                        );
                    }


                    return {
                        values: AO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * An `AO` series. If the [type](#series.ao.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ao
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.ao
         */

    });
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
    _registerModule(_modules, 'indicators/aroon-oscillator.src.js', [_modules['parts/Globals.js'], _modules['mixins/multipe-lines.js'], _modules['mixins/indicator-required.js']], function (H, multipleLinesMixin, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var AROON = H.seriesTypes.aroon,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The Aroon Oscillator series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.aroonoscillator
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'aroonoscillator',
            'aroon',
            /**
             * Aroon Oscillator. This series requires the `linkedTo` option to be set
             * and should be loaded after the `stock/indicators/indicators.js` and
             * `stock/indicators/aroon.js`.
             *
             * @sample {highstock} stock/indicators/aroon-oscillator
             *         Aroon Oscillator
             *
             * @extends      plotOptions.aroon
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, aroonDown, colorAxis, compare, compareBase,
             *               joinBy, keys, navigatorOptions, pointInterval,
             *               pointIntervalUnit, pointPlacement, pointRange, pointStart,
             *               showInNavigator, stacking
             * @optionparent plotOptions.aroonoscillator
             */
            {
                /**
                 * Paramters used in calculation of aroon oscillator series points.
                 *
                 * @excluding periods, index
                 */
                params: {
                    /**
                     * Period for Aroon Oscillator
                     *
                     * @since   7.0.0
                     * @product highstock
                     */
                    period: 25
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b>: {point.y}'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            H.merge(multipleLinesMixin, {
                nameBase: 'Aroon Oscillator',
                pointArrayMap: ['y'],
                pointValKey: 'y',
                linesApiNames: [],
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        AROON,
                        'aroon',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getValues: function (series, params) {
                    var ARO = [], // 0- date, 1- Aroon Oscillator
                        xData = [],
                        yData = [],
                        aroon,
                        aroonUp,
                        aroonDown,
                        oscillator,
                        i;

                    aroon = AROON.prototype.getValues.call(this, series, params);

                    for (i = 0; i < aroon.yData.length; i++) {
                        aroonUp = aroon.yData[i][0];
                        aroonDown = aroon.yData[i][1];
                        oscillator = aroonUp - aroonDown;

                        ARO.push([aroon.xData[i], oscillator]);
                        xData.push(aroon.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: ARO,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * An `Aroon Oscillator` series. If the [type](#series.aroonoscillator.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.aroonoscillator
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, aroonDown, colorAxis, compare, compareBase, dataParser,
         *            dataURL, joinBy, keys, navigatorOptions, pointInterval,
         *            pointIntervalUnit, pointPlacement, pointRange, pointStart,
         *            showInNavigator, stacking
         * @apioption series.aroonoscillator
         */

    });
    _registerModule(_modules, 'indicators/atr.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType,
            UNDEFINED;

        // Utils:
        function accumulateAverage(points, xVal, yVal, i) {
            var xValue = xVal[i],
                yValue = yVal[i];

            points.push([xValue, yValue]);
        }

        function getTR(currentPoint, prevPoint) {
            var pointY = currentPoint,
                prevY = prevPoint,
                HL = pointY[1] - pointY[2],
                HCp = prevY === UNDEFINED ? 0 : Math.abs(pointY[1] - prevY[3]),
                LCp = prevY === UNDEFINED ? 0 : Math.abs(pointY[2] - prevY[3]),
                TR = Math.max(HL, HCp, LCp);

            return TR;
        }

        function populateAverage(points, xVal, yVal, i, period, prevATR) {
            var x = xVal[i - 1],
                TR = getTR(yVal[i - 1], yVal[i - 2]),
                y;

            y = (((prevATR * (period - 1)) + TR) / period);

            return [x, y];
        }

        /**
         * The ATR series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.atr
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'atr',
            'sma',
            /**
             * Average true range indicator (ATR). This series requires `linkedTo`
             * option to be set.
             *
             * @sample stock/indicators/atr
             *         ATR indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.atr
             */
            {
                params: {
                    period: 14
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        xValue = xVal[0],
                        yValue = yVal[0],
                        range = 1,
                        prevATR = 0,
                        TR = 0,
                        ATR = [],
                        xData = [],
                        yData = [],
                        point, i, points;

                    points = [[xValue, yValue]];

                    if (
                        (xVal.length <= period) || !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    for (i = 1; i <= yValLen; i++) {

                        accumulateAverage(points, xVal, yVal, i);

                        if (period < range) {
                            point = populateAverage(
                                points,
                                xVal,
                                yVal,
                                i,
                                period,
                                prevATR
                            );
                            prevATR = point[1];
                            ATR.push(point);
                            xData.push(point[0]);
                            yData.push(point[1]);

                        } else if (period === range) {
                            prevATR = TR / (i - 1);
                            ATR.push([xVal[i - 1], prevATR]);
                            xData.push(xVal[i - 1]);
                            yData.push(prevATR);
                            range++;
                        } else {
                            TR += getTR(yVal[i - 1], yVal[i - 2]);
                            range++;
                        }
                    }

                    return {
                        values: ATR,
                        xData: xData,
                        yData: yData
                    };
                }

            }
        );

        /**
         * A `ATR` series. If the [type](#series.atr.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.atr
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.atr
         */

    });
    _registerModule(_modules, 'indicators/bollinger-bands.src.js', [_modules['parts/Globals.js'], _modules['mixins/multipe-lines.js']], function (H, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var merge = H.merge,
            isArray = H.isArray,
            SMA = H.seriesTypes.sma;

        // Utils:
        function getStandardDeviation(arr, index, isOHLC, mean) {
            var variance = 0,
                arrLen = arr.length,
                std = 0,
                i = 0,
                value;

            for (; i < arrLen; i++) {
                value = (isOHLC ? arr[i][index] : arr[i]) - mean;
                variance += value * value;
            }
            variance = variance / (arrLen - 1);

            std = Math.sqrt(variance);
            return std;
        }

        /**
         * Bollinger Bands series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.bb
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'bb',
            'sma',
            /**
             * Bollinger bands (BB). This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/bollinger-bands
             *         Bollinger bands
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.bb
             */
            {
                params: {
                    period: 20,
                    /**
                     * Standard deviation for top and bottom bands.
                     */
                    standardDeviation: 2,
                    index: 3
                },
                /**
                 * Bottom line options.
                 */
                bottomLine: {
                    /**
                     * Styles for a bottom line.
                     */
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * [plotOptions.bb.color](#plotOptions.bb.color).
                         *
                         * @type  {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                /**
                 * Top line options.
                 *
                 * @extends plotOptions.bb.bottomLine
                 */
                topLine: {
                    styles: {
                        lineWidth: 1,
                        /**
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'
                },
                marker: {
                    enabled: false
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            H.merge(multipleLinesMixin, {
                pointArrayMap: ['top', 'middle', 'bottom'],
                pointValKey: 'middle',
                nameComponents: ['period', 'standardDeviation'],
                linesApiNames: ['topLine', 'bottomLine'],
                init: function () {
                    SMA.prototype.init.apply(this, arguments);

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
                },
                getValues: function (series, params) {
                    var period = params.period,
                        standardDeviation = params.standardDeviation,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        BB = [], // 0- date, 1-middle line, 2-top line, 3-bottom line
                        ML, TL, BL, // middle line, top line and bottom line
                        date,
                        xData = [],
                        yData = [],
                        slicedX,
                        slicedY,
                        stdDev,
                        isOHLC,
                        point,
                        i;

                    if (xVal.length < period) {
                        return false;
                    }

                    isOHLC = isArray(yVal[0]);

                    for (i = period; i <= yValLen; i++) {
                        slicedX = xVal.slice(i - period, i);
                        slicedY = yVal.slice(i - period, i);

                        point = SMA.prototype.getValues.call(
                            this,
                            {
                                xData: slicedX,
                                yData: slicedY
                            },
                            params
                        );

                        date = point.xData[0];
                        ML = point.yData[0];
                        stdDev = getStandardDeviation(
                            slicedY,
                            params.index,
                            isOHLC,
                            ML
                        );
                        TL = ML + standardDeviation * stdDev;
                        BL = ML - standardDeviation * stdDev;

                        BB.push([date, TL, ML, BL]);
                        xData.push(date);
                        yData.push([TL, ML, BL]);
                    }

                    return {
                        values: BB,
                        xData: xData,
                        yData: yData
                    };
                }
            })
        );

        /**
         * A bollinger bands indicator. If the [type](#series.bb.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.bb
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.bb
         */

    });
    _registerModule(_modules, 'indicators/cci.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType;

        // Utils:
        function sumArray(array) {
            return array.reduce(function (prev, cur) {
                return prev + cur;
            }, 0);
        }

        function meanDeviation(arr, sma) {
            var len = arr.length,
                sum = 0,
                i;

            for (i = 0; i < len; i++) {
                sum += Math.abs(sma - (arr[i]));
            }

            return sum;
        }

        /**
         * The CCI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.cci
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'cci',
            'sma',
            /**
             * Commodity Channel Index (CCI). This series requires `linkedTo` option to
             * be set.
             *
             * @sample stock/indicators/cci
             *         CCI indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.cci
             */
            {
                params: {
                    period: 14
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        TP = [],
                        periodTP = [],
                        range = 1,
                        CCI = [],
                        xData = [],
                        yData = [],
                        CCIPoint, p, len, smaTP, TPtemp, meanDev, i;

                    // CCI requires close value
                    if (
                        xVal.length <= period ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    // accumulate first N-points
                    while (range < period) {
                        p = yVal[range - 1];
                        TP.push((p[1] + p[2] + p[3]) / 3);
                        range++;
                    }

                    for (i = period; i <= yValLen; i++) {

                        p = yVal[i - 1];
                        TPtemp = (p[1] + p[2] + p[3]) / 3;
                        len = TP.push(TPtemp);
                        periodTP = TP.slice(len - period);

                        smaTP = sumArray(periodTP) / period;
                        meanDev = meanDeviation(periodTP, smaTP) / period;

                        CCIPoint = ((TPtemp - smaTP) / (0.015 * meanDev));

                        CCI.push([xVal[i - 1], CCIPoint]);
                        xData.push(xVal[i - 1]);
                        yData.push(CCIPoint);
                    }

                    return {
                        values: CCI,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `CCI` series. If the [type](#series.cci.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.cci
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.cci
         */

    });
    _registerModule(_modules, 'indicators/cmf.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Highsoft AS
         *
         *  Author: Sebastian Domas
         *
         *  Chaikin Money Flow indicator for Highstock
         *
         *  License: www.highcharts.com/license
         *
         * */

        /**
         * @private
         * @interface Highcharts.CmfValuesObject
         *//**
         * Combined xData and yData values into a tuple.
         * @name Highcharts.CmfValuesObject#values
         * @type {Array<Array<number,number>>}
         *//**
         * Values represent x timestamp values
         * @name Highcharts.CmfValuesObject#xData
         * @type {Array<number>}
         *//**
         * Values represent y values
         * @name Highcharts.CmfValuesObject#yData
         * @type {Array<number>}
         */



        /**
         * The CMF series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.cmf
         *
         * @augments Highcharts.Series
         */
        H.seriesType('cmf', 'sma',
            /**
             * Chaikin Money Flow indicator (cmf).
             *
             * @sample stock/indicators/cmf/
             *         Chaikin Money Flow indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @excluding    animationLimit
             * @product      highstock
             * @optionparent plotOptions.cmf
             */
            {
                params: {
                    period: 14,
                    /**
                     * The id of another series to use its data as volume data for the
                     * indiator calculation.
                     */
                    volumeSeriesID: 'volume'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Chaikin Money Flow',
                /**
                 * Checks if the series and volumeSeries are accessible, number of
                 * points.x is longer than period, is series has OHLC data
                 * @private
                 * @return {boolean} True if series is valid and can be computed,
                 * otherwise false.
                 */
                isValid: function () {
                    var chart = this.chart,
                        options = this.options,
                        series = this.linkedParent,
                        volumeSeries = (
                            this.volumeSeries ||
                            (
                                this.volumeSeries =
                                chart.get(options.params.volumeSeriesID)
                            )
                        ),
                        isSeriesOHLC = (
                            series &&
                            series.yData &&
                            series.yData[0].length === 4
                        );

                    function isLengthValid(serie) {
                        return serie.xData &&
                            serie.xData.length >= options.params.period;
                    }

                    return !!(
                        series &&
                        volumeSeries &&
                        isLengthValid(series) &&
                        isLengthValid(volumeSeries) && isSeriesOHLC
                    );
                },

                /**
                 * Returns indicator's data.
                 * @private
                 * @return {boolean|Highcharts.CmfValuesObject} Returns false if the
                 * indicator is not valid, otherwise returns Values object.
                 */
                getValues: function (series, params) {
                    if (!this.isValid()) {
                        return false;
                    }

                    return this.getMoneyFlow(
                        series.xData,
                        series.yData,
                        this.volumeSeries.yData,
                        params.period
                    );
                },

                /**
                 * @private
                 * @param {Array<number>} xData - x timestamp values
                 * @param {Array<number>} seriesYData - yData of basic series
                 * @param {Array<number>} volumeSeriesYData - yData of volume series
                 * @param {number} period - indicator's param
                 * @return {Highcharts.CmfValuesObject} object containing computed money
                 * flow data
                 */
                getMoneyFlow: function (xData, seriesYData, volumeSeriesYData, period) {
                    var len = seriesYData.length,
                        moneyFlowVolume = [],
                        sumVolume = 0,
                        sumMoneyFlowVolume = 0,
                        moneyFlowXData = [],
                        moneyFlowYData = [],
                        values = [],
                        i,
                        point,
                        nullIndex = -1;

                    /**
                     * Calculates money flow volume, changes i, nullIndex vars from
                     * upper scope!
                     * @private
                     * @param {Array<number>} ohlc - OHLC point
                     * @param {number} volume - Volume point's y value
                     * @return {number} - volume * moneyFlowMultiplier
                     **/
                    function getMoneyFlowVolume(ohlc, volume) {
                        var high = ohlc[1],
                            low = ohlc[2],
                            close = ohlc[3],

                            isValid =
                                volume !== null &&
                                high !== null &&
                                low !== null &&
                                close !== null &&
                                high !== low;


                        /**
                         * @private
                         * @param {number} h - High value
                         * @param {number} l - Low value
                         * @param {number} c - Close value
                         * @return {number} calculated multiplier for the point
                         **/
                        function getMoneyFlowMultiplier(h, l, c) {
                            return ((c - l) - (h - c)) / (h - l);
                        }

                        return isValid ?
                            getMoneyFlowMultiplier(high, low, close) * volume :
                            ((nullIndex = i), null);
                    }


                    if (period > 0 && period <= len) {
                        for (i = 0; i < period; i++) {
                            moneyFlowVolume[i] = getMoneyFlowVolume(
                                seriesYData[i],
                                volumeSeriesYData[i]
                            );
                            sumVolume += volumeSeriesYData[i];
                            sumMoneyFlowVolume += moneyFlowVolume[i];
                        }

                        moneyFlowXData.push(xData[i - 1]);
                        moneyFlowYData.push(
                            i - nullIndex >= period && sumVolume !== 0 ?
                                sumMoneyFlowVolume / sumVolume :
                                null
                        );
                        values.push([moneyFlowXData[0], moneyFlowYData[0]]);

                        for (; i < len; i++) {
                            moneyFlowVolume[i] = getMoneyFlowVolume(
                                seriesYData[i],
                                volumeSeriesYData[i]
                            );

                            sumVolume -= volumeSeriesYData[i - period];
                            sumVolume += volumeSeriesYData[i];

                            sumMoneyFlowVolume -= moneyFlowVolume[i - period];
                            sumMoneyFlowVolume += moneyFlowVolume[i];

                            point = [
                                xData[i],
                                i - nullIndex >= period ?
                                    sumMoneyFlowVolume / sumVolume :
                                    null
                            ];

                            moneyFlowXData.push(point[0]);
                            moneyFlowYData.push(point[1]);
                            values.push([point[0], point[1]]);
                        }
                    }

                    return {
                        values: values,
                        xData: moneyFlowXData,
                        yData: moneyFlowYData
                    };
                }
            });

        /**
         * A `CMF` series. If the [type](#series.cmf.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.cmf
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.cmf
         */

    });
    _registerModule(_modules, 'indicators/dpo.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var correctFloat = H.correctFloat,
            pick = H.pick;

        // Utils
        function accumulatePoints(sum, yVal, i, index, subtract) {
            var price = pick(yVal[i][index], yVal[i]);

            if (subtract) {
                return correctFloat(sum - price);
            }
            return correctFloat(sum + price);
        }

        /**
         * The DPO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dpo
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'dpo',
            'sma',
            /**
             * Detrended Price Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/dpo
             *         Detrended Price Oscillator
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.dpo
             */
            {
                /**
                 * Parameters used in calculation of Detrended Price Oscillator series
                 * points.
                 */
                params: {
                    /**
                     * Period for Detrended Price Oscillator
                     */
                    period: 21
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'DPO',
                getValues: function (series, params) {
                    var period = params.period,
                        index = params.index,
                        offset = Math.floor(period / 2 + 1),
                        range = period + offset,
                        xVal = series.xData || [],
                        yVal = series.yData || [],
                        yValLen = yVal.length,
                        DPO = [], // 0- date, 1- Detrended Price Oscillator
                        xData = [],
                        yData = [],
                        sum = 0,
                        oscillator,
                        periodIndex,
                        rangeIndex,
                        price,
                        i,
                        j;

                    if (xVal.length <= range) {
                        return false;
                    }

                    // Accumulate first N-points for SMA
                    for (i = 0; i < period - 1; i++) {
                        sum = accumulatePoints(sum, yVal, i, index);
                    }

                    // Detrended Price Oscillator formula:
                    // DPO = Price - Simple moving average [from (n / 2 + 1) days ago]

                    for (j = 0; j <= yValLen - range; j++) {
                        periodIndex = j + period - 1;
                        rangeIndex = j + range - 1;

                        // adding the last period point
                        sum = accumulatePoints(sum, yVal, periodIndex, index);
                        price = pick(yVal[rangeIndex][index], yVal[rangeIndex]);

                        oscillator = price - sum / period;

                        // substracting the first period point
                        sum = accumulatePoints(sum, yVal, j, index, true);

                        DPO.push([xVal[rangeIndex], oscillator]);
                        xData.push(xVal[rangeIndex]);
                        yData.push(oscillator);
                    }

                    return {
                        values: DPO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A Detrended Price Oscillator. If the [type](#series.dpo.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dpo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.dpo
         */

    });
    _registerModule(_modules, 'indicators/ema.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType,
            correctFloat = H.correctFloat;

        /**
         * The EMA series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ema
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'ema',
            'sma',
            /**
             * Exponential moving average indicator (EMA). This series requires the
             * `linkedTo` option to be set.
             *
             * @sample stock/indicators/ema
             *         Exponential moving average indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.ema
             */
            {
                params: {
                    /**
                     * The point index which indicator calculations will base. For
                     * example using OHLC data, index=2 means the indicator will be
                     * calculated using Low values.
                     *
                     * By default index value used to be set to 0. Since Highstock 7
                     * by default index is set to 3 which means that the ema
                     * indicator will be calculated using Close values.
                     */
                    index: 3,
                    period: 9 // @merge 14 in v6.2
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                accumulatePeriodPoints: function (
                    period,
                    index,
                    yVal
                ) {
                    var sum = 0,
                        i = 0,
                        y = 0;

                    while (i < period) {
                        y = index < 0 ? yVal[i] : yVal[i][index];
                        sum = sum + y;
                        i++;
                    }

                    return sum;
                },
                calculateEma: function (
                    xVal,
                    yVal,
                    i,
                    EMApercent,
                    calEMA,
                    index,
                    SMA
                ) {
                    var x = xVal[i - 1],
                        yValue = index < 0 ? yVal[i - 1] : yVal[i - 1][index],
                        y;

                    y = calEMA === undefined ?
                        SMA : correctFloat((yValue * EMApercent) +
                        (calEMA * (1 - EMApercent)));

                    return [x, y];
                },
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        EMApercent = 2 / (period + 1),
                        sum = 0,
                        EMA = [],
                        xData = [],
                        yData = [],
                        index = -1,
                        SMA = 0,
                        calEMA,
                        EMAPoint,
                        i;

                    // Check period, if bigger than points length, skip
                    if (yValLen < period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index ? params.index : 0;
                    }

                    // Accumulate first N-points
                    sum = this.accumulatePeriodPoints(
                        period,
                        index,
                        yVal
                    );

                    // first point
                    SMA = sum / period;

                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen + 1; i++) {
                        EMAPoint = this.calculateEma(
                            xVal,
                            yVal,
                            i,
                            EMApercent,
                            calEMA,
                            index,
                            SMA
                        );
                        EMA.push(EMAPoint);
                        xData.push(EMAPoint[0]);
                        yData.push(EMAPoint[1]);
                        calEMA = EMAPoint[1];
                    }

                    return {
                        values: EMA,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `EMA` series. If the [type](#series.ema.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ema
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.ema
         */

    });
    _registerModule(_modules, 'indicators/chaikin.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var EMA = H.seriesTypes.ema,
            AD = H.seriesTypes.ad,
            error = H.error,
            correctFloat = H.correctFloat,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The Chaikin series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.chaikin
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'chaikin',
            'ema',
            /**
             * Chaikin Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`
             * and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/chaikin
             *         Chaikin Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.chaikin
             */
            {
                /**
                 * Paramters used in calculation of Chaikin Oscillator
                 * series points.
                 *
                 * @excluding index, period
                 */
                params: {
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume',
                    /**
                     * Periods for Chaikin Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [3, 10]
                     */
                    periods: [3, 10]
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Chaikin Osc',
                nameComponents: ['periods'],
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMA,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getValues: function (series, params) {
                    var periods = params.periods,
                        period = params.period,
                        ADL, // Accumulation Distribution Line data
                        CHA = [], // 0- date, 1- Chaikin Oscillator
                        xData = [],
                        yData = [],
                        periodsOffset,
                        SPE, // Shorter Period EMA
                        LPE, // Longer Period EMA
                        oscillator,
                        i;

                    // Check if periods are correct
                    if (periods.length !== 2 || periods[1] <= periods[0]) {
                        error(
                            'Error: "Chaikin requires two periods. Notice, first ' +
                            'period should be lower than the second one."'
                        );
                        return false;
                    }

                    ADL = AD.prototype.getValues.call(this, series, {
                        volumeSeriesID: params.volumeSeriesID,
                        period: period
                    });

                    // Check if adl is calculated properly, if not skip
                    if (!ADL) {
                        return false;
                    }

                    SPE = EMA.prototype.getValues.call(this, ADL, {
                        period: periods[0]
                    });

                    LPE = EMA.prototype.getValues.call(this, ADL, {
                        period: periods[1]
                    });

                    // Check if ema is calculated properly, if not skip
                    if (!SPE || !LPE) {
                        return false;
                    }

                    periodsOffset = periods[1] - periods[0];

                    for (i = 0; i < LPE.yData.length; i++) {
                        oscillator = correctFloat(
                            SPE.yData[i + periodsOffset] - LPE.yData[i]
                        );

                        CHA.push([LPE.xData[i], oscillator]);
                        xData.push(LPE.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: CHA,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Chaikin Oscillator` series. If the [type](#series.chaikin.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.chaikin
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, stacking, showInNavigator
         * @apioption series.chaikin
         */

    });
    _registerModule(_modules, 'indicators/dema.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            EMAindicator = H.seriesTypes.ema,
            requiredIndicator = requiredIndicatorMixin,
            correctFloat = H.correctFloat;

        /**
         * The DEMA series Type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.dema
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'dema',
            'ema',
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/dema
             *         DEMA indicator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.dema
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMAindicator,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getEMA: function (
                    yVal,
                    prevEMA,
                    SMA,
                    index,
                    i,
                    xVal
                ) {

                    return EMAindicator.prototype.calculateEma(
                        xVal || [],
                        yVal,
                        i === undefined ? 1 : i,
                        this.chart.series[0].EMApercent,
                        prevEMA,
                        index === undefined ? -1 : index,
                        SMA
                    );
                },
                getValues: function (series, params) {
                    var period = params.period,
                        doubledPeriod = 2 * period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        index = -1,
                        accumulatePeriodPoints = 0,
                        SMA = 0,
                        DEMA = [],
                        xDataDema = [],
                        yDataDema = [],
                        EMA = 0,
                        // EMA(EMA)
                        EMAlevel2,
                        // EMA of previous point
                        prevEMA,
                        prevEMAlevel2,
                        // EMA values array
                        EMAvalues = [],
                        i,
                        DEMAPoint;

                    series.EMApercent = (2 / (period + 1));

                    // Check period, if bigger than EMA points length, skip
                    if (yValLen < 2 * period - 1) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index ? params.index : 0;
                    }

                    // Accumulate first N-points
                    accumulatePeriodPoints =
                        EMAindicator.prototype.accumulatePeriodPoints(
                            period,
                            index,
                            yVal
                        );

                    // first point
                    SMA = accumulatePeriodPoints / period;
                    accumulatePeriodPoints = 0;

                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen + 2; i++) {
                        if (i < yValLen + 1) {
                            EMA = this.getEMA(
                                yVal,
                                prevEMA,
                                SMA,
                                index,
                                i
                            )[1];
                            EMAvalues.push(EMA);
                        }
                        prevEMA = EMA;

                        // Summing first period points for EMA(EMA)
                        if (i < doubledPeriod) {
                            accumulatePeriodPoints += EMA;
                        } else {
                            // Calculate DEMA
                            // First DEMA point
                            if (i === doubledPeriod) {
                                SMA = accumulatePeriodPoints / period;
                            }
                            EMA = EMAvalues[i - period - 1];
                            EMAlevel2 = this.getEMA(
                                [EMA],
                                prevEMAlevel2,
                                SMA
                            )[1];
                            DEMAPoint = [
                                xVal[i - 2],
                                correctFloat(2 * EMA - EMAlevel2)
                            ];
                            DEMA.push(DEMAPoint);
                            xDataDema.push(DEMAPoint[0]);
                            yDataDema.push(DEMAPoint[1]);
                            prevEMAlevel2 = EMAlevel2;
                        }
                    }

                    return {
                        values: DEMA,
                        xData: xDataDema,
                        yData: yDataDema
                    };
                }
            }
        );

        /**
         * A `DEMA` series. If the [type](#series.ema.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.dema
         */

    });
    _registerModule(_modules, 'indicators/tema.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            EMAindicator = H.seriesTypes.ema,
            requiredIndicator = requiredIndicatorMixin,
            correctFloat = H.correctFloat;

        /**
         * The TEMA series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.tema
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'tema',
            'ema',
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * Requires `https://code.highcharts.com/stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/tema
             *         TEMA indicator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.tema
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMAindicator,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getEMA: function (
                    yVal,
                    prevEMA,
                    SMA,
                    index,
                    i,
                    xVal
                ) {
                    return EMAindicator.prototype.calculateEma(
                        xVal || [],
                        yVal,
                        i === undefined ? 1 : i,
                        this.chart.series[0].EMApercent,
                        prevEMA,
                        index === undefined ? -1 : index,
                        SMA
                    );
                },
                getPoint: function (
                    xVal,
                    tripledPeriod,
                    EMAlevels,
                    i
                ) {
                    var TEMAPoint = [
                        xVal[i - 3],
                        correctFloat(
                            3 * EMAlevels.level1 -
                            3 * EMAlevels.level2 + EMAlevels.level3
                        )
                    ];

                    return TEMAPoint;
                },
                getValues: function (series, params) {
                    var period = params.period,
                        doubledPeriod = 2 * period,
                        tripledPeriod = 3 * period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        index = -1,
                        accumulatePeriodPoints = 0,
                        SMA = 0,
                        TEMA = [],
                        xDataTema = [],
                        yDataTema = [],
                        // EMA of previous point
                        prevEMA,
                        prevEMAlevel2,
                        // EMA values array
                        EMAvalues = [],
                        EMAlevel2values = [],
                        i,
                        TEMAPoint,
                        // This object contains all EMA EMAlevels calculated like below
                        // EMA = level1
                        // EMA(EMA) = level2,
                        // EMA(EMA(EMA)) = level3,
                        EMAlevels = {};

                    series.EMApercent = (2 / (period + 1));

                    // Check period, if bigger than EMA points length, skip
                    if (yValLen < 3 * period - 2) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index ? params.index : 0;
                    }

                    // Accumulate first N-points
                    accumulatePeriodPoints =
                      EMAindicator.prototype.accumulatePeriodPoints(
                          period,
                          index,
                          yVal
                      );

                    // first point
                    SMA = accumulatePeriodPoints / period;
                    accumulatePeriodPoints = 0;

                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen + 3; i++) {
                        if (i < yValLen + 1) {
                            EMAlevels.level1 = this.getEMA(
                                yVal,
                                prevEMA,
                                SMA,
                                index,
                                i
                            )[1];
                            EMAvalues.push(EMAlevels.level1);
                        }
                        prevEMA = EMAlevels.level1;

                        // Summing first period points for ema(ema)
                        if (i < doubledPeriod) {
                            accumulatePeriodPoints += EMAlevels.level1;
                        } else {
                            // Calculate dema
                            // First dema point
                            if (i === doubledPeriod) {
                                SMA = accumulatePeriodPoints / period;
                                accumulatePeriodPoints = 0;
                            }
                            EMAlevels.level1 = EMAvalues[i - period - 1];
                            EMAlevels.level2 = this.getEMA(
                                [EMAlevels.level1],
                                prevEMAlevel2,
                                SMA
                            )[1];
                            EMAlevel2values.push(EMAlevels.level2);
                            prevEMAlevel2 = EMAlevels.level2;
                            // Summing first period points for ema(ema(ema))
                            if (i < tripledPeriod) {
                                accumulatePeriodPoints += EMAlevels.level2;
                            } else {
                                // Calculate tema
                                // First tema point
                                if (i === tripledPeriod) {
                                    SMA = accumulatePeriodPoints / period;
                                }
                                if (i === yValLen + 1) {
                                    // Calculate the last ema and emaEMA points
                                    EMAlevels.level1 = EMAvalues[i - period - 1];
                                    EMAlevels.level2 = this.getEMA(
                                        [EMAlevels.level1],
                                        prevEMAlevel2,
                                        SMA
                                    )[1];
                                    EMAlevel2values.push(EMAlevels.level2);
                                }
                                EMAlevels.level1 = EMAvalues[i - period - 2];
                                EMAlevels.level2 = EMAlevel2values[i - 2 * period - 1];
                                EMAlevels.level3 = this.getEMA(
                                    [EMAlevels.level2],
                                    EMAlevels.prevLevel3,
                                    SMA
                                )[1];
                                TEMAPoint = this.getPoint(
                                    xVal,
                                    tripledPeriod,
                                    EMAlevels,
                                    i
                                );
                                // Make sure that point exists (for TRIX oscillator)
                                if (TEMAPoint) {
                                    TEMA.push(TEMAPoint);
                                    xDataTema.push(TEMAPoint[0]);
                                    yDataTema.push(TEMAPoint[1]);
                                }
                                EMAlevels.prevLevel3 = EMAlevels.level3;
                            }
                        }
                    }

                    return {
                        values: TEMA,
                        xData: xDataTema,
                        yData: yDataTema
                    };
                }
            }
        );

        /**
         * A `TEMA` series. If the [type](#series.ema.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.tema
         */

    });
    _registerModule(_modules, 'indicators/trix.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicator) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var correctFloat = H.correctFloat,
            TEMA = H.seriesTypes.tema;

        /**
         * The TRIX series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.trix
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'trix',
            'tema',
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set.
             *
             * Requires https://code.highcharts.com/stock/indicators/ema.js
             * and https://code.highcharts.com/stock/indicators/tema.js.
             *
             * @sample {highstock} stock/indicators/trix
             *         TRIX indicator
             *
             * @extends      plotOptions.tema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @optionparent plotOptions.trix
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        TEMA,
                        'tema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getPoint: function (
                    xVal,
                    tripledPeriod,
                    EMAlevels,
                    i
                ) {
                    if (i > tripledPeriod) {
                        var TRIXPoint = [
                            xVal[i - 3],
                            EMAlevels.prevLevel3 !== 0 ?
                                correctFloat(EMAlevels.level3 - EMAlevels.prevLevel3) /
                              EMAlevels.prevLevel3 * 100 : null
                        ];
                    }

                    return TRIXPoint;
                }
            }
        );

        /**
         * A `TRIX` series. If the [type](#series.tema.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.tema
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.trix
         */

    });
    _registerModule(_modules, 'indicators/apo.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var EMA = H.seriesTypes.ema,
            error = H.error,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The APO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.apo
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'apo',
            'ema',
            /**
             * Absolute Price Oscillator. This series requires the `linkedTo` option to
             * be set and should be loaded after the `stock/indicators/indicators.js`
             * and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/apo
             *         Absolute Price Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.apo
             */
            {
                /**
                 * Paramters used in calculation of Absolute Price Oscillator
                 * series points.
                 *
                 * @excluding period
                 */
                params: {
                    /**
                     * Periods for Absolute Price Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [10, 20]
                     * @since   7.0.0
                     */
                    periods: [10, 20]
                }
            },
            /**
             * @lends Highcharts.Series.prototype
             */
            {
                nameBase: 'APO',
                nameComponents: ['periods'],
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMA,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getValues: function (series, params) {
                    var periods = params.periods,
                        index = params.index,
                        APO = [], // 0- date, 1- Absolute price oscillator
                        xData = [],
                        yData = [],
                        periodsOffset,
                        SPE, // Shorter Period EMA
                        LPE, // Longer Period EMA
                        oscillator,
                        i;

                    // Check if periods are correct
                    if (periods.length !== 2 || periods[1] <= periods[0]) {
                        error(
                            'Error: "APO requires two periods. Notice, first period ' +
                            'should be lower than the second one."'
                        );
                        return false;
                    }

                    SPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[0]
                    });

                    LPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[1]
                    });

                    // Check if ema is calculated properly, if not skip
                    if (!SPE || !LPE) {
                        return false;
                    }

                    periodsOffset = periods[1] - periods[0];

                    for (i = 0; i < LPE.yData.length; i++) {
                        oscillator = SPE.yData[i + periodsOffset] - LPE.yData[i];

                        APO.push([LPE.xData[i], oscillator]);
                        xData.push(LPE.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: APO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * An `Absolute Price Oscillator` series. If the [type](#series.apo.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.apo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.apo
         */

    });
    _registerModule(_modules, 'indicators/ichimoku-kinko-hyo.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var UNDEFINED,
            seriesType = H.seriesType,
            merge = H.merge,
            color = H.color,
            isArray = H.isArray,
            defined = H.defined,
            SMA = H.seriesTypes.sma;

        // Utils:
        function maxHigh(arr) {
            return arr.reduce(function (max, res) {
                return Math.max(max, res[1]);
            }, -Infinity);
        }

        function minLow(arr) {
            return arr.reduce(function (min, res) {
                return Math.min(min, res[2]);
            }, Infinity);
        }

        function highlowLevel(arr) {
            return {
                high: maxHigh(arr),
                low: minLow(arr)
            };
        }

        function getClosestPointRange(axis) {
            var closestDataRange,
                loopLength,
                distance,
                xData,
                i;

            axis.series.forEach(function (series) {

                if (series.xData) {
                    xData = series.xData;
                    loopLength = series.xIncrement ? 1 : xData.length - 1;

                    for (i = loopLength; i > 0; i--) {
                        distance = xData[i] - xData[i - 1];
                        if (
                            closestDataRange === UNDEFINED ||
                            distance < closestDataRange
                        ) {
                            closestDataRange = distance;
                        }
                    }
                }
            });

            return closestDataRange;
        }

        // Check two lines intersection (line a1-a2 and b1-b2)
        // Source: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        function checkLineIntersection(a1, a2, b1, b2) {
            if (a1 && a2 && b1 && b2) {

                var saX = a2.plotX - a1.plotX, // Auxiliary section a2-a1 X
                    saY = a2.plotY - a1.plotY, // Auxiliary section a2-a1 Y
                    sbX = b2.plotX - b1.plotX, // Auxiliary section b2-b1 X
                    sbY = b2.plotY - b1.plotY, // Auxiliary section b2-b1 Y
                    sabX = a1.plotX - b1.plotX, // Auxiliary section a1-b1 X
                    sabY = a1.plotY - b1.plotY, // Auxiliary section a1-b1 Y

                    // First degree Bézier parameters
                    u,
                    t;

                u = (-saY * sabX + saX * sabY) / (-sbX * saY + saX * sbY);
                t = (sbX * sabY - sbY * sabX) / (-sbX * saY + saX * sbY);

                if (u >= 0 && u <= 1 && t >= 0 && t <= 1) {
                    return {
                        plotX: a1.plotX + (t * saX),
                        plotY: a1.plotY + (t * saY)
                    };
                }
            }

            return false;
        }

        // Parameter opt (indicator options object) include indicator, points,
        // nextPoints, color, options, gappedExtend and graph properties
        function drawSenkouSpan(opt) {
            var indicator = opt.indicator;

            indicator.points = opt.points;
            indicator.nextPoints = opt.nextPoints;
            indicator.color = opt.color;
            indicator.options = merge(opt.options.senkouSpan.styles, opt.gap);
            indicator.graph = opt.graph;
            indicator.fillGraph = true;
            SMA.prototype.drawGraph.call(indicator);
        }


        // Data integrity in Ichimoku is different than default "averages":
        // Point: [undefined, value, value, ...] is correct
        // Point: [undefined, undefined, undefined, ...] is incorrect
        H.approximations['ichimoku-averages'] = function () {
            var ret = [],
                isEmptyRange;

            [].forEach.call(arguments, function (arr, i) {
                ret.push(H.approximations.average(arr));
                isEmptyRange = !isEmptyRange && ret[i] === undefined;
            });

            // Return undefined when first elem. is undefined and let
            // sum method handle null (#7377)
            return isEmptyRange ? undefined : ret;
        };

        /**
         * The IKH series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ikh
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'ikh',
            'sma',
            /**
             * Ichimoku Kinko Hyo (IKH). This series requires `linkedTo` option to be
             * set.
             *
             * @sample stock/indicators/ichimoku-kinko-hyo
             *         Ichimoku Kinko Hyo indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @product      highstock
             * @optionparent plotOptions.ikh
             */
            {
                params: {
                    period: 26,
                    /**
                     * The base period for Tenkan calculations.
                     */
                    periodTenkan: 9,
                    /**
                     * The base period for Senkou Span B calculations
                     */
                    periodSenkouSpanB: 52
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                        'TENKAN SEN: {point.tenkanSen:.3f}<br/>' +
                        'KIJUN SEN: {point.kijunSen:.3f}<br/>' +
                        'CHIKOU SPAN: {point.chikouSpan:.3f}<br/>' +
                        'SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>' +
                        'SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'
                },
                /**
                 * The styles for Tenkan line
                 */
                tenkanLine: {
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
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for Kijun line
                 */
                kijunLine: {
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
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for Chikou line
                 */
                chikouLine: {
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
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for Senkou Span A line
                 */
                senkouSpanA: {
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
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for Senkou Span B line
                 */
                senkouSpanB: {
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
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for area between Senkou Span A and B.
                 */
                senkouSpan: {
                    /**
                    * Color of the area between Senkou Span A and B,
                    * when Senkou Span A is above Senkou Span B. Note that if
                    * a `style.fill` is defined, the `color` takes precedence and
                    * the `style.fill` is ignored.
                    *
                    * @see [senkouSpan.styles.fill](#series.ikh.senkouSpan.styles.fill)
                    *
                    * @sample stock/indicators/ichimoku-kinko-hyo
                    *         Ichimoku Kinko Hyo color
                    *
                    * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                    * @since     7.0.0
                    * @apioption plotOptions.ikh.senkouSpan.color
                    */

                    /**
                    * Color of the area between Senkou Span A and B,
                    * when Senkou Span A is under Senkou Span B.
                    *
                    * @sample stock/indicators/ikh-negative-color
                    *         Ichimoku Kinko Hyo negativeColor
                    *
                    * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                    * @since     7.0.0
                    * @apioption plotOptions.ikh.senkouSpan.negativeColor
                    */

                    styles: {
                        /**
                         * Color of the area between Senkou Span A and B.
                         *
                         * @deprecated
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        fill: 'rgba(255, 0, 0, 0.5)'
                    }
                },
                dataGrouping: {
                    approximation: 'ichimoku-averages'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                pointArrayMap: [
                    'tenkanSen',
                    'kijunSen',
                    'chikouSpan',
                    'senkouSpanA',
                    'senkouSpanB'
                ],
                pointValKey: 'tenkanSen',
                nameComponents: ['periodSenkouSpanB', 'period', 'periodTenkan'],
                init: function () {
                    SMA.prototype.init.apply(this, arguments);

                    // Set default color for lines:
                    this.options = merge({
                        tenkanLine: {
                            styles: {
                                lineColor: this.color
                            }
                        },
                        kijunLine: {
                            styles: {
                                lineColor: this.color
                            }
                        },
                        chikouLine: {
                            styles: {
                                lineColor: this.color
                            }
                        },
                        senkouSpanA: {
                            styles: {
                                lineColor: this.color,
                                fill: color(this.color).setOpacity(0.5).get()
                            }
                        },
                        senkouSpanB: {
                            styles: {
                                lineColor: this.color,
                                fill: color(this.color).setOpacity(0.5).get()
                            }
                        },
                        senkouSpan: {
                            styles: {
                                fill: color(this.color).setOpacity(0.2).get()
                            }
                        }
                    }, this.options);
                },
                toYData: function (point) {
                    return [
                        point.tenkanSen,
                        point.kijunSen,
                        point.chikouSpan,
                        point.senkouSpanA,
                        point.senkouSpanB
                    ];
                },
                translate: function () {
                    var indicator = this;

                    SMA.prototype.translate.apply(indicator);

                    indicator.points.forEach(function (point) {
                        indicator.pointArrayMap.forEach(function (value) {
                            if (defined(point[value])) {
                                point['plot' + value] = indicator.yAxis.toPixels(
                                    point[value],
                                    true
                                );

                                // Add extra parameters for support tooltip in moved
                                // lines
                                point.plotY = point['plot' + value];
                                point.tooltipPos = [point.plotX, point['plot' + value]];
                                point.isNull = false;
                            }
                        });
                    });
                },
                // One does not simply
                // Render five lines
                // And an arearange
                // In just one series..
                drawGraph: function () {

                    var indicator = this,
                        mainLinePoints = indicator.points,
                        pointsLength = mainLinePoints.length,
                        mainLineOptions = indicator.options,
                        mainLinePath = indicator.graph,
                        mainColor = indicator.color,
                        gappedExtend = {
                            options: {
                                gapSize: mainLineOptions.gapSize
                            }
                        },
                        pointArrayMapLength = indicator.pointArrayMap.length,
                        allIchimokuPoints = [[], [], [], [], [], []],
                        ikhMap = {
                            tenkanLine: allIchimokuPoints[0],
                            kijunLine: allIchimokuPoints[1],
                            chikouLine: allIchimokuPoints[2],
                            senkouSpanA: allIchimokuPoints[3],
                            senkouSpanB: allIchimokuPoints[4],
                            senkouSpan: allIchimokuPoints[5]
                        },
                        intersectIndexColl = [],
                        senkouSpanOptions = indicator.options.senkouSpan,
                        color = senkouSpanOptions.color ||
                            senkouSpanOptions.styles.fill,
                        negativeColor = senkouSpanOptions.negativeColor,

                        // Points to create color and negativeColor senkouSpan
                        points = [
                            [], // Points color
                            [] // Points negative color
                        ],
                        // For span, we need an access to the next points, used in
                        // getGraphPath()
                        nextPoints = [
                            [], // NextPoints color
                            [] // NextPoints negative color
                        ],
                        lineIndex = 0,
                        position,
                        point,
                        i,
                        startIntersect,
                        endIntersect,
                        sectionPoints,
                        sectionNextPoints,
                        pointsPlotYSum,
                        nextPointsPlotYSum,
                        senkouSpanTempColor,
                        concatArrIndex,
                        j,
                        k;

                    indicator.ikhMap = ikhMap;

                    // Generate points for all lines and spans lines:
                    while (pointsLength--) {
                        point = mainLinePoints[pointsLength];
                        for (i = 0; i < pointArrayMapLength; i++) {
                            position = indicator.pointArrayMap[i];

                            if (defined(point[position])) {
                                allIchimokuPoints[i].push({
                                    plotX: point.plotX,
                                    plotY: point['plot' + position],
                                    isNull: false
                                });
                            }
                        }

                        if (negativeColor &&
                            pointsLength !== mainLinePoints.length - 1) {
                            // Check if lines intersect
                            var index = ikhMap.senkouSpanB.length - 1,
                                intersect = checkLineIntersection(
                                    ikhMap.senkouSpanA[index - 1],
                                    ikhMap.senkouSpanA[index],
                                    ikhMap.senkouSpanB[index - 1],
                                    ikhMap.senkouSpanB[index]
                                ),
                                intersectPointObj = {
                                    plotX: intersect.plotX,
                                    plotY: intersect.plotY,
                                    isNull: false,
                                    intersectPoint: true
                                };

                            if (intersect) {
                                // Add intersect point to ichimoku points collection
                                // Create senkouSpan sections
                                ikhMap.senkouSpanA.splice(index, 0, intersectPointObj);
                                ikhMap.senkouSpanB.splice(index, 0, intersectPointObj);
                                intersectIndexColl.push(index);
                            }
                        }
                    }

                    // Modify options and generate lines:
                    H.objectEach(ikhMap, function (values, lineName) {
                        if (mainLineOptions[lineName] && lineName !== 'senkouSpan') {
                            // First line is rendered by default option
                            indicator.points = allIchimokuPoints[lineIndex];
                            indicator.options = merge(
                                mainLineOptions[lineName].styles,
                                gappedExtend
                            );
                            indicator.graph = indicator['graph' + lineName];

                            indicator.fillGraph = false;
                            indicator.color = mainColor;
                            SMA.prototype.drawGraph.call(indicator);

                            // Now save line
                            indicator['graph' + lineName] = indicator.graph;
                        }

                        lineIndex++;
                    });

                    // Generate senkouSpan area:

                    // If graphColection exist then remove svg
                    // element and indicator property
                    if (indicator.graphCollection) {
                        indicator.graphCollection.forEach(function (graphName) {
                            indicator[graphName].destroy();
                            delete indicator[graphName];
                        });
                    }

                    // Clean grapCollection or initialize it
                    indicator.graphCollection = [];

                    // When user set negativeColor property
                    if (
                        negativeColor &&
                        ikhMap.senkouSpanA[0] &&
                        ikhMap.senkouSpanB[0]) {

                        // Add first and last point to senkouSpan area sections
                        intersectIndexColl.unshift(0);
                        intersectIndexColl.push(ikhMap.senkouSpanA.length - 1);

                        // Populate points and nextPoints arrays
                        for (j = 0; j < intersectIndexColl.length - 1; j++) {
                            startIntersect = intersectIndexColl[j];
                            endIntersect = intersectIndexColl[j + 1];

                            sectionPoints = ikhMap.senkouSpanB.slice(
                                startIntersect, endIntersect + 1
                            );

                            sectionNextPoints = ikhMap.senkouSpanA.slice(
                                startIntersect, endIntersect + 1
                            );

                            // Add points to color or negativeColor arrays
                            // Check the middle point (if exist)
                            if (Math.floor(sectionPoints.length / 2) >= 1) {
                                var x = Math.floor(sectionPoints.length / 2);

                                // When middle points has equal values
                                // Compare all ponints plotY value sum
                                if (
                                    sectionPoints[x].plotY ===
                                    sectionNextPoints[x].plotY
                                ) {

                                    pointsPlotYSum = 0;
                                    nextPointsPlotYSum = 0;

                                    for (k = 0; k < sectionPoints.length; k++) {
                                        pointsPlotYSum +=
                                        sectionPoints[k].plotY;
                                        nextPointsPlotYSum +=
                                        sectionNextPoints[k].plotY;
                                    }

                                    concatArrIndex =
                                        pointsPlotYSum > nextPointsPlotYSum ? 0 : 1;

                                    points[concatArrIndex] =
                                        points[concatArrIndex].concat(sectionPoints);

                                    nextPoints[concatArrIndex] =
                                        nextPoints[concatArrIndex].concat(
                                            sectionNextPoints
                                        );

                                } else {
                                    // Compare middle point of the section
                                    concatArrIndex =
                                        sectionPoints[x].plotY >
                                        sectionNextPoints[x].plotY ?
                                            0 : 1;

                                    points[concatArrIndex] =
                                        points[concatArrIndex].concat(sectionPoints);

                                    nextPoints[concatArrIndex] =
                                        nextPoints[concatArrIndex].concat(
                                            sectionNextPoints
                                        );
                                }
                            } else {
                                // Compare first point of the section
                                concatArrIndex =
                                        sectionPoints[0].plotY >
                                        sectionNextPoints[0].plotY ?
                                            0 : 1;

                                points[concatArrIndex] =
                                    points[concatArrIndex].concat(sectionPoints);

                                nextPoints[concatArrIndex] =
                                    nextPoints[concatArrIndex].concat(
                                        sectionNextPoints
                                    );
                            }
                        }

                        // Render color and negativeColor paths
                        [
                            'graphsenkouSpanColor', 'graphsenkouSpanNegativeColor'
                        ].forEach(
                            function (areaName, i) {
                                if (points[i].length && nextPoints[i].length) {

                                    senkouSpanTempColor = (i === 0) ?
                                        color : negativeColor;

                                    drawSenkouSpan({
                                        indicator: indicator,
                                        points: points[i],
                                        nextPoints: nextPoints[i],
                                        color: senkouSpanTempColor,
                                        options: mainLineOptions,
                                        gap: gappedExtend,
                                        graph: indicator[areaName]
                                    });

                                    // Now save line
                                    indicator[areaName] = indicator.graph;
                                    indicator.graphCollection.push(areaName);
                                }
                            }
                        );

                    } else {
                        // When user set only senkouSpan style.fill property
                        drawSenkouSpan({
                            indicator: indicator,
                            points: ikhMap.senkouSpanB,
                            nextPoints: ikhMap.senkouSpanA,
                            color: color,
                            options: mainLineOptions,
                            gap: gappedExtend,
                            graph: indicator.graphsenkouSpan
                        });

                        // Now save line
                        indicator.graphsenkouSpan = indicator.graph;
                    }

                    // Clean temporary properties:
                    delete indicator.nextPoints;
                    delete indicator.fillGraph;

                    // Restore options and draw the Tenkan line:
                    indicator.points = mainLinePoints;
                    indicator.options = mainLineOptions;
                    indicator.graph = mainLinePath;
                },
                getGraphPath: function (points) {
                    var indicator = this,
                        path = [],
                        spanA,
                        fillArray = [],
                        spanAarr = [];

                    points = points || this.points;


                    // Render Senkou Span
                    if (indicator.fillGraph && indicator.nextPoints) {

                        spanA = SMA.prototype.getGraphPath.call(
                            indicator,
                            // Reverse points, so Senkou Span A will start from the end:
                            indicator.nextPoints
                        );

                        spanA[0] = 'L';

                        path = SMA.prototype.getGraphPath.call(
                            indicator,
                            points
                        );

                        spanAarr = spanA.slice(0, path.length);

                        for (var i = (spanAarr.length - 1); i > 0; i -= 3) {
                            fillArray.push(
                                spanAarr[i - 2],
                                spanAarr[i - 1],
                                spanAarr[i]
                            );
                        }
                        path = path.concat(fillArray);

                    } else {
                        path = SMA.prototype.getGraphPath.apply(indicator, arguments);
                    }

                    return path;
                },
                getValues: function (series, params) {

                    var period = params.period,
                        periodTenkan = params.periodTenkan,
                        periodSenkouSpanB = params.periodSenkouSpanB,
                        xVal = series.xData,
                        yVal = series.yData,
                        xAxis = series.xAxis,
                        yValLen = (yVal && yVal.length) || 0,
                        closestPointRange = getClosestPointRange(xAxis),
                        IKH = [],
                        xData = [],
                        dateStart,
                        date,
                        slicedTSY,
                        slicedKSY,
                        slicedSSBY,
                        pointTS,
                        pointKS,
                        pointSSB,
                        i,
                        TS,
                        KS,
                        CS,
                        SSA,
                        SSB;

                    // Ikh requires close value
                    if (
                        xVal.length <= period ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }


                    // Add timestamps at the beginning
                    dateStart = xVal[0] - (period * closestPointRange);

                    for (i = 0; i < period; i++) {
                        xData.push(dateStart + i * closestPointRange);
                    }

                    for (i = 0; i < yValLen; i++) {

                        // Tenkan Sen
                        if (i >= periodTenkan) {

                            slicedTSY = yVal.slice(i - periodTenkan, i);

                            pointTS = highlowLevel(slicedTSY);

                            TS = (pointTS.high + pointTS.low) / 2;
                        }

                        if (i >= period) {

                            slicedKSY = yVal.slice(i - period, i);

                            pointKS = highlowLevel(slicedKSY);

                            KS = (pointKS.high + pointKS.low) / 2;

                            SSA = (TS + KS) / 2;
                        }

                        if (i >= periodSenkouSpanB) {

                            slicedSSBY = yVal.slice(i - periodSenkouSpanB, i);

                            pointSSB = highlowLevel(slicedSSBY);

                            SSB = (pointSSB.high + pointSSB.low) / 2;
                        }

                        CS = yVal[i][3];

                        date = xVal[i];

                        if (IKH[i] === UNDEFINED) {
                            IKH[i] = [];
                        }

                        if (IKH[i + period] === UNDEFINED) {
                            IKH[i + period] = [];
                        }

                        IKH[i + period][0] = TS;
                        IKH[i + period][1] = KS;
                        IKH[i + period][2] = UNDEFINED;

                        IKH[i][2] = CS;

                        if (i <= period) {
                            IKH[i + period][3] = UNDEFINED;
                            IKH[i + period][4] = UNDEFINED;
                        }

                        if (IKH[i + 2 * period] === UNDEFINED) {
                            IKH[i + 2 * period] = [];
                        }

                        IKH[i + 2 * period][3] = SSA;
                        IKH[i + 2 * period][4] = SSB;

                        xData.push(date);

                    }

                    // Add timestamps for further points
                    for (i = 1; i <= period; i++) {
                        xData.push(date + i * closestPointRange);
                    }

                    return {
                        values: IKH,
                        xData: xData,
                        yData: IKH
                    };
                }
            }
        );

        /**
         * A `IKH` series. If the [type](#series.ikh.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ikh
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.ikh
         */

    });
    _registerModule(_modules, 'indicators/keltner-channels.src.js', [_modules['parts/Globals.js'], _modules['mixins/multipe-lines.js']], function (H, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var SMA = H.seriesTypes.sma,
            EMA = H.seriesTypes.ema,
            ATR = H.seriesTypes.atr,
            merge = H.merge,
            correctFloat = H.correctFloat;

        /**
         * The Keltner Channels series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.keltnerchannels
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'keltnerchannels',
            'sma',
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
             * @optionparent plotOptions.keltnerchannels
             */
            {
                params: {
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
                        lineColor: undefined
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
                        lineColor: undefined
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
            },
            /**
             * @lends Highcharts.Series#
             */
            merge(multipleLinesMixin, {
                pointArrayMap: ['top', 'middle', 'bottom'],
                pointValKey: 'middle',
                nameBase: 'Keltner Channels',
                nameComponents: ['period', 'periodATR', 'multiplierATR'],
                linesApiNames: ['topLine', 'bottomLine'],
                requiredIndicators: ['ema', 'atr'],
                init: function () {
                    SMA.prototype.init.apply(this, arguments);
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
                },
                getValues: function (series, params) {
                    var period = params.period,
                        periodATR = params.periodATR,
                        multiplierATR = params.multiplierATR,
                        index = params.index,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        // Keltner Channels array structure:
                        // 0-date, 1-top line, 2-middle line, 3-bottom line
                        KC = [],
                        ML, TL, BL, // middle line, top line and bottom line
                        date,
                        seriesEMA = EMA.prototype.getValues(series,
                            {
                                period: period,
                                index: index
                            }),
                        seriesATR = ATR.prototype.getValues(series,
                            {
                                period: periodATR
                            }),
                        pointEMA,
                        pointATR,
                        xData = [],
                        yData = [],
                        i;

                    if (yValLen < period) {
                        return false;
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
                }
            })
        );

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
         * @optionparent series.keltnerchannels
         */

    });
    _registerModule(_modules, 'indicators/macd.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */




        var seriesType = H.seriesType,
            noop = H.noop,
            merge = H.merge,
            defined = H.defined,
            SMA = H.seriesTypes.sma,
            EMA = H.seriesTypes.ema,
            correctFloat = H.correctFloat;

        /**
         * The MACD series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.macd
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'macd',
            'sma',

            /**
             * Moving Average Convergence Divergence (MACD). This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * @sample stock/indicators/macd
             *         MACD indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.macd
             */
            {
                params: {
                    /**
                     * The short period for indicator calculations.
                     */
                    shortPeriod: 12,
                    /**
                     * The long period for indicator calculations.
                     */
                    longPeriod: 26,
                    /**
                     * The base period for signal calculations.
                     */
                    signalPeriod: 9,
                    period: 26
                },
                /**
                 * The styles for signal line
                 */
                signalLine: {
                    /**
                     * @sample stock/indicators/macd-zones
                     *         Zones in MACD
                     *
                     * @extends plotOptions.macd.zones
                     */
                    zones: [],
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line.
                         *
                         * @type  {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                /**
                 * The styles for macd line
                 */
                macdLine: {
                    /**
                     * @sample stock/indicators/macd-zones
                     *         Zones in MACD
                     *
                     * @extends plotOptions.macd.zones
                     */
                    zones: [],
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line.
                         *
                         * @type  {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                threshold: 0,
                groupPadding: 0.1,
                pointPadding: 0.1,
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                        'Value: {point.MACD}<br/>' +
                        'Signal: {point.signal}<br/>' +
                        'Histogram: {point.y}<br/>'
                },
                dataGrouping: {
                    approximation: 'averages'
                },
                minPointLength: 0
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameComponents: ['longPeriod', 'shortPeriod', 'signalPeriod'],
                requiredIndicators: ['ema'],
                // "y" value is treated as Histogram data
                pointArrayMap: ['y', 'signal', 'MACD'],
                parallelArrays: ['x', 'y', 'signal', 'MACD'],
                pointValKey: 'y',
                // Columns support:
                markerAttribs: noop,
                getColumnMetrics: H.seriesTypes.column.prototype.getColumnMetrics,
                crispCol: H.seriesTypes.column.prototype.crispCol,
                // Colors and lines:
                init: function () {
                    SMA.prototype.init.apply(this, arguments);

                    // Check whether series is initialized. It may be not initialized,
                    // when any of required indicators is missing.
                    if (this.options) {
                        // Set default color for a signal line and the histogram:
                        this.options = merge({
                            signalLine: {
                                styles: {
                                    lineColor: this.color
                                }
                            },
                            macdLine: {
                                styles: {
                                    color: this.color
                                }
                            }
                        }, this.options);

                        // Zones have indexes automatically calculated, we need to
                        // translate them to support multiple lines within one indicator
                        this.macdZones = {
                            zones: this.options.macdLine.zones,
                            startIndex: 0
                        };
                        this.signalZones = {
                            zones: this.macdZones.zones.concat(
                                this.options.signalLine.zones
                            ),
                            startIndex: this.macdZones.zones.length
                        };
                        this.resetZones = true;
                    }
                },
                toYData: function (point) {
                    return [point.y, point.signal, point.MACD];
                },
                translate: function () {
                    var indicator = this,
                        plotNames = ['plotSignal', 'plotMACD'];

                    H.seriesTypes.column.prototype.translate.apply(indicator);

                    indicator.points.forEach(function (point) {
                        [point.signal, point.MACD].forEach(function (value, i) {
                            if (value !== null) {
                                point[plotNames[i]] = indicator.yAxis.toPixels(
                                    value,
                                    true
                                );
                            }
                        });
                    });
                },
                destroy: function () {
                    // this.graph is null due to removing two times the same SVG element
                    this.graph = null;
                    this.graphmacd = this.graphmacd && this.graphmacd.destroy();
                    this.graphsignal = this.graphsignal && this.graphsignal.destroy();

                    SMA.prototype.destroy.apply(this, arguments);
                },
                drawPoints: H.seriesTypes.column.prototype.drawPoints,
                drawGraph: function () {
                    var indicator = this,
                        mainLinePoints = indicator.points,
                        pointsLength = mainLinePoints.length,
                        mainLineOptions = indicator.options,
                        histogramZones = indicator.zones,
                        gappedExtend = {
                            options: {
                                gapSize: mainLineOptions.gapSize
                            }
                        },
                        otherSignals = [[], []],
                        point;

                    // Generate points for top and bottom lines:
                    while (pointsLength--) {
                        point = mainLinePoints[pointsLength];
                        if (defined(point.plotMACD)) {
                            otherSignals[0].push({
                                plotX: point.plotX,
                                plotY: point.plotMACD,
                                isNull: !defined(point.plotMACD)
                            });
                        }
                        if (defined(point.plotSignal)) {
                            otherSignals[1].push({
                                plotX: point.plotX,
                                plotY: point.plotSignal,
                                isNull: !defined(point.plotMACD)
                            });
                        }
                    }

                    // Modify options and generate smoothing line:
                    ['macd', 'signal'].forEach(function (lineName, i) {
                        indicator.points = otherSignals[i];
                        indicator.options = merge(
                            mainLineOptions[lineName + 'Line'].styles,
                            gappedExtend
                        );
                        indicator.graph = indicator['graph' + lineName];

                        // Zones extension:
                        indicator.currentLineZone = lineName + 'Zones';
                        indicator.zones = indicator[indicator.currentLineZone].zones;

                        SMA.prototype.drawGraph.call(indicator);
                        indicator['graph' + lineName] = indicator.graph;
                    });

                    // Restore options:
                    indicator.points = mainLinePoints;
                    indicator.options = mainLineOptions;
                    indicator.zones = histogramZones;
                    indicator.currentLineZone = null;
                    // indicator.graph = null;
                },
                getZonesGraphs: function (props) {
                    var allZones = SMA.prototype.getZonesGraphs.call(this, props),
                        currentZones = allZones;

                    if (this.currentLineZone) {
                        currentZones = allZones.splice(
                            this[this.currentLineZone].startIndex + 1
                        );

                        if (!currentZones.length) {
                            // Line has no zones, return basic graph "zone"
                            currentZones = [props[0]];
                        } else {
                            // Add back basic prop:
                            currentZones.splice(0, 0, props[0]);
                        }
                    }

                    return currentZones;
                },
                applyZones: function () {
                    // Histogram zones are handled by drawPoints method
                    // Here we need to apply zones for all lines
                    var histogramZones = this.zones;

                    // signalZones.zones contains all zones:
                    this.zones = this.signalZones.zones;
                    SMA.prototype.applyZones.call(this);

                    // applyZones hides only main series.graph, hide macd line manually
                    if (this.options.macdLine.zones.length) {
                        this.graphmacd.hide();
                    }

                    this.zones = histogramZones;
                },
                getValues: function (series, params) {
                    var j = 0,
                        MACD = [],
                        xMACD = [],
                        yMACD = [],
                        signalLine = [],
                        shortEMA,
                        longEMA,
                        i;

                    if (series.xData.length < params.longPeriod + params.signalPeriod) {
                        return false;
                    }

                    // Calculating the short and long EMA used when calculating the MACD
                    shortEMA = EMA.prototype.getValues(
                        series,
                        {
                            period: params.shortPeriod
                        }
                    );

                    longEMA = EMA.prototype.getValues(
                        series,
                        {
                            period: params.longPeriod
                        }
                    );

                    shortEMA = shortEMA.values;
                    longEMA = longEMA.values;


                    // Subtract each Y value from the EMA's and create the new dataset
                    // (MACD)
                    for (i = 1; i <= shortEMA.length; i++) {
                        if (
                            defined(longEMA[i - 1]) &&
                            defined(longEMA[i - 1][1]) &&
                            defined(shortEMA[i + params.shortPeriod + 1]) &&
                            defined(shortEMA[i + params.shortPeriod + 1][0])
                        ) {
                            MACD.push([
                                shortEMA[i + params.shortPeriod + 1][0],
                                0,
                                null,
                                shortEMA[i + params.shortPeriod + 1][1] -
                                    longEMA[i - 1][1]
                            ]);
                        }
                    }

                    // Set the Y and X data of the MACD. This is used in calculating the
                    // signal line.
                    for (i = 0; i < MACD.length; i++) {
                        xMACD.push(MACD[i][0]);
                        yMACD.push([0, null, MACD[i][3]]);
                    }

                    // Setting the signalline (Signal Line: X-day EMA of MACD line).
                    signalLine = EMA.prototype.getValues(
                        {
                            xData: xMACD,
                            yData: yMACD
                        },
                        {
                            period: params.signalPeriod,
                            index: 2
                        }
                    );

                    signalLine = signalLine.values;

                    // Setting the MACD Histogram. In comparison to the loop with pure
                    // MACD this loop uses MACD x value not xData.
                    for (i = 0; i < MACD.length; i++) {
                        if (MACD[i][0] >= signalLine[0][0]) { // detect the first point

                            MACD[i][2] = signalLine[j][1];
                            yMACD[i] = [0, signalLine[j][1], MACD[i][3]];

                            if (MACD[i][3] === null) {
                                MACD[i][1] = 0;
                                yMACD[i][0] = 0;
                            } else {
                                MACD[i][1] = correctFloat(MACD[i][3] -
                                signalLine[j][1]);
                                yMACD[i][0] = correctFloat(MACD[i][3] -
                                signalLine[j][1]);
                            }

                            j++;
                        }
                    }

                    return {
                        values: MACD,
                        xData: xMACD,
                        yData: yMACD
                    };
                }
            }
        );

        /**
         * A `MACD` series. If the [type](#series.macd.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.macd
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.macd
         */

    });
    _registerModule(_modules, 'indicators/mfi.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  Money Flow Index indicator for Highstock
         *
         *  (c) 2010-2019 Grzegorz Blachliński
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray;

        // Utils:
        function sumArray(array) {

            return array.reduce(function (prev, cur) {
                return prev + cur;
            });
        }

        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }

        function calculateTypicalPrice(point) {
            return (point[1] + point[2] + point[3]) / 3;
        }

        function calculateRawMoneyFlow(typicalPrice, volume) {
            return typicalPrice * volume;
        }

        /**
         * The MFI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.mfi
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'mfi',
            'sma',
            /**
             * Money Flow Index. This series requires `linkedTo` option to be set and
             * should be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/mfi
             *         Money Flow Index Indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.mfi
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 14,
                    /**
                     * The id of volume series which is mandatory.
                     * For example using OHLC data, volumeSeriesID='volume' means
                     * the indicator will be calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume',
                    /**
                     * Number of maximum decimals that are used in MFI calculations.
                     */
                    decimals: 4

                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Money Flow Index',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        decimals = params.decimals,
                        // MFI starts calculations from the second point
                        // Cause we need to calculate change between two points
                        range = 1,
                        volumeSeries = series.chart.get(params.volumeSeriesID),
                        yValVolume = volumeSeries && volumeSeries.yData,
                        MFI = [],
                        isUp = false,
                        xData = [],
                        yData = [],
                        positiveMoneyFlow = [],
                        negativeMoneyFlow = [],
                        newTypicalPrice,
                        oldTypicalPrice,
                        rawMoneyFlow,
                        negativeMoneyFlowSum,
                        positiveMoneyFlowSum,
                        moneyFlowRatio,
                        MFIPoint, i;

                    if (!volumeSeries) {
                        return H.error(
                            'Series ' +
                            params.volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            series.chart
                        );
                    }

                    // MFI requires high low and close values
                    if (
                        (xVal.length <= period) || !isArray(yVal[0]) ||
                        yVal[0].length !== 4 ||
                        !yValVolume
                    ) {
                        return false;
                    }
                    // Calculate first typical price
                    newTypicalPrice = calculateTypicalPrice(yVal[range]);
                    // Accumulate first N-points
                    while (range < period + 1) {
                        // Calculate if up or down
                        oldTypicalPrice = newTypicalPrice;
                        newTypicalPrice = calculateTypicalPrice(yVal[range]);
                        isUp = newTypicalPrice >= oldTypicalPrice;
                        // Calculate raw money flow
                        rawMoneyFlow = calculateRawMoneyFlow(
                            newTypicalPrice,
                            yValVolume[range]
                        );
                        // Add to array
                        positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
                        negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
                        range++;
                    }
                    for (i = range - 1; i < yValLen; i++) {
                        if (i > range - 1) {
                            // Remove first point from array
                            positiveMoneyFlow.shift();
                            negativeMoneyFlow.shift();
                            // Calculate if up or down
                            oldTypicalPrice = newTypicalPrice;
                            newTypicalPrice = calculateTypicalPrice(yVal[i]);
                            isUp = newTypicalPrice > oldTypicalPrice;
                            // Calculate raw money flow
                            rawMoneyFlow = calculateRawMoneyFlow(
                                newTypicalPrice,
                                yValVolume[i]
                            );
                            // Add to array
                            positiveMoneyFlow.push(isUp ? rawMoneyFlow : 0);
                            negativeMoneyFlow.push(isUp ? 0 : rawMoneyFlow);
                        }

                        // Calculate sum of negative and positive money flow:
                        negativeMoneyFlowSum = sumArray(negativeMoneyFlow);
                        positiveMoneyFlowSum = sumArray(positiveMoneyFlow);

                        moneyFlowRatio = positiveMoneyFlowSum / negativeMoneyFlowSum;
                        MFIPoint = toFixed(
                            100 - (100 / (1 + moneyFlowRatio)),
                            decimals
                        );
                        MFI.push([xVal[i], MFIPoint]);
                        xData.push(xVal[i]);
                        yData.push(MFIPoint);
                    }

                    return {
                        values: MFI,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `MFI` series. If the [type](#series.mfi.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.mfi
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.mfi
         */

    });
    _registerModule(_modules, 'indicators/momentum.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType;

        function populateAverage(points, xVal, yVal, i, period) {
            var mmY = yVal[i - 1][3] - yVal[i - period - 1][3],
                mmX = xVal[i - 1];

            points.shift(); // remove point until range < period

            return [mmX, mmY];
        }

        /**
         * The Momentum series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.momentum
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'momentum',
            'sma',
            /**
             * Momentum. This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/momentum
             *         Momentum indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.momentum
             */
            {
                params: {
                    period: 14
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Momentum',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        xValue = xVal[0],
                        yValue = yVal[0],
                        MM = [],
                        xData = [],
                        yData = [],
                        index,
                        i,
                        points,
                        MMPoint;

                    if (xVal.length <= period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        yValue = yVal[0][3];
                    } else {
                        return false;
                    }
                    // Starting point
                    points = [
                        [xValue, yValue]
                    ];


                    // Calculate value one-by-one for each period in visible data
                    for (i = (period + 1); i < yValLen; i++) {
                        MMPoint = populateAverage(points, xVal, yVal, i, period, index);
                        MM.push(MMPoint);
                        xData.push(MMPoint[0]);
                        yData.push(MMPoint[1]);
                    }

                    MMPoint = populateAverage(points, xVal, yVal, i, period, index);
                    MM.push(MMPoint);
                    xData.push(MMPoint[0]);
                    yData.push(MMPoint[1]);

                    return {
                        values: MM,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Momentum` series. If the [type](#series.momentum.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.momentum
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.momentum
         */

    });
    _registerModule(_modules, 'indicators/natr.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var ATR = H.seriesTypes.atr;

        /**
         * The NATR series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.natr
         *
         * @augments Highcharts.Series
         */
        H.seriesType('natr', 'sma',
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/atr.js`.
             *
             * @sample {highstock} stock/indicators/natr
             *         NATR indicator
             *
             * @extends      plotOptions.atr
             * @since        7.0.0
             * @product      highstock
             * @optionparent plotOptions.natr
             */
            {
                tooltip: {
                    valueSuffix: '%'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                requiredIndicators: ['atr'],
                getValues: function (series, params) {
                    var atrData = ATR.prototype.getValues.apply(this, arguments),
                        atrLength = atrData.values.length,
                        period = params.period - 1,
                        yVal = series.yData,
                        i = 0;

                    for (; i < atrLength; i++) {
                        atrData.yData[i] = atrData.values[i][1] / yVal[period][3] * 100;
                        atrData.values[i][1] = atrData.yData[i];
                        period++;
                    }

                    return atrData;
                }

            });

        /**
         * A `NATR` series. If the [type](#series.natr.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.natr
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.natr
         */

    });
    _registerModule(_modules, 'indicators/pivot-points.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var defined = H.defined,
            isArray = H.isArray,
            SMA = H.seriesTypes.sma;

        function destroyExtraLabels(point, functionName) {
            var props = point.series.pointArrayMap,
                prop,
                i = props.length;

            SMA.prototype.pointClass.prototype[functionName].call(point);

            while (i--) {
                prop = 'dataLabel' + props[i];
                // S4 dataLabel could be removed by parent method:
                if (point[prop] && point[prop].element) {
                    point[prop].destroy();
                }
                point[prop] = null;
            }
        }

        /**
         * The Pivot Points series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pivotpoints
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'pivotpoints',
            'sma',
            /**
             * Pivot points indicator. This series requires the `linkedTo` option to be
             * set and should be loaded after `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/pivot-points
             *         Pivot points
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.pivotpoints
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 28,
                    /**
                     * Algorithm used to calculate ressistance and support lines based
                     * on pivot points. Implemented algorithms: `'standard'`,
                     * `'fibonacci'` and `'camarilla'`
                     */
                    algorithm: 'standard'
                },
                marker: {
                    enabled: false
                },
                enableMouseTracking: false,
                dataLabels: {
                    /** @ignore-option */
                    enabled: true,
                    /** @ignore-option */
                    format: '{point.pivotLine}'
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Pivot Points',
                pointArrayMap: ['R4', 'R3', 'R2', 'R1', 'P', 'S1', 'S2', 'S3', 'S4'],
                pointValKey: 'P',
                toYData: function (point) {
                    return [point.P]; // The rest should not affect extremes
                },
                translate: function () {
                    var indicator = this;

                    SMA.prototype.translate.apply(indicator);

                    indicator.points.forEach(function (point) {
                        indicator.pointArrayMap.forEach(function (value) {
                            if (defined(point[value])) {
                                point['plot' + value] = indicator.yAxis.toPixels(
                                    point[value],
                                    true
                                );
                            }
                        });
                    });

                    // Pivot points are rendered as horizontal lines
                    // And last point start not from the next one (as it's the last one)
                    // But from the approximated last position in a given range
                    indicator.plotEndPoint = indicator.xAxis.toPixels(
                        indicator.endPoint,
                        true
                    );
                },
                getGraphPath: function (points) {
                    var indicator = this,
                        pointsLength = points.length,
                        allPivotPoints = [[], [], [], [], [], [], [], [], []],
                        path = [],
                        endPoint = indicator.plotEndPoint,
                        pointArrayMapLength = indicator.pointArrayMap.length,
                        position,
                        point,
                        i;

                    while (pointsLength--) {
                        point = points[pointsLength];
                        for (i = 0; i < pointArrayMapLength; i++) {
                            position = indicator.pointArrayMap[i];

                            if (defined(point[position])) {
                                allPivotPoints[i].push({
                                    // Start left:
                                    plotX: point.plotX,
                                    plotY: point['plot' + position],
                                    isNull: false
                                }, {
                                    // Go to right:
                                    plotX: endPoint,
                                    plotY: point['plot' + position],
                                    isNull: false
                                }, {
                                    // And add null points in path to generate breaks:
                                    plotX: endPoint,
                                    plotY: null,
                                    isNull: true
                                });
                            }
                        }
                        endPoint = point.plotX;
                    }

                    allPivotPoints.forEach(function (pivotPoints) {
                        path = path.concat(
                            SMA.prototype.getGraphPath.call(indicator, pivotPoints)
                        );
                    });

                    return path;
                },
                // TODO: Rewrite this logic to use multiple datalabels
                drawDataLabels: function () {
                    var indicator = this,
                        pointMapping = indicator.pointArrayMap,
                        currentLabel,
                        pointsLength,
                        point,
                        i;

                    if (indicator.options.dataLabels.enabled) {
                        pointsLength = indicator.points.length;

                        // For every Ressitance/Support group we need to render labels.
                        // Add one more item, which will just store dataLabels from
                        // previous iteration
                        pointMapping.concat([false]).forEach(function (position, k) {
                            i = pointsLength;
                            while (i--) {
                                point = indicator.points[i];

                                if (!position) {
                                    // Store S4 dataLabel too:
                                    point['dataLabel' + pointMapping[k - 1]] =
                                        point.dataLabel;
                                } else {
                                    point.y = point[position];
                                    point.pivotLine = position;
                                    point.plotY = point['plot' + position];
                                    currentLabel = point['dataLabel' + position];

                                    // Store previous label
                                    if (k) {
                                        point['dataLabel' + pointMapping[k - 1]] =
                                            point.dataLabel;
                                    }

                                    if (!point.dataLabels) {
                                        point.dataLabels = [];
                                    }
                                    point.dataLabels[0] = point.dataLabel =
                                        currentLabel =
                                        currentLabel && currentLabel.element ?
                                            currentLabel :
                                            null;
                                }
                            }
                            SMA.prototype.drawDataLabels.apply(indicator, arguments);
                        });
                    }
                },
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        placement = this[params.algorithm + 'Placement'],
                        PP = [], // 0- from, 1- to, 2- R1, 3- R2, 4- pivot, 5- S1 etc.
                        endTimestamp,
                        xData = [],
                        yData = [],
                        slicedXLen,
                        slicedX,
                        slicedY,
                        lastPP,
                        pivot,
                        avg,
                        i;

                    // Pivot Points requires high, low and close values
                    if (
                        xVal.length < period ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    for (i = period + 1; i <= yValLen + period; i += period) {
                        slicedX = xVal.slice(i - period - 1, i);
                        slicedY = yVal.slice(i - period - 1, i);

                        slicedXLen = slicedX.length;

                        endTimestamp = slicedX[slicedXLen - 1];

                        pivot = this.getPivotAndHLC(slicedY);
                        avg = placement(pivot);

                        lastPP = PP.push(
                            [endTimestamp]
                                .concat(avg)
                        );

                        xData.push(endTimestamp);
                        yData.push(PP[lastPP - 1].slice(1));
                    }

                    // We don't know exact position in ordinal axis
                    // So we use simple logic:
                    // Get first point in last range, calculate visible average range
                    // and multiply by period
                    this.endPoint = slicedX[0] +
                        ((endTimestamp - slicedX[0]) / slicedXLen) * period;

                    return {
                        values: PP,
                        xData: xData,
                        yData: yData
                    };
                },
                getPivotAndHLC: function (values) {
                    var high = -Infinity,
                        low = Infinity,
                        close = values[values.length - 1][3],
                        pivot;

                    values.forEach(function (p) {
                        high = Math.max(high, p[1]);
                        low = Math.min(low, p[2]);
                    });
                    pivot = (high + low + close) / 3;

                    return [pivot, high, low, close];
                },
                standardPlacement: function (values) {
                    var diff = values[1] - values[2],
                        avg = [
                            null,
                            null,
                            values[0] + diff,
                            values[0] * 2 - values[2],
                            values[0],
                            values[0] * 2 - values[1],
                            values[0] - diff,
                            null,
                            null
                        ];

                    return avg;
                },
                camarillaPlacement: function (values) {
                    var diff = values[1] - values[2],
                        avg = [
                            values[3] + diff * 1.5,
                            values[3] + diff * 1.25,
                            values[3] + diff * 1.1666,
                            values[3] + diff * 1.0833,
                            values[0],
                            values[3] - diff * 1.0833,
                            values[3] - diff * 1.1666,
                            values[3] - diff * 1.25,
                            values[3] - diff * 1.5
                        ];

                    return avg;
                },
                fibonacciPlacement: function (values) {
                    var diff = values[1] - values[2],
                        avg = [
                            null,
                            values[0] + diff,
                            values[0] + diff * 0.618,
                            values[0] + diff * 0.382,
                            values[0],
                            values[0] - diff * 0.382,
                            values[0] - diff * 0.618,
                            values[0] - diff,
                            null
                        ];

                    return avg;
                }
            },
            /**
             * @lends Highcharts.Point#
             */
            {
                // Destroy labels:
                // This method is called when cropping data:
                destroyElements: function () {
                    destroyExtraLabels(this, 'destroyElements');
                },
                // This method is called when removing points, e.g. series.update()
                destroy: function () {
                    destroyExtraLabels(this, 'destroyElements');
                }
            }
        );

        /**
         * A pivot points indicator. If the [type](#series.pivotpoints.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.pivotpoints
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.pivotpoints
         */

    });
    _registerModule(_modules, 'indicators/ppo.src.js', [_modules['parts/Globals.js'], _modules['mixins/indicator-required.js']], function (H, requiredIndicatorMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var EMA = H.seriesTypes.ema,
            error = H.error,
            correctFloat = H.correctFloat,
            requiredIndicator = requiredIndicatorMixin;

        /**
         * The PPO series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ppo
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'ppo',
            'ema',
            /**
             * Percentage Price Oscillator. This series requires the
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
             *
             * @sample {highstock} stock/indicators/ppo
             *         Percentage Price Oscillator
             *
             * @extends      plotOptions.ema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.ppo
             */
            {
                /**
                 * Paramters used in calculation of Percentage Price Oscillator series
                 * points.
                 *
                 * @excluding period
                 */
                params: {
                    /**
                     * Periods for Percentage Price Oscillator calculations.
                     *
                     * @type    {Array<number>}
                     * @default [12, 26]
                     */
                    periods: [12, 26]
                }
            },
            /**
             * @lends Highcharts.Series.prototype
             */
            {
                nameBase: 'PPO',
                nameComponents: ['periods'],
                init: function () {
                    var args = arguments,
                        ctx = this;

                    requiredIndicator.isParentLoaded(
                        EMA,
                        'ema',
                        ctx.type,
                        function (indicator) {
                            indicator.prototype.init.apply(ctx, args);
                        }
                    );
                },
                getValues: function (series, params) {
                    var periods = params.periods,
                        index = params.index,
                        PPO = [], // 0- date, 1- Percentage Price Oscillator
                        xData = [],
                        yData = [],
                        periodsOffset,
                        SPE, // Shorter Period EMA
                        LPE, // Longer Period EMA
                        oscillator,
                        i;

                    // Check if periods are correct
                    if (periods.length !== 2 || periods[1] <= periods[0]) {
                        error(
                            'Error: "PPO requires two periods. Notice, first period ' +
                            'should be lower than the second one."'
                        );
                        return false;
                    }

                    SPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[0]
                    });

                    LPE = EMA.prototype.getValues.call(this, series, {
                        index: index,
                        period: periods[1]
                    });

                    // Check if ema is calculated properly, if not skip
                    if (!SPE || !LPE) {
                        return false;
                    }

                    periodsOffset = periods[1] - periods[0];

                    for (i = 0; i < LPE.yData.length; i++) {
                        oscillator = correctFloat(
                            (SPE.yData[i + periodsOffset] - LPE.yData[i]) /
                            LPE.yData[i] *
                            100
                        );

                        PPO.push([LPE.xData[i], oscillator]);
                        xData.push(LPE.xData[i]);
                        yData.push(oscillator);
                    }

                    return {
                        values: PPO,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Percentage Price Oscillator` series. If the [type](#series.ppo.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ppo
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.ppo
         */

    });
    _registerModule(_modules, 'mixins/reduce-array.js', [_modules['parts/Globals.js']], function (H) {
        /**
         * (c) 2010-2019 Pawel Fus & Daniel Studencki
         *
         * License: www.highcharts.com/license
         */


        var reduce = H.reduce;

        var reduceArrayMixin = {
            /**
             * Get min value of array filled by OHLC data.
             * @param {array} arr Array of OHLC points (arrays).
             * @param {string} index Index of "low" value in point array.
             * @returns {number} Returns min value.
             */
            minInArray: function (arr, index) {
                return reduce(arr, function (min, target) {
                    return Math.min(min, target[index]);
                }, Number.MAX_VALUE);
            },
            /**
             * Get max value of array filled by OHLC data.
             * @param {array} arr Array of OHLC points (arrays).
             * @param {string} index Index of "high" value in point array.
             * @returns {number} Returns max value.
             */
            maxInArray: function (arr, index) {
                return reduce(arr, function (min, target) {
                    return Math.max(min, target[index]);
                }, -Number.MAX_VALUE);
            },
            /**
             * Get extremes of array filled by OHLC data.
             * @param {array} arr Array of OHLC points (arrays).
             * @param {string} minIndex Index of "low" value in point array.
             * @param {string} maxIndex Index of "high" value in point array.
             * @returns {array} Returns array with min and max value.
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
    _registerModule(_modules, 'indicators/price-envelopes.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var merge = H.merge,
            isArray = H.isArray,
            SMA = H.seriesTypes.sma;

        /**
         * The Price Envelopes series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.priceenvelopes
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'priceenvelopes',
            'sma',
            /**
             * Price envelopes indicator based on [SMA](#plotOptions.sma) calculations.
             * This series requires the `linkedTo` option to be set and should be loaded
             * after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/price-envelopes
             *         Price envelopes
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.priceenvelopes
             */
            {
                marker: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'
                },
                params: {
                    period: 20,
                    /**
                     * Percentage above the moving average that should be displayed.
                     * 0.1 means 110%. Relative to the calculated value.
                     */
                    topBand: 0.1,
                    /**
                     * Percentage below the moving average that should be displayed.
                     * 0.1 means 90%. Relative to the calculated value.
                     */
                    bottomBand: 0.1
                },
                /**
                 * Bottom line options.
                 */
                bottomLine: {
                    styles: {
                        /**
                         * Pixel width of the line.
                         */
                        lineWidth: 1,
                        /**
                         * Color of the line. If not set, it's inherited from
                         * [plotOptions.priceenvelopes.color](
                         * #plotOptions.priceenvelopes.color).
                         *
                         * @type {Highcharts.ColorString}
                         */
                        lineColor: undefined
                    }
                },
                /**
                 * Top line options.
                 *
                 * @extends plotOptions.priceenvelopes.bottomLine
                 */
                topLine: {
                    styles: {
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
            {
                nameComponents: ['period', 'topBand', 'bottomBand'],
                nameBase: 'Price envelopes',
                pointArrayMap: ['top', 'middle', 'bottom'],
                parallelArrays: ['x', 'y', 'top', 'bottom'],
                pointValKey: 'middle',
                init: function () {
                    SMA.prototype.init.apply(this, arguments);

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
                },
                toYData: function (point) {
                    return [point.top, point.middle, point.bottom];
                },
                translate: function () {
                    var indicator = this,
                        translatedEnvelopes = ['plotTop', 'plotMiddle', 'plotBottom'];

                    SMA.prototype.translate.apply(indicator);

                    indicator.points.forEach(function (point) {
                        [point.top, point.middle, point.bottom].forEach(
                            function (value, i) {
                                if (value !== null) {
                                    point[translatedEnvelopes[i]] =
                                        indicator.yAxis.toPixels(value, true);
                                }
                            }
                        );
                    });
                },
                drawGraph: function () {
                    var indicator = this,
                        middleLinePoints = indicator.points,
                        pointsLength = middleLinePoints.length,
                        middleLineOptions = indicator.options,
                        middleLinePath = indicator.graph,
                        gappedExtend = {
                            options: {
                                gapSize: middleLineOptions.gapSize
                            }
                        },
                        deviations = [[], []], // top and bottom point place holders
                        point;

                    // Generate points for top and bottom lines:
                    while (pointsLength--) {
                        point = middleLinePoints[pointsLength];
                        deviations[0].push({
                            plotX: point.plotX,
                            plotY: point.plotTop,
                            isNull: point.isNull
                        });
                        deviations[1].push({
                            plotX: point.plotX,
                            plotY: point.plotBottom,
                            isNull: point.isNull
                        });
                    }

                    // Modify options and generate lines:
                    ['topLine', 'bottomLine'].forEach(function (lineName, i) {
                        indicator.points = deviations[i];
                        indicator.options = merge(
                            middleLineOptions[lineName].styles,
                            gappedExtend
                        );
                        indicator.graph = indicator['graph' + lineName];
                        SMA.prototype.drawGraph.call(indicator);

                        // Now save lines:
                        indicator['graph' + lineName] = indicator.graph;
                    });

                    // Restore options and draw a middle line:
                    indicator.points = middleLinePoints;
                    indicator.options = middleLineOptions;
                    indicator.graph = middleLinePath;
                    SMA.prototype.drawGraph.call(indicator);
                },
                getValues: function (series, params) {
                    var period = params.period,
                        topPercent = params.topBand,
                        botPercent = params.bottomBand,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        PE = [], // 0- date, 1-top line, 2-middle line, 3-bottom line
                        ML, TL, BL, // middle line, top line and bottom line
                        date,
                        xData = [],
                        yData = [],
                        slicedX,
                        slicedY,
                        point,
                        i;

                    // Price envelopes requires close value
                    if (
                        xVal.length < period ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    for (i = period; i <= yValLen; i++) {
                        slicedX = xVal.slice(i - period, i);
                        slicedY = yVal.slice(i - period, i);

                        point = SMA.prototype.getValues.call(this, {
                            xData: slicedX,
                            yData: slicedY
                        }, params);

                        date = point.xData[0];
                        ML = point.yData[0];
                        TL = ML * (1 + topPercent);
                        BL = ML * (1 - botPercent);
                        PE.push([date, TL, ML, BL]);
                        xData.push(date);
                        yData.push([TL, ML, BL]);
                    }

                    return {
                        values: PE,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A price envelopes indicator. If the [type](#series.priceenvelopes.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.priceenvelopes
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.priceenvelopes
         */

    });
    _registerModule(_modules, 'indicators/psar.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  Parabolic SAR indicator for Highstock
         *
         *  (c) 2010-2019 Grzegorz Blachliński
         *
         *  License: www.highcharts.com/license
         *
         * */



        // Utils:

        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }

        function calculateDirection(previousDirection, low, high, PSAR) {
            if (
                (previousDirection === 1 && low > PSAR) ||
                (previousDirection === -1 && high > PSAR)
            ) {
                return 1;
            }
            return -1;
        }

        /* *
         * Method for calculating acceleration factor
         * dir - direction
         * pDir - previous Direction
         * eP - extreme point
         * pEP - previous extreme point
         * inc - increment for acceleration factor
         * maxAcc - maximum acceleration factor
         * initAcc - initial acceleration factor
         */
        function getAccelerationFactor(dir, pDir, eP, pEP, pAcc, inc, maxAcc, initAcc) {
            if (dir === pDir) {
                if (dir === 1 && (eP > pEP)) {
                    return (pAcc === maxAcc) ? maxAcc : toFixed(pAcc + inc, 2);
                }
                if (dir === -1 && (eP < pEP)) {
                    return (pAcc === maxAcc) ? maxAcc : toFixed(pAcc + inc, 2);
                }
                return pAcc;
            }
            return initAcc;
        }

        function getExtremePoint(high, low, previousDirection, previousExtremePoint) {
            if (previousDirection === 1) {
                return (high > previousExtremePoint) ? high : previousExtremePoint;
            }
            return (low < previousExtremePoint) ? low : previousExtremePoint;
        }

        function getEPMinusPSAR(EP, PSAR) {
            return EP - PSAR;
        }

        function getAccelerationFactorMultiply(accelerationFactor, EPMinusSAR) {
            return accelerationFactor * EPMinusSAR;
        }

        /* *
         * Method for calculating PSAR
         * pdir - previous direction
         * sDir - second previous Direction
         * PSAR - previous PSAR
         * pACCMultiply - previous acceleration factor multiply
         * sLow - second previous low
         * pLow - previous low
         * sHigh - second previous high
         * pHigh - previous high
         * pEP - previous extreme point
         */
        function getPSAR(pdir, sDir, PSAR, pACCMulti, sLow, pLow, pHigh, sHigh, pEP) {
            if (pdir === sDir) {
                if (pdir === 1) {
                    return (PSAR + pACCMulti < Math.min(sLow, pLow)) ?
                        PSAR + pACCMulti :
                        Math.min(sLow, pLow);
                }
                return (PSAR + pACCMulti > Math.max(sHigh, pHigh)) ?
                    PSAR + pACCMulti :
                    Math.max(sHigh, pHigh);
            }
            return pEP;
        }


        /**
         * The Parabolic SAR series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.psar
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'psar',
            'sma',
            /**
             * Parabolic SAR. This series requires `linkedTo`
             * option to be set and should be loaded
             * after `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/psar
             *         Parabolic SAR Indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.psar
             */
            {
                lineWidth: 0,
                marker: {
                    enabled: true
                },
                states: {
                    hover: {
                        lineWidthPlus: 0
                    }
                },
                /**
                 * @excluding period
                 */
                params: {
                    /**
                     * The initial value for acceleration factor.
                     * Acceleration factor is starting with this value
                     * and increases by specified increment each time
                     * the extreme point makes a new high.
                     * AF can reach a maximum of maxAccelerationFactor,
                     * no matter how long the uptrend extends.
                     */
                    initialAccelerationFactor: 0.02,
                    /**
                     * The Maximum value for acceleration factor.
                     * AF can reach a maximum of maxAccelerationFactor,
                     * no matter how long the uptrend extends.
                     */
                    maxAccelerationFactor: 0.2,
                    /**
                     * Acceleration factor increases by increment each time
                     * the extreme point makes a new high.
                     *
                     * @since 6.0.0
                     */
                    increment: 0.02,
                    /**
                     * Index from which PSAR is starting calculation
                     *
                     * @since 6.0.0
                     */
                    index: 2,
                    /**
                     * Number of maximum decimals that are used in PSAR calculations.
                     *
                     * @since 6.0.0
                     */
                    decimals: 4
                }
            }, {
                nameComponents: false,
                getValues: function (series, params) {
                    var xVal = series.xData,
                        yVal = series.yData,
                        // Extreme point is the lowest low for falling and highest high
                        // for rising psar - and we are starting with falling
                        extremePoint = yVal[0][1],
                        accelerationFactor = params.initialAccelerationFactor,
                        maxAccelerationFactor = params.maxAccelerationFactor,
                        increment = params.increment,
                        // Set initial acc factor (for every new trend!)
                        initialAccelerationFactor = params.initialAccelerationFactor,
                        PSAR = yVal[0][2],
                        decimals = params.decimals,
                        index = params.index,
                        PSARArr = [],
                        xData = [],
                        yData = [],
                        previousDirection = 1,
                        direction, EPMinusPSAR, accelerationFactorMultiply,
                        newDirection,
                        prevLow,
                        prevPrevLow,
                        prevHigh,
                        prevPrevHigh,
                        newExtremePoint,
                        high, low, ind;

                    if (index >= yVal.length) {
                        return false;
                    }

                    for (ind = 0; ind < index; ind++) {
                        extremePoint = Math.max(yVal[ind][1], extremePoint);
                        PSAR = Math.min(yVal[ind][2], toFixed(PSAR, decimals));
                    }

                    direction = (yVal[ind][1] > PSAR) ? 1 : -1;
                    EPMinusPSAR = getEPMinusPSAR(extremePoint, PSAR);
                    accelerationFactor = params.initialAccelerationFactor;
                    accelerationFactorMultiply = getAccelerationFactorMultiply(
                        accelerationFactor,
                        EPMinusPSAR
                    );

                    PSARArr.push([xVal[index], PSAR]);
                    xData.push(xVal[index]);
                    yData.push(toFixed(PSAR, decimals));

                    for (ind = index + 1; ind < yVal.length; ind++) {

                        prevLow = yVal[ind - 1][2];
                        prevPrevLow = yVal[ind - 2][2];
                        prevHigh = yVal[ind - 1][1];
                        prevPrevHigh = yVal[ind - 2][1];
                        high = yVal[ind][1];
                        low = yVal[ind][2];

                        // Null points break PSAR
                        if (
                            prevPrevLow !== null &&
                            prevPrevHigh !== null &&
                            prevLow !== null &&
                            prevHigh !== null &&
                            high !== null &&
                            low !== null
                        ) {
                            PSAR = getPSAR(
                                direction,
                                previousDirection,
                                PSAR,
                                accelerationFactorMultiply,
                                prevPrevLow,
                                prevLow,
                                prevHigh,
                                prevPrevHigh,
                                extremePoint
                            );


                            newExtremePoint = getExtremePoint(
                                high,
                                low,
                                direction,
                                extremePoint
                            );
                            newDirection = calculateDirection(
                                previousDirection,
                                low,
                                high,
                                PSAR
                            );
                            accelerationFactor = getAccelerationFactor(
                                newDirection,
                                direction,
                                newExtremePoint,
                                extremePoint,
                                accelerationFactor,
                                increment,
                                maxAccelerationFactor,
                                initialAccelerationFactor
                            );

                            EPMinusPSAR = getEPMinusPSAR(newExtremePoint, PSAR);
                            accelerationFactorMultiply = getAccelerationFactorMultiply(
                                accelerationFactor,
                                EPMinusPSAR
                            );
                            PSARArr.push([xVal[ind], toFixed(PSAR, decimals)]);
                            xData.push(xVal[ind]);
                            yData.push(toFixed(PSAR, decimals));

                            previousDirection = direction;
                            direction = newDirection;
                            extremePoint = newExtremePoint;
                        }
                    }
                    return {
                        values: PSARArr,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `PSAR` series. If the [type](#series.psar.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.psar
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.psar
         */

    });
    _registerModule(_modules, 'indicators/roc.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         * */



        var seriesType = H.seriesType,
            isArray = H.isArray;

        // Utils:
        function populateAverage(xVal, yVal, i, period, index) {
            /* Calculated as:

               (Closing Price [today] - Closing Price [n days ago]) /
                Closing Price [n days ago] * 100

               Return y as null when avoiding division by zero */
            var nDaysAgoY,
                rocY;

            if (index < 0) {
                // y data given as an array of values
                nDaysAgoY = yVal[i - period];
                rocY = nDaysAgoY ?
                    (yVal[i] - nDaysAgoY) / nDaysAgoY * 100 :
                    null;
            } else {
                // y data given as an array of arrays and the index should be used
                nDaysAgoY = yVal[i - period][index];
                rocY = nDaysAgoY ?
                    (yVal[i][index] - nDaysAgoY) / nDaysAgoY * 100 :
                    null;
            }

            return [xVal[i], rocY];
        }

        /**
         * The ROC series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.roc
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'roc',
            'sma',
            /**
             * Rate of change indicator (ROC). The indicator value for each point
             * is defined as:
             *
             * `(C - Cn) / Cn * 100`
             *
             * where: `C` is the close value of the point of the same x in the
             * linked series and `Cn` is the close value of the point `n` periods
             * ago. `n` is set through [period](#plotOptions.roc.params.period).
             *
             * This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/roc
             *         Rate of change indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.roc
             */
            {
                params: {
                    index: 3,
                    period: 9
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Rate of Change',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        ROC = [],
                        xData = [],
                        yData = [],
                        i,
                        index = -1,
                        ROCPoint;

                    // Period is used as a number of time periods ago, so we need more
                    // (at least 1 more) data than the period value
                    if (xVal.length <= period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick / Arearange
                    if (isArray(yVal[0])) {
                        index = params.index;
                    }

                    // i = period <-- skip first N-points
                    // Calculate value one-by-one for each period in visible data
                    for (i = period; i < yValLen; i++) {
                        ROCPoint = populateAverage(xVal, yVal, i, period, index);
                        ROC.push(ROCPoint);
                        xData.push(ROCPoint[0]);
                        yData.push(ROCPoint[1]);
                    }

                    return {
                        values: ROC,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `ROC` series. If the [type](#series.wma.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * Rate of change indicator (ROC). The indicator value for each point
         * is defined as:
         *
         * `(C - Cn) / Cn * 100`
         *
         * where: `C` is the close value of the point of the same x in the
         * linked series and `Cn` is the close value of the point `n` periods
         * ago. `n` is set through [period](#series.roc.params.period).
         *
         * This series requires `linkedTo` option to be set.
         *
         * @extends   series,plotOptions.roc
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.roc
         */

    });
    _registerModule(_modules, 'indicators/rsi.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray;

        // Utils:
        function toFixed(a, n) {
            return parseFloat(a.toFixed(n));
        }

        /**
         * The RSI series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.rsi
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'rsi',
            'sma',
            /**
             * Relative strength index (RSI) technical indicator. This series
             * requires the `linkedTo` option to be set and should be loaded after
             * the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/rsi
             *         RSI indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.rsi
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 14,
                    /**
                     * Number of maximum decimals that are used in RSI calculations.
                     */
                    decimals: 4
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        decimals = params.decimals,
                        // RSI starts calculations from the second point
                        // Cause we need to calculate change between two points
                        range = 1,
                        RSI = [],
                        xData = [],
                        yData = [],
                        index = 3,
                        gain = 0,
                        loss = 0,
                        RSIPoint, change, avgGain, avgLoss, i;

                    // RSI requires close value
                    if (
                        (xVal.length < period) || !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    // Calculate changes for first N points
                    while (range < period) {
                        change = toFixed(
                            yVal[range][index] - yVal[range - 1][index],
                            decimals
                        );

                        if (change > 0) {
                            gain += change;
                        } else {
                            loss += Math.abs(change);
                        }

                        range++;
                    }

                    // Average for first n-1 points:
                    avgGain = toFixed(gain / (period - 1), decimals);
                    avgLoss = toFixed(loss / (period - 1), decimals);

                    for (i = range; i < yValLen; i++) {
                        change = toFixed(yVal[i][index] - yVal[i - 1][index], decimals);

                        if (change > 0) {
                            gain = change;
                            loss = 0;
                        } else {
                            gain = 0;
                            loss = Math.abs(change);
                        }

                        // Calculate smoothed averages, RS, RSI values:
                        avgGain = toFixed(
                            (avgGain * (period - 1) + gain) / period,
                            decimals
                        );
                        avgLoss = toFixed(
                            (avgLoss * (period - 1) + loss) / period,
                            decimals
                        );
                        // If average-loss is equal zero, then by definition RSI is set
                        // to 100:
                        if (avgLoss === 0) {
                            RSIPoint = 100;
                        // If average-gain is equal zero, then by definition RSI is set
                        // to 0:
                        } else if (avgGain === 0) {
                            RSIPoint = 0;
                        } else {
                            RSIPoint = toFixed(
                                100 - (100 / (1 + (avgGain / avgLoss))),
                                decimals
                            );
                        }

                        RSI.push([xVal[i], RSIPoint]);
                        xData.push(xVal[i]);
                        yData.push(RSIPoint);
                    }

                    return {
                        values: RSI,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `RSI` series. If the [type](#series.rsi.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.rsi
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.rsi
         */

    });
    _registerModule(_modules, 'indicators/stochastic.src.js', [_modules['parts/Globals.js'], _modules['mixins/reduce-array.js'], _modules['mixins/multipe-lines.js']], function (H, reduceArrayMixin, multipleLinesMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var merge = H.merge,
            isArray = H.isArray,
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
    _registerModule(_modules, 'indicators/supertrend.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var ATR = H.seriesTypes.atr,
            SMA = H.seriesTypes.sma,
            isArray = H.isArray,
            merge = H.merge,
            correctFloat = H.correctFloat;

        // Utils:
        function createPointObj(mainSeries, index, close) {
            return {
                index: index,
                close: mainSeries.yData[index][close],
                x: mainSeries.xData[index]
            };
        }

        /**
         * The Supertrend series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.supertrend
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'supertrend',
            'sma',
            /**
             * Supertrend indicator. This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js` and
             * `stock/indicators/sma.js`.
             *
             * @sample {highstock} stock/indicators/supertrend
             *         Supertrend indicator
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, color, cropThreshold, negativeColor, colorAxis,
             *               joinBy, keys, navigatorOptions, pointInterval,
             *               pointIntervalUnit, pointPlacement, pointRange, pointStart,
             *               showInNavigator, stacking, threshold
             * @optionparent plotOptions.supertrend
             */
            {
                /**
                 * Paramters used in calculation of Supertrend indicator series points.
                 *
                 * @excluding index
                 */
                params: {
                    /**
                     * Multiplier for Supertrend Indicator.
                     */
                    multiplier: 3,
                    /**
                     * The base period for indicator Supertrend Indicator calculations.
                     * This is the number of data points which are taken into account
                     * for the indicator calculations.
                     */
                    period: 10
                },
                /**
                 * Color of the Supertrend series line that is beneath the main series.
                 *
                 * @sample {highstock} stock/indicators/supertrend/
                 *         Example with risingTrendColor
                 *
                 * @type {Highcharts.ColorString}
                 */
                risingTrendColor: '#06B535',
                /**
                 * Color of the Supertrend series line that is above the main series.
                 *
                 * @sample {highstock} stock/indicators/supertrend/
                 *         Example with fallingTrendColor
                 *
                 * @type {Highcharts.ColorString}
                 */
                fallingTrendColor: '#F21313',
                /**
                 * The styles for the Supertrend line that intersect main series.
                 *
                 * @sample {highstock} stock/indicators/supertrend/
                 *         Example with changeTrendLine
                 */
                changeTrendLine: {
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
                        lineColor: '#333333',

                        /**
                         * The dash or dot style of the grid lines. For possible
                         * values, see
                         * [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
                         *
                         * @sample {highcharts} highcharts/yaxis/gridlinedashstyle/
                         *         Long dashes
                         * @sample {highstock} stock/xaxis/gridlinedashstyle/
                         *         Long dashes
                         *
                         * @type  {Highcharts.DashStyleValue}
                         * @since 7.0.0
                         */
                        dashStyle: 'LongDash'
                    }
                }
            },
            /**
             * @lends Highcharts.Series.prototype
             */
            {
                nameBase: 'Supertrend',
                nameComponents: ['multiplier', 'period'],
                requiredIndicators: ['atr'],
                init: function () {
                    var options,
                        parentOptions;

                    SMA.prototype.init.apply(this, arguments);

                    options = this.options;
                    parentOptions = this.linkedParent.options;

                    // Indicator cropThreshold has to be equal linked series one
                    // reduced by period due to points comparison in drawGraph method
                    // (#9787)
                    options.cropThreshold =
                        parentOptions.cropThreshold - (options.params.period - 1);
                },
                drawGraph: function () {
                    var indicator = this,
                        indicOptions = indicator.options,

                        // Series that indicator is linked to
                        mainSeries = indicator.linkedParent,
                        mainLinePoints = mainSeries ? mainSeries.points : [],
                        indicPoints = indicator.points,
                        indicPath = indicator.graph,
                        indicPointsLen = indicPoints.length,

                        // Points offset between lines
                        tempOffset = mainLinePoints.length - indicPointsLen,
                        offset = tempOffset > 0 ? tempOffset : 0,
                        gappedExtend = {
                            options: {
                                gapSize: indicOptions.gapSize
                            }
                        },

                        // Sorted supertrend points array
                        groupedPoitns = {
                            top: [], // Rising trend line points
                            bottom: [], // Falling trend line points
                            intersect: [] // Change trend line points
                        },

                        // Options for trend lines
                        supertrendLineOptions = {
                            top: {
                                styles: {
                                    lineWidth: indicOptions.lineWidth,
                                    lineColor: indicOptions.fallingTrendColor,
                                    dashStyle: indicOptions.dashStyle
                                }
                            },
                            bottom: {
                                styles: {
                                    lineWidth: indicOptions.lineWidth,
                                    lineColor: indicOptions.risingTrendColor,
                                    dashStyle: indicOptions.dashStyle
                                }
                            },
                            intersect: indicOptions.changeTrendLine
                        },
                        close = 3,

                        // Supertrend line point
                        point,

                        // Supertrend line next point (has smaller x pos than point)
                        nextPoint,

                        // Main series points
                        mainPoint,
                        nextMainPoint,

                        // Used when supertrend and main points are shifted
                        // relative to each other
                        prevMainPoint,
                        prevPrevMainPoint,

                        // Used when particular point color is set
                        pointColor,

                        // Temporary points that fill groupedPoitns array
                        newPoint,
                        newNextPoint;

                    // Loop which sort supertrend points
                    while (indicPointsLen--) {
                        point = indicPoints[indicPointsLen];
                        nextPoint = indicPoints[indicPointsLen - 1];
                        mainPoint = mainLinePoints[indicPointsLen - 1 + offset];
                        nextMainPoint = mainLinePoints[indicPointsLen - 2 + offset];
                        prevMainPoint = mainLinePoints[indicPointsLen + offset];
                        prevPrevMainPoint = mainLinePoints[indicPointsLen + offset + 1];
                        pointColor = point.options.color;
                        newPoint = {
                            x: point.x,
                            plotX: point.plotX,
                            plotY: point.plotY,
                            isNull: false
                        };

                        // When mainPoint is the last one (left plot area edge)
                        // but supertrend has additional one
                        if (
                            !nextMainPoint &&
                            mainPoint &&
                            mainSeries.yData[mainPoint.index - 1]
                        ) {
                            nextMainPoint = createPointObj(
                                mainSeries, mainPoint.index - 1, close
                            );
                        }

                        // When prevMainPoint is the last one (right plot area edge)
                        // but supertrend has additional one (and points are shifted)
                        if (
                            !prevPrevMainPoint &&
                            prevMainPoint &&
                            mainSeries.yData[prevMainPoint.index + 1]
                        ) {
                            prevPrevMainPoint = createPointObj(
                                mainSeries, prevMainPoint.index + 1, close
                            );
                        }

                        // When points are shifted (right or left plot area edge)
                        if (
                            !mainPoint &&
                            nextMainPoint &&
                            mainSeries.yData[nextMainPoint.index + 1]
                        ) {
                            mainPoint = createPointObj(
                                mainSeries, nextMainPoint.index + 1, close
                            );
                        } else if (
                            !mainPoint &&
                            prevMainPoint &&
                            mainSeries.yData[prevMainPoint.index - 1]
                        ) {
                            mainPoint = createPointObj(
                                mainSeries, prevMainPoint.index - 1, close
                            );
                        }

                        // Check if points are shifted relative to each other
                        if (
                            point &&
                            mainPoint &&
                            prevMainPoint &&
                            nextMainPoint &&
                            point.x !== mainPoint.x
                        ) {
                            if (point.x === prevMainPoint.x) {
                                nextMainPoint = mainPoint;
                                mainPoint = prevMainPoint;
                            } else if (point.x === nextMainPoint.x) {
                                mainPoint = nextMainPoint;
                                nextMainPoint = {
                                    close: mainSeries.yData[mainPoint.index - 1][close],
                                    x: mainSeries.xData[mainPoint.index - 1]
                                };
                            } else if (
                                prevPrevMainPoint && point.x === prevPrevMainPoint.x
                            ) {
                                mainPoint = prevPrevMainPoint;
                                nextMainPoint = prevMainPoint;
                            }
                        }

                        if (nextPoint && nextMainPoint && mainPoint) {

                            newNextPoint = {
                                x: nextPoint.x,
                                plotX: nextPoint.plotX,
                                plotY: nextPoint.plotY,
                                isNull: false
                            };

                            if (
                                point.y >= mainPoint.close &&
                                nextPoint.y >= nextMainPoint.close
                            ) {
                                point.color =
                                    pointColor || indicOptions.fallingTrendColor;
                                groupedPoitns.top.push(newPoint);

                            } else if (
                                point.y < mainPoint.close &&
                                nextPoint.y < nextMainPoint.close
                            ) {
                                point.color =
                                    pointColor || indicOptions.risingTrendColor;
                                groupedPoitns.bottom.push(newPoint);

                            } else {
                                groupedPoitns.intersect.push(newPoint);
                                groupedPoitns.intersect.push(newNextPoint);

                                // Additional null point to make a gap in line
                                groupedPoitns.intersect.push(merge(newNextPoint, {
                                    isNull: true
                                }));

                                if (
                                    point.y >= mainPoint.close &&
                                    nextPoint.y < nextMainPoint.close
                                ) {
                                    point.color =
                                        pointColor || indicOptions.fallingTrendColor;
                                    nextPoint.color =
                                        pointColor || indicOptions.risingTrendColor;
                                    groupedPoitns.top.push(newPoint);
                                    groupedPoitns.top.push(merge(newNextPoint, {
                                        isNull: true
                                    }));
                                } else if (
                                    point.y < mainPoint.close &&
                                    nextPoint.y >= nextMainPoint.close
                                ) {
                                    point.color =
                                        pointColor || indicOptions.risingTrendColor;
                                    nextPoint.color =
                                        pointColor || indicOptions.fallingTrendColor;
                                    groupedPoitns.bottom.push(newPoint);
                                    groupedPoitns.bottom.push(merge(newNextPoint, {
                                        isNull: true
                                    }));
                                }
                            }
                        } else if (mainPoint) {
                            if (point.y >= mainPoint.close) {
                                point.color =
                                    pointColor || indicOptions.fallingTrendColor;
                                groupedPoitns.top.push(newPoint);
                            } else {
                                point.color =
                                    pointColor || indicOptions.risingTrendColor;
                                groupedPoitns.bottom.push(newPoint);
                            }
                        }
                    }

                    // Generate lines:
                    H.objectEach(groupedPoitns, function (values, lineName) {
                        indicator.points = values;
                        indicator.options = merge(
                            supertrendLineOptions[lineName].styles,
                            gappedExtend
                        );
                        indicator.graph = indicator['graph' + lineName + 'Line'];
                        SMA.prototype.drawGraph.call(indicator);

                        // Now save line
                        indicator['graph' + lineName + 'Line'] = indicator.graph;
                    });

                    // Restore options:
                    indicator.points = indicPoints;
                    indicator.options = indicOptions;
                    indicator.graph = indicPath;
                },

                // Supertrend (Multiplier, Period) Formula:

                // BASIC UPPERBAND = (HIGH + LOW) / 2 + Multiplier * ATR(Period)
                // BASIC LOWERBAND = (HIGH + LOW) / 2 - Multiplier * ATR(Period)

                // FINAL UPPERBAND =
                //     IF(
                //      Current BASICUPPERBAND  < Previous FINAL UPPERBAND AND
                //      Previous Close > Previous FINAL UPPERBAND
                //     ) THEN (Current BASIC UPPERBAND)
                //     ELSE (Previous FINALUPPERBAND)

                // FINAL LOWERBAND =
                //     IF(
                //      Current BASIC LOWERBAND  > Previous FINAL LOWERBAND AND
                //      Previous Close < Previous FINAL LOWERBAND
                //     ) THEN (Current BASIC LOWERBAND)
                //     ELSE (Previous FINAL LOWERBAND)

                // SUPERTREND =
                //     IF(
                //      Previous Supertrend == Previous FINAL UPPERBAND AND
                //      Current Close < Current FINAL UPPERBAND
                //     ) THAN Current FINAL UPPERBAND
                //     ELSE IF(
                //      Previous Supertrend == Previous FINAL LOWERBAND AND
                //      Current Close < Current FINAL LOWERBAND
                //     ) THAN Current FINAL UPPERBAND
                //     ELSE IF(
                //      Previous Supertrend == Previous FINAL UPPERBAND AND
                //      Current Close > Current FINAL UPPERBAND
                //     ) THAN Current FINAL LOWERBAND
                //     ELSE IF(
                //      Previous Supertrend == Previous FINAL LOWERBAND AND
                //      Current Close > Current FINAL LOWERBAND
                //     ) THAN Current FINAL LOWERBAND


                getValues: function (series, params) {
                    var period = params.period,
                        multiplier = params.multiplier,
                        xVal = series.xData,
                        yVal = series.yData,
                        ATRData = [],
                        ST = [], // 0- date, 1- Supertrend indicator
                        xData = [],
                        yData = [],
                        close = 3,
                        low = 2,
                        high = 1,
                        periodsOffset = (period === 0) ? 0 : period - 1,
                        basicUp,
                        basicDown,
                        finalUp = [],
                        finalDown = [],
                        supertrend,
                        prevFinalUp,
                        prevFinalDown,
                        prevST, // previous Supertrend
                        prevY,
                        y,
                        i;

                    if (
                        (xVal.length <= period) || !isArray(yVal[0]) ||
                        yVal[0].length !== 4 || period < 0
                    ) {
                        return false;
                    }

                    ATRData = ATR.prototype.getValues.call(this, series, {
                        period: period
                    }).yData;

                    for (i = 0; i < ATRData.length; i++) {
                        y = yVal[periodsOffset + i];
                        prevY = yVal[periodsOffset + i - 1] || [];
                        prevFinalUp = finalUp[i - 1];
                        prevFinalDown = finalDown[i - 1];
                        prevST = yData[i - 1];

                        if (i === 0) {
                            prevFinalUp = prevFinalDown = prevST = 0;
                        }

                        basicUp = correctFloat(
                            (y[high] + y[low]) / 2 + multiplier * ATRData[i]
                        );
                        basicDown = correctFloat(
                            (y[high] + y[low]) / 2 - multiplier * ATRData[i]
                        );

                        if (
                            (basicUp < prevFinalUp) ||
                            (prevY[close] > prevFinalUp)
                        ) {
                            finalUp[i] = basicUp;
                        } else {
                            finalUp[i] = prevFinalUp;
                        }

                        if (
                            (basicDown > prevFinalDown) ||
                            (prevY[close] < prevFinalDown)
                        ) {
                            finalDown[i] = basicDown;
                        } else {
                            finalDown[i] = prevFinalDown;
                        }

                        if (prevST === prevFinalUp && y[close] < finalUp[i] ||
                            prevST === prevFinalDown && y[close] < finalDown[i]
                        ) {
                            supertrend = finalUp[i];
                        } else if (
                            prevST === prevFinalUp && y[close] > finalUp[i] ||
                            prevST === prevFinalDown && y[close] > finalDown[i]
                        ) {
                            supertrend = finalDown[i];
                        }

                        ST.push([xVal[periodsOffset + i], supertrend]);
                        xData.push(xVal[periodsOffset + i]);
                        yData.push(supertrend);
                    }

                    return {
                        values: ST,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Supertrend indicator` series. If the [type](#series.supertrend.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.supertrend
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, color, colorAxis, cropThreshold, data, dataParser,
         *            dataURL, joinBy, keys, navigatorOptions, negativeColor,
         *            pointInterval, pointIntervalUnit, pointPlacement, pointRange,
         *            pointStart, showInNavigator, stacking, threshold
         * @apioption series.supertrend
         */

    });
    _registerModule(_modules, 'indicators/volume-by-price.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Paweł Dalek
         *
         *  Volume By Price (VBP) indicator for Highstock
         *
         *  License: www.highcharts.com/license
         *
         * */



        // Utils
        function arrayExtremesOHLC(data) {
            var dataLength = data.length,
                min = data[0][3],
                max = min,
                i = 1,
                currentPoint;

            for (; i < dataLength; i++) {
                currentPoint = data[i][3];
                if (currentPoint < min) {
                    min = currentPoint;
                }

                if (currentPoint > max) {
                    max = currentPoint;
                }
            }

            return {
                min: min,
                max: max
            };
        }

        var abs = Math.abs,
            noop = H.noop,
            addEvent = H.addEvent,
            correctFloat = H.correctFloat,
            seriesType = H.seriesType,
            columnPrototype = H.seriesTypes.column.prototype;

        /**
         * The Volume By Price (VBP) series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.vbp
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'vbp',
            'sma',
            /**
             * Volume By Price indicator.
             *
             * This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/volume-by-price
             *         Volume By Price indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.vbp
             */
            {
                /**
                 * @excluding index, period
                 */
                params: {
                    /**
                     * The number of price zones.
                     */
                    ranges: 12,
                    /**
                     * The id of volume series which is mandatory. For example using
                     * OHLC data, volumeSeriesID='volume' means the indicator will be
                     * calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume'
                },
                /**
                 * The styles for lines which determine price zones.
                 */
                zoneLines: {
                    /**
                     * Enable/disable zone lines.
                     */
                    enabled: true,
                    /**
                     * Specify the style of zone lines.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"color": "#0A9AC9", "dashStyle": "LongDash", "lineWidth": 1}
                     */
                    styles: {
                        /** @ignore-options */
                        color: '#0A9AC9',
                        /** @ignore-options */
                        dashStyle: 'LongDash',
                        /** @ignore-options */
                        lineWidth: 1
                    }
                },
                /**
                 * The styles for bars when volume is divided into positive/negative.
                 */
                volumeDivision: {
                    /**
                     * Option to control if volume is divided.
                     */
                    enabled: true,
                    styles: {
                        /**
                         * Color of positive volume bars.
                         *
                         * @type {Highcharts.ColorString}
                         */
                        positiveColor: 'rgba(144, 237, 125, 0.8)',
                        /**
                         * Color of negative volume bars.
                         *
                         * @type {Highcharts.ColorString}
                         */
                        negativeColor: 'rgba(244, 91, 91, 0.8)'
                    }
                },
                // To enable series animation; must be animationLimit > pointCount
                animationLimit: 1000,
                enableMouseTracking: false,
                pointPadding: 0,
                zIndex: -1,
                crisp: true,
                dataGrouping: {
                    enabled: false
                },
                dataLabels: {
                    /** @ignore-option */
                    allowOverlap: true,
                    /** @ignore-option */
                    enabled: true,
                    /** @ignore-option */
                    format: 'P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}',
                    /** @ignore-option */
                    padding: 0,
                    /** @ignore-option */
                    style: {
                        fontSize: '7px'
                    },
                    /** @ignore-option */
                    verticalAlign: 'top'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Volume by Price',
                bindTo: {
                    series: false,
                    eventName: 'afterSetExtremes'
                },
                calculateOn: 'render',
                markerAttribs: noop,
                drawGraph: noop,
                getColumnMetrics: columnPrototype.getColumnMetrics,
                crispCol: columnPrototype.crispCol,
                init: function (chart) {
                    var indicator = this,
                        params,
                        baseSeries,
                        volumeSeries;

                    H.seriesTypes.sma.prototype.init.apply(indicator, arguments);

                    params = indicator.options.params;
                    baseSeries = indicator.linkedParent;
                    volumeSeries = chart.get(params.volumeSeriesID);

                    indicator.addCustomEvents(baseSeries, volumeSeries);

                    return indicator;
                },
                // Adds events related with removing series
                addCustomEvents: function (baseSeries, volumeSeries) {
                    var indicator = this;

                    function toEmptyIndicator() {
                        indicator.chart.redraw();

                        indicator.setData([]);
                        indicator.zoneStarts = [];

                        if (indicator.zoneLinesSVG) {
                            indicator.zoneLinesSVG.destroy();
                            delete indicator.zoneLinesSVG;
                        }
                    }

                    // If base series is deleted, indicator series data is filled with
                    // an empty array
                    indicator.dataEventsToUnbind.push(
                        addEvent(baseSeries, 'remove', function () {
                            toEmptyIndicator();
                        })
                    );

                    // If volume series is deleted, indicator series data is filled with
                    // an empty array
                    if (volumeSeries) {
                        indicator.dataEventsToUnbind.push(
                            addEvent(volumeSeries, 'remove', function () {
                                toEmptyIndicator();
                            })
                        );
                    }

                    return indicator;
                },
                // Initial animation
                animate: function (init) {
                    var series = this,
                        attr = {};

                    if (H.svg && !init) {
                        attr.translateX = series.yAxis.pos;
                        series.group.animate(
                            attr,
                            H.extend(H.animObject(series.options.animation), {
                                step: function (val, fx) {
                                    series.group.attr({
                                        scaleX: Math.max(0.001, fx.pos)
                                    });
                                }
                            })
                        );

                        // Delete this function to allow it only once
                        series.animate = null;
                    }
                },
                drawPoints: function () {
                    var indicator = this;

                    if (indicator.options.volumeDivision.enabled) {
                        indicator.posNegVolume(true, true);
                        columnPrototype.drawPoints.apply(indicator, arguments);
                        indicator.posNegVolume(false, false);
                    }

                    columnPrototype.drawPoints.apply(indicator, arguments);
                },
                // Function responsible for dividing volume into positive and negative
                posNegVolume: function (initVol, pos) {
                    var indicator = this,
                        signOrder = pos ?
                            ['positive', 'negative'] :
                            ['negative', 'positive'],
                        volumeDivision = indicator.options.volumeDivision,
                        pointLength = indicator.points.length,
                        posWidths = [],
                        negWidths = [],
                        i = 0,
                        pointWidth,
                        priceZone,
                        wholeVol,
                        point;

                    if (initVol) {
                        indicator.posWidths = posWidths;
                        indicator.negWidths = negWidths;
                    } else {
                        posWidths = indicator.posWidths;
                        negWidths = indicator.negWidths;
                    }

                    for (; i < pointLength; i++) {
                        point = indicator.points[i];
                        point[signOrder[0] + 'Graphic'] = point.graphic;
                        point.graphic = point[signOrder[1] + 'Graphic'];

                        if (initVol) {
                            pointWidth = point.shapeArgs.width;
                            priceZone = indicator.priceZones[i];
                            wholeVol = priceZone.wholeVolumeData;

                            if (wholeVol) {
                                posWidths.push(
                                    pointWidth / wholeVol * priceZone.positiveVolumeData
                                );
                                negWidths.push(
                                    pointWidth / wholeVol * priceZone.negativeVolumeData
                                );
                            } else {
                                posWidths.push(0);
                                negWidths.push(0);
                            }
                        }

                        point.color = pos ?
                            volumeDivision.styles.positiveColor :
                            volumeDivision.styles.negativeColor;
                        point.shapeArgs.width = pos ?
                            indicator.posWidths[i] :
                            indicator.negWidths[i];
                        point.shapeArgs.x = pos ?
                            point.shapeArgs.x :
                            indicator.posWidths[i];
                    }
                },
                translate: function () {
                    var indicator = this,
                        options = indicator.options,
                        chart = indicator.chart,
                        yAxis = indicator.yAxis,
                        yAxisMin = yAxis.min,
                        zoneLinesOptions = indicator.options.zoneLines,
                        priceZones = indicator.priceZones,
                        yBarOffset = 0,
                        indicatorPoints,
                        volumeDataArray,
                        maxVolume,
                        primalBarWidth,
                        barHeight,
                        barHeightP,
                        oldBarHeight,
                        barWidth,
                        pointPadding,
                        chartPlotTop,
                        barX,
                        barY;

                    columnPrototype.translate.apply(indicator);
                    indicatorPoints = indicator.points;

                    // Do translate operation when points exist
                    if (indicatorPoints.length) {
                        pointPadding = options.pointPadding < 0.5 ?
                            options.pointPadding :
                            0.1;
                        volumeDataArray = indicator.volumeDataArray;
                        maxVolume = H.arrayMax(volumeDataArray);
                        primalBarWidth = chart.plotWidth / 2;
                        chartPlotTop = chart.plotTop;
                        barHeight = abs(yAxis.toPixels(yAxisMin) -
                            yAxis.toPixels(yAxisMin + indicator.rangeStep));
                        oldBarHeight = abs(yAxis.toPixels(yAxisMin) -
                            yAxis.toPixels(yAxisMin + indicator.rangeStep));

                        if (pointPadding) {
                            barHeightP = abs(barHeight * (1 - 2 * pointPadding));
                            yBarOffset = abs((barHeight - barHeightP) / 2);
                            barHeight = abs(barHeightP);
                        }

                        indicatorPoints.forEach(function (point, index) {
                            barX = point.barX = point.plotX = 0;
                            barY = point.plotY = (
                                yAxis.toPixels(priceZones[index].start) -
                                chartPlotTop -
                                (
                                    yAxis.reversed ?
                                        (barHeight - oldBarHeight) :
                                        barHeight
                                ) -
                                yBarOffset
                            );
                            barWidth = correctFloat(
                                primalBarWidth *
                                priceZones[index].wholeVolumeData / maxVolume
                            );
                            point.pointWidth = barWidth;

                            point.shapeArgs = indicator.crispCol.apply( // eslint-disable-line no-useless-call
                                indicator,
                                [barX, barY, barWidth, barHeight]
                            );

                            point.volumeNeg = priceZones[index].negativeVolumeData;
                            point.volumePos = priceZones[index].positiveVolumeData;
                            point.volumeAll = priceZones[index].wholeVolumeData;
                        });

                        if (zoneLinesOptions.enabled) {
                            indicator.drawZones(
                                chart,
                                yAxis,
                                indicator.zoneStarts,
                                zoneLinesOptions.styles
                            );
                        }
                    }
                },
                getValues: function (series, params) {
                    var indicator = this,
                        xValues = series.processedXData,
                        yValues = series.processedYData,
                        chart = indicator.chart,
                        ranges = params.ranges,
                        VBP = [],
                        xData = [],
                        yData = [],
                        isOHLC,
                        volumeSeries,
                        priceZones;

                    // Checks if base series exists
                    if (!series.chart) {
                        return H.error(
                            'Base series not found! In case it has been removed, add ' +
                            'a new one.',
                            true,
                            chart
                        );
                    }

                    // Checks if volume series exists
                    if (!(volumeSeries = chart.get(params.volumeSeriesID))) {
                        return H.error(
                            'Series ' +
                            params.volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            chart
                        );
                    }

                    // Checks if series data fits the OHLC format
                    isOHLC = H.isArray(yValues[0]);

                    if (isOHLC && yValues[0].length !== 4) {
                        return H.error(
                            'Type of ' +
                            series.name +
                            ' series is different than line, OHLC or candlestick.',
                            true,
                            chart
                        );
                    }

                    // Price zones contains all the information about the zones (index,
                    // start, end, volumes, etc.)
                    priceZones = indicator.priceZones = indicator.specifyZones(
                        isOHLC,
                        xValues,
                        yValues,
                        ranges,
                        volumeSeries
                    );

                    priceZones.forEach(function (zone, index) {
                        VBP.push([zone.x, zone.end]);
                        xData.push(VBP[index][0]);
                        yData.push(VBP[index][1]);
                    });

                    return {
                        values: VBP,
                        xData: xData,
                        yData: yData
                    };
                },
                // Specifing where each zone should start ans end
                specifyZones: function (
                    isOHLC,
                    xValues,
                    yValues,
                    ranges,
                    volumeSeries
                ) {
                    var indicator = this,
                        rangeExtremes = isOHLC ? arrayExtremesOHLC(yValues) : false,
                        lowRange = rangeExtremes ?
                            rangeExtremes.min :
                            H.arrayMin(yValues),
                        highRange = rangeExtremes ?
                            rangeExtremes.max :
                            H.arrayMax(yValues),
                        zoneStarts = indicator.zoneStarts = [],
                        priceZones = [],
                        i = 0,
                        j = 1,
                        rangeStep,
                        zoneStartsLength;

                    if (!lowRange || !highRange) {
                        if (this.points.length) {
                            this.setData([]);
                            this.zoneStarts = [];
                            this.zoneLinesSVG.destroy();
                        }
                        return [];
                    }

                    rangeStep = indicator.rangeStep =
                        correctFloat(highRange - lowRange) / ranges;
                    zoneStarts.push(lowRange);

                    for (; i < ranges - 1; i++) {
                        zoneStarts.push(correctFloat(zoneStarts[i] + rangeStep));
                    }

                    zoneStarts.push(highRange);
                    zoneStartsLength = zoneStarts.length;

                    //    Creating zones
                    for (; j < zoneStartsLength; j++) {
                        priceZones.push({
                            index: j - 1,
                            x: xValues[0],
                            start: zoneStarts[j - 1],
                            end: zoneStarts[j]
                        });
                    }

                    return indicator.volumePerZone(
                        isOHLC,
                        priceZones,
                        volumeSeries,
                        xValues,
                        yValues
                    );
                },
                // Calculating sum of volume values for a specific zone
                volumePerZone: function (
                    isOHLC,
                    priceZones,
                    volumeSeries,
                    xValues,
                    yValues
                ) {
                    var indicator = this,
                        volumeXData = volumeSeries.processedXData,
                        volumeYData = volumeSeries.processedYData,
                        lastZoneIndex = priceZones.length - 1,
                        baseSeriesLength = yValues.length,
                        volumeSeriesLength = volumeYData.length,
                        previousValue,
                        startFlag,
                        endFlag,
                        value,
                        i;

                    // Checks if each point has a corresponding volume value
                    if (abs(baseSeriesLength - volumeSeriesLength)) {
                        // If the first point don't have volume, add 0 value at the
                        // beggining of the volume array
                        if (xValues[0] !== volumeXData[0]) {
                            volumeYData.unshift(0);
                        }

                        // If the last point don't have volume, add 0 value at the end
                        // of the volume array
                        if (
                            xValues[baseSeriesLength - 1] !==
                            volumeXData[volumeSeriesLength - 1]
                        ) {
                            volumeYData.push(0);
                        }
                    }

                    indicator.volumeDataArray = [];

                    priceZones.forEach(function (zone) {
                        zone.wholeVolumeData = 0;
                        zone.positiveVolumeData = 0;
                        zone.negativeVolumeData = 0;

                        for (i = 0; i < baseSeriesLength; i++) {
                            startFlag = false;
                            endFlag = false;
                            value = isOHLC ? yValues[i][3] : yValues[i];
                            previousValue = i ?
                                (isOHLC ? yValues[i - 1][3] : yValues[i - 1]) :
                                value;

                            // Checks if this is the point with the lowest close value
                            // and if so, adds it calculations
                            if (value <= zone.start && zone.index === 0) {
                                startFlag = true;
                            }

                            // Checks if this is the point with the highest close value
                            // and if so, adds it calculations
                            if (value >= zone.end && zone.index === lastZoneIndex) {
                                endFlag = true;
                            }

                            if (
                                (value > zone.start || startFlag) &&
                                (value < zone.end || endFlag)
                            ) {
                                zone.wholeVolumeData += volumeYData[i];

                                if (previousValue > value) {
                                    zone.negativeVolumeData += volumeYData[i];
                                } else {
                                    zone.positiveVolumeData += volumeYData[i];
                                }
                            }
                        }
                        indicator.volumeDataArray.push(zone.wholeVolumeData);
                    });

                    return priceZones;
                },
                // Function responsoble for drawing additional lines indicating zones
                drawZones: function (chart, yAxis, zonesValues, zonesStyles) {
                    var indicator = this,
                        renderer = chart.renderer,
                        zoneLinesSVG = indicator.zoneLinesSVG,
                        zoneLinesPath = [],
                        leftLinePos = 0,
                        rightLinePos = chart.plotWidth,
                        verticalOffset = chart.plotTop,
                        verticalLinePos;

                    zonesValues.forEach(function (value) {
                        verticalLinePos = yAxis.toPixels(value) - verticalOffset;
                        zoneLinesPath = zoneLinesPath.concat(chart.renderer.crispLine([
                            'M',
                            leftLinePos,
                            verticalLinePos,
                            'L',
                            rightLinePos,
                            verticalLinePos
                        ], zonesStyles.lineWidth));
                    });

                    // Create zone lines one path or update it while animating
                    if (zoneLinesSVG) {
                        zoneLinesSVG.animate({
                            d: zoneLinesPath
                        });
                    } else {
                        zoneLinesSVG = indicator.zoneLinesSVG =
                            renderer.path(zoneLinesPath).attr({
                                'stroke-width': zonesStyles.lineWidth,
                                'stroke': zonesStyles.color,
                                'dashstyle': zonesStyles.dashStyle,
                                'zIndex': indicator.group.zIndex + 0.1
                            })
                                .add(indicator.group);
                    }
                }
            },
            /**
             * @lends Highcharts.Point#
             */
            {
                // Required for destroying negative part of volume
                destroy: function () {
                    if (this.negativeGraphic) {
                        this.negativeGraphic = this.negativeGraphic.destroy();
                    }
                    return H.Point.prototype.destroy.apply(this, arguments);
                }
            }
        );

        /**
         * A `Volume By Price (VBP)` series. If the [type](#series.vbp.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.vbp
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.vbp
         */

    });
    _registerModule(_modules, 'indicators/vwap.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Paweł Dalek
         *
         *  Volume Weighted Average Price (VWAP) indicator for Highstock
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType;

        /**
         * The Volume Weighted Average Price (VWAP) series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.vwap
         *
         * @augments Highcharts.Series
         */
        seriesType('vwap', 'sma',
            /**
             * Volume Weighted Average Price indicator.
             *
             * This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/vwap
             *         Volume Weighted Average Price indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.vwap
             */
            {
                /**
                 * @excluding index
                 */
                params: {
                    period: 30,
                    /**
                     * The id of volume series which is mandatory. For example using
                     * OHLC data, volumeSeriesID='volume' means the indicator will be
                     * calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                /**
                 * Returns the final values of the indicator ready to be presented on a
                 * chart
                 * @private
                 * @param {Highcharts.Series} series - series for indicator
                 * @param {object} params - params
                 * @return {object} - computed VWAP
                 **/
                getValues: function (series, params) {
                    var indicator = this,
                        chart = series.chart,
                        xValues = series.xData,
                        yValues = series.yData,
                        period = params.period,
                        isOHLC = true,
                        volumeSeries;

                    // Checks if volume series exists
                    if (!(volumeSeries = chart.get(params.volumeSeriesID))) {
                        return H.error(
                            'Series ' +
                            params.volumeSeriesID +
                            ' not found! Check `volumeSeriesID`.',
                            true,
                            chart
                        );
                    }

                    // Checks if series data fits the OHLC format
                    if (!(isArray(yValues[0]))) {
                        isOHLC = false;
                    }

                    return indicator.calculateVWAPValues(
                        isOHLC,
                        xValues,
                        yValues,
                        volumeSeries,
                        period
                    );
                },
                /**
                 * Main algorithm used to calculate Volume Weighted Average Price (VWAP)
                 * values
                 * @private
                 * @param {boolean} isOHLC - says if data has OHLC format
                 * @param {Array<number>} xValues - array of timestamps
                 * @param {Array<number|Array<number,number,number,number>>} yValues -
                 * array of yValues, can be an array of a four arrays (OHLC) or array of
                 * values (line)
                 * @param {Array<*>} volumeSeries - volume series
                 * @param {number} period - number of points to be calculated
                 * @return {object} - Object contains computed VWAP
                 **/
                calculateVWAPValues: function (
                    isOHLC,
                    xValues,
                    yValues,
                    volumeSeries,
                    period
                ) {
                    var volumeValues = volumeSeries.yData,
                        volumeLength = volumeSeries.xData.length,
                        pointsLength = xValues.length,
                        cumulativePrice = [],
                        cumulativeVolume = [],
                        xData = [],
                        yData = [],
                        VWAP = [],
                        commonLength,
                        typicalPrice,
                        cPrice,
                        cVolume,
                        i,
                        j;

                    if (pointsLength <= volumeLength) {
                        commonLength = pointsLength;
                    } else {
                        commonLength = volumeLength;
                    }

                    for (i = 0, j = 0; i < commonLength; i++) {
                        // Depending on whether series is OHLC or line type, price is
                        // average of the high, low and close or a simple value
                        typicalPrice = isOHLC ?
                            ((yValues[i][1] + yValues[i][2] + yValues[i][3]) / 3) :
                            yValues[i];
                        typicalPrice *= volumeValues[i];

                        cPrice = j ?
                            (cumulativePrice[i - 1] + typicalPrice) :
                            typicalPrice;
                        cVolume = j ?
                            (cumulativeVolume[i - 1] + volumeValues[i]) :
                            volumeValues[i];

                        cumulativePrice.push(cPrice);
                        cumulativeVolume.push(cVolume);

                        VWAP.push([xValues[i], (cPrice / cVolume)]);
                        xData.push(VWAP[i][0]);
                        yData.push(VWAP[i][1]);

                        j++;

                        if (j === period) {
                            j = 0;
                        }
                    }

                    return {
                        values: VWAP,
                        xData: xData,
                        yData: yData
                    };
                }
            });

        /**
         * A `Volume Weighted Average Price (VWAP)` series. If the
         * [type](#series.vwap.type) option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.vwap
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.vwap
         */

    });
    _registerModule(_modules, 'indicators/williams-r.src.js', [_modules['parts/Globals.js'], _modules['mixins/reduce-array.js']], function (H, reduceArrayMixin) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            getArrayExtremes = reduceArrayMixin.getArrayExtremes;

        /**
         * The Williams %R series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.williamsr
         *
         * @augments Highcharts.Series
         */
        H.seriesType(
            'williamsr',
            'sma',
            /**
             * Williams %R. This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/williams-r
             *         Williams %R
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @optionparent plotOptions.williamsr
             */
            {
                /**
                 * Paramters used in calculation of Williams %R series points.
                 * @excluding index
                 */
                params: {
                    /**
                     * Period for Williams %R oscillator
                     */
                    period: 14
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Williams %R',
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        WR = [], // 0- date, 1- Williams %R
                        xData = [],
                        yData = [],
                        slicedY,
                        close = 3,
                        low = 2,
                        high = 1,
                        extremes,
                        R,
                        HH, // Highest high value in period
                        LL, // Lowest low value in period
                        CC, // Current close value
                        i;

                    // Williams %R requires close value
                    if (
                        xVal.length < period ||
                        !isArray(yVal[0]) ||
                        yVal[0].length !== 4
                    ) {
                        return false;
                    }

                    // For a N-period, we start from N-1 point, to calculate Nth point
                    // That is why we later need to comprehend slice() elements list
                    // with (+1)
                    for (i = period - 1; i < yValLen; i++) {
                        slicedY = yVal.slice(i - period + 1, i + 1);
                        extremes = getArrayExtremes(slicedY, low, high);

                        LL = extremes[0];
                        HH = extremes[1];
                        CC = yVal[i][close];

                        R = ((HH - CC) / (HH - LL)) * -100;

                        if (xVal[i]) {
                            WR.push([xVal[i], R]);
                            xData.push(xVal[i]);
                            yData.push(R);
                        }
                    }

                    return {
                        values: WR,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Williams %R Oscillator` series. If the [type](#series.williamsr.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.williamsr
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @apioption series.williamsr
         */

    });
    _registerModule(_modules, 'indicators/wma.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isArray = H.isArray,
            seriesType = H.seriesType;

        // Utils:
        function accumulateAverage(points, xVal, yVal, i, index) {
            var xValue = xVal[i],
                yValue = index < 0 ? yVal[i] : yVal[i][index];

            points.push([xValue, yValue]);
        }

        function weightedSumArray(array, pLen) {
            // The denominator is the sum of the number of days as a triangular number.
            // If there are 5 days, the triangular numbers are 5, 4, 3, 2, and 1.
            // The sum is 5 + 4 + 3 + 2 + 1 = 15.
            var denominator = (pLen + 1) / 2 * pLen;

            // reduce VS loop => reduce
            return array.reduce(function (prev, cur, i) {
                return [null, prev[1] + cur[1] * (i + 1)];
            })[1] / denominator;
        }

        function populateAverage(points, xVal, yVal, i) {
            var pLen = points.length,
                wmaY = weightedSumArray(points, pLen),
                wmaX = xVal[i - 1];

            points.shift(); // remove point until range < period

            return [wmaX, wmaY];
        }

        /**
         * The SMA series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.wma
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'wma',
            'sma',
            /**
             * Weighted moving average indicator (WMA). This series requires `linkedTo`
             * option to be set.
             *
             * @sample stock/indicators/wma
             *         Weighted moving average indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.wma
             */
            {
                params: {
                    index: 3,
                    period: 9
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                getValues: function (series, params) {
                    var period = params.period,
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        range = 1,
                        xValue = xVal[0],
                        yValue = yVal[0],
                        WMA = [],
                        xData = [],
                        yData = [],
                        index = -1,
                        i, points, WMAPoint;

                    if (xVal.length < period) {
                        return false;
                    }

                    // Switch index for OHLC / Candlestick
                    if (isArray(yVal[0])) {
                        index = params.index;
                        yValue = yVal[0][index];
                    }
                    // Starting point
                    points = [[xValue, yValue]];

                    // Accumulate first N-points
                    while (range !== period) {
                        accumulateAverage(points, xVal, yVal, range, index);
                        range++;
                    }

                    // Calculate value one-by-one for each period in visible data
                    for (i = range; i < yValLen; i++) {
                        WMAPoint = populateAverage(points, xVal, yVal, i);
                        WMA.push(WMAPoint);
                        xData.push(WMAPoint[0]);
                        yData.push(WMAPoint[1]);

                        accumulateAverage(points, xVal, yVal, i, index);
                    }

                    WMAPoint = populateAverage(points, xVal, yVal, i);
                    WMA.push(WMAPoint);
                    xData.push(WMAPoint[0]);
                    yData.push(WMAPoint[1]);

                    return {
                        values: WMA,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `WMA` series. If the [type](#series.wma.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.wma
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.wma
         */

    });
    _registerModule(_modules, 'indicators/zigzag.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         * */



        var seriesType = H.seriesType,
            UNDEFINED;

        /**
         * The Zig Zag series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.zigzag
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'zigzag',
            'sma',
            /**
             * Zig Zag indicator.
             *
             * This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/zigzag
             *         Zig Zag indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @optionparent plotOptions.zigzag
             */
            {
                /**
                 * @excluding index, period
                 */
                params: {
                    /**
                     * The point index which indicator calculations will base - low
                     * value.
                     *
                     * For example using OHLC data, index=2 means the indicator will be
                     * calculated using Low values.
                     */
                    lowIndex: 2,
                    /**
                     * The point index which indicator calculations will base - high
                     * value.
                     *
                     * For example using OHLC data, index=1 means the indicator will be
                     * calculated using High values.
                     */
                    highIndex: 1,
                    /**
                     * The threshold for the value change.
                     *
                     * For example deviation=1 means the indicator will ignore all price
                     * movements less than 1%.
                     */
                    deviation: 1
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameComponents: ['deviation'],
                nameSuffixes: ['%'],
                nameBase: 'Zig Zag',
                getValues: function (series, params) {
                    var lowIndex = params.lowIndex,
                        highIndex = params.highIndex,
                        deviation = params.deviation / 100,
                        deviations = {
                            'low': 1 + deviation,
                            'high': 1 - deviation
                        },
                        xVal = series.xData,
                        yVal = series.yData,
                        yValLen = yVal ? yVal.length : 0,
                        Zigzag = [],
                        xData = [],
                        yData = [],
                        i, j,
                        ZigzagPoint,
                        firstZigzagLow,
                        firstZigzagHigh,
                        directionUp,
                        zigZagLen,
                        exitLoop = false,
                        yIndex = false;

                    // Exit if not enught points or no low or high values
                    if (
                        xVal.length <= 1 ||
                        (
                            yValLen &&
                            (
                                yVal[0][lowIndex] === UNDEFINED ||
                                yVal[0][highIndex] === UNDEFINED
                            )
                        )
                    ) {
                        return false;
                    }

                    // Set first zigzag point candidate
                    firstZigzagLow = yVal[0][lowIndex];
                    firstZigzagHigh = yVal[0][highIndex];

                    // Search for a second zigzag point candidate,
                    // this will also set first zigzag point
                    for (i = 1; i < yValLen; i++) {
                        // requried change to go down
                        if (yVal[i][lowIndex] <= firstZigzagHigh * deviations.high) {
                            Zigzag.push([xVal[0], firstZigzagHigh]);
                            // second zigzag point candidate
                            ZigzagPoint = [xVal[i], yVal[i][lowIndex]];
                            // next line will be going up
                            directionUp = true;
                            exitLoop = true;

                            // requried change to go up
                        } else if (
                            yVal[i][highIndex] >= firstZigzagLow * deviations.low
                        ) {
                            Zigzag.push([xVal[0], firstZigzagLow]);
                            // second zigzag point candidate
                            ZigzagPoint = [xVal[i], yVal[i][highIndex]];
                            // next line will be going down
                            directionUp = false;
                            exitLoop = true;

                        }
                        if (exitLoop) {
                            xData.push(Zigzag[0][0]);
                            yData.push(Zigzag[0][1]);
                            j = i++;
                            i = yValLen;
                        }
                    }

                    // Search for next zigzags
                    for (i = j; i < yValLen; i++) {
                        if (directionUp) { // next line up

                            // lower when going down -> change zigzag candidate
                            if (yVal[i][lowIndex] <= ZigzagPoint[1]) {
                                ZigzagPoint = [xVal[i], yVal[i][lowIndex]];
                            }

                            // requried change to go down -> new zigzagpoint and
                            // direction change
                            if (yVal[i][highIndex] >= ZigzagPoint[1] * deviations.low) {
                                yIndex = highIndex;
                            }

                        } else { // next line down

                            // higher when going up -> change zigzag candidate
                            if (yVal[i][highIndex] >= ZigzagPoint[1]) {
                                ZigzagPoint = [xVal[i], yVal[i][highIndex]];
                            }

                            // requried change to go down -> new zigzagpoint and
                            // direction change
                            if (yVal[i][lowIndex] <= ZigzagPoint[1] * deviations.high) {
                                yIndex = lowIndex;
                            }
                        }
                        if (yIndex !== false) { // new zigzag point and direction change
                            Zigzag.push(ZigzagPoint);
                            xData.push(ZigzagPoint[0]);
                            yData.push(ZigzagPoint[1]);
                            ZigzagPoint = [xVal[i], yVal[i][yIndex]];
                            directionUp = !directionUp;

                            yIndex = false;
                        }
                    }

                    zigZagLen = Zigzag.length;

                    // no zigzag for last point
                    if (
                        zigZagLen !== 0 &&
                        Zigzag[zigZagLen - 1][0] < xVal[yValLen - 1]
                    ) {
                        // set last point from zigzag candidate
                        Zigzag.push(ZigzagPoint);
                        xData.push(ZigzagPoint[0]);
                        yData.push(ZigzagPoint[1]);
                    }
                    return {
                        values: Zigzag,
                        xData: xData,
                        yData: yData
                    };
                }
            }
        );

        /**
         * A `Zig Zag` series. If the [type](#series.zigzag.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.zigzag
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @apioption series.zigzag
         */

    });
    _registerModule(_modules, 'indicators/regressions.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Kamil Kulig
         *
         *  License: www.highcharts.com/license
         *
         * */



        var seriesType = H.seriesType,
            isArray = H.isArray;

        /**
         * Linear regression series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearregression
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'linearRegression',
            'sma',
            /**
             * Linear regression indicator. This series requires `linkedTo` option to be
             * set.
             *
             * @sample {highstock} stock/indicators/linear-regression
             *         Linear regression indicator
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @optionparent plotOptions.linearregression
             */
            {
                params: {
                    /**
                     * Unit (in milliseconds) for the x axis distances used to compute
                     * the regression line paramters (slope & intercept) for every
                     * range. In Highstock the x axis values are always represented in
                     * milliseconds which may cause that distances between points are
                     * "big" integer numbers.
                     *
                     * Highstock's linear regression algorithm (least squares method)
                     * will utilize these "big" integers for finding the slope and the
                     * intercept of the regression line for each period. In consequence,
                     * this value may be a very "small" decimal number that's hard to
                     * interpret by a human.
                     *
                     * For instance: `xAxisUnit` equealed to `86400000` ms (1 day)
                     * forces the algorithm to treat `86400000` as `1` while computing
                     * the slope and the intercept. This may enchance the legiblitity of
                     * the indicator's values.
                     *
                     * Default value is the closest distance between two data points.
                     *
                     * @sample {highstock} stock/plotoptions/linear-regression-xaxisunit
                     *         xAxisUnit set to 1 minute
                     *
                     * @example
                     * // In Liniear Regression Slope Indicator series `xAxisUnit` is
                     * // `86400000` (1 day) and period is `3`. There're 3 points in the
                     * // base series:
                     *
                     * data: [
                     *   [Date.UTC(2019, 0, 1), 1],
                     *   [Date.UTC(2019, 0, 2), 3],
                     *   [Date.UTC(2019, 0, 3), 5]
                     * ]
                     *
                     * // This will produce one point in the indicator series that has a
                     * // `y` value of `2` (slope of the regression line). If we change
                     * // the `xAxisUnit` to `1` (ms) the value of the indicator's point
                     * // will be `2.3148148148148148e-8` which is harder to interpert
                     * // for a human.
                     *
                     * @type    {number}
                     * @product highstock
                     */
                    xAxisUnit: undefined
                },
                tooltip: {
                    valueDecimals: 4
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Linear Regression Indicator',

                /**
                 * Return the slope and intercept of a straight line function.
                 * @private
                 * @param {Array<number>} - list of all x coordinates in a period
                 * @param {Array<number>} - list of all y coordinates in a period
                 * @return {object} - object that contains the slope and the intercept
                 * of a straight line function
                 */
                getRegressionLineParameters: function (xData, yData) {
                    // least squares method
                    var yIndex = this.options.params.index,
                        getSingleYValue = function (yValue, yIndex) {
                            return isArray(yValue) ? yValue[yIndex] : yValue;
                        },
                        xSum = xData.reduce(function (accX, val) {
                            return val + accX;
                        }, 0),
                        ySum = yData.reduce(function (accY, val) {
                            return getSingleYValue(val, yIndex) + accY;
                        }, 0),
                        xMean = xSum / xData.length,
                        yMean = ySum / yData.length,
                        xError,
                        yError,
                        formulaNumerator = 0,
                        formulaDenominator = 0,
                        i,
                        slope;

                    for (i = 0; i < xData.length; i++) {
                        xError = xData[i] - xMean;
                        yError = getSingleYValue(yData[i], yIndex) - yMean;
                        formulaNumerator += xError * yError;
                        formulaDenominator += Math.pow(xError, 2);
                    }

                    slope = formulaDenominator ?
                        formulaNumerator / formulaDenominator : 0; // don't divide by 0

                    return {
                        slope: slope,
                        intercept: yMean - slope * xMean
                    };
                },


                /**
                 * Return the y value on a straight line.
                 * @private
                 * @param {object} - object that contains the slope and the intercept
                 * of a straight line function
                 * @param {number} - x coordinate of the point
                 * @return {number} - y value of the point that lies on the line
                 */
                getEndPointY: function (lineParameters, endPointX) {
                    return lineParameters.slope * endPointX + lineParameters.intercept;
                },

                /**
                 * Transform the coordinate system so that x values start at 0 and
                 * apply xAxisUnit.
                 * @private
                 * @param {Array<number>} - list of all x coordinates in a period
                 * @param {number} - xAxisUnit option (see the API)
                 * @return {Array<number>} - array of transformed x data
                 */
                transformXData: function (xData, xAxisUnit) {
                    var xOffset = xData[0];

                    return xData.map(function (xValue) {
                        return (xValue - xOffset) / xAxisUnit;
                    });
                },

                /**
                 * Find the closest distance between points in the base series.
                 * @private
                 * @param {Array<number>} - list of all x coordinates in the base series
                 * @return {number} - closest distance between points in the base series
                 */
                findClosestDistance: function (xData) {
                    var distance,
                        closestDistance,
                        i;

                    for (i = 1; i < xData.length - 1; i++) {
                        distance = xData[i] - xData[i - 1];
                        if (distance > 0 && (closestDistance === undefined ||
                          distance < closestDistance)) {
                            closestDistance = distance;
                        }
                    }

                    return closestDistance;
                },

                // Required to be implemented - starting point for indicator's logic
                getValues: function (baseSeries, regressionSeriesParams) {
                    var xData = baseSeries.xData,
                        yData = baseSeries.yData,
                        period = regressionSeriesParams.period,
                        lineParameters,
                        i,
                        periodStart,
                        periodEnd,
                        indicatorData = { // format required to be returned
                            xData: [], // by getValues() method
                            yData: [],
                            values: []
                        },
                        endPointX,
                        endPointY,
                        periodXData,
                        periodYData,
                        periodTransformedXData,
                        xAxisUnit = this.options.params.xAxisUnit ||
                        this.findClosestDistance(xData);

                    // Iteration logic: x value of the last point within the period
                    // (end point) is used to represent the y value (regression)
                    // of the entire period.

                    for (i = period - 1; i <= xData.length - 1; i++) {
                        periodStart = i - period + 1; // adjusted for slice() function
                        periodEnd = i + 1; // (as above)
                        endPointX = xData[i];
                        periodXData = xData.slice(periodStart, periodEnd);
                        periodYData = yData.slice(periodStart, periodEnd);
                        periodTransformedXData = this.transformXData(periodXData,
                            xAxisUnit);

                        lineParameters = this.getRegressionLineParameters(
                            periodTransformedXData, periodYData
                        );

                        endPointY = this.getEndPointY(lineParameters,
                            periodTransformedXData[periodTransformedXData.length - 1]);

                        indicatorData.values.push({
                            regressionLineParameters: lineParameters,
                            x: endPointX,
                            y: endPointY
                        });

                        indicatorData.xData.push(endPointX);
                        indicatorData.yData.push(endPointY);
                    }

                    return indicatorData;
                }
            }
        );

        /**
         * A linear regression series. If the [type](#series.linearregression.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregression
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @apioption series.linearregression
         */

        /* ************************************************************************** */

        /**
         * The Linear Regression Slope series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionSlope
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'linearRegressionSlope',
            'linearRegression',
            /**
             * Linear regression slope indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-slope
             *         Linear regression slope indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @optionparent plotOptions.linearregressionslope
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Linear Regression Slope Indicator',
                getEndPointY: function (lineParameters) {
                    return lineParameters.slope;
                }
            }
        );

        /**
         * A linear regression slope series. If the
         * [type](#series.linearregressionslope.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionslope
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @apioption series.linearregressionslope
         */

        /* ************************************************************************** */

        /**
         * The Linear Regression Intercept series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionIntercept
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'linearRegressionIntercept',
            'linearRegression',
            /**
             * Linear regression intercept indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-intercept
             *         Linear intercept slope indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @optionparent plotOptions.linearregressionintercept
             */
            {},
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Linear Regression Intercept Indicator',
                getEndPointY: function (lineParameters) {
                    return lineParameters.intercept;
                }
            }
        );

        /**
         * A linear regression intercept series. If the
         * [type](#series.linearregressionintercept.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionintercept
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @apioption series.linearregressionintercept
         */

        /* ************************************************************************** */

        /**
         * The Linear Regression Angle series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionAngle
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'linearRegressionAngle',
            'linearRegression',
            /**
             * Linear regression angle indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-angle
             *         Linear intercept angle indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @optionparent plotOptions.linearregressionangle
             */
            {
                tooltip: { // add a degree symbol
                    pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                    '{series.name}: <b>{point.y}°</b><br/>'
                }
            },
            /**
             * @lends Highcharts.Series#
             */
            {
                nameBase: 'Linear Regression Angle Indicator',

                /**
                * Convert a slope of a line to angle (in degrees) between
                * the line and x axis
                * @private
                * @param {number} - slope of the straight line function
                * @return {number}
                */
                slopeToAngle: function (slope) {
                    return Math.atan(slope) * (180 / Math.PI); // rad to deg
                },

                getEndPointY: function (lineParameters) {
                    return this.slopeToAngle(lineParameters.slope);
                }
            }
        );

        /**
         * A linear regression intercept series. If the
         * [type](#series.linearregressionangle.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionangle
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @apioption series.linearregressionangle
         */

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
    _registerModule(_modules, 'masters/indicators/indicators-all.src.js', [], function () {



    });
}));