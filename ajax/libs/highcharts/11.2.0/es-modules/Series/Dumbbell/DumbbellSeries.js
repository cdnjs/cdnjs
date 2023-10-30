/* *
 *
 *  (c) 2010-2021 Sebastian Bochan, Rafal Sebestjanski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import DumbbellPoint from './DumbbellPoint.js';
import DumbbellSeriesDefaults from './DumbbellSeriesDefaults.js';
import H from '../../Core/Globals.js';
const { noop } = H;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { arearange: AreaRangeSeries, column: ColumnSeries, columnrange: ColumnRangeSeries } = SeriesRegistry.seriesTypes;
import SVGRenderer from '../../Core/Renderer/SVG/SVGRenderer.js';
import U from '../../Core/Utilities.js';
const { extend, merge, pick } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The dumbbell series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.dumbbell
 *
 * @augments Highcharts.Series
 */
class DumbbellSeries extends AreaRangeSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
        this.columnMetrics = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get connector line path and styles that connects dumbbell point's low and
     * high values.
     * @private
     *
     * @param {Highcharts.Point} point The point to inspect.
     *
     * @return {Highcharts.SVGAttributes} attribs The path and styles.
     */
    getConnectorAttribs(point) {
        const series = this, chart = series.chart, pointOptions = point.options, seriesOptions = series.options, xAxis = series.xAxis, yAxis = series.yAxis, connectorWidthPlus = pick(seriesOptions.states &&
            seriesOptions.states.hover &&
            seriesOptions.states.hover.connectorWidthPlus, 1), dashStyle = pick(pointOptions.dashStyle, seriesOptions.dashStyle), pxThreshold = yAxis.toPixels(seriesOptions.threshold || 0, true), pointHeight = chart.inverted ?
            yAxis.len - pxThreshold : pxThreshold;
        let connectorWidth = pick(pointOptions.connectorWidth, seriesOptions.connectorWidth), connectorColor = pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color), pointTop = pick(point.plotLow, point.plotY), pointBottom = pick(point.plotHigh, pointHeight), origProps;
        if (typeof pointTop !== 'number') {
            return {};
        }
        if (point.state) {
            connectorWidth = connectorWidth + connectorWidthPlus;
        }
        if (pointTop < 0) {
            pointTop = 0;
        }
        else if (pointTop >= yAxis.len) {
            pointTop = yAxis.len;
        }
        if (pointBottom < 0) {
            pointBottom = 0;
        }
        else if (pointBottom >= yAxis.len) {
            pointBottom = yAxis.len;
        }
        if (point.plotX < 0 || point.plotX > xAxis.len) {
            connectorWidth = 0;
        }
        // Connector should reflect upper marker's zone color
        if (point.graphics && point.graphics[1]) {
            origProps = {
                y: point.y,
                zone: point.zone
            };
            point.y = point.high;
            point.zone = point.zone ? point.getZone() : void 0;
            connectorColor = pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
            extend(point, origProps);
        }
        const attribs = {
            d: SVGRenderer.prototype.crispLine([[
                    'M',
                    point.plotX,
                    pointTop
                ], [
                    'L',
                    point.plotX,
                    pointBottom
                ]], connectorWidth, 'ceil')
        };
        if (!chart.styledMode) {
            attribs.stroke = connectorColor;
            attribs['stroke-width'] = connectorWidth;
            if (dashStyle) {
                attribs.dashstyle = dashStyle;
            }
        }
        return attribs;
    }
    /**
     * Draw connector line that connects dumbbell point's low and high values.
     * @private
     * @param {Highcharts.Point} point
     *        The point to inspect.
     */
    drawConnector(point) {
        const series = this, animationLimit = pick(series.options.animationLimit, 250), verb = point.connector && series.chart.pointCount < animationLimit ?
            'animate' : 'attr';
        if (!point.connector) {
            point.connector = series.chart.renderer.path()
                .addClass('highcharts-lollipop-stem')
                .attr({
                zIndex: -1
            })
                .add(series.group);
        }
        point.connector[verb](this.getConnectorAttribs(point));
    }
    /**
     * Return the width and x offset of the dumbbell adjusted for grouping,
     * groupPadding, pointPadding, pointWidth etc.
     * @private
     */
    getColumnMetrics() {
        const metrics = ColumnSeries.prototype
            .getColumnMetrics.apply(this, arguments);
        metrics.offset += metrics.width / 2;
        return metrics;
    }
    /**
     * Translate each point to the plot area coordinate system and find
     * shape positions
     * @private
     */
    translate() {
        const series = this, inverted = series.chart.inverted;
        // Calculate shapeargs
        this.setShapeArgs.apply(series);
        // Calculate point low / high values
        this.translatePoint.apply(series, arguments);
        // Correct x position
        for (const point of series.points) {
            const { pointWidth, shapeArgs = {}, tooltipPos } = point;
            point.plotX = shapeArgs.x || 0;
            shapeArgs.x = point.plotX - pointWidth / 2;
            if (tooltipPos) {
                if (inverted) {
                    tooltipPos[1] = series.xAxis.len - point.plotX;
                }
                else {
                    tooltipPos[0] = point.plotX;
                }
            }
        }
        series.columnMetrics.offset -= series.columnMetrics.width / 2;
    }
    /**
     * Extend the arearange series' drawPoints method by applying a connector
     * and coloring markers.
     * @private
     */
    drawPoints() {
        const series = this, chart = series.chart, pointLength = series.points.length, seriesLowColor = series.lowColor = series.options.lowColor, seriesLowMarker = series.options.lowMarker;
        let i = 0, lowerGraphicColor, point, zoneColor;
        this.seriesDrawPoints.apply(series, arguments);
        // Draw connectors and color upper markers
        while (i < pointLength) {
            point = series.points[i];
            const [lowerGraphic, upperGraphic] = point.graphics || [];
            series.drawConnector(point);
            if (upperGraphic) {
                upperGraphic.element.point = point;
                upperGraphic.addClass('highcharts-lollipop-high');
            }
            (point.connector?.element).point = point;
            if (lowerGraphic) {
                zoneColor = point.zone && point.zone.color;
                lowerGraphicColor = pick(point.options.lowColor, seriesLowMarker?.fillColor, seriesLowColor, point.options.color, zoneColor, point.color, series.color);
                if (!chart.styledMode) {
                    lowerGraphic.attr({
                        fill: lowerGraphicColor
                    });
                }
                lowerGraphic.addClass('highcharts-lollipop-low');
            }
            i++;
        }
    }
    /**
     * Get non-presentational attributes for a point. Used internally for
     * both styled mode and classic. Set correct position in link with connector
     * line.
     *
     * @see Series#pointAttribs
     *
     * @function Highcharts.Series#markerAttribs
     *
     * @return {Highcharts.SVGAttributes}
     *         A hash containing those attributes that are not settable from
     *         CSS.
     */
    markerAttribs() {
        const ret = super.markerAttribs.apply(this, arguments);
        ret.x = Math.floor(ret.x || 0);
        ret.y = Math.floor(ret.y || 0);
        return ret;
    }
    /**
     * Get presentational attributes.
     *
     * @private
     * @function Highcharts.seriesTypes.column#pointAttribs
     *
     * @param {Highcharts.Point} point
     *        The point to inspect.
     *
     * @param {string} state
     *        Current state of point (normal, hover, select).
     *
     * @return {Highcharts.SVGAttributes}
     *         Presentational attributes.
     */
    pointAttribs(point, state) {
        const pointAttribs = super.pointAttribs.apply(this, arguments);
        if (state === 'hover') {
            delete pointAttribs.fill;
        }
        return pointAttribs;
    }
    /**
     * Set the shape arguments for dummbells.
     * @private
     */
    setShapeArgs() {
        ColumnSeries.prototype.translate.apply(this);
        ColumnRangeSeries.prototype.afterColumnTranslate.apply(this);
    }
}
/**
 * The dumbbell series is a cartesian series with higher and lower values
 * for each point along an X axis, connected with a line between the
 * values.
 *
 * Requires `highcharts-more.js` and `modules/dumbbell.js`.
 *
 * @sample {highcharts} highcharts/demo/dumbbell/
 *         Dumbbell chart
 * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
 *         Styled mode
 *
 * @extends      plotOptions.arearange
 * @product      highcharts highstock
 * @excluding    fillColor, fillOpacity, lineWidth, stack, stacking,
 *               stickyTracking, trackByArea, boostThreshold, boostBlending
 * @since 8.0.0
 * @optionparent plotOptions.dumbbell
 */
DumbbellSeries.defaultOptions = merge(AreaRangeSeries.defaultOptions, DumbbellSeriesDefaults);
extend(DumbbellSeries.prototype, {
    crispCol: ColumnSeries.prototype.crispCol,
    drawGraph: noop,
    drawTracker: ColumnSeries.prototype.drawTracker,
    pointClass: DumbbellPoint,
    seriesDrawPoints: AreaRangeSeries.prototype.drawPoints,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    translatePoint: AreaRangeSeries.prototype.translate
});
SeriesRegistry.registerSeriesType('dumbbell', DumbbellSeries);
/* *
 *
 *  Default Export
 *
 * */
export default DumbbellSeries;
