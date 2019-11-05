/**
 * @license Highcharts JS v7.2.1 (2019-10-31)
 *
 * (c) 2010-2019 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */
'use strict';
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
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'mixins/derived-series.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined;
        var Series = H.Series, addEvent = H.addEvent, noop = H.noop;
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
            /* eslint-disable valid-jsdoc */
            /**
             * Initialise series
             *
             * @private
             * @function derivedSeriesMixin.init
             * @return {void}
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
             * @return {Array<Highcharts.PointOptionsType>}
             *         An array of data
             */
            setDerivedData: noop,
            /**
             * Sets base series for the series
             *
             * @private
             * @function derivedSeriesMixin.setBaseSeries
             * @return {void}
             */
            setBaseSeries: function () {
                var chart = this.chart, baseSeriesOptions = this.options.baseSeries, baseSeries = (defined(baseSeriesOptions) &&
                    (chart.series[baseSeriesOptions] ||
                        chart.get(baseSeriesOptions)));
                this.baseSeries = baseSeries || null;
            },
            /**
             * Adds events for the series
             *
             * @private
             * @function derivedSeriesMixin.addEvents
             * @return {void}
             */
            addEvents: function () {
                var derivedSeries = this, chartSeriesLinked;
                chartSeriesLinked = addEvent(this.chart, 'afterLinkSeries', function () {
                    derivedSeries.setBaseSeries();
                    if (derivedSeries.baseSeries && !derivedSeries.initialised) {
                        derivedSeries.setDerivedData();
                        derivedSeries.addBaseSeriesEvents();
                        derivedSeries.initialised = true;
                    }
                });
                this.eventRemovers.push(chartSeriesLinked);
            },
            /**
             * Adds events to the base series - it required for recalculating the data
             * in the series if the base series is updated / removed / etc.
             *
             * @private
             * @function derivedSeriesMixin.addBaseSeriesEvents
             * @return {void}
             */
            addBaseSeriesEvents: function () {
                var derivedSeries = this, updatedDataRemover, destroyRemover;
                updatedDataRemover = addEvent(derivedSeries.baseSeries, 'updatedData', function () {
                    derivedSeries.setDerivedData();
                });
                destroyRemover = addEvent(derivedSeries.baseSeries, 'destroy', function () {
                    derivedSeries.baseSeries = null;
                    derivedSeries.initialised = false;
                });
                derivedSeries.eventRemovers.push(updatedDataRemover, destroyRemover);
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
            /* eslint-disable valid-jsdoc */
        };

        return derivedSeriesMixin;
    });
    _registerModule(_modules, 'modules/histogram.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/derived-series.js']], function (H, U, derivedSeriesMixin) {
        /* *
         *
         *  Copyright (c) 2010-2017 Highsoft AS
         *  Author: Sebastian Domas
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var arrayMax = U.arrayMax, arrayMin = U.arrayMin, isNumber = U.isNumber, objectEach = U.objectEach;
        var seriesType = H.seriesType, correctFloat = H.correctFloat, merge = H.merge;
        /* ************************************************************************** *
         *  HISTOGRAM
         * ************************************************************************** */
        /**
         * A dictionary with formulas for calculating number of bins based on the
         * base series
         **/
        var binsNumberFormulas = {
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
         * @param {Array<number>} bins - Width of the bins
         * @return {Function}
         **/
        function fitToBinLeftClosed(bins) {
            return function (y) {
                var i = 1;
                while (bins[i] <= y) {
                    i++;
                }
                return bins[--i];
            };
        }
        /**
         * Histogram class
         * @private
         * @class
         * @name Highcharts.seriesTypes.histogram
         * @augments Highcharts.Series
         */
        seriesType('histogram', 'column', 
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
         *               stacking
         * @product      highcharts
         * @since        6.0.0
         * @requires     modules/histogram
         * @optionparent plotOptions.histogram
         */
        {
            /**
             * A preferable number of bins. It is a suggestion, so a histogram may
             * have a different number of bins. By default it is set to the square
             * root of the base series' data length. Available options are:
             * `square-root`, `sturges`, `rice`. You can also define a function
             * which takes a `baseSeries` as a parameter and should return a
             * positive integer.
             *
             * @type {"square-root"|"sturges"|"rice"|number|function}
             */
            binsNumber: 'square-root',
            /**
             * Width of each bin. By default the bin's width is calculated as
             * `(max - min) / number of bins`. This option takes precedence over
             * [binsNumber](#plotOptions.histogram.binsNumber).
             *
             * @type {number}
             */
            binWidth: undefined,
            pointPadding: 0,
            groupPadding: 0,
            grouping: false,
            pointPlacement: 'between',
            tooltip: {
                headerFormat: '',
                pointFormat: ('<span style="font-size: 10px">{point.x} - {point.x2}' +
                    '</span><br/>' +
                    '<span style="color:{point.color}">\u25CF</span>' +
                    ' {series.name} <b>{point.y}</b><br/>')
            }
        }, merge(derivedSeriesMixin, {
            setDerivedData: function () {
                var yData = this.baseSeries.yData;
                if (!yData.length) {
                    return;
                }
                var data = this.derivedData(yData, this.binsNumber(), this.options.binWidth);
                this.setData(data, false);
            },
            derivedData: function (baseData, binsNumber, binWidth) {
                var series = this, max = arrayMax(baseData), 
                // Float correction needed, because first frequency value is not
                // corrected when generating frequencies (within for loop).
                min = correctFloat(arrayMin(baseData)), frequencies = [], bins = {}, data = [], x, fitToBin;
                binWidth = series.binWidth = series.options.pointRange = (correctFloat(isNumber(binWidth) ?
                    (binWidth || 1) :
                    (max - min) / binsNumber));
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
                        correctFloat(min + (frequencies.length * binWidth) - x) <= 0); x = correctFloat(x + binWidth)) {
                    frequencies.push(x);
                    bins[x] = 0;
                }
                if (bins[min] !== 0) {
                    frequencies.push(correctFloat(min));
                    bins[correctFloat(min)] = 0;
                }
                fitToBin = fitToBinLeftClosed(frequencies.map(function (elem) {
                    return parseFloat(elem);
                }));
                baseData.forEach(function (y) {
                    var x = correctFloat(fitToBin(y));
                    bins[x]++;
                });
                objectEach(bins, function (frequency, x) {
                    data.push({
                        x: Number(x),
                        y: frequency,
                        x2: correctFloat(Number(x) + binWidth)
                    });
                });
                data.sort(function (a, b) {
                    return a.x - b.x;
                });
                return data;
            },
            binsNumber: function () {
                var binsNumberOption = this.options.binsNumber;
                var binsNumber = binsNumberFormulas[binsNumberOption] ||
                    // #7457
                    (typeof binsNumberOption === 'function' && binsNumberOption);
                return Math.ceil((binsNumber && binsNumber(this.baseSeries)) ||
                    (isNumber(binsNumberOption) ?
                        binsNumberOption :
                        binsNumberFormulas['square-root'](this.baseSeries)));
            }
        }));
        /**
         * A `histogram` series. If the [type](#series.histogram.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.histogram
         * @excluding data, dataParser, dataURL
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
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'modules/bellcurve.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/derived-series.js']], function (H, U, derivedSeriesMixin) {
        /* *
         *
         *  (c) 2010-2019 Highsoft AS
         *
         *  Author: Sebastian Domas
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isNumber = U.isNumber;
        var seriesType = H.seriesType, correctFloat = H.correctFloat, merge = H.merge;
        /* ************************************************************************** *
         *  BELL CURVE                                                                *
         * ************************************************************************** */
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         */
        function mean(data) {
            var length = data.length, sum = data.reduce(function (sum, value) {
                return (sum += value);
            }, 0);
            return length > 0 && sum / length;
        }
        /**
         * @private
         */
        function standardDeviation(data, average) {
            var len = data.length, sum;
            average = isNumber(average) ? average : mean(data);
            sum = data.reduce(function (sum, value) {
                var diff = value - average;
                return (sum += diff * diff);
            }, 0);
            return len > 1 && Math.sqrt(sum / (len - 1));
        }
        /**
         * @private
         */
        function normalDensity(x, mean, standardDeviation) {
            var translation = x - mean;
            return Math.exp(-(translation * translation) /
                (2 * standardDeviation * standardDeviation)) / (standardDeviation * Math.sqrt(2 * Math.PI));
        }
        /* eslint-enable valid-jsdoc */
        /**
         * Bell curve class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.bellcurve
         *
         * @augments Highcharts.Series
         */
        seriesType('bellcurve', 'areaspline'
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
        , {
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
        }, merge(derivedSeriesMixin, {
            setMean: function () {
                this.mean = correctFloat(mean(this.baseSeries.yData));
            },
            setStandardDeviation: function () {
                this.standardDeviation = correctFloat(standardDeviation(this.baseSeries.yData, this.mean));
            },
            setDerivedData: function () {
                if (this.baseSeries.yData.length > 1) {
                    this.setMean();
                    this.setStandardDeviation();
                    this.setData(this.derivedData(this.mean, this.standardDeviation), false);
                }
                return (void 0);
            },
            derivedData: function (mean, standardDeviation) {
                var intervals = this.options.intervals, pointsInInterval = this.options.pointsInInterval, x = mean - intervals * standardDeviation, stop = intervals * pointsInInterval * 2 + 1, increment = standardDeviation / pointsInInterval, data = [], i;
                for (i = 0; i < stop; i++) {
                    data.push([x, normalDensity(x, mean, standardDeviation)]);
                    x += increment;
                }
                return data;
            }
        }));
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
         * @excluding dataParser, dataURL, data
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
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'masters/modules/histogram-bellcurve.src.js', [], function () {


    });
}));