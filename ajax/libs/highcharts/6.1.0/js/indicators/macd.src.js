/**
 * @license  Highcharts JS v6.1.0 (2018-04-13)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2017 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {
	(function (H) {

		var isArray = H.isArray,
		    seriesType = H.seriesType;

		// Utils:
		function accumulateAverage(points, xVal, yVal, i, index) {
		    var xValue = xVal[i],
		        yValue = index < 0 ? yVal[i] : yVal[i][index];

		    points.push([xValue, yValue]);
		}

		function populateAverage(
		    points,
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
		        SMA :
		        ((yValue * EMApercent) + (calEMA * (1 - EMApercent)));

		    return [x, y];
		}
		/**
		 * The EMA series type.
		 *
		 * @constructor seriesTypes.ema
		 * @augments seriesTypes.sma
		 */
		seriesType('ema', 'sma',
		    /**
		     * Exponential moving average indicator (EMA). This series requires the
		     * `linkedTo` option to be set.
		     *
		     * @extends {plotOptions.sma}
		     * @product highstock
		     * @sample {highstock} stock/indicators/ema
		     *                        Exponential moving average indicator
		     * @since 6.0.0
		     * @optionparent plotOptions.ema
		     */
		    {
		        params: {
		            index: 0,
		            period: 14
		        }
		    }, {
		        getValues: function (series, params) {
		            var period = params.period,
		                xVal = series.xData,
		                yVal = series.yData,
		                yValLen = yVal ? yVal.length : 0,
		                EMApercent = (2 / (period + 1)),
		                range = 0,
		                sum = 0,
		                EMA = [],
		                xData = [],
		                yData = [],
		                index = -1,
		                points = [],
		                SMA = 0,
		                calEMA,
		                EMAPoint,
		                i;

		            // Check period, if bigger than points length, skip
		            if (xVal.length < period) {
		                return false;
		            }

		            // Switch index for OHLC / Candlestick / Arearange
		            if (isArray(yVal[0])) {
		                index = params.index ? params.index : 0;
		            }

		            // Accumulate first N-points
		            while (range < period) {
		                accumulateAverage(points, xVal, yVal, range, index);
		                sum += index < 0 ? yVal[range] : yVal[range][index];
		                range++;
		            }

		            // first point
		            SMA = sum / period;

		            // Calculate value one-by-one for each period in visible data
		            for (i = range; i < yValLen; i++) {
		                EMAPoint = populateAverage(
		                    points,
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

		                accumulateAverage(points, xVal, yVal, i, index);
		            }

		            EMAPoint = populateAverage(
		                points,
		                xVal,
		                yVal,
		                i,
		                EMApercent,
		                calEMA,
		                index
		            );
		            EMA.push(EMAPoint);
		            xData.push(EMAPoint[0]);
		            yData.push(EMAPoint[1]);

		            return {
		                values: EMA,
		                xData: xData,
		                yData: yData
		            };
		        }
		    });

		/**
		 * A `EMA` series. If the [type](#series.ema.type) option is not
		 * specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @since 6.0.0
		 * @extends series,plotOptions.ema
		 * @excluding data,dataParser,dataURL
		 * @product highstock
		 * @apioption series.ema
		 */

		/**
		 * @type {Array<Object|Array>}
		 * @since 6.0.0
		 * @extends series.sma.data
		 * @product highstock
		 * @apioption series.ema.data
		 */

	}(Highcharts));
	(function (H) {

		var seriesType = H.seriesType,
		    each = H.each,
		    noop = H.noop,
		    merge = H.merge,
		    defined = H.defined,
		    SMA = H.seriesTypes.sma,
		    EMA = H.seriesTypes.ema;

		/**
		 * The MACD series type.
		 *
		 * @constructor seriesTypes.macd
		 * @augments seriesTypes.sma
		 */
		seriesType('macd', 'sma',
		    /**
		     * Moving Average Convergence Divergence (MACD). This series requires
		     * `linkedTo` option to be set.
		     *
		     * @extends {plotOptions.sma}
		     * @product highstock
		     * @sample {highstock} stock/indicators/macd MACD indicator
		     * @since 6.0.0
		     * @optionparent plotOptions.macd
		     */
		    {
		        params: {
		            /**
		             * The short period for indicator calculations.
		             *
		             * @type {Number}
		             * @since 6.0.0
		             * @product highstock
		             */
		            shortPeriod: 12,
		            /**
		             * The long period for indicator calculations.
		             *
		             * @type {Number}
		             * @since 6.0.0
		             * @product highstock
		             */
		            longPeriod: 26,
		            /**
		             * The base period for signal calculations.
		             *
		             * @type {Number}
		             * @since 6.0.0
		             * @product highstock
		             */
		            signalPeriod: 9,
		            period: 26
		        },
		        /**
		         * The styles for signal line
		         *
		         * @since 6.0.0
		         * @product highstock
		         */
		        signalLine: {
		            /**
		             * @extends plotOptions.macd.zones
		             * @sample  stock/indicators/macd-zones Zones in MACD
		             */
		            zones: [],
		            styles: {
		                /**
		                 * Pixel width of the line.
		                 *
		                 * @type {Number}
		                 * @since 6.0.0
		                 * @product highstock
		                 */
		                lineWidth: 1,
		                /**
		                 * Color of the line.
		                 *
		                 * @type {Number}
		                 * @since 6.0.0
		                 * @product highstock
		                 */
		                lineColor: undefined
		            }
		        },
		        /**
		         * The styles for macd line
		         *
		         * @since 6.0.0
		         * @product highstock
		         */
		        macdLine: {
		            /**
		             * @extends plotOptions.macd.zones
		             * @sample  stock/indicators/macd-zones Zones in MACD
		             */
		            zones: [],
		            styles: {
		                /**
		                 * Pixel width of the line.
		                 *
		                 * @type {Number}
		                 * @since 6.0.0
		                 * @product highstock
		                 */
		                lineWidth: 1,
		                /**
		                 * Color of the line.
		                 *
		                 * @type {Number}
		                 * @since 6.0.0
		                 * @product highstock
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
		    }, {
		        nameComponents: ['longPeriod', 'shortPeriod', 'signalPeriod'],
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
		        },
		        toYData: function (point) {
		            return [point.y, point.signal, point.MACD];
		        },
		        translate: function () {
		            var indicator = this,
		                plotNames = ['plotSignal', 'plotMACD'];

		            H.seriesTypes.column.prototype.translate.apply(indicator);

		            each(indicator.points, function (point) {
		                each([point.signal, point.MACD], function (value, i) {
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
		            this.graphmacd = this.graphmacd.destroy();
		            this.graphsignal = this.graphsignal.destroy();

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
		            each(['macd', 'signal'], function (lineName, i) {
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

		            // Calculating the short and long EMA used when calculating the MACD
		            shortEMA = EMA.prototype.getValues(series,
		                {
		                    period: params.shortPeriod
		                }
		            );

		            longEMA = EMA.prototype.getValues(series,
		                {
		                    period: params.longPeriod
		                }
		            );

		            shortEMA = shortEMA.values;
		            longEMA = longEMA.values;


		            // Subtract each Y value from the EMA's and create the new dataset
		            // (MACD)
		            for (i = 1; i <= shortEMA.length; i++) {
		                if (defined(longEMA[i - 1]) && defined(longEMA[i - 1][1])) {
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
		                    yMACD[i] = [0, signalLine[j][1],  MACD[i][3]];

		                    if (MACD[i][3] === null) {
		                        MACD[i][1] = 0;
		                        yMACD[i][0] = 0;
		                    } else {
		                        MACD[i][1] = (MACD[i][3] - signalLine[j][1]);
		                        yMACD[i][0] = (MACD[i][3] - signalLine[j][1]);
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
		    });

		/**
		 * A `MACD` series. If the [type](#series.macd.type) option is not
		 * specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @since 6.0.0
		 * @extends series,plotOptions.macd
		 * @excluding data,dataParser,dataURL
		 * @product highstock
		 * @apioption series.macd
		 */

		/**
		 * @type {Array<Object|Array>}
		 * @since 6.0.0
		 * @extends series.sma.data
		 * @product highstock
		 * @apioption series.macd.data
		 */

	}(Highcharts));
}));
