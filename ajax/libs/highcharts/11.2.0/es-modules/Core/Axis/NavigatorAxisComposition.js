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
import H from '../Globals.js';
const { isTouchDevice } = H;
import U from '../Utilities.js';
const { addEvent, correctFloat, defined, isNumber, pick } = U;
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
function onAxisInit() {
    const axis = this;
    if (!axis.navigatorAxis) {
        axis.navigatorAxis = new NavigatorAxisAdditions(axis);
    }
}
/**
 * For Stock charts, override selection zooming with some special features
 * because X axis zooming is already allowed by the Navigator and Range
 * selector.
 * @private
 */
function onAxisZoom(e) {
    const axis = this, chart = axis.chart, chartOptions = chart.options, navigator = chartOptions.navigator, navigatorAxis = axis.navigatorAxis, pinchType = chart.zooming.pinchType, rangeSelector = chartOptions.rangeSelector, zoomType = chart.zooming.type;
    if (axis.isXAxis && ((navigator && navigator.enabled) ||
        (rangeSelector && rangeSelector.enabled))) {
        // For y only zooming, ignore the X axis completely
        if (zoomType === 'y') {
            e.zoomed = false;
            // For xy zooming, record the state of the zoom before zoom
            // selection, then when the reset button is pressed, revert to
            // this state. This should apply only if the chart is
            // initialized with a range (#6612), otherwise zoom all the way
            // out.
        }
        else if (((!isTouchDevice && zoomType === 'xy') ||
            (isTouchDevice && pinchType === 'xy')) &&
            axis.options.range) {
            const previousZoom = navigatorAxis.previousZoom;
            if (defined(e.newMin)) {
                navigatorAxis.previousZoom = [axis.min, axis.max];
            }
            else if (previousZoom) {
                e.newMin = previousZoom[0];
                e.newMax = previousZoom[1];
                navigatorAxis.previousZoom = void 0;
            }
        }
    }
    if (typeof e.zoomed !== 'undefined') {
        e.preventDefault();
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class NavigatorAxisAdditions {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static compose(AxisClass) {
        if (U.pushUnique(composedMembers, AxisClass)) {
            AxisClass.keepProps.push('navigatorAxis');
            addEvent(AxisClass, 'init', onAxisInit);
            addEvent(AxisClass, 'zoom', onAxisZoom);
        }
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(axis) {
        this.axis = axis;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    destroy() {
        this.axis = void 0;
    }
    /**
     * Add logic to normalize the zoomed range in order to preserve the pressed
     * state of range selector buttons
     *
     * @private
     * @function Highcharts.Axis#toFixedRange
     */
    toFixedRange(pxMin, pxMax, fixedMin, fixedMax) {
        const axis = this.axis, chart = axis.chart;
        let newMin = pick(fixedMin, axis.translate(pxMin, true, !axis.horiz)), newMax = pick(fixedMax, axis.translate(pxMax, true, !axis.horiz));
        const fixedRange = chart && chart.fixedRange, halfPointRange = (axis.pointRange || 0) / 2;
        // Add/remove half point range to/from the extremes (#1172)
        if (!defined(fixedMin)) {
            newMin = correctFloat(newMin + halfPointRange);
        }
        if (!defined(fixedMax)) {
            newMax = correctFloat(newMax - halfPointRange);
        }
        // Make sure panning to the edges does not decrease the zoomed range
        if (fixedRange && axis.dataMin && axis.dataMax) {
            if (newMax >= axis.dataMax) {
                newMin = correctFloat(axis.dataMax - fixedRange);
            }
            if (newMin <= axis.dataMin) {
                newMax = correctFloat(axis.dataMin + fixedRange);
            }
        }
        if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
            newMin = newMax = void 0;
        }
        return {
            min: newMin,
            max: newMax
        };
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorAxisAdditions;
