/**
 * @license Highmaps JS v11.2.0 (2023-10-30)
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/heatmap', ['highcharts'], function (Highcharts) {
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
         *  (c) 2010-2021 Torstein Honsi
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
             *  Constants
             *
             * */
            const composedMembers = [];
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
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function compose(ColorAxisClass, ChartClass, FxClass, LegendClass, SeriesClass) {
                if (!ColorAxisConstructor) {
                    ColorAxisConstructor = ColorAxisClass;
                }
                if (U.pushUnique(composedMembers, ChartClass)) {
                    const chartProto = ChartClass.prototype;
                    chartProto.collectionsWithUpdate.push('colorAxis');
                    chartProto.collectionsWithInit.colorAxis = [
                        chartProto.addColorAxis
                    ];
                    addEvent(ChartClass, 'afterGetAxes', onChartAfterGetAxes);
                    wrapChartCreateAxis(ChartClass);
                }
                if (U.pushUnique(composedMembers, FxClass)) {
                    const fxProto = FxClass.prototype;
                    fxProto.fillSetter = wrapFxFillSetter;
                    fxProto.strokeSetter = wrapFxStrokeSetter;
                }
                if (U.pushUnique(composedMembers, LegendClass)) {
                    addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
                    addEvent(LegendClass, 'afterColorizeItem', onLegendAfterColorizeItem);
                    addEvent(LegendClass, 'afterUpdate', onLegendAfterUpdate);
                }
                if (U.pushUnique(composedMembers, SeriesClass)) {
                    extend(SeriesClass.prototype, {
                        optionalAxis: 'colorAxis',
                        translateColors: seriesTranslateColors
                    });
                    extend(SeriesClass.prototype.pointClass.prototype, {
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
                const options = this.options;
                this.colorAxis = [];
                if (options.colorAxis) {
                    options.colorAxis = splat(options.colorAxis);
                    options.colorAxis.map((axisOptions) => (new ColorAxisConstructor(this, axisOptions)));
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
                this.series.buildKDTree(); // rebuild kdtree #13195
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
         *               categories, crosshair, dateTimeLabelFormats, height, left,
         *               lineWidth, linkedTo, maxZoom, minRange, minTickInterval,
         *               offset, opposite, pane, plotBands, plotLines,
         *               reversedStacks, scrollbar, showEmpty, title, top, width,
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
         *  (c) 2010-2021 Torstein Honsi
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
    _registerModule(_modules, 'Core/Axis/Color/ColorAxis.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Axis/Color/ColorAxisComposition.js'], _modules['Core/Axis/Color/ColorAxisDefaults.js'], _modules['Core/Axis/Color/ColorAxisLike.js'], _modules['Core/Legend/LegendSymbol.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Axis, ColorAxisComposition, ColorAxisDefaults, ColorAxisLike, LegendSymbol, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: Series } = SeriesRegistry;
        const { extend, fireEvent, isArray, isNumber, merge, pick } = U;
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
                // Prevents unnecessary padding with `hc-more`
                this.beforePadding = false;
                this.chart = void 0;
                this.coll = 'colorAxis';
                this.dataClasses = void 0;
                this.options = void 0;
                this.stops = void 0;
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
                    legend.layout !== 'vertical', visible = userOptions.visible;
                const options = merge(ColorAxis.defaultColorAxisOptions, userOptions, {
                    showEmpty: false,
                    title: null,
                    visible: legend.enabled && visible !== false
                });
                axis.side = userOptions.side || horiz ? 2 : 1;
                axis.reversed = userOptions.reversed || !horiz;
                axis.opposite = !horiz;
                super.init(chart, options, 'colorAxis');
                // Super.init saves the extended user options, now replace it with the
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
                const axis = this;
                super.setOptions(userOptions);
                axis.options.crosshair = axis.options.marker;
            }
            /**
             * @private
             */
            setAxisSize() {
                const axis = this;
                const symbol = axis.legendItem && axis.legendItem.symbol;
                const chart = axis.chart;
                const legendOptions = chart.options.legend || {};
                let x, y, width, height;
                if (symbol) {
                    this.left = x = symbol.attr('x');
                    this.top = y = symbol.attr('y');
                    this.width = width = symbol.attr('width');
                    this.height = height = symbol.attr('height');
                    this.right = chart.chartWidth - x - width;
                    this.bottom = chart.chartHeight - y - height;
                    this.len = this.horiz ? width : height;
                    this.pos = this.horiz ? x : y;
                }
                else {
                    // Fake length for disabled legend to avoid tick issues
                    // and such (#5205)
                    this.len = (this.horiz ?
                        legendOptions.symbolWidth :
                        legendOptions.symbolHeight) || ColorAxis.defaultLegendLength;
                }
            }
            /**
             * Override the getOffset method to add the whole axis groups inside the
             * legend.
             * @private
             */
            getOffset() {
                const axis = this;
                const group = axis.legendItem && axis.legendItem.group;
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
                const axis = this, legendItem = item.legendItem || {}, padding = legend.padding, legendOptions = legend.options, labelOptions = axis.options.labels, itemDistance = pick(legendOptions.itemDistance, 10), horiz = axis.horiz, width = pick(legendOptions.symbolWidth, horiz ? ColorAxis.defaultLegendLength : 12), height = pick(legendOptions.symbolHeight, horiz ? 12 : ColorAxis.defaultLegendLength), labelPadding = pick(
                // @todo: This option is not documented, nor implemented when
                // vertical
                legendOptions.labelPadding, horiz ? 16 : 30);
                this.setLegendColor();
                // Create the gradient
                if (!legendItem.symbol) {
                    legendItem.symbol = this.chart.renderer.symbol('roundedRect', 0, legend.baseline - 11, width, height, { r: legendOptions.symbolRadius ?? 3 }).attr({
                        zIndex: 1
                    }).add(legendItem.group);
                }
                // Set how much space this legend item takes up
                legendItem.labelWidth = (width +
                    padding +
                    (horiz ?
                        itemDistance :
                        pick(labelOptions.x, labelOptions.distance) +
                            this.maxLabelLength));
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
                while (i--) { // x, y, value, other
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
                    if (typeof cSeries.minColorValue !== 'undefined') {
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
                // crosshairs only
                return isNumber(pos) ? // pos can be 0 (#3969)
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
        }
        /* *
         *
         *  Static Properties
         *
         * */
        ColorAxis.defaultColorAxisOptions = ColorAxisDefaults;
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
        ''; // detach doclet above

        return ColorAxis;
    });
    _registerModule(_modules, 'Series/ColorMapComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
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
            const composedMembers = [];
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
                if (U.pushUnique(composedMembers, PointClass)) {
                    addEvent(PointClass, 'afterSetState', onPointAfterSetState);
                }
                return SeriesClass;
            }
            ColorMapComposition.compose = compose;
            /**
             * Move points to the top of the z-index order when hovered.
             * @private
             */
            function onPointAfterSetState(e) {
                const point = this;
                if (point.moveToTopOnHover && point.graphic) {
                    point.graphic.attr({
                        zIndex: e && e.state === 'hover' ? 1 : 0
                    });
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
                    // undefined is allowed, but NaN is not (#17279)
                    (this.value === void 0 || !isNaN(this.value)));
            }
            /**
             * Get the color attibutes to apply on the graphic
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
    _registerModule(_modules, 'Series/Heatmap/HeatmapPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
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
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                super(...arguments);
                this.options = void 0;
                this.series = void 0;
                this.value = void 0;
                this.x = void 0;
                this.y = void 0;
            }
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
                // undefined is allowed
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
         *  (c) 2010-2021 Torstein Honsi
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
            pointRange: null,
            tooltip: {
                pointFormat: '{point.x}, {point.y}: {point.value}<br/>'
            },
            states: {
                hover: {
                    /** @ignore-option */
                    halo: false,
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
         * The value of the point, resulting in a color controled by options
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
        ''; // keeps doclets above separate
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
         *  (c) 2010-2023 Hubert Kozik
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
         *  (c) 2010-2021 Torstein Honsi
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
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.canvas = void 0;
                this.colorAxis = void 0;
                this.context = void 0;
                this.data = void 0;
                this.options = void 0;
                this.points = void 0;
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
                return !!this.processedXData.length; // != 0
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
                // general point range
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
         * controled by options as set in the colorAxis configuration.
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
        * Heatmap series only. The value of the point, resulting in a color controled
        * by options as set in the colorAxis configuration.
        * @name Highcharts.PointOptionsObject#value
        * @type {number|null|undefined}
        */
        ''; // detach doclets above

        return HeatmapSeries;
    });
    _registerModule(_modules, 'masters/modules/heatmap.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/Color/ColorAxis.js']], function (Highcharts, ColorAxis) {

        const G = Highcharts;
        G.ColorAxis = ColorAxis;
        ColorAxis.compose(G.Chart, G.Fx, G.Legend, G.Series);

    });
}));