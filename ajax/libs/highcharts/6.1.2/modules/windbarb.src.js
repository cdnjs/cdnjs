/**
 * @license  Highcharts JS v6.1.2 (2018-08-31)
 * Wind barb series module
 *
 * (c) 2010-2017 Torstein Honsi
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
	var onSeriesMixin = (function (H) {
		/**
		 * (c) 2010-2017 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */

		var each = H.each,
		    defined = H.defined,
		    seriesTypes = H.seriesTypes,
		    stableSort = H.stableSort;

		var onSeriesMixin = {

		    /**
		     * Override getPlotBox. If the onSeries option is valid, return the plot box
		     * of the onSeries, otherwise proceed as usual.
		     */
		    getPlotBox: function () {
		        return H.Series.prototype.getPlotBox.call(
		            (
		                this.options.onSeries &&
		                this.chart.get(this.options.onSeries)
		            ) || this
		        );
		    },

		    /**
		     * Extend the translate method by placing the point on the related series
		     */
		    translate: function () {

		        seriesTypes.column.prototype.translate.apply(this);

		        var series = this,
		            options = series.options,
		            chart = series.chart,
		            points = series.points,
		            cursor = points.length - 1,
		            point,
		            lastPoint,
		            optionsOnSeries = options.onSeries,
		            onSeries = optionsOnSeries && chart.get(optionsOnSeries),
		            onKey = options.onKey || 'y',
		            step = onSeries && onSeries.options.step,
		            onData = onSeries && onSeries.points,
		            i = onData && onData.length,
		            inverted = chart.inverted,
		            xAxis = series.xAxis,
		            yAxis = series.yAxis,
		            xOffset = 0,
		            leftPoint,
		            lastX,
		            rightPoint,
		            currentDataGrouping,
		            distanceRatio;

		        // relate to a master series
		        if (onSeries && onSeries.visible && i) {
		            xOffset = (onSeries.pointXOffset || 0) + (onSeries.barW || 0) / 2;
		            currentDataGrouping = onSeries.currentDataGrouping;
		            lastX = (
		                onData[i - 1].x +
		                (currentDataGrouping ? currentDataGrouping.totalRange : 0)
		            ); // #2374

		            // sort the data points
		            stableSort(points, function (a, b) {
		                return (a.x - b.x);
		            });

		            onKey = 'plot' + onKey[0].toUpperCase() + onKey.substr(1);
		            while (i-- && points[cursor]) {
		                leftPoint = onData[i];
		                point = points[cursor];
		                point.y = leftPoint.y;

		                if (leftPoint.x <= point.x && leftPoint[onKey] !== undefined) {
		                    if (point.x <= lastX) { // #803

		                        point.plotY = leftPoint[onKey];

		                        // interpolate between points, #666
		                        if (leftPoint.x < point.x && !step) {
		                            rightPoint = onData[i + 1];
		                            if (rightPoint && rightPoint[onKey] !== undefined) {
		                                // the distance ratio, between 0 and 1
		                                distanceRatio = (point.x - leftPoint.x) /
		                                    (rightPoint.x - leftPoint.x);
		                                point.plotY +=
		                                    distanceRatio *
		                                    // the plotY distance
		                                    (rightPoint[onKey] - leftPoint[onKey]);
		                                point.y +=
		                                    distanceRatio *
		                                    (rightPoint.y - leftPoint.y);
		                            }
		                        }
		                    }
		                    cursor--;
		                    i++; // check again for points in the same x position
		                    if (cursor < 0) {
		                        break;
		                    }
		                }
		            }
		        }

		        // Add plotY position and handle stacking
		        each(points, function (point, i) {

		            var stackIndex;

		            point.plotX += xOffset; // #2049

		            // Undefined plotY means the point is either on axis, outside series
		            // range or hidden series. If the series is outside the range of the
		            // x axis it should fall through with an undefined plotY, but then
		            // we must remove the shapeArgs (#847). For inverted charts, we need
		            // to calculate position anyway, because series.invertGroups is not
		            // defined
		            if (point.plotY === undefined || inverted) {
		                if (point.plotX >= 0 && point.plotX <= xAxis.len) {
		                    // We're inside xAxis range
		                    if (inverted) {
		                        point.plotY = xAxis.translate(point.x, 0, 1, 0, 1);
		                        point.plotX = defined(point.y) ?
		                            yAxis.translate(point.y, 0, 0, 0, 1) : 0;
		                    } else {
		                        point.plotY = chart.chartHeight - xAxis.bottom -
		                            (xAxis.opposite ? xAxis.height : 0) +
		                            xAxis.offset - yAxis.top; // #3517
		                    }
		                } else {
		                    point.shapeArgs = {}; // 847
		                }
		            }

		            // if multiple flags appear at the same x, order them into a stack
		            lastPoint = points[i - 1];
		            if (lastPoint && lastPoint.plotX === point.plotX) {
		                if (lastPoint.stackIndex === undefined) {
		                    lastPoint.stackIndex = 0;
		                }
		                stackIndex = lastPoint.stackIndex + 1;
		            }
		            point.stackIndex = stackIndex; // #3639
		        });

		        this.onSeries = onSeries;
		    }
		};

		return onSeriesMixin;
	}(Highcharts));
	(function (H, onSeriesMixin) {
		/**
		 * Wind barb series module
		 *
		 * (c) 2010-2017 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */

		var each = H.each,
		    noop = H.noop,
		    seriesType = H.seriesType;

		/**
		 * Wind barbs are a convenient way to represent wind speed and direction in one
		 * graphical form. Wind direction is given by the stem direction, and wind speed
		 * by the number and shape of barbs.
		 *
		 * @extends plotOptions.column
		 * @excluding boostThreshold,marker,connectEnds,connectNulls,cropThreshold,
		 *            dashStyle,gapSize,gapUnit,dataGrouping,linecap,shadow,stacking,
		 *            step
		 * @product highcharts highstock
		 * @sample {highcharts|highstock} highcharts/demo/windbarb-series/
		 *         Wind barb series
		 * @since 6.0.0
		 * @optionparent plotOptions.windbarb
		 */
		seriesType('windbarb', 'column', {
		    /**
		     * The line width of the wind barb symbols.
		     */
		    lineWidth: 2,
		    /**
		     * The id of another series in the chart that the wind barbs are projected
		     * on. When `null`, the wind symbols are drawn on the X axis, but offset
		     * up or down by the `yOffset` setting.
		     *
		     * @sample {highcharts|highstock} highcharts/plotoptions/windbarb-onseries
		     *         Projected on area series
		     * @type {String|null}
		     */
		    onSeries: null,
		    states: {
		        hover: {
		            lineWidthPlus: 0
		        }
		    },
		    tooltip: {
		        /**
		         * The default point format for the wind barb tooltip. Note the
		         * `point.beaufort` property that refers to the Beaufort wind scale. The
		         * names can be internationalized by modifying
		         * `Highcharts.seriesTypes.windbarb.prototype.beaufortNames`.
		         */
		        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.value}</b> ({point.beaufort})<br/>'
		    },
		    /**
		     * Pixel length of the stems.
		     */
		    vectorLength: 20,
		    /**
		     * Vertical offset from the cartesian position, in pixels. The default value
		     * makes sure the symbols don't overlap the X axis when `onSeries` is
		     * `null`, and that they don't overlap the linked series when `onSeries` is
		     * given.
		     */
		    yOffset: -20,
		    /**
		     * Horizontal offset from the cartesian position, in pixels. When the chart
		     * is inverted, this option allows translation like
		     * [yOffset](#plotOptions.windbarb.yOffset) in non inverted charts.
		     *
		     * @since 6.1.0
		     */
		    xOffset: 0
		}, {
		    pointArrayMap: ['value', 'direction'],
		    parallelArrays: ['x', 'value', 'direction'],
		    beaufortName: ['Calm', 'Light air', 'Light breeze',
		        'Gentle breeze', 'Moderate breeze', 'Fresh breeze',
		        'Strong breeze', 'Near gale', 'Gale', 'Strong gale', 'Storm',
		        'Violent storm', 'Hurricane'],
		    beaufortFloor: [0, 0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8,
		        24.5, 28.5, 32.7],
		    trackerGroups: ['markerGroup'],

		    /**
		     * Get presentational attributes.
		     */
		    pointAttribs: function (point, state) {
		        var options = this.options,
		            stroke = point.color || this.color,
		            strokeWidth = this.options.lineWidth;

		        if (state) {
		            stroke = options.states[state].color || stroke;
		            strokeWidth =
		                (options.states[state].lineWidth || strokeWidth) +
		                (options.states[state].lineWidthPlus || 0);
		        }

		        return {
		            'stroke': stroke,
		            'stroke-width': strokeWidth
		        };
		    },
		    markerAttribs: function () {
		        return undefined;
		    },
		    getPlotBox: onSeriesMixin.getPlotBox,
		    /**
		     * Create a single wind arrow. It is later rotated around the zero
		     * centerpoint.
		     */
		    windArrow: function (point) {
		        var knots = point.value * 1.943844,
		            level = point.beaufortLevel,
		            path,
		            barbs,
		            u = this.options.vectorLength / 20,
		            pos = -10;

		        if (point.isNull) {
		            return [];
		        }

		        if (level === 0) {
		            return this.chart.renderer.symbols.circle(
		                -10 * u,
		                -10 * u,
		                20 * u,
		                20 * u
		            );
		        }

		        // The stem and the arrow head
		        path = [
		            'M', 0, 7 * u, // base of arrow
		            'L', -1.5 * u, 7 * u,
		            0, 10 * u,
		            1.5 * u, 7 * u,
		            0, 7 * u,
		            0, -10 * u// top
		        ];

		        // For each full 50 knots, add a pennant
		        barbs = (knots - knots % 50) / 50; // pennants
		        if (barbs > 0) {
		            while (barbs--) {
		                path.push(
		                    pos === -10 ? 'L' : 'M',
		                    0,
		                    pos * u,
		                    'L',
		                    5 * u,
		                    pos * u + 2,
		                    'L',
		                    0,
		                    pos * u + 4

		                );

		                // Substract from the rest and move position for next
		                knots -= 50;
		                pos += 7;
		            }
		        }

		        // For each full 10 knots, add a full barb
		        barbs = (knots - knots % 10) / 10;
		        if (barbs > 0) {
		            while (barbs--) {
		                path.push(
		                    pos === -10 ? 'L' : 'M',
		                    0,
		                    pos * u,
		                    'L',
		                    7 * u,
		                    pos * u
		                );
		                knots -= 10;
		                pos += 3;
		            }
		        }

		        // For each full 5 knots, add a half barb
		        barbs = (knots - knots % 5) / 5; // half barbs
		        if (barbs > 0) {
		            while (barbs--) {
		                path.push(
		                    pos === -10 ? 'L' : 'M',
		                    0,
		                    pos * u,
		                    'L',
		                    4 * u,
		                    pos * u
		                );
		                knots -= 5;
		                pos += 3;
		            }
		        }
		        return path;
		    },

		    translate: function () {
		        var beaufortFloor = this.beaufortFloor,
		            beaufortName = this.beaufortName;

		        onSeriesMixin.translate.call(this);

		        each(this.points, function (point) {
		            var level = 0;
		            // Find the beaufort level (zero based)
		            for (; level < beaufortFloor.length; level++) {
		                if (beaufortFloor[level] > point.value) {
		                    break;
		                }
		            }
		            point.beaufortLevel = level - 1;
		            point.beaufort = beaufortName[level - 1];

		        });

		    },

		    drawPoints: function () {
		        var chart = this.chart,
		            yAxis = this.yAxis,
		            inverted = chart.inverted,
		            shapeOffset = this.options.vectorLength / 2;

		        each(this.points, function (point) {
		            var plotX = point.plotX,
		                plotY = point.plotY;

		            // Check if it's inside the plot area, but only for the X dimension.
		            if (chart.isInsidePlot(plotX, 0, false)) {

		                // Create the graphic the first time
		                if (!point.graphic) {
		                    point.graphic = this.chart.renderer
		                        .path()
		                        .add(this.markerGroup);
		                }

		                // Position the graphic
		                point.graphic
		                    .attr({
		                        d: this.windArrow(point),
		                        translateX: plotX + this.options.xOffset,
		                        translateY: plotY + this.options.yOffset,
		                        rotation: point.direction
		                    })
		                    .attr(this.pointAttribs(point));

		            } else if (point.graphic) {
		                point.graphic = point.graphic.destroy();
		            }

		            // Set the tooltip anchor position
		            point.tooltipPos = [
		                plotX + this.options.xOffset + (inverted && !this.onSeries ?
		                    shapeOffset : 0),
		                plotY + this.options.yOffset - (inverted ? 0 :
		                    shapeOffset + yAxis.pos - chart.plotTop)
		            ]; // #6327
		        }, this);
		    },

		    /**
		     * Fade in the arrows on initiating series.
		     */
		    animate: function (init) {
		        if (init) {
		            this.markerGroup.attr({
		                opacity: 0.01
		            });
		        } else {
		            this.markerGroup.animate({
		                opacity: 1
		            }, H.animObject(this.options.animation));

		            this.animate = null;
		        }
		    },

		    /**
		     * Don't invert the marker group (#4960)
		     */
		    invertGroups: noop
		}, {
		    isValid: function () {
		        return H.isNumber(this.value) && this.value >= 0;
		    }
		});



		/**
		 * A `windbarb` series. If the [type](#series.windbarb.type) option is not
		 * specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @extends series,plotOptions.windbarb
		 * @excluding dataParser,dataURL
		 * @product highcharts highstock
		 * @apioption series.windbarb
		 */

		/**
		 * An array of data points for the series. For the `windbarb` series type,
		 * points can be given in the following ways:
		 *
		 * 1.  An array of arrays with 3 values. In this case, the values correspond
		 * to `x,value,direction`. If the first value is a string, it is applied as
		 * the name of the point, and the `x` value is inferred.
		 *
		 *  ```js
		 *     data: [
		 *         [Date.UTC(2017, 0, 1, 0), 3.3, 90],
		 *         [Date.UTC(2017, 0, 1, 1), 12.1, 180],
		 *         [Date.UTC(2017, 0, 1, 2), 11.1, 270]
		 *     ]
		 *  ```
		 *
		 * 2.  An array of objects with named values. The objects are point
		 * configuration objects as seen below. If the total number of data
		 * points exceeds the series' [turboThreshold](#series.area.turboThreshold),
		 * this option is not available.
		 *
		 *  ```js
		 *     data: [{
		 *         x: Date.UTC(2017, 0, 1, 0),
		 *         value: 12.1,
		 *         direction: 90
		 *     }, {
		 *         x: Date.UTC(2017, 0, 1, 1),
		 *         value: 11.1,
		 *         direction: 270
		 *     }]
		 *  ```
		 *
		 * @type {Array<Object|Array|Number>}
		 * @extends series.line.data
		 * @sample {highcharts} highcharts/chart/reflow-true/
		 *         Numerical values
		 * @sample {highcharts} highcharts/series/data-array-of-arrays/
		 *         Arrays of numeric x and y
		 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
		 *         Arrays of datetime x and y
		 * @sample {highcharts} highcharts/series/data-array-of-name-value/
		 *         Arrays of point.name and y
		 * @sample {highcharts} highcharts/series/data-array-of-objects/
		 *         Config objects
		 * @product highcharts highstock
		 * @apioption series.windbarb.data
		 */

		/**
		 * The wind speed in meters per second.
		 *
		 * @type {Number}
		 * @product highcharts highstock
		 * @apioption series.windbarb.data.value
		 */

		/**
		 * The wind direction in degrees, where 0 is north (pointing towards south).
		 *
		 * @type {Number}
		 * @product highcharts highstock
		 * @apioption series.windbarb.data.direction
		 */

	}(Highcharts, onSeriesMixin));
	return (function () {


	}());
}));
