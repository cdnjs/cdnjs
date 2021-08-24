/**
 * @license Highcharts JS v9.2.2 (2021-08-24)
 *
 * Force directed graph module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
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
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Mixins/Nodes.js', [_modules['Core/Globals.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (H, Point, Series, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined,
            extend = U.extend,
            find = U.find,
            pick = U.pick;
        var NodesMixin = H.NodesMixin = {
                /* eslint-disable valid-jsdoc */
                /**
                 * Create a single node that holds information on incoming and outgoing
                 * links.
                 * @private
                 */
                createNode: function (id) {
                    /**
                     * @private
                     */
                    function findById(nodes,
            id) {
                        return find(nodes,
            function (node) {
                            return node.id === id;
                    });
                }
                var node = findById(this.nodes,
                    id),
                    PointClass = this.pointClass,
                    options;
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
                    node.name = node.name || node.options.id || ''; // for use in formats
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
                        var sumTo = 0,
                            sumFrom = 0;
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
            },
            /**
             * Extend generatePoints by adding the nodes, which are Point objects
             * but pushed to the this.nodes array.
             */
            generatePoints: function () {
                var chart = this.chart,
                    nodeLookup = {};
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
            },
            // Destroy all nodes on setting new data
            setData: function () {
                if (this.nodes) {
                    this.nodes.forEach(function (node) {
                        node.destroy();
                    });
                    this.nodes.length = 0;
                }
                Series.prototype.setData.apply(this, arguments);
            },
            // Destroy alll nodes and links
            destroy: function () {
                // Nodes must also be destroyed (#8682, #9300)
                this.data = []
                    .concat(this.points || [], this.nodes);
                return Series.prototype.destroy.apply(this, arguments);
            },
            /**
             * When hovering node, highlight all connected links. When hovering a link,
             * highlight all connected nodes.
             */
            setNodeState: function (state) {
                var args = arguments,
                    others = this.isNode ? this.linksTo.concat(this.linksFrom) :
                        [this.fromNode,
                    this.toNode];
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
            /* eslint-enable valid-jsdoc */
        };

        return NodesMixin;
    });
    _registerModule(_modules, 'Series/Networkgraph/Integrations.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.networkgraphIntegrations = {
            verlet: {
                /**
                 * Attractive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.attractiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                attractiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d;
                },
                /**
                 * Repulsive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.repulsiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                repulsiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d * (k > d ? 1 : 0); // Force only for close nodes
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @return {void}
                 */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant,
                        xFactor = this.barycenter.xFactor,
                        yFactor = this.barycenter.yFactor;
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
                },
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
                 * @return {void}
                 */
                repulsive: function (node, force, distanceXY) {
                    var factor = force * this.diffTemperature / node.mass / node.degree;
                    if (!node.fixedPosition) {
                        node.plotX += distanceXY.x * factor;
                        node.plotY += distanceXY.y * factor;
                    }
                },
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
                 * @return {void}
                 */
                attractive: function (link, force, distanceXY) {
                    var massFactor = link.getMass(),
                        translatedX = -distanceXY.x * force * this.diffTemperature,
                        translatedY = -distanceXY.y * force * this.diffTemperature;
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
                },
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
                 * @return {void}
                 */
                integrate: function (layout, node) {
                    var friction = -layout.options.friction,
                        maxSpeed = layout.options.maxSpeed,
                        prevX = node.prevX,
                        prevY = node.prevY, 
                        // Apply friciton:
                        diffX = ((node.plotX + node.dispX -
                            prevX) * friction),
                        diffY = ((node.plotY + node.dispY -
                            prevY) * friction),
                        abs = Math.abs,
                        signX = abs(diffX) / (diffX || 1), // need to deal with 0
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
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout layout object
                 * @return {number}
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.5);
                }
            },
            euler: {
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
                attractiveForceFunction: function (d, k) {
                    return d * d / k;
                },
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
                repulsiveForceFunction: function (d, k) {
                    return k * k / d;
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Euler integration, force is stored in a node, not changing it's
                 * position. Later, in `integrate()` forces are applied on nodes.
                 *
                 * @private
                 * @return {void}
                 */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant,
                        xFactor = this.barycenter.xFactor,
                        yFactor = this.barycenter.yFactor;
                    this.nodes.forEach(function (node) {
                        if (!node.fixedPosition) {
                            var degree = node.getDegree(),
                                phi = degree * (1 + degree / 2);
                            node.dispX += ((xFactor - node.plotX) *
                                gravitationalConstant *
                                phi / node.degree);
                            node.dispY += ((yFactor - node.plotY) *
                                gravitationalConstant *
                                phi / node.degree);
                        }
                    });
                },
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
                 * @return {void}
                 */
                repulsive: function (node, force, distanceXY, distanceR) {
                    node.dispX +=
                        (distanceXY.x / distanceR) * force / node.degree;
                    node.dispY +=
                        (distanceXY.y / distanceR) * force / node.degree;
                },
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
                 * @return {void}
                 */
                attractive: function (link, force, distanceXY, distanceR) {
                    var massFactor = link.getMass(),
                        translatedX = (distanceXY.x / distanceR) * force,
                        translatedY = (distanceXY.y / distanceR) * force;
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
                },
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
                 * @return {void}
                 */
                integrate: function (layout, node) {
                    var distanceR;
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
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 *
                 * @private
                 * @param {object} layout layout object
                 * @return {number}
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.3);
                }
            }
        };

    });
    _registerModule(_modules, 'Series/Networkgraph/QuadTree.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The QuadTree node class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTreeNode
         *
         * @param {Highcharts.Dictionary<number>} box Available space for the node
         */
        var QuadTreeNode = H.QuadTreeNode = function (box) {
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
            /**
             * Read only. Array of subnodes. Empty if QuadTreeNode has just one Point.
             * When added another Point to this QuadTreeNode, array is filled with four
             * subnodes.
             *
             * @name Highcharts.QuadTreeNode#nodes
             * @type {Array<Highcharts.QuadTreeNode>}
             */
            this.nodes = [];
            /**
             * Read only. Flag to determine if QuadTreeNode is internal (and has
             * subnodes with mass and central position) or external (bound to Point).
             *
             * @name Highcharts.QuadTreeNode#isInternal
             * @type {boolean}
             */
            this.isInternal = false;
            /**
             * Read only. If QuadTreeNode is an external node, Point is stored in
             * `this.body`.
             *
             * @name Highcharts.QuadTreeNode#body
             * @type {boolean|Highcharts.Point}
             */
            this.body = false;
            /**
             * Read only. Internal nodes when created are empty to reserve the space. If
             * Point is added to this QuadTreeNode, QuadTreeNode is no longer empty.
             *
             * @name Highcharts.QuadTreeNode#isEmpty
             * @type {boolean}
             */
            this.isEmpty = true;
        };
        extend(QuadTreeNode.prototype, 
        /** @lends Highcharts.QuadTreeNode.prototype */
        {
            /**
             * Insert recursively point(node) into the QuadTree. If the given
             * quadrant is already occupied, divide it into smaller quadrants.
             *
             * @param {Highcharts.Point} point
             *        Point/node to be inserted
             * @param {number} depth
             *        Max depth of the QuadTree
             */
            insert: function (point, depth) {
                var newQuadTreeNode;
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
                                top: point.plotX,
                                left: point.plotY,
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
            },
            /**
             * Each quad node requires it's mass and center position. That mass and
             * position is used to imitate real node in the layout by approximation.
             */
            updateMassAndCenter: function () {
                var mass = 0,
                    plotX = 0,
                    plotY = 0;
                if (this.isInternal) {
                    // Calcualte weightened mass of the quad node:
                    this.nodes.forEach(function (pointMass) {
                        if (!pointMass.isEmpty) {
                            mass += pointMass.mass;
                            plotX +=
                                pointMass.plotX * pointMass.mass;
                            plotY +=
                                pointMass.plotY * pointMass.mass;
                        }
                    });
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
            },
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
            divideBox: function () {
                var halfWidth = this.box.width / 2,
                    halfHeight = this.box.height / 2;
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
            },
            /**
             * Determine which of the quadrants should be used when placing node in
             * the QuadTree. Returned index is always in range `< 0 , 3 >`.
             *
             * @param {Highcharts.Point} point
             * @return {number}
             */
            getBoxPosition: function (point) {
                var left = point.plotX < this.box.left + this.box.width / 2,
                    top = point.plotY < this.box.top + this.box.height / 2,
                    index;
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
        });
        /**
         * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTree
         *
         * @param {number} x left position of the plotting area
         * @param {number} y top position of the plotting area
         * @param {number} width width of the plotting area
         * @param {number} height height of the plotting area
         */
        var QuadTree = H.QuadTree = function (x,
            y,
            width,
            height) {
                // Boundary rectangle:
                this.box = {
                    left: x,
                    top: y,
                    width: width,
                    height: height
                };
            this.maxDepth = 25;
            this.root = new QuadTreeNode(this.box, '0');
            this.root.isInternal = true;
            this.root.isRoot = true;
            this.root.divideBox();
        };
        extend(QuadTree.prototype, 
        /** @lends Highcharts.QuadTree.prototype */
        {
            /**
             * Insert nodes into the QuadTree
             *
             * @param {Array<Highcharts.Point>} points
             */
            insertNodes: function (points) {
                points.forEach(function (point) {
                    this.root.insert(point, this.maxDepth);
                }, this);
            },
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
             * @param {Function} [beforeCallback] function to be called before
             *                      visiting children nodes
             * @param {Function} [afterCallback] function to be called after
             *                      visiting children nodes
             */
            visitNodeRecursive: function (node, beforeCallback, afterCallback) {
                var goFurther;
                if (!node) {
                    node = this.root;
                }
                if (node === this.root && beforeCallback) {
                    goFurther = beforeCallback(node);
                }
                if (goFurther === false) {
                    return;
                }
                node.nodes.forEach(function (qtNode) {
                    if (qtNode.isInternal) {
                        if (beforeCallback) {
                            goFurther = beforeCallback(qtNode);
                        }
                        if (goFurther === false) {
                            return;
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
                }, this);
                if (node === this.root && afterCallback) {
                    afterCallback(node);
                }
            },
            /**
             * Calculate mass of the each QuadNode in the tree.
             */
            calculateMassAndCenter: function () {
                this.visitNodeRecursive(null, null, function (node) {
                    node.updateMassAndCenter();
                });
            }
        });

    });
    _registerModule(_modules, 'Series/Networkgraph/Layouts.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, A, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setAnimation = A.setAnimation;
        var addEvent = U.addEvent,
            clamp = U.clamp,
            defined = U.defined,
            extend = U.extend,
            isFunction = U.isFunction,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.layouts = {
            'reingold-fruchterman': function () {
            }
        };
        extend(
        /**
         * Reingold-Fruchterman algorithm from
         * "Graph Drawing by Force-directed Placement" paper.
         * @private
         */
        H.layouts['reingold-fruchterman'].prototype, {
            init: function (options) {
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
                    H.networkgraphIntegrations[options.integration];
                this.enableSimulation = options.enableSimulation;
                this.attractiveForce = pick(options.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = pick(options.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = options.approximation;
            },
            updateSimulation: function (enable) {
                this.enableSimulation = pick(enable, this.options.enableSimulation);
            },
            start: function () {
                var layout = this,
                    series = this.series,
                    options = this.options;
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
            },
            step: function () {
                var layout = this,
                    series = this.series,
                    options = this.options;
                // Algorithm:
                layout.currentStep++;
                if (layout.approximation === 'barnes-hut') {
                    layout.createQuadTree();
                    layout.quadTree.calculateMassAndCenter();
                }
                layout.forces.forEach(function (forceName) {
                    layout[forceName + 'Forces'](layout.temperature);
                });
                // Limit to the plotting area and cool down:
                layout.applyLimits(layout.temperature);
                // Cool down the system:
                layout.temperature = layout.coolDown(layout.startTemperature, layout.diffTemperature, layout.currentStep);
                layout.prevSystemTemperature = layout.systemTemperature;
                layout.systemTemperature = layout.getSystemTemperature();
                if (layout.enableSimulation) {
                    series.forEach(function (s) {
                        // Chart could be destroyed during the simulation
                        if (s.chart) {
                            s.render();
                        }
                    });
                    if (layout.maxIterations-- &&
                        isFinite(layout.temperature) &&
                        !layout.isStable()) {
                        if (layout.simulation) {
                            H.win.cancelAnimationFrame(layout.simulation);
                        }
                        layout.simulation = H.win.requestAnimationFrame(function () {
                            layout.step();
                        });
                    }
                    else {
                        layout.simulation = false;
                    }
                }
            },
            stop: function () {
                if (this.simulation) {
                    H.win.cancelAnimationFrame(this.simulation);
                }
            },
            setArea: function (x, y, w, h) {
                this.box = {
                    left: x,
                    top: y,
                    width: w,
                    height: h
                };
            },
            setK: function () {
                // Optimal distance between nodes,
                // available space around the node:
                this.k = this.options.linkLength || this.integration.getK(this);
            },
            addElementsToCollection: function (elements, collection) {
                elements.forEach(function (elem) {
                    if (collection.indexOf(elem) === -1) {
                        collection.push(elem);
                    }
                });
            },
            removeElementFromCollection: function (element, collection) {
                var index = collection.indexOf(element);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
            },
            clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            },
            resetSimulation: function () {
                this.forcedStop = false;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            },
            restartSimulation: function () {
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
            },
            setMaxIterations: function (maxIterations) {
                this.maxIterations = pick(maxIterations, this.options.maxIterations);
            },
            setTemperature: function () {
                this.temperature = this.startTemperature =
                    Math.sqrt(this.nodes.length);
            },
            setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature /
                    (this.options.maxIterations + 1);
            },
            setInitialRendering: function (enable) {
                this.initialRendering = enable;
            },
            createQuadTree: function () {
                this.quadTree = new H.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            },
            initPositions: function () {
                var initialPositions = this.options.initialPositions;
                if (isFunction(initialPositions)) {
                    initialPositions.call(this);
                    this.nodes.forEach(function (node) {
                        if (!defined(node.prevX)) {
                            node.prevX = node.plotX;
                        }
                        if (!defined(node.prevY)) {
                            node.prevY = node.plotY;
                        }
                        node.dispX = 0;
                        node.dispY = 0;
                    });
                }
                else if (initialPositions === 'circle') {
                    this.setCircularPositions();
                }
                else {
                    this.setRandomPositions();
                }
            },
            setCircularPositions: function () {
                var box = this.box,
                    nodes = this.nodes,
                    nodesLength = nodes.length + 1,
                    angle = 2 * Math.PI / nodesLength,
                    rootNodes = nodes.filter(function (node) {
                        return node.linksTo.length === 0;
                }), sortedNodes = [], visitedNodes = {}, radius = this.options.initialPositionRadius;
                /**
                 * @private
                 */
                function addToNodes(node) {
                    node.linksFrom.forEach(function (link) {
                        if (!visitedNodes[link.toNode.id]) {
                            visitedNodes[link.toNode.id] = true;
                            sortedNodes.push(link.toNode);
                            addToNodes(link.toNode);
                        }
                    });
                }
                // Start with identified root nodes an sort the nodes by their
                // hierarchy. In trees, this ensures that branches don't cross
                // eachother.
                rootNodes.forEach(function (rootNode) {
                    sortedNodes.push(rootNode);
                    addToNodes(rootNode);
                });
                // Cyclic tree, no root node found
                if (!sortedNodes.length) {
                    sortedNodes = nodes;
                    // Dangling, cyclic trees
                }
                else {
                    nodes.forEach(function (node) {
                        if (sortedNodes.indexOf(node) === -1) {
                            sortedNodes.push(node);
                        }
                    });
                }
                // Initial positions are laid out along a small circle, appearing
                // as a cluster in the middle
                sortedNodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width / 2 + radius * Math.cos(index * angle));
                    node.plotY = node.prevY = pick(node.plotY, box.height / 2 + radius * Math.sin(index * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            setRandomPositions: function () {
                var box = this.box,
                    nodes = this.nodes,
                    nodesLength = nodes.length + 1;
                /**
                 * Return a repeatable, quasi-random number based on an integer
                 * input. For the initial positions
                 * @private
                 */
                function unrandom(n) {
                    var rand = n * n / Math.PI;
                    rand = rand - Math.floor(rand);
                    return rand;
                }
                // Initial positions:
                nodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width * unrandom(index));
                    node.plotY = node.prevY = pick(node.plotY, box.height * unrandom(nodesLength + index));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            force: function (name) {
                this.integration[name].apply(this, Array.prototype.slice.call(arguments, 1));
            },
            barycenterForces: function () {
                this.getBarycenter();
                this.force('barycenter');
            },
            getBarycenter: function () {
                var systemMass = 0,
                    cx = 0,
                    cy = 0;
                this.nodes.forEach(function (node) {
                    cx += node.plotX * node.mass;
                    cy += node.plotY * node.mass;
                    systemMass += node.mass;
                });
                this.barycenter = {
                    x: cx,
                    y: cy,
                    xFactor: cx / systemMass,
                    yFactor: cy / systemMass
                };
                return this.barycenter;
            },
            barnesHutApproximation: function (node, quadNode) {
                var layout = this,
                    distanceXY = layout.getDistXY(node,
                    quadNode),
                    distanceR = layout.vectorLength(distanceXY),
                    goDeeper,
                    force;
                if (node !== quadNode && distanceR !== 0) {
                    if (quadNode.isInternal) {
                        // Internal node:
                        if (quadNode.boxSize / distanceR <
                            layout.options.theta &&
                            distanceR !== 0) {
                            // Treat as an external node:
                            force = layout.repulsiveForce(distanceR, layout.k);
                            layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                            goDeeper = false;
                        }
                        else {
                            // Go deeper:
                            goDeeper = true;
                        }
                    }
                    else {
                        // External node, direct force:
                        force = layout.repulsiveForce(distanceR, layout.k);
                        layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                    }
                }
                return goDeeper;
            },
            repulsiveForces: function () {
                var layout = this;
                if (layout.approximation === 'barnes-hut') {
                    layout.nodes.forEach(function (node) {
                        layout.quadTree.visitNodeRecursive(null, function (quadNode) {
                            return layout.barnesHutApproximation(node, quadNode);
                        });
                    });
                }
                else {
                    layout.nodes.forEach(function (node) {
                        layout.nodes.forEach(function (repNode) {
                            var force,
                                distanceR,
                                distanceXY;
                            if (
                            // Node can not repulse itself:
                            node !== repNode &&
                                // Only close nodes affect each other:
                                // layout.getDistR(node, repNode) < 2 * k &&
                                // Not dragged:
                                !node.fixedPosition) {
                                distanceXY = layout.getDistXY(node, repNode);
                                distanceR = layout.vectorLength(distanceXY);
                                if (distanceR !== 0) {
                                    force = layout.repulsiveForce(distanceR, layout.k);
                                    layout.force('repulsive', node, force * repNode.mass, distanceXY, distanceR);
                                }
                            }
                        });
                    });
                }
            },
            attractiveForces: function () {
                var layout = this,
                    distanceXY,
                    distanceR,
                    force;
                layout.links.forEach(function (link) {
                    if (link.fromNode && link.toNode) {
                        distanceXY = layout.getDistXY(link.fromNode, link.toNode);
                        distanceR = layout.vectorLength(distanceXY);
                        if (distanceR !== 0) {
                            force = layout.attractiveForce(distanceR, layout.k);
                            layout.force('attractive', link, force, distanceXY, distanceR);
                        }
                    }
                });
            },
            applyLimits: function () {
                var layout = this,
                    nodes = layout.nodes;
                nodes.forEach(function (node) {
                    if (node.fixedPosition) {
                        return;
                    }
                    layout.integration.integrate(layout, node);
                    layout.applyLimitBox(node, layout.box);
                    // Reset displacement:
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            /**
             * External box that nodes should fall. When hitting an edge, node
             * should stop or bounce.
             * @private
             */
            applyLimitBox: function (node, box) {
                var radius = node.radius;
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
            },
            /**
             * From "A comparison of simulated annealing cooling strategies" by
             * Nourani and Andresen work.
             * @private
             */
            coolDown: function (temperature, temperatureStep, currentStep) {
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
            },
            isStable: function () {
                return Math.abs(this.systemTemperature -
                    this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
            },
            getSystemTemperature: function () {
                return this.nodes.reduce(function (value, node) {
                    return value + node.temperature;
                }, 0);
            },
            vectorLength: function (vector) {
                return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            },
            getDistR: function (nodeA, nodeB) {
                var distance = this.getDistXY(nodeA,
                    nodeB);
                return this.vectorLength(distance);
            },
            getDistXY: function (nodeA, nodeB) {
                var xDist = nodeA.plotX - nodeB.plotX,
                    yDist = nodeA.plotY - nodeB.plotY;
                return {
                    x: xDist,
                    y: yDist,
                    absX: Math.abs(xDist),
                    absY: Math.abs(yDist)
                };
            }
        });
        /* ************************************************************************** *
         * Multiple series support:
         * ************************************************************************** */
        // Clear previous layouts
        addEvent(Chart, 'predraw', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.stop();
                });
            }
        });
        addEvent(Chart, 'render', function () {
            var systemsStable,
                afterRender = false;
            /**
             * @private
             */
            function layoutStep(layout) {
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
            }
            if (this.graphLayoutsLookup) {
                setAnimation(false, this);
                // Start simulation
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.start();
                });
                // Just one sync step, to run different layouts similar to
                // async mode.
                while (!systemsStable) {
                    systemsStable = true;
                    this.graphLayoutsLookup.forEach(layoutStep);
                }
                if (afterRender) {
                    this.series.forEach(function (s) {
                        if (s && s.layout) {
                            s.render();
                        }
                    });
                }
            }
        });
        // disable simulation before print if enabled
        addEvent(Chart, 'beforePrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.updateSimulation(false);
                });
                this.redraw();
            }
        });
        // re-enable simulation after print
        addEvent(Chart, 'afterPrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    // return to default simulation
                    layout.updateSimulation();
                });
            }
            this.redraw();
        });

    });
    _registerModule(_modules, 'Series/Networkgraph/DraggableNodes.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.dragNodesMixin = {
            /**
             * Mouse down action, initializing drag&drop mode.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             * @param {Highcharts.PointerEventObject} event Browser event, before normalization.
             * @return {void}
             */
            onMouseDown: function (point, event) {
                var normalizedEvent = this.chart.pointer.normalize(event);
                point.fixedPosition = {
                    chartX: normalizedEvent.chartX,
                    chartY: normalizedEvent.chartY,
                    plotX: point.plotX,
                    plotY: point.plotY
                };
                point.inDragMode = true;
            },
            /**
             * Mouse move action during drag&drop.
             *
             * @private
             *
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             *
             * @return {void}
             */
            onMouseMove: function (point, event) {
                if (point.fixedPosition && point.inDragMode) {
                    var series = this,
                        chart = series.chart,
                        normalizedEvent = chart.pointer.normalize(event),
                        diffX = point.fixedPosition.chartX - normalizedEvent.chartX,
                        diffY = point.fixedPosition.chartY - normalizedEvent.chartY,
                        newPlotX = void 0,
                        newPlotY = void 0,
                        graphLayoutsLookup = chart.graphLayoutsLookup;
                    // At least 5px to apply change (avoids simple click):
                    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                        newPlotX = point.fixedPosition.plotX - diffX;
                        newPlotY = point.fixedPosition.plotY - diffY;
                        if (chart.isInsidePlot(newPlotX, newPlotY)) {
                            point.plotX = newPlotX;
                            point.plotY = newPlotY;
                            point.hasDragged = true;
                            this.redrawHalo(point);
                            graphLayoutsLookup.forEach(function (layout) {
                                layout.restartSimulation();
                            });
                        }
                    }
                }
            },
            /**
             * Mouse up action, finalizing drag&drop.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             * @return {void}
             */
            onMouseUp: function (point, event) {
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
            },
            // Draggable mode:
            /**
             * Redraw halo on mousemove during the drag&drop action.
             *
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             * @return {void}
             */
            redrawHalo: function (point) {
                if (point && this.halo) {
                    this.halo.attr({
                        d: point.haloPath(this.options.states.hover.halo.size)
                    });
                }
            }
        };
        /*
         * Draggable mode:
         */
        addEvent(Chart, 'load', function () {
            var chart = this,
                mousedownUnbinder,
                mousemoveUnbinder,
                mouseupUnbinder;
            if (chart.container) {
                mousedownUnbinder = addEvent(chart.container, 'mousedown', function (event) {
                    var point = chart.hoverPoint;
                    if (point &&
                        point.series &&
                        point.series.hasDraggableNodes &&
                        point.series.options.draggable) {
                        point.series.onMouseDown(point, event);
                        mousemoveUnbinder = addEvent(chart.container, 'mousemove', function (e) {
                            return point &&
                                point.series &&
                                point.series.onMouseMove(point, e);
                        });
                        mouseupUnbinder = addEvent(chart.container.ownerDocument, 'mouseup', function (e) {
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
        });

    });
    _registerModule(_modules, 'Series/Networkgraph/Networkgraph.js', [_modules['Core/Globals.js'], _modules['Mixins/Nodes.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (H, NodesMixin, Point, Series, SeriesRegistry, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var seriesTypes = SeriesRegistry.seriesTypes;
        var addEvent = U.addEvent,
            css = U.css,
            defined = U.defined,
            extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        var dragNodesMixin = H.dragNodesMixin;
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
        ''; // detach doclets above
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
        var NetworkgraphSeries = /** @class */ (function (_super) {
                __extends(NetworkgraphSeries, _super);
            function NetworkgraphSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.nodes = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
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
             */
            NetworkgraphSeries.defaultOptions = merge(Series.defaultOptions, {
                stickyTracking: false,
                /**
                 * @ignore-option
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
            });
            return NetworkgraphSeries;
        }(Series));
        extend(NetworkgraphSeries.prototype, {
            /**
             * Array of internal forces. Each force should be later defined in
             * integrations.js.
             * @private
             */
            forces: ['barycenter', 'repulsive', 'attractive'],
            hasDraggableNodes: true,
            drawGraph: void 0,
            isCartesian: false,
            requireSorting: false,
            directTouch: true,
            noSharedTooltip: true,
            pointArrayMap: ['from', 'to'],
            trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
            drawTracker: seriesTypes.column.prototype.drawTracker,
            // Animation is run in `series.simulation`.
            animate: void 0,
            buildKDTree: H.noop,
            /**
             * Create a single node that holds information on incoming and outgoing
             * links.
             * @private
             */
            createNode: NodesMixin.createNode,
            destroy: function () {
                if (this.layout) {
                    this.layout.removeElementFromCollection(this, this.layout.series);
                }
                NodesMixin.destroy.call(this);
            },
            /* eslint-disable no-invalid-this, valid-jsdoc */
            /**
             * Extend init with base event, which should stop simulation during
             * update. After data is updated, `chart.render` resumes the simulation.
             * @private
             */
            init: function () {
                var _this = this;
                Series.prototype.init.apply(this, arguments);
                addEvent(this, 'updatedData', function () {
                    if (_this.layout) {
                        _this.layout.stop();
                    }
                });
                addEvent(this, 'afterUpdate', function () {
                    _this.nodes.forEach(function (node) {
                        if (node && node.series) {
                            node.resolveColor();
                        }
                    });
                });
                return this;
            },
            /**
             * Extend generatePoints by adding the nodes, which are Point objects
             * but pushed to the this.nodes array.
             * @private
             */
            generatePoints: function () {
                var node,
                    i;
                NodesMixin.generatePoints.apply(this, arguments);
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
            },
            /**
             * In networkgraph, series.points refers to links,
             * but series.nodes refers to actual points.
             * @private
             */
            getPointsCollection: function () {
                return this.nodes || [];
            },
            /**
             * Set index for each node. Required for proper `node.update()`.
             * Note that links are indexated out of the box in `generatePoints()`.
             *
             * @private
             */
            indexateNodes: function () {
                this.nodes.forEach(function (node, index) {
                    node.index = index;
                });
            },
            /**
             * Extend the default marker attribs by using a non-rounded X position,
             * otherwise the nodes will jump from pixel to pixel which looks a bit
             * jaggy when approaching equilibrium.
             * @private
             */
            markerAttribs: function (point, state) {
                var attribs = Series.prototype.markerAttribs.call(this,
                    point,
                    state);
                // series.render() is called before initial positions are set:
                if (!defined(point.plotY)) {
                    attribs.y = 0;
                }
                attribs.x = (point.plotX || 0) - (attribs.width || 0) / 2;
                return attribs;
            },
            /**
             * Run pre-translation and register nodes&links to the deffered layout.
             * @private
             */
            translate: function () {
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
            },
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
            deferLayout: function () {
                var layoutOptions = this.options.layoutAlgorithm,
                    graphLayoutsStorage = this.chart.graphLayoutsStorage,
                    graphLayoutsLookup = this.chart.graphLayoutsLookup,
                    chartOptions = this.chart.options.chart,
                    layout;
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
                        new H.layouts[layoutOptions.type]();
                    layout.init(layoutOptions);
                    graphLayoutsLookup.splice(layout.index, 0, layout);
                }
                this.layout = layout;
                layout.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                layout.addElementsToCollection([this], layout.series);
                layout.addElementsToCollection(this.nodes, layout.nodes);
                layout.addElementsToCollection(this.points, layout.links);
            },
            /**
             * Extend the render function to also render this.nodes together with
             * the points.
             * @private
             */
            render: function () {
                var series = this,
                    points = series.points,
                    hoverPoint = series.chart.hoverPoint,
                    dataLabels = [];
                // Render markers:
                series.points = series.nodes;
                seriesTypes.line.prototype.render.call(this);
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
            },
            // Networkgraph has two separate collecions of nodes and lines, render
            // dataLabels for both sets:
            drawDataLabels: function () {
                var textPath = this.options.dataLabels.textPath;
                // Render node labels:
                Series.prototype.drawDataLabels.apply(this, arguments);
                // Render link labels:
                this.points = this.data;
                this.options.dataLabels.textPath =
                    this.options.dataLabels.linkTextPath;
                Series.prototype.drawDataLabels.apply(this, arguments);
                // Restore nodes
                this.points = this.nodes;
                this.options.dataLabels.textPath = textPath;
            },
            // Return the presentational attributes.
            pointAttribs: function (point, state) {
                // By default, only `selected` state is passed on
                var pointState = state || point && point.state || 'normal',
                    attribs = Series.prototype.pointAttribs.call(this,
                    point,
                    pointState),
                    stateOptions = this.options.states[pointState];
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
            },
            // Draggable mode:
            /**
             * Redraw halo on mousemove during the drag&drop action.
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             */
            redrawHalo: dragNodesMixin.redrawHalo,
            /**
             * Mouse down action, initializing drag&drop mode.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseDown: dragNodesMixin.onMouseDown,
            /**
             * Mouse move action during drag&drop.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseMove: dragNodesMixin.onMouseMove,
            /**
             * Mouse up action, finalizing drag&drop.
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseUp: dragNodesMixin.onMouseUp,
            /**
             * When state should be passed down to all points, concat nodes and
             * links and apply this state to all of them.
             * @private
             */
            setState: function (state, inherit) {
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
        });
        /* *
         *
         *  Class
         *
         * */
        var NetworkgraphPoint = /** @class */ (function (_super) {
                __extends(NetworkgraphPoint, _super);
            function NetworkgraphPoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.degree = void 0;
                _this.linksFrom = void 0;
                _this.linksTo = void 0;
                _this.options = void 0;
                _this.radius = void 0;
                _this.series = void 0;
                _this.toNode = void 0;
                return _this;
            }
            return NetworkgraphPoint;
        }(Series.prototype.pointClass));
        extend(NetworkgraphPoint.prototype, {
            setState: NodesMixin.setNodeState,
            /**
             * Basic `point.init()` and additional styles applied when
             * `series.draggable` is enabled.
             * @private
             */
            init: function () {
                Point.prototype.init.apply(this, arguments);
                if (this.series.options.draggable &&
                    !this.series.chart.styledMode) {
                    addEvent(this, 'mouseOver', function () {
                        css(this.series.chart.container, { cursor: 'move' });
                    });
                    addEvent(this, 'mouseOut', function () {
                        css(this.series.chart.container, { cursor: 'default' });
                    });
                }
                return this;
            },
            /**
             * Return degree of a node. If node has no connections, it still has
             * deg=1.
             * @private
             * @return {number}
             */
            getDegree: function () {
                var deg = this.isNode ?
                        this.linksFrom.length + this.linksTo.length :
                        0;
                return deg === 0 ? 1 : deg;
            },
            // Links:
            /**
             * Get presentational attributes of link connecting two nodes.
             * @private
             * @return {Highcharts.SVGAttributes}
             */
            getLinkAttributes: function () {
                var linkOptions = this.series.options.link,
                    pointOptions = this.options;
                return {
                    'stroke-width': pick(pointOptions.width, linkOptions.width),
                    stroke: (pointOptions.color || linkOptions.color),
                    dashstyle: (pointOptions.dashStyle || linkOptions.dashStyle),
                    opacity: pick(pointOptions.opacity, linkOptions.opacity, 1)
                };
            },
            /**
             * Render link and add it to the DOM.
             * @private
             */
            renderLink: function () {
                var attribs;
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
            },
            /**
             * Redraw link's path.
             * @private
             */
            redrawLink: function () {
                var path = this.getLinkPath(),
                    attribs;
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
                    var start = path[0];
                    var end = path[1];
                    if (start[0] === 'M' && end[0] === 'L') {
                        this.plotX = (start[1] + end[1]) / 2;
                        this.plotY = (start[2] + end[2]) / 2;
                    }
                }
            },
            /**
             * Get mass fraction applied on two nodes connected to each other. By
             * default, when mass is equal to `1`, mass fraction for both nodes
             * equal to 0.5.
             * @private
             * @return {Highcharts.Dictionary<number>}
             *         For example `{ fromNode: 0.5, toNode: 0.5 }`
             */
            getMass: function () {
                var m1 = this.fromNode.mass,
                    m2 = this.toNode.mass,
                    sum = m1 + m2;
                return {
                    fromNode: 1 - m1 / sum,
                    toNode: 1 - m2 / sum
                };
            },
            /**
             * Get link path connecting two nodes.
             * @private
             * @return {Array<Highcharts.SVGPathArray>}
             *         Path: `['M', x, y, 'L', x, y]`
             */
            getLinkPath: function () {
                var left = this.fromNode,
                    right = this.toNode;
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
            },
            isValid: function () {
                return !this.isNode || defined(this.id);
            },
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
             * @return {void}
             */
            remove: function (redraw, animation) {
                var point = this,
                    series = point.series,
                    nodesOptions = series.options.nodes || [],
                    index,
                    i = nodesOptions.length;
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
                        Series.prototype.removePoint.call(series, series.data.indexOf(linkFromTo), false, false);
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
            },
            /**
             * Destroy point. If it's a node, remove all links coming out of this
             * node. Then remove point from the layout.
             * @private
             * @return {void}
             */
            destroy: function () {
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
        });
        NetworkgraphSeries.prototype.pointClass = NetworkgraphPoint;
        SeriesRegistry.registerSeriesType('networkgraph', NetworkgraphSeries);
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
         * @type      {Array<Object|Array|Number>}
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
         * Individual data label for each node. The options are the same as
         * the ones for [series.networkgraph.dataLabels](#series.networkgraph.dataLabels).
         *
         * @type      {Highcharts.SeriesNetworkgraphDataLabelsOptionsObject|Array<Highcharts.SeriesNetworkgraphDataLabelsOptionsObject>}
         *
         * @apioption series.networkgraph.nodes.dataLabels
         */
        ''; // adds doclets above to transpiled file

        return NetworkgraphSeries;
    });
    _registerModule(_modules, 'masters/modules/networkgraph.src.js', [], function () {


    });
}));