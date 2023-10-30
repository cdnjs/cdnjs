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
/* *
 *
 *  Constants
 *
 * */
/**
 * Draw one of the handles on the side of the zoomed range in the navigator.
 * @private
 */
function navigatorHandle(_x, _y, width, height, options = {}) {
    const halfWidth = options.width ? options.width / 2 : width, markerPosition = Math.round(halfWidth / 3) + 0.5;
    height = options.height || height;
    return [
        ['M', -halfWidth - 1, 0.5],
        ['L', halfWidth, 0.5],
        ['L', halfWidth, height + 0.5],
        ['L', -halfWidth - 1, height + 0.5],
        ['L', -halfWidth - 1, 0.5],
        ['M', -markerPosition, 4],
        ['L', -markerPosition, height - 3],
        ['M', markerPosition - 1, 4],
        ['L', markerPosition - 1, height - 3]
    ];
}
/* *
 *
 *  Default Export
 *
 * */
const NavigatorSymbols = {
    'navigator-handle': navigatorHandle
};
export default NavigatorSymbols;
