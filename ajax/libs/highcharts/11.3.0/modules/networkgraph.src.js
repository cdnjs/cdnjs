/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 *
 * Force directed graph module
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
        define('highcharts/modules/networkgraph', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/DragNodesComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass) {
            if (pushUnique(composed, compose)) {
                addEvent(ChartClass, 'load', onChartLoad);
            }
        }
        /**
         * Draggable mode:
         * @private
         */
        function onChartLoad() {
            const chart = this;
            let mousedownUnbinder, mousemoveUnbinder, mouseupUnbinder;
            if (chart.container) {
                mousedownUnbinder = addEvent(chart.container, 'mousedown', (event) => {
                    const point = chart.hoverPoint;
                    if (point &&
                        point.series &&
                        point.series.hasDraggableNodes &&
                        point.series.options.draggable) {
                        point.series.onMouseDown(point, event);
                        mousemoveUnbinder = addEvent(chart.container, 'mousemove', (e) => (point &&
                            point.series &&
                            point.series.onMouseMove(point, e)));
                        mouseupUnbinder = addEvent(chart.container.ownerDocument, 'mouseup', (e) => {
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
        }
        /**
         * Mouse down action, initializing drag&drop mode.
         *
         * @private
         * @param {Highcharts.Point} point
         *        The point that event occured.
         * @param {Highcharts.PointerEventObject} event
         *        Browser event, before normalization.
         */
        function onMouseDown(point, event) {
            const normalizedEvent = this.chart.pointer.normalize(event);
            point.fixedPosition = {
                chartX: normalizedEvent.chartX,
                chartY: normalizedEvent.chartY,
                plotX: point.plotX,
                plotY: point.plotY
            };
            point.inDragMode = true;
        }
        /**
         * Mouse move action during drag&drop.
         *
         * @private
         *
         * @param {global.Event} event
         *        Browser event, before normalization.
         * @param {Highcharts.Point} point
         *        The point that event occured.
         *
         */
        function onMouseMove(point, event) {
            if (point.fixedPosition && point.inDragMode) {
                const series = this, chart = series.chart, normalizedEvent = chart.pointer.normalize(event), diffX = point.fixedPosition.chartX - normalizedEvent.chartX, diffY = point.fixedPosition.chartY - normalizedEvent.chartY, graphLayoutsLookup = chart.graphLayoutsLookup;
                let newPlotX, newPlotY;
                // At least 5px to apply change (avoids simple click):
                if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                    newPlotX = point.fixedPosition.plotX - diffX;
                    newPlotY = point.fixedPosition.plotY - diffY;
                    if (chart.isInsidePlot(newPlotX, newPlotY)) {
                        point.plotX = newPlotX;
                        point.plotY = newPlotY;
                        point.hasDragged = true;
                        this.redrawHalo(point);
                        graphLayoutsLookup.forEach((layout) => {
                            layout.restartSimulation();
                        });
                    }
                }
            }
        }
        /**
         * Mouse up action, finalizing drag&drop.
         *
         * @private
         * @param {Highcharts.Point} point
         *        The point that event occured.
         */
        function onMouseUp(point, _event) {
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
        }
        /**
         * Redraw halo on mousemove during the drag&drop action.
         *
         * @private
         * @param {Highcharts.Point} point
         *        The point that should show halo.
         */
        function redrawHalo(point) {
            if (point && this.halo) {
                this.halo.attr({
                    d: point.haloPath(this.options.states.hover.halo.size)
                });
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DragNodesComposition = {
            compose,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            redrawHalo
        };

        return DragNodesComposition;
    });
    _registerModule(_modules, 'Series/GraphLayoutComposition.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (A, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setAnimation } = A;
        const { composed } = H;
        const { addEvent, pushUnique } = U;
        /* *
         *
         *  Constants
         *
         * */
        const integrations = {};
        const layouts = {};
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass) {
            if (pushUnique(composed, compose)) {
                addEvent(ChartClass, 'afterPrint', onChartAfterPrint);
                addEvent(ChartClass, 'beforePrint', onChartBeforePrint);
                addEvent(ChartClass, 'predraw', onChartPredraw);
                addEvent(ChartClass, 'render', onChartRender);
            }
        }
        /**
         * Re-enable simulation after print.
         * @private
         */
        function onChartAfterPrint() {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach((layout) => {
                    // return to default simulation
                    layout.updateSimulation();
                });
                this.redraw();
            }
        }
        /**
         * Disable simulation before print if enabled.
         * @private
         */
        function onChartBeforePrint() {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach((layout) => {
                    layout.updateSimulation(false);
                });
                this.redraw();
            }
        }
        /**
         * Clear previous layouts.
         * @private
         */
        function onChartPredraw() {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach((layout) => {
                    layout.stop();
                });
            }
        }
        /**
         * @private
         */
        function onChartRender() {
            let systemsStable, afterRender = false;
            const layoutStep = (layout) => {
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
            };
            if (this.graphLayoutsLookup) {
                setAnimation(false, this);
                // Start simulation
                this.graphLayoutsLookup.forEach((layout) => layout.start());
                // Just one sync step, to run different layouts similar to
                // async mode.
                while (!systemsStable) {
                    systemsStable = true;
                    this.graphLayoutsLookup.forEach(layoutStep);
                }
                if (afterRender) {
                    this.series.forEach((series) => {
                        if (series && series.layout) {
                            series.render();
                        }
                    });
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const GraphLayoutComposition = {
            compose,
            integrations,
            layouts
        };

        return GraphLayoutComposition;
    });
    _registerModule(_modules, 'Series/NodesComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: { prototype: seriesProto, prototype: { pointClass: { prototype: pointProto } } } } = SeriesRegistry;
        const { defined, extend, find, merge, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        var NodesComposition;
        (function (NodesComposition) {
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
             * @private
             */
            function compose(PointClass, SeriesClass) {
                const pointProto = PointClass.prototype, seriesProto = SeriesClass.prototype;
                pointProto.setNodeState = setNodeState;
                pointProto.setState = setNodeState;
                pointProto.update = updateNode;
                seriesProto.destroy = destroy;
                seriesProto.setData = setData;
                return SeriesClass;
            }
            NodesComposition.compose = compose;
            /**
             * Create a single node that holds information on incoming and outgoing
             * links.
             * @private
             */
            function createNode(id) {
                const PointClass = this.pointClass, findById = (nodes, id) => find(nodes, (node) => node.id === id);
                let node = findById(this.nodes, id), options;
                if (!node) {
                    options = this.options.nodes && findById(this.options.nodes, id);
                    const newNode = new PointClass(this, extend({
                        className: 'highcharts-node',
                        isNode: true,
                        id: id,
                        y: 1 // Pass isNull test
                    }, options));
                    newNode.linksTo = [];
                    newNode.linksFrom = [];
                    /**
                     * Return the largest sum of either the incoming or outgoing links.
                     * @private
                     */
                    newNode.getSum = function () {
                        let sumTo = 0, sumFrom = 0;
                        newNode.linksTo.forEach((link) => {
                            sumTo += link.weight || 0;
                        });
                        newNode.linksFrom.forEach((link) => {
                            sumFrom += link.weight || 0;
                        });
                        return Math.max(sumTo, sumFrom);
                    };
                    /**
                     * Get the offset in weight values of a point/link.
                     * @private
                     */
                    newNode.offset = function (point, coll) {
                        let offset = 0;
                        for (let i = 0; i < newNode[coll].length; i++) {
                            if (newNode[coll][i] === point) {
                                return offset;
                            }
                            offset += newNode[coll][i].weight;
                        }
                    };
                    // Return true if the node has a shape, otherwise all links are
                    // outgoing.
                    newNode.hasShape = function () {
                        let outgoing = 0;
                        newNode.linksTo.forEach((link) => {
                            if (link.outgoing) {
                                outgoing++;
                            }
                        });
                        return (!newNode.linksTo.length ||
                            outgoing !== newNode.linksTo.length);
                    };
                    newNode.index = this.nodes.push(newNode) - 1;
                    node = newNode;
                }
                node.formatPrefix = 'node';
                // for use in formats
                node.name = node.name || node.options.id || '';
                // Mass is used in networkgraph:
                node.mass = pick(
                // Node:
                node.options.mass, node.options.marker && node.options.marker.radius, 
                // Series:
                this.options.marker && this.options.marker.radius, 
                // Default:
                4);
                return node;
            }
            NodesComposition.createNode = createNode;
            /**
             * Destroy alll nodes and links.
             * @private
             */
            function destroy() {
                // Nodes must also be destroyed (#8682, #9300)
                this.data = []
                    .concat(this.points || [], this.nodes);
                return seriesProto.destroy.apply(this, arguments);
            }
            NodesComposition.destroy = destroy;
            /**
             * Extend generatePoints by adding the nodes, which are Point objects but
             * pushed to the this.nodes array.
             * @private
             */
            function generatePoints() {
                const chart = this.chart, nodeLookup = {};
                seriesProto.generatePoints.call(this);
                if (!this.nodes) {
                    this.nodes = []; // List of Point-like node items
                }
                this.colorCounter = 0;
                // Reset links from previous run
                this.nodes.forEach((node) => {
                    node.linksFrom.length = 0;
                    node.linksTo.length = 0;
                    node.level = node.options.level;
                });
                // Create the node list and set up links
                this.points.forEach((point) => {
                    if (defined(point.from)) {
                        if (!nodeLookup[point.from]) {
                            nodeLookup[point.from] = this.createNode(point.from);
                        }
                        nodeLookup[point.from].linksFrom.push(point);
                        point.fromNode = nodeLookup[point.from];
                        // Point color defaults to the fromNode's color
                        if (chart.styledMode) {
                            point.colorIndex = pick(point.options.colorIndex, nodeLookup[point.from].colorIndex);
                        }
                        else {
                            point.color =
                                point.options.color || nodeLookup[point.from].color;
                        }
                    }
                    if (defined(point.to)) {
                        if (!nodeLookup[point.to]) {
                            nodeLookup[point.to] = this.createNode(point.to);
                        }
                        nodeLookup[point.to].linksTo.push(point);
                        point.toNode = nodeLookup[point.to];
                    }
                    point.name = point.name || point.id; // for use in formats
                }, this);
                // Store lookup table for later use
                this.nodeLookup = nodeLookup;
            }
            NodesComposition.generatePoints = generatePoints;
            /**
             * Destroy all nodes on setting new data
             * @private
             */
            function setData() {
                if (this.nodes) {
                    this.nodes.forEach((node) => {
                        node.destroy();
                    });
                    this.nodes.length = 0;
                }
                seriesProto.setData.apply(this, arguments);
            }
            /**
             * When hovering node, highlight all connected links. When hovering a link,
             * highlight all connected nodes.
             * @private
             */
            function setNodeState(state) {
                const args = arguments, others = this.isNode ? this.linksTo.concat(this.linksFrom) :
                    [this.fromNode, this.toNode];
                if (state !== 'select') {
                    others.forEach((linkOrNode) => {
                        if (linkOrNode && linkOrNode.series) {
                            pointProto.setState.apply(linkOrNode, args);
                            if (!linkOrNode.isNode) {
                                if (linkOrNode.fromNode.graphic) {
                                    pointProto.setState.apply(linkOrNode.fromNode, args);
                                }
                                if (linkOrNode.toNode && linkOrNode.toNode.graphic) {
                                    pointProto.setState.apply(linkOrNode.toNode, args);
                                }
                            }
                        }
                    });
                }
                pointProto.setState.apply(this, args);
            }
            NodesComposition.setNodeState = setNodeState;
            /**
             * When updating a node, don't update `series.options.data`, but
             * `series.options.nodes`
             * @private
             */
            function updateNode(options, redraw, animation, runEvent) {
                const nodes = this.series.options.nodes, data = this.series.options.data, dataLength = data && data.length || 0, linkConfig = data && data[this.index];
                pointProto.update.call(this, options, this.isNode ? false : redraw, // Hold the redraw for nodes
                animation, runEvent);
                if (this.isNode) {
                    // this.index refers to `series.nodes`, not `options.nodes` array
                    const nodeIndex = (nodes || [])
                        .reduce(// Array.findIndex needs a polyfill
                    (prevIndex, n, index) => (this.id === n.id ? index : prevIndex), -1), 
                    // Merge old config with new config. New config is stored in
                    // options.data, because of default logic in point.update()
                    nodeConfig = merge(nodes && nodes[nodeIndex] || {}, data && data[this.index] || {});
                    // Restore link config
                    if (data) {
                        if (linkConfig) {
                            data[this.index] = linkConfig;
                        }
                        else {
                            // Remove node from config if there's more nodes than links
                            data.length = dataLength;
                        }
                    }
                    // Set node config
                    if (nodes) {
                        if (nodeIndex >= 0) {
                            nodes[nodeIndex] = nodeConfig;
                        }
                        else {
                            nodes.push(nodeConfig);
                        }
                    }
                    else {
                        this.series.options.nodes = [nodeConfig];
                    }
                    if (pick(redraw, true)) {
                        this.series.chart.redraw(animation);
                    }
                }
            }
            NodesComposition.updateNode = updateNode;
        })(NodesComposition || (NodesComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return NodesComposition;
    });
    _registerModule(_modules, 'Series/Networkgraph/NetworkgraphPoint.js', [_modules['Series/NodesComposition.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (NodesComposition, SeriesRegistry, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: { prototype: seriesProto, prototype: { pointClass: Point } } } = SeriesRegistry;
        const { addEvent, css, defined, extend, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        class NetworkgraphPoint extends Point {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Destroy point. If it's a node, remove all links coming out of this
             * node. Then remove point from the layout.
             * @private
             */
            destroy() {
                if (this.isNode) {
                    this.linksFrom.concat(this.linksTo).forEach(function (link) {
                        // Removing multiple nodes at the same time
                        // will try to remove link between nodes twice
                        if (link.destroyElements) {
                            link.destroyElements();
                        }
                    });
                }
                this.series.layout.removeElementFromCollection(this, this.series.layout[this.isNode ? 'nodes' : 'links']);
                return Point.prototype.destroy.apply(this, arguments);
            }
            /**
             * Return degree of a node. If node has no connections, it still has
             * deg=1.
             * @private
             */
            getDegree() {
                const deg = this.isNode ?
                    this.linksFrom.length + this.linksTo.length :
                    0;
                return deg === 0 ? 1 : deg;
            }
            /**
             * Get presentational attributes of link connecting two nodes.
             * @private
             */
            getLinkAttributes() {
                const linkOptions = this.series.options.link, pointOptions = this.options;
                return {
                    'stroke-width': pick(pointOptions.width, linkOptions.width),
                    stroke: (pointOptions.color || linkOptions.color),
                    dashstyle: (pointOptions.dashStyle || linkOptions.dashStyle),
                    opacity: pick(pointOptions.opacity, linkOptions.opacity, 1)
                };
            }
            /**
             * Get link path connecting two nodes.
             * @private
             * @return {Array<Highcharts.SVGPathArray>}
             *         Path: `['M', x, y, 'L', x, y]`
             */
            getLinkPath() {
                let left = this.fromNode, right = this.toNode;
                // Start always from left to the right node, to prevent rendering
                // labels upside down
                if (left.plotX > right.plotX) {
                    left = this.toNode;
                    right = this.fromNode;
                }
                return [
                    ['M', left.plotX || 0, left.plotY || 0],
                    ['L', right.plotX || 0, right.plotY || 0]
                ];
                /*
                IDEA: different link shapes?
                return [
                    'M',
                    from.plotX,
                    from.plotY,
                    'Q',
                    (to.plotX + from.plotX) / 2,
                    (to.plotY + from.plotY) / 2 + 15,
                    to.plotX,
                    to.plotY
                ];*/
            }
            /**
             * Get mass fraction applied on two nodes connected to each other. By
             * default, when mass is equal to `1`, mass fraction for both nodes
             * equal to 0.5.
             * @private
             * @return {Highcharts.Dictionary<number>}
             *         For example `{ fromNode: 0.5, toNode: 0.5 }`
             */
            getMass() {
                const m1 = this.fromNode.mass, m2 = this.toNode.mass, sum = m1 + m2;
                return {
                    fromNode: 1 - m1 / sum,
                    toNode: 1 - m2 / sum
                };
            }
            /**
             * Basic `point.init()` and additional styles applied when
             * `series.draggable` is enabled.
             * @private
             */
            constructor(series, options, x) {
                super(series, options, x);
                if (this.series.options.draggable &&
                    !this.series.chart.styledMode) {
                    addEvent(this, 'mouseOver', function () {
                        css(this.series.chart.container, { cursor: 'move' });
                    });
                    addEvent(this, 'mouseOut', function () {
                        css(this.series.chart.container, { cursor: 'default' });
                    });
                }
            }
            /**
             * @private
             */
            isValid() {
                return !this.isNode || defined(this.id);
            }
            /**
             * Redraw link's path.
             * @private
             */
            redrawLink() {
                let path = this.getLinkPath(), attribs;
                if (this.graphic) {
                    this.shapeArgs = {
                        d: path
                    };
                    if (!this.series.chart.styledMode) {
                        attribs = this.series.pointAttribs(this);
                        this.graphic.attr(attribs);
                        (this.dataLabels || []).forEach(function (label) {
                            if (label) {
                                label.attr({
                                    opacity: attribs.opacity
                                });
                            }
                        });
                    }
                    this.graphic.animate(this.shapeArgs);
                    // Required for dataLabels
                    const start = path[0];
                    const end = path[1];
                    if (start[0] === 'M' && end[0] === 'L') {
                        this.plotX = (start[1] + end[1]) / 2;
                        this.plotY = (start[2] + end[2]) / 2;
                    }
                }
            }
            /**
             * Common method for removing points and nodes in networkgraph. To
             * remove `link`, use `series.data[index].remove()`. To remove `node`
             * with all connections, use `series.nodes[index].remove()`.
             * @private
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call. When
             *        doing more operations on the chart, for example running
             *        `point.remove()` in a loop, it is best practice to set
             *        `redraw` to false and call `chart.redraw()` after.
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation=false]
             *        Whether to apply animation, and optionally animation
             *        configuration.
             */
            remove(redraw, animation) {
                let point = this, series = point.series, nodesOptions = series.options.nodes || [], index, i = nodesOptions.length;
                // For nodes, remove all connected links:
                if (point.isNode) {
                    // Temporary disable series.points array, because
                    // Series.removePoint() modifies it
                    series.points = [];
                    // Remove link from all nodes collections:
                    []
                        .concat(point.linksFrom)
                        .concat(point.linksTo)
                        .forEach(function (linkFromTo) {
                        // Incoming links
                        index = linkFromTo.fromNode.linksFrom.indexOf(linkFromTo);
                        if (index > -1) {
                            linkFromTo.fromNode.linksFrom.splice(index, 1);
                        }
                        // Outcoming links
                        index = linkFromTo.toNode.linksTo.indexOf(linkFromTo);
                        if (index > -1) {
                            linkFromTo.toNode.linksTo.splice(index, 1);
                        }
                        // Remove link from data/points collections
                        seriesProto.removePoint.call(series, series.data.indexOf(linkFromTo), false, false);
                    });
                    // Restore points array, after links are removed
                    series.points = series.data.slice();
                    // Proceed with removing node. It's similar to
                    // Series.removePoint() method, but doesn't modify other arrays
                    series.nodes.splice(series.nodes.indexOf(point), 1);
                    // Remove node options from config
                    while (i--) {
                        if (nodesOptions[i].id === point.options.id) {
                            series.options.nodes.splice(i, 1);
                            break;
                        }
                    }
                    if (point) {
                        point.destroy();
                    }
                    // Run redraw if requested
                    series.isDirty = true;
                    series.isDirtyData = true;
                    if (redraw) {
                        series.chart.redraw(redraw);
                    }
                }
                else {
                    series.removePoint(series.data.indexOf(point), redraw, animation);
                }
            }
            /**
             * Render link and add it to the DOM.
             * @private
             */
            renderLink() {
                let attribs;
                if (!this.graphic) {
                    this.graphic = this.series.chart.renderer
                        .path(this.getLinkPath())
                        .addClass(this.getClassName(), true)
                        .add(this.series.group);
                    if (!this.series.chart.styledMode) {
                        attribs = this.series.pointAttribs(this);
                        this.graphic.attr(attribs);
                        (this.dataLabels || []).forEach(function (label) {
                            if (label) {
                                label.attr({
                                    opacity: attribs.opacity
                                });
                            }
                        });
                    }
                }
            }
        }
        extend(NetworkgraphPoint.prototype, {
            setState: NodesComposition.setNodeState
        });
        /* *
         *
         *  Default Export
         *
         * */

        return NetworkgraphPoint;
    });
    _registerModule(_modules, 'Series/Networkgraph/NetworkgraphSeriesDefaults.js', [], function () {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
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
         * A networkgraph is a type of relationship chart, where connnections
         * (links) attracts nodes (points) and other nodes repulse each other.
         *
         * @extends      plotOptions.line
         * @product      highcharts
         * @sample       highcharts/demo/network-graph/
         *               Networkgraph
         * @since        7.0.0
         * @excluding    boostThreshold, animation, animationLimit, connectEnds,
         *               colorAxis, colorKey, connectNulls, cropThreshold, dragDrop,
         *               getExtremesFromAll, label, linecap, negativeColor,
         *               pointInterval, pointIntervalUnit, pointPlacement,
         *               pointStart, softThreshold, stack, stacking, step,
         *               threshold, xAxis, yAxis, zoneAxis, dataSorting,
         *               boostBlending
         * @requires     modules/networkgraph
         * @optionparent plotOptions.networkgraph
         *
         * @private
         */
        const NetworkgraphSeriesDefaults = {
            stickyTracking: false,
            /**
             * @default   true
             * @extends   plotOptions.series.inactiveOtherPoints
             * @private
             */
            inactiveOtherPoints: true,
            marker: {
                enabled: true,
                states: {
                    /**
                     * The opposite state of a hover for a single point node.
                     * Applied to all not connected nodes to the hovered one.
                     *
                     * @declare Highcharts.PointStatesInactiveOptionsObject
                     */
                    inactive: {
                        /**
                         * Opacity of inactive markers.
                         */
                        opacity: 0.3,
                        /**
                         * Animation when not hovering over the node.
                         *
                         * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                         */
                        animation: {
                            /** @internal */
                            duration: 50
                        }
                    }
                }
            },
            states: {
                /**
                 * The opposite state of a hover for a single point link. Applied
                 * to all links that are not comming from the hovered node.
                 *
                 * @declare Highcharts.SeriesStatesInactiveOptionsObject
                 */
                inactive: {
                    /**
                     * Opacity of inactive links.
                     */
                    linkOpacity: 0.3,
                    /**
                     * Animation when not hovering over the node.
                     *
                     * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     */
                    animation: {
                        /** @internal */
                        duration: 50
                    }
                }
            },
            /**
             * @sample highcharts/series-networkgraph/link-datalabels
             *         Networkgraph with labels on links
             * @sample highcharts/series-networkgraph/textpath-datalabels
             *         Networkgraph with labels around nodes
             * @sample highcharts/series-networkgraph/link-datalabels
             *         Data labels moved into the nodes
             * @sample highcharts/series-networkgraph/link-datalabels
             *         Data labels moved under the links
             *
             * @declare Highcharts.SeriesNetworkgraphDataLabelsOptionsObject
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
                 * @apioption plotOptions.networkgraph.dataLabels.format
                 */
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Callback JavaScript function to format the data label for a node.
                 * Note that if a `format` is defined, the format takes precedence
                 * and the formatter is ignored.
                 *
                 * @type  {Highcharts.SeriesNetworkgraphDataLabelsFormatterCallbackFunction}
                 * @since 7.0.0
                 */
                formatter: function () {
                    return this.key;
                },
                /**
                 * The
                 * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * specifying what to show for _links_ in the networkgraph.
                 * (Default: `undefined`)
                 *
                 * @type      {string}
                 * @since     7.1.0
                 * @apioption plotOptions.networkgraph.dataLabels.linkFormat
                 */
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Callback to format data labels for _links_ in the sankey diagram.
                 * The `linkFormat` option takes precedence over the
                 * `linkFormatter`.
                 *
                 * @type  {Highcharts.SeriesNetworkgraphDataLabelsFormatterCallbackFunction}
                 * @since 7.1.0
                 */
                linkFormatter: function () {
                    return (this.point.fromNode.name +
                        '<br>' +
                        this.point.toNode.name);
                },
                /**
                 * Options for a _link_ label text which should follow link
                 * connection. Border and background are disabled for a label that
                 * follows a path.
                 *
                 * **Note:** Only SVG-based renderer supports this option. Setting
                 * `useHTML` to true will disable this option.
                 *
                 * @extends plotOptions.networkgraph.dataLabels.textPath
                 * @since   7.1.0
                 */
                linkTextPath: {
                    enabled: true
                },
                textPath: {
                    enabled: false
                },
                style: {
                    transition: 'opacity 2000ms'
                },
                defer: true,
                animation: {
                    defer: 1000
                }
            },
            /**
             * Link style options
             * @private
             */
            link: {
                /**
                 * A name for the dash style to use for links.
                 *
                 * @type      {string}
                 * @apioption plotOptions.networkgraph.link.dashStyle
                 */
                /**
                 * Opacity of the link between two nodes.
                 *
                 * @type      {number}
                 * @default   1
                 * @apioption plotOptions.networkgraph.link.opacity
                 */
                /**
                 * Color of the link between two nodes.
                 */
                color: 'rgba(100, 100, 100, 0.5)',
                /**
                 * Width (px) of the link between two nodes.
                 */
                width: 1
            },
            /**
             * Flag to determine if nodes are draggable or not.
             * @private
             */
            draggable: true,
            layoutAlgorithm: {
                /**
                 * Repulsive force applied on a node. Passed are two arguments:
                 * - `d` - which is current distance between two nodes
                 * - `k` - which is desired distance between two nodes
                 *
                 * In `verlet` integration, defaults to:
                 * `function (d, k) { return (k - d) / d * (k > d ? 1 : 0) }`
                 *
                 * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
                 *
                 * @sample highcharts/series-networkgraph/forces/
                 *         Custom forces with Euler integration
                 * @sample highcharts/series-networkgraph/cuboids/
                 *         Custom forces with Verlet integration
                 *
                 * @type      {Function}
                 * @default   function (d, k) { return k * k / d; }
                 * @apioption plotOptions.networkgraph.layoutAlgorithm.repulsiveForce
                 */
                /**
                 * Attraction force applied on a node which is conected to another
                 * node by a link. Passed are two arguments:
                 * - `d` - which is current distance between two nodes
                 * - `k` - which is desired distance between two nodes
                 *
                 * In `verlet` integration, defaults to:
                 * `function (d, k) { return (k - d) / d; }`
                 *
                 * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
                 *
                 * @sample highcharts/series-networkgraph/forces/
                 *         Custom forces with Euler integration
                 * @sample highcharts/series-networkgraph/cuboids/
                 *         Custom forces with Verlet integration
                 *
                 * @type      {Function}
                 * @default   function (d, k) { return k * k / d; }
                 * @apioption plotOptions.networkgraph.layoutAlgorithm.attractiveForce
                 */
                /**
                 * Ideal length (px) of the link between two nodes. When not
                 * defined, length is calculated as:
                 * `Math.pow(availableWidth * availableHeight / nodesLength, 0.4);`
                 *
                 * Note: Because of the algorithm specification, length of each link
                 * might be not exactly as specified.
                 *
                 * @sample highcharts/series-networkgraph/styled-links/
                 *         Numerical values
                 *
                 * @type      {number}
                 * @apioption plotOptions.networkgraph.layoutAlgorithm.linkLength
                 */
                /**
                 * Initial layout algorithm for positioning nodes. Can be one of
                 * built-in options ("circle", "random") or a function where
                 * positions should be set on each node (`this.nodes`) as
                 * `node.plotX` and `node.plotY`
                 *
                 * @sample highcharts/series-networkgraph/initial-positions/
                 *         Initial positions with callback
                 *
                 * @type {"circle"|"random"|Function}
                 */
                initialPositions: 'circle',
                /**
                 * When `initialPositions` are set to 'circle',
                 * `initialPositionRadius` is a distance from the center of circle,
                 * in which nodes are created.
                 *
                 * @type    {number}
                 * @default 1
                 * @since   7.1.0
                 */
                initialPositionRadius: 1,
                /**
                 * Experimental. Enables live simulation of the algorithm
                 * implementation. All nodes are animated as the forces applies on
                 * them.
                 *
                 * @sample highcharts/demo/network-graph/
                 *         Live simulation enabled
                 */
                enableSimulation: false,
                /**
                 * Barnes-Hut approximation only.
                 * Deteremines when distance between cell and node is small enough
                 * to caculate forces. Value of `theta` is compared directly with
                 * quotient `s / d`, where `s` is the size of the cell, and `d` is
                 * distance between center of cell's mass and currently compared
                 * node.
                 *
                 * @see [layoutAlgorithm.approximation](#series.networkgraph.layoutAlgorithm.approximation)
                 *
                 * @since 7.1.0
                 */
                theta: 0.5,
                /**
                 * Verlet integration only.
                 * Max speed that node can get in one iteration. In terms of
                 * simulation, it's a maximum translation (in pixels) that node can
                 * move (in both, x and y, dimensions). While `friction` is applied
                 * on all nodes, max speed is applied only for nodes that move very
                 * fast, for example small or disconnected ones.
                 *
                 * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
                 * @see [layoutAlgorithm.friction](#series.networkgraph.layoutAlgorithm.friction)
                 *
                 * @since 7.1.0
                 */
                maxSpeed: 10,
                /**
                 * Approximation used to calculate repulsive forces affecting nodes.
                 * By default, when calculateing net force, nodes are compared
                 * against each other, which gives O(N^2) complexity. Using
                 * Barnes-Hut approximation, we decrease this to O(N log N), but the
                 * resulting graph will have different layout. Barnes-Hut
                 * approximation divides space into rectangles via quad tree, where
                 * forces exerted on nodes are calculated directly for nearby cells,
                 * and for all others, cells are treated as a separate node with
                 * center of mass.
                 *
                 * @see [layoutAlgorithm.theta](#series.networkgraph.layoutAlgorithm.theta)
                 *
                 * @sample highcharts/series-networkgraph/barnes-hut-approximation/
                 *         A graph with Barnes-Hut approximation
                 *
                 * @type       {string}
                 * @validvalue ["barnes-hut", "none"]
                 * @since      7.1.0
                 */
                approximation: 'none',
                /**
                 * Type of the algorithm used when positioning nodes.
                 *
                 * @type       {string}
                 * @validvalue ["reingold-fruchterman"]
                 */
                type: 'reingold-fruchterman',
                /**
                 * Integration type. Available options are `'euler'` and `'verlet'`.
                 * Integration determines how forces are applied on particles. In
                 * Euler integration, force is applied direct as
                 * `newPosition += velocity;`.
                 * In Verlet integration, new position is based on a previous
                 * posittion without velocity:
                 * `newPosition += previousPosition - newPosition`.
                 *
                 * Note that different integrations give different results as forces
                 * are different.
                 *
                 * In Highcharts v7.0.x only `'euler'` integration was supported.
                 *
                 * @sample highcharts/series-networkgraph/integration-comparison/
                 *         Comparison of Verlet and Euler integrations
                 *
                 * @type       {string}
                 * @validvalue ["euler", "verlet"]
                 * @since      7.1.0
                 */
                integration: 'euler',
                /**
                 * Max number of iterations before algorithm will stop. In general,
                 * algorithm should find positions sooner, but when rendering huge
                 * number of nodes, it is recommended to increase this value as
                 * finding perfect graph positions can require more time.
                 */
                maxIterations: 1000,
                /**
                 * Gravitational const used in the barycenter force of the
                 * algorithm.
                 *
                 * @sample highcharts/series-networkgraph/forces/
                 *         Custom forces with Euler integration
                 */
                gravitationalConstant: 0.0625,
                /**
                 * Friction applied on forces to prevent nodes rushing to fast to
                 * the desired positions.
                 */
                friction: -0.981
            },
            showInLegend: false
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
         * Fires after the simulation is ended and the layout is stable.
         *
         * @type      {Highcharts.NetworkgraphAfterSimulationCallbackFunction}
         * @product   highcharts
         * @apioption series.networkgraph.events.afterSimulation
         */
        /**
         * A `networkgraph` series. If the [type](#series.networkgraph.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.networkgraph
         * @excluding boostThreshold, animation, animationLimit, connectEnds,
         *            connectNulls, cropThreshold, dragDrop, getExtremesFromAll, label,
         *            linecap, negativeColor, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointStart, softThreshold, stack, stacking,
         *            step, threshold, xAxis, yAxis, zoneAxis, dataSorting,
         *            boostBlending
         * @product   highcharts
         * @requires  modules/networkgraph
         * @apioption series.networkgraph
         */
        /**
         * An array of data points for the series. For the `networkgraph` series type,
         * points can be given in the following way:
         *
         * An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of
         * data points exceeds the series'
         * [turboThreshold](#series.area.turboThreshold), this option is not available.
         *
         *  ```js
         *     data: [{
         *         from: 'Category1',
         *         to: 'Category2'
         *     }, {
         *         from: 'Category1',
         *         to: 'Category3'
         *     }]
         *  ```
         *
         * @type      {Array<Object|Array|number>}
         * @extends   series.line.data
         * @excluding drilldown,marker,x,y,draDrop
         * @sample    {highcharts} highcharts/chart/reflow-true/
         *            Numerical values
         * @sample    {highcharts} highcharts/series/data-array-of-arrays/
         *            Arrays of numeric x and y
         * @sample    {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *            Arrays of datetime x and y
         * @sample    {highcharts} highcharts/series/data-array-of-name-value/
         *            Arrays of point.name and y
         * @sample    {highcharts} highcharts/series/data-array-of-objects/
         *            Config objects
         * @product   highcharts
         * @apioption series.networkgraph.data
         */
        /**
         * @type      {Highcharts.SeriesNetworkgraphDataLabelsOptionsObject|Array<Highcharts.SeriesNetworkgraphDataLabelsOptionsObject>}
         * @product   highcharts
         * @apioption series.networkgraph.data.dataLabels
         */
        /**
         * The node that the link runs from.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.networkgraph.data.from
         */
        /**
         * The node that the link runs to.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.networkgraph.data.to
         */
        /**
         * A collection of options for the individual nodes. The nodes in a
         * networkgraph diagram are auto-generated instances of `Highcharts.Point`,
         * but options can be applied here and linked by the `id`.
         *
         * @sample highcharts/series-networkgraph/data-options/
         *         Networkgraph diagram with node options
         *
         * @type      {Array<*>}
         * @product   highcharts
         * @apioption series.networkgraph.nodes
         */
        /**
         * The id of the auto-generated node, refering to the `from` or `to` setting of
         * the link.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.networkgraph.nodes.id
         */
        /**
         * The color of the auto generated node.
         *
         * @type      {Highcharts.ColorString}
         * @product   highcharts
         * @apioption series.networkgraph.nodes.color
         */
        /**
         * The color index of the auto generated node, especially for use in styled
         * mode.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.networkgraph.nodes.colorIndex
         */
        /**
         * The name to display for the node in data labels and tooltips. Use this when
         * the name is different from the `id`. Where the id must be unique for each
         * node, this is not necessary for the name.
         *
         * @sample highcharts/series-networkgraph/data-options/
         *         Networkgraph diagram with node options
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.networkgraph.nodes.name
         */
        /**
         * Mass of the node. By default, each node has mass equal to it's marker radius
         * . Mass is used to determine how two connected nodes should affect
         * each other:
         *
         * Attractive force is multiplied by the ratio of two connected
         * nodes; if a big node has weights twice as the small one, then the small one
         * will move towards the big one twice faster than the big one to the small one
         * .
         *
         * @sample highcharts/series-networkgraph/ragdoll/
         *         Mass determined by marker.radius
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.networkgraph.nodes.mass
         */
        /**
         * Options for the node markers.
         *
         * @extends   plotOptions.networkgraph.marker
         * @apioption series.networkgraph.nodes.marker
         */
        /**
         * Individual data label for each node. The options are the same as
         * the ones for [series.networkgraph.dataLabels](#series.networkgraph.dataLabels).
         *
         * @type      {Highcharts.SeriesNetworkgraphDataLabelsOptionsObject|Array<Highcharts.SeriesNetworkgraphDataLabelsOptionsObject>}
         *
         * @apioption series.networkgraph.nodes.dataLabels
         */
        ''; // adds doclets above to transpiled file

        return NetworkgraphSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Networkgraph/EulerIntegration.js', [], function () {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
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
        function attractive(link, force, distanceXY, distanceR) {
            const massFactor = link.getMass(), translatedX = (distanceXY.x / distanceR) * force, translatedY = (distanceXY.y / distanceR) * force;
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
        }
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
        function attractiveForceFunction(d, k) {
            return d * d / k;
        }
        /**
         * Barycenter force. Calculate and applys barycenter forces on the
         * nodes. Making them closer to the center of their barycenter point.
         *
         * In Euler integration, force is stored in a node, not changing it's
         * position. Later, in `integrate()` forces are applied on nodes.
         *
         * @private
         */
        function barycenter() {
            const gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
            this.nodes.forEach(function (node) {
                if (!node.fixedPosition) {
                    const degree = node.getDegree(), phi = degree * (1 + degree / 2);
                    node.dispX += ((xFactor - node.plotX) *
                        gravitationalConstant *
                        phi / node.degree);
                    node.dispY += ((yFactor - node.plotY) *
                        gravitationalConstant *
                        phi / node.degree);
                }
            });
        }
        /**
         * Estiamte the best possible distance between two nodes, making graph
         * readable.
         * @private
         */
        function getK(layout) {
            return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.3);
        }
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
        function integrate(layout, node) {
            let distanceR;
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
        }
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
        function repulsive(node, force, distanceXY, distanceR) {
            node.dispX +=
                (distanceXY.x / distanceR) * force / node.degree;
            node.dispY +=
                (distanceXY.y / distanceR) * force / node.degree;
        }
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
        function repulsiveForceFunction(d, k) {
            return k * k / d;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const EulerIntegration = {
            attractive,
            attractiveForceFunction,
            barycenter,
            getK,
            integrate,
            repulsive,
            repulsiveForceFunction
        };

        return EulerIntegration;
    });
    _registerModule(_modules, 'Series/Networkgraph/QuadTreeNode.js', [], function () {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * The QuadTree node class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTreeNode
         *
         * @param {Highcharts.Dictionary<number>} box
         *        Available space for the node
         */
        class QuadTreeNode {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(box) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                /**
                 * Read only. If QuadTreeNode is an external node, Point is stored in
                 * `this.body`.
                 *
                 * @name Highcharts.QuadTreeNode#body
                 * @type {boolean|Highcharts.Point}
                 */
                this.body = false;
                /**
                 * Read only. Internal nodes when created are empty to reserve the
                 * space. If Point is added to this QuadTreeNode, QuadTreeNode is no
                 * longer empty.
                 *
                 * @name Highcharts.QuadTreeNode#isEmpty
                 * @type {boolean}
                 */
                this.isEmpty = false;
                /**
                 * Read only. Flag to determine if QuadTreeNode is internal (and has
                 * subnodes with mass and central position) or external (bound to
                 * Point).
                 *
                 * @name Highcharts.QuadTreeNode#isInternal
                 * @type {boolean}
                 */
                this.isInternal = false;
                /**
                 * Read only. Array of subnodes. Empty if QuadTreeNode has just one
                 * Point. When added another Point to this QuadTreeNode, array is
                 * filled with four subnodes.
                 *
                 * @name Highcharts.QuadTreeNode#nodes
                 * @type {Array<Highcharts.QuadTreeNode>}
                 */
                this.nodes = [];
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
            }
            /* *
             *
             *  Functions
             *
             * */
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
            divideBox() {
                const halfWidth = this.box.width / 2, halfHeight = this.box.height / 2;
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
            }
            /**
             * Determine which of the quadrants should be used when placing node in
             * the QuadTree. Returned index is always in range `< 0 , 3 >`.
             * @private
             */
            getBoxPosition(point) {
                const left = point.plotX < this.box.left + this.box.width / 2, top = point.plotY < this.box.top + this.box.height / 2;
                let index;
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
            /**
             * Insert recursively point(node) into the QuadTree. If the given
             * quadrant is already occupied, divide it into smaller quadrants.
             *
             * @param {Highcharts.Point} point
             *        Point/node to be inserted
             * @param {number} depth
             *        Max depth of the QuadTree
             */
            insert(point, depth) {
                let newQuadTreeNode;
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
                                top: point.plotX || NaN,
                                left: point.plotY || NaN,
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
            }
            /**
             * Each quad node requires it's mass and center position. That mass and
             * position is used to imitate real node in the layout by approximation.
             */
            updateMassAndCenter() {
                let mass = 0, plotX = 0, plotY = 0;
                if (this.isInternal) {
                    // Calcualte weightened mass of the quad node:
                    for (const pointMass of this.nodes) {
                        if (!pointMass.isEmpty) {
                            mass += pointMass.mass;
                            plotX += pointMass.plotX * pointMass.mass;
                            plotY += pointMass.plotY * pointMass.mass;
                        }
                    }
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
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return QuadTreeNode;
    });
    _registerModule(_modules, 'Series/Networkgraph/QuadTree.js', [_modules['Series/Networkgraph/QuadTreeNode.js']], function (QuadTreeNode) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTree
         *
         * @param {number} x
         *        Left position of the plotting area
         * @param {number} y
         *        Top position of the plotting area
         * @param {number} width
         *        Width of the plotting area
         * @param {number} height
         *        Height of the plotting area
         */
        class QuadTree {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(x, y, width, height) {
                // Boundary rectangle:
                this.box = {
                    left: x,
                    top: y,
                    width: width,
                    height: height
                };
                this.maxDepth = 25;
                this.root = new QuadTreeNode(this.box);
                this.root.isInternal = true;
                this.root.isRoot = true;
                this.root.divideBox();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Calculate mass of the each QuadNode in the tree.
             */
            calculateMassAndCenter() {
                this.visitNodeRecursive(null, null, function (node) {
                    node.updateMassAndCenter();
                });
            }
            /**
             * Insert nodes into the QuadTree
             *
             * @param {Array<Highcharts.Point>} points
             *        Points as nodes
             */
            insertNodes(points) {
                for (const point of points) {
                    this.root.insert(point, this.maxDepth);
                }
            }
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
             *        QuadTree node
             * @param {Function} [beforeCallback]
             *        Function to be called before visiting children nodes.
             * @param {Function} [afterCallback]
             *        Function to be called after visiting children nodes.
             */
            visitNodeRecursive(node, beforeCallback, afterCallback) {
                let goFurther;
                if (!node) {
                    node = this.root;
                }
                if (node === this.root && beforeCallback) {
                    goFurther = beforeCallback(node);
                }
                if (goFurther === false) {
                    return;
                }
                for (const qtNode of node.nodes) {
                    if (qtNode.isInternal) {
                        if (beforeCallback) {
                            goFurther = beforeCallback(qtNode);
                        }
                        if (goFurther === false) {
                            continue;
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
                }
                if (node === this.root && afterCallback) {
                    afterCallback(node);
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return QuadTree;
    });
    _registerModule(_modules, 'Series/Networkgraph/VerletIntegration.js', [], function () {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
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
        function attractive(link, force, distanceXY) {
            const massFactor = link.getMass(), translatedX = -distanceXY.x * force * this.diffTemperature, translatedY = -distanceXY.y * force * this.diffTemperature;
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
        }
        /**
         * Attractive force funtion. Can be replaced by API's
         * `layoutAlgorithm.attractiveForce`
         *
         * @private
         * @param {number} d current distance between two nodes
         * @param {number} k expected distance between two nodes
         * @return {number} force
         */
        function attractiveForceFunction(d, k) {
            // Used in API:
            return (k - d) / d;
        }
        /**
         * Barycenter force. Calculate and applys barycenter forces on the
         * nodes. Making them closer to the center of their barycenter point.
         *
         * In Verlet integration, force is applied on a node immidatelly to it's
         * `plotX` and `plotY` position.
         *
         * @private
         */
        function barycenter() {
            let gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
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
        }
        /**
         * Estiamte the best possible distance between two nodes, making graph
         * readable.
         * @private
         */
        function getK(layout) {
            return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.5);
        }
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
        function integrate(layout, node) {
            let friction = -layout.options.friction, maxSpeed = layout.options.maxSpeed, prevX = node.prevX, prevY = node.prevY, 
            // Apply friciton:
            diffX = ((node.plotX + node.dispX -
                prevX) * friction), diffY = ((node.plotY + node.dispY -
                prevY) * friction), abs = Math.abs, signX = abs(diffX) / (diffX || 1), // need to deal with 0
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
        }
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
        function repulsive(node, force, distanceXY) {
            const factor = force * this.diffTemperature / node.mass / node.degree;
            if (!node.fixedPosition) {
                node.plotX += distanceXY.x * factor;
                node.plotY += distanceXY.y * factor;
            }
        }
        /**
         * Repulsive force funtion. Can be replaced by API's
         * `layoutAlgorithm.repulsiveForce`
         *
         * @private
         * @param {number} d current distance between two nodes
         * @param {number} k expected distance between two nodes
         * @return {number} force
         */
        function repulsiveForceFunction(d, k) {
            // Used in API:
            return (k - d) / d * (k > d ? 1 : 0); // Force only for close nodes
        }
        /* *
         *
         *  Default Export
         *
         * */
        const VerletIntegration = {
            attractive,
            attractiveForceFunction,
            barycenter,
            getK,
            integrate,
            repulsive,
            repulsiveForceFunction
        };

        return VerletIntegration;
    });
    _registerModule(_modules, 'Series/Networkgraph/ReingoldFruchtermanLayout.js', [_modules['Series/Networkgraph/EulerIntegration.js'], _modules['Core/Globals.js'], _modules['Series/GraphLayoutComposition.js'], _modules['Series/Networkgraph/QuadTree.js'], _modules['Core/Utilities.js'], _modules['Series/Networkgraph/VerletIntegration.js']], function (EulerIntegration, H, GraphLayout, QuadTree, U, VerletIntegration) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { win } = H;
        const { clamp, defined, isFunction, fireEvent, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Reingold-Fruchterman algorithm from
         * "Graph Drawing by Force-directed Placement" paper.
         * @private
         */
        class ReingoldFruchtermanLayout {
            constructor() {
                /* *
                 *
                 *  Static Functions
                 *
                 * */
                this.box = {};
                this.currentStep = 0;
                this.initialRendering = true;
                this.links = [];
                this.nodes = [];
                this.series = [];
                this.simulation = false;
            }
            static compose(ChartClass) {
                GraphLayout.compose(ChartClass);
                GraphLayout.integrations.euler = EulerIntegration;
                GraphLayout.integrations.verlet = VerletIntegration;
                GraphLayout.layouts['reingold-fruchterman'] =
                    ReingoldFruchtermanLayout;
            }
            init(options) {
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
                    GraphLayout.integrations[options.integration];
                this.enableSimulation = options.enableSimulation;
                this.attractiveForce = pick(options.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = pick(options.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = options.approximation;
            }
            updateSimulation(enable) {
                this.enableSimulation = pick(enable, this.options.enableSimulation);
            }
            start() {
                const layout = this, series = this.series, options = this.options;
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
            }
            step() {
                const anyLayout = this, allSeries = this.series;
                // Algorithm:
                this.currentStep++;
                if (this.approximation === 'barnes-hut') {
                    this.createQuadTree();
                    this.quadTree.calculateMassAndCenter();
                }
                for (const forceName of this.forces || []) {
                    anyLayout[forceName + 'Forces'](this.temperature);
                }
                // Limit to the plotting area and cool down:
                this.applyLimits();
                // Cool down the system:
                this.temperature = this.coolDown(this.startTemperature, this.diffTemperature, this.currentStep);
                this.prevSystemTemperature = this.systemTemperature;
                this.systemTemperature = this.getSystemTemperature();
                if (this.enableSimulation) {
                    for (const series of allSeries) {
                        // Chart could be destroyed during the simulation
                        if (series.chart) {
                            series.render();
                        }
                    }
                    if (this.maxIterations-- &&
                        isFinite(this.temperature) &&
                        !this.isStable()) {
                        if (this.simulation) {
                            win.cancelAnimationFrame(this.simulation);
                        }
                        this.simulation = win.requestAnimationFrame(() => this.step());
                    }
                    else {
                        this.simulation = false;
                        this.series.forEach((s) => {
                            fireEvent(s, 'afterSimulation');
                        });
                    }
                }
            }
            stop() {
                if (this.simulation) {
                    win.cancelAnimationFrame(this.simulation);
                }
            }
            setArea(x, y, w, h) {
                this.box = {
                    left: x,
                    top: y,
                    width: w,
                    height: h
                };
            }
            setK() {
                // Optimal distance between nodes,
                // available space around the node:
                this.k = this.options.linkLength || this.integration.getK(this);
            }
            addElementsToCollection(elements, collection) {
                for (const element of elements) {
                    if (collection.indexOf(element) === -1) {
                        collection.push(element);
                    }
                }
            }
            removeElementFromCollection(element, collection) {
                const index = collection.indexOf(element);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
            }
            clear() {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            }
            resetSimulation() {
                this.forcedStop = false;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            }
            restartSimulation() {
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
            }
            setMaxIterations(maxIterations) {
                this.maxIterations = pick(maxIterations, this.options.maxIterations);
            }
            setTemperature() {
                this.temperature = this.startTemperature =
                    Math.sqrt(this.nodes.length);
            }
            setDiffTemperature() {
                this.diffTemperature = this.startTemperature /
                    (this.options.maxIterations + 1);
            }
            setInitialRendering(enable) {
                this.initialRendering = enable;
            }
            createQuadTree() {
                this.quadTree = new QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            }
            initPositions() {
                const initialPositions = this.options.initialPositions;
                if (isFunction(initialPositions)) {
                    initialPositions.call(this);
                    for (const node of this.nodes) {
                        if (!defined(node.prevX)) {
                            node.prevX = node.plotX;
                        }
                        if (!defined(node.prevY)) {
                            node.prevY = node.plotY;
                        }
                        node.dispX = 0;
                        node.dispY = 0;
                    }
                }
                else if (initialPositions === 'circle') {
                    this.setCircularPositions();
                }
                else {
                    this.setRandomPositions();
                }
            }
            setCircularPositions() {
                const box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, rootNodes = nodes.filter(function (node) {
                    return node.linksTo.length === 0;
                }), visitedNodes = {}, radius = this.options.initialPositionRadius, addToNodes = (node) => {
                    for (const link of node.linksFrom || []) {
                        if (!visitedNodes[link.toNode.id]) {
                            visitedNodes[link.toNode.id] = true;
                            sortedNodes.push(link.toNode);
                            addToNodes(link.toNode);
                        }
                    }
                };
                let sortedNodes = [];
                // Start with identified root nodes an sort the nodes by their
                // hierarchy. In trees, this ensures that branches don't cross
                // eachother.
                for (const rootNode of rootNodes) {
                    sortedNodes.push(rootNode);
                    addToNodes(rootNode);
                }
                // Cyclic tree, no root node found
                if (!sortedNodes.length) {
                    sortedNodes = nodes;
                    // Dangling, cyclic trees
                }
                else {
                    for (const node of nodes) {
                        if (sortedNodes.indexOf(node) === -1) {
                            sortedNodes.push(node);
                        }
                    }
                }
                let node;
                // Initial positions are laid out along a small circle, appearing
                // as a cluster in the middle
                for (let i = 0, iEnd = sortedNodes.length; i < iEnd; ++i) {
                    node = sortedNodes[i];
                    node.plotX = node.prevX = pick(node.plotX, box.width / 2 + radius * Math.cos(i * angle));
                    node.plotY = node.prevY = pick(node.plotY, box.height / 2 + radius * Math.sin(i * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                }
            }
            setRandomPositions() {
                const box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, 
                /**
                 * Return a repeatable, quasi-random number based on an integer
                 * input. For the initial positions
                 * @private
                 */
                unrandom = (n) => {
                    let rand = n * n / Math.PI;
                    rand = rand - Math.floor(rand);
                    return rand;
                };
                let node;
                // Initial positions:
                for (let i = 0, iEnd = nodes.length; i < iEnd; ++i) {
                    node = nodes[i];
                    node.plotX = node.prevX = pick(node.plotX, box.width * unrandom(i));
                    node.plotY = node.prevY = pick(node.plotY, box.height * unrandom(nodesLength + i));
                    node.dispX = 0;
                    node.dispY = 0;
                }
            }
            force(name, ...args) {
                this.integration[name].apply(this, args);
            }
            barycenterForces() {
                this.getBarycenter();
                this.force('barycenter');
            }
            getBarycenter() {
                let systemMass = 0, cx = 0, cy = 0;
                for (const node of this.nodes) {
                    cx += node.plotX * node.mass;
                    cy += node.plotY * node.mass;
                    systemMass += node.mass;
                }
                this.barycenter = {
                    x: cx,
                    y: cy,
                    xFactor: cx / systemMass,
                    yFactor: cy / systemMass
                };
                return this.barycenter;
            }
            barnesHutApproximation(node, quadNode) {
                const distanceXY = this.getDistXY(node, quadNode), distanceR = this.vectorLength(distanceXY);
                let goDeeper, force;
                if (node !== quadNode && distanceR !== 0) {
                    if (quadNode.isInternal) {
                        // Internal node:
                        if (quadNode.boxSize / distanceR <
                            this.options.theta &&
                            distanceR !== 0) {
                            // Treat as an external node:
                            force = this.repulsiveForce(distanceR, this.k);
                            this.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                            goDeeper = false;
                        }
                        else {
                            // Go deeper:
                            goDeeper = true;
                        }
                    }
                    else {
                        // External node, direct force:
                        force = this.repulsiveForce(distanceR, this.k);
                        this.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                    }
                }
                return goDeeper;
            }
            repulsiveForces() {
                if (this.approximation === 'barnes-hut') {
                    for (const node of this.nodes) {
                        this.quadTree.visitNodeRecursive(null, (quadNode) => (this.barnesHutApproximation(node, quadNode)));
                    }
                }
                else {
                    let force, distanceR, distanceXY;
                    for (const node of this.nodes) {
                        for (const repNode of this.nodes) {
                            if (
                            // Node cannot repulse itself:
                            node !== repNode &&
                                // Only close nodes affect each other:
                                // layout.getDistR(node, repNode) < 2 * k &&
                                // Not dragged:
                                !node.fixedPosition) {
                                distanceXY = this.getDistXY(node, repNode);
                                distanceR = this.vectorLength(distanceXY);
                                if (distanceR !== 0) {
                                    force = this.repulsiveForce(distanceR, this.k);
                                    this.force('repulsive', node, force * repNode.mass, distanceXY, distanceR);
                                }
                            }
                        }
                    }
                }
            }
            attractiveForces() {
                let distanceXY, distanceR, force;
                for (const link of this.links) {
                    if (link.fromNode && link.toNode) {
                        distanceXY = this.getDistXY(link.fromNode, link.toNode);
                        distanceR = this.vectorLength(distanceXY);
                        if (distanceR !== 0) {
                            force = this.attractiveForce(distanceR, this.k);
                            this.force('attractive', link, force, distanceXY, distanceR);
                        }
                    }
                }
            }
            applyLimits() {
                const nodes = this.nodes;
                for (const node of nodes) {
                    if (node.fixedPosition) {
                        return;
                    }
                    this.integration.integrate(this, node);
                    this.applyLimitBox(node, this.box);
                    // Reset displacement:
                    node.dispX = 0;
                    node.dispY = 0;
                }
            }
            /**
             * External box that nodes should fall. When hitting an edge, node
             * should stop or bounce.
             * @private
             */
            applyLimitBox(node, box) {
                const radius = node.radius;
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
            }
            /**
             * From "A comparison of simulated annealing cooling strategies" by
             * Nourani and Andresen work.
             * @private
             */
            coolDown(temperature, temperatureStep, currentStep) {
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
            }
            isStable() {
                return Math.abs(this.systemTemperature -
                    this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
            }
            getSystemTemperature() {
                let value = 0;
                for (const node of this.nodes) {
                    value += node.temperature;
                }
                return value;
            }
            vectorLength(vector) {
                return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            }
            getDistR(nodeA, nodeB) {
                const distance = this.getDistXY(nodeA, nodeB);
                return this.vectorLength(distance);
            }
            getDistXY(nodeA, nodeB) {
                const xDist = nodeA.plotX - nodeB.plotX, yDist = nodeA.plotY - nodeB.plotY;
                return {
                    x: xDist,
                    y: yDist,
                    absX: Math.abs(xDist),
                    absY: Math.abs(yDist)
                };
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return ReingoldFruchtermanLayout;
    });
    _registerModule(_modules, 'Series/SimulationSeriesUtilities.js', [_modules['Core/Utilities.js'], _modules['Core/Animation/AnimationUtilities.js']], function (U, A) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { merge, syncTimeout } = U;
        const { animObject } = A;
        /**
         * Create a setTimeout for the first drawDataLabels()
         * based on the dataLabels.animation.defer value
         * for series which have enabled simulation.
         * @private
         */
        function initDataLabelsDefer() {
            const dlOptions = this.options.dataLabels;
            // Method drawDataLabels() fires for the first time after
            // dataLabels.animation.defer time unless
            // the dataLabels.animation = false or dataLabels.defer = false
            // or if the simulation is disabled
            if (!dlOptions?.defer ||
                !this.options.layoutAlgorithm?.enableSimulation) {
                this.deferDataLabels = false;
            }
            else {
                syncTimeout(() => {
                    this.deferDataLabels = false;
                }, dlOptions ? animObject(dlOptions.animation).defer : 0);
            }
        }
        /**
         * Initialize the SVG group for the DataLabels with correct opacities
         * and correct styles so that the animation for the series that have
         * simulation enabled works fine.
         * @private
         */
        function initDataLabels() {
            const series = this, dlOptions = series.options.dataLabels;
            if (!series.dataLabelsGroup) {
                const dataLabelsGroup = this.initDataLabelsGroup();
                // Apply the dataLabels.style not only to the
                // individual dataLabels but also to the entire group
                if (!series.chart.styledMode && dlOptions?.style) {
                    dataLabelsGroup.css(dlOptions.style);
                }
                // Initialize the opacity of the group to 0 (start of animation)
                dataLabelsGroup.attr({ opacity: 0 });
                if (series.visible) { // #2597, #3023, #3024
                    dataLabelsGroup.show();
                }
                return dataLabelsGroup;
            }
            // Place it on first and subsequent (redraw) calls
            series.dataLabelsGroup.attr(merge({ opacity: 1 }, this.getPlotBox('data-labels')));
            return series.dataLabelsGroup;
        }
        const DataLabelsDeferUtils = {
            initDataLabels,
            initDataLabelsDefer
        };

        return DataLabelsDeferUtils;
    });
    _registerModule(_modules, 'Series/Networkgraph/NetworkgraphSeries.js', [_modules['Series/DragNodesComposition.js'], _modules['Series/GraphLayoutComposition.js'], _modules['Core/Globals.js'], _modules['Series/Networkgraph/NetworkgraphPoint.js'], _modules['Series/Networkgraph/NetworkgraphSeriesDefaults.js'], _modules['Series/NodesComposition.js'], _modules['Series/Networkgraph/ReingoldFruchtermanLayout.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Series/SimulationSeriesUtilities.js'], _modules['Core/Utilities.js']], function (DragNodesComposition, GraphLayout, H, NetworkgraphPoint, NetworkgraphSeriesDefaults, NodesComposition, ReingoldFruchtermanLayout, SeriesRegistry, D, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { series: Series, seriesTypes: { column: { prototype: columnProto }, line: { prototype: lineProto } } } = SeriesRegistry;
        const { initDataLabels, initDataLabelsDefer } = D;
        const { addEvent, defined, extend, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.networkgraph
         *
         * @extends Highcharts.Series
         */
        class NetworkgraphSeries extends Series {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.deferDataLabels = true;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(ChartClass) {
                DragNodesComposition.compose(ChartClass);
                ReingoldFruchtermanLayout.compose(ChartClass);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Defer the layout.
             * Each series first registers all nodes and links, then layout
             * calculates all nodes positions and calls `series.render()` in every
             * simulation step.
             *
             * Note:
             * Animation is done through `requestAnimationFrame` directly, without
             * `Highcharts.animate()` use.
             * @private
             */
            deferLayout() {
                let layoutOptions = this.options.layoutAlgorithm, graphLayoutsStorage = this.chart.graphLayoutsStorage, graphLayoutsLookup = this.chart.graphLayoutsLookup, chartOptions = this.chart.options.chart, layout;
                if (!this.visible) {
                    return;
                }
                if (!graphLayoutsStorage) {
                    this.chart.graphLayoutsStorage = graphLayoutsStorage = {};
                    this.chart.graphLayoutsLookup = graphLayoutsLookup = [];
                }
                layout = graphLayoutsStorage[layoutOptions.type];
                if (!layout) {
                    layoutOptions.enableSimulation =
                        !defined(chartOptions.forExport) ?
                            layoutOptions.enableSimulation :
                            !chartOptions.forExport;
                    graphLayoutsStorage[layoutOptions.type] = layout =
                        new GraphLayout.layouts[layoutOptions.type]();
                    layout.init(layoutOptions);
                    graphLayoutsLookup.splice(layout.index, 0, layout);
                }
                this.layout = layout;
                layout.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                layout.addElementsToCollection([this], layout.series);
                layout.addElementsToCollection(this.nodes, layout.nodes);
                layout.addElementsToCollection(this.points, layout.links);
            }
            /**
             * @private
             */
            destroy() {
                if (this.layout) {
                    this.layout.removeElementFromCollection(this, this.layout.series);
                }
                NodesComposition.destroy.call(this);
            }
            /**
             * Networkgraph has two separate collecions of nodes and lines, render
             * dataLabels for both sets:
             * @private
             */
            drawDataLabels() {
                // We defer drawing the dataLabels
                // until dataLabels.animation.defer time passes
                if (this.deferDataLabels) {
                    return;
                }
                const dlOptions = this.options.dataLabels;
                let textPath;
                if (dlOptions?.textPath) {
                    textPath = dlOptions.textPath;
                }
                // Render node labels:
                Series.prototype.drawDataLabels.call(this, this.nodes);
                // Render link labels:
                if (dlOptions?.linkTextPath) {
                    // If linkTextPath is set, render link labels with linkTextPath
                    dlOptions.textPath = dlOptions.linkTextPath;
                }
                Series.prototype.drawDataLabels.call(this, this.data);
                // Go back to textPath for nodes
                if (dlOptions?.textPath) {
                    dlOptions.textPath = textPath;
                }
            }
            /**
             * Extend generatePoints by adding the nodes, which are Point objects
             * but pushed to the this.nodes array.
             * @private
             */
            generatePoints() {
                let node, i;
                NodesComposition.generatePoints.apply(this, arguments);
                // In networkgraph, it's fine to define stanalone nodes, create
                // them:
                if (this.options.nodes) {
                    this.options.nodes.forEach(function (nodeOptions) {
                        if (!this.nodeLookup[nodeOptions.id]) {
                            this.nodeLookup[nodeOptions.id] =
                                this.createNode(nodeOptions.id);
                        }
                    }, this);
                }
                for (i = this.nodes.length - 1; i >= 0; i--) {
                    node = this.nodes[i];
                    node.degree = node.getDegree();
                    node.radius = pick(node.marker && node.marker.radius, this.options.marker && this.options.marker.radius, 0);
                    // If node exists, but it's not available in nodeLookup,
                    // then it's leftover from previous runs (e.g. setData)
                    if (!this.nodeLookup[node.id]) {
                        node.remove();
                    }
                }
                this.data.forEach(function (link) {
                    link.formatPrefix = 'link';
                });
                this.indexateNodes();
            }
            /**
             * In networkgraph, series.points refers to links,
             * but series.nodes refers to actual points.
             * @private
             */
            getPointsCollection() {
                return this.nodes || [];
            }
            /**
             * Set index for each node. Required for proper `node.update()`.
             * Note that links are indexated out of the box in `generatePoints()`.
             *
             * @private
             */
            indexateNodes() {
                this.nodes.forEach(function (node, index) {
                    node.index = index;
                });
            }
            /**
             * Extend init with base event, which should stop simulation during
             * update. After data is updated, `chart.render` resumes the simulation.
             * @private
             */
            init(chart, options) {
                super.init(chart, options);
                initDataLabelsDefer.call(this);
                addEvent(this, 'updatedData', () => {
                    if (this.layout) {
                        this.layout.stop();
                    }
                });
                addEvent(this, 'afterUpdate', () => {
                    this.nodes.forEach((node) => {
                        if (node && node.series) {
                            node.resolveColor();
                        }
                    });
                });
                // If the dataLabels.animation.defer time is longer than
                // the time it takes for the layout to become stable then
                // drawDataLabels would never be called (that's why we force it here)
                addEvent(this, 'afterSimulation', function () {
                    this.deferDataLabels = false;
                    this.drawDataLabels();
                });
                return this;
            }
            /**
             * Extend the default marker attribs by using a non-rounded X position,
             * otherwise the nodes will jump from pixel to pixel which looks a bit
             * jaggy when approaching equilibrium.
             * @private
             */
            markerAttribs(point, state) {
                const attribs = Series.prototype.markerAttribs.call(this, point, state);
                // series.render() is called before initial positions are set:
                if (!defined(point.plotY)) {
                    attribs.y = 0;
                }
                attribs.x = (point.plotX || 0) - (attribs.width || 0) / 2;
                return attribs;
            }
            /**
             * Return the presentational attributes.
             * @private
             */
            pointAttribs(point, state) {
                // By default, only `selected` state is passed on
                let pointState = state || point && point.state || 'normal', attribs = Series.prototype.pointAttribs.call(this, point, pointState), stateOptions = this.options.states[pointState];
                if (point && !point.isNode) {
                    attribs = point.getLinkAttributes();
                    // For link, get prefixed names:
                    if (stateOptions) {
                        attribs = {
                            // TO DO: API?
                            stroke: stateOptions.linkColor || attribs.stroke,
                            dashstyle: (stateOptions.linkDashStyle || attribs.dashstyle),
                            opacity: pick(stateOptions.linkOpacity, attribs.opacity),
                            'stroke-width': stateOptions.linkColor ||
                                attribs['stroke-width']
                        };
                    }
                }
                return attribs;
            }
            /**
             * Extend the render function to also render this.nodes together with
             * the points.
             * @private
             */
            render() {
                const series = this, points = series.points, hoverPoint = series.chart.hoverPoint, dataLabels = [];
                // Render markers:
                series.points = series.nodes;
                lineProto.render.call(this);
                series.points = points;
                points.forEach(function (point) {
                    if (point.fromNode && point.toNode) {
                        point.renderLink();
                        point.redrawLink();
                    }
                });
                if (hoverPoint && hoverPoint.series === series) {
                    series.redrawHalo(hoverPoint);
                }
                if (series.chart.hasRendered &&
                    !series.options.dataLabels.allowOverlap) {
                    series.nodes.concat(series.points).forEach(function (node) {
                        if (node.dataLabel) {
                            dataLabels.push(node.dataLabel);
                        }
                    });
                    series.chart.hideOverlappingLabels(dataLabels);
                }
            }
            /**
             * When state should be passed down to all points, concat nodes and
             * links and apply this state to all of them.
             * @private
             */
            setState(state, inherit) {
                if (inherit) {
                    this.points = this.nodes.concat(this.data);
                    Series.prototype.setState.apply(this, arguments);
                    this.points = this.data;
                }
                else {
                    Series.prototype.setState.apply(this, arguments);
                }
                // If simulation is done, re-render points with new states:
                if (!this.layout.simulation && !state) {
                    this.render();
                }
            }
            /**
             * Run pre-translation and register nodes&links to the deffered layout.
             * @private
             */
            translate() {
                if (!this.processedXData) {
                    this.processData();
                }
                this.generatePoints();
                this.deferLayout();
                this.nodes.forEach(function (node) {
                    // Draw the links from this node
                    node.isInside = true;
                    node.linksFrom.forEach(function (point) {
                        point.shapeType = 'path';
                        // Pass test in drawPoints
                        point.y = 1;
                    });
                });
            }
        }
        NetworkgraphSeries.defaultOptions = merge(Series.defaultOptions, NetworkgraphSeriesDefaults);
        extend(NetworkgraphSeries.prototype, {
            pointClass: NetworkgraphPoint,
            animate: void 0,
            directTouch: true,
            drawGraph: void 0,
            forces: ['barycenter', 'repulsive', 'attractive'],
            hasDraggableNodes: true,
            isCartesian: false,
            noSharedTooltip: true,
            pointArrayMap: ['from', 'to'],
            requireSorting: false,
            trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
            initDataLabels: initDataLabels,
            buildKDTree: noop,
            createNode: NodesComposition.createNode,
            drawTracker: columnProto.drawTracker,
            onMouseDown: DragNodesComposition.onMouseDown,
            onMouseMove: DragNodesComposition.onMouseMove,
            onMouseUp: DragNodesComposition.onMouseUp,
            redrawHalo: DragNodesComposition.redrawHalo
        });
        SeriesRegistry.registerSeriesType('networkgraph', NetworkgraphSeries);
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
         * @callback Highcharts.SeriesNetworkgraphDataLabelsFormatterCallbackFunction
         *
         * @param {Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject|Highcharts.PointLabelObject} this
         *        Data label context to format
         *
         * @return {string}
         *         Formatted data label text
         */
        /**
         * Context for the formatter function.
         *
         * @interface Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject
         * @extends Highcharts.PointLabelObject
         * @since 7.0.0
         */ /**
        * The color of the node.
        * @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#color
        * @type {Highcharts.ColorString}
        * @since 7.0.0
        */ /**
        * The point (node) object. The node name, if defined, is available through
        * `this.point.name`. Arrays: `this.point.linksFrom` and `this.point.linksTo`
        * contains all nodes connected to this point.
        * @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#point
        * @type {Highcharts.Point}
        * @since 7.0.0
        */ /**
        * The ID of the node.
        * @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#key
        * @type {string}
        * @since 7.0.0
        */
        /**
         * Callback that fires after the end of Networkgraph series simulation
         * when the layout is stable.
         *
         * @callback Highcharts.NetworkgraphAfterSimulationCallbackFunction
         *
         * @param {Highcharts.Series} this
         *        The series where the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        ''; // detach doclets above

        return NetworkgraphSeries;
    });
    _registerModule(_modules, 'masters/modules/networkgraph.src.js', [_modules['Core/Globals.js'], _modules['Series/Networkgraph/NetworkgraphSeries.js']], function (Highcharts, NetworkgraphSeries) {

        const G = Highcharts;
        NetworkgraphSeries.compose(G.Chart);

    });
}));