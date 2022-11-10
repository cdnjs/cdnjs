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
    var massFactor = link.getMass(), translatedX = (distanceXY.x / distanceR) * force, translatedY = (distanceXY.y / distanceR) * force;
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
    var gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
    this.nodes.forEach(function (node) {
        if (!node.fixedPosition) {
            var degree = node.getDegree(), phi = degree * (1 + degree / 2);
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
var EulerIntegration = {
    attractive: attractive,
    attractiveForceFunction: attractiveForceFunction,
    barycenter: barycenter,
    getK: getK,
    integrate: integrate,
    repulsive: repulsive,
    repulsiveForceFunction: repulsiveForceFunction
};
export default EulerIntegration;
