/* *
 *
 *  (c) 2016-2024 Highsoft AS
 *
 *  Author: Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import GanttPoint from './GanttPoint.js';
import GanttSeriesDefaults from './GanttSeriesDefaults.js';
import Pathfinder from '../../Gantt/Pathfinder.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: Series, seriesTypes: { xrange: XRangeSeries } } = SeriesRegistry;
import StaticScale from '../../Extensions/StaticScale.js';
import TreeGridAxis from '../../Core/Axis/TreeGrid/TreeGridAxis.js';
import U from '../../Core/Utilities.js';
const { extend, isNumber, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.gantt
 *
 * @augments Highcharts.Series
 */
class GanttSeries extends XRangeSeries {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AxisClass, ChartClass, SeriesClass, TickClass) {
        XRangeSeries.compose(AxisClass);
        if (!ChartClass) {
            return;
        }
        StaticScale.compose(AxisClass, ChartClass);
        if (!SeriesClass) {
            return;
        }
        Pathfinder.compose(ChartClass, SeriesClass.prototype.pointClass);
        if (!TickClass) {
            return;
        }
        TreeGridAxis.compose(AxisClass, ChartClass, SeriesClass, TickClass);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Draws a single point in the series.
     *
     * This override draws the point as a diamond if point.options.milestone
     * is true, and uses the original drawPoint() if it is false or not set.
     *
     * @requires highcharts-gantt
     *
     * @private
     * @function Highcharts.seriesTypes.gantt#drawPoint
     *
     * @param {Highcharts.Point} point
     *        An instance of Point in the series
     *
     * @param {"animate"|"attr"} verb
     *        'animate' (animates changes) or 'attr' (sets options)
     */
    drawPoint(point, verb) {
        const series = this, seriesOpts = series.options, renderer = series.chart.renderer, shapeArgs = point.shapeArgs, plotY = point.plotY, state = point.selected && 'select', cutOff = seriesOpts.stacking && !seriesOpts.borderRadius;
        let graphic = point.graphic, diamondShape;
        if (point.options.milestone) {
            if (isNumber(plotY) &&
                point.y !== null &&
                point.visible !== false) {
                diamondShape = renderer.symbols.diamond(shapeArgs.x || 0, shapeArgs.y || 0, shapeArgs.width || 0, shapeArgs.height || 0);
                if (graphic) {
                    graphic[verb]({
                        d: diamondShape
                    });
                }
                else {
                    point.graphic = graphic = renderer.path(diamondShape)
                        .addClass(point.getClassName(), true)
                        .add(point.group || series.group);
                }
                // Presentational
                if (!series.chart.styledMode) {
                    point.graphic
                        .attr(series.pointAttribs(point, state))
                        .shadow(seriesOpts.shadow, null, cutOff);
                }
            }
            else if (graphic) {
                point.graphic = graphic.destroy(); // #1269
            }
        }
        else {
            super.drawPoint(point, verb);
        }
    }
    /**
     * Handle milestones, as they have no x2.
     * @private
     */
    translatePoint(point) {
        let shapeArgs, size;
        super.translatePoint(point);
        if (point.options.milestone) {
            shapeArgs = point.shapeArgs;
            size = shapeArgs.height || 0;
            point.shapeArgs = {
                x: (shapeArgs.x || 0) - (size / 2),
                y: shapeArgs.y,
                width: size,
                height: size
            };
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
GanttSeries.defaultOptions = merge(XRangeSeries.defaultOptions, GanttSeriesDefaults);
extend(GanttSeries.prototype, {
    pointArrayMap: ['start', 'end', 'y'],
    pointClass: GanttPoint,
    setData: Series.prototype.setData
});
SeriesRegistry.registerSeriesType('gantt', GanttSeries);
/* *
 *
 *  Default Export
 *
 * */
export default GanttSeries;
