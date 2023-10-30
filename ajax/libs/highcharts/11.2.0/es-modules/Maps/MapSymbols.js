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
import U from '../Core/Utilities.js';
const { pushUnique } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
/* *
 *
 *  Variables
 *
 * */
let symbols;
/* *
 *
 *  Functions
 *
 * */
function bottomButton(x, y, w, h, options) {
    if (options) {
        const r = options?.r || 0;
        options.brBoxY = y - r;
        options.brBoxHeight = h + r;
    }
    return symbols.roundedRect(x, y, w, h, options);
}
function compose(SVGRendererClass) {
    if (pushUnique(composedMembers, SVGRendererClass)) {
        symbols = SVGRendererClass.prototype.symbols;
        symbols.bottombutton = bottomButton;
        symbols.topbutton = topButton;
    }
}
function topButton(x, y, w, h, options) {
    if (options) {
        const r = options?.r || 0;
        options.brBoxHeight = h + r;
    }
    return symbols.roundedRect(x, y, w, h, options);
}
/* *
 *
 *  Default Export
 *
 * */
const MapSymbols = {
    compose
};
export default MapSymbols;
