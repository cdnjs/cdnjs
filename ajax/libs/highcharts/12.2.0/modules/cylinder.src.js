/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/cylinder
 * @requires highcharts
 * @requires highcharts/highcharts-3d
 *
 * Highcharts cylinder module
 *
 * (c) 2010-2025 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["Color"], root["_Highcharts"]["RendererRegistry"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/cylinder", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["Color"],amd1["RendererRegistry"],amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/cylinder"] = factory(root["_Highcharts"], root["_Highcharts"]["Color"], root["_Highcharts"]["RendererRegistry"], root["_Highcharts"]["SeriesRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["Color"], root["Highcharts"]["RendererRegistry"], root["Highcharts"]["SeriesRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__620__, __WEBPACK_EXTERNAL_MODULE__608__, __WEBPACK_EXTERNAL_MODULE__512__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 608:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__608__;

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
  "default": () => (/* binding */ cylinder_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Core/Math3D.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
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

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Color"],"commonjs":["highcharts","Color"],"commonjs2":["highcharts","Color"],"root":["Highcharts","Color"]}
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_ = __webpack_require__(620);
var highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default = /*#__PURE__*/__webpack_require__.n(highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","RendererRegistry"],"commonjs":["highcharts","RendererRegistry"],"commonjs2":["highcharts","RendererRegistry"],"root":["Highcharts","RendererRegistry"]}
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_ = __webpack_require__(608);
var highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_);
;// ./code/es-modules/Series/Cylinder/SVGElement3DCylinder.js
/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { parse: color } = (highcharts_Color_commonjs_highcharts_Color_commonjs2_highcharts_Color_root_Highcharts_Color_default());

const { Element3D: SVGElement3D } = highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default().getRendererType().prototype;
/* *
 *
 *  Class
 *
 * */
class SVGElement3DCylinder extends SVGElement3D {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.parts = ['top', 'bottom', 'front', 'back'];
        this.pathType = 'cylinder';
    }
    /* *
     *
     *  Functions
     *
     * */
    fillSetter(fill) {
        this.singleSetterForParts('fill', null, {
            front: fill,
            back: fill,
            top: color(fill).brighten(0.1).get(),
            bottom: color(fill).brighten(-0.1).get()
        });
        // Fill for animation getter (#6776)
        this.color = this.fill = fill;
        return this;
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Cylinder_SVGElement3DCylinder = (SVGElement3DCylinder);

;// ./code/es-modules/Series/Cylinder/CylinderComposition.js
/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { charts, deg2rad: CylinderComposition_deg2rad } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { perspective: CylinderComposition_perspective } = Core_Math3D;


const { extend, pick: CylinderComposition_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 *
 */
function compose(SVGRendererClass) {
    const rendererProto = SVGRendererClass.prototype;
    if (!rendererProto.cylinder) {
        rendererProto.Element3D.types.cylinder = Cylinder_SVGElement3DCylinder;
        extend(rendererProto, {
            cylinder: rendererCylinder,
            cylinderPath: rendererCylinderPath,
            getCurvedPath: rendererGetCurvedPath,
            getCylinderBack: rendererGetCylinderBack,
            getCylinderEnd: rendererGetCylinderEnd,
            getCylinderFront: rendererGetCylinderFront
        });
    }
}
/**
 * Check if a path is simplified. The simplified path contains only lineTo
 * segments, whereas non-simplified contain curves.
 * @private
 */
function isSimplified(path) {
    return !path.some((seg) => seg[0] === 'C');
}
/** @private */
function rendererCylinder(shapeArgs) {
    return this.element3d('cylinder', shapeArgs);
}
/**
 * Generates paths and zIndexes.
 * @private
 */
function rendererCylinderPath(shapeArgs) {
    const renderer = this, chart = charts[renderer.chartIndex], 
    // Decide zIndexes of parts based on cuboid logic, for consistency.
    cuboidData = this.cuboidPath(shapeArgs), isTopFirst = !cuboidData.isTop, isFronFirst = !cuboidData.isFront, top = renderer.getCylinderEnd(chart, shapeArgs), bottom = renderer.getCylinderEnd(chart, shapeArgs, true);
    return {
        front: renderer.getCylinderFront(top, bottom),
        back: renderer.getCylinderBack(top, bottom),
        top: top,
        bottom: bottom,
        zIndexes: {
            top: isTopFirst ? 3 : 0,
            bottom: isTopFirst ? 0 : 3,
            front: isFronFirst ? 2 : 1,
            back: isFronFirst ? 1 : 2,
            group: cuboidData.zIndexes.group
        }
    };
}
/**
 * Returns curved path in format of:
 * [ M, x, y, ...[C, cp1x, cp2y, cp2x, cp2y, epx, epy]*n_times ]
 * (cp - control point, ep - end point)
 * @private
 */
function rendererGetCurvedPath(points) {
    const path = [['M', points[0].x, points[0].y]], limit = points.length - 2;
    for (let i = 1; i < limit; i += 3) {
        path.push([
            'C',
            points[i].x, points[i].y,
            points[i + 1].x, points[i + 1].y,
            points[i + 2].x, points[i + 2].y
        ]);
    }
    return path;
}
/**
 * Returns cylinder Back path.
 * @private
 */
function rendererGetCylinderBack(topPath, bottomPath) {
    const path = [];
    if (isSimplified(topPath)) {
        const move = topPath[0], line2 = topPath[2];
        if (move[0] === 'M' && line2[0] === 'L') {
            path.push(['M', line2[1], line2[2]]);
            path.push(topPath[3]);
            // End at start
            path.push(['L', move[1], move[2]]);
        }
    }
    else {
        if (topPath[2][0] === 'C') {
            path.push(['M', topPath[2][5], topPath[2][6]]);
        }
        path.push(topPath[3], topPath[4]);
    }
    if (isSimplified(bottomPath)) {
        const move = bottomPath[0];
        if (move[0] === 'M') {
            path.push(['L', move[1], move[2]]);
            path.push(bottomPath[3]);
            path.push(bottomPath[2]);
        }
    }
    else {
        const curve2 = bottomPath[2], curve3 = bottomPath[3], curve4 = bottomPath[4];
        if (curve2[0] === 'C' && curve3[0] === 'C' && curve4[0] === 'C') {
            path.push(['L', curve4[5], curve4[6]]);
            path.push([
                'C',
                curve4[3],
                curve4[4],
                curve4[1],
                curve4[2],
                curve3[5],
                curve3[6]
            ]);
            path.push([
                'C',
                curve3[3],
                curve3[4],
                curve3[1],
                curve3[2],
                curve2[5],
                curve2[6]
            ]);
        }
    }
    path.push(['Z']);
    return path;
}
/**
 * Returns cylinder path for top or bottom.
 * @private
 */
function rendererGetCylinderEnd(chart, shapeArgs, isBottom) {
    const { width = 0, height = 0, alphaCorrection = 0 } = shapeArgs, 
    // A half of the smaller one out of width or depth (optional, because
    // there's no depth for a funnel that reuses the code)
    depth = CylinderComposition_pick(shapeArgs.depth, width, 0), radius = Math.min(width, depth) / 2, 
    // Approximated longest diameter
    angleOffset = CylinderComposition_deg2rad * (chart.options.chart.options3d.beta - 90 +
        alphaCorrection), 
    // Could be top or bottom of the cylinder
    y = (shapeArgs.y || 0) + (isBottom ? height : 0), 
    // Use cubic Bezier curve to draw a circle in x,z (y is constant).
    // More math. at spencermortensen.com/articles/bezier-circle/
    c = 0.5519 * radius, centerX = width / 2 + (shapeArgs.x || 0), centerZ = depth / 2 + (shapeArgs.z || 0), 
    // Points could be generated in a loop, but readability will plummet
    points = [{
            x: 0,
            y: y,
            z: radius
        }, {
            x: c,
            y: y,
            z: radius
        }, {
            x: radius,
            y: y,
            z: c
        }, {
            x: radius,
            y: y,
            z: 0
        }, {
            x: radius,
            y: y,
            z: -c
        }, {
            x: c,
            y: y,
            z: -radius
        }, {
            x: 0,
            y: y,
            z: -radius
        }, {
            x: -c,
            y: y,
            z: -radius
        }, {
            x: -radius,
            y: y,
            z: -c
        }, {
            x: -radius,
            y: y,
            z: 0
        }, {
            x: -radius,
            y: y,
            z: c
        }, {
            x: -c,
            y: y,
            z: radius
        }, {
            x: 0,
            y: y,
            z: radius
        }], cosTheta = Math.cos(angleOffset), sinTheta = Math.sin(angleOffset);
    let path, x, z;
    // Rotate to match chart's beta and translate to the shape center
    for (const point of points) {
        x = point.x;
        z = point.z;
        point.x = (x * cosTheta - z * sinTheta) + centerX;
        point.z = (z * cosTheta + x * sinTheta) + centerZ;
    }
    const perspectivePoints = CylinderComposition_perspective(points, chart, true);
    // Check for sub-pixel curve issue, compare front and back edges
    if (Math.abs(perspectivePoints[3].y - perspectivePoints[9].y) < 2.5 &&
        Math.abs(perspectivePoints[0].y - perspectivePoints[6].y) < 2.5) {
        // Use simplified shape
        path = this.toLinePath([
            perspectivePoints[0],
            perspectivePoints[3],
            perspectivePoints[6],
            perspectivePoints[9]
        ], true);
    }
    else {
        // Or default curved path to imitate ellipse (2D circle)
        path = this.getCurvedPath(perspectivePoints);
    }
    return path;
}
/**
 * Returns cylinder Front path.
 * @private
 */
function rendererGetCylinderFront(topPath, bottomPath) {
    const path = topPath.slice(0, 3);
    if (isSimplified(bottomPath)) {
        const move = bottomPath[0];
        if (move[0] === 'M') {
            path.push(bottomPath[2]);
            path.push(bottomPath[1]);
            path.push(['L', move[1], move[2]]);
        }
    }
    else {
        const move = bottomPath[0], curve1 = bottomPath[1], curve2 = bottomPath[2];
        if (move[0] === 'M' && curve1[0] === 'C' && curve2[0] === 'C') {
            path.push(['L', curve2[5], curve2[6]]);
            path.push([
                'C',
                curve2[3],
                curve2[4],
                curve2[1],
                curve2[2],
                curve1[5],
                curve1[6]
            ]);
            path.push([
                'C',
                curve1[3],
                curve1[4],
                curve1[1],
                curve1[2],
                move[1],
                move[2]
            ]);
        }
    }
    path.push(['Z']);
    return path;
}
/* *
 *
 *  Default Export
 *
 * */
const CylinderComposition = {
    compose
};
/* harmony default export */ const Cylinder_CylinderComposition = (CylinderComposition);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/Cylinder/CylinderPoint.js
/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { column: { prototype: { pointClass: ColumnPoint } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { extend: CylinderPoint_extend } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
class CylinderPoint extends ColumnPoint {
}
CylinderPoint_extend(CylinderPoint.prototype, {
    shapeType: 'cylinder'
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Cylinder_CylinderPoint = (CylinderPoint);

;// ./code/es-modules/Series/Cylinder/CylinderSeriesDefaults.js
/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Kacper Madej
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
 * A cylinder graph is a variation of a 3d column graph. The cylinder graph
 * features cylindrical points.
 *
 * @sample {highcharts} highcharts/demo/cylinder/
 *         Cylinder graph
 *
 * @extends      plotOptions.column
 * @since        7.0.0
 * @product      highcharts
 * @excluding    allAreas, boostThreshold, colorAxis, compare, compareBase,
 *               dragDrop, boostBlending
 * @requires     modules/cylinder
 * @optionparent plotOptions.cylinder
 */
const CylinderSeriesDefaults = {};
/**
 * A `cylinder` series. If the [type](#series.cylinder.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.cylinder
 * @since     7.0.0
 * @product   highcharts
 * @excluding allAreas, boostThreshold, colorAxis, compare, compareBase,
 *            boostBlending
 * @requires  modules/cylinder
 * @apioption series.cylinder
 */
/**
 * An array of data points for the series. For the `cylinder` series type,
 * points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond to
 *    `x,y`. If the first value is a string, it is applied as the name of the
 *    point, and the `x` value is inferred.
 *    ```js
 *    data: [
 *        [0, 0],
 *        [1, 8],
 *        [2, 9]
 *    ]
 *    ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.cylinder.turboThreshold), this option is not
 *    available.
 *
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 2,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        y: 4,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
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
 * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
 * @extends   series.column.data
 * @product   highcharts highstock
 * @apioption series.cylinder.data
 */
''; // Detaches doclets above
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Cylinder_CylinderSeriesDefaults = (CylinderSeriesDefaults);

;// ./code/es-modules/Series/Cylinder/CylinderSeries.js
/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { column: ColumnSeries } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;

const { extend: CylinderSeries_extend, merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The cylinder series type.
 *
 * @requires highcharts-3d
 * @requires modules/cylinder
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.cylinder
 *
 * @augments Highcharts.Series
 */
class CylinderSeries extends ColumnSeries {
}
/* *
 *
 *  Static Properties
 *
 * */
CylinderSeries.compose = Cylinder_CylinderComposition.compose;
CylinderSeries.defaultOptions = merge(ColumnSeries.defaultOptions, Cylinder_CylinderSeriesDefaults);
CylinderSeries_extend(CylinderSeries.prototype, {
    pointClass: Cylinder_CylinderPoint
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('cylinder', CylinderSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Cylinder_CylinderSeries = (CylinderSeries);

;// ./code/es-modules/masters/modules/cylinder.src.js





Cylinder_CylinderSeries.compose(highcharts_RendererRegistry_commonjs_highcharts_RendererRegistry_commonjs2_highcharts_RendererRegistry_root_Highcharts_RendererRegistry_default().getRendererType());
/* harmony default export */ const cylinder_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});