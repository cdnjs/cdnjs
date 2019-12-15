/**
 * @license  Highcharts JS v7.1.2 (2019-06-04)
 *
 * Pareto series type for Highcharts
 *
 * (c) 2010-2019 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/pareto', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'mixins/derived-series.js', [_modules['parts/Globals.js']], function (H) {


        var Series = H.Series,
            addEvent = H.addEvent,
            noop = H.noop;


        /* ************************************************************************** *
         *
         * DERIVED SERIES MIXIN
         *
         * ************************************************************************** */

        /**
         * Provides methods for auto setting/updating series data based on the based
         * series data.
         *
         * @private
         * @mixin derivedSeriesMixin
         */
        var derivedSeriesMixin = {

            hasDerivedData: true,
            /**
             * Initialise series
             *
             * @private
             * @function derivedSeriesMixin.init
             */
            init: function () {
                Series.prototype.init.apply(this, arguments);

                this.initialised = false;
                this.baseSeries = null;
                this.eventRemovers = [];

                this.addEvents();
            },

            /**
             * Method to be implemented - inside the method the series has already
             * access to the base series via m `this.baseSeries` and the bases data is
             * initialised. It should return data in the format accepted by
             * `Series.setData()` method
             *
             * @private
             * @function derivedSeriesMixin.setDerivedData
             *
             * @return {Array<*>}
             *         An array of data
             */
            setDerivedData: noop,

            /**
             * Sets base series for the series
             *
             * @private
             * @function derivedSeriesMixin.setBaseSeries
             */
            setBaseSeries: function () {
                var chart = this.chart,
                    baseSeriesOptions = this.options.baseSeries,
                    baseSeries = (
                        H.defined(baseSeriesOptions) &&
                        (
                            chart.series[baseSeriesOptions] ||
                            chart.get(baseSeriesOptions)
                        )
                    );

                this.baseSeries = baseSeries || null;
            },

            /**
             * Adds events for the series
             *
             * @private
             * @function derivedSeriesMixin.addEvents
             */
            addEvents: function () {
                var derivedSeries = this,
                    chartSeriesLinked;

                chartSeriesLinked = addEvent(
                    this.chart,
                    'afterLinkSeries',
                    function () {
                        derivedSeries.setBaseSeries();

                        if (derivedSeries.baseSeries && !derivedSeries.initialised) {
                            derivedSeries.setDerivedData();
                            derivedSeries.addBaseSeriesEvents();
                            derivedSeries.initialised = true;
                        }
                    }
                );

                this.eventRemovers.push(
                    chartSeriesLinked
                );
            },

            /**
             * Adds events to the base series - it required for recalculating the data
             * in the series if the base series is updated / removed / etc.
             *
             * @private
             * @function derivedSeriesMixin.addBaseSeriesEvents
             */
            addBaseSeriesEvents: function () {
                var derivedSeries = this,
                    updatedDataRemover,
                    destroyRemover;

                updatedDataRemover = addEvent(
                    derivedSeries.baseSeries,
                    'updatedData',
                    function () {
                        derivedSeries.setDerivedData();
                    }
                );

                destroyRemover = addEvent(
                    derivedSeries.baseSeries,
                    'destroy',
                    function () {
                        derivedSeries.baseSeries = null;
                        derivedSeries.initialised = false;
                    }
                );

                derivedSeries.eventRemovers.push(
                    updatedDataRemover,
                    destroyRemover
                );
            },

            /**
             * Destroys the series
             *
             * @private
             * @function derivedSeriesMixin.destroy
             */
            destroy: function () {
                this.eventRemovers.forEach(function (remover) {
                    remover();
                });

                Series.prototype.destroy.apply(this, arguments);
            }
        };


        return derivedSeriesMixin;
    });
    _registerModule(_modules, 'modules/pareto.src.js', [_modules['parts/Globals.js'], _modules['mixins/derived-series.js']], function (H, derivedSeriesMixin) {
        /* *
         * (c) 2010-2017 Sebastian Bochan
         *
         * License: www.highcharts.com/license
         */



        var correctFloat = H.correctFloat,
            seriesType = H.seriesType,
            merge = H.merge;


        /**
         * The pareto series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pareto
         *
         * @augments Highcharts.Series
         */
        seriesType('pareto', 'line'

            /**
             * A pareto diagram is a type of chart that contains both bars and a line
             * graph, where individual values are represented in descending order by
             * bars, and the cumulative total is represented by the line.
             *
             * @sample {highcharts} highcharts/demo/pareto/
             *         Pareto diagram
             *
             * @extends      plotOptions.line
             * @since        6.0.0
             * @product      highcharts
             * @excluding    allAreas, boostThreshold, borderColor, borderRadius,
             *               borderWidth, crisp, colorAxis, depth, data, edgeColor,
             *               edgeWidth, findNearestPointBy, gapSize, gapUnit, grouping,
             *               groupPadding, groupZPadding, maxPointWidth, keys,
             *               negativeColor, pointInterval, pointIntervalUnit,
             *               pointPadding, pointPlacement, pointRange, pointStart,
             *               pointWidth, shadow, step, softThreshold, stacking,
             *               threshold, zoneAxis, zones
             * @optionparent plotOptions.pareto
             */
            , {
                /**
                 * Higher zIndex than column series to draw line above shapes.
                 */
                zIndex: 3
            }, merge(derivedSeriesMixin, {
                /**
                 * Calculate sum and return percent points.
                 *
                 * @private
                 * @function Highcharts.Series#setDerivedData
                 *
                 * @return {Array<Array<number,number>>}
                 *         Returns array of points [x,y]
                 */
                setDerivedData: function () {
                    if (this.baseSeries.yData.length > 1) {
                        var xValues = this.baseSeries.xData,
                            yValues = this.baseSeries.yData,
                            sum = this.sumPointsPercents(yValues, xValues, null, true);

                        this.setData(
                            this.sumPointsPercents(yValues, xValues, sum, false),
                            false
                        );
                    }
                },
                /**
                 * Calculate y sum and each percent point.
                 *
                 * @private
                 * @function Highcharts.Series#sumPointsPercents
                 *
                 * @param {Array<number>} yValues
                 *        Y values
                 *
                 * @param {Array<number>} xValues
                 *        X values
                 *
                 * @param {number} sum
                 *        Sum of all y values
                 *
                 * @param {boolean} [isSum]
                 *        Declares if calculate sum of all points
                 *
                 * @return {number|Array<number,number>}
                 *         Returns sum of points or array of points [x,sum]
                 */
                sumPointsPercents: function (yValues, xValues, sum, isSum) {
                    var sumY = 0,
                        sumPercent = 0,
                        percentPoints = [],
                        percentPoint;

                    yValues.forEach(function (point, i) {
                        if (point !== null) {
                            if (isSum) {
                                sumY += point;
                            } else {
                                percentPoint = (point / sum) * 100;
                                percentPoints.push([
                                    xValues[i],
                                    correctFloat(sumPercent + percentPoint)
                                ]);
                                sumPercent += percentPoint;
                            }
                        }
                    });

                    return isSum ? sumY : percentPoints;
                }
            }));

        /**
         * A `pareto` series. If the [type](#series.pareto.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.pareto
         * @since     6.0.0
         * @product   highcharts
         * @excluding data, dataParser, dataURL
         * @apioption series.pareto
         */

        /**
         * An integer identifying the index to use for the base series, or a string
         * representing the id of the series.
         *
         * @type      {number|string}
         * @default   undefined
         * @apioption series.pareto.baseSeries
         */

        /**
         * An array of data points for the series. For the `pareto` series type,
         * points are calculated dynamically.
         *
         * @type      {Array<Array<number|string>|*>}
         * @extends   series.column.data
         * @since     6.0.0
         * @product   highcharts
         * @apioption series.pareto.data
         */

    });
    _registerModule(_modules, 'masters/modules/pareto.src.js', [], function () {


    });
}));