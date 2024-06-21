/**
 * @license Highcharts JS v11.4.3 (2024-05-22)
 *
 * ColorAxis module
 *
 * (c) 2012-2024 Pawel Potaczek
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/color-axis', ['highcharts'], function (Highcharts) {
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
                const series = this, points = this.data.length ? this.data : this.points, nullColor = this.options.nullColor, colorAxis = this.colorAxis, colorKey = this.colorKey;
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
             * @type      {Function}
             * @product   highcharts highstock highmaps
             * @apioption colorAxis.events.legendItemClick
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
}));