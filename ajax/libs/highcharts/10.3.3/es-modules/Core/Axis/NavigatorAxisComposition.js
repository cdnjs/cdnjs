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
var isTouchDevice = H.isTouchDevice;
import U from '../Utilities.js';
var addEvent = U.addEvent, correctFloat = U.correctFloat, defined = U.defined, isNumber = U.isNumber, pick = U.pick;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onAxisInit() {
    var axis = this;
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
    var axis = this, chart = axis.chart, chartOptions = chart.options, navigator = chartOptions.navigator, navigatorAxis = axis.navigatorAxis, pinchType = chartOptions.chart.zooming.pinchType, rangeSelector = chartOptions.rangeSelector, zoomType = chartOptions.chart.zooming.type;
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
            var previousZoom = navigatorAxis.previousZoom;
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
var NavigatorAxisAdditions = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    function NavigatorAxisAdditions(axis) {
        this.axis = axis;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    NavigatorAxisAdditions.compose = function (AxisClass) {
        if (composedClasses.indexOf(AxisClass) === -1) {
            composedClasses.push(AxisClass);
            AxisClass.keepProps.push('navigatorAxis');
            addEvent(AxisClass, 'init', onAxisInit);
            addEvent(AxisClass, 'zoom', onAxisZoom);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    NavigatorAxisAdditions.prototype.destroy = function () {
        this.axis = void 0;
    };
    /**
     * Add logic to normalize the zoomed range in order to preserve the pressed
     * state of range selector buttons
     *
     * @private
     * @function Highcharts.Axis#toFixedRange
     */
    NavigatorAxisAdditions.prototype.toFixedRange = function (pxMin, pxMax, fixedMin, fixedMax) {
        var axis = this.axis, chart = axis.chart;
        var newMin = pick(fixedMin, axis.translate(pxMin, true, !axis.horiz)), newMax = pick(fixedMax, axis.translate(pxMax, true, !axis.horiz));
        var fixedRange = chart && chart.fixedRange, halfPointRange = (axis.pointRange || 0) / 2, changeRatio = fixedRange && (newMax - newMin) / fixedRange;
        // Add/remove half point range to/from the extremes (#1172)
        if (!defined(fixedMin)) {
            newMin = correctFloat(newMin + halfPointRange);
        }
        if (!defined(fixedMax)) {
            newMax = correctFloat(newMax - halfPointRange);
        }
        // If the difference between the fixed range and the actual requested
        // range is too great, the user is dragging across an ordinal gap, and
        // we need to release the range selector button.
        if (changeRatio > 0.7 && changeRatio < 1.3) {
            if (fixedMax) {
                newMin = newMax - fixedRange;
            }
            else {
                newMax = newMin + fixedRange;
            }
        }
        if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
            newMin = newMax = void 0;
        }
        return {
            min: newMin,
            max: newMax
        };
    };
    return NavigatorAxisAdditions;
}());
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorAxisAdditions;
