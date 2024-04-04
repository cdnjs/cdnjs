/**
 * @license Highcharts JS v11.4.1 (2024-04-04)
 *
 * Support for parallel coordinates in Highcharts
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/parallel-coordinates', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js', [], function () {
        /* *
         *
         *  Parallel coordinates module
         *
         *  (c) 2010-2024 Pawel Fus
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
         * @optionparent chart
         */
        const chartDefaults = {
            /**
             * Flag to render charts as a parallel coordinates plot. In a parallel
             * coordinates plot (||-coords) by default all required yAxes are generated
             * and the legend is disabled. This feature requires
             * `modules/parallel-coordinates.js`.
             *
             * @sample {highcharts} /highcharts/demo/parallel-coordinates/
             *         Parallel coordinates demo
             * @sample {highcharts} highcharts/parallel-coordinates/polar/
             *         Star plot, multivariate data in a polar chart
             *
             * @since    6.0.0
             * @product  highcharts
             * @requires modules/parallel-coordinates
             */
            parallelCoordinates: false,
            /**
             * Common options for all yAxes rendered in a parallel coordinates plot.
             * This feature requires `modules/parallel-coordinates.js`.
             *
             * The default options are:
             * ```js
             * parallelAxes: {
             *    lineWidth: 1,       // classic mode only
             *    gridlinesWidth: 0,  // classic mode only
             *    title: {
             *        text: '',
             *        reserveSpace: false
             *    },
             *    labels: {
             *        x: 0,
             *        y: 0,
             *        align: 'center',
             *        reserveSpace: false
             *    },
             *    offset: 0
             * }
             * ```
             *
             * @sample {highcharts} highcharts/parallel-coordinates/parallelaxes/
             *         Set the same tickAmount for all yAxes
             *
             * @extends   yAxis
             * @since     6.0.0
             * @product   highcharts
             * @excluding alternateGridColor, breaks, id, gridLineColor,
             *            gridLineDashStyle, gridLineWidth, minorGridLineColor,
             *            minorGridLineDashStyle, minorGridLineWidth, plotBands,
             *            plotLines, angle, gridLineInterpolation, maxColor, maxZoom,
             *            minColor, scrollbar, stackLabels, stops,
             * @requires  modules/parallel-coordinates
             */
            parallelAxes: {
                lineWidth: 1,
                /**
                 * Titles for yAxes are taken from
                 * [xAxis.categories](#xAxis.categories). All options for `xAxis.labels`
                 * applies to parallel coordinates titles. For example, to style
                 * categories, use [xAxis.labels.style](#xAxis.labels.style).
                 *
                 * @excluding align, enabled, margin, offset, position3d, reserveSpace,
                 *            rotation, skew3d, style, text, useHTML, x, y
                 */
                title: {
                    text: '',
                    reserveSpace: false
                },
                labels: {
                    x: 0,
                    y: 4,
                    align: 'center',
                    reserveSpace: false
                },
                offset: 0
            }
        };
        const xAxisDefaults = {
            lineWidth: 0,
            tickLength: 0,
            opposite: true,
            type: 'category'
        };
        /**
         * Parallel coordinates only. Format that will be used for point.y
         * and available in [tooltip.pointFormat](#tooltip.pointFormat) as
         * `{point.formattedValue}`. If not set, `{point.formattedValue}`
         * will use other options, in this order:
         *
         * 1. [yAxis.labels.format](#yAxis.labels.format) will be used if
         *    set
         *
         * 2. If yAxis is a category, then category name will be displayed
         *
         * 3. If yAxis is a datetime, then value will use the same format as
         *    yAxis labels
         *
         * 4. If yAxis is linear/logarithmic type, then simple value will be
         *    used
         *
         * @sample {highcharts}
         *         /highcharts/parallel-coordinates/tooltipvalueformat/
         *         Different tooltipValueFormats's
         *
         * @type      {string}
         * @default   undefined
         * @since     6.0.0
         * @product   highcharts
         * @requires  modules/parallel-coordinates
         * @apioption yAxis.tooltipValueFormat
         */
        ''; // Keeps doclets above separate in JS file
        /* *
         *
         *  Default Options
         *
         * */
        const ParallelCoordinatesDefaults = {
            chart: chartDefaults,
            xAxis: xAxisDefaults
        };

        return ParallelCoordinatesDefaults;
    });
    _registerModule(_modules, 'Extensions/ParallelCoordinates/ParallelAxis.js', [_modules['Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js'], _modules['Core/Utilities.js']], function (ParallelCoordinatesDefaults, U) {
        /* *
         *
         *  Parallel coordinates module
         *
         *  (c) 2010-2024 Pawel Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, arrayMax, arrayMin, isNumber, merge, pick, splat } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Support for parallel axes.
         * @private
         * @class
         */
        class ParallelAxisAdditions {
            /* *
             *
             *  Constructors
             *
             * */
            constructor(axis) {
                this.axis = axis;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set predefined left+width and top+height (inverted) for yAxes.
             * This method modifies options param.
             *
             * @private
             *
             * @param  {Array<string>} axisPosition
             * ['left', 'width', 'height', 'top'] or ['top', 'height', 'width', 'left']
             * for an inverted chart.
             *
             * @param  {Highcharts.AxisOptions} options
             * Axis options.
             */
            setPosition(axisPosition, options) {
                const parallel = this, axis = parallel.axis, chart = axis.chart, fraction = ((parallel.position || 0) + 0.5) /
                    (chart.parallelInfo.counter + 1);
                if (chart.polar) {
                    options.angle = 360 * fraction;
                }
                else {
                    options[axisPosition[0]] = 100 * fraction + '%';
                    axis[axisPosition[1]] = options[axisPosition[1]] = 0;
                    // In case of chart.update(inverted), remove old options:
                    axis[axisPosition[2]] = options[axisPosition[2]] = null;
                    axis[axisPosition[3]] = options[axisPosition[3]] = null;
                }
            }
        }
        /* *
         *
         *  Composition
         *
         * */
        var ParallelAxis;
        (function (ParallelAxis) {
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
             * Adds support for parallel axes.
             * @private
             */
            function compose(AxisClass) {
                if (!AxisClass.keepProps.includes('parallel')) {
                    const axisCompo = AxisClass;
                    // On update, keep parallel additions.
                    AxisClass.keepProps.push('parallel');
                    addEvent(axisCompo, 'init', onInit);
                    addEvent(axisCompo, 'afterSetOptions', onAfterSetOptions);
                    addEvent(axisCompo, 'getSeriesExtremes', onGetSeriesExtremes);
                }
            }
            ParallelAxis.compose = compose;
            /**
             * Update default options with predefined for a parallel coords.
             * @private
             */
            function onAfterSetOptions(e) {
                const axis = this, chart = axis.chart, parallelCoordinates = axis.parallelCoordinates;
                let axisPosition = [
                    'left', 'width', 'height', 'top'
                ];
                if (chart.hasParallelCoordinates) {
                    if (chart.inverted) {
                        axisPosition = axisPosition.reverse();
                    }
                    if (axis.isXAxis) {
                        axis.options = merge(axis.options, ParallelCoordinatesDefaults.xAxis, e.userOptions);
                    }
                    else {
                        const axisIndex = chart.yAxis.indexOf(axis); // #13608
                        axis.options = merge(axis.options, axis.chart.options.chart.parallelAxes, e.userOptions);
                        parallelCoordinates.position = pick(parallelCoordinates.position, axisIndex >= 0 ? axisIndex : chart.yAxis.length);
                        parallelCoordinates.setPosition(axisPosition, axis.options);
                    }
                }
            }
            /**
             * Each axis should gather extremes from points on a particular position in
             * series.data. Not like the default one, which gathers extremes from all
             * series bind to this axis. Consider using series.points instead of
             * series.yData.
             * @private
             */
            function onGetSeriesExtremes(e) {
                const axis = this;
                const chart = axis.chart;
                const parallelCoordinates = axis.parallelCoordinates;
                if (!parallelCoordinates) {
                    return;
                }
                if (chart && chart.hasParallelCoordinates && !axis.isXAxis) {
                    const index = parallelCoordinates.position;
                    let currentPoints = [];
                    axis.series.forEach(function (series) {
                        if (series.yData &&
                            series.visible &&
                            isNumber(index)) {
                            const y = series.yData[index];
                            // Take into account range series points as well (#15752)
                            currentPoints.push.apply(currentPoints, splat(y));
                        }
                    });
                    currentPoints = currentPoints.filter(isNumber);
                    axis.dataMin = arrayMin(currentPoints);
                    axis.dataMax = arrayMax(currentPoints);
                    e.preventDefault();
                }
            }
            /**
             * Add parallel addition
             * @private
             */
            function onInit() {
                const axis = this;
                if (!axis.parallelCoordinates) {
                    axis.parallelCoordinates = new ParallelAxisAdditions(axis);
                }
            }
        })(ParallelAxis || (ParallelAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ParallelAxis;
    });
    _registerModule(_modules, 'Extensions/ParallelCoordinates/ParallelSeries.js', [_modules['Core/Globals.js'], _modules['Core/Templating.js'], _modules['Core/Utilities.js']], function (H, T, U) {
        /* *
         *
         *  Parallel coordinates module
         *
         *  (c) 2010-2024 Pawel Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { format } = T;
        const { addEvent, defined, erase, extend, insertItem, isArray, isNumber, pick, pushUnique, wrap } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ParallelSeries;
        (function (ParallelSeries) {
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
            /** @private */
            function compose(SeriesClass) {
                if (pushUnique(composed, 'ParallelSeries')) {
                    const CompoClass = SeriesClass, { line: { prototype: { pointClass: LinePointClass } }, spline: { prototype: { pointClass: SplinePointClass } } } = SeriesClass.types;
                    addEvent(CompoClass, 'afterTranslate', onSeriesAfterTranslate, { order: 1 });
                    addEvent(CompoClass, 'bindAxes', onSeriesBindAxes);
                    addEvent(CompoClass, 'destroy', onSeriesDestroy);
                    if (LinePointClass) {
                        wrap(LinePointClass.prototype, 'getLabelConfig', wrapSeriesGetLabelConfig);
                    }
                    if (SplinePointClass) {
                        wrap(SplinePointClass.prototype, 'getLabelConfig', wrapSeriesGetLabelConfig);
                    }
                }
            }
            ParallelSeries.compose = compose;
            /**
             * Translate each point using corresponding yAxis.
             * @private
             */
            function onSeriesAfterTranslate() {
                const series = this, chart = this.chart, points = series.points, dataLength = points && points.length;
                let closestPointRangePx = Number.MAX_VALUE, lastPlotX, point;
                if (this.chart.hasParallelCoordinates) {
                    for (let i = 0; i < dataLength; i++) {
                        point = points[i];
                        if (defined(point.y)) {
                            if (chart.polar) {
                                point.plotX = chart.yAxis[i].angleRad || 0;
                            }
                            else if (chart.inverted) {
                                point.plotX = (chart.plotHeight -
                                    chart.yAxis[i].top +
                                    chart.plotTop);
                            }
                            else {
                                point.plotX = chart.yAxis[i].left - chart.plotLeft;
                            }
                            point.clientX = point.plotX;
                            point.plotY = chart.yAxis[i]
                                .translate(point.y, false, true, void 0, true);
                            // Range series (#15752)
                            if (isNumber(point.high)) {
                                point.plotHigh = chart.yAxis[i].translate(point.high, false, true, void 0, true);
                            }
                            if (typeof lastPlotX !== 'undefined') {
                                closestPointRangePx = Math.min(closestPointRangePx, Math.abs(point.plotX - lastPlotX));
                            }
                            lastPlotX = point.plotX;
                            point.isInside = chart.isInsidePlot(point.plotX, point.plotY, { inverted: chart.inverted });
                        }
                        else {
                            point.isNull = true;
                        }
                    }
                    this.closestPointRangePx = closestPointRangePx;
                }
            }
            /**
             * Bind each series to each yAxis. yAxis needs a reference to all series to
             * calculate extremes.
             * @private
             */
            function onSeriesBindAxes(e) {
                const series = this, chart = series.chart;
                if (chart.hasParallelCoordinates) {
                    const series = this;
                    for (const axis of chart.axes) {
                        insertItem(series, axis.series);
                        axis.isDirty = true;
                    }
                    series.xAxis = chart.xAxis[0];
                    series.yAxis = chart.yAxis[0];
                    e.preventDefault();
                }
            }
            /**
             * On destroy, we need to remove series from each `axis.series`.
             * @private
             */
            function onSeriesDestroy() {
                const series = this, chart = series.chart;
                if (chart.hasParallelCoordinates) {
                    for (const axis of (chart.axes || [])) {
                        if (axis && axis.series) {
                            erase(axis.series, series);
                            axis.isDirty = axis.forceRedraw = true;
                        }
                    }
                }
            }
            /**
             * @private
             */
            function wrapSeriesGetLabelConfig(proceed) {
                const chart = this.series && this.series.chart, config = proceed.apply(this, [].slice.call(arguments, 1));
                let formattedValue, yAxisOptions, labelFormat, yAxis;
                if (chart &&
                    chart.hasParallelCoordinates &&
                    !defined(config.formattedValue)) {
                    yAxis = chart.yAxis[this.x];
                    yAxisOptions = yAxis.options;
                    labelFormat = pick(yAxisOptions.tooltipValueFormat, yAxisOptions.labels.format);
                    if (labelFormat) {
                        formattedValue = format(labelFormat, extend(this, { value: this.y }), chart);
                    }
                    else if (yAxis.dateTime) {
                        formattedValue = chart.time.dateFormat(chart.time.resolveDTLFormat(yAxisOptions.dateTimeLabelFormats[yAxis.tickPositions.info.unitName]).main, this.y);
                    }
                    else if (isArray(yAxisOptions.categories)) {
                        formattedValue = yAxisOptions.categories[this.y];
                    }
                    else {
                        formattedValue = this.y;
                    }
                    config.formattedValue =
                        config.point.formattedValue = formattedValue;
                }
                return config;
            }
        })(ParallelSeries || (ParallelSeries = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ParallelSeries;
    });
    _registerModule(_modules, 'Extensions/ParallelCoordinates/ParallelCoordinates.js', [_modules['Extensions/ParallelCoordinates/ParallelAxis.js'], _modules['Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js'], _modules['Extensions/ParallelCoordinates/ParallelSeries.js'], _modules['Core/Utilities.js']], function (ParallelAxis, ParallelCoordinatesDefaults, ParallelSeries, U) {
        /* *
         *
         *  Parallel coordinates module
         *
         *  (c) 2010-2024 Pawel Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, defined, merge, splat } = U;
        /* *
         *
         *  Class
         *
         * */
        class ChartAdditions {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.chart = chart;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Define how many parellel axes we have according to the longest dataset.
             * This is quite heavy - loop over all series and check series.data.length
             * Consider:
             *
             * - make this an option, so user needs to set this to get better
             *   performance
             *
             * - check only first series for number of points and assume the rest is the
             *   same
             *
             * @private
             * @function Highcharts.Chart#setParallelInfo
             * @param {Highcharts.Options} options
             * User options
             * @requires modules/parallel-coordinates
             */
            setParallelInfo(options) {
                const chart = (this.chart ||
                    this), seriesOptions = options.series;
                chart.parallelInfo = {
                    counter: 0
                };
                for (const series of seriesOptions) {
                    if (series.data) {
                        chart.parallelInfo.counter = Math.max(chart.parallelInfo.counter, series.data.length - 1);
                    }
                }
            }
        }
        /* *
         *
         *  Composition
         *
         * */
        var ParallelCoordinates;
        (function (ParallelCoordinates) {
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
            /** @private */
            function compose(AxisClass, ChartClass, highchartsDefaultOptions, SeriesClass) {
                ParallelAxis.compose(AxisClass);
                ParallelSeries.compose(SeriesClass);
                const ChartCompo = ChartClass, addsProto = ChartAdditions.prototype, chartProto = ChartCompo.prototype;
                if (!chartProto.setParallelInfo) {
                    chartProto.setParallelInfo = addsProto.setParallelInfo;
                    addEvent(ChartCompo, 'init', onChartInit);
                    addEvent(ChartCompo, 'update', onChartUpdate);
                    merge(true, highchartsDefaultOptions.chart, ParallelCoordinatesDefaults.chart);
                }
            }
            ParallelCoordinates.compose = compose;
            /**
             * Initialize parallelCoordinates
             * @private
             */
            function onChartInit(e) {
                const chart = this, options = e.args[0], defaultYAxis = splat(options.yAxis || {}), newYAxes = [];
                let yAxisLength = defaultYAxis.length;
                /**
                 * Flag used in parallel coordinates plot to check if chart has
                 * ||-coords (parallel coords).
                 *
                 * @requires module:modules/parallel-coordinates
                 *
                 * @name Highcharts.Chart#hasParallelCoordinates
                 * @type {boolean}
                 */
                chart.hasParallelCoordinates = options.chart &&
                    options.chart.parallelCoordinates;
                if (chart.hasParallelCoordinates) {
                    chart.setParallelInfo(options);
                    // Push empty yAxes in case user did not define them:
                    for (; yAxisLength <= chart.parallelInfo.counter; yAxisLength++) {
                        newYAxes.push({});
                    }
                    if (!options.legend) {
                        options.legend = {};
                    }
                    if (options.legend &&
                        typeof options.legend.enabled === 'undefined') {
                        options.legend.enabled = false;
                    }
                    merge(true, options, 
                    // Disable boost
                    {
                        boost: {
                            seriesThreshold: Number.MAX_VALUE
                        },
                        plotOptions: {
                            series: {
                                boostThreshold: Number.MAX_VALUE
                            }
                        }
                    });
                    options.yAxis = defaultYAxis.concat(newYAxes);
                    options.xAxis = merge(ParallelCoordinatesDefaults.xAxis, // Docs
                    splat(options.xAxis || {})[0]);
                }
            }
            /**
             * Initialize parallelCoordinates
             * @private
             */
            function onChartUpdate(e) {
                const chart = this, options = e.options;
                if (options.chart) {
                    if (defined(options.chart.parallelCoordinates)) {
                        chart.hasParallelCoordinates =
                            options.chart.parallelCoordinates;
                    }
                    chart.options.chart.parallelAxes = merge(chart.options.chart.parallelAxes, options.chart.parallelAxes);
                }
                if (chart.hasParallelCoordinates) {
                    // (#10081)
                    if (options.series) {
                        chart.setParallelInfo(options);
                    }
                    for (const axis of chart.yAxis) {
                        axis.update({}, false);
                    }
                }
            }
        })(ParallelCoordinates || (ParallelCoordinates = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ParallelCoordinates;
    });
    _registerModule(_modules, 'masters/modules/parallel-coordinates.src.js', [_modules['Core/Globals.js'], _modules['Extensions/ParallelCoordinates/ParallelCoordinates.js']], function (Highcharts, ParallelCoordinates) {

        const G = Highcharts;
        ParallelCoordinates.compose(G.Axis, G.Chart, G.defaultOptions, G.Series);

        return Highcharts;
    });
}));