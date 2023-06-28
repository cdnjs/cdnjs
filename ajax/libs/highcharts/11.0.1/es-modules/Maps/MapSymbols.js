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
const { prototype: { symbols } } = SVGRenderer;
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable require-jsdoc, valid-jsdoc */
function bottomButton(x, y, w, h, options) {
    if (options) {
        const r = (options === null || options === void 0 ? void 0 : options.r) || 0;
        options.brBoxY = y - r;
        options.brBoxHeight = h + r;
    }
    return symbols.roundedRect(x, y, w, h, options);
}
function topButton(x, y, w, h, options) {
    if (options) {
        const r = (options === null || options === void 0 ? void 0 : options.r) || 0;
        options.brBoxHeight = h + r;
    }
    return symbols.roundedRect(x, y, w, h, options);
}
symbols.bottombutton = bottomButton;
symbols.topbutton = topButton;
/* *
 *
 *  Default Export
 *
 * */
export default symbols;
