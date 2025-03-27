/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/funnel3d
 * @requires highcharts
 * @requires highcharts/highcharts-3d
 * @requires highcharts/modules/cylinder
 *
 * Highcharts funnel module
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["Color"], root["_Highcharts"]["RendererRegistry"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/funnel3d", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["Color"],amd1["RendererRegistry"],amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/funnel3d"] = factory(root["_Highcharts"], root["_Highcharts"]["Color"], root["_Highcharts"]["RendererRegistry"], root["_Highcharts"]["SeriesRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["Color"], root["Highcharts"]["RendererRegistry"], root["Highcharts"]["SeriesRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__620__, __WEBPACK_EXTERNAL_MODULE__608__, __WEBPACK_EXTERNAL_MODULE__512__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 620:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__620__;

/***/ }),

/***/ 608:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__608__;

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
  "default": () => (/* binding */ funnel3d_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Color"],"commonjs":["highcharts","Color"],"commonjs2":["highcharts","Color"],"root":["Highcharts","Color"]}
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_ = __webpack_require__(620);
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default = /*#__PURE__*/__webpack_require__.n(highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","RendererRegistry"],"commonjs":["highcharts","RendererRegistry"],"commonjs2":["highcharts","RendererRegistry"],"root":["Highcharts","RendererRegistry"]}
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_ = __webpack_require__(608);
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_);
;// ./code/es-modules/Series/Funnel3D/SVGElement3DFunnel.js
/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { parse: color } = (highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default());

const { charts } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { Element3D: SVGElement3D } = highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default().getRendererType().prototype;

const { merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class SVGElement3DFunnel extends SVGElement3D {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.mainParts = ['top', 'bottom'];
        this.parts = [
            'top', 'bottom',
            'frontUpper', 'backUpper',
            'frontLower', 'backLower',
            'rightUpper', 'rightLower'
        ];
        this.sideGroups = [
            'upperGroup', 'lowerGroup'
        ];
        this.sideParts = {
            upperGroup: ['frontUpper', 'backUpper', 'rightUpper'],
            lowerGroup: ['frontLower', 'backLower', 'rightLower']
        };
        this.pathType = 'funnel3d';
    }
    /* *
     *
     *  Functions
     *
     * */
    // override opacity and color setters to control opacity
    opacitySetter(value) {
        const funnel3d = this, opacity = parseFloat(value), parts = funnel3d.parts, chart = charts[funnel3d.renderer.chartIndex], filterId = 'group-opacity-' + opacity + '-' + chart.index;
        // Use default for top and bottom
        funnel3d.parts = funnel3d.mainParts;
        funnel3d.singleSetterForParts('opacity', opacity);
        // Restore
        funnel3d.parts = parts;
        if (!chart.renderer.filterId) {
            chart.renderer.definition({
                tagName: 'filter',
                attributes: {
                    id: filterId
                },
                children: [{
                        tagName: 'feComponentTransfer',
                        children: [{
                                tagName: 'feFuncA',
                                attributes: {
                                    type: 'table',
                                    tableValues: '0 ' + opacity
                                }
                            }]
                    }]
            });
            for (const groupName of funnel3d.sideGroups) {
                funnel3d[groupName].attr({
                    filter: 'url(#' + filterId + ')'
                });
            }
            // Styled mode
            if (funnel3d.renderer.styledMode) {
                chart.renderer.definition({
                    tagName: 'style',
                    textContent: '.highcharts-' + filterId +
                        ' {filter:url(#' + filterId + ')}'
                });
                for (const groupName of funnel3d.sideGroups) {
                    funnel3d[groupName].addClass('highcharts-' + filterId);
                }
            }
        }
        return funnel3d;
    }
    fillSetter(fill) {
        let fillColor = color(fill);
        // Extract alpha channel to use the opacitySetter
        const funnel3d = this, alpha = fillColor.rgba[3], partsWithColor = {
            // Standard color for top and bottom
            top: color(fill).brighten(0.1).get(),
            bottom: color(fill).brighten(-0.2).get()
        };
        if (alpha < 1) {
            fillColor.rgba[3] = 1;
            fillColor = fillColor.get('rgb');
            // Set opacity through the opacitySetter
            funnel3d.attr({
                opacity: alpha
            });
        }
        else {
            // Use default for full opacity
            fillColor = fill;
        }
        // Add gradient for sides
        if (!fillColor.linearGradient &&
            !fillColor.radialGradient &&
            funnel3d.gradientForSides) {
            fillColor = {
                linearGradient: { x1: 0, x2: 1, y1: 1, y2: 1 },
                stops: [
                    [0, color(fill).brighten(-0.2).get()],
                    [0.5, fill],
                    [1, color(fill).brighten(-0.2).get()]
                ]
            };
        }
        // Gradient support
        if (fillColor.linearGradient) {
            // Color in steps, as each gradient will generate a key
            for (const sideGroupName of funnel3d.sideGroups) {
                const box = funnel3d[sideGroupName].gradientBox, gradient = fillColor.linearGradient, alteredGradient = merge(fillColor, {
                    linearGradient: {
                        x1: box.x + gradient.x1 * box.width,
                        y1: box.y + gradient.y1 * box.height,
                        x2: box.x + gradient.x2 * box.width,
                        y2: box.y + gradient.y2 * box.height
                    }
                });
                for (const partName of funnel3d.sideParts[sideGroupName]) {
                    partsWithColor[partName] = alteredGradient;
                }
            }
        }
        else {
            merge(true, partsWithColor, {
                frontUpper: fillColor,
                backUpper: fillColor,
                rightUpper: fillColor,
                frontLower: fillColor,
                backLower: fillColor,
                rightLower: fillColor
            });
            if (fillColor.radialGradient) {
                for (const sideGroupName of funnel3d.sideGroups) {
                    const gradBox = funnel3d[sideGroupName].gradientBox, centerX = gradBox.x + gradBox.width / 2, centerY = gradBox.y + gradBox.height / 2, diameter = Math.min(gradBox.width, gradBox.height);
                    for (const partName of funnel3d.sideParts[sideGroupName]) {
                        funnel3d[partName].setRadialReference([
                            centerX, centerY, diameter
                        ]);
                    }
                }
            }
        }
        funnel3d.singleSetterForParts('fill', null, partsWithColor);
        // Fill for animation getter (#6776)
        funnel3d.color = funnel3d.fill = fill;
        // Change gradientUnits to userSpaceOnUse for linearGradient
        if (fillColor.linearGradient) {
            for (const part of [funnel3d.frontLower, funnel3d.frontUpper]) {
                const elem = part.element, grad = (elem &&
                    funnel3d.renderer.gradients[elem.gradient]);
                if (grad &&
                    grad.attr('gradientUnits') !== 'userSpaceOnUse') {
                    grad.attr({
                        gradientUnits: 'userSpaceOnUse'
                    });
                }
            }
        }
        return funnel3d;
    }
    adjustForGradient() {
        const funnel3d = this;
        let bbox;
        for (const sideGroupName of funnel3d.sideGroups) {
            // Use common extremes for groups for matching gradients
            let topLeftEdge = {
                x: Number.MAX_VALUE,
                y: Number.MAX_VALUE
            }, bottomRightEdge = {
                x: -Number.MAX_VALUE,
                y: -Number.MAX_VALUE
            };
            // Get extremes
            for (const partName of funnel3d.sideParts[sideGroupName]) {
                const part = funnel3d[partName];
                bbox = part.getBBox(true);
                topLeftEdge = {
                    x: Math.min(topLeftEdge.x, bbox.x),
                    y: Math.min(topLeftEdge.y, bbox.y)
                };
                bottomRightEdge = {
                    x: Math.max(bottomRightEdge.x, bbox.x + bbox.width),
                    y: Math.max(bottomRightEdge.y, bbox.y + bbox.height)
                };
            }
            // Store for color fillSetter
            funnel3d[sideGroupName].gradientBox = {
                x: topLeftEdge.x,
                width: bottomRightEdge.x - topLeftEdge.x,
                y: topLeftEdge.y,
                height: bottomRightEdge.y - topLeftEdge.y
            };
        }
    }
    zIndexSetter() {
        // `this.added` won't work, because zIndex is set after the prop is set,
        // but before the graphic is really added
        if (this.finishedOnAdd) {
            this.adjustForGradient();
        }
        // Run default
        return this.renderer.Element.prototype.zIndexSetter.apply(this, arguments);
    }
    onAdd() {
        this.adjustForGradient();
        this.finishedOnAdd = true;
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel3D_SVGElement3DFunnel = (SVGElement3DFunnel);

;// ./code/es-modules/Series/Funnel3D/Funnel3DComposition.js
/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { charts: Funnel3DComposition_charts } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { error, extend, merge: Funnel3DComposition_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/** @private */
function compose(SVGRendererClass) {
    const rendererProto = SVGRendererClass.prototype;
    if (!rendererProto.funnel3d) {
        rendererProto.Element3D.types.funnel3d = Funnel3D_SVGElement3DFunnel;
        extend(rendererProto, {
            funnel3d: rendererFunnel3d,
            funnel3dPath: rendererFunnel3dPath
        });
    }
}
/** @private */
function rendererFunnel3d(shapeArgs) {
    const renderer = this, funnel3d = renderer.element3d('funnel3d', shapeArgs), styledMode = renderer.styledMode, 
    // Hide stroke for Firefox
    strokeAttrs = {
        'stroke-width': 1,
        stroke: 'none'
    };
    // Create groups for sides for opacity setter
    funnel3d.upperGroup = renderer.g('funnel3d-upper-group').attr({
        zIndex: funnel3d.frontUpper.zIndex
    }).add(funnel3d);
    for (const upperElem of [funnel3d.frontUpper, funnel3d.backUpper, funnel3d.rightUpper]) {
        if (!styledMode) {
            upperElem.attr(strokeAttrs);
        }
        upperElem.add(funnel3d.upperGroup);
    }
    funnel3d.lowerGroup = renderer.g('funnel3d-lower-group').attr({
        zIndex: funnel3d.frontLower.zIndex
    }).add(funnel3d);
    for (const lowerElem of [funnel3d.frontLower, funnel3d.backLower, funnel3d.rightLower]) {
        if (!styledMode) {
            lowerElem.attr(strokeAttrs);
        }
        lowerElem.add(funnel3d.lowerGroup);
    }
    funnel3d.gradientForSides = shapeArgs.gradientForSides;
    return funnel3d;
}
/**
 * Generates paths and zIndexes.
 * @private
 */
function rendererFunnel3dPath(shapeArgs) {
    // Check getCylinderEnd for better error message if
    // the cylinder module is missing
    if (!this.getCylinderEnd) {
        error('A required Highcharts module is missing: cylinder.js', true, Funnel3DComposition_charts[this.chartIndex]);
    }
    const renderer = this, chart = Funnel3DComposition_charts[renderer.chartIndex], 
    // Adjust angles for visible edges
    // based on alpha, selected through visual tests
    alphaCorrection = shapeArgs.alphaCorrection = 90 - Math.abs((chart.options.chart.options3d.alpha % 180) -
        90), 
    // Set zIndexes of parts based on cuboid logic, for
    // consistency
    cuboidData = this.cuboidPath.call(renderer, Funnel3DComposition_merge(shapeArgs, {
        depth: shapeArgs.width,
        width: (shapeArgs.width + shapeArgs.bottom.width) / 2
    })), isTopFirst = cuboidData.isTop, isFrontFirst = !cuboidData.isFront, hasMiddle = !!shapeArgs.middle, 
    //
    top = renderer.getCylinderEnd(chart, Funnel3DComposition_merge(shapeArgs, {
        x: shapeArgs.x - shapeArgs.width / 2,
        z: shapeArgs.z - shapeArgs.width / 2,
        alphaCorrection: alphaCorrection
    })), bottomWidth = shapeArgs.bottom.width, bottomArgs = Funnel3DComposition_merge(shapeArgs, {
        width: bottomWidth,
        x: shapeArgs.x - bottomWidth / 2,
        z: shapeArgs.z - bottomWidth / 2,
        alphaCorrection: alphaCorrection
    }), bottom = renderer.getCylinderEnd(chart, bottomArgs, true);
    let middleWidth = bottomWidth, middleTopArgs = bottomArgs, middleTop = bottom, middleBottom = bottom, 
    // Masking for cylinders or a missing part of a side shape
    useAlphaCorrection;
    if (hasMiddle) {
        middleWidth = shapeArgs.middle.width;
        middleTopArgs = Funnel3DComposition_merge(shapeArgs, {
            y: (shapeArgs.y +
                shapeArgs.middle.fraction * shapeArgs.height),
            width: middleWidth,
            x: shapeArgs.x - middleWidth / 2,
            z: shapeArgs.z - middleWidth / 2
        });
        middleTop = renderer.getCylinderEnd(chart, middleTopArgs, false);
        middleBottom = renderer.getCylinderEnd(chart, middleTopArgs, false);
    }
    const ret = {
        top: top,
        bottom: bottom,
        frontUpper: renderer.getCylinderFront(top, middleTop),
        zIndexes: {
            group: cuboidData.zIndexes.group,
            top: isTopFirst !== 0 ? 0 : 3,
            bottom: isTopFirst !== 1 ? 0 : 3,
            frontUpper: isFrontFirst ? 2 : 1,
            backUpper: isFrontFirst ? 1 : 2,
            rightUpper: isFrontFirst ? 2 : 1
        }
    };
    ret.backUpper = renderer.getCylinderBack(top, middleTop);
    useAlphaCorrection = (Math.min(middleWidth, shapeArgs.width) /
        Math.max(middleWidth, shapeArgs.width)) !== 1;
    ret.rightUpper = renderer.getCylinderFront(renderer.getCylinderEnd(chart, Funnel3DComposition_merge(shapeArgs, {
        x: shapeArgs.x - shapeArgs.width / 2,
        z: shapeArgs.z - shapeArgs.width / 2,
        alphaCorrection: useAlphaCorrection ?
            -alphaCorrection : 0
    }), false), renderer.getCylinderEnd(chart, Funnel3DComposition_merge(middleTopArgs, {
        alphaCorrection: useAlphaCorrection ?
            -alphaCorrection : 0
    }), !hasMiddle));
    if (hasMiddle) {
        useAlphaCorrection = (Math.min(middleWidth, bottomWidth) /
            Math.max(middleWidth, bottomWidth)) !== 1;
        Funnel3DComposition_merge(true, ret, {
            frontLower: renderer.getCylinderFront(middleBottom, bottom),
            backLower: renderer.getCylinderBack(middleBottom, bottom),
            rightLower: renderer.getCylinderFront(renderer.getCylinderEnd(chart, Funnel3DComposition_merge(bottomArgs, {
                alphaCorrection: useAlphaCorrection ?
                    -alphaCorrection : 0
            }), true), renderer.getCylinderEnd(chart, Funnel3DComposition_merge(middleTopArgs, {
                alphaCorrection: useAlphaCorrection ?
                    -alphaCorrection : 0
            }), false)),
            zIndexes: {
                frontLower: isFrontFirst ? 2 : 1,
                backLower: isFrontFirst ? 1 : 2,
                rightLower: isFrontFirst ? 1 : 2
            }
        });
    }
    return ret;
}
/* *
 *
 *  Default Export
 *
 * */
const Funnel3DComposition = {
    compose
};
/* harmony default export */ const Funnel3D_Funnel3DComposition = (Funnel3DComposition);

;// ./code/es-modules/Series/Funnel3D/Funnel3DSeriesDefaults.js
/* *
 *
 *  Imports
 *
 * */
/* *
 *
 *  API Options
 *
 * */
/**
 * A funnel3d is a 3d version of funnel series type. Funnel charts are
 * a type of chart often used to visualize stages in a sales project,
 * where the top are the initial stages with the most clients.
 *
 * It requires that the `highcharts-3d.js`, `cylinder.js` and
 * `funnel3d.js` module are loaded.
 *
 * @sample highcharts/demo/funnel3d/
 *         Funnel3d
 *
 * @extends      plotOptions.column
 * @excluding    allAreas, boostThreshold, colorAxis, compare, compareBase,
 *               dataSorting, boostBlending
 * @product      highcharts
 * @since        7.1.0
 * @requires     highcharts-3d
 * @requires     modules/cylinder
 * @requires     modules/funnel3d
 * @optionparent plotOptions.funnel3d
 */
const Funnel3DSeriesDefaults = {
    /** @ignore-option */
    center: ['50%', '50%'],
    /**
     * The max width of the series compared to the width of the plot area,
     * or the pixel width if it is a number.
     *
     * @type    {number|string}
     * @sample  {highcharts} highcharts/demo/funnel3d/ Funnel3d demo
     * @product highcharts
     */
    width: '90%',
    /**
     * The width of the neck, the lower part of the funnel. A number defines
     * pixel width, a percentage string defines a percentage of the plot
     * area width.
     *
     * @type    {number|string}
     * @sample  {highcharts} highcharts/demo/funnel3d/ Funnel3d demo
     * @product highcharts
     */
    neckWidth: '30%',
    /**
     * The height of the series. If it is a number it defines
     * the pixel height, if it is a percentage string it is the percentage
     * of the plot area height.
     *
     * @type    {number|string}
     * @sample  {highcharts} highcharts/demo/funnel3d/ Funnel3d demo
     * @product highcharts
     */
    height: '100%',
    /**
     * The height of the neck, the lower part of the funnel. A number
     * defines pixel width, a percentage string defines a percentage
     * of the plot area height.
     *
     * @type    {number|string}
     * @sample  {highcharts} highcharts/demo/funnel3d/ Funnel3d demo
     * @product highcharts
     */
    neckHeight: '25%',
    /**
     * A reversed funnel has the widest area down. A reversed funnel with
     * no neck width and neck height is a pyramid.
     *
     * @product highcharts
     */
    reversed: false,
    /**
     * By default sides fill is set to a gradient through this option being
     * set to `true`. Set to `false` to get solid color for the sides.
     *
     * @product highcharts
     */
    gradientForSides: true,
    animation: false,
    edgeWidth: 0,
    colorByPoint: true,
    showInLegend: false,
    dataLabels: {
        align: 'right',
        crop: false,
        inside: false,
        overflow: 'allow'
    }
};
/**
 * A `funnel3d` series. If the [type](#series.funnel3d.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @sample {highcharts} highcharts/demo/funnel3d/
 *         Funnel3d demo
 *
 * @since     7.1.0
 * @extends   series,plotOptions.funnel3d
 * @excluding allAreas,boostThreshold,colorAxis,compare,compareBase
 * @product   highcharts
 * @requires  highcharts-3d
 * @requires  modules/cylinder
 * @requires  modules/funnel3d
 * @apioption series.funnel3d
 */
/**
 * An array of data points for the series. For the `funnel3d` series
 * type, points can be given in the following ways:
 *
 * 1.  An array of numerical values. In this case, the numerical values
 * will be interpreted as `y` options. The `x` values will be automatically
 * calculated, either starting at 0 and incremented by 1, or from `pointStart`
 * and `pointInterval` given in the series options. If the axis has
 * categories, these will be used. Example:
 *
 *  ```js
 *  data: [0, 5, 3, 5]
 *  ```
 *
 * 2.  An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series' [turboThreshold](#series.funnel3d.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         y: 2,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         y: 4,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<number>|*>}
 * @extends   series.column.data
 * @product   highcharts
 * @apioption series.funnel3d.data
 */
/**
 * By default sides fill is set to a gradient through this option being
 * set to `true`. Set to `false` to get solid color for the sides.
 *
 * @type      {boolean}
 * @product   highcharts
 * @apioption series.funnel3d.data.gradientForSides
 */
''; // Detachs doclets above
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel3D_Funnel3DSeriesDefaults = (Funnel3DSeriesDefaults);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Funnel3D/Funnel3DPoint.js
/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { seriesTypes: { column: ColumnSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { extend: Funnel3DPoint_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class Funnel3DPoint extends ColumnSeries.prototype.pointClass {
}
Funnel3DPoint_extend(Funnel3DPoint.prototype, {
    shapeType: 'funnel3d'
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel3D_Funnel3DPoint = (Funnel3DPoint);

;// ./code/es-modules/Core/Math3D.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { deg2rad } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable max-len */
/**
 * Apply 3-D rotation
 * Euler Angles (XYZ):
 *     cosA = cos(Alfa|Roll)
 *     cosB = cos(Beta|Pitch)
 *     cosG = cos(Gamma|Yaw)
 *
 * Composite rotation:
 * |          cosB * cosG             |           cosB * sinG            |    -sinB    |
 * | sinA * sinB * cosG - cosA * sinG | sinA * sinB * sinG + cosA * cosG | sinA * cosB |
 * | cosA * sinB * cosG + sinA * sinG | cosA * sinB * sinG - sinA * cosG | cosA * cosB |
 *
 * Now, Gamma/Yaw is not used (angle=0), so we assume cosG = 1 and sinG = 0, so
 * we get:
 * |     cosB    |   0    |   - sinB    |
 * | sinA * sinB |  cosA  | sinA * cosB |
 * | cosA * sinB | - sinA | cosA * cosB |
 *
 * But in browsers, y is reversed, so we get sinA => -sinA. The general result
 * is:
 * |      cosB     |   0    |    - sinB     |     | x |     | px |
 * | - sinA * sinB |  cosA  | - sinA * cosB |  x  | y |  =  | py |
 * |  cosA * sinB  |  sinA  |  cosA * cosB  |     | z |     | pz |
 *
 * @private
 * @function rotate3D
 */
/* eslint-enable max-len */
/**
 * Rotates the position as defined in angles.
 * @private
 * @param {number} x
 *        X coordinate
 * @param {number} y
 *        Y coordinate
 * @param {number} z
 *        Z coordinate
 * @param {Highcharts.Rotation3DObject} angles
 *        Rotation angles
 * @return {Highcharts.Position3DObject}
 *         Rotated position
 */
function rotate3D(x, y, z, angles) {
    return {
        x: angles.cosB * x - angles.sinB * z,
        y: -angles.sinA * angles.sinB * x + angles.cosA * y -
            angles.cosB * angles.sinA * z,
        z: angles.cosA * angles.sinB * x + angles.sinA * y +
            angles.cosA * angles.cosB * z
    };
}
/**
 * Transforms a given array of points according to the angles in chart.options.
 *
 * @private
 * @function Highcharts.perspective
 *
 * @param {Array<Highcharts.Position3DObject>} points
 * The array of points
 *
 * @param {Highcharts.Chart} chart
 * The chart
 *
 * @param {boolean} [insidePlotArea]
 * Whether to verify that the points are inside the plotArea
 *
 * @param {boolean} [useInvertedPersp]
 * Whether to use inverted perspective in calculations
 *
 * @return {Array<Highcharts.Position3DObject>}
 * An array of transformed points
 *
 * @requires highcharts-3d
 */
function perspective(points, chart, insidePlotArea, useInvertedPersp) {
    const options3d = chart.options.chart.options3d, 
    /* The useInvertedPersp argument is used for inverted charts with
     * already inverted elements, such as dataLabels or tooltip positions.
     */
    inverted = pick(useInvertedPersp, insidePlotArea ? chart.inverted : false), origin = {
        x: chart.plotWidth / 2,
        y: chart.plotHeight / 2,
        z: options3d.depth / 2,
        vd: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0)
    }, scale = chart.scale3d || 1, beta = deg2rad * options3d.beta * (inverted ? -1 : 1), alpha = deg2rad * options3d.alpha * (inverted ? -1 : 1), angles = {
        cosA: Math.cos(alpha),
        cosB: Math.cos(-beta),
        sinA: Math.sin(alpha),
        sinB: Math.sin(-beta)
    };
    if (!insidePlotArea) {
        origin.x += chart.plotLeft;
        origin.y += chart.plotTop;
    }
    // Transform each point
    return points.map(function (point) {
        const rotated = rotate3D((inverted ? point.y : point.x) - origin.x, (inverted ? point.x : point.y) - origin.y, (point.z || 0) - origin.z, angles), 
        // Apply perspective
        coordinate = perspective3D(rotated, origin, origin.vd);
        // Apply translation
        coordinate.x = coordinate.x * scale + origin.x;
        coordinate.y = coordinate.y * scale + origin.y;
        coordinate.z = rotated.z * scale + origin.z;
        return {
            x: (inverted ? coordinate.y : coordinate.x),
            y: (inverted ? coordinate.x : coordinate.y),
            z: coordinate.z
        };
    });
}
/**
 * Perspective3D function is available in global Highcharts scope because is
 * needed also outside of perspective() function (#8042).
 * @private
 * @function Highcharts.perspective3D
 *
 * @param {Highcharts.Position3DObject} coordinate
 * 3D position
 *
 * @param {Highcharts.Position3DObject} origin
 * 3D root position
 *
 * @param {number} distance
 * Perspective distance
 *
 * @return {Highcharts.PositionObject}
 * Perspective 3D Position
 *
 * @requires highcharts-3d
 */
function perspective3D(coordinate, origin, distance) {
    const projection = ((distance > 0) &&
        (distance < Number.POSITIVE_INFINITY)) ?
        distance / (coordinate.z + origin.z + distance) :
        1;
    return {
        x: coordinate.x * projection,
        y: coordinate.y * projection
    };
}
/**
 * Calculate a distance from camera to points - made for calculating zIndex of
 * scatter points.
 *
 * @private
 * @function Highcharts.pointCameraDistance
 *
 * @param {Highcharts.Dictionary<number>} coordinates
 * Coordinates of the specific point
 *
 * @param {Highcharts.Chart} chart
 * Related chart
 *
 * @return {number}
 * Distance from camera to point
 *
 * @requires highcharts-3d
 */
function pointCameraDistance(coordinates, chart) {
    const options3d = chart.options.chart.options3d, cameraPosition = {
        x: chart.plotWidth / 2,
        y: chart.plotHeight / 2,
        z: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0) +
            options3d.depth
    }, 
    // Added support for objects with plotX or x coordinates.
    distance = Math.sqrt(Math.pow(cameraPosition.x - pick(coordinates.plotX, coordinates.x), 2) +
        Math.pow(cameraPosition.y - pick(coordinates.plotY, coordinates.y), 2) +
        Math.pow(cameraPosition.z - pick(coordinates.plotZ, coordinates.z), 2));
    return distance;
}
/**
 * Calculate area of a 2D polygon using Shoelace algorithm
 * https://en.wikipedia.org/wiki/Shoelace_formula
 *
 * @private
 * @function Highcharts.shapeArea
 *
 * @param {Array<Highcharts.PositionObject>} vertexes
 * 2D Polygon
 *
 * @return {number}
 * Calculated area
 *
 * @requires highcharts-3d
 */
function shapeArea(vertexes) {
    let area = 0, i, j;
    for (i = 0; i < vertexes.length; i++) {
        j = (i + 1) % vertexes.length;
        area += vertexes[i].x * vertexes[j].y - vertexes[j].x * vertexes[i].y;
    }
    return area / 2;
}
/**
 * Calculate area of a 3D polygon after perspective projection
 *
 * @private
 * @function Highcharts.shapeArea3d
 *
 * @param {Array<Highcharts.Position3DObject>} vertexes
 * 3D Polygon
 *
 * @param {Highcharts.Chart} chart
 * Related chart
 *
 * @param {boolean} [insidePlotArea]
 * Whether to verify that the points are inside the plotArea
 *
 * @return {number}
 * Calculated area
 *
 * @requires highcharts-3d
 */
function shapeArea3D(vertexes, chart, insidePlotArea) {
    return shapeArea(perspective(vertexes, chart, insidePlotArea));
}
/* *
 *
 *  Default Export
 *
 * */
const Math3D = {
    perspective,
    perspective3D,
    pointCameraDistance,
    shapeArea,
    shapeArea3D
};
/* harmony default export */ const Core_Math3D = (Math3D);

;// ./code/es-modules/Series/Funnel3D/Funnel3DSeries.js
/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { perspective: Funnel3DSeries_perspective } = Core_Math3D;

const { series: Series, seriesTypes: { column: Funnel3DSeries_ColumnSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { extend: Funnel3DSeries_extend, merge: Funnel3DSeries_merge, pick: Funnel3DSeries_pick, relativeLength } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The funnel3d series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.funnel3d
 * @augments seriesTypes.column
 * @requires highcharts-3d
 * @requires modules/cylinder
 * @requires modules/funnel3d
 */
class Funnel3DSeries extends Funnel3DSeries_ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    alignDataLabel(point, _dataLabel, options) {
        const series = this, dlBoxRaw = point.dlBoxRaw, inverted = series.chart.inverted, below = point.plotY > Funnel3DSeries_pick(series.translatedThreshold, series.yAxis.len), inside = Funnel3DSeries_pick(options.inside, !!series.options.stacking), dlBox = {
            x: dlBoxRaw.x,
            y: dlBoxRaw.y,
            height: 0
        };
        options.align = Funnel3DSeries_pick(options.align, !inverted || inside ? 'center' : below ? 'right' : 'left');
        options.verticalAlign = Funnel3DSeries_pick(options.verticalAlign, inverted || inside ? 'middle' : below ? 'top' : 'bottom');
        if (options.verticalAlign !== 'top') {
            dlBox.y += dlBoxRaw.bottom /
                (options.verticalAlign === 'bottom' ? 1 : 2);
        }
        dlBox.width = series.getWidthAt(dlBox.y);
        if (series.options.reversed) {
            dlBox.width = dlBoxRaw.fullWidth - dlBox.width;
        }
        if (inside) {
            dlBox.x -= dlBox.width / 2;
        }
        else {
            // Swap for inside
            if (options.align === 'left') {
                options.align = 'right';
                dlBox.x -= dlBox.width * 1.5;
            }
            else if (options.align === 'right') {
                options.align = 'left';
                dlBox.x += dlBox.width / 2;
            }
            else {
                dlBox.x -= dlBox.width / 2;
            }
        }
        point.dlBox = dlBox;
        Funnel3DSeries_ColumnSeries.prototype.alignDataLabel.apply(series, arguments);
    }
    /**
     * Override default axis options with series required options for axes.
     * @private
     */
    bindAxes() {
        Series.prototype.bindAxes.apply(this, arguments);
        Funnel3DSeries_extend(this.xAxis.options, {
            gridLineWidth: 0,
            lineWidth: 0,
            title: void 0,
            tickPositions: []
        });
        Funnel3DSeries_merge(true, this.yAxis.options, {
            gridLineWidth: 0,
            title: void 0,
            labels: {
                enabled: false
            }
        });
    }
    /**
     * @private
     */
    translate() {
        Series.prototype.translate.apply(this, arguments);
        const series = this, chart = series.chart, options = series.options, reversed = options.reversed, ignoreHiddenPoint = options.ignoreHiddenPoint, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, center = options.center, centerX = relativeLength(center[0], plotWidth), centerY = relativeLength(center[1], plotHeight), width = relativeLength(options.width, plotWidth), height = relativeLength(options.height, plotHeight), neckWidth = relativeLength(options.neckWidth, plotWidth), neckHeight = relativeLength(options.neckHeight, plotHeight), neckY = (centerY - height / 2) + height - neckHeight, points = series.points;
        let sum = 0, cumulative = 0, // Start at top
        tempWidth, getWidthAt, fraction, tooltipPos, 
        //
        y1, y3, y5, 
        //
        h, shapeArgs; // @todo: Type it. It's an extended SVGAttributes.
        // Return the width at a specific y coordinate
        series.getWidthAt = getWidthAt = function (y) {
            const top = (centerY - height / 2);
            return (y > neckY || height === neckHeight) ?
                neckWidth :
                neckWidth + (width - neckWidth) *
                    (1 - (y - top) / (height - neckHeight));
        };
        // Expose
        series.center = [centerX, centerY, height];
        series.centerX = centerX;
        /*
            * Individual point coordinate naming:
            *
            *  _________centerX,y1________
            *  \                         /
            *   \                       /
            *    \                     /
            *     \                   /
            *      \                 /
            *        ___centerX,y3___
            *
            * Additional for the base of the neck:
            *
            *       |               |
            *       |               |
            *       |               |
            *        ___centerX,y5___
            */
        // get the total sum
        for (const point of points) {
            if (!ignoreHiddenPoint || point.visible !== false) {
                sum += point.y;
            }
        }
        for (const point of points) {
            // Set start and end positions
            y5 = null;
            fraction = sum ? point.y / sum : 0;
            y1 = centerY - height / 2 + cumulative * height;
            y3 = y1 + fraction * height;
            tempWidth = getWidthAt(y1);
            h = y3 - y1;
            shapeArgs = {
                // For fill setter
                gradientForSides: Funnel3DSeries_pick(point.options.gradientForSides, options.gradientForSides),
                x: centerX,
                y: y1,
                height: h,
                width: tempWidth,
                z: 1,
                top: {
                    width: tempWidth
                }
            };
            tempWidth = getWidthAt(y3);
            shapeArgs.bottom = {
                fraction: fraction,
                width: tempWidth
            };
            // The entire point is within the neck
            if (y1 >= neckY) {
                shapeArgs.isCylinder = true;
            }
            else if (y3 > neckY) {
                // The base of the neck
                y5 = y3;
                tempWidth = getWidthAt(neckY);
                y3 = neckY;
                shapeArgs.bottom.width = tempWidth;
                shapeArgs.middle = {
                    fraction: h ? (neckY - y1) / h : 0,
                    width: tempWidth
                };
            }
            if (reversed) {
                shapeArgs.y = y1 = centerY + height / 2 -
                    (cumulative + fraction) * height;
                if (shapeArgs.middle) {
                    shapeArgs.middle.fraction = 1 -
                        (h ? shapeArgs.middle.fraction : 0);
                }
                tempWidth = shapeArgs.width;
                shapeArgs.width = shapeArgs.bottom.width;
                shapeArgs.bottom.width = tempWidth;
            }
            point.shapeArgs = Funnel3DSeries_extend(point.shapeArgs, shapeArgs);
            // For tooltips and data labels context
            point.percentage = fraction * 100;
            point.plotX = centerX;
            if (reversed) {
                point.plotY = centerY + height / 2 -
                    (cumulative + fraction / 2) * height;
            }
            else {
                point.plotY = (y1 + (y5 || y3)) / 2;
            }
            // Placement of tooltips and data labels in 3D
            tooltipPos = Funnel3DSeries_perspective([{
                    x: centerX,
                    y: point.plotY,
                    z: reversed ?
                        -(width - getWidthAt(point.plotY)) / 2 :
                        -(getWidthAt(point.plotY)) / 2
                }], chart, true)[0];
            point.tooltipPos = [tooltipPos.x, tooltipPos.y];
            // Base to be used when alignment options are known
            point.dlBoxRaw = {
                x: centerX,
                width: getWidthAt(point.plotY),
                y: y1,
                bottom: shapeArgs.height || 0,
                fullWidth: width
            };
            if (!ignoreHiddenPoint || point.visible !== false) {
                cumulative += fraction;
            }
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Funnel3DSeries.compose = Funnel3D_Funnel3DComposition.compose;
Funnel3DSeries.defaultOptions = Funnel3DSeries_merge(Funnel3DSeries_ColumnSeries.defaultOptions, Funnel3D_Funnel3DSeriesDefaults);
Funnel3DSeries_extend(Funnel3DSeries.prototype, {
    pointClass: Funnel3D_Funnel3DPoint,
    translate3dShapes: noop
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('funnel3d', Funnel3DSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Funnel3D_Funnel3DSeries = (Funnel3DSeries);

;// ./code/es-modules/masters/modules/funnel3d.src.js





Funnel3D_Funnel3DSeries.compose(highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default().getRendererType());
/* harmony default export */ const funnel3d_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});