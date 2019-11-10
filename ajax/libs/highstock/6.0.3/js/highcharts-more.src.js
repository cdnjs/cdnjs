/**
 * @license Highcharts JS v6.0.3 (2017-11-14)
 *
 * (c) 2009-2016 Torstein Honsi
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
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var deg2rad = H.deg2rad,
            isNumber = H.isNumber,
            pick = H.pick,
            relativeLength = H.relativeLength;
        H.CenteredSeriesMixin = {
            /**
             * Get the center of the pie based on the size and center options relative to the
             * plot area. Borrowed by the polar and gauge series types.
             */
            getCenter: function() {

                var options = this.options,
                    chart = this.chart,
                    slicingRoom = 2 * (options.slicedOffset || 0),
                    handleSlicingRoom,
                    plotWidth = chart.plotWidth - 2 * slicingRoom,
                    plotHeight = chart.plotHeight - 2 * slicingRoom,
                    centerOption = options.center,
                    positions = [pick(centerOption[0], '50%'), pick(centerOption[1], '50%'), options.size || '100%', options.innerSize || 0],
                    smallestSize = Math.min(plotWidth, plotHeight),
                    i,
                    value;

                for (i = 0; i < 4; ++i) {
                    value = positions[i];
                    handleSlicingRoom = i < 2 || (i === 2 && /%$/.test(value));

                    // i == 0: centerX, relative to width
                    // i == 1: centerY, relative to height
                    // i == 2: size, relative to smallestSize
                    // i == 3: innerSize, relative to size
                    positions[i] = relativeLength(value, [plotWidth, plotHeight, smallestSize, positions[2]][i]) +
                        (handleSlicingRoom ? slicingRoom : 0);

                }
                // innerSize cannot be larger than size (#3632)
                if (positions[3] > positions[2]) {
                    positions[3] = positions[2];
                }
                return positions;
            },
            /**
             * getStartAndEndRadians - Calculates start and end angles in radians.
             * Used in series types such as pie and sunburst.
             *
             * @param  {Number} start Start angle in degrees.
             * @param  {Number} end Start angle in degrees.
             * @return {object} Returns an object containing start and end angles as
             * radians.
             */
            getStartAndEndRadians: function getStartAndEndRadians(start, end) {
                var startAngle = isNumber(start) ? start : 0, // must be a number
                    endAngle = (
                        (
                            isNumber(end) && // must be a number
                            end > startAngle && // must be larger than the start angle
                            // difference must be less than 360 degrees
                            (end - startAngle) < 360
                        ) ?
                        end :
                        startAngle + 360
                    ),
                    correction = -90;
                return {
                    start: deg2rad * (startAngle + correction),
                    end: deg2rad * (endAngle + correction)
                };
            }
        };

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var CenteredSeriesMixin = H.CenteredSeriesMixin,
            each = H.each,
            extend = H.extend,
            merge = H.merge,
            splat = H.splat;
        /**
         * The Pane object allows options that are common to a set of X and Y axes.
         *
         * In the future, this can be extended to basic Highcharts and Highstock.
         *
         */
        function Pane(options, chart) {
            this.init(options, chart);
        }

        // Extend the Pane prototype
        extend(Pane.prototype, {

            coll: 'pane', // Member of chart.pane

            /**
             * Initiate the Pane object
             */
            init: function(options, chart) {
                this.chart = chart;
                this.background = [];

                chart.pane.push(this);

                this.setOptions(options);
            },

            setOptions: function(options) {

                // Set options. Angular charts have a default background (#3318)
                this.options = options = merge(
                    this.defaultOptions,
                    this.chart.angular ? {
                        background: {}
                    } : undefined,
                    options
                );
            },

            /**
             * Render the pane with its backgrounds.
             */
            render: function() {

                var options = this.options,
                    backgroundOption = this.options.background,
                    renderer = this.chart.renderer,
                    len,
                    i;

                if (!this.group) {
                    this.group = renderer.g('pane-group')
                        .attr({
                            zIndex: options.zIndex || 0
                        })
                        .add();
                }

                this.updateCenter();

                // Render the backgrounds
                if (backgroundOption) {
                    backgroundOption = splat(backgroundOption);

                    len = Math.max(
                        backgroundOption.length,
                        this.background.length || 0
                    );

                    for (i = 0; i < len; i++) {
                        if (backgroundOption[i] && this.axis) { // #6641 - if axis exists, chart is circular and apply background
                            this.renderBackground(
                                merge(
                                    this.defaultBackgroundOptions,
                                    backgroundOption[i]
                                ),
                                i
                            );
                        } else if (this.background[i]) {
                            this.background[i] = this.background[i].destroy();
                            this.background.splice(i, 1);
                        }
                    }
                }
            },

            /**
             * Render an individual pane background.
             * @param  {Object} backgroundOptions Background options
             * @param  {number} i The index of the background in this.backgrounds
             */
            renderBackground: function(backgroundOptions, i) {
                var method = 'animate';

                if (!this.background[i]) {
                    this.background[i] = this.chart.renderer.path()
                        .add(this.group);
                    method = 'attr';
                }

                this.background[i][method]({
                    'd': this.axis.getPlotBandPath(
                        backgroundOptions.from,
                        backgroundOptions.to,
                        backgroundOptions
                    )
                }).attr({

                    'class': 'highcharts-pane ' + (backgroundOptions.className || '')
                });

            },

            /**
             * The pane serves as a container for axes and backgrounds for circular 
             * gauges and polar charts.
             * @since 2.3.0
             * @optionparent pane
             */
            defaultOptions: {
                /**
                 * The center of a polar chart or angular gauge, given as an array
                 * of [x, y] positions. Positions can be given as integers that transform
                 * to pixels, or as percentages of the plot area size.
                 * 
                 * @type {Array<String|Number>}
                 * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                 *         Two gauges with different center
                 * @default ["50%", "50%"]
                 * @since 2.3.0
                 * @product highcharts
                 */
                center: ['50%', '50%'],

                /**
                 * The size of the pane, either as a number defining pixels, or a
                 * percentage defining a percentage of the plot are.
                 * 
                 * @type {Number|String}
                 * @sample {highcharts} highcharts/demo/gauge-vu-meter/ Smaller size
                 * @default 85%
                 * @product highcharts
                 */
                size: '85%',

                /**
                 * The start angle of the polar X axis or gauge axis, given in degrees
                 * where 0 is north. Defaults to 0.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                 *         VU-meter with custom start and end angle
                 * @since 2.3.0
                 * @product highcharts
                 */
                startAngle: 0

                /**
                 * The end angle of the polar X axis or gauge value axis, given in degrees
                 * where 0 is north. Defaults to [startAngle](#pane.startAngle) + 360.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                 *         VU-meter with custom start and end angle
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption pane.endAngle
                 */
            },

            /**
             * An array of background items for the pane.
             * @type Array.<Object>
             * @sample {highcharts} highcharts/demo/gauge-speedometer/
             *         Speedometer gauge with multiple backgrounds
             * @optionparent pane.background
             */
            defaultBackgroundOptions: {
                /**
                 * The class name for this background.
                 * 
                 * @type {String}
                 * @sample {highcharts} highcharts/css/pane/ Panes styled by CSS
                 * @sample {highstock} highcharts/css/pane/ Panes styled by CSS
                 * @sample {highmaps} highcharts/css/pane/ Panes styled by CSS
                 * @default highcharts-pane
                 * @since 5.0.0
                 * @apioption pane.background.className
                 */

                /**
                 * Tha shape of the pane background. When `solid`, the background
                 * is circular. When `arc`, the background extends only from the min
                 * to the max of the value axis.
                 * 
                 * @validvalue ["solid", "arc"]
                 * @type {String}
                 * @default solid
                 * @since 2.3.0
                 * @product highcharts
                 */
                shape: 'circle',


                /** @ignore */
                from: -Number.MAX_VALUE, // corrected to axis min

                /**
                 * The inner radius of the pane background. Can be either numeric
                 * (pixels) or a percentage string.
                 * 
                 * @type {Number|String}
                 * @default 0
                 * @since 2.3.0
                 * @product highcharts
                 */
                innerRadius: 0,

                /** @ignore */
                to: Number.MAX_VALUE, // corrected to axis max

                /**
                 * The outer radius of the circular pane background. Can be either
                 * numeric (pixels) or a percentage string.
                 * 
                 * @type {Number|String}
                 * @default 105%
                 * @since 2.3.0
                 * @product highcharts
                 */
                outerRadius: '105%'
            },

            /**
             * Gets the center for the pane and its axis.
             */
            updateCenter: function(axis) {
                this.center = (axis || this.axis || {}).center =
                    CenteredSeriesMixin.getCenter.call(this);
            },

            /**
             * Destroy the pane item
             * /
            destroy: function () {
            	H.erase(this.chart.pane, this);
            	each(this.background, function (background) {
            		background.destroy();
            	});
            	this.background.length = 0;
            	this.group = this.group.destroy();
            },
            */

            /**
             * Update the pane item with new options
             * @param  {Object} options New pane options
             */
            update: function(options, redraw) {

                merge(true, this.options, options);
                this.setOptions(this.options);
                this.render();
                each(this.chart.axes, function(axis) {
                    if (axis.pane === this) {
                        axis.pane = null;
                        axis.update({}, redraw);
                    }
                }, this);
            }

        });

        H.Pane = Pane;

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var Axis = H.Axis,
            each = H.each,
            extend = H.extend,
            map = H.map,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Tick = H.Tick,
            wrap = H.wrap,


            hiddenAxisMixin, // @todo Extract this to a new file
            radialAxisMixin, // @todo Extract this to a new file
            axisProto = Axis.prototype,
            tickProto = Tick.prototype;

        /**
         * Augmented methods for the x axis in order to hide it completely, used for the X axis in gauges
         */
        hiddenAxisMixin = {
            getOffset: noop,
            redraw: function() {
                this.isDirty = false; // prevent setting Y axis dirty
            },
            render: function() {
                this.isDirty = false; // prevent setting Y axis dirty
            },
            setScale: noop,
            setCategories: noop,
            setTitle: noop
        };

        /**
         * Augmented methods for the value axis
         */
        radialAxisMixin = {

            /**
             * The default options extend defaultYAxisOptions
             */
            defaultRadialGaugeOptions: {
                labels: {
                    align: 'center',
                    x: 0,
                    y: null // auto
                },
                minorGridLineWidth: 0,
                minorTickInterval: 'auto',
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: 'inside',
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2 // behind dials, points in the series group
            },

            // Circular axis around the perimeter of a polar chart
            defaultRadialXOptions: {
                gridLineWidth: 1, // spokes
                labels: {
                    align: null, // auto
                    distance: 15,
                    x: 0,
                    y: null // auto
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: false,
                tickLength: 0
            },

            // Radial axis, like a spoke in a polar chart
            defaultRadialYOptions: {
                gridLineInterpolation: 'circle',
                labels: {
                    align: 'right',
                    x: -3,
                    y: -2
                },
                showLastLabel: false,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            },

            /**
             * Merge and set options
             */
            setOptions: function(userOptions) {

                var options = this.options = merge(
                    this.defaultOptions,
                    this.defaultRadialOptions,
                    userOptions
                );

                // Make sure the plotBands array is instanciated for each Axis (#2649)
                if (!options.plotBands) {
                    options.plotBands = [];
                }

            },

            /**
             * Wrap the getOffset method to return zero offset for title or labels in a radial
             * axis
             */
            getOffset: function() {
                // Call the Axis prototype method (the method we're in now is on the instance)
                axisProto.getOffset.call(this);

                // Title or label offsets are not counted
                this.chart.axisOffset[this.side] = 0;

            },


            /**
             * Get the path for the axis line. This method is also referenced in the getPlotLinePath
             * method.
             */
            getLinePath: function(lineWidth, radius) {
                var center = this.center,
                    end,
                    chart = this.chart,
                    r = pick(radius, center[2] / 2 - this.offset),
                    path;

                if (this.isCircular || radius !== undefined) {
                    path = this.chart.renderer.symbols.arc(
                        this.left + center[0],
                        this.top + center[1],
                        r,
                        r, {
                            start: this.startAngleRad,
                            end: this.endAngleRad,
                            open: true,
                            innerR: 0
                        }
                    );

                    // Bounds used to position the plotLine label next to the line
                    // (#7117)
                    path.xBounds = [this.left + center[0]];
                    path.yBounds = [this.top + center[1] - r];

                } else {
                    end = this.postTranslate(this.angleRad, r);
                    path = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];
                }
                return path;
            },

            /**
             * Override setAxisTranslation by setting the translation to the difference
             * in rotation. This allows the translate method to return angle for
             * any given value.
             */
            setAxisTranslation: function() {

                // Call uber method
                axisProto.setAxisTranslation.call(this);

                // Set transA and minPixelPadding
                if (this.center) { // it's not defined the first time
                    if (this.isCircular) {

                        this.transA = (this.endAngleRad - this.startAngleRad) /
                            ((this.max - this.min) || 1);


                    } else {
                        this.transA = (this.center[2] / 2) / ((this.max - this.min) || 1);
                    }

                    if (this.isXAxis) {
                        this.minPixelPadding = this.transA * this.minPointOffset;
                    } else {
                        // This is a workaround for regression #2593, but categories still don't position correctly.
                        this.minPixelPadding = 0;
                    }
                }
            },

            /**
             * In case of auto connect, add one closestPointRange to the max value right before
             * tickPositions are computed, so that ticks will extend passed the real max.
             */
            beforeSetTickPositions: function() {
                // If autoConnect is true, polygonal grid lines are connected, and one closestPointRange
                // is added to the X axis to prevent the last point from overlapping the first.
                this.autoConnect = this.isCircular && pick(this.userMax, this.options.max) === undefined &&
                    this.endAngleRad - this.startAngleRad === 2 * Math.PI;

                if (this.autoConnect) {
                    this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0; // #1197, #2260
                }
            },

            /**
             * Override the setAxisSize method to use the arc's circumference as length. This
             * allows tickPixelInterval to apply to pixel lengths along the perimeter
             */
            setAxisSize: function() {

                axisProto.setAxisSize.call(this);

                if (this.isRadial) {

                    // Set the center array
                    this.pane.updateCenter(this);

                    // The sector is used in Axis.translate to compute the translation of reversed axis points (#2570)
                    if (this.isCircular) {
                        this.sector = this.endAngleRad - this.startAngleRad;
                    }

                    // Axis len is used to lay out the ticks
                    this.len = this.width = this.height = this.center[2] * pick(this.sector, 1) / 2;


                }
            },

            /**
             * Returns the x, y coordinate of a point given by a value and a pixel distance
             * from center
             */
            getPosition: function(value, length) {
                return this.postTranslate(
                    this.isCircular ? this.translate(value) : this.angleRad, // #2848
                    pick(this.isCircular ? length : this.translate(value), this.center[2] / 2) - this.offset
                );
            },

            /**
             * Translate from intermediate plotX (angle), plotY (axis.len - radius) to final chart coordinates.
             */
            postTranslate: function(angle, radius) {

                var chart = this.chart,
                    center = this.center;

                angle = this.startAngleRad + angle;

                return {
                    x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
                    y: chart.plotTop + center[1] + Math.sin(angle) * radius
                };

            },

            /**
             * Find the path for plot bands along the radial axis
             */
            getPlotBandPath: function(from, to, options) {
                var center = this.center,
                    startAngleRad = this.startAngleRad,
                    fullRadius = center[2] / 2,
                    radii = [
                        pick(options.outerRadius, '100%'),
                        options.innerRadius,
                        pick(options.thickness, 10)
                    ],
                    offset = Math.min(this.offset, 0),
                    percentRegex = /%$/,
                    start,
                    end,
                    open,
                    isCircular = this.isCircular, // X axis in a polar chart
                    ret;

                // Polygonal plot bands
                if (this.options.gridLineInterpolation === 'polygon') {
                    ret = this.getPlotLinePath(from).concat(this.getPlotLinePath(to, true));

                    // Circular grid bands
                } else {

                    // Keep within bounds
                    from = Math.max(from, this.min);
                    to = Math.min(to, this.max);

                    // Plot bands on Y axis (radial axis) - inner and outer radius depend on to and from
                    if (!isCircular) {
                        radii[0] = this.translate(from);
                        radii[1] = this.translate(to);
                    }

                    // Convert percentages to pixel values
                    radii = map(radii, function(radius) {
                        if (percentRegex.test(radius)) {
                            radius = (pInt(radius, 10) * fullRadius) / 100;
                        }
                        return radius;
                    });

                    // Handle full circle
                    if (options.shape === 'circle' || !isCircular) {
                        start = -Math.PI / 2;
                        end = Math.PI * 1.5;
                        open = true;
                    } else {
                        start = startAngleRad + this.translate(from);
                        end = startAngleRad + this.translate(to);
                    }

                    radii[0] -= offset; // #5283
                    radii[2] -= offset; // #5283

                    ret = this.chart.renderer.symbols.arc(
                        this.left + center[0],
                        this.top + center[1],
                        radii[0],
                        radii[0], {
                            start: Math.min(start, end), // Math is for reversed yAxis (#3606)
                            end: Math.max(start, end),
                            innerR: pick(radii[1], radii[0] - radii[2]),
                            open: open
                        }
                    );
                }

                return ret;
            },

            /**
             * Find the path for plot lines perpendicular to the radial axis.
             */
            getPlotLinePath: function(value, reverse) {
                var axis = this,
                    center = axis.center,
                    chart = axis.chart,
                    end = axis.getPosition(value),
                    xAxis,
                    xy,
                    tickPositions,
                    ret;

                // Spokes
                if (axis.isCircular) {
                    ret = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];

                    // Concentric circles
                } else if (axis.options.gridLineInterpolation === 'circle') {
                    value = axis.translate(value);
                    if (value) { // a value of 0 is in the center
                        ret = axis.getLinePath(0, value);
                    }
                    // Concentric polygons
                } else {
                    // Find the X axis in the same pane
                    each(chart.xAxis, function(a) {
                        if (a.pane === axis.pane) {
                            xAxis = a;
                        }
                    });
                    ret = [];
                    value = axis.translate(value);
                    tickPositions = xAxis.tickPositions;
                    if (xAxis.autoConnect) {
                        tickPositions = tickPositions.concat([tickPositions[0]]);
                    }
                    // Reverse the positions for concatenation of polygonal plot bands
                    if (reverse) {
                        tickPositions = [].concat(tickPositions).reverse();
                    }

                    each(tickPositions, function(pos, i) {
                        xy = xAxis.getPosition(pos, value);
                        ret.push(i ? 'L' : 'M', xy.x, xy.y);
                    });

                }
                return ret;
            },

            /**
             * Find the position for the axis title, by default inside the gauge
             */
            getTitlePosition: function() {
                var center = this.center,
                    chart = this.chart,
                    titleOptions = this.options.title;

                return {
                    x: chart.plotLeft + center[0] + (titleOptions.x || 0),
                    y: chart.plotTop + center[1] - ({
                            high: 0.5,
                            middle: 0.25,
                            low: 0
                        }[titleOptions.align] *
                        center[2]) + (titleOptions.y || 0)
                };
            }

        };

        /**
         * Override axisProto.init to mix in special axis instance functions and function overrides
         */
        wrap(axisProto, 'init', function(proceed, chart, userOptions) {
            var angular = chart.angular,
                polar = chart.polar,
                isX = userOptions.isX,
                isHidden = angular && isX,
                isCircular,
                options,
                chartOptions = chart.options,
                paneIndex = userOptions.pane || 0,
                pane = this.pane = chart.pane && chart.pane[paneIndex],
                paneOptions = pane && pane.options;

            // Before prototype.init
            if (angular) {
                extend(this, isHidden ? hiddenAxisMixin : radialAxisMixin);
                isCircular = !isX;
                if (isCircular) {
                    this.defaultRadialOptions = this.defaultRadialGaugeOptions;
                }

            } else if (polar) {
                extend(this, radialAxisMixin);
                isCircular = isX;
                this.defaultRadialOptions = isX ? this.defaultRadialXOptions : merge(this.defaultYAxisOptions, this.defaultRadialYOptions);

            }

            // Disable certain features on angular and polar axes
            if (angular || polar) {
                this.isRadial = true;
                chart.inverted = false;
                chartOptions.chart.zoomType = null;
            } else {
                this.isRadial = false;
            }

            // A pointer back to this axis to borrow geometry
            if (pane && isCircular) {
                pane.axis = this;
            }

            // Run prototype.init
            proceed.call(this, chart, userOptions);

            if (!isHidden && pane && (angular || polar)) {
                options = this.options;

                // Start and end angle options are
                // given in degrees relative to top, while internal computations are
                // in radians relative to right (like SVG).
                this.angleRad = (options.angle || 0) * Math.PI / 180; // Y axis in polar charts
                this.startAngleRad = (paneOptions.startAngle - 90) * Math.PI / 180; // Gauges
                this.endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180; // Gauges
                this.offset = options.offset || 0;

                this.isCircular = isCircular;

            }

        });

        /**
         * Wrap auto label align to avoid setting axis-wide rotation on radial axes (#4920)
         * @param   {Function} proceed
         * @returns {String} Alignment
         */
        wrap(axisProto, 'autoLabelAlign', function(proceed) {
            if (!this.isRadial) {
                return proceed.apply(this, [].slice.call(arguments, 1));
            } // else return undefined
        });

        /**
         * Add special cases within the Tick class' methods for radial axes.
         */
        wrap(tickProto, 'getPosition', function(proceed, horiz, pos, tickmarkOffset, old) {
            var axis = this.axis;

            return axis.getPosition ?
                axis.getPosition(pos) :
                proceed.call(this, horiz, pos, tickmarkOffset, old);
        });

        /**
         * Wrap the getLabelPosition function to find the center position of the label
         * based on the distance option
         */
        wrap(tickProto, 'getLabelPosition', function(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
            var axis = this.axis,
                optionsY = labelOptions.y,
                ret,
                centerSlot = 20, // 20 degrees to each side at the top and bottom
                align = labelOptions.align,
                angle = ((axis.translate(this.pos) + axis.startAngleRad + Math.PI / 2) / Math.PI * 180) % 360;

            if (axis.isRadial) { // Both X and Y axes in a polar chart
                ret = axis.getPosition(this.pos, (axis.center[2] / 2) + pick(labelOptions.distance, -25));

                // Automatically rotated
                if (labelOptions.rotation === 'auto') {
                    label.attr({
                        rotation: angle
                    });

                    // Vertically centered
                } else if (optionsY === null) {
                    optionsY = axis.chart.renderer.fontMetrics(label.styles.fontSize).b - label.getBBox().height / 2;
                }

                // Automatic alignment
                if (align === null) {
                    if (axis.isCircular) { // Y axis
                        if (this.label.getBBox().width > axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
                            centerSlot = 0;
                        }
                        if (angle > centerSlot && angle < 180 - centerSlot) {
                            align = 'left'; // right hemisphere
                        } else if (angle > 180 + centerSlot && angle < 360 - centerSlot) {
                            align = 'right'; // left hemisphere
                        } else {
                            align = 'center'; // top or bottom
                        }
                    } else {
                        align = 'center';
                    }
                    label.attr({
                        align: align
                    });
                }

                ret.x += labelOptions.x;
                ret.y += optionsY;

            } else {
                ret = proceed.call(this, x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
            }
            return ret;
        });

        /**
         * Wrap the getMarkPath function to return the path of the radial marker
         */
        wrap(tickProto, 'getMarkPath', function(proceed, x, y, tickLength, tickWidth, horiz, renderer) {
            var axis = this.axis,
                endPoint,
                ret;

            if (axis.isRadial) {
                endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
                ret = [
                    'M',
                    x,
                    y,
                    'L',
                    endPoint.x,
                    endPoint.y
                ];
            } else {
                ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
            }
            return ret;
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var each = H.each,
            noop = H.noop,
            pick = H.pick,
            defined = H.defined,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes,
            seriesProto = Series.prototype,
            pointProto = H.Point.prototype;

        /**
         * The area range series is a carteseian series with higher and lower values
         * for each point along an X axis, where the area between the values is shaded.
         * Requires `highcharts-more.js`.
         * 
         * @extends plotOptions.area
         * @product highcharts highstock
         * @sample {highcharts} highcharts/demo/arearange/ Area range chart
         * @sample {highstock} stock/demo/arearange/ Area range chart
         * @optionparent plotOptions.arearange
         */
        seriesType('arearange', 'area', {


            /**
             * @default null
             */
            threshold: null,

            tooltip: {

                pointFormat: '<span class="highcharts-color-{series.colorIndex}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'

            },

            /**
             * Whether the whole area or just the line should respond to mouseover
             * tooltips and other mouse or touch events.
             * 
             * @type {Boolean}
             * @default true
             * @since 2.3.0
             * @product highcharts highstock
             */
            trackByArea: true,

            /**
             * Extended data labels for range series types. Range series data labels
             * have no `x` and `y` options. Instead, they have `xLow`, `xHigh`,
             * `yLow` and `yHigh` options to allow the higher and lower data label
             * sets individually.
             * 
             * @type {Object}
             * @extends plotOptions.series.dataLabels
             * @excluding x,y
             * @since 2.3.0
             * @product highcharts highstock
             */
            dataLabels: {

                align: null,
                verticalAlign: null,

                /**
                 * X offset of the lower data labels relative to the point value.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @sample {highstock} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @default 0
                 * @since 2.3.0
                 * @product highcharts highstock
                 */
                xLow: 0,

                /**
                 * X offset of the higher data labels relative to the point value.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @sample {highstock} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @default 0
                 * @since 2.3.0
                 * @product highcharts highstock
                 */
                xHigh: 0,

                /**
                 * Y offset of the lower data labels relative to the point value.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @sample {highstock} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @default 16
                 * @since 2.3.0
                 * @product highcharts highstock
                 */
                yLow: 0,

                /**
                 * Y offset of the higher data labels relative to the point value.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @sample {highstock} highcharts/plotoptions/arearange-datalabels/ Data labels on range series
                 * @default -6
                 * @since 2.3.0
                 * @product highcharts highstock
                 */
                yHigh: 0
            }

            /**
             * Whether to apply a drop shadow to the graph line. Since 2.3 the shadow
             * can be an object configuration containing `color`, `offsetX`, `offsetY`,
             *  `opacity` and `width`.
             * 
             * @type {Boolean|Object}
             * @product highcharts
             * @apioption plotOptions.arearange.shadow
             */

            // Prototype members
        }, {
            pointArrayMap: ['low', 'high'],
            dataLabelCollections: ['dataLabel', 'dataLabelUpper'],
            toYData: function(point) {
                return [point.low, point.high];
            },
            pointValKey: 'low',
            deferTranslatePolar: true,

            /**
             * Translate a point's plotHigh from the internal angle and radius measures to
             * true plotHigh coordinates. This is an addition of the toXY method found in
             * Polar.js, because it runs too early for arearanges to be considered (#3419).
             */
            highToXY: function(point) {
                // Find the polar plotX and plotY
                var chart = this.chart,
                    xy = this.xAxis.postTranslate(point.rectPlotX, this.yAxis.len - point.plotHigh);
                point.plotHighX = xy.x - chart.plotLeft;
                point.plotHigh = xy.y - chart.plotTop;
                point.plotLowX = point.plotX;
            },

            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    hasModifyValue = !!series.modifyValue;

                seriesTypes.area.prototype.translate.apply(series);

                // Set plotLow and plotHigh
                each(series.points, function(point) {

                    var low = point.low,
                        high = point.high,
                        plotY = point.plotY;

                    if (high === null || low === null) {
                        point.isNull = true;
                        point.plotY = null;
                    } else {
                        point.plotLow = plotY;
                        point.plotHigh = yAxis.translate(
                            hasModifyValue ? series.modifyValue(high, point) : high,
                            0,
                            1,
                            0,
                            1
                        );
                        if (hasModifyValue) {
                            point.yBottom = point.plotHigh;
                        }
                    }
                });

                // Postprocess plotHigh
                if (this.chart.polar) {
                    each(this.points, function(point) {
                        series.highToXY(point);
                        point.tooltipPos = [
                            (point.plotHighX + point.plotLowX) / 2,
                            (point.plotHigh + point.plotLow) / 2
                        ];
                    });
                }
            },

            /**
             * Extend the line series' getSegmentPath method by applying the segment
             * path to both lower and higher values of the range
             */
            getGraphPath: function(points) {

                var highPoints = [],
                    highAreaPoints = [],
                    i,
                    getGraphPath = seriesTypes.area.prototype.getGraphPath,
                    point,
                    pointShim,
                    linePath,
                    lowerPath,
                    options = this.options,
                    connectEnds = this.chart.polar && options.connectEnds !== false,
                    connectNulls = options.connectNulls,
                    step = options.step,
                    higherPath,
                    higherAreaPath;

                points = points || this.points;
                i = points.length;

                // Create the top line and the top part of the area fill. The area fill compensates for 
                // null points by drawing down to the lower graph, moving across the null gap and 
                // starting again at the lower graph.
                i = points.length;
                while (i--) {
                    point = points[i];

                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i + 1] || points[i + 1].isNull)
                    ) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }

                    pointShim = {
                        polarPlotY: point.polarPlotY,
                        rectPlotX: point.rectPlotX,
                        yBottom: point.yBottom,
                        plotX: pick(point.plotHighX, point.plotX), // plotHighX is for polar charts
                        plotY: point.plotHigh,
                        isNull: point.isNull
                    };

                    highAreaPoints.push(pointShim);

                    highPoints.push(pointShim);

                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i - 1] || points[i - 1].isNull)
                    ) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }
                }

                // Get the paths
                lowerPath = getGraphPath.call(this, points);
                if (step) {
                    if (step === true) {
                        step = 'left';
                    }
                    options.step = {
                        left: 'right',
                        center: 'center',
                        right: 'left'
                    }[step]; // swap for reading in getGraphPath
                }
                higherPath = getGraphPath.call(this, highPoints);
                higherAreaPath = getGraphPath.call(this, highAreaPoints);
                options.step = step;

                // Create a line on both top and bottom of the range
                linePath = [].concat(lowerPath, higherPath);

                // For the area path, we need to change the 'move' statement into 'lineTo' or 'curveTo'
                if (!this.chart.polar && higherAreaPath[0] === 'M') {
                    higherAreaPath[0] = 'L'; // this probably doesn't work for spline			
                }

                this.graphPath = linePath;
                this.areaPath = lowerPath.concat(higherAreaPath);

                // Prepare for sideways animation
                linePath.isArea = true;
                linePath.xMap = lowerPath.xMap;
                this.areaPath.xMap = lowerPath.xMap;

                return linePath;
            },

            /**
             * Extend the basic drawDataLabels method by running it for both lower and higher
             * values.
             */
            drawDataLabels: function() {

                var data = this.data,
                    length = data.length,
                    i,
                    originalDataLabels = [],
                    dataLabelOptions = this.options.dataLabels,
                    align = dataLabelOptions.align,
                    verticalAlign = dataLabelOptions.verticalAlign,
                    inside = dataLabelOptions.inside,
                    point,
                    up,
                    inverted = this.chart.inverted;

                if (dataLabelOptions.enabled || this._hasPointLabels) {

                    // Step 1: set preliminary values for plotY and dataLabel and draw the upper labels
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

                            // Set preliminary values
                            point.y = point.high;
                            point._plotY = point.plotY;
                            point.plotY = point.plotHigh;

                            // Store original data labels and set preliminary label objects to be picked up
                            // in the uber method
                            originalDataLabels[i] = point.dataLabel;
                            point.dataLabel = point.dataLabelUpper;

                            // Set the default offset
                            point.below = up;
                            if (inverted) {
                                if (!align) {
                                    dataLabelOptions.align = up ? 'right' : 'left';
                                }
                            } else {
                                if (!verticalAlign) {
                                    dataLabelOptions.verticalAlign = up ? 'top' : 'bottom';
                                }
                            }

                            dataLabelOptions.x = dataLabelOptions.xHigh;
                            dataLabelOptions.y = dataLabelOptions.yHigh;
                        }
                    }

                    if (seriesProto.drawDataLabels) {
                        seriesProto.drawDataLabels.apply(this, arguments); // #1209
                    }

                    // Step 2: reorganize and handle data labels for the lower values
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

                            // Move the generated labels from step 1, and reassign the original data labels
                            point.dataLabelUpper = point.dataLabel;
                            point.dataLabel = originalDataLabels[i];

                            // Reset values
                            point.y = point.low;
                            point.plotY = point._plotY;

                            // Set the default offset
                            point.below = !up;
                            if (inverted) {
                                if (!align) {
                                    dataLabelOptions.align = up ? 'left' : 'right';
                                }
                            } else {
                                if (!verticalAlign) {
                                    dataLabelOptions.verticalAlign = up ? 'bottom' : 'top';
                                }

                            }

                            dataLabelOptions.x = dataLabelOptions.xLow;
                            dataLabelOptions.y = dataLabelOptions.yLow;
                        }
                    }
                    if (seriesProto.drawDataLabels) {
                        seriesProto.drawDataLabels.apply(this, arguments);
                    }
                }

                dataLabelOptions.align = align;
                dataLabelOptions.verticalAlign = verticalAlign;
            },

            alignDataLabel: function() {
                seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
            },

            drawPoints: function() {
                var series = this,
                    pointLength = series.points.length,
                    point,
                    i;

                // Draw bottom points
                seriesProto.drawPoints.apply(series, arguments);

                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    point.lowerGraphic = point.graphic;
                    point.graphic = point.upperGraphic;
                    point._plotY = point.plotY;
                    point._plotX = point.plotX;
                    point.plotY = point.plotHigh;
                    if (defined(point.plotHighX)) {
                        point.plotX = point.plotHighX;
                    }
                    i++;
                }

                // Draw top points
                seriesProto.drawPoints.apply(series, arguments);

                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    point.upperGraphic = point.graphic;
                    point.graphic = point.lowerGraphic;
                    point.plotY = point._plotY;
                    point.plotX = point._plotX;
                    i++;
                }
            },

            setStackedPoints: noop
        }, {
            setState: function() {
                var prevState = this.state,
                    series = this.series,
                    isPolar = series.chart.polar;


                if (!defined(this.plotHigh)) {
                    // Boost doesn't calculate plotHigh
                    this.plotHigh = series.yAxis.toPixels(this.high, true);
                }

                if (!defined(this.plotLow)) {
                    // Boost doesn't calculate plotLow
                    this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
                }

                // Bottom state:
                pointProto.setState.apply(this, arguments);

                // Change state also for the top marker
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;

                if (isPolar) {
                    this.plotX = this.plotHighX;
                }

                this.state = prevState;

                if (series.stateMarkerGraphic) {
                    series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
                    series.stateMarkerGraphic = series.upperStateMarkerGraphic;
                }

                pointProto.setState.apply(this, arguments);

                // Now restore defaults
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;

                if (isPolar) {
                    this.plotX = this.plotLowX;
                }

                if (series.stateMarkerGraphic) {
                    series.upperStateMarkerGraphic = series.stateMarkerGraphic;
                    series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
                    // Lower marker is stored at stateMarkerGraphic
                    // to avoid reference duplication (#7021)
                    series.lowerStateMarkerGraphic = undefined;
                }
            },
            haloPath: function() {
                var isPolar = this.series.chart.polar,
                    path = [];

                // Bottom halo
                this.plotY = this.plotLow;
                if (isPolar) {
                    this.plotX = this.plotLowX;
                }

                path = pointProto.haloPath.apply(this, arguments);

                // Top halo
                this.plotY = this.plotHigh;
                if (isPolar) {
                    this.plotX = this.plotHighX;
                }
                path = path.concat(
                    pointProto.haloPath.apply(this, arguments)
                );

                return path;
            },
            destroy: function() {
                if (this.upperGraphic) {
                    this.upperGraphic = this.upperGraphic.destroy();
                }
                return pointProto.destroy.apply(this, arguments);
            }
        });


        /**
         * A `arearange` series. If the [type](#series.arearange.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         * 
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * arearange](#plotOptions.arearange).
         * 
         * @type {Object}
         * @extends series,plotOptions.arearange
         * @excluding dataParser,dataURL,stack
         * @product highcharts highstock
         * @apioption series.arearange
         */

        /**
         * An array of data points for the series. For the `arearange` series
         * type, points can be given in the following ways:
         * 
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `x,low,high`. If the first value is a string, it is
         * applied as the name of the point, and the `x` value is inferred.
         * The `x` value can also be omitted, in which case the inner arrays
         * should be of length 2\. Then the `x` value is automatically calculated,
         * either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options.
         * 
         *  ```js
         *     data: [
         *         [0, 8, 3],
         *         [1, 1, 1],
         *         [2, 6, 8]
         *     ]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.arearange.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         low: 9,
         *         high: 0,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 3,
         *         high: 4,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.line.data
         * @excluding marker,y
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts highstock
         * @apioption series.arearange.data
         */

        /**
         * The high or maximum value for each data point.
         * 
         * @type {Number}
         * @product highcharts highstock
         * @apioption series.arearange.data.high
         */

        /**
         * The low or minimum value for each data point.
         * 
         * @type {Number}
         * @product highcharts highstock
         * @apioption series.arearange.data.low
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */

        var seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * The area spline range is a cartesian series type with higher and
         * lower Y values along an X axis. The area inside the range is colored, and
         * the graph outlining the area is a smoothed spline. Requires
         * `highcharts-more.js`.
         * 
         * @extends plotOptions.arearange
         * @excluding step
         * @since 2.3.0
         * @sample {highstock} stock/demo/areasplinerange/ Area spline range
         * @sample {highstock} stock/demo/areasplinerange/ Area spline range
         * @product highcharts highstock
         * @apioption plotOptions.areasplinerange
         */
        seriesType('areasplinerange', 'arearange', null, {
            getPointSpline: seriesTypes.spline.prototype.getPointSpline
        });

        /**
         * A `areasplinerange` series. If the [type](#series.areasplinerange.
         * type) option is not specified, it is inherited from [chart.type](#chart.
         * type).
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * areasplinerange](#plotOptions.areasplinerange).
         * 
         * @type {Object}
         * @extends series,plotOptions.areasplinerange
         * @excluding dataParser,dataURL,stack
         * @product highcharts highstock
         * @apioption series.areasplinerange
         */

        /**
         * An array of data points for the series. For the `areasplinerange`
         * series type, points can be given in the following ways:
         * 
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `x,low,high`. If the first value is a string, it is
         * applied as the name of the point, and the `x` value is inferred.
         * The `x` value can also be omitted, in which case the inner arrays
         * should be of length 2\. Then the `x` value is automatically calculated,
         * either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options.
         * 
         *  ```js
         *     data: [
         *         [0, 0, 5],
         *         [1, 9, 1],
         *         [2, 5, 2]
         *     ]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.areasplinerange.
         * turboThreshold), this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         low: 5,
         *         high: 0,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 4,
         *         high: 1,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.arearange.data
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts highstock
         * @apioption series.areasplinerange.data
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var defaultPlotOptions = H.defaultPlotOptions,
            each = H.each,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        var colProto = seriesTypes.column.prototype;
        /**
         * The column range is a cartesian series type with higher and lower
         * Y values along an X axis. Requires `highcharts-more.js`. To display
         * horizontal bars, set [chart.inverted](#chart.inverted) to `true`.
         *
         * @type {Object}
         * @extends plotOptions.column
         * @excluding negativeColor,stacking,softThreshold,threshold
         * @sample {highcharts} highcharts/demo/columnrange/
         *         Inverted column range
         * @sample {highstock} highcharts/demo/columnrange/
         *         Inverted column range
         * @since 2.3.0
         * @product highcharts highstock
         * @optionparent plotOptions.columnrange
         */
        var columnRangeOptions = {

            pointRange: null,
            marker: null,
            states: {
                hover: {
                    /**
                     * @ignore-option
                     */
                    halo: false
                }
            }

            /**
             * Extended data labels for range series types. Range series data labels
             * have no `x` and `y` options. Instead, they have `xLow`, `xHigh`,
             * `yLow` and `yHigh` options to allow the higher and lower data label
             * sets individually.
             *
             * @type {Object}
             * @extends plotOptions.arearange.dataLabels
             * @since 2.3.0
             * @product highcharts highstock
             * @apioption plotOptions.columnrange.dataLabels
             */
        };
        /**
         * The ColumnRangeSeries class
         */
        seriesType('columnrange', 'arearange', merge(
            defaultPlotOptions.column,
            defaultPlotOptions.arearange,
            columnRangeOptions

        ), {
            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    xAxis = series.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    chart = series.chart,
                    isRadial = series.xAxis.isRadial,
                    safeDistance = Math.max(chart.chartWidth, chart.chartHeight) + 999,
                    plotHigh;

                // Don't draw too far outside plot area (#6835)
                function safeBounds(pixelPos) {
                    return Math.min(Math.max(-safeDistance,
                        pixelPos
                    ), safeDistance);
                }


                colProto.translate.apply(series);

                // Set plotLow and plotHigh
                each(series.points, function(point) {
                    var shapeArgs = point.shapeArgs,
                        minPointLength = series.options.minPointLength,
                        heightDifference,
                        height,
                        y;

                    point.plotHigh = plotHigh = safeBounds(
                        yAxis.translate(point.high, 0, 1, 0, 1)
                    );
                    point.plotLow = safeBounds(point.plotY);

                    // adjust shape
                    y = plotHigh;
                    height = pick(point.rectPlotY, point.plotY) - plotHigh;

                    // Adjust for minPointLength
                    if (Math.abs(height) < minPointLength) {
                        heightDifference = (minPointLength - height);
                        height += heightDifference;
                        y -= heightDifference / 2;

                        // Adjust for negative ranges or reversed Y axis (#1457)
                    } else if (height < 0) {
                        height *= -1;
                        y -= height;
                    }

                    if (isRadial) {

                        start = point.barX + startAngleRad;
                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: series.polarArc(y + height, y, start, start + point.pointWidth)
                        };
                    } else {

                        shapeArgs.height = height;
                        shapeArgs.y = y;

                        point.tooltipPos = chart.inverted ? [
                            yAxis.len + yAxis.pos - chart.plotLeft - y - height / 2,
                            xAxis.len + xAxis.pos - chart.plotTop - shapeArgs.x -
                            shapeArgs.width / 2,
                            height
                        ] : [
                            xAxis.left - chart.plotLeft + shapeArgs.x +
                            shapeArgs.width / 2,
                            yAxis.pos - chart.plotTop + y + height / 2,
                            height
                        ]; // don't inherit from column tooltip position - #3372
                    }
                });
            },
            directTouch: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            drawGraph: noop,
            getSymbol: noop,
            crispCol: colProto.crispCol,
            drawPoints: colProto.drawPoints,
            drawTracker: colProto.drawTracker,
            getColumnMetrics: colProto.getColumnMetrics,
            pointAttribs: colProto.pointAttribs,

            // Overrides from modules that may be loaded after this module
            animate: function() {
                return colProto.animate.apply(this, arguments);
            },
            polarArc: function() {
                return colProto.polarArc.apply(this, arguments);
            },
            translate3dPoints: function() {
                return colProto.translate3dPoints.apply(this, arguments);
            },
            translate3dShapes: function() {
                return colProto.translate3dShapes.apply(this, arguments);
            }
        }, {
            setState: colProto.pointClass.prototype.setState
        });


        /**
         * A `columnrange` series. If the [type](#series.columnrange.type)
         * option is not specified, it is inherited from [chart.type](#chart.
         * type).
         *
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * columnrange](#plotOptions.columnrange).
         *
         * @type {Object}
         * @extends series,plotOptions.columnrange
         * @excluding dataParser,dataURL,stack
         * @product highcharts highstock
         * @apioption series.columnrange
         */

        /**
         * An array of data points for the series. For the `columnrange` series
         * type, points can be given in the following ways:
         *
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `x,low,high`. If the first value is a string, it is
         * applied as the name of the point, and the `x` value is inferred.
         * The `x` value can also be omitted, in which case the inner arrays
         * should be of length 2\. Then the `x` value is automatically calculated,
         * either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options.
         *
         *  ```js
         *     data: [
         *         [0, 4, 2],
         *         [1, 2, 1],
         *         [2, 9, 10]
         *     ]
         *  ```
         *
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.columnrange.
         * turboThreshold), this option is not available.
         *
         *  ```js
         *     data: [{
         *         x: 1,
         *         low: 0,
         *         high: 4,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 5,
         *         high: 3,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @type {Array<Object|Array>}
         * @extends series.arearange.data
         * @excluding marker
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts highstock
         * @apioption series.columnrange.data
         */


    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var each = H.each,
            isNumber = H.isNumber,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Series = H.Series,
            seriesType = H.seriesType,
            TrackerMixin = H.TrackerMixin;


        /** 
         * Gauges are circular plots displaying one or more values with a dial pointing
         * to values along the perimeter.
         *
         * @sample highcharts/demo/gauge-speedometer/ Gauge chart
         * @extends {plotOptions.line}
         * @excluding animationLimit,boostThreshold,connectEnds,connectNulls,cropThreshold,dashStyle,findNearestPointBy,getExtremesFromAll,marker,pointPlacement,softThreshold,stacking,step,threshold,turboThreshold,zoneAxis,zones
         * @product highcharts
         * @optionparent plotOptions.gauge
         */
        seriesType('gauge', 'line', {

            /**
             * Data labels for the gauge. For gauges, the data labels are enabled
             * by default and shown in a bordered box below the point.
             * 
             * @type {Object}
             * @extends plotOptions.series.dataLabels
             * @since 2.3.0
             * @product highcharts
             */
            dataLabels: {

                /**
                 * Enable or disable the data labels.
                 * 
                 * @type {Boolean}
                 * @since 2.3.0
                 * @product highcharts highmaps
                 */
                enabled: true,

                defer: false,

                /**
                 * The y position offset of the label relative to the center of the
                 * gauge.
                 * 
                 * @type {Number}
                 * @default 15
                 * @since 2.3.0
                 * @product highcharts highmaps
                 */
                y: 15,

                /**
                 * The border radius in pixels for the gauge's data label.
                 * 
                 * @type {Number}
                 * @default 3
                 * @since 2.3.0
                 * @product highcharts highmaps
                 */
                borderRadius: 3,

                crop: false,

                /**
                 * The vertical alignment of the data label.
                 * 
                 * @type {String}
                 * @default top
                 * @product highcharts highmaps
                 */
                verticalAlign: 'top',

                /**
                 * The Z index of the data labels. A value of 2 display them behind
                 * the dial.
                 * 
                 * @type {Number}
                 * @default 2
                 * @since 2.1.5
                 * @product highcharts highmaps
                 */
                zIndex: 2

            },

            /**
             * Options for the dial or arrow pointer of the gauge.
             * 
             * In styled mode, the dial is styled with the `.highcharts-gauge-
             * series .highcharts-dial` rule.
             * 
             * @type {Object}
             * @sample {highcharts} highcharts/css/gauge/ Styled mode
             * @since 2.3.0
             * @product highcharts
             */


            dial: {

                /**
                 * The length of the dial's base part, relative to the total radius
                 * or length of the dial.
                 * 
                 * @type {String}
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 * @default 70%
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.dial.baseLength
                 */

                /**
                 * The pixel width of the base of the gauge dial. The base is the part
                 * closest to the pivot, defined by baseLength.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 * @default 3
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.dial.baseWidth
                 */

                /**
                 * The radius or length of the dial, in percentages relative to the
                 * radius of the gauge itself.
                 * 
                 * @type {String}
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 * @default 80%
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.dial.radius
                 */

                /**
                 * The length of the dial's rear end, the part that extends out on the
                 * other side of the pivot. Relative to the dial's length.
                 * 
                 * @type {String}
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/ Dial options demonstrated
                 * @default 10%
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.dial.rearLength
                 */

                /**
                 * The width of the top of the dial, closest to the perimeter. The pivot
                 * narrows in from the base to the top.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/ Dial options demonstrated
                 * @default 1
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.dial.topWidth
                 */



            },

            /**
             * Allow the dial to overshoot the end of the perimeter axis by this
             * many degrees. Say if the gauge axis goes from 0 to 60, a value of
             * 100, or 1000, will show 5 degrees beyond the end of the axis.
             * 
             * @type {Number}
             * @see [wrap](#plotOptions.gauge.wrap)
             * @sample {highcharts} highcharts/plotoptions/gauge-overshoot/
             *         Allow 5 degrees overshoot
             * @default 0
             * @since 3.0.10
             * @product highcharts
             * @apioption plotOptions.gauge.overshoot
             */

            /**
             * Options for the pivot or the center point of the gauge.
             * 
             * In styled mode, the pivot is styled with the `.highcharts-gauge-
             * series .highcharts-pivot` rule.
             * 
             * @type {Object}
             * @sample {highcharts} highcharts/css/gauge/ Styled mode
             * @since 2.3.0
             * @product highcharts
             */
            pivot: {

                /**
                 * The pixel radius of the pivot.
                 * 
                 * @type {Number}
                 * @sample {highcharts} highcharts/plotoptions/gauge-pivot/ Pivot options demonstrated
                 * @default 5
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.gauge.pivot.radius
                 */


            },

            tooltip: {
                headerFormat: ''
            },

            /**
             * Whether to display this particular series or series type in the
             * legend. Defaults to false for gauge series.
             * 
             * @type {Boolean}
             * @since 2.3.0
             * @product highcharts
             */
            showInLegend: false

            /**
             * When this option is `true`, the dial will wrap around the axes. For
             * instance, in a full-range gauge going from 0 to 360, a value of 400
             * will point to 40\. When `wrap` is `false`, the dial stops at 360.
             * 
             * @type {Boolean}
             * @see [overshoot](#plotOptions.gauge.overshoot)
             * @default true
             * @since 3.0
             * @product highcharts
             * @apioption plotOptions.gauge.wrap
             */



            // Prototype members
        }, {
            // chart.angular will be set to true when a gauge series is present, and this will
            // be used on the axes
            angular: true,
            directTouch: true, // #5063
            drawGraph: noop,
            fixedBox: true,
            forceDL: true,
            noSharedTooltip: true,
            trackerGroups: ['group', 'dataLabelsGroup'],

            /**
             * Calculate paths etc
             */
            translate: function() {

                var series = this,
                    yAxis = series.yAxis,
                    options = series.options,
                    center = yAxis.center;

                series.generatePoints();

                each(series.points, function(point) {

                    var dialOptions = merge(options.dial, point.dial),
                        radius = (pInt(pick(dialOptions.radius, 80)) * center[2]) / 200,
                        baseLength = (pInt(pick(dialOptions.baseLength, 70)) * radius) / 100,
                        rearLength = (pInt(pick(dialOptions.rearLength, 10)) * radius) / 100,
                        baseWidth = dialOptions.baseWidth || 3,
                        topWidth = dialOptions.topWidth || 1,
                        overshoot = options.overshoot,
                        rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);

                    // Handle the wrap and overshoot options
                    if (isNumber(overshoot)) {
                        overshoot = overshoot / 180 * Math.PI;
                        rotation = Math.max(yAxis.startAngleRad - overshoot, Math.min(yAxis.endAngleRad + overshoot, rotation));

                    } else if (options.wrap === false) {
                        rotation = Math.max(yAxis.startAngleRad, Math.min(yAxis.endAngleRad, rotation));
                    }

                    rotation = rotation * 180 / Math.PI;

                    point.shapeType = 'path';
                    point.shapeArgs = {
                        d: dialOptions.path || [
                            'M', -rearLength, -baseWidth / 2,
                            'L',
                            baseLength, -baseWidth / 2,
                            radius, -topWidth / 2,
                            radius, topWidth / 2,
                            baseLength, baseWidth / 2, -rearLength, baseWidth / 2,
                            'z'
                        ],
                        translateX: center[0],
                        translateY: center[1],
                        rotation: rotation
                    };

                    // Positions for data label
                    point.plotX = center[0];
                    point.plotY = center[1];
                });
            },

            /**
             * Draw the points where each point is one needle
             */
            drawPoints: function() {

                var series = this,
                    center = series.yAxis.center,
                    pivot = series.pivot,
                    options = series.options,
                    pivotOptions = options.pivot,
                    renderer = series.chart.renderer;

                each(series.points, function(point) {

                    var graphic = point.graphic,
                        shapeArgs = point.shapeArgs,
                        d = shapeArgs.d,
                        dialOptions = merge(options.dial, point.dial); // #1233

                    if (graphic) {
                        graphic.animate(shapeArgs);
                        shapeArgs.d = d; // animate alters it
                    } else {
                        point.graphic = renderer[point.shapeType](shapeArgs)
                            .attr({
                                rotation: shapeArgs.rotation, // required by VML when animation is false
                                zIndex: 1
                            })
                            .addClass('highcharts-dial')
                            .add(series.group);


                    }
                });

                // Add or move the pivot
                if (pivot) {
                    pivot.animate({ // #1235
                        translateX: center[0],
                        translateY: center[1]
                    });
                } else {
                    series.pivot = renderer.circle(0, 0, pick(pivotOptions.radius, 5))
                        .attr({
                            zIndex: 2
                        })
                        .addClass('highcharts-pivot')
                        .translate(center[0], center[1])
                        .add(series.group);


                }
            },

            /**
             * Animate the arrow up from startAngle
             */
            animate: function(init) {
                var series = this;

                if (!init) {
                    each(series.points, function(point) {
                        var graphic = point.graphic;

                        if (graphic) {
                            // start value
                            graphic.attr({
                                rotation: series.yAxis.startAngleRad * 180 / Math.PI
                            });

                            // animate
                            graphic.animate({
                                rotation: point.shapeArgs.rotation
                            }, series.options.animation);
                        }
                    });

                    // delete this function to allow it only once
                    series.animate = null;
                }
            },

            render: function() {
                this.group = this.plotGroup(
                    'group',
                    'series',
                    this.visible ? 'visible' : 'hidden',
                    this.options.zIndex,
                    this.chart.seriesGroup
                );
                Series.prototype.render.call(this);
                this.group.clip(this.chart.clipRect);
            },

            /**
             * Extend the basic setData method by running processData and generatePoints immediately,
             * in order to access the points from the legend.
             */
            setData: function(data, redraw) {
                Series.prototype.setData.call(this, data, false);
                this.processData();
                this.generatePoints();
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            },

            /**
             * If the tracking module is loaded, add the point tracker
             */
            drawTracker: TrackerMixin && TrackerMixin.drawTrackerPoint

            // Point members
        }, {
            /**
             * Don't do any hover colors or anything
             */
            setState: function(state) {
                this.state = state;
            }
        });

        /**
         * A `gauge` series. If the [type](#series.gauge.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * gauge](#plotOptions.gauge).
         * 
         * @type {Object}
         * @extends series,plotOptions.gauge
         * @excluding dataParser,dataURL,stack
         * @product highcharts
         * @apioption series.gauge
         */

        /**
         * An array of data points for the series. For the `gauge` series type,
         * points can be given in the following ways:
         * 
         * 1.  An array of numerical values. In this case, the numerical values
         * will be interpreted as `y` options. Example:
         * 
         *  ```js
         *  data: [0, 5, 3, 5]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.gauge.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *     y: 6,
         *     name: "Point2",
         *     color: "#00FF00"
         * }, {
         *     y: 8,
         *     name: "Point1",
         *     color: "#FF00FF"
         * }]</pre>
         * 
         * The typical gauge only contains a single data value.
         * 
         * @type {Array<Object|Number>}
         * @extends series.line.data
         * @excluding drilldown,marker,x
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts
         * @apioption series.gauge.data
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var each = H.each,
            noop = H.noop,
            pick = H.pick,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * The boxplot series type.
         *
         * @constructor seriesTypes.boxplot
         * @augments seriesTypes.column
         */

        /**
         * A box plot is a convenient way of depicting groups of data through their
         * five-number summaries: the smallest observation (sample minimum), lower
         * quartile (Q1), median (Q2), upper quartile (Q3), and largest observation
         * (sample maximum).
         * 
         * @sample highcharts/demo/box-plot/ Box plot
         * @extends {plotOptions.column}
         * @product highcharts
         * @optionparent plotOptions.boxplot
         */
        seriesType('boxplot', 'column', {

            threshold: null,

            tooltip: {

                pointFormat: '<span class="highcharts-color-{point.colorIndex}">\u25CF</span> <b> {series.name}</b><br/>' +
                    'Maximum: {point.high}<br/>' +
                    'Upper quartile: {point.q3}<br/>' +
                    'Median: {point.median}<br/>' +
                    'Lower quartile: {point.q1}<br/>' +
                    'Minimum: {point.low}<br/>'

            },

            /**
             * The length of the whiskers, the horizontal lines marking low and
             * high values. It can be a numerical pixel value, or a percentage
             * value of the box width. Set `0` to disable whiskers.
             * 
             * @type {Number|String}
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         True by default
             * @default 50%
             * @since 3.0
             * @product highcharts
             */
            whiskerLength: '50%'


        }, /** @lends seriesTypes.boxplot */ {
            pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'], // array point configs are mapped to this
            toYData: function(point) { // return a plain array for speedy calculation
                return [point.low, point.q1, point.median, point.q3, point.high];
            },
            pointValKey: 'high', // defines the top of the tracker



            /**
             * Disable data labels for box plot
             */
            drawDataLabels: noop,

            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    pointArrayMap = series.pointArrayMap;

                seriesTypes.column.prototype.translate.apply(series);

                // do the translation on each point dimension
                each(series.points, function(point) {
                    each(pointArrayMap, function(key) {
                        if (point[key] !== null) {
                            point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                        }
                    });
                });
            },

            /**
             * Draw the data points
             */
            drawPoints: function() {
                var series = this,
                    points = series.points,
                    options = series.options,
                    chart = series.chart,
                    renderer = chart.renderer,
                    q1Plot,
                    q3Plot,
                    highPlot,
                    lowPlot,
                    medianPlot,
                    medianPath,
                    crispCorr,
                    crispX = 0,
                    boxPath,
                    width,
                    left,
                    right,
                    halfWidth,
                    doQuartiles = series.doQuartiles !== false, // error bar inherits this series type but doesn't do quartiles
                    pointWiskerLength,
                    whiskerLength = series.options.whiskerLength;


                each(points, function(point) {

                    var graphic = point.graphic,
                        verb = graphic ? 'animate' : 'attr',
                        shapeArgs = point.shapeArgs; // the box



                    if (point.plotY !== undefined) {

                        // crisp vector coordinates
                        width = shapeArgs.width;
                        left = Math.floor(shapeArgs.x);
                        right = left + width;
                        halfWidth = Math.round(width / 2);
                        q1Plot = Math.floor(doQuartiles ? point.q1Plot : point.lowPlot);
                        q3Plot = Math.floor(doQuartiles ? point.q3Plot : point.lowPlot);
                        highPlot = Math.floor(point.highPlot);
                        lowPlot = Math.floor(point.lowPlot);

                        if (!graphic) {
                            point.graphic = graphic = renderer.g('point')
                                .add(series.group);

                            point.stem = renderer.path()
                                .addClass('highcharts-boxplot-stem')
                                .add(graphic);

                            if (whiskerLength) {
                                point.whiskers = renderer.path()
                                    .addClass('highcharts-boxplot-whisker')
                                    .add(graphic);
                            }
                            if (doQuartiles) {
                                point.box = renderer.path(boxPath)
                                    .addClass('highcharts-boxplot-box')
                                    .add(graphic);
                            }
                            point.medianShape = renderer.path(medianPath)
                                .addClass('highcharts-boxplot-median')
                                .add(graphic);
                        }








                        // The stem
                        crispCorr = (point.stem.strokeWidth() % 2) / 2;
                        crispX = left + halfWidth + crispCorr;
                        point.stem[verb]({
                            d: [
                                // stem up
                                'M',
                                crispX, q3Plot,
                                'L',
                                crispX, highPlot,

                                // stem down
                                'M',
                                crispX, q1Plot,
                                'L',
                                crispX, lowPlot
                            ]
                        });

                        // The box
                        if (doQuartiles) {
                            crispCorr = (point.box.strokeWidth() % 2) / 2;
                            q1Plot = Math.floor(q1Plot) + crispCorr;
                            q3Plot = Math.floor(q3Plot) + crispCorr;
                            left += crispCorr;
                            right += crispCorr;
                            point.box[verb]({
                                d: [
                                    'M',
                                    left, q3Plot,
                                    'L',
                                    left, q1Plot,
                                    'L',
                                    right, q1Plot,
                                    'L',
                                    right, q3Plot,
                                    'L',
                                    left, q3Plot,
                                    'z'
                                ]
                            });
                        }

                        // The whiskers
                        if (whiskerLength) {
                            crispCorr = (point.whiskers.strokeWidth() % 2) / 2;
                            highPlot = highPlot + crispCorr;
                            lowPlot = lowPlot + crispCorr;
                            pointWiskerLength = (/%$/).test(whiskerLength) ? halfWidth * parseFloat(whiskerLength) / 100 : whiskerLength / 2;
                            point.whiskers[verb]({
                                d: [
                                    // High whisker
                                    'M',
                                    crispX - pointWiskerLength,
                                    highPlot,
                                    'L',
                                    crispX + pointWiskerLength,
                                    highPlot,

                                    // Low whisker
                                    'M',
                                    crispX - pointWiskerLength,
                                    lowPlot,
                                    'L',
                                    crispX + pointWiskerLength,
                                    lowPlot
                                ]
                            });
                        }

                        // The median
                        medianPlot = Math.round(point.medianPlot);
                        crispCorr = (point.medianShape.strokeWidth() % 2) / 2;
                        medianPlot = medianPlot + crispCorr;

                        point.medianShape[verb]({
                            d: [
                                'M',
                                left,
                                medianPlot,
                                'L',
                                right,
                                medianPlot
                            ]
                        });
                    }
                });

            },
            setStackedPoints: noop // #3890


        });

        /**
         * A `boxplot` series. If the [type](#series.boxplot.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * boxplot](#plotOptions.boxplot).
         * 
         * @type {Object}
         * @extends series,plotOptions.boxplot
         * @excluding dataParser,dataURL,stack
         * @product highcharts
         * @apioption series.boxplot
         */

        /**
         * An array of data points for the series. For the `boxplot` series
         * type, points can be given in the following ways:
         * 
         * 1.  An array of arrays with 6 or 5 values. In this case, the values
         * correspond to `x,low,q1,median,q3,high`. If the first value is a
         * string, it is applied as the name of the point, and the `x` value
         * is inferred. The `x` value can also be omitted, in which case the
         * inner arrays should be of length 5\. Then the `x` value is automatically
         * calculated, either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options.
         * 
         *  ```js
         *     data: [
         *         [0, 3, 0, 10, 3, 5],
         *         [1, 7, 8, 7, 2, 9],
         *         [2, 6, 9, 5, 1, 3]
         *     ]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.boxplot.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         low: 4,
         *         q1: 9,
         *         median: 9,
         *         q3: 1,
         *         high: 10,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 5,
         *         q1: 7,
         *         median: 3,
         *         q3: 6,
         *         high: 2,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.line.data
         * @excluding marker
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts
         * @apioption series.boxplot.data
         */

        /**
         * The `high` value for each data point, signifying the highest value
         * in the sample set. The top whisker is drawn here.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.boxplot.data.high
         */

        /**
         * The `low` value for each data point, signifying the lowest value
         * in the sample set. The bottom whisker is drawn here.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.boxplot.data.low
         */

        /**
         * The median for each data point. This is drawn as a line through the
         * middle area of the box.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.boxplot.data.median
         */

        /**
         * The lower quartile for each data point. This is the bottom of the
         * box.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.boxplot.data.q1
         */

        /**
         * The higher quartile for each data point. This is the top of the box.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.boxplot.data.q3
         */


    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var each = H.each,
            noop = H.noop,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**  
         * Error bars are a graphical representation of the variability of data and are
         * used on graphs to indicate the error, or uncertainty in a reported
         * measurement.
         *
         * @sample highcharts/demo/error-bar/ Error bars
         * @extends {plotOptions.boxplot}
         * @product highcharts highstock
         * @optionparent plotOptions.errorbar
         */
        seriesType('errorbar', 'boxplot', {


            grouping: false,

            /**
             * The parent series of the error bar. The default value links it to
             * the previous series. Otherwise, use the id of the parent series.
             * 
             * @type {String}
             * @default :previous
             * @since 3.0
             * @product highcharts
             */
            linkedTo: ':previous',

            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },

            /**
             * The line width of the whiskers, the horizontal lines marking low
             * and high values. When `null`, the general [lineWidth](#plotOptions.
             * errorbar.lineWidth) applies.
             * 
             * @type {Number}
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/ Error bar styling
             * @default null
             * @since 3.0
             * @product highcharts
             */
            whiskerWidth: null

            // Prototype members
        }, {
            type: 'errorbar',
            pointArrayMap: ['low', 'high'], // array point configs are mapped to this
            toYData: function(point) { // return a plain array for speedy calculation
                return [point.low, point.high];
            },
            pointValKey: 'high', // defines the top of the tracker
            doQuartiles: false,
            drawDataLabels: seriesTypes.arearange ? function() {
                var valKey = this.pointValKey;
                seriesTypes.arearange.prototype.drawDataLabels.call(this);
                // Arearange drawDataLabels does not reset point.y to high, but to low after drawing. #4133 
                each(this.data, function(point) {
                    point.y = point[valKey];
                });
            } : noop,

            /**
             * Get the width and X offset, either on top of the linked series column
             * or standalone
             */
            getColumnMetrics: function() {
                return (this.linkedParent && this.linkedParent.columnMetrics) ||
                    seriesTypes.column.prototype.getColumnMetrics.call(this);
            }
        });

        /**
         * A `errorbar` series. If the [type](#series.errorbar.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         * 
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * errorbar](#plotOptions.errorbar).
         * 
         * @type {Object}
         * @extends series,plotOptions.errorbar
         * @excluding dataParser,dataURL,stack
         * @product highcharts
         * @apioption series.errorbar
         */

        /**
         * An array of data points for the series. For the `errorbar` series
         * type, points can be given in the following ways:
         * 
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `x,low,high`. If the first value is a string, it is
         * applied as the name of the point, and the `x` value is inferred.
         * The `x` value can also be omitted, in which case the inner arrays
         * should be of length 2\. Then the `x` value is automatically calculated,
         * either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options.
         * 
         *  ```js
         *     data: [
         *         [0, 10, 2],
         *         [1, 1, 8],
         *         [2, 4, 5]
         *     ]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.errorbar.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         low: 0,
         *         high: 0,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 5,
         *         high: 5,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.arearange.data
         * @excluding dataLabels,drilldown,marker
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts
         * @apioption series.errorbar.data
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var correctFloat = H.correctFloat,
            isNumber = H.isNumber,
            pick = H.pick,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * A waterfall chart displays sequentially introduced positive or negative
         * values in cumulative columns.
         *
         * @sample highcharts/demo/waterfall/ Waterfall chart
         * @extends {plotOptions.column}
         * @product highcharts
         * @optionparent plotOptions.waterfall
         */
        seriesType('waterfall', 'column', {

            dataLabels: {
                inside: true
            },


            /**
             * The color used specifically for positive point columns. When not
             * specified, the general series color is used.
             * 
             * In styled mode, the waterfall colors can be set with the
             * `.highcharts-point-negative`, `.highcharts-sum` and
             * `.highcharts-intermediate-sum` classes.
             * 
             * @type {Color}
             * @sample {highcharts} highcharts/demo/waterfall/ Waterfall
             * @product highcharts
             * @apioption plotOptions.waterfall.upColor
             */

            // Prototype members
        }, {
            pointValKey: 'y',

            /**
             * Translate data points from raw values
             */
            translate: function() {
                var series = this,
                    options = series.options,
                    yAxis = series.yAxis,
                    len,
                    i,
                    points,
                    point,
                    shapeArgs,
                    stack,
                    y,
                    yValue,
                    previousY,
                    previousIntermediate,
                    range,
                    minPointLength = pick(options.minPointLength, 5),
                    halfMinPointLength = minPointLength / 2,
                    threshold = options.threshold,
                    stacking = options.stacking,
                    stackIndicator,
                    tooltipY;

                // run column series translate
                seriesTypes.column.prototype.translate.apply(series);

                previousY = previousIntermediate = threshold;
                points = series.points;

                for (i = 0, len = points.length; i < len; i++) {
                    // cache current point object
                    point = points[i];
                    yValue = series.processedYData[i];
                    shapeArgs = point.shapeArgs;

                    // get current stack
                    stack = stacking && yAxis.stacks[(series.negStacks && yValue < threshold ? '-' : '') + series.stackKey];
                    stackIndicator = series.getStackIndicator(
                        stackIndicator,
                        point.x,
                        series.index
                    );
                    range = stack ?
                        stack[point.x].points[stackIndicator.key] : [0, yValue];

                    // override point value for sums
                    // #3710 Update point does not propagate to sum
                    if (point.isSum) {
                        point.y = correctFloat(yValue);
                    } else if (point.isIntermediateSum) {
                        point.y = correctFloat(yValue - previousIntermediate); // #3840
                    }
                    // up points
                    y = Math.max(previousY, previousY + point.y) + range[0];
                    shapeArgs.y = yAxis.translate(y, 0, 1, 0, 1);

                    // sum points
                    if (point.isSum) {
                        shapeArgs.y = yAxis.translate(range[1], 0, 1, 0, 1);
                        shapeArgs.height = Math.min(yAxis.translate(range[0], 0, 1, 0, 1), yAxis.len) -
                            shapeArgs.y; // #4256

                    } else if (point.isIntermediateSum) {
                        shapeArgs.y = yAxis.translate(range[1], 0, 1, 0, 1);
                        shapeArgs.height = Math.min(yAxis.translate(previousIntermediate, 0, 1, 0, 1), yAxis.len) -
                            shapeArgs.y;
                        previousIntermediate = range[1];

                        // If it's not the sum point, update previous stack end position and get
                        // shape height (#3886)
                    } else {
                        shapeArgs.height = yValue > 0 ?
                            yAxis.translate(previousY, 0, 1, 0, 1) - shapeArgs.y :
                            yAxis.translate(previousY, 0, 1, 0, 1) - yAxis.translate(previousY - yValue, 0, 1, 0, 1);

                        previousY += stack && stack[point.x] ? stack[point.x].total : yValue;
                    }

                    // #3952 Negative sum or intermediate sum not rendered correctly
                    if (shapeArgs.height < 0) {
                        shapeArgs.y += shapeArgs.height;
                        shapeArgs.height *= -1;
                    }

                    point.plotY = shapeArgs.y = Math.round(shapeArgs.y) - (series.borderWidth % 2) / 2;
                    shapeArgs.height = Math.max(Math.round(shapeArgs.height), 0.001); // #3151
                    point.yBottom = shapeArgs.y + shapeArgs.height;

                    if (shapeArgs.height <= minPointLength && !point.isNull) {
                        shapeArgs.height = minPointLength;
                        shapeArgs.y -= halfMinPointLength;
                        point.plotY = shapeArgs.y;
                        if (point.y < 0) {
                            point.minPointLengthOffset = -halfMinPointLength;
                        } else {
                            point.minPointLengthOffset = halfMinPointLength;
                        }
                    } else {
                        point.minPointLengthOffset = 0;
                    }

                    // Correct tooltip placement (#3014)
                    tooltipY = point.plotY + (point.negative ? shapeArgs.height : 0);

                    if (series.chart.inverted) {
                        point.tooltipPos[0] = yAxis.len - tooltipY;
                    } else {
                        point.tooltipPos[1] = tooltipY;
                    }
                }
            },

            /**
             * Call default processData then override yData to reflect waterfall's extremes on yAxis
             */
            processData: function(force) {
                var series = this,
                    options = series.options,
                    yData = series.yData,
                    points = series.options.data, // #3710 Update point does not propagate to sum
                    point,
                    dataLength = yData.length,
                    threshold = options.threshold || 0,
                    subSum,
                    sum,
                    dataMin,
                    dataMax,
                    y,
                    i;

                sum = subSum = dataMin = dataMax = threshold;

                for (i = 0; i < dataLength; i++) {
                    y = yData[i];
                    point = points && points[i] ? points[i] : {};

                    if (y === 'sum' || point.isSum) {
                        yData[i] = correctFloat(sum);
                    } else if (y === 'intermediateSum' || point.isIntermediateSum) {
                        yData[i] = correctFloat(subSum);
                    } else {
                        sum += y;
                        subSum += y;
                    }
                    dataMin = Math.min(sum, dataMin);
                    dataMax = Math.max(sum, dataMax);
                }

                Series.prototype.processData.call(this, force);

                // Record extremes only if stacking was not set:
                if (!series.options.stacking) {
                    series.dataMin = dataMin;
                    series.dataMax = dataMax;
                }
            },

            /**
             * Return y value or string if point is sum
             */
            toYData: function(pt) {
                if (pt.isSum) {
                    return (pt.x === 0 ? null : 'sum'); // #3245 Error when first element is Sum or Intermediate Sum
                }
                if (pt.isIntermediateSum) {
                    return (pt.x === 0 ? null : 'intermediateSum'); // #3245
                }
                return pt.y;
            },



            /**
             * Return an empty path initially, because we need to know the stroke-width in order 
             * to set the final path.
             */
            getGraphPath: function() {
                return ['M', 0, 0];
            },

            /**
             * Draw columns' connector lines
             */
            getCrispPath: function() {

                var data = this.data,
                    length = data.length,
                    lineWidth = this.graph.strokeWidth() + this.borderWidth,
                    normalizer = Math.round(lineWidth) % 2 / 2,
                    reversedYAxis = this.yAxis.reversed,
                    path = [],
                    prevArgs,
                    pointArgs,
                    i,
                    d;

                for (i = 1; i < length; i++) {
                    pointArgs = data[i].shapeArgs;
                    prevArgs = data[i - 1].shapeArgs;

                    d = [
                        'M',
                        prevArgs.x + prevArgs.width,
                        prevArgs.y + data[i - 1].minPointLengthOffset + normalizer,
                        'L',
                        pointArgs.x,
                        prevArgs.y + data[i - 1].minPointLengthOffset + normalizer
                    ];

                    if (
                        (data[i - 1].y < 0 && !reversedYAxis) ||
                        (data[i - 1].y > 0 && reversedYAxis)
                    ) {
                        d[2] += prevArgs.height;
                        d[5] += prevArgs.height;
                    }

                    path = path.concat(d);
                }

                return path;
            },

            /**
             * The graph is initally drawn with an empty definition, then updated with
             * crisp rendering.
             */
            drawGraph: function() {
                Series.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                });
            },

            /**
             * Waterfall has stacking along the x-values too.
             */
            setStackedPoints: function() {
                var series = this,
                    options = series.options,
                    stackedYLength,
                    i;

                Series.prototype.setStackedPoints.apply(series, arguments);

                stackedYLength = series.stackedYData ? series.stackedYData.length : 0;

                // Start from the second point:
                for (i = 1; i < stackedYLength; i++) {
                    if (!options.data[i].isSum &&
                        !options.data[i].isIntermediateSum
                    ) {
                        // Sum previous stacked data as waterfall can grow up/down:
                        series.stackedYData[i] += series.stackedYData[i - 1];
                    }
                }
            },

            /**
             * Extremes for a non-stacked series are recorded in processData.
             * In case of stacking, use Series.stackedYData to calculate extremes.
             */
            getExtremes: function() {
                if (this.options.stacking) {
                    return Series.prototype.getExtremes.apply(this, arguments);
                }
            }


            // Point members
        }, {
            getClassName: function() {
                var className = Point.prototype.getClassName.call(this);

                if (this.isSum) {
                    className += ' highcharts-sum';
                } else if (this.isIntermediateSum) {
                    className += ' highcharts-intermediate-sum';
                }
                return className;
            },
            /**
             * Pass the null test in ColumnSeries.translate.
             */
            isValid: function() {
                return isNumber(this.y, true) || this.isSum || this.isIntermediateSum;
            }

        });

        /**
         * A `waterfall` series. If the [type](#series.waterfall.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         * 
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * waterfall](#plotOptions.waterfall).
         * 
         * @type {Object}
         * @extends series,plotOptions.waterfall
         * @excluding dataParser,dataURL
         * @product highcharts
         * @apioption series.waterfall
         */

        /**
         * An array of data points for the series. For the `waterfall` series
         * type, points can be given in the following ways:
         * 
         * 1.  An array of numerical values. In this case, the numerical values
         * will be interpreted as `y` options. The `x` values will be automatically
         * calculated, either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options. If the axis has
         * categories, these will be used. Example:
         * 
         *  ```js
         *  data: [0, 5, 3, 5]
         *  ```
         * 
         * 2.  An array of arrays with 2 values. In this case, the values correspond
         * to `x,y`. If the first value is a string, it is applied as the name
         * of the point, and the `x` value is inferred.
         * 
         *  ```js
         *     data: [
         *         [0, 7],
         *         [1, 8],
         *         [2, 3]
         *     ]
         *  ```
         * 
         * 3.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.waterfall.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         y: 8,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         y: 8,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array|Number>}
         * @extends series.line.data
         * @excluding marker
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts
         * @apioption series.waterfall.data
         */


        /**
         * When this property is true, the points acts as a summary column for
         * the values added or substracted since the last intermediate sum,
         * or since the start of the series. The `y` value is ignored.
         * 
         * @type {Boolean}
         * @sample {highcharts} highcharts/demo/waterfall/ Waterfall
         * @default false
         * @product highcharts
         * @apioption series.waterfall.data.isIntermediateSum
         */

        /**
         * When this property is true, the point display the total sum across
         * the entire series. The `y` value is ignored.
         * 
         * @type {Boolean}
         * @sample {highcharts} highcharts/demo/waterfall/ Waterfall
         * @default false
         * @product highcharts
         * @apioption series.waterfall.data.isSum
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var LegendSymbolMixin = H.LegendSymbolMixin,
            noop = H.noop,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * A polygon series can be used to draw any freeform shape in the cartesian
         * coordinate system. A fill is applied with the `color` option, and
         * stroke is applied through `lineWidth` and `lineColor` options. Requires
         * the `highcharts-more.js` file.
         * 
         * @type {Object}
         * @extends plotOptions.scatter
         * @excluding softThreshold,threshold
         * @sample {highcharts} highcharts/demo/polygon/ Polygon
         * @sample {highstock} highcharts/demo/polygon/ Polygon
         * @since 4.1.0
         * @product highcharts highstock
         * @optionparent plotOptions.polygon
         */
        seriesType('polygon', 'scatter', {
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            stickyTracking: false,
            tooltip: {
                followPointer: true,
                pointFormat: ''
            },
            trackByArea: true

            // Prototype members
        }, {
            type: 'polygon',
            getGraphPath: function() {

                var graphPath = Series.prototype.getGraphPath.call(this),
                    i = graphPath.length + 1;

                // Close all segments
                while (i--) {
                    if ((i === graphPath.length || graphPath[i] === 'M') && i > 0) {
                        graphPath.splice(i, 0, 'z');
                    }
                }
                this.areaPath = graphPath;
                return graphPath;
            },
            drawGraph: function() {

                seriesTypes.area.prototype.drawGraph.call(this);
            },
            drawLegendSymbol: LegendSymbolMixin.drawRectangle,
            drawTracker: Series.prototype.drawTracker,
            setStackedPoints: noop // No stacking points on polygons (#5310)
        });



        /**
         * A `polygon` series. If the [type](#series.polygon.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * polygon](#plotOptions.polygon).
         * 
         * @type {Object}
         * @extends series,plotOptions.polygon
         * @excluding dataParser,dataURL,stack
         * @product highcharts highstock
         * @apioption series.polygon
         */

        /**
         * An array of data points for the series. For the `polygon` series
         * type, points can be given in the following ways:
         * 
         * 1.  An array of numerical values. In this case, the numerical values
         * will be interpreted as `y` options. The `x` values will be automatically
         * calculated, either starting at 0 and incremented by 1, or from `pointStart`
         * and `pointInterval` given in the series options. If the axis has
         * categories, these will be used. Example:
         * 
         *  ```js
         *  data: [0, 5, 3, 5]
         *  ```
         * 
         * 2.  An array of arrays with 2 values. In this case, the values correspond
         * to `x,y`. If the first value is a string, it is applied as the name
         * of the point, and the `x` value is inferred.
         * 
         *  ```js
         *     data: [
         *         [0, 10],
         *         [1, 3],
         *         [2, 1]
         *     ]
         *  ```
         * 
         * 3.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.polygon.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         y: 1,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         y: 8,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.line.data
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts highstock
         * @apioption series.polygon.data
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            Axis = H.Axis,
            color = H.color,
            each = H.each,
            isNumber = H.isNumber,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;


        /**
         * A bubble series is a three dimensional series type where each point renders
         * an X, Y and Z value. Each points is drawn as a bubble where the position
         * along the X and Y axes mark the X and Y values, and the size of the bubble
         * relates to the Z value. Requires `highcharts-more.js`.
         *
         * @sample {highcharts} highcharts/demo/bubble/ Bubble chart
         * @extends plotOptions.scatter
         * @product highcharts highstock
         * @optionparent plotOptions.bubble
         */
        seriesType('bubble', 'scatter', {

            dataLabels: {
                formatter: function() { // #2945
                    return this.point.z;
                },
                inside: true,
                verticalAlign: 'middle'
            },

            /**
             * Whether to display negative sized bubbles. The threshold is given
             * by the [zThreshold](#plotOptions.bubble.zThreshold) option, and negative
             * bubbles can be visualized by setting [negativeColor](#plotOptions.
             * bubble.negativeColor).
             * 
             * @type {Boolean}
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             * @default true
             * @since 3.0
             * @product highcharts
             * @apioption plotOptions.bubble.displayNegative
             */

            /**
             * Options for the point markers of line-like series. Properties like
             * `fillColor`, `lineColor` and `lineWidth` define the visual appearance
             * of the markers. Other series types, like column series, don't have
             * markers, but have visual options on the series level instead.
             * 
             * In styled mode, the markers can be styled with the `.highcharts-point`, `.highcharts-point-hover` and `.highcharts-point-select`
             * class names.
             * 
             * @type {Object}
             * @extends plotOptions.series.marker
             * @excluding enabled,height,radius,width
             * @product highcharts
             */
            marker: {

                /**
                 * In bubble charts, the radius is overridden and determined based on 
                 * the point's data value.
                 */
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },

                /**
                 * A predefined shape or symbol for the marker. Possible values are
                 * "circle", "square", "diamond", "triangle" and "triangle-down".
                 * 
                 * Additionally, the URL to a graphic can be given on the form
                 * `url(graphic.png)`. Note that for the image to be applied to exported
                 * charts, its URL needs to be accessible by the export server.
                 * 
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 * 
                 * @validvalue ["circle", "square", "diamond", "triangle", "triangle-down"]
                 * @type {String}
                 * @sample {highcharts} highcharts/plotoptions/bubble-symbol/
                 *         Bubble chart with various symbols
                 * @sample {highcharts} highcharts/plotoptions/series-marker-symbol/
                 *         General chart with predefined, graphic and custom markers
                 * @default circle
                 * @since 5.0.11
                 * @product highcharts
                 */
                symbol: 'circle'
            },

            /**
             * Minimum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             * 
             * @type {String}
             * @sample {highcharts} highcharts/plotoptions/bubble-size/ Bubble size
             * @default 8
             * @since 3.0
             * @product highcharts
             */
            minSize: 8,

            /**
             * Maximum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             * 
             * @type {String}
             * @sample {highcharts} highcharts/plotoptions/bubble-size/ Bubble size
             * @default 20%
             * @since 3.0
             * @product highcharts
             */
            maxSize: '20%',

            /**
             * When a point's Z value is below the [zThreshold](#plotOptions.bubble.
             * zThreshold) setting, this color is used.
             * 
             * @type {Color}
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             * @default null
             * @since 3.0
             * @product highcharts
             * @apioption plotOptions.bubble.negativeColor
             */

            /**
             * Whether the bubble's value should be represented by the area or the
             * width of the bubble. The default, `area`, corresponds best to the
             * human perception of the size of each bubble.
             * 
             * @validvalue ["area", "width"]
             * @type {String}
             * @sample {highcharts} highcharts/plotoptions/bubble-sizeby/
             *         Comparison of area and size
             * @default area
             * @since 3.0.7
             * @product highcharts
             * @apioption plotOptions.bubble.sizeBy
             */

            /**
             * When this is true, the absolute value of z determines the size of
             * the bubble. This means that with the default `zThreshold` of 0, a
             * bubble of value -1 will have the same size as a bubble of value 1,
             * while a bubble of value 0 will have a smaller size according to
             * `minSize`.
             * 
             * @type {Boolean}
             * @sample {highcharts} highcharts/plotoptions/bubble-sizebyabsolutevalue/
             *         Size by absolute value, various thresholds
             * @default false
             * @since 4.1.9
             * @product highcharts
             * @apioption plotOptions.bubble.sizeByAbsoluteValue
             */

            /**
             * When this is true, the series will not cause the Y axis to cross
             * the zero plane (or [threshold](#plotOptions.series.threshold) option)
             * unless the data actually crosses the plane.
             * 
             * For example, if `softThreshold` is `false`, a series of 0, 1, 2,
             * 3 will make the Y axis show negative values according to the `minPadding`
             * option. If `softThreshold` is `true`, the Y axis starts at 0.
             * 
             * @type {Boolean}
             * @default false
             * @since 4.1.9
             * @product highcharts
             */
            softThreshold: false,

            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },

            tooltip: {
                pointFormat: '({point.x}, {point.y}), Size: {point.z}'
            },

            turboThreshold: 0,

            /**
             * When [displayNegative](#plotOptions.bubble.displayNegative) is `false`,
             * bubbles with lower Z values are skipped. When `displayNegative`
             * is `true` and a [negativeColor](#plotOptions.bubble.negativeColor)
             * is given, points with lower Z is colored.
             * 
             * @type {Number}
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             * @default 0
             * @since 3.0
             * @product highcharts
             */
            zThreshold: 0,

            zoneAxis: 'z'

            /**
             * The minimum for the Z value range. Defaults to the highest Z value
             * in the data.
             * 
             * @type {Number}
             * @see [zMax](#plotOptions.bubble.zMin)
             * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             * @default null
             * @since 4.0.3
             * @product highcharts
             * @apioption plotOptions.bubble.zMax
             */

            /**
             * The minimum for the Z value range. Defaults to the lowest Z value
             * in the data.
             * 
             * @type {Number}
             * @see [zMax](#plotOptions.bubble.zMax)
             * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             * @default null
             * @since 4.0.3
             * @product highcharts
             * @apioption plotOptions.bubble.zMin
             */

            // Prototype members
        }, {
            pointArrayMap: ['y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['group', 'dataLabelsGroup'],
            specialGroup: 'group', // To allow clipping (#6296)
            bubblePadding: true,
            zoneAxis: 'z',
            directTouch: true,



            /**
             * Get the radius for each point based on the minSize, maxSize and each point's Z value. This
             * must be done prior to Series.translate because the axis needs to add padding in
             * accordance with the point sizes.
             */
            getRadii: function(zMin, zMax, minSize, maxSize) {
                var len,
                    i,
                    pos,
                    zData = this.zData,
                    radii = [],
                    options = this.options,
                    sizeByArea = options.sizeBy !== 'width',
                    zThreshold = options.zThreshold,
                    zRange = zMax - zMin,
                    value,
                    radius;

                // Set the shape type and arguments to be picked up in drawPoints
                for (i = 0, len = zData.length; i < len; i++) {

                    value = zData[i];

                    // When sizing by threshold, the absolute value of z determines the size
                    // of the bubble.
                    if (options.sizeByAbsoluteValue && value !== null) {
                        value = Math.abs(value - zThreshold);
                        zMax = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                        zMin = 0;
                    }

                    if (value === null) {
                        radius = null;
                        // Issue #4419 - if value is less than zMin, push a radius that's always smaller than the minimum size
                    } else if (value < zMin) {
                        radius = minSize / 2 - 1;
                    } else {
                        // Relative size, a number between 0 and 1
                        pos = zRange > 0 ? (value - zMin) / zRange : 0.5;

                        if (sizeByArea && pos >= 0) {
                            pos = Math.sqrt(pos);
                        }
                        radius = Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
                    }
                    radii.push(radius);
                }
                this.radii = radii;
            },

            /**
             * Perform animation on the bubbles
             */
            animate: function(init) {
                var animation = this.options.animation;

                if (!init) { // run the animation
                    each(this.points, function(point) {
                        var graphic = point.graphic,
                            animationTarget;

                        if (graphic && graphic.width) { // URL symbols don't have width
                            animationTarget = {
                                x: graphic.x,
                                y: graphic.y,
                                width: graphic.width,
                                height: graphic.height
                            };

                            // Start values
                            graphic.attr({
                                x: point.plotX,
                                y: point.plotY,
                                width: 1,
                                height: 1
                            });

                            // Run animation
                            graphic.animate(animationTarget, animation);
                        }
                    });

                    // delete this function to allow it only once
                    this.animate = null;
                }
            },

            /**
             * Extend the base translate method to handle bubble size
             */
            translate: function() {

                var i,
                    data = this.data,
                    point,
                    radius,
                    radii = this.radii;

                // Run the parent method
                seriesTypes.scatter.prototype.translate.call(this);

                // Set the shape type and arguments to be picked up in drawPoints
                i = data.length;

                while (i--) {
                    point = data[i];
                    radius = radii ? radii[i] : 0; // #1737

                    if (isNumber(radius) && radius >= this.minPxSize / 2) {
                        // Shape arguments
                        point.marker = H.extend(point.marker, {
                            radius: radius,
                            width: 2 * radius,
                            height: 2 * radius
                        });

                        // Alignment box for the data label
                        point.dlBox = {
                            x: point.plotX - radius,
                            y: point.plotY - radius,
                            width: 2 * radius,
                            height: 2 * radius
                        };
                    } else { // below zThreshold
                        point.shapeArgs = point.plotY = point.dlBox = undefined; // #1691
                    }
                }
            },

            alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
            buildKDTree: noop,
            applyZones: noop

            // Point class
        }, {
            haloPath: function(size) {
                return Point.prototype.haloPath.call(
                    this,
                    size === 0 ? 0 : (this.marker ? this.marker.radius || 0 : 0) + size // #6067
                );
            },
            ttBelow: false
        });

        /**
         * Add logic to pad each axis with the amount of pixels
         * necessary to avoid the bubbles to overflow.
         */
        Axis.prototype.beforePadding = function() {
            var axis = this,
                axisLength = this.len,
                chart = this.chart,
                pxMin = 0,
                pxMax = axisLength,
                isXAxis = this.isXAxis,
                dataKey = isXAxis ? 'xData' : 'yData',
                min = this.min,
                extremes = {},
                smallestSize = Math.min(chart.plotWidth, chart.plotHeight),
                zMin = Number.MAX_VALUE,
                zMax = -Number.MAX_VALUE,
                range = this.max - min,
                transA = axisLength / range,
                activeSeries = [];

            // Handle padding on the second pass, or on redraw
            each(this.series, function(series) {

                var seriesOptions = series.options,
                    zData;

                if (series.bubblePadding && (series.visible || !chart.options.chart.ignoreHiddenSeries)) {

                    // Correction for #1673
                    axis.allowZoomOutside = true;

                    // Cache it
                    activeSeries.push(series);

                    if (isXAxis) { // because X axis is evaluated first

                        // For each series, translate the size extremes to pixel values
                        each(['minSize', 'maxSize'], function(prop) {
                            var length = seriesOptions[prop],
                                isPercent = /%$/.test(length);

                            length = pInt(length);
                            extremes[prop] = isPercent ?
                                smallestSize * length / 100 :
                                length;

                        });
                        series.minPxSize = extremes.minSize;
                        // Prioritize min size if conflict to make sure bubbles are
                        // always visible. #5873
                        series.maxPxSize = Math.max(extremes.maxSize, extremes.minSize);

                        // Find the min and max Z
                        zData = series.zData;
                        if (zData.length) { // #1735
                            zMin = pick(seriesOptions.zMin, Math.min(
                                zMin,
                                Math.max(
                                    arrayMin(zData),
                                    seriesOptions.displayNegative === false ? seriesOptions.zThreshold : -Number.MAX_VALUE
                                )
                            ));
                            zMax = pick(seriesOptions.zMax, Math.max(zMax, arrayMax(zData)));
                        }
                    }
                }
            });

            each(activeSeries, function(series) {

                var data = series[dataKey],
                    i = data.length,
                    radius;

                if (isXAxis) {
                    series.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
                }

                if (range > 0) {
                    while (i--) {
                        if (isNumber(data[i]) && axis.dataMin <= data[i] && data[i] <= axis.dataMax) {
                            radius = series.radii[i];
                            pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                            pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                        }
                    }
                }
            });

            if (activeSeries.length && range > 0 && !this.isLog) {
                pxMax -= axisLength;
                transA *= (axisLength + pxMin - pxMax) / axisLength;
                each([
                    ['min', 'userMin', pxMin],
                    ['max', 'userMax', pxMax]
                ], function(keys) {
                    if (pick(axis.options[keys[0]], axis[keys[1]]) === undefined) {
                        axis[keys[0]] += keys[2] / transA;
                    }
                });
            }
        };


        /**
         * A `bubble` series. If the [type](#series.bubble.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         * 
         * For options that apply to multiple series, it is recommended to add
         * them to the [plotOptions.series](#plotOptions.series) options structure.
         * To apply to all series of this specific type, apply it to [plotOptions.
         * bubble](#plotOptions.bubble).
         * 
         * @type {Object}
         * @extends series,plotOptions.bubble
         * @excluding dataParser,dataURL,stack
         * @product highcharts
         * @apioption series.bubble
         */

        /**
         * An array of data points for the series. For the `bubble` series type,
         * points can be given in the following ways:
         * 
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `x,y,z`. If the first value is a string, it is applied
         * as the name of the point, and the `x` value is inferred. The `x`
         * value can also be omitted, in which case the inner arrays should
         * be of length 2\. Then the `x` value is automatically calculated,
         * either starting at 0 and incremented by 1, or from `pointStart` and
         * `pointInterval` given in the series options.
         * 
         *  ```js
         *     data: [
         *         [0, 1, 2],
         *         [1, 5, 5],
         *         [2, 0, 2]
         *     ]
         *  ```
         * 
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.bubble.turboThreshold),
         * this option is not available.
         * 
         *  ```js
         *     data: [{
         *         x: 1,
         *         y: 1,
         *         z: 1,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         y: 5,
         *         z: 4,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         * 
         * @type {Array<Object|Array>}
         * @extends series.line.data
         * @excluding marker
         * @sample {highcharts} highcharts/chart/reflow-true/ Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/ Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/ Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/ Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/ Config objects
         * @product highcharts
         * @apioption series.bubble.data
         */

        /**
         * The size value for each bubble. The bubbles' diameters are computed
         * based on the `z`, and controlled by series options like `minSize`,
         *  `maxSize`, `sizeBy`, `zMin` and `zMax`.
         * 
         * @type {Number}
         * @product highcharts
         * @apioption series.bubble.data.z
         */

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */

        /**
         * Extensions for polar charts. Additionally, much of the geometry required for polar charts is
         * gathered in RadialAxes.js.
         *
         */

        var each = H.each,
            pick = H.pick,
            Pointer = H.Pointer,
            Series = H.Series,
            seriesTypes = H.seriesTypes,
            wrap = H.wrap,

            seriesProto = Series.prototype,
            pointerProto = Pointer.prototype,
            colProto;

        /**
         * Search a k-d tree by the point angle, used for shared tooltips in polar charts
         */
        seriesProto.searchPointByAngle = function(e) {
            var series = this,
                chart = series.chart,
                xAxis = series.xAxis,
                center = xAxis.pane.center,
                plotX = e.chartX - center[0] - chart.plotLeft,
                plotY = e.chartY - center[1] - chart.plotTop;

            return this.searchKDTree({
                clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))
            });

        };

        /**
         * #6212 Calculate connectors for spline series in polar chart. 
         * @param {Boolean} calculateNeighbours - Check if connectors should be calculated for neighbour points as well
         * allows short recurence
         */
        seriesProto.getConnectors = function(segment, index, calculateNeighbours, connectEnds) {

            var i,
                prevPointInd,
                nextPointInd,
                previousPoint,
                nextPoint,
                previousX,
                previousY,
                nextX,
                nextY,
                plotX,
                plotY,
                ret,
                smoothing = 1.5, // 1 means control points midway between points, 2 means 1/3 from the point, 3 is 1/4 etc;
                denom = smoothing + 1,
                leftContX,
                leftContY,
                rightContX,
                rightContY,
                dLControlPoint, // distance left control point
                dRControlPoint,
                leftContAngle,
                rightContAngle,
                jointAngle,
                addedNumber = connectEnds ? 1 : 0;

            /** calculate final index of points depending on the initial index value.
             * Because of calculating neighbours, index may be outisde segment array.
             */
            if (index >= 0 && index <= segment.length - 1) {
                i = index;
            } else if (index < 0) {
                i = segment.length - 1 + index;
            } else {
                i = 0;
            }

            prevPointInd = (i - 1 < 0) ? segment.length - (1 + addedNumber) : i - 1;
            nextPointInd = (i + 1 > segment.length - 1) ? addedNumber : i + 1;
            previousPoint = segment[prevPointInd];
            nextPoint = segment[nextPointInd];
            previousX = previousPoint.plotX;
            previousY = previousPoint.plotY;
            nextX = nextPoint.plotX;
            nextY = nextPoint.plotY;
            plotX = segment[i].plotX; // actual point
            plotY = segment[i].plotY;
            leftContX = (smoothing * plotX + previousX) / denom;
            leftContY = (smoothing * plotY + previousY) / denom;
            rightContX = (smoothing * plotX + nextX) / denom;
            rightContY = (smoothing * plotY + nextY) / denom;
            dLControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2));
            dRControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2));
            leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX);
            rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
            jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);
            // Ensure the right direction, jointAngle should be in the same quadrant as leftContAngle
            if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
                jointAngle -= Math.PI;
            }
            // Find the corrected control points for a spline straight through the point
            leftContX = plotX + Math.cos(jointAngle) * dLControlPoint;
            leftContY = plotY + Math.sin(jointAngle) * dLControlPoint;
            rightContX = plotX + Math.cos(Math.PI + jointAngle) * dRControlPoint;
            rightContY = plotY + Math.sin(Math.PI + jointAngle) * dRControlPoint;

            // push current point's connectors into returned object

            ret = {
                rightContX: rightContX,
                rightContY: rightContY,
                leftContX: leftContX,
                leftContY: leftContY,
                plotX: plotX,
                plotY: plotY
            };

            // calculate connectors for previous and next point and push them inside returned object 
            if (calculateNeighbours) {
                ret.prevPointCont = this.getConnectors(segment, prevPointInd, false, connectEnds);
            }
            return ret;
        };

        /**
         * Wrap the buildKDTree function so that it searches by angle (clientX) in case of shared tooltip,
         * and by two dimensional distance in case of non-shared.
         */
        wrap(seriesProto, 'buildKDTree', function(proceed) {
            if (this.chart.polar) {
                if (this.kdByAngle) {
                    this.searchPoint = this.searchPointByAngle;
                } else {
                    this.options.findNearestPointBy = 'xy';
                }
            }
            proceed.apply(this);
        });

        /**
         * Translate a point's plotX and plotY from the internal angle and radius measures to
         * true plotX, plotY coordinates
         */
        seriesProto.toXY = function(point) {
            var xy,
                chart = this.chart,
                plotX = point.plotX,
                plotY = point.plotY,
                clientX;

            // Save rectangular plotX, plotY for later computation
            point.rectPlotX = plotX;
            point.rectPlotY = plotY;

            // Find the polar plotX and plotY
            xy = this.xAxis.postTranslate(point.plotX, this.yAxis.len - plotY);
            point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
            point.plotY = point.polarPlotY = xy.y - chart.plotTop;

            // If shared tooltip, record the angle in degrees in order to align X points. Otherwise,
            // use a standard k-d tree to get the nearest point in two dimensions.
            if (this.kdByAngle) {
                clientX = ((plotX / Math.PI * 180) + this.xAxis.pane.options.startAngle) % 360;
                if (clientX < 0) { // #2665
                    clientX += 360;
                }
                point.clientX = clientX;
            } else {
                point.clientX = point.plotX;
            }
        };

        if (seriesTypes.spline) {
            /**
             * Overridden method for calculating a spline from one point to the next
             */
            wrap(seriesTypes.spline.prototype, 'getPointSpline', function(proceed, segment, point, i) {
                var ret,
                    connectors;

                if (this.chart.polar) {
                    // moveTo or lineTo
                    if (!i) {
                        ret = ['M', point.plotX, point.plotY];
                    } else { // curve from last point to this
                        connectors = this.getConnectors(segment, i, true, this.connectEnds);
                        ret = [
                            'C',
                            connectors.prevPointCont.rightContX,
                            connectors.prevPointCont.rightContY,
                            connectors.leftContX,
                            connectors.leftContY,
                            connectors.plotX,
                            connectors.plotY
                        ];
                    }
                } else {
                    ret = proceed.call(this, segment, point, i);
                }
                return ret;
            });

            // #6430 Areasplinerange series use unwrapped getPointSpline method, so we need to set this method again.
            if (seriesTypes.areasplinerange) {
                seriesTypes.areasplinerange.prototype.getPointSpline = seriesTypes.spline.prototype.getPointSpline;
            }
        }

        /**
         * Extend translate. The plotX and plotY values are computed as if the polar chart were a
         * cartesian plane, where plotX denotes the angle in radians and (yAxis.len - plotY) is the pixel distance from
         * center.
         */
        wrap(seriesProto, 'translate', function(proceed) {
            var chart = this.chart,
                points,
                i;

            // Run uber method
            proceed.call(this);

            // Postprocess plot coordinates
            if (chart.polar) {
                this.kdByAngle = chart.tooltip && chart.tooltip.shared;

                if (!this.preventPostTranslate) {
                    points = this.points;
                    i = points.length;

                    while (i--) {
                        // Translate plotX, plotY from angle and radius to true plot coordinates
                        this.toXY(points[i]);
                    }
                }
            }
        });

        /**
         * Extend getSegmentPath to allow connecting ends across 0 to provide a closed circle in
         * line-like series.
         */
        wrap(seriesProto, 'getGraphPath', function(proceed, points) {
            var series = this,
                i,
                firstValid,
                popLastPoint;

            // Connect the path
            if (this.chart.polar) {
                points = points || this.points;

                // Append first valid point in order to connect the ends
                for (i = 0; i < points.length; i++) {
                    if (!points[i].isNull) {
                        firstValid = i;
                        break;
                    }
                }


                /**
                 * Polar charts only. Whether to connect the ends of a line series plot
                 * across the extremes.
                 * 
                 * @type {Boolean}
                 * @sample {highcharts} highcharts/plotoptions/line-connectends-false/
                 *         Do not connect
                 * @since 2.3.0
                 * @product highcharts
                 * @apioption plotOptions.series.connectEnds
                 */
                if (this.options.connectEnds !== false && firstValid !== undefined) {
                    this.connectEnds = true; // re-used in splines
                    points.splice(points.length, 0, points[firstValid]);
                    popLastPoint = true;
                }

                // For area charts, pseudo points are added to the graph, now we need to translate these
                each(points, function(point) {
                    if (point.polarPlotY === undefined) {
                        series.toXY(point);
                    }
                });
            }

            // Run uber method
            var ret = proceed.apply(this, [].slice.call(arguments, 1));

            /** #6212 points.splice method is adding points to an array. In case of areaspline getGraphPath method is used two times
             * and in both times points are added to an array. That is why points.pop is used, to get unmodified points.
             */
            if (popLastPoint) {
                points.pop();
            }
            return ret;
        });


        function polarAnimate(proceed, init) {
            var chart = this.chart,
                animation = this.options.animation,
                group = this.group,
                markerGroup = this.markerGroup,
                center = this.xAxis.center,
                plotLeft = chart.plotLeft,
                plotTop = chart.plotTop,
                attribs;

            // Specific animation for polar charts
            if (chart.polar) {

                // Enable animation on polar charts only in SVG. In VML, the scaling is different, plus animation
                // would be so slow it would't matter.
                if (chart.renderer.isSVG) {

                    if (animation === true) {
                        animation = {};
                    }

                    // Initialize the animation
                    if (init) {

                        // Scale down the group and place it in the center
                        attribs = {
                            translateX: center[0] + plotLeft,
                            translateY: center[1] + plotTop,
                            scaleX: 0.001, // #1499
                            scaleY: 0.001
                        };

                        group.attr(attribs);
                        if (markerGroup) {
                            markerGroup.attr(attribs);
                        }

                        // Run the animation
                    } else {
                        attribs = {
                            translateX: plotLeft,
                            translateY: plotTop,
                            scaleX: 1,
                            scaleY: 1
                        };
                        group.animate(attribs, animation);
                        if (markerGroup) {
                            markerGroup.animate(attribs, animation);
                        }

                        // Delete this function to allow it only once
                        this.animate = null;
                    }
                }

                // For non-polar charts, revert to the basic animation
            } else {
                proceed.call(this, init);
            }
        }

        // Define the animate method for regular series
        wrap(seriesProto, 'animate', polarAnimate);


        if (seriesTypes.column) {

            colProto = seriesTypes.column.prototype;

            colProto.polarArc = function(low, high, start, end) {
                var center = this.xAxis.center,
                    len = this.yAxis.len;

                return this.chart.renderer.symbols.arc(
                    center[0],
                    center[1],
                    len - high,
                    null, {
                        start: start,
                        end: end,
                        innerR: len - pick(low, len)
                    }
                );
            };

            /**
             * Define the animate method for columnseries
             */
            wrap(colProto, 'animate', polarAnimate);


            /**
             * Extend the column prototype's translate method
             */
            wrap(colProto, 'translate', function(proceed) {

                var xAxis = this.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    points,
                    point,
                    i;

                this.preventPostTranslate = true;

                // Run uber method
                proceed.call(this);

                // Postprocess plot coordinates
                if (xAxis.isRadial) {
                    points = this.points;
                    i = points.length;
                    while (i--) {
                        point = points[i];
                        start = point.barX + startAngleRad;
                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: this.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth)
                        };
                        // Provide correct plotX, plotY for tooltip
                        this.toXY(point);
                        point.tooltipPos = [point.plotX, point.plotY];
                        point.ttBelow = point.plotY > xAxis.center[1];
                    }
                }
            });


            /**
             * Align column data labels outside the columns. #1199.
             */
            wrap(colProto, 'alignDataLabel', function(proceed, point, dataLabel, options, alignTo, isNew) {

                if (this.chart.polar) {
                    var angle = point.rectPlotX / Math.PI * 180,
                        align,
                        verticalAlign;

                    // Align nicely outside the perimeter of the columns
                    if (options.align === null) {
                        if (angle > 20 && angle < 160) {
                            align = 'left'; // right hemisphere
                        } else if (angle > 200 && angle < 340) {
                            align = 'right'; // left hemisphere
                        } else {
                            align = 'center'; // top or bottom
                        }
                        options.align = align;
                    }
                    if (options.verticalAlign === null) {
                        if (angle < 45 || angle > 315) {
                            verticalAlign = 'bottom'; // top part
                        } else if (angle > 135 && angle < 225) {
                            verticalAlign = 'top'; // bottom part
                        } else {
                            verticalAlign = 'middle'; // left or right
                        }
                        options.verticalAlign = verticalAlign;
                    }

                    seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
                } else {
                    proceed.call(this, point, dataLabel, options, alignTo, isNew);
                }

            });
        }

        /**
         * Extend getCoordinates to prepare for polar axis values
         */
        wrap(pointerProto, 'getCoordinates', function(proceed, e) {
            var chart = this.chart,
                ret = {
                    xAxis: [],
                    yAxis: []
                };

            if (chart.polar) {

                each(chart.axes, function(axis) {
                    var isXAxis = axis.isXAxis,
                        center = axis.center,
                        x = e.chartX - center[0] - chart.plotLeft,
                        y = e.chartY - center[1] - chart.plotTop;

                    ret[isXAxis ? 'xAxis' : 'yAxis'].push({
                        axis: axis,
                        value: axis.translate(
                            isXAxis ?
                            Math.PI - Math.atan2(x, y) : // angle
                            Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), // distance from center
                            true
                        )
                    });
                });

            } else {
                ret = proceed.call(this, e);
            }

            return ret;
        });

        wrap(H.Chart.prototype, 'getAxes', function(proceed) {

            if (!this.pane) {
                this.pane = [];
            }
            each(H.splat(this.options.pane), function(paneOptions) {
                new H.Pane( // eslint-disable-line no-new
                    paneOptions,
                    this
                );
            }, this);

            proceed.call(this);
        });

        wrap(H.Chart.prototype, 'drawChartBox', function(proceed) {
            proceed.call(this);

            each(this.pane, function(pane) {
                pane.render();
            });
        });

        /**
         * Extend chart.get to also search in panes. Used internally in responsiveness
         * and chart.update.
         */
        wrap(H.Chart.prototype, 'get', function(proceed, id) {
            return H.find(this.pane, function(pane) {
                return pane.options.id === id;
            }) || proceed.call(this, id);
        });

    }(Highcharts));
}));
