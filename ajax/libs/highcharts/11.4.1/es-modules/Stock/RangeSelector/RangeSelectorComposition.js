/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
const { defaultOptions } = D;
import H from '../../Core/Globals.js';
const { composed } = H;
import RangeSelectorDefaults from './RangeSelectorDefaults.js';
import U from '../../Core/Utilities.js';
const { addEvent, defined, extend, find, isNumber, merge, pick, pushUnique } = U;
/* *
 *
 *  Constants
 *
 * */
const chartDestroyEvents = [];
/* *
 *
 *  Variables
 *
 * */
let RangeSelectorConstructor;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get the axis min value based on the range option and the current max. For
 * stock charts this is extended via the {@link RangeSelector} so that if the
 * selected range is a multiple of months or years, it is compensated for
 * various month lengths.
 *
 * @private
 * @function Highcharts.Axis#minFromRange
 * @return {number|undefined}
 *         The new minimum value.
 */
function axisMinFromRange() {
    const rangeOptions = this.range, type = rangeOptions.type, max = this.max, time = this.chart.time, 
    // Get the true range from a start date
    getTrueRange = function (base, count) {
        const timeName = type === 'year' ?
            'FullYear' : 'Month';
        const date = new time.Date(base);
        const basePeriod = time.get(timeName, date);
        time.set(timeName, date, basePeriod + count);
        if (basePeriod === time.get(timeName, date)) {
            time.set('Date', date, 0); // #6537
        }
        return date.getTime() - base;
    };
    let min, range;
    if (isNumber(rangeOptions)) {
        min = max - rangeOptions;
        range = rangeOptions;
    }
    else if (rangeOptions) {
        min = max + getTrueRange(max, -(rangeOptions.count || 1));
        // Let the fixedRange reflect initial settings (#5930)
        if (this.chart) {
            this.chart.setFixedRange(max - min);
        }
    }
    const dataMin = pick(this.dataMin, Number.MIN_VALUE);
    if (!isNumber(min)) {
        min = dataMin;
    }
    if (min <= dataMin) {
        min = dataMin;
        if (typeof range === 'undefined') { // #4501
            range = getTrueRange(min, rangeOptions.count);
        }
        this.newMax = Math.min(min + range, pick(this.dataMax, Number.MAX_VALUE));
    }
    if (!isNumber(max)) {
        min = void 0;
    }
    else if (!isNumber(rangeOptions) &&
        rangeOptions &&
        rangeOptions._offsetMin) {
        min += rangeOptions._offsetMin;
    }
    return min;
}
/**
 * @private
 */
function compose(AxisClass, ChartClass, RangeSelectorClass) {
    RangeSelectorConstructor = RangeSelectorClass;
    if (pushUnique(composed, 'RangeSelector')) {
        const chartProto = ChartClass.prototype;
        AxisClass.prototype.minFromRange = axisMinFromRange;
        addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
        addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
        addEvent(ChartClass, 'destroy', onChartDestroy);
        addEvent(ChartClass, 'getMargins', onChartGetMargins);
        addEvent(ChartClass, 'render', onChartRender);
        addEvent(ChartClass, 'update', onChartUpdate);
        chartProto.callbacks.push(onChartCallback);
        extend(defaultOptions, { rangeSelector: RangeSelectorDefaults.rangeSelector });
        extend(defaultOptions.lang, RangeSelectorDefaults.lang);
    }
}
/**
 * Initialize rangeselector for stock charts
 * @private
 */
function onChartAfterGetContainer() {
    if (this.options.rangeSelector &&
        this.options.rangeSelector.enabled) {
        this.rangeSelector = new RangeSelectorConstructor(this);
    }
}
/**
 * @private
 */
function onChartBeforeRender() {
    const chart = this, axes = chart.axes, rangeSelector = chart.rangeSelector;
    if (rangeSelector) {
        if (isNumber(rangeSelector.deferredYTDClick)) {
            rangeSelector.clickButton(rangeSelector.deferredYTDClick);
            delete rangeSelector.deferredYTDClick;
        }
        axes.forEach((axis) => {
            axis.updateNames();
            axis.setScale();
        });
        chart.getAxisMargins();
        rangeSelector.render();
        const verticalAlign = rangeSelector.options.verticalAlign;
        if (!rangeSelector.options.floating) {
            if (verticalAlign === 'bottom') {
                this.extraBottomMargin = true;
            }
            else if (verticalAlign !== 'middle') {
                this.extraTopMargin = true;
            }
        }
    }
}
/**
 * @private
 */
function onChartCallback(chart) {
    let extremes, legend, alignTo, verticalAlign;
    const rangeSelector = chart.rangeSelector, redraw = () => {
        if (rangeSelector) {
            extremes = chart.xAxis[0].getExtremes();
            legend = chart.legend;
            verticalAlign = (rangeSelector &&
                rangeSelector.options.verticalAlign);
            if (isNumber(extremes.min)) {
                rangeSelector.render(extremes.min, extremes.max);
            }
            // Re-align the legend so that it's below the rangeselector
            if (legend.display &&
                verticalAlign === 'top' &&
                verticalAlign === legend.options.verticalAlign) {
                // Create a new alignment box for the legend.
                alignTo = merge(chart.spacingBox);
                if (legend.options.layout === 'vertical') {
                    alignTo.y = chart.plotTop;
                }
                else {
                    alignTo.y += rangeSelector.getHeight();
                }
                legend.group.placed = false; // Don't animate the alignment.
                legend.align(alignTo);
            }
        }
    };
    if (rangeSelector) {
        const events = find(chartDestroyEvents, (e) => e[0] === chart);
        if (!events) {
            chartDestroyEvents.push([chart, [
                    // Redraw the scroller on setExtremes
                    addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                        if (rangeSelector) {
                            rangeSelector.render(e.min, e.max);
                        }
                    }),
                    // Redraw the scroller chart resize
                    addEvent(chart, 'redraw', redraw)
                ]]);
        }
        // Do it now
        redraw();
    }
}
/**
 * Remove resize/afterSetExtremes at chart destroy.
 * @private
 */
function onChartDestroy() {
    for (let i = 0, iEnd = chartDestroyEvents.length; i < iEnd; ++i) {
        const events = chartDestroyEvents[i];
        if (events[0] === this) {
            events[1].forEach((unbind) => unbind());
            chartDestroyEvents.splice(i, 1);
            return;
        }
    }
}
/**
 *
 */
function onChartGetMargins() {
    const rangeSelector = this.rangeSelector;
    if (rangeSelector) {
        const rangeSelectorHeight = rangeSelector.getHeight();
        if (this.extraTopMargin) {
            this.plotTop += rangeSelectorHeight;
        }
        if (this.extraBottomMargin) {
            this.marginBottom += rangeSelectorHeight;
        }
    }
}
/**
 * @private
 */
function onChartRender() {
    const chart = this, rangeSelector = chart.rangeSelector;
    if (rangeSelector && !rangeSelector.options.floating) {
        rangeSelector.render();
        const verticalAlign = rangeSelector.options.verticalAlign;
        if (verticalAlign === 'bottom') {
            this.extraBottomMargin = true;
        }
        else if (verticalAlign !== 'middle') {
            this.extraTopMargin = true;
        }
    }
}
/**
 * @private
 */
function onChartUpdate(e) {
    const chart = this, options = e.options, optionsRangeSelector = options.rangeSelector, extraBottomMarginWas = this.extraBottomMargin, extraTopMarginWas = this.extraTopMargin;
    let rangeSelector = chart.rangeSelector;
    if (optionsRangeSelector &&
        optionsRangeSelector.enabled &&
        !defined(rangeSelector) &&
        this.options.rangeSelector) {
        this.options.rangeSelector.enabled = true;
        this.rangeSelector = rangeSelector = new RangeSelectorConstructor(this);
    }
    this.extraBottomMargin = false;
    this.extraTopMargin = false;
    if (rangeSelector) {
        onChartCallback(this);
        const verticalAlign = (optionsRangeSelector &&
            optionsRangeSelector.verticalAlign) || (rangeSelector.options && rangeSelector.options.verticalAlign);
        if (!rangeSelector.options.floating) {
            if (verticalAlign === 'bottom') {
                this.extraBottomMargin = true;
            }
            else if (verticalAlign !== 'middle') {
                this.extraTopMargin = true;
            }
        }
        if (this.extraBottomMargin !== extraBottomMarginWas ||
            this.extraTopMargin !== extraTopMarginWas) {
            this.isDirtyBox = true;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const RangeSelectorComposition = {
    compose
};
export default RangeSelectorComposition;
