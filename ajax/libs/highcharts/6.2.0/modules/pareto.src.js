/**
 * @license  Highcharts JS v6.2.0 (2018-10-17)
 *
 * Pareto series type for Highcharts
 *
 * (c) 2010-2017 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory;
		});
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {
	var derivedSeriesMixin = (function (H) {

		var each = H.each,
		    Series = H.Series,
		    addEvent = H.addEvent,
		    noop = H.noop;


		/* ***************************************************************************
		*
		* DERIVED SERIES MIXIN
		*
		**************************************************************************** */

		/**
		 * Provides methods for auto setting/updating series data based on the based
		 * series data.
		 *
		 * @mixin
		 **/
		var derivedSeriesMixin = {
		  /**
		   * Initialise series
		   *
		   * returns {undefined}
		   **/
		    init: function () {
		        Series.prototype.init.apply(this, arguments);

		        this.initialised = false;
		        this.baseSeries = null;
		        this.eventRemovers = [];

		        this.addEvents();
		    },

		  /**
		   * Method to be implemented - inside the method the series has already access
		   * to the base series via m `this.baseSeries` and the bases data is
		   * initialised. It should return data in the format accepted by
		   * `Series.setData()` method
		   *
		   * @returns {Array} - an array of data
		   **/
		    setDerivedData: noop,

		  /**
		   * Sets base series for the series
		   *
		   * returns {undefined}
		   **/
		    setBaseSeries: function () {
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
		   * Adds events to the base series - it required for recalculating the data in
		   * the series if the base series is updated / removed / etc.
		   *
		   * @returns {undefined}
		   **/
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
		   * @returns {undefined}
		   **/
		    destroy: function () {
		        each(this.eventRemovers, function (remover) {
		            remover();
		        });

		        Series.prototype.destroy.apply(this, arguments);
		    }
		};


		return derivedSeriesMixin;
	}(Highcharts));
	(function (H, derivedSeriesMixin) {
		/**
		 * (c) 2010-2017 Sebastian Bochan
		 *
		 * License: www.highcharts.com/license
		 */


		var each = H.each,
		    correctFloat = H.correctFloat,
		    seriesType = H.seriesType,
		    merge = H.merge;


		/**
		 * The pareto series type.
		 *
		 * @constructor seriesTypes.pareto
		 * @augments seriesTypes.line
		 */

		/**
		 * A pareto diagram is a type of chart that contains both bars and a line graph,
		 * where individual values are represented in descending order by bars,
		 * and the cumulative total is represented by the line.
		 *
		 * @extends plotOptions.line
		 * @product highcharts
		 * @sample {highcharts} highcharts/demo/pareto/
		 *         Pareto diagram
		 * @since 6.0.0
		 * @excluding allAreas,boostThreshold,borderColor,borderRadius,
		 *         borderWidth,crisp,colorAxis,depth,data,edgeColor,edgeWidth,
		 *         findNearestPointBy,gapSize,gapUnit,grouping,groupPadding,
		 *         groupZPadding,maxPointWidth,keys,negativeColor,pointInterval,
		 *         pointIntervalUnit,pointPadding,pointPlacement,pointRange,pointStart,
		 *         pointWidth,shadow,step,softThreshold,
		 *         stacking,threshold,zoneAxis,zones
		 * @optionparent plotOptions.pareto
		 */

		seriesType('pareto', 'line', {
		    /**
		     * Higher zIndex than column series to draw line above shapes.
		     */
		    zIndex: 3
		}, merge(derivedSeriesMixin, {
		    /**
		     * calculate sum and return percent points
		     *
		     * @param  {Object} series
		     * @return {Array} Returns array of points [x,y]
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
		     * calculate y sum and each percent point
		     *
		     * @param  {Array} yValues y values
		     * @param  {Array} xValues x values
		     * @param  {Number} sum of all y values
		     * @param  {Boolean} isSum declares if calculate sum of all points
		     * @return {Array} Returns sum of points or array of points [x,y]
		     */
		    sumPointsPercents: function (yValues, xValues, sum, isSum) {
		        var sumY = 0,
		            sumPercent = 0,
		            percentPoints = [],
		            percentPoint;

		        each(yValues, function (point, i) {
		            if (point !== null) {
		                if (isSum) {
		                    sumY += point;
		                } else {
		                    percentPoint = (point / sum) * 100;
		                    percentPoints.push(
		                        [xValues[i], correctFloat(sumPercent + percentPoint)]
		                    );
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
		 * @type {Object}
		 * @since 6.0.0
		 * @extends series,plotOptions.pareto
		 * @excluding data,dataParser,dataURL
		 * @product highcharts
		 * @apioption series.pareto
		 */

		/**
		 * An integer identifying the index to use for the base series, or a string
		 * representing the id of the series.
		 *
		 * @type {Number|String}
		 * @default undefined
		 * @apioption series.pareto.baseSeries
		 */

		/**
		 * An array of data points for the series. For the `pareto` series type,
		 * points are calculated dynamically.
		 *
		 * @type {Array<Object|Array>}
		 * @since 6.0.0
		 * @extends series.column.data
		 * @product highcharts
		 * @apioption series.pareto.data
		 */

	}(Highcharts, derivedSeriesMixin));
	return (function () {


	}());
}));
