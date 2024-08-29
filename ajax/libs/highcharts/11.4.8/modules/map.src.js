/**
 * @license Highmaps JS v11.4.8 (2024-08-29)
 *
 * Highmaps as a plugin for Highcharts or Highcharts Stock.
 *
 * (c) 2011-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/map', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Core/Axis/Color/ColorAxisComposition.js', [_modules['Core/Color/Color.js'], _modules['Core/Utilities.js']], function (Color, U) {
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
        const { addEvent, extend, merge, pick, splat } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ColorAxisComposition;
        (function (ColorAxisComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Variables
             *
             * */
            let ColorAxisConstructor;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(ColorAxisClass, ChartClass, FxClass, LegendClass, SeriesClass) {
                const chartProto = ChartClass.prototype, fxProto = FxClass.prototype, seriesProto = SeriesClass.prototype;
                if (!chartProto.collectionsWithUpdate.includes('colorAxis')) {
                    ColorAxisConstructor = ColorAxisClass;
                    chartProto.collectionsWithUpdate.push('colorAxis');
                    chartProto.collectionsWithInit.colorAxis = [
                        chartProto.addColorAxis
                    ];
                    addEvent(ChartClass, 'afterGetAxes', onChartAfterGetAxes);
                    wrapChartCreateAxis(ChartClass);
                    fxProto.fillSetter = wrapFxFillSetter;
                    fxProto.strokeSetter = wrapFxStrokeSetter;
                    addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
                    addEvent(LegendClass, 'afterColorizeItem', onLegendAfterColorizeItem);
                    addEvent(LegendClass, 'afterUpdate', onLegendAfterUpdate);
                    extend(seriesProto, {
                        optionalAxis: 'colorAxis',
                        translateColors: seriesTranslateColors
                    });
                    extend(seriesProto.pointClass.prototype, {
                        setVisible: pointSetVisible
                    });
                    addEvent(SeriesClass, 'afterTranslate', onSeriesAfterTranslate, { order: 1 });
                    addEvent(SeriesClass, 'bindAxes', onSeriesBindAxes);
                }
            }
            ColorAxisComposition.compose = compose;
            /**
             * Extend the chart getAxes method to also get the color axis.
             * @private
             */
            function onChartAfterGetAxes() {
                const { userOptions } = this;
                this.colorAxis = [];
                // If a `colorAxis` config is present in the user options (not in a
                // theme), instanciate it.
                if (userOptions.colorAxis) {
                    userOptions.colorAxis = splat(userOptions.colorAxis);
                    userOptions.colorAxis.map((axisOptions) => (new ColorAxisConstructor(this, axisOptions)));
                }
            }
            /**
             * Add the color axis. This also removes the axis' own series to prevent
             * them from showing up individually.
             * @private
             */
            function onLegendAfterGetAllItems(e) {
                const colorAxes = this.chart.colorAxis || [], destroyItem = (item) => {
                    const i = e.allItems.indexOf(item);
                    if (i !== -1) {
                        // #15436
                        this.destroyItem(e.allItems[i]);
                        e.allItems.splice(i, 1);
                    }
                };
                let colorAxisItems = [], options, i;
                colorAxes.forEach(function (colorAxis) {
                    options = colorAxis.options;
                    if (options && options.showInLegend) {
                        // Data classes
                        if (options.dataClasses && options.visible) {
                            colorAxisItems = colorAxisItems.concat(colorAxis.getDataClassLegendSymbols());
                            // Gradient legend
                        }
                        else if (options.visible) {
                            // Add this axis on top
                            colorAxisItems.push(colorAxis);
                        }
                        // If dataClasses are defined or showInLegend option is not set
                        // to true, do not add color axis' series to legend.
                        colorAxis.series.forEach(function (series) {
                            if (!series.options.showInLegend || options.dataClasses) {
                                if (series.options.legendType === 'point') {
                                    series.points.forEach(function (point) {
                                        destroyItem(point);
                                    });
                                }
                                else {
                                    destroyItem(series);
                                }
                            }
                        });
                    }
                });
                i = colorAxisItems.length;
                while (i--) {
                    e.allItems.unshift(colorAxisItems[i]);
                }
            }
            /**
             * @private
             */
            function onLegendAfterColorizeItem(e) {
                if (e.visible && e.item.legendColor) {
                    e.item.legendItem.symbol.attr({
                        fill: e.item.legendColor
                    });
                }
            }
            /**
             * Updates in the legend need to be reflected in the color axis. (#6888)
             * @private
             */
            function onLegendAfterUpdate(e) {
                this.chart.colorAxis?.forEach((colorAxis) => {
                    colorAxis.update({}, e.redraw);
                });
            }
            /**
             * Calculate and set colors for points.
             * @private
             */
            function onSeriesAfterTranslate() {
                if (this.chart.colorAxis &&
                    this.chart.colorAxis.length ||
                    this.colorAttribs) {
                    this.translateColors();
                }
            }
            /**
             * Add colorAxis to series axisTypes.
             * @private
             */
            function onSeriesBindAxes() {
                const axisTypes = this.axisTypes;
                if (!axisTypes) {
                    this.axisTypes = ['colorAxis'];
                }
                else if (axisTypes.indexOf('colorAxis') === -1) {
                    axisTypes.push('colorAxis');
                }
            }
            /**
             * Set the visibility of a single point
             * @private
             * @function Highcharts.colorPointMixin.setVisible
             * @param {boolean} visible
             */
            function pointSetVisible(vis) {
                const point = this, method = vis ? 'show' : 'hide';
                point.visible = point.options.visible = Boolean(vis);
                // Show and hide associated elements
                ['graphic', 'dataLabel'].forEach(function (key) {
                    if (point[key]) {
                        point[key][method]();
                    }
                });
                this.series.buildKDTree(); // Rebuild kdtree #13195
            }
            ColorAxisComposition.pointSetVisible = pointSetVisible;
            /**
             * In choropleth maps, the color is a result of the value, so this needs
             * translation too
             * @private
             * @function Highcharts.colorSeriesMixin.translateColors
             */
            function seriesTranslateColors() {
                const series = this, points = this.getPointsCollection(), // #17945
                nullColor = this.options.nullColor, colorAxis = this.colorAxis, colorKey = this.colorKey;
                points.forEach((point) => {
                    const value = point.getNestedProperty(colorKey), color = point.options.color || (point.isNull || point.value === null ?
                        nullColor :
                        (colorAxis && typeof value !== 'undefined') ?
                            colorAxis.toColor(value, point) :
                            point.color || series.color);
                    if (color && point.color !== color) {
                        point.color = color;
                        if (series.options.legendType === 'point' &&
                            point.legendItem &&
                            point.legendItem.label) {
                            series.chart.legend.colorizeItem(point, point.visible);
                        }
                    }
                });
            }
            /**
             * @private
             */
            function wrapChartCreateAxis(ChartClass) {
                const superCreateAxis = ChartClass.prototype.createAxis;
                ChartClass.prototype.createAxis = function (type, options) {
                    const chart = this;
                    if (type !== 'colorAxis') {
                        return superCreateAxis.apply(chart, arguments);
                    }
                    const axis = new ColorAxisConstructor(chart, merge(options.axis, {
                        index: chart[type].length,
                        isX: false
                    }));
                    chart.isDirtyLegend = true;
                    // Clear before 'bindAxes' (#11924)
                    chart.axes.forEach((axis) => {
                        axis.series = [];
                    });
                    chart.series.forEach((series) => {
                        series.bindAxes();
                        series.isDirtyData = true;
                    });
                    if (pick(options.redraw, true)) {
                        chart.redraw(options.animation);
                    }
                    return axis;
                };
            }
            /**
             * Handle animation of the color attributes directly.
             * @private
             */
            function wrapFxFillSetter() {
                this.elem.attr('fill', color(this.start).tweenTo(color(this.end), this.pos), void 0, true);
            }
            /**
             * Handle animation of the color attributes directly.
             * @private
             */
            function wrapFxStrokeSetter() {
                this.elem.attr('stroke', color(this.start).tweenTo(color(this.end), this.pos), void 0, true);
            }
        })(ColorAxisComposition || (ColorAxisComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ColorAxisComposition;
    });
    _registerModule(_modules, 'Core/Axis/Color/ColorAxisDefaults.js', [], function () {
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
         * A color axis for series. Visually, the color
         * axis will appear as a gradient or as separate items inside the
         * legend, depending on whether the axis is scalar or based on data
         * classes.
         *
         * For supported color formats, see the
         * [docs article about colors](https://www.highcharts.com/docs/chart-design-and-style/colors).
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
         * Color axis does not work with: `sankey`, `sunburst`, `dependencywheel`,
         * `networkgraph`, `wordcloud`, `venn`, `gauge` and `solidgauge` series
         * types.
         *
         * Since v7.2.0 `colorAxis` can also be an array of options objects.
         *
         * See [the Axis object](/class-reference/Highcharts.Axis) for
         * programmatic access to the axis.
         *
         * @sample       {highcharts} highcharts/coloraxis/custom-color-key
         *               Column chart with color axis
         * @sample       {highcharts} highcharts/coloraxis/horizontal-layout
         *               Horizontal layout
         * @sample       {highmaps} maps/coloraxis/dataclasscolor
         *               With data classes
         * @sample       {highmaps} maps/coloraxis/mincolor-maxcolor
         *               Min color and max color
         *
         * @extends      xAxis
         * @excluding    alignTicks, allowDecimals, alternateGridColor, breaks,
         *               categories, crosshair, dateTimeLabelFormats, left,
         *               lineWidth, linkedTo, maxZoom, minRange, minTickInterval,
         *               offset, opposite, pane, plotBands, plotLines,
         *               reversedStacks, scrollbar, showEmpty, title, top,
         *               zoomEnabled
         * @product      highcharts highstock highmaps
         * @type         {*|Array<*>}
         * @optionparent colorAxis
         */
        const colorAxisDefaults = {
            /**
             * Whether to allow decimals on the color axis.
             * @type      {boolean}
             * @default   true
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.allowDecimals
             */
            /**
             * Determines how to set each data class' color if no individual
             * color is set. The default value, `tween`, computes intermediate
             * colors between `minColor` and `maxColor`. The other possible
             * value, `category`, pulls colors from the global or chart specific
             * [colors](#colors) array.
             *
             * @sample {highmaps} maps/coloraxis/dataclasscolor/
             *         Category colors
             *
             * @type       {string}
             * @default    tween
             * @product    highcharts highstock highmaps
             * @validvalue ["tween", "category"]
             * @apioption  colorAxis.dataClassColor
             */
            /**
             * An array of data classes or ranges for the choropleth map. If
             * none given, the color axis is scalar and values are distributed
             * as a gradient between the minimum and maximum colors.
             *
             * @sample {highmaps} maps/demo/data-class-ranges/
             *         Multiple ranges
             *
             * @sample {highmaps} maps/demo/data-class-two-ranges/
             *         Two ranges
             *
             * @type      {Array<*>}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.dataClasses
             */
            /**
             * The layout of the color axis. Can be `'horizontal'` or `'vertical'`.
             * If none given, the color axis has the same layout as the legend.
             *
             * @sample highcharts/coloraxis/horizontal-layout/
             *         Horizontal color axis layout with vertical legend
             *
             * @type      {string|undefined}
             * @since     7.2.0
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.layout
             */
            /**
             * The color of each data class. If not set, the color is pulled
             * from the global or chart-specific [colors](#colors) array. In
             * styled mode, this option is ignored. Instead, use colors defined
             * in CSS.
             *
             * @sample {highmaps} maps/demo/data-class-two-ranges/
             *         Explicit colors
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.dataClasses.color
             */
            /**
             * The start of the value range that the data class represents,
             * relating to the point value.
             *
             * The range of each `dataClass` is closed in both ends, but can be
             * overridden by the next `dataClass`.
             *
             * @type      {number}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.dataClasses.from
             */
            /**
             * The name of the data class as it appears in the legend.
             * If no name is given, it is automatically created based on the
             * `from` and `to` values. For full programmatic control,
             * [legend.labelFormatter](#legend.labelFormatter) can be used.
             * In the formatter, `this.from` and `this.to` can be accessed.
             *
             * @sample {highmaps} maps/coloraxis/dataclasses-name/
             *         Named data classes
             *
             * @sample {highmaps} maps/coloraxis/dataclasses-labelformatter/
             *         Formatted data classes
             *
             * @type      {string}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.dataClasses.name
             */
            /**
             * The end of the value range that the data class represents,
             * relating to the point value.
             *
             * The range of each `dataClass` is closed in both ends, but can be
             * overridden by the next `dataClass`.
             *
             * @type      {number}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.dataClasses.to
             */
            /** @ignore-option */
            lineWidth: 0,
            /**
             * Padding of the min value relative to the length of the axis. A
             * padding of 0.05 will make a 100px axis 5px longer.
             *
             * @product highcharts highstock highmaps
             */
            minPadding: 0,
            /**
             * The maximum value of the axis in terms of map point values. If
             * `null`, the max value is automatically calculated. If the
             * `endOnTick` option is true, the max value might be rounded up.
             *
             * @sample {highmaps} maps/coloraxis/gridlines/
             *         Explicit min and max to reduce the effect of outliers
             *
             * @type      {number}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.max
             */
            /**
             * The minimum value of the axis in terms of map point values. If
             * `null`, the min value is automatically calculated. If the
             * `startOnTick` option is true, the min value might be rounded
             * down.
             *
             * @sample {highmaps} maps/coloraxis/gridlines/
             *         Explicit min and max to reduce the effect of outliers
             *
             * @type      {number}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.min
             */
            /**
             * Padding of the max value relative to the length of the axis. A
             * padding of 0.05 will make a 100px axis 5px longer.
             *
             * @product highcharts highstock highmaps
             */
            maxPadding: 0,
            /**
             * Color of the grid lines extending from the axis across the
             * gradient.
             *
             * @sample {highmaps} maps/coloraxis/gridlines/
             *         Grid lines demonstrated
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product   highcharts highstock highmaps
             */
            gridLineColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * The width of the grid lines extending from the axis across the
             * gradient of a scalar color axis.
             *
             * @sample {highmaps} maps/coloraxis/gridlines/
             *         Grid lines demonstrated
             *
             * @product highcharts highstock highmaps
             */
            gridLineWidth: 1,
            /**
             * The interval of the tick marks in axis units. When `null`, the
             * tick interval is computed to approximately follow the
             * `tickPixelInterval`.
             *
             * @type      {number}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.tickInterval
             */
            /**
             * If [tickInterval](#colorAxis.tickInterval) is `null` this option
             * sets the approximate pixel interval of the tick marks.
             *
             * @product highcharts highstock highmaps
             */
            tickPixelInterval: 72,
            /**
             * Whether to force the axis to start on a tick. Use this option
             * with the `maxPadding` option to control the axis start.
             *
             * @product highcharts highstock highmaps
             */
            startOnTick: true,
            /**
             * Whether to force the axis to end on a tick. Use this option with
             * the [maxPadding](#colorAxis.maxPadding) option to control the
             * axis end.
             *
             * @product highcharts highstock highmaps
             */
            endOnTick: true,
            /** @ignore */
            offset: 0,
            /**
             * The triangular marker on a scalar color axis that points to the
             * value of the hovered area. To disable the marker, set
             * `marker: null`.
             *
             * @sample {highmaps} maps/coloraxis/marker/
             *         Black marker
             *
             * @declare Highcharts.PointMarkerOptionsObject
             * @product highcharts highstock highmaps
             */
            marker: {
                /**
                 * Animation for the marker as it moves between values. Set to
                 * `false` to disable animation. Defaults to `{ duration: 50 }`.
                 *
                 * @type    {boolean|Partial<Highcharts.AnimationOptionsObject>}
                 * @product highcharts highstock highmaps
                 */
                animation: {
                    /** @internal */
                    duration: 50
                },
                /** @internal */
                width: 0.01,
                /**
                 * The color of the marker.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @product highcharts highstock highmaps
                 */
                color: "#999999" /* Palette.neutralColor40 */
            },
            /**
             * The axis labels show the number for each tick.
             *
             * For more live examples on label options, see [xAxis.labels in the
             * Highcharts API.](/highcharts#xAxis.labels)
             *
             * @extends xAxis.labels
             * @product highcharts highstock highmaps
             */
            labels: {
                distance: 8,
                /**
                 * How to handle overflowing labels on horizontal color axis. If set
                 * to `"allow"`, it will not be aligned at all. By default it
                 * `"justify"` labels inside the chart area. If there is room to
                 * move it, it will be aligned to the edge, else it will be removed.
                 *
                 * @validvalue ["allow", "justify"]
                 * @product    highcharts highstock highmaps
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
             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor/
             *         Min and max colors on scalar (gradient) axis
             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor-dataclasses/
             *         On data classes
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product highcharts highstock highmaps
             */
            minColor: "#e6e9ff" /* Palette.highlightColor10 */,
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
             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor/
             *         Min and max colors on scalar (gradient) axis
             * @sample {highmaps} maps/coloraxis/mincolor-maxcolor-dataclasses/
             *         On data classes
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product highcharts highstock highmaps
             */
            maxColor: "#0022ff" /* Palette.highlightColor100 */,
            /**
             * Color stops for the gradient of a scalar color axis. Use this in
             * cases where a linear gradient between a `minColor` and `maxColor`
             * is not sufficient. The stops is an array of tuples, where the
             * first item is a float between 0 and 1 assigning the relative
             * position in the gradient, and the second item is the color.
             *
             * @sample highcharts/coloraxis/coloraxis-stops/
             *         Color axis stops
             * @sample highcharts/coloraxis/color-key-with-stops/
             *         Color axis stops with custom colorKey
             * @sample {highmaps} maps/demo/heatmap/
             *         Heatmap with three color stops
             *
             * @type      {Array<Array<number,Highcharts.ColorString>>}
             * @product   highcharts highstock highmaps
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
             * @sample highcharts/coloraxis/logarithmic-with-emulate-negative-values/
             *         Logarithmic color axis with extension to emulate negative
             *         values
             *
             * @type      {Highcharts.ColorAxisTypeValue}
             * @default   linear
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.type
             */
            /**
             * Whether to reverse the axis so that the highest number is closest
             * to the origin. Defaults to `false` in a horizontal legend and
             * `true` in a vertical legend, where the smallest value starts on
             * top.
             *
             * @type      {boolean}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.reversed
             */
            /**
             * @product   highcharts highstock highmaps
             * @excluding afterBreaks, pointBreak, pointInBreak
             * @apioption colorAxis.events
             */
            /**
             * Fires when the legend item belonging to the colorAxis is clicked.
             * One parameter, `event`, is passed to the function.
             *
             * **Note:** This option is deprecated in favor of
             * [legend.events.itemClick](#legend.events.itemClick).
             *
             * @deprecated 11.4.4
             * @type       {Function}
             * @product    highcharts highstock highmaps
             * @apioption  colorAxis.events.legendItemClick
             */
            /**
             * The width of the color axis. If it's a number, it is interpreted as
             * pixels.
             *
             * If it's a percentage string, it is interpreted as percentages of the
             * total plot width.
             *
             * @sample    highcharts/coloraxis/width-and-height
             *            Percentage width and pixel height for color axis
             *
             * @type      {number|string}
             * @since     11.3.0
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.width
             */
            /**
             * The height of the color axis. If it's a number, it is interpreted as
             * pixels.
             *
             * If it's a percentage string, it is interpreted as percentages of the
             * total plot height.
             *
             * @sample    highcharts/coloraxis/width-and-height
             *            Percentage width and pixel height for color axis
             *
             * @type      {number|string}
             * @since     11.3.0
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.height
             */
            /**
             * Whether to display the colorAxis in the legend.
             *
             * @sample highcharts/coloraxis/hidden-coloraxis-with-3d-chart/
             *         Hidden color axis with 3d chart
             *
             * @see [heatmap.showInLegend](#series.heatmap.showInLegend)
             *
             * @since   4.2.7
             * @product highcharts highstock highmaps
             */
            showInLegend: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return colorAxisDefaults;
    });
    _registerModule(_modules, 'Core/Axis/Color/ColorAxisLike.js', [_modules['Core/Color/Color.js'], _modules['Core/Utilities.js']], function (Color, U) {
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
        const { merge } = U;
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
                const axis = this, chart = axis.chart, legendItem = axis.legendItem = axis.legendItem || {}, options = axis.options, userDataClasses = userOptions.dataClasses || [];
                let dataClass, dataClasses, colorCount = chart.options.chart.colorCount, colorCounter = 0, colors;
                axis.dataClasses = dataClasses = [];
                legendItem.labels = [];
                for (let i = 0, iEnd = userDataClasses.length; i < iEnd; ++i) {
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
                const axis = this, options = axis.options, stops = axis.stops = options.stops || [
                    [0, options.minColor || ''],
                    [1, options.maxColor || '']
                ];
                for (let i = 0, iEnd = stops.length; i < iEnd; ++i) {
                    stops[i].color = color(stops[i][1]);
                }
            }
            ColorAxisLike.initStops = initStops;
            /**
             * Normalize logarithmic values.
             * @private
             */
            function normalizedValue(value) {
                const axis = this, max = axis.max || 0, min = axis.min || 0;
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
                const axis = this;
                const dataClasses = axis.dataClasses;
                const stops = axis.stops;
                let pos, from, to, color, dataClass, i;
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
    _registerModule(_modules, 'Core/Axis/Color/ColorAxis.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Axis/Color/ColorAxisComposition.js'], _modules['Core/Axis/Color/ColorAxisDefaults.js'], _modules['Core/Axis/Color/ColorAxisLike.js'], _modules['Core/Defaults.js'], _modules['Core/Legend/LegendSymbol.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Axis, ColorAxisComposition, ColorAxisDefaults, ColorAxisLike, D, LegendSymbol, SeriesRegistry, U) {
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
        const { series: Series } = SeriesRegistry;
        const { defined, extend, fireEvent, isArray, isNumber, merge, pick, relativeLength } = U;
        defaultOptions.colorAxis = merge(defaultOptions.xAxis, ColorAxisDefaults);
        /* *
         *
         *  Class
         *
         * */
        /**
         * The ColorAxis object for inclusion in gradient legends.
         *
         * @class
         * @name Highcharts.ColorAxis
         * @augments Highcharts.Axis
         *
         * @param {Highcharts.Chart} chart
         * The related chart of the color axis.
         *
         * @param {Highcharts.ColorAxisOptions} userOptions
         * The color axis options for initialization.
         */
        class ColorAxis extends Axis {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(ChartClass, FxClass, LegendClass, SeriesClass) {
                ColorAxisComposition.compose(ColorAxis, ChartClass, FxClass, LegendClass, SeriesClass);
            }
            /* *
             *
             *  Constructors
             *
             * */
            /**
             * @private
             */
            constructor(chart, userOptions) {
                super(chart, userOptions);
                this.coll = 'colorAxis';
                this.visible = true;
                this.init(chart, userOptions);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initializes the color axis.
             *
             * @function Highcharts.ColorAxis#init
             *
             * @param {Highcharts.Chart} chart
             * The related chart of the color axis.
             *
             * @param {Highcharts.ColorAxisOptions} userOptions
             * The color axis options for initialization.
             */
            init(chart, userOptions) {
                const axis = this;
                const legend = chart.options.legend || {}, horiz = userOptions.layout ?
                    userOptions.layout !== 'vertical' :
                    legend.layout !== 'vertical';
                axis.side = userOptions.side || horiz ? 2 : 1;
                axis.reversed = userOptions.reversed || !horiz;
                axis.opposite = !horiz;
                super.init(chart, userOptions, 'colorAxis');
                // `super.init` saves the extended user options, now replace it with the
                // originals
                this.userOptions = userOptions;
                if (isArray(chart.userOptions.colorAxis)) {
                    chart.userOptions.colorAxis[this.index] = userOptions;
                }
                // Prepare data classes
                if (userOptions.dataClasses) {
                    axis.initDataClasses(userOptions);
                }
                axis.initStops();
                // Override original axis properties
                axis.horiz = horiz;
                axis.zoomEnabled = false;
            }
            /**
             * Returns true if the series has points at all.
             *
             * @function Highcharts.ColorAxis#hasData
             *
             * @return {boolean}
             * True, if the series has points, otherwise false.
             */
            hasData() {
                return !!(this.tickPositions || []).length;
            }
            /**
             * Override so that ticks are not added in data class axes (#6914)
             * @private
             */
            setTickPositions() {
                if (!this.dataClasses) {
                    return super.setTickPositions();
                }
            }
            /**
             * Extend the setOptions method to process extreme colors and color stops.
             * @private
             */
            setOptions(userOptions) {
                const options = merge(defaultOptions.colorAxis, userOptions, 
                // Forced options
                {
                    showEmpty: false,
                    title: null,
                    visible: this.chart.options.legend.enabled &&
                        userOptions.visible !== false
                });
                super.setOptions(options);
                this.options.crosshair = this.options.marker;
            }
            /**
             * @private
             */
            setAxisSize() {
                const axis = this, chart = axis.chart, symbol = axis.legendItem?.symbol;
                let { width, height } = axis.getSize();
                if (symbol) {
                    this.left = +symbol.attr('x');
                    this.top = +symbol.attr('y');
                    this.width = width = +symbol.attr('width');
                    this.height = height = +symbol.attr('height');
                    this.right = chart.chartWidth - this.left - width;
                    this.bottom = chart.chartHeight - this.top - height;
                    this.pos = this.horiz ? this.left : this.top;
                }
                // Fake length for disabled legend to avoid tick issues
                // and such (#5205)
                this.len = (this.horiz ? width : height) ||
                    ColorAxis.defaultLegendLength;
            }
            /**
             * Override the getOffset method to add the whole axis groups inside the
             * legend.
             * @private
             */
            getOffset() {
                const axis = this;
                const group = axis.legendItem?.group;
                const sideOffset = axis.chart.axisOffset[axis.side];
                if (group) {
                    // Hook for the getOffset method to add groups to this parent
                    // group
                    axis.axisParent = group;
                    // Call the base
                    super.getOffset();
                    const legend = this.chart.legend;
                    // Adds `maxLabelLength` needed for label padding corrections done
                    // by `render()` and `getMargins()` (#15551).
                    legend.allItems.forEach(function (item) {
                        if (item instanceof ColorAxis) {
                            item.drawLegendSymbol(legend, item);
                        }
                    });
                    legend.render();
                    this.chart.getMargins(true);
                    // If not drilling down/up
                    if (!this.chart.series.some((series) => series.isDrilling)) {
                        axis.isDirty = true; // Flag to fire drawChartBox
                    }
                    // First time only
                    if (!axis.added) {
                        axis.added = true;
                        axis.labelLeft = 0;
                        axis.labelRight = axis.width;
                    }
                    // Reset it to avoid color axis reserving space
                    axis.chart.axisOffset[axis.side] = sideOffset;
                }
            }
            /**
             * Create the color gradient.
             * @private
             */
            setLegendColor() {
                const axis = this;
                const horiz = axis.horiz;
                const reversed = axis.reversed;
                const one = reversed ? 1 : 0;
                const zero = reversed ? 0 : 1;
                const grad = horiz ? [one, 0, zero, 0] : [0, zero, 0, one]; // #3190
                axis.legendColor = {
                    linearGradient: {
                        x1: grad[0],
                        y1: grad[1],
                        x2: grad[2],
                        y2: grad[3]
                    },
                    stops: axis.stops
                };
            }
            /**
             * The color axis appears inside the legend and has its own legend symbol.
             * @private
             */
            drawLegendSymbol(legend, item) {
                const axis = this, legendItem = item.legendItem || {}, padding = legend.padding, legendOptions = legend.options, labelOptions = axis.options.labels, itemDistance = pick(legendOptions.itemDistance, 10), horiz = axis.horiz, { width, height } = axis.getSize(), labelPadding = pick(
                // @todo: This option is not documented, nor implemented when
                // vertical
                legendOptions.labelPadding, horiz ? 16 : 30);
                this.setLegendColor();
                // Create the gradient
                if (!legendItem.symbol) {
                    legendItem.symbol = this.chart.renderer.symbol('roundedRect')
                        .attr({
                        r: legendOptions.symbolRadius ?? 3,
                        zIndex: 1
                    }).add(legendItem.group);
                }
                legendItem.symbol.attr({
                    x: 0,
                    y: (legend.baseline || 0) - 11,
                    width: width,
                    height: height
                });
                // Set how much space this legend item takes up
                legendItem.labelWidth = (width +
                    padding +
                    (horiz ?
                        itemDistance :
                        pick(labelOptions.x, labelOptions.distance) +
                            (this.maxLabelLength || 0)));
                legendItem.labelHeight = height + padding + (horiz ? labelPadding : 0);
            }
            /**
             * Fool the legend.
             * @private
             */
            setState(state) {
                this.series.forEach(function (series) {
                    series.setState(state);
                });
            }
            /**
             * @private
             */
            setVisible() {
            }
            /**
             * @private
             */
            getSeriesExtremes() {
                const axis = this;
                const series = axis.series;
                let colorValArray, colorKey, colorValIndex, pointArrayMap, calculatedExtremes, cSeries, i = series.length, yData, j;
                this.dataMin = Infinity;
                this.dataMax = -Infinity;
                while (i--) { // X, y, value, other
                    cSeries = series[i];
                    colorKey = cSeries.colorKey = pick(cSeries.options.colorKey, cSeries.colorKey, cSeries.pointValKey, cSeries.zoneAxis, 'y');
                    pointArrayMap = cSeries.pointArrayMap;
                    calculatedExtremes = cSeries[colorKey + 'Min'] &&
                        cSeries[colorKey + 'Max'];
                    if (cSeries[colorKey + 'Data']) {
                        colorValArray = cSeries[colorKey + 'Data'];
                    }
                    else {
                        if (!pointArrayMap) {
                            colorValArray = cSeries.yData;
                        }
                        else {
                            colorValArray = [];
                            colorValIndex = pointArrayMap.indexOf(colorKey);
                            yData = cSeries.yData;
                            if (colorValIndex >= 0 && yData) {
                                for (j = 0; j < yData.length; j++) {
                                    colorValArray.push(pick(yData[j][colorValIndex], yData[j]));
                                }
                            }
                        }
                    }
                    // If color key extremes are already calculated, use them.
                    if (calculatedExtremes) {
                        cSeries.minColorValue = cSeries[colorKey + 'Min'];
                        cSeries.maxColorValue = cSeries[colorKey + 'Max'];
                    }
                    else {
                        const cExtremes = Series.prototype.getExtremes.call(cSeries, colorValArray);
                        cSeries.minColorValue = cExtremes.dataMin;
                        cSeries.maxColorValue = cExtremes.dataMax;
                    }
                    if (defined(cSeries.minColorValue) &&
                        defined(cSeries.maxColorValue)) {
                        this.dataMin =
                            Math.min(this.dataMin, cSeries.minColorValue);
                        this.dataMax =
                            Math.max(this.dataMax, cSeries.maxColorValue);
                    }
                    if (!calculatedExtremes) {
                        Series.prototype.applyExtremes.call(cSeries);
                    }
                }
            }
            /**
             * Internal function to draw a crosshair.
             *
             * @function Highcharts.ColorAxis#drawCrosshair
             *
             * @param {Highcharts.PointerEventObject} [e]
             *        The event arguments from the modified pointer event, extended with
             *        `chartX` and `chartY`
             *
             * @param {Highcharts.Point} [point]
             *        The Point object if the crosshair snaps to points.
             *
             * @emits Highcharts.ColorAxis#event:afterDrawCrosshair
             * @emits Highcharts.ColorAxis#event:drawCrosshair
             */
            drawCrosshair(e, point) {
                const axis = this, legendItem = axis.legendItem || {}, plotX = point && point.plotX, plotY = point && point.plotY, axisPos = axis.pos, axisLen = axis.len;
                let crossPos;
                if (point) {
                    crossPos = axis.toPixels(point.getNestedProperty(point.series.colorKey));
                    if (crossPos < axisPos) {
                        crossPos = axisPos - 2;
                    }
                    else if (crossPos > axisPos + axisLen) {
                        crossPos = axisPos + axisLen + 2;
                    }
                    point.plotX = crossPos;
                    point.plotY = axis.len - crossPos;
                    super.drawCrosshair(e, point);
                    point.plotX = plotX;
                    point.plotY = plotY;
                    if (axis.cross &&
                        !axis.cross.addedToColorAxis &&
                        legendItem.group) {
                        axis.cross
                            .addClass('highcharts-coloraxis-marker')
                            .add(legendItem.group);
                        axis.cross.addedToColorAxis = true;
                        if (!axis.chart.styledMode &&
                            typeof axis.crosshair === 'object') {
                            axis.cross.attr({
                                fill: axis.crosshair.color
                            });
                        }
                    }
                }
            }
            /**
             * @private
             */
            getPlotLinePath(options) {
                const axis = this, left = axis.left, pos = options.translatedValue, top = axis.top;
                // Crosshairs only
                return isNumber(pos) ? // `pos` can be 0 (#3969)
                    (axis.horiz ? [
                        ['M', pos - 4, top - 6],
                        ['L', pos + 4, top - 6],
                        ['L', pos, top],
                        ['Z']
                    ] : [
                        ['M', left, pos],
                        ['L', left - 6, pos + 6],
                        ['L', left - 6, pos - 6],
                        ['Z']
                    ]) :
                    super.getPlotLinePath(options);
            }
            /**
             * Updates a color axis instance with a new set of options. The options are
             * merged with the existing options, so only new or altered options need to
             * be specified.
             *
             * @function Highcharts.ColorAxis#update
             *
             * @param {Highcharts.ColorAxisOptions} newOptions
             * The new options that will be merged in with existing options on the color
             * axis.
             *
             * @param {boolean} [redraw]
             * Whether to redraw the chart after the color axis is altered. If doing
             * more operations on the chart, it is a good idea to set redraw to `false`
             * and call {@link Highcharts.Chart#redraw} after.
             */
            update(newOptions, redraw) {
                const axis = this, chart = axis.chart, legend = chart.legend;
                this.series.forEach((series) => {
                    // Needed for Axis.update when choropleth colors change
                    series.isDirtyData = true;
                });
                // When updating data classes, destroy old items and make sure new
                // ones are created (#3207)
                if (newOptions.dataClasses && legend.allItems || axis.dataClasses) {
                    axis.destroyItems();
                }
                super.update(newOptions, redraw);
                if (axis.legendItem && axis.legendItem.label) {
                    axis.setLegendColor();
                    legend.colorizeItem(this, true);
                }
            }
            /**
             * Destroy color axis legend items.
             * @private
             */
            destroyItems() {
                const axis = this, chart = axis.chart, legendItem = axis.legendItem || {};
                if (legendItem.label) {
                    chart.legend.destroyItem(axis);
                }
                else if (legendItem.labels) {
                    for (const item of legendItem.labels) {
                        chart.legend.destroyItem(item);
                    }
                }
                chart.isDirtyLegend = true;
            }
            //   Removing the whole axis (#14283)
            destroy() {
                this.chart.isDirtyLegend = true;
                this.destroyItems();
                super.destroy(...[].slice.call(arguments));
            }
            /**
             * Removes the color axis and the related legend item.
             *
             * @function Highcharts.ColorAxis#remove
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart following the remove.
             */
            remove(redraw) {
                this.destroyItems();
                super.remove(redraw);
            }
            /**
             * Get the legend item symbols for data classes.
             * @private
             */
            getDataClassLegendSymbols() {
                const axis = this, chart = axis.chart, legendItems = (axis.legendItem &&
                    axis.legendItem.labels ||
                    []), legendOptions = chart.options.legend, valueDecimals = pick(legendOptions.valueDecimals, -1), valueSuffix = pick(legendOptions.valueSuffix, '');
                const getPointsInDataClass = (i) => axis.series.reduce((points, s) => {
                    points.push(...s.points.filter((point) => point.dataClass === i));
                    return points;
                }, []);
                let name;
                if (!legendItems.length) {
                    axis.dataClasses.forEach((dataClass, i) => {
                        const from = dataClass.from, to = dataClass.to, { numberFormatter } = chart;
                        let vis = true;
                        // Assemble the default name. This can be overridden
                        // by legend.options.labelFormatter
                        name = '';
                        if (typeof from === 'undefined') {
                            name = '< ';
                        }
                        else if (typeof to === 'undefined') {
                            name = '> ';
                        }
                        if (typeof from !== 'undefined') {
                            name += numberFormatter(from, valueDecimals) + valueSuffix;
                        }
                        if (typeof from !== 'undefined' && typeof to !== 'undefined') {
                            name += ' - ';
                        }
                        if (typeof to !== 'undefined') {
                            name += numberFormatter(to, valueDecimals) + valueSuffix;
                        }
                        // Add a mock object to the legend items
                        legendItems.push(extend({
                            chart,
                            name,
                            options: {},
                            drawLegendSymbol: LegendSymbol.rectangle,
                            visible: true,
                            isDataClass: true,
                            // Override setState to set either normal or inactive
                            // state to all points in this data class
                            setState: (state) => {
                                for (const point of getPointsInDataClass(i)) {
                                    point.setState(state);
                                }
                            },
                            // Override setState to show or hide all points in this
                            // data class
                            setVisible: function () {
                                this.visible = vis = axis.visible = !vis;
                                const affectedSeries = [];
                                for (const point of getPointsInDataClass(i)) {
                                    point.setVisible(vis);
                                    point.hiddenInDataClass = !vis; // #20441
                                    if (affectedSeries.indexOf(point.series) === -1) {
                                        affectedSeries.push(point.series);
                                    }
                                }
                                chart.legend.colorizeItem(this, vis);
                                affectedSeries.forEach((series) => {
                                    fireEvent(series, 'afterDataClassLegendClick');
                                });
                            }
                        }, dataClass));
                    });
                }
                return legendItems;
            }
            /**
             * Get size of color axis symbol.
             * @private
             */
            getSize() {
                const axis = this, { chart, horiz } = axis, { height: colorAxisHeight, width: colorAxisWidth } = axis.options, { legend: legendOptions } = chart.options, width = pick(defined(colorAxisWidth) ?
                    relativeLength(colorAxisWidth, chart.chartWidth) : void 0, legendOptions?.symbolWidth, horiz ? ColorAxis.defaultLegendLength : 12), height = pick(defined(colorAxisHeight) ?
                    relativeLength(colorAxisHeight, chart.chartHeight) : void 0, legendOptions?.symbolHeight, horiz ? 12 : ColorAxis.defaultLegendLength);
                return {
                    width,
                    height
                };
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        ColorAxis.defaultLegendLength = 200;
        /**
         * @private
         */
        ColorAxis.keepProps = [
            'legendItem'
        ];
        extend(ColorAxis.prototype, ColorAxisLike);
        /* *
         *
         *  Registry
         *
         * */
        // Properties to preserve after destroy, for Axis.update (#5881, #6025).
        Array.prototype.push.apply(Axis.keepProps, ColorAxis.keepProps);
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
         * Color axis types
         *
         * @typedef {"linear"|"logarithmic"} Highcharts.ColorAxisTypeValue
         */
        ''; // Detach doclet above

        return ColorAxis;
    });
    _registerModule(_modules, 'masters/modules/coloraxis.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/Color/ColorAxis.js']], function (Highcharts, ColorAxis) {

        const G = Highcharts;
        G.ColorAxis = G.ColorAxis || ColorAxis;
        G.ColorAxis.compose(G.Chart, G.Fx, G.Legend, G.Series);

        return Highcharts;
    });
    _registerModule(_modules, 'Maps/MapNavigationDefaults.js', [], function () {
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
         *  Constants
         *
         * */
        const lang = {
            zoomIn: 'Zoom in',
            zoomOut: 'Zoom out'
        };
        /**
         * The `mapNavigation` option handles buttons for navigation in addition to
         * `mousewheel` and `doubleclick` handlers for map zooming.
         *
         * @product      highmaps
         * @optionparent mapNavigation
         */
        const mapNavigation = {
            /**
             * General options for the map navigation buttons. Individual options
             * can be given from the [mapNavigation.buttons](#mapNavigation.buttons)
             * option set.
             *
             * @sample {highmaps} maps/mapnavigation/button-theme/
             *         Theming the navigation buttons
             */
            buttonOptions: {
                /**
                 * What box to align the buttons to. Possible values are `plotBox`
                 * and `spacingBox`.
                 *
                 * @type {Highcharts.ButtonRelativeToValue}
                 */
                alignTo: 'plotBox',
                /**
                 * The alignment of the navigation buttons.
                 *
                 * @type {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * The vertical alignment of the buttons. Individual alignment can
                 * be adjusted by each button's `y` offset.
                 *
                 * @type {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'top',
                /**
                 * The X offset of the buttons relative to its `align` setting.
                 */
                x: 0,
                /**
                 * The width of the map navigation buttons.
                 */
                width: 18,
                /**
                 * The pixel height of the map navigation buttons.
                 */
                height: 18,
                /**
                 * Padding for the navigation buttons.
                 *
                 * @since 5.0.0
                 */
                padding: 5,
                /**
                 * Text styles for the map navigation buttons.
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontSize": "1em", "fontWeight": "bold"}
                 */
                style: {
                    /** @ignore */
                    color: "#666666" /* Palette.neutralColor60 */,
                    /** @ignore */
                    fontSize: '1em',
                    /** @ignore */
                    fontWeight: 'bold'
                },
                /**
                 * A configuration object for the button theme. The object accepts
                 * SVG properties like `stroke-width`, `stroke` and `fill`. Tri-state
                 * button styles are supported by the `states.hover` and `states.select`
                 * objects.
                 *
                 * @sample {highmaps} maps/mapnavigation/button-theme/
                 *         Themed navigation buttons
                 *
                 * @type    {Highcharts.SVGAttributes}
                 * @default {"stroke-width": 1, "text-align": "center"}
                 */
                theme: {
                    /** @ignore */
                    fill: "#ffffff" /* Palette.backgroundColor */,
                    /** @ignore */
                    stroke: "#e6e6e6" /* Palette.neutralColor10 */,
                    /** @ignore */
                    'stroke-width': 1,
                    /** @ignore */
                    'text-align': 'center'
                }
            },
            /**
             * The individual buttons for the map navigation. This usually includes
             * the zoom in and zoom out buttons. Properties for each button is
             * inherited from
             * [mapNavigation.buttonOptions](#mapNavigation.buttonOptions), while
             * individual options can be overridden. But default, the `onclick`, `text`
             * and `y` options are individual.
             */
            buttons: {
                /**
                 * Options for the zoom in button. Properties for the zoom in and zoom
                 * out buttons are inherited from
                 * [mapNavigation.buttonOptions](#mapNavigation.buttonOptions), while
                 * individual options can be overridden. By default, the `onclick`,
                 * `text` and `y` options are individual.
                 *
                 * @extends mapNavigation.buttonOptions
                 */
                zoomIn: {
                    // eslint-disable-next-line valid-jsdoc
                    /**
                     * Click handler for the button.
                     *
                     * @type    {Function}
                     * @default function () { this.mapZoom(0.5); }
                     */
                    onclick: function () {
                        this.mapZoom(0.5);
                    },
                    /**
                     * The text for the button. The tooltip (title) is a language option
                     * given by [lang.zoomIn](#lang.zoomIn).
                     */
                    text: '+',
                    /**
                     * The position of the zoomIn button relative to the vertical
                     * alignment.
                     */
                    y: 0
                },
                /**
                 * Options for the zoom out button. Properties for the zoom in and
                 * zoom out buttons are inherited from
                 * [mapNavigation.buttonOptions](#mapNavigation.buttonOptions), while
                 * individual options can be overridden. By default, the `onclick`,
                 * `text` and `y` options are individual.
                 *
                 * @extends mapNavigation.buttonOptions
                 */
                zoomOut: {
                    // eslint-disable-next-line valid-jsdoc
                    /**
                     * Click handler for the button.
                     *
                     * @type    {Function}
                     * @default function () { this.mapZoom(2); }
                     */
                    onclick: function () {
                        this.mapZoom(2);
                    },
                    /**
                     * The text for the button. The tooltip (title) is a language option
                     * given by [lang.zoomOut](#lang.zoomIn).
                     */
                    text: '-',
                    /**
                     * The position of the zoomOut button relative to the vertical
                     * alignment.
                     */
                    y: 28
                }
            },
            /**
             * Whether to enable navigation buttons. By default it inherits the
             * [enabled](#mapNavigation.enabled) setting.
             *
             * @type      {boolean}
             * @apioption mapNavigation.enableButtons
             */
            /**
             * Whether to enable map navigation. The default is not to enable
             * navigation, as many choropleth maps are simple and don't need it.
             * Additionally, when touch zoom and mouse wheel zoom is enabled, it breaks
             * the default behaviour of these interactions in the website, and the
             * implementer should be aware of this.
             *
             * Individual interactions can be enabled separately, namely buttons,
             * multitouch zoom, double click zoom, double click zoom to element and
             * mouse wheel zoom.
             *
             * @type      {boolean}
             * @default   false
             * @apioption mapNavigation.enabled
             */
            /**
             * Enables zooming in on an area on double clicking in the map. By default
             * it inherits the [enabled](#mapNavigation.enabled) setting.
             *
             * @type      {boolean}
             * @apioption mapNavigation.enableDoubleClickZoom
             */
            /**
             * Whether to zoom in on an area when that area is double clicked.
             *
             * @sample {highmaps} maps/mapnavigation/doubleclickzoomto/
             *         Enable double click zoom to
             *
             * @type      {boolean}
             * @default   false
             * @apioption mapNavigation.enableDoubleClickZoomTo
             */
            /**
             * Enables zooming by mouse wheel. By default it inherits the [enabled](
             * #mapNavigation.enabled) setting.
             *
             * @type      {boolean}
             * @apioption mapNavigation.enableMouseWheelZoom
             */
            /**
             * Whether to enable multitouch zooming. Note that if the chart covers the
             * viewport, this prevents the user from using multitouch and touchdrag on
             * the web page, so you should make sure the user is not trapped inside the
             * chart. By default it inherits the [enabled](#mapNavigation.enabled)
             * setting.
             *
             * @type      {boolean}
             * @apioption mapNavigation.enableTouchZoom
             */
            /**
             * Sensitivity of mouse wheel or trackpad scrolling. 1 is no sensitivity,
             * while with 2, one mouse wheel delta will zoom in 50%.
             *
             * @since 4.2.4
             */
            mouseWheelSensitivity: 1.1
            // Enabled: false,
            // enableButtons: null, // inherit from enabled
            // enableTouchZoom: null, // inherit from enabled
            // enableDoubleClickZoom: null, // inherit from enabled
            // enableDoubleClickZoomTo: false
            // enableMouseWheelZoom: null, // inherit from enabled
        };
        /* *
         *
         *  Default Export
         *
         * */
        const mapNavigationDefaults = {
            lang,
            mapNavigation
        };

        return mapNavigationDefaults;
    });
    _registerModule(_modules, 'Maps/MapPointer.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined, extend, pick, wrap } = U;
        /* *
         *
         *  Composition
         *
         * */
        var MapPointer;
        (function (MapPointer) {
            /* *
             *
             *  Variables
             *
             * */
            let totalWheelDelta = 0;
            let totalWheelDeltaTimer;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extend the Pointer.
             * @private
             */
            function compose(PointerClass) {
                const pointerProto = PointerClass.prototype;
                if (!pointerProto.onContainerDblClick) {
                    extend(pointerProto, {
                        onContainerDblClick,
                        onContainerMouseWheel
                    });
                    wrap(pointerProto, 'normalize', wrapNormalize);
                    wrap(pointerProto, 'zoomOption', wrapZoomOption);
                }
            }
            MapPointer.compose = compose;
            /**
             * The event handler for the doubleclick event.
             * @private
             */
            function onContainerDblClick(e) {
                const chart = this.chart;
                e = this.normalize(e);
                if (chart.options.mapNavigation.enableDoubleClickZoomTo) {
                    if (chart.pointer.inClass(e.target, 'highcharts-tracker') &&
                        chart.hoverPoint) {
                        chart.hoverPoint.zoomTo();
                    }
                }
                else if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                    chart.mapZoom(0.5, void 0, void 0, e.chartX, e.chartY);
                }
            }
            /**
             * The event handler for the mouse scroll event.
             * @private
             */
            function onContainerMouseWheel(e) {
                const chart = this.chart;
                e = this.normalize(e);
                // Firefox uses e.deltaY or e.detail, WebKit and IE uses wheelDelta
                // try wheelDelta first #15656
                const delta = (defined(e.wheelDelta) && -e.wheelDelta / 120) ||
                    e.deltaY || e.detail;
                // Wheel zooming on trackpads have different behaviours in Firefox vs
                // WebKit. In Firefox the delta increments in steps by 1, so it is not
                // distinguishable from true mouse wheel. Therefore we use this timer
                // to avoid trackpad zooming going too fast and out of control. In
                // WebKit however, the delta is < 1, so we simply disable animation in
                // the `chart.mapZoom` call below.
                if (Math.abs(delta) >= 1) {
                    totalWheelDelta += Math.abs(delta);
                    if (totalWheelDeltaTimer) {
                        clearTimeout(totalWheelDeltaTimer);
                    }
                    totalWheelDeltaTimer = setTimeout(() => {
                        totalWheelDelta = 0;
                    }, 50);
                }
                if (totalWheelDelta < 10 && chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop) && chart.mapView) {
                    chart.mapView.zoomBy((chart.options.mapNavigation.mouseWheelSensitivity -
                        1) * -delta, void 0, [e.chartX, e.chartY], 
                    // Delta less than 1 indicates stepless/trackpad zooming, avoid
                    // animation delaying the zoom
                    Math.abs(delta) < 1 ? false : void 0);
                }
            }
            /**
             * Add lon and lat information to pointer events
             * @private
             */
            function wrapNormalize(proceed, e, chartPosition) {
                const chart = this.chart;
                e = proceed.call(this, e, chartPosition);
                if (chart && chart.mapView) {
                    const lonLat = chart.mapView.pixelsToLonLat({
                        x: e.chartX - chart.plotLeft,
                        y: e.chartY - chart.plotTop
                    });
                    if (lonLat) {
                        extend(e, lonLat);
                    }
                }
                return e;
            }
            /**
             * The pinchType is inferred from mapNavigation options.
             * @private
             */
            function wrapZoomOption(proceed) {
                const mapNavigation = this.chart.options.mapNavigation;
                // Pinch status
                if (mapNavigation &&
                    pick(mapNavigation.enableTouchZoom, mapNavigation.enabled)) {
                    this.chart.zooming.pinchType = 'xy';
                }
                proceed.apply(this, [].slice.call(arguments, 1));
            }
        })(MapPointer || (MapPointer = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return MapPointer;
    });
    _registerModule(_modules, 'Maps/MapSymbols.js', [], function () {
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
         *  Variables
         *
         * */
        let symbols;
        /* *
         *
         *  Functions
         *
         * */
        /**
         *
         */
        function bottomButton(x, y, w, h, options) {
            if (options) {
                const r = options?.r || 0;
                options.brBoxY = y - r;
                options.brBoxHeight = h + r;
            }
            return symbols.roundedRect(x, y, w, h, options);
        }
        /**
         *
         */
        function compose(SVGRendererClass) {
            symbols = SVGRendererClass.prototype.symbols;
            symbols.bottombutton = bottomButton;
            symbols.topbutton = topButton;
        }
        /**
         *
         */
        function topButton(x, y, w, h, options) {
            if (options) {
                const r = options?.r || 0;
                options.brBoxHeight = h + r;
            }
            return symbols.roundedRect(x, y, w, h, options);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const MapSymbols = {
            compose
        };

        return MapSymbols;
    });
    _registerModule(_modules, 'Maps/MapNavigation.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Maps/MapNavigationDefaults.js'], _modules['Maps/MapPointer.js'], _modules['Maps/MapSymbols.js'], _modules['Core/Utilities.js']], function (D, H, MapNavigationDefaults, MapPointer, MapSymbols, U) {
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
        const { addEvent, extend, merge, objectEach, pick, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function stopEvent(e) {
            if (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The MapNavigation handles buttons for navigation in addition to mousewheel
         * and doubleclick handlers for chart zooming.
         *
         * @private
         * @class
         * @name MapNavigation
         *
         * @param {Highcharts.Chart} chart
         *        The Chart instance.
         */
        class MapNavigation {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(MapChartClass, PointerClass, SVGRendererClass) {
                MapPointer.compose(PointerClass);
                MapSymbols.compose(SVGRendererClass);
                if (pushUnique(composed, 'Map.Navigation')) {
                    // Extend the Chart.render method to add zooming and panning
                    addEvent(MapChartClass, 'beforeRender', function () {
                        // Render the plus and minus buttons. Doing this before the
                        // shapes makes getBBox much quicker, at least in Chrome.
                        this.mapNavigation = new MapNavigation(this);
                        this.mapNavigation.update();
                    });
                    setOptions(MapNavigationDefaults);
                }
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.chart = chart;
                this.navButtons = [];
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Update the map navigation with new options. Calling this is the same as
             * calling `chart.update({ mapNavigation: {} })`.
             *
             * @function MapNavigation#update
             *
             * @param {Partial<Highcharts.MapNavigationOptions>} [options]
             *        New options for the map navigation.
             */
            update(options) {
                const mapNav = this, chart = mapNav.chart, navButtons = mapNav.navButtons, outerHandler = function (e) {
                    this.handler.call(chart, e);
                    stopEvent(e); // Stop default click event (#4444)
                };
                let navOptions = chart.options.mapNavigation;
                // Merge in new options in case of update, and register back to chart
                // options.
                if (options) {
                    navOptions = chart.options.mapNavigation =
                        merge(chart.options.mapNavigation, options);
                }
                // Destroy buttons in case of dynamic update
                while (navButtons.length) {
                    navButtons.pop().destroy();
                }
                if (!chart.renderer.forExport &&
                    pick(navOptions.enableButtons, navOptions.enabled)) {
                    if (!mapNav.navButtonsGroup) {
                        mapNav.navButtonsGroup = chart.renderer.g()
                            .attr({
                            zIndex: 7 // #4955, #8392, #20476
                        })
                            .add();
                    }
                    objectEach(navOptions.buttons, (buttonOptions, n) => {
                        buttonOptions = merge(navOptions.buttonOptions, buttonOptions);
                        const attr = {
                            padding: buttonOptions.padding
                        };
                        // Presentational
                        if (!chart.styledMode && buttonOptions.theme) {
                            extend(attr, buttonOptions.theme);
                            attr.style = merge(buttonOptions.theme.style, buttonOptions.style // #3203
                            );
                        }
                        const { text, width = 0, height = 0, padding = 0 } = buttonOptions;
                        const button = chart.renderer
                            .button(
                        // Display the text from options only if it is not plus
                        // or minus
                        (text !== '+' && text !== '-' && text) || '', 0, 0, outerHandler, attr, void 0, void 0, void 0, n === 'zoomIn' ? 'topbutton' : 'bottombutton')
                            .addClass('highcharts-map-navigation highcharts-' + {
                            zoomIn: 'zoom-in',
                            zoomOut: 'zoom-out'
                        }[n])
                            .attr({
                            width,
                            height,
                            title: chart.options.lang[n],
                            zIndex: 5
                        })
                            .add(mapNav.navButtonsGroup);
                        // Add SVG paths for the default symbols, because the text
                        // representation of + and - is not sharp and position is not
                        // easy to control.
                        if (text === '+' || text === '-') {
                            // Mysterious +1 to achieve centering
                            const w = width + 1, d = [
                                ['M', padding + 3, padding + height / 2],
                                ['L', padding + w - 3, padding + height / 2]
                            ];
                            if (text === '+') {
                                d.push(['M', padding + w / 2, padding + 3], ['L', padding + w / 2, padding + height - 3]);
                            }
                            chart.renderer
                                .path(d)
                                .addClass('highcharts-button-symbol')
                                .attr(chart.styledMode ? {} : {
                                stroke: buttonOptions.style?.color,
                                'stroke-width': 3,
                                'stroke-linecap': 'round'
                            })
                                .add(button);
                        }
                        button.handler = buttonOptions.onclick;
                        // Stop double click event (#4444)
                        addEvent(button.element, 'dblclick', stopEvent);
                        navButtons.push(button);
                        extend(buttonOptions, {
                            width: button.width,
                            height: 2 * (button.height || 0)
                        });
                        if (!chart.hasLoaded) {
                            // Align it after the plotBox is known (#12776)
                            const unbind = addEvent(chart, 'load', () => {
                                // #15406: Make sure button hasnt been destroyed
                                if (button.element) {
                                    button.align(buttonOptions, false, buttonOptions.alignTo);
                                }
                                unbind();
                            });
                        }
                        else {
                            button.align(buttonOptions, false, buttonOptions.alignTo);
                        }
                    });
                    // Borrowed from overlapping-datalabels. Consider a shared module.
                    const isIntersectRect = (box1, box2) => !(box2.x >= box1.x + box1.width ||
                        box2.x + box2.width <= box1.x ||
                        box2.y >= box1.y + box1.height ||
                        box2.y + box2.height <= box1.y);
                    // Check the mapNavigation buttons collision with exporting button
                    // and translate the mapNavigation button if they overlap.
                    const adjustMapNavBtn = function () {
                        const expBtnBBox = chart.exportingGroup && chart.exportingGroup.getBBox();
                        if (expBtnBBox) {
                            const navBtnsBBox = mapNav.navButtonsGroup.getBBox();
                            // If buttons overlap
                            if (isIntersectRect(expBtnBBox, navBtnsBBox)) {
                                // Adjust the mapNav buttons' position by translating
                                // them above or below the exporting button
                                const aboveExpBtn = -navBtnsBBox.y -
                                    navBtnsBBox.height + expBtnBBox.y - 5, belowExpBtn = expBtnBBox.y + expBtnBBox.height -
                                    navBtnsBBox.y + 5, mapNavVerticalAlign = (navOptions.buttonOptions &&
                                    navOptions.buttonOptions.verticalAlign);
                                // If bottom aligned and adjusting the mapNav button
                                // would translate it out of the plotBox, translate it
                                // up instead of down
                                mapNav.navButtonsGroup.attr({
                                    translateY: mapNavVerticalAlign === 'bottom' ?
                                        aboveExpBtn :
                                        belowExpBtn
                                });
                            }
                        }
                    };
                    if (!chart.hasLoaded) {
                        // Align it after the plotBox is known (#12776) and after the
                        // hamburger button's position is known so they don't overlap
                        // (#15782)
                        addEvent(chart, 'render', adjustMapNavBtn);
                    }
                }
                this.updateEvents(navOptions);
            }
            /**
             * Update events, called internally from the update function. Add new event
             * handlers, or unbinds events if disabled.
             *
             * @function MapNavigation#updateEvents
             *
             * @param {Partial<Highcharts.MapNavigationOptions>} options
             *        Options for map navigation.
             */
            updateEvents(options) {
                const chart = this.chart;
                // Add the double click event
                if (pick(options.enableDoubleClickZoom, options.enabled) ||
                    options.enableDoubleClickZoomTo) {
                    this.unbindDblClick = this.unbindDblClick || addEvent(chart.container, 'dblclick', function (e) {
                        chart.pointer.onContainerDblClick(e);
                    });
                }
                else if (this.unbindDblClick) {
                    // Unbind and set unbinder to undefined
                    this.unbindDblClick = this.unbindDblClick();
                }
                // Add the mousewheel event
                if (pick(options.enableMouseWheelZoom, options.enabled)) {
                    this.unbindMouseWheel = this.unbindMouseWheel || addEvent(chart.container, 'wheel', function (e) {
                        // Prevent scrolling when the pointer is over the element
                        // with that class, for example anotation popup #12100.
                        if (!chart.pointer.inClass(e.target, 'highcharts-no-mousewheel')) {
                            chart.pointer.onContainerMouseWheel(e);
                            // Issue #5011, returning false from non-jQuery event
                            // does not prevent default
                            stopEvent(e);
                        }
                        return false;
                    });
                }
                else if (this.unbindMouseWheel) {
                    // Unbind and set unbinder to undefined
                    this.unbindMouseWheel = this.unbindMouseWheel();
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return MapNavigation;
    });
    _registerModule(_modules, 'Series/ColorMapComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: { prototype: columnProto } } = SeriesRegistry.seriesTypes;
        const { addEvent, defined } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ColorMapComposition;
        (function (ColorMapComposition) {
            /* *
             *
             *  Constants
             *
             * */
            ColorMapComposition.pointMembers = {
                dataLabelOnNull: true,
                moveToTopOnHover: true,
                isValid: pointIsValid
            };
            ColorMapComposition.seriesMembers = {
                colorKey: 'value',
                axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
                parallelArrays: ['x', 'y', 'value'],
                pointArrayMap: ['value'],
                trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
                colorAttribs: seriesColorAttribs,
                pointAttribs: columnProto.pointAttribs
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(SeriesClass) {
                const PointClass = SeriesClass.prototype.pointClass;
                addEvent(PointClass, 'afterSetState', onPointAfterSetState);
                return SeriesClass;
            }
            ColorMapComposition.compose = compose;
            /**
             * Move points to the top of the z-index order when hovered.
             * @private
             */
            function onPointAfterSetState(e) {
                const point = this, series = point.series, renderer = series.chart.renderer;
                if (point.moveToTopOnHover && point.graphic) {
                    if (!series.stateMarkerGraphic) {
                        // Create a `use` element and add it to the end of the group,
                        // which would make it appear on top of the other elements. This
                        // deals with z-index without reordering DOM elements (#13049).
                        series.stateMarkerGraphic = new SVGElement(renderer, 'use')
                            .css({
                            pointerEvents: 'none'
                        })
                            .add(point.graphic.parentGroup);
                    }
                    if (e?.state === 'hover') {
                        // Give the graphic DOM element the same id as the Point
                        // instance
                        point.graphic.attr({
                            id: this.id
                        });
                        series.stateMarkerGraphic.attr({
                            href: `${renderer.url}#${this.id}`,
                            visibility: 'visible'
                        });
                    }
                    else {
                        series.stateMarkerGraphic.attr({
                            href: ''
                        });
                    }
                }
            }
            /**
             * Color points have a value option that determines whether or not it is
             * a null point
             * @private
             */
            function pointIsValid() {
                return (this.value !== null &&
                    this.value !== Infinity &&
                    this.value !== -Infinity &&
                    // Undefined is allowed, but NaN is not (#17279)
                    (this.value === void 0 || !isNaN(this.value)));
            }
            /**
             * Get the color attributes to apply on the graphic
             * @private
             * @function Highcharts.colorMapSeriesMixin.colorAttribs
             * @param {Highcharts.Point} point
             * @return {Highcharts.SVGAttributes}
             *         The SVG attributes
             */
            function seriesColorAttribs(point) {
                const ret = {};
                if (defined(point.color) &&
                    (!point.state || point.state === 'normal') // #15746
                ) {
                    ret[this.colorProp || 'fill'] = point.color;
                }
                return ret;
            }
        })(ColorMapComposition || (ColorMapComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ColorMapComposition;
    });
    _registerModule(_modules, 'Core/Chart/MapChart.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Defaults.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (Chart, D, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { getOptions } = D;
        const { isNumber, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Map-optimized chart. Use {@link Highcharts.Chart|Chart} for common charts.
         *
         * @requires modules/map
         *
         * @class
         * @name Highcharts.MapChart
         * @extends Highcharts.Chart
         */
        class MapChart extends Chart {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initializes the chart. The constructor's arguments are passed on
             * directly.
             *
             * @function Highcharts.MapChart#init
             *
             * @param {Highcharts.Options} userOptions
             *        Custom options.
             *
             * @param {Function} [callback]
             *        Function to run when the chart has loaded and all external
             *        images are loaded.
             *
             *
             * @emits Highcharts.MapChart#event:init
             * @emits Highcharts.MapChart#event:afterInit
             */
            init(userOptions, callback) {
                const defaultCreditsOptions = getOptions().credits;
                const options = merge({
                    chart: {
                        panning: {
                            enabled: true,
                            type: 'xy'
                        },
                        type: 'map'
                    },
                    credits: {
                        mapText: pick(defaultCreditsOptions.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">' +
                            '{geojson.copyrightShort}</a>'),
                        mapTextFull: pick(defaultCreditsOptions.mapTextFull, '{geojson.copyright}')
                    },
                    mapView: {}, // Required to enable Chart.mapView
                    tooltip: {
                        followTouchMove: false
                    }
                }, userOptions // User's options
                );
                super.init(options, callback);
            }
            /**
             * Highcharts Maps only. Zoom in or out of the map. See also
             * {@link Point#zoomTo}. See {@link Chart#fromLatLonToPoint} for how to get
             * the `centerX` and `centerY` parameters for a geographic location.
             *
             * Deprecated as of v9.3 in favor of [MapView.zoomBy](https://api.highcharts.com/class-reference/Highcharts.MapView#zoomBy).
             *
             * @deprecated
             * @function Highcharts.Chart#mapZoom
             *
             * @param {number} [howMuch]
             *        How much to zoom the map. Values less than 1 zooms in. 0.5 zooms
             *        in to half the current view. 2 zooms to twice the current view. If
             *        omitted, the zoom is reset.
             *
             * @param {number} [xProjected]
             *        The projected x position to keep stationary when zooming, if
             *        available space.
             *
             * @param {number} [yProjected]
             *        The projected y position to keep stationary when zooming, if
             *        available space.
             *
             * @param {number} [chartX]
             *        Keep this chart position stationary if possible. This is used for
             *        example in `mousewheel` events, where the area under the mouse
             *        should be fixed as we zoom in.
             *
             * @param {number} [chartY]
             *        Keep this chart position stationary if possible.
             */
            mapZoom(howMuch, xProjected, yProjected, chartX, chartY) {
                if (this.mapView) {
                    if (isNumber(howMuch)) {
                        // Compliance, mapView.zoomBy uses different values
                        howMuch = Math.log(howMuch) / Math.log(0.5);
                    }
                    this.mapView.zoomBy(howMuch, isNumber(xProjected) && isNumber(yProjected) ?
                        this.mapView.projection.inverse([xProjected, yProjected]) :
                        void 0, isNumber(chartX) && isNumber(chartY) ?
                        [chartX, chartY] :
                        void 0);
                }
            }
            update(options) {
                // Calculate and set the recommended map view if map option is set
                if (options.chart && 'map' in options.chart) {
                    this.mapView?.recommendMapView(this, [
                        options.chart.map,
                        ...(this.options.series || []).map((s) => s.mapData)
                    ], true);
                }
                super.update.apply(this, arguments);
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (MapChart) {
            /* *
             *
             *  Constants
             *
             * */
            /**
             * Contains all loaded map data for Highmaps.
             *
             * @requires modules/map
             *
             * @name Highcharts.maps
             * @type {Record<string,*>}
             */
            MapChart.maps = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * The factory function for creating new map charts. Creates a new {@link
             * Highcharts.MapChart|MapChart} object with different default options than
             * the basic Chart.
             *
             * @requires modules/map
             *
             * @function Highcharts.mapChart
             *
             * @param {string|Highcharts.HTMLDOMElement} [renderTo]
             *        The DOM element to render to, or its id.
             *
             * @param {Highcharts.Options} options
             *        The chart options structure as described in the
             *        [options reference](https://api.highcharts.com/highstock).
             *
             * @param {Highcharts.ChartCallbackFunction} [callback]
             *        A function to execute when the chart object is finished
             *        rendering and all external image files (`chart.backgroundImage`,
             *        `chart.plotBackgroundImage` etc) are loaded.  Defining a
             *        [chart.events.load](https://api.highcharts.com/highstock/chart.events.load)
             *        handler is equivalent.
             *
             * @return {Highcharts.MapChart}
             * The chart object.
             */
            function mapChart(a, b, c) {
                return new MapChart(a, b, c);
            }
            MapChart.mapChart = mapChart;
            /**
             * Utility for reading SVG paths directly.
             *
             * @requires modules/map
             *
             * @function Highcharts.splitPath
             *
             * @param {string|Array<(string|number)>} path
             *        Path to split.
             *
             * @return {Highcharts.SVGPathArray}
             * Splitted SVG path
             */
            function splitPath(path) {
                let arr;
                if (typeof path === 'string') {
                    path = path
                        // Move letters apart
                        .replace(/([A-Z])/gi, ' $1 ')
                        // Trim
                        .replace(/^\s*/, '').replace(/\s*$/, '');
                    // Split on spaces and commas. The semicolon is bogus, designed to
                    // circumvent string replacement in the pre-v7 assembler that built
                    // specific styled mode files.
                    const split = path.split(/[ ,;]+/);
                    arr = split.map((item) => {
                        if (!/[A-Z]/i.test(item)) {
                            return parseFloat(item);
                        }
                        return item;
                    });
                }
                else {
                    arr = path;
                }
                return SVGRenderer.prototype.pathToSegments(arr);
            }
            MapChart.splitPath = splitPath;
        })(MapChart || (MapChart = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return MapChart;
    });
    _registerModule(_modules, 'Maps/MapUtilities.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // Compute bounds from a path element
        const boundsFromPath = function (path) {
            let x2 = -Number.MAX_VALUE, x1 = Number.MAX_VALUE, y2 = -Number.MAX_VALUE, y1 = Number.MAX_VALUE, validBounds;
            path.forEach((seg) => {
                const x = seg[seg.length - 2], y = seg[seg.length - 1];
                if (typeof x === 'number' &&
                    typeof y === 'number') {
                    x1 = Math.min(x1, x);
                    x2 = Math.max(x2, x);
                    y1 = Math.min(y1, y);
                    y2 = Math.max(y2, y);
                    validBounds = true;
                }
            });
            if (validBounds) {
                return { x1, y1, x2, y2 };
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        const MapUtilities = {
            boundsFromPath
        };

        return MapUtilities;
    });
    _registerModule(_modules, 'Series/Map/MapPoint.js', [_modules['Series/ColorMapComposition.js'], _modules['Maps/MapUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ColorMapComposition, MU, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { boundsFromPath } = MU;
        const ScatterPoint = SeriesRegistry.seriesTypes.scatter.prototype.pointClass;
        const { extend, isNumber, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        class MapPoint extends ScatterPoint {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Get the projected path based on the geometry. May also be called on
             * mapData options (not point instances), hence static.
             * @private
             */
            static getProjectedPath(point, projection) {
                if (!point.projectedPath) {
                    if (projection && point.geometry) {
                        // Always true when given GeoJSON coordinates
                        projection.hasCoordinates = true;
                        point.projectedPath = projection.path(point.geometry);
                        // SVG path given directly in point options
                    }
                    else {
                        point.projectedPath = point.path;
                    }
                }
                return point.projectedPath || [];
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extend the Point object to split paths.
             * @private
             */
            applyOptions(options, x) {
                const series = this.series, point = super.applyOptions(options, x), joinBy = series.joinBy;
                if (series.mapData && series.mapMap) {
                    const joinKey = joinBy[1], mapKey = super.getNestedProperty(joinKey), mapPoint = typeof mapKey !== 'undefined' &&
                        series.mapMap[mapKey];
                    if (mapPoint) {
                        // Copy over properties; #20231 prioritize point.name
                        extend(point, {
                            ...mapPoint,
                            name: point.name ?? mapPoint.name
                        });
                    }
                    else if (series.pointArrayMap.indexOf('value') !== -1) {
                        point.value = point.value || null;
                    }
                }
                return point;
            }
            /**
             * Get the bounds in terms of projected units
             * @private
             */
            getProjectedBounds(projection) {
                const path = MapPoint.getProjectedPath(this, projection), bounds = boundsFromPath(path), properties = this.properties, mapView = this.series.chart.mapView;
                if (bounds) {
                    // Cache point bounding box for use to position data labels, bubbles
                    // etc
                    const propMiddleLon = properties && properties['hc-middle-lon'], propMiddleLat = properties && properties['hc-middle-lat'];
                    if (mapView && isNumber(propMiddleLon) && isNumber(propMiddleLat)) {
                        const projectedPoint = projection.forward([propMiddleLon, propMiddleLat]);
                        bounds.midX = projectedPoint[0];
                        bounds.midY = projectedPoint[1];
                    }
                    else {
                        const propMiddleX = properties && properties['hc-middle-x'], propMiddleY = properties && properties['hc-middle-y'];
                        bounds.midX = (bounds.x1 + (bounds.x2 - bounds.x1) * pick(this.middleX, isNumber(propMiddleX) ? propMiddleX : 0.5));
                        let middleYFraction = pick(this.middleY, isNumber(propMiddleY) ? propMiddleY : 0.5);
                        // No geographic geometry, only path given => flip
                        if (!this.geometry) {
                            middleYFraction = 1 - middleYFraction;
                        }
                        bounds.midY =
                            bounds.y2 - (bounds.y2 - bounds.y1) * middleYFraction;
                    }
                    return bounds;
                }
            }
            /**
             * Stop the fade-out
             * @private
             */
            onMouseOver(e) {
                U.clearTimeout(this.colorInterval);
                if (
                // Valid...
                (!this.isNull && this.visible) ||
                    // ... or interact anyway
                    this.series.options.nullInteraction) {
                    super.onMouseOver.call(this, e);
                }
                else {
                    // #3401 Tooltip doesn't hide when hovering over null points
                    this.series.onMouseOut();
                }
            }
            setVisible(vis) {
                const method = vis ? 'show' : 'hide';
                this.visible = this.options.visible = !!vis;
                // Show and hide associated elements
                if (this.dataLabel) {
                    this.dataLabel[method]();
                }
                // For invisible map points, render them as null points rather than
                // fully removing them. Makes more sense for color axes with data
                // classes.
                if (this.graphic) {
                    this.graphic.attr(this.series.pointAttribs(this));
                }
            }
            /**
             * Highmaps only. Zoom in on the point using the global animation.
             *
             * @sample maps/members/point-zoomto/
             *         Zoom to points from buttons
             *
             * @requires modules/map
             *
             * @function Highcharts.Point#zoomTo
             */
            zoomTo(animOptions) {
                const point = this, chart = point.series.chart, mapView = chart.mapView;
                let bounds = point.bounds;
                if (mapView && bounds) {
                    const inset = isNumber(point.insetIndex) &&
                        mapView.insets[point.insetIndex];
                    if (inset) {
                        // If in an inset, translate the bounds to pixels ...
                        const px1 = inset.projectedUnitsToPixels({
                            x: bounds.x1,
                            y: bounds.y1
                        }), px2 = inset.projectedUnitsToPixels({
                            x: bounds.x2,
                            y: bounds.y2
                        }), 
                        // ... then back to projected units in the main mapView
                        proj1 = mapView.pixelsToProjectedUnits({
                            x: px1.x,
                            y: px1.y
                        }), proj2 = mapView.pixelsToProjectedUnits({
                            x: px2.x,
                            y: px2.y
                        });
                        bounds = {
                            x1: proj1.x,
                            y1: proj1.y,
                            x2: proj2.x,
                            y2: proj2.y
                        };
                    }
                    mapView.fitToBounds(bounds, void 0, false);
                    point.series.isDirty = true;
                    chart.redraw(animOptions);
                }
            }
        }
        extend(MapPoint.prototype, {
            dataLabelOnNull: ColorMapComposition.pointMembers.dataLabelOnNull,
            moveToTopOnHover: ColorMapComposition.pointMembers.moveToTopOnHover,
            isValid: ColorMapComposition.pointMembers.isValid
        });
        /* *
         *
         *  Default Export
         *
         * */

        return MapPoint;
    });
    _registerModule(_modules, 'Series/Map/MapSeriesDefaults.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isNumber } = U;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * The map series is used for basic choropleth maps, where each map area has
         * a color based on its value.
         *
         * @sample maps/demo/all-maps/
         *         Choropleth map
         *
         * @extends      plotOptions.scatter
         * @excluding    boostBlending, boostThreshold, dragDrop, cluster, marker
         * @product      highmaps
         * @optionparent plotOptions.map
         *
         * @private
         */
        const MapSeriesDefaults = {
            /**
             * Whether the MapView takes this series into account when computing the
             * default zoom and center of the map.
             *
             * @sample maps/series/affectsmapview/
             *         US map with world map backdrop
             *
             * @since 10.0.0
             *
             * @private
             */
            affectsMapView: true,
            animation: false, // Makes the complex shapes slow
            dataLabels: {
                crop: false,
                formatter: function () {
                    const { numberFormatter } = this.series.chart;
                    const { value } = this.point;
                    return isNumber(value) ?
                        numberFormatter(value, -1) :
                        this.point.name; // #20231
                },
                inside: true, // For the color
                overflow: false,
                padding: 0,
                verticalAlign: 'middle'
            },
            /**
             * The SVG value used for the `stroke-linecap` and `stroke-linejoin` of
             * the map borders. Round means that borders are rounded in the ends and
             * bends.
             *
             * @sample maps/demo/mappoint-mapmarker/
             *         Backdrop coastline with round linecap
             *
             * @type   {Highcharts.SeriesLinecapValue}
             * @since  10.3.3
             */
            linecap: 'round',
            /**
             * @ignore-option
             *
             * @private
             */
            marker: null,
            /**
             * The color to apply to null points.
             *
             * In styled mode, the null point fill is set in the
             * `.highcharts-null-point` class.
             *
             * @sample maps/demo/all-areas-as-null/
             *         Null color
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             *
             * @private
             */
            nullColor: "#f7f7f7" /* Palette.neutralColor3 */,
            /**
             * Whether to allow pointer interaction like tooltips and mouse events
             * on null points.
             *
             * @type      {boolean}
             * @since     4.2.7
             * @apioption plotOptions.map.nullInteraction
             *
             * @private
             */
            stickyTracking: false,
            tooltip: {
                followPointer: true,
                pointFormat: '{point.name}: {point.value}<br/>'
            },
            /**
             * @ignore-option
             *
             * @private
             */
            turboThreshold: 0,
            /**
             * Whether all areas of the map defined in `mapData` should be rendered.
             * If `true`, areas which don't correspond to a data point, are rendered
             * as `null` points. If `false`, those areas are skipped.
             *
             * @sample maps/plotoptions/series-allareas-false/
             *         All areas set to false
             *
             * @type      {boolean}
             * @default   true
             * @product   highmaps
             * @apioption plotOptions.series.allAreas
             *
             * @private
             */
            allAreas: true,
            /**
             * The border color of the map areas.
             *
             * In styled mode, the border stroke is given in the `.highcharts-point`
             * class.
             *
             * @sample {highmaps} maps/plotoptions/series-border/
             *         Borders demo
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #cccccc
             * @product   highmaps
             * @apioption plotOptions.series.borderColor
             *
             * @private
             */
            borderColor: "#e6e6e6" /* Palette.neutralColor10 */,
            /**
             * The border width of each map area.
             *
             * In styled mode, the border stroke width is given in the
             * `.highcharts-point` class.
             *
             * @sample maps/plotoptions/series-border/
             *         Borders demo
             *
             * @type      {number}
             * @default   1
             * @product   highmaps
             * @apioption plotOptions.series.borderWidth
             *
             * @private
             */
            borderWidth: 1,
            /**
             * @type      {string}
             * @default   value
             * @apioption plotOptions.map.colorKey
             */
            /**
             * What property to join the `mapData` to the value data. For example,
             * if joinBy is "code", the mapData items with a specific code is merged
             * into the data with the same code. For maps loaded from GeoJSON, the
             * keys may be held in each point's `properties` object.
             *
             * The joinBy option can also be an array of two values, where the first
             * points to a key in the `mapData`, and the second points to another
             * key in the `data`.
             *
             * When joinBy is `null`, the map items are joined by their position in
             * the array, which performs much better in maps with many data points.
             * This is the recommended option if you are printing more than a
             * thousand data points and have a backend that can preprocess the data
             * into a parallel array of the mapData.
             *
             * @sample maps/plotoptions/series-border/
             *         Joined by "code"
             * @sample maps/demo/geojson/
             *         GeoJSON joined by an array
             * @sample maps/series/joinby-null/
             *         Simple data joined by null
             *
             * @type      {string|Array<string>}
             * @default   hc-key
             * @product   highmaps
             * @apioption plotOptions.series.joinBy
             *
             * @private
             */
            joinBy: 'hc-key',
            /**
             * Define the z index of the series.
             *
             * @type      {number}
             * @product   highmaps
             * @apioption plotOptions.series.zIndex
             */
            /**
             * @apioption plotOptions.series.states
             *
             * @private
             */
            states: {
                /**
                 * @apioption plotOptions.series.states.hover
                 */
                hover: {
                    /** @ignore-option */
                    halo: void 0,
                    /**
                     * The color of the shape in this state.
                     *
                     * @sample maps/plotoptions/series-states-hover/
                     *         Hover options
                     *
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @product   highmaps
                     * @apioption plotOptions.series.states.hover.color
                     */
                    /**
                     * The border color of the point in this state.
                     *
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @product   highmaps
                     * @apioption plotOptions.series.states.hover.borderColor
                     */
                    borderColor: "#666666" /* Palette.neutralColor60 */,
                    /**
                     * The border width of the point in this state
                     *
                     * @type      {number}
                     * @product   highmaps
                     * @apioption plotOptions.series.states.hover.borderWidth
                     */
                    borderWidth: 2
                    /**
                     * The relative brightness of the point when hovered, relative
                     * to the normal point color.
                     *
                     * @type      {number}
                     * @product   highmaps
                     * @default   0
                     * @apioption plotOptions.series.states.hover.brightness
                     */
                },
                /**
                 * @apioption plotOptions.series.states.normal
                 */
                normal: {
                    /**
                     * @productdesc {highmaps}
                     * The animation adds some latency in order to reduce the effect
                     * of flickering when hovering in and out of for example an
                     * uneven coastline.
                     *
                     * @sample {highmaps} maps/plotoptions/series-states-animation-false/
                     *         No animation of fill color
                     *
                     * @apioption plotOptions.series.states.normal.animation
                     */
                    animation: true
                },
                /**
                 * @apioption plotOptions.series.states.select
                 */
                select: {
                    /**
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @default   #cccccc
                     * @product   highmaps
                     * @apioption plotOptions.series.states.select.color
                     */
                    color: "#cccccc" /* Palette.neutralColor20 */
                }
            },
            legendSymbol: 'rectangle'
        };
        /**
         * An array of objects containing a `geometry` or `path` definition and
         * optionally additional properties to join in the `data` as per the `joinBy`
         * option. GeoJSON and TopoJSON structures can also be passed directly into
         * `mapData`.
         *
         * @sample maps/demo/category-map/
         *         Map data and joinBy
         * @sample maps/series/mapdata-multiple/
         *         Multiple map sources
         *
         * @type      {Array<Highcharts.SeriesMapDataOptions>|Highcharts.GeoJSON|Highcharts.TopoJSON}
         * @product   highmaps
         * @apioption series.mapData
         */
        /**
         * A `map` series. If the [type](#series.map.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.map
         * @excluding dataParser, dataURL, dragDrop, marker
         * @product   highmaps
         * @apioption series.map
         */
        /**
         * An array of data points for the series. For the `map` series type, points can
         * be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `value` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `[hc-key, value]`. Example:
         *    ```js
         *        data: [
         *            ['us-ny', 0],
         *            ['us-mi', 5],
         *            ['us-tx', 3],
         *            ['us-ak', 5]
         *        ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.map.turboThreshold),
         *    this option is not available.
         *    ```js
         *        data: [{
         *            value: 6,
         *            name: "Point2",
         *            color: "#00FF00"
         *        }, {
         *            value: 6,
         *            name: "Point1",
         *            color: "#FF00FF"
         *        }]
         *    ```
         *
         * @type      {Array<number|Array<string,(number|null)>|null|*>}
         * @product   highmaps
         * @apioption series.map.data
         */
        /**
         * When using automatic point colors pulled from the global
         * [colors](colors) or series-specific
         * [plotOptions.map.colors](series.colors) collections, this option
         * determines whether the chart should receive one color per series or
         * one color per point.
         *
         * In styled mode, the `colors` or `series.colors` arrays are not
         * supported, and instead this option gives the points individual color
         * class names on the form `highcharts-color-{n}`.
         *
         * @see [series colors](#plotOptions.map.colors)
         *
         * @sample {highmaps} maps/plotoptions/mapline-colorbypoint-false/
         *         Mapline colorByPoint set to false by default
         * @sample {highmaps} maps/plotoptions/mapline-colorbypoint-true/
         *         Mapline colorByPoint set to true
         *
         * @type      {boolean}
         * @default   false
         * @since     2.0
         * @product   highmaps
         * @apioption plotOptions.map.colorByPoint
         */
        /**
         * A series specific or series type specific color set to apply instead
         * of the global [colors](#colors) when [colorByPoint](
         * #plotOptions.map.colorByPoint) is true.
         *
         * @type      {Array<Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject>}
         * @since     3.0
         * @product   highmaps
         * @apioption plotOptions.map.colors
         */
        /**
         * Individual color for the point. By default the color is either used
         * to denote the value, or pulled from the global `colors` array.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highmaps
         * @apioption series.map.data.color
         */
        /**
         * Individual data label for each point. The options are the same as
         * the ones for [plotOptions.series.dataLabels](
         * #plotOptions.series.dataLabels).
         *
         * @sample maps/series/data-datalabels/
         *         Disable data labels for individual areas
         *
         * @type      {Highcharts.DataLabelsOptions}
         * @product   highmaps
         * @apioption series.map.data.dataLabels
         */
        /**
         * The `id` of a series in the [drilldown.series](#drilldown.series)
         * array to use for a drilldown for this point.
         *
         * @sample maps/demo/map-drilldown/
         *         Basic drilldown
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.drilldown
         */
        /**
         * For map and mapline series types, the geometry of a point.
         *
         * To achieve a better separation between the structure and the data,
         * it is recommended to use `mapData` to define the geometry instead
         * of defining it on the data points themselves.
         *
         * The geometry object is compatible to that of a `feature` in GeoJSON, so
         * features of GeoJSON can be passed directly into the `data`, optionally
         * after first filtering and processing it.
         *
         * For pre-projected maps (like GeoJSON maps from our
         * [map collection](https://code.highcharts.com/mapdata/)), user has to specify
         * coordinates in `projectedUnits` for geometry type other than `Point`,
         * instead of `[longitude, latitude]`.
         *
         * @sample maps/series/mappoint-line-geometry/
         *         Map point and line geometry
         * @sample maps/series/geometry-types/
         *         Geometry types
         *
         * @type      {Object}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.map.data.geometry
         */
        /**
         * The geometry type. Can be one of `LineString`, `Polygon`, `MultiLineString`
         * or `MultiPolygon`.
         *
         * @sample maps/series/geometry-types/
         *         Geometry types
         *
         * @declare   Highcharts.MapGeometryTypeValue
         * @type      {string}
         * @since     9.3.0
         * @product   highmaps
         * @validvalue ["LineString", "Polygon", "MultiLineString", "MultiPolygon"]
         * @apioption series.map.data.geometry.type
         */
        /**
         * The geometry coordinates in terms of arrays of `[longitude, latitude]`, or
         * a two dimensional array of the same. The dimensionality must comply with the
         * `type`.
         *
         * @type      {Array<LonLatArray>|Array<Array<LonLatArray>>}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.map.data.geometry.coordinates
         */
        /**
         * An id for the point. This can be used after render time to get a
         * pointer to the point object through `chart.get()`.
         *
         * @sample maps/series/data-id/
         *         Highlight a point by id
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.id
         */
        /**
         * When data labels are laid out on a map, Highmaps runs a simplified
         * algorithm to detect collision. When two labels collide, the one with
         * the lowest rank is hidden. By default the rank is computed from the
         * area.
         *
         * @type      {number}
         * @product   highmaps
         * @apioption series.map.data.labelrank
         */
        /**
         * The relative mid point of an area, used to place the data label.
         * Ranges from 0 to 1\. When `mapData` is used, middleX can be defined
         * there.
         *
         * @type      {number}
         * @default   0.5
         * @product   highmaps
         * @apioption series.map.data.middleX
         */
        /**
         * The relative mid point of an area, used to place the data label.
         * Ranges from 0 to 1\. When `mapData` is used, middleY can be defined
         * there.
         *
         * @type      {number}
         * @default   0.5
         * @product   highmaps
         * @apioption series.map.data.middleY
         */
        /**
         * The name of the point as shown in the legend, tooltip, dataLabel
         * etc.
         *
         * @sample maps/series/data-datalabels/
         *         Point names
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.name
         */
        /**
         * For map and mapline series types, the SVG path for the shape. For
         * compatibility with old IE, not all SVG path definitions are supported,
         * but M, L and C operators are safe.
         *
         * To achieve a better separation between the structure and the data,
         * it is recommended to use `mapData` to define that paths instead
         * of defining them on the data points themselves.
         *
         * For providing true geographical shapes based on longitude and latitude, use
         * the `geometry` option instead.
         *
         * @sample maps/series/data-path/
         *         Paths defined in data
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.path
         */
        /**
         * The numeric value of the data point.
         *
         * @type      {number|null}
         * @product   highmaps
         * @apioption series.map.data.value
         */
        /**
         * Individual point events
         *
         * @extends   plotOptions.series.point.events
         * @product   highmaps
         * @apioption series.map.data.events
         */
        /* *
         *
         *  Default Export
         *
         * */

        return MapSeriesDefaults;
    });
    _registerModule(_modules, 'Maps/MapViewDefaults.js', [], function () {
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
         * The `mapView` options control the initial view of the chart, and how
         * projection is set up for raw geoJSON maps (beta as of v9.3).
         *
         * To set the view dynamically after chart generation, see
         * [mapView.setView](/class-reference/Highcharts.MapView#setView).
         *
         * @since        9.3.0
         * @product      highmaps
         * @optionparent mapView
         */
        const MapViewDefaults = {
            /**
             * The center of the map in terms of longitude and latitude. For
             * preprojected maps (like the GeoJSON files in Map Collection v1.x),
             * the units are projected x and y units.
             *
             * @sample {highmaps} maps/mapview/center-zoom
             *         Custom view of a world map
             * @sample {highmaps} maps/mapview/get-view
             *         Report the current view of a preprojected map
             *
             * @type    {Highcharts.LonLatArray}
             * @default [0, 0]
             */
            center: [0, 0],
            /**
             * Fit the map to a geometry object consisting of individual points or
             * polygons. This is practical for responsive maps where we want to
             * focus on a specific area regardless of map size - unlike setting
             * `center` and `zoom`, where the view doesn't scale with different map
             * sizes.
             *
             * The geometry can be combined with the [padding](#mapView.padding)
             * option to avoid touching the edges of the chart.
             *
             * @sample maps/mapview/fittogeometry
             *         Fitting the view to geometries
             *
             * @type {object}
             * @since 10.3.3
             */
            fitToGeometry: void 0,
            /**
             * Prevents the end user from zooming too far in on the map. See
             * [zoom](#mapView.zoom).
             *
             * @sample {highmaps} maps/mapview/maxzoom
             *         Prevent zooming in too far
             *
             * @type   {number|undefined}
             */
            maxZoom: void 0,
            /**
             * The padding inside the plot area when auto fitting to the map bounds.
             * A number signifies pixels, and a percentage is relative to the plot
             * area size.
             *
             * An array sets individual padding for the sides in the order [top,
             * right, bottom, left].
             *
             * @sample {highmaps} maps/chart/plotbackgroundcolor-color
             *         Visible plot area and percentage padding
             * @sample {highmaps} maps/demo/mappoint-mapmarker
             *         Padding for individual sides
             *
             * @type  {number|string|Array<number|string>}
             */
            padding: 0,
            /**
             * The projection options allow applying client side projection to a map
             * given in geographic coordinates, typically from TopoJSON or GeoJSON.
             *
             * @sample maps/demo/projection-explorer
             *         Projection explorer
             * @sample maps/demo/topojson-projection
             *         Orthographic projection
             * @sample maps/mapview/projection-custom-proj4js
             *         Custom UTM projection definition
             * @sample maps/mapview/projection-custom-d3geo
             *         Custom Robinson projection definition
             *
             * @type   {object}
             */
            projection: {
                /**
                 * Projection name. Built-in projections are `EqualEarth`,
                 * `LambertConformalConic`, `Miller`, `Orthographic` and `WebMercator`.
                 *
                 * @sample maps/demo/projection-explorer
                 *         Projection explorer
                 * @sample maps/mapview/projection-custom-proj4js
                 *         Custom UTM projection definition
                 * @sample maps/mapview/projection-custom-d3geo
                 *         Custom Robinson projection definition
                 * @sample maps/demo/topojson-projection
                 *         Orthographic projection
                 *
                 * @type   {string}
                 */
                name: void 0,
                /**
                 * The two standard parallels that define the map layout in conic
                 * projections, like the LambertConformalConic projection. If only
                 * one number is given, the second parallel will be the same as the
                 * first.
                 *
                 * @sample maps/mapview/projection-parallels
                 *         LCC projection with parallels
                 * @sample maps/demo/projection-explorer
                 *         Projection explorer
                 *
                 * @type {Array<number>}
                 */
                parallels: void 0,
                /**
                 * Rotation of the projection in terms of degrees `[lambda, phi,
                 * gamma]`. When given, a three-axis spherical rotation is be applied
                 * to the globe prior to the projection.
                 *
                 * * `lambda` shifts the longitudes by the given value.
                 * * `phi` shifts the latitudes by the given value. Can be omitted.
                 * * `gamma` applies a _roll_. Can be omitted.
                 *
                 * @sample maps/demo/projection-explorer
                 *         Projection explorer
                 * @sample maps/mapview/projection-america-centric
                 *         America-centric world map
                 */
                rotation: void 0
            },
            /**
             * The zoom level of a map. Higher zoom levels means more zoomed in. An
             * increase of 1 zooms in to a quarter of the viewed area (half the
             * width and height). Defaults to fitting to the map bounds.
             *
             * In a `WebMercator` projection, a zoom level of 0 represents
             * the world in a 256x256 pixel square. This is a common concept for WMS
             * tiling software.
             *
             * @sample {highmaps} maps/mapview/center-zoom
             *         Custom view of a world map
             * @sample {highmaps} maps/mapview/get-view
             *         Report the current view of a preprojected map
             *
             * @type   {number}
             */
            zoom: void 0,
            /**
             * Generic options for the placement and appearance of map insets like
             * non-contiguous territories.
             *
             * @since        10.0.0
             * @product      highmaps
             * @optionparent mapView.insetOptions
             */
            insetOptions: {
                /**
                 * The border color of the insets.
                 *
                 * @sample maps/mapview/insetoptions-border
                 *         Inset border options
                 *
                 * @type {Highcharts.ColorType}
                 */
                borderColor: "#cccccc" /* Palette.neutralColor20 */,
                /**
                 * The pixel border width of the insets.
                 *
                 * @sample maps/mapview/insetoptions-border
                 *         Inset border options
                 */
                borderWidth: 1,
                /**
                 * The padding of the insets. Can be either a number of pixels, a
                 * percentage string, or an array of either. If an array is given, it
                 * sets the top, right, bottom, left paddings respectively.
                 *
                 * @type {number|string|Array<number|string>}
                 */
                padding: '10%',
                /**
                 * What coordinate system the `field` and `borderPath` should relate to.
                 * If `plotBox`, they will be fixed to the plot box and responsively
                 * move in relation to the main map. If `mapBoundingBox`, they will be
                 * fixed to the map bounding box, which is constant and centered in
                 * different chart sizes and ratios.
                 *
                 * @validvalue ["plotBox", "mapBoundingBox"]
                 */
                relativeTo: 'mapBoundingBox',
                /**
                 * The individual MapView insets, typically used for non-contiguous
                 * areas of a country. Each item inherits from the generic
                 * `insetOptions`.
                 *
                 * Some of the TopoJSON files of the [Highcharts Map
                 * Collection](https://code.highcharts.com/mapdata/) include a property
                 * called `hc-recommended-mapview`, and some of these include insets. In
                 * order to override the recommended inset options, an inset option with
                 * a matching id can be applied, and it will be merged into the embedded
                 * settings.
                 *
                 * @sample      maps/mapview/insets-extended
                 *              Extending the embedded insets
                 * @sample      maps/mapview/insets-complete
                 *              Complete inset config from scratch
                 *
                 * @extends     mapView.insetOptions
                 * @type        Array<Object>
                 * @product     highmaps
                 * @apioption   mapView.insets
                 */
                /**
                 * A geometry object of type `MultiLineString` defining the border path
                 * of the inset in terms of `units`. If undefined, a border is rendered
                 * around the `field` geometry. It is recommended that the `borderPath`
                 * partly follows the outline of the `field` in order to make pointer
                 * positioning consistent.
                 *
                 * @sample    maps/mapview/insets-complete
                 *            Complete inset config with `borderPath`
                 *
                 * @product   highmaps
                 * @type      {Object|undefined}
                 * @apioption mapView.insets.borderPath
                 */
                /**
                 * A geometry object of type `Polygon` defining where in the chart the
                 * inset should be rendered, in terms of `units` and relative to the
                 * `relativeTo` setting. If a `borderPath` is omitted, a border is
                 * rendered around the field. If undefined, the inset is rendered in the
                 * full plot area.
                 *
                 * @sample    maps/mapview/insets-extended
                 *            Border path emitted, field is rendered
                 *
                 * @product   highmaps
                 * @type      {object|undefined}
                 * @apioption mapView.insets.field
                 */
                /**
                 * A geometry object of type `Polygon` encircling the shapes that should
                 * be rendered in the inset, in terms of geographic coordinates.
                 * Geometries within this geometry are removed from the default map view
                 * and rendered in the inset.
                 *
                 * @sample    maps/mapview/insets-complete
                 *            Complete inset config with `geoBounds`
                 *
                 * @product   highmaps
                 * @type      {object}
                 * @apioption mapView.insets.geoBounds
                 */
                /**
                 * The id of the inset, used for internal reference.
                 *
                 * @sample    maps/mapview/insets-extended
                 *            Extending recommended insets by id
                 *
                 * @product   highmaps
                 * @type      {string}
                 * @apioption mapView.insets.id
                 */
                /**
                 * The projection options for the inset.
                 *
                 * @product   highmaps
                 * @type      {Object}
                 * @extends   mapView.projection
                 * @apioption mapView.insets.projection
                 */
                /**
                 * What units to use for the `field` and `borderPath` geometries. If
                 * `percent` (default), they relate to the box given in `relativeTo`. If
                 * `pixels`, they are absolute values.
                 *
                 * @validvalue ["percent", "pixels"]
                 */
                units: 'percent'
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return MapViewDefaults;
    });
    _registerModule(_modules, 'Maps/GeoJSONComposition.js', [_modules['Core/Globals.js'], _modules['Core/Templating.js'], _modules['Core/Utilities.js']], function (H, T, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { win } = H;
        const { format } = T;
        const { error, extend, merge, wrap } = U;
        /* *
         *
         *  Composition
         *
         * */
        var GeoJSONComposition;
        (function (GeoJSONComposition) {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Deprecated. Use `MapView.lonLatToProjectedUnits` instead.
             *
             * @deprecated
             *
             * @requires modules/map
             *
             * @function Highcharts.Chart#fromLatLonToPoint
             *
             * @param {Highcharts.MapLonLatObject} lonLat
             *        Coordinates.
             *
             * @return {Highcharts.ProjectedXY}
             * X and Y coordinates in terms of projected values
             */
            function chartFromLatLonToPoint(lonLat) {
                return this.mapView && this.mapView.lonLatToProjectedUnits(lonLat);
            }
            /**
             * Deprecated. Use `MapView.projectedUnitsToLonLat` instead.
             *
             * @deprecated
             *
             * @requires modules/map
             *
             * @function Highcharts.Chart#fromPointToLatLon
             *
             * @param {Highcharts.Point|Highcharts.ProjectedXY} point
             *        A `Point` instance or anything containing `x` and `y` properties
             *        with numeric values.
             *
             * @return {Highcharts.MapLonLatObject|undefined}
             * An object with `lat` and `lon` properties.
             */
            function chartFromPointToLatLon(point) {
                return this.mapView && this.mapView.projectedUnitsToLonLat(point);
            }
            /**
             * Highcharts Maps only. Get point from latitude and longitude using
             * specified transform definition.
             *
             * @requires modules/map
             *
             * @sample maps/series/latlon-transform/
             *         Use specific transformation for lat/lon
             *
             * @function Highcharts.Chart#transformFromLatLon
             *
             * @param {Highcharts.MapLonLatObject} latLon
             *        A latitude/longitude object.
             *
             * @param {*} transform
             *        The transform definition to use as explained in the
             *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
             *
             * @return {ProjectedXY}
             * An object with `x` and `y` properties.
             */
            function chartTransformFromLatLon(latLon, transform) {
                /**
                 * Allows to manually load the proj4 library from Highcharts options
                 * instead of the `window`.
                 * In case of loading the library from a `script` tag,
                 * this option is not needed, it will be loaded from there by default.
                 *
                 * @type      {Function}
                 * @product   highmaps
                 * @apioption chart.proj4
                 */
                const proj4 = this.options.chart.proj4 || win.proj4;
                if (!proj4) {
                    error(21, false, this);
                    return;
                }
                const { jsonmarginX = 0, jsonmarginY = 0, jsonres = 1, scale = 1, xoffset = 0, xpan = 0, yoffset = 0, ypan = 0 } = transform;
                const projected = proj4(transform.crs, [latLon.lon, latLon.lat]), cosAngle = transform.cosAngle ||
                    (transform.rotation && Math.cos(transform.rotation)), sinAngle = transform.sinAngle ||
                    (transform.rotation && Math.sin(transform.rotation)), rotated = transform.rotation ? [
                    projected[0] * cosAngle + projected[1] * sinAngle,
                    -projected[0] * sinAngle + projected[1] * cosAngle
                ] : projected;
                return {
                    x: ((rotated[0] - xoffset) * scale + xpan) * jsonres + jsonmarginX,
                    y: -(((yoffset - rotated[1]) * scale + ypan) * jsonres - jsonmarginY)
                };
            }
            /**
             * Highcharts Maps only. Get latLon from point using specified transform
             * definition. The method returns an object with the numeric properties
             * `lat` and `lon`.
             *
             * @requires modules/map
             *
             * @sample maps/series/latlon-transform/
             *         Use specific transformation for lat/lon
             *
             * @function Highcharts.Chart#transformToLatLon
             *
             * @param {Highcharts.Point|Highcharts.ProjectedXY} point
             *        A `Point` instance, or any object containing the properties `x`
             *        and `y` with numeric values.
             *
             * @param {*} transform
             *        The transform definition to use as explained in the
             *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
             *
             * @return {Highcharts.MapLonLatObject|undefined}
             * An object with `lat` and `lon` properties.
             */
            function chartTransformToLatLon(point, transform) {
                const proj4 = this.options.chart.proj4 || win.proj4;
                if (!proj4) {
                    error(21, false, this);
                    return;
                }
                if (point.y === null) {
                    return;
                }
                const { jsonmarginX = 0, jsonmarginY = 0, jsonres = 1, scale = 1, xoffset = 0, xpan = 0, yoffset = 0, ypan = 0 } = transform;
                const normalized = {
                    x: ((point.x - jsonmarginX) / jsonres - xpan) / scale + xoffset,
                    y: ((point.y - jsonmarginY) / jsonres + ypan) / scale + yoffset
                }, cosAngle = transform.cosAngle ||
                    (transform.rotation && Math.cos(transform.rotation)), sinAngle = transform.sinAngle ||
                    (transform.rotation && Math.sin(transform.rotation)), 
                // Note: Inverted sinAngle to reverse rotation direction
                projected = proj4(transform.crs, 'WGS84', transform.rotation ? {
                    x: normalized.x * cosAngle + normalized.y * -sinAngle,
                    y: normalized.x * sinAngle + normalized.y * cosAngle
                } : normalized);
                return { lat: projected.y, lon: projected.x };
            }
            /** @private */
            function compose(ChartClass) {
                const chartProto = ChartClass.prototype;
                if (!chartProto.transformFromLatLon) {
                    chartProto.fromLatLonToPoint = chartFromLatLonToPoint;
                    chartProto.fromPointToLatLon = chartFromPointToLatLon;
                    chartProto.transformFromLatLon = chartTransformFromLatLon;
                    chartProto.transformToLatLon = chartTransformToLatLon;
                    wrap(chartProto, 'addCredits', wrapChartAddCredit);
                }
            }
            GeoJSONComposition.compose = compose;
            /**
             * Highcharts Maps only. Restructure a GeoJSON or TopoJSON object in
             * preparation to be read directly by the
             * {@link https://api.highcharts.com/highmaps/plotOptions.series.mapData|series.mapData}
             * option. The object will be broken down to fit a specific Highcharts type,
             * either `map`, `mapline` or `mappoint`. Meta data in GeoJSON's properties
             * object will be copied directly over to {@link Point.properties} in
             * Highcharts Maps.
             *
             * @requires modules/map
             *
             * @sample maps/demo/geojson/ Simple areas
             * @sample maps/demo/mapline-mappoint/ Multiple types
             * @sample maps/series/mapdata-multiple/ Multiple map sources
             *
             * @function Highcharts.geojson
             *
             * @param {Highcharts.GeoJSON|Highcharts.TopoJSON} json
             *        The GeoJSON or TopoJSON structure to parse, represented as a
             *        JavaScript object.
             *
             * @param {string} [hType=map]
             *        The Highcharts Maps series type to prepare for. Setting "map" will
             *        return GeoJSON polygons and multipolygons. Setting "mapline" will
             *        return GeoJSON linestrings and multilinestrings. Setting
             *        "mappoint" will return GeoJSON points and multipoints.
             *
             *
             * @return {Array<*>} An object ready for the `mapData` option.
             */
            function geojson(json, hType = 'map', series) {
                const mapData = [];
                const geojson = json.type === 'Topology' ? topo2geo(json) : json, features = geojson.features;
                for (let i = 0, iEnd = features.length; i < iEnd; ++i) {
                    const feature = features[i], geometry = feature.geometry || {}, type = geometry.type, coordinates = geometry.coordinates, properties = feature.properties;
                    let pointOptions;
                    if ((hType === 'map' || hType === 'mapbubble') &&
                        (type === 'Polygon' || type === 'MultiPolygon')) {
                        if (coordinates.length) {
                            pointOptions = { geometry: { coordinates, type } };
                        }
                    }
                    else if (hType === 'mapline' &&
                        (type === 'LineString' ||
                            type === 'MultiLineString')) {
                        if (coordinates.length) {
                            pointOptions = { geometry: { coordinates, type } };
                        }
                    }
                    else if (hType === 'mappoint' && type === 'Point') {
                        if (coordinates.length) {
                            pointOptions = { geometry: { coordinates, type } };
                        }
                    }
                    if (pointOptions) {
                        const name = properties && (properties.name || properties.NAME), lon = properties && properties.lon, lat = properties && properties.lat;
                        mapData.push(extend(pointOptions, {
                            lat: typeof lat === 'number' ? lat : void 0,
                            lon: typeof lon === 'number' ? lon : void 0,
                            name: typeof name === 'string' ? name : void 0,
                            /**
                             * In Highcharts Maps, when data is loaded from GeoJSON, the
                             * GeoJSON item's properies are copied over here.
                             *
                             * @requires modules/map
                             * @name Highcharts.Point#properties
                             * @type {*}
                             */
                            properties
                        }));
                    }
                }
                // Create a credits text that includes map source, to be picked up in
                // Chart.addCredits
                if (series && geojson.copyrightShort) {
                    series.chart.mapCredits = format(series.chart.options.credits?.mapText, { geojson: geojson });
                    series.chart.mapCreditsFull = format(series.chart.options.credits?.mapTextFull, { geojson: geojson });
                }
                return mapData;
            }
            GeoJSONComposition.geojson = geojson;
            /**
             * Convert a TopoJSON topology to GeoJSON. By default the first object is
             * handled.
             * Based on https://github.com/topojson/topojson-specification
             */
            function topo2geo(topology, objectName) {
                // Decode first object/feature as default
                if (!objectName) {
                    objectName = Object.keys(topology.objects)[0];
                }
                const obj = topology.objects[objectName];
                // Already decoded with the same title => return cache
                if (obj['hc-decoded-geojson'] &&
                    obj['hc-decoded-geojson'].title === topology.title) {
                    return obj['hc-decoded-geojson'];
                }
                // Do the initial transform
                let arcsArray = topology.arcs;
                if (topology.transform) {
                    const arcs = topology.arcs, { scale, translate } = topology.transform;
                    let positionArray, x, y;
                    arcsArray = [];
                    for (let i = 0, iEnd = arcs.length; i < iEnd; ++i) {
                        const positions = arcs[i];
                        arcsArray.push(positionArray = []);
                        x = 0;
                        y = 0;
                        for (let j = 0, jEnd = positions.length; j < jEnd; ++j) {
                            positionArray.push([
                                (x += positions[j][0]) * scale[0] + translate[0],
                                (y += positions[j][1]) * scale[1] + translate[1]
                            ]);
                        }
                    }
                }
                // Recurse down any depth of multi-dimensional arrays of arcs and insert
                // the coordinates
                const arcsToCoordinates = (arcs) => {
                    if (typeof arcs[0] === 'number') {
                        return arcs.reduce((coordinates, arcNo, i) => {
                            let arc = arcNo < 0 ? arcsArray[~arcNo] : arcsArray[arcNo];
                            // The first point of an arc is always identical to the last
                            // point of the previes arc, so slice it off to save further
                            // processing.
                            if (arcNo < 0) {
                                arc = arc.slice(0, i === 0 ? arc.length : arc.length - 1);
                                arc.reverse();
                            }
                            else if (i) {
                                arc = arc.slice(1);
                            }
                            return coordinates.concat(arc);
                        }, []);
                    }
                    return arcs.map(arcsToCoordinates);
                };
                const geometries = obj.geometries, features = [];
                for (let i = 0, iEnd = geometries.length; i < iEnd; ++i) {
                    features.push({
                        type: 'Feature',
                        properties: geometries[i].properties,
                        geometry: {
                            type: geometries[i].type,
                            coordinates: geometries[i].coordinates ||
                                arcsToCoordinates(geometries[i].arcs)
                        }
                    });
                }
                const geojson = {
                    type: 'FeatureCollection',
                    copyright: topology.copyright,
                    copyrightShort: topology.copyrightShort,
                    copyrightUrl: topology.copyrightUrl,
                    features,
                    'hc-recommended-mapview': obj['hc-recommended-mapview'],
                    bbox: topology.bbox,
                    title: topology.title
                };
                obj['hc-decoded-geojson'] = geojson;
                return geojson;
            }
            GeoJSONComposition.topo2geo = topo2geo;
            /**
             * Override addCredits to include map source by default.
             * @private
             */
            function wrapChartAddCredit(proceed, credits) {
                credits = merge(true, this.options.credits, credits);
                proceed.call(this, credits);
                // Add full map credits to hover
                if (this.credits && this.mapCreditsFull) {
                    this.credits.attr({
                        title: this.mapCreditsFull
                    });
                }
            }
        })(GeoJSONComposition || (GeoJSONComposition = {}));
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
         * Represents the loose structure of a geographic JSON file.
         *
         * @interface Highcharts.GeoJSON
         */ /**
        * Full copyright note of the geographic data.
        * @name Highcharts.GeoJSON#copyright
        * @type {string|undefined}
        */ /**
        * Short copyright note of the geographic data suitable for watermarks.
        * @name Highcharts.GeoJSON#copyrightShort
        * @type {string|undefined}
        */ /**
        * Additional meta information based on the coordinate reference system.
        * @name Highcharts.GeoJSON#crs
        * @type {Highcharts.Dictionary<any>|undefined}
        */ /**
        * Data sets of geographic features.
        * @name Highcharts.GeoJSON#features
        * @type {Array<Highcharts.GeoJSONFeature>}
        */ /**
        * Map projections and transformations to be used when calculating between
        * lat/lon and chart values. Required for lat/lon support on maps. Allows
        * resizing, rotating, and moving portions of a map within its projected
        * coordinate system while still retaining lat/lon support. If using lat/lon
        * on a portion of the map that does not match a `hitZone`, the definition with
        * the key `default` is used.
        * @name Highcharts.GeoJSON#hc-transform
        * @type {Highcharts.Dictionary<Highcharts.GeoJSONTranslation>|undefined}
        */ /**
        * Title of the geographic data.
        * @name Highcharts.GeoJSON#title
        * @type {string|undefined}
        */ /**
        * Type of the geographic data. Type of an optimized map collection is
        * `FeatureCollection`.
        * @name Highcharts.GeoJSON#type
        * @type {string|undefined}
        */ /**
        * Version of the geographic data.
        * @name Highcharts.GeoJSON#version
        * @type {string|undefined}
        */
        /**
         * Data set of a geographic feature.
         * @interface Highcharts.GeoJSONFeature
         * @extends Highcharts.Dictionary<*>
         */ /**
        * Data type of the geographic feature.
        * @name Highcharts.GeoJSONFeature#type
        * @type {string}
        */
        /**
         * Describes the map projection and transformations applied to a portion of
         * a map.
         * @interface Highcharts.GeoJSONTranslation
         */ /**
        * The coordinate reference system used to generate this portion of the map.
        * @name Highcharts.GeoJSONTranslation#crs
        * @type {string}
        */ /**
        * Define the portion of the map that this definition applies to. Defined as a
        * GeoJSON polygon feature object, with `type` and `coordinates` properties.
        * @name Highcharts.GeoJSONTranslation#hitZone
        * @type {Highcharts.Dictionary<*>|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonmarginX
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonmarginY
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonres
        * @type {number|undefined}
        */ /**
        * Specifies clockwise rotation of the coordinates after the projection, but
        * before scaling and panning. Defined in radians, relative to the coordinate
        * system origin.
        * @name Highcharts.GeoJSONTranslation#rotation
        * @type {number|undefined}
        */ /**
        * The scaling factor applied to the projected coordinates.
        * @name Highcharts.GeoJSONTranslation#scale
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#xoffset
        * @type {number|undefined}
        */ /**
        * X offset of projected coordinates after scaling.
        * @name Highcharts.GeoJSONTranslation#xpan
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#yoffset
        * @type {number|undefined}
        */ /**
        * Y offset of projected coordinates after scaling.
        * @name Highcharts.GeoJSONTranslation#ypan
        * @type {number|undefined}
        */
        /**
         * Result object of a map transformation.
         *
         * @interface Highcharts.ProjectedXY
         */ /**
        * X coordinate in projected units.
        * @name Highcharts.ProjectedXY#x
        * @type {number}
        */ /**
        * Y coordinate in projected units
        * @name Highcharts.ProjectedXY#y
        * @type {number}
        */
        /**
         * A latitude/longitude object.
         *
         * @interface Highcharts.MapLonLatObject
         */ /**
        * The latitude.
        * @name Highcharts.MapLonLatObject#lat
        * @type {number}
        */ /**
        * The longitude.
        * @name Highcharts.MapLonLatObject#lon
        * @type {number}
        */
        /**
         * An array of longitude, latitude.
         *
         * @typedef {Array<number>} Highcharts.LonLatArray
         */
        /**
         * An array of GeoJSON or TopoJSON objects or strings used as map data for
         * series.
         *
         * @typedef {Array<*>|GeoJSON|TopoJSON|string} Highcharts.MapDataType
         */
        /**
         * A TopoJSON object, see description on the
         * [project's GitHub page](https://github.com/topojson/topojson).
         *
         * @typedef {Object} Highcharts.TopoJSON
         */
        ''; // Detach doclets above

        return GeoJSONComposition;
    });
    _registerModule(_modules, 'Core/Geometry/PolygonClip.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Simple line string clipping. Clip to bounds and insert intersection points.
         * @private
         */
        function clipLineString(line, boundsPolygon) {
            const ret = [], l = clipPolygon(line, boundsPolygon, false);
            for (let i = 1; i < l.length; i++) {
                // Insert gap where two intersections follow each other
                if (l[i].isIntersection && l[i - 1].isIntersection) {
                    ret.push(l.splice(0, i));
                    i = 0;
                }
                // Push the rest
                if (i === l.length - 1) {
                    ret.push(l);
                }
            }
            return ret;
        }
        /**
         * Clip a polygon to another polygon using the Sutherland/Hodgman algorithm.
         * @private
         */
        function clipPolygon(subjectPolygon, boundsPolygon, closed = true) {
            let clipEdge1 = boundsPolygon[boundsPolygon.length - 1], clipEdge2, prevPoint, currentPoint, outputList = subjectPolygon;
            for (let j = 0; j < boundsPolygon.length; j++) {
                const inputList = outputList;
                clipEdge2 = boundsPolygon[j];
                outputList = [];
                prevPoint = closed ?
                    // Polygon, wrap around
                    inputList[inputList.length - 1] :
                    // Open line string, don't wrap
                    inputList[0];
                for (let i = 0; i < inputList.length; i++) {
                    currentPoint = inputList[i];
                    if (isInside(clipEdge1, clipEdge2, currentPoint)) {
                        if (!isInside(clipEdge1, clipEdge2, prevPoint)) {
                            outputList.push(intersection(clipEdge1, clipEdge2, prevPoint, currentPoint));
                        }
                        outputList.push(currentPoint);
                    }
                    else if (isInside(clipEdge1, clipEdge2, prevPoint)) {
                        outputList.push(intersection(clipEdge1, clipEdge2, prevPoint, currentPoint));
                    }
                    prevPoint = currentPoint;
                }
                clipEdge1 = clipEdge2;
            }
            return outputList;
        }
        /** @private */
        function isInside(clipEdge1, clipEdge2, p) {
            return ((clipEdge2[0] - clipEdge1[0]) * (p[1] - clipEdge1[1]) >
                (clipEdge2[1] - clipEdge1[1]) * (p[0] - clipEdge1[0]));
        }
        /** @private */
        function intersection(clipEdge1, clipEdge2, prevPoint, currentPoint) {
            const dc = [
                clipEdge1[0] - clipEdge2[0],
                clipEdge1[1] - clipEdge2[1]
            ], dp = [
                prevPoint[0] - currentPoint[0],
                prevPoint[1] - currentPoint[1]
            ], n1 = clipEdge1[0] * clipEdge2[1] - clipEdge1[1] * clipEdge2[0], n2 = prevPoint[0] * currentPoint[1] - prevPoint[1] * currentPoint[0], n3 = 1 / (dc[0] * dp[1] - dc[1] * dp[0]), intersection = [
                (n1 * dp[0] - n2 * dc[0]) * n3,
                (n1 * dp[1] - n2 * dc[1]) * n3
            ];
            intersection.isIntersection = true;
            return intersection;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const PolygonClip = {
            clipLineString,
            clipPolygon
        };

        return PolygonClip;
    });
    _registerModule(_modules, 'Maps/Projections/LambertConformalConic.js', [], function () {
        /* *
         * Lambert Conformal Conic projection
         * */
        /* *
         *
         *  Constants
         *
         * */
        const sign = Math.sign ||
            ((n) => (n === 0 ? 0 : n > 0 ? 1 : -1)), scale = 63.78137, deg2rad = Math.PI / 180, halfPI = Math.PI / 2, eps10 = 1e-6, tany = (y) => Math.tan((halfPI + y) / 2);
        /* *
         *
         *  Class
         *
         * */
        class LambertConformalConic {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options) {
                const parallels = (options.parallels || [])
                    .map((n) => n * deg2rad), lat1 = parallels[0] || 0, lat2 = parallels[1] ?? lat1, cosLat1 = Math.cos(lat1);
                if (typeof options.projectedBounds === 'object') {
                    this.projectedBounds = options.projectedBounds;
                }
                // Apply the global variables
                let n = lat1 === lat2 ?
                    Math.sin(lat1) :
                    Math.log(cosLat1 / Math.cos(lat2)) / Math.log(tany(lat2) / tany(lat1));
                if (Math.abs(n) < 1e-10) {
                    n = (sign(n) || 1) * 1e-10;
                }
                this.n = n;
                this.c = cosLat1 * Math.pow(tany(lat1), n) / n;
            }
            /* *
             *
             *  Functions
             *
             * */
            forward(lonLat) {
                const { c, n, projectedBounds } = this, lon = lonLat[0] * deg2rad;
                let lat = lonLat[1] * deg2rad;
                if (c > 0) {
                    if (lat < -halfPI + eps10) {
                        lat = -halfPI + eps10;
                    }
                }
                else {
                    if (lat > halfPI - eps10) {
                        lat = halfPI - eps10;
                    }
                }
                const r = c / Math.pow(tany(lat), n), x = r * Math.sin(n * lon) * scale, y = (c - r * Math.cos(n * lon)) * scale, xy = [x, y];
                if (projectedBounds && (x < projectedBounds.x1 ||
                    x > projectedBounds.x2 ||
                    y < projectedBounds.y1 ||
                    y > projectedBounds.y2)) {
                    xy.outside = true;
                }
                return xy;
            }
            inverse(xy) {
                const { c, n } = this, x = xy[0] / scale, y = xy[1] / scale, cy = c - y, rho = sign(n) * Math.sqrt(x * x + cy * cy);
                let l = Math.atan2(x, Math.abs(cy)) * sign(cy);
                if (cy * n < 0) {
                    l -= Math.PI * sign(x) * sign(cy);
                }
                return [
                    (l / n) / deg2rad,
                    (2 * Math.atan(Math.pow(c / rho, 1 / n)) - halfPI) / deg2rad
                ];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return LambertConformalConic;
    });
    _registerModule(_modules, 'Maps/Projections/EqualEarth.js', [], function () {
        /* *
         *
         * Equal Earth projection, an equal-area projection designed to minimize
         * distortion and remain pleasing to the eye.
         *
         * Invented by Bojan Šavrič, Bernhard Jenny, and Tom Patterson in 2018. It is
         * inspired by the widely used Robinson projection.
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2.0, scale = 74.03120656864502;
        /* *
         *
         *  Class
         *
         * */
        class EqualEarth {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -97.52595454902263,
                    y2: 97.52595454902263
                };
            }
            /* *
             *
             *  Functions
             *
             * */
            forward(lonLat) {
                const d = Math.PI / 180, paramLat = Math.asin(M * Math.sin(lonLat[1] * d)), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                const x = lonLat[0] * d * Math.cos(paramLat) * scale /
                    (M * (A1 +
                        3 * A2 * paramLatSq +
                        paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq))), y = paramLat * scale * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
                return [x, y];
            }
            inverse(xy) {
                const x = xy[0] / scale, y = xy[1] / scale, d = 180 / Math.PI, epsilon = 1e-9;
                let paramLat = y, paramLatSq, paramLatPow6, fy, fpy, dlat;
                for (let i = 0; i < 12; ++i) {
                    paramLatSq = paramLat * paramLat;
                    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - y;
                    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
                    paramLat -= dlat = fy / fpy;
                    if (Math.abs(dlat) < epsilon) {
                        break;
                    }
                }
                paramLatSq = paramLat * paramLat;
                paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                const lon = d * M * x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 *
                    (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat), lat = d * Math.asin(Math.sin(paramLat) / M);
                // If lons are beyond the border of a map -> resolve via break
                if (Math.abs(lon) > 180) {
                    return [NaN, NaN];
                }
                return [lon, lat];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return EqualEarth;
    });
    _registerModule(_modules, 'Maps/Projections/Miller.js', [], function () {
        /* *
         * Miller projection
         * */
        /* *
         *
         *  Constants
         *
         * */
        const quarterPI = Math.PI / 4, deg2rad = Math.PI / 180, scale = 63.78137;
        /* *
         *
         *  Class
         *
         * */
        class Miller {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -146.91480769173063,
                    y2: 146.91480769173063
                };
            }
            /* *
             *
             *  Functions
             *
             * */
            forward(lonLat) {
                return [
                    lonLat[0] * deg2rad * scale,
                    1.25 * scale * Math.log(Math.tan(quarterPI + 0.4 * lonLat[1] * deg2rad))
                ];
            }
            inverse(xy) {
                return [
                    (xy[0] / scale) / deg2rad,
                    2.5 * (Math.atan(Math.exp(0.8 * (xy[1] / scale))) - quarterPI) / deg2rad
                ];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Miller;
    });
    _registerModule(_modules, 'Maps/Projections/Orthographic.js', [], function () {
        /* *
         * Orthographic projection
         * */
        /* *
         *
         *  Constants
         *
         * */
        const deg2rad = Math.PI / 180, scale = 63.78460826781007;
        /* *
         *
         *  Class
         *
         * */
        class Orthographic {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.antimeridianCutting = false;
                this.bounds = {
                    x1: -scale,
                    x2: scale,
                    y1: -scale,
                    y2: scale
                };
            }
            /* *
             *
             *  Functions
             *
             * */
            forward(lonLat) {
                const lonDeg = lonLat[0], latDeg = lonLat[1], lat = latDeg * deg2rad, xy = [
                    Math.cos(lat) * Math.sin(lonDeg * deg2rad) * scale,
                    Math.sin(lat) * scale
                ];
                if (lonDeg < -90 || lonDeg > 90) {
                    xy.outside = true;
                }
                return xy;
            }
            inverse(xy) {
                const x = xy[0] / scale, y = xy[1] / scale, z = Math.sqrt(x * x + y * y), c = Math.asin(z), cSin = Math.sin(c), cCos = Math.cos(c);
                return [
                    Math.atan2(x * cSin, z * cCos) / deg2rad,
                    Math.asin(z && y * cSin / z) / deg2rad
                ];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Orthographic;
    });
    _registerModule(_modules, 'Maps/Projections/WebMercator.js', [], function () {
        /* *
         * Web Mercator projection, used for most online map tile services
         * */
        /* *
         *
         *  Constants
         *
         * */
        const r = 63.78137, deg2rad = Math.PI / 180;
        /* *
         *
         *  Class
         *
         * */
        class WebMercator {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -200.3750834278071,
                    y2: 200.3750834278071
                };
                this.maxLatitude = 85.0511287798; // The latitude that defines a square
            }
            /* *
             *
             *  Functions
             *
             * */
            forward(lonLat) {
                const sinLat = Math.sin(lonLat[1] * deg2rad), xy = [
                    r * lonLat[0] * deg2rad,
                    r * Math.log((1 + sinLat) / (1 - sinLat)) / 2
                ];
                if (Math.abs(lonLat[1]) > this.maxLatitude) {
                    xy.outside = true;
                }
                return xy;
            }
            inverse(xy) {
                return [
                    xy[0] / (r * deg2rad),
                    (2 * Math.atan(Math.exp(xy[1] / r)) - (Math.PI / 2)) / deg2rad
                ];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return WebMercator;
    });
    _registerModule(_modules, 'Maps/Projections/ProjectionRegistry.js', [_modules['Maps/Projections/LambertConformalConic.js'], _modules['Maps/Projections/EqualEarth.js'], _modules['Maps/Projections/Miller.js'], _modules['Maps/Projections/Orthographic.js'], _modules['Maps/Projections/WebMercator.js']], function (LambertConformalConic, EqualEarth, Miller, Orthographic, WebMercator) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        const projectionRegistry = {
            EqualEarth,
            LambertConformalConic,
            Miller,
            Orthographic,
            WebMercator
        };
        /* *
         *
         *  Default Export
         *
         * */

        return projectionRegistry;
    });
    _registerModule(_modules, 'Maps/Projection.js', [_modules['Core/Geometry/PolygonClip.js'], _modules['Maps/Projections/ProjectionRegistry.js'], _modules['Core/Utilities.js']], function (PC, ProjectionRegistry, U) {
        /* *
         *
         *  (c) 2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { clipLineString, clipPolygon } = PC;
        const { clamp, erase } = U;
        /* *
         *
         *  Constants
         *
         * */
        const deg2rad = Math.PI * 2 / 360, 
        // Safe padding on either side of the antimeridian to avoid points being
        // projected to the wrong side of the plane
        floatCorrection = 0.000001;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Keep longitude within -180 and 180. This is faster than using the modulo
         * operator, and preserves the distinction between -180 and 180.
         * @private
         */
        const wrapLon = (lon) => {
            // Replacing the if's with while would increase the range, but make it prone
            // to crashes on bad data
            if (lon < -180) {
                lon += 360;
            }
            if (lon > 180) {
                lon -= 360;
            }
            return lon;
        };
        /**
         * Calculate the haversine of an angle.
         * @private
         */
        const hav = (radians) => (1 - Math.cos(radians)) / 2;
        /**
        * Calculate the haversine of an angle from two coordinates.
        * @private
        */
        const havFromCoords = (point1, point2) => {
            const cos = Math.cos, lat1 = point1[1] * deg2rad, lon1 = point1[0] * deg2rad, lat2 = point2[1] * deg2rad, lon2 = point2[0] * deg2rad, deltaLat = lat2 - lat1, deltaLon = lon2 - lon1, havFromCoords = hav(deltaLat) + cos(lat1) * cos(lat2) * hav(deltaLon);
            return havFromCoords;
        };
        /* *
         *
         *  Class
         *
         * */
        class Projection {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Add a projection definition to the registry, accessible by its `name`.
             * @private
             */
            static add(name, definition) {
                Projection.registry[name] = definition;
            }
            /**
             * Calculate the distance in meters between two given coordinates.
             * @private
             */
            static distance(point1, point2) {
                const { atan2, sqrt } = Math, hav = havFromCoords(point1, point2), angularDistance = 2 * atan2(sqrt(hav), sqrt(1 - hav)), distance = angularDistance * 6371e3;
                return distance;
            }
            /**
             * Calculate the geodesic line string between two given coordinates.
             * @private
             */
            static geodesic(point1, point2, inclusive, stepDistance = 500000) {
                const { atan2, cos, sin, sqrt } = Math, distance = Projection.distance, lat1 = point1[1] * deg2rad, lon1 = point1[0] * deg2rad, lat2 = point2[1] * deg2rad, lon2 = point2[0] * deg2rad, cosLat1CosLon1 = cos(lat1) * cos(lon1), cosLat2CosLon2 = cos(lat2) * cos(lon2), cosLat1SinLon1 = cos(lat1) * sin(lon1), cosLat2SinLon2 = cos(lat2) * sin(lon2), sinLat1 = sin(lat1), sinLat2 = sin(lat2), pointDistance = distance(point1, point2), angDistance = pointDistance / 6371e3, sinAng = sin(angDistance), jumps = Math.round(pointDistance / stepDistance), lineString = [];
                if (inclusive) {
                    lineString.push(point1);
                }
                if (jumps > 1) {
                    const step = 1 / jumps;
                    for (let fraction = step; fraction < 0.999; // Account for float errors
                     fraction += step) {
                        // Add intermediate point to lineString
                        const A = sin((1 - fraction) * angDistance) / sinAng, B = sin(fraction * angDistance) / sinAng, x = A * cosLat1CosLon1 + B * cosLat2CosLon2, y = A * cosLat1SinLon1 + B * cosLat2SinLon2, z = A * sinLat1 + B * sinLat2, lat3 = atan2(z, sqrt(x * x + y * y)), lon3 = atan2(y, x);
                        lineString.push([lon3 / deg2rad, lat3 / deg2rad]);
                    }
                }
                if (inclusive) {
                    lineString.push(point2);
                }
                return lineString;
            }
            static insertGeodesics(poly) {
                let i = poly.length - 1;
                while (i--) {
                    // Distance in degrees, either in lon or lat. Avoid heavy
                    // calculation of true distance.
                    const roughDistance = Math.max(Math.abs(poly[i][0] - poly[i + 1][0]), Math.abs(poly[i][1] - poly[i + 1][1]));
                    if (roughDistance > 10) {
                        const geodesic = Projection.geodesic(poly[i], poly[i + 1]);
                        if (geodesic.length) {
                            poly.splice(i + 1, 0, ...geodesic);
                        }
                    }
                }
            }
            static toString(options) {
                const { name, rotation } = options || {};
                return [name, rotation && rotation.join(',')].join(';');
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options = {}) {
                // Whether the chart has points, lines or polygons given as coordinates
                // with positive up, as opposed to paths in the SVG plane with positive
                // down.
                this.hasCoordinates = false;
                // Whether the chart has true projection as opposed to pre-projected geojson
                // as in the legacy map collection.
                this.hasGeoProjection = false;
                this.maxLatitude = 90;
                this.options = options;
                const { name, projectedBounds, rotation } = options;
                this.rotator = rotation ? this.getRotator(rotation) : void 0;
                const ProjectionDefinition = name ? Projection.registry[name] : void 0;
                if (ProjectionDefinition) {
                    this.def = new ProjectionDefinition(options);
                }
                const { def, rotator } = this;
                if (def) {
                    this.maxLatitude = def.maxLatitude || 90;
                    this.hasGeoProjection = true;
                }
                if (rotator && def) {
                    this.forward = (lonLat) => def.forward(rotator.forward(lonLat));
                    this.inverse = (xy) => rotator.inverse(def.inverse(xy));
                }
                else if (def) {
                    this.forward = (lonLat) => def.forward(lonLat);
                    this.inverse = (xy) => def.inverse(xy);
                }
                else if (rotator) {
                    this.forward = rotator.forward;
                    this.inverse = rotator.inverse;
                }
                // Projected bounds/clipping
                this.bounds = projectedBounds === 'world' ?
                    def && def.bounds :
                    projectedBounds;
            }
            /* *
             *
             *  Functions
             *
             * */
            lineIntersectsBounds(line) {
                const { x1, x2, y1, y2 } = this.bounds || {};
                const getIntersect = (line, dim, val) => {
                    const [p1, p2] = line, otherDim = dim ? 0 : 1;
                    // Check if points are on either side of the line
                    if (typeof val === 'number' && p1[dim] >= val !== p2[dim] >= val) {
                        const fraction = ((val - p1[dim]) / (p2[dim] - p1[dim])), crossingVal = p1[otherDim] +
                            fraction * (p2[otherDim] - p1[otherDim]);
                        return dim ? [crossingVal, val] : [val, crossingVal];
                    }
                };
                let intersection, ret = line[0];
                if ((intersection = getIntersect(line, 0, x1))) {
                    ret = intersection;
                    // Assuming line[1] was originally outside, replace it with the
                    // intersection point so that the horizontal intersection will
                    // be correct.
                    line[1] = intersection;
                }
                else if ((intersection = getIntersect(line, 0, x2))) {
                    ret = intersection;
                    line[1] = intersection;
                }
                if ((intersection = getIntersect(line, 1, y1))) {
                    ret = intersection;
                }
                else if ((intersection = getIntersect(line, 1, y2))) {
                    ret = intersection;
                }
                return ret;
            }
            /**
             * Take the rotation options and returns the appropriate projection
             * functions.
             * @private
             */
            getRotator(rotation) {
                const deltaLambda = rotation[0] * deg2rad, deltaPhi = (rotation[1] || 0) * deg2rad, deltaGamma = (rotation[2] || 0) * deg2rad;
                const cosDeltaPhi = Math.cos(deltaPhi), sinDeltaPhi = Math.sin(deltaPhi), cosDeltaGamma = Math.cos(deltaGamma), sinDeltaGamma = Math.sin(deltaGamma);
                if (deltaLambda === 0 && deltaPhi === 0 && deltaGamma === 0) {
                    // Don't waste processing time
                    return;
                }
                return {
                    forward: (lonLat) => {
                        // Lambda (lon) rotation
                        const lon = lonLat[0] * deg2rad + deltaLambda;
                        // Phi (lat) and gamma rotation
                        const lat = lonLat[1] * deg2rad, cosLat = Math.cos(lat), x = Math.cos(lon) * cosLat, y = Math.sin(lon) * cosLat, sinLat = Math.sin(lat), k = sinLat * cosDeltaPhi + x * sinDeltaPhi;
                        return [
                            Math.atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - sinLat * sinDeltaPhi) / deg2rad,
                            Math.asin(k * cosDeltaGamma + y * sinDeltaGamma) / deg2rad
                        ];
                    },
                    inverse: (rLonLat) => {
                        // Lambda (lon) unrotation
                        const lon = rLonLat[0] * deg2rad;
                        // Phi (lat) and gamma unrotation
                        const lat = rLonLat[1] * deg2rad, cosLat = Math.cos(lat), x = Math.cos(lon) * cosLat, y = Math.sin(lon) * cosLat, sinLat = Math.sin(lat), k = sinLat * cosDeltaGamma - y * sinDeltaGamma;
                        return [
                            (Math.atan2(y * cosDeltaGamma + sinLat * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi) - deltaLambda) / deg2rad,
                            Math.asin(k * cosDeltaPhi - x * sinDeltaPhi) / deg2rad
                        ];
                    }
                };
            }
            /**
             * Project a lonlat coordinate position to xy. Dynamically overridden when
             * projection is set.
             * @private
             */
            forward(lonLat) {
                return lonLat;
            }
            /**
             * Unproject an xy chart coordinate position to lonlat. Dynamically
             * overridden when projection is set.
             * @private
             */
            inverse(xy) {
                return xy;
            }
            cutOnAntimeridian(poly, isPolygon) {
                const antimeridian = 180, intersections = [];
                const polygons = [poly];
                for (let i = 0, iEnd = poly.length; i < iEnd; ++i) {
                    const lonLat = poly[i];
                    let previousLonLat = poly[i - 1];
                    if (!i) {
                        if (!isPolygon) {
                            continue;
                        }
                        // Else, wrap to beginning
                        previousLonLat = poly[poly.length - 1];
                    }
                    const lon1 = previousLonLat[0], lon2 = lonLat[0];
                    if (
                    // Both points, after rotating for antimeridian, are on the far
                    // side of the Earth
                    (lon1 < -90 || lon1 > 90) &&
                        (lon2 < -90 || lon2 > 90) &&
                        // ... and on either side of the plane
                        (lon1 > 0) !== (lon2 > 0)) {
                        // Interpolate to the intersection latitude
                        const fraction = clamp((antimeridian - (lon1 + 360) % 360) /
                            ((lon2 + 360) % 360 - (lon1 + 360) % 360), 0, 1), lat = (previousLonLat[1] +
                            fraction * (lonLat[1] - previousLonLat[1]));
                        intersections.push({
                            i,
                            lat,
                            direction: lon1 < 0 ? 1 : -1,
                            previousLonLat,
                            lonLat
                        });
                    }
                }
                let polarIntersection;
                if (intersections.length) {
                    if (isPolygon) {
                        // Simplified use of the even-odd rule, if there is an odd
                        // amount of intersections between the polygon and the
                        // antimeridian, the pole is inside the polygon. Applies
                        // primarily to Antarctica.
                        if (intersections.length % 2 === 1) {
                            polarIntersection = intersections.slice().sort((a, b) => Math.abs(b.lat) - Math.abs(a.lat))[0];
                            erase(intersections, polarIntersection);
                        }
                        // Pull out slices of the polygon that is on the opposite side
                        // of the antimeridian compared to the starting point
                        let i = intersections.length - 2;
                        while (i >= 0) {
                            const index = intersections[i].i;
                            const lonPlus = wrapLon(antimeridian +
                                intersections[i].direction * floatCorrection);
                            const lonMinus = wrapLon(antimeridian -
                                intersections[i].direction * floatCorrection);
                            const slice = poly.splice(index, intersections[i + 1].i - index, 
                            // Add interpolated points close to the cut
                            ...Projection.geodesic([lonPlus, intersections[i].lat], [lonPlus, intersections[i + 1].lat], true));
                            // Add interpolated points close to the cut
                            slice.push(...Projection.geodesic([lonMinus, intersections[i + 1].lat], [lonMinus, intersections[i].lat], true));
                            polygons.push(slice);
                            i -= 2;
                        }
                        // Insert dummy points close to the pole
                        if (polarIntersection) {
                            for (let i = 0; i < polygons.length; i++) {
                                const { direction, lat } = polarIntersection, poly = polygons[i], indexOf = poly.indexOf(polarIntersection.lonLat);
                                if (indexOf > -1) {
                                    const polarLatitude = (lat < 0 ? -1 : 1) *
                                        this.maxLatitude;
                                    const lon1 = wrapLon(antimeridian +
                                        direction * floatCorrection);
                                    const lon2 = wrapLon(antimeridian -
                                        direction * floatCorrection);
                                    const polarSegment = Projection.geodesic([lon1, lat], [lon1, polarLatitude], true);
                                    // Circle around the pole point in order to make
                                    // polygon clipping right. Without this, Antarctica
                                    // would wrap the wrong way in an LLC projection
                                    // with parallels [30, 40].
                                    for (let lon = lon1 + 120 * direction; lon > -180 && lon < 180; lon += 120 * direction) {
                                        polarSegment.push([lon, polarLatitude]);
                                    }
                                    polarSegment.push(...Projection.geodesic([lon2, polarLatitude], [lon2, polarIntersection.lat], true));
                                    poly.splice(indexOf, 0, ...polarSegment);
                                    break;
                                }
                            }
                        }
                        // Map lines, not closed
                    }
                    else {
                        let i = intersections.length;
                        while (i--) {
                            const index = intersections[i].i;
                            const slice = poly.splice(index, poly.length, 
                            // Add interpolated point close to the cut
                            [
                                wrapLon(antimeridian +
                                    intersections[i].direction * floatCorrection),
                                intersections[i].lat
                            ]);
                            // Add interpolated point close to the cut
                            slice.unshift([
                                wrapLon(antimeridian -
                                    intersections[i].direction * floatCorrection),
                                intersections[i].lat
                            ]);
                            polygons.push(slice);
                        }
                    }
                }
                return polygons;
            }
            /**
             * Take a GeoJSON geometry and return a translated SVGPath.
             * @private
             */
            path(geometry) {
                const { bounds, def, rotator } = this;
                const antimeridian = 180;
                const path = [];
                const isPolygon = geometry.type === 'Polygon' ||
                    geometry.type === 'MultiPolygon';
                // @todo: It doesn't really have to do with whether north is
                // positive. It depends on whether the coordinates are
                // pre-projected.
                const hasGeoProjection = this.hasGeoProjection;
                // Detect whether we need to do antimeridian cutting and clipping to
                // bounds. The alternative (currently for Orthographic) is to apply a
                // clip angle.
                const projectingToPlane = !def || def.antimeridianCutting !== false;
                // We need to rotate in a separate step before applying antimeridian
                // cutting
                const preclip = projectingToPlane ? rotator : void 0;
                const postclip = projectingToPlane ? (def || this) : this;
                let boundsPolygon;
                if (bounds) {
                    boundsPolygon = [
                        [bounds.x1, bounds.y1],
                        [bounds.x2, bounds.y1],
                        [bounds.x2, bounds.y2],
                        [bounds.x1, bounds.y2]
                    ];
                }
                const addToPath = (polygon) => {
                    // Create a copy of the original coordinates. The copy applies a
                    // correction of points close to the antimeridian in order to
                    // prevent the points to be projected to the wrong side of the
                    // plane. Float errors in topojson or in the projection may cause
                    // that.
                    const poly = polygon.map((lonLat) => {
                        if (projectingToPlane) {
                            if (preclip) {
                                lonLat = preclip.forward(lonLat);
                            }
                            let lon = lonLat[0];
                            if (Math.abs(lon - antimeridian) < floatCorrection) {
                                if (lon < antimeridian) {
                                    lon = antimeridian - floatCorrection;
                                }
                                else {
                                    lon = antimeridian + floatCorrection;
                                }
                            }
                            lonLat = [lon, lonLat[1]];
                        }
                        return lonLat;
                    });
                    let polygons = [poly];
                    if (hasGeoProjection) {
                        // Insert great circles into long straight lines
                        Projection.insertGeodesics(poly);
                        if (projectingToPlane) {
                            polygons = this.cutOnAntimeridian(poly, isPolygon);
                        }
                    }
                    polygons.forEach((poly) => {
                        if (poly.length < 2) {
                            return;
                        }
                        let movedTo = false;
                        let firstValidLonLat;
                        let lastValidLonLat;
                        let gap = false;
                        const pushToPath = (point) => {
                            if (!movedTo) {
                                path.push(['M', point[0], point[1]]);
                                movedTo = true;
                            }
                            else {
                                path.push(['L', point[0], point[1]]);
                            }
                        };
                        let someOutside = false, someInside = false;
                        let points = poly.map((lonLat) => {
                            const xy = postclip.forward(lonLat);
                            if (xy.outside) {
                                someOutside = true;
                            }
                            else {
                                someInside = true;
                            }
                            // Mercator projects pole points to Infinity, and
                            // clipPolygon is not able to handle it.
                            if (xy[1] === Infinity) {
                                xy[1] = 10e9;
                            }
                            else if (xy[1] === -Infinity) {
                                xy[1] = -10e9;
                            }
                            return xy;
                        });
                        if (projectingToPlane) {
                            // Wrap around in order for pointInPolygon to work
                            if (isPolygon) {
                                points.push(points[0]);
                            }
                            if (someOutside) {
                                // All points are outside
                                if (!someInside) {
                                    return;
                                }
                                // Some inside, some outside. Clip to the bounds.
                                if (boundsPolygon) {
                                    // Polygons
                                    if (isPolygon) {
                                        points = clipPolygon(points, boundsPolygon);
                                        // Linestrings
                                    }
                                    else if (bounds) {
                                        clipLineString(points, boundsPolygon)
                                            .forEach((points) => {
                                            movedTo = false;
                                            points.forEach(pushToPath);
                                        });
                                        return;
                                    }
                                }
                            }
                            points.forEach(pushToPath);
                            // For orthographic projection, or when a clipAngle applies
                        }
                        else {
                            for (let i = 0; i < points.length; i++) {
                                const lonLat = poly[i], point = points[i];
                                if (!point.outside) {
                                    // In order to be able to interpolate if the first
                                    // or last point is invalid (on the far side of the
                                    // globe in an orthographic projection), we need to
                                    // push the first valid point to the end of the
                                    // polygon.
                                    if (isPolygon && !firstValidLonLat) {
                                        firstValidLonLat = lonLat;
                                        poly.push(lonLat);
                                        points.push(point);
                                    }
                                    // When entering the first valid point after a gap
                                    // of invalid points, typically on the far side of
                                    // the globe in an orthographic projection.
                                    if (gap && lastValidLonLat) {
                                        // For areas, in an orthographic projection, the
                                        // great circle between two visible points will
                                        // be close to the horizon. A possible exception
                                        // may be when the two points are on opposite
                                        // sides of the globe. It that poses a problem,
                                        // we may have to rewrite this to use the small
                                        // circle related to the current lon0 and lat0.
                                        if (isPolygon && hasGeoProjection) {
                                            const geodesic = Projection.geodesic(lastValidLonLat, lonLat);
                                            geodesic.forEach((lonLat) => pushToPath(postclip.forward(lonLat)));
                                            // For lines, just jump over the gap
                                        }
                                        else {
                                            movedTo = false;
                                        }
                                    }
                                    pushToPath(point);
                                    lastValidLonLat = lonLat;
                                    gap = false;
                                }
                                else {
                                    gap = true;
                                }
                            }
                        }
                    });
                };
                if (geometry.type === 'LineString') {
                    addToPath(geometry.coordinates);
                }
                else if (geometry.type === 'MultiLineString') {
                    geometry.coordinates.forEach((c) => addToPath(c));
                }
                else if (geometry.type === 'Polygon') {
                    geometry.coordinates.forEach((c) => addToPath(c));
                    if (path.length) {
                        path.push(['Z']);
                    }
                }
                else if (geometry.type === 'MultiPolygon') {
                    geometry.coordinates.forEach((polygons) => {
                        polygons.forEach((c) => addToPath(c));
                    });
                    if (path.length) {
                        path.push(['Z']);
                    }
                }
                return path;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        Projection.registry = ProjectionRegistry;
        /* *
         *
         *  Default Export
         *
         * */

        return Projection;
    });
    _registerModule(_modules, 'Maps/MapView.js', [_modules['Core/Globals.js'], _modules['Maps/MapViewDefaults.js'], _modules['Maps/GeoJSONComposition.js'], _modules['Core/Geometry/GeometryUtilities.js'], _modules['Maps/MapUtilities.js'], _modules['Maps/Projection.js'], _modules['Core/Utilities.js']], function (H, MapViewDefaults, GeoJSONComposition, GeometryUtilities, MU, Projection, U) {
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
        const { pointInPolygon } = GeometryUtilities;
        const { topo2geo } = GeoJSONComposition;
        const { boundsFromPath } = MU;
        const { addEvent, clamp, crisp, fireEvent, isArray, isNumber, isObject, isString, merge, pick, pushUnique, relativeLength } = U;
        /* *
         *
         *  Constants
         *
         * */
        const tileSize = 256;
        /**
         * The world size in terms of 10k meters in the Web Mercator projection, to
         * match a 256 square tile to zoom level 0.
         * @private
         */
        const worldSize = 400.979322;
        /* *
         *
         *  Variables
         *
         * */
        let maps = {};
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Compute the zoom from given bounds and the size of the playing field. Used in
         * two places, hence the local function.
         * @private
         */
        function zoomFromBounds(b, playingField) {
            const { width, height } = playingField, scaleToField = Math.max((b.x2 - b.x1) / (width / tileSize), (b.y2 - b.y1) / (height / tileSize));
            return Math.log(worldSize / scaleToField) / Math.log(2);
        }
        /**
         * Calculate and set the recommended map view drilldown or drillup if mapData
         * is set for the series.
         * @private
         */
        function recommendedMapViewAfterDrill(e) {
            if (e.seriesOptions.mapData) {
                this.mapView?.recommendMapView(this, [
                    this.options.chart.map,
                    e.seriesOptions.mapData
                ], this.options.drilldown?.mapZooming);
            }
        }
        /*
        Const mergeCollections = <
            T extends Array<AnyRecord|undefined>
        >(a: T, b: T): T => {
            b.forEach((newer, i): void => {
                // Only merge by id supported for now. We may consider later to support
                // more complex rules like those of `Chart.update` with `oneToOne`, but
                // it is probably not needed. Existing insets can be disabled by
                // overwriting the `geoBounds` with empty data.
                if (newer && isString(newer.id)) {
                    const older = U.find(
                        a,
                        (aItem): boolean => (aItem && aItem.id) === newer.id
                    );
                    if (older) {
                        const aIndex = a.indexOf(older);
                        a[aIndex] = merge(older, newer);
                    }
                }
            });
            return a;
        };
        */
        /* *
         *
         *  Classes
         *
         * */
        /**
         * The map view handles zooming and centering on the map, and various
         * client-side projection capabilities.
         *
         * On a chart instance of `MapChart`, the map view is available as `chart.mapView`.
         *
         * @class
         * @name Highcharts.MapView
         *
         * @param {Highcharts.MapChart} chart
         *        The MapChart instance
         * @param {Highcharts.MapViewOptions} options
         *        MapView options
         */
        class MapView {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(MapChartClass) {
                if (pushUnique(composed, 'MapView')) {
                    maps = MapChartClass.maps;
                    // Initialize MapView after initialization, but before firstRender
                    addEvent(MapChartClass, 'afterInit', function () {
                        /**
                         * The map view handles zooming and centering on the map, and
                         * various client-side projection capabilities.
                         *
                         * @name Highcharts.MapChart#mapView
                         * @type {Highcharts.MapView|undefined}
                         */
                        this.mapView = new MapView(this, this.options.mapView);
                    }, { order: 0 });
                    addEvent(MapChartClass, 'addSeriesAsDrilldown', recommendedMapViewAfterDrill);
                    addEvent(MapChartClass, 'afterDrillUp', recommendedMapViewAfterDrill);
                }
            }
            /**
             * Return the composite bounding box of a collection of bounding boxes
             * @private
             */
            static compositeBounds(arrayOfBounds) {
                if (arrayOfBounds.length) {
                    return arrayOfBounds
                        .slice(1)
                        .reduce((acc, cur) => {
                        acc.x1 = Math.min(acc.x1, cur.x1);
                        acc.y1 = Math.min(acc.y1, cur.y1);
                        acc.x2 = Math.max(acc.x2, cur.x2);
                        acc.y2 = Math.max(acc.y2, cur.y2);
                        return acc;
                    }, merge(arrayOfBounds[0]));
                }
                return;
            }
            /**
             * Merge two collections of insets by the id.
             * @private
             */
            static mergeInsets(a, b) {
                const toObject = (insets) => {
                    const ob = {};
                    insets.forEach((inset, i) => {
                        ob[inset && inset.id || `i${i}`] = inset;
                    });
                    return ob;
                };
                const insetsObj = merge(toObject(a), toObject(b)), insets = Object
                    .keys(insetsObj)
                    .map((key) => insetsObj[key]);
                return insets;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.allowTransformAnimation = true;
                this.eventsToUnbind = [];
                this.insets = [];
                this.padding = [0, 0, 0, 0];
                this.recommendedMapView = {};
                if (!(this instanceof MapViewInset)) {
                    this.recommendMapView(chart, [
                        chart.options.chart.map,
                        ...(chart.options.series || []).map((s) => s.mapData)
                    ]);
                }
                this.userOptions = options || {};
                const o = merge(MapViewDefaults, this.recommendedMapView, options);
                // Merge the inset collections by id, or index if id missing
                const recInsets = this.recommendedMapView?.insets, optInsets = options && options.insets;
                if (recInsets && optInsets) {
                    o.insets = MapView.mergeInsets(recInsets, optInsets);
                }
                this.chart = chart;
                /**
                 * The current center of the view in terms of `[longitude, latitude]`.
                 * @name Highcharts.MapView#center
                 * @readonly
                 * @type {LonLatArray}
                 */
                this.center = o.center;
                this.options = o;
                this.projection = new Projection(o.projection);
                // Initialize with full plot box so we don't have to check for undefined
                // every time we use it
                this.playingField = chart.plotBox;
                /**
                 * The current zoom level of the view.
                 * @name Highcharts.MapView#zoom
                 * @readonly
                 * @type {number}
                 */
                this.zoom = o.zoom || 0;
                this.minZoom = o.minZoom;
                // Create the insets
                this.createInsets();
                // Initialize and respond to chart size changes
                this.eventsToUnbind.push(addEvent(chart, 'afterSetChartSize', () => {
                    this.playingField = this.getField();
                    if (this.minZoom === void 0 || // When initializing the chart
                        this.minZoom === this.zoom // When resizing the chart
                    ) {
                        this.fitToBounds(void 0, void 0, false);
                        if (
                        // Set zoom only when initializing the chart
                        // (do not overwrite when zooming in/out, #17082)
                        !this.chart.hasRendered &&
                            isNumber(this.userOptions.zoom)) {
                            this.zoom = this.userOptions.zoom;
                        }
                        if (this.userOptions.center) {
                            merge(true, this.center, this.userOptions.center);
                        }
                    }
                }));
                this.setUpEvents();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create MapViewInset instances from insets options
             * @private
             */
            createInsets() {
                const options = this.options, insets = options.insets;
                if (insets) {
                    insets.forEach((item) => {
                        const inset = new MapViewInset(this, merge(options.insetOptions, item));
                        this.insets.push(inset);
                    });
                }
            }
            /**
             * Fit the view to given bounds
             *
             * @function Highcharts.MapView#fitToBounds
             * @param {Object} bounds
             *        Bounds in terms of projected units given as  `{ x1, y1, x2, y2 }`.
             *        If not set, fit to the bounds of the current data set
             * @param {number|string} [padding=0]
             *        Padding inside the bounds. A number signifies pixels, while a
             *        percentage string (like `5%`) can be used as a fraction of the
             *        plot area size.
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        What animation to use for redraw
             */
            fitToBounds(bounds, padding, redraw = true, animation) {
                const b = bounds || this.getProjectedBounds();
                if (b) {
                    const pad = pick(padding, bounds ? 0 : this.options.padding), fullField = this.getField(false), padArr = isArray(pad) ? pad : [pad, pad, pad, pad];
                    this.padding = [
                        relativeLength(padArr[0], fullField.height),
                        relativeLength(padArr[1], fullField.width),
                        relativeLength(padArr[2], fullField.height),
                        relativeLength(padArr[3], fullField.width)
                    ];
                    // Apply the playing field, corrected with padding
                    this.playingField = this.getField();
                    const zoom = zoomFromBounds(b, this.playingField);
                    // Reset minZoom when fitting to natural bounds
                    if (!bounds) {
                        this.minZoom = zoom;
                    }
                    const center = this.projection.inverse([
                        (b.x2 + b.x1) / 2,
                        (b.y2 + b.y1) / 2
                    ]);
                    this.setView(center, zoom, redraw, animation);
                }
            }
            getField(padded = true) {
                const padding = padded ? this.padding : [0, 0, 0, 0];
                return {
                    x: padding[3],
                    y: padding[0],
                    width: this.chart.plotWidth - padding[1] - padding[3],
                    height: this.chart.plotHeight - padding[0] - padding[2]
                };
            }
            getGeoMap(map) {
                if (isString(map)) {
                    if (maps[map] && maps[map].type === 'Topology') {
                        return topo2geo(maps[map]);
                    }
                    return maps[map];
                }
                if (isObject(map, true)) {
                    if (map.type === 'FeatureCollection') {
                        return map;
                    }
                    if (map.type === 'Topology') {
                        return topo2geo(map);
                    }
                }
            }
            getMapBBox() {
                const bounds = this.getProjectedBounds(), scale = this.getScale();
                if (bounds) {
                    const padding = this.padding, p1 = this.projectedUnitsToPixels({
                        x: bounds.x1,
                        y: bounds.y2
                    }), width = ((bounds.x2 - bounds.x1) * scale +
                        padding[1] + padding[3]), height = ((bounds.y2 - bounds.y1) * scale +
                        padding[0] + padding[2]);
                    return {
                        width,
                        height,
                        x: p1.x - padding[3],
                        y: p1.y - padding[0]
                    };
                }
            }
            getProjectedBounds() {
                const projection = this.projection;
                const allBounds = this.chart.series.reduce((acc, s) => {
                    const bounds = s.getProjectedBounds && s.getProjectedBounds();
                    if (bounds &&
                        s.options.affectsMapView !== false) {
                        acc.push(bounds);
                    }
                    return acc;
                }, []);
                // The bounds option
                const fitToGeometry = this.options.fitToGeometry;
                if (fitToGeometry) {
                    if (!this.fitToGeometryCache) {
                        if (fitToGeometry.type === 'MultiPoint') {
                            const positions = fitToGeometry.coordinates
                                .map((lonLat) => projection.forward(lonLat)), xs = positions.map((pos) => pos[0]), ys = positions.map((pos) => pos[1]);
                            this.fitToGeometryCache = {
                                x1: Math.min.apply(0, xs),
                                x2: Math.max.apply(0, xs),
                                y1: Math.min.apply(0, ys),
                                y2: Math.max.apply(0, ys)
                            };
                        }
                        else {
                            this.fitToGeometryCache = boundsFromPath(projection.path(fitToGeometry));
                        }
                    }
                    return this.fitToGeometryCache;
                }
                return this.projection.bounds || MapView.compositeBounds(allBounds);
            }
            getScale() {
                // A zoom of 0 means the world (360x360 degrees) fits in a 256x256 px
                // tile
                return (tileSize / worldSize) * Math.pow(2, this.zoom);
            }
            // Calculate the SVG transform to be applied to series groups
            getSVGTransform() {
                const { x, y, width, height } = this.playingField, projectedCenter = this.projection.forward(this.center), flipFactor = this.projection.hasCoordinates ? -1 : 1, scaleX = this.getScale(), scaleY = scaleX * flipFactor, translateX = x + width / 2 - projectedCenter[0] * scaleX, translateY = y + height / 2 - projectedCenter[1] * scaleY;
                return { scaleX, scaleY, translateX, translateY };
            }
            /**
             * Convert map coordinates in longitude/latitude to pixels
             *
             * @function Highcharts.MapView#lonLatToPixels
             * @since 10.0.0
             * @param  {Highcharts.MapLonLatObject} lonLat
             *         The map coordinates
             * @return {Highcharts.PositionObject|undefined}
             *         The pixel position
             */
            lonLatToPixels(lonLat) {
                const pos = this.lonLatToProjectedUnits(lonLat);
                if (pos) {
                    return this.projectedUnitsToPixels(pos);
                }
            }
            /**
             * Get projected units from longitude/latitude. Insets are accounted for.
             * Returns an object with x and y values corresponding to positions on the
             * projected plane.
             *
             * @requires modules/map
             *
             * @function Highcharts.MapView#lonLatToProjectedUnits
             *
             * @since 10.0.0
             * @sample maps/series/latlon-to-point/ Find a point from lon/lat
             *
             * @param {Highcharts.MapLonLatObject} lonLat Coordinates.
             *
             * @return {Highcharts.ProjectedXY} X and Y coordinates in terms of
             *      projected values
             */
            lonLatToProjectedUnits(lonLat) {
                const chart = this.chart, mapTransforms = chart.mapTransforms;
                // Legacy, built-in transforms
                if (mapTransforms) {
                    for (const transform in mapTransforms) {
                        if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                            mapTransforms[transform].hitZone) {
                            const coords = chart.transformFromLatLon(lonLat, mapTransforms[transform]);
                            if (coords && pointInPolygon(coords, mapTransforms[transform].hitZone.coordinates[0])) {
                                return coords;
                            }
                        }
                    }
                    return chart.transformFromLatLon(lonLat, mapTransforms['default'] // eslint-disable-line dot-notation
                    );
                }
                // Handle insets
                for (const inset of this.insets) {
                    if (inset.options.geoBounds &&
                        pointInPolygon({ x: lonLat.lon, y: lonLat.lat }, inset.options.geoBounds.coordinates[0])) {
                        const insetProjectedPoint = inset.projection.forward([lonLat.lon, lonLat.lat]), pxPoint = inset.projectedUnitsToPixels({ x: insetProjectedPoint[0], y: insetProjectedPoint[1] });
                        return this.pixelsToProjectedUnits(pxPoint);
                    }
                }
                const point = this.projection.forward([lonLat.lon, lonLat.lat]);
                if (!point.outside) {
                    return { x: point[0], y: point[1] };
                }
            }
            /**
             * Calculate longitude/latitude values for a point or position. Returns an
             * object with the numeric properties `lon` and `lat`.
             *
             * @requires modules/map
             *
             * @function Highcharts.MapView#projectedUnitsToLonLat
             *
             * @since 10.0.0
             *
             * @sample maps/demo/latlon-advanced/ Advanced lat/lon demo
             *
             * @param {Highcharts.Point|Highcharts.ProjectedXY} point
             *        A `Point` instance or anything containing `x` and `y` properties
             *        with numeric values.
             *
             * @return {Highcharts.MapLonLatObject|undefined} An object with `lat` and
             *         `lon` properties.
             */
            projectedUnitsToLonLat(point) {
                const chart = this.chart, mapTransforms = chart.mapTransforms;
                // Legacy, built-in transforms
                if (mapTransforms) {
                    for (const transform in mapTransforms) {
                        if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                            mapTransforms[transform].hitZone &&
                            pointInPolygon(point, mapTransforms[transform].hitZone.coordinates[0])) {
                            return chart.transformToLatLon(point, mapTransforms[transform]);
                        }
                    }
                    return chart.transformToLatLon(point, mapTransforms['default'] // eslint-disable-line dot-notation
                    );
                }
                const pxPoint = this.projectedUnitsToPixels(point);
                for (const inset of this.insets) {
                    if (inset.hitZone &&
                        pointInPolygon(pxPoint, inset.hitZone.coordinates[0])) {
                        const insetProjectedPoint = inset
                            .pixelsToProjectedUnits(pxPoint), coordinates = inset.projection.inverse([insetProjectedPoint.x, insetProjectedPoint.y]);
                        return { lon: coordinates[0], lat: coordinates[1] };
                    }
                }
                const coordinates = this.projection.inverse([point.x, point.y]);
                return { lon: coordinates[0], lat: coordinates[1] };
            }
            /**
             * Calculate and set the recommended map view based on provided map data
             * from series.
             *
             * @requires modules/map
             *
             * @function Highcharts.MapView#recommendMapView
             *
             * @since 11.4.0
             *
             * @param {Highcharts.Chart} chart
             *        Chart object
             *
             * @param {Array<MapDataType | undefined>} mapDataArray
             *        Array of map data from all series.
             *
             * @param {boolean} [update=false]
             *        Whether to update the chart with recommended map view.
             *
             * @return {Highcharts.MapViewOptions|undefined} Best suitable map view.
             */
            recommendMapView(chart, mapDataArray, update = false) {
                // Reset recommended map view
                this.recommendedMapView = {};
                // Handle the global map and series-level mapData
                const geoMaps = mapDataArray.map((mapData) => this.getGeoMap(mapData));
                const allGeoBounds = [];
                geoMaps.forEach((geoMap) => {
                    if (geoMap) {
                        // Use the first geo map as main
                        if (!Object.keys(this.recommendedMapView).length) {
                            this.recommendedMapView =
                                geoMap['hc-recommended-mapview'] || {};
                        }
                        // Combine the bounding boxes of all loaded maps
                        if (geoMap.bbox) {
                            const [x1, y1, x2, y2] = geoMap.bbox;
                            allGeoBounds.push({ x1, y1, x2, y2 });
                        }
                    }
                });
                // Get the composite bounds
                const geoBounds = (allGeoBounds.length &&
                    MapView.compositeBounds(allGeoBounds));
                // Provide a best-guess recommended projection if not set in
                // the map or in user options
                fireEvent(this, 'onRecommendMapView', {
                    geoBounds,
                    chart
                }, function () {
                    if (geoBounds &&
                        this.recommendedMapView) {
                        if (!this.recommendedMapView.projection) {
                            const { x1, y1, x2, y2 } = geoBounds;
                            this.recommendedMapView.projection =
                                (x2 - x1 > 180 && y2 - y1 > 90) ?
                                    // Wide angle, go for the world view
                                    {
                                        name: 'EqualEarth',
                                        parallels: [0, 0],
                                        rotation: [0]
                                    } :
                                    // Narrower angle, use a projection better
                                    // suited for local view
                                    {
                                        name: 'LambertConformalConic',
                                        parallels: [y1, y2],
                                        rotation: [-(x1 + x2) / 2]
                                    };
                        }
                        if (!this.recommendedMapView.insets) {
                            this.recommendedMapView.insets = void 0; // Reset insets
                        }
                    }
                });
                // Register the main geo map (from options.chart.map) if set
                this.geoMap = geoMaps[0];
                if (update &&
                    chart.hasRendered &&
                    !chart.userOptions.mapView?.projection &&
                    this.recommendedMapView) {
                    this.update(this.recommendedMapView);
                }
            }
            redraw(animation) {
                this.chart.series.forEach((s) => {
                    if (s.useMapGeometry) {
                        s.isDirty = true;
                    }
                });
                this.chart.redraw(animation);
            }
            /**
             * Set the view to given center and zoom values.
             * @function Highcharts.MapView#setView
             * @param {Highcharts.LonLatArray|undefined} center
             *        The center point
             * @param {number} zoom
             *        The zoom level
             * @param {boolean} [redraw=true]
             *        Whether to redraw immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        Animation options for the redraw
             *
             * @sample maps/mapview/setview
             *        Set the view programmatically
             */
            setView(center, zoom, redraw = true, animation) {
                if (center) {
                    this.center = center;
                }
                if (typeof zoom === 'number') {
                    if (typeof this.minZoom === 'number') {
                        zoom = Math.max(zoom, this.minZoom);
                    }
                    if (typeof this.options.maxZoom === 'number') {
                        zoom = Math.min(zoom, this.options.maxZoom);
                    }
                    // Use isNumber to prevent Infinity (#17205)
                    if (isNumber(zoom)) {
                        this.zoom = zoom;
                    }
                }
                const bounds = this.getProjectedBounds();
                if (bounds) {
                    const projectedCenter = this.projection.forward(this.center), { x, y, width, height } = this.playingField, scale = this.getScale(), bottomLeft = this.projectedUnitsToPixels({
                        x: bounds.x1,
                        y: bounds.y1
                    }), topRight = this.projectedUnitsToPixels({
                        x: bounds.x2,
                        y: bounds.y2
                    }), boundsCenterProjected = [
                        (bounds.x1 + bounds.x2) / 2,
                        (bounds.y1 + bounds.y2) / 2
                    ], isDrilling = this.chart.series.some((series) => series.isDrilling);
                    if (!isDrilling) {
                        // Constrain to data bounds
                        // Pixel coordinate system is reversed vs projected
                        const x1 = bottomLeft.x, y1 = topRight.y, x2 = topRight.x, y2 = bottomLeft.y;
                        // Map smaller than plot area, center it
                        if (x2 - x1 < width) {
                            projectedCenter[0] = boundsCenterProjected[0];
                            // Off west
                        }
                        else if (x1 < x && x2 < x + width) {
                            // Adjust eastwards
                            projectedCenter[0] +=
                                Math.max(x1 - x, x2 - width - x) / scale;
                            // Off east
                        }
                        else if (x2 > x + width && x1 > x) {
                            // Adjust westwards
                            projectedCenter[0] +=
                                Math.min(x2 - width - x, x1 - x) / scale;
                        }
                        // Map smaller than plot area, center it
                        if (y2 - y1 < height) {
                            projectedCenter[1] = boundsCenterProjected[1];
                            // Off north
                        }
                        else if (y1 < y && y2 < y + height) {
                            // Adjust southwards
                            projectedCenter[1] -=
                                Math.max(y1 - y, y2 - height - y) / scale;
                            // Off south
                        }
                        else if (y2 > y + height && y1 > y) {
                            // Adjust northwards
                            projectedCenter[1] -=
                                Math.min(y2 - height - y, y1 - y) / scale;
                        }
                        this.center = this.projection.inverse(projectedCenter);
                    }
                    this.insets.forEach((inset) => {
                        if (inset.options.field) {
                            inset.hitZone = inset.getHitZone();
                            inset.playingField = inset.getField();
                        }
                    });
                    this.render();
                }
                fireEvent(this, 'afterSetView');
                if (redraw) {
                    this.redraw(animation);
                }
            }
            /**
             * Convert projected units to pixel position
             *
             * @function Highcharts.MapView#projectedUnitsToPixels
             * @param {Highcharts.PositionObject} pos
             *        The position in projected units
             * @return {Highcharts.PositionObject} The position in pixels
             */
            projectedUnitsToPixels(pos) {
                const scale = this.getScale(), projectedCenter = this.projection.forward(this.center), field = this.playingField, centerPxX = field.x + field.width / 2, centerPxY = field.y + field.height / 2;
                const x = centerPxX - scale * (projectedCenter[0] - pos.x);
                const y = centerPxY + scale * (projectedCenter[1] - pos.y);
                return { x, y };
            }
            /**
             * Convert pixel position to longitude and latitude.
             *
             * @function Highcharts.MapView#pixelsToLonLat
             * @since 10.0.0
             * @param  {Highcharts.PositionObject} pos
             *         The position in pixels
             * @return {Highcharts.MapLonLatObject|undefined}
             *         The map coordinates
             */
            pixelsToLonLat(pos) {
                return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(pos));
            }
            /**
             * Convert pixel position to projected units
             *
             * @function Highcharts.MapView#pixelsToProjectedUnits
             * @param {Highcharts.PositionObject} pos
             *        The position in pixels
             * @return {Highcharts.PositionObject} The position in projected units
             */
            pixelsToProjectedUnits(pos) {
                const { x, y } = pos, scale = this.getScale(), projectedCenter = this.projection.forward(this.center), field = this.playingField, centerPxX = field.x + field.width / 2, centerPxY = field.y + field.height / 2;
                const projectedX = projectedCenter[0] + (x - centerPxX) / scale;
                const projectedY = projectedCenter[1] - (y - centerPxY) / scale;
                return { x: projectedX, y: projectedY };
            }
            setUpEvents() {
                const { chart } = this;
                // Set up panning and touch zoom for maps. In orthographic projections
                // the globe will rotate, otherwise adjust the map center and zoom.
                let mouseDownCenterProjected, mouseDownKey, mouseDownRotation;
                const onPan = (e) => {
                    const { lastTouches, pinchDown } = chart.pointer, projection = this.projection, touches = e.touches;
                    let { mouseDownX, mouseDownY } = chart, howMuch = 0;
                    if (pinchDown?.length === 1) {
                        mouseDownX = pinchDown[0].chartX;
                        mouseDownY = pinchDown[0].chartY;
                    }
                    else if (pinchDown?.length === 2) {
                        mouseDownX = (pinchDown[0].chartX + pinchDown[1].chartX) / 2;
                        mouseDownY = (pinchDown[0].chartY + pinchDown[1].chartY) / 2;
                    }
                    // How much has the distance between the fingers changed?
                    if (touches?.length === 2 && lastTouches) {
                        const startDistance = Math.sqrt(Math.pow(lastTouches[0].chartX - lastTouches[1].chartX, 2) +
                            Math.pow(lastTouches[0].chartY - lastTouches[1].chartY, 2)), endDistance = Math.sqrt(Math.pow(touches[0].chartX - touches[1].chartX, 2) +
                            Math.pow(touches[0].chartY - touches[1].chartY, 2));
                        howMuch = Math.log(startDistance / endDistance) / Math.log(0.5);
                    }
                    if (isNumber(mouseDownX) && isNumber(mouseDownY)) {
                        const key = `${mouseDownX},${mouseDownY}`;
                        let { chartX, chartY } = e.originalEvent;
                        if (touches?.length === 2) {
                            chartX = (touches[0].chartX + touches[1].chartX) / 2;
                            chartY = (touches[0].chartY + touches[1].chartY) / 2;
                        }
                        // Reset starting position
                        if (key !== mouseDownKey) {
                            mouseDownKey = key;
                            mouseDownCenterProjected = this.projection
                                .forward(this.center);
                            mouseDownRotation = (this.projection.options.rotation || [0, 0]).slice();
                        }
                        // Get the natural zoom level of the projection itself when
                        // zoomed to view the full world
                        const worldBounds = projection.def && projection.def.bounds, worldZoom = (worldBounds &&
                            zoomFromBounds(worldBounds, this.playingField)) || -Infinity;
                        // Panning rotates the globe
                        if (projection.options.name === 'Orthographic' &&
                            (touches?.length || 0) < 2 &&
                            // ... but don't rotate if we're loading only a part of the
                            // world
                            (this.minZoom || Infinity) < worldZoom * 1.3) {
                            // Empirical ratio where the globe rotates roughly the same
                            // speed as moving the pointer across the center of the
                            // projection
                            const ratio = 440 / (this.getScale() * Math.min(chart.plotWidth, chart.plotHeight));
                            if (mouseDownRotation) {
                                const lon = (mouseDownX - chartX) * ratio -
                                    mouseDownRotation[0], lat = clamp(-mouseDownRotation[1] -
                                    (mouseDownY - chartY) * ratio, -80, 80), zoom = this.zoom;
                                this.update({
                                    projection: {
                                        rotation: [-lon, -lat]
                                    }
                                }, false);
                                this.fitToBounds(void 0, void 0, false);
                                this.zoom = zoom;
                                chart.redraw(false);
                            }
                            // #17925 Skip NaN values
                        }
                        else if (isNumber(chartX) && isNumber(chartY)) {
                            // #17238
                            const scale = this.getScale(), flipFactor = this.projection.hasCoordinates ? 1 : -1;
                            const newCenter = this.projection.inverse([
                                mouseDownCenterProjected[0] +
                                    (mouseDownX - chartX) / scale,
                                mouseDownCenterProjected[1] -
                                    (mouseDownY - chartY) / scale * flipFactor
                            ]);
                            // #19190 Skip NaN coords
                            if (!isNaN(newCenter[0] + newCenter[1])) {
                                this.zoomBy(howMuch, newCenter, void 0, false);
                            }
                        }
                        e.preventDefault();
                    }
                };
                addEvent(chart, 'pan', onPan);
                addEvent(chart, 'touchpan', onPan);
                // Perform the map zoom by selection
                addEvent(chart, 'selection', (evt) => {
                    // Zoom in
                    if (!evt.resetSelection) {
                        const x = evt.x - chart.plotLeft;
                        const y = evt.y - chart.plotTop;
                        const { y: y1, x: x1 } = this.pixelsToProjectedUnits({ x, y });
                        const { y: y2, x: x2 } = this.pixelsToProjectedUnits({ x: x + evt.width, y: y + evt.height });
                        this.fitToBounds({ x1, y1, x2, y2 }, void 0, true, evt.originalEvent.touches ?
                            // On touch zoom, don't animate, since we're already in
                            // transformed zoom preview
                            false :
                            // On mouse zoom, obey the chart-level animation
                            void 0);
                        // Only for mouse. Touch users can pinch out.
                        if (!/^touch/.test((evt.originalEvent.type))) {
                            chart.showResetZoom();
                        }
                        evt.preventDefault();
                        // Reset zoom
                    }
                    else {
                        this.zoomBy();
                    }
                });
            }
            render() {
                // We need a group for the insets
                if (!this.group) {
                    this.group = this.chart.renderer.g('map-view')
                        .attr({ zIndex: 4 })
                        .add();
                }
            }
            /**
             * Update the view with given options
             *
             * @function Highcharts.MapView#update
             *
             * @param {Partial<Highcharts.MapViewOptions>} options
             *        The new map view options to apply
             * @param {boolean} [redraw=true]
             *        Whether to redraw immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        The animation to apply to a the redraw
             */
            update(options, redraw = true, animation) {
                const newProjection = options.projection, isDirtyProjection = newProjection && ((Projection.toString(newProjection) !==
                    Projection.toString(this.options.projection)));
                let isDirtyInsets = false;
                merge(true, this.userOptions, options);
                merge(true, this.options, options);
                // If anything changed with the insets, destroy them all and create
                // again below
                if ('insets' in options) {
                    this.insets.forEach((inset) => inset.destroy());
                    this.insets.length = 0;
                    isDirtyInsets = true;
                }
                if (isDirtyProjection || 'fitToGeometry' in options) {
                    delete this.fitToGeometryCache;
                }
                if (isDirtyProjection || isDirtyInsets) {
                    this.chart.series.forEach((series) => {
                        const groups = series.transformGroups;
                        if (series.clearBounds) {
                            series.clearBounds();
                        }
                        series.isDirty = true;
                        series.isDirtyData = true;
                        // Destroy inset transform groups
                        if (isDirtyInsets && groups) {
                            while (groups.length > 1) {
                                const group = groups.pop();
                                if (group) {
                                    group.destroy();
                                }
                            }
                        }
                    });
                    if (isDirtyProjection) {
                        this.projection = new Projection(this.options.projection);
                    }
                    // Create new insets
                    if (isDirtyInsets) {
                        this.createInsets();
                    }
                    // Fit to natural bounds if center/zoom are not explicitly given
                    if (!options.center &&
                        // Do not fire fitToBounds if user don't want to set zoom
                        Object.hasOwnProperty.call(options, 'zoom') &&
                        !isNumber(options.zoom)) {
                        this.fitToBounds(void 0, void 0, false);
                    }
                }
                if (options.center || isNumber(options.zoom)) {
                    this.setView(this.options.center, options.zoom, false);
                }
                else if ('fitToGeometry' in options) {
                    this.fitToBounds(void 0, void 0, false);
                }
                if (redraw) {
                    this.chart.redraw(animation);
                }
            }
            /**
             * Zoom the map view by a given number
             *
             * @function Highcharts.MapView#zoomBy
             *
             * @param {number|undefined} [howMuch]
             *        The amount of zoom to apply. 1 zooms in on half the current view,
             *        -1 zooms out. Pass `undefined` to zoom to the full bounds of the
             *        map.
             * @param {Highcharts.LonLatArray} [coords]
             *        Optional map coordinates to keep fixed
             * @param {Array<number>} [chartCoords]
             *        Optional chart coordinates to keep fixed, in pixels
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        The animation to apply to a the redraw
             */
            zoomBy(howMuch, coords, chartCoords, animation) {
                const chart = this.chart, projectedCenter = this.projection.forward(this.center);
                if (typeof howMuch === 'number') {
                    const zoom = this.zoom + howMuch;
                    let center, x, y;
                    // Keep chartX and chartY stationary - convert to lat and lng
                    if (chartCoords) {
                        const [chartX, chartY] = chartCoords;
                        const scale = this.getScale();
                        const offsetX = chartX - chart.plotLeft - chart.plotWidth / 2;
                        const offsetY = chartY - chart.plotTop - chart.plotHeight / 2;
                        x = projectedCenter[0] + offsetX / scale;
                        y = projectedCenter[1] + offsetY / scale;
                    }
                    // Keep lon and lat stationary by adjusting the center
                    if (typeof x === 'number' && typeof y === 'number') {
                        const scale = 1 - Math.pow(2, this.zoom) / Math.pow(2, zoom);
                        const offsetX = projectedCenter[0] - x;
                        const offsetY = projectedCenter[1] - y;
                        projectedCenter[0] -= offsetX * scale;
                        projectedCenter[1] += offsetY * scale;
                        center = this.projection.inverse(projectedCenter);
                    }
                    this.setView(coords || center, zoom, void 0, animation);
                    // Undefined howMuch => reset zoom
                }
                else {
                    this.fitToBounds(void 0, void 0, void 0, animation);
                }
            }
        }
        // Putting this in the same file due to circular dependency with MapView
        class MapViewInset extends MapView {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(mapView, options) {
                super(mapView.chart, options);
                this.id = options.id;
                this.mapView = mapView;
                this.options = merge({ center: [0, 0] }, mapView.options.insetOptions, options);
                this.allBounds = [];
                if (this.options.geoBounds) {
                    // The path in projected units in the map view's main projection.
                    // This is used for hit testing where the points should render.
                    const path = mapView.projection.path(this.options.geoBounds);
                    this.geoBoundsProjectedBox = boundsFromPath(path);
                    this.geoBoundsProjectedPolygon = path.map((segment) => [
                        segment[1] || 0,
                        segment[2] || 0
                    ]);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Get the playing field in pixels
             * @private
             */
            getField(padded = true) {
                const hitZone = this.hitZone;
                if (hitZone) {
                    const padding = padded ? this.padding : [0, 0, 0, 0], polygon = hitZone.coordinates[0], xs = polygon.map((xy) => xy[0]), ys = polygon.map((xy) => xy[1]), x = Math.min.apply(0, xs) + padding[3], x2 = Math.max.apply(0, xs) - padding[1], y = Math.min.apply(0, ys) + padding[0], y2 = Math.max.apply(0, ys) - padding[2];
                    if (isNumber(x) && isNumber(y)) {
                        return {
                            x,
                            y,
                            width: x2 - x,
                            height: y2 - y
                        };
                    }
                }
                // Fall back to plot area
                return super.getField.call(this, padded);
            }
            /**
             * Get the hit zone in pixels.
             * @private
             */
            getHitZone() {
                const { chart, mapView, options } = this, { coordinates } = options.field || {};
                if (coordinates) {
                    let polygon = coordinates[0];
                    if (options.units === 'percent') {
                        const relativeTo = options.relativeTo === 'mapBoundingBox' &&
                            mapView.getMapBBox() ||
                            merge(chart.plotBox, { x: 0, y: 0 });
                        polygon = polygon.map((xy) => [
                            relativeLength(`${xy[0]}%`, relativeTo.width, relativeTo.x),
                            relativeLength(`${xy[1]}%`, relativeTo.height, relativeTo.y)
                        ]);
                    }
                    return {
                        type: 'Polygon',
                        coordinates: [polygon]
                    };
                }
            }
            getProjectedBounds() {
                return MapView.compositeBounds(this.allBounds);
            }
            /**
             * Determine whether a point on the main projected plane is inside the
             * geoBounds of the inset.
             * @private
             */
            isInside(point) {
                const { geoBoundsProjectedBox, geoBoundsProjectedPolygon } = this;
                return Boolean(
                // First we do a pre-pass to check whether the test point is inside
                // the rectangular bounding box of the polygon. This is less
                // expensive and will rule out most cases.
                geoBoundsProjectedBox &&
                    point.x >= geoBoundsProjectedBox.x1 &&
                    point.x <= geoBoundsProjectedBox.x2 &&
                    point.y >= geoBoundsProjectedBox.y1 &&
                    point.y <= geoBoundsProjectedBox.y2 &&
                    // Next, do the more expensive check whether the point is inside the
                    // polygon itself.
                    geoBoundsProjectedPolygon &&
                    pointInPolygon(point, geoBoundsProjectedPolygon));
            }
            /**
             * Render the map view inset with the border path
             * @private
             */
            render() {
                const { chart, mapView, options } = this, borderPath = options.borderPath || options.field;
                if (borderPath && mapView.group) {
                    let animate = true;
                    if (!this.border) {
                        this.border = chart.renderer
                            .path()
                            .addClass('highcharts-mapview-inset-border')
                            .add(mapView.group);
                        animate = false;
                    }
                    if (!chart.styledMode) {
                        this.border.attr({
                            stroke: options.borderColor,
                            'stroke-width': options.borderWidth
                        });
                    }
                    const strokeWidth = this.border.strokeWidth(), field = (options.relativeTo === 'mapBoundingBox' &&
                        mapView.getMapBBox()) || mapView.playingField;
                    const d = (borderPath.coordinates || []).reduce((d, lineString) => lineString.reduce((d, point, i) => {
                        let [x, y] = point;
                        if (options.units === 'percent') {
                            x = chart.plotLeft + relativeLength(`${x}%`, field.width, field.x);
                            y = chart.plotTop + relativeLength(`${y}%`, field.height, field.y);
                        }
                        x = crisp(x, strokeWidth);
                        y = crisp(y, strokeWidth);
                        d.push(i === 0 ? ['M', x, y] : ['L', x, y]);
                        return d;
                    }, d), []);
                    // Apply the border path
                    this.border[animate ? 'animate' : 'attr']({ d });
                }
            }
            destroy() {
                if (this.border) {
                    this.border = this.border.destroy();
                }
                this.eventsToUnbind.forEach((f) => f());
            }
            /**
             * No chart-level events for insets
             * @private
             */
            setUpEvents() { }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return MapView;
    });
    _registerModule(_modules, 'Series/Map/MapSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Series/ColorMapComposition.js'], _modules['Series/CenteredUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Chart/MapChart.js'], _modules['Series/Map/MapPoint.js'], _modules['Series/Map/MapSeriesDefaults.js'], _modules['Maps/MapView.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (A, ColorMapComposition, CU, H, MapChart, MapPoint, MapSeriesDefaults, MapView, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject, stop } = A;
        const { noop } = H;
        const { splitPath } = MapChart;
        const { 
        // Indirect dependency to keep product size low
        column: ColumnSeries, scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
        const { extend, find, fireEvent, getNestedProperty, isArray, defined, isNumber, isObject, merge, objectEach, pick, splat } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.map
         *
         * @augments Highcharts.Series
         */
        class MapSeries extends ScatterSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.processedData = [];
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * The initial animation for the map series. By default, animation is
             * disabled.
             * @private
             */
            animate(init) {
                const { chart, group } = this, animation = animObject(this.options.animation);
                // Initialize the animation
                if (init) {
                    // Scale down the group and place it in the center
                    group.attr({
                        translateX: chart.plotLeft + chart.plotWidth / 2,
                        translateY: chart.plotTop + chart.plotHeight / 2,
                        scaleX: 0.001, // #1499
                        scaleY: 0.001
                    });
                    // Run the animation
                }
                else {
                    group.animate({
                        translateX: chart.plotLeft,
                        translateY: chart.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }, animation);
                }
            }
            clearBounds() {
                this.points.forEach((point) => {
                    delete point.bounds;
                    delete point.insetIndex;
                    delete point.projectedPath;
                });
                delete this.bounds;
            }
            /**
             * Allow a quick redraw by just translating the area group. Used for zooming
             * and panning in capable browsers.
             * @private
             */
            doFullTranslate() {
                return Boolean(this.isDirtyData ||
                    this.chart.isResizing ||
                    !this.hasRendered);
            }
            /**
             * Draw the data labels. Special for maps is the time that the data labels
             * are drawn (after points), and the clipping of the dataLabelsGroup.
             * @private
             */
            drawMapDataLabels() {
                super.drawDataLabels();
                if (this.dataLabelsGroup) {
                    this.dataLabelsGroup.clip(this.chart.clipRect);
                }
            }
            /**
             * Use the drawPoints method of column, that is able to handle simple
             * shapeArgs. Extend it by assigning the tooltip position.
             * @private
             */
            drawPoints() {
                const series = this, { chart, group, transformGroups = [] } = this, { mapView, renderer } = chart;
                if (!mapView) {
                    return;
                }
                // Set groups that handle transform during zooming and panning in order
                // to preserve clipping on series.group
                this.transformGroups = transformGroups;
                if (!transformGroups[0]) {
                    transformGroups[0] = renderer.g().add(group);
                }
                for (let i = 0, iEnd = mapView.insets.length; i < iEnd; ++i) {
                    if (!transformGroups[i + 1]) {
                        transformGroups.push(renderer.g().add(group));
                    }
                }
                // Draw the shapes again
                if (this.doFullTranslate()) {
                    // Individual point actions.
                    this.points.forEach((point) => {
                        const { graphic } = point;
                        // Points should be added in the corresponding transform group
                        point.group = transformGroups[typeof point.insetIndex === 'number' ?
                            point.insetIndex + 1 :
                            0];
                        // When the point has been moved between insets after
                        // MapView.update
                        if (graphic && graphic.parentGroup !== point.group) {
                            graphic.add(point.group);
                        }
                    });
                    // Draw the points
                    ColumnSeries.prototype.drawPoints.apply(this);
                    // Add class names
                    this.points.forEach((point) => {
                        const graphic = point.graphic;
                        if (graphic) {
                            const animate = graphic.animate;
                            let className = '';
                            if (point.name) {
                                className +=
                                    'highcharts-name-' +
                                        point.name.replace(/ /g, '-').toLowerCase();
                            }
                            if (point.properties && point.properties['hc-key']) {
                                className +=
                                    ' highcharts-key-' +
                                        point.properties['hc-key'].toString().toLowerCase();
                            }
                            if (className) {
                                graphic.addClass(className);
                            }
                            // In styled mode, apply point colors by CSS
                            if (chart.styledMode) {
                                graphic.css(this.pointAttribs(point, point.selected && 'select' || void 0));
                            }
                            // If the map point is not visible and is not null (e.g.
                            // hidden by data classes), then the point should be
                            // visible, but without value
                            graphic.attr({
                                visibility: (point.visible ||
                                    (!point.visible && !point.isNull)) ? 'inherit' : 'hidden'
                            });
                            graphic.animate = function (params, options, complete) {
                                const animateIn = (isNumber(params['stroke-width']) &&
                                    !isNumber(graphic['stroke-width'])), animateOut = (isNumber(graphic['stroke-width']) &&
                                    !isNumber(params['stroke-width']));
                                // When strokeWidth is animating
                                if (animateIn || animateOut) {
                                    const strokeWidth = pick(series.getStrokeWidth(series.options), 1 // Styled mode
                                    ), inheritedStrokeWidth = (strokeWidth /
                                        (chart.mapView &&
                                            chart.mapView.getScale() ||
                                            1));
                                    // For animating from undefined, .attr() reads the
                                    // property as the starting point
                                    if (animateIn) {
                                        graphic['stroke-width'] = inheritedStrokeWidth;
                                    }
                                    // For animating to undefined
                                    if (animateOut) {
                                        params['stroke-width'] = inheritedStrokeWidth;
                                    }
                                }
                                const ret = animate.call(graphic, params, options, animateOut ? function () {
                                    // Remove the attribute after finished animation
                                    graphic.element.removeAttribute('stroke-width');
                                    delete graphic['stroke-width'];
                                    // Proceed
                                    if (complete) {
                                        complete.apply(this, arguments);
                                    }
                                } : complete);
                                return ret;
                            };
                        }
                    });
                }
                // Apply the SVG transform
                transformGroups.forEach((transformGroup, i) => {
                    const view = i === 0 ? mapView : mapView.insets[i - 1], svgTransform = view.getSVGTransform(), strokeWidth = pick(this.getStrokeWidth(this.options), 1 // Styled mode
                    );
                    /*
                    Animate or move to the new zoom level. In order to prevent
                    flickering as the different transform components are set out of sync
                    (#5991), we run a fake animator attribute and set scale and
                    translation synchronously in the same step.

                    A possible improvement to the API would be to handle this in the
                    renderer or animation engine itself, to ensure that when we are
                    animating multiple properties, we make sure that each step for each
                    property is performed in the same step. Also, for symbols and for
                    transform properties, it should induce a single updateTransform and
                    symbolAttr call.
                    */
                    const scale = svgTransform.scaleX, flipFactor = svgTransform.scaleY > 0 ? 1 : -1;
                    const animatePoints = (scale) => {
                        (series.points || []).forEach((point) => {
                            const graphic = point.graphic;
                            let strokeWidth;
                            if (graphic &&
                                graphic['stroke-width'] &&
                                (strokeWidth = this.getStrokeWidth(point.options))) {
                                graphic.attr({
                                    'stroke-width': strokeWidth / scale
                                });
                            }
                        });
                    };
                    if (renderer.globalAnimation &&
                        chart.hasRendered &&
                        mapView.allowTransformAnimation) {
                        const startTranslateX = Number(transformGroup.attr('translateX'));
                        const startTranslateY = Number(transformGroup.attr('translateY'));
                        const startScale = Number(transformGroup.attr('scaleX'));
                        const step = (now, fx) => {
                            const scaleStep = startScale +
                                (scale - startScale) * fx.pos;
                            transformGroup.attr({
                                translateX: (startTranslateX + (svgTransform.translateX - startTranslateX) * fx.pos),
                                translateY: (startTranslateY + (svgTransform.translateY - startTranslateY) * fx.pos),
                                scaleX: scaleStep,
                                scaleY: scaleStep * flipFactor,
                                'stroke-width': strokeWidth / scaleStep
                            });
                            animatePoints(scaleStep); // #18166
                        };
                        const animOptions = merge(animObject(renderer.globalAnimation)), userStep = animOptions.step;
                        animOptions.step = function () {
                            if (userStep) {
                                userStep.apply(this, arguments);
                            }
                            step.apply(this, arguments);
                        };
                        transformGroup
                            .attr({ animator: 0 })
                            .animate({ animator: 1 }, animOptions, function () {
                            if (typeof renderer.globalAnimation !== 'boolean' &&
                                renderer.globalAnimation.complete) {
                                // Fire complete only from this place
                                renderer.globalAnimation.complete({
                                    applyDrilldown: true
                                });
                            }
                            fireEvent(this, 'mapZoomComplete');
                        }.bind(this));
                        // When dragging or first rendering, animation is off
                    }
                    else {
                        stop(transformGroup);
                        transformGroup.attr(merge(svgTransform, { 'stroke-width': strokeWidth / scale }));
                        animatePoints(scale); // #18166
                    }
                });
                if (!this.isDrilling) {
                    this.drawMapDataLabels();
                }
            }
            /**
             * Get the bounding box of all paths in the map combined.
             *
             */
            getProjectedBounds() {
                if (!this.bounds && this.chart.mapView) {
                    const { insets, projection } = this.chart.mapView, allBounds = [];
                    // Find the bounding box of each point
                    (this.points || []).forEach((point) => {
                        if (point.path || point.geometry) {
                            // @todo Try to put these two conversions in
                            // MapPoint.applyOptions
                            if (typeof point.path === 'string') {
                                point.path = splitPath(point.path);
                                // Legacy one-dimensional array
                            }
                            else if (isArray(point.path) &&
                                point.path[0] === 'M') {
                                point.path = this.chart.renderer
                                    .pathToSegments(point.path);
                            }
                            // The first time a map point is used, analyze its box
                            if (!point.bounds) {
                                let bounds = point.getProjectedBounds(projection);
                                if (bounds) {
                                    point.labelrank = pick(point.labelrank, 
                                    // Bigger shape, higher rank
                                    ((bounds.x2 - bounds.x1) *
                                        (bounds.y2 - bounds.y1)));
                                    const { midX, midY } = bounds;
                                    if (insets && isNumber(midX) && isNumber(midY)) {
                                        const inset = find(insets, (inset) => inset.isInside({
                                            x: midX, y: midY
                                        }));
                                        if (inset) {
                                            // Project again, but with the inset
                                            // projection
                                            delete point.projectedPath;
                                            bounds = point.getProjectedBounds(inset.projection);
                                            if (bounds) {
                                                inset.allBounds.push(bounds);
                                            }
                                            point.insetIndex = insets.indexOf(inset);
                                        }
                                    }
                                    point.bounds = bounds;
                                }
                            }
                            if (point.bounds && point.insetIndex === void 0) {
                                allBounds.push(point.bounds);
                            }
                        }
                    });
                    this.bounds = MapView.compositeBounds(allBounds);
                }
                return this.bounds;
            }
            /**
             * Return the stroke-width either from a series options or point options
             * object. This function is used by both the map series where the
             * `borderWidth` sets the stroke-width, and the mapline series where the
             * `lineWidth` sets the stroke-width.
             * @private
             */
            getStrokeWidth(options) {
                const pointAttrToOptions = this.pointAttrToOptions;
                return options[pointAttrToOptions &&
                    pointAttrToOptions['stroke-width'] || 'borderWidth'];
            }
            /**
             * Define hasData function for non-cartesian series. Returns true if the
             * series has points at all.
             * @private
             */
            hasData() {
                return !!this.processedXData.length; // != 0
            }
            /**
             * Get presentational attributes. In the maps series this runs in both
             * styled and non-styled mode, because colors hold data when a colorAxis is
             * used.
             * @private
             */
            pointAttribs(point, state) {
                const { mapView, styledMode } = point.series.chart;
                const attr = styledMode ?
                    this.colorAttribs(point) :
                    ColumnSeries.prototype.pointAttribs.call(this, point, state);
                // Individual stroke width
                let pointStrokeWidth = this.getStrokeWidth(point.options);
                // Handle state specific border or line width
                if (state) {
                    const stateOptions = merge(this.options.states &&
                        this.options.states[state], point.options.states &&
                        point.options.states[state] ||
                        {}), stateStrokeWidth = this.getStrokeWidth(stateOptions);
                    if (defined(stateStrokeWidth)) {
                        pointStrokeWidth = stateStrokeWidth;
                    }
                    attr.stroke = stateOptions.borderColor ?? point.color;
                }
                if (pointStrokeWidth && mapView) {
                    pointStrokeWidth /= mapView.getScale();
                }
                // In order for dash style to avoid being scaled, set the transformed
                // stroke width on the item
                const seriesStrokeWidth = this.getStrokeWidth(this.options);
                if (attr.dashstyle &&
                    mapView &&
                    isNumber(seriesStrokeWidth)) {
                    pointStrokeWidth = seriesStrokeWidth / mapView.getScale();
                }
                // Invisible map points means that the data value is removed from the
                // map, but not the map area shape itself. Instead it is rendered like a
                // null point. To fully remove a map area, it should be removed from the
                // mapData.
                if (!point.visible) {
                    attr.fill = this.options.nullColor;
                }
                if (defined(pointStrokeWidth)) {
                    attr['stroke-width'] = pointStrokeWidth;
                }
                else {
                    delete attr['stroke-width'];
                }
                attr['stroke-linecap'] = attr['stroke-linejoin'] = this.options.linecap;
                return attr;
            }
            updateData() {
                // #16782
                if (this.processedData) {
                    return false;
                }
                return super.updateData.apply(this, arguments);
            }
            /**
             * Extend setData to call processData and generatePoints immediately.
             * @private
             */
            setData(data, redraw = true, animation, updatePoints) {
                delete this.bounds;
                super.setData(data, false, void 0, updatePoints);
                this.processData();
                this.generatePoints();
                if (redraw) {
                    this.chart.redraw(animation);
                }
            }
            /**
             * Extend processData to join in mapData. If the allAreas option is true,
             * all areas from the mapData are used, and those that don't correspond to a
             * data value are given null values. The results are stored in
             * `processedData` in order to avoid mutating `data`.
             * @private
             */
            processData() {
                const options = this.options, data = options.data, chart = this.chart, chartOptions = chart.options.chart, joinBy = this.joinBy, pointArrayMap = options.keys || this.pointArrayMap, dataUsed = [], mapMap = {}, mapView = this.chart.mapView, mapDataObject = mapView && (
                // Get map either from series or global
                isObject(options.mapData, true) ?
                    mapView.getGeoMap(options.mapData) : mapView.geoMap), 
                // Pick up transform definitions for chart
                mapTransforms = chart.mapTransforms =
                    chartOptions.mapTransforms ||
                        mapDataObject && mapDataObject['hc-transform'] ||
                        chart.mapTransforms;
                let mapPoint, props;
                // Cache cos/sin of transform rotation angle
                if (mapTransforms) {
                    objectEach(mapTransforms, (transform) => {
                        if (transform.rotation) {
                            transform.cosAngle = Math.cos(transform.rotation);
                            transform.sinAngle = Math.sin(transform.rotation);
                        }
                    });
                }
                let mapData;
                if (isArray(options.mapData)) {
                    mapData = options.mapData;
                }
                else if (mapDataObject && mapDataObject.type === 'FeatureCollection') {
                    this.mapTitle = mapDataObject.title;
                    mapData = H.geojson(mapDataObject, this.type, this);
                }
                // Reset processedData
                this.processedData = [];
                const processedData = this.processedData;
                // Pick up numeric values, add index. Convert Array point definitions to
                // objects using pointArrayMap.
                if (data) {
                    let val;
                    for (let i = 0, iEnd = data.length; i < iEnd; ++i) {
                        val = data[i];
                        if (isNumber(val)) {
                            processedData[i] = {
                                value: val
                            };
                        }
                        else if (isArray(val)) {
                            let ix = 0;
                            processedData[i] = {};
                            // Automatically copy first item to hc-key if there is
                            // an extra leading string
                            if (!options.keys &&
                                val.length > pointArrayMap.length &&
                                typeof val[0] === 'string') {
                                processedData[i]['hc-key'] = val[0];
                                ++ix;
                            }
                            // Run through pointArrayMap and what's left of the
                            // point data array in parallel, copying over the values
                            for (let j = 0; j < pointArrayMap.length; ++j, ++ix) {
                                if (pointArrayMap[j] &&
                                    typeof val[ix] !== 'undefined') {
                                    if (pointArrayMap[j].indexOf('.') > 0) {
                                        MapPoint.prototype.setNestedProperty(processedData[i], val[ix], pointArrayMap[j]);
                                    }
                                    else {
                                        processedData[i][pointArrayMap[j]] = val[ix];
                                    }
                                }
                            }
                        }
                        else {
                            processedData[i] = data[i];
                        }
                        if (joinBy &&
                            joinBy[0] === '_i') {
                            processedData[i]._i = i;
                        }
                    }
                }
                if (mapData) {
                    this.mapData = mapData;
                    this.mapMap = {};
                    for (let i = 0; i < mapData.length; i++) {
                        mapPoint = mapData[i];
                        props = mapPoint.properties;
                        mapPoint._i = i;
                        // Copy the property over to root for faster access
                        if (joinBy[0] && props && props[joinBy[0]]) {
                            mapPoint[joinBy[0]] = props[joinBy[0]];
                        }
                        mapMap[mapPoint[joinBy[0]]] = mapPoint;
                    }
                    this.mapMap = mapMap;
                    // Registered the point codes that actually hold data
                    if (joinBy[1]) {
                        const joinKey = joinBy[1];
                        processedData.forEach((pointOptions) => {
                            const mapKey = getNestedProperty(joinKey, pointOptions);
                            if (mapMap[mapKey]) {
                                dataUsed.push(mapMap[mapKey]);
                            }
                        });
                    }
                    if (options.allAreas) {
                        // Register the point codes that actually hold data
                        if (joinBy[1]) {
                            const joinKey = joinBy[1];
                            processedData.forEach((pointOptions) => {
                                dataUsed.push(getNestedProperty(joinKey, pointOptions));
                            });
                        }
                        // Add those map points that don't correspond to data, which
                        // will be drawn as null points. Searching a string is faster
                        // than Array.indexOf
                        const dataUsedString = ('|' +
                            dataUsed
                                .map(function (point) {
                                return point && point[joinBy[0]];
                            })
                                .join('|') +
                            '|');
                        mapData.forEach((mapPoint) => {
                            if (!joinBy[0] ||
                                dataUsedString.indexOf('|' +
                                    mapPoint[joinBy[0]] +
                                    '|') === -1) {
                                processedData.push(merge(mapPoint, { value: null }));
                            }
                        });
                    }
                }
                // The processedXData array is used by general chart logic for checking
                // data length in various scanarios
                this.processedXData = new Array(processedData.length);
                return void 0;
            }
            /**
             * Extend setOptions by picking up the joinBy option and applying it to a
             * series property.
             * @private
             */
            setOptions(itemOptions) {
                const options = super.setOptions(itemOptions);
                let joinBy = options.joinBy;
                if (options.joinBy === null) {
                    joinBy = '_i';
                }
                joinBy = this.joinBy = splat(joinBy);
                if (!joinBy[1]) {
                    joinBy[1] = joinBy[0];
                }
                return options;
            }
            /**
             * Add the path option for data points. Find the max value for color
             * calculation.
             * @private
             */
            translate() {
                const series = this, doFullTranslate = series.doFullTranslate(), mapView = this.chart.mapView, projection = mapView && mapView.projection;
                // Recalculate box on updated data
                if (this.chart.hasRendered && (this.isDirtyData || !this.hasRendered)) {
                    this.processData();
                    this.generatePoints();
                    delete this.bounds;
                    if (mapView &&
                        !mapView.userOptions.center &&
                        !isNumber(mapView.userOptions.zoom) &&
                        mapView.zoom === mapView.minZoom // #18542 don't zoom out if
                    // map is zoomed
                    ) {
                        // Not only recalculate bounds but also fit view
                        mapView.fitToBounds(void 0, void 0, false); // #17012
                    }
                    else {
                        // If center and zoom is defined in user options, get bounds but
                        // don't change view
                        this.getProjectedBounds();
                    }
                }
                if (mapView) {
                    const mainSvgTransform = mapView.getSVGTransform();
                    series.points.forEach((point) => {
                        const svgTransform = (isNumber(point.insetIndex) &&
                            mapView.insets[point.insetIndex].getSVGTransform()) || mainSvgTransform;
                        // Record the middle point (loosely based on centroid),
                        // determined by the middleX and middleY options.
                        if (svgTransform &&
                            point.bounds &&
                            isNumber(point.bounds.midX) &&
                            isNumber(point.bounds.midY)) {
                            point.plotX = point.bounds.midX * svgTransform.scaleX +
                                svgTransform.translateX;
                            point.plotY = point.bounds.midY * svgTransform.scaleY +
                                svgTransform.translateY;
                        }
                        if (doFullTranslate) {
                            point.shapeType = 'path';
                            point.shapeArgs = {
                                d: MapPoint.getProjectedPath(point, projection)
                            };
                        }
                        if (!point.hiddenInDataClass) { // #20441
                            if (point.projectedPath && !point.projectedPath.length) {
                                point.setVisible(false);
                            }
                            else if (!point.visible) {
                                point.setVisible(true);
                            }
                        }
                    });
                }
                fireEvent(series, 'afterTranslate');
            }
            update(options) {
                // Calculate and set the recommended map view after every series update
                // if new mapData is set
                if (options.mapData) {
                    this.chart.mapView?.recommendMapView(this.chart, [
                        this.chart.options.chart.map,
                        ...(this.chart.options.series || []).map((s, i) => {
                            if (i === this._i) {
                                return options.mapData;
                            }
                            return s.mapData;
                        })
                    ], true);
                }
                super.update.apply(this, arguments);
            }
        }
        MapSeries.defaultOptions = merge(ScatterSeries.defaultOptions, MapSeriesDefaults);
        extend(MapSeries.prototype, {
            type: 'map',
            axisTypes: ColorMapComposition.seriesMembers.axisTypes,
            colorAttribs: ColorMapComposition.seriesMembers.colorAttribs,
            colorKey: ColorMapComposition.seriesMembers.colorKey,
            // When tooltip is not shared, this series (and derivatives) requires
            // direct touch/hover. KD-tree does not apply.
            directTouch: true,
            // We need the points' bounding boxes in order to draw the data labels,
            // so we skip it now and call it from drawPoints instead.
            drawDataLabels: noop,
            // No graph for the map series
            drawGraph: noop,
            forceDL: true,
            getCenter: CU.getCenter,
            getExtremesFromAll: true,
            getSymbol: noop,
            isCartesian: false,
            parallelArrays: ColorMapComposition.seriesMembers.parallelArrays,
            pointArrayMap: ColorMapComposition.seriesMembers.pointArrayMap,
            pointClass: MapPoint,
            // X axis and Y axis must have same translation slope
            preserveAspectRatio: true,
            searchPoint: noop,
            trackerGroups: ColorMapComposition.seriesMembers.trackerGroups,
            // Get axis extremes from paths, not values
            useMapGeometry: true
        });
        ColorMapComposition.compose(MapSeries);
        SeriesRegistry.registerSeriesType('map', MapSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return MapSeries;
    });
    _registerModule(_modules, 'Series/MapLine/MapLineSeriesDefaults.js', [], function () {
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
         * A mapline series is a special case of the map series where the value
         * colors are applied to the strokes rather than the fills. It can also be
         * used for freeform drawing, like dividers, in the map.
         *
         * @sample maps/demo/mapline-mappoint/
         *         Mapline and map-point chart
         * @sample maps/demo/animated-mapline/
         *         Mapline with CSS keyframe animation
         * @sample maps/demo/flight-routes
         *         Flight routes
         *
         * @extends      plotOptions.map
         * @excluding    dragDrop
         * @product      highmaps
         * @optionparent plotOptions.mapline
         */
        const MapLineSeriesDefaults = {
            /**
             * Pixel width of the mapline line.
             *
             * @type      {number}
             * @since     10.3.3
             * @product   highmaps
             * @default   1
             * @apioption plotOptions.mapline.lineWidth
             */
            lineWidth: 1,
            /**
             * Fill color for the map line shapes
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            fillColor: 'none',
            legendSymbol: 'lineMarker'
        };
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A `mapline` series. If the [type](#series.mapline.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.mapline
         * @excluding dataParser, dataURL, dragDrop, marker
         * @product   highmaps
         * @apioption series.mapline
         */
        /**
         * An array of data points for the series. For the `mapline` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of numerical values. In this case, the numerical values
         * will be interpreted as `value` options. Example:
         *
         *  ```js
         *  data: [0, 5, 3, 5]
         *  ```
         *
         * 2.  An array of arrays with 2 values. In this case, the values correspond
         * to `[hc-key, value]`. Example:
         *
         *  ```js
         *     data: [
         *         ['us-ny', 0],
         *         ['us-mi', 5],
         *         ['us-tx', 3],
         *         ['us-ak', 5]
         *     ]
         *  ```
         *
         * 3.  An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.map.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         value: 6,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         value: 6,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @type      {Array<number|Array<string,(number|null)>|null|*>}
         * @extends   series.map.data
         * @excluding drilldown
         * @product   highmaps
         * @apioption series.mapline.data
         */
        /**
         * Pixel width of the mapline line.
         *
         * @type      {number}
         * @since 10.2.0
         * @product   highmaps
         * @apioption plotOptions.mapline.states.hover.lineWidth
         */
        /**
         * Pixel width of the mapline line.
         *
         * @type      {number|undefined}
         * @since 10.3.3
         * @product   highmaps
         * @apioption series.mapline.data.lineWidth
         */
        /**
         *
         * @type      {number}
         * @product   highmaps
         * @excluding borderWidth
         * @apioption plotOptions.mapline.states.hover
         */
        (''); // Keeps doclets above in JS file

        return MapLineSeriesDefaults;
    });
    _registerModule(_modules, 'Series/MapLine/MapLineSeries.js', [_modules['Series/MapLine/MapLineSeriesDefaults.js'], _modules['Series/Map/MapSeries.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (MapLineSeriesDefaults, MapSeries, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.mapline
         *
         * @augments Highcharts.Series
         */
        class MapLineSeries extends MapSeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Get presentational attributes
             * @private
             * @function Highcharts.seriesTypes.mapline#pointAttribs
             */
            pointAttribs(point, state) {
                const attr = super.pointAttribs(point, state);
                // The difference from a map series is that the stroke takes the
                // point color
                attr.fill = this.options.fillColor;
                return attr;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        MapLineSeries.defaultOptions = merge(MapSeries.defaultOptions, MapLineSeriesDefaults);
        extend(MapLineSeries.prototype, {
            type: 'mapline',
            colorProp: 'stroke',
            pointAttrToOptions: {
                'stroke': 'color',
                'stroke-width': 'lineWidth'
            }
        });
        SeriesRegistry.registerSeriesType('mapline', MapLineSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return MapLineSeries;
    });
    _registerModule(_modules, 'Series/MapPoint/MapPointPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
        const { isNumber } = U;
        /* *
         *
         *  Class
         *
         * */
        class MapPointPoint extends ScatterSeries.prototype.pointClass {
            /* *
             *
             *  Functions
             *
             * */
            isValid() {
                return Boolean(this.options.geometry ||
                    (isNumber(this.x) && isNumber(this.y)) ||
                    (isNumber(this.options.lon) && isNumber(this.options.lat)));
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return MapPointPoint;
    });
    _registerModule(_modules, 'Series/MapPoint/MapPointSeriesDefaults.js', [], function () {
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
         * A mappoint series is a special form of scatter series where the points
         * can be laid out in map coordinates on top of a map.
         *
         * @sample maps/demo/mapline-mappoint/
         *         Map-line and map-point series.
         * @sample maps/demo/mappoint-mapmarker
         *         Using the mapmarker symbol for points
         * @sample maps/demo/mappoint-datalabels-mapmarker
         *         Using the mapmarker shape for data labels
         *
         * @extends      plotOptions.scatter
         * @product      highmaps
         * @optionparent plotOptions.mappoint
         */
        const MapPointSeriesDefaults = {
            dataLabels: {
                crop: false,
                defer: false,
                enabled: true,
                formatter: function () {
                    return this.point.name;
                },
                overflow: false,
                style: {
                    /** @internal */
                    color: "#000000" /* Palette.neutralColor100 */
                }
            },
            legendSymbol: 'lineMarker'
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
         * A `mappoint` series. If the [type](#series.mappoint.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         *
         * @extends   series,plotOptions.mappoint
         * @excluding dataParser, dataURL
         * @product   highmaps
         * @apioption series.mappoint
         */
        /**
         * An array of data points for the series. For the `mappoint` series
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
         * 2. An array of arrays with 2 values. In this case, the values correspond
         * to `[hc-key, value]`. Example:
         *
         *  ```js
         *     data: [
         *         ['us-ny', 0],
         *         ['us-mi', 5],
         *         ['us-tx', 3],
         *         ['us-ak', 5]
         *     ]
         *  ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.mappoint.turboThreshold),
         *    this option is not available.
         *    ```js
         *        data: [{
         *            x: 1,
         *            y: 7,
         *            name: "Point2",
         *            color: "#00FF00"
         *        }, {
         *            x: 1,
         *            y: 4,
         *            name: "Point1",
         *            color: "#FF00FF"
         *        }]
         *    ```
         *
         * @type      {Array<number|Array<number,(number|null)>|null|*>}
         * @extends   series.map.data
         * @excluding labelrank, middleX, middleY, path, value
         * @product   highmaps
         * @apioption series.mappoint.data
         */
        /**
         * The geometry of a point.
         *
         * To achieve a better separation between the structure and the data,
         * it is recommended to use `mapData` to define the geometry instead
         * of defining it on the data points themselves.
         *
         * The geometry object is compatible to that of a `feature` in geoJSON, so
         * features of geoJSON can be passed directly into the `data`, optionally
         * after first filtering and processing it.
         *
         * @sample maps/series/mappoint-line-geometry/
         *         Map point and line geometry
         *
         * @type      {Object}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.mappoint.data.geometry
         */
        /**
         * The geometry type, which in case of the `mappoint` series is always `Point`.
         *
         * @type      {string}
         * @since 9.3.0
         * @product   highmaps
         * @validvalue ["Point"]
         * @apioption series.mappoint.data.geometry.type
         */
        /**
         * The geometry coordinates in terms of `[longitude, latitude]`.
         *
         * @type      {Highcharts.LonLatArray}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.mappoint.data.geometry.coordinates
         */
        /**
         * The latitude of the point. Must be combined with the `lon` option
         * to work. Overrides `x` and `y` values.
         *
         * @sample {highmaps} maps/demo/mappoint-latlon/
         *         Point position by lat/lon
         *
         * @type      {number}
         * @since     1.1.0
         * @product   highmaps
         * @apioption series.mappoint.data.lat
         */
        /**
         * The longitude of the point. Must be combined with the `lon` option
         * to work. Overrides `x` and `y` values.
         *
         * @sample {highmaps} maps/demo/mappoint-latlon/
         *         Point position by lat/lon
         *
         * @type      {number}
         * @since     1.1.0
         * @product   highmaps
         * @apioption series.mappoint.data.lon
         */
        /**
         * The x coordinate of the point in terms of projected units.
         *
         * @sample {highmaps} maps/series/mapline-mappoint-path-xy/
         *         Map point demo
         *
         * @type      {number}
         * @product   highmaps
         * @apioption series.mappoint.data.x
         */
        /**
         * The x coordinate of the point in terms of projected units.
         *
         * @sample {highmaps} maps/series/mapline-mappoint-path-xy/
         *         Map point demo
         *
         * @type      {number|null}
         * @product   highmaps
         * @apioption series.mappoint.data.y
         */
        /**
         * @type      {number}
         * @product   highmaps
         * @excluding borderColor, borderWidth
         * @apioption plotOptions.mappoint
         */
        (''); // Keeps doclets above in JS file

        return MapPointSeriesDefaults;
    });
    _registerModule(_modules, 'Series/MapPoint/MapPointSeries.js', [_modules['Core/Globals.js'], _modules['Series/MapPoint/MapPointPoint.js'], _modules['Series/MapPoint/MapPointSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (H, MapPointPoint, MapPointSeriesDefaults, SeriesRegistry, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { map: MapSeries, scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
        const { extend, fireEvent, isNumber, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.mappoint
         *
         * @augments Highcharts.Series
         */
        class MapPointSeries extends ScatterSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.clearBounds = MapSeries.prototype.clearBounds;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            drawDataLabels() {
                super.drawDataLabels();
                if (this.dataLabelsGroup) {
                    this.dataLabelsGroup.clip(this.chart.clipRect);
                }
            }
            /**
             * Resolve `lon`, `lat` or `geometry` options and project the resulted
             * coordinates.
             *
             * @private
             */
            projectPoint(pointOptions) {
                const mapView = this.chart.mapView;
                if (mapView) {
                    const { geometry, lon, lat } = pointOptions;
                    let coordinates = (geometry &&
                        geometry.type === 'Point' &&
                        geometry.coordinates);
                    if (isNumber(lon) && isNumber(lat)) {
                        coordinates = [lon, lat];
                    }
                    if (coordinates) {
                        return mapView.lonLatToProjectedUnits({
                            lon: coordinates[0],
                            lat: coordinates[1]
                        });
                    }
                }
            }
            translate() {
                const mapView = this.chart.mapView;
                if (!this.processedXData) {
                    this.processData();
                }
                this.generatePoints();
                if (this.getProjectedBounds && this.isDirtyData) {
                    delete this.bounds;
                    this.getProjectedBounds(); // Added point needs bounds(#16598)
                }
                // Create map based translation
                if (mapView) {
                    const mainSvgTransform = mapView.getSVGTransform(), { hasCoordinates } = mapView.projection;
                    this.points.forEach((p) => {
                        let { x = void 0, y = void 0 } = p;
                        const svgTransform = (isNumber(p.insetIndex) &&
                            mapView.insets[p.insetIndex].getSVGTransform()) || mainSvgTransform;
                        const xy = (this.projectPoint(p.options) ||
                            (p.properties &&
                                this.projectPoint(p.properties)));
                        let didBounds;
                        if (xy) {
                            x = xy.x;
                            y = xy.y;
                            // Map bubbles getting geometry from shape
                        }
                        else if (p.bounds) {
                            x = p.bounds.midX;
                            y = p.bounds.midY;
                            if (svgTransform && isNumber(x) && isNumber(y)) {
                                p.plotX = x * svgTransform.scaleX +
                                    svgTransform.translateX;
                                p.plotY = y * svgTransform.scaleY +
                                    svgTransform.translateY;
                                didBounds = true;
                            }
                        }
                        if (isNumber(x) && isNumber(y)) {
                            // Establish plotX and plotY
                            if (!didBounds) {
                                const plotCoords = mapView.projectedUnitsToPixels({ x, y });
                                p.plotX = plotCoords.x;
                                p.plotY = hasCoordinates ?
                                    plotCoords.y :
                                    this.chart.plotHeight - plotCoords.y;
                            }
                        }
                        else {
                            p.y = p.plotX = p.plotY = void 0;
                        }
                        p.isInside = this.isPointInside(p);
                        // Find point zone
                        p.zone = this.zones.length ? p.getZone() : void 0;
                    });
                }
                fireEvent(this, 'afterTranslate');
            }
        }
        MapPointSeries.defaultOptions = merge(ScatterSeries.defaultOptions, MapPointSeriesDefaults);
        /* *
         *
         * Extra
         *
         * */
        /* *
         * The mapmarker symbol
         */
        const mapmarker = (x, y, w, h, options) => {
            const isLegendSymbol = options && options.context === 'legend';
            let anchorX, anchorY;
            if (isLegendSymbol) {
                anchorX = x + w / 2;
                anchorY = y + h;
                // Put the pin in the anchor position (dataLabel.shape)
            }
            else if (options &&
                typeof options.anchorX === 'number' &&
                typeof options.anchorY === 'number') {
                anchorX = options.anchorX;
                anchorY = options.anchorY;
                // Put the pin in the center and shift upwards (point.marker.symbol)
            }
            else {
                anchorX = x + w / 2;
                anchorY = y + h / 2;
                y -= h;
            }
            const r = isLegendSymbol ? h / 3 : h / 2;
            return [
                ['M', anchorX, anchorY],
                ['C', anchorX, anchorY, anchorX - r, y + r * 1.5, anchorX - r, y + r],
                // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
                ['A', r, r, 1, 1, 1, anchorX + r, y + r],
                ['C', anchorX + r, y + r * 1.5, anchorX, anchorY, anchorX, anchorY],
                ['Z']
            ];
        };
        SVGRenderer.prototype.symbols.mapmarker = mapmarker;
        extend(MapPointSeries.prototype, {
            type: 'mappoint',
            axisTypes: ['colorAxis'],
            forceDL: true,
            isCartesian: false,
            pointClass: MapPointPoint,
            searchPoint: noop,
            useMapGeometry: true // #16534
        });
        SeriesRegistry.registerSeriesType('mappoint', MapPointSeries);
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
        ''; // Adds doclets above to transpiled file

        return MapPointSeries;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleLegendDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
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
        const BubbleLegendDefaults = {
            /**
             * The color of the ranges borders, can be also defined for an
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
             * The width of the ranges borders in pixels, can be also
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
             * The main color of the bubble legend. Applies to ranges, if
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
             * The color of the connector, can be also defined
             * for an individual range.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            connectorColor: void 0,
            /**
             * The length of the connectors in pixels. If labels are
             * centered, the distance is reduced to 0.
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
                 * legend. Can be one of `left`, `center` or `right`.
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
                    fontSize: '0.9em',
                    /** @ignore-option */
                    color: "#000000" /* Palette.neutralColor100 */
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
             * Maximum bubble legend range size. If values for ranges are
             * not specified, the `minSize` and the `maxSize` are calculated
             * from bubble series.
             */
            maxSize: 60, // Number
            /**
             * Minimum bubble legend range size. If values for ranges are
             * not specified, the `minSize` and the `maxSize` are calculated
             * from bubble series.
             */
            minSize: 10, // Number
            /**
             * The position of the bubble legend in the legend.
             * @sample highcharts/bubble-legend/connectorandlabels/
             *         Bubble legend as last item in legend
             */
            legendIndex: 0, // Number
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
                 * Range size value, similar to bubble Z data.
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
             * by the area or the width of the bubble. The default, area,
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
             * When this is true, the absolute value of z determines the
             * size of the bubble. This means that with the default
             * zThreshold of 0, a bubble of value -1 will have the same size
             * as a bubble of value 1, while a bubble of value 0 will have a
             * smaller size according to minSize.
             */
            sizeByAbsoluteValue: false,
            /**
             * Define the visual z index of the bubble legend.
             */
            zIndex: 1,
            /**
             * Ranges with lower value than zThreshold are skipped.
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
    _registerModule(_modules, 'Series/Bubble/BubbleLegendItem.js', [_modules['Core/Color/Color.js'], _modules['Core/Templating.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Color, F, H, U) {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { parse: color } = Color;
        const { noop } = H;
        const { arrayMax, arrayMin, isNumber, merge, pick, stableSort } = U;
        /* *
         *
         *  Class
         *
         * */
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
        class BubbleLegendItem {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options, legend) {
                this.setState = noop;
                this.init(options, legend);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create basic bubbleLegend properties similar to item in legend.
             * @private
             */
            init(options, legend) {
                this.options = options;
                this.visible = true;
                this.chart = legend.chart;
                this.legend = legend;
            }
            /**
             * Depending on the position option, add bubbleLegend to legend items.
             *
             * @private
             *
             * @param {Array<(Highcharts.Point|Highcharts.Series)>} items
             *        All legend items
             */
            addToLegend(items) {
                // Insert bubbleLegend into legend items
                items.splice(this.options.legendIndex, 0, this);
            }
            /**
             * Calculate ranges, sizes and call the next steps of bubbleLegend
             * creation.
             *
             * @private
             *
             * @param {Highcharts.Legend} legend
             *        Legend instance
             */
            drawLegendSymbol(legend) {
                const itemDistance = pick(legend.options.itemDistance, 20), legendItem = this.legendItem || {}, options = this.options, ranges = options.ranges, connectorDistance = options.connectorDistance;
                let connectorSpace;
                // Do not create bubbleLegend now if ranges or ranges values are not
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
                const maxLabel = this.getMaxLabelSize(), radius = this.ranges[0].radius, size = radius * 2;
                // Space for connectors and labels.
                connectorSpace =
                    connectorDistance - radius + maxLabel.width;
                connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
                this.maxLabel = maxLabel;
                this.movementX = options.labels.align === 'left' ?
                    connectorSpace : 0;
                legendItem.labelWidth = size + connectorSpace + itemDistance;
                legendItem.labelHeight = size + maxLabel.height / 2;
            }
            /**
             * Set style options for each bubbleLegend range.
             * @private
             */
            setOptions() {
                const ranges = this.ranges, options = this.options, series = this.chart.series[options.seriesIndex], baseline = this.legend.baseline, bubbleAttribs = {
                    zIndex: options.zIndex,
                    'stroke-width': options.borderWidth
                }, connectorAttribs = {
                    zIndex: options.zIndex,
                    'stroke-width': options.connectorWidth
                }, labelAttribs = {
                    align: (this.legend.options.rtl ||
                        options.labels.align === 'left') ? 'right' : 'left',
                    zIndex: options.zIndex
                }, fillOpacity = series.options.marker.fillOpacity, styledMode = this.chart.styledMode;
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
            }
            /**
             * Calculate radius for each bubble range,
             * used code from BubbleSeries.js 'getRadius' method.
             *
             * @private
             *
             * @param {number} value
             *        Range value
             *
             * @return {number|null}
             *         Radius for one range
             */
            getRangeRadius(value) {
                const options = this.options, seriesIndex = this.options.seriesIndex, bubbleSeries = this.chart.series[seriesIndex], zMax = options.ranges[0].value, zMin = options.ranges[options.ranges.length - 1].value, minSize = options.minSize, maxSize = options.maxSize;
                return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
            }
            /**
             * Render the legendItem group.
             * @private
             */
            render() {
                const legendItem = this.legendItem || {}, renderer = this.chart.renderer, zThreshold = this.options.zThreshold;
                if (!this.symbols) {
                    this.symbols = {
                        connectors: [],
                        bubbleItems: [],
                        labels: []
                    };
                }
                // Nesting SVG groups to enable handleOverflow
                legendItem.symbol = renderer.g('bubble-legend');
                legendItem.label = renderer.g('bubble-legend-item')
                    .css(this.legend.itemStyle || {});
                // To enable default 'hideOverlappingLabels' method
                legendItem.symbol.translateX = 0;
                legendItem.symbol.translateY = 0;
                // To use handleOverflow method
                legendItem.symbol.add(legendItem.label);
                legendItem.label.add(legendItem.group);
                for (const range of this.ranges) {
                    if (range.value >= zThreshold) {
                        this.renderRange(range);
                    }
                }
                this.hideOverlappingLabels();
            }
            /**
             * Render one range, consisting of bubble symbol, connector and label.
             *
             * @private
             *
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             */
            renderRange(range) {
                const mainRange = this.ranges[0], legend = this.legend, options = this.options, labelsOptions = options.labels, chart = this.chart, bubbleSeries = chart.series[options.seriesIndex], renderer = chart.renderer, symbols = this.symbols, labels = symbols.labels, elementCenter = range.center, absoluteRadius = Math.abs(range.radius), connectorDistance = options.connectorDistance || 0, labelsAlign = labelsOptions.align, rtl = legend.options.rtl, borderWidth = options.borderWidth, connectorWidth = options.connectorWidth, posX = mainRange.radius || 0, posY = elementCenter - absoluteRadius -
                    borderWidth / 2 + connectorWidth / 2, crispMovement = (posY % 1 ? 1 : 0.5) -
                    (connectorWidth % 2 ? 0 : 0.5), styledMode = renderer.styledMode;
                let connectorLength = rtl || labelsAlign === 'left' ?
                    -connectorDistance : connectorDistance;
                // Set options for centered labels
                if (labelsAlign === 'center') {
                    connectorLength = 0; // Do not use connector
                    options.connectorDistance = 0;
                    range.labelAttribs.align = 'center';
                }
                // Render bubble symbol
                symbols.bubbleItems.push(renderer
                    .circle(posX, elementCenter + crispMovement, absoluteRadius)
                    .attr(styledMode ? {} : range.bubbleAttribs)
                    .addClass((styledMode ?
                    'highcharts-color-' +
                        bubbleSeries.colorIndex + ' ' :
                    '') +
                    'highcharts-bubble-legend-symbol ' +
                    (options.className || '')).add(this.legendItem.symbol));
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
                    (options.connectorClassName || '')).add(this.legendItem.symbol));
                // Render label
                const label = renderer
                    .text(this.formatLabel(range))
                    .attr((styledMode ? {} : range.labelAttribs))
                    .css(styledMode ? {} : labelsOptions.style)
                    .addClass('highcharts-bubble-legend-labels ' +
                    (options.labels.className || '')).add(this.legendItem.symbol);
                // Now that the label is added we can read the bounding box and
                // vertically align
                const position = {
                    x: posX + connectorLength + options.labels.x,
                    y: posY + options.labels.y + label.getBBox().height * 0.4
                };
                label.attr(position);
                labels.push(label);
                // To enable default 'hideOverlappingLabels' method
                label.placed = true;
                label.alignAttr = position;
            }
            /**
             * Get the label which takes up the most space.
             * @private
             */
            getMaxLabelSize() {
                const labels = this.symbols.labels;
                let maxLabel, labelSize;
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
            }
            /**
             * Get formatted label for range.
             *
             * @private
             *
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             *
             * @return {string}
             *         Range label text
             */
            formatLabel(range) {
                const options = this.options, formatter = options.labels.formatter, format = options.labels.format;
                const { numberFormatter } = this.chart;
                return format ? F.format(format, range) :
                    formatter ? formatter.call(range) :
                        numberFormatter(range.value, 1);
            }
            /**
             * By using default chart 'hideOverlappingLabels' method, hide or show
             * labels and connectors.
             * @private
             */
            hideOverlappingLabels() {
                const chart = this.chart, allowOverlap = this.options.labels.allowOverlap, symbols = this.symbols;
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
            }
            /**
             * Calculate ranges from created series.
             *
             * @private
             *
             * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
             *         Array of range objects
             */
            getRanges() {
                const bubbleLegend = this.legend.bubbleLegend, series = bubbleLegend.chart.series, rangesOptions = bubbleLegend.options.ranges;
                let ranges, zData, minZ = Number.MAX_VALUE, maxZ = -Number.MAX_VALUE;
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
            }
            /**
             * Calculate bubble legend sizes from rendered series.
             *
             * @private
             *
             * @return {Array<number,number>}
             *         Calculated min and max bubble sizes
             */
            predictBubbleSizes() {
                const chart = this.chart, legendOptions = chart.legend.options, floating = legendOptions.floating, horizontal = legendOptions.layout === 'horizontal', lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), minSize = Math.ceil(pxSizes.minPxSize), maxPxSize = Math.ceil(pxSizes.maxPxSize), plotSize = Math.min(plotSizeY, plotSizeX);
                let calculatedSize, maxSize = bubbleSeries.options.maxSize;
                // Calculate predicted max size of bubble
                if (floating || !(/%$/.test(maxSize))) {
                    calculatedSize = maxPxSize;
                }
                else {
                    maxSize = parseFloat(maxSize);
                    calculatedSize = ((plotSize + lastLineHeight) * maxSize / 100) /
                        (maxSize / 100 + 1);
                    // Get maxPxSize from bubble series if calculated bubble legend
                    // size will not affect to bubbles series.
                    if ((horizontal && plotSizeY - calculatedSize >=
                        plotSizeX) || (!horizontal && plotSizeX -
                        calculatedSize >= plotSizeY)) {
                        calculatedSize = maxPxSize;
                    }
                }
                return [minSize, Math.ceil(calculatedSize)];
            }
            /**
             * Correct ranges with calculated sizes.
             * @private
             */
            updateRanges(min, max) {
                const bubbleLegendOptions = this.legend.options.bubbleLegend;
                bubbleLegendOptions.minSize = min;
                bubbleLegendOptions.maxSize = max;
                bubbleLegendOptions.ranges = this.getRanges();
            }
            /**
             * Because of the possibility of creating another legend line, predicted
             * bubble legend sizes may differ by a few pixels, so it is necessary to
             * correct them.
             * @private
             */
            correctSizes() {
                const legend = this.legend, chart = this.chart, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), bubbleSeriesSize = pxSizes.maxPxSize, bubbleLegendSize = this.options.maxSize;
                if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
                    1) {
                    this.updateRanges(this.options.minSize, pxSizes.maxPxSize);
                    legend.render();
                }
            }
        }
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
        ''; // Detach doclets above

        return BubbleLegendItem;
    });
    _registerModule(_modules, 'Series/Bubble/BubbleLegendComposition.js', [_modules['Series/Bubble/BubbleLegendDefaults.js'], _modules['Series/Bubble/BubbleLegendItem.js'], _modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (BubbleLegendDefaults, BubbleLegendItem, D, H, U) {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { composed } = H;
        const { addEvent, objectEach, pushUnique, wrap } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * If ranges are not specified, determine ranges from rendered bubble series
         * and render legend again.
         */
        function chartDrawChartBox(proceed, options, callback) {
            const chart = this, legend = chart.legend, bubbleSeries = getVisibleBubbleSeriesIndex(chart) >= 0;
            let bubbleLegendOptions, bubbleSizes, legendItem;
            if (legend && legend.options.enabled && legend.bubbleLegend &&
                legend.options.bubbleLegend.autoRanges && bubbleSeries) {
                bubbleLegendOptions = legend.bubbleLegend.options;
                bubbleSizes = legend.bubbleLegend.predictBubbleSizes();
                legend.bubbleLegend.updateRanges(bubbleSizes[0], bubbleSizes[1]);
                // Disable animation on init
                if (!bubbleLegendOptions.placed) {
                    legend.group.placed = false;
                    legend.allItems.forEach((item) => {
                        legendItem = item.legendItem || {};
                        if (legendItem.group) {
                            legendItem.group.translateY = void 0;
                        }
                    });
                }
                // Create legend with bubbleLegend
                legend.render();
                // Calculate margins after first rendering the bubble legend
                if (!bubbleLegendOptions.placed) {
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
                    chart.getMargins();
                }
                bubbleLegendOptions.placed = true;
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
         */
        function compose(ChartClass, LegendClass) {
            if (pushUnique(composed, 'Series.BubbleLegend')) {
                setOptions({
                    // Set default bubble legend options
                    legend: {
                        bubbleLegend: BubbleLegendDefaults
                    }
                });
                wrap(ChartClass.prototype, 'drawChartBox', chartDrawChartBox);
                addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
                addEvent(LegendClass, 'itemClick', onLegendItemClick);
            }
        }
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
            const series = chart.series;
            let i = 0;
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
            const items = legend.allItems, lines = [], length = items.length;
            let lastLine, legendItem, legendItem2, i = 0, j = 0;
            for (i = 0; i < length; i++) {
                legendItem = items[i].legendItem || {};
                legendItem2 = (items[i + 1] || {}).legendItem || {};
                if (legendItem.labelHeight) {
                    // For bubbleLegend
                    items[i].itemHeight = legendItem.labelHeight;
                }
                if ( // Line break
                items[i] === items[length - 1] ||
                    legendItem.y !== legendItem2.y) {
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
            const legend = this, bubbleLegend = legend.bubbleLegend, legendOptions = legend.options, options = legendOptions.bubbleLegend, bubbleSeriesIndex = getVisibleBubbleSeriesIndex(legend.chart);
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
        function onLegendItemClick(e) {
            // #14080 don't fire this code if click function is prevented
            if (e.defaultPrevented) {
                return false;
            }
            const legend = this, series = e.legendItem, chart = legend.chart, visible = series.visible;
            let status;
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
            const items = legend.allItems, rtl = legend.options.rtl;
            let orgTranslateX, orgTranslateY, movementX, legendItem, actualLine = 0;
            items.forEach((item, index) => {
                legendItem = item.legendItem || {};
                if (!legendItem.group) {
                    return;
                }
                orgTranslateX = legendItem.group.translateX || 0;
                orgTranslateY = legendItem.y || 0;
                movementX = item.movementX;
                if (movementX || (rtl && item.ranges)) {
                    movementX = rtl ?
                        orgTranslateX - item.options.maxSize / 2 :
                        orgTranslateX + movementX;
                    legendItem.group.attr({ translateX: movementX });
                }
                if (index > lines[actualLine].step) {
                    actualLine++;
                }
                legendItem.group.attr({
                    translateY: Math.round(orgTranslateY + lines[actualLine].height / 2)
                });
                legendItem.y = orgTranslateY + lines[actualLine].height / 2;
            });
        }
        /* *
         *
         *  Default Export
         *
         * */
        const BubbleLegendComposition = {
            compose
        };

        return BubbleLegendComposition;
    });
    _registerModule(_modules, 'Series/Bubble/BubblePoint.js', [_modules['Core/Series/Point.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Point, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes: { scatter: { prototype: { pointClass: ScatterPoint } } } } = SeriesRegistry;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
        class BubblePoint extends ScatterPoint {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            haloPath(size) {
                const computedSize = (size && this.marker ?
                    this.marker.radius ||
                        0 :
                    0) + size;
                if (this.series.chart.inverted) {
                    const pos = this.pos() || [0, 0], { xAxis, yAxis, chart } = this.series;
                    return chart.renderer.symbols.circle(xAxis.len - pos[1] - computedSize, yAxis.len - pos[0] - computedSize, computedSize * 2, computedSize * 2);
                }
                return Point.prototype.haloPath.call(this, 
                // #6067
                computedSize);
            }
        }
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
    _registerModule(_modules, 'Series/Bubble/BubbleSeries.js', [_modules['Series/Bubble/BubbleLegendComposition.js'], _modules['Series/Bubble/BubblePoint.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (BubbleLegendComposition, BubblePoint, Color, H, SeriesRegistry, U) {
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
        const { composed, noop } = H;
        const { series: Series, seriesTypes: { column: { prototype: columnProto }, scatter: ScatterSeries } } = SeriesRegistry;
        const { addEvent, arrayMax, arrayMin, clamp, extend, isNumber, merge, pick, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Add logic to pad each axis with the amount of pixels necessary to avoid the
         * bubbles to overflow.
         */
        function onAxisFoundExtremes() {
            const axisLength = this.len, { coll, isXAxis, min } = this, dataKey = isXAxis ? 'xData' : 'yData', range = (this.max || 0) - (min || 0);
            let pxMin = 0, pxMax = axisLength, transA = axisLength / range, hasActiveSeries;
            if (coll !== 'xAxis' && coll !== 'yAxis') {
                return;
            }
            // Handle padding on the second pass, or on redraw
            this.series.forEach((series) => {
                if (series.bubblePadding && series.reserveSpace()) {
                    // Correction for #1673
                    this.allowZoomOutside = true;
                    hasActiveSeries = true;
                    const data = series[dataKey];
                    if (isXAxis) {
                        (series.onPoint || series).getRadii(0, 0, series);
                        if (series.onPoint) {
                            series.radii = series.onPoint.radii;
                        }
                    }
                    if (range > 0) {
                        let i = data.length;
                        while (i--) {
                            if (isNumber(data[i]) &&
                                this.dataMin <= data[i] &&
                                data[i] <= this.max) {
                                const radius = series.radii && series.radii[i] || 0;
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
                ].forEach((keys) => {
                    if (typeof pick(this.options[keys[0]], this[keys[1]]) === 'undefined') {
                        this[keys[0]] += keys[2] / transA;
                    }
                });
            }
        }
        /* *
         *
         *  Class
         *
         * */
        class BubbleSeries extends ScatterSeries {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(AxisClass, ChartClass, LegendClass) {
                BubbleLegendComposition.compose(ChartClass, LegendClass);
                if (pushUnique(composed, 'Series.Bubble')) {
                    addEvent(AxisClass, 'foundExtremes', onAxisFoundExtremes);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Perform animation on the bubbles
             * @private
             */
            animate(init) {
                if (!init &&
                    this.points.length < this.options.animationLimit // #8099
                ) {
                    this.points.forEach(function (point) {
                        const { graphic, plotX = 0, plotY = 0 } = point;
                        if (graphic && graphic.width) { // URL symbols don't have width
                            // Start values
                            if (!this.hasRendered) {
                                graphic.attr({
                                    x: plotX,
                                    y: plotY,
                                    width: 1,
                                    height: 1
                                });
                            }
                            graphic.animate(this.markerAttribs(point), this.options.animation);
                        }
                    }, this);
                }
            }
            /**
             * Get the radius for each point based on the minSize, maxSize and each
             * point's Z value. This must be done prior to Series.translate because
             * the axis needs to add padding in accordance with the point sizes.
             * @private
             */
            getRadii() {
                const zData = this.zData, yData = this.yData, radii = [];
                let len, i, value, zExtremes = this.chart.bubbleZExtremes;
                const { minPxSize, maxPxSize } = this.getPxExtremes();
                // Get the collective Z extremes of all bubblish series. The chart-level
                // `bubbleZExtremes` are only computed once, and reset on `updatedData`
                // in any member series.
                if (!zExtremes) {
                    let zMin = Number.MAX_VALUE;
                    let zMax = -Number.MAX_VALUE;
                    let valid;
                    this.chart.series.forEach((otherSeries) => {
                        if (otherSeries.bubblePadding && otherSeries.reserveSpace()) {
                            const zExtremes = (otherSeries.onPoint || otherSeries).getZExtremes();
                            if (zExtremes) {
                                // Changed '||' to 'pick' because min or max can be 0.
                                // #17280
                                zMin = Math.min(pick(zMin, zExtremes.zMin), zExtremes.zMin);
                                zMax = Math.max(pick(zMax, zExtremes.zMax), zExtremes.zMax);
                                valid = true;
                            }
                        }
                    });
                    if (valid) {
                        zExtremes = { zMin, zMax };
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
                    radii.push(this.getRadius(zExtremes.zMin, zExtremes.zMax, minPxSize, maxPxSize, value, yData && yData[i]));
                }
                this.radii = radii;
            }
            /**
             * Get the individual radius for one point.
             * @private
             */
            getRadius(zMin, zMax, minSize, maxSize, value, yValue) {
                const options = this.options, sizeByArea = options.sizeBy !== 'width', zThreshold = options.zThreshold;
                let zRange = zMax - zMin, pos = 0.5;
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
            }
            /**
             * Define hasData function for non-cartesian series.
             * Returns true if the series has points at all.
             * @private
             */
            hasData() {
                return !!this.processedXData.length; // != 0
            }
            /**
             * @private
             */
            markerAttribs(point, state) {
                const attr = super.markerAttribs(point, state), { height = 0, width = 0 } = attr;
                // Bubble needs a specific `markerAttribs` override because the markers
                // are rendered into the potentially inverted `series.group`. Unlike
                // regular markers, which are rendered into the `markerGroup` (#21125).
                return this.chart.inverted ? extend(attr, {
                    x: (point.plotX || 0) - width / 2,
                    y: (point.plotY || 0) - height / 2
                }) : attr;
            }
            /**
             * @private
             */
            pointAttribs(point, state) {
                const markerOptions = this.options.marker, fillOpacity = markerOptions.fillOpacity, attr = Series.prototype.pointAttribs.call(this, point, state);
                if (fillOpacity !== 1) {
                    attr.fill = color(attr.fill)
                        .setOpacity(fillOpacity)
                        .get('rgba');
                }
                return attr;
            }
            /**
             * Extend the base translate method to handle bubble size
             * @private
             */
            translate() {
                // Run the parent method
                super.translate.call(this);
                this.getRadii();
                this.translateBubble();
            }
            translateBubble() {
                const { data, options, radii } = this, { minPxSize } = this.getPxExtremes();
                // Set the shape type and arguments to be picked up in drawPoints
                let i = data.length;
                while (i--) {
                    const point = data[i], radius = radii ? radii[i] : 0; // #1737
                    // Negative points means negative z values (#9728)
                    if (this.zoneAxis === 'z') {
                        point.negative = (point.z || 0) < (options.zThreshold || 0);
                    }
                    if (isNumber(radius) && radius >= minPxSize / 2) {
                        // Shape arguments
                        point.marker = extend(point.marker, {
                            radius,
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
                    else { // Below zThreshold
                        // #1691
                        point.shapeArgs = point.plotY = point.dlBox = void 0;
                        point.isInside = false; // #17281
                    }
                }
            }
            getPxExtremes() {
                const smallestSize = Math.min(this.chart.plotWidth, this.chart.plotHeight);
                const getPxSize = (length) => {
                    let isPercent;
                    if (typeof length === 'string') {
                        isPercent = /%$/.test(length);
                        length = parseInt(length, 10);
                    }
                    return isPercent ? smallestSize * length / 100 : length;
                };
                const minPxSize = getPxSize(pick(this.options.minSize, 8));
                // Prioritize min size if conflict to make sure bubbles are
                // always visible. #5873
                const maxPxSize = Math.max(getPxSize(pick(this.options.maxSize, '20%')), minPxSize);
                return { minPxSize, maxPxSize };
            }
            getZExtremes() {
                const options = this.options, zData = (this.zData || []).filter(isNumber);
                if (zData.length) {
                    const zMin = pick(options.zMin, clamp(arrayMin(zData), options.displayNegative === false ?
                        (options.zThreshold || 0) :
                        -Number.MAX_VALUE, Number.MAX_VALUE));
                    const zMax = pick(options.zMax, arrayMax(zData));
                    if (isNumber(zMin) && isNumber(zMax)) {
                        return { zMin, zMax };
                    }
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
                    const { numberFormatter } = this.series.chart;
                    const { z } = this.point;
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
                lineColor: null, // Inherit from series.color
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
        extend(BubbleSeries.prototype, {
            alignDataLabel: columnProto.alignDataLabel,
            applyZones: noop,
            bubblePadding: true,
            isBubble: true,
            pointArrayMap: ['y', 'z'],
            pointClass: BubblePoint,
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['group', 'dataLabelsGroup'],
            specialGroup: 'group', // To allow clipping (#6296)
            zoneAxis: 'z'
        });
        // On updated data in any series, delete the chart-level Z extremes cache
        addEvent(BubbleSeries, 'updatedData', (e) => {
            delete e.target.chart.bubbleZExtremes;
        });
        // After removing series, delete the chart-level Z extremes cache, #17502.
        addEvent(BubbleSeries, 'remove', (e) => {
            delete e.target.chart.bubbleZExtremes;
        });
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
        ''; // Detach doclets above
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
        ''; // Adds doclets above to transpiled file

        return BubbleSeries;
    });
    _registerModule(_modules, 'Series/MapBubble/MapBubblePoint.js', [_modules['Series/Bubble/BubblePoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (BubblePoint, SeriesRegistry, U) {
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
         *  Imports
         *
         * */
        const { seriesTypes: { map: { prototype: { pointClass: { prototype: mapPointProto } } } } } = SeriesRegistry;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
        class MapBubblePoint extends BubblePoint {
            /* *
             *
             *  Functions
             *
             * */
            isValid() {
                return typeof this.z === 'number';
            }
        }
        extend(MapBubblePoint.prototype, {
            applyOptions: mapPointProto.applyOptions,
            getProjectedBounds: mapPointProto.getProjectedBounds
        });
        /* *
         *
         *  Default Export
         *
         * */

        return MapBubblePoint;
    });
    _registerModule(_modules, 'Series/MapBubble/MapBubbleSeries.js', [_modules['Series/Bubble/BubbleSeries.js'], _modules['Series/MapBubble/MapBubblePoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (BubbleSeries, MapBubblePoint, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes: { map: { prototype: mapProto }, mappoint: { prototype: mapPointProto } } } = SeriesRegistry;
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.mapbubble
         *
         * @augments Highcharts.Series
         *
         * @requires BubbleSeries
         * @requires MapPointSeries
         */
        class MapBubbleSeries extends BubbleSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.clearBounds = mapProto.clearBounds;
            }
            searchPoint(e, compareX) {
                return this.searchKDTree({
                    plotX: e.chartX - this.chart.plotLeft,
                    plotY: e.chartY - this.chart.plotTop
                }, compareX, e);
            }
            translate() {
                mapPointProto.translate.call(this);
                this.getRadii();
                this.translateBubble();
            }
            updateParallelArrays(point, i, iArgs) {
                super.updateParallelArrays.call(this, point, i, iArgs);
                const processedXData = this.processedXData, xData = this.xData;
                if (processedXData && xData) {
                    processedXData.length = xData.length;
                }
            }
        }
        /**
         * A map bubble series is a bubble series laid out on top of a map
         * series, where each bubble is tied to a specific map area.
         *
         * @sample maps/demo/map-bubble/
         *         Map bubble chart
         *
         * @extends      plotOptions.bubble
         * @product      highmaps
         * @optionparent plotOptions.mapbubble
         */
        MapBubbleSeries.defaultOptions = merge(BubbleSeries.defaultOptions, {
            /**
             * The main color of the series. This color affects both the fill
             * and the stroke of the bubble. For enhanced control, use `marker`
             * options.
             *
             * @sample {highmaps} maps/plotoptions/mapbubble-color/
             *         Pink bubbles
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption plotOptions.mapbubble.color
             */
            /**
             * Whether to display negative sized bubbles. The threshold is
             * given by the [zThreshold](#plotOptions.mapbubble.zThreshold)
             * option, and negative bubbles can be visualized by setting
             * [negativeColor](#plotOptions.bubble.negativeColor).
             *
             * @type      {boolean}
             * @default   true
             * @apioption plotOptions.mapbubble.displayNegative
             */
            /**
             * Color of the line connecting bubbles. The default value is the same
             * as series' color.
             *
             * In styled mode, the color can be defined by the
             * [colorIndex](#plotOptions.series.colorIndex) option. Also, the series
             * color can be set with the `.highcharts-series`,
             * `.highcharts-color-{n}`, `.highcharts-{type}-series` or
             * `.highcharts-series-{n}` class, or individual classes given by the
             * `className` option.
             *
             *
             * @sample {highmaps} maps/demo/spider-map/
             *         Spider map
             * @sample {highmaps} maps/plotoptions/spider-map-line-color/
             *         Different line color
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption plotOptions.mapbubble.lineColor
             */
            /**
             * Pixel width of the line connecting bubbles.
             *
             * @sample {highmaps} maps/demo/spider-map/
             *         Spider map
             *
             * @product   highmaps
             * @apioption plotOptions.mapbubble.lineWidth
             */
            lineWidth: 0,
            /**
             * Maximum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             *
             * @sample {highmaps} highcharts/plotoptions/bubble-size/
             *         Bubble size
             * @sample {highmaps} maps/demo/spider-map/
             *         Spider map
             *
             * @product   highmaps
             * @apioption plotOptions.mapbubble.maxSize
             */
            /**
             * Minimum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             *
             * @sample {highmaps} maps/demo/map-bubble/
             *         Bubble size
             * @sample {highmaps} maps/demo/spider-map/
             *         Spider map
             *
             * @product   highmaps
             * @apioption plotOptions.mapbubble.minSize
             */
            /**
             * When a point's Z value is below the
             * [zThreshold](#plotOptions.mapbubble.zThreshold) setting, this
             * color is used.
             *
             * @sample {highmaps} maps/plotoptions/mapbubble-negativecolor/
             *         Negative color below a threshold
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption plotOptions.mapbubble.negativeColor
             */
            /**
             * Whether the bubble's value should be represented by the area or
             * the width of the bubble. The default, `area`, corresponds best to
             * the human perception of the size of each bubble.
             *
             * @type       {Highcharts.BubbleSizeByValue}
             * @default    area
             * @apioption  plotOptions.mapbubble.sizeBy
             */
            /**
             * When this is true, the absolute value of z determines the size
             * of the bubble. This means that with the default `zThreshold` of
             * 0, a bubble of value -1 will have the same size as a bubble of
             * value 1, while a bubble of value 0 will have a smaller size
             * according to `minSize`.
             *
             * @sample {highmaps} highcharts/plotoptions/bubble-sizebyabsolutevalue/
             *         Size by absolute value, various thresholds
             *
             * @type      {boolean}
             * @default   false
             * @since     1.1.9
             * @apioption plotOptions.mapbubble.sizeByAbsoluteValue
             */
            /**
             * The maximum for the Z value range. Defaults to the highest Z value in
             * the data.
             *
             * @see [zMin](#plotOptions.mapbubble.zMin)
             *
             * @sample {highmaps} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             *
             * @type      {number}
             * @since     1.0.3
             * @apioption plotOptions.mapbubble.zMax
             */
            /**
             * The minimum for the Z value range. Defaults to the lowest Z value
             * in the data.
             *
             * @see [zMax](#plotOptions.mapbubble.zMax)
             *
             * @sample {highmaps} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             *
             * @type      {number}
             * @since     1.0.3
             * @apioption plotOptions.mapbubble.zMin
             */
            /**
             * When [displayNegative](#plotOptions.mapbubble.displayNegative)
             * is `false`, bubbles with lower Z values are skipped. When
             * `displayNegative` is `true` and a
             * [negativeColor](#plotOptions.mapbubble.negativeColor) is given,
             * points with lower Z is colored.
             *
             * @sample {highmaps} maps/plotoptions/mapbubble-negativecolor/
             *         Negative color below a threshold
             *
             * @type      {number}
             * @default   0
             * @apioption plotOptions.mapbubble.zThreshold
             */
            /**
             * @default 500
             */
            animationLimit: 500,
            /**
             * @type {string|Array<string>}
             */
            joinBy: 'hc-key',
            tooltip: {
                pointFormat: '{point.name}: {point.z}'
            }
        });
        extend(MapBubbleSeries.prototype, {
            type: 'mapbubble',
            axisTypes: ['colorAxis'],
            getProjectedBounds: mapProto.getProjectedBounds,
            isCartesian: false,
            // If one single value is passed, it is interpreted as z
            pointArrayMap: ['z'],
            pointClass: MapBubblePoint,
            processData: mapProto.processData,
            projectPoint: mapPointProto.projectPoint,
            kdAxisArray: ['plotX', 'plotY'],
            setData: mapProto.setData,
            setOptions: mapProto.setOptions,
            updateData: mapProto.updateData,
            useMapGeometry: true,
            xyFromShape: true
        });
        SeriesRegistry.registerSeriesType('mapbubble', MapBubbleSeries);
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
         * A `mapbubble` series. If the [type](#series.mapbubble.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.mapbubble
         * @excluding dataParser, dataURL
         * @product   highmaps
         * @apioption series.mapbubble
         */
        /**
         * An array of data points for the series. For the `mapbubble` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values
         *    will be interpreted as `z` options. Example:
         *
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.mapbubble.turboThreshold),
         *    this option is not available.
         *
         *    ```js
         *        data: [{
         *            z: 9,
         *            name: "Point2",
         *            color: "#00FF00"
         *        }, {
         *            z: 10,
         *            name: "Point1",
         *            color: "#FF00FF"
         *        }]
         *    ```
         *
         * @type      {Array<number|null|*>}
         * @extends   series.mappoint.data
         * @excluding labelrank, middleX, middleY, path, value, x, y, lat, lon
         * @product   highmaps
         * @apioption series.mapbubble.data
         */
        /**
         * While the `x` and `y` values of the bubble are determined by the
         * underlying map, the `z` indicates the actual value that gives the
         * size of the bubble.
         *
         * @sample {highmaps} maps/demo/map-bubble/
         *         Bubble
         *
         * @type      {number|null}
         * @product   highmaps
         * @apioption series.mapbubble.data.z
         */
        /**
         * @excluding enabled, enabledThreshold, height, radius, width
         * @sample {highmaps} maps/plotoptions/mapbubble-symbol
         *         Map bubble with mapmarker symbol
         * @apioption series.mapbubble.marker
         */
        ''; // Adds doclets above to transpiled file

        return MapBubbleSeries;
    });
    _registerModule(_modules, 'Series/Heatmap/HeatmapPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { scatter: { prototype: { pointClass: ScatterPoint } } } = SeriesRegistry.seriesTypes;
        const { clamp, defined, extend, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        class HeatmapPoint extends ScatterPoint {
            /* *
             *
             *  Functions
             *
             * */
            /** @private */
            applyOptions(options, x) {
                // #17970, if point is null remove its color, because it may be updated
                if (this.isNull || this.value === null) {
                    delete this.color;
                }
                super.applyOptions(options, x);
                this.formatPrefix = this.isNull || this.value === null ?
                    'null' : 'point';
                return this;
            }
            /** @private */
            getCellAttributes() {
                const point = this, series = point.series, seriesOptions = series.options, xPad = (seriesOptions.colsize || 1) / 2, yPad = (seriesOptions.rowsize || 1) / 2, xAxis = series.xAxis, yAxis = series.yAxis, markerOptions = point.options.marker || series.options.marker, pointPlacement = series.pointPlacementToXValue(), // #7860
                pointPadding = pick(point.pointPadding, seriesOptions.pointPadding, 0), cellAttr = {
                    x1: clamp(Math.round(xAxis.len -
                        xAxis.translate(point.x - xPad, false, true, false, true, -pointPlacement)), -xAxis.len, 2 * xAxis.len),
                    x2: clamp(Math.round(xAxis.len -
                        xAxis.translate(point.x + xPad, false, true, false, true, -pointPlacement)), -xAxis.len, 2 * xAxis.len),
                    y1: clamp(Math.round(yAxis.translate(point.y - yPad, false, true, false, true)), -yAxis.len, 2 * yAxis.len),
                    y2: clamp(Math.round(yAxis.translate(point.y + yPad, false, true, false, true)), -yAxis.len, 2 * yAxis.len)
                };
                const dimensions = [['width', 'x'], ['height', 'y']];
                // Handle marker's fixed width, and height values including border
                // and pointPadding while calculating cell attributes.
                for (const dimension of dimensions) {
                    const prop = dimension[0], direction = dimension[1];
                    let start = direction + '1', end = direction + '2';
                    const side = Math.abs(cellAttr[start] - cellAttr[end]), borderWidth = markerOptions &&
                        markerOptions.lineWidth || 0, plotPos = Math.abs(cellAttr[start] + cellAttr[end]) / 2, widthOrHeight = markerOptions && markerOptions[prop];
                    if (defined(widthOrHeight) && widthOrHeight < side) {
                        const halfCellSize = widthOrHeight / 2 + borderWidth / 2;
                        cellAttr[start] = plotPos - halfCellSize;
                        cellAttr[end] = plotPos + halfCellSize;
                    }
                    // Handle pointPadding
                    if (pointPadding) {
                        if ((direction === 'x' && xAxis.reversed) ||
                            (direction === 'y' && !yAxis.reversed)) {
                            start = end;
                            end = direction + '1';
                        }
                        cellAttr[start] += pointPadding;
                        cellAttr[end] -= pointPadding;
                    }
                }
                return cellAttr;
            }
            /**
             * @private
             */
            haloPath(size) {
                if (!size) {
                    return [];
                }
                const { x = 0, y = 0, width = 0, height = 0 } = this.shapeArgs || {};
                return [
                    ['M', x - size, y - size],
                    ['L', x - size, y + height + size],
                    ['L', x + width + size, y + height + size],
                    ['L', x + width + size, y - size],
                    ['Z']
                ];
            }
            /**
             * Color points have a value option that determines whether or not it is
             * a null point
             * @private
             */
            isValid() {
                // Undefined is allowed
                return (this.value !== Infinity &&
                    this.value !== -Infinity);
            }
        }
        extend(HeatmapPoint.prototype, {
            dataLabelOnNull: true,
            moveToTopOnHover: true,
            ttBelow: false
        });
        /* *
         *
         *  Default Export
         *
         * */

        return HeatmapPoint;
    });
    _registerModule(_modules, 'Series/Heatmap/HeatmapSeriesDefaults.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isNumber } = U;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A heatmap is a graphical representation of data where the individual
         * values contained in a matrix are represented as colors.
         *
         * @productdesc {highcharts}
         * Requires `modules/heatmap`.
         *
         * @sample highcharts/demo/heatmap/
         *         Simple heatmap
         * @sample highcharts/demo/heatmap-canvas/
         *         Heavy heatmap
         *
         * @extends      plotOptions.scatter
         * @excluding    animationLimit, connectEnds, connectNulls, cropThreshold,
         *               dashStyle, findNearestPointBy, getExtremesFromAll, jitter,
         *               linecap, lineWidth, pointInterval, pointIntervalUnit,
         *               pointRange, pointStart, shadow, softThreshold, stacking,
         *               step, threshold, cluster, dragDrop
         * @product      highcharts highmaps
         * @optionparent plotOptions.heatmap
         */
        const HeatmapSeriesDefaults = {
            /**
             * Animation is disabled by default on the heatmap series.
             */
            animation: false,
            /**
             * The border radius for each heatmap item. The border's color and
             * width can be set in marker options.
             *
             * @see [lineColor](#plotOptions.heatmap.marker.lineColor)
             * @see [lineWidth](#plotOptions.heatmap.marker.lineWidth)
             */
            borderRadius: 0,
            /**
             * The border width for each heatmap item.
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
             * @default   value
             * @apioption plotOptions.heatmap.colorKey
             */
            /**
             * The main color of the series. In heat maps this color is rarely used,
             * as we mostly use the color to denote the value of each point. Unless
             * options are set in the [colorAxis](#colorAxis), the default value
             * is pulled from the [options.colors](#colors) array.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
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
             * Make the heatmap render its data points as an interpolated image.
             *
             * @sample highcharts/demo/heatmap-interpolation
             *   Interpolated heatmap image displaying user activity on a website
             * @sample highcharts/series-heatmap/interpolation
             *   Interpolated heatmap toggle
             *
             */
            interpolation: false,
            /**
             * The color applied to null points. In styled mode, a general CSS class
             * is applied instead.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            nullColor: "#f7f7f7" /* Palette.neutralColor3 */,
            dataLabels: {
                formatter: function () {
                    const { numberFormatter } = this.series.chart;
                    const { value } = this.point;
                    return isNumber(value) ? numberFormatter(value, -1) : '';
                },
                inside: true,
                verticalAlign: 'middle',
                crop: false,
                /**
                 * @ignore-option
                 */
                overflow: 'allow',
                padding: 0 // #3837
            },
            /**
             * @excluding radius, enabledThreshold
             * @since     8.1
             */
            marker: {
                /**
                 * A predefined shape or symbol for the marker. When undefined, the
                 * symbol is pulled from options.symbols. Other possible values are
                 * `'circle'`, `'square'`,`'diamond'`, `'triangle'`,
                 * `'triangle-down'`, `'rect'`, and `'ellipse'`.
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
                 */
                symbol: 'rect',
                /** @ignore-option */
                radius: 0,
                lineColor: void 0,
                states: {
                    /**
                     * @excluding radius, radiusPlus
                     */
                    hover: {
                        /**
                         * Set the marker's fixed width on hover state.
                         *
                         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
                         *         70px fixed marker's width and height on hover
                         *
                         * @type      {number|undefined}
                         * @default   undefined
                         * @product   highcharts highmaps
                         * @apioption plotOptions.heatmap.marker.states.hover.width
                         */
                        /**
                         * Set the marker's fixed height on hover state.
                         *
                         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
                         *         70px fixed marker's width and height on hover
                         *
                         * @type      {number|undefined}
                         * @default   undefined
                         * @product   highcharts highmaps
                         * @apioption plotOptions.heatmap.marker.states.hover.height
                         */
                        /**
                         * The number of pixels to increase the width of the
                         * selected point.
                         *
                         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
                         *         20px greater width and height on hover
                         *
                         * @type      {number|undefined}
                         * @default   undefined
                         * @product   highcharts highmaps
                         * @apioption plotOptions.heatmap.marker.states.hover.widthPlus
                         */
                        /**
                         * The number of pixels to increase the height of the
                         * selected point.
                         *
                         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
                        *          20px greater width and height on hover
                            *
                            * @type      {number|undefined}
                            * @default   undefined
                            * @product   highcharts highmaps
                            * @apioption plotOptions.heatmap.marker.states.hover.heightPlus
                            */
                        /**
                         * The additional line width for a hovered point.
                         *
                         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-linewidthplus
                         *         5 pixels wider lineWidth on hover
                         * @sample {highmaps} maps/plotoptions/heatmap-marker-states-hover-linewidthplus
                         *         5 pixels wider lineWidth on hover
                         */
                        lineWidthPlus: 0
                    },
                    /**
                     * @excluding radius
                     */
                    select: {
                    /**
                     * Set the marker's fixed width on select state.
                     *
                     * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
                     *         70px fixed marker's width and height on hover
                     *
                     * @type      {number|undefined}
                     * @default   undefined
                     * @product   highcharts highmaps
                     * @apioption plotOptions.heatmap.marker.states.select.width
                     */
                    /**
                     * Set the marker's fixed height on select state.
                     *
                     * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
                     *         70px fixed marker's width and height on hover
                     *
                     * @type      {number|undefined}
                     * @default   undefined
                     * @product   highcharts highmaps
                     * @apioption plotOptions.heatmap.marker.states.select.height
                     */
                    /**
                     * The number of pixels to increase the width of the
                     * selected point.
                     *
                     * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
                     *         20px greater width and height on hover
                     *
                     * @type      {number|undefined}
                     * @default   undefined
                     * @product   highcharts highmaps
                     * @apioption plotOptions.heatmap.marker.states.select.widthPlus
                     */
                    /**
                     * The number of pixels to increase the height of the
                     * selected point.
                     *
                     * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
                     *         20px greater width and height on hover
                     *
                     * @type      {number|undefined}
                     * @default   undefined
                     * @product   highcharts highmaps
                     * @apioption plotOptions.heatmap.marker.states.select.heightPlus
                     */
                    }
                }
            },
            clip: true,
            /** @ignore-option */
            pointRange: null, // Dynamically set to colsize by default
            tooltip: {
                pointFormat: '{point.x}, {point.y}: {point.value}<br/>'
            },
            states: {
                hover: {
                    /** @ignore-option */
                    halo: false, // #3406, halo is disabled on heatmaps by default
                    /**
                     * How much to brighten the point on interaction. Requires the
                     * main color to be defined in hex or rgb(a) format.
                     *
                     * In styled mode, the hover brightening is by default replaced
                     * with a fill-opacity set in the `.highcharts-point:hover`
                     * rule.
                     */
                    brightness: 0.2
                }
            },
            legendSymbol: 'rectangle'
        };
        /**
         * A `heatmap` series. If the [type](#series.heatmap.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @productdesc {highcharts}
         * Requires `modules/heatmap`.
         *
         * @extends   series,plotOptions.heatmap
         * @excluding cropThreshold, dataParser, dataURL, dragDrop ,pointRange, stack,
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
         * @product   highcharts highmaps
         * @apioption series.heatmap.data
         */
        /**
         * The color of the point. In heat maps the point color is rarely set
         * explicitly, as we use the color to denote the `value`. Options for
         * this are set in the [colorAxis](#colorAxis) configuration.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.color
         */
        /**
         * The value of the point, resulting in a color controlled by options
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
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.pointPadding
         */
        /**
         * @excluding radius, enabledThreshold
         * @product   highcharts highmaps
         * @since     8.1
         * @apioption series.heatmap.data.marker
         */
        /**
         * @excluding radius, enabledThreshold
         * @product   highcharts highmaps
         * @since     8.1
         * @apioption series.heatmap.marker
         */
        /**
         * @excluding radius, radiusPlus
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.hover
         */
        /**
         * @excluding radius
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.select
         */
        /**
         * @excluding radius, radiusPlus
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.marker.states.hover
         */
        /**
         * @excluding radius
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.marker.states.select
         */
        /**
        * Set the marker's fixed width on hover state.
        *
        * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-linewidthplus
        *         5 pixels wider lineWidth on hover
        *
        * @type      {number|undefined}
        * @default   0
        * @product   highcharts highmaps
        * @apioption series.heatmap.marker.states.hover.lineWidthPlus
        */
        /**
        * Set the marker's fixed width on hover state.
        *
        * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
        *         70px fixed marker's width and height on hover
        *
        * @type      {number|undefined}
        * @default   undefined
        * @product   highcharts highmaps
        * @apioption series.heatmap.marker.states.hover.width
        */
        /**
         * Set the marker's fixed height on hover state.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
         *         70px fixed marker's width and height on hover
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.hover.height
         */
        /**
        * The number of pixels to increase the width of the
        * hovered point.
        *
        * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
        *         One day
        *
        * @type      {number|undefined}
        * @default   undefined
        * @product   highcharts highmaps
        * @apioption series.heatmap.marker.states.hover.widthPlus
        */
        /**
         * The number of pixels to increase the height of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.hover.heightPlus
         */
        /**
         * The number of pixels to increase the width of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.select.widthPlus
         */
        /**
         * The number of pixels to increase the height of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.marker.states.select.heightPlus
         */
        /**
        * Set the marker's fixed width on hover state.
        *
        * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-linewidthplus
        *         5 pixels wider lineWidth on hover
        *
        * @type      {number|undefined}
        * @default   0
        * @product   highcharts highmaps
        * @apioption series.heatmap.data.marker.states.hover.lineWidthPlus
        */
        /**
         * Set the marker's fixed width on hover state.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
         *         70px fixed marker's width and height on hover
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.marker.states.hover.width
         */
        /**
         * Set the marker's fixed height on hover state.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
         *         70px fixed marker's width and height on hover
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.marker.states.hover.height
         */
        /**
         * The number of pixels to increase the width of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highstock
         * @apioption series.heatmap.data.marker.states.hover.widthPlus
         */
        /**
         * The number of pixels to increase the height of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highstock
         * @apioption series.heatmap.data.marker.states.hover.heightPlus
         */
        /**
        * Set the marker's fixed width on select state.
        *
        * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
        *         70px fixed marker's width and height on hover
        *
        * @type      {number|undefined}
        * @default   undefined
        * @product   highcharts highmaps
        * @apioption series.heatmap.data.marker.states.select.width
        */
        /**
         * Set the marker's fixed height on select state.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-width
         *         70px fixed marker's width and height on hover
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highmaps
         * @apioption series.heatmap.data.marker.states.select.height
         */
        /**
         * The number of pixels to increase the width of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highstock
         * @apioption series.heatmap.data.marker.states.select.widthPlus
         */
        /**
         * The number of pixels to increase the height of the
         * hovered point.
         *
         * @sample {highcharts} maps/plotoptions/heatmap-marker-states-hover-widthplus
         *         One day
         *
         * @type      {number|undefined}
         * @default   undefined
         * @product   highcharts highstock
         * @apioption series.heatmap.data.marker.states.select.heightPlus
         */
        ''; // Keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return HeatmapSeriesDefaults;
    });
    _registerModule(_modules, 'Series/InterpolationUtilities.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Hubert Kozik
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { defined, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Find color of point based on color axis.
         *
         * @function Highcharts.colorFromPoint
         *
         * @param {number | null} value
         *        Value to find corresponding color on the color axis.
         *
         * @param {Highcharts.Point} point
         *        Point to find it's color from color axis.
         *
         * @return {number[]}
         *        Color in RGBa array.
         */
        function colorFromPoint(value, point) {
            const colorAxis = point.series.colorAxis;
            if (colorAxis) {
                const rgba = (colorAxis.toColor(value || 0, point)
                    .split(')')[0]
                    .split('(')[1]
                    .split(',')
                    .map((s) => pick(parseFloat(s), parseInt(s, 10))));
                rgba[3] = pick(rgba[3], 1.0) * 255;
                if (!defined(value) || !point.visible) {
                    rgba[3] = 0;
                }
                return rgba;
            }
            return [0, 0, 0, 0];
        }
        /**
         * Method responsible for creating a canvas for interpolation image.
         * @private
         */
        function getContext(series) {
            const { canvas, context } = series;
            if (canvas && context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            else {
                series.canvas = doc.createElement('canvas');
                series.context = series.canvas.getContext('2d', {
                    willReadFrequently: true
                }) || void 0;
                return series.context;
            }
            return context;
        }
        const InterpolationUtilities = {
            colorFromPoint,
            getContext
        };

        return InterpolationUtilities;
    });
    _registerModule(_modules, 'Series/Heatmap/HeatmapSeries.js', [_modules['Core/Color/Color.js'], _modules['Series/ColorMapComposition.js'], _modules['Series/Heatmap/HeatmapPoint.js'], _modules['Series/Heatmap/HeatmapSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js'], _modules['Series/InterpolationUtilities.js']], function (Color, ColorMapComposition, HeatmapPoint, HeatmapSeriesDefaults, SeriesRegistry, SVGRenderer, U, IU) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: Series, seriesTypes: { column: ColumnSeries, scatter: ScatterSeries } } = SeriesRegistry;
        const { prototype: { symbols } } = SVGRenderer;
        const { addEvent, extend, fireEvent, isNumber, merge, pick } = U;
        const { colorFromPoint, getContext } = IU;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.heatmap
         *
         * @augments Highcharts.Series
         */
        class HeatmapSeries extends ScatterSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.valueMax = NaN;
                this.valueMin = NaN;
                this.isDirtyCanvas = true;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            drawPoints() {
                const series = this, seriesOptions = series.options, interpolation = seriesOptions.interpolation, seriesMarkerOptions = seriesOptions.marker || {};
                if (interpolation) {
                    const { image, chart, xAxis, yAxis } = series, { reversed: xRev = false, len: width } = xAxis, { reversed: yRev = false, len: height } = yAxis, dimensions = { width, height };
                    if (!image || series.isDirtyData || series.isDirtyCanvas) {
                        const ctx = getContext(series), { canvas, options: { colsize = 1, rowsize = 1 }, points, points: { length } } = series, pointsLen = length - 1, colorAxis = (chart.colorAxis && chart.colorAxis[0]);
                        if (canvas && ctx && colorAxis) {
                            const { min: xMin, max: xMax } = xAxis.getExtremes(), { min: yMin, max: yMax } = yAxis.getExtremes(), xDelta = xMax - xMin, yDelta = yMax - yMin, imgMultiple = 8.0, lastX = Math.round(imgMultiple * ((xDelta / colsize) / imgMultiple)), lastY = Math.round(imgMultiple * ((yDelta / rowsize) / imgMultiple)), [transformX, transformY] = [
                                [lastX, lastX / xDelta, xRev, 'ceil'],
                                [lastY, lastY / yDelta, !yRev, 'floor']
                            ].map(([last, scale, rev, rounding]) => (rev ?
                                (v) => (Math[rounding](last -
                                    (scale * (v)))) :
                                (v) => (Math[rounding](scale * v)))), canvasWidth = canvas.width = lastX + 1, canvasHeight = canvas.height = lastY + 1, canvasArea = canvasWidth * canvasHeight, pixelToPointScale = pointsLen / canvasArea, pixelData = new Uint8ClampedArray(canvasArea * 4), pointInPixels = (x, y) => (Math.ceil((canvasWidth * transformY(y - yMin)) +
                                transformX(x - xMin)) * 4);
                            series.buildKDTree();
                            for (let i = 0; i < canvasArea; i++) {
                                const point = points[Math.ceil(pixelToPointScale * i)], { x, y } = point;
                                pixelData.set(colorFromPoint(point.value, point), pointInPixels(x, y));
                            }
                            ctx.putImageData(new ImageData(pixelData, canvasWidth), 0, 0);
                            if (image) {
                                image.attr({
                                    ...dimensions,
                                    href: canvas.toDataURL('image/png', 1)
                                });
                            }
                            else {
                                series.directTouch = false;
                                series.image = chart.renderer.image(canvas.toDataURL('image/png', 1))
                                    .attr(dimensions)
                                    .add(series.group);
                            }
                        }
                        series.isDirtyCanvas = false;
                    }
                    else if (image.width !== width || image.height !== height) {
                        image.attr(dimensions);
                    }
                }
                else if (seriesMarkerOptions.enabled || series._hasPointMarkers) {
                    Series.prototype.drawPoints.call(series);
                    series.points.forEach((point) => {
                        if (point.graphic) {
                            // In styled mode, use CSS, otherwise the fill used in
                            // the style sheet will take precedence over
                            // the fill attribute.
                            point.graphic[series.chart.styledMode ? 'css' : 'animate'](series.colorAttribs(point));
                            if (point.value === null) { // #15708
                                point.graphic.addClass('highcharts-null-point');
                            }
                        }
                    });
                }
            }
            /**
             * @private
             */
            getExtremes() {
                // Get the extremes from the value data
                const { dataMin, dataMax } = Series.prototype.getExtremes
                    .call(this, this.valueData);
                if (isNumber(dataMin)) {
                    this.valueMin = dataMin;
                }
                if (isNumber(dataMax)) {
                    this.valueMax = dataMax;
                }
                // Get the extremes from the y data
                return Series.prototype.getExtremes.call(this);
            }
            /**
             * Override to also allow null points, used when building the k-d-tree for
             * tooltips in boost mode.
             * @private
             */
            getValidPoints(points, insideOnly) {
                return Series.prototype.getValidPoints.call(this, points, insideOnly, true);
            }
            /**
             * Define hasData function for non-cartesian series. Returns true if the
             * series has points at all.
             * @private
             */
            hasData() {
                return !!this.xData; // != 0
            }
            /**
             * Override the init method to add point ranges on both axes.
             * @private
             */
            init() {
                super.init.apply(this, arguments);
                const options = this.options;
                // #3758, prevent resetting in setData
                options.pointRange = pick(options.pointRange, options.colsize || 1);
                // General point range
                this.yAxis.axisPointRange = options.rowsize || 1;
                // Bind new symbol names
                symbols.ellipse = symbols.circle;
                // @todo
                //
                // Setting the border radius here is a workaround. It should be set in
                // the shapeArgs or returned from `markerAttribs`. However,
                // Series.drawPoints does not pick up markerAttribs to be passed over to
                // `renderer.symbol`. Also, image symbols are not positioned by their
                // top left corner like other symbols are. This should be refactored,
                // then we could save ourselves some tests for .hasImage etc. And the
                // evaluation of borderRadius would be moved to `markerAttribs`.
                if (options.marker && isNumber(options.borderRadius)) {
                    options.marker.r = options.borderRadius;
                }
            }
            /**
             * @private
             */
            markerAttribs(point, state) {
                const shapeArgs = point.shapeArgs || {};
                if (point.hasImage) {
                    return {
                        x: point.plotX,
                        y: point.plotY
                    };
                }
                // Setting width and height attributes on image does not affect on its
                // dimensions.
                if (state && state !== 'normal') {
                    const pointMarkerOptions = point.options.marker || {}, seriesMarkerOptions = this.options.marker || {}, seriesStateOptions = (seriesMarkerOptions.states &&
                        seriesMarkerOptions.states[state]) || {}, pointStateOptions = (pointMarkerOptions.states &&
                        pointMarkerOptions.states[state]) || {};
                    // Set new width and height basing on state options.
                    const width = (pointStateOptions.width ||
                        seriesStateOptions.width ||
                        shapeArgs.width ||
                        0) + (pointStateOptions.widthPlus ||
                        seriesStateOptions.widthPlus ||
                        0);
                    const height = (pointStateOptions.height ||
                        seriesStateOptions.height ||
                        shapeArgs.height ||
                        0) + (pointStateOptions.heightPlus ||
                        seriesStateOptions.heightPlus ||
                        0);
                    // Align marker by the new size.
                    const x = (shapeArgs.x || 0) + ((shapeArgs.width || 0) - width) / 2, y = (shapeArgs.y || 0) + ((shapeArgs.height || 0) - height) / 2;
                    return { x, y, width, height };
                }
                return shapeArgs;
            }
            /**
             * @private
             */
            pointAttribs(point, state) {
                const series = this, attr = Series.prototype.pointAttribs.call(series, point, state), seriesOptions = series.options || {}, plotOptions = series.chart.options.plotOptions || {}, seriesPlotOptions = plotOptions.series || {}, heatmapPlotOptions = plotOptions.heatmap || {}, 
                // Get old properties in order to keep backward compatibility
                borderColor = (point && point.options.borderColor) ||
                    seriesOptions.borderColor ||
                    heatmapPlotOptions.borderColor ||
                    seriesPlotOptions.borderColor, borderWidth = (point && point.options.borderWidth) ||
                    seriesOptions.borderWidth ||
                    heatmapPlotOptions.borderWidth ||
                    seriesPlotOptions.borderWidth ||
                    attr['stroke-width'];
                // Apply lineColor, or set it to default series color.
                attr.stroke = ((point && point.marker && point.marker.lineColor) ||
                    (seriesOptions.marker && seriesOptions.marker.lineColor) ||
                    borderColor ||
                    this.color);
                // Apply old borderWidth property if exists.
                attr['stroke-width'] = borderWidth;
                if (state && state !== 'normal') {
                    const stateOptions = merge((seriesOptions.states &&
                        seriesOptions.states[state]), (seriesOptions.marker &&
                        seriesOptions.marker.states &&
                        seriesOptions.marker.states[state]), (point &&
                        point.options.states &&
                        point.options.states[state] || {}));
                    attr.fill =
                        stateOptions.color ||
                            Color.parse(attr.fill).brighten(stateOptions.brightness || 0).get();
                    attr.stroke = (stateOptions.lineColor || attr.stroke); // #17896
                }
                return attr;
            }
            /**
             * @private
             */
            translate() {
                const series = this, options = series.options, { borderRadius, marker } = options, symbol = marker && marker.symbol || 'rect', shape = symbols[symbol] ? symbol : 'rect', hasRegularShape = ['circle', 'square'].indexOf(shape) !== -1;
                if (!series.processedXData) {
                    const { xData, yData } = series.getProcessedData();
                    series.processedXData = xData;
                    series.processedYData = yData;
                }
                series.generatePoints();
                for (const point of series.points) {
                    const cellAttr = point.getCellAttributes();
                    let x = Math.min(cellAttr.x1, cellAttr.x2), y = Math.min(cellAttr.y1, cellAttr.y2), width = Math.max(Math.abs(cellAttr.x2 - cellAttr.x1), 0), height = Math.max(Math.abs(cellAttr.y2 - cellAttr.y1), 0);
                    point.hasImage = (point.marker && point.marker.symbol || symbol || '').indexOf('url') === 0;
                    // If marker shape is regular (square), find the shorter cell's
                    // side.
                    if (hasRegularShape) {
                        const sizeDiff = Math.abs(width - height);
                        x = Math.min(cellAttr.x1, cellAttr.x2) +
                            (width < height ? 0 : sizeDiff / 2);
                        y = Math.min(cellAttr.y1, cellAttr.y2) +
                            (width < height ? sizeDiff / 2 : 0);
                        width = height = Math.min(width, height);
                    }
                    if (point.hasImage) {
                        point.marker = { width, height };
                    }
                    point.plotX = point.clientX = (cellAttr.x1 + cellAttr.x2) / 2;
                    point.plotY = (cellAttr.y1 + cellAttr.y2) / 2;
                    point.shapeType = 'path';
                    point.shapeArgs = merge(true, { x, y, width, height }, {
                        d: symbols[shape](x, y, width, height, { r: isNumber(borderRadius) ? borderRadius : 0 })
                    });
                }
                fireEvent(series, 'afterTranslate');
            }
        }
        HeatmapSeries.defaultOptions = merge(ScatterSeries.defaultOptions, HeatmapSeriesDefaults);
        addEvent(HeatmapSeries, 'afterDataClassLegendClick', function () {
            this.isDirtyCanvas = true;
            this.drawPoints();
        });
        extend(HeatmapSeries.prototype, {
            axisTypes: ColorMapComposition.seriesMembers.axisTypes,
            colorKey: ColorMapComposition.seriesMembers.colorKey,
            directTouch: true,
            getExtremesFromAll: true,
            parallelArrays: ColorMapComposition.seriesMembers.parallelArrays,
            pointArrayMap: ['y', 'value'],
            pointClass: HeatmapPoint,
            specialGroup: 'group',
            trackerGroups: ColorMapComposition.seriesMembers.trackerGroups,
            /**
             * @private
             */
            alignDataLabel: ColumnSeries.prototype.alignDataLabel,
            colorAttribs: ColorMapComposition.seriesMembers.colorAttribs,
            getSymbol: Series.prototype.getSymbol
        });
        ColorMapComposition.compose(HeatmapSeries);
        SeriesRegistry.registerSeriesType('heatmap', HeatmapSeries);
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
         * Heatmap series only. Padding between the points in the heatmap.
         * @name Highcharts.Point#pointPadding
         * @type {number|undefined}
         */
        /**
         * Heatmap series only. The value of the point, resulting in a color
         * controlled by options as set in the colorAxis configuration.
         * @name Highcharts.Point#value
         * @type {number|null|undefined}
         */
        /* *
         * @interface Highcharts.PointOptionsObject in parts/Point.ts
         */ /**
        * Heatmap series only. Point padding for a single point.
        * @name Highcharts.PointOptionsObject#pointPadding
        * @type {number|undefined}
        */ /**
        * Heatmap series only. The value of the point, resulting in a color controlled
        * by options as set in the colorAxis configuration.
        * @name Highcharts.PointOptionsObject#value
        * @type {number|null|undefined}
        */
        ''; // Detach doclets above

        return HeatmapSeries;
    });
    _registerModule(_modules, 'masters/modules/map.src.js', [_modules['Core/Globals.js'], _modules['Maps/MapNavigation.js'], _modules['Series/ColorMapComposition.js'], _modules['Series/MapBubble/MapBubbleSeries.js'], _modules['Maps/GeoJSONComposition.js'], _modules['Core/Chart/MapChart.js'], _modules['Maps/MapView.js'], _modules['Maps/Projection.js']], function (Highcharts, MapNavigation, ColorMapComposition, MapBubbleSeries, GeoJSONComposition, MapChart, MapView, Projection) {

        const G = Highcharts;
        // Classes
        G.ColorMapComposition = ColorMapComposition;
        G.MapChart = G.MapChart || MapChart;
        G.MapNavigation = G.MapNavigation || MapNavigation;
        G.MapView = G.MapView || MapView;
        G.Projection = G.Projection || Projection;
        // Functions
        G.mapChart = G.Map = G.MapChart.mapChart;
        G.maps = G.MapChart.maps;
        G.geojson = GeoJSONComposition.geojson;
        G.topo2geo = GeoJSONComposition.topo2geo;
        // Compositions
        GeoJSONComposition.compose(G.Chart);
        MapBubbleSeries.compose(G.Axis, G.Chart, G.Legend);
        MapNavigation.compose(MapChart, G.Pointer, G.SVGRenderer);
        MapView.compose(MapChart);
        // Default Export

        return Highcharts;
    });
}));
