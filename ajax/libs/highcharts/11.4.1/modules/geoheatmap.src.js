/**
 * @license Highcharts JS v11.4.1 (2024-04-04)
 *
 * (c) 2009-2024
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/geoheatmap', ['highcharts'], function (Highcharts) {
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/GeoHeatmap/GeoHeatmapPoint.js', [_modules['Core/Utilities.js'], _modules['Core/Series/SeriesRegistry.js']], function (U, SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Authors: Magdalena Gut, Piotr Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { map: { prototype: { pointClass: MapPoint } } } = SeriesRegistry.seriesTypes;
        const { isNumber } = U;
        /* *
         *
         *  Class
         *
         * */
        class GeoHeatmapPoint extends MapPoint {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            applyOptions(options, x) {
                const point = super.applyOptions.call(this, options, x), { lat, lon } = point.options;
                if (isNumber(lon) && isNumber(lat)) {
                    const { colsize = 1, rowsize = 1 } = this.series.options, x1 = lon - colsize / 2, y1 = lat - rowsize / 2;
                    point.geometry = point.options.geometry = {
                        type: 'Polygon',
                        // A rectangle centered in lon/lat
                        coordinates: [
                            [
                                [x1, y1],
                                [x1 + colsize, y1],
                                [x1 + colsize, y1 + rowsize],
                                [x1, y1 + rowsize],
                                [x1, y1]
                            ]
                        ]
                    };
                }
                return point;
                /* eslint-enable valid-jsdoc */
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return GeoHeatmapPoint;
    });
    _registerModule(_modules, 'Series/InterpolationUtilities.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Hubert Kozik
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { defined, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Find color of point based on color axis.
         *
         * @function Highcharts.colorFromPoint
         *
         * @param {number | null} value
         *        Value to find corresponding color on the color axis.
         *
         * @param {Highcharts.Point} point
         *        Point to find it's color from color axis.
         *
         * @return {number[]}
         *        Color in RGBa array.
         */
        function colorFromPoint(value, point) {
            const colorAxis = point.series.colorAxis;
            if (colorAxis) {
                const rgba = (colorAxis.toColor(value || 0, point)
                    .split(')')[0]
                    .split('(')[1]
                    .split(',')
                    .map((s) => pick(parseFloat(s), parseInt(s, 10))));
                rgba[3] = pick(rgba[3], 1.0) * 255;
                if (!defined(value) || !point.visible) {
                    rgba[3] = 0;
                }
                return rgba;
            }
            return [0, 0, 0, 0];
        }
        /**
         * Method responsible for creating a canvas for interpolation image.
         * @private
         */
        function getContext(series) {
            const { canvas, context } = series;
            if (canvas && context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            else {
                series.canvas = doc.createElement('canvas');
                series.context = series.canvas.getContext('2d', {
                    willReadFrequently: true
                }) || void 0;
                return series.context;
            }
            return context;
        }
        const InterpolationUtilities = {
            colorFromPoint,
            getContext
        };

        return InterpolationUtilities;
    });
    _registerModule(_modules, 'Series/GeoHeatmap/GeoHeatmapSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Series/GeoHeatmap/GeoHeatmapPoint.js'], _modules['Core/Globals.js'], _modules['Series/InterpolationUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (A, GeoHeatmapPoint, H, IU, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Authors: Magdalena Gut, Piotr Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject, stop } = A;
        const { noop } = H;
        const { colorFromPoint, getContext } = IU;
        const { seriesTypes: { map: MapSeries } } = SeriesRegistry;
        const { addEvent, extend, isNumber, isObject, merge, pick } = U;
        /**
         * Normalize longitute value to -180:180 range.
         * @private
         */
        function normalizeLonValue(lon) {
            return lon - Math.floor((lon + 180) / 360) * 360;
        }
        /**
         * Get proper point's position for PixelData array.
         * @private
         */
        function scaledPointPos(lon, lat, canvasWidth, canvasHeight, colsize, rowsize) {
            return Math.ceil((canvasWidth * (canvasHeight - 1 - (lat + 90) / rowsize)) +
                ((lon + 180) / colsize));
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Geo Heatmap series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.geoheatmap
         *
         * @augments Highcharts.Series
         */
        class GeoHeatmapSeries extends MapSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.isDirtyCanvas = true;
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * For updated colsize and rowsize options
             * @private
             */
            update() {
                const series = this;
                series.options = merge(series.options, arguments[0]);
                if (series.getInterpolation().enabled) {
                    series.isDirtyCanvas = true;
                    series.points.forEach((point) => {
                        if (point.graphic) {
                            point.graphic.destroy();
                            delete point.graphic;
                        }
                    });
                }
                super.update.apply(series, arguments);
            }
            /**
             * Override translate method to not fire if not needed.
             * @private
             */
            translate() {
                if (this.getInterpolation().enabled &&
                    this.image &&
                    !this.isDirty &&
                    !this.isDirtyData) {
                    return;
                }
                super.translate.apply(this, arguments);
            }
            /**
             * Create the extended object out of the boolean
             * @private
             */
            getInterpolation() {
                if (!isObject(this.options.interpolation)) {
                    return {
                        blur: 1,
                        enabled: this.options.interpolation
                    };
                }
                return this.options.interpolation;
            }
            /**
             * Overriding drawPoints original method to apply new features.
             * @private
             */
            drawPoints() {
                const series = this, chart = series.chart, mapView = chart.mapView, seriesOptions = series.options;
                if (series.getInterpolation().enabled && mapView && series.bounds) {
                    const ctx = series.context || getContext(series), { canvas, colorAxis, image, chart, points } = series, [colsize, rowsize] = [
                        pick(seriesOptions.colsize, 1),
                        pick(seriesOptions.rowsize, 1)
                    ], 
                    // Calculate dimensions based on series bounds
                    topLeft = mapView.projectedUnitsToPixels({
                        x: series.bounds.x1,
                        y: series.bounds.y2
                    }), bottomRight = mapView.projectedUnitsToPixels({
                        x: series.bounds.x2,
                        y: series.bounds.y1
                    });
                    if (canvas && ctx && colorAxis && topLeft && bottomRight) {
                        const dimensions = {
                            x: topLeft.x,
                            y: topLeft.y,
                            width: bottomRight.x - topLeft.x,
                            height: bottomRight.y - topLeft.y
                        };
                        if (
                        // Do not calculate new canvas if not necessary
                        series.isDirtyCanvas ||
                            // Calculate new canvas if data is dirty
                            series.isDirtyData ||
                            // Always calculate new canvas for Orthographic projection
                            mapView.projection.options.name === 'Orthographic') {
                            series.isDirtyCanvas = true;
                            const canvasWidth = canvas.width = ~~(360 / colsize) + 1, canvasHeight = canvas.height = ~~(180 / rowsize) + 1, canvasArea = canvasWidth * canvasHeight, pixelData = new Uint8ClampedArray(canvasArea * 4);
                            series.directTouch = false; // Needed for tooltip
                            // First pixelData represents the geo coordinates
                            for (let i = 0; i < points.length; i++) {
                                const p = points[i], sourceArr = new Uint8ClampedArray(colorFromPoint(p.value, p)), { lon, lat } = p.options;
                                if (isNumber(lon) && isNumber(lat)) {
                                    pixelData.set(sourceArr, scaledPointPos(lon, lat, canvasWidth, canvasHeight, colsize, rowsize) * 4);
                                }
                            }
                            const blur = series.getInterpolation().blur, blurFactor = blur === 0 ? 1 : blur * 11, upscaledWidth = ~~(canvasWidth * blurFactor), upscaledHeight = ~~(canvasHeight * blurFactor), projectedWidth = ~~dimensions.width, projectedHeight = ~~dimensions.height, img = new ImageData(pixelData, canvasWidth, canvasHeight);
                            canvas.width = upscaledWidth;
                            canvas.height = upscaledHeight;
                            // Next step is to upscale pixelData to big image to get
                            // the blur on the interpolation
                            ctx.putImageData(img, 0, 0);
                            // Now we have an unscaled version of our ImageData
                            // let's make the compositing mode to 'copy' so that
                            // our next drawing op erases whatever was there
                            // previously just like putImageData would have done
                            ctx.globalCompositeOperation = 'copy';
                            // Now we can draw ourself over ourself
                            ctx.drawImage(canvas, 0, 0, img.width, img.height, // Grab the ImageData
                            0, 0, canvas.width, canvas.height // Scale it
                            );
                            // Add projection to upscaled ImageData
                            const cartesianImageData = ctx.getImageData(0, 0, canvas.width, canvas.height), projectedPixelData = this.getProjectedImageData(mapView, projectedWidth, projectedHeight, cartesianImageData, canvas, dimensions.x, dimensions.y), projectedImg = new ImageData(projectedPixelData, projectedWidth, projectedHeight);
                            ctx.globalCompositeOperation = 'copy';
                            canvas.width = projectedWidth;
                            canvas.height = projectedHeight;
                            ctx.putImageData(projectedImg, 0, 0);
                        }
                        if (image) {
                            if (chart.renderer.globalAnimation && chart.hasRendered) {
                                const startX = Number(image.attr('x')), startY = Number(image.attr('y')), startWidth = Number(image.attr('width')), startHeight = Number(image.attr('height'));
                                const step = (now, fx) => {
                                    image.attr({
                                        x: (startX + (dimensions.x - startX) * fx.pos),
                                        y: (startY + (dimensions.y - startY) * fx.pos),
                                        width: (startWidth + (dimensions.width - startWidth) * fx.pos),
                                        height: (startHeight + (dimensions.height - startHeight) * fx.pos)
                                    });
                                };
                                const animOptions = merge(animObject(chart.renderer.globalAnimation)), userStep = animOptions.step;
                                animOptions.step =
                                    function () {
                                        if (userStep) {
                                            userStep.apply(this, arguments);
                                        }
                                        step.apply(this, arguments);
                                    };
                                image
                                    .attr(merge({ animator: 0 }, series.isDirtyCanvas ? {
                                    href: canvas.toDataURL('image/png', 1)
                                } : void 0))
                                    .animate({ animator: 1 }, animOptions);
                                // When dragging or first rendering, animation is off
                            }
                            else {
                                stop(image);
                                image.attr(merge(dimensions, series.isDirtyCanvas ? {
                                    href: canvas.toDataURL('image/png', 1)
                                } : void 0));
                            }
                        }
                        else {
                            series.image = chart.renderer.image(canvas.toDataURL('image/png', 1))
                                .attr(dimensions)
                                .add(series.group);
                        }
                        series.isDirtyCanvas = false;
                    }
                }
                else {
                    super.drawPoints.apply(series, arguments);
                }
            }
            /**
             * Project ImageData to actual mapView projection used on a chart.
             * @private
             */
            getProjectedImageData(mapView, projectedWidth, projectedHeight, cartesianImageData, canvas, horizontalShift, verticalShift) {
                const projectedPixelData = new Uint8ClampedArray(projectedWidth * projectedHeight * 4), lambda = pick(mapView.projection.options.rotation?.[0], 0), widthFactor = canvas.width / 360, heightFactor = -1 * canvas.height / 180;
                let y = -1;
                // For each pixel on the map plane, find the map
                // coordinate and get the color value
                for (let i = 0; i < projectedPixelData.length; i += 4) {
                    const x = (i / 4) % projectedWidth;
                    if (x === 0) {
                        y++;
                    }
                    const projectedCoords = mapView.pixelsToLonLat({
                        x: horizontalShift + x,
                        y: verticalShift + y
                    });
                    if (projectedCoords) {
                        // Normalize lon values
                        if (projectedCoords.lon > -180 - lambda &&
                            projectedCoords.lon < 180 - lambda) {
                            projectedCoords.lon =
                                normalizeLonValue(projectedCoords.lon);
                        }
                        const projected = [
                            projectedCoords.lon,
                            projectedCoords.lat
                        ], cvs2PixelX = projected[0] * widthFactor + canvas.width / 2, cvs2PixelY = projected[1] * heightFactor +
                            canvas.height / 2;
                        if (cvs2PixelX >= 0 &&
                            cvs2PixelX <= canvas.width &&
                            cvs2PixelY >= 0 &&
                            cvs2PixelY <= canvas.height) {
                            const redPos = (
                            // Rows
                            Math.floor(cvs2PixelY) *
                                canvas.width * 4 +
                                // Columns
                                Math.round(cvs2PixelX) * 4);
                            projectedPixelData[i] =
                                cartesianImageData.data[redPos];
                            projectedPixelData[i + 1] =
                                cartesianImageData.data[redPos + 1];
                            projectedPixelData[i + 2] =
                                cartesianImageData.data[redPos + 2];
                            projectedPixelData[i + 3] =
                                cartesianImageData.data[redPos + 3];
                        }
                    }
                }
                return projectedPixelData;
            }
            searchPoint(e, compareX) {
                const series = this, chart = this.chart, mapView = chart.mapView;
                if (mapView &&
                    series.bounds &&
                    series.image &&
                    chart.tooltip &&
                    chart.tooltip.options.enabled) {
                    if (
                    // If user drags map do not build k-d-tree
                    !chart.pointer.hasDragged &&
                        // If user zooms in/out map do not build k-d-tree
                        (+series.image.attr('animator') <= 0.01 ||
                            +series.image.attr('animator') >= 0.99)) {
                        const topLeft = mapView.projectedUnitsToPixels({
                            x: series.bounds.x1,
                            y: series.bounds.y2
                        }), bottomRight = mapView.projectedUnitsToPixels({
                            x: series.bounds.x2,
                            y: series.bounds.y1
                        });
                        chart.pointer.normalize(e);
                        if (e.lon && e.lat &&
                            topLeft && bottomRight &&
                            e.chartX - chart.plotLeft > topLeft.x &&
                            e.chartX - chart.plotLeft < bottomRight.x &&
                            e.chartY - chart.plotTop > topLeft.y &&
                            e.chartY - chart.plotTop < bottomRight.y) {
                            return this.searchKDTree({
                                clientX: e.chartX,
                                lon: normalizeLonValue(e.lon),
                                lat: e.lat
                            }, compareX, e);
                        }
                    }
                    else {
                        chart.tooltip.destroy();
                    }
                }
            }
        }
        /**
         * A `geoheatmap` series is a variety of heatmap series, composed into
         * the map projection, where the units are expressed in the latitude
         * and longitude, and individual values contained in a matrix are
         * represented as colors.
         *
         * @sample maps/demo/geoheatmap-europe/
         *         GeoHeatmap Chart with interpolation on Europe map
         * @sample maps/series-geoheatmap/geoheatmap-equalearth/
         *         GeoHeatmap Chart on the Equal Earth Projection
         *
         * @extends      plotOptions.map
         * @since        11.0.0
         * @product      highmaps
         * @excluding    allAreas, dragDrop, findNearestPointBy, geometry, joinBy,
         * negativeColor, onPoint, stickyTracking
         * @requires     modules/geoheatmap
         * @optionparent plotOptions.geoheatmap
         */
        GeoHeatmapSeries.defaultOptions = merge(MapSeries.defaultOptions, {
            nullColor: 'transparent',
            tooltip: {
                pointFormat: 'Lat: {point.lat}, Lon: {point.lon}, Value: {point.value}<br/>'
            },
            /**
             * The border width of each geoheatmap tile.
             *
             * In styled mode, the border stroke width is given in the
             * `.highcharts-point` class.
             *
             * @sample maps/demo/geoheatmap-orthographic/
             *         borderWidth set to 1 to create a grid
             *
             * @type      {number|null}
             * @default   0
             * @product   highmaps
             * @apioption plotOptions.geoheatmap.borderWidth
             */
            borderWidth: 0,
            /**
             * The column size - how many longitude units each column in the
             * geoheatmap should span.
             *
             * @sample maps/demo/geoheatmap-europe/
             *         1 by default, set to 5
             *
             * @type      {number}
             * @default   1
             * @since 11.0.0
             * @product   highmaps
             * @apioption plotOptions.geoheatmap.colsize
             */
            colsize: 1,
            /**
             * The main color of the series. In heat maps this color is rarely
             * used, as we mostly use the color to denote the value of each
             * point. Unless options are set in the [colorAxis](#colorAxis), the
             * default value is pulled from the [options.colors](#colors) array.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since 11.0.0
             * @product   highmaps
             * @apioption plotOptions.geoheatmap.color
             */
            /**
             * The rowsize size - how many latitude units each row in the
             * geoheatmap should span.
             *
             * @sample maps/demo/geoheatmap-europe/
             *         1 by default, set to 5
             *
             * @type      {number}
             * @default   1
             * @since 11.0.0
             * @product   highmaps
             * @apioption plotOptions.geoheatmap.rowsize
             */
            rowsize: 1,
            stickyTracking: true,
            /**
             * Make the geoheatmap render its data points as an interpolated
             * image. It can be used to show a Temperature Map-like charts.
             *
             * @sample maps/demo/geoheatmap-earth-statistics
             *         Advanced demo of GeoHeatmap interpolation with multiple
             *         datasets
             *
             * @type      {boolean|Highcharts.InterpolationOptionsObject}
             * @since     @next
             * @product   highmaps
             */
            interpolation: {
                /**
                 * Enable or disable the interpolation of the geoheatmap series.
                 *
                 * @since     @next
                 */
                enabled: false,
                /**
                 * Represents how much blur should be added to the interpolated
                 * image. Works best in the range of 0-1, all higher values
                 * would need a lot more performance of the machine to calculate
                 * more detailed interpolation.
                 *
                 *  * **Note:** Useful, if the data is spread into wide range of
                 *  longitude and latitude values.
                 *
                 * @sample maps/series-geoheatmap/turkey-fire-areas
                 *         Simple demo of GeoHeatmap interpolation
                 *
                 * @since     @next
                 */
                blur: 1
            }
        });
        addEvent(GeoHeatmapSeries, 'afterDataClassLegendClick', function () {
            this.isDirtyCanvas = true;
            this.drawPoints();
        });
        extend(GeoHeatmapSeries.prototype, {
            type: 'geoheatmap',
            applyJitter: noop,
            pointClass: GeoHeatmapPoint,
            pointArrayMap: ['lon', 'lat', 'value'],
            kdAxisArray: ['lon', 'lat'] // Search k-d-tree by lon/lat values
        });
        SeriesRegistry.registerSeriesType('geoheatmap', GeoHeatmapSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A `geoheatmap` series. If the [type](#series.map.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.geoheatmap
         * @excluding allAreas, dataParser, dataURL, dragDrop, findNearestPointBy,
         *            joinBy, marker, mapData, negativeColor, onPoint, shadow,
         *            stickyTracking
         * @product   highmaps
         * @apioption series.geoheatmap
         */
        /**
         * An array of data points for the series. For the `geoheatmap` series
         * type, points can be given in the following ways:
         *
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         * correspond to `lon,lat,value`. The `value` refers to the color on the `colorAxis`.
         *
         *  ```js
         *     data: [
         *         [51.50, -0.12, 7],
         *         [54.59, -5.93, 4],
         *         [55.8, -4.25, 3]
         *     ]
         *  ```
         *
         * 2.  An array of objects with named values. The following snippet shows only a
         * few settings, see the complete options set below. If the total number of data
         * points exceeds the series' [turboThreshold](#series.heatmap.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         lat: 51.50,
         *         lon: -0.12,
         *         value: 7,
         *         name: "London"
         *     }, {
         *         lat: 54.59,
         *         lon: -5.93,
         *         value: 4,
         *         name: "Belfast"
         *     }]
         *  ```
         *
         * @sample maps/demo/geoheatmap-europe/
         *         GeoHeatmap Chart with interpolation on Europe map
         * @sample maps/series-geoheatmap/geoheatmap-equalearth/
         *         GeoHeatmap Chart on the Equal Earth Projection
         *
         * @type      {Array<Array<number>|*>}
         * @extends   series.map.data
         * @product   highmaps
         * @apioption series.geoheatmap.data
         */
        /**
         * Individual color for the point. By default the color is either used
         * to denote the value, or pulled from the global `colors` array.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highmaps
         * @apioption series.geoheatmap.data.color
         */
        /**
         * The value of the point, resulting in a color controlled by options
         * as set in the [colorAxis](#colorAxis) configuration.
         *
         * @type      {number|null}
         * @product   highmaps
         * @apioption series.geoheatmap.data.value
         */
        /**
         * Detailed options for interpolation object.
         *
         * @interface Highcharts.InterpolationOptionsObject
         */ /**
        *  Enable or disable the interpolation.
        *
        * @name Highcharts.InterpolationOptionsObject#enabled
        * @type {boolean}
        */ /**
        * Represents how much blur should be added to the interpolated
        * image. Works best in the range of 0-1, all higher values
        * would need a lot more performance of the machine to calculate
        * more detailed interpolation.
        *
        * @name Highcharts.InterpolationOptionsObject#blur
        * @type {number}
        */
        ''; // Adds doclets above to the transpiled file

        return GeoHeatmapSeries;
    });
    _registerModule(_modules, 'masters/modules/geoheatmap.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));