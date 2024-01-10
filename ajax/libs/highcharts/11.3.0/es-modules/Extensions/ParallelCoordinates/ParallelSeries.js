/* *
 *
 *  Parallel coordinates module
 *
 *  (c) 2010-2024 Pawel Fus
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
const { addEvent, defined, erase, extend, insertItem, isArray, isNumber, pick, pushUnique, wrap } = U;
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
        if (pushUnique(composed, compose)) {
            const CompoClass = SeriesClass, { line: { prototype: { pointClass: LinePointClass } }, spline: { prototype: { pointClass: SplinePointClass } } } = SeriesClass.types;
            addEvent(CompoClass, 'afterTranslate', onSeriesAfterTranslate, { order: 1 });
            addEvent(CompoClass, 'bindAxes', onSeriesBindAxes);
            addEvent(CompoClass, 'destroy', onSeriesDestroy);
            if (LinePointClass) {
                wrap(LinePointClass.prototype, 'getLabelConfig', wrapSeriesGetLabelConfig);
            }
            if (SplinePointClass) {
                wrap(SplinePointClass.prototype, 'getLabelConfig', wrapSeriesGetLabelConfig);
            }
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
    function wrapSeriesGetLabelConfig(proceed) {
        const chart = this.series && this.series.chart, config = proceed.apply(this, [].slice.call(arguments, 1));
        let formattedValue, yAxisOptions, labelFormat, yAxis;
        if (chart &&
            chart.hasParallelCoordinates &&
            !defined(config.formattedValue)) {
            yAxis = chart.yAxis[this.x];
            yAxisOptions = yAxis.options;
            labelFormat = pick(yAxisOptions.tooltipValueFormat, yAxisOptions.labels.format);
            if (labelFormat) {
                formattedValue = format(labelFormat, extend(this, { value: this.y }), chart);
            }
            else if (yAxis.dateTime) {
                formattedValue = chart.time.dateFormat(chart.time.resolveDTLFormat(yAxisOptions.dateTimeLabelFormats[yAxis.tickPositions.info.unitName]).main, this.y);
            }
            else if (isArray(yAxisOptions.categories)) {
                formattedValue = yAxisOptions.categories[this.y];
            }
            else {
                formattedValue = this.y;
            }
            config.formattedValue =
                config.point.formattedValue = formattedValue;
        }
        return config;
    }
})(ParallelSeries || (ParallelSeries = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ParallelSeries;
