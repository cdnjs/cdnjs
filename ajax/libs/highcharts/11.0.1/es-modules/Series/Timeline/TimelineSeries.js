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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { column: ColumnSeries, line: LineSeries } } = SeriesRegistry;
import SVGElement from '../../Core/Renderer/SVG/SVGElement.js';
import TimelinePoint from './TimelinePoint.js';
import TimelineSeriesDefaults from './TimelineSeriesDefaults.js';
import U from '../../Core/Utilities.js';
const { addEvent, arrayMax, arrayMin, defined, extend, merge, pick } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The timeline series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.timeline
 *
 * @augments Highcharts.Series
 */
class TimelineSeries extends LineSeries {
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
        this.userOptions = void 0;
        this.visibilityMap = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    alignDataLabel(point, dataLabel, _options, _alignTo) {
        let series = this, isInverted = series.chart.inverted, visiblePoints = series.visibilityMap.filter(function (point) {
            return point;
        }), visiblePointsCount = series.visiblePointsCount, pointIndex = visiblePoints.indexOf(point), isFirstOrLast = (!pointIndex || pointIndex === visiblePointsCount - 1), dataLabelsOptions = series.options.dataLabels, userDLOptions = point.userDLOptions || {}, 
        // Define multiplier which is used to calculate data label
        // width. If data labels are alternate, they have two times more
        // space to adapt (excepting first and last ones, which has only
        // one and half), than in case of placing all data labels side
        // by side.
        multiplier = dataLabelsOptions.alternate ?
            (isFirstOrLast ? 1.5 : 2) :
            1, distance, availableSpace = Math.floor(series.xAxis.len / visiblePointsCount), pad = dataLabel.padding, targetDLWidth, styles;
        // Adjust data label width to the currently available space.
        if (point.visible) {
            distance = Math.abs(userDLOptions.x || point.options.dataLabels.x);
            if (isInverted) {
                targetDLWidth = ((distance - pad) * 2 - (point.itemHeight / 2));
                styles = {
                    width: targetDLWidth + 'px',
                    // Apply ellipsis when data label height is exceeded.
                    textOverflow: dataLabel.width / targetDLWidth *
                        dataLabel.height / 2 > availableSpace * multiplier ?
                        'ellipsis' : 'none'
                };
            }
            else {
                styles = {
                    width: (userDLOptions.width ||
                        dataLabelsOptions.width ||
                        availableSpace * multiplier - (pad * 2)) + 'px'
                };
            }
            dataLabel.css(styles);
            if (!series.chart.styledMode) {
                dataLabel.shadow(dataLabelsOptions.shadow);
            }
        }
        super.alignDataLabel.apply(series, arguments);
    }
    bindAxes() {
        const series = this;
        super.bindAxes.call(series);
        ['xAxis', 'yAxis'].forEach(function (axis) {
            // Initially set the linked xAxis type to category.
            if (axis === 'xAxis' && !series[axis].userOptions.type) {
                series[axis].categories = series[axis].hasNames = true;
            }
        });
    }
    distributeDL() {
        const series = this, dataLabelsOptions = series.options.dataLabels;
        let visibilityIndex = 1;
        if (dataLabelsOptions) {
            const distance = dataLabelsOptions.distance || 0;
            series.points.forEach((point) => {
                point.options.dataLabels = merge({
                    [series.chart.inverted ? 'x' : 'y']: dataLabelsOptions.alternate && visibilityIndex % 2 ?
                        -distance : distance
                }, point.userDLOptions);
                visibilityIndex++;
            });
        }
    }
    generatePoints() {
        const series = this;
        super.generatePoints.apply(series);
        series.points.forEach(function (point, i) {
            point.applyOptions({
                x: series.xData[i]
            }, series.xData[i]);
        });
    }
    getVisibilityMap() {
        const series = this, map = (series.data.length ?
            series.data : series.userOptions.data).map(function (point) {
            return (point &&
                point.visible !== false &&
                !point.isNull) ? point : false;
        });
        return map;
    }
    getXExtremes(xData) {
        const series = this, filteredData = xData.filter(function (x, i) {
            return series.points[i].isValid() &&
                series.points[i].visible;
        });
        return {
            min: arrayMin(filteredData),
            max: arrayMax(filteredData)
        };
    }
    init() {
        const series = this;
        super.init.apply(series, arguments);
        series.eventsToUnbind.push(addEvent(series, 'afterTranslate', function () {
            let lastPlotX, closestPointRangePx = Number.MAX_VALUE;
            series.points.forEach(function (point) {
                // Set the isInside parameter basing also on the real point
                // visibility, in order to avoid showing hidden points
                // in drawPoints method.
                point.isInside = point.isInside && point.visible;
                // New way of calculating closestPointRangePx value, which
                // respects the real point visibility is needed.
                if (point.visible && !point.isNull) {
                    if (defined(lastPlotX)) {
                        closestPointRangePx = Math.min(closestPointRangePx, Math.abs(point.plotX - lastPlotX));
                    }
                    lastPlotX = point.plotX;
                }
            });
            series.closestPointRangePx = closestPointRangePx;
        }));
        // Distribute data labels before rendering them. Distribution is
        // based on the 'dataLabels.distance' and 'dataLabels.alternate'
        // property.
        series.eventsToUnbind.push(addEvent(series, 'drawDataLabels', function () {
            // Distribute data labels basing on defined algorithm.
            series.distributeDL(); // @todo use this scope for series
        }));
        series.eventsToUnbind.push(addEvent(series, 'afterDrawDataLabels', function () {
            let dataLabel; // @todo use this scope for series
            // Draw or align connector for each point.
            series.points.forEach(function (point) {
                dataLabel = point.dataLabel;
                if (dataLabel) {
                    // Within this wrap method is necessary to save the
                    // current animation params, because the data label
                    // target position (after animation) is needed to align
                    // connectors.
                    dataLabel.animate = function (params) {
                        if (this.targetPosition) {
                            this.targetPosition = params;
                        }
                        return SVGElement.prototype.animate.apply(this, arguments);
                    };
                    // Initialize the targetPosition field within data label
                    // object. It's necessary because there is need to know
                    // expected position of specific data label, when
                    // aligning connectors. This field is overrided inside
                    // of SVGElement.animate() wrapped  method.
                    if (!dataLabel.targetPosition) {
                        dataLabel.targetPosition = {};
                    }
                    return point.drawConnector();
                }
            });
        }));
        series.eventsToUnbind.push(addEvent(series.chart, 'afterHideOverlappingLabel', function () {
            series.points.forEach(function (p) {
                if (p.connector &&
                    p.dataLabel &&
                    p.dataLabel.oldOpacity !== p.dataLabel.newOpacity) {
                    p.alignConnector();
                }
            });
        }));
    }
    markerAttribs(point, state) {
        let series = this, seriesMarkerOptions = series.options.marker, seriesStateOptions, pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol || seriesMarkerOptions.symbol), pointStateOptions, width = pick(pointMarkerOptions.width, seriesMarkerOptions.width, series.closestPointRangePx), height = pick(pointMarkerOptions.height, seriesMarkerOptions.height), radius = 0, attribs;
        // Call default markerAttribs method, when the xAxis type
        // is set to datetime.
        if (series.xAxis.dateTime) {
            return super.markerAttribs.call(this, point, state);
        }
        // Handle hover and select states
        if (state) {
            seriesStateOptions =
                seriesMarkerOptions.states[state] || {};
            pointStateOptions = pointMarkerOptions.states &&
                pointMarkerOptions.states[state] || {};
            radius = pick(pointStateOptions.radius, seriesStateOptions.radius, radius + (seriesStateOptions.radiusPlus || 0));
        }
        point.hasImage = (symbol && symbol.indexOf('url') === 0);
        attribs = {
            x: Math.floor(point.plotX) - (width / 2) - (radius / 2),
            y: point.plotY - (height / 2) - (radius / 2),
            width: width + radius,
            height: height + radius
        };
        return (series.chart.inverted) ? {
            y: (attribs.x && attribs.width) &&
                series.xAxis.len - attribs.x - attribs.width,
            x: attribs.y && attribs.y,
            width: attribs.height,
            height: attribs.width
        } : attribs;
    }
    processData() {
        let series = this, visiblePoints = 0, i;
        series.visibilityMap = series.getVisibilityMap();
        // Calculate currently visible points.
        series.visibilityMap.forEach(function (point) {
            if (point) {
                visiblePoints++;
            }
        });
        series.visiblePointsCount = visiblePoints;
        for (i = 0; i < series.xData.length; i++) {
            series.yData[i] = 1;
        }
        super.processData.call(this, arguments);
        return;
    }
}
TimelineSeries.defaultOptions = merge(LineSeries.defaultOptions, TimelineSeriesDefaults);
extend(TimelineSeries.prototype, {
    // Use a group of trackers from TrackerMixin
    drawTracker: ColumnSeries.prototype.drawTracker,
    pointClass: TimelinePoint,
    trackerGroups: ['markerGroup', 'dataLabelsGroup']
});
SeriesRegistry.registerSeriesType('timeline', TimelineSeries);
/* *
 *
 *  Default Export
 *
 * */
export default TimelineSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Callback JavaScript function to format the data label as a string. Note that
 * if a `format` is defined, the format takes precedence and the formatter is
 * ignored.
 *
 * @callback Highcharts.TimelineDataLabelsFormatterCallbackFunction
 *
 * @param {Highcharts.PointLabelObject|Highcharts.TimelineDataLabelsFormatterContextObject} this
 *        Data label context to format
 *
 * @return {number|string|null|undefined}
 *         Formatted data label text
 */
/**
 * @interface Highcharts.TimelineDataLabelsFormatterContextObject
 * @extends Highcharts.PointLabelObject
 */ /**
* @name Highcharts.TimelineDataLabelsFormatterContextObject#key
* @type {string|undefined}
*/ /**
* @name Highcharts.TimelineDataLabelsFormatterContextObject#point
* @type {Highcharts.Point}
*/ /**
* @name Highcharts.TimelineDataLabelsFormatterContextObject#series
* @type {Highcharts.Series}
*/
''; // dettach doclets above
