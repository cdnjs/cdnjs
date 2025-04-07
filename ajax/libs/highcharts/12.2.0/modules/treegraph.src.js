/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * Treegraph chart series type
 * @module highcharts/modules/treegraph
 * @requires highcharts
 * @requires highcharts/modules/treemap
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["SVGRenderer"], root["_Highcharts"]["Point"], root["_Highcharts"]["Color"], root["_Highcharts"]["SVGElement"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/treegraph", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["SVGRenderer"],amd1["Point"],amd1["Color"],amd1["SVGElement"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/treegraph"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["SVGRenderer"], root["_Highcharts"]["Point"], root["_Highcharts"]["Color"], root["_Highcharts"]["SVGElement"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["SVGRenderer"], root["Highcharts"]["Point"], root["Highcharts"]["Color"], root["Highcharts"]["SVGElement"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__540__, __WEBPACK_EXTERNAL_MODULE__260__, __WEBPACK_EXTERNAL_MODULE__620__, __WEBPACK_EXTERNAL_MODULE__28__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 28:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),

/***/ 260:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__260__;

/***/ }),

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 540:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__540__;

/***/ }),

/***/ 620:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__620__;

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
  "default": () => (/* binding */ treegraph_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Series/PathUtilities.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

const getLinkPath = {
    'default': getDefaultPath,
    straight: getStraightPath,
    curved: getCurvedPath
};
/**
 *
 */
function getDefaultPath(pathParams) {
    const { x1, y1, x2, y2, width = 0, inverted = false, radius, parentVisible } = pathParams;
    const path = [
        ['M', x1, y1],
        ['L', x1, y1],
        ['C', x1, y1, x1, y2, x1, y2],
        ['L', x1, y2],
        ['C', x1, y1, x1, y2, x1, y2],
        ['L', x1, y2]
    ];
    return parentVisible ?
        applyRadius([
            ['M', x1, y1],
            ['L', x1 + width * (inverted ? -0.5 : 0.5), y1],
            ['L', x1 + width * (inverted ? -0.5 : 0.5), y2],
            ['L', x2, y2]
        ], radius) :
        path;
}
/**
 *
 */
function getStraightPath(pathParams) {
    const { x1, y1, x2, y2, width = 0, inverted = false, parentVisible } = pathParams;
    return parentVisible ? [
        ['M', x1, y1],
        ['L', x1 + width * (inverted ? -1 : 1), y2],
        ['L', x2, y2]
    ] : [
        ['M', x1, y1],
        ['L', x1, y2],
        ['L', x1, y2]
    ];
}
/**
 *
 */
function getCurvedPath(pathParams) {
    const { x1, y1, x2, y2, offset = 0, width = 0, inverted = false, parentVisible } = pathParams;
    return parentVisible ?
        [
            ['M', x1, y1],
            [
                'C',
                x1 + offset,
                y1,
                x1 - offset + width * (inverted ? -1 : 1),
                y2,
                x1 + width * (inverted ? -1 : 1),
                y2
            ],
            ['L', x2, y2]
        ] :
        [
            ['M', x1, y1],
            ['C', x1, y1, x1, y2, x1, y2],
            ['L', x2, y2]
        ];
}
/**
 * General function to apply corner radius to a path
 * @private
 */
function applyRadius(path, r) {
    const d = [];
    for (let i = 0; i < path.length; i++) {
        const x = path[i][1];
        const y = path[i][2];
        if (typeof x === 'number' && typeof y === 'number') {
            // MoveTo
            if (i === 0) {
                d.push(['M', x, y]);
            }
            else if (i === path.length - 1) {
                d.push(['L', x, y]);
                // CurveTo
            }
            else if (r) {
                const prevSeg = path[i - 1];
                const nextSeg = path[i + 1];
                if (prevSeg && nextSeg) {
                    const x1 = prevSeg[1], y1 = prevSeg[2], x2 = nextSeg[1], y2 = nextSeg[2];
                    // Only apply to breaks
                    if (typeof x1 === 'number' &&
                        typeof x2 === 'number' &&
                        typeof y1 === 'number' &&
                        typeof y2 === 'number' &&
                        x1 !== x2 &&
                        y1 !== y2) {
                        const directionX = x1 < x2 ? 1 : -1, directionY = y1 < y2 ? 1 : -1;
                        d.push([
                            'L',
                            x - directionX * Math.min(Math.abs(x - x1), r),
                            y - directionY * Math.min(Math.abs(y - y1), r)
                        ], [
                            'C',
                            x,
                            y,
                            x,
                            y,
                            x + directionX * Math.min(Math.abs(x - x2), r),
                            y + directionY * Math.min(Math.abs(y - y2), r)
                        ]);
                    }
                }
                // LineTo
            }
            else {
                d.push(['L', x, y]);
            }
        }
    }
    return d;
}
const PathUtilities = {
    applyRadius,
    getLinkPath
};
/* harmony default export */ const Series_PathUtilities = (PathUtilities);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SVGRenderer"],"commonjs":["highcharts","SVGRenderer"],"commonjs2":["highcharts","SVGRenderer"],"root":["Highcharts","SVGRenderer"]}
var highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_ = __webpack_require__(540);
var highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_default = /*#__PURE__*/__webpack_require__.n(highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_);
;// ./code/es-modules/Series/Treegraph/TreegraphNode.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { seriesTypes: { treemap: { prototype: { NodeClass: TreemapNode } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class TreegraphNode extends TreemapNode {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.mod = 0;
        this.shift = 0;
        this.change = 0;
        this.children = [];
        this.preX = 0;
        this.hidden = false;
        this.wasVisited = false;
        this.collapsed = false;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get the next left node which is either first child or thread.
     *
     * @return {TreegraphNode|undefined}
     *         Next left node child or thread.
     */
    nextLeft() {
        return this.getLeftMostChild() || this.thread;
    }
    /**
     * Get the next right node which is either last child or thread.
     *
     * @return {TreegraphNode|undefined}
     *         Next right node child or thread.
     */
    nextRight() {
        return this.getRightMostChild() || this.thread;
    }
    /**
     * Return the left one of the greatest uncommon ancestors of a
     * leftInternal node and it's right neighbor.
     *
     * @param {TreegraphNode} leftIntNode
     * @param {TreegraphNode} defaultAncestor
     * @return {TreegraphNode}
     *         Left one of the greatest uncommon ancestors of a leftInternal
     *         node and it's right neighbor.
     *
     */
    getAncestor(leftIntNode, defaultAncestor) {
        const leftAnc = leftIntNode.ancestor;
        if (leftAnc.children[0] === this.children[0]) {
            return leftIntNode.ancestor;
        }
        return defaultAncestor;
    }
    /**
     * Get node's first sibling, which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First sibling of the node which is not hidden or undefined, if it
     *         does not exists.
     */
    getLeftMostSibling() {
        const parent = this.getParent();
        if (parent) {
            for (const child of parent.children) {
                if (child && child.point.visible) {
                    return child;
                }
            }
        }
    }
    /**
     * Check if the node is a leaf (if it has any children).
     *
     * @return {boolean}
     *         If the node has no visible children return true.
     */
    hasChildren() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return true;
            }
        }
        return false;
    }
    /**
     * Get node's left sibling (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Left sibling of the node
     */
    getLeftSibling() {
        const parent = this.getParent();
        if (parent) {
            const children = parent.children;
            for (let i = this.relativeXPosition - 1; i >= 0; i--) {
                if (children[i] && children[i].point.visible) {
                    return children[i];
                }
            }
        }
    }
    /**
     * Get the node's first child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's first child which isn't hidden.
     */
    getLeftMostChild() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
    /**
     * Get the node's last child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's last child which isn't hidden.
     */
    getRightMostChild() {
        const children = this.children;
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
    /**
     * Get the parent of current node or return undefined for root of the
     * tree.
     *
     * @return {TreegraphNode|undefined}
     *         Node's parent or undefined for root.
     */
    getParent() {
        return this.parentNode;
    }
    /**
     * Get node's first child which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First child.
     */
    getFirstChild() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Treegraph_TreegraphNode = (TreegraphNode);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Point"],"commonjs":["highcharts","Point"],"commonjs2":["highcharts","Point"],"root":["Highcharts","Point"]}
var highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_ = __webpack_require__(260);
var highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default = /*#__PURE__*/__webpack_require__.n(highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_);
;// ./code/es-modules/Series/Treegraph/TreegraphPoint.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { seriesTypes: { treemap: { prototype: { pointClass: TreemapPoint } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { addEvent, fireEvent, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class TreegraphPoint extends TreemapPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.dataLabelOnHidden = true;
        this.isLink = false;
        this.setState = (highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default()).prototype.setState;
    }
    /* *
     *
     *  Functions
     *
     * */
    draw() {
        super.draw.apply(this, arguments);
        // Run animation of hiding/showing of the point.
        const graphic = this.graphic;
        if (graphic) {
            graphic.animate({
                visibility: this.visible ? 'inherit' : 'hidden'
            });
        }
        this.renderCollapseButton();
    }
    renderCollapseButton() {
        const point = this, series = point.series, parentGroup = point.graphic && point.graphic.parentGroup, levelOptions = series.mapOptionsToLevel[point.node.level || 0] || {}, btnOptions = merge(series.options.collapseButton, levelOptions.collapseButton, point.options.collapseButton), { width, height, shape, style } = btnOptions, padding = 2, chart = this.series.chart, calculatedOpacity = (point.visible &&
            (point.collapsed ||
                !btnOptions.onlyOnHover ||
                point.state === 'hover')) ? 1 : 0;
        if (!point.shapeArgs) {
            return;
        }
        this.collapseButtonOptions = btnOptions;
        if (!point.collapseButton) {
            if (!point.node.children.length || !btnOptions.enabled) {
                return;
            }
            const { x, y } = this.getCollapseBtnPosition(btnOptions), fill = (btnOptions.fillColor ||
                point.color ||
                "#cccccc" /* Palette.neutralColor20 */);
            point.collapseButton = chart.renderer
                .label(point.collapsed ? '+' : '-', x, y, shape)
                .attr({
                height: height - 2 * padding,
                width: width - 2 * padding,
                padding: padding,
                fill,
                rotation: chart.inverted ? 90 : 0,
                rotationOriginX: width / 2,
                rotationOriginY: height / 2,
                stroke: btnOptions.lineColor || "#ffffff" /* Palette.backgroundColor */,
                'stroke-width': btnOptions.lineWidth,
                'text-align': 'center',
                align: 'center',
                zIndex: 1,
                opacity: calculatedOpacity,
                visibility: point.visible ? 'inherit' : 'hidden'
            })
                .addClass('highcharts-tracker')
                .addClass('highcharts-collapse-button')
                .removeClass('highcharts-no-tooltip')
                .css(merge({
                color: typeof fill === 'string' ?
                    chart.renderer.getContrast(fill) :
                    "#333333" /* Palette.neutralColor80 */
            }, style))
                .add(parentGroup);
            point.collapseButton.element.point = point;
        }
        else {
            if (!point.node.children.length || !btnOptions.enabled) {
                point.collapseButton.destroy();
                delete point.collapseButton;
            }
            else {
                const { x, y } = this.getCollapseBtnPosition(btnOptions);
                point.collapseButton
                    .attr({
                    text: point.collapsed ? '+' : '-',
                    rotation: chart.inverted ? 90 : 0,
                    rotationOriginX: width / 2,
                    rotationOriginY: height / 2,
                    visibility: point.visible ? 'inherit' : 'hidden'
                })
                    .animate({
                    x,
                    y,
                    opacity: calculatedOpacity
                });
            }
        }
    }
    toggleCollapse(state) {
        const series = this.series;
        this.update({
            collapsed: state ?? !this.collapsed
        }, false, void 0, false);
        fireEvent(series, 'toggleCollapse');
        series.redraw();
    }
    destroy() {
        if (this.collapseButton) {
            this.collapseButton.destroy();
            delete this.collapseButton;
            this.collapseButton = void 0;
        }
        if (this.linkToParent) {
            this.linkToParent.destroy();
            delete this.linkToParent;
        }
        super.destroy.apply(this, arguments);
    }
    getCollapseBtnPosition(btnOptions) {
        const point = this, chart = point.series.chart, inverted = chart.inverted, btnWidth = btnOptions.width, btnHeight = btnOptions.height, { x = 0, y = 0, width = 0, height = 0 } = point.shapeArgs || {};
        return {
            x: x +
                btnOptions.x +
                (inverted ? -btnHeight * 0.3 : width + btnWidth * -0.3),
            y: y + height / 2 - btnHeight / 2 + btnOptions.y
        };
    }
}
addEvent(TreegraphPoint, 'mouseOut', function () {
    const btn = this.collapseButton, btnOptions = this.collapseButtonOptions;
    if (btn && btnOptions?.onlyOnHover && !this.collapsed) {
        btn.animate({ opacity: 0 });
    }
});
addEvent(TreegraphPoint, 'mouseOver', function () {
    if (this.collapseButton && this.visible) {
        this.collapseButton.animate({ opacity: 1 }, this.series.options.states?.hover?.animation);
    }
});
// Handle showing and hiding of the points
addEvent(TreegraphPoint, 'click', function () {
    this.toggleCollapse();
});
/* *
 *
 *  Export Default
 *
 * */
/* harmony default export */ const Treegraph_TreegraphPoint = (TreegraphPoint);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Color"],"commonjs":["highcharts","Color"],"commonjs2":["highcharts","Color"],"root":["Highcharts","Color"]}
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_ = __webpack_require__(620);
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default = /*#__PURE__*/__webpack_require__.n(highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_);
;// ./code/es-modules/Series/TreeUtilities.js
/* *
 *
 *  (c) 2014-2025 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { extend, isArray, isNumber, isObject, merge: TreeUtilities_merge, pick, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
            color = pick(point && point.options.color, level && level.color, colorByPoint, parentColor && variateColor(parentColor), series.color);
        }
        colorIndex = pick(point && point.options.colorIndex, level && level.colorIndex, colorIndexByPoint, parentColorIndex, options.colorIndex);
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
                    levelIsConstant = pick(options.levelIsConstant, defaults.levelIsConstant);
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
    tree.name = pick(point && point.name, '');
    tree.visible = (idRoot === tree.id ||
        options.visible === true);
    if (typeof before === 'function') {
        tree = before(tree, options);
    }
    // First give the children some values
    tree.children.forEach((child, i) => {
        const newOptions = extend({}, options);
        extend(newOptions, {
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
    const value = pick(optionsPoint.value, childrenTotal);
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
        rootId = pick(series.rootNode, options.rootId, '');
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
    return relativeLength(nodeWidth, plotSizeX);
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

;// ./code/es-modules/Series/Treegraph/TreegraphLink.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { pick: TreegraphLink_pick, extend: TreegraphLink_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { seriesTypes: { column: { prototype: { pointClass: ColumnPoint } } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class LinkPoint extends ColumnPoint {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(series, options, x, point) {
        super(series, options, x);
        /* *
         *
         *  Properties
         *
         * */
        this.dataLabelOnNull = true;
        this.formatPrefix = 'link';
        this.isLink = true;
        this.node = {};
        this.formatPrefix = 'link';
        this.dataLabelOnNull = true;
        if (point) {
            this.fromNode = point.node.parentNode.point;
            this.visible = point.visible;
            this.toNode = point;
            this.id = this.toNode.id + '-' + this.fromNode.id;
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    update(options, redraw, animation, runEvent) {
        const oldOptions = {
            id: this.id,
            formatPrefix: this.formatPrefix
        };
        highcharts_Point_commonjs_highcharts_Point_commonjs2_highcharts_Point_root_Highcharts_Point_default().prototype.update.call(this, options, this.isLink ? false : redraw, // Hold the redraw for nodes
        animation, runEvent);
        this.visible = this.toNode.visible;
        TreegraphLink_extend(this, oldOptions);
        if (TreegraphLink_pick(redraw, true)) {
            this.series.chart.redraw(animation);
        }
    }
}
/* *
 *
 *  Export Default
 *
 * */
/* harmony default export */ const TreegraphLink = (LinkPoint);

;// ./code/es-modules/Series/Treegraph/TreegraphLayout.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class TreegraphLayout {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create dummy node, which allows to manually set the level of the node.
     *
     * @param {TreegraphNode} parent
     *        Parent node, to which the dummyNode should be connected.
     * @param {TreegraphNode} child
     *        Child node, which should be connected to dummyNode.
     * @param {number} gapSize
     *        Remaining gap size.
     *
     * @return {TreegraphNode}
     *         DummyNode as a parent of nodes, which column changes.
     */
    static createDummyNode(parent, child, gapSize) {
        // Initialise dummy node.
        const dummyNode = new Treegraph_TreegraphNode();
        dummyNode.id = parent.id + '-' + gapSize;
        dummyNode.ancestor = parent;
        // Add connection from new node to the previous points.
        // First connection to itself.
        dummyNode.children.push(child);
        dummyNode.parent = parent.id;
        dummyNode.parentNode = parent;
        dummyNode.point = child.point;
        dummyNode.level = child.level - gapSize;
        dummyNode.relativeXPosition = child.relativeXPosition;
        dummyNode.visible = child.visible;
        // Then connection from parent to dummyNode.
        parent.children[child.relativeXPosition] = dummyNode;
        child.oldParentNode = parent;
        child.relativeXPosition = 0;
        // Then connection from child to dummyNode.
        child.parentNode = dummyNode;
        child.parent = dummyNode.id;
        return dummyNode;
    }
    /**
     * Walker algorithm of positioning the nodes in the treegraph improved by
     * Buchheim to run in the linear time. Basic algorithm consists of post
     * order traversal, which starts from going bottom up (first walk), and then
     * pre order traversal top to bottom (second walk) where adding all of the
     * modifiers is performed.
     * link to the paper: http://dirk.jivas.de/papers/buchheim02improving.pdf
     *
     * @param {TreegraphSeries} series the Treegraph series
     */
    calculatePositions(series) {
        const treeLayout = this;
        const nodes = series.nodeList;
        this.resetValues(nodes);
        const root = series.tree;
        if (root) {
            treeLayout.calculateRelativeX(root, 0);
            treeLayout.beforeLayout(nodes);
            treeLayout.firstWalk(root);
            treeLayout.secondWalk(root, -root.preX);
            treeLayout.afterLayout(nodes);
        }
    }
    /**
     * Create dummyNodes as parents for nodes, which column is changed.
     *
     * @param {Array<TreegraphNode>} nodes
     *        All of the nodes.
     */
    beforeLayout(nodes) {
        for (const node of nodes) {
            for (let child of node.children) {
                // Support for children placed in distant columns.
                if (child && child.level - node.level > 1) {
                    // For further columns treat the nodes as a
                    // single parent-child pairs till the column is achieved.
                    let gapSize = child.level - node.level - 1;
                    // Parent -> dummyNode -> child
                    while (gapSize > 0) {
                        child = TreegraphLayout.createDummyNode(node, child, gapSize);
                        gapSize--;
                    }
                }
            }
        }
    }
    /**
     * Reset the calculated values from the previous run.
     * @param {TreegraphNode[]} nodes all of the nodes.
     */
    resetValues(nodes) {
        for (const node of nodes) {
            node.mod = 0;
            node.ancestor = node;
            node.shift = 0;
            node.thread = void 0;
            node.change = 0;
            node.preX = 0;
        }
    }
    /**
     * Assigns the value to each node, which indicates, what is his sibling
     * number.
     *
     * @param {TreegraphNode} node
     *        Root node
     * @param {number} index
     *        Index to which the nodes position should be set
     */
    calculateRelativeX(node, index) {
        const treeLayout = this, children = node.children;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            treeLayout.calculateRelativeX(children[i], i);
        }
        node.relativeXPosition = index;
    }
    /**
     * Recursive post order traversal of the tree, where the initial position
     * of the nodes is calculated.
     *
     * @param {TreegraphNode} node
     *        The node for which the position should be calculated.
     */
    firstWalk(node) {
        const treeLayout = this, 
        // Arbitrary value used to position nodes in respect to each other.
        siblingDistance = 1;
        let leftSibling;
        // If the node is a leaf, set it's position based on the left siblings.
        if (!node.hasChildren()) {
            leftSibling = node.getLeftSibling();
            if (leftSibling) {
                node.preX = leftSibling.preX + siblingDistance;
                node.mod = node.preX;
            }
            else {
                node.preX = 0;
            }
        }
        else {
            // If the node has children, perform the recursive first walk for
            // its children, and then calculate its shift in the apportion
            // function (most crucial part of the algorithm).
            let defaultAncestor = node.getLeftMostChild();
            for (const child of node.children) {
                treeLayout.firstWalk(child);
                defaultAncestor = treeLayout.apportion(child, defaultAncestor);
            }
            treeLayout.executeShifts(node);
            const leftChild = node.getLeftMostChild(), rightChild = node.getRightMostChild(), 
            // Set the position of the parent as a middle point of its
            // children and move it by the value of the leftSibling (if it
            // exists).
            midPoint = (leftChild.preX + rightChild.preX) / 2;
            leftSibling = node.getLeftSibling();
            if (leftSibling) {
                node.preX = leftSibling.preX + siblingDistance;
                node.mod = node.preX - midPoint;
            }
            else {
                node.preX = midPoint;
            }
        }
    }
    /**
     * Pre order traversal of the tree, which sets the final xPosition of the
     * node as its preX value and sum of all if it's parents' modifiers.
     *
     * @param {TreegraphNode} node
     *        The node, for which the final position should be calculated.
     * @param {number} modSum
     *        The sum of modifiers of all of the parents.
     */
    secondWalk(node, modSum) {
        const treeLayout = this;
        // When the chart is not inverted we want the tree to be positioned from
        // left to right with root node close to the chart border, this is why
        // x and y positions are switched.
        node.yPosition = node.preX + modSum;
        node.xPosition = node.level;
        for (const child of node.children) {
            treeLayout.secondWalk(child, modSum + node.mod);
        }
    }
    /**
     *  Shift all children of the current node from right to left.
     *
     * @param {TreegraphNode} node
     *        The parent node.
     */
    executeShifts(node) {
        let shift = 0, change = 0;
        for (let i = node.children.length - 1; i >= 0; i--) {
            const childNode = node.children[i];
            childNode.preX += shift;
            childNode.mod += shift;
            change += childNode.change;
            shift += childNode.shift + change;
        }
    }
    /**
     * The core of the algorithm. The new subtree is combined with the previous
     * subtrees. Threads are used to traverse the inside and outside contours of
     * the left and right subtree up to the highest common level. The vertecies
     * are left(right)Int(Out)node where Int means internal and Out means
     * outernal. For summing up the modifiers along the contour we use the
     * `left(right)Int(Out)mod` variable. Whenever two nodes of the inside
     * contours are in conflict we commute the left one of the greatest uncommon
     * ancestors using the getAncestor function and we call the moveSubtree
     * method to shift the subtree and prepare the shifts of smaller subtrees.
     * Finally we add a new thread (if necessary) and we adjust ancestor of
     * right outernal node or defaultAncestor.
     *
     * @param {TreegraphNode} node
     * @param {TreegraphNode} defaultAncestor
     *        The default ancestor of the passed node.
     */
    apportion(node, defaultAncestor) {
        const treeLayout = this, leftSibling = node.getLeftSibling();
        if (leftSibling) {
            let rightIntNode = node, rightOutNode = node, leftIntNode = leftSibling, leftOutNode = rightIntNode.getLeftMostSibling(), rightIntMod = rightIntNode.mod, rightOutMod = rightOutNode.mod, leftIntMod = leftIntNode.mod, leftOutMod = leftOutNode.mod;
            while (leftIntNode &&
                leftIntNode.nextRight() &&
                rightIntNode &&
                rightIntNode.nextLeft()) {
                leftIntNode = leftIntNode.nextRight();
                leftOutNode = leftOutNode.nextLeft();
                rightIntNode = rightIntNode.nextLeft();
                rightOutNode = rightOutNode.nextRight();
                rightOutNode.ancestor = node;
                const siblingDistance = 1, shift = leftIntNode.preX +
                    leftIntMod -
                    (rightIntNode.preX + rightIntMod) +
                    siblingDistance;
                if (shift > 0) {
                    treeLayout.moveSubtree(node.getAncestor(leftIntNode, defaultAncestor), node, shift);
                    rightIntMod += shift;
                    rightOutMod += shift;
                }
                leftIntMod += leftIntNode.mod;
                rightIntMod += rightIntNode.mod;
                leftOutMod += leftOutNode.mod;
                rightOutMod += rightOutNode.mod;
            }
            if (leftIntNode &&
                leftIntNode.nextRight() &&
                !rightOutNode.nextRight()) {
                rightOutNode.thread = leftIntNode.nextRight();
                rightOutNode.mod += leftIntMod - rightOutMod;
            }
            if (rightIntNode &&
                rightIntNode.nextLeft() &&
                !leftOutNode.nextLeft()) {
                leftOutNode.thread = rightIntNode.nextLeft();
                leftOutNode.mod += rightIntMod - leftOutMod;
            }
            defaultAncestor = node;
        }
        return defaultAncestor;
    }
    /**
     * Shifts the subtree from leftNode to rightNode.
     *
     * @param {TreegraphNode} leftNode
     * @param {TreegraphNode} rightNode
     * @param {number} shift
     *        The value, by which the subtree should be moved.
     */
    moveSubtree(leftNode, rightNode, shift) {
        const subtrees = rightNode.relativeXPosition - leftNode.relativeXPosition;
        rightNode.change -= shift / subtrees;
        rightNode.shift += shift;
        rightNode.preX += shift;
        rightNode.mod += shift;
        leftNode.change += shift / subtrees;
    }
    /**
     * Clear values created in a beforeLayout.
     *
     * @param {TreegraphNode[]} nodes
     *        All of the nodes of the Treegraph Series.
     */
    afterLayout(nodes) {
        for (const node of nodes) {
            if (node.oldParentNode) {
                // Restore default connections
                node.relativeXPosition = node.parentNode.relativeXPosition;
                node.parent = node.oldParentNode.parent;
                node.parentNode = node.oldParentNode;
                // Delete dummyNode
                delete node.oldParentNode.children[node.relativeXPosition];
                node.oldParentNode.children[node.relativeXPosition] = node;
                node.oldParentNode = void 0;
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Treegraph_TreegraphLayout = (TreegraphLayout);

;// ./code/es-modules/Series/Treegraph/TreegraphSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * A treegraph series is a diagram, which shows a relation between ancestors
 * and descendants with a clear parent - child relation.
 * The best examples of the dataStructures, which best reflect this chart
 * are e.g. genealogy tree or directory structure.
 *
 * TODO change back the demo path
 * @sample highcharts/demo/treegraph-chart
 *         Treegraph Chart
 *
 * @extends      plotOptions.treemap
 * @excluding    layoutAlgorithm, dashStyle, linecap, lineWidth,
 *               negativeColor, threshold, zones, zoneAxis, colorAxis,
 *               colorKey, compare, dataGrouping, endAngle, gapSize, gapUnit,
 *               ignoreHiddenPoint, innerSize, joinBy, legendType, linecap,
 *               minSize, navigatorOptions, pointRange, allowTraversingTree,
 *               alternateStartingDirection, borderRadius, breadcrumbs,
 *               interactByLeaf, layoutStartingDirection, levelIsConstant,
 *               lineWidth, negativeColor, nodes, sortIndex, zoneAxis,
 *               zones, cluster
 *
 * @product      highcharts
 * @since 10.3.0
 * @requires     modules/treemap
 * @requires     modules/treegraph
 * @optionparent plotOptions.treegraph
 */
const TreegraphSeriesDefaults = {
    /**
     * Flips the positions of the nodes of a treegraph along the
     * horizontal axis (vertical if chart is inverted).
     *
     * @sample highcharts/series-treegraph/reversed-nodes
     *         Treegraph series with reversed nodes.
     *
     * @type    {boolean}
     * @default false
     * @product highcharts
     * @since 10.3.0
     */
    reversed: false,
    /**
     * @extends   plotOptions.series.marker
     * @excluding enabled, enabledThreshold
     */
    marker: {
        radius: 10,
        lineWidth: 0,
        symbol: 'circle',
        fillOpacity: 1,
        states: {}
    },
    link: {
        /**
         * Modifier of the shape of the curved link. Works best for
         * values between 0 and 1, where 0 is a straight line, and 1 is
         * a shape close to the default one.
         *
         * @type      {number}
         * @default   0.5
         * @product   highcharts
         * @since 10.3.0
         * @apioption series.treegraph.link.curveFactor
         */
        /**
         * The color of the links between nodes.
         *
         * @type {Highcharts.ColorString}
         * @private
         */
        color: "#666666" /* Palette.neutralColor60 */,
        /**
         * The line width of the links connecting nodes, in pixels.
         * @type {number}
         *
         * @private
         */
        lineWidth: 1,
        /**
         * Radius for the rounded corners of the links between nodes.
         * Works for `default` link type.
         *
         * @private
         */
        radius: 10,
        cursor: 'default',
        /**
         * Type of the link shape.
         *
         * @sample   highcharts/series-treegraph/link-types
         *           Different link types
         *
         * @type {'default' | 'curved' | 'straight'}
         * @product highcharts
         *
         */
        type: 'curved'
    },
    /**
     * Options applied to collapse Button. The collape button is the
     * small button which indicates, that the node is collapsable.
     */
    collapseButton: {
        /**
         * Whether the button should be visible only when the node is
         * hovered. When set to true, the button is hidden for nodes,
         * which are not collapsed, and shown for the collapsed ones.
         */
        onlyOnHover: true,
        /**
         * Whether the button should be visible.
         */
        enabled: true,
        /**
         * The line width of the button in pixels
         */
        lineWidth: 1,
        /**
         * Offset of the button in the x direction.
         */
        x: 0,
        /**
         * Offset of the button in the y direction.
         */
        y: 0,
        /**
         * Height of the button.
         */
        height: 18,
        /**
         * Width of the button.
         */
        width: 18,
        /**
         * The symbol of the collapse button.
         */
        shape: 'circle',
        /**
         * CSS styles for the collapse button.
         *
         * In styled mode, the collapse button style is given in the
         * `.highcharts-collapse-button` class.
         */
        style: {
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1em'
        }
    },
    /**
     * Whether the treegraph series should fill the entire plot area in the X
     * axis direction, even when there are collapsed points.
     *
     * @sample  highcharts/series-treegraph/fillspace
     *          Fill space demonstrated
     *
     * @product highcharts
     */
    fillSpace: false,
    /**
     * @extends plotOptions.series.tooltip
     * @excluding clusterFormat
     */
    tooltip: {
        /**
         * The HTML of the point's line in the tooltip. Variables are
         * enclosed by curly brackets. Available variables are
         * `point.id`,  `point.fromNode.id`, `point.toNode.id`,
         * `series.name`, `series.color` and other properties on the
         * same form. Furthermore, This can also be overridden for each
         * series, which makes it a good hook for displaying units. In
         * styled mode, the dot is colored by a class name rather than
         * the point color.
         *
         * @type {string}
         * @since 10.3.0
         * @product highcharts
         */
        linkFormat: '{point.fromNode.id} \u2192 {point.toNode.id}',
        pointFormat: '{point.id}'
        /**
         * A callback function for formatting the HTML output for a
         * single link in the tooltip. Like the `linkFormat` string,
         * but with more flexibility.
         *
         * @type {Highcharts.FormatterCallbackFunction.<Highcharts.Point>}
         * @apioption series.treegraph.tooltip.linkFormatter
         *
         */
    },
    /**
     * Options for the data labels appearing on top of the nodes and
     * links. For treegraph charts, data labels are visible for the
     * nodes by default, but hidden for links. This is controlled by
     * modifying the `nodeFormat`, and the `format` that applies to
     * links and is an empty string by default.
     *
     * @declare Highcharts.SeriesTreegraphDataLabelsOptionsObject
     */
    dataLabels: {
        defer: true,
        /**
         * Options for a _link_ label text which should follow link
         * connection. Border and background are disabled for a label
         * that follows a path.
         *
         * **Note:** Only SVG-based renderer supports this option.
         * Setting `useHTML` to true will disable this option.
         *
         * @sample highcharts/series-treegraph/link-text-path
         *         Treegraph series with link text path dataLabels.
         *
         * @extends plotOptions.treegraph.dataLabels.textPath
         * @since 10.3.0
         */
        linkTextPath: {
            attributes: {
                startOffset: '50%'
            }
        },
        enabled: true,
        linkFormatter: () => '',
        padding: 5,
        style: {
            textOverflow: 'none'
        }
    },
    /**
     * The distance between nodes in a tree graph in the longitudinal direction.
     * The longitudinal direction means the direction that the chart flows - in
     * a horizontal chart the distance is horizontal, in an inverted chart
     * (vertical), the distance is vertical.
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
     * @sample highcharts/series-treegraph/node-distance
     *         Node distance of 100% means equal to node width
     * @type   {number|string}
     */
    nodeDistance: 30,
    /**
     * The pixel width of each node in a, or the height in case the chart is
     * inverted. For tree graphs, the node width is only applied if the marker
     * symbol is `rect`, otherwise the `marker` sizing options apply.
     *
     * Can be a number or a percentage string, or `auto`. If `auto`, the nodes
     * are sized to fill up the plot area in the longitudinal direction,
     * regardless of the number of levels.
     *
     * @since 11.4.0
     * @see    [treegraph.nodeDistance](#nodeDistance)
     * @sample highcharts/series-treegraph/node-distance
     *         Node width is auto and combined with node distance
     *
     * @type {number|string}
     */
    nodeWidth: void 0
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Treegraph_TreegraphSeriesDefaults = (TreegraphSeriesDefaults);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SVGElement"],"commonjs":["highcharts","SVGElement"],"commonjs2":["highcharts","SVGElement"],"root":["Highcharts","SVGElement"]}
var highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_ = __webpack_require__(28);
var highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_default = /*#__PURE__*/__webpack_require__.n(highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_);
;// ./code/es-modules/Extensions/TextPath.js
/* *
 *
 *  Highcharts module with textPath functionality.
 *
 *  (c) 2009-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { deg2rad } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
const { addEvent: TextPath_addEvent, merge: TextPath_merge, uniqueKey, defined, extend: TextPath_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
        const undo = TextPath_addEvent(textWrapper, 'afterModifyTree', (e) => {
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
                if (defined(attributes.dx)) {
                    textAttribs.dx = attributes.dx;
                    delete attributes.dx;
                }
                if (defined(attributes.dy)) {
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
    TextPath_addEvent(SVGElementClass, 'afterGetBBox', setPolygon);
    TextPath_addEvent(SVGElementClass, 'beforeAddingDataLabel', drawTextPath);
    const svgElementProto = SVGElementClass.prototype;
    if (!svgElementProto.setTextPath) {
        svgElementProto.setTextPath = setTextPath;
    }
}
const TextPath = {
    compose
};
/* harmony default export */ const Extensions_TextPath = (TextPath);

;// ./code/es-modules/Series/Treegraph/TreegraphSeries.js
/* *
 *
 *  (c) 2010-2025 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { getLinkPath: TreegraphSeries_getLinkPath } = Series_PathUtilities;

const { series: { prototype: seriesProto }, seriesTypes: { treemap: TreemapSeries, column: ColumnSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { prototype: { symbols } } = (highcharts_SVGRenderer_commonjs_highcharts_SVGRenderer_commonjs2_highcharts_SVGRenderer_root_Highcharts_SVGRenderer_default());



const { getLevelOptions: TreegraphSeries_getLevelOptions, getNodeWidth: TreegraphSeries_getNodeWidth } = Series_TreeUtilities;

const { arrayMax, crisp, extend: TreegraphSeries_extend, merge: TreegraphSeries_merge, pick: TreegraphSeries_pick, relativeLength: TreegraphSeries_relativeLength, splat } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());





Extensions_TextPath.compose((highcharts_SVGElement_commonjs_highcharts_SVGElement_commonjs2_highcharts_SVGElement_root_Highcharts_SVGElement_default()));
/* *
 *
 *  Class
 *
 * */
/**
 * The Treegraph series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.treegraph
 *
 * @augments Highcharts.Series
 */
class TreegraphSeries extends TreemapSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.nodeList = [];
        this.links = [];
    }
    /* *
     *
     *  Functions
     *
     * */
    init() {
        super.init.apply(this, arguments);
        this.layoutAlgorythm = new Treegraph_TreegraphLayout();
        // Register the link data labels in the label collector for overlap
        // detection.
        const series = this, collectors = this.chart.labelCollectors, collectorFunc = function () {
            const linkLabels = [];
            // Check links for overlap
            if (series.options.dataLabels &&
                !splat(series.options.dataLabels)[0].allowOverlap) {
                for (const link of (series.links || [])) {
                    if (link.dataLabel) {
                        linkLabels.push(link.dataLabel);
                    }
                }
            }
            return linkLabels;
        };
        // Only add the collector function if it is not present
        if (!collectors.some((f) => f.name === 'collectorFunc')) {
            collectors.push(collectorFunc);
        }
    }
    /**
     * Calculate `a` and `b` parameters of linear transformation, where
     * `finalPosition = a * calculatedPosition + b`.
     *
     * @return {LayoutModifiers} `a` and `b` parameter for x and y direction.
     */
    getLayoutModifiers() {
        const chart = this.chart, series = this, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, columnCount = arrayMax(this.points.map((p) => p.node.xPosition));
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, maxXSize = 0, minXSize = 0, maxYSize = 0, minYSize = 0;
        this.points.forEach((point) => {
            // When fillSpace is on, stop the layout calculation when the hidden
            // points are reached. (#19038)
            if (this.options.fillSpace && !point.visible) {
                return;
            }
            const node = point.node, level = series.mapOptionsToLevel[point.node.level] || {}, markerOptions = TreegraphSeries_merge(this.options.marker, level.marker, point.options.marker), nodeWidth = markerOptions.width ?? TreegraphSeries_getNodeWidth(this, columnCount), radius = TreegraphSeries_relativeLength(markerOptions.radius || 0, Math.min(plotSizeX, plotSizeY)), symbol = markerOptions.symbol, nodeSizeY = (symbol === 'circle' || !markerOptions.height) ?
                radius * 2 :
                TreegraphSeries_relativeLength(markerOptions.height, plotSizeY), nodeSizeX = symbol === 'circle' || !nodeWidth ?
                radius * 2 :
                TreegraphSeries_relativeLength(nodeWidth, plotSizeX);
            node.nodeSizeX = nodeSizeX;
            node.nodeSizeY = nodeSizeY;
            let lineWidth;
            if (node.xPosition <= minX) {
                minX = node.xPosition;
                lineWidth = markerOptions.lineWidth || 0;
                minXSize = Math.max(nodeSizeX + lineWidth, minXSize);
            }
            if (node.xPosition >= maxX) {
                maxX = node.xPosition;
                lineWidth = markerOptions.lineWidth || 0;
                maxXSize = Math.max(nodeSizeX + lineWidth, maxXSize);
            }
            if (node.yPosition <= minY) {
                minY = node.yPosition;
                lineWidth = markerOptions.lineWidth || 0;
                minYSize = Math.max(nodeSizeY + lineWidth, minYSize);
            }
            if (node.yPosition >= maxY) {
                maxY = node.yPosition;
                lineWidth = markerOptions.lineWidth || 0;
                maxYSize = Math.max(nodeSizeY + lineWidth, maxYSize);
            }
        });
        // Calculate the values of linear transformation, which will later be
        // applied as `nodePosition = a * x + b` for each direction.
        const ay = maxY === minY ?
            1 :
            (plotSizeY - (minYSize + maxYSize) / 2) / (maxY - minY), by = maxY === minY ? plotSizeY / 2 : -ay * minY + minYSize / 2, ax = maxX === minX ?
            1 :
            (plotSizeX - (maxXSize + maxXSize) / 2) / (maxX - minX), bx = maxX === minX ? plotSizeX / 2 : -ax * minX + minXSize / 2;
        return { ax, bx, ay, by };
    }
    getLinks() {
        const series = this;
        const links = [];
        this.data.forEach((point) => {
            const levelOptions = series.mapOptionsToLevel[point.node.level || 0] || {};
            if (point.node.parent) {
                const pointOptions = TreegraphSeries_merge(levelOptions, point.options);
                if (!point.linkToParent || point.linkToParent.destroyed) {
                    const link = new series.LinkClass(series, pointOptions, void 0, point);
                    point.linkToParent = link;
                }
                else {
                    // #19552
                    point.collapsed = TreegraphSeries_pick(point.collapsed, (this.mapOptionsToLevel[point.node.level] || {}).collapsed);
                    point.linkToParent.visible =
                        point.linkToParent.toNode.visible;
                }
                point.linkToParent.index = links.push(point.linkToParent) - 1;
            }
            else {
                if (point.linkToParent) {
                    series.links.splice(point.linkToParent.index);
                    point.linkToParent.destroy();
                    delete point.linkToParent;
                }
            }
        });
        return links;
    }
    buildTree(id, index, level, list, parent) {
        const point = this.points[index];
        level = (point && point.level) || level;
        return super.buildTree.call(this, id, index, level, list, parent);
    }
    markerAttribs() {
        // The super Series.markerAttribs returns { width: NaN, height: NaN },
        // so just disable this for now.
        return {};
    }
    setCollapsedStatus(node, visibility) {
        const point = node.point;
        if (point) {
            // Take the level options into account.
            point.collapsed = TreegraphSeries_pick(point.collapsed, (this.mapOptionsToLevel[node.level] || {}).collapsed);
            point.visible = visibility;
            visibility = visibility === false ? false : !point.collapsed;
        }
        node.children.forEach((childNode) => {
            this.setCollapsedStatus(childNode, visibility);
        });
    }
    drawTracker() {
        ColumnSeries.prototype.drawTracker.apply(this, arguments);
        ColumnSeries.prototype.drawTracker.call(this, this.links);
    }
    /**
     * Run pre-translation by generating the nodeColumns.
     * @private
     */
    translate() {
        const series = this, options = series.options;
        // NOTE: updateRootId modifies series.
        let rootId = Series_TreeUtilities.updateRootId(series), rootNode;
        // Call prototype function
        seriesProto.translate.call(series);
        const tree = series.tree = series.getTree();
        rootNode = series.nodeMap[rootId];
        if (rootId !== '' && (!rootNode || !rootNode.children.length)) {
            series.setRootNode('', false);
            rootId = series.rootNode;
            rootNode = series.nodeMap[rootId];
        }
        series.mapOptionsToLevel = TreegraphSeries_getLevelOptions({
            from: rootNode.level + 1,
            levels: options.levels,
            to: tree.height,
            defaults: {
                levelIsConstant: series.options.levelIsConstant,
                colorByPoint: options.colorByPoint
            }
        });
        this.setCollapsedStatus(tree, true);
        series.links = series.getLinks();
        series.setTreeValues(tree);
        this.layoutAlgorythm.calculatePositions(series);
        series.layoutModifier = this.getLayoutModifiers();
        this.points.forEach((point) => {
            this.translateNode(point);
        });
        this.points.forEach((point) => {
            if (point.linkToParent) {
                this.translateLink(point.linkToParent);
            }
        });
        if (!options.colorByPoint) {
            series.setColorRecursive(series.tree);
        }
    }
    translateLink(link) {
        const fromNode = link.fromNode, toNode = link.toNode, linkWidth = this.options.link?.lineWidth || 0, factor = TreegraphSeries_pick(this.options.link?.curveFactor, 0.5), type = TreegraphSeries_pick(link.options.link?.type, this.options.link?.type, 'default');
        if (fromNode.shapeArgs && toNode.shapeArgs) {
            const fromNodeWidth = (fromNode.shapeArgs.width || 0), inverted = this.chart.inverted, y1 = crisp((fromNode.shapeArgs.y || 0) +
                (fromNode.shapeArgs.height || 0) / 2, linkWidth), y2 = crisp((toNode.shapeArgs.y || 0) +
                (toNode.shapeArgs.height || 0) / 2, linkWidth);
            let x1 = crisp((fromNode.shapeArgs.x || 0) + fromNodeWidth, linkWidth), x2 = crisp(toNode.shapeArgs.x || 0, linkWidth);
            if (inverted) {
                x1 -= fromNodeWidth;
                x2 += (toNode.shapeArgs.width || 0);
            }
            const diff = toNode.node.xPosition - fromNode.node.xPosition;
            link.shapeType = 'path';
            const fullWidth = Math.abs(x2 - x1) + fromNodeWidth, width = (fullWidth / diff) - fromNodeWidth, offset = width * factor * (inverted ? -1 : 1);
            const xMiddle = crisp((x2 + x1) / 2, linkWidth);
            link.plotX = xMiddle;
            link.plotY = y2;
            link.shapeArgs = {
                d: TreegraphSeries_getLinkPath[type]({
                    x1,
                    y1,
                    x2,
                    y2,
                    width,
                    offset,
                    inverted,
                    parentVisible: toNode.visible,
                    radius: this.options.link?.radius
                })
            };
            link.dlBox = {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2,
                height: linkWidth,
                width: 0
            };
            link.tooltipPos = inverted ? [
                (this.chart.plotSizeY || 0) - link.dlBox.y,
                (this.chart.plotSizeX || 0) - link.dlBox.x
            ] : [
                link.dlBox.x,
                link.dlBox.y
            ];
        }
    }
    /**
     * Private method responsible for adjusting the dataLabel options for each
     * node-point individually.
     */
    drawNodeLabels(points) {
        const series = this, mapOptionsToLevel = series.mapOptionsToLevel;
        let options, level;
        for (const point of points) {
            level = mapOptionsToLevel[point.node.level];
            // Set options to new object to avoid problems with scope
            options = { style: {} };
            // If options for level exists, include them as well
            if (level && level.dataLabels) {
                options = TreegraphSeries_merge(options, level.dataLabels);
                series.hasDataLabels = () => true;
            }
            // Set dataLabel width to the width of the point shape.
            if (point.shapeArgs &&
                series.options.dataLabels) {
                const css = {};
                let { width = 0, height = 0 } = point.shapeArgs;
                if (series.chart.inverted) {
                    [width, height] = [height, width];
                }
                if (!splat(series.options.dataLabels)[0].style?.width) {
                    css.width = `${width}px`;
                }
                if (!splat(series.options.dataLabels)[0].style?.lineClamp) {
                    css.lineClamp = Math.floor(height / 16);
                }
                TreegraphSeries_extend(options.style, css);
                point.dataLabel?.css(css);
            }
            // Merge custom options with point options
            point.dlOptions = TreegraphSeries_merge(options, point.options.dataLabels);
        }
        seriesProto.drawDataLabels.call(this, points);
    }
    /**
     * Override alignDataLabel so that position is always calculated and the
     * label is faded in and out instead of hidden/shown when collapsing and
     * expanding nodes.
     */
    alignDataLabel(point, dataLabel) {
        const visible = point.visible;
        // Force position calculation and visibility
        point.visible = true;
        super.alignDataLabel.apply(this, arguments);
        // Fade in or out
        dataLabel.animate({
            opacity: visible === false ? 0 : 1
        }, void 0, function () {
            // Hide data labels that belong to hidden points (#18891)
            visible || dataLabel.hide();
        });
        // Reset
        point.visible = visible;
    }
    /**
     * Treegraph has two separate collecions of nodes and lines,
     * render dataLabels for both sets.
     */
    drawDataLabels() {
        if (this.options.dataLabels) {
            this.options.dataLabels = splat(this.options.dataLabels);
            // Render node labels.
            this.drawNodeLabels(this.points);
            // Render link labels.
            seriesProto.drawDataLabels.call(this, this.links);
        }
    }
    destroy() {
        // Links must also be destroyed.
        if (this.links) {
            for (const link of this.links) {
                link.destroy();
            }
            this.links.length = 0;
        }
        return seriesProto.destroy.apply(this, arguments);
    }
    /**
     * Return the presentational attributes.
     * @private
     */
    pointAttribs(point, state) {
        const series = this, levelOptions = point &&
            series.mapOptionsToLevel[point.node.level || 0] || {}, options = point && point.options, stateOptions = (levelOptions.states &&
            levelOptions.states[state]) ||
            {};
        if (point) {
            point.options.marker = TreegraphSeries_merge(series.options.marker, levelOptions.marker, point.options.marker);
        }
        const linkColor = TreegraphSeries_pick(stateOptions && stateOptions.link && stateOptions.link.color, options && options.link && options.link.color, levelOptions && levelOptions.link && levelOptions.link.color, series.options.link && series.options.link.color), linkLineWidth = TreegraphSeries_pick(stateOptions && stateOptions.link &&
            stateOptions.link.lineWidth, options && options.link && options.link.lineWidth, levelOptions && levelOptions.link &&
            levelOptions.link.lineWidth, series.options.link && series.options.link.lineWidth), attribs = seriesProto.pointAttribs.call(series, point, state);
        if (point) {
            if (point.isLink) {
                attribs.stroke = linkColor;
                attribs['stroke-width'] = linkLineWidth;
                delete attribs.fill;
            }
            if (!point.visible) {
                attribs.opacity = 0;
            }
        }
        return attribs;
    }
    drawPoints() {
        TreemapSeries.prototype.drawPoints.apply(this, arguments);
        ColumnSeries.prototype.drawPoints.call(this, this.links);
    }
    /**
     * Run translation operations for one node.
     * @private
     */
    translateNode(point) {
        const chart = this.chart, node = point.node, plotSizeY = chart.plotSizeY, plotSizeX = chart.plotSizeX, 
        // Get the layout modifiers which are common for all nodes.
        { ax, bx, ay, by } = this.layoutModifier, x = ax * node.xPosition + bx, y = ay * node.yPosition + by, level = this.mapOptionsToLevel[node.level] || {}, markerOptions = TreegraphSeries_merge(this.options.marker, level.marker, point.options.marker), symbol = markerOptions.symbol, height = node.nodeSizeY, width = node.nodeSizeX, reversed = this.options.reversed, nodeX = node.x = (chart.inverted ?
            plotSizeX - width / 2 - x :
            x - width / 2), nodeY = node.y = (!reversed ?
            plotSizeY - y - height / 2 :
            y - height / 2), borderRadius = TreegraphSeries_pick(point.options.borderRadius, level.borderRadius, this.options.borderRadius), symbolFn = symbols[symbol || 'circle'];
        if (symbolFn === void 0) {
            point.hasImage = true;
            point.shapeType = 'image';
            point.imageUrl = symbol.match(/^url\((.*?)\)$/)[1];
        }
        else {
            point.shapeType = 'path';
        }
        if (!point.visible && point.linkToParent) {
            const parentNode = point.linkToParent.fromNode;
            if (parentNode) {
                const parentShapeArgs = parentNode.shapeArgs || {}, { x = 0, y = 0, width = 0, height = 0 } = parentShapeArgs;
                if (!point.shapeArgs) {
                    point.shapeArgs = {};
                }
                if (!point.hasImage) {
                    TreegraphSeries_extend(point.shapeArgs, {
                        d: symbolFn(x, y, width, height, borderRadius ? { r: borderRadius } : void 0)
                    });
                }
                TreegraphSeries_extend(point.shapeArgs, { x, y });
                point.plotX = parentNode.plotX;
                point.plotY = parentNode.plotY;
            }
        }
        else {
            point.plotX = nodeX;
            point.plotY = nodeY;
            point.shapeArgs = {
                x: nodeX,
                y: nodeY,
                width,
                height,
                cursor: !point.node.isLeaf ? 'pointer' : 'default'
            };
            if (!point.hasImage) {
                point.shapeArgs.d = symbolFn(nodeX, nodeY, width, height, borderRadius ? { r: borderRadius } : void 0);
            }
        }
        // Set the anchor position for tooltip.
        point.tooltipPos = chart.inverted ?
            [plotSizeY - nodeY - height / 2, plotSizeX - nodeX - width / 2] :
            [nodeX + width / 2, nodeY];
    }
}
TreegraphSeries.defaultOptions = TreegraphSeries_merge(TreemapSeries.defaultOptions, Treegraph_TreegraphSeriesDefaults);
TreegraphSeries_extend(TreegraphSeries.prototype, {
    pointClass: Treegraph_TreegraphPoint,
    NodeClass: Treegraph_TreegraphNode,
    LinkClass: TreegraphLink
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('treegraph', TreegraphSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Treegraph_TreegraphSeries = ((/* unused pure expression or super */ null && (TreegraphSeries)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `treegraph` series. If the [type](#series.treegraph.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.treegraph
 * @exclude   allowDrillToNode, boostBlending, boostThreshold, curveFactor,
 * centerInCategory, connectEnds, connectNulls, colorAxis, colorKey,
 * dataSorting, dragDrop, findNearestPointBy, getExtremesFromAll, groupPadding,
 * headers, layout, nodePadding, nodeSizeBy, pointInterval, pointIntervalUnit,
 * pointPlacement, pointStart, relativeXValue, softThreshold, stack, stacking,
 * step, traverseUpButton, xAxis, yAxis, zoneAxis, zones
 * @product   highcharts
 * @requires  modules/treemap
 * @requires  modules/treegraph
 * @apioption series.treegraph
 */
/**
 * @extends   plotOptions.series.marker
 * @excluding enabled, enabledThreshold
 * @apioption series.treegraph.marker
 */
/**
 * @type      {Highcharts.SeriesTreegraphDataLabelsOptionsObject|Array<Highcharts.SeriesTreegraphDataLabelsOptionsObject>}
 * @product   highcharts
 * @apioption series.treegraph.data.dataLabels
 */
/**
 * @sample highcharts/series-treegraph/level-options
 *          Treegraph chart with level options applied
 *
 * @type      {Array<*>}
 * @excluding layoutStartingDirection, layoutAlgorithm
 * @apioption series.treegraph.levels
 */
/**
 * Set collapsed status for nodes level-wise.
 * @type {boolean}
 * @apioption series.treegraph.levels.collapsed
 */
/**
 * Set marker options for nodes at the level.
 * @extends   series.treegraph.marker
 * @apioption series.treegraph.levels.marker
 */
/**
 * An array of data points for the series. For the `treegraph` series type,
 * points can be given in the following ways:
 *
 * 1. The array of arrays, with `keys` property, which defines how the fields in
 *     array should be interpreted
 *    ```js
 *       keys: ['id', 'parent'],
 *       data: [
 *           ['Category1'],
 *           ['Category1', 'Category2']
 *       ]
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the
 *    series' [turboThreshold](#series.area.turboThreshold),
 *    this option is not available.
 *    The data of the treegraph series needs to be formatted in such a way, that
 *    there are no circular dependencies on the nodes
 *
 *  ```js
 *     data: [{
 *         id: 'Category1'
 *     }, {
 *         id: 'Category1',
 *         parent: 'Category2',
 *     }]
 *  ```
 *
 * @type      {Array<*>}
 * @extends   series.treemap.data
 * @product   highcharts
 * @excluding outgoing, weight, value
 * @apioption series.treegraph.data
 */
/**
 * Options used for button, which toggles the collapse status of the node.
 *
 *
 * @apioption series.treegraph.data.collapseButton
 */
/**
 * If point's children should be initially hidden
 *
 * @sample highcharts/series-treegraph/level-options
 *          Treegraph chart with initially hidden children
 *
 * @type {boolean}
 * @apioption series.treegraph.data.collapsed
 */
''; // Gets doclets above into transpiled version

;// ./code/es-modules/masters/modules/treegraph.src.js




/* harmony default export */ const treegraph_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});