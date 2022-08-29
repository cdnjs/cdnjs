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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import GraphLayout from '../GraphLayoutComposition.js';
import PackedBubbleIntegration from './PackedBubbleIntegration.js';
import ReingoldFruchtermanLayout from '../Networkgraph/ReingoldFruchtermanLayout.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, pick = U.pick;
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
/**
 * @private
 */
function chartGetSelectedParentNodes() {
    var allSeries = this.series, selectedParentsNodes = [];
    allSeries.forEach(function (series) {
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
var PackedBubbleLayout = /** @class */ (function (_super) {
    __extends(PackedBubbleLayout, _super);
    function PackedBubbleLayout() {
        /* *
         *
         *  Static Functions
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.index = NaN;
        _this.nodes = [];
        _this.options = void 0;
        _this.series = [];
        return _this;
    }
    PackedBubbleLayout.compose = function (ChartClass) {
        ReingoldFruchtermanLayout.compose(ChartClass);
        GraphLayout.integrations.packedbubble = PackedBubbleIntegration;
        GraphLayout.layouts.packedbubble = PackedBubbleLayout;
        if (composedClasses.indexOf(ChartClass) === -1) {
            composedClasses.push(ChartClass);
            addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
            var chartProto = ChartClass.prototype;
            chartProto.getSelectedParentNodes = chartGetSelectedParentNodes;
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    PackedBubbleLayout.prototype.beforeStep = function () {
        if (this.options.marker) {
            this.series.forEach(function (series) {
                if (series) {
                    series.calculateParentRadius();
                }
            });
        }
    };
    // #14439, new stable check.
    PackedBubbleLayout.prototype.isStable = function () {
        var tempDiff = Math.abs(this.prevSystemTemperature -
            this.systemTemperature);
        var upScaledTemperature = 10 * this.systemTemperature /
            Math.sqrt(this.nodes.length);
        return Math.abs(upScaledTemperature) < 1 &&
            tempDiff < 0.00001 ||
            this.temperature <= 0;
    };
    PackedBubbleLayout.prototype.setCircularPositions = function () {
        var layout = this, box = layout.box, nodes = layout.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, radius = layout.options.initialPositionRadius;
        var centerX, centerY, index = 0;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (layout.options.splitSeries &&
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
    };
    PackedBubbleLayout.prototype.repulsiveForces = function () {
        var layout = this, bubblePadding = layout.options.bubblePadding;
        var force, distanceR, distanceXY;
        layout.nodes.forEach(function (node) {
            node.degree = node.mass;
            node.neighbours = 0;
            layout.nodes.forEach(function (repNode) {
                force = 0;
                if (
                // Node cannot repulse itself:
                node !== repNode &&
                    // Only close nodes affect each other:
                    // Not dragged:
                    !node.fixedPosition &&
                    (layout.options.seriesInteraction ||
                        node.series === repNode.series)) {
                    distanceXY = layout.getDistXY(node, repNode);
                    distanceR = (layout.vectorLength(distanceXY) -
                        (node.marker.radius +
                            repNode.marker.radius +
                            bubblePadding));
                    // TODO padding configurable
                    if (distanceR < 0) {
                        node.degree += 0.01;
                        node.neighbours++;
                        force = layout.repulsiveForce(-distanceR / Math.sqrt(node.neighbours), layout.k, node, repNode);
                    }
                    layout.force('repulsive', node, force * repNode.mass, distanceXY, repNode, distanceR);
                }
            });
        });
    };
    PackedBubbleLayout.prototype.applyLimitBox = function (node, box) {
        var layout = this, factor = 0.01;
        var distanceXY, distanceR;
        // parentNodeLimit should be used together
        // with seriesInteraction: false
        if (layout.options.splitSeries &&
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
        _super.prototype.applyLimitBox.call(this, node, box);
    };
    return PackedBubbleLayout;
}(ReingoldFruchtermanLayout));
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
