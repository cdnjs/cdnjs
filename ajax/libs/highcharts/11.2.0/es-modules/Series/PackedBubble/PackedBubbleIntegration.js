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
const { noop } = H;
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
    const layout = this, gravitationalConstant = layout.options.gravitationalConstant, box = layout.box, nodes = layout.nodes;
    let centerX, centerY;
    for (const node of nodes) {
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
    const factor = (force * this.diffTemperature / node.mass /
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
const PackedBubbleIntegration = {
    barycenter,
    getK: noop,
    integrate: VerletIntegration.integrate,
    repulsive,
    repulsiveForceFunction
};
export default PackedBubbleIntegration;
