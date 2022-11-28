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
'use strict';
import EulerIntegration from './EulerIntegration.js';
import H from '../../Core/Globals.js';
var win = H.win;
import GraphLayout from '../GraphLayoutComposition.js';
import QuadTree from './QuadTree.js';
import U from '../../Core/Utilities.js';
var clamp = U.clamp, defined = U.defined, isFunction = U.isFunction, pick = U.pick;
import VerletIntegration from './VerletIntegration.js';
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
var ReingoldFruchtermanLayout = /** @class */ (function () {
    function ReingoldFruchtermanLayout() {
        /* *
         *
         *  Static Functions
         *
         * */
        this.attractiveForce = void 0;
        this.box = {};
        this.currentStep = 0;
        this.initialRendering = true;
        this.integration = void 0;
        this.links = [];
        this.nodes = [];
        this.options = void 0;
        this.quadTree = void 0;
        this.repulsiveForce = void 0;
        this.series = [];
        this.simulation = false;
    }
    ReingoldFruchtermanLayout.compose = function (ChartClass) {
        GraphLayout.compose(ChartClass);
        GraphLayout.integrations.euler = EulerIntegration;
        GraphLayout.integrations.verlet = VerletIntegration;
        GraphLayout.layouts['reingold-fruchterman'] =
            ReingoldFruchtermanLayout;
    };
    ReingoldFruchtermanLayout.prototype.init = function (options) {
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
    };
    ReingoldFruchtermanLayout.prototype.updateSimulation = function (enable) {
        this.enableSimulation = pick(enable, this.options.enableSimulation);
    };
    ReingoldFruchtermanLayout.prototype.start = function () {
        var layout = this, series = this.series, options = this.options;
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
    };
    ReingoldFruchtermanLayout.prototype.step = function () {
        var _this = this;
        var anyLayout = this, allSeries = this.series;
        // Algorithm:
        this.currentStep++;
        if (this.approximation === 'barnes-hut') {
            this.createQuadTree();
            this.quadTree.calculateMassAndCenter();
        }
        for (var _i = 0, _a = this.forces || []; _i < _a.length; _i++) {
            var forceName = _a[_i];
            anyLayout[forceName + 'Forces'](this.temperature);
        }
        // Limit to the plotting area and cool down:
        this.applyLimits();
        // Cool down the system:
        this.temperature = this.coolDown(this.startTemperature, this.diffTemperature, this.currentStep);
        this.prevSystemTemperature = this.systemTemperature;
        this.systemTemperature = this.getSystemTemperature();
        if (this.enableSimulation) {
            for (var _b = 0, allSeries_1 = allSeries; _b < allSeries_1.length; _b++) {
                var series = allSeries_1[_b];
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
                this.simulation = win.requestAnimationFrame(function () { return _this.step(); });
            }
            else {
                this.simulation = false;
            }
        }
    };
    ReingoldFruchtermanLayout.prototype.stop = function () {
        if (this.simulation) {
            win.cancelAnimationFrame(this.simulation);
        }
    };
    ReingoldFruchtermanLayout.prototype.setArea = function (x, y, w, h) {
        this.box = {
            left: x,
            top: y,
            width: w,
            height: h
        };
    };
    ReingoldFruchtermanLayout.prototype.setK = function () {
        // Optimal distance between nodes,
        // available space around the node:
        this.k = this.options.linkLength || this.integration.getK(this);
    };
    ReingoldFruchtermanLayout.prototype.addElementsToCollection = function (elements, collection) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (collection.indexOf(element) === -1) {
                collection.push(element);
            }
        }
    };
    ReingoldFruchtermanLayout.prototype.removeElementFromCollection = function (element, collection) {
        var index = collection.indexOf(element);
        if (index !== -1) {
            collection.splice(index, 1);
        }
    };
    ReingoldFruchtermanLayout.prototype.clear = function () {
        this.nodes.length = 0;
        this.links.length = 0;
        this.series.length = 0;
        this.resetSimulation();
    };
    ReingoldFruchtermanLayout.prototype.resetSimulation = function () {
        this.forcedStop = false;
        this.systemTemperature = 0;
        this.setMaxIterations();
        this.setTemperature();
        this.setDiffTemperature();
    };
    ReingoldFruchtermanLayout.prototype.restartSimulation = function () {
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
    };
    ReingoldFruchtermanLayout.prototype.setMaxIterations = function (maxIterations) {
        this.maxIterations = pick(maxIterations, this.options.maxIterations);
    };
    ReingoldFruchtermanLayout.prototype.setTemperature = function () {
        this.temperature = this.startTemperature =
            Math.sqrt(this.nodes.length);
    };
    ReingoldFruchtermanLayout.prototype.setDiffTemperature = function () {
        this.diffTemperature = this.startTemperature /
            (this.options.maxIterations + 1);
    };
    ReingoldFruchtermanLayout.prototype.setInitialRendering = function (enable) {
        this.initialRendering = enable;
    };
    ReingoldFruchtermanLayout.prototype.createQuadTree = function () {
        this.quadTree = new QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
        this.quadTree.insertNodes(this.nodes);
    };
    ReingoldFruchtermanLayout.prototype.initPositions = function () {
        var initialPositions = this.options.initialPositions;
        if (isFunction(initialPositions)) {
            initialPositions.call(this);
            for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
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
    };
    ReingoldFruchtermanLayout.prototype.setCircularPositions = function () {
        var box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, rootNodes = nodes.filter(function (node) {
            return node.linksTo.length === 0;
        }), visitedNodes = {}, radius = this.options.initialPositionRadius, addToNodes = function (node) {
            for (var _i = 0, _a = node.linksFrom || []; _i < _a.length; _i++) {
                var link = _a[_i];
                if (!visitedNodes[link.toNode.id]) {
                    visitedNodes[link.toNode.id] = true;
                    sortedNodes.push(link.toNode);
                    addToNodes(link.toNode);
                }
            }
        };
        var sortedNodes = [];
        // Start with identified root nodes an sort the nodes by their
        // hierarchy. In trees, this ensures that branches don't cross
        // eachother.
        for (var _i = 0, rootNodes_1 = rootNodes; _i < rootNodes_1.length; _i++) {
            var rootNode = rootNodes_1[_i];
            sortedNodes.push(rootNode);
            addToNodes(rootNode);
        }
        // Cyclic tree, no root node found
        if (!sortedNodes.length) {
            sortedNodes = nodes;
            // Dangling, cyclic trees
        }
        else {
            for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
                var node_1 = nodes_1[_a];
                if (sortedNodes.indexOf(node_1) === -1) {
                    sortedNodes.push(node_1);
                }
            }
        }
        var node;
        // Initial positions are laid out along a small circle, appearing
        // as a cluster in the middle
        for (var i = 0, iEnd = sortedNodes.length; i < iEnd; ++i) {
            node = sortedNodes[i];
            node.plotX = node.prevX = pick(node.plotX, box.width / 2 + radius * Math.cos(i * angle));
            node.plotY = node.prevY = pick(node.plotY, box.height / 2 + radius * Math.sin(i * angle));
            node.dispX = 0;
            node.dispY = 0;
        }
    };
    ReingoldFruchtermanLayout.prototype.setRandomPositions = function () {
        var box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, 
        /**
         * Return a repeatable, quasi-random number based on an integer
         * input. For the initial positions
         * @private
         */
        unrandom = function (n) {
            var rand = n * n / Math.PI;
            rand = rand - Math.floor(rand);
            return rand;
        };
        var node;
        // Initial positions:
        for (var i = 0, iEnd = nodes.length; i < iEnd; ++i) {
            node = nodes[i];
            node.plotX = node.prevX = pick(node.plotX, box.width * unrandom(i));
            node.plotY = node.prevY = pick(node.plotY, box.height * unrandom(nodesLength + i));
            node.dispX = 0;
            node.dispY = 0;
        }
    };
    ReingoldFruchtermanLayout.prototype.force = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.integration[name].apply(this, args);
    };
    ReingoldFruchtermanLayout.prototype.barycenterForces = function () {
        this.getBarycenter();
        this.force('barycenter');
    };
    ReingoldFruchtermanLayout.prototype.getBarycenter = function () {
        var systemMass = 0, cx = 0, cy = 0;
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
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
    };
    ReingoldFruchtermanLayout.prototype.barnesHutApproximation = function (node, quadNode) {
        var distanceXY = this.getDistXY(node, quadNode), distanceR = this.vectorLength(distanceXY);
        var goDeeper, force;
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
    };
    ReingoldFruchtermanLayout.prototype.repulsiveForces = function () {
        var _this = this;
        if (this.approximation === 'barnes-hut') {
            var _loop_1 = function (node) {
                this_1.quadTree.visitNodeRecursive(null, function (quadNode) { return (_this.barnesHutApproximation(node, quadNode)); });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
                _loop_1(node);
            }
        }
        else {
            var force = void 0, distanceR = void 0, distanceXY = void 0;
            for (var _b = 0, _c = this.nodes; _b < _c.length; _b++) {
                var node = _c[_b];
                for (var _d = 0, _e = this.nodes; _d < _e.length; _d++) {
                    var repNode = _e[_d];
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
    };
    ReingoldFruchtermanLayout.prototype.attractiveForces = function () {
        var distanceXY, distanceR, force;
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var link = _a[_i];
            if (link.fromNode && link.toNode) {
                distanceXY = this.getDistXY(link.fromNode, link.toNode);
                distanceR = this.vectorLength(distanceXY);
                if (distanceR !== 0) {
                    force = this.attractiveForce(distanceR, this.k);
                    this.force('attractive', link, force, distanceXY, distanceR);
                }
            }
        }
    };
    ReingoldFruchtermanLayout.prototype.applyLimits = function () {
        var nodes = this.nodes;
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var node = nodes_2[_i];
            if (node.fixedPosition) {
                return;
            }
            this.integration.integrate(this, node);
            this.applyLimitBox(node, this.box);
            // Reset displacement:
            node.dispX = 0;
            node.dispY = 0;
        }
    };
    /**
     * External box that nodes should fall. When hitting an edge, node
     * should stop or bounce.
     * @private
     */
    ReingoldFruchtermanLayout.prototype.applyLimitBox = function (node, box) {
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
    };
    /**
     * From "A comparison of simulated annealing cooling strategies" by
     * Nourani and Andresen work.
     * @private
     */
    ReingoldFruchtermanLayout.prototype.coolDown = function (temperature, temperatureStep, currentStep) {
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
    };
    ReingoldFruchtermanLayout.prototype.isStable = function () {
        return Math.abs(this.systemTemperature -
            this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
    };
    ReingoldFruchtermanLayout.prototype.getSystemTemperature = function () {
        var value = 0;
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            value += node.temperature;
        }
        return value;
    };
    ReingoldFruchtermanLayout.prototype.vectorLength = function (vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    };
    ReingoldFruchtermanLayout.prototype.getDistR = function (nodeA, nodeB) {
        var distance = this.getDistXY(nodeA, nodeB);
        return this.vectorLength(distance);
    };
    ReingoldFruchtermanLayout.prototype.getDistXY = function (nodeA, nodeB) {
        var xDist = nodeA.plotX - nodeB.plotX, yDist = nodeA.plotY - nodeB.plotY;
        return {
            x: xDist,
            y: yDist,
            absX: Math.abs(xDist),
            absY: Math.abs(yDist)
        };
    };
    return ReingoldFruchtermanLayout;
}());
/* *
 *
 *  Default Export
 *
 * */
export default ReingoldFruchtermanLayout;
