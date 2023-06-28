/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../Core/Series/SeriesRegistry.js';
const { series: { prototype: seriesProto, prototype: { pointClass: { prototype: pointProto } } } } = SeriesRegistry;
import U from '../Core/Utilities.js';
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
     *  Constants
     *
     * */
    const composedMembers = [];
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(PointClass, SeriesClass) {
        if (U.pushUnique(composedMembers, PointClass)) {
            const pointProto = PointClass.prototype;
            pointProto.setNodeState = setNodeState;
            pointProto.setState = setNodeState;
            pointProto.update = updateNode;
        }
        if (U.pushUnique(composedMembers, SeriesClass)) {
            const seriesProto = SeriesClass.prototype;
            seriesProto.destroy = destroy;
            seriesProto.setData = setData;
        }
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
            const newNode = (new PointClass()).init(this, extend({
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
export default NodesComposition;
