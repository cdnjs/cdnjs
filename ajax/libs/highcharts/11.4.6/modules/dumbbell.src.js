/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * (c) 2009-2024 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/dumbbell', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/AreaRange/AreaRangePoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { area: { prototype: { pointClass: AreaPoint, pointClass: { prototype: areaProto } } } } = SeriesRegistry.seriesTypes;
        const { defined, isNumber } = U;
        /* *
         *
         *  Class
         *
         * */
        class AreaRangePoint extends AreaPoint {
            /**
             * Range series only. The high or maximum value for each data point.
             * @name Highcharts.Point#high
             * @type {number|undefined}
             */
            /**
             * Range series only. The low or minimum value for each data point.
             * @name Highcharts.Point#low
             * @type {number|undefined}
             */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            setState() {
                const prevState = this.state, series = this.series, isPolar = series.chart.polar;
                if (!defined(this.plotHigh)) {
                    // Boost doesn't calculate plotHigh
                    this.plotHigh = series.yAxis.toPixels(this.high, true);
                }
                if (!defined(this.plotLow)) {
                    // Boost doesn't calculate plotLow
                    this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
                }
                series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
                series.stateMarkerGraphic = series.upperStateMarkerGraphic;
                // Change state also for the top marker
                this.graphic = this.graphics && this.graphics[1];
                this.plotY = this.plotHigh;
                if (isPolar && isNumber(this.plotHighX)) {
                    this.plotX = this.plotHighX;
                }
                // Top state:
                areaProto.setState.apply(this, arguments);
                this.state = prevState;
                // Now restore defaults
                this.plotY = this.plotLow;
                this.graphic = this.graphics && this.graphics[0];
                if (isPolar && isNumber(this.plotLowX)) {
                    this.plotX = this.plotLowX;
                }
                series.upperStateMarkerGraphic = series.stateMarkerGraphic;
                series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
                // Lower marker is stored at stateMarkerGraphic
                // to avoid reference duplication (#7021)
                series.lowerStateMarkerGraphic = void 0;
                const originalSettings = series.modifyMarkerSettings();
                // Bottom state
                areaProto.setState.apply(this, arguments);
                // Restore previous state
                series.restoreMarkerSettings(originalSettings);
            }
            haloPath() {
                const isPolar = this.series.chart.polar;
                let path = [];
                // Bottom halo
                this.plotY = this.plotLow;
                if (isPolar && isNumber(this.plotLowX)) {
                    this.plotX = this.plotLowX;
                }
                if (this.isInside) {
                    path = areaProto.haloPath.apply(this, arguments);
                }
                // Top halo
                this.plotY = this.plotHigh;
                if (isPolar && isNumber(this.plotHighX)) {
                    this.plotX = this.plotHighX;
                }
                if (this.isTopInside) {
                    path = path.concat(areaProto.haloPath.apply(this, arguments));
                }
                return path;
            }
            isValid() {
                return isNumber(this.low) && isNumber(this.high);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return AreaRangePoint;
    });
    _registerModule(_modules, 'Series/Dumbbell/DumbbellPoint.js', [_modules['Series/AreaRange/AreaRangePoint.js'], _modules['Core/Utilities.js']], function (AreaRangePoint, U) {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { extend, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        class DumbbellPoint extends AreaRangePoint {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set the point's state extended by have influence on the connector
             * (between low and high value).
             *
             * @private
             */
            setState() {
                const point = this, series = point.series, chart = series.chart, seriesLowColor = series.options.lowColor, seriesMarker = series.options.marker, seriesLowMarker = series.options.lowMarker, pointOptions = point.options, pointLowColor = pointOptions.lowColor, zoneColor = point.zone && point.zone.color, lowerGraphicColor = pick(pointLowColor, seriesLowMarker?.fillColor, seriesLowColor, pointOptions.color, zoneColor, point.color, series.color);
                let verb = 'attr', upperGraphicColor, origProps;
                this.pointSetState.apply(point, arguments);
                if (!point.state) {
                    verb = 'animate';
                    const [lowerGraphic, upperGraphic] = point.graphics || [];
                    if (lowerGraphic && !chart.styledMode) {
                        lowerGraphic.attr({
                            fill: lowerGraphicColor
                        });
                        if (upperGraphic) {
                            origProps = {
                                y: point.y,
                                zone: point.zone
                            };
                            point.y = point.high;
                            point.zone = point.zone ? point.getZone() : void 0;
                            upperGraphicColor = pick(point.marker ? point.marker.fillColor : void 0, seriesMarker ? seriesMarker.fillColor : void 0, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
                            upperGraphic.attr({
                                fill: upperGraphicColor
                            });
                            extend(point, origProps);
                        }
                    }
                }
                point.connector?.[verb](series.getConnectorAttribs(point));
            }
            destroy() {
                const point = this;
                // #15560
                if (!point.graphic) {
                    point.graphic = point.connector;
                    point.connector = void 0;
                }
                return super.destroy();
            }
        }
        extend(DumbbellPoint.prototype, {
            pointSetState: AreaRangePoint.prototype.setState
        });
        /* *
         *
         *  Default export
         *
         * */

        return DumbbellPoint;
    });
    _registerModule(_modules, 'Series/Dumbbell/DumbbellSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan, Rafal Sebestjanski
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
        const DumbbellSeriesDefaults = {
            /** @ignore-option */
            trackByArea: false,
            /** @ignore-option */
            fillColor: 'none',
            /** @ignore-option */
            lineWidth: 0,
            pointRange: 1,
            /**
             * Pixel width of the line that connects the dumbbell point's
             * values.
             *
             * @since 8.0.0
             * @product   highcharts highstock
             */
            connectorWidth: 1,
            /** @ignore-option */
            stickyTracking: false,
            groupPadding: 0.2,
            crisp: false,
            pointPadding: 0.1,
            legendSymbol: 'rectangle',
            /**
             * Color of the start markers in a dumbbell graph. This option takes
             * priority over the series color. To avoid this, set `lowColor` to
             * `undefined`.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since 8.0.0
             * @product   highcharts highstock
             */
            lowColor: "#333333" /* Palette.neutralColor80 */,
            /**
             * Color of the line that connects the dumbbell point's values.
             * By default it is the series' color.
             *
             * @type      {string}
             * @product   highcharts highstock
             * @since 8.0.0
             * @apioption plotOptions.dumbbell.connectorColor
             */
            /**
             *
             * @apioption plotOptions.series.lowMarker
             */
            states: {
                hover: {
                    /** @ignore-option */
                    lineWidthPlus: 0,
                    /**
                     * The additional connector line width for a hovered point.
                     *
                     * @since 8.0.0
                     * @product   highcharts highstock
                     */
                    connectorWidthPlus: 1,
                    /** @ignore-option */
                    halo: false
                }
            }
        };
        /**
         * The `dumbbell` series. If the [type](#series.dumbbell.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dumbbell
         * @excluding boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @requires  modules/dumbbell
         * @apioption series.dumbbell
         */
        /**
         * An array of data points for the series. For the `dumbbell` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 4, 2],
         *        [1, 2, 1],
         *        [2, 9, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.dumbbell.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 4,
         *        name: "Point2",
         *        color: "#00FF00",
         *        lowColor: "#00FFFF",
         *        connectorWidth: 3,
         *        connectorColor: "#FF00FF"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 3,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @product   highcharts highstock
         * @apioption series.dumbbell.data
         */
        /**
         * Color of the start markers in a dumbbell graph. This option takes
         * priority over the series color. To avoid this, set `lowColor` to
         * `undefined`.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since     8.0.0
         * @product   highcharts highstock
         * @apioption  series.dumbbell.lowColor
         */
        /**
         * Options for the lower markers of the dumbbell-like series. When `lowMarker`
         * is not defined, options inherit form the marker.
         *
         * @see [marker](#series.arearange.marker)
         *
         * @declare   Highcharts.PointMarkerOptionsObject
         * @extends   plotOptions.series.marker
         * @default   undefined
         * @product   highcharts highstock
         * @apioption plotOptions.dumbbell.lowMarker
         */
        /**
         *
         * @sample {highcharts} highcharts/demo/dumbbell-markers
         *         Dumbbell chart with lowMarker option
         *
         * @declare   Highcharts.PointMarkerOptionsObject
         * @extends   plotOptions.series.marker.symbol
         * @product   highcharts highstock
         * @apioption plotOptions.dumbbell.lowMarker.symbol
         */
        /**
         * Color of the line that connects the dumbbell point's values.
         * By default it is the series' color.
         *
         * @type        {string}
         * @since       8.0.0
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.connectorColor
         */
        /**
         * Pixel width of the line that connects the dumbbell point's values.
         *
         * @type        {number}
         * @since       8.0.0
         * @default     1
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.connectorWidth
         */
        /**
         * Color of the start markers in a dumbbell graph. This option takes
         * priority over the series color. To avoid this, set `lowColor` to
         * `undefined`.
         *
         * @type        {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since       8.0.0
         * @default     #333333
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.lowColor
         */
        ''; // Keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return DumbbellSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Dumbbell/DumbbellSeries.js', [_modules['Series/Dumbbell/DumbbellPoint.js'], _modules['Series/Dumbbell/DumbbellSeriesDefaults.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (DumbbellPoint, DumbbellSeriesDefaults, H, SeriesRegistry, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { arearange: AreaRangeSeries, column: ColumnSeries, columnrange: ColumnRangeSeries } = SeriesRegistry.seriesTypes;
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
                        ]], connectorWidth)
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
        /* *
         *
         *  Static Properties
         *
         * */
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

        return DumbbellSeries;
    });
    _registerModule(_modules, 'masters/modules/dumbbell.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
