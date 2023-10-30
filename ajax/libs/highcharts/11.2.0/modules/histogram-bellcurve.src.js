/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/histogram-bellcurve', ['highcharts'], function (Highcharts) {
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
            const composedMembers = [];
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
                if (U.pushUnique(composedMembers, SeriesClass)) {
                    const seriesProto = SeriesClass.prototype;
                    seriesProto.addBaseSeriesEvents = addBaseSeriesEvents;
                    seriesProto.addEvents = addEvents;
                    seriesProto.destroy = destroy;
                    seriesProto.init = init;
                    seriesProto.setBaseSeries = setBaseSeries;
                }
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
    _registerModule(_modules, 'Series/Histogram/HistogramSeriesDefaults.js', [], function () {
        /* *
         *
         *  Copyright (c) 2010-2021 Highsoft AS
         *  Author: Sebastian Domas
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
         * A histogram is a column series which represents the distribution of the
         * data set in the base series. Histogram splits data into bins and shows
         * their frequencies.
         *
         * @sample {highcharts} highcharts/demo/histogram/
         *         Histogram
         *
         * @extends      plotOptions.column
         * @excluding    boostThreshold, dragDrop, pointInterval, pointIntervalUnit,
         *               stacking, boostBlending
         * @product      highcharts
         * @since        6.0.0
         * @requires     modules/histogram
         * @optionparent plotOptions.histogram
         */
        const HistogramSeriesDefaults = {
            /**
             * A preferable number of bins. It is a suggestion, so a histogram may
             * have a different number of bins. By default it is set to the square
             * root of the base series' data length. Available options are:
             * `square-root`, `sturges`, `rice`. You can also define a function
             * which takes a `baseSeries` as a parameter and should return a
             * positive integer.
             *
             * @type {"square-root"|"sturges"|"rice"|number|Function}
             */
            binsNumber: 'square-root',
            /**
             * Width of each bin. By default the bin's width is calculated as
             * `(max - min) / number of bins`. This option takes precedence over
             * [binsNumber](#plotOptions.histogram.binsNumber).
             *
             * @type {number}
             */
            binWidth: void 0,
            pointPadding: 0,
            groupPadding: 0,
            grouping: false,
            pointPlacement: 'between',
            tooltip: {
                headerFormat: '',
                pointFormat: ('<span style="font-size: 0.8em">{point.x} - {point.x2}' +
                    '</span><br/>' +
                    '<span style="color:{point.color}">\u25CF</span>' +
                    ' {series.name} <b>{point.y}</b><br/>')
            }
        };
        /**
         * A `histogram` series. If the [type](#series.histogram.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.histogram
         * @excluding data, dataParser, dataURL, boostThreshold, boostBlending
         * @product   highcharts
         * @since     6.0.0
         * @requires  modules/histogram
         * @apioption series.histogram
         */
        /**
         * An integer identifying the index to use for the base series, or a string
         * representing the id of the series.
         *
         * @type      {number|string}
         * @apioption series.histogram.baseSeries
         */
        ''; // keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return HistogramSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Histogram/HistogramSeries.js', [_modules['Series/DerivedComposition.js'], _modules['Series/Histogram/HistogramSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (DerivedComposition, HistogramSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  Copyright (c) 2010-2021 Highsoft AS
         *  Author: Sebastian Domas
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
        const { arrayMax, arrayMin, correctFloat, extend, isNumber, merge, objectEach } = U;
        /* ************************************************************************** *
         *  HISTOGRAM
         * ************************************************************************** */
        /**
         * A dictionary with formulas for calculating number of bins based on the
         * base series
         **/
        const binsNumberFormulas = {
            'square-root': function (baseSeries) {
                return Math.ceil(Math.sqrt(baseSeries.options.data.length));
            },
            'sturges': function (baseSeries) {
                return Math.ceil(Math.log(baseSeries.options.data.length) * Math.LOG2E);
            },
            'rice': function (baseSeries) {
                return Math.ceil(2 * Math.pow(baseSeries.options.data.length, 1 / 3));
            }
        };
        /**
         * Returns a function for mapping number to the closed (right opened) bins
         * @private
         * @param {Array<number>} bins
         * Width of the bins
         */
        function fitToBinLeftClosed(bins) {
            return function (y) {
                let i = 1;
                while (bins[i] <= y) {
                    i++;
                }
                return bins[--i];
            };
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Histogram class
         * @private
         * @class
         * @name Highcharts.seriesTypes.histogram
         * @augments Highcharts.Series
         */
        class HistogramSeries extends ColumnSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.data = void 0;
                this.options = void 0;
                this.points = void 0;
                this.userOptions = void 0;
            }
            /* *
             *
             *  Functions
             *
             * */
            binsNumber() {
                const binsNumberOption = this.options.binsNumber;
                const binsNumber = binsNumberFormulas[binsNumberOption] ||
                    // #7457
                    (typeof binsNumberOption === 'function' && binsNumberOption);
                return Math.ceil((binsNumber && binsNumber(this.baseSeries)) ||
                    (isNumber(binsNumberOption) ?
                        binsNumberOption :
                        binsNumberFormulas['square-root'](this.baseSeries)));
            }
            derivedData(baseData, binsNumber, binWidth) {
                const series = this, max = correctFloat(arrayMax(baseData)), 
                // Float correction needed, because first frequency value is not
                // corrected when generating frequencies (within for loop).
                min = correctFloat(arrayMin(baseData)), frequencies = [], bins = {}, data = [];
                let x;
                binWidth = series.binWidth = (correctFloat(isNumber(binWidth) ?
                    (binWidth || 1) :
                    (max - min) / binsNumber));
                // #12077 negative pointRange causes wrong calculations,
                // browser hanging.
                series.options.pointRange = Math.max(binWidth, 0);
                // If binWidth is 0 then max and min are equaled,
                // increment the x with some positive value to quit the loop
                for (x = min; 
                // This condition is needed because of the margin of error while
                // operating on decimal numbers. Without that, additional bin
                // was sometimes noticeable on the graph, because of too small
                // precision of float correction.
                x < max &&
                    (series.userOptions.binWidth ||
                        correctFloat(max - x) >= binWidth ||
                        // #13069 - Every add and subtract operation should
                        // be corrected, due to general problems with
                        // operations on float numbers in JS.
                        correctFloat(correctFloat(min + (frequencies.length * binWidth)) -
                            x) <= 0); x = correctFloat(x + binWidth)) {
                    frequencies.push(x);
                    bins[x] = 0;
                }
                if (bins[min] !== 0) {
                    frequencies.push(min);
                    bins[min] = 0;
                }
                const fitToBin = fitToBinLeftClosed(frequencies.map((elem) => parseFloat(elem)));
                for (const y of baseData) {
                    bins[correctFloat(fitToBin(y))]++;
                }
                for (const key of Object.keys(bins)) {
                    data.push({
                        x: Number(key),
                        y: bins[key],
                        x2: correctFloat(Number(x) + binWidth)
                    });
                }
                data.sort((a, b) => (a.x - b.x));
                data[data.length - 1].x2 = max;
                return data;
            }
            setDerivedData() {
                const yData = this.baseSeries.yData;
                if (!yData.length) {
                    this.setData([]);
                    return;
                }
                const data = this.derivedData(yData, this.binsNumber(), this.options.binWidth);
                this.setData(data, false);
            }
        }
        HistogramSeries.defaultOptions = merge(ColumnSeries.defaultOptions, HistogramSeriesDefaults);
        extend(HistogramSeries.prototype, {
            hasDerivedData: DerivedComposition.hasDerivedData
        });
        DerivedComposition.compose(HistogramSeries);
        SeriesRegistry.registerSeriesType('histogram', HistogramSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return HistogramSeries;
    });
    _registerModule(_modules, 'Series/Bellcurve/BellcurveSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Sebastian Domas
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Optiions
         *
         * */
        /**
         * A bell curve is an areaspline series which represents the probability
         * density function of the normal distribution. It calculates mean and
         * standard deviation of the base series data and plots the curve according
         * to the calculated parameters.
         *
         * @sample {highcharts} highcharts/demo/bellcurve/
         *         Bell curve
         *
         * @extends      plotOptions.areaspline
         * @since        6.0.0
         * @product      highcharts
         * @excluding    boostThreshold, connectNulls, dragDrop, stacking,
         *               pointInterval, pointIntervalUnit
         * @requires     modules/bellcurve
         * @optionparent plotOptions.bellcurve
         */
        const BellcurveSeriesDefaults = {
            /**
             * @see [fillColor](#plotOptions.bellcurve.fillColor)
             * @see [fillOpacity](#plotOptions.bellcurve.fillOpacity)
             *
             * @apioption plotOptions.bellcurve.color
             */
            /**
             * @see [color](#plotOptions.bellcurve.color)
             * @see [fillOpacity](#plotOptions.bellcurve.fillOpacity)
             *
             * @apioption plotOptions.bellcurve.fillColor
             */
            /**
             * @see [color](#plotOptions.bellcurve.color)
             * @see [fillColor](#plotOptions.bellcurve.fillColor)
             *
             * @default   {highcharts} 0.75
             * @default   {highstock} 0.75
             * @apioption plotOptions.bellcurve.fillOpacity
             */
            /**
             * This option allows to define the length of the bell curve. A unit of
             * the length of the bell curve is standard deviation.
             *
             * @sample highcharts/plotoptions/bellcurve-intervals-pointsininterval
             *         Intervals and points in interval
             */
            intervals: 3,
            /**
             * Defines how many points should be plotted within 1 interval. See
             * `plotOptions.bellcurve.intervals`.
             *
             * @sample highcharts/plotoptions/bellcurve-intervals-pointsininterval
             *         Intervals and points in interval
             */
            pointsInInterval: 3,
            marker: {
                enabled: false
            }
        };
        /**
         * A `bellcurve` series. If the [type](#series.bellcurve.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to
         * [plotOptions.bellcurve](#plotOptions.bellcurve).
         *
         * @extends   series,plotOptions.bellcurve
         * @since     6.0.0
         * @product   highcharts
         * @excluding dataParser, dataURL, data, boostThreshold, boostBlending
         * @requires  modules/bellcurve
         * @apioption series.bellcurve
         */
        /**
         * An integer identifying the index to use for the base series, or a string
         * representing the id of the series.
         *
         * @type      {number|string}
         * @apioption series.bellcurve.baseSeries
         */
        /**
         * @see [fillColor](#series.bellcurve.fillColor)
         * @see [fillOpacity](#series.bellcurve.fillOpacity)
         *
         * @apioption series.bellcurve.color
         */
        /**
         * @see [color](#series.bellcurve.color)
         * @see [fillOpacity](#series.bellcurve.fillOpacity)
         *
         * @apioption series.bellcurve.fillColor
         */
        /**
         * @see [color](#series.bellcurve.color)
         * @see [fillColor](#series.bellcurve.fillColor)
         *
         * @default   {highcharts} 0.75
         * @default   {highstock} 0.75
         * @apioption series.bellcurve.fillOpacity
         */
        ''; // keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return BellcurveSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Bellcurve/BellcurveSeries.js', [_modules['Series/Bellcurve/BellcurveSeriesDefaults.js'], _modules['Series/DerivedComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (BellcurveSeriesDefaults, DerivedComposition, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Sebastian Domas
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { areaspline: AreaSplineSeries } = SeriesRegistry.seriesTypes;
        const { correctFloat, isNumber, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Bell curve class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.bellcurve
         *
         * @augments Highcharts.Series
         */
        class BellcurveSeries extends AreaSplineSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.data = void 0;
                this.options = void 0;
                this.points = void 0;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /** @private */
            static mean(data) {
                const length = data.length, sum = data.reduce(function (sum, value) {
                    return (sum += value);
                }, 0);
                return length > 0 && sum / length;
            }
            /** @private */
            static standardDeviation(data, average) {
                const len = data.length;
                average = isNumber(average) ?
                    average : BellcurveSeries.mean(data);
                const sum = data.reduce((sum, value) => {
                    const diff = value - average;
                    return (sum += diff * diff);
                }, 0);
                return len > 1 && Math.sqrt(sum / (len - 1));
            }
            /** @private */
            static normalDensity(x, mean, standardDeviation) {
                const translation = x - mean;
                return Math.exp(-(translation * translation) /
                    (2 * standardDeviation * standardDeviation)) / (standardDeviation * Math.sqrt(2 * Math.PI));
            }
            /* *
             *
             *  Functions
             *
             * */
            derivedData(mean, standardDeviation) {
                const options = this.options, intervals = options.intervals, pointsInInterval = options.pointsInInterval, stop = intervals * pointsInInterval * 2 + 1, increment = standardDeviation / pointsInInterval, data = [];
                let x = mean - intervals * standardDeviation;
                for (let i = 0; i < stop; i++) {
                    data.push([x, BellcurveSeries.normalDensity(x, mean, standardDeviation)]);
                    x += increment;
                }
                return data;
            }
            setDerivedData() {
                const series = this;
                if (series.baseSeries?.yData?.length || 0 > 1) {
                    series.setMean();
                    series.setStandardDeviation();
                    series.setData(series.derivedData(series.mean || 0, series.standardDeviation || 0), false);
                }
                return (void 0);
            }
            setMean() {
                const series = this;
                series.mean = correctFloat(BellcurveSeries.mean(series.baseSeries.yData));
            }
            setStandardDeviation() {
                const series = this;
                series.standardDeviation = correctFloat(BellcurveSeries.standardDeviation(series.baseSeries.yData, series.mean));
            }
        }
        BellcurveSeries.defaultOptions = merge(AreaSplineSeries.defaultOptions, BellcurveSeriesDefaults);
        DerivedComposition.compose(BellcurveSeries);
        SeriesRegistry.registerSeriesType('bellcurve', BellcurveSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return BellcurveSeries;
    });
    _registerModule(_modules, 'masters/modules/histogram-bellcurve.src.js', [], function () {


    });
}));