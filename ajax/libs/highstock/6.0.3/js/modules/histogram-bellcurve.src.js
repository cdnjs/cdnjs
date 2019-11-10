/**
 * @license  Highcharts JS v6.0.3 (2017-11-14)
 *
 * (c) 2010-2017 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function(factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    var derivedSeriesMixin = (function(H) {

        var each = H.each,
            Series = H.Series,
            addEvent = H.addEvent,
            fireEvent = H.fireEvent,
            wrap = H.wrap,
            noop = H.noop;


        /* ***************************************************************************
         *
         * DERIVED SERIES MIXIN
         *
         **************************************************************************** */

        /**
         * Provides methods for auto setting/updating series data based on the based series data,
         * 
         * @mixin
         **/
        var derivedSeriesMixin = {
            /**
             * Initialise series
             *
             * returns {undefined}
             **/
            init: function() {
                Series.prototype.init.apply(this, arguments);

                this.initialised = false;
                this.baseSeries = null;
                this.eventRemovers = [];

                this.addEvents();
            },

            /**
             * Method to be implemented - inside the method the series has already access to the base series
             * via m `this.baseSeries` and the bases data is initialised. It should
             * return data in the format accepted by Series.setData() method
             *
             * @returns {Array} - an array of data
             **/
            setDerivedData: noop,

            /**
             * Sets base series for the series
             *
             * returns {undefined} 
             **/
            setBaseSeries: function() {
                var chart = this.chart,
                    baseSeriesOptions = this.options.baseSeries,
                    baseSeries =
                    baseSeriesOptions &&
                    (chart.series[baseSeriesOptions] || chart.get(baseSeriesOptions));

                this.baseSeries = baseSeries || null;
            },

            /**
             * Adds events for the series
             *
             * @returns {undefined}
             **/
            addEvents: function() {
                var derivedSeries = this,
                    chartSeriesLinked;

                chartSeriesLinked = addEvent(this.chart, 'seriesLinked', function() {
                    derivedSeries.setBaseSeries();

                    if (derivedSeries.baseSeries && !derivedSeries.initialised) {
                        derivedSeries.setDerivedData();
                        derivedSeries.addBaseSeriesEvents();
                        derivedSeries.initialised = true;
                    }
                });

                this.eventRemovers.push(
                    chartSeriesLinked
                );
            },

            /**
             * Adds events to the base series - it required for recalculating the data in
             * the series if the base series is updated / removed / etc.
             *
             * @returns {undefined}
             **/
            addBaseSeriesEvents: function() {
                var derivedSeries = this,
                    updatedDataRemover,
                    destroyRemover;

                updatedDataRemover = addEvent(derivedSeries.baseSeries, 'updatedData', function() {
                    derivedSeries.setDerivedData();
                });

                destroyRemover = addEvent(derivedSeries.baseSeries, 'destroy', function() {
                    derivedSeries.baseSeries = null;
                    derivedSeries.initialised = false;
                });

                derivedSeries.eventRemovers.push(
                    updatedDataRemover,
                    destroyRemover
                );
            },

            /**
             * Destroys the series
             *
             * @returns {undefined}
             **/
            destroy: function() {
                each(this.eventRemovers, function(remover) {
                    remover();
                });

                Series.prototype.destroy.apply(this, arguments);
            }
        };

        /**
         * Adds a new chart event after the series are linked
         **/
        wrap(H.Chart.prototype, 'linkSeries', function(p) {
            p.call(this);

            fireEvent(this, 'seriesLinked');
        });
        return derivedSeriesMixin;
    }(Highcharts));
    (function(H, derivedSeriesMixin) {



        var each = H.each,
            objectEach = H.objectEach,
            seriesType = H.seriesType,
            correctFloat = H.correctFloat,
            isNumber = H.isNumber,
            arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            merge = H.merge;

        /* ***************************************************************************
         *
         * HISTOGRAM
         *
         **************************************************************************** */

        /**
         * A dictionary with formulas for calculating number of bins based on the base series
         **/
        var binsNumberFormulas = {
            'square-root': function(baseSeries) {
                return Math.round(Math.sqrt(baseSeries.options.data.length));
            },

            'sturges': function(baseSeries) {
                return Math.ceil(Math.log(baseSeries.options.data.length) * Math.LOG2E);
            },

            'rice': function(baseSeries) {
                return Math.ceil(2 * Math.pow(baseSeries.options.data.length, 1 / 3));
            }
        };

        /**
         * Returns a function for mapping number to the closed (right opened) bins
         * 
         * @param {number} binWidth - width of the bin
         * @returns {function}
         **/
        function fitToBinLeftClosed(binWidth) {
            return function(y) {
                return Math.floor(y / binWidth) * binWidth;
            };
        }

        /**
         * Histogram class
         * 
         * @constructor seriesTypes.histogram
         * @augments seriesTypes.column
         * @mixes DerivedSeriesMixin
         **/

        /**
         * A histogram is a column series which represents the distribution of the data
         * set in the base series. Histogram splits data into bins and shows their frequencies.
         *
         * @product highcharts
         * @sample {highcharts} highcharts/demo/histogram/ Histogram
         * @since 6.0.0
         * @extends plotOptions.column
         * @excluding boostThreshold, pointInterval, pointIntervalUnit, stacking
         * @optionparent plotOptions.histogram
         **/
        seriesType('histogram', 'column', {
            /**
             * A preferable number of bins. It is a suggestion, so a histogram may have
             * a different number of bins. By default it is set to the square of the
             * base series' data length. Available options are: `square-root`,
             * `sturges`, `rice`. You can also define a function which takes a
             * `baseSeries` as a parameter and should return a positive integer.
             *
             * @type {String|Number|Function}
             * @validvalue ["square-root", "sturges", "rice"]
             */
            binsNumber: 'square-root',

            /**
             * Width of each bin. By default the bin's width is calculated as `(max - min) / number of bins`.
             * This option takes precedence over [binsNumber](#plotOptions.histogram.binsNumber).
             *
             * @type {Number}
             */
            binWidth: undefined,
            pointPadding: 0,
            groupPadding: 0,
            grouping: false,
            pointPlacement: 'between',
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="font-size:10px">{point.x} - {point.x2}</span><br/>' +
                    '<span style="color:{point.color}">\u25CF</span> {series.name} <b>{point.y}</b><br/>'
            }

            /**
             * A `histogram` series. If the [type](#series.histogram.type) option is not
             * specified, it is inherited from [chart.type](#chart.type).
             * 
             * For options that apply to multiple series, it is recommended to add
             * them to the [plotOptions.series](#plotOptions.series) options structure.
             * To apply to all series of this specific type, apply it to [plotOptions.
             * histogram](#plotOptions.histogram).
             * 
             * @type {Object}
             * @since 6.0.0
             * @extends series,plotOptions.histogram
             * @excluding dataParser,dataURL,data
             * @product highcharts
             * @apioption series.histogram
             */

            /**
             * An integer identifying the index to use for the base series, or a string
             * representing the id of the series.
             *
             * @type {Number|String}
             * @default undefined
             * @apioption series.histogram.baseSeries
             */

            /**
             * An array of data points for the series. For the `histogram` series type,
             * points are calculated dynamically. See
             * [histogram.baseSeries](#series.histogram.baseSeries).
             * 
             * @type {Array<Object|Array>}
             * @since 6.0.0
             * @extends series.histogram.data
             * @product highcharts
             * @apioption series.histogram.data
             */
        }, merge(derivedSeriesMixin, {
            setDerivedData: function() {
                var data = this.derivedData(
                    this.baseSeries.yData,
                    this.binsNumber(),
                    this.options.binWidth
                );

                this.setData(data, false);
            },

            derivedData: function(baseData, binsNumber, binWidth) {
                var max = arrayMax(baseData),
                    min = arrayMin(baseData),
                    frequencies = {},
                    data = [],
                    x,
                    fitToBin;

                binWidth = this.binWidth = isNumber(binWidth) ? binWidth : (max - min) / binsNumber;
                fitToBin = fitToBinLeftClosed(binWidth);

                for (x = fitToBin(min); x <= max; x += binWidth) {
                    frequencies[correctFloat(x)] = 0;
                }

                each(baseData, function(y) {
                    var x = correctFloat(fitToBin(y));
                    frequencies[x]++;
                });

                objectEach(frequencies, function(frequency, x) {
                    data.push({
                        x: Number(x),
                        y: frequency,
                        x2: correctFloat(Number(x) + binWidth)
                    });
                });

                data.sort(function(a, b) {
                    return a.x - b.x;
                });

                return data;
            },

            binsNumber: function() {
                var binsNumberOption = this.options.binsNumber;
                var binsNumber = binsNumberFormulas[binsNumberOption] || typeof binsNumberOption === 'function';

                return Math.ceil(
                    (binsNumber && binsNumber(this.baseSeries)) ||
                    (isNumber(binsNumberOption) ? binsNumberOption : binsNumberFormulas['square-root'](this.baseSeries))
                );
            }
        }));

    }(Highcharts, derivedSeriesMixin));
    (function(H, derivedSeriesMixin) {



        var seriesType = H.seriesType,
            correctFloat = H.correctFloat,
            isNumber = H.isNumber,
            merge = H.merge,
            reduce = H.reduce;


        /* ***************************************************************************
         *
         * BELL CURVE
         *
         **************************************************************************** */

        function mean(data) {
            var length = data.length,
                sum = reduce(data, function(sum, value) {
                    return (sum += value);
                }, 0);

            return length > 0 && sum / length;
        }

        function standardDeviation(data, average) {
            var len = data.length,
                sum;

            average = isNumber(average) ? average : mean(data);

            sum = reduce(data, function(sum, value) {
                var diff = value - average;
                return (sum += diff * diff);
            }, 0);

            return len > 1 && Math.sqrt(sum / (len - 1));
        }

        function normalDensity(x, mean, standardDeviation) {
            var translation = x - mean;
            return Math.exp(-(translation * translation) /
                (2 * standardDeviation * standardDeviation)
            ) / (standardDeviation * Math.sqrt(2 * Math.PI));
        }


        /**
         * Bell curve class
         * 
         * @constructor seriesTypes.bellcurve
         * @augments seriesTypes.areaspline
         * @mixes DerivedSeriesMixin
         **/

        /**
         * A bell curve is an areaspline series which represents the probability density
         * function of the normal distribution. It calculates mean and standard
         * deviation of the base series data and plots the curve according to the
         * calculated parameters.
         *
         * @product highcharts
         * @sample {highcharts} highcharts/demo/bellcurve/ Bell curve
         * @since 6.0.0
         * @extends plotOptions.areaspline
         * @excluding boostThreshold,connectNulls,stacking,pointInterval,
         *            pointIntervalUnit
         * @optionparent plotOptions.bellcurve
         **/
        seriesType('bellcurve', 'areaspline', {
            /**
             * This option allows to define the length of the bell curve. A unit of the
             * length of the bell curve is standard deviation.
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

            /**
             * A `bellcurve` series. If the [type](#series.bellcurve.type) option is not
             * specified, it is inherited from [chart.type](#chart.type).
             * 
             * For options that apply to multiple series, it is recommended to add
             * them to the [plotOptions.series](#plotOptions.series) options structure.
             * To apply to all series of this specific type, apply it to [plotOptions.
             * bellcurve](#plotOptions.bellcurve).
             * 
             * @type {Object}
             * @since 6.0.0
             * @extends series,plotOptions.bellcurve
             * @excluding dataParser,dataURL,data
             * @product highcharts
             * @apioption series.bellcurve
             **/

            /**
             * An integer identifying the index to use for the base series, or a string
             * representing the id of the series.
             *
             * @type {Number|String}
             * @default undefined
             * @apioption series.bellcurve.baseSeries
             **/

            /**
             * An array of data points for the series. For the `bellcurve` series type,
             * points are calculated dynamically.
             * 
             * @type {Array<Object|Array>}
             * @since 6.0.0
             * @extends series.bellcurve.data
             * @product highcharts
             * @apioption series.bellcurve.data
             **/
        }, merge(derivedSeriesMixin, {
            setMean: function() {
                this.mean = correctFloat(mean(this.baseSeries.yData));
            },

            setStandardDeviation: function() {
                this.standardDeviation = correctFloat(
                    standardDeviation(this.baseSeries.yData, this.mean)
                );
            },

            setDerivedData: function() {
                if (this.baseSeries.yData.length > 1) {
                    this.setMean();
                    this.setStandardDeviation();
                    this.setData(
                        this.derivedData(this.mean, this.standardDeviation), false
                    );
                }
            },

            derivedData: function(mean, standardDeviation) {
                var intervals = this.options.intervals,
                    pointsInInterval = this.options.pointsInInterval,
                    x = mean - intervals * standardDeviation,
                    stop = intervals * pointsInInterval * 2 + 1,
                    increment = standardDeviation / pointsInInterval,
                    data = [],
                    i;

                for (i = 0; i < stop; i++) {
                    data.push([x, normalDensity(x, mean, standardDeviation)]);
                    x += increment;
                }

                return data;
            }
        }));

    }(Highcharts, derivedSeriesMixin));
}));
