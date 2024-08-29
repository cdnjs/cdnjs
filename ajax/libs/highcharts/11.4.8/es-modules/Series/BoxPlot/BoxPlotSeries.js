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
import BoxPlotSeriesDefaults from './BoxPlotSeriesDefaults.js';
import ColumnSeries from '../Column/ColumnSeries.js';
import H from '../../Core/Globals.js';
const { noop } = H;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import U from '../../Core/Utilities.js';
const { crisp, extend, merge, pick } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The boxplot series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes#boxplot
 *
 * @augments Highcharts.Series
 */
class BoxPlotSeries extends ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    // Get presentational attributes
    pointAttribs() {
        // No attributes should be set on point.graphic which is the group
        return {};
    }
    // Translate data points from raw values x and y to plotX and plotY
    translate() {
        const series = this, yAxis = series.yAxis, pointArrayMap = series.pointArrayMap;
        super.translate.apply(series);
        // Do the translation on each point dimension
        series.points.forEach(function (point) {
            pointArrayMap.forEach(function (key) {
                if (point[key] !== null) {
                    point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                }
            });
            point.plotHigh = point.highPlot; // For data label validation
        });
    }
    /**
     * Draw the data points
     * @private
     */
    drawPoints() {
        const series = this, points = series.points, options = series.options, chart = series.chart, renderer = chart.renderer, 
        // Error bar inherits this series type but doesn't do quartiles
        doQuartiles = series.doQuartiles !== false, whiskerLength = series.options.whiskerLength;
        let q1Plot, q3Plot, highPlot, lowPlot, medianPlot, medianPath, boxPath, graphic, width, x, right, halfWidth, pointWiskerLength;
        for (const point of points) {
            graphic = point.graphic;
            const verb = graphic ? 'animate' : 'attr', shapeArgs = point.shapeArgs, boxAttr = {}, stemAttr = {}, whiskersAttr = {}, medianAttr = {}, color = point.color || series.color;
            if (typeof point.plotY !== 'undefined') {
                // Vector coordinates
                width = shapeArgs.width;
                x = shapeArgs.x;
                right = x + width;
                halfWidth = width / 2;
                q1Plot = doQuartiles ? point.q1Plot : point.lowPlot;
                q3Plot = doQuartiles ? point.q3Plot : point.lowPlot;
                highPlot = point.highPlot;
                lowPlot = point.lowPlot;
                if (!graphic) {
                    point.graphic = graphic = renderer.g('point')
                        .add(series.group);
                    point.stem = renderer.path()
                        .addClass('highcharts-boxplot-stem')
                        .add(graphic);
                    if (whiskerLength) {
                        point.whiskers = renderer.path()
                            .addClass('highcharts-boxplot-whisker')
                            .add(graphic);
                    }
                    if (doQuartiles) {
                        point.box = renderer.path(boxPath)
                            .addClass('highcharts-boxplot-box')
                            .add(graphic);
                    }
                    point.medianShape = renderer.path(medianPath)
                        .addClass('highcharts-boxplot-median')
                        .add(graphic);
                }
                if (!chart.styledMode) {
                    // Stem attributes
                    stemAttr.stroke =
                        point.stemColor || options.stemColor || color;
                    stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
                    stemAttr.dashstyle = (point.stemDashStyle ||
                        options.stemDashStyle ||
                        options.dashStyle);
                    point.stem.attr(stemAttr);
                    // Whiskers attributes
                    if (whiskerLength) {
                        whiskersAttr.stroke = (point.whiskerColor ||
                            options.whiskerColor ||
                            color);
                        whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
                        whiskersAttr.dashstyle = (point.whiskerDashStyle ||
                            options.whiskerDashStyle ||
                            options.dashStyle);
                        point.whiskers.attr(whiskersAttr);
                    }
                    if (doQuartiles) {
                        boxAttr.fill = (point.fillColor ||
                            options.fillColor ||
                            color);
                        boxAttr.stroke = options.lineColor || color;
                        boxAttr['stroke-width'] = options.lineWidth || 0;
                        boxAttr.dashstyle = (point.boxDashStyle ||
                            options.boxDashStyle ||
                            options.dashStyle);
                        point.box.attr(boxAttr);
                    }
                    // Median attributes
                    medianAttr.stroke = (point.medianColor ||
                        options.medianColor ||
                        color);
                    medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);
                    medianAttr.dashstyle = (point.medianDashStyle ||
                        options.medianDashStyle ||
                        options.dashStyle);
                    point.medianShape.attr(medianAttr);
                }
                let d;
                // The stem
                const stemX = crisp((point.plotX || 0) + (series.pointXOffset || 0) +
                    ((series.barW || 0) / 2), point.stem.strokeWidth());
                d = [
                    // Stem up
                    ['M', stemX, q3Plot],
                    ['L', stemX, highPlot],
                    // Stem down
                    ['M', stemX, q1Plot],
                    ['L', stemX, lowPlot]
                ];
                point.stem[verb]({ d });
                // The box
                if (doQuartiles) {
                    const boxStrokeWidth = point.box.strokeWidth();
                    q1Plot = crisp(q1Plot, boxStrokeWidth);
                    q3Plot = crisp(q3Plot, boxStrokeWidth);
                    x = crisp(x, boxStrokeWidth);
                    right = crisp(right, boxStrokeWidth);
                    d = [
                        ['M', x, q3Plot],
                        ['L', x, q1Plot],
                        ['L', right, q1Plot],
                        ['L', right, q3Plot],
                        ['L', x, q3Plot],
                        ['Z']
                    ];
                    point.box[verb]({ d });
                }
                // The whiskers
                if (whiskerLength) {
                    const whiskerStrokeWidth = point.whiskers.strokeWidth();
                    highPlot = crisp(point.highPlot, whiskerStrokeWidth);
                    lowPlot = crisp(point.lowPlot, whiskerStrokeWidth);
                    pointWiskerLength = (typeof whiskerLength === 'string' &&
                        (/%$/).test(whiskerLength)) ?
                        halfWidth * parseFloat(whiskerLength) / 100 :
                        Number(whiskerLength) / 2;
                    d = [
                        // High whisker
                        ['M', crisp(stemX - pointWiskerLength), highPlot],
                        ['L', crisp(stemX + pointWiskerLength), highPlot],
                        // Low whisker
                        ['M', crisp(stemX - pointWiskerLength), lowPlot],
                        ['L', crisp(stemX + pointWiskerLength), lowPlot]
                    ];
                    point.whiskers[verb]({ d });
                }
                // The median
                medianPlot = crisp(point.medianPlot, point.medianShape.strokeWidth());
                d = [
                    ['M', x, medianPlot],
                    ['L', right, medianPlot]
                ];
                point.medianShape[verb]({ d });
            }
        }
    }
    // Return a plain array for speedy calculation
    toYData(point) {
        return [point.low, point.q1, point.median, point.q3, point.high];
    }
}
/* *
 *
 *  Static Properties
 *
 * */
BoxPlotSeries.defaultOptions = merge(ColumnSeries.defaultOptions, BoxPlotSeriesDefaults);
extend(BoxPlotSeries.prototype, {
    // Array point configs are mapped to this
    pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
    // Defines the top of the tracker
    pointValKey: 'high',
    // Disable data labels for box plot
    drawDataLabels: noop,
    setStackedPoints: noop // #3890
});
SeriesRegistry.registerSeriesType('boxplot', BoxPlotSeries);
/* *
 *
 *  Default Export
 *
 * */
export default BoxPlotSeries;
