/**
 * @license Highcharts JS v11.4.8 (2024-08-29)
 *
 * Standalone navigator module
 *
 * (c) 2009-2024 Mateusz Bernacik
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/navigator', ['highcharts'], function (Highcharts) {
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
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Navigator/ChartNavigatorComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, merge, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        const composedMembers = [];
        /* *
         *
         *  Variables
         *
         * */
        let NavigatorConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, NavigatorClass) {
            if (U.pushUnique(composedMembers, ChartClass)) {
                const chartProto = ChartClass.prototype;
                NavigatorConstructor = NavigatorClass;
                chartProto.callbacks.push(onChartCallback);
                addEvent(ChartClass, 'afterAddSeries', onChartAfterAddSeries);
                addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
                addEvent(ChartClass, 'afterUpdate', onChartAfterUpdate);
                addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
                addEvent(ChartClass, 'beforeShowResetZoom', onChartBeforeShowResetZoom);
                addEvent(ChartClass, 'update', onChartUpdate);
            }
        }
        /**
         * Handle adding new series.
         * @private
         */
        function onChartAfterAddSeries() {
            if (this.navigator) {
                // Recompute which series should be shown in navigator, and add them
                this.navigator.setBaseSeries(null, false);
            }
        }
        /**
         * For stock charts, extend the Chart.setChartSize method so that we can set the
         * final top position of the navigator once the height of the chart, including
         * the legend, is determined. #367. We can't use Chart.getMargins, because
         * labels offsets are not calculated yet.
         * @private
         */
        function onChartAfterSetChartSize() {
            const legend = this.legend, navigator = this.navigator;
            let legendOptions, xAxis, yAxis;
            if (navigator) {
                legendOptions = legend && legend.options;
                xAxis = navigator.xAxis;
                yAxis = navigator.yAxis;
                const { scrollbarHeight, scrollButtonSize } = navigator;
                // Compute the top position
                if (this.inverted) {
                    navigator.left = navigator.opposite ?
                        this.chartWidth - scrollbarHeight -
                            navigator.height :
                        this.spacing[3] + scrollbarHeight;
                    navigator.top = this.plotTop + scrollButtonSize;
                }
                else {
                    navigator.left = pick(xAxis.left, this.plotLeft + scrollButtonSize);
                    navigator.top = navigator.navigatorOptions.top ||
                        this.chartHeight -
                            navigator.height -
                            scrollbarHeight -
                            (this.scrollbar?.options.margin || 0) -
                            this.spacing[2] -
                            (this.rangeSelector && this.extraBottomMargin ?
                                this.rangeSelector.getHeight() :
                                0) -
                            ((legendOptions &&
                                legendOptions.verticalAlign === 'bottom' &&
                                legendOptions.layout !== 'proximate' && // #13392
                                legendOptions.enabled &&
                                !legendOptions.floating) ?
                                legend.legendHeight +
                                    pick(legendOptions.margin, 10) :
                                0) -
                            (this.titleOffset ? this.titleOffset[2] : 0);
                }
                if (xAxis && yAxis) { // False if navigator is disabled (#904)
                    if (this.inverted) {
                        xAxis.options.left = yAxis.options.left = navigator.left;
                    }
                    else {
                        xAxis.options.top = yAxis.options.top = navigator.top;
                    }
                    xAxis.setAxisSize();
                    yAxis.setAxisSize();
                }
            }
        }
        /**
         * Initialize navigator, if no scrolling exists yet.
         * @private
         */
        function onChartAfterUpdate(event) {
            if (!this.navigator && !this.scroller &&
                (this.options.navigator.enabled ||
                    this.options.scrollbar.enabled)) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
                if (pick(event.redraw, true)) {
                    this.redraw(event.animation); // #7067
                }
            }
        }
        /**
         * Initialize navigator for stock charts
         * @private
         */
        function onChartBeforeRender() {
            const options = this.options;
            if (options.navigator.enabled ||
                options.scrollbar.enabled) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
            }
        }
        /**
         * For Stock charts. For x only zooming, do not to create the zoom button
         * because X axis zooming is already allowed by the Navigator and Range
         * selector. (#9285)
         * @private
         */
        function onChartBeforeShowResetZoom() {
            const chartOptions = this.options, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
            if (((navigator && navigator.enabled) ||
                (rangeSelector && rangeSelector.enabled)) &&
                ((!isTouchDevice &&
                    this.zooming.type === 'x') ||
                    (isTouchDevice && this.zooming.pinchType === 'x'))) {
                return false;
            }
        }
        /**
         * @private
         */
        function onChartCallback(chart) {
            const navigator = chart.navigator;
            // Initialize the navigator
            if (navigator && chart.xAxis[0]) {
                const extremes = chart.xAxis[0].getExtremes();
                navigator.render(extremes.min, extremes.max);
            }
        }
        /**
         * Merge options, if no scrolling exists yet
         * @private
         */
        function onChartUpdate(e) {
            const navigatorOptions = (e.options.navigator || {}), scrollbarOptions = (e.options.scrollbar || {});
            if (!this.navigator && !this.scroller &&
                (navigatorOptions.enabled || scrollbarOptions.enabled)) {
                merge(true, this.options.navigator, navigatorOptions);
                merge(true, this.options.scrollbar, scrollbarOptions);
                delete e.options.navigator;
                delete e.options.scrollbar;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const ChartNavigatorComposition = {
            compose
        };

        return ChartNavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/NavigatorAxisComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, correctFloat, defined, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function onAxisInit() {
            const axis = this;
            if (!axis.navigatorAxis) {
                axis.navigatorAxis = new NavigatorAxisAdditions(axis);
            }
        }
        /**
         * For Stock charts, override selection zooming with some special features
         * because X axis zooming is already allowed by the Navigator and Range
         * selector.
         * @private
         */
        function onAxisSetExtremes(e) {
            const axis = this, chart = axis.chart, chartOptions = chart.options, navigator = chartOptions.navigator, navigatorAxis = axis.navigatorAxis, pinchType = chart.zooming.pinchType, rangeSelector = chartOptions.rangeSelector, zoomType = chart.zooming.type;
            let zoomed;
            if (axis.isXAxis &&
                (navigator?.enabled || rangeSelector?.enabled)) {
                // For y only zooming, ignore the X axis completely
                if (zoomType === 'y' && e.trigger === 'zoom') {
                    zoomed = false;
                    // For xy zooming, record the state of the zoom before zoom selection,
                    // then when the reset button is pressed, revert to this state. This
                    // should apply only if the chart is initialized with a range (#6612),
                    // otherwise zoom all the way out.
                }
                else if (((e.trigger === 'zoom' && zoomType === 'xy') ||
                    (isTouchDevice && pinchType === 'xy')) &&
                    axis.options.range) {
                    const previousZoom = navigatorAxis.previousZoom;
                    // Minimum defined, zooming in
                    if (defined(e.min)) {
                        navigatorAxis.previousZoom = [axis.min, axis.max];
                        // Minimum undefined, resetting zoom
                    }
                    else if (previousZoom) {
                        e.min = previousZoom[0];
                        e.max = previousZoom[1];
                        navigatorAxis.previousZoom = void 0;
                    }
                }
            }
            if (typeof zoomed !== 'undefined') {
                e.preventDefault();
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         */
        class NavigatorAxisAdditions {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(AxisClass) {
                if (!AxisClass.keepProps.includes('navigatorAxis')) {
                    AxisClass.keepProps.push('navigatorAxis');
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'setExtremes', onAxisSetExtremes);
                }
            }
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
             * @private
             */
            destroy() {
                this.axis = void 0;
            }
            /**
             * Add logic to normalize the zoomed range in order to preserve the pressed
             * state of range selector buttons
             *
             * @private
             * @function Highcharts.Axis#toFixedRange
             */
            toFixedRange(pxMin, pxMax, fixedMin, fixedMax) {
                const axis = this.axis, halfPointRange = (axis.pointRange || 0) / 2;
                let newMin = pick(fixedMin, axis.translate(pxMin, true, !axis.horiz)), newMax = pick(fixedMax, axis.translate(pxMax, true, !axis.horiz));
                // Add/remove half point range to/from the extremes (#1172)
                if (!defined(fixedMin)) {
                    newMin = correctFloat(newMin + halfPointRange);
                }
                if (!defined(fixedMax)) {
                    newMax = correctFloat(newMax - halfPointRange);
                }
                if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
                    newMin = newMax = void 0;
                }
                return {
                    min: newMin,
                    max: newMax
                };
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return NavigatorAxisAdditions;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorDefaults.js', [_modules['Core/Color/Color.js'], _modules['Core/Series/SeriesRegistry.js']], function (Color, SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { parse: color } = Color;
        const { seriesTypes } = SeriesRegistry;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * The navigator is a small series below the main series, displaying
         * a view of the entire data set. It provides tools to zoom in and
         * out on parts of the data as well as panning across the dataset.
         *
         * @product      highstock gantt
         * @optionparent navigator
         */
        const NavigatorDefaults = {
            /**
             * Whether the navigator and scrollbar should adapt to updated data
             * in the base X axis. When loading data async, as in the demo below,
             * this should be `false`. Otherwise new data will trigger navigator
             * redraw, which will cause unwanted looping. In the demo below, the
             * data in the navigator is set only once. On navigating, only the main
             * chart content is updated.
             *
             * @sample {highstock} stock/demo/lazy-loading/
             *         Set to false with async data loading
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.adaptToUpdatedData
             */
            /**
             * An integer identifying the index to use for the base series, or a
             * string representing the id of the series.
             *
             * **Note**: As of Highcharts 5.0, this is now a deprecated option.
             * Prefer [series.showInNavigator](#plotOptions.series.showInNavigator).
             *
             * @see [series.showInNavigator](#plotOptions.series.showInNavigator)
             *
             * @deprecated
             * @type      {number|string}
             * @default   0
             * @apioption navigator.baseSeries
             */
            /**
             * Enable or disable the navigator.
             *
             * @sample {highstock} stock/navigator/enabled/
             *         Disable the navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.enabled
             */
            /**
             * When the chart is inverted, whether to draw the navigator on the
             * opposite side.
             *
             * @type      {boolean}
             * @default   false
             * @since     5.0.8
             * @apioption navigator.opposite
             */
            /**
             * The height of the navigator.
             *
             * @sample {highstock} stock/navigator/height/
             *         A higher navigator
             */
            height: 40,
            /**
             * The distance from the nearest element, the X axis or X axis labels.
             *
             * @sample {highstock} stock/navigator/margin/
             *         A margin of 2 draws the navigator closer to the X axis labels
             */
            margin: 25,
            /**
             * Whether the mask should be inside the range marking the zoomed
             * range, or outside. In Highcharts Stock 1.x it was always `false`.
             *
             * @sample {highstock} stock/demo/maskinside-false/
             *         False, mask outside
             *
             * @since   2.0
             */
            maskInside: true,
            /**
             * Options for the handles for dragging the zoomed area.
             *
             * @sample {highstock} stock/navigator/handles/
             *         Colored handles
             */
            handles: {
                /**
                 * Width for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                width: 7,
                /**
                 * Border radius of the handles.
                 *
                 * @sample {highstock} stock/navigator/handles-border-radius/
                 *      Border radius on the navigator handles.
                 *
                 * @since 11.4.2
                 */
                borderRadius: 0,
                /**
                 * Height for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                height: 15,
                /**
                 * Array to define shapes of handles. 0-index for left, 1-index for
                 * right.
                 *
                 * Additionally, the URL to a graphic can be given on this form:
                 * `url(graphic.png)`. Note that for the image to be applied to
                 * exported charts, its URL needs to be accessible by the export
                 * server.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @type    {Array<string>}
                 * @default ["navigator-handle", "navigator-handle"]
                 * @since   6.0.0
                 */
                symbols: ['navigator-handle', 'navigator-handle'],
                /**
                 * Allows to enable/disable handles.
                 *
                 * @since   6.0.0
                 */
                enabled: true,
                /**
                 * The width for the handle border and the stripes inside.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since     6.0.0
                 * @apioption navigator.handles.lineWidth
                 */
                lineWidth: 1,
                /**
                 * The fill for the handle.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#f2f2f2" /* Palette.neutralColor5 */,
                /**
                 * The stroke for the handle border and the stripes inside.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */
            },
            /**
             * The color of the mask covering the areas of the navigator series
             * that are currently not visible in the main series. The default
             * color is bluish with an opacity of 0.3 to see the series below.
             *
             * @see In styled mode, the mask is styled with the
             *      `.highcharts-navigator-mask` and
             *      `.highcharts-navigator-mask-inside` classes.
             *
             * @sample {highstock} stock/navigator/maskfill/
             *         Blue, semi transparent mask
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default rgba(102,133,194,0.3)
             */
            maskFill: color("#667aff" /* Palette.highlightColor60 */).setOpacity(0.3).get(),
            /**
             * The color of the line marking the currently zoomed area in the
             * navigator.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #cccccc
             */
            outlineColor: "#999999" /* Palette.neutralColor40 */,
            /**
             * The width of the line marking the currently zoomed area in the
             * navigator.
             *
             * @see In styled mode, the outline stroke width is set with the
             *      `.highcharts-navigator-outline` class.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {number}
             */
            outlineWidth: 1,
            /**
             * Options for the navigator series. Available options are the same
             * as any series, documented at [plotOptions](#plotOptions.series)
             * and [series](#series).
             *
             * Unless data is explicitly defined on navigator.series, the data
             * is borrowed from the first series in the chart.
             *
             * Default series options for the navigator series are:
             * ```js
             * series: {
             *     type: 'areaspline',
             *     fillOpacity: 0.05,
             *     dataGrouping: {
             *         smoothed: true
             *     },
             *     lineWidth: 1,
             *     marker: {
             *         enabled: false
             *     }
             * }
             * ```
             *
             * @see In styled mode, the navigator series is styled with the
             *      `.highcharts-navigator-series` class.
             *
             * @sample {highstock} stock/navigator/series-data/
             *         Using a separate data set for the navigator
             * @sample {highstock} stock/navigator/series/
             *         A green navigator series
             *
             * @type {*|Array<*>|Highcharts.SeriesOptionsType|Array<Highcharts.SeriesOptionsType>}
             */
            series: {
                /**
                 * The type of the navigator series.
                 *
                 * Heads up:
                 * In column-type navigator, zooming is limited to at least one
                 * point with its `pointRange`.
                 *
                 * @sample {highstock} stock/navigator/column/
                 *         Column type navigator
                 *
                 * @type    {string}
                 * @default {highstock} `areaspline` if defined, otherwise `line`
                 * @default {gantt} gantt
                 */
                type: (typeof seriesTypes.areaspline === 'undefined' ?
                    'line' :
                    'areaspline'),
                /**
                 * The fill opacity of the navigator series.
                 */
                fillOpacity: 0.05,
                /**
                 * The pixel line width of the navigator series.
                 */
                lineWidth: 1,
                /**
                 * @ignore-option
                 */
                compare: null,
                /**
                 * @ignore-option
                 */
                sonification: {
                    enabled: false
                },
                /**
                 * Unless data is explicitly defined, the data is borrowed from the
                 * first series in the chart.
                 *
                 * @type      {Array<number|Array<number|string|null>|object|null>}
                 * @product   highstock
                 * @apioption navigator.series.data
                 */
                /**
                 * Data grouping options for the navigator series.
                 *
                 * @extends plotOptions.series.dataGrouping
                 */
                dataGrouping: {
                    approximation: 'average',
                    enabled: true,
                    groupPixelWidth: 2,
                    // Replace smoothed property by anchors, #12455.
                    firstAnchor: 'firstPoint',
                    anchor: 'middle',
                    lastAnchor: 'lastPoint',
                    // Day and week differs from plotOptions.series.dataGrouping
                    units: [
                        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ['second', [1, 2, 5, 10, 15, 30]],
                        ['minute', [1, 2, 5, 10, 15, 30]],
                        ['hour', [1, 2, 3, 4, 6, 8, 12]],
                        ['day', [1, 2, 3, 4]],
                        ['week', [1, 2, 3]],
                        ['month', [1, 3, 6]],
                        ['year', null]
                    ]
                },
                /**
                 * Data label options for the navigator series. Data labels are
                 * disabled by default on the navigator series.
                 *
                 * @extends plotOptions.series.dataLabels
                 */
                dataLabels: {
                    enabled: false,
                    zIndex: 2 // #1839
                },
                id: 'highcharts-navigator-series',
                className: 'highcharts-navigator-series',
                /**
                 * Sets the fill color of the navigator series.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption navigator.series.color
                 */
                /**
                 * Line color for the navigator series. Allows setting the color
                 * while disallowing the default candlestick setting.
                 *
                 * @type {Highcharts.ColorString|null}
                 */
                lineColor: null, // #4602
                marker: {
                    enabled: false
                },
                /**
                 * Since Highcharts Stock v8, default value is the same as default
                 * `pointRange` defined for a specific type (e.g. `null` for
                 * column type).
                 *
                 * In Highcharts Stock version < 8, defaults to 0.
                 *
                 * @extends plotOptions.series.pointRange
                 * @type {number|null}
                 * @apioption navigator.series.pointRange
                 */
                /**
                 * The threshold option. Setting it to 0 will make the default
                 * navigator area series draw its area from the 0 value and up.
                 *
                 * @type {number|null}
                 */
                threshold: null
            },
            /**
             * Enable or disable navigator sticking to right, while adding new
             * points. If `undefined`, the navigator sticks to the axis maximum only
             * if it was already at the maximum prior to adding points.
             *
             * @type      {boolean}
             * @default   undefined
             * @since 10.2.1
             * @sample {highstock} stock/navigator/sticktomax-false/
             * stickToMax set to false
             * @apioption navigator.stickToMax
             */
            /**
             * Options for the navigator X axis. Default series options for the
             * navigator xAxis are:
             * ```js
             * xAxis: {
             *     tickWidth: 0,
             *     lineWidth: 0,
             *     gridLineWidth: 1,
             *     tickPixelInterval: 200,
             *     labels: {
             *            align: 'left',
             *         style: {
             *             color: '#888'
             *         },
             *         x: 3,
             *         y: -4
             *     }
             * }
             * ```
             *
             * @extends   xAxis
             * @excluding linkedTo, maxZoom, minRange, opposite, range, scrollbar,
             *            showEmpty, maxRange
             */
            xAxis: {
                /**
                 * Additional range on the right side of the xAxis. Works similar to
                 * `xAxis.maxPadding`, but the value is set in terms of axis values,
                 * percentage or pixels.
                 *
                 * If it's a number, it is interpreted as axis values, which in a
                 * datetime axis equals milliseconds.
                 *
                 * If it's a percentage string, is interpreted as percentages of the
                 * axis length. An overscroll of 50% will make a 100px axis 50px longer.
                 *
                 * If it's a pixel string, it is interpreted as a fixed pixel value, but
                 * limited to 90% of the axis length.
                 *
                 * If it's undefined, the value is inherited from `xAxis.overscroll`.
                 *
                 * Can be set for both, main xAxis and navigator's xAxis.
                 *
                 * @type    {number | string | undefined}
                 * @since   6.0.0
                 * @apioption navigator.xAxis.overscroll
                 */
                className: 'highcharts-navigator-xaxis',
                tickLength: 0,
                lineWidth: 0,
                gridLineColor: "#e6e6e6" /* Palette.neutralColor10 */,
                id: 'navigator-x-axis',
                gridLineWidth: 1,
                tickPixelInterval: 200,
                labels: {
                    align: 'left',
                    /**
                     * @type {Highcharts.CSSObject}
                     */
                    style: {
                        /** @ignore */
                        color: "#000000" /* Palette.neutralColor100 */,
                        /** @ignore */
                        fontSize: '0.7em',
                        /** @ignore */
                        opacity: 0.6,
                        /** @ignore */
                        textOutline: '2px contrast'
                    },
                    x: 3,
                    y: -4
                },
                crosshair: false
            },
            /**
             * Options for the navigator Y axis. Default series options for the
             * navigator yAxis are:
             * ```js
             * yAxis: {
             *     gridLineWidth: 0,
             *     startOnTick: false,
             *     endOnTick: false,
             *     minPadding: 0.1,
             *     maxPadding: 0.1,
             *     labels: {
             *         enabled: false
             *     },
             *     title: {
             *         text: null
             *     },
             *     tickWidth: 0
             * }
             * ```
             *
             * @extends   yAxis
             * @excluding height, linkedTo, maxZoom, minRange, ordinal, range,
             *            showEmpty, scrollbar, top, units, maxRange, minLength,
             *            maxLength, resize
             */
            yAxis: {
                className: 'highcharts-navigator-yaxis',
                gridLineWidth: 0,
                startOnTick: false,
                endOnTick: false,
                minPadding: 0.1,
                id: 'navigator-y-axis',
                maxPadding: 0.1,
                labels: {
                    enabled: false
                },
                crosshair: false,
                title: {
                    text: null
                },
                tickLength: 0,
                tickWidth: 0
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Maximum range which can be set using the navigator's handles.
         * Opposite of [xAxis.minRange](#xAxis.minRange).
         *
         * @sample {highstock} stock/navigator/maxrange/
         *         Defined max and min range
         *
         * @type      {number}
         * @since     6.0.0
         * @product   highstock gantt
         * @apioption xAxis.maxRange
         */
        (''); // Keeps doclets above in JS file

        return NavigatorDefaults;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorSymbols.js', [_modules['Core/Renderer/SVG/Symbols.js'], _modules['Core/Utilities.js']], function (rect, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { relativeLength } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Draw one of the handles on the side of the zoomed range in the navigator.
         * @private
         */
        function navigatorHandle(_x, _y, width, height, options = {}) {
            const halfWidth = options.width ? options.width / 2 : width, markerPosition = 1.5, r = relativeLength(options.borderRadius || 0, Math.min(halfWidth * 2, height));
            height = options.height || height;
            return [
                ['M', -markerPosition, height / 2 - 3.5],
                ['L', -markerPosition, height / 2 + 4.5],
                ['M', markerPosition - 1, height / 2 - 3.5],
                ['L', markerPosition - 1, height / 2 + 4.5],
                ...rect.rect(-halfWidth - 1, 0.5, halfWidth * 2 + 1, height, { r })
            ];
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorSymbols = {
            'navigator-handle': navigatorHandle
        };

        return NavigatorSymbols;
    });
    _registerModule(_modules, 'Stock/Utilities/StockUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Sets the chart.fixedRange to the specified value. If the value is larger
         * than actual range, sets it to the maximum possible range. (#20327)
         *
         * @private
         * @function Highcharts.StockChart#setFixedRange
         * @param {number|undefined} range
         *        Range to set in axis units.
         */
        function setFixedRange(range) {
            const xAxis = this.xAxis[0];
            if (defined(xAxis.dataMax) &&
                defined(xAxis.dataMin) &&
                range) {
                this.fixedRange = Math.min(range, xAxis.dataMax - xAxis.dataMin);
            }
            else {
                this.fixedRange = range;
            }
        }
        const StockUtilities = {
            setFixedRange
        };

        return StockUtilities;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorComposition.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorDefaults.js'], _modules['Stock/Navigator/NavigatorSymbols.js'], _modules['Core/Renderer/RendererRegistry.js'], _modules['Stock/Utilities/StockUtilities.js'], _modules['Core/Utilities.js']], function (D, H, NavigatorAxisAdditions, NavigatorDefaults, NavigatorSymbols, RendererRegistry, StockUtilities, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { composed } = H;
        const { getRendererType } = RendererRegistry;
        const { setFixedRange } = StockUtilities;
        const { addEvent, extend, pushUnique } = U;
        /* *
         *
         *  Variables
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, AxisClass, SeriesClass) {
            NavigatorAxisAdditions.compose(AxisClass);
            if (pushUnique(composed, 'Navigator')) {
                ChartClass.prototype.setFixedRange = setFixedRange;
                extend(getRendererType().prototype.symbols, NavigatorSymbols);
                addEvent(SeriesClass, 'afterUpdate', onSeriesAfterUpdate);
                setOptions({ navigator: NavigatorDefaults });
            }
        }
        /**
         * Handle updating series
         * @private
         */
        function onSeriesAfterUpdate() {
            if (this.chart.navigator && !this.options.isInternal) {
                this.chart.navigator.setBaseSeries(null, false);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorComposition = {
            compose
        };

        return NavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/ScrollbarAxis.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, defined, pick, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ScrollbarAxis;
        (function (ScrollbarAxis) {
            /* *
             *
             *  Variables
             *
             * */
            let Scrollbar;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Attaches to axis events to create scrollbars if enabled.
             *
             * @private
             *
             * @param {Highcharts.Axis} AxisClass
             * Axis class to extend.
             *
             * @param {Highcharts.Scrollbar} ScrollbarClass
             * Scrollbar class to use.
             */
            function compose(AxisClass, ScrollbarClass) {
                if (pushUnique(composed, 'Axis.Scrollbar')) {
                    Scrollbar = ScrollbarClass;
                    addEvent(AxisClass, 'afterGetOffset', onAxisAfterGetOffset);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'afterRender', onAxisAfterRender);
                }
            }
            ScrollbarAxis.compose = compose;
            /** @private */
            function getExtremes(axis) {
                const axisMin = pick(axis.options && axis.options.min, axis.min);
                const axisMax = pick(axis.options && axis.options.max, axis.max);
                return {
                    axisMin,
                    axisMax,
                    scrollMin: defined(axis.dataMin) ?
                        Math.min(axisMin, axis.min, axis.dataMin, pick(axis.threshold, Infinity)) : axisMin,
                    scrollMax: defined(axis.dataMax) ?
                        Math.max(axisMax, axis.max, axis.dataMax, pick(axis.threshold, -Infinity)) : axisMax
                };
            }
            /**
             * Make space for a scrollbar.
             * @private
             */
            function onAxisAfterGetOffset() {
                const axis = this, scrollbar = axis.scrollbar, opposite = scrollbar && !scrollbar.options.opposite, index = axis.horiz ? 2 : opposite ? 3 : 1;
                if (scrollbar) {
                    // Reset scrollbars offsets
                    axis.chart.scrollbarsOffsets = [0, 0];
                    axis.chart.axisOffset[index] +=
                        scrollbar.size + (scrollbar.options.margin || 0);
                }
            }
            /**
             * Wrap axis initialization and create scrollbar if enabled.
             * @private
             */
            function onAxisAfterInit() {
                const axis = this;
                if (axis.options &&
                    axis.options.scrollbar &&
                    axis.options.scrollbar.enabled) {
                    // Predefined options:
                    axis.options.scrollbar.vertical = !axis.horiz;
                    axis.options.startOnTick = axis.options.endOnTick = false;
                    axis.scrollbar = new Scrollbar(axis.chart.renderer, axis.options.scrollbar, axis.chart);
                    addEvent(axis.scrollbar, 'changed', function (e) {
                        const { axisMin, axisMax, scrollMin: unitedMin, scrollMax: unitedMax } = getExtremes(axis), range = unitedMax - unitedMin;
                        let to, from;
                        // #12834, scroll when show/hide series, wrong extremes
                        if (!defined(axisMin) || !defined(axisMax)) {
                            return;
                        }
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            to = unitedMin + range * this.to;
                            from = unitedMin + range * this.from;
                        }
                        else {
                            // Y-values in browser are reversed, but this also
                            // applies for reversed horizontal axis:
                            to = unitedMin + range * (1 - this.from);
                            from = unitedMin + range * (1 - this.to);
                        }
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            // #17977, set animation to undefined instead of true
                            const animate = e.DOMType === 'mousemove' ||
                                e.DOMType === 'touchmove' ? false : void 0;
                            axis.setExtremes(from, to, true, animate, e);
                        }
                        else {
                            // When live redraw is disabled, don't change extremes
                            // Only change the position of the scrollbar thumb
                            this.setRange(this.from, this.to);
                        }
                    });
                }
            }
            /**
             * Wrap rendering axis, and update scrollbar if one is created.
             * @private
             */
            function onAxisAfterRender() {
                const axis = this, { scrollMin, scrollMax } = getExtremes(axis), scrollbar = axis.scrollbar, offset = (axis.axisTitleMargin + (axis.titleOffset || 0)), scrollbarsOffsets = axis.chart.scrollbarsOffsets, axisMargin = axis.options.margin || 0;
                let offsetsIndex, from, to;
                if (scrollbar && scrollbarsOffsets) {
                    if (axis.horiz) {
                        // Reserve space for labels/title
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += offset;
                        }
                        scrollbar.position(axis.left, (axis.top +
                            axis.height +
                            2 +
                            scrollbarsOffsets[1] -
                            (axis.opposite ? axisMargin : 0)), axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += axisMargin;
                        }
                        offsetsIndex = 1;
                    }
                    else {
                        // Reserve space for labels/title
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += offset;
                        }
                        let xPosition;
                        if (!scrollbar.options.opposite) {
                            xPosition = axis.opposite ? 0 : axisMargin;
                        }
                        else {
                            xPosition = axis.left +
                                axis.width +
                                2 +
                                scrollbarsOffsets[0] -
                                (axis.opposite ? 0 : axisMargin);
                        }
                        scrollbar.position(xPosition, axis.top, axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += axisMargin;
                        }
                        offsetsIndex = 0;
                    }
                    scrollbarsOffsets[offsetsIndex] += scrollbar.size +
                        (scrollbar.options.margin || 0);
                    if (isNaN(scrollMin) ||
                        isNaN(scrollMax) ||
                        !defined(axis.min) ||
                        !defined(axis.max) ||
                        axis.dataMin === axis.dataMax // #10733
                    ) {
                        // Default action: when data extremes are the same or there is
                        // not extremes on the axis, but scrollbar exists, make it
                        // full size
                        scrollbar.setRange(0, 1);
                    }
                    else if (axis.min === axis.max) { // #20359
                        // When the extremes are the same, set the scrollbar to a point
                        // within the extremes range. Utilize pointRange to perform the
                        // calculations. (#20359)
                        const interval = axis.pointRange / (axis.dataMax +
                            1);
                        from = interval * axis.min;
                        to = interval * (axis.max + 1);
                        scrollbar.setRange(from, to);
                    }
                    else {
                        from = ((axis.min - scrollMin) /
                            (scrollMax - scrollMin));
                        to = ((axis.max - scrollMin) /
                            (scrollMax - scrollMin));
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            scrollbar.setRange(from, to);
                        }
                        else {
                            // Inverse vertical axis
                            scrollbar.setRange(1 - to, 1 - from);
                        }
                    }
                }
            }
        })(ScrollbarAxis || (ScrollbarAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarAxis;
    });
    _registerModule(_modules, 'Stock/Scrollbar/ScrollbarDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constant
         *
         * */
        /**
         *
         * The scrollbar is a means of panning over the X axis of a stock chart.
         * Scrollbars can also be applied to other types of axes.
         *
         * Another approach to scrollable charts is the [chart.scrollablePlotArea](
         * https://api.highcharts.com/highcharts/chart.scrollablePlotArea) option that
         * is especially suitable for simpler cartesian charts on mobile.
         *
         * In styled mode, all the presentational options for the
         * scrollbar are replaced by the classes `.highcharts-scrollbar-thumb`,
         * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
         * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
         *
         * @sample stock/yaxis/inverted-bar-scrollbar/
         *         A scrollbar on a simple bar chart
         *
         * @product highstock gantt
         * @optionparent scrollbar
         *
         * @private
         */
        const ScrollbarDefaults = {
            /**
             * The height of the scrollbar. If `buttonsEnabled` is true , the height
             * also applies to the width of the scroll arrows so that they are always
             * squares.
             *
             * @sample stock/scrollbar/style/
             *         Non-default height
             *
             * @type    {number}
             */
            height: 10,
            /**
             * The border rounding radius of the bar.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderRadius: 5,
            /**
             * The corner radius of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderRadius: 0,
            /**
             * Enable or disable the buttons at the end of the scrollbar.
             *
             * @since 11.0.0
             */
            buttonsEnabled: false,
            /**
             * Enable or disable the scrollbar.
             *
             * @sample stock/scrollbar/enabled/
             *         Disable the scrollbar, only use navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.enabled
             */
            /**
             * Whether to redraw the main chart as the scrollbar or the navigator
             * zoomed window is moved. Defaults to `true` for modern browsers and
             * `false` for legacy IE browsers as well as mobile devices.
             *
             * @sample stock/scrollbar/liveredraw
             *         Setting live redraw to false
             *
             * @type  {boolean}
             * @since 1.3
             */
            liveRedraw: void 0,
            /**
             * The margin between the scrollbar and its axis when the scrollbar is
             * applied directly to an axis, or the navigator in case that is enabled.
             * Defaults to 10 for axis, 0 for navigator.
             *
             * @type {number|undefined}
             */
            margin: void 0,
            /**
             * The minimum width of the scrollbar.
             *
             * @since 1.2.5
             */
            minWidth: 6,
            /** @ignore-option */
            opposite: true,
            /**
             * Whether to show or hide the scrollbar when the scrolled content is
             * zoomed out to it full extent.
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.showFull
             */
            step: 0.2,
            /**
             * The z index of the scrollbar group.
             */
            zIndex: 3,
            /**
             * The background color of the scrollbar itself.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBackgroundColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The width of the bar's border.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderWidth: 0,
            /**
             * The color of the scrollbar's border.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The color of the small arrow inside the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonArrowColor: "#333333" /* Palette.neutralColor80 */,
            /**
             * The color of scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBackgroundColor: "#e6e6e6" /* Palette.neutralColor10 */,
            /**
             * The color of the border of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The border width of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderWidth: 1,
            /**
             * The color of the small rifles in the middle of the scrollbar.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            rifleColor: 'none',
            /**
             * The color of the track background.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBackgroundColor: 'rgba(255, 255, 255, 0.001)', // #18922
            /**
             * The color of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The corner radius of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderRadius: 5,
            /**
             * The width of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderWidth: 1
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarDefaults;
    });
    _registerModule(_modules, 'Stock/Scrollbar/Scrollbar.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/ScrollbarAxis.js'], _modules['Stock/Scrollbar/ScrollbarDefaults.js'], _modules['Core/Utilities.js']], function (D, H, ScrollbarAxis, ScrollbarDefaults, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { addEvent, correctFloat, crisp, defined, destroyObjectProperties, fireEvent, merge, pick, removeEvent } = U;
        /* *
         *
         *  Constants
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A reusable scrollbar, internally used in Highcharts Stock's
         * navigator and optionally on individual axes.
         *
         * @private
         * @class
         * @name Highcharts.Scrollbar
         * @param {Highcharts.SVGRenderer} renderer
         * @param {Highcharts.ScrollbarOptions} options
         * @param {Highcharts.Chart} chart
         */
        class Scrollbar {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(AxisClass) {
                ScrollbarAxis.compose(AxisClass, Scrollbar);
            }
            /**
             * When we have vertical scrollbar, rifles and arrow in buttons should be
             * rotated. The same method is used in Navigator's handles, to rotate them.
             *
             * @function Highcharts.swapXY
             *
             * @param {Highcharts.SVGPathArray} path
             * Path to be rotated.
             *
             * @param {boolean} [vertical]
             * If vertical scrollbar, swap x-y values.
             *
             * @return {Highcharts.SVGPathArray}
             * Rotated path.
             *
             * @requires modules/stock
             */
            static swapXY(path, vertical) {
                if (vertical) {
                    path.forEach((seg) => {
                        const len = seg.length;
                        let temp;
                        for (let i = 0; i < len; i += 2) {
                            temp = seg[i + 1];
                            if (typeof temp === 'number') {
                                seg[i + 1] = seg[i + 2];
                                seg[i + 2] = temp;
                            }
                        }
                    });
                }
                return path;
            }
            /* *
             *
             *  Constructors
             *
             * */
            constructor(renderer, options, chart) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this._events = [];
                this.chartX = 0;
                this.chartY = 0;
                this.from = 0;
                this.scrollbarButtons = [];
                this.scrollbarLeft = 0;
                this.scrollbarStrokeWidth = 1;
                this.scrollbarTop = 0;
                this.size = 0;
                this.to = 0;
                this.trackBorderWidth = 1;
                this.x = 0;
                this.y = 0;
                this.init(renderer, options, chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set up the mouse and touch events for the Scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#addEvents
             */
            addEvents() {
                const buttonsOrder = this.options.inverted ? [1, 0] : [0, 1], buttons = this.scrollbarButtons, bar = this.scrollbarGroup.element, track = this.track.element, mouseDownHandler = this.mouseDownHandler.bind(this), mouseMoveHandler = this.mouseMoveHandler.bind(this), mouseUpHandler = this.mouseUpHandler.bind(this);
                const _events = [
                    // Mouse events
                    [
                        buttons[buttonsOrder[0]].element,
                        'click',
                        this.buttonToMinClick.bind(this)
                    ],
                    [
                        buttons[buttonsOrder[1]].element,
                        'click',
                        this.buttonToMaxClick.bind(this)
                    ],
                    [track, 'click', this.trackClick.bind(this)],
                    [bar, 'mousedown', mouseDownHandler],
                    [bar.ownerDocument, 'mousemove', mouseMoveHandler],
                    [bar.ownerDocument, 'mouseup', mouseUpHandler],
                    // Touch events
                    [bar, 'touchstart', mouseDownHandler],
                    [bar.ownerDocument, 'touchmove', mouseMoveHandler],
                    [bar.ownerDocument, 'touchend', mouseUpHandler]
                ];
                // Add them all
                _events.forEach(function (args) {
                    addEvent.apply(null, args);
                });
                this._events = _events;
            }
            buttonToMaxClick(e) {
                const scroller = this;
                const range = ((scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2));
                scroller.updatePosition(scroller.from + range, scroller.to + range);
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            buttonToMinClick(e) {
                const scroller = this;
                const range = correctFloat(scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2);
                scroller.updatePosition(correctFloat(scroller.from - range), correctFloat(scroller.to - range));
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Get normalized (0-1) cursor position over the scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#cursorToScrollbarPosition
             *
             * @param  {*} normalizedEvent
             *         normalized event, with chartX and chartY values
             *
             * @return {Highcharts.Dictionary<number>}
             *         Local position {chartX, chartY}
             */
            cursorToScrollbarPosition(normalizedEvent) {
                const scroller = this, options = scroller.options, minWidthDifference = options.minWidth > scroller.calculatedWidth ?
                    options.minWidth :
                    0; // `minWidth` distorts translation
                return {
                    chartX: (normalizedEvent.chartX - scroller.x -
                        scroller.xOffset) /
                        (scroller.barWidth - minWidthDifference),
                    chartY: (normalizedEvent.chartY - scroller.y -
                        scroller.yOffset) /
                        (scroller.barWidth - minWidthDifference)
                };
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Scrollbar#destroy
             */
            destroy() {
                const scroller = this, navigator = scroller.chart.scroller;
                // Disconnect events added in addEvents
                scroller.removeEvents();
                // Destroy properties
                [
                    'track',
                    'scrollbarRifles',
                    'scrollbar',
                    'scrollbarGroup',
                    'group'
                ].forEach(function (prop) {
                    if (scroller[prop] && scroller[prop].destroy) {
                        scroller[prop] = scroller[prop].destroy();
                    }
                });
                // #6421, chart may have more scrollbars
                if (navigator && scroller === navigator.scrollbar) {
                    navigator.scrollbar = null;
                    // Destroy elements in collection
                    destroyObjectProperties(navigator.scrollbarButtons);
                }
            }
            /**
             * Draw the scrollbar buttons with arrows
             *
             * @private
             * @function Highcharts.Scrollbar#drawScrollbarButton
             * @param {number} index
             *        0 is left, 1 is right
             */
            drawScrollbarButton(index) {
                const scroller = this, renderer = scroller.renderer, scrollbarButtons = scroller.scrollbarButtons, options = scroller.options, size = scroller.size, group = renderer.g().add(scroller.group);
                scrollbarButtons.push(group);
                if (options.buttonsEnabled) {
                    // Create a rectangle for the scrollbar button
                    const rect = renderer.rect()
                        .addClass('highcharts-scrollbar-button')
                        .add(group);
                    // Presentational attributes
                    if (!scroller.chart.styledMode) {
                        rect.attr({
                            stroke: options.buttonBorderColor,
                            'stroke-width': options.buttonBorderWidth,
                            fill: options.buttonBackgroundColor
                        });
                    }
                    // Place the rectangle based on the rendered stroke width
                    rect.attr(rect.crisp({
                        x: -0.5,
                        y: -0.5,
                        width: size,
                        height: size,
                        r: options.buttonBorderRadius
                    }, rect.strokeWidth()));
                    // Button arrow
                    const arrow = renderer
                        .path(Scrollbar.swapXY([[
                            'M',
                            size / 2 + (index ? -1 : 1),
                            size / 2 - 3
                        ], [
                            'L',
                            size / 2 + (index ? -1 : 1),
                            size / 2 + 3
                        ], [
                            'L',
                            size / 2 + (index ? 2 : -2),
                            size / 2
                        ]], options.vertical))
                        .addClass('highcharts-scrollbar-arrow')
                        .add(scrollbarButtons[index]);
                    if (!scroller.chart.styledMode) {
                        arrow.attr({
                            fill: options.buttonArrowColor
                        });
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.Scrollbar#init
             * @param {Highcharts.SVGRenderer} renderer
             * @param {Highcharts.ScrollbarOptions} options
             * @param {Highcharts.Chart} chart
             */
            init(renderer, options, chart) {
                const scroller = this;
                scroller.scrollbarButtons = [];
                scroller.renderer = renderer;
                scroller.userOptions = options;
                scroller.options = merge(ScrollbarDefaults, defaultOptions.scrollbar, options);
                scroller.options.margin = pick(scroller.options.margin, 10);
                scroller.chart = chart;
                // Backward compatibility
                scroller.size = pick(scroller.options.size, scroller.options.height);
                // Init
                if (options.enabled) {
                    scroller.render();
                    scroller.addEvents();
                }
            }
            mouseDownHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, mousePosition = scroller.cursorToScrollbarPosition(normalizedEvent);
                scroller.chartX = mousePosition.chartX;
                scroller.chartY = mousePosition.chartY;
                scroller.initPositions = [scroller.from, scroller.to];
                scroller.grabbedCenter = true;
            }
            /**
             * Event handler for the mouse move event.
             * @private
             */
            mouseMoveHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, options = scroller.options, direction = options.vertical ?
                    'chartY' : 'chartX', initPositions = scroller.initPositions || [];
                let scrollPosition, chartPosition, change;
                // In iOS, a mousemove event with e.pageX === 0 is fired when
                // holding the finger down in the center of the scrollbar. This
                // should be ignored.
                if (scroller.grabbedCenter &&
                    // #4696, scrollbar failed on Android
                    (!e.touches || e.touches[0][direction] !== 0)) {
                    chartPosition = scroller.cursorToScrollbarPosition(normalizedEvent)[direction];
                    scrollPosition = scroller[direction];
                    change = chartPosition - scrollPosition;
                    scroller.hasDragged = true;
                    scroller.updatePosition(initPositions[0] + change, initPositions[1] + change);
                    if (scroller.hasDragged) {
                        fireEvent(scroller, 'changed', {
                            from: scroller.from,
                            to: scroller.to,
                            trigger: 'scrollbar',
                            DOMType: e.type,
                            DOMEvent: e
                        });
                    }
                }
            }
            /**
             * Event handler for the mouse up event.
             * @private
             */
            mouseUpHandler(e) {
                const scroller = this;
                if (scroller.hasDragged) {
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMType: e.type,
                        DOMEvent: e
                    });
                }
                scroller.grabbedCenter =
                    scroller.hasDragged =
                        scroller.chartX =
                            scroller.chartY = null;
            }
            /**
             * Position the scrollbar, method called from a parent with defined
             * dimensions.
             *
             * @private
             * @function Highcharts.Scrollbar#position
             * @param {number} x
             *        x-position on the chart
             * @param {number} y
             *        y-position on the chart
             * @param {number} width
             *        width of the scrollbar
             * @param {number} height
             *        height of the scrollbar
             */
            position(x, y, width, height) {
                const scroller = this, options = scroller.options, { buttonsEnabled, margin = 0, vertical } = options, method = scroller.rendered ? 'animate' : 'attr';
                let xOffset = height, yOffset = 0;
                // Make the scrollbar visible when it is repositioned, #15763.
                scroller.group.show();
                scroller.x = x;
                scroller.y = y + this.trackBorderWidth;
                scroller.width = width; // Width with buttons
                scroller.height = height;
                scroller.xOffset = xOffset;
                scroller.yOffset = yOffset;
                // If Scrollbar is a vertical type, swap options:
                if (vertical) {
                    scroller.width = scroller.yOffset = width = yOffset = scroller.size;
                    scroller.xOffset = xOffset = 0;
                    scroller.yOffset = yOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = height - (buttonsEnabled ? width * 2 : 0);
                    scroller.x = x = x + margin;
                }
                else {
                    scroller.height = height = scroller.size;
                    scroller.xOffset = xOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = width - (buttonsEnabled ? height * 2 : 0);
                    scroller.y = scroller.y + margin;
                }
                // Set general position for a group:
                scroller.group[method]({
                    translateX: x,
                    translateY: scroller.y
                });
                // Resize background/track:
                scroller.track[method]({
                    width: width,
                    height: height
                });
                // Move right/bottom button to its place:
                scroller.scrollbarButtons[1][method]({
                    translateX: vertical ? 0 : width - xOffset,
                    translateY: vertical ? height - yOffset : 0
                });
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Scrollbar#removeEvents
             */
            removeEvents() {
                this._events.forEach(function (args) {
                    removeEvent.apply(null, args);
                });
                this._events.length = 0;
            }
            /**
             * Render scrollbar with all required items.
             *
             * @private
             * @function Highcharts.Scrollbar#render
             */
            render() {
                const scroller = this, renderer = scroller.renderer, options = scroller.options, size = scroller.size, styledMode = scroller.chart.styledMode, group = renderer.g('scrollbar')
                    .attr({
                    zIndex: options.zIndex
                })
                    .hide() // Initially hide the scrollbar #15863
                    .add();
                // Draw the scrollbar group
                scroller.group = group;
                // Draw the scrollbar track:
                scroller.track = renderer.rect()
                    .addClass('highcharts-scrollbar-track')
                    .attr({
                    r: options.trackBorderRadius || 0,
                    height: size,
                    width: size
                }).add(group);
                if (!styledMode) {
                    scroller.track.attr({
                        fill: options.trackBackgroundColor,
                        stroke: options.trackBorderColor,
                        'stroke-width': options.trackBorderWidth
                    });
                }
                const trackBorderWidth = scroller.trackBorderWidth =
                    scroller.track.strokeWidth();
                scroller.track.attr({
                    x: -crisp(0, trackBorderWidth),
                    y: -crisp(0, trackBorderWidth)
                });
                // Draw the scrollbar itself
                scroller.scrollbarGroup = renderer.g().add(group);
                scroller.scrollbar = renderer.rect()
                    .addClass('highcharts-scrollbar-thumb')
                    .attr({
                    height: size - trackBorderWidth,
                    width: size - trackBorderWidth,
                    r: options.barBorderRadius || 0
                }).add(scroller.scrollbarGroup);
                scroller.scrollbarRifles = renderer
                    .path(Scrollbar.swapXY([
                    ['M', -3, size / 4],
                    ['L', -3, 2 * size / 3],
                    ['M', 0, size / 4],
                    ['L', 0, 2 * size / 3],
                    ['M', 3, size / 4],
                    ['L', 3, 2 * size / 3]
                ], options.vertical))
                    .addClass('highcharts-scrollbar-rifles')
                    .add(scroller.scrollbarGroup);
                if (!styledMode) {
                    scroller.scrollbar.attr({
                        fill: options.barBackgroundColor,
                        stroke: options.barBorderColor,
                        'stroke-width': options.barBorderWidth
                    });
                    scroller.scrollbarRifles.attr({
                        stroke: options.rifleColor,
                        'stroke-width': 1
                    });
                }
                scroller.scrollbarStrokeWidth = scroller.scrollbar.strokeWidth();
                scroller.scrollbarGroup.translate(-crisp(0, scroller.scrollbarStrokeWidth), -crisp(0, scroller.scrollbarStrokeWidth));
                // Draw the buttons:
                scroller.drawScrollbarButton(0);
                scroller.drawScrollbarButton(1);
            }
            /**
             * Set scrollbar size, with a given scale.
             *
             * @private
             * @function Highcharts.Scrollbar#setRange
             * @param {number} from
             *        scale (0-1) where bar should start
             * @param {number} to
             *        scale (0-1) where bar should end
             */
            setRange(from, to) {
                const scroller = this, options = scroller.options, vertical = options.vertical, minWidth = options.minWidth, fullWidth = scroller.barWidth, method = (this.rendered &&
                    !this.hasDragged &&
                    !(this.chart.navigator && this.chart.navigator.hasDragged)) ? 'animate' : 'attr';
                if (!defined(fullWidth)) {
                    return;
                }
                const toPX = fullWidth * Math.min(to, 1);
                let fromPX, newSize;
                from = Math.max(from, 0);
                fromPX = Math.ceil(fullWidth * from);
                scroller.calculatedWidth = newSize = correctFloat(toPX - fromPX);
                // We need to recalculate position, if minWidth is used
                if (newSize < minWidth) {
                    fromPX = (fullWidth - minWidth + newSize) * from;
                    newSize = minWidth;
                }
                const newPos = Math.floor(fromPX + scroller.xOffset + scroller.yOffset);
                const newRiflesPos = newSize / 2 - 0.5; // -0.5 -> rifle line width / 2
                // Store current position:
                scroller.from = from;
                scroller.to = to;
                if (!vertical) {
                    scroller.scrollbarGroup[method]({
                        translateX: newPos
                    });
                    scroller.scrollbar[method]({
                        width: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateX: newRiflesPos
                    });
                    scroller.scrollbarLeft = newPos;
                    scroller.scrollbarTop = 0;
                }
                else {
                    scroller.scrollbarGroup[method]({
                        translateY: newPos
                    });
                    scroller.scrollbar[method]({
                        height: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateY: newRiflesPos
                    });
                    scroller.scrollbarTop = newPos;
                    scroller.scrollbarLeft = 0;
                }
                if (newSize <= 12) {
                    scroller.scrollbarRifles.hide();
                }
                else {
                    scroller.scrollbarRifles.show();
                }
                // Show or hide the scrollbar based on the showFull setting
                if (options.showFull === false) {
                    if (from <= 0 && to >= 1) {
                        scroller.group.hide();
                    }
                    else {
                        scroller.group.show();
                    }
                }
                scroller.rendered = true;
            }
            /**
             * Checks if the extremes should be updated in response to a scrollbar
             * change event.
             *
             * @private
             * @function Highcharts.Scrollbar#shouldUpdateExtremes
             */
            shouldUpdateExtremes(eventType) {
                return (pick(this.options.liveRedraw, H.svg &&
                    !H.isTouchDevice &&
                    !this.chart.boosted) ||
                    // Mouseup always should change extremes
                    eventType === 'mouseup' ||
                    eventType === 'touchend' ||
                    // Internal events
                    !defined(eventType));
            }
            trackClick(e) {
                const scroller = this;
                const normalizedEvent = scroller.chart.pointer?.normalize(e) || e, range = scroller.to - scroller.from, top = scroller.y + scroller.scrollbarTop, left = scroller.x + scroller.scrollbarLeft;
                if ((scroller.options.vertical && normalizedEvent.chartY > top) ||
                    (!scroller.options.vertical && normalizedEvent.chartX > left)) {
                    // On the top or on the left side of the track:
                    scroller.updatePosition(scroller.from + range, scroller.to + range);
                }
                else {
                    // On the bottom or the right side of the track:
                    scroller.updatePosition(scroller.from - range, scroller.to - range);
                }
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Update the scrollbar with new options
             *
             * @private
             * @function Highcharts.Scrollbar#update
             * @param  {Highcharts.ScrollbarOptions} options
             */
            update(options) {
                this.destroy();
                this.init(this.chart.renderer, merge(true, this.options, options), this.chart);
            }
            /**
             * Update position option in the Scrollbar, with normalized 0-1 scale
             *
             * @private
             * @function Highcharts.Scrollbar#updatePosition
             * @param  {number} from
             * @param  {number} to
             */
            updatePosition(from, to) {
                if (to > 1) {
                    from = correctFloat(1 - correctFloat(to - from));
                    to = 1;
                }
                if (from < 0) {
                    to = correctFloat(to - from);
                    from = 0;
                }
                this.from = from;
                this.to = to;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        Scrollbar.defaultOptions = ScrollbarDefaults;
        /* *
         *
         *  Registry
         *
         * */
        defaultOptions.scrollbar = merge(true, Scrollbar.defaultOptions, defaultOptions.scrollbar);
        /* *
         *
         *  Default Export
         *
         * */

        return Scrollbar;
    });
    _registerModule(_modules, 'Stock/Navigator/Navigator.js', [_modules['Core/Axis/Axis.js'], _modules['Stock/Navigator/ChartNavigatorComposition.js'], _modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorComposition.js'], _modules['Stock/Scrollbar/Scrollbar.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (Axis, ChartNavigatorComposition, D, H, NavigatorAxisAdditions, NavigatorComposition, Scrollbar, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { isTouchDevice } = H;
        const { prototype: { symbols } } = SVGRenderer;
        const { addEvent, clamp, correctFloat, defined, destroyObjectProperties, erase, extend, find, fireEvent, isArray, isNumber, merge, pick, removeEvent, splat } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Finding the min or max of a set of variables where we don't know if they are
         * defined, is a pattern that is repeated several places in Highcharts. Consider
         * making this a global utility method.
         * @private
         */
        function numExt(extreme, ...args) {
            const numbers = [].filter.call(args, isNumber);
            if (numbers.length) {
                return Math[extreme].apply(0, numbers);
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Navigator class
         *
         * @private
         * @class
         * @name Highcharts.Navigator
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        class Navigator {
            /* *
             *
             *  Static Properties
             *
             * */
            static compose(ChartClass, AxisClass, SeriesClass) {
                ChartNavigatorComposition.compose(ChartClass, Navigator);
                NavigatorComposition.compose(ChartClass, AxisClass, SeriesClass);
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.isDirty = false;
                this.scrollbarHeight = 0;
                this.init(chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Draw one of the handles on the side of the zoomed range in the navigator.
             *
             * @private
             * @function Highcharts.Navigator#drawHandle
             *
             * @param {number} x
             *        The x center for the handle
             *
             * @param {number} index
             *        0 for left and 1 for right
             *
             * @param {boolean|undefined} inverted
             *        Flag for chart.inverted
             *
             * @param {string} verb
             *        Use 'animate' or 'attr'
             */
            drawHandle(x, index, inverted, verb) {
                const navigator = this, height = navigator.navigatorOptions.handles.height;
                // Place it
                navigator.handles[index][verb](inverted ? {
                    translateX: Math.round(navigator.left + navigator.height / 2),
                    translateY: Math.round(navigator.top + parseInt(x, 10) + 0.5 - height)
                } : {
                    translateX: Math.round(navigator.left + parseInt(x, 10)),
                    translateY: Math.round(navigator.top + navigator.height / 2 - height / 2 - 1)
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawOutline
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawOutline(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, maskInside = navigator.navigatorOptions.maskInside, outlineWidth = navigator.outline.strokeWidth(), halfOutline = outlineWidth / 2, outlineCorrection = (outlineWidth % 2) / 2, // #5800
                scrollButtonSize = navigator.scrollButtonSize, navigatorSize = navigator.size, navigatorTop = navigator.top, height = navigator.height, lineTop = navigatorTop - halfOutline, lineBtm = navigatorTop + height;
                let left = navigator.left, verticalMin, path;
                if (inverted) {
                    verticalMin = navigatorTop + zoomedMax + outlineCorrection;
                    zoomedMax = navigatorTop + zoomedMin + outlineCorrection;
                    path = [
                        [
                            'M',
                            left + height,
                            navigatorTop - scrollButtonSize - outlineCorrection
                        ],
                        // Top right of zoomed range
                        ['L', left + height, verticalMin],
                        ['L', left, verticalMin], // Top left of z.r.
                        ['M', left, zoomedMax], // Bottom left of z.r.
                        ['L', left + height, zoomedMax], // Bottom right of z.r.
                        [
                            'L',
                            left + height,
                            navigatorTop + navigatorSize + scrollButtonSize
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', left + height, verticalMin - halfOutline], 
                        // Upper right of z.r.
                        [
                            'L',
                            left + height,
                            zoomedMax + halfOutline
                        ]);
                    }
                }
                else {
                    left -= scrollButtonSize;
                    zoomedMin += left + scrollButtonSize - outlineCorrection;
                    zoomedMax += left + scrollButtonSize - outlineCorrection;
                    path = [
                        // Left
                        ['M', left, lineTop],
                        // Upper left of zoomed range
                        ['L', zoomedMin, lineTop],
                        // Lower left of z.r.
                        ['L', zoomedMin, lineBtm],
                        // Lower right of z.r.
                        ['M', zoomedMax, lineBtm],
                        // Upper right of z.r.
                        ['L', zoomedMax, lineTop],
                        // Right
                        [
                            'L',
                            left + navigatorSize + scrollButtonSize * 2,
                            lineTop
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', zoomedMin - halfOutline, lineTop], 
                        // Upper right of z.r.
                        ['L', zoomedMax + halfOutline, lineTop]);
                    }
                }
                navigator.outline[verb]({
                    d: path
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawMasks
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawMasks(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, left = navigator.left, top = navigator.top, navigatorHeight = navigator.height;
                let height, width, x, y;
                // Determine rectangle position & size
                // According to (non)inverted position:
                if (inverted) {
                    x = [left, left, left];
                    y = [top, top + zoomedMin, top + zoomedMax];
                    width = [navigatorHeight, navigatorHeight, navigatorHeight];
                    height = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                }
                else {
                    x = [left, left + zoomedMin, left + zoomedMax];
                    y = [top, top, top];
                    width = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                    height = [navigatorHeight, navigatorHeight, navigatorHeight];
                }
                navigator.shades.forEach((shade, i) => {
                    shade[verb]({
                        x: x[i],
                        y: y[i],
                        width: width[i],
                        height: height[i]
                    });
                });
            }
            /**
             * Generate and update DOM elements for a navigator:
             *
             * - main navigator group
             *
             * - all shades
             *
             * - outline
             *
             * - handles
             *
             * @private
             * @function Highcharts.Navigator#renderElements
             */
            renderElements() {
                const navigator = this, navigatorOptions = navigator.navigatorOptions, maskInside = navigatorOptions.maskInside, chart = navigator.chart, inverted = chart.inverted, renderer = chart.renderer, mouseCursor = {
                    cursor: inverted ? 'ns-resize' : 'ew-resize'
                }, 
                // Create the main navigator group
                navigatorGroup = navigator.navigatorGroup ??
                    (navigator.navigatorGroup = renderer
                        .g('navigator')
                        .attr({
                        zIndex: 8,
                        visibility: 'hidden'
                    })
                        .add());
                // Create masks, each mask will get events and fill:
                [
                    !maskInside,
                    maskInside,
                    !maskInside
                ].forEach((hasMask, index) => {
                    const shade = navigator.shades[index] ??
                        (navigator.shades[index] = renderer.rect()
                            .addClass('highcharts-navigator-mask' +
                            (index === 1 ? '-inside' : '-outside'))
                            .add(navigatorGroup));
                    if (!chart.styledMode) {
                        shade.attr({
                            fill: hasMask ? navigatorOptions.maskFill : 'rgba(0,0,0,0)'
                        });
                        if (index === 1) {
                            shade.css(mouseCursor);
                        }
                    }
                });
                // Create the outline:
                if (!navigator.outline) {
                    navigator.outline = renderer.path()
                        .addClass('highcharts-navigator-outline')
                        .add(navigatorGroup);
                }
                if (!chart.styledMode) {
                    navigator.outline.attr({
                        'stroke-width': navigatorOptions.outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    });
                }
                // Create the handlers:
                if (navigatorOptions.handles?.enabled) {
                    const handlesOptions = navigatorOptions.handles, { height, width } = handlesOptions;
                    [0, 1].forEach((index) => {
                        const symbolName = handlesOptions.symbols[index];
                        if (!navigator.handles[index] ||
                            navigator.handles[index].symbolUrl !== symbolName) {
                            // Generate symbol from scratch if we're dealing with an URL
                            navigator.handles[index]?.destroy();
                            navigator.handles[index] = renderer.symbol(symbolName, -width / 2 - 1, 0, width, height, handlesOptions);
                            // Z index is 6 for right handle, 7 for left. Can't be 10,
                            // because of the tooltip in inverted chart (#2908).
                            navigator.handles[index].attr({ zIndex: 7 - index })
                                .addClass('highcharts-navigator-handle ' +
                                'highcharts-navigator-handle-' +
                                ['left', 'right'][index]).add(navigatorGroup);
                            navigator.addMouseEvents();
                            // If the navigator symbol changed, update its path and name
                        }
                        else if (!navigator.handles[index].isImg &&
                            navigator.handles[index].symbolName !== symbolName) {
                            const symbolFn = symbols[symbolName], path = symbolFn.call(symbols, -width / 2 - 1, 0, width, height);
                            navigator.handles[index].attr({
                                d: path
                            });
                            navigator.handles[index].symbolName = symbolName;
                        }
                        if (chart.inverted) {
                            navigator.handles[index].attr({
                                rotation: 90,
                                rotationOriginX: Math.floor(-width / 2),
                                rotationOriginY: (height + width) / 2
                            });
                        }
                        if (!chart.styledMode) {
                            navigator.handles[index]
                                .attr({
                                fill: handlesOptions.backgroundColor,
                                stroke: handlesOptions.borderColor,
                                'stroke-width': handlesOptions.lineWidth,
                                width: handlesOptions.width,
                                height: handlesOptions.height,
                                x: -width / 2 - 1,
                                y: 0
                            })
                                .css(mouseCursor);
                        }
                    });
                }
            }
            /**
             * Update navigator
             *
             * @private
             * @function Highcharts.Navigator#update
             *
             * @param {Highcharts.NavigatorOptions} options
             *        Options to merge in when updating navigator
             */
            update(options, redraw = false) {
                const chart = this.chart, invertedUpdate = chart.options.chart.inverted !==
                    chart.scrollbar?.options.vertical;
                merge(true, chart.options.navigator, options);
                this.navigatorOptions = chart.options.navigator || {};
                this.setOpposite();
                // Revert to destroy/init for navigator/scrollbar enabled toggle
                if (defined(options.enabled) || invertedUpdate) {
                    this.destroy();
                    this.navigatorEnabled = options.enabled || this.navigatorEnabled;
                    return this.init(chart);
                }
                if (this.navigatorEnabled) {
                    this.isDirty = true;
                    if (options.adaptToUpdatedData === false) {
                        this.baseSeries.forEach((series) => {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    if (options.adaptToUpdatedData) {
                        this.baseSeries.forEach((series) => {
                            series.eventsToUnbind.push(addEvent(series, 'updatedData', this.updatedDataHandler));
                        }, this);
                    }
                    // Update navigator series
                    if (options.series || options.baseSeries) {
                        this.setBaseSeries(void 0, false);
                    }
                    // Update navigator axis
                    if (options.height || options.xAxis || options.yAxis) {
                        this.height = options.height ?? this.height;
                        const offsets = this.getXAxisOffsets();
                        this.xAxis.update({
                            ...options.xAxis,
                            offsets,
                            [chart.inverted ? 'width' : 'height']: this.height,
                            [chart.inverted ? 'height' : 'width']: void 0
                        }, false);
                        this.yAxis.update({
                            ...options.yAxis,
                            [chart.inverted ? 'width' : 'height']: this.height
                        }, false);
                    }
                }
                if (redraw) {
                    chart.redraw();
                }
            }
            /**
             * Render the navigator
             *
             * @private
             * @function Highcharts.Navigator#render
             * @param {number} min
             *        X axis value minimum
             * @param {number} max
             *        X axis value maximum
             * @param {number} [pxMin]
             *        Pixel value minimum
             * @param {number} [pxMax]
             *        Pixel value maximum
             */
            render(min, max, pxMin, pxMax) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, pointRange = xAxis.pointRange || 0, scrollbarXAxis = xAxis.navigatorAxis.fake ? chart.xAxis[0] : xAxis, navigatorEnabled = navigator.navigatorEnabled, rendered = navigator.rendered, inverted = chart.inverted, minRange = chart.xAxis[0].minRange, maxRange = chart.xAxis[0].options.maxRange, scrollButtonSize = navigator.scrollButtonSize;
                let navigatorWidth, scrollbarLeft, scrollbarTop, scrollbarHeight = navigator.scrollbarHeight, navigatorSize, verb;
                // Don't redraw while moving the handles (#4703).
                if (this.hasDragged && !defined(pxMin)) {
                    return;
                }
                if (this.isDirty) {
                    // Update DOM navigator elements
                    this.renderElements();
                }
                min = correctFloat(min - pointRange / 2);
                max = correctFloat(max + pointRange / 2);
                // Don't render the navigator until we have data (#486, #4202, #5172).
                if (!isNumber(min) || !isNumber(max)) {
                    // However, if navigator was already rendered, we may need to resize
                    // it. For example hidden series, but visible navigator (#6022).
                    if (rendered) {
                        pxMin = 0;
                        pxMax = pick(xAxis.width, scrollbarXAxis.width);
                    }
                    else {
                        return;
                    }
                }
                navigator.left = pick(xAxis.left, 
                // In case of scrollbar only, without navigator
                chart.plotLeft + scrollButtonSize +
                    (inverted ? chart.plotWidth : 0));
                let zoomedMax = navigator.size = navigatorSize = pick(xAxis.len, (inverted ? chart.plotHeight : chart.plotWidth) -
                    2 * scrollButtonSize);
                if (inverted) {
                    navigatorWidth = scrollbarHeight;
                }
                else {
                    navigatorWidth = navigatorSize + 2 * scrollButtonSize;
                }
                // Get the pixel position of the handles
                pxMin = pick(pxMin, xAxis.toPixels(min, true));
                pxMax = pick(pxMax, xAxis.toPixels(max, true));
                // Verify (#1851, #2238)
                if (!isNumber(pxMin) || Math.abs(pxMin) === Infinity) {
                    pxMin = 0;
                    pxMax = navigatorWidth;
                }
                // Are we below the minRange? (#2618, #6191)
                const newMin = xAxis.toValue(pxMin, true), newMax = xAxis.toValue(pxMax, true), currentRange = Math.abs(correctFloat(newMax - newMin));
                if (currentRange < minRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - minRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + minRange + pointRange, true);
                    }
                }
                else if (defined(maxRange) &&
                    correctFloat(currentRange - pointRange) > maxRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - maxRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + maxRange + pointRange, true);
                    }
                }
                // Handles are allowed to cross, but never exceed the plot area
                navigator.zoomedMax = clamp(Math.max(pxMin, pxMax), 0, zoomedMax);
                navigator.zoomedMin = clamp(navigator.fixedWidth ?
                    navigator.zoomedMax - navigator.fixedWidth :
                    Math.min(pxMin, pxMax), 0, zoomedMax);
                navigator.range = navigator.zoomedMax - navigator.zoomedMin;
                zoomedMax = Math.round(navigator.zoomedMax);
                const zoomedMin = Math.round(navigator.zoomedMin);
                if (navigatorEnabled) {
                    navigator.navigatorGroup.attr({
                        visibility: 'inherit'
                    });
                    // Place elements
                    verb = rendered && !navigator.hasDragged ? 'animate' : 'attr';
                    navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    if (navigator.navigatorOptions.handles.enabled) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
                if (navigator.scrollbar) {
                    if (inverted) {
                        scrollbarTop = navigator.top - scrollButtonSize;
                        scrollbarLeft = navigator.left - scrollbarHeight +
                            (navigatorEnabled || !scrollbarXAxis.opposite ? 0 :
                                // Multiple axes has offsets:
                                (scrollbarXAxis.titleOffset || 0) +
                                    // Self margin from the axis.title
                                    scrollbarXAxis.axisTitleMargin);
                        scrollbarHeight = navigatorSize + 2 * scrollButtonSize;
                    }
                    else {
                        scrollbarTop = navigator.top + (navigatorEnabled ?
                            navigator.height :
                            -scrollbarHeight);
                        scrollbarLeft = navigator.left - scrollButtonSize;
                    }
                    // Reposition scrollbar
                    navigator.scrollbar.position(scrollbarLeft, scrollbarTop, navigatorWidth, scrollbarHeight);
                    // Keep scale 0-1
                    navigator.scrollbar.setRange(
                    // Use real value, not rounded because range can be very small
                    // (#1716)
                    navigator.zoomedMin / (navigatorSize || 1), navigator.zoomedMax / (navigatorSize || 1));
                }
                navigator.rendered = true;
                this.isDirty = false;
                fireEvent(this, 'afterRender');
            }
            /**
             * Set up the mouse and touch events for the navigator
             *
             * @private
             * @function Highcharts.Navigator#addMouseEvents
             */
            addMouseEvents() {
                const navigator = this, chart = navigator.chart, container = chart.container;
                let eventsToUnbind = [], mouseMoveHandler, mouseUpHandler;
                /**
                 * Create mouse events' handlers.
                 * Make them as separate functions to enable wrapping them:
                 */
                navigator.mouseMoveHandler = mouseMoveHandler = function (e) {
                    navigator.onMouseMove(e);
                };
                navigator.mouseUpHandler = mouseUpHandler = function (e) {
                    navigator.onMouseUp(e);
                };
                // Add shades and handles mousedown events
                eventsToUnbind = navigator.getPartsEvents('mousedown');
                eventsToUnbind.push(
                // Add mouse move and mouseup events. These are bind to doc/div,
                // because Navigator.grabbedSomething flags are stored in mousedown
                // events
                addEvent(chart.renderTo, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler), 
                // Touch events
                addEvent(chart.renderTo, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler));
                eventsToUnbind.concat(navigator.getPartsEvents('touchstart'));
                navigator.eventsToUnbind = eventsToUnbind;
                // Data events
                if (navigator.series && navigator.series[0]) {
                    eventsToUnbind.push(addEvent(navigator.series[0].xAxis, 'foundExtremes', function () {
                        chart.navigator.modifyNavigatorAxisExtremes();
                    }));
                }
            }
            /**
             * Generate events for handles and masks
             *
             * @private
             * @function Highcharts.Navigator#getPartsEvents
             *
             * @param {string} eventName
             *        Event name handler, 'mousedown' or 'touchstart'
             *
             * @return {Array<Function>}
             *         An array of functions to remove navigator functions from the
             *         events again.
             */
            getPartsEvents(eventName) {
                const navigator = this, events = [];
                ['shades', 'handles'].forEach(function (name) {
                    navigator[name].forEach(function (navigatorItem, index) {
                        events.push(addEvent(navigatorItem.element, eventName, function (e) {
                            navigator[name + 'Mousedown'](e, index);
                        }));
                    });
                });
                return events;
            }
            /**
             * Mousedown on a shaded mask, either:
             *
             * - will be stored for future drag&drop
             *
             * - will directly shift to a new range
             *
             * @private
             * @function Highcharts.Navigator#shadesMousedown
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a mask in Navigator.shades array
             */
            shadesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, zoomedMin = navigator.zoomedMin, navigatorSize = navigator.size, range = navigator.range;
                let navigatorPosition = navigator.left, chartX = e.chartX, fixedMax, fixedMin, ext, left;
                // For inverted chart, swap some options:
                if (chart.inverted) {
                    chartX = e.chartY;
                    navigatorPosition = navigator.top;
                }
                if (index === 1) {
                    // Store information for drag&drop
                    navigator.grabbedCenter = chartX;
                    navigator.fixedWidth = range;
                    navigator.dragOffset = chartX - zoomedMin;
                }
                else {
                    // Shift the range by clicking on shaded areas
                    left = chartX - navigatorPosition - range / 2;
                    if (index === 0) {
                        left = Math.max(0, left);
                    }
                    else if (index === 2 && left + range >= navigatorSize) {
                        left = navigatorSize - range;
                        if (navigator.reversedExtremes) {
                            // #7713
                            left -= range;
                            fixedMin = navigator.getUnionExtremes().dataMin;
                        }
                        else {
                            // #2293, #3543
                            fixedMax = navigator.getUnionExtremes().dataMax;
                        }
                    }
                    if (left !== zoomedMin) { // It has actually moved
                        navigator.fixedWidth = range; // #1370
                        ext = xAxis.navigatorAxis.toFixedRange(left, left + range, fixedMin, fixedMax);
                        if (defined(ext.min)) { // #7411
                            fireEvent(this, 'setRange', {
                                min: Math.min(ext.min, ext.max),
                                max: Math.max(ext.min, ext.max),
                                redraw: true,
                                eventArguments: {
                                    trigger: 'navigator'
                                }
                            });
                        }
                    }
                }
            }
            /**
             * Mousedown on a handle mask.
             * Will store necessary information for drag&drop.
             *
             * @private
             * @function Highcharts.Navigator#handlesMousedown
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             * @param {number} index
             *        Index of a handle in Navigator.handles array
             */
            handlesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, baseXAxis = chart.xAxis[0], 
                // For reversed axes, min and max are changed,
                // so the other extreme should be stored
                reverse = navigator.reversedExtremes;
                if (index === 0) {
                    // Grab the left handle
                    navigator.grabbedLeft = true;
                    navigator.otherHandlePos = navigator.zoomedMax;
                    navigator.fixedExtreme = reverse ? baseXAxis.min : baseXAxis.max;
                }
                else {
                    // Grab the right handle
                    navigator.grabbedRight = true;
                    navigator.otherHandlePos = navigator.zoomedMin;
                    navigator.fixedExtreme = reverse ? baseXAxis.max : baseXAxis.min;
                }
                chart.setFixedRange(void 0);
            }
            /**
             * Mouse move event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseMove
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseMove(e) {
                const navigator = this, chart = navigator.chart, navigatorSize = navigator.navigatorSize, range = navigator.range, dragOffset = navigator.dragOffset, inverted = chart.inverted;
                let left = navigator.left, chartX;
                // In iOS, a mousemove event with e.pageX === 0 is fired when holding
                // the finger down in the center of the scrollbar. This should be
                // ignored.
                if (!e.touches || e.touches[0].pageX !== 0) { // #4696
                    e = chart.pointer?.normalize(e) || e;
                    chartX = e.chartX;
                    // Swap some options for inverted chart
                    if (inverted) {
                        left = navigator.top;
                        chartX = e.chartY;
                    }
                    // Drag left handle or top handle
                    if (navigator.grabbedLeft) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, chartX - left, navigator.otherHandlePos);
                        // Drag right handle or bottom handle
                    }
                    else if (navigator.grabbedRight) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, navigator.otherHandlePos, chartX - left);
                        // Drag scrollbar or open area in navigator
                    }
                    else if (navigator.grabbedCenter) {
                        navigator.hasDragged = true;
                        if (chartX < dragOffset) { // Outside left
                            chartX = dragOffset;
                            // Outside right
                        }
                        else if (chartX >
                            navigatorSize + dragOffset - range) {
                            chartX = navigatorSize + dragOffset - range;
                        }
                        navigator.render(0, 0, chartX - dragOffset, chartX - dragOffset + range);
                    }
                    if (navigator.hasDragged &&
                        navigator.scrollbar &&
                        pick(navigator.scrollbar.options.liveRedraw, 
                        // By default, don't run live redraw on touch
                        // devices or if the chart is in boost.
                        !isTouchDevice &&
                            !this.chart.boosted)) {
                        e.DOMType = e.type;
                        setTimeout(function () {
                            navigator.onMouseUp(e);
                        }, 0);
                    }
                }
            }
            /**
             * Mouse up event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseUp
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseUp(e) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, scrollbar = navigator.scrollbar, DOMEvent = e.DOMEvent || e, inverted = chart.inverted, verb = navigator.rendered && !navigator.hasDragged ?
                    'animate' : 'attr';
                let zoomedMax, zoomedMin, unionExtremes, fixedMin, fixedMax, ext;
                if (
                // MouseUp is called for both, navigator and scrollbar (that order),
                // which causes calling afterSetExtremes twice. Prevent first call
                // by checking if scrollbar is going to set new extremes (#6334)
                (navigator.hasDragged && (!scrollbar || !scrollbar.hasDragged)) ||
                    e.trigger === 'scrollbar') {
                    unionExtremes = navigator.getUnionExtremes();
                    // When dragging one handle, make sure the other one doesn't change
                    if (navigator.zoomedMin === navigator.otherHandlePos) {
                        fixedMin = navigator.fixedExtreme;
                    }
                    else if (navigator.zoomedMax === navigator.otherHandlePos) {
                        fixedMax = navigator.fixedExtreme;
                    }
                    // Snap to right edge (#4076)
                    if (navigator.zoomedMax === navigator.size) {
                        fixedMax = navigator.reversedExtremes ?
                            unionExtremes.dataMin :
                            unionExtremes.dataMax;
                    }
                    // Snap to left edge (#7576)
                    if (navigator.zoomedMin === 0) {
                        fixedMin = navigator.reversedExtremes ?
                            unionExtremes.dataMax :
                            unionExtremes.dataMin;
                    }
                    ext = xAxis.navigatorAxis.toFixedRange(navigator.zoomedMin, navigator.zoomedMax, fixedMin, fixedMax);
                    if (defined(ext.min)) {
                        fireEvent(this, 'setRange', {
                            min: Math.min(ext.min, ext.max),
                            max: Math.max(ext.min, ext.max),
                            redraw: true,
                            animation: navigator.hasDragged ? false : null,
                            eventArguments: {
                                trigger: 'navigator',
                                triggerOp: 'navigator-drag',
                                DOMEvent: DOMEvent // #1838
                            }
                        });
                    }
                }
                if (e.DOMType !== 'mousemove' &&
                    e.DOMType !== 'touchmove') {
                    navigator.grabbedLeft = navigator.grabbedRight =
                        navigator.grabbedCenter = navigator.fixedWidth =
                            navigator.fixedExtreme = navigator.otherHandlePos =
                                navigator.hasDragged = navigator.dragOffset = null;
                }
                // Update position of navigator shades, outline and handles (#12573)
                if (navigator.navigatorEnabled &&
                    isNumber(navigator.zoomedMin) &&
                    isNumber(navigator.zoomedMax)) {
                    zoomedMin = Math.round(navigator.zoomedMin);
                    zoomedMax = Math.round(navigator.zoomedMax);
                    if (navigator.shades) {
                        navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.outline) {
                        navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.navigatorOptions.handles.enabled &&
                        Object.keys(navigator.handles).length ===
                            navigator.handles.length) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Navigator#removeEvents
             */
            removeEvents() {
                if (this.eventsToUnbind) {
                    this.eventsToUnbind.forEach(function (unbind) {
                        unbind();
                    });
                    this.eventsToUnbind = void 0;
                }
                this.removeBaseSeriesEvents();
            }
            /**
             * Remove data events.
             *
             * @private
             * @function Highcharts.Navigator#removeBaseSeriesEvents
             */
            removeBaseSeriesEvents() {
                const baseSeries = this.baseSeries || [];
                if (this.navigatorEnabled && baseSeries[0]) {
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        baseSeries.forEach(function (series) {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    // We only listen for extremes-events on the first baseSeries
                    if (baseSeries[0].xAxis) {
                        removeEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
                    }
                }
            }
            /**
             * Calculate the navigator xAxis offsets
             *
             * @private
             */
            getXAxisOffsets() {
                return (this.chart.inverted ?
                    [this.scrollButtonSize, 0, -this.scrollButtonSize, 0] :
                    [0, -this.scrollButtonSize, 0, this.scrollButtonSize]);
            }
            /**
             * Initialize the Navigator object
             *
             * @private
             * @function Highcharts.Navigator#init
             */
            init(chart) {
                const chartOptions = chart.options, navigatorOptions = chartOptions.navigator || {}, navigatorEnabled = navigatorOptions.enabled, scrollbarOptions = chartOptions.scrollbar || {}, scrollbarEnabled = scrollbarOptions.enabled, height = navigatorEnabled && navigatorOptions.height || 0, scrollbarHeight = scrollbarEnabled && scrollbarOptions.height || 0, scrollButtonSize = scrollbarOptions.buttonsEnabled && scrollbarHeight || 0;
                this.handles = [];
                this.shades = [];
                this.chart = chart;
                this.setBaseSeries();
                this.height = height;
                this.scrollbarHeight = scrollbarHeight;
                this.scrollButtonSize = scrollButtonSize;
                this.scrollbarEnabled = scrollbarEnabled;
                this.navigatorEnabled = navigatorEnabled;
                this.navigatorOptions = navigatorOptions;
                this.scrollbarOptions = scrollbarOptions;
                this.setOpposite();
                const navigator = this, baseSeries = navigator.baseSeries, xAxisIndex = chart.xAxis.length, yAxisIndex = chart.yAxis.length, baseXaxis = baseSeries && baseSeries[0] && baseSeries[0].xAxis ||
                    chart.xAxis[0] || { options: {} };
                chart.isDirtyBox = true;
                if (navigator.navigatorEnabled) {
                    const offsets = this.getXAxisOffsets();
                    // An x axis is required for scrollbar also
                    navigator.xAxis = new Axis(chart, merge({
                        // Inherit base xAxis' break, ordinal options and overscroll
                        breaks: baseXaxis.options.breaks,
                        ordinal: baseXaxis.options.ordinal,
                        overscroll: baseXaxis.options.overscroll
                    }, navigatorOptions.xAxis, {
                        type: 'datetime',
                        yAxis: navigatorOptions.yAxis?.id,
                        index: xAxisIndex,
                        isInternal: true,
                        offset: 0,
                        keepOrdinalPadding: true, // #2436
                        startOnTick: false,
                        endOnTick: false,
                        // Inherit base xAxis' padding when ordinal is false (#16915).
                        minPadding: baseXaxis.options.ordinal ? 0 :
                            baseXaxis.options.minPadding,
                        maxPadding: baseXaxis.options.ordinal ? 0 :
                            baseXaxis.options.maxPadding,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        offsets,
                        width: height
                    } : {
                        offsets,
                        height
                    }), 'xAxis');
                    navigator.yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                        alignTicks: false,
                        offset: 0,
                        index: yAxisIndex,
                        isInternal: true,
                        reversed: pick((navigatorOptions.yAxis &&
                            navigatorOptions.yAxis.reversed), (chart.yAxis[0] && chart.yAxis[0].reversed), false), // #14060
                        zoomEnabled: false
                    }, chart.inverted ? {
                        width: height
                    } : {
                        height: height
                    }), 'yAxis');
                    // If we have a base series, initialize the navigator series
                    if (baseSeries || navigatorOptions.series.data) {
                        navigator.updateNavigatorSeries(false);
                        // If not, set up an event to listen for added series
                    }
                    else if (chart.series.length === 0) {
                        navigator.unbindRedraw = addEvent(chart, 'beforeRedraw', function () {
                            // We've got one, now add it as base
                            if (chart.series.length > 0 && !navigator.series) {
                                navigator.setBaseSeries();
                                navigator.unbindRedraw(); // Reset
                            }
                        });
                    }
                    navigator.reversedExtremes = (chart.inverted && !navigator.xAxis.reversed) || (!chart.inverted && navigator.xAxis.reversed);
                    // Render items, so we can bind events to them:
                    navigator.renderElements();
                    // Add mouse events
                    navigator.addMouseEvents();
                    // In case of scrollbar only, fake an x axis to get translation
                }
                else {
                    navigator.xAxis = {
                        chart,
                        navigatorAxis: {
                            fake: true
                        },
                        translate: function (value, reverse) {
                            const axis = chart.xAxis[0], ext = axis.getExtremes(), scrollTrackWidth = axis.len - 2 * scrollButtonSize, min = numExt('min', axis.options.min, ext.dataMin), valueRange = numExt('max', axis.options.max, ext.dataMax) - min;
                            return reverse ?
                                // From pixel to value
                                (value * valueRange / scrollTrackWidth) + min :
                                // From value to pixel
                                scrollTrackWidth * (value - min) / valueRange;
                        },
                        toPixels: function (value) {
                            return this.translate(value);
                        },
                        toValue: function (value) {
                            return this.translate(value, true);
                        }
                    };
                    navigator.xAxis.navigatorAxis.axis = navigator.xAxis;
                    navigator.xAxis.navigatorAxis.toFixedRange = (NavigatorAxisAdditions.prototype.toFixedRange.bind(navigator.xAxis.navigatorAxis));
                }
                // Initialize the scrollbar
                if (chart.options.scrollbar.enabled) {
                    const options = merge(chart.options.scrollbar, { vertical: chart.inverted });
                    if (!isNumber(options.margin) && navigator.navigatorEnabled) {
                        options.margin = chart.inverted ? -3 : 3;
                    }
                    chart.scrollbar = navigator.scrollbar = new Scrollbar(chart.renderer, options, chart);
                    addEvent(navigator.scrollbar, 'changed', function (e) {
                        const range = navigator.size, to = range * this.to, from = range * this.from;
                        navigator.hasDragged = navigator.scrollbar.hasDragged;
                        navigator.render(0, 0, from, to);
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            setTimeout(function () {
                                navigator.onMouseUp(e);
                            });
                        }
                    });
                }
                // Add data events
                navigator.addBaseSeriesEvents();
                // Add redraw events
                navigator.addChartEvents();
            }
            /**
             * Set the opposite property on navigator
             *
             * @private
             */
            setOpposite() {
                const navigatorOptions = this.navigatorOptions, navigatorEnabled = this.navigatorEnabled, chart = this.chart;
                this.opposite = pick(navigatorOptions.opposite, Boolean(!navigatorEnabled && chart.inverted)); // #6262
            }
            /**
             * Get the union data extremes of the chart - the outer data extremes of the
             * base X axis and the navigator axis.
             *
             * @private
             * @function Highcharts.Navigator#getUnionExtremes
             */
            getUnionExtremes(returnFalseOnNoBaseSeries) {
                const baseAxis = this.chart.xAxis[0], navAxis = this.xAxis, navAxisOptions = navAxis.options, baseAxisOptions = baseAxis.options;
                let ret;
                if (!returnFalseOnNoBaseSeries || baseAxis.dataMin !== null) {
                    ret = {
                        dataMin: pick(// #4053
                        navAxisOptions && navAxisOptions.min, numExt('min', baseAxisOptions.min, baseAxis.dataMin, navAxis.dataMin, navAxis.min)),
                        dataMax: pick(navAxisOptions && navAxisOptions.max, numExt('max', baseAxisOptions.max, baseAxis.dataMax, navAxis.dataMax, navAxis.max))
                    };
                }
                return ret;
            }
            /**
             * Set the base series and update the navigator series from this. With a bit
             * of modification we should be able to make this an API method to be called
             * from the outside
             *
             * @private
             * @function Highcharts.Navigator#setBaseSeries
             * @param {Highcharts.SeriesOptionsType} [baseSeriesOptions]
             *        Additional series options for a navigator
             * @param {boolean} [redraw]
             *        Whether to redraw after update.
             */
            setBaseSeries(baseSeriesOptions, redraw) {
                const chart = this.chart, baseSeries = this.baseSeries = [];
                baseSeriesOptions = (baseSeriesOptions ||
                    chart.options && chart.options.navigator.baseSeries ||
                    (chart.series.length ?
                        // Find the first non-navigator series (#8430)
                        find(chart.series, (s) => (!s.options.isInternal)).index :
                        0));
                // Iterate through series and add the ones that should be shown in
                // navigator.
                (chart.series || []).forEach((series, i) => {
                    if (
                    // Don't include existing nav series
                    !series.options.isInternal &&
                        (series.options.showInNavigator ||
                            (i === baseSeriesOptions ||
                                series.options.id === baseSeriesOptions) &&
                                series.options.showInNavigator !== false)) {
                        baseSeries.push(series);
                    }
                });
                // When run after render, this.xAxis already exists
                if (this.xAxis && !this.xAxis.navigatorAxis.fake) {
                    this.updateNavigatorSeries(true, redraw);
                }
            }
            /**
             * Update series in the navigator from baseSeries, adding new if does not
             * exist.
             *
             * @private
             * @function Highcharts.Navigator.updateNavigatorSeries
             */
            updateNavigatorSeries(addEvents, redraw) {
                const navigator = this, chart = navigator.chart, baseSeries = navigator.baseSeries, navSeriesMixin = {
                    enableMouseTracking: false,
                    index: null, // #6162
                    linkedTo: null, // #6734
                    group: 'nav', // For columns
                    padXAxis: false,
                    xAxis: this.navigatorOptions.xAxis?.id,
                    yAxis: this.navigatorOptions.yAxis?.id,
                    showInLegend: false,
                    stacking: void 0, // #4823
                    isInternal: true,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }, 
                // Remove navigator series that are no longer in the baseSeries
                navigatorSeries = navigator.series =
                    (navigator.series || []).filter((navSeries) => {
                        const base = navSeries.baseSeries;
                        if (baseSeries.indexOf(base) < 0) { // Not in array
                            // If there is still a base series connected to this
                            // series, remove event handler and reference.
                            if (base) {
                                removeEvent(base, 'updatedData', navigator.updatedDataHandler);
                                delete base.navigatorSeries;
                            }
                            // Kill the nav series. It may already have been
                            // destroyed (#8715).
                            if (navSeries.chart) {
                                navSeries.destroy();
                            }
                            return false;
                        }
                        return true;
                    });
                let baseOptions, mergedNavSeriesOptions, chartNavigatorSeriesOptions = navigator.navigatorOptions.series, baseNavigatorOptions;
                // Go through each base series and merge the options to create new
                // series
                if (baseSeries && baseSeries.length) {
                    baseSeries.forEach((base) => {
                        const linkedNavSeries = base.navigatorSeries, userNavOptions = extend(
                        // Grab color and visibility from base as default
                        {
                            color: base.color,
                            visible: base.visible
                        }, !isArray(chartNavigatorSeriesOptions) ?
                            chartNavigatorSeriesOptions :
                            defaultOptions.navigator.series);
                        // Don't update if the series exists in nav and we have disabled
                        // adaptToUpdatedData.
                        if (linkedNavSeries &&
                            navigator.navigatorOptions.adaptToUpdatedData === false) {
                            return;
                        }
                        navSeriesMixin.name = 'Navigator ' + baseSeries.length;
                        baseOptions = base.options || {};
                        baseNavigatorOptions = baseOptions.navigatorOptions || {};
                        // The dataLabels options are not merged correctly
                        // if the settings are an array, #13847.
                        userNavOptions.dataLabels = splat(userNavOptions.dataLabels);
                        mergedNavSeriesOptions = merge(baseOptions, navSeriesMixin, userNavOptions, baseNavigatorOptions);
                        // Once nav series type is resolved, pick correct pointRange
                        mergedNavSeriesOptions.pointRange = pick(
                        // Stricte set pointRange in options
                        userNavOptions.pointRange, baseNavigatorOptions.pointRange, 
                        // Fallback to default values, e.g. `null` for column
                        defaultOptions.plotOptions[mergedNavSeriesOptions.type || 'line'].pointRange);
                        // Merge data separately. Do a slice to avoid mutating the
                        // navigator options from base series (#4923).
                        const navigatorSeriesData = baseNavigatorOptions.data || userNavOptions.data;
                        navigator.hasNavigatorData =
                            navigator.hasNavigatorData || !!navigatorSeriesData;
                        mergedNavSeriesOptions.data =
                            navigatorSeriesData ||
                                baseOptions.data && baseOptions.data.slice(0);
                        // Update or add the series
                        if (linkedNavSeries && linkedNavSeries.options) {
                            linkedNavSeries.update(mergedNavSeriesOptions, redraw);
                        }
                        else {
                            base.navigatorSeries = chart.initSeries(mergedNavSeriesOptions);
                            // Set data on initial run with dataSorting enabled (#20318)
                            chart.setSortedData();
                            base.navigatorSeries.baseSeries = base; // Store ref
                            navigatorSeries.push(base.navigatorSeries);
                        }
                    });
                }
                // If user has defined data (and no base series) or explicitly defined
                // navigator.series as an array, we create these series on top of any
                // base series.
                if (chartNavigatorSeriesOptions.data &&
                    !(baseSeries && baseSeries.length) ||
                    isArray(chartNavigatorSeriesOptions)) {
                    navigator.hasNavigatorData = false;
                    // Allow navigator.series to be an array
                    chartNavigatorSeriesOptions =
                        splat(chartNavigatorSeriesOptions);
                    chartNavigatorSeriesOptions.forEach((userSeriesOptions, i) => {
                        navSeriesMixin.name =
                            'Navigator ' + (navigatorSeries.length + 1);
                        mergedNavSeriesOptions = merge(defaultOptions.navigator.series, {
                            // Since we don't have a base series to pull color from,
                            // try to fake it by using color from series with same
                            // index. Otherwise pull from the colors array. We need
                            // an explicit color as otherwise updates will increment
                            // color counter and we'll get a new color for each
                            // update of the nav series.
                            color: chart.series[i] &&
                                !chart.series[i].options.isInternal &&
                                chart.series[i].color ||
                                chart.options.colors[i] ||
                                chart.options.colors[0]
                        }, navSeriesMixin, userSeriesOptions);
                        mergedNavSeriesOptions.data = userSeriesOptions.data;
                        if (mergedNavSeriesOptions.data) {
                            navigator.hasNavigatorData = true;
                            navigatorSeries.push(chart.initSeries(mergedNavSeriesOptions));
                        }
                    });
                }
                if (addEvents) {
                    this.addBaseSeriesEvents();
                }
            }
            /**
             * Add data events.
             * For example when main series is updated we need to recalculate extremes
             *
             * @private
             * @function Highcharts.Navigator#addBaseSeriesEvent
             */
            addBaseSeriesEvents() {
                const navigator = this, baseSeries = navigator.baseSeries || [];
                // Bind modified extremes event to first base's xAxis only.
                // In event of > 1 base-xAxes, the navigator will ignore those.
                // Adding this multiple times to the same axis is no problem, as
                // duplicates should be discarded by the browser.
                if (baseSeries[0] && baseSeries[0].xAxis) {
                    baseSeries[0].eventsToUnbind.push(addEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes));
                }
                baseSeries.forEach((base) => {
                    // Link base series show/hide to navigator series visibility
                    base.eventsToUnbind.push(addEvent(base, 'show', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(true, false);
                        }
                    }));
                    base.eventsToUnbind.push(addEvent(base, 'hide', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(false, false);
                        }
                    }));
                    // Respond to updated data in the base series, unless explicitly
                    // not adapting to data changes.
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        if (base.xAxis) {
                            base.eventsToUnbind.push(addEvent(base, 'updatedData', this.updatedDataHandler));
                        }
                    }
                    // Handle series removal
                    base.eventsToUnbind.push(addEvent(base, 'remove', function () {
                        if (baseSeries) {
                            erase(baseSeries, base); // #21043
                        }
                        if (this.navigatorSeries) {
                            erase(navigator.series, this.navigatorSeries);
                            if (defined(this.navigatorSeries.options)) {
                                this.navigatorSeries.remove(false);
                            }
                            delete this.navigatorSeries;
                        }
                    }));
                });
            }
            /**
             * Get minimum from all base series connected to the navigator
             * @private
             * @param {number} currentSeriesMin
             *        Minium from the current series
             * @return {number}
             *         Minimum from all series
             */
            getBaseSeriesMin(currentSeriesMin) {
                return this.baseSeries.reduce(function (min, series) {
                    // (#10193)
                    return Math.min(min, series.xData && series.xData.length ?
                        series.xData[0] : min);
                }, currentSeriesMin);
            }
            /**
             * Set the navigator x axis extremes to reflect the total. The navigator
             * extremes should always be the extremes of the union of all series in the
             * chart as well as the navigator series.
             *
             * @private
             * @function Highcharts.Navigator#modifyNavigatorAxisExtremes
             */
            modifyNavigatorAxisExtremes() {
                const xAxis = this.xAxis;
                if (typeof xAxis.getExtremes !== 'undefined') {
                    const unionExtremes = this.getUnionExtremes(true);
                    if (unionExtremes &&
                        (unionExtremes.dataMin !== xAxis.min ||
                            unionExtremes.dataMax !== xAxis.max)) {
                        xAxis.min = unionExtremes.dataMin;
                        xAxis.max = unionExtremes.dataMax;
                    }
                }
            }
            /**
             * Hook to modify the base axis extremes with information from the Navigator
             *
             * @private
             * @function Highcharts.Navigator#modifyBaseAxisExtremes
             */
            modifyBaseAxisExtremes() {
                const baseXAxis = this, navigator = baseXAxis.chart.navigator, baseExtremes = baseXAxis.getExtremes(), baseMin = baseExtremes.min, baseMax = baseExtremes.max, baseDataMin = baseExtremes.dataMin, baseDataMax = baseExtremes.dataMax, range = baseMax - baseMin, stickToMin = navigator.stickToMin, stickToMax = navigator.stickToMax, overscroll = pick(baseXAxis.ordinal?.convertOverscroll(baseXAxis.options.overscroll), 0), navigatorSeries = navigator.series && navigator.series[0], hasSetExtremes = !!baseXAxis.setExtremes, 
                // When the extremes have been set by range selector button, don't
                // stick to min or max. The range selector buttons will handle the
                // extremes. (#5489)
                unmutable = baseXAxis.eventArgs &&
                    baseXAxis.eventArgs.trigger === 'rangeSelectorButton';
                let newMax, newMin;
                if (!unmutable) {
                    // If the zoomed range is already at the min, move it to the right
                    // as new data comes in
                    if (stickToMin) {
                        newMin = baseDataMin;
                        newMax = newMin + range;
                    }
                    // If the zoomed range is already at the max, move it to the right
                    // as new data comes in
                    if (stickToMax) {
                        newMax = baseDataMax + overscroll;
                        // If stickToMin is true, the new min value is set above
                        if (!stickToMin) {
                            newMin = Math.max(baseDataMin, // Don't go below data extremes (#13184)
                            newMax - range, navigator.getBaseSeriesMin(navigatorSeries && navigatorSeries.xData ?
                                navigatorSeries.xData[0] :
                                -Number.MAX_VALUE));
                        }
                    }
                    // Update the extremes
                    if (hasSetExtremes && (stickToMin || stickToMax)) {
                        if (isNumber(newMin)) {
                            baseXAxis.min = baseXAxis.userMin = newMin;
                            baseXAxis.max = baseXAxis.userMax = newMax;
                        }
                    }
                }
                // Reset
                navigator.stickToMin =
                    navigator.stickToMax = null;
            }
            /**
             * Handler for updated data on the base series. When data is modified, the
             * navigator series must reflect it. This is called from the Chart.redraw
             * function before axis and series extremes are computed.
             *
             * @private
             * @function Highcharts.Navigator#updateDataHandler
             */
            updatedDataHandler() {
                const navigator = this.chart.navigator, baseSeries = this, navigatorSeries = this.navigatorSeries, shouldStickToMax = navigator.reversedExtremes ?
                    Math.round(navigator.zoomedMin) === 0 :
                    Math.round(navigator.zoomedMax) >= Math.round(navigator.size);
                // If the scrollbar is scrolled all the way to the right, keep right as
                // new data comes in, unless user set navigator.stickToMax to false.
                navigator.stickToMax = pick(this.chart.options.navigator &&
                    this.chart.options.navigator.stickToMax, shouldStickToMax);
                navigator.stickToMin = navigator.shouldStickToMin(baseSeries, navigator);
                // Set the navigator series data to the new data of the base series
                if (navigatorSeries && !navigator.hasNavigatorData) {
                    navigatorSeries.options.pointStart = baseSeries.xData[0];
                    navigatorSeries.setData(baseSeries.options.data, false, null, false); // #5414
                }
            }
            /**
             * Detect if the zoomed area should stick to the minimum, #14742.
             *
             * @private
             * @function Highcharts.Navigator#shouldStickToMin
             */
            shouldStickToMin(baseSeries, navigator) {
                const xDataMin = navigator.getBaseSeriesMin(baseSeries.xData[0]), xAxis = baseSeries.xAxis, max = xAxis.max, min = xAxis.min, range = xAxis.options.range;
                let stickToMin = true;
                if (isNumber(max) && isNumber(min)) {
                    // If range declared, stick to the minimum only if the range
                    // is smaller than the data set range.
                    if (range && max - xDataMin > 0) {
                        stickToMin = max - xDataMin < range;
                    }
                    else {
                        // If the current axis minimum falls outside the new
                        // updated dataset, we must adjust.
                        stickToMin = min <= xDataMin;
                    }
                }
                else {
                    stickToMin = false; // #15864
                }
                return stickToMin;
            }
            /**
             * Add chart events, like redrawing navigator, when chart requires that.
             *
             * @private
             * @function Highcharts.Navigator#addChartEvents
             */
            addChartEvents() {
                if (!this.eventsToUnbind) {
                    this.eventsToUnbind = [];
                }
                this.eventsToUnbind.push(
                // Move the scrollbar after redraw, like after data updata even if
                // axes don't redraw
                addEvent(this.chart, 'redraw', function () {
                    const navigator = this.navigator, xAxis = navigator && (navigator.baseSeries &&
                        navigator.baseSeries[0] &&
                        navigator.baseSeries[0].xAxis ||
                        this.xAxis[0]); // #5709, #13114
                    if (xAxis) {
                        navigator.render(xAxis.min, xAxis.max);
                    }
                }), 
                // Make room for the navigator, can be placed around the chart:
                addEvent(this.chart, 'getMargins', function () {
                    const chart = this, navigator = chart.navigator;
                    let marginName = navigator.opposite ?
                        'plotTop' : 'marginBottom';
                    if (chart.inverted) {
                        marginName = navigator.opposite ?
                            'marginRight' : 'plotLeft';
                    }
                    chart[marginName] =
                        (chart[marginName] || 0) + (navigator.navigatorEnabled || !chart.inverted ?
                            navigator.height + navigator.scrollbarHeight :
                            0) + navigator.navigatorOptions.margin;
                }), addEvent(Navigator, 'setRange', function (e) {
                    this.chart.xAxis[0].setExtremes(e.min, e.max, e.redraw, e.animation, e.eventArguments);
                }));
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Navigator#destroy
             */
            destroy() {
                // Disconnect events added in addEvents
                this.removeEvents();
                if (this.xAxis) {
                    erase(this.chart.xAxis, this.xAxis);
                    erase(this.chart.axes, this.xAxis);
                }
                if (this.yAxis) {
                    erase(this.chart.yAxis, this.yAxis);
                    erase(this.chart.axes, this.yAxis);
                }
                // Destroy series
                (this.series || []).forEach((s) => {
                    if (s.destroy) {
                        s.destroy();
                    }
                });
                // Destroy properties
                [
                    'series', 'xAxis', 'yAxis', 'shades', 'outline', 'scrollbarTrack',
                    'scrollbarRifles', 'scrollbarGroup', 'scrollbar', 'navigatorGroup',
                    'rendered'
                ].forEach((prop) => {
                    if (this[prop] && this[prop].destroy) {
                        this[prop].destroy();
                    }
                    this[prop] = null;
                });
                // Destroy elements in collection
                [this.handles].forEach((coll) => {
                    destroyObjectProperties(coll);
                });
                this.navigatorEnabled = false;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Navigator;
    });
    _registerModule(_modules, 'Stock/Navigator/StandaloneNavigatorDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Mateusz Bernacik
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
        const standaloneNavigatorDefaults = {
            chart: {
                height: 70,
                margin: [0, 5, 0, 5]
            },
            exporting: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    marker: {
                        enabled: false
                    }
                }
            },
            scrollbar: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                height: 0,
                visible: false
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return standaloneNavigatorDefaults;
    });
    _registerModule(_modules, 'Stock/Navigator/StandaloneNavigator.js', [_modules['Core/Chart/Chart.js'], _modules['Stock/Navigator/Navigator.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Core/Axis/Axis.js'], _modules['Stock/Navigator/StandaloneNavigatorDefaults.js']], function (Chart, Navigator, G, U, Axis, standaloneNavigatorDefaults) {
        /* *
         *
         *  (c) 2010-2024 Mateusz Bernacik
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { merge, addEvent, fireEvent, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The StandaloneNavigator class. The StandaloneNavigator class allows for
         * creating a standalone navigator component that synchronizes the extremes
         * across multiple bound charts.
         *
         * @class
         * @name Highcharts.StandaloneNavigator
         *
         * @param {string|Highcharts.HTMLDOMElement} [renderTo]
         * The DOM element to render to, or its id.
         *
         * @param {StandaloneNavigatorOptions} userOptions
         * The standalone navigator options.
         */
        class StandaloneNavigator {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Factory function for standalone navigator.
             *
             * @function Highcharts.navigator
             *
             * @param {string|Highcharts.HTMLDOMElement} [renderTo]
             * The DOM element to render to, or its id.
             *
             * @param {StandaloneNavigatorOptions} options
             * The standalone navigator options with chart-like structure.
             *
             * Returns the navigator object.
             */
            static navigator(renderTo, options) {
                const nav = new StandaloneNavigator(renderTo, options);
                if (!G.navigators) {
                    G.navigators = [nav];
                }
                else {
                    G.navigators.push(nav);
                }
                return nav;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(element, userOptions) {
                this.boundAxes = [];
                this.userOptions = userOptions;
                this.chartOptions = merge(G.getOptions(), standaloneNavigatorDefaults, { navigator: userOptions });
                const chart = new Chart(element, this.chartOptions);
                chart.options = merge(chart.options, { navigator: { enabled: true }, scrollbar: { enabled: true } });
                if (this.chartOptions.navigator && this.chartOptions.scrollbar) {
                    this.chartOptions.navigator.enabled = true;
                    this.chartOptions.scrollbar.enabled = true;
                }
                this.navigator = new Navigator(chart);
                chart.navigator = this.navigator;
                this.initNavigator();
            }
            /**
             * Binds an axis to the standalone navigator,
             * allowing the navigator to control the axis' range.
             *
             * @sample stock/standalone-navigator/bind/
             *         Bind chart with a button
             *
             * @function Highcharts.StandaloneNavigator#bind
             *
             * @param {Axis | Chart} axisOrChart
             *        The Axis or Chart to bind to the navigator.
             *
             * @param {boolean} [twoWay=true]
             *        Enables two-way binding between the navigator and the axis/chart.
             *        When true, changes in the navigator's range will update the axis
             *        and vice versa. When false, changes in the navigator's range will
             *        be reflected in the axis, but changes in the axis ranges won't be
             *        reflected on the navigator.
             */
            bind(axisOrChart, twoWay = true) {
                const nav = this;
                // If the chart is passed, bind the first xAxis
                const axis = (axisOrChart instanceof Chart) ?
                    axisOrChart.xAxis[0] :
                    axisOrChart;
                if (!(axis instanceof Axis)) {
                    return;
                }
                const { min, max } = this.navigator.xAxis, removeEventCallbacks = [];
                if (twoWay) {
                    const removeSetExtremesEvent = addEvent(axis, 'setExtremes', (e) => {
                        if (e.trigger === 'pan' ||
                            e.trigger === 'zoom' ||
                            e.trigger === 'mouseWheelZoom') {
                            nav.setRange(e.min, e.max, true, e.trigger !== 'pan', { trigger: axis });
                        }
                    });
                    removeEventCallbacks.push(removeSetExtremesEvent);
                }
                const removeSetRangeEvent = addEvent(this.navigator, 'setRange', (e) => {
                    axis.setExtremes(e.min, e.max, e.redraw, e.animation);
                });
                removeEventCallbacks.push(removeSetRangeEvent);
                let boundAxis = this.boundAxes.filter(function (boundAxis) {
                    return boundAxis.axis === axis;
                })[0];
                if (!boundAxis) {
                    boundAxis = { axis, callbacks: [] };
                    this.boundAxes.push(boundAxis);
                }
                boundAxis.callbacks = removeEventCallbacks;
                // Show axis' series in navigator based on showInNavigator property
                axis.series.forEach((series) => {
                    if (series.options.showInNavigator) {
                        nav.addSeries(series.options);
                    }
                });
                // Set extremes to match the navigator's extremes
                axis.setExtremes(min, max);
                // Unbind the axis before it's destroyed
                addEvent(axis, 'destroy', (e) => {
                    if (!e.keepEvents) {
                        this.unbind(axis);
                    }
                });
            }
            /**
             * Unbinds a single axis or all bound axes from the standalone navigator.
             *
             * @sample stock/standalone-navigator/unbind/
             *         Unbind chart with a button
             *
             * @function Highcharts.StandaloneNavigator#unbind
             *
             * @param {Chart | Axis | undefined} axisOrChart
             *        Passing a Chart object unbinds the first X axis of the chart,
             *        an Axis object unbinds that specific axis,
             *        and undefined unbinds all axes bound to the navigator.
             */
            unbind(axisOrChart) {
                // If no axis or chart is provided, unbind all bound axes
                if (!axisOrChart) {
                    this.boundAxes.forEach(({ callbacks }) => {
                        callbacks.forEach((removeCallback) => removeCallback());
                    });
                    this.boundAxes.length = 0;
                    return;
                }
                const axis = (axisOrChart instanceof Axis) ?
                    axisOrChart :
                    axisOrChart.xAxis[0];
                for (let i = this.boundAxes.length - 1; i >= 0; i--) {
                    if (this.boundAxes[i].axis === axis) {
                        this.boundAxes[i].callbacks.forEach((callback) => callback());
                        this.boundAxes.splice(i, 1);
                    }
                }
            }
            /**
             * Destroys allocated standalone navigator elements.
             *
             * @function Highcharts.StandaloneNavigator#destroy
             */
            destroy() {
                // Disconnect events
                this.boundAxes.forEach(({ callbacks }) => {
                    callbacks.forEach((removeCallback) => removeCallback());
                });
                this.boundAxes.length = 0;
                this.navigator.destroy();
                this.navigator.chart.destroy();
            }
            /**
             * Updates the standalone navigator's options with a new set of user
             * options.
             *
             * @sample stock/standalone-navigator/update/
             *         Bind chart with a button
             *
             * @function Highcharts.StandaloneNavigator#update
             *
             * @param  {StandaloneNavigatorOptions} newOptions
             *         Updates the standalone navigator's options with new user options.
             *
             * @param  {boolean | undefined} redraw
             *         Whether to redraw the standalone navigator. By default, if not
             *         specified, the standalone navigator will be redrawn.
             */
            update(newOptions, redraw) {
                this.chartOptions = merge(this.chartOptions, { navigator: newOptions });
                this.navigator.chart.update(this.chartOptions, redraw);
            }
            /**
             * Redraws the standalone navigator.
             *
             * @function Highcharts.StandaloneNavigator#redraw
             */
            redraw() {
                this.navigator.chart.redraw();
            }
            /**
             * Adds a series to the standalone navigator.
             *
             * @private
             *
             * @param {SeriesOptions} seriesOptions
             *        Options for the series to be added to the navigator.
             */
            addSeries(seriesOptions) {
                this.navigator.chart.addSeries(merge(seriesOptions, { showInNavigator: pick(seriesOptions.showInNavigator, true) }));
                this.navigator.setBaseSeries();
            }
            /**
             * Initialize the standalone navigator.
             *
             * @private
             */
            initNavigator() {
                const nav = this.navigator;
                nav.top = 1;
                nav.xAxis.setScale();
                nav.yAxis.setScale();
                nav.xAxis.render();
                nav.yAxis.render();
                nav.series?.forEach((s) => {
                    s.translate();
                    s.render();
                    s.redraw();
                });
                const { min, max } = this.getInitialExtremes();
                nav.chart.xAxis[0].userMin = min;
                nav.chart.xAxis[0].userMax = max;
                nav.render(min, max);
            }
            /**
             * Get the current range of the standalone navigator.
             *
             * @sample stock/standalone-navigator/getrange/
             *         Report the standalone navigator's range by clicking on a button
             *
             * @function Highcharts.StandaloneNavigator#getRange
             *
             * @return {Highcharts.ExtremesObject}
             *         The current range of the standalone navigator.
             */
            getRange() {
                const { min, max } = this.navigator.chart.xAxis[0].getExtremes(), { userMin, userMax, min: dataMin, max: dataMax } = this.navigator.xAxis.getExtremes();
                return {
                    min: pick(min, dataMin),
                    max: pick(max, dataMax),
                    dataMin,
                    dataMax,
                    userMin,
                    userMax
                };
            }
            /**
             * Set the range of the standalone navigator.
             *
             * @sample stock/standalone-navigator/setrange/
             *         Set range from a button
             *
             * @function Highcharts.StandaloneNavigator#setRange
             *
             * @param {number | undefined} min
             *        The new minimum value.
             *
             * @param {number | undefined} max
             *        The new maximum value.
             *
             * @emits Highcharts.StandaloneNavigator#event:setRange
             */
            setRange(min, max, redraw, animation, eventArguments) {
                fireEvent(this.navigator, 'setRange', {
                    min,
                    max,
                    redraw,
                    animation,
                    eventArguments: merge(eventArguments, { trigger: 'navigator' })
                });
            }
            /**
             * Get the initial, options based extremes for the standalone navigator.
             *
             * @private
             *
             * @return {{ min: number, max: number }}
             *         The initial minimum and maximum extremes values.
             */
            getInitialExtremes() {
                const { min, max } = this.navigator.xAxis.getExtremes();
                return {
                    min: min,
                    max: max
                };
            }
        }
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Standalone Navigator options.
         *
         * @interface Highcharts.StandaloneNavigatorOptions
         */ /**
        */
        ''; // Detach doclets above

        return StandaloneNavigator;
    });
    _registerModule(_modules, 'masters/modules/navigator.src.js', [_modules['Core/Globals.js'], _modules['Stock/Navigator/StandaloneNavigator.js'], _modules['Stock/Navigator/NavigatorComposition.js']], function (Highcharts, StandaloneNavigator, NavigatorComposition) {

        const G = Highcharts;
        G.StandaloneNavigator = G.StandaloneNavigator || StandaloneNavigator;
        G.navigator = G.StandaloneNavigator.navigator;
        NavigatorComposition.compose(G.Chart, G.Axis, G.Series);

        return Highcharts;
    });
}));
