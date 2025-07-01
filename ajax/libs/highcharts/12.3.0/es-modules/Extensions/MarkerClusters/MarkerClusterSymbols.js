/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
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
/**
 * Cluster symbol.
 * @private
 */
function cluster(x, y, width, height) {
    const w = width / 2, h = height / 2, outerWidth = 1, space = 1, inner = symbols.arc(x + w, y + h, w - space * 4, h - space * 4, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        open: false
    }), outer1 = symbols.arc(x + w, y + h, w - space * 3, h - space * 3, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        innerR: w - outerWidth * 2,
        open: false
    }), outer2 = symbols.arc(x + w, y + h, w - space, h - space, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        innerR: w,
        open: false
    });
    return outer2.concat(outer1, inner);
}
/**
 * @private
 */
function compose(SVGRendererClass) {
    symbols = SVGRendererClass.prototype.symbols;
    symbols.cluster = cluster;
}
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusterSymbols = {
    compose
};
export default MarkerClusterSymbols;
