/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * Solid angular gauge module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/solid-gauge', ['highcharts', 'highcharts/highcharts-more'], function (Highcharts) {
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
    _registerModule(_modules, 'Core/Axis/Color/ColorAxisLike.js', [_modules['Core/Color/Color.js'], _modules['Core/Utilities.js']], function (Color, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var merge = U.merge;
        /* *
         *
         *  Namespace
         *
         * */
        var ColorAxisLike;
        (function (ColorAxisLike) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize defined data classes.
             * @private
             */
            function initDataClasses(userOptions) {
                var axis = this,
                    chart = axis.chart,
                    legendItem = axis.legendItem = axis.legendItem || {},
                    options = axis.options,
                    userDataClasses = userOptions.dataClasses || [];
                var dataClass,
                    dataClasses,
                    colorCount = chart.options.chart.colorCount,
                    colorCounter = 0,
                    colors;
                axis.dataClasses = dataClasses = [];
                legendItem.labels = [];
                for (var i = 0, iEnd = userDataClasses.length; i < iEnd; ++i) {
                    dataClass = userDataClasses[i];
                    dataClass = merge(dataClass);
                    dataClasses.push(dataClass);
                    if (!chart.styledMode && dataClass.color) {
                        continue;
                    }
                    if (options.dataClassColor === 'category') {
                        if (!chart.styledMode) {
                            colors = chart.options.colors || [];
                            colorCount = colors.length;
                            dataClass.color = colors[colorCounter];
                        }
                        dataClass.colorIndex = colorCounter;
                        // Loop back to zero
                        colorCounter++;
                        if (colorCounter === colorCount) {
                            colorCounter = 0;
                        }
                    }
                    else {
                        dataClass.color = color(options.minColor).tweenTo(color(options.maxColor), iEnd < 2 ? 0.5 : i / (iEnd - 1) // #3219
                        );
                    }
                }
            }
            ColorAxisLike.initDataClasses = initDataClasses;
            /**
             * Create initial color stops.
             * @private
             */
            function initStops() {
                var axis = this,
                    options = axis.options,
                    stops = axis.stops = options.stops || [
                        [0,
                    options.minColor || ''],
                        [1,
                    options.maxColor || '']
                    ];
                for (var i = 0, iEnd = stops.length; i < iEnd; ++i) {
                    stops[i].color = color(stops[i][1]);
                }
            }
            ColorAxisLike.initStops = initStops;
            /**
             * Normalize logarithmic values.
             * @private
             */
            function normalizedValue(value) {
                var axis = this,
                    max = axis.max || 0,
                    min = axis.min || 0;
                if (axis.logarithmic) {
                    value = axis.logarithmic.log2lin(value);
                }
                return 1 - ((max - value) /
                    ((max - min) || 1));
            }
            ColorAxisLike.normalizedValue = normalizedValue;
            /**
             * Translate from a value to a color.
             * @private
             */
            function toColor(value, point) {
                var axis = this;
                var dataClasses = axis.dataClasses;
                var stops = axis.stops;
                var pos,
                    from,
                    to,
                    color,
                    dataClass,
                    i;
                if (dataClasses) {
                    i = dataClasses.length;
                    while (i--) {
                        dataClass = dataClasses[i];
                        from = dataClass.from;
                        to = dataClass.to;
                        if ((typeof from === 'undefined' || value >= from) &&
                            (typeof to === 'undefined' || value <= to)) {
                            color = dataClass.color;
                            if (point) {
                                point.dataClass = i;
                                point.colorIndex = dataClass.colorIndex;
                            }
                            break;
                        }
                    }
                }
                else {
                    pos = axis.normalizedValue(value);
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
                    color = from.color.tweenTo(to.color, pos);
                }
                return color;
            }
            ColorAxisLike.toColor = toColor;
        })(ColorAxisLike || (ColorAxisLike = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ColorAxisLike;
    });
    _registerModule(_modules, 'Core/Axis/SolidGaugeAxis.js', [_modules['Core/Axis/Color/ColorAxisLike.js'], _modules['Core/Utilities.js']], function (ColorAxisLike, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function init(axis) {
            extend(axis, ColorAxisLike);
        }
        /* *
         *
         *  Default export
         *
         * */
        var SolidGaugeAxis = {
                init: init
            };

        return SolidGaugeAxis;
    });
    _registerModule(_modules, 'Series/SolidGauge/SolidGaugeSeriesDefaults.js', [], function () {
        /* *
         *
         *  Solid angular gauge module
         *
         *  (c) 2010-2021 Torstein Honsi
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
         * A solid gauge is a circular gauge where the value is indicated by a filled
         * arc, and the color of the arc may variate with the value.
         *
         * @sample highcharts/demo/gauge-solid/
         *         Solid gauges
         *
         * @extends      plotOptions.gauge
         * @excluding    dial, pivot, wrap
         * @product      highcharts
         * @requires     modules/solid-gauge
         * @optionparent plotOptions.solidgauge
         */
        var SolidGaugeSeriesDefaults = {
                /**
                 * The inner radius for points in a solid gauge. Can be given only in
                 * percentage, either as a number or a string like `"50%"`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
                 *         Individual radius and innerRadius
                 *
                 * @type      {string}
                 * @default   "60%"
                 * @since     4.1.6
                 * @product   highcharts
                 * @apioption plotOptions.solidgauge.innerRadius
                 */
                /**
                 * Whether the strokes of the solid gauge should be `round` or `square`.
                 *
                 * @sample {highcharts} highcharts/demo/gauge-multiple-kpi/
                 *         Rounded gauge
                 *
                 * @type       {string}
                 * @default    round
                 * @since      4.2.2
                 * @product    highcharts
                 * @validvalue ["square", "round"]
                 * @apioption  plotOptions.solidgauge.linecap
                 */
                /**
                 * Allow the gauge to overshoot the end of the perimeter axis by this
                 * many degrees. Say if the gauge axis goes from 0 to 60, a value of
                 * 100, or 1000, will show 5 degrees beyond the end of the axis when this
                 * option is set to 5.
                 *
                 * @type      {number}
                 * @default   0
                 * @since     3.0.10
                 * @product   highcharts
                 * @apioption plotOptions.solidgauge.overshoot
                 */
                /**
                 * The outer radius for points in a solid gauge. Can be given only in
                 * percentage, either as a number or a string like `"100%"`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
                 *         Individual radius and innerRadius
                 *
                 * @type      {string}
                 * @default   "100%"
                 * @since     4.1.6
                 * @product   highcharts
                 * @apioption plotOptions.solidgauge.radius
                 */
                /**
                 * Whether to draw rounded edges on the gauge. This options adds the radius
                 * of the rounding to the ends of the arc, so it extends past the actual
                 * values. When `borderRadius` is set, it takes precedence over `rounded`. A
                 * `borderRadius` of 50% behaves like `rounded`, except the shape is not
                 * extended past its value.
                 *
                 * @sample {highcharts} highcharts/demo/gauge-multiple-kpi/
                 *         Gauge showing multiple KPIs
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     5.0.8
                 * @product   highcharts
                 * @apioption plotOptions.solidgauge.rounded
                 */
                /**
                 * The threshold or base level for the gauge.
                 *
                 * @sample {highcharts} highcharts/plotoptions/solidgauge-threshold/
                 *         Zero threshold with negative and positive values
                 *
                 * @type      {number|null}
                 * @since     5.0.3
                 * @product   highcharts
                 * @apioption plotOptions.solidgauge.threshold
                 */
                /**
                 * Whether to give each point an individual color.
                 */
                colorByPoint: true,
                dataLabels: {
                    y: 0
                }
            };
        /**
         * A `solidgauge` series. If the [type](#series.solidgauge.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         *
         * @extends   series,plotOptions.solidgauge
         * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
         *            cropThreshold, dashStyle, dataParser, dataURL, dial,
         *            findNearestPointBy, getExtremesFromAll, marker, negativeColor,
         *            pointPlacement, pivot, shadow, softThreshold, stack, stacking,
         *            states, step, threshold, turboThreshold, wrap, zoneAxis, zones,
         *            dataSorting, boostBlending
         * @product   highcharts
         * @requires  modules/solid-gauge
         * @apioption series.solidgauge
         */
        /**
         * An array of data points for the series. For the `solidgauge` series
         * type, points can be given in the following ways:
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
         *    [turboThreshold](#series.solidgauge.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        y: 5,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        y: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
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
         * @extends   series.gauge.data
         * @product   highcharts
         * @apioption series.solidgauge.data
         */
        /**
         * The inner radius of an individual point in a solid gauge. Can be given only
         * in percentage, either as a number or a string like `"50%"`.
         *
         * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
         *         Individual radius and innerRadius
         *
         * @type      {string}
         * @since     4.1.6
         * @product   highcharts
         * @apioption series.solidgauge.data.innerRadius
         */
        /**
         * The outer radius of an individual point in a solid gauge. Can be
         * given only in percentage, either as a number or a string like `"100%"`.
         *
         * @sample {highcharts} highcharts/plotoptions/solidgauge-radius/
         *         Individual radius and innerRadius
         *
         * @type      {string}
         * @since     4.1.6
         * @product   highcharts
         * @apioption series.solidgauge.data.radius
         */
        ''; // keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return SolidGaugeSeriesDefaults;
    });
    _registerModule(_modules, 'Series/SolidGauge/SolidGaugeSeries.js', [_modules['Extensions/BorderRadius.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Axis/SolidGaugeAxis.js'], _modules['Series/SolidGauge/SolidGaugeSeriesDefaults.js'], _modules['Core/Utilities.js']], function (BorderRadius, SeriesRegistry, SolidGaugeAxis, SolidGaugeSeriesDefaults, U) {
        /* *
         *
         *  Solid angular gauge module
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
            GaugeSeries = _a.gauge,
            PieSeries = _a.pie;
        var clamp = U.clamp,
            extend = U.extend,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick,
            pInt = U.pInt;
        /* *
         *
         *  Class
         *
         * */
        /**
         * SolidGauge series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.solidgauge
         *
         * @augments Highcarts.Series
         */
        var SolidGaugeSeries = /** @class */ (function (_super) {
                __extends(SolidGaugeSeries, _super);
            function SolidGaugeSeries() {
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
                _this.points = void 0;
                _this.options = void 0;
                _this.axis = void 0;
                _this.yAxis = void 0;
                _this.startAngleRad = void 0;
                _this.thresholdAngleRad = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            // Extend the translate function to extend the Y axis with the necessary
            // decoration (#5895).
            SolidGaugeSeries.prototype.translate = function () {
                var axis = this.yAxis;
                SolidGaugeAxis.init(axis);
                // Prepare data classes
                if (!axis.dataClasses && axis.options.dataClasses) {
                    axis.initDataClasses(axis.options);
                }
                axis.initStops();
                // Generate points and inherit data label position
                GaugeSeries.prototype.translate.call(this);
            };
            // Draw the points where each point is one needle.
            SolidGaugeSeries.prototype.drawPoints = function () {
                var series = this,
                    yAxis = series.yAxis,
                    center = yAxis.center,
                    options = series.options,
                    renderer = series.chart.renderer,
                    overshoot = options.overshoot,
                    rounded = options.rounded && options.borderRadius === void 0,
                    overshootVal = isNumber(overshoot) ?
                        overshoot / 180 * Math.PI :
                        0;
                var thresholdAngleRad;
                // Handle the threshold option
                if (isNumber(options.threshold)) {
                    thresholdAngleRad = yAxis.startAngleRad + yAxis.translate(options.threshold, void 0, void 0, void 0, true);
                }
                this.thresholdAngleRad = pick(thresholdAngleRad, yAxis.startAngleRad);
                for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    // #10630 null point should not be draw
                    if (!point.isNull) { // condition like in pie chart
                        var radius = ((pInt(pick(point.options.radius, options.radius, 100 // %
                            )) * center[2]) / 200), innerRadius = ((pInt(pick(point.options.innerRadius, options.innerRadius, 60 // %
                            )) * center[2]) / 200), axisMinAngle = Math.min(yAxis.startAngleRad, yAxis.endAngleRad), axisMaxAngle = Math.max(yAxis.startAngleRad, yAxis.endAngleRad);
                        var graphic = point.graphic,
                            rotation = (yAxis.startAngleRad +
                                yAxis.translate(point.y,
                            void 0,
                            void 0,
                            void 0,
                            true)),
                            shapeArgs = void 0,
                            d = void 0,
                            toColor = yAxis.toColor(point.y,
                            point);
                        if (toColor === 'none') { // #3708
                            toColor = point.color || series.color || 'none';
                        }
                        if (toColor !== 'none') {
                            point.color = toColor;
                        }
                        // Handle overshoot and clipping to axis max/min
                        rotation = clamp(rotation, axisMinAngle - overshootVal, axisMaxAngle + overshootVal);
                        // Handle the wrap option
                        if (options.wrap === false) {
                            rotation = clamp(rotation, axisMinAngle, axisMaxAngle);
                        }
                        var angleOfRounding = rounded ?
                                ((radius - innerRadius) / 2) / radius :
                                0, start = Math.min(rotation, series.thresholdAngleRad) -
                                angleOfRounding;
                        var end = Math.max(rotation,
                            series.thresholdAngleRad) +
                                angleOfRounding;
                        if (end - start > 2 * Math.PI) {
                            end = start + 2 * Math.PI;
                        }
                        var borderRadius = rounded ? '50%' : 0;
                        if (options.borderRadius) {
                            borderRadius = BorderRadius.optionsToObject(options.borderRadius).radius;
                        }
                        point.shapeArgs = shapeArgs = {
                            x: center[0],
                            y: center[1],
                            r: radius,
                            innerR: innerRadius,
                            start: start,
                            end: end,
                            borderRadius: borderRadius
                        };
                        point.startR = radius; // For PieSeries.animate
                        if (graphic) {
                            d = shapeArgs.d;
                            graphic.animate(extend({ fill: toColor }, shapeArgs));
                            if (d) {
                                shapeArgs.d = d; // animate alters it
                            }
                        }
                        else {
                            point.graphic = graphic = renderer.arc(shapeArgs)
                                .attr({
                                fill: toColor,
                                'sweep-flag': 0
                            })
                                .add(series.group);
                        }
                        if (!series.chart.styledMode) {
                            if (options.linecap !== 'square') {
                                graphic.attr({
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round'
                                });
                            }
                            graphic.attr({
                                stroke: options.borderColor || 'none',
                                'stroke-width': options.borderWidth || 0
                            });
                        }
                        if (graphic) {
                            graphic.addClass(point.getClassName(), true);
                        }
                    }
                }
            };
            // Extend the pie slice animation by animating from start angle and up.
            SolidGaugeSeries.prototype.animate = function (init) {
                if (!init) {
                    this.startAngleRad = this.thresholdAngleRad;
                    PieSeries.prototype.animate.call(this, init);
                }
            };
            SolidGaugeSeries.defaultOptions = merge(GaugeSeries.defaultOptions, SolidGaugeSeriesDefaults);
            return SolidGaugeSeries;
        }(GaugeSeries));
        SeriesRegistry.registerSeriesType('solidgauge', SolidGaugeSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return SolidGaugeSeries;
    });
    _registerModule(_modules, 'masters/modules/solid-gauge.src.js', [], function () {


    });
}));