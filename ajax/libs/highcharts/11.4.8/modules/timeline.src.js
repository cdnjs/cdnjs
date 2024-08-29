/**
 * @license Highcharts JS v11.4.8 (2024-08-29)
 *
 * Timeline series
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Daniel Studencki
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/timeline', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/Timeline/TimelinePoint.js', [_modules['Core/Series/Point.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Point, SeriesRegistry, U) {
        /* *
         *
         *  Timeline Series.
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { line: { prototype: { pointClass: LinePoint } }, pie: { prototype: { pointClass: PiePoint } } } = SeriesRegistry.seriesTypes;
        const { defined, isNumber, merge, objectEach, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        class TimelinePoint extends LinePoint {
            /* *
             *
             *  Functions
             *
             * */
            alignConnector() {
                const point = this, series = point.series, dataLabel = point.dataLabel, connector = dataLabel.connector, dlOptions = (dataLabel.options || {}), connectorWidth = dlOptions.connectorWidth || 0, chart = point.series.chart, bBox = connector.getBBox(), plotPos = {
                    x: bBox.x + (dataLabel.translateX || 0),
                    y: bBox.y + (dataLabel.translateY || 0)
                };
                // Include a half of connector width in order to run animation,
                // when connectors are aligned to the plot area edge.
                if (chart.inverted) {
                    plotPos.y -= connectorWidth / 2;
                }
                else {
                    plotPos.x += connectorWidth / 2;
                }
                const isVisible = chart.isInsidePlot(plotPos.x, plotPos.y);
                connector[isVisible ? 'animate' : 'attr']({
                    d: point.getConnectorPath()
                });
                connector.addClass('highcharts-color-' + point.colorIndex);
                if (!series.chart.styledMode) {
                    connector.attr({
                        stroke: dlOptions.connectorColor || point.color,
                        'stroke-width': dlOptions.connectorWidth,
                        opacity: dataLabel[defined(dataLabel.newOpacity) ? 'newOpacity' : 'opacity']
                    });
                }
            }
            drawConnector() {
                const point = this, { dataLabel, series } = point;
                if (dataLabel) {
                    if (!dataLabel.connector) {
                        dataLabel.connector = series.chart.renderer
                            .path(point.getConnectorPath())
                            .attr({
                            zIndex: -1
                        })
                            .add(dataLabel);
                    }
                    if (point.series.chart.isInsidePlot(// #10507
                    dataLabel.x || 0, dataLabel.y || 0)) {
                        point.alignConnector();
                    }
                }
            }
            getConnectorPath() {
                const { plotX = 0, plotY = 0, series, dataLabel } = this, chart = series.chart, xAxisLen = series.xAxis.len, inverted = chart.inverted, direction = inverted ? 'x2' : 'y2';
                if (dataLabel) {
                    const targetDLPos = dataLabel.targetPosition, negativeDistance = ((dataLabel.alignAttr || dataLabel)[direction[0]] <
                        series.yAxis.len / 2);
                    let coords = {
                        x1: plotX,
                        y1: plotY,
                        x2: plotX,
                        y2: isNumber(targetDLPos.y) ? targetDLPos.y : dataLabel.y
                    };
                    // Recalculate coords when the chart is inverted.
                    if (inverted) {
                        coords = {
                            x1: plotY,
                            y1: xAxisLen - plotX,
                            x2: targetDLPos.x || dataLabel.x,
                            y2: xAxisLen - plotX
                        };
                    }
                    // Subtract data label width or height from expected coordinate so
                    // that the connector would start from the appropriate edge.
                    if (negativeDistance) {
                        coords[direction] += dataLabel[inverted ? 'width' : 'height'] || 0;
                    }
                    // Change coordinates so that they will be relative to data label.
                    objectEach(coords, (_coord, i) => {
                        coords[i] -= (dataLabel.alignAttr || dataLabel)[i[0]];
                    });
                    return chart.renderer.crispLine([
                        ['M', coords.x1, coords.y1],
                        ['L', coords.x2, coords.y2]
                    ], dataLabel.options?.connectorWidth || 0);
                }
                return [];
            }
            constructor(series, options) {
                super(series, options);
                this.name ?? (this.name = 'Event');
                this.y = 1;
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

        return TimelinePoint;
    });
    _registerModule(_modules, 'Series/Timeline/TimelineSeriesDefaults.js', [], function () {
        /* *
         *
         *  Timeline Series.
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * The timeline series presents given events along a drawn line.
         *
         * @sample highcharts/series-timeline/alternate-labels
         *         Timeline series
         * @sample highcharts/series-timeline/inverted
         *         Inverted timeline
         * @sample highcharts/series-timeline/datetime-axis
         *         With true datetime axis
         *
         * @extends      plotOptions.line
         * @excluding    animationLimit, boostThreshold, connectEnds, connectNulls,
         *               cropThreshold, dashStyle, findNearestPointBy,
         *               getExtremesFromAll, negativeColor, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointStart,
         *               softThreshold, stacking, step, threshold, turboThreshold,
         *               zoneAxis, zones, dataSorting, boostBlending
         * @product      highcharts
         * @since        7.0.0
         * @requires     modules/timeline
         * @optionparent plotOptions.timeline
         */
        const TimelineSeriesDefaults = {
            colorByPoint: true,
            stickyTracking: false,
            ignoreHiddenPoint: true,
            /**
             * @ignore
             */
            legendType: 'point',
            /**
             * Pixel width of the graph line.
             */
            lineWidth: 4,
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '<span style="font-size: 0.8em"> {point.key}</span><br/>',
                pointFormat: '{point.description}'
            },
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            },
            /**
             * @declare Highcharts.TimelineDataLabelsOptionsObject
             */
            dataLabels: {
                enabled: true,
                allowOverlap: true,
                /**
                 * Whether to position data labels alternately. For example, if
                 * [distance](#plotOptions.timeline.dataLabels.distance)
                 * is set equal to `100`, then data labels will be positioned
                 * alternately (on both sides of the point) at a distance of 100px.
                 *
                 * @sample {highcharts} highcharts/series-timeline/alternate-disabled
                 *         Alternate disabled
                 */
                alternate: true,
                backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                borderWidth: 1,
                borderColor: "#999999" /* Palette.neutralColor40 */,
                borderRadius: 3,
                color: "#333333" /* Palette.neutralColor80 */,
                /**
                 * The color of the line connecting the data label to the point.
                 * The default color is the same as the point's color.
                 *
                 * In styled mode, the connector stroke is given in the
                 * `.highcharts-data-label-connector` class.
                 *
                 * @sample {highcharts} highcharts/series-timeline/connector-styles
                 *         Custom connector width and color
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.timeline.dataLabels.connectorColor
                 */
                /**
                 * The width of the line connecting the data label to the point.
                 *
                 * In styled mode, the connector stroke width is given in the
                 * `.highcharts-data-label-connector` class.
                 *
                 * @sample {highcharts} highcharts/series-timeline/connector-styles
                 *         Custom connector width and color
                 */
                connectorWidth: 1,
                /**
                 * A pixel value defining the distance between the data label and
                 * the point. Negative numbers puts the label on top of the point in a
                 * non-inverted chart. Defaults to 100 for horizontal and 20 for
                 * vertical timeline (`chart.inverted: true`).
                 */
                distance: void 0,
                // eslint-disable-next-line jsdoc/require-description
                /**
                 * @type    {Highcharts.TimelineDataLabelsFormatterCallbackFunction}
                 * @default function () {
                 *   let format;
                 *
                 *   if (!this.series.chart.styledMode) {
                 *       format = '<span style="color:' + this.point.color +
                 *           '">● </span>';
                 *   } else {
                 *       format = '<span class="highcharts-color-' +
                 *          this.point.colorIndex + '">● </span>';
                 *   }
                 *   format += '<span>' + (this.key || '') + '</span><br/>' +
                 *       (this.point.label || '');
                 *   return format;
                 * }
                 */
                formatter: function () {
                    let format;
                    if (!this.series.chart.styledMode) {
                        format = '<span style="color:' + this.point.color +
                            '">● </span>';
                    }
                    else {
                        format = '<span class="highcharts-color-' +
                            this.point.colorIndex + '">● </span>';
                    }
                    format += '<span class="highcharts-strong">' +
                        (this.key || '') + '</span><br/>' +
                        (this.point.label || '');
                    return format;
                },
                style: {
                    /** @internal */
                    textOutline: 'none',
                    /** @internal */
                    fontWeight: 'normal',
                    /** @internal */
                    fontSize: '0.8em'
                },
                /**
                 * Shadow options for the data label.
                 *
                 * @type {boolean|Highcharts.CSSObject}
                 */
                shadow: false,
                /**
                 * @type      {number}
                 * @apioption plotOptions.timeline.dataLabels.width
                 */
                verticalAlign: 'middle'
            },
            marker: {
                enabledThreshold: 0,
                symbol: 'square',
                radius: 6,
                lineWidth: 2,
                height: 15
            },
            showInLegend: false,
            colorKey: 'x',
            legendSymbol: 'rectangle'
        };
        /**
         * The `timeline` series. If the [type](#series.timeline.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.timeline
         * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
         *            cropThreshold, dashStyle, dataParser, dataURL, findNearestPointBy,
         *            getExtremesFromAll, negativeColor, pointInterval,
         *            pointIntervalUnit, pointPlacement, pointStart, softThreshold,
         *            stacking, stack, step, threshold, turboThreshold, zoneAxis, zones,
         *            dataSorting, boostBlending
         * @product   highcharts
         * @requires  modules/timeline
         * @apioption series.timeline
         */
        /**
         * An array of data points for the series. For the `timeline` series type,
         * points can be given with three general parameters, `name`, `label`,
         * and `description`:
         *
         * Example:
         *
         * ```js
         * series: [{
         *    type: 'timeline',
         *    data: [{
         *        name: 'Jan 2018',
         *        label: 'Some event label',
         *        description: 'Description to show in tooltip'
         *    }]
         * }]
         * ```
         * If all points additionally have the `x` values, and xAxis type is set to
         * `datetime`, then events are laid out on a true time axis, where their
         * placement reflects the actual time between them.
         *
         * @sample {highcharts} highcharts/series-timeline/alternate-labels
         *         Alternate labels
         * @sample {highcharts} highcharts/series-timeline/datetime-axis
         *         Real time intervals
         *
         * @type      {Array<*>}
         * @extends   series.line.data
         * @excluding marker, y
         * @product   highcharts
         * @apioption series.timeline.data
         */
        /**
         * The name of event.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.timeline.data.name
         */
        /**
         * The label of event.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.timeline.data.label
         */
        /**
         * The description of event. This description will be shown in tooltip.
         *
         * @type      {string}
         * @product   highcharts
         * @apioption series.timeline.data.description
         */
        ''; // Adds doclets above to transpiled file
        /* *
         *
         *  Default Export
         *
         * */

        return TimelineSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Timeline/TimelineSeries.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Series/Timeline/TimelinePoint.js'], _modules['Series/Timeline/TimelineSeriesDefaults.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, TimelinePoint, TimelineSeriesDefaults, U) {
        /* *
         *
         *  Timeline Series.
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: ColumnSeries, line: LineSeries } = SeriesRegistry.seriesTypes;
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
            /* *
             *
             *  Functions
             *
             * */
            alignDataLabel(point, dataLabel, _options, _alignTo) {
                const series = this, isInverted = series.chart.inverted, visiblePoints = series.visibilityMap.filter((point) => !!point), visiblePointsCount = series.visiblePointsCount || 0, pointIndex = visiblePoints.indexOf(point), isFirstOrLast = (!pointIndex || pointIndex === visiblePointsCount - 1), dataLabelsOptions = series.options.dataLabels, userDLOptions = point.userDLOptions || {}, 
                // Define multiplier which is used to calculate data label
                // width. If data labels are alternate, they have two times more
                // space to adapt (excepting first and last ones, which has only
                // one and half), than in case of placing all data labels side
                // by side.
                multiplier = dataLabelsOptions.alternate ?
                    (isFirstOrLast ? 1.5 : 2) :
                    1, availableSpace = Math.floor(series.xAxis.len / visiblePointsCount), pad = dataLabel.padding;
                let distance, targetDLWidth, styles;
                // Adjust data label width to the currently available space.
                if (point.visible) {
                    distance = Math.abs(userDLOptions.x || point.options.dataLabels.x);
                    if (isInverted) {
                        targetDLWidth = ((distance - pad) * 2 - ((point.itemHeight || 0) / 2));
                        styles = {
                            width: pick(dataLabelsOptions.style?.width, `${series.yAxis.len * 0.4}px`),
                            // Apply ellipsis when data label height is exceeded.
                            textOverflow: (dataLabel.width || 0) / targetDLWidth *
                                (dataLabel.height || 0) / 2 > availableSpace *
                                multiplier ?
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
                super.bindAxes();
                // Initially set the linked xAxis type to category.
                if (!series.xAxis.userOptions.type) {
                    series.xAxis.categories = series.xAxis.hasNames = true;
                }
            }
            distributeDL() {
                const series = this, dataLabelsOptions = series.options.dataLabels, inverted = series.chart.inverted;
                let visibilityIndex = 1;
                if (dataLabelsOptions) {
                    const distance = pick(dataLabelsOptions.distance, inverted ? 20 : 100);
                    for (const point of series.points) {
                        const defaults = {
                            [inverted ? 'x' : 'y']: dataLabelsOptions.alternate && visibilityIndex % 2 ?
                                -distance : distance
                        };
                        if (inverted) {
                            defaults.align = (dataLabelsOptions.alternate && visibilityIndex % 2) ? 'right' : 'left';
                        }
                        point.options.dataLabels = merge(defaults, point.userDLOptions);
                        visibilityIndex++;
                    }
                }
            }
            generatePoints() {
                super.generatePoints();
                const series = this, points = series.points;
                for (let i = 0, iEnd = points.length; i < iEnd; ++i) {
                    points[i].applyOptions({
                        x: series.xData[i]
                    }, series.xData[i]);
                }
            }
            getVisibilityMap() {
                const series = this, map = (series.data.length ?
                    series.data :
                    series.userOptions.data || []).map((point) => (point && point.visible !== false && !point.isNull ?
                    point :
                    false));
                return map;
            }
            getXExtremes(xData) {
                const series = this, filteredData = xData.filter((_x, i) => (series.points[i].isValid() &&
                    series.points[i].visible));
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
                    for (const point of series.points) {
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
                    }
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
                    for (const point of series.points) {
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
                                return this.renderer.Element.prototype
                                    .animate.apply(this, arguments);
                            };
                            // Initialize the targetPosition field within data label
                            // object. It's necessary because there is need to know
                            // expected position of specific data label, when
                            // aligning connectors. This field is overridden inside
                            // of SVGElement.animate() wrapped method.
                            if (!dataLabel.targetPosition) {
                                dataLabel.targetPosition = {};
                            }
                            point.drawConnector();
                        }
                    }
                }));
                series.eventsToUnbind.push(addEvent(series.chart, 'afterHideOverlappingLabel', function () {
                    for (const p of series.points) {
                        if (p.dataLabel &&
                            p.dataLabel.connector &&
                            p.dataLabel.oldOpacity !== p.dataLabel.newOpacity) {
                            p.alignConnector();
                        }
                    }
                }));
            }
            markerAttribs(point, state) {
                const series = this, seriesMarkerOptions = series.options.marker, pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol || seriesMarkerOptions.symbol), width = pick(pointMarkerOptions.width, seriesMarkerOptions.width, series.closestPointRangePx), height = pick(pointMarkerOptions.height, seriesMarkerOptions.height);
                let seriesStateOptions, pointStateOptions, radius = 0;
                // Call default markerAttribs method, when the xAxis type
                // is set to datetime.
                if (series.xAxis.dateTime) {
                    return super.markerAttribs(point, state);
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
                const attribs = {
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
                const series = this;
                let visiblePoints = 0, i;
                series.visibilityMap = series.getVisibilityMap();
                // Calculate currently visible points.
                for (const point of series.visibilityMap) {
                    if (point) {
                        visiblePoints++;
                    }
                }
                series.visiblePointsCount = visiblePoints;
                for (i = 0; i < series.xData.length; i++) {
                    series.yData[i] = 1;
                }
                super.processData.call(this, arguments);
                return;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        ''; // Dettach doclets above

        return TimelineSeries;
    });
    _registerModule(_modules, 'masters/modules/timeline.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
