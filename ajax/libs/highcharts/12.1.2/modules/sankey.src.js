/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/sankey
 * @requires highcharts
 *
 * Sankey diagram module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Point"], root["_Highcharts"]["Color"], root["_Highcharts"]["SVGElement"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/sankey", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Point"],amd1["Color"],amd1["SVGElement"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/sankey"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Point"], root["_Highcharts"]["Color"], root["_Highcharts"]["SVGElement"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Point"], root["Highcharts"]["Color"], root["Highcharts"]["SVGElement"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__260__, __WEBPACK_EXTERNAL_MODULE__620__, __WEBPACK_EXTERNAL_MODULE__28__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 620:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__620__;

/***/ }),

/***/ 260:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__260__;

/***/ }),

/***/ 28:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ sankey_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/NodesComposition.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { series: { prototype: seriesProto, prototype: { pointClass: { prototype: pointProto } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { defined, extend, find, merge, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Composition
 *
 * */
var NodesComposition;
(function (NodesComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(PointClass, SeriesClass) {
        const pointProto = PointClass.prototype, seriesProto = SeriesClass.prototype;
        pointProto.setNodeState = setNodeState;
        pointProto.setState = setNodeState;
        pointProto.update = updateNode;
        seriesProto.destroy = destroy;
        seriesProto.setData = setData;
        return SeriesClass;
    }
    NodesComposition.compose = compose;
    /**
     * Create a single node that holds information on incoming and outgoing
     * links.
     * @private
     */
    function createNode(id) {
        const PointClass = this.pointClass, findById = (nodes, id) => find(nodes, (node) => node.id === id);
        let node = findById(this.nodes, id), options;
        if (!node) {
            options = this.options.nodes && findById(this.options.nodes, id);
            const newNode = new PointClass(this, extend({
                className: 'highcharts-node',
                isNode: true,
                id: id,
                y: 1 // Pass isNull test
            }, options));
            newNode.linksTo = [];
            newNode.linksFrom = [];
            /**
             * Return the largest sum of either the incoming or outgoing links.
             * @private
             */
            newNode.getSum = function () {
                let sumTo = 0, sumFrom = 0;
                newNode.linksTo.forEach((link) => {
                    sumTo += link.weight || 0;
                });
                newNode.linksFrom.forEach((link) => {
                    sumFrom += link.weight || 0;
                });
                return Math.max(sumTo, sumFrom);
            };
            /**
             * Get the offset in weight values of a point/link.
             * @private
             */
            newNode.offset = function (point, coll) {
                let offset = 0;
                for (let i = 0; i < newNode[coll].length; i++) {
                    if (newNode[coll][i] === point) {
                        return offset;
                    }
                    offset += newNode[coll][i].weight;
                }
            };
            // Return true if the node has a shape, otherwise all links are
            // outgoing.
            newNode.hasShape = function () {
                let outgoing = 0;
                newNode.linksTo.forEach((link) => {
                    if (link.outgoing) {
                        outgoing++;
                    }
                });
                return (!newNode.linksTo.length ||
                    outgoing !== newNode.linksTo.length);
            };
            newNode.index = this.nodes.push(newNode) - 1;
            node = newNode;
        }
        node.formatPrefix = 'node';
        // For use in formats
        node.name = node.name || node.options.id || '';
        // Mass is used in networkgraph:
        node.mass = pick(
        // Node:
        node.options.mass, node.options.marker && node.options.marker.radius, 
        // Series:
        this.options.marker && this.options.marker.radius, 
        // Default:
        4);
        return node;
    }
    NodesComposition.createNode = createNode;
    /**
     * Destroy all nodes and links.
     * @private
     */
    function destroy() {
        // Nodes must also be destroyed (#8682, #9300)
        this.data = []
            .concat(this.points || [], this.nodes);
        return seriesProto.destroy.apply(this, arguments);
    }
    NodesComposition.destroy = destroy;
    /**
     * Extend generatePoints by adding the nodes, which are Point objects but
     * pushed to the this.nodes array.
     * @private
     */
    function generatePoints() {
        const chart = this.chart, nodeLookup = {};
        seriesProto.generatePoints.call(this);
        if (!this.nodes) {
            this.nodes = []; // List of Point-like node items
        }
        this.colorCounter = 0;
        // Reset links from previous run
        this.nodes.forEach((node) => {
            node.linksFrom.length = 0;
            node.linksTo.length = 0;
            node.level = node.options.level;
        });
        // Create the node list and set up links
        this.points.forEach((point) => {
            if (defined(point.from)) {
                if (!nodeLookup[point.from]) {
                    nodeLookup[point.from] = this.createNode(point.from);
                }
                nodeLookup[point.from].linksFrom.push(point);
                point.fromNode = nodeLookup[point.from];
                // Point color defaults to the fromNode's color
                if (chart.styledMode) {
                    point.colorIndex = pick(point.options.colorIndex, nodeLookup[point.from].colorIndex);
                }
                else {
                    point.color =
                        point.options.color || nodeLookup[point.from].color;
                }
            }
            if (defined(point.to)) {
                if (!nodeLookup[point.to]) {
                    nodeLookup[point.to] = this.createNode(point.to);
                }
                nodeLookup[point.to].linksTo.push(point);
                point.toNode = nodeLookup[point.to];
            }
            point.name = point.name || point.id; // For use in formats
        }, this);
        // Store lookup table for later use
        this.nodeLookup = nodeLookup;
    }
    NodesComposition.generatePoints = generatePoints;
    /**
     * Destroy all nodes on setting new data
     * @private
     */
    function setData() {
        if (this.nodes) {
            this.nodes.forEach((node) => {
                node.destroy();
            });
            this.nodes.length = 0;
        }
        seriesProto.setData.apply(this, arguments);
    }
    /**
     * When hovering node, highlight all connected links. When hovering a link,
     * highlight all connected nodes.
     * @private
     */
    function setNodeState(state) {
        const args = arguments, others = this.isNode ? this.linksTo.concat(this.linksFrom) :
            [this.fromNode, this.toNode];
        if (state !== 'select') {
            others.forEach((linkOrNode) => {
                if (linkOrNode && linkOrNode.series) {
                    pointProto.setState.apply(linkOrNode, args);
                    if (!linkOrNode.isNode) {
                        if (linkOrNode.fromNode.graphic) {
                            pointProto.setState.apply(linkOrNode.fromNode, args);
                        }
                        if (linkOrNode.toNode && linkOrNode.toNode.graphic) {
                            pointProto.setState.apply(linkOrNode.toNode, args);
                        }
                    }
                }
            });
        }
        pointProto.setState.apply(this, args);
    }
    NodesComposition.setNodeState = setNodeState;
    /**
     * When updating a node, don't update `series.options.data`, but
     * `series.options.nodes`
     * @private
     */
    function updateNode(options, redraw, animation, runEvent) {
        const nodes = this.series.options.nodes, data = this.series.options.data, dataLength = data?.length || 0, linkConfig = data?.[this.index];
        pointProto.update.call(this, options, this.isNode ? false : redraw, // Hold the redraw for nodes
        animation, runEvent);
        if (this.isNode) {
            // `this.index` refers to `series.nodes`, not `options.nodes` array
            const nodeIndex = (nodes || [])
                .reduce(// Array.findIndex needs a polyfill
            (prevIndex, n, index) => (this.id === n.id ? index : prevIndex), -1), 
            // Merge old config with new config. New config is stored in
            // options.data, because of default logic in point.update()
            nodeConfig = merge(nodes && nodes[nodeIndex] || {}, data?.[this.index] || {});
            // Restore link config
            if (data) {
                if (linkConfig) {
                    data[this.index] = linkConfig;
                }
                else {
                    // Remove node from config if there's more nodes than links
                    data.length = dataLength;
                }
            }
            // Set node config
            if (nodes) {
                if (nodeIndex >= 0) {
                    nodes[nodeIndex] = nodeConfig;
                }
                else {
                    nodes.push(nodeConfig);
                }
            }
            else {
                this.series.options.nodes = [nodeConfig];
            }
            if (pick(redraw, true)) {
                this.series.chart.redraw(animation);
            }
        }
    }
    NodesComposition.updateNode = updateNode;
})(NodesComposition || (NodesComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Series_NodesComposition = (NodesComposition);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Point"],"commonjs":["highcharts","Point"],"commonjs2":["highcharts","Point"],"root":["Highcharts","Point"]}
var highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_ = __webpack_require__(260);
var highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default = /*#__PURE__*/__webpack_require__.n(highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_);
;// ./code/es-modules/Series/Sankey/SankeyPoint.js
/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { column: ColumnSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { defined: SankeyPoint_defined } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class SankeyPoint extends ColumnSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    applyOptions(options, x) {
        highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default().prototype.applyOptions.call(this, options, x);
        // Treat point.level as a synonym of point.column
        if (SankeyPoint_defined(this.options.level)) {
            this.options.column = this.column = this.options.level;
        }
        return this;
    }
    /**
     * @private
     */
    getClassName() {
        return (this.isNode ? 'highcharts-node ' : 'highcharts-link ') +
            highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default().prototype.getClassName.call(this);
    }
    /**
     * If there are incoming links, place it to the right of the
     * highest order column that links to this one.
     *
     * @private
     */
    getFromNode() {
        const node = this;
        let fromColumn = -1, fromNode;
        for (let i = 0; i < node.linksTo.length; i++) {
            const point = node.linksTo[i];
            if (point.fromNode.column > fromColumn &&
                point.fromNode !== node // #16080
            ) {
                fromNode = point.fromNode;
                fromColumn = fromNode.column;
            }
        }
        return { fromNode, fromColumn };
    }
    /**
     * Calculate node.column if it's not set by user
     * @private
     */
    setNodeColumn() {
        const node = this;
        if (!SankeyPoint_defined(node.options.column)) {
            // No links to this node, place it left
            if (node.linksTo.length === 0) {
                node.column = 0;
            }
            else {
                node.column = node.getFromNode().fromColumn + 1;
            }
        }
    }
    /**
     * @private
     */
    isValid() {
        return this.isNode || typeof this.weight === 'number';
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Sankey_SankeyPoint = (SankeyPoint);

;// ./code/es-modules/Series/Sankey/SankeySeriesDefaults.js
/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * A sankey diagram is a type of flow diagram, in which the width of the
 * link between two nodes is shown proportionally to the flow quantity.
 *
 * @sample highcharts/demo/sankey-diagram/
 *         Sankey diagram
 * @sample highcharts/plotoptions/sankey-inverted/
 *         Inverted sankey diagram
 * @sample highcharts/plotoptions/sankey-outgoing
 *         Sankey diagram with outgoing links
 *
 * @extends      plotOptions.column
 * @since        6.0.0
 * @product      highcharts
 * @excluding    animationLimit, boostBlending, boostThreshold, borderRadius,
 *               crisp, cropThreshold, colorAxis, colorKey, dataSorting, depth,
 *               dragDrop, edgeColor, edgeWidth, findNearestPointBy, grouping,
 *               groupPadding, groupZPadding, legendSymbolColor, maxPointWidth,
 *               minPointLength, negativeColor, pointInterval,
 *               pointIntervalUnit, pointPadding, pointPlacement, pointRange,
 *               pointStart, pointWidth, shadow, softThreshold, stacking,
 *               threshold, zoneAxis, zones
 * @requires     modules/sankey
 * @optionparent plotOptions.sankey
 *
 * @private
 */
const SankeySeriesDefaults = {
    borderWidth: 0,
    colorByPoint: true,
    /**
     * Higher numbers makes the links in a sankey diagram or dependency
     * wheelrender more curved. A `curveFactor` of 0 makes the lines
     * straight.
     *
     * @private
     */
    curveFactor: 0.33,
    /**
     * Options for the data labels appearing on top of the nodes and links.
     * For sankey charts, data labels are visible for the nodes by default,
     * but hidden for links. This is controlled by modifying the
     * `nodeFormat`, and the `format` that applies to links and is an empty
     * string by default.
     *
     * @declare Highcharts.SeriesSankeyDataLabelsOptionsObject
     *
     * @private
     */
    dataLabels: {
        enabled: true,
        backgroundColor: 'none', // Enable padding
        crop: false,
        /**
         * The
         * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
         * specifying what to show for _nodes_ in the sankey diagram. By
         * default the `nodeFormatter` returns `{point.name}`.
         *
         * @sample highcharts/plotoptions/sankey-link-datalabels/
         *         Node and link data labels
         *
         * @type {string}
         */
        nodeFormat: void 0,
        /**
         * Callback to format data labels for _nodes_ in the sankey diagram.
         * The `nodeFormat` option takes precedence over the
         * `nodeFormatter`.
         *
         * @type  {Highcharts.SeriesSankeyDataLabelsFormatterCallbackFunction}
         * @since 6.0.2
         */
        nodeFormatter: function () {
            return this.point.name;
        },
        format: void 0,
        /**
         * @type {Highcharts.SeriesSankeyDataLabelsFormatterCallbackFunction}
         */
        formatter: function () {
            return;
        },
        inside: true
    },
    /**
     * @default   true
     * @extends   plotOptions.series.inactiveOtherPoints
     * @private
     */
    inactiveOtherPoints: true,
    /**
     * Set options on specific levels. Takes precedence over series options,
     * but not node and link options.
     *
     * @sample highcharts/demo/sunburst
     *         Sunburst chart
     *
     * @type      {Array<*>}
     * @since     7.1.0
     * @apioption plotOptions.sankey.levels
     */
    /**
     * Can set `borderColor` on all nodes which lay on the same level.
     *
     * @type      {Highcharts.ColorString}
     * @apioption plotOptions.sankey.levels.borderColor
     */
    /**
     * Can set `borderWidth` on all nodes which lay on the same level.
     *
     * @type      {number}
     * @apioption plotOptions.sankey.levels.borderWidth
     */
    /**
     * Can set `color` on all nodes which lay on the same level.
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @apioption plotOptions.sankey.levels.color
     */
    /**
     * Can set `colorByPoint` on all nodes which lay on the same level.
     *
     * @type      {boolean}
     * @default   true
     * @apioption plotOptions.sankey.levels.colorByPoint
     */
    /**
     * Can set `dataLabels` on all points which lay on the same level.
     *
     * @extends   plotOptions.sankey.dataLabels
     * @apioption plotOptions.sankey.levels.dataLabels
     */
    /**
     * Decides which level takes effect from the options set in the levels
     * object.
     *
     * @type      {number}
     * @apioption plotOptions.sankey.levels.level
     */
    /**
     * Can set `linkOpacity` on all points which lay on the same level.
     *
     * @type      {number}
     * @default   0.5
     * @apioption plotOptions.sankey.levels.linkOpacity
     */
    /**
     * Can set `states` on all nodes and points which lay on the same level.
     *
     * @extends   plotOptions.sankey.states
     * @apioption plotOptions.sankey.levels.states
     */
    /**
     * Determines color mode for sankey links. Available options:
     *
     * - `from` color of the sankey link will be the same as the 'from node'
     *
     * - `gradient` color of the sankey link will be set to gradient between
     * colors of 'from node' and 'to node'
     *
     * - `to` color of the sankey link will be same as the 'to node'.
     *
     * @sample highcharts/demo/vertical-sankey
     *         Vertical sankey diagram with gradients
     * @sample highcharts/series-sankey/link-color-mode
     *         Sankey diagram with gradients and explanation
     *
     * @type      {('from'|'gradient'|'to')}
     * @since     11.2.0
     */
    linkColorMode: 'from',
    /**
     * Opacity for the links between nodes in the sankey diagram.
     *
     * @private
     */
    linkOpacity: 0.5,
    /**
     * Opacity for the nodes in the sankey diagram.
     *
     * @private
     */
    opacity: 1,
    /**
     * The minimal width for a line of a sankey. By default,
     * 0 values are not shown.
     *
     * @sample highcharts/plotoptions/sankey-minlinkwidth
     *         Sankey diagram with minimal link height
     *
     * @type      {number}
     * @since     7.1.3
     * @default   0
     * @apioption plotOptions.sankey.minLinkWidth
     *
     * @private
     */
    minLinkWidth: 0,
    /**
     * Determines which side of the chart the nodes are to be aligned to. When
     * the chart is inverted, `top` aligns to the left and `bottom` to the
     * right.
     *
     * @sample highcharts/plotoptions/sankey-nodealignment
     *         Node alignment demonstrated
     *
     * @type      {'top'|'center'|'bottom'}
     * @apioption plotOptions.sankey.nodeAlignment
     */
    nodeAlignment: 'center',
    /**
     * The pixel width of each node in a sankey diagram or dependency wheel, or
     * the height in case the chart is inverted.
     *
     * Can be a number or a percentage string.
     *
     * Sankey series also support setting it to `auto`. With this setting, the
     * nodes are sized to fill up the plot area in the longitudinal direction,
     * regardless of the number of levels.
     *
     * @see    [sankey.nodeDistance](#nodeDistance)
     * @sample highcharts/series-sankey/node-distance
     *         Sankey with auto node width combined with node distance
     * @sample highcharts/series-organization/node-distance
     *         Organization chart with node distance of 50%
     *
     * @type {number|string}
     */
    nodeWidth: 20,
    /**
     * The padding between nodes in a sankey diagram or dependency wheel, in
     * pixels. For sankey charts, this applies to the nodes of the same column,
     * so vertical distance by default, or horizontal distance in an inverted
     * (vertical) sankey.
     *
     * If the number of nodes is so great that it is impossible to lay them out
     * within the plot area with the given `nodePadding`, they will be rendered
     * with a smaller padding as a strategy to avoid overflow.
     */
    nodePadding: 10,
    /**
     * The distance between nodes in a sankey diagram in the longitudinal
     * direction. The longitudinal direction means the direction that the chart
     * flows - in a horizontal chart the distance is horizontal, in an inverted
     * chart (vertical), the distance is vertical.
     *
     * If a number is given, it denotes pixels. If a percentage string is given,
     * the distance is a percentage of the rendered node width. A `nodeDistance`
     * of `100%` will render equal widths for the nodes and the gaps between
     * them.
     *
     * This option applies only when the `nodeWidth` option is `auto`, making
     * the node width respond to the number of columns.
     *
     * @since 11.4.0
     * @sample highcharts/series-sankey/node-distance
     *         Sankey with dnode distance of 100% means equal to node width
     * @sample highcharts/series-organization/node-distance
     *         Organization chart with node distance of 50%
     * @type   {number|string}
     */
    nodeDistance: 30,
    showInLegend: false,
    states: {
        hover: {
            /**
             * Opacity for the links between nodes in the sankey diagram in
             * hover mode.
             */
            linkOpacity: 1,
            /**
             * Opacity for the nodes in the sankey diagram in hover mode.
             */
            opacity: 1
        },
        /**
         * The opposite state of a hover for a single point node/link.
         *
         * @declare Highcharts.SeriesStatesInactiveOptionsObject
         */
        inactive: {
            /**
             * Opacity for the links between nodes in the sankey diagram in
             * inactive mode.
             */
            linkOpacity: 0.1,
            /**
             * Opacity of the nodes in the sankey diagram in inactive mode.
             */
            opacity: 0.1,
            /**
             * Animation when not hovering over the marker.
             *
             * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
             * @apioption plotOptions.series.states.inactive.animation
             */
            animation: {
                /** @internal */
                duration: 50
            }
        }
    },
    tooltip: {
        /**
         * A callback for defining the format for _nodes_ in the chart's
         * tooltip, as opposed to links.
         *
         * @type      {Highcharts.FormatterCallbackFunction<Highcharts.SankeyNodeObject>}
         * @since     6.0.2
         * @apioption plotOptions.sankey.tooltip.nodeFormatter
         */
        /**
         * Whether the tooltip should follow the pointer or stay fixed on
         * the item.
         */
        followPointer: true,
        headerFormat: '<span style="font-size: 0.8em">{series.name}</span><br/>',
        pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>',
        /**
         * The
         * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
         * specifying what to show for _nodes_ in tooltip of a diagram
         * series, as opposed to links.
         */
        nodeFormat: '{point.name}: <b>{point.sum}</b><br/>'
    }
};
/**
 * A `sankey` series. If the [type](#series.sankey.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.sankey
 * @excluding animationLimit, boostBlending, boostThreshold, borderColor,
 *            borderRadius, borderWidth, crisp, cropThreshold, dataParser,
 *            dataURL, depth, dragDrop, edgeColor, edgeWidth,
 *            findNearestPointBy, getExtremesFromAll, grouping, groupPadding,
 *            groupZPadding, label, maxPointWidth, negativeColor, pointInterval,
 *            pointIntervalUnit, pointPadding, pointPlacement, pointRange,
 *            pointStart, pointWidth, shadow, softThreshold, stacking,
 *            threshold, zoneAxis, zones, dataSorting
 * @product   highcharts
 * @requires  modules/sankey
 * @apioption series.sankey
 */
/**
 * A collection of options for the individual nodes. The nodes in a sankey
 * diagram are auto-generated instances of `Highcharts.Point`, but options can
 * be applied here and linked by the `id`.
 *
 * @sample highcharts/css/sankey/
 *         Sankey diagram with node options
 *
 * @declare   Highcharts.SeriesSankeyNodesOptionsObject
 * @type      {Array<*>}
 * @product   highcharts
 * @apioption series.sankey.nodes
 */
/**
 * The id of the auto-generated node, referring to the `from` or `to` setting of
 * the link.
 *
 * @type      {string}
 * @product   highcharts
 * @apioption series.sankey.nodes.id
 */
/**
 * The color of the auto generated node.
 *
 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
 * @product   highcharts
 * @apioption series.sankey.nodes.color
 */
/**
 * The color index of the auto generated node, especially for use in styled
 * mode.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.sankey.nodes.colorIndex
 */
/**
 * An optional column index of where to place the node. The default behaviour is
 * to place it next to the preceding node. Note that this option name is
 * counter intuitive in inverted charts, like for example an organization chart
 * rendered top down. In this case the "columns" are horizontal.
 *
 * @sample highcharts/plotoptions/sankey-node-column/
 *         Specified node column
 *
 * @type      {number}
 * @since     6.0.5
 * @product   highcharts
 * @apioption series.sankey.nodes.column
 */
/**
 * Individual data label for each node. The options are the same as
 * the ones for [series.sankey.dataLabels](#series.sankey.dataLabels).
 *
 * @extends   plotOptions.sankey.dataLabels
 * @apioption series.sankey.nodes.dataLabels
 */
/**
 * The height of the node.
 *
 * @sample highcharts/series-sankey/height/
 *         Sankey diagram with height options
 *
 * @type      {number}
 * @since     11.3.0
 * @apioption series.sankey.nodes.height
 */
/**
 * An optional level index of where to place the node. The default behaviour is
 * to place it next to the preceding node. Alias of `nodes.column`, but in
 * inverted sankeys and org charts, the levels are laid out as rows.
 *
 * @type      {number}
 * @since     7.1.0
 * @product   highcharts
 * @apioption series.sankey.nodes.level
 */
/**
 * The name to display for the node in data labels and tooltips. Use this when
 * the name is different from the `id`. Where the id must be unique for each
 * node, this is not necessary for the name.
 *
 * @sample highcharts/css/sankey/
 *         Sankey diagram with node options
 *
 * @type      {string}
 * @product   highcharts
 * @apioption series.sankey.nodes.name
 */
/**
 * This option is deprecated, use
 * [offsetHorizontal](#series.sankey.nodes.offsetHorizontal) and
 * [offsetVertical](#series.sankey.nodes.offsetVertical) instead.
 *
 * In a horizontal layout, the vertical offset of a node in terms of weight.
 * Positive values shift the node downwards, negative shift it upwards. In a
 * vertical layout, like organization chart, the offset is horizontal.
 *
 * If a percentage string is given, the node is offset by the percentage of the
 * node size plus `nodePadding`.
 *
 * @deprecated
 * @type      {number|string}
 * @default   0
 * @since     6.0.5
 * @product   highcharts
 * @apioption series.sankey.nodes.offset
 */
/**
 * The horizontal offset of a node. Positive values shift the node right,
 * negative shift it left.
 *
 * If a percentage string is given, the node is offset by the percentage of the
 * node size.
 *
 * @sample highcharts/plotoptions/sankey-node-column/
 *         Specified node offset
 *
 * @type      {number|string}
 * @since 9.3.0
 * @product   highcharts
 * @apioption series.sankey.nodes.offsetHorizontal
 */
/**
 * The vertical offset of a node. Positive values shift the node down,
 * negative shift it up.
 *
 * If a percentage string is given, the node is offset by the percentage of the
 * node size.
 *
 * @sample highcharts/plotoptions/sankey-node-column/
 *         Specified node offset
 *
 * @type      {number|string}
 * @since 9.3.0
 * @product   highcharts
 * @apioption series.sankey.nodes.offsetVertical
 */
/**
 * An array of data points for the series. For the `sankey` series type,
 * points can be given in the following way:
 *
 * An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series' [turboThreshold](#series.area.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         from: 'Category1',
 *         to: 'Category2',
 *         weight: 2
 *     }, {
 *         from: 'Category1',
 *         to: 'Category3',
 *         weight: 5
 *     }]
 *  ```
 *
 *  When you provide the data as tuples, the keys option has to be set as well.
 *
 *  ```js
 *     keys: ['from', 'to', 'weight'],
 *     data: [
 *         ['Category1', 'Category2', 2],
 *         ['Category1', 'Category3', 5]
 *     ]
 *  ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @declare   Highcharts.SeriesSankeyPointOptionsObject
 * @type      {Array<*>|Array<Array<(string|number)>>}
 * @extends   series.line.data
 * @excluding dragDrop, drilldown, marker, x, y
 * @product   highcharts
 * @apioption series.sankey.data
 */
/**
 * The color for the individual _link_. By default, the link color is the same
 * as the node it extends from. The `series.fillOpacity` option also applies to
 * the points, so when setting a specific link color, consider setting the
 * `fillOpacity` to 1.
 *
 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
 * @product   highcharts
 * @apioption series.sankey.data.color
 */
/**
 * @type      {Highcharts.SeriesSankeyDataLabelsOptionsObject|Array<Highcharts.SeriesSankeyDataLabelsOptionsObject>}
 * @product   highcharts
 * @apioption series.sankey.data.dataLabels
 */
/**
 * The node that the link runs from.
 *
 * @type      {string}
 * @product   highcharts
 * @apioption series.sankey.data.from
 */
/**
 * The node that the link runs to.
 *
 * @type      {string}
 * @product   highcharts
 * @apioption series.sankey.data.to
 */
/**
 * Whether the link goes out of the system.
 *
 * @sample highcharts/plotoptions/sankey-outgoing
 *         Sankey chart with outgoing links
 *
 * @type      {boolean}
 * @default   false
 * @product   highcharts
 * @apioption series.sankey.data.outgoing
 */
/**
 * The weight of the link.
 *
 * @type      {number|null}
 * @product   highcharts
 * @apioption series.sankey.data.weight
 */
''; // Adds doclets above to transpiled file
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Sankey_SankeySeriesDefaults = (SankeySeriesDefaults);

;// ./code/es-modules/Series/Sankey/SankeyColumnComposition.js
/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { defined: SankeyColumnComposition_defined, getAlignFactor, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Composition
 *
 * */
var SankeyColumnComposition;
(function (SankeyColumnComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * SankeyColumn Composition
     * @private
     * @function Highcharts.SankeyColumn#compose
     *
     * @param {Array<SankeyPoint>} points
     * The array of nodes
     * @param {SankeySeries} series
     * Series connected to column
     * @return {ArrayComposition} SankeyColumnArray
     */
    function compose(points, series) {
        const sankeyColumnArray = points;
        sankeyColumnArray.sankeyColumn =
            new SankeyColumnAdditions(sankeyColumnArray, series);
        return sankeyColumnArray;
    }
    SankeyColumnComposition.compose = compose;
    /* *
     *
     *  Classes
     *
     * */
    class SankeyColumnAdditions {
        /* *
         *
         *  Constructor
         *
         * */
        constructor(points, series) {
            this.points = points;
            this.series = series;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Calculate translation factor used in column and nodes distribution
         * @private
         * @function Highcharts.SankeyColumn#getTranslationFactor
         *
         * @param {SankeySeries} series
         * The Series
         * @return {number} TranslationFactor
         * Translation Factor
         */
        getTranslationFactor(series) {
            const column = this.points, nodes = column.slice(), chart = series.chart, minLinkWidth = series.options.minLinkWidth || 0;
            let skipPoint, factor = 0, i, remainingHeight = ((chart.plotSizeY || 0) -
                (series.options.borderWidth || 0) -
                (column.length - 1) * series.nodePadding);
            // Because the minLinkWidth option doesn't obey the direct
            // translation, we need to run translation iteratively, check
            // node heights, remove those nodes affected by minLinkWidth,
            // check again, etc.
            while (column.length) {
                factor = remainingHeight / column.sankeyColumn.sum();
                skipPoint = false;
                i = column.length;
                while (i--) {
                    if (column[i].getSum() * factor < minLinkWidth) {
                        column.splice(i, 1);
                        remainingHeight =
                            Math.max(0, remainingHeight - minLinkWidth);
                        skipPoint = true;
                    }
                }
                if (!skipPoint) {
                    break;
                }
            }
            // Re-insert original nodes
            column.length = 0;
            for (const node of nodes) {
                column.push(node);
            }
            return factor;
        }
        /**
         * Get the top position of the column in pixels
         * @private
         * @function Highcharts.SankeyColumn#top
         *
         * @param {number} factor
         * The Translation Factor
         * @return {number} top
         * The top position of the column
         */
        top(factor) {
            const series = this.series, nodePadding = series.nodePadding, height = this.points.reduce((height, node) => {
                if (height > 0) {
                    height += nodePadding;
                }
                const nodeHeight = Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                height += nodeHeight;
                return height;
            }, 0);
            // Node alignment option handling #19096
            return getAlignFactor(series.options.nodeAlignment || 'center') * ((series.chart.plotSizeY || 0) - height);
        }
        /**
         * Get the left position of the column in pixels
         * @private
         * @function Highcharts.SankeyColumn#top
         *
         * @param {number} factor
         * The Translation Factor
         * @return {number} left
         * The left position of the column
         */
        left(factor) {
            const series = this.series, chart = series.chart, equalNodes = series.options.equalNodes, maxNodesLength = (chart.inverted ? chart.plotHeight : chart.plotWidth), nodePadding = series.nodePadding, width = this.points.reduce((width, node) => {
                if (width > 0) {
                    width += nodePadding;
                }
                const nodeWidth = equalNodes ?
                    maxNodesLength / node.series.nodes.length -
                        nodePadding :
                    Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                width += nodeWidth;
                return width;
            }, 0);
            return ((chart.plotSizeX || 0) - Math.round(width)) / 2;
        }
        /**
         * Calculate sum of all nodes inside specific column
         * @private
         * @function Highcharts.SankeyColumn#sum
         *
         * @param {ArrayComposition} this
         * Sankey Column Array
         *
         * @return {number} sum
         * Sum of all nodes inside column
         */
        sum() {
            return this.points.reduce((sum, node) => (sum + node.getSum()), 0);
        }
        /**
         * Get the offset in pixels of a node inside the column
         * @private
         * @function Highcharts.SankeyColumn#offset
         *
         * @param {SankeyPoint} node
         * Sankey node
         * @param {number} factor
         * Translation Factor
         * @return {number} offset
         * Offset of a node inside column
         */
        offset(node, factor) {
            const column = this.points, series = this.series, nodePadding = series.nodePadding;
            let offset = 0, totalNodeOffset;
            if (series.is('organization') && node.hangsFrom) {
                return {
                    absoluteTop: node.hangsFrom.nodeY
                };
            }
            for (let i = 0; i < column.length; i++) {
                const sum = column[i].getSum();
                const height = Math.max(sum * factor, series.options.minLinkWidth || 0);
                const directionOffset = node.options[series.chart.inverted ?
                    'offsetHorizontal' :
                    'offsetVertical'], optionOffset = node.options.offset || 0;
                if (sum) {
                    totalNodeOffset = height + nodePadding;
                }
                else {
                    // If node sum equals 0 nodePadding is missed #12453
                    totalNodeOffset = 0;
                }
                if (column[i] === node) {
                    return {
                        relativeTop: offset + (SankeyColumnComposition_defined(directionOffset) ?
                            // `directionOffset` is a percent of the node
                            // height
                            relativeLength(directionOffset, height) :
                            relativeLength(optionOffset, totalNodeOffset))
                    };
                }
                offset += totalNodeOffset;
            }
        }
    }
    SankeyColumnComposition.SankeyColumnAdditions = SankeyColumnAdditions;
})(SankeyColumnComposition || (SankeyColumnComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Sankey_SankeyColumnComposition = (SankeyColumnComposition);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Color"],"commonjs":["highcharts","Color"],"commonjs2":["highcharts","Color"],"root":["Highcharts","Color"]}
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_ = __webpack_require__(620);
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default = /*#__PURE__*/__webpack_require__.n(highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_);
;// ./code/es-modules/Series/TreeUtilities.js
/* *
 *
 *  (c) 2014-2024 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { extend: TreeUtilities_extend, isArray, isNumber, isObject, merge: TreeUtilities_merge, pick: TreeUtilities_pick, relativeLength: TreeUtilities_relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable valid-jsdoc */
/**
 * @private
 */
function getColor(node, options) {
    const index = options.index, mapOptionsToLevel = options.mapOptionsToLevel, parentColor = options.parentColor, parentColorIndex = options.parentColorIndex, series = options.series, colors = options.colors, siblings = options.siblings, points = series.points, chartOptionsChart = series.chart.options.chart;
    let getColorByPoint, point, level, colorByPoint, colorIndexByPoint, color, colorIndex;
    /**
     * @private
     */
    const variateColor = (color) => {
        const colorVariation = level && level.colorVariation;
        if (colorVariation &&
            colorVariation.key === 'brightness' &&
            index &&
            siblings) {
            return highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default().parse(color).brighten(colorVariation.to * (index / siblings)).get();
        }
        return color;
    };
    if (node) {
        point = points[node.i];
        level = mapOptionsToLevel[node.level] || {};
        getColorByPoint = point && level.colorByPoint;
        if (getColorByPoint) {
            colorIndexByPoint = point.index % (colors ?
                colors.length :
                chartOptionsChart.colorCount);
            colorByPoint = colors && colors[colorIndexByPoint];
        }
        // Select either point color, level color or inherited color.
        if (!series.chart.styledMode) {
            color = TreeUtilities_pick(point && point.options.color, level && level.color, colorByPoint, parentColor && variateColor(parentColor), series.color);
        }
        colorIndex = TreeUtilities_pick(point && point.options.colorIndex, level && level.colorIndex, colorIndexByPoint, parentColorIndex, options.colorIndex);
    }
    return {
        color: color,
        colorIndex: colorIndex
    };
}
/**
 * Creates a map from level number to its given options.
 *
 * @private
 *
 * @param {Object} params
 * Object containing parameters.
 * - `defaults` Object containing default options. The default options are
 *   merged with the userOptions to get the final options for a specific
 *   level.
 * - `from` The lowest level number.
 * - `levels` User options from series.levels.
 * - `to` The highest level number.
 *
 * @return {Highcharts.Dictionary<object>|null}
 * Returns a map from level number to its given options.
 */
function getLevelOptions(params) {
    const result = {};
    let defaults, converted, i, from, to, levels;
    if (isObject(params)) {
        from = isNumber(params.from) ? params.from : 1;
        levels = params.levels;
        converted = {};
        defaults = isObject(params.defaults) ? params.defaults : {};
        if (isArray(levels)) {
            converted = levels.reduce((obj, item) => {
                let level, levelIsConstant, options;
                if (isObject(item) && isNumber(item.level)) {
                    options = TreeUtilities_merge({}, item);
                    levelIsConstant = TreeUtilities_pick(options.levelIsConstant, defaults.levelIsConstant);
                    // Delete redundant properties.
                    delete options.levelIsConstant;
                    delete options.level;
                    // Calculate which level these options apply to.
                    level = item.level + (levelIsConstant ? 0 : from - 1);
                    if (isObject(obj[level])) {
                        TreeUtilities_merge(true, obj[level], options); // #16329
                    }
                    else {
                        obj[level] = options;
                    }
                }
                return obj;
            }, {});
        }
        to = isNumber(params.to) ? params.to : 1;
        for (i = 0; i <= to; i++) {
            result[i] = TreeUtilities_merge({}, defaults, isObject(converted[i]) ? converted[i] : {});
        }
    }
    return result;
}
/**
 * @private
 * @todo Combine buildTree and buildNode with setTreeValues
 * @todo Remove logic from Treemap and make it utilize this mixin.
 */
function setTreeValues(tree, options) {
    const before = options.before, idRoot = options.idRoot, mapIdToNode = options.mapIdToNode, nodeRoot = mapIdToNode[idRoot], levelIsConstant = (options.levelIsConstant !== false), points = options.points, point = points[tree.i], optionsPoint = point && point.options || {}, children = [];
    let childrenTotal = 0;
    tree.levelDynamic = tree.level - (levelIsConstant ? 0 : nodeRoot.level);
    tree.name = TreeUtilities_pick(point && point.name, '');
    tree.visible = (idRoot === tree.id ||
        options.visible === true);
    if (typeof before === 'function') {
        tree = before(tree, options);
    }
    // First give the children some values
    tree.children.forEach((child, i) => {
        const newOptions = TreeUtilities_extend({}, options);
        TreeUtilities_extend(newOptions, {
            index: i,
            siblings: tree.children.length,
            visible: tree.visible
        });
        child = setTreeValues(child, newOptions);
        children.push(child);
        if (child.visible) {
            childrenTotal += child.val;
        }
    });
    // Set the values
    const value = TreeUtilities_pick(optionsPoint.value, childrenTotal);
    tree.visible = value >= 0 && (childrenTotal > 0 || tree.visible);
    tree.children = children;
    tree.childrenTotal = childrenTotal;
    tree.isLeaf = tree.visible && !childrenTotal;
    tree.val = value;
    return tree;
}
/**
 * Update the rootId property on the series. Also makes sure that it is
 * accessible to exporting.
 *
 * @private
 *
 * @param {Object} series
 * The series to operate on.
 *
 * @return {string}
 * Returns the resulting rootId after update.
 */
function updateRootId(series) {
    let rootId, options;
    if (isObject(series)) {
        // Get the series options.
        options = isObject(series.options) ? series.options : {};
        // Calculate the rootId.
        rootId = TreeUtilities_pick(series.rootNode, options.rootId, '');
        // Set rootId on series.userOptions to pick it up in exporting.
        if (isObject(series.userOptions)) {
            series.userOptions.rootId = rootId;
        }
        // Set rootId on series to pick it up on next update.
        series.rootNode = rootId;
    }
    return rootId;
}
/**
 * Get the node width, which relies on the plot width and the nodeDistance
 * option.
 *
 * @private
 */
function getNodeWidth(series, columnCount) {
    const { chart, options } = series, { nodeDistance = 0, nodeWidth = 0 } = options, { plotSizeX = 1 } = chart;
    // Node width auto means they are evenly distributed along the width of
    // the plot area
    if (nodeWidth === 'auto') {
        if (typeof nodeDistance === 'string' && /%$/.test(nodeDistance)) {
            const fraction = parseFloat(nodeDistance) / 100, total = columnCount + fraction * (columnCount - 1);
            return plotSizeX / total;
        }
        const nDistance = Number(nodeDistance);
        return ((plotSizeX + nDistance) /
            (columnCount || 1)) - nDistance;
    }
    return TreeUtilities_relativeLength(nodeWidth, plotSizeX);
}
/* *
 *
 *  Default Export
 *
 * */
const TreeUtilities = {
    getColor,
    getLevelOptions,
    getNodeWidth,
    setTreeValues,
    updateRootId
};
/* harmony default export */ const Series_TreeUtilities = (TreeUtilities);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SVGElement"],"commonjs":["highcharts","SVGElement"],"commonjs2":["highcharts","SVGElement"],"root":["Highcharts","SVGElement"]}
var highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_ = __webpack_require__(28);
var highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_default = /*#__PURE__*/__webpack_require__.n(highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_);
;// ./code/es-modules/Extensions/TextPath.js
/* *
 *
 *  Highcharts module with textPath functionality.
 *
 *  (c) 2009-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { deg2rad } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
const { addEvent, merge: TextPath_merge, uniqueKey, defined: TextPath_defined, extend: TextPath_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/**
 * Set a text path for a `text` or `label` element, allowing the text to
 * flow along a path.
 *
 * In order to unset the path for an existing element, call `setTextPath`
 * with `{ enabled: false }` as the second argument.
 *
 * Text path support is not bundled into `highcharts.js`, and requires the
 * `modules/textpath.js` file. However, it is included in the script files of
 * those series types that use it by default
 *
 * @sample highcharts/members/renderer-textpath/ Text path demonstrated
 *
 * @function Highcharts.SVGElement#setTextPath
 *
 * @param {Highcharts.SVGElement|undefined} path
 *        Path to follow. If undefined, it allows changing options for the
 *        existing path.
 *
 * @param {Highcharts.DataLabelsTextPathOptionsObject} textPathOptions
 *        Options.
 *
 * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
 */
function setTextPath(path, textPathOptions) {
    // Defaults
    textPathOptions = TextPath_merge(true, {
        enabled: true,
        attributes: {
            dy: -5,
            startOffset: '50%',
            textAnchor: 'middle'
        }
    }, textPathOptions);
    const url = this.renderer.url, textWrapper = this.text || this, textPath = textWrapper.textPath, { attributes, enabled } = textPathOptions;
    path = path || (textPath && textPath.path);
    // Remove previously added event
    if (textPath) {
        textPath.undo();
    }
    if (path && enabled) {
        const undo = addEvent(textWrapper, 'afterModifyTree', (e) => {
            if (path && enabled) {
                // Set ID for the path
                let textPathId = path.attr('id');
                if (!textPathId) {
                    path.attr('id', textPathId = uniqueKey());
                }
                // Set attributes for the <text>
                const textAttribs = {
                    // `dx`/`dy` options must by set on <text> (parent), the
                    // rest should be set on <textPath>
                    x: 0,
                    y: 0
                };
                if (TextPath_defined(attributes.dx)) {
                    textAttribs.dx = attributes.dx;
                    delete attributes.dx;
                }
                if (TextPath_defined(attributes.dy)) {
                    textAttribs.dy = attributes.dy;
                    delete attributes.dy;
                }
                textWrapper.attr(textAttribs);
                // Handle label properties
                this.attr({ transform: '' });
                if (this.box) {
                    this.box = this.box.destroy();
                }
                // Wrap the nodes in a textPath
                const children = e.nodes.slice(0);
                e.nodes.length = 0;
                e.nodes[0] = {
                    tagName: 'textPath',
                    attributes: TextPath_extend(attributes, {
                        'text-anchor': attributes.textAnchor,
                        href: `${url}#${textPathId}`
                    }),
                    children
                };
            }
        });
        // Set the reference
        textWrapper.textPath = { path, undo };
    }
    else {
        textWrapper.attr({ dx: 0, dy: 0 });
        delete textWrapper.textPath;
    }
    if (this.added) {
        // Rebuild text after added
        textWrapper.textCache = '';
        this.renderer.buildText(textWrapper);
    }
    return this;
}
/**
 * Attach a polygon to a bounding box if the element contains a textPath.
 *
 * @function Highcharts.SVGElement#setPolygon
 *
 * @param {any} event
 *        An event containing a bounding box object
 *
 * @return {Highcharts.BBoxObject} Returns the bounding box object.
 */
function setPolygon(event) {
    const bBox = event.bBox, tp = this.element?.querySelector('textPath');
    if (tp) {
        const polygon = [], { b, h } = this.renderer.fontMetrics(this.element), descender = h - b, lineCleanerRegex = new RegExp('(<tspan>|' +
            '<tspan(?!\\sclass="highcharts-br")[^>]*>|' +
            '<\\/tspan>)', 'g'), lines = tp
            .innerHTML
            .replace(lineCleanerRegex, '')
            .split(/<tspan class="highcharts-br"[^>]*>/), numOfLines = lines.length;
        // Calculate top and bottom coordinates for
        // either the start or the end of a single
        // character, and append it to the polygon.
        const appendTopAndBottom = (charIndex, positionOfChar) => {
            const { x, y } = positionOfChar, rotation = (tp.getRotationOfChar(charIndex) - 90) * deg2rad, cosRot = Math.cos(rotation), sinRot = Math.sin(rotation);
            return [
                [
                    x - descender * cosRot,
                    y - descender * sinRot
                ],
                [
                    x + b * cosRot,
                    y + b * sinRot
                ]
            ];
        };
        for (let i = 0, lineIndex = 0; lineIndex < numOfLines; lineIndex++) {
            const line = lines[lineIndex], lineLen = line.length;
            for (let lineCharIndex = 0; lineCharIndex < lineLen; lineCharIndex += 5) {
                try {
                    const srcCharIndex = (i +
                        lineCharIndex +
                        lineIndex), [lower, upper] = appendTopAndBottom(srcCharIndex, tp.getStartPositionOfChar(srcCharIndex));
                    if (lineCharIndex === 0) {
                        polygon.push(upper);
                        polygon.push(lower);
                    }
                    else {
                        if (lineIndex === 0) {
                            polygon.unshift(upper);
                        }
                        if (lineIndex === numOfLines - 1) {
                            polygon.push(lower);
                        }
                    }
                }
                catch (e) {
                    // Safari fails on getStartPositionOfChar even if the
                    // character is within the `textContent.length`
                    break;
                }
            }
            i += lineLen - 1;
            try {
                const srcCharIndex = i + lineIndex, charPos = tp.getEndPositionOfChar(srcCharIndex), [lower, upper] = appendTopAndBottom(srcCharIndex, charPos);
                polygon.unshift(upper);
                polygon.unshift(lower);
            }
            catch (e) {
                // Safari fails on getStartPositionOfChar even if the character
                // is within the `textContent.length`
                break;
            }
        }
        // Close it
        if (polygon.length) {
            polygon.push(polygon[0].slice());
        }
        bBox.polygon = polygon;
    }
    return bBox;
}
/**
 * Draw text along a textPath for a dataLabel.
 *
 * @function Highcharts.SVGElement#setTextPath
 *
 * @param {any} event
 *        An event containing label options
 *
 * @return {void}
 */
function drawTextPath(event) {
    const labelOptions = event.labelOptions, point = event.point, textPathOptions = (labelOptions[point.formatPrefix + 'TextPath'] ||
        labelOptions.textPath);
    if (textPathOptions && !labelOptions.useHTML) {
        this.setTextPath(point.getDataLabelPath?.(this) || point.graphic, textPathOptions);
        if (point.dataLabelPath &&
            !textPathOptions.enabled) {
            // Clean the DOM
            point.dataLabelPath = (point.dataLabelPath.destroy());
        }
    }
}
function compose(SVGElementClass) {
    addEvent(SVGElementClass, 'afterGetBBox', setPolygon);
    addEvent(SVGElementClass, 'beforeAddingDataLabel', drawTextPath);
    const svgElementProto = SVGElementClass.prototype;
    if (!svgElementProto.setTextPath) {
        svgElementProto.setTextPath = setTextPath;
    }
}
const TextPath = {
    compose
};
/* harmony default export */ const Extensions_TextPath = (TextPath);

;// ./code/es-modules/Series/Sankey/SankeySeries.js
/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */







const { column: SankeySeries_ColumnSeries, line: LineSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { parse: color } = (highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default());

const { getLevelOptions: SankeySeries_getLevelOptions, getNodeWidth: SankeySeries_getNodeWidth } = Series_TreeUtilities;

const { clamp, crisp, extend: SankeySeries_extend, isObject: SankeySeries_isObject, merge: SankeySeries_merge, pick: SankeySeries_pick, relativeLength: SankeySeries_relativeLength, stableSort } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


Extensions_TextPath.compose((highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_default()));
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.sankey
 *
 * @augments Highcharts.Series
 */
class SankeySeries extends SankeySeries_ColumnSeries {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static getDLOptions(params) {
        const optionsPoint = (SankeySeries_isObject(params.optionsPoint) ?
            params.optionsPoint.dataLabels :
            {}), optionsLevel = (SankeySeries_isObject(params.level) ?
            params.level.dataLabels :
            {}), options = SankeySeries_merge({
            style: {}
        }, optionsLevel, optionsPoint);
        return options;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create node columns by analyzing the nodes and the relations between
     * incoming and outgoing links.
     * @private
     */
    createNodeColumns() {
        const columns = [];
        for (const node of this.nodes) {
            node.setNodeColumn();
            if (!columns[node.column]) {
                columns[node.column] =
                    Sankey_SankeyColumnComposition.compose([], this);
            }
            columns[node.column].push(node);
        }
        // Fill in empty columns (#8865)
        for (let i = 0; i < columns.length; i++) {
            if (typeof columns[i] === 'undefined') {
                columns[i] =
                    Sankey_SankeyColumnComposition.compose([], this);
            }
        }
        return columns;
    }
    /**
     * Order the nodes, starting with the root node(s). (#9818)
     * @private
     */
    order(node, level) {
        const series = this;
        // Prevents circular recursion:
        if (typeof node.level === 'undefined') {
            node.level = level;
            for (const link of node.linksFrom) {
                if (link.toNode) {
                    series.order(link.toNode, level + 1);
                }
            }
        }
    }
    /**
     * Extend generatePoints by adding the nodes, which are Point objects
     * but pushed to the this.nodes array.
     * @private
     */
    generatePoints() {
        Series_NodesComposition.generatePoints.apply(this, arguments);
        if (this.orderNodes) {
            for (const node of this.nodes) {
                // Identify the root node(s)
                if (node.linksTo.length === 0) {
                    // Start by the root node(s) and recursively set the level
                    // on all following nodes.
                    this.order(node, 0);
                }
            }
            stableSort(this.nodes, (a, b) => (a.level - b.level));
        }
    }
    /**
     * Overridable function to get node padding, overridden in dependency
     * wheel series type.
     * @private
     */
    getNodePadding() {
        let nodePadding = this.options.nodePadding || 0;
        // If the number of columns is so great that they will overflow with
        // the given nodePadding, we sacrifice the padding in order to
        // render all nodes within the plot area (#11917).
        if (this.nodeColumns) {
            const maxLength = this.nodeColumns.reduce((acc, col) => Math.max(acc, col.length), 0);
            if (maxLength * nodePadding > this.chart.plotSizeY) {
                nodePadding = this.chart.plotSizeY / maxLength;
            }
        }
        return nodePadding;
    }
    /**
     * Define hasData function for non-cartesian series.
     * @private
     * @return {boolean}
     *         Returns true if the series has points at all.
     */
    hasData() {
        return !!this.dataTable.rowCount;
    }
    /**
     * Return the presentational attributes.
     * @private
     */
    pointAttribs(point, state) {
        if (!point) {
            return {};
        }
        const series = this, level = point.isNode ? point.level : point.fromNode.level, levelOptions = series.mapOptionsToLevel[level || 0] || {}, options = point.options, stateOptions = (levelOptions.states && levelOptions.states[state || '']) || {}, values = [
            'colorByPoint',
            'borderColor',
            'borderWidth',
            'linkOpacity',
            'opacity'
        ].reduce((obj, key) => {
            obj[key] = SankeySeries_pick(stateOptions[key], options[key], levelOptions[key], series.options[key]);
            return obj;
        }, {}), color = SankeySeries_pick(stateOptions.color, options.color, values.colorByPoint ? point.color : levelOptions.color);
        // Node attributes
        if (point.isNode) {
            return {
                fill: color,
                stroke: values.borderColor,
                'stroke-width': values.borderWidth,
                opacity: values.opacity
            };
        }
        // Link attributes
        return {
            fill: highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default().parse(color).setOpacity(values.linkOpacity).get()
        };
    }
    drawTracker() {
        SankeySeries_ColumnSeries.prototype.drawTracker.call(this, this.points);
        SankeySeries_ColumnSeries.prototype.drawTracker.call(this, this.nodes);
    }
    drawPoints() {
        SankeySeries_ColumnSeries.prototype.drawPoints.call(this, this.points);
        SankeySeries_ColumnSeries.prototype.drawPoints.call(this, this.nodes);
    }
    drawDataLabels() {
        SankeySeries_ColumnSeries.prototype.drawDataLabels.call(this, this.points);
        SankeySeries_ColumnSeries.prototype.drawDataLabels.call(this, this.nodes);
    }
    /**
     * Run pre-translation by generating the nodeColumns.
     * @private
     */
    translate() {
        this.generatePoints();
        this.nodeColumns = this.createNodeColumns();
        const series = this, chart = this.chart, options = this.options, nodeColumns = this.nodeColumns, columnCount = nodeColumns.length;
        this.nodeWidth = SankeySeries_getNodeWidth(this, columnCount);
        this.nodePadding = this.getNodePadding();
        // Find out how much space is needed. Base it on the translation
        // factor of the most spacious column.
        this.translationFactor = nodeColumns.reduce((translationFactor, column) => Math.min(translationFactor, column.sankeyColumn.getTranslationFactor(series)), Infinity);
        this.colDistance =
            (chart.plotSizeX - this.nodeWidth -
                options.borderWidth) / Math.max(1, nodeColumns.length - 1);
        // Calculate level options used in sankey and organization
        series.mapOptionsToLevel = SankeySeries_getLevelOptions({
            // NOTE: if support for allowTraversingTree is added, then from
            // should be the level of the root node.
            from: 1,
            levels: options.levels,
            to: nodeColumns.length - 1, // Height of the tree
            defaults: {
                borderColor: options.borderColor,
                borderRadius: options.borderRadius, // Organization series
                borderWidth: options.borderWidth,
                color: series.color,
                colorByPoint: options.colorByPoint,
                // NOTE: if support for allowTraversingTree is added, then
                // levelIsConstant should be optional.
                levelIsConstant: true,
                linkColor: options.linkColor, // Organization series
                linkLineWidth: options.linkLineWidth, // Organization series
                linkOpacity: options.linkOpacity,
                states: options.states
            }
        });
        // First translate all nodes so we can use them when drawing links
        for (const column of nodeColumns) {
            for (const node of column) {
                series.translateNode(node, column);
            }
        }
        // Then translate links
        for (const node of this.nodes) {
            // Translate the links from this node
            for (const linkPoint of node.linksFrom) {
                // If weight is 0 - don't render the link path #12453,
                // render null points (for organization chart)
                if ((linkPoint.weight || linkPoint.isNull) && linkPoint.to) {
                    series.translateLink(linkPoint);
                    linkPoint.allowShadow = false;
                }
            }
        }
    }
    /**
     * Run translation operations for one link.
     * @private
     */
    translateLink(point) {
        const getY = (node, fromOrTo) => {
            const linkTop = (node.offset(point, fromOrTo) *
                translationFactor);
            const y = Math.min(node.nodeY + linkTop, 
            // Prevent links from spilling below the node (#12014)
            node.nodeY + (node.shapeArgs && node.shapeArgs.height || 0) - linkHeight);
            return y;
        };
        const fromNode = point.fromNode, toNode = point.toNode, chart = this.chart, { inverted } = chart, translationFactor = this.translationFactor, options = this.options, linkColorMode = SankeySeries_pick(point.linkColorMode, options.linkColorMode), curvy = ((chart.inverted ? -this.colDistance : this.colDistance) *
            options.curveFactor), nodeLeft = fromNode.nodeX, right = toNode.nodeX, outgoing = point.outgoing;
        let linkHeight = Math.max(point.weight * translationFactor, this.options.minLinkWidth), fromY = getY(fromNode, 'linksFrom'), toY = getY(toNode, 'linksTo'), nodeW = this.nodeWidth, straight = right > nodeLeft + nodeW;
        if (chart.inverted) {
            fromY = chart.plotSizeY - fromY;
            toY = (chart.plotSizeY || 0) - toY;
            nodeW = -nodeW;
            linkHeight = -linkHeight;
            straight = nodeLeft > right;
        }
        point.shapeType = 'path';
        point.linkBase = [
            fromY,
            fromY + linkHeight,
            toY,
            toY + linkHeight
        ];
        // Links going from left to right
        if (straight && typeof toY === 'number') {
            point.shapeArgs = {
                d: [
                    ['M', nodeLeft + nodeW, fromY],
                    [
                        'C',
                        nodeLeft + nodeW + curvy,
                        fromY,
                        right - curvy,
                        toY,
                        right,
                        toY
                    ],
                    ['L', right + (outgoing ? nodeW : 0), toY + linkHeight / 2],
                    ['L', right, toY + linkHeight],
                    [
                        'C',
                        right - curvy,
                        toY + linkHeight,
                        nodeLeft + nodeW + curvy,
                        fromY + linkHeight,
                        nodeLeft + nodeW, fromY + linkHeight
                    ],
                    ['Z']
                ]
            };
            // Experimental: Circular links pointing backwards. In
            // v6.1.0 this breaks the rendering completely, so even
            // this experimental rendering is an improvement. #8218.
            // @todo
            // - Make room for the link in the layout
            // - Automatically determine if the link should go up or
            //   down.
        }
        else if (typeof toY === 'number') {
            const bend = 20, vDist = chart.plotHeight - fromY - linkHeight, x1 = right - bend - linkHeight, x2 = right - bend, x3 = right, x4 = nodeLeft + nodeW, x5 = x4 + bend, x6 = x5 + linkHeight, fy1 = fromY, fy2 = fromY + linkHeight, fy3 = fy2 + bend, y4 = fy3 + vDist, y5 = y4 + bend, y6 = y5 + linkHeight, ty1 = toY, ty2 = ty1 + linkHeight, ty3 = ty2 + bend, cfy1 = fy2 - linkHeight * 0.7, cy2 = y5 + linkHeight * 0.7, cty1 = ty2 - linkHeight * 0.7, cx1 = x3 - linkHeight * 0.7, cx2 = x4 + linkHeight * 0.7;
            point.shapeArgs = {
                d: [
                    ['M', x4, fy1],
                    ['C', cx2, fy1, x6, cfy1, x6, fy3],
                    ['L', x6, y4],
                    ['C', x6, cy2, cx2, y6, x4, y6],
                    ['L', x3, y6],
                    ['C', cx1, y6, x1, cy2, x1, y4],
                    ['L', x1, ty3],
                    ['C', x1, cty1, cx1, ty1, x3, ty1],
                    ['L', x3, ty2],
                    ['C', x2, ty2, x2, ty2, x2, ty3],
                    ['L', x2, y4],
                    ['C', x2, y5, x2, y5, x3, y5],
                    ['L', x4, y5],
                    ['C', x5, y5, x5, y5, x5, y4],
                    ['L', x5, fy3],
                    ['C', x5, fy2, x5, fy2, x4, fy2],
                    ['Z']
                ]
            };
        }
        // Place data labels in the middle
        point.dlBox = {
            x: nodeLeft + (right - nodeLeft + nodeW) / 2,
            y: fromY + (toY - fromY) / 2,
            height: linkHeight,
            width: 0
        };
        // And set the tooltip anchor in the middle
        point.tooltipPos = chart.inverted ? [
            chart.plotSizeY - point.dlBox.y - linkHeight / 2,
            chart.plotSizeX - point.dlBox.x
        ] : [
            point.dlBox.x,
            point.dlBox.y + linkHeight / 2
        ];
        // Pass test in drawPoints. plotX/Y needs to be defined for dataLabels.
        // #15863
        point.y = point.plotY = 1;
        point.x = point.plotX = 1;
        if (!point.options.color) {
            if (linkColorMode === 'from') {
                point.color = fromNode.color;
            }
            else if (linkColorMode === 'to') {
                point.color = toNode.color;
            }
            else if (linkColorMode === 'gradient') {
                const fromColor = color(fromNode.color).get(), toColor = color(toNode.color).get();
                point.color = {
                    linearGradient: {
                        x1: 1,
                        x2: 0,
                        y1: 0,
                        y2: 0
                    },
                    stops: [
                        [0, inverted ? fromColor : toColor],
                        [1, inverted ? toColor : fromColor]
                    ]
                };
            }
        }
    }
    /**
     * Run translation operations for one node.
     * @private
     */
    translateNode(node, column) {
        const translationFactor = this.translationFactor, chart = this.chart, options = this.options, { borderRadius, borderWidth = 0 } = options, sum = node.getSum(), nodeHeight = Math.max(Math.round(sum * translationFactor), this.options.minLinkWidth), nodeWidth = Math.round(this.nodeWidth), nodeOffset = column.sankeyColumn.offset(node, translationFactor), fromNodeTop = crisp(SankeySeries_pick(nodeOffset.absoluteTop, (column.sankeyColumn.top(translationFactor) +
            nodeOffset.relativeTop)), borderWidth), left = crisp(this.colDistance * node.column +
            borderWidth / 2, borderWidth) + SankeySeries_relativeLength(node.options[chart.inverted ?
            'offsetVertical' :
            'offsetHorizontal'] || 0, nodeWidth), nodeLeft = chart.inverted ?
            chart.plotSizeX - left :
            left;
        node.sum = sum;
        // If node sum is 0, don't render the rect #12453
        if (sum) {
            // Draw the node
            node.shapeType = 'roundedRect';
            node.nodeX = nodeLeft;
            node.nodeY = fromNodeTop;
            let x = nodeLeft, y = fromNodeTop, width = node.options.width || options.width || nodeWidth, height = node.options.height || options.height || nodeHeight;
            // Border radius should not greater than half the height of the node
            // #18956
            const r = clamp(SankeySeries_relativeLength((typeof borderRadius === 'object' ?
                borderRadius.radius :
                borderRadius || 0), width), 0, nodeHeight / 2);
            if (chart.inverted) {
                x = nodeLeft - nodeWidth;
                y = chart.plotSizeY - fromNodeTop - nodeHeight;
                width = node.options.height || options.height || nodeWidth;
                height = node.options.width || options.width || nodeHeight;
            }
            // Calculate data label options for the point
            node.dlOptions = SankeySeries.getDLOptions({
                level: this.mapOptionsToLevel[node.level],
                optionsPoint: node.options
            });
            // Pass test in drawPoints
            node.plotX = 1;
            node.plotY = 1;
            // Set the anchor position for tooltips
            node.tooltipPos = chart.inverted ? [
                chart.plotSizeY - y - height / 2,
                chart.plotSizeX - x - width / 2
            ] : [
                x + width / 2,
                y + height / 2
            ];
            node.shapeArgs = {
                x,
                y,
                width,
                height,
                r,
                display: node.hasShape() ? '' : 'none'
            };
        }
        else {
            node.dlOptions = {
                enabled: false
            };
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
SankeySeries.defaultOptions = SankeySeries_merge(SankeySeries_ColumnSeries.defaultOptions, Sankey_SankeySeriesDefaults);
Series_NodesComposition.compose(Sankey_SankeyPoint, SankeySeries);
SankeySeries_extend(SankeySeries.prototype, {
    animate: LineSeries.prototype.animate,
    // Create a single node that holds information on incoming and outgoing
    // links.
    createNode: Series_NodesComposition.createNode,
    forceDL: true,
    invertible: true,
    isCartesian: false,
    orderNodes: true,
    noSharedTooltip: true,
    pointArrayMap: ['from', 'to', 'weight'],
    pointClass: Sankey_SankeyPoint,
    searchPoint: (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).noop
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('sankey', SankeySeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Sankey_SankeySeries = ((/* unused pure expression or super */ null && (SankeySeries)));
/* *
 *
 *  API Declarations
 *
 * */
/**
 * A node in a sankey diagram.
 *
 * @interface Highcharts.SankeyNodeObject
 * @extends Highcharts.Point
 * @product highcharts
 */ /**
* The color of the auto generated node.
*
* @name Highcharts.SankeyNodeObject#color
* @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
*/ /**
* The color index of the auto generated node, especially for use in styled
* mode.
*
* @name Highcharts.SankeyNodeObject#colorIndex
* @type {number}
*/ /**
* An optional column index of where to place the node. The default behaviour is
* to place it next to the preceding node.
*
* @see {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/sankey-node-column/|Highcharts-Demo:}
*      Specified node column
*
* @name Highcharts.SankeyNodeObject#column
* @type {number}
* @since 6.0.5
*/ /**
* The id of the auto-generated node, refering to the `from` or `to` setting of
* the link.
*
* @name Highcharts.SankeyNodeObject#id
* @type {string}
*/ /**
* The name to display for the node in data labels and tooltips. Use this when
* the name is different from the `id`. Where the id must be unique for each
* node, this is not necessary for the name.
*
* @see {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/css/sankey/|Highcharts-Demo:}
*         Sankey diagram with node options
*
* @name Highcharts.SankeyNodeObject#name
* @type {string}
* @product highcharts
*/ /**
* This option is deprecated, use
* {@link Highcharts.SankeyNodeObject#offsetHorizontal} and
* {@link Highcharts.SankeyNodeObject#offsetVertical} instead.
*
* The vertical offset of a node in terms of weight. Positive values shift the
* node downwards, negative shift it upwards.
*
* If a percentage string is given, the node is offset by the percentage of the
* node size plus `nodePadding`.
*
* @see {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/sankey-node-column/|Highcharts-Demo:}
*         Specified node offset
*
* @deprecated
* @name Highcharts.SankeyNodeObject#offset
* @type {number|string}
* @default 0
* @since 6.0.5
*/ /**
* The horizontal offset of a node. Positive values shift the node right,
* negative shift it left.
*
* If a percentage string is given, the node is offset by the percentage of the
* node size.
*
* @see {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/sankey-node-column/|Highcharts-Demo:}
*         Specified node offset
*
* @name Highcharts.SankeyNodeObject#offsetHorizontal
* @type {number|string}
* @since 9.3.0
*/ /**
* The vertical offset of a node. Positive values shift the node down,
* negative shift it up.
*
* If a percentage string is given, the node is offset by the percentage of the
* node size.
*
* @see {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/sankey-node-column/|Highcharts-Demo:}
*         Specified node offset
*
* @name Highcharts.SankeyNodeObject#offsetVertical
* @type {number|string}
* @since 9.3.0
*/
/**
 * Formatter callback function.
 *
 * @callback Highcharts.SeriesSankeyDataLabelsFormatterCallbackFunction
 *
 * @param {Highcharts.Point} this
 *        Data label context to format
 *
 * @return {string|undefined}
 *         Formatted data label text
 */
''; // Detach doclets above

;// ./code/es-modules/masters/modules/sankey.src.js




/* harmony default export */ const sankey_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});