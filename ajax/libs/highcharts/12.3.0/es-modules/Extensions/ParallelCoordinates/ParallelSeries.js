/* *
 *
 *  Parallel coordinates module
 *
 *  (c) 2010-2025 Pawel Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
const { composed } = H;
import T from '../../Core/Templating.js';
const { format } = T;
import U from '../../Core/Utilities.js';
const { addEvent, defined, erase, extend, insertItem, isArray, isNumber, pushUnique } = U;
/* *
 *
 *  Composition
 *
 * */
var ParallelSeries;
(function (ParallelSeries) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /** @private */
    function compose(SeriesClass) {
        if (pushUnique(composed, 'ParallelSeries')) {
            const CompoClass = SeriesClass;
            addEvent(CompoClass, 'afterTranslate', onSeriesAfterTranslate, { order: 1 });
            addEvent(CompoClass, 'bindAxes', onSeriesBindAxes);
            addEvent(CompoClass, 'destroy', onSeriesDestroy);
            addEvent(SeriesClass, 'afterGeneratePoints', onSeriesAfterGeneratePoints);
        }
    }
    ParallelSeries.compose = compose;
    /**
     * Translate each point using corresponding yAxis.
     * @private
     */
    function onSeriesAfterTranslate() {
        const series = this, chart = this.chart, points = series.points, dataLength = points && points.length;
        let closestPointRangePx = Number.MAX_VALUE, lastPlotX, point;
        if (this.chart.hasParallelCoordinates) {
            for (let i = 0; i < dataLength; i++) {
                point = points[i];
                if (defined(point.y)) {
                    if (chart.polar) {
                        point.plotX = chart.yAxis[i].angleRad || 0;
                    }
                    else if (chart.inverted) {
                        point.plotX = (chart.plotHeight -
                            chart.yAxis[i].top +
                            chart.plotTop);
                    }
                    else {
                        point.plotX = chart.yAxis[i].left - chart.plotLeft;
                    }
                    point.clientX = point.plotX;
                    point.plotY = chart.yAxis[i]
                        .translate(point.y, false, true, void 0, true);
                    // Range series (#15752)
                    if (isNumber(point.high)) {
                        point.plotHigh = chart.yAxis[i].translate(point.high, false, true, void 0, true);
                    }
                    if (typeof lastPlotX !== 'undefined') {
                        closestPointRangePx = Math.min(closestPointRangePx, Math.abs(point.plotX - lastPlotX));
                    }
                    lastPlotX = point.plotX;
                    point.isInside = chart.isInsidePlot(point.plotX, point.plotY, { inverted: chart.inverted });
                }
                else {
                    point.isNull = true;
                }
            }
            this.closestPointRangePx = closestPointRangePx;
        }
    }
    /**
     * Bind each series to each yAxis. yAxis needs a reference to all series to
     * calculate extremes.
     * @private
     */
    function onSeriesBindAxes(e) {
        const series = this, chart = series.chart;
        if (chart.hasParallelCoordinates) {
            const series = this;
            for (const axis of chart.axes) {
                insertItem(series, axis.series);
                axis.isDirty = true;
            }
            series.xAxis = chart.xAxis[0];
            series.yAxis = chart.yAxis[0];
            e.preventDefault();
        }
    }
    /**
     * On destroy, we need to remove series from each `axis.series`.
     * @private
     */
    function onSeriesDestroy() {
        const series = this, chart = series.chart;
        if (chart.hasParallelCoordinates) {
            for (const axis of (chart.axes || [])) {
                if (axis && axis.series) {
                    erase(axis.series, series);
                    axis.isDirty = axis.forceRedraw = true;
                }
            }
        }
    }
    /**
     * @private
     */
    function onSeriesAfterGeneratePoints() {
        const chart = this.chart;
        if (chart?.hasParallelCoordinates) {
            for (const point of this.points) {
                const yAxis = chart.yAxis[point.x || 0], yAxisOptions = yAxis.options, labelFormat = yAxisOptions.tooltipValueFormat ??
                    yAxisOptions.labels.format;
                let formattedValue;
                if (labelFormat) {
                    formattedValue = format(labelFormat, extend(point, { value: point.y }), chart);
                }
                else if (yAxis.dateTime) {
                    formattedValue = chart.time.dateFormat(chart.time.resolveDTLFormat(yAxisOptions.dateTimeLabelFormats?.[yAxis.tickPositions.info?.unitName || 'year'] || '').main, point.y ?? void 0);
                }
                else if (isArray(yAxisOptions.categories)) {
                    formattedValue = yAxisOptions.categories[point.y ?? -1];
                }
                else {
                    formattedValue = String(point.y ?? '');
                }
                point.formattedValue = formattedValue;
            }
        }
    }
})(ParallelSeries || (ParallelSeries = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ParallelSeries;
