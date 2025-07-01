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
import GraphLayout from '../GraphLayoutComposition.js';
import PackedBubbleIntegration from './PackedBubbleIntegration.js';
import ReingoldFruchtermanLayout from '../Networkgraph/ReingoldFruchtermanLayout.js';
import U from '../../Core/Utilities.js';
const { addEvent, defined, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function chartGetSelectedParentNodes() {
    const allSeries = this.series, selectedParentsNodes = [];
    allSeries.forEach((series) => {
        if (series.parentNode && series.parentNode.selected) {
            selectedParentsNodes.push(series.parentNode);
        }
    });
    return selectedParentsNodes;
}
/**
 * Remove accumulated data points to redistribute all of them again
 * (i.e after hiding series by legend)
 * @private
 */
function onChartBeforeRedraw() {
    if (this.allDataPoints) {
        delete this.allDataPoints;
    }
}
/* *
 *
 *  Class
 *
 * */
class PackedBubbleLayout extends ReingoldFruchtermanLayout {
    constructor() {
        /* *
         *
         *  Static Functions
         *
         * */
        super(...arguments);
        this.index = NaN;
        this.nodes = [];
        this.series = [];
    }
    static compose(ChartClass) {
        ReingoldFruchtermanLayout.compose(ChartClass);
        GraphLayout.integrations.packedbubble = PackedBubbleIntegration;
        GraphLayout.layouts.packedbubble = PackedBubbleLayout;
        const chartProto = ChartClass.prototype;
        if (!chartProto.getSelectedParentNodes) {
            addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
            chartProto.getSelectedParentNodes = chartGetSelectedParentNodes;
        }
        if (!chartProto.allParentNodes) {
            chartProto.allParentNodes = [];
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    beforeStep() {
        if (this.options.marker) {
            this.series.forEach((series) => {
                if (series) {
                    series.calculateParentRadius();
                }
            });
        }
    }
    // #14439, new stable check.
    isStable() {
        const tempDiff = Math.abs(this.prevSystemTemperature -
            this.systemTemperature);
        const upScaledTemperature = 10 * this.systemTemperature /
            Math.sqrt(this.nodes.length);
        return Math.abs(upScaledTemperature) < 1 &&
            tempDiff < 0.00001 ||
            this.temperature <= 0;
    }
    setCircularPositions() {
        const layout = this, box = layout.box, nodes = [
            ...layout.nodes,
            ...layout?.chart?.allParentNodes || []
        ], nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, radius = layout.options.initialPositionRadius;
        let centerX, centerY, index = 0;
        for (const node of nodes) {
            if (this.resolveSplitSeries(node) &&
                !node.isParentNode) {
                centerX = node.series.parentNode.plotX;
                centerY = node.series.parentNode.plotY;
            }
            else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }
            node.plotX = node.prevX = pick(node.plotX, centerX +
                radius * Math.cos(node.index || index * angle));
            node.plotY = node.prevY = pick(node.plotY, centerY +
                radius * Math.sin(node.index || index * angle));
            node.dispX = 0;
            node.dispY = 0;
            index++;
        }
    }
    repulsiveForces() {
        const layout = this, { options, k } = layout, { bubblePadding = 0, seriesInteraction } = options, nodes = [
            ...layout.nodes,
            ...layout?.chart?.allParentNodes || []
        ];
        for (const node of nodes) {
            const nodeSeries = node.series, fixedPosition = node.fixedPosition, paddedNodeRadius = ((node.marker?.radius || 0) +
                bubblePadding);
            node.degree = node.mass;
            node.neighbours = 0;
            for (const repNode of nodes) {
                const repNodeSeries = repNode.series;
                if (
                // Node cannot repulse itself:
                node !== repNode &&
                    // Not dragged:
                    !fixedPosition &&
                    (seriesInteraction || nodeSeries === repNodeSeries) &&
                    // Avoiding collision of parentNodes and parented points
                    !(nodeSeries === repNodeSeries &&
                        (repNode.isParentNode || node.isParentNode))) {
                    const distanceXY = layout.getDistXY(node, repNode), distanceR = (layout.vectorLength(distanceXY) -
                        (paddedNodeRadius + (repNode.marker?.radius || 0)));
                    let forceTimesMass;
                    // TODO padding configurable
                    if (distanceR < 0) {
                        node.degree += 0.01;
                        forceTimesMass = (layout.repulsiveForce(-distanceR / Math.sqrt(++(node.neighbours)), k, node, repNode) *
                            repNode.mass);
                    }
                    layout.force('repulsive', node, forceTimesMass || 0, distanceXY, repNode, distanceR);
                }
            }
        }
    }
    resolveSplitSeries(node) {
        const specificSeriesOpt = node
            .series
            ?.options
            ?.layoutAlgorithm
            ?.splitSeries;
        return (!defined(specificSeriesOpt) &&
            node.series.chart
                ?.options
                ?.plotOptions
                ?.packedbubble
                ?.layoutAlgorithm
                ?.splitSeries) ||
            specificSeriesOpt ||
            false;
    }
    applyLimitBox(node, box) {
        const layout = this, factor = 0.01;
        let distanceXY, distanceR;
        // `parentNodeLimit` should be used together with seriesInteraction:
        // false
        if (this.resolveSplitSeries(node) &&
            !node.isParentNode &&
            layout.options.parentNodeLimit) {
            distanceXY = layout.getDistXY(node, node.series.parentNode);
            distanceR = (node.series.parentNodeRadius -
                node.marker.radius -
                layout.vectorLength(distanceXY));
            if (distanceR < 0 &&
                distanceR > -2 * node.marker.radius) {
                node.plotX -= distanceXY.x * factor;
                node.plotY -= distanceXY.y * factor;
            }
        }
        super.applyLimitBox(node, box);
    }
}
/* *
 *
 *  Registry
 *
 * */
GraphLayout.layouts.packedbubble = PackedBubbleLayout;
/* *
 *
 *  Default Export
 *
 * */
export default PackedBubbleLayout;
