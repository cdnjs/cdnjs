/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 *
 * Dependency wheel module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/dependency-wheel', ['highcharts', 'highcharts/modules/sankey'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/DependencyWheel/DependencyWheelPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  Dependency wheel module
         *
         *  (c) 2018-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sankey: { prototype: { pointClass: SankeyPoint } } } = SeriesRegistry.seriesTypes;
        const { pInt, wrap } = U;
        /* *
         *
         *  Class
         *
         * */
        class DependencyWheelPoint extends SankeyPoint {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Return a text path that the data label uses.
             * @private
             */
            getDataLabelPath(label) {
                const point = this, renderer = point.series.chart.renderer, shapeArgs = point.shapeArgs, upperHalf = point.angle < 0 || point.angle > Math.PI, start = shapeArgs.start || 0, end = shapeArgs.end || 0;
                // First time
                if (!point.dataLabelPath) {
                    // Destroy the path with the label
                    wrap(label, 'destroy', function (proceed) {
                        if (point.dataLabelPath) {
                            point.dataLabelPath = point.dataLabelPath.destroy();
                        }
                        return proceed.call(this);
                    });
                    // Subsequent times
                }
                else {
                    point.dataLabelPath = point.dataLabelPath.destroy();
                    delete point.dataLabelPath;
                }
                // All times
                point.dataLabelPath = renderer
                    .arc({
                    open: true,
                    longArc: Math.abs(Math.abs(start) - Math.abs(end)) < Math.PI ? 0 : 1
                })
                    .attr({
                    x: shapeArgs.x,
                    y: shapeArgs.y,
                    r: ((shapeArgs.r || 0) + pInt(label.options?.distance || 0)),
                    start: (upperHalf ? start : end),
                    end: (upperHalf ? end : start),
                    clockwise: +upperHalf
                })
                    .add(renderer.defs);
                return point.dataLabelPath;
            }
            isValid() {
                // No null points here
                return true;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return DependencyWheelPoint;
    });
    _registerModule(_modules, 'Series/DependencyWheel/DependencyWheelSeriesDefaults.js', [], function () {
        /* *
         *
         *  Dependency wheel module
         *
         *  (c) 2018-2024 Torstein Honsi
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
         * A dependency wheel chart is a type of flow diagram, where all nodes are laid
         * out in a circle, and the flow between the are drawn as link bands.
         *
         * @sample highcharts/demo/dependency-wheel/
         *         Dependency wheel
         *
         * @extends      plotOptions.sankey
         * @exclude      dataSorting, nodeAlignment
         * @since        7.1.0
         * @product      highcharts
         * @requires     modules/dependency-wheel
         * @optionparent plotOptions.dependencywheel
         */
        const DependencyWheelSeriesDefaults = {
            /**
             * Distance between the data label and the center of the node.
             *
             * @type      {number}
             * @default   0
             * @apioption plotOptions.dependencywheel.dataLabels.distance
             */
            /**
             * A format string for data labels of the links between nodes. Available
             * variables are the same as for `formatter`.
             *
             * @see [nodeFormat](#nodeFormat) for formatting node labels
             *
             * @apioption plotOptions.dependencywheel.dataLabels.format
             */
            /**
             * Callback to format data labels of the links between nodes. The `format`
             * option takes precedence over the `formatter` option.
             *
             * @see [nodeFormatter](#nodeFormatter) for formatting node labels
             *
             * @apioption plotOptions.dependencywheel.dataLabels.formatter
             */
            /**
             * The format string specifying what to show for nodes in the sankey
             * diagram. By default the nodeFormatter returns `{point.name}`. Available
             * variables are the same as for `nodeFormatter`.
             *
             * @apioption plotOptions.dependencywheel.dataLabels.nodeFormat
             */
            /**
             * Callback to format data labels of nodes in the dependency wheel. The
             * `nodeFormat` option takes precedence over the `nodeFormatter` option.
             *
             * @apioption plotOptions.dependencywheel.dataLabels.nodeFormatter
             */
            /**
             * Size of the wheel in pixel or percent relative to the canvas space.
             *
             * @type      {number|string}
             * @default   100%
             * @apioption plotOptions.dependencywheel.size
             */
            /**
             * The center of the wheel relative to the plot area. Can be
             * percentages or pixel values. The default behaviour is to
             * center the wheel inside the plot area.
             *
             * @type    {Array<number|string|null>}
             * @default [null, null]
             * @product highcharts
             */
            center: [null, null],
            curveFactor: 0.6,
            /**
             * The start angle of the dependency wheel, in degrees where 0 is up.
             */
            startAngle: 0,
            dataLabels: {
                textPath: {
                    /**
                     * Enable or disable `textPath` option for link's or marker's data
                     * labels.
                     *
                     * @type      {boolean}
                     * @default   false
                     * @since     7.1.0
                     * @apioption plotOptions.series.dataLabels.textPath.enabled
                     */
                    enabled: false,
                    attributes: {
                        /**
                        * Text path shift along its y-axis.
                        *
                        * @type      {Highcharts.SVGAttributes}
                        * @default   5
                        * @since     7.1.0
                        * @apioption plotOptions.dependencywheel.dataLabels.textPath.attributes.dy
                        */
                        dy: 5
                    }
                }
            }
        };
        /**
         * A `dependencywheel` series. If the [type](#series.dependencywheel.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dependencywheel
         * @exclude   dataSorting
         * @product   highcharts
         * @requires  modules/sankey
         * @requires  modules/dependency-wheel
         * @apioption series.dependencywheel
         */
        /**
         * A collection of options for the individual nodes. The nodes in a dependency
         * diagram are auto-generated instances of `Highcharts.Point`, but options can
         * be applied here and linked by the `id`.
         *
         * @extends   series.sankey.nodes
         * @type      {Array<*>}
         * @product   highcharts
         * @excluding offset
         * @apioption series.dependencywheel.nodes
         */
        /**
         * An array of data points for the series. For the `dependencywheel` series
         * type, points can be given in the following way:
         *
         * An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of data
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
         * @type      {Array<Array<string,string,number>|*>}
         * @extends   series.sankey.data
         * @product   highcharts
         * @excluding outgoing, dataLabels
         * @apioption series.dependencywheel.data
         */
        /**
         * Individual data label for each node. The options are the same as
         * the ones for [series.dependencywheel.dataLabels](#series.dependencywheel.dataLabels).
         *
         * @apioption series.dependencywheel.nodes.dataLabels
         */
        ''; // keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return DependencyWheelSeriesDefaults;
    });
    _registerModule(_modules, 'Series/DependencyWheel/DependencyWheelSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Series/DependencyWheel/DependencyWheelPoint.js'], _modules['Series/DependencyWheel/DependencyWheelSeriesDefaults.js'], _modules['Core/Globals.js'], _modules['Series/Sankey/SankeyColumnComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (A, DependencyWheelPoint, DependencyWheelSeriesDefaults, H, SankeyColumnComposition, SeriesRegistry, U) {
        /* *
         *
         *  Dependency wheel module
         *
         *  (c) 2018-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject } = A;
        const { deg2rad } = H;
        const { pie: PieSeries, sankey: SankeySeries } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.dependencywheel
         *
         * @augments Highcharts.seriesTypes.sankey
         */
        class DependencyWheelSeries extends SankeySeries {
            /* *
             *
             *  Functions
             *
             * */
            animate(init) {
                const series = this;
                if (!init) {
                    const duration = animObject(series.options.animation).duration, step = (duration / 2) / series.nodes.length;
                    let i = 0;
                    for (const point of series.nodes) {
                        const graphic = point.graphic;
                        if (graphic) {
                            graphic.attr({ opacity: 0 });
                            setTimeout(() => {
                                if (point.graphic) {
                                    point.graphic.animate({ opacity: 1 }, { duration: step });
                                }
                            }, step * i++);
                        }
                    }
                    for (const point of series.points) {
                        const graphic = point.graphic;
                        if (!point.isNode && graphic) {
                            graphic.attr({ opacity: 0 })
                                .animate({
                                opacity: 1
                            }, series.options.animation);
                        }
                    }
                }
            }
            createNode(id) {
                const node = super.createNode(id);
                /**
                 * Return the sum of incoming and outgoing links.
                 * @private
                 */
                node.getSum = () => (node.linksFrom
                    .concat(node.linksTo)
                    .reduce((acc, link) => (acc + link.weight), 0));
                /**
                 * Get the offset in weight values of a point/link.
                 * @private
                 */
                node.offset = (point) => {
                    const otherNode = (link) => (link.fromNode === node ?
                        link.toNode :
                        link.fromNode);
                    let offset = 0, links = node.linksFrom.concat(node.linksTo), sliced;
                    // Sort and slice the links to avoid links going out of each
                    // node crossing each other.
                    links.sort((a, b) => (otherNode(a).index - otherNode(b).index));
                    for (let i = 0; i < links.length; i++) {
                        if (otherNode(links[i]).index > node.index) {
                            links = links.slice(0, i).reverse().concat(links.slice(i).reverse());
                            sliced = true;
                            break;
                        }
                    }
                    if (!sliced) {
                        links.reverse();
                    }
                    for (let i = 0; i < links.length; i++) {
                        if (links[i] === point) {
                            return offset;
                        }
                        offset += links[i].weight;
                    }
                };
                return node;
            }
            /**
             * Dependency wheel has only one column, it runs along the perimeter.
             * @private
             */
            createNodeColumns() {
                const series = this, columns = [SankeyColumnComposition.compose([], series)];
                for (const node of series.nodes) {
                    node.column = 0;
                    columns[0].push(node);
                }
                return columns;
            }
            /**
             * Translate from vertical pixels to perimeter.
             * @private
             */
            getNodePadding() {
                return this.options.nodePadding / Math.PI;
            }
            /**
             * @ignore
             * @todo Override the refactored sankey translateLink and translateNode
             * functions instead of the whole translate function.
             */
            translate() {
                const series = this, options = series.options, factor = 2 * Math.PI /
                    (series.chart.plotHeight + series.getNodePadding()), center = series.getCenter(), startAngle = (options.startAngle - 90) * deg2rad, brOption = options.borderRadius, borderRadius = typeof brOption === 'object' ?
                    brOption.radius : brOption;
                super.translate();
                for (const node of this.nodeColumns[0]) {
                    // Don't render the nodes if sum is 0 #12453
                    if (node.sum) {
                        const shapeArgs = node.shapeArgs, centerX = center[0], centerY = center[1], r = center[2] / 2, innerR = r - options.nodeWidth, start = startAngle + factor * (shapeArgs.y || 0), end = startAngle +
                            factor * ((shapeArgs.y || 0) + (shapeArgs.height || 0));
                        // Middle angle
                        node.angle = start + (end - start) / 2;
                        node.shapeType = 'arc';
                        node.shapeArgs = {
                            x: centerX,
                            y: centerY,
                            r: r,
                            innerR: innerR,
                            start: start,
                            end: end,
                            borderRadius
                        };
                        node.dlBox = {
                            x: centerX + Math.cos((start + end) / 2) * (r + innerR) / 2,
                            y: centerY + Math.sin((start + end) / 2) * (r + innerR) / 2,
                            width: 1,
                            height: 1
                        };
                        // Draw the links from this node
                        for (const point of node.linksFrom) {
                            if (point.linkBase) {
                                let curveFactor, distance;
                                const corners = point.linkBase.map((top, i) => {
                                    const angle = factor * top, x = Math.cos(startAngle + angle) * (innerR + 1), y = Math.sin(startAngle + angle) * (innerR + 1);
                                    curveFactor = options.curveFactor || 0;
                                    // The distance between the from and to node
                                    // along the perimeter. This affect how curved
                                    // the link is, so that links between neighbours
                                    // don't extend too far towards the center.
                                    distance = Math.abs(point.linkBase[3 - i] * factor - angle);
                                    if (distance > Math.PI) {
                                        distance = 2 * Math.PI - distance;
                                    }
                                    distance = distance * innerR;
                                    if (distance < innerR) {
                                        curveFactor *= (distance / innerR);
                                    }
                                    return {
                                        x: centerX + x,
                                        y: centerY + y,
                                        cpX: centerX + (1 - curveFactor) * x,
                                        cpY: centerY + (1 - curveFactor) * y
                                    };
                                });
                                point.shapeArgs = {
                                    d: [[
                                            'M',
                                            corners[0].x, corners[0].y
                                        ], [
                                            'A',
                                            innerR, innerR,
                                            0,
                                            0,
                                            1,
                                            corners[1].x, corners[1].y
                                        ], [
                                            'C',
                                            corners[1].cpX, corners[1].cpY,
                                            corners[2].cpX, corners[2].cpY,
                                            corners[2].x, corners[2].y
                                        ], [
                                            'A',
                                            innerR, innerR,
                                            0,
                                            0,
                                            1,
                                            corners[3].x, corners[3].y
                                        ], [
                                            'C',
                                            corners[3].cpX, corners[3].cpY,
                                            corners[0].cpX, corners[0].cpY,
                                            corners[0].x, corners[0].y
                                        ]]
                                };
                            }
                        }
                    }
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        DependencyWheelSeries.defaultOptions = merge(SankeySeries.defaultOptions, DependencyWheelSeriesDefaults);
        extend(DependencyWheelSeries.prototype, {
            orderNodes: false,
            getCenter: PieSeries.prototype.getCenter
        });
        DependencyWheelSeries.prototype.pointClass = DependencyWheelPoint;
        SeriesRegistry.registerSeriesType('dependencywheel', DependencyWheelSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return DependencyWheelSeries;
    });
    _registerModule(_modules, 'masters/modules/dependency-wheel.src.js', [], function () {


    });
}));