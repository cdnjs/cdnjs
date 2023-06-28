/* *
 *
 *  Timeline Series.
 *
 *  (c) 2010-2021 Highsoft AS
 *
 *  Author: Daniel Studencki
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Point from '../../Core/Series/Point.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: Series, seriesTypes: { pie: { prototype: { pointClass: PiePoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { defined, isNumber, merge, objectEach, pick } = U;
/* *
 *
 *  Class
 *
 * */
class TimelinePoint extends Series.prototype.pointClass {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    alignConnector() {
        let point = this, series = point.series, connector = point.connector, dl = point.dataLabel, dlOptions = point.dataLabel.options = merge(series.options.dataLabels, point.options.dataLabels), chart = point.series.chart, bBox = connector.getBBox(), plotPos = {
            x: bBox.x + dl.translateX,
            y: bBox.y + dl.translateY
        }, isVisible;
        // Include a half of connector width in order to run animation,
        // when connectors are aligned to the plot area edge.
        if (chart.inverted) {
            plotPos.y -= dl.options.connectorWidth / 2;
        }
        else {
            plotPos.x += dl.options.connectorWidth / 2;
        }
        isVisible = chart.isInsidePlot(plotPos.x, plotPos.y);
        connector[isVisible ? 'animate' : 'attr']({
            d: point.getConnectorPath()
        });
        connector.addClass(`highcharts-color-${point.colorIndex}`);
        if (!series.chart.styledMode) {
            connector.attr({
                stroke: dlOptions.connectorColor || point.color,
                'stroke-width': dlOptions.connectorWidth,
                opacity: dl[defined(dl.newOpacity) ? 'newOpacity' : 'opacity']
            });
        }
    }
    drawConnector() {
        const point = this, series = point.series;
        if (!point.connector) {
            point.connector = series.chart.renderer
                .path(point.getConnectorPath())
                .attr({
                zIndex: -1
            })
                .add(point.dataLabel);
        }
        if (point.series.chart.isInsidePlot(// #10507
        point.dataLabel.x, point.dataLabel.y)) {
            point.alignConnector();
        }
    }
    getConnectorPath() {
        let point = this, chart = point.series.chart, xAxisLen = point.series.xAxis.len, inverted = chart.inverted, direction = inverted ? 'x2' : 'y2', dl = point.dataLabel, targetDLPos = dl.targetPosition, coords = {
            x1: point.plotX,
            y1: point.plotY,
            x2: point.plotX,
            y2: isNumber(targetDLPos.y) ? targetDLPos.y : dl.y
        }, negativeDistance = ((dl.alignAttr || dl)[direction[0]] <
            point.series.yAxis.len / 2), path;
        // Recalculate coords when the chart is inverted.
        if (inverted) {
            coords = {
                x1: point.plotY,
                y1: xAxisLen - point.plotX,
                x2: targetDLPos.x || dl.x,
                y2: xAxisLen - point.plotX
            };
        }
        // Subtract data label width or height from expected coordinate so
        // that the connector would start from the appropriate edge.
        if (negativeDistance) {
            coords[direction] += dl[inverted ? 'width' : 'height'];
        }
        // Change coordinates so that they will be relative to data label.
        objectEach(coords, function (_coord, i) {
            coords[i] -= (dl.alignAttr || dl)[i[0]];
        });
        path = chart.renderer.crispLine([
            ['M', coords.x1, coords.y1],
            ['L', coords.x2, coords.y2]
        ], dl.options.connectorWidth);
        return path;
    }
    init() {
        const point = super.init.apply(this, arguments);
        point.name = pick(point.name, 'Event');
        point.y = 1;
        return point;
    }
    isValid() {
        return this.options.y !== null;
    }
    setState() {
        const proceed = super.setState;
        // Prevent triggering the setState method on null points.
        if (!this.isNull) {
            proceed.apply(this, arguments);
        }
    }
    setVisible(visible, redraw) {
        const point = this, series = point.series;
        redraw = pick(redraw, series.options.ignoreHiddenPoint);
        PiePoint.prototype.setVisible.call(point, visible, false);
        // Process new data
        series.processData();
        if (redraw) {
            series.chart.redraw();
        }
    }
    applyOptions(options, x) {
        options = Point.prototype.optionsToObject.call(this, options);
        this.userDLOptions = merge(this.userDLOptions, options.dataLabels);
        return super.applyOptions(options, x);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TimelinePoint;
