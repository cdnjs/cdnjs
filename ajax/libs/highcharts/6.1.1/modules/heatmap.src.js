/**
 * @license Highcharts JS v6.1.1 (2018-06-27)
 *
 * (c) 2009-2017 Torstein Honsi
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
		/**
		 * (c) 2010-2017 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */
		var addEvent = H.addEvent,
		    Axis = H.Axis,
		    Chart = H.Chart,
		    color = H.color,
		    ColorAxis,
		    each = H.each,
		    extend = H.extend,
		    isNumber = H.isNumber,
		    Legend = H.Legend,
		    LegendSymbolMixin = H.LegendSymbolMixin,
		    noop = H.noop,
		    merge = H.merge,
		    pick = H.pick;

		// If ColorAxis already exists, we may be loading the heatmap module on top of
		// Highmaps.
		if (!H.ColorAxis) {

		    /**
		     * The ColorAxis object for inclusion in gradient legends
		     */
		    ColorAxis = H.ColorAxis = function () {
		        this.init.apply(this, arguments);
		    };
		    extend(ColorAxis.prototype, Axis.prototype);
		    extend(ColorAxis.prototype, {
		        /**
		         * A color axis for choropleth maps and heat maps. Visually, the color
		         * axis will appear as a gradient or as separate items inside the
		         * legend, depending on whether the axis is scalar or based on data
		         * classes.
		         *
		         * For supported color formats, see the
		         * [docs article about colors](http://www.highcharts.com/docs/chart-design-and-style/colors).
		         *
		         * A scalar color axis is represented by a gradient. The colors either
		         * range between the [minColor](#colorAxis.minColor) and the
		         * [maxColor](#colorAxis.maxColor), or for more fine grained control the
		         * colors can be defined in [stops](#colorAxis.stops). Often times, the
		         * color axis needs to be adjusted to get the right color spread for the
		         * data. In addition to stops, consider using a logarithmic
		         * [axis type](#colorAxis.type), or setting [min](#colorAxis.min) and
		         * [max](#colorAxis.max) to avoid the colors being determined by
		         * outliers.
		         *
		         * When [dataClasses](#colorAxis.dataClasses) are used, the ranges are
		         * subdivided into separate classes like categories based on their
		         * values. This can be used for ranges between two values, but also for
		         * a true category. However, when your data is categorized, it may be as
		         * convenient to add each category to a separate series.
		         *
		         * See [the Axis object](/class-reference/Highcharts.Axis) for
		         * programmatic access to the axis.
		         *
		         * @extends {xAxis}
		         * @excluding allowDecimals,alternateGridColor,breaks,categories,
		         *            crosshair,dateTimeLabelFormats,lineWidth,linkedTo,maxZoom,
		         *            minRange,minTickInterval,offset,opposite,plotBands,
		         *            plotLines,showEmpty,title
		         * @product highcharts highmaps
		         * @optionparent colorAxis
		         */
		        defaultColorAxisOptions: {

		            /**
		             * Whether to allow decimals on the color axis.
		             * @type {Boolean}
		             * @default true
		             * @product highcharts highmaps
		             * @apioption colorAxis.allowDecimals
		             */

		            /**
		             * Determines how to set each data class' color if no individual
		             * color is set. The default value, `tween`, computes intermediate
		             * colors between `minColor` and `maxColor`. The other possible
		             * value, `category`, pulls colors from the global or chart specific
		             * [colors](#colors) array.
		             *
		             * @validvalue ["tween", "category"]
		             * @type {String}
		             * @sample {highmaps} maps/coloraxis/dataclasscolor/ Category colors
		             * @default tween
		             * @product highcharts highmaps
		             * @apioption colorAxis.dataClassColor
		             */

		            /**
		             * An array of data classes or ranges for the choropleth map. If
		             * none given, the color axis is scalar and values are distributed
		             * as a gradient between the minimum and maximum colors.
		             *
		             * @type {Array<Object>}
		             * @sample {highmaps} maps/demo/data-class-ranges/ Multiple ranges
		             * @sample {highmaps} maps/demo/data-class-two-ranges/ Two ranges
		             * @product highcharts highmaps
		             * @apioption colorAxis.dataClasses
		             */

		            /**
		             * The color of each data class. If not set, the color is pulled
		             * from the global or chart-specific [colors](#colors) array. In
		             * styled mode, this option is ignored. Instead, use colors defined
		             * in CSS.
		             *
		             * @type {Color}
		             * @sample {highmaps} maps/demo/data-class-two-ranges/
		             *         Explicit colors
		             * @product highcharts highmaps
		             * @apioption colorAxis.dataClasses.color
		             */

		            /**
		             * The start of the value range that the data class represents,
		             * relating to the point value.
		             *
		             * The range of each `dataClass` is closed in both ends, but can be
		             * overridden by the next `dataClass`.
		             *
		             * @type      {Number}
		             * @product   highcharts highmaps
		             * @apioption colorAxis.dataClasses.from
		             */

		            /**
		             * The name of the data class as it appears in the legend.
		             * If no name is given, it is automatically created based on the
		             * `from` and `to` values. For full programmatic control,
		             * [legend.labelFormatter](#legend.labelFormatter) can be used.
		             * In the formatter, `this.from` and `this.to` can be accessed.
		             *
		             * @type      {String}
		             * @sample    {highmaps} maps/coloraxis/dataclasses-name/
		             *            Named data classes
		             * @sample    {highmaps} maps/coloraxis/dataclasses-labelformatter/
		             *            Formatted data classes
		             * @product   highcharts highmaps
		             * @apioption colorAxis.dataClasses.name
		             */

		            /**
		             * The end of the value range that the data class represents,
		             * relating to the point value.
		             *
		             * The range of each `dataClass` is closed in both ends, but can be
		             * overridden by the next `dataClass`.
		             *
		             * @type      {Number}
		             * @product   highcharts highmaps
		             * @apioption colorAxis.dataClasses.to
		             */

		            /**
		              * @ignore-option
		              */
		            lineWidth: 0,

		            /**
		             * Padding of the min value relative to the length of the axis. A
		             * padding of 0.05 will make a 100px axis 5px longer.
		             *
		             * @type {Number}
		             * @product highcharts highmaps
		             */
		            minPadding: 0,

		            /**
		             * The maximum value of the axis in terms of map point values. If
		             * `null`, the max value is automatically calculated. If the
		             * `endOnTick` option is true, the max value might be rounded up.
		             *
		             * @type {Number}
		             * @sample {highmaps} maps/coloraxis/gridlines/
		             *         Explicit min and max to reduce the effect of outliers
		             * @product highcharts highmaps
		             * @apioption colorAxis.max
		             */

		            /**
		             * The minimum value of the axis in terms of map point values. If
		             * `null`, the min value is automatically calculated. If the
		             * `startOnTick` option is true, the min value might be rounded
		             * down.
		             *
		             * @type {Number}
		             * @sample {highmaps} maps/coloraxis/gridlines/
		             *         Explicit min and max to reduce the effect of outliers
		             * @product highcharts highmaps
		             * @apioption colorAxis.min
		             */

		            /**
		             * Padding of the max value relative to the length of the axis. A
		             * padding of 0.05 will make a 100px axis 5px longer.
		             *
		             * @type {Number}
		             * @product highcharts highmaps
		             */
		            maxPadding: 0,

		            /**
		             * Color of the grid lines extending from the axis across the
		             * gradient.
		             *
		             * @type {Color}
		             * @sample {highmaps} maps/coloraxis/gridlines/
		             *         Grid lines demonstrated
		             * @default #e6e6e6
		             * @product highcharts highmaps
		             * @apioption colorAxis.gridLineColor
		             */

		            /**
		             * The width of the grid lines extending from the axis across the
		             * gradient of a scalar color axis.
		             *
		             * @type {Number}
		             * @sample {highmaps} maps/coloraxis/gridlines/
		             *         Grid lines demonstrated
		             * @default 1
		             * @product highcharts highmaps
		             */
		            gridLineWidth: 1,

		            /**
		             * The interval of the tick marks in axis units. When `null`, the
		             * tick interval is computed to approximately follow the
		             * `tickPixelInterval`.
		             *
		             * @type {Number}
		             * @product highcharts highmaps
		             * @apioption colorAxis.tickInterval
		             */

		            /**
		             * If [tickInterval](#colorAxis.tickInterval) is `null` this option
		             * sets the approximate pixel interval of the tick marks.
		             *
		             * @type {Number}
		             * @default 72
		             * @product highcharts highmaps
		             */
		            tickPixelInterval: 72,

		            /**
		             * Whether to force the axis to start on a tick. Use this option
		             * with the `maxPadding` option to control the axis start.
		             *
		             * @type {Boolean}
		             * @default true
		             * @product highcharts highmaps
		             */
		            startOnTick: true,

		            /**
		             * Whether to force the axis to end on a tick. Use this option with
		             * the [maxPadding](#colorAxis.maxPadding) option to control the
		             * axis end.
		             *
		             * @type {Boolean}
		             * @default true
		             * @product highcharts highmaps
		             */
		            endOnTick: true,

		            /**    @ignore */
		            offset: 0,

		            /**
		             * The triangular marker on a scalar color axis that points to the
		             * value of the hovered area. To disable the marker, set
		             * `marker: null`.
		             *
		             * @type {Object}
		             * @sample {highmaps} maps/coloraxis/marker/ Black marker
		             * @product highcharts highmaps
		             */
		            marker: {

		                /**
		                 * Animation for the marker as it moves between values. Set to
		                 * `false` to disable animation. Defaults to `{ duration: 50 }`.
		                 *
		                 * @type {Object|Boolean}
		                 * @product highcharts highmaps
		                 */
		                animation: {
		                    duration: 50
		                },

		                /**
		                 * @ignore
		                 */
		                width: 0.01,
                

		                /**
		                 * The color of the marker.
		                 *
		                 * @type {Color}
		                 * @default #999999
		                 * @product highcharts highmaps
		                 */
		                color: '#999999'
                
		            },

		            /**
		             * The axis labels show the number for each tick.
		             *
		             * For more live examples on label options, see [xAxis.labels in the
		             * Highcharts API.](/highcharts#xAxis.labels)
		             *
		             * @type {Object}
		             * @extends xAxis.labels
		             * @product highcharts highmaps
		             */
		            labels: {

		                /**
		                 * How to handle overflowing labels on horizontal color axis.
		                 * Can be undefined or "justify". If "justify", labels will not
		                 * render outside the legend area. If there is room to move it,
		                 * it will be aligned to the edge, else it will be removed.
		                 *
		                 * @validvalue [null, "justify"]
		                 * @type {String}
		                 * @default justify
		                 * @product highcharts highmaps
		                 */
		                overflow: 'justify',

		                rotation: 0
		            },

		            /**
		             * The color to represent the minimum of the color axis. Unless
		             * [dataClasses](#colorAxis.dataClasses) or
		             * [stops](#colorAxis.stops) are set, the gradient starts at this
		             * value.
		             *
		             * If dataClasses are set, the color is based on minColor and
		             * maxColor unless a color is set for each data class, or the
		             * [dataClassColor](#colorAxis.dataClassColor) is set.
		             *
		             * @type {Color}
		             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor/
		             *         Min and max colors on scalar (gradient) axis
		             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor-dataclasses/
		             *         On data classes
		             * @default #e6ebf5
		             * @product highcharts highmaps
		             */
		            minColor: '#e6ebf5',

		            /**
		             * The color to represent the maximum of the color axis. Unless
		             * [dataClasses](#colorAxis.dataClasses) or
		             * [stops](#colorAxis.stops) are set, the gradient ends at this
		             * value.
		             *
		             * If dataClasses are set, the color is based on minColor and
		             * maxColor unless a color is set for each data class, or the
		             * [dataClassColor](#colorAxis.dataClassColor) is set.
		             *
		             * @type {Color}
		             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor/
		             *         Min and max colors on scalar (gradient) axis
		             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor-dataclasses/
		             *         On data classes
		             * @default #003399
		             * @product highcharts highmaps
		             */
		            maxColor: '#003399',

		            /**
		             * Color stops for the gradient of a scalar color axis. Use this in
		             * cases where a linear gradient between a `minColor` and `maxColor`
		             * is not sufficient. The stops is an array of tuples, where the
		             * first item is a float between 0 and 1 assigning the relative
		             * position in the gradient, and the second item is the color.
		             *
		             * @type {Array<Array>}
		             * @sample {highmaps} maps/demo/heatmap/
		             *         Heatmap with three color stops
		             * @product highcharts highmaps
		             * @apioption colorAxis.stops
		             */

		            /**
		             * The pixel length of the main tick marks on the color axis.
		             */
		            tickLength: 5,

		            /**
		             * The type of interpolation to use for the color axis. Can be
		             * `linear` or `logarithmic`.
		             *
		             * @validvalue ["linear", "logarithmic"]
		             * @type {String}
		             * @default linear
		             * @product highcharts highmaps
		             * @apioption colorAxis.type
		             */

		            /**
		             * Whether to reverse the axis so that the highest number is closest
		             * to the origin. Defaults to `false` in a horizontal legend and
		             * `true` in a vertical legend, where the smallest value starts on
		             * top.
		             *
		             * @type {Boolean}
		             * @product highcharts highmaps
		             * @apioption colorAxis.reversed
		             */

		            /**
		             * Fires when the legend item belonging to the colorAxis is clicked.
		             * One parameter, `event`, is passed to the function.
		             *
		             * @type      {Function}
		             * @product   highcharts highmaps
		             * @apioption colorAxis.events.legendItemClick
		             */

		            /**
		             * Whether to display the colorAxis in the legend.
		             *
		             * @type {Boolean}
		             * @see [heatmap.showInLegend](#series.heatmap.showInLegend)
		             * @default true
		             * @since 4.2.7
		             * @product highcharts highmaps
		             */
		            showInLegend: true
		        },

		        // Properties to preserve after destroy, for Axis.update (#5881, #6025)
		        keepProps: [
		            'legendGroup',
		            'legendItemHeight',
		            'legendItemWidth',
		            'legendItem',
		            'legendSymbol'
		        ].concat(Axis.prototype.keepProps),

		        /**
		         * Initialize the color axis
		         */
		        init: function (chart, userOptions) {
		            var horiz = chart.options.legend.layout !== 'vertical',
		                options;

		            this.coll = 'colorAxis';

		            // Build the options
		            options = merge(this.defaultColorAxisOptions, {
		                side: horiz ? 2 : 1,
		                reversed: !horiz
		            }, userOptions, {
		                opposite: !horiz,
		                showEmpty: false,
		                title: null,
		                visible: chart.options.legend.enabled
		            });

		            Axis.prototype.init.call(this, chart, options);

		            // Base init() pushes it to the xAxis array, now pop it again
		            // chart[this.isXAxis ? 'xAxis' : 'yAxis'].pop();

		            // Prepare data classes
		            if (userOptions.dataClasses) {
		                this.initDataClasses(userOptions);
		            }
		            this.initStops();

		            // Override original axis properties
		            this.horiz = horiz;
		            this.zoomEnabled = false;

		            // Add default values
		            this.defaultLegendLength = 200;
		        },

		        initDataClasses: function (userOptions) {
		            var chart = this.chart,
		                dataClasses,
		                colorCounter = 0,
		                colorCount = chart.options.chart.colorCount,
		                options = this.options,
		                len = userOptions.dataClasses.length;
		            this.dataClasses = dataClasses = [];
		            this.legendItems = [];

		            each(userOptions.dataClasses, function (dataClass, i) {
		                var colors;

		                dataClass = merge(dataClass);
		                dataClasses.push(dataClass);

                
		                if (dataClass.color) {
		                    return;
		                }
                
		                if (options.dataClassColor === 'category') {
                    
		                    colors = chart.options.colors;
		                    colorCount = colors.length;
		                    dataClass.color = colors[colorCounter];
                    
		                    dataClass.colorIndex = colorCounter;

		                    // increase and loop back to zero
		                    colorCounter++;
		                    if (colorCounter === colorCount) {
		                        colorCounter = 0;
		                    }
		                } else {
		                    dataClass.color = color(options.minColor).tweenTo(
		                        color(options.maxColor),
		                        len < 2 ? 0.5 : i / (len - 1) // #3219
		                    );
		                }
		            });
		        },

		        /**
		         * Override so that ticks are not added in data class axes (#6914)
		         */
		        setTickPositions: function () {
		            if (!this.dataClasses) {
		                return Axis.prototype.setTickPositions.call(this);
		            }
		        },


		        initStops: function () {
		            this.stops = this.options.stops || [
		                [0, this.options.minColor],
		                [1, this.options.maxColor]
		            ];
		            each(this.stops, function (stop) {
		                stop.color = color(stop[1]);
		            });
		        },

		        /**
		         * Extend the setOptions method to process extreme colors and color
		         * stops.
		         */
		        setOptions: function (userOptions) {
		            Axis.prototype.setOptions.call(this, userOptions);

		            this.options.crosshair = this.options.marker;
		        },

		        setAxisSize: function () {
		            var symbol = this.legendSymbol,
		                chart = this.chart,
		                legendOptions = chart.options.legend || {},
		                x,
		                y,
		                width,
		                height;

		            if (symbol) {
		                this.left = x = symbol.attr('x');
		                this.top = y = symbol.attr('y');
		                this.width = width = symbol.attr('width');
		                this.height = height = symbol.attr('height');
		                this.right = chart.chartWidth - x - width;
		                this.bottom = chart.chartHeight - y - height;

		                this.len = this.horiz ? width : height;
		                this.pos = this.horiz ? x : y;
		            } else {
		                // Fake length for disabled legend to avoid tick issues
		                // and such (#5205)
		                this.len = (
		                        this.horiz ?
		                            legendOptions.symbolWidth :
		                            legendOptions.symbolHeight
		                    ) || this.defaultLegendLength;
		            }
		        },

		        normalizedValue: function (value) {
		            if (this.isLog) {
		                value = this.val2lin(value);
		            }
		            return 1 - ((this.max - value) / ((this.max - this.min) || 1));
		        },

		        /**
		         * Translate from a value to a color
		         */
		        toColor: function (value, point) {
		            var pos,
		                stops = this.stops,
		                from,
		                to,
		                color,
		                dataClasses = this.dataClasses,
		                dataClass,
		                i;

		            if (dataClasses) {
		                i = dataClasses.length;
		                while (i--) {
		                    dataClass = dataClasses[i];
		                    from = dataClass.from;
		                    to = dataClass.to;
		                    if (
		                        (from === undefined || value >= from) &&
		                        (to === undefined || value <= to)
		                    ) {
                        
		                        color = dataClass.color;
                        
		                        if (point) {
		                            point.dataClass = i;
		                            point.colorIndex = dataClass.colorIndex;
		                        }
		                        break;
		                    }
		                }

		            } else {

		                pos = this.normalizedValue(value);
		                i = stops.length;
		                while (i--) {
		                    if (pos > stops[i][0]) {
		                        break;
		                    }
		                }
		                from = stops[i] || stops[i + 1];
		                to = stops[i + 1] || from;

		                // The position within the gradient
		                pos = 1 - (to[0] - pos) / ((to[0] - from[0]) || 1);

		                color = from.color.tweenTo(
		                    to.color,
		                    pos
		                );
		            }
		            return color;
		        },

		        /**
		         * Override the getOffset method to add the whole axis groups inside
		         * the legend.
		         */
		        getOffset: function () {
		            var group = this.legendGroup,
		                sideOffset = this.chart.axisOffset[this.side];

		            if (group) {

		                // Hook for the getOffset method to add groups to this parent
		                // group
		                this.axisParent = group;

		                // Call the base
		                Axis.prototype.getOffset.call(this);

		                // First time only
		                if (!this.added) {

		                    this.added = true;

		                    this.labelLeft = 0;
		                    this.labelRight = this.width;
		                }
		                // Reset it to avoid color axis reserving space
		                this.chart.axisOffset[this.side] = sideOffset;
		            }
		        },

		        /**
		         * Create the color gradient
		         */
		        setLegendColor: function () {
		            var grad,
		                horiz = this.horiz,
		                reversed = this.reversed,
		                one = reversed ? 1 : 0,
		                zero = reversed ? 0 : 1;

		            grad = horiz ? [one, 0, zero, 0] : [0, zero, 0, one]; // #3190
		            this.legendColor = {
		                linearGradient: {
		                    x1: grad[0], y1: grad[1],
		                    x2: grad[2], y2: grad[3]
		                },
		                stops: this.stops
		            };
		        },

		        /**
		         * The color axis appears inside the legend and has its own legend
		         * symbol
		         */
		        drawLegendSymbol: function (legend, item) {
		            var padding = legend.padding,
		                legendOptions = legend.options,
		                horiz = this.horiz,
		                width = pick(
		                    legendOptions.symbolWidth,
		                    horiz ? this.defaultLegendLength : 12
		                ),
		                height = pick(
		                    legendOptions.symbolHeight,
		                    horiz ? 12 : this.defaultLegendLength
		                ),
		                labelPadding = pick(
		                    legendOptions.labelPadding,
		                    horiz ? 16 : 30
		                ),
		                itemDistance = pick(legendOptions.itemDistance, 10);

		            this.setLegendColor();

		            // Create the gradient
		            item.legendSymbol = this.chart.renderer.rect(
		                0,
		                legend.baseline - 11,
		                width,
		                height
		            ).attr({
		                zIndex: 1
		            }).add(item.legendGroup);

		            // Set how much space this legend item takes up
		            this.legendItemWidth = width + padding +
		                (horiz ? itemDistance : labelPadding);
		            this.legendItemHeight = height + padding +
		                (horiz ? labelPadding : 0);
		        },
		        /**
		         * Fool the legend
		         */
		        setState: function (state) {
		            each(this.series, function (series) {
		                series.setState(state);
		            });
		        },
		        visible: true,
		        setVisible: noop,
		        getSeriesExtremes: function () {
		            var series = this.series,
		                i = series.length;
		            this.dataMin = Infinity;
		            this.dataMax = -Infinity;
		            while (i--) {
		                series[i].getExtremes();
		                if (series[i].valueMin !== undefined) {
		                    this.dataMin = Math.min(this.dataMin, series[i].valueMin);
		                    this.dataMax = Math.max(this.dataMax, series[i].valueMax);
		                }
		            }
		        },
		        drawCrosshair: function (e, point) {
		            var plotX = point && point.plotX,
		                plotY = point && point.plotY,
		                crossPos,
		                axisPos = this.pos,
		                axisLen = this.len;

		            if (point) {
		                crossPos = this.toPixels(point[point.series.colorKey]);
		                if (crossPos < axisPos) {
		                    crossPos = axisPos - 2;
		                } else if (crossPos > axisPos + axisLen) {
		                    crossPos = axisPos + axisLen + 2;
		                }

		                point.plotX = crossPos;
		                point.plotY = this.len - crossPos;
		                Axis.prototype.drawCrosshair.call(this, e, point);
		                point.plotX = plotX;
		                point.plotY = plotY;

		                if (
		                    this.cross &&
		                    !this.cross.addedToColorAxis &&
		                    this.legendGroup
		                ) {
		                    this.cross
		                        .addClass('highcharts-coloraxis-marker')
		                        .add(this.legendGroup);

		                    this.cross.addedToColorAxis = true;

                    
		                    this.cross.attr({
		                        fill: this.crosshair.color
		                    });
                    

		                }
		            }
		        },
		        getPlotLinePath: function (a, b, c, d, pos) {
		            // crosshairs only
		            return isNumber(pos) ? // pos can be 0 (#3969)
		                (
		                    this.horiz ? [
		                        'M',
		                        pos - 4, this.top - 6,
		                        'L',
		                        pos + 4, this.top - 6,
		                        pos, this.top,
		                        'Z'
		                    ] : [
		                        'M',
		                        this.left, pos,
		                        'L',
		                        this.left - 6, pos + 6,
		                        this.left - 6, pos - 6,
		                        'Z'
		                    ]
		                ) :
		                Axis.prototype.getPlotLinePath.call(this, a, b, c, d);
		        },

		        update: function (newOptions, redraw) {
		            var chart = this.chart,
		                legend = chart.legend;

		            each(this.series, function (series) {
		                // Needed for Axis.update when choropleth colors change
		                series.isDirtyData = true;
		            });

		            // When updating data classes, destroy old items and make sure new
		            // ones are created (#3207)
		            if (newOptions.dataClasses && legend.allItems) {
		                each(legend.allItems, function (item) {
		                    if (item.isDataClass && item.legendGroup) {
		                        item.legendGroup.destroy();
		                    }
		                });
		                chart.isDirtyLegend = true;
		            }

		            // Keep the options structure updated for export. Unlike xAxis and
		            // yAxis, the colorAxis is not an array. (#3207)
		            chart.options[this.coll] = merge(this.userOptions, newOptions);

		            Axis.prototype.update.call(this, newOptions, redraw);
		            if (this.legendItem) {
		                this.setLegendColor();
		                legend.colorizeItem(this, true);
		            }
		        },

		        /**
		         * Extend basic axis remove by also removing the legend item.
		         */
		        remove: function () {
		            if (this.legendItem) {
		                this.chart.legend.destroyItem(this);
		            }
		            Axis.prototype.remove.call(this);
		        },

		        /**
		         * Get the legend item symbols for data classes
		         */
		        getDataClassLegendSymbols: function () {
		            var axis = this,
		                chart = this.chart,
		                legendItems = this.legendItems,
		                legendOptions = chart.options.legend,
		                valueDecimals = legendOptions.valueDecimals,
		                valueSuffix = legendOptions.valueSuffix || '',
		                name;

		            if (!legendItems.length) {
		                each(this.dataClasses, function (dataClass, i) {
		                    var vis = true,
		                        from = dataClass.from,
		                        to = dataClass.to;

		                    // Assemble the default name. This can be overridden
		                    // by legend.options.labelFormatter
		                    name = '';
		                    if (from === undefined) {
		                        name = '< ';
		                    } else if (to === undefined) {
		                        name = '> ';
		                    }
		                    if (from !== undefined) {
		                        name += H.numberFormat(from, valueDecimals) +
		                            valueSuffix;
		                    }
		                    if (from !== undefined && to !== undefined) {
		                        name += ' - ';
		                    }
		                    if (to !== undefined) {
		                        name += H.numberFormat(to, valueDecimals) + valueSuffix;
		                    }
		                    // Add a mock object to the legend items
		                    legendItems.push(extend({
		                        chart: chart,
		                        name: name,
		                        options: {},
		                        drawLegendSymbol: LegendSymbolMixin.drawRectangle,
		                        visible: true,
		                        setState: noop,
		                        isDataClass: true,
		                        setVisible: function () {
		                            vis = this.visible = !vis;
		                            each(axis.series, function (series) {
		                                each(series.points, function (point) {
		                                    if (point.dataClass === i) {
		                                        point.setVisible(vis);
		                                    }
		                                });
		                            });

		                            chart.legend.colorizeItem(this, vis);
		                        }
		                    }, dataClass));
		                });
		            }
		            return legendItems;
		        },
		        name: '' // Prevents 'undefined' in legend in IE8
		    });

		    /**
		     * Handle animation of the color attributes directly
		     */
		    each(['fill', 'stroke'], function (prop) {
		        H.Fx.prototype[prop + 'Setter'] = function () {
		            this.elem.attr(
		                prop,
		                color(this.start).tweenTo(
		                    color(this.end),
		                    this.pos
		                ),
		                null,
		                true
		            );
		        };
		    });

		    /**
		     * Extend the chart getAxes method to also get the color axis
		     */
		    addEvent(Chart, 'afterGetAxes', function () {

		        var options = this.options,
		            colorAxisOptions = options.colorAxis;

		        this.colorAxis = [];
		        if (colorAxisOptions) {
		            new ColorAxis(this, colorAxisOptions); // eslint-disable-line no-new
		        }
		    });


		    /**
		     * Add the color axis. This also removes the axis' own series to prevent
		     * them from showing up individually.
		     */
		    addEvent(Legend, 'afterGetAllItems', function (e) {
		        var colorAxisItems = [],
		            colorAxis = this.chart.colorAxis[0],
		            i;

		        if (colorAxis && colorAxis.options) {
		            if (colorAxis.options.showInLegend) {
		                // Data classes
		                if (colorAxis.options.dataClasses) {
		                    colorAxisItems = colorAxis.getDataClassLegendSymbols();
		                // Gradient legend
		                } else {
		                    // Add this axis on top
		                    colorAxisItems.push(colorAxis);
		                }

		                // Don't add the color axis' series
		                each(colorAxis.series, function (series) {
		                    H.erase(e.allItems, series);
		                });
		            }
		        }

		        i = colorAxisItems.length;
		        while (i--) {
		            e.allItems.unshift(colorAxisItems[i]);
		        }
		    });

		    addEvent(Legend, 'afterColorizeItem', function (e) {
		        if (e.visible && e.item.legendColor) {
		            e.item.legendSymbol.attr({
		                fill: e.item.legendColor
		            });
		        }
		    });

		    // Updates in the legend need to be reflected in the color axis (6888)
		    addEvent(Legend, 'afterUpdate', function () {
		        if (this.chart.colorAxis[0]) {
		            this.chart.colorAxis[0].update({}, arguments[2]);
		        }
		    });
		}

	}(Highcharts));
	(function (H) {
		/**
		 * (c) 2010-2017 Torstein Honsi
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
		 * (c) 2010-2017 Torstein Honsi
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
		 * A heatmap is a graphical representation of data where the individual values
		 * contained in a matrix are represented as colors.
		 *
		 * @sample       highcharts/demo/heatmap/
		 *               Simple heatmap
		 * @sample       highcharts/demo/heatmap-canvas/
		 *               Heavy heatmap
		 * @extends      {plotOptions.scatter}
		 * @excluding    animationLimit,connectEnds,connectNulls,dashStyle,
		 *               findNearestPointBy,getExtremesFromAll,linecap,lineWidth,marker,
		 *               pointInterval,pointIntervalUnit,pointRange,pointStart,shadow,
		 *               softThreshold,stacking,step,threshold
		 * @product      highcharts highmaps
		 * @optionparent plotOptions.heatmap
		 */
		seriesType('heatmap', 'scatter', {

		    /**
		     * Animation is disabled by default on the heatmap series.
		     *
		     * @type {Boolean|Object}
		     */
		    animation: false,

		    /**
		     * The border width for each heat map item.
		     */
		    borderWidth: 0,

		    /**
		     * Padding between the points in the heatmap.
		     *
		     * @type {Number}
		     * @default 0
		     * @since 6.0
		     * @apioption plotOptions.heatmap.pointPadding
		     */

		    /**
		     * The main color of the series. In heat maps this color is rarely used,
		     * as we mostly use the color to denote the value of each point. Unless
		     * options are set in the [colorAxis](#colorAxis), the default value
		     * is pulled from the [options.colors](#colors) array.
		     *
		     * @type {Color}
		     * @default null
		     * @since 4.0
		     * @product highcharts
		     * @apioption plotOptions.heatmap.color
		     */

		    /**
		     * The column size - how many X axis units each column in the heatmap
		     * should span.
		     *
		     * @type {Number}
		     * @sample {highcharts} maps/demo/heatmap/ One day
		     * @sample {highmaps} maps/demo/heatmap/ One day
		     * @default 1
		     * @since 4.0
		     * @product highcharts highmaps
		     * @apioption plotOptions.heatmap.colsize
		     */

		    /**
		     * The row size - how many Y axis units each heatmap row should span.
		     *
		     * @type {Number}
		     * @sample {highcharts} maps/demo/heatmap/ 1 by default
		     * @sample {highmaps} maps/demo/heatmap/ 1 by default
		     * @default 1
		     * @since 4.0
		     * @product highcharts highmaps
		     * @apioption plotOptions.heatmap.rowsize
		     */

    

		    /**
		     * The color applied to null points. In styled mode, a general CSS class is
		     * applied instead.
		     *
		     * @type {Color}
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

		    /**    @ignore */
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
		             * @type {Number}
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
		     */
		    init: function () {
		        var options;
		        seriesTypes.scatter.prototype.init.apply(this, arguments);

		        options = this.options;
		        // #3758, prevent resetting in setData
		        options.pointRange = pick(options.pointRange, options.colsize || 1);
		        this.yAxis.axisPointRange = options.rowsize || 1; // general point range
		    },
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
		    drawPoints: function () {
		        seriesTypes.column.prototype.drawPoints.call(this);

		        each(this.points, function (point) {
            
		            point.graphic.attr(this.colorAttribs(point));
            
		        }, this);
		    },
		    animate: noop,
		    getBox: noop,
		    drawLegendSymbol: LegendSymbolMixin.drawRectangle,
		    alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
		    getExtremes: function () {
		        // Get the extremes from the value data
		        Series.prototype.getExtremes.call(this, this.valueData);
		        this.valueMin = this.dataMin;
		        this.valueMax = this.dataMax;

		        // Get the extremes from the y data
		        Series.prototype.getExtremes.call(this);
		    }

		}), H.extend({
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
		 * @type {Object}
		 * @extends series,plotOptions.heatmap
		 * @excluding dataParser,dataURL,marker,pointRange,stack
		 * @product highcharts highmaps
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
		 * 2.  An array of objects with named values. The objects are point
		 * configuration objects as seen below. If the total number of data
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
		 * @type {Array<Object|Array>}
		 * @extends series.line.data
		 * @excluding marker
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
		 * @product highcharts highmaps
		 * @apioption series.heatmap.data
		 */

		/**
		 * The color of the point. In heat maps the point color is rarely set
		 * explicitly, as we use the color to denote the `value`. Options for
		 * this are set in the [colorAxis](#colorAxis) configuration.
		 *
		 * @type {Color}
		 * @product highcharts highmaps
		 * @apioption series.heatmap.data.color
		 */

		/**
		 * The value of the point, resulting in a color controled by options
		 * as set in the [colorAxis](#colorAxis) configuration.
		 *
		 * @type {Number}
		 * @product highcharts highmaps
		 * @apioption series.heatmap.data.value
		 */

		/**
		 * The x value of the point. For datetime axes,
		 * the X value is the timestamp in milliseconds since 1970.
		 *
		 * @type {Number}
		 * @product highcharts highmaps
		 * @apioption series.heatmap.data.x
		 */

		/**
		 * The y value of the point.
		 *
		 * @type {Number}
		 * @product highcharts highmaps
		 * @apioption series.heatmap.data.y
		 */

		/**
		 * Point padding for a single point.
		 *
		 * @type {Number}
		 * @sample maps/plotoptions/tilemap-pointpadding Point padding on tiles
		 * @apioption series.heatmap.data.pointPadding
		 */


	}(Highcharts));
	return (function () {


	}());
}));
