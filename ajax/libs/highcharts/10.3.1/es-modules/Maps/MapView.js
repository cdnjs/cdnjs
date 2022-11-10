/* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import defaultOptions from './MapViewOptionsDefault.js';
import defaultInsetsOptions from './MapViewInsetsOptionsDefault.js';
import GeoJSONModule from '../Extensions/GeoJSON.js';
var topo2geo = GeoJSONModule.topo2geo;
import MapChart from '../Core/Chart/MapChart.js';
var maps = MapChart.maps;
import MU from './MapUtilities.js';
var boundsFromPath = MU.boundsFromPath, pointInPolygon = MU.pointInPolygon;
import Projection from './Projection.js';
import U from '../Core/Utilities.js';
var addEvent = U.addEvent, clamp = U.clamp, fireEvent = U.fireEvent, isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject, isString = U.isString, merge = U.merge, pick = U.pick, relativeLength = U.relativeLength;
/**
 * The world size in terms of 10k meters in the Web Mercator projection, to
 * match a 256 square tile to zoom level 0.
 * @private
 */
var worldSize = 400.979322;
var tileSize = 256;
// Compute the zoom from given bounds and the size of the playing field. Used in
// two places, hence the local function.
var zoomFromBounds = function (b, playingField) {
    var width = playingField.width, height = playingField.height, scaleToField = Math.max((b.x2 - b.x1) / (width / tileSize), (b.y2 - b.y1) / (height / tileSize));
    return Math.log(worldSize / scaleToField) / Math.log(2);
};
/*
const mergeCollections = <
    T extends Array<AnyRecord|undefined>
>(a: T, b: T): T => {
    b.forEach((newer, i): void => {
        // Only merge by id supported for now. We may consider later to support
        // more complex rules like those of `Chart.update` with `oneToOne`, but
        // it is probably not needed. Existing insets can be disabled by
        // overwriting the `geoBounds` with empty data.
        if (newer && isString(newer.id)) {
            const older = U.find(
                a,
                (aItem): boolean => (aItem && aItem.id) === newer.id
            );
            if (older) {
                const aIndex = a.indexOf(older);
                a[aIndex] = merge(older, newer);
            }
        }
    });
    return a;
};
*/
/**
 * The map view handles zooming and centering on the map, and various
 * client-side projection capabilities.
 *
 * On a chart instance, the map view is available as `chart.mapView`.
 *
 * @class
 * @name Highcharts.MapView
 *
 * @param {Highcharts.Chart} chart
 *        The Chart instance
 * @param {Highcharts.MapViewOptions} options
 *        MapView options
 */
var MapView = /** @class */ (function () {
    function MapView(chart, options) {
        var _this = this;
        this.insets = [];
        this.padding = [0, 0, 0, 0];
        this.eventsToUnbind = [];
        var recommendedMapView;
        var recommendedProjection;
        if (!(this instanceof MapViewInset)) {
            // Handle the global map and series-level mapData
            var geoMaps = __spreadArray([
                chart.options.chart.map
            ], (chart.options.series || []).map(function (s) { return s.mapData; }), true).map(function (mapData) { return _this.getGeoMap(mapData); });
            var allGeoBounds_1 = [];
            geoMaps.forEach(function (geoMap) {
                if (geoMap) {
                    // Use the first geo map as main
                    if (!recommendedMapView) {
                        recommendedMapView = geoMap['hc-recommended-mapview'];
                    }
                    // Combine the bounding boxes of all loaded maps
                    if (geoMap.bbox) {
                        var _a = geoMap.bbox, x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
                        allGeoBounds_1.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
                    }
                }
            });
            // Get the composite bounds
            var geoBounds = (allGeoBounds_1.length &&
                MapView.compositeBounds(allGeoBounds_1));
            // Provide a best-guess recommended projection if not set in the map
            // or in user options
            if (geoBounds) {
                var x1 = geoBounds.x1, y1 = geoBounds.y1, x2 = geoBounds.x2, y2 = geoBounds.y2;
                recommendedProjection = (x2 - x1 > 180 && y2 - y1 > 90) ?
                    // Wide angle, go for the world view
                    {
                        name: 'EqualEarth'
                    } :
                    // Narrower angle, use a projection better suited for local
                    // view
                    {
                        name: 'LambertConformalConic',
                        parallels: [y1, y2],
                        rotation: [-(x1 + x2) / 2]
                    };
            }
            // Register the main geo map (from options.chart.map) if set
            this.geoMap = geoMaps[0];
        }
        this.userOptions = options || {};
        var o = merge(defaultOptions, { projection: recommendedProjection }, recommendedMapView, options);
        // Merge the inset collections by id, or index if id missing
        var recInsets = recommendedMapView && recommendedMapView.insets, optInsets = options && options.insets;
        if (recInsets && optInsets) {
            o.insets = MapView.mergeInsets(recInsets, optInsets);
        }
        this.chart = chart;
        /**
         * The current center of the view in terms of `[longitude, latitude]`.
         * @name Highcharts.MapView#center
         * @readonly
         * @type {LonLatArray}
         */
        this.center = o.center;
        this.options = o;
        this.projection = new Projection(o.projection);
        // Initialize with full plot box so we don't have to check for undefined
        // every time we use it
        this.playingField = chart.plotBox;
        /**
         * The current zoom level of the view.
         * @name Highcharts.MapView#zoom
         * @readonly
         * @type {number}
         */
        this.zoom = o.zoom || 0;
        // Create the insets
        this.createInsets();
        // Initialize and respond to chart size changes
        this.eventsToUnbind.push(addEvent(chart, 'afterSetChartSize', function () {
            _this.playingField = _this.getField();
            if (_this.minZoom === void 0 || // When initializing the chart
                _this.minZoom === _this.zoom // When resizing the chart
            ) {
                _this.fitToBounds(void 0, void 0, false);
                if (
                // Set zoom only when initializing the chart
                // (do not overwrite when zooming in/out, #17082)
                !_this.chart.hasRendered &&
                    isNumber(_this.userOptions.zoom)) {
                    _this.zoom = _this.userOptions.zoom;
                }
                if (_this.userOptions.center) {
                    merge(true, _this.center, _this.userOptions.center);
                }
            }
        }));
        this.setUpEvents();
    }
    // Merge two collections of insets by the id
    MapView.mergeInsets = function (a, b) {
        var toObject = function (insets) {
            var ob = {};
            insets.forEach(function (inset, i) {
                ob[inset && inset.id || "i".concat(i)] = inset;
            });
            return ob;
        };
        var insetsObj = merge(toObject(a), toObject(b)), insets = Object
            .keys(insetsObj)
            .map(function (key) { return insetsObj[key]; });
        return insets;
    };
    // Create MapViewInset instances from insets options
    MapView.prototype.createInsets = function () {
        var _this = this;
        var options = this.options, insets = options.insets;
        if (insets) {
            insets.forEach(function (item) {
                var inset = new MapViewInset(_this, merge(options.insetOptions, item));
                _this.insets.push(inset);
            });
        }
    };
    /**
     * Fit the view to given bounds
     *
     * @function Highcharts.MapView#fitToBounds
     * @param {Object} bounds
     *        Bounds in terms of projected units given as  `{ x1, y1, x2, y2 }`.
     *        If not set, fit to the bounds of the current data set
     * @param {number|string} [padding=0]
     *        Padding inside the bounds. A number signifies pixels, while a
     *        percentage string (like `5%`) can be used as a fraction of the
     *        plot area size.
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart immediately
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        What animation to use for redraw
     */
    MapView.prototype.fitToBounds = function (bounds, padding, redraw, animation) {
        if (redraw === void 0) { redraw = true; }
        var b = bounds || this.getProjectedBounds();
        if (b) {
            var pad = pick(padding, bounds ? 0 : this.options.padding), fullField = this.getField(false), padArr = isArray(pad) ? pad : [pad, pad, pad, pad];
            this.padding = [
                relativeLength(padArr[0], fullField.height),
                relativeLength(padArr[1], fullField.width),
                relativeLength(padArr[2], fullField.height),
                relativeLength(padArr[3], fullField.width)
            ];
            // Apply the playing field, corrected with padding
            this.playingField = this.getField();
            var zoom = zoomFromBounds(b, this.playingField);
            // Reset minZoom when fitting to natural bounds
            if (!bounds) {
                this.minZoom = zoom;
            }
            var center = this.projection.inverse([
                (b.x2 + b.x1) / 2,
                (b.y2 + b.y1) / 2
            ]);
            this.setView(center, zoom, redraw, animation);
        }
    };
    MapView.prototype.getField = function (padded) {
        if (padded === void 0) { padded = true; }
        var padding = padded ? this.padding : [0, 0, 0, 0];
        return {
            x: padding[3],
            y: padding[0],
            width: this.chart.plotWidth - padding[1] - padding[3],
            height: this.chart.plotHeight - padding[0] - padding[2]
        };
    };
    MapView.prototype.getGeoMap = function (map) {
        if (isString(map)) {
            return maps[map];
        }
        if (isObject(map, true)) {
            if (map.type === 'FeatureCollection') {
                return map;
            }
            if (map.type === 'Topology') {
                return topo2geo(map);
            }
        }
    };
    MapView.prototype.getMapBBox = function () {
        var bounds = this.getProjectedBounds(), scale = this.getScale();
        if (bounds) {
            var padding = this.padding, p1 = this.projectedUnitsToPixels({
                x: bounds.x1,
                y: bounds.y2
            }), width = ((bounds.x2 - bounds.x1) * scale +
                padding[1] + padding[3]), height = ((bounds.y2 - bounds.y1) * scale +
                padding[0] + padding[2]);
            return {
                width: width,
                height: height,
                x: p1.x - padding[3],
                y: p1.y - padding[0]
            };
        }
    };
    MapView.prototype.getProjectedBounds = function () {
        var allBounds = this.chart.series.reduce(function (acc, s) {
            var bounds = s.getProjectedBounds && s.getProjectedBounds();
            if (bounds &&
                s.options.affectsMapView !== false) {
                acc.push(bounds);
            }
            return acc;
        }, []);
        return this.projection.bounds || MapView.compositeBounds(allBounds);
    };
    MapView.prototype.getScale = function () {
        // A zoom of 0 means the world (360x360 degrees) fits in a 256x256 px
        // tile
        return (tileSize / worldSize) * Math.pow(2, this.zoom);
    };
    // Calculate the SVG transform to be applied to series groups
    MapView.prototype.getSVGTransform = function () {
        var _a = this.playingField, x = _a.x, y = _a.y, width = _a.width, height = _a.height, projectedCenter = this.projection.forward(this.center), flipFactor = this.projection.hasCoordinates ? -1 : 1, scaleX = this.getScale(), scaleY = scaleX * flipFactor, translateX = x + width / 2 - projectedCenter[0] * scaleX, translateY = y + height / 2 - projectedCenter[1] * scaleY;
        return { scaleX: scaleX, scaleY: scaleY, translateX: translateX, translateY: translateY };
    };
    /**
     * Convert map coordinates in longitude/latitude to pixels
     *
     * @function Highcharts.MapView#lonLatToPixels
     * @since 10.0.0
     * @param  {Highcharts.MapLonLatObject} lonLat
     *         The map coordinates
     * @return {Highcharts.PositionObject|undefined}
     *         The pixel position
     */
    MapView.prototype.lonLatToPixels = function (lonLat) {
        var pos = this.lonLatToProjectedUnits(lonLat);
        if (pos) {
            return this.projectedUnitsToPixels(pos);
        }
    };
    /**
     * Get projected units from longitude/latitude. Insets are accounted for.
     * Returns an object with x and y values corresponding to positions on the
     * projected plane.
     *
     * @requires modules/map
     *
     * @function Highcharts.MapView#lonLatToProjectedUnits
     *
     * @since 10.0.0
     * @sample maps/series/latlon-to-point/ Find a point from lon/lat
     *
     * @param {Highcharts.MapLonLatObject} lonLat Coordinates.
     *
     * @return {Highcharts.ProjectedXY} X and Y coordinates in terms of
     *      projected values
     */
    MapView.prototype.lonLatToProjectedUnits = function (lonLat) {
        var chart = this.chart, mapTransforms = chart.mapTransforms;
        // Legacy, built-in transforms
        if (mapTransforms) {
            for (var transform in mapTransforms) {
                if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                    mapTransforms[transform].hitZone) {
                    var coords = chart.transformFromLatLon(lonLat, mapTransforms[transform]);
                    if (coords && pointInPolygon(coords, mapTransforms[transform].hitZone.coordinates[0])) {
                        return coords;
                    }
                }
            }
            return chart.transformFromLatLon(lonLat, mapTransforms['default'] // eslint-disable-line dot-notation
            );
        }
        // Handle insets
        for (var _i = 0, _a = this.insets; _i < _a.length; _i++) {
            var inset = _a[_i];
            if (inset.options.geoBounds &&
                pointInPolygon({ x: lonLat.lon, y: lonLat.lat }, inset.options.geoBounds.coordinates[0])) {
                var insetProjectedPoint = inset.projection.forward([lonLat.lon, lonLat.lat]), pxPoint = inset.projectedUnitsToPixels({ x: insetProjectedPoint[0], y: insetProjectedPoint[1] });
                return this.pixelsToProjectedUnits(pxPoint);
            }
        }
        var point = this.projection.forward([lonLat.lon, lonLat.lat]);
        if (!point.outside) {
            return { x: point[0], y: point[1] };
        }
    };
    /**
     * Calculate longitude/latitude values for a point or position. Returns an
     * object with the numeric properties `lon` and `lat`.
     *
     * @requires modules/map
     *
     * @function Highcharts.MapView#projectedUnitsToLonLat
     *
     * @since 10.0.0
     *
     * @sample maps/demo/latlon-advanced/ Advanced lat/lon demo
     *
     * @param {Highcharts.Point|Highcharts.ProjectedXY} point
     *        A `Point` instance or anything containing `x` and `y` properties
     *        with numeric values.
     *
     * @return {Highcharts.MapLonLatObject|undefined} An object with `lat` and
     *         `lon` properties.
     */
    MapView.prototype.projectedUnitsToLonLat = function (point) {
        var chart = this.chart, mapTransforms = chart.mapTransforms;
        // Legacy, built-in transforms
        if (mapTransforms) {
            for (var transform in mapTransforms) {
                if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                    mapTransforms[transform].hitZone &&
                    pointInPolygon(point, mapTransforms[transform].hitZone.coordinates[0])) {
                    return chart.transformToLatLon(point, mapTransforms[transform]);
                }
            }
            return chart.transformToLatLon(point, mapTransforms['default'] // eslint-disable-line dot-notation
            );
        }
        var pxPoint = this.projectedUnitsToPixels(point);
        for (var _i = 0, _a = this.insets; _i < _a.length; _i++) {
            var inset = _a[_i];
            if (inset.hitZone &&
                pointInPolygon(pxPoint, inset.hitZone.coordinates[0])) {
                var insetProjectedPoint = inset
                    .pixelsToProjectedUnits(pxPoint), coordinates_1 = inset.projection.inverse([insetProjectedPoint.x, insetProjectedPoint.y]);
                return { lon: coordinates_1[0], lat: coordinates_1[1] };
            }
        }
        var coordinates = this.projection.inverse([point.x, point.y]);
        return { lon: coordinates[0], lat: coordinates[1] };
    };
    MapView.prototype.redraw = function (animation) {
        this.chart.series.forEach(function (s) {
            if (s.useMapGeometry) {
                s.isDirty = true;
            }
        });
        this.chart.redraw(animation);
    };
    /**
     * Set the view to given center and zoom values.
     * @function Highcharts.MapView#setView
     * @param {Highcharts.LonLatArray|undefined} center
     *        The center point
     * @param {number} zoom
     *        The zoom level
     * @param {boolean} [redraw=true]
     *        Whether to redraw immediately
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        Animation options for the redraw
     *
     * @sample maps/mapview/setview
     *        Set the view programmatically
     */
    MapView.prototype.setView = function (center, zoom, redraw, animation) {
        if (redraw === void 0) { redraw = true; }
        if (center) {
            this.center = center;
        }
        if (typeof zoom === 'number') {
            if (typeof this.minZoom === 'number') {
                zoom = Math.max(zoom, this.minZoom);
            }
            if (typeof this.options.maxZoom === 'number') {
                zoom = Math.min(zoom, this.options.maxZoom);
            }
            // Use isNumber to prevent Infinity (#17205)
            if (isNumber(zoom)) {
                this.zoom = zoom;
            }
        }
        var bounds = this.getProjectedBounds();
        if (bounds) {
            var projectedCenter = this.projection.forward(this.center), _a = this.playingField, x = _a.x, y = _a.y, width = _a.width, height = _a.height, scale = this.getScale(), bottomLeft = this.projectedUnitsToPixels({
                x: bounds.x1,
                y: bounds.y1
            }), topRight = this.projectedUnitsToPixels({
                x: bounds.x2,
                y: bounds.y2
            }), boundsCenterProjected = [
                (bounds.x1 + bounds.x2) / 2,
                (bounds.y1 + bounds.y2) / 2
            ];
            // Constrain to data bounds
            // Pixel coordinate system is reversed vs projected
            var x1 = bottomLeft.x, y1 = topRight.y, x2 = topRight.x, y2 = bottomLeft.y;
            // Map smaller than plot area, center it
            if (x2 - x1 < width) {
                projectedCenter[0] = boundsCenterProjected[0];
                // Off west
            }
            else if (x1 < x && x2 < x + width) {
                // Adjust eastwards
                projectedCenter[0] += Math.max(x1 - x, x2 - width - x) / scale;
                // Off east
            }
            else if (x2 > x + width && x1 > x) {
                // Adjust westwards
                projectedCenter[0] += Math.min(x2 - width - x, x1 - x) / scale;
            }
            // Map smaller than plot area, center it
            if (y2 - y1 < height) {
                projectedCenter[1] = boundsCenterProjected[1];
                // Off north
            }
            else if (y1 < y && y2 < y + height) {
                // Adjust southwards
                projectedCenter[1] -= Math.max(y1 - y, y2 - height - y) / scale;
                // Off south
            }
            else if (y2 > y + height && y1 > y) {
                // Adjust northwards
                projectedCenter[1] -= Math.min(y2 - height - y, y1 - y) / scale;
            }
            this.center = this.projection.inverse(projectedCenter);
            this.insets.forEach(function (inset) {
                if (inset.options.field) {
                    inset.hitZone = inset.getHitZone();
                    inset.playingField = inset.getField();
                }
            });
            this.render();
        }
        fireEvent(this, 'afterSetView');
        if (redraw) {
            this.redraw(animation);
        }
    };
    /**
     * Convert projected units to pixel position
     *
     * @function Highcharts.MapView#projectedUnitsToPixels
     * @param {Highcharts.PositionObject} pos
     *        The position in projected units
     * @return {Highcharts.PositionObject} The position in pixels
     */
    MapView.prototype.projectedUnitsToPixels = function (pos) {
        var scale = this.getScale(), projectedCenter = this.projection.forward(this.center), field = this.playingField, centerPxX = field.x + field.width / 2, centerPxY = field.y + field.height / 2;
        var x = centerPxX - scale * (projectedCenter[0] - pos.x);
        var y = centerPxY + scale * (projectedCenter[1] - pos.y);
        return { x: x, y: y };
    };
    /**
     * Convert pixel position to longitude and latitude.
     *
     * @function Highcharts.MapView#pixelsToLonLat
     * @since 10.0.0
     * @param  {Highcharts.PositionObject} pos
     *         The position in pixels
     * @return {Highcharts.MapLonLatObject|undefined}
     *         The map coordinates
     */
    MapView.prototype.pixelsToLonLat = function (pos) {
        return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(pos));
    };
    /**
     * Convert pixel position to projected units
     *
     * @function Highcharts.MapView#pixelsToProjectedUnits
     * @param {Highcharts.PositionObject} pos
     *        The position in pixels
     * @return {Highcharts.PositionObject} The position in projected units
     */
    MapView.prototype.pixelsToProjectedUnits = function (pos) {
        var x = pos.x, y = pos.y, scale = this.getScale(), projectedCenter = this.projection.forward(this.center), field = this.playingField, centerPxX = field.x + field.width / 2, centerPxY = field.y + field.height / 2;
        var projectedX = projectedCenter[0] + (x - centerPxX) / scale;
        var projectedY = projectedCenter[1] - (y - centerPxY) / scale;
        return { x: projectedX, y: projectedY };
    };
    MapView.prototype.setUpEvents = function () {
        var _this = this;
        var chart = this.chart;
        // Set up panning for maps. In orthographic projections the globe will
        // rotate, otherwise adjust the map center.
        var mouseDownCenterProjected;
        var mouseDownKey;
        var mouseDownRotation;
        var onPan = function (e) {
            var pinchDown = chart.pointer.pinchDown, projection = _this.projection;
            var mouseDownX = chart.mouseDownX, mouseDownY = chart.mouseDownY;
            if (pinchDown.length === 1) {
                mouseDownX = pinchDown[0].chartX;
                mouseDownY = pinchDown[0].chartY;
            }
            if (typeof mouseDownX === 'number' &&
                typeof mouseDownY === 'number') {
                var key = "".concat(mouseDownX, ",").concat(mouseDownY), _a = e.originalEvent, chartX = _a.chartX, chartY = _a.chartY;
                // Reset starting position
                if (key !== mouseDownKey) {
                    mouseDownKey = key;
                    mouseDownCenterProjected = _this.projection
                        .forward(_this.center);
                    mouseDownRotation = (_this.projection.options.rotation || [0, 0]).slice();
                }
                // Get the natural zoom level of the projection itself when
                // zoomed to view the full world
                var worldBounds = projection.def && projection.def.bounds, worldZoom = (worldBounds &&
                    zoomFromBounds(worldBounds, _this.playingField)) || -Infinity;
                // Panning rotates the globe
                if (projection.options.name === 'Orthographic' &&
                    // ... but don't rotate if we're loading only a part of the
                    // world
                    (_this.minZoom || Infinity) < worldZoom * 1.1) {
                    // Empirical ratio where the globe rotates roughly the same
                    // speed as moving the pointer across the center of the
                    // projection
                    var ratio = 440 / (_this.getScale() * Math.min(chart.plotWidth, chart.plotHeight));
                    if (mouseDownRotation) {
                        var lon = (mouseDownX - chartX) * ratio -
                            mouseDownRotation[0], lat = clamp(-mouseDownRotation[1] -
                            (mouseDownY - chartY) * ratio, -80, 80), zoom = _this.zoom;
                        _this.update({
                            projection: {
                                rotation: [-lon, -lat]
                            }
                        }, false);
                        _this.zoom = zoom;
                        chart.redraw(false);
                    }
                }
                else {
                    var scale = _this.getScale();
                    var newCenter = _this.projection.inverse([
                        mouseDownCenterProjected[0] +
                            (mouseDownX - chartX) / scale,
                        mouseDownCenterProjected[1] -
                            (mouseDownY - chartY) / scale
                    ]);
                    _this.setView(newCenter, void 0, true, false);
                }
                e.preventDefault();
            }
        };
        addEvent(chart, 'pan', onPan);
        addEvent(chart, 'touchpan', onPan);
        // Perform the map zoom by selection
        addEvent(chart, 'selection', function (evt) {
            // Zoom in
            if (!evt.resetSelection) {
                var x = evt.x - chart.plotLeft;
                var y = evt.y - chart.plotTop;
                var _a = _this.pixelsToProjectedUnits({ x: x, y: y }), y1 = _a.y, x1 = _a.x;
                var _b = _this.pixelsToProjectedUnits({ x: x + evt.width, y: y + evt.height }), y2 = _b.y, x2 = _b.x;
                _this.fitToBounds({ x1: x1, y1: y1, x2: x2, y2: y2 }, void 0, true, evt.originalEvent.touches ?
                    // On touch zoom, don't animate, since we're already in
                    // transformed zoom preview
                    false :
                    // On mouse zoom, obey the chart-level animation
                    void 0);
                // Only for mouse. Touch users can pinch out.
                if (!/^touch/.test((evt.originalEvent.type))) {
                    chart.showResetZoom();
                }
                evt.preventDefault();
                // Reset zoom
            }
            else {
                _this.zoomBy();
            }
        });
    };
    MapView.prototype.render = function () {
        // We need a group for the insets
        if (!this.group) {
            this.group = this.chart.renderer.g('map-view')
                .attr({ zIndex: 4 })
                .add();
        }
    };
    /**
     * Update the view with given options
     *
     * @function Highcharts.MapView#update
     *
     * @param {Partial<Highcharts.MapViewOptions>} options
     *        The new map view options to apply
     * @param {boolean} [redraw=true]
     *        Whether to redraw immediately
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        The animation to apply to a the redraw
     */
    MapView.prototype.update = function (options, redraw, animation) {
        if (redraw === void 0) { redraw = true; }
        var newProjection = options.projection;
        var isDirtyProjection = newProjection && ((Projection.toString(newProjection) !==
            Projection.toString(this.options.projection))), isDirtyInsets = false;
        merge(true, this.userOptions, options);
        merge(true, this.options, options);
        // If anything changed with the insets, destroy them all and create
        // again below
        if ('insets' in options) {
            this.insets.forEach(function (inset) { return inset.destroy(); });
            this.insets.length = 0;
            isDirtyInsets = true;
        }
        if (isDirtyProjection || isDirtyInsets) {
            this.chart.series.forEach(function (series) {
                var groups = series.transformGroups;
                if (series.clearBounds) {
                    series.clearBounds();
                }
                series.isDirty = true;
                series.isDirtyData = true;
                // Destroy inset transform groups
                if (isDirtyInsets && groups) {
                    while (groups.length > 1) {
                        var group = groups.pop();
                        if (group) {
                            group.destroy();
                        }
                    }
                }
            });
            if (isDirtyProjection) {
                this.projection = new Projection(this.options.projection);
            }
            // Create new insets
            if (isDirtyInsets) {
                this.createInsets();
            }
            // Fit to natural bounds if center/zoom are not explicitly given
            if (!options.center && !isNumber(options.zoom)) {
                this.fitToBounds(void 0, void 0, false);
            }
        }
        if (options.center || isNumber(options.zoom)) {
            this.setView(this.options.center, options.zoom, false);
        }
        if (redraw) {
            this.chart.redraw(animation);
        }
    };
    /**
     * Zoom the map view by a given number
     *
     * @function Highcharts.MapView#zoomBy
     *
     * @param {number|undefined} [howMuch]
     *        The amount of zoom to apply. 1 zooms in on half the current view,
     *        -1 zooms out. Pass `undefined` to zoom to the full bounds of the
     *        map.
     * @param {Highcharts.LonLatArray} [coords]
     *        Optional map coordinates to keep fixed
     * @param {Array<number>} [chartCoords]
     *        Optional chart coordinates to keep fixed, in pixels
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        The animation to apply to a the redraw
     */
    MapView.prototype.zoomBy = function (howMuch, coords, chartCoords, animation) {
        var chart = this.chart;
        var projectedCenter = this.projection.forward(this.center);
        // let { x, y } = coords || {};
        var _a = coords ? this.projection.forward(coords) : [], x = _a[0], y = _a[1];
        if (typeof howMuch === 'number') {
            var zoom = this.zoom + howMuch;
            var center = void 0;
            // Keep chartX and chartY stationary - convert to lat and lng
            if (chartCoords) {
                var chartX = chartCoords[0], chartY = chartCoords[1];
                var scale = this.getScale();
                var offsetX = chartX - chart.plotLeft - chart.plotWidth / 2;
                var offsetY = chartY - chart.plotTop - chart.plotHeight / 2;
                x = projectedCenter[0] + offsetX / scale;
                y = projectedCenter[1] + offsetY / scale;
            }
            // Keep lon and lat stationary by adjusting the center
            if (typeof x === 'number' && typeof y === 'number') {
                var scale = 1 - Math.pow(2, this.zoom) / Math.pow(2, zoom);
                // const projectedCenter = this.projection.forward(this.center);
                var offsetX = projectedCenter[0] - x;
                var offsetY = projectedCenter[1] - y;
                projectedCenter[0] -= offsetX * scale;
                projectedCenter[1] += offsetY * scale;
                center = this.projection.inverse(projectedCenter);
            }
            this.setView(center, zoom, void 0, animation);
            // Undefined howMuch => reset zoom
        }
        else {
            this.fitToBounds(void 0, void 0, void 0, animation);
        }
    };
    /* *
     * Return the composite bounding box of a collection of bounding boxes
     */
    MapView.compositeBounds = function (arrayOfBounds) {
        if (arrayOfBounds.length) {
            return arrayOfBounds
                .slice(1)
                .reduce(function (acc, cur) {
                acc.x1 = Math.min(acc.x1, cur.x1);
                acc.y1 = Math.min(acc.y1, cur.y1);
                acc.x2 = Math.max(acc.x2, cur.x2);
                acc.y2 = Math.max(acc.y2, cur.y2);
                return acc;
            }, merge(arrayOfBounds[0]));
        }
        return;
    };
    return MapView;
}());
// Putting this in the same file due to circular dependency with MapView
var MapViewInset = /** @class */ (function (_super) {
    __extends(MapViewInset, _super);
    function MapViewInset(mapView, options) {
        var _this = _super.call(this, mapView.chart, options) || this;
        _this.id = options.id;
        _this.mapView = mapView;
        _this.options = merge(defaultInsetsOptions, options);
        _this.allBounds = [];
        if (_this.options.geoBounds) {
            // The path in projected units in the map view's main projection.
            // This is used for hit testing where the points should render.
            var path = mapView.projection.path(_this.options.geoBounds);
            _this.geoBoundsProjectedBox = boundsFromPath(path);
            _this.geoBoundsProjectedPolygon = path.map(function (segment) { return [
                segment[1] || 0,
                segment[2] || 0
            ]; });
        }
        return _this;
    }
    // Get the playing field in pixels
    MapViewInset.prototype.getField = function (padded) {
        if (padded === void 0) { padded = true; }
        var hitZone = this.hitZone;
        if (hitZone) {
            var padding = padded ? this.padding : [0, 0, 0, 0], polygon = hitZone.coordinates[0], xs = polygon.map(function (xy) { return xy[0]; }), ys = polygon.map(function (xy) { return xy[1]; }), x = Math.min.apply(0, xs) + padding[3], x2 = Math.max.apply(0, xs) - padding[1], y = Math.min.apply(0, ys) + padding[0], y2 = Math.max.apply(0, ys) - padding[2];
            if (isNumber(x) && isNumber(y)) {
                return {
                    x: x,
                    y: y,
                    width: x2 - x,
                    height: y2 - y
                };
            }
        }
        // Fall back to plot area
        return _super.prototype.getField.call(this, padded);
    };
    // Get the hit zone in pixels
    MapViewInset.prototype.getHitZone = function () {
        var _a = this, chart = _a.chart, mapView = _a.mapView, options = _a.options, coordinates = (options.field || {}).coordinates;
        if (coordinates) {
            var polygon = coordinates[0];
            if (options.units === 'percent') {
                var relativeTo_1 = options.relativeTo === 'mapBoundingBox' &&
                    mapView.getMapBBox() ||
                    merge(chart.plotBox, { x: 0, y: 0 });
                polygon = polygon.map(function (xy) { return [
                    relativeLength("".concat(xy[0], "%"), relativeTo_1.width, relativeTo_1.x),
                    relativeLength("".concat(xy[1], "%"), relativeTo_1.height, relativeTo_1.y)
                ]; });
            }
            return {
                type: 'Polygon',
                coordinates: [polygon]
            };
        }
    };
    MapViewInset.prototype.getProjectedBounds = function () {
        return MapView.compositeBounds(this.allBounds);
    };
    // Determine whether a point on the main projected plane is inside the
    // geoBounds of the inset.
    MapViewInset.prototype.isInside = function (point) {
        var _a = this, geoBoundsProjectedBox = _a.geoBoundsProjectedBox, geoBoundsProjectedPolygon = _a.geoBoundsProjectedPolygon;
        return Boolean(
        // First we do a pre-pass to check whether the test point is inside
        // the rectangular bounding box of the polygon. This is less
        // expensive and will rule out most cases.
        geoBoundsProjectedBox &&
            point.x >= geoBoundsProjectedBox.x1 &&
            point.x <= geoBoundsProjectedBox.x2 &&
            point.y >= geoBoundsProjectedBox.y1 &&
            point.y <= geoBoundsProjectedBox.y2 &&
            // Next, do the more expensive check whether the point is inside the
            // polygon itself.
            geoBoundsProjectedPolygon &&
            pointInPolygon(point, geoBoundsProjectedPolygon));
    };
    // Render the map view inset with the border path
    MapViewInset.prototype.render = function () {
        var _a = this, chart = _a.chart, mapView = _a.mapView, options = _a.options, borderPath = options.borderPath || options.field;
        if (borderPath && mapView.group) {
            var animate = true;
            if (!this.border) {
                this.border = chart.renderer
                    .path()
                    .addClass('highcharts-mapview-inset-border')
                    .add(mapView.group);
                animate = false;
            }
            if (!chart.styledMode) {
                this.border.attr({
                    stroke: options.borderColor,
                    'stroke-width': options.borderWidth
                });
            }
            var crisp_1 = Math.round(this.border.strokeWidth()) % 2 / 2, field_1 = (options.relativeTo === 'mapBoundingBox' &&
                mapView.getMapBBox()) || mapView.playingField;
            var d = (borderPath.coordinates || []).reduce(function (d, lineString) {
                return lineString.reduce(function (d, point, i) {
                    var x = point[0], y = point[1];
                    if (options.units === 'percent') {
                        x = chart.plotLeft + relativeLength("".concat(x, "%"), field_1.width, field_1.x);
                        y = chart.plotTop + relativeLength("".concat(y, "%"), field_1.height, field_1.y);
                    }
                    x = Math.floor(x) + crisp_1;
                    y = Math.floor(y) + crisp_1;
                    d.push(i === 0 ? ['M', x, y] : ['L', x, y]);
                    return d;
                }, d);
            }, []);
            // Apply the border path
            this.border[animate ? 'animate' : 'attr']({ d: d });
        }
    };
    MapViewInset.prototype.destroy = function () {
        if (this.border) {
            this.border = this.border.destroy();
        }
        this.eventsToUnbind.forEach(function (f) { return f(); });
    };
    // No chart-level events for insets
    MapViewInset.prototype.setUpEvents = function () { };
    return MapViewInset;
}(MapView));
// Initialize the MapView after initialization, but before firstRender
addEvent(MapChart, 'afterInit', function () {
    this.mapView = new MapView(this, this.options.mapView);
});
export default MapView;
