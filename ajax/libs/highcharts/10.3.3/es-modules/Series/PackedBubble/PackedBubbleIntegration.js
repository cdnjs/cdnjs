/* *
 *
 *  (c) 2010-2021 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
var noop = H.noop;
import VerletIntegration from '../Networkgraph/VerletIntegration.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function barycenter() {
    var layout = this, gravitationalConstant = layout.options.gravitationalConstant, box = layout.box, nodes = layout.nodes;
    var centerX, centerY;
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (layout.options.splitSeries && !node.isParentNode) {
            centerX = node.series.parentNode.plotX;
            centerY = node.series.parentNode.plotY;
        }
        else {
            centerX = box.width / 2;
            centerY = box.height / 2;
        }
        if (!node.fixedPosition) {
            node.plotX -=
                (node.plotX - centerX) *
                    gravitationalConstant /
                    (node.mass * Math.sqrt(nodes.length));
            node.plotY -=
                (node.plotY - centerY) *
                    gravitationalConstant /
                    (node.mass * Math.sqrt(nodes.length));
        }
    }
}
/**
 * @private
 */
function repulsive(node, force, distanceXY, repNode) {
    var factor = (force * this.diffTemperature / node.mass /
        node.degree), x = distanceXY.x * factor, y = distanceXY.y * factor;
    if (!node.fixedPosition) {
        node.plotX += x;
        node.plotY += y;
    }
    if (!repNode.fixedPosition) {
        repNode.plotX -= x;
        repNode.plotY -= y;
    }
}
/**
 * @private
 */
function repulsiveForceFunction(d, k, node, repNode) {
    return Math.min(d, (node.marker.radius +
        repNode.marker.radius) / 2);
}
/* *
 *
 *  Default Export
 *
 * */
var PackedBubbleIntegration = {
    barycenter: barycenter,
    getK: noop,
    integrate: VerletIntegration.integrate,
    repulsive: repulsive,
    repulsiveForceFunction: repulsiveForceFunction
};
export default PackedBubbleIntegration;
