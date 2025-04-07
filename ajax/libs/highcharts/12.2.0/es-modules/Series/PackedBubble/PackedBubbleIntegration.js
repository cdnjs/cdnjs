/* *
 *
 *  (c) 2010-2025 Grzegorz Blachlinski, Sebastian Bochan
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
    const layout = this, gravitationalConstant = layout.options.gravitationalConstant || 0, box = layout.box, nodes = layout.nodes, nodeCountSqrt = Math.sqrt(nodes.length);
    let centerX, centerY;
    for (const node of nodes) {
        if (!node.fixedPosition) {
            const massTimesNodeCountSqrt = node.mass * nodeCountSqrt, plotX = node.plotX || 0, plotY = node.plotY || 0, series = node.series, parentNode = series.parentNode;
            if (this.resolveSplitSeries(node) &&
                parentNode &&
                !node.isParentNode) {
                centerX = parentNode.plotX || 0;
                centerY = parentNode.plotY || 0;
            }
            else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }
            node.plotX = plotX - ((plotX - centerX) *
                gravitationalConstant /
                massTimesNodeCountSqrt);
            node.plotY = plotY - ((plotY - centerY) *
                gravitationalConstant /
                massTimesNodeCountSqrt);
            if (series.chart.hoverPoint === node &&
                // If redrawHalo exists we know its a draggable series and any
                // halo present should be redrawn to update its visual position
                series.redrawHalo && series.halo) {
                series.redrawHalo(node);
            }
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
