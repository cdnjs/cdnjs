/**
 * Map module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, SerialChartDataItem } from "./SerialChart";
import { Disposer } from "../../core/utils/Disposer";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { MapSeries } from "../map/MapSeries";
import { MapImage } from "../map/MapImage";
import { MapPolygon } from "../map/MapPolygon";
import { MapPolygonSeries } from "../map/MapPolygonSeries";
import { Projection } from "../map/projections/Projection";
import { Circle } from "../../core/elements/Circle";
import { SmallMap } from "../map/SmallMap";
import * as $mapUtils from "../map/MapUtils";
import { keyboard } from "../../core/utils/Keyboard";
import { registry } from "../../core/Registry";
import { options } from "../../core/Options";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $ease from "../../core/utils/Ease";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $geo from "../map/Geo";
import { GraticuleSeries } from "../map/GraticuleSeries";
import { getInteraction } from "../../core/interaction/Interaction";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapChart]].
 *
 * @see {@link DataItem}
 */
var MapChartDataItem = /** @class */ (function (_super) {
    __extends(MapChartDataItem, _super);
    /**
     * Constructor
     */
    function MapChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return MapChartDataItem;
}(SerialChartDataItem));
export { MapChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a map.
 *
 * @see {@link IMapChartEvents} for a list of available Events
 * @see {@link IMapChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/} for documentation
 */
var MapChart = /** @class */ (function (_super) {
    __extends(MapChart, _super);
    /**
     * Constructor
     */
    function MapChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A ratio to be used when scaling the map shapes.
         *
         * @readonly
         */
        _this.scaleRatio = 1;
        /**
         * Default duration of zoom animations (ms).
         */
        _this.zoomDuration = 1000;
        /**
         * Default zooming animation easing function.
         */
        _this.zoomEasing = $ease.cubicOut;
        /**
         * Smallest available zoom level. The map will not allow to zoom out past
         * this setting.
         *
         * NOTE: Should be power of 2.
         *
         * @default 1
         */
        _this.minZoomLevel = 1;
        /**
         * Biggest available zoom level. The map will not allow to zoom in past
         * this setting.
         *
         * NOTE: Should be power of 2.
         *
         * @default 32
         */
        _this.maxZoomLevel = 32;
        /**
         * [_prevZoomGeoPoint description]
         *
         * @todo Description
         */
        _this._prevZoomGeoPoint = { latitude: 0, longitude: 0 };
        _this.className = "MapChart";
        // Set default projection
        _this.projection = new Projection();
        _this.setPropertyValue("deltaLatitude", 0);
        _this.setPropertyValue("deltaLongitude", 0);
        _this.setPropertyValue("deltaGamma", 0);
        _this.maxPanOut = 0.7;
        _this.homeZoomLevel = 1;
        _this.zoomStep = 2;
        _this.layout = "absolute";
        _this.centerMapOnZoomOut = true;
        // Set padding
        _this.padding(0, 0, 0, 0);
        $utils.used(_this.backgroundSeries);
        // so that the map would render in a hidden div too
        _this.minWidth = 10;
        _this.minHeight = 10;
        _this.events.once("inited", _this.handleAllInited, _this, false);
        // Create a container for map series
        var seriesContainer = _this.seriesContainer;
        seriesContainer.visible = false;
        seriesContainer.inert = true;
        seriesContainer.resizable = true;
        seriesContainer.events.on("transformed", _this.handleMapTransform, _this, false);
        seriesContainer.events.on("doublehit", _this.handleDoubleHit, _this, false);
        seriesContainer.events.on("dragged", _this.handleDrag, _this, false);
        seriesContainer.zIndex = 0;
        seriesContainer.dragWhileResize = true;
        //seriesContainer.background.fillOpacity = 0;
        seriesContainer.adapter.add("scale", function (scale, target) {
            return $math.fitToRange(scale, _this.minZoomLevel, _this.maxZoomLevel);
        });
        // Set up events
        //this.events.on("validated", this.updateExtremes, this);
        //this.events.on("datavalidated", this.handleAllValidated, this, false);
        //this.events.on("datavalidated", this.updateExtremes, this, false);
        _this.events.on("maxsizechanged", function (event) {
            if (event.previousWidth == 0 || event.previousHeight == 0) {
                _this.updateExtremes();
                _this.updateCenterGeoPoint();
            }
        }, undefined, false);
        // Set up main chart container, e.g. set backgrounds and events to monitor
        // size changes, etc.
        var chartContainer = _this.chartContainer;
        chartContainer.parent = _this;
        chartContainer.zIndex = -1;
        _this._disposers.push(_this.events.on("maxsizechanged", function () {
            if (_this.inited) {
                if (_this._mapAnimation) {
                    _this._mapAnimation.stop();
                }
                var allInited_1 = true;
                _this.series.each(function (series) {
                    series.updateTooltipBounds();
                    if (!series.inited || series.dataInvalid) {
                        allInited_1 = false;
                    }
                });
                if (allInited_1) {
                    _this.updateScaleRatio();
                }
                _this.zoomToGeoPoint(_this._zoomGeoPointReal, _this.zoomLevel, true, 0);
            }
        }, undefined, false));
        var chartContainerBg = chartContainer.background;
        chartContainerBg.fillOpacity = 0;
        chartContainerBg.events.on("down", function (e) { _this.seriesContainer.dragStart(e.target.interactions.downPointers.getIndex(0)); }, _this);
        chartContainerBg.events.on("up", function (e) { _this.seriesContainer.dragStop(); }, _this);
        chartContainerBg.events.on("doublehit", _this.handleDoubleHit, _this);
        chartContainerBg.focusable = true;
        chartContainer.events.on("down", _this.handleMapDown, _this, false);
        _this.addDisposer(seriesContainer.events.on("down", function () {
            // Cancel any move inertia if there is one
            var inertia = _this.seriesContainer.interactions.inertias.getKey("move");
            if (inertia) {
                inertia.done();
            }
        }));
        // Add description to background
        _this.background.fillOpacity = 0;
        // Add keyboard events for panning
        _this._disposers.push(getInteraction().body.events.on("keyup", function (ev) {
            if (_this.topParent.hasFocused) {
                var key = keyboard.getEventKey(ev.event);
                if (!_this._zoomControl || !_this._zoomControl.thumb.isFocused) {
                    switch (key) {
                        case "up":
                            _this.pan({ x: 0, y: 0.1 });
                            break;
                        case "down":
                            _this.pan({ x: 0, y: -0.1 });
                            break;
                        case "left":
                            _this.pan({ x: 0.1, y: 0 });
                            break;
                        case "right":
                            _this.pan({ x: -0.1, y: 0 });
                            break;
                    }
                }
            }
        }, _this));
        _this.mouseWheelBehavior = "zoom";
        var interaction = getInteraction();
        _this._disposers.push(interaction.body.events.on("down", _this.handlePanDown, _this));
        _this._disposers.push(interaction.body.events.on("up", _this.handlePanUp, _this));
        //this._disposers.push(interaction.body.events.on("track", this.handlePanMove, this));
        var panSprite = _this.seriesContainer.createChild(Circle);
        panSprite.radius = 10;
        panSprite.inert = true;
        panSprite.isMeasured = false;
        panSprite.events.on("transformed", _this.handlePanMove, _this, false);
        panSprite.interactionsEnabled = false;
        panSprite.opacity = 0;
        panSprite.x = 0;
        panSprite.y = 0;
        _this.panSprite = panSprite;
        _this.panBehavior = "move";
        /*
                this.panSprite.inertiaOptions.setKey("move", {
                    "time": 100,
                    "duration": 1000,
                    "factor": 3,
                    "easing": $ease.sinOut
                });*/
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapChart.prototype.handlePanDown = function (event) {
        var svgPoint = $utils.documentPointToSvg(event.pointer.point, this.htmlContainer);
        if (svgPoint.x > 0 && svgPoint.y > 0 && svgPoint.x < this.svgContainer.width && svgPoint.y < this.svgContainer.height) {
            // Get local point
            this._downPointOrig = $utils.documentPointToSprite(event.pointer.point, this.seriesContainer);
            this.panSprite.moveTo(this._downPointOrig);
            this.panSprite.dragStart(event.pointer);
            this._downDeltaLongitude = this.deltaLongitude;
            this._downDeltaLatitude = this.deltaLatitude;
        }
    };
    /**
     * @ignore
     */
    MapChart.prototype.handlePanUp = function (event) {
        if (this._downPointOrig) {
            this.panSprite.dragStop(event.pointer, true);
        }
        this._downPointOrig = undefined;
    };
    /**
     * @ignore
     */
    MapChart.prototype.handlePanMove = function () {
        if (!this.seriesContainer.isResized) {
            if (getInteraction().areTransformed([this.panSprite.interactions, this.seriesContainer.interactions])) {
                return;
            }
            var d3Projection = this.projection.d3Projection;
            var panBehavior = this.panBehavior;
            if (panBehavior != "move" && panBehavior != "none" && this._downPointOrig && d3Projection.rotate) {
                var rotation = d3Projection.rotate();
                var dln = rotation[0];
                var dlt = rotation[1];
                var dlg = rotation[2];
                d3Projection.rotate([0, 0, 0]);
                var downGeoLocal = this.projection.invert(this._downPointOrig);
                var local = { x: this.panSprite.pixelX, y: this.panSprite.pixelY };
                var geoLocal = void 0;
                if (local) {
                    geoLocal = this.projection.invert(local);
                }
                d3Projection.rotate([dln, dlt, dlg]);
                if (geoLocal) {
                    if (panBehavior == "rotateLat" || panBehavior == "rotateLongLat") {
                        this.deltaLatitude = this._downDeltaLatitude + geoLocal.latitude - downGeoLocal.latitude;
                    }
                    if (panBehavior == "rotateLong" || panBehavior == "rotateLongLat") {
                        this.deltaLongitude = this._downDeltaLongitude + geoLocal.longitude - downGeoLocal.longitude;
                    }
                }
            }
        }
    };
    /**
     * @ignore
     */
    MapChart.prototype.handleAllInited = function () {
        var _this = this;
        var inited = true;
        this.seriesContainer.visible = true;
        this.series.each(function (series) {
            if (!series.inited || series.dataInvalid) {
                inited = false;
            }
        });
        if (inited) {
            this.updateCenterGeoPoint();
            this.updateScaleRatio();
            this.goHome(0);
        }
        else {
            // TODO verify that this is correct
            var disposer_1 = registry.events.once("exitframe", function () {
                _this.removeDispose(disposer_1);
                _this.handleAllInited();
            }, this, false);
            this.addDisposer(disposer_1);
        }
    };
    /**
     * @ignore
     */
    MapChart.prototype.updateZoomGeoPoint = function () {
        var seriesPoint = $utils.svgPointToSprite({ x: this.innerWidth / 2 + this.pixelPaddingLeft, y: this.innerHeight / 2 + this.pixelPaddingTop }, this.series.getIndex(0));
        var geoPoint = this.projection.invert(seriesPoint);
        this._zoomGeoPointReal = geoPoint;
    };
    /**
     * @ignore
     */
    MapChart.prototype.updateCenterGeoPoint = function () {
        var maxLeft;
        var maxRight;
        var maxTop;
        var maxBottom;
        if (this.backgroundSeries) {
            var features = this.backgroundSeries.getFeatures();
            if (features.length > 0) {
                var bounds = this.projection.d3Path.bounds(features[0].geometry);
                maxLeft = bounds[0][0];
                maxTop = bounds[0][1];
                maxRight = bounds[1][0];
                maxBottom = bounds[1][1];
            }
        }
        else {
            this.series.each(function (series) {
                var bbox = series.group.node.getBBox();
                if (maxLeft > bbox.x || !$type.isNumber(maxLeft)) {
                    maxLeft = bbox.x;
                }
                if (maxRight < bbox.x + bbox.width || !$type.isNumber(maxRight)) {
                    maxRight = bbox.x + bbox.width;
                }
                if (maxTop > bbox.y || !$type.isNumber(maxTop)) {
                    maxTop = bbox.y;
                }
                if (maxBottom < bbox.y + bbox.height || !$type.isNumber(maxBottom)) {
                    maxBottom = bbox.y + bbox.height;
                }
            });
        }
        this.seriesMaxLeft = maxLeft;
        this.seriesMaxRight = maxRight;
        this.seriesMaxTop = maxTop;
        this.seriesMaxBottom = maxBottom;
        this.seriesWidth = maxRight - maxLeft;
        this.seriesHeight = maxBottom - maxTop;
        if (this.seriesWidth > 0 && this.seriesHeight > 0) {
            this.chartContainer.visible = true;
            this._centerGeoPoint = this.projection.invert({ x: maxLeft + (maxRight - maxLeft) / 2, y: maxTop + (maxBottom - maxTop) / 2 });
            if (!this._zoomGeoPointReal || !$type.isNumber(this._zoomGeoPointReal.latitude)) {
                this._zoomGeoPointReal = this._centerGeoPoint;
            }
        }
        else {
            this.chartContainer.visible = false;
        }
    };
    /**
     * Prevents map to be dragged out of the container area
     * @ignore
     */
    MapChart.prototype.handleDrag = function () {
        var d = this.zoomLevel * this.scaleRatio;
        var ww = this.seriesWidth * d;
        var hh = this.seriesHeight * d;
        var seriesContainer = this.seriesContainer;
        var maxLeft = this.seriesMaxLeft * d;
        var maxRight = this.seriesMaxRight * d;
        var maxTop = this.seriesMaxTop * d;
        var maxBottom = this.seriesMaxBottom * d;
        var x = seriesContainer.pixelX;
        var y = seriesContainer.pixelY;
        var maxPanOut = this.maxPanOut;
        var minX = Math.min(this.maxWidth * (1 - maxPanOut) - ww - maxLeft, -maxLeft);
        if (x < minX) {
            x = minX;
        }
        var maxX = Math.max(this.maxWidth * maxPanOut - maxLeft, this.maxWidth - maxRight);
        if (x > maxX) {
            x = maxX;
        }
        var minY = Math.min(this.maxHeight * (1 - maxPanOut) - hh - maxTop, -maxTop);
        if (y < minY) {
            y = minY;
        }
        var maxY = Math.max(this.maxHeight * maxPanOut - maxTop, this.maxHeight - maxBottom);
        if (y > maxY) {
            y = maxY;
        }
        seriesContainer.moveTo({ x: x, y: y }, undefined, undefined, true);
        this._zoomGeoPointReal = this.zoomGeoPoint;
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    MapChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Map");
        }
        if (!$type.hasValue(this.background.readerTitle)) {
            this.background.role = "application";
            this.background.readerTitle = this.language.translate("Use plus and minus keys on your keyboard to zoom in and out");
        }
    };
    /**
     * Handles event when a pointer presses down on the map, e.g. user presses
     * down mouse or touches the map on a screen.
     *
     * Stops all animations currently going on.
     */
    MapChart.prototype.handleMapDown = function () {
        if (this._mapAnimation) {
            this._mapAnimation.stop();
        }
    };
    /**
     * Handles the event when user doubleclicks or dooubletaps the map: zooms
     * in on the reference point.
     *
     * @param event  Original event
     */
    MapChart.prototype.handleDoubleHit = function (event) {
        var svgPoint = $utils.documentPointToSvg(event.point, this.htmlContainer, this.svgContainer.cssScale);
        var geoPoint = this.svgPointToGeo(svgPoint);
        this.zoomIn(geoPoint);
    };
    /**
     * Handles mouse wheel event, e.g. user rotates mouse wheel while over the
     * map: zooms in or out depending on the direction of the wheel turn.
     *
     * @param event  Original event
     */
    MapChart.prototype.handleWheel = function (event) {
        // Cancel any move inertia if there is one
        var inertia = this.seriesContainer.interactions.inertias.getKey("move");
        if (inertia) {
            inertia.done();
        }
        var svgPoint = $utils.documentPointToSvg(event.point, this.htmlContainer, this.svgContainer.cssScale);
        var geoPoint = this.svgPointToGeo(svgPoint);
        if (event.shift.y < 0) {
            this.zoomIn(geoPoint, undefined, this.interactions.mouseOptions.sensitivity);
        }
        else {
            this.zoomOut(geoPoint, undefined, this.interactions.mouseOptions.sensitivity);
        }
    };
    Object.defineProperty(MapChart.prototype, "mouseWheelBehavior", {
        /**
         * @return mouse wheel behavior
         */
        get: function () {
            return this.getPropertyValue("mouseWheelBehavior");
        },
        /**
         * Specifies what should chart do if when mouse wheel is rotated.
         *
         * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
         * @param mouse wheel behavior
         * @default zoomX
         */
        set: function (value) {
            if (this.setPropertyValue("mouseWheelBehavior", value)) {
                if (value != "none") {
                    this._mouseWheelDisposer = this.chartContainer.events.on("wheel", this.handleWheel, this, false);
                    this._disposers.push(this._mouseWheelDisposer);
                }
                else {
                    if (this._mouseWheelDisposer) {
                        this._mouseWheelDisposer.dispose();
                    }
                    this.chartContainer.wheelable = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "panBehavior", {
        /**
         * @returns Behavior
         */
        get: function () {
            return this.getPropertyValue("panBehavior");
        },
        /**
         * What "dragging" map does.
         *
         * Available values:
         * * `"move"` (default): changes position of the map.
         * * `"rotateLat"`: changes `deltaLatitude` (rotates the globe vertically).
         * * `"rotateLong"`: changes `deltaLongitude` (rotates the globe horizontally).
         * * `"rotateLongLat"`: changes both `deltaLongitude` and `deltaLatitude` (rotates the globe in any direction).
         *
         * @default "move"
         * @since 4.3.0
         * @param  value  Behavior
         */
        set: function (value) {
            if (this.setPropertyValue("panBehavior", value)) {
                var seriesContainer = this.seriesContainer;
                this.panSprite.draggable = false;
                seriesContainer.draggable = false;
                switch (value) {
                    case "move":
                        seriesContainer.draggable = true;
                        break;
                    default:
                        this.panSprite.draggable = true;
                        break;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "centerMapOnZoomOut", {
        /**
         * @returns If the map should be centered when zooming out.
         */
        get: function () {
            return this.getPropertyValue("centerMapOnZoomOut");
        },
        /**
         * Specifies if the map should be centered when zooming out
         * @default true
         * @since 4.7.12
         */
        set: function (value) {
            this.setPropertyValue("centerMapOnZoomOut", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "projection", {
        /**
         * @return Projection
         */
        get: function () {
            return this.getPropertyValue("projection");
        },
        /**
         * Projection to use for the map.
         *
         * Available projections:
         * * Albers
         * * AlbersUSA
         * * AzimuthalEqualArea
         * * Eckert6
         * * EqualEarth
         * * Mercator
         * * Miller
         * * NaturalEarth
         * * Orthographic
         * * Stereographic
         *
         * ```TypeScript
         * map.projection = new am4maps.projections.Mercator();
         * ```
         * ```JavaScript
         * map.projection = new am4maps.projections.Mercator();
         * ```
         * ```JSON
         * {
         *   // ...
         *   "projection": "Mercator"
         *   // ...
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection} More about projections
         * @param projection  Projection
         */
        set: function (projection) {
            var _this = this;
            if (this.setPropertyValue("projection", projection)) {
                this.invalidateProjection();
                projection.chart = this;
                if (this._backgroundSeries) {
                    this._backgroundSeries.invalidate();
                }
                if (this.inited) {
                    this.updateExtremes();
                }
                this.series.each(function (series) {
                    series.events.once("validated", function () {
                        _this.updateCenterGeoPoint();
                        _this.updateScaleRatio();
                        _this.goHome(0);
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    MapChart.prototype.validateDataItems = function () {
        _super.prototype.validateDataItems.call(this);
        this.updateExtremes();
    };
    /**
     * Calculates the longitudes and latitudes of the most distant points from
     * the center in all four directions: West, East, North, and South.
     *
     * @ignore Exclude from docs
     */
    MapChart.prototype.updateExtremes = function () {
        var east;
        var north;
        var west;
        var south;
        this.series.each(function (series) {
            if (series.ignoreBounds || (series instanceof GraticuleSeries && series.fitExtent)) {
            }
            else {
                if (series.north > north || !$type.isNumber(north)) {
                    north = series.north;
                }
                if (series.south < south || !$type.isNumber(south)) {
                    south = series.south;
                }
                if (series.west < west || !$type.isNumber(west)) {
                    west = series.west;
                }
                if (series.east > east || !$type.isNumber(east)) {
                    east = series.east;
                }
            }
        });
        var features = [];
        var foundGraticule = false;
        // if we gave graticule, get features of these series only for faster fitSize
        this.series.each(function (series) {
            if (series instanceof GraticuleSeries && !series.fitExtent) {
                features = series.getFeatures();
                foundGraticule = true;
            }
        });
        if (!foundGraticule) {
            this.series.each(function (series) {
                if (series.ignoreBounds || (series instanceof GraticuleSeries && series.fitExtent)) {
                }
                else {
                    features = features.concat(series.getFeatures());
                }
            });
        }
        var w = $math.max(50, this.innerWidth);
        var h = $math.max(50, this.innerHeight);
        var d3Projection = this.projection.d3Projection;
        if (features.length > 0 && d3Projection && (this.east != east || this.west != west || this.north != north || this.south != south)) {
            this.east = east;
            this.west = west;
            this.north = north;
            this.south = south;
            if (d3Projection.rotate) {
                var rotation = d3Projection.rotate();
                var deltaLong = rotation[0];
                var deltaLat = rotation[1];
                var deltaGamma = rotation[2];
                this.deltaLongitude = deltaLong;
                this.deltaLatitude = deltaLat;
                this.deltaGamma = deltaGamma;
            }
            var geoJSON = { "type": "FeatureCollection", features: features };
            var initialScale = d3Projection.scale();
            d3Projection.fitSize([w, h], geoJSON);
            if (d3Projection.scale() != initialScale) {
                this.invalidateDataUsers();
            }
            this.series.each(function (series) {
                if (series instanceof GraticuleSeries) {
                    series.invalidateData();
                }
            });
            if (this._backgroundSeries) {
                var polygon = this._backgroundSeries.mapPolygons.getIndex(0);
                if (polygon) {
                    polygon.multiPolygon = $mapUtils.getBackground(this.north, this.east, this.south, this.west);
                }
            }
            this._fitWidth = w;
            this._fitHeight = h;
        }
        if (!this._zoomGeoPointReal || !$type.isNumber(this._zoomGeoPointReal.latitude)) {
            this.goHome(0);
        }
    };
    /**
     * (Re)calculates a ratio which should be used to scale the actual map so
     * that it fits perfectly into available space. Helps to avoid redrawing of all the map if container size changes
     * @ignore
     */
    MapChart.prototype.updateScaleRatio = function () {
        var scaleRatio;
        this.updateCenterGeoPoint();
        var hScale = this.innerWidth / this.seriesWidth;
        var vScale = this.innerHeight / this.seriesHeight;
        scaleRatio = $math.min(hScale, vScale);
        if ($type.isNaN(scaleRatio) || scaleRatio == Infinity) {
            scaleRatio = 1;
        }
        if (scaleRatio != this.scaleRatio) {
            this.scaleRatio = scaleRatio;
            $iter.each(this.series.iterator(), function (series) {
                series.scale = scaleRatio;
                series.updateTooltipBounds();
            });
            this.backgroundSeries.scale = scaleRatio;
            this.dispatch("scaleratiochanged");
        }
    };
    /**
     * Converts a point within map container to geographical (lat/long)
     * coordinates.
     *
     * @param point  Source point
     * @return Geo-point
     */
    MapChart.prototype.svgPointToGeo = function (point) {
        var series = this.series.getIndex(0);
        if (series) {
            var seriesPoint = $utils.svgPointToSprite(point, series);
            return this.seriesPointToGeo(seriesPoint);
        }
    };
    /**
     * Converts geographical (lat/long) coordinates to an X/Y point within map's
     * container.
     *
     * @param point  Source geo-point
     * @return Point
     */
    MapChart.prototype.geoPointToSVG = function (point) {
        var series = this.series.getIndex(0);
        if (series) {
            var seriesPoint = this.geoPointToSeries(point);
            return $utils.spritePointToSvg(seriesPoint, series);
        }
    };
    /**
     * Converts a point (X/Y) within actual objects of the map to geographical
     * (lat/long) coordinates.
     *
     * @param point  Source point
     * @return Geo-point
     */
    MapChart.prototype.seriesPointToGeo = function (point) {
        return this.projection.invert(point);
    };
    /**
     * Converts geographical (lat/long) coordinates to an X/Y point within
     * actual elements/objects of the maps.
     *
     * @param point  Source geo-point
     * @return Point
     */
    MapChart.prototype.geoPointToSeries = function (point) {
        return this.projection.convert(point);
    };
    Object.defineProperty(MapChart.prototype, "geodata", {
        /**
         * @return GeoJSON data
         */
        get: function () {
            return this._geodata;
        },
        /**
         * Map data in GeoJSON format.
         *
         * The Map supports the following GeoJSON objects: `Point`, `LineString`,
         * `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon`.
         *
         * @see {@link http://geojson.org/} Official GeoJSON format specification
         * @param geoJSON GeoJSON data
         */
        set: function (geodata) {
            if (geodata != this._geodata) {
                this._geodata = geodata;
                if (this.reverseGeodata) {
                    this.processReverseGeodata(this._geodata);
                }
                this.invalidateData();
                this.dataUsers.each(function (dataUser) {
                    for (var i = dataUser.data.length - 1; i >= 0; i--) {
                        if (dataUser.data[i].madeFromGeoData == true) {
                            dataUser.data.splice(i, 1);
                        }
                    }
                    dataUser.disposeData();
                    dataUser.invalidateData();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "reverseGeodata", {
        /**
         * @returns Reverse the order of geodata coordinates?
         */
        get: function () {
            return this.getPropertyValue("reverseGeodata");
        },
        /**
         * Indicates whether GeoJSON geodata supplied to the chart uses
         * ESRI (clockwise) or non-ESRI (counter-clockwise) order of the polygon
         * coordinates.
         *
         * `MapChart` supports only ESRI standard, so if your custom maps appears
         * garbled, try setting `reverseGeodata = true`.
         *
         * @default false
         * @since 4.10.11
         * @param  value  Reverse the order of geodata coordinates?
         */
        set: function (value) {
            if (this.setPropertyValue("reverseGeodata", value) && this._geodata) {
                this.processReverseGeodata(this._geodata);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reverses the order of polygons on a GeoJSON data.
     *
     * @since 4.10.11
     * @param  geodata  Source geodata
     */
    MapChart.prototype.processReverseGeodata = function (geodata) {
        for (var i = 0; i < geodata.features.length; i++) {
            var feature = geodata.features[i];
            for (var x = 0; x < feature.geometry.coordinates.length; x++) {
                if (feature.geometry.type == "MultiPolygon") {
                    for (var y = 0; y < feature.geometry.coordinates[x].length; y++) {
                        feature.geometry.coordinates[x][y].reverse();
                    }
                }
                else {
                    feature.geometry.coordinates[x].reverse();
                }
            }
        }
    };
    /**
     * Zooms the map to particular zoom level and centers on a latitude/longitude
     * coordinate.
     *
     * @param point      Center coordinate
     * @param zoomLevel  Zoom level
     * @param center     Center on the given coordinate?
     * @param duration   Duration for zoom animation (ms)
     * @return Zoom animation
     */
    MapChart.prototype.zoomToGeoPoint = function (point, zoomLevel, center, duration, mapObject) {
        var _this = this;
        if (!point) {
            var hasData_1 = false;
            this.series.each(function (series) {
                if (series.dataItems.length > 0) {
                    hasData_1 = true;
                }
            });
            if (hasData_1) {
                point = this.zoomGeoPoint;
            }
            else {
                return;
            }
        }
        if (!point || !$type.isNumber(point.longitude) || !$type.isNumber(point.latitude)) {
            return;
        }
        this._zoomGeoPointReal = point;
        zoomLevel = $math.fitToRange(zoomLevel, this.minZoomLevel, this.maxZoomLevel);
        var seriesPoint = this.projection.convert(point);
        if (seriesPoint) {
            var svgPoint = this.geoPointToSVG(point);
            var mapPoint = $utils.svgPointToSprite(svgPoint, this);
            if (center) {
                mapPoint = {
                    x: this.innerWidth / 2,
                    y: this.innerHeight / 2
                };
            }
            if (!$type.isNumber(duration)) {
                duration = this.zoomDuration;
            }
            var x = mapPoint.x - seriesPoint.x * zoomLevel * this.scaleRatio;
            var y = mapPoint.y - seriesPoint.y * zoomLevel * this.scaleRatio;
            if (!mapObject && zoomLevel < this.zoomLevel && this.centerMapOnZoomOut && zoomLevel < 1.5) {
                x = this.innerWidth / 2 - (this.seriesMaxLeft + (this.seriesMaxRight - this.seriesMaxLeft) / 2) * zoomLevel * this.scaleRatio;
                y = this.innerHeight / 2 - (this.seriesMaxTop + (this.seriesMaxBottom - this.seriesMaxTop) / 2) * zoomLevel * this.scaleRatio;
            }
            this._mapAnimation = this.seriesContainer.animate([{
                    property: "scale",
                    to: zoomLevel
                }, {
                    property: "x", from: this.seriesContainer.pixelX,
                    to: x
                }, {
                    property: "y", from: this.seriesContainer.pixelY,
                    to: y
                }], duration, this.zoomEasing);
            this._disposers.push(this._mapAnimation.events.on("animationended", function () {
                _this._zoomGeoPointReal = _this.zoomGeoPoint;
            }));
            this.seriesContainer.validatePosition();
            return this._mapAnimation;
        }
    };
    /**
     * Zooms the map to a particular map object.
     *
     * @param mapObject  Target map object
     * @param zoomLevel  Zoom level
     * @param center     Center on the given coordinate?
     * @param duration   Duration for zoom animation (ms)
     * @return Zoom animation
     */
    MapChart.prototype.zoomToMapObject = function (mapObject, zoomLevel, center, duration) {
        if (center == undefined) {
            center = true;
        }
        var inertia = this.seriesContainer.interactions.inertias.getKey("move");
        if (inertia) {
            inertia.done();
        }
        if (mapObject instanceof MapImage) {
            if ($type.isNaN(zoomLevel)) {
                zoomLevel = 5;
            }
            return this.zoomToGeoPoint({ latitude: mapObject.latitude, longitude: mapObject.longitude }, zoomLevel, center, duration, true);
        }
        var dataItem = mapObject.dataItem;
        if (dataItem && $type.isNumber(dataItem.zoomLevel)) {
            zoomLevel = dataItem.zoomLevel;
        }
        if (mapObject instanceof MapPolygon) {
            var dataItem_1 = mapObject.dataItem;
            var bbox = mapObject.polygon.bbox;
            if (bbox.width == 0 || bbox.height == 0) {
                bbox = mapObject.polygon.group.getBBox();
            }
            if (!$type.isNumber(zoomLevel)) {
                zoomLevel = Math.min(this.seriesWidth / bbox.width, this.seriesHeight / bbox.height);
            }
            var geoPoint = void 0;
            if (dataItem_1 && $type.hasValue(dataItem_1.zoomGeoPoint)) {
                geoPoint = dataItem_1.zoomGeoPoint;
            }
            else {
                // this is more accurate
                var polygonPoint = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
                var seriesPoint = $utils.spritePointToSprite(polygonPoint, mapObject.polygon, mapObject.series);
                geoPoint = this.seriesPointToGeo(seriesPoint);
            }
            return this.zoomToGeoPoint(geoPoint, zoomLevel, true, duration, true);
        }
    };
    /**
     * Zooms the map to a particular viewport.
     *
     * The `north`, `east`, `south`, and `west` define boundaries of the
     * imaginary viewort we want to zoom the map to.
     *
     * `level` is not actual zoom level. The map will determine the zoom level
     * required to accommodated such zoom, and will adjust it by `level` if set.
     *
     * @param north     Latitude of the North-most boundary
     * @param east      Longitude of the East-most boundary
     * @param south     Latitude of the South-most boundary
     * @param west      Longitude of the West-most boundary
     * @param level     Adjust zoom level
     * @param center    Center on the given coordinate?
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    MapChart.prototype.zoomToRectangle = function (north, east, south, west, level, center, duration) {
        if ($type.isNaN(level)) {
            level = 1;
        }
        var w = $math.min(west, east);
        var e = $math.max(west, east);
        west = w;
        east = e;
        var splitLongitude = $math.normalizeAngle(180 - this.deltaLongitude);
        if (splitLongitude > 180) {
            splitLongitude -= 360;
        }
        var newLong = west + (east - west) / 2;
        var d = (west - east);
        if (west < splitLongitude && east > splitLongitude) {
            newLong += 180;
            d = $math.normalizeAngle(east - west - 360);
        }
        var zoomLevel = level * Math.min((this.south - this.north) / (south - north), Math.abs((this.west - this.east) / d));
        return this.zoomToGeoPoint({ latitude: north + (south - north) / 2, longitude: newLong }, zoomLevel, center, duration, true);
    };
    /**
     * Zooms in the map, optionally centering on particular latitude/longitude
     * point.
     *
     * @param geoPoint  Optional center point
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    MapChart.prototype.zoomIn = function (geoPoint, duration, sensitivity) {
        if (sensitivity === void 0) { sensitivity = 1; }
        var step = 1 + (this.zoomStep - 1) * sensitivity;
        if (step < 1) {
            step = 1;
        }
        return this.zoomToGeoPoint(geoPoint, this.zoomLevel * step, false, duration);
    };
    /**
     * Zooms out the map, optionally centering on particular latitude/longitude
     * point.
     *
     * @param geoPoint  Optional center point
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    MapChart.prototype.zoomOut = function (geoPoint, duration, sensitivity) {
        if (sensitivity === void 0) { sensitivity = 1; }
        var step = 1 + (this.zoomStep - 1) * sensitivity;
        if (step < 1) {
            step = 1;
        }
        return this.zoomToGeoPoint(geoPoint, this.zoomLevel / step, false, duration);
    };
    /**
     * Pans the maps using relative coordinates. E.g.:
     *
     * ```JSON
     * {
     *   x: 0.1,
     *   y: -0.1
     * }
     * ```
     *
     * The above will move the map by 10% to the right, and by 10% upwards.
     *
     * @param shift     Vertical and horizontal shift
     * @param duration  Pan animation duration (ms)
     */
    MapChart.prototype.pan = function (shift, duration) {
        var point = this.geoPointToSVG(this.zoomGeoPoint);
        point.x += this.pixelWidth * shift.x;
        point.y += this.pixelHeight * shift.y;
        this.zoomToGeoPoint(this.svgPointToGeo(point), this.zoomLevel, true, duration, true);
    };
    Object.defineProperty(MapChart.prototype, "zoomGeoPoint", {
        /**
         * Current lat/long coordinates for the center of the viewport. (default
         * zoom reference point)
         *
         * @readonly
         * @return Coordinates
         */
        get: function () {
            var point = $utils.spritePointToSvg({ x: this.pixelWidth / 2, y: this.pixelHeight / 2 }, this);
            return this.svgPointToGeo(point);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "zoomLevel", {
        /**
         * @return Zoom level
         */
        get: function () {
            return this.seriesContainer.scale;
        },
        /**
         * Current zoom level.
         *
         * @readonly
         * @return Zoom level
         */
        set: function (value) {
            this.seriesContainer.scale = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispatches events after some map transformation, like pan or zoom.
     *
     * @ignore
     */
    MapChart.prototype.handleMapTransform = function () {
        if (this.zoomLevel != this._prevZoomLevel) {
            this.dispatch("zoomlevelchanged");
            this._prevZoomLevel = this.zoomLevel;
            this.svgContainer.readerAlert(this.language.translate("Zoom level changed to %1", this.language.locale, $type.castString(this.zoomLevel)));
        }
        if (this.zoomGeoPoint && (this._prevZoomGeoPoint.latitude != this.zoomGeoPoint.latitude || this._prevZoomGeoPoint.longitude != this.zoomGeoPoint.longitude)) {
            this.dispatch("mappositionchanged");
        }
    };
    Object.defineProperty(MapChart.prototype, "smallMap", {
        /**
         * @return Small map
         */
        get: function () {
            if (!this._smallMap) {
                var smallMap = new SmallMap();
                this.smallMap = smallMap;
            }
            return this._smallMap;
        },
        /**
         * A [[SmallMap]] to be used on the map.
         *
         * Please note, that accessing this property will NOT create a small map
         * if it has not yet been created. (except in JSON)
         *
         * ```TypeScript
         * // Create a small map
         * map.smallMap = new am4maps.SmallMap();
         * ```
         * ```JavaScript
         * // Create a small map
         * map.smallMap = new am4maps.SmallMap();
         * ```
         * ```JSON
         * {
         *   // ...
         *   "smallMap": {}
         *   // ...
         * }
         * ```
         *
         * @param smallMap  Small map
         */
        set: function (smallMap) {
            if (this._smallMap) {
                this.removeDispose(this._smallMap);
            }
            this._smallMap = smallMap;
            this._smallMap.chart = this;
            smallMap.parent = this.chartContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "zoomControl", {
        /**
         * @return Zoom control
         */
        get: function () {
            return this._zoomControl;
        },
        /**
         * A [[ZoomControl]] to be used on the map.
         *
         * Please note, that accessing this property will NOT create a zoom control
         * if it has not yet been created. (except in JSON)
         *
         * ```TypeScript
         * // Create a zoom control
         * map.zoomControl = new am4maps.ZoomControl();
         * ```
         * ```JavaScript
         * // Create a zoom control
         * map.zoomControl = new am4maps.ZoomControl();
         * ```
         * ```JSON
         * {
         *   // ...
         *   "zoomControl": {}
         *   // ...
         * }
         * ```
         *
         * @param zoomControl  Zoom control
         */
        set: function (zoomControl) {
            if (this._zoomControl) {
                this.removeDispose(this._zoomControl);
            }
            this._zoomControl = zoomControl;
            zoomControl.chart = this;
            zoomControl.parent = this.chartContainer;
            zoomControl.plusButton.exportable = false;
            zoomControl.minusButton.exportable = false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns a map series of appropriate type.
     *
     * @return Map series
     */
    MapChart.prototype.createSeries = function () {
        return new MapSeries();
    };
    Object.defineProperty(MapChart.prototype, "deltaLongitude", {
        /**
         * @return Rotation
         */
        get: function () {
            return this.getPropertyValue("deltaLongitude");
        },
        /**
         * Degrees to rotate the map around vertical axis (Y).
         *
         * E.g. if set to -160, the longitude 20 will become a new center, creating
         * a Pacific-centered map.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
         * @param  value  Rotation
         */
        set: function (value) {
            value = $math.round(value, 3);
            if (this.setPropertyValue("deltaLongitude", $geo.wrapAngleTo180(value))) {
                this.rotateMap();
                this.updateZoomGeoPoint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "deltaLatitude", {
        /**
         * @return Rotation
         */
        get: function () {
            return this.getPropertyValue("deltaLatitude");
        },
        /**
         * Degrees to rotate the map around horizontal axis (X).
         *
         * E.g. setting this to 90 will put Antarctica directly in the center of
         * the map.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
         * @since 4.3.0
         * @param  value  Rotation
         */
        set: function (value) {
            value = $math.round(value, 3);
            if (this.setPropertyValue("deltaLatitude", value)) {
                this.rotateMap();
                this.updateZoomGeoPoint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "deltaGamma", {
        /**
         * @return Rotation
         */
        get: function () {
            return this.getPropertyValue("deltaGamma");
        },
        /**
         * Degrees to rotate the map around "Z" axis. This is the axis that pierces
         * the globe directly from the viewer's point of view.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
         * @since 4.3.0
         * @param  value  Rotation
         */
        set: function (value) {
            value = $math.round(value, 3);
            if (this.setPropertyValue("deltaGamma", value)) {
                this.rotateMap();
                this.updateZoomGeoPoint();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    MapChart.prototype.rotateMap = function () {
        if (this.projection.d3Projection) {
            if (this.projection.d3Projection.rotate) {
                this.projection.d3Projection.rotate([this.deltaLongitude, this.deltaLatitude, this.deltaGamma]);
                this.invalidateProjection();
                //this.updateExtremes(); // removal fixes #3292
            }
        }
    };
    Object.defineProperty(MapChart.prototype, "maxPanOut", {
        /**
         * @return Max pan out
         */
        get: function () {
            return this.getPropertyValue("maxPanOut");
        },
        /**
         * Maximum portion of the map's width/height to allow panning "off screen".
         *
         * A value of 0 (zero) will prevent any portion of the the map to be panned
         * outside the viewport.
         *
         * 0.5 will allow half of the map to be outside viewable area.
         *
         * @default 0.7
         * @param value  Max pan out
         */
        set: function (value) {
            this.setPropertyValue("maxPanOut", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "homeGeoPoint", {
        /**
         * @return Home geo point
         */
        get: function () {
            return this.getPropertyValue("homeGeoPoint");
        },
        /**
         * The geographical point to center map on when it is first loaded.
         *
         * The map will also be centered to this point when you call `goHome()`
         * method.
         *
         * @param value  Home geo point
         */
        set: function (value) {
            this.setPropertyValue("homeGeoPoint", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "homeZoomLevel", {
        /**
         * @return Home zoom level
         */
        get: function () {
            return this.getPropertyValue("homeZoomLevel");
        },
        /**
         * The zoom level to put the map in when it is first loaded.
         *
         * The map will also be set to this zoom level when you call `goHome()`
         * method.
         *
         * @param value  Home zoom level
         */
        set: function (value) {
            this.setPropertyValue("homeZoomLevel", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapChart.prototype, "zoomStep", {
        /**
         * @return Zoom factor
         */
        get: function () {
            return this.getPropertyValue("zoomStep");
        },
        /**
         * When user zooms in or out current zoom level is multiplied or divided
         * by value of this setting.
         *
         * @default 2
         * @param value  Zoom factor
         */
        set: function (value) {
            this.setPropertyValue("zoomStep", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Invalidates projection, causing all series to be redrawn.
     *
     * Call this after changing projection or its settings.
     */
    MapChart.prototype.invalidateProjection = function () {
        this.east = undefined;
        this.invalidateDataUsers();
        this.updateCenterGeoPoint();
    };
    Object.defineProperty(MapChart.prototype, "geodataSource", {
        /**
         * Returns a [[DataSource]] specifically for loading Component's data.
         *
         * @return Data source
         */
        get: function () {
            var _this = this;
            if (!this._dataSources["geodata"]) {
                var dataSource = this.getDataSource("geodata");
                dataSource.events.on("parseended", function () {
                    _this.events.once("datavalidated", function () {
                        _this.goHome(0);
                    });
                });
            }
            return this._dataSources["geodata"];
        },
        /**
         * Sets a [[DataSource]] to be used for loading Component's data.
         *
         * @param value Data source
         */
        set: function (value) {
            var _this = this;
            if (this._dataSources["geodata"]) {
                this.removeDispose(this._dataSources["geodata"]);
            }
            this._dataSources["geodata"] = value;
            this._dataSources["geodata"].component = this;
            this.events.on("inited", function () {
                _this.loadData("geodata");
            }, this, false);
            this.setDataSourceEvents(value, "geodata");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    MapChart.prototype.processConfig = function (config) {
        if ($type.hasValue(config["geodata"]) && $type.isString(config["geodata"])) {
            var name_1 = config["geodata"];
            // Check if there's a map loaded by such name
            if ($type.hasValue(window["am4geodata_" + config["geodata"]])) {
                config["geodata"] = window["am4geodata_" + config["geodata"]];
            }
            // Nope. Let's try maybe we got JSON as string?
            else {
                try {
                    config["geodata"] = JSON.parse(config["geodata"]);
                }
                catch (e) {
                    // No go again. Error out.
                    this.raiseCriticalError(Error("MapChart error: Geodata `" + name_1 + "` is not loaded or is incorrect."), true);
                }
            }
        }
        // Instantiate projection
        if ($type.hasValue(config["projection"]) && $type.isString(config["projection"])) {
            config["projection"] = this.createClassInstance(config["projection"]);
        }
        // Set up small map
        if ($type.hasValue(config.smallMap) && !$type.hasValue(config.smallMap.type)) {
            config.smallMap.type = "SmallMap";
        }
        // Set up zoom control
        if ($type.hasValue(config.zoomControl) && !$type.hasValue(config.zoomControl.type)) {
            config.zoomControl.type = "ZoomControl";
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Decorates a new [[Series]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    MapChart.prototype.handleSeriesAdded = function (event) {
        _super.prototype.handleSeriesAdded.call(this, event);
        var series = event.newValue;
        series.scale = this.scaleRatio;
        series.events.on("validated", this.updateCenterGeoPoint, this, false);
    };
    /**
       * This function is used to sort element's JSON config properties, so that
       * some properties that absolutely need to be processed last, can be put at
       * the end.
       *
       * @ignore Exclude from docs
       * @param a  Element 1
       * @param b  Element 2
       * @return Sorting number
       */
    MapChart.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // Must come last
        else if (a == "smallMap") {
            return 1;
        }
        else if (b == "smallMap") {
            return -1;
        }
        else if (a == "series") {
            return 1;
        }
        else if (b == "series") {
            return -1;
        }
        else {
            return _super.prototype.configOrder.call(this, a, b);
        }
    };
    /**
     * Adds `projection` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    MapChart.prototype.asIs = function (field) {
        return field == "projection" || field == "geodata" || _super.prototype.asIs.call(this, field);
    };
    Object.defineProperty(MapChart.prototype, "centerGeoPoint", {
        /**
         * Geo point of map center
         *
         * @readonly
         */
        get: function () {
            return this._centerGeoPoint;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the map to its original position and zoom level.
     *
     * Use the only parameter to set number of milliseconds for the zoom
     * animation to play.
     *
     * @param  duration  Duration (ms)
     */
    MapChart.prototype.goHome = function (duration) {
        var homeGeoPoint = this.homeGeoPoint;
        if (!homeGeoPoint) {
            homeGeoPoint = this.centerGeoPoint;
        }
        if (homeGeoPoint) {
            this.zoomToGeoPoint(homeGeoPoint, this.homeZoomLevel, true, duration, true);
        }
    };
    /**
     * Sets [[Paper]] instance to use to draw elements.
     *
     * @ignore
     * @param   paper  Paper
     * @return         true if paper was changed, false, if it's the same
     */
    MapChart.prototype.setPaper = function (paper) {
        if (this.svgContainer) {
            this.svgContainer.hideOverflow = true;
        }
        return _super.prototype.setPaper.call(this, paper);
    };
    Object.defineProperty(MapChart.prototype, "backgroundSeries", {
        /**
         * Background series will create polygons that will fill all the map area
         * with some color (or other fill).
         *
         * This might be useful with non-rectangular projections, like Orthographic,
         * Albers, etc.
         *
         * To change background color/opacity access polygon template.
         *
         * ```TypeScript
         * chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#fff");
         * chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
         * ```
         * ```JavaScript
         * chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#fff");
         * chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
         * ```
         * ```JSON
         * {
         *   "backgroundSeries": {
         *     "mapPolygons": {
         *       "polygon": {
         *         "fill": "#fff",
         *         "fillOpacity": 0.1
         *       }
         *     }
         *   }
         * }
         * ```
         *
         * @since 4.3.0
         */
        get: function () {
            var _this = this;
            if (!this._backgroundSeries) {
                var backgroundSeries = new MapPolygonSeries();
                backgroundSeries.parent = this.seriesContainer;
                backgroundSeries.chart = this;
                backgroundSeries.hiddenInLegend = true;
                backgroundSeries.mapPolygons.template.focusable = false;
                backgroundSeries.addDisposer(new Disposer(function () {
                    _this._backgroundSeries = undefined;
                }));
                this._disposers.push(backgroundSeries);
                var interfaceColors = new InterfaceColorSet();
                var color = interfaceColors.getFor("background");
                var polygonTemplate = backgroundSeries.mapPolygons.template.polygon;
                polygonTemplate.stroke = color;
                polygonTemplate.fill = color;
                polygonTemplate.fillOpacity = 0;
                polygonTemplate.strokeOpacity = 0;
                //polygonTemplate.focusable = false;
                backgroundSeries.mapPolygons.create();
                this._backgroundSeries = backgroundSeries;
            }
            return this._backgroundSeries;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Prepares the legend instance for use in this chart.
     *
     * @param legend  Legend
     */
    MapChart.prototype.setLegend = function (legend) {
        _super.prototype.setLegend.call(this, legend);
        if (legend) {
            legend.parent = this;
        }
    };
    /**
     * @param  value  Tap to activate?
     */
    MapChart.prototype.setTapToActivate = function (value) {
        _super.prototype.setTapToActivate.call(this, value);
        // setup other containers
        this.seriesContainer.interactions.isTouchProtected = true;
        this.panSprite.interactions.isTouchProtected = true;
    };
    MapChart.prototype.handleTapToActivate = function () {
        _super.prototype.handleTapToActivate.call(this);
        this.seriesContainer.interactions.isTouchProtected = false;
        this.panSprite.interactions.isTouchProtected = false;
    };
    MapChart.prototype.handleTapToActivateDeactivation = function () {
        _super.prototype.handleTapToActivateDeactivation.call(this);
        this.seriesContainer.interactions.isTouchProtected = true;
        this.panSprite.interactions.isTouchProtected = true;
    };
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    MapChart.prototype.asFunction = function (field) {
        return field == "zoomEasing" || _super.prototype.asIs.call(this, field);
    };
    /**
     * @ignore
     * @return Has license?
     */
    MapChart.prototype.hasLicense = function () {
        if (options.commercialLicense) {
            return true;
        }
        if (!_super.prototype.hasLicense.call(this)) {
            return false;
        }
        for (var i = 0; i < options.licenses.length; i++) {
            if (options.licenses[i].match(/^MP.{5,}/i)) {
                return true;
            }
        }
        return false;
    };
    return MapChart;
}(SerialChart));
export { MapChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapChart"] = MapChart;
//# sourceMappingURL=MapChart.js.map