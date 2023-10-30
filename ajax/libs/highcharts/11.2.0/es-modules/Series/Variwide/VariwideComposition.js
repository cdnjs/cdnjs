/* *
 *
 *  Highcharts variwide module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
const { addEvent, wrap } = U;
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
function compose(AxisClass, TickClass) {
    if (U.pushUnique(composedMembers, AxisClass)) {
        addEvent(AxisClass, 'afterDrawCrosshair', onAxisAfterDrawCrosshair);
        addEvent(AxisClass, 'afterRender', onAxisAfterRender);
    }
    if (U.pushUnique(composedMembers, TickClass)) {
        addEvent(TickClass, 'afterGetPosition', onTickAfterGetPosition);
        const tickProto = TickClass.prototype;
        tickProto.postTranslate = tickPostTranslate;
        wrap(tickProto, 'getLabelPosition', wrapTickGetLabelPosition);
    }
}
/**
 * Same width as the category (#8083)
 * @private
 */
function onAxisAfterDrawCrosshair(e) {
    if (this.variwide && this.cross) {
        this.cross.attr('stroke-width', (e.point && e.point.crosshairWidth));
    }
}
/**
 * On a vertical axis, apply anti-collision logic to the labels.
 * @private
 */
function onAxisAfterRender() {
    const axis = this;
    if (!this.horiz && this.variwide) {
        this.chart.labelCollectors.push(function () {
            return axis.tickPositions
                .filter((pos) => !!axis.ticks[pos].label)
                .map((pos, i) => {
                const label = axis.ticks[pos].label;
                label.labelrank = axis.zData[i];
                return label;
            });
        });
    }
}
/**
 * @private
 */
function onTickAfterGetPosition(e) {
    const axis = this.axis, xOrY = axis.horiz ? 'x' : 'y';
    if (axis.variwide) {
        this[xOrY + 'Orig'] = e.pos[xOrY];
        this.postTranslate(e.pos, xOrY, this.pos);
    }
}
/**
 * @private
 */
function tickPostTranslate(xy, xOrY, index) {
    const axis = this.axis;
    let pos = xy[xOrY] - axis.pos;
    if (!axis.horiz) {
        pos = axis.len - pos;
    }
    pos = axis.series[0].postTranslate(index, pos);
    if (!axis.horiz) {
        pos = axis.len - pos;
    }
    xy[xOrY] = axis.pos + pos;
}
/**
 * @private
 */
function wrapTickGetLabelPosition(proceed, _x, _y, _label, horiz, _labelOptions, _tickmarkOffset, _index) {
    const args = Array.prototype.slice.call(arguments, 1), xOrY = horiz ? 'x' : 'y';
    // Replace the x with the original x
    if (this.axis.variwide &&
        typeof this[xOrY + 'Orig'] === 'number') {
        args[horiz ? 0 : 1] = this[xOrY + 'Orig'];
    }
    const xy = proceed.apply(this, args);
    // Post-translate
    if (this.axis.variwide && this.axis.categories) {
        this.postTranslate(xy, xOrY, this.pos);
    }
    return xy;
}
/* *
 *
 *  Default Export
 *
 * */
const VariwideComposition = {
    compose
};
export default VariwideComposition;
