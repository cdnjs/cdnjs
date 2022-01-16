/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Point from '../Core/Series/Point.js';
import Series from '../Core/Series/Series.js';
import U from '../Core/Utilities.js';
var defined = U.defined, extend = U.extend, find = U.find, pick = U.pick;
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
    var composedClasses = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(PointClass, SeriesClass) {
        if (composedClasses.indexOf(PointClass) === -1) {
            composedClasses.push(PointClass);
            var pointProto = PointClass.prototype;
            pointProto.setNodeState = setNodeState;
            pointProto.setState = setNodeState;
        }
        if (composedClasses.indexOf(SeriesClass) === -1) {
            composedClasses.push(SeriesClass);
            var seriesProto = SeriesClass.prototype;
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
        var PointClass = this.pointClass, findById = function (nodes, id) { return find(nodes, function (node) { return node.id === id; }); };
        var node = findById(this.nodes, id), options;
        if (!node) {
            options = this.options.nodes && findById(this.options.nodes, id);
            node = (new PointClass()).init(this, extend({
                className: 'highcharts-node',
                isNode: true,
                id: id,
                y: 1 // Pass isNull test
            }, options));
            node.linksTo = [];
            node.linksFrom = [];
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
            /**
             * Return the largest sum of either the incoming or outgoing links.
             * @private
             */
            node.getSum = function () {
                var sumTo = 0, sumFrom = 0;
                node.linksTo.forEach(function (link) {
                    sumTo += link.weight;
                });
                node.linksFrom.forEach(function (link) {
                    sumFrom += link.weight;
                });
                return Math.max(sumTo, sumFrom);
            };
            /**
             * Get the offset in weight values of a point/link.
             * @private
             */
            node.offset = function (point, coll) {
                var offset = 0;
                for (var i = 0; i < node[coll].length; i++) {
                    if (node[coll][i] === point) {
                        return offset;
                    }
                    offset += node[coll][i].weight;
                }
            };
            // Return true if the node has a shape, otherwise all links are
            // outgoing.
            node.hasShape = function () {
                var outgoing = 0;
                node.linksTo.forEach(function (link) {
                    if (link.outgoing) {
                        outgoing++;
                    }
                });
                return (!node.linksTo.length ||
                    outgoing !== node.linksTo.length);
            };
            this.nodes.push(node);
        }
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
        return Series.prototype.destroy.apply(this, arguments);
    }
    NodesComposition.destroy = destroy;
    /**
     * Extend generatePoints by adding the nodes, which are Point objects
     * but pushed to the this.nodes array.
     */
    function generatePoints() {
        var chart = this.chart, nodeLookup = {};
        Series.prototype.generatePoints.call(this);
        if (!this.nodes) {
            this.nodes = []; // List of Point-like node items
        }
        this.colorCounter = 0;
        // Reset links from previous run
        this.nodes.forEach(function (node) {
            node.linksFrom.length = 0;
            node.linksTo.length = 0;
            node.level = node.options.level;
        });
        // Create the node list and set up links
        this.points.forEach(function (point) {
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
            this.nodes.forEach(function (node) {
                node.destroy();
            });
            this.nodes.length = 0;
        }
        Series.prototype.setData.apply(this, arguments);
    }
    /**
     * When hovering node, highlight all connected links. When hovering a link,
     * highlight all connected nodes.
     */
    function setNodeState(state) {
        var args = arguments, others = this.isNode ? this.linksTo.concat(this.linksFrom) :
            [this.fromNode, this.toNode];
        if (state !== 'select') {
            others.forEach(function (linkOrNode) {
                if (linkOrNode && linkOrNode.series) {
                    Point.prototype.setState.apply(linkOrNode, args);
                    if (!linkOrNode.isNode) {
                        if (linkOrNode.fromNode.graphic) {
                            Point.prototype.setState.apply(linkOrNode.fromNode, args);
                        }
                        if (linkOrNode.toNode && linkOrNode.toNode.graphic) {
                            Point.prototype.setState.apply(linkOrNode.toNode, args);
                        }
                    }
                }
            });
        }
        Point.prototype.setState.apply(this, args);
    }
    NodesComposition.setNodeState = setNodeState;
})(NodesComposition || (NodesComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default NodesComposition;
