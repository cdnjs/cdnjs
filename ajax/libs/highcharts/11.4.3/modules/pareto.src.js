/**
 * @license Highcharts JS v11.4.3 (2024-05-22)
 *
 * Pareto series type for Highcharts
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Series/DerivedComposition.js', [_modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (H, Series, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { addEvent, defined } = U;
        /* *
         *
         *  Composition
         *
         * */
        /**
         * Provides methods for auto setting/updating series data based on the based
         * series data.
         * @private
         */
        var DerivedComposition;
        (function (DerivedComposition) {
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
            DerivedComposition.hasDerivedData = true;
            /**
             * Method to be implemented - inside the method the series has already
             * access to the base series via m `this.baseSeries` and the bases data is
             * initialised. It should return data in the format accepted by
             * `Series.setData()` method
             * @private
             */
            DerivedComposition.setDerivedData = noop;
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function compose(SeriesClass) {
                const seriesProto = SeriesClass.prototype;
                seriesProto.addBaseSeriesEvents = addBaseSeriesEvents;
                seriesProto.addEvents = addEvents;
                seriesProto.destroy = destroy;
                seriesProto.init = init;
                seriesProto.setBaseSeries = setBaseSeries;
                return SeriesClass;
            }
            DerivedComposition.compose = compose;
            /**
             * Initialise series
             * @private
             */
            function init() {
                Series.prototype.init.apply(this, arguments);
                this.initialised = false;
                this.baseSeries = null;
                this.eventRemovers = [];
                this.addEvents();
            }
            DerivedComposition.init = init;
            /**
             * Sets base series for the series
             * @private
             */
            function setBaseSeries() {
                const chart = this.chart, baseSeriesOptions = this.options.baseSeries, baseSeries = (defined(baseSeriesOptions) &&
                    (chart.series[baseSeriesOptions] ||
                        chart.get(baseSeriesOptions)));
                this.baseSeries = baseSeries || null;
            }
            DerivedComposition.setBaseSeries = setBaseSeries;
            /**
             * Adds events for the series
             * @private
             */
            function addEvents() {
                this.eventRemovers.push(addEvent(this.chart, 'afterLinkSeries', () => {
                    this.setBaseSeries();
                    if (this.baseSeries && !this.initialised) {
                        this.setDerivedData();
                        this.addBaseSeriesEvents();
                        this.initialised = true;
                    }
                }));
            }
            DerivedComposition.addEvents = addEvents;
            /**
             * Adds events to the base series - it required for recalculating the data
             * in the series if the base series is updated / removed / etc.
             * @private
             */
            function addBaseSeriesEvents() {
                this.eventRemovers.push(addEvent(this.baseSeries, 'updatedData', () => {
                    this.setDerivedData();
                }), addEvent(this.baseSeries, 'destroy', () => {
                    this.baseSeries = null;
                    this.initialised = false;
                }));
            }
            DerivedComposition.addBaseSeriesEvents = addBaseSeriesEvents;
            /**
             * Destroys the series
             * @private
             */
            function destroy() {
                this.eventRemovers.forEach((remover) => {
                    remover();
                });
                Series.prototype.destroy.apply(this, arguments);
            }
            DerivedComposition.destroy = destroy;
        })(DerivedComposition || (DerivedComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DerivedComposition;
    });
    _registerModule(_modules, 'Series/ParetoSeries/ParetoSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
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
         *               borderWidth, crisp, colorAxis, depth, data, dragDrop,
         *               edgeColor, edgeWidth, findNearestPointBy, gapSize, gapUnit,
         *               grouping, groupPadding, groupZPadding, maxPointWidth, keys,
         *               negativeColor, pointInterval, pointIntervalUnit,
         *               pointPadding, pointPlacement, pointRange, pointStart,
         *               pointWidth, shadow, step, softThreshold, stacking,
         *               threshold, zoneAxis, zones, boostBlending
         * @requires     modules/pareto
         * @optionparent plotOptions.pareto
         */
        const ParetoSeriesDefaults = {
            /**
             * Higher zIndex than column series to draw line above shapes.
             */
            zIndex: 3
        };
        /**
         * A `pareto` series. If the [type](#series.pareto.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.pareto
         * @since     6.0.0
         * @product   highcharts
         * @excluding data, dataParser, dataURL, boostThreshold, boostBlending
         * @requires  modules/pareto
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
        ''; // Keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return ParetoSeriesDefaults;
    });
    _registerModule(_modules, 'Series/ParetoSeries/ParetoSeries.js', [_modules['Series/DerivedComposition.js'], _modules['Series/ParetoSeries/ParetoSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (DerivedComposition, ParetoSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { line: LineSeries } = SeriesRegistry.seriesTypes;
        const { correctFloat, merge, extend } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The pareto series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pareto
         *
         * @augments Highcharts.Series
         */
        class ParetoSeries extends LineSeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Calculate y sum and each percent point.
             *
             * @private
             * @function Highcharts.Series#sumPointsPercents
             *
             * @param {Array<number>} yValues
             * Y values
             *
             * @param {Array<number>} xValues
             * X values
             *
             * @param {number} sum
             * Sum of all y values
             *
             * @param {boolean} [isSum]
             * Declares if calculate sum of all points
             *
             * @return {number|Array<number,number>}
             * Returns sum of points or array of points [x,sum]
             *
             * @requires modules/pareto
             */
            sumPointsPercents(yValues, xValues, sum, isSum) {
                const percentPoints = [];
                let i = 0, sumY = 0, sumPercent = 0, percentPoint;
                for (const point of yValues) {
                    if (point !== null) {
                        if (isSum) {
                            sumY += point;
                        }
                        else {
                            percentPoint = (point / sum) * 100;
                            percentPoints.push([
                                xValues[i],
                                correctFloat(sumPercent + percentPoint)
                            ]);
                            sumPercent += percentPoint;
                        }
                    }
                    ++i;
                }
                return (isSum ? sumY : percentPoints);
            }
            /**
             * Calculate sum and return percent points.
             *
             * @private
             * @function Highcharts.Series#setDerivedData
             * @requires modules/pareto
             */
            setDerivedData() {
                const xValues = this.baseSeries.xData, yValues = this.baseSeries.yData, sum = this.sumPointsPercents(yValues, xValues, null, true);
                this.setData(this.sumPointsPercents(yValues, xValues, sum, false), false);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        ParetoSeries.defaultOptions = merge(LineSeries.defaultOptions, ParetoSeriesDefaults);
        extend(ParetoSeries.prototype, {
            hasDerivedData: DerivedComposition.hasDerivedData
        });
        DerivedComposition.compose(ParetoSeries);
        SeriesRegistry.registerSeriesType('pareto', ParetoSeries);
        /* *
         *
         *  Default export
         *
         * */

        return ParetoSeries;
    });
    _registerModule(_modules, 'masters/modules/pareto.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));