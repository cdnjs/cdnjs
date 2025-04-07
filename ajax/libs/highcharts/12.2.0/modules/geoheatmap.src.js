/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/geoheatmap
 * @requires highcharts
 *
 * (c) 2009-2025
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/geoheatmap", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/geoheatmap"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ geoheatmap_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Series/GeoHeatmap/GeoHeatmapPoint.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Authors: Magdalena Gut, Piotr Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { map: { prototype: { pointClass: MapPoint } } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default()).seriesTypes;
const { isNumber } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
/* harmony default export */ const GeoHeatmap_GeoHeatmapPoint = (GeoHeatmapPoint);

;// ./code/es-modules/Series/InterpolationUtilities.js
/* *
 *
 *  (c) 2010-2025 Hubert Kozik
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { doc } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { defined, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
/* harmony default export */ const Series_InterpolationUtilities = (InterpolationUtilities);

;// ./code/es-modules/Series/GeoHeatmap/GeoHeatmapSeries.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Authors: Magdalena Gut, Piotr Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { animObject, stop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { noop } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { colorFromPoint: GeoHeatmapSeries_colorFromPoint, getContext: GeoHeatmapSeries_getContext } = Series_InterpolationUtilities;

const { seriesTypes: { map: MapSeries } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { addEvent, error, extend, isNumber: GeoHeatmapSeries_isNumber, isObject, merge, pick: GeoHeatmapSeries_pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
            const ctx = series.context || GeoHeatmapSeries_getContext(series), { canvas, colorAxis, image, chart, points } = series, [colsize, rowsize] = [
                GeoHeatmapSeries_pick(seriesOptions.colsize, 1),
                GeoHeatmapSeries_pick(seriesOptions.rowsize, 1)
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
                const { x, y } = topLeft, width = bottomRight.x - x, height = bottomRight.y - y, dimensions = {
                    x,
                    y,
                    width,
                    height
                };
                if (
                // Do not calculate new canvas if not necessary
                series.isDirtyCanvas ||
                    // Calculate new canvas if data is dirty
                    series.isDirtyData ||
                    // Always calculate new canvas for Orthographic projection
                    mapView.projection.options.name === 'Orthographic') {
                    const canvasWidth = canvas.width = ~~(360 / colsize) + 1, canvasHeight = canvas.height = ~~(180 / rowsize) + 1, canvasArea = canvasWidth * canvasHeight, pixelData = new Uint8ClampedArray(canvasArea * 4), 
                    // Guess if we have to round lon/lat with this data
                    { lat = 0, lon = 0 } = points[0].options, unEvenLon = lon % rowsize !== 0, unEvenLat = lat % colsize !== 0, getAdjustedLon = (unEvenLon ?
                        (lon) => (Math.round(lon / rowsize) * rowsize) :
                        (lon) => lon), getAdjustedLat = (unEvenLat ?
                        (lat) => (Math.round(lat / colsize) * colsize) :
                        (lat) => lat), pointsLen = points.length;
                    if (unEvenLon || unEvenLat) {
                        error('Highcharts Warning: For best performance,' +
                            ' lon/lat datapoints should spaced by a single ' +
                            'colsize/rowsize', false, series.chart, {
                            colsize: String(colsize),
                            rowsize: String(rowsize)
                        });
                    }
                    // Needed for tooltip
                    series.directTouch = false;
                    series.isDirtyCanvas = true;
                    // First pixelData represents the geo coordinates
                    for (let i = 0; i < pointsLen; i++) {
                        const p = points[i], { lon, lat } = p.options;
                        if (GeoHeatmapSeries_isNumber(lon) && GeoHeatmapSeries_isNumber(lat)) {
                            pixelData.set(GeoHeatmapSeries_colorFromPoint(p.value, p), scaledPointPos(getAdjustedLon(lon), getAdjustedLat(lat), canvasWidth, canvasHeight, colsize, rowsize) * 4);
                        }
                    }
                    const blur = series.getInterpolation().blur, blurFactor = blur === 0 ? 1 : blur * 11, upscaledWidth = ~~(canvasWidth * blurFactor), upscaledHeight = ~~(canvasHeight * blurFactor), projectedWidth = ~~width, projectedHeight = ~~height, img = new ImageData(pixelData, canvasWidth, canvasHeight);
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
                    0, 0, upscaledWidth, upscaledHeight // Scale it
                    );
                    // Add projection to upscaled ImageData
                    const projectedPixelData = this.getProjectedImageData(mapView, projectedWidth, projectedHeight, ctx.getImageData(0, 0, upscaledWidth, upscaledHeight), canvas, x, y);
                    canvas.width = projectedWidth;
                    canvas.height = projectedHeight;
                    ctx.putImageData(new ImageData(projectedPixelData, projectedWidth, projectedHeight), 0, 0);
                }
                if (image) {
                    if (chart.renderer.globalAnimation && chart.hasRendered) {
                        const startX = Number(image.attr('x')), startY = Number(image.attr('y')), startWidth = Number(image.attr('width')), startHeight = Number(image.attr('height'));
                        const step = (now, fx) => {
                            const pos = fx.pos;
                            image.attr({
                                x: (startX + (x - startX) * pos),
                                y: (startY + (y - startY) * pos),
                                width: (startWidth + (width - startWidth) * pos),
                                height: (startHeight + (height - startHeight) * pos)
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
        const projectedPixelData = new Uint8ClampedArray(projectedWidth * projectedHeight * 4), lambda = GeoHeatmapSeries_pick(mapView.projection.options.rotation?.[0], 0), widthFactor = canvas.width / 360, heightFactor = -1 * canvas.height / 180;
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
     * @since     11.2.0
     * @product   highmaps
     */
    interpolation: {
        /**
         * Enable or disable the interpolation of the geoheatmap series.
         *
         * @since 11.2.0
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
         * @since  11.2.0
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
    pointClass: GeoHeatmap_GeoHeatmapPoint,
    pointArrayMap: ['lon', 'lat', 'value'],
    kdAxisArray: ['lon', 'lat'] // Search k-d-tree by lon/lat values
});
highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default().registerSeriesType('geoheatmap', GeoHeatmapSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const GeoHeatmap_GeoHeatmapSeries = ((/* unused pure expression or super */ null && (GeoHeatmapSeries)));
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

;// ./code/es-modules/masters/modules/geoheatmap.src.js




/* harmony default export */ const geoheatmap_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});