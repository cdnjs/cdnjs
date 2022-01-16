/**
 * @license Highcharts JS v9.3.2 (2021-11-29)
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/highcharts-more', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/Pane.js', [_modules['Core/Chart/Chart.js'], _modules['Series/CenteredUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Pointer.js'], _modules['Core/Utilities.js']], function (Chart, CU, H, Pointer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            extend = U.extend,
            merge = U.merge,
            pick = U.pick,
            splat = U.splat;
        /**
         * @typedef {"arc"|"circle"|"solid"} Highcharts.PaneBackgroundShapeValue
         */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        Chart.prototype.collectionsWithUpdate.push('pane');
        /**
         * The Pane object allows options that are common to a set of X and Y axes.
         *
         * In the future, this can be extended to basic Highcharts and Highcharts Stock.
         *
         * @private
         * @class
         * @name Highcharts.Pane
         * @param {Highcharts.PaneOptions} options
         * @param {Highcharts.Chart} chart
         */
        var Pane = /** @class */ (function () {
                function Pane(options, chart) {
                    this.background = void 0;
                this.center = void 0;
                this.chart = void 0;
                this.options = void 0;
                this.coll = 'pane'; // Member of chart.pane
                /**
                 * The pane serves as a container for axes and backgrounds for circular
                 * gauges and polar charts.
                 *
                 * @since        2.3.0
                 * @product      highcharts
                 * @requires     highcharts-more
                 * @optionparent pane
                 */
                this.defaultOptions = {
                    /**
                     * The end angle of the polar X axis or gauge value axis, given in
                     * degrees where 0 is north. Defaults to [startAngle](#pane.startAngle)
                     * + 360.
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         VU-meter with custom start and end angle
                     *
                     * @type      {number}
                     * @since     2.3.0
                     * @product   highcharts
                     * @apioption pane.endAngle
                     */
                    /**
                     * The center of a polar chart or angular gauge, given as an array
                     * of [x, y] positions. Positions can be given as integers that
                     * transform to pixels, or as percentages of the plot area size.
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         Two gauges with different center
                     *
                     * @type    {Array<string|number>}
                     * @default ["50%", "50%"]
                     * @since   2.3.0
                     * @product highcharts
                     */
                    center: ['50%', '50%'],
                    /**
                     * The size of the pane, either as a number defining pixels, or a
                     * percentage defining a percentage of the available plot area (the
                     * smallest of the plot height or plot width).
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         Smaller size
                     *
                     * @type    {number|string}
                     * @product highcharts
                     */
                    size: '85%',
                    /**
                     * The inner size of the pane, either as a number defining pixels, or a
                     * percentage defining a percentage of the pane's size.
                     *
                     * @sample {highcharts} highcharts/series-polar/column-inverted-inner
                     *         The inner size set to 20%
                     *
                     * @type    {number|string}
                     * @product highcharts
                     */
                    innerSize: '0%',
                    /**
                     * The start angle of the polar X axis or gauge axis, given in degrees
                     * where 0 is north. Defaults to 0.
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         VU-meter with custom start and end angle
                     *
                     * @since   2.3.0
                     * @product highcharts
                     */
                    startAngle: 0
                };
                /**
                 * An array of background items for the pane.
                 *
                 * @sample {highcharts} highcharts/demo/gauge-speedometer/
                 *         Speedometer gauge with multiple backgrounds
                 *
                 * @type         {Array<*>}
                 * @optionparent pane.background
                 */
                this.defaultBackgroundOptions = {
                    /**
                     * The class name for this background.
                     *
                     * @sample {highcharts} highcharts/css/pane/
                     *         Panes styled by CSS
                     * @sample {highstock} highcharts/css/pane/
                     *         Panes styled by CSS
                     * @sample {highmaps} highcharts/css/pane/
                     *         Panes styled by CSS
                     *
                     * @type      {string}
                     * @default   highcharts-pane
                     * @since     5.0.0
                     * @apioption pane.background.className
                     */
                    /**
                     * The shape of the pane background. When `solid`, the background
                     * is circular. When `arc`, the background extends only from the min
                     * to the max of the value axis.
                     *
                     * @type    {Highcharts.PaneBackgroundShapeValue}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    shape: 'circle',
                    /**
                     * The pixel border width of the pane background.
                     *
                     * @since 2.3.0
                     * @product highcharts
                     */
                    borderWidth: 1,
                    /**
                     * The pane background border color.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    borderColor: "#cccccc" /* neutralColor20 */,
                    /**
                     * The background color or gradient for the pane.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @default { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, #ffffff], [1, #e6e6e6]] }
                     * @since   2.3.0
                     * @product highcharts
                     */
                    backgroundColor: {
                        /** @ignore-option */
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        /** @ignore-option */
                        stops: [
                            [0, "#ffffff" /* backgroundColor */],
                            [1, "#e6e6e6" /* neutralColor10 */]
                        ]
                    },
                    /** @ignore-option */
                    from: -Number.MAX_VALUE,
                    /**
                     * The inner radius of the pane background. Can be either numeric
                     * (pixels) or a percentage string.
                     *
                     * @type    {number|string}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    innerRadius: 0,
                    /** @ignore-option */
                    to: Number.MAX_VALUE,
                    /**
                     * The outer radius of the circular pane background. Can be either
                     * numeric (pixels) or a percentage string.
                     *
                     * @type     {number|string}
                     * @since    2.3.0
                     * @product  highcharts
                     */
                    outerRadius: '105%'
                };
                this.init(options, chart);
            }
            /**
             * Initialize the Pane object
             *
             * @private
             * @function Highcharts.Pane#init
             *
             * @param {Highcharts.PaneOptions} options
             *
             * @param {Highcharts.Chart} chart
             */
            Pane.prototype.init = function (options, chart) {
                this.chart = chart;
                this.background = [];
                chart.pane.push(this);
                this.setOptions(options);
            };
            /**
             * @private
             * @function Highcharts.Pane#setOptions
             *
             * @param {Highcharts.PaneOptions} options
             */
            Pane.prototype.setOptions = function (options) {
                // Set options. Angular charts have a default background (#3318)
                this.options = options = merge(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, options);
            };
            /**
             * Render the pane with its backgrounds.
             *
             * @private
             * @function Highcharts.Pane#render
             */
            Pane.prototype.render = function () {
                var options = this.options,
                    backgroundOption = this.options.background,
                    renderer = this.chart.renderer,
                    len,
                    i;
                if (!this.group) {
                    this.group = renderer.g('pane-group')
                        .attr({ zIndex: options.zIndex || 0 })
                        .add();
                }
                this.updateCenter();
                // Render the backgrounds
                if (backgroundOption) {
                    backgroundOption = splat(backgroundOption);
                    len = Math.max(backgroundOption.length, this.background.length || 0);
                    for (i = 0; i < len; i++) {
                        // #6641 - if axis exists, chart is circular and apply
                        // background
                        if (backgroundOption[i] && this.axis) {
                            this.renderBackground(merge(this.defaultBackgroundOptions, backgroundOption[i]), i);
                        }
                        else if (this.background[i]) {
                            this.background[i] = this.background[i].destroy();
                            this.background.splice(i, 1);
                        }
                    }
                }
            };
            /**
             * Render an individual pane background.
             *
             * @private
             * @function Highcharts.Pane#renderBackground
             *
             * @param {Highcharts.PaneBackgroundOptions} backgroundOptions
             *        Background options
             *
             * @param {number} i
             *        The index of the background in this.backgrounds
             */
            Pane.prototype.renderBackground = function (backgroundOptions, i) {
                var method = 'animate',
                    attribs = {
                        'class': 'highcharts-pane ' + (backgroundOptions.className || '')
                    };
                if (!this.chart.styledMode) {
                    extend(attribs, {
                        'fill': backgroundOptions.backgroundColor,
                        'stroke': backgroundOptions.borderColor,
                        'stroke-width': backgroundOptions.borderWidth
                    });
                }
                if (!this.background[i]) {
                    this.background[i] = this.chart.renderer
                        .path()
                        .add(this.group);
                    method = 'attr';
                }
                this.background[i][method]({
                    'd': this.axis.getPlotBandPath(backgroundOptions.from, backgroundOptions.to, backgroundOptions)
                }).attr(attribs);
            };
            /**
             * Gets the center for the pane and its axis.
             *
             * @private
             * @function Highcharts.Pane#updateCenter
             * @param {Highcharts.Axis} [axis]
             */
            Pane.prototype.updateCenter = function (axis) {
                this.center = (axis ||
                    this.axis ||
                    {}).center = CU.getCenter.call(this);
            };
            /**
             * Destroy the pane item
             *
             * @ignore
             * @private
             * @function Highcharts.Pane#destroy
             * /
            destroy: function () {
                erase(this.chart.pane, this);
                this.background.forEach(function (background) {
                    background.destroy();
                });
                this.background.length = 0;
                this.group = this.group.destroy();
            },
            */
            /**
             * Update the pane item with new options
             *
             * @private
             * @function Highcharts.Pane#update
             * @param {Highcharts.PaneOptions} options
             *        New pane options
             * @param {boolean} [redraw]
             */
            Pane.prototype.update = function (options, redraw) {
                merge(true, this.options, options);
                this.setOptions(this.options);
                this.render();
                this.chart.axes.forEach(function (axis) {
                    if (axis.pane === this) {
                        axis.pane = null;
                        axis.update({}, redraw);
                    }
                }, this);
            };
            return Pane;
        }());
        /**
         * Check whether element is inside or outside pane.
         * @private
         * @param  {number} x
         * Element's x coordinate
         * @param  {number} y
         * Element's y coordinate
         * @param  {Array<number>} center
         * Pane's center (x, y) and diameter
         */
        function isInsidePane(x, y, center) {
            return Math.sqrt(Math.pow(x - center[0], 2) + Math.pow(y - center[1], 2)) <= center[2] / 2;
        }
        Chart.prototype.getHoverPane = function (eventArgs) {
            var chart = this;
            var hoverPane;
            if (eventArgs) {
                chart.pane.forEach(function (pane) {
                    var plotX = eventArgs.chartX - chart.plotLeft,
                        plotY = eventArgs.chartY - chart.plotTop,
                        x = chart.inverted ? plotY : plotX,
                        y = chart.inverted ? plotX : plotY;
                    if (isInsidePane(x, y, pane.center)) {
                        hoverPane = pane;
                    }
                });
            }
            return hoverPane;
        };
        addEvent(Chart, 'afterIsInsidePlot', function (e) {
            var chart = this;
            if (chart.polar) {
                e.isInsidePlot = chart.pane.some(function (pane) { return isInsidePane(e.x, e.y, pane.center); });
            }
        });
        addEvent(Pointer, 'beforeGetHoverData', function (eventArgs) {
            var chart = this.chart;
            if (chart.polar) {
                // Find pane we are currently hovering over.
                chart.hoverPane = chart.getHoverPane(eventArgs);
                // Edit filter method to handle polar
                eventArgs.filter = function (s) {
                    return (s.visible &&
                        !(!eventArgs.shared && s.directTouch) && // #3821
                        pick(s.options.enableMouseTracking, true) &&
                        (!chart.hoverPane || s.xAxis.pane === chart.hoverPane));
                };
            }
            else {
                chart.hoverPane = void 0;
            }
        });
        addEvent(Pointer, 'afterGetHoverData', function (eventArgs) {
            var chart = this.chart;
            if (eventArgs.hoverPoint &&
                eventArgs.hoverPoint.plotX &&
                eventArgs.hoverPoint.plotY &&
                chart.hoverPane &&
                !isInsidePane(eventArgs.hoverPoint.plotX, eventArgs.hoverPoint.plotY, chart.hoverPane.center)) {
                eventArgs.hoverPoint = void 0;
            }
        });
        H.Pane = Pane;

        return H.Pane;
    });
    _registerModule(_modules, 'Core/Axis/RadialAxis.js', [_modules['Core/Axis/AxisDefaults.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (AxisDefaults, D, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defaultOptions = D.defaultOptions;
        var noop = H.noop;
        var addEvent = U.addEvent,
            correctFloat = U.correctFloat,
            defined = U.defined,
            extend = U.extend,
            fireEvent = U.fireEvent,
            merge = U.merge,
            pick = U.pick,
            relativeLength = U.relativeLength,
            wrap = U.wrap;
        /* *
         *
         *  Composition
         *
         * */
        var RadialAxis;
        (function (RadialAxis) {
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
            var composedClasses = [];
            /**
             * Circular axis around the perimeter of a polar chart.
             * @private
             */
            var defaultCircularOptions = {
                    gridLineWidth: 1,
                    labels: {
                        align: void 0,
                        distance: 15,
                        x: 0,
                        y: void 0,
                        style: {
                            textOverflow: 'none' // wrap lines by default (#7248)
                        }
                    },
                    maxPadding: 0,
                    minPadding: 0,
                    showLastLabel: false,
                    tickLength: 0
                };
            /**
             * The default options extend defaultYAxisOptions.
             * @private
             */
            var defaultRadialGaugeOptions = {
                    labels: {
                        align: 'center',
                        x: 0,
                        y: void 0 // auto
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
                };
            /**
             * Radial axis, like a spoke in a polar chart.
             * @private
             */
            var defaultRadialOptions = {
                    /**
                     * In a polar chart, this is the angle of the Y axis in degrees, where
                     * 0 is up and 90 is right. The angle determines the position of the
                     * axis line and the labels, though the coordinate system is unaffected.
                     * Since v8.0.0 this option is also applicable for X axis (inverted
                     * polar).
                     *
                     * @sample {highcharts} highcharts/xaxis/angle/
                     *         Custom X axis' angle on inverted polar chart
                     * @sample {highcharts} highcharts/yaxis/angle/
                     *         Dual axis polar chart
                     *
                     * @type      {number}
                     * @default   0
                     * @since     4.2.7
                     * @product   highcharts
                     * @apioption xAxis.angle
                     */
                    /**
                     * Polar charts only. Whether the grid lines should draw as a polygon
                     * with straight lines between categories, or as circles. Can be either
                     * `circle` or `polygon`. Since v8.0.0 this option is also applicable
                     * for X axis (inverted polar).
                     *
                     * @sample {highcharts} highcharts/demo/polar-spider/
                     *         Polygon grid lines
                     * @sample {highcharts} highcharts/xaxis/gridlineinterpolation/
                     *         Circle and polygon on inverted polar
                     * @sample {highcharts} highcharts/yaxis/gridlineinterpolation/
                     *         Circle and polygon
                     *
                     * @type       {string}
                     * @product    highcharts
                     * @validvalue ["circle", "polygon"]
                     * @apioption  xAxis.gridLineInterpolation
                     */
                    gridLineInterpolation: 'circle',
                    gridLineWidth: 1,
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
                };
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * In case of auto connect, add one closestPointRange to the max value
             * right before tickPositions are computed, so that ticks will extend
             * passed the real max.
             * @private
             */
            function beforeSetTickPositions() {
                // If autoConnect is true, polygonal grid lines are connected, and
                // one closestPointRange is added to the X axis to prevent the last
                // point from overlapping the first.
                this.autoConnect = (this.isCircular &&
                    typeof pick(this.userMax, this.options.max) === 'undefined' &&
                    correctFloat(this.endAngleRad - this.startAngleRad) ===
                        correctFloat(2 * Math.PI));
                // This will lead to add an extra tick to xAxis in order to display
                // a correct range on inverted polar
                if (!this.isCircular && this.chart.inverted) {
                    this.max++;
                }
                if (this.autoConnect) {
                    this.max += ((this.categories && 1) ||
                        this.pointRange ||
                        this.closestPointRange ||
                        0); // #1197, #2260
                }
            }
            /**
             * Augments methods for the value axis.
             *
             * @private
             *
             * @param {Highcharts.Axis} AxisClass
             * Axis class to extend.
             *
             * @param {Highcharts.Tick} TickClass
             * Tick class to use.
             *
             * @return {Highcharts.Axis}
             * Axis composition.
             */
            function compose(AxisClass, TickClass) {
                if (composedClasses.indexOf(AxisClass) === -1) {
                    composedClasses.push(AxisClass);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'autoLabelAlign', onAxisAutoLabelAlign);
                    addEvent(AxisClass, 'destroy', onAxisDestroy);
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'initialAxisTranslation', onAxisInitialAxisTranslation);
                }
                if (composedClasses.indexOf(TickClass) === -1) {
                    composedClasses.push(TickClass);
                    addEvent(TickClass, 'afterGetLabelPosition', onTickAfterGetLabelPosition);
                    addEvent(TickClass, 'afterGetPosition', onTickAfterGetPosition);
                    wrap(TickClass.prototype, 'getMarkPath', wrapTickGetMarkPath);
                }
                return AxisClass;
            }
            RadialAxis.compose = compose;
            /**
             * Attach and return collecting function for labels in radial axis for
             * anti-collision.
             *
             * @private
             */
            function createLabelCollector() {
                var _this = this;
                return function () {
                    if (_this.isRadial &&
                        _this.tickPositions &&
                        // undocumented option for now, but working
                        _this.options.labels &&
                        _this.options.labels.allowOverlap !== true) {
                        return _this.tickPositions
                            .map(function (pos) {
                            return _this.ticks[pos] && _this.ticks[pos].label;
                        })
                            .filter(function (label) {
                            return Boolean(label);
                        });
                    }
                };
            }
            /**
             * Creates an empty collector function.
             * @private
             */
            function createLabelCollectorHidden() {
                return noop;
            }
            /**
             * Find the correct end values of crosshair in polar.
             * @private
             */
            function getCrosshairPosition(options, x1, y1) {
                var center = this.pane.center;
                var value = options.value,
                    shapeArgs,
                    end,
                    x2,
                    y2;
                if (this.isCircular) {
                    if (!defined(value)) {
                        // When the snap is set to false
                        x2 = options.chartX || 0;
                        y2 = options.chartY || 0;
                        value = this.translate(Math.atan2(y2 - y1, x2 - x1) - this.startAngleRad, true);
                    }
                    else if (options.point) {
                        // When the snap is set to true
                        shapeArgs = options.point.shapeArgs || {};
                        if (shapeArgs.start) {
                            // Find a true value of the point based on the
                            // angle
                            value = this.chart.inverted ?
                                this.translate(options.point.rectPlotY, true) :
                                options.point.x;
                        }
                    }
                    end = this.getPosition(value);
                    x2 = end.x;
                    y2 = end.y;
                }
                else {
                    if (!defined(value)) {
                        x2 = options.chartX;
                        y2 = options.chartY;
                    }
                    if (defined(x2) && defined(y2)) {
                        // Calculate radius of non-circular axis' crosshair
                        y1 = center[1] + this.chart.plotTop;
                        value = this.translate(Math.min(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), center[2] / 2) - center[3] / 2, true);
                    }
                }
                return [value, x2 || 0, y2 || 0];
            }
            /**
             * Get the path for the axis line. This method is also referenced in the
             * getPlotLinePath method.
             *
             * @private
             * @param {number} _lineWidth
             * Line width is not used.
             * @param {number} [radius]
             * Radius of radial path.
             * @param {number} [innerRadius]
             * Inner radius of radial path.
             */
            function getLinePath(_lineWidth, radius, innerRadius) {
                var center = this.pane.center,
                    chart = this.chart,
                    left = this.left || 0,
                    top = this.top || 0;
                var end,
                    r = pick(radius,
                    center[2] / 2 - this.offset),
                    path;
                if (typeof innerRadius === 'undefined') {
                    innerRadius = this.horiz ? 0 : this.center && -this.center[3] / 2;
                }
                // In case when innerSize of pane is set, it must be included
                if (innerRadius) {
                    r += innerRadius;
                }
                if (this.isCircular || typeof radius !== 'undefined') {
                    path = this.chart.renderer.symbols.arc(left + center[0], top + center[1], r, r, {
                        start: this.startAngleRad,
                        end: this.endAngleRad,
                        open: true,
                        innerR: 0
                    });
                    // Bounds used to position the plotLine label next to the line
                    // (#7117)
                    path.xBounds = [left + center[0]];
                    path.yBounds = [top + center[1] - r];
                }
                else {
                    end = this.postTranslate(this.angleRad, r);
                    path = [
                        [
                            'M',
                            this.center[0] + chart.plotLeft,
                            this.center[1] + chart.plotTop
                        ],
                        ['L', end.x, end.y]
                    ];
                }
                return path;
            }
            /**
             * Wrap the getOffset method to return zero offset for title or labels
             * in a radial axis.
             */
            function getOffset() {
                var axisProto = this.constructor.prototype;
                // Call the Axis prototype method (the method we're in now is on the
                // instance)
                axisProto.getOffset.call(this);
                // Title or label offsets are not counted
                this.chart.axisOffset[this.side] = 0;
            }
            /**
             * Find the path for plot bands along the radial axis.
             *
             * @private
             */
            function getPlotBandPath(from, to, options) {
                var chart = this.chart,
                    radiusToPixels = function (radius) {
                        if (typeof radius === 'string') {
                            var r = parseInt(radius, 10);
                        if (percentRegex.test(radius)) {
                            r = (r * fullRadius) / 100;
                        }
                        return r;
                    }
                    return radius;
                }, center = this.center, startAngleRad = this.startAngleRad, fullRadius = center[2] / 2, offset = Math.min(this.offset, 0), left = this.left || 0, top = this.top || 0, percentRegex = /%$/, isCircular = this.isCircular; // X axis in a polar chart
                var start,
                    end,
                    angle,
                    xOnPerimeter,
                    open,
                    path,
                    outerRadius = pick(radiusToPixels(options.outerRadius),
                    fullRadius),
                    innerRadius = radiusToPixels(options.innerRadius),
                    thickness = pick(radiusToPixels(options.thickness), 10);
                // Polygonal plot bands
                if (this.options.gridLineInterpolation === 'polygon') {
                    path = this.getPlotLinePath({ value: from }).concat(this.getPlotLinePath({ value: to, reverse: true }));
                    // Circular grid bands
                }
                else {
                    // Keep within bounds
                    from = Math.max(from, this.min);
                    to = Math.min(to, this.max);
                    var transFrom = this.translate(from),
                        transTo = this.translate(to);
                    // Plot bands on Y axis (radial axis) - inner and outer
                    // radius depend on to and from
                    if (!isCircular) {
                        outerRadius = transFrom || 0;
                        innerRadius = transTo || 0;
                    }
                    // Handle full circle
                    if (options.shape === 'circle' || !isCircular) {
                        start = -Math.PI / 2;
                        end = Math.PI * 1.5;
                        open = true;
                    }
                    else {
                        start = startAngleRad + (transFrom || 0);
                        end = startAngleRad + (transTo || 0);
                    }
                    outerRadius -= offset; // #5283
                    thickness -= offset; // #5283
                    path = chart.renderer.symbols.arc(left + center[0], top + center[1], outerRadius, outerRadius, {
                        // Math is for reversed yAxis (#3606)
                        start: Math.min(start, end),
                        end: Math.max(start, end),
                        innerR: pick(innerRadius, outerRadius - thickness),
                        open: open
                    });
                    // Provide positioning boxes for the label (#6406)
                    if (isCircular) {
                        angle = (end + start) / 2;
                        xOnPerimeter = (left +
                            center[0] +
                            (center[2] / 2) * Math.cos(angle));
                        path.xBounds = angle > -Math.PI / 2 && angle < Math.PI / 2 ?
                            // Right hemisphere
                            [xOnPerimeter, chart.plotWidth] :
                            // Left hemisphere
                            [0, xOnPerimeter];
                        path.yBounds = [
                            top + center[1] + (center[2] / 2) * Math.sin(angle)
                        ];
                        // Shift up or down to get the label clear of the perimeter
                        path.yBounds[0] += ((angle > -Math.PI && angle < 0) ||
                            (angle > Math.PI)) ? -10 : 10;
                    }
                }
                return path;
            }
            /**
             * Find the path for plot lines perpendicular to the radial axis.
             */
            function getPlotLinePath(options) {
                var _this = this;
                var center = this.pane.center, chart = this.chart, inverted = chart.inverted, reverse = options.reverse, background = this.pane.options.background ?
                        (this.pane.options.background[0] ||
                            this.pane.options.background) :
                        {}, innerRadius = background.innerRadius || '0%', outerRadius = background.outerRadius || '100%', x1 = center[0] + chart.plotLeft, y1 = center[1] + chart.plotTop, height = this.height, isCrosshair = options.isCrosshair, paneInnerR = center[3] / 2;
                var value = options.value,
                    innerRatio,
                    distance,
                    a,
                    b,
                    otherAxis,
                    xy,
                    tickPositions,
                    crossPos,
                    path;
                var end = this.getPosition(value);
                var x2 = end.x,
                    y2 = end.y;
                // Crosshair logic
                if (isCrosshair) {
                    // Find crosshair's position and perform destructuring
                    // assignment
                    crossPos = this.getCrosshairPosition(options, x1, y1);
                    value = crossPos[0];
                    x2 = crossPos[1];
                    y2 = crossPos[2];
                }
                // Spokes
                if (this.isCircular) {
                    distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    a = (typeof innerRadius === 'string') ?
                        relativeLength(innerRadius, 1) :
                        (innerRadius / distance);
                    b = (typeof outerRadius === 'string') ?
                        relativeLength(outerRadius, 1) :
                        (outerRadius / distance);
                    // To ensure that gridlines won't be displayed in area
                    // defined by innerSize in case of custom radiuses of pane's
                    // background
                    if (center && paneInnerR) {
                        innerRatio = paneInnerR / distance;
                        if (a < innerRatio) {
                            a = innerRatio;
                        }
                        if (b < innerRatio) {
                            b = innerRatio;
                        }
                    }
                    path = [
                        ['M', x1 + a * (x2 - x1), y1 - a * (y1 - y2)],
                        ['L', x2 - (1 - b) * (x2 - x1), y2 + (1 - b) * (y1 - y2)]
                    ];
                    // Concentric circles
                }
                else {
                    // Pick the right values depending if it is grid line or
                    // crosshair
                    value = this.translate(value);
                    // This is required in case when xAxis is non-circular to
                    // prevent grid lines (or crosshairs, if enabled) from
                    // rendering above the center after they supposed to be
                    // displayed below the center point
                    if (value) {
                        if (value < 0 || value > height) {
                            value = 0;
                        }
                    }
                    if (this.options.gridLineInterpolation === 'circle') {
                        // A value of 0 is in the center, so it won't be
                        // visible, but draw it anyway for update and animation
                        // (#2366)
                        path = this.getLinePath(0, value, paneInnerR);
                        // Concentric polygons
                    }
                    else {
                        path = [];
                        // Find the other axis (a circular one) in the same pane
                        chart[inverted ? 'yAxis' : 'xAxis'].forEach(function (a) {
                            if (a.pane === _this.pane) {
                                otherAxis = a;
                            }
                        });
                        if (otherAxis) {
                            tickPositions = otherAxis.tickPositions;
                            if (otherAxis.autoConnect) {
                                tickPositions =
                                    tickPositions.concat([tickPositions[0]]);
                            }
                            // Reverse the positions for concatenation of polygonal
                            // plot bands
                            if (reverse) {
                                tickPositions = tickPositions.slice().reverse();
                            }
                            if (value) {
                                value += paneInnerR;
                            }
                            for (var i = 0; i < tickPositions.length; i++) {
                                xy = otherAxis.getPosition(tickPositions[i], value);
                                path.push(i ? ['L', xy.x, xy.y] : ['M', xy.x, xy.y]);
                            }
                        }
                    }
                }
                return path;
            }
            /**
             * Returns the x, y coordinate of a point given by a value and a pixel
             * distance from center.
             *
             * @private
             * @param {number} value
             * Point value.
             * @param {number} [length]
             * Distance from center.
             */
            function getPosition(value, length) {
                var translatedVal = this.translate(value);
                return this.postTranslate(this.isCircular ? translatedVal : this.angleRad, // #2848
                // In case when translatedVal is negative, the 0 value must be
                // used instead, in order to deal with lines and labels that
                // fall out of the visible range near the center of a pane
                pick(this.isCircular ?
                    length :
                    (translatedVal < 0 ? 0 : translatedVal), this.center[2] / 2) - this.offset);
            }
            /**
             * Find the position for the axis title, by default inside the gauge.
             */
            function getTitlePosition() {
                var center = this.center,
                    chart = this.chart,
                    titleOptions = this.options.title;
                return {
                    x: chart.plotLeft + center[0] + (titleOptions.x || 0),
                    y: (chart.plotTop +
                        center[1] -
                        ({
                            high: 0.5,
                            middle: 0.25,
                            low: 0
                        }[titleOptions.align] *
                            center[2]) +
                        (titleOptions.y || 0))
                };
            }
            /**
             * Modify radial axis.
             * @private
             *
             * @param {Highcharts.Axis} radialAxis
             * Radial axis to modify.
             */
            function modify(axis) {
                axis.beforeSetTickPositions = beforeSetTickPositions;
                axis.createLabelCollector = createLabelCollector;
                axis.getCrosshairPosition = getCrosshairPosition;
                axis.getLinePath = getLinePath;
                axis.getOffset = getOffset;
                axis.getPlotBandPath = getPlotBandPath;
                axis.getPlotLinePath = getPlotLinePath;
                axis.getPosition = getPosition;
                axis.getTitlePosition = getTitlePosition;
                axis.postTranslate = postTranslate;
                axis.setAxisSize = setAxisSize;
                axis.setAxisTranslation = setAxisTranslation;
                axis.setOptions = setOptions;
            }
            /**
             * Modify radial axis as hidden.
             * @private
             *
             * @param {Highcharts.Axis} radialAxis
             * Radial axis to modify.
             */
            function modifyAsHidden(radialAxis) {
                radialAxis.isHidden = true;
                radialAxis.createLabelCollector = createLabelCollectorHidden;
                radialAxis.getOffset = noop;
                radialAxis.redraw = renderHidden;
                radialAxis.render = renderHidden;
                radialAxis.setScale = noop;
                radialAxis.setCategories = noop;
                radialAxis.setTitle = noop;
            }
            /**
             * Finalize modification of axis instance with radial logic.
             */
            function onAxisAfterInit() {
                var chart = this.chart,
                    options = this.options,
                    isHidden = chart.angular && this.isXAxis,
                    pane = this.pane,
                    paneOptions = pane && pane.options;
                if (!isHidden && pane && (chart.angular || chart.polar)) {
                    // Start and end angle options are given in degrees relative to
                    // top, while internal computations are in radians relative to
                    // right (like SVG).
                    // Y axis in polar charts
                    this.angleRad = (options.angle || 0) * Math.PI / 180;
                    // Gauges
                    this.startAngleRad =
                        (paneOptions.startAngle - 90) * Math.PI / 180;
                    this.endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180; // Gauges
                    this.offset = options.offset || 0;
                }
            }
            /**
             * Wrap auto label align to avoid setting axis-wide rotation on radial axes.
             * (#4920)
             */
            function onAxisAutoLabelAlign(e) {
                if (this.isRadial) {
                    e.align = void 0;
                    e.preventDefault();
                }
            }
            /**
             * Remove label collector function on axis remove/update.
             */
            function onAxisDestroy() {
                if (this.chart &&
                    this.chart.labelCollectors) {
                    var index = (this.labelCollector ?
                            this.chart.labelCollectors.indexOf(this.labelCollector) :
                            -1);
                    if (index >= 0) {
                        this.chart.labelCollectors.splice(index, 1);
                    }
                }
            }
            /**
             * Modify axis instance with radial logic before common axis init.
             */
            function onAxisInit(e) {
                var chart = this.chart,
                    inverted = chart.inverted,
                    angular = chart.angular,
                    polar = chart.polar,
                    isX = this.isXAxis,
                    coll = this.coll,
                    isHidden = angular && isX,
                    chartOptions = chart.options,
                    paneIndex = e.userOptions.pane || 0,
                    pane = this.pane = chart.pane && chart.pane[paneIndex];
                var isCircular;
                // Prevent changes for colorAxis
                if (coll === 'colorAxis') {
                    this.isRadial = false;
                    return;
                }
                // Before prototype.init
                if (angular) {
                    if (isHidden) {
                        modifyAsHidden(this);
                    }
                    else {
                        modify(this);
                    }
                    isCircular = !isX;
                    if (isCircular) {
                        this.defaultPolarOptions = defaultRadialGaugeOptions;
                    }
                }
                else if (polar) {
                    modify(this);
                    // Check which axis is circular
                    isCircular = this.horiz;
                    this.defaultPolarOptions = isCircular ?
                        defaultCircularOptions :
                        merge(coll === 'xAxis' ?
                            AxisDefaults.defaultXAxisOptions :
                            AxisDefaults.defaultYAxisOptions, defaultRadialOptions);
                    // Apply the stack labels for yAxis in case of inverted chart
                    if (inverted && coll === 'yAxis') {
                        this.defaultPolarOptions.stackLabels = AxisDefaults
                            .defaultYAxisOptions.stackLabels;
                        this.defaultPolarOptions.reversedStacks = true;
                    }
                }
                // Disable certain features on angular and polar axes
                if (angular || polar) {
                    this.isRadial = true;
                    chartOptions.chart.zoomType = null;
                    if (!this.labelCollector) {
                        this.labelCollector = this.createLabelCollector();
                    }
                    if (this.labelCollector) {
                        // Prevent overlapping axis labels (#9761)
                        chart.labelCollectors.push(this.labelCollector);
                    }
                }
                else {
                    this.isRadial = false;
                }
                // A pointer back to this axis to borrow geometry
                if (pane && isCircular) {
                    pane.axis = this;
                }
                this.isCircular = isCircular;
            }
            /**
             * Prepare axis translation.
             */
            function onAxisInitialAxisTranslation() {
                if (this.isRadial) {
                    this.beforeSetTickPositions();
                }
            }
            /**
             * Find the center position of the label based on the distance option.
             */
            function onTickAfterGetLabelPosition(e) {
                var label = this.label;
                if (!label) {
                    return;
                }
                var axis = this.axis,
                    labelBBox = label.getBBox(),
                    labelOptions = axis.options.labels,
                    angle = ((axis.translate(this.pos) + axis.startAngleRad +
                        Math.PI / 2) / Math.PI * 180) % 360,
                    correctAngle = Math.round(angle),
                    labelYPosCorrection = !defined(labelOptions.y) ? -labelBBox.height * 0.3 : 0;
                var optionsY = labelOptions.y, ret, centerSlot = 20, // 20 degrees to each side at the top and bottom
                    align = labelOptions.align, labelDir = 'end', // Direction of the label 'start' or 'end'
                    reducedAngle1 = correctAngle < 0 ?
                        correctAngle + 360 : correctAngle, reducedAngle2 = reducedAngle1, translateY = 0, translateX = 0;
                if (axis.isRadial) { // Both X and Y axes in a polar chart
                    ret = axis.getPosition(this.pos, (axis.center[2] / 2) +
                        relativeLength(pick(labelOptions.distance, -25), axis.center[2] / 2, -axis.center[2] / 2));
                    // Automatically rotated
                    if (labelOptions.rotation === 'auto') {
                        label.attr({
                            rotation: angle
                        });
                        // Vertically centered
                    }
                    else if (!defined(optionsY)) {
                        optionsY = (axis.chart.renderer
                            .fontMetrics(label.styles && label.styles.fontSize).b -
                            labelBBox.height / 2);
                    }
                    // Automatic alignment
                    if (!defined(align)) {
                        if (axis.isCircular) { // Y axis
                            if (labelBBox.width >
                                axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
                                centerSlot = 0;
                            }
                            if (angle > centerSlot && angle < 180 - centerSlot) {
                                align = 'left'; // right hemisphere
                            }
                            else if (angle > 180 + centerSlot &&
                                angle < 360 - centerSlot) {
                                align = 'right'; // left hemisphere
                            }
                            else {
                                align = 'center'; // top or bottom
                            }
                        }
                        else {
                            align = 'center';
                        }
                        label.attr({
                            align: align
                        });
                    }
                    // Auto alignment for solid-gauges with two labels (#10635)
                    if (align === 'auto' &&
                        axis.tickPositions.length === 2 &&
                        axis.isCircular) {
                        // Angles reduced to 0 - 90 or 180 - 270
                        if (reducedAngle1 > 90 && reducedAngle1 < 180) {
                            reducedAngle1 = 180 - reducedAngle1;
                        }
                        else if (reducedAngle1 > 270 && reducedAngle1 <= 360) {
                            reducedAngle1 = 540 - reducedAngle1;
                        }
                        // Angles reduced to 0 - 180
                        if (reducedAngle2 > 180 && reducedAngle2 <= 360) {
                            reducedAngle2 = 360 - reducedAngle2;
                        }
                        if ((axis.pane.options.startAngle === correctAngle) ||
                            (axis.pane.options.startAngle === correctAngle + 360) ||
                            (axis.pane.options.startAngle === correctAngle - 360)) {
                            labelDir = 'start';
                        }
                        if ((correctAngle >= -90 && correctAngle <= 90) ||
                            (correctAngle >= -360 && correctAngle <= -270) ||
                            (correctAngle >= 270 && correctAngle <= 360)) {
                            align = (labelDir === 'start') ? 'right' : 'left';
                        }
                        else {
                            align = (labelDir === 'start') ? 'left' : 'right';
                        }
                        // For angles beetwen (90 + n * 180) +- 20
                        if (reducedAngle2 > 70 && reducedAngle2 < 110) {
                            align = 'center';
                        }
                        // auto Y translation
                        if (reducedAngle1 < 15 ||
                            (reducedAngle1 >= 180 && reducedAngle1 < 195)) {
                            translateY = labelBBox.height * 0.3;
                        }
                        else if (reducedAngle1 >= 15 && reducedAngle1 <= 35) {
                            translateY = labelDir === 'start' ?
                                0 : labelBBox.height * 0.75;
                        }
                        else if (reducedAngle1 >= 195 && reducedAngle1 <= 215) {
                            translateY = labelDir === 'start' ?
                                labelBBox.height * 0.75 : 0;
                        }
                        else if (reducedAngle1 > 35 && reducedAngle1 <= 90) {
                            translateY = labelDir === 'start' ?
                                -labelBBox.height * 0.25 : labelBBox.height;
                        }
                        else if (reducedAngle1 > 215 && reducedAngle1 <= 270) {
                            translateY = labelDir === 'start' ?
                                labelBBox.height : -labelBBox.height * 0.25;
                        }
                        // auto X translation
                        if (reducedAngle2 < 15) {
                            translateX = labelDir === 'start' ?
                                -labelBBox.height * 0.15 : labelBBox.height * 0.15;
                        }
                        else if (reducedAngle2 > 165 && reducedAngle2 <= 180) {
                            translateX = labelDir === 'start' ?
                                labelBBox.height * 0.15 : -labelBBox.height * 0.15;
                        }
                        label.attr({ align: align });
                        label.translate(translateX, translateY + labelYPosCorrection);
                    }
                    e.pos.x = ret.x + (labelOptions.x || 0);
                    e.pos.y = ret.y + (optionsY || 0);
                }
            }
            /**
             * Add special cases within the Tick class' methods for radial axes.
             */
            function onTickAfterGetPosition(e) {
                if (this.axis.getPosition) {
                    extend(e.pos, this.axis.getPosition(this.pos));
                }
            }
            /**
             * Translate from intermediate plotX (angle), plotY (axis.len - radius)
             * to final chart coordinates.
             *
             * @private
             * @param {number} angle
             * Translation angle.
             * @param {number} radius
             * Translation radius.
             */
            function postTranslate(angle, radius) {
                var chart = this.chart,
                    center = this.center;
                angle = this.startAngleRad + angle;
                return {
                    x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
                    y: chart.plotTop + center[1] + Math.sin(angle) * radius
                };
            }
            /**
             * Prevent setting Y axis dirty.
             */
            function renderHidden() {
                this.isDirty = false;
            }
            /**
             * Override the setAxisSize method to use the arc's circumference as
             * length. This allows tickPixelInterval to apply to pixel lengths along
             * the perimeter.
             * @private
             */
            function setAxisSize() {
                var axisProto = this.constructor.prototype;
                var center,
                    start;
                axisProto.setAxisSize.call(this);
                if (this.isRadial) {
                    // Set the center array
                    this.pane.updateCenter(this);
                    // In case when the innerSize is set in a polar chart, the axis'
                    // center cannot be a reference to pane's center
                    center = this.center = this.pane.center.slice();
                    // The sector is used in Axis.translate to compute the
                    // translation of reversed axis points (#2570)
                    if (this.isCircular) {
                        this.sector = this.endAngleRad - this.startAngleRad;
                    }
                    else {
                        // When the pane's startAngle or the axis' angle is set then
                        // new x and y values for vertical axis' center must be
                        // calulated
                        start = this.postTranslate(this.angleRad, center[3] / 2);
                        center[0] = start.x - this.chart.plotLeft;
                        center[1] = start.y - this.chart.plotTop;
                    }
                    // Axis len is used to lay out the ticks
                    this.len = this.width = this.height =
                        (center[2] - center[3]) * pick(this.sector, 1) / 2;
                }
            }
            /**
             * Override setAxisTranslation by setting the translation to the
             * difference in rotation. This allows the translate method to return
             * angle for any given value.
             *
             * @private
             */
            function setAxisTranslation() {
                var axisProto = this.constructor.prototype;
                // Call uber method
                axisProto.setAxisTranslation.call(this);
                // Set transA and minPixelPadding
                if (this.center) { // it's not defined the first time
                    if (this.isCircular) {
                        this.transA = (this.endAngleRad - this.startAngleRad) /
                            ((this.max - this.min) || 1);
                    }
                    else {
                        // The transA here is the length of the axis, so in case
                        // of inner radius, the length must be decreased by it
                        this.transA = ((this.center[2] - this.center[3]) / 2) /
                            ((this.max - this.min) || 1);
                    }
                    if (this.isXAxis) {
                        this.minPixelPadding = this.transA * this.minPointOffset;
                    }
                    else {
                        // This is a workaround for regression #2593, but categories
                        // still don't position correctly.
                        this.minPixelPadding = 0;
                    }
                }
            }
            /**
             * Merge and set options.
             */
            function setOptions(userOptions) {
                var options = this.options = merge(this.constructor.defaultOptions,
                    this.defaultPolarOptions,
                    defaultOptions[this.coll], // #16112
                    userOptions);
                // Make sure the plotBands array is instanciated for each Axis
                // (#2649)
                if (!options.plotBands) {
                    options.plotBands = [];
                }
                fireEvent(this, 'afterSetOptions');
            }
            /**
             * Wrap the getMarkPath function to return the path of the radial marker.
             */
            function wrapTickGetMarkPath(proceed, x, y, tickLength, tickWidth, horiz, renderer) {
                var axis = this.axis;
                var endPoint,
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
                }
                else {
                    ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
                }
                return ret;
            }
            /* eslint-enable valid-jsdoc */
        })(RadialAxis || (RadialAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return RadialAxis;
    });
    _registerModule(_modules, 'Series/AreaRange/AreaRangePoint.js', [_modules['Series/Area/AreaSeries.js'], _modules['Core/Series/Point.js'], _modules['Core/Utilities.js']], function (AreaSeries, Point, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var pointProto = Point.prototype;
        var defined = U.defined,
            isNumber = U.isNumber;
        /* *
         *
         *  Class
         *
         * */
        var AreaRangePoint = /** @class */ (function (_super) {
                __extends(AreaRangePoint, _super);
            function AreaRangePoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.high = void 0;
                _this.low = void 0;
                _this.options = void 0;
                _this.plotHigh = void 0;
                _this.plotLow = void 0;
                _this.plotHighX = void 0;
                _this.plotLowX = void 0;
                _this.plotX = void 0;
                _this.series = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            AreaRangePoint.prototype.setState = function () {
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
                if (series.stateMarkerGraphic) {
                    series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
                    series.stateMarkerGraphic = series.upperStateMarkerGraphic;
                }
                // Change state also for the top marker
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                if (isPolar) {
                    this.plotX = this.plotHighX;
                }
                // Top state:
                pointProto.setState.apply(this, arguments);
                this.state = prevState;
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
                    series.lowerStateMarkerGraphic = void 0;
                }
                pointProto.setState.apply(this, arguments);
            };
            AreaRangePoint.prototype.haloPath = function () {
                var isPolar = this.series.chart.polar,
                    path = [];
                // Bottom halo
                this.plotY = this.plotLow;
                if (isPolar) {
                    this.plotX = this.plotLowX;
                }
                if (this.isInside) {
                    path = pointProto.haloPath.apply(this, arguments);
                }
                // Top halo
                this.plotY = this.plotHigh;
                if (isPolar) {
                    this.plotX = this.plotHighX;
                }
                if (this.isTopInside) {
                    path = path.concat(pointProto.haloPath.apply(this, arguments));
                }
                return path;
            };
            AreaRangePoint.prototype.isValid = function () {
                return isNumber(this.low) && isNumber(this.high);
            };
            return AreaRangePoint;
        }(AreaSeries.prototype.pointClass));
        /* *
         *
         *  Default export
         *
         * */

        return AreaRangePoint;
    });
    _registerModule(_modules, 'Series/AreaRange/AreaRangeSeries.js', [_modules['Series/AreaRange/AreaRangePoint.js'], _modules['Series/Area/AreaSeries.js'], _modules['Series/Column/ColumnSeries.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (AreaRangePoint, AreaSeries, ColumnSeries, H, Series, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var areaProto = AreaSeries.prototype;
        var columnProto = ColumnSeries.prototype;
        var noop = H.noop;
        var seriesProto = Series.prototype;
        var defined = U.defined,
            extend = U.extend,
            isArray = U.isArray,
            pick = U.pick,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The AreaRange series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.arearange
         *
         * @augments Highcharts.Series
         */
        var AreaRangeSeries = /** @class */ (function (_super) {
                __extends(AreaRangeSeries, _super);
            function AreaRangeSeries() {
                /**
                 *
                 *  Static properties
                 *
                 */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.lowerStateMarkerGraphic = void 0;
                _this.xAxis = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            AreaRangeSeries.prototype.toYData = function (point) {
                return [point.low, point.high];
            };
            /**
             * Translate a point's plotHigh from the internal angle and radius measures
             * to true plotHigh coordinates. This is an addition of the toXY method
             * found in Polar.js, because it runs too early for arearanges to be
             * considered (#3419).
             * @private
             */
            AreaRangeSeries.prototype.highToXY = function (point) {
                // Find the polar plotX and plotY
                var chart = this.chart,
                    xy = this.xAxis.postTranslate(point.rectPlotX || 0,
                    this.yAxis.len - point.plotHigh);
                point.plotHighX = xy.x - chart.plotLeft;
                point.plotHigh = xy.y - chart.plotTop;
                point.plotLowX = point.plotX;
            };
            /**
             * Translate data points from raw values x and y to plotX and plotY.
             * @private
             */
            AreaRangeSeries.prototype.translate = function () {
                var series = this,
                    yAxis = series.yAxis;
                areaProto.translate.apply(series);
                // Set plotLow and plotHigh
                series.points.forEach(function (point) {
                    var high = point.high,
                        plotY = point.plotY;
                    if (point.isNull) {
                        point.plotY = null;
                    }
                    else {
                        point.plotLow = plotY;
                        point.plotHigh = yAxis.translate(series.dataModify ?
                            series.dataModify.modifyValue(high) : high, 0, 1, 0, 1);
                        if (series.dataModify) {
                            point.yBottom = point.plotHigh;
                        }
                    }
                });
                // Postprocess plotHigh
                if (this.chart.polar) {
                    this.points.forEach(function (point) {
                        series.highToXY(point);
                        point.tooltipPos = [
                            (point.plotHighX + point.plotLowX) / 2,
                            (point.plotHigh + point.plotLow) / 2
                        ];
                    });
                }
            };
            /**
             * Extend the line series' getSegmentPath method by applying the segment
             * path to both lower and higher values of the range.
             * @private
             */
            AreaRangeSeries.prototype.getGraphPath = function (points) {
                var highPoints = [],
                    highAreaPoints = [],
                    i,
                    getGraphPath = areaProto.getGraphPath,
                    point,
                    pointShim,
                    linePath,
                    lowerPath,
                    options = this.options,
                    polar = this.chart.polar,
                    connectEnds = polar && options.connectEnds !== false,
                    connectNulls = options.connectNulls,
                    step = options.step,
                    higherPath,
                    higherAreaPath;
                points = points || this.points;
                // Create the top line and the top part of the area fill. The area fill
                // compensates for null points by drawing down to the lower graph,
                // moving across the null gap and starting again at the lower graph.
                i = points.length;
                while (i--) {
                    point = points[i];
                    // Support for polar
                    var highAreaPoint = polar ? {
                            plotX: point.rectPlotX,
                            plotY: point.yBottom,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        } : {
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        };
                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i + 1] || points[i + 1].isNull)) {
                        highAreaPoints.push(highAreaPoint);
                    }
                    pointShim = {
                        polarPlotY: point.polarPlotY,
                        rectPlotX: point.rectPlotX,
                        yBottom: point.yBottom,
                        // plotHighX is for polar charts
                        plotX: pick(point.plotHighX, point.plotX),
                        plotY: point.plotHigh,
                        isNull: point.isNull
                    };
                    highAreaPoints.push(pointShim);
                    highPoints.push(pointShim);
                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i - 1] || points[i - 1].isNull)) {
                        highAreaPoints.push(highAreaPoint);
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
                linePath = []
                    .concat(lowerPath, higherPath);
                // For the area path, we need to change the 'move' statement into
                // 'lineTo'
                if (!this.chart.polar &&
                    higherAreaPath[0] &&
                    higherAreaPath[0][0] === 'M') {
                    // This probably doesn't work for spline
                    higherAreaPath[0] = [
                        'L',
                        higherAreaPath[0][1],
                        higherAreaPath[0][2]
                    ];
                }
                this.graphPath = linePath;
                this.areaPath = lowerPath.concat(higherAreaPath);
                // Prepare for sideways animation
                linePath.isArea = true;
                linePath.xMap = lowerPath.xMap;
                this.areaPath.xMap = lowerPath.xMap;
                return linePath;
            };
            /**
             * Extend the basic drawDataLabels method by running it for both lower and
             * higher values.
             * @private
             */
            AreaRangeSeries.prototype.drawDataLabels = function () {
                var data = this.points,
                    length = data.length,
                    i,
                    originalDataLabels = [],
                    dataLabelOptions = this.options.dataLabels,
                    point,
                    up,
                    inverted = this.chart.inverted,
                    upperDataLabelOptions,
                    lowerDataLabelOptions;
                if (dataLabelOptions) {
                    // Split into upper and lower options. If data labels is an array,
                    // the first element is the upper label, the second is the lower.
                    //
                    // TODO: We want to change this and allow multiple labels for both
                    // upper and lower values in the future - introducing some options
                    // for which point value to use as Y for the dataLabel, so that this
                    // could be handled in Series.drawDataLabels. This would also
                    // improve performance since we now have to loop over all the points
                    // multiple times to work around the data label logic.
                    if (isArray(dataLabelOptions)) {
                        upperDataLabelOptions = dataLabelOptions[0] || {
                            enabled: false
                        };
                        lowerDataLabelOptions = dataLabelOptions[1] || {
                            enabled: false
                        };
                    }
                    else {
                        // Make copies
                        upperDataLabelOptions = extend({}, dataLabelOptions);
                        upperDataLabelOptions.x = dataLabelOptions.xHigh;
                        upperDataLabelOptions.y = dataLabelOptions.yHigh;
                        lowerDataLabelOptions = extend({}, dataLabelOptions);
                        lowerDataLabelOptions.x = dataLabelOptions.xLow;
                        lowerDataLabelOptions.y = dataLabelOptions.yLow;
                    }
                    // Draw upper labels
                    if (upperDataLabelOptions.enabled || this._hasPointLabels) {
                        // Set preliminary values for plotY and dataLabel
                        // and draw the upper labels
                        i = length;
                        while (i--) {
                            point = data[i];
                            if (point) {
                                up = upperDataLabelOptions.inside ?
                                    point.plotHigh < point.plotLow :
                                    point.plotHigh > point.plotLow;
                                point.y = point.high;
                                point._plotY = point.plotY;
                                point.plotY = point.plotHigh;
                                // Store original data labels and set preliminary label
                                // objects to be picked up in the uber method
                                originalDataLabels[i] = point.dataLabel;
                                point.dataLabel = point.dataLabelUpper;
                                // Set the default offset
                                point.below = up;
                                if (inverted) {
                                    if (!upperDataLabelOptions.align) {
                                        upperDataLabelOptions.align = up ?
                                            'right' : 'left';
                                    }
                                }
                                else {
                                    if (!upperDataLabelOptions.verticalAlign) {
                                        upperDataLabelOptions.verticalAlign = up ?
                                            'top' :
                                            'bottom';
                                    }
                                }
                            }
                        }
                        this.options.dataLabels = upperDataLabelOptions;
                        if (seriesProto.drawDataLabels) {
                            // #1209:
                            seriesProto.drawDataLabels.apply(this, arguments);
                        }
                        // Reset state after the upper labels were created. Move
                        // it to point.dataLabelUpper and reassign the originals.
                        // We do this here to support not drawing a lower label.
                        i = length;
                        while (i--) {
                            point = data[i];
                            if (point) {
                                point.dataLabelUpper = point.dataLabel;
                                point.dataLabel = originalDataLabels[i];
                                delete point.dataLabels;
                                point.y = point.low;
                                point.plotY = point._plotY;
                            }
                        }
                    }
                    // Draw lower labels
                    if (lowerDataLabelOptions.enabled || this._hasPointLabels) {
                        i = length;
                        while (i--) {
                            point = data[i];
                            if (point) {
                                up = lowerDataLabelOptions.inside ?
                                    point.plotHigh < point.plotLow :
                                    point.plotHigh > point.plotLow;
                                // Set the default offset
                                point.below = !up;
                                if (inverted) {
                                    if (!lowerDataLabelOptions.align) {
                                        lowerDataLabelOptions.align = up ?
                                            'left' : 'right';
                                    }
                                }
                                else {
                                    if (!lowerDataLabelOptions.verticalAlign) {
                                        lowerDataLabelOptions.verticalAlign = up ?
                                            'bottom' :
                                            'top';
                                    }
                                }
                            }
                        }
                        this.options.dataLabels = lowerDataLabelOptions;
                        if (seriesProto.drawDataLabels) {
                            seriesProto.drawDataLabels.apply(this, arguments);
                        }
                    }
                    // Merge upper and lower into point.dataLabels for later destroying
                    if (upperDataLabelOptions.enabled) {
                        i = length;
                        while (i--) {
                            point = data[i];
                            if (point) {
                                point.dataLabels = [
                                    point.dataLabelUpper,
                                    point.dataLabel
                                ].filter(function (label) {
                                    return !!label;
                                });
                            }
                        }
                    }
                    // Reset options
                    this.options.dataLabels = dataLabelOptions;
                }
            };
            AreaRangeSeries.prototype.alignDataLabel = function () {
                columnProto.alignDataLabel.apply(this, arguments);
            };
            AreaRangeSeries.prototype.drawPoints = function () {
                var series = this,
                    pointLength = series.points.length,
                    point,
                    i;
                // Draw bottom points
                seriesProto.drawPoints.apply(series, arguments);
                // Prepare drawing top points
                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    // Save original props to be overridden by temporary props for top
                    // points
                    point.origProps = {
                        plotY: point.plotY,
                        plotX: point.plotX,
                        isInside: point.isInside,
                        negative: point.negative,
                        zone: point.zone,
                        y: point.y
                    };
                    point.lowerGraphic = point.graphic;
                    point.graphic = point.upperGraphic;
                    point.plotY = point.plotHigh;
                    if (defined(point.plotHighX)) {
                        point.plotX = point.plotHighX;
                    }
                    point.y = pick(point.high, point.origProps.y); // #15523
                    point.negative = point.y < (series.options.threshold || 0);
                    if (series.zones.length) {
                        point.zone = point.getZone();
                    }
                    if (!series.chart.polar) {
                        point.isInside = point.isTopInside = (typeof point.plotY !== 'undefined' &&
                            point.plotY >= 0 &&
                            point.plotY <= series.yAxis.len && // #3519
                            point.plotX >= 0 &&
                            point.plotX <= series.xAxis.len);
                    }
                    i++;
                }
                // Draw top points
                seriesProto.drawPoints.apply(series, arguments);
                // Reset top points preliminary modifications
                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    point.upperGraphic = point.graphic;
                    point.graphic = point.lowerGraphic;
                    if (point.origProps) {
                        extend(point, point.origProps);
                        delete point.origProps;
                    }
                    i++;
                }
            };
            /**
             * The area range series is a carteseian series with higher and lower
             * values for each point along an X axis, where the area between the
             * values is shaded.
             *
             * @sample {highcharts} highcharts/demo/arearange/
             *         Area range chart
             * @sample {highstock} stock/demo/arearange/
             *         Area range chart
             *
             * @extends      plotOptions.area
             * @product      highcharts highstock
             * @excluding    stack, stacking
             * @requires     highcharts-more
             * @optionparent plotOptions.arearange
             */
            AreaRangeSeries.defaultOptions = merge(AreaSeries.defaultOptions, {
                /**
                 * @see [fillColor](#plotOptions.arearange.fillColor)
                 * @see [fillOpacity](#plotOptions.arearange.fillOpacity)
                 *
                 * @apioption plotOptions.arearange.color
                 */
                /**
                 * @default   low
                 * @apioption plotOptions.arearange.colorKey
                 */
                /**
                 * @see [color](#plotOptions.arearange.color)
                 * @see [fillOpacity](#plotOptions.arearange.fillOpacity)
                 *
                 * @apioption plotOptions.arearange.fillColor
                 */
                /**
                 * @see [color](#plotOptions.arearange.color)
                 * @see [fillColor](#plotOptions.arearange.fillColor)
                 *
                 * @default   {highcharts} 0.75
                 * @default   {highstock} 0.75
                 * @apioption plotOptions.arearange.fillOpacity
                 */
                /**
                 * Whether to apply a drop shadow to the graph line. Since 2.3 the
                 * shadow can be an object configuration containing `color`, `offsetX`,
                 * `offsetY`, `opacity` and `width`.
                 *
                 * @type      {boolean|Highcharts.ShadowOptionsObject}
                 * @product   highcharts
                 * @apioption plotOptions.arearange.shadow
                 */
                /**
                 * Pixel width of the arearange graph line.
                 *
                 * @since 2.3.0
                 *
                 * @private
                 */
                lineWidth: 1,
                threshold: null,
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
                        '{series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
                },
                /**
                 * Whether the whole area or just the line should respond to mouseover
                 * tooltips and other mouse or touch events.
                 *
                 * @since 2.3.0
                 *
                 * @private
                 */
                trackByArea: true,
                /**
                 * Extended data labels for range series types. Range series data
                 * labels use no `x` and `y` options. Instead, they have `xLow`,
                 * `xHigh`, `yLow` and `yHigh` options to allow the higher and lower
                 * data label sets individually.
                 *
                 * @declare Highcharts.SeriesAreaRangeDataLabelsOptionsObject
                 * @exclude x, y
                 * @since   2.3.0
                 * @product highcharts highstock
                 *
                 * @private
                 */
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    /**
                     * X offset of the lower data labels relative to the point value.
                     *
                     * @sample highcharts/plotoptions/arearange-datalabels/
                     *         Data labels on range series
                     * @sample highcharts/plotoptions/arearange-datalabels/
                     *         Data labels on range series
                     */
                    xLow: 0,
                    /**
                     * X offset of the higher data labels relative to the point value.
                     *
                     * @sample highcharts/plotoptions/arearange-datalabels/
                     *         Data labels on range series
                     */
                    xHigh: 0,
                    /**
                     * Y offset of the lower data labels relative to the point value.
                     *
                     * @sample highcharts/plotoptions/arearange-datalabels/
                     *         Data labels on range series
                     */
                    yLow: 0,
                    /**
                     * Y offset of the higher data labels relative to the point value.
                     *
                     * @sample highcharts/plotoptions/arearange-datalabels/
                     *         Data labels on range series
                     */
                    yHigh: 0
                }
            });
            return AreaRangeSeries;
        }(AreaSeries));
        extend(AreaRangeSeries.prototype, {
            pointArrayMap: ['low', 'high'],
            pointValKey: 'low',
            deferTranslatePolar: true,
            pointClass: AreaRangePoint,
            setStackedPoints: noop
        });
        SeriesRegistry.registerSeriesType('arearange', AreaRangeSeries);
        /* *
         *
         *  Default export
         *
         * */
        /**
         * A `arearange` series. If the [type](#series.arearange.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         *
         * @extends   series,plotOptions.arearange
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.arearange
         */
        /**
         * @see [fillColor](#series.arearange.fillColor)
         * @see [fillOpacity](#series.arearange.fillOpacity)
         *
         * @apioption series.arearange.color
         */
        /**
         * An array of data points for the series. For the `arearange` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         *     correspond to `x,low,high`. If the first value is a string, it is
         *     applied as the name of the point, and the `x` value is inferred.
         *     The `x` value can also be omitted, in which case the inner arrays
         *     should be of length 2\. Then the `x` value is automatically calculated,
         *     either starting at 0 and incremented by 1, or from `pointStart`
         *     and `pointInterval` given in the series options.
         *     ```js
         *     data: [
         *         [0, 8, 3],
         *         [1, 1, 1],
         *         [2, 6, 8]
         *     ]
         *     ```
         *
         * 2.  An array of objects with named values. The following snippet shows only a
         *     few settings, see the complete options set below. If the total number of
         *     data points exceeds the series'
         *     [turboThreshold](#series.arearange.turboThreshold),
         *     this option is not available.
         *     ```js
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
         *     ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.line.data
         * @excluding marker, y
         * @product   highcharts highstock
         * @apioption series.arearange.data
         */
        /**
         * @extends   series.arearange.dataLabels
         * @product   highcharts highstock
         * @apioption series.arearange.data.dataLabels
         */
        /**
         * @see [color](#series.arearange.color)
         * @see [fillOpacity](#series.arearange.fillOpacity)
         *
         * @apioption series.arearange.fillColor
         */
        /**
         * @see [color](#series.arearange.color)
         * @see [fillColor](#series.arearange.fillColor)
         *
         * @default   {highcharts} 0.75
         * @default   {highstock} 0.75
         * @apioption series.arearange.fillOpacity
         */
        /**
         * The high or maximum value for each data point.
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.arearange.data.high
         */
        /**
         * The low or minimum value for each data point.
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.arearange.data.low
         */
        ''; // adds doclets above to tranpiled file

        return AreaRangeSeries;
    });
    _registerModule(_modules, 'Series/AreaSplineRange/AreaSplineRangeSeries.js', [_modules['Series/AreaRange/AreaRangeSeries.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (AreaRangeSeries, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var SplineSeries = SeriesRegistry.seriesTypes.spline;
        var merge = U.merge,
            extend = U.extend;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The areasplinerange series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.areasplinerange
         *
         * @augments Highcharts.Series
         */
        var AreaSplineRangeSeries = /** @class */ (function (_super) {
                __extends(AreaSplineRangeSeries, _super);
            function AreaSplineRangeSeries() {
                /* *
                 *
                 *  Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.options = void 0;
                _this.data = void 0;
                _this.points = void 0;
                return _this;
            }
            /**
             * The area spline range is a cartesian series type with higher and
             * lower Y values along an X axis. The area inside the range is colored, and
             * the graph outlining the area is a smoothed spline.
             *
             * @sample {highstock|highstock} stock/demo/areasplinerange/
             *         Area spline range
             *
             * @extends   plotOptions.arearange
             * @since     2.3.0
             * @excluding step, boostThreshold, boostBlending
             * @product   highcharts highstock
             * @requires  highcharts-more
             * @apioption plotOptions.areasplinerange
             */
            /**
             * @see [fillColor](#plotOptions.areasplinerange.fillColor)
             * @see [fillOpacity](#plotOptions.areasplinerange.fillOpacity)
             *
             * @apioption plotOptions.areasplinerange.color
             */
            /**
             * @see [color](#plotOptions.areasplinerange.color)
             * @see [fillOpacity](#plotOptions.areasplinerange.fillOpacity)
             *
             * @apioption plotOptions.areasplinerange.fillColor
             */
            /**
             * @see [color](#plotOptions.areasplinerange.color)
             * @see [fillColor](#plotOptions.areasplinerange.fillColor)
             *
             * @default   {highcharts} 0.75
             * @default   {highstock} 0.75
             * @apioption plotOptions.areasplinerange.fillOpacity
             */
            AreaSplineRangeSeries.defaultOptions = merge(AreaRangeSeries.defaultOptions);
            return AreaSplineRangeSeries;
        }(AreaRangeSeries));
        extend(AreaSplineRangeSeries.prototype, {
            getPointSpline: SplineSeries.prototype.getPointSpline
        });
        SeriesRegistry.registerSeriesType('areasplinerange', AreaSplineRangeSeries);
        /* *
         *
         *  Default export
         *
         * */
        /* *
         *
         *  API options
         *
         * */
        /**
         * A `areasplinerange` series. If the [type](#series.areasplinerange.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.areasplinerange
         * @excluding dataParser, dataURL, stack, step, boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.areasplinerange
         */
        /**
         * @see [fillColor](#series.areasplinerange.fillColor)
         * @see [fillOpacity](#series.areasplinerange.fillOpacity)
         *
         * @apioption series.areasplinerange.color
         */
        /**
         * An array of data points for the series. For the `areasplinerange`
         * series type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 0, 5],
         *        [1, 9, 1],
         *        [2, 5, 2]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.areasplinerange.turboThreshold), this option is
         *    not available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 5,
         *        high: 0,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 4,
         *        high: 1,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @product   highcharts highstock
         * @apioption series.areasplinerange.data
         */
        /**
         * @see [color](#series.areasplinerange.color)
         * @see [fillOpacity](#series.areasplinerange.fillOpacity)
         *
         * @apioption series.areasplinerange.fillColor
         */
        /**
         * @see [color](#series.areasplinerange.color)
         * @see [fillColor](#series.areasplinerange.fillColor)
         *
         * @default   {highcharts} 0.75
         * @default   {highstock} 0.75
         * @apioption series.areasplinerange.fillOpacity
         */
        ''; // adds doclets above to transpiled file

        return AreaSplineRangeSeries;
    });
    _registerModule(_modules, 'Series/BoxPlot/BoxPlotSeries.js', [_modules['Series/Column/ColumnSeries.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ColumnSeries, H, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var noop = H.noop;
        var extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        /**
         * The boxplot series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes#boxplot
         *
         * @augments Highcharts.Series
         */
        /* *
         *
         *  Class
         *
         * */
        var BoxPlotSeries = /** @class */ (function (_super) {
                __extends(BoxPlotSeries, _super);
            function BoxPlotSeries() {
                /* *
                 *
                 * Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 * Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             * Functions
             *
             * */
            // Get presentational attributes
            BoxPlotSeries.prototype.pointAttribs = function () {
                // No attributes should be set on point.graphic which is the group
                return {};
            };
            // Translate data points from raw values x and y to plotX and plotY
            BoxPlotSeries.prototype.translate = function () {
                var series = this,
                    yAxis = series.yAxis,
                    pointArrayMap = series.pointArrayMap;
                _super.prototype.translate.apply(series);
                // do the translation on each point dimension
                series.points.forEach(function (point) {
                    pointArrayMap.forEach(function (key) {
                        if (point[key] !== null) {
                            point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                        }
                    });
                    point.plotHigh = point.highPlot; // For data label validation
                });
            };
            // eslint-disable-next-line valid-jsdoc
            /**
             * Draw the data points
             * @private
             */
            BoxPlotSeries.prototype.drawPoints = function () {
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
                    // error bar inherits this series type but doesn't do quartiles
                    doQuartiles = series.doQuartiles !== false,
                    pointWiskerLength,
                    whiskerLength = series.options.whiskerLength;
                points.forEach(function (point) {
                    var graphic = point.graphic,
                        verb = graphic ? 'animate' : 'attr',
                        shapeArgs = point.shapeArgs,
                        boxAttr = {},
                        stemAttr = {},
                        whiskersAttr = {},
                        medianAttr = {},
                        color = point.color || series.color;
                    if (typeof point.plotY !== 'undefined') {
                        // crisp vector coordinates
                        width = Math.round(shapeArgs.width);
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
                        if (!chart.styledMode) {
                            // Stem attributes
                            stemAttr.stroke =
                                point.stemColor || options.stemColor || color;
                            stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
                            stemAttr.dashstyle = (point.stemDashStyle ||
                                options.stemDashStyle ||
                                options.dashStyle);
                            point.stem.attr(stemAttr);
                            // Whiskers attributes
                            if (whiskerLength) {
                                whiskersAttr.stroke = (point.whiskerColor ||
                                    options.whiskerColor ||
                                    color);
                                whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
                                whiskersAttr.dashstyle = (point.whiskerDashStyle ||
                                    options.whiskerDashStyle ||
                                    options.dashStyle);
                                point.whiskers.attr(whiskersAttr);
                            }
                            if (doQuartiles) {
                                boxAttr.fill = (point.fillColor ||
                                    options.fillColor ||
                                    color);
                                boxAttr.stroke = options.lineColor || color;
                                boxAttr['stroke-width'] = options.lineWidth || 0;
                                boxAttr.dashstyle = (point.boxDashStyle ||
                                    options.boxDashStyle ||
                                    options.dashStyle);
                                point.box.attr(boxAttr);
                            }
                            // Median attributes
                            medianAttr.stroke = (point.medianColor ||
                                options.medianColor ||
                                color);
                            medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);
                            medianAttr.dashstyle = (point.medianDashStyle ||
                                options.medianDashStyle ||
                                options.dashStyle);
                            point.medianShape.attr(medianAttr);
                        }
                        var d = void 0;
                        // The stem
                        crispCorr = (point.stem.strokeWidth() % 2) / 2;
                        crispX = left + halfWidth + crispCorr;
                        d = [
                            // stem up
                            ['M', crispX, q3Plot],
                            ['L', crispX, highPlot],
                            // stem down
                            ['M', crispX, q1Plot],
                            ['L', crispX, lowPlot]
                        ];
                        point.stem[verb]({ d: d });
                        // The box
                        if (doQuartiles) {
                            crispCorr = (point.box.strokeWidth() % 2) / 2;
                            q1Plot = Math.floor(q1Plot) + crispCorr;
                            q3Plot = Math.floor(q3Plot) + crispCorr;
                            left += crispCorr;
                            right += crispCorr;
                            d = [
                                ['M', left, q3Plot],
                                ['L', left, q1Plot],
                                ['L', right, q1Plot],
                                ['L', right, q3Plot],
                                ['L', left, q3Plot],
                                ['Z']
                            ];
                            point.box[verb]({ d: d });
                        }
                        // The whiskers
                        if (whiskerLength) {
                            crispCorr = (point.whiskers.strokeWidth() % 2) / 2;
                            highPlot = highPlot + crispCorr;
                            lowPlot = lowPlot + crispCorr;
                            pointWiskerLength = (/%$/).test(whiskerLength) ?
                                halfWidth * parseFloat(whiskerLength) / 100 :
                                whiskerLength / 2;
                            d = [
                                // High whisker
                                ['M', crispX - pointWiskerLength, highPlot],
                                ['L', crispX + pointWiskerLength, highPlot],
                                // Low whisker
                                ['M', crispX - pointWiskerLength, lowPlot],
                                ['L', crispX + pointWiskerLength, lowPlot]
                            ];
                            point.whiskers[verb]({ d: d });
                        }
                        // The median
                        medianPlot = Math.round(point.medianPlot);
                        crispCorr = (point.medianShape.strokeWidth() % 2) / 2;
                        medianPlot = medianPlot + crispCorr;
                        d = [
                            ['M', left, medianPlot],
                            ['L', right, medianPlot]
                        ];
                        point.medianShape[verb]({ d: d });
                    }
                });
            };
            // return a plain array for speedy calculation
            BoxPlotSeries.prototype.toYData = function (point) {
                return [point.low, point.q1, point.median, point.q3, point.high];
            };
            /**
             * A box plot is a convenient way of depicting groups of data through their
             * five-number summaries: the smallest observation (sample minimum), lower
             * quartile (Q1), median (Q2), upper quartile (Q3), and largest observation
             * (sample maximum).
             *
             * @sample highcharts/demo/box-plot/
             *         Box plot
             *
             * @extends      plotOptions.column
             * @excluding    borderColor, borderRadius, borderWidth, groupZPadding,
             *               states, boostThreshold, boostBlending
             * @product      highcharts
             * @requires     highcharts-more
             * @optionparent plotOptions.boxplot
             */
            BoxPlotSeries.defaultOptions = merge(ColumnSeries.defaultOptions, {
                threshold: null,
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
                        '{series.name}</b><br/>' +
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
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         True by default
                 *
                 * @type    {number|string}
                 * @since   3.0
                 * @product highcharts
                 */
                whiskerLength: '50%',
                /**
                 * The fill color of the box.
                 *
                 * In styled mode, the fill color can be set with the
                 * `.highcharts-boxplot-box` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default #ffffff
                 * @since   3.0
                 * @product highcharts
                 */
                fillColor: "#ffffff" /* backgroundColor */,
                /**
                 * The width of the line surrounding the box. If any of
                 * [stemWidth](#plotOptions.boxplot.stemWidth),
                 * [medianWidth](#plotOptions.boxplot.medianWidth)
                 * or [whiskerWidth](#plotOptions.boxplot.whiskerWidth) are `null`,
                 * the lineWidth also applies to these lines.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @since   3.0
                 * @product highcharts
                 */
                lineWidth: 1,
                /**
                 * The color of the median line. If `undefined`, the general series
                 * color applies.
                 *
                 * In styled mode, the median stroke width can be set with the
                 * `.highcharts-boxplot-median` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject}
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.medianColor
                 */
                /**
                 * The pixel width of the median line. If `null`, the
                 * [lineWidth](#plotOptions.boxplot.lineWidth) is used.
                 *
                 * In styled mode, the median stroke width can be set with the
                 * `.highcharts-boxplot-median` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @type    {number|null}
                 * @since   3.0
                 * @product highcharts
                 */
                medianWidth: 2,
                /*
                // States are not working and are removed from docs.
                // Refer to: #2340
                states: {
                    hover: {
                        brightness: -0.3
                    }
                },

                /**
                 * The color of the stem, the vertical line extending from the box to
                 * the whiskers. If `undefined`, the series color is used.
                 *
                 * In styled mode, the stem stroke can be set with the
                 * `.highcharts-boxplot-stem` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.stemColor
                 */
                /**
                 * The dash style of the box.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @default   Solid
                 * @since 8.1.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.boxDashStyle
                 */
                /**
                 * The dash style of the median.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @default   Solid
                 * @since 8.1.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.medianDashStyle
                 */
                /**
                 * The dash style of the stem, the vertical line extending from the
                 * box to the whiskers.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @default   Solid
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.stemDashStyle
                 */
                /**
                 * The dash style of the whiskers.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @default   Solid
                 * @since 8.1.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.whiskerDashStyle
                 */
                /**
                 * The width of the stem, the vertical line extending from the box to
                 * the whiskers. If `undefined`, the width is inherited from the
                 * [lineWidth](#plotOptions.boxplot.lineWidth) option.
                 *
                 * In styled mode, the stem stroke width can be set with the
                 * `.highcharts-boxplot-stem` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type      {number}
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.stemWidth
                 */
                /**
                 * @default   high
                 * @apioption plotOptions.boxplot.colorKey
                 */
                /**
                 * The color of the whiskers, the horizontal lines marking low and high
                 * values. When `undefined`, the general series color is used.
                 *
                 * In styled mode, the whisker stroke can be set with the
                 * `.highcharts-boxplot-whisker` class .
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.boxplot.whiskerColor
                 */
                /**
                 * The line width of the whiskers, the horizontal lines marking low and
                 * high values. When `undefined`, the general
                 * [lineWidth](#plotOptions.boxplot.lineWidth) applies.
                 *
                 * In styled mode, the whisker stroke width can be set with the
                 * `.highcharts-boxplot-whisker` class.
                 *
                 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
                 *         Box plot styling
                 * @sample {highcharts} highcharts/css/boxplot/
                 *         Box plot in styled mode
                 *
                 * @since   3.0
                 * @product highcharts
                 */
                whiskerWidth: 2
            });
            return BoxPlotSeries;
        }(ColumnSeries));
        extend(BoxPlotSeries.prototype, {
            // array point configs are mapped to this
            pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
            // defines the top of the tracker
            pointValKey: 'high',
            // Disable data labels for box plot
            drawDataLabels: noop,
            setStackedPoints: noop // #3890
        });
        /* *
         *
         * Registry
         *
         * */
        SeriesRegistry.registerSeriesType('boxplot', BoxPlotSeries);
        /* *
         *
         * Default Export
         *
         * */
        /* *
         *
         * API Options
         *
         * */
        /**
         * A `boxplot` series. If the [type](#series.boxplot.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.boxplot
         * @excluding dataParser, dataURL, marker, stack, stacking, states,
         *            boostThreshold, boostBlending
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.boxplot
         */
        /**
         * An array of data points for the series. For the `boxplot` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 6 or 5 values. In this case, the values correspond
         *    to `x,low,q1,median,q3,high`. If the first value is a string, it is
         *    applied as the name of the point, and the `x` value is inferred. The `x`
         *    value can also be omitted, in which case the inner arrays should be of
         *    length 5. Then the `x` value is automatically calculated, either starting
         *    at 0 and incremented by 1, or from `pointStart` and `pointInterval` given
         *    in the series options.
         *    ```js
         *    data: [
         *        [0, 3, 0, 10, 3, 5],
         *        [1, 7, 8, 7, 2, 9],
         *        [2, 6, 9, 5, 1, 3]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.boxplot.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 4,
         *        q1: 9,
         *        median: 9,
         *        q3: 1,
         *        high: 10,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        q1: 7,
         *        median: 3,
         *        q3: 6,
         *        high: 2,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number,number,number,number>|Array<(number|string),number,number,number,number,number>|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts
         * @apioption series.boxplot.data
         */
        /**
         * The `high` value for each data point, signifying the highest value
         * in the sample set. The top whisker is drawn here.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.high
         */
        /**
         * The `low` value for each data point, signifying the lowest value
         * in the sample set. The bottom whisker is drawn here.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.low
         */
        /**
         * The median for each data point. This is drawn as a line through the
         * middle area of the box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.median
         */
        /**
         * The lower quartile for each data point. This is the bottom of the
         * box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.q1
         */
        /**
         * The higher quartile for each data point. This is the top of the box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.q3
         */
        /**
         * The dash style of the box.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.boxDashStyle
         */
        /**
         * The dash style of the median.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.medianDashStyle
         */
        /**
         * The dash style of the stem.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.stemDashStyle
         */
        /**
         * The dash style of the whiskers.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.whiskerDashStyle
         */
        ''; // adds doclets above to transpiled file

        return BoxPlotSeries;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleLegendDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * The bubble legend is an additional element in legend which
         * presents the scale of the bubble series. Individual bubble ranges
         * can be defined by user or calculated from series. In the case of
         * automatically calculated ranges, a 1px margin of error is
         * permitted.
         *
         * @since        7.0.0
         * @product      highcharts highstock highmaps
         * @requires     highcharts-more
         * @optionparent legend.bubbleLegend
         */
        var BubbleLegendDefaults = {
                /**
                 * The color of the ranges borders,
            can be also defined for an
                 * individual range.
                 *
                 * @sample highcharts/bubble-legend/similartoseries/
                 *         Similar look to the bubble series
                 * @sample highcharts/bubble-legend/bordercolor/
                 *         Individual bubble border color
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: void 0,
                /**
                 * The width of the ranges borders in pixels,
            can be also
                 * defined for an individual range.
                 */
                borderWidth: 2,
                /**
                 * An additional class name to apply to the bubble legend'
                 * circle graphical elements. This option does not replace
                 * default class names of the graphical element.
                 *
                 * @sample {highcharts} highcharts/css/bubble-legend/
                 *         Styling by CSS
                 *
                 * @type {string}
                 */
                className: void 0,
                /**
                 * The main color of the bubble legend. Applies to ranges,
            if
                 * individual color is not defined.
                 *
                 * @sample highcharts/bubble-legend/similartoseries/
                 *         Similar look to the bubble series
                 * @sample highcharts/bubble-legend/color/
                 *         Individual bubble color
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                color: void 0,
                /**
                 * An additional class name to apply to the bubble legend's
                 * connector graphical elements. This option does not replace
                 * default class names of the graphical element.
                 *
                 * @sample {highcharts} highcharts/css/bubble-legend/
                 *         Styling by CSS
                 *
                 * @type {string}
                 */
                connectorClassName: void 0,
                /**
                 * The color of the connector,
            can be also defined
                 * for an individual range.
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                connectorColor: void 0,
                /**
                 * The length of the connectors in pixels. If labels are
                 * centered,
            the distance is reduced to 0.
                 *
                 * @sample highcharts/bubble-legend/connectorandlabels/
                 *         Increased connector length
                 */
                connectorDistance: 60,
                /**
                 * The width of the connectors in pixels.
                 *
                 * @sample highcharts/bubble-legend/connectorandlabels/
                 *         Increased connector width
                 */
                connectorWidth: 1,
                /**
                 * Enable or disable the bubble legend.
                 */
                enabled: false,
                /**
                 * Options for the bubble legend labels.
                 */
                labels: {
                    /**
                     * An additional class name to apply to the bubble legend
                     * label graphical elements. This option does not replace
                     * default class names of the graphical element.
                     *
                     * @sample {highcharts} highcharts/css/bubble-legend/
                     *         Styling by CSS
                     *
                     * @type {string}
                     */
                    className: void 0,
                    /**
                     * Whether to allow data labels to overlap.
                     */
                    allowOverlap: false,
                    /**
                     * A format string for the bubble legend labels. Available
                     * variables are the same as for `formatter`.
                     *
                     * @sample highcharts/bubble-legend/format/
                     *         Add a unit
                     *
                     * @type {string}
                     */
                    format: '',
                    /**
                     * Available `this` properties are:
                     *
                     * - `this.value`: The bubble value.
                     *
                     * - `this.radius`: The radius of the bubble range.
                     *
                     * - `this.center`: The center y position of the range.
                     *
                     * @type {Highcharts.FormatterCallbackFunction<Highcharts.BubbleLegendFormatterContextObject>}
                     */
                    formatter: void 0,
                    /**
                     * The alignment of the labels compared to the bubble
                     * legend. Can be one of `left`,
            `center` or `right`.
                     *
                     * @sample highcharts/bubble-legend/connectorandlabels/
                     *         Labels on left
                     *
                     * @type {Highcharts.AlignValue}
                     */
                    align: 'right',
                    /**
                     * CSS styles for the labels.
                     *
                     * @type {Highcharts.CSSObject}
                     */
                    style: {
                        /** @ignore-option */
                        fontSize: '10px',
                        /** @ignore-option */
                        color: "#000000" /* neutralColor100 */
                    },
                    /**
                     * The x position offset of the label relative to the
                     * connector.
                     */
                    x: 0,
                    /**
                     * The y position offset of the label relative to the
                     * connector.
                     */
                    y: 0
                },
                /**
                 * Miximum bubble legend range size. If values for ranges are
                 * not specified,
            the `minSize` and the `maxSize` are calculated
                 * from bubble series.
                 */
                maxSize: 60,
                /**
                 * Minimum bubble legend range size. If values for ranges are
                 * not specified,
            the `minSize` and the `maxSize` are calculated
                 * from bubble series.
                 */
                minSize: 10,
                /**
                 * The position of the bubble legend in the legend.
                 * @sample highcharts/bubble-legend/connectorandlabels/
                 *         Bubble legend as last item in legend
                 */
                legendIndex: 0,
                /**
                 * Options for specific range. One range consists of bubble,
                 * label and connector.
                 *
                 * @sample highcharts/bubble-legend/ranges/
                 *         Manually defined ranges
                 * @sample highcharts/bubble-legend/autoranges/
                 *         Auto calculated ranges
                 *
                 * @type {Array<*>}
                 */
                ranges: {
                    /**
                     * Range size value,
            similar to bubble Z data.
                     * @type {number}
                     */
                    value: void 0,
                    /**
                     * The color of the border for individual range.
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    borderColor: void 0,
                    /**
                     * The color of the bubble for individual range.
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    color: void 0,
                    /**
                     * The color of the connector for individual range.
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    connectorColor: void 0
                },
                /**
                 * Whether the bubble legend range value should be represented
                 * by the area or the width of the bubble. The default,
            area,
                 * corresponds best to the human perception of the size of each
                 * bubble.
                 *
                 * @sample highcharts/bubble-legend/ranges/
                 *         Size by width
                 *
                 * @type {Highcharts.BubbleSizeByValue}
                 */
                sizeBy: 'area',
                /**
                 * When this is true,
            the absolute value of z determines the
                 * size of the bubble. This means that with the default
                 * zThreshold of 0,
            a bubble of value -1 will have the same size
                 * as a bubble of value 1,
            while a bubble of value 0 will have a
                 * smaller size according to minSize.
                 */
                sizeByAbsoluteValue: false,
                /**
                 * Define the visual z index of the bubble legend.
                 */
                zIndex: 1,
                /**
                 * Ranges with with lower value than zThreshold,
            are skipped.
                 */
                zThreshold: 0
            };
        /* *
         *
         *  Default Export
         *
         * */

        return BubbleLegendDefaults;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleLegendItem.js', [_modules['Core/Color/Color.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Color, F, H, U) {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var noop = H.noop;
        var arrayMax = U.arrayMax,
            arrayMin = U.arrayMin,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick,
            stableSort = U.stableSort;
        /**
         * @interface Highcharts.BubbleLegendFormatterContextObject
         */ /**
        * The center y position of the range.
        * @name Highcharts.BubbleLegendFormatterContextObject#center
        * @type {number}
        */ /**
        * The radius of the bubble range.
        * @name Highcharts.BubbleLegendFormatterContextObject#radius
        * @type {number}
        */ /**
        * The bubble value.
        * @name Highcharts.BubbleLegendFormatterContextObject#value
        * @type {number}
        */
        ''; // detach doclets above
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * BubbleLegend class.
         *
         * @private
         * @class
         * @name Highcharts.BubbleLegend
         * @param {Highcharts.LegendBubbleLegendOptions} options
         * Options of BubbleLegendItem.
         *
         * @param {Highcharts.Legend} legend
         * Legend of item.
         */
        var BubbleLegendItem = /** @class */ (function () {
                function BubbleLegendItem(options, legend) {
                    this.chart = void 0;
                this.fontMetrics = void 0;
                this.legend = void 0;
                this.legendGroup = void 0;
                this.legendItem = void 0;
                this.legendItemHeight = void 0;
                this.legendItemWidth = void 0;
                this.legendSymbol = void 0;
                this.maxLabel = void 0;
                this.movementX = void 0;
                this.ranges = void 0;
                this.selected = void 0;
                this.visible = void 0;
                this.symbols = void 0;
                this.options = void 0;
                this.setState = noop;
                this.init(options, legend);
            }
            /**
             * Create basic bubbleLegend properties similar to item in legend.
             *
             * @private
             * @function Highcharts.BubbleLegend#init
             * @param {Highcharts.LegendBubbleLegendOptions} options
             *        Bubble legend options
             * @param {Highcharts.Legend} legend
             *        Legend
             */
            BubbleLegendItem.prototype.init = function (options, legend) {
                this.options = options;
                this.visible = true;
                this.chart = legend.chart;
                this.legend = legend;
            };
            /**
             * Depending on the position option, add bubbleLegend to legend items.
             *
             * @private
             * @function Highcharts.BubbleLegend#addToLegend
             * @param {Array<(Highcharts.Point|Highcharts.Series)>} items
             * All legend items
             */
            BubbleLegendItem.prototype.addToLegend = function (items) {
                // Insert bubbleLegend into legend items
                items.splice(this.options.legendIndex, 0, this);
            };
            /**
             * Calculate ranges, sizes and call the next steps of bubbleLegend
             * creation.
             *
             * @private
             * @function Highcharts.BubbleLegend#drawLegendSymbol
             * @param {Highcharts.Legend} legend
             *        Legend instance
             */
            BubbleLegendItem.prototype.drawLegendSymbol = function (legend) {
                var chart = this.chart,
                    options = this.options,
                    itemDistance = pick(legend.options.itemDistance, 20),
                    ranges = options.ranges,
                    connectorDistance = options.connectorDistance;
                var connectorSpace;
                // Predict label dimensions
                this.fontMetrics = chart.renderer.fontMetrics(options.labels.style.fontSize);
                // Do not create bubbleLegend now if ranges or ranges valeus are not
                // specified or if are empty array.
                if (!ranges || !ranges.length || !isNumber(ranges[0].value)) {
                    legend.options.bubbleLegend.autoRanges = true;
                    return;
                }
                // Sort ranges to right render order
                stableSort(ranges, function (a, b) {
                    return b.value - a.value;
                });
                this.ranges = ranges;
                this.setOptions();
                this.render();
                // Get max label size
                var maxLabel = this.getMaxLabelSize(),
                    radius = this.ranges[0].radius,
                    size = radius * 2;
                // Space for connectors and labels.
                connectorSpace =
                    connectorDistance - radius + maxLabel.width;
                connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
                this.maxLabel = maxLabel;
                this.movementX = options.labels.align === 'left' ?
                    connectorSpace : 0;
                this.legendItemWidth = size + connectorSpace + itemDistance;
                this.legendItemHeight = size + this.fontMetrics.h / 2;
            };
            /**
             * Set style options for each bubbleLegend range.
             *
             * @private
             * @function Highcharts.BubbleLegend#setOptions
             */
            BubbleLegendItem.prototype.setOptions = function () {
                var ranges = this.ranges,
                    options = this.options,
                    series = this.chart.series[options.seriesIndex],
                    baseline = this.legend.baseline,
                    bubbleAttribs = {
                        zIndex: options.zIndex,
                        'stroke-width': options.borderWidth
                    },
                    connectorAttribs = {
                        zIndex: options.zIndex,
                        'stroke-width': options.connectorWidth
                    },
                    labelAttribs = {
                        align: (this.legend.options.rtl ||
                            options.labels.align === 'left') ? 'right' : 'left',
                        zIndex: options.zIndex
                    },
                    fillOpacity = series.options.marker.fillOpacity,
                    styledMode = this.chart.styledMode;
                // Allow to parts of styles be used individually for range
                ranges.forEach(function (range, i) {
                    if (!styledMode) {
                        bubbleAttribs.stroke = pick(range.borderColor, options.borderColor, series.color);
                        bubbleAttribs.fill = pick(range.color, options.color, fillOpacity !== 1 ?
                            color(series.color).setOpacity(fillOpacity)
                                .get('rgba') :
                            series.color);
                        connectorAttribs.stroke = pick(range.connectorColor, options.connectorColor, series.color);
                    }
                    // Set options needed for rendering each range
                    ranges[i].radius = this.getRangeRadius(range.value);
                    ranges[i] = merge(ranges[i], {
                        center: (ranges[0].radius - ranges[i].radius +
                            baseline)
                    });
                    if (!styledMode) {
                        merge(true, ranges[i], {
                            bubbleAttribs: merge(bubbleAttribs),
                            connectorAttribs: merge(connectorAttribs),
                            labelAttribs: labelAttribs
                        });
                    }
                }, this);
            };
            /**
             * Calculate radius for each bubble range,
             * used code from BubbleSeries.js 'getRadius' method.
             *
             * @private
             * @function Highcharts.BubbleLegend#getRangeRadius
             * @param {number} value
             *        Range value
             * @return {number|null}
             *         Radius for one range
             */
            BubbleLegendItem.prototype.getRangeRadius = function (value) {
                var options = this.options,
                    seriesIndex = this.options.seriesIndex,
                    bubbleSeries = this.chart.series[seriesIndex],
                    zMax = options.ranges[0].value,
                    zMin = options.ranges[options.ranges.length - 1].value,
                    minSize = options.minSize,
                    maxSize = options.maxSize;
                return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
            };
            /**
             * Render the legendSymbol group.
             *
             * @private
             * @function Highcharts.BubbleLegend#render
             */
            BubbleLegendItem.prototype.render = function () {
                var renderer = this.chart.renderer,
                    zThreshold = this.options.zThreshold;
                if (!this.symbols) {
                    this.symbols = {
                        connectors: [],
                        bubbleItems: [],
                        labels: []
                    };
                }
                // Nesting SVG groups to enable handleOverflow
                this.legendSymbol = renderer.g('bubble-legend');
                this.legendItem = renderer.g('bubble-legend-item');
                // To enable default 'hideOverlappingLabels' method
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (range) {
                    if (range.value >= zThreshold) {
                        this.renderRange(range);
                    }
                }, this);
                // To use handleOverflow method
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels();
            };
            /**
             * Render one range, consisting of bubble symbol, connector and label.
             *
             * @private
             * @function Highcharts.BubbleLegend#renderRange
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             */
            BubbleLegendItem.prototype.renderRange = function (range) {
                var mainRange = this.ranges[0],
                    legend = this.legend,
                    options = this.options,
                    labelsOptions = options.labels,
                    chart = this.chart,
                    bubbleSeries = chart.series[options.seriesIndex],
                    renderer = chart.renderer,
                    symbols = this.symbols,
                    labels = symbols.labels,
                    elementCenter = range.center,
                    absoluteRadius = Math.abs(range.radius),
                    connectorDistance = options.connectorDistance || 0,
                    labelsAlign = labelsOptions.align,
                    rtl = legend.options.rtl,
                    borderWidth = options.borderWidth,
                    connectorWidth = options.connectorWidth,
                    posX = mainRange.radius || 0,
                    posY = elementCenter - absoluteRadius -
                        borderWidth / 2 + connectorWidth / 2,
                    fontMetrics = this.fontMetrics,
                    labelMovement = fontMetrics.f / 2 -
                        (fontMetrics.h - fontMetrics.f) / 2,
                    crispMovement = (posY % 1 ? 1 : 0.5) -
                        (connectorWidth % 2 ? 0 : 0.5),
                    styledMode = renderer.styledMode;
                var connectorLength = rtl || labelsAlign === 'left' ?
                        -connectorDistance : connectorDistance;
                // Set options for centered labels
                if (labelsAlign === 'center') {
                    connectorLength = 0; // do not use connector
                    options.connectorDistance = 0;
                    range.labelAttribs.align = 'center';
                }
                var labelY = posY + options.labels.y,
                    labelX = posX + connectorLength + options.labels.x;
                // Render bubble symbol
                symbols.bubbleItems.push(renderer
                    .circle(posX, elementCenter + crispMovement, absoluteRadius)
                    .attr(styledMode ? {} : range.bubbleAttribs)
                    .addClass((styledMode ?
                    'highcharts-color-' +
                        bubbleSeries.colorIndex + ' ' :
                    '') +
                    'highcharts-bubble-legend-symbol ' +
                    (options.className || '')).add(this.legendSymbol));
                // Render connector
                symbols.connectors.push(renderer
                    .path(renderer.crispLine([
                    ['M', posX, posY],
                    ['L', posX + connectorLength, posY]
                ], options.connectorWidth))
                    .attr((styledMode ? {} : range.connectorAttribs))
                    .addClass((styledMode ?
                    'highcharts-color-' +
                        this.options.seriesIndex + ' ' : '') +
                    'highcharts-bubble-legend-connectors ' +
                    (options.connectorClassName || '')).add(this.legendSymbol));
                // Render label
                var label = renderer
                        .text(this.formatLabel(range),
                    labelX,
                    labelY + labelMovement)
                        .attr((styledMode ? {} : range.labelAttribs))
                        .css(styledMode ? {} : labelsOptions.style)
                        .addClass('highcharts-bubble-legend-labels ' +
                        (options.labels.className || '')).add(this.legendSymbol);
                labels.push(label);
                // To enable default 'hideOverlappingLabels' method
                label.placed = true;
                label.alignAttr = {
                    x: labelX,
                    y: labelY + labelMovement
                };
            };
            /**
             * Get the label which takes up the most space.
             *
             * @private
             * @function Highcharts.BubbleLegend#getMaxLabelSize
             */
            BubbleLegendItem.prototype.getMaxLabelSize = function () {
                var labels = this.symbols.labels;
                var maxLabel,
                    labelSize;
                labels.forEach(function (label) {
                    labelSize = label.getBBox(true);
                    if (maxLabel) {
                        maxLabel = labelSize.width > maxLabel.width ?
                            labelSize : maxLabel;
                    }
                    else {
                        maxLabel = labelSize;
                    }
                });
                return maxLabel || {};
            };
            /**
             * Get formatted label for range.
             *
             * @private
             * @function Highcharts.BubbleLegend#formatLabel
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             * @return {string}
             *         Range label text
             */
            BubbleLegendItem.prototype.formatLabel = function (range) {
                var options = this.options,
                    formatter = options.labels.formatter,
                    format = options.labels.format;
                var numberFormatter = this.chart.numberFormatter;
                return format ? F.format(format, range) :
                    formatter ? formatter.call(range) :
                        numberFormatter(range.value, 1);
            };
            /**
             * By using default chart 'hideOverlappingLabels' method, hide or show
             * labels and connectors.
             *
             * @private
             * @function Highcharts.BubbleLegend#hideOverlappingLabels
             */
            BubbleLegendItem.prototype.hideOverlappingLabels = function () {
                var chart = this.chart,
                    allowOverlap = this.options.labels.allowOverlap,
                    symbols = this.symbols;
                if (!allowOverlap && symbols) {
                    chart.hideOverlappingLabels(symbols.labels);
                    // Hide or show connectors
                    symbols.labels.forEach(function (label, index) {
                        if (!label.newOpacity) {
                            symbols.connectors[index].hide();
                        }
                        else if (label.newOpacity !== label.oldOpacity) {
                            symbols.connectors[index].show();
                        }
                    });
                }
            };
            /**
             * Calculate ranges from created series.
             *
             * @private
             * @function Highcharts.BubbleLegend#getRanges
             * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
             *         Array of range objects
             */
            BubbleLegendItem.prototype.getRanges = function () {
                var bubbleLegend = this.legend.bubbleLegend,
                    series = bubbleLegend.chart.series,
                    rangesOptions = bubbleLegend.options.ranges;
                var ranges,
                    zData,
                    minZ = Number.MAX_VALUE,
                    maxZ = -Number.MAX_VALUE;
                series.forEach(function (s) {
                    // Find the min and max Z, like in bubble series
                    if (s.isBubble && !s.ignoreSeries) {
                        zData = s.zData.filter(isNumber);
                        if (zData.length) {
                            minZ = pick(s.options.zMin, Math.min(minZ, Math.max(arrayMin(zData), s.options.displayNegative === false ?
                                s.options.zThreshold :
                                -Number.MAX_VALUE)));
                            maxZ = pick(s.options.zMax, Math.max(maxZ, arrayMax(zData)));
                        }
                    }
                });
                // Set values for ranges
                if (minZ === maxZ) {
                    // Only one range if min and max values are the same.
                    ranges = [{ value: maxZ }];
                }
                else {
                    ranges = [
                        { value: minZ },
                        { value: (minZ + maxZ) / 2 },
                        { value: maxZ, autoRanges: true }
                    ];
                }
                // Prevent reverse order of ranges after redraw
                if (rangesOptions.length && rangesOptions[0].radius) {
                    ranges.reverse();
                }
                // Merge ranges values with user options
                ranges.forEach(function (range, i) {
                    if (rangesOptions && rangesOptions[i]) {
                        ranges[i] = merge(rangesOptions[i], range);
                    }
                });
                return ranges;
            };
            /**
             * Calculate bubble legend sizes from rendered series.
             *
             * @private
             * @function Highcharts.BubbleLegend#predictBubbleSizes
             * @return {Array<number,number>}
             *         Calculated min and max bubble sizes
             */
            BubbleLegendItem.prototype.predictBubbleSizes = function () {
                var chart = this.chart,
                    fontMetrics = this.fontMetrics,
                    legendOptions = chart.legend.options,
                    floating = legendOptions.floating,
                    horizontal = legendOptions.layout === 'horizontal',
                    lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0,
                    plotSizeX = chart.plotSizeX,
                    plotSizeY = chart.plotSizeY,
                    bubbleSeries = chart.series[this.options.seriesIndex],
                    pxSizes = bubbleSeries.getPxExtremes(),
                    minSize = Math.ceil(pxSizes.minPxSize),
                    maxPxSize = Math.ceil(pxSizes.maxPxSize),
                    plotSize = Math.min(plotSizeY,
                    plotSizeX);
                var calculatedSize,
                    maxSize = bubbleSeries.options.maxSize;
                // Calculate prediceted max size of bubble
                if (floating || !(/%$/.test(maxSize))) {
                    calculatedSize = maxPxSize;
                }
                else {
                    maxSize = parseFloat(maxSize);
                    calculatedSize = ((plotSize + lastLineHeight -
                        fontMetrics.h / 2) * maxSize / 100) / (maxSize / 100 + 1);
                    // Get maxPxSize from bubble series if calculated bubble legend
                    // size will not affect to bubbles series.
                    if ((horizontal && plotSizeY - calculatedSize >=
                        plotSizeX) || (!horizontal && plotSizeX -
                        calculatedSize >= plotSizeY)) {
                        calculatedSize = maxPxSize;
                    }
                }
                return [minSize, Math.ceil(calculatedSize)];
            };
            /**
             * Correct ranges with calculated sizes.
             *
             * @private
             * @function Highcharts.BubbleLegend#updateRanges
             * @param {number} min
             * @param {number} max
             */
            BubbleLegendItem.prototype.updateRanges = function (min, max) {
                var bubbleLegendOptions = this.legend.options.bubbleLegend;
                bubbleLegendOptions.minSize = min;
                bubbleLegendOptions.maxSize = max;
                bubbleLegendOptions.ranges = this.getRanges();
            };
            /**
             * Because of the possibility of creating another legend line, predicted
             * bubble legend sizes may differ by a few pixels, so it is necessary to
             * correct them.
             *
             * @private
             * @function Highcharts.BubbleLegend#correctSizes
             */
            BubbleLegendItem.prototype.correctSizes = function () {
                var legend = this.legend,
                    chart = this.chart,
                    bubbleSeries = chart.series[this.options.seriesIndex],
                    pxSizes = bubbleSeries.getPxExtremes(),
                    bubbleSeriesSize = pxSizes.maxPxSize,
                    bubbleLegendSize = this.options.maxSize;
                if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
                    1) {
                    this.updateRanges(this.options.minSize, pxSizes.maxPxSize);
                    legend.render();
                }
            };
            return BubbleLegendItem;
        }());
        /* *
         *
         *  Default Export
         *
         * */

        return BubbleLegendItem;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleLegendComposition.js', [_modules['Series/Bubble/BubbleLegendDefaults.js'], _modules['Series/Bubble/BubbleLegendItem.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Utilities.js']], function (BubbleLegendDefaults, BubbleLegendItem, D, U) {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setOptions = D.setOptions;
        var addEvent = U.addEvent,
            objectEach = U.objectEach,
            wrap = U.wrap;
        /* *
         *
         *  Namespace
         *
         * */
        var BubbleLegendComposition;
        (function (BubbleLegendComposition) {
            /* *
             *
             *  Constants
             *
             * */
            var composedClasses = [];
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * If ranges are not specified, determine ranges from rendered bubble series
             * and render legend again.
             */
            function chartDrawChartBox(proceed, options, callback) {
                var chart = this,
                    legend = chart.legend,
                    bubbleSeries = getVisibleBubbleSeriesIndex(chart) >= 0;
                var bubbleLegendOptions,
                    bubbleSizes;
                if (legend && legend.options.enabled && legend.bubbleLegend &&
                    legend.options.bubbleLegend.autoRanges && bubbleSeries) {
                    bubbleLegendOptions = legend.bubbleLegend.options;
                    bubbleSizes = legend.bubbleLegend.predictBubbleSizes();
                    legend.bubbleLegend.updateRanges(bubbleSizes[0], bubbleSizes[1]);
                    // Disable animation on init
                    if (!bubbleLegendOptions.placed) {
                        legend.group.placed = false;
                        legend.allItems.forEach(function (item) {
                            item.legendGroup.translateY = null;
                        });
                    }
                    // Create legend with bubbleLegend
                    legend.render();
                    chart.getMargins();
                    chart.axes.forEach(function (axis) {
                        if (axis.visible) { // #11448
                            axis.render();
                        }
                        if (!bubbleLegendOptions.placed) {
                            axis.setScale();
                            axis.updateNames();
                            // Disable axis animation on init
                            objectEach(axis.ticks, function (tick) {
                                tick.isNew = true;
                                tick.isNewLabel = true;
                            });
                        }
                    });
                    bubbleLegendOptions.placed = true;
                    // After recalculate axes, calculate margins again.
                    chart.getMargins();
                    // Call default 'drawChartBox' method.
                    proceed.call(chart, options, callback);
                    // Check bubble legend sizes and correct them if necessary.
                    legend.bubbleLegend.correctSizes();
                    // Correct items positions with different dimensions in legend.
                    retranslateItems(legend, getLinesHeights(legend));
                }
                else {
                    proceed.call(chart, options, callback);
                    // Allow color change on static bubble legend after click on legend
                    if (legend && legend.options.enabled && legend.bubbleLegend) {
                        legend.render();
                        retranslateItems(legend, getLinesHeights(legend));
                    }
                }
            }
            /**
             * Compose classes for use with Bubble series.
             * @private
             *
             * @param {Highcharts.Chart} ChartClass
             * Core chart class to use with Bubble series.
             *
             * @param {Highcharts.Legend} LegendClass
             * Core legend class to use with Bubble series.
             *
             * @param {Highcharts.Series} SeriesClass
             * Core series class to use with Bubble series.
             */
            function compose(ChartClass, LegendClass, SeriesClass) {
                if (composedClasses.indexOf(ChartClass) === -1) {
                    composedClasses.push(ChartClass);
                    setOptions({
                        // Set default bubble legend options
                        legend: {
                            bubbleLegend: BubbleLegendDefaults
                        }
                    });
                    wrap(ChartClass.prototype, 'drawChartBox', chartDrawChartBox);
                }
                if (composedClasses.indexOf(LegendClass) === -1) {
                    composedClasses.push(LegendClass);
                    addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
                }
                if (composedClasses.indexOf(SeriesClass) === -1) {
                    composedClasses.push(SeriesClass);
                    addEvent(SeriesClass, 'legendItemClick', onSeriesLegendItemClick);
                }
            }
            BubbleLegendComposition.compose = compose;
            /**
             * Check if there is at least one visible bubble series.
             *
             * @private
             * @function getVisibleBubbleSeriesIndex
             * @param {Highcharts.Chart} chart
             * Chart to check.
             * @return {number}
             * First visible bubble series index
             */
            function getVisibleBubbleSeriesIndex(chart) {
                var series = chart.series;
                var i = 0;
                while (i < series.length) {
                    if (series[i] &&
                        series[i].isBubble &&
                        series[i].visible &&
                        series[i].zData.length) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
            /**
             * Calculate height for each row in legend.
             *
             * @private
             * @function getLinesHeights
             *
             * @param {Highcharts.Legend} legend
             * Legend to calculate from.
             *
             * @return {Array<Highcharts.Dictionary<number>>}
             * Informations about line height and items amount
             */
            function getLinesHeights(legend) {
                var items = legend.allItems,
                    lines = [],
                    length = items.length;
                var lastLine,
                    i = 0,
                    j = 0;
                for (i = 0; i < length; i++) {
                    if (items[i].legendItemHeight) {
                        // for bubbleLegend
                        items[i].itemHeight = items[i].legendItemHeight;
                    }
                    if ( // Line break
                    items[i] === items[length - 1] ||
                        items[i + 1] &&
                            items[i]._legendItemPos[1] !==
                                items[i + 1]._legendItemPos[1]) {
                        lines.push({ height: 0 });
                        lastLine = lines[lines.length - 1];
                        // Find the highest item in line
                        for (j; j <= i; j++) {
                            if (items[j].itemHeight > lastLine.height) {
                                lastLine.height = items[j].itemHeight;
                            }
                        }
                        lastLine.step = i;
                    }
                }
                return lines;
            }
            /**
             * Start the bubble legend creation process.
             */
            function onLegendAfterGetAllItems(e) {
                var legend = this,
                    bubbleLegend = legend.bubbleLegend,
                    legendOptions = legend.options,
                    options = legendOptions.bubbleLegend,
                    bubbleSeriesIndex = getVisibleBubbleSeriesIndex(legend.chart);
                // Remove unnecessary element
                if (bubbleLegend && bubbleLegend.ranges && bubbleLegend.ranges.length) {
                    // Allow change the way of calculating ranges in update
                    if (options.ranges.length) {
                        options.autoRanges =
                            !!options.ranges[0].autoRanges;
                    }
                    // Update bubbleLegend dimensions in each redraw
                    legend.destroyItem(bubbleLegend);
                }
                // Create bubble legend
                if (bubbleSeriesIndex >= 0 &&
                    legendOptions.enabled &&
                    options.enabled) {
                    options.seriesIndex = bubbleSeriesIndex;
                    legend.bubbleLegend = new BubbleLegendItem(options, legend);
                    legend.bubbleLegend.addToLegend(e.allItems);
                }
            }
            /**
             * Toggle bubble legend depending on the visible status of bubble series.
             */
            function onSeriesLegendItemClick() {
                var series = this,
                    chart = series.chart,
                    visible = series.visible,
                    legend = series.chart.legend;
                var status;
                if (legend && legend.bubbleLegend) {
                    // Temporary correct 'visible' property
                    series.visible = !visible;
                    // Save future status for getRanges method
                    series.ignoreSeries = visible;
                    // Check if at lest one bubble series is visible
                    status = getVisibleBubbleSeriesIndex(chart) >= 0;
                    // Hide bubble legend if all bubble series are disabled
                    if (legend.bubbleLegend.visible !== status) {
                        // Show or hide bubble legend
                        legend.update({
                            bubbleLegend: { enabled: status }
                        });
                        legend.bubbleLegend.visible = status; // Restore default status
                    }
                    series.visible = visible;
                }
            }
            /**
             * Correct legend items translation in case of different elements heights.
             *
             * @private
             * @function Highcharts.Legend#retranslateItems
             *
             * @param {Highcharts.Legend} legend
             * Legend to translate in.
             *
             * @param {Array<Highcharts.Dictionary<number>>} lines
             * Informations about line height and items amount
             */
            function retranslateItems(legend, lines) {
                var items = legend.allItems,
                    rtl = legend.options.rtl;
                var orgTranslateX,
                    orgTranslateY,
                    movementX,
                    actualLine = 0;
                items.forEach(function (item, index) {
                    orgTranslateX = item.legendGroup.translateX;
                    orgTranslateY = item._legendItemPos[1];
                    movementX = item.movementX;
                    if (movementX || (rtl && item.ranges)) {
                        movementX = rtl ?
                            orgTranslateX - item.options.maxSize / 2 :
                            orgTranslateX + movementX;
                        item.legendGroup.attr({ translateX: movementX });
                    }
                    if (index > lines[actualLine].step) {
                        actualLine++;
                    }
                    item.legendGroup.attr({
                        translateY: Math.round(orgTranslateY + lines[actualLine].height / 2)
                    });
                    item._legendItemPos[1] = orgTranslateY +
                        lines[actualLine].height / 2;
                });
            }
            /* eslint-disable valid-jsdoc */
        })(BubbleLegendComposition || (BubbleLegendComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return BubbleLegendComposition;
    });
    _registerModule(_modules, 'Series/Bubble/BubblePoint.js', [_modules['Core/Series/Point.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Point, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var ScatterPoint = SeriesRegistry.seriesTypes.scatter.prototype.pointClass;
        var extend = U.extend;
        /* *
         *
         *  Class
         *
         * */
        var BubblePoint = /** @class */ (function (_super) {
                __extends(BubblePoint, _super);
            function BubblePoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.series = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            BubblePoint.prototype.haloPath = function (size) {
                return Point.prototype.haloPath.call(this, 
                // #6067
                size === 0 ? 0 : (this.marker ? this.marker.radius || 0 : 0) + size);
            };
            return BubblePoint;
        }(ScatterPoint));
        /* *
         *
         *  Class Prototype
         *
         * */
        extend(BubblePoint.prototype, {
            ttBelow: false
        });
        /* *
         *
         *  Default Export
         *
         * */

        return BubblePoint;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleSeries.js', [_modules['Core/Axis/Axis.js'], _modules['Series/Bubble/BubbleLegendComposition.js'], _modules['Series/Bubble/BubblePoint.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Axis, BubbleLegendComposition, BubblePoint, Color, H, Series, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var color = Color.parse;
        var noop = H.noop;
        var _a = SeriesRegistry.seriesTypes,
            ColumnSeries = _a.column,
            ScatterSeries = _a.scatter;
        var addEvent = U.addEvent,
            arrayMax = U.arrayMax,
            arrayMin = U.arrayMin,
            clamp = U.clamp,
            extend = U.extend,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        var BubbleSeries = /** @class */ (function (_super) {
                __extends(BubbleSeries, _super);
            function BubbleSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.maxPxSize = void 0;
                _this.minPxSize = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.radii = void 0;
                _this.yData = void 0;
                _this.zData = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Perform animation on the bubbles
             * @private
             */
            BubbleSeries.prototype.animate = function (init) {
                if (!init &&
                    this.points.length < this.options.animationLimit // #8099
                ) {
                    this.points.forEach(function (point) {
                        var graphic = point.graphic;
                        if (graphic && graphic.width) { // URL symbols don't have width
                            // Start values
                            if (!this.hasRendered) {
                                graphic.attr({
                                    x: point.plotX,
                                    y: point.plotY,
                                    width: 1,
                                    height: 1
                                });
                            }
                            // Run animation
                            graphic.animate(this.markerAttribs(point), this.options.animation);
                        }
                    }, this);
                }
            };
            /**
             * Get the radius for each point based on the minSize, maxSize and each
             * point's Z value. This must be done prior to Series.translate because
             * the axis needs to add padding in accordance with the point sizes.
             * @private
             */
            BubbleSeries.prototype.getRadii = function () {
                var _this = this;
                var len,
                    i,
                    zData = this.zData,
                    yData = this.yData,
                    radii = [],
                    value,
                    zExtremes = this.chart.bubbleZExtremes;
                var _a = this.getPxExtremes(),
                    minPxSize = _a.minPxSize,
                    maxPxSize = _a.maxPxSize;
                // Get the collective Z extremes of all bubblish series. The chart-level
                // `bubbleZExtremes` are only computed once, and reset on `updatedData`
                // in any member series.
                if (!zExtremes) {
                    var zMin_1 = Number.MAX_VALUE;
                    var zMax_1 = -Number.MAX_VALUE;
                    var valid_1;
                    this.chart.series.forEach(function (otherSeries) {
                        if (otherSeries.bubblePadding && (otherSeries.visible ||
                            !_this.chart.options.chart.ignoreHiddenSeries)) {
                            var zExtremes_1 = otherSeries.getZExtremes();
                            if (zExtremes_1) {
                                zMin_1 = Math.min(zMin_1 || zExtremes_1.zMin, zExtremes_1.zMin);
                                zMax_1 = Math.max(zMax_1 || zExtremes_1.zMax, zExtremes_1.zMax);
                                valid_1 = true;
                            }
                        }
                    });
                    if (valid_1) {
                        zExtremes = { zMin: zMin_1, zMax: zMax_1 };
                        this.chart.bubbleZExtremes = zExtremes;
                    }
                    else {
                        zExtremes = { zMin: 0, zMax: 0 };
                    }
                }
                // Set the shape type and arguments to be picked up in drawPoints
                for (i = 0, len = zData.length; i < len; i++) {
                    value = zData[i];
                    // Separate method to get individual radius for bubbleLegend
                    radii.push(this.getRadius(zExtremes.zMin, zExtremes.zMax, minPxSize, maxPxSize, value, yData[i]));
                }
                this.radii = radii;
            };
            /**
             * Get the individual radius for one point.
             * @private
             */
            BubbleSeries.prototype.getRadius = function (zMin, zMax, minSize, maxSize, value, yValue) {
                var options = this.options,
                    sizeByArea = options.sizeBy !== 'width',
                    zThreshold = options.zThreshold,
                    zRange = zMax - zMin,
                    pos = 0.5;
                // #8608 - bubble should be visible when z is undefined
                if (yValue === null || value === null) {
                    return null;
                }
                if (isNumber(value)) {
                    // When sizing by threshold, the absolute value of z determines
                    // the size of the bubble.
                    if (options.sizeByAbsoluteValue) {
                        value = Math.abs(value - zThreshold);
                        zMax = zRange = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                        zMin = 0;
                    }
                    // Issue #4419 - if value is less than zMin, push a radius that's
                    // always smaller than the minimum size
                    if (value < zMin) {
                        return minSize / 2 - 1;
                    }
                    // Relative size, a number between 0 and 1
                    if (zRange > 0) {
                        pos = (value - zMin) / zRange;
                    }
                }
                if (sizeByArea && pos >= 0) {
                    pos = Math.sqrt(pos);
                }
                return Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
            };
            /**
             * Define hasData function for non-cartesian series.
             * Returns true if the series has points at all.
             * @private
             */
            BubbleSeries.prototype.hasData = function () {
                return !!this.processedXData.length; // != 0
            };
            /**
             * @private
             */
            BubbleSeries.prototype.pointAttribs = function (point, state) {
                var markerOptions = this.options.marker,
                    fillOpacity = markerOptions.fillOpacity,
                    attr = Series.prototype.pointAttribs.call(this,
                    point,
                    state);
                if (fillOpacity !== 1) {
                    attr.fill = color(attr.fill)
                        .setOpacity(fillOpacity)
                        .get('rgba');
                }
                return attr;
            };
            /**
             * Extend the base translate method to handle bubble size
             * @private
             */
            BubbleSeries.prototype.translate = function () {
                // Run the parent method
                _super.prototype.translate.call(this);
                this.getRadii();
                this.translateBubble();
            };
            BubbleSeries.prototype.translateBubble = function () {
                var _a = this,
                    data = _a.data,
                    radii = _a.radii;
                var minPxSize = this.getPxExtremes().minPxSize;
                // Set the shape type and arguments to be picked up in drawPoints
                var i = data.length;
                while (i--) {
                    var point = data[i];
                    var radius = radii ? radii[i] : 0; // #1737
                        if (isNumber(radius) && radius >= minPxSize / 2) {
                            // Shape arguments
                            point.marker = extend(point.marker, {
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
                    }
                    else { // below zThreshold
                        // #1691
                        point.shapeArgs = point.plotY = point.dlBox = void 0;
                    }
                }
            };
            BubbleSeries.prototype.getPxExtremes = function () {
                var smallestSize = Math.min(this.chart.plotWidth,
                    this.chart.plotHeight);
                var getPxSize = function (length) {
                        var isPercent;
                    if (typeof length === 'string') {
                        isPercent = /%$/.test(length);
                        length = parseInt(length, 10);
                    }
                    return isPercent ? smallestSize * length / 100 : length;
                };
                var minPxSize = getPxSize(pick(this.options.minSize, 8));
                // Prioritize min size if conflict to make sure bubbles are
                // always visible. #5873
                var maxPxSize = Math.max(getPxSize(pick(this.options.maxSize, '20%')),
                    minPxSize);
                return { minPxSize: minPxSize, maxPxSize: maxPxSize };
            };
            BubbleSeries.prototype.getZExtremes = function () {
                var options = this.options,
                    zData = (this.zData || []).filter(isNumber);
                if (zData.length) {
                    var zMin = pick(options.zMin,
                        clamp(arrayMin(zData),
                        options.displayNegative === false ?
                            (options.zThreshold || 0) :
                            -Number.MAX_VALUE,
                        Number.MAX_VALUE));
                    var zMax = pick(options.zMax,
                        arrayMax(zData));
                    if (isNumber(zMin) && isNumber(zMax)) {
                        return { zMin: zMin, zMax: zMax };
                    }
                }
            };
            BubbleSeries.compose = BubbleLegendComposition.compose;
            /**
             * A bubble series is a three dimensional series type where each point
             * renders an X, Y and Z value. Each points is drawn as a bubble where the
             * position along the X and Y axes mark the X and Y values, and the size of
             * the bubble relates to the Z value.
             *
             * @sample {highcharts} highcharts/demo/bubble/
             *         Bubble chart
             *
             * @extends      plotOptions.scatter
             * @excluding    cluster
             * @product      highcharts highstock
             * @requires     highcharts-more
             * @optionparent plotOptions.bubble
             */
            BubbleSeries.defaultOptions = merge(ScatterSeries.defaultOptions, {
                dataLabels: {
                    formatter: function () {
                        var numberFormatter = this.series.chart.numberFormatter;
                        var z = this.point.z;
                        return isNumber(z) ? numberFormatter(z, -1) : '';
                    },
                    inside: true,
                    verticalAlign: 'middle'
                },
                /**
                 * If there are more points in the series than the `animationLimit`, the
                 * animation won't run. Animation affects overall performance and
                 * doesn't work well with heavy data series.
                 *
                 * @since 6.1.0
                 */
                animationLimit: 250,
                /**
                 * Whether to display negative sized bubbles. The threshold is given
                 * by the [zThreshold](#plotOptions.bubble.zThreshold) option, and negative
                 * bubbles can be visualized by setting
                 * [negativeColor](#plotOptions.bubble.negativeColor).
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-negative/
                 *         Negative bubbles
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     3.0
                 * @apioption plotOptions.bubble.displayNegative
                 */
                /**
                 * @extends   plotOptions.series.marker
                 * @excluding enabled, enabledThreshold, height, radius, width
                 */
                marker: {
                    lineColor: null,
                    lineWidth: 1,
                    /**
                     * The fill opacity of the bubble markers.
                     */
                    fillOpacity: 0.5,
                    /**
                     * In bubble charts, the radius is overridden and determined based
                     * on the point's data value.
                     *
                     * @ignore-option
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
                     * `url(graphic.png)`. Note that for the image to be applied to
                     * exported charts, its URL needs to be accessible by the export
                     * server.
                     *
                     * Custom callbacks for symbol path generation can also be added to
                     * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                     * used by its method name, as shown in the demo.
                     *
                     * @sample {highcharts} highcharts/plotoptions/bubble-symbol/
                     *         Bubble chart with various symbols
                     * @sample {highcharts} highcharts/plotoptions/series-marker-symbol/
                     *         General chart with predefined, graphic and custom markers
                     *
                     * @type  {Highcharts.SymbolKeyValue|string}
                     * @since 5.0.11
                     */
                    symbol: 'circle'
                },
                /**
                 * Minimum bubble size. Bubbles will automatically size between the
                 * `minSize` and `maxSize` to reflect the `z` value of each bubble.
                 * Can be either pixels (when no unit is given), or a percentage of
                 * the smallest one of the plot width and height.
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-size/
                 *         Bubble size
                 *
                 * @type    {number|string}
                 * @since   3.0
                 * @product highcharts highstock
                 */
                minSize: 8,
                /**
                 * Maximum bubble size. Bubbles will automatically size between the
                 * `minSize` and `maxSize` to reflect the `z` value of each bubble.
                 * Can be either pixels (when no unit is given), or a percentage of
                 * the smallest one of the plot width and height.
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-size/
                 *         Bubble size
                 *
                 * @type    {number|string}
                 * @since   3.0
                 * @product highcharts highstock
                 */
                maxSize: '20%',
                /**
                 * When a point's Z value is below the
                 * [zThreshold](#plotOptions.bubble.zThreshold)
                 * setting, this color is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-negative/
                 *         Negative bubbles
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.bubble.negativeColor
                 */
                /**
                 * Whether the bubble's value should be represented by the area or the
                 * width of the bubble. The default, `area`, corresponds best to the
                 * human perception of the size of each bubble.
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-sizeby/
                 *         Comparison of area and size
                 *
                 * @type       {Highcharts.BubbleSizeByValue}
                 * @default    area
                 * @since      3.0.7
                 * @apioption  plotOptions.bubble.sizeBy
                 */
                /**
                 * When this is true, the absolute value of z determines the size of
                 * the bubble. This means that with the default `zThreshold` of 0, a
                 * bubble of value -1 will have the same size as a bubble of value 1,
                 * while a bubble of value 0 will have a smaller size according to
                 * `minSize`.
                 *
                 * @sample    {highcharts} highcharts/plotoptions/bubble-sizebyabsolutevalue/
                 *            Size by absolute value, various thresholds
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     4.1.9
                 * @product   highcharts
                 * @apioption plotOptions.bubble.sizeByAbsoluteValue
                 */
                /**
                 * When this is true, the series will not cause the Y axis to cross
                 * the zero plane (or [threshold](#plotOptions.series.threshold) option)
                 * unless the data actually crosses the plane.
                 *
                 * For example, if `softThreshold` is `false`, a series of 0, 1, 2,
                 * 3 will make the Y axis show negative values according to the
                 * `minPadding` option. If `softThreshold` is `true`, the Y axis starts
                 * at 0.
                 *
                 * @since   4.1.9
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
                 * The minimum for the Z value range. Defaults to the highest Z value
                 * in the data.
                 *
                 * @see [zMin](#plotOptions.bubble.zMin)
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
                 *         Z has a possible range of 0-100
                 *
                 * @type      {number}
                 * @since     4.0.3
                 * @product   highcharts
                 * @apioption plotOptions.bubble.zMax
                 */
                /**
                 * @default   z
                 * @apioption plotOptions.bubble.colorKey
                 */
                /**
                 * The minimum for the Z value range. Defaults to the lowest Z value
                 * in the data.
                 *
                 * @see [zMax](#plotOptions.bubble.zMax)
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
                 *         Z has a possible range of 0-100
                 *
                 * @type      {number}
                 * @since     4.0.3
                 * @product   highcharts
                 * @apioption plotOptions.bubble.zMin
                 */
                /**
                 * When [displayNegative](#plotOptions.bubble.displayNegative) is `false`,
                 * bubbles with lower Z values are skipped. When `displayNegative`
                 * is `true` and a [negativeColor](#plotOptions.bubble.negativeColor)
                 * is given, points with lower Z is colored.
                 *
                 * @sample {highcharts} highcharts/plotoptions/bubble-negative/
                 *         Negative bubbles
                 *
                 * @since   3.0
                 * @product highcharts
                 */
                zThreshold: 0,
                zoneAxis: 'z'
            });
            return BubbleSeries;
        }(ScatterSeries));
        extend(BubbleSeries.prototype, {
            alignDataLabel: ColumnSeries.prototype.alignDataLabel,
            applyZones: noop,
            bubblePadding: true,
            buildKDTree: noop,
            directTouch: true,
            isBubble: true,
            pointArrayMap: ['y', 'z'],
            pointClass: BubblePoint,
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['group', 'dataLabelsGroup'],
            specialGroup: 'group',
            zoneAxis: 'z'
        });
        // On updated data in any series, delete the chart-level Z extremes cache
        addEvent(BubbleSeries, 'updatedData', function (e) {
            delete e.target.chart.bubbleZExtremes;
        });
        /* *
         *
         *  Axis ?
         *
         * */
        // Add logic to pad each axis with the amount of pixels necessary to avoid the
        // bubbles to overflow.
        Axis.prototype.beforePadding = function () {
            var axis = this,
                axisLength = this.len,
                chart = this.chart,
                pxMin = 0,
                pxMax = axisLength,
                isXAxis = this.isXAxis,
                dataKey = isXAxis ? 'xData' : 'yData',
                min = this.min,
                range = this.max - min,
                transA = axisLength / range,
                hasActiveSeries;
            // Handle padding on the second pass, or on redraw
            this.series.forEach(function (series) {
                if (series.bubblePadding &&
                    (series.visible || !chart.options.chart.ignoreHiddenSeries)) {
                    // Correction for #1673
                    axis.allowZoomOutside = true;
                    hasActiveSeries = true;
                    var data = series[dataKey];
                    if (isXAxis) {
                        series.getRadii(0, 0, series);
                    }
                    if (range > 0) {
                        var i = data.length;
                        while (i--) {
                            if (isNumber(data[i]) &&
                                axis.dataMin <= data[i] &&
                                data[i] <= axis.max) {
                                var radius = series.radii && series.radii[i] || 0;
                                pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                                pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                            }
                        }
                    }
                }
            });
            // Apply the padding to the min and max properties
            if (hasActiveSeries && range > 0 && !this.logarithmic) {
                pxMax -= axisLength;
                transA *= (axisLength +
                    Math.max(0, pxMin) - // #8901
                    Math.min(pxMax, axisLength)) / axisLength;
                [
                    ['min', 'userMin', pxMin],
                    ['max', 'userMax', pxMax]
                ].forEach(function (keys) {
                    if (typeof pick(axis.options[keys[0]], axis[keys[1]]) === 'undefined') {
                        axis[keys[0]] += keys[2] / transA;
                    }
                });
            }
            /* eslint-enable valid-jsdoc */
        };
        SeriesRegistry.registerSeriesType('bubble', BubbleSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"area"|"width"} Highcharts.BubbleSizeByValue
         */
        ''; // detach doclets above
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A `bubble` series. If the [type](#series.bubble.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.bubble
         * @excluding dataParser, dataURL, stack
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.bubble
         */
        /**
         * An array of data points for the series. For the `bubble` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,y,z`. If the first value is a string, it is applied as the name of
         *    the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 1, 2],
         *        [1, 5, 5],
         *        [2, 0, 2]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.bubble.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 1,
         *        z: 1,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 5,
         *        z: 4,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.line.data
         * @product   highcharts
         * @apioption series.bubble.data
         */
        /**
         * @extends     series.line.data.marker
         * @excluding   enabledThreshold, height, radius, width
         * @product     highcharts
         * @apioption   series.bubble.data.marker
         */
        /**
         * The size value for each bubble. The bubbles' diameters are computed
         * based on the `z`, and controlled by series options like `minSize`,
         * `maxSize`, `sizeBy`, `zMin` and `zMax`.
         *
         * @type      {number|null}
         * @product   highcharts
         * @apioption series.bubble.data.z
         */
        /**
         * @excluding enabled, enabledThreshold, height, radius, width
         * @apioption series.bubble.marker
         */
        ''; // adds doclets above to transpiled file

        return BubbleSeries;
    });
    _registerModule(_modules, 'Series/ColumnRange/ColumnRangePoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var _a = SeriesRegistry.seriesTypes,
            ColumnPoint = _a.column.prototype.pointClass,
            AreaRangePoint = _a.arearange.prototype.pointClass;
        var extend = U.extend,
            isNumber = U.isNumber;
        /* *
         *
         *  Class
         *
         * */
        var ColumnRangePoint = /** @class */ (function (_super) {
                __extends(ColumnRangePoint, _super);
            function ColumnRangePoint() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.series = void 0;
                _this.options = void 0;
                _this.barX = void 0;
                _this.pointWidth = void 0;
                _this.shapeType = void 0;
                return _this;
            }
            ColumnRangePoint.prototype.isValid = function () {
                return isNumber(this.low);
            };
            return ColumnRangePoint;
        }(AreaRangePoint));
        /* *
         *
         *  Prototype properties
         *
         * */
        extend(ColumnRangePoint.prototype, {
            setState: ColumnPoint.prototype.setState
        });
        /* *
         *
         *  Default export
         *
         * */

        return ColumnRangePoint;
    });
    _registerModule(_modules, 'Series/ColumnRange/ColumnRangeSeries.js', [_modules['Series/ColumnRange/ColumnRangePoint.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ColumnRangePoint, H, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var noop = H.noop;
        var _a = SeriesRegistry.seriesTypes,
            AreaRangeSeries = _a.arearange,
            ColumnSeries = _a.column;
        var columnProto = ColumnSeries.prototype;
        var arearangeProto = AreaRangeSeries.prototype;
        var clamp = U.clamp,
            merge = U.merge,
            pick = U.pick,
            extend = U.extend;
        /**
         * The column range is a cartesian series type with higher and lower
         * Y values along an X axis. To display horizontal bars, set
         * [chart.inverted](#chart.inverted) to `true`.
         *
         * @sample {highcharts|highstock} highcharts/demo/columnrange/
         *         Inverted column range
         *
         * @extends      plotOptions.column
         * @since        2.3.0
         * @excluding    negativeColor, stacking, softThreshold, threshold
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.columnrange
         */
        var columnRangeOptions = {
                /**
                 * Extended data labels for range series types. Range series data labels
                 * have no `x` and `y` options. Instead,
            they have `xLow`,
            `xHigh`,
                 * `yLow` and `yHigh` options to allow the higher and lower data label
                 * sets individually.
                 *
                 * @declare   Highcharts.SeriesAreaRangeDataLabelsOptionsObject
                 * @extends   plotOptions.arearange.dataLabels
                 * @since     2.3.0
                 * @product   highcharts highstock
                 * @apioption plotOptions.columnrange.dataLabels
                 */
                pointRange: null,
                /** @ignore-option */
                marker: null,
                states: {
                    hover: {
                        /** @ignore-option */
                        halo: false
                    }
                }
            };
        /* *
         *
         *  Class
         *
         * */
        /**
         * The ColumnRangeSeries class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.columnrange
         *
         * @augments Highcharts.Series
         */
        var ColumnRangeSeries = /** @class */ (function (_super) {
                __extends(ColumnRangeSeries, _super);
            function ColumnRangeSeries() {
                /* *
                 *
                 *  Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.points = void 0;
                _this.options = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            ColumnRangeSeries.prototype.setOptions = function () {
                // #14359 Prevent side-effect from stacking.
                merge(true, arguments[0], { stacking: void 0 });
                return arearangeProto.setOptions.apply(this, arguments);
            };
            // eslint-disable-next-line valid-jsdoc
            /**
             * Translate data points from raw values x and y to plotX and plotY
             * @private
             */
            ColumnRangeSeries.prototype.translate = function () {
                var series = this,
                    yAxis = series.yAxis,
                    xAxis = series.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    chart = series.chart,
                    isRadial = series.xAxis.isRadial,
                    safeDistance = Math.max(chart.chartWidth,
                    chart.chartHeight) + 999,
                    plotHigh;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Don't draw too far outside plot area (#6835)
                 * @private
                 */
                function safeBounds(pixelPos) {
                    return clamp(pixelPos, -safeDistance, safeDistance);
                }
                columnProto.translate.apply(series);
                // Set plotLow and plotHigh
                series.points.forEach(function (point) {
                    var shapeArgs = point.shapeArgs || {},
                        minPointLength = series.options.minPointLength,
                        heightDifference,
                        height,
                        y;
                    point.plotHigh = plotHigh = safeBounds(yAxis.translate(point.high, 0, 1, 0, 1));
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
                    }
                    else if (height < 0) {
                        height *= -1;
                        y -= height;
                    }
                    if (isRadial) {
                        start = point.barX + startAngleRad;
                        point.shapeType = 'arc';
                        point.shapeArgs = series.polarArc(y + height, y, start, start + point.pointWidth);
                    }
                    else {
                        shapeArgs.height = height;
                        shapeArgs.y = y;
                        var _a = shapeArgs.x,
                            x = _a === void 0 ? 0 : _a,
                            _b = shapeArgs.width,
                            width = _b === void 0 ? 0 : _b;
                        point.tooltipPos = chart.inverted ?
                            [
                                yAxis.len + yAxis.pos - chart.plotLeft - y -
                                    height / 2,
                                xAxis.len + xAxis.pos - chart.plotTop -
                                    x - width / 2,
                                height
                            ] : [
                            xAxis.left - chart.plotLeft + x +
                                width / 2,
                            yAxis.pos - chart.plotTop + y + height / 2,
                            height
                        ]; // don't inherit from column tooltip position - #3372
                    }
                });
            };
            // Overrides from modules that may be loaded after this module
            ColumnRangeSeries.prototype.crispCol = function () {
                return columnProto.crispCol.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.drawPoints = function () {
                return columnProto.drawPoints.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.drawTracker = function () {
                return columnProto.drawTracker.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.getColumnMetrics = function () {
                return columnProto.getColumnMetrics.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.pointAttribs = function () {
                return columnProto.pointAttribs.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.adjustForMissingColumns = function () {
                return columnProto.adjustForMissingColumns.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.animate = function () {
                return columnProto.animate.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.translate3dPoints = function () {
                return columnProto.translate3dPoints.apply(this, arguments);
            };
            ColumnRangeSeries.prototype.translate3dShapes = function () {
                return columnProto.translate3dShapes.apply(this, arguments);
            };
            ColumnRangeSeries.defaultOptions = merge(ColumnSeries.defaultOptions, AreaRangeSeries.defaultOptions, columnRangeOptions);
            return ColumnRangeSeries;
        }(AreaRangeSeries));
        extend(ColumnRangeSeries.prototype, {
            directTouch: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            drawGraph: noop,
            getSymbol: noop,
            polarArc: function () {
                return columnProto.polarArc.apply(this, arguments);
            },
            pointClass: ColumnRangePoint
        });
        SeriesRegistry.registerSeriesType('columnrange', ColumnRangeSeries);
        /* *
         *
         *  Default export
         *
         * */
        /* *
         *
         *  API options
         *
         * */
        /**
         * A `columnrange` series. If the [type](#series.columnrange.type)
         * option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.columnrange
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.columnrange
         */
        /**
         * An array of data points for the series. For the `columnrange` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 4, 2],
         *        [1, 2, 1],
         *        [2, 9, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.columnrange.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 4,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 3,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @excluding marker
         * @product   highcharts highstock
         * @apioption series.columnrange.data
         */
        /**
         * @extends   series.columnrange.dataLabels
         * @product   highcharts highstock
         * @apioption series.columnrange.data.dataLabels
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.hover
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.select
         */
        ''; // adds doclets above into transpiled

        return ColumnRangeSeries;
    });
    _registerModule(_modules, 'Series/ColumnPyramid/ColumnPyramidSeries.js', [_modules['Series/Column/ColumnSeries.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ColumnSeries, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var colProto = ColumnSeries.prototype;
        var clamp = U.clamp,
            extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        /**
         * The ColumnPyramidSeries class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.columnpyramid
         *
         * @augments Highcharts.Series
         */
        var ColumnPyramidSeries = /** @class */ (function (_super) {
                __extends(ColumnPyramidSeries, _super);
            function ColumnPyramidSeries() {
                /* *
                 *
                 * Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 * Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             * Functions
             *
             * */
            /* eslint-disable-next-line valid-jsdoc */
            /**
             * Overrides the column translate method
             * @private
             */
            ColumnPyramidSeries.prototype.translate = function () {
                var series = this,
                    chart = series.chart,
                    options = series.options,
                    dense = series.dense =
                        series.closestPointRange * series.xAxis.transA < 2,
                    borderWidth = series.borderWidth = pick(options.borderWidth,
                    dense ? 0 : 1 // #3635
                    ),
                    yAxis = series.yAxis,
                    threshold = options.threshold,
                    translatedThreshold = series.translatedThreshold =
                        yAxis.getThreshold(threshold),
                    minPointLength = pick(options.minPointLength, 5),
                    metrics = series.getColumnMetrics(),
                    pointWidth = metrics.width, 
                    // postprocessed for border width
                    seriesBarW = series.barW =
                        Math.max(pointWidth, 1 + 2 * borderWidth),
                    pointXOffset = series.pointXOffset = metrics.offset;
                if (chart.inverted) {
                    translatedThreshold -= 0.5; // #3355
                }
                // When the pointPadding is 0,
                // we want the pyramids to be packed tightly,
                // so we allow individual pyramids to have individual sizes.
                // When pointPadding is greater,
                // we strive for equal-width columns (#2694).
                if (options.pointPadding) {
                    seriesBarW = Math.ceil(seriesBarW);
                }
                colProto.translate.apply(series);
                // Record the new values
                series.points.forEach(function (point) {
                    var yBottom = pick(point.yBottom,
                        translatedThreshold),
                        safeDistance = 999 + Math.abs(yBottom),
                        plotY = clamp(point.plotY, -safeDistance,
                        yAxis.len + safeDistance), 
                        // Don't draw too far outside plot area
                        // (#1303, #2241, #4264)
                        barX = point.plotX + pointXOffset,
                        barW = seriesBarW / 2,
                        barY = Math.min(plotY,
                        yBottom),
                        barH = Math.max(plotY,
                        yBottom) - barY,
                        stackTotal,
                        stackHeight,
                        topPointY,
                        topXwidth,
                        bottomXwidth,
                        invBarPos,
                        x1,
                        x2,
                        x3,
                        x4,
                        y1,
                        y2;
                    point.barX = barX;
                    point.pointWidth = pointWidth;
                    // Fix the tooltip on center of grouped pyramids
                    // (#1216, #424, #3648)
                    point.tooltipPos = chart.inverted ?
                        [
                            yAxis.len + yAxis.pos - chart.plotLeft - plotY,
                            series.xAxis.len - barX - barW,
                            barH
                        ] :
                        [
                            barX + barW,
                            plotY + yAxis.pos - chart.plotTop,
                            barH
                        ];
                    stackTotal =
                        threshold + (point.total || point.y);
                    // overwrite stacktotal (always 100 / -100)
                    if (options.stacking === 'percent') {
                        stackTotal =
                            threshold + (point.y < 0) ?
                                -100 :
                                100;
                    }
                    // get the highest point (if stack, extract from total)
                    topPointY = yAxis.toPixels((stackTotal), true);
                    // calculate height of stack (in pixels)
                    stackHeight =
                        chart.plotHeight - topPointY -
                            (chart.plotHeight - translatedThreshold);
                    // topXwidth and bottomXwidth = width of lines from the center
                    // calculated from tanges proportion.
                    // Can not be a NaN #12514
                    topXwidth = stackHeight ?
                        (barW * (barY - topPointY)) / stackHeight : 0;
                    // like topXwidth, but with height of point
                    bottomXwidth = stackHeight ?
                        (barW * (barY + barH - topPointY)) / stackHeight :
                        0;
                    /*
                            /\
                           /  \
                    x1,y1,------ x2,y1
                        /      \
                       ----------
                    x4,y2        x3,y2
                    */
                    x1 = barX - topXwidth + barW;
                    x2 = barX + topXwidth + barW;
                    x3 = barX + bottomXwidth + barW;
                    x4 = barX - bottomXwidth + barW;
                    y1 = barY - minPointLength;
                    y2 = barY + barH;
                    if (point.y < 0) {
                        y1 = barY;
                        y2 = barY + barH + minPointLength;
                    }
                    // inverted chart
                    if (chart.inverted) {
                        invBarPos = yAxis.width - barY;
                        stackHeight =
                            topPointY - (yAxis.width - translatedThreshold);
                        // proportion tanges
                        topXwidth = (barW *
                            (topPointY - invBarPos)) / stackHeight;
                        bottomXwidth = (barW *
                            (topPointY - (invBarPos - barH))) / stackHeight;
                        x1 = barX + barW + topXwidth; // top bottom
                        x2 = x1 - 2 * topXwidth; // top top
                        x3 = barX - bottomXwidth + barW; // bottom top
                        x4 = barX + bottomXwidth + barW; // bottom bottom
                        y1 = barY;
                        y2 = barY + barH - minPointLength;
                        if (point.y < 0) {
                            y2 = barY + barH + minPointLength;
                        }
                    }
                    // Register shape type and arguments to be used in drawPoints
                    point.shapeType = 'path';
                    point.shapeArgs = {
                        // args for datalabels positioning
                        x: x1,
                        y: y1,
                        width: x2 - x1,
                        height: barH,
                        // path of pyramid
                        d: [
                            ['M', x1, y1],
                            ['L', x2, y1],
                            ['L', x3, y2],
                            ['L', x4, y2],
                            ['Z']
                        ]
                    };
                });
            };
            /**
             * Column pyramid series display one pyramid per value along an X axis.
             * To display horizontal pyramids, set [chart.inverted](#chart.inverted) to
             * `true`.
             *
             * @sample {highcharts|highstock} highcharts/demo/column-pyramid/
             *         Column pyramid
             * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-stacked/
             *         Column pyramid stacked
             * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-inverted/
             *         Column pyramid inverted
             *
             * @extends      plotOptions.column
             * @since        7.0.0
             * @product      highcharts highstock
             * @excluding    boostThreshold, borderRadius, crisp, depth, edgeColor,
             *               edgeWidth, groupZPadding, negativeColor, softThreshold,
             *               threshold, zoneAxis, zones, boostBlending
             * @requires     highcharts-more
             * @optionparent plotOptions.columnpyramid
             */
            ColumnPyramidSeries.defaultOptions = merge(ColumnSeries.defaultOptions, {
            // Nothing here
            });
            return ColumnPyramidSeries;
        }(ColumnSeries));
        SeriesRegistry.registerSeriesType('columnpyramid', ColumnPyramidSeries);
        /* *
         *
         * Default export
         *
         * */
        /* *
         *
         * API Options
         *
         * */
        /**
         * A `columnpyramid` series. If the [type](#series.columnpyramid.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.columnpyramid
         * @excluding connectEnds, connectNulls, dashStyle, dataParser, dataURL,
         *            gapSize, gapUnit, linecap, lineWidth, marker, step,
         *            boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.columnpyramid
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.states.hover
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.states.select
         */
        /**
         * An array of data points for the series. For the `columnpyramid` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 6],
         *        [1, 2],
         *        [2, 6]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The objects are point configuration
         *    objects as seen below. If the total number of data points exceeds the
         *    series' [turboThreshold](#series.columnpyramid.turboThreshold), this
         *    option is not available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 9,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 6,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
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
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.data
         */
        ''; // adds doclets above to transpiled file;

        return ColumnPyramidSeries;
    });
    _registerModule(_modules, 'Series/ErrorBar/ErrorBarSeries.js', [_modules['Series/BoxPlot/BoxPlotSeries.js'], _modules['Series/Column/ColumnSeries.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (BoxPlotSeries, ColumnSeries, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var AreaRangeSeries = SeriesRegistry.seriesTypes.arearange;
        var merge = U.merge,
            extend = U.extend;
        /**
         * Errorbar series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.errorbar
         *
         * @augments Highcharts.Series
         *
         */
        var ErrorBarSeries = /** @class */ (function (_super) {
                __extends(ErrorBarSeries, _super);
            function ErrorBarSeries() {
                /* *
                 *
                 *  Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            // Get the width and X offset, either on top of the linked series
            // column or standalone
            ErrorBarSeries.prototype.getColumnMetrics = function () {
                return ((this.linkedParent && this.linkedParent.columnMetrics) ||
                    ColumnSeries.prototype.getColumnMetrics.call(this));
            };
            ErrorBarSeries.prototype.drawDataLabels = function () {
                var valKey = this.pointValKey;
                if (AreaRangeSeries) {
                    AreaRangeSeries.prototype.drawDataLabels.call(this);
                    // Arearange drawDataLabels does not reset point.y to high,
                    // but to low after drawing (#4133)
                    this.data.forEach(function (point) {
                        point.y = point[valKey];
                    });
                }
            };
            // return a plain array for speedy calculation
            ErrorBarSeries.prototype.toYData = function (point) {
                return [point.low, point.high];
            };
            /**
             * Error bars are a graphical representation of the variability of data and
             * are used on graphs to indicate the error, or uncertainty in a reported
             * measurement.
             *
             * @sample highcharts/demo/error-bar/
             *         Error bars on a column series
             * @sample highcharts/series-errorbar/on-scatter/
             *         Error bars on a scatter series
             *
             * @extends      plotOptions.boxplot
             * @excluding    boostBlending, boostThreshold
             * @product      highcharts highstock
             * @requires     highcharts-more
             * @optionparent plotOptions.errorbar
             */
            ErrorBarSeries.defaultOptions = merge(BoxPlotSeries.defaultOptions, {
                /**
                 * The main color of the bars. This can be overridden by
                 * [stemColor](#plotOptions.errorbar.stemColor) and
                 * [whiskerColor](#plotOptions.errorbar.whiskerColor) individually.
                 *
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default #000000
                 * @since   3.0
                 * @product highcharts
                 */
                color: "#000000" /* neutralColor100 */,
                grouping: false,
                /**
                 * The parent series of the error bar. The default value links it to
                 * the previous series. Otherwise, use the id of the parent series.
                 *
                 * @since   3.0
                 * @product highcharts
                 */
                linkedTo: ':previous',
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
                },
                /**
                 * The line width of the whiskers, the horizontal lines marking
                 * low and high values. When `null`, the general
                 * [lineWidth](#plotOptions.errorbar.lineWidth) applies.
                 *
                 * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
                 *         Error bar styling
                 *
                 * @type    {number}
                 * @since   3.0
                 * @product highcharts
                 */
                whiskerWidth: null
            });
            return ErrorBarSeries;
        }(BoxPlotSeries));
        extend(ErrorBarSeries.prototype, {
            // array point configs are mapped to this
            pointArrayMap: ['low', 'high'],
            pointValKey: 'high',
            doQuartiles: false
        });
        SeriesRegistry.registerSeriesType('errorbar', ErrorBarSeries);
        /* *
         *
         *  Default export
         *
         * */
        /* *
         *
         *  API options
         *
         * */
        /**
         * A `errorbar` series. If the [type](#series.errorbar.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.errorbar
         * @excluding dataParser, dataURL, stack, stacking, boostThreshold,
         *            boostBlending
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.errorbar
         */
        /**
         * An array of data points for the series. For the `errorbar` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 10, 2],
         *        [1, 1, 8],
         *        [2, 4, 5]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.errorbar.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 0,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 5,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @excluding dataLabels, drilldown, marker, states
         * @product   highcharts
         * @apioption series.errorbar.data
         */
        ''; // adds doclets above to transpiled file

        return ErrorBarSeries;
    });
    _registerModule(_modules, 'Series/Gauge/GaugePoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var Point = SeriesRegistry.series.prototype.pointClass;
        /* *
         *
         *  Class
         *
         * */
        var GaugePoint = /** @class */ (function (_super) {
                __extends(GaugePoint, _super);
            function GaugePoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.series = void 0;
                _this.shapeArgs = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Don't do any hover colors or anything
             * @private
             */
            GaugePoint.prototype.setState = function (state) {
                this.state = state;
            };
            return GaugePoint;
        }(Point));
        /* *
         *
         *  Default Export
         *
         * */

        return GaugePoint;
    });
    _registerModule(_modules, 'Series/Gauge/GaugeSeries.js', [_modules['Series/Gauge/GaugePoint.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (GaugePoint, H, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var noop = H.noop;
        var Series = SeriesRegistry.series,
            ColumnSeries = SeriesRegistry.seriesTypes.column;
        var clamp = U.clamp,
            isNumber = U.isNumber,
            extend = U.extend,
            merge = U.merge,
            pick = U.pick,
            pInt = U.pInt;
        /* *
         *
         *  Class
         *
         * */
        /**
         *
         * The `gauge` series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.map
         *
         * @augments Highcharts.Series
         */
        var GaugeSeries = /** @class */ (function (_super) {
                __extends(GaugeSeries, _super);
            function GaugeSeries() {
                /* *
                 *
                 *  Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.points = void 0;
                _this.options = void 0;
                _this.yAxis = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Calculate paths etc
             * @private
             */
            GaugeSeries.prototype.translate = function () {
                var series = this,
                    yAxis = series.yAxis,
                    options = series.options,
                    center = yAxis.center;
                series.generatePoints();
                series.points.forEach(function (point) {
                    var dialOptions = merge(options.dial,
                        point.dial),
                        radius = ((pInt(pick(dialOptions.radius, '80%')) * center[2]) /
                            200),
                        baseLength = ((pInt(pick(dialOptions.baseLength, '70%')) * radius) /
                            100),
                        rearLength = ((pInt(pick(dialOptions.rearLength, '10%')) * radius) /
                            100),
                        baseWidth = dialOptions.baseWidth || 3,
                        topWidth = dialOptions.topWidth || 1;
                    var overshoot = options.overshoot,
                        rotation = yAxis.startAngleRad + yAxis.translate(point.y,
                        null,
                        null,
                        null,
                        true);
                    // Handle the wrap and overshoot options
                    if (isNumber(overshoot) || options.wrap === false) {
                        overshoot = isNumber(overshoot) ?
                            (overshoot / 180 * Math.PI) : 0;
                        rotation = clamp(rotation, yAxis.startAngleRad - overshoot, yAxis.endAngleRad + overshoot);
                    }
                    rotation = rotation * 180 / Math.PI;
                    point.shapeType = 'path';
                    var d = dialOptions.path || [
                            ['M', -rearLength, -baseWidth / 2],
                            ['L',
                        baseLength, -baseWidth / 2],
                            ['L',
                        radius, -topWidth / 2],
                            ['L',
                        radius,
                        topWidth / 2],
                            ['L',
                        baseLength,
                        baseWidth / 2],
                            ['L', -rearLength,
                        baseWidth / 2],
                            ['Z']
                        ];
                    point.shapeArgs = {
                        d: d,
                        translateX: center[0],
                        translateY: center[1],
                        rotation: rotation
                    };
                    // Positions for data label
                    point.plotX = center[0];
                    point.plotY = center[1];
                });
            };
            /**
             * Draw the points where each point is one needle
             * @private
             */
            GaugeSeries.prototype.drawPoints = function () {
                var series = this,
                    chart = series.chart,
                    center = series.yAxis.center,
                    pivot = series.pivot,
                    options = series.options,
                    pivotOptions = options.pivot,
                    renderer = chart.renderer;
                series.points.forEach(function (point) {
                    var graphic = point.graphic,
                        shapeArgs = point.shapeArgs,
                        d = shapeArgs.d,
                        dialOptions = merge(options.dial,
                        point.dial); // #1233
                        if (graphic) {
                            graphic.animate(shapeArgs);
                        shapeArgs.d = d; // animate alters it
                    }
                    else {
                        point.graphic =
                            renderer[point.shapeType](shapeArgs)
                                .attr({
                                // required by VML when animation is false
                                rotation: shapeArgs.rotation,
                                zIndex: 1
                            })
                                .addClass('highcharts-dial')
                                .add(series.group);
                    }
                    // Presentational attributes
                    if (!chart.styledMode) {
                        point.graphic[graphic ? 'animate' : 'attr']({
                            stroke: dialOptions.borderColor || 'none',
                            'stroke-width': dialOptions.borderWidth || 0,
                            fill: dialOptions.backgroundColor ||
                                "#000000" /* neutralColor100 */
                        });
                    }
                });
                // Add or move the pivot
                if (pivot) {
                    pivot.animate({
                        translateX: center[0],
                        translateY: center[1]
                    });
                }
                else {
                    series.pivot =
                        renderer.circle(0, 0, pick(pivotOptions.radius, 5))
                            .attr({
                            zIndex: 2
                        })
                            .addClass('highcharts-pivot')
                            .translate(center[0], center[1])
                            .add(series.group);
                    // Presentational attributes
                    if (!chart.styledMode) {
                        series.pivot.attr({
                            'stroke-width': pivotOptions.borderWidth || 0,
                            stroke: pivotOptions.borderColor ||
                                "#cccccc" /* neutralColor20 */,
                            fill: pivotOptions.backgroundColor ||
                                "#000000" /* neutralColor100 */
                        });
                    }
                }
            };
            /**
             * Animate the arrow up from startAngle
             * @private
             */
            GaugeSeries.prototype.animate = function (init) {
                var series = this;
                if (!init) {
                    series.points.forEach(function (point) {
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
                }
            };
            /**
             * @private
             */
            GaugeSeries.prototype.render = function () {
                this.group = this.plotGroup('group', 'series', this.visible ? 'visible' : 'hidden', this.options.zIndex, this.chart.seriesGroup);
                Series.prototype.render.call(this);
                this.group.clip(this.chart.clipRect);
            };
            /**
             * Extend the basic setData method by running processData and generatePoints
             * immediately, in order to access the points from the legend.
             * @private
             */
            GaugeSeries.prototype.setData = function (data, redraw) {
                Series.prototype.setData.call(this, data, false);
                this.processData();
                this.generatePoints();
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            };
            /**
             * Define hasData function for non-cartesian series.
             * Returns true if the series has points at all.
             * @private
             */
            GaugeSeries.prototype.hasData = function () {
                return !!this.points.length; // != 0
            };
            /**
             * Gauges are circular plots displaying one or more values with a dial
             * pointing to values along the perimeter.
             *
             * @sample highcharts/demo/gauge-speedometer/
             *         Gauge chart
             *
             * @extends      plotOptions.line
             * @excluding    animationLimit, boostThreshold, colorAxis, colorKey,
             *               connectEnds, connectNulls, cropThreshold, dashStyle,
             *               dragDrop, findNearestPointBy, getExtremesFromAll, marker,
             *               negativeColor, pointPlacement, shadow, softThreshold,
             *               stacking, states, step, threshold, turboThreshold, xAxis,
             *               zoneAxis, zones, dataSorting, boostBlending
             * @product      highcharts
             * @requires     highcharts-more
             * @optionparent plotOptions.gauge
             */
            GaugeSeries.defaultOptions = merge(Series.defaultOptions, {
                /**
                 * When this option is `true`, the dial will wrap around the axes.
                 * For instance, in a full-range gauge going from 0 to 360, a value
                 * of 400 will point to 40\. When `wrap` is `false`, the dial stops
                 * at 360.
                 *
                 * @see [overshoot](#plotOptions.gauge.overshoot)
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.wrap
                 */
                /**
                 * Data labels for the gauge. For gauges, the data labels are
                 * enabled by default and shown in a bordered box below the point.
                 *
                 * @since   2.3.0
                 * @product highcharts
                 */
                dataLabels: {
                    borderColor: "#cccccc" /* neutralColor20 */,
                    borderRadius: 3,
                    borderWidth: 1,
                    crop: false,
                    defer: false,
                    enabled: true,
                    verticalAlign: 'top',
                    y: 15,
                    zIndex: 2
                },
                /**
                 * Options for the dial or arrow pointer of the gauge.
                 *
                 * In styled mode, the dial is styled with the
                 * `.highcharts-gauge-series .highcharts-dial` rule.
                 *
                 * @sample {highcharts} highcharts/css/gauge/
                 *         Styled mode
                 *
                 * @type    {*}
                 * @since   2.3.0
                 * @product highcharts
                 */
                dial: {},
                /**
                 * The length of the dial's base part, relative to the total radius
                 * or length of the dial.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {string}
                 * @default   70%
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.baseLength
                 */
                /**
                 * The pixel width of the base of the gauge dial. The base is the
                 * part closest to the pivot, defined by baseLength.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {number}
                 * @default   3
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.baseWidth
                 */
                /**
                 * The radius or length of the dial, in percentages relative to the
                 * radius of the gauge itself.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {string}
                 * @default   80%
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.radius
                 */
                /**
                 * The length of the dial's rear end, the part that extends out on
                 * the other side of the pivot. Relative to the dial's length.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {string}
                 * @default   10%
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.rearLength
                 */
                /**
                 * The width of the top of the dial, closest to the perimeter. The
                 * pivot narrows in from the base to the top.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {number}
                 * @default   1
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.topWidth
                 */
                /**
                 * The background or fill color of the gauge's dial.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   #000000
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.backgroundColor
                 */
                /**
                 * The border color or stroke of the gauge's dial. By default, the
                 * borderWidth is 0, so this must be set in addition to a custom
                 * border color.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   #cccccc
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.borderColor
                 */
                /**
                 * The width of the gauge dial border in pixels.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-dial/
                 *         Dial options demonstrated
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.dial.borderWidth
                 */
                /**
                 * Allow the dial to overshoot the end of the perimeter axis by
                 * this many degrees. Say if the gauge axis goes from 0 to 60, a
                 * value of 100, or 1000, will show 5 degrees beyond the end of the
                 * axis when this option is set to 5.
                 *
                 * @see [wrap](#plotOptions.gauge.wrap)
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-overshoot/
                 *         Allow 5 degrees overshoot
                 *
                 * @type      {number}
                 * @since     3.0.10
                 * @product   highcharts
                 * @apioption plotOptions.gauge.overshoot
                 */
                /**
                 * Options for the pivot or the center point of the gauge.
                 *
                 * In styled mode, the pivot is styled with the
                 * `.highcharts-gauge-series .highcharts-pivot` rule.
                 *
                 * @sample {highcharts} highcharts/css/gauge/
                 *         Styled mode
                 *
                 * @type    {*}
                 * @since   2.3.0
                 * @product highcharts
                 */
                pivot: {},
                /**
                 * The pixel radius of the pivot.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
                 *         Pivot options demonstrated
                 *
                 * @type      {number}
                 * @default   5
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.pivot.radius
                 */
                /**
                 * The border or stroke width of the pivot.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
                 *         Pivot options demonstrated
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.pivot.borderWidth
                 */
                /**
                 * The border or stroke color of the pivot. In able to change this,
                 * the borderWidth must also be set to something other than the
                 * default 0.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
                 *         Pivot options demonstrated
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   #cccccc
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.pivot.borderColor
                 */
                /**
                 * The background color or fill of the pivot.
                 *
                 * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
                 *         Pivot options demonstrated
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   #000000
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.gauge.pivot.backgroundColor
                 */
                tooltip: {
                    headerFormat: ''
                },
                /**
                 * Whether to display this particular series or series type in the
                 * legend. Defaults to false for gauge series.
                 *
                 * @since   2.3.0
                 * @product highcharts
                 */
                showInLegend: false
                // Prototype members
            });
            return GaugeSeries;
        }(Series));
        extend(GaugeSeries.prototype, {
            // chart.angular will be set to true when a gauge series is present,
            // and this will be used on the axes
            angular: true,
            directTouch: true,
            drawGraph: noop,
            drawTracker: ColumnSeries.prototype.drawTracker,
            fixedBox: true,
            forceDL: true,
            noSharedTooltip: true,
            pointClass: GaugePoint,
            trackerGroups: ['group', 'dataLabelsGroup']
        });
        SeriesRegistry.registerSeriesType('gauge', GaugeSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API options
         *
         * */
        /**
         * A `gauge` series. If the [type](#series.gauge.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.gauge
         * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
         *            cropThreshold, dashStyle, dataParser, dataURL, findNearestPointBy,
         *            getExtremesFromAll, marker, negativeColor, pointPlacement, shadow,
         *            softThreshold, stack, stacking, states, step, threshold,
         *            turboThreshold, zoneAxis, zones, dataSorting, boostBlending
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.gauge
         */
        /**
         * An array of data points for the series. For the `gauge` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.gauge.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        y: 6,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        y: 8,
         *        name: "Point1",
         *       color: "#FF00FF"
         *    }]
         *    ```
         *
         * The typical gauge only contains a single data value.
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|null|*>}
         * @extends   series.line.data
         * @excluding drilldown, marker, x
         * @product   highcharts
         * @apioption series.gauge.data
         */
        ''; // adds the doclets above in the transpiled file

        return GaugeSeries;
    });
    _registerModule(_modules, 'Series/PackedBubble/PackedBubblePoint.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/SeriesRegistry.js']], function (Chart, Point, SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2021 Grzegorz Blachlinski, Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var BubbleSeries = SeriesRegistry.seriesTypes.bubble;
        /* *
         *
         *  Class
         *
         * */
        var PackedBubblePoint = /** @class */ (function (_super) {
                __extends(PackedBubblePoint, _super);
            function PackedBubblePoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.degree = NaN;
                _this.mass = NaN;
                _this.radius = NaN;
                _this.options = void 0;
                _this.series = void 0;
                _this.value = null;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Destroy point.
             * Then remove point from the layout.
             * @private
             */
            PackedBubblePoint.prototype.destroy = function () {
                if (this.series.layout) {
                    this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                }
                return Point.prototype.destroy.apply(this, arguments);
            };
            PackedBubblePoint.prototype.firePointEvent = function () {
                var point = this,
                    series = this.series,
                    seriesOptions = series.options;
                if (this.isParentNode && seriesOptions.parentNode) {
                    var temp = seriesOptions.allowPointSelect;
                    seriesOptions.allowPointSelect = (seriesOptions.parentNode.allowPointSelect);
                    Point.prototype.firePointEvent.apply(this, arguments);
                    seriesOptions.allowPointSelect = temp;
                }
                else {
                    Point.prototype.firePointEvent.apply(this, arguments);
                }
            };
            PackedBubblePoint.prototype.select = function () {
                var point = this,
                    series = this.series,
                    chart = series.chart;
                if (point.isParentNode) {
                    chart.getSelectedPoints = chart.getSelectedParentNodes;
                    Point.prototype.select.apply(this, arguments);
                    chart.getSelectedPoints = Chart.prototype.getSelectedPoints;
                }
                else {
                    Point.prototype.select.apply(this, arguments);
                }
            };
            return PackedBubblePoint;
        }(BubbleSeries.prototype.pointClass));
        /* *
         *
         *  Default Export
         *
         * */

        return PackedBubblePoint;
    });
    _registerModule(_modules, 'Series/Networkgraph/DraggableNodes.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.dragNodesMixin = {
            /**
             * Mouse down action, initializing drag&drop mode.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             * @param {Highcharts.PointerEventObject} event Browser event, before normalization.
             */
            onMouseDown: function (point, event) {
                var normalizedEvent = this.chart.pointer.normalize(event);
                point.fixedPosition = {
                    chartX: normalizedEvent.chartX,
                    chartY: normalizedEvent.chartY,
                    plotX: point.plotX,
                    plotY: point.plotY
                };
                point.inDragMode = true;
            },
            /**
             * Mouse move action during drag&drop.
             *
             * @private
             *
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             *
             */
            onMouseMove: function (point, event) {
                if (point.fixedPosition && point.inDragMode) {
                    var series = this,
                        chart = series.chart,
                        normalizedEvent = chart.pointer.normalize(event),
                        diffX = point.fixedPosition.chartX - normalizedEvent.chartX,
                        diffY = point.fixedPosition.chartY - normalizedEvent.chartY,
                        newPlotX = void 0,
                        newPlotY = void 0,
                        graphLayoutsLookup = chart.graphLayoutsLookup;
                    // At least 5px to apply change (avoids simple click):
                    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                        newPlotX = point.fixedPosition.plotX - diffX;
                        newPlotY = point.fixedPosition.plotY - diffY;
                        if (chart.isInsidePlot(newPlotX, newPlotY)) {
                            point.plotX = newPlotX;
                            point.plotY = newPlotY;
                            point.hasDragged = true;
                            this.redrawHalo(point);
                            graphLayoutsLookup.forEach(function (layout) {
                                layout.restartSimulation();
                            });
                        }
                    }
                }
            },
            /**
             * Mouse up action, finalizing drag&drop.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseUp: function (point, event) {
                if (point.fixedPosition) {
                    if (point.hasDragged) {
                        if (this.layout.enableSimulation) {
                            this.layout.start();
                        }
                        else {
                            this.chart.redraw();
                        }
                    }
                    point.inDragMode = point.hasDragged = false;
                    if (!this.options.fixedDraggable) {
                        delete point.fixedPosition;
                    }
                }
            },
            // Draggable mode:
            /**
             * Redraw halo on mousemove during the drag&drop action.
             *
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             */
            redrawHalo: function (point) {
                if (point && this.halo) {
                    this.halo.attr({
                        d: point.haloPath(this.options.states.hover.halo.size)
                    });
                }
            }
        };
        /*
         * Draggable mode:
         */
        addEvent(Chart, 'load', function () {
            var chart = this,
                mousedownUnbinder,
                mousemoveUnbinder,
                mouseupUnbinder;
            if (chart.container) {
                mousedownUnbinder = addEvent(chart.container, 'mousedown', function (event) {
                    var point = chart.hoverPoint;
                    if (point &&
                        point.series &&
                        point.series.hasDraggableNodes &&
                        point.series.options.draggable) {
                        point.series.onMouseDown(point, event);
                        mousemoveUnbinder = addEvent(chart.container, 'mousemove', function (e) {
                            return point &&
                                point.series &&
                                point.series.onMouseMove(point, e);
                        });
                        mouseupUnbinder = addEvent(chart.container.ownerDocument, 'mouseup', function (e) {
                            mousemoveUnbinder();
                            mouseupUnbinder();
                            return point &&
                                point.series &&
                                point.series.onMouseUp(point, e);
                        });
                    }
                });
            }
            addEvent(chart, 'destroy', function () {
                mousedownUnbinder();
            });
        });

    });
    _registerModule(_modules, 'Series/Networkgraph/Integrations.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.networkgraphIntegrations = {
            verlet: {
                /**
                 * Attractive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.attractiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                attractiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d;
                },
                /**
                 * Repulsive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.repulsiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                repulsiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d * (k > d ? 1 : 0); // Force only for close nodes
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                     */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant,
                        xFactor = this.barycenter.xFactor,
                        yFactor = this.barycenter.yFactor;
                    // To consider:
                    xFactor = (xFactor - (this.box.left + this.box.width) / 2) *
                        gravitationalConstant;
                    yFactor = (yFactor - (this.box.top + this.box.height) / 2) *
                        gravitationalConstant;
                    this.nodes.forEach(function (node) {
                        if (!node.fixedPosition) {
                            node.plotX -=
                                xFactor / node.mass / node.degree;
                            node.plotY -=
                                yFactor / node.mass / node.degree;
                        }
                    });
                },
                /**
                 * Repulsive force.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @param {Highcharts.Point} node
                 *        Node that should be translated by force.
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distance
                 *        Distance between two nodes e.g. `{x, y}`
                     */
                repulsive: function (node, force, distanceXY) {
                    var factor = force * this.diffTemperature / node.mass / node.degree;
                    if (!node.fixedPosition) {
                        node.plotX += distanceXY.x * factor;
                        node.plotY += distanceXY.y * factor;
                    }
                },
                /**
                 * Attractive force.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @param {Highcharts.Point} link
                 *        Link that connects two nodes
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distance
                 *        Distance between two nodes e.g. `{x, y}`
                     */
                attractive: function (link, force, distanceXY) {
                    var massFactor = link.getMass(),
                        translatedX = -distanceXY.x * force * this.diffTemperature,
                        translatedY = -distanceXY.y * force * this.diffTemperature;
                    if (!link.fromNode.fixedPosition) {
                        link.fromNode.plotX -=
                            translatedX * massFactor.fromNode / link.fromNode.degree;
                        link.fromNode.plotY -=
                            translatedY * massFactor.fromNode / link.fromNode.degree;
                    }
                    if (!link.toNode.fixedPosition) {
                        link.toNode.plotX +=
                            translatedX * massFactor.toNode / link.toNode.degree;
                        link.toNode.plotY +=
                            translatedY * massFactor.toNode / link.toNode.degree;
                    }
                },
                /**
                 * Integration method.
                 *
                 * In Verlet integration, forces are applied on node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * Verlet without velocity:
                 *
                 *    x(n+1) = 2 * x(n) - x(n-1) + A(T) * deltaT ^ 2
                 *
                 * where:
                 *     - x(n+1) - new position
                 *     - x(n) - current position
                 *     - x(n-1) - previous position
                 *
                 * Assuming A(t) = 0 (no acceleration) and (deltaT = 1) we get:
                 *
                 *     x(n+1) = x(n) + (x(n) - x(n-1))
                 *
                 * where:
                 *     - (x(n) - x(n-1)) - position change
                 *
                 * TO DO:
                 * Consider Verlet with velocity to support additional
                 * forces. Or even Time-Corrected Verlet by Jonathan
                 * "lonesock" Dummer
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout layout object
                 * @param {Highcharts.Point} node node that should be translated
                     */
                integrate: function (layout, node) {
                    var friction = -layout.options.friction,
                        maxSpeed = layout.options.maxSpeed,
                        prevX = node.prevX,
                        prevY = node.prevY, 
                        // Apply friciton:
                        diffX = ((node.plotX + node.dispX -
                            prevX) * friction),
                        diffY = ((node.plotY + node.dispY -
                            prevY) * friction),
                        abs = Math.abs,
                        signX = abs(diffX) / (diffX || 1), // need to deal with 0
                        signY = abs(diffY) / (diffY || 1);
                    // Apply max speed:
                    diffX = signX * Math.min(maxSpeed, Math.abs(diffX));
                    diffY = signY * Math.min(maxSpeed, Math.abs(diffY));
                    // Store for the next iteration:
                    node.prevX = node.plotX + node.dispX;
                    node.prevY = node.plotY + node.dispY;
                    // Update positions:
                    node.plotX += diffX;
                    node.plotY += diffY;
                    node.temperature = layout.vectorLength({
                        x: diffX,
                        y: diffY
                    });
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 * @private
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.5);
                }
            },
            euler: {
                /**
                 * Attractive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.attractiveForce`
                 *
                 * Other forces that can be used:
                 *
                 * basic, not recommended:
                 *    `function (d, k) { return d / k }`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                attractiveForceFunction: function (d, k) {
                    return d * d / k;
                },
                /**
                 * Repulsive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.repulsiveForce`.
                 *
                 * Other forces that can be used:
                 *
                 * basic, not recommended:
                 *    `function (d, k) { return k / d }`
                 *
                 * standard:
                 *    `function (d, k) { return k * k / d }`
                 *
                 * grid-variant:
                 *    `function (d, k) { return k * k / d * (2 * k - d > 0 ? 1 : 0) }`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                repulsiveForceFunction: function (d, k) {
                    return k * k / d;
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Euler integration, force is stored in a node, not changing it's
                 * position. Later, in `integrate()` forces are applied on nodes.
                 *
                 * @private
                     */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant,
                        xFactor = this.barycenter.xFactor,
                        yFactor = this.barycenter.yFactor;
                    this.nodes.forEach(function (node) {
                        if (!node.fixedPosition) {
                            var degree = node.getDegree(),
                                phi = degree * (1 + degree / 2);
                            node.dispX += ((xFactor - node.plotX) *
                                gravitationalConstant *
                                phi / node.degree);
                            node.dispY += ((yFactor - node.plotY) *
                                gravitationalConstant *
                                phi / node.degree);
                        }
                    });
                },
                /**
                 * Repulsive force.
                 *
                 * @private
                 * @param {Highcharts.Point} node
                 *        Node that should be translated by force.
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distanceXY
                 *        Distance between two nodes e.g. `{x, y}`
                     */
                repulsive: function (node, force, distanceXY, distanceR) {
                    node.dispX +=
                        (distanceXY.x / distanceR) * force / node.degree;
                    node.dispY +=
                        (distanceXY.y / distanceR) * force / node.degree;
                },
                /**
                 * Attractive force.
                 *
                 * In Euler integration, force is stored in a node, not changing it's
                 * position. Later, in `integrate()` forces are applied on nodes.
                 *
                 * @private
                 * @param {Highcharts.Point} link
                 *        Link that connects two nodes
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distanceXY
                 *        Distance between two nodes e.g. `{x, y}`
                 * @param {number} distanceR
                     */
                attractive: function (link, force, distanceXY, distanceR) {
                    var massFactor = link.getMass(),
                        translatedX = (distanceXY.x / distanceR) * force,
                        translatedY = (distanceXY.y / distanceR) * force;
                    if (!link.fromNode.fixedPosition) {
                        link.fromNode.dispX -=
                            translatedX * massFactor.fromNode / link.fromNode.degree;
                        link.fromNode.dispY -=
                            translatedY * massFactor.fromNode / link.fromNode.degree;
                    }
                    if (!link.toNode.fixedPosition) {
                        link.toNode.dispX +=
                            translatedX * massFactor.toNode / link.toNode.degree;
                        link.toNode.dispY +=
                            translatedY * massFactor.toNode / link.toNode.degree;
                    }
                },
                /**
                 * Integration method.
                 *
                 * In Euler integration, force were stored in a node, not changing it's
                 * position. Now, in the integrator method, we apply changes.
                 *
                 * Euler:
                 *
                 * Basic form: `x(n+1) = x(n) + v(n)`
                 *
                 * With Rengoild-Fruchterman we get:
                 * `x(n+1) = x(n) + v(n) / length(v(n)) * min(v(n), temperature(n))`
                 * where:
                 * - `x(n+1)`: next position
                 * - `x(n)`: current position
                 * - `v(n)`: velocity (comes from net force)
                 * - `temperature(n)`: current temperature
                 *
                 * Known issues:
                 * Oscillations when force vector has the same magnitude but opposite
                 * direction in the next step. Potentially solved by decreasing force by
                 * `v * (1 / node.degree)`
                 *
                 * Note:
                 * Actually `min(v(n), temperature(n))` replaces simulated annealing.
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout
                 *        Layout object
                 * @param {Highcharts.Point} node
                 *        Node that should be translated
                     */
                integrate: function (layout, node) {
                    var distanceR;
                    node.dispX +=
                        node.dispX * layout.options.friction;
                    node.dispY +=
                        node.dispY * layout.options.friction;
                    distanceR = node.temperature = layout.vectorLength({
                        x: node.dispX,
                        y: node.dispY
                    });
                    if (distanceR !== 0) {
                        node.plotX += (node.dispX / distanceR *
                            Math.min(Math.abs(node.dispX), layout.temperature));
                        node.plotY += (node.dispY / distanceR *
                            Math.min(Math.abs(node.dispY), layout.temperature));
                    }
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 * @private
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.3);
                }
            }
        };

    });
    _registerModule(_modules, 'Series/Networkgraph/QuadTree.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The QuadTree node class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTreeNode
         *
         * @param {Highcharts.Dictionary<number>} box Available space for the node
         */
        var QuadTreeNode = H.QuadTreeNode = function (box) {
                /**
                 * Read only. The available space for node.
                 *
                 * @name Highcharts.QuadTreeNode#box
                 * @type {Highcharts.Dictionary<number>}
                 */
                this.box = box;
            /**
             * Read only. The minium of width and height values.
             *
             * @name Highcharts.QuadTreeNode#boxSize
             * @type {number}
             */
            this.boxSize = Math.min(box.width, box.height);
            /**
             * Read only. Array of subnodes. Empty if QuadTreeNode has just one Point.
             * When added another Point to this QuadTreeNode, array is filled with four
             * subnodes.
             *
             * @name Highcharts.QuadTreeNode#nodes
             * @type {Array<Highcharts.QuadTreeNode>}
             */
            this.nodes = [];
            /**
             * Read only. Flag to determine if QuadTreeNode is internal (and has
             * subnodes with mass and central position) or external (bound to Point).
             *
             * @name Highcharts.QuadTreeNode#isInternal
             * @type {boolean}
             */
            this.isInternal = false;
            /**
             * Read only. If QuadTreeNode is an external node, Point is stored in
             * `this.body`.
             *
             * @name Highcharts.QuadTreeNode#body
             * @type {boolean|Highcharts.Point}
             */
            this.body = false;
            /**
             * Read only. Internal nodes when created are empty to reserve the space. If
             * Point is added to this QuadTreeNode, QuadTreeNode is no longer empty.
             *
             * @name Highcharts.QuadTreeNode#isEmpty
             * @type {boolean}
             */
            this.isEmpty = true;
        };
        extend(QuadTreeNode.prototype, 
        /** @lends Highcharts.QuadTreeNode.prototype */
        {
            /**
             * Insert recursively point(node) into the QuadTree. If the given
             * quadrant is already occupied, divide it into smaller quadrants.
             *
             * @param {Highcharts.Point} point
             *        Point/node to be inserted
             * @param {number} depth
             *        Max depth of the QuadTree
             */
            insert: function (point, depth) {
                var newQuadTreeNode;
                if (this.isInternal) {
                    // Internal node:
                    this.nodes[this.getBoxPosition(point)].insert(point, depth - 1);
                }
                else {
                    this.isEmpty = false;
                    if (!this.body) {
                        // First body in a quadrant:
                        this.isInternal = false;
                        this.body = point;
                    }
                    else {
                        if (depth) {
                            // Every other body in a quadrant:
                            this.isInternal = true;
                            this.divideBox();
                            // Reinsert main body only once:
                            if (this.body !== true) {
                                this.nodes[this.getBoxPosition(this.body)]
                                    .insert(this.body, depth - 1);
                                this.body = true;
                            }
                            // Add second body:
                            this.nodes[this.getBoxPosition(point)]
                                .insert(point, depth - 1);
                        }
                        else {
                            // We are below max allowed depth. That means either:
                            // - really huge number of points
                            // - falling two points into exactly the same position
                            // In this case, create another node in the QuadTree.
                            //
                            // Alternatively we could add some noise to the
                            // position, but that could result in different
                            // rendered chart in exporting.
                            newQuadTreeNode = new QuadTreeNode({
                                top: point.plotX,
                                left: point.plotY,
                                // Width/height below 1px
                                width: 0.1,
                                height: 0.1
                            });
                            newQuadTreeNode.body = point;
                            newQuadTreeNode.isInternal = false;
                            this.nodes.push(newQuadTreeNode);
                        }
                    }
                }
            },
            /**
             * Each quad node requires it's mass and center position. That mass and
             * position is used to imitate real node in the layout by approximation.
             */
            updateMassAndCenter: function () {
                var mass = 0,
                    plotX = 0,
                    plotY = 0;
                if (this.isInternal) {
                    // Calcualte weightened mass of the quad node:
                    this.nodes.forEach(function (pointMass) {
                        if (!pointMass.isEmpty) {
                            mass += pointMass.mass;
                            plotX +=
                                pointMass.plotX * pointMass.mass;
                            plotY +=
                                pointMass.plotY * pointMass.mass;
                        }
                    });
                    plotX /= mass;
                    plotY /= mass;
                }
                else if (this.body) {
                    // Just one node, use coordinates directly:
                    mass = this.body.mass;
                    plotX = this.body.plotX;
                    plotY = this.body.plotY;
                }
                // Store details:
                this.mass = mass;
                this.plotX = plotX;
                this.plotY = plotY;
            },
            /**
             * When inserting another node into the box, that already hove one node,
             * divide the available space into another four quadrants.
             *
             * Indexes of quadrants are:
             * ```
             * -------------               -------------
             * |           |               |     |     |
             * |           |               |  0  |  1  |
             * |           |   divide()    |     |     |
             * |     1     | ----------->  -------------
             * |           |               |     |     |
             * |           |               |  3  |  2  |
             * |           |               |     |     |
             * -------------               -------------
             * ```
             */
            divideBox: function () {
                var halfWidth = this.box.width / 2,
                    halfHeight = this.box.height / 2;
                // Top left
                this.nodes[0] = new QuadTreeNode({
                    left: this.box.left,
                    top: this.box.top,
                    width: halfWidth,
                    height: halfHeight
                });
                // Top right
                this.nodes[1] = new QuadTreeNode({
                    left: this.box.left + halfWidth,
                    top: this.box.top,
                    width: halfWidth,
                    height: halfHeight
                });
                // Bottom right
                this.nodes[2] = new QuadTreeNode({
                    left: this.box.left + halfWidth,
                    top: this.box.top + halfHeight,
                    width: halfWidth,
                    height: halfHeight
                });
                // Bottom left
                this.nodes[3] = new QuadTreeNode({
                    left: this.box.left,
                    top: this.box.top + halfHeight,
                    width: halfWidth,
                    height: halfHeight
                });
            },
            /**
             * Determine which of the quadrants should be used when placing node in
             * the QuadTree. Returned index is always in range `< 0 , 3 >`.
             * @private
             */
            getBoxPosition: function (point) {
                var left = point.plotX < this.box.left + this.box.width / 2,
                    top = point.plotY < this.box.top + this.box.height / 2,
                    index;
                if (left) {
                    if (top) {
                        // Top left
                        index = 0;
                    }
                    else {
                        // Bottom left
                        index = 3;
                    }
                }
                else {
                    if (top) {
                        // Top right
                        index = 1;
                    }
                    else {
                        // Bottom right
                        index = 2;
                    }
                }
                return index;
            }
        });
        /**
         * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTree
         *
         * @param {number} x left position of the plotting area
         * @param {number} y top position of the plotting area
         * @param {number} width width of the plotting area
         * @param {number} height height of the plotting area
         */
        var QuadTree = H.QuadTree = function (x,
            y,
            width,
            height) {
                // Boundary rectangle:
                this.box = {
                    left: x,
                    top: y,
                    width: width,
                    height: height
                };
            this.maxDepth = 25;
            this.root = new QuadTreeNode(this.box, '0');
            this.root.isInternal = true;
            this.root.isRoot = true;
            this.root.divideBox();
        };
        extend(QuadTree.prototype, 
        /** @lends Highcharts.QuadTree.prototype */
        {
            /**
             * Insert nodes into the QuadTree
             *
             * @param {Array<Highcharts.Point>} points
             */
            insertNodes: function (points) {
                points.forEach(function (point) {
                    this.root.insert(point, this.maxDepth);
                }, this);
            },
            /**
             * Depfth first treversal (DFS). Using `before` and `after` callbacks,
             * we can get two results: preorder and postorder traversals, reminder:
             *
             * ```
             *     (a)
             *     / \
             *   (b) (c)
             *   / \
             * (d) (e)
             * ```
             *
             * DFS (preorder): `a -> b -> d -> e -> c`
             *
             * DFS (postorder): `d -> e -> b -> c -> a`
             *
             * @param {Highcharts.QuadTreeNode|null} node
             * @param {Function} [beforeCallback] function to be called before
             *                      visiting children nodes
             * @param {Function} [afterCallback] function to be called after
             *                      visiting children nodes
             */
            visitNodeRecursive: function (node, beforeCallback, afterCallback) {
                var goFurther;
                if (!node) {
                    node = this.root;
                }
                if (node === this.root && beforeCallback) {
                    goFurther = beforeCallback(node);
                }
                if (goFurther === false) {
                    return;
                }
                node.nodes.forEach(function (qtNode) {
                    if (qtNode.isInternal) {
                        if (beforeCallback) {
                            goFurther = beforeCallback(qtNode);
                        }
                        if (goFurther === false) {
                            return;
                        }
                        this.visitNodeRecursive(qtNode, beforeCallback, afterCallback);
                    }
                    else if (qtNode.body) {
                        if (beforeCallback) {
                            beforeCallback(qtNode.body);
                        }
                    }
                    if (afterCallback) {
                        afterCallback(qtNode);
                    }
                }, this);
                if (node === this.root && afterCallback) {
                    afterCallback(node);
                }
            },
            /**
             * Calculate mass of the each QuadNode in the tree.
             */
            calculateMassAndCenter: function () {
                this.visitNodeRecursive(null, null, function (node) {
                    node.updateMassAndCenter();
                });
            }
        });

    });
    _registerModule(_modules, 'Series/Networkgraph/Layouts.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, A, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setAnimation = A.setAnimation;
        var addEvent = U.addEvent,
            clamp = U.clamp,
            defined = U.defined,
            extend = U.extend,
            isFunction = U.isFunction,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.layouts = {
            'reingold-fruchterman': function () {
            }
        };
        extend(
        /**
         * Reingold-Fruchterman algorithm from
         * "Graph Drawing by Force-directed Placement" paper.
         * @private
         */
        H.layouts['reingold-fruchterman'].prototype, {
            init: function (options) {
                this.options = options;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                this.setInitialRendering(true);
                this.integration =
                    H.networkgraphIntegrations[options.integration];
                this.enableSimulation = options.enableSimulation;
                this.attractiveForce = pick(options.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = pick(options.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = options.approximation;
            },
            updateSimulation: function (enable) {
                this.enableSimulation = pick(enable, this.options.enableSimulation);
            },
            start: function () {
                var layout = this,
                    series = this.series,
                    options = this.options;
                layout.currentStep = 0;
                layout.forces = series[0] && series[0].forces || [];
                layout.chart = series[0] && series[0].chart;
                if (layout.initialRendering) {
                    layout.initPositions();
                    // Render elements in initial positions:
                    series.forEach(function (s) {
                        s.finishedAnimating = true; // #13169
                        s.render();
                    });
                }
                layout.setK();
                layout.resetSimulation(options);
                if (layout.enableSimulation) {
                    layout.step();
                }
            },
            step: function () {
                var layout = this,
                    series = this.series,
                    options = this.options;
                // Algorithm:
                layout.currentStep++;
                if (layout.approximation === 'barnes-hut') {
                    layout.createQuadTree();
                    layout.quadTree.calculateMassAndCenter();
                }
                layout.forces.forEach(function (forceName) {
                    layout[forceName + 'Forces'](layout.temperature);
                });
                // Limit to the plotting area and cool down:
                layout.applyLimits(layout.temperature);
                // Cool down the system:
                layout.temperature = layout.coolDown(layout.startTemperature, layout.diffTemperature, layout.currentStep);
                layout.prevSystemTemperature = layout.systemTemperature;
                layout.systemTemperature = layout.getSystemTemperature();
                if (layout.enableSimulation) {
                    series.forEach(function (s) {
                        // Chart could be destroyed during the simulation
                        if (s.chart) {
                            s.render();
                        }
                    });
                    if (layout.maxIterations-- &&
                        isFinite(layout.temperature) &&
                        !layout.isStable()) {
                        if (layout.simulation) {
                            H.win.cancelAnimationFrame(layout.simulation);
                        }
                        layout.simulation = H.win.requestAnimationFrame(function () {
                            layout.step();
                        });
                    }
                    else {
                        layout.simulation = false;
                    }
                }
            },
            stop: function () {
                if (this.simulation) {
                    H.win.cancelAnimationFrame(this.simulation);
                }
            },
            setArea: function (x, y, w, h) {
                this.box = {
                    left: x,
                    top: y,
                    width: w,
                    height: h
                };
            },
            setK: function () {
                // Optimal distance between nodes,
                // available space around the node:
                this.k = this.options.linkLength || this.integration.getK(this);
            },
            addElementsToCollection: function (elements, collection) {
                elements.forEach(function (elem) {
                    if (collection.indexOf(elem) === -1) {
                        collection.push(elem);
                    }
                });
            },
            removeElementFromCollection: function (element, collection) {
                var index = collection.indexOf(element);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
            },
            clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            },
            resetSimulation: function () {
                this.forcedStop = false;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            },
            restartSimulation: function () {
                if (!this.simulation) {
                    // When dragging nodes, we don't need to calculate
                    // initial positions and rendering nodes:
                    this.setInitialRendering(false);
                    // Start new simulation:
                    if (!this.enableSimulation) {
                        // Run only one iteration to speed things up:
                        this.setMaxIterations(1);
                    }
                    else {
                        this.start();
                    }
                    if (this.chart) {
                        this.chart.redraw();
                    }
                    // Restore defaults:
                    this.setInitialRendering(true);
                }
                else {
                    // Extend current simulation:
                    this.resetSimulation();
                }
            },
            setMaxIterations: function (maxIterations) {
                this.maxIterations = pick(maxIterations, this.options.maxIterations);
            },
            setTemperature: function () {
                this.temperature = this.startTemperature =
                    Math.sqrt(this.nodes.length);
            },
            setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature /
                    (this.options.maxIterations + 1);
            },
            setInitialRendering: function (enable) {
                this.initialRendering = enable;
            },
            createQuadTree: function () {
                this.quadTree = new H.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            },
            initPositions: function () {
                var initialPositions = this.options.initialPositions;
                if (isFunction(initialPositions)) {
                    initialPositions.call(this);
                    this.nodes.forEach(function (node) {
                        if (!defined(node.prevX)) {
                            node.prevX = node.plotX;
                        }
                        if (!defined(node.prevY)) {
                            node.prevY = node.plotY;
                        }
                        node.dispX = 0;
                        node.dispY = 0;
                    });
                }
                else if (initialPositions === 'circle') {
                    this.setCircularPositions();
                }
                else {
                    this.setRandomPositions();
                }
            },
            setCircularPositions: function () {
                var box = this.box,
                    nodes = this.nodes,
                    nodesLength = nodes.length + 1,
                    angle = 2 * Math.PI / nodesLength,
                    rootNodes = nodes.filter(function (node) {
                        return node.linksTo.length === 0;
                }), sortedNodes = [], visitedNodes = {}, radius = this.options.initialPositionRadius;
                /**
                 * @private
                 */
                function addToNodes(node) {
                    node.linksFrom.forEach(function (link) {
                        if (!visitedNodes[link.toNode.id]) {
                            visitedNodes[link.toNode.id] = true;
                            sortedNodes.push(link.toNode);
                            addToNodes(link.toNode);
                        }
                    });
                }
                // Start with identified root nodes an sort the nodes by their
                // hierarchy. In trees, this ensures that branches don't cross
                // eachother.
                rootNodes.forEach(function (rootNode) {
                    sortedNodes.push(rootNode);
                    addToNodes(rootNode);
                });
                // Cyclic tree, no root node found
                if (!sortedNodes.length) {
                    sortedNodes = nodes;
                    // Dangling, cyclic trees
                }
                else {
                    nodes.forEach(function (node) {
                        if (sortedNodes.indexOf(node) === -1) {
                            sortedNodes.push(node);
                        }
                    });
                }
                // Initial positions are laid out along a small circle, appearing
                // as a cluster in the middle
                sortedNodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width / 2 + radius * Math.cos(index * angle));
                    node.plotY = node.prevY = pick(node.plotY, box.height / 2 + radius * Math.sin(index * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            setRandomPositions: function () {
                var box = this.box,
                    nodes = this.nodes,
                    nodesLength = nodes.length + 1;
                /**
                 * Return a repeatable, quasi-random number based on an integer
                 * input. For the initial positions
                 * @private
                 */
                function unrandom(n) {
                    var rand = n * n / Math.PI;
                    rand = rand - Math.floor(rand);
                    return rand;
                }
                // Initial positions:
                nodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width * unrandom(index));
                    node.plotY = node.prevY = pick(node.plotY, box.height * unrandom(nodesLength + index));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            force: function (name) {
                this.integration[name].apply(this, Array.prototype.slice.call(arguments, 1));
            },
            barycenterForces: function () {
                this.getBarycenter();
                this.force('barycenter');
            },
            getBarycenter: function () {
                var systemMass = 0,
                    cx = 0,
                    cy = 0;
                this.nodes.forEach(function (node) {
                    cx += node.plotX * node.mass;
                    cy += node.plotY * node.mass;
                    systemMass += node.mass;
                });
                this.barycenter = {
                    x: cx,
                    y: cy,
                    xFactor: cx / systemMass,
                    yFactor: cy / systemMass
                };
                return this.barycenter;
            },
            barnesHutApproximation: function (node, quadNode) {
                var layout = this,
                    distanceXY = layout.getDistXY(node,
                    quadNode),
                    distanceR = layout.vectorLength(distanceXY),
                    goDeeper,
                    force;
                if (node !== quadNode && distanceR !== 0) {
                    if (quadNode.isInternal) {
                        // Internal node:
                        if (quadNode.boxSize / distanceR <
                            layout.options.theta &&
                            distanceR !== 0) {
                            // Treat as an external node:
                            force = layout.repulsiveForce(distanceR, layout.k);
                            layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                            goDeeper = false;
                        }
                        else {
                            // Go deeper:
                            goDeeper = true;
                        }
                    }
                    else {
                        // External node, direct force:
                        force = layout.repulsiveForce(distanceR, layout.k);
                        layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                    }
                }
                return goDeeper;
            },
            repulsiveForces: function () {
                var layout = this;
                if (layout.approximation === 'barnes-hut') {
                    layout.nodes.forEach(function (node) {
                        layout.quadTree.visitNodeRecursive(null, function (quadNode) {
                            return layout.barnesHutApproximation(node, quadNode);
                        });
                    });
                }
                else {
                    layout.nodes.forEach(function (node) {
                        layout.nodes.forEach(function (repNode) {
                            var force,
                                distanceR,
                                distanceXY;
                            if (
                            // Node can not repulse itself:
                            node !== repNode &&
                                // Only close nodes affect each other:
                                // layout.getDistR(node, repNode) < 2 * k &&
                                // Not dragged:
                                !node.fixedPosition) {
                                distanceXY = layout.getDistXY(node, repNode);
                                distanceR = layout.vectorLength(distanceXY);
                                if (distanceR !== 0) {
                                    force = layout.repulsiveForce(distanceR, layout.k);
                                    layout.force('repulsive', node, force * repNode.mass, distanceXY, distanceR);
                                }
                            }
                        });
                    });
                }
            },
            attractiveForces: function () {
                var layout = this,
                    distanceXY,
                    distanceR,
                    force;
                layout.links.forEach(function (link) {
                    if (link.fromNode && link.toNode) {
                        distanceXY = layout.getDistXY(link.fromNode, link.toNode);
                        distanceR = layout.vectorLength(distanceXY);
                        if (distanceR !== 0) {
                            force = layout.attractiveForce(distanceR, layout.k);
                            layout.force('attractive', link, force, distanceXY, distanceR);
                        }
                    }
                });
            },
            applyLimits: function () {
                var layout = this,
                    nodes = layout.nodes;
                nodes.forEach(function (node) {
                    if (node.fixedPosition) {
                        return;
                    }
                    layout.integration.integrate(layout, node);
                    layout.applyLimitBox(node, layout.box);
                    // Reset displacement:
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            /**
             * External box that nodes should fall. When hitting an edge, node
             * should stop or bounce.
             * @private
             */
            applyLimitBox: function (node, box) {
                var radius = node.radius;
                /*
                TO DO: Consider elastic collision instead of stopping.
                o' means end position when hitting plotting area edge:

                - "inelastic":
                o
                 \
                ______
                |  o'
                |   \
                |    \

                - "elastic"/"bounced":
                o
                 \
                ______
                |  ^
                | / \
                |o'  \

                Euler sample:
                if (plotX < 0) {
                    plotX = 0;
                    dispX *= -1;
                }

                if (plotX > box.width) {
                    plotX = box.width;
                    dispX *= -1;
                }

                */
                // Limit X-coordinates:
                node.plotX = clamp(node.plotX, box.left + radius, box.width - radius);
                // Limit Y-coordinates:
                node.plotY = clamp(node.plotY, box.top + radius, box.height - radius);
            },
            /**
             * From "A comparison of simulated annealing cooling strategies" by
             * Nourani and Andresen work.
             * @private
             */
            coolDown: function (temperature, temperatureStep, currentStep) {
                // Logarithmic:
                /*
                return Math.sqrt(this.nodes.length) -
                    Math.log(
                        currentStep * layout.diffTemperature
                    );
                */
                // Exponential:
                /*
                let alpha = 0.1;
                layout.temperature = Math.sqrt(layout.nodes.length) *
                    Math.pow(alpha, layout.diffTemperature);
                */
                // Linear:
                return temperature - temperatureStep * currentStep;
            },
            isStable: function () {
                return Math.abs(this.systemTemperature -
                    this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
            },
            getSystemTemperature: function () {
                return this.nodes.reduce(function (value, node) {
                    return value + node.temperature;
                }, 0);
            },
            vectorLength: function (vector) {
                return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            },
            getDistR: function (nodeA, nodeB) {
                var distance = this.getDistXY(nodeA,
                    nodeB);
                return this.vectorLength(distance);
            },
            getDistXY: function (nodeA, nodeB) {
                var xDist = nodeA.plotX - nodeB.plotX,
                    yDist = nodeA.plotY - nodeB.plotY;
                return {
                    x: xDist,
                    y: yDist,
                    absX: Math.abs(xDist),
                    absY: Math.abs(yDist)
                };
            }
        });
        /* ************************************************************************** *
         * Multiple series support:
         * ************************************************************************** */
        // Clear previous layouts
        addEvent(Chart, 'predraw', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.stop();
                });
            }
        });
        addEvent(Chart, 'render', function () {
            var systemsStable,
                afterRender = false;
            /**
             * @private
             */
            function layoutStep(layout) {
                if (layout.maxIterations-- &&
                    isFinite(layout.temperature) &&
                    !layout.isStable() &&
                    !layout.enableSimulation) {
                    // Hook similar to build-in addEvent, but instead of
                    // creating whole events logic, use just a function.
                    // It's faster which is important for rAF code.
                    // Used e.g. in packed-bubble series for bubble radius
                    // calculations
                    if (layout.beforeStep) {
                        layout.beforeStep();
                    }
                    layout.step();
                    systemsStable = false;
                    afterRender = true;
                }
            }
            if (this.graphLayoutsLookup) {
                setAnimation(false, this);
                // Start simulation
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.start();
                });
                // Just one sync step, to run different layouts similar to
                // async mode.
                while (!systemsStable) {
                    systemsStable = true;
                    this.graphLayoutsLookup.forEach(layoutStep);
                }
                if (afterRender) {
                    this.series.forEach(function (s) {
                        if (s && s.layout) {
                            s.render();
                        }
                    });
                }
            }
        });
        // disable simulation before print if enabled
        addEvent(Chart, 'beforePrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.updateSimulation(false);
                });
                this.redraw();
            }
        });
        // re-enable simulation after print
        addEvent(Chart, 'afterPrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    // return to default simulation
                    layout.updateSimulation();
                });
            }
            this.redraw();
        });

    });
    _registerModule(_modules, 'Series/PackedBubble/PackedBubbleComposition.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, H, U) {
        /* *
         *
         *  (c) 2010-2021 Grzegorz Blachlinski, Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var Reingold = H.layouts['reingold-fruchterman'];
        var addEvent = U.addEvent,
            extendClass = U.extendClass,
            pick = U.pick;
        /* *
         *
         *  Composition
         *
         * */
        Chart.prototype.getSelectedParentNodes = function () {
            var chart = this,
                series = chart.series,
                selectedParentsNodes = [];
            series.forEach(function (series) {
                if (series.parentNode && series.parentNode.selected) {
                    selectedParentsNodes.push(series.parentNode);
                }
            });
            return selectedParentsNodes;
        };
        H.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function (d, k, node, repNode) {
                return Math.min(d, (node.marker.radius + repNode.marker.radius) / 2);
            },
            barycenter: function () {
                var layout = this,
                    gravitationalConstant = layout.options.gravitationalConstant,
                    box = layout.box,
                    nodes = layout.nodes,
                    centerX,
                    centerY;
                nodes.forEach(function (node) {
                    if (layout.options.splitSeries && !node.isParentNode) {
                        centerX = node.series.parentNode.plotX;
                        centerY = node.series.parentNode.plotY;
                    }
                    else {
                        centerX = box.width / 2;
                        centerY = box.height / 2;
                    }
                    if (!node.fixedPosition) {
                        node.plotX -=
                            (node.plotX - centerX) *
                                gravitationalConstant /
                                (node.mass * Math.sqrt(nodes.length));
                        node.plotY -=
                            (node.plotY - centerY) *
                                gravitationalConstant /
                                (node.mass * Math.sqrt(nodes.length));
                    }
                });
            },
            repulsive: function (node, force, distanceXY, repNode) {
                var factor = (force * this.diffTemperature / node.mass /
                        node.degree),
                    x = distanceXY.x * factor,
                    y = distanceXY.y * factor;
                if (!node.fixedPosition) {
                    node.plotX += x;
                    node.plotY += y;
                }
                if (!repNode.fixedPosition) {
                    repNode.plotX -= x;
                    repNode.plotY -= y;
                }
            },
            integrate: H.networkgraphIntegrations.verlet.integrate,
            getK: H.noop
        };
        H.layouts.packedbubble = extendClass(Reingold, {
            beforeStep: function () {
                if (this.options.marker) {
                    this.series.forEach(function (series) {
                        if (series) {
                            series.calculateParentRadius();
                        }
                    });
                }
            },
            // #14439, new stable check.
            isStable: function () {
                var tempDiff = Math.abs(this.prevSystemTemperature -
                        this.systemTemperature);
                var upScaledTemperature = 10 * this.systemTemperature /
                        Math.sqrt(this.nodes.length);
                return Math.abs(upScaledTemperature) < 1 &&
                    tempDiff < 0.00001 ||
                    this.temperature <= 0;
            },
            setCircularPositions: function () {
                var layout = this,
                    box = layout.box,
                    nodes = layout.nodes,
                    nodesLength = nodes.length + 1,
                    angle = 2 * Math.PI / nodesLength,
                    centerX,
                    centerY,
                    radius = layout.options.initialPositionRadius;
                nodes.forEach(function (node, index) {
                    if (layout.options.splitSeries &&
                        !node.isParentNode) {
                        centerX = node.series.parentNode.plotX;
                        centerY = node.series.parentNode.plotY;
                    }
                    else {
                        centerX = box.width / 2;
                        centerY = box.height / 2;
                    }
                    node.plotX = node.prevX = pick(node.plotX, centerX +
                        radius * Math.cos(node.index || index * angle));
                    node.plotY = node.prevY = pick(node.plotY, centerY +
                        radius * Math.sin(node.index || index * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            repulsiveForces: function () {
                var layout = this,
                    force,
                    distanceR,
                    distanceXY,
                    bubblePadding = layout.options.bubblePadding;
                layout.nodes.forEach(function (node) {
                    node.degree = node.mass;
                    node.neighbours = 0;
                    layout.nodes.forEach(function (repNode) {
                        force = 0;
                        if (
                        // Node can not repulse itself:
                        node !== repNode &&
                            // Only close nodes affect each other:
                            // Not dragged:
                            !node.fixedPosition &&
                            (layout.options.seriesInteraction ||
                                node.series === repNode.series)) {
                            distanceXY = layout.getDistXY(node, repNode);
                            distanceR = (layout.vectorLength(distanceXY) -
                                (node.marker.radius +
                                    repNode.marker.radius +
                                    bubblePadding));
                            // TODO padding configurable
                            if (distanceR < 0) {
                                node.degree += 0.01;
                                node.neighbours++;
                                force = layout.repulsiveForce(-distanceR / Math.sqrt(node.neighbours), layout.k, node, repNode);
                            }
                            layout.force('repulsive', node, force * repNode.mass, distanceXY, repNode, distanceR);
                        }
                    });
                });
            },
            applyLimitBox: function (node) {
                var layout = this,
                    distanceXY,
                    distanceR,
                    factor = 0.01;
                // parentNodeLimit should be used together
                // with seriesInteraction: false
                if (layout.options.splitSeries &&
                    !node.isParentNode &&
                    layout.options.parentNodeLimit) {
                    distanceXY = layout.getDistXY(node, node.series.parentNode);
                    distanceR = (node.series.parentNodeRadius -
                        node.marker.radius -
                        layout.vectorLength(distanceXY));
                    if (distanceR < 0 &&
                        distanceR > -2 * node.marker.radius) {
                        node.plotX -= distanceXY.x * factor;
                        node.plotY -= distanceXY.y * factor;
                    }
                }
                Reingold.prototype.applyLimitBox.apply(this, arguments);
            }
        });
        // Remove accumulated data points to redistribute all of them again
        // (i.e after hiding series by legend)
        addEvent(Chart, 'beforeRedraw', function () {
            // eslint-disable-next-line no-invalid-this
            if (this.allDataPoints) {
                // eslint-disable-next-line no-invalid-this
                delete this.allDataPoints;
            }
        });

    });
    _registerModule(_modules, 'Series/PackedBubble/PackedBubbleSeries.js', [_modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Series/PackedBubble/PackedBubblePoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Color, H, PackedBubblePoint, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Grzegorz Blachlinski, Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var color = Color.parse;
        var Series = SeriesRegistry.series,
            BubbleSeries = SeriesRegistry.seriesTypes.bubble;
        var addEvent = U.addEvent,
            clamp = U.clamp,
            defined = U.defined,
            extend = U.extend,
            fireEvent = U.fireEvent,
            isArray = U.isArray,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick;
        var dragNodesMixin = H.dragNodesMixin;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.packedbubble
         *
         * @extends Highcharts.Series
         */
        var PackedBubbleSeries = /** @class */ (function (_super) {
                __extends(PackedBubbleSeries, _super);
            function PackedBubbleSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.chart = void 0;
                _this.data = void 0;
                _this.layout = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.xData = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Create a single array of all points from all series
             * @private
             */
            PackedBubbleSeries.prototype.accumulateAllPoints = function (series) {
                var chart = series.chart,
                    allDataPoints = [],
                    i,
                    j;
                for (i = 0; i < chart.series.length; i++) {
                    series = chart.series[i];
                    if (series.is('packedbubble') && // #13574
                        series.visible ||
                        !chart.options.chart.ignoreHiddenSeries) {
                        // add data to array only if series is visible
                        for (j = 0; j < series.yData.length; j++) {
                            allDataPoints.push([
                                null, null,
                                series.yData[j],
                                series.index,
                                j,
                                {
                                    id: j,
                                    marker: {
                                        radius: 0
                                    }
                                }
                            ]);
                        }
                    }
                }
                return allDataPoints;
            };
            /**
             * Adding the basic layout to series points.
             * @private
             */
            PackedBubbleSeries.prototype.addLayout = function () {
                var series = this,
                    layoutOptions = series.options.layoutAlgorithm,
                    graphLayoutsStorage = series.chart.graphLayoutsStorage,
                    graphLayoutsLookup = series.chart.graphLayoutsLookup,
                    chartOptions = series.chart.options.chart,
                    layout;
                if (!graphLayoutsStorage) {
                    series.chart.graphLayoutsStorage = graphLayoutsStorage = {};
                    series.chart.graphLayoutsLookup = graphLayoutsLookup = [];
                }
                layout = graphLayoutsStorage[layoutOptions.type];
                if (!layout) {
                    layoutOptions.enableSimulation =
                        !defined(chartOptions.forExport) ?
                            layoutOptions.enableSimulation :
                            !chartOptions.forExport;
                    graphLayoutsStorage[layoutOptions.type] = layout =
                        new H.layouts[layoutOptions.type]();
                    layout.init(layoutOptions);
                    graphLayoutsLookup.splice(layout.index, 0, layout);
                }
                series.layout = layout;
                series.points.forEach(function (node) {
                    node.mass = 2;
                    node.degree = 1;
                    node.collisionNmb = 1;
                });
                layout.setArea(0, 0, series.chart.plotWidth, series.chart.plotHeight);
                layout.addElementsToCollection([series], layout.series);
                layout.addElementsToCollection(series.points, layout.nodes);
            };
            /**
             * Function responsible for adding series layout, used for parent nodes.
             * @private
             */
            PackedBubbleSeries.prototype.addSeriesLayout = function () {
                var series = this,
                    layoutOptions = series.options.layoutAlgorithm,
                    graphLayoutsStorage = series.chart.graphLayoutsStorage,
                    graphLayoutsLookup = series.chart.graphLayoutsLookup,
                    parentNodeOptions = merge(layoutOptions,
                    layoutOptions.parentNodeOptions, {
                        enableSimulation: series.layout.options.enableSimulation
                    }),
                    parentNodeLayout;
                parentNodeLayout = graphLayoutsStorage[layoutOptions.type + '-series'];
                if (!parentNodeLayout) {
                    graphLayoutsStorage[layoutOptions.type + '-series'] =
                        parentNodeLayout =
                            new H.layouts[layoutOptions.type]();
                    parentNodeLayout.init(parentNodeOptions);
                    graphLayoutsLookup.splice(parentNodeLayout.index, 0, parentNodeLayout);
                }
                series.parentNodeLayout = parentNodeLayout;
                this.createParentNodes();
            };
            /**
             * The function responsible for calculating the parent node radius
             * based on the total surface of iniside-bubbles and the group BBox
             * @private
             */
            PackedBubbleSeries.prototype.calculateParentRadius = function () {
                var series = this,
                    bBox,
                    parentPadding = 20,
                    minParentRadius = 20;
                bBox = series.seriesBox();
                series.parentNodeRadius = clamp(Math.sqrt(2 * series.parentNodeMass / Math.PI) + parentPadding, minParentRadius, bBox ?
                    Math.max(Math.sqrt(Math.pow(bBox.width, 2) +
                        Math.pow(bBox.height, 2)) / 2 + parentPadding, minParentRadius) :
                    Math.sqrt(2 * series.parentNodeMass / Math.PI) + parentPadding);
                if (series.parentNode) {
                    series.parentNode.marker.radius =
                        series.parentNode.radius = series.parentNodeRadius;
                }
            };
            /**
             * Calculate min and max bubble value for radius calculation.
             * @private
             */
            PackedBubbleSeries.prototype.calculateZExtremes = function () {
                var chart = this.chart,
                    zMin = this.options.zMin,
                    zMax = this.options.zMax,
                    valMin = Infinity,
                    valMax = -Infinity;
                if (zMin && zMax) {
                    return [zMin, zMax];
                }
                // it is needed to deal with null
                // and undefined values
                chart.series.forEach(function (s) {
                    s.yData.forEach(function (p) {
                        if (defined(p)) {
                            if (p > valMax) {
                                valMax = p;
                            }
                            if (p < valMin) {
                                valMin = p;
                            }
                        }
                    });
                });
                zMin = pick(zMin, valMin);
                zMax = pick(zMax, valMax);
                return [zMin, zMax];
            };
            /**
             * Check if two bubbles overlaps.
             * @private
             */
            PackedBubbleSeries.prototype.checkOverlap = function (bubble1, bubble2) {
                var diffX = bubble1[0] - bubble2[0], // diff of X center values
                    diffY = bubble1[1] - bubble2[1], // diff of Y center values
                    sumRad = bubble1[2] + bubble2[2]; // sum of bubble radius
                    return (Math.sqrt(diffX * diffX + diffY * diffY) -
                        Math.abs(sumRad)) < -0.001;
            };
            /**
             * Creating parent nodes for split series, in which all the bubbles
             * are rendered.
             * @private
             */
            PackedBubbleSeries.prototype.createParentNodes = function () {
                var series = this,
                    chart = series.chart,
                    parentNodeLayout = series.parentNodeLayout,
                    nodeAdded,
                    parentNode = series.parentNode,
                    PackedBubblePoint = series.pointClass,
                    layoutOptions = series.layout.options,
                    parentMarkerOptions = {
                        radius: series.parentNodeRadius,
                        lineColor: series.color,
                        fillColor: color(series.color).brighten(0.4).get()
                    };
                if (layoutOptions.parentNodeOptions) {
                    parentMarkerOptions = merge(layoutOptions.parentNodeOptions.marker || {}, parentMarkerOptions);
                }
                series.parentNodeMass = 0;
                series.points.forEach(function (p) {
                    series.parentNodeMass +=
                        Math.PI * Math.pow(p.marker.radius, 2);
                });
                series.calculateParentRadius();
                parentNodeLayout.nodes.forEach(function (node) {
                    if (node.seriesIndex === series.index) {
                        nodeAdded = true;
                    }
                });
                parentNodeLayout.setArea(0, 0, chart.plotWidth, chart.plotHeight);
                if (!nodeAdded) {
                    if (!parentNode) {
                        parentNode = (new PackedBubblePoint()).init(this, {
                            mass: series.parentNodeRadius / 2,
                            marker: parentMarkerOptions,
                            dataLabels: {
                                inside: false
                            },
                            states: {
                                normal: {
                                    marker: parentMarkerOptions
                                },
                                hover: {
                                    marker: parentMarkerOptions
                                }
                            },
                            dataLabelOnNull: true,
                            degree: series.parentNodeRadius,
                            isParentNode: true,
                            seriesIndex: series.index
                        });
                    }
                    if (series.parentNode) {
                        parentNode.plotX = series.parentNode.plotX;
                        parentNode.plotY = series.parentNode.plotY;
                    }
                    series.parentNode = parentNode;
                    parentNodeLayout.addElementsToCollection([series], parentNodeLayout.series);
                    parentNodeLayout.addElementsToCollection([parentNode], parentNodeLayout.nodes);
                }
            };
            /**
             * Function responsible for adding all the layouts to the chart.
             * @private
             */
            PackedBubbleSeries.prototype.deferLayout = function () {
                // TODO split layouts to independent methods
                var series = this,
                    layoutOptions = series.options.layoutAlgorithm;
                if (!series.visible) {
                    return;
                }
                // layout is using nodes for position calculation
                series.addLayout();
                if (layoutOptions.splitSeries) {
                    series.addSeriesLayout();
                }
            };
            PackedBubbleSeries.prototype.destroy = function () {
                // Remove the series from all layouts series collections #11469
                if (this.chart.graphLayoutsLookup) {
                    this.chart.graphLayoutsLookup.forEach(function (layout) {
                        layout.removeElementFromCollection(this, layout.series);
                    }, this);
                }
                if (this.parentNode &&
                    this.parentNodeLayout) {
                    this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes);
                    if (this.parentNode.dataLabel) {
                        this.parentNode.dataLabel =
                            this.parentNode.dataLabel.destroy();
                    }
                }
                Series.prototype.destroy.apply(this, arguments);
            };
            /**
             * Packedbubble has two separate collecions of nodes if split, render
             * dataLabels for both sets:
             * @private
             */
            PackedBubbleSeries.prototype.drawDataLabels = function () {
                var textPath = this.options.dataLabels.textPath,
                    points = this.points;
                // Render node labels:
                Series.prototype.drawDataLabels.apply(this, arguments);
                // Render parentNode labels:
                if (this.parentNode) {
                    this.parentNode.formatPrefix = 'parentNode';
                    this.points = [this.parentNode];
                    this.options.dataLabels.textPath =
                        this.options.dataLabels.parentNodeTextPath;
                    Series.prototype.drawDataLabels.apply(this, arguments);
                    // Restore nodes
                    this.points = points;
                    this.options.dataLabels.textPath = textPath;
                }
            };
            /**
             * Create Background/Parent Nodes for split series.
             * @private
             */
            PackedBubbleSeries.prototype.drawGraph = function () {
                // if the series is not using layout, don't add parent nodes
                if (!this.layout || !this.layout.options.splitSeries) {
                    return;
                }
                var series = this,
                    chart = series.chart,
                    parentAttribs = {},
                    nodeMarker = this.layout.options.parentNodeOptions.marker,
                    parentOptions = {
                        fill: (nodeMarker.fillColor ||
                            color(series.color).brighten(0.4).get()),
                        opacity: nodeMarker.fillOpacity,
                        stroke: nodeMarker.lineColor || series.color,
                        'stroke-width': pick(nodeMarker.lineWidth,
                    series.options.lineWidth)
                    };
                // create the group for parent Nodes if doesn't exist
                if (!this.parentNodesGroup) {
                    series.parentNodesGroup = series.plotGroup('parentNodesGroup', 'parentNode', series.visible ? 'inherit' : 'hidden', 0.1, chart.seriesGroup);
                    series.group.attr({
                        zIndex: 2
                    });
                }
                this.calculateParentRadius();
                parentAttribs = merge({
                    x: series.parentNode.plotX -
                        series.parentNodeRadius,
                    y: series.parentNode.plotY -
                        series.parentNodeRadius,
                    width: series.parentNodeRadius * 2,
                    height: series.parentNodeRadius * 2
                }, parentOptions);
                if (!series.parentNode.graphic) {
                    series.graph = series.parentNode.graphic =
                        chart.renderer.symbol(parentOptions.symbol)
                            .add(series.parentNodesGroup);
                }
                series.parentNode.graphic.attr(parentAttribs);
            };
            PackedBubbleSeries.prototype.drawTracker = function () {
                var series = this, 
                    /* chart = series.chart,
                    pointer = chart.pointer,
                    onMouseOver = function (e: PointerEvent): void {
                        const point = pointer.getPointFromEvent(e);
                    // undefined on graph in scatterchart
                    if (typeof point !== 'undefined') {
                        pointer.isDirectTouch = true;
                        point.onMouseOver(e);
                    }
                }, */
                parentNode = series.parentNode;
                var dataLabels;
                _super.prototype.drawTracker.call(this);
                // Add reference to the point
                if (parentNode) {
                    dataLabels = (isArray(parentNode.dataLabels) ?
                        parentNode.dataLabels :
                        (parentNode.dataLabel ? [parentNode.dataLabel] : []));
                    if (parentNode.graphic) {
                        parentNode.graphic.element.point = parentNode;
                    }
                    dataLabels.forEach(function (dataLabel) {
                        if (dataLabel.div) {
                            dataLabel.div.point = parentNode;
                        }
                        else {
                            dataLabel.element.point = parentNode;
                        }
                    });
                }
            };
            /**
             * Calculate radius of bubbles in series.
             * @private
             */
            PackedBubbleSeries.prototype.getPointRadius = function () {
                var series = this,
                    chart = series.chart,
                    plotWidth = chart.plotWidth,
                    plotHeight = chart.plotHeight,
                    seriesOptions = series.options,
                    useSimulation = seriesOptions.useSimulation,
                    smallestSize = Math.min(plotWidth,
                    plotHeight),
                    extremes = {},
                    radii = [],
                    allDataPoints = chart.allDataPoints,
                    minSize,
                    maxSize,
                    value,
                    radius,
                    zExtremes;
                ['minSize', 'maxSize'].forEach(function (prop) {
                    var length = parseInt(seriesOptions[prop], 10),
                        isPercent = /%$/.test(seriesOptions[prop]);
                    extremes[prop] = isPercent ?
                        smallestSize * length / 100 :
                        length * Math.sqrt(allDataPoints.length);
                });
                chart.minRadius = minSize = extremes.minSize /
                    Math.sqrt(allDataPoints.length);
                chart.maxRadius = maxSize = extremes.maxSize /
                    Math.sqrt(allDataPoints.length);
                zExtremes = useSimulation ?
                    series.calculateZExtremes() :
                    [minSize, maxSize];
                (allDataPoints || []).forEach(function (point, i) {
                    value = useSimulation ?
                        clamp(point[2], zExtremes[0], zExtremes[1]) :
                        point[2];
                    radius = series.getRadius(zExtremes[0], zExtremes[1], minSize, maxSize, value);
                    if (radius === 0) {
                        radius = null;
                    }
                    allDataPoints[i][2] = radius;
                    radii.push(radius);
                });
                series.radii = radii;
            };
            PackedBubbleSeries.prototype.init = function () {
                Series.prototype.init.apply(this, arguments);
                /* eslint-disable no-invalid-this */
                // When one series is modified, the others need to be recomputed
                this.eventsToUnbind.push(addEvent(this, 'updatedData', function () {
                    this.chart.series.forEach(function (s) {
                        if (s.type === this.type) {
                            s.isDirty = true;
                        }
                    }, this);
                }));
                /* eslint-enable no-invalid-this */
                return this;
            };
            /**
             * Mouse up action, finalizing drag&drop.
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             */
            PackedBubbleSeries.prototype.onMouseUp = function (point) {
                if (point.fixedPosition && !point.removed) {
                    var distanceXY_1,
                        distanceR_1,
                        layout_1 = this.layout,
                        parentNodeLayout = this.parentNodeLayout;
                    if (parentNodeLayout && layout_1.options.dragBetweenSeries) {
                        parentNodeLayout.nodes.forEach(function (node) {
                            if (point && point.marker &&
                                node !== point.series.parentNode) {
                                distanceXY_1 = layout_1.getDistXY(point, node);
                                distanceR_1 = (layout_1.vectorLength(distanceXY_1) -
                                    node.marker.radius -
                                    point.marker.radius);
                                if (distanceR_1 < 0) {
                                    node.series.addPoint(merge(point.options, {
                                        plotX: point.plotX,
                                        plotY: point.plotY
                                    }), false);
                                    layout_1.removeElementFromCollection(point, layout_1.nodes);
                                    point.remove();
                                }
                            }
                        });
                    }
                    dragNodesMixin.onMouseUp.apply(this, arguments);
                }
            };
            /**
             * This is the main function responsible
             * for positioning all of the bubbles
             * allDataPoints - bubble array, in format [pixel x value,
             * pixel y value, radius,
             * related series index, related point index]
             * @private
             * @param {Array<Highcharts.PackedBubbleData>} allDataPoints All points from all series
             * @return {Array<Highcharts.PackedBubbleData>} Positions of all bubbles
             */
            PackedBubbleSeries.prototype.placeBubbles = function (allDataPoints) {
                var series = this,
                    checkOverlap = series.checkOverlap,
                    positionBubble = series.positionBubble,
                    bubblePos = [],
                    stage = 1,
                    j = 0,
                    k = 0,
                    calculatedBubble,
                    sortedArr,
                    arr = [],
                    i;
                // sort all points
                sortedArr = allDataPoints.sort(function (a, b) {
                    return b[2] - a[2];
                });
                if (sortedArr.length) {
                    // create first bubble in the middle of the chart
                    bubblePos.push([
                        [
                            0,
                            0,
                            sortedArr[0][2],
                            sortedArr[0][3],
                            sortedArr[0][4]
                        ] // point index
                    ]); // 0 level bubble
                    if (sortedArr.length > 1) {
                        bubblePos.push([
                            [
                                0,
                                (0 - sortedArr[1][2] -
                                    sortedArr[0][2]),
                                // move bubble above first one
                                sortedArr[1][2],
                                sortedArr[1][3],
                                sortedArr[1][4]
                            ]
                        ]); // 1 level 1st bubble
                        // first two already positioned so starting from 2
                        for (i = 2; i < sortedArr.length; i++) {
                            sortedArr[i][2] = sortedArr[i][2] || 1;
                            // in case if radius is calculated as 0.
                            calculatedBubble = positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]); // calculate initial bubble position
                            if (checkOverlap(calculatedBubble, bubblePos[stage][0])) {
                                /* if new bubble is overlapping with first bubble
                                    * in current level (stage)
                                    */
                                bubblePos.push([]);
                                k = 0;
                                /* reset index of bubble, used for
                                    * positioning the bubbles around it,
                                    * we are starting from first bubble in next
                                    * stage because we are changing level to higher
                                    */
                                bubblePos[stage + 1].push(positionBubble(bubblePos[stage][j], bubblePos[stage][0], sortedArr[i]));
                                // (last bubble, 1. from curr stage, new bubble)
                                stage++; // the new level is created, above current
                                j = 0; // set the index of bubble in curr level to 0
                            }
                            else if (stage > 1 &&
                                bubblePos[stage - 1][k + 1] &&
                                checkOverlap(calculatedBubble, bubblePos[stage - 1][k + 1])) {
                                /* if new bubble is overlapping with one of the prev
                                    * stage bubbles, it means that - bubble, used for
                                    * positioning the bubbles around it has changed
                                    * so we need to recalculate it
                                    */
                                k++;
                                bubblePos[stage].push(positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]));
                                // (last bubble, prev stage bubble, new bubble)
                                j++;
                            }
                            else { // simply add calculated bubble
                                j++;
                                bubblePos[stage].push(calculatedBubble);
                            }
                        }
                    }
                    series.chart.stages = bubblePos;
                    // it may not be necessary but adding it just in case -
                    // it is containing all of the bubble levels
                    series.chart.rawPositions =
                        []
                            .concat.apply([], bubblePos);
                    // bubble positions merged into one array
                    series.resizeRadius();
                    arr = series.chart.rawPositions;
                }
                return arr;
            };
            /**
             * Function that checks for a parentMarker and sets the correct opacity.
             * @private
             * @param {Highcharts.Pack} point
             * Candidate point for opacity correction.
             * @param {string} [state]
             * The point state, can be either `hover`, `select` or 'normal'. If
             * undefined, normal state is assumed.
             *
             * @return {Highcharts.SVGAttributes}
             * The presentational attributes to be set on the point.
             */
            PackedBubbleSeries.prototype.pointAttribs = function (point, state) {
                var options = this.options,
                    hasParentMarker = point && point.isParentNode;
                var attr,
                    fillOpacity,
                    markerOptions = options.marker;
                if (hasParentMarker &&
                    options.layoutAlgorithm &&
                    options.layoutAlgorithm.parentNodeOptions) {
                    markerOptions = options.layoutAlgorithm.parentNodeOptions.marker;
                }
                fillOpacity = markerOptions.fillOpacity;
                attr = Series.prototype.pointAttribs.call(this, point, state);
                if (fillOpacity !== 1) {
                    attr['fill-opacity'] = fillOpacity;
                }
                return attr;
            };
            /**
             * Function that is adding one bubble based on positions and sizes of
             * two other bubbles, lastBubble is the last added bubble, newOrigin is
             * the bubble for positioning new bubbles. nextBubble is the curently
             * added bubble for which we are calculating positions
             * @private
             * @param {Array<number>} lastBubble The closest last bubble
             * @param {Array<number>} newOrigin New bubble
             * @param {Array<number>} nextBubble The closest next bubble
             * @return {Array<number>} Bubble with correct positions
             */
            PackedBubbleSeries.prototype.positionBubble = function (lastBubble, newOrigin, nextBubble) {
                var sqrt = Math.sqrt,
                    asin = Math.asin,
                    acos = Math.acos,
                    pow = Math.pow,
                    abs = Math.abs,
                    distance = sqrt(// dist between lastBubble and newOrigin
                    pow((lastBubble[0] - newOrigin[0]), 2) +
                        pow((lastBubble[1] - newOrigin[1]), 2)),
                    alfa = acos(
                    // from cosinus theorem: alfa is an angle used for
                    // calculating correct position
                    (pow(distance, 2) +
                        pow(nextBubble[2] + newOrigin[2], 2) -
                        pow(nextBubble[2] + lastBubble[2], 2)) / (2 * (nextBubble[2] + newOrigin[2]) * distance)),
                    beta = asin(// from sinus theorem.
                    abs(lastBubble[0] - newOrigin[0]) /
                        distance), 
                    // providing helping variables, related to angle between
                    // lastBubble and newOrigin
                    gamma = (lastBubble[1] - newOrigin[1]) < 0 ? 0 : Math.PI, 
                    // if new origin y is smaller than last bubble y value
                    // (2 and 3 quarter),
                    // add Math.PI to final angle
                    delta = (lastBubble[0] - newOrigin[0]) *
                        (lastBubble[1] - newOrigin[1]) < 0 ?
                        1 : -1, // (1st and 3rd quarter)
                    finalAngle = gamma + alfa + beta * delta,
                    cosA = Math.cos(finalAngle),
                    sinA = Math.sin(finalAngle),
                    posX = newOrigin[0] + (newOrigin[2] + nextBubble[2]) * sinA, 
                    // center of new origin + (radius1 + radius2) * sinus A
                    posY = newOrigin[1] - (newOrigin[2] + nextBubble[2]) * cosA;
                return [
                    posX,
                    posY,
                    nextBubble[2],
                    nextBubble[3],
                    nextBubble[4]
                ]; // the same as described before
            };
            PackedBubbleSeries.prototype.render = function () {
                var series = this,
                    dataLabels = [];
                Series.prototype.render.apply(this, arguments);
                // #10823 - dataLabels should stay visible
                // when enabled allowOverlap.
                if (!series.options.dataLabels.allowOverlap) {
                    series.data.forEach(function (point) {
                        if (isArray(point.dataLabels)) {
                            point.dataLabels.forEach(function (dataLabel) {
                                dataLabels.push(dataLabel);
                            });
                        }
                    });
                    // Only hide overlapping dataLabels for layouts that
                    // use simulation. Spiral packedbubble don't need
                    // additional dataLabel hiding on every simulation step
                    if (series.options.useSimulation) {
                        series.chart.hideOverlappingLabels(dataLabels);
                    }
                }
            };
            /**
             * The function responsible for resizing the bubble radius.
             * In shortcut: it is taking the initially
             * calculated positions of bubbles. Then it is calculating the min max
             * of both dimensions, creating something in shape of bBox.
             * The comparison of bBox and the size of plotArea
             * (later it may be also the size set by customer) is giving the
             * value how to recalculate the radius so it will match the size
             * @private
             */
            PackedBubbleSeries.prototype.resizeRadius = function () {
                var chart = this.chart,
                    positions = chart.rawPositions,
                    min = Math.min,
                    max = Math.max,
                    plotLeft = chart.plotLeft,
                    plotTop = chart.plotTop,
                    chartHeight = chart.plotHeight,
                    chartWidth = chart.plotWidth,
                    minX,
                    maxX,
                    minY,
                    maxY,
                    radius,
                    bBox,
                    spaceRatio,
                    smallerDimension,
                    i;
                minX = minY = Number.POSITIVE_INFINITY; // set initial values
                maxX = maxY = Number.NEGATIVE_INFINITY;
                for (i = 0; i < positions.length; i++) {
                    radius = positions[i][2];
                    minX = min(minX, positions[i][0] - radius);
                    // (x center-radius) is the min x value used by specific bubble
                    maxX = max(maxX, positions[i][0] + radius);
                    minY = min(minY, positions[i][1] - radius);
                    maxY = max(maxY, positions[i][1] + radius);
                }
                bBox = [maxX - minX, maxY - minY];
                spaceRatio = [
                    (chartWidth - plotLeft) / bBox[0],
                    (chartHeight - plotTop) / bBox[1]
                ];
                smallerDimension = min.apply([], spaceRatio);
                if (Math.abs(smallerDimension - 1) > 1e-10) {
                    // if bBox is considered not the same width as possible size
                    for (i = 0; i < positions.length; i++) {
                        positions[i][2] *= smallerDimension;
                    }
                    this.placeBubbles(positions);
                }
                else {
                    /** if no radius recalculation is needed, we need to position
                     * the whole bubbles in center of chart plotarea
                     * for this, we are adding two parameters,
                     * diffY and diffX, that are related to differences
                     * between the initial center and the bounding box
                     */
                    chart.diffY = chartHeight / 2 +
                        plotTop - minY - (maxY - minY) / 2;
                    chart.diffX = chartWidth / 2 +
                        plotLeft - minX - (maxX - minX) / 2;
                }
            };
            /**
             * The function responsible for calculating series bubble' s bBox.
             * Needed because of exporting failure when useSimulation
             * is set to false
             * @private
             */
            PackedBubbleSeries.prototype.seriesBox = function () {
                var series = this,
                    chart = series.chart,
                    data = series.data,
                    max = Math.max,
                    min = Math.min,
                    radius, 
                    // bBox = [xMin, xMax, yMin, yMax]
                    bBox = [
                        chart.plotLeft,
                        chart.plotLeft + chart.plotWidth,
                        chart.plotTop,
                        chart.plotTop + chart.plotHeight
                    ];
                data.forEach(function (p) {
                    if (defined(p.plotX) &&
                        defined(p.plotY) &&
                        p.marker.radius) {
                        radius = p.marker.radius;
                        bBox[0] = min(bBox[0], p.plotX - radius);
                        bBox[1] = max(bBox[1], p.plotX + radius);
                        bBox[2] = min(bBox[2], p.plotY - radius);
                        bBox[3] = max(bBox[3], p.plotY + radius);
                    }
                });
                return isNumber(bBox.width / bBox.height) ?
                    bBox :
                    null;
            };
            /**
             * Needed because of z-indexing issue if point is added in series.group
             * @private
             */
            PackedBubbleSeries.prototype.setVisible = function () {
                var series = this;
                Series.prototype.setVisible.apply(series, arguments);
                if (series.parentNodeLayout && series.graph) {
                    if (series.visible) {
                        series.graph.show();
                        if (series.parentNode.dataLabel) {
                            series.parentNode.dataLabel.show();
                        }
                    }
                    else {
                        series.graph.hide();
                        series.parentNodeLayout
                            .removeElementFromCollection(series.parentNode, series.parentNodeLayout.nodes);
                        if (series.parentNode.dataLabel) {
                            series.parentNode.dataLabel.hide();
                        }
                    }
                }
                else if (series.layout) {
                    if (series.visible) {
                        series.layout.addElementsToCollection(series.points, series.layout.nodes);
                    }
                    else {
                        series.points.forEach(function (node) {
                            series.layout.removeElementFromCollection(node, series.layout.nodes);
                        });
                    }
                }
            };
            /**
             * Extend the base translate method to handle bubble size,
             * and correct positioning them.
             * @private
             */
            PackedBubbleSeries.prototype.translate = function () {
                var series = this,
                    chart = series.chart,
                    data = series.data,
                    index = series.index,
                    point,
                    radius,
                    positions,
                    i,
                    useSimulation = series.options.useSimulation;
                series.processedXData = series.xData;
                series.generatePoints();
                // merged data is an array with all of the data from all series
                if (!defined(chart.allDataPoints)) {
                    chart.allDataPoints = series.accumulateAllPoints(series);
                    // calculate radius for all added data
                    series.getPointRadius();
                }
                // after getting initial radius, calculate bubble positions
                if (useSimulation) {
                    positions = chart.allDataPoints;
                }
                else {
                    positions = series.placeBubbles(chart.allDataPoints);
                    series.options.draggable = false;
                }
                // Set the shape and arguments to be picked up in drawPoints
                for (i = 0; i < positions.length; i++) {
                    if (positions[i][3] === index) {
                        // update the series points with the val from positions
                        // array
                        point = data[positions[i][4]];
                        radius = pick(positions[i][2], void 0);
                        if (!useSimulation) {
                            point.plotX = (positions[i][0] - chart.plotLeft +
                                chart.diffX);
                            point.plotY = (positions[i][1] - chart.plotTop +
                                chart.diffY);
                        }
                        if (isNumber(radius)) {
                            point.marker = extend(point.marker, {
                                radius: radius,
                                width: 2 * radius,
                                height: 2 * radius
                            });
                            point.radius = radius;
                        }
                    }
                }
                if (useSimulation) {
                    series.deferLayout();
                }
                fireEvent(series, 'afterTranslate');
            };
            /**
             * A packed bubble series is a two dimensional series type, where each point
             * renders a value in X, Y position. Each point is drawn as a bubble
             * where the bubbles don't overlap with each other and the radius
             * of the bubble relates to the value.
             *
             * @sample highcharts/demo/packed-bubble/
             *         Packed bubble chart
             * @sample highcharts/demo/packed-bubble-split/
             *         Split packed bubble chart

             * @extends      plotOptions.bubble
             * @excluding    connectEnds, connectNulls, cropThreshold, dragDrop, jitter,
             *               keys, pointPlacement, sizeByAbsoluteValue, step, xAxis,
             *               yAxis, zMax, zMin, dataSorting, boostThreshold,
             *               boostBlending
             * @product      highcharts
             * @since        7.0.0
             * @requires     highcharts-more
             * @optionparent plotOptions.packedbubble
             */
            PackedBubbleSeries.defaultOptions = merge(BubbleSeries.defaultOptions, {
                /**
                 * Minimum bubble size. Bubbles will automatically size between the
                 * `minSize` and `maxSize` to reflect the value of each bubble.
                 * Can be either pixels (when no unit is given), or a percentage of
                 * the smallest one of the plot width and height, divided by the square
                 * root of total number of points.
                 *
                 * @sample highcharts/plotoptions/bubble-size/
                 *         Bubble size
                 *
                 * @type {number|string}
                 *
                 * @private
                 */
                minSize: '10%',
                /**
                 * Maximum bubble size. Bubbles will automatically size between the
                 * `minSize` and `maxSize` to reflect the value of each bubble.
                 * Can be either pixels (when no unit is given), or a percentage of
                 * the smallest one of the plot width and height, divided by the square
                 * root of total number of points.
                 *
                 * @sample highcharts/plotoptions/bubble-size/
                 *         Bubble size
                 *
                 * @type {number|string}
                 *
                 * @private
                 */
                maxSize: '50%',
                sizeBy: 'area',
                zoneAxis: 'y',
                crisp: false,
                tooltip: {
                    pointFormat: 'Value: {point.value}'
                },
                /**
                 * Flag to determine if nodes are draggable or not. Available for
                 * graph with useSimulation set to true only.
                 *
                 * @since 7.1.0
                 *
                 * @private
                 */
                draggable: true,
                /**
                 * An option is giving a possibility to choose between using simulation
                 * for calculating bubble positions. These reflects in both animation
                 * and final position of bubbles. Simulation is also adding options to
                 * the series graph based on used layout. In case of big data sets, with
                 * any performance issues, it is possible to disable animation and pack
                 * bubble in a simple circular way.
                 *
                 * @sample highcharts/series-packedbubble/spiral/
                 *         useSimulation set to false
                 *
                 * @since 7.1.0
                 *
                 * @private
                 */
                useSimulation: true,
                /**
                 * Series options for parent nodes.
                 *
                 * @since 8.1.1
                 *
                 * @private
                 */
                parentNode: {
                    /**
                     * Allow this series' parent nodes to be selected
                     * by clicking on the graph.
                     *
                     * @since 8.1.1
                     */
                    allowPointSelect: false
                },
                /**
                /**
                 *
                 * @declare Highcharts.SeriesPackedBubbleDataLabelsOptionsObject
                 *
                 * @private
                 */
                dataLabels: {
                    /**
                     * The
                     * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                     * specifying what to show for _node_ in the networkgraph. In v7.0
                     * defaults to `{key}`, since v7.1 defaults to `undefined` and
                     * `formatter` is used instead.
                     *
                     * @type      {string}
                     * @since     7.0.0
                     * @apioption plotOptions.packedbubble.dataLabels.format
                     */
                    // eslint-disable-next-line valid-jsdoc
                    /**
                     * Callback JavaScript function to format the data label for a node.
                     * Note that if a `format` is defined, the format takes precedence
                     * and the formatter is ignored.
                     *
                     * @type  {Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction}
                     * @since 7.0.0
                     */
                    formatter: function () {
                        var numberFormatter = this.series.chart.numberFormatter;
                        var value = this.point.value;
                        return isNumber(value) ? numberFormatter(value, -1) : '';
                    },
                    /**
                     * @type      {string}
                     * @since     7.1.0
                     * @apioption plotOptions.packedbubble.dataLabels.parentNodeFormat
                     */
                    // eslint-disable-next-line valid-jsdoc
                    /**
                     * @type  {Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction}
                     * @since 7.1.0
                     */
                    parentNodeFormatter: function () {
                        return this.name;
                    },
                    /**
                     * @sample {highcharts} highcharts/series-packedbubble/packed-dashboard
                     *         Dashboard with dataLabels on parentNodes
                     *
                     * @declare Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject
                     * @since   7.1.0
                     */
                    parentNodeTextPath: {
                        /**
                         * Presentation attributes for the text path.
                         *
                         * @type      {Highcharts.SVGAttributes}
                         * @since     7.1.0
                         * @apioption plotOptions.packedbubble.dataLabels.attributes
                         */
                        /**
                         * Enable or disable `textPath` option for link's or marker's
                         * data labels.
                         *
                         * @since 7.1.0
                         */
                        enabled: true
                    },
                    /**
                     * Options for a _node_ label text which should follow marker's
                     * shape.
                     *
                     * **Note:** Only SVG-based renderer supports this option.
                     *
                     * @extends   plotOptions.series.dataLabels.textPath
                     * @apioption plotOptions.packedbubble.dataLabels.textPath
                     */
                    padding: 0,
                    style: {
                        transition: 'opacity 2000ms'
                    }
                },
                /**
                 * Options for layout algorithm when simulation is enabled. Inside there
                 * are options to change the speed, padding, initial bubbles positions
                 * and more.
                 *
                 * @extends   plotOptions.networkgraph.layoutAlgorithm
                 * @excluding approximation, attractiveForce, repulsiveForce, theta
                 * @since     7.1.0
                 *
                 * @private
                 */
                layoutAlgorithm: {
                    /**
                     * Initial layout algorithm for positioning nodes. Can be one of
                     * the built-in options ("circle", "random") or a function where
                     * positions should be set on each node (`this.nodes`) as
                     * `node.plotX` and `node.plotY`.
                     *
                     * @sample highcharts/series-networkgraph/initial-positions/
                     *         Initial positions with callback
                     *
                     * @type {"circle"|"random"|Function}
                     */
                    initialPositions: 'circle',
                    /**
                     * @sample highcharts/series-packedbubble/initial-radius/
                     *         Initial radius set to 200
                     *
                     * @extends   plotOptions.networkgraph.layoutAlgorithm.initialPositionRadius
                     * @excluding states
                     */
                    initialPositionRadius: 20,
                    /**
                     * The distance between two bubbles, when the algorithm starts to
                     * treat two bubbles as overlapping. The `bubblePadding` is also the
                     * expected distance between all the bubbles on simulation end.
                     */
                    bubblePadding: 5,
                    /**
                     * Whether bubbles should interact with their parentNode to keep
                     * them inside.
                     */
                    parentNodeLimit: false,
                    /**
                     * Whether series should interact with each other or not. When
                     * `parentNodeLimit` is set to true, thi option should be set to
                     * false to avoid sticking points in wrong series parentNode.
                     */
                    seriesInteraction: true,
                    /**
                     * In case of split series, this option allows user to drag and
                     * drop points between series, for changing point related series.
                     *
                     * @sample highcharts/series-packedbubble/packed-dashboard/
                     *         Example of drag'n drop bubbles for bubble kanban
                     */
                    dragBetweenSeries: false,
                    /**
                     * Layout algorithm options for parent nodes.
                     *
                     * @extends   plotOptions.networkgraph.layoutAlgorithm
                     * @excluding approximation, attractiveForce, enableSimulation,
                     *            repulsiveForce, theta
                     */
                    parentNodeOptions: {
                        maxIterations: 400,
                        gravitationalConstant: 0.03,
                        maxSpeed: 50,
                        initialPositionRadius: 100,
                        seriesInteraction: true,
                        /**
                         * Styling options for parentNodes markers. Similar to
                         * line.marker options.
                         *
                         * @sample highcharts/series-packedbubble/parentnode-style/
                         *         Bubble size
                         *
                         * @extends   plotOptions.series.marker
                         * @excluding states
                         */
                        marker: {
                            fillColor: null,
                            fillOpacity: 1,
                            lineWidth: null,
                            lineColor: null,
                            symbol: 'circle'
                        }
                    },
                    enableSimulation: true,
                    /**
                     * Type of the algorithm used when positioning bubbles.
                     * @ignore-option
                     */
                    type: 'packedbubble',
                    /**
                     * Integration type. Integration determines how forces are applied
                     * on particles. The `packedbubble` integration is based on
                     * the networkgraph `verlet` integration, where the new position
                     * is based on a previous position without velocity:
                     * `newPosition += previousPosition - newPosition`.
                     *
                     * @sample highcharts/series-networkgraph/forces/
                     *
                     * @ignore-option
                     */
                    integration: 'packedbubble',
                    maxIterations: 1000,
                    /**
                     * Whether to split series into individual groups or to mix all
                     * series together.
                     *
                     * @since   7.1.0
                     * @default false
                     */
                    splitSeries: false,
                    /**
                     * Max speed that node can get in one iteration. In terms of
                     * simulation, it's a maximum translation (in pixels) that a node
                     * can move (in both, x and y, dimensions). While `friction` is
                     * applied on all nodes, max speed is applied only for nodes that
                     * move very fast, for example small or disconnected ones.
                     *
                     * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
                     *
                     * @see [layoutAlgorithm.friction](#series.networkgraph.layoutAlgorithm.friction)
                     */
                    maxSpeed: 5,
                    gravitationalConstant: 0.01,
                    friction: -0.981
                }
            });
            return PackedBubbleSeries;
        }(BubbleSeries));
        extend(PackedBubbleSeries.prototype, {
            alignDataLabel: Series.prototype.alignDataLabel,
            axisTypes: [],
            directTouch: true,
            /**
             * Array of internal forces. Each force should be later defined in
             * integrations.js.
             * @private
             */
            forces: ['barycenter', 'repulsive'],
            /**
             * An internal option used for allowing nodes dragging.
             * @private
             */
            hasDraggableNodes: true,
            isCartesian: false,
            noSharedTooltip: true,
            /**
             * Mouse down action, initializing drag&drop mode.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseDown: dragNodesMixin.onMouseDown,
            /**
             * Mouse move action during drag&drop.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseMove: dragNodesMixin.onMouseMove,
            pointArrayMap: ['value'],
            pointClass: PackedBubblePoint,
            pointValKey: 'value',
            /**
             * Redraw halo on mousemove during the drag&drop action.
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             */
            redrawHalo: dragNodesMixin.redrawHalo,
            requireSorting: false,
            // solving #12287
            searchPoint: H.noop,
            trackerGroups: ['group', 'dataLabelsGroup', 'parentNodesGroup']
        });
        SeriesRegistry.registerSeriesType('packedbubble', PackedBubbleSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Formatter callback function.
         *
         * @callback Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction
         *
         * @param {Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject} this
         *        Data label context to format
         *
         * @return {string}
         *         Formatted data label text
         */
        /**
         * Context for the formatter function.
         *
         * @interface Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject
         * @extends Highcharts.PointLabelObject
         * @since 7.0.0
         */ /**
        * The color of the node.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#color
        * @type {Highcharts.ColorString}
        * @since 7.0.0
        */ /**
        * The point (node) object. The node name, if defined, is available through
        * `this.point.name`. Arrays: `this.point.linksFrom` and `this.point.linksTo`
        * contains all nodes connected to this point.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#point
        * @type {Highcharts.Point}
        * @since 7.0.0
        */ /**
        * The ID of the node.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#key
        * @type {string}
        * @since 7.0.0
        */
        ''; // detach doclets above
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A `packedbubble` series. If the [type](#series.packedbubble.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @type      {Object}
         * @extends   series,plotOptions.packedbubble
         * @excluding cropThreshold, dataParser, dataSorting, dataURL, dragDrop, stack,
         *            boostThreshold, boostBlending
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.packedbubble
         */
        /**
         * An array of data points for the series. For the `packedbubble` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of `values`.
         *
         *  ```js
         *     data: [5, 1, 20]
         *  ```
         *
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data points
         * exceeds the series' [turboThreshold](#series.packedbubble.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         value: 1,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         value: 5,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @type      {Array<Object|Array>}
         * @extends   series.line.data
         * @excluding marker, x, y
         * @sample    {highcharts} highcharts/series/data-array-of-objects/
         *            Config objects
         * @product   highcharts
         * @apioption series.packedbubble.data
         */
        /**
         * @type      {Highcharts.SeriesPackedBubbleDataLabelsOptionsObject|Array<Highcharts.SeriesPackedBubbleDataLabelsOptionsObject>}
         * @product   highcharts
         * @apioption series.packedbubble.data.dataLabels
         */
        /**
         * @excluding enabled,enabledThreshold,height,radius,width
         * @product   highcharts
         * @apioption series.packedbubble.marker
         */
        ''; // adds doclets above to transpiled file

        return PackedBubbleSeries;
    });
    _registerModule(_modules, 'Series/Polygon/PolygonSeries.js', [_modules['Core/Globals.js'], _modules['Core/Legend/LegendSymbol.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (H, LegendSymbol, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var noop = H.noop;
        var Series = SeriesRegistry.series,
            _a = SeriesRegistry.seriesTypes,
            AreaSeries = _a.area,
            LineSeries = _a.line,
            ScatterSeries = _a.scatter;
        var extend = U.extend,
            merge = U.merge;
        /* *
         *
         * Class
         *
         * */
        var PolygonSeries = /** @class */ (function (_super) {
                __extends(PolygonSeries, _super);
            function PolygonSeries() {
                /* *
                 *
                 * Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             * Functions
             *
             * */
            PolygonSeries.prototype.getGraphPath = function () {
                var graphPath = LineSeries.prototype.getGraphPath.call(this),
                    i = graphPath.length + 1;
                // Close all segments
                while (i--) {
                    if ((i === graphPath.length || graphPath[i][0] === 'M') && i > 0) {
                        graphPath.splice(i, 0, ['Z']);
                    }
                }
                this.areaPath = graphPath;
                return graphPath;
            };
            PolygonSeries.prototype.drawGraph = function () {
                // Hack into the fill logic in area.drawGraph
                this.options.fillColor = this.color;
                AreaSeries.prototype.drawGraph.call(this);
            };
            /**
             * A polygon series can be used to draw any freeform shape in the cartesian
             * coordinate system. A fill is applied with the `color` option, and
             * stroke is applied through `lineWidth` and `lineColor` options.
             *
             * @sample {highcharts} highcharts/demo/polygon/
             *         Polygon
             * @sample {highstock} highcharts/demo/polygon/
             *         Polygon
             *
             * @extends      plotOptions.scatter
             * @since        4.1.0
             * @excluding    jitter, softThreshold, threshold, cluster, boostThreshold,
             *               boostBlending
             * @product      highcharts highstock
             * @requires     highcharts-more
             * @optionparent plotOptions.polygon
             */
            PolygonSeries.defaultOptions = merge(ScatterSeries.defaultOptions, {
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
            });
            return PolygonSeries;
        }(ScatterSeries));
        extend(PolygonSeries.prototype, {
            type: 'polygon',
            drawLegendSymbol: LegendSymbol.drawRectangle,
            drawTracker: Series.prototype.drawTracker,
            setStackedPoints: noop // No stacking points on polygons (#5310)
        });
        SeriesRegistry.registerSeriesType('polygon', PolygonSeries);
        /* *
         *
         * Export
         *
         * */
        /* *
         *
         * API Options
         *
         * */
        /**
         * A `polygon` series. If the [type](#series.polygon.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.polygon
         * @excluding dataParser, dataURL, stack, boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.polygon
         */
        /**
         * An array of data points for the series. For the `polygon` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 10],
         *        [1, 3],
         *        [2, 1]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.polygon.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 1,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 8,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
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
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @product   highcharts highstock
         * @apioption series.polygon.data
         */
        ''; // adds doclets above to transpiled file

        return PolygonSeries;
    });
    _registerModule(_modules, 'Core/Axis/WaterfallAxis.js', [_modules['Extensions/Stacking.js'], _modules['Core/Utilities.js']], function (StackItem, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            objectEach = U.objectEach;
        /**
         * @private
         */
        var WaterfallAxis;
        (function (WaterfallAxis) {
            /* *
             *
             *  Interfaces
             *
             * */
            /* *
             *
             *  Classes
             *
             * */
            /**
             * @private
             */
            var Composition = /** @class */ (function () {
                    /* eslint-disable no-invalid-this, valid-jsdoc */
                    /* *
                     *
                     *  Constructors
                     *
                     * */
                    /**
                     * @private
                     */
                    function Composition(axis) {
                        this.axis = axis;
                    this.stacks = {
                        changed: false
                    };
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Calls StackItem.prototype.render function that creates and renders
                 * stack total label for each waterfall stack item.
                 *
                 * @private
                 * @function Highcharts.Axis#renderWaterfallStackTotals
                 */
                Composition.prototype.renderStackTotals = function () {
                    var yAxis = this.axis,
                        waterfallStacks = yAxis.waterfall.stacks,
                        stackTotalGroup = (yAxis.stacking && yAxis.stacking.stackTotalGroup),
                        dummyStackItem = new StackItem(yAxis,
                        yAxis.options.stackLabels,
                        false, 0,
                        void 0);
                    this.dummyStackItem = dummyStackItem;
                    // Render each waterfall stack total
                    objectEach(waterfallStacks, function (type) {
                        objectEach(type, function (stackItem) {
                            dummyStackItem.total = stackItem.stackTotal;
                            if (stackItem.label) {
                                dummyStackItem.label = stackItem.label;
                            }
                            StackItem.prototype.render.call(dummyStackItem, stackTotalGroup);
                            stackItem.label = dummyStackItem.label;
                            delete dummyStackItem.label;
                        });
                    });
                    dummyStackItem.total = null;
                };
                return Composition;
            }());
            WaterfallAxis.Composition = Composition;
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable no-invalid-this, valid-jsdoc */
            /**
             * @private
             */
            function compose(AxisClass, ChartClass) {
                addEvent(AxisClass, 'init', onInit);
                addEvent(AxisClass, 'afterBuildStacks', onAfterBuildStacks);
                addEvent(AxisClass, 'afterRender', onAfterRender);
                addEvent(ChartClass, 'beforeRedraw', onBeforeRedraw);
            }
            WaterfallAxis.compose = compose;
            /**
             * @private
             */
            function onAfterBuildStacks() {
                var axis = this;
                var stacks = axis.waterfall.stacks;
                if (stacks) {
                    stacks.changed = false;
                    delete stacks.alreadyChanged;
                }
            }
            /**
             * @private
             */
            function onAfterRender() {
                var axis = this;
                var stackLabelOptions = axis.options.stackLabels;
                if (stackLabelOptions && stackLabelOptions.enabled &&
                    axis.waterfall.stacks) {
                    axis.waterfall.renderStackTotals();
                }
            }
            /**
             * @private
             */
            function onBeforeRedraw() {
                var axes = this.axes,
                    series = this.series,
                    i = series.length;
                while (i--) {
                    if (series[i].options.stacking) {
                        axes.forEach(function (axis) {
                            if (!axis.isXAxis) {
                                axis.waterfall.stacks.changed = true;
                            }
                        });
                        i = 0;
                    }
                }
            }
            /**
             * @private
             */
            function onInit() {
                var axis = this;
                if (!axis.waterfall) {
                    axis.waterfall = new Composition(axis);
                }
            }
        })(WaterfallAxis || (WaterfallAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return WaterfallAxis;
    });
    _registerModule(_modules, 'Series/Waterfall/WaterfallPoint.js', [_modules['Series/Column/ColumnSeries.js'], _modules['Core/Series/Point.js'], _modules['Core/Utilities.js']], function (ColumnSeries, Point, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var isNumber = U.isNumber;
        /* *
         *
         * Class
         *
         * */
        var WaterfallPoint = /** @class */ (function (_super) {
                __extends(WaterfallPoint, _super);
            function WaterfallPoint() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.series = void 0;
                return _this;
            }
            /* *
             *
             * Functions
             *
             * */
            WaterfallPoint.prototype.getClassName = function () {
                var className = Point.prototype.getClassName.call(this);
                if (this.isSum) {
                    className += ' highcharts-sum';
                }
                else if (this.isIntermediateSum) {
                    className += ' highcharts-intermediate-sum';
                }
                return className;
            };
            // Pass the null test in ColumnSeries.translate.
            WaterfallPoint.prototype.isValid = function () {
                return (isNumber(this.y) ||
                    this.isSum ||
                    Boolean(this.isIntermediateSum));
            };
            return WaterfallPoint;
        }(ColumnSeries.prototype.pointClass));
        /* *
         *
         * Export
         *
         * */

        return WaterfallPoint;
    });
    _registerModule(_modules, 'Series/Waterfall/WaterfallSeries.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Core/Axis/WaterfallAxis.js'], _modules['Series/Waterfall/WaterfallPoint.js']], function (Axis, Chart, SeriesRegistry, U, WaterfallAxis, WaterfallPoint) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var _a = SeriesRegistry.seriesTypes,
            ColumnSeries = _a.column,
            LineSeries = _a.line;
        var arrayMax = U.arrayMax,
            arrayMin = U.arrayMin,
            correctFloat = U.correctFloat,
            extend = U.extend,
            isNumber = U.isNumber,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick;
        /**
         * Returns true if the key is a direct property of the object.
         * @private
         * @param {*} obj
         * Object with property to test
         * @param {string} key
         * Property key to test
         * @return {boolean}
         * Whether it is a direct property
         */
        function ownProp(obj, key) {
            return Object.hasOwnProperty.call(obj, key);
        }
        /* eslint-disable no-invalid-this, valid-jsdoc */
        // eslint-disable-next-line valid-jsdoc
        /**
         * Waterfall series type.
         *
         * @private
         */
        var WaterfallSeries = /** @class */ (function (_super) {
                __extends(WaterfallSeries, _super);
            function WaterfallSeries() {
                /* *
                 *
                 * Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 * Properties
                 *
                 * */
                _this.chart = void 0;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.stackedYNeg = void 0;
                _this.stackedYPos = void 0;
                _this.stackKey = void 0;
                _this.xData = void 0;
                _this.yAxis = void 0;
                _this.yData = void 0;
                return _this;
            }
            /* *
             *
             * Functions
             *
             * */
            // After generating points, set y-values for all sums.
            WaterfallSeries.prototype.generatePoints = function () {
                var point,
                    len,
                    i,
                    y;
                // Parent call:
                ColumnSeries.prototype.generatePoints.apply(this);
                for (i = 0, len = this.points.length; i < len; i++) {
                    point = this.points[i];
                    y = this.processedYData[i];
                    // override point value for sums
                    // #3710 Update point does not propagate to sum
                    if (point.isIntermediateSum || point.isSum) {
                        point.y = correctFloat(y);
                    }
                }
            };
            // Translate data points from raw values
            WaterfallSeries.prototype.translate = function () {
                var series = this,
                    options = series.options,
                    yAxis = series.yAxis,
                    y,
                    minPointLength = pick(options.minPointLength, 5),
                    halfMinPointLength = minPointLength / 2,
                    threshold = options.threshold || 0,
                    previousY = threshold,
                    previousIntermediate = threshold,
                    stacking = options.stacking,
                    actualStack = yAxis.waterfall.stacks[series.stackKey],
                    total,
                    yPos,
                    hPos;
                // run column series translate
                ColumnSeries.prototype.translate.apply(series);
                var points = series.points;
                for (var i = 0; i < points.length; i++) {
                    var point = points[i];
                    var yValue = series.processedYData[i];
                    var shapeArgs = point.shapeArgs;
                    if (!shapeArgs || !isNumber(yValue)) {
                        continue;
                    }
                    var range = [0,
                        yValue];
                    var pointY = point.y;
                    // code responsible for correct positions of stacked points
                    // starts here
                    if (stacking) {
                        if (actualStack) {
                            var actualStackX = actualStack[i];
                            if (stacking === 'overlap') {
                                total =
                                    actualStackX.stackState[actualStackX.stateIndex--];
                                y = pointY >= 0 ? total : total - pointY;
                                if (ownProp(actualStackX, 'absolutePos')) {
                                    delete actualStackX.absolutePos;
                                }
                                if (ownProp(actualStackX, 'absoluteNeg')) {
                                    delete actualStackX.absoluteNeg;
                                }
                            }
                            else {
                                if (pointY >= 0) {
                                    total = actualStackX.threshold +
                                        actualStackX.posTotal;
                                    actualStackX.posTotal -= pointY;
                                    y = total;
                                }
                                else {
                                    total = actualStackX.threshold +
                                        actualStackX.negTotal;
                                    actualStackX.negTotal -= pointY;
                                    y = total - pointY;
                                }
                                if (!actualStackX.posTotal) {
                                    if (ownProp(actualStackX, 'absolutePos')) {
                                        actualStackX.posTotal =
                                            actualStackX.absolutePos;
                                        delete actualStackX.absolutePos;
                                    }
                                }
                                if (!actualStackX.negTotal) {
                                    if (ownProp(actualStackX, 'absoluteNeg')) {
                                        actualStackX.negTotal =
                                            actualStackX.absoluteNeg;
                                        delete actualStackX.absoluteNeg;
                                    }
                                }
                            }
                            if (!point.isSum) {
                                // the connectorThreshold property is later used in
                                // getCrispPath function to draw a connector line in a
                                // correct place
                                actualStackX.connectorThreshold =
                                    actualStackX.threshold + actualStackX.stackTotal;
                            }
                            if (yAxis.reversed) {
                                yPos = (pointY >= 0) ? (y - pointY) : (y + pointY);
                                hPos = y;
                            }
                            else {
                                yPos = y;
                                hPos = y - pointY;
                            }
                            point.below = yPos <= threshold;
                            shapeArgs.y = yAxis.translate(yPos, false, true, false, true) || 0;
                            shapeArgs.height = Math.abs(shapeArgs.y -
                                (yAxis.translate(hPos, false, true, false, true) || 0));
                            var dummyStackItem = yAxis.waterfall.dummyStackItem;
                            if (dummyStackItem) {
                                dummyStackItem.x = i;
                                dummyStackItem.label = actualStack[i].label;
                                dummyStackItem.setOffset(series.pointXOffset || 0, series.barW || 0, series.stackedYNeg[i], series.stackedYPos[i]);
                            }
                        }
                    }
                    else {
                        // up points
                        y = Math.max(previousY, previousY + pointY) + range[0];
                        shapeArgs.y = yAxis.translate(y, false, true, false, true) || 0;
                        // sum points
                        if (point.isSum) {
                            shapeArgs.y = yAxis.translate(range[1], false, true, false, true) || 0;
                            shapeArgs.height = Math.min(yAxis.translate(range[0], false, true, false, true) || 0, yAxis.len) - shapeArgs.y; // #4256
                            point.below = range[1] <= threshold;
                        }
                        else if (point.isIntermediateSum) {
                            if (pointY >= 0) {
                                yPos = range[1] + previousIntermediate;
                                hPos = previousIntermediate;
                            }
                            else {
                                yPos = previousIntermediate;
                                hPos = range[1] + previousIntermediate;
                            }
                            if (yAxis.reversed) {
                                // swapping values
                                yPos ^= hPos;
                                hPos ^= yPos;
                                yPos ^= hPos;
                            }
                            shapeArgs.y = yAxis.translate(yPos, false, true, false, true) || 0;
                            shapeArgs.height = Math.abs(shapeArgs.y -
                                Math.min(yAxis.translate(hPos, false, true, false, true) || 0, yAxis.len));
                            previousIntermediate += range[1];
                            point.below = yPos <= threshold;
                            // If it's not the sum point, update previous stack end position
                            // and get shape height (#3886)
                        }
                        else {
                            shapeArgs.height = yValue > 0 ?
                                (yAxis.translate(previousY, false, true, false, true) || 0) - shapeArgs.y :
                                (yAxis.translate(previousY, false, true, false, true) || 0) - (yAxis.translate(previousY - yValue, false, true, false, true) || 0);
                            previousY += yValue;
                            point.below = previousY < threshold;
                        }
                        // #3952 Negative sum or intermediate sum not rendered correctly
                        if (shapeArgs.height < 0) {
                            shapeArgs.y += shapeArgs.height;
                            shapeArgs.height *= -1;
                        }
                    }
                    point.plotY = shapeArgs.y =
                        Math.round(shapeArgs.y || 0) - (series.borderWidth % 2) / 2;
                    // #3151
                    shapeArgs.height =
                        Math.max(Math.round(shapeArgs.height || 0), 0.001);
                    point.yBottom = shapeArgs.y + shapeArgs.height;
                    if (shapeArgs.height <= minPointLength && !point.isNull) {
                        shapeArgs.height = minPointLength;
                        shapeArgs.y -= halfMinPointLength;
                        point.plotY = shapeArgs.y;
                        if (point.y < 0) {
                            point.minPointLengthOffset = -halfMinPointLength;
                        }
                        else {
                            point.minPointLengthOffset = halfMinPointLength;
                        }
                    }
                    else {
                        if (point.isNull) {
                            shapeArgs.width = 0;
                        }
                        point.minPointLengthOffset = 0;
                    }
                    // Correct tooltip placement (#3014)
                    var tooltipY = point.plotY + (point.negative ? shapeArgs.height : 0);
                    if (point.below) { // #15334
                        point.plotY += shapeArgs.height;
                    }
                    if (point.tooltipPos) {
                        if (series.chart.inverted) {
                            point.tooltipPos[0] = yAxis.len - tooltipY;
                        }
                        else {
                            point.tooltipPos[1] = tooltipY;
                        }
                    }
                }
            };
            // Call default processData then override yData to reflect waterfall's
            // extremes on yAxis
            WaterfallSeries.prototype.processData = function (force) {
                var series = this,
                    options = series.options,
                    yData = series.yData, 
                    // #3710 Update point does not propagate to sum
                    points = options.data,
                    point,
                    dataLength = yData.length,
                    threshold = options.threshold || 0,
                    subSum,
                    sum,
                    dataMin,
                    dataMax,
                    y,
                    i;
                sum = subSum = dataMin = dataMax = 0;
                for (i = 0; i < dataLength; i++) {
                    y = yData[i];
                    point = points && points[i] ? points[i] : {};
                    if (y === 'sum' || point.isSum) {
                        yData[i] = correctFloat(sum);
                    }
                    else if (y === 'intermediateSum' ||
                        point.isIntermediateSum) {
                        yData[i] = correctFloat(subSum);
                        subSum = 0;
                    }
                    else {
                        sum += y;
                        subSum += y;
                    }
                    dataMin = Math.min(sum, dataMin);
                    dataMax = Math.max(sum, dataMax);
                }
                _super.prototype.processData.call(this, force);
                // Record extremes only if stacking was not set:
                if (!options.stacking) {
                    series.dataMin = dataMin + threshold;
                    series.dataMax = dataMax;
                }
                return;
            };
            // Return y value or string if point is sum
            WaterfallSeries.prototype.toYData = function (pt) {
                if (pt.isSum) {
                    return 'sum';
                }
                if (pt.isIntermediateSum) {
                    return 'intermediateSum';
                }
                return pt.y;
            };
            WaterfallSeries.prototype.updateParallelArrays = function (point, i) {
                _super.prototype.updateParallelArrays.call(this, point, i);
                // Prevent initial sums from triggering an error (#3245, #7559)
                if (this.yData[0] === 'sum' || this.yData[0] === 'intermediateSum') {
                    this.yData[0] = null;
                }
            };
            // Postprocess mapping between options and SVG attributes
            WaterfallSeries.prototype.pointAttribs = function (point, state) {
                var upColor = this.options.upColor,
                    attr;
                // Set or reset up color (#3710, update to negative)
                if (upColor && !point.options.color) {
                    point.color = point.y > 0 ? upColor : null;
                }
                attr = ColumnSeries.prototype.pointAttribs.call(this, point, state);
                // The dashStyle option in waterfall applies to the graph, not
                // the points
                delete attr.dashstyle;
                return attr;
            };
            // Return an empty path initially, because we need to know the stroke-width
            // in order to set the final path.
            WaterfallSeries.prototype.getGraphPath = function () {
                return [['M', 0, 0]];
            };
            // Draw columns' connector lines
            WaterfallSeries.prototype.getCrispPath = function () {
                var data = this.data,
                    yAxis = this.yAxis,
                    length = data.length,
                    graphNormalizer = Math.round(this.graph.strokeWidth()) % 2 / 2,
                    borderNormalizer = Math.round(this.borderWidth) % 2 / 2,
                    reversedXAxis = this.xAxis.reversed,
                    reversedYAxis = this.yAxis.reversed,
                    stacking = this.options.stacking,
                    path = [],
                    connectorThreshold,
                    prevStack,
                    prevStackX,
                    prevPoint,
                    yPos,
                    isPos,
                    prevArgs,
                    pointArgs,
                    i;
                for (i = 1; i < length; i++) {
                    pointArgs = data[i].shapeArgs;
                    prevPoint = data[i - 1];
                    prevArgs = data[i - 1].shapeArgs;
                    prevStack = yAxis.waterfall.stacks[this.stackKey];
                    isPos = prevPoint.y > 0 ? -prevArgs.height : 0;
                    if (prevStack && prevArgs && pointArgs) {
                        prevStackX = prevStack[i - 1];
                        // y position of the connector is different when series are
                        // stacked, yAxis is reversed and it also depends on point's
                        // value
                        if (stacking) {
                            connectorThreshold = prevStackX.connectorThreshold;
                            yPos = Math.round((yAxis.translate(connectorThreshold, 0, 1, 0, 1) +
                                (reversedYAxis ? isPos : 0))) - graphNormalizer;
                        }
                        else {
                            yPos =
                                prevArgs.y + prevPoint.minPointLengthOffset +
                                    borderNormalizer - graphNormalizer;
                        }
                        path.push([
                            'M',
                            (prevArgs.x || 0) + (reversedXAxis ?
                                0 :
                                (prevArgs.width || 0)),
                            yPos
                        ], [
                            'L',
                            (pointArgs.x || 0) + (reversedXAxis ?
                                (pointArgs.width || 0) :
                                0),
                            yPos
                        ]);
                    }
                    if (prevArgs &&
                        path.length &&
                        ((!stacking && prevPoint.y < 0 && !reversedYAxis) ||
                            (prevPoint.y > 0 && reversedYAxis))) {
                        var nextLast = path[path.length - 2];
                        if (nextLast && typeof nextLast[2] === 'number') {
                            nextLast[2] += prevArgs.height || 0;
                        }
                        var last = path[path.length - 1];
                        if (last && typeof last[2] === 'number') {
                            last[2] += prevArgs.height || 0;
                        }
                    }
                }
                return path;
            };
            // The graph is initially drawn with an empty definition, then updated with
            // crisp rendering.
            WaterfallSeries.prototype.drawGraph = function () {
                LineSeries.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                });
            };
            // Waterfall has stacking along the x-values too.
            WaterfallSeries.prototype.setStackedPoints = function () {
                var series = this,
                    options = series.options,
                    waterfallStacks = series.yAxis.waterfall.stacks,
                    seriesThreshold = options.threshold,
                    stackThreshold = seriesThreshold || 0,
                    interSum = stackThreshold,
                    stackKey = series.stackKey,
                    xData = series.xData,
                    xLength = xData.length,
                    actualStack,
                    actualStackX,
                    totalYVal,
                    actualSum,
                    prevSum,
                    statesLen,
                    posTotal,
                    negTotal,
                    xPoint,
                    yVal,
                    x,
                    alreadyChanged,
                    changed;
                // function responsible for calculating correct values for stackState
                // array of each stack item. The arguments are: firstS - the value for
                // the first state, nextS - the difference between the previous and the
                // newest state, sInx - counter used in the for that updates each state
                // when necessary, sOff - offset that must be added to each state when
                // they need to be updated (if point isn't a total sum)
                // eslint-disable-next-line require-jsdoc
                function calculateStackState(firstS, nextS, sInx, sOff) {
                    if (!statesLen) {
                        actualStackX.stackState[0] = firstS;
                        statesLen = actualStackX.stackState.length;
                    }
                    else {
                        for (sInx; sInx < statesLen; sInx++) {
                            actualStackX.stackState[sInx] += sOff;
                        }
                    }
                    actualStackX.stackState.push(actualStackX.stackState[statesLen - 1] + nextS);
                }
                series.yAxis.stacking.usePercentage = false;
                totalYVal = actualSum = prevSum = stackThreshold;
                // code responsible for creating stacks for waterfall series
                if (series.visible ||
                    !series.chart.options.chart.ignoreHiddenSeries) {
                    changed = waterfallStacks.changed;
                    alreadyChanged = waterfallStacks.alreadyChanged;
                    // in case of a redraw, stack for each x value must be
                    // emptied (only for the first series in a specific stack)
                    // and recalculated once more
                    if (alreadyChanged &&
                        alreadyChanged.indexOf(stackKey) < 0) {
                        changed = true;
                    }
                    if (!waterfallStacks[stackKey]) {
                        waterfallStacks[stackKey] = {};
                    }
                    actualStack = waterfallStacks[stackKey];
                    for (var i = 0; i < xLength; i++) {
                        x = xData[i];
                        if (!actualStack[x] || changed) {
                            actualStack[x] = {
                                negTotal: 0,
                                posTotal: 0,
                                stackTotal: 0,
                                threshold: 0,
                                stateIndex: 0,
                                stackState: [],
                                label: ((changed &&
                                    actualStack[x]) ?
                                    actualStack[x].label :
                                    void 0)
                            };
                        }
                        actualStackX = actualStack[x];
                        yVal = series.yData[i];
                        if (yVal >= 0) {
                            actualStackX.posTotal += yVal;
                        }
                        else {
                            actualStackX.negTotal += yVal;
                        }
                        // points do not exist yet, so raw data is used
                        xPoint = options.data[i];
                        posTotal = actualStackX.absolutePos =
                            actualStackX.posTotal;
                        negTotal = actualStackX.absoluteNeg =
                            actualStackX.negTotal;
                        actualStackX.stackTotal = posTotal + negTotal;
                        statesLen = actualStackX.stackState.length;
                        if (xPoint && xPoint.isIntermediateSum) {
                            calculateStackState(prevSum, actualSum, 0, prevSum);
                            prevSum = actualSum;
                            actualSum = seriesThreshold;
                            // swapping values
                            stackThreshold ^= interSum;
                            interSum ^= stackThreshold;
                            stackThreshold ^= interSum;
                        }
                        else if (xPoint && xPoint.isSum) {
                            calculateStackState(seriesThreshold, totalYVal, statesLen);
                            stackThreshold = seriesThreshold;
                        }
                        else {
                            calculateStackState(stackThreshold, yVal, 0, totalYVal);
                            if (xPoint) {
                                totalYVal += yVal;
                                actualSum += yVal;
                            }
                        }
                        actualStackX.stateIndex++;
                        actualStackX.threshold = stackThreshold;
                        stackThreshold += actualStackX.stackTotal;
                    }
                    waterfallStacks.changed = false;
                    if (!waterfallStacks.alreadyChanged) {
                        waterfallStacks.alreadyChanged = [];
                    }
                    waterfallStacks.alreadyChanged.push(stackKey);
                }
            };
            // Extremes for a non-stacked series are recorded in processData.
            // In case of stacking, use Series.stackedYData to calculate extremes.
            WaterfallSeries.prototype.getExtremes = function () {
                var stacking = this.options.stacking,
                    yAxis,
                    waterfallStacks,
                    stackedYNeg,
                    stackedYPos;
                if (stacking) {
                    yAxis = this.yAxis;
                    waterfallStacks = yAxis.waterfall.stacks;
                    stackedYNeg = this.stackedYNeg = [];
                    stackedYPos = this.stackedYPos = [];
                    // the visible y range can be different when stacking is set to
                    // overlap and different when it's set to normal
                    if (stacking === 'overlap') {
                        objectEach(waterfallStacks[this.stackKey], function (stackX) {
                            stackedYNeg.push(arrayMin(stackX.stackState));
                            stackedYPos.push(arrayMax(stackX.stackState));
                        });
                    }
                    else {
                        objectEach(waterfallStacks[this.stackKey], function (stackX) {
                            stackedYNeg.push(stackX.negTotal + stackX.threshold);
                            stackedYPos.push(stackX.posTotal + stackX.threshold);
                        });
                    }
                    return {
                        dataMin: arrayMin(stackedYNeg),
                        dataMax: arrayMax(stackedYPos)
                    };
                }
                // When not stacking, data extremes have already been computed in the
                // processData function.
                return {
                    dataMin: this.dataMin,
                    dataMax: this.dataMax
                };
            };
            /**
             * A waterfall chart displays sequentially introduced positive or negative
             * values in cumulative columns.
             *
             * @sample highcharts/demo/waterfall/
             *         Waterfall chart
             * @sample highcharts/plotoptions/waterfall-inverted/
             *         Horizontal (inverted) waterfall
             * @sample highcharts/plotoptions/waterfall-stacked/
             *         Stacked waterfall chart
             *
             * @extends      plotOptions.column
             * @excluding    boostThreshold, boostBlending
             * @product      highcharts
             * @requires     highcharts-more
             * @optionparent plotOptions.waterfall
             */
            WaterfallSeries.defaultOptions = merge(ColumnSeries.defaultOptions, {
                /**
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.waterfall.color
                 */
                /**
                 * The color used specifically for positive point columns. When not
                 * specified, the general series color is used.
                 *
                 * In styled mode, the waterfall colors can be set with the
                 * `.highcharts-point-negative`, `.highcharts-sum` and
                 * `.highcharts-intermediate-sum` classes.
                 *
                 * @sample {highcharts} highcharts/demo/waterfall/
                 *         Waterfall
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @product   highcharts
                 * @apioption plotOptions.waterfall.upColor
                 */
                dataLabels: {
                    inside: true
                },
                /**
                 * The width of the line connecting waterfall columns.
                 *
                 * @product highcharts
                 */
                lineWidth: 1,
                /**
                 * The color of the line that connects columns in a waterfall series.
                 *
                 * In styled mode, the stroke can be set with the `.highcharts-graph`
                 * class.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since   3.0
                 * @product highcharts
                 */
                lineColor: "#333333" /* neutralColor80 */,
                /**
                 * A name for the dash style to use for the line connecting the columns
                 * of the waterfall series. Possible values: Dash, DashDot, Dot,
                 * LongDash, LongDashDot, LongDashDotDot, ShortDash, ShortDashDot,
                 * ShortDashDotDot, ShortDot, Solid
                 *
                 * In styled mode, the stroke dash-array can be set with the
                 * `.highcharts-graph` class.
                 *
                 * @type    {Highcharts.DashStyleValue}
                 * @since   3.0
                 * @product highcharts
                 */
                dashStyle: 'Dot',
                /**
                 * The color of the border of each waterfall column.
                 *
                 * In styled mode, the border stroke can be set with the
                 * `.highcharts-point` class.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since   3.0
                 * @product highcharts
                 */
                borderColor: "#333333" /* neutralColor80 */,
                states: {
                    hover: {
                        lineWidthPlus: 0 // #3126
                    }
                }
            });
            return WaterfallSeries;
        }(ColumnSeries));
        extend(WaterfallSeries.prototype, {
            getZonesGraphs: LineSeries.prototype.getZonesGraphs,
            pointValKey: 'y',
            // Property needed to prevent lines between the columns from disappearing
            // when negativeColor is used.
            showLine: true,
            pointClass: WaterfallPoint
        });
        SeriesRegistry.registerSeriesType('waterfall', WaterfallSeries);
        WaterfallAxis.compose(Axis, Chart);
        /* *
         *
         * Export
         *
         * */
        /**
         *
         * API Options
         *
         */
        /**
         * A `waterfall` series. If the [type](#series.waterfall.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.waterfall
         * @excluding dataParser, dataURL, boostThreshold, boostBlending
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.waterfall
         */
        /**
         * An array of data points for the series. For the `waterfall` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 7],
         *        [1, 8],
         *        [2, 3]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.waterfall.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 8,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 8,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
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
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts
         * @apioption series.waterfall.data
         */
        /**
         * When this property is true, the points acts as a summary column for
         * the values added or substracted since the last intermediate sum,
         * or since the start of the series. The `y` value is ignored.
         *
         * @sample {highcharts} highcharts/demo/waterfall/
         *         Waterfall
         *
         * @type      {boolean}
         * @default   false
         * @product   highcharts
         * @apioption series.waterfall.data.isIntermediateSum
         */
        /**
         * When this property is true, the point display the total sum across
         * the entire series. The `y` value is ignored.
         *
         * @sample {highcharts} highcharts/demo/waterfall/
         *         Waterfall
         *
         * @type      {boolean}
         * @default   false
         * @product   highcharts
         * @apioption series.waterfall.data.isSum
         */
        ''; // adds doclets above to transpiled file

        return WaterfallSeries;
    });
    _registerModule(_modules, 'Extensions/Polar.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Extensions/Pane.js'], _modules['Core/Pointer.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (A, Chart, H, Pane, Pointer, Series, SeriesRegistry, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animObject = A.animObject;
        var seriesTypes = SeriesRegistry.seriesTypes;
        var addEvent = U.addEvent,
            defined = U.defined,
            find = U.find,
            isNumber = U.isNumber,
            pick = U.pick,
            splat = U.splat,
            uniqueKey = U.uniqueKey,
            wrap = U.wrap;
        // Extensions for polar charts. Additionally, much of the geometry required for
        // polar charts is gathered in RadialAxes.js.
        var seriesProto = Series.prototype,
            pointerProto = Pointer.prototype,
            columnProto,
            arearangeProto;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Search a k-d tree by the point angle, used for shared tooltips in polar
         * charts
         * @private
         */
        seriesProto.searchPointByAngle = function (e) {
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
         * @private
         * @param {boolean} calculateNeighbours
         *        Check if connectors should be calculated for neighbour points as
         *        well allows short recurence
         */
        seriesProto.getConnectors = function (segment, index, calculateNeighbours, connectEnds) {
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
                // 1 means control points midway between points, 2 means 1/3 from
                // the point, 3 is 1/4 etc;
            smoothing = 1.5, denom = smoothing + 1, leftContX, leftContY, rightContX, rightContY, dLControlPoint, // distance left control point
            dRControlPoint, leftContAngle, rightContAngle, jointAngle, addedNumber = connectEnds ? 1 : 0;
            // Calculate final index of points depending on the initial index value.
            // Because of calculating neighbours, index may be outisde segment
            // array.
            if (index >= 0 && index <= segment.length - 1) {
                i = index;
            }
            else if (index < 0) {
                i = segment.length - 1 + index;
            }
            else {
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
            // Ensure the right direction, jointAngle should be in the same quadrant
            // as leftContAngle
            if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
                jointAngle -= Math.PI;
            }
            // Find the corrected control points for a spline straight through the
            // point
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
            // calculate connectors for previous and next point and push them inside
            // returned object
            if (calculateNeighbours) {
                ret.prevPointCont = this.getConnectors(segment, prevPointInd, false, connectEnds);
            }
            return ret;
        };
        /**
         * Translate a point's plotX and plotY from the internal angle and radius
         * measures to true plotX, plotY coordinates
         * @private
         */
        seriesProto.toXY = function (point) {
            var chart = this.chart,
                xAxis = this.xAxis,
                yAxis = this.yAxis,
                plotX = point.plotX,
                plotY = point.plotY,
                series = point.series,
                inverted = chart.inverted,
                pointY = point.y,
                radius = inverted ? plotX : yAxis.len - plotY,
                clientX;
            // Corrected y position of inverted series other than column
            if (inverted && series && !series.isRadialBar) {
                point.plotY = plotY =
                    typeof pointY === 'number' ? (yAxis.translate(pointY) || 0) : 0;
            }
            // Save rectangular plotX, plotY for later computation
            point.rectPlotX = plotX;
            point.rectPlotY = plotY;
            if (yAxis.center) {
                radius += yAxis.center[3] / 2;
            }
            // Find the polar plotX and plotY. Avoid setting plotX and plotY to NaN when
            // plotY is undefined (#15438)
            if (isNumber(plotY)) {
                var xy = inverted ? yAxis.postTranslate(plotY,
                    radius) :
                        xAxis.postTranslate(plotX,
                    radius);
                point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
                point.plotY = point.polarPlotY = xy.y - chart.plotTop;
            }
            // If shared tooltip, record the angle in degrees in order to align X
            // points. Otherwise, use a standard k-d tree to get the nearest point
            // in two dimensions.
            if (this.kdByAngle) {
                clientX = ((plotX / Math.PI * 180) +
                    xAxis.pane.options.startAngle) % 360;
                if (clientX < 0) { // #2665
                    clientX += 360;
                }
                point.clientX = clientX;
            }
            else {
                point.clientX = point.plotX;
            }
        };
        if (seriesTypes.spline) {
            /**
             * Overridden method for calculating a spline from one point to the next
             * @private
             */
            wrap(seriesTypes.spline.prototype, 'getPointSpline', function (proceed, segment, point, i) {
                var ret,
                    connectors;
                if (this.chart.polar) {
                    // moveTo or lineTo
                    if (!i) {
                        ret = ['M', point.plotX, point.plotY];
                    }
                    else { // curve from last point to this
                        connectors = this.getConnectors(segment, i, true, this.connectEnds);
                        var rightContX = connectors.prevPointCont &&
                                connectors.prevPointCont.rightContX;
                        var rightContY = connectors.prevPointCont &&
                                connectors.prevPointCont.rightContY;
                        ret = [
                            'C',
                            isNumber(rightContX) ? rightContX : connectors.plotX,
                            isNumber(rightContY) ? rightContY : connectors.plotY,
                            isNumber(connectors.leftContX) ?
                                connectors.leftContX :
                                connectors.plotX,
                            isNumber(connectors.leftContY) ?
                                connectors.leftContY :
                                connectors.plotY,
                            connectors.plotX,
                            connectors.plotY
                        ];
                    }
                }
                else {
                    ret = proceed.call(this, segment, point, i);
                }
                return ret;
            });
            // #6430 Areasplinerange series use unwrapped getPointSpline method, so
            // we need to set this method again.
            if (seriesTypes.areasplinerange) {
                seriesTypes.areasplinerange.prototype
                    .getPointSpline = seriesTypes.spline.prototype.getPointSpline;
            }
        }
        /**
         * Extend translate. The plotX and plotY values are computed as if the polar
         * chart were a cartesian plane, where plotX denotes the angle in radians
         * and (yAxis.len - plotY) is the pixel distance from center.
         * @private
         */
        addEvent(Series, 'afterTranslate', function () {
            var series = this;
            var chart = series.chart;
            if (chart.polar && series.xAxis) {
                // Prepare k-d-tree handling. It searches by angle (clientX) in
                // case of shared tooltip, and by two dimensional distance in case
                // of non-shared.
                series.kdByAngle = chart.tooltip && chart.tooltip.shared;
                if (series.kdByAngle) {
                    series.searchPoint = series.searchPointByAngle;
                }
                else {
                    series.options.findNearestPointBy = 'xy';
                }
                // Postprocess plot coordinates
                if (!series.preventPostTranslate) {
                    var points = series.points;
                    var i = points.length;
                    while (i--) {
                        // Translate plotX, plotY from angle and radius to true plot
                        // coordinates
                        series.toXY(points[i]);
                        // Treat points below Y axis min as null (#10082)
                        if (!chart.hasParallelCoordinates &&
                            !series.yAxis.reversed &&
                            points[i].y < series.yAxis.min) {
                            points[i].isNull = true;
                        }
                    }
                }
                // Perform clip after render
                if (!this.hasClipCircleSetter) {
                    this.hasClipCircleSetter = !!series.eventsToUnbind.push(addEvent(series, 'afterRender', function () {
                        var circ;
                        if (chart.polar) {
                            // For clipping purposes there is a need for
                            // coordinates from the absolute center
                            circ = this.yAxis.pane.center;
                            if (!this.clipCircle) {
                                this.clipCircle = chart.renderer.clipCircle(circ[0], circ[1], circ[2] / 2, circ[3] / 2);
                            }
                            else {
                                this.clipCircle.animate({
                                    x: circ[0],
                                    y: circ[1],
                                    r: circ[2] / 2,
                                    innerR: circ[3] / 2
                                });
                            }
                            this.group.clip(this.clipCircle);
                            this.setClip = H.noop;
                        }
                    }));
                }
            }
        }, { order: 2 }); // Run after translation of ||-coords
        /**
         * Extend getSegmentPath to allow connecting ends across 0 to provide a
         * closed circle in line-like series.
         * @private
         */
        wrap(seriesTypes.line.prototype, 'getGraphPath', function (proceed, points) {
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
                 * Polar charts only. Whether to connect the ends of a line series
                 * plot across the extremes.
                 *
                 * @sample {highcharts} highcharts/plotoptions/line-connectends-false/
                 *         Do not connect
                 *
                 * @type      {boolean}
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.series.connectEnds
                 */
                if (this.options.connectEnds !== false &&
                    typeof firstValid !== 'undefined') {
                    this.connectEnds = true; // re-used in splines
                    points.splice(points.length, 0, points[firstValid]);
                    popLastPoint = true;
                }
                // For area charts, pseudo points are added to the graph, now we
                // need to translate these
                points.forEach(function (point) {
                    if (typeof point.polarPlotY === 'undefined') {
                        series.toXY(point);
                    }
                });
            }
            // Run uber method
            var ret = proceed.apply(this,
                [].slice.call(arguments, 1));
            // #6212 points.splice method is adding points to an array. In case of
            // areaspline getGraphPath method is used two times and in both times
            // points are added to an array. That is why points.pop is used, to get
            // unmodified points.
            if (popLastPoint) {
                points.pop();
            }
            return ret;
        });
        var polarAnimate = function (proceed,
            init) {
                var series = this,
            chart = this.chart,
            animation = this.options.animation,
            group = this.group,
            markerGroup = this.markerGroup,
            center = this.xAxis && this.xAxis.center,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            attribs,
            paneInnerR,
            graphic,
            shapeArgs,
            r,
            innerR;
            // Specific animation for polar charts
            if (chart.polar) {
                if (series.isRadialBar) {
                    if (!init) {
                        // Run the pie animation for radial bars
                        series.startAngleRad = pick(series.translatedThreshold, series.xAxis.startAngleRad);
                        H.seriesTypes.pie.prototype.animate.call(series, init);
                    }
                }
                else {
                    // Enable animation on polar charts only in SVG. In VML, the scaling
                    // is different, plus animation would be so slow it would't matter.
                    if (chart.renderer.isSVG) {
                        animation = animObject(animation);
                        // A different animation needed for column like series
                        if (series.is('column')) {
                            if (!init) {
                                paneInnerR = center[3] / 2;
                                series.points.forEach(function (point) {
                                    graphic = point.graphic;
                                    shapeArgs = point.shapeArgs;
                                    r = shapeArgs && shapeArgs.r;
                                    innerR = shapeArgs && shapeArgs.innerR;
                                    if (graphic && shapeArgs) {
                                        // start values
                                        graphic.attr({
                                            r: paneInnerR,
                                            innerR: paneInnerR
                                        });
                                        // animate
                                        graphic.animate({
                                            r: r,
                                            innerR: innerR
                                        }, series.options.animation);
                                    }
                                });
                            }
                        }
                        else {
                            // Initialize the animation
                            if (init) {
                                // Scale down the group and place it in the center
                                attribs = {
                                    translateX: center[0] + plotLeft,
                                    translateY: center[1] + plotTop,
                                    scaleX: 0.001,
                                    scaleY: 0.001
                                };
                                group.attr(attribs);
                                if (markerGroup) {
                                    markerGroup.attr(attribs);
                                }
                                // Run the animation
                            }
                            else {
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
                            }
                        }
                    }
                }
                // For non-polar charts, revert to the basic animation
            }
            else {
                proceed.call(this, init);
            }
        };
        // Define the animate method for regular series
        wrap(seriesProto, 'animate', polarAnimate);
        if (seriesTypes.column) {
            arearangeProto = seriesTypes.arearange.prototype;
            columnProto = seriesTypes.column.prototype;
            columnProto.polarArc = function (low, high, start, end) {
                var center = this.xAxis.center,
                    len = this.yAxis.len,
                    paneInnerR = center[3] / 2,
                    r = len - high + paneInnerR,
                    innerR = len - pick(low,
                    len) + paneInnerR;
                // Prevent columns from shooting through the pane's center
                if (this.yAxis.reversed) {
                    if (r < 0) {
                        r = paneInnerR;
                    }
                    if (innerR < 0) {
                        innerR = paneInnerR;
                    }
                }
                // Return a new shapeArgs
                return {
                    x: center[0],
                    y: center[1],
                    r: r,
                    innerR: innerR,
                    start: start,
                    end: end
                };
            };
            /**
             * Define the animate method for columnseries
             * @private
             */
            wrap(columnProto, 'animate', polarAnimate);
            /**
             * Extend the column prototype's translate method
             * @private
             */
            wrap(columnProto, 'translate', function (proceed) {
                var series = this,
                    options = series.options,
                    threshold = options.threshold,
                    stacking = options.stacking,
                    chart = series.chart,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    reversed = yAxis.reversed,
                    center = yAxis.center,
                    startAngleRad = xAxis.startAngleRad,
                    endAngleRad = xAxis.endAngleRad,
                    visibleRange = endAngleRad - startAngleRad,
                    thresholdAngleRad,
                    points,
                    point,
                    i,
                    yMin,
                    yMax,
                    start,
                    end,
                    tooltipPos,
                    pointX,
                    pointY,
                    stackValues,
                    stack,
                    barX,
                    innerR,
                    r;
                series.preventPostTranslate = true;
                // Run uber method
                proceed.call(series);
                // Postprocess plot coordinates
                if (xAxis.isRadial) {
                    points = series.points;
                    i = points.length;
                    yMin = yAxis.translate(yAxis.min);
                    yMax = yAxis.translate(yAxis.max);
                    threshold = options.threshold || 0;
                    if (chart.inverted) {
                        // Finding a correct threshold
                        if (isNumber(threshold)) {
                            thresholdAngleRad = yAxis.translate(threshold);
                            // Checks if threshold is outside the visible range
                            if (defined(thresholdAngleRad)) {
                                if (thresholdAngleRad < 0) {
                                    thresholdAngleRad = 0;
                                }
                                else if (thresholdAngleRad > visibleRange) {
                                    thresholdAngleRad = visibleRange;
                                }
                                // Adding start angle offset
                                series.translatedThreshold =
                                    thresholdAngleRad + startAngleRad;
                            }
                        }
                    }
                    while (i--) {
                        point = points[i];
                        barX = point.barX;
                        pointX = point.x;
                        pointY = point.y;
                        point.shapeType = 'arc';
                        if (chart.inverted) {
                            point.plotY = yAxis.translate(pointY);
                            if (stacking && yAxis.stacking) {
                                stack = yAxis.stacking.stacks[(pointY < 0 ? '-' : '') +
                                    series.stackKey];
                                if (series.visible && stack && stack[pointX]) {
                                    if (!point.isNull) {
                                        stackValues = stack[pointX].points[series.getStackIndicator(void 0, pointX, series.index).key];
                                        // Translating to radial values
                                        start = yAxis.translate(stackValues[0]);
                                        end = yAxis.translate(stackValues[1]);
                                        // If starting point is beyond the
                                        // range, set it to 0
                                        if (defined(start)) {
                                            start = U.clamp(start, 0, visibleRange);
                                        }
                                    }
                                }
                            }
                            else {
                                // Initial start and end angles for radial bar
                                start = thresholdAngleRad;
                                end = point.plotY;
                            }
                            if (start > end) {
                                // Swapping start and end
                                end = [start, start = end][0];
                            }
                            // Prevent from rendering point outside the
                            // acceptable circular range
                            if (!reversed) {
                                if (start < yMin) {
                                    start = yMin;
                                }
                                else if (end > yMax) {
                                    end = yMax;
                                }
                                else if (end < yMin || start > yMax) {
                                    start = end = 0;
                                }
                            }
                            else {
                                if (end > yMin) {
                                    end = yMin;
                                }
                                else if (start < yMax) {
                                    start = yMax;
                                }
                                else if (start > yMin || end < yMax) {
                                    start = end = visibleRange;
                                }
                            }
                            if (yAxis.min > yAxis.max) {
                                start = end = reversed ? visibleRange : 0;
                            }
                            start += startAngleRad;
                            end += startAngleRad;
                            if (center) {
                                point.barX = barX += center[3] / 2;
                            }
                            // In case when radius, inner radius or both are
                            // negative, a point is rendered but partially or as
                            // a center point
                            innerR = Math.max(barX, 0);
                            r = Math.max(barX + point.pointWidth, 0);
                            point.shapeArgs = {
                                x: center && center[0],
                                y: center && center[1],
                                r: r,
                                innerR: innerR,
                                start: start,
                                end: end
                            };
                            // Fade out the points if not inside the polar "plot area"
                            point.opacity = start === end ? 0 : void 0;
                            // A correct value for stacked or not fully visible
                            // point
                            point.plotY = (defined(series.translatedThreshold) &&
                                (start < series.translatedThreshold ? start : end)) -
                                startAngleRad;
                        }
                        else {
                            start = barX + startAngleRad;
                            // Changed the way polar columns are drawn in order to make
                            // it more consistent with the drawing of inverted columns
                            // (they are using the same function now). Also, it was
                            // essential to make the animation work correctly (the
                            // scaling of the group) is replaced by animating each
                            // element separately.
                            point.shapeArgs = series.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth);
                        }
                        // Provided a correct coordinates for the tooltip
                        series.toXY(point);
                        if (chart.inverted) {
                            tooltipPos = yAxis.postTranslate(point.rectPlotY, barX + point.pointWidth / 2);
                            point.tooltipPos = [
                                tooltipPos.x - chart.plotLeft,
                                tooltipPos.y - chart.plotTop
                            ];
                        }
                        else {
                            point.tooltipPos = [point.plotX, point.plotY];
                        }
                        if (center) {
                            point.ttBelow = point.plotY > center[1];
                        }
                    }
                }
            });
            /**
             * Find correct align and vertical align based on an angle in polar chart
             * @private
             */
            columnProto.findAlignments = function (angle, options) {
                var align,
                    verticalAlign;
                if (options.align === null) {
                    if (angle > 20 && angle < 160) {
                        align = 'left'; // right hemisphere
                    }
                    else if (angle > 200 && angle < 340) {
                        align = 'right'; // left hemisphere
                    }
                    else {
                        align = 'center'; // top or bottom
                    }
                    options.align = align;
                }
                if (options.verticalAlign === null) {
                    if (angle < 45 || angle > 315) {
                        verticalAlign = 'bottom'; // top part
                    }
                    else if (angle > 135 && angle < 225) {
                        verticalAlign = 'top'; // bottom part
                    }
                    else {
                        verticalAlign = 'middle'; // left or right
                    }
                    options.verticalAlign = verticalAlign;
                }
                return options;
            };
            if (arearangeProto) {
                arearangeProto.findAlignments = columnProto.findAlignments;
            }
            /**
             * Align column data labels outside the columns. #1199.
             * @private
             */
            wrap(columnProto, 'alignDataLabel', function (proceed, point, dataLabel, options, alignTo, isNew) {
                var chart = this.chart,
                    inside = pick(options.inside, !!this.options.stacking),
                    angle,
                    shapeArgs,
                    labelPos;
                if (chart.polar) {
                    angle = point.rectPlotX / Math.PI * 180;
                    if (!chart.inverted) {
                        // Align nicely outside the perimeter of the columns
                        if (this.findAlignments) {
                            options = this.findAlignments(angle, options);
                        }
                    }
                    else { // Required corrections for data labels of inverted bars
                        // The plotX and plotY are correctly set therefore they
                        // don't need to be swapped (inverted argument is false)
                        this.forceDL = chart.isInsidePlot(point.plotX, Math.round(point.plotY));
                        // Checks if labels should be positioned inside
                        if (inside && point.shapeArgs) {
                            shapeArgs = point.shapeArgs;
                            // Calculates pixel positions for a data label to be
                            // inside
                            labelPos =
                                this.yAxis.postTranslate(
                                // angle
                                ((shapeArgs.start || 0) + (shapeArgs.end || 0)) / 2 -
                                    this
                                        .xAxis.startAngleRad, 
                                // radius
                                point.barX +
                                    point.pointWidth / 2);
                            alignTo = {
                                x: labelPos.x - chart.plotLeft,
                                y: labelPos.y - chart.plotTop
                            };
                        }
                        else if (point.tooltipPos) {
                            alignTo = {
                                x: point.tooltipPos[0],
                                y: point.tooltipPos[1]
                            };
                        }
                        options.align = pick(options.align, 'center');
                        options.verticalAlign =
                            pick(options.verticalAlign, 'middle');
                    }
                    seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
                    // Hide label of a point (only inverted) that is outside the
                    // visible y range
                    if (this.isRadialBar && point.shapeArgs &&
                        point.shapeArgs.start === point.shapeArgs.end) {
                        dataLabel.hide(true);
                    }
                }
                else {
                    proceed.call(this, point, dataLabel, options, alignTo, isNew);
                }
            });
        }
        /**
         * Extend getCoordinates to prepare for polar axis values
         * @private
         */
        wrap(pointerProto, 'getCoordinates', function (proceed, e) {
            var chart = this.chart,
                ret = {
                    xAxis: [],
                    yAxis: []
                };
            if (chart.polar) {
                chart.axes.forEach(function (axis) {
                    var isXAxis = axis.isXAxis,
                        center = axis.center,
                        x,
                        y;
                    // Skip colorAxis
                    if (axis.coll === 'colorAxis') {
                        return;
                    }
                    x = e.chartX - center[0] - chart.plotLeft;
                    y = e.chartY - center[1] - chart.plotTop;
                    ret[isXAxis ? 'xAxis' : 'yAxis'].push({
                        axis: axis,
                        value: axis.translate(isXAxis ?
                            Math.PI - Math.atan2(x, y) : // angle
                            // distance from center
                            Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), true)
                    });
                });
            }
            else {
                ret = proceed.call(this, e);
            }
            return ret;
        });
        SVGRenderer.prototype.clipCircle = function (x, y, r, innerR) {
            var wrapper,
                id = uniqueKey(),
                clipPath = this.createElement('clipPath').attr({
                    id: id
                }).add(this.defs);
            wrapper = innerR ?
                this.arc(x, y, r, innerR, 0, 2 * Math.PI).add(clipPath) :
                this.circle(x, y, r).add(clipPath);
            wrapper.id = id;
            wrapper.clipPath = clipPath;
            return wrapper;
        };
        addEvent(Chart, 'getAxes', function () {
            if (!this.pane) {
                this.pane = [];
            }
            this.options.pane = splat(this.options.pane);
            this.options.pane.forEach(function (paneOptions) {
                new Pane(// eslint-disable-line no-new
                paneOptions, this);
            }, this);
        });
        addEvent(Chart, 'afterDrawChartBox', function () {
            this.pane.forEach(function (pane) {
                pane.render();
            });
        });
        addEvent(Series, 'afterInit', function () {
            var chart = this.chart;
            // Add flags that identifies radial inverted series
            if (chart.inverted && chart.polar) {
                this.isRadialSeries = true;
                if (this.is('column')) {
                    this.isRadialBar = true;
                }
            }
        });
        /**
         * Extend chart.get to also search in panes. Used internally in
         * responsiveness and chart.update.
         * @private
         */
        wrap(Chart.prototype, 'get', function (proceed, id) {
            return find(this.pane || [], function (pane) {
                return pane.options.id === id;
            }) || proceed.call(this, id);
        });

    });
    _registerModule(_modules, 'masters/highcharts-more.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/RadialAxis.js'], _modules['Series/Bubble/BubbleSeries.js']], function (Highcharts, RadialAxis, BubbleSeries) {

        var G = Highcharts;
        RadialAxis.compose(G.Axis, G.Tick);
        BubbleSeries.compose(G.Chart, G.Legend, G.Series);

    });
}));