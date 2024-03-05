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
'use strict';
import EulerIntegration from './EulerIntegration.js';
import H from '../../Core/Globals.js';
const { win } = H;
import GraphLayout from '../GraphLayoutComposition.js';
import QuadTree from './QuadTree.js';
import U from '../../Core/Utilities.js';
const { clamp, defined, isFunction, fireEvent, pick } = U;
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
export default ReingoldFruchtermanLayout;
