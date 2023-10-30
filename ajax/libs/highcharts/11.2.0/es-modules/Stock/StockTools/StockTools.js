/**
 *
 *  Events generator for Stock tools
 *
 *  (c) 2009-2021 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
const { setOptions } = D;
import NBU from '../../Extensions/Annotations/NavigationBindingsUtilities.js';
const { getAssignedAxis } = NBU;
import StockToolsBindings from './StockToolsBindings.js';
import StockToolsDefaults from './StockToolsDefaults.js';
import STU from './StockToolsUtilities.js';
const { isNotNavigatorYAxis, isPriceIndicatorEnabled } = STU;
import U from '../../Core/Utilities.js';
const { correctFloat, defined, isNumber, pick } = U;
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
function compose(NavigationBindingsClass) {
    if (U.pushUnique(composedMembers, NavigationBindingsClass)) {
        const navigationProto = NavigationBindingsClass.prototype;
        // Extends NavigationBindings to support indicators and resizers:
        navigationProto.getYAxisPositions = navigationGetYAxisPositions;
        navigationProto.getYAxisResizers = navigationGetYAxisResizers;
        navigationProto.recalculateYAxisPositions =
            navigationRecalculateYAxisPositions;
        navigationProto.resizeYAxes = navigationResizeYAxes;
        navigationProto.utils = {
            indicatorsWithAxes: STU.indicatorsWithAxes,
            indicatorsWithVolume: STU.indicatorsWithVolume,
            getAssignedAxis,
            isPriceIndicatorEnabled,
            manageIndicators: STU.manageIndicators
        };
    }
    if (U.pushUnique(composedMembers, setOptions)) {
        setOptions(StockToolsDefaults);
        setOptions({
            navigation: {
                bindings: StockToolsBindings
            }
        });
    }
}
/**
 * Get current positions for all yAxes. If new axis does not have position,
 * returned is default height and last available top place.
 *
 * @private
 * @function Highcharts.NavigationBindings#getYAxisPositions
 *
 * @param {Array<Highcharts.Axis>} yAxes
 *        Array of yAxes available in the chart.
 *
 * @param {number} plotHeight
 *        Available height in the chart.
 *
 * @param {number} defaultHeight
 *        Default height in percents.
 *
 * @param {Highcharts.AxisPositions} removedYAxisProps
 *        Height and top value of the removed yAxis in percents.
 *
 * @return {Highcharts.YAxisPositions}
 *         An object containing an array of calculated positions
 *         in percentages. Format: `{top: Number, height: Number}`
 *         and maximum value of top + height of axes.
 */
function navigationGetYAxisPositions(yAxes, plotHeight, defaultHeight, removedYAxisProps) {
    let allAxesHeight = 0, previousAxisHeight, removedHeight, removedTop;
    /** @private */
    function isPercentage(prop) {
        return defined(prop) && !isNumber(prop) && prop.match('%');
    }
    if (removedYAxisProps) {
        removedTop = correctFloat((parseFloat(removedYAxisProps.top) / 100));
        removedHeight = correctFloat((parseFloat(removedYAxisProps.height) / 100));
    }
    const positions = yAxes.map((yAxis, index) => {
        let height = correctFloat(isPercentage(yAxis.options.height) ?
            parseFloat(yAxis.options.height) / 100 :
            yAxis.height / plotHeight), top = correctFloat(isPercentage(yAxis.options.top) ?
            parseFloat(yAxis.options.top) / 100 :
            (yAxis.top - yAxis.chart.plotTop) / plotHeight);
        if (!removedHeight) {
            // New axis' height is NaN so we can check if
            // the axis is newly created this way
            if (!isNumber(height)) {
                // Check if the previous axis is the
                // indicator axis (every indicator inherits from sma)
                height = yAxes[index - 1].series
                    .every((s) => s.is('sma')) ?
                    previousAxisHeight : defaultHeight / 100;
            }
            if (!isNumber(top)) {
                top = allAxesHeight;
            }
            previousAxisHeight = height;
            allAxesHeight = correctFloat(Math.max(allAxesHeight, (top || 0) + (height || 0)));
        }
        else {
            // Move all axes which were below the removed axis up.
            if (top > removedTop) {
                top -= removedHeight;
            }
            allAxesHeight = Math.max(allAxesHeight, (top || 0) + (height || 0));
        }
        return {
            height: height * 100,
            top: top * 100
        };
    });
    return { positions, allAxesHeight };
}
/**
 * Get current resize options for each yAxis. Note that each resize is
 * linked to the next axis, except the last one which shouldn't affect
 * axes in the navigator. Because indicator can be removed with it's yAxis
 * in the middle of yAxis array, we need to bind closest yAxes back.
 *
 * @private
 * @function Highcharts.NavigationBindings#getYAxisResizers
 *
 * @param {Array<Highcharts.Axis>} yAxes
 *        Array of yAxes available in the chart
 *
 * @return {Array<object>}
 *         An array of resizer options.
 *         Format: `{enabled: Boolean, controlledAxis: { next: [String]}}`
 */
function navigationGetYAxisResizers(yAxes) {
    const resizers = [];
    yAxes.forEach(function (_yAxis, index) {
        const nextYAxis = yAxes[index + 1];
        // We have next axis, bind them:
        if (nextYAxis) {
            resizers[index] = {
                enabled: true,
                controlledAxis: {
                    next: [
                        pick(nextYAxis.options.id, nextYAxis.index)
                    ]
                }
            };
        }
        else {
            // Remove binding:
            resizers[index] = {
                enabled: false
            };
        }
    });
    return resizers;
}
/**
 * Utility to modify calculated positions according to the remaining/needed
 * space. Later, these positions are used in `yAxis.update({ top, height })`
 *
 * @private
 * @function Highcharts.NavigationBindings#recalculateYAxisPositions
 * @param {Array<Highcharts.Dictionary<number>>} positions
 * Default positions of all yAxes.
 * @param {number} changedSpace
 * How much space should be added or removed.
 * @param {boolean} modifyHeight
 * Update only `top` or both `top` and `height`.
 * @param {number} adder
 * `-1` or `1`, to determine whether we should add or remove space.
 *
 * @return {Array<object>}
 *         Modified positions,
 */
function navigationRecalculateYAxisPositions(positions, changedSpace, modifyHeight, adder) {
    positions.forEach(function (position, index) {
        const prevPosition = positions[index - 1];
        position.top = !prevPosition ? 0 :
            correctFloat(prevPosition.height + prevPosition.top);
        if (modifyHeight) {
            position.height = correctFloat(position.height + adder * changedSpace);
        }
    });
    return positions;
}
/**
 * Resize all yAxes (except navigator) to fit the plotting height. Method
 * checks if new axis is added, if the new axis will fit under previous
 * axes it is placed there. If not, current plot area is scaled
 * to make room for new axis.
 *
 * If axis is removed, the current plot area streaches to fit into 100%
 * of the plot area.
 *
 * @private
 */
function navigationResizeYAxes(removedYAxisProps) {
    // The height of the new axis before rescalling. In %, but as a number.
    const defaultHeight = 20;
    const chart = this.chart, 
    // Only non-navigator axes
    yAxes = chart.yAxis.filter(isNotNavigatorYAxis), plotHeight = chart.plotHeight, 
    // Gather current heights (in %)
    { positions, allAxesHeight } = this.getYAxisPositions(yAxes, plotHeight, defaultHeight, removedYAxisProps), resizers = this.getYAxisResizers(yAxes);
    // check if the axis is being either added or removed and
    // if the new indicator axis will fit under existing axes.
    // if so, there is no need to scale them.
    if (!removedYAxisProps &&
        allAxesHeight <= correctFloat(0.8 + defaultHeight / 100)) {
        positions[positions.length - 1] = {
            height: defaultHeight,
            top: correctFloat(allAxesHeight * 100 - defaultHeight)
        };
    }
    else {
        positions.forEach(function (position) {
            position.height = (position.height / (allAxesHeight * 100)) * 100;
            position.top = (position.top / (allAxesHeight * 100)) * 100;
        });
    }
    positions.forEach(function (position, index) {
        yAxes[index].update({
            height: position.height + '%',
            top: position.top + '%',
            resize: resizers[index],
            offset: 0
        }, false);
    });
}
/* *
 *
 *  Default Export
 *
 * */
const StockTools = {
    compose
};
export default StockTools;
