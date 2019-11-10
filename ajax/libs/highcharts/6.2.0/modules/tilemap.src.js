/**
 * @license  Highcharts JS v6.2.0 (2018-10-17)
 * Tilemap module
 *
 * (c) 2010-2017 Highsoft AS
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
	(function (H) {
		/**
		 * (c) 2010-2018 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */
		var defined = H.defined,
		    each = H.each,
		    noop = H.noop,
		    seriesTypes = H.seriesTypes;

		/**
		 * Mixin for maps and heatmaps
		 */
		H.colorPointMixin = {
		    /**
		     * Color points have a value option that determines whether or not it is
		     * a null point
		     */
		    isValid: function () {
		        // undefined is allowed
		        return (
		            this.value !== null &&
		            this.value !== Infinity &&
		            this.value !== -Infinity
		        );
		    },

		    /**
		     * Set the visibility of a single point
		     */
		    setVisible: function (vis) {
		        var point = this,
		            method = vis ? 'show' : 'hide';

		        point.visible = Boolean(vis);

		        // Show and hide associated elements
		        each(['graphic', 'dataLabel'], function (key) {
		            if (point[key]) {
		                point[key][method]();
		            }
		        });
		    },
		    setState: function (state) {
		        H.Point.prototype.setState.call(this, state);
		        if (this.graphic) {
		            this.graphic.attr({
		                zIndex: state === 'hover' ? 1 : 0
		            });
		        }
		    }
		};

		H.colorSeriesMixin = {
		    pointArrayMap: ['value'],
		    axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
		    optionalAxis: 'colorAxis',
		    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
		    getSymbol: noop,
		    parallelArrays: ['x', 'y', 'value'],
		    colorKey: 'value',

    
		    pointAttribs: seriesTypes.column.prototype.pointAttribs,
    

		    /**
		     * In choropleth maps, the color is a result of the value, so this needs
		     * translation too
		     */
		    translateColors: function () {
		        var series = this,
		            nullColor = this.options.nullColor,
		            colorAxis = this.colorAxis,
		            colorKey = this.colorKey;

		        each(this.data, function (point) {
		            var value = point[colorKey],
		                color;

		            color = point.options.color ||
		                (
		                    point.isNull ?
		                        nullColor :
		                        (colorAxis && value !== undefined) ?
		                            colorAxis.toColor(value, point) :
		                            point.color || series.color
		                );

		            if (color) {
		                point.color = color;
		            }
		        });
		    },

		    /**
		     * Get the color attibutes to apply on the graphic
		     */
		    colorAttribs: function (point) {
		        var ret = {};
		        if (defined(point.color)) {
		            ret[this.colorProp || 'fill'] = point.color;
		        }
		        return ret;
		    }
		};

	}(Highcharts));
	(function (H) {
		/**
		 * (c) 2010-2018 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */



		var colorPointMixin = H.colorPointMixin,
		    colorSeriesMixin = H.colorSeriesMixin,
		    each = H.each,
		    LegendSymbolMixin = H.LegendSymbolMixin,
		    merge = H.merge,
		    noop = H.noop,
		    pick = H.pick,
		    Series = H.Series,
		    seriesType = H.seriesType,
		    seriesTypes = H.seriesTypes;

		/**
		 * @private
		 * @class
		 * @name Highcharts.seriesTypes.heatmap
		 *
		 * @augments Highcharts.Series
		 */
		seriesType('heatmap', 'scatter'

		/**
		 * A heatmap is a graphical representation of data where the individual values
		 * contained in a matrix are represented as colors.
		 *
		 * @sample highcharts/demo/heatmap/
		 *         Simple heatmap
		 * @sample highcharts/demo/heatmap-canvas/
		 *         Heavy heatmap
		 *
		 * @extends      {plotOptions.scatter}
		 * @excluding    animationLimit, connectEnds, connectNulls, dashStyle,
		 *               findNearestPointBy, getExtremesFromAll, linecap, lineWidth,
		 *               marker, pointInterval, pointIntervalUnit, pointRange,
		 *               pointStart, shadow, softThreshold, stacking, step, threshold
		 * @product      highcharts highmaps
		 * @optionparent plotOptions.heatmap
		 */
		, {

		    /**
		     * Animation is disabled by default on the heatmap series.
		     */
		    animation: false,

		    /**
		     * The border width for each heat map item.
		     */
		    borderWidth: 0,

		    /**
		     * Padding between the points in the heatmap.
		     *
		     * @type      {number}
		     * @default   0
		     * @since     6.0
		     * @apioption plotOptions.heatmap.pointPadding
		     */

		    /**
		     * The main color of the series. In heat maps this color is rarely used,
		     * as we mostly use the color to denote the value of each point. Unless
		     * options are set in the [colorAxis](#colorAxis), the default value
		     * is pulled from the [options.colors](#colors) array.
		     *
		     * @type      {Highcharts.ColorString}
		     * @since     4.0
		     * @product   highcharts
		     * @apioption plotOptions.heatmap.color
		     */

		    /**
		     * The column size - how many X axis units each column in the heatmap
		     * should span.
		     *
		     * @sample {highcharts} maps/demo/heatmap/
		     *         One day
		     * @sample {highmaps} maps/demo/heatmap/
		     *         One day
		     *
		     * @type      {number}
		     * @default   1
		     * @since     4.0
		     * @product   highcharts highmaps
		     * @apioption plotOptions.heatmap.colsize
		     */

		    /**
		     * The row size - how many Y axis units each heatmap row should span.
		     *
		     * @sample {highcharts} maps/demo/heatmap/
		     *         1 by default
		     * @sample {highmaps} maps/demo/heatmap/
		     *         1 by default
		     *
		     * @type      {number}
		     * @default   1
		     * @since     4.0
		     * @product   highcharts highmaps
		     * @apioption plotOptions.heatmap.rowsize
		     */

    

		    /**
		     * The color applied to null points. In styled mode, a general CSS class is
		     * applied instead.
		     *
		     * @type {Highcharts.ColorString}
		     */
		    nullColor: '#f7f7f7',

    

		    dataLabels: {
		        formatter: function () { // #2945
		            return this.point.value;
		        },
		        inside: true,
		        verticalAlign: 'middle',
		        crop: false,
		        overflow: false,
		        padding: 0 // #3837
		    },

		    /**
		     * @ignore
		     */
		    marker: null,

		    /**
		     * @ignore
		     */
		    pointRange: null, // dynamically set to colsize by default

		    tooltip: {
		        pointFormat: '{point.x}, {point.y}: {point.value}<br/>'
		    },

		    states: {

		        hover: {

		            /**
		             * @ignore
		             */
		            halo: false,  // #3406, halo is disabled on heatmaps by default

		            /**
		             * How much to brighten the point on interaction. Requires the main
		             * color to be defined in hex or rgb(a) format.
		             *
		             * In styled mode, the hover brightening is by default replaced
		             * with a fill-opacity set in the `.highcharts-point:hover` rule.
		             *
		             * @product highcharts highmaps
		             */
		            brightness: 0.2
		        }

		    }

		}, merge(colorSeriesMixin, {

		    pointArrayMap: ['y', 'value'],
		    hasPointSpecificOptions: true,
		    getExtremesFromAll: true,
		    directTouch: true,

		    /**
		     * Override the init method to add point ranges on both axes.
		     *
		     * @private
		     * @function Highcharts.seriesTypes.heatmap#init
		     */
		    init: function () {
		        var options;
		        seriesTypes.scatter.prototype.init.apply(this, arguments);

		        options = this.options;
		        // #3758, prevent resetting in setData
		        options.pointRange = pick(options.pointRange, options.colsize || 1);
		        this.yAxis.axisPointRange = options.rowsize || 1; // general point range
		    },

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.heatmap#translate
		     */
		    translate: function () {
		        var series = this,
		            options = series.options,
		            xAxis = series.xAxis,
		            yAxis = series.yAxis,
		            seriesPointPadding = options.pointPadding || 0,
		            between = function (x, a, b) {
		                return Math.min(Math.max(a, x), b);
		            };

		        series.generatePoints();

		        each(series.points, function (point) {
		            var xPad = (options.colsize || 1) / 2,
		                yPad = (options.rowsize || 1) / 2,
		                x1 = between(
		                    Math.round(
		                        xAxis.len -
		                        xAxis.translate(point.x - xPad, 0, 1, 0, 1)
		                    ),
		                    -xAxis.len, 2 * xAxis.len
		                ),
		                x2 = between(
		                    Math.round(
		                        xAxis.len -
		                        xAxis.translate(point.x + xPad, 0, 1, 0, 1)
		                    ),
		                    -xAxis.len, 2 * xAxis.len
		                ),
		                y1 = between(
		                    Math.round(yAxis.translate(point.y - yPad, 0, 1, 0, 1)),
		                    -yAxis.len, 2 * yAxis.len
		                ),
		                y2 = between(
		                    Math.round(yAxis.translate(point.y + yPad, 0, 1, 0, 1)),
		                    -yAxis.len, 2 * yAxis.len
		                ),
		                pointPadding = pick(point.pointPadding, seriesPointPadding);

		            // Set plotX and plotY for use in K-D-Tree and more
		            point.plotX = point.clientX = (x1 + x2) / 2;
		            point.plotY = (y1 + y2) / 2;

		            point.shapeType = 'rect';
		            point.shapeArgs = {
		                x: Math.min(x1, x2) + pointPadding,
		                y: Math.min(y1, y2) + pointPadding,
		                width: Math.abs(x2 - x1) - pointPadding * 2,
		                height: Math.abs(y2 - y1) - pointPadding * 2
		            };
		        });

		        series.translateColors();
		    },

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.heatmap#drawPoints
		     */
		    drawPoints: function () {
		        seriesTypes.column.prototype.drawPoints.call(this);

		        each(this.points, function (point) {
            
		            point.graphic.attr(this.colorAttribs(point));
            
		        }, this);
		    },

		    /**
		     * @ignore
		     * @deprecated
		     * @function Highcharts.seriesTypes.heatmap#animate
		     */
		    animate: noop,

		    /**
		     * @ignore
		     * @deprecated
		     * @function Highcharts.seriesTypes.heatmap#getBox
		     */
		    getBox: noop,

		    /**
		     * @private
		     * @borrows Highcharts.LegendSymbolMixin.drawRectangle as Highcharts.seriesTypes.heatmap#drawLegendSymbol
		     */
		    drawLegendSymbol: LegendSymbolMixin.drawRectangle,

		    /**
		     * @private
		     * @borrows Highcharts.seriesTypes.column#alignDataLabel as Highcharts.seriesTypes.heatmap#alignDataLabel
		     */
		    alignDataLabel: seriesTypes.column.prototype.alignDataLabel,

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.heatmap#getExtremes
		     */
		    getExtremes: function () {
		        // Get the extremes from the value data
		        Series.prototype.getExtremes.call(this, this.valueData);
		        this.valueMin = this.dataMin;
		        this.valueMax = this.dataMax;

		        // Get the extremes from the y data
		        Series.prototype.getExtremes.call(this);
		    }

		}), H.extend({

		    /**
		     * @private
		     * @function Highcharts.Point#haloPath
		     *
		     * @param {number} size
		     *
		     * @return {Highcharts.SVGPathArray}
		     */
		    haloPath: function (size) {
		        if (!size) {
		            return [];
		        }
		        var rect = this.shapeArgs;
		        return [
		            'M', rect.x - size, rect.y - size,
		            'L', rect.x - size, rect.y + rect.height + size,
		            rect.x + rect.width + size, rect.y + rect.height + size,
		            rect.x + rect.width + size, rect.y - size,
		            'Z'
		        ];
		    }
		}, colorPointMixin));

		/**
		 * A `heatmap` series. If the [type](#series.heatmap.type) option is
		 * not specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @extends   series,plotOptions.heatmap
		 * @excluding dataParser, dataURL, marker, pointRange, stack
		 * @product   highcharts highmaps
		 * @apioption series.heatmap
		 */

		/**
		 * An array of data points for the series. For the `heatmap` series
		 * type, points can be given in the following ways:
		 *
		 * 1.  An array of arrays with 3 or 2 values. In this case, the values
		 * correspond to `x,y,value`. If the first value is a string, it is
		 * applied as the name of the point, and the `x` value is inferred.
		 * The `x` value can also be omitted, in which case the inner arrays
		 * should be of length 2\. Then the `x` value is automatically calculated,
		 * either starting at 0 and incremented by 1, or from `pointStart`
		 * and `pointInterval` given in the series options.
		 *
		 *  ```js
		 *     data: [
		 *         [0, 9, 7],
		 *         [1, 10, 4],
		 *         [2, 6, 3]
		 *     ]
		 *  ```
		 *
		 * 2.  An array of objects with named values. The following snippet shows only a
		 * few settings, see the complete options set below. If the total number of data
		 * points exceeds the series' [turboThreshold](#series.heatmap.turboThreshold),
		 * this option is not available.
		 *
		 *  ```js
		 *     data: [{
		 *         x: 1,
		 *         y: 3,
		 *         value: 10,
		 *         name: "Point2",
		 *         color: "#00FF00"
		 *     }, {
		 *         x: 1,
		 *         y: 7,
		 *         value: 10,
		 *         name: "Point1",
		 *         color: "#FF00FF"
		 *     }]
		 *  ```
		 *
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
		 *
		 * @type      {Array<Array<number>|*>}
		 * @extends   series.line.data
		 * @excluding marker
		 * @product   highcharts highmaps
		 * @apioption series.heatmap.data
		 */

		/**
		 * The color of the point. In heat maps the point color is rarely set
		 * explicitly, as we use the color to denote the `value`. Options for
		 * this are set in the [colorAxis](#colorAxis) configuration.
		 *
		 * @type      {Highcharts.ColorString}
		 * @product   highcharts highmaps
		 * @apioption series.heatmap.data.color
		 */

		/**
		 * The value of the point, resulting in a color controled by options
		 * as set in the [colorAxis](#colorAxis) configuration.
		 *
		 * @type      {number}
		 * @product   highcharts highmaps
		 * @apioption series.heatmap.data.value
		 */

		/**
		 * The x value of the point. For datetime axes,
		 * the X value is the timestamp in milliseconds since 1970.
		 *
		 * @type      {number}
		 * @product   highcharts highmaps
		 * @apioption series.heatmap.data.x
		 */

		/**
		 * The y value of the point.
		 *
		 * @type      {number}
		 * @product   highcharts highmaps
		 * @apioption series.heatmap.data.y
		 */

		/**
		 * Point padding for a single point.
		 *
		 * @sample maps/plotoptions/tilemap-pointpadding
		 *         Point padding on tiles
		 *
		 * @type      {number}
		 * @apioption series.heatmap.data.pointPadding
		 */


	}(Highcharts));
	(function (H) {
		/**
		 * Tilemaps module
		 *
		 * (c) 2010-2017 Highsoft AS
		 * Author: Øystein Moseng
		 *
		 * License: www.highcharts.com/license
		 */



		var seriesType = H.seriesType,
		    each = H.each,
		    reduce = H.reduce,
		    pick = H.pick,
		    // Utility func to get the middle number of 3
		    between = function (x, a, b) {
		        return Math.min(Math.max(a, x), b);
		    },
		    // Utility func to get padding definition from tile size division
		    tilePaddingFromTileSize = function (series, xDiv, yDiv) {
		        var options = series.options;
		        return {
		            xPad: (options.colsize || 1) / -xDiv,
		            yPad: (options.rowsize || 1) / -yDiv
		        };
		    };

		/**
		 * Map of shape types.
		 *
		 * @private
		 * @name Highcharts.tileShapeTypes
		 * @type {*}
		 */
		H.tileShapeTypes = {

		    /**
		     * Hexagon shape type.
		     *
		     * @private
		     * @name Highcharts.tileShapeTypes.hexagon
		     * @type {*}
		     */
		    hexagon: {
		        alignDataLabel: H.seriesTypes.scatter.prototype.alignDataLabel,
		        getSeriesPadding: function (series) {
		            return tilePaddingFromTileSize(series, 3, 2);
		        },
		        haloPath: function (size) {
		            if (!size) {
		                return [];
		            }
		            var hexagon = this.tileEdges;
		            return [
		                'M', hexagon.x2 - size, hexagon.y1 + size,
		                'L', hexagon.x3 + size, hexagon.y1 + size,
		                hexagon.x4 + size * 1.5, hexagon.y2,
		                hexagon.x3 + size, hexagon.y3 - size,
		                hexagon.x2 - size, hexagon.y3 - size,
		                hexagon.x1 - size * 1.5, hexagon.y2,
		                'Z'
		            ];
		        },
		        translate: function () {
		            var series = this,
		                options = series.options,
		                xAxis = series.xAxis,
		                yAxis = series.yAxis,
		                seriesPointPadding = options.pointPadding || 0,
		                xPad = (options.colsize || 1) / 3,
		                yPad = (options.rowsize || 1) / 2,
		                yShift;

		            series.generatePoints();

		            each(series.points, function (point) {
		                var x1 = between(
		                        Math.floor(
		                            xAxis.len -
		                            xAxis.translate(point.x - xPad * 2, 0, 1, 0, 1)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    x2 = between(
		                        Math.floor(
		                            xAxis.len -
		                            xAxis.translate(point.x - xPad, 0, 1, 0, 1)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    x3 = between(
		                        Math.floor(
		                            xAxis.len -
		                            xAxis.translate(point.x + xPad, 0, 1, 0, 1)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    x4 = between(
		                        Math.floor(
		                            xAxis.len -
		                            xAxis.translate(point.x + xPad * 2, 0, 1, 0, 1)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    y1 = between(
		                        Math.floor(yAxis.translate(point.y - yPad, 0, 1, 0, 1)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    y2 = between(
		                        Math.floor(yAxis.translate(point.y, 0, 1, 0, 1)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    y3 = between(
		                        Math.floor(yAxis.translate(point.y + yPad, 0, 1, 0, 1)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    pointPadding = pick(point.pointPadding, seriesPointPadding),
		                    // We calculate the point padding of the midpoints to
		                    // preserve the angles of the shape.
		                    midPointPadding = pointPadding *
		                        Math.abs(x2 - x1) / Math.abs(y3 - y2),
		                    xMidPadding = xAxis.reversed ?
		                        -midPointPadding : midPointPadding,
		                    xPointPadding = xAxis.reversed ?
		                        -pointPadding : pointPadding,
		                    yPointPadding = yAxis.reversed ?
		                        -pointPadding : pointPadding;

		                // Shift y-values for every second grid column
		                if (point.x % 2) {
		                    yShift = yShift || Math.round(Math.abs(y3 - y1) / 2) *
		                        // We have to reverse the shift for reversed y-axes
		                        (yAxis.reversed ? -1 : 1);
		                    y1 += yShift;
		                    y2 += yShift;
		                    y3 += yShift;
		                }

		                // Set plotX and plotY for use in K-D-Tree and more
		                point.plotX = point.clientX = (x2 + x3) / 2;
		                point.plotY = y2;

		                // Apply point padding to translated coordinates
		                x1 += xMidPadding + xPointPadding;
		                x2 += xPointPadding;
		                x3 -= xPointPadding;
		                x4 -= xMidPadding + xPointPadding;
		                y1 -= yPointPadding;
		                y3 += yPointPadding;

		                // Store points for halo creation
		                point.tileEdges = {
		                    x1: x1, x2: x2, x3: x3, x4: x4, y1: y1, y2: y2, y3: y3
		                };

		                // Finally set the shape for this point
		                point.shapeType = 'path';
		                point.shapeArgs = {
		                    d: [
		                        'M', x2, y1,
		                        'L', x3, y1,
		                        x4, y2,
		                        x3, y3,
		                        x2, y3,
		                        x1, y2,
		                        'Z'
		                    ]
		                };
		            });

		            series.translateColors();
		        }
		    },


		    /**
		     * Diamond shape type.
		     *
		     * @private
		     * @name Highcharts.tileShapeTypes.diamond
		     * @type {*}
		     */
		    diamond: {
		        alignDataLabel: H.seriesTypes.scatter.prototype.alignDataLabel,
		        getSeriesPadding: function (series) {
		            return tilePaddingFromTileSize(series, 2, 2);
		        },
		        haloPath: function (size) {
		            if (!size) {
		                return [];
		            }
		            var diamond = this.tileEdges;
		            return [
		                'M', diamond.x2, diamond.y1 + size,
		                'L', diamond.x3 + size, diamond.y2,
		                diamond.x2, diamond.y3 - size,
		                diamond.x1 - size, diamond.y2,
		                'Z'
		            ];
		        },
		        translate: function () {
		            var series = this,
		                options = series.options,
		                xAxis = series.xAxis,
		                yAxis = series.yAxis,
		                seriesPointPadding = options.pointPadding || 0,
		                xPad = (options.colsize || 1),
		                yPad = (options.rowsize || 1) / 2,
		                yShift;

		            series.generatePoints();

		            each(series.points, function (point) {
		                var x1 = between(
		                        Math.round(
		                            xAxis.len -
		                            xAxis.translate(point.x - xPad, 0, 1, 0, 0)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    x2 = between(
		                        Math.round(
		                            xAxis.len -
		                            xAxis.translate(point.x, 0, 1, 0, 0)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    x3 = between(
		                        Math.round(
		                            xAxis.len -
		                            xAxis.translate(point.x + xPad, 0, 1, 0, 0)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    y1 = between(
		                        Math.round(yAxis.translate(point.y - yPad, 0, 1, 0, 0)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    y2 = between(
		                        Math.round(yAxis.translate(point.y, 0, 1, 0, 0)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    y3 = between(
		                        Math.round(yAxis.translate(point.y + yPad, 0, 1, 0, 0)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    pointPadding = pick(point.pointPadding, seriesPointPadding),
		                    // We calculate the point padding of the midpoints to
		                    // preserve the angles of the shape.
		                    midPointPadding = pointPadding *
		                        Math.abs(x2 - x1) / Math.abs(y3 - y2),
		                    xPointPadding = xAxis.reversed ?
		                        -midPointPadding : midPointPadding,
		                    yPointPadding = yAxis.reversed ?
		                        -pointPadding : pointPadding;

		                // Shift y-values for every second grid column
		                // We have to reverse the shift for reversed y-axes
		                if (point.x % 2) {
		                    yShift = Math.abs(y3 - y1) / 2 * (yAxis.reversed ? -1 : 1);
		                    y1 += yShift;
		                    y2 += yShift;
		                    y3 += yShift;
		                }

		                // Set plotX and plotY for use in K-D-Tree and more
		                point.plotX = point.clientX = x2;
		                point.plotY = y2;

		                // Apply point padding to translated coordinates
		                x1 += xPointPadding;
		                x3 -= xPointPadding;
		                y1 -= yPointPadding;
		                y3 += yPointPadding;

		                // Store points for halo creation
		                point.tileEdges = {
		                    x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3
		                };

		                // Set this point's shape parameters
		                point.shapeType = 'path';
		                point.shapeArgs = {
		                    d: [
		                        'M', x2, y1,
		                        'L', x3, y2,
		                        x2, y3,
		                        x1, y2,
		                        'Z'
		                    ]
		                };
		            });

		            series.translateColors();
		        }
		    },


		    /**
		     * Circle shape type.
		     *
		     * @private
		     * @name Highcharts.tileShapeTypes.circle
		     * @type {*}
		     */
		    circle: {
		        alignDataLabel: H.seriesTypes.scatter.prototype.alignDataLabel,
		        getSeriesPadding: function (series) {
		            return tilePaddingFromTileSize(series, 2, 2);
		        },
		        haloPath: function (size) {
		            return H.seriesTypes.scatter.prototype.pointClass.prototype.haloPath
		                .call(this,
		                    size + (size && this.radius)
		                );
		        },
		        translate: function () {
		            var series = this,
		                options = series.options,
		                xAxis = series.xAxis,
		                yAxis = series.yAxis,
		                seriesPointPadding = options.pointPadding || 0,
		                yRadius = (options.rowsize || 1) / 2,
		                colsize = (options.colsize || 1),
		                colsizePx,
		                yRadiusPx,
		                xRadiusPx,
		                radius,
		                forceNextRadiusCompute = false;

		            series.generatePoints();

		            each(series.points, function (point) {
		                var x = between(
		                        Math.round(
		                            xAxis.len -
		                            xAxis.translate(point.x, 0, 1, 0, 0)
		                        ), -xAxis.len, 2 * xAxis.len
		                    ),
		                    y = between(
		                        Math.round(yAxis.translate(point.y, 0, 1, 0, 0)),
		                        -yAxis.len,
		                        2 * yAxis.len
		                    ),
		                    pointPadding = seriesPointPadding,
		                    hasPerPointPadding = false;

		                // If there is point padding defined on a single point, add it
		                if (point.pointPadding !== undefined) {
		                    pointPadding = point.pointPadding;
		                    hasPerPointPadding = true;
		                    forceNextRadiusCompute = true;
		                }

		                // Find radius if not found already.
		                // Use the smallest one (x vs y) to avoid overlap.
		                // Note that the radius will be recomputed for each series.
		                // Ideal (max) x radius is dependent on y radius:
		                /*
		                                * (circle 2)

		                                        * (circle 3)
		                                        |    yRadiusPx
		                    (circle 1)    *-------|
		                                 colsizePx

		                    The distance between circle 1 and 3 (and circle 2 and 3) is
		                    2r, which is the hypotenuse of the triangle created by
		                    colsizePx and yRadiusPx. If the distance between circle 2
		                    and circle 1 is less than 2r, we use half of that distance
		                    instead (yRadiusPx).
		                */
		                if (!radius || forceNextRadiusCompute) {
		                    colsizePx = Math.abs(
		                        between(
		                            Math.floor(
		                                xAxis.len -
		                                xAxis.translate(point.x + colsize, 0, 1, 0, 0)
		                            ), -xAxis.len, 2 * xAxis.len
		                        ) - x
		                    );
		                    yRadiusPx = Math.abs(
		                        between(
		                            Math.floor(
		                                yAxis.translate(point.y + yRadius, 0, 1, 0, 0)
		                            ), -yAxis.len, 2 * yAxis.len
		                        ) - y
		                    );
		                    xRadiusPx = Math.floor(
		                        Math.sqrt(
		                            (colsizePx * colsizePx + yRadiusPx * yRadiusPx)
		                        ) / 2
		                    );
		                    radius = Math.min(
		                        colsizePx, xRadiusPx, yRadiusPx
		                    ) - pointPadding;

		                    // If we have per point padding we need to always compute
		                    // the radius for this point and the next. If we used to
		                    // have per point padding but don't anymore, don't force
		                    // compute next radius.
		                    if (forceNextRadiusCompute && !hasPerPointPadding) {
		                        forceNextRadiusCompute = false;
		                    }
		                }

		                // Shift y-values for every second grid column.
		                // Note that we always use the optimal y axis radius for this.
		                // Also note: We have to reverse the shift for reversed y-axes.
		                if (point.x % 2) {
		                    y += yRadiusPx * (yAxis.reversed ? -1 : 1);
		                }

		                // Set plotX and plotY for use in K-D-Tree and more
		                point.plotX = point.clientX = x;
		                point.plotY = y;

		                // Save radius for halo
		                point.radius = radius;

		                // Set this point's shape parameters
		                point.shapeType = 'circle';
		                point.shapeArgs = {
		                    x: x,
		                    y: y,
		                    r: radius
		                };
		            });

		            series.translateColors();
		        }
		    },


		    /**
		     * Square shape type.
		     *
		     * @private
		     * @name Highcharts.tileShapeTypes.square
		     * @type {*}
		     */
		    square: {
		        alignDataLabel: H.seriesTypes.heatmap.prototype.alignDataLabel,
		        translate: H.seriesTypes.heatmap.prototype.translate,
		        getSeriesPadding: function () {
		            return;
		        },
		        haloPath: H.seriesTypes.heatmap.prototype.pointClass.prototype.haloPath
		    }
		};


		// Extension to add pixel padding for series. Uses getSeriesPixelPadding on each
		// series and adds the largest padding required. If no series has this function
		// defined, we add nothing.
		H.wrap(H.Axis.prototype, 'setAxisTranslation', function (proceed) {

		    // We need to run the original func first, so that we know the translation
		    // formula to use for computing the padding
		    proceed.apply(this, Array.prototype.slice.call(arguments, 1));

		    var axis = this,
		        // Find which series' padding to use
		        seriesPadding = reduce(H.map(axis.series, function (series) {
		            return series.getSeriesPixelPadding &&
		                series.getSeriesPixelPadding(axis);
		        }), function (a, b) {
		            return (a && a.padding) > (b && b.padding) ? a : b;
		        }, undefined) || {
		            padding: 0,
		            axisLengthFactor: 1
		        },
		        lengthPadding = Math.round(
		            seriesPadding.padding * seriesPadding.axisLengthFactor
		        );

		    // Don't waste time on this if we're not adding extra padding
		    if (seriesPadding.padding) {
		        // Recompute translation with new axis length now (minus padding)
		        axis.len -= lengthPadding;
		        proceed.apply(axis, Array.prototype.slice.call(arguments, 1));
		        axis.minPixelPadding += seriesPadding.padding;
		        axis.len += lengthPadding;
		    }
		});

		/**
		 * @private
		 * @class
		 * @name Highcharts.seriesTypes.tilemap
		 *
		 * @augments Highcharts.Series
		 */
		seriesType('tilemap', 'heatmap'

		/**
		 * A tilemap series is a type of heatmap where the tile shapes are configurable.
		 *
		 * @sample highcharts/demo/honeycomb-usa/
		 *         Honeycomb tilemap, USA
		 * @sample maps/plotoptions/honeycomb-brazil/
		 *         Honeycomb tilemap, Brazil
		 * @sample maps/plotoptions/honeycomb-china/
		 *         Honeycomb tilemap, China
		 * @sample maps/plotoptions/honeycomb-europe/
		 *         Honeycomb tilemap, Europe
		 * @sample maps/demo/circlemap-africa/
		 *         Circlemap tilemap, Africa
		 * @sample maps/demo/diamondmap
		 *         Diamondmap tilemap
		 *
		 * @extends      plotOptions.heatmap
		 * @since        6.0.0
		 * @excluding    joinBy, shadow, allAreas, mapData, data
		 * @product      highcharts highmaps
		 * @optionparent plotOptions.tilemap
		 */
		, { // Default options

		    states: {

		        hover: {

		            halo: {

		                enabled: true,

		                size: 2,

		                opacity: 0.5,

		                attributes: {

		                    zIndex: 3
		                }
		            }
		        }
		    },

		    /**
		     * The padding between points in the tilemap.
		     *
		     * @sample maps/plotoptions/tilemap-pointpadding
		     *         Point padding on tiles
		     */
		    pointPadding: 2,

		    /**
		     * The column size - how many X axis units each column in the tilemap
		     * should span. Works as in [Heatmaps](#plotOptions.heatmap.colsize).
		     *
		     * @sample {highcharts} maps/demo/heatmap/
		     *         One day
		     * @sample {highmaps} maps/demo/heatmap/
		     *         One day
		     *
		     * @type      {number}
		     * @default   1
		     * @product   highcharts highmaps
		     * @apioption plotOptions.tilemap.colsize
		     */

		    /**
		     * The row size - how many Y axis units each tilemap row should span.
		     * Analogous to [colsize](#plotOptions.tilemap.colsize).
		     *
		     * @sample {highcharts} maps/demo/heatmap/
		     *         1 by default
		     * @sample {highmaps} maps/demo/heatmap/
		     *         1 by default
		     *
		     * @type      {number}
		     * @default   1
		     * @product   highcharts highmaps
		     * @apioption plotOptions.tilemap.rowsize
		     */

		    /**
		     * The shape of the tiles in the tilemap. Possible values are `hexagon`,
		     * `circle`, `diamond`, and `square`.
		     *
		     * @sample maps/demo/circlemap-africa
		     *         Circular tile shapes
		     * @sample maps/demo/diamondmap
		     *         Diamond tile shapes
		     *
		     * @validvalue ["circle", "diamond", "hexagon", "square"]
		     */
		    tileShape: 'hexagon'

		}, { // Prototype functions

		    /**
		     * Set tile shape object on series
		     *
		     * @private
		     * @function Highcharts.seriesTypes.tilemap#setOptions
		     *
		     * @return {*}
		     */
		    setOptions: function () {
		        // Call original function
		        var ret = H.seriesTypes.heatmap.prototype.setOptions.apply(this,
		            Array.prototype.slice.call(arguments)
		        );

		        this.tileShape = H.tileShapeTypes[ret.tileShape];
		        return ret;
		    },

		    /**
		     * Use the shape's defined data label alignment function
		     *
		     * @private
		     * @function Highcharts.seriesTypes.tilemap#alignDataLabel
		     *
		     * @return {*}
		     */
		    alignDataLabel: function () {
		        return this.tileShape.alignDataLabel.apply(this,
		            Array.prototype.slice.call(arguments)
		        );
		    },

		    /**
		     * Get metrics for padding of axis for this series
		     *
		     * @private
		     * @function Highcharts.seriesTypes.tilemap#getSeriesPixelPadding
		     *
		     * @param {Highcharts.Axis} axis
		     *
		     * @return {*}
		     */
		    getSeriesPixelPadding: function (axis) {
		        var isX = axis.isXAxis,
		            padding = this.tileShape.getSeriesPadding(this),
		            coord1,
		            coord2;

		        // If the shape type does not require padding, return no-op padding
		        if (!padding) {
		            return {
		                padding: 0,
		                axisLengthFactor: 1
		            };
		        }

		        // Use translate to compute how far outside the points we
		        // draw, and use this difference as padding.
		        coord1 = Math.round(
		            axis.translate(
		                isX ?
		                    padding.xPad * 2 :
		                    padding.yPad,
		                0, 1, 0, 1
		            )
		        );
		        coord2 = Math.round(
		            axis.translate(
		                isX ? padding.xPad : 0,
		                0, 1, 0, 1
		            )
		        );

		        return {
		            padding: Math.abs(coord1 - coord2) || 0,

		            // Offset the yAxis length to compensate for shift.
		            // Setting the length factor to 2 would add the same margin to max
		            // as min. Now we only add a slight bit of the min margin to max, as
		            // we don't actually draw outside the max bounds. For the xAxis we
		            // draw outside on both sides so we add the same margin to min and
		            // max.
		            axisLengthFactor: isX ? 2 : 1.1
		        };
		    },

		    /**
		     * Use translate from tileShape
		     *
		     * @private
		     * @function Highcharts.seriesTypes.tilemap#translate
		     */
		    translate: function () {
		        return this.tileShape.translate.apply(this,
		            Array.prototype.slice.call(arguments)
		        );
		    }

		}, H.extend({

		    /**
		     * @private
		     * @function Highcharts.Point#haloPath
		     *
		     * @return {Highcharts.SVGPathArray}
		     */
		    haloPath: function () {
		        return this.series.tileShape.haloPath.apply(this,
		            Array.prototype.slice.call(arguments)
		        );
		    }
		}, H.colorPointMixin));

		/**
		 * A `tilemap` series. If the [type](#series.tilemap.type) option is
		 * not specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @extends   series,plotOptions.tilemap
		 * @excluding allAreas, dataParser, dataURL, joinBy, mapData, marker,
		 *            pointRange, shadow, stack
		 * @product   highcharts highmaps
		 * @apioption series.tilemap
		 */

		/**
		 * An array of data points for the series. For the `tilemap` series
		 * type, points can be given in the following ways:
		 *
		 * 1.  An array of arrays with 3 or 2 values. In this case, the values
		 * correspond to `x,y,value`. If the first value is a string, it is
		 * applied as the name of the point, and the `x` value is inferred.
		 * The `x` value can also be omitted, in which case the inner arrays
		 * should be of length 2\. Then the `x` value is automatically calculated,
		 * either starting at 0 and incremented by 1, or from `pointStart`
		 * and `pointInterval` given in the series options.
		 *
		 *  ```js
		 *     data: [
		 *         [0, 9, 7],
		 *         [1, 10, 4],
		 *         [2, 6, 3]
		 *     ]
		 *  ```
		 *
		 * 2.  An array of objects with named values. The objects are point
		 * configuration objects as seen below. If the total number of data
		 * points exceeds the series' [turboThreshold](#series.tilemap.turboThreshold),
		 * this option is not available.
		 *
		 *  ```js
		 *     data: [{
		 *         x: 1,
		 *         y: 3,
		 *         value: 10,
		 *         name: "Point2",
		 *         color: "#00FF00"
		 *     }, {
		 *         x: 1,
		 *         y: 7,
		 *         value: 10,
		 *         name: "Point1",
		 *         color: "#FF00FF"
		 *     }]
		 *  ```
		 *
		 * Note that for some [tileShapes](#plotOptions.tilemap.tileShape) the grid
		 * coordinates are offset.
		 *
		 * @sample maps/series/tilemap-gridoffset
		 *         Offset grid coordinates
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
		 *
		 * @type      {Array<Array<number>|*>}
		 * @extends   series.heatmap.data
		 * @excluding marker
		 * @product   highcharts highmaps
		 * @apioption series.tilemap.data
		 */

		/**
		 * The color of the point. In tilemaps the point color is rarely set
		 * explicitly, as we use the color to denote the `value`. Options for
		 * this are set in the [colorAxis](#colorAxis) configuration.
		 *
		 * @type      {Highcharts.ColorString}
		 * @product   highcharts highmaps
		 * @apioption series.tilemap.data.color
		 */

		/**
		 * The x coordinate of the point.
		 *
		 * Note that for some [tileShapes](#plotOptions.tilemap.tileShape) the grid
		 * coordinates are offset.
		 *
		 * @sample maps/series/tilemap-gridoffset
		 *         Offset grid coordinates
		 *
		 * @type      {number}
		 * @product   highcharts highmaps
		 * @apioption series.tilemap.data.x
		 */

		/**
		 * The y coordinate of the point.
		 *
		 * Note that for some [tileShapes](#plotOptions.tilemap.tileShape) the grid
		 * coordinates are offset.
		 *
		 * @sample maps/series/tilemap-gridoffset
		 *         Offset grid coordinates
		 *
		 * @type      {number}
		 * @product   highcharts highmaps
		 * @apioption series.tilemap.data.y
		 */

	}(Highcharts));
	return (function () {


	}());
}));
