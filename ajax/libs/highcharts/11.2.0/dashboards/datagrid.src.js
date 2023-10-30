/**
 * @license Highcharts Dashboards v (2023-10-30)
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('dashboards/datagrid', ['dashboards'], function (Dashboards) {
            factory(Dashboards);
            factory.Dashboards = Dashboards;
            return factory;
        });
    } else {
        factory(typeof Dashboards !== 'undefined' ? Dashboards : undefined);
    }
}(function (Dashboards) {
    'use strict';
    var _modules = Dashboards ? Dashboards._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'DashboardsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'DataGrid/Globals.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *  - Pawel Lysy
         *  - Karol Kolodziej
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Global DataGrid namespace.
         *
         * @namespace DataGrid
         */
        var Globals;
        (function (Globals) {
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
            Globals.classNamePrefix = 'highcharts-datagrid-';
            Globals.classNames = {
                gridContainer: Globals.classNamePrefix + 'container',
                outerContainer: Globals.classNamePrefix + 'outer-container',
                scrollContainer: Globals.classNamePrefix + 'scroll-container',
                innerContainer: Globals.classNamePrefix + 'inner-container',
                cell: Globals.classNamePrefix + 'cell',
                cellInput: Globals.classNamePrefix + 'cell-input',
                row: Globals.classNamePrefix + 'row',
                columnHeader: Globals.classNamePrefix + 'column-header'
            };
            Globals.win = window;
        })(Globals || (Globals = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Globals;
    });
    _registerModule(_modules, 'DataGrid/DataGridUtils.js', [], function () {
        /* *
         *
         *  Data Grid utilities
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        const DataGridUtils = {
            dataTableCellToString(cell) {
                return typeof cell === 'string' ||
                    typeof cell === 'number' ||
                    typeof cell === 'boolean' ?
                    '' + cell :
                    '';
            },
            emptyHTMLElement(element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            },
            makeDiv: (className, id) => {
                const div = document.createElement('div');
                div.className = className;
                if (id) {
                    div.id = id;
                }
                return div;
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DataGridUtils;
    });
    _registerModule(_modules, 'Core/Chart/ChartDefaults.js', [], function () {
        /* *
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
         * General options for the chart.
         *
         * @optionparent chart
         */
        const ChartDefaults = {
            /**
             * Default `mapData` for all series, in terms of a GeoJSON or TopoJSON
             * object. If set to a string, it functions as an index into the
             * `Highcharts.maps` array.
             *
             * For picking out individual shapes and geometries to use for each series
             * of the map, see [series.mapData](#series.map.mapData).
             *
             * @sample    maps/demo/geojson
             *            Loading GeoJSON data
             * @sample    maps/chart/topojson
             *            Loading TopoJSON data
             *
             * @type      {string|Array<*>|Highcharts.GeoJSON|Highcharts.TopoJSON}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.map
             */
            /**
             * Set lat/lon transformation definitions for the chart. If not defined,
             * these are extracted from the map data.
             *
             * @type      {*}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.mapTransforms
             */
            /**
             * When using multiple axes, the ticks of two or more opposite axes
             * will automatically be aligned by adding ticks to the axis or axes
             * with the least ticks, as if `tickAmount` were specified.
             *
             * This can be prevented by setting `alignTicks` to false. If the grid
             * lines look messy, it's a good idea to hide them for the secondary
             * axis by setting `gridLineWidth` to 0.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false,
             * then the `alignTicks ` will be disabled for the axis.
             *
             * Disabled for logarithmic axes.
             *
             * @sample {highcharts} highcharts/chart/alignticks-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/alignticks-false/
             *         False
             * @sample {highstock} stock/chart/alignticks-true/
             *         True by default
             * @sample {highstock} stock/chart/alignticks-false/
             *         False
             *
             * @type      {boolean}
             * @default   true
             * @product   highcharts highstock gantt
             * @apioption chart.alignTicks
             */
            /**
             * When using multiple axes, align the thresholds. When this is true, other
             * ticks will also be aligned.
             *
             * Note that for line series and some other series types, the `threshold`
             * option is set to `null` by default. This will in turn cause their y-axis
             * to not have a threshold. In order to avoid that, set the series
             * `threshold` to 0 or another number.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false, or
             * if the axis is logarithmic, the threshold will not be aligned.
             *
             * @sample {highcharts} highcharts/chart/alignthresholds/ Set to true
             *
             * @since 10.0.0
             * @product   highcharts highstock gantt
             * @apioption chart.alignThresholds
             */
            alignThresholds: false,
            /**
             * Set the overall animation for all chart updating. Animation can be
             * disabled throughout the chart by setting it to false here. It can
             * be overridden for each individual API method as a function parameter.
             * The only animation not affected by this option is the initial series
             * animation, see [plotOptions.series.animation](
             * #plotOptions.series.animation).
             *
             * The animation can either be set as a boolean or a configuration
             * object. If `true`, it will use the 'swing' jQuery easing and a
             * duration of 500 ms. If used as a configuration object, the following
             * properties are supported:
             *
             * - `defer`: The animation delay time in milliseconds.
             *
             * - `duration`: The duration of the animation in milliseconds.
             *
             * - `easing`: A string reference to an easing function set on the
             *   `Math` object. See
             *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
             *
             * When zooming on a series with less than 100 points, the chart redraw
             * will be done with animation, but in case of more data points, it is
             * necessary to set this option to ensure animation on zoom.
             *
             * @sample {highcharts} highcharts/chart/animation-none/
             *         Updating with no animation
             * @sample {highcharts} highcharts/chart/animation-duration/
             *         With a longer duration
             * @sample {highcharts} highcharts/chart/animation-easing/
             *         With a jQuery UI easing
             * @sample {highmaps} maps/chart/animation-none/
             *         Updating with no animation
             * @sample {highmaps} maps/chart/animation-duration/
             *         With a longer duration
             *
             * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
             * @default   true
             * @apioption chart.animation
             */
            /**
             * A CSS class name to apply to the charts container `div`, allowing
             * unique CSS styling for each chart.
             *
             * @type      {string}
             * @apioption chart.className
             */
            /**
             * Event listeners for the chart.
             *
             * @apioption chart.events
             */
            /**
             * Fires when a series is added to the chart after load time, using the
             * `addSeries` method. One parameter, `event`, is passed to the
             * function, containing common event information. Through
             * `event.options` you can access the series options that were passed to
             * the `addSeries` method. Returning false prevents the series from
             * being added.
             *
             * @sample {highcharts} highcharts/chart/events-addseries/
             *         Alert on add series
             * @sample {highstock} stock/chart/events-addseries/
             *         Alert on add series
             *
             * @type      {Highcharts.ChartAddSeriesCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.addSeries
             */
            /**
             * Fires when clicking on the plot background. One parameter, `event`,
             * is passed to the function, containing common event information.
             *
             * Information on the clicked spot can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' value at the clicked spot. The primary axes
             * are `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * click: function(e) {
             *     console.log(
             *         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
             *         e.yAxis[0].value
             *     )
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-click/
             *         Alert coordinates on click
             * @sample {highcharts} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highstock} stock/chart/events-click/
             *         Alert coordinates on click
             * @sample {highstock} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highmaps} maps/chart/events-click/
             *         Record coordinates on click
             * @sample {highmaps} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             *
             * @type      {Highcharts.ChartClickCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.click
             */
            /**
             * Fires when the chart is finished loading. Since v4.2.2, it also waits
             * for images to be loaded, for example from point markers. One
             * parameter, `event`, is passed to the function, containing common
             * event information.
             *
             * There is also a second parameter to the chart constructor where a
             * callback function can be passed to be executed on chart.load.
             *
             * @sample {highcharts} highcharts/chart/events-load/
             *         Alert on chart load
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-load/
             *         Alert on chart load
             * @sample {highmaps} maps/chart/events-load/
             *         Add series on chart load
             *
             * @type      {Highcharts.ChartLoadCallbackFunction}
             * @context   Highcharts.Chart
             * @apioption chart.events.load
             */
            /**
             * Fires when the chart is redrawn, either after a call to
             * `chart.redraw()` or after an axis, series or point is modified with
             * the `redraw` option set to `true`. One parameter, `event`, is passed
             * to the function, containing common event information.
             *
             * @sample {highcharts} highcharts/chart/events-redraw/
             *         Alert on chart redraw
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-redraw/
             *         Alert on chart redraw when adding a series or moving the
             *         zoomed range
             * @sample {highmaps} maps/chart/events-redraw/
             *         Set subtitle on chart redraw
             *
             * @type      {Highcharts.ChartRedrawCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.redraw
             */
            /**
             * Fires after initial load of the chart (directly after the `load`
             * event), and after each redraw (directly after the `redraw` event).
             *
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             *
             * @type      {Highcharts.ChartRenderCallbackFunction}
             * @since     5.0.7
             * @context   Highcharts.Chart
             * @apioption chart.events.render
             */
            /**
             * Fires when an area of the chart has been selected. Selection is
             * enabled by setting the chart's zoomType. One parameter, `event`, is
             * passed to the function, containing common event information. The
             * default action for the selection event is to zoom the chart to the
             * selected area. It can be prevented by calling
             * `event.preventDefault()` or return false.
             *
             * Information on the selected area can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' min and max values. The primary axes are
             * `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * selection: function(event) {
             *     // log the min and max of the primary, datetime x-axis
             *     console.log(
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].min
             *         ),
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].max
             *         )
             *     );
             *     // log the min and max of the y axis
             *     console.log(event.yAxis[0].min, event.yAxis[0].max);
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-selection/
             *         Report on selection and reset
             * @sample {highcharts} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             * @sample {highstock} stock/chart/events-selection/
             *         Report on selection and reset
             * @sample {highstock} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             *         (Highcharts)
             *
             * @type      {Highcharts.ChartSelectionCallbackFunction}
             * @apioption chart.events.selection
             */
            /**
             * The margin between the outer edge of the chart and the plot area.
             * The numbers in the array designate top, right, bottom and left
             * respectively. Use the options `marginTop`, `marginRight`,
             * `marginBottom` and `marginLeft` for shorthand setting of one option.
             *
             * By default there is no margin. The actual space is dynamically
             * calculated from the offset of axis labels, axis title, title,
             * subtitle and legend in addition to the `spacingTop`, `spacingRight`,
             * `spacingBottom` and `spacingLeft` options.
             *
             * @sample {highcharts} highcharts/chart/margins-zero/
             *         Zero margins
             * @sample {highstock} stock/chart/margin-zero/
             *         Zero margins
             *
             * @type      {number|Array<number>}
             * @apioption chart.margin
             */
            /**
             * The margin between the bottom outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingBottom`.
             *
             * @sample {highcharts} highcharts/chart/marginbottom/
             *         100px bottom margin
             * @sample {highstock} stock/chart/marginbottom/
             *         100px bottom margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginBottom
             */
            /**
             * The margin between the left outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingLeft`.
             *
             * @sample {highcharts} highcharts/chart/marginleft/
             *         150px left margin
             * @sample {highstock} stock/chart/marginleft/
             *         150px left margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginLeft
             */
            /**
             * The margin between the right outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingRight`.
             *
             * @sample {highcharts} highcharts/chart/marginright/
             *         100px right margin
             * @sample {highstock} stock/chart/marginright/
             *         100px right margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginRight
             */
            /**
             * The margin between the top outer edge of the chart and the plot area.
             * Use this to set a fixed pixel value for the margin as opposed to
             * the default dynamic margin. See also `spacingTop`.
             *
             * @sample {highcharts} highcharts/chart/margintop/ 100px top margin
             * @sample {highstock} stock/chart/margintop/
             *         100px top margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginTop
             */
            /**
             * Callback function to override the default function that formats all
             * the numbers in the chart. Returns a string with the formatted number.
             *
             * @sample highcharts/members/highcharts-numberformat
             *      Arabic digits in Highcharts
             * @type {Highcharts.NumberFormatterCallbackFunction}
             * @since 8.0.0
             * @apioption chart.numberFormatter
             */
            /**
             * Allows setting a key to switch between zooming and panning. Can be
             * one of `alt`, `ctrl`, `meta` (the command key on Mac and Windows
             * key on Windows) or `shift`. The keys are mapped directly to the key
             * properties of the click event argument (`event.altKey`,
             * `event.ctrlKey`, `event.metaKey` and `event.shiftKey`).
             *
             * @type       {string}
             * @since      4.0.3
             * @product    highcharts gantt
             * @validvalue ["alt", "ctrl", "meta", "shift"]
             * @apioption  chart.panKey
             */
            /**
             * Allow panning in a chart. Best used with [panKey](#chart.panKey)
             * to combine zooming and panning.
             *
             * On touch devices, when the [tooltip.followTouchMove](
             * #tooltip.followTouchMove) option is `true` (default), panning
             * requires two fingers. To allow panning with one finger, set
             * `followTouchMove` to `false`.
             *
             * @sample  {highcharts} highcharts/chart/pankey/ Zooming and panning
             * @sample  {highstock} stock/chart/panning/ Zooming and xy panning
             */
            panning: {
                /**
                 * Enable or disable chart panning.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock|highmaps} true
                 */
                enabled: false,
                /**
                 * Decides in what dimensions the user can pan the chart. Can be
                 * one of `x`, `y`, or `xy`.
                 *
                 * When this option is set to `y` or `xy`, [yAxis.startOnTick](#yAxis.startOnTick)
                 * and [yAxis.endOnTick](#yAxis.endOnTick) are overwritten to `false`.
                 *
                 * @sample {highcharts} highcharts/chart/panning-type
                 *         Zooming and xy panning
                 *
                 * @declare    Highcharts.OptionsChartPanningTypeValue
                 * @type       {string}
                 * @validvalue ["x", "y", "xy"]
                 * @default    {highcharts|highstock} x
                 * @product    highcharts highstock gantt
                 */
                type: 'x'
            },
            /**
             * Equivalent to [zoomType](#chart.zoomType), but for multitouch
             * gestures only. By default, the `pinchType` is the same as the
             * `zoomType` setting. However, pinching can be enabled separately in
             * some cases, for example in stock charts where a mouse drag pans the
             * chart, while pinching is enabled. When [tooltip.followTouchMove](
             * #tooltip.followTouchMove) is true, pinchType only applies to
             * two-finger touches.
             *
             * @type       {string}
             * @default    {highcharts} undefined
             * @default    {highstock} undefined
             * @since      3.0
             * @product    highcharts highstock gantt
             * @deprecated
             * @validvalue ["x", "y", "xy"]
             * @apioption  chart.pinchType
             */
            /**
             * Whether to apply styled mode. When in styled mode, no presentational
             * attributes or CSS are applied to the chart SVG. Instead, CSS rules
             * are required to style the chart. The default style sheet is
             * available from `https://code.highcharts.com/css/highcharts.css`.
             *
             * [Read more in the docs](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)
             * on what classes and variables are available.
             *
             * @sample highcharts/css/colors
             *         Color theming with CSS
             * @sample highcharts/css/prefers-color-scheme
             *         Dynamic theme based on system settings
             * @type       {boolean}
             * @default    false
             * @since      7.0
             * @apioption  chart.styledMode
             */
            styledMode: false,
            /**
             * The corner radius of the outer chart border.
             *
             * @sample {highcharts} highcharts/chart/borderradius/
             *         20px radius
             * @sample {highstock} stock/chart/border/
             *         10px radius
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             */
            borderRadius: 0,
            /**
             * In styled mode, this sets how many colors the class names
             * should rotate between. With ten colors, series (or points) are
             * given class names like `highcharts-color-0`, `highcharts-color-1`
             * [...] `highcharts-color-9`. The equivalent in non-styled mode
             * is to set colors using the [colors](#colors) setting.
             *
             * @since      5.0.0
             */
            colorCount: 10,
            /**
             * By default, (because of memory and performance reasons) the chart does
             * not copy the data but keeps it as a reference. In some cases, this might
             * result in mutating the original data source. In order to prevent that,
             * set that property to false. Please note that changing that might decrease
             * performance, especially with bigger sets of data.
             *
             * @type       {boolean}
             * @since 10.1.0
             */
            allowMutatingData: true,
            /**
             * If true, the axes will scale to the remaining visible series once
             * one series is hidden. If false, hiding and showing a series will
             * not affect the axes or the other series. For stacks, once one series
             * within the stack is hidden, the rest of the stack will close in
             * around it even if the axis is not affected.
             *
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-false/
             *         False
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true-stacked/
             *         True with stack
             * @sample {highstock} stock/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highstock} stock/chart/ignorehiddenseries-false/
             *         False
             *
             * @since   1.2.0
             * @product highcharts highstock gantt
             */
            ignoreHiddenSeries: true,
            /**
             * Whether to invert the axes so that the x axis is vertical and y axis
             * is horizontal. When `true`, the x axis is [reversed](#xAxis.reversed)
             * by default.
             *
             * @productdesc {highcharts}
             * If a bar series is present in the chart, it will be inverted
             * automatically. Inverting the chart doesn't have an effect if there
             * are no cartesian series in the chart, or if the chart is
             * [polar](#chart.polar).
             *
             * @sample {highcharts} highcharts/chart/inverted/
             *         Inverted line
             * @sample {highstock} stock/navigator/inverted/
             *         Inverted stock chart
             *
             * @type      {boolean}
             * @default   false
             * @product   highcharts highstock gantt
             * @apioption chart.inverted
             */
            /**
             * The distance between the outer edge of the chart and the content,
             * like title or legend, or axis title and labels if present. The
             * numbers in the array designate top, right, bottom and left
             * respectively. Use the options spacingTop, spacingRight, spacingBottom
             * and spacingLeft options for shorthand setting of one option.
             *
             * @type    {Array<number>}
             * @see     [chart.margin](#chart.margin)
             * @default [10, 10, 15, 10]
             * @since   3.0.6
             */
            spacing: [10, 10, 15, 10],
            /**
             * The button that appears after a selection zoom, allowing the user
             * to reset zoom. This option is deprecated in favor of
             * [zooming](#chart.zooming).
             *
             * @since      2.2
             * @deprecated 10.2.1
             */
            resetZoomButton: {
                /**
                 * What frame the button placement should be related to. Can be
                 * either `plotBox` or `spacingBox`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 *
                 * @type      {Highcharts.ButtonRelativeToValue}
                 * @apioption chart.resetZoomButton.relativeTo
                 */
                /**
                 * A collection of attributes for the button. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                 * border radius. The theme also supports `style`, a collection of
                 * CSS properties for the text. Equivalent attributes for the hover
                 * state are given in `theme.states.hover`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                theme: {
                /**
                 * zIndex of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.theme.zIndex
                 */
                },
                /**
                 * The position of the button.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highstock} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 *
                 * @type {Highcharts.AlignObject}
                 */
                position: {
                /**
                 * The horizontal alignment of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.align
                 */
                /**
                 * The horizontal offset of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.x
                 */
                /**
                 * The vertical alignment of the button.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @apioption chart.resetZoomButton.position.verticalAlign
                 */
                /**
                 * The vertical offset of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.y
                 */
                }
            },
            /**
             * The pixel width of the plot area border.
             *
             * @sample {highcharts} highcharts/chart/plotborderwidth/
             *         1px border
             * @sample {highstock} stock/chart/plotborder/
             *         2px border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.plotBorderWidth
             */
            /**
             * Whether to apply a drop shadow to the plot area. Requires that
             * plotBackgroundColor be set. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample {highcharts} highcharts/chart/plotshadow/
             *         Plot shadow
             * @sample {highstock} stock/chart/plotshadow/
             *         Plot shadow
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.plotShadow
             */
            /**
             * When true, cartesian charts like line, spline, area and column are
             * transformed into the polar coordinate system. This produces _polar
             * charts_, also known as _radar charts_.
             *
             * @sample {highcharts} highcharts/demo/polar/
             *         Polar chart
             * @sample {highcharts} highcharts/demo/polar-wind-rose/
             *         Wind rose, stacked polar column chart
             * @sample {highcharts} highcharts/demo/polar-spider/
             *         Spider web chart
             * @sample {highcharts} highcharts/parallel-coordinates/polar/
             *         Star plot, multivariate data in a polar chart
             *
             * @type      {boolean}
             * @default   false
             * @since     2.3.0
             * @product   highcharts
             * @requires  highcharts-more
             * @apioption chart.polar
             */
            /**
             * Whether to reflow the chart to fit the width of the container div
             * on resizing the window.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/reflow-false/
             *         False
             * @sample {highstock} stock/chart/reflow-true/
             *         True by default
             * @sample {highstock} stock/chart/reflow-false/
             *         False
             * @sample {highmaps} maps/chart/reflow-true/
             *         True by default
             * @sample {highmaps} maps/chart/reflow-false/
             *         False
             *
             * @since     2.1
             */
            reflow: true,
            /**
             * The HTML element where the chart will be rendered. If it is a string,
             * the element by that id is used. The HTML element can also be passed
             * by direct reference, or as the first argument of the chart
             * constructor, in which case the option is not needed.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         String
             * @sample {highcharts} highcharts/chart/renderto-object/
             *         Object reference
             * @sample {highstock} stock/chart/renderto-string/
             *         String
             * @sample {highstock} stock/chart/renderto-object/
             *         Object reference
             *
             * @type      {string|Highcharts.HTMLDOMElement}
             * @apioption chart.renderTo
             */
            /**
             * The background color of the marker square when selecting (zooming
             * in on) an area of the chart.
             *
             * @see In styled mode, the selection marker fill is set with the
             *      `.highcharts-selection-marker` class.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   rgba(51,92,173,0.25)
             * @since     2.1.7
             * @apioption chart.selectionMarkerFill
             */
            /**
             * Whether to apply a drop shadow to the global series group. This causes
             * all the series to have the same shadow. Contrary to the `series.shadow`
             * option, this prevents items from casting shadows on each other, like for
             * others series in a stack. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample highcharts/chart/seriesgroupshadow/ Shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to apply a drop shadow to the outer chart area. Requires
             * that backgroundColor be set. The shadow can be an object
             * configuration containing `color`, `offsetX`, `offsetY`, `opacity` and
             * `width`.
             *
             * @sample {highcharts} highcharts/chart/shadow/
             *         Shadow
             * @sample {highstock} stock/chart/shadow/
             *         Shadow
             * @sample {highmaps} maps/chart/border/
             *         Chart border and shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to show the axes initially. This only applies to empty charts
             * where series are added dynamically, as axes are automatically added
             * to cartesian series.
             *
             * @sample {highcharts} highcharts/chart/showaxes-false/
             *         False by default
             * @sample {highcharts} highcharts/chart/showaxes-true/
             *         True
             *
             * @type      {boolean}
             * @since     1.2.5
             * @product   highcharts gantt
             * @apioption chart.showAxes
             */
            /**
             * The space between the bottom edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highstock} stock/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   15
             * @since     2.1
             * @apioption chart.spacingBottom
             */
            /**
             * The space between the left edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highstock} stock/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingLeft
             */
            /**
             * The space between the right edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingright-100/
             *         Spacing set to 100
             * @sample {highcharts} highcharts/chart/spacingright-legend/
             *         Legend in right position with default spacing
             * @sample {highstock} stock/chart/spacingright/
             *         Spacing set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingRight
             */
            /**
             * The space between the top edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingtop-100/
             *         A top spacing of 100
             * @sample {highcharts} highcharts/chart/spacingtop-10/
             *         Floating chart title makes the plot area align to the default
             *         spacingTop of 10.
             * @sample {highstock} stock/chart/spacingtop/
             *         A top spacing of 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingTop
             */
            /**
             * Additional CSS styles to apply inline to the container `div` and the root
             * SVG.
             *
             * Since v11, the root font size is 1rem by default, and all child element
             * are given a relative `em` font size by default. This allows implementers
             * to control all the chart's font sizes by only setting the root level.
             *
             * @see    In styled mode, general chart styles can be set with the
             *         `.highcharts-root` class.
             * @sample {highcharts} highcharts/chart/style-serif-font/
             *         Using a serif type font
             * @sample {highcharts} highcharts/members/relative-font-size/
             *         Relative font sizes
             * @sample {highcharts} highcharts/css/em/
             *         Styled mode with relative font sizes
             * @sample {highstock} stock/chart/style/
             *         Using a serif type font
             * @sample {highmaps} maps/chart/style-serif-font/
             *         Using a serif type font
             *
             * @type      {Highcharts.CSSObject}
             * @default   {"fontFamily": Helvetica, Arial, sans-serif","fontSize":"1rem"}
             * @apioption chart.style
             */
            /**
             * The default series type for the chart. Can be any of the chart types
             * listed under [plotOptions](#plotOptions) and [series](#series) or can
             * be a series provided by an additional module.
             *
             * In TypeScript this option has no effect in sense of typing and
             * instead the `type` option must always be set in the series.
             *
             * @sample {highcharts} highcharts/chart/type-bar/
             *         Bar
             * @sample {highstock} stock/chart/type/
             *         Areaspline
             * @sample {highmaps} maps/chart/type-mapline/
             *         Mapline
             *
             * @type       {string}
             * @default    {highcharts} line
             * @default    {highstock} line
             * @default    {highmaps} map
             * @since      2.1.0
             * @apioption  chart.type
             */
            type: 'line',
            /**
             * Decides in what dimensions the user can zoom by dragging the mouse.
             * Can be one of `x`, `y` or `xy`.
             *
             * @see [panKey](#chart.panKey)
             *
             * @sample {highcharts} highcharts/chart/zoomtype-none/
             *         None by default
             * @sample {highcharts} highcharts/chart/zoomtype-x/
             *         X
             * @sample {highcharts} highcharts/chart/zoomtype-y/
             *         Y
             * @sample {highcharts} highcharts/chart/zoomtype-xy/
             *         Xy
             * @sample {highcharts} highcharts/chart/zoomtype-polar/
             *         Zoom on polar chart
             * @sample {highstock} stock/demo/basic-line/
             *         None by default
             * @sample {highstock} stock/chart/zoomtype-x/
             *         X
             * @sample {highstock} stock/chart/zoomtype-y/
             *         Y
             * @sample {highstock} stock/chart/zoomtype-xy/
             *         Xy
             * @sample {highmaps} maps/chart/zoomtype-xy/
             *         Map with selection zoom
             *
             * @type       {string}
             * @validvalue ["x", "y", "xy"]
             * @deprecated
             * @apioption  chart.zoomType
             */
            /**
             * Enables zooming by a single touch, in combination with
             * [chart.zoomType](#chart.zoomType). When enabled, two-finger pinch
             * will still work as set up by [chart.pinchType](#chart.pinchType).
             * However, `zoomBySingleTouch` will interfere with touch-dragging the
             * chart to read the tooltip. And especially when vertical zooming is
             * enabled, it will make it hard to scroll vertically on the page.
             * @since      9.0.0
             * @sample     highcharts/chart/zoombysingletouch
             *             Zoom by single touch enabled, with buttons to toggle
             * @product    highcharts highstock gantt
             * @deprecated
             */
            /**
             * Chart zooming options.
             * @since 10.2.1
             */
            zooming: {
                /**
                 * Equivalent to [type](#chart.zooming.type), but for multitouch
                 * gestures only. By default, the `pinchType` is the same as the
                 * `type` setting. However, pinching can be enabled separately in
                 * some cases, for example in stock charts where a mouse drag pans the
                 * chart, while pinching is enabled. When [tooltip.followTouchMove](
                 * #tooltip.followTouchMove) is true, pinchType only applies to
                 * two-finger touches.
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @default    {highstock} x
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.pinchType
                 */
                /**
                 * Decides in what dimensions the user can zoom by dragging the mouse.
                 * Can be one of `x`, `y` or `xy`.
                 *
                 * @declare    Highcharts.OptionsChartZoomingTypeValue
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.type
                 */
                /**
                 * Set a key to hold when dragging to zoom the chart. This is useful to
                 * avoid zooming while moving points. Should be set different than
                 * [chart.panKey](#chart.panKey).
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @validvalue ["alt", "ctrl", "meta", "shift"]
                 * @requires   modules/draggable-points
                 * @apioption  chart.zooming.key
                 */
                /**
                 * Enables zooming by a single touch, in combination with
                 * [chart.zooming.type](#chart.zooming.type). When enabled, two-finger
                 * pinch will still work as set up by [chart.zooming.pinchType]
                 * (#chart.zooming.pinchType). However, `singleTouch` will interfere
                 * with touch-dragging the chart to read the tooltip. And especially
                 * when vertical zooming is enabled, it will make it hard to scroll
                 * vertically on the page.
                 *
                 * @sample  highcharts/chart/zoombysingletouch
                 *          Zoom by single touch enabled, with buttons to toggle
                 *
                 * @product highcharts highstock gantt
                 */
                singleTouch: false,
                /**
                 * The button that appears after a selection zoom, allowing the user
                 * to reset zoom.
                 */
                resetButton: {
                    /**
                     * What frame the button placement should be related to. Can be
                     * either `plotBox` or `spacingBox`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     *
                     * @type      {Highcharts.ButtonRelativeToValue}
                     * @default   plot
                     * @apioption chart.zooming.resetButton.relativeTo
                     */
                    /**
                     * A collection of attributes for the button. The object takes SVG
                     * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                     * border radius. The theme also supports `style`, a collection of
                     * CSS properties for the text. Equivalent attributes for the hover
                     * state are given in `theme.states.hover`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     *
                     * @type  {Highcharts.SVGAttributes}
                     * @since 10.2.1
                     */
                    theme: {
                        /** @internal */
                        zIndex: 6
                    },
                    /**
                     * The position of the button.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highstock} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     *
                     * @type  {Highcharts.AlignObject}
                     * @since 10.2.1
                     */
                    position: {
                        /**
                         * The horizontal alignment of the button.
                         */
                        align: 'right',
                        /**
                         * The horizontal offset of the button.
                         */
                        x: -10,
                        /**
                         * The vertical alignment of the button.
                         *
                         * @type       {Highcharts.VerticalAlignValue}
                         * @default    top
                         * @apioption  chart.zooming.resetButton.position.verticalAlign
                         */
                        /**
                         * The vertical offset of the button.
                         */
                        y: 10
                    }
                }
            },
            /**
             * An explicit width for the chart. By default (when `null`) the width
             * is calculated from the offset width of the containing element.
             *
             * @sample {highcharts} highcharts/chart/width/
             *         800px wide
             * @sample {highstock} stock/chart/width/
             *         800px wide
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             *
             * @type {null|number|string}
             */
            width: null,
            /**
             * An explicit height for the chart. If a _number_, the height is
             * given in pixels. If given a _percentage string_ (for example
             * `'56%'`), the height is given as the percentage of the actual chart
             * width. This allows for preserving the aspect ratio across responsive
             * sizes.
             *
             * By default (when `null`) the height is calculated from the offset
             * height of the containing element, or 400 pixels if the containing
             * element's height is 0.
             *
             * @sample {highcharts} highcharts/chart/height/
             *         500px height
             * @sample {highstock} stock/chart/height/
             *         300px height
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             * @sample highcharts/chart/height-percent/
             *         Highcharts with percentage height
             *
             * @type {null|number|string}
             */
            height: null,
            /**
             * The color of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/bordercolor/
             *         Brown border
             * @sample {highstock} stock/chart/border/
             *         Brown border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            borderColor: "#334eff" /* Palette.highlightColor80 */,
            /**
             * The pixel width of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/borderwidth/
             *         5px border
             * @sample {highstock} stock/chart/border/
             *         2px border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.borderWidth
             */
            /**
             * The background color or gradient for the outer chart area.
             *
             * @see In styled mode, the background is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/backgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/backgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/backgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/backgroundcolor-gradient/
             *         Gradient
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            backgroundColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * The background color or gradient for the plot area.
             *
             * @see In styled mode, the plot background is set with the
             *      `.highcharts-plot-background` class.
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
             *         Gradient
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption chart.plotBackgroundColor
             */
            /**
             * The URL for an image to use as the plot background. To set an image
             * as the background for the entire chart, set a CSS background image
             * to the container element. Note that for the image to be applied to
             * exported charts, its URL needs to be accessible by the export server.
             *
             * @see In styled mode, a plot background image can be set with the
             *      `.highcharts-plot-background` class and a [custom pattern](
             *      https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns).
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundimage/
             *         Skies
             * @sample {highstock} stock/chart/plotbackgroundimage/
             *         Skies
             *
             * @type      {string}
             * @apioption chart.plotBackgroundImage
             */
            /**
             * The color of the inner chart or plot area border.
             *
             * @see In styled mode, a plot border stroke can be set with the
             *      `.highcharts-plot-border` class.
             *
             * @sample {highcharts} highcharts/chart/plotbordercolor/
             *         Blue border
             * @sample {highstock} stock/chart/plotborder/
             *         Blue border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            plotBorderColor: "#cccccc" /* Palette.neutralColor20 */
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ChartDefaults;
    });
    _registerModule(_modules, 'Core/Color/Palettes.js', [], function () {
        /**
         * Series palettes for Highcharts. Series colors are defined in highcharts.css.
         * **Do not edit this file!** This file is generated using the 'gulp palette' task.
         */
        const SeriesPalettes = {
            /**
             * Colors for data series and points
             */
            colors: [
                '#2caffe',
                '#544fc5',
                '#00e272',
                '#fe6a35',
                '#6b8abc',
                '#d568fb',
                '#2ee0ca',
                '#fa4b42',
                '#feb56a',
                '#91e8e1'
            ]
        };

        return SeriesPalettes;
    });
    _registerModule(_modules, 'Core/Time.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { win } = H;
        const { defined, error, extend, isObject, merge, objectEach, pad, pick, splat, timeUnits } = U;
        /* *
         *
         *  Constants
         *
         * */
        const hasNewSafariBug = H.isSafari &&
            win.Intl &&
            win.Intl.DateTimeFormat.prototype.formatRange;
        // To do: Remove this when we no longer need support for Safari < v14.1
        const hasOldSafariBug = H.isSafari &&
            win.Intl &&
            !win.Intl.DateTimeFormat.prototype.formatRange;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Time class. Time settings are applied in general for each page using
         * `Highcharts.setOptions`, or individually for each Chart item through the
         * [time](https://api.highcharts.com/highcharts/time) options set.
         *
         * The Time object is available from {@link Highcharts.Chart#time},
         * which refers to  `Highcharts.time` if no individual time settings are
         * applied.
         *
         * @example
         * // Apply time settings globally
         * Highcharts.setOptions({
         *     time: {
         *         timezone: 'Europe/London'
         *     }
         * });
         *
         * // Apply time settings by instance
         * let chart = Highcharts.chart('container', {
         *     time: {
         *         timezone: 'America/New_York'
         *     },
         *     series: [{
         *         data: [1, 4, 3, 5]
         *     }]
         * });
         *
         * // Use the Time object
         * console.log(
         *        'Current time in New York',
         *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
         * );
         *
         * @since 6.0.5
         *
         * @class
         * @name Highcharts.Time
         *
         * @param {Highcharts.TimeOptions} [options]
         * Time options as defined in [chart.options.time](/highcharts/time).
         */
        class Time {
            /* *
             *
             *  Constructors
             *
             * */
            constructor(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.options = {};
                this.useUTC = false;
                this.variableTimezone = false;
                this.Date = win.Date;
                /**
                 * Get the time zone offset based on the current timezone information as
                 * set in the global options.
                 *
                 * @function Highcharts.Time#getTimezoneOffset
                 *
                 * @param {number} timestamp
                 *        The JavaScript timestamp to inspect.
                 *
                 * @return {number}
                 *         The timezone offset in minutes compared to UTC.
                 */
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Time units used in `Time.get` and `Time.set`
             *
             * @typedef {"Date"|"Day"|"FullYear"|"Hours"|"Milliseconds"|"Minutes"|"Month"|"Seconds"} Highcharts.TimeUnitValue
             */
            /**
             * Get the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.getXXX / Date.getUTCXXX`, so instead of calling
             * `date.getHours()` or `date.getUTCHours()` we will call
             * `time.get('Hours')`.
             *
             * @function Highcharts.Time#get
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             *
             * @return {number}
             *        The given time unit
             */
            get(unit, date) {
                if (this.variableTimezone || this.timezoneOffset) {
                    const realMs = date.getTime();
                    const ms = realMs - this.getTimezoneOffset(date);
                    date.setTime(ms); // Temporary adjust to timezone
                    const ret = date['getUTC' + unit]();
                    date.setTime(realMs); // Reset
                    return ret;
                }
                // UTC time with no timezone handling
                if (this.useUTC) {
                    return date['getUTC' + unit]();
                }
                // Else, local time
                return date['get' + unit]();
            }
            /**
             * Set the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.setXXX / Date.setUTCXXX`, so instead of calling
             * `date.setHours(0)` or `date.setUTCHours(0)` we will call
             * `time.set('Hours', 0)`.
             *
             * @function Highcharts.Time#set
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             * @param {number} value
             *
             * @return {number}
             *        The epoch milliseconds of the updated date
             */
            set(unit, date, value) {
                // UTC time with timezone handling
                if (this.variableTimezone || this.timezoneOffset) {
                    // For lower order time units, just set it directly using UTC
                    // time
                    if (unit === 'Milliseconds' ||
                        unit === 'Seconds' ||
                        (unit === 'Minutes' &&
                            this.getTimezoneOffset(date) % 3600000 === 0) // #13961
                    ) {
                        return date['setUTC' + unit](value);
                    }
                    // Higher order time units need to take the time zone into
                    // account
                    // Adjust by timezone
                    const offset = this.getTimezoneOffset(date);
                    let ms = date.getTime() - offset;
                    date.setTime(ms);
                    date['setUTC' + unit](value);
                    const newOffset = this.getTimezoneOffset(date);
                    ms = date.getTime() + newOffset;
                    return date.setTime(ms);
                }
                // UTC time with no timezone handling
                if (this.useUTC ||
                    // leap calculation in UTC only
                    (hasNewSafariBug && unit === 'FullYear')) {
                    return date['setUTC' + unit](value);
                }
                // Else, local time
                return date['set' + unit](value);
            }
            /**
             * Update the Time object with current options. It is called internally on
             * initializing Highcharts, after running `Highcharts.setOptions` and on
             * `Chart.update`.
             *
             * @private
             * @function Highcharts.Time#update
             *
             * @param {Highcharts.TimeOptions} [options]
             *
             */
            update(options = {}) {
                const useUTC = pick(options.useUTC, true);
                this.options = options = merge(true, this.options, options);
                // Allow using a different Date class
                this.Date = options.Date || win.Date || Date;
                this.useUTC = useUTC;
                this.timezoneOffset = (useUTC && options.timezoneOffset) || void 0;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                /*
                 * The time object has options allowing for variable time zones, meaning
                 * the axis ticks or series data needs to consider this.
                 */
                this.variableTimezone = useUTC && !!(options.getTimezoneOffset ||
                    options.timezone);
            }
            /**
             * Make a time and returns milliseconds. Interprets the inputs as UTC time,
             * local time or a specific timezone time depending on the current time
             * settings.
             *
             * @function Highcharts.Time#makeTime
             *
             * @param {number} year
             *        The year
             *
             * @param {number} month
             *        The month. Zero-based, so January is 0.
             *
             * @param {number} [date=1]
             *        The day of the month
             *
             * @param {number} [hours=0]
             *        The hour of the day, 0-23.
             *
             * @param {number} [minutes=0]
             *        The minutes
             *
             * @param {number} [seconds=0]
             *        The seconds
             *
             * @return {number}
             *         The time in milliseconds since January 1st 1970.
             */
            makeTime(year, month, date, hours, minutes, seconds) {
                let d, offset, newOffset;
                if (this.useUTC) {
                    d = this.Date.UTC.apply(0, arguments);
                    offset = this.getTimezoneOffset(d);
                    d += offset;
                    newOffset = this.getTimezoneOffset(d);
                    if (offset !== newOffset) {
                        d += newOffset - offset;
                        // A special case for transitioning from summer time to winter time.
                        // When the clock is set back, the same time is repeated twice, i.e.
                        // 02:30 am is repeated since the clock is set back from 3 am to
                        // 2 am. We need to make the same time as local Date does.
                    }
                    else if (offset - 36e5 === this.getTimezoneOffset(d - 36e5) &&
                        !hasOldSafariBug) {
                        d -= 36e5;
                    }
                }
                else {
                    d = new this.Date(year, month, pick(date, 1), pick(hours, 0), pick(minutes, 0), pick(seconds, 0)).getTime();
                }
                return d;
            }
            /**
             * Sets the getTimezoneOffset function. If the `timezone` option is set, a
             * default getTimezoneOffset function with that timezone is returned. If
             * a `getTimezoneOffset` option is defined, it is returned. If neither are
             * specified, the function using the `timezoneOffset` option or 0 offset is
             * returned.
             *
             * @private
             * @function Highcharts.Time#timezoneOffsetFunction
             *
             * @return {Function}
             *         A getTimezoneOffset function
             */
            timezoneOffsetFunction() {
                const time = this, options = this.options, getTimezoneOffset = options.getTimezoneOffset, moment = options.moment || win.moment;
                if (!this.useUTC) {
                    return function (timestamp) {
                        return new Date(timestamp.toString()).getTimezoneOffset() * 60000;
                    };
                }
                if (options.timezone) {
                    if (!moment) {
                        // getTimezoneOffset-function stays undefined because it depends
                        // on Moment.js
                        error(25);
                    }
                    else {
                        return function (timestamp) {
                            return -moment.tz(timestamp, options.timezone).utcOffset() * 60000;
                        };
                    }
                }
                // If not timezone is set, look for the getTimezoneOffset callback
                if (this.useUTC && getTimezoneOffset) {
                    return function (timestamp) {
                        return getTimezoneOffset(timestamp.valueOf()) * 60000;
                    };
                }
                // Last, use the `timezoneOffset` option if set
                return function () {
                    return (time.timezoneOffset || 0) * 60000;
                };
            }
            /**
             * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970)
             * into a human readable date string. The available format keys are listed
             * below. Additional formats can be given in the
             * {@link Highcharts.dateFormats} hook.
             *
             * Supported format keys:
             * - `%a`: Short weekday, like 'Mon'
             * - `%A`: Long weekday, like 'Monday'
             * - `%d`: Two digit day of the month, 01 to 31
             * - `%e`: Day of the month, 1 through 31
             * - `%w`: Day of the week, 0 through 6
             * - `%b`: Short month, like 'Jan'
             * - `%B`: Long month, like 'January'
             * - `%m`: Two digit month number, 01 through 12
             * - `%y`: Two digits year, like 09 for 2009
             * - `%Y`: Four digits year, like 2009
             * - `%H`: Two digits hours in 24h format, 00 through 23
             * - `%k`: Hours in 24h format, 0 through 23
             * - `%I`: Two digits hours in 12h format, 00 through 11
             * - `%l`: Hours in 12h format, 1 through 12
             * - `%M`: Two digits minutes, 00 through 59
             * - `%p`: Upper case AM or PM
             * - `%P`: Lower case AM or PM
             * - `%S`: Two digits seconds, 00 through 59
             * - `%L`: Milliseconds (naming from Ruby)
             *
             * @example
             * const time = new Highcharts.Time();
             * const s = time.dateFormat('%Y-%m-%d %H:%M:%S', Date.UTC(2020, 0, 1));
             * console.log(s); // => 2020-01-01 00:00:00
             *
             * @function Highcharts.Time#dateFormat
             *
             * @param {string} format
             *        The desired format where various time representations are
             *        prefixed with %.
             *
             * @param {number} [timestamp]
             *        The JavaScript timestamp.
             *
             * @param {boolean} [capitalize=false]
             *        Upper case first letter in the return.
             *
             * @return {string}
             *         The formatted date.
             */
            dateFormat(format, timestamp, capitalize) {
                if (!defined(timestamp) || isNaN(timestamp)) {
                    return (H.defaultOptions.lang &&
                        H.defaultOptions.lang.invalidDate ||
                        '');
                }
                format = pick(format, '%Y-%m-%d %H:%M:%S');
                const time = this, date = new this.Date(timestamp), 
                // get the basic time values
                hours = this.get('Hours', date), day = this.get('Day', date), dayOfMonth = this.get('Date', date), month = this.get('Month', date), fullYear = this.get('FullYear', date), lang = H.defaultOptions.lang, langWeekdays = (lang && lang.weekdays), shortWeekdays = (lang && lang.shortWeekdays), 
                // List all format keys. Custom formats can be added from the
                // outside.
                replacements = extend({
                    // Day
                    // Short weekday, like 'Mon'
                    a: shortWeekdays ?
                        shortWeekdays[day] :
                        langWeekdays[day].substr(0, 3),
                    // Long weekday, like 'Monday'
                    A: langWeekdays[day],
                    // Two digit day of the month, 01 to 31
                    d: pad(dayOfMonth),
                    // Day of the month, 1 through 31
                    e: pad(dayOfMonth, 2, ' '),
                    // Day of the week, 0 through 6
                    w: day,
                    // Week (none implemented)
                    // 'W': weekNumber(),
                    // Month
                    // Short month, like 'Jan'
                    b: lang.shortMonths[month],
                    // Long month, like 'January'
                    B: lang.months[month],
                    // Two digit month number, 01 through 12
                    m: pad(month + 1),
                    // Month number, 1 through 12 (#8150)
                    o: month + 1,
                    // Year
                    // Two digits year, like 09 for 2009
                    y: fullYear.toString().substr(2, 2),
                    // Four digits year, like 2009
                    Y: fullYear,
                    // Time
                    // Two digits hours in 24h format, 00 through 23
                    H: pad(hours),
                    // Hours in 24h format, 0 through 23
                    k: hours,
                    // Two digits hours in 12h format, 00 through 11
                    I: pad((hours % 12) || 12),
                    // Hours in 12h format, 1 through 12
                    l: (hours % 12) || 12,
                    // Two digits minutes, 00 through 59
                    M: pad(this.get('Minutes', date)),
                    // Upper case AM or PM
                    p: hours < 12 ? 'AM' : 'PM',
                    // Lower case AM or PM
                    P: hours < 12 ? 'am' : 'pm',
                    // Two digits seconds, 00 through  59
                    S: pad(this.get('Seconds', date)),
                    // Milliseconds (naming from Ruby)
                    L: pad(Math.floor(timestamp % 1000), 3)
                }, H.dateFormats);
                // Do the replaces
                objectEach(replacements, function (val, key) {
                    // Regex would do it in one line, but this is faster
                    while (format.indexOf('%' + key) !== -1) {
                        format = format.replace('%' + key, typeof val === 'function' ? val.call(time, timestamp) : val);
                    }
                });
                // Optionally capitalize the string and return
                return capitalize ?
                    (format.substr(0, 1).toUpperCase() +
                        format.substr(1)) :
                    format;
            }
            /**
             * Resolve legacy formats of dateTimeLabelFormats (strings and arrays) into
             * an object.
             * @private
             * @param {string|Array<T>|Highcharts.Dictionary<T>} f
             * General format description
             * @return {Highcharts.Dictionary<T>}
             * The object definition
             */
            resolveDTLFormat(f) {
                if (!isObject(f, true)) { // check for string or array
                    f = splat(f);
                    return {
                        main: f[0],
                        from: f[1],
                        to: f[2]
                    };
                }
                return f;
            }
            /**
             * Return an array with time positions distributed on round time values
             * right and right after min and max. Used in datetime axes as well as for
             * grouping data on a datetime axis.
             *
             * @function Highcharts.Time#getTimeTicks
             *
             * @param {Highcharts.TimeNormalizedObject} normalizedInterval
             *        The interval in axis values (ms) and the count
             *
             * @param {number} [min]
             *        The minimum in axis values
             *
             * @param {number} [max]
             *        The maximum in axis values
             *
             * @param {number} [startOfWeek=1]
             *
             * @return {Highcharts.AxisTickPositionsArray}
             * Time positions
             */
            getTimeTicks(normalizedInterval, min, max, startOfWeek) {
                const time = this, Date = time.Date, tickPositions = [], higherRanks = {}, 
                // When crossing DST, use the max. Resolves #6278.
                minDate = new Date(min), interval = normalizedInterval.unitRange, count = normalizedInterval.count || 1;
                let i, minYear, // used in months and years as a basis for Date.UTC()
                variableDayLength, minDay;
                startOfWeek = pick(startOfWeek, 1);
                if (defined(min)) { // #1300
                    time.set('Milliseconds', minDate, interval >= timeUnits.second ?
                        0 : // #3935
                        count * Math.floor(time.get('Milliseconds', minDate) / count)); // #3652, #3654
                    if (interval >= timeUnits.second) { // second
                        time.set('Seconds', minDate, interval >= timeUnits.minute ?
                            0 : // #3935
                            count * Math.floor(time.get('Seconds', minDate) / count));
                    }
                    if (interval >= timeUnits.minute) { // minute
                        time.set('Minutes', minDate, interval >= timeUnits.hour ?
                            0 :
                            count * Math.floor(time.get('Minutes', minDate) / count));
                    }
                    if (interval >= timeUnits.hour) { // hour
                        time.set('Hours', minDate, interval >= timeUnits.day ?
                            0 :
                            count * Math.floor(time.get('Hours', minDate) / count));
                    }
                    if (interval >= timeUnits.day) { // day
                        time.set('Date', minDate, interval >= timeUnits.month ?
                            1 :
                            Math.max(1, count * Math.floor(time.get('Date', minDate) / count)));
                    }
                    if (interval >= timeUnits.month) { // month
                        time.set('Month', minDate, interval >= timeUnits.year ? 0 :
                            count * Math.floor(time.get('Month', minDate) / count));
                        minYear = time.get('FullYear', minDate);
                    }
                    if (interval >= timeUnits.year) { // year
                        minYear -= minYear % count;
                        time.set('FullYear', minDate, minYear);
                    }
                    // week is a special case that runs outside the hierarchy
                    if (interval === timeUnits.week) {
                        // get start of current week, independent of count
                        minDay = time.get('Day', minDate);
                        time.set('Date', minDate, (time.get('Date', minDate) -
                            minDay + startOfWeek +
                            // We don't want to skip days that are before
                            // startOfWeek (#7051)
                            (minDay < startOfWeek ? -7 : 0)));
                    }
                    // Get basics for variable time spans
                    minYear = time.get('FullYear', minDate);
                    const minMonth = time.get('Month', minDate), minDateDate = time.get('Date', minDate), minHours = time.get('Hours', minDate);
                    // Redefine min to the floored/rounded minimum time (#7432)
                    min = minDate.getTime();
                    // Handle local timezone offset
                    if ((time.variableTimezone || !time.useUTC) && defined(max)) {
                        // Detect whether we need to take the DST crossover into
                        // consideration. If we're crossing over DST, the day length may
                        // be 23h or 25h and we need to compute the exact clock time for
                        // each tick instead of just adding hours. This comes at a cost,
                        // so first we find out if it is needed (#4951).
                        variableDayLength = (
                        // Long range, assume we're crossing over.
                        max - min > 4 * timeUnits.month ||
                            // Short range, check if min and max are in different time
                            // zones.
                            time.getTimezoneOffset(min) !==
                                time.getTimezoneOffset(max));
                    }
                    // Iterate and add tick positions at appropriate values
                    let t = minDate.getTime();
                    i = 1;
                    while (t < max) {
                        tickPositions.push(t);
                        // if the interval is years, use Date.UTC to increase years
                        if (interval === timeUnits.year) {
                            t = time.makeTime(minYear + i * count, 0);
                            // if the interval is months, use Date.UTC to increase months
                        }
                        else if (interval === timeUnits.month) {
                            t = time.makeTime(minYear, minMonth + i * count);
                            // if we're using global time, the interval is not fixed as it
                            // jumps one hour at the DST crossover
                        }
                        else if (variableDayLength &&
                            (interval === timeUnits.day || interval === timeUnits.week)) {
                            t = time.makeTime(minYear, minMonth, minDateDate +
                                i * count * (interval === timeUnits.day ? 1 : 7));
                        }
                        else if (variableDayLength &&
                            interval === timeUnits.hour &&
                            count > 1) {
                            // make sure higher ranks are preserved across DST (#6797,
                            // #7621)
                            t = time.makeTime(minYear, minMonth, minDateDate, minHours + i * count);
                            // else, the interval is fixed and we use simple addition
                        }
                        else {
                            t += interval * count;
                        }
                        i++;
                    }
                    // push the last time
                    tickPositions.push(t);
                    // Handle higher ranks. Mark new days if the time is on midnight
                    // (#950, #1649, #1760, #3349). Use a reasonable dropout threshold
                    // to prevent looping over dense data grouping (#6156).
                    if (interval <= timeUnits.hour && tickPositions.length < 10000) {
                        tickPositions.forEach(function (t) {
                            if (
                            // Speed optimization, no need to run dateFormat unless
                            // we're on a full or half hour
                            t % 1800000 === 0 &&
                                // Check for local or global midnight
                                time.dateFormat('%H%M%S%L', t) === '000000000') {
                                higherRanks[t] = 'day';
                            }
                        });
                    }
                }
                // record information on the chosen unit - for dynamic label formatter
                tickPositions.info = extend(normalizedInterval, {
                    higherRanks,
                    totalRange: interval * count
                });
                return tickPositions;
            }
            /**
             * Get the optimal date format for a point, based on a range.
             *
             * @private
             * @function Highcharts.Time#getDateFormat
             *
             * @param {number} range
             *        The time range
             *
             * @param {number} timestamp
             *        The timestamp of the date
             *
             * @param {number} startOfWeek
             *        An integer representing the first day of the week, where 0 is
             *        Sunday.
             *
             * @param {Highcharts.Dictionary<string>} dateTimeLabelFormats
             *        A map of time units to formats.
             *
             * @return {string}
             *         The optimal date format for a point.
             */
            getDateFormat(range, timestamp, startOfWeek, dateTimeLabelFormats) {
                const dateStr = this.dateFormat('%m-%d %H:%M:%S.%L', timestamp), blank = '01-01 00:00:00.000', strpos = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                };
                let n = 'millisecond', 
                // for sub-millisecond data, #4223
                lastN = n;
                for (n in timeUnits) { // eslint-disable-line guard-for-in
                    // If the range is exactly one week and we're looking at a
                    // Sunday/Monday, go for the week format
                    if (range === timeUnits.week &&
                        +this.dateFormat('%w', timestamp) === startOfWeek &&
                        dateStr.substr(6) === blank.substr(6)) {
                        n = 'week';
                        break;
                    }
                    // The first format that is too great for the range
                    if (timeUnits[n] > range) {
                        n = lastN;
                        break;
                    }
                    // If the point is placed every day at 23:59, we need to show
                    // the minutes as well. #2637.
                    if (strpos[n] &&
                        dateStr.substr(strpos[n]) !== blank.substr(strpos[n])) {
                        break;
                    }
                    // Weeks are outside the hierarchy, only apply them on
                    // Mondays/Sundays like in the first condition
                    if (n !== 'week') {
                        lastN = n;
                    }
                }
                return this.resolveDTLFormat(dateTimeLabelFormats[n]).main;
            }
        }
        /* *
         *
         * Default export
         *
         * */
        /* *
         *
         * API Declarations
         *
         * */
        /**
         * Normalized interval.
         *
         * @interface Highcharts.TimeNormalizedObject
         */ /**
        * The count.
        *
        * @name Highcharts.TimeNormalizedObject#count
        * @type {number|undefined}
        */ /**
        * The interval in axis values (ms).
        *
        * @name Highcharts.TimeNormalizedObject#unitRange
        * @type {number}
        */
        /**
         * Function of an additional date format specifier.
         *
         * @callback Highcharts.TimeFormatCallbackFunction
         *
         * @param {number} timestamp
         *        The time to format.
         *
         * @return {string}
         *         The formatted portion of the date.
         */
        /**
         * Time ticks.
         *
         * @interface Highcharts.AxisTickPositionsArray
         * @extends global.Array<number>
         */ /**
        * @name Highcharts.AxisTickPositionsArray#info
        * @type {Highcharts.TimeTicksInfoObject|undefined}
        */
        /**
         * A callback to return the time zone offset for a given datetime. It
         * takes the timestamp in terms of milliseconds since January 1 1970,
         * and returns the timezone offset in minutes. This provides a hook
         * for drawing time based charts in specific time zones using their
         * local DST crossover dates, with the help of external libraries.
         *
         * @callback Highcharts.TimezoneOffsetCallbackFunction
         *
         * @param {number} timestamp
         * Timestamp in terms of milliseconds since January 1 1970.
         *
         * @return {number}
         * Timezone offset in minutes.
         */
        /**
         * Allows to manually load the `moment.js` library from Highcharts options
         * instead of the `window`.
         * In case of loading the library from a `script` tag,
         * this option is not needed, it will be loaded from there by default.
         *
         * @type      {Function}
         * @since     8.2.0
         * @apioption time.moment
         */
        ''; // keeps doclets above in JS file

        return Time;
    });
    _registerModule(_modules, 'Core/Defaults.js', [_modules['Core/Chart/ChartDefaults.js'], _modules['Core/Globals.js'], _modules['Core/Color/Palettes.js'], _modules['Core/Time.js'], _modules['Core/Utilities.js']], function (ChartDefaults, H, Palettes, Time, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice, svg } = H;
        const { merge } = U;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Global default settings.
         *
         * @name Highcharts.defaultOptions
         * @type {Highcharts.Options}
         */ /**
        * @optionparent
        * @private
        */
        const defaultOptions = {
            /**
             * An array containing the default colors for the chart's series. When
             * all colors are used, new colors are pulled from the start again.
             *
             * Default colors can also be set on a series or series.type basis,
             * see [column.colors](#plotOptions.column.colors),
             * [pie.colors](#plotOptions.pie.colors).
             *
             * In styled mode, the colors option doesn't exist. Instead, colors
             * are defined in CSS and applied either through series or point class
             * names, or through the [chart.colorCount](#chart.colorCount) option.
             *
             * @sample {highcharts} highcharts/chart/colors/
             *         Assign a global color theme
             * @sample highcharts/members/theme-v10/
             *         Latest release styled like version 10
             *
             * @type    {Array<(Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject)>}
             * @default [
             *     "#2caffe",
             *     "#544fc5",
             *     "#00e272",
             *     "#fe6a35",
             *     "#6b8abc",
             *     "#d568fb",
             *     "#2ee0ca",
             *     "#fa4b42",
             *     "#feb56a",
             *     "#91e8e1"
             * ]
             */
            colors: Palettes.colors,
            /**
             * Styled mode only. Configuration object for adding SVG definitions for
             * reusable elements. See [gradients, shadows and
             * patterns](https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns)
             * for more information and code examples.
             *
             * @type      {*}
             * @since     5.0.0
             * @apioption defs
             */
            /**
             * @ignore-option
             */
            symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
            /**
             * The language object is global and it can't be set on each chart
             * initialization. Instead, use `Highcharts.setOptions` to set it before any
             * chart is initialized.
             *
             * ```js
             * Highcharts.setOptions({
             *     lang: {
             *         months: [
             *             'Janvier', 'Février', 'Mars', 'Avril',
             *             'Mai', 'Juin', 'Juillet', 'Août',
             *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
             *         ],
             *         weekdays: [
             *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
             *             'Jeudi', 'Vendredi', 'Samedi'
             *         ]
             *     }
             * });
             * ```
             */
            lang: {
                /**
                 * The loading text that appears when the chart is set into the loading
                 * state following a call to `chart.showLoading`.
                 */
                loading: 'Loading...',
                /**
                 * An array containing the months names. Corresponds to the `%B` format
                 * in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["January", "February", "March", "April", "May", "June",
                 *          "July", "August", "September", "October", "November",
                 *          "December"]
                 */
                months: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'
                ],
                /**
                 * An array containing the months names in abbreviated form. Corresponds
                 * to the `%b` format in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 *          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                 */
                shortMonths: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                /**
                 * An array containing the weekday names.
                 *
                 * @type    {Array<string>}
                 * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                 *          "Friday", "Saturday"]
                 */
                weekdays: [
                    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday'
                ],
                /**
                 * Short week days, starting Sunday. If not specified, Highcharts uses
                 * the first three letters of the `lang.weekdays` option.
                 *
                 * @sample highcharts/lang/shortweekdays/
                 *         Finnish two-letter abbreviations
                 *
                 * @type      {Array<string>}
                 * @since     4.2.4
                 * @apioption lang.shortWeekdays
                 */
                /**
                 * What to show in a date field for invalid dates. Defaults to an empty
                 * string.
                 *
                 * @type      {string}
                 * @since     4.1.8
                 * @product   highcharts highstock
                 * @apioption lang.invalidDate
                 */
                /**
                 * The title appearing on hovering the zoom in button. The text itself
                 * defaults to "+" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom in
                 * @product   highmaps
                 * @apioption lang.zoomIn
                 */
                /**
                 * The title appearing on hovering the zoom out button. The text itself
                 * defaults to "-" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom out
                 * @product   highmaps
                 * @apioption lang.zoomOut
                 */
                /**
                 * The default decimal point used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments.
                 *
                 * @since 1.2.2
                 */
                decimalPoint: '.',
                /**
                 * [Metric prefixes](https://en.wikipedia.org/wiki/Metric_prefix) used
                 * to shorten high numbers in axis labels. Replacing any of the
                 * positions with `null` causes the full number to be written. Setting
                 * `numericSymbols` to `null` disables shortening altogether.
                 *
                 * @sample {highcharts} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 * @sample {highstock} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 *
                 * @type    {Array<string>}
                 * @default ["k", "M", "G", "T", "P", "E"]
                 * @since   2.3.0
                 */
                numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
                /**
                 * The magnitude of [numericSymbols](#lang.numericSymbol) replacements.
                 * Use 10000 for Japanese, Korean and various Chinese locales, which
                 * use symbols for 10^4, 10^8 and 10^12.
                 *
                 * @sample highcharts/lang/numericsymbolmagnitude/
                 *         10000 magnitude for Japanese
                 *
                 * @type      {number}
                 * @default   1000
                 * @since     5.0.3
                 * @apioption lang.numericSymbolMagnitude
                 */
                /**
                 * The text for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoom: 'Reset zoom',
                /**
                 * The tooltip title for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoomTitle: 'Reset zoom level 1:1',
                /**
                 * The default thousands separator used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments. Defaults
                 * to a single space character, which is recommended in
                 * [ISO 31-0](https://en.wikipedia.org/wiki/ISO_31-0#Numbers) and works
                 * across Anglo-American and continental European languages.
                 *
                 * @default \u0020
                 * @since   1.2.2
                 */
                thousandsSep: ' '
            },
            /**
             * Global options that don't apply to each chart. These options, like
             * the `lang` options, must be set using the `Highcharts.setOptions`
             * method.
             *
             * ```js
             * Highcharts.setOptions({
             *     global: {
             *         useUTC: false
             *     }
             * });
             * ```
             */
            /**
             * _Canvg rendering for Android 2.x is removed as of Highcharts 5.0\.
             * Use the [libURL](#exporting.libURL) option to configure exporting._
             *
             * The URL to the additional file to lazy load for Android 2.x devices.
             * These devices don't support SVG, so we download a helper file that
             * contains [canvg](https://github.com/canvg/canvg), its dependency
             * rbcolor, and our own CanVG Renderer class. To avoid hotlinking to
             * our site, you can install canvas-tools.js on your own server and
             * change this option accordingly.
             *
             * @deprecated
             *
             * @type      {string}
             * @default   https://code.highcharts.com/{version}/modules/canvas-tools.js
             * @product   highcharts highmaps
             * @apioption global.canvasToolsURL
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.useUTC](#time.useUTC) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {boolean}
             * @apioption global.useUTC
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.Date](#time.Date) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.Date
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.getTimezoneOffset](#time.getTimezoneOffset) that supports
             * individual time settings per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.getTimezoneOffset
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezone](#time.timezone) that supports individual time
             * settings per chart.
             *
             * @deprecated
             *
             * @type      {string}
             * @product   highcharts highstock
             * @apioption global.timezone
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezoneOffset](#time.timezoneOffset) that supports individual
             * time settings per chart.
             *
             * @deprecated
             *
             * @type      {number}
             * @product   highcharts highstock
             * @apioption global.timezoneOffset
             */
            global: {},
            /**
             * Time options that can apply globally or to individual charts. These
             * settings affect how `datetime` axes are laid out, how tooltips are
             * formatted, how series
             * [pointIntervalUnit](#plotOptions.series.pointIntervalUnit) works and how
             * the Highcharts Stock range selector handles time.
             *
             * The common use case is that all charts in the same Highcharts object
             * share the same time settings, in which case the global settings are set
             * using `setOptions`.
             *
             * ```js
             * // Apply time settings globally
             * Highcharts.setOptions({
             *     time: {
             *         timezone: 'Europe/London'
             *     }
             * });
             * // Apply time settings by instance
             * let chart = Highcharts.chart('container', {
             *     time: {
             *         timezone: 'America/New_York'
             *     },
             *     series: [{
             *         data: [1, 4, 3, 5]
             *     }]
             * });
             *
             * // Use the Time object
             * console.log(
             *        'Current time in New York',
             *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
             * );
             * ```
             *
             * Since v6.0.5, the time options were moved from the `global` obect to the
             * `time` object, and time options can be set on each individual chart.
             *
             * @sample {highcharts|highstock}
             *         highcharts/time/timezone/
             *         Set the timezone globally
             * @sample {highcharts}
             *         highcharts/time/individual/
             *         Set the timezone per chart instance
             * @sample {highstock}
             *         stock/time/individual/
             *         Set the timezone per chart instance
             *
             * @since     6.0.5
             * @optionparent time
             */
            time: {
                /**
                 * A custom `Date` class for advanced date handling. For example,
                 * [JDate](https://github.com/tahajahangir/jdate) can be hooked in to
                 * handle Jalali dates.
                 *
                 * @type      {*}
                 * @since     4.0.4
                 * @product   highcharts highstock gantt
                 */
                Date: void 0,
                /**
                 * A callback to return the time zone offset for a given datetime. It
                 * takes the timestamp in terms of milliseconds since January 1 1970,
                 * and returns the timezone offset in minutes. This provides a hook
                 * for drawing time based charts in specific time zones using their
                 * local DST crossover dates, with the help of external libraries.
                 *
                 * @see [global.timezoneOffset](#global.timezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/gettimezoneoffset/
                 *         Use moment.js to draw Oslo time regardless of browser locale
                 *
                 * @type      {Highcharts.TimezoneOffsetCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 */
                getTimezoneOffset: void 0,
                /**
                 * Requires [moment.js](https://momentjs.com/). If the timezone option
                 * is specified, it creates a default
                 * [getTimezoneOffset](#time.getTimezoneOffset) function that looks
                 * up the specified timezone in moment.js. If moment.js is not included,
                 * this throws a Highcharts error in the console, but does not crash the
                 * chart.
                 *
                 * @see [getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezone/
                 *         Europe/Oslo
                 *
                 * @type      {string}
                 * @since     5.0.7
                 * @product   highcharts highstock gantt
                 */
                timezone: void 0,
                /**
                 * The timezone offset in minutes. Positive values are west, negative
                 * values are east of UTC, as in the ECMAScript
                 * [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
                 * method. Use this to display UTC based data in a predefined time zone.
                 *
                 * @see [time.getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezoneoffset/
                 *         Timezone offset
                 *
                 * @since     3.0.8
                 * @product   highcharts highstock gantt
                 */
                timezoneOffset: 0,
                /**
                 * Whether to use UTC time for axis scaling, tickmark placement and
                 * time display in `Highcharts.dateFormat`. Advantages of using UTC
                 * is that the time displays equally regardless of the user agent's
                 * time zone settings. Local time can be used when the data is loaded
                 * in real time or when correct Daylight Saving Time transitions are
                 * required.
                 *
                 * @sample {highcharts} highcharts/time/useutc-true/
                 *         True by default
                 * @sample {highcharts} highcharts/time/useutc-false/
                 *         False
                 */
                useUTC: true
            },
            chart: ChartDefaults,
            /**
             * The chart's main title.
             *
             * @sample {highmaps} maps/title/title/
             *         Title options demonstrated
             */
            title: {
                /**
                 * When the title is floating, the plot area will not move to make space
                 * for it.
                 *
                 * @sample {highcharts} highcharts/chart/zoomtype-none/
                 *         False by default
                 * @sample {highcharts} highcharts/title/floating/
                 *         True - title on top of the plot area
                 * @sample {highstock} stock/chart/title-floating/
                 *         True - title on top of the plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption title.floating
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption title.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When a value is given, the title behaves
                 * as if [floating](#title.floating) were `true`.
                 *
                 * @sample {highcharts} highcharts/title/verticalalign/
                 *         Chart title in bottom right corner
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption title.verticalAlign
                 */
                /**
                 * The x position of the title relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption title.x
                 */
                /**
                 * The y position of the title relative to the alignment within
                 * [chart.spacingTop](#chart.spacingTop) and [chart.spacingBottom](
                 * #chart.spacingBottom). By default it depends on the font size.
                 *
                 * @sample {highcharts} highcharts/title/y/
                 *         Title inside the plot area
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption title.y
                 */
                /**
                 * CSS styles for the title. Use this for font styling, but use `align`,
                 * `x` and `y` for text alignment.
                 *
                 * In styled mode, the title style is given in the `.highcharts-title`
                 * class.
                 *
                 * @sample {highcharts} highcharts/title/style/
                 *         Custom color and weight
                 * @sample {highstock} stock/chart/title-style/
                 *         Custom color and weight
                 * @sample highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {highcharts|highmaps} { "color": "#333333", "fontSize": "18px" }
                 * @default   {highstock} { "color": "#333333", "fontSize": "16px" }
                 */
                style: {
                    color: "#333333" /* Palette.neutralColor80 */,
                    fontWeight: 'bold'
                },
                /**
                 * The title of the chart. To disable the title, set the `text` to
                 * `undefined`.
                 *
                 * @sample {highcharts} highcharts/title/text/
                 *         Custom title
                 * @sample {highstock} stock/chart/title-text/
                 *         Custom title
                 *
                 * @default {highcharts|highmaps} Chart title
                 * @default {highstock} undefined
                 */
                text: 'Chart title',
                /**
                 * The horizontal alignment of the title. Can be one of "left", "center"
                 * and "right".
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * The margin between the title and the plot area, or if a subtitle
                 * is present, the margin between the subtitle and the plot area.
                 *
                 * @sample {highcharts} highcharts/title/margin-50/
                 *         A chart title margin of 50
                 * @sample {highcharts} highcharts/title/margin-subtitle/
                 *         The same margin applied with a subtitle
                 * @sample {highstock} stock/chart/title-margin/
                 *         A chart title margin of 50
                 *
                 * @since 2.1
                 */
                margin: 15,
                /**
                 * Adjustment made to the title width, normally to reserve space for
                 * the exporting burger menu.
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's subtitle. This can be used both to display a subtitle below
             * the main title, and to display random text anywhere in the chart. The
             * subtitle can be updated after chart initialization through the
             * `Chart.setTitle` method.
             *
             * @sample {highmaps} maps/title/subtitle/
             *         Subtitle options demonstrated
             */
            subtitle: {
                /**
                 * When the subtitle is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @sample {highcharts} highcharts/subtitle/floating/
                 *         Floating title and subtitle
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote floating at bottom right of plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption subtitle.floating
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 * @apioption subtitle.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption subtitle.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the subtitle behaves as
                 * floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption subtitle.verticalAlign
                 */
                /**
                 * The x position of the subtitle relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption subtitle.x
                 */
                /**
                 * The y position of the subtitle relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`. By default the subtitle
                 * is laid out below the title unless the title is floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption subtitle.y
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The subtitle of the chart.
                 *
                 * @sample {highcharts|highstock} highcharts/subtitle/text/
                 *         Custom subtitle
                 * @sample {highcharts|highstock} highcharts/subtitle/text-formatted/
                 *         Formatted and linked text.
                 */
                text: '',
                /**
                 * The horizontal alignment of the subtitle. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at bottom right of plot area
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * Adjustment made to the subtitle width, normally to reserve space
                 * for the exporting burger menu.
                 *
                 * @see [title.widthAdjust](#title.widthAdjust)
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's caption, which will render below the chart and will be part
             * of exported charts. The caption can be updated after chart initialization
             * through the `Chart.update` or `Chart.caption.update` methods.
             *
             * @sample highcharts/caption/text/
             *         A chart with a caption
             * @since  7.2.0
             */
            caption: {
                /**
                 * When the caption is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.floating
                 */
                /**
                 * The margin between the caption and the plot area.
                 */
                margin: 15,
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.useHTML
                 */
                /**
                 * The x position of the caption relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption caption.x
                 */
                /**
                 * The y position of the caption relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`.
                 *
                 * @type      {number}
                 * @apioption caption.y
                 */
                /**
                 * CSS styles for the caption.
                 *
                 * In styled mode, the caption style is given in the
                 * `.highcharts-caption` class.
                 *
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The caption text of the chart.
                 *
                 * @sample {highcharts} highcharts/caption/text/
                 *         Custom caption
                 */
                text: '',
                /**
                 * The horizontal alignment of the caption. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @type  {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * The vertical alignment of the caption. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the caption behaves as
                 * floating.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'bottom'
            },
            /**
             * The plotOptions is a wrapper object for config objects for each series
             * type. The config objects for each series can also be overridden for
             * each series item as given in the series array.
             *
             * Configuration options for the series are given in three levels. Options
             * for all series in a chart are given in the [plotOptions.series](
             * #plotOptions.series) object. Then options for all series of a specific
             * type are given in the plotOptions of that type, for example
             * `plotOptions.line`. Next, options for one single series are given in
             * [the series array](#series).
             */
            plotOptions: {},
            /**
             * The legend is a box containing a symbol and name for each series
             * item or point item in the chart. Each series (or points in case
             * of pie charts) is represented by a symbol and its name in the legend.
             *
             * It is possible to override the symbol creator function and create
             * [custom legend symbols](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/studies/legend-custom-symbol/).
             *
             * @productdesc {highmaps}
             * A Highmaps legend by default contains one legend item per series, but if
             * a `colorAxis` is defined, the axis will be displayed in the legend.
             * Either as a gradient, or as multiple legend items for `dataClasses`.
             */
            legend: {
                /**
                 * The background color of the legend.
                 *
                 * @see In styled mode, the legend background fill can be applied with
                 *      the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/backgroundcolor/
                 *         Yellowish background
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption legend.backgroundColor
                 */
                /**
                 * The width of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke width can be applied
                 *      with the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/borderwidth/
                 *         2px border width
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption legend.borderWidth
                 */
                /**
                 * Enable or disable the legend. There is also a series-specific option,
                 * [showInLegend](#plotOptions.series.showInLegend), that can hide the
                 * series from the legend. In some series types this is `false` by
                 * default, so it must set to `true` in order to show the legend for the
                 * series.
                 *
                 * @sample {highcharts} highcharts/legend/enabled-false/ Legend disabled
                 * @sample {highstock} stock/legend/align/ Various legend options
                 * @sample {highmaps} maps/legend/enabled-false/ Legend disabled
                 *
                 * @default {highstock} false
                 * @default {highmaps} true
                 * @default {gantt} false
                 */
                enabled: true,
                /**
                 * The horizontal alignment of the legend box within the chart area.
                 * Valid values are `left`, `center` and `right`.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * @sample {highcharts} highcharts/legend/align/
                 *         Legend at the right of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * If the [layout](legend.layout) is `horizontal` and the legend items
                 * span over two lines or more, whether to align the items into vertical
                 * columns. Setting this to `false` makes room for more items, but will
                 * look more messy.
                 *
                 * @since 6.1.0
                 */
                alignColumns: true,
                /**
                 * A CSS class name to apply to the legend group.
                 */
                className: 'highcharts-no-tooltip',
                /**
                 * When the legend is floating, the plot area ignores it and is allowed
                 * to be placed below it.
                 *
                 * @sample {highcharts} highcharts/legend/floating-false/
                 *         False by default
                 * @sample {highcharts} highcharts/legend/floating-true/
                 *         True
                 * @sample {highmaps} maps/legend/alignment/
                 *         Floating legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption legend.floating
                 */
                /**
                 * The layout of the legend items. Can be one of `horizontal` or
                 * `vertical` or `proximate`. When `proximate`, the legend items will be
                 * placed as close as possible to the graphs they're representing,
                 * except in inverted charts or when the legend position doesn't allow
                 * it.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highcharts} highcharts/legend/layout-vertical/
                 *         Vertical
                 * @sample highcharts/legend/layout-proximate
                 *         Labels proximate to the data
                 * @sample {highstock} stock/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Vertical with data classes
                 * @sample {highmaps} maps/legend/layout-vertical/
                 *         Vertical with color axis gradient
                 *
                 * @validvalue ["horizontal", "vertical", "proximate"]
                 */
                layout: 'horizontal',
                /**
                 * In a legend with horizontal layout, the itemDistance defines the
                 * pixel distance between each item.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 * @sample {highstock} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 *
                 * @type      {number}
                 * @default   {highcharts} 20
                 * @default   {highstock} 20
                 * @default   {highmaps} 8
                 * @since     3.0.3
                 * @apioption legend.itemDistance
                 */
                /**
                 * The pixel bottom margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginBottom: 2,
                /**
                 * The pixel top margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginTop: 2,
                /**
                 * The width for each legend item. By default the items are laid out
                 * successively. In a [horizontal layout](legend.layout), if the items
                 * are laid out across two rows or more, they will be vertically aligned
                 * depending on the [legend.alignColumns](legend.alignColumns) option.
                 *
                 * @sample {highcharts} highcharts/legend/itemwidth-default/
                 *         Undefined by default
                 * @sample {highcharts} highcharts/legend/itemwidth-80/
                 *         80 for aligned legend items
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption legend.itemWidth
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for each legend label. Available variables relates to properties on
                 * the series, or the point in case of pies.
                 *
                 * @type      {string}
                 * @default   {name}
                 * @since     1.3
                 * @apioption legend.labelFormat
                 */
                /* eslint-disable valid-jsdoc */
                /**
                 * Callback function to format each of the series' labels. The `this`
                 * keyword refers to the series object, or the point object in case of
                 * pie charts. By default the series or point name is printed.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps the context can also be a data class in case of a
                 * `colorAxis`.
                 *
                 * @sample {highcharts} highcharts/legend/labelformatter/
                 *         Add text
                 * @sample {highmaps} maps/legend/labelformatter/
                 *         Data classes with label formatter
                 *
                 * @type {Highcharts.FormatterCallbackFunction<Point|Series>}
                 */
                labelFormatter: function () {
                    /** eslint-enable valid-jsdoc */
                    return this.name;
                },
                /**
                 * Line height for the legend items. Deprecated as of 2.1\. Instead,
                 * the line height for each item can be set using
                 * `itemStyle.lineHeight`, and the padding between items using
                 * `itemMarginTop` and `itemMarginBottom`.
                 *
                 * @sample {highcharts} highcharts/legend/lineheight/
                 *         Setting padding
                 *
                 * @deprecated
                 *
                 * @type      {number}
                 * @default   16
                 * @since     2.0
                 * @product   highcharts gantt
                 * @apioption legend.lineHeight
                 */
                /**
                 * If the plot area sized is calculated automatically and the legend is
                 * not floating, the legend margin is the space between the legend and
                 * the axis labels or plot area.
                 *
                 * @sample {highcharts} highcharts/legend/margin-default/
                 *         12 pixels by default
                 * @sample {highcharts} highcharts/legend/margin-30/
                 *         30 pixels
                 *
                 * @type      {number}
                 * @default   12
                 * @since     2.1
                 * @apioption legend.margin
                 */
                /**
                 * Maximum pixel height for the legend. When the maximum height is
                 * extended, navigation will show.
                 *
                 * @type      {number}
                 * @since     2.3.0
                 * @apioption legend.maxHeight
                 */
                /**
                 * The color of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke can be applied with the
                 *      `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/bordercolor/
                 *         Brown border
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */,
                /**
                 * The border corner radius of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/borderradius-default/
                 *         Square by default
                 * @sample {highcharts} highcharts/legend/borderradius-round/
                 *         5px rounded
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 */
                borderRadius: 0,
                /**
                 * Options for the paging or navigation appearing when the legend is
                 * overflown. Navigation works well on screen, but not in static
                 * exported images. One way of working around that is to
                 * [increase the chart height in
                 * export](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/legend/navigation-enabled-false/).
                 *
                 * @sample highcharts/legend/scrollable-vertical/
                 *         Legend with vertical scrollable extension
                 * @sample highcharts/legend/scrollable-horizontal/
                 *         Legend with horizontal scrollable extension
                 *
                 */
                navigation: {
                    /**
                     * How to animate the pages when navigating up or down. A value of
                     * `true` applies the default navigation given in the
                     * `chart.animation` option. Additional options can be given as an
                     * object containing values for easing and duration.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     * @default   true
                     * @since     2.2.4
                     * @apioption legend.navigation.animation
                     */
                    /**
                     * The pixel size of the up and down arrows in the legend paging
                     * navigation.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {number}
                     * @default   12
                     * @since     2.2.4
                     * @apioption legend.navigation.arrowSize
                     */
                    /**
                     * Whether to enable the legend navigation. In most cases, disabling
                     * the navigation results in an unwanted overflow.
                     *
                     * See also the
                     * [adapt chart to legend](https://github.com/highcharts/adapt-chart-to-legend)
                     * plugin for a solution to extend the chart height to make room for
                     * the legend, optionally in exported charts only.
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     4.2.4
                     * @apioption legend.navigation.enabled
                     */
                    /**
                     * Text styles for the legend page navigation.
                     *
                     * @see In styled mode, the navigation items are styled with the
                     *      `.highcharts-legend-navigation` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {Highcharts.CSSObject}
                     * @since     2.2.4
                     * @apioption legend.navigation.style
                     */
                    style: {
                        fontSize: '0.8em'
                    },
                    /**
                     * The color for the active up or down arrow in the legend page
                     * navigation.
                     *
                     * @see In styled mode, the active arrow be styled with the
                     *      `.highcharts-legend-nav-active` class.
                     *
                     * @sample  {highcharts} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     * @sample  {highstock} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    activeColor: "#0022ff" /* Palette.highlightColor100 */,
                    /**
                     * The color of the inactive up or down arrow in the legend page
                     * navigation. .
                     *
                     * @see In styled mode, the inactive arrow be styled with the
                     *      `.highcharts-legend-nav-inactive` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    inactiveColor: "#cccccc" /* Palette.neutralColor20 */
                },
                /**
                 * The inner padding of the legend box.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   8
                 * @since     2.2.0
                 * @apioption legend.padding
                 */
                /**
                 * Whether to reverse the order of the legend items compared to the
                 * order of the series or points as defined in the configuration object.
                 *
                 * @see [yAxis.reversedStacks](#yAxis.reversedStacks),
                 *      [series.legendIndex](#series.legendIndex)
                 *
                 * @sample {highcharts} highcharts/legend/reversed/
                 *         Stacked bar with reversed legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     1.2.5
                 * @apioption legend.reversed
                 */
                /**
                 * Whether to show the symbol on the right side of the text rather than
                 * the left side. This is common in Arabic and Hebrew.
                 *
                 * @sample {highcharts} highcharts/legend/rtl/
                 *         Symbol to the right
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption legend.rtl
                 */
                /**
                 * CSS styles for the legend area. In the 1.x versions the position
                 * of the legend area was determined by CSS. In 2.x, the position is
                 * determined by properties like `align`, `verticalAlign`, `x` and `y`,
                 * but the styles are still parsed for backwards compatibility.
                 *
                 * @deprecated
                 *
                 * @type      {Highcharts.CSSObject}
                 * @product   highcharts highstock
                 * @apioption legend.style
                 */
                /**
                 * CSS styles for each legend item. Only a subset of CSS is supported,
                 * notably those options related to text. The default `textOverflow`
                 * property makes long texts truncate. Set it to `undefined` to wrap
                 * text instead. A `width` property can be added to control the text
                 * width.
                 *
                 * @see In styled mode, the legend items can be styled with the
                 *      `.highcharts-legend-item` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemstyle/
                 *         Bold black text
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#333333", "cursor": "pointer", "fontSize": "0.75em", "fontWeight": "bold", "textOverflow": "ellipsis"}
                 */
                itemStyle: {
                    /**
                     * @ignore
                     */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /**
                     * @ignore
                     */
                    cursor: 'pointer',
                    /**
                     * @ignore
                     */
                    fontSize: '0.8em',
                    /**
                     * @ignore
                     */
                    textDecoration: 'none',
                    /**
                     * @ignore
                     */
                    textOverflow: 'ellipsis'
                },
                /**
                 * CSS styles for each legend item in hover mode. Only a subset of
                 * CSS is supported, notably those options related to text. Properties
                 * are inherited from `style` unless overridden here.
                 *
                 * @see In styled mode, the hovered legend items can be styled with
                 *      the `.highcharts-legend-item:hover` pesudo-class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhoverstyle/
                 *         Red on hover
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#000000"}
                 */
                itemHoverStyle: {
                    /**
                     * @ignore
                     */
                    color: "#000000" /* Palette.neutralColor100 */
                },
                /**
                 * CSS styles for each legend item when the corresponding series or
                 * point is hidden. Only a subset of CSS is supported, notably those
                 * options related to text. Properties are inherited from `style`
                 * unless overridden here.
                 *
                 * @see In styled mode, the hidden legend items can be styled with
                 *      the `.highcharts-legend-item-hidden` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhiddenstyle/
                 *         Darker gray color
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#cccccc"}
                 */
                itemHiddenStyle: {
                    /**
                     * @ignore
                     */
                    color: "#666666" /* Palette.neutralColor60 */,
                    /**
                     * @ignore
                     */
                    textDecoration: 'line-through'
                },
                /**
                 * Whether to apply a drop shadow to the legend. A `backgroundColor`
                 * also needs to be applied for this to take effect. The shadow can be
                 * an object configuration containing `color`, `offsetX`, `offsetY`,
                 * `opacity` and `width`.
                 *
                 * @sample {highcharts} highcharts/legend/shadow/
                 *         White background and drop shadow
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {boolean|Highcharts.CSSObject}
                 */
                shadow: false,
                /**
                 * Default styling for the checkbox next to a legend item when
                 * `showCheckbox` is true.
                 *
                 * @type {Highcharts.CSSObject}
                 * @default {"width": "13px", "height": "13px", "position":"absolute"}
                 */
                itemCheckboxStyle: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    width: '13px',
                    /**
                     * @ignore
                     */
                    height: '13px'
                },
                // itemWidth: undefined,
                /**
                 * When this is true, the legend symbol width will be the same as
                 * the symbol height, which in turn defaults to the font size of the
                 * legend items.
                 *
                 * @since 5.0.0
                 */
                squareSymbol: true,
                /**
                 * The pixel height of the symbol for series types that use a rectangle
                 * in the legend. Defaults to the font size of legend items.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a vertical color
                 * axis, the height defaults to 200.
                 *
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         No distance between data classes
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolHeight
                 */
                /**
                 * The border radius of the symbol for series types that use a rectangle
                 * in the legend. Defaults to half the `symbolHeight`, effectively
                 * creating a circle.
                 *
                 * For color axis scales, it defaults to 3.
                 *
                 * @sample {highcharts} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highstock} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highmaps} highcharts/legend/symbolradius/
                 *         Round symbols
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolRadius
                 */
                /**
                 * The pixel width of the legend item symbol. When the `squareSymbol`
                 * option is set, this defaults to the `symbolHeight`, otherwise 16.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a horizontal color
                 * axis, the width defaults to 200.
                 *
                 * @sample {highcharts} highcharts/legend/symbolwidth/
                 *         Greater symbol width and padding
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 *
                 * @type      {number}
                 * @apioption legend.symbolWidth
                 */
                /**
                 * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the legend item texts.
                 *
                 * Prior to 4.1.7, when using HTML, [legend.navigation](
                 * #legend.navigation) was disabled.
                 *
                 * @sample highcharts/legend/scrollable-vertical/
                 *         Legend with vertical scrollable extension
                 * @sample highcharts/legend/scrollable-horizontal/
                 *         Legend with horizontal scrollable extension
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption legend.useHTML
                 */
                /**
                 * For a color axis with data classes, how many decimals to render in
                 * the legend. The default preserves the decimals of the range numbers.
                 *
                 * @type      {number}
                 * @default   -1
                 * @product   highcharts highmaps
                 * @apioption legend.valueDecimals
                 */
                /**
                 * For a color axis with data classes, a suffix for the range numbers in
                 * the legend.
                 *
                 * @type      {string}
                 * @default   ''
                 * @product   highcharts highmaps
                 * @apioption legend.valueSuffix
                 */
                /**
                 * The width of the legend box. If a number is set, it translates to
                 * pixels. Since v7.0.2 it allows setting a percent string of the full
                 * chart width, for example `40%`.
                 *
                 * Defaults to the full chart width for legends below or above the
                 * chart, half the chart width for legends to the left and right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 * @sample {highcharts} highcharts/legend/width-percent/
                 *         A percent of the chart width
                 *
                 * @type      {number|string}
                 * @since     2.0
                 * @apioption legend.width
                 */
                /**
                 * The pixel padding between the legend item symbol and the legend
                 * item text.
                 *
                 * @sample {highcharts} highcharts/legend/symbolpadding/
                 *         Greater symbol width and padding
                 */
                symbolPadding: 5,
                /**
                 * The vertical alignment of the legend box. Can be one of `top`,
                 * `middle` or `bottom`. Vertical position can be further determined
                 * by the `y` option.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * When the [layout](#legend.layout) option is `proximate`, the
                 * `verticalAlign` option doesn't apply.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 2.0
                 */
                verticalAlign: 'bottom',
                // width: undefined,
                /**
                 * The x offset of the legend relative to its horizontal alignment
                 * `align` within chart.spacingLeft and chart.spacingRight. Negative
                 * x moves it to the left, positive x moves it to the right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 *
                 * @since 2.0
                 */
                x: 0,
                /**
                 * The vertical offset of the legend relative to it's vertical alignment
                 * `verticalAlign` within chart.spacingTop and chart.spacingBottom.
                 *  Negative y moves it up, positive y moves it down.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @since 2.0
                 */
                y: 0,
                /**
                 * A title to be added on top of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/title/
                 *         Legend title
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend with title
                 *
                 * @since 3.0
                 */
                title: {
                    /**
                     * A text or HTML string for the title.
                     *
                     * @type      {string}
                     * @since     3.0
                     * @apioption legend.title.text
                     */
                    /**
                     * Generic CSS styles for the legend title.
                     *
                     * @see In styled mode, the legend title is styled with the
                     *      `.highcharts-legend-title` class.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"fontSize": "0.75em", "fontWeight": "bold"}
                     * @since   3.0
                     */
                    style: {
                        /**
                         * @ignore
                         */
                        fontSize: '0.8em',
                        /**
                         * @ignore
                         */
                        fontWeight: 'bold'
                    }
                }
            },
            /**
             * The loading options control the appearance of the loading screen
             * that covers the plot area on chart operations. This screen only
             * appears after an explicit call to `chart.showLoading()`. It is a
             * utility for developers to communicate to the end user that something
             * is going on, for example while retrieving new data via an XHR connection.
             * The "Loading..." text itself is not part of this configuration
             * object, but part of the `lang` object.
             */
            loading: {
                /**
                 * The duration in milliseconds of the fade out effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.hideDuration
                 */
                /**
                 * The duration in milliseconds of the fade in effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.showDuration
                 */
                /**
                 * CSS styles for the loading label `span`.
                 *
                 * @see In styled mode, the loading label is styled with the
                 *      `.highcharts-loading-inner` class.
                 *
                 * @sample {highcharts|highmaps} highcharts/loading/labelstyle/
                 *         Vertically centered
                 * @sample {highstock} stock/loading/general/
                 *         Label styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontWeight": "bold", "position": "relative", "top": "45%"}
                 * @since   1.2.0
                 */
                labelStyle: {
                    /**
                     * @ignore
                     */
                    fontWeight: 'bold',
                    /**
                     * @ignore
                     */
                    position: 'relative',
                    /**
                     * @ignore
                     */
                    top: '45%'
                },
                /**
                 * CSS styles for the loading screen that covers the plot area.
                 *
                 * In styled mode, the loading label is styled with the
                 * `.highcharts-loading` class.
                 *
                 * @sample  {highcharts|highmaps} highcharts/loading/style/
                 *          Gray plot area, white text
                 * @sample  {highstock} stock/loading/general/
                 *          Gray plot area, white text
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"position": "absolute", "backgroundColor": "#ffffff", "opacity": 0.5, "textAlign": "center"}
                 * @since   1.2.0
                 */
                style: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                    /**
                     * @ignore
                     */
                    opacity: 0.5,
                    /**
                     * @ignore
                     */
                    textAlign: 'center'
                }
            },
            /**
             * Options for the tooltip that appears when the user hovers over a
             * series or point.
             *
             * @declare Highcharts.TooltipOptions
             */
            tooltip: {
                /**
                 * The color of the tooltip border. When `undefined`, the border takes
                 * the color of the corresponding series or point.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Follow series by default
                 * @sample {highcharts} highcharts/tooltip/bordercolor-black/
                 *         Black border
                 * @sample {highstock} stock/tooltip/general/
                 *         Styled tooltip
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption tooltip.borderColor
                 */
                /**
                 * A CSS class name to apply to the tooltip's container div,
                 * allowing unique CSS styling for each chart.
                 *
                 * @type      {string}
                 * @apioption tooltip.className
                 */
                /**
                 * Since 4.1, the crosshair definitions are moved to the Axis object
                 * in order for a better separation from the tooltip. See
                 * [xAxis.crosshair](#xAxis.crosshair).
                 *
                 * @sample {highcharts} highcharts/tooltip/crosshairs-x/
                 *         Enable a crosshair for the x value
                 *
                 * @deprecated
                 *
                 * @type      {*}
                 * @default   true
                 * @apioption tooltip.crosshairs
                 */
                /**
                 * Distance from point to tooltip in pixels.
                 *
                 * @type      {number}
                 * @default   16
                 * @apioption tooltip.distance
                 */
                /**
                 * Whether the tooltip should follow the mouse as it moves across
                 * columns, pie slices and other point types with an extent.
                 * By default it behaves this way for pie, polygon, map, sankey
                 * and wordcloud series by override in the `plotOptions`
                 * for those series types.
                 *
                 * Does not apply if [split](#tooltip.split) is `true`.
                 *
                 * For touch moves to behave the same way, [followTouchMove](
                 * #tooltip.followTouchMove) must be `true` also.
                 *
                 * @sample highcharts/tooltip/followpointer/
                 *         Tooltip follow pointer comparison
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} false
                 * @default   {highmaps} true
                 * @since     3.0
                 * @apioption tooltip.followPointer
                 */
                /**
                 * Whether the tooltip should update as the finger moves on a touch
                 * device. If this is `true` and [chart.panning](#chart.panning) is
                 * set,`followTouchMove` will take over one-finger touches, so the user
                 * needs to use two fingers for zooming and panning.
                 *
                 * Note the difference to [followPointer](#tooltip.followPointer) that
                 * only defines the _position_ of the tooltip. If `followPointer` is
                 * false in for example a column series, the tooltip will show above or
                 * below the column, but as `followTouchMove` is true, the tooltip will
                 * jump from column to column as the user swipes across the plot area.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} true
                 * @default   {highstock} true
                 * @default   {highmaps} false
                 * @since     3.0.1
                 * @apioption tooltip.followTouchMove
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for the whole tooltip. When format strings are a requirement, it is
                 * usually more convenient to use `headerFormat`, `pointFormat` and
                 * `footerFormat`, but the `format` option allows combining them into
                 * one setting.
                 *
                 * The context of the format string is the same as that of the
                 * `formatter` callback.
                 *
                 * @sample {highcharts} highcharts/tooltip/format-shared/
                 *         Format for shared tooltip
                 *
                 * @type      {string}
                 * @default   undefined
                 * @since 11.1.0
                 * @apioption tooltip.format
                 */
                /**
                 * Callback function to format the text of the tooltip from scratch. In
                 * case of single or [shared](#tooltip.shared) tooltips, a string should
                 * be returned. In case of [split](#tooltip.split) tooltips, it should
                 * return an array where the first item is the header, and subsequent
                 * items are mapped to the points. Return `false` to disable tooltip for
                 * a specific point on series.
                 *
                 * A subset of HTML is supported. Unless `useHTML` is true, the HTML of
                 * the tooltip is parsed and converted to SVG, therefore this isn't a
                 * complete HTML renderer. The following HTML tags are supported: `b`,
                 * `br`, `em`, `i`, `span`, `strong`. Spans can be styled with a `style`
                 * attribute, but only text-related CSS, that is shared with SVG, is
                 * handled.
                 *
                 * The available data in the formatter differ a bit depending on whether
                 * the tooltip is shared or split, or belongs to a single point. In a
                 * shared/split tooltip, all properties except `x`, which is common for
                 * all points, are kept in an array, `this.points`.
                 *
                 * Available data are:
                 *
                 * - **this.percentage (not shared) /**
                 *   **this.points[i].percentage (shared)**:
                 *   Stacked series and pies only. The point's percentage of the total.
                 *
                 * - **this.point (not shared) / this.points[i].point (shared)**:
                 *   The point object. The point name, if defined, is available through
                 *   `this.point.name`.
                 *
                 * - **this.points**:
                 *   In a shared tooltip, this is an array containing all other
                 *   properties for each point.
                 *
                 * - **this.series (not shared) / this.points[i].series (shared)**:
                 *   The series object. The series name is available through
                 *   `this.series.name`.
                 *
                 * - **this.total (not shared) / this.points[i].total (shared)**:
                 *   Stacked series only. The total value at this point's x value.
                 *
                 * - **this.x**:
                 *   The x value. This property is the same regardless of the tooltip
                 *   being shared or not.
                 *
                 * - **this.y (not shared) / this.points[i].y (shared)**:
                 *   The y value.
                 *
                 * @sample {highcharts} highcharts/tooltip/formatter-simple/
                 *         Simple string formatting
                 * @sample {highcharts} highcharts/tooltip/formatter-shared/
                 *         Formatting with shared tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Formatting with split tooltip
                 * @sample highcharts/tooltip/formatter-conditional-default/
                 *         Extending default formatter
                 * @sample {highstock} stock/tooltip/formatter/
                 *         Formatting with shared tooltip
                 * @sample {highmaps} maps/tooltip/formatter/
                 *         String formatting
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.formatter
                 */
                /**
                 * Callback function to format the text of the tooltip for
                 * visible null points.
                 * Works analogously to [formatter](#tooltip.formatter).
                 *
                 * @sample highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.nullFormatter
                 */
                /**
                 * Whether to allow the tooltip to render outside the chart's SVG
                 * element box. By default (`false`), the tooltip is rendered within the
                 * chart's SVG element, which results in the tooltip being aligned
                 * inside the chart area. For small charts, this may result in clipping
                 * or overlapping. When `true`, a separate SVG element is created and
                 * overlaid on the page, allowing the tooltip to be aligned inside the
                 * page itself.
                 *
                 * Defaults to `true` if `chart.scrollablePlotArea` is activated,
                 * otherwise `false`.
                 *
                 * @sample highcharts/tooltip/outside
                 *         Small charts with tooltips outside
                 *
                 * @type      {boolean|undefined}
                 * @default   undefined
                 * @since     6.1.1
                 * @apioption tooltip.outside
                 */
                /**
                 * A callback function for formatting the HTML output for a single point
                 * in the tooltip. Like the `pointFormat` string, but with more
                 * flexibility.
                 *
                 * @type      {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
                 * @since     4.1.0
                 * @context   Highcharts.Point
                 * @apioption tooltip.pointFormatter
                 */
                /**
                 * A callback function to place the tooltip in a custom position. The
                 * callback receives three parameters: `labelWidth`, `labelHeight` and
                 * `point`, where point contains values for `plotX` and `plotY` telling
                 * where the reference point is in the plot area. Add `chart.plotLeft`
                 * and `chart.plotTop` to get the full coordinates.
                 *
                 * To find the actual hovered `Point` instance, use
                 * `this.chart.hoverPoint`. For shared or split tooltips, all the hover
                 * points are available in `this.chart.hoverPoints`.
                 *
                 * Since v7, when [tooltip.split](#tooltip.split) option is enabled,
                 * positioner is called for each of the boxes separately, including
                 * xAxis header. xAxis header is not a point, instead `point` argument
                 * contains info: `{ plotX: Number, plotY: Number, isHeader: Boolean }`
                 *
                 * The return should be an object containing x and y values, for example
                 * `{ x: 100, y: 100 }`.
                 *
                 * @sample {highcharts} highcharts/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/positioner/
                 *         A fixed tooltip position on top of the chart
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Split tooltip with fixed positions
                 * @sample {highstock} stock/tooltip/positioner-scrollable-plotarea/
                 *         Scrollable plot area combined with tooltip positioner
                 *
                 * @type      {Highcharts.TooltipPositionerCallbackFunction}
                 * @since     2.2.4
                 * @apioption tooltip.positioner
                 */
                /**
                 * Split the tooltip into one label per series, with the header close
                 * to the axis. This is recommended over [shared](#tooltip.shared)
                 * tooltips for charts with multiple line series, generally making them
                 * easier to read. This option takes precedence over `tooltip.shared`.
                 *
                 * Not supported for [polar](#chart.polar) and [inverted](#chart.inverted) charts.
                 *
                 * @productdesc {highstock} In Highcharts Stock, tooltips are split
                 * by default since v6.0.0. Stock charts typically contain
                 * multi-dimension points and multiple panes, making split tooltips
                 * the preferred layout over
                 * the previous `shared` tooltip.
                 *
                 * @sample highcharts/tooltip/split/
                 *         Split tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Split tooltip and custom formatter callback
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} true
                 * @since     5.0.0
                 * @product   highcharts highstock
                 * @apioption tooltip.split
                 */
                /**
                 * Prevents the tooltip from switching or closing, when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @type      {boolean}
                 * @since     8.0.1
                 * @apioption tooltip.stickOnContact
                 */
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption tooltip.useHTML
                 */
                /**
                 * How many decimals to show in each series' y value. This is
                 * overridable in each series' tooltip options object. The default is to
                 * preserve all decimals.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {number|undefined}
                 * @since     2.2
                 * @apioption tooltip.valueDecimals
                 */
                /**
                 * A string to prepend to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valuePrefix
                 */
                /**
                 * A string to append to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valueSuffix
                 */
                /**
                 * The format for the date in the tooltip header if the X axis is a
                 * datetime axis. The default is a best guess based on the smallest
                 * distance between points in the chart.
                 *
                 * @sample {highcharts} highcharts/tooltip/xdateformat/
                 *         A different format
                 *
                 * @type      {string}
                 * @product   highcharts highstock gantt
                 * @apioption tooltip.xDateFormat
                 */
                /**
                 * How many decimals to show for the `point.change`
                 * or the `point.cumulativeSum` value when the `series.compare`
                 * or the `series.cumulative` option is set.
                 * This is overridable in each series' tooltip options object.
                 *
                 * @type      {number}
                 * @default   2
                 * @since     1.0.1
                 * @product   highstock
                 * @apioption tooltip.changeDecimals
                 */
                /**
                 * Enable or disable the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/enabled/
                 *         Disabled
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Disable tooltip and show values on chart instead
                 */
                enabled: true,
                /**
                 * Enable or disable animation of the tooltip.
                 *
                 * @type       {boolean}
                 * @default    true
                 * @since      2.3.0
                 */
                animation: svg,
                /**
                 * The radius of the rounded border corners.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Default border radius
                 * @sample {highcharts} highcharts/tooltip/borderradius-0/
                 *         Square borders
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 */
                borderRadius: 3,
                /**
                 * For series on datetime axes, the date format in the tooltip's
                 * header will by default be guessed based on the closest data points.
                 * This member gives the default string representations used for
                 * each unit. For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
                 *
                 * @see [xAxis.dateTimeLabelFormats](#xAxis.dateTimeLabelFormats)
                 *
                 * @type    {Highcharts.Dictionary<string>}
                 * @product highcharts highstock gantt
                 */
                dateTimeLabelFormats: {
                    /** @internal */
                    millisecond: '%A, %e %b, %H:%M:%S.%L',
                    /** @internal */
                    second: '%A, %e %b, %H:%M:%S',
                    /** @internal */
                    minute: '%A, %e %b, %H:%M',
                    /** @internal */
                    hour: '%A, %e %b, %H:%M',
                    /** @internal */
                    day: '%A, %e %b %Y',
                    /** @internal */
                    week: 'Week from %A, %e %b %Y',
                    /** @internal */
                    month: '%B %Y',
                    /** @internal */
                    year: '%Y'
                },
                /**
                 * A string to append to the tooltip format.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @since 2.2
                 */
                footerFormat: '',
                /**
                 * The name of a symbol to use for the border around the tooltip
                 * header. Applies only when [tooltip.split](#tooltip.split) is
                 * enabled.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @see [tooltip.shape](#tooltip.shape)
                 *
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Different shapes for header and split boxes
                 *
                 * @type       {Highcharts.TooltipShapeValue}
                 * @validvalue ["callout", "rect"]
                 * @since      7.0
                 */
                headerShape: 'callout',
                /**
                 * The number of milliseconds to wait until the tooltip is hidden when
                 * mouse out from a point or chart.
                 *
                 * @since 3.0
                 */
                hideDelay: 500,
                /**
                 * Padding inside the tooltip, in pixels.
                 *
                 * @since 5.0.0
                 */
                padding: 8,
                /**
                 * The name of a symbol to use for the border around the tooltip. Can
                 * be one of: `"callout"`, `"circle"` or `"rect"`. When
                 * [tooltip.split](#tooltip.split)
                 * option is enabled, shape is applied to all boxes except header, which
                 * is controlled by
                 * [tooltip.headerShape](#tooltip.headerShape).
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @type  {Highcharts.TooltipShapeValue}
                 * @since 4.0
                 */
                shape: 'callout',
                /**
                 * When the tooltip is shared, the entire plot area will capture mouse
                 * movement or touch events. Tooltip texts for series types with ordered
                 * data (not pie, scatter, flags etc) will be shown in a single bubble.
                 * This is recommended for single series charts and for tablet/mobile
                 * optimized charts.
                 *
                 * See also [tooltip.split](#tooltip.split), that is better suited for
                 * charts with many series, especially line-type series. The
                 * `tooltip.split` option takes precedence over `tooltip.shared`.
                 *
                 * @sample {highcharts} highcharts/tooltip/shared-false/
                 *         False by default
                 * @sample {highcharts} highcharts/tooltip/shared-true/
                 *         True
                 * @sample {highcharts} highcharts/tooltip/shared-x-crosshair/
                 *         True with x axis crosshair
                 * @sample {highcharts} highcharts/tooltip/shared-true-mixed-types/
                 *         True with mixed series types
                 *
                 * @since   2.1
                 * @product highcharts highstock
                 */
                shared: false,
                /**
                 * Proximity snap for graphs or single points. It defaults to 10 for
                 * mouse-powered devices and 25 for touch devices.
                 *
                 * Note that in most cases the whole plot area captures the mouse
                 * movement, and in these cases `tooltip.snap` doesn't make sense. This
                 * applies when [stickyTracking](#plotOptions.series.stickyTracking)
                 * is `true` (default) and when the tooltip is [shared](#tooltip.shared)
                 * or [split](#tooltip.split).
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         10 px by default
                 * @sample {highcharts} highcharts/tooltip/snap-50/
                 *         50 px on graph
                 *
                 * @type    {number}
                 * @default 10/25
                 * @since   1.2.0
                 * @product highcharts highstock
                 */
                snap: isTouchDevice ? 25 : 10,
                /**
                 * The HTML of the tooltip header line. Variables are enclosed by
                 * curly brackets. Available variables are `point.key`, `series.name`,
                 * `series.color` and other members from the `point` and `series`
                 * objects. The `point.key` variable contains the category name, x
                 * value or datetime string depending on the type of axis. For datetime
                 * axes, the `point.key` date format can be set using
                 * `tooltip.xDateFormat`.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highstock} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type      {string}
                 * @apioption tooltip.headerFormat
                 */
                headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>',
                /**
                 * The HTML of the null point's line in the tooltip. Works analogously
                 * to [pointFormat](#tooltip.pointFormat).
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {string}
                 * @apioption tooltip.nullFormat
                 */
                /**
                 * The HTML of the point's line in the tooltip. Variables are enclosed
                 * by curly brackets. Available variables are `point.x`, `point.y`,
                 * `series.name` and `series.color` and other properties on the same
                 * form. Furthermore, `point.y` can be extended by the
                 * `tooltip.valuePrefix` and `tooltip.valueSuffix` variables. This can
                 * also be overridden for each series, which makes it a good hook for
                 * displaying units.
                 *
                 * In styled mode, the dot is colored by a class name rather
                 * than the point color.
                 *
                 * @sample {highcharts} highcharts/tooltip/pointformat/
                 *         A different point format with value suffix
                 * @sample {highcharts|highstock} highcharts/tooltip/pointformat-extra-information/
                 *         Show extra information about points in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type       {string}
                 * @since      2.2
                 * @apioption  tooltip.pointFormat
                 */
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                /**
                 * The background color or gradient for the tooltip.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-solid/
                 *         Yellowish background
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                /**
                 * The pixel width of the tooltip border. Defaults to 0 for single
                 * tooltips and 1 for split tooltips.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         2 pixels
                 * @sample {highcharts} highcharts/tooltip/borderwidth/
                 *         No border (shadow only)
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {number}
                 */
                borderWidth: void 0,
                /**
                 * Whether to apply a drop shadow to the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         True by default
                 * @sample {highcharts} highcharts/tooltip/shadow/
                 *         False
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         Fixed tooltip position, border and shadow disabled
                 *
                 * @type {boolean|Highcharts.ShadowOptionsObject}
                 */
                shadow: true,
                /**
                 * Prevents the tooltip from switching or closing when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @since 8.0.1
                 */
                stickOnContact: false,
                /**
                 * CSS styles for the tooltip. The tooltip can also be styled through
                 * the CSS class `.highcharts-tooltip`.
                 *
                 * Note that the default `pointerEvents` style makes the tooltip ignore
                 * mouse events, so in order to use clickable tooltips, this value must
                 * be set to `auto`.
                 *
                 * @sample {highcharts} highcharts/tooltip/style/
                 *         Greater padding, bold text
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /** @internal */
                    cursor: 'default',
                    /** @internal */
                    fontSize: '0.8em'
                },
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @since 2.2
                 */
                useHTML: false
            },
            /**
             * Highchart by default puts a credits label in the lower right corner
             * of the chart. This can be changed using these options.
             */
            credits: {
                /**
                 * Credits for map source to be concatenated with conventional credit
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapTextFull](#credits.mapTextFull)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapText
                 */
                /**
                 * Detailed credits for map source to be displayed on hover of credits
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapText](#credits.mapText)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   {geojson.copyright}
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapTextFull
                 */
                /**
                 * Whether to show the credits text.
                 *
                 * @sample {highcharts} highcharts/credits/enabled-false/
                 *         Credits disabled
                 * @sample {highstock} stock/credits/enabled/
                 *         Credits disabled
                 * @sample {highmaps} maps/credits/enabled-false/
                 *         Credits disabled
                 */
                enabled: true,
                /**
                 * The URL for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                href: 'https://www.highcharts.com?credits',
                /**
                 * Position configuration for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 *
                 * @type    {Highcharts.AlignObject}
                 * @since   2.1
                 */
                position: {
                    /** @internal */
                    align: 'right',
                    /** @internal */
                    x: -10,
                    /** @internal */
                    verticalAlign: 'bottom',
                    /** @internal */
                    y: -5
                },
                /**
                 * CSS styles for the credits label.
                 *
                 * @see In styled mode, credits styles can be set with the
                 *      `.highcharts-credits` class.
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    cursor: 'pointer',
                    /** @internal */
                    color: "#999999" /* Palette.neutralColor40 */,
                    /** @internal */
                    fontSize: '0.6em'
                },
                /**
                 * The text for the credits label.
                 *
                 * @productdesc {highmaps}
                 * If a map is loaded as GeoJSON, the text defaults to
                 * `Highcharts @ {map-credits}`. Otherwise, it defaults to
                 * `Highcharts.com`.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                text: 'Highcharts.com'
            }
        };
        /* eslint-disable spaced-comment */

        defaultOptions.chart.styledMode = false;

        '';
        const defaultTime = new Time(defaultOptions.time);
        /**
         * Get the updated default options. Until 3.0.7, merely exposing defaultOptions
         * for outside modules wasn't enough because the setOptions method created a new
         * object.
         *
         * @function Highcharts.getOptions
         *
         * @return {Highcharts.Options}
         * Default options.
         */
        function getOptions() {
            return defaultOptions;
        }
        /**
         * Merge the default options with custom options and return the new options
         * structure. Commonly used for defining reusable templates.
         *
         * @sample highcharts/global/useutc-false Setting a global option
         * @sample highcharts/members/setoptions Applying a global theme
         *
         * @function Highcharts.setOptions
         *
         * @param {Highcharts.Options} options
         * The new custom chart options.
         *
         * @return {Highcharts.Options}
         * Updated options.
         */
        function setOptions(options) {
            // Copy in the default options
            merge(true, defaultOptions, options);
            // Update the time object
            if (options.time || options.global) {
                if (H.time) {
                    H.time.update(merge(defaultOptions.global, defaultOptions.time, options.global, options.time));
                }
                else {
                    /**
                     * Global `Time` object with default options. Since v6.0.5, time
                     * settings can be applied individually for each chart. If no
                     * individual settings apply, this `Time` object is shared by all
                     * instances.
                     *
                     * @name Highcharts.time
                     * @type {Highcharts.Time}
                     */
                    H.time = defaultTime;
                }
            }
            return defaultOptions;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DefaultOptions = {
            defaultOptions,
            defaultTime,
            getOptions,
            setOptions
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"plotBox"|"spacingBox"} Highcharts.ButtonRelativeToValue
         */
        /**
         * Gets fired when a series is added to the chart after load time, using the
         * `addSeries` method. Returning `false` prevents the series from being added.
         *
         * @callback Highcharts.ChartAddSeriesCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.ChartAddSeriesEventObject} event
         *        The event that occured.
         */
        /**
         * Contains common event information. Through the `options` property you can
         * access the series options that were passed to the `addSeries` method.
         *
         * @interface Highcharts.ChartAddSeriesEventObject
         */ /**
        * The series options that were passed to the `addSeries` method.
        * @name Highcharts.ChartAddSeriesEventObject#options
        * @type {Highcharts.SeriesOptionsType}
        */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.ChartAddSeriesEventObject#preventDefault
        * @type {Function}
        */ /**
        * The event target.
        * @name Highcharts.ChartAddSeriesEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.ChartAddSeriesEventObject#type
        * @type {"addSeries"}
        */
        /**
         * Gets fired when clicking on the plot background.
         *
         * @callback Highcharts.ChartClickCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.PointerEventObject} event
         *        The event that occured.
         */
        /**
         * Contains an axes of the clicked spot.
         *
         * @interface Highcharts.ChartClickEventAxisObject
         */ /**
        * Axis at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#axis
        * @type {Highcharts.Axis}
        */ /**
        * Axis value at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#value
        * @type {number}
        */
        /**
         * Contains information about the clicked spot on the chart. Remember the unit
         * of a datetime axis is milliseconds since 1970-01-01 00:00:00.
         *
         * @interface Highcharts.ChartClickEventObject
         * @extends Highcharts.PointerEventObject
         */ /**
        * Information about the x-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#xAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the y-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#yAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the z-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#zAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>|undefined}
        */
        /**
         * Gets fired when the chart is finished loading.
         *
         * @callback Highcharts.ChartLoadCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Fires when the chart is redrawn, either after a call to `chart.redraw()` or
         * after an axis, series or point is modified with the `redraw` option set to
         * `true`.
         *
         * @callback Highcharts.ChartRedrawCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Gets fired after initial load of the chart (directly after the `load` event),
         * and after each redraw (directly after the `redraw` event).
         *
         * @callback Highcharts.ChartRenderCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Gets fired when an area of the chart has been selected. The default action
         * for the selection event is to zoom the chart to the selected area. It can be
         * prevented by calling `event.preventDefault()` or return false.
         *
         * @callback Highcharts.ChartSelectionCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.SelectEventObject} event
         *        Event informations
         *
         * @return {boolean|undefined}
         *         Return false to prevent the default action, usually zoom.
         */
        (''); // detach doclets above

        return DefaultOptions;
    });
    _registerModule(_modules, 'Core/Templating.js', [_modules['Core/Defaults.js'], _modules['Core/Utilities.js']], function (D, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions, defaultTime } = D;
        const { extend, getNestedProperty, isArray, isNumber, isObject, isString, pick, pInt } = U;
        const helpers = {
            // Built-in helpers
            add: (a, b) => a + b,
            divide: (a, b) => (b !== 0 ? a / b : ''),
            // eslint-disable-next-line eqeqeq
            eq: (a, b) => a == b,
            each: function (arr) {
                const match = arguments[arguments.length - 1];
                return isArray(arr) ?
                    arr.map((item, i) => format(match.body, extend(isObject(item) ? item : { '@this': item }, {
                        '@index': i,
                        '@first': i === 0,
                        '@last': i === arr.length - 1
                    }))).join('') :
                    false;
            },
            ge: (a, b) => a >= b,
            gt: (a, b) => a > b,
            'if': (condition) => !!condition,
            le: (a, b) => a <= b,
            lt: (a, b) => a < b,
            multiply: (a, b) => a * b,
            // eslint-disable-next-line eqeqeq
            ne: (a, b) => a != b,
            subtract: (a, b) => a - b,
            unless: (condition) => !condition
        };
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970) into a
         * human readable date string. The format is a subset of the formats for PHP's
         * [strftime](https://www.php.net/manual/en/function.strftime.php) function.
         * Additional formats can be given in the {@link Highcharts.dateFormats} hook.
         *
         * Since v6.0.5, all internal dates are formatted through the
         * {@link Highcharts.Chart#time} instance to respect chart-level time settings.
         * The `Highcharts.dateFormat` function only reflects global time settings set
         * with `setOptions`.
         *
         * Supported format keys:
         * - `%a`: Short weekday, like 'Mon'
         * - `%A`: Long weekday, like 'Monday'
         * - `%d`: Two digit day of the month, 01 to 31
         * - `%e`: Day of the month, 1 through 31
         * - `%w`: Day of the week, 0 through 6
         * - `%b`: Short month, like 'Jan'
         * - `%B`: Long month, like 'January'
         * - `%m`: Two digit month number, 01 through 12
         * - `%y`: Two digits year, like 09 for 2009
         * - `%Y`: Four digits year, like 2009
         * - `%H`: Two digits hours in 24h format, 00 through 23
         * - `%k`: Hours in 24h format, 0 through 23
         * - `%I`: Two digits hours in 12h format, 00 through 11
         * - `%l`: Hours in 12h format, 1 through 12
         * - `%M`: Two digits minutes, 00 through 59
         * - `%p`: Upper case AM or PM
         * - `%P`: Lower case AM or PM
         * - `%S`: Two digits seconds, 00 through 59
         * - `%L`: Milliseconds (naming from Ruby)
         *
         * @function Highcharts.dateFormat
         *
         * @param {string} format
         *        The desired format where various time representations are prefixed
         *        with `%`.
         *
         * @param {number} timestamp
         *        The JavaScript timestamp.
         *
         * @param {boolean} [capitalize=false]
         *        Upper case first letter in the return.
         *
         * @return {string}
         *         The formatted date.
         */
        function dateFormat(format, timestamp, capitalize) {
            return defaultTime.dateFormat(format, timestamp, capitalize);
        }
        /**
         * Format a string according to a subset of the rules of Python's String.format
         * method.
         *
         * @example
         * let s = Highcharts.format(
         *     'The {color} fox was {len:.2f} feet long',
         *     { color: 'red', len: Math.PI }
         * );
         * // => The red fox was 3.14 feet long
         *
         * @function Highcharts.format
         *
         * @param {string} str
         *        The string to format.
         *
         * @param {Record<string, *>} ctx
         *        The context, a collection of key-value pairs where each key is
         *        replaced by its value.
         *
         * @param {Highcharts.Chart} [chart]
         *        A `Chart` instance used to get numberFormatter and time.
         *
         * @return {string}
         *         The formatted string.
         */
        function format(str = '', ctx, chart) {
            const regex = /\{([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= #\(\)]+)\}/g, 
            // The sub expression regex is the same as the top expression regex,
            // but except parens and block helpers (#), and surrounded by parens
            // instead of curly brackets.
            subRegex = /\(([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= ]+)\)/g, matches = [], floatRegex = /f$/, decRegex = /\.([0-9])/, lang = defaultOptions.lang, time = chart && chart.time || defaultTime, numberFormatter = chart && chart.numberFormatter || numberFormat;
            /*
             * Get a literal or variable value inside a template expression. May be
             * extended with other types like string or null if needed, but keep it
             * small for now.
             */
            const resolveProperty = (key = '') => {
                let n;
                // Literals
                if (key === 'true') {
                    return true;
                }
                if (key === 'false') {
                    return false;
                }
                if ((n = Number(key)).toString() === key) {
                    return n;
                }
                // Variables and constants
                return getNestedProperty(key, ctx);
            };
            let match, currentMatch, depth = 0, hasSub;
            // Parse and create tree
            while ((match = regex.exec(str)) !== null) {
                // When a sub expression is found, it is evaluated first, and the
                // results recursively evaluated until no subexpression exists.
                const subMatch = subRegex.exec(match[1]);
                if (subMatch) {
                    match = subMatch;
                    hasSub = true;
                }
                if (!currentMatch || !currentMatch.isBlock) {
                    currentMatch = {
                        ctx,
                        expression: match[1],
                        find: match[0],
                        isBlock: match[1].charAt(0) === '#',
                        start: match.index,
                        startInner: match.index + match[0].length,
                        length: match[0].length
                    };
                }
                // Identify helpers
                const fn = match[1].split(' ')[0].replace('#', '');
                if (helpers[fn]) {
                    // Block helper, only 0 level is handled
                    if (currentMatch.isBlock && fn === currentMatch.fn) {
                        depth++;
                    }
                    if (!currentMatch.fn) {
                        currentMatch.fn = fn;
                    }
                }
                // Closing a block helper
                const startingElseSection = match[1] === 'else';
                if (currentMatch.isBlock &&
                    currentMatch.fn && (match[1] === `/${currentMatch.fn}` ||
                    startingElseSection)) {
                    if (!depth) { // === 0
                        const start = currentMatch.startInner, body = str.substr(start, match.index - start);
                        // Either closing without an else section, or when encountering
                        // an else section
                        if (currentMatch.body === void 0) {
                            currentMatch.body = body;
                            currentMatch.startInner = match.index + match[0].length;
                            // The body exists already, so this is the else section
                        }
                        else {
                            currentMatch.elseBody = body;
                        }
                        currentMatch.find += body + match[0];
                        if (!startingElseSection) {
                            matches.push(currentMatch);
                            currentMatch = void 0;
                        }
                    }
                    else if (!startingElseSection) {
                        depth--;
                    }
                    // Common expression
                }
                else if (!currentMatch.isBlock) {
                    matches.push(currentMatch);
                }
                // Evaluate sub-matches one by one to prevent orphaned block closers
                if (subMatch && !currentMatch?.isBlock) {
                    break;
                }
            }
            // Execute
            matches.forEach((match) => {
                const { body, elseBody, expression, fn } = match;
                let replacement, i;
                // Helper function
                if (fn) {
                    // Pass the helpers the amount of arguments defined by the function,
                    // then the match as the last argument.
                    const args = [match], parts = expression.split(' ');
                    i = helpers[fn].length;
                    while (i--) {
                        args.unshift(resolveProperty(parts[i + 1]));
                    }
                    replacement = helpers[fn].apply(ctx, args);
                    // Block helpers may return true or false. They may also return a
                    // string, like the `each` helper.
                    if (match.isBlock && typeof replacement === 'boolean') {
                        replacement = format(replacement ? body : elseBody, ctx);
                    }
                    // Simple variable replacement
                }
                else {
                    const valueAndFormat = expression.split(':');
                    replacement = resolveProperty(valueAndFormat.shift() || '');
                    // Format the replacement
                    if (valueAndFormat.length && typeof replacement === 'number') {
                        const segment = valueAndFormat.join(':');
                        if (floatRegex.test(segment)) { // float
                            const decimals = parseInt((segment.match(decRegex) || ['', '-1'])[1], 10);
                            if (replacement !== null) {
                                replacement = numberFormatter(replacement, decimals, lang.decimalPoint, segment.indexOf(',') > -1 ? lang.thousandsSep : '');
                            }
                        }
                        else {
                            replacement = time.dateFormat(segment, replacement);
                        }
                    }
                }
                str = str.replace(match.find, pick(replacement, ''));
            });
            return hasSub ? format(str, ctx, chart) : str;
        }
        /**
         * Format a number and return a string based on input settings.
         *
         * @sample highcharts/members/highcharts-numberformat/
         *         Custom number format
         *
         * @function Highcharts.numberFormat
         *
         * @param {number} number
         *        The input number to format.
         *
         * @param {number} decimals
         *        The amount of decimals. A value of -1 preserves the amount in the
         *        input number.
         *
         * @param {string} [decimalPoint]
         *        The decimal point, defaults to the one given in the lang options, or
         *        a dot.
         *
         * @param {string} [thousandsSep]
         *        The thousands separator, defaults to the one given in the lang
         *        options, or a space character.
         *
         * @return {string}
         *         The formatted number.
         */
        function numberFormat(number, decimals, decimalPoint, thousandsSep) {
            number = +number || 0;
            decimals = +decimals;
            let ret, fractionDigits;
            const lang = defaultOptions.lang, origDec = (number.toString().split('.')[1] || '').split('e')[0].length, exponent = number.toString().split('e'), firstDecimals = decimals;
            if (decimals === -1) {
                // Preserve decimals. Not huge numbers (#3793).
                decimals = Math.min(origDec, 20);
            }
            else if (!isNumber(decimals)) {
                decimals = 2;
            }
            else if (decimals && exponent[1] && exponent[1] < 0) {
                // Expose decimals from exponential notation (#7042)
                fractionDigits = decimals + +exponent[1];
                if (fractionDigits >= 0) {
                    // remove too small part of the number while keeping the notation
                    exponent[0] = (+exponent[0]).toExponential(fractionDigits)
                        .split('e')[0];
                    decimals = fractionDigits;
                }
                else {
                    // fractionDigits < 0
                    exponent[0] = exponent[0].split('.')[0] || 0;
                    if (decimals < 20) {
                        // use number instead of exponential notation (#7405)
                        number = (exponent[0] * Math.pow(10, exponent[1]))
                            .toFixed(decimals);
                    }
                    else {
                        // or zero
                        number = 0;
                    }
                    exponent[1] = 0;
                }
            }
            // Add another decimal to avoid rounding errors of float numbers. (#4573)
            // Then use toFixed to handle rounding.
            const roundedNumber = (Math.abs(exponent[1] ? exponent[0] : number) +
                Math.pow(10, -Math.max(decimals, origDec) - 1)).toFixed(decimals);
            // A string containing the positive integer component of the number
            const strinteger = String(pInt(roundedNumber));
            // Leftover after grouping into thousands. Can be 0, 1 or 2.
            const thousands = strinteger.length > 3 ? strinteger.length % 3 : 0;
            // Language
            decimalPoint = pick(decimalPoint, lang.decimalPoint);
            thousandsSep = pick(thousandsSep, lang.thousandsSep);
            // Start building the return
            ret = number < 0 ? '-' : '';
            // Add the leftover after grouping into thousands. For example, in the
            // number 42 000 000, this line adds 42.
            ret += thousands ? strinteger.substr(0, thousands) + thousandsSep : '';
            if (+exponent[1] < 0 && !firstDecimals) {
                ret = '0';
            }
            else {
                // Add the remaining thousands groups, joined by the thousands separator
                ret += strinteger
                    .substr(thousands)
                    .replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep);
            }
            // Add the decimal point and the decimal component
            if (decimals) {
                // Get the decimal component
                ret += decimalPoint + roundedNumber.slice(-decimals);
            }
            if (exponent[1] && +ret !== 0) {
                ret += 'e' + exponent[1];
            }
            return ret;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const Templating = {
            dateFormat,
            format,
            helpers,
            numberFormat
        };

        return Templating;
    });
    _registerModule(_modules, 'DataGrid/DataGridDefaults.js', [], function () {
        /* *
         *
         *  Data Grid class
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /** @internal */
        const DataGridDefaults = {
            /** @internal */
            cellHeight: 49,
            /** @internal */
            columnHeaders: {
                /** @internal */
                enabled: true
            },
            /** @internal */
            columns: {},
            /** @internal */
            defaultHeight: 400,
            /** @internal */
            editable: true,
            /** @internal */
            resizableColumns: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DataGridDefaults;
    });
    _registerModule(_modules, 'DataGrid/DataGrid.js', [_modules['Data/DataTable.js'], _modules['DataGrid/DataGridUtils.js'], _modules['DataGrid/Globals.js'], _modules['Core/Templating.js'], _modules['DataGrid/DataGridDefaults.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (DataTable, DataGridUtils, Globals, Templating, DataGridDefaults, H, U) {
        /* *
         *
         *  Data Grid class
         *
         *  (c) 2020-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *  - Ken-Håvard Lieng
         *  - Sebastian Bochan
         *
         * */
        const { dataTableCellToString, emptyHTMLElement, makeDiv } = DataGridUtils;
        const { doc } = H;
        const { addEvent, clamp, defined, fireEvent, isNumber, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Creates a scrollable grid structure with editable data cells.
         */
        class DataGrid {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates an instance of DataGrid.
             *
             * @param container
             * Element or element ID to create the grid structure into.
             *
             * @param options
             * Options to create the grid structure.
             */
            constructor(container, options) {
                /**
                 * The column names in a sorted array as rendered (or changed).
                 * @internal
                 */
                this.columnNames = [];
                /**
                 * The amount of rows before align end of scrolling.
                 * @internal
                 */
                this.prevTop = -1;
                /**
                 * The amount of rows to align for end of scrolling.
                 * @internal
                 */
                this.scrollEndRowCount = 0;
                /**
                 * Contains the top align offset, when reaching the end of scrolling.
                 * @internal
                 */
                this.scrollEndTop = 0;
                /**
                 * Flag to indicate the end of scrolling. Used to align the last cell with
                 * the container bottom.
                 * @internal
                 */
                this.bottom = false;
                /**
                 * An array of the min column widths for which the text in headers is not
                 * overflown.
                 * @internal
                 */
                this.overflowHeaderWidths = [];
                // Initialize containers
                if (typeof container === 'string') {
                    const existingContainer = doc.getElementById(container);
                    if (existingContainer) {
                        this.container = existingContainer;
                    }
                    else {
                        this.container =
                            makeDiv(Globals.classNames.gridContainer, container);
                    }
                }
                else {
                    this.container = container;
                }
                this.gridContainer = makeDiv(Globals.classNames.gridContainer);
                this.outerContainer = makeDiv(Globals.classNames.outerContainer);
                this.scrollContainer = makeDiv(Globals.classNames.scrollContainer);
                this.innerContainer = makeDiv(Globals.classNames.innerContainer);
                this.outerContainer.appendChild(this.scrollContainer);
                this.gridContainer.appendChild(this.outerContainer);
                this.container.appendChild(this.gridContainer);
                // Init options
                this.options = merge(DataGrid.defaultOptions, options);
                this.gridContainer.style.height = this.getDataGridSize() + 'px';
                this.gridContainer.role = 'figure';
                // Init data table
                this.dataTable = this.initDataTable();
                this.rowElements = [];
                this.draggedResizeHandle = null;
                this.draggedColumnRightIx = null;
                this.render();
                (this.containerResizeObserver = new ResizeObserver(() => {
                    this.updateGridElements();
                })).observe(this.container);
            }
            /**
             * Update the data grid with new options.
             *
             * @param options
             * An object with new options.
             */
            update(options) {
                this.options = merge(this.options, options);
                if (this.options.dataTable !== this.dataTable) {
                    this.dataTable = this.initDataTable();
                }
                this.scrollContainer.removeChild(this.innerContainer);
                this.render();
            }
            /**
             * Resize a column.
             *
             * @internal
             *
             * @param width
             *        New column width.
             *
             * @param columnNameOrIndex
             *        Name or index of the column to resize, omit to resize all
             *        columns.
             *
             * @emits #afterResizeColumn
             */
            resizeColumn(width, columnNameOrIndex) {
                const headers = this.columnHeadersContainer;
                const index = typeof columnNameOrIndex === 'string' ?
                    this.columnNames.indexOf(columnNameOrIndex) :
                    columnNameOrIndex;
                const flex = `${width}`;
                if (isNumber(index)) {
                    if (index !== -1) {
                        if (headers) {
                            const header = headers.children[index];
                            if (header) {
                                header.style.flex = flex;
                            }
                        }
                        for (let i = 0; i < this.rowElements.length; i++) {
                            const cellElement = this.rowElements[i].children[index];
                            if (cellElement) {
                                cellElement.style.flex = flex;
                            }
                        }
                    }
                }
                else {
                    if (headers) {
                        for (let i = 0; i < headers.children.length; i++) {
                            headers.children[i].style.flex = flex;
                        }
                    }
                    for (let i = 0; i < this.rowElements.length; i++) {
                        const row = this.rowElements[i];
                        for (let i = 0; i < row.children.length; i++) {
                            row.children[i].style.flex = flex;
                        }
                    }
                }
                this.renderColumnDragHandles();
                this.emit({
                    type: 'afterResizeColumn',
                    width,
                    index,
                    name: isNumber(index) ? this.columnNames[index] : void 0
                });
            }
            /**
             * Emits an event on this data grid to all registered callbacks of the
             * given event.
             *
             * @internal
             *
             * @param e
             * Event object with event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Add class to given element to toggle highlight.
             *
             * @internal
             *
             * @param row
             * Row to highlight.
             */
            toggleRowHighlight(row) {
                if (this.hoveredRow && this.hoveredRow.classList.contains('hovered')) {
                    this.hoveredRow.classList.remove('hovered');
                }
                row && (row.classList.contains('hovered') ?
                    row.classList.remove('hovered') : row.classList.add('hovered'));
            }
            /**
             * Registers a callback for a specific event.
             *
             * @internal
             *
             * @param type
             * Event type as a string.
             *
             * @param callback
             * Function to register for an event callback.
             *
             * @return
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Scroll to a given row.
             *
             * @internal
             *
             * @param row
             * Row number
             */
            scrollToRow(row) {
                this.outerContainer.scrollTop = row * this.options.cellHeight;
            }
            // ---------------- Private methods
            /**
             * Check which columns should be displayed based on the individual
             * column `show` option.
             * @internal
             */
            getColumnsToDisplay() {
                const columnsOptions = this.options.columns, tableColumns = this.dataTable.modified.getColumnNames(), filteredColumns = [];
                for (let i = 0; i < tableColumns.length; i++) {
                    const columnName = tableColumns[i];
                    const column = columnsOptions[columnName];
                    if (column && defined(column.show)) {
                        if (columnsOptions[columnName].show) {
                            filteredColumns.push(columnName);
                        }
                    }
                    else {
                        filteredColumns.push(columnName);
                    }
                }
                return filteredColumns;
            }
            /**
             * Determine whether a column is editable or not.
             *
             * @internal
             *
             * @param columnName
             * Name of the column to test.
             *
             * @return
             * Returns true when the column is editable, or false.
             */
            isColumnEditable(columnName) {
                const columnOptions = this.options.columns[columnName] || {};
                return pick(columnOptions.editable, this.options.editable);
            }
            /**
             * Get a reference to the underlying DataTable from options, or create one
             * if needed.
             *
             * @internal
             *
             * @return
             * DataTable for the DataGrid instance.
             */
            initDataTable() {
                if (this.options.dataTable) {
                    return this.options.dataTable;
                }
                return new DataTable();
            }
            /**
             * Render the data grid. To be called on first render, as well as when
             * options change, or the underlying data changes.
             * @internal
             */
            render() {
                const { options } = this;
                this.prevTop = -1;
                this.bottom = false;
                emptyHTMLElement(this.innerContainer);
                if (options.columnHeaders.enabled) {
                    this.columnNames = this.getColumnsToDisplay();
                    this.renderColumnHeaders();
                }
                else {
                    this.outerContainer.style.top = '0';
                }
                this.renderInitialRows();
                this.addEvents();
                this.updateScrollingLength();
                this.updateVisibleCells();
                if (options.columnHeaders.enabled && options.resizableColumns) {
                    this.renderColumnDragHandles();
                }
                this.updateGridElements();
                this.gridContainer.ariaLabel = `Grid with ${this.dataTable.getColumnNames().length} columns and ${this.dataTable.getRowCount()} rows.`;
            }
            /**
             * Add internal event listeners to the grid.
             * @internal
             */
            addEvents() {
                this.outerContainer.addEventListener('scroll', (e) => {
                    this.onScroll(e);
                });
                document.addEventListener('click', (e) => {
                    this.onDocumentClick(e);
                });
                this.container.addEventListener('mouseover', (e) => {
                    this.handleMouseOver(e);
                });
            }
            /**
             * Changes the content of the rendered cells. This is used to simulate
             * scrolling.
             *
             * @internal
             *
             * @param force
             * Whether to force the update regardless of whether the position of the
             * first row has not been changed.
             */
            updateVisibleCells(force = false) {
                let scrollTop = this.outerContainer.scrollTop;
                if (H.isSafari) {
                    scrollTop = clamp(scrollTop, 0, (this.outerContainer.scrollHeight -
                        this.outerContainer.clientHeight));
                }
                let i = Math.floor(scrollTop / this.options.cellHeight);
                if (i === this.prevTop && !force) {
                    return;
                }
                this.prevTop = i;
                const columnsInPresentationOrder = this.columnNames;
                const rowCount = this.dataTable.modified.getRowCount();
                for (let j = 0; j < this.rowElements.length && i < rowCount; j++, i++) {
                    const rowElement = this.rowElements[j];
                    rowElement.dataset.rowIndex = String(i);
                    const cellElements = rowElement.childNodes;
                    for (let k = 0, kEnd = columnsInPresentationOrder.length; k < kEnd; k++) {
                        const cell = cellElements[k], column = columnsInPresentationOrder[k], value = this.dataTable.modified
                            .getCell(columnsInPresentationOrder[k], i);
                        cell.textContent = this.formatCell(value, column);
                        // TODO: consider adding these dynamically to the input element
                        cell.dataset.originalData = '' + value;
                        cell.dataset.columnName = columnsInPresentationOrder[k];
                        // TODO: get this from the store if set?
                        cell.dataset.dataType = typeof value;
                        if (k === 0) { // First column, that is x
                            rowElement.dataset.rowXIndex =
                                String(isNumber(value) ? value : i);
                        }
                    }
                }
                // Scroll innerContainer to align the bottom of the last row with the
                // bottom of the grid when scrolled to the end
                if (this.prevTop + this.scrollEndRowCount === rowCount) {
                    if (!this.bottom && this.scrollEndTop) {
                        this.bottom = true;
                        this.innerContainer.scrollTop = this.scrollEndTop;
                    }
                }
                else if (this.bottom) {
                    this.bottom = false;
                    this.innerContainer.scrollTop = 0;
                }
            }
            /**
             * Handle user scrolling the grid
             *
             * @internal
             *
             * @param e
             * Related scroll event.
             */
            onScroll(e) {
                e.preventDefault();
                window.requestAnimationFrame(this.updateVisibleCells.bind(this, false));
            }
            /**
             * Handle the user starting interaction with a cell.
             *
             * @internal
             *
             * @param cellEl
             * The clicked cell.
             *
             * @param columnName
             * The column the clicked cell belongs to.
             */
            onCellClick(cellEl, columnName) {
                if (this.isColumnEditable(columnName)) {
                    let input = cellEl.querySelector('input');
                    const cellValue = cellEl.getAttribute('data-original-data');
                    if (!input) {
                        this.removeCellInputElement();
                        // Replace cell contents with an input element
                        const inputHeight = cellEl.clientHeight;
                        cellEl.textContent = '';
                        input = this.cellInputEl = document.createElement('input');
                        input.style.height = inputHeight + 'px';
                        input.className = Globals.classNames.cellInput;
                        cellEl.appendChild(input);
                        input.focus();
                        input.value = cellValue || '';
                    }
                    // Emit for use in extensions
                    this.emit({ type: 'cellClick', input });
                }
            }
            /**
             * Handle the user clicking somewhere outside the grid.
             *
             * @internal
             *
             * @param e
             * Related mouse event.
             */
            onDocumentClick(e) {
                if (this.cellInputEl && e.target) {
                    const cellEl = this.cellInputEl.parentNode;
                    const isClickInInput = cellEl && cellEl.contains(e.target);
                    if (!isClickInInput) {
                        this.removeCellInputElement();
                    }
                }
            }
            /**
             * Handle hovering over rows- highlight proper row if needed.
             *
             * @internal
             *
             * @param e
             * Related mouse event.
             */
            handleMouseOver(e) {
                const target = e.target;
                if (target && target.classList.contains(Globals.classNames.cell)) {
                    const row = target.parentElement;
                    this.toggleRowHighlight(row);
                    this.hoveredRow = row;
                    fireEvent(this.container, 'dataGridHover', { row });
                }
                else if (this.hoveredRow) {
                    this.toggleRowHighlight();
                    this.hoveredRow = void 0;
                }
            }
            /**
             * Remove the <input> overlay and update the cell value
             * @internal
             */
            removeCellInputElement() {
                const cellInputEl = this.cellInputEl;
                if (cellInputEl) {
                    const parentNode = cellInputEl.parentNode;
                    // TODO: This needs to modify DataTable. The change in DataTable
                    // should cause a re-render?
                    if (parentNode) {
                        const cellValueType = parentNode.getAttribute('data-data-type'), columnName = parentNode.getAttribute('data-column-name');
                        let cellValue = cellInputEl.value;
                        if (cellValueType === 'number') {
                            cellValue = parseFloat(cellValue);
                        }
                        parentNode.textContent =
                            this.formatCell(cellValue, columnName || '');
                    }
                    cellInputEl.remove();
                    delete this.cellInputEl;
                }
            }
            /**
             * Updates the scroll container to reflect the data size.
             * @internal
             */
            updateScrollingLength() {
                const columnsInPresentationOrder = this.columnNames;
                let i = this.dataTable.modified.getRowCount() - 1;
                let height = 0;
                const top = i - this.getNumRowsToDraw();
                const outerHeight = this.outerContainer.clientHeight;
                // Explicit height is needed for overflow: hidden to work, to make sure
                // innerContainer is not scrollable by user input
                this.innerContainer.style.height = outerHeight + 'px';
                // Calculate how many of the bottom rows is needed to potentially
                // overflow innerContainer and use it to add extra rows to scrollHeight
                // to ensure it is possible to scroll to the last row when rows have
                // variable heights
                for (let j = 0; j < this.rowElements.length; j++) {
                    const cellElements = this.rowElements[j].childNodes;
                    for (let k = 0; k < columnsInPresentationOrder.length; k++) {
                        cellElements[k].textContent = dataTableCellToString(this.dataTable.modified
                            .getCell(columnsInPresentationOrder[k], i - j));
                    }
                }
                this.scrollContainer.appendChild(this.innerContainer);
                for (let j = 0; i > top; i--, j++) {
                    height += this.rowElements[j].offsetHeight;
                    if (height > outerHeight) {
                        i--;
                        break;
                    }
                }
                const extraRows = i - top;
                this.scrollEndRowCount = this.rowElements.length - extraRows;
                // How much innerContainer needs to be scrolled to fully show the last
                // row when scrolled to the end
                this.scrollEndTop = height - outerHeight;
                const scrollHeight = (this.dataTable.modified.getRowCount() + extraRows) *
                    this.options.cellHeight;
                this.scrollContainer.style.height = scrollHeight + 'px';
            }
            /**
             * Calculates the number of rows to render pending of cell sizes.
             *
             * @internal
             *
             * @return
             * The number rows to render.
             */
            getNumRowsToDraw() {
                return Math.min(this.dataTable.modified.getRowCount(), Math.ceil(this.outerContainer.offsetHeight / this.options.cellHeight));
            }
            /**
             * Internal method that calculates the data grid height. If the container
             * has a height declared in CSS it uses that, otherwise it uses a default.
             * @internal
             */
            getDataGridSize() {
                const grid = this, options = grid.options, { height } = grid.container.getBoundingClientRect();
                // If the container has a height declared in CSS, use that.
                if (height > 2) {
                    return height;
                }
                // Use the default height if the container has no height declared in CSS
                return options.defaultHeight;
            }
            /**
             * Renders a data cell.
             *
             * @internal
             *
             * @param parentRow
             * The parent row to add the cell to.
             *
             * @param columnName
             * The column the cell belongs to.
             */
            renderCell(parentRow, columnName) {
                let className = Globals.classNames.cell;
                if (!this.isColumnEditable(columnName)) {
                    className += ` ${className}-readonly`;
                }
                const cellEl = makeDiv(className);
                cellEl.style.minHeight = this.options.cellHeight + 'px';
                cellEl.addEventListener('click', () => this.onCellClick(cellEl, columnName));
                parentRow.appendChild(cellEl);
            }
            /**
             * Renders a row of data.
             * @internal
             */
            renderRow() {
                const rowEl = makeDiv(Globals.classNames.row);
                for (let i = 0; i < this.columnNames.length; i++) {
                    this.renderCell(rowEl, this.columnNames[i]);
                }
                this.innerContainer.appendChild(rowEl);
                this.rowElements.push(rowEl);
            }
            /**
             * Allows formatting of the header cell text based on provided format
             * option. If that is not provided, the column name is returned.
             * @internal
             *
             * @param columnName
             * Column name to format.
             */
            formatHeaderCell(columnName) {
                const options = this.options, columnOptions = options.columns[columnName], headerFormat = columnOptions && columnOptions.headerFormat;
                if (headerFormat) {
                    return Templating.format(headerFormat, { text: columnName });
                }
                return columnName;
            }
            /**
             * Allows formatting of the cell text based on provided format option.
             * If that is not provided, the cell value is returned.
             * @internal
             *
             * @param  cellValue
             * The value of the cell to format.
             *
             * @param  column
             * The column name the cell belongs to.
             */
            formatCell(cellValue, column) {
                const options = this.options, columnOptions = options.columns[column], cellFormat = columnOptions && columnOptions.cellFormat, cellFormatter = columnOptions && columnOptions.cellFormatter;
                let formattedCell = defined(cellValue) ? cellValue : '';
                if (cellFormat) {
                    if (typeof cellValue === 'number' &&
                        cellFormat.indexOf('value') > -1) {
                        formattedCell =
                            Templating.format(cellFormat, { value: cellValue });
                    }
                    else if (typeof cellValue === 'string' &&
                        cellFormat.indexOf('text') > -1) {
                        formattedCell =
                            Templating.format(cellFormat, { text: cellValue });
                    }
                }
                if (cellFormatter) {
                    return cellFormatter.call({ value: cellValue });
                }
                return formattedCell.toString();
            }
            /**
             * Render a column header for a column.
             *
             * @internal
             *
             * @param parentEl
             * The parent element of the column header.
             *
             * @param columnName
             * The name of the column.
             */
            renderColumnHeader(parentEl, columnName) {
                let className = Globals.classNames.columnHeader;
                if (!this.isColumnEditable(columnName)) {
                    className += ` ${className}-readonly`;
                }
                const headerEl = makeDiv(className);
                headerEl.style.minHeight = this.options.cellHeight + 'px';
                headerEl.style.maxHeight = this.options.cellHeight * 2 + 'px';
                headerEl.textContent = this.formatHeaderCell(columnName);
                parentEl.appendChild(headerEl);
            }
            /**
             * Render the column headers of the table.
             * @internal
             */
            renderColumnHeaders() {
                const columnNames = this.columnNames, columnHeadersContainer = this.columnHeadersContainer =
                    this.columnHeadersContainer ||
                        makeDiv(`${Globals.classNamePrefix}column-headers`);
                emptyHTMLElement(columnHeadersContainer);
                columnNames.forEach(this.renderColumnHeader.bind(this, columnHeadersContainer));
                if (!this.headerContainer) {
                    this.headerContainer =
                        makeDiv(`${Globals.classNamePrefix}header-container`);
                    this.headerContainer.appendChild(columnHeadersContainer);
                }
                this.gridContainer.insertBefore(this.headerContainer, this.outerContainer);
                this.updateColumnHeaders();
            }
            /**
             * Refresh container elements to adapt them to new container dimensions.
             * @internal
             */
            updateGridElements() {
                this.updateColumnHeaders();
                this.redrawRowElements();
                this.updateDragHandlesPosition();
            }
            /**
             * Update the column headers of the table.
             * @internal
             */
            updateColumnHeaders() {
                const headersContainer = this.columnHeadersContainer;
                if (!headersContainer) {
                    return;
                }
                // Handle overflowing text in headers.
                for (let i = 0; i < this.columnNames.length; i++) {
                    const columnName = this.columnNames[i], header = headersContainer.children[i], overflowWidth = this.overflowHeaderWidths[i];
                    if (header.scrollWidth > header.clientWidth) {
                        // Headers overlap
                        this.overflowHeaderWidths[i] = header.scrollWidth;
                        header.textContent = this.formatHeaderCell(columnName)
                            .split(' ').map((word) => (word.length < 4 ? word : word.slice(0, 2) + '...')).join(' ');
                    }
                    else if (isNumber(overflowWidth) &&
                        overflowWidth <= header.clientWidth) {
                        // Headers not overlap
                        this.overflowHeaderWidths[i] = null;
                        header.textContent = this.formatHeaderCell(columnName);
                    }
                }
                // Offset the outer container by the header row height.
                this.outerContainer.style.top = headersContainer.clientHeight + 'px';
                // Header columns alignment when scrollbar is shown.
                if (headersContainer.lastChild) {
                    headersContainer.lastChild
                        .style.marginRight = (this.outerContainer.offsetWidth -
                        this.outerContainer.clientWidth) + 'px';
                }
            }
            /**
             * Redraw existing row elements.
             * @internal
             */
            redrawRowElements() {
                if (!this.rowElements.length) {
                    return;
                }
                const prevColumnFlexes = [], firstRowChildren = this.rowElements[0].children;
                for (let i = 0; i < firstRowChildren.length; i++) {
                    prevColumnFlexes.push(firstRowChildren[i].style.flex);
                }
                emptyHTMLElement(this.innerContainer);
                this.renderInitialRows();
                this.updateScrollingLength();
                this.updateVisibleCells(true);
                for (let i = 0; i < this.rowElements.length; i++) {
                    const row = this.rowElements[i];
                    for (let j = 0; j < row.childElementCount; j++) {
                        row.children[j].style.flex =
                            prevColumnFlexes[j];
                    }
                }
            }
            /**
             * Update the column drag handles position.
             * @internal
             */
            updateDragHandlesPosition() {
                const headersContainer = this.columnHeadersContainer, handlesContainer = this.columnDragHandlesContainer;
                if (!handlesContainer || !headersContainer) {
                    return;
                }
                for (let i = 0; i < handlesContainer.childElementCount - 1; i++) {
                    const handle = handlesContainer.children[i], header = headersContainer.children[i + 1];
                    handle.style.height = headersContainer.clientHeight + 'px';
                    handle.style.left = header.offsetLeft - 2 + 'px';
                }
            }
            /**
             * Render initial rows before the user starts scrolling.
             * @internal
             */
            renderInitialRows() {
                this.rowElements = [];
                const rowsToDraw = this.getNumRowsToDraw();
                for (let i = 0; i < rowsToDraw; i++) {
                    this.renderRow();
                }
            }
            /**
             * Render the drag handles for resizing columns.
             * @internal
             */
            renderColumnDragHandles() {
                if (!this.columnHeadersContainer) {
                    return;
                }
                const container = this.columnDragHandlesContainer = (this.columnDragHandlesContainer ||
                    makeDiv(`${Globals.classNamePrefix}col-resize-container`));
                const columnEls = this.columnHeadersContainer.children;
                const handleHeight = this.options.cellHeight;
                emptyHTMLElement(container);
                for (let i = 1; i < columnEls.length; ++i) {
                    const col = columnEls[i];
                    const handle = makeDiv(`${Globals.classNamePrefix}col-resize-handle`);
                    handle.style.height = handleHeight + 'px';
                    handle.style.left = col.offsetLeft - 2 + 'px';
                    handle.addEventListener('mouseover', () => {
                        if (!this.draggedResizeHandle) {
                            handle.style.opacity = '1';
                        }
                    });
                    handle.addEventListener('mouseleave', () => {
                        if (!this.draggedResizeHandle) {
                            handle.style.opacity = '0';
                        }
                    });
                    handle.addEventListener('mousedown', this.onHandleMouseDown.bind(this, handle, i));
                    container.appendChild(handle);
                }
                this.renderColumnResizeCrosshair(container);
                document.addEventListener('mouseup', (e) => {
                    if (this.draggedResizeHandle) {
                        this.stopColumnResize(this.draggedResizeHandle, e);
                    }
                });
                document.addEventListener('mousemove', (e) => {
                    if (this.draggedResizeHandle) {
                        this.updateColumnResizeDrag(e);
                    }
                });
                if (this.headerContainer) {
                    this.headerContainer.appendChild(container);
                }
            }
            /**
             * Renders the crosshair shown when resizing columns.
             *
             * @internal
             *
             * @param container
             * The container to place the crosshair in.
             */
            renderColumnResizeCrosshair(container) {
                const el = this.columnResizeCrosshair = (this.columnResizeCrosshair ||
                    makeDiv(`${Globals.classNamePrefix}col-resize-crosshair`));
                const handleHeight = this.options.cellHeight;
                el.style.top = handleHeight + 'px';
                el.style.height = this.innerContainer.offsetHeight + 'px';
                container.appendChild(el);
            }
            /**
             * On column resize handle click.
             *
             * @internal
             *
             * @param handle
             * The drag handle being clicked.
             *
             * @param colRightIx
             * The column ix to the right of the resize handle.
             *
             * @param e
             * The mousedown event.
             */
            onHandleMouseDown(handle, colRightIx, e) {
                if (this.draggedResizeHandle) {
                    return;
                }
                e.preventDefault();
                this.draggedResizeHandle = handle;
                this.draggedColumnRightIx = colRightIx;
                this.dragResizeStart = e.pageX;
                const crosshair = this.columnResizeCrosshair;
                if (crosshair) {
                    crosshair.style.left = (handle.offsetLeft + handle.offsetWidth / 2 -
                        crosshair.offsetWidth / 2 + 'px');
                    crosshair.style.opacity = '1';
                }
            }
            /**
             * Update as we drag column resizer
             * @internal
             */
            updateColumnResizeDrag(e) {
                const handle = this.draggedResizeHandle;
                const crosshair = this.columnResizeCrosshair;
                const colRightIx = this.draggedColumnRightIx;
                const colHeaders = this.columnHeadersContainer;
                if (!handle ||
                    !crosshair ||
                    colRightIx === null ||
                    !colHeaders ||
                    !this.dragResizeStart) {
                    return;
                }
                const col = colHeaders.children[colRightIx];
                const diff = e.pageX - this.dragResizeStart;
                const newPos = col.offsetLeft + diff;
                handle.style.left = newPos - handle.offsetWidth / 2 + 'px';
                crosshair.style.left = newPos - crosshair.offsetWidth / 2 + 'px';
            }
            /**
             * Stop resizing a column.
             *
             * @internal
             *
             * @param handle
             * The related resize handle.
             *
             * @param e
             * The related mouse event.
             */
            stopColumnResize(handle, e) {
                const crosshair = this.columnResizeCrosshair;
                const colRightIx = this.draggedColumnRightIx;
                const colContainer = this.columnHeadersContainer;
                if (!crosshair ||
                    !colContainer ||
                    !this.dragResizeStart ||
                    colRightIx === null) {
                    return;
                }
                handle.style.opacity = '0';
                crosshair.style.opacity = '0';
                const colLeft = colContainer.children[colRightIx - 1];
                const colRight = colContainer.children[colRightIx];
                const diff = e.pageX - this.dragResizeStart;
                const newWidthLeft = colLeft.offsetWidth + diff;
                const newWidthRight = colRight.offsetWidth - diff;
                const diffRatioLeft = newWidthLeft / colLeft.offsetWidth;
                const diffRatioRight = newWidthRight / colRight.offsetWidth;
                const leftFlexRatio = ((colLeft.style.flex ? parseFloat(colLeft.style.flex) : 1) *
                    diffRatioLeft);
                const rightFlexRatio = ((colRight.style.flex ? parseFloat(colRight.style.flex) : 1) *
                    diffRatioRight);
                this.resizeColumn(leftFlexRatio, colRightIx - 1);
                this.resizeColumn(rightFlexRatio, colRightIx);
                this.draggedResizeHandle = null;
                this.draggedColumnRightIx = null;
                this.updateGridElements();
            }
            /**
             * Update the size of grid container.
             *
             * @internal
             *
             * @param width
             * The new width in pixel, or `null` for no change.
             *
             * @param height
             * The new height in pixel, or `null` for no change.
             */
            setSize(width, height) {
                if (width) {
                    this.innerContainer.style.width = width + 'px';
                }
                if (height) {
                    this.gridContainer.style.height = this.getDataGridSize() + 'px';
                    this.outerContainer.style.height =
                        height -
                            (this.options.cellHeight + // Header height
                                this.getMarginHeight(height)) + 'px';
                }
                this.render();
            }
            /**
             * If the grid is in the parent container that has margins, calculate the
             * height of the margins.
             * @internal
             *
             * @param  height
             * The height of the parent container.
             */
            getMarginHeight(height) {
                return height - this.gridContainer.getBoundingClientRect().height;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for all DataGrid instances.
         */
        DataGrid.defaultOptions = DataGridDefaults;
        /* *
         *
         *  Default Export
         *
         * */

        return DataGrid;
    });
    _registerModule(_modules, 'masters/datagrid.src.js', [_modules['DataGrid/Globals.js'], _modules['DataGrid/DataGrid.js']], function (Globals, _DataGrid) {

        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        const G = Globals;
        G.DataGrid = _DataGrid;
        /* *
         *
         *  Classic Export
         *
         * */
        if (!G.win.DataGrid) {
            G.win.DataGrid = G;
        }
        /* *
         *
         *  Default Export
         *
         * */

        return G;
    });
}));