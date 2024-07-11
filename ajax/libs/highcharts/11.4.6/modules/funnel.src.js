/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Highcharts funnel module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/funnel', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/Funnel/FunnelSeriesDefaults.js', [], function () {
        /* *
         *
         *  Highcharts funnel module
         *
         *  (c) 2010-2024 Torstein Honsi
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
         * Funnel charts are a type of chart often used to visualize stages in a
         * sales project, where the top are the initial stages with the most
         * clients. It requires that the modules/funnel.js file is loaded.
         *
         * @sample highcharts/demo/funnel/
         *         Funnel demo
         *
         * @extends      plotOptions.pie
         * @excluding    innerSize,size,dataSorting
         * @product      highcharts
         * @requires     modules/funnel
         * @optionparent plotOptions.funnel
         */
        const FunnelSeriesDefaults = {
            /**
             * Initial animation is by default disabled for the funnel chart.
             */
            animation: false,
            /**
             * The corner radius of the border surrounding all points or series. A
             * number signifies pixels. A percentage string, like for example `50%`,
             * signifies a size relative to the series width.
             *
             * @sample highcharts/plotoptions/funnel-border-radius
             *         Funnel and pyramid with rounded border
             */
            borderRadius: 0,
            /**
             * The center of the series. By default, it is centered in the middle
             * of the plot area, so it fills the plot area height.
             *
             * @type    {Array<number|string>}
             * @default ["50%", "50%"]
             * @since   3.0
             */
            center: ['50%', '50%'],
            /**
             * The width of the funnel compared to the width of the plot area,
             * or the pixel width if it is a number.
             *
             * @type  {number|string}
             * @since 3.0
             */
            width: '90%',
            /**
             * The width of the neck, the lower part of the funnel. A number defines
             * pixel width, a percentage string defines a percentage of the plot
             * area width.
             *
             * @sample {highcharts} highcharts/demo/funnel/
             *         Funnel demo
             *
             * @type  {number|string}
             * @since 3.0
             */
            neckWidth: '30%',
            /**
             * The height of the funnel or pyramid. If it is a number it defines
             * the pixel height, if it is a percentage string it is the percentage
             * of the plot area height.
             *
             * @sample {highcharts} highcharts/demo/funnel/
             *         Funnel demo
             *
             * @type  {number|string}
             * @since 3.0
             */
            height: '100%',
            /**
             * The height of the neck, the lower part of the funnel. A number
             * defines pixel width, a percentage string defines a percentage of the
             * plot area height.
             *
             * @type {number|string}
             */
            neckHeight: '25%',
            /**
             * A reversed funnel has the widest area down. A reversed funnel with
             * no neck width and neck height is a pyramid.
             *
             * @since 3.0.10
             */
            reversed: false,
            /**
             * To avoid adapting the data label size in Pie.drawDataLabels.
             * @ignore-option
             */
            size: true,
            dataLabels: {
                connectorWidth: 1,
                verticalAlign: 'middle'
            },
            /**
             * Options for the series states.
             */
            states: {
                /**
                 * @excluding halo, marker, lineWidth, lineWidthPlus
                 * @apioption plotOptions.funnel.states.hover
                 */
                /**
                 * Options for a selected funnel item.
                 *
                 * @excluding halo, marker, lineWidth, lineWidthPlus
                 */
                select: {
                    /**
                     * A specific color for the selected point.
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    color: "#cccccc" /* Palette.neutralColor20 */,
                    /**
                     * A specific border color for the selected point.
                     *
                     * @type {Highcharts.ColorString}
                     */
                    borderColor: "#000000" /* Palette.neutralColor100 */
                }
            }
        };
        /**
         * A `funnel` series. If the [type](#series.funnel.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.funnel
         * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
         *            boostBlending, boostThreshold
         * @product   highcharts
         * @requires  modules/funnel
         * @apioption series.funnel
         */
        /**
         * An array of data points for the series. For the `funnel` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of numerical values. In this case, the numerical values
         * will be interpreted as `y` options. Example:
         *
         *  ```js
         *  data: [0, 5, 3, 5]
         *  ```
         *
         * 2.  An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.funnel.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         y: 3,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         y: 1,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|null|*>}
         * @extends   series.pie.data
         * @excluding sliced
         * @product   highcharts
         * @apioption series.funnel.data
         */
        ''; // Keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return FunnelSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Funnel/FunnelSeries.js', [_modules['Series/Funnel/FunnelSeriesDefaults.js'], _modules['Core/Globals.js'], _modules['Extensions/BorderRadius.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (FunnelSeriesDefaults, H, BorderRadius, SeriesRegistry, U) {
        /* *
         *
         *  Highcharts funnel module
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed, noop } = H;
        const { column: ColumnSeries, pie: PieSeries } = SeriesRegistry.seriesTypes;
        const { addEvent, correctFloat, extend, fireEvent, isArray, merge, pick, pushUnique, relativeLength, splat } = U;
        /* *
         *
         *  Constants
         *
         * */
        const baseAlignDataLabel = SeriesRegistry.series.prototype.alignDataLabel;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get positions - either an integer or a percentage string must be
         * given.
         * @private
         * @param {number|string|undefined} length
         *        Length
         * @param {number} relativeTo
         *        Relative factor
         * @return {number}
         *         Relative position
         */
        function getLength(length, relativeTo) {
            return (/%$/).test(length) ?
                relativeTo * parseInt(length, 10) / 100 :
                parseInt(length, 10);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.funnel
         *
         * @augments Highcharts.Series
         */
        class FunnelSeries extends PieSeries {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            alignDataLabel(point, dataLabel, options, alignTo, isNew) {
                const series = point.series, reversed = series.options.reversed, dlBox = point.dlBox || point.shapeArgs, { align, padding = 0, verticalAlign } = options, inside = ((series.options || {}).dataLabels || {}).inside, centerY = series.center[1], plotY = point.plotY || 0, pointPlotY = (reversed ?
                    2 * centerY - plotY :
                    plotY), 
                // #16176: Only SVGLabel has height set
                dataLabelHeight = dataLabel.height ?? dataLabel.getBBox().height, widthAtLabel = series.getWidthAt(pointPlotY - dlBox.height / 2 +
                    dataLabelHeight), offset = verticalAlign === 'middle' ?
                    (dlBox.topWidth - dlBox.bottomWidth) / 4 :
                    (widthAtLabel - dlBox.bottomWidth) / 2;
                let y = dlBox.y, x = dlBox.x;
                if (verticalAlign === 'middle') {
                    y = dlBox.y - dlBox.height / 2 + dataLabelHeight / 2;
                }
                else if (verticalAlign === 'top') {
                    y = dlBox.y - dlBox.height + dataLabelHeight + padding;
                }
                if (verticalAlign === 'top' && !reversed ||
                    verticalAlign === 'bottom' && reversed ||
                    verticalAlign === 'middle') {
                    if (align === 'right') {
                        x = dlBox.x - padding + offset;
                    }
                    else if (align === 'left') {
                        x = dlBox.x + padding - offset;
                    }
                }
                alignTo = {
                    x: x,
                    y: reversed ? y - dlBox.height : y,
                    width: dlBox.bottomWidth,
                    height: dlBox.height
                };
                options.verticalAlign = 'bottom';
                if (inside) {
                    // If the distance were positive (as default), the overlapping
                    // labels logic would skip these labels and they would be allowed
                    // to overlap.
                    options.distance = void 0;
                }
                // Call the parent method
                if (inside && point.visible) {
                    baseAlignDataLabel.call(series, point, dataLabel, options, alignTo, isNew);
                }
                if (inside) {
                    if (!point.visible && point.dataLabel) {
                        // Avoid animation from top
                        point.dataLabel.placed = false;
                    }
                    // If label is inside and we have contrast, set it:
                    if (point.contrastColor) {
                        dataLabel.css({
                            color: point.contrastColor
                        });
                    }
                }
            }
            /**
             * Extend the data label method.
             * @private
             */
            drawDataLabels() {
                (splat(this.options.dataLabels)[0].inside ?
                    ColumnSeries :
                    PieSeries).prototype.drawDataLabels.call(this);
            }
            /** @private */
            getDataLabelPosition(point, distance) {
                const y = point.plotY || 0, sign = point.half ? 1 : -1, x = this.getX(y, !!point.half, point);
                return {
                    distance,
                    // Initial position of the data label - it's utilized for finding
                    // the final position for the label
                    natural: {
                        x: 0,
                        y
                    },
                    computed: {
                    // Used for generating connector path - initialized later in
                    // drawDataLabels function x: undefined, y: undefined
                    },
                    // Left - funnel on the left side of the data label
                    // Right - funnel on the right side of the data label
                    alignment: point.half ? 'right' : 'left',
                    connectorPosition: {
                        breakAt: {
                            x: x + (distance - 5) * sign,
                            y
                        },
                        touchingSliceAt: {
                            x: x + distance * sign,
                            y
                        }
                    }
                };
            }
            /**
             * Overrides the pie translate method.
             * @private
             */
            translate() {
                const series = this, chart = series.chart, options = series.options, reversed = options.reversed, ignoreHiddenPoint = options.ignoreHiddenPoint, borderRadiusObject = BorderRadius.optionsToObject(options.borderRadius), plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, center = options.center, centerX = getLength(center[0], plotWidth), centerY = getLength(center[1], plotHeight), width = getLength(options.width, plotWidth), height = getLength(options.height, plotHeight), neckWidth = getLength(options.neckWidth, plotWidth), neckHeight = getLength(options.neckHeight, plotHeight), neckY = (centerY - height / 2) + height - neckHeight, points = series.points, borderRadius = relativeLength(borderRadiusObject.radius, width), radiusScope = borderRadiusObject.scope, half = (options.dataLabels.position === 'left' ?
                    1 :
                    0), roundingFactors = (angle) => {
                    const tan = Math.tan(angle / 2), cosA = Math.cos(alpha), sinA = Math.sin(alpha);
                    let r = borderRadius, t = r / tan, k = Math.tan((Math.PI - angle) / 3.2104);
                    if (t > maxT) {
                        t = maxT;
                        r = t * tan;
                    }
                    k *= r;
                    return {
                        dx: [t * cosA, (t - k) * cosA, t - k, t],
                        dy: [t * sinA, (t - k) * sinA, t - k, t]
                            .map((i) => (reversed ? -i : i))
                    };
                };
                let sum = 0, cumulative = 0, // Start at top
                tempWidth, path, fraction, alpha, // The angle between top and left point's edges
                maxT, x1, y1, x2, x3, y3, x4, y5;
                series.getWidthAt = function (y) {
                    const top = (centerY - height / 2);
                    return (y > neckY || height === neckHeight) ?
                        neckWidth :
                        neckWidth + (width - neckWidth) *
                            (1 - (y - top) / (height - neckHeight));
                };
                series.getX = function (y, half, point) {
                    return centerX + (half ? -1 : 1) *
                        ((series.getWidthAt(reversed ? 2 * centerY - y : y) / 2) +
                            (point.dataLabel?.dataLabelPosition?.distance ??
                                relativeLength(this.options.dataLabels?.distance || 0, width)));
                };
                // Expose
                series.center = [centerX, centerY, height];
                series.centerX = centerX;
                /*
                Individual point coordinate naming:

                x1,y1 _________________ x2,y1
                \                         /
                 \                       /
                  \                     /
                   \                   /
                    \                 /
                   x3,y3 _________ x4,y3

                Additional for the base of the neck:

                     |               |
                     |               |
                     |               |
                   x3,y5 _________ x4,y5

                */
                // get the total sum
                for (const point of points) {
                    if (point.y && point.isValid() &&
                        (!ignoreHiddenPoint || point.visible !== false)) {
                        sum += point.y;
                    }
                }
                for (const point of points) {
                    // Set start and end positions
                    y5 = null;
                    fraction = sum ? point.y / sum : 0;
                    y1 = centerY - height / 2 + cumulative * height;
                    y3 = y1 + fraction * height;
                    tempWidth = series.getWidthAt(y1);
                    x1 = centerX - tempWidth / 2;
                    x2 = x1 + tempWidth;
                    tempWidth = series.getWidthAt(y3);
                    x3 = centerX - tempWidth / 2;
                    x4 = x3 + tempWidth;
                    // The entire point is within the neck
                    if (correctFloat(y1) >= neckY) {
                        x1 = x3 = centerX - neckWidth / 2;
                        x2 = x4 = centerX + neckWidth / 2;
                        // The base of the neck
                    }
                    else if (y3 > neckY) {
                        y5 = y3;
                        tempWidth = series.getWidthAt(neckY);
                        x3 = centerX - tempWidth / 2;
                        x4 = x3 + tempWidth;
                        y3 = neckY;
                    }
                    if (reversed) {
                        y1 = 2 * centerY - y1;
                        y3 = 2 * centerY - y3;
                        if (y5 !== null) {
                            y5 = 2 * centerY - y5;
                        }
                    }
                    if (borderRadius && (radiusScope === 'point' ||
                        point.index === 0 ||
                        point.index === points.length - 1 ||
                        y5 !== null)) {
                        // Creating the path of funnel points with rounded corners
                        // (#18839)
                        const h = Math.abs(y3 - y1), xSide = x2 - x4, lBase = x4 - x3, lSide = Math.sqrt(xSide * xSide + h * h);
                        // If xSide equals zero, return Infinity to avoid dividing
                        // by zero (#20319)
                        alpha = Math.atan(xSide !== 0 ? h / xSide : Infinity);
                        maxT = lSide / 2;
                        if (y5 !== null) {
                            maxT = Math.min(maxT, Math.abs(y5 - y3) / 2);
                        }
                        if (lBase >= 1) {
                            maxT = Math.min(maxT, lBase / 2);
                        }
                        // Creating a point base
                        let f = roundingFactors(alpha);
                        if (radiusScope === 'stack' && point.index !== 0) {
                            path = [
                                ['M', x1, y1],
                                ['L', x2, y1]
                            ];
                        }
                        else {
                            path = [
                                ['M', x1 + f.dx[0], y1 + f.dy[0]],
                                [
                                    'C',
                                    x1 + f.dx[1], y1 + f.dy[1],
                                    x1 + f.dx[2], y1,
                                    x1 + f.dx[3], y1
                                ],
                                ['L', x2 - f.dx[3], y1],
                                [
                                    'C',
                                    x2 - f.dx[2], y1,
                                    x2 - f.dx[1], y1 + f.dy[1],
                                    x2 - f.dx[0], y1 + f.dy[0]
                                ]
                            ];
                        }
                        if (y5 !== null) {
                            // Closure of point with extension
                            const fr = roundingFactors(Math.PI / 2);
                            f = roundingFactors(Math.PI / 2 + alpha);
                            path.push(['L', x4 + f.dx[0], y3 - f.dy[0]], [
                                'C',
                                x4 + f.dx[1], y3 - f.dy[1],
                                x4, y3 + f.dy[2],
                                x4, y3 + f.dy[3]
                            ]);
                            if (radiusScope === 'stack' &&
                                point.index !== points.length - 1) {
                                path.push(['L', x4, y5], ['L', x3, y5]);
                            }
                            else {
                                path.push(['L', x4, y5 - fr.dy[3]], [
                                    'C',
                                    x4, y5 - fr.dy[2],
                                    x4 - fr.dx[2], y5,
                                    x4 - fr.dx[3], y5
                                ], ['L', x3 + fr.dx[3], y5], [
                                    'C',
                                    x3 + fr.dx[2], y5,
                                    x3, y5 - fr.dy[2],
                                    x3, y5 - fr.dy[3]
                                ]);
                            }
                            path.push(['L', x3, y3 + f.dy[3]], [
                                'C',
                                x3, y3 + f.dy[2],
                                x3 - f.dx[1], y3 - f.dy[1],
                                x3 - f.dx[0], y3 - f.dy[0]
                            ]);
                        }
                        else if (lBase >= 1) {
                            // Closure of point without extension
                            f = roundingFactors(Math.PI - alpha);
                            if (radiusScope === 'stack' && point.index === 0) {
                                path.push(['L', x4, y3], ['L', x3, y3]);
                            }
                            else {
                                path.push(['L', x4 + f.dx[0], y3 - f.dy[0]], [
                                    'C',
                                    x4 + f.dx[1], y3 - f.dy[1],
                                    x4 - f.dx[2], y3,
                                    x4 - f.dx[3], y3
                                ], ['L', x3 + f.dx[3], y3], [
                                    'C',
                                    x3 + f.dx[2], y3,
                                    x3 - f.dx[1], y3 - f.dy[1],
                                    x3 - f.dx[0], y3 - f.dy[0]
                                ]);
                            }
                        }
                        else {
                            // Creating a rounded tip of the "pyramid"
                            f = roundingFactors(Math.PI - alpha * 2);
                            path.push(['L', x3 + f.dx[0], y3 - f.dy[0]], [
                                'C',
                                x3 + f.dx[1], y3 - f.dy[1],
                                x3 - f.dx[1], y3 - f.dy[1],
                                x3 - f.dx[0], y3 - f.dy[0]
                            ]);
                        }
                    }
                    else {
                        // Creating the path of funnel points without rounded corners
                        path = [
                            ['M', x1, y1],
                            ['L', x2, y1],
                            ['L', x4, y3]
                        ];
                        if (y5 !== null) {
                            path.push(['L', x4, y5], ['L', x3, y5]);
                        }
                        path.push(['L', x3, y3]);
                    }
                    path.push(['Z']);
                    // Prepare for using shared dr
                    point.shapeType = 'path';
                    point.shapeArgs = { d: path };
                    // For tooltips and data labels
                    point.percentage = fraction * 100;
                    point.plotX = centerX;
                    point.plotY = (y1 + (y5 || y3)) / 2;
                    // Placement of tooltips and data labels
                    point.tooltipPos = [
                        centerX,
                        point.plotY
                    ];
                    point.dlBox = {
                        x: x3,
                        y: y1,
                        topWidth: x2 - x1,
                        bottomWidth: x4 - x3,
                        height: Math.abs(pick(y5, y3) - y1),
                        width: NaN
                    };
                    // Slice is a noop on funnel points
                    point.slice = noop;
                    // Mimicking pie data label placement logic
                    point.half = half;
                    if (point.isValid() &&
                        (!ignoreHiddenPoint || point.visible !== false)) {
                        cumulative += fraction;
                    }
                }
                fireEvent(series, 'afterTranslate');
            }
            /**
             * Funnel items don't have angles (#2289).
             * @private
             */
            sortByAngle(points) {
                points.sort((a, b) => (a.plotY - b.plotY));
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        FunnelSeries.defaultOptions = merge(PieSeries.defaultOptions, FunnelSeriesDefaults);
        extend(FunnelSeries.prototype, {
            animate: noop
        });
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (FunnelSeries) {
            /* *
             *
             *  Functions
             *
             * */
            /** @private */
            function compose(ChartClass) {
                if (pushUnique(composed, 'FunnelSeries')) {
                    addEvent(ChartClass, 'afterHideAllOverlappingLabels', onChartAfterHideAllOverlappingLabels);
                }
            }
            FunnelSeries.compose = compose;
            /** @private */
            function onChartAfterHideAllOverlappingLabels() {
                for (const series of this.series) {
                    let dataLabelsOptions = series.options && series.options.dataLabels;
                    if (isArray(dataLabelsOptions)) {
                        dataLabelsOptions = dataLabelsOptions[0];
                    }
                    if (series.is('pie') &&
                        series.placeDataLabels &&
                        dataLabelsOptions &&
                        !dataLabelsOptions.inside) {
                        series.placeDataLabels();
                    }
                }
            }
        })(FunnelSeries || (FunnelSeries = {}));
        SeriesRegistry.registerSeriesType('funnel', FunnelSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return FunnelSeries;
    });
    _registerModule(_modules, 'Series/Pyramid/PyramidSeriesDefaults.js', [], function () {
        /* *
         *
         *  Highcharts funnel module
         *
         *  (c) 2010-2024 Torstein Honsi
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
        const PyramidSeriesDefaults = {
            /**
             * The pyramid neck height is zero by default, as opposed to the funnel,
             * which shares the same layout logic.
             *
             * @since 3.0.10
             */
            neckHeight: '0%',
            /**
             * The pyramid neck width is zero by default, as opposed to the funnel,
             * which shares the same layout logic.
             *
             * @since 3.0.10
             */
            neckWidth: '0%',
            /**
             * The pyramid is reversed by default, as opposed to the funnel, which
             * shares the layout engine, and is not reversed.
             *
             * @since 3.0.10
             */
            reversed: true
        };
        /**
         * A `pyramid` series. If the [type](#series.pyramid.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.pyramid
         * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
         *            boostThreshold, boostBlending
         * @product   highcharts
         * @requires  modules/funnel
         * @apioption series.pyramid
         */
        /**
         * An array of data points for the series. For the `pyramid` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.pyramid.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        y: 9,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        y: 6,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|null|*>}
         * @extends   series.pie.data
         * @excluding sliced
         * @product   highcharts
         * @apioption series.pyramid.data
         */
        ''; // Keeps doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return PyramidSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Pyramid/PyramidSeries.js', [_modules['Series/Funnel/FunnelSeries.js'], _modules['Series/Pyramid/PyramidSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (FunnelSeries, PyramidSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  Highcharts funnel module
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Pyramid series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pyramid
         *
         * @augments Highcharts.Series
         */
        class PyramidSeries extends FunnelSeries {
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * A pyramid series is a special type of funnel, without neck and reversed
         * by default.
         *
         * @sample highcharts/demo/pyramid/
         *         Pyramid chart
         *
         * @extends      plotOptions.funnel
         * @product      highcharts
         * @requires     modules/funnel
         * @optionparent plotOptions.pyramid
         */
        PyramidSeries.defaultOptions = merge(FunnelSeries.defaultOptions, PyramidSeriesDefaults);
        SeriesRegistry.registerSeriesType('pyramid', PyramidSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return PyramidSeries;
    });
    _registerModule(_modules, 'masters/modules/funnel.src.js', [_modules['Core/Globals.js'], _modules['Series/Funnel/FunnelSeries.js']], function (Highcharts, FunnelSeries) {

        const G = Highcharts;
        FunnelSeries.compose(G.Chart);

        return Highcharts;
    });
}));
