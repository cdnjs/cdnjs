/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Extenstion for 3d axes
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../Utilities.js';
const { addEvent, extend, wrap } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(TickClass) {
    if (U.pushUnique(composedMembers, TickClass)) {
        addEvent(TickClass, 'afterGetLabelPosition', onTickAfterGetLabelPosition);
        wrap(TickClass.prototype, 'getMarkPath', wrapTickGetMarkPath);
    }
}
/**
 * @private
 */
function onTickAfterGetLabelPosition(e) {
    const axis3D = this.axis.axis3D;
    if (axis3D) {
        extend(e.pos, axis3D.fix3dPosition(e.pos));
    }
}
/**
 * @private
 */
function wrapTickGetMarkPath(proceed) {
    const axis3D = this.axis.axis3D, path = proceed.apply(this, [].slice.call(arguments, 1));
    if (axis3D) {
        const start = path[0];
        const end = path[1];
        if (start[0] === 'M' && end[0] === 'L') {
            const pArr = [
                axis3D.fix3dPosition({ x: start[1], y: start[2], z: 0 }),
                axis3D.fix3dPosition({ x: end[1], y: end[2], z: 0 })
            ];
            return this.axis.chart.renderer.toLineSegments(pArr);
        }
    }
    return path;
}
/* *
 *
 *  Default Export
 *
 * */
const Tick3DAdditions = {
    compose
};
export default Tick3DAdditions;
