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
import DragNodesComposition from '../DragNodesComposition.js';
import GraphLayout from '../GraphLayoutComposition.js';
import H from '../../Core/Globals.js';
var noop = H.noop;
import NetworkgraphPoint from './NetworkgraphPoint.js';
import NetworkgraphSeriesDefaults from './NetworkgraphSeriesDefaults.js';
import NodesComposition from '../NodesComposition.js';
import ReingoldFruchtermanLayout from './ReingoldFruchtermanLayout.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var Series = SeriesRegistry.series, _a = SeriesRegistry.seriesTypes, columnProto = _a.column.prototype, lineProto = _a.line.prototype;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, defined = U.defined, extend = U.extend, merge = U.merge, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.networkgraph
 *
 * @extends Highcharts.Series
 */
var NetworkgraphSeries = /** @class */ (function (_super) {
    __extends(NetworkgraphSeries, _super);
    function NetworkgraphSeries() {
        /* *
         *
         *  Static Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.data = void 0;
        _this.nodes = void 0;
        _this.options = void 0;
        _this.points = void 0;
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    NetworkgraphSeries.compose = function (ChartClass) {
        DragNodesComposition.compose(ChartClass);
        ReingoldFruchtermanLayout.compose(ChartClass);
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Defer the layout.
     * Each series first registers all nodes and links, then layout
     * calculates all nodes positions and calls `series.render()` in every
     * simulation step.
     *
     * Note:
     * Animation is done through `requestAnimationFrame` directly, without
     * `Highcharts.animate()` use.
     * @private
     */
    NetworkgraphSeries.prototype.deferLayout = function () {
        var layoutOptions = this.options.layoutAlgorithm, graphLayoutsStorage = this.chart.graphLayoutsStorage, graphLayoutsLookup = this.chart.graphLayoutsLookup, chartOptions = this.chart.options.chart, layout;
        if (!this.visible) {
            return;
        }
        if (!graphLayoutsStorage) {
            this.chart.graphLayoutsStorage = graphLayoutsStorage = {};
            this.chart.graphLayoutsLookup = graphLayoutsLookup = [];
        }
        layout = graphLayoutsStorage[layoutOptions.type];
        if (!layout) {
            layoutOptions.enableSimulation =
                !defined(chartOptions.forExport) ?
                    layoutOptions.enableSimulation :
                    !chartOptions.forExport;
            graphLayoutsStorage[layoutOptions.type] = layout =
                new GraphLayout.layouts[layoutOptions.type]();
            layout.init(layoutOptions);
            graphLayoutsLookup.splice(layout.index, 0, layout);
        }
        this.layout = layout;
        layout.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
        layout.addElementsToCollection([this], layout.series);
        layout.addElementsToCollection(this.nodes, layout.nodes);
        layout.addElementsToCollection(this.points, layout.links);
    };
    /**
     * @private
     */
    NetworkgraphSeries.prototype.destroy = function () {
        if (this.layout) {
            this.layout.removeElementFromCollection(this, this.layout.series);
        }
        NodesComposition.destroy.call(this);
    };
    /**
     * Networkgraph has two separate collecions of nodes and lines, render
     * dataLabels for both sets:
     * @private
     */
    NetworkgraphSeries.prototype.drawDataLabels = function () {
        var textPath = this.options.dataLabels.textPath;
        // Render node labels:
        Series.prototype.drawDataLabels.call(this, this.nodes);
        // Render link labels:
        this.options.dataLabels.textPath =
            this.options.dataLabels.linkTextPath;
        Series.prototype.drawDataLabels.call(this, this.data);
        this.options.dataLabels.textPath = textPath;
    };
    /**
     * Extend generatePoints by adding the nodes, which are Point objects
     * but pushed to the this.nodes array.
     * @private
     */
    NetworkgraphSeries.prototype.generatePoints = function () {
        var node, i;
        NodesComposition.generatePoints.apply(this, arguments);
        // In networkgraph, it's fine to define stanalone nodes, create
        // them:
        if (this.options.nodes) {
            this.options.nodes.forEach(function (nodeOptions) {
                if (!this.nodeLookup[nodeOptions.id]) {
                    this.nodeLookup[nodeOptions.id] =
                        this.createNode(nodeOptions.id);
                }
            }, this);
        }
        for (i = this.nodes.length - 1; i >= 0; i--) {
            node = this.nodes[i];
            node.degree = node.getDegree();
            node.radius = pick(node.marker && node.marker.radius, this.options.marker && this.options.marker.radius, 0);
            // If node exists, but it's not available in nodeLookup,
            // then it's leftover from previous runs (e.g. setData)
            if (!this.nodeLookup[node.id]) {
                node.remove();
            }
        }
        this.data.forEach(function (link) {
            link.formatPrefix = 'link';
        });
        this.indexateNodes();
    };
    /**
     * In networkgraph, series.points refers to links,
     * but series.nodes refers to actual points.
     * @private
     */
    NetworkgraphSeries.prototype.getPointsCollection = function () {
        return this.nodes || [];
    };
    /**
     * Set index for each node. Required for proper `node.update()`.
     * Note that links are indexated out of the box in `generatePoints()`.
     *
     * @private
     */
    NetworkgraphSeries.prototype.indexateNodes = function () {
        this.nodes.forEach(function (node, index) {
            node.index = index;
        });
    };
    /**
     * Extend init with base event, which should stop simulation during
     * update. After data is updated, `chart.render` resumes the simulation.
     * @private
     */
    NetworkgraphSeries.prototype.init = function (chart, options) {
        var _this = this;
        _super.prototype.init.call(this, chart, options);
        addEvent(this, 'updatedData', function () {
            if (_this.layout) {
                _this.layout.stop();
            }
        });
        addEvent(this, 'afterUpdate', function () {
            _this.nodes.forEach(function (node) {
                if (node && node.series) {
                    node.resolveColor();
                }
            });
        });
        return this;
    };
    /**
     * Extend the default marker attribs by using a non-rounded X position,
     * otherwise the nodes will jump from pixel to pixel which looks a bit
     * jaggy when approaching equilibrium.
     * @private
     */
    NetworkgraphSeries.prototype.markerAttribs = function (point, state) {
        var attribs = Series.prototype.markerAttribs.call(this, point, state);
        // series.render() is called before initial positions are set:
        if (!defined(point.plotY)) {
            attribs.y = 0;
        }
        attribs.x = (point.plotX || 0) - (attribs.width || 0) / 2;
        return attribs;
    };
    /**
     * Return the presentational attributes.
     * @private
     */
    NetworkgraphSeries.prototype.pointAttribs = function (point, state) {
        // By default, only `selected` state is passed on
        var pointState = state || point && point.state || 'normal', attribs = Series.prototype.pointAttribs.call(this, point, pointState), stateOptions = this.options.states[pointState];
        if (point && !point.isNode) {
            attribs = point.getLinkAttributes();
            // For link, get prefixed names:
            if (stateOptions) {
                attribs = {
                    // TO DO: API?
                    stroke: stateOptions.linkColor || attribs.stroke,
                    dashstyle: (stateOptions.linkDashStyle || attribs.dashstyle),
                    opacity: pick(stateOptions.linkOpacity, attribs.opacity),
                    'stroke-width': stateOptions.linkColor ||
                        attribs['stroke-width']
                };
            }
        }
        return attribs;
    };
    /**
     * Extend the render function to also render this.nodes together with
     * the points.
     * @private
     */
    NetworkgraphSeries.prototype.render = function () {
        var series = this, points = series.points, hoverPoint = series.chart.hoverPoint, dataLabels = [];
        // Render markers:
        series.points = series.nodes;
        lineProto.render.call(this);
        series.points = points;
        points.forEach(function (point) {
            if (point.fromNode && point.toNode) {
                point.renderLink();
                point.redrawLink();
            }
        });
        if (hoverPoint && hoverPoint.series === series) {
            series.redrawHalo(hoverPoint);
        }
        if (series.chart.hasRendered &&
            !series.options.dataLabels.allowOverlap) {
            series.nodes.concat(series.points).forEach(function (node) {
                if (node.dataLabel) {
                    dataLabels.push(node.dataLabel);
                }
            });
            series.chart.hideOverlappingLabels(dataLabels);
        }
    };
    /**
     * When state should be passed down to all points, concat nodes and
     * links and apply this state to all of them.
     * @private
     */
    NetworkgraphSeries.prototype.setState = function (state, inherit) {
        if (inherit) {
            this.points = this.nodes.concat(this.data);
            Series.prototype.setState.apply(this, arguments);
            this.points = this.data;
        }
        else {
            Series.prototype.setState.apply(this, arguments);
        }
        // If simulation is done, re-render points with new states:
        if (!this.layout.simulation && !state) {
            this.render();
        }
    };
    /**
     * Run pre-translation and register nodes&links to the deffered layout.
     * @private
     */
    NetworkgraphSeries.prototype.translate = function () {
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
    };
    NetworkgraphSeries.defaultOptions = merge(Series.defaultOptions, NetworkgraphSeriesDefaults);
    return NetworkgraphSeries;
}(Series));
extend(NetworkgraphSeries.prototype, {
    pointClass: NetworkgraphPoint,
    animate: void 0,
    directTouch: true,
    drawGraph: void 0,
    forces: ['barycenter', 'repulsive', 'attractive'],
    hasDraggableNodes: true,
    isCartesian: false,
    noSharedTooltip: true,
    pointArrayMap: ['from', 'to'],
    requireSorting: false,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    buildKDTree: noop,
    createNode: NodesComposition.createNode,
    drawTracker: columnProto.drawTracker,
    onMouseDown: DragNodesComposition.onMouseDown,
    onMouseMove: DragNodesComposition.onMouseMove,
    onMouseUp: DragNodesComposition.onMouseUp,
    redrawHalo: DragNodesComposition.redrawHalo
});
SeriesRegistry.registerSeriesType('networkgraph', NetworkgraphSeries);
/* *
 *
 *  Default Export
 *
 * */
export default NetworkgraphSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Formatter callback function.
 *
 * @callback Highcharts.SeriesNetworkgraphDataLabelsFormatterCallbackFunction
 *
 * @param {Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject|Highcharts.PointLabelObject} this
 *        Data label context to format
 *
 * @return {string}
 *         Formatted data label text
 */
/**
 * Context for the formatter function.
 *
 * @interface Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject
 * @extends Highcharts.PointLabelObject
 * @since 7.0.0
 */ /**
* The color of the node.
* @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#color
* @type {Highcharts.ColorString}
* @since 7.0.0
*/ /**
* The point (node) object. The node name, if defined, is available through
* `this.point.name`. Arrays: `this.point.linksFrom` and `this.point.linksTo`
* contains all nodes connected to this point.
* @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#point
* @type {Highcharts.Point}
* @since 7.0.0
*/ /**
* The ID of the node.
* @name Highcharts.SeriesNetworkgraphDataLabelsFormatterContextObject#key
* @type {string}
* @since 7.0.0
*/
''; // detach doclets above
