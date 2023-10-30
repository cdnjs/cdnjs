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
import D from '../../Core/Defaults.js';
const { defaultOptions, setOptions } = D;
import H from '../../Core/Globals.js';
const { isTouchDevice } = H;
import NavigatorAxisAdditions from '../../Core/Axis/NavigatorAxisComposition.js';
import NavigatorDefaults from './NavigatorDefaults.js';
import NavigatorSymbols from './NavigatorSymbols.js';
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
const { getRendererType } = RendererRegistry;
import U from '../../Core/Utilities.js';
const { addEvent, extend, merge, pick } = U;
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
let NavigatorConstructor;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(AxisClass, ChartClass, NavigatorClass, SeriesClass) {
    NavigatorAxisAdditions.compose(AxisClass);
    NavigatorConstructor = NavigatorClass;
    if (U.pushUnique(composedMembers, ChartClass)) {
        const chartProto = ChartClass.prototype;
        chartProto.callbacks.push(onChartCallback);
        addEvent(ChartClass, 'afterAddSeries', onChartAfterAddSeries);
        addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
        addEvent(ChartClass, 'afterUpdate', onChartAfterUpdate);
        addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
        addEvent(ChartClass, 'beforeShowResetZoom', onChartBeforeShowResetZoom);
        addEvent(ChartClass, 'update', onChartUpdate);
    }
    if (U.pushUnique(composedMembers, SeriesClass)) {
        addEvent(SeriesClass, 'afterUpdate', onSeriesAfterUpdate);
    }
    if (U.pushUnique(composedMembers, getRendererType)) {
        extend(getRendererType().prototype.symbols, NavigatorSymbols);
    }
    if (U.pushUnique(composedMembers, setOptions)) {
        extend(defaultOptions, { navigator: NavigatorDefaults });
    }
}
/**
 * Handle adding new series.
 * @private
 */
function onChartAfterAddSeries() {
    if (this.navigator) {
        // Recompute which series should be shown in navigator, and add them
        this.navigator.setBaseSeries(null, false);
    }
}
/**
 * For stock charts, extend the Chart.setChartSize method so that we can set the
 * final top position of the navigator once the height of the chart, including
 * the legend, is determined. #367. We can't use Chart.getMargins, because
 * labels offsets are not calculated yet.
 * @private
 */
function onChartAfterSetChartSize() {
    const legend = this.legend, navigator = this.navigator;
    let legendOptions, xAxis, yAxis;
    if (navigator) {
        legendOptions = legend && legend.options;
        xAxis = navigator.xAxis;
        yAxis = navigator.yAxis;
        const { scrollbarHeight, scrollButtonSize } = navigator;
        // Compute the top position
        if (this.inverted) {
            navigator.left = navigator.opposite ?
                this.chartWidth - scrollbarHeight -
                    navigator.height :
                this.spacing[3] + scrollbarHeight;
            navigator.top = this.plotTop + scrollButtonSize;
        }
        else {
            navigator.left = pick(xAxis.left, this.plotLeft + scrollButtonSize);
            navigator.top = navigator.navigatorOptions.top ||
                this.chartHeight -
                    navigator.height -
                    scrollbarHeight -
                    (this.scrollbar?.options.margin || 0) -
                    this.spacing[2] -
                    (this.rangeSelector && this.extraBottomMargin ?
                        this.rangeSelector.getHeight() :
                        0) -
                    ((legendOptions &&
                        legendOptions.verticalAlign === 'bottom' &&
                        legendOptions.layout !== 'proximate' && // #13392
                        legendOptions.enabled &&
                        !legendOptions.floating) ?
                        legend.legendHeight +
                            pick(legendOptions.margin, 10) :
                        0) -
                    (this.titleOffset ? this.titleOffset[2] : 0);
        }
        if (xAxis && yAxis) { // false if navigator is disabled (#904)
            if (this.inverted) {
                xAxis.options.left = yAxis.options.left = navigator.left;
            }
            else {
                xAxis.options.top = yAxis.options.top = navigator.top;
            }
            xAxis.setAxisSize();
            yAxis.setAxisSize();
        }
    }
}
/**
 * Initialize navigator, if no scrolling exists yet.
 * @private
 */
function onChartAfterUpdate(event) {
    if (!this.navigator && !this.scroller &&
        (this.options.navigator.enabled ||
            this.options.scrollbar.enabled)) {
        this.scroller = this.navigator = new NavigatorConstructor(this);
        if (pick(event.redraw, true)) {
            this.redraw(event.animation); // #7067
        }
    }
}
/**
 * Initialize navigator for stock charts
 * @private
 */
function onChartBeforeRender() {
    const options = this.options;
    if (options.navigator.enabled ||
        options.scrollbar.enabled) {
        this.scroller = this.navigator = new NavigatorConstructor(this);
    }
}
/**
 * For Stock charts. For x only zooming, do not to create the zoom button
 * because X axis zooming is already allowed by the Navigator and Range
 * selector. (#9285)
 * @private
 */
function onChartBeforeShowResetZoom() {
    const chartOptions = this.options, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
    if (((navigator && navigator.enabled) ||
        (rangeSelector && rangeSelector.enabled)) &&
        ((!isTouchDevice &&
            this.zooming.type === 'x') ||
            (isTouchDevice && this.zooming.pinchType === 'x'))) {
        return false;
    }
}
/**
 * @private
 */
function onChartCallback(chart) {
    const navigator = chart.navigator;
    // Initialize the navigator
    if (navigator && chart.xAxis[0]) {
        const extremes = chart.xAxis[0].getExtremes();
        navigator.render(extremes.min, extremes.max);
    }
}
/**
 * Merge options, if no scrolling exists yet
 * @private
 */
function onChartUpdate(e) {
    const navigatorOptions = (e.options.navigator || {}), scrollbarOptions = (e.options.scrollbar || {});
    if (!this.navigator && !this.scroller &&
        (navigatorOptions.enabled || scrollbarOptions.enabled)) {
        merge(true, this.options.navigator, navigatorOptions);
        merge(true, this.options.scrollbar, scrollbarOptions);
        delete e.options.navigator;
        delete e.options.scrollbar;
    }
}
/**
 * Handle updating series
 * @private
 */
function onSeriesAfterUpdate() {
    if (this.chart.navigator && !this.options.isInternal) {
        this.chart.navigator.setBaseSeries(null, false);
    }
}
/* *
 *
 *  Default Export
 *
 * */
const NavigatorComposition = {
    compose
};
export default NavigatorComposition;
