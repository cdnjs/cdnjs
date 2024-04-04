/* *
 *
 *  Plugin for resizing axes / panes in a chart.
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AxisResizer from './AxisResizer.js';
import D from '../../Core/Defaults.js';
const { defaultOptions } = D;
import U from '../../Core/Utilities.js';
const { addEvent, merge, wrap } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(AxisClass, PointerClass) {
    if (!AxisClass.keepProps.includes('resizer')) {
        merge(true, defaultOptions.yAxis, AxisResizer.resizerOptions);
        // Keep resizer reference on axis update
        AxisClass.keepProps.push('resizer');
        addEvent(AxisClass, 'afterRender', onAxisAfterRender);
        addEvent(AxisClass, 'destroy', onAxisDestroy);
        wrap(PointerClass.prototype, 'runPointActions', wrapPointerRunPointActions);
        wrap(PointerClass.prototype, 'drag', wrapPointerDrag);
    }
}
/**
 * Add new AxisResizer, update or remove it
 * @private
 */
function onAxisAfterRender() {
    const axis = this, resizer = axis.resizer, resizerOptions = axis.options.resize;
    if (resizerOptions) {
        const enabled = resizerOptions.enabled !== false;
        if (resizer) {
            // Resizer present and enabled
            if (enabled) {
                // Update options
                resizer.init(axis, true);
                // Resizer present, but disabled
            }
            else {
                // Destroy the resizer
                resizer.destroy();
            }
        }
        else {
            // Resizer not present and enabled
            if (enabled) {
                // Add new resizer
                axis.resizer = new AxisResizer(axis);
            }
            // Resizer not present and disabled, so do nothing
        }
    }
}
/**
 * Clear resizer on axis remove.
 * @private
 */
function onAxisDestroy(e) {
    const axis = this;
    if (!e.keepEvents && axis.resizer) {
        axis.resizer.destroy();
    }
}
/**
 * Prevent default drag action detection while dragging a control line of
 * AxisResizer. (#7563)
 * @private
 */
function wrapPointerDrag(proceed) {
    const pointer = this;
    if (!pointer.chart.activeResizer) {
        proceed.apply(pointer, [].slice.call(arguments, 1));
    }
}
/**
 * Prevent any hover effects while dragging a control line of AxisResizer.
 * @private
 */
function wrapPointerRunPointActions(proceed) {
    const pointer = this;
    if (!pointer.chart.activeResizer) {
        proceed.apply(pointer, [].slice.call(arguments, 1));
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DragPanes = {
    compose
};
export default DragPanes;
