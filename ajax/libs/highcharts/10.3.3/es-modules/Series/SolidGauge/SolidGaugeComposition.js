/* *
 *
 *  Solid angular gauge module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SVGRenderer from '../../Core/Renderer/SVG/SVGRenderer.js';
var _a = SVGRenderer.prototype, symbols = _a.symbols, arc = _a.symbols.arc;
/**
 * Additional options, depending on the actual symbol drawn.
 *
 * @interface Highcharts.SymbolOptionsObject
 */ /**
* Whether to draw rounded edges.
* @name Highcharts.SymbolOptionsObject#rounded
* @type {boolean|undefined}
*/
/**
 * Symbol definition of an arc with round edges.
 *
 * @private
 * @function Highcharts.Renderer#symbols.arc
 *
 * @param {number} x
 *        The X coordinate for the top left position.
 *
 * @param {number} y
 *        The Y coordinate for the top left position.
 *
 * @param {number} w
 *        The pixel width.
 *
 * @param {number} h
 *        The pixel height.
 *
 * @param {Highcharts.SymbolOptionsObject} [options]
 *        Additional options, depending on the actual symbol drawn.
 *
 * @return {Highcharts.SVGPathArray}
 *         Path of the created arc.
 */
symbols.arc = function (x, y, w, h, options) {
    var path = arc(x, y, w, h, options);
    if (options && options.rounded) {
        var r = options.r || w, smallR = (r - (options.innerR || 0)) / 2, outerArcStart = path[0], innerArcStart = path[2];
        if (outerArcStart[0] === 'M' && innerArcStart[0] === 'L') {
            var x1 = outerArcStart[1], y1 = outerArcStart[2], x2 = innerArcStart[1], y2 = innerArcStart[2], roundStart = [
                'A', smallR, smallR, 0, 1, 1, x1, y1
            ], roundEnd = ['A', smallR, smallR, 0, 1, 1, x2, y2];
            // Replace the line segment and the last close segment
            path[2] = roundEnd;
            path[4] = roundStart;
        }
    }
    return path;
};
