/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Arc diagram module
 *
 * (c) 2021 Piotr Madej
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('modules/arc-diagram', ['highcharts/modules/sankey'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/ArcDiagram/ArcDiagramPoint.js', [_modules['Series/NodesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (NodesComposition, SeriesRegistry, U) {
        /* *
         *
         *  Arc diagram module
         *
         *  (c) 2018-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes: { sankey: { prototype: { pointClass: SankeyPoint } } } } = SeriesRegistry;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
        class ArcDiagramPoint extends SankeyPoint {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            isValid() {
                // No null points here
                return true;
            }
        }
        extend(ArcDiagramPoint.prototype, {
            setState: NodesComposition.setNodeState
        });
        /* *
         *
         *  Default Export
         *
         * */

        return ArcDiagramPoint;
    });
    _registerModule(_modules, 'Series/ArcDiagram/ArcDiagramSeriesDefaults.js', [], function () {
        /* *
         *
         *  Arc diagram module
         *
         *  (c) 2021 Piotr Madej, Grzegorz Blachliński
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
         *  Arc diagram series is a chart drawing style in which
         *  the vertices of the chart are positioned along a line
         *  on the Euclidean plane and the edges are drawn as a semicircle
         *  in one of the two half-planes delimited by the line,
         *  or as smooth curves formed by sequences of semicircles.
         *
         * @sample highcharts/demo/arc-diagram/
         *         Arc Diagram
         *
         * @extends      plotOptions.sankey
         * @since 10.0.0
         * @product      highcharts
         * @requires     modules/arc-diagram
         * @exclude      curveFactor, connectEnds, connectNulls, colorAxis, colorKey,
         *               dataSorting, dragDrop, getExtremesFromAll, nodeAlignment,
         *               nodePadding, centerInCategory, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointStart,
         *               relativeXValue, softThreshold, stack, stacking, step,
         *               xAxis, yAxis
         * @optionparent plotOptions.arcdiagram
         */
        const ArcDiagramSeriesDefaults = {
            /**
             * The option to center links rather than position them one after
             * another
             *
             * @type    {boolean}
             * @since 10.0.0
             * @default false
             * @product highcharts
             */
            centeredLinks: false,
            /**
             * Whether nodes with different values should have the same size. If set
             * to true, all nodes are calculated based on the `nodePadding` and
             * current `plotArea`. It is possible to override it using the
             * `marker.radius` option.
             *
             * @type    {boolean}
             * @since 10.0.0
             * @default false
             * @product highcharts
             */
            equalNodes: false,
            /**
             * Options for the data labels appearing on top of the nodes and links.
             * For arc diagram charts, data labels are visible for the nodes by
             * default, but hidden for links. This is controlled by modifying the
             * `nodeFormat`, and the `format` that applies to links and is an empty
             * string by default.
             *
             * @declare Highcharts.SeriesArcDiagramDataLabelsOptionsObject
             *
             * @private
             */
            dataLabels: {
                /**
                 * Options for a _link_ label text which should follow link
                 * connection. Border and background are disabled for a label that
                 * follows a path.
                 *
                 * **Note:** Only SVG-based renderer supports this option. Setting
                 * `useHTML` to true will disable this option.
                 *
                 * @extends plotOptions.networkgraph.dataLabels.linkTextPath
                 * @since 10.0.0
                 */
                linkTextPath: {
                    /**
                     * @type    {Highcharts.SVGAttributes}
                     * @default {"startOffset":"25%"}
                     */
                    attributes: {
                        /**
                         * @ignore-option
                         */
                        startOffset: '25%'
                    }
                }
            },
            /**
             * The radius of the link arc. If not set, series renders a semi-circle
             * between the nodes, except when overflowing the edge of the plot area,
             * in which case an arc touching the edge is rendered. If `linkRadius`
             * is set, an arc extending to the given value is rendered.
             *
             * @type    {number}
             * @since 10.0.0
             * @default undefined
             * @product highcharts
             * @apioption series.arcdiagram.linkRadius
             */
            /**
             * The global link weight, in pixels. If not set, width is calculated
             * per link, depending on the weight value.
             *
             * @sample highcharts/series-arcdiagram/link-weight
             *         Link weight
             *
             * @type    {number}
             * @since 10.0.0
             * @default undefined
             * @product highcharts
             * @apioption series.arcdiagram.linkWeight
             */
            /**
             * @extends   plotOptions.series.marker
             * @excluding enabled, enabledThreshold, height, width
             */
            marker: {
                fillOpacity: 1,
                lineWidth: 0,
                states: {},
                symbol: 'circle'
            },
            /**
             * The offset of an arc diagram nodes column in relation to the
             * `plotArea`. The offset equal to 50% places nodes in the center of a
             * chart. By default the series is placed so that the biggest node is
             * touching the bottom border of the `plotArea`.
             *
             * @type    {string}
             * @since 10.0.0
             * @default '100%'
             * @product highcharts
             * @apioption series.arcdiagram.offset
             */
            offset: '100%',
            /**
             * Whether the series should be placed on the other side of the
             * `plotArea`.
             *
             * @type    {boolean}
             * @since 10.0.0
             * @default false
             * @product highcharts
             */
            reversed: false
        };
        /**
         * An `arcdiagram` series. If the [type](#series.arcdiagram.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.arcdiagram
         * @exclude   dataSorting, boostThreshold, boostBlending, curveFactor,
         *            connectEnds, connectNulls, colorAxis, colorKey, dataSorting,
         *            dragDrop, getExtremesFromAll, nodePadding, centerInCategory,
         *            pointInterval, pointIntervalUnit, pointPlacement,
         *            pointStart, relativeXValue, softThreshold, stack,
         *            stacking, step, xAxis, yAxis
         * @product   highcharts
         * @requires  modules/sankey
         * @requires  modules/arc-diagram
         * @apioption series.arcdiagram
         */
        /**
         * @extends   plotOptions.series.marker
         * @excluding enabled, enabledThreshold, height, radius, width
         * @apioption series.arcdiagram.marker
         */
        /**
         * @type      {Highcharts.SeriesArcDiagramDataLabelsOptionsObject|Array<Highcharts.SeriesArcDiagramDataLabelsOptionsObject>}
         * @product   highcharts
         * @apioption series.arcdiagram.data.dataLabels
         */
        /**
         * A collection of options for the individual nodes. The nodes in an arc diagram
         * are auto-generated instances of `Highcharts.Point`, but options can be
         * applied here and linked by the `id`.
         *
         * @extends   series.sankey.nodes
         * @type      {Array<*>}
         * @product   highcharts
         * @excluding column, level
         * @apioption series.arcdiagram.nodes
         */
        /**
         * Individual data label for each node. The options are the same as the ones for
         * [series.arcdiagram.dataLabels](#series.arcdiagram.dataLabels).
         *
         * @type
         * {Highcharts.SeriesArcDiagramDataLabelsOptionsObject|Array<Highcharts.SeriesArcDiagramDataLabelsOptionsObject>}
         *
         * @apioption series.arcdiagram.nodes.dataLabels
         */
        /**
         * Individual data label for each node. The options are the same as the ones for
         * [series.arcdiagram.dataLabels](#series.arcdiagram.dataLabels).
         *
         * @type
         * {Highcharts.SeriesArcDiagramDataLabelsOptionsObject|Array<Highcharts.SeriesArcDiagramDataLabelsOptionsObject>}
         *
         */
        /**
         * An array of data points for the series. For the `arcdiagram` series type,
         * points can be given in the following way:
         *
         * An array of objects with named values. The following snippet shows only a few
         * settings, see the complete options set below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.area.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         from: 'Category1',
         *         to: 'Category2',
         *         weight: 2
         *     }, {
         *         from: 'Category1',
         *         to: 'Category3',
         *         weight: 5
         *     }]
         *  ```
         *
         * @type      {Array<*>}
         * @extends   series.sankey.data
         * @product   highcharts
         * @excluding outgoing, dataLabels
         * @apioption series.arcdiagram.data
         */
        ''; // Adds doclets above to the transpiled file
        /* *
         *
         *  Default Export
         *
         * */

        return ArcDiagramSeriesDefaults;
    });
    _registerModule(_modules, 'Core/Foundation.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, isFunction, objectEach, removeEvent } = U;
        /* *
         *
         *  Class Namespace
         *
         * */
        var Foundation;
        (function (Foundation) {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Register event options. If an event handler is set on the options, it
             * should be subject to Chart.update, Axis.update and Series.update. This is
             * contrary to general handlers that are set directly using addEvent either
             * on the class or on the instance. #6538, #6943, #10861.
             * @private
             */
            function registerEventOptions(component, options) {
                // A lookup over those events that are added by _options_ (not
                // programmatically). These are updated through .update()
                component.eventOptions = component.eventOptions || {};
                // Register event listeners
                objectEach(options.events, function (event, eventType) {
                    // If event does not exist, or is changed by the .update()
                    // function
                    if (component.eventOptions[eventType] !== event) {
                        // Remove existing if set by option
                        if (component.eventOptions[eventType]) {
                            removeEvent(component, eventType, component.eventOptions[eventType]);
                            delete component.eventOptions[eventType];
                        }
                        if (isFunction(event)) {
                            component.eventOptions[eventType] = event;
                            addEvent(component, eventType, event, {
                                order: 0 // #14080 fire those events as firsts
                            });
                        }
                    }
                });
            }
            Foundation.registerEventOptions = registerEventOptions;
        })(Foundation || (Foundation = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Foundation;
    });
    _registerModule(_modules, 'Core/Legend/LegendSymbol.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { extend, merge, pick } = U;
        /* *
         *
         *  Namespace
         *
         * */
        var LegendSymbol;
        (function (LegendSymbol) {
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Draw a line, a point marker and an area in the legend.
             *
             * @private
             * @function Highcharts.LegendSymbolMixin.areaMarker
             *
             * @param {Highcharts.Legend} legend
             * The legend object.
             */
            function areaMarker(legend, item) {
                lineMarker.call(this, legend, item, true);
            }
            LegendSymbol.areaMarker = areaMarker;
            /**
             * Draw a line and a point marker in the legend.
             *
             * @private
             * @function Highcharts.LegendSymbolMixin.lineMarker
             *
             * @param {Highcharts.Legend} legend
             * The legend object.
             */
            function lineMarker(legend, item, hasArea) {
                const legendItem = this.legendItem = this.legendItem || {}, { chart, options } = this, { baseline = 0, symbolWidth, symbolHeight } = legend, symbol = this.symbol || 'circle', generalRadius = symbolHeight / 2, renderer = chart.renderer, legendItemGroup = legendItem.group, verticalCenter = baseline - Math.round(symbolHeight *
                    // Render line and marker slightly higher to make room for the
                    // area
                    (hasArea ? 0.4 : 0.3)), attr = {};
                let legendSymbol, markerOptions = options.marker, lineSizer = 0;
                // Draw the line
                if (!chart.styledMode) {
                    attr['stroke-width'] = Math.min(options.lineWidth || 0, 24);
                    if (options.dashStyle) {
                        attr.dashstyle = options.dashStyle;
                    }
                    else if (options.linecap !== 'square') {
                        attr['stroke-linecap'] = 'round';
                    }
                }
                legendItem.line = renderer
                    .path()
                    .addClass('highcharts-graph')
                    .attr(attr)
                    .add(legendItemGroup);
                if (hasArea) {
                    legendItem.area = renderer
                        .path()
                        .addClass('highcharts-area')
                        .add(legendItemGroup);
                }
                if (attr['stroke-linecap']) {
                    lineSizer = Math.min(legendItem.line.strokeWidth(), symbolWidth) / 2;
                }
                if (symbolWidth) {
                    const d = [
                        ['M', lineSizer, verticalCenter],
                        ['L', symbolWidth - lineSizer, verticalCenter]
                    ];
                    legendItem.line.attr({ d });
                    legendItem.area?.attr({
                        d: [
                            ...d,
                            ['L', symbolWidth - lineSizer, baseline],
                            ['L', lineSizer, baseline]
                        ]
                    });
                }
                // Draw the marker
                if (markerOptions && markerOptions.enabled !== false && symbolWidth) {
                    // Do not allow the marker to be larger than the symbolHeight
                    let radius = Math.min(pick(markerOptions.radius, generalRadius), generalRadius);
                    // Restrict symbol markers size
                    if (symbol.indexOf('url') === 0) {
                        markerOptions = merge(markerOptions, {
                            width: symbolHeight,
                            height: symbolHeight
                        });
                        radius = 0;
                    }
                    legendItem.symbol = legendSymbol = renderer
                        .symbol(symbol, (symbolWidth / 2) - radius, verticalCenter - radius, 2 * radius, 2 * radius, extend({ context: 'legend' }, markerOptions))
                        .addClass('highcharts-point')
                        .add(legendItemGroup);
                    legendSymbol.isMarker = true;
                }
            }
            LegendSymbol.lineMarker = lineMarker;
            /**
             * Get the series' symbol in the legend.
             *
             * This method should be overridable to create custom symbols through
             * Highcharts.seriesTypes[type].prototype.drawLegendSymbol.
             *
             * @private
             * @function Highcharts.LegendSymbolMixin.rectangle
             *
             * @param {Highcharts.Legend} legend
             * The legend object
             *
             * @param {Highcharts.Point|Highcharts.Series} item
             * The series (this) or point
             */
            function rectangle(legend, item) {
                const legendItem = item.legendItem || {}, options = legend.options, symbolHeight = legend.symbolHeight, square = options.squareSymbol, symbolWidth = square ? symbolHeight : legend.symbolWidth;
                legendItem.symbol = this.chart.renderer
                    .rect(square ? (legend.symbolWidth - symbolHeight) / 2 : 0, legend.baseline - symbolHeight + 1, // #3988
                symbolWidth, symbolHeight, pick(legend.options.symbolRadius, symbolHeight / 2))
                    .addClass('highcharts-point')
                    .attr({
                    zIndex: 3
                })
                    .add(legendItem.group);
            }
            LegendSymbol.rectangle = rectangle;
        })(LegendSymbol || (LegendSymbol = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return LegendSymbol;
    });
    _registerModule(_modules, 'Core/Series/SeriesDefaults.js', [], function () {
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
         *  API Options
         *
         * */
        /**
         * General options for all series types.
         *
         * @optionparent plotOptions.series
         */
        const seriesDefaults = {
            // Base series options
            /**
             * The SVG value used for the `stroke-linecap` and `stroke-linejoin`
             * of a line graph. Round means that lines are rounded in the ends and
             * bends.
             *
             * @type       {Highcharts.SeriesLinecapValue}
             * @default    round
             * @since      3.0.7
             * @apioption  plotOptions.line.linecap
             */
            /**
             * Pixel width of the graph line.
             *
             * @see In styled mode, the line stroke-width can be set with the
             *      `.highcharts-graph` class name.
             *
             * @sample {highcharts} highcharts/plotoptions/series-linewidth-general/
             *         On all series
             * @sample {highcharts} highcharts/plotoptions/series-linewidth-specific/
             *         On one single series
             *
             * @product highcharts highstock
             */
            lineWidth: 2,
            /**
             * For some series, there is a limit that shuts down animation
             * by default when the total number of points in the chart is too high.
             * For example, for a column chart and its derivatives, animation does
             * not run if there is more than 250 points totally. To disable this
             * cap, set `animationLimit` to `Infinity`. This option works if animation
             * is fired on individual points, not on a group of points like e.g. during
             * the initial animation.
             *
             * @sample {highcharts} highcharts/plotoptions/series-animationlimit/
             *         Animation limit on updating individual points
             *
             * @type      {number}
             * @apioption plotOptions.series.animationLimit
             */
            /**
             * Allow this series' points to be selected by clicking on the graphic
             * (columns, point markers, pie slices, map areas etc).
             *
             * The selected points can be handled by point select and unselect
             * events, or collectively by the [getSelectedPoints
             * ](/class-reference/Highcharts.Chart#getSelectedPoints) function.
             *
             * And alternative way of selecting points is through dragging.
             *
             * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-line/
             *         Line
             * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-column/
             *         Column
             * @sample {highcharts} highcharts/plotoptions/series-allowpointselect-pie/
             *         Pie
             * @sample {highcharts} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             * @sample {highmaps} maps/plotoptions/series-allowpointselect/
             *         Map area
             * @sample {highmaps} maps/plotoptions/mapbubble-allowpointselect/
             *         Map bubble
             *
             * @since 1.2.0
             *
             * @private
             */
            allowPointSelect: false,
            /**
             * When true, each point or column edge is rounded to its nearest pixel
             * in order to render sharp on screen. In some cases, when there are a
             * lot of densely packed columns, this leads to visible difference
             * in column widths or distance between columns. In these cases,
             * setting `crisp` to `false` may look better, even though each column
             * is rendered blurry.
             *
             * @sample {highcharts} highcharts/plotoptions/column-crisp-false/
             *         Crisp is false
             *
             * @since   5.0.10
             * @product highcharts highstock gantt
             *
             * @private
             */
            crisp: true,
            /**
             * If true, a checkbox is displayed next to the legend item to allow
             * selecting the series. The state of the checkbox is determined by
             * the `selected` option.
             *
             * @productdesc {highmaps}
             * Note that if a `colorAxis` is defined, the color axis is represented
             * in the legend, not the series.
             *
             * @sample {highcharts} highcharts/plotoptions/series-showcheckbox-true/
             *         Show select box
             *
             * @since 1.2.0
             *
             * @private
             */
            showCheckbox: false,
            /**
             * Enable or disable the initial animation when a series is displayed.
             * The animation can also be set as a configuration object. Please
             * note that this option only applies to the initial animation of the
             * series itself. For other animations, see [chart.animation](
             * #chart.animation) and the animation parameter under the API methods.
             * The following properties are supported:
             *
             * - `defer`: The animation delay time in milliseconds.
             *
             * - `duration`: The duration of the animation in milliseconds. (Defaults to
             *   `1000`)
             *
             * - `easing`: Can be a string reference to an easing function set on
             *   the `Math` object or a function. See the _Custom easing function_
             *   demo below. (Defaults to `easeInOutSine`)
             *
             * Due to poor performance, animation is disabled in old IE browsers
             * for several chart types.
             *
             * @sample {highcharts} highcharts/plotoptions/series-animation-disabled/
             *         Animation disabled
             * @sample {highcharts} highcharts/plotoptions/series-animation-slower/
             *         Slower animation
             * @sample {highcharts} highcharts/plotoptions/series-animation-easing/
             *         Custom easing function
             * @sample {highstock} stock/plotoptions/animation-slower/
             *         Slower animation
             * @sample {highstock} stock/plotoptions/animation-easing/
             *         Custom easing function
             * @sample {highmaps} maps/plotoptions/series-animation-true/
             *         Animation enabled on map series
             * @sample {highmaps} maps/plotoptions/mapbubble-animation-false/
             *         Disabled on mapbubble series
             *
             * @type    {boolean|Highcharts.AnimationOptionsObject}
             * @default {highcharts} true
             * @default {highstock} true
             * @default {highmaps} false
             *
             * @private
             */
            animation: {
                /** @ignore-option */
                duration: 1000
            },
            /**
             * An additional class name to apply to the series' graphical elements.
             * This option does not replace default class names of the graphical
             * element. Changes to the series' color will also be reflected in a
             * chart's legend and tooltip.
             *
             * @sample {highcharts} highcharts/css/point-series-classname
             *         Series and point class name
             *
             * @type      {string}
             * @since     5.0.0
             * @apioption plotOptions.series.className
             */
            /**
             * Disable this option to allow series rendering in the whole plotting
             * area.
             *
             * **Note:** Clipping should be always enabled when
             * [chart.zoomType](#chart.zoomType) is set
             *
             * @sample {highcharts} highcharts/plotoptions/series-clip/
             *         Disabled clipping
             *
             * @default   true
             * @type      {boolean}
             * @since     3.0.0
             * @apioption plotOptions.series.clip
             */
            /**
             * The main color of the series. In line type series it applies to the
             * line and the point markers unless otherwise specified. In bar type
             * series it applies to the bars unless a color is specified per point.
             * The default value is pulled from the `options.colors` array.
             *
             * In styled mode, the color can be defined by the
             * [colorIndex](#plotOptions.series.colorIndex) option. Also, the series
             * color can be set with the `.highcharts-series`,
             * `.highcharts-color-{n}`, `.highcharts-{type}-series` or
             * `.highcharts-series-{n}` class, or individual classes given by the
             * `className` option.
             *
             * @productdesc {highmaps}
             * In maps, the series color is rarely used, as most choropleth maps use
             * the color to denote the value of each point. The series color can
             * however be used in a map with multiple series holding categorized
             * data.
             *
             * @sample {highcharts} highcharts/plotoptions/series-color-general/
             *         General plot option
             * @sample {highcharts} highcharts/plotoptions/series-color-specific/
             *         One specific series
             * @sample {highcharts} highcharts/plotoptions/series-color-area/
             *         Area color
             * @sample {highcharts} highcharts/series/infographic/
             *         Pattern fill
             * @sample {highmaps} maps/demo/category-map/
             *         Category map by multiple series
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption plotOptions.series.color
             */
            /**
             * Styled mode only. A specific color index to use for the series, so its
             * graphic representations are given the class name `highcharts-color-{n}`.
             *
             * Since v11, CSS variables on the form `--highcharts-color-{n}` make
             * changing the color scheme very convenient.
             *
             * @sample    {highcharts} highcharts/css/colorindex/ Series and point color
             *            index
             *
             * @type      {number}
             * @since     5.0.0
             * @apioption plotOptions.series.colorIndex
             */
            /**
             * Whether to connect a graph line across null points, or render a gap
             * between the two points on either side of the null.
             *
             * In stacked area chart, if `connectNulls` is set to true,
             * null points are interpreted as 0.
             *
             * @sample {highcharts} highcharts/plotoptions/series-connectnulls-false/
             *         False by default
             * @sample {highcharts} highcharts/plotoptions/series-connectnulls-true/
             *         True
             *
             * @type      {boolean}
             * @default   false
             * @product   highcharts highstock
             * @apioption plotOptions.series.connectNulls
             */
            /**
             * You can set the cursor to "pointer" if you have click events attached
             * to the series, to signal to the user that the points and lines can
             * be clicked.
             *
             * In styled mode, the series cursor can be set with the same classes
             * as listed under [series.color](#plotOptions.series.color).
             *
             * @sample {highcharts} highcharts/plotoptions/series-cursor-line/
             *         On line graph
             * @sample {highcharts} highcharts/plotoptions/series-cursor-column/
             *         On columns
             * @sample {highcharts} highcharts/plotoptions/series-cursor-scatter/
             *         On scatter markers
             * @sample {highstock} stock/plotoptions/cursor/
             *         Pointer on a line graph
             * @sample {highmaps} maps/plotoptions/series-allowpointselect/
             *         Map area
             * @sample {highmaps} maps/plotoptions/mapbubble-allowpointselect/
             *         Map bubble
             *
             * @type      {string|Highcharts.CursorValue}
             * @apioption plotOptions.series.cursor
             */
            /**
             * A reserved subspace to store options and values for customized
             * functionality. Here you can add additional data for your own event
             * callbacks and formatter callbacks.
             *
             * @sample {highcharts} highcharts/point/custom/
             *         Point and series with custom data
             *
             * @type      {Highcharts.Dictionary<*>}
             * @apioption plotOptions.series.custom
             */
            /**
             * Name of the dash style to use for the graph, or for some series types
             * the outline of each shape.
             *
             * In styled mode, the
             * [stroke dash-array](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/css/series-dashstyle/)
             * can be set with the same classes as listed under
             * [series.color](#plotOptions.series.color).
             *
             * @sample {highcharts} highcharts/plotoptions/series-dashstyle-all/
             *         Possible values demonstrated
             * @sample {highcharts} highcharts/plotoptions/series-dashstyle/
             *         Chart suitable for printing in black and white
             * @sample {highstock} highcharts/plotoptions/series-dashstyle-all/
             *         Possible values demonstrated
             * @sample {highmaps} highcharts/plotoptions/series-dashstyle-all/
             *         Possible values demonstrated
             * @sample {highmaps} maps/plotoptions/series-dashstyle/
             *         Dotted borders on a map
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Solid
             * @since     2.1
             * @apioption plotOptions.series.dashStyle
             */
            /**
             * A description of the series to add to the screen reader information
             * about the series.
             *
             * @type      {string}
             * @since     5.0.0
             * @requires  modules/accessibility
             * @apioption plotOptions.series.description
             */
            /**
             * Options for the series data sorting.
             *
             * @type      {Highcharts.DataSortingOptionsObject}
             * @since     8.0.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.dataSorting
             */
            /**
             * Enable or disable data sorting for the series. Use [xAxis.reversed](
             * #xAxis.reversed) to change the sorting order.
             *
             * @sample {highcharts} highcharts/datasorting/animation/
             *         Data sorting in scatter-3d
             * @sample {highcharts} highcharts/datasorting/labels-animation/
             *         Axis labels animation
             * @sample {highcharts} highcharts/datasorting/dependent-sorting/
             *         Dependent series sorting
             * @sample {highcharts} highcharts/datasorting/independent-sorting/
             *         Independent series sorting
             *
             * @type      {boolean}
             * @since     8.0.0
             * @apioption plotOptions.series.dataSorting.enabled
             */
            /**
             * Whether to allow matching points by name in an update. If this option
             * is disabled, points will be matched by order.
             *
             * @sample {highcharts} highcharts/datasorting/match-by-name/
             *         Enabled match by name
             *
             * @type      {boolean}
             * @since     8.0.0
             * @apioption plotOptions.series.dataSorting.matchByName
             */
            /**
             * Determines what data value should be used to sort by.
             *
             * @sample {highcharts} highcharts/datasorting/sort-key/
             *         Sort key as `z` value
             *
             * @type      {string}
             * @since     8.0.0
             * @default   y
             * @apioption plotOptions.series.dataSorting.sortKey
             */
            /**
             * Enable or disable the mouse tracking for a specific series. This
             * includes point tooltips and click events on graphs and points. For
             * large datasets it improves performance.
             *
             * @sample {highcharts} highcharts/plotoptions/series-enablemousetracking-false/
             *         No mouse tracking
             * @sample {highmaps} maps/plotoptions/series-enablemousetracking-false/
             *         No mouse tracking
             *
             * @type      {boolean}
             * @default   true
             * @apioption plotOptions.series.enableMouseTracking
             */
            enableMouseTracking: true,
            /**
             * Whether to use the Y extremes of the total chart width or only the
             * zoomed area when zooming in on parts of the X axis. By default, the
             * Y axis adjusts to the min and max of the visible data. Cartesian
             * series only.
             *
             * @type      {boolean}
             * @default   false
             * @since     4.1.6
             * @product   highcharts highstock gantt
             * @apioption plotOptions.series.getExtremesFromAll
             */
            /**
             * Highlight only the hovered point and fade the remaining points.
             *
             * Scatter-type series require enabling the 'inactive' marker state and
             * adjusting opacity. Note that this approach could affect performance
             * with large datasets.
             *
             * @sample {highcharts} highcharts/plotoptions/series-inactiveotherpoints-enabled/
             *         Chart with inactiveOtherPoints option enabled.
             *
             * @type      {boolean}
             * @default   false
             * @apioption plotOptions.series.inactiveOtherPoints
             */
            /**
             * An array specifying which option maps to which key in the data point
             * array. This makes it convenient to work with unstructured data arrays
             * from different sources.
             *
             * @see [series.data](#series.line.data)
             *
             * @sample {highcharts|highstock} highcharts/series/data-keys/
             *         An extended data array with keys
             * @sample {highcharts|highstock} highcharts/series/data-nested-keys/
             *         Nested keys used to access object properties
             *
             * @type      {Array<string>}
             * @since     4.1.6
             * @apioption plotOptions.series.keys
             */
            /**
             * The line cap used for line ends and line joins on the graph.
             *
             * @sample highcharts/series-line/linecap/
             *         Line cap comparison
             *
             * @type       {Highcharts.SeriesLinecapValue}
             * @default    round
             * @product    highcharts highstock
             * @apioption  plotOptions.series.linecap
             */
            /**
             * The [id](#series.id) of another series to link to. Additionally,
             * the value can be ":previous" to link to the previous series. When
             * two series are linked, only the first one appears in the legend.
             * Toggling the visibility of this also toggles the linked series.
             *
             * If master series uses data sorting and linked series does not have
             * its own sorting definition, the linked series will be sorted in the
             * same order as the master one.
             *
             * @sample {highcharts|highstock} highcharts/demo/arearange-line/
             *         Linked series
             *
             * @type      {string}
             * @since     3.0
             * @product   highcharts highstock gantt
             * @apioption plotOptions.series.linkedTo
             */
            /**
             * Options for the corresponding navigator series if `showInNavigator`
             * is `true` for this series. Available options are the same as any
             * series, documented at [plotOptions](#plotOptions.series) and
             * [series](#series).
             *
             * These options are merged with options in [navigator.series](
             * #navigator.series), and will take precedence if the same option is
             * defined both places.
             *
             * @see [navigator.series](#navigator.series)
             *
             * @type      {Highcharts.PlotSeriesOptions}
             * @since     5.0.0
             * @product   highstock
             * @apioption plotOptions.series.navigatorOptions
             */
            /**
             * The color for the parts of the graph or points that are below the
             * [threshold](#plotOptions.series.threshold). Note that `zones` takes
             * precedence over the negative color. Using `negativeColor` is
             * equivalent to applying a zone with value of 0.
             *
             * @see In styled mode, a negative color is applied by setting this option
             *      to `true` combined with the `.highcharts-negative` class name.
             *
             * @sample {highcharts} highcharts/plotoptions/series-negative-color/
             *         Spline, area and column
             * @sample {highcharts} highcharts/plotoptions/arearange-negativecolor/
             *         Arearange
             * @sample {highcharts} highcharts/css/series-negative-color/
             *         Styled mode
             * @sample {highstock} highcharts/plotoptions/series-negative-color/
             *         Spline, area and column
             * @sample {highstock} highcharts/plotoptions/arearange-negativecolor/
             *         Arearange
             * @sample {highmaps} highcharts/plotoptions/series-negative-color/
             *         Spline, area and column
             * @sample {highmaps} highcharts/plotoptions/arearange-negativecolor/
             *         Arearange
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     3.0
             * @apioption plotOptions.series.negativeColor
             */
            /**
             * Same as
             * [accessibility.point.descriptionFormat](#accessibility.point.descriptionFormat),
             * but for an individual series. Overrides the chart wide configuration.
             *
             * @type      {Function}
             * @since 11.1.0
             * @apioption plotOptions.series.pointDescriptionFormat
             */
            /**
             * Same as
             * [accessibility.series.descriptionFormatter](#accessibility.series.descriptionFormatter),
             * but for an individual series. Overrides the chart wide configuration.
             *
             * @type      {Function}
             * @since     5.0.12
             * @apioption plotOptions.series.pointDescriptionFormatter
             */
            /**
             * If no x values are given for the points in a series, `pointInterval`
             * defines the interval of the x values. For example, if a series
             * contains one value every decade starting from year 0, set
             * `pointInterval` to `10`. In true `datetime` axes, the `pointInterval`
             * is set in milliseconds.
             *
             * It can be also be combined with `pointIntervalUnit` to draw irregular
             * time intervals.
             *
             * If combined with `relativeXValue`, an x value can be set on each
             * point, and the `pointInterval` is added x times to the `pointStart`
             * setting.
             *
             * Please note that this options applies to the _series data_, not the
             * interval of the axis ticks, which is independent.
             *
             * @sample {highcharts} highcharts/plotoptions/series-pointstart-datetime/
             *         Datetime X axis
             * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
             *         Relative x value
             * @sample {highstock} stock/plotoptions/pointinterval-pointstart/
             *         Using pointStart and pointInterval
             * @sample {highstock} stock/plotoptions/relativexvalue/
             *         Relative x value
             *
             * @type      {number}
             * @default   1
             * @product   highcharts highstock gantt
             * @apioption plotOptions.series.pointInterval
             */
            /**
             * On datetime series, this allows for setting the
             * [pointInterval](#plotOptions.series.pointInterval) to irregular time
             * units, `day`, `month` and `year`. A day is usually the same as 24
             * hours, but `pointIntervalUnit` also takes the DST crossover into
             * consideration when dealing with local time. Combine this option with
             * `pointInterval` to draw weeks, quarters, 6 months, 10 years etc.
             *
             * Please note that this options applies to the _series data_, not the
             * interval of the axis ticks, which is independent.
             *
             * @sample {highcharts} highcharts/plotoptions/series-pointintervalunit/
             *         One point a month
             * @sample {highstock} highcharts/plotoptions/series-pointintervalunit/
             *         One point a month
             *
             * @type       {string}
             * @since      4.1.0
             * @product    highcharts highstock gantt
             * @validvalue ["day", "month", "year"]
             * @apioption  plotOptions.series.pointIntervalUnit
             */
            /**
             * Possible values: `"on"`, `"between"`, `number`.
             *
             * In a column chart, when pointPlacement is `"on"`, the point will not
             * create any padding of the X axis. In a polar column chart this means
             * that the first column points directly north. If the pointPlacement is
             * `"between"`, the columns will be laid out between ticks. This is
             * useful for example for visualising an amount between two points in
             * time or in a certain sector of a polar chart.
             *
             * Since Highcharts 3.0.2, the point placement can also be numeric,
             * where 0 is on the axis value, -0.5 is between this value and the
             * previous, and 0.5 is between this value and the next. Unlike the
             * textual options, numeric point placement options won't affect axis
             * padding.
             *
             * Note that pointPlacement needs a [pointRange](
             * #plotOptions.series.pointRange) to work. For column series this is
             * computed, but for line-type series it needs to be set.
             *
             * For the `xrange` series type and gantt charts, if the Y axis is a
             * category axis, the `pointPlacement` applies to the Y axis rather than
             * the (typically datetime) X axis.
             *
             * Defaults to `undefined` in cartesian charts, `"between"` in polar
             * charts.
             *
             * @see [xAxis.tickmarkPlacement](#xAxis.tickmarkPlacement)
             *
             * @sample {highcharts|highstock} highcharts/plotoptions/series-pointplacement-between/
             *         Between in a column chart
             * @sample {highcharts|highstock} highcharts/plotoptions/series-pointplacement-numeric/
             *         Numeric placement for custom layout
             * @sample {highcharts|highstock} maps/plotoptions/heatmap-pointplacement/
             *         Placement in heatmap
             *
             * @type      {string|number}
             * @since     2.3.0
             * @product   highcharts highstock gantt
             * @apioption plotOptions.series.pointPlacement
             */
            /**
             * If no x values are given for the points in a series, pointStart
             * defines on what value to start. For example, if a series contains one
             * yearly value starting from 1945, set pointStart to 1945.
             *
             * If combined with `relativeXValue`, an x value can be set on each
             * point. The x value from the point options is multiplied by
             * `pointInterval` and added to `pointStart` to produce a modified x
             * value.
             *
             * @sample {highcharts} highcharts/plotoptions/series-pointstart-linear/
             *         Linear
             * @sample {highcharts} highcharts/plotoptions/series-pointstart-datetime/
             *         Datetime
             * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
             *         Relative x value
             * @sample {highstock} stock/plotoptions/pointinterval-pointstart/
             *         Using pointStart and pointInterval
             * @sample {highstock} stock/plotoptions/relativexvalue/
             *         Relative x value
             *
             * @type      {number}
             * @default   0
             * @product   highcharts highstock gantt
             * @apioption plotOptions.series.pointStart
             */
            /**
             * When true, X values in the data set are relative to the current
             * `pointStart`, `pointInterval` and `pointIntervalUnit` settings. This
             * allows compression of the data for datasets with irregular X values.
             *
             * The real X values are computed on the formula `f(x) = ax + b`, where
             * `a` is the `pointInterval` (optionally with a time unit given by
             * `pointIntervalUnit`), and `b` is the `pointStart`.
             *
             * @sample {highcharts} highcharts/plotoptions/series-relativexvalue/
             *         Relative X value
             * @sample {highstock} stock/plotoptions/relativexvalue/
             *         Relative X value
             *
             * @type      {boolean}
             * @default   false
             * @product   highcharts highstock
             * @apioption plotOptions.series.relativeXValue
             */
            /**
             * Whether to select the series initially. If `showCheckbox` is true,
             * the checkbox next to the series name in the legend will be checked
             * for a selected series.
             *
             * @sample {highcharts} highcharts/plotoptions/series-selected/
             *         One out of two series selected
             *
             * @type      {boolean}
             * @default   false
             * @since     1.2.0
             * @apioption plotOptions.series.selected
             */
            /**
             * Whether to apply a drop shadow to the graph line. Since 2.3 the
             * shadow can be an object configuration containing `color`, `offsetX`,
             * `offsetY`, `opacity` and `width`.
             *
             * Note that in some cases, like stacked columns or other dense layouts, the
             * series may cast shadows on each other. In that case, the
             * `chart.seriesGroupShadow` allows applying a common drop shadow to the
             * whole series group.
             *
             * @sample {highcharts} highcharts/plotoptions/series-shadow/
             *         Shadow enabled
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption plotOptions.series.shadow
             */
            /**
             * Whether to display this particular series or series type in the
             * legend. Standalone series are shown in legend by default, and linked
             * series are not. Since v7.2.0 it is possible to show series that use
             * colorAxis by setting this option to `true`.
             *
             * @sample {highcharts} highcharts/plotoptions/series-showinlegend/
             *         One series in the legend, one hidden
             *
             * @type      {boolean}
             * @apioption plotOptions.series.showInLegend
             */
            /**
             * Whether or not to show the series in the navigator. Takes precedence
             * over [navigator.baseSeries](#navigator.baseSeries) if defined.
             *
             * @type      {boolean}
             * @since     5.0.0
             * @product   highstock
             * @apioption plotOptions.series.showInNavigator
             */
            /**
             * If set to `true`, the accessibility module will skip past the points
             * in this series for keyboard navigation.
             *
             * @type      {boolean}
             * @since     5.0.12
             * @apioption plotOptions.series.skipKeyboardNavigation
             */
            /**
             * Whether to stack the values of each series on top of each other.
             * Possible values are `undefined` to disable, `"normal"` to stack by
             * value or `"percent"`.
             *
             * When stacking is enabled, data must be sorted
             * in ascending X order.
             *
             * Some stacking options are related to specific series types. In the
             * streamgraph series type, the stacking option is set to `"stream"`.
             * The second one is `"overlap"`, which only applies to waterfall
             * series.
             *
             * @see [yAxis.reversedStacks](#yAxis.reversedStacks)
             *
             * @sample {highcharts} highcharts/plotoptions/series-stacking-line/
             *         Line
             * @sample {highcharts} highcharts/plotoptions/series-stacking-column/
             *         Column
             * @sample {highcharts} highcharts/plotoptions/series-stacking-bar/
             *         Bar
             * @sample {highcharts} highcharts/plotoptions/series-stacking-area/
             *         Area
             * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-line/
             *         Line
             * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-column/
             *         Column
             * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-bar/
             *         Bar
             * @sample {highcharts} highcharts/plotoptions/series-stacking-percent-area/
             *         Area
             * @sample {highcharts} highcharts/plotoptions/series-waterfall-with-normal-stacking
             *         Waterfall with normal stacking
             * @sample {highcharts} highcharts/plotoptions/series-waterfall-with-overlap-stacking
             *         Waterfall with overlap stacking
             * @sample {highstock} stock/plotoptions/stacking/
             *         Area
             *
             * @type       {string}
             * @product    highcharts highstock
             * @validvalue ["normal", "overlap", "percent", "stream"]
             * @apioption  plotOptions.series.stacking
             */
            /**
             * Whether to apply steps to the line. Possible values are `left`,
             * `center` and `right`.
             *
             * @sample {highcharts} highcharts/plotoptions/line-step/
             *         Different step line options
             * @sample {highcharts} highcharts/plotoptions/area-step/
             *         Stepped, stacked area
             * @sample {highstock} stock/plotoptions/line-step/
             *         Step line
             *
             * @type       {string}
             * @since      1.2.5
             * @product    highcharts highstock
             * @validvalue ["left", "center", "right"]
             * @apioption  plotOptions.series.step
             */
            /**
             * The threshold, also called zero level or base level. For line type
             * series this is only used in conjunction with
             * [negativeColor](#plotOptions.series.negativeColor).
             *
             * @see [softThreshold](#plotOptions.series.softThreshold).
             *
             * @type      {number|null}
             * @default   0
             * @since     3.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.threshold
             */
            /**
             * Set the initial visibility of the series.
             *
             * @sample {highcharts} highcharts/plotoptions/series-visible/
             *         Two series, one hidden and one visible
             * @sample {highstock} stock/plotoptions/series-visibility/
             *         Hidden series
             *
             * @type      {boolean}
             * @default   true
             * @apioption plotOptions.series.visible
             */
            /**
             * Defines the Axis on which the zones are applied.
             *
             * @see [zones](#plotOptions.series.zones)
             *
             * @sample {highcharts} highcharts/series/color-zones-zoneaxis-x/
             *         Zones on the X-Axis
             * @sample {highstock} highcharts/series/color-zones-zoneaxis-x/
             *         Zones on the X-Axis
             *
             * @type      {string}
             * @default   y
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zoneAxis
             */
            /**
             * General event handlers for the series items. These event hooks can
             * also be attached to the series at run time using the
             * `Highcharts.addEvent` function.
             *
             * @declare Highcharts.SeriesEventsOptionsObject
             *
             * @private
             */
            events: {},
            /**
             * Fires after the series has finished its initial animation, or in case
             * animation is disabled, immediately as the series is displayed.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-afteranimate/
             *         Show label after animate
             * @sample {highstock} highcharts/plotoptions/series-events-afteranimate/
             *         Show label after animate
             *
             * @type      {Highcharts.SeriesAfterAnimateCallbackFunction}
             * @since     4.0
             * @product   highcharts highstock gantt
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.afterAnimate
             */
            /**
             * Fires when the checkbox next to the series' name in the legend is
             * clicked. One parameter, `event`, is passed to the function. The state
             * of the checkbox is found by `event.checked`. The checked item is
             * found by `event.item`. Return `false` to prevent the default action
             * which is to toggle the select state of the series.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-checkboxclick/
             *         Alert checkbox status
             *
             * @type      {Highcharts.SeriesCheckboxClickCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.checkboxClick
             */
            /**
             * Fires when the series is clicked. One parameter, `event`, is passed
             * to the function, containing common event information. Additionally,
             * `event.point` holds a pointer to the nearest point on the graph.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-click/
             *         Alert click info
             * @sample {highstock} stock/plotoptions/series-events-click/
             *         Alert click info
             * @sample {highmaps} maps/plotoptions/series-events-click/
             *         Display click info in subtitle
             *
             * @type      {Highcharts.SeriesClickCallbackFunction}
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.click
             */
            /**
             * Fires when the series is hidden after chart generation time, either
             * by clicking the legend item or by calling `.hide()`.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-hide/
             *         Alert when the series is hidden by clicking the legend item
             *
             * @type      {Highcharts.SeriesHideCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.hide
             */
            /**
             * Fires when the legend item belonging to the series is clicked. One
             * parameter, `event`, is passed to the function. The default action
             * is to toggle the visibility of the series. This can be prevented
             * by returning `false` or calling `event.preventDefault()`.
             *
             * **Note:** This option is deprecated in favor of
             * [legend.events.itemClick](#legend.events.itemClick).
             *
             * @type       {Highcharts.SeriesLegendItemClickCallbackFunction}
             * @deprecated 11.4.4
             * @context    Highcharts.Series
             * @apioption  plotOptions.series.events.legendItemClick
             */
            /**
             * Fires when the mouse leaves the graph. One parameter, `event`, is
             * passed to the function, containing common event information. If the
             * [stickyTracking](#plotOptions.series) option is true, `mouseOut`
             * doesn't happen before the mouse enters another graph or leaves the
             * plot area.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-sticky/
             *         With sticky tracking by default
             * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-no-sticky/
             *         Without sticky tracking
             *
             * @type      {Highcharts.SeriesMouseOutCallbackFunction}
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.mouseOut
             */
            /**
             * Fires when the mouse enters the graph. One parameter, `event`, is
             * passed to the function, containing common event information.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-sticky/
             *         With sticky tracking by default
             * @sample {highcharts} highcharts/plotoptions/series-events-mouseover-no-sticky/
             *         Without sticky tracking
             *
             * @type      {Highcharts.SeriesMouseOverCallbackFunction}
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.mouseOver
             */
            /**
             * Fires when the series is shown after chart generation time, either
             * by clicking the legend item or by calling `.show()`.
             *
             * @sample {highcharts} highcharts/plotoptions/series-events-show/
             *         Alert when the series is shown by clicking the legend item.
             *
             * @type      {Highcharts.SeriesShowCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Series
             * @apioption plotOptions.series.events.show
             */
            /**
             * Options for the point markers of line and scatter-like series. Properties
             * like `fillColor`, `lineColor` and `lineWidth` define the visual
             * appearance of the markers. The `symbol` option defines the shape. Other
             * series types, like column series, don't have markers, but have visual
             * options on the series level instead.
             *
             * In styled mode, the markers can be styled with the `.highcharts-point`,
             * `.highcharts-point-hover` and `.highcharts-point-select` class names.
             *
             * @declare Highcharts.PointMarkerOptionsObject
             *
             * @sample {highmaps} maps/demo/mappoint-mapmarker
             *         Using the mapmarker symbol for points
             *
             * @private
             */
            marker: {
                /**
                 * Enable or disable the point marker. If `undefined`, the markers
                 * are hidden when the data is dense, and shown for more widespread
                 * data points.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-enabled/
                 *         Disabled markers
                 * @sample {highcharts} highcharts/plotoptions/series-marker-enabled-false/
                 *         Disabled in normal state but enabled on hover
                 * @sample {highstock} stock/plotoptions/series-marker/
                 *         Enabled markers
                 *
                 * @type      {boolean}
                 * @default   {highcharts} undefined
                 * @default   {highstock} false
                 * @apioption plotOptions.series.marker.enabled
                 */
                /**
                 * The threshold for how dense the point markers should be before
                 * they are hidden, given that `enabled` is not defined. The number
                 * indicates the horizontal distance between the two closest points
                 * in the series, as multiples of the `marker.radius`. In other
                 * words, the default value of 2 means points are hidden if
                 * overlapping horizontally.
                 *
                 * @sample highcharts/plotoptions/series-marker-enabledthreshold
                 *         A higher threshold
                 *
                 * @since 6.0.5
                 */
                enabledThreshold: 2,
                /**
                 * The fill color of the point marker. When `undefined`, the series'
                 * or point's color is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
                 *         White fill
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.series.marker.fillColor
                 */
                /**
                 * Image markers only. Set the image width explicitly. When using
                 * this option, a `width` must also be set.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-width-height/
                 *         Fixed width and height
                 * @sample {highstock} highcharts/plotoptions/series-marker-width-height/
                 *         Fixed width and height
                 *
                 * @type      {number}
                 * @since     4.0.4
                 * @apioption plotOptions.series.marker.height
                 */
                /**
                 * The color of the point marker's outline. When `undefined`, the
                 * series' or point's color is used.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
                 *         Inherit from series color (undefined)
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                lineColor: "#ffffff" /* Palette.backgroundColor */,
                /**
                 * The width of the point marker's outline.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-fillcolor/
                 *         2px blue marker
                 */
                lineWidth: 0,
                /**
                 * The radius of the point marker.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-radius/
                 *         Bigger markers
                 *
                 * @default {highstock} 2
                 * @default {highcharts} 4
                 *
                 */
                radius: 4,
                /**
                 * A predefined shape or symbol for the marker. When undefined, the
                 * symbol is pulled from options.symbols. Other possible values are
                 * `'circle'`, `'square'`,`'diamond'`, `'triangle'` and
                 * `'triangle-down'`.
                 *
                 * Additionally, the URL to a graphic can be given on this form:
                 * `'url(graphic.png)'`. Note that for the image to be applied to
                 * exported charts, its URL needs to be accessible by the export
                 * server.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-symbol/
                 *         Predefined, graphic and custom markers
                 * @sample {highstock} highcharts/plotoptions/series-marker-symbol/
                 *         Predefined, graphic and custom markers
                 * @sample {highmaps} maps/demo/mappoint-mapmarker
                 *         Using the mapmarker symbol for points
                 *
                 * @type      {string}
                 * @apioption plotOptions.series.marker.symbol
                 */
                /**
                 * Image markers only. Set the image width explicitly. When using
                 * this option, a `height` must also be set.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-marker-width-height/
                 *         Fixed width and height
                 * @sample {highstock} highcharts/plotoptions/series-marker-width-height/
                 *         Fixed width and height
                 *
                 * @type      {number}
                 * @since     4.0.4
                 * @apioption plotOptions.series.marker.width
                 */
                /**
                 * States for a single point marker.
                 *
                 * @declare Highcharts.PointStatesOptionsObject
                 */
                states: {
                    /**
                     * The normal state of a single point marker. Currently only
                     * used for setting animation when returning to normal state
                     * from hover.
                     *
                     * @declare Highcharts.PointStatesNormalOptionsObject
                     */
                    normal: {
                        /**
                         * Animation when returning to normal state after hovering.
                         *
                         * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                         */
                        animation: true
                    },
                    /**
                     * The hover state for a single point marker.
                     *
                     * @declare Highcharts.PointStatesHoverOptionsObject
                     */
                    hover: {
                        /**
                         * Animation when hovering over the marker.
                         *
                         * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                         */
                        animation: {
                            /** @internal */
                            duration: 150
                        },
                        /**
                         * Enable or disable the point marker.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-enabled/
                         *         Disabled hover state
                         */
                        enabled: true,
                        /**
                         * The fill color of the marker in hover state. When
                         * `undefined`, the series' or point's fillColor for normal
                         * state is used.
                         *
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @apioption plotOptions.series.marker.states.hover.fillColor
                         */
                        /**
                         * The color of the point marker's outline. When
                         * `undefined`, the series' or point's lineColor for normal
                         * state is used.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-linecolor/
                         *         White fill color, black line color
                         *
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @apioption plotOptions.series.marker.states.hover.lineColor
                         */
                        /**
                         * The width of the point marker's outline. When
                         * `undefined`, the series' or point's lineWidth for normal
                         * state is used.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-linewidth/
                         *         3px line width
                         *
                         * @type      {number}
                         * @apioption plotOptions.series.marker.states.hover.lineWidth
                         */
                        /**
                         * The radius of the point marker. In hover state, it
                         * defaults to the normal state's radius + 2 as per the
                         * [radiusPlus](#plotOptions.series.marker.states.hover.radiusPlus)
                         * option.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-hover-radius/
                         *         10px radius
                         *
                         * @type      {number}
                         * @apioption plotOptions.series.marker.states.hover.radius
                         */
                        /**
                         * The number of pixels to increase the radius of the
                         * hovered point.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
                         *         5 pixels greater radius on hover
                         * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
                         *         5 pixels greater radius on hover
                         *
                         * @since 4.0.3
                         */
                        radiusPlus: 2,
                        /**
                         * The additional line width for a hovered point.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
                         *         2 pixels wider on hover
                         * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
                         *         2 pixels wider on hover
                         *
                         * @since 4.0.3
                         */
                        lineWidthPlus: 1
                    },
                    /**
                     * The appearance of the point marker when selected. In order to
                     * allow a point to be selected, set the
                     * `series.allowPointSelect` option to true.
                     *
                     * @declare Highcharts.PointStatesSelectOptionsObject
                     */
                    select: {
                        /**
                         * Enable or disable visible feedback for selection.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-enabled/
                         *         Disabled select state
                         *
                         * @type      {boolean}
                         * @default   true
                         * @apioption plotOptions.series.marker.states.select.enabled
                         */
                        /**
                         * The radius of the point marker. In hover state, it
                         * defaults to the normal state's radius + 2.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-radius/
                         *         10px radius for selected points
                         *
                         * @type      {number}
                         * @apioption plotOptions.series.marker.states.select.radius
                         */
                        /**
                         * The fill color of the point marker.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-fillcolor/
                         *         Solid red discs for selected points
                         *
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        fillColor: "#cccccc" /* Palette.neutralColor20 */,
                        /**
                         * The color of the point marker's outline. When
                         * `undefined`, the series' or point's color is used.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-linecolor/
                         *         Red line color for selected points
                         *
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        lineColor: "#000000" /* Palette.neutralColor100 */,
                        /**
                         * The width of the point marker's outline.
                         *
                         * @sample {highcharts} highcharts/plotoptions/series-marker-states-select-linewidth/
                         *         3px line width for selected points
                         */
                        lineWidth: 2
                    }
                }
            },
            /**
             * Properties for each single point.
             *
             * @declare Highcharts.PlotSeriesPointOptions
             *
             * @private
             */
            point: {
                /**
                 * Fires when a point is clicked. One parameter, `event`, is passed
                 * to the function, containing common event information.
                 *
                 * If the `series.allowPointSelect` option is true, the default
                 * action for the point's click event is to toggle the point's
                 * select state. Returning `false` cancels this action.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-click/
                 *         Click marker to alert values
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-click-column/
                 *         Click column
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-click-url/
                 *         Go to URL
                 * @sample {highmaps} maps/plotoptions/series-point-events-click/
                 *         Click marker to display values
                 * @sample {highmaps} maps/plotoptions/series-point-events-click-url/
                 *         Go to URL
                 *
                 * @type      {Highcharts.PointClickCallbackFunction}
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.click
                 */
                /**
                 * Fires when the mouse leaves the area close to the point. One
                 * parameter, `event`, is passed to the function, containing common
                 * event information.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Show values in the chart's corner on mouse over
                 *
                 * @type      {Highcharts.PointMouseOutCallbackFunction}
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.mouseOut
                 */
                /**
                 * Fires when the mouse enters the area close to the point. One
                 * parameter, `event`, is passed to the function, containing common
                 * event information.
                 *
                 * Returning `false` cancels the default behavior, which is to show a
                 * tooltip for the point.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Show values in the chart's corner on mouse over
                 *
                 * @type      {Highcharts.PointMouseOverCallbackFunction}
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.mouseOver
                 */
                /**
                 * Fires when the point is removed using the `.remove()` method. One
                 * parameter, `event`, is passed to the function. Returning `false`
                 * cancels the operation.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-remove/
                 *         Remove point and confirm
                 *
                 * @type      {Highcharts.PointRemoveCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.remove
                 */
                /**
                 * Fires when the point is selected either programmatically or
                 * following a click on the point. One parameter, `event`, is passed
                 * to the function. Returning `false` cancels the operation.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-select/
                 *         Report the last selected point
                 * @sample {highmaps} maps/plotoptions/series-allowpointselect/
                 *         Report select and unselect
                 *
                 * @type      {Highcharts.PointSelectCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.select
                 */
                /**
                 * Fires when the point is unselected either programmatically or
                 * following a click on the point. One parameter, `event`, is passed
                 * to the function.
                 *  Returning `false` cancels the operation.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-unselect/
                 *         Report the last unselected point
                 * @sample {highmaps} maps/plotoptions/series-allowpointselect/
                 *         Report select and unselect
                 *
                 * @type      {Highcharts.PointUnselectCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.unselect
                 */
                /**
                 * Fires when the point is updated programmatically through the
                 * `.update()` method. One parameter, `event`, is passed to the
                 * function. The new point options can be accessed through
                 * `event.options`. Returning `false` cancels the operation.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-update/
                 *         Confirm point updating
                 *
                 * @type      {Highcharts.PointUpdateCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Point
                 * @apioption plotOptions.series.point.events.update
                 */
                /**
                 * Events for each single point.
                 *
                 * @declare Highcharts.PointEventsOptionsObject
                 */
                events: {}
            },
            /**
             * Options for the series data labels, appearing next to each data
             * point.
             *
             * Since v6.2.0, multiple data labels can be applied to each single
             * point by defining them as an array of configs.
             *
             * In styled mode, the data labels can be styled with the
             * `.highcharts-data-label-box` and `.highcharts-data-label` class names
             * ([see example](https://www.highcharts.com/samples/highcharts/css/series-datalabels)).
             *
             * @sample {highcharts} highcharts/plotoptions/series-datalabels-enabled
             *         Data labels enabled
             * @sample {highcharts} highcharts/plotoptions/series-datalabels-multiple
             *         Multiple data labels on a bar series
             * @sample {highcharts} highcharts/css/series-datalabels
             *         Styled mode example
             * @sample {highmaps} maps/demo/color-axis
             *         Choropleth map with data labels
             * @sample {highmaps} maps/demo/mappoint-datalabels-mapmarker
             *         Using data labels as map markers
             *
             * @type    {*|Array<*>}
             * @product highcharts highstock highmaps gantt
             *
             * @private
             */
            dataLabels: {
                /**
                 * Enable or disable the initial animation when a series is displayed
                 * for the `dataLabels`. The animation can also be set as a
                 * configuration object. Please note that this option only applies to
                 * the initial animation.
                 *
                 * For other animations, see [chart.animation](#chart.animation) and the
                 * animation parameter under the API methods. The following properties
                 * are supported:
                 *
                 * - `defer`: The animation delay time in milliseconds.
                 *
                 * @sample {highcharts} highcharts/plotoptions/animation-defer/
                 *          Animation defer settings
                 *
                 * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
                 * @since     8.2.0
                 * @apioption plotOptions.series.dataLabels.animation
                 */
                animation: {},
                /**
                 * The animation delay time in milliseconds. Set to `0` to render the
                 * data labels immediately. As `undefined` inherits defer time from the
                 * [series.animation.defer](#plotOptions.series.animation.defer).
                 *
                 * @type      {number}
                 * @since     8.2.0
                 * @apioption plotOptions.series.dataLabels.animation.defer
                 */
                /**
                 * The alignment of the data label compared to the point. If `right`,
                 * the right side of the label should be touching the point. For points
                 * with an extent, like columns, the alignments also dictates how to
                 * align it inside the box, as given with the
                 * [inside](#plotOptions.column.dataLabels.inside) option. Can be one of
                 * `left`, `center` or `right`.
                 *
                 * @sample {highcharts}
                 *         highcharts/plotoptions/series-datalabels-align-left/ Left
                 *         aligned
                 * @sample {highcharts}
                 *         highcharts/plotoptions/bar-datalabels-align-inside-bar/ Data
                 *         labels inside the bar
                 *
                 * @type {Highcharts.AlignValue|null}
                 */
                align: 'center',
                /**
                 * Alignment method for data labels. If set to `plotEdges`, the labels
                 * are aligned within the plot area in the direction of the y-axis. So
                 * in a regular column chart, the labels are aligned vertically
                 * according to the `verticalAlign` setting. In a bar chart, which is
                 * inverted, the labels are aligned horizontally according to the
                 * `align` setting. Applies to cartesian series only.
                 *
                 * @sample {highcharts} highcharts/series-bar/datalabels-alignto/
                 *         Align to plot edges
                 *
                 * @type      {string}
                 * @since 11.4.2
                 * @apioption plotOptions.series.dataLabels.alignTo
                 */
                /**
                 * Whether to allow data labels to overlap. To make the labels less
                 * sensitive for overlapping, the
                 * [dataLabels.padding](#plotOptions.series.dataLabels.padding)
                 * can be set to 0.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-allowoverlap-false/
                 *         Don't allow overlap
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     4.1.0
                 * @apioption plotOptions.series.dataLabels.allowOverlap
                 */
                /**
                 * The background color or gradient for the data label. Setting it to
                 * `auto` will use the point's color.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 * @sample {highmaps} maps/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 * @sample {highmaps} maps/demo/mappoint-datalabels-mapmarker
                 *         Data labels as map markers
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since     2.2.1
                 * @apioption plotOptions.series.dataLabels.backgroundColor
                 */
                /**
                 * The border color for the data label. Setting it to `auto` will use
                 * the point's color. Defaults to `undefined`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since     2.2.1
                 * @apioption plotOptions.series.dataLabels.borderColor
                 */
                /**
                 * The border radius in pixels for the data label.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 * @sample {highmaps} maps/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.2.1
                 * @apioption plotOptions.series.dataLabels.borderRadius
                 */
                /**
                 * The border width in pixels for the data label.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.2.1
                 * @apioption plotOptions.series.dataLabels.borderWidth
                 */
                borderWidth: 0,
                /**
                 * A class name for the data label. Particularly in styled mode,
                 * this can be used to give each series' or point's data label
                 * unique styling. In addition to this option, a default color class
                 * name is added so that we can give the labels a contrast text
                 * shadow.
                 *
                 * @sample {highcharts} highcharts/css/data-label-contrast/
                 *         Contrast text shadow
                 * @sample {highcharts} highcharts/css/series-datalabels/
                 *         Styling by CSS
                 *
                 * @type      {string}
                 * @since     5.0.0
                 * @apioption plotOptions.series.dataLabels.className
                 */
                /**
                 * This options is deprecated.
                 * Use [style.color](#plotOptions.series.dataLabels.style) instead.
                 *
                 * The text color for the data labels. Defaults to `undefined`. For
                 * certain series types, like column or map, the data labels can be
                 * drawn inside the points. In this case the data label will be
                 * drawn with maximum contrast by default. Additionally, it will be
                 * given a `text-outline` style with the opposite color, to further
                 * increase the contrast. This can be overridden by setting the
                 * `text-outline` style to `none` in the `dataLabels.style` option.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-color/
                 *         Red data labels
                 * @sample {highmaps} maps/demo/color-axis/
                 *         White data labels
                 *
                 * @see [style.color](#plotOptions.series.dataLabels.style)
                 *
                 * @type       {Highcharts.ColorType}
                 * @deprecated 10.3
                 * @apioption  plotOptions.series.dataLabels.color
                 */
                /**
                 * Whether to hide data labels that are outside the plot area. By
                 * default, the data label is moved inside the plot area according
                 * to the
                 * [overflow](#plotOptions.series.dataLabels.overflow)
                 * option.
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     2.3.3
                 * @apioption plotOptions.series.dataLabels.crop
                 */
                /**
                 * Whether to defer displaying the data labels until the initial
                 * series animation has finished. Setting to `false` renders the
                 * data label immediately. If set to `true` inherits the defer
                 * time set in [plotOptions.series.animation](#plotOptions.series.animation).
                 *
                 * @since     4.0.0
                 * @type      {boolean}
                 * @product   highcharts highstock gantt
                 */
                defer: true,
                /**
                 * Enable or disable the data labels.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-enabled/
                 *         Data labels enabled
                 * @sample {highmaps} maps/demo/color-axis/
                 *         Data labels enabled
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption plotOptions.series.dataLabels.enabled
                 */
                /**
                 * A declarative filter to control of which data labels to display.
                 * The declarative filter is designed for use when callback
                 * functions are not available, like when the chart options require
                 * a pure JSON structure or for use with graphical editors. For
                 * programmatic control, use the `formatter` instead, and return
                 * `undefined` to disable a single data label.
                 *
                 * @example
                 * filter: {
                 *     property: 'percentage',
                 *     operator: '>',
                 *     value: 4
                 * }
                 *
                 * @sample {highcharts} highcharts/demo/pie-monochrome
                 *         Data labels filtered by percentage
                 *
                 * @declare   Highcharts.DataLabelsFilterOptionsObject
                 * @since     6.0.3
                 * @apioption plotOptions.series.dataLabels.filter
                 */
                /**
                 * The operator to compare by. Can be one of `>`, `<`, `>=`, `<=`,
                 * `==`, `===`, `!=` and `!==`.
                 *
                 * @type       {string}
                 * @validvalue [">", "<", ">=", "<=", "==", "===", "!=", "!=="]
                 * @apioption  plotOptions.series.dataLabels.filter.operator
                 */
                /**
                 * The point property to filter by. Point options are passed
                 * directly to properties, additionally there are `y` value,
                 * `percentage` and others listed under {@link Highcharts.Point}
                 * members.
                 *
                 * @type      {string}
                 * @apioption plotOptions.series.dataLabels.filter.property
                 */
                /**
                 * The value to compare against.
                 *
                 * @type      {number}
                 * @apioption plotOptions.series.dataLabels.filter.value
                 */
                /**
                 * A
                 * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for the data label. Available variables are the same as for
                 * `formatter`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-format/
                 *         Add a unit
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-format-subexpression/
                 *         Complex logic in the format string
                 * @sample {highmaps} maps/plotoptions/series-datalabels-format/
                 *         Formatted value in the data label
                 *
                 * @type      {string}
                 * @default   y
                 * @default   point.value
                 * @since     3.0
                 * @apioption plotOptions.series.dataLabels.format
                 */
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Callback JavaScript function to format the data label. Note that if a
                 * `format` is defined, the format takes precedence and the formatter is
                 * ignored.
                 *
                 * @sample {highmaps} maps/plotoptions/series-datalabels-format/
                 *         Formatted value
                 *
                 * @type {Highcharts.DataLabelsFormatterCallbackFunction}
                 */
                formatter: function () {
                    const { numberFormatter } = this.series.chart;
                    return typeof this.y !== 'number' ?
                        '' : numberFormatter(this.y, -1);
                },
                /**
                 * For points with an extent, like columns or map areas, whether to
                 * align the data label inside the box or to the actual value point.
                 * Defaults to `false` in most cases, `true` in stacked columns.
                 *
                 * @type      {boolean}
                 * @since     3.0
                 * @apioption plotOptions.series.dataLabels.inside
                 */
                /**
                 * Format for points with the value of null. Works analogously to
                 * [format](#plotOptions.series.dataLabels.format). `nullFormat` can
                 * be applied only to series which support displaying null points
                 * i.e `heatmap` or `tilemap`. Does not work with series that don't
                 * display null points, like `line`, `column`, `bar` or `pie`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-nullformat/
                 *         Format data label for null points in heat map
                 *
                 * @type      {boolean|string}
                 * @since     7.1.0
                 * @apioption plotOptions.series.dataLabels.nullFormat
                 */
                /**
                 * Callback JavaScript function that defines formatting for points
                 * with the value of null. Works analogously to
                 * [formatter](#plotOptions.series.dataLabels.formatter).
                 * `nullFormatter` can be applied only to series which support
                 * displaying null points i.e `heatmap` or `tilemap`. Does not work
                 * with series that don't display null points, like `line`, `column`,
                 * `bar` or `pie`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-nullformat/
                 *         Format data label for null points in heat map
                 *
                 * @type      {Highcharts.DataLabelsFormatterCallbackFunction}
                 * @since     7.1.0
                 * @apioption plotOptions.series.dataLabels.nullFormatter
                 */
                /**
                 * How to handle data labels that flow outside the plot area. The
                 * default is `"justify"`, which aligns them inside the plot area.
                 * For columns and bars, this means it will be moved inside the bar.
                 * To display data labels outside the plot area, set `crop` to
                 * `false` and `overflow` to `"allow"`.
                 *
                 * @type       {Highcharts.DataLabelsOverflowValue}
                 * @default    justify
                 * @since      3.0.6
                 * @apioption  plotOptions.series.dataLabels.overflow
                 */
                /**
                 * When either the `borderWidth` or the `backgroundColor` is set,
                 * this is the padding within the box.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 * @sample {highmaps} maps/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 *
                 * @since 2.2.1
                 */
                padding: 5,
                /**
                 * Aligns data labels relative to points. If `center` alignment is
                 * not possible, it defaults to `right`.
                 *
                 * @type      {Highcharts.AlignValue}
                 * @default   center
                 * @apioption plotOptions.series.dataLabels.position
                 */
                /**
                 * Text rotation in degrees. Note that due to a more complex
                 * structure, backgrounds, borders and padding will be lost on a
                 * rotated data label.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
                 *         Vertical labels
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption plotOptions.series.dataLabels.rotation
                 */
                /**
                 * The shadow of the box. Works best with `borderWidth` or
                 * `backgroundColor`. Since 2.3 the shadow can be an object
                 * configuration containing `color`, `offsetX`, `offsetY`, `opacity`
                 * and `width`.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-box/
                 *         Data labels box options
                 *
                 * @type      {boolean|Highcharts.ShadowOptionsObject}
                 * @default   false
                 * @since     2.2.1
                 * @apioption plotOptions.series.dataLabels.shadow
                 */
                /**
                 * The name of a symbol to use for the border around the label.
                 * Symbols are predefined functions on the Renderer object.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-shape/
                 *         A callout for annotations
                 *
                 * @type      {string}
                 * @default   square
                 * @since     4.1.2
                 * @apioption plotOptions.series.dataLabels.shape
                 */
                /**
                 * Styles for the label. The default `color` setting is
                 * `"contrast"`, which is a pseudo color that Highcharts picks up
                 * and applies the maximum contrast to the underlying point item,
                 * for example the bar in a bar chart.
                 *
                 * The `textOutline` is a pseudo property that applies an outline of
                 * the given width with the given color, which by default is the
                 * maximum contrast to the text. So a bright text color will result
                 * in a black text outline for maximum readability on a mixed
                 * background. In some cases, especially with grayscale text, the
                 * text outline doesn't work well, in which cases it can be disabled
                 * by setting it to `"none"`. When `useHTML` is true, the
                 * `textOutline` will not be picked up. In this, case, the same
                 * effect can be acheived through the `text-shadow` CSS property.
                 *
                 * For some series types, where each point has an extent, like for
                 * example tree maps, the data label may overflow the point. There
                 * are two strategies for handling overflow. By default, the text
                 * will wrap to multiple lines. The other strategy is to set
                 * `style.textOverflow` to `ellipsis`, which will keep the text on
                 * one line plus it will break inside long words.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-style/
                 *         Bold labels
                 * @sample {highcharts} highcharts/plotoptions/pie-datalabels-overflow/
                 *         Long labels truncated with an ellipsis in a pie
                 * @sample {highcharts} highcharts/plotoptions/pie-datalabels-overflow-wrap/
                 *         Long labels are wrapped in a pie
                 * @sample {highmaps} maps/demo/color-axis/
                 *         Bold labels
                 *
                 * @type      {Highcharts.CSSObject}
                 * @since     4.1.0
                 * @apioption plotOptions.series.dataLabels.style
                 */
                style: {
                    /** @internal */
                    fontSize: '0.7em',
                    /** @internal */
                    fontWeight: 'bold',
                    /** @internal */
                    color: 'contrast',
                    /** @internal */
                    textOutline: '1px contrast'
                },
                /**
                 * Options for a label text which should follow marker's shape.
                 * Border and background are disabled for a label that follows a
                 * path.
                 *
                 * **Note:** Only SVG-based renderer supports this option. Setting
                 * `useHTML` to true will disable this option.
                 *
                 * @declare   Highcharts.DataLabelsTextPathOptionsObject
                 * @since     7.1.0
                 * @apioption plotOptions.series.dataLabels.textPath
                 */
                /**
                 * Presentation attributes for the text path.
                 *
                 * @type      {Highcharts.SVGAttributes}
                 * @since     7.1.0
                 * @apioption plotOptions.series.dataLabels.textPath.attributes
                 */
                /**
                 * Enable or disable `textPath` option for link's or marker's data
                 * labels.
                 *
                 * @type      {boolean}
                 * @since     7.1.0
                 * @apioption plotOptions.series.dataLabels.textPath.enabled
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the labels.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption plotOptions.series.dataLabels.useHTML
                 */
                /**
                 * The vertical alignment of a data label. Can be one of `top`,
                 * `middle` or `bottom`. The default value depends on the data, for
                 * instance in a column chart, the label is above positive values
                 * and below negative values.
                 *
                 * @type  {Highcharts.VerticalAlignValue|null}
                 * @since 2.3.3
                 */
                verticalAlign: 'bottom',
                /**
                 * The x position offset of the label relative to the point in
                 * pixels.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
                 *         Vertical and positioned
                 * @sample {highcharts} highcharts/plotoptions/bar-datalabels-align-inside-bar/
                 *         Data labels inside the bar
                 */
                x: 0,
                /**
                 * The z index of the data labels. Use a `zIndex` of 6 to display it above
                 * the series, or use a `zIndex` of 2 to display it behind the series.
                 *
                 * @type      {number}
                 * @default   6
                 * @since     2.3.5
                 * @apioption plotOptions.series.dataLabels.zIndex
                 */
                /**
                 * The y position offset of the label relative to the point in
                 * pixels.
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-datalabels-rotation/
                 *         Vertical and positioned
                 */
                y: 0
            },
            /**
             * When the series contains less points than the crop threshold, all
             * points are drawn, even if the points fall outside the visible plot
             * area at the current zoom. The advantage of drawing all points
             * (including markers and columns), is that animation is performed on
             * updates. On the other hand, when the series contains more points than
             * the crop threshold, the series data is cropped to only contain points
             * that fall within the plot area. The advantage of cropping away
             * invisible points is to increase performance on large series.
             *
             * @since   2.2
             * @product highcharts highstock
             *
             * @private
             */
            cropThreshold: 300,
            /**
             * Opacity of a series parts: line, fill (e.g. area) and dataLabels.
             *
             * @see [states.inactive.opacity](#plotOptions.series.states.inactive.opacity)
             *
             * @since 7.1.0
             *
             * @private
             */
            opacity: 1,
            /**
             * The width of each point on the x axis. For example in a column chart
             * with one value each day, the pointRange would be 1 day (= 24 * 3600
             * * 1000 milliseconds). This is normally computed automatically, but
             * this option can be used to override the automatic value.
             *
             * @product highstock
             *
             * @private
             */
            pointRange: 0,
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
             * @product highcharts highstock
             *
             * @private
             */
            softThreshold: true,
            /**
             * @declare Highcharts.SeriesStatesOptionsObject
             *
             * @private
             */
            states: {
                /**
                 * The normal state of a series, or for point items in column, pie
                 * and similar series. Currently only used for setting animation
                 * when returning to normal state from hover.
                 *
                 * @declare Highcharts.SeriesStatesNormalOptionsObject
                 */
                normal: {
                    /**
                     * Animation when returning to normal state after hovering.
                     *
                         * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     */
                    animation: true
                },
                /**
                 * Options for the hovered series. These settings override the
                 * normal state options when a series is moused over or touched.
                 *
                 * @declare Highcharts.SeriesStatesHoverOptionsObject
                 */
                hover: {
                    /**
                     * Enable separate styles for the hovered series to visualize
                     * that the user hovers either the series itself or the legend.
                     *
                     * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled/
                     *         Line
                     * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled-column/
                     *         Column
                     * @sample {highcharts} highcharts/plotoptions/series-states-hover-enabled-pie/
                     *         Pie
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     1.2
                     * @apioption plotOptions.series.states.hover.enabled
                     */
                    /**
                     * Animation setting for hovering the graph in line-type series.
                     *
                     * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     * @since   5.0.8
                     * @product highcharts highstock
                     */
                    animation: {
                        /**
                         * The duration of the hover animation in milliseconds. By
                         * default the hover state animates quickly in, and slowly
                         * back to normal.
                         *
                         * @internal
                         */
                        duration: 150
                    },
                    /**
                     * Pixel width of the graph line. By default this property is
                     * undefined, and the `lineWidthPlus` property dictates how much
                     * to increase the linewidth from normal state.
                     *
                     * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidth/
                     *         5px line on hover
                     *
                     * @type      {number}
                     * @product   highcharts highstock
                     * @apioption plotOptions.series.states.hover.lineWidth
                     */
                    /**
                     * The additional line width for the graph of a hovered series.
                     *
                     * @sample {highcharts} highcharts/plotoptions/series-states-hover-linewidthplus/
                     *         5 pixels wider
                     * @sample {highstock} highcharts/plotoptions/series-states-hover-linewidthplus/
                     *         5 pixels wider
                     *
                     * @since   4.0.3
                     * @product highcharts highstock
                     */
                    lineWidthPlus: 1,
                    /**
                     * In Highcharts 1.0, the appearance of all markers belonging
                     * to the hovered series. For settings on the hover state of the
                     * individual point, see
                     * [marker.states.hover](#plotOptions.series.marker.states.hover).
                     *
                     * @deprecated
                     *
                     * @extends   plotOptions.series.marker
                     * @excluding states, symbol
                     * @product   highcharts highstock
                     */
                    marker: {
                    // `lineWidth: base + 1`,
                    // `radius: base + 1`
                    },
                    /**
                     * Options for the halo appearing around the hovered point in
                     * line-type series as well as outside the hovered slice in pie
                     * charts. By default the halo is filled by the current point or
                     * series color with an opacity of 0.25\. The halo can be
                     * disabled by setting the `halo` option to `null`.
                     *
                     * In styled mode, the halo is styled with the
                     * `.highcharts-halo` class, with colors inherited from
                     * `.highcharts-color-{n}`.
                     *
                     * @sample {highcharts} highcharts/plotoptions/halo/
                     *         Halo options
                     * @sample {highstock} highcharts/plotoptions/halo/
                     *         Halo options
                     *
                     * @declare Highcharts.SeriesStatesHoverHaloOptionsObject
                     * @type    {null|*}
                     * @since   4.0
                     * @product highcharts highstock
                     */
                    halo: {
                        /**
                         * A collection of SVG attributes to override the appearance
                         * of the halo, for example `fill`, `stroke` and
                         * `stroke-width`.
                         *
                         * @type      {Highcharts.SVGAttributes}
                         * @since     4.0
                         * @product   highcharts highstock
                         * @apioption plotOptions.series.states.hover.halo.attributes
                         */
                        /**
                         * The pixel size of the halo. For point markers this is the
                         * radius of the halo. For pie slices it is the width of the
                         * halo outside the slice. For bubbles it defaults to 5 and
                         * is the width of the halo outside the bubble.
                         *
                         * @since   4.0
                         * @product highcharts highstock
                         */
                        size: 10,
                        /**
                         * Opacity for the halo unless a specific fill is overridden
                         * using the `attributes` setting. Note that Highcharts is
                         * only able to apply opacity to colors of hex or rgb(a)
                         * formats.
                         *
                         * @since   4.0
                         * @product highcharts highstock
                         */
                        opacity: 0.25
                    }
                },
                /**
                 * Specific options for point in selected states, after being
                 * selected by
                 * [allowPointSelect](#plotOptions.series.allowPointSelect)
                 * or programmatically.
                 *
                 * @sample maps/plotoptions/series-allowpointselect/
                 *         Allow point select demo
                 *
                 * @declare   Highcharts.SeriesStatesSelectOptionsObject
                 * @extends   plotOptions.series.states.hover
                 * @excluding brightness
                 */
                select: {
                    animation: {
                        /** @internal */
                        duration: 0
                    }
                },
                /**
                 * The opposite state of a hover for series.
                 *
                 * @sample highcharts/plotoptions/series-states-inactive-disabled
                 *         Disabled inactive state
                 *
                 * @declare Highcharts.SeriesStatesInactiveOptionsObject
                 */
                inactive: {
                    /**
                     * Enable or disable the inactive state for a series
                     *
                     * @sample highcharts/plotoptions/series-states-inactive-disabled
                     *         Disabled inactive state
                     *
                     * @type {boolean}
                     * @default true
                     * @apioption plotOptions.series.states.inactive.enabled
                     */
                    /**
                     * The animation for entering the inactive state.
                     *
                     * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     */
                    animation: {
                        /** @internal */
                        duration: 150
                    },
                    /**
                     * Opacity of series elements (dataLabels, line, area).
                     *
                     * @type {number}
                     */
                    opacity: 0.2
                }
            },
            /**
             * Sticky tracking of mouse events. When true, the `mouseOut` event on a
             * series isn't triggered until the mouse moves over another series, or
             * out of the plot area. When false, the `mouseOut` event on a series is
             * triggered when the mouse leaves the area around the series' graph or
             * markers. This also implies the tooltip when not shared. When
             * `stickyTracking` is false and `tooltip.shared` is false, the tooltip
             * will be hidden when moving the mouse between series. Defaults to true
             * for line and area type series, but to false for columns, pies etc.
             *
             * **Note:** The boost module will force this option because of
             * technical limitations.
             *
             * @sample {highcharts} highcharts/plotoptions/series-stickytracking-true/
             *         True by default
             * @sample {highcharts} highcharts/plotoptions/series-stickytracking-false/
             *         False
             *
             * @default {highcharts} true
             * @default {highstock} true
             * @default {highmaps} false
             * @since   2.0
             *
             * @private
             */
            stickyTracking: true,
            /**
             * A configuration object for the tooltip rendering of each single
             * series. Properties are inherited from [tooltip](#tooltip), but only
             * the following properties can be defined on a series level.
             *
             * @declare   Highcharts.SeriesTooltipOptionsObject
             * @since     2.3
             * @extends   tooltip
             * @excluding animation, backgroundColor, borderColor, borderRadius,
             *            borderWidth, className, crosshairs, enabled, formatter,
             *            headerShape, hideDelay, outside, padding, positioner,
             *            shadow, shape, shared, snap, split, stickOnContact,
             *            style, useHTML
             * @apioption plotOptions.series.tooltip
             */
            /**
             * When a series contains a `data` array that is longer than this, the
             * Series class looks for data configurations of plain numbers or arrays of
             * numbers. The first and last valid points are checked. If found, the rest
             * of the data is assumed to be the same. This saves expensive data checking
             * and indexing in long series, and makes data-heavy charts render faster.
             *
             * Set it to `0` disable.
             *
             * Note:
             * - In boost mode turbo threshold is forced. Only array of numbers or two
             *   dimensional arrays are allowed.
             * - In version 11.4.3 and earlier, if object configurations were passed
             *   beyond the turbo threshold, a warning was logged in the console and the
             *   data series didn't render.
             *
             * @since   2.2
             * @product highcharts highstock gantt
             *
             * @private
             */
            turboThreshold: 1000,
            /**
             * An array defining zones within a series. Zones can be applied to the
             * X axis, Y axis or Z axis for bubbles, according to the `zoneAxis`
             * option. The zone definitions have to be in ascending order regarding
             * to the value.
             *
             * In styled mode, the color zones are styled with the
             * `.highcharts-zone-{n}` class, or custom classed from the `className`
             * option
             * ([view live demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/css/color-zones/)).
             *
             * @see [zoneAxis](#plotOptions.series.zoneAxis)
             *
             * @sample {highcharts} highcharts/series/color-zones-simple/
             *         Color zones
             * @sample {highstock} highcharts/series/color-zones-simple/
             *         Color zones
             *
             * @declare   Highcharts.SeriesZonesOptionsObject
             * @type      {Array<*>}
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zones
             */
            /**
             * Styled mode only. A custom class name for the zone.
             *
             * @sample highcharts/css/color-zones/
             *         Zones styled by class name
             *
             * @type      {string}
             * @since     5.0.0
             * @apioption plotOptions.series.zones.className
             */
            /**
             * Defines the color of the series.
             *
             * @see [series color](#plotOptions.series.color)
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zones.color
             */
            /**
             * A name for the dash style to use for the graph.
             *
             * @see [plotOptions.series.dashStyle](#plotOptions.series.dashStyle)
             *
             * @sample {highcharts|highstock} highcharts/series/color-zones-dashstyle-dot/
             *         Dashed line indicates prognosis
             *
             * @type      {Highcharts.DashStyleValue}
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zones.dashStyle
             */
            /**
             * Defines the fill color for the series (in area type series)
             *
             * @see [fillColor](#plotOptions.area.fillColor)
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zones.fillColor
             */
            /**
             * The value up to where the zone extends, if undefined the zones
             * stretches to the last value in the series.
             *
             * @type      {number}
             * @since     4.1.0
             * @product   highcharts highstock
             * @apioption plotOptions.series.zones.value
             */
            /**
             * When using dual or multiple color axes, this number defines which
             * colorAxis the particular series is connected to. It refers to
             * either the
             * {@link #colorAxis.id|axis id}
             * or the index of the axis in the colorAxis array, with 0 being the
             * first. Set this option to false to prevent a series from connecting
             * to the default color axis.
             *
             * Since v7.2.0 the option can also be an axis id or an axis index
             * instead of a boolean flag.
             *
             * @sample highcharts/coloraxis/coloraxis-with-pie/
             *         Color axis with pie series
             * @sample highcharts/coloraxis/multiple-coloraxis/
             *         Multiple color axis
             *
             * @type      {number|string|boolean}
             * @default   0
             * @product   highcharts highstock highmaps
             * @apioption plotOptions.series.colorAxis
             */
            /**
             * Determines what data value should be used to calculate point color
             * if `colorAxis` is used. Requires to set `min` and `max` if some
             * custom point property is used or if approximation for data grouping
             * is set to `'sum'`.
             *
             * @sample highcharts/coloraxis/custom-color-key/
             *         Custom color key
             * @sample highcharts/coloraxis/color-key-with-stops/
             *         Custom colorKey with color axis stops
             * @sample highcharts/coloraxis/changed-default-color-key/
             *         Changed default color key
             *
             * @type      {string}
             * @default   y
             * @since     7.2.0
             * @product   highcharts highstock highmaps
             * @apioption plotOptions.series.colorKey
             */
            /**
             * What type of legend symbol to render for this series. Can be one of
             * `areaMarker`, `lineMarker` or `rectangle`.
             *
             * @validvalue ["areaMarker", "lineMarker", "rectangle"]
             *
             * @sample {highcharts} highcharts/series/legend-symbol/
             *         Change the legend symbol
             *
             * @type      {string}
             * @default   rectangle
             * @since     11.0.1
             * @apioption plotOptions.series.legendSymbol
             */
            /**
             * Determines whether the series should look for the nearest point
             * in both dimensions or just the x-dimension when hovering the series.
             * Defaults to `'xy'` for scatter series and `'x'` for most other
             * series. If the data has duplicate x-values, it is recommended to
             * set this to `'xy'` to allow hovering over all points.
             *
             * Applies only to series types using nearest neighbor search (not
             * direct hover) for tooltip.
             *
             * @sample {highcharts} highcharts/series/findnearestpointby/
             *         Different hover behaviors
             * @sample {highstock} highcharts/series/findnearestpointby/
             *         Different hover behaviors
             * @sample {highmaps} highcharts/series/findnearestpointby/
             *         Different hover behaviors
             *
             * @since      5.0.10
             * @validvalue ["x", "xy"]
             *
             * @private
             */
            findNearestPointBy: 'x'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return seriesDefaults;
    });
    _registerModule(_modules, 'Core/Series/Series.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Defaults.js'], _modules['Core/Foundation.js'], _modules['Core/Globals.js'], _modules['Core/Legend/LegendSymbol.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/SeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (A, D, F, H, LegendSymbol, Point, SeriesDefaults, SeriesRegistry, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject, setAnimation } = A;
        const { defaultOptions } = D;
        const { registerEventOptions } = F;
        const { svg, win } = H;
        const { seriesTypes } = SeriesRegistry;
        const { arrayMax, arrayMin, clamp, correctFloat, crisp, defined, destroyObjectProperties, diffObjects, erase, error, extend, find, fireEvent, getClosestDistance, getNestedProperty, insertItem, isArray, isNumber, isString, merge, objectEach, pick, removeEvent, splat, syncTimeout } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * This is the base series prototype that all other series types inherit from.
         * A new series is initialized either through the
         * [series](https://api.highcharts.com/highcharts/series)
         * option structure, or after the chart is initialized, through
         * {@link Highcharts.Chart#addSeries}.
         *
         * The object can be accessed in a number of ways. All series and point event
         * handlers give a reference to the `series` object. The chart object has a
         * {@link Highcharts.Chart#series|series} property that is a collection of all
         * the chart's series. The point objects and axis objects also have the same
         * reference.
         *
         * Another way to reference the series programmatically is by `id`. Add an id
         * in the series configuration options, and get the series object by
         * {@link Highcharts.Chart#get}.
         *
         * Configuration options for the series are given in three levels. Options for
         * all series in a chart are given in the
         * [plotOptions.series](https://api.highcharts.com/highcharts/plotOptions.series)
         * object. Then options for all series of a specific type
         * are given in the plotOptions of that type, for example `plotOptions.line`.
         * Next, options for one single series are given in the series array, or as
         * arguments to `chart.addSeries`.
         *
         * The data in the series is stored in various arrays.
         *
         * - First, `series.options.data` contains all the original config options for
         *   each point whether added by options or methods like `series.addPoint`.
         *
         * - Next, `series.data` contains those values converted to points, but in case
         *   the series data length exceeds the `cropThreshold`, or if the data is
         *   grouped, `series.data` doesn't contain all the points. It only contains the
         *   points that have been created on demand.
         *
         * - Then there's `series.points` that contains all currently visible point
         *   objects. In case of cropping, the cropped-away points are not part of this
         *   array. The `series.points` array starts at `series.cropStart` compared to
         *   `series.data` and `series.options.data`. If however the series data is
         *   grouped, these can't be correlated one to one.
         *
         * - `series.xData` and `series.processedXData` contain clean x values,
         *   equivalent to `series.data` and `series.points`.
         *
         * - `series.yData` and `series.processedYData` contain clean y values,
         *   equivalent to `series.data` and `series.points`.
         *
         * @class
         * @name Highcharts.Series
         *
         * @param {Highcharts.Chart} chart
         * The chart instance.
         *
         * @param {Highcharts.SeriesOptionsType|object} options
         * The series options.
         */
        class Series {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                this.zoneAxis = 'y';
                // eslint-enable valid-jsdoc
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            init(chart, userOptions) {
                fireEvent(this, 'init', { options: userOptions });
                const series = this, chartSeries = chart.series;
                // The 'eventsToUnbind' property moved from prototype into the
                // Series init to avoid reference to the same array between
                // the different series and charts. #12959, #13937
                this.eventsToUnbind = [];
                /**
                 * Read only. The chart that the series belongs to.
                 *
                 * @name Highcharts.Series#chart
                 * @type {Highcharts.Chart}
                 */
                series.chart = chart;
                /**
                 * Read only. The series' type, like "line", "area", "column" etc.
                 * The type in the series options anc can be altered using
                 * {@link Series#update}.
                 *
                 * @name Highcharts.Series#type
                 * @type {string}
                 */
                /**
                 * Read only. The series' current options. To update, use
                 * {@link Series#update}.
                 *
                 * @name Highcharts.Series#options
                 * @type {Highcharts.SeriesOptionsType}
                 */
                series.options = series.setOptions(userOptions);
                const options = series.options, visible = options.visible !== false;
                /**
                 * All child series that are linked to the current series through the
                 * [linkedTo](https://api.highcharts.com/highcharts/series.line.linkedTo)
                 * option.
                 *
                 * @name Highcharts.Series#linkedSeries
                 * @type {Array<Highcharts.Series>}
                 * @readonly
                 */
                series.linkedSeries = [];
                // Bind the axes
                series.bindAxes();
                extend(series, {
                    /**
                     * The series name as given in the options. Defaults to
                     * "Series {n}".
                     *
                     * @name Highcharts.Series#name
                     * @type {string}
                     */
                    name: options.name,
                    state: '',
                    /**
                     * Read only. The series' visibility state as set by {@link
                     * Series#show}, {@link Series#hide}, or in the initial
                     * configuration.
                     *
                     * @name Highcharts.Series#visible
                     * @type {boolean}
                     */
                    visible, // True by default
                    /**
                     * Read only. The series' selected state as set by {@link
                     * Highcharts.Series#select}.
                     *
                     * @name Highcharts.Series#selected
                     * @type {boolean}
                     */
                    selected: options.selected === true // False by default
                });
                registerEventOptions(this, options);
                const events = options.events;
                if ((events && events.click) ||
                    (options.point &&
                        options.point.events &&
                        options.point.events.click) ||
                    options.allowPointSelect) {
                    chart.runTrackerClick = true;
                }
                series.getColor();
                series.getSymbol();
                // Initialize the parallel data arrays
                series.parallelArrays.forEach(function (key) {
                    if (!series[key + 'Data']) {
                        series[key + 'Data'] = [];
                    }
                });
                // Mark cartesian
                if (series.isCartesian) {
                    chart.hasCartesianSeries = true;
                }
                // Get the index and register the series in the chart. The index is
                // one more than the current latest series index (#5960).
                let lastSeries;
                if (chartSeries.length) {
                    lastSeries = chartSeries[chartSeries.length - 1];
                }
                series._i = pick(lastSeries && lastSeries._i, -1) + 1;
                series.opacity = series.options.opacity;
                // Insert the series and re-order all series above the insertion
                // point.
                chart.orderItems('series', insertItem(this, chartSeries));
                // Set options for series with sorting and set data later.
                if (options.dataSorting && options.dataSorting.enabled) {
                    series.setDataSortingOptions();
                }
                else if (!series.points && !series.data) {
                    series.setData(options.data, false);
                }
                fireEvent(this, 'afterInit');
            }
            /**
             * Check whether the series item is itself or inherits from a certain
             * series type.
             *
             * @function Highcharts.Series#is
             * @param {string} type The type of series to check for, can be either
             *        featured or custom series types. For example `column`, `pie`,
             *        `ohlc` etc.
             *
             * @return {boolean}
             *        True if this item is or inherits from the given type.
             */
            is(type) {
                return seriesTypes[type] && this instanceof seriesTypes[type];
            }
            /**
             * Set the xAxis and yAxis properties of cartesian series, and register
             * the series in the `axis.series` array.
             *
             * @private
             * @function Highcharts.Series#bindAxes
             */
            bindAxes() {
                const series = this, seriesOptions = series.options, chart = series.chart;
                let axisOptions;
                fireEvent(this, 'bindAxes', null, function () {
                    // Repeat for xAxis and yAxis
                    (series.axisTypes || []).forEach(function (coll) {
                        // Loop through the chart's axis objects
                        (chart[coll] || []).forEach(function (axis) {
                            axisOptions = axis.options;
                            // Apply if the series xAxis or yAxis option matches
                            // the number of the axis, or if undefined, use the
                            // first axis
                            if (pick(seriesOptions[coll], 0) === axis.index ||
                                (typeof seriesOptions[coll] !==
                                    'undefined' &&
                                    seriesOptions[coll] === axisOptions.id)) {
                                // Register this series in the axis.series lookup
                                insertItem(series, axis.series);
                                // Set this series.xAxis or series.yAxis reference
                                /**
                                 * Read only. The unique xAxis object associated
                                 * with the series.
                                 *
                                 * @name Highcharts.Series#xAxis
                                 * @type {Highcharts.Axis}
                                 */
                                /**
                                 * Read only. The unique yAxis object associated
                                 * with the series.
                                 *
                                 * @name Highcharts.Series#yAxis
                                 * @type {Highcharts.Axis}
                                 */
                                series[coll] = axis;
                                // Mark dirty for redraw
                                axis.isDirty = true;
                            }
                        });
                        // The series needs an X and an Y axis
                        if (!series[coll] &&
                            series.optionalAxis !== coll) {
                            error(18, true, chart);
                        }
                    });
                });
                fireEvent(this, 'afterBindAxes');
            }
            /**
             * For simple series types like line and column, the data values are
             * held in arrays like xData and yData for quick lookup to find extremes
             * and more. For multidimensional series like bubble and map, this can
             * be extended with arrays like zData and valueData by adding to the
             * `series.parallelArrays` array.
             *
             * @private
             * @function Highcharts.Series#updateParallelArrays
             */
            updateParallelArrays(point, i, iArgs) {
                const series = point.series, fn = isNumber(i) ?
                    // Insert the value in the given position
                    function (key) {
                        const val = key === 'y' && series.toYData ?
                            series.toYData(point) :
                            point[key];
                        series[key + 'Data'][i] = val;
                    } :
                    // Apply the method specified in i with the following
                    // arguments as arguments
                    function (key) {
                        Array.prototype[i].apply(series[key + 'Data'], iArgs);
                    };
                series.parallelArrays.forEach(fn);
            }
            /**
             * Define hasData functions for series. These return true if there
             * are data points on this series within the plot area.
             *
             * @private
             * @function Highcharts.Series#hasData
             */
            hasData() {
                return ((this.visible &&
                    typeof this.dataMax !== 'undefined' &&
                    typeof this.dataMin !== 'undefined') || ( // #3703
                this.visible &&
                    this.yData &&
                    this.yData.length > 0) // #9758
                );
            }
            /**
             * Determine whether the marker in a series has changed.
             *
             * @private
             * @function Highcharts.Series#hasMarkerChanged
             */
            hasMarkerChanged(options, oldOptions) {
                const marker = options.marker, oldMarker = oldOptions.marker || {};
                return marker && ((oldMarker.enabled && !marker.enabled) ||
                    oldMarker.symbol !== marker.symbol || // #10870, #15946
                    oldMarker.height !== marker.height || // #16274
                    oldMarker.width !== marker.width // #16274
                );
            }
            /**
             * Return an auto incremented x value based on the pointStart and
             * pointInterval options. This is only used if an x value is not given
             * for the point that calls autoIncrement.
             *
             * @private
             * @function Highcharts.Series#autoIncrement
             */
            autoIncrement(x) {
                const options = this.options, pointIntervalUnit = options.pointIntervalUnit, relativeXValue = options.relativeXValue, time = this.chart.time;
                let xIncrement = this.xIncrement, date, pointInterval;
                xIncrement = pick(xIncrement, options.pointStart, 0);
                this.pointInterval = pointInterval = pick(this.pointInterval, options.pointInterval, 1);
                if (relativeXValue && isNumber(x)) {
                    pointInterval *= x;
                }
                // Added code for pointInterval strings
                if (pointIntervalUnit) {
                    date = new time.Date(xIncrement);
                    if (pointIntervalUnit === 'day') {
                        time.set('Date', date, time.get('Date', date) + pointInterval);
                    }
                    else if (pointIntervalUnit === 'month') {
                        time.set('Month', date, time.get('Month', date) + pointInterval);
                    }
                    else if (pointIntervalUnit === 'year') {
                        time.set('FullYear', date, time.get('FullYear', date) + pointInterval);
                    }
                    pointInterval = date.getTime() - xIncrement;
                }
                if (relativeXValue && isNumber(x)) {
                    return xIncrement + pointInterval;
                }
                this.xIncrement = xIncrement + pointInterval;
                return xIncrement;
            }
            /**
             * Internal function to set properties for series if data sorting is
             * enabled.
             *
             * @private
             * @function Highcharts.Series#setDataSortingOptions
             */
            setDataSortingOptions() {
                const options = this.options;
                extend(this, {
                    requireSorting: false,
                    sorted: false,
                    enabledDataSorting: true,
                    allowDG: false
                });
                // To allow unsorted data for column series.
                if (!defined(options.pointRange)) {
                    options.pointRange = 1;
                }
            }
            /**
             * Set the series options by merging from the options tree. Called
             * internally on initializing and updating series. This function will
             * not redraw the series. For API usage, use {@link Series#update}.
             * @private
             * @function Highcharts.Series#setOptions
             * @param {Highcharts.SeriesOptionsType} itemOptions
             * The series options.
             * @emits Highcharts.Series#event:afterSetOptions
             */
            setOptions(itemOptions) {
                const chart = this.chart, chartOptions = chart.options, plotOptions = chartOptions.plotOptions, userOptions = chart.userOptions || {}, seriesUserOptions = merge(itemOptions), styledMode = chart.styledMode, e = {
                    plotOptions: plotOptions,
                    userOptions: seriesUserOptions
                };
                let zone;
                fireEvent(this, 'setOptions', e);
                // These may be modified by the event
                const typeOptions = e.plotOptions[this.type], userPlotOptions = (userOptions.plotOptions || {}), userPlotOptionsSeries = userPlotOptions.series || {}, defaultPlotOptionsType = (defaultOptions.plotOptions[this.type] || {}), userPlotOptionsType = userPlotOptions[this.type] || {};
                // Use copy to prevent undetected changes (#9762)
                /**
                 * Contains series options by the user without defaults.
                 * @name Highcharts.Series#userOptions
                 * @type {Highcharts.SeriesOptionsType}
                 */
                this.userOptions = e.userOptions;
                const options = merge(typeOptions, plotOptions.series, 
                // #3881, chart instance plotOptions[type] should trump
                // plotOptions.series
                userPlotOptionsType, seriesUserOptions);
                // The tooltip options are merged between global and series specific
                // options. Importance order asscendingly:
                // globals: (1)tooltip, (2)plotOptions.series,
                // (3)plotOptions[this.type]
                // init userOptions with possible later updates: 4-6 like 1-3 and
                // (7)this series options
                this.tooltipOptions = merge(defaultOptions.tooltip, // 1
                defaultOptions.plotOptions.series?.tooltip, // 2
                defaultPlotOptionsType?.tooltip, // 3
                chart.userOptions.tooltip, // 4
                userPlotOptions.series?.tooltip, // 5
                userPlotOptionsType.tooltip, // 6
                seriesUserOptions.tooltip // 7
                );
                // When shared tooltip, stickyTracking is true by default,
                // unless user says otherwise.
                this.stickyTracking = pick(seriesUserOptions.stickyTracking, userPlotOptionsType.stickyTracking, userPlotOptionsSeries.stickyTracking, (this.tooltipOptions.shared && !this.noSharedTooltip ?
                    true :
                    options.stickyTracking));
                // Delete marker object if not allowed (#1125)
                if (typeOptions.marker === null) {
                    delete options.marker;
                }
                // Handle color zones
                this.zoneAxis = options.zoneAxis || 'y';
                const zones = this.zones = // #20440, create deep copy of zones options
                    (options.zones || []).map((z) => ({ ...z }));
                if ((options.negativeColor || options.negativeFillColor) &&
                    !options.zones) {
                    zone = {
                        value: options[this.zoneAxis + 'Threshold'] ||
                            options.threshold ||
                            0,
                        className: 'highcharts-negative'
                    };
                    if (!styledMode) {
                        zone.color = options.negativeColor;
                        zone.fillColor = options.negativeFillColor;
                    }
                    zones.push(zone);
                }
                // Push one extra zone for the rest
                if (zones.length && defined(zones[zones.length - 1].value)) {
                    zones.push(styledMode ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                }
                fireEvent(this, 'afterSetOptions', { options: options });
                return options;
            }
            /**
             * Return series name in "Series {Number}" format or the one defined by
             * a user. This method can be simply overridden as series name format
             * can vary (e.g. technical indicators).
             *
             * @function Highcharts.Series#getName
             *
             * @return {string}
             * The series name.
             */
            getName() {
                // #4119
                return pick(this.options.name, 'Series ' + (this.index + 1));
            }
            /**
             * @private
             * @function Highcharts.Series#getCyclic
             */
            getCyclic(prop, value, defaults) {
                const chart = this.chart, indexName = `${prop}Index`, counterName = `${prop}Counter`, len = (
                // Symbol count
                defaults?.length ||
                    // Color count
                    chart.options.chart.colorCount);
                let i, setting;
                if (!value) {
                    // Pick up either the colorIndex option, or the series.colorIndex
                    // after Series.update()
                    setting = pick(prop === 'color' ? this.options.colorIndex : void 0, this[indexName]);
                    if (defined(setting)) { // After Series.update()
                        i = setting;
                    }
                    else {
                        // #6138
                        if (!chart.series.length) {
                            chart[counterName] = 0;
                        }
                        i = chart[counterName] % len;
                        chart[counterName] += 1;
                    }
                    if (defaults) {
                        value = defaults[i];
                    }
                }
                // Set the colorIndex
                if (typeof i !== 'undefined') {
                    this[indexName] = i;
                }
                this[prop] = value;
            }
            /**
             * Get the series' color based on either the options or pulled from
             * global options.
             *
             * @private
             * @function Highcharts.Series#getColor
             */
            getColor() {
                if (this.chart.styledMode) {
                    this.getCyclic('color');
                }
                else if (this.options.colorByPoint) {
                    this.color = "#cccccc" /* Palette.neutralColor20 */;
                }
                else {
                    this.getCyclic('color', this.options.color ||
                        defaultOptions.plotOptions[this.type].color, this.chart.options.colors);
                }
            }
            /**
             * Get all points' instances created for this series.
             *
             * @private
             * @function Highcharts.Series#getPointsCollection
             */
            getPointsCollection() {
                return (this.hasGroupedData ? this.points : this.data) || [];
            }
            /**
             * Get the series' symbol based on either the options or pulled from
             * global options.
             *
             * @private
             * @function Highcharts.Series#getSymbol
             */
            getSymbol() {
                const seriesMarkerOption = this.options.marker;
                this.getCyclic('symbol', seriesMarkerOption.symbol, this.chart.options.symbols);
            }
            /**
             * Finds the index of an existing point that matches the given point
             * options.
             *
             * @private
             * @function Highcharts.Series#findPointIndex
             * @param {Highcharts.PointOptionsObject} optionsObject
             * The options of the point.
             * @param {number} fromIndex
             * The index to start searching from, used for optimizing series with
             * required sorting.
             * @return {number|undefined}
             * Returns the index of a matching point, or undefined if no match is found.
             */
            findPointIndex(optionsObject, fromIndex) {
                const id = optionsObject.id, x = optionsObject.x, oldData = this.points, dataSorting = this.options.dataSorting;
                let matchingPoint, matchedById, pointIndex;
                if (id) {
                    const item = this.chart.get(id);
                    if (item instanceof Point) {
                        matchingPoint = item;
                    }
                }
                else if (this.linkedParent ||
                    this.enabledDataSorting ||
                    this.options.relativeXValue) {
                    let matcher = (oldPoint) => !oldPoint.touched &&
                        oldPoint.index === optionsObject.index;
                    if (dataSorting && dataSorting.matchByName) {
                        matcher = (oldPoint) => !oldPoint.touched &&
                            oldPoint.name === optionsObject.name;
                    }
                    else if (this.options.relativeXValue) {
                        matcher = (oldPoint) => !oldPoint.touched &&
                            oldPoint.options.x === optionsObject.x;
                    }
                    matchingPoint = find(oldData, matcher);
                    // Add unmatched point as a new point
                    if (!matchingPoint) {
                        return void 0;
                    }
                }
                if (matchingPoint) {
                    pointIndex = matchingPoint && matchingPoint.index;
                    if (typeof pointIndex !== 'undefined') {
                        matchedById = true;
                    }
                }
                // Search for the same X in the existing data set
                if (typeof pointIndex === 'undefined' && isNumber(x)) {
                    pointIndex = this.xData.indexOf(x, fromIndex);
                }
                // Reduce pointIndex if data is cropped
                if (pointIndex !== -1 &&
                    typeof pointIndex !== 'undefined' &&
                    this.cropped) {
                    pointIndex = (pointIndex >= this.cropStart) ?
                        pointIndex - this.cropStart : pointIndex;
                }
                if (!matchedById &&
                    isNumber(pointIndex) &&
                    oldData[pointIndex] && oldData[pointIndex].touched) {
                    pointIndex = void 0;
                }
                return pointIndex;
            }
            /**
             * Internal function called from setData. If the point count is the same
             * as it was, or if there are overlapping X values, just run
             * Point.update which is cheaper, allows animation, and keeps references
             * to points. This also allows adding or removing points if the X-es
             * don't match.
             *
             * @private
             * @function Highcharts.Series#updateData
             */
            updateData(data, animation) {
                const options = this.options, dataSorting = options.dataSorting, oldData = this.points, pointsToAdd = [], requireSorting = this.requireSorting, equalLength = data.length === oldData.length;
                let hasUpdatedByKey, i, point, lastIndex, succeeded = true;
                this.xIncrement = null;
                // Iterate the new data
                data.forEach(function (pointOptions, i) {
                    const optionsObject = (defined(pointOptions) &&
                        this.pointClass.prototype.optionsToObject.call({ series: this }, pointOptions)) || {};
                    let pointIndex;
                    // Get the x of the new data point
                    const x = optionsObject.x, id = optionsObject.id;
                    if (id || isNumber(x)) {
                        pointIndex = this.findPointIndex(optionsObject, lastIndex);
                        // Matching X not found
                        // or used already due to ununique x values (#8995),
                        // add point (but later)
                        if (pointIndex === -1 ||
                            typeof pointIndex === 'undefined') {
                            pointsToAdd.push(pointOptions);
                            // Matching X found, update
                        }
                        else if (oldData[pointIndex] &&
                            pointOptions !== options.data[pointIndex]) {
                            oldData[pointIndex].update(pointOptions, false, null, false);
                            // Mark it touched, below we will remove all points that
                            // are not touched.
                            oldData[pointIndex].touched = true;
                            // Speed optimize by only searching after last known
                            // index. Performs ~20% bettor on large data sets.
                            if (requireSorting) {
                                lastIndex = pointIndex + 1;
                            }
                            // Point exists, no changes, don't remove it
                        }
                        else if (oldData[pointIndex]) {
                            oldData[pointIndex].touched = true;
                        }
                        // If the length is equal and some of the nodes had a
                        // match in the same position, we don't want to remove
                        // non-matches.
                        if (!equalLength ||
                            i !== pointIndex ||
                            (dataSorting && dataSorting.enabled) ||
                            this.hasDerivedData) {
                            hasUpdatedByKey = true;
                        }
                    }
                    else {
                        // Gather all points that are not matched
                        pointsToAdd.push(pointOptions);
                    }
                }, this);
                // Remove points that don't exist in the updated data set
                if (hasUpdatedByKey) {
                    i = oldData.length;
                    while (i--) {
                        point = oldData[i];
                        if (point && !point.touched && point.remove) {
                            point.remove(false, animation);
                        }
                    }
                    // If we did not find keys (ids or x-values), and the length is the
                    // same, update one-to-one
                }
                else if (equalLength && (!dataSorting || !dataSorting.enabled)) {
                    data.forEach(function (point, i) {
                        // .update doesn't exist on a linked, hidden series (#3709)
                        // (#10187)
                        if (point !== oldData[i].y && !oldData[i].destroyed) {
                            oldData[i].update(point, false, null, false);
                        }
                    });
                    // Don't add new points since those configs are used above
                    pointsToAdd.length = 0;
                    // Did not succeed in updating data
                }
                else {
                    succeeded = false;
                }
                oldData.forEach(function (point) {
                    if (point) {
                        point.touched = false;
                    }
                });
                if (!succeeded) {
                    return false;
                }
                // Add new points
                pointsToAdd.forEach(function (point) {
                    this.addPoint(point, false, null, null, false);
                }, this);
                if (this.xIncrement === null &&
                    this.xData &&
                    this.xData.length) {
                    this.xIncrement = arrayMax(this.xData);
                    this.autoIncrement();
                }
                return true;
            }
            /**
             * Apply a new set of data to the series and optionally redraw it. The
             * new data array is passed by reference (except in case of
             * `updatePoints`), and may later be mutated when updating the chart
             * data.
             *
             * Note the difference in behaviour when setting the same amount of
             * points, or a different amount of points, as handled by the
             * `updatePoints` parameter.
             *
             * @sample highcharts/members/series-setdata/
             *         Set new data from a button
             * @sample highcharts/members/series-setdata-pie/
             *         Set data in a pie
             * @sample stock/members/series-setdata/
             *         Set new data in Highcharts Stock
             * @sample maps/members/series-setdata/
             *         Set new data in Highmaps
             *
             * @function Highcharts.Series#setData
             *
             * @param {Array<Highcharts.PointOptionsType>} data
             *        Takes an array of data in the same format as described under
             *        `series.{type}.data` for the given series type, for example a
             *        line series would take data in the form described under
             *        [series.line.data](https://api.highcharts.com/highcharts/series.line.data).
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart after the series is altered. If
             *        doing more operations on the chart, it is a good idea to set
             *        redraw to false and call {@link Chart#redraw} after.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        When the updated data is the same length as the existing data,
             *        points will be updated by default, and animation visualizes
             *        how the points are changed. Set false to disable animation, or
             *        a configuration object to set duration or easing.
             *
             * @param {boolean} [updatePoints=true]
             *        When this is true, points will be updated instead of replaced
             *        whenever possible. This occurs a) when the updated data is the
             *        same length as the existing data, b) when points are matched
             *        by their id's, or c) when points can be matched by X values.
             *        This allows updating with animation and performs better. In
             *        this case, the original array is not passed by reference. Set
             *        `false` to prevent.
             */
            setData(data, redraw = true, animation, updatePoints) {
                const series = this, oldData = series.points, oldDataLength = (oldData && oldData.length) || 0, options = series.options, chart = series.chart, dataSorting = options.dataSorting, xAxis = series.xAxis, turboThreshold = options.turboThreshold, xData = this.xData, yData = this.yData, pointArrayMap = series.pointArrayMap, valueCount = pointArrayMap && pointArrayMap.length, keys = options.keys;
                let i, pt, updatedData, indexOfX = 0, indexOfY = 1, copiedData;
                if (!chart.options.chart.allowMutatingData) { // #4259
                    // Remove old reference
                    if (options.data) {
                        delete series.options.data;
                    }
                    if (series.userOptions.data) {
                        delete series.userOptions.data;
                    }
                    copiedData = merge(true, data);
                }
                data = copiedData || data || [];
                const dataLength = data.length;
                if (dataSorting && dataSorting.enabled) {
                    data = this.sortData(data);
                }
                // First try to run Point.update which is cheaper, allows animation,
                // and keeps references to points.
                if (chart.options.chart.allowMutatingData &&
                    updatePoints !== false &&
                    dataLength &&
                    oldDataLength &&
                    !series.cropped &&
                    !series.hasGroupedData &&
                    series.visible &&
                    // Soft updating has no benefit in boost, and causes JS error
                    // (#8355)
                    !series.boosted) {
                    updatedData = this.updateData(data, animation);
                }
                if (!updatedData) {
                    // Reset properties
                    series.xIncrement = null;
                    series.colorCounter = 0; // For series with colorByPoint (#1547)
                    // Update parallel arrays
                    this.parallelArrays.forEach(function (key) {
                        series[key + 'Data'].length = 0;
                    });
                    // In turbo mode, look for one- or twodimensional arrays of numbers.
                    // The first and the last valid value are tested, and we assume that
                    // all the rest are defined the same way. Although the 'for' loops
                    // are similar, they are repeated inside each if-else conditional
                    // for max performance.
                    let runTurbo = turboThreshold && dataLength > turboThreshold;
                    if (runTurbo) {
                        const firstPoint = series.getFirstValidPoint(data), lastPoint = series.getFirstValidPoint(data, dataLength - 1, -1), isShortArray = (a) => Boolean(isArray(a) && (keys || isNumber(a[0])));
                        // Assume all points are numbers
                        if (isNumber(firstPoint) && isNumber(lastPoint)) {
                            for (i = 0; i < dataLength; i++) {
                                xData[i] = this.autoIncrement();
                                yData[i] = data[i];
                            }
                            // Assume all points are arrays when first point is
                        }
                        else if (isShortArray(firstPoint) &&
                            isShortArray(lastPoint)) {
                            if (valueCount) { // [x, low, high] or [x, o, h, l, c]
                                if (firstPoint.length === valueCount) {
                                    for (i = 0; i < dataLength; i++) {
                                        xData[i] = this.autoIncrement();
                                        yData[i] = data[i];
                                    }
                                }
                                else {
                                    for (i = 0; i < dataLength; i++) {
                                        pt = data[i];
                                        xData[i] = pt[0];
                                        yData[i] =
                                            pt.slice(1, valueCount + 1);
                                    }
                                }
                            }
                            else { // [x, y]
                                if (keys) {
                                    indexOfX = keys.indexOf('x');
                                    indexOfY = keys.indexOf('y');
                                    indexOfX = indexOfX >= 0 ? indexOfX : 0;
                                    indexOfY = indexOfY >= 0 ? indexOfY : 1;
                                }
                                if (firstPoint.length === 1) {
                                    indexOfY = 0;
                                }
                                if (indexOfX === indexOfY) {
                                    for (i = 0; i < dataLength; i++) {
                                        xData[i] = this.autoIncrement();
                                        yData[i] = data[i][indexOfY];
                                    }
                                }
                                else {
                                    for (i = 0; i < dataLength; i++) {
                                        pt = data[i];
                                        xData[i] = pt[indexOfX];
                                        yData[i] = pt[indexOfY];
                                    }
                                }
                            }
                        }
                        else {
                            // Highcharts expects configs to be numbers or arrays in
                            // turbo mode
                            runTurbo = false;
                        }
                    }
                    if (!runTurbo) {
                        for (i = 0; i < dataLength; i++) {
                            pt = { series: series };
                            series.pointClass.prototype.applyOptions.apply(pt, [data[i]]);
                            series.updateParallelArrays(pt, i);
                        }
                    }
                    // Forgetting to cast strings to numbers is a common caveat when
                    // handling CSV or JSON
                    if (yData && isString(yData[0])) {
                        error(14, true, chart);
                    }
                    series.data = [];
                    series.options.data = series.userOptions.data = data;
                    // Destroy old points
                    i = oldDataLength;
                    while (i--) {
                        oldData[i]?.destroy();
                    }
                    // Reset minRange (#878)
                    if (xAxis) {
                        xAxis.minRange = xAxis.userMinRange;
                    }
                    // Redraw
                    series.isDirty = chart.isDirtyBox = true;
                    series.isDirtyData = !!oldData;
                    animation = false;
                }
                // Typically for pie series, points need to be processed and
                // generated prior to rendering the legend
                if (options.legendType === 'point') {
                    this.processData();
                    this.generatePoints();
                }
                if (redraw) {
                    chart.redraw(animation);
                }
            }
            /**
             * Internal function to sort series data
             *
             * @private
             * @function Highcharts.Series#sortData
             * @param {Array<Highcharts.PointOptionsType>} data
             * Force data grouping.
             */
            sortData(data) {
                const series = this, options = series.options, dataSorting = options.dataSorting, sortKey = dataSorting.sortKey || 'y', getPointOptionsObject = function (series, pointOptions) {
                    return (defined(pointOptions) &&
                        series.pointClass.prototype.optionsToObject.call({
                            series: series
                        }, pointOptions)) || {};
                };
                data.forEach(function (pointOptions, i) {
                    data[i] = getPointOptionsObject(series, pointOptions);
                    data[i].index = i;
                }, this);
                // Sorting
                const sortedData = data.concat().sort((a, b) => {
                    const aValue = getNestedProperty(sortKey, a);
                    const bValue = getNestedProperty(sortKey, b);
                    return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
                });
                // Set x value depending on the position in the array
                sortedData.forEach(function (point, i) {
                    point.x = i;
                }, this);
                // Set the same x for linked series points if they don't have their
                // own sorting
                if (series.linkedSeries) {
                    series.linkedSeries.forEach(function (linkedSeries) {
                        const options = linkedSeries.options, seriesData = options.data;
                        if ((!options.dataSorting ||
                            !options.dataSorting.enabled) &&
                            seriesData) {
                            seriesData.forEach(function (pointOptions, i) {
                                seriesData[i] = getPointOptionsObject(linkedSeries, pointOptions);
                                if (data[i]) {
                                    seriesData[i].x = data[i].x;
                                    seriesData[i].index = i;
                                }
                            });
                            linkedSeries.setData(seriesData, false);
                        }
                    });
                }
                return data;
            }
            /**
             * Internal function to process the data by cropping away unused data
             * points if the series is longer than the crop threshold. This saves
             * computing time for large series.
             *
             * @private
             * @function Highcharts.Series#getProcessedData
             * @param {boolean} [forceExtremesFromAll]
             * Force getting extremes of a total series data range.
             */
            getProcessedData(forceExtremesFromAll) {
                const series = this, xAxis = series.xAxis, options = series.options, cropThreshold = options.cropThreshold, logarithmic = xAxis?.logarithmic, isCartesian = series.isCartesian;
                let croppedData, cropped, cropStart = 0, xExtremes, min, max, 
                // Copied during slice operation:
                processedXData = series.xData, processedYData = series.yData, updatingNames = false;
                const dataLength = processedXData.length;
                if (xAxis) {
                    // Corrected for log axis (#3053)
                    xExtremes = xAxis.getExtremes();
                    min = xExtremes.min;
                    max = xExtremes.max;
                    updatingNames = !!(xAxis.categories && !xAxis.names.length);
                }
                // Optionally filter out points outside the plot area
                if (isCartesian &&
                    series.sorted &&
                    !forceExtremesFromAll &&
                    (!cropThreshold ||
                        dataLength > cropThreshold ||
                        series.forceCrop)) {
                    // It's outside current extremes
                    if (processedXData[dataLength - 1] < min ||
                        processedXData[0] > max) {
                        processedXData = [];
                        processedYData = [];
                        // Only crop if it's actually spilling out
                    }
                    else if (series.yData && (processedXData[0] < min ||
                        processedXData[dataLength - 1] > max)) {
                        croppedData = this.cropData(series.xData, series.yData, min, max);
                        processedXData = croppedData.xData;
                        processedYData = croppedData.yData;
                        cropStart = croppedData.start;
                        cropped = true;
                    }
                }
                // Find the closest distance between processed points
                const closestPointRange = getClosestDistance([
                    logarithmic ?
                        processedXData.map(logarithmic.log2lin) :
                        processedXData
                ], 
                // Unsorted data is not supported by the line tooltip, as well as
                // data grouping and navigation in Stock charts (#725) and width
                // calculation of columns (#1900). Avoid warning during the
                // premature processing pass in updateNames (#16104).
                () => (series.requireSorting &&
                    !updatingNames &&
                    error(15, false, series.chart)));
                return {
                    xData: processedXData,
                    yData: processedYData,
                    cropped: cropped,
                    cropStart: cropStart,
                    closestPointRange: closestPointRange
                };
            }
            /**
             * Internal function to apply processed data.
             * In Highcharts Stock, this function is extended to provide data grouping.
             *
             * @private
             * @function Highcharts.Series#processData
             * @param {boolean} [force]
             * Force data grouping.
             */
            processData(force) {
                const series = this, xAxis = series.xAxis;
                // If the series data or axes haven't changed, don't go through
                // this. Return false to pass the message on to override methods
                // like in data grouping.
                if (series.isCartesian &&
                    !series.isDirty &&
                    !xAxis.isDirty &&
                    !series.yAxis.isDirty &&
                    !force) {
                    return false;
                }
                const processedData = series.getProcessedData();
                // Record the properties
                series.cropped = processedData.cropped; // Undefined or true
                series.cropStart = processedData.cropStart;
                series.processedXData = processedData.xData;
                series.processedYData = processedData.yData;
                series.closestPointRange = (series.basePointRange = processedData.closestPointRange);
                fireEvent(series, 'afterProcessData');
            }
            /**
             * Iterate over xData and crop values between min and max. Returns
             * object containing crop start/end cropped xData with corresponding
             * part of yData, dataMin and dataMax within the cropped range.
             *
             * @private
             * @function Highcharts.Series#cropData
             */
            cropData(xData, yData, min, max) {
                const dataLength = xData.length;
                let i, j, start = 0, end = dataLength;
                // Iterate up to find slice start
                for (i = 0; i < dataLength; i++) {
                    if (xData[i] >= min) {
                        start = Math.max(0, i - 1);
                        break;
                    }
                }
                // Proceed to find slice end
                for (j = i; j < dataLength; j++) {
                    if (xData[j] > max) {
                        end = j + 1;
                        break;
                    }
                }
                return {
                    xData: xData.slice(start, end),
                    yData: yData.slice(start, end),
                    start,
                    end
                };
            }
            /**
             * Generate the data point after the data has been processed by cropping
             * away unused points and optionally grouped in Highcharts Stock.
             *
             * @private
             * @function Highcharts.Series#generatePoints
             */
            generatePoints() {
                const series = this, options = series.options, dataOptions = series.processedData || options.data, processedXData = series.processedXData, processedYData = series.processedYData, PointClass = series.pointClass, processedDataLength = processedXData.length, cropStart = series.cropStart || 0, hasGroupedData = series.hasGroupedData, keys = options.keys, points = [], groupCropStartIndex = (options.dataGrouping &&
                    options.dataGrouping.groupAll ?
                    cropStart :
                    0);
                let dataLength, cursor, point, i, data = series.data;
                if (!data && !hasGroupedData) {
                    const arr = [];
                    arr.length = dataOptions.length;
                    data = series.data = arr;
                }
                if (keys && hasGroupedData) {
                    // Grouped data has already applied keys (#6590)
                    series.options.keys = false;
                }
                for (i = 0; i < processedDataLength; i++) {
                    cursor = cropStart + i;
                    if (!hasGroupedData) {
                        point = data[cursor];
                        // #970:
                        if (!point &&
                            typeof dataOptions[cursor] !== 'undefined') {
                            data[cursor] = point = new PointClass(series, dataOptions[cursor], processedXData[i]);
                        }
                    }
                    else {
                        // Splat the y data in case of ohlc data array
                        point = new PointClass(series, [processedXData[i]].concat(splat(processedYData[i])));
                        point.dataGroup = series.groupMap[groupCropStartIndex + i];
                        if (point.dataGroup.options) {
                            point.options = point.dataGroup.options;
                            extend(point, point.dataGroup.options);
                            // Collision of props and options (#9770)
                            delete point.dataLabels;
                        }
                    }
                    if (point) { // #6279
                        /**
                         * Contains the point's index in the `Series.points` array.
                         *
                         * @name Highcharts.Point#index
                         * @type {number}
                         * @readonly
                         */
                        // For faster access in Point.update
                        point.index = hasGroupedData ?
                            (groupCropStartIndex + i) : cursor;
                        points[i] = point;
                    }
                }
                // Restore keys options (#6590)
                series.options.keys = keys;
                // Hide cropped-away points - this only runs when the number of
                // points is above cropThreshold, or when switching view from
                // non-grouped data to grouped data (#637)
                if (data &&
                    (processedDataLength !== (dataLength = data.length) ||
                        hasGroupedData)) {
                    for (i = 0; i < dataLength; i++) {
                        // When has grouped data, clear all points
                        if (i === cropStart && !hasGroupedData) {
                            i += processedDataLength;
                        }
                        if (data[i]) {
                            data[i].destroyElements();
                            data[i].plotX = void 0; // #1003
                        }
                    }
                }
                /**
                 * Read only. An array containing those values converted to points.
                 * In case the series data length exceeds the `cropThreshold`, or if
                 * the data is grouped, `series.data` doesn't contain all the
                 * points. Also, in case a series is hidden, the `data` array may be
                 * empty. In case of cropping, the `data` array may contain `undefined`
                 * values, instead of points. To access raw values,
                 * `series.options.data` will always be up to date. `Series.data` only
                 * contains the points that have been created on demand. To modify the
                 * data, use
                 * {@link Highcharts.Series#setData} or
                 * {@link Highcharts.Point#update}.
                 *
                 * @see Series.points
                 *
                 * @name Highcharts.Series#data
                 * @type {Array<Highcharts.Point>}
                 */
                series.data = data;
                /**
                 * An array containing all currently visible point objects. In case
                 * of cropping, the cropped-away points are not part of this array.
                 * The `series.points` array starts at `series.cropStart` compared
                 * to `series.data` and `series.options.data`. If however the series
                 * data is grouped, these can't be correlated one to one. To modify
                 * the data, use {@link Highcharts.Series#setData} or
                 * {@link Highcharts.Point#update}.
                 *
                 * @name Highcharts.Series#points
                 * @type {Array<Highcharts.Point>}
                 */
                series.points = points;
                fireEvent(this, 'afterGeneratePoints');
            }
            /**
             * Get current X extremes for the visible data.
             *
             * @private
             * @function Highcharts.Series#getXExtremes
             * @param {Array<number>} xData
             * The data to inspect. Defaults to the current data within the visible
             * range.
             */
            getXExtremes(xData) {
                return {
                    min: arrayMin(xData),
                    max: arrayMax(xData)
                };
            }
            /**
             * Calculate Y extremes for the visible data. The result is returned
             * as an object with `dataMin` and `dataMax` properties.
             *
             * @private
             * @function Highcharts.Series#getExtremes
             * @param {Array<number>} [yData]
             * The data to inspect. Defaults to the current data within the visible
             * range.
             * @param {boolean} [forceExtremesFromAll]
             * Force getting extremes of a total series data range.
             */
            getExtremes(yData, forceExtremesFromAll) {
                const xAxis = this.xAxis, yAxis = this.yAxis, activeYData = [], 
                // Handle X outside the viewed area. This does not work with
                // non-sorted data like scatter (#7639).
                shoulder = this.requireSorting && !this.is('column') ?
                    1 : 0, 
                // #2117, need to compensate for log X axis
                positiveValuesOnly = yAxis ? yAxis.positiveValuesOnly : false, getExtremesFromAll = forceExtremesFromAll ||
                    this.getExtremesFromAll ||
                    this.options.getExtremesFromAll; // #4599
                let { processedXData, processedYData } = this, xExtremes, validValue, withinRange, x, y, i, j, xMin = 0, xMax = 0, activeCounter = 0;
                // Get the processed data from the full range (#21003)
                if (this.cropped && getExtremesFromAll) {
                    const processedData = this.getProcessedData(true);
                    processedXData = processedData.xData;
                    processedYData = processedData.yData;
                }
                yData = yData || this.stackedYData || processedYData || [];
                const yDataLength = yData.length, xData = processedXData || this.xData;
                if (xAxis) {
                    xExtremes = xAxis.getExtremes();
                    xMin = xExtremes.min;
                    xMax = xExtremes.max;
                }
                for (i = 0; i < yDataLength; i++) {
                    x = xData[i];
                    y = yData[i];
                    // For points within the visible range, including the first
                    // point outside the visible range (#7061), consider y extremes.
                    validValue = ((isNumber(y) ||
                        isArray(y)) && ((isNumber(y) ? y > 0 : y.length) ||
                        !positiveValuesOnly));
                    withinRange = (forceExtremesFromAll ||
                        this.getExtremesFromAll ||
                        this.options.getExtremesFromAll ||
                        this.cropped ||
                        !xAxis || // For colorAxis support
                        ((xData[i + shoulder] || x) >= xMin &&
                            (xData[i - shoulder] || x) <= xMax));
                    if (validValue && withinRange) {
                        j = y.length;
                        if (j) { // Array, like ohlc or range data
                            while (j--) {
                                if (isNumber(y[j])) { // #7380, #11513
                                    activeYData[activeCounter++] = y[j];
                                }
                            }
                        }
                        else {
                            activeYData[activeCounter++] = y;
                        }
                    }
                }
                const dataExtremes = {
                    activeYData, // Needed for Stock Cumulative Sum
                    dataMin: arrayMin(activeYData),
                    dataMax: arrayMax(activeYData)
                };
                fireEvent(this, 'afterGetExtremes', { dataExtremes });
                return dataExtremes;
            }
            /**
             * Set the current data extremes as `dataMin` and `dataMax` on the
             * Series item. Use this only when the series properties should be
             * updated.
             *
             * @private
             * @function Highcharts.Series#applyExtremes
             */
            applyExtremes() {
                const dataExtremes = this.getExtremes();
                /**
                 * Contains the minimum value of the series' data point. Some series
                 * types like `networkgraph` do not support this property as they
                 * lack a `y`-value.
                 * @name Highcharts.Series#dataMin
                 * @type {number|undefined}
                 * @readonly
                 */
                this.dataMin = dataExtremes.dataMin;
                /**
                 * Contains the maximum value of the series' data point. Some series
                 * types like `networkgraph` do not support this property as they
                 * lack a `y`-value.
                 * @name Highcharts.Series#dataMax
                 * @type {number|undefined}
                 * @readonly
                 */
                this.dataMax = dataExtremes.dataMax;
                return dataExtremes;
            }
            /**
             * Find and return the first non nullish point in the data
             *
             * @private
             * @function Highcharts.Series.getFirstValidPoint
             * @param {Array<Highcharts.PointOptionsType>} data
             *        Array of options for points
             * @param {number} [start=0]
             *        Index to start searching from
             * @param {number} [increment=1]
             *        Index increment, set -1 to search backwards
             */
            getFirstValidPoint(data, start = 0, increment = 1) {
                const dataLength = data.length;
                let i = start;
                while (i >= 0 && i < dataLength) {
                    if (defined(data[i])) {
                        return data[i];
                    }
                    i += increment;
                }
            }
            /**
             * Translate data points from raw data values to chart specific
             * positioning data needed later in the `drawPoints` and `drawGraph`
             * functions. This function can be overridden in plugins and custom
             * series type implementations.
             *
             * @function Highcharts.Series#translate
             *
             * @emits Highcharts.Series#events:translate
             */
            translate() {
                if (!this.processedXData) { // Hidden series
                    this.processData();
                }
                this.generatePoints();
                const series = this, options = series.options, stacking = options.stacking, xAxis = series.xAxis, categories = xAxis.categories, enabledDataSorting = series.enabledDataSorting, yAxis = series.yAxis, points = series.points, dataLength = points.length, pointPlacement = series.pointPlacementToXValue(), // #7860
                dynamicallyPlaced = Boolean(pointPlacement), threshold = options.threshold, stackThreshold = options.startFromThreshold ? threshold : 0;
                let i, plotX, lastPlotX, stackIndicator, closestPointRangePx = Number.MAX_VALUE;
                /**
                 * Plotted coordinates need to be within a limited range. Drawing
                 * too far outside the viewport causes various rendering issues
                 * (#3201, #3923, #7555).
                 * @private
                 */
                function limitedRange(val) {
                    return clamp(val, -1e5, 1e5);
                }
                // Translate each point
                for (i = 0; i < dataLength; i++) {
                    const point = points[i], xValue = point.x;
                    let stackItem, stackValues, yValue = point.y, lowValue = point.low;
                    const stacks = stacking && yAxis.stacking?.stacks[(series.negStacks &&
                        yValue <
                            (stackThreshold ? 0 : threshold) ?
                        '-' :
                        '') + series.stackKey];
                    plotX = xAxis.translate(// #3923
                    xValue, false, false, false, true, pointPlacement);
                    /**
                     * The translated X value for the point in terms of pixels. Relative
                     * to the X axis position if the series has one, otherwise relative
                     * to the plot area. Depending on the series type this value might
                     * not be defined.
                     *
                     * In an inverted chart the x-axis is going from the bottom to the
                     * top so the `plotX` value is the number of pixels from the bottom
                     * of the axis.
                     *
                     * @see Highcharts.Point#pos
                     * @name Highcharts.Point#plotX
                     * @type {number|undefined}
                     */
                    point.plotX = isNumber(plotX) ? correctFloat(// #5236
                    limitedRange(plotX) // #3923
                    ) : void 0;
                    // Calculate the bottom y value for stacked series
                    if (stacking &&
                        series.visible &&
                        stacks &&
                        stacks[xValue]) {
                        stackIndicator = series.getStackIndicator(stackIndicator, xValue, series.index);
                        if (!point.isNull && stackIndicator.key) {
                            stackItem = stacks[xValue];
                            stackValues = stackItem.points[stackIndicator.key];
                        }
                        if (stackItem && isArray(stackValues)) {
                            lowValue = stackValues[0];
                            yValue = stackValues[1];
                            if (lowValue === stackThreshold &&
                                stackIndicator.key === stacks[xValue].base) {
                                lowValue = pick(isNumber(threshold) ? threshold : yAxis.min);
                            }
                            // #1200, #1232
                            if (yAxis.positiveValuesOnly &&
                                defined(lowValue) &&
                                lowValue <= 0) {
                                lowValue = void 0;
                            }
                            point.total = point.stackTotal = pick(stackItem.total);
                            point.percentage = defined(point.y) && stackItem.total ?
                                (point.y / stackItem.total * 100) : void 0;
                            point.stackY = yValue;
                            // In case of variwide series (where widths of points are
                            // different in most cases), stack labels are positioned
                            // wrongly, so the call of the setOffset is omitted here and
                            // labels are correctly positioned later, at the end of the
                            // variwide's translate function (#10962)
                            if (!series.irregularWidths) {
                                stackItem.setOffset(series.pointXOffset || 0, series.barW || 0, void 0, void 0, void 0, series.xAxis);
                            }
                        }
                    }
                    // Set translated yBottom or remove it
                    point.yBottom = defined(lowValue) ?
                        limitedRange(yAxis.translate(lowValue, false, true, false, true)) :
                        void 0;
                    // General hook, used for Highcharts Stock compare and cumulative
                    if (series.dataModify) {
                        yValue = series.dataModify.modifyValue(yValue, i);
                    }
                    // Set the plotY value, reset it for redraws #3201, #18422
                    let plotY;
                    if (isNumber(yValue) && point.plotX !== void 0) {
                        plotY = yAxis.translate(yValue, false, true, false, true);
                        plotY = isNumber(plotY) ? limitedRange(plotY) : void 0;
                    }
                    /**
                     * The translated Y value for the point in terms of pixels. Relative
                     * to the Y axis position if the series has one, otherwise relative
                     * to the plot area. Depending on the series type this value might
                     * not be defined.
                     *
                     * In an inverted chart the y-axis is going from right to left
                     * so the `plotY` value is the number of pixels from the right
                     * of the `yAxis`.
                     *
                     * @see Highcharts.Point#pos
                     * @name Highcharts.Point#plotY
                     * @type {number|undefined}
                     */
                    point.plotY = plotY;
                    point.isInside = this.isPointInside(point);
                    // Set client related positions for mouse tracking
                    point.clientX = dynamicallyPlaced ?
                        correctFloat(xAxis.translate(xValue, false, false, false, true, pointPlacement)) :
                        plotX; // #1514, #5383, #5518
                    // Negative points #19028
                    point.negative = (point.y || 0) < (threshold || 0);
                    // Some API data
                    point.category = pick(categories && categories[point.x], point.x);
                    // Determine auto enabling of markers (#3635, #5099)
                    if (!point.isNull && point.visible !== false) {
                        if (typeof lastPlotX !== 'undefined') {
                            closestPointRangePx = Math.min(closestPointRangePx, Math.abs(plotX - lastPlotX));
                        }
                        lastPlotX = plotX;
                    }
                    // Find point zone
                    point.zone = this.zones.length ? point.getZone() : void 0;
                    // Animate new points with data sorting
                    if (!point.graphic && series.group && enabledDataSorting) {
                        point.isNew = true;
                    }
                }
                series.closestPointRangePx = closestPointRangePx;
                fireEvent(this, 'afterTranslate');
            }
            /**
             * Return the series points with null points filtered out.
             *
             * @function Highcharts.Series#getValidPoints
             *
             * @param {Array<Highcharts.Point>} [points]
             * The points to inspect, defaults to {@link Series.points}.
             *
             * @param {boolean} [insideOnly=false]
             * Whether to inspect only the points that are inside the visible view.
             *
             * @param {boolean} [allowNull=false]
             * Whether to allow null points to pass as valid points.
             *
             * @return {Array<Highcharts.Point>}
             * The valid points.
             */
            getValidPoints(points, insideOnly, allowNull) {
                const chart = this.chart;
                // #3916, #5029, #5085
                return (points || this.points || []).filter(function (point) {
                    const { plotX, plotY } = point, 
                    // Undefined plotY is treated as null when negative values
                    // in log axis (#18422)
                    asNull = !allowNull && (point.isNull || !isNumber(plotY));
                    if (asNull || (insideOnly && !chart.isInsidePlot(plotX, plotY, { inverted: chart.inverted }))) {
                        return false;
                    }
                    return point.visible !== false;
                });
            }
            /**
             * Get the clipping for the series. Could be called for a series to
             * initiate animating the clip or to set the final clip (only width
             * and x).
             *
             * @private
             * @function Highcharts.Series#getClip
             */
            getClipBox() {
                const { chart, xAxis, yAxis } = this;
                // If no axes on the series, use global clipBox
                let { x, y, width, height } = merge(chart.clipBox);
                // Otherwise, use clipBox.width which is corrected for plotBorderWidth
                // and clipOffset
                if (xAxis && xAxis.len !== chart.plotSizeX) {
                    width = xAxis.len;
                }
                if (yAxis && yAxis.len !== chart.plotSizeY) {
                    height = yAxis.len;
                }
                // If the chart is inverted and the series is not invertible, the chart
                // clip box should be inverted, but not the series clip box (#20264)
                if (chart.inverted && !this.invertible) {
                    [width, height] = [height, width];
                }
                return { x, y, width, height };
            }
            /**
             * Get the shared clip key, creating it if it doesn't exist.
             *
             * @private
             * @function Highcharts.Series#getSharedClipKey
             */
            getSharedClipKey() {
                this.sharedClipKey = (this.options.xAxis || 0) + ',' +
                    (this.options.yAxis || 0);
                return this.sharedClipKey;
            }
            /**
             * Set the clipping for the series. For animated series the clip is later
             * modified.
             *
             * @private
             * @function Highcharts.Series#setClip
             */
            setClip() {
                const { chart, group, markerGroup } = this, sharedClips = chart.sharedClips, renderer = chart.renderer, clipBox = this.getClipBox(), sharedClipKey = this.getSharedClipKey(); // #4526
                let clipRect = sharedClips[sharedClipKey];
                // If a clipping rectangle for the same set of axes does not exist,
                // create it
                if (!clipRect) {
                    sharedClips[sharedClipKey] = clipRect = renderer.clipRect(clipBox);
                    // When setting chart size, or when the series is rendered again before
                    // starting animating, in compliance to a responsive rule
                }
                else {
                    clipRect.animate(clipBox);
                }
                if (group) {
                    // When clip is false, reset to no clip after animation
                    group.clip(this.options.clip === false ? void 0 : clipRect);
                }
                // Unclip temporary animation clip
                if (markerGroup) {
                    markerGroup.clip();
                }
            }
            /**
             * Animate in the series. Called internally twice. First with the `init`
             * parameter set to true, which sets up the initial state of the
             * animation. Then when ready, it is called with the `init` parameter
             * undefined, in order to perform the actual animation.
             *
             * @function Highcharts.Series#animate
             *
             * @param {boolean} [init]
             * Initialize the animation.
             */
            animate(init) {
                const { chart, group, markerGroup } = this, inverted = chart.inverted, animation = animObject(this.options.animation), 
                // The key for temporary animation clips
                animationClipKey = [
                    this.getSharedClipKey(),
                    animation.duration,
                    animation.easing,
                    animation.defer
                ].join(',');
                let animationClipRect = chart.sharedClips[animationClipKey], markerAnimationClipRect = chart.sharedClips[animationClipKey + 'm'];
                // Initialize the animation. Set up the clipping rectangle.
                if (init && group) {
                    const clipBox = this.getClipBox();
                    // Create temporary animation clips
                    if (!animationClipRect) {
                        clipBox.width = 0;
                        if (inverted) {
                            clipBox.x = chart.plotHeight;
                        }
                        animationClipRect = chart.renderer.clipRect(clipBox);
                        chart.sharedClips[animationClipKey] = animationClipRect;
                        // The marker clip box. The number 99 is a safe margin to avoid
                        // markers being clipped during animation.
                        const markerClipBox = {
                            x: inverted ? -99 : -99,
                            y: inverted ? -99 : -99,
                            width: inverted ? chart.plotWidth + 199 : 99,
                            height: inverted ? 99 : chart.plotHeight + 199
                        };
                        markerAnimationClipRect = chart.renderer.clipRect(markerClipBox);
                        chart.sharedClips[animationClipKey + 'm'] = markerAnimationClipRect;
                    }
                    else {
                        // When height changes during animation, typically due to
                        // responsive settings
                        animationClipRect.attr('height', clipBox.height);
                    }
                    group.clip(animationClipRect);
                    markerGroup?.clip(markerAnimationClipRect);
                    // Run the animation
                }
                else if (animationClipRect &&
                    // Only first series in this pane
                    !animationClipRect.hasClass('highcharts-animating')) {
                    const finalBox = this.getClipBox(), step = animation.step;
                    // Only do this when there are actually markers, or we have multiple
                    // series (#20473)
                    if (markerGroup?.element.childNodes.length ||
                        chart.series.length > 1) {
                        // To provide as smooth animation as possible, update the marker
                        // group clipping in steps of the main group animation
                        animation.step = function (val, fx) {
                            if (step) {
                                step.apply(fx, arguments);
                            }
                            if (fx.prop === 'width' &&
                                markerAnimationClipRect?.element) {
                                markerAnimationClipRect.attr(inverted ? 'height' : 'width', val + 99);
                            }
                        };
                    }
                    animationClipRect
                        .addClass('highcharts-animating')
                        .animate(finalBox, animation);
                }
            }
            /**
             * This runs after animation to land on the final plot clipping.
             *
             * @private
             * @function Highcharts.Series#afterAnimate
             *
             * @emits Highcharts.Series#event:afterAnimate
             */
            afterAnimate() {
                this.setClip();
                // Destroy temporary clip rectangles that are no longer in use
                objectEach(this.chart.sharedClips, (clip, key, sharedClips) => {
                    if (clip && !this.chart.container.querySelector(`[clip-path="url(#${clip.id})"]`)) {
                        clip.destroy();
                        delete sharedClips[key];
                    }
                });
                this.finishedAnimating = true;
                fireEvent(this, 'afterAnimate');
            }
            /**
             * Draw the markers for line-like series types, and columns or other
             * graphical representation for {@link Point} objects for other series
             * types. The resulting element is typically stored as
             * {@link Point.graphic}, and is created on the first call and updated
             * and moved on subsequent calls.
             *
             * @function Highcharts.Series#drawPoints
             */
            drawPoints(points = this.points) {
                const series = this, chart = series.chart, styledMode = chart.styledMode, { colorAxis, options } = series, seriesMarkerOptions = options.marker, markerGroup = series[series.specialGroup || 'markerGroup'], xAxis = series.xAxis, globallyEnabled = pick(seriesMarkerOptions.enabled, !xAxis || xAxis.isRadial ? true : null, 
                // Use larger or equal as radius is null in bubbles (#6321)
                series.closestPointRangePx >= (seriesMarkerOptions.enabledThreshold *
                    seriesMarkerOptions.radius));
                let i, point, graphic, verb, pointMarkerOptions, hasPointMarker, markerAttribs;
                if (seriesMarkerOptions.enabled !== false ||
                    series._hasPointMarkers) {
                    for (i = 0; i < points.length; i++) {
                        point = points[i];
                        graphic = point.graphic;
                        verb = graphic ? 'animate' : 'attr';
                        pointMarkerOptions = point.marker || {};
                        hasPointMarker = !!point.marker;
                        const shouldDrawMarker = ((globallyEnabled &&
                            typeof pointMarkerOptions.enabled === 'undefined') || pointMarkerOptions.enabled) && !point.isNull && point.visible !== false;
                        // Only draw the point if y is defined
                        if (shouldDrawMarker) {
                            // Shortcuts
                            const symbol = pick(pointMarkerOptions.symbol, series.symbol, 'rect');
                            markerAttribs = series.markerAttribs(point, (point.selected && 'select'));
                            // Set starting position for point sliding animation.
                            if (series.enabledDataSorting) {
                                point.startXPos = xAxis.reversed ?
                                    -(markerAttribs.width || 0) :
                                    xAxis.width;
                            }
                            const isInside = point.isInside !== false;
                            if (!graphic &&
                                isInside &&
                                ((markerAttribs.width || 0) > 0 || point.hasImage)) {
                                /**
                                 * SVG graphic representing the point in the chart. In
                                 * some cases it may be a hidden graphic to improve
                                 * accessibility.
                                 *
                                 * Typically this is a simple shape, like a `rect`
                                 * for column charts or `path` for line markers, but
                                 * for some complex series types like boxplot or 3D
                                 * charts, the graphic may be a `g` element
                                 * containing other shapes. The graphic is generated
                                 * the first time {@link Series#drawPoints} runs,
                                 * and updated and moved on subsequent runs.
                                 *
                                 * @see Highcharts.Point#graphics
                                 *
                                 * @name Highcharts.Point#graphic
                                 * @type {Highcharts.SVGElement|undefined}
                                 */
                                point.graphic = graphic = chart.renderer
                                    .symbol(symbol, markerAttribs.x, markerAttribs.y, markerAttribs.width, markerAttribs.height, hasPointMarker ?
                                    pointMarkerOptions :
                                    seriesMarkerOptions)
                                    .add(markerGroup);
                                // Sliding animation for new points
                                if (series.enabledDataSorting &&
                                    chart.hasRendered) {
                                    graphic.attr({
                                        x: point.startXPos
                                    });
                                    verb = 'animate';
                                }
                            }
                            if (graphic && verb === 'animate') { // Update
                                // Since the marker group isn't clipped, each
                                // individual marker must be toggled
                                graphic[isInside ? 'show' : 'hide'](isInside)
                                    .animate(markerAttribs);
                            }
                            // Presentational attributes
                            if (graphic) {
                                const pointAttr = series.pointAttribs(point, ((styledMode || !point.selected) ?
                                    void 0 :
                                    'select'));
                                if (!styledMode) {
                                    graphic[verb](pointAttr);
                                }
                                else if (colorAxis) { // #14114
                                    graphic['css']({
                                        fill: pointAttr.fill
                                    });
                                }
                            }
                            if (graphic) {
                                graphic.addClass(point.getClassName(), true);
                            }
                        }
                        else if (graphic) {
                            point.graphic = graphic.destroy(); // #1269
                        }
                    }
                }
            }
            /**
             * Get non-presentational attributes for a point. Used internally for
             * both styled mode and classic. Can be overridden for different series
             * types.
             *
             * @see Series#pointAttribs
             *
             * @function Highcharts.Series#markerAttribs
             *
             * @param {Highcharts.Point} point
             * The Point to inspect.
             *
             * @param {string} [state]
             * The state, can be either `hover`, `select` or undefined.
             *
             * @return {Highcharts.SVGAttributes}
             * A hash containing those attributes that are not settable from CSS.
             */
            markerAttribs(point, state) {
                const seriesOptions = this.options, seriesMarkerOptions = seriesOptions.marker, pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                    seriesMarkerOptions.symbol), attribs = {};
                let seriesStateOptions, pointStateOptions, radius = pick(pointMarkerOptions.radius, seriesMarkerOptions && seriesMarkerOptions.radius);
                // Handle hover and select states
                if (state) {
                    seriesStateOptions = seriesMarkerOptions.states[state];
                    pointStateOptions = pointMarkerOptions.states &&
                        pointMarkerOptions.states[state];
                    radius = pick(pointStateOptions && pointStateOptions.radius, seriesStateOptions && seriesStateOptions.radius, radius && radius + (seriesStateOptions && seriesStateOptions.radiusPlus ||
                        0));
                }
                point.hasImage = symbol && symbol.indexOf('url') === 0;
                if (point.hasImage) {
                    radius = 0; // And subsequently width and height is not set
                }
                const pos = point.pos();
                if (isNumber(radius) && pos) {
                    if (seriesOptions.crisp) {
                        pos[0] = crisp(pos[0], point.hasImage ?
                            0 :
                            symbol === 'rect' ?
                                // Rectangle symbols need crisp edges, others don't
                                seriesMarkerOptions?.lineWidth || 0 :
                                1);
                    }
                    attribs.x = pos[0] - radius;
                    attribs.y = pos[1] - radius;
                }
                if (radius) {
                    attribs.width = attribs.height = 2 * radius;
                }
                return attribs;
            }
            /**
             * Internal function to get presentational attributes for each point.
             * Unlike {@link Series#markerAttribs}, this function should return
             * those attributes that can also be set in CSS. In styled mode,
             * `pointAttribs` won't be called.
             *
             * @private
             * @function Highcharts.Series#pointAttribs
             *
             * @param {Highcharts.Point} [point]
             * The point instance to inspect.
             *
             * @param {string} [state]
             * The point state, can be either `hover`, `select` or 'normal'. If
             * undefined, normal state is assumed.
             *
             * @return {Highcharts.SVGAttributes}
             * The presentational attributes to be set on the point.
             */
            pointAttribs(point, state) {
                const seriesMarkerOptions = this.options.marker, pointOptions = point && point.options, pointMarkerOptions = ((pointOptions && pointOptions.marker) || {}), pointColorOption = pointOptions && pointOptions.color, pointColor = point && point.color, zoneColor = point && point.zone && point.zone.color;
                let seriesStateOptions, pointStateOptions, color = this.color, fill, stroke, strokeWidth = pick(pointMarkerOptions.lineWidth, seriesMarkerOptions.lineWidth), opacity = 1;
                color = (pointColorOption ||
                    zoneColor ||
                    pointColor ||
                    color);
                fill = (pointMarkerOptions.fillColor ||
                    seriesMarkerOptions.fillColor ||
                    color);
                stroke = (pointMarkerOptions.lineColor ||
                    seriesMarkerOptions.lineColor ||
                    color);
                // Handle hover and select states
                state = state || 'normal';
                if (state) {
                    seriesStateOptions = (seriesMarkerOptions.states[state] || {});
                    pointStateOptions = (pointMarkerOptions.states &&
                        pointMarkerOptions.states[state]) || {};
                    strokeWidth = pick(pointStateOptions.lineWidth, seriesStateOptions.lineWidth, strokeWidth + pick(pointStateOptions.lineWidthPlus, seriesStateOptions.lineWidthPlus, 0));
                    fill = (pointStateOptions.fillColor ||
                        seriesStateOptions.fillColor ||
                        fill);
                    stroke = (pointStateOptions.lineColor ||
                        seriesStateOptions.lineColor ||
                        stroke);
                    opacity = pick(pointStateOptions.opacity, seriesStateOptions.opacity, opacity);
                }
                return {
                    'stroke': stroke,
                    'stroke-width': strokeWidth,
                    'fill': fill,
                    'opacity': opacity
                };
            }
            /**
             * Clear DOM objects and free up memory.
             *
             * @private
             * @function Highcharts.Series#destroy
             *
             * @emits Highcharts.Series#event:destroy
             */
            destroy(keepEventsForUpdate) {
                const series = this, chart = series.chart, issue134 = /AppleWebKit\/533/.test(win.navigator.userAgent), data = series.data || [];
                let destroy, i, point, axis;
                // Add event hook
                fireEvent(series, 'destroy', { keepEventsForUpdate });
                // Remove events
                this.removeEvents(keepEventsForUpdate);
                // Erase from axes
                (series.axisTypes || []).forEach(function (AXIS) {
                    axis = series[AXIS];
                    if (axis && axis.series) {
                        erase(axis.series, series);
                        axis.isDirty = axis.forceRedraw = true;
                    }
                });
                // Remove legend items
                if (series.legendItem) {
                    series.chart.legend.destroyItem(series);
                }
                // Destroy all points with their elements
                i = data.length;
                while (i--) {
                    point = data[i];
                    if (point && point.destroy) {
                        point.destroy();
                    }
                }
                for (const zone of series.zones) {
                    // Destroy SVGElement's but preserve primitive props (#20426)
                    destroyObjectProperties(zone, void 0, true);
                }
                // Clear the animation timeout if we are destroying the series
                // during initial animation
                U.clearTimeout(series.animationTimeout);
                // Destroy all SVGElements associated to the series
                objectEach(series, function (val, prop) {
                    // Survive provides a hook for not destroying
                    if (val instanceof SVGElement && !val.survive) {
                        // Issue 134 workaround
                        destroy = issue134 && prop === 'group' ?
                            'hide' :
                            'destroy';
                        val[destroy]();
                    }
                });
                // Remove from hoverSeries
                if (chart.hoverSeries === series) {
                    chart.hoverSeries = void 0;
                }
                erase(chart.series, series);
                chart.orderItems('series');
                // Clear all members
                objectEach(series, function (val, prop) {
                    if (!keepEventsForUpdate || prop !== 'hcEvents') {
                        delete series[prop];
                    }
                });
            }
            /**
             * Clip the graphs into zones for colors and styling.
             *
             * @private
             * @function Highcharts.Series#applyZones
             */
            applyZones() {
                const series = this, { area, chart, graph, zones, points, xAxis, yAxis, zoneAxis } = series, { inverted, renderer } = chart, axis = this[`${zoneAxis}Axis`], { isXAxis, len = 0 } = axis || {}, halfWidth = (graph?.strokeWidth() || 0) / 2 + 1, 
                // Avoid points that are so close to the threshold that the graph
                // line would be split
                avoidClose = (zone, plotX = 0, plotY = 0) => {
                    if (inverted) {
                        plotY = len - plotY;
                    }
                    const { translated = 0, lineClip } = zone, distance = plotY - translated;
                    lineClip?.push([
                        'L',
                        plotX,
                        Math.abs(distance) < halfWidth ?
                            plotY - halfWidth * (distance <= 0 ? -1 : 1) :
                            translated
                    ]);
                };
                if (zones.length &&
                    (graph || area) &&
                    axis &&
                    isNumber(axis.min)) {
                    const axisMax = axis.getExtremes().max, 
                    // Invert the x and y coordinates of inverted charts
                    invertPath = (path) => {
                        path.forEach((segment, i) => {
                            if (segment[0] === 'M' || segment[0] === 'L') {
                                path[i] = [
                                    segment[0],
                                    isXAxis ? len - segment[1] : segment[1],
                                    isXAxis ? segment[2] : len - segment[2]
                                ];
                            }
                        });
                    };
                    // Reset
                    zones.forEach((zone) => {
                        zone.lineClip = [];
                        zone.translated = clamp(axis.toPixels(pick(zone.value, axisMax), true) || 0, 0, len);
                    });
                    // The use of the Color Threshold assumes there are no gaps so it is
                    // safe to hide the original graph and area unless it is not
                    // waterfall series, then use showLine property to set lines between
                    // columns to be visible (#7862)
                    if (graph && !this.showLine) {
                        graph.hide();
                    }
                    if (area) {
                        area.hide();
                    }
                    // Prepare for adaptive clips, avoiding segments close to the
                    // threshold (#19709)
                    if (zoneAxis === 'y' &&
                        // Overheat protection
                        points.length < xAxis.len) {
                        for (const point of points) {
                            const { plotX, plotY, zone } = point, zoneBelow = zone && zones[zones.indexOf(zone) - 1];
                            // Close to upper boundary
                            if (zone) {
                                avoidClose(zone, plotX, plotY);
                            }
                            // Close to lower boundary
                            if (zoneBelow) {
                                avoidClose(zoneBelow, plotX, plotY);
                            }
                        }
                    }
                    // Compute and apply the clips
                    let lastLineClip = [], lastTranslated = axis.toPixels(axis.getExtremes().min, true);
                    zones.forEach((zone) => {
                        const lineClip = zone.lineClip || [], translated = Math.round(zone.translated || 0);
                        if (xAxis.reversed) {
                            lineClip.reverse();
                        }
                        let { clip, simpleClip } = zone, x1 = 0, y1 = 0, x2 = xAxis.len, y2 = yAxis.len;
                        if (isXAxis) {
                            x1 = translated;
                            x2 = lastTranslated;
                        }
                        else {
                            y1 = translated;
                            y2 = lastTranslated;
                        }
                        // Adaptive clips
                        const simplePath = [
                            ['M', x1, y1],
                            ['L', x2, y1],
                            ['L', x2, y2],
                            ['L', x1, y2],
                            ['Z']
                        ], adaptivePath = [
                            simplePath[0],
                            ...lineClip,
                            simplePath[1],
                            simplePath[2],
                            ...lastLineClip,
                            simplePath[3],
                            simplePath[4]
                        ];
                        lastLineClip = lineClip.reverse();
                        lastTranslated = translated;
                        if (inverted) {
                            invertPath(adaptivePath);
                            if (area) {
                                invertPath(simplePath);
                            }
                        }
                        /* Debug clip paths
                        chart.renderer.path(adaptivePath)
                            .attr({
                                stroke: zone.color || this.color || 'gray',
                                'stroke-width': 1,
                                'dashstyle': 'Dash'
                            })
                            .add(series.group);
                        // */
                        if (clip) {
                            clip.animate({ d: adaptivePath });
                            simpleClip?.animate({ d: simplePath });
                        }
                        else {
                            clip = zone.clip = renderer.path(adaptivePath);
                            if (area) {
                                simpleClip = zone.simpleClip = renderer.path(simplePath);
                            }
                        }
                        // When no data, graph zone is not applied and after setData
                        // clip was ignored. As a result, it should be applied each
                        // time.
                        if (graph) {
                            zone.graph?.clip(clip);
                        }
                        if (area) {
                            zone.area?.clip(simpleClip);
                        }
                    });
                }
                else if (series.visible) {
                    // If zones were removed, restore graph and area
                    if (graph) {
                        graph.show();
                    }
                    if (area) {
                        area.show();
                    }
                }
            }
            /**
             * General abstraction for creating plot groups like series.group,
             * series.dataLabelsGroup and series.markerGroup. On subsequent calls,
             * the group will only be adjusted to the updated plot size.
             *
             * @private
             * @function Highcharts.Series#plotGroup
             */
            plotGroup(prop, name, visibility, zIndex, parent) {
                let group = this[prop];
                const isNew = !group, attrs = {
                    visibility,
                    zIndex: zIndex || 0.1 // Pointer logic uses this
                };
                // Avoid setting undefined opacity, or in styled mode
                if (defined(this.opacity) &&
                    !this.chart.styledMode && this.state !== 'inactive' // #13719
                ) {
                    attrs.opacity = this.opacity;
                }
                // Generate it on first call
                if (!group) {
                    this[prop] = group = this.chart.renderer
                        .g()
                        .add(parent);
                }
                // Add the class names, and replace existing ones as response to
                // Series.update (#6660)
                group.addClass(('highcharts-' + name +
                    ' highcharts-series-' + this.index +
                    ' highcharts-' + this.type + '-series ' +
                    (defined(this.colorIndex) ?
                        'highcharts-color-' + this.colorIndex + ' ' :
                        '') +
                    (this.options.className || '') +
                    (group.hasClass('highcharts-tracker') ?
                        ' highcharts-tracker' :
                        '')), true);
                // Place it on first and subsequent (redraw) calls
                group.attr(attrs)[isNew ? 'attr' : 'animate'](this.getPlotBox(name));
                return group;
            }
            /**
             * Get the translation and scale for the plot area of this series.
             *
             * @function Highcharts.Series#getPlotBox
             */
            getPlotBox(name) {
                let horAxis = this.xAxis, vertAxis = this.yAxis;
                const chart = this.chart, inverted = (chart.inverted &&
                    !chart.polar &&
                    horAxis &&
                    this.invertible &&
                    name === 'series');
                // Swap axes for inverted (#2339)
                if (chart.inverted) {
                    horAxis = vertAxis;
                    vertAxis = this.xAxis;
                }
                return {
                    translateX: horAxis ? horAxis.left : chart.plotLeft,
                    translateY: vertAxis ? vertAxis.top : chart.plotTop,
                    rotation: inverted ? 90 : 0,
                    rotationOriginX: inverted ?
                        (horAxis.len - vertAxis.len) / 2 :
                        0,
                    rotationOriginY: inverted ?
                        (horAxis.len + vertAxis.len) / 2 :
                        0,
                    scaleX: inverted ? -1 : 1, // #1623
                    scaleY: 1
                };
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             * @private
             * @function Highcharts.Series#removeEvents
             */
            removeEvents(keepEventsForUpdate) {
                const { eventsToUnbind } = this;
                if (!keepEventsForUpdate) {
                    // Remove all events
                    removeEvent(this);
                }
                if (eventsToUnbind.length) {
                    // Remove only internal events for proper update. #12355 solves
                    // problem with multiple destroy events
                    eventsToUnbind.forEach((unbind) => {
                        unbind();
                    });
                    eventsToUnbind.length = 0;
                }
            }
            /**
             * Render the graph and markers. Called internally when first rendering
             * and later when redrawing the chart. This function can be extended in
             * plugins, but normally shouldn't be called directly.
             *
             * @function Highcharts.Series#render
             *
             * @emits Highcharts.Series#event:afterRender
             */
            render() {
                const series = this, { chart, options, hasRendered } = series, animOptions = animObject(options.animation), visibility = series.visible ?
                    'inherit' : 'hidden', // #2597
                zIndex = options.zIndex, chartSeriesGroup = chart.seriesGroup;
                let animDuration = series.finishedAnimating ?
                    0 : animOptions.duration;
                fireEvent(this, 'render');
                // The group
                series.plotGroup('group', 'series', visibility, zIndex, chartSeriesGroup);
                series.markerGroup = series.plotGroup('markerGroup', 'markers', visibility, zIndex, chartSeriesGroup);
                // Initial clipping, applies to columns etc. (#3839).
                if (options.clip !== false) {
                    series.setClip();
                }
                // Initialize the animation
                if (animDuration) {
                    series.animate?.(true);
                }
                // Draw the graph if any
                if (series.drawGraph) {
                    series.drawGraph();
                    series.applyZones();
                }
                // Draw the points
                if (series.visible) {
                    series.drawPoints();
                }
                // Draw the data labels
                series.drawDataLabels?.();
                // In pie charts, slices are added to the DOM, but actual rendering
                // is postponed until labels reserved their space
                series.redrawPoints?.();
                // Draw the mouse tracking area
                if (options.enableMouseTracking) {
                    series.drawTracker?.();
                }
                // Run the animation
                if (animDuration) {
                    series.animate?.();
                }
                // Call the afterAnimate function on animation complete (but don't
                // overwrite the animation.complete option which should be available
                // to the user).
                if (!hasRendered) {
                    // Additional time if defer is defined before afterAnimate
                    // will be triggered
                    if (animDuration && animOptions.defer) {
                        animDuration += animOptions.defer;
                    }
                    series.animationTimeout = syncTimeout(() => {
                        series.afterAnimate();
                    }, animDuration || 0);
                }
                // Means data is in accordance with what you see
                series.isDirty = false;
                // (See #322) series.isDirty = series.isDirtyData = false; // means
                // data is in accordance with what you see
                series.hasRendered = true;
                fireEvent(series, 'afterRender');
            }
            /**
             * Redraw the series. This function is called internally from
             * `chart.redraw` and normally shouldn't be called directly.
             * @private
             * @function Highcharts.Series#redraw
             */
            redraw() {
                // Cache it here as it is set to false in render, but used after
                const wasDirty = this.isDirty || this.isDirtyData;
                this.translate();
                this.render();
                if (wasDirty) { // #3868, #3945
                    delete this.kdTree;
                }
            }
            /**
             * Whether to reserve space for the series, either because it is visible or
             * because the `chart.ignoreHiddenSeries` option is false.
             *
             * @private
             */
            reserveSpace() {
                return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
            }
            /**
             * Find the nearest point from a pointer event. This applies to series that
             * use k-d-trees to get the nearest point. Native pointer events must be
             * normalized using `Pointer.normalize`, that adds `chartX` and `chartY`
             * properties.
             *
             * @sample highcharts/demo/synchronized-charts
             *         Synchronized charts with tooltips
             *
             * @function Highcharts.Series#searchPoint
             *
             * @param {Highcharts.PointerEvent} e
             *        The normalized pointer event
             * @param {boolean} [compareX=false]
             *        Search only by the X value, not Y
             *
             * @return {Point|undefined}
             *        The closest point to the pointer event
             */
            searchPoint(e, compareX) {
                const { xAxis, yAxis } = this, inverted = this.chart.inverted;
                return this.searchKDTree({
                    clientX: inverted ?
                        xAxis.len - e.chartY + xAxis.pos :
                        e.chartX - xAxis.pos,
                    plotY: inverted ?
                        yAxis.len - e.chartX + yAxis.pos :
                        e.chartY - yAxis.pos
                }, compareX, e);
            }
            /**
             * Build the k-d-tree that is used by mouse and touch interaction to get
             * the closest point. Line-like series typically have a one-dimensional
             * tree where points are searched along the X axis, while scatter-like
             * series typically search in two dimensions, X and Y.
             *
             * @private
             * @function Highcharts.Series#buildKDTree
             */
            buildKDTree(e) {
                // Prevent multiple k-d-trees from being built simultaneously
                // (#6235)
                this.buildingKdTree = true;
                const series = this, dimensions = series.options.findNearestPointBy
                    .indexOf('y') > -1 ? 2 : 1;
                /**
                 * Internal function
                 * @private
                 */
                function kdtree(points, depth, dimensions) {
                    const length = points?.length;
                    let axis, median;
                    if (length) {
                        // Alternate between the axis
                        axis = series.kdAxisArray[depth % dimensions];
                        // Sort point array
                        points.sort((a, b) => (a[axis] || 0) - (b[axis] || 0));
                        median = Math.floor(length / 2);
                        // Build and return node
                        return {
                            point: points[median],
                            left: kdtree(points.slice(0, median), depth + 1, dimensions),
                            right: kdtree(points.slice(median + 1), depth + 1, dimensions)
                        };
                    }
                }
                /**
                 * Start the recursive build process with a clone of the points
                 * array and null points filtered out. (#3873)
                 * @private
                 */
                function startRecursive() {
                    series.kdTree = kdtree(series.getValidPoints(void 0, 
                    // For line-type series restrict to plot area, but
                    // column-type series not (#3916, #4511)
                    !series.directTouch), dimensions, dimensions);
                    series.buildingKdTree = false;
                }
                delete series.kdTree;
                // For testing tooltips, don't build async. Also if touchstart, we may
                // be dealing with click events on mobile, so don't delay (#6817).
                syncTimeout(startRecursive, series.options.kdNow || e?.type === 'touchstart' ? 0 : 1);
            }
            /**
             * @private
             * @function Highcharts.Series#searchKDTree
             */
            searchKDTree(point, compareX, e) {
                const series = this, [kdX, kdY] = this.kdAxisArray, kdComparer = compareX ? 'distX' : 'dist', kdDimensions = (series.options.findNearestPointBy || '')
                    .indexOf('y') > -1 ? 2 : 1, useRadius = !!series.isBubble;
                /**
                 * Set the one and two dimensional distance on the point object.
                 * @private
                 */
                function setDistance(p1, p2) {
                    const p1kdX = p1[kdX], p2kdX = p2[kdX], x = (defined(p1kdX) && defined(p2kdX)) ? p1kdX - p2kdX : null, p1kdY = p1[kdY], p2kdY = p2[kdY], y = (defined(p1kdY) && defined(p2kdY)) ? p1kdY - p2kdY : 0, radius = useRadius ? (p2.marker?.radius || 0) : 0;
                    p2.dist = Math.sqrt(((x && x * x) || 0) + y * y) - radius;
                    p2.distX = defined(x) ? (Math.abs(x) - radius) : Number.MAX_VALUE;
                }
                /**
                 * @private
                 */
                function doSearch(search, tree, depth, dimensions) {
                    const point = tree.point, axis = series.kdAxisArray[depth % dimensions];
                    let nPoint1, nPoint2, ret = point;
                    setDistance(search, point);
                    // Pick side based on distance to splitting point
                    const tdist = (search[axis] || 0) - (point[axis] || 0) +
                        (useRadius ? (point.marker?.radius || 0) : 0), sideA = tdist < 0 ? 'left' : 'right', sideB = tdist < 0 ? 'right' : 'left';
                    // End of tree
                    if (tree[sideA]) {
                        nPoint1 = doSearch(search, tree[sideA], depth + 1, dimensions);
                        ret = (nPoint1[kdComparer] <
                            ret[kdComparer] ?
                            nPoint1 :
                            point);
                    }
                    if (tree[sideB]) {
                        // Compare distance to current best to splitting point to decide
                        // whether to check side B or not
                        if (Math.sqrt(tdist * tdist) < ret[kdComparer]) {
                            nPoint2 = doSearch(search, tree[sideB], depth + 1, dimensions);
                            ret = (nPoint2[kdComparer] <
                                ret[kdComparer] ?
                                nPoint2 :
                                ret);
                        }
                    }
                    return ret;
                }
                if (!this.kdTree && !this.buildingKdTree) {
                    this.buildKDTree(e);
                }
                if (this.kdTree) {
                    return doSearch(point, this.kdTree, kdDimensions, kdDimensions);
                }
            }
            /**
             * @private
             * @function Highcharts.Series#pointPlacementToXValue
             */
            pointPlacementToXValue() {
                const { options, xAxis } = this;
                let factor = options.pointPlacement;
                // Point placement is relative to each series pointRange (#5889)
                if (factor === 'between') {
                    factor = xAxis.reversed ? -0.5 : 0.5; // #11955
                }
                return isNumber(factor) ?
                    factor * (options.pointRange || xAxis.pointRange) :
                    0;
            }
            /**
             * @private
             * @function Highcharts.Series#isPointInside
             */
            isPointInside(point) {
                const { chart, xAxis, yAxis } = this, { plotX = -1, plotY = -1 } = point, isInside = (plotY >= 0 &&
                    plotY <= (yAxis ? yAxis.len : chart.plotHeight) &&
                    plotX >= 0 &&
                    plotX <= (xAxis ? xAxis.len : chart.plotWidth));
                return isInside;
            }
            /**
             * Draw the tracker object that sits above all data labels and markers to
             * track mouse events on the graph or points. For the line type charts
             * the tracker uses the same graphPath, but with a greater stroke width
             * for better control.
             * @private
             */
            drawTracker() {
                const series = this, options = series.options, trackByArea = options.trackByArea, trackerPath = [].concat((trackByArea ? series.areaPath : series.graphPath) || []), chart = series.chart, pointer = chart.pointer, renderer = chart.renderer, snap = chart.options.tooltip?.snap || 0, onMouseOver = () => {
                    if (options.enableMouseTracking &&
                        chart.hoverSeries !== series) {
                        series.onMouseOver();
                    }
                }, 
                /*
                 * Empirical lowest possible opacities for TRACKER_FILL for an
                 * element to stay invisible but clickable
                 * IE9: 0.00000000001 (unlimited)
                 * IE10: 0.0001 (exporting only)
                 * FF: 0.00000000001 (unlimited)
                 * Chrome: 0.000001
                 * Safari: 0.000001
                 * Opera: 0.00000000001 (unlimited)
                 */
                TRACKER_FILL = 'rgba(192,192,192,' + (svg ? 0.0001 : 0.002) + ')';
                let tracker = series.tracker;
                // Draw the tracker
                if (tracker) {
                    tracker.attr({ d: trackerPath });
                }
                else if (series.graph) { // Create
                    series.tracker = tracker = renderer.path(trackerPath)
                        .attr({
                        visibility: series.visible ? 'inherit' : 'hidden',
                        zIndex: 2
                    })
                        .addClass(trackByArea ?
                        'highcharts-tracker-area' :
                        'highcharts-tracker-line')
                        .add(series.group);
                    if (!chart.styledMode) {
                        tracker.attr({
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round', // #1225
                            stroke: TRACKER_FILL,
                            fill: trackByArea ? TRACKER_FILL : 'none',
                            'stroke-width': series.graph.strokeWidth() +
                                (trackByArea ? 0 : 2 * snap)
                        });
                    }
                    // The tracker is added to the series group, which is clipped, but
                    // is covered by the marker group. So the marker group also needs to
                    // capture events.
                    [
                        series.tracker,
                        series.markerGroup,
                        series.dataLabelsGroup
                    ].forEach((tracker) => {
                        if (tracker) {
                            tracker.addClass('highcharts-tracker')
                                .on('mouseover', onMouseOver)
                                .on('mouseout', (e) => {
                                pointer?.onTrackerMouseOut(e);
                            });
                            if (options.cursor && !chart.styledMode) {
                                tracker.css({ cursor: options.cursor });
                            }
                            tracker.on('touchstart', onMouseOver);
                        }
                    });
                }
                fireEvent(this, 'afterDrawTracker');
            }
            /**
             * Add a point to the series after render time. The point can be added at
             * the end, or by giving it an X value, to the start or in the middle of the
             * series.
             *
             * @sample highcharts/members/series-addpoint-append/
             *         Append point
             * @sample highcharts/members/series-addpoint-append-and-shift/
             *         Append and shift
             * @sample highcharts/members/series-addpoint-x-and-y/
             *         Both X and Y values given
             * @sample highcharts/members/series-addpoint-pie/
             *         Append pie slice
             * @sample stock/members/series-addpoint/
             *         Append 100 points in Highcharts Stock
             * @sample stock/members/series-addpoint-shift/
             *         Append and shift in Highcharts Stock
             * @sample maps/members/series-addpoint/
             *         Add a point in Highmaps
             *
             * @function Highcharts.Series#addPoint
             *
             * @param {Highcharts.PointOptionsType} options
             *        The point options. If options is a single number, a point with
             *        that y value is appended to the series. If it is an array, it will
             *        be interpreted as x and y values respectively. If it is an
             *        object, advanced options as outlined under `series.data` are
             *        applied.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart after the point is added. When adding
             *        more than one point, it is highly recommended that the redraw
             *        option be set to false, and instead {@link Chart#redraw} is
             *        explicitly called after the adding of points is finished.
             *        Otherwise, the chart will redraw after adding each point.
             *
             * @param {boolean} [shift=false]
             *        If true, a point is shifted off the start of the series as one is
             *        appended to the end.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        Whether to apply animation, and optionally animation
             *        configuration.
             *
             * @param {boolean} [withEvent=true]
             *        Used internally, whether to fire the series `addPoint` event.
             *
             * @emits Highcharts.Series#event:addPoint
             */
            addPoint(options, redraw, shift, animation, withEvent) {
                const series = this, seriesOptions = series.options, data = series.data, chart = series.chart, xAxis = series.xAxis, names = xAxis && xAxis.hasNames && xAxis.names, dataOptions = seriesOptions.data, xData = series.xData;
                let isInTheMiddle, i;
                // Optional redraw, defaults to true
                redraw = pick(redraw, true);
                // Get options and push the point to xData, yData and series.options. In
                // series.generatePoints the Point instance will be created on demand
                // and pushed to the series.data array.
                const point = { series: series };
                series.pointClass.prototype.applyOptions.apply(point, [options]);
                const x = point.x;
                // Get the insertion point
                i = xData.length;
                if (series.requireSorting && x < xData[i - 1]) {
                    isInTheMiddle = true;
                    while (i && xData[i - 1] > x) {
                        i--;
                    }
                }
                // Insert undefined item
                series.updateParallelArrays(point, 'splice', [i, 0, 0]);
                // Update it
                series.updateParallelArrays(point, i);
                if (names && point.name) {
                    names[x] = point.name;
                }
                dataOptions.splice(i, 0, options);
                if (isInTheMiddle ||
                    // When processedData is present we need to splice an empty slot
                    // into series.data, otherwise generatePoints won't pick it up.
                    series.processedData) {
                    series.data.splice(i, 0, null);
                    series.processData();
                }
                // Generate points to be added to the legend (#1329)
                if (seriesOptions.legendType === 'point') {
                    series.generatePoints();
                }
                // Shift the first point off the parallel arrays
                if (shift) {
                    if (data[0] && !!data[0].remove) {
                        data[0].remove(false);
                    }
                    else {
                        data.shift();
                        series.updateParallelArrays(point, 'shift');
                        dataOptions.shift();
                    }
                }
                // Fire event
                if (withEvent !== false) {
                    fireEvent(series, 'addPoint', { point: point });
                }
                // Redraw
                series.isDirty = true;
                series.isDirtyData = true;
                if (redraw) {
                    chart.redraw(animation); // Animation is set anyway on redraw, #5665
                }
            }
            /**
             * Remove a point from the series. Unlike the
             * {@link Highcharts.Point#remove} method, this can also be done on a point
             * that is not instantiated because it is outside the view or subject to
             * Highcharts Stock data grouping.
             *
             * @sample highcharts/members/series-removepoint/
             *         Remove cropped point
             *
             * @function Highcharts.Series#removePoint
             *
             * @param {number} i
             *        The index of the point in the {@link Highcharts.Series.data|data}
             *        array.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart after the point is added. When
             *        removing more than one point, it is highly recommended that the
             *        `redraw` option be set to `false`, and instead {@link
             *        Highcharts.Chart#redraw} is explicitly called after the adding of
             *        points is finished.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        Whether and optionally how the series should be animated.
             *
             * @emits Highcharts.Point#event:remove
             */
            removePoint(i, redraw, animation) {
                const series = this, data = series.data, point = data[i], points = series.points, chart = series.chart, remove = function () {
                    if (points && points.length === data.length) { // #4935
                        points.splice(i, 1);
                    }
                    data.splice(i, 1);
                    series.options.data.splice(i, 1);
                    series.updateParallelArrays(point || { series: series }, 'splice', [i, 1]);
                    if (point) {
                        point.destroy();
                    }
                    // Redraw
                    series.isDirty = true;
                    series.isDirtyData = true;
                    if (redraw) {
                        chart.redraw();
                    }
                };
                setAnimation(animation, chart);
                redraw = pick(redraw, true);
                // Fire the event with a default handler of removing the point
                if (point) {
                    point.firePointEvent('remove', null, remove);
                }
                else {
                    remove();
                }
            }
            /**
             * Remove a series and optionally redraw the chart.
             *
             * @sample highcharts/members/series-remove/
             *         Remove first series from a button
             *
             * @function Highcharts.Series#remove
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call to
             *        {@link Highcharts.Chart#redraw}.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        Whether to apply animation, and optionally animation
             *        configuration.
             *
             * @param {boolean} [withEvent=true]
             *        Used internally, whether to fire the series `remove` event.
             *
             * @emits Highcharts.Series#event:remove
             */
            remove(redraw, animation, withEvent, keepEvents) {
                const series = this, chart = series.chart;
                /**
                 * @private
                 */
                function remove() {
                    // Destroy elements
                    series.destroy(keepEvents);
                    // Redraw
                    chart.isDirtyLegend = chart.isDirtyBox = true;
                    chart.linkSeries(keepEvents);
                    if (pick(redraw, true)) {
                        chart.redraw(animation);
                    }
                }
                // Fire the event with a default handler of removing the point
                if (withEvent !== false) {
                    fireEvent(series, 'remove', null, remove);
                }
                else {
                    remove();
                }
            }
            /**
             * Update the series with a new set of options. For a clean and precise
             * handling of new options, all methods and elements from the series are
             * removed, and it is initialized from scratch. Therefore, this method is
             * more performance expensive than some other utility methods like {@link
             * Series#setData} or {@link Series#setVisible}.
             *
             * Note that `Series.update` may mutate the passed `data` options.
             *
             * @sample highcharts/members/series-update/
             *         Updating series options
             * @sample maps/members/series-update/
             *         Update series options in Highmaps
             *
             * @function Highcharts.Series#update
             *
             * @param {Highcharts.SeriesOptionsType} options
             *        New options that will be merged with the series' existing options.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart after the series is altered. If doing
             *        more operations on the chart, it is a good idea to set redraw to
             *        false and call {@link Chart#redraw} after.
             *
             * @emits Highcharts.Series#event:update
             * @emits Highcharts.Series#event:afterUpdate
             */
            update(options, redraw) {
                options = diffObjects(options, this.userOptions);
                fireEvent(this, 'update', { options: options });
                const series = this, chart = series.chart, 
                // Must use user options when changing type because series.options
                // is merged in with type specific plotOptions
                oldOptions = series.userOptions, initialType = series.initialType || series.type, plotOptions = chart.options.plotOptions, initialSeriesProto = seriesTypes[initialType].prototype, groups = [
                    'group',
                    'markerGroup',
                    'dataLabelsGroup',
                    'transformGroup'
                ], optionsToCheck = [
                    'dataGrouping',
                    'pointStart',
                    'pointInterval',
                    'pointIntervalUnit',
                    'keys'
                ], 
                // Animation must be enabled when calling update before the initial
                // animation has first run. This happens when calling update
                // directly after chart initialization, or when applying responsive
                // rules (#6912).
                animation = series.finishedAnimating && { animation: false }, kinds = {};
                let seriesOptions, n, preserve = [
                    'colorIndex',
                    'eventOptions',
                    'navigatorSeries',
                    'symbolIndex',
                    'baseSeries'
                ], newType = (options.type ||
                    oldOptions.type ||
                    chart.options.chart.type);
                const keepPoints = !(
                // Indicators, histograms etc recalculate the data. It should be
                // possible to omit this.
                this.hasDerivedData ||
                    // New type requires new point classes
                    (newType && newType !== this.type) ||
                    // New options affecting how the data points are built
                    typeof options.pointStart !== 'undefined' ||
                    typeof options.pointInterval !== 'undefined' ||
                    typeof options.relativeXValue !== 'undefined' ||
                    options.joinBy ||
                    options.mapData || // #11636
                    // Changes to data grouping requires new points in new group
                    optionsToCheck.some((option) => series.hasOptionChanged(option)));
                newType = newType || initialType;
                if (keepPoints) {
                    preserve.push('data', 'isDirtyData', 
                    // GeoHeatMap interpolation
                    'isDirtyCanvas', 'points', 'processedData', // #17057
                    'processedXData', 'processedYData', 'xIncrement', 'cropped', '_hasPointMarkers', 'hasDataLabels', 
                    // Networkgraph (#14397)
                    'nodes', 'layout', 
                    // Treemap
                    'level', 
                    // Map specific, consider moving it to series-specific preserve-
                    // properties (#10617)
                    'mapMap', 'mapData', 'minY', 'maxY', 'minX', 'maxX', 'transformGroups' // #18857
                    );
                    if (options.visible !== false) {
                        preserve.push('area', 'graph');
                    }
                    series.parallelArrays.forEach(function (key) {
                        preserve.push(key + 'Data');
                    });
                    if (options.data) {
                        // `setData` uses `dataSorting` options so we need to update
                        // them earlier
                        if (options.dataSorting) {
                            extend(series.options.dataSorting, options.dataSorting);
                        }
                        this.setData(options.data, false);
                    }
                }
                // Do the merge, with some forced options
                options = merge(oldOptions, {
                    // When oldOptions.index is null it should't be cleared.
                    // Otherwise navigator series will have wrong indexes (#10193).
                    index: oldOptions.index === void 0 ?
                        series.index : oldOptions.index,
                    pointStart: 
                    // When updating from blank (#7933)
                    plotOptions?.series?.pointStart ??
                        oldOptions.pointStart ??
                        // When updating after addPoint
                        series.xData?.[0]
                }, !keepPoints && { data: series.options.data }, options, animation);
                // Merge does not merge arrays, but replaces them. Since points were
                // updated, `series.options.data` has correct merged options, use it:
                if (keepPoints && options.data) {
                    options.data = series.options.data;
                }
                // Make sure preserved properties are not destroyed (#3094)
                preserve = groups.concat(preserve);
                preserve.forEach(function (prop) {
                    preserve[prop] = series[prop];
                    delete series[prop];
                });
                let casting = false;
                if (seriesTypes[newType]) {
                    casting = newType !== series.type;
                    // Destroy the series and delete all properties, it will be
                    // reinserted within the `init` call below
                    series.remove(false, false, false, true);
                    if (casting) {
                        // #20264: Re-detect a certain chart properties from new series
                        chart.propFromSeries();
                        // Modern browsers including IE11
                        if (Object.setPrototypeOf) {
                            Object.setPrototypeOf(series, seriesTypes[newType].prototype);
                            // Legacy (IE < 11)
                        }
                        else {
                            const ownEvents = Object.hasOwnProperty.call(series, 'hcEvents') && series.hcEvents;
                            for (n in initialSeriesProto) { // eslint-disable-line guard-for-in
                                series[n] = void 0;
                            }
                            // Reinsert all methods and properties from the new type
                            // prototype (#2270, #3719).
                            extend(series, seriesTypes[newType].prototype);
                            // The events are tied to the prototype chain, don't copy if
                            // they're not the series' own
                            if (ownEvents) {
                                series.hcEvents = ownEvents;
                            }
                            else {
                                delete series.hcEvents;
                            }
                        }
                    }
                }
                else {
                    error(17, true, chart, { missingModuleFor: newType });
                }
                // Re-register groups (#3094) and other preserved properties
                preserve.forEach(function (prop) {
                    series[prop] = preserve[prop];
                });
                series.init(chart, options);
                // Remove particular elements of the points. Check `series.options`
                // because we need to consider the options being set on plotOptions as
                // well.
                if (keepPoints && this.points) {
                    seriesOptions = series.options;
                    // What kind of elements to destroy
                    if (seriesOptions.visible === false) {
                        kinds.graphic = 1;
                        kinds.dataLabel = 1;
                    }
                    else {
                        // If the marker got disabled or changed its symbol, width or
                        // height - destroy
                        if (this.hasMarkerChanged(seriesOptions, oldOptions)) {
                            kinds.graphic = 1;
                        }
                        if (!series.hasDataLabels?.()) {
                            kinds.dataLabel = 1;
                        }
                    }
                    for (const point of this.points) {
                        if (point && point.series) {
                            point.resolveColor();
                            // Destroy elements in order to recreate based on updated
                            // series options.
                            if (Object.keys(kinds).length) {
                                point.destroyElements(kinds);
                            }
                            if (seriesOptions.showInLegend === false &&
                                point.legendItem) {
                                chart.legend.destroyItem(point);
                            }
                        }
                    }
                }
                series.initialType = initialType;
                chart.linkSeries(); // Links are lost in series.remove (#3028)
                // Set data for series with sorting enabled if it isn't set yet (#19715)
                chart.setSortedData();
                // #15383: Fire updatedData if the type has changed to keep linked
                // series such as indicators updated
                if (casting && series.linkedSeries.length) {
                    series.isDirtyData = true;
                }
                fireEvent(this, 'afterUpdate');
                if (pick(redraw, true)) {
                    chart.redraw(keepPoints ? void 0 : false);
                }
            }
            /**
             * Used from within series.update
             * @private
             */
            setName(name) {
                this.name = this.options.name = this.userOptions.name = name;
                this.chart.isDirtyLegend = true;
            }
            /**
             * Check if the option has changed.
             * @private
             */
            hasOptionChanged(optionName) {
                const chart = this.chart, option = this.options[optionName], plotOptions = chart.options.plotOptions, oldOption = this.userOptions[optionName], plotOptionsOption = pick(plotOptions?.[this.type]?.[optionName], plotOptions?.series?.[optionName]);
                // Check if `plotOptions` are defined already, #19203
                if (oldOption && !defined(plotOptionsOption)) {
                    return option !== oldOption;
                }
                return option !== pick(plotOptionsOption, option);
            }
            /**
             * Runs on mouse over the series graphical items.
             *
             * @function Highcharts.Series#onMouseOver
             * @emits Highcharts.Series#event:mouseOver
             */
            onMouseOver() {
                const series = this, chart = series.chart, hoverSeries = chart.hoverSeries, pointer = chart.pointer;
                pointer?.setHoverChartIndex();
                // Set normal state to previous series
                if (hoverSeries && hoverSeries !== series) {
                    hoverSeries.onMouseOut();
                }
                // Trigger the event, but to save processing time,
                // only if defined
                if (series.options.events.mouseOver) {
                    fireEvent(series, 'mouseOver');
                }
                // Hover this
                series.setState('hover');
                /**
                 * Contains the original hovered series.
                 *
                 * @name Highcharts.Chart#hoverSeries
                 * @type {Highcharts.Series|null}
                 */
                chart.hoverSeries = series;
            }
            /**
             * Runs on mouse out of the series graphical items.
             *
             * @function Highcharts.Series#onMouseOut
             *
             * @emits Highcharts.Series#event:mouseOut
             */
            onMouseOut() {
                // Trigger the event only if listeners exist
                const series = this, options = series.options, chart = series.chart, tooltip = chart.tooltip, hoverPoint = chart.hoverPoint;
                // #182, set to null before the mouseOut event fires
                chart.hoverSeries = null;
                // Trigger mouse out on the point, which must be in this series
                if (hoverPoint) {
                    hoverPoint.onMouseOut();
                }
                // Fire the mouse out event
                if (series && options.events.mouseOut) {
                    fireEvent(series, 'mouseOut');
                }
                // Hide the tooltip
                if (tooltip &&
                    !series.stickyTracking &&
                    (!tooltip.shared || series.noSharedTooltip)) {
                    tooltip.hide();
                }
                // Reset all inactive states
                chart.series.forEach(function (s) {
                    s.setState('', true);
                });
            }
            /**
             * Set the state of the series. Called internally on mouse interaction
             * operations, but it can also be called directly to visually
             * highlight a series.
             *
             * @function Highcharts.Series#setState
             *
             * @param {Highcharts.SeriesStateValue|""} [state]
             *        The new state, can be either `'hover'`, `'inactive'`, `'select'`,
             *        or `''` (an empty string), `'normal'` or `undefined` to set to
             *        normal state.
             * @param {boolean} [inherit]
             *        Determines if state should be inherited by points too.
             */
            setState(state, inherit) {
                const series = this, options = series.options, graph = series.graph, inactiveOtherPoints = options.inactiveOtherPoints, stateOptions = options.states, 
                // By default a quick animation to hover/inactive,
                // slower to un-hover
                stateAnimation = pick((stateOptions[state || 'normal'] &&
                    stateOptions[state || 'normal'].animation), series.chart.options.chart.animation);
                let lineWidth = options.lineWidth, opacity = options.opacity;
                state = state || '';
                if (series.state !== state) {
                    // Toggle class names
                    [
                        series.group,
                        series.markerGroup,
                        series.dataLabelsGroup
                    ].forEach(function (group) {
                        if (group) {
                            // Old state
                            if (series.state) {
                                group.removeClass('highcharts-series-' + series.state);
                            }
                            // New state
                            if (state) {
                                group.addClass('highcharts-series-' + state);
                            }
                        }
                    });
                    series.state = state;
                    if (!series.chart.styledMode) {
                        if (stateOptions[state] &&
                            stateOptions[state].enabled === false) {
                            return;
                        }
                        if (state) {
                            lineWidth = (stateOptions[state].lineWidth ||
                                lineWidth + (stateOptions[state].lineWidthPlus || 0)); // #4035
                            opacity = pick(stateOptions[state].opacity, opacity);
                        }
                        if (graph && !graph.dashstyle && isNumber(lineWidth)) {
                            // Animate the graph stroke-width
                            for (const graphElement of [
                                graph,
                                ...this.zones.map((zone) => zone.graph)
                            ]) {
                                graphElement?.animate({
                                    'stroke-width': lineWidth
                                }, stateAnimation);
                            }
                        }
                        // For some types (pie, networkgraph, sankey) opacity is
                        // resolved on a point level
                        if (!inactiveOtherPoints) {
                            [
                                series.group,
                                series.markerGroup,
                                series.dataLabelsGroup,
                                series.labelBySeries
                            ].forEach(function (group) {
                                if (group) {
                                    group.animate({
                                        opacity: opacity
                                    }, stateAnimation);
                                }
                            });
                        }
                    }
                }
                // Don't loop over points on a series that doesn't apply inactive state
                // to siblings markers (e.g. line, column)
                if (inherit && inactiveOtherPoints && series.points) {
                    series.setAllPointsToState(state || void 0);
                }
            }
            /**
             * Set the state for all points in the series.
             *
             * @function Highcharts.Series#setAllPointsToState
             *
             * @private
             *
             * @param {string} [state]
             *        Can be either `hover` or undefined to set to normal state.
             */
            setAllPointsToState(state) {
                this.points.forEach(function (point) {
                    if (point.setState) {
                        point.setState(state);
                    }
                });
            }
            /**
             * Show or hide the series.
             *
             * @function Highcharts.Series#setVisible
             *
             * @param {boolean} [visible]
             * True to show the series, false to hide. If undefined, the visibility is
             * toggled.
             *
             * @param {boolean} [redraw=true]
             * Whether to redraw the chart after the series is altered. If doing more
             * operations on the chart, it is a good idea to set redraw to false and
             * call {@link Chart#redraw|chart.redraw()} after.
             *
             * @emits Highcharts.Series#event:hide
             * @emits Highcharts.Series#event:show
             */
            setVisible(vis, redraw) {
                const series = this, chart = series.chart, ignoreHiddenSeries = chart.options.chart.ignoreHiddenSeries, oldVisibility = series.visible;
                // If called without an argument, toggle visibility
                series.visible =
                    vis =
                        series.options.visible =
                            series.userOptions.visible =
                                typeof vis === 'undefined' ? !oldVisibility : vis; // #5618
                const showOrHide = vis ? 'show' : 'hide';
                // Show or hide elements
                [
                    'group',
                    'dataLabelsGroup',
                    'markerGroup',
                    'tracker',
                    'tt'
                ].forEach((key) => {
                    series[key]?.[showOrHide]();
                });
                // Hide tooltip (#1361)
                if (chart.hoverSeries === series ||
                    chart.hoverPoint?.series === series) {
                    series.onMouseOut();
                }
                if (series.legendItem) {
                    chart.legend.colorizeItem(series, vis);
                }
                // Rescale or adapt to resized chart
                series.isDirty = true;
                // In a stack, all other series are affected
                if (series.options.stacking) {
                    chart.series.forEach((otherSeries) => {
                        if (otherSeries.options.stacking && otherSeries.visible) {
                            otherSeries.isDirty = true;
                        }
                    });
                }
                // Show or hide linked series
                series.linkedSeries.forEach((otherSeries) => {
                    otherSeries.setVisible(vis, false);
                });
                if (ignoreHiddenSeries) {
                    chart.isDirtyBox = true;
                }
                fireEvent(series, showOrHide);
                if (redraw !== false) {
                    chart.redraw();
                }
            }
            /**
             * Show the series if hidden.
             *
             * @sample highcharts/members/series-hide/
             *         Toggle visibility from a button
             *
             * @function Highcharts.Series#show
             * @emits Highcharts.Series#event:show
             */
            show() {
                this.setVisible(true);
            }
            /**
             * Hide the series if visible. If the
             * [chart.ignoreHiddenSeries](https://api.highcharts.com/highcharts/chart.ignoreHiddenSeries)
             * option is true, the chart is redrawn without this series.
             *
             * @sample highcharts/members/series-hide/
             *         Toggle visibility from a button
             *
             * @function Highcharts.Series#hide
             * @emits Highcharts.Series#event:hide
             */
            hide() {
                this.setVisible(false);
            }
            /**
             * Select or unselect the series. This means its
             * {@link Highcharts.Series.selected|selected}
             * property is set, the checkbox in the legend is toggled and when selected,
             * the series is returned by the {@link Highcharts.Chart#getSelectedSeries}
             * function.
             *
             * @sample highcharts/members/series-select/
             *         Select a series from a button
             *
             * @function Highcharts.Series#select
             *
             * @param {boolean} [selected]
             * True to select the series, false to unselect. If undefined, the selection
             * state is toggled.
             *
             * @emits Highcharts.Series#event:select
             * @emits Highcharts.Series#event:unselect
             */
            select(selected) {
                const series = this;
                series.selected =
                    selected =
                        this.options.selected = (typeof selected === 'undefined' ?
                            !series.selected :
                            selected);
                if (series.checkbox) {
                    series.checkbox.checked = selected;
                }
                fireEvent(series, selected ? 'select' : 'unselect');
            }
            /**
             * Checks if a tooltip should be shown for a given point.
             *
             * @private
             */
            shouldShowTooltip(plotX, plotY, options = {}) {
                options.series = this;
                options.visiblePlotOnly = true;
                return this.chart.isInsidePlot(plotX, plotY, options);
            }
            /**
             * Draws the legend symbol based on the legendSymbol user option.
             *
             * @private
             */
            drawLegendSymbol(legend, item) {
                LegendSymbol[this.options.legendSymbol || 'rectangle']
                    ?.call(this, legend, item);
            }
        }
        Series.defaultOptions = SeriesDefaults;
        /**
         * Registry of all available series types.
         *
         * @name Highcharts.Series.types
         * @type {Highcharts.Dictionary<typeof_Highcharts.Series>}
         */
        Series.types = SeriesRegistry.seriesTypes;
        /* *
         *
         *  Static Functions
         *
         * */
        /**
         * Registers a series class to be accessible via `Series.types`.
         *
         * @function Highcharts.Series.registerType
         *
         * @param {string} seriesType
         * The series type as an identifier string in lower case.
         *
         * @param {Function} SeriesClass
         * The series class as a class pattern or a constructor function with
         * prototype.
         */
        Series.registerType = SeriesRegistry.registerSeriesType;
        extend(Series.prototype, {
            axisTypes: ['xAxis', 'yAxis'],
            coll: 'series',
            colorCounter: 0,
            directTouch: false,
            invertible: true,
            isCartesian: true,
            kdAxisArray: ['clientX', 'plotY'],
            // Each point's x and y values are stored in this.xData and this.yData:
            parallelArrays: ['x', 'y'],
            pointClass: Point,
            requireSorting: true,
            // Requires the data to be sorted:
            sorted: true
        });
        /* *
         *
         *  Registry
         *
         * */
        SeriesRegistry.series = Series;
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
         * This is a placeholder type of the possible series options for
         * [Highcharts](../highcharts/series), [Highcharts Stock](../highstock/series),
         * [Highmaps](../highmaps/series), and [Gantt](../gantt/series).
         *
         * In TypeScript is this dynamically generated to reference all possible types
         * of series options.
         *
         * @ignore-declaration
         * @typedef {Highcharts.SeriesOptions|Highcharts.Dictionary<*>} Highcharts.SeriesOptionsType
         */
        /**
         * Options for `dataSorting`.
         *
         * @interface Highcharts.DataSortingOptionsObject
         * @since 8.0.0
         */ /**
        * Enable or disable data sorting for the series.
        * @name Highcharts.DataSortingOptionsObject#enabled
        * @type {boolean|undefined}
        */ /**
        * Whether to allow matching points by name in an update.
        * @name Highcharts.DataSortingOptionsObject#matchByName
        * @type {boolean|undefined}
        */ /**
        * Determines what data value should be used to sort by.
        * @name Highcharts.DataSortingOptionsObject#sortKey
        * @type {string|undefined}
        */
        /**
         * Function callback when a series has been animated.
         *
         * @callback Highcharts.SeriesAfterAnimateCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occurred.
         *
         * @param {Highcharts.SeriesAfterAnimateEventObject} event
         *        Event arguments.
         */
        /**
         * Event information regarding completed animation of a series.
         *
         * @interface Highcharts.SeriesAfterAnimateEventObject
         */ /**
        * Animated series.
        * @name Highcharts.SeriesAfterAnimateEventObject#target
        * @type {Highcharts.Series}
        */ /**
        * Event type.
        * @name Highcharts.SeriesAfterAnimateEventObject#type
        * @type {"afterAnimate"}
        */
        /**
         * Function callback when the checkbox next to the series' name in the legend is
         * clicked.
         *
         * @callback Highcharts.SeriesCheckboxClickCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occurred.
         *
         * @param {Highcharts.SeriesCheckboxClickEventObject} event
         *        Event arguments.
         */
        /**
         * Event information regarding check of a series box.
         *
         * @interface Highcharts.SeriesCheckboxClickEventObject
         */ /**
        * Whether the box has been checked.
        * @name Highcharts.SeriesCheckboxClickEventObject#checked
        * @type {boolean}
        */ /**
        * Related series.
        * @name Highcharts.SeriesCheckboxClickEventObject#item
        * @type {Highcharts.Series}
        */ /**
        * Related series.
        * @name Highcharts.SeriesCheckboxClickEventObject#target
        * @type {Highcharts.Series}
        */ /**
        * Event type.
        * @name Highcharts.SeriesCheckboxClickEventObject#type
        * @type {"checkboxClick"}
        */
        /**
         * Function callback when a series is clicked. Return false to cancel toogle
         * actions.
         *
         * @callback Highcharts.SeriesClickCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occurred.
         *
         * @param {Highcharts.SeriesClickEventObject} event
         *        Event arguments.
         */
        /**
         * Common information for a click event on a series.
         *
         * @interface Highcharts.SeriesClickEventObject
         * @extends global.Event
         */ /**
        * Nearest point on the graph.
        * @name Highcharts.SeriesClickEventObject#point
        * @type {Highcharts.Point}
        */
        /**
         * Gets fired when the series is hidden after chart generation time, either by
         * clicking the legend item or by calling `.hide()`.
         *
         * @callback Highcharts.SeriesHideCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occurred.
         *
         * @param {global.Event} event
         *        The event that occurred.
         */
        /**
         * The SVG value used for the `stroke-linecap` and `stroke-linejoin` of a line
         * graph.
         *
         * @typedef {"butt"|"round"|"square"|string} Highcharts.SeriesLinecapValue
         */
        /**
         * Gets fired when the legend item belonging to the series is clicked. The
         * default action is to toggle the visibility of the series. This can be
         * prevented by returning `false` or calling `event.preventDefault()`.
         *
         * **Note:** This option is deprecated in favor of
         * Highcharts.LegendItemClickCallbackFunction.
         *
         * @deprecated 11.4.4
         * @callback Highcharts.SeriesLegendItemClickCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occurred.
         *
         * @param {Highcharts.SeriesLegendItemClickEventObject} event
         *        The event that occurred.
         */
        /**
         * Information about the event.
         *
         * **Note:** This option is deprecated in favor of
         * Highcharts.LegendItemClickEventObject.
         *
         * @deprecated 11.4.4
         * @interface Highcharts.SeriesLegendItemClickEventObject
         */ /**
        * Related browser event.
        * @name Highcharts.SeriesLegendItemClickEventObject#browserEvent
        * @type {global.PointerEvent}
        */ /**
        * Prevent the default action of toggle the visibility of the series.
        * @name Highcharts.SeriesLegendItemClickEventObject#preventDefault
        * @type {Function}
        */ /**
        * Related series.
        * @name Highcharts.SeriesCheckboxClickEventObject#target
        * @type {Highcharts.Series}
        */ /**
        * Event type.
        * @name Highcharts.SeriesCheckboxClickEventObject#type
        * @type {"checkboxClick"}
        */
        /**
         * Gets fired when the mouse leaves the graph.
         *
         * @callback Highcharts.SeriesMouseOutCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        Series where the event occurred.
         *
         * @param {global.PointerEvent} event
         *        Event that occurred.
         */
        /**
         * Gets fired when the mouse enters the graph.
         *
         * @callback Highcharts.SeriesMouseOverCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        Series where the event occurred.
         *
         * @param {global.PointerEvent} event
         *        Event that occurred.
         */
        /**
         * Translation and scale for the plot area of a series.
         *
         * @interface Highcharts.SeriesPlotBoxObject
         */ /**
        * @name Highcharts.SeriesPlotBoxObject#scaleX
        * @type {number}
        */ /**
        * @name Highcharts.SeriesPlotBoxObject#scaleY
        * @type {number}
        */ /**
        * @name Highcharts.SeriesPlotBoxObject#translateX
        * @type {number}
        */ /**
        * @name Highcharts.SeriesPlotBoxObject#translateY
        * @type {number}
        */
        /**
         * Gets fired when the series is shown after chart generation time, either by
         * clicking the legend item or by calling `.show()`.
         *
         * @callback Highcharts.SeriesShowCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        Series where the event occurred.
         *
         * @param {global.Event} event
         *        Event that occurred.
         */
        /**
         * Possible key values for the series state options.
         *
         * @typedef {"hover"|"inactive"|"normal"|"select"} Highcharts.SeriesStateValue
         */
        ''; // Detach doclets above
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Series options for specific data and the data itself. In TypeScript you
         * have to cast the series options to specific series types, to get all
         * possible options for a series.
         *
         * @example
         * // TypeScript example
         * Highcharts.chart('container', {
         *     series: [{
         *         color: '#06C',
         *         data: [[0, 1], [2, 3]]
         *     } as Highcharts.SeriesLineOptions ]
         * });
         *
         * @type      {Array<*>}
         * @apioption series
         */
        /**
         * An id for the series. This can be used after render time to get a pointer
         * to the series object through `chart.get()`.
         *
         * @sample {highcharts} highcharts/plotoptions/series-id/
         *         Get series by id
         *
         * @type      {string}
         * @since     1.2.0
         * @apioption series.id
         */
        /**
         * The index of the series in the chart, affecting the internal index in the
         * `chart.series` array, the visible Z index as well as the order in the
         * legend.
         *
         * @type      {number}
         * @since     2.3.0
         * @apioption series.index
         */
        /**
         * The sequential index of the series in the legend.
         *
         * @see [legend.reversed](#legend.reversed),
         *      [yAxis.reversedStacks](#yAxis.reversedStacks)
         *
         * @sample {highcharts|highstock} highcharts/series/legendindex/
         *         Legend in opposite order
         *
         * @type      {number}
         * @apioption series.legendIndex
         */
        /**
         * The name of the series as shown in the legend, tooltip etc.
         *
         * @sample {highcharts} highcharts/series/name/
         *         Series name
         * @sample {highmaps} maps/demo/category-map/
         *         Series name
         *
         * @type      {string}
         * @apioption series.name
         */
        /**
         * This option allows grouping series in a stacked chart. The stack option
         * can be a string or anything else, as long as the grouped series' stack
         * options match each other after conversion into a string.
         *
         * @sample {highcharts} highcharts/series/stack/
         *         Stacked and grouped columns
         *
         * @type      {number|string}
         * @since     2.1
         * @product   highcharts highstock
         * @apioption series.stack
         */
        /**
         * The type of series, for example `line` or `column`. By default, the
         * series type is inherited from [chart.type](#chart.type), so unless the
         * chart is a combination of series types, there is no need to set it on the
         * series level.
         *
         * @sample {highcharts} highcharts/series/type/
         *         Line and column in the same chart
         * @sample highcharts/series/type-dynamic/
         *         Dynamic types with button selector
         * @sample {highmaps} maps/demo/mapline-mappoint/
         *         Multiple types in the same map
         *
         * @type      {string}
         * @apioption series.type
         */
        /**
         * When using dual or multiple x axes, this number defines which xAxis the
         * particular series is connected to. It refers to either the
         * {@link #xAxis.id|axis id}
         * or the index of the axis in the xAxis array, with 0 being the first.
         *
         * @type      {number|string}
         * @default   0
         * @product   highcharts highstock
         * @apioption series.xAxis
         */
        /**
         * When using dual or multiple y axes, this number defines which yAxis the
         * particular series is connected to. It refers to either the
         * {@link #yAxis.id|axis id}
         * or the index of the axis in the yAxis array, with 0 being the first.
         *
         * @sample {highcharts} highcharts/series/yaxis/
         *         Apply the column series to the secondary Y axis
         *
         * @type      {number|string}
         * @default   0
         * @product   highcharts highstock
         * @apioption series.yAxis
         */
        /**
         * Define the visual z index of the series.
         *
         * @sample {highcharts} highcharts/plotoptions/series-zindex-default/
         *         With no z index, the series defined last are on top
         * @sample {highcharts} highcharts/plotoptions/series-zindex/
         *         With a z index, the series with the highest z index is on top
         * @sample {highstock} highcharts/plotoptions/series-zindex-default/
         *         With no z index, the series defined last are on top
         * @sample {highstock} highcharts/plotoptions/series-zindex/
         *         With a z index, the series with the highest z index is on top
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.zIndex
         */
        ''; // Include precedent doclets in transpiled

        return Series;
    });
    _registerModule(_modules, 'Core/Renderer/RendererRegistry.js', [_modules['Core/Globals.js']], function (H) {
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
         *  Namespace
         *
         * */
        var RendererRegistry;
        (function (RendererRegistry) {
            /* *
             *
             *  Constants
             *
             * */
            RendererRegistry.rendererTypes = {};
            /* *
             *
             *  Variables
             *
             * */
            let defaultRenderer;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Gets a registered renderer class. If no renderer type is provided or the
             * requested renderer was not founded, the default renderer is returned.
             *
             * @param {string} [rendererType]
             * Renderer type or the default renderer.
             *
             * @return {Highcharts.Class<Highcharts.SVGRenderer>}
             * Returns the requested renderer class or the default renderer class.
             */
            function getRendererType(rendererType = defaultRenderer) {
                return (RendererRegistry.rendererTypes[rendererType] || RendererRegistry.rendererTypes[defaultRenderer]);
            }
            RendererRegistry.getRendererType = getRendererType;
            /**
             * Register a renderer class.
             *
             * @param {string} rendererType
             * Renderer type to register.
             *
             * @param {Highcharts.Class<Highcharts.SVGRenderer>} rendererClass
             * Returns the requested renderer class or the default renderer class.
             *
             * @param {boolean} setAsDefault
             * Sets the renderer class as the default renderer.
             */
            function registerRendererType(rendererType, rendererClass, setAsDefault) {
                RendererRegistry.rendererTypes[rendererType] = rendererClass;
                if (!defaultRenderer || setAsDefault) {
                    defaultRenderer = rendererType;
                    H.Renderer = rendererClass; // Compatibility
                }
            }
            RendererRegistry.registerRendererType = registerRendererType;
        })(RendererRegistry || (RendererRegistry = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return RendererRegistry;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGLabel.js', [_modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (SVGElement, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined, extend, isNumber, merge, pick, removeEvent } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * SVG label to render text.
         * @private
         * @class
         * @name Highcharts.SVGLabel
         * @augments Highcharts.SVGElement
         */
        class SVGLabel extends SVGElement {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(renderer, str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {
                super(renderer, 'g');
                this.paddingLeftSetter = this.paddingSetter;
                this.paddingRightSetter = this.paddingSetter;
                this.doUpdate = false;
                this.textStr = str;
                this.x = x;
                this.y = y;
                this.anchorX = anchorX;
                this.anchorY = anchorY;
                this.baseline = baseline;
                this.className = className;
                this.addClass(className === 'button' ?
                    'highcharts-no-tooltip' :
                    'highcharts-label');
                if (className) {
                    this.addClass('highcharts-' + className);
                }
                // Create the text element. An undefined text content prevents redundant
                // box calculation (#16121)
                this.text = renderer.text(void 0, 0, 0, useHTML).attr({ zIndex: 1 });
                // Validate the shape argument
                let hasBGImage;
                if (typeof shape === 'string') {
                    hasBGImage = /^url\((.*?)\)$/.test(shape);
                    if (hasBGImage || this.renderer.symbols[shape]) {
                        this.symbolKey = shape;
                    }
                }
                this.bBox = SVGLabel.emptyBBox;
                this.padding = 3;
                this.baselineOffset = 0;
                this.needsBox = renderer.styledMode || hasBGImage;
                this.deferredAttr = {};
                this.alignFactor = 0;
            }
            /* *
             *
             *  Functions
             *
             * */
            alignSetter(value) {
                const alignFactor = ({
                    left: 0,
                    center: 0.5,
                    right: 1
                })[value];
                if (alignFactor !== this.alignFactor) {
                    this.alignFactor = alignFactor;
                    // Bounding box exists, means we're dynamically changing
                    if (this.bBox && isNumber(this.xSetting)) {
                        this.attr({ x: this.xSetting }); // #5134
                    }
                }
            }
            anchorXSetter(value, key) {
                this.anchorX = value;
                this.boxAttr(key, Math.round(value) - this.getCrispAdjust() - this.xSetting);
            }
            anchorYSetter(value, key) {
                this.anchorY = value;
                this.boxAttr(key, value - this.ySetting);
            }
            /*
             * Set a box attribute, or defer it if the box is not yet created
             */
            boxAttr(key, value) {
                if (this.box) {
                    this.box.attr(key, value);
                }
                else {
                    this.deferredAttr[key] = value;
                }
            }
            /*
             * Pick up some properties and apply them to the text instead of the
             * wrapper.
             */
            css(styles) {
                if (styles) {
                    const textStyles = {};
                    // Create a copy to avoid altering the original object
                    // (#537)
                    styles = merge(styles);
                    SVGLabel.textProps.forEach((prop) => {
                        if (typeof styles[prop] !== 'undefined') {
                            textStyles[prop] = styles[prop];
                            delete styles[prop];
                        }
                    });
                    this.text.css(textStyles);
                    // Update existing text, box (#9400, #12163, #18212)
                    if ('fontSize' in textStyles || 'fontWeight' in textStyles) {
                        this.updateTextPadding();
                    }
                    else if ('width' in textStyles || 'textOverflow' in textStyles) {
                        this.updateBoxSize();
                    }
                }
                return SVGElement.prototype.css.call(this, styles);
            }
            /*
             * Destroy and release memory.
             */
            destroy() {
                // Added by button implementation
                removeEvent(this.element, 'mouseenter');
                removeEvent(this.element, 'mouseleave');
                if (this.text) {
                    this.text.destroy();
                }
                if (this.box) {
                    this.box = this.box.destroy();
                }
                // Call base implementation to destroy the rest
                SVGElement.prototype.destroy.call(this);
                return void 0;
            }
            fillSetter(value, key) {
                if (value) {
                    this.needsBox = true;
                }
                // For animation getter (#6776)
                this.fill = value;
                this.boxAttr(key, value);
            }
            /*
             * Return the bounding box of the box, not the group.
             */
            getBBox(reload, rot) {
                // If we have a text string and the DOM bBox was 0, it typically means
                // that the label was first rendered hidden, so we need to update the
                // bBox (#15246)
                if (this.textStr && this.bBox.width === 0 && this.bBox.height === 0) {
                    this.updateBoxSize();
                }
                const { padding, height = 0, translateX = 0, translateY = 0, width = 0 } = this, paddingLeft = pick(this.paddingLeft, padding), rotation = rot ?? (this.rotation || 0);
                let bBox = {
                    width,
                    height,
                    x: translateX + this.bBox.x - paddingLeft,
                    y: translateY + this.bBox.y - padding + this.baselineOffset
                };
                if (rotation) {
                    bBox = this.getRotatedBox(bBox, rotation);
                }
                return bBox;
            }
            getCrispAdjust() {
                return (this.renderer.styledMode && this.box ?
                    this.box.strokeWidth() :
                    (this['stroke-width'] ?
                        parseInt(this['stroke-width'], 10) :
                        0)) % 2 / 2;
            }
            heightSetter(value) {
                this.heightSetting = value;
                this.doUpdate = true;
            }
            /**
             * This method is executed in the end of `attr()`, after setting all
             * attributes in the hash. In can be used to efficiently consolidate
             * multiple attributes in one SVG property -- e.g., translate, rotate and
             * scale are merged in one "transform" attribute in the SVG node.
             * Also updating height or width should trigger update of the box size.
             *
             * @private
             * @function Highcharts.SVGLabel#afterSetters
             */
            afterSetters() {
                super.afterSetters();
                if (this.doUpdate) {
                    this.updateBoxSize();
                    this.doUpdate = false;
                }
            }
            /*
             * After the text element is added, get the desired size of the border
             * box and add it before the text in the DOM.
             */
            onAdd() {
                this.text.add(this);
                this.attr({
                    // Alignment is available now  (#3295, 0 not rendered if given
                    // as a value)
                    text: pick(this.textStr, ''),
                    x: this.x || 0,
                    y: this.y || 0
                });
                if (this.box && defined(this.anchorX)) {
                    this.attr({
                        anchorX: this.anchorX,
                        anchorY: this.anchorY
                    });
                }
            }
            paddingSetter(value, key) {
                if (!isNumber(value)) {
                    this[key] = void 0;
                }
                else if (value !== this[key]) {
                    this[key] = value;
                    this.updateTextPadding();
                }
            }
            rSetter(value, key) {
                this.boxAttr(key, value);
            }
            strokeSetter(value, key) {
                // For animation getter (#6776)
                this.stroke = value;
                this.boxAttr(key, value);
            }
            'stroke-widthSetter'(value, key) {
                if (value) {
                    this.needsBox = true;
                }
                this['stroke-width'] = value;
                this.boxAttr(key, value);
            }
            'text-alignSetter'(value) {
                this.textAlign = value;
            }
            textSetter(text) {
                if (typeof text !== 'undefined') {
                    // Must use .attr to ensure transforms are done (#10009)
                    this.text.attr({ text });
                }
                this.updateTextPadding();
                this.reAlign();
            }
            /*
             * This function runs after the label is added to the DOM (when the bounding
             * box is available), and after the text of the label is updated to detect
             * the new bounding box and reflect it in the border box.
             */
            updateBoxSize() {
                const text = this.text, attribs = {}, padding = this.padding, 
                // #12165 error when width is null (auto)
                // #12163 when fontweight: bold, recalculate bBox without cache
                // #3295 && 3514 box failure when string equals 0
                bBox = this.bBox = (((!isNumber(this.widthSetting) ||
                    !isNumber(this.heightSetting) ||
                    this.textAlign) && defined(text.textStr)) ?
                    text.getBBox(void 0, 0) :
                    SVGLabel.emptyBBox);
                let crispAdjust;
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || bBox.height || 0) + 2 * padding;
                const metrics = this.renderer.fontMetrics(text);
                // Update the label-scoped y offset. Math.min because of inline
                // style (#9400)
                this.baselineOffset = padding + Math.min(
                // When applicable, use the font size of the first line (#15707)
                (this.text.firstLineMetrics || metrics).b, 
                // When the height is 0, there is no bBox, so go with the font
                // metrics. Highmaps CSS demos.
                bBox.height || Infinity);
                // #15491: Vertical centering
                if (this.heightSetting) {
                    this.baselineOffset += (this.heightSetting - metrics.h) / 2;
                }
                if (this.needsBox && !text.textPath) {
                    // Create the border box if it is not already present
                    if (!this.box) {
                        // Symbol definition exists (#5324)
                        const box = this.box = this.symbolKey ?
                            this.renderer.symbol(this.symbolKey) :
                            this.renderer.rect();
                        box.addClass(// Don't use label className for buttons
                        (this.className === 'button' ?
                            '' : 'highcharts-label-box') +
                            (this.className ?
                                ' highcharts-' + this.className + '-box' : ''));
                        box.add(this);
                    }
                    crispAdjust = this.getCrispAdjust();
                    attribs.x = crispAdjust;
                    attribs.y = ((this.baseline ? -this.baselineOffset : 0) + crispAdjust);
                    // Apply the box attributes
                    attribs.width = Math.round(this.width);
                    attribs.height = Math.round(this.height);
                    this.box.attr(extend(attribs, this.deferredAttr));
                    this.deferredAttr = {};
                }
            }
            /*
             * This function runs after setting text or padding, but only if padding
             * is changed.
             */
            updateTextPadding() {
                const text = this.text;
                if (!text.textPath) {
                    this.updateBoxSize();
                    // Determine y based on the baseline
                    const textY = this.baseline ? 0 : this.baselineOffset;
                    let textX = pick(this.paddingLeft, this.padding);
                    // Compensate for alignment
                    if (defined(this.widthSetting) &&
                        this.bBox &&
                        (this.textAlign === 'center' || this.textAlign === 'right')) {
                        textX += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width);
                    }
                    // Update if anything changed
                    if (textX !== text.x || textY !== text.y) {
                        text.attr('x', textX);
                        // #8159 - prevent misplaced data labels in treemap
                        // (useHTML: true)
                        if (text.hasBoxWidthChanged) {
                            this.bBox = text.getBBox(true);
                        }
                        if (typeof textY !== 'undefined') {
                            text.attr('y', textY);
                        }
                    }
                    // Record current values
                    text.x = textX;
                    text.y = textY;
                }
            }
            widthSetter(value) {
                // `width:auto` => null
                this.widthSetting = isNumber(value) ? value : void 0;
                this.doUpdate = true;
            }
            getPaddedWidth() {
                const padding = this.padding;
                const paddingLeft = pick(this.paddingLeft, padding);
                const paddingRight = pick(this.paddingRight, padding);
                return ((this.widthSetting || this.bBox.width || 0) +
                    paddingLeft +
                    paddingRight);
            }
            xSetter(value) {
                this.x = value; // For animation getter
                if (this.alignFactor) {
                    value -= this.alignFactor * this.getPaddedWidth();
                    // Force animation even when setting to the same value (#7898)
                    this['forceAnimate:x'] = true;
                }
                this.xSetting = Math.round(value);
                this.attr('translateX', this.xSetting);
            }
            ySetter(value) {
                this.ySetting = this.y = Math.round(value);
                this.attr('translateY', this.ySetting);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        SVGLabel.emptyBBox = {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        /**
         * For labels, these CSS properties are applied to the `text` node directly.
         *
         * @private
         * @name Highcharts.SVGLabel#textProps
         * @type {Array<string>}
         */
        SVGLabel.textProps = [
            'color', 'direction', 'fontFamily', 'fontSize', 'fontStyle',
            'fontWeight', 'lineHeight', 'textAlign', 'textDecoration',
            'textOutline', 'textOverflow', 'whiteSpace', 'width'
        ];
        /* *
         *
         *  Default Export
         *
         * */

        return SVGLabel;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/Symbols.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable require-jsdoc, valid-jsdoc */
        /**
         *
         */
        function arc(cx, cy, w, h, options) {
            const arc = [];
            if (options) {
                const start = options.start || 0, rx = pick(options.r, w), ry = pick(options.r, h || w), 
                // Subtract a small number to prevent cos and sin of start and end
                // from becoming equal on 360 arcs (#1561). The size of the circle
                // affects the constant, therefore the division by `rx`. If the
                // proximity is too small, the arc disappears. If it is too great, a
                // gap appears. This can be seen in the animation of the official
                // bubble demo (#20586).
                proximity = 0.0002 / Math.max(rx, 1), fullCircle = (Math.abs((options.end || 0) - start - 2 * Math.PI) <
                    proximity), end = (options.end || 0) - proximity, innerRadius = options.innerR, open = pick(options.open, fullCircle), cosStart = Math.cos(start), sinStart = Math.sin(start), cosEnd = Math.cos(end), sinEnd = Math.sin(end), 
                // Proximity takes care of rounding errors around PI (#6971)
                longArc = pick(options.longArc, end - start - Math.PI < proximity ? 0 : 1);
                let arcSegment = [
                    'A', // ArcTo
                    rx, // X radius
                    ry, // Y radius
                    0, // Slanting
                    longArc, // Long or short arc
                    pick(options.clockwise, 1), // Clockwise
                    cx + rx * cosEnd,
                    cy + ry * sinEnd
                ];
                arcSegment.params = { start, end, cx, cy }; // Memo for border radius
                arc.push([
                    'M',
                    cx + rx * cosStart,
                    cy + ry * sinStart
                ], arcSegment);
                if (defined(innerRadius)) {
                    arcSegment = [
                        'A', // ArcTo
                        innerRadius, // X radius
                        innerRadius, // Y radius
                        0, // Slanting
                        longArc, // Long or short arc
                        // Clockwise - opposite to the outer arc clockwise
                        defined(options.clockwise) ? 1 - options.clockwise : 0,
                        cx + innerRadius * cosStart,
                        cy + innerRadius * sinStart
                    ];
                    // Memo for border radius
                    arcSegment.params = {
                        start: end,
                        end: start,
                        cx,
                        cy
                    };
                    arc.push(open ?
                        [
                            'M',
                            cx + innerRadius * cosEnd,
                            cy + innerRadius * sinEnd
                        ] : [
                        'L',
                        cx + innerRadius * cosEnd,
                        cy + innerRadius * sinEnd
                    ], arcSegment);
                }
                if (!open) {
                    arc.push(['Z']);
                }
            }
            return arc;
        }
        /**
         * Callout shape used for default tooltips.
         */
        function callout(x, y, w, h, options) {
            const arrowLength = 6, halfDistance = 6, r = Math.min((options && options.r) || 0, w, h), safeDistance = r + halfDistance, anchorX = options && options.anchorX, anchorY = options && options.anchorY || 0;
            const path = roundedRect(x, y, w, h, { r });
            if (!isNumber(anchorX)) {
                return path;
            }
            // Do not render a connector, if anchor starts inside the label
            if (anchorX < w && anchorX > 0 && anchorY < h && anchorY > 0) {
                return path;
            }
            // Anchor on right side
            if (x + anchorX > w - safeDistance) {
                // Chevron
                if (anchorY > y + safeDistance &&
                    anchorY < y + h - safeDistance) {
                    path.splice(3, 1, ['L', x + w, anchorY - halfDistance], ['L', x + w + arrowLength, anchorY], ['L', x + w, anchorY + halfDistance], ['L', x + w, y + h - r]);
                    // Simple connector
                }
                else {
                    if (anchorX < w) { // Corner connector
                        const isTopCorner = anchorY < y + safeDistance, cornerY = isTopCorner ? y : y + h, sliceStart = isTopCorner ? 2 : 5;
                        path.splice(sliceStart, 0, ['L', anchorX, anchorY], ['L', x + w - r, cornerY]);
                    }
                    else { // Side connector
                        path.splice(3, 1, ['L', x + w, h / 2], ['L', anchorX, anchorY], ['L', x + w, h / 2], ['L', x + w, y + h - r]);
                    }
                }
                // Anchor on left side
            }
            else if (x + anchorX < safeDistance) {
                // Chevron
                if (anchorY > y + safeDistance &&
                    anchorY < y + h - safeDistance) {
                    path.splice(7, 1, ['L', x, anchorY + halfDistance], ['L', x - arrowLength, anchorY], ['L', x, anchorY - halfDistance], ['L', x, y + r]);
                    // Simple connector
                }
                else {
                    if (anchorX > 0) { // Corner connector
                        const isTopCorner = anchorY < y + safeDistance, cornerY = isTopCorner ? y : y + h, sliceStart = isTopCorner ? 1 : 6;
                        path.splice(sliceStart, 0, ['L', anchorX, anchorY], ['L', x + r, cornerY]);
                    }
                    else { // Side connector
                        path.splice(7, 1, ['L', x, h / 2], ['L', anchorX, anchorY], ['L', x, h / 2], ['L', x, y + r]);
                    }
                }
            }
            else if ( // Replace bottom
            anchorY > h &&
                anchorX < w - safeDistance) {
                path.splice(5, 1, ['L', anchorX + halfDistance, y + h], ['L', anchorX, y + h + arrowLength], ['L', anchorX - halfDistance, y + h], ['L', x + r, y + h]);
            }
            else if ( // Replace top
            anchorY < 0 &&
                anchorX > safeDistance) {
                path.splice(1, 1, ['L', anchorX - halfDistance, y], ['L', anchorX, y - arrowLength], ['L', anchorX + halfDistance, y], ['L', w - r, y]);
            }
            return path;
        }
        /**
         *
         */
        function circle(x, y, w, h) {
            // Return a full arc
            return arc(x + w / 2, y + h / 2, w / 2, h / 2, {
                start: Math.PI * 0.5,
                end: Math.PI * 2.5,
                open: false
            });
        }
        /**
         *
         */
        function diamond(x, y, w, h) {
            return [
                ['M', x + w / 2, y],
                ['L', x + w, y + h / 2],
                ['L', x + w / 2, y + h],
                ['L', x, y + h / 2],
                ['Z']
            ];
        }
        // #15291
        /**
         *
         */
        function rect(x, y, w, h, options) {
            if (options && options.r) {
                return roundedRect(x, y, w, h, options);
            }
            return [
                ['M', x, y],
                ['L', x + w, y],
                ['L', x + w, y + h],
                ['L', x, y + h],
                ['Z']
            ];
        }
        /**
         *
         */
        function roundedRect(x, y, w, h, options) {
            const r = options?.r || 0;
            return [
                ['M', x + r, y],
                ['L', x + w - r, y], // Top side
                ['A', r, r, 0, 0, 1, x + w, y + r], // Top-right corner
                ['L', x + w, y + h - r], // Right side
                ['A', r, r, 0, 0, 1, x + w - r, y + h], // Bottom-right corner
                ['L', x + r, y + h], // Bottom side
                ['A', r, r, 0, 0, 1, x, y + h - r], // Bottom-left corner
                ['L', x, y + r], // Left side
                ['A', r, r, 0, 0, 1, x + r, y],
                ['Z'] // Top-left corner
            ];
        }
        /**
         *
         */
        function triangle(x, y, w, h) {
            return [
                ['M', x + w / 2, y],
                ['L', x + w, y + h],
                ['L', x, y + h],
                ['Z']
            ];
        }
        /**
         *
         */
        function triangleDown(x, y, w, h) {
            return [
                ['M', x, y],
                ['L', x + w, y],
                ['L', x + w / 2, y + h],
                ['Z']
            ];
        }
        const Symbols = {
            arc,
            callout,
            circle,
            diamond,
            rect,
            roundedRect,
            square: rect,
            triangle,
            'triangle-down': triangleDown
        };
        /* *
         *
         *  Default Export
         *
         * */

        return Symbols;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/TextBuilder.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (AST, H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc, SVG_NS, win } = H;
        const { attr, extend, fireEvent, isString, objectEach, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * SVG Text Builder
         * @private
         * @class
         * @name Highcharts.TextBuilder
         */
        class TextBuilder {
            constructor(svgElement) {
                const textStyles = svgElement.styles;
                this.renderer = svgElement.renderer;
                this.svgElement = svgElement;
                this.width = svgElement.textWidth;
                this.textLineHeight = textStyles && textStyles.lineHeight;
                this.textOutline = textStyles && textStyles.textOutline;
                this.ellipsis = Boolean(textStyles && textStyles.textOverflow === 'ellipsis');
                this.noWrap = Boolean(textStyles && textStyles.whiteSpace === 'nowrap');
            }
            /**
             * Build an SVG representation of the pseudo HTML given in the object's
             * svgElement.
             *
             * @private
             *
             * @return {void}.
             */
            buildSVG() {
                const wrapper = this.svgElement, textNode = wrapper.element, renderer = wrapper.renderer, textStr = pick(wrapper.textStr, '').toString(), hasMarkup = textStr.indexOf('<') !== -1, childNodes = textNode.childNodes, tempParent = !wrapper.added && renderer.box, regexMatchBreaks = /<br.*?>/g, 
                // The buildText code is quite heavy, so if we're not changing
                // something that affects the text, skip it (#6113).
                textCache = [
                    textStr,
                    this.ellipsis,
                    this.noWrap,
                    this.textLineHeight,
                    this.textOutline,
                    wrapper.getStyle('font-size'),
                    this.width
                ].join(',');
                if (textCache === wrapper.textCache) {
                    return;
                }
                wrapper.textCache = textCache;
                delete wrapper.actualWidth;
                // Remove old text
                for (let i = childNodes.length; i--;) {
                    textNode.removeChild(childNodes[i]);
                }
                // Simple strings, add text directly and return
                if (!hasMarkup &&
                    !this.ellipsis &&
                    !this.width &&
                    !wrapper.textPath &&
                    (textStr.indexOf(' ') === -1 ||
                        (this.noWrap && !regexMatchBreaks.test(textStr)))) {
                    textNode.appendChild(doc.createTextNode(this.unescapeEntities(textStr)));
                    // Complex strings, add more logic
                }
                else if (textStr !== '') {
                    if (tempParent) {
                        // Attach it to the DOM to read offset width and font size
                        tempParent.appendChild(textNode);
                    }
                    // Step 1. Parse the markup safely and directly into a tree
                    // structure.
                    const ast = new AST(textStr);
                    // Step 2. Do as many as we can of the modifications to the tree
                    // structure before it is added to the DOM
                    this.modifyTree(ast.nodes);
                    ast.addToDOM(textNode);
                    // Step 3. Some modifications can't be done until the structure is
                    // in the DOM, because we need to read computed metrics.
                    this.modifyDOM();
                    // Add title if an ellipsis was added
                    if (this.ellipsis &&
                        (textNode.textContent || '').indexOf('\u2026') !== -1) {
                        wrapper.attr('title', this.unescapeEntities(wrapper.textStr || '', ['&lt;', '&gt;']) // #7179
                        );
                    }
                    if (tempParent) {
                        tempParent.removeChild(textNode);
                    }
                }
                // Apply the text outline
                if (isString(this.textOutline) && wrapper.applyTextOutline) {
                    wrapper.applyTextOutline(this.textOutline);
                }
            }
            /**
             * Modify the DOM of the generated SVG structure. This function only does
             * operations that cannot be done until the elements are attached to the
             * DOM, like doing layout based on rendered metrics of the added elements.
             *
             * @private
             *
             */
            modifyDOM() {
                const wrapper = this.svgElement;
                const x = attr(wrapper.element, 'x');
                wrapper.firstLineMetrics = void 0;
                // Remove empty tspans (including breaks) from the beginning because
                // SVG's getBBox doesn't count empty lines. The use case is tooltip
                // where the header is empty. By doing this in the DOM rather than in
                // the AST, we can inspect the textContent directly and don't have to
                // recurse down to look for valid content.
                let firstChild;
                while ((firstChild = wrapper.element.firstChild)) {
                    if (/^[\s\u200B]*$/.test(firstChild.textContent || ' ')) {
                        wrapper.element.removeChild(firstChild);
                    }
                    else {
                        break;
                    }
                }
                // Modify hard line breaks by applying the rendered line height
                [].forEach.call(wrapper.element.querySelectorAll('tspan.highcharts-br'), (br, i) => {
                    if (br.nextSibling && br.previousSibling) { // #5261
                        if (i === 0 && br.previousSibling.nodeType === 1) {
                            wrapper.firstLineMetrics = wrapper.renderer
                                .fontMetrics(br.previousSibling);
                        }
                        attr(br, {
                            // Since the break is inserted in front of the next
                            // line, we need to use the next sibling for the line
                            // height
                            dy: this.getLineHeight(br.nextSibling),
                            x
                        });
                    }
                });
                // Constrain the line width, either by ellipsis or wrapping
                const width = this.width || 0;
                if (!width) {
                    return;
                }
                // Insert soft line breaks into each text node
                const modifyTextNode = (textNode, parentElement) => {
                    const text = textNode.textContent || '';
                    const words = text
                        .replace(/([^\^])-/g, '$1- ') // Split on hyphens
                        // .trim()
                        .split(' '); // #1273
                    const hasWhiteSpace = !this.noWrap && (words.length > 1 || wrapper.element.childNodes.length > 1);
                    const dy = this.getLineHeight(parentElement);
                    let lineNo = 0;
                    let startAt = wrapper.actualWidth;
                    if (this.ellipsis) {
                        if (text) {
                            this.truncate(textNode, text, void 0, 0, 
                            // Target width
                            Math.max(0, 
                            // Subtract the font face to make room for the
                            // ellipsis itself
                            width - 0.8 * dy), 
                            // Build the text to test for
                            (text, currentIndex) => text.substring(0, currentIndex) + '\u2026');
                        }
                    }
                    else if (hasWhiteSpace) {
                        const lines = [];
                        // Remove preceding siblings in order to make the text length
                        // calculation correct in the truncate function
                        const precedingSiblings = [];
                        while (parentElement.firstChild &&
                            parentElement.firstChild !== textNode) {
                            precedingSiblings.push(parentElement.firstChild);
                            parentElement.removeChild(parentElement.firstChild);
                        }
                        while (words.length) {
                            // Apply the previous line
                            if (words.length && !this.noWrap && lineNo > 0) {
                                lines.push(textNode.textContent || '');
                                textNode.textContent = words.join(' ')
                                    .replace(/- /g, '-');
                            }
                            // For each line, truncate the remaining
                            // words into the line length.
                            this.truncate(textNode, void 0, words, lineNo === 0 ? (startAt || 0) : 0, width, 
                            // Build the text to test for
                            (t, currentIndex) => words
                                .slice(0, currentIndex)
                                .join(' ')
                                .replace(/- /g, '-'));
                            startAt = wrapper.actualWidth;
                            lineNo++;
                        }
                        // Reinsert the preceding child nodes
                        precedingSiblings.forEach((childNode) => {
                            parentElement.insertBefore(childNode, textNode);
                        });
                        // Insert the previous lines before the original text node
                        lines.forEach((line) => {
                            // Insert the line
                            parentElement.insertBefore(doc.createTextNode(line), textNode);
                            // Insert a break
                            const br = doc.createElementNS(SVG_NS, 'tspan');
                            br.textContent = '\u200B'; // Zero-width space
                            attr(br, { dy, x });
                            parentElement.insertBefore(br, textNode);
                        });
                    }
                };
                // Recurse down the DOM tree and handle line breaks for each text node
                const modifyChildren = ((node) => {
                    const childNodes = [].slice.call(node.childNodes);
                    childNodes.forEach((childNode) => {
                        if (childNode.nodeType === win.Node.TEXT_NODE) {
                            modifyTextNode(childNode, node);
                        }
                        else {
                            // Reset word-wrap width readings after hard breaks
                            if (childNode.className.baseVal
                                .indexOf('highcharts-br') !== -1) {
                                wrapper.actualWidth = 0;
                            }
                            // Recurse down to child node
                            modifyChildren(childNode);
                        }
                    });
                });
                modifyChildren(wrapper.element);
            }
            /**
             * Get the rendered line height of a <text>, <tspan> or pure text node.
             *
             * @param {DOMElementType|Text} node The node to check for
             *
             * @return {number} The rendered line height
             */
            getLineHeight(node) {
                // If the node is a text node, use its parent
                const element = (node.nodeType === win.Node.TEXT_NODE) ?
                    node.parentElement :
                    node;
                return this.textLineHeight ?
                    parseInt(this.textLineHeight.toString(), 10) :
                    this.renderer.fontMetrics(element || this.svgElement.element).h;
            }
            /**
             * Transform a pseudo HTML AST node tree into an SVG structure. We do as
             * much heavy lifting as we can here, before doing the final processing in
             * the modifyDOM function. The original data is mutated.
             *
             * @private
             *
             * @param {ASTNode[]} nodes The AST nodes
             *
             */
            modifyTree(nodes) {
                const modifyChild = (node, i) => {
                    const { attributes = {}, children, style = {}, tagName } = node, styledMode = this.renderer.styledMode;
                    // Apply styling to text tags
                    if (tagName === 'b' || tagName === 'strong') {
                        if (styledMode) {
                            // eslint-disable-next-line dot-notation
                            attributes['class'] = 'highcharts-strong';
                        }
                        else {
                            style.fontWeight = 'bold';
                        }
                    }
                    else if (tagName === 'i' || tagName === 'em') {
                        if (styledMode) {
                            // eslint-disable-next-line dot-notation
                            attributes['class'] = 'highcharts-emphasized';
                        }
                        else {
                            style.fontStyle = 'italic';
                        }
                    }
                    // Modify styling
                    if (style && style.color) {
                        style.fill = style.color;
                    }
                    // Handle breaks
                    if (tagName === 'br') {
                        attributes['class'] = 'highcharts-br'; // eslint-disable-line dot-notation
                        node.textContent = '\u200B'; // Zero-width space
                        // Trim whitespace off the beginning of new lines
                        const nextNode = nodes[i + 1];
                        if (nextNode && nextNode.textContent) {
                            nextNode.textContent =
                                nextNode.textContent.replace(/^ +/gm, '');
                        }
                        // If an anchor has direct text node children, the text is unable to
                        // wrap because there is no `getSubStringLength` function on the
                        // element. Therefore we need to wrap the child text node or nodes
                        // in a tspan. #16173.
                    }
                    else if (tagName === 'a' &&
                        children &&
                        children.some((child) => child.tagName === '#text')) {
                        node.children = [{ children, tagName: 'tspan' }];
                    }
                    if (tagName !== '#text' && tagName !== 'a') {
                        node.tagName = 'tspan';
                    }
                    extend(node, { attributes, style });
                    // Recurse
                    if (children) {
                        children
                            .filter((c) => c.tagName !== '#text')
                            .forEach(modifyChild);
                    }
                };
                nodes.forEach(modifyChild);
                fireEvent(this.svgElement, 'afterModifyTree', { nodes });
            }
            /*
             * Truncate the text node contents to a given length. Used when the css
             * width is set. If the `textOverflow` is `ellipsis`, the text is truncated
             * character by character to the given length. If not, the text is
             * word-wrapped line by line.
             */
            truncate(textNode, text, words, startAt, width, getString) {
                const svgElement = this.svgElement;
                const { rotation } = svgElement;
                // Cache the lengths to avoid checking the same twice
                const lengths = [];
                // Word wrap cannot be truncated to shorter than one word, ellipsis
                // text can be completely blank.
                let minIndex = words ? 1 : 0;
                let maxIndex = (text || words || '').length;
                let currentIndex = maxIndex;
                let str;
                let actualWidth;
                const getSubStringLength = function (charEnd, concatenatedEnd) {
                    // `charEnd` is used when finding the character-by-character
                    // break for ellipsis, concatenatedEnd is used for word-by-word
                    // break for word wrapping.
                    const end = concatenatedEnd || charEnd;
                    const parentNode = textNode.parentNode;
                    if (parentNode && typeof lengths[end] === 'undefined') {
                        // Modern browsers
                        if (parentNode.getSubStringLength) {
                            // Fails with DOM exception on unit-tests/legend/members
                            // of unknown reason. Desired width is 0, text content
                            // is "5" and end is 1.
                            try {
                                lengths[end] = startAt +
                                    parentNode.getSubStringLength(0, words ? end + 1 : end);
                            }
                            catch (e) {
                                '';
                            }
                        }
                    }
                    return lengths[end];
                };
                svgElement.rotation = 0; // Discard rotation when computing box
                actualWidth = getSubStringLength(textNode.textContent.length);
                if (startAt + actualWidth > width) {
                    // Do a binary search for the index where to truncate the text
                    while (minIndex <= maxIndex) {
                        currentIndex = Math.ceil((minIndex + maxIndex) / 2);
                        // When checking words for word-wrap, we need to build the
                        // string and measure the subStringLength at the concatenated
                        // word length.
                        if (words) {
                            str = getString(words, currentIndex);
                        }
                        actualWidth = getSubStringLength(currentIndex, str && str.length - 1);
                        if (minIndex === maxIndex) {
                            // Complete
                            minIndex = maxIndex + 1;
                        }
                        else if (actualWidth > width) {
                            // Too large. Set max index to current.
                            maxIndex = currentIndex - 1;
                        }
                        else {
                            // Within width. Set min index to current.
                            minIndex = currentIndex;
                        }
                    }
                    // If max index was 0 it means the shortest possible text was also
                    // too large. For ellipsis that means only the ellipsis, while for
                    // word wrap it means the whole first word.
                    if (maxIndex === 0) {
                        // Remove ellipsis
                        textNode.textContent = '';
                        // If the new text length is one less than the original, we don't
                        // need the ellipsis
                    }
                    else if (!(text && maxIndex === text.length - 1)) {
                        textNode.textContent = str || getString(text || words, currentIndex);
                    }
                }
                // When doing line wrapping, prepare for the next line by removing the
                // items from this line.
                if (words) {
                    words.splice(0, currentIndex);
                }
                svgElement.actualWidth = actualWidth;
                svgElement.rotation = rotation; // Apply rotation again.
            }
            /*
             * Un-escape HTML entities based on the public `renderer.escapes` list
             *
             * @private
             *
             * @param {string} inputStr The string to unescape
             * @param {Array<string>} [except] Exceptions
             *
             * @return {string} The processed string
             */
            unescapeEntities(inputStr, except) {
                objectEach(this.renderer.escapes, function (value, key) {
                    if (!except || except.indexOf(value) === -1) {
                        inputStr = inputStr.toString().replace(new RegExp(value, 'g'), key);
                    }
                });
                return inputStr;
            }
        }

        return TextBuilder;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGRenderer.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Defaults.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Renderer/RendererRegistry.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGLabel.js'], _modules['Core/Renderer/SVG/Symbols.js'], _modules['Core/Renderer/SVG/TextBuilder.js'], _modules['Core/Utilities.js']], function (AST, D, Color, H, RendererRegistry, SVGElement, SVGLabel, Symbols, TextBuilder, U) {
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
        const { charts, deg2rad, doc, isFirefox, isMS, isWebKit, noop, SVG_NS, symbolSizes, win } = H;
        const { addEvent, attr, createElement, crisp, css, defined, destroyObjectProperties, extend, isArray, isNumber, isObject, isString, merge, pick, pInt, replaceNested, uniqueKey } = U;
        /* *
         *
         *  Variables
         *
         * */
        let hasInternalReferenceBug;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Allows direct access to the Highcharts rendering layer in order to draw
         * primitive shapes like circles, rectangles, paths or text directly on a chart,
         * or independent from any chart. The SVGRenderer represents a wrapper object
         * for SVG in modern browsers.
         *
         * An existing chart's renderer can be accessed through {@link Chart.renderer}.
         * The renderer can also be used completely decoupled from a chart.
         *
         * See [How to use the SVG Renderer](
         * https://www.highcharts.com/docs/advanced-chart-features/renderer) for a
         * comprehensive tutorial.
         *
         * @sample highcharts/members/renderer-on-chart
         *         Annotating a chart programmatically.
         * @sample highcharts/members/renderer-basic
         *         Independent SVG drawing.
         *
         * @example
         * // Use directly without a chart object.
         * let renderer = new Highcharts.Renderer(parentNode, 600, 400);
         *
         * @class
         * @name Highcharts.SVGRenderer
         *
         * @param {Highcharts.HTMLDOMElement} container
         *        Where to put the SVG in the web page.
         *
         * @param {number} width
         *        The width of the SVG.
         *
         * @param {number} height
         *        The height of the SVG.
         *
         * @param {Highcharts.CSSObject} [style]
         *        The box style, if not in styleMode
         *
         * @param {boolean} [forExport=false]
         *        Whether the rendered content is intended for export.
         *
         * @param {boolean} [allowHTML=true]
         *        Whether the renderer is allowed to include HTML text, which will be
         *        projected on top of the SVG.
         *
         * @param {boolean} [styledMode=false]
         *        Whether the renderer belongs to a chart that is in styled mode.
         *        If it does, it will avoid setting presentational attributes in
         *        some cases, but not when set explicitly through `.attr` and `.css`
         *        etc.
         */
        class SVGRenderer {
            /**
             * The root `svg` node of the renderer.
             *
             * @name Highcharts.SVGRenderer#box
             * @type {Highcharts.SVGDOMElement}
             */
            /**
             * The wrapper for the root `svg` node of the renderer.
             *
             * @name Highcharts.SVGRenderer#boxWrapper
             * @type {Highcharts.SVGElement}
             */
            /**
             * A pointer to the `defs` node of the root SVG.
             *
             * @name Highcharts.SVGRenderer#defs
             * @type {Highcharts.SVGElement}
             */
            /**
             * Whether the rendered content is intended for export.
             *
             * @name Highcharts.SVGRenderer#forExport
             * @type {boolean | undefined}
             */
            /**
             * Page url used for internal references.
             *
             * @private
             * @name Highcharts.SVGRenderer#url
             * @type {string}
             */
            /**
             * Initialize the SVGRenderer. Overridable initializer function that takes
             * the same parameters as the constructor.
             *
             * @function Highcharts.SVGRenderer#init
             *
             * @param {Highcharts.HTMLDOMElement} container
             * Where to put the SVG in the web page.
             *
             * @param {number} width
             * The width of the SVG.
             *
             * @param {number} height
             * The height of the SVG.
             *
             * @param {Highcharts.CSSObject} [style]
             * The box style, if not in styleMode
             *
             * @param {boolean} [forExport=false]
             * Whether the rendered content is intended for export.
             *
             * @param {boolean} [allowHTML=true]
             * Whether the renderer is allowed to include HTML text, which will be
             * projected on top of the SVG.
             *
             * @param {boolean} [styledMode=false]
             * Whether the renderer belongs to a chart that is in styled mode. If it
             * does, it will avoid setting presentational attributes in some cases, but
             * not when set explicitly through `.attr` and `.css` etc.
             */
            constructor(container, width, height, style, forExport, allowHTML, styledMode) {
                const renderer = this, boxWrapper = renderer
                    .createElement('svg')
                    .attr({
                    version: '1.1',
                    'class': 'highcharts-root'
                }), element = boxWrapper.element;
                if (!styledMode) {
                    boxWrapper.css(this.getStyle(style || {}));
                }
                container.appendChild(element);
                // Always use ltr on the container, otherwise text-anchor will be
                // flipped and text appear outside labels, buttons, tooltip etc (#3482)
                attr(container, 'dir', 'ltr');
                // For browsers other than IE, add the namespace attribute (#1978)
                if (container.innerHTML.indexOf('xmlns') === -1) {
                    attr(element, 'xmlns', this.SVG_NS);
                }
                this.box = element;
                this.boxWrapper = boxWrapper;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                // Add description
                const desc = this.createElement('desc').add();
                desc.element.appendChild(doc.createTextNode('Created with Highcharts 11.4.6'));
                this.defs = this.createElement('defs').add();
                this.allowHTML = allowHTML;
                this.forExport = forExport;
                this.styledMode = styledMode;
                this.gradients = {}; // Object where gradient SvgElements are stored
                this.cache = {}; // Cache for numerical bounding boxes
                this.cacheKeys = [];
                this.imgCount = 0;
                this.rootFontSize = boxWrapper.getStyle('font-size');
                renderer.setSize(width, height, false);
                // Issue 110 workaround:
                // In Firefox, if a div is positioned by percentage, its pixel position
                // may land between pixels. The container itself doesn't display this,
                // but an SVG element inside this container will be drawn at subpixel
                // precision. In order to draw sharp lines, this must be compensated
                // for. This doesn't seem to work inside iframes though (like in
                // jsFiddle).
                let subPixelFix, rect;
                if (isFirefox && container.getBoundingClientRect) {
                    subPixelFix = function () {
                        css(container, { left: 0, top: 0 });
                        rect = container.getBoundingClientRect();
                        css(container, {
                            left: (Math.ceil(rect.left) - rect.left) + 'px',
                            top: (Math.ceil(rect.top) - rect.top) + 'px'
                        });
                    };
                    // Run the fix now
                    subPixelFix();
                    // Run it on resize
                    renderer.unSubPixelFix = addEvent(win, 'resize', subPixelFix);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * General method for adding a definition to the SVG `defs` tag. Can be used
             * for gradients, fills, filters etc. Styled mode only. A hook for adding
             * general definitions to the SVG's defs tag. Definitions can be referenced
             * from the CSS by its `id`. Read more in
             * [gradients, shadows and patterns](https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns).
             * Styled mode only.
             *
             * @function Highcharts.SVGRenderer#definition
             *
             * @param {Highcharts.ASTNode} def
             * A serialized form of an SVG definition, including children.
             *
             * @return {Highcharts.SVGElement}
             * The inserted node.
             */
            definition(def) {
                const ast = new AST([def]);
                return ast.addToDOM(this.defs.element);
            }
            /**
             * Get the prefix needed for internal URL references to work in certain
             * cases. Some older browser versions had a bug where internal url
             * references in SVG attributes, on the form `url(#some-id)`, would fail if
             * a base tag was present in the page. There were also issues with
             * `history.pushState` related to this prefix.
             *
             * Related issues: #24, #672, #1070, #5244.
             *
             * The affected browsers are:
             * - Chrome <= 53 (May 2018)
             * - Firefox <= 51 (January 2017)
             * - Safari/Mac <= 12.1 (2018 or 2019)
             * - Safari/iOS <= 13
             *
             * @todo Remove this hack when time has passed. All the affected browsers
             * are evergreens, so it is increasingly unlikely that users are affected by
             * the bug.
             *
             * @return {string}
             * The prefix to use. An empty string for modern browsers.
             */
            getReferenceURL() {
                if ((isFirefox || isWebKit) &&
                    doc.getElementsByTagName('base').length) {
                    // Detect if a clip path is taking effect by performing a hit test
                    // outside the clipped area. If the hit element is the rectangle
                    // that was supposed to be clipped, the bug is present. This only
                    // has to be performed once per page load, so we store the result
                    // locally in the module.
                    if (!defined(hasInternalReferenceBug)) {
                        const id = uniqueKey();
                        const ast = new AST([{
                                tagName: 'svg',
                                attributes: {
                                    width: 8,
                                    height: 8
                                },
                                children: [{
                                        tagName: 'defs',
                                        children: [{
                                                tagName: 'clipPath',
                                                attributes: {
                                                    id
                                                },
                                                children: [{
                                                        tagName: 'rect',
                                                        attributes: {
                                                            width: 4,
                                                            height: 4
                                                        }
                                                    }]
                                            }]
                                    }, {
                                        tagName: 'rect',
                                        attributes: {
                                            id: 'hitme',
                                            width: 8,
                                            height: 8,
                                            'clip-path': `url(#${id})`,
                                            fill: 'rgba(0,0,0,0.001)'
                                        }
                                    }]
                            }]);
                        const svg = ast.addToDOM(doc.body);
                        css(svg, {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 9e5
                        });
                        const hitElement = doc.elementFromPoint(6, 6);
                        hasInternalReferenceBug = (hitElement && hitElement.id) === 'hitme';
                        doc.body.removeChild(svg);
                    }
                    if (hasInternalReferenceBug) {
                        // Scan alert #[72]: Loop for nested patterns
                        return replaceNested(win.location.href.split('#')[0], // Remove hash
                        [/<[^>]*>/g, ''], // Wing cut HTML
                        [/([\('\)])/g, '\\$1'], // Escape parantheses and quotes
                        [/ /g, '%20'] // Replace spaces (needed for Safari only)
                        );
                    }
                }
                return '';
            }
            /**
             * Get the global style setting for the renderer.
             *
             * @private
             * @function Highcharts.SVGRenderer#getStyle
             *
             * @param {Highcharts.CSSObject} style
             * Style settings.
             *
             * @return {Highcharts.CSSObject}
             * The style settings mixed with defaults.
             */
            getStyle(style) {
                this.style = extend({
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1rem'
                }, style);
                return this.style;
            }
            /**
             * Apply the global style on the renderer, mixed with the default styles.
             *
             * @function Highcharts.SVGRenderer#setStyle
             *
             * @param {Highcharts.CSSObject} style
             * CSS to apply.
             */
            setStyle(style) {
                this.boxWrapper.css(this.getStyle(style));
            }
            /**
             * Detect whether the renderer is hidden. This happens when one of the
             * parent elements has `display: none`. Used internally to detect when we
             * need to render preliminarily in another div to get the text bounding
             * boxes right.
             *
             * @function Highcharts.SVGRenderer#isHidden
             *
             * @return {boolean}
             * True if it is hidden.
             */
            isHidden() {
                return !this.boxWrapper.getBBox().width;
            }
            /**
             * Destroys the renderer and its allocated members.
             *
             * @function Highcharts.SVGRenderer#destroy
             *
             * @return {null}
             * Pass through value.
             */
            destroy() {
                const renderer = this, rendererDefs = renderer.defs;
                renderer.box = null;
                renderer.boxWrapper = renderer.boxWrapper.destroy();
                // Call destroy on all gradient elements
                destroyObjectProperties(renderer.gradients || {});
                renderer.gradients = null;
                renderer.defs = rendererDefs.destroy();
                // Remove sub pixel fix handler (#982)
                if (renderer.unSubPixelFix) {
                    renderer.unSubPixelFix();
                }
                renderer.alignedObjects = null;
                return null;
            }
            /**
             * Create a wrapper for an SVG element. Serves as a factory for
             * {@link SVGElement}, but this function is itself mostly called from
             * primitive factories like {@link SVGRenderer#path}, {@link
             * SVGRenderer#rect} or {@link SVGRenderer#text}.
             *
             * @function Highcharts.SVGRenderer#createElement
             *
             * @param {string} nodeName
             * The node name, for example `rect`, `g` etc.
             *
             * @return {Highcharts.SVGElement}
             * The generated SVGElement.
             */
            createElement(nodeName) {
                return new this.Element(this, nodeName);
            }
            /**
             * Get converted radial gradient attributes according to the radial
             * reference. Used internally from the {@link SVGElement#colorGradient}
             * function.
             *
             * @private
             * @function Highcharts.SVGRenderer#getRadialAttr
             */
            getRadialAttr(radialReference, gradAttr) {
                return {
                    cx: (radialReference[0] - radialReference[2] / 2) +
                        (gradAttr.cx || 0) * radialReference[2],
                    cy: (radialReference[1] - radialReference[2] / 2) +
                        (gradAttr.cy || 0) * radialReference[2],
                    r: (gradAttr.r || 0) * radialReference[2]
                };
            }
            /**
             * Create a drop shadow definition and return its id
             *
             * @private
             * @function Highcharts.SVGRenderer#shadowDefinition
             *
             * @param {boolean|Highcharts.ShadowOptionsObject} [shadowOptions] The
             *        shadow options. If `true`, the default options are applied
             */
            shadowDefinition(shadowOptions) {
                const id = [
                    `highcharts-drop-shadow-${this.chartIndex}`,
                    ...Object.keys(shadowOptions)
                        .map((key) => `${key}-${shadowOptions[key]}`)
                ].join('-').toLowerCase().replace(/[^a-z\d\-]/g, ''), options = merge({
                    color: '#000000',
                    offsetX: 1,
                    offsetY: 1,
                    opacity: 0.15,
                    width: 5
                }, shadowOptions);
                if (!this.defs.element.querySelector(`#${id}`)) {
                    this.definition({
                        tagName: 'filter',
                        attributes: {
                            id,
                            filterUnits: options.filterUnits
                        },
                        children: this.getShadowFilterContent(options)
                    });
                }
                return id;
            }
            /**
             * Get shadow filter content.
             * NOTE! Overridden in es5 module for IE11 compatibility.
             *
             * @private
             * @function Highcharts.SVGRenderer#getShadowFilterContent
             *
             * @param {ShadowOptionsObject} options
             * The shadow options.
             * @return {Array<AST.Node>}
             * The shadow filter content.
             */
            getShadowFilterContent(options) {
                return [{
                        tagName: 'feDropShadow',
                        attributes: {
                            dx: options.offsetX,
                            dy: options.offsetY,
                            'flood-color': options.color,
                            // Tuned and modified to keep a preserve compatibility
                            // with the old settings
                            'flood-opacity': Math.min(options.opacity * 5, 1),
                            stdDeviation: options.width / 2
                        }
                    }];
            }
            /**
             * Parse a simple HTML string into SVG tspans. Called internally when text
             * is set on an SVGElement. The function supports a subset of HTML tags, CSS
             * text features like `width`, `text-overflow`, `white-space`, and also
             * attributes like `href` and `style`.
             *
             * @private
             * @function Highcharts.SVGRenderer#buildText
             *
             * @param {Highcharts.SVGElement} wrapper
             * The parent SVGElement.
             */
            buildText(wrapper) {
                new TextBuilder(wrapper).buildSVG();
            }
            /**
             * Returns white for dark colors and black for bright colors, based on W3C's
             * definition of [Relative luminance](
             * https://www.w3.org/WAI/GL/wiki/Relative_luminance).
             *
             * @function Highcharts.SVGRenderer#getContrast
             *
             * @param {Highcharts.ColorString} color
             * The color to get the contrast for.
             *
             * @return {Highcharts.ColorString}
             * The contrast color, either `#000000` or `#FFFFFF`.
             */
            getContrast(color) {
                // #6216, #17273
                const rgba = Color.parse(color).rgba
                    .map((b8) => {
                    const c = b8 / 255;
                    return c <= 0.03928 ?
                        c / 12.92 :
                        Math.pow((c + 0.055) / 1.055, 2.4);
                });
                // Relative luminance
                const l = 0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2];
                // Use white or black based on which provides more contrast
                return 1.05 / (l + 0.05) > (l + 0.05) / 0.05 ? '#FFFFFF' : '#000000';
            }
            /**
             * Create a button with preset states. Styles for the button can either be
             * set as arguments, or a general theme for all buttons can be set by the
             * `global.buttonTheme` option.
             *
             * @function Highcharts.SVGRenderer#button
             *
             * @param {string} text
             * The text or HTML to draw.
             *
             * @param {number} x
             * The x position of the button's left side.
             *
             * @param {number} y
             * The y position of the button's top side.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.SVGElement>} callback
             * The function to execute on button click or touch.
             *
             * @param {Highcharts.SVGAttributes} [theme]
             * SVG attributes for the normal state.
             *
             * @param {Highcharts.SVGAttributes} [hoverState]
             * SVG attributes for the hover state.
             *
             * @param {Highcharts.SVGAttributes} [selectState]
             * SVG attributes for the pressed state.
             *
             * @param {Highcharts.SVGAttributes} [disabledState]
             * SVG attributes for the disabled state.
             *
             * @param {Highcharts.SymbolKeyValue} [shape=rect]
             * The shape type.
             *
             * @param {boolean} [useHTML=false]
             * Whether to use HTML to render the label.
             *
             * @return {Highcharts.SVGElement}
             * The button element.
             */
            button(text, x, y, callback, theme = {}, hoverState, selectState, disabledState, shape, useHTML) {
                const label = this.label(text, x, y, shape, void 0, void 0, useHTML, void 0, 'button'), styledMode = this.styledMode, args = arguments;
                let curState = 0;
                theme = merge(defaultOptions.global.buttonTheme, theme);
                // @todo Consider moving this to a lower level, like .attr
                if (styledMode) {
                    delete theme.fill;
                    delete theme.stroke;
                    delete theme['stroke-width'];
                }
                const states = theme.states || {}, normalStyle = theme.style || {};
                delete theme.states;
                delete theme.style;
                // Presentational
                const stateAttribs = [
                    AST.filterUserAttributes(theme)
                ], 
                // The string type is a mistake, it is just for compliance with
                // SVGAttribute and is not used in button theme.
                stateStyles = [normalStyle];
                if (!styledMode) {
                    ['hover', 'select', 'disabled'].forEach((stateName, i) => {
                        stateAttribs.push(merge(stateAttribs[0], AST.filterUserAttributes(args[i + 5] || states[stateName] || {})));
                        stateStyles.push(stateAttribs[i + 1].style);
                        delete stateAttribs[i + 1].style;
                    });
                }
                // Add the events. IE9 and IE10 need mouseover and mouseout to function
                // (#667).
                addEvent(label.element, isMS ? 'mouseover' : 'mouseenter', function () {
                    if (curState !== 3) {
                        label.setState(1);
                    }
                });
                addEvent(label.element, isMS ? 'mouseout' : 'mouseleave', function () {
                    if (curState !== 3) {
                        label.setState(curState);
                    }
                });
                label.setState = (state = 0) => {
                    // Hover state is temporary, don't record it
                    if (state !== 1) {
                        label.state = curState = state;
                    }
                    // Update visuals
                    label
                        .removeClass(/highcharts-button-(normal|hover|pressed|disabled)/)
                        .addClass('highcharts-button-' +
                        ['normal', 'hover', 'pressed', 'disabled'][state]);
                    if (!styledMode) {
                        label.attr(stateAttribs[state]);
                        const css = stateStyles[state];
                        if (isObject(css)) {
                            label.css(css);
                        }
                    }
                };
                label.attr(stateAttribs[0]);
                // Presentational attributes
                if (!styledMode) {
                    label.css(extend({ cursor: 'default' }, normalStyle));
                    // HTML labels don't need to handle pointer events because click and
                    // mouseenter/mouseleave is bound to the underlying <g> element.
                    // Should this be reconsidered, we need more complex logic to share
                    // events between the <g> and its <div> counterpart, and avoid
                    // triggering mouseenter/mouseleave when hovering from one to the
                    // other (#17440).
                    if (useHTML) {
                        label.text.css({ pointerEvents: 'none' });
                    }
                }
                return label
                    .on('touchstart', (e) => e.stopPropagation())
                    .on('click', function (e) {
                    if (curState !== 3) {
                        callback.call(label, e);
                    }
                });
            }
            /**
             * Make a straight line crisper by not spilling out to neighbour pixels.
             *
             * @function Highcharts.SVGRenderer#crispLine
             *
             * @param {Highcharts.SVGPathArray} points
             *        The original points on the format `[['M', 0, 0], ['L', 100, 0]]`.
             *
             * @param {number} width
             *        The width of the line.
             *
             * @return {Highcharts.SVGPathArray}
             *         The original points array, but modified to render crisply.
             */
            crispLine(points, width) {
                const [start, end] = points;
                // Normalize to a crisp line
                if (defined(start[1]) && start[1] === end[1]) {
                    start[1] = end[1] = crisp(start[1], width);
                }
                if (defined(start[2]) && start[2] === end[2]) {
                    start[2] = end[2] = crisp(start[2], width);
                }
                return points;
            }
            /**
             * Draw a path, wraps the SVG `path` element.
             *
             * @sample highcharts/members/renderer-path-on-chart/
             *         Draw a path in a chart
             * @sample highcharts/members/renderer-path/
             *         Draw a path independent from a chart
             *
             * @example
             * let path = renderer.path(['M', 10, 10, 'L', 30, 30, 'z'])
             *     .attr({ stroke: '#ff00ff' })
             *     .add();
             *
             * @function Highcharts.SVGRenderer#path
             *
             * @param {Highcharts.SVGPathArray} [path]
             * An SVG path definition in array form.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             *
             */ /**
            * Draw a path, wraps the SVG `path` element.
            *
            * @function Highcharts.SVGRenderer#path
            *
            * @param {Highcharts.SVGAttributes} [attribs]
            * The initial attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            path(path) {
                const attribs = (this.styledMode ? {} : {
                    fill: 'none'
                });
                if (isArray(path)) {
                    attribs.d = path;
                }
                else if (isObject(path)) { // Attributes
                    extend(attribs, path);
                }
                return this.createElement('path').attr(attribs);
            }
            /**
             * Draw a circle, wraps the SVG `circle` element.
             *
             * @sample highcharts/members/renderer-circle/
             *         Drawing a circle
             *
             * @function Highcharts.SVGRenderer#circle
             *
             * @param {number} [x]
             * The center x position.
             *
             * @param {number} [y]
             * The center y position.
             *
             * @param {number} [r]
             * The radius.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw a circle, wraps the SVG `circle` element.
            *
            * @function Highcharts.SVGRenderer#circle
            *
            * @param {Highcharts.SVGAttributes} [attribs]
            * The initial attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            circle(x, y, r) {
                const attribs = (isObject(x) ?
                    x :
                    typeof x === 'undefined' ? {} : { x: x, y: y, r: r }), wrapper = this.createElement('circle');
                // Setting x or y translates to cx and cy
                wrapper.xSetter = wrapper.ySetter = function (value, key, element) {
                    element.setAttribute('c' + key, value);
                };
                return wrapper.attr(attribs);
            }
            /**
             * Draw and return an arc.
             *
             * @sample highcharts/members/renderer-arc/
             *         Drawing an arc
             *
             * @function Highcharts.SVGRenderer#arc
             *
             * @param {number} [x=0]
             * Center X position.
             *
             * @param {number} [y=0]
             * Center Y position.
             *
             * @param {number} [r=0]
             * The outer radius' of the arc.
             *
             * @param {number} [innerR=0]
             * Inner radius like used in donut charts.
             *
             * @param {number} [start=0]
             * The starting angle of the arc in radians, where 0 is to the right and
             * `-Math.PI/2` is up.
             *
             * @param {number} [end=0]
             * The ending angle of the arc in radians, where 0 is to the right and
             * `-Math.PI/2` is up.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw and return an arc. Overloaded function that takes arguments object.
            *
            * @function Highcharts.SVGRenderer#arc
            *
            * @param {Highcharts.SVGAttributes} attribs
            * Initial SVG attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            arc(x, y, r, innerR, start, end) {
                let options;
                if (isObject(x)) {
                    options = x;
                    y = options.y;
                    r = options.r;
                    innerR = options.innerR;
                    start = options.start;
                    end = options.end;
                    x = options.x;
                }
                else {
                    options = { innerR, start, end };
                }
                // Arcs are defined as symbols for the ability to set
                // attributes in attr and animate
                const arc = this.symbol('arc', x, y, r, r, options);
                arc.r = r; // #959
                return arc;
            }
            /**
             * Draw and return a rectangle.
             *
             * @function Highcharts.SVGRenderer#rect
             *
             * @param {number} [x]
             * Left position.
             *
             * @param {number} [y]
             * Top position.
             *
             * @param {number} [width]
             * Width of the rectangle.
             *
             * @param {number} [height]
             * Height of the rectangle.
             *
             * @param {number} [r]
             * Border corner radius.
             *
             * @param {number} [strokeWidth]
             * A stroke width can be supplied to allow crisp drawing.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw and return a rectangle.
            *
            * @sample highcharts/members/renderer-rect-on-chart/
            *         Draw a rectangle in a chart
            * @sample highcharts/members/renderer-rect/
            *         Draw a rectangle independent from a chart
            *
            * @function Highcharts.SVGRenderer#rect
            *
            * @param {Highcharts.SVGAttributes} [attributes]
            * General SVG attributes for the rectangle.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            rect(x, y, width, height, r, strokeWidth) {
                const attribs = (isObject(x) ?
                    x :
                    typeof x === 'undefined' ?
                        {} :
                        {
                            x,
                            y,
                            r,
                            width: Math.max(width || 0, 0),
                            height: Math.max(height || 0, 0)
                        }), wrapper = this.createElement('rect');
                if (!this.styledMode) {
                    if (typeof strokeWidth !== 'undefined') {
                        attribs['stroke-width'] = strokeWidth;
                        extend(attribs, wrapper.crisp(attribs));
                    }
                    attribs.fill = 'none';
                }
                wrapper.rSetter = function (value, _key, element) {
                    wrapper.r = value;
                    attr(element, {
                        rx: value,
                        ry: value
                    });
                };
                wrapper.rGetter = function () {
                    return wrapper.r || 0;
                };
                return wrapper.attr(attribs);
            }
            /**
             * Draw and return a rectangle with advanced corner rounding options.
             *
             * @function Highcharts.SVGRenderer#roundedRect
             *
             * @param {Highcharts.SVGAttributes} attribs
             *      Attributes
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */
            roundedRect(attribs) {
                return this.symbol('roundedRect').attr(attribs);
            }
            /**
             * Resize the {@link SVGRenderer#box} and re-align all aligned child
             * elements.
             *
             * @sample highcharts/members/renderer-g/
             *         Show and hide grouped objects
             *
             * @function Highcharts.SVGRenderer#setSize
             *
             * @param {number} width
             * The new pixel width.
             *
             * @param {number} height
             * The new pixel height.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animate=true]
             * Whether and how to animate.
             */
            setSize(width, height, animate) {
                const renderer = this;
                renderer.width = width;
                renderer.height = height;
                renderer.boxWrapper.animate({
                    width: width,
                    height: height
                }, {
                    step: function () {
                        this.attr({
                            viewBox: '0 0 ' + this.attr('width') + ' ' +
                                this.attr('height')
                        });
                    },
                    duration: pick(animate, true) ? void 0 : 0
                });
                renderer.alignElements();
            }
            /**
             * Create and return an svg group element. Child
             * {@link Highcharts.SVGElement} objects are added to the group by using the
             * group as the first parameter in {@link Highcharts.SVGElement#add|add()}.
             *
             * @function Highcharts.SVGRenderer#g
             *
             * @param {string} [name]
             *        The group will be given a class name of `highcharts-{name}`. This
             *        can be used for styling and scripting.
             *
             * @return {Highcharts.SVGElement}
             *         The generated wrapper element.
             */
            g(name) {
                const elem = this.createElement('g');
                return name ?
                    elem.attr({ 'class': 'highcharts-' + name }) :
                    elem;
            }
            /**
             * Display an image.
             *
             * @sample highcharts/members/renderer-image-on-chart/
             *         Add an image in a chart
             * @sample highcharts/members/renderer-image/
             *         Add an image independent of a chart
             *
             * @function Highcharts.SVGRenderer#image
             *
             * @param {string} href
             *        The image source.
             *
             * @param {number} [x]
             *        The X position.
             *
             * @param {number} [y]
             *        The Y position.
             *
             * @param {number} [width]
             *        The image width. If omitted, it defaults to the image file width.
             *
             * @param {number} [height]
             *        The image height. If omitted it defaults to the image file
             *        height.
             *
             * @param {Function} [onload]
             *        Event handler for image load.
             *
             * @return {Highcharts.SVGElement}
             *         The generated wrapper element.
             */
            image(href, x, y, width, height, onload) {
                const attribs = { preserveAspectRatio: 'none' };
                // Optional properties (#11756)
                if (isNumber(x)) {
                    attribs.x = x;
                }
                if (isNumber(y)) {
                    attribs.y = y;
                }
                if (isNumber(width)) {
                    attribs.width = width;
                }
                if (isNumber(height)) {
                    attribs.height = height;
                }
                const elemWrapper = this.createElement('image').attr(attribs), onDummyLoad = function (e) {
                    elemWrapper.attr({ href });
                    onload.call(elemWrapper, e);
                };
                // Add load event if supplied
                if (onload) {
                    // We have to use a dummy HTML image since IE support for SVG image
                    // load events is very buggy. First set a transparent src, wait for
                    // dummy to load, and then add the real src to the SVG image.
                    elemWrapper.attr({
                        /* eslint-disable-next-line max-len */
                        href: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    });
                    const dummy = new win.Image();
                    addEvent(dummy, 'load', onDummyLoad);
                    dummy.src = href;
                    if (dummy.complete) {
                        onDummyLoad({});
                    }
                }
                else {
                    elemWrapper.attr({ href });
                }
                return elemWrapper;
            }
            /**
             * Draw a symbol out of pre-defined shape paths from
             * {@link SVGRenderer#symbols}.
             * It is used in Highcharts for point makers, which cake a `symbol` option,
             * and label and button backgrounds like in the tooltip and stock flags.
             *
             * @function Highcharts.SVGRenderer#symbol
             *
             * @param {string} symbol
             * The symbol name.
             *
             * @param {number} [x]
             * The X coordinate for the top left position.
             *
             * @param {number} [y]
             * The Y coordinate for the top left position.
             *
             * @param {number} [width]
             * The pixel width.
             *
             * @param {number} [height]
             * The pixel height.
             *
             * @param {Highcharts.SymbolOptionsObject} [options]
             * Additional options, depending on the actual symbol drawn.
             *
             * @return {Highcharts.SVGElement}
             * SVG symbol.
             */
            symbol(symbol, x, y, width, height, options) {
                const ren = this, imageRegex = /^url\((.*?)\)$/, isImage = imageRegex.test(symbol), sym = (!isImage && (this.symbols[symbol] ? symbol : 'circle')), 
                // Get the symbol definition function
                symbolFn = (sym && this.symbols[sym]);
                let obj, path, imageSrc, centerImage;
                if (symbolFn) {
                    // Check if there's a path defined for this symbol
                    if (typeof x === 'number') {
                        path = symbolFn.call(this.symbols, x || 0, y || 0, width || 0, height || 0, options);
                    }
                    obj = this.path(path);
                    if (!ren.styledMode) {
                        obj.attr('fill', 'none');
                    }
                    // Expando properties for use in animate and attr
                    extend(obj, {
                        symbolName: (sym || void 0),
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    });
                    if (options) {
                        extend(obj, options);
                    }
                    // Image symbols
                }
                else if (isImage) {
                    imageSrc = symbol.match(imageRegex)[1];
                    // Create the image synchronously, add attribs async
                    const img = obj = this.image(imageSrc);
                    // The image width is not always the same as the symbol width. The
                    // image may be centered within the symbol, as is the case when
                    // image shapes are used as label backgrounds, for example in flags.
                    img.imgwidth = pick(options && options.width, symbolSizes[imageSrc] && symbolSizes[imageSrc].width);
                    img.imgheight = pick(options && options.height, symbolSizes[imageSrc] && symbolSizes[imageSrc].height);
                    /**
                     * Set the size and position
                     */
                    centerImage = (obj) => obj.attr({
                        width: obj.width,
                        height: obj.height
                    });
                    /**
                     * Width and height setters that take both the image's physical size
                     * and the label size into consideration, and translates the image
                     * to center within the label.
                     */
                    ['width', 'height'].forEach((key) => {
                        img[`${key}Setter`] = function (value, key) {
                            this[key] = value;
                            const { alignByTranslate, element, width, height, imgwidth, imgheight } = this, imgSize = key === 'width' ? imgwidth : imgheight;
                            let scale = 1;
                            // Scale and center the image within its container. The name
                            // `backgroundSize` is taken from the CSS spec, but the
                            // value `within` is made up. Other possible values in the
                            // spec, `cover` and `contain`, can be implemented if
                            // needed.
                            if (options &&
                                options.backgroundSize === 'within' &&
                                width &&
                                height &&
                                imgwidth &&
                                imgheight) {
                                scale = Math.min(width / imgwidth, height / imgheight);
                                // Update both width and height to keep the ratio
                                // correct (#17315)
                                attr(element, {
                                    width: Math.round(imgwidth * scale),
                                    height: Math.round(imgheight * scale)
                                });
                            }
                            else if (element && imgSize) {
                                element.setAttribute(key, imgSize);
                            }
                            if (!alignByTranslate && imgwidth && imgheight) {
                                this.translate(((width || 0) - (imgwidth * scale)) / 2, ((height || 0) - (imgheight * scale)) / 2);
                            }
                        };
                    });
                    if (defined(x)) {
                        img.attr({
                            x: x,
                            y: y
                        });
                    }
                    img.isImg = true;
                    if (defined(img.imgwidth) && defined(img.imgheight)) {
                        centerImage(img);
                    }
                    else {
                        // Initialize image to be 0 size so export will still function
                        // if there's no cached sizes.
                        img.attr({ width: 0, height: 0 });
                        // Create a dummy JavaScript image to get the width and height.
                        createElement('img', {
                            onload: function () {
                                const chart = charts[ren.chartIndex];
                                // Special case for SVGs on IE11, the width is not
                                // accessible until the image is part of the DOM
                                // (#2854).
                                if (this.width === 0) {
                                    css(this, {
                                        position: 'absolute',
                                        top: '-999em'
                                    });
                                    doc.body.appendChild(this);
                                }
                                // Center the image
                                symbolSizes[imageSrc] = {
                                    width: this.width,
                                    height: this.height
                                };
                                img.imgwidth = this.width;
                                img.imgheight = this.height;
                                if (img.element) {
                                    centerImage(img);
                                }
                                // Clean up after #2854 workaround.
                                if (this.parentNode) {
                                    this.parentNode.removeChild(this);
                                }
                                // Fire the load event when all external images are
                                // loaded
                                ren.imgCount--;
                                if (!ren.imgCount && chart && !chart.hasLoaded) {
                                    chart.onload();
                                }
                            },
                            src: imageSrc
                        });
                        this.imgCount++;
                    }
                }
                return obj;
            }
            /**
             * Define a clipping rectangle. The clipping rectangle is later applied
             * to {@link SVGElement} objects through the {@link SVGElement#clip}
             * function.
             *
             * This function is deprecated as of v11.2. Instead, use a regular shape
             * (`rect`, `path` etc), and the `SVGElement.clipTo` function.
             *
             * @example
             * let circle = renderer.circle(100, 100, 100)
             *     .attr({ fill: 'red' })
             *     .add();
             * let clipRect = renderer.clipRect(100, 100, 100, 100);
             *
             * // Leave only the lower right quarter visible
             * circle.clip(clipRect);
             *
             * @deprecated
             *
             * @function Highcharts.SVGRenderer#clipRect
             *
             * @param {number} [x]
             *
             * @param {number} [y]
             *
             * @param {number} [width]
             *
             * @param {number} [height]
             *
             * @return {Highcharts.ClipRectElement}
             *         A clipping rectangle.
             */
            clipRect(x, y, width, height) {
                return this.rect(x, y, width, height, 0);
            }
            /**
             * Draw text. The text can contain a subset of HTML, like spans and anchors
             * and some basic text styling of these. For more advanced features like
             * border and background, use {@link Highcharts.SVGRenderer#label} instead.
             * To update the text after render, run `text.attr({ text: 'New text' })`.
             *
             * @sample highcharts/members/renderer-text-on-chart/
             *         Annotate the chart freely
             * @sample highcharts/members/renderer-on-chart/
             *         Annotate with a border and in response to the data
             * @sample highcharts/members/renderer-text/
             *         Formatted text
             *
             * @function Highcharts.SVGRenderer#text
             *
             * @param {string} [str]
             * The text of (subset) HTML to draw.
             *
             * @param {number} [x]
             * The x position of the text's lower left corner.
             *
             * @param {number} [y]
             * The y position of the text's lower left corner.
             *
             * @param {boolean} [useHTML=false]
             * Use HTML to render the text.
             *
             * @return {Highcharts.SVGElement}
             * The text object.
             */
            text(str, x, y, useHTML) {
                const renderer = this, attribs = {};
                if (useHTML && (renderer.allowHTML || !renderer.forExport)) {
                    return renderer.html(str, x, y);
                }
                attribs.x = Math.round(x || 0); // X always needed for line-wrap logic
                if (y) {
                    attribs.y = Math.round(y);
                }
                if (defined(str)) {
                    attribs.text = str;
                }
                const wrapper = renderer.createElement('text').attr(attribs);
                if (!useHTML || (renderer.forExport && !renderer.allowHTML)) {
                    wrapper.xSetter = function (value, key, element) {
                        const tspans = element.getElementsByTagName('tspan'), parentVal = element.getAttribute(key);
                        for (let i = 0, tspan; i < tspans.length; i++) {
                            tspan = tspans[i];
                            // If the x values are equal, the tspan represents a line
                            // break
                            if (tspan.getAttribute(key) === parentVal) {
                                tspan.setAttribute(key, value);
                            }
                        }
                        element.setAttribute(key, value);
                    };
                }
                return wrapper;
            }
            /**
             * Utility to return the baseline offset and total line height from the font
             * size.
             *
             * @function Highcharts.SVGRenderer#fontMetrics
             *
             * @param {Highcharts.SVGElement|Highcharts.SVGDOMElement|number} [element]
             *        The element to inspect for a current font size. If a number is
             *        given, it's used as a fall back for direct font size in pixels.
             *
             * @return {Highcharts.FontMetricsObject}
             *         The font metrics.
             */
            fontMetrics(element) {
                const f = pInt(SVGElement.prototype.getStyle.call(element, 'font-size') || 0);
                // Empirical values found by comparing font size and bounding box
                // height. Applies to the default font family.
                // https://jsfiddle.net/highcharts/7xvn7/
                const h = f < 24 ? f + 3 : Math.round(f * 1.2), b = Math.round(h * 0.8);
                return {
                    // Line height
                    h,
                    // Baseline
                    b,
                    // Font size
                    f
                };
            }
            /**
             * Correct X and Y positioning of a label for rotation (#1764).
             *
             * @private
             * @function Highcharts.SVGRenderer#rotCorr
             */
            rotCorr(baseline, rotation, alterY) {
                let y = baseline;
                if (rotation && alterY) {
                    y = Math.max(y * Math.cos(rotation * deg2rad), 4);
                }
                return {
                    x: (-baseline / 3) * Math.sin(rotation * deg2rad),
                    y: y
                };
            }
            /**
             * Compatibility function to convert the legacy one-dimensional path array
             * into an array of segments.
             *
             * It is used in maps to parse the `path` option, and in SVGRenderer.dSetter
             * to support legacy paths from demos.
             *
             * @private
             * @function Highcharts.SVGRenderer#pathToSegments
             */
            pathToSegments(path) {
                const ret = [];
                const segment = [];
                const commandLength = {
                    A: 8,
                    C: 7,
                    H: 2,
                    L: 3,
                    M: 3,
                    Q: 5,
                    S: 5,
                    T: 3,
                    V: 2
                };
                // Short, non-typesafe parsing of the one-dimensional array. It splits
                // the path on any string. This is not type checked against the tuple
                // types, but is shorter, and doesn't require specific checks for any
                // command type in SVG.
                for (let i = 0; i < path.length; i++) {
                    // Command skipped, repeat previous or insert L/l for M/m
                    if (isString(segment[0]) &&
                        isNumber(path[i]) &&
                        segment.length === commandLength[(segment[0].toUpperCase())]) {
                        path.splice(i, 0, segment[0].replace('M', 'L').replace('m', 'l'));
                    }
                    // Split on string
                    if (typeof path[i] === 'string') {
                        if (segment.length) {
                            ret.push(segment.slice(0));
                        }
                        segment.length = 0;
                    }
                    segment.push(path[i]);
                }
                ret.push(segment.slice(0));
                return ret;
                /*
                // Fully type-safe version where each tuple type is checked. The
                // downside is filesize and a lack of flexibility for unsupported
                // commands
                const ret: SVGPath = [],
                    commands = {
                        A: 7,
                        C: 6,
                        H: 1,
                        L: 2,
                        M: 2,
                        Q: 4,
                        S: 4,
                        T: 2,
                        V: 1,
                        Z: 0
                    };

                let i = 0,
                    lastI = 0,
                    lastCommand;

                while (i < path.length) {
                    const item = path[i];

                    let command;

                    if (typeof item === 'string') {
                        command = item;
                        i += 1;
                    } else {
                        command = lastCommand || 'M';
                    }

                    // Upper case
                    const commandUC = command.toUpperCase();

                    if (commandUC in commands) {

                        // No numeric parameters
                        if (command === 'Z' || command === 'z') {
                            ret.push([command]);

                        // One numeric parameter
                        } else {
                            const val0 = path[i];
                            if (typeof val0 === 'number') {

                                // Horizontal line to
                                if (command === 'H' || command === 'h') {
                                    ret.push([command, val0]);
                                    i += 1;

                                // Vertical line to
                                } else if (command === 'V' || command === 'v') {
                                    ret.push([command, val0]);
                                    i += 1;

                                // Two numeric parameters
                                } else {
                                    const val1 = path[i + 1];
                                    if (typeof val1 === 'number') {
                                        // lineTo
                                        if (command === 'L' || command === 'l') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // moveTo
                                        } else if (command === 'M' || command === 'm') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // Smooth quadratic bezier
                                        } else if (command === 'T' || command === 't') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // Four numeric parameters
                                        } else {
                                            const val2 = path[i + 2],
                                                val3 = path[i + 3];
                                            if (
                                                typeof val2 === 'number' &&
                                                typeof val3 === 'number'
                                            ) {
                                                // Quadratic bezier to
                                                if (
                                                    command === 'Q' ||
                                                    command === 'q'
                                                ) {
                                                    ret.push([
                                                        command,
                                                        val0,
                                                        val1,
                                                        val2,
                                                        val3
                                                    ]);
                                                    i += 4;

                                                // Smooth cubic bezier to
                                                } else if (
                                                    command === 'S' ||
                                                    command === 's'
                                                ) {
                                                    ret.push([
                                                        command,
                                                        val0,
                                                        val1,
                                                        val2,
                                                        val3
                                                    ]);
                                                    i += 4;

                                                // Six numeric parameters
                                                } else {
                                                    const val4 = path[i + 4],
                                                        val5 = path[i + 5];

                                                    if (
                                                        typeof val4 === 'number' &&
                                                        typeof val5 === 'number'
                                                    ) {
                                                        // Curve to
                                                        if (
                                                            command === 'C' ||
                                                            command === 'c'
                                                        ) {
                                                            ret.push([
                                                                command,
                                                                val0,
                                                                val1,
                                                                val2,
                                                                val3,
                                                                val4,
                                                                val5
                                                            ]);
                                                            i += 6;

                                                        // Seven numeric parameters
                                                        } else {
                                                            const val6 = path[i + 6];

                                                            // Arc to
                                                            if (
                                                                typeof val6 ===
                                                                'number' &&
                                                                (
                                                                    command === 'A' ||
                                                                    command === 'a'
                                                                )
                                                            ) {
                                                                ret.push([
                                                                    command,
                                                                    val0,
                                                                    val1,
                                                                    val2,
                                                                    val3,
                                                                    val4,
                                                                    val5,
                                                                    val6
                                                                ]);
                                                                i += 7;

                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                    // An unmarked command following a moveTo is a lineTo
                    lastCommand = command === 'M' ? 'L' : command;

                    if (i === lastI) {
                        break;
                    }
                    lastI = i;
                }
                return ret;
                */
            }
            /**
             * Draw a label, which is an extended text element with support for border
             * and background. Highcharts creates a `g` element with a text and a `path`
             * or `rect` inside, to make it behave somewhat like a HTML div. Border and
             * background are set through `stroke`, `stroke-width` and `fill` attributes
             * using the {@link Highcharts.SVGElement#attr|attr} method. To update the
             * text after render, run `label.attr({ text: 'New text' })`.
             *
             * @sample highcharts/members/renderer-label-on-chart/
             *         A label on the chart
             *
             * @function Highcharts.SVGRenderer#label
             *
             * @param {string} str
             *        The initial text string or (subset) HTML to render.
             *
             * @param {number} x
             *        The x position of the label's left side.
             *
             * @param {number} [y]
             *        The y position of the label's top side or baseline, depending on
             *        the `baseline` parameter.
             *
             * @param {string} [shape='rect']
             *        The shape of the label's border/background, if any. Defaults to
             *        `rect`. Other possible values are `callout` or other shapes
             *        defined in {@link Highcharts.SVGRenderer#symbols}.
             *
             * @param {number} [anchorX]
             *        In case the `shape` has a pointer, like a flag, this is the
             *        coordinates it should be pinned to.
             *
             * @param {number} [anchorY]
             *        In case the `shape` has a pointer, like a flag, this is the
             *        coordinates it should be pinned to.
             *
             * @param {boolean} [useHTML=false]
             *        Whether to use HTML to render the label.
             *
             * @param {boolean} [baseline=false]
             *        Whether to position the label relative to the text baseline,
             *        like {@link Highcharts.SVGRenderer#text|renderer.text}, or to the
             *        upper border of the rectangle.
             *
             * @param {string} [className]
             *        Class name for the group.
             *
             * @return {Highcharts.SVGElement}
             *         The generated label.
             */
            label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {
                return new SVGLabel(this, str, x, y, shape, anchorX, anchorY, useHTML, baseline, className);
            }
            /**
             * Re-align all aligned elements.
             *
             * @private
             * @function Highcharts.SVGRenderer#alignElements
             */
            alignElements() {
                this.alignedObjects.forEach((el) => el.align());
            }
        }
        extend(SVGRenderer.prototype, {
            /**
             * A pointer to the renderer's associated Element class.
             *
             * @name Highcharts.SVGRenderer#Element
             * @type {Highcharts.SVGElement}
             */
            Element: SVGElement,
            SVG_NS,
            /**
             * A collection of characters mapped to HTML entities. When `useHTML` on an
             * element is true, these entities will be rendered correctly by HTML. In
             * the SVG pseudo-HTML, they need to be unescaped back to simple characters,
             * so for example `&lt;` will render as `<`.
             *
             * @example
             * // Add support for unescaping quotes
             * Highcharts.SVGRenderer.prototype.escapes['"'] = '&quot;';
             *
             * @name Highcharts.SVGRenderer#escapes
             * @type {Highcharts.Dictionary<string>}
             */
            escapes: {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;', // eslint-disable-line quotes
                '"': '&quot;'
            },
            /**
             * An extendable collection of functions for defining symbol paths.
             *
             * @name Highcharts.SVGRenderer#symbols
             * @type {Highcharts.SymbolDictionary}
             */
            symbols: Symbols,
            /**
             * Dummy function for plugins, called every time the renderer is updated.
             * Prior to Highcharts 5, this was used for the canvg renderer.
             *
             * @deprecated
             * @function Highcharts.SVGRenderer#draw
             */
            draw: noop
        });
        /* *
         *
         *  Registry
         *
         * */
        RendererRegistry.registerRendererType('svg', SVGRenderer, true);
        /* *
         *
         *  Export Default
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * A clipping rectangle that can be applied to one or more {@link SVGElement}
         * instances. It is instantiated with the {@link SVGRenderer#clipRect} function
         * and applied with the {@link SVGElement#clip} function.
         *
         * @example
         * let circle = renderer.circle(100, 100, 100)
         *     .attr({ fill: 'red' })
         *     .add();
         * let clipRect = renderer.clipRect(100, 100, 100, 100);
         *
         * // Leave only the lower right quarter visible
         * circle.clip(clipRect);
         *
         * @typedef {Highcharts.SVGElement} Highcharts.ClipRectElement
         */
        /**
         * The font metrics.
         *
         * @interface Highcharts.FontMetricsObject
         */ /**
        * The baseline relative to the top of the box.
        *
        * @name Highcharts.FontMetricsObject#b
        * @type {number}
        */ /**
        * The font size.
        *
        * @name Highcharts.FontMetricsObject#f
        * @type {number}
        */ /**
        * The line height.
        *
        * @name Highcharts.FontMetricsObject#h
        * @type {number}
        */
        /**
         * An object containing `x` and `y` properties for the position of an element.
         *
         * @interface Highcharts.PositionObject
         */ /**
        * X position of the element.
        * @name Highcharts.PositionObject#x
        * @type {number}
        */ /**
        * Y position of the element.
        * @name Highcharts.PositionObject#y
        * @type {number}
        */
        /**
         * A rectangle.
         *
         * @interface Highcharts.RectangleObject
         */ /**
        * Height of the rectangle.
        * @name Highcharts.RectangleObject#height
        * @type {number}
        */ /**
        * Width of the rectangle.
        * @name Highcharts.RectangleObject#width
        * @type {number}
        */ /**
        * Horizontal position of the rectangle.
        * @name Highcharts.RectangleObject#x
        * @type {number}
        */ /**
        * Vertical position of the rectangle.
        * @name Highcharts.RectangleObject#y
        * @type {number}
        */
        /**
         * The shadow options.
         *
         * @interface Highcharts.ShadowOptionsObject
         */ /**
        * The shadow color.
        * @name    Highcharts.ShadowOptionsObject#color
        * @type    {Highcharts.ColorString|undefined}
        * @default #000000
        */ /**
        * The horizontal offset from the element.
        *
        * @name    Highcharts.ShadowOptionsObject#offsetX
        * @type    {number|undefined}
        * @default 1
        */ /**
        * The vertical offset from the element.
        * @name    Highcharts.ShadowOptionsObject#offsetY
        * @type    {number|undefined}
        * @default 1
        */ /**
        * The shadow opacity.
        *
        * @name    Highcharts.ShadowOptionsObject#opacity
        * @type    {number|undefined}
        * @default 0.15
        */ /**
        * The shadow width or distance from the element.
        * @name    Highcharts.ShadowOptionsObject#width
        * @type    {number|undefined}
        * @default 3
        */
        /**
         * @interface Highcharts.SizeObject
         */ /**
        * @name Highcharts.SizeObject#height
        * @type {number}
        */ /**
        * @name Highcharts.SizeObject#width
        * @type {number}
        */
        /**
         * Array of path commands, that will go into the `d` attribute of an SVG
         * element.
         *
         * @typedef {Array<(Array<Highcharts.SVGPathCommand>|Array<Highcharts.SVGPathCommand,number>|Array<Highcharts.SVGPathCommand,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number,number,number,number>)>} Highcharts.SVGPathArray
         */
        /**
         * Possible path commands in an SVG path array. Valid values are `A`, `C`, `H`,
         * `L`, `M`, `Q`, `S`, `T`, `V`, `Z`.
         *
         * @typedef {string} Highcharts.SVGPathCommand
         * @validvalue ["a","c","h","l","m","q","s","t","v","z","A","C","H","L","M","Q","S","T","V","Z"]
         */
        /**
         * An extendable collection of functions for defining symbol paths. Symbols are
         * used internally for point markers, button and label borders and backgrounds,
         * or custom shapes. Extendable by adding to {@link SVGRenderer#symbols}.
         *
         * @interface Highcharts.SymbolDictionary
         */ /**
        * @name Highcharts.SymbolDictionary#[key:string]
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#arc
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#callout
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#circle
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#diamond
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#square
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#triangle
        * @type {Function|undefined}
        */
        /**
         * Can be one of `arc`, `callout`, `circle`, `diamond`, `square`, `triangle`,
         * and `triangle-down`. Symbols are used internally for point markers, button
         * and label borders and backgrounds, or custom shapes. Extendable by adding to
         * {@link SVGRenderer#symbols}.
         *
         * @typedef {"arc"|"callout"|"circle"|"diamond"|"square"|"triangle"|"triangle-down"} Highcharts.SymbolKeyValue
         */
        /**
         * Additional options, depending on the actual symbol drawn.
         *
         * @interface Highcharts.SymbolOptionsObject
         */ /**
        * The anchor X position for the `callout` symbol. This is where the chevron
        * points to.
        *
        * @name Highcharts.SymbolOptionsObject#anchorX
        * @type {number|undefined}
        */ /**
        * The anchor Y position for the `callout` symbol. This is where the chevron
        * points to.
        *
        * @name Highcharts.SymbolOptionsObject#anchorY
        * @type {number|undefined}
        */ /**
        * The end angle of an `arc` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#end
        * @type {number|undefined}
        */ /**
        * Whether to draw `arc` symbol open or closed.
        *
        * @name Highcharts.SymbolOptionsObject#open
        * @type {boolean|undefined}
        */ /**
        * The radius of an `arc` symbol, or the border radius for the `callout` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#r
        * @type {number|undefined}
        */ /**
        * The start angle of an `arc` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#start
        * @type {number|undefined}
        */
        (''); // Keeps doclets above in transpiled file

        return SVGRenderer;
    });
    _registerModule(_modules, 'Series/ArcDiagram/ArcDiagramSeries.js', [_modules['Series/ArcDiagram/ArcDiagramPoint.js'], _modules['Series/ArcDiagram/ArcDiagramSeriesDefaults.js'], _modules['Series/Sankey/SankeyColumnComposition.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Extensions/TextPath.js']], function (ArcDiagramPoint, ArcDiagramSeriesDefaults, SankeyColumnComposition, Series, SeriesRegistry, SVGRenderer, U, SVGElement, TextPath) {
        /* *
         *
         *  Arc diagram module
         *
         *  (c) 2021 Piotr Madej, Grzegorz Blachliński
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        TextPath.compose(SVGElement);
        const { prototype: { symbols } } = SVGRenderer;
        const { seriesTypes: { column: ColumnSeries, sankey: SankeySeries } } = SeriesRegistry;
        const { crisp, extend, merge, pick, relativeLength } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.arcdiagram
         *
         * @augments Highcharts.seriesTypes.sankey
         */
        class ArcDiagramSeries extends SankeySeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create node columns by analyzing the nodes and the relations between
             * incoming and outgoing links.
             * @private
             */
            createNodeColumns() {
                const series = this, chart = series.chart, 
                // Column needs casting, to much methods required at the same time
                column = SankeyColumnComposition.compose([], series);
                column.sankeyColumn.maxLength = chart.inverted ?
                    chart.plotHeight : chart.plotWidth;
                // Get the translation factor needed for each column to fill up the plot
                // height
                column.sankeyColumn.getTranslationFactor = (series) => {
                    const nodes = column.slice(), minLinkWidth = this.options.minLinkWidth || 0;
                    let skipPoint, factor = 0, i, radius, maxRadius = 0, scale = 1, additionalSpace = 0, remainingWidth = (chart.plotSizeX || 0) -
                        (series.options.marker &&
                            series.options.marker.lineWidth || 0) -
                        (column.length - 1) *
                            series.nodePadding;
                    // Because the minLinkWidth option doesn't obey the direct
                    // translation, we need to run translation iteratively, check node
                    // heights, remove those nodes affected by minLinkWidth, check
                    // again, etc.
                    while (column.length) {
                        factor = remainingWidth / column.sankeyColumn.sum();
                        skipPoint = false;
                        i = column.length;
                        while (i--) {
                            radius = (column[i].getSum()) * factor * scale;
                            const plotArea = Math.min(chart.plotHeight, chart.plotWidth);
                            if (radius > plotArea) {
                                scale = Math.min(plotArea / radius, scale);
                            }
                            else if (radius < minLinkWidth) {
                                column.splice(i, 1);
                                remainingWidth -= minLinkWidth;
                                radius = minLinkWidth;
                                skipPoint = true;
                            }
                            additionalSpace += radius * (1 - scale) / 2;
                            maxRadius = Math.max(maxRadius, radius);
                        }
                        if (!skipPoint) {
                            break;
                        }
                    }
                    // Re-insert original nodes
                    column.length = 0;
                    nodes.forEach((node) => {
                        node.scale = scale;
                        column.push(node);
                    });
                    column.sankeyColumn.maxRadius = maxRadius;
                    column.sankeyColumn.scale = scale;
                    column.sankeyColumn.additionalSpace = additionalSpace;
                    return factor;
                };
                column.sankeyColumn.offset = function (node, factor) {
                    const equalNodes = node.series.options.equalNodes, nodePadding = series.nodePadding, maxRadius = Math.min(chart.plotWidth, chart.plotHeight, (column.sankeyColumn.maxLength || 0) /
                        series.nodes.length - nodePadding);
                    let offset = column.sankeyColumn.additionalSpace || 0, totalNodeOffset;
                    for (let i = 0; i < column.length; i++) {
                        const sum = column[i].getSum() *
                            (column.sankeyColumn.scale || 0);
                        const width = equalNodes ?
                            maxRadius :
                            Math.max(sum * factor, series.options.minLinkWidth || 0);
                        if (sum) {
                            totalNodeOffset = width + nodePadding;
                        }
                        else {
                            // If node sum equals 0 nodePadding is missed #12453
                            totalNodeOffset = 0;
                        }
                        if (column[i] === node) {
                            return {
                                relativeLeft: offset + relativeLength(node.options.offset || 0, totalNodeOffset)
                            };
                        }
                        offset += totalNodeOffset;
                    }
                };
                // Add nodes directly to the column right after it's creation
                series.nodes.forEach(function (node) {
                    node.column = 0;
                    column.push(node);
                });
                return [column];
            }
            /**
             * Run translation operations for one link.
             * @private
             */
            translateLink(point) {
                const series = this, fromNode = point.fromNode, toNode = point.toNode, chart = this.chart, translationFactor = series.translationFactor, pointOptions = point.options, seriesOptions = series.options, linkWeight = pick(pointOptions.linkWeight, seriesOptions.linkWeight, Math.max((point.weight || 0) *
                    translationFactor *
                    fromNode.scale, (series.options.minLinkWidth || 0))), centeredLinks = point.series.options.centeredLinks, nodeTop = fromNode.nodeY;
                const getX = (node, fromOrTo) => {
                    const linkLeft = ((node.offset(point, fromOrTo) || 0) *
                        translationFactor);
                    const x = Math.min(node.nodeX + linkLeft, 
                    // Prevent links from spilling below the node (#12014)
                    node.nodeX + (node.shapeArgs && node.shapeArgs.height || 0) - linkWeight);
                    return x;
                };
                let fromX = centeredLinks ?
                    fromNode.nodeX +
                        ((fromNode.shapeArgs.height || 0) - linkWeight) / 2 :
                    getX(fromNode, 'linksFrom'), toX = centeredLinks ? toNode.nodeX +
                    ((toNode.shapeArgs.height || 0) - linkWeight) / 2 :
                    getX(toNode, 'linksTo'), bottom = nodeTop;
                if (fromX > toX) {
                    [fromX, toX] = [toX, fromX];
                }
                if (seriesOptions.reversed) {
                    [fromX, toX] = [toX, fromX];
                    bottom = (chart.plotSizeY || 0) - bottom;
                }
                point.shapeType = 'path';
                point.linkBase = [
                    fromX,
                    fromX + linkWeight,
                    toX,
                    toX + linkWeight
                ];
                const linkRadius = ((toX + linkWeight - fromX) / Math.abs(toX + linkWeight - fromX)) * pick(seriesOptions.linkRadius, Math.min(Math.abs(toX + linkWeight - fromX) / 2, fromNode.nodeY - Math.abs(linkWeight)));
                point.shapeArgs = {
                    d: [
                        ['M', fromX, bottom],
                        [
                            'A',
                            (toX + linkWeight - fromX) / 2,
                            linkRadius,
                            0,
                            0,
                            1,
                            toX + linkWeight,
                            bottom
                        ],
                        ['L', toX, bottom],
                        [
                            'A',
                            (toX - fromX - linkWeight) / 2,
                            linkRadius - linkWeight,
                            0,
                            0,
                            0,
                            fromX + linkWeight,
                            bottom
                        ],
                        ['Z']
                    ]
                };
                point.dlBox = {
                    x: fromX + (toX - fromX) / 2,
                    y: bottom - linkRadius,
                    height: linkWeight,
                    width: 0
                };
                // And set the tooltip anchor in the middle
                point.tooltipPos = chart.inverted ? [
                    (chart.plotSizeY || 0) - point.dlBox.y - linkWeight / 2,
                    (chart.plotSizeX || 0) - point.dlBox.x
                ] : [
                    point.dlBox.x,
                    point.dlBox.y + linkWeight / 2
                ];
                // Pass test in drawPoints
                point.y = point.plotY = 1;
                point.x = point.plotX = 1;
                if (!point.color) {
                    point.color = fromNode.color;
                }
            }
            /**
             * Run translation operations for one node.
             * @private
             */
            translateNode(node, column) {
                const series = this, translationFactor = series.translationFactor, chart = series.chart, maxNodesLength = chart.inverted ?
                    chart.plotWidth : chart.plotHeight, options = series.options, maxRadius = Math.min(chart.plotWidth, chart.plotHeight, maxNodesLength / node.series.nodes.length - this.nodePadding), sum = node.getSum() * (column.sankeyColumn.scale || 0), equalNodes = options.equalNodes, nodeHeight = equalNodes ?
                    maxRadius :
                    Math.max(sum * translationFactor, this.options.minLinkWidth || 0), lineWidth = options.marker?.lineWidth || 0, nodeOffset = column.sankeyColumn.offset(node, translationFactor), fromNodeLeft = crisp(pick(nodeOffset && nodeOffset.absoluteLeft, ((column.sankeyColumn.left(translationFactor) || 0) +
                    (nodeOffset && nodeOffset.relativeLeft || 0))), lineWidth), markerOptions = merge(options.marker, node.options.marker), symbol = markerOptions.symbol, markerRadius = markerOptions.radius, top = parseInt(options.offset, 10) *
                    ((chart.inverted ?
                        chart.plotWidth : chart.plotHeight) - (crisp(this.colDistance * (node.column || 0) +
                        (markerOptions.lineWidth || 0) / 2, lineWidth) +
                        (column.sankeyColumn.scale || 0) *
                            (column.sankeyColumn.maxRadius || 0) / 2)) / 100;
                node.sum = sum;
                // If node sum is 0, don’t render the rect #12453
                if (sum) {
                    // Draw the node
                    node.nodeX = fromNodeLeft;
                    node.nodeY = top;
                    const x = fromNodeLeft, width = node.options.width || options.width || nodeHeight, height = node.options.height || options.height || nodeHeight;
                    let y = top;
                    if (options.reversed) {
                        y = (chart.plotSizeY || 0) - top;
                        if (chart.inverted) {
                            y = (chart.plotSizeY || 0) - top;
                        }
                    }
                    if (this.mapOptionsToLevel) {
                        // Calculate data label options for the point
                        node.dlOptions = SankeySeries.getDLOptions({
                            level: this.mapOptionsToLevel[node.level],
                            optionsPoint: node.options
                        });
                    }
                    // Pass test in drawPoints
                    node.plotX = 1;
                    node.plotY = 1;
                    // Set the anchor position for tooltips
                    node.tooltipPos = chart.inverted ? [
                        (chart.plotSizeY || 0) - y - height / 2,
                        (chart.plotSizeX || 0) - x - width / 2
                    ] : [
                        x + width / 2,
                        y + height / 2
                    ];
                    node.shapeType = 'path';
                    node.shapeArgs = {
                        d: symbols[symbol || 'circle'](x, y - (markerRadius || height) / 2, markerRadius || width, markerRadius || height),
                        width: markerRadius || width,
                        height: markerRadius || height
                    };
                    node.dlBox = {
                        x: x + width / 2,
                        y: y,
                        height: 0,
                        width: 0
                    };
                }
                else {
                    node.dlOptions = {
                        enabled: false
                    };
                }
            }
            // Networkgraph has two separate collecions of nodes and lines, render
            // dataLabels for both sets:
            drawDataLabels() {
                if (this.options.dataLabels) {
                    const textPath = this.options.dataLabels.textPath;
                    // Render node labels:
                    ColumnSeries.prototype.drawDataLabels.call(this, this.nodes);
                    // Render link labels:
                    this.options.dataLabels.textPath =
                        this.options.dataLabels.linkTextPath;
                    ColumnSeries.prototype.drawDataLabels.call(this, this.data);
                    // Restore nodes
                    this.options.dataLabels.textPath = textPath;
                }
            }
            pointAttribs(point, 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            state) {
                if (point && point.isNode) {
                    const { ...attrs } = Series.prototype.pointAttribs
                        .apply(this, arguments);
                    return attrs;
                }
                return super.pointAttribs.apply(this, arguments);
            }
            markerAttribs(point) {
                if (point.isNode) {
                    return super.markerAttribs.apply(this, arguments);
                }
                return {};
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        ArcDiagramSeries.defaultOptions = merge(SankeySeries.defaultOptions, ArcDiagramSeriesDefaults);
        extend(ArcDiagramSeries.prototype, {
            orderNodes: false
        });
        ArcDiagramSeries.prototype.pointClass = ArcDiagramPoint;
        SeriesRegistry.registerSeriesType('arcdiagram', ArcDiagramSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return ArcDiagramSeries;
    });
    _registerModule(_modules, 'masters/modules/arc-diagram.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
