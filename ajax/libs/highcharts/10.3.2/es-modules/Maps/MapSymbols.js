/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SVGRenderer from '../Core/Renderer/SVG/SVGRenderer.js';
var symbols = SVGRenderer.prototype.symbols;
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable require-jsdoc, valid-jsdoc */
function bottomButton(x, y, w, h, options) {
    var r = (options && options.r) || 0;
    return selectiveRoundedRect(x - 1, y - 1, w, h, 0, 0, r, r);
}
/**
 * Create symbols for the zoom buttons
 * @private
 */
function selectiveRoundedRect(x, y, w, h, rTopLeft, rTopRight, rBottomRight, rBottomLeft) {
    return [
        ['M', x + rTopLeft, y],
        // top side
        ['L', x + w - rTopRight, y],
        // top right corner
        [
            'C',
            x + w - rTopRight / 2,
            y,
            x + w,
            y + rTopRight / 2,
            x + w,
            y + rTopRight
        ],
        // right side
        ['L', x + w, y + h - rBottomRight],
        // bottom right corner
        [
            'C', x + w, y + h - rBottomRight / 2,
            x + w - rBottomRight / 2, y + h,
            x + w - rBottomRight, y + h
        ],
        // bottom side
        ['L', x + rBottomLeft, y + h],
        // bottom left corner
        [
            'C',
            x + rBottomLeft / 2,
            y + h,
            x,
            y + h - rBottomLeft / 2,
            x,
            y + h - rBottomLeft
        ],
        // left side
        ['L', x, y + rTopLeft],
        // top left corner
        ['C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y],
        ['Z']
    ];
}
function topButton(x, y, w, h, options) {
    var r = (options && options.r) || 0;
    return selectiveRoundedRect(x - 1, y - 1, w, h, r, r, 0, 0);
}
symbols.bottombutton = bottomButton;
symbols.topbutton = topButton;
/* *
 *
 *  Default Export
 *
 * */
export default symbols;
