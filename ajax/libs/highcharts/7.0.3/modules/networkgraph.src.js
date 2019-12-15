/**
 * @license  Highcharts JS v7.0.3 (2019-02-06)
 * Force directed graph module
 *
 * (c) 2010-2019 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    (function (H) {

        H.NodesMixin = {
            // Create a single node that holds information on incoming and outgoing
            // links.
            createNode: function (id) {

                function findById(nodes, id) {
                    return H.find(nodes, function (node) {
                        return node.id === id;
                    });
                }

                var node = findById(this.nodes, id),
                    PointClass = this.pointClass,
                    options;

                if (!node) {
                    options = this.options.nodes && findById(this.options.nodes, id);
                    node = (new PointClass()).init(
                        this,
                        H.extend({
                            className: 'highcharts-node',
                            isNode: true,
                            id: id,
                            y: 1 // Pass isNull test
                        }, options)
                    );
                    node.linksTo = [];
                    node.linksFrom = [];
                    node.formatPrefix = 'node';
                    node.name = node.name || node.options.id; // for use in formats

                    // Return the largest sum of either the incoming or outgoing links.
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
                    // Get the offset in weight values of a point/link.
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
                        return !node.linksTo.length || outgoing !== node.linksTo.length;
                    };

                    this.nodes.push(node);
                }
                return node;
            }
        };

    }(Highcharts));
    (function (H) {
        /**
         * Networkgraph series
         *
         * (c) 2010-2019 Paweł Fus
         *
         * License: www.highcharts.com/license
         */


        var pick = H.pick;

        H.layouts = {
            'reingold-fruchterman': function (options) {
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
            }
        };

        H.extend(
            /**
            * Reingold-Fruchterman algorithm from
            * "Graph Drawing by Force-directed Placement" paper.
            */
            H.layouts['reingold-fruchterman'].prototype,
            {
                run: function () {
                    var layout = this,
                        series = this.series,
                        options = this.options;

                    if (layout.initialRendering) {
                        layout.initPositions();

                        // Render elements in initial positions:
                        series.forEach(function (s) {
                            s.render();
                        });
                    }

                    // Algorithm:
                    function localLayout() {
                        // Barycenter forces:
                        layout.applyBarycenterForces();

                        // Repulsive forces:
                        layout.applyRepulsiveForces();

                        // Attractive forces:
                        layout.applyAttractiveForces();

                        // Limit to the plotting area and cool down:
                        layout.applyLimits(layout.temperature);

                        // Cool down:
                        layout.temperature -= layout.diffTemperature;
                        layout.prevSystemTemperature = layout.systemTemperature;
                        layout.systemTemperature = layout.getSystemTemperature();

                        if (options.enableSimulation) {
                            series.forEach(function (s) {
                                s.render();
                            });
                            if (
                                layout.maxIterations-- &&
                                !layout.isStable()
                            ) {
                                layout.simulation = H.win.requestAnimationFrame(
                                    localLayout
                                );
                            } else {
                                layout.simulation = false;
                            }
                        }
                    }

                    layout.setK();
                    layout.resetSimulation(options);

                    if (options.enableSimulation) {
                        // Animate it:
                        layout.simulation = H.win.requestAnimationFrame(localLayout);
                    } else {
                        // Synchronous rendering:
                        while (
                            layout.maxIterations-- &&
                            !layout.isStable()
                        ) {
                            localLayout();
                        }
                        series.forEach(function (s) {
                            s.render();
                        });
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
                    this.k = this.options.linkLength ||
                        Math.pow(
                            this.box.width * this.box.height / this.nodes.length,
                            0.4
                        );
                },
                addNodes: function (nodes) {
                    nodes.forEach(function (node) {
                        if (this.nodes.indexOf(node) === -1) {
                            this.nodes.push(node);
                        }
                    }, this);
                },
                removeNode: function (node) {
                    var index = this.nodes.indexOf(node);

                    if (index !== -1) {
                        this.nodes.splice(index, 1);
                    }
                },
                removeLink: function (link) {
                    var index = this.links.indexOf(link);

                    if (index !== -1) {
                        this.links.splice(index, 1);
                    }
                },
                addLinks: function (links) {
                    links.forEach(function (link) {
                        if (this.links.indexOf(link) === -1) {
                            this.links.push(link);
                        }
                    }, this);
                },
                addSeries: function (series) {
                    if (this.series.indexOf(series) === -1) {
                        this.series.push(series);
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

                setMaxIterations: function (maxIterations) {
                    this.maxIterations = pick(
                        maxIterations,
                        this.options.maxIterations
                    );
                },

                setTemperature: function () {
                    this.temperature = Math.sqrt(this.nodes.length);
                },

                setDiffTemperature: function () {
                    this.diffTemperature = this.temperature /
                        (this.options.maxIterations + 1);
                },
                setInitialRendering: function (enable) {
                    this.initialRendering = enable;
                },
                initPositions: function () {
                    var initialPositions = this.options.initialPositions;

                    if (H.isFunction(initialPositions)) {
                        initialPositions.call(this);
                    } else if (initialPositions === 'circle') {
                        this.setCircularPositions();
                    } else {
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
                        }),
                        sortedNodes = [],
                        visitedNodes = {};

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
                    } else {
                        nodes.forEach(function (node) {
                            if (sortedNodes.indexOf(node) === -1) {
                                sortedNodes.push(node);
                            }
                        });
                    }

                    // Initial positions are laid out along a small circle, appearing
                    // as a cluster in the middle
                    sortedNodes.forEach(function (node, index) {
                        node.plotX = pick(
                            node.plotX,
                            box.width / 2 + Math.cos(index * angle)
                        );
                        node.plotY = pick(
                            node.plotY,
                            box.height / 2 + Math.sin(index * angle)
                        );

                        node.dispX = 0;
                        node.dispY = 0;
                    });
                },
                setRandomPositions: function () {
                    var box = this.box,
                        nodes = this.nodes,
                        nodesLength = nodes.length + 1;

                    // Return a repeatable, quasi-random number based on an integer
                    // input. For the initial positions
                    function unrandom(n) {
                        var rand = n * n / Math.PI;

                        rand = rand - Math.floor(rand);
                        return rand;
                    }

                    // Initial positions:
                    nodes.forEach(
                        function (node, index) {
                            node.plotX = pick(
                                node.plotX,
                                box.width * unrandom(index)
                            );
                            node.plotY = pick(
                                node.plotY,
                                box.height * unrandom(nodesLength + index)
                            );

                            node.dispX = 0;
                            node.dispY = 0;
                        }
                    );
                },
                applyBarycenterForces: function () {
                    var nodesLength = this.nodes.length,
                        gravitationalConstant = this.options.gravitationalConstant,
                        cx = 0,
                        cy = 0;

                    // Calculate center:
                    this.nodes.forEach(function (node) {
                        cx += node.plotX;
                        cy += node.plotY;
                    });

                    this.barycenter = {
                        x: cx,
                        y: cy
                    };

                    // Apply forces:
                    this.nodes.forEach(function (node) {
                        var degree = node.getDegree(),
                            phi = degree * (1 + degree / 2);

                        node.dispX = (cx / nodesLength - node.plotX) *
                            gravitationalConstant * phi;
                        node.dispY = (cy / nodesLength - node.plotY) *
                            gravitationalConstant * phi;
                    });
                },
                applyRepulsiveForces: function () {
                    var layout = this,
                        nodes = layout.nodes,
                        options = layout.options,
                        k = this.k;

                    nodes.forEach(function (node) {
                        nodes.forEach(function (repNode) {
                            var force,
                                distanceR,
                                distanceXY;

                            if (
                                // Node can not repulse itself:
                                node !== repNode &&
                                // Only close nodes affect each other:
                                /* layout.getDistR(node, repNode) < 2 * k && */
                                // Not dragged:
                                !node.fixedPosition
                            ) {
                                distanceXY = layout.getDistXY(node, repNode);
                                distanceR = layout.vectorLength(distanceXY);

                                if (distanceR !== 0) {
                                    force = options.repulsiveForce.call(
                                        layout, distanceR, k
                                    );

                                    node.dispX += (distanceXY.x / distanceR) * force;
                                    node.dispY += (distanceXY.y / distanceR) * force;
                                }
                            }
                        });
                    });
                },
                applyAttractiveForces: function () {
                    var layout = this,
                        links = layout.links,
                        options = this.options,
                        k = this.k;

                    links.forEach(function (link) {
                        if (link.fromNode && link.toNode) {
                            var distanceXY = layout.getDistXY(
                                    link.fromNode,
                                    link.toNode
                                ),
                                distanceR = layout.vectorLength(distanceXY),
                                force = options.attractiveForce.call(
                                    layout, distanceR, k
                                );

                            if (distanceR !== 0) {
                                if (!link.fromNode.fixedPosition) {
                                    link.fromNode.dispX -= (distanceXY.x / distanceR) *
                                        force;
                                    link.fromNode.dispY -= (distanceXY.y / distanceR) *
                                        force;
                                }

                                if (!link.toNode.fixedPosition) {
                                    link.toNode.dispX += (distanceXY.x / distanceR) *
                                        force;
                                    link.toNode.dispY += (distanceXY.y / distanceR) *
                                        force;
                                }
                            }
                        }
                    });
                },
                applyLimits: function (temperature) {
                    var layout = this,
                        options = layout.options,
                        nodes = layout.nodes,
                        box = layout.box,
                        distanceR;

                    nodes.forEach(function (node) {
                        if (node.fixedPosition) {
                            return;
                        }

                        // Friction:
                        node.dispX += options.friction * node.dispX;
                        node.dispY += options.friction * node.dispY;

                        distanceR = node.temperature = layout.vectorLength({
                            x: node.dispX,
                            y: node.dispY
                        });

                        // Place nodes:
                        if (distanceR !== 0) {
                            node.plotX += node.dispX / distanceR *
                                Math.min(Math.abs(node.dispX), temperature);
                            node.plotY += node.dispY / distanceR *
                                Math.min(Math.abs(node.dispY), temperature);
                        }

                        /*
                        TO DO: Consider elastic collision instead of stopping.
                        o' means end position when hitting plotting area edge:

                        - "inealstic":
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

                        */

                        // Limit X-coordinates:
                        node.plotX = Math.round(
                            Math.max(
                                Math.min(
                                    node.plotX,
                                    box.width
                                ),
                                box.left
                            )
                        );

                        // Limit Y-coordinates:
                        node.plotY = Math.round(
                            Math.max(
                                Math.min(
                                    node.plotY,
                                    box.height
                                ),
                                box.top
                            )
                        );

                        // Reset displacement:
                        node.dispX = 0;
                        node.dispY = 0;
                    });
                },
                isStable: function () {
                    return Math.abs(
                        this.systemTemperature -
                        this.prevSystemTemperature
                    ) === 0;
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
                    var distance = this.getDistXY(nodeA, nodeB);

                    return Math.sqrt(
                        distance.x * distance.x +
                        distance.y * distance.y
                    );
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
            }
        );

    }(Highcharts));
    (function (H) {
        /**
         * Networkgraph series
         *
         * (c) 2010-2019 Paweł Fus
         *
         * License: www.highcharts.com/license
         */


        var addEvent = H.addEvent,
            defined = H.defined,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes,
            pick = H.pick,
            Chart = H.Chart,
            Point = H.Point,
            Series = H.Series;

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
         *               connectNulls, dragDrop, getExtremesFromAll, label, linecap,
         *               negativeColor, pointInterval, pointIntervalUnit,
         *               pointPlacement, pointStart, softThreshold, stack, stacking,
         *               step, threshold, xAxis, yAxis, zoneAxis
         * @optionparent plotOptions.networkgraph
         */
        seriesType('networkgraph', 'line', {
            marker: {
                enabled: true
            },
            dataLabels: {
                format: '{key}'
            },
            /**
             * Link style options
             */
            link: {
                /**
                 * A name for the dash style to use for links.
                 *
                 * @type      {String}
                 * @apioption plotOptions.networkgraph.link.dashStyle
                 * @defaults  undefined
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
             */
            draggable: true,
            layoutAlgorithm: {
                /**
                 * Ideal length (px) of the link between two nodes. When not defined,
                 * length is calculated as:
                 * `Math.pow(availableWidth * availableHeight / nodesLength, 0.4);`
                 *
                 * Note: Because of the algorithm specification, length of each link
                 * might be not exactly as specified.
                 *
                 * @type      {number}
                 * @apioption series.networkgraph.layoutAlgorithm.linkLength
                 * @sample    highcharts/series-networkgraph/styled-links/
                 *            Numerical values
                 * @defaults  undefined
                 */

                /**
                 * Initial layout algorithm for positioning nodes. Can be one of
                 * built-in options ("circle", "random") or a function where positions
                 * should be set on each node (`this.nodes`) as `node.plotX` and
                 * `node.plotY`
                 *
                 * @sample      highcharts/series-networkgraph/initial-positions/
                 *              Initial positions with callback
                 * @type        {String|Function}
                 * @validvalue  ["circle", "random"]
                 */
                initialPositions: 'circle',
                /**
                 * Experimental. Enables live simulation of the algorithm
                 * implementation. All nodes are animated as the forces applies on
                 * them.
                 *
                 * @sample       highcharts/demo/network-graph/
                 *               Live simulation enabled
                 */
                enableSimulation: false,
                /**
                 * Type of the algorithm used when positioning nodes.
                 *
                 * @validvalue  ["reingold-fruchterman"]
                 */
                type: 'reingold-fruchterman',
                /**
                 * Max number of iterations before algorithm will stop. In general,
                 * algorithm should find positions sooner, but when rendering huge
                 * number of nodes, it is recommended to increase this value as
                 * finding perfect graph positions can require more time.
                 */
                maxIterations: 1000,
                /**
                 * Gravitational const used in the barycenter force of the algorithm.
                 *
                 * @sample      highcharts/series-networkgraph/forces/
                 *              Custom forces
                 */
                gravitationalConstant: 0.0625,
                /**
                 * Friction applied on forces to prevent nodes rushing to fast to the
                 * desired positions.
                 */
                friction: -0.981,
                /**
                 * Repulsive force applied on a node. Passed are two arguments:
                 * - `d` - which is current distance between two nodes
                 * - `k` - which is desired distance between two nodes
                 *
                 * @sample      highcharts/series-networkgraph/forces/
                 *              Custom forces
                 * @type        {Function}
                 * @default function (d, k) { return k * k / d; }
                 */
                repulsiveForce: function (d, k) {
                    /*
                    basic, not recommended:
                    return k / d;
                    */

                    /*
                    standard:
                    return k * k / d;
                    */

                    /*
                    grid-variant:
                    return k * k / d * (2 * k - d > 0 ? 1 : 0);
                    */

                    return k * k / d;
                },
                /**
                 * Attraction force applied on a node which is conected to another node
                 * by a link. Passed are two arguments:
                 * - `d` - which is current distance between two nodes
                 * - `k` - which is desired distance between two nodes
                 *
                 * @sample      highcharts/series-networkgraph/forces/
                 *              Custom forces
                 * @type        {Function}
                 * @default function (d, k) { return k * k / d; }
                 */
                attractiveForce: function (d, k) {
                    /*
                    basic, not recommended:
                    return d / k;
                    */
                    return d * d / k;
                }
            },
            showInLegend: false
        }, {
            isNetworkgraph: true,
            drawGraph: null,
            isCartesian: false,
            requireSorting: false,
            directTouch: true,
            noSharedTooltip: true,
            trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
            drawTracker: H.TrackerMixin.drawTrackerPoint,
            // Animation is run in `series.simulation`.
            animate: null,
            /**
             * Create a single node that holds information on incoming and outgoing
             * links.
             */
            createNode: H.NodesMixin.createNode,

            /**
             * Extend generatePoints by adding the nodes, which are Point objects
             * but pushed to the this.nodes array.
             */
            generatePoints: function () {
                var nodeLookup = {},
                    chart = this.chart;

                H.Series.prototype.generatePoints.call(this);

                if (!this.nodes) {
                    this.nodes = []; // List of Point-like node items
                }
                this.colorCounter = 0;

                // Reset links from previous run
                this.nodes.forEach(function (node) {
                    node.linksFrom.length = 0;
                    node.linksTo.length = 0;
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
                            point.colorIndex = pick(
                                point.options.colorIndex,
                                nodeLookup[point.from].colorIndex
                            );
                        } else {
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


                if (this.options.nodes) {
                    this.options.nodes.forEach(
                        function (nodeOptions) {
                            if (!nodeLookup[nodeOptions.id]) {
                                nodeLookup[nodeOptions.id] = this
                                    .createNode(nodeOptions.id);
                            }
                        },
                        this
                    );
                }
            },

            /**
             * Run pre-translation by generating the nodeColumns.
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

            deferLayout: function () {
                var layoutOptions = this.options.layoutAlgorithm,
                    graphLayoutsStorage = this.chart.graphLayoutsStorage,
                    chartOptions = this.chart.options.chart,
                    layout;

                if (!this.visible) {
                    return;
                }

                if (!graphLayoutsStorage) {
                    this.chart.graphLayoutsStorage = graphLayoutsStorage = {};
                }

                layout = graphLayoutsStorage[layoutOptions.type];

                if (!layout) {
                    layoutOptions.enableSimulation = !defined(chartOptions.forExport) ?
                        layoutOptions.enableSimulation :
                        !chartOptions.forExport;

                    graphLayoutsStorage[layoutOptions.type] = layout =
                        new H.layouts[layoutOptions.type](layoutOptions);
                }

                this.layout = layout;

                layout.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                layout.addSeries(this);
                layout.addNodes(this.nodes);
                layout.addLinks(this.points);
            },

            /**
             * Extend the render function to also render this.nodes together with
             * the points.
             */
            render: function () {
                var points = this.points,
                    hoverPoint = this.chart.hoverPoint,
                    dataLabels = [];

                // Render markers:
                this.points = this.nodes;
                seriesTypes.line.prototype.render.call(this);
                this.points = points;

                points.forEach(function (point) {
                    if (point.fromNode && point.toNode) {
                        point.renderLink();
                        point.redrawLink();
                    }
                });

                if (hoverPoint && hoverPoint.series === this) {
                    this.redrawHalo(hoverPoint);
                }

                this.nodes.forEach(function (node) {
                    if (node.dataLabel) {
                        dataLabels.push(node.dataLabel);
                    }
                });
                H.Chart.prototype.hideOverlappingLabels(dataLabels);
            },

            /*
             * Draggable mode:
             */
            redrawHalo: function (point) {
                if (point && this.halo) {
                    this.halo.attr({
                        d: point.haloPath(
                            this.options.states.hover.halo.size
                        )
                    });
                }
            },
            onMouseDown: function (point, event) {
                var normalizedEvent = this.chart.pointer.normalize(event);

                point.fixedPosition = {
                    chartX: normalizedEvent.chartX,
                    chartY: normalizedEvent.chartY,
                    plotX: point.plotX,
                    plotY: point.plotY
                };
            },
            onMouseMove: function (point, event) {
                if (point.fixedPosition) {
                    var series = this,
                        chart = series.chart,
                        normalizedEvent = chart.pointer.normalize(event),
                        diffX = point.fixedPosition.chartX - normalizedEvent.chartX,
                        diffY = point.fixedPosition.chartY - normalizedEvent.chartY,
                        newPlotX,
                        newPlotY;

                    // At least 5px to apply change (avoids simple click):
                    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                        newPlotX = point.fixedPosition.plotX - diffX;
                        newPlotY = point.fixedPosition.plotY - diffY;

                        if (chart.isInsidePlot(newPlotX, newPlotY)) {
                            point.plotX = newPlotX;
                            point.plotY = newPlotY;

                            series.redrawHalo();

                            if (!series.layout.simulation) {
                                // Start new simulation:
                                if (!series.layout.enableSimulation) {
                                    // Run only one iteration to speed things up:
                                    series.layout.setMaxIterations(1);
                                }
                                // When dragging nodes, we don't need to calculate
                                // initial positions and rendering nodes:
                                series.layout.setInitialRendering(false);
                                series.layout.run();
                                // Restore defaults:
                                series.layout.setInitialRendering(true);
                            } else {
                                // Extend current simulation:
                                series.layout.resetSimulation();
                            }
                        }
                    }
                }
            },
            onMouseUp: function (point) {
                if (point.fixedPosition) {
                    this.layout.run();
                    delete point.fixedPosition;
                }
            },
            destroy: function () {
                this.nodes.forEach(function (node) {
                    node.destroy();
                });
                return Series.prototype.destroy.apply(this, arguments);
            }
        }, {
            getDegree: function () {
                var deg = this.isNode ? this.linksFrom.length + this.linksTo.length : 0;

                return deg === 0 ? 1 : deg;
            },
            // Links:
            getLinkAttribues: function () {
                var linkOptions = this.series.options.link,
                    pointOptions = this.options;

                return {
                    'stroke-width': pick(pointOptions.width, linkOptions.width),
                    stroke: pointOptions.color || linkOptions.color,
                    dashstyle: pointOptions.dashStyle || linkOptions.dashStyle
                };
            },
            renderLink: function () {
                if (!this.graphic) {
                    this.graphic = this.series.chart.renderer
                        .path(
                            this.getLinkPath(this.fromNode, this.toNode)
                        )
                        .attr(this.getLinkAttribues())
                        .add(this.series.group);
                }
            },
            redrawLink: function () {
                if (this.graphic) {
                    this.graphic.animate({
                        d: this.getLinkPath(this.fromNode, this.toNode)
                    });
                }
            },
            getLinkPath: function (from, to) {
                return [
                    'M',
                    from.plotX,
                    from.plotY,
                    'L',
                    to.plotX,
                    to.plotY
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
            // Default utils:
            destroy: function () {
                if (this.isNode) {
                    this.linksFrom.forEach(
                        function (linkFrom) {
                            if (linkFrom.graphic) {
                                linkFrom.graphic = linkFrom.graphic.destroy();
                            }
                        }
                    );
                }

                return Point.prototype.destroy.apply(this, arguments);
            }
        });

        addEvent(seriesTypes.networkgraph, 'updatedData', function () {
            if (this.layout) {
                this.layout.stop();
            }
        });

        addEvent(seriesTypes.networkgraph.prototype.pointClass, 'remove', function () {
            if (this.series.layout) {
                if (this.isNode) {
                    this.series.layout.removeNode(this);
                } else {
                    this.series.layout.removeLink(this);
                }
            }
        });

        /*
         * Multiple series support:
         */
        // Clear previous layouts
        addEvent(Chart, 'predraw', function () {
            if (this.graphLayoutsStorage) {
                H.objectEach(
                    this.graphLayoutsStorage,
                    function (layout) {
                        layout.stop();
                    }
                );
            }
        });
        addEvent(Chart, 'render', function () {
            if (this.graphLayoutsStorage) {
                H.setAnimation(false, this);
                H.objectEach(
                    this.graphLayoutsStorage,
                    function (layout) {
                        layout.run();
                    }
                );
            }
        });

        /*
         * Draggable mode:
         */
        addEvent(
            seriesTypes.networkgraph.prototype.pointClass,
            'mouseOver',
            function () {
                H.css(this.series.chart.container, { cursor: 'move' });
            }
        );
        addEvent(
            seriesTypes.networkgraph.prototype.pointClass,
            'mouseOut',
            function () {
                H.css(this.series.chart.container, { cursor: 'default' });
            }
        );
        addEvent(
            Chart,
            'load',
            function () {
                var chart = this,
                    unbinders = [];

                if (chart.container) {
                    unbinders.push(
                        addEvent(
                            chart.container,
                            'mousedown',
                            function (event) {
                                var point = chart.hoverPoint;

                                if (
                                    point &&
                                    point.series &&
                                    point.series.isNetworkgraph &&
                                    point.series.options.draggable
                                ) {
                                    point.series.onMouseDown(point, event);
                                    unbinders.push(addEvent(
                                        chart.container,
                                        'mousemove',
                                        function (e) {
                                            return point.series.onMouseMove(point, e);
                                        }
                                    ));
                                    unbinders.push(addEvent(
                                        chart.container.ownerDocument,
                                        'mouseup',
                                        function (e) {
                                            return point.series.onMouseUp(point, e);
                                        }
                                    ));
                                }
                            }
                        )
                    );
                }

                addEvent(chart, 'destroy', function () {
                    unbinders.forEach(function (unbind) {
                        unbind();
                    });
                });
            }
        );

        /**
         * A `networkgraph` series. If the [type](#series.networkgraph.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @type      {Object}
         * @extends   series,plotOptions.networkgraph
         * @excluding boostThreshold, animation, animationLimit, connectEnds,
         *            connectNulls, dragDrop, getExtremesFromAll, label, linecap,
         *            negativeColor, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointStart, softThreshold, stack, stacking,
         *            step, threshold, xAxis, yAxis, zoneAxis
         * @product   highcharts
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
         * The node that the link runs from.
         *
         * @type      {String}
         * @product   highcharts
         * @apioption series.networkgraph.data.from
         */

        /**
         * The node that the link runs to.
         *
         * @type      {String}
         * @product   highcharts
         * @apioption series.networkgraph.data.to
         */

        /**
         * The weight of the link.
         *
         * @type      {Number}
         * @product   highcharts
         * @apioption series.networkgraph.data.weight
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

    }(Highcharts));
    return (function () {


    }());
}));