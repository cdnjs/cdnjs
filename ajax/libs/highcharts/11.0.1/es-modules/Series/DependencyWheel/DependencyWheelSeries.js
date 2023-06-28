/* *
 *
 *  Dependency wheel module
 *
 *  (c) 2018-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
const { animObject } = A;
import DependencyWheelPoint from './DependencyWheelPoint.js';
import DependencyWheelSeriesDefaults from './DependencyWheelSeriesDefaults.js';
import H from '../../Core/Globals.js';
const { deg2rad } = H;
import SankeyColumnComposition from '../Sankey/SankeyColumnComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { pie: PieSeries, sankey: SankeySeries } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.dependencywheel
 *
 * @augments Highcharts.seriesTypes.sankey
 */
class DependencyWheelSeries extends SankeySeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.nodeColumns = void 0;
        this.nodes = void 0;
        this.points = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    animate(init) {
        if (!init) {
            const duration = animObject(this.options.animation).duration, step = (duration / 2) / this.nodes.length;
            this.nodes.forEach(function (point, i) {
                const graphic = point.graphic;
                if (graphic) {
                    graphic.attr({ opacity: 0 });
                    setTimeout(function () {
                        if (point.graphic) {
                            point.graphic.animate({ opacity: 1 }, { duration: step });
                        }
                    }, step * i);
                }
            }, this);
            this.points.forEach(function (point) {
                const graphic = point.graphic;
                if (!point.isNode && graphic) {
                    graphic.attr({ opacity: 0 })
                        .animate({
                        opacity: 1
                    }, this.options.animation);
                }
            }, this);
        }
    }
    createNode(id) {
        const node = SankeySeries.prototype.createNode.call(this, id);
        /**
         * Return the sum of incoming and outgoing links.
         * @private
         */
        node.getSum = function () {
            return node.linksFrom
                .concat(node.linksTo)
                .reduce(function (acc, link) {
                return acc + link.weight;
            }, 0);
        };
        /**
         * Get the offset in weight values of a point/link.
         * @private
         */
        node.offset = function (point) {
            let offset = 0, i, links = node.linksFrom.concat(node.linksTo), sliced;
            /**
             * @private
             */
            function otherNode(link) {
                if (link.fromNode === node) {
                    return link.toNode;
                }
                return link.fromNode;
            }
            // Sort and slice the links to avoid links going out of each
            // node crossing each other.
            links.sort(function (a, b) {
                return otherNode(a).index - otherNode(b).index;
            });
            for (i = 0; i < links.length; i++) {
                if (otherNode(links[i]).index > node.index) {
                    links = links.slice(0, i).reverse().concat(links.slice(i).reverse());
                    sliced = true;
                    break;
                }
            }
            if (!sliced) {
                links.reverse();
            }
            for (i = 0; i < links.length; i++) {
                if (links[i] === point) {
                    return offset;
                }
                offset += links[i].weight;
            }
        };
        return node;
    }
    /**
     * Dependency wheel has only one column, it runs along the perimeter.
     * @private
     */
    createNodeColumns() {
        const columns = [SankeyColumnComposition.compose([], this)];
        this.nodes.forEach(function (node) {
            node.column = 0;
            columns[0].push(node);
        });
        return columns;
    }
    /**
     * Translate from vertical pixels to perimeter.
     * @private
     */
    getNodePadding() {
        return this.options.nodePadding / Math.PI;
    }
    /**
     * @private
     * @todo Override the refactored sankey translateLink and translateNode
     * functions instead of the whole translate function.
     */
    translate() {
        const options = this.options, factor = 2 * Math.PI /
            (this.chart.plotHeight + this.getNodePadding()), center = this.getCenter(), startAngle = (options.startAngle - 90) * deg2rad, brOption = options.borderRadius, borderRadius = typeof brOption === 'object' ?
            brOption.radius : brOption;
        SankeySeries.prototype.translate.call(this);
        this.nodeColumns[0].forEach(function (node) {
            // Don't render the nodes if sum is 0 #12453
            if (node.sum) {
                const shapeArgs = node.shapeArgs, centerX = center[0], centerY = center[1], r = center[2] / 2, innerR = r - options.nodeWidth, start = startAngle + factor * (shapeArgs.y || 0), end = startAngle +
                    factor * ((shapeArgs.y || 0) + (shapeArgs.height || 0));
                // Middle angle
                node.angle = start + (end - start) / 2;
                node.shapeType = 'arc';
                node.shapeArgs = {
                    x: centerX,
                    y: centerY,
                    r: r,
                    innerR: innerR,
                    start: start,
                    end: end,
                    borderRadius
                };
                node.dlBox = {
                    x: centerX + Math.cos((start + end) / 2) * (r + innerR) / 2,
                    y: centerY + Math.sin((start + end) / 2) * (r + innerR) / 2,
                    width: 1,
                    height: 1
                };
                // Draw the links from this node
                node.linksFrom.forEach(function (point) {
                    if (point.linkBase) {
                        let distance;
                        const corners = point.linkBase.map(function (top, i) {
                            let angle = factor * top, x = Math.cos(startAngle + angle) * (innerR + 1), y = Math.sin(startAngle + angle) * (innerR + 1), curveFactor = options.curveFactor || 0;
                            // The distance between the from and to node
                            // along the perimeter. This affect how curved
                            // the link is, so that links between neighbours
                            // don't extend too far towards the center.
                            distance = Math.abs(point.linkBase[3 - i] * factor - angle);
                            if (distance > Math.PI) {
                                distance = 2 * Math.PI - distance;
                            }
                            distance = distance * innerR;
                            if (distance < innerR) {
                                curveFactor *= (distance / innerR);
                            }
                            return {
                                x: centerX + x,
                                y: centerY + y,
                                cpX: centerX + (1 - curveFactor) * x,
                                cpY: centerY + (1 - curveFactor) * y
                            };
                        });
                        point.shapeArgs = {
                            d: [[
                                    'M',
                                    corners[0].x, corners[0].y
                                ], [
                                    'A',
                                    innerR, innerR,
                                    0,
                                    0,
                                    1,
                                    corners[1].x, corners[1].y
                                ], [
                                    'C',
                                    corners[1].cpX, corners[1].cpY,
                                    corners[2].cpX, corners[2].cpY,
                                    corners[2].x, corners[2].y
                                ], [
                                    'A',
                                    innerR, innerR,
                                    0,
                                    0,
                                    1,
                                    corners[3].x, corners[3].y
                                ], [
                                    'C',
                                    corners[3].cpX, corners[3].cpY,
                                    corners[0].cpX, corners[0].cpY,
                                    corners[0].x, corners[0].y
                                ]]
                        };
                    }
                });
            }
        });
    }
}
DependencyWheelSeries.defaultOptions = merge(SankeySeries.defaultOptions, DependencyWheelSeriesDefaults);
extend(DependencyWheelSeries.prototype, {
    orderNodes: false,
    getCenter: PieSeries.prototype.getCenter
});
DependencyWheelSeries.prototype.pointClass = DependencyWheelPoint;
SeriesRegistry.registerSeriesType('dependencywheel', DependencyWheelSeries);
/* *
 *
 *  Default Export
 *
 * */
export default DependencyWheelSeries;
