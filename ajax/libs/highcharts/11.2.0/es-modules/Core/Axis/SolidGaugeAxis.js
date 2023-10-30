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
import ColorAxisLike from './Color/ColorAxisLike.js';
import U from '../Utilities.js';
const { extend } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function init(axis) {
    extend(axis, ColorAxisLike);
}
/* *
 *
 *  Default export
 *
 * */
const SolidGaugeAxis = {
    init
};
export default SolidGaugeAxis;
